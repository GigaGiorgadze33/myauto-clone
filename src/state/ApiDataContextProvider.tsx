import { useEffect, type PropsWithChildren } from 'react';
import { ApiDataContext } from './ApiDataContext';
import { useFetch } from '@/hooks/useFetch';
import {
	getCategoires,
	getManufacturerModels,
	getManufacturers,
} from '@/services/productCategories';
import type {
	CategoriesGroupedByVehicleType,
	ManufacturersGroupedByVechile,
	ModelsGroupedByManufacturerAndVechile,
} from '@/types/data';
import { getProducts } from '@/services/products';
import { useFormContext, useWatch } from 'react-hook-form';
import type { FilterForm } from '@/types/filter';
import {
	formatModelsOrManufacturers,
	formatSearchForModels,
	generateModelsCacheKey,
} from '@/utils';
import { VEHICLE_MAPPING } from '@/config/constants';

const ApiDataContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { getValues } = useFormContext<FilterForm>();
	const {
		state: manufacturers,
		execute: fetchManufacturers,
		abortController: manufactorersAbortController,
	} = useFetch(getManufacturers, 'manufacturers');
	const {
		state: categories,
		execute: fetchCategories,
		abortController: categoriesAbortController,
	} = useFetch(getCategoires, 'categories');
	const watchedManufacturers: FilterForm['manufactorers'] =
		useWatch({
			name: 'manufactorers',
		}) || [];
	const {
		state: models,
		execute: fetchModels,
		restoreFromCache: restoreModelsFromCache,
	} = useFetch(
		getManufacturerModels,
		generateModelsCacheKey(watchedManufacturers),
		(prevData, newData) => {
			if (!prevData) {
				return newData;
			}
			if (!newData.data) {
				return prevData;
			}
			return {
				data: [...prevData.data, ...newData.data],
			};
		}
	);
	const { state: products, execute: fetchProducts } = useFetch(getProducts);
	const selectedManufacturers = watchedManufacturers.map((m) => m.value) || [];

	const refetchProducts = async (data?: Partial<FilterForm>) => {
		const formData = {
			...getValues(),
			...(data ?? {}),
		};
		fetchProducts({
			args: [
				{
					ForRent: formData.for_rent,
					Cats: formData.categories.map((c) => c.value).join('.'),
					Period: formData.period,
					PriceFrom: formData.priceFrom,
					PriceTo: formData.priceTo,
					CurrencyID: formData.currencyId,
					Mans: formatSearchForModels(
						formatModelsOrManufacturers(formData.models, formData.manufactorers)
					),
					TypeID: VEHICLE_MAPPING[formData.vechile],
					SortOrder: formData.sorting,
					Page: formData.page,
				},
			],
		});
	};

	useEffect(() => {
		fetchManufacturers();
		fetchCategories();
		refetchProducts();
		restoreModelsFromCache();
		return () => {
			if (manufactorersAbortController.current) {
				manufactorersAbortController.current.abort();
			}
			if (categoriesAbortController.current) {
				categoriesAbortController.current.abort();
			}
		};
	}, [fetchManufacturers, fetchCategories]);

	const manufacturersGroupedByVechile = manufacturers.data?.reduce(
		(acc, manufacturer) => {
			const types: (keyof ManufacturersGroupedByVechile)[] = [];

			if (manufacturer.is_spec === '1') types.push('spec');
			if (manufacturer.is_moto === '1') types.push('moto');
			if (manufacturer.is_car === '1' || types.length === 0) types.push('car');

			types.forEach((type) => {
				if (!acc[type]) {
					acc[type] = [];
				}
				acc[type].push(manufacturer);
			});

			return acc;
		},
		{} as ManufacturersGroupedByVechile
	);

	const categoriesGroupedByVehicleType = categories.data?.data.reduce(
		(acc, category) => {
			let categoryType: keyof CategoriesGroupedByVehicleType = 'car';
			if (category.category_type === 1) {
				categoryType = 'spec';
			}
			if (category.category_type === 2) {
				categoryType = 'moto';
			}
			if (!acc[categoryType]) {
				acc[categoryType] = [];
			}
			acc[categoryType].push(category);
			return acc;
		},
		{} as CategoriesGroupedByVehicleType
	);

	const modelsGroupedByManufacturerAndVechile = models.data?.data.reduce(
		(acc, model) => {
			if (!selectedManufacturers.includes(model.man_id.toString())) {
				return acc;
			}

			const types: (keyof ModelsGroupedByManufacturerAndVechile)[] = [];

			if (model.is_spec) types.push('spec');
			if (model.is_moto) types.push('moto');
			if (model.is_car || types.length === 0) types.push('car');

			types.forEach((category) => {
				if (!acc[category]) {
					acc[category] = [];
				}

				const modelGroup = manufacturersGroupedByVechile?.[category]?.find(
					(manufacturer) => +manufacturer.man_id === +model.man_id
				);

				const group = acc[category].find(
					(group) => group.groupLabel === modelGroup?.man_name
				);

				if (group) {
					group.options.push({
						label: model.model_name,
						value: model.model_id,
						groupValue: model.man_id,
					});
				} else {
					acc[category].push({
						groupLabel: modelGroup?.man_name || 'Unknown',
						options: [
							{
								label: model.model_name,
								value: model.model_id,
								groupValue: model.man_id,
							},
						],
					});
				}
			});

			return acc;
		},
		{} as ModelsGroupedByManufacturerAndVechile
	);

	return (
		<ApiDataContext.Provider
			value={{
				manufacturers: manufacturers.data,
				manufacturersGroupedByVechile,
				categories: categories.data?.data ?? null,
				categoriesGroupedByVehicleType: categoriesGroupedByVehicleType ?? null,
				models: models.data?.data ?? null,
				fetchModels,
				modelsGroupedByManufacturerAndVechile:
					modelsGroupedByManufacturerAndVechile ?? null,
				modelsStatus: models.status,
				products: products.data ?? null,
				fetchProducts: refetchProducts,
			}}
		>
			{children}
		</ApiDataContext.Provider>
	);
};

export default ApiDataContextProvider;

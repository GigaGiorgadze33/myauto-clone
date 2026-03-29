import { useFormContext, useWatch } from 'react-hook-form';
import FilterButtons from './FilterButtons';
import Select from './Select';
import type { FilterForm } from '@/types/filter';
import RadioToggle from './RadioToggle';
import { CURRENCIES, LISTING_TYPE } from '@/config/constants';
import Input from './Input';
import { useApiData } from '@/state/ApiDataContext';
import { generateModelsCacheKey } from '@/utils';

const FilterSection: React.FC<{
	afterSubmit?: () => void;
}> = ({ afterSubmit }) => {
	const { setValue, handleSubmit, getValues } = useFormContext<FilterForm>();
	const {
		manufacturersGroupedByVechile,
		categoriesGroupedByVehicleType,
		modelsGroupedByManufacturerAndVechile,
		fetchModels,
		fetchProducts,
	} = useApiData();
	const vechile = useWatch({
		name: 'vechile',
	}) as FilterForm['vechile'];
	return (
		<form
			role='search'
			onSubmit={handleSubmit((data) => {
				fetchProducts(data);
				const queryParams = new URLSearchParams(window.location.search);
				for (const key in data) {
					const value = data[key as keyof FilterForm];
					if (Array.isArray(value)) {
						queryParams.set(key, JSON.stringify(value));
					} else if (value !== null) {
						queryParams.set(key, String(value));
					}
				}
				window.history.replaceState(
					null,
					'',
					`${window.location.pathname}?${queryParams.toString()}`
				);
				afterSubmit?.();
			})}
			className='bg-white lg:sticky top-28 left-0 w-full rounded-t-xl border shadow-filter border-divider'
		>
			<FilterButtons />
			<div className='px-6 border-b border-divider-100 pb-6 gap-y-5 flex flex-col pt-5.5'>
				<Select<FilterForm, false>
					setValue={(option) =>
						setValue('for_rent', option as FilterForm['for_rent'])
					}
					name={'for_rent'}
					label='გარიგების ტიპი'
					options={LISTING_TYPE}
					placeholder={'გარიგების ტიპი'}
					multiple={false}
				/>
				<Select<FilterForm, true, 'manufactorers'>
					setValue={(options) => {
						const oldManufacturers = getValues('manufactorers') || [];
						const newManufacturer = options.filter(
							(option) =>
								!oldManufacturers.some((old) => old.value === option.value)
						)[0];
						if (newManufacturer) {
							fetchModels({
								args: [Number(newManufacturer.value)],
								customStoreKey: generateModelsCacheKey(options),
							});
						}
						setValue('manufactorers', options);
					}}
					name={'manufactorers'}
					label='მწარმოებლები'
					options={
						manufacturersGroupedByVechile?.[vechile]?.map((manufacturer) => ({
							label: manufacturer.man_name,
							value: manufacturer.man_id,
						})) || []
					}
					multiple
					placeholder={'ყველა მწარომებელი'}
				/>
				<Select<FilterForm, true, 'models'>
					setValue={(options) => setValue('models', options)}
					name={'models'}
					label='მოდელები'
					disabled={!modelsGroupedByManufacturerAndVechile?.[vechile]?.length}
					options={modelsGroupedByManufacturerAndVechile?.[vechile] ?? []}
					multiple
					placeholder={'ყველა მოდელი'}
				/>
				<Select<FilterForm, true, 'categories'>
					setValue={(options) => setValue('categories', options)}
					name={'categories'}
					label='კატეგორიები'
					options={
						categoriesGroupedByVehicleType?.[vechile]?.map((category) => ({
							label: category.title,
							value: category.category_id,
						})) || []
					}
					multiple
					placeholder={'ყველა კატეგორია'}
				/>
			</div>
			<div className='pt-4 px-6 pb-11'>
				<div className='flex items-center justify-between'>
					<span className='font-medium text-s text-black-800'>ფასი</span>
					<RadioToggle<FilterForm>
						onChange={(value) =>
							setValue('currencyId', value as FilterForm['currencyId'])
						}
						name='currencyId'
						options={CURRENCIES}
					/>
				</div>
				<div className='mt-3 gap-x-1 flex items-center'>
					<Input<FilterForm>
						placeholder='დან'
						name='priceFrom'
						type='number'
						restrictNonNumbers
					/>
					<div className='w-1.5 shrink-0 h-0.5 bg-neutral block' />
					<Input<FilterForm>
						placeholder='მდე'
						name='priceTo'
						type='number'
						restrictNonNumbers
					/>
				</div>
			</div>
			<div className='shadow-filter-search w-full bg-white pt-4 pb-5 px-6'>
				<button
					className='text-white w-full font-bold font-tbc text-sm bg-primary h-8  rounded-md'
					type='submit'
				>
					{/* TODO:  აქ რიცხვების წამოღება არ წერია დოკში და თუ გეცლება მერე იმათი საიტიდან ცადე რევერსი */}
					ძებნა
				</button>
			</div>
		</form>
	);
};

export default FilterSection;

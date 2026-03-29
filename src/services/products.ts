import type { VEHICLE_MAPPING } from '@/config/constants';
import type { ProductsResponse } from '@/types/data';
import type { FilterForm } from '@/types/filter';

export const getProducts = async (params?: {
	ForRent: '1' | '0' |null;
	Mans: string | null;
	Cats: string | null;
	PriceFrom: number | null;
	PriceTo: number | null;
	Period: FilterForm['period'] | null;
	SortOrder: FilterForm['sorting'] | null;
	TypeID: typeof VEHICLE_MAPPING[keyof typeof VEHICLE_MAPPING];
	CurrencyID: FilterForm['currencyId'] | null;
	page?: number | null;
}) => {
	const queryParams = new URLSearchParams();

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				queryParams.append(key, String(value));
			}
		});
	}

	const response = await fetch(
		`https://api2.myauto.ge/ka/products${
			queryParams.toString() ? `?${queryParams.toString()}` : ''
		}`
	);
	const data = await response.json();
	return data as ProductsResponse;
};

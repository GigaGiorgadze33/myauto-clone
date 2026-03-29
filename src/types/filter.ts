import type { PERIOD_FILTERS, SORTING_OPTIONS } from '@/config/constants';

export type Vechile = 'car' | 'spec' | 'moto';

export type SelectOption = {
	label: string;
	value: string | number;
	groupValue?: string | number;
};

export type SelectOptionGroup = {
	groupLabel: string;
	options: SelectOption[];
};

export type SelectItem = SelectOption | SelectOptionGroup;

export type FilterForm = {
	vechile: Vechile;
	for_rent: '1' | '0';
	currencyId: '1' | '3';
	period: (typeof PERIOD_FILTERS)[number]['value'];
	sorting: (typeof SORTING_OPTIONS)[number]['value'];
	manufactorers: SelectOption[];
	models: SelectOption[];
	categories: SelectOption[];
	priceFrom: number | null;
	priceTo: number | null;
};

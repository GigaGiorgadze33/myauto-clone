export type Vechile = 'car' | 'spec' | 'moto';

export type SelectOption = {
	label: string;
	value: string | number;
};

export type SelectOptionGroup = {
	groupLabel: string;
	options: SelectOption[];
};

export type SelectItem = SelectOption | SelectOptionGroup;

export type FilterForm = {
	vechile: Vechile;
	for_rent: '1' | '0' | null;
	currencyId: '1' | '3';
	manufactorers: SelectOption[];
	models: SelectOption[];
	categories: SelectOption[];
	price_range: [number, number];
};

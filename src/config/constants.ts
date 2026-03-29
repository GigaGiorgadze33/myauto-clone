import FlagGeo from '@/icons/FlagGeo';
import FlagUs from '@/icons/FlagUs';
import type { SelectOption } from '@/types/filter';

export const CURRENCIES = [
	/**
	 * values are from myauto.ge live site, they are used to fetch data from api
	 * as they were not provided in the docs, i had to get them from the live site
	 */
	{ value: '1', label: '₾' },
	{ value: '3', label: '$' },
] satisfies [SelectOption, SelectOption];

export const PERIOD_FILTERS = [
	{ value: '1h', label: '1 საათი' },
	{ value: '2h', label: '2 საათი' },
	{ value: '3h', label: '3 საათი' },
	{ value: '1d', label: '1 დღე' },
	{ value: '2d', label: '2 დღე' },
	{ value: '3d', label: '3 დღე' },
	{ value: '1w', label: '1 კვირა' },
	{ value: '2w', label: '2 კვირა' },
	{ value: '3w', label: '3 კვირა' },
] as const;

export const SORTING_OPTIONS = [
	{ value: '1', label: 'თარიღი კლებადი' },
	{ value: '2', label: 'თარიღი ზრდადი' },
	{ value: '3', label: 'ფასი კლებადი' },
	{ value: '4', label: 'ფასი ზრდადი' },
	{ value: '5', label: 'გარბენი კლებადი' },
	{ value: '6', label: 'გარბენი ზრდადი' },
] as const;

export const LISTING_TYPE = [
	{
		label: 'იყიდება',
		value: '0',
	},
	{
		label: 'ქირავდება',
		value: '1',
	},
] as const;

export const TRANSMISSIONS = {
	1: 'მექანიკა',
	2: 'ავტომატიკა',
	3: 'ტიპტრონიკი',
	4: 'ვარიატორი',
} as const;

export const FUEL_TYPES = {
	2: 'ბენზინი',
	3: 'დიზელი',
	7: 'ელექტრო',
	6: 'ჰიბრიდი',
	10: 'დატენვადი ჰიბრიდი',
	9: 'თხევადი გაზი',
	8: 'ბუნებრივი გაზი',
	12: 'წყალბადი',
} as const;

export const LOCATIONS = {
	1: {
		icon: FlagGeo,
		label: 'საქართველო',
	},
	23: {
		icon: FlagUs,
		label: 'აშშ',
	},
	29: {
		icon: FlagUs,
		label: 'აშშ',
	},
} as const;

/**
 * this exchange rate is from national bank as of 29th of march 2026
 * integrating national bank api for exchange rates seems out of scope for this assignment.
 */
export const USD_TO_GEL_RATE = 0.0041;

export const GEL_TO_USD_RATE = 2.7025;

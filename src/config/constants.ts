import type { SelectOption } from '@/types/filter';

export const CURRENCIES = [
    /**
     * values are from myauto.ge live site, they are used to fetch data from api
     * as they were not provided in the docs, i had to get them from the live site
     */
    { value: '1', label: '₾' },
    { value: '3', label: '$' },
] satisfies [SelectOption, SelectOption];
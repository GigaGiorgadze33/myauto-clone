import { CURRENCIES, GEL_TO_USD_RATE, LOCATIONS } from '@/config/constants';
import Checkmark from '@/icons/Checkmark';
import type { ProductItem } from '@/types/data';
import type { FilterForm } from '@/types/filter';
import { getCustomsPrice } from '@/utils';
import type React from 'react';
import { useWatch } from 'react-hook-form';

const ProductCustomsPrice: React.FC<{
	product: ProductItem;
	mobile?: boolean;
}> = ({ product }) => {
	const currencyId = useWatch<FilterForm>({
		name: 'currencyId',
	});
	const currencyDetails = CURRENCIES.find(
		(currency) => currency.value === currencyId
	);
	const LocationIcon =
		LOCATIONS[product.parent_loc_id as keyof typeof LOCATIONS]?.icon;
	return (
		<>
			{' '}
			{product.customs_passed ? (
				<span className='text-success text-[11px] font-tbc flex items-center justify-center'>
					<Checkmark />
					<span className='ml-0.5 font-medium'>განბაჟებულია</span>
				</span>
			) : (
				<span className='text-error font-tbc text-[11px] whitespace-nowrap space-x-1'>
					<span>განბაჟება</span>
					<span className='font-medium font-helvetica-geo'>
						{currencyDetails?.value === CURRENCIES[0].value
							? getCustomsPrice(product)
							: Math.round(getCustomsPrice(product) / GEL_TO_USD_RATE)}{' '}
						{currencyDetails?.label}
					</span>
				</span>
			)}
			<div className='flex items-center gap-x-2'>
				{LocationIcon ? <LocationIcon /> : null}
			</div>
		</>
	);
};

export default ProductCustomsPrice;

import { CURRENCIES, GEL_TO_USD_RATE, LOCATIONS } from '@/config/constants';
import Checkmark from '@/icons/Checkmark';
import type { ProductItem } from '@/types/data';
import type { FilterForm } from '@/types/filter';
import { getCustomsPrice } from '@/utils';
import classNames from 'classnames';
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
		<div
			className={classNames(
				'lg:font-tbc max-lg:rounded-md lg:flex gap-x-4 items-center max-lg:py-1 max-lg:pl-1 max-lg:pr-2 text-[10px] lg:text-[11px]',
				{
					'max-lg:bg-success-50': product.customs_passed,
					'max-lg:bg-error-100': !product.customs_passed,
				}
			)}
		>
			{' '}
			{product.customs_passed ? (
				<span className='text-success   flex items-center justify-center'>
					<Checkmark />
					<span className='ml-0.5 lg:font-medium'>განბაჟებულია</span>
				</span>
			) : (
				<span className='text-error  whitespace-nowrap space-x-1'>
					<span>განბაჟება</span>
					<span className='font-medium font-helvetica-geo'>
						{currencyDetails?.value === CURRENCIES[0].value
							? getCustomsPrice(product)
							: Math.round(getCustomsPrice(product) / GEL_TO_USD_RATE)}{' '}
						{currencyDetails?.label}
					</span>
				</span>
			)}
			<div className='lg:flex hidden items-center gap-x-2'>
				{LocationIcon ? <LocationIcon /> : null}
			</div>
		</div>
	);
};

export default ProductCustomsPrice;

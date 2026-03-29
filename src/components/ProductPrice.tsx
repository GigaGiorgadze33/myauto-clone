import { CURRENCIES } from '@/config/constants';
import type { ProductItem } from '@/types/data';
import type { FilterForm } from '@/types/filter';
import { useFormContext, useWatch } from 'react-hook-form';

const ProductPrice = ({ product }: { product: ProductItem }) => {
	const numberFormatter = new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 0,
	});
	const { setValue } = useFormContext<FilterForm>();
	const currencyId = useWatch<FilterForm>({
		name: 'currencyId',
	});
	const currencyDetails = CURRENCIES.find(
		(currency) => currency.value === currencyId
	);
	const formattedPrice = numberFormatter.format(
		Number(
			currencyDetails?.value === CURRENCIES[0].value
				? product.price_value
				: product.price
		)
	);
	return (
		<>
			{' '}
			<span className='text-xl font-tbc font-medium'>{formattedPrice}</span>
			<button
				className='text-black-800 size-6 rounded-full font-bold  bg-primary-gray'
				type='button'
				onClick={() => {
					if (currencyId === '1') {
						setValue('currencyId', '3');
					} else {
						setValue('currencyId', '1');
					}
				}}
			>
				{currencyDetails?.label}
			</button>
		</>
	);
};

export default ProductPrice;

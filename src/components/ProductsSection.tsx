import type { FilterForm } from '@/types/filter';
import Select from './Select';
import { useFormContext } from 'react-hook-form';
import { PERIOD_FILTERS, SORTING_OPTIONS } from '@/config/constants';
import Product from './Product';
import { useApiData } from '@/state/ApiDataContext';

const ProductsSection = () => {
	const { setValue } = useFormContext<FilterForm>();
	const { products, fetchProducts } = useApiData();
	return (
		<section className='flex w-full flex-col gap-y-4'>
			<div className='flex w-full items-center justify-between'>
				<h2 className='text-black-800 text-base'>
					{products?.data.meta.total ?? 0} განცხადება
				</h2>
				<div className='flex items-center gap-x-2'>
					<div className='min-w-35'>
						<Select<FilterForm, false, 'period'>
							name='period'
							setValue={(val) => {
								setValue('period', val);
								fetchProducts({
									period: val,
								});
								const queryParams = new URLSearchParams(window.location.search);
								queryParams.set('period', String(val));
								window.history.replaceState(
									null,
									'',
									`${window.location.pathname}?${queryParams.toString()}`
								);
							}}
							required
							options={PERIOD_FILTERS}
							multiple={false}
						/>
					</div>
					<div className='min-w-41'>
						<Select<FilterForm, false, 'sorting'>
							name='sorting'
							setValue={(val) => {
								setValue('sorting', val);
								fetchProducts({
									sorting: val,
								});
								const queryParams = new URLSearchParams(window.location.search);
								queryParams.set('sorting', String(val));
								window.history.replaceState(
									null,
									'',
									`${window.location.pathname}?${queryParams.toString()}`
								);
							}}
							required
							options={SORTING_OPTIONS}
							multiple={false}
						/>
					</div>
				</div>
			</div>
			<ul className='flex flex-col gap-y-4'>
				{products?.data?.items.map((product) => (
					<Product
						product={product}
						key={`${product.car_id} ${product.man_id}`}
					/>
				))}
			</ul>
		</section>
	);
};

export default ProductsSection;

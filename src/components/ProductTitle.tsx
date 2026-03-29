import { useApiData } from '@/state/ApiDataContext';
import type { ProductItem } from '@/types/data';

const ProductTitle: React.FC<{
    product: ProductItem;
}> = ({ product }) => {
	const { manufacturers } = useApiData();
	const manufacturer = manufacturers?.find(
		(m) => Number(m.man_id) === Number(product.man_id)
	);
	return (
		<div className='flex items-center gap-x-2'>
			<h3 className='font-medium line-clamp-1 max-w-6/7 text-sm text-black-800'>
				{manufacturer?.man_name} {product.car_model}
			</h3>
			<span className='text-neutral text-srm font-medium whitespace-nowrap'>
				{product.prod_year} წ
			</span>
		</div>
	);
};

export default ProductTitle;

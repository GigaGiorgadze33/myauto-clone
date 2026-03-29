import Motor from '@/icons/Motor';
import Speed from '@/icons/Speed';
import SteeringWheel from '@/icons/SteeringWheel';
import Transmission from '@/icons/Transmission';
import type { ProductItem } from '@/types/data';
import { getEngineSpec, timeAgo } from '@/utils';
import ProductPrice from './ProductPrice';
import Edit from '@/icons/Edit';
import Compare from '@/icons/Compare';
import Heart from '@/icons/Heart';
import ProductImages from './ProductImages';
import { useApiData } from '@/state/ApiDataContext';
import { TRANSMISSIONS } from '@/config/constants';
import ProductCustomsPrice from './ProductCustomsPrice';

const Product: React.FC<{
	product: ProductItem;
}> = ({ product }) => {
	const { manufacturers } = useApiData();
	const manufacturer = manufacturers?.find(
		(m) => Number(m.man_id) === Number(product.man_id)
	);
	return (
		<div className='bg-white rounded-1.5xl'>
			<div className='flex gap-x-4 p-4'>
				<ProductImages product={product} />
				<div className='grow'>
					<div className='flex max-lg:flex-col items-center w-full justify-between gap-x-2'>
						<div className='flex items-center gap-x-2'>
							<h3 className='font-medium line-clamp-1 max-w-6/7 text-sm text-black-800'>
								{manufacturer?.man_name} {product.car_model}
							</h3>
							<span className='text-neutral text-srm font-medium whitespace-nowrap'>
								{product.prod_year} წ
							</span>
						</div>
						<div className='flex gap-x-4 items-center'>
							<ProductCustomsPrice product={product} />
						</div>
					</div>
					<div className='flex items-start mt-6 justify-between'>
						<div className='lg:grid hidden font-tbc text-black-400 gap-y-3.75 gap-x-8 grid-cols-2 max-w-3/4'>
							<div className='flex items-center gap-x-3'>
								<Motor />
								<span className='font-medium text-xs'>
									{getEngineSpec(product)}
								</span>
							</div>
							<div className='flex items-center gap-x-3'>
								<Speed />
								<span className='font-medium text-xs'>
									{product.car_run_km} კმ
								</span>
							</div>
							<div className='flex items-center gap-x-3'>
								<Transmission />
								<span className='font-medium text-xs'>
									{TRANSMISSIONS[
										product.gear_type_id as keyof typeof TRANSMISSIONS
									] ?? 'უცნობი'}
								</span>
							</div>
							<div className='flex items-center gap-x-3'>
								<SteeringWheel />
								<span className='font-medium text-xs'>
									{product.right_wheel ? 'მარჯვენა' : 'მარცხენა'}
								</span>
							</div>
						</div>
						<div className='gap-x-1 flex items-center'>
							<ProductPrice product={product} />
						</div>
					</div>
					<div className='flex items-center justify-between mt-8'>
						<span className='font-medium font-tbc text-secondary text-xs'>
							{product.views} ნახვა &bull; {timeAgo(product.order_date)}
						</span>
						<div className='flex items-center gap-x-4'>
							<Edit />
							<Compare />
							<Heart />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;

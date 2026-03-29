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
import { LOCATIONS, TRANSMISSIONS } from '@/config/constants';
import ProductCustomsPrice from './ProductCustomsPrice';
import ProductTitle from './ProductTitle';
import { useApiData } from '@/state/ApiDataContext';
import Flame from '@/icons/Flame';
import EditSquare from '@/icons/EditSquare';

const Product: React.FC<{
	product: ProductItem;
}> = ({ product }) => {
	const { categories } = useApiData();

	const category = categories?.find(
		(c) => c.category_id === product.category_id
	);
	const LocationIcon =
		LOCATIONS[product.parent_loc_id as keyof typeof LOCATIONS]?.icon;
	return (
		<div className='bg-white rounded-1.5xl'>
			<div className='flex lg:flex-row border-gray-20 max-lg:border-b flex-col gap-x-4 p-4'>
				<div className='lg:hidden gap-y-2.5 mb-3 flex flex-col'>
					<ProductTitle product={product} />
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-x-1'>
							<ProductPrice product={product} />
						</div>
						<ProductCustomsPrice product={product} />
					</div>
				</div>
				<ProductImages product={product} />
				<div className='grid mt-3.5 text-black-700 text-xs grid-cols-2 gap-x-7 gap-1.5 lg:hidden'>
					<div>{product.car_run_km} კმ</div>
					<div>{category?.title}</div>
					<div>{getEngineSpec(product)}</div>
					<div>საჭე {product.right_wheel ? 'მარჯვნივ' : 'მარცხნივ'}</div>
					<div>
						{TRANSMISSIONS[
							product.gear_type_id as keyof typeof TRANSMISSIONS
						] ?? 'უცნობი'}
					</div>
					<div className='flex items-center justify-start gap-x-1.5'>
						{LocationIcon ? <LocationIcon /> : null}
						{LOCATIONS[product.parent_loc_id as keyof typeof LOCATIONS]?.label}
					</div>
				</div>
				<div className='grow max-lg:hidden'>
					<div className='flex items-center w-full justify-between gap-x-2'>
						<ProductTitle product={product} />
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
						<div className='flex text-secondary items-center gap-x-4'>
							<Edit />
							<Compare />
							<Heart />
						</div>
					</div>
				</div>
			</div>
			<div className='lg:hidden p-4 flex items-center justify-between text-gray-400'>
				<div className='flex items-center gap-x-2'>
					<Flame />
					<span className='text-[11px]'>
						{product.views} ნახვა &bull; {timeAgo(product.order_date)}
					</span>
				</div>
				<div className='flex text-gray-300 items-center'>
					<div className='flex items-center size-8 justify-center'>
						<Compare />
					</div>
					<div className='flex items-center size-8 justify-center'>
						<EditSquare />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;

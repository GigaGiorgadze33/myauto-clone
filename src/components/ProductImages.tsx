import type { ProductItem } from '@/types/data';
import { getAllCarPhotos } from '@/utils';
import classNames from 'classnames';
import { useState } from 'react';
import MoreImagesOverlay from './MoreImagesOverlay';

const ProductImages: React.FC<{
	product: ProductItem;
}> = ({ product }) => {
	const carPhotos = getAllCarPhotos(product);
	const [pictureIndex, setPictureIndex] = useState(0);
	const chipCount = Math.min(3, carPhotos.length);

	return (
		<div
			onMouseLeave={() => setPictureIndex(0)}
			className='w-46 group aspect-video relative rounded-[10px] overflow-hidden'
		>
			{carPhotos.length > 4 && pictureIndex === 3 && (
				<MoreImagesOverlay imageCount={carPhotos.length - 4} />
			)}
			<img src={carPhotos[pictureIndex]} loading='lazy' />
			<div className='absolute group-hover:opacity-100 opacity-0 h-full w-full z-20 inset-0 flex items-end pb-4 px-2 gap-x-1'>
				{Array.from({ length: chipCount + 1 }).map((_, index) => (
					<div
						onMouseEnter={() => {
							setPictureIndex(index);
						}}
						className='w-full h-full flex items-end'
						key={index}
					>
						<div
							className={classNames(' h-1 block w-full rounded-full', {
								'bg-white': pictureIndex !== index,
								'bg-primary': pictureIndex === index,
							})}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductImages;

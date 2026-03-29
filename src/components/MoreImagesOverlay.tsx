import Photo from '@/icons/Photo';

const MoreImagesOverlay: React.FC<{
	imageCount: number;
}> = ({ imageCount }) => {
	return (
		<div className='absolute inset-0 w-full h-full bg-black-800/80 flex flex-col items-center justify-center gap-y-4'>
			<Photo className='w-6 text-white' />
			<span className='text-white text-sm'>
				<span className='text-xl'>{imageCount}+ </span> სურათი
			</span>
		</div>
	);
};

export default MoreImagesOverlay;

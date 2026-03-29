import LoadingCircle from '@/icons/LoadingCircle';
import { useApiData } from '@/state/ApiDataContext';

const Loading = () => {
    const { anyDataInitialLoading } = useApiData()

    if (!anyDataInitialLoading) return null;

	return (
		<div className='fixed inset-0 bg-white z-999999999 select-none flex items-center justify-center h-screen w-screen'>
			<LoadingCircle className='text-primary animate-spin' />
		</div>
	);
};

export default Loading;

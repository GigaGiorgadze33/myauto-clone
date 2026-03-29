import type { ComponentProps } from 'react';

const LoadingCircle: React.FC<ComponentProps<'svg'>> = (props) => {
	return (
		<svg
			viewBox='0 0 100 100'
			width='100px'
			height='100px'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M 10 50 A 40 40 0 0 1 90 50'
				fill='none'
				stroke='currentColor'
				stroke-width='8'
				stroke-linecap='round'
			/>
		</svg>
	);
};

export default LoadingCircle;

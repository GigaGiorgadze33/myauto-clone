import type { ComponentProps } from 'react';

const ArrowLeft: React.FC<ComponentProps<'svg'>> = (props) => {
	return (
		<svg
			width='4'
			height='7'
			viewBox='0 0 4 7'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M0.5 0.5L3.5 3.5L0.5 6.5'
				stroke='currentColor'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

export default ArrowLeft;

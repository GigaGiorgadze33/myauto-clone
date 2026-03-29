import classNames from 'classnames';
import type { ComponentProps } from 'react';

const DoubleArrowLeft: React.FC<ComponentProps<'svg'>> = ({
	className,
	...props
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
			className={classNames('size-6', className)} 
            {...props}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5'
			/>
		</svg>
	);
};

export default DoubleArrowLeft;

import classNames from 'classnames';
import type { ComponentProps } from 'react';

const FilterTag: React.FC<ComponentProps<'button'>> = ({
	children,
	className,
	...props
}) => {
	return (
		<button
			className={classNames(
				'bg-white whitespace-nowrap pt-2 rounded-full flex items-center gap-x-2 pb-2.5 text-xs text-black-700 px-3 shadow-tag',
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export default FilterTag;

import ArrowLeft from '@/icons/Arrowleft';
import classNames from 'classnames';
import type { ComponentProps } from 'react';

const Breadcrumb: React.FC<
	{
		active?: boolean;
	} & ComponentProps<'li'>
> = ({ active = false, children, className, ...props }) => {
	return (
		<li
			{...props}
			className={classNames(
				'text-xs',
				{
					'text-primary': active,
				},
				className
			)}
		>
			{children}
		</li>
	);
};

const Breadcrumbs = () => {
	return (
		<nav className='max-lg:hidden'>
			<ul className='flex text-secondary items-center gap-x-1'>
				<Breadcrumb>მთავარი</Breadcrumb>
				<ArrowLeft className='w-2.5' />
				<Breadcrumb>ძიება</Breadcrumb>
				<ArrowLeft className='w-2.5' />
				<Breadcrumb active>იყიდება</Breadcrumb>
			</ul>
		</nav>
	);
};

export default Breadcrumbs;

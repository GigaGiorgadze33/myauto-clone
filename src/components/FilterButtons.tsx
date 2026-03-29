import Car from '@/icons/Car';
import Moto from '@/icons/Moto';
import Spec from '@/icons/Spec';
import type { FilterForm, Vechile } from '@/types/filter';
import classNames from 'classnames';
import { type ComponentProps } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const FilterButton: React.FC<
	ComponentProps<'button'> & {
		active?: boolean;
	}
> = ({ active, className, children, ...props }) => {
	return (
		<button
			type='button'
			className={classNames(
				'py-2 w-1/3 px-2.5 flex items-center justify-center transition-all delay-150 border-divider-100',
				{
					'text-neutral': !active,
					'text-primary': active,
				},
				className
			)}
			{...props}
		>
			<div className='h-8 w-15 flex items-center justify-center'>
				{children}
			</div>
		</button>
	);
};

const FilterButtons = () => {
	const { setValue } = useFormContext<FilterForm>();
	const vehicle = useWatch({
		name: 'vechile',
	}) satisfies Vechile;
	const restartVechileBasedFilters = () => {
		setValue('categories', []);
		setValue('manufactorers', []);
		setValue('models', []);
	};
	return (
		<div className='relative flex'>
			<div
				className={classNames(
					'absolute bottom-0 h-px w-1/3 block bg-primary transition-all',
					{
						'left-0': vehicle === 'car',
						'left-1/3': vehicle === 'spec',
						'left-2/3': vehicle === 'moto',
					}
				)}
			/>
			<FilterButton
				className='border-b'
				active={vehicle === 'car'}
				onClick={() => {
					setValue('vechile', 'car');
					restartVechileBasedFilters();
				}}
			>
				<Car />
			</FilterButton>
			<FilterButton
				active={vehicle === 'spec'}
				className='border-x border-b'
				onClick={() => {
					setValue('vechile', 'spec');
					restartVechileBasedFilters();
				}}
			>
				<Spec />
			</FilterButton>
			<FilterButton
				className='border-b'
				active={vehicle === 'moto'}
				onClick={() => {
					setValue('vechile', 'moto');
					restartVechileBasedFilters();
				}}
			>
				<Moto />
			</FilterButton>
		</div>
	);
};

export default FilterButtons;

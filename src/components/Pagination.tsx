import React from 'react';
import classNames from 'classnames';
import ArrowLeft from '@/icons/Arrowleft';
import DoubleArrowLeft from '@/icons/DoubleArrowLeft';

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
};

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
	className,
}) => {
	let startPage = Math.max(1, currentPage - 1);
	const maxVisiblePages = 4;
	let endPage = startPage + maxVisiblePages - 1;

	if (endPage > totalPages) {
		endPage = totalPages;
		startPage = Math.max(1, endPage - maxVisiblePages + 1);
	}

	const pages = Array.from(
		{ length: endPage - startPage + 1 },
		(_, i) => startPage + i
	);

	const baseButtonClasses =
		'flex items-center justify-center w-9 h-9 rounded-md text-sm font-medium transition-colors cursor-pointer select-none';
	const navButtonClasses = classNames(
		baseButtonClasses,
		'text-slate-700 hover:bg-slate-200'
	);

	return (
		<div
			className={classNames(
				'flex items-center rounded-1.5xl bg-white py-4 justify-center',
				className
			)}
		>
			{currentPage > 1 && (
				<>
					<button
						onClick={() => onPageChange(1)}
						className={classNames(navButtonClasses, 'max-lg:hidden')}
						aria-label='First Page'
					>
						<DoubleArrowLeft className='size-4!' />
					</button>
					<button
						onClick={() => onPageChange(currentPage - 1)}
						className={navButtonClasses}
						aria-label='Previous Page'
					>
						<ArrowLeft className='size-4! rotate-180' />
					</button>
				</>
			)}

			{pages.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={classNames(baseButtonClasses, {
						'bg-black-800 text-white': page === currentPage,
						'text-slate-700 hover:bg-slate-200': page !== currentPage,
					})}
				>
					{page}
				</button>
			))}

			{currentPage < totalPages && (
				<>
					<button
						onClick={() => onPageChange(currentPage + 1)}
						className={navButtonClasses}
						aria-label='Next Page'
					>
						<ArrowLeft className='size-4!' />
					</button>
					<button
						onClick={() => onPageChange(totalPages)}
						className={classNames(navButtonClasses, 'max-lg:hidden')}
						aria-label='Last Page'
					>
						<DoubleArrowLeft className='size-4! rotate-180' />
					</button>
				</>
			)}
		</div>
	);
};

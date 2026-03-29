import { useState } from 'react';
import FilterTag from './FilterTag';
import X from '@/icons/X';
import FilterSection from './FilterSection';
import { useWatch } from 'react-hook-form';
import type { FilterForm } from '@/types/filter';

const MobileFiltersSection = () => {
	const [filterOpen, setFilterOpen] = useState(false);
	const values = useWatch() as FilterForm;

	const closeFilter = () => {
		setFilterOpen(false);
		document.body.style.overflow = 'auto';
	};

	return (
		<>
			<div className='flex px-3 items-center mt-4 gap-x-2 justify-start w-full overflow-scroll lg:hidden'>
				<FilterTag
					onClick={() => {
						setFilterOpen(true);
						document.body.style.overflow = 'hidden';
					}}
				>
					ფილტრი
				</FilterTag>
				{values.categories.map((c) => (
					<FilterTag key={c.value}>კატეგორია - {c.label}</FilterTag>
				))}
				{values.manufactorers.map((m) => (
					<FilterTag key={m.value}>მწარმოებელი - {m.label}</FilterTag>
				))}
				{values.models.map((m) => (
					<FilterTag key={m.value}>მოდელი - {m.label}</FilterTag>
				))}
				{values.priceFrom && <FilterTag>ფასი - {values.priceFrom}</FilterTag>}
				{values.priceTo && <FilterTag>ფასი - {values.priceTo}</FilterTag>}
			</div>
			{filterOpen && (
				<div className='fixed overflow-auto z-9999 top-0 left-0 w-screen h-screen bg-primary-gray'>
					<div className='bg-white mb-4 px-4 place- h-16 flex items-center justify-between'>
						<button onClick={closeFilter} className='self-center' type='button'>
							<X />
						</button>
						<div className=''>ფილტრი</div>
						<div></div>
					</div>
					<FilterSection afterSubmit={closeFilter} />
				</div>
			)}
		</>
	);
};

export default MobileFiltersSection;

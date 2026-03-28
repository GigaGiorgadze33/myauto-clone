import React from 'react';
import { useWatch, type FieldPath } from 'react-hook-form';

type ToggleOption = {
	value: string;
	label: React.ReactNode;
};

function RadioToggle<Form extends Record<string, unknown>>({
	options,
	name,
	onChange,
}: {
	options: [ToggleOption, ToggleOption];
	name: FieldPath<Form>;
	onChange: (value: string) => void;
}) {
	const value = useWatch({
		name,
	});
	return (
		<div className='inline-flex items-center border border-divider h-6 rounded-full bg-white'>
			{options.map((option, i) => {
				const isActive = value === option.value;
				return (
					<button
						key={option.value}
						type='button'
						onClick={() => {
							if (!isActive) {
								onChange(option.value);
							} else {
								const otherOption = options[i === 0 ? 1 : 0];
								onChange(otherOption.value);
							}
						}}
						className={`flex items-center transition-all justify-center size-6 rounded-full font-bold transition-all focus:outline-none ${
							isActive
								? 'bg-black-800 text-white shadow-sm'
								: 'text-neutral bg-transparent'
						}`}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}

export default RadioToggle;

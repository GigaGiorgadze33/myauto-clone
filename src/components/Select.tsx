import useClickOutside from '@/hooks/useClickOutside';
import ArrowLeft from '@/icons/Arrowleft';
import X from '@/icons/X';
import type { SelectItem, SelectOption } from '@/types/filter';
import classNames from 'classnames';
import React, { useState, useRef, type ReactNode } from 'react';
import { useWatch, type FieldPath, type FieldPathValue } from 'react-hook-form';

type SelectValue<IsMulti extends boolean> = IsMulti extends true
	? SelectOption[]
	: string | number | null;

export default function Select<
	Form extends Record<string, unknown>,
	IsMulti extends boolean = true,
	Name extends FieldPath<Form> = FieldPath<Form>
>({
	options = [],
	setValue,
	multiple,
	label,
	placeholder,
	name,
	disabled = false,
	required,
}: {
	options?: SelectItem[] | readonly SelectItem[];
	name: Name;
	setValue: (value: FieldPathValue<Form, Name>) => void;
	multiple: IsMulti;
	disabled?: boolean;
	label?: ReactNode;
	required?: boolean;
	placeholder?: ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const selected = useWatch({
		name,
	}) satisfies SelectValue<IsMulti>;

	useClickOutside(dropdownRef, () => setIsOpen(false));

	const isSelected = (option: SelectOption) => {
		if (multiple) {
			return (
				(selected as SelectOption[])?.some(
					(item) => item.value === option.value
				) ?? false
			);
		}
		return selected === option.value;
	};

	const handleSelect = (option: SelectOption) => {
		if (multiple) {
			const currentSelected = (selected as SelectOption[]) || [];
			const newValue = isSelected(option)
				? currentSelected.filter((item) => item.value !== option.value)
				: [...currentSelected, option];
			setValue(newValue as FieldPathValue<Form, Name>);
		} else {
			setValue(option.value as FieldPathValue<Form, Name>);
			setIsOpen(false);
		}
	};

	const handleClear = (e: React.MouseEvent) => {
		if (required) return;
		e.stopPropagation();
		if (multiple) {
			setValue([] as FieldPathValue<Form, Name>);
		} else {
			setValue(null as FieldPathValue<Form, Name>);
		}
		setIsOpen(false);
	};

	const hasSelection = multiple
		? ((selected as SelectOption[])?.length ?? 0) > 0
		: selected !== null && selected !== undefined;

	const renderOption = (option: SelectOption) => (
		<label
			key={option.value}
			className={`flex items-center font-helvetica text-sm py-2 px-4 cursor-pointer group ${
				isSelected(option)
					? 'bg-gray-50 text-black-800 rounded-lg'
					: 'text-secondary'
			}`}
			onClick={(e) => {
				e.preventDefault();
				handleSelect(option);
			}}
		>
			<span className={`${isSelected(option) ? 'font-medium' : ''}`}>
				{option.label}
			</span>
		</label>
	);

	return (
		<div className='relative w-full' ref={dropdownRef}>
			{label && (
				<label className='block text-black-800 text-xs font-medium mb-2'>
					{label}
				</label>
			)}

			<div
				className={classNames(
					'flex items-center h-10 justify-between border-secondary-100 pl-3 pr-2 bg-white border  rounded-xl transition-all',
					{
						'bg-black-800/20! cursor-not-allowed': disabled,
					}
				)}
				onClick={() => {
					if (!disabled) {
						setIsOpen((prev) => !prev);
					}
				}}
			>
				<div className='flex flex-col font-tbc justify-center  text-s overflow-hidden w-full'>
					{!hasSelection ? (
						<span className='text-secondary'>{placeholder}</span>
					) : (
						hasSelection && (
							<span className='font-medium truncate w-full pr-2'>
								{multiple
									? (selected as SelectOption[])
											?.map((item) => item.label)
											.join(', ')
									: (options as SelectOption[]).find(
											(opt) => opt.value === selected
									  )?.label}
							</span>
						)
					)}
				</div>

				<div className='h-full flex items-center'>
					{hasSelection && !required ? (
						<button
							onClick={handleClear}
							className='text-black-800 p-1 hover:bg-divider rounded-full focus:outline-none'
						>
							<X className='size-3' />
						</button>
					) : (
						<span className='text-secondary p-1'>
							<ArrowLeft
								className={classNames(
									isOpen ? '-rotate-90' : 'rotate-90',
									'transition-all size-3!'
								)}
							/>
						</span>
					)}
				</div>
			</div>

			{isOpen && (
				<div className='absolute z-20 w-full left-0 bg-white rounded-2xl mt-1 py-2.5 overflow-hidden border border-divider-100'>
					<div className='max-h-72 overflow-y-auto'>
						{options.map((item, index) => {
							if ('groupLabel' in item) {
								return (
									<div key={`group-${index}`} className='mb-2 pl-4'>
										<div className='py-2 text-xs font-bold text-black-800'>
											{item.groupLabel}
										</div>
										<div className=''>
											{item.options.map((option) => renderOption(option))}
										</div>
									</div>
								);
							}
							return renderOption(item as SelectOption);
						})}
					</div>
				</div>
			)}
		</div>
	);
}

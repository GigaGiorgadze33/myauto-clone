import classNames from 'classnames';
import type { ComponentProps } from 'react';
import { useForm, type FieldPath } from 'react-hook-form';

function Input<Form extends Record<string, unknown>>({
	placeholder,
	name,
	className,
	onChange,
	restrictNonNumbers,
	...props
}: {
	placeholder: string;
	name: FieldPath<Form>;
	restrictNonNumbers?: boolean;
} & ComponentProps<'input'>) {
	const { register } = useForm<Form>();
	return (
		<input
			placeholder={placeholder}
			{...props}
			{...register(name, {
				onChange: (e) => {
					if (restrictNonNumbers) {
						const value = e.target.value;
						if (/\D/.test(value)) {
							e.preventDefault();
							return;
						}
					}
					onChange?.(e);
				},
			})}
			onKeyDown={(e) => {
				if (restrictNonNumbers) {
					if (
						Number.isNaN(Number(e.key)) &&
						e.key !== 'Backspace' &&
						e.key !== 'Tab'
					) {
						e.preventDefault();
					}
				}
			}}
			className={classNames(
				'w-full border-divider-2 font-helvetica text-s px-2.5 py-3 border rounded-lg',
				className
			)}
		/>
	);
}

export default Input;

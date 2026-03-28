import { useFormContext } from 'react-hook-form';
import FilterButtons from './FilterButtons';
import Select from './Select';
import type { FilterForm } from '@/types/filter';
import RadioToggle from './RadioToggle';
import { CURRENCIES } from '@/config/constants';
import Input from './Input';

const FilterSection = () => {
	const { setValue, handleSubmit } = useFormContext<FilterForm>();
	return (
		<form
			role='search'
			onSubmit={handleSubmit((data) => {
				console.log(data);
			})}
			className='bg-white w-[24%] rounded-t-xl border drop-shadow-filter border-divider'
		>
			<FilterButtons />
			<div className='px-6 border-b border-divider-100 pb-6 gap-y-5 flex flex-col pt-5.5'>
				<Select<FilterForm, false>
					setValue={(option) =>
						setValue('for_rent', option as FilterForm['for_rent'])
					}
					name={'for_rent'}
					label='გარიგების ტიპი'
					options={[
						{
							label: 'იყიდება',
							value: '0',
						},
						{
							label: 'ქირავდება',
							value: '1',
						},
					]}
					placeholder={'გარიგების ტიპი'}
					multiple={false}
				/>
				<Select<FilterForm>
					setValue={(options) => setValue('manufactorers', options)}
					name={'manufactorers'}
					label='მწარმოებლები'
					options={[
						{
							label: 'Ford',
							value: 'Ford',
						},
						{
							label: 'Toyota',
							value: 'toyota',
						},
					]}
					multiple
					placeholder={'ყველა მწარომებელი'}
				/>
				<Select<FilterForm>
					setValue={(options) => setValue('models', options)}
					name={'models'}
					label='მოდელები'
					options={[
						{
							label: 'მაზდა',
							value: 'mazda',
						},
						{
							label: 'ფიტი',
							value: 'fit',
						},
					]}
					multiple
					placeholder={'ყველა მოდელი'}
				/>
				<Select<FilterForm>
					setValue={(options) => setValue('categories', options)}
					name={'categories'}
					label='კატეგორიები'
					options={[
						{
							label: 'სედანი',
							value: 'sedan',
						},
						{
							label: 'ფიტი',
							value: 'fit',
						},
					]}
					multiple
					placeholder={'ყველა კატეგორია'}
				/>
			</div>
			<div className='pt-4 px-6 pb-11'>
				<div className='flex items-center justify-between'>
					<span className='font-medium text-s text-black-800'>ფასი</span>
					<RadioToggle<FilterForm>
						onChange={(value) =>
							setValue('currencyId', value as FilterForm['currencyId'])
						}
						name='currencyId'
						options={CURRENCIES}
					/>
				</div>
				<div className='mt-3 gap-x-1 flex items-center'>
					<Input<FilterForm>
						placeholder='დან'
						name='price_range.0'
						type='number'
						restrictNonNumbers
					/>
					<div className='w-1.5 shrink-0 h-0.5 bg-neutral block' />
					<Input<FilterForm>
						placeholder='მდე'
						name='price_range.1'
						type='number'
						restrictNonNumbers
					/>
				</div>
			</div>
			<div className='drop-shadow-filter-search w-full bg-white pt-4 pb-5 px-6'>
				<button
					className='text-white w-full font-bold font-tbc text-sm bg-primary h-8  rounded-md'
					type='submit'
				>
					{/* TODO:  აქ რიცხვების წამოღება არ წერია დოკში და თუ გეცლება მერე იმათი საიტიდან ცადე რევერსი */}
					ძებნა
				</button>
			</div>
		</form>
	);
};

export default FilterSection;

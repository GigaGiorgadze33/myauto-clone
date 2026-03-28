import Navbar from '@/components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import { FormProvider, useForm } from 'react-hook-form';
import type { FilterForm } from './types/filter';
import FilterSection from './components/FilterSection';

const App = () => {
	const form = useForm<FilterForm>({
		defaultValues: {
			currencyId: '1',
			for_rent: null,
			categories: [],
			manufactorers: [],
			models: [],
			price_range: [0, 100000],
			vechile: 'car',
		},
	});
	return (
		<FormProvider {...form}>
			<Navbar />
			<main className='main-container mx-auto mt-8'>
				<Breadcrumbs />
				<div className='flex items-center mt-5 gap-x-5'>
					<FilterSection />
				</div>
			</main>
		</FormProvider>
	);
};

export default App;

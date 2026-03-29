import Navbar from '@/components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import { FormProvider, useForm } from 'react-hook-form';
import type { FilterForm } from './types/filter';
import FilterSection from './components/FilterSection';
import ProductsSection from './components/ProductsSection';
import ApiDataContextProvider from './state/ApiDataContextProvider';
import MobileFiltersSection from './components/MobileFiltersSection';
import Loading from './components/Loading';

const App = () => {
	const searchParams = new URLSearchParams(window.location.search);
	const form = useForm<FilterForm>({
		defaultValues: {
			currencyId: (searchParams.get('currencyId')?.toString() ||
				'1') as FilterForm['currencyId'],
			for_rent: (searchParams.get('for_rent')?.toString() ||
				'0') as FilterForm['for_rent'],
			categories: JSON.parse(searchParams.get('categories') || '[]'),
			manufactorers: JSON.parse(searchParams.get('manufactorers') || '[]'),
			models: JSON.parse(searchParams.get('models') || '[]'),
			priceFrom: Number(searchParams.get('priceFrom')) || null,
			priceTo: Number(searchParams.get('priceTo')) || null,
			vechile: (searchParams.get('vechile')?.toString() ||
				'car') as FilterForm['vechile'],
			period: (searchParams.get('period')?.toString() ||
				'3h') as FilterForm['period'],
			sorting: (searchParams.get('sorting')?.toString() ||
				'1') as FilterForm['sorting'],
			page: Number(searchParams.get('page')?.toString()) || 1,
		},
	});
	return (
		<FormProvider {...form}>
			<ApiDataContextProvider>
				<Navbar />
				<Loading />
				<main className='main-container lg:px-6 pb-8 mx-auto lg:mt-8'>
					<Breadcrumbs />
					<MobileFiltersSection />
					<div className='flex items-start mt-5 gap-x-5'>
						<div className='max-lg:hidden w-[24%]'>
							<FilterSection />
						</div>
						<ProductsSection />
					</div>
				</main>
			</ApiDataContextProvider>
		</FormProvider>
	);
};

export default App;

import Navbar from '@/components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';

const App = () => {
	return (
		<>
			<Navbar />
			<main className='main-container mx-auto mt-8'>
                <Breadcrumbs />
                <div className='flex items-center gap-x-5'></div>
			</main>
		</>
	);
};

export default App;

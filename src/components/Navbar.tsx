import Logo from '@/assets/logo.svg';

const Navbar = () => {
	return (
		<nav className='flex sticky h-fit inset-0 bg-white py-4.25 items-center justify-center'>
			<div className='main-container w-full'>
				<img src={Logo} className='h-11.5' alt='Logo' />
			</div>
		</nav>
	);
};

export default Navbar;

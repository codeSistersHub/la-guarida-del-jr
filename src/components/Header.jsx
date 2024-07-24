import Menu from './Menu';
import LoginButton from './Buttons/LoginButton';
import Logo from './Logo';

function Header() {
	return (
		<header className='flex justify-between md:p-8 items-center'>
			<div className='order-1 md:order-2 '>
				<Menu />
			</div>
			<div className='order-2 md:order-1'>
				<Logo />
			</div>
			<div className='order-3 md:order-3'>
				<LoginButton />
			</div>
		</header>
	);
}

export default Header;

import Menu from './Menu';
import LoginButton from './Buttons/LoginButton';
import Logo from './Logo';
// import codesisters from '../assets/codesisters.webp';

function Header() {
	return (
		<header className='flex w-full justify-between'>
			<Menu />
			{/* <img src={codesisters} alt='Logo de Code Sisters' className='h-8 justify-center' /> */}
    <Logo />
      <LoginButton />
		</header>
	);
}

export default Header;

import login from '../../assets/login.svg';

function LoginButton() {
	return (
		<div className='p-2'>
			<img src={login} alt='Login icon' className='w-8' />
		</div>
	);
}

export default LoginButton;

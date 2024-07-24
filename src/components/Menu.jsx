import { useState } from 'react';
import burger from '../assets/burger.svg';

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isTrabajoOpen, setIsTrabajoOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const toggleTrabajoMenu = () => {
		setIsTrabajoOpen(!isTrabajoOpen);
	};

	return (
		<div>
			{/* Menú hamburguesa para dispositivos móviles */}
			<div className='md:hidden'>
				<button className='p-4 focus:outline-none' onClick={toggleMenu}>
					<img src={burger} alt='Burger menu icon' className='w-8' />
				</button>
			</div>

			{/* Menú desplegable en dispositivos móviles */}
			<div className={`${isOpen ? 'block absolute' : 'hidden'} md:hidden`}>
				<ul className='space-y-2'>
					<li className='p-2'>LLORERÍA</li>
					<li className='p-2'>
						<button onClick={toggleTrabajoMenu}>TRABAJO</button>
						{isTrabajoOpen && (
							<ul className='ml-4 space-y-1'>
								<li className='p-2'>OFERTAS DE EMPLEO</li>
								<li className='p-2'>PRUEBAS TÉCNICAS</li>
								<li className='p-2'>CONSEJOS</li>
							</ul>
						)}
					</li>
					<li className='p-2'>FORMACIÓN</li>
				</ul>
			</div>

			{/* Menú de navegación para tamaños grandes */}
			<div className='hidden md:flex justify-center space-x-8'>
				<a href='#' className='p-2'>
					LLORERÍA
				</a>
				<div className='relative group pt-2'>
					<a href='#' className='p-2'>
						TRABAJO
					</a>
					<div className='absolute hidden group-hover:block bg-white shadow-lg mt-2'>
						<ul className='space-y-1'>
							<li className='p-2'>OFERTAS DE EMPLEO</li>
							<li className='p-2'>PRUEBAS TÉCNICAS</li>
							<li className='p-2'>CONSEJOS</li>
						</ul>
					</div>
				</div>
				<a href='#' className='p-2'>
					FORMACIÓN
				</a>
			</div>
		</div>
	);
};

export default Menu;

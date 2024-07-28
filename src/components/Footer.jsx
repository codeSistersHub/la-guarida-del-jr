function Footer() {
    return (
      <footer className="fixed bottom-0 w-full bg-light_footer text-sisblack py-6 md:px-10">
        <div className="flex flex-col px-4 mx-auto md:flex-row justify-between items-center">
          <div className="md:order-2 flex flex-col md:flex-row text-center md:text-left md:mb-0 md:w-3/5 md:justify-items-end items-center md:gap-28">
            <a href="#quienes_somos" target="_blank" rel="noopener noreferrer" className="mb-2 md:mb-0 hover:text-accentblue">¿Quiénes somos?</a>
            <a href="#aviso_legal" target="_blank" rel="noopener noreferrer" className="mb-2 md:mb-0 hover:text-accentblue">Aviso Legal</a>
            <a href="#contactar" target="_blank" rel="noopener noreferrer"  className="mb-2 md:mb-0 hover:text-accentblue">Contactar</a>
          </div>
          <div className="flex justify-items-start md:order-1"><span className="">&#169; 2024 | CodeSister Hub</span></div>

        </div>
      </footer>
    );
  }
  
  export default Footer;
  
  
  
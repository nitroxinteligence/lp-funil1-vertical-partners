const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-800 text-neutral-500 text-sm p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
        <div className="w-full md:w-1/3 text-center md:text-left">
          <span>Site desenvolvido profissionalmente em minutos 100% com IA</span>
        </div>
        <div className="w-full md:w-1/3 text-center font-bold text-neutral-400">
          <span>Vertical Partners</span>
        </div>
        <div className="w-full md:w-1/3 text-center md:text-right">
          <span>Copyright 2025 – Todos direitos reservados. | <a href="/politicas" className="hover:text-neutral-400">Política</a></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

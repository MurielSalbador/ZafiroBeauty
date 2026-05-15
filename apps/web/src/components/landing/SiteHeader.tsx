import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fdf6f5]/90 backdrop-blur-md border-b border-[#fadcd9]/30">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-dark shadow-sm overflow-hidden p-1 border border-brand-dark/10">
            {/* Placeholder for Logo Image */}
            <div className="w-full h-full rounded-full border border-dashed border-brand-dark/30 flex items-center justify-center">
               <span className="text-[10px] text-brand-dark/50">Img</span>
            </div>
          </div>
          <span className="font-serif text-[1.35rem] text-brand-text italic tracking-wide">Zafiro Beauty</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-[10px] font-sans font-medium text-brand-muted uppercase tracking-[0.2em]">
          <a href="#inicio" className="hover:text-brand-dark transition-colors">Inicio</a>
          <a href="#servicios" className="hover:text-brand-dark transition-colors">Servicios</a>
          <a href="#precios" className="hover:text-brand-dark transition-colors">Precios</a>
          <a href="#cuidados" className="hover:text-brand-dark transition-colors">Cuidados</a>
          <a href="#contacto" className="hover:text-brand-dark transition-colors">Contacto</a>
        </nav>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <Link 
            to="/dashboard" 
            className="bg-brand-dark text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity font-sans text-xs font-medium tracking-wide"
          >
            RESERVAR
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-brand-dark" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden absolute top-24 left-0 w-full bg-[#fdf6f5] border-b border-brand-dark/10 shadow-lg py-6 px-4">
          <div className="flex flex-col items-center gap-6 text-[11px] font-sans font-medium text-brand-muted uppercase tracking-[0.2em]">
            <a href="#inicio" onClick={() => setIsOpen(false)}>Inicio</a>
            <a href="#servicios" onClick={() => setIsOpen(false)}>Servicios</a>
            <a href="#precios" onClick={() => setIsOpen(false)}>Precios</a>
            <a href="#cuidados" onClick={() => setIsOpen(false)}>Cuidados</a>
            <a href="#contacto" onClick={() => setIsOpen(false)}>Contacto</a>
            <Link 
              to="/dashboard" 
              onClick={() => setIsOpen(false)}
              className="bg-brand-dark text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity mt-2 text-center"
            >
              RESERVAR
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

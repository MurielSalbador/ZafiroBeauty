import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer id="contacto" className="bg-[#5a4339] text-white/80 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-serif font-bold text-xs">
                Logo
              </div>
              <span className="font-serif text-xl font-semibold text-white">Zafiro Beauty</span>
            </div>
            <p className="text-sm mb-6 leading-relaxed max-w-sm">
              Tu centro de estética integral y depilación láser de confianza. 
              Resalta tu belleza natural con la mejor tecnología.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-light transition-colors text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-serif text-xl mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-light shrink-0 mt-0.5" />
                <span>Av. Principal 123, Ciudad<br/>Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-light shrink-0" />
                <span>+54 9 11 1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-light shrink-0" />
                <span>info@zafirobeauty.com</span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-serif text-xl mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
              <li><a href="#precios" className="hover:text-white transition-colors">Precios</a></li>
              <li><a href="#cuidados" className="hover:text-white transition-colors">Cuidados Pre/Post</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Zafiro Beauty. Todos los derechos reservados.</p>
          <p>Desarrollado con ❤️ para tu bienestar.</p>
        </div>
      </div>
    </footer>
  );
}

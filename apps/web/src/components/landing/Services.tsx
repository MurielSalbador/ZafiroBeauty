import { Zap, Smile, LayoutGrid, Heart } from "lucide-react";

const services = [
  {
    icon: <Zap size={20} className="text-brand-dark" />,
    title: "Depilación Láser",
    description: "Tecnología Soprano de última generación, casi indolora."
  },
  {
    icon: <Smile size={20} className="text-brand-dark" />,
    title: "Tratamientos Faciales",
    description: "Limpieza profunda y rejuvenecimiento."
  },
  {
    icon: <LayoutGrid size={20} className="text-brand-dark" />,
    title: "Estética Corporal",
    description: "Plan personalizado para tu mejor versión."
  },
  {
    icon: <Heart size={20} className="text-brand-dark" />,
    title: "Atención Personalizada",
    description: "Cada piel es única y la cuidamos como tal."
  }
];

export function Services() {
  return (
    <section id="servicios" className="py-24 bg-[#fcf8f6]">
      <div className="container mx-auto px-4">
        
        {/* Encabezado Lo Que Hacemos */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-4">
            Lo que hacemos
          </span>
          <h2 className="font-serif text-4xl md:text-[2.75rem] text-brand-text mb-3">
            Servicios que <span className="italic text-brand-muted">enamoran</span>
          </h2>
          <p className="font-serif italic text-brand-muted text-lg mb-6">
            Estética integral pensada para cada piel
          </p>
          <div className="w-12 h-px bg-[#fadcd9]"></div>
        </div>
        
        {/* Tarjetas Blancas Cuadradas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-32">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[24px] p-8 text-center shadow-[0_4px_20px_rgba(92,64,51,0.03)] hover:shadow-[0_8px_30px_rgba(92,64,51,0.06)] transition-all duration-300 flex flex-col items-center justify-center min-h-[220px]"
            >
              <div className="w-12 h-12 bg-[#fadcd9] rounded-full flex items-center justify-center mb-5">
                {service.icon}
              </div>
              <h3 className="font-serif text-[1.15rem] text-brand-dark mb-3">{service.title}</h3>
              <p className="text-[11px] text-brand-muted leading-relaxed font-sans">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Encabezado Nuestro Espacio */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-4">
            Nuestro espacio
          </span>
          <h2 className="font-serif text-4xl md:text-[2.75rem] text-brand-text mb-3">
            Un lugar para <span className="italic text-brand-muted">cuidarte</span>
          </h2>
        </div>

        {/* 3 Imágenes Verticales Redondeadas */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Como no tenemos imágenes, usamos divs de color para el layout idéntico */}
          <div className="bg-[#f0e2dd] rounded-[2rem] aspect-[3/4] overflow-hidden flex items-center justify-center relative">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-muted/20 mix-blend-multiply"></div>
             <span className="text-brand-muted/50 text-sm font-sans tracking-widest z-10">[ IMAGEN ESPACIO ]</span>
          </div>
          <div className="bg-[#e8d5cf] rounded-[2rem] aspect-[3/4] overflow-hidden flex items-center justify-center relative">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-muted/20 mix-blend-multiply"></div>
             <span className="text-brand-muted/50 text-sm font-sans tracking-widest z-10">[ IMAGEN TRATAMIENTO ]</span>
          </div>
          <div className="bg-[#fadcd9] rounded-[2rem] aspect-[3/4] overflow-hidden flex items-center justify-center relative">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-muted/20 mix-blend-multiply"></div>
             <span className="text-brand-muted/50 text-sm font-sans tracking-widest z-10">[ IMAGEN PRODUCTOS ]</span>
          </div>
        </div>

      </div>
    </section>
  );
}

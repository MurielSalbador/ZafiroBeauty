import { Lock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf6f5] to-[#fcebe9] min-h-[calc(100vh-6rem)] flex flex-col justify-between pt-16">
      
      {/* Decoraciones sutiles de fondo (estrellas/flores) */}
      <div className="absolute top-40 left-[40%] text-brand-muted/20 text-xl font-light select-none">+</div>
      <div className="absolute bottom-60 right-[30%] text-brand-muted/20 text-xl font-light select-none">+</div>
      <div className="absolute top-20 right-[25%] text-brand-muted/10 opacity-50 w-8 h-8">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" /></svg>
      </div>
      <div className="absolute bottom-40 left-[10%] text-brand-muted/10 opacity-50 w-12 h-12 rotate-45">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" /></svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 flex-1 flex items-center mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Columna Izquierda (Textos) */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-block bg-brand-muted text-white text-[9px] uppercase tracking-[0.15em] px-4 py-1.5 rounded-full mb-8">
              ESTÉTICA INTEGRAL • ÁLVAREZ
            </div>
            
            {/* Título */}
            <h1 className="font-serif text-5xl md:text-6xl text-brand-text mb-6 leading-[1.1]">
              Tu mejor versión <br />
              <span className="italic text-brand-muted">empieza hoy</span>
            </h1>
            
            {/* Subtítulos */}
            <p className="font-serif italic text-lg md:text-xl text-brand-muted mb-8">
              Piel suave, cuidada y segura en cada etapa
            </p>
            
            <p className="text-[13px] text-brand-text/80 mb-10 max-w-md font-sans leading-relaxed">
              Depilación láser de última generación con tecnología Soprano Titanium. 
              Resultados visibles desde las primeras sesiones, en un espacio pensado para vos.
            </p>
            
            {/* Botones */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="#reserva" 
                className="w-full sm:w-auto bg-brand-dark text-white px-8 py-3.5 rounded-full hover:bg-brand-dark/90 transition-all flex items-center justify-center gap-2 font-sans text-xs tracking-wider font-medium"
              >
                <Lock size={14} className="opacity-80" />
                RESERVÁ TU TURNO
              </a>
              <a 
                href="#precios" 
                className="w-full sm:w-auto bg-transparent border border-brand-dark/30 text-brand-dark px-8 py-3.5 rounded-full hover:bg-brand-dark/5 transition-all flex items-center justify-center font-sans text-xs tracking-wider font-medium"
              >
                VER PRECIOS
              </a>
            </div>
          </div>

          {/* Columna Derecha (Imagen Circular) */}
          <div className="hidden lg:flex justify-center relative">
            <div className="w-[450px] h-[450px] rounded-full bg-white/40 shadow-2xl shadow-brand-dark/5 backdrop-blur-sm p-8 relative flex items-center justify-center border border-white/60">
              <div className="w-full h-full rounded-full bg-[#fdf6f5] flex items-center justify-center overflow-hidden shadow-inner border border-brand-dark/5 relative">
                 {/* Placeholder para la imagen de mármol del logo */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-brand-muted/10 to-transparent"></div>
                 <div className="w-[60%] h-[60%] rounded-full border border-brand-dark/20 flex flex-col items-center justify-center relative z-10 bg-white/80 backdrop-blur-sm">
                    <span className="font-serif text-3xl italic text-brand-text">Zafiro</span>
                    <span className="font-serif text-2xl italic text-brand-muted">Beauty</span>
                    <span className="text-[8px] uppercase tracking-widest text-brand-muted/70 mt-2">Estética Integral</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Barra Inferior Marrón Oscuro */}
      <div className="bg-brand-dark text-white py-8 w-full mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <div className="flex flex-col">
              <span className="font-serif text-2xl md:text-3xl mb-1">+500</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/80">Clientas Felices</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl md:text-3xl mb-1">5★</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/80">Calificación Promedio</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl md:text-3xl mb-1">100%</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/80">Tecnología Láser</span>
            </div>
            <div className="flex flex-col border-none">
              <span className="font-serif text-2xl md:text-3xl mb-1">12-99</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/80">Edad Apta</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

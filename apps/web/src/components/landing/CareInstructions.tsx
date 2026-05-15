import { CheckCircle2 } from "lucide-react";

export function CareInstructions() {
  return (
    <section id="cuidados" className="py-24 bg-[#f8e5e5]">
      <div className="container mx-auto px-4">
        
        {/* Encabezado */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-4">
            Antes y después
          </span>
          <h2 className="font-serif text-4xl md:text-[2.75rem] text-brand-text mb-3">
            Cuidados <span className="italic text-brand-muted">esenciales</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto">
          {/* Columna Antes */}
          <div>
            <div className="border-b border-brand-dark/10 pb-4 mb-8">
              <h3 className="font-serif text-xl text-brand-text flex items-center gap-2">
                <span className="text-brand-muted font-light">♡</span> Antes de la sesión
              </h3>
            </div>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-brand-dark rounded-full p-0.5 mt-0.5">
                  <CheckCircle2 size={16} className="text-[#f8e5e5]" />
                </div>
                <span className="text-sm font-sans text-brand-text/90 leading-relaxed">
                  Rasurá la zona 24 hs antes (no usar cera ni pinza).
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-brand-dark rounded-full p-0.5 mt-0.5">
                  <CheckCircle2 size={16} className="text-[#f8e5e5]" />
                </div>
                <span className="text-sm font-sans text-brand-text/90 leading-relaxed">
                  Evitá la exposición al sol o autobronceantes 7 días previos.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-brand-dark rounded-full p-0.5 mt-0.5">
                  <CheckCircle2 size={16} className="text-[#f8e5e5]" />
                </div>
                <span className="text-sm font-sans text-brand-text/90 leading-relaxed">
                  Concurrí con la piel limpia, sin cremas ni desodorantes.
                </span>
              </li>
            </ul>
          </div>

          {/* Columna Después */}
          <div>
            <div className="border-b border-brand-dark/10 pb-4 mb-8">
              <h3 className="font-serif text-xl text-brand-text flex items-center gap-2">
                <span className="text-brand-muted font-light">♡</span> Después de la sesión
              </h3>
            </div>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-brand-dark rounded-full p-0.5 mt-0.5">
                  <CheckCircle2 size={16} className="text-[#f8e5e5]" />
                </div>
                <span className="text-sm font-sans text-brand-text/90 leading-relaxed">
                  Hidratá la zona con cremas suaves recomendadas.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-brand-dark rounded-full p-0.5 mt-0.5">
                  <CheckCircle2 size={16} className="text-[#f8e5e5]" />
                </div>
                <span className="text-sm font-sans text-brand-text/90 leading-relaxed">
                  Evitá agua muy caliente, gimnasio y pileta por 48 hs.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-brand-dark rounded-full p-0.5 mt-0.5">
                  <CheckCircle2 size={16} className="text-[#f8e5e5]" />
                </div>
                <span className="text-sm font-sans text-brand-text/90 leading-relaxed">
                  Usa protector solar SPF 50+ si vas a exponerte al sol.
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

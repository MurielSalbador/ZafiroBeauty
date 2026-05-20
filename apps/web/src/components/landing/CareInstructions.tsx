import { CheckCircle2 } from "lucide-react";

export function CareInstructions() {
  return (
    <>
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

      {/* Sección Tecnología Soprano Titanium */}
      <section id="tecnologia" className="py-24 bg-[#f5ebe6]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 max-w-5xl mx-auto items-center">

            {/* Columna izquierda — texto */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-4 block">
                La tecnología
              </span>
              <h2 className="font-serif text-4xl md:text-[2.75rem] text-brand-text mb-6">
                Soprano <span className="italic text-brand-muted">Titanium</span>
              </h2>
              <p className="text-sm font-sans text-brand-text/80 leading-relaxed mb-10">
                El láser más avanzado del mercado, con triple longitud de onda que se adapta a todo tipo de piel, incluso las más sensibles. Frío, rápido y casi indoloro.
              </p>

              <ul className="space-y-5">
                {[
                  "Triple longitud de onda (Alexandrita, Diodo y Nd:YAG)",
                  "Sistema de enfriamiento continuo",
                  "Apto para todo tipo de piel y vello",
                  "Resultados desde la primera sesión",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="bg-brand-dark rounded-full p-0.5 mt-0.5 shrink-0">
                      <CheckCircle2 size={16} className="text-[#f5ebe6]" />
                    </div>
                    <span className="text-sm font-sans text-brand-text/90 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna derecha — card */}
            <div className="bg-[#f0d9d4] rounded-3xl overflow-hidden shadow-sm">

              {/* Imagen del equipo Soprano Titanium */}
              <div className="w-full h-56 bg-[#e8c9c0] overflow-hidden">
                <img
                  src="https://www.alma-soprano.com/wp-content/themes/binternet/assets/images/top-product.png"
                  alt="Equipo Soprano Titanium"
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Info card */}
              <div className="p-8 text-center">
                <h3 className="font-serif text-2xl italic text-brand-text mb-1">Soprano</h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-6">
                  Titanium · Alma Lasers
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/60 rounded-xl py-4 px-3 text-center">
                    <p className="font-serif text-3xl text-brand-text mb-1">3</p>
                    <p className="text-[11px] text-brand-muted">Longitudes de onda</p>
                  </div>
                  <div className="bg-white/60 rounded-xl py-4 px-3 text-center">
                    <p className="font-serif text-3xl text-brand-text mb-1">0</p>
                    <p className="text-[11px] text-brand-muted">Tiempo de recuperación</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
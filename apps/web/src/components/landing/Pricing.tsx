import { useState } from "react";
import { Shield, Sparkles, Droplet, Heart, CheckCircle2 } from "lucide-react";

export function Pricing() {
  const [gender, setGender] = useState<"mujeres" | "varones">("mujeres");

  return (
    <section id="precios" className="bg-[#fdf6f5] py-24">

      {/* BLOQUE 1: Inicio a la depilación */}
      <div className="container mx-auto px-4 mb-32">
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-4">
            Inversión en vos
          </span>
          <h2 className="font-serif text-4xl md:text-[2.75rem] text-brand-text mb-3">
            Inicio a la <span className="italic text-brand-muted">depilación</span>
          </h2>
          <p className="font-serif italic text-brand-muted text-lg mb-8">
            De 12 a 99 años - Promociones para empezar
          </p>

          {/* Toggle Mujeres/Varones */}
          <div className="bg-white rounded-full p-1.5 flex shadow-sm border border-brand-dark/5 mb-12">
            <button
              onClick={() => setGender("mujeres")}
              className={`px-8 py-2.5 rounded-full text-xs font-sans tracking-wider font-medium transition-colors ${gender === "mujeres" ? "bg-brand-dark text-white" : "text-brand-muted hover:text-brand-dark"
                }`}
            >
              MUJERES
            </button>
            <button
              onClick={() => setGender("varones")}
              className={`px-8 py-2.5 rounded-full text-xs font-sans tracking-wider font-medium transition-colors ${gender === "varones" ? "bg-brand-dark text-white" : "text-brand-muted hover:text-brand-dark"
                }`}
            >
              VARONES
            </button>
          </div>
        </div>

        {/* Tarjetas de Promociones Básicas */}
        {gender === "mujeres" ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-[20px] p-6 flex justify-between items-center shadow-sm border border-brand-dark/5">
              <div>
                <h4 className="font-sans font-medium text-brand-dark text-sm mb-1">Bozo + Axilas</h4>
                <p className="text-[10px] text-brand-muted">Suavidad todos los días</p>
              </div>
              <div className="bg-[#fadcd9] text-brand-dark font-sans font-semibold text-sm px-4 py-1.5 rounded-full">
                $10.500
              </div>
            </div>
            <div className="bg-white rounded-[20px] p-6 flex justify-between items-center shadow-sm border border-brand-dark/5">
              <div>
                <h4 className="font-sans font-medium text-brand-dark text-sm mb-1">Axilas + Media Pierna</h4>
                <p className="text-[10px] text-brand-muted">Ligera, cómoda y libre</p>
              </div>
              <div className="bg-[#fadcd9] text-brand-dark font-sans font-semibold text-sm px-4 py-1.5 rounded-full">
                $13.500
              </div>
            </div>
            <div className="bg-white rounded-[20px] p-6 flex justify-between items-center shadow-sm border border-brand-dark/5">
              <div>
                <h4 className="font-sans font-medium text-brand-dark text-sm mb-1">Cavado Simple + Axilas</h4>
                <p className="text-[10px] text-brand-muted">Comodidad y frescura para vos</p>
              </div>
              <div className="bg-[#fadcd9] text-brand-dark font-sans font-semibold text-sm px-4 py-1.5 rounded-full">
                $14.500
              </div>
            </div>
            <div className="bg-white rounded-[20px] p-6 flex justify-between items-center shadow-sm border border-brand-dark/5">
              <div>
                <h4 className="font-sans font-medium text-brand-dark text-sm mb-1">Piernas Completas + Axilas + Bozo</h4>
                <p className="text-[10px] text-brand-muted">El combo completo para sentirte imparable</p>
              </div>
              <div className="bg-[#fadcd9] text-brand-dark font-sans font-semibold text-sm px-4 py-1.5 rounded-full">
                $19.500
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-[20px] p-6 flex justify-between items-center shadow-sm border border-brand-dark/5">
              <div>
                <h4 className="font-sans font-medium text-brand-dark text-sm mb-1">Pecho + Abdomen</h4>
                <p className="text-[10px] text-brand-muted">Definición y confianza</p>
              </div>
              <div className="bg-[#fadcd9] text-brand-dark font-sans font-semibold text-sm px-4 py-1.5 rounded-full">
                $15.000
              </div>
            </div>
            <div className="bg-white rounded-[20px] p-6 flex justify-between items-center shadow-sm border border-brand-dark/5">
              <div>
                <h4 className="font-sans font-medium text-brand-dark text-sm mb-1">Espalda Completa</h4>
                <p className="text-[10px] text-brand-muted">Ideal para el deporte</p>
              </div>
              <div className="bg-[#fadcd9] text-brand-dark font-sans font-semibold text-sm px-4 py-1.5 rounded-full">
                $17.500
              </div>
            </div>
            <div className="bg-white rounded-[20px] p-6 flex justify-between items-center shadow-sm border border-brand-dark/5">
              <div>
                <h4 className="font-sans font-medium text-brand-dark text-sm mb-1">Axilas + Pecho</h4>
                <p className="text-[10px] text-brand-muted">Frescura todo el día</p>
              </div>
              <div className="bg-[#fadcd9] text-brand-dark font-sans font-semibold text-sm px-4 py-1.5 rounded-full">
                $13.000
              </div>
            </div>
            <div className="bg-white rounded-[20px] p-6 flex justify-between items-center shadow-sm border border-brand-dark/5">
              <div>
                <h4 className="font-sans font-medium text-brand-dark text-sm mb-1">Piernas Completas</h4>
                <p className="text-[10px] text-brand-muted">Rendí al máximo</p>
              </div>
              <div className="bg-[#fadcd9] text-brand-dark font-sans font-semibold text-sm px-4 py-1.5 rounded-full">
                $20.500
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-sans text-brand-muted/80 tracking-wide uppercase">
          <span className="flex items-center gap-2"><Sparkles size={12} /> Tecnología láser de última generación</span>
          <span className="flex items-center gap-2"><Sparkles size={12} /> Apto para pieles jóvenes y sensibles</span>
        </div>
      </div>

      {/* BLOQUE 2: Tarifario Completo */}
      <div className="container mx-auto px-4 mb-32">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-4">
            Tarifario Completo
          </span>
          <h2 className="font-serif text-4xl md:text-[2.75rem] text-brand-text mb-2">
            Depilación <span className="italic text-brand-muted">Definitiva</span>
          </h2>
          <p className="font-serif italic text-brand-muted text-sm mb-6">
            ♡ Soprano Titanium ♡
          </p>
          <div className="text-[9px] uppercase tracking-[0.2em] text-brand-muted/70 flex gap-4">
            <span>+ RESULTADOS REALES</span>
            <span>+ TECNOLOGÍA PREMIUM</span>
            <span>+ ATENCIÓN PERSONALIZADA</span>
          </div>
        </div>

        {/* Las Dos Columnas Principales */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Combos Femeninos */}
          <div className="bg-white rounded-[2rem] border border-[#fadcd9]/50 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-[#e8bdcc] text-white text-center py-4 text-xs font-sans tracking-widest font-medium uppercase">
              ♀ COMBOS FEMENINOS
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <ul className="space-y-4 text-xs font-sans text-brand-text/80 font-medium w-full">
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap">Bozo + Mentón</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$13.000</span>
                </li>
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap">Rostro completo</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$17.000</span>
                </li>
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap">Cavado completo + Axilas + Brazos</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$24.000</span>
                </li>
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap">Cavado completo + Axilas + Media pierna</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$24.000</span>
                </li>
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap">Rostro + Axilas + Media pierna</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$26.000</span>
                </li>
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap">Cavado bikini + Glúteos + Tira de cola</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$18.000</span>
                </li>
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap">Bozo + Axilas + Media pierna</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$20.000</span>
                </li>
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap">Piernas completas + Axilas</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$24.000</span>
                </li>
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap">Piernas completas + Axilas + Cavado bikini</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$26.000</span>
                </li>
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap">Rostro completo + Axilas</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$22.000</span>
                </li>
              </ul>

              <div className="mt-auto pt-8">
                <div className="bg-[#e8bdcc] rounded-2xl p-6 text-center text-white">
                  <p className="text-[10px] uppercase tracking-widest mb-1">CUERPO COMPLETO ✦</p>
                  <p className="font-serif italic text-sm mb-4">Promo especial</p>
                  <div className="bg-white text-brand-dark text-xl font-serif font-bold py-2 px-8 rounded-full inline-block mx-auto">
                    $ 38.000
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Combos Masculinos */}
          <div className="bg-white rounded-[2rem] border border-brand-dark/10 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-brand-dark text-white text-center py-4 text-xs font-sans tracking-widest font-medium uppercase">
              ♂ COMBOS MASCULINOS
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <ul className="space-y-4 text-xs font-sans text-brand-text/80 font-medium w-full mb-8">
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap text-brand-muted"><CheckCircle2 size={12} className="inline mr-1 -mt-1" /> Piernas completas</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$24.000</span>
                </li>
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap text-brand-muted"><CheckCircle2 size={12} className="inline mr-1 -mt-1" /> Pecho + Abdomen</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$24.000</span>
                </li>
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap text-brand-muted"><CheckCircle2 size={12} className="inline mr-1 -mt-1" /> Pecho + Abdomen + Espalda</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$30.000</span>
                </li>
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap text-brand-muted"><CheckCircle2 size={12} className="inline mr-1 -mt-1" /> Rostro + Axilas</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$16.000</span>
                </li>
                <li className="flex items-end w-full">
                  <span className="whitespace-nowrap text-brand-muted"><CheckCircle2 size={12} className="inline mr-1 -mt-1" /> Pecho</span>
                  <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                  <span>$13.000</span>
                </li>
              </ul>

              <div className="bg-[#fcf8f6] rounded-2xl p-6 mb-6">
                <div className="text-center text-[9px] uppercase tracking-widest text-brand-muted mb-4">+ NUEVOS COMBOS +</div>
                <ul className="space-y-3 text-xs font-sans text-brand-text/80 font-medium w-full">
                  <li className="flex items-end w-full">
                    <span className="whitespace-nowrap"><span className="text-brand-muted">+</span> Espalda + Medio brazo</span>
                    <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                    <span className="flex items-center gap-2">$22.000 <span className="bg-[#fadcd9] text-brand-dark text-[8px] px-1.5 py-0.5 rounded-sm">NUEVO</span></span>
                  </li>
                  <li className="flex items-end w-full">
                    <span className="whitespace-nowrap"><span className="text-brand-muted">+</span> Pecho + Abdomen + Medio brazo</span>
                    <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                    <span className="flex items-center gap-2">$26.000 <span className="bg-[#fadcd9] text-brand-dark text-[8px] px-1.5 py-0.5 rounded-sm">NUEVO</span></span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#fcf8f6] rounded-2xl p-6 mb-8">
                <div className="text-center text-[9px] uppercase tracking-widest text-brand-muted mb-4">+ COMBOS MÁS ELEGIDOS +</div>
                <ul className="space-y-3 text-xs font-sans text-brand-text/80 font-medium w-full">
                  <li className="flex items-end w-full">
                    <span className="whitespace-nowrap"><span className="text-brand-muted">+</span> Espalda + Hombros + Brazos</span>
                    <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                    <span>$26.000</span>
                  </li>
                  <li className="flex items-end w-full">
                    <span className="whitespace-nowrap"><span className="text-brand-muted">+</span> Pecho + Abdomen + Brazos</span>
                    <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                    <span>$26.000</span>
                  </li>
                  <li className="flex items-end w-full">
                    <span className="whitespace-nowrap"><span className="text-brand-muted">+</span> Espalda + Brazos + Axilas</span>
                    <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                    <span>$26.000</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto">
                <div className="bg-brand-dark rounded-2xl p-6 text-center text-white">
                  <p className="text-[10px] uppercase tracking-widest mb-4">CUERPO COMPLETO MASCULINO</p>
                  <div className="bg-white text-brand-dark text-xl font-serif font-bold py-2 px-8 rounded-full inline-block mx-auto">
                    $ 43.000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOQUE 3: Zonas Destacadas */}
      <div className="container mx-auto px-4 text-center">
        <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-8 inline-block">
          + ZONAS DESTACADAS +
        </span>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-[#fadcd9]/50 rounded-[24px] p-8">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-brand-dark">
              <Sparkles size={16} />
            </div>
            <h4 className="font-serif text-lg text-brand-dark mb-2">Brazos completos</h4>
            <p className="font-sans text-brand-muted text-sm">$18.000</p>
          </div>
          <div className="bg-[#fadcd9]/50 rounded-[24px] p-8">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-brand-dark">
              <Sparkles size={16} />
            </div>
            <h4 className="font-serif text-lg text-brand-dark mb-2">Medio brazo</h4>
            <p className="font-sans text-brand-muted text-sm">$12.000</p>
          </div>
          <div className="bg-[#fadcd9]/50 rounded-[24px] p-8">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-brand-dark">
              <Sparkles size={16} />
            </div>
            <h4 className="font-serif text-lg text-brand-dark mb-2">Espalda completa</h4>
            <p className="font-sans text-brand-muted text-sm">$20.000</p>
          </div>
        </div>

        {/* Iconos de Beneficios */}
        <div className="flex flex-wrap justify-center items-start gap-12 max-w-3xl mx-auto mb-16">
          <div className="flex flex-col items-center max-w-[120px]">
            <div className="w-10 h-10 bg-[#fadcd9] rounded-full flex items-center justify-center mb-3 text-brand-dark">
              <Shield size={16} />
            </div>
            <span className="text-[10px] font-sans text-brand-muted leading-relaxed">Tecnología de última generación</span>
          </div>
          <div className="flex flex-col items-center max-w-[120px]">
            <div className="w-10 h-10 bg-[#fadcd9] rounded-full flex items-center justify-center mb-3 text-brand-dark">
              <Sparkles size={16} />
            </div>
            <span className="text-[10px] font-sans text-brand-muted leading-relaxed">Resultados desde las primeras sesiones</span>
          </div>
          <div className="flex flex-col items-center max-w-[120px]">
            <div className="w-10 h-10 bg-[#fadcd9] rounded-full flex items-center justify-center mb-3 text-brand-dark">
              <Droplet size={16} />
            </div>
            <span className="text-[10px] font-sans text-brand-muted leading-relaxed">Apta para todo tipo de piel y vello</span>
          </div>
          <div className="flex flex-col items-center max-w-[120px]">
            <div className="w-10 h-10 bg-[#fadcd9] rounded-full flex items-center justify-center mb-3 text-brand-dark">
              <Heart size={16} />
            </div>
            <span className="text-[10px] font-sans text-brand-muted leading-relaxed">Tu piel, mi prioridad</span>
          </div>
        </div>

        <p className="font-serif italic text-brand-muted text-lg">
          Invertí en tu comodidad, <span className="text-brand-muted">olvidate del vello ♡</span>
        </p>

      </div>
    </section>
  );
}

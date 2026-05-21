import { useState } from "react";
import { Shield, Sparkles, Droplet, Heart, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Pricing() {
  const [gender, setGender] = useState<"mujeres" | "varones">("mujeres");
  const [prevGender, setPrevGender] = useState<"mujeres" | "varones">("mujeres");

  const handleToggle = (next: "mujeres" | "varones") => {
    setPrevGender(gender);
    setGender(next);
  };

  const direction = gender === "mujeres" ? -1 : 1;

  return (
    <section id="precios" className="bg-[#fdf6f5] py-24">

      {/* BLOQUE 1: Inicio */}
      <div className="container mx-auto px-4 mb-32">
        <motion.div
          className="text-center mb-12 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-4">Inversión en vos</span>
          <h2 className="font-serif text-4xl md:text-[2.75rem] text-brand-text mb-3">
            Inicio a la <span className="italic text-brand-muted">depilación</span>
          </h2>
          <p className="font-serif italic text-brand-muted text-lg mb-8">De 12 a 99 años - Promociones para empezar</p>

          {/* Toggle animado */}
          <div className="bg-white rounded-full p-1.5 flex shadow-sm border border-brand-dark/5 mb-12 relative">
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-brand-dark"
              animate={{ left: gender === "mujeres" ? "6px" : "50%", width: "calc(50% - 6px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <button
              onClick={() => handleToggle("mujeres")}
              className={`px-8 py-2.5 rounded-full text-xs font-sans tracking-wider font-medium transition-colors relative z-10 ${gender === "mujeres" ? "text-white" : "text-brand-muted hover:text-brand-dark"}`}
            >
              MUJERES
            </button>
            <button
              onClick={() => handleToggle("varones")}
              className={`px-8 py-2.5 rounded-full text-xs font-sans tracking-wider font-medium transition-colors relative z-10 ${gender === "varones" ? "text-white" : "text-brand-muted hover:text-brand-dark"}`}
            >
              VARONES
            </button>
          </div>
        </motion.div>

        {/* Cards con AnimatePresence slide */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={gender}
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {gender === "mujeres" ? (
                <>
                  {[
                    { title: "Bozo + Axilas", desc: "Suavidad todos los días", price: "$10.500" },
                    { title: "Axilas + Media Pierna", desc: "Ligera, cómoda y libre", price: "$13.500" },
                    { title: "Cavado Simple + Axilas", desc: "Comodidad y frescura para vos", price: "$14.500" },
                    { title: "Piernas Completas + Axilas + Bozo", desc: "El combo completo para sentirte imparable", price: "$19.500" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      className="bg-white rounded-[20px] p-6 flex justify-between items-center shadow-sm border border-brand-dark/5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(92,64,51,0.08)" }}
                    >
                      <div>
                        <h4 className="font-sans font-medium text-brand-dark text-sm mb-1">{item.title}</h4>
                        <p className="text-[10px] text-brand-muted">{item.desc}</p>
                      </div>
                      <div className="bg-[#fadcd9] text-brand-dark font-sans font-semibold text-sm px-4 py-1.5 rounded-full">{item.price}</div>
                    </motion.div>
                  ))}
                </>
              ) : (
                <>
                  {[
                    { title: "Pecho + Abdomen", desc: "Definición y confianza", price: "$15.000" },
                    { title: "Espalda Completa", desc: "Ideal para el deporte", price: "$17.500" },
                    { title: "Axilas + Pecho", desc: "Frescura todo el día", price: "$13.000" },
                    { title: "Piernas Completas", desc: "Rendí al máximo", price: "$20.500" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      className="bg-white rounded-[20px] p-6 flex justify-between items-center shadow-sm border border-brand-dark/5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(92,64,51,0.08)" }}
                    >
                      <div>
                        <h4 className="font-sans font-medium text-brand-dark text-sm mb-1">{item.title}</h4>
                        <p className="text-[10px] text-brand-muted">{item.desc}</p>
                      </div>
                      <div className="bg-[#fadcd9] text-brand-dark font-sans font-semibold text-sm px-4 py-1.5 rounded-full">{item.price}</div>
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-sans text-brand-muted/80 tracking-wide uppercase">
          <span className="flex items-center gap-2"><Sparkles size={12} /> Tecnología láser de última generación</span>
          <span className="flex items-center gap-2"><Sparkles size={12} /> Apto para pieles jóvenes y sensibles</span>
        </div>
      </div>

      {/* BLOQUE 2: Tarifario */}
      <div className="container mx-auto px-4 mb-32">
        <motion.div
          className="text-center mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-4">Tarifario Completo</span>
          <h2 className="font-serif text-4xl md:text-[2.75rem] text-brand-text mb-2">
            Depilación <span className="italic text-brand-muted">Definitiva</span>
          </h2>
          <p className="font-serif italic text-brand-muted text-sm mb-6">♡ Soprano Titanium ♡</p>
          <div className="text-[9px] uppercase tracking-[0.2em] text-brand-muted/70 flex gap-4">
            <span>+ RESULTADOS REALES</span>
            <span>+ TECNOLOGÍA PREMIUM</span>
            <span>+ ATENCIÓN PERSONALIZADA</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Combos Femeninos — entra desde la izquierda */}
          <motion.div
            className="bg-white rounded-[2rem] border border-[#fadcd9]/50 shadow-sm overflow-hidden flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="bg-[#e8bdcc] text-white text-center py-4 text-xs font-sans tracking-widest font-medium uppercase">
              ♀ COMBOS FEMENINOS
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <ul className="space-y-4 text-xs font-sans text-brand-text/80 font-medium w-full">
                {[
                  ["Bozo + Mentón", "$13.000"],
                  ["Rostro completo", "$17.000"],
                  ["Cavado completo + Axilas + Brazos", "$24.000"],
                  ["Cavado completo + Axilas + Media pierna", "$24.000"],
                  ["Rostro + Axilas + Media pierna", "$26.000"],
                  ["Cavado bikini + Glúteos + Tira de cola", "$18.000"],
                  ["Bozo + Axilas + Media pierna", "$20.000"],
                  ["Piernas completas + Axilas", "$24.000"],
                  ["Piernas completas + Axilas + Cavado bikini", "$26.000"],
                  ["Rostro completo + Axilas", "$22.000"],
                ].map(([name, price], i) => (
                  <motion.li
                    key={name}
                    className="flex items-end w-full"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="whitespace-nowrap">{name}</span>
                    <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                    <span>{price}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <div className="bg-[#e8bdcc] rounded-2xl p-6 text-center text-white">
                  <p className="text-[10px] uppercase tracking-widest mb-1">CUERPO COMPLETO ✦</p>
                  <p className="font-serif italic text-sm mb-4">Promo especial</p>
                  <div className="bg-white text-brand-dark text-xl font-serif font-bold py-2 px-8 rounded-full inline-block mx-auto">$ 38.000</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Combos Masculinos — entra desde la derecha */}
          <motion.div
            className="bg-white rounded-[2rem] border border-brand-dark/10 shadow-sm overflow-hidden flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="bg-brand-dark text-white text-center py-4 text-xs font-sans tracking-widest font-medium uppercase">
              ♂ COMBOS MASCULINOS
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <ul className="space-y-4 text-xs font-sans text-brand-text/80 font-medium w-full mb-8">
                {[
                  ["Piernas completas", "$24.000"],
                  ["Pecho + Abdomen", "$24.000"],
                  ["Pecho + Abdomen + Espalda", "$30.000"],
                  ["Rostro + Axilas", "$16.000"],
                  ["Pecho", "$13.000"],
                ].map(([name, price], i) => (
                  <motion.li
                    key={name}
                    className="flex items-end w-full"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="whitespace-nowrap text-brand-muted"><CheckCircle2 size={12} className="inline mr-1 -mt-1" /> {name}</span>
                    <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                    <span>{price}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="bg-[#fcf8f6] rounded-2xl p-6 mb-6">
                <div className="text-center text-[9px] uppercase tracking-widest text-brand-muted mb-4">+ NUEVOS COMBOS +</div>
                <ul className="space-y-3 text-xs font-sans text-brand-text/80 font-medium w-full">
                  {[
                    ["Espalda + Medio brazo", "$22.000"],
                    ["Pecho + Abdomen + Medio brazo", "$26.000"],
                  ].map(([name, price]) => (
                    <li key={name} className="flex items-end w-full">
                      <span className="whitespace-nowrap"><span className="text-brand-muted">+</span> {name}</span>
                      <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                      <span className="flex items-center gap-2">
                        {price}
                        {/* Badge NUEVO pulsante */}
                        <motion.span
                          className="bg-[#fadcd9] text-brand-dark text-[8px] px-1.5 py-0.5 rounded-sm"
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          NUEVO
                        </motion.span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#fcf8f6] rounded-2xl p-6 mb-8">
                <div className="text-center text-[9px] uppercase tracking-widest text-brand-muted mb-4">+ COMBOS MÁS ELEGIDOS +</div>
                <ul className="space-y-3 text-xs font-sans text-brand-text/80 font-medium w-full">
                  {[
                    ["Espalda + Hombros + Brazos", "$26.000"],
                    ["Pecho + Abdomen + Brazos", "$26.000"],
                    ["Espalda + Brazos + Axilas", "$26.000"],
                  ].map(([name, price]) => (
                    <li key={name} className="flex items-end w-full">
                      <span className="whitespace-nowrap"><span className="text-brand-muted">+</span> {name}</span>
                      <div className="flex-1 border-b border-dotted border-brand-muted/30 mx-3 mb-1"></div>
                      <span>{price}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <div className="bg-brand-dark rounded-2xl p-6 text-center text-white">
                  <p className="text-[10px] uppercase tracking-widest mb-4">CUERPO COMPLETO MASCULINO</p>
                  <div className="bg-white text-brand-dark text-xl font-serif font-bold py-2 px-8 rounded-full inline-block mx-auto">$ 43.000</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BLOQUE 3: Zonas Destacadas */}
      <div className="container mx-auto px-4 text-center">
        <motion.span
          className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-8 inline-block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          + ZONAS DESTACADAS +
        </motion.span>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {[
            { title: "Brazos completos", price: "$18.000" },
            { title: "Medio brazo", price: "$12.000" },
            { title: "Espalda completa", price: "$20.000" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-[#fadcd9]/50 rounded-[24px] p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-brand-dark">
                <Sparkles size={16} />
              </div>
              <h4 className="font-serif text-lg text-brand-dark mb-2">{item.title}</h4>
              <p className="font-sans text-brand-muted text-sm">{item.price}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-start gap-12 max-w-3xl mx-auto mb-16">
          {[
            { icon: <Shield size={16} />, text: "Tecnología de última generación" },
            { icon: <Sparkles size={16} />, text: "Resultados desde las primeras sesiones" },
            { icon: <Droplet size={16} />, text: "Apta para todo tipo de piel y vello" },
            { icon: <Heart size={16} />, text: "Tu piel, mi prioridad" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center max-w-[120px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-10 h-10 bg-[#fadcd9] rounded-full flex items-center justify-center mb-3 text-brand-dark">{item.icon}</div>
              <span className="text-[10px] font-sans text-brand-muted leading-relaxed">{item.text}</span>
            </motion.div>
          ))}
        </div>

        <p className="font-serif italic text-brand-muted text-lg">
          Invertí en tu comodidad, <span className="text-brand-muted">olvidate del vello ♡</span>
        </p>
      </div>
    </section>
  );
}

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const beforeItems = [
  "Rasurá la zona 24 hs antes (no usar cera ni pinza).",
  "Evitá la exposición al sol o autobronceantes 7 días previos.",
  "Concurrí con la piel limpia, sin cremas ni desodorantes.",
];

const afterItems = [
  "Hidratá la zona con cremas suaves recomendadas.",
  "Evitá agua muy caliente, gimnasio y pileta por 48 hs.",
  "Usa protector solar SPF 50+ si vas a exponerte al sol.",
];

const sopranoFeatures = [
  "Triple longitud de onda (Alexandrita, Diodo y Nd:YAG)",
  "Sistema de enfriamiento continuo",
  "Apto para todo tipo de piel y vello",
  "Resultados desde la primera sesión",
];

export function CareInstructions() {
  return (
    <>
      <section id="cuidados" className="py-24 bg-[#f8e5e5]">
        <div className="container mx-auto px-4">

          {/* Encabezado */}
          <motion.div
            className="text-center mb-16 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-4">Antes y después</span>
            <h2 className="font-serif text-4xl md:text-[2.75rem] text-brand-text mb-3">
              Cuidados <span className="italic text-brand-muted">esenciales</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto">

            {/* Columna Antes — entra desde la izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="border-b border-brand-dark/10 pb-4 mb-8">
                <h3 className="font-serif text-xl text-brand-text flex items-center gap-2">
                  <motion.span
                    className="text-brand-muted font-light"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ♡
                  </motion.span>
                  Antes de la sesión
                </h3>
              </div>
              <ul className="space-y-6">
                {beforeItems.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  >
                    <motion.div
                      className="bg-brand-dark rounded-full p-0.5 mt-0.5"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 400 }}
                    >
                      <CheckCircle2 size={16} className="text-[#f8e5e5]" />
                    </motion.div>
                    <span className="text-sm font-sans text-brand-text/90 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Columna Después — entra desde la derecha */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="border-b border-brand-dark/10 pb-4 mb-8">
                <h3 className="font-serif text-xl text-brand-text flex items-center gap-2">
                  <motion.span
                    className="text-brand-muted font-light"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    ♡
                  </motion.span>
                  Después de la sesión
                </h3>
              </div>
              <ul className="space-y-6">
                {afterItems.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  >
                    <motion.div
                      className="bg-brand-dark rounded-full p-0.5 mt-0.5"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 400 }}
                    >
                      <CheckCircle2 size={16} className="text-[#f8e5e5]" />
                    </motion.div>
                    <span className="text-sm font-sans text-brand-text/90 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Sección Soprano Titanium */}
      <section id="tecnologia" className="py-24 bg-[#f5ebe6]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 max-w-5xl mx-auto items-center">

            {/* Texto — entra desde la izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-4 block">La tecnología</span>
              <h2 className="font-serif text-4xl md:text-[2.75rem] text-brand-text mb-6">
                Soprano <span className="italic text-brand-muted">Titanium</span>
              </h2>
              <p className="text-sm font-sans text-brand-text/80 leading-relaxed mb-10">
                El láser más avanzado del mercado, con triple longitud de onda que se adapta a todo tipo de piel, incluso las más sensibles. Frío, rápido y casi indoloro.
              </p>

              <ul className="space-y-5">
                {sopranoFeatures.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                  >
                    <motion.div
                      className="bg-brand-dark rounded-full p-0.5 mt-0.5 shrink-0"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 400 }}
                    >
                      <CheckCircle2 size={16} className="text-[#f5ebe6]" />
                    </motion.div>
                    <span className="text-sm font-sans text-brand-text/90 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Card equipo — entra desde la derecha con hover */}
            <motion.div
              className="bg-[#f0d9d4] rounded-3xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(92,64,51,0.12)" }}
            >
              <div className="w-full h-56 bg-[#e8c9c0] overflow-hidden">
                <motion.img
                  src="https://www.alma-soprano.com/wp-content/themes/binternet/assets/images/top-product.png"
                  alt="Equipo Soprano Titanium"
                  className="w-full h-full object-contain p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="p-8 text-center">
                <h3 className="font-serif text-2xl italic text-brand-text mb-1">Soprano</h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-6">Titanium · Alma Lasers</p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "3", label: "Longitudes de onda" },
                    { value: "0", label: "Tiempo de recuperación" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/60 rounded-xl py-4 px-3 text-center"
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.85)" }}
                    >
                      <motion.p
                        className="font-serif text-3xl text-brand-text mb-1"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-[11px] text-brand-muted">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
import { motion } from "framer-motion";

const contactCards = [
  {
    label: "Turnos por WhatsApp",
    value: "341 7183587",
    sub: "Lun a Sáb · 9 a 20 hs",
  },
  {
    label: "Álvarez",
    value: "Atención con turno",
    sub: "Santa Fe, Argentina",
  },
  {
    label: "Seguinos",
    value: "@zafirobeauty.alvarez",
    sub: "Mirá nuestros trabajos",
  },
];

export function Footer() {
  return (
    <footer id="contacto" className="bg-[#5a4339] text-white">
      <div className="py-20 px-4">
        <div className="container mx-auto max-w-3xl flex flex-col items-center text-center">

          {/* Eyebrow */}
          <motion.span
            className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Hablemos
          </motion.span>

          {/* Título */}
          <motion.h2
            className="font-serif text-4xl md:text-5xl text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Reservá tu turno
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            className="font-serif italic text-white/60 text-lg mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Invertí hoy en tu bienestar
          </motion.p>

          {/* Cards de contacto con stagger */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-12">
            {contactCards.map((card, i) => (
              <motion.div
                key={i}
                className="border border-white/15 rounded-2xl px-6 py-6 flex flex-col items-center gap-2 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                whileHover={{ borderColor: "rgba(255,255,255,0.3)", scale: 1.02 }}
              >
                <span className="text-white/40 text-xs uppercase tracking-widest mb-1">{card.label}</span>
                <p className="text-white font-semibold text-lg leading-tight">{card.value}</p>
                <p className="text-white/45 text-xs">{card.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Botón WhatsApp con latido */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
          >
            <motion.a
              href="https://wa.me/5493417183587"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25d366] text-white font-semibold text-sm px-8 py-4 rounded-full"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{
                scale: 1.08,
                backgroundColor: "#1ebe5d",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.96 }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </motion.svg>
              Escribinos por WhatsApp
            </motion.a>
          </motion.div>

        </div>
      </div>

      {/* Pie */}
      <div className="bg-[#4a342a] py-4 px-4">
        <p className="text-center text-white/35 text-xs">
          Zafiro Beauty Álvarez · Depilación Láser ✿ · Daiana Acosta
        </p>
      </div>
    </footer>
  );
}
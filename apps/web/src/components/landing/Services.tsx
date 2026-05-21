import { Zap, Smile, LayoutGrid, Heart } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const services = [
  { icon: <Zap size={20} className="text-brand-dark" />, title: "Depilación Láser", description: "Tecnología Soprano de última generación, casi indolora." },
  { icon: <Smile size={20} className="text-brand-dark" />, title: "Tratamientos Faciales", description: "Limpieza profunda y rejuvenecimiento." },
  { icon: <LayoutGrid size={20} className="text-brand-dark" />, title: "Estética Corporal", description: "Plan personalizado para tu mejor versión." },
  { icon: <Heart size={20} className="text-brand-dark" />, title: "Atención Personalizada", description: "Cada piel es única y la cuidamos como tal." },
];

// Card con hover 3D tilt
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-[24px] p-8 text-center shadow-[0_4px_20px_rgba(92,64,51,0.03)] hover:shadow-[0_12px_40px_rgba(92,64,51,0.1)] transition-shadow duration-300 flex flex-col items-center justify-center min-h-[220px] cursor-default"
      style={{ transition: "transform 0.15s ease, box-shadow 0.3s ease" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-12 h-12 bg-[#fadcd9] rounded-full flex items-center justify-center mb-5"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {service.icon}
      </motion.div>
      <h3 className="font-serif text-[1.15rem] text-brand-dark mb-3">{service.title}</h3>
      <p className="text-[11px] text-brand-muted leading-relaxed font-sans">{service.description}</p>
    </motion.div>
  );
}

// Imagen con parallax al scroll
function ParallaxImage({ src, alt, delay = 0 }: { src: string; alt: string; delay?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      className="rounded-[2rem] aspect-[3/4] overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y, scale: 1.1 }}
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="servicios" className="py-24 bg-[#fcf8f6]">
      <div className="container mx-auto px-4">

        {/* Encabezado */}
        <motion.div
          className="text-center mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-4">Lo que hacemos</span>
          <h2 className="font-serif text-4xl md:text-[2.75rem] text-brand-text mb-3">
            Servicios que <span className="italic text-brand-muted">enamoran</span>
          </h2>
          <p className="font-serif italic text-brand-muted text-lg mb-6">Estética integral pensada para cada piel</p>
          <motion.div
            className="w-12 h-px bg-[#fadcd9]"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Cards con stagger + 3D tilt */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-32">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Encabezado espacio */}
        <motion.div
          className="text-center mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-4">Nuestro espacio</span>
          <h2 className="font-serif text-4xl md:text-[2.75rem] text-brand-text mb-3">
            Un lugar para <span className="italic text-brand-muted">cuidarte</span>
          </h2>
        </motion.div>

        {/* Imágenes con parallax */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <ParallaxImage src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80" alt="Espacio del centro" delay={0} />
          <ParallaxImage src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80" alt="Tratamiento facial" delay={0.1} />
          <ParallaxImage src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&q=80" alt="Productos de skincare" delay={0.2} />
        </div>

      </div>
    </section>
  );
}
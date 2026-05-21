import { Lock, Clock, Calendar as CalendarIcon } from "lucide-react";
import logo from "../../public/logo-dai.png";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useInView, animate } from "framer-motion";

type Appointment = {
  id: string;
  client: string;
  date: string;
  time: string;
  services: string[];
  total: number;
  paid: number;
  status: "PENDING" | "COMPLETED" | "NO_SHOW";
};

function Sparkle({ x, y, delay, size = 4 }: { x: number; y: number; delay: number; size?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: Math.random() * 4 + 2, ease: "easeInOut" }}
    >
      <svg width={size * 3} height={size * 3} viewBox="0 0 24 24">
        <path d="M12 2 L13.5 10 L22 12 L13.5 14 L12 22 L10.5 14 L2 12 L10.5 10 Z" fill="#c9a0a0" fillOpacity="0.6" />
      </svg>
    </motion.div>
  );
}

function Petal({ startX, delay }: { startX: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${startX}%`, top: "-5%" }}
      animate={{ y: ["0vh", "110vh"], x: [0, 40, -20, 30, 0], rotate: [0, 180, 360, 540, 720], opacity: [0, 0.7, 0.7, 0] }}
      transition={{ duration: 10 + Math.random() * 5, delay, repeat: Infinity, repeatDelay: Math.random() * 8, ease: "linear" }}
    >
      <svg width="16" height="20" viewBox="0 0 16 20">
        <ellipse cx="8" cy="10" rx="5" ry="9" fill="#e8bdcc" fillOpacity="0.5" transform="rotate(-15 8 10)" />
      </svg>
    </motion.div>
  );
}

function Butterfly({ initialX, initialY, size = 40, delay = 0, color = "#c9a0a0" }: { initialX: number; initialY: number; size?: number; delay?: number; color?: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${initialX}%`, top: `${initialY}%` }}
      animate={{ x: [0, 30, -20, 40, 0], y: [0, -20, 10, -30, 0] }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.svg
        width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1"
        animate={{ scaleX: [1, 0.3, 1, 0.3, 1] }}
        transition={{ duration: 0.6, delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M20 20 Q10 10 4 14 Q-2 18 8 24 Q14 28 20 20Z" fill={color} fillOpacity="0.15" />
        <path d="M20 20 Q30 10 36 14 Q42 18 32 24 Q26 28 20 20Z" fill={color} fillOpacity="0.15" />
        <path d="M20 20 Q13 26 12 32 Q11 38 20 36" />
        <path d="M20 20 Q27 26 28 32 Q29 38 20 36" />
        <line x1="20" y1="14" x2="15" y2="8" />
        <line x1="20" y1="14" x2="25" y2="8" />
      </motion.svg>
    </motion.div>
  );
}

function ShimmerRing() {
  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ background: "conic-gradient(from 0deg, transparent 0%, #e8bdcc44 20%, transparent 40%, #fadcd966 60%, transparent 80%, #e8bdcc44 100%)" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ── Contador animado nativo con Framer Motion ──
function AnimatedCounter({ from, to, duration = 2.5, prefix = "", suffix = "" }: { from: number; to: number; duration?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.round(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function AnimatedStat({ value, label, prefix = "", suffix = "" }: { value: number | string; label: string; prefix?: string; suffix?: string }) {
  const isNumeric = typeof value === "number";

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="font-serif text-2xl md:text-3xl mb-1">
        {isNumeric ? (
          <AnimatedCounter from={0} to={value as number} prefix={prefix} suffix={suffix} />
        ) : (
          `${prefix}${value}${suffix}`
        )}
      </span>
      <span className="text-[9px] uppercase tracking-[0.2em] text-white/80">{label}</span>
    </motion.div>
  );
}

// Typewriter para el subtítulo
function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>|</motion.span>}
    </span>
  );
}

const sparkles = Array.from({ length: 18 }, (_, i) => ({ x: Math.random() * 100, y: Math.random() * 100, delay: i * 0.4, size: Math.random() * 3 + 3 }));
const petals = Array.from({ length: 12 }, (_, i) => ({ startX: Math.random() * 100, delay: i * 1.2 }));

export function Hero() {
  const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const logoRotateX = useTransform(springY, [-300, 300], [8, -8]);
  const logoRotateY = useTransform(springX, [-300, 300], [-8, 8]);

  useEffect(() => {
    const saved = localStorage.getItem("zafiro_appointments");
    if (saved) {
      const appointments: Appointment[] = JSON.parse(saved);
      const last = appointments.reverse().find((a) => a.status === "PENDING");
      if (last) setNextAppointment(last);
    }
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } } };

  const stats = [
    { value: 500, label: "Clientas Felices", prefix: "+", suffix: "" },
    { value: "5★", label: "Calificación Promedio", prefix: "", suffix: "" },
    { value: 100, label: "Tecnología Láser", prefix: "", suffix: "%" },
    { value: "12-99", label: "Edad Apta", prefix: "", suffix: "" },
  ];

  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-[#fdf6f5] via-[#faeae8] to-[#f5dbd9] min-h-[calc(100vh-6rem)] flex flex-col justify-between pt-16">

      {petals.map((p, i) => <Petal key={i} startX={p.startX} delay={p.delay} />)}
      {sparkles.map((s, i) => <Sparkle key={i} x={s.x} y={s.y} delay={s.delay} size={s.size} />)}

      <Butterfly initialX={8} initialY={15} size={36} delay={0} color="#c9a0a0" />
      <Butterfly initialX={75} initialY={8} size={28} delay={1.5} color="#e8bdcc" />
      <Butterfly initialX={55} initialY={60} size={22} delay={3} color="#d4a0b0" />
      <Butterfly initialX={20} initialY={70} size={18} delay={2} color="#c9a0a0" />

      {/* Ramas botánicas (igual que antes) */}
      <motion.svg className="absolute top-0 left-0 w-40 h-48 text-brand-muted/20 select-none pointer-events-none" viewBox="0 0 160 200" fill="none" stroke="currentColor" strokeWidth="1" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: "easeOut" }}>
        <path d="M30 200 Q40 140 60 100 Q80 60 70 10" strokeLinecap="round" />
        <path d="M60 100 Q40 85 20 75" strokeLinecap="round" />
        <path d="M60 100 Q75 80 90 65" strokeLinecap="round" />
        <path d="M50 130 Q30 115 15 110" strokeLinecap="round" />
        <path d="M50 130 Q65 115 78 105" strokeLinecap="round" />
        <path d="M70 10 Q60 25 45 30" strokeLinecap="round" />
        <path d="M70 10 Q80 22 95 28" strokeLinecap="round" />
        <ellipse cx="19" cy="74" rx="6" ry="10" transform="rotate(-30 19 74)" fill="currentColor" fillOpacity="0.15" />
        <ellipse cx="91" cy="64" rx="6" ry="10" transform="rotate(20 91 64)" fill="currentColor" fillOpacity="0.15" />
        <ellipse cx="14" cy="109" rx="5" ry="9" transform="rotate(-40 14 109)" fill="currentColor" fillOpacity="0.15" />
      </motion.svg>

      <motion.svg className="absolute bottom-16 left-0 w-36 h-44 text-brand-muted/20 select-none pointer-events-none" viewBox="0 0 160 180" fill="none" stroke="currentColor" strokeWidth="1" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}>
        <path d="M20 180 Q50 140 60 100 Q70 60 110 20" strokeLinecap="round" />
        <path d="M60 100 Q35 90 18 95" strokeLinecap="round" />
        <path d="M60 100 Q78 82 95 80" strokeLinecap="round" />
        <path d="M40 140 Q20 130 10 140" strokeLinecap="round" />
        <ellipse cx="17" cy="94" rx="5" ry="9" transform="rotate(-50 17 94)" fill="currentColor" fillOpacity="0.15" />
        <ellipse cx="96" cy="79" rx="5" ry="9" transform="rotate(15 96 79)" fill="currentColor" fillOpacity="0.15" />
      </motion.svg>

      <motion.svg className="absolute top-0 right-0 w-44 h-52 text-brand-muted/20 select-none pointer-events-none" viewBox="0 0 180 210" fill="none" stroke="currentColor" strokeWidth="1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}>
        <path d="M160 200 Q140 140 120 100 Q100 60 110 10" strokeLinecap="round" />
        <path d="M120 100 Q145 85 162 75" strokeLinecap="round" />
        <path d="M120 100 Q102 82 88 68" strokeLinecap="round" />
        <path d="M135 130 Q155 115 168 112" strokeLinecap="round" />
        <path d="M135 130 Q118 118 108 110" strokeLinecap="round" />
        <path d="M110 10 Q120 22 136 28" strokeLinecap="round" />
        <path d="M110 10 Q100 25 86 32" strokeLinecap="round" />
        <ellipse cx="163" cy="74" rx="6" ry="10" transform="rotate(30 163 74)" fill="currentColor" fillOpacity="0.15" />
        <ellipse cx="87" cy="67" rx="6" ry="10" transform="rotate(-20 87 67)" fill="currentColor" fillOpacity="0.15" />
        <ellipse cx="169" cy="111" rx="5" ry="9" transform="rotate(40 169 111)" fill="currentColor" fillOpacity="0.15" />
      </motion.svg>

      {[{ top: "44px", left: "38%" }, { top: "72px", right: "38%" }, { bottom: "32px", left: "20%" }, { top: "60px", right: "22%" }].map((pos, i) => (
        <motion.span key={i} className="absolute text-brand-muted/20 text-lg font-light select-none" style={pos as any} animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.4, 1] }} transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}>+</motion.span>
      ))}

      {/* Contenido */}
      <div className="container mx-auto px-4 relative z-10 flex-1 flex items-center mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          <motion.div className="max-w-xl" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <div className="inline-block bg-brand-muted text-white text-[9px] uppercase tracking-[0.15em] px-4 py-1.5 rounded-full mb-8">
                ESTÉTICA INTEGRAL · ÁLVAREZ
              </div>
            </motion.div>

            <motion.h1 className="font-serif text-5xl md:text-6xl text-brand-text mb-6 leading-[1.1]" variants={itemVariants}>
              Tu mejor versión <br />
              <motion.span className="italic text-brand-muted inline-block" animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}>
                empieza hoy
              </motion.span>
            </motion.h1>

            {/* Typewriter en subtítulo */}
            <motion.p className="font-serif italic text-lg md:text-xl text-brand-muted mb-8" variants={itemVariants}>
              <TypewriterText text="Piel suave, cuidada y segura en cada etapa" />
            </motion.p>

            <motion.p className="text-[13px] text-brand-text/80 mb-6 max-w-md font-sans leading-relaxed" variants={itemVariants}>
              Depilación láser de última generación con tecnología Soprano Titanium.
              Resultados visibles desde las primeras sesiones, en un espacio pensado para vos.
            </motion.p>

            <AnimatePresence>
              {nextAppointment && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-[#fadcd9] shadow-sm max-w-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#fadcd9]/30 flex items-center justify-center text-brand-dark">
                      <CalendarIcon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Tu Próximo Turno</p>
                      <p className="text-sm font-bold text-brand-text capitalize">
                        {new Date(nextAppointment.date).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}
                      </p>
                      <div className="flex items-center gap-4 mt-0.5">
                        <span className="text-xs text-brand-muted flex items-center gap-1"><Clock size={12} /> {nextAppointment.time} hs</span>
                        <span className="text-xs text-brand-muted flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Pendiente</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div className="flex flex-col sm:flex-row items-center gap-4" variants={itemVariants}>
              <motion.a
                href="#reserva"
                className="w-full sm:w-auto bg-brand-dark text-white px-8 py-3.5 rounded-full flex items-center justify-center gap-2 font-sans text-xs tracking-wider font-medium relative overflow-hidden"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              >
                <motion.span className="absolute inset-0 bg-white/10" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.5 }} />
                <Lock size={14} className="opacity-80 relative z-10" />
                <span className="relative z-10">RESERVÁ TU TURNO</span>
              </motion.a>
              <motion.a
                href="#precios"
                className="w-full sm:w-auto bg-transparent border border-brand-dark/30 text-brand-dark px-8 py-3.5 rounded-full flex items-center justify-center font-sans text-xs tracking-wider font-medium"
                whileHover={{ scale: 1.04, backgroundColor: "rgba(92,64,51,0.05)" }} whileTap={{ scale: 0.97 }}
              >
                VER PRECIOS
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Logo 3D */}
          <motion.div className="hidden lg:flex justify-center relative" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <motion.div className="absolute w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle, #fadcd960 0%, #e8bdcc20 50%, transparent 70%)" }} animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute w-[460px] h-[460px] rounded-full border border-[#e8bdcc]/30" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ borderStyle: "dashed" }} />
            <motion.div className="w-[420px] h-[420px] rounded-full bg-white/50 shadow-xl shadow-brand-dark/5 backdrop-blur-sm p-6 relative flex items-center justify-center border border-white/70" style={{ rotateX: logoRotateX, rotateY: logoRotateY, transformPerspective: 800 }}>
              <ShimmerRing />
              <div className="w-full h-full rounded-full overflow-hidden border border-brand-dark/5 bg-[#fdf6f5] flex items-center justify-center relative z-10">
                <motion.img src={logo} alt="Zafiro Beauty" className="w-[85%] h-[85%] object-contain" animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
              </div>
            </motion.div>
            {[{ x: -180, y: -60, size: 12, color: "#fadcd9", delay: 0 }, { x: 190, y: 80, size: 8, color: "#e8bdcc", delay: 1 }, { x: -140, y: 150, size: 10, color: "#d4a0b0", delay: 2 }, { x: 160, y: -120, size: 6, color: "#fadcd9", delay: 0.5 }, { x: 0, y: -210, size: 14, color: "#e8bdcc", delay: 1.5 }].map((orb, i) => (
              <motion.div key={i} className="absolute rounded-full" style={{ width: orb.size, height: orb.size, background: orb.color, left: "50%", top: "50%", marginLeft: orb.x, marginTop: orb.y, boxShadow: `0 0 ${orb.size * 2}px ${orb.color}` }} animate={{ y: [0, -15, 0], scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3 + i * 0.5, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Stats bar con contadores ── */}
      <motion.div className="bg-brand-dark text-white py-8 w-full mt-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.1 }}>
                <AnimatedStat value={stat.value} label={stat.label} prefix={stat.prefix} suffix={stat.suffix} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
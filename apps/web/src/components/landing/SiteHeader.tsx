import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import logo from "../../public/logo-dai.png";
import { motion, AnimatePresence } from "framer-motion";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#precios", label: "Precios" },
    { href: "#cuidados", label: "Cuidados" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-[#fadcd9]/30"
      style={{
        backgroundColor: scrolled ? "rgba(253,246,245,0.97)" : "rgba(253,246,245,0.90)",
        backdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 2px 20px rgba(92,64,51,0.06)" : "none",
      }}
      animate={{ boxShadow: scrolled ? "0 2px 20px rgba(92,64,51,0.06)" : "0 0 0 rgba(0,0,0,0)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-brand-dark/10 bg-[#fdf6f5]"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img src={logo} alt="Zafiro Beauty Logo" className="w-full h-full object-contain" />
            </motion.div>
            <span className="font-serif text-[1.35rem] text-brand-text italic tracking-wide">Zafiro Beauty</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <motion.nav
          className="hidden lg:flex items-center gap-8 text-[10px] font-sans font-medium text-brand-muted uppercase tracking-[0.2em]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative hover:text-brand-dark transition-colors group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -2 }}
            >
              {link.label}
              <motion.span
                className="absolute -bottom-1 left-0 h-px bg-brand-muted"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          ))}
        </motion.nav>

        {/* Desktop Button */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/dashboard"
              className="bg-brand-dark text-white px-6 py-2.5 rounded-full font-sans text-xs font-medium tracking-wide relative overflow-hidden inline-block"
            >
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10">RESERVAR</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="lg:hidden text-brand-dark"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden absolute top-24 left-0 w-full bg-[#fdf6f5] border-b border-brand-dark/10 shadow-lg py-6 px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-6 text-[11px] font-sans font-medium text-brand-muted uppercase tracking-[0.2em]">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="bg-brand-dark text-white px-8 py-3 rounded-full mt-2 text-center"
              >
                RESERVAR
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
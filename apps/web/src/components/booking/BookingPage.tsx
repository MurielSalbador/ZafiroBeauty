import { useState, useMemo } from "react";
import { authClient } from "@/lib/auth-client";
import { SERVICES } from "@/lib/servicesData";
import type { Service } from "@/lib/servicesData";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";

import { Calendar } from "../Calendar";

export default function BookingPage() {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  // Sync blocked days from localStorage for demo
  const blockedDays = useMemo(() => {
    const saved = localStorage.getItem('zafiro_blocked_days');
    return saved ? JSON.parse(saved) : ['2026-05-17', '2026-05-25'];
  }, []);

  const total = useMemo(() => {
    return selectedServices.reduce((acc, id) => {
      const service = SERVICES.find((s) => s.id === id);
      return acc + (service?.price || 0);
    }, 0);
  }, [selectedServices]);

  const handleToggleService = (service: Service) => {
    setSelectedServices((prev) => {
      const isCombo = service.category === "COMBOS" || service.category === "COMBOS INICIO";
      const isZone = service.category === "ZONAS SEPARADAS";

      if (prev.includes(service.id)) {
        return prev.filter((id) => id !== service.id);
      }

      if (isCombo) {
        return [service.id];
      }

      if (isZone) {
        const filtered = prev.filter((id) => {
          const s = SERVICES.find((item) => item.id === id);
          return s?.category !== "COMBOS" && s?.category !== "COMBOS INICIO";
        });
        return [...filtered, service.id];
      }

      return [...prev, service.id];
    });
  };

  const [paymentStep, setPaymentStep] = useState<"idle" | "info" | "receipt">("idle");

  const handleConfirm = () => {
    if (!selectedDate) return toast.error("Por favor elegí un día");
    if (!selectedSlot) return toast.error("Por favor elegí un horario");
    if (selectedServices.length === 0) return toast.error("Seleccioná al menos un servicio");
    
    setPaymentStep("info");
  };

  const deposit = total * 0.5;

  const handleGoToPayment = () => {
    window.open("https://link.mercadopago.com.ar/zafirobeautyalvarez", "_blank");
    setPaymentStep("receipt");
  };

  const handleSendReceipt = () => {
    if (!selectedDate || !selectedSlot) return;

    // Persist booking to local storage for demo
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;

    const newApt = {
      id: Math.random().toString(36).substring(7),
      client: (session?.user as any)?.name || "Cliente Invitado",
      date: dateKey,
      time: selectedSlot,
      services: selectedServices.map(id => SERVICES.find(s => s.id === id)?.name || ""),
      total: total,
      paid: deposit,
      status: 'PENDING'
    };

    const savedApts = localStorage.getItem('zafiro_appointments');
    const apts = savedApts ? JSON.parse(savedApts) : [
      { id: "1", client: "Lucía Pérez", date: "2026-05-15", time: "10:00", services: ["Piernas completas + Axilas"], total: 24000, paid: 12000, status: 'PENDING' },
      { id: "2", client: "Marcos Gómez", date: "2026-05-15", time: "11:00", services: ["Pecho + Abdomen"], total: 24000, paid: 24000, status: 'COMPLETED' },
      { id: "3", client: "Elena R.", date: "2026-05-16", time: "15:00", services: ["Limpieza facial profunda"], total: 15000, paid: 0, status: 'PENDING' },
    ];
    apts.push(newApt);
    localStorage.setItem('zafiro_appointments', JSON.stringify(apts));

    const savedSlots = localStorage.getItem('zafiro_booked_slots');
    const slotsObj = savedSlots ? JSON.parse(savedSlots) : {
      '2026-05-20': ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']
    };
    if (!slotsObj[dateKey]) slotsObj[dateKey] = [];
    if (!slotsObj[dateKey].includes(selectedSlot)) slotsObj[dateKey].push(selectedSlot);
    localStorage.setItem('zafiro_booked_slots', JSON.stringify(slotsObj));

    toast.success("¡Turno registrado! Esperando confirmación del pago.");
    
    // WhatsApp URL generation
    const dateStr = selectedDate.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
    const text = `¡Hola Zafiro Beauty! ✿ Acabo de abonar la seña para mi turno de Depilación Láser.%0A%0A🗓️ Día: ${dateStr}%0A⏰ Horario: ${selectedSlot}%0A💵 Seña abonada: $${deposit.toLocaleString()}%0A%0AAdjunto el comprobante de pago.`;
    window.open(`https://wa.me/5493417183587?text=${text}`, "_blank");
    
    setPaymentStep("idle");
    // Reset selection after booking
    setSelectedDate(null);
    setSelectedSlot(null);
    setSelectedServices([]);
  };

  return (
    <div className="min-h-screen bg-[#fdf6f5] font-sans text-brand-text selection:bg-brand-muted/20">
      {/* Payment Modal */}
      <AnimatePresence>
        {paymentStep !== "idle" && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setPaymentStep("idle")}
               className="absolute inset-0 bg-brand-dark/40 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl relative z-10 border border-brand-dark/5"
             >
                {paymentStep === "info" ? (
                  <>
                    <div className="text-center mb-8">
                       <div className="w-16 h-16 rounded-full bg-brand-muted/10 text-brand-dark flex items-center justify-center mx-auto mb-6">
                          <Check size={32} />
                       </div>
                       <h2 className="font-serif text-3xl italic text-brand-text mb-2">Casi listo...</h2>
                       <p className="text-brand-muted text-sm leading-relaxed">
                          Para asegurar tu lugar en nuestra agenda, solicitamos una seña del 50% del total del servicio.
                       </p>
                    </div>

                    <div className="bg-[#fdf6f5] rounded-3xl p-6 mb-8 space-y-4">
                       <div className="flex justify-between items-center text-sm">
                          <span className="text-brand-muted">Total del servicio</span>
                          <span className="font-bold">$ {total.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-bold uppercase tracking-widest text-brand-dark">Seña requerida (50%)</span>
                          <span className="text-2xl font-serif text-brand-dark italic font-bold">$ {deposit.toLocaleString()}</span>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <button 
                         onClick={handleGoToPayment}
                         className="w-full bg-[#009EE3] text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#008ACA] transition-all shadow-lg flex items-center justify-center gap-2"
                       >
                         Pagar con MercadoPago
                       </button>
                       <button 
                         onClick={() => setPaymentStep("idle")}
                         className="w-full py-4 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-dark transition-all"
                       >
                         Volver y revisar
                       </button>
                    </div>

                    <p className="text-[9px] text-center text-brand-muted/60 mt-8 leading-relaxed">
                       Al hacer clic, serás redirigido a nuestra plataforma de pago segura. El saldo restante se abonará el día del turno.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-center mb-8">
                       <div className="w-16 h-16 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto mb-6">
                          <Check size={32} />
                       </div>
                       <h2 className="font-serif text-3xl italic text-brand-text mb-2">Último paso</h2>
                       <p className="text-brand-muted text-sm leading-relaxed">
                          Una vez realizado el pago en MercadoPago, por favor envianos el comprobante por WhatsApp para confirmar tu turno definitivamente.
                       </p>
                    </div>

                    <div className="space-y-3">
                       <button 
                         onClick={handleSendReceipt}
                         className="w-full bg-[#25D366] text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#1EBE5D] transition-all shadow-lg flex items-center justify-center gap-2"
                       >
                         Enviar comprobante por WhatsApp
                       </button>
                       <button 
                         onClick={() => setPaymentStep("idle")}
                         className="w-full py-4 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-dark transition-all"
                       >
                         Cerrar
                       </button>
                    </div>
                  </>
                )}
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mini Header */}
      <header className="px-8 py-6 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-white p-1">
             <span className="text-[8px] italic leading-none">ZB</span>
          </div>
          <span className="font-serif italic text-lg tracking-wide">Zafiro Beauty</span>
        </Link>
        <nav className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-brand-muted">
          <Link to="/" className="hover:text-brand-dark transition-colors">Inicio</Link>
          {(session?.user as any)?.role === 'ADMIN' && (
            <Link to="/admin" className="text-brand-dark border-b border-brand-dark pb-0.5">Admin</Link>
          )}
          <button onClick={async () => {
            await authClient.signOut();
            navigate("/");
          }} className="hover:text-brand-dark">Salir</button>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted mb-4 block">Reservá tu turno</span>
          <h1 className="font-serif text-5xl text-brand-text italic leading-tight">Elegí día y horario</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          
          {/* Columna Calendario */}
          <div className="min-h-[600px]">
             <Calendar 
                isAdmin={false}
                blockedDays={blockedDays}
                onDateSelect={setSelectedDate}
                onSlotSelect={setSelectedSlot}
             />
          </div>

          {/* Columna Servicios */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-brand-dark/5 flex flex-col h-[700px]">
             <h2 className="font-serif text-xl italic text-brand-text mb-6 px-2">Servicios</h2>
             
             <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
                {(['COMBOS', 'COMBOS INICIO', 'ZONAS SEPARADAS', 'FACIAL'] as const).map(cat => (
                  <div key={cat}>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-brand-muted font-bold mb-4 px-2">{cat}</p>
                    <div className="space-y-2">
                       {SERVICES.filter(s => s.category === cat).map(s => (
                         <label 
                          key={s.id} 
                          className={`
                            flex items-center justify-between p-3 rounded-xl border border-transparent hover:bg-[#fdf6f5] transition-all cursor-pointer group
                            ${selectedServices.includes(s.id) ? 'bg-[#fdf6f5] border-brand-dark/10' : ''}
                          `}
                         >
                            <div className="flex items-center gap-3">
                               <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedServices.includes(s.id) ? 'bg-brand-dark border-brand-dark' : 'border-brand-dark/20 bg-white group-hover:border-brand-dark/40'}`}>
                                  {selectedServices.includes(s.id) && <Check size={10} className="text-white"/>}
                               </div>
                               <span className="text-[11px] font-medium text-brand-text/90">{s.name}</span>
                            </div>
                            <span className="text-[10px] font-bold text-brand-muted/70 group-hover:text-brand-dark transition-colors">$ {s.price.toLocaleString()}</span>
                            <input 
                              type="checkbox" 
                              className="hidden" 
                              checked={selectedServices.includes(s.id)}
                              onChange={() => handleToggleService(s)}
                            />
                         </label>
                       ))}
                    </div>
                  </div>
                ))}
             </div>

             <div className="mt-6 pt-6 border-t border-brand-dark/5">
                <textarea 
                  placeholder="Notas (opcional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#fdf6f5] border-none rounded-xl p-4 text-[11px] text-brand-text placeholder:text-brand-muted/50 resize-none h-20 outline-none mb-6"
                ></textarea>

                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-[9px] uppercase tracking-widest text-brand-muted font-bold mb-1">Total estimado</p>
                      <p className="text-2xl font-serif text-brand-text">$ {total.toLocaleString()}</p>
                   </div>
                   <button 
                    onClick={handleConfirm}
                    className="bg-[#c8b3a9] text-white px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-dark transition-all shadow-lg shadow-brand-dark/5"
                   >
                     Confirmar Turno
                   </button>
                </div>
             </div>
          </div>
        </div>

        <p className="text-center mt-12 text-[10px] text-brand-muted italic">
          Recibirás un recordatorio. Para cancelar, contactanos por WhatsApp.
        </p>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #7b5c4e40;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7b5c4e80;
        }
      `}</style>
    </div>
  );
}

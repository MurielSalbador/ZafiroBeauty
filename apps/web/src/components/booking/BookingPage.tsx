import { useState, useMemo } from "react";
import { authClient } from "@/lib/auth-client";
import { SERVICES } from "@/lib/servicesData";
import type { Service } from "@/lib/servicesData";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";

export default function BookingPage() {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

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

      // Logic: If selecting a Combo, clear all Zonas and other Combos (allow only one combo)
      if (isCombo) {
        return [service.id];
      }

      // Logic: If selecting a Zone, clear all Combos
      if (isZone) {
        const filtered = prev.filter((id) => {
          const s = SERVICES.find((item) => item.id === id);
          return s?.category !== "COMBOS" && s?.category !== "COMBOS INICIO";
        });
        return [...filtered, service.id];
      }

      // Facial services can be combined with anything? Assuming yes or follow logic.
      return [...prev, service.id];
    });
  };

  const handleConfirm = () => {
    if (!selectedDate) return toast.error("Por favor elegí un día");
    if (selectedServices.length === 0) return toast.error("Seleccioná al menos un servicio");
    
    // Mock confirmation modal/logic
    toast.success("¡Turno reservado! Te contactaremos para coordinar la seña.");
  };

  return (
    <div className="min-h-screen bg-[#fdf6f5] font-sans text-brand-text selection:bg-brand-muted/20">
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
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-brand-dark/5 min-h-[500px]">
             <div className="flex justify-between items-center mb-10 px-4">
                <button className="p-2 hover:bg-brand-light/10 rounded-full transition-colors"><ChevronLeft size={20}/></button>
                <h2 className="font-serif text-xl italic text-brand-text">Mayo De 2026</h2>
                <button className="p-2 hover:bg-brand-light/10 rounded-full transition-colors"><ChevronRight size={20}/></button>
             </div>

             <div className="grid grid-cols-7 gap-2 text-center mb-6">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
                  <span key={d} className="text-[10px] uppercase tracking-widest text-brand-muted font-bold py-2">{d}</span>
                ))}
                {/* Simplified Calendar Grid for Demo */}
                {Array.from({length: 31}, (_, i) => i + 1).map(day => {
                  const isAvailable = day > 14;
                  const isToday = day === 15;
                  return (
                    <button 
                      key={day}
                      disabled={!isAvailable}
                      onClick={() => setSelectedDate(new Date(2026, 4, day))}
                      className={`
                        aspect-square flex items-center justify-center rounded-2xl text-sm font-medium transition-all relative
                        ${!isAvailable ? 'text-brand-muted/20 cursor-not-allowed' : 'text-brand-text hover:bg-brand-muted/10'}
                        ${selectedDate?.getDate() === day ? 'bg-brand-dark text-white shadow-lg' : ''}
                        ${isToday ? 'border border-brand-dark/20' : ''}
                      `}
                    >
                      {day}
                      {isAvailable && (
                        <span className={`absolute bottom-2 w-1 h-1 rounded-full ${day % 5 === 0 ? 'bg-red-400' : day % 3 === 0 ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
                      )}
                    </button>
                  )
                })}
             </div>
             
             {/* Time Slots Mockup */}
             <div className="mt-12 pt-8 border-t border-brand-dark/5">
                <p className="text-[10px] uppercase tracking-widest text-brand-muted mb-6 font-bold">Horarios disponibles</p>
                <div className="flex flex-wrap gap-3">
                   {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                     <button key={t} className="px-6 py-2.5 rounded-full border border-brand-dark/10 text-xs font-medium hover:bg-brand-dark hover:text-white transition-all">
                       {t}
                     </button>
                   ))}
                </div>
             </div>
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

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Users, DollarSign, Clock, CheckCircle, XCircle, Trash2, Edit2 } from "lucide-react";

type Appointment = {
  id: string;
  client: string;
  date: string;
  time: string;
  services: string[];
  total: number;
  paid: number;
  status: 'PENDING' | 'COMPLETED' | 'NO_SHOW';
};

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: "1", client: "Lucía Pérez", date: "2026-05-15", time: "10:00", services: ["Piernas completas + Axilas"], total: 24000, paid: 12000, status: 'PENDING' },
  { id: "2", client: "Marcos Gómez", date: "2026-05-15", time: "11:00", services: ["Pecho + Abdomen"], total: 24000, paid: 24000, status: 'COMPLETED' },
  { id: "3", client: "Elena R.", date: "2026-05-16", time: "15:00", services: ["Limpieza facial profunda"], total: 15000, paid: 0, status: 'PENDING' },
];

import { Calendar } from "@/components/Calendar";

export default function AdminDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('zafiro_appointments');
    return saved ? JSON.parse(saved) : MOCK_APPOINTMENTS;
  });
  const [blockedDays, setBlockedDays] = useState<string[]>(() => {
    const saved = localStorage.getItem('zafiro_blocked_days');
    return saved ? JSON.parse(saved) : ['2026-05-17', '2026-05-25'];
  });

  useEffect(() => {
    if (!isPending && (!session || (session.user as any).role !== 'ADMIN')) {
      navigate("/login");
      toast.error("Acceso denegado. Se requiere cuenta de Admin.");
    }
  }, [session, isPending, navigate]);

  const toggleBlock = (date: string) => {
    let newBlocked;
    if (blockedDays.includes(date)) {
      newBlocked = blockedDays.filter(d => d !== date);
      toast.success("Día habilitado");
    } else {
      newBlocked = [...blockedDays, date];
      toast.warning("Día bloqueado");
    }
    setBlockedDays(newBlocked);
    localStorage.setItem('zafiro_blocked_days', JSON.stringify(newBlocked));
  };

  if (isPending) return <div className="min-h-screen bg-[#fdf6f5] flex items-center justify-center">Cargando...</div>;

  const totalRevenue = appointments.reduce((acc, curr) => acc + curr.paid, 0);
  const pendingRevenue = appointments.reduce((acc, curr) => acc + (curr.total - curr.paid), 0);

  return (
    <div className="min-h-screen bg-[#fdf6f5] font-sans text-brand-text flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-white text-brand-dark flex items-center justify-center font-bold italic">ZB</div>
           <span className="font-serif italic text-lg">Admin</span>
        </div>
        
        <nav className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-white/60">
           <Link to="/admin" className="text-white flex items-center gap-3"><CalendarIcon size={16}/> Turnos</Link>
           <a href="#horarios" className="hover:text-white flex items-center gap-3 transition-colors"><Clock size={16}/> Horarios</a>
           <a href="#clientes" className="hover:text-white flex items-center gap-3 transition-colors"><Users size={16}/> Clientes</a>
           <Link to="/dashboard" className="hover:text-white flex items-center gap-3 transition-colors mt-10"><Edit2 size={16}/> Ver como Cliente</Link>
        </nav>

        <button 
          onClick={async () => {
            await authClient.signOut();
            navigate("/");
          }}
          className="mt-auto text-xs font-bold uppercase tracking-widest text-red-300 hover:text-red-100 transition-colors flex items-center gap-2"
        >
          <XCircle size={16}/> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="mb-12 flex justify-between items-end">
           <div>
              <div className="flex items-center gap-4 mb-2">
                <button 
                  onClick={() => navigate("/")}
                  className="w-10 h-10 rounded-full bg-white border border-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-all shadow-sm"
                  title="Volver al Inicio"
                >
                  <XCircle size={20}/>
                </button>
                <h1 className="font-serif text-4xl italic text-brand-text">Panel de Control</h1>
              </div>
              <p className="text-brand-muted text-sm tracking-wide ml-14">Gestioná tus turnos y disponibilidad diaria.</p>
           </div>
           
           <div className="flex gap-4">
              <div className="bg-white p-4 px-6 rounded-3xl shadow-sm border border-brand-dark/5 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><DollarSign size={18}/></div>
                 <div>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Cobrado</p>
                    <p className="text-xl font-bold text-brand-text">$ {totalRevenue.toLocaleString()}</p>
                 </div>
              </div>
              <div className="bg-white p-4 px-6 rounded-3xl shadow-sm border border-brand-dark/5 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center"><DollarSign size={18}/></div>
                 <div>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Pendiente</p>
                    <p className="text-xl font-bold text-brand-text">$ {pendingRevenue.toLocaleString()}</p>
                 </div>
              </div>
           </div>
        </header>

        {/* Turnos Table */}
        <section id="clientes" className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-brand-dark/5 border border-brand-dark/5">
           <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-2xl italic text-brand-text">Próximos Turnos</h2>
              <div className="flex gap-2">
                 <button className="bg-brand-dark text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all">Exportar</button>
              </div>
           </div>

           <table className="w-full text-left">
              <thead>
                 <tr className="border-b border-brand-dark/5 text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                    <th className="py-4 px-2">Cliente</th>
                    <th className="py-4 px-2">Fecha/Hora</th>
                    <th className="py-4 px-2">Servicios</th>
                    <th className="py-4 px-2">Total</th>
                    <th className="py-4 px-2">Pagado</th>
                    <th className="py-4 px-2">Estado</th>
                    <th className="py-4 px-2">Acciones</th>
                 </tr>
              </thead>
              <tbody className="text-xs">
                 {appointments.map(apt => (
                    <tr key={apt.id} className="border-b border-brand-dark/5 hover:bg-[#fdf6f5]/50 transition-colors group">
                       <td className="py-6 px-2 font-bold text-brand-text">{apt.client}</td>
                       <td className="py-6 px-2 text-brand-muted">{apt.date} • {apt.time}</td>
                       <td className="py-6 px-2 max-w-[200px] truncate text-brand-muted">{apt.services.join(", ")}</td>
                       <td className="py-6 px-2 font-bold text-brand-text">$ {apt.total.toLocaleString()}</td>
                       <td className="py-6 px-2 text-green-600 font-medium">$ {apt.paid.toLocaleString()}</td>
                       <td className="py-6 px-2">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                             apt.status === 'COMPLETED' ? 'bg-green-100 text-green-600' :
                             apt.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' :
                             'bg-red-100 text-red-600'
                          }`}>
                             {apt.status}
                          </span>
                       </td>
                       <td className="py-6 px-2">
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                               onClick={() => {
                                 const newStatus: "PENDING" | "COMPLETED" | "NO_SHOW" = apt.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
                                 const newAppointments = appointments.map(a => a.id === apt.id ? {...a, status: newStatus} : a);
                                 setAppointments(newAppointments);
                                 localStorage.setItem('zafiro_appointments', JSON.stringify(newAppointments));
                                 toast.success("Estado actualizado");
                               }}
                               className="p-2 hover:bg-brand-muted/10 rounded-full text-brand-muted"
                               title="Cambiar Estado"
                             >
                               <CheckCircle size={14}/>
                             </button>
                             <button 
                               onClick={() => {
                                 const newAppointments = appointments.filter(a => a.id !== apt.id);
                                 setAppointments(newAppointments);
                                 localStorage.setItem('zafiro_appointments', JSON.stringify(newAppointments));
                                 toast.success("Turno eliminado");
                               }}
                               className="p-2 hover:bg-red-50 rounded-full text-red-400"
                               title="Eliminar"
                             >
                               <Trash2 size={14}/>
                             </button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </section>

        {/* Unified Schedule Management */}
        <section id="horarios" className="mt-12">
           <div className="mb-8">
              <h2 className="font-serif text-3xl italic text-brand-text">Gestión de Horarios y Días</h2>
              <p className="text-brand-muted text-sm mt-2">Hacé clic en un día para bloquearlo o ajustar su horario de atención.</p>
           </div>
           
           <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                 <Calendar 
                    isAdmin={true} 
                    blockedDays={blockedDays} 
                    onToggleBlock={toggleBlock} 
                 />
              </div>
              
              <div className="space-y-6">
                 <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-brand-dark/5 border border-brand-dark/5">
                    <h3 className="font-serif text-xl italic mb-4">Días Bloqueados</h3>
                    <div className="space-y-2">
                       {blockedDays.length === 0 ? (
                         <p className="text-xs text-brand-muted italic">No hay días bloqueados.</p>
                       ) : (
                         blockedDays.map(date => (
                           <div key={date} className="flex items-center justify-between p-3 bg-rose-50 rounded-2xl border border-rose-100">
                              <span className="text-xs font-bold text-rose-700">{date}</span>
                              <button 
                                onClick={() => toggleBlock(date)}
                                className="text-[10px] font-bold uppercase text-rose-400 hover:text-rose-600 transition-colors"
                              >
                                Habilitar
                              </button>
                           </div>
                         ))
                       )}
                    </div>
                 </div>

                 <div className="bg-brand-dark text-white rounded-[2.5rem] p-8 shadow-xl shadow-brand-dark/10">
                    <h3 className="font-serif text-xl italic mb-4">Aviso Rápido</h3>
                    <p className="text-xs text-white/70 leading-relaxed mb-6">
                       Cualquier cambio realizado en este calendario se aplicará inmediatamente a lo que ven los clientes.
                    </p>
                    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl border border-white/5">
                       <Clock size={16} className="text-brand-muted" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Atención: 09:00 - 22:00</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}

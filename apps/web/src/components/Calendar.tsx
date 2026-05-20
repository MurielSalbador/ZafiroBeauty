import React, { useState, useMemo } from 'react';
import { cn } from '../lib/utils';
import { ChevronLeft, ChevronRight, Lock, Unlock, Clock, AlertCircle } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addDays, isPast, isToday, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';

type DayStatus = 'available' | 'low' | 'full' | 'blocked';
type Slot = { time: string; booked: boolean };

interface CalendarProps {
  isAdmin?: boolean;
  onDateSelect?: (date: Date) => void;
  onSlotSelect?: (slot: string) => void;
  blockedDays?: string[]; // ISO strings
  onToggleBlock?: (date: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ 
  isAdmin = false, 
  onDateSelect, 
  onSlotSelect,
  blockedDays = [],
  onToggleBlock
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Generate 30-min slots from 09:00 to 22:00
  const allSlots = useMemo(() => {
    const slots = [];
    for (let hour = 9; hour < 22; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    slots.push("22:00");
    return slots;
  }, []);

  // Mock booked slots for demo, synced with localStorage
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('zafiro_booked_slots');
    return saved ? JSON.parse(saved) : {
      '2026-05-20': ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'], // Almost full
    };
  });

  const handleUpdateBookedSlots = (newBookedSlots: Record<string, string[]>) => {
    setBookedSlots(newBookedSlots);
    localStorage.setItem('zafiro_booked_slots', JSON.stringify(newBookedSlots));
  };

  const getDayStatus = (date: Date): DayStatus => {
    const dateKey = format(date, 'yyyy-MM-dd');
    if (blockedDays.includes(dateKey)) return 'blocked';
    
    const bookedForDay = bookedSlots[dateKey] || [];
    const totalSlots = allSlots.length;
    const availableCount = totalSlots - bookedForDay.length;

    if (availableCount === 0) return 'full';
    if (availableCount < 5) return 'low';
    return 'available';
  };

  const getStatusClasses = (status: DayStatus, isSelected: boolean) => {
    const base = "h-12 w-full rounded-2xl border transition-all flex flex-col items-center justify-center gap-1 relative overflow-hidden";
    
    if (isSelected) return cn(base, "bg-brand-dark text-white border-brand-dark shadow-lg ring-2 ring-brand-dark/20");

    switch (status) {
      case 'blocked': return cn(base, "bg-rose-50 text-rose-400 border-rose-100 opacity-60 cursor-not-allowed");
      case 'full': return cn(base, "bg-rose-100 text-rose-600 border-rose-200");
      case 'low': return cn(base, "bg-amber-100 text-amber-700 border-amber-200 animate-pulse-subtle");
      case 'available': return cn(base, "bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-100");
      default: return cn(base, "bg-white text-brand-text border-brand-dark/5 hover:border-brand-dark/20");
    }
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfMonth(monthStart);
  const endDate = endOfMonth(monthEnd);
  
  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const handleDateClick = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const status = getDayStatus(date);

    if (isAdmin) {
      setSelectedDate(date);
      return;
    }

    if (status === 'blocked' || status === 'full' || isPast(date) && !isToday(date)) return;
    
    setSelectedDate(date);
    setSelectedSlot(null);
    onDateSelect?.(date);
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-brand-dark/5 border border-brand-dark/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-2xl italic text-brand-text capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </h2>
          {isAdmin && <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold mt-1">Modo Edición</p>}
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <>
              <button 
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-3 rounded-full hover:bg-brand-muted/10 text-brand-text transition-colors border border-brand-dark/5"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-3 rounded-full hover:bg-brand-muted/10 text-brand-text transition-colors border border-brand-dark/5"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-4 text-center">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
          <div key={d} className="text-[10px] font-bold uppercase tracking-widest text-brand-muted py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, i) => {
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
          const status = getDayStatus(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const dateKey = format(day, 'yyyy-MM-dd');
          const isPastDay = isPast(day) && !isToday(day);

          return (
            <button
              key={i}
              disabled={!isAdmin && (status === 'blocked' || isPastDay)}
              onClick={() => handleDateClick(day)}
              className={cn(
                getStatusClasses(status, isSelected),
                !isCurrentMonth && "opacity-20",
                isPastDay && !isAdmin && "opacity-20 grayscale pointer-events-none"
              )}
            >
              <span className="text-sm font-bold">{format(day, 'd')}</span>
              
              {/* Mini Indicators */}
              <div className="flex gap-0.5">
                {status === 'blocked' ? (
                  <Lock size={8} className="text-rose-400" />
                ) : status === 'full' ? (
                  <div className="w-1 h-1 rounded-full bg-rose-500" />
                ) : status === 'low' ? (
                  <div className="w-1 h-1 rounded-full bg-amber-500" />
                ) : (
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Admin Toggle Section */}
      {isAdmin && selectedDate && (
        <div className="mt-8 p-6 bg-brand-muted/5 rounded-3xl border border-brand-dark/10 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-serif text-lg italic">Configuración para {format(selectedDate, "d 'de' MMMM", { locale: es })}</h3>
            </div>
            <button
              onClick={() => onToggleBlock?.(format(selectedDate, 'yyyy-MM-dd'))}
              className={cn(
                "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-md",
                blockedDays.includes(format(selectedDate, 'yyyy-MM-dd'))
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-rose-500 text-white hover:bg-rose-600"
              )}
            >
              {blockedDays.includes(format(selectedDate, 'yyyy-MM-dd')) ? <Unlock size={14}/> : <Lock size={14}/>}
              {blockedDays.includes(format(selectedDate, 'yyyy-MM-dd')) ? "Habilitar Día" : "Bloquear Día"}
            </button>
          </div>

          {!blockedDays.includes(format(selectedDate, 'yyyy-MM-dd')) && (
            <div className="space-y-4">
              <p className="text-xs text-brand-muted">Seleccioná los horarios que querés habilitar o bloquear (los tachados están bloqueados/ocupados):</p>
              <div className="grid grid-cols-4 gap-3">
                {allSlots.map((time, i) => {
                  const dateKey = format(selectedDate, 'yyyy-MM-dd');
                  const isBooked = (bookedSlots[dateKey] || []).includes(time);
                  
                  return (
                    <button
                      key={i}
                      onClick={() => {
                         const currentBooked = bookedSlots[dateKey] || [];
                         const newBookedSlots = { ...bookedSlots };
                         if (isBooked) {
                            newBookedSlots[dateKey] = currentBooked.filter(t => t !== time);
                         } else {
                            newBookedSlots[dateKey] = [...currentBooked, time];
                         }
                         handleUpdateBookedSlots(newBookedSlots);
                      }}
                      className={cn(
                        "py-3 rounded-2xl text-[11px] font-bold transition-all border",
                        isBooked 
                          ? "bg-rose-50 text-rose-400 border-rose-100 line-through opacity-70" 
                          : "bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-100"
                      )}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Client Slots Section */}
      {!isAdmin && selectedDate && (
        <div className="mt-8 pt-8 border-t border-brand-dark/5 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3 mb-6">
            <Clock size={18} className="text-brand-dark" />
            <h3 className="font-serif text-xl italic text-brand-text">Horarios para {format(selectedDate, "d 'de' MMMM", { locale: es })}</h3>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {allSlots.map((time, i) => {
              const dateKey = format(selectedDate, 'yyyy-MM-dd');
              const isBooked = (bookedSlots[dateKey] || []).includes(time);
              
              return (
                <button
                  key={i}
                  disabled={isBooked}
                  onClick={() => {
                    setSelectedSlot(time);
                    onSlotSelect?.(time);
                  }}
                  className={cn(
                    "py-3 rounded-2xl text-[11px] font-bold transition-all border",
                    isBooked 
                      ? "bg-rose-50 text-rose-300 border-rose-100 line-through cursor-not-allowed" 
                      : selectedSlot === time 
                        ? "bg-brand-dark text-white border-brand-dark shadow-lg scale-105" 
                        : "bg-[#fdf6f5] text-brand-text border-brand-dark/5 hover:border-brand-dark/20 hover:bg-white"
                  )}
                >
                  {time}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center gap-3 p-4 bg-brand-muted/5 rounded-2xl border border-brand-dark/5">
             <AlertCircle size={14} className="text-brand-muted" />
             <p className="text-[10px] text-brand-muted leading-relaxed">
               Los turnos son de 30 minutos. La seña se abona al finalizar la reserva.
             </p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-10 flex gap-4 justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Pocos lugares</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Completo</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock size={10} className="text-rose-300" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Bloqueado</span>
        </div>
      </div>
    </div>
  );
};

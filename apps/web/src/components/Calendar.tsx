import React, { useState } from 'react';
import { cn } from '../lib/utils'; // Assuming shadcn utils exist
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Example availability logic
type DayStatus = 'green' | 'yellow' | 'red';
type Slot = { time: string; available: boolean };

const mockDays: Record<string, DayStatus> = {
  '2026-05-15': 'green',
  '2026-05-16': 'yellow',
  '2026-05-17': 'red',
};

const mockSlots: Record<string, Slot[]> = {
  '2026-05-15': [
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '14:00', available: true },
  ],
  '2026-05-16': [
    { time: '16:00', available: true },
    { time: '17:00', available: false },
  ],
};

export const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const getStatusColor = (status?: DayStatus) => {
    switch (status) {
      case 'green': return 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200';
      case 'yellow': return 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200';
      case 'red': return 'bg-rose-100 text-rose-700 border-rose-200 opacity-50 cursor-not-allowed';
      default: return 'bg-gray-50 text-gray-500 hover:bg-gray-100';
    }
  };

  const handleDateClick = (date: string, status?: DayStatus) => {
    if (status === 'red') return;
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  // Render dummy dates for demo
  const days = Array.from({ length: 30 }).map((_, i) => {
    const day = i + 1;
    const dateStr = `2026-05-${day.toString().padStart(2, '0')}`;
    return { day, dateStr, status: mockDays[dateStr] };
  });

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Mayo 2026</h2>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft className="w-4 h-4" /></button>
          <button className="p-2 rounded-full hover:bg-gray-100"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-4 text-center text-sm font-medium text-gray-500">
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((d, i) => (
          <button
            key={i}
            onClick={() => handleDateClick(d.dateStr, d.status)}
            className={cn(
              "h-10 w-full rounded-lg border transition-all text-sm font-medium",
              getStatusColor(d.status),
              selectedDate === d.dateStr && "ring-2 ring-blue-500 ring-offset-2"
            )}
          >
            {d.day}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Horarios disponibles para {selectedDate}</h3>
          <div className="grid grid-cols-3 gap-2">
            {(mockSlots[selectedDate] || []).map((slot, i) => (
              <button
                key={i}
                disabled={!slot.available}
                onClick={() => setSelectedSlot(slot.time)}
                className={cn(
                  "py-2 rounded-md text-sm transition-all",
                  slot.available 
                    ? selectedSlot === slot.time 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : "bg-gray-50 text-gray-400 line-through cursor-not-allowed"
                )}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { cn } from '../lib/utils'; // Assuming shadcn utils exist

type Service = {
  id: string;
  name: string;
  price: number;
  category: 'COMBO' | 'ZONE';
};

const mockServices: Service[] = [
  { id: '1', name: 'Combo Piernas + Cavado', price: 15000, category: 'COMBO' },
  { id: '2', name: 'Combo Cuerpo Entero', price: 25000, category: 'COMBO' },
  { id: '3', name: 'Axilas', price: 5000, category: 'ZONE' },
  { id: '4', name: 'Rostro', price: 4500, category: 'ZONE' },
  { id: '5', name: 'Brazos', price: 7000, category: 'ZONE' },
];

export const ServiceSelectionForm: React.FC = () => {
  const [selectedCombo, setSelectedCombo] = useState<string | null>(null);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);

  const handleToggleCombo = (id: string) => {
    if (selectedCombo === id) {
      setSelectedCombo(null); // Deselect
    } else {
      setSelectedCombo(id);
      setSelectedZones([]); // Lock out zones when a combo is selected
    }
  };

  const handleToggleZone = (id: string) => {
    setSelectedCombo(null); // Lock out combo when zones are selected
    if (selectedZones.includes(id)) {
      setSelectedZones(selectedZones.filter(z => z !== id));
    } else {
      setSelectedZones([...selectedZones, id]);
    }
  };

  const isZoneDisabled = selectedCombo !== null;
  const isComboDisabled = selectedZones.length > 0;

  const total = mockServices
    .filter(s => (selectedCombo === s.id) || selectedZones.includes(s.id))
    .reduce((acc, curr) => acc + curr.price, 0);

  const deposit = total * 0.5;
  const balance = total - deposit;

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Selecciona tus Servicios</h2>
      
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Combos</h3>
        <div className="space-y-2">
          {mockServices.filter(s => s.category === 'COMBO').map(s => (
            <div 
              key={s.id} 
              onClick={() => !isComboDisabled && handleToggleCombo(s.id)}
              className={cn(
                "p-4 rounded-lg border-2 cursor-pointer transition-all flex justify-between items-center",
                selectedCombo === s.id ? "border-indigo-600 bg-indigo-50" : "border-gray-100 hover:border-indigo-200",
                isComboDisabled && "opacity-50 cursor-not-allowed grayscale"
              )}
            >
              <span className="font-medium text-gray-800">{s.name}</span>
              <span className="font-bold text-indigo-600">${s.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Zonas Separadas</h3>
        <div className="space-y-2">
          {mockServices.filter(s => s.category === 'ZONE').map(s => (
            <div 
              key={s.id} 
              onClick={() => !isZoneDisabled && handleToggleZone(s.id)}
              className={cn(
                "p-4 rounded-lg border-2 cursor-pointer transition-all flex justify-between items-center",
                selectedZones.includes(s.id) ? "border-pink-500 bg-pink-50" : "border-gray-100 hover:border-pink-200",
                isZoneDisabled && "opacity-50 cursor-not-allowed grayscale"
              )}
            >
              <span className="font-medium text-gray-800">{s.name}</span>
              <span className="font-bold text-pink-500">${s.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mt-8">
        <div className="flex justify-between text-sm mb-2 text-gray-600">
          <span>Total del Servicio</span>
          <span className="font-medium">${total}</span>
        </div>
        <div className="flex justify-between text-sm mb-2 text-gray-600">
          <span>A pagar ahora (Seña 50%)</span>
          <span className="font-medium text-indigo-600">${deposit}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200 text-gray-800">
          <span>Saldo a abonar en el local</span>
          <span>${balance}</span>
        </div>
      </div>

      <button 
        disabled={total === 0}
        className="w-full mt-6 bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirmar y Pagar Seña
      </button>
    </div>
  );
};

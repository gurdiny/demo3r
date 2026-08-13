import React from 'react';
import { Stethoscope, Layers, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onSelectView: (viewId: string) => void;
  onOpenDisclaimer?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onSelectView, onOpenDisclaimer }) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
            3R
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm tracking-tight text-white">3R CONNECT</h1>
              <span className="bg-teal-500/20 text-teal-300 font-bold text-[10px] px-2 py-0.5 rounded-full border border-teal-500/30">
                ECOSISTEMA INMOBILIARIO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Capa de Inteligencia Artificial & Prototipo Interactivo</p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          {onOpenDisclaimer && (
            <button
              onClick={onOpenDisclaimer}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition flex items-center gap-1.5 cursor-pointer"
              title="Ver nota de prototipo y presupuestos"
            >
              <AlertTriangle size={14} className="text-amber-400" />
              <span className="hidden sm:inline">Aviso de Prototipo</span>
            </button>
          )}

          <button
            onClick={() => onSelectView('doctor')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              currentView !== 'architecture'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Stethoscope size={14} /> Capa de Inteligencia (6 Herramientas)
          </button>

          <button
            onClick={() => onSelectView('architecture')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              currentView === 'architecture'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Layers size={14} /> Visión Estratégica & Arquitectura
          </button>
        </div>

      </div>
    </header>
  );
};

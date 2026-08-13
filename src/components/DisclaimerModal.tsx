import React from 'react';
import { AlertTriangle, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border-t-4 border-t-amber-500">
        
        {/* Header Icon & Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <AlertTriangle size={26} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
              Aviso Importante · Prototipo Comercial
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
              Demostración Conceptual de Ideas
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          <div className="flex items-start gap-2.5">
            <ShieldAlert size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Sin Lógica de Negocio Operativa:</strong> Las vistas y herramientas presentadas en este portal son <strong className="text-white">ideas y maquetas conceptuales</strong> de experiencia de usuario. <span className="text-amber-300">No incluyen la lógica de negocio backend ni integraciones definitivas.</span>
            </p>
          </div>

          <div className="border-t border-slate-800 my-2 pt-2.5 flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" />
            <p>
              <strong>Presupuesto y Alcance a la Medida:</strong> Cada una de estas ideas se presenta como propuesta independiente. <span className="text-teal-300">Todas se pueden platicar, ajustar y presupuestar en función de los requerimientos y alcances reales</span> que la empresa decida implementar.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 text-sm shadow-lg shadow-teal-500/20 active:scale-[0.99]"
        >
          <Sparkles size={18} /> Entendido, Explorar Prototipo
        </button>

      </div>
    </div>
  );
};

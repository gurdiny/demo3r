import React from 'react';
import { ShieldAlert, Lock, EyeOff } from 'lucide-react';
import { useContentProtection } from '../hooks/useContentProtection';

/**
 * Activa la protección de contenido global y pinta:
 *  - el velo opaco que oculta la información cuando la ventana pierde el foco
 *    o se detecta un intento de captura de pantalla;
 *  - el aviso emergente cuando se bloquea una acción (copiar, pegar, etc.).
 *
 * Debe montarse una única vez, en la raíz de la aplicación.
 */
export const ContentProtection: React.FC = () => {
  const { shielded, notice } = useContentProtection({
    // Cambiar a `true` si se desea permitir pegar dentro de los formularios.
    allowPasteInInputs: false,
    shieldOnBlur: true,
  });

  return (
    <>
      {/* Velo anti-captura */}
      {shielded && (
        <div
          className="print:hidden fixed inset-0 z-9999 bg-slate-950 flex flex-col items-center justify-center gap-4 text-center px-6 select-none"
          aria-hidden="true"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-teal-500/30 flex items-center justify-center">
            <EyeOff className="text-teal-400" size={28} />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg tracking-tight">Contenido protegido</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-sm">
              La información se oculta mientras la ventana no está activa. Vuelve a la pestaña
              de <strong className="text-teal-400">3R CONNECT</strong> para continuar.
            </p>
          </div>
        </div>
      )}

      {/* Aviso de acción bloqueada */}
      {notice && (
        <div
          key={notice.id}
          role="status"
          className="print:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-10000 bg-slate-900 text-white border border-teal-500/30 shadow-2xl rounded-xl px-4 py-3 flex items-center gap-3 max-w-md select-none"
        >
          {notice.reason === 'screenshot' ? (
            <ShieldAlert className="text-amber-400 shrink-0" size={18} />
          ) : (
            <Lock className="text-teal-400 shrink-0" size={18} />
          )}
          <span className="text-xs leading-relaxed">{notice.message}</span>
        </div>
      )}
    </>
  );
};

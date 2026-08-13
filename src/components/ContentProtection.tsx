import React from 'react';
import { ShieldAlert, Lock } from 'lucide-react';
import { useContentProtection } from '../hooks/useContentProtection';

/**
 * Activa la protección de contenido global (copiar / cortar / pegar,
 * selección, menú contextual, impresión) y muestra un aviso discreto cuando
 * se bloquea una acción. No oculta nunca la interfaz.
 *
 * Debe montarse una única vez, en la raíz de la aplicación.
 */
export const ContentProtection: React.FC = () => {
  const notice = useContentProtection({
    // Cambiar a `true` si se desea permitir pegar dentro de los formularios.
    allowPasteInInputs: false,
  });

  if (!notice) return null;

  return (
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
  );
};

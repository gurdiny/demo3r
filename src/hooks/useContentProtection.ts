import { useEffect, useRef, useState } from 'react';
import {
  installContentProtection,
  VIOLATION_MESSAGES,
  type ContentProtectionOptions,
  type ProtectionReason,
} from '../security/contentProtection';

export interface ProtectionState {
  /** Velo activo: el contenido se oculta (pérdida de foco o intento de captura). */
  shielded: boolean;
  /** Último aviso a mostrar al usuario, o null. */
  notice: { reason: ProtectionReason; message: string; id: number } | null;
}

type Options = Omit<ContentProtectionOptions, 'onViolation' | 'onShieldChange'> & {
  /** Milisegundos que permanece visible el aviso. Por defecto 2600. */
  noticeDurationMs?: number;
};

/**
 * Activa la protección de contenido durante el ciclo de vida del componente
 * y expone el estado necesario para pintar el velo y los avisos.
 */
export function useContentProtection(options: Options = {}): ProtectionState {
  const { noticeDurationMs = 2600, ...protectionOptions } = options;
  const [shielded, setShielded] = useState(false);
  const [notice, setNotice] = useState<ProtectionState['notice']>(null);
  const noticeTimer = useRef<number | undefined>(undefined);
  const noticeId = useRef(0);

  // Se lee por referencia para no reinstalar los listeners en cada render.
  const optionsRef = useRef(protectionOptions);
  optionsRef.current = protectionOptions;

  useEffect(() => {
    const uninstall = installContentProtection({
      ...optionsRef.current,
      onShieldChange: setShielded,
      onViolation: (reason) => {
        noticeId.current += 1;
        setNotice({ reason, message: VIOLATION_MESSAGES[reason], id: noticeId.current });
        window.clearTimeout(noticeTimer.current);
        noticeTimer.current = window.setTimeout(() => setNotice(null), noticeDurationMs);
      },
    });

    return () => {
      uninstall();
      window.clearTimeout(noticeTimer.current);
    };
  }, [noticeDurationMs]);

  return { shielded, notice };
}

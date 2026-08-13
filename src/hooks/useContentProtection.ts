import { useEffect, useRef, useState } from 'react';
import {
  installContentProtection,
  VIOLATION_MESSAGES,
  type ContentProtectionOptions,
  type ProtectionReason,
} from '../security/contentProtection';

export interface ProtectionNotice {
  reason: ProtectionReason;
  message: string;
  id: number;
}

type Options = Omit<ContentProtectionOptions, 'onViolation'> & {
  /** Milisegundos que permanece visible el aviso. Por defecto 2600. */
  noticeDurationMs?: number;
};

/**
 * Activa la protección de contenido durante el ciclo de vida del componente
 * y expone el último aviso a mostrar (o null si no hay ninguno).
 */
export function useContentProtection(options: Options = {}): ProtectionNotice | null {
  const { noticeDurationMs = 2600, ...protectionOptions } = options;
  const [notice, setNotice] = useState<ProtectionNotice | null>(null);
  const noticeTimer = useRef<number | undefined>(undefined);
  const noticeId = useRef(0);

  // Se lee por referencia para no reinstalar los listeners en cada render.
  const optionsRef = useRef(protectionOptions);
  optionsRef.current = protectionOptions;

  useEffect(() => {
    const uninstall = installContentProtection({
      ...optionsRef.current,
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

  return notice;
}

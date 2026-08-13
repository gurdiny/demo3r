/**
 * Capa de protección de contenido de 3R CONNECT.
 *
 * Bloquea copiar / cortar / pegar, selección de texto, menú contextual,
 * arrastre de contenido, impresión no autorizada y atajos de herramientas
 * de desarrollo. Además aplica mitigaciones de "mejor esfuerzo" contra
 * capturas de pantalla (ver README de seguridad en el propio código).
 *
 * IMPORTANTE: ningún navegador expone una API para impedir capturas de
 * pantalla del sistema operativo. Lo que aquí se hace es:
 *   1. Interceptar la tecla Impr Pant / Cmd+Shift+3/4/5 y vaciar el
 *      portapapeles con un aviso.
 *   2. Ocultar el contenido (velo opaco) cuando la ventana pierde el foco,
 *      que es lo que ocurre con recortes tipo Win+Shift+S o el selector
 *      de captura de macOS.
 *   3. Bloquear la impresión / "Guardar como PDF" salvo en los reportes
 *      autorizados.
 */

export type ProtectionReason =
  | 'copy'
  | 'cut'
  | 'paste'
  | 'context-menu'
  | 'drag'
  | 'devtools'
  | 'print'
  | 'screenshot';

export interface ContentProtectionOptions {
  /** Permitir pegar dentro de campos de formulario. Por defecto: false. */
  allowPasteInInputs?: boolean;
  /** Ocultar el contenido cuando la ventana pierde el foco. Por defecto: true. */
  shieldOnBlur?: boolean;
  /** Se invoca cada vez que se bloquea una acción. */
  onViolation?: (reason: ProtectionReason) => void;
  /** Se invoca para mostrar u ocultar el velo de protección. */
  onShieldChange?: (shielded: boolean) => void;
}

export const VIOLATION_MESSAGES: Record<ProtectionReason, string> = {
  copy: 'Copiar contenido está deshabilitado en esta plataforma.',
  cut: 'Cortar contenido está deshabilitado en esta plataforma.',
  paste: 'Pegar contenido está deshabilitado en esta plataforma.',
  'context-menu': 'El menú contextual está deshabilitado.',
  drag: 'Arrastrar contenido está deshabilitado.',
  devtools: 'El acceso a herramientas de desarrollo está restringido.',
  print: 'La impresión y exportación a PDF están restringidas.',
  screenshot: 'Las capturas de pantalla no están permitidas. Contenido confidencial de 3R CONNECT.',
};

const CLIPBOARD_NOTICE =
  '⚠ Contenido protegido de 3R CONNECT. La copia y captura de este material no está autorizada.';

const isEditable = (node: EventTarget | null): boolean => {
  const el = node as HTMLElement | null;
  if (!el || typeof el.closest !== 'function') return false;
  return !!el.closest('input, textarea, select, [contenteditable="true"]');
};

/** Sustituye el contenido del portapapeles por un aviso legal. */
const poisonClipboard = (event?: ClipboardEvent): void => {
  if (event?.clipboardData) {
    event.clipboardData.setData('text/plain', CLIPBOARD_NOTICE);
    return;
  }
  try {
    void navigator.clipboard?.writeText(CLIPBOARD_NOTICE).catch(() => {});
  } catch {
    // El portapapeles puede estar bloqueado por permisos o por el iframe.
  }
};

/**
 * Instala la protección sobre el documento. Devuelve la función de limpieza.
 */
export function installContentProtection(options: ContentProtectionOptions = {}): () => void {
  const {
    allowPasteInInputs = false,
    shieldOnBlur = true,
    onViolation = () => {},
    onShieldChange = () => {},
  } = options;

  const listeners: Array<() => void> = [];

  const on = <K extends keyof DocumentEventMap>(
    target: Document | Window,
    type: K | string,
    handler: (event: any) => void,
    opts?: AddEventListenerOptions,
  ) => {
    target.addEventListener(type, handler as EventListener, opts ?? { capture: true });
    listeners.push(() =>
      target.removeEventListener(type, handler as EventListener, opts ?? { capture: true }),
    );
  };

  // --- Copiar / cortar / pegar ------------------------------------------
  on(document, 'copy', (e: ClipboardEvent) => {
    e.preventDefault();
    poisonClipboard(e);
    onViolation('copy');
  });

  on(document, 'cut', (e: ClipboardEvent) => {
    e.preventDefault();
    poisonClipboard(e);
    onViolation('cut');
  });

  on(document, 'paste', (e: ClipboardEvent) => {
    if (allowPasteInInputs && isEditable(e.target)) return;
    e.preventDefault();
    onViolation('paste');
  });

  // --- Selección, menú contextual y arrastre -----------------------------
  on(document, 'selectstart', (e: Event) => {
    if (isEditable(e.target)) return; // No romper la edición en formularios.
    e.preventDefault();
  });

  on(document, 'contextmenu', (e: MouseEvent) => {
    e.preventDefault();
    onViolation('context-menu');
  });

  on(document, 'dragstart', (e: DragEvent) => {
    e.preventDefault();
    onViolation('drag');
  });

  // --- Velo de protección ------------------------------------------------
  let shieldTimer: number | undefined;

  const raiseShield = (autoHideMs?: number) => {
    onShieldChange(true);
    window.clearTimeout(shieldTimer);
    if (autoHideMs) {
      shieldTimer = window.setTimeout(() => onShieldChange(false), autoHideMs);
    }
  };

  const lowerShield = () => {
    window.clearTimeout(shieldTimer);
    onShieldChange(false);
  };

  // --- Teclado -----------------------------------------------------------
  const handleScreenshotKey = () => {
    poisonClipboard();
    raiseShield(1200);
    onViolation('screenshot');
  };

  on(document, 'keydown', (e: KeyboardEvent) => {
    const key = e.key?.toLowerCase();
    const mod = e.ctrlKey || e.metaKey;

    // Impr Pant (Windows/Linux) — el evento llega sin `key` útil en algunos
    // navegadores, por eso también se vigila el keyup.
    if (e.key === 'PrintScreen' || key === 'printscreen') {
      e.preventDefault();
      handleScreenshotKey();
      return;
    }

    // Capturas de macOS: Cmd+Shift+3 / 4 / 5.
    if (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) {
      e.preventDefault();
      handleScreenshotKey();
      return;
    }

    // Recorte de Windows: Win+Shift+S.
    if (e.shiftKey && key === 's' && (e as any).getModifierState?.('Meta')) {
      e.preventDefault();
      handleScreenshotKey();
      return;
    }

    // Herramientas de desarrollo y ver código fuente.
    if (
      e.key === 'F12' ||
      (mod && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
      (mod && key === 'u')
    ) {
      e.preventDefault();
      onViolation('devtools');
      return;
    }

    // Impresión / guardar página.
    if (mod && ['p', 's'].includes(key)) {
      if (document.documentElement.classList.contains('allow-print')) return;
      e.preventDefault();
      onViolation('print');
      return;
    }

    // Copiar / cortar / pegar / seleccionar todo por teclado.
    if (mod && ['c', 'x', 'a'].includes(key)) {
      if (isEditable(e.target) && key !== 'c' && key !== 'x') return;
      e.preventDefault();
      onViolation(key === 'a' ? 'copy' : (key as 'copy' | 'cut'));
      return;
    }

    if (mod && key === 'v') {
      if (allowPasteInInputs && isEditable(e.target)) return;
      e.preventDefault();
      onViolation('paste');
    }
  });

  on(document, 'keyup', (e: KeyboardEvent) => {
    if (e.key === 'PrintScreen' || e.key?.toLowerCase() === 'printscreen') {
      handleScreenshotKey();
    }
  });

  // --- Pérdida de foco / cambio de pestaña -------------------------------
  if (shieldOnBlur) {
    on(window, 'blur', () => raiseShield());
    on(window, 'focus', () => lowerShield());
    on(document, 'visibilitychange', () => {
      if (document.hidden) raiseShield();
      else lowerShield();
    });
  }

  // --- Impresión ---------------------------------------------------------
  on(window, 'beforeprint', () => {
    if (document.documentElement.classList.contains('allow-print')) return;
    onViolation('print');
  });

  document.documentElement.classList.add('protected-content');

  return () => {
    listeners.forEach((off) => off());
    listeners.length = 0;
    window.clearTimeout(shieldTimer);
    document.documentElement.classList.remove('protected-content');
    onShieldChange(false);
  };
}

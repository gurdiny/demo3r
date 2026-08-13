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
 *   1. Interceptar la tecla Impr Pant / Cmd+Shift+3/4/5 y sustituir el
 *      contenido del portapapeles por un aviso.
 *   2. Bloquear la impresión / "Guardar como PDF" salvo en los reportes
 *      autorizados.
 *
 * La aplicación NUNCA oculta la interfaz por sí sola: no hay velos ni
 * pantallas en negro, sólo avisos discretos al bloquear una acción.
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
  /** Se invoca cada vez que se bloquea una acción. */
  onViolation?: (reason: ProtectionReason) => void;
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
  const { allowPasteInInputs = false, onViolation = () => {} } = options;

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

  // --- Teclado -----------------------------------------------------------
  const handleScreenshotKey = () => {
    poisonClipboard();
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

  // --- Impresión ---------------------------------------------------------
  on(window, 'beforeprint', () => {
    if (document.documentElement.classList.contains('allow-print')) return;
    onViolation('print');
  });

  document.documentElement.classList.add('protected-content');

  return () => {
    listeners.forEach((off) => off());
    listeners.length = 0;
    document.documentElement.classList.remove('protected-content');
  };
}

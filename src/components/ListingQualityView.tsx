import React, { useState } from 'react';
import { INITIAL_PHOTO_AUDIT } from '../data/mockData';
import { PhotoAudit } from '../types';
import { Camera, Sparkles, CheckCircle2, AlertTriangle, Eye, RefreshCw, FileText, Layout, Copy } from 'lucide-react';

export const ListingQualityView: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoAudit[]>(INITIAL_PHOTO_AUDIT);
  const [activePhoto, setActivePhoto] = useState<PhotoAudit>(INITIAL_PHOTO_AUDIT[1]); // dark room photo
  const [copied, setCopied] = useState<boolean>(false);

  const sigColor = (s: string) => s === 'green' ? '#12A56A' : s === 'amber' ? '#E0972B' : '#E2503E';
  const sigBg = (s: string) => s === 'green' ? '#E6F6EE' : s === 'amber' ? '#FBF1DF' : '#FBE9E6';

  const generatedDescription = `Hermoso departamento de 120 m² en el corazón de Hipódromo Condesa. Cuenta con 3 amplias recámaras con iluminación natural, 2 baños completos y 2 cajones de estacionamiento independientes. Edificio pet-friendly con seguridad 24/7 y elevador. A pasos de Parque México y Parque España. ¡Oportunidad única en la zona!`;

  const handleCopyText = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(generatedDescription);
      }
    } catch {
      // Fallback feedback if clipboard permission is restricted in iframe
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30 shrink-0">
            <Camera size={24} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Motor de Visión por Computadora & Calidad de Publicación</span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">Auditor de Fotos y Ficha Técnica</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Auditoría en tiempo real antes de publicar en portales. Detecta iluminación deficiente, ángulos incorrectos y ausencia de fotos clave (como la cocina).
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Gallery Audit & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Photo Gallery Grid */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Galería de Fotografías Auditadas ({photos.length} Fotos)
            </span>
            <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
              Puntuación Visual: 62/100
            </span>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photos.map(p => {
              const isSelected = p.id === activePhoto.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePhoto(p)}
                  className={`relative rounded-xl overflow-hidden text-left p-3 border transition cursor-pointer flex flex-col justify-between h-28 ${
                    isSelected ? 'ring-2 ring-teal-500 border-teal-500 shadow-md' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  style={{ background: p.g }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: sigColor(p.s) }}></span>
                    <span className="text-[10px] font-mono font-bold text-white/90 bg-black/40 px-1.5 py-0.5 rounded">
                      {p.missing ? 'FALTANTE' : `${p.score}/100`}
                    </span>
                  </div>

                  <div className="text-white">
                    <div className="text-xs font-bold leading-tight drop-shadow">{p.n}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Photo Deep Analysis Box */}
          {activePhoto && (
            <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye size={14} /> Análisis Detallado: {activePhoto.n}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded font-bold" style={{ backgroundColor: sigBg(activePhoto.s), color: sigColor(activePhoto.s) }}>
                  Score: {activePhoto.score}/100
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <p><strong>Diagnóstico IA:</strong> {activePhoto.diagnostico}</p>
                <p className="text-teal-300 font-medium"><strong>Acción Sugerida:</strong> {activePhoto.sugerencia}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Key Recommendations & AI Description Generator */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Priority Improvements Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Acciones Prioritarias de Mejora Visual
            </span>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5">
                <AlertTriangle size={16} className="text-red-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-red-900 font-bold block">CRÍTICO: Tomar fotos de la Cocina</strong>
                  <span className="text-red-700">El 82% de los prospectos abandona el anuncio si no observa fotografías de la cocina integral.</span>
                </div>
              </div>

              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5">
                <AlertTriangle size={16} className="text-red-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-red-900 font-bold block">Volver a fotografiar la Sala Comedor</strong>
                  <span className="text-red-700">Fotografía actual padece subexposición severa (demasiado oscura).</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
                <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-amber-900 font-bold block">Enderezar horizonte en foto del Balcón</strong>
                  <span className="text-amber-700">Inclinación de 4° produce percepción de espacio reducido.</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Generator for Listing Copy */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText size={16} /> Generador de Texto SEO para Portales
              </span>
              <button
                onClick={handleCopyText}
                className="bg-slate-800 hover:bg-slate-700 text-teal-300 px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer border border-slate-700"
              >
                <Copy size={12} /> {copied ? '¡Copiado!' : 'Copiar Texto'}
              </button>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed italic">
              "{generatedDescription}"
            </p>

            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
              <span>Optimizado para Inmuebles24, Lamudi y Vivanuncios</span>
              <span className="text-teal-400 font-bold">100% SEO Friendly</span>
            </div>
          </div>

        </div>
      </div>

      {/* Why it Matters Banner */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
        <Sparkles size={20} className="text-teal-600 shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">Sinergia con Property Doctor</span>
          <p className="text-xs text-slate-700 mt-1 leading-relaxed">
            Este auditor alimenta de forma transparente al motor de Property Doctor: si las fotos mejoran, la puntuación visual sube y el tiempo medio en mercado se reduce exponencialmente.
          </p>
        </div>
      </div>

    </div>
  );
};

import React from 'react';
import { Property } from '../types';
import { Stethoscope, CheckCircle2, AlertTriangle, Printer, X, ShieldCheck, Download, Calendar, MapPin } from 'lucide-react';

interface PdfReportModalProps {
  property: Property;
  onClose: () => void;
}

export const PdfReportModal: React.FC<PdfReportModalProps> = ({ property, onClose }) => {
  const handlePrint = () => {
    try {
      window.print();
    } catch {
      // Ignore print restrictions in sandboxed iframe
    }
  };

  const sigColor = (s: string) => s === 'green' ? '#12A56A' : s === 'amber' ? '#E0972B' : '#E2503E';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col border border-slate-200">
        
        {/* Modal Controls Bar (Hidden when printing) */}
        <div className="print:hidden sticky top-0 z-10 bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Stethoscope className="text-teal-400" size={20} />
            <span className="font-bold text-sm tracking-wide">REPORTE DIAGNÓSTICO PROPERTY DOCTOR</span>
            <span className="bg-teal-500/20 text-teal-300 text-xs px-2.5 py-0.5 rounded-full font-medium">Documento Ejecutivo para Propietario</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-teal-500 hover:bg-teal-600 text-slate-900 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-teal-500/20"
            >
              <Printer size={15} /> Imprimir / Guardar PDF
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div className="p-8 print:p-0 space-y-6 text-slate-800 font-sans" id="printable-report">
          
          {/* Header Branding */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-teal-400 font-black text-xl shadow-md">
                3R
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">3R CONNECT INMOBILIARIA</h1>
                <p className="text-xs text-slate-500 font-medium">Informe Técnico de Diagnóstico de Inmueble & Inteligencia de Mercado</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha de Emisión</div>
              <div className="text-sm font-semibold text-slate-800 flex items-center justify-end gap-1 mt-0.5">
                <Calendar size={14} className="text-slate-400" />
                {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="text-xs text-teal-600 font-semibold mt-1">Ref: PD-{property.id.toUpperCase()}-2026</div>
            </div>
          </div>

          {/* Property Overview Strip */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Propiedad Analizada</span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">{property.nombre}</h2>
              <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-teal-600" /> {property.colonia}, {property.ciudad}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ficha Técnica</span>
              <div className="text-sm font-semibold text-slate-800 mt-0.5">{property.meta}</div>
              <div className="text-xs text-slate-500 mt-1">Antigüedad en mercado: <strong className="text-slate-900">{property.dias} días</strong></div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Propietario & Asesor</span>
              <div className="text-sm font-semibold text-slate-800 mt-0.5">{property.propietario.nombre}</div>
              <div className="text-xs text-slate-500 mt-1">Asesor responsable: {property.propietario.captador}</div>
            </div>
          </div>

          {/* Score & Health Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-slate-800 border-4 border-slate-700 shrink-0">
                <span className="text-3xl font-black font-mono text-white">{property.score}</span>
                <span className="absolute bottom-2 text-[9px] text-slate-400 font-bold uppercase tracking-wider">/ 100</span>
              </div>
              <div>
                <span className="text-xs text-teal-400 font-bold uppercase tracking-wider">Índice de Salud de la Propiedad</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: sigColor(property.vcolor) }}></span>
                  <h3 className="text-2xl font-bold text-white">{property.verdict}</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  El algoritmo Property Doctor ha evaluado 6 variables clave frente a <strong>{property.comps} inmuebles comparables</strong> activos en {property.colonia}.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl text-center md:text-right shrink-0">
              <div className="text-xs text-slate-400 uppercase font-medium">Precio Actual / m²</div>
              <div className="text-xl font-bold font-mono text-teal-300 mt-0.5">${property.ppm2.toLocaleString()} MXN</div>
              <div className="text-xs text-slate-400 mt-1">Mediana de la zona: <span className="font-semibold text-white">${property.median.toLocaleString()} MXN</span></div>
            </div>
          </div>

          {/* Detailed Factor Diagnostics */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="text-teal-600" size={16} />
              Diagnóstico Factor por Factor (Evidencia Concreta)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {property.factores.map((f, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: sigColor(f.s) }}></span>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900 text-xs">{f.k}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 font-bold text-slate-700">{f.score}/100</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{f.t}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Plan / Recipe */}
          <div className="bg-teal-900 text-white rounded-2xl p-6">
            <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} />
              Receta de 3 Pasos Estratégicos Recomendados para Reactivar la Venta
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {property.receta.map((r, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-teal-500/30 rounded-xl p-4">
                  <div className="w-7 h-7 rounded-full bg-teal-400 text-slate-900 font-black text-xs flex items-center justify-center mb-2">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-white text-xs leading-snug">{r.a}</h4>
                  <div className="text-[11px] text-teal-300 font-medium mt-2 flex items-center gap-1">
                    ⚡ {r.imp}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 border-t border-slate-800 pt-2 leading-relaxed">
                    {r.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Signature */}
          <div className="border-t border-slate-200 pt-6 flex items-center justify-between text-xs text-slate-500">
            <div>
              <p className="font-semibold text-slate-800">Ecosistema 3R CONNECT — Todos los derechos reservados</p>
              <p className="text-[11px] mt-0.5">Este informe es confidencial y generado mediante la capa de inteligencia artificial para uso exclusivo del propietario.</p>
            </div>
            <div className="text-right">
              <div className="w-32 border-b border-slate-400 mb-1"></div>
              <p className="font-semibold text-slate-800">Firma Asesor Autorizado</p>
              <p className="text-[11px]">{property.propietario.captador}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

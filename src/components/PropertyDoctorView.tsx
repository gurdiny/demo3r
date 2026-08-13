import React, { useState } from 'react';
import { Property, Signal } from '../types';
import { INITIAL_PROPERTIES } from '../data/mockData';
import { RadarChart } from './RadarChart';
import { PdfReportModal } from './PdfReportModal';
import {
  Stethoscope, Tag, Clock, Camera, FileText, Users, Share2,
  TrendingUp, Sparkles, Printer, Plus, AlertCircle, CheckCircle2,
  Building, RefreshCw, ChevronRight, Layers, DollarSign
} from 'lucide-react';

export const PropertyDoctorView: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [selectedId, setSelectedId] = useState<string>('condesa');
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New property form state
  const [newProp, setNewProp] = useState({
    nombre: "Departamento en Roma Norte",
    colonia: "Roma Norte",
    ciudad: "CDMX",
    precio: 7200000,
    m2: 95,
    dias: 95,
    recamaras: 2,
    propietario: "Lic. Gabriel Ortiz"
  });

  const p = properties.find(x => x.id === selectedId) || properties[0];

  const sigColor = (s: Signal) => s === 'green' ? '#12A56A' : s === 'amber' ? '#E0972B' : '#E2503E';
  const sigBg = (s: Signal) => s === 'green' ? '#E6F6EE' : s === 'amber' ? '#FBF1DF' : '#FBE9E6';

  const barMax = Math.max(p.ppm2, p.median) * 1.15;

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const ppm2 = Math.round(newProp.precio / newProp.m2);
    const median = 68000;
    const isOverpriced = ppm2 > median * 1.1;

    const created: Property = {
      id: `prop-${Date.now()}`,
      nombre: newProp.nombre,
      colonia: newProp.colonia,
      ciudad: newProp.ciudad,
      meta: `${newProp.recamaras} rec · ${newProp.m2} m² · $${newProp.precio.toLocaleString()} MXN`,
      precio: newProp.precio,
      m2: newProp.m2,
      recamaras: newProp.recamaras,
      estacionamientos: 1,
      dias: newProp.dias,
      score: isOverpriced ? 48 : 76,
      verdict: isOverpriced ? "Sobreprecio Crítico" : "Saludable con Oportunidades",
      vcolor: isOverpriced ? "red" : "amber",
      ppm2,
      median,
      comps: 11,
      imagen: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      propietario: {
        nombre: newProp.propietario,
        contacto: "55 9988 7766",
        captador: "Equipo 3R Connect"
      },
      radarScores: {
        precio: isOverpriced ? 35 : 80,
        diasMercado: Math.max(20, 100 - newProp.dias),
        fotos: 65,
        anuncio: 70,
        competencia: 50,
        difusion: 75
      },
      factores: [
        { k: "Precio vs Mercado", s: isOverpriced ? "red" : "green", iconName: "Tag", t: `$${ppm2.toLocaleString()}/m² vs mediana $${median.toLocaleString()}/m² de ${newProp.colonia}.`, score: isOverpriced ? 35 : 80 },
        { k: "Días en Mercado", s: newProp.dias > 60 ? "amber" : "green", iconName: "Clock", t: `${newProp.dias} días activo. El promedio de absorción en la zona es de 45 días.`, score: Math.max(20, 100 - newProp.dias) },
        { k: "Calidad de Fotos (Visión IA)", s: "amber", iconName: "Camera", t: "7 fotos registradas; falta ángulo amplio de cocina e iluminación óptima.", score: 65 },
        { k: "Completitud del Anuncio", s: "amber", iconName: "FileText", t: "Anuncio parcialmente completo; se sugiere detallar cuota de mantenimiento.", score: 70 },
        { k: "Presión de Competencia", s: "amber", iconName: "Users", t: "11 propiedades competidoras activas en un radio de 1km.", score: 50 },
        { k: "Red de Difusión", s: "green", iconName: "Share2", t: "Sindicación activa en red de portales principales.", score: 75 }
      ],
      receta: [
        { a: `Ajustar precio sugerido a $${(Math.round((median * newProp.m2) / 100000) * 100000).toLocaleString()} MXN`, imp: "+40% de visitas potenciales", detail: "Alinear con la mediana de absorción real de la zona." },
        { a: "Fotografía profesional con encuadre de luz natural", imp: "+30% clics en portales", detail: "Mejorar la primera impresión visual en la lista de resultados." },
        { a: "Completar ficha técnica y agregar plano 2D/3D", imp: "+25% en calificación del prospecto", detail: "Reducir preguntas de filtro en primera llamada." }
      ]
    };

    setProperties([created, ...properties]);
    setSelectedId(created.id);
    setShowAddModal(false);
  };

  const getFactorIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tag': return Tag;
      case 'Clock': return Clock;
      case 'Camera': return Camera;
      case 'FileText': return FileText;
      case 'Users': return Users;
      default: return Share2;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30 shrink-0">
              <Stethoscope size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Pieza Central de Inteligencia</span>
                <span className="bg-teal-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full">ESTRELLA</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">Property Doctor</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Diagnóstico técnico de inmuebles estancados. Explica con evidencia visual por qué una propiedad no se vende y genera la receta accionable para el propietario.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <Plus size={16} className="text-teal-400" /> Diagnosticar Nuevo Inmueble
            </button>
            <button
              onClick={() => setShowPdfModal(true)}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-teal-500/20"
            >
              <Printer size={16} /> Generar Reporte PDF
            </button>
          </div>
        </div>
      </div>

      {/* Property Switcher Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Building size={14} className="text-teal-600" /> Casos de Estudio:
        </span>
        {properties.map(item => {
          const isActive = item.id === p.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`px-4 py-2.5 rounded-xl text-left transition shrink-0 border cursor-pointer ${
                isActive
                  ? 'bg-slate-900 border-teal-500 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sigColor(item.vcolor) }}></span>
                <span className="font-bold text-xs">{item.nombre}</span>
              </div>
              <div className={`text-[11px] mt-0.5 ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
                {item.dias} días · Score: <strong>{item.score}/100</strong>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Health Score Ring & Radar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Diagnóstico de Salud</span>
            <div className="mt-4 flex items-center justify-center">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E2E8F0" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={sigColor(p.vcolor)}
                    strokeWidth="10"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - p.score / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-black font-mono text-slate-900">{p.score}</span>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-0.5">SALUD / 100</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: sigBg(p.vcolor), color: sigColor(p.vcolor) }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sigColor(p.vcolor) }}></span>
                {p.verdict}
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">{p.nombre} · {p.meta}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3 text-center">
              Radar Diagnóstico (6 Ejes de Desempeño)
            </span>
            <RadarChart scores={p.radarScores} />
          </div>
        </div>

        {/* Middle Column: Price vs Zone Comparison & Factors */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Price / m² Zone Benchmark */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Benchmark de Precio por m²</span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">Comparativo frente a {p.comps} Inmuebles Activos en {p.colonia}</h3>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                {p.ppm2 > p.median ? `+${Math.round(((p.ppm2 - p.median) / p.median) * 100)}% vs zona` : 'Precio competitivo'}
              </span>
            </div>

            {/* Price Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-800">Esta propiedad ({p.nombre})</span>
                  <span className="font-mono font-bold text-slate-900">${p.ppm2.toLocaleString()} / m²</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(p.ppm2 / barMax) * 100}%`,
                      backgroundColor: sigColor(p.factores[0].s)
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-500">Mediana de absorción en {p.colonia} ({p.comps} comparables)</span>
                  <span className="font-mono font-bold text-slate-700">${p.median.toLocaleString()} / m²</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-800 rounded-full transition-all duration-500"
                    style={{ width: `${(p.median / barMax) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              💡 <strong>Transparencia para el propietario:</strong> La valuación se muestra respaldada por transacciones reales de la zona, convirtiendo la conversación de precio en una decisión objetiva de mercado.
            </p>
          </div>

          {/* Factor by Factor Diagnostics */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-4">
              Evidencia por Factor de Mercado
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {p.factores.map((f, idx) => {
                const IconComp = getFactorIcon(f.iconName);
                return (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-start gap-3 hover:border-slate-300 transition">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: sigBg(f.s) }}>
                      <IconComp size={18} style={{ color: sigColor(f.s) }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{f.k}</span>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sigColor(f.s) }}></span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-snug">{f.t}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Actionable Recipe Section (Bottom Card) */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg border border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} className="text-teal-400" />
          <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider">La Receta Accionable — 3 Pasos Recomendados</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {p.receta.map((r, i) => (
            <div key={i} className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-xl flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-teal-400 text-slate-950 font-black text-sm flex items-center justify-center mb-3">
                  {i + 1}
                </div>
                <h4 className="font-bold text-white text-xs leading-snug">{r.a}</h4>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{r.detail}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-1.5 text-xs text-teal-300 font-semibold">
                <TrendingUp size={14} /> {r.imp}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-3">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-teal-400" />
            Este informe se descarga en PDF con formato ejecutivo para presentar al cliente captador.
          </span>
          <button
            onClick={() => setShowPdfModal(true)}
            className="text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            Ver Vista Previa del PDF <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Modal for PDF Report */}
      {showPdfModal && (
        <PdfReportModal property={p} onClose={() => setShowPdfModal(false)} />
      )}

      {/* Modal for Adding Custom Property */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Diagnosticar Nuevo Inmueble</h3>
            <p className="text-xs text-slate-500 mb-4">Ingresa los datos para correr el análisis técnico de Property Doctor.</p>

            <form onSubmit={handleCreateProperty} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nombre / Título</label>
                <input
                  type="text"
                  required
                  value={newProp.nombre}
                  onChange={e => setNewProp({...newProp, nombre: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Colonia</label>
                  <input
                    type="text"
                    required
                    value={newProp.colonia}
                    onChange={e => setNewProp({...newProp, colonia: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Ciudad</label>
                  <input
                    type="text"
                    required
                    value={newProp.ciudad}
                    onChange={e => setNewProp({...newProp, ciudad: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Precio (MXN)</label>
                  <input
                    type="number"
                    required
                    value={newProp.precio}
                    onChange={e => setNewProp({...newProp, precio: Number(e.target.value)})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">M² Totales</label>
                  <input
                    type="number"
                    required
                    value={newProp.m2}
                    onChange={e => setNewProp({...newProp, m2: Number(e.target.value)})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Días en Mercado</label>
                  <input
                    type="number"
                    required
                    value={newProp.dias}
                    onChange={e => setNewProp({...newProp, dias: Number(e.target.value)})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Propietario</label>
                  <input
                    type="text"
                    required
                    value={newProp.propietario}
                    onChange={e => setNewProp({...newProp, propietario: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 cursor-pointer shadow-md"
                >
                  Ejecutar Diagnóstico
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { COMPARABLES_DATA } from '../data/mockData';
import { ComparableProp } from '../types';
import { Scale, MapPin, Sparkles, Building, TrendingUp, CheckCircle2, Calculator, ShieldCheck } from 'lucide-react';

export const ValuationView: React.FC = () => {
  const [comps, setComps] = useState<ComparableProp[]>(COMPARABLES_DATA);
  const [targetM2, setTargetM2] = useState<number>(120);
  const [targetPrice, setTargetPrice] = useState<number>(8900000);

  const avgPricePerM2 = Math.round(comps.reduce((acc, c) => acc + c.ppm2, 0) / comps.length);
  const calculatedSuggestedMin = Math.round((avgPricePerM2 * targetM2 * 0.98) / 100000) * 100000;
  const calculatedSuggestedMax = Math.round((avgPricePerM2 * targetM2 * 1.02) / 100000) * 100000;

  const currentPpm2 = Math.round(targetPrice / targetM2);
  const diffPercent = Math.round(((currentPpm2 - avgPricePerM2) / avgPricePerM2) * 100);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30 shrink-0">
            <Scale size={24} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Análisis Comparativo de Mercado (CMA)</span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">Valuación Explicable con Evidencia</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Modelos de estimación sustentados en comparables reales. Muestra al propietario exactamente de dónde proviene la cifra de mercado recomendada.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Valuation Result Box */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Rango de Precio de Mercado Sugerido
            </span>

            <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
              <div className="text-3xl font-black font-mono text-teal-300">
                ${(calculatedSuggestedMin / 1000000).toFixed(1)}M – ${(calculatedSuggestedMax / 1000000).toFixed(1)}M MXN
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <p>Mediana de absorción en zona: <strong className="text-white font-mono">${avgPricePerM2.toLocaleString()} / m²</strong></p>
                <p>Basado en {comps.length} comparables activos en un radio de 600m.</p>
              </div>

              <div className={`p-3 rounded-xl border text-xs font-semibold ${
                diffPercent > 5 ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-teal-500/10 border-teal-500/30 text-teal-300'
              }`}>
                {diffPercent > 0
                  ? `⚠️ El precio ingresado ($${(targetPrice / 1000000).toFixed(2)}M) se encuentra un ${diffPercent}% por encima de la mediana de la zona.`
                  : `✓ El precio ingresado se encuentra dentro del rango competitivo de mercado.`
                }
              </div>
            </div>
          </div>

          {/* Dynamic Valuation Adjuster Form */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Calculator size={15} className="text-teal-600" /> Calculadora de Ajuste en Vivo
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-600 font-medium block mb-1">M² de la Propiedad</label>
                <input
                  type="number"
                  value={targetM2}
                  onChange={e => setTargetM2(Number(e.target.value) || 100)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">Precio Actual (MXN)</label>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={e => setTargetPrice(Number(e.target.value) || 5000000)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Comparables Table & Evidence */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MapPin size={16} className="text-teal-600" /> Comparables de la Zona Utillizados ({comps.length})
            </span>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
              Búsqueda Georreferenciada de Mercado
            </span>
          </div>

          <div className="space-y-3 overflow-x-auto">
            {comps.map((c, i) => (
              <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-slate-300 transition">
                <div>
                  <div className="font-bold text-slate-900">{c.direccion}</div>
                  <div className="text-slate-500 mt-0.5 text-[11px]">
                    {c.m2} m² · Distancia: {c.distanciaKm} km · {c.diasEnMercado} días en mercado
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <div className="text-right">
                    <div className="font-mono font-bold text-slate-900">${c.precio.toLocaleString()} MXN</div>
                    <div className="text-[10px] font-mono text-slate-500">${c.ppm2.toLocaleString()} / m²</div>
                  </div>
                  <span className="text-[10px] font-bold bg-teal-500/10 text-teal-800 border border-teal-500/20 px-2 py-1 rounded">
                    {c.similitud}% Match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Why it Matters Banner */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
        <ShieldCheck size={20} className="text-teal-600 shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">Criterio Objetivo sin Estimaciones 'Mágicas'</span>
          <p className="text-xs text-slate-700 mt-1 leading-relaxed">
            La IA no entrega un número arbitrario: extrae y cruza los datos georreferenciados del entorno urbano y presenta la evidencia transparente que convence a los propietarios.
          </p>
        </div>
      </div>

    </div>
  );
};

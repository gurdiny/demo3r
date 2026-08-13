import React, { useState } from 'react';
import { GraduationCap, Sparkles, CheckCircle2, AlertTriangle, MessageSquare, TrendingUp, Clock, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';

export const CoachingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'advisor' | 'manager'>('advisor');

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30 shrink-0">
            <GraduationCap size={24} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Inteligencia de Conversación & Desempeño Comercial</span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">Coaching de Conversaciones con IA</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Auditoría continua de las interacciones por WhatsApp. Evalúa velocidad de respuesta, manejo de objeciones de precio y sugiere guiones tácticos para cerrar más citas.
            </p>
          </div>
        </div>
      </div>

      {/* Role Switcher */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Modo de Perspectiva:</span>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('advisor')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'advisor' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vista Asesor (Feedback Táctico Individual)
          </button>
          <button
            onClick={() => setActiveTab('manager')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'manager' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vista Dirección / Gerencia (Métricas Globales)
          </button>
        </div>
      </div>

      {/* Content for Advisor View */}
      {activeTab === 'advisor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Conversation Summary Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-teal-600" />
                <h3 className="font-bold text-sm text-slate-900">Conversación Auditada</h3>
              </div>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold font-mono px-2.5 py-0.5 rounded-full">
                Calificación: B (Regular)
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-medium block">Cliente:</span>
                <strong className="text-slate-900 text-sm">Lic. Laura Morales (Interés en Roma Norte)</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-medium block">Asesor Asignado:</span>
                <strong className="text-slate-900">Roberto Gómez (3R Connect)</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-medium block">Tiempo de Respuesta Medido:</span>
                <strong className="text-red-600 font-mono">4 horas 12 minutos</strong> (Meta del equipo: &lt; 45 mins)
              </div>
            </div>
          </div>

          {/* AI Observations & Recommended Next Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Observaciones Detectadas por la IA
              </span>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5">
                  <AlertTriangle size={16} className="text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-red-900 font-bold block">Tiempo de respuesta prolongado (4h+)</strong>
                    <span className="text-red-700">El 74% de los prospectos calificados se enfría si la respuesta supera las 2 horas.</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
                  <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-amber-900 font-bold block">Objeción de Precio inconclusa</strong>
                    <span className="text-amber-700">La clienta mencionó que el m² en la zona estaba elevado y no se ofrecieron comparables de respaldo.</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
                  <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-amber-900 font-bold block">Falta Cierre de Visita</strong>
                    <span className="text-amber-700">Se enviaron fotos pero no se ofrecieron 2 horarios concretos para coordinar recorrido presencial.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tactical Script Recommendation */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={16} /> Guion Táctico Recomendado para Reenganchar
                </span>
                <span className="text-[10px] font-mono bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded">
                  Copiar y Enviar
                </span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed italic">
                "Hola Lic. Laura, disculpe la demora. Analizando su inquietud sobre el precio en Roma Norte, le adjunto el reporte de transacciones recientes donde verá que esta propiedad incluye 2 cajones libres y bodega privada ($400k de valor agregado). ¿Le parece si coordinamos una visita este sábado a las 11:00 AM o prefiere las 4:00 PM?"
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Manager / Director View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tiempo Promedio de Respuesta</span>
            <div className="text-3xl font-black font-mono text-slate-900 mt-2">28 min</div>
            <p className="text-xs text-teal-600 font-semibold mt-1">↓ 14 mins mejor que la semana pasada</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tasa de Conversión a Cita</span>
            <div className="text-3xl font-black font-mono text-slate-900 mt-2">34.2%</div>
            <p className="text-xs text-teal-600 font-semibold mt-1">↑ +8.5% tras implementar guiones IA</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Calificación Promedio del Equipo</span>
            <div className="text-3xl font-black font-mono text-teal-600 mt-2">88 / 100</div>
            <p className="text-xs text-slate-500 mt-1">Evaluación sobre 140 chats activos</p>
          </div>
        </div>
      )}

      {/* Why it Matters Banner */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
        <Sparkles size={20} className="text-teal-600 shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">Transformar Charlas en Visitas Reales</span>
          <p className="text-xs text-slate-700 mt-1 leading-relaxed">
            No es fiscalización: es convertir cada interacción de WhatsApp en aprendizaje continuo, asegurando que ningún lead calificado se pierda por falta de seguimiento comercial estructurado.
          </p>
        </div>
      </div>

    </div>
  );
};

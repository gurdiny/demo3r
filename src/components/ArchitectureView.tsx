import React, { useState } from 'react';
import {
  Layers, Server, Database, ShieldCheck, Cpu, Smartphone, Globe,
  CheckCircle2, ArrowRight, Zap, Lock, FileCode, HardDrive, Share2,
  Building, Layout, RefreshCw, Sparkles, AlertTriangle
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'decision' | 'topology' | 'stack' | 'legal' | 'roadmap'>('topology');

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30 shrink-0">
            <Layers size={24} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Propuesta Estratégica y Técnica</span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">Ecosistema 3R CONNECT — El Activo Inmobiliario Propio</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Arquitectura pragmática de alto rendimiento, multi-tenant nativa, con WhatsApp Oficial, residencia de servidores en México y motor de inteligencia propia.
            </p>
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto bg-white border border-slate-200 p-2 rounded-2xl shadow-sm">
        <button
          onClick={() => setActiveSection('topology')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSection === 'topology' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Globe size={15} className="text-teal-400" /> 1. Topología (3 Superficies)
        </button>

        <button
          onClick={() => setActiveSection('decision')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSection === 'decision' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building size={15} className="text-teal-400" /> 2. SaaS vs Activo Propio
        </button>

        <button
          onClick={() => setActiveSection('stack')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSection === 'stack' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Server size={15} className="text-teal-400" /> 3. Capacidad & Operación
        </button>

        <button
          onClick={() => setActiveSection('legal')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSection === 'legal' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Lock size={15} className="text-teal-400" /> 4. Cumplimiento LFPDPPP
        </button>

        <button
          onClick={() => setActiveSection('roadmap')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSection === 'roadmap' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Zap size={15} className="text-teal-400" /> 5. Hoja de Ruta por Fases
        </button>
      </div>

      {/* SECTION 1: TOPOLOGY */}
      {activeSection === 'topology' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Surface 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold">
                <Globe size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900">1. Portal Público SEO</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Catálogo web ultra-rápido multi-tenant para albergar la marca propia y catálogo público de propiedades. Optimizado para posicionamiento orgánico.
              </p>
            </div>

            {/* Surface 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold">
                <Smartphone size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900">2. CRM & App del Asesor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Web app responsive para el trabajo comercial diario. Centralización de leads, sincronización con Google Calendar e inbox unificado de WhatsApp Oficial.
              </p>
            </div>

            {/* Surface 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold">
                <Layout size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900">3. Micrositio del Comprador</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enlaces interactivos únicos donde el cliente gestiona sus favoritos y agende citas sin necesidad de crear cuentas ni descargas complejas.
              </p>
            </div>

          </div>

          {/* Core Engine Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md text-center space-y-3">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Motor Compartido Central</span>
            <h3 className="text-lg font-bold text-white">Plataforma Unificada & Procesamiento Automatizado</h3>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Procesamiento continuo en segundo plano, geolocalización avanzada y motor inteligente para el emparejamiento (matching) automático entre compradores e inmuebles.
            </p>
          </div>
        </div>
      )}

      {/* SECTION 2: DECISION */}
      {activeSection === 'decision' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">La Decisión Estratégica: SaaS Genérico vs Activo Millonario Propio</h3>
            <p className="text-xs text-slate-500 mt-1">Transformar un gasto recurrente en valor corporativo capitalizable para 3R CONNECT.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SaaS Generic */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">SaaS Genérico</span>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span> Gasto mensual perpetuo que no genera equity corporativo.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span> Datos alojados en servidores extranjeros fuera de control.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span> La empresa debe adaptar su operación al software genérico.
                </li>
              </ul>
            </div>

            {/* Custom Asset */}
            <div className="bg-teal-950/20 border border-teal-500/40 rounded-xl p-5 space-y-3">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">Desarrollo 100% a la Medida (3R Connect)</span>
              <ul className="space-y-2 text-xs text-slate-800 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">✓</span> Inversión capitalizable (equity) 100% propiedad de 3R CONNECT.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">✓</span> Control absoluto con residencia de datos física en México.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">✓</span> La herramienta se moldea al flujo operativo exacto de la empresa.
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 3: CAPACIDAD & OPERACION */}
      {activeSection === 'stack' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Capacidad Operativa y Procesamiento de la Plataforma</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <strong className="text-slate-900 font-bold block text-sm">Núcleo Comercial & CRM</strong>
              <p className="text-slate-600">Centralización de expedientes, gestión fluida de propiedades e integración multicanal para asesores.</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <strong className="text-slate-900 font-bold block text-sm">Motor de Datos e Inteligencia</strong>
              <p className="text-slate-600">Búsquedas geográficas por radio de influencia y cruce automatizado de perfiles de compradores con inventario disponible.</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <strong className="text-slate-900 font-bold block text-sm">Gestión Asíncrona de Medios</strong>
              <p className="text-slate-600">Procesamiento directo de galerías fotográficas de alta resolución y generación instantánea de expedientes en formato PDF.</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: LEGAL */}
      {activeSection === 'legal' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Cumplimiento Legal LFDPPPP (Ley de Datos Personales)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Residencia soberana de servidores alojados físicamente en la región de México, cifrado en reposo para documentos sensibles (escrituras, avaluos, identificaciones) y bitácora transversal de auditoría (Audit Log).
          </p>
        </div>
      )}

      {/* SECTION 5: ROADMAP */}
      {activeSection === 'roadmap' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Estrategia por Fases: Mitigación de Riesgos</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold uppercase text-[10px] tracking-wider">Fase 1 (~3 Meses)</span>
              <h4 className="font-bold text-sm">MVP & Despliegue Rápido</h4>
              <p className="text-slate-400 leading-relaxed">
                Portal público, CRM base, WhatsApp Oficial, Micrositio inicial y las ~15 funcionalidades operativas más críticas.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2 text-slate-800">
              <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Fase 2</span>
              <h4 className="font-bold text-sm">IA & Escala</h4>
              <p className="text-slate-600 leading-relaxed">
                Property Doctor completo, co-broker dinámico, motor de matching inteligente y auditoría de fotografías.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2 text-slate-800">
              <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Fase 3</span>
              <h4 className="font-bold text-sm">Expansión & Ecosistema</h4>
              <p className="text-slate-600 leading-relaxed">
                Apertura a redes externas de asesores, integraciones avanzadas y app móvil nativa.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

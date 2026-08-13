import React, { useState } from 'react';
import { Share2, MessageCircle, Building, CheckCircle2, ShieldCheck, ArrowRight, Bell, Sparkles, DollarSign, UserCheck, Smartphone } from 'lucide-react';

export const CoBrokerView: React.FC = () => {
  const [viewAs, setViewAs] = useState<'3r' | 'aurora'>('3r');
  const [leadSimulated, setLeadSimulated] = useState<boolean>(false);

  const agent = viewAs === '3r'
    ? {
        name: "3R Connect Inmobiliaria",
        advisor: "Ana Ruiz · Asesora Colocadora",
        phone: "55 1234 5678",
        color: "#12B3A4",
        badge: "Branding Dinámico de 3R",
        tagline: "Tu asesor personal de confianza en CDMX"
      }
    : {
        name: "Inmobiliaria Aurora (Captador)",
        advisor: "Aurora Del Toro · Inmobiliaria Captadora",
        phone: "55 9000 1122",
        color: "#122A49",
        badge: "Inventario Original de Aurora",
        tagline: "Inmuebles Exclusivos en Polanco & Lomas"
      };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30 shrink-0">
            <Share2 size={24} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Innovación en Colaboración Inmobiliaria</span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">Red Colaborativa con Atribución Dinámica</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Cualquier asesor de la red comparte una propiedad exclusiva conservando 100% su propia marca. El comprador sólo ve a quien comparte, y el lead ingresa directamente a su embudo.
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Switcher Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Smartphone className="text-teal-600" size={18} />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Simulador de Micrositio Interactivo:</span>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewAs('3r')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewAs === '3r' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vista Comprador (Branding 3R Connect)
          </button>
          <button
            onClick={() => setViewAs('aurora')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewAs === 'aurora' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vista Captador (Inmobiliaria Aurora)
          </button>
        </div>
      </div>

      {/* Main Grid: Mobile Preview & Backend Mechanics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Dynamic Microsite Card */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            {/* Property Hero */}
            <div className="relative h-52 bg-slate-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Polanco Luxury Residence"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30"></div>
              
              <div className="absolute top-4 left-4">
                <span className="bg-teal-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                  {agent.badge}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs text-teal-300 font-semibold uppercase tracking-wider">Lomas de Chapultepec, CDMX</span>
                <h3 className="text-xl font-bold text-white leading-tight">Residencia de Lujo Chapultepec</h3>
                <p className="text-sm font-mono font-bold text-teal-200 mt-0.5">$18,500,000 MXN · 450 m²</p>
              </div>
            </div>

            {/* Dynamic Agent Branding Panel */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0"
                  style={{ backgroundColor: agent.color }}
                >
                  {viewAs === '3r' ? '3R' : 'IA'}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{agent.name}</h4>
                  <p className="text-xs text-slate-600 font-medium">{agent.advisor}</p>
                  <p className="text-[11px] text-teal-700 font-semibold mt-0.5">WhatsApp: {agent.phone}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                4 Recámaras · 5 Baños · 4 Estacionamientos · Jardín Privado de 120 m² · Seguridad 24/7.
              </p>

              <button
                onClick={() => setLeadSimulated(true)}
                className="w-full py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition cursor-pointer"
                style={{ backgroundColor: agent.color }}
              >
                <MessageCircle size={18} /> Contactar por WhatsApp al Asesor ({viewAs === '3r' ? '3R Connect' : 'Aurora'})
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Enlace dinámico: <code>3rconnect.app/m/3r-polanco-88</code></span>
            <span className="font-bold text-teal-700">Multi-tenant Nativo</span>
          </div>
        </div>

        {/* Right: How the Engine Works */}
        <div className="space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Mecánica del Motor de Atribución Dinámica
            </span>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={16} className="text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900">1. Captura Única del Inventario:</strong> Inmobiliaria Aurora (Asesor A) sube la propiedad exclusiva a la red compartida de 3R.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={16} className="text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900">2. Generación de Enlace Dinámico:</strong> Ana Ruiz (3R Connect - Asesor B) genera su link personalizado con token de atribución.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={16} className="text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900">3. Blindaje de la Relación Comercial:</strong> El cliente comprador únicamente observa la marca, foto y contacto de 3R Connect. Ningún dato de la inmobiliaria captadora es expuesto al cliente.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={16} className="text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900">4. Reparto Automatizado de Comisión (50/50):</strong> Al firmar la compraventa, la plataforma registra y divide la comisión automáticamente sin disputas.
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Lead Dispatch Status Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-teal-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">Estado del Lead en Tiempo Real</span>
              </div>
              <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded">
                CRM Webhook
              </span>
            </div>

            {leadSimulated ? (
              <div className="bg-slate-800/90 border border-teal-500/40 rounded-xl p-4 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <UserCheck size={14} className="text-teal-400" /> ¡Nuevo Lead Recibido por WhatsApp!
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Ahora mismo</span>
                </div>
                <p className="text-xs text-slate-300">
                  Asignado directamente a la bandeja de: <strong>{agent.advisor}</strong>
                </p>
                <div className="pt-2 border-t border-slate-700/80 text-[11px] text-teal-300 flex items-center justify-between">
                  <span>Comisión Estimada (50%): <strong>$277,500 MXN</strong></span>
                  <span className="text-slate-400">Comisión Total: 3% ($555,000 MXN)</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-700 text-center text-slate-400 text-xs">
                Haz clic arriba en <strong>"Contactar por WhatsApp"</strong> para simular el flujo en vivo del lead.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Why it Matters Banner */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
        <Sparkles size={20} className="text-teal-600 shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">Por Qué Importa para 3R Connect</span>
          <p className="text-xs text-slate-700 mt-1 leading-relaxed">
            Ninguna plataforma del mercado invierte la atribución así: permite multiplicar x10 el inventario ofrecido a los clientes mientras se protege el activo más valioso de la agencia: <strong>la relación con el prospecto comprador</strong>.
          </p>
        </div>
      </div>

    </div>
  );
};

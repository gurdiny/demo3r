import React, { useState } from 'react';
import { SAMPLE_CHAT_MESSAGES, INITIAL_PROSPECT_PROFILE } from '../data/mockData';
import { WhatsAppMessage, ProspectProfile } from '../types';
import { MessageCircle, Sparkles, Send, CheckCircle2, AlertCircle, User, DollarSign, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export const WhatsAppProfilerView: React.FC = () => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>(SAMPLE_CHAT_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [analyzed, setAnalyzed] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProspectProfile>(INITIAL_PROSPECT_PROFILE);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: WhatsAppMessage = {
      id: `msg-${Date.now()}`,
      sender: 'prospect',
      text: inputText,
      time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInputText('');
    setAnalyzed(false);
  };

  const handleAnalyzeChat = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
      // Update profile with extracted insights
      setProfile({
        ...profile,
        estatus: "Perfil Actualizado por IA",
        siguientePaso: "Sugerencia: Enviar catálogo de 2 departamentos en Roma Norte dentro de presupuesto ($8.5M MXN)."
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30 shrink-0">
            <MessageCircle size={24} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Integración con Meta Cloud API</span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">Perfilador Automático de WhatsApp</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              La IA analiza la conversación en tiempo real y extrae la ficha técnica del prospecto (presupuesto, zonas, urgencia, recámaras) sin requirir captura manual del asesor.
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: WhatsApp Live Chat Simulation */}
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between h-[540px]">
          
          {/* Chat Header */}
          <div className="bg-slate-800/90 px-5 py-3.5 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-sm shadow">
                AP
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Lic. Alejandro Parra</h4>
                <p className="text-[10px] text-teal-300 font-medium">WhatsApp Business · Conexión Directa Oficial</p>
              </div>
            </div>
            <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2.5 py-1 rounded-full font-bold">
              WhatsApp Oficial
            </span>
          </div>

          {/* Messages Feed */}
          <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-slate-950/60">
            {messages.map(msg => {
              const isProspect = msg.sender === 'prospect';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isProspect ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      isProspect
                        ? 'bg-slate-800 text-slate-100 rounded-tl-xs border border-slate-700'
                        : 'bg-teal-600 text-white rounded-tr-xs shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">{msg.time}</span>
                </div>
              );
            })}
          </div>

          {/* Chat Controls */}
          <div className="p-3 bg-slate-800/90 border-t border-slate-700/80 space-y-2">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Escribe o simula un mensaje del cliente..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500 placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>

            <button
              onClick={handleAnalyzeChat}
              disabled={isAnalyzing}
              className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-teal-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition cursor-pointer border border-slate-600"
            >
              <Sparkles size={14} className="text-teal-400" />
              {isAnalyzing ? 'Analizando conversación...' : 'Analizar Conversación con IA'}
            </button>
          </div>

        </div>

        {/* Right Column: AI Extracted Prospect Card */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <User size={18} className="text-teal-600" />
                <h3 className="font-bold text-sm text-slate-900">Ficha Técnica Extraída</h3>
              </div>
              {analyzed && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                  <CheckCircle2 size={13} /> Sincronizado
                </span>
              )}
            </div>

            {/* Fields List */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-medium">Nombre Prospecto</span>
                <span className="font-bold text-slate-900">{profile.nombre}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <DollarSign size={13} className="text-teal-600" /> Presupuesto Máx.
                </span>
                <span className="font-bold font-mono text-slate-900">${profile.presupuestoMax.toLocaleString()} MXN</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <MapPin size={13} className="text-teal-600" /> Zonas Objetivo
                </span>
                <div className="flex gap-1">
                  {profile.zonas.map((z, idx) => (
                    <span key={idx} className="bg-slate-200 text-slate-800 font-bold text-[10px] px-2 py-0.5 rounded">
                      {z}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-medium">Nivel de Urgencia</span>
                <span className="bg-red-100 text-red-700 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                  ⚡ Alta (60 días max)
                </span>
              </div>

              <div>
                <span className="text-slate-500 font-medium block mb-1">Requisitos Detectados:</span>
                <div className="flex flex-wrap gap-1.5">
                  {profile.requisitos.map((req, i) => (
                    <span key={i} className="bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-semibold px-2.5 py-1 rounded-lg">
                      ✓ {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Action Guidance */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles size={14} className="text-teal-600" /> Siguiente Paso Sugerido por IA:
              </span>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                {profile.siguientePaso}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Why it Matters Banner */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
        <ShieldCheck size={20} className="text-teal-600 shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">Cero Fricción para el Asesor</span>
          <p className="text-xs text-slate-700 mt-1 leading-relaxed">
            Alineado con la visión de <strong>tecnología invisible que no requiere ser aprendida ni operada manualmente</strong>: el asesor conversa normalmente por WhatsApp y la infraestructura nutre el CRM de forma transparente.
          </p>
        </div>
      </div>

    </div>
  );
};

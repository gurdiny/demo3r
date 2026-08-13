import React from 'react';
import {
  Stethoscope, Share2, MessageCircle, Camera, GraduationCap, Scale,
  Layers, ChevronRight, Sparkles, CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onSelectView: (viewId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView }) => {
  const menuItems = [
    {
      id: 'doctor',
      label: 'Property Doctor',
      desc: 'Diagnóstico & Salud del Inmueble',
      icon: Stethoscope,
      star: true,
      badge: 'PIEZA CENTRAL'
    },
    {
      id: 'cobroker',
      label: 'Red Colaborativa',
      desc: 'Co-Broker & Atribución Dinámica',
      icon: Share2,
      star: false,
      badge: 'BRANDING 3R'
    },
    {
      id: 'whatsapp',
      label: 'Perfilador WhatsApp',
      desc: 'Ficha Técnica Automática',
      icon: MessageCircle,
      star: false,
      badge: 'SIN FRICCIÓN'
    },
    {
      id: 'photos',
      label: 'Auditor de Fotos',
      desc: 'Visión IA de Anuncios',
      icon: Camera,
      star: false,
      badge: 'VISIÓN IA'
    },
    {
      id: 'coaching',
      label: 'Coaching de Ventas',
      desc: 'Auditoría & Guiones Tácticos',
      icon: GraduationCap,
      star: false,
      badge: 'DESEMPEÑO'
    },
    {
      id: 'valuation',
      label: 'Valuación Explicable',
      desc: 'CMA con Evidencia de Mercado',
      icon: Scale,
      star: false,
      badge: 'GEOLOCALIZACIÓN'
    },
    {
      id: 'architecture',
      label: 'Visión & Arquitectura',
      desc: 'Topología, Alcance & Roadmap',
      icon: Layers,
      star: false,
      badge: 'DECK 3R'
    }
  ];

  return (
    <aside className="w-full lg:w-72 bg-slate-900 text-white shrink-0 p-4 flex flex-col justify-between min-h-[640px] border-r border-slate-800">
      <div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">
          LO QUE LA PLATAFORMA PUEDE HACER
        </div>

        <nav className="space-y-1.5 mt-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`w-full text-left p-3 rounded-xl transition cursor-pointer flex items-center justify-between group ${
                  isActive
                    ? 'bg-teal-500/15 border border-teal-500/40 text-white shadow-sm'
                    : 'hover:bg-slate-800/80 text-slate-300 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold transition ${
                      isActive ? 'bg-teal-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-400 group-hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs leading-snug">{item.label}</span>
                      {item.star && (
                        <span className="bg-teal-400 text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded uppercase">
                          DEMO
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 block leading-tight mt-0.5">{item.desc}</span>
                  </div>
                </div>

                <ChevronRight size={14} className={`transition ${isActive ? 'text-teal-400 transform translate-x-0.5' : 'text-slate-600 opacity-0 group-hover:opacity-100'}`} />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="mt-6 p-3.5 bg-slate-800/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
        <div className="flex items-center gap-1.5 text-teal-400 font-bold">
          <Sparkles size={14} /> Datos Reales de Ejemplo
        </div>
        <p className="leading-relaxed">
          Toda la inteligencia opera sobre datos que la agencia <strong>ya genera hoy</strong> sin agregar sobrecarga.
        </p>
      </div>
    </aside>
  );
};

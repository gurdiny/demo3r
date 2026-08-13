import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PropertyDoctorView } from './components/PropertyDoctorView';
import { CoBrokerView } from './components/CoBrokerView';
import { WhatsAppProfilerView } from './components/WhatsAppProfilerView';
import { ListingQualityView } from './components/ListingQualityView';
import { CoachingView } from './components/CoachingView';
import { ValuationView } from './components/ValuationView';
import { ArchitectureView } from './components/ArchitectureView';
import { DisclaimerModal } from './components/DisclaimerModal';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('doctor');
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(true);

  const renderMainView = () => {
    switch (currentView) {
      case 'doctor':
        return <PropertyDoctorView />;
      case 'cobroker':
        return <CoBrokerView />;
      case 'whatsapp':
        return <WhatsAppProfilerView />;
      case 'photos':
        return <ListingQualityView />;
      case 'coaching':
        return <CoachingView />;
      case 'valuation':
        return <ValuationView />;
      case 'architecture':
        return <ArchitectureView />;
      default:
        return <PropertyDoctorView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      {/* Initial Warning Disclaimer Modal */}
      <DisclaimerModal
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />

      {/* Top Header */}
      <Header
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenDisclaimer={() => setShowDisclaimer(true)}
      />

      {/* Body Layout */}
      <div className="flex-1 w-full flex flex-col lg:flex-row gap-0">
        {/* Left Navigation Sidebar */}
        <Sidebar currentView={currentView} onSelectView={setCurrentView} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-100 overflow-y-auto">
          {renderMainView()}
        </main>
      </div>

      {/* Global Executive Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-4 px-6 border-t border-slate-800 text-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span><strong>3R CONNECT</strong> — Plataforma e Infraestructura Inmobiliaria con Inteligencia Artificial</span>
          <span className="text-teal-400 font-medium">Prototipo Interactivo de Experiencia Comercial & Técnica</span>
        </div>
      </footer>
    </div>
  );
}

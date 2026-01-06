import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingDown, 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  Activity, 
  ChevronRight, 
  Layout, 
  Home,
  Menu,
  X,
  PieChart,
  Users,
  CheckCircle
} from 'lucide-react';
import { ViewState } from './types';
import VacancyCalculator from './components/VacancyCalculator';
import ROICalculator from './components/ROICalculator';

declare global {
  interface window {
    hbspt: any;
  }
}

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu on view change
  }, [view]);

  const scrollToContact = () => {
    if (view !== ViewState.DASHBOARD) {
      setView(ViewState.DASHBOARD);
      setTimeout(() => {
        const element = document.getElementById('contact');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 300); // Wait for transition
    } else {
      const element = document.getElementById('contact');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (view) {
      case ViewState.VACANCY_CALC:
        return <VacancyCalculator onContactClick={scrollToContact} />;
      case ViewState.ROI_CALC:
        return <ROICalculator onContactClick={scrollToContact} />;
      default:
        return <Dashboard onViewChange={setView} onContactClick={scrollToContact} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 overflow-x-hidden">
      {/* Navbar - Glassmorphism */}
      <header className="glass border-b border-slate-200/60 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            {/* Logo Area */}
            <div 
              className="flex items-center cursor-pointer py-2" 
              onClick={() => setView(ViewState.DASHBOARD)}
            >
              <Logo />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center bg-slate-100/50 p-1.5 rounded-xl border border-slate-200/50">
              <NavButton 
                active={view === ViewState.DASHBOARD} 
                onClick={() => setView(ViewState.DASHBOARD)} 
                label="" 
                icon={<Home size={20} />} 
              />
              <NavButton 
                active={view === ViewState.VACANCY_CALC} 
                onClick={() => setView(ViewState.VACANCY_CALC)} 
                label="Leerstand" 
                icon={<TrendingDown size={14} />} 
              />
              <NavButton 
                active={view === ViewState.ROI_CALC} 
                onClick={() => setView(ViewState.ROI_CALC)} 
                label="ROI & Funnel" 
                icon={<BarChart3 size={14} />} 
              />
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-2">
               {/* Desktop CTA */}
               <a
                href="https://meetings-eu1.hubspot.com/yathur"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
               >
                 Erstberatung
               </a>

               {/* Mobile Menu Button */}
               <button 
                 className="lg:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                 aria-label="Menu"
               >
                 {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 md:top-24 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl animate-fade-in z-40 overflow-hidden">
            <div className="p-4 space-y-2">
              <NavButton 
                active={view === ViewState.DASHBOARD} 
                onClick={() => setView(ViewState.DASHBOARD)} 
                label="Home" 
                icon={<Home size={20} />} 
                className="w-full justify-start py-4 px-5 text-base"
              />
              <NavButton 
                active={view === ViewState.VACANCY_CALC} 
                onClick={() => setView(ViewState.VACANCY_CALC)} 
                label="Leerstand Rechner" 
                icon={<TrendingDown size={18} />} 
                className="w-full justify-start py-4 px-5 text-base"
              />
              <NavButton 
                active={view === ViewState.ROI_CALC} 
                onClick={() => setView(ViewState.ROI_CALC)} 
                label="ROI & Funnel Rechner" 
                icon={<BarChart3 size={18} />} 
                className="w-full justify-start py-4 px-5 text-base"
              />
               <a
                href="https://meetings-eu1.hubspot.com/yathur"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full bg-slate-900 text-white px-5 py-4 rounded-xl text-center font-bold"
               >
                 Gratis Erstberatung
               </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content with Transition Key */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          {/* Key forces re-render of animation when view changes */}
          <div key={view} className="animate-slide-up">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto pt-12 md:pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12">
            <div className="md:col-span-5">
              <div className="mb-6 cursor-pointer inline-block" onClick={() => setView(ViewState.DASHBOARD)}>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  Leerstand minimieren.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600">Time-to-Rent halbieren.</span>
                </h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Immobilienvermarktung ist komplex genug. Wir stärken Vermarkter mit datenbasierter Performance. Wir reduzieren Leerstand durch Geschwindigkeit, Technologie und absolute Transparenz.
              </p>
            </div>
            
            <div className="md:col-span-3">
              <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Tools</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><button onClick={() => setView(ViewState.VACANCY_CALC)} className="hover:text-blue-600 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Cost-of-Vacancy</button></li>
                <li><button onClick={() => setView(ViewState.ROI_CALC)} className="hover:text-blue-600 transition-colors flex items-center gap-2"><ChevronRight size={14}/> ROI Rechner</button></li>
                <li><button onClick={scrollToContact} className="hover:text-blue-600 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Potenzialanalyse</button></li>
              </ul>
            </div>
            
            <div className="md:col-span-4">
              <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Kontakt</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>
                  <a 
                    href="https://www.nathanproductions.ch/?utm_source=web&utm_medium=organic&utm_campaign=Immobilienmarketing" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <ChevronRight size={14}/> Nathan Productions
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.nathanproductions.ch/about/?utm_source=web&utm_medium=organic&utm_campaign=Immobilienmarketing" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <ChevronRight size={14}/> Über mich
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.nathanproductions.ch/blog/?utm_source=web&utm_medium=organic&utm_campaign=Immobilienmarketing" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <ChevronRight size={14}/> Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium text-center md:text-left">
            <p>&copy; 2026 Nathan Productions. Built for Performance.</p>
            <p>Eine Nathan Productions Dienstleistung.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Components ---

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <img 
    src="https://raw.githubusercontent.com/yathur-hub/NathanProductions-BrandAsstes/main/BrandLogo/performanceboost.ch%20logo%20350x150.png"
    alt="PerformanceBoost"
    className={`h-14 md:h-[85px] w-auto object-contain transition-transform duration-300 hover:scale-105 ${className}`}
  />
);

const NavButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon?: React.ReactNode; className?: string }> = ({ active, onClick, label, icon, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
      active
        ? 'bg-white text-slate-900 shadow-sm'
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
    } ${className}`}
  >
    {icon && <span className={`${label ? 'mr-2' : ''} opacity-80`}>{icon}</span>}
    {label}
  </button>
);

const HubSpotForm: React.FC = () => {
  useEffect(() => {
    // Check if script already exists
    const win = window as any;
    if (document.querySelector('script[src*="hsforms.net"]')) {
      if (win.hbspt) {
        win.hbspt.forms.create({
          portalId: "146982251",
          formId: "7b899e82-cb77-48a6-b59f-614a305a25a4",
          region: "eu1",
          css: '', // IMPORTANT: Disable default HubSpot styles
          target: '#hubspot-form-target'
        });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = "//js-eu1.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    document.body.appendChild(script);

    script.onload = () => {
      if (win.hbspt) {
        win.hbspt.forms.create({
          portalId: "146982251",
          formId: "7b899e82-cb77-48a6-b59f-614a305a25a4",
          region: "eu1",
          css: '', // IMPORTANT: Disable default HubSpot styles
          target: '#hubspot-form-target'
        });
      }
    };
  }, []);

  return (
    <div className="hubspot-form-custom" id="hubspot-form-target">
      <div className="flex flex-col items-center justify-center p-8 text-slate-400">
         <p className="text-sm animate-pulse">Lade Kontaktformular...</p>
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ onViewChange: (view: ViewState) => void, onContactClick: () => void }> = ({ onViewChange, onContactClick }) => {
  const platforms = [
    { name: 'Display & Video 360', src: 'https://raw.githubusercontent.com/yathur-hub/NathanProductions-BrandAsstes/refs/heads/main/DV360.png' },
    { name: 'Google Ads', src: 'https://raw.githubusercontent.com/yathur-hub/NathanProductions-BrandAsstes/refs/heads/main/GoogleAds.png' },
    { name: 'LinkedIn', src: 'https://raw.githubusercontent.com/yathur-hub/NathanProductions-BrandAsstes/refs/heads/main/LinkedIn.png' },
    { name: 'Meta', src: 'https://raw.githubusercontent.com/yathur-hub/NathanProductions-BrandAsstes/refs/heads/main/Meta.png' },
    { name: 'Pinterest', src: 'https://raw.githubusercontent.com/yathur-hub/NathanProductions-BrandAsstes/refs/heads/main/Pinterest.png' },
    { name: 'TikTok', src: 'https://raw.githubusercontent.com/yathur-hub/NathanProductions-BrandAsstes/refs/heads/main/TikTok.png' },
    { name: 'YouTube', src: 'https://raw.githubusercontent.com/yathur-hub/NathanProductions-BrandAsstes/refs/heads/main/YouTube.png' }
  ];

  const carouselItems = [...platforms, ...platforms];

  return (
    <div className="space-y-16 md:space-y-24 pb-12">

      {/* 1. Hero Section */}
      <section className="relative text-center max-w-5xl mx-auto pt-4 md:pt-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
          <Activity size={14} /> Swiss Real Estate Performance
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] md:leading-[1.05] mb-8 tracking-tight">
          Leerstand minimieren.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600">Time-to-Rent halbieren.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-4xl mx-auto font-medium px-2">
          Projektwebseite und Kampagnenperformance ab Tag 1 integriert.<br className="hidden md:block" />
          Vermarktungsperformance, die Vermarkter durch datengetriebene Geschwindigkeit befähigt
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16 px-4">
          <button 
            onClick={() => onViewChange(ViewState.VACANCY_CALC)}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
               Potenzial berechnen <TrendingDown size={18} className="group-hover:translate-x-1 transition-transform"/>
            </span>
          </button>
          
          <button 
             onClick={() => onViewChange(ViewState.ROI_CALC)}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all w-full sm:w-auto"
          >
            <BarChart3 size={18} />
            ROI Analyse
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-y border-slate-100 py-6 md:py-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500 max-w-5xl mx-auto">
           {['Schnelligkeit', 'Datenfokus', 'Transparenz', 'Swiss Made'].map((item, i) => (
             <div key={i} className="text-center font-bold text-slate-400 uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-1.5 md:gap-2">
               <CheckCircle2 size={14} className="shrink-0" /> {item}
             </div>
           ))}
        </div>

        {/* Platform Logobar Carousel */}
        <div className="pt-10 md:pt-12 w-full max-w-5xl mx-auto overflow-hidden animate-fade-in delay-100 relative">
          <div className="absolute top-0 left-0 h-full w-12 md:w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-12 md:w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
          
           <div className="flex w-max animate-scroll gap-12 md:gap-24">
             {carouselItems.map((platform, i) => (
               <img 
                 key={i} 
                 src={platform.src} 
                 alt={platform.name} 
                 className="h-8 md:h-16 w-auto object-contain opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300" 
               />
             ))}
           </div>
        </div>
      </section>

      {/* 2. Pain Point Section */}
      <section className="max-w-7xl mx-auto px-2 md:px-0">
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center relative z-10">
            <div>
               <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Effizienzverluste entstehen dort, wo <span className="text-red-600">Daten fehlen</span>.
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
                Immobilienprojekte scheitern selten an der Substanz, sondern an der Sichtbarkeit. Zu späte Webseiten, Streuverlust im Marketing und fehlendes Reporting sind die wahren Renditekiller. Wir beenden den Blindflug.
              </p>
              <button 
                onClick={() => onViewChange(ViewState.VACANCY_CALC)}
                className="inline-flex items-center gap-2 text-blue-700 font-bold border-b-2 border-blue-100 hover:border-blue-600 transition-all pb-0.5"
              >
                Wie viel kostet Ihr Leerstand wirklich? <ArrowRight size={18} />
              </button>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
               <div className="space-y-4">
                  {[
                    { title: 'Leerstandszyklen', val: 'Unnötig verlängert' },
                    { title: 'Marketingbudget', val: 'Intransparent genutzt' },
                    { title: 'Reporting', val: 'Fehlende KPIs' }
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                      <span className="font-medium text-slate-500 text-sm md:text-base">{stat.title}</span>
                      <span className="font-bold text-slate-900 flex items-center gap-2 text-sm md:text-base">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        {stat.val}
                      </span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution Grid */}
      <section>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Ihr System für maximale Geschwindigkeit</h2>
          <p className="text-slate-500 text-sm md:text-base">
            Wir ersetzen fragmentierte Einzelleistungen durch eine synchrone Engine.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0">
          <ModuleCard 
            icon={<Layout size={32} className="text-blue-500" />}
            title="Projektwebseite" 
            tag="72h Live"
            desc="SEO-ready, mobile-first und conversion-optimiert. Technisch exzellent und sofort einsatzbereit."
          />
          <ModuleCard 
            icon={<Target size={32} className="text-purple-500" />}
            title="Performance Ads" 
            tag="Intent-Based"
            desc="Google Search für akuten Bedarf, Social Media für Branding. Kein Streuverlust, nur qualifizierte Leads."
          />
          <ModuleCard 
            icon={<CheckCircle2 size={32} className="text-green-500" />}
            title="Lead Management" 
            tag="CRM-Ready"
            desc="Automatische Qualifizierung und Priorisierung. Ihr Vertrieb spricht nur mit den besten Kontakten."
          />
          <ModuleCard 
            icon={<PieChart size={32} className="text-orange-500" />}
            title="Intelligence" 
            tag="Real-Time"
            desc="Wöchentliche Reports zu Time-to-Rent und Cost-per-Lease geben Ihnen die Kontrolle zurück."
          />
        </div>
      </section>

      {/* 4. Tools Section (Cards) */}
      <section className="px-2 md:px-0">
        <div className="bg-slate-900 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-16 text-white overflow-hidden relative">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           
           <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center relative z-10">Data-Driven Differenzierung</h2>
           
           <div className="grid md:grid-cols-2 gap-6 md:gap-8 relative z-10">
             <ToolCard 
               onClick={() => onViewChange(ViewState.VACANCY_CALC)}
               icon={<TrendingDown size={40} />}
               title="Cost-of-Vacancy Rechner"
               desc="Leerstand ist kein Zustand – es ist eine präzise Kostenposition. Berechnen Sie Mietausfall und Opportunitätskosten."
               action="Kosten berechnen"
               accent="bg-red-500 hover:bg-red-600"
             />
             <ToolCard 
               onClick={() => onViewChange(ViewState.ROI_CALC)}
               icon={<BarChart3 size={40} />}
               title="ROI Rechner"
               desc="Lohnt sich das Budget? Wir modellieren Leadkosten, Konversionspfade und Amortisation vorab."
               action="ROI simulieren"
               accent="bg-blue-500 hover:bg-blue-600"
             />
           </div>
        </div>
      </section>

      {/* 5. Proof / Cases */}
      <section className="max-w-6xl mx-auto px-4 md:px-0">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="md:sticky md:top-24">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6">Erfolg ist messbar.</h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-base md:text-lg">
              Sobald digitale Sichtbarkeit auf saubere Funnel-Strukturen trifft, ändern sich die Vorzeichen: Die Nachfrage wird planbar, die Lead-Qualität steigt, der Leerstand sinkt.
            </p>
            <button onClick={onContactClick} className="flex items-center gap-2 text-slate-900 font-bold hover:gap-4 transition-all">
              Ihr Projekt evaluieren lassen <ArrowRight size={20} />
            </button>
          </div>
          <div className="grid gap-4 md:gap-6">
            <CaseCard value="22" unit="Einheiten" desc="in 6 Wochen vollvermietet trotz Preissensitivität." color="text-blue-600" />
            <CaseCard value="+40%" unit="Besichtigungen" desc="in 30 Tagen durch psychologisches Messaging." color="text-green-600" />
            <CaseCard value="-50%" unit="Cost-per-Lead" desc="durch progressive Funnel-Optimierung." color="text-purple-600" />
          </div>
        </div>
      </section>

      {/* 5.5 Quote Section */}
      <section className="max-w-5xl mx-auto px-4 md:px-0">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none"></div>

          <div className="shrink-0 relative z-10">
            <div className="w-24 h-24 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-slate-100">
               <img 
                src="https://raw.githubusercontent.com/yathur-hub/Immobilienmarketing/efd45159e1f47d103beda622c9e0f8f2de0de7ea/public/Yathur%20Portrait.png"
                alt="Yathur Nathan" 
                className="w-full h-full object-cover"
               />
            </div>
          </div>
          <div className="text-center md:text-left relative z-10">
            <blockquote className="text-lg md:text-2xl font-bold text-slate-900 leading-relaxed mb-6">
              «Erfolgreiche Vermarktung basiert auf Daten, Geschwindigkeit und Präzision. Mein Fokus: Immobilienvermarkter dabei zu unterstützen, Leerstände zu senken und Vermietungsergebnisse nachhaltig zu steigern.»
            </blockquote>
            <div className="mb-6">
              <div className="font-bold text-slate-900 text-lg">Yathur Nathan</div>
              <div className="text-blue-600 text-xs md:text-sm font-bold uppercase tracking-wider">Gründer & Inhaber</div>
            </div>
            
            <a 
              href="https://meetings-eu1.hubspot.com/yathur" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-slate-900 font-bold hover:gap-4 transition-all"
            >
              Jetzt mit Yathur sprechen <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* 6. Why Us / Funnel */}
      <section className="text-center max-w-4xl mx-auto px-4 md:px-0">
        <div className="grid sm:grid-cols-3 gap-3 md:gap-6 text-left">
           {[
             '100% Real Estate Fokus',
             'Go-Live in 72 Stunden',
             'Klare KPIs (Time-to-Rent)',
             'Schweizer Marktexpertise',
             'DSG-konformes Tracking',
             'Performance-Beratung'
           ].map((item, i) => (
             <div key={i} className="bg-white p-4 md:p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
               <div className="bg-blue-50 p-1.5 rounded-full text-blue-600 shrink-0">
                 <CheckCircle2 size={16} />
               </div>
               <span className="font-semibold text-slate-800 text-xs md:text-sm">{item}</span>
             </div>
           ))}
        </div>
      </section>

      {/* 7. Contact Form (HubSpot) */}
      <section id="contact" className="max-w-3xl mx-auto px-4 md:px-0">
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 p-6 md:p-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Projekt besprechen</h2>
            <p className="text-slate-400 text-xs md:text-sm">Erhalten Sie innerhalb von 24h eine Potenzialanalyse.</p>
          </div>
          
          <div className="p-6 md:p-12">
            <HubSpotForm />
          </div>
        </div>
      </section>

    </div>
  );
};

// --- Helper Components ---

const ModuleCard: React.FC<{ icon: React.ReactNode; title: string; tag: string; desc: string }> = ({ icon, title, tag, desc }) => (
  <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-6">
      <div className="p-2.5 md:p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform duration-300 shrink-0">
        {icon}
      </div>
      <span className="bg-slate-900 text-white text-[9px] md:text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shrink-0">{tag}</span>
    </div>
    <h3 className="text-base md:text-lg font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{desc}</p>
  </div>
);

const ToolCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; action: string; onClick: () => void; accent: string }> = ({ icon, title, desc, action, onClick, accent }) => (
  <div 
    onClick={onClick}
    className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group"
  >
    <div className="mb-4 md:mb-6 opacity-80 group-hover:opacity-100 transition-opacity shrink-0">{icon}</div>
    <h3 className="text-lg md:text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-300 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed md:h-12">{desc}</p>
    <button className={`${accent} text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all shadow-lg flex items-center gap-2 w-full md:w-auto justify-center`}>
      {action} <ChevronRight size={16} />
    </button>
  </div>
);

const CaseCard: React.FC<{ value: string; unit: string; desc: string; color: string }> = ({ value, unit, desc, color }) => (
  <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 md:gap-6 items-center hover:shadow-md transition-shadow">
    <div className="flex flex-col items-center min-w-[80px] md:min-w-[100px]">
       <span className={`text-3xl md:text-4xl font-extrabold ${color}`}>{value}</span>
       <span className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{unit}</span>
    </div>
    <p className="text-slate-600 text-xs md:text-sm font-medium leading-tight md:leading-normal">{desc}</p>
  </div>
);

export default App;
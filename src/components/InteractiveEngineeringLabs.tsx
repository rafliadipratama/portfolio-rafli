import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { StreamingLab } from './StreamingLab';
import { MarketplaceInventoryLab } from './MarketplaceInventoryLab';
import { DiscCalculator } from './DiscCalculator';
import { PixelDinoRunner } from './PixelDinoRunner';
import { InteractiveSystemArchitecture } from './InteractiveSystemArchitecture';
import { Play, ShoppingBag, Sliders, FlaskConical, Gamepad2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const InteractiveEngineeringLabs: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'architecture' | 'streaming' | 'inventory' | 'disc' | 'dino'>('architecture');

  // Sync with URL hash if user clicked direct anchors
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#system-architecture' || hash === '#architecture') {
        setActiveTab('architecture');
      } else if (hash === '#streaming-lab' || hash === '#workflow-simulator') {
        setActiveTab('streaming');
      } else if (hash === '#marketplace-lab' || hash === '#api-playground') {
        setActiveTab('inventory');
      } else if (hash === '#disc-assessment') {
        setActiveTab('disc');
      } else if (hash === '#dino-runner' || hash === '#cyber-dino' || hash === '#trex') {
        setActiveTab('dino');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const tabs = [
    {
      id: 'architecture' as const,
      hash: '#system-architecture',
      icon: Cpu,
      badge: 'SYSTEM DESIGN // REACT & GOLANG',
      title: {
        id: '1. Blueprint Arsitektur Sistem (React & Go)',
        en: '1. System Architecture Blueprint (React & Go)'
      },
      desc: {
        id: 'Diagram interaktif pipeline request dari React 18, Nginx reverse proxy, Go Goroutine microservices, hingga Redis & Database.',
        en: 'Interactive request pipeline from React 18, Nginx reverse proxy, Go microservices, to Redis & Database layer.'
      },
      accentColor: 'bg-indigo-400',
      activeBorder: 'border-indigo-500/80 text-indigo-300 bg-slate-900 shadow-md'
    },
    {
      id: 'streaming' as const,
      hash: '#streaming-lab',
      icon: Play,
      badge: 'LIVEEUY CINEMA STREAMING',
      title: {
        id: '2. Streaming Video Cerdas & Ambient Glow',
        en: '2. Smart Streaming & Ambient Glow'
      },
      desc: {
        id: 'Uji bagaimana video otomatis menyesuaikan resolusi saat sinyal naik-turun agar zero-buffering.',
        en: 'Test how video dynamically adapts resolution to fluctuating internet speeds without buffering.'
      },
      accentColor: 'bg-cyan-400',
      activeBorder: 'border-cyan-500/80 text-cyan-300 bg-slate-900 shadow-md'
    },
    {
      id: 'inventory' as const,
      hash: '#marketplace-lab',
      icon: ShoppingBag,
      badge: 'E-COMMERCE & DISTRIBUTED LOCK',
      title: {
        id: '3. Anti-Rebutan Stok Flash Sale',
        en: '3. Flash Sale Anti-Overselling Lock'
      },
      desc: {
        id: 'Uji bagaimana sistem mencegah barang habis dibeli 2 orang bersamaan di Shopee & Tokopedia.',
        en: 'Test how distributed mutex locks prevent 2 buyers from purchasing the last unit concurrently.'
      },
      accentColor: 'bg-pink-400',
      activeBorder: 'border-pink-500/80 text-pink-300 bg-slate-900 shadow-md'
    },
    {
      id: 'disc' as const,
      hash: '#disc-assessment',
      icon: Sliders,
      badge: 'TALENT FIT & PSIKOMETRI HR',
      title: {
        id: '4. Radar Gaya Kerja & Kepribadian (DISC)',
        en: '4. Workplace Style & DISC Radar'
      },
      desc: {
        id: 'Kuis interaktif pemetaan gaya komunikasi dan kecocokan peran di dalam tim kerja.',
        en: 'Interactive quiz mapping communication styles and optimal roles within engineering teams.'
      },
      accentColor: 'bg-amber-400',
      activeBorder: 'border-amber-500/80 text-amber-300 bg-slate-900 shadow-md'
    },
    {
      id: 'dino' as const,
      hash: '#dino-runner',
      icon: Gamepad2,
      badge: 'CYBER 2D PIXEL ARCADE',
      title: {
        id: '5. Cyber Dino 2D Pixel Runner',
        en: '5. Cyber Dino 2D Pixel Runner'
      },
      desc: {
        id: 'Game piksel 2D legendaris Chrome T-Rex Jump. Lompat rintangan kaktus & raih skor tertinggi!',
        en: 'Legendary 2D pixel Chrome T-Rex endless runner. Jump cacti, duck birds, and beat high score!'
      },
      accentColor: 'bg-emerald-400',
      activeBorder: 'border-emerald-500/80 text-emerald-300 bg-slate-900 shadow-md'
    }
  ];

  return (
    <section id="engineering-labs" className="py-12 bg-[#040612] border-b border-[#1c2452] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#090e28] border border-[#ffe600]/40 text-[#ffe600] font-mono text-xs mb-3 shadow-sm">
            <FlaskConical className="w-3.5 h-3.5 text-[#ffe600]" />
            <span>Simulasi & Lab Rekayasa Interaktif</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight font-sans">
            {language === 'id' ? (
              <>
                Laboratorium Rekayasa:{' '}
                <span className="text-cyan-400">
                  Uji Langsung Cara Kerja Sistem
                </span>
              </>
            ) : (
              <>
                Engineering Workbench:{' '}
                <span className="text-cyan-400">
                  Hands-On Interactive Demos
                </span>
              </>
            )}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            {language === 'id'
              ? 'Pilih salah satu simulator di bawah untuk menguji konsep teknologi nyata yang diambil langsung dari proyek GitHub saya dengan penalaran sehari-hari yang mudah dipahami siapa saja.'
              : 'Select any simulator below to test real-world systems drawn directly from my GitHub repositories, designed with intuitive concepts anyone can understand.'}
          </p>
        </div>

        {/* Arcade Workbench Tab Switcher (5 Columns on Large Displays) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? tab.activeBorder
                    : 'bg-[#080d24]/90 border-[#1c2452] hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Active indicator top bar */}
                {isActive && (
                  <div className={`absolute top-0 left-0 right-0 h-0.5 ${tab.accentColor}`} />
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider opacity-80">
                      {tab.badge}
                    </span>
                    <Icon className="w-4 h-4 shrink-0" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 font-sans mb-1">
                    {tab.title[language]}
                  </h3>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
                    {tab.desc[language]}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className={isActive ? 'text-slate-200 font-bold' : 'text-slate-500'}>
                    {isActive ? (language === 'id' ? '● Sedang Diuji' : '● Active Demo') : (language === 'id' ? 'Klik untuk Uji Coba' : 'Click to Test')}
                  </span>
                  <span className="text-xs font-bold">&rarr;</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Simulator Container with Smooth Transitions */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl bg-[#06091e] border-2 border-[#1c2452] p-5 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {activeTab === 'architecture' && <InteractiveSystemArchitecture />}
          {activeTab === 'streaming' && <StreamingLab />}
          {activeTab === 'inventory' && <MarketplaceInventoryLab />}
          {activeTab === 'disc' && <DiscCalculator />}
          {activeTab === 'dino' && <PixelDinoRunner />}
        </motion.div>

      </div>
    </section>
  );
};

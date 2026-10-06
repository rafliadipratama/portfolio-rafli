import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { StreamingLab } from './StreamingLab';
import { MarketplaceInventoryLab } from './MarketplaceInventoryLab';
import { DiscCalculator } from './DiscCalculator';
import { PixelDinoRunner } from './PixelDinoRunner';
import { Play, ShoppingBag, Sliders, FlaskConical, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const InteractiveEngineeringLabs: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'streaming' | 'inventory' | 'disc' | 'dino'>('streaming');

  // Sync with URL hash if user clicked direct anchors
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#streaming-lab' || hash === '#workflow-simulator') {
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
      id: 'streaming' as const,
      hash: '#streaming-lab',
      icon: Play,
      badge: 'LIVEEUY CINEMA STREAMING',
      title: {
        id: '1. Streaming Video Cerdas & Ambient Glow',
        en: '1. Smart Streaming & Ambient Glow'
      },
      desc: {
        id: 'Uji bagaimana video otomatis menyesuaikan resolusi saat sinyal naik-turun agar zero-buffering.',
        en: 'Test how video dynamically adapts resolution to fluctuating internet speeds without buffering.'
      },
      accentColor: 'from-[#00f0ff] to-cyan-500',
      activeBorder: 'border-[#00f0ff] text-[#00f0ff] shadow-lg shadow-[#00f0ff]/20 bg-[#061e2a]'
    },
    {
      id: 'inventory' as const,
      hash: '#marketplace-lab',
      icon: ShoppingBag,
      badge: 'E-COMMERCE & DISTRIBUTED LOCK',
      title: {
        id: '2. Anti-Rebutan Stok Flash Sale',
        en: '2. Flash Sale Anti-Overselling Lock'
      },
      desc: {
        id: 'Uji bagaimana sistem mencegah barang habis dibeli 2 orang bersamaan di Shopee & Tokopedia.',
        en: 'Test how distributed mutex locks prevent 2 buyers from purchasing the last unit concurrently.'
      },
      accentColor: 'from-[#ff007f] to-pink-500',
      activeBorder: 'border-[#ff007f] text-[#ff007f] shadow-lg shadow-[#ff007f]/20 bg-[#280a1c]'
    },
    {
      id: 'disc' as const,
      hash: '#disc-assessment',
      icon: Sliders,
      badge: 'TALENT FIT & PSIKOMETRI HR',
      title: {
        id: '3. Radar Gaya Kerja & Kepribadian (DISC)',
        en: '3. Workplace Style & DISC Radar'
      },
      desc: {
        id: 'Kuis interaktif pemetaan gaya komunikasi dan kecocokan peran di dalam tim kerja.',
        en: 'Interactive quiz mapping communication styles and optimal roles within engineering teams.'
      },
      accentColor: 'from-[#ffe600] to-amber-500',
      activeBorder: 'border-[#ffe600] text-[#ffe600] shadow-lg shadow-[#ffe600]/20 bg-[#261e06]'
    },
    {
      id: 'dino' as const,
      hash: '#dino-runner',
      icon: Gamepad2,
      badge: 'OFFLINE RETRO 2D ARCADE',
      title: {
        id: '4. Cyber Dino 2D Pixel Runner',
        en: '4. Cyber Dino 2D Pixel Runner'
      },
      desc: {
        id: 'Game piksel offline klasik seperti di Google Chrome. Lompat rintangan kaktus & raih skor tertinggi!',
        en: 'Classic offline 2D pixel endless runner like Chrome. Jump cacti, duck birds, and beat high score!'
      },
      accentColor: 'from-[#00ff9d] to-emerald-500',
      activeBorder: 'border-[#00ff9d] text-[#00ff9d] shadow-lg shadow-[#00ff9d]/20 bg-[#06241a]'
    }
  ];

  return (
    <section id="engineering-labs" className="py-12 bg-[#040612] border-b border-[#1c2452] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#090e28] border border-[#ffe600]/40 text-[#ffe600] font-mono text-xs mb-3 shadow-sm font-orbitron">
            <FlaskConical className="w-3.5 h-3.5 text-[#ffe600]" />
            <span>[ARCADE ENGINEERING LABS // REAL-WORLD DEMOS]</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight font-orbitron">
            {language === 'id' ? (
              <>
                Laboratorium Rekayasa:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ff007f] to-[#ffe600]">
                  Uji Langsung Cara Kerja Sistem
                </span>
              </>
            ) : (
              <>
                Engineering Workbench:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ff007f] to-[#ffe600]">
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

        {/* Arcade Workbench Tab Switcher (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.location.hash = tab.hash;
                }}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? tab.activeBorder
                    : 'bg-[#080d24]/90 border-[#1c2452] hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Active indicator top bar */}
                {isActive && (
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.accentColor}`} />
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider opacity-80 font-orbitron">
                      {tab.badge}
                    </span>
                    <Icon className="w-4 h-4 shrink-0" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 font-orbitron mb-1">
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
          {activeTab === 'streaming' && <StreamingLab />}
          {activeTab === 'inventory' && <MarketplaceInventoryLab />}
          {activeTab === 'disc' && <DiscCalculator />}
          {activeTab === 'dino' && <PixelDinoRunner />}
        </motion.div>

      </div>
    </section>
  );
};

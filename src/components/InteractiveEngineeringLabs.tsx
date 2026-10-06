import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { WorkflowSimulator } from './WorkflowSimulator';
import { DiscCalculator } from './DiscCalculator';
import { ApiPlayground } from './ApiPlayground';
import { ShieldCheck, Sliders, Database, FlaskConical, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const InteractiveEngineeringLabs: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'workflow' | 'disc' | 'api'>('workflow');

  // Sync with URL hash if user clicked direct anchors like #workflow-simulator
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#workflow-simulator') {
        setActiveTab('workflow');
      } else if (hash === '#disc-assessment') {
        setActiveTab('disc');
      } else if (hash === '#api-playground') {
        setActiveTab('api');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const tabs = [
    {
      id: 'workflow' as const,
      hash: '#workflow-simulator',
      icon: ShieldCheck,
      badge: 'CPOB / GMP COMPLIANCE',
      title: {
        id: '1. Simulasi Alur Dokumen CPOB',
        en: '1. GMP Batch Release Simulator'
      },
      desc: {
        id: 'Uji langsung alur approval 4-tier berantai SHA-256 dan pessimistic locking.',
        en: 'Test multi-tier approval state machines, hash chaining, and concurrency locks.'
      },
      accentColor: 'from-[#00ff9d] to-emerald-500',
      activeBorder: 'border-[#00ff9d] text-[#00ff9d] shadow-lg shadow-[#00ff9d]/20 bg-[#06241a]'
    },
    {
      id: 'disc' as const,
      hash: '#disc-assessment',
      icon: Sliders,
      badge: 'HR PSYCHOMETRIC ENGINE',
      title: {
        id: '2. Kalkulator Profil Tes DISC',
        en: '2. DISC Psychometric Engine'
      },
      desc: {
        id: 'Simulasi algoritma kalkulasi skor kepribadian dan radar kuadran kandidat ATS.',
        en: 'Simulate automated candidate psychometric scoring and team synergy quadrant.'
      },
      accentColor: 'from-[#ffe600] to-amber-500',
      activeBorder: 'border-[#ffe600] text-[#ffe600] shadow-lg shadow-[#ffe600]/20 bg-[#261e06]'
    },
    {
      id: 'api' as const,
      hash: '#api-playground',
      icon: Database,
      badge: 'RESTful API & DATABASE',
      title: {
        id: '3. Mock REST API & Schema Viewer',
        en: '3. Mock REST API & Schema Viewer'
      },
      desc: {
        id: 'Playground HTTP real-time untuk menguji request GET/POST dan visualisasi relasi ERD.',
        en: 'Live HTTP request playground with interactive relational database schema viewer.'
      },
      accentColor: 'from-[#00f0ff] to-cyan-500',
      activeBorder: 'border-[#00f0ff] text-[#00f0ff] shadow-lg shadow-[#00f0ff]/20 bg-[#061e2a]'
    }
  ];

  return (
    <section id="engineering-labs" className="py-16 bg-[#040612] border-b border-[#1c2452] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#090e28] border border-[#ffe600]/40 text-[#ffe600] font-mono text-xs mb-3 shadow-sm font-orbitron">
            <FlaskConical className="w-3.5 h-3.5 text-[#ffe600]" />
            <span>[ARCADE ENGINEERING LABS // HANDS-ON DEMOS]</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight font-orbitron">
            {language === 'id' ? (
              <>
                Laboratorium Rekayasa:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ff007f] to-[#ffe600]">
                  Uji Langsung Sistem Nyata
                </span>
              </>
            ) : (
              <>
                Interactive Engineering Labs:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ff007f] to-[#ffe600]">
                  Live In-Browser Simulators
                </span>
              </>
            )}
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
            {language === 'id'
              ? 'Bukan sekadar portofolio statis. Anda dapat langsung menguji coba logika bisnis, algoritma psikometri, dan rancangan API yang saya kembangkan melalui 3 modul lab interaktif di bawah ini:'
              : 'Beyond static screenshots. Experience live business rules, psychometric calculation engines, and database schemas directly through the unified interactive labs suite below:'}
          </p>
        </div>

        {/* Tab Selection Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10 p-2 rounded-2xl bg-[#070b20] border border-[#1c2452] shadow-xl">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.history.replaceState(null, '', tab.hash);
                }}
                className={`p-4 rounded-xl text-left transition-all relative flex flex-col justify-between border ${
                  isCurrent
                    ? tab.activeBorder
                    : 'border-transparent hover:border-[#1c2452] hover:bg-[#090f2c] text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider opacity-80 font-orbitron">
                      {tab.badge}
                    </span>
                    <Icon className={`w-4 h-4 ${isCurrent ? 'scale-110' : 'opacity-60'} transition-transform`} />
                  </div>
                  <h3 className={`text-sm font-bold font-orbitron mb-1 ${isCurrent ? 'text-slate-100' : 'text-slate-300'}`}>
                    {tab.title[language]}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2 font-sans">
                    {tab.desc[language]}
                  </p>
                </div>

                {isCurrent && (
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                    <Sparkles className="w-3 h-3 text-[#ffe600]" />
                    <span>Active Simulation</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Lab Module Container */}
        <div className="rounded-2xl border border-[#1c2452] bg-[#070a1a] shadow-2xl overflow-hidden">
          {activeTab === 'workflow' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <WorkflowSimulator />
            </motion.div>
          )}

          {activeTab === 'disc' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DiscCalculator />
            </motion.div>
          )}

          {activeTab === 'api' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ApiPlayground />
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};

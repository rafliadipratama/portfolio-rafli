import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Layers, Briefcase, FlaskConical, Cpu, ArrowRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

type DirectoryTarget = 'projects' | 'experience' | 'labs' | 'skills';

interface PortfolioDirectoryProps {
  onNavigate?: (pageId: DirectoryTarget) => void;
}

export const PortfolioDirectory: React.FC<PortfolioDirectoryProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const directories: {
    id: string;
    targetPage: DirectoryTarget;
    badge: string;
    badgeColor: string;
    title: { id: string; en: string };
    desc: { id: string; en: string };
    icon: React.ComponentType<{ className?: string }>;
    highlight: string;
  }[] = [
    {
      id: 'projects',
      targetPage: 'projects',
      badge: '01 // SYSTEMS',
      badgeColor: 'border-[#00f0ff]/50 text-[#00f0ff] bg-cyan-950/40',
      title: {
        id: 'Sistem & Aplikasi Produksi',
        en: 'Production Systems & Apps'
      },
      desc: {
        id: 'Platform streaming LiveEuy (HLS + Ambient Glow), e-Doc CPOB Farmasi, ATS Rekrutmen SDM, dan aplikasi web performa tinggi.',
        en: 'LiveEuy Cinema streaming platform (HLS + Ambient Glow), Pharma CPOB compliance, ATS Recruitment, and high-performance apps.'
      },
      icon: Layers,
      highlight: 'LiveEuy • CPOB • ATS'
    },
    {
      id: 'experience',
      targetPage: 'experience',
      badge: '02 // CAREER',
      badgeColor: 'border-[#00ff9d]/50 text-[#00ff9d] bg-emerald-950/40',
      title: {
        id: 'Rekam Jejak Industri',
        en: 'Industrial Track Record'
      },
      desc: {
        id: 'Perjalanan karier di PT Padepokan 79 (Software Engineer Intern - MagangHub), PT Solas Langgeng Sejahtera, dan PT Pindad.',
        en: 'Engineering quests spanning PT Padepokan 79 (MagangHub Intern), PT Solas Langgeng Sejahtera, and PT Pindad.'
      },
      icon: Briefcase,
      highlight: 'PT Padepokan 79 • PT Solas • PT Pindad'
    },
    {
      id: 'labs',
      targetPage: 'labs',
      badge: '03 // LIVE LABS',
      badgeColor: 'border-[#ffe600]/50 text-[#ffe600] bg-amber-950/40',
      title: {
        id: 'Laboratorium Rekayasa Interaktif',
        en: 'Interactive Engineering Labs'
      },
      desc: {
        id: 'Tiga simulasi interaktif yang bisa langsung Anda uji coba: Simulator Alur CPOB Farmasi, Kalkulator Tes DISC, dan Mock REST API Tester.',
        en: 'Three hands-on interactive engineering simulators: GMP Pharma Batch Release, DISC Psychometrics, and Mock REST API Playground.'
      },
      icon: FlaskConical,
      highlight: 'CPOB Sim • DISC Engine • REST API'
    },
    {
      id: 'skills',
      targetPage: 'skills',
      badge: '04 // TECH & AI',
      badgeColor: 'border-[#ff007f]/50 text-[#ff007f] bg-pink-950/40',
      title: {
        id: 'Matriks Keahlian & AI Agent',
        en: 'Tech Matrix & AI Agent'
      },
      desc: {
        id: 'Keahlian fullstack (Laravel, React, TS), Antigravity CLI statuslines, dan Odysseus AI Agent berbasis model offline GGUF.',
        en: 'Fullstack competencies (Laravel, React, TS), Antigravity CLI HUDs, and the Odysseus AI Agent running on offline GGUF.'
      },
      icon: Cpu,
      highlight: 'Fullstack • CLI Statusline • Odysseus AI'
    }
  ];

  return (
    <section className="py-10 bg-[#050714] border-b border-[#1c2452] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Header Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#090e28] border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-xs mb-2 shadow-sm font-orbitron">
              <Compass className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>[SYSTEM ARCHITECTURE // DIRECTORY MAP]</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight font-orbitron">
              {language === 'id' ? (
                <>
                  Peta Navigasi Portofolio: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ff007f] to-[#ffe600]">Pilih Halaman Yang Ingin Anda Buka</span>
                </>
              ) : (
                <>
                  Portfolio Roadmap: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ff007f] to-[#ffe600]">Select A Page To Explore</span>
                </>
              )}
            </h2>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-400 font-mono max-w-md">
            {language === 'id'
              ? 'Klik salah satu pilar di bawah untuk langsung membuka halaman khusus tanpa perlu scroll panjang.'
              : 'Click any pillar below to navigate directly to its dedicated page without tedious scrolling.'}
          </p>
        </div>

        {/* 4 Pillars Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {directories.map((dir, idx) => {
            const Icon = dir.icon;

            return (
              <motion.button
                key={dir.id}
                onClick={() => onNavigate?.(dir.targetPage)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group p-5 rounded-2xl bg-[#080d24] border border-[#1c2452] hover:border-[#00f0ff]/60 transition-all flex flex-col justify-between shadow-lg hover:shadow-xl hover:shadow-[#00f0ff]/10 relative overflow-hidden text-left cursor-pointer"
              >
                {/* Subtle top glow highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent group-hover:via-[#00f0ff] transition-all" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${dir.badgeColor} font-orbitron`}>
                      {dir.badge}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-[#091238] border border-[#1c2452] flex items-center justify-center text-[#00f0ff] group-hover:border-[#00f0ff] transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-[#00f0ff] transition-colors font-orbitron mb-1.5 flex items-center gap-1.5">
                    <span>{dir.title[language]}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#00f0ff]" />
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                    {dir.desc[language]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1c2452] flex items-center justify-between text-[11px] font-mono text-slate-400 w-full">
                  <span className="text-[10px] text-cyan-300 font-semibold">{dir.highlight}</span>
                  <span className="text-slate-500 group-hover:text-[#00f0ff] transition-colors flex items-center gap-1 font-bold">
                    <span>{language === 'id' ? 'Buka Halaman' : 'Open Page'}</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

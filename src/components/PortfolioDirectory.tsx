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

  const directories = [
    {
      id: 'projects',
      targetPage: 'projects' as DirectoryTarget,
      badge: '01. PROYEK',
      badgeColor: 'border-cyan-500/50 text-cyan-300 bg-cyan-950/50',
      accentBar: 'bg-cyan-400',
      iconBox: 'bg-cyan-950/80 border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-900/50',
      glow: 'bg-cyan-500/10',
      hoverBorder: 'hover:border-cyan-500/60 hover:shadow-cyan-500/10',
      titleHover: 'group-hover:text-cyan-300',
      arrowColor: 'text-cyan-400',
      highlightColor: 'text-cyan-300',
      actionHover: 'group-hover:text-cyan-400',
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
      targetPage: 'experience' as DirectoryTarget,
      badge: '02. KARIER',
      badgeColor: 'border-emerald-500/50 text-emerald-300 bg-emerald-950/50',
      accentBar: 'bg-emerald-400',
      iconBox: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400 group-hover:border-emerald-400 group-hover:bg-emerald-900/50',
      glow: 'bg-emerald-500/10',
      hoverBorder: 'hover:border-emerald-500/60 hover:shadow-emerald-500/10',
      titleHover: 'group-hover:text-emerald-300',
      arrowColor: 'text-emerald-400',
      highlightColor: 'text-emerald-300',
      actionHover: 'group-hover:text-emerald-400',
      title: {
        id: 'Rekam Jejak Industri',
        en: 'Industrial Track Record'
      },
      desc: {
        id: 'Perjalanan karier di PT Padepokan 79 (Software Engineer Intern - MagangHub), PT Solas Langgeng Sejahtera, dan PT Pindad.',
        en: 'Professional engineering track record at PT Padepokan 79 (MagangHub Intern), PT Solas Langgeng Sejahtera, and PT Pindad.'
      },
      icon: Briefcase,
      highlight: 'PT Padepokan 79 • PT Solas • PT Pindad'
    },
    {
      id: 'labs',
      targetPage: 'labs' as DirectoryTarget,
      badge: '03. LAB REKAYASA',
      badgeColor: 'border-amber-500/50 text-amber-300 bg-amber-950/50',
      accentBar: 'bg-amber-400',
      iconBox: 'bg-amber-950/80 border-amber-500/40 text-amber-400 group-hover:border-amber-400 group-hover:bg-amber-900/50',
      glow: 'bg-amber-500/10',
      hoverBorder: 'hover:border-amber-500/60 hover:shadow-amber-500/10',
      titleHover: 'group-hover:text-amber-300',
      arrowColor: 'text-amber-400',
      highlightColor: 'text-amber-300',
      actionHover: 'group-hover:text-amber-400',
      title: {
        id: 'Laboratorium Rekayasa Interaktif',
        en: 'Interactive Engineering Labs'
      },
      desc: {
        id: 'Simulasi interaktif langsung: Blueprint Arsitektur Sistem (React & Go), Video Streaming Cerdas (LiveEuy), Anti-Rebutan Stok Flash Sale, Kuis DISC, & Cyber Dino Runner.',
        en: 'Hands-on interactive simulators: System Architecture Blueprint (React & Go), Smart Video Streaming (LiveEuy), Flash Sale Mutex Lock, DISC Radar, & Cyber Dino Runner.'
      },
      icon: FlaskConical,
      highlight: 'Arsitektur React & Go • Streaming • Mutex'
    },
    {
      id: 'skills',
      targetPage: 'skills' as DirectoryTarget,
      badge: '04. KEAHLIAN & STACK',
      badgeColor: 'border-pink-500/50 text-pink-300 bg-pink-950/50',
      accentBar: 'bg-pink-400',
      iconBox: 'bg-pink-950/80 border-pink-500/40 text-pink-400 group-hover:border-pink-400 group-hover:bg-pink-900/50',
      glow: 'bg-pink-500/10',
      hoverBorder: 'hover:border-pink-500/60 hover:shadow-pink-500/10',
      titleHover: 'group-hover:text-pink-300',
      arrowColor: 'text-pink-400',
      highlightColor: 'text-pink-300',
      actionHover: 'group-hover:text-pink-400',
      title: {
        id: 'Matriks Keahlian & Teknologi',
        en: 'Technical Competencies & Stack'
      },
      desc: {
        id: 'Keahlian fullstack (React, Go / Golang, Laravel, TypeScript), arsitektur modular, microservices, dan rekayasa web skala produksi.',
        en: 'Fullstack competencies (React, Go / Golang, Laravel, TypeScript), modular architecture, microservices, and production web systems.'
      },
      icon: Cpu,
      highlight: 'React • Go (Golang) • Laravel • TypeScript'
    }
  ];

  return (
    <section className="py-10 bg-[#050714] border-b border-[#1c2452] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Header Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#090e28] border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-xs mb-2 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>Direktori Navigasi Utama</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight font-sans">
              {language === 'id' ? (
                <>
                  Peta Navigasi Portofolio: <span className="text-cyan-400">Pilih Halaman Yang Ingin Anda Buka</span>
                </>
              ) : (
                <>
                  Portfolio Roadmap: <span className="text-cyan-400">Select A Page To Explore</span>
                </>
              )}
            </h2>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-md">
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
                whileHover={{ y: -3 }}
                className={`group p-5 rounded-2xl bg-[#080d24]/90 border border-[#1c2452] ${dir.hoverBorder} hover:bg-[#0c1232] transition-all flex flex-col justify-between shadow-sm relative overflow-hidden text-left cursor-pointer`}
              >
                {/* Accent Top Indicator Bar */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${dir.accentBar}`} />

                {/* Subtle Ambient Radial Glow */}
                <div className={`absolute top-0 right-0 w-28 h-28 ${dir.glow} rounded-full blur-xl pointer-events-none`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${dir.badgeColor}`}>
                      {dir.badge}
                    </span>
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${dir.iconBox}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className={`text-sm font-bold text-slate-100 ${dir.titleHover} transition-colors font-sans mb-1.5 flex items-center gap-1.5`}>
                    <span>{dir.title[language]}</span>
                    <ArrowRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${dir.arrowColor}`} />
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                    {dir.desc[language]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1c2452] flex items-center justify-between text-[11px] font-mono text-slate-400 w-full relative z-10">
                  <span className={`text-[10px] ${dir.highlightColor} font-semibold`}>{dir.highlight}</span>
                  <span className={`text-slate-500 ${dir.actionHover} transition-colors flex items-center gap-1 font-bold`}>
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

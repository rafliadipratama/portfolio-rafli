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
      badge: '01. PROYEK',
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
      badge: '02. KARIER',
      badgeColor: 'border-[#00ff9d]/50 text-[#00ff9d] bg-emerald-950/40',
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
      targetPage: 'labs',
      badge: '03. LAB REKAYASA',
      badgeColor: 'border-[#ffe600]/50 text-[#ffe600] bg-amber-950/40',
      title: {
        id: 'Laboratorium Rekayasa Interaktif',
        en: 'Interactive Engineering Labs'
      },
      desc: {
        id: 'Tiga simulasi interaktif yang mudah dipahami siapa saja: Video Streaming Cerdas (LiveEuy), Anti-Rebutan Stok Flash Sale, dan Kuis Gaya Kerja Tim (DISC).',
        en: 'Three intuitive real-world simulators: Smart Video Streaming (LiveEuy), Flash Sale Anti-Overselling, and Workplace DISC Talent Quiz.'
      },
      icon: FlaskConical,
      highlight: 'LiveEuy Stream • Flash Sale Mutex • Kuis DISC'
    },
    {
      id: 'skills',
      targetPage: 'skills',
      badge: '04. KEAHLIAN & STACK',
      badgeColor: 'border-[#ff007f]/50 text-[#ff007f] bg-pink-950/40',
      title: {
        id: 'Matriks Keahlian & Teknologi',
        en: 'Technical Competencies & Stack'
      },
      desc: {
        id: 'Keahlian fullstack (TypeScript, React, Laravel), arsitektur modular, integrasi tool modern, dan rekayasa web skala produksi.',
        en: 'Fullstack competencies (TypeScript, React, Laravel), modular architecture, modern developer tools, and production web systems.'
      },
      icon: Cpu,
      highlight: 'TypeScript • React • Laravel'
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
                className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 transition-all flex flex-col justify-between shadow-sm relative overflow-hidden text-left cursor-pointer"
              >

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${dir.badgeColor}`}>
                      {dir.badge}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-[#091238] border border-[#1c2452] flex items-center justify-center text-[#00f0ff] group-hover:border-[#00f0ff] transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-[#00f0ff] transition-colors font-sans mb-1.5 flex items-center gap-1.5">
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

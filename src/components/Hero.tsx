import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Terminal, ArrowRight, ShieldCheck, Database, Layers, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const { language } = useLanguage();

  const titles = [
    language === 'id' ? 'Fullstack Web Engineer' : 'Fullstack Web Engineer',
    language === 'id' ? 'Arsitek Sistem e-Document Farmasi' : 'Pharma e-Document Architect',
    language === 'id' ? 'Spesialis Laravel 12 & React TS' : 'Laravel 12 & React TS Specialist',
    language === 'id' ? 'Spatie RBAC & Integrasi API' : 'Spatie RBAC & API Integrations'
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex % titles.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex(prev => prev + 1);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(prev =>
          isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)
        );
      }, isDeleting ? 30 : 65);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex, titles]);

  return (
    <section id="overview" className="relative py-12 md:py-20 flex items-center bg-grid-pattern overflow-hidden border-b border-slate-800/80">
      {/* Dynamic ambient glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-10 w-[450px] h-[350px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Animated Technical Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Status Chip */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300 w-fit mb-5 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>PT. Solas Langgeng Sejahtera</span>
              <span className="text-slate-500">•</span>
              <span className="text-sky-400 font-semibold">Fullstack Developer</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.12]"
            >
              {language === 'id' ? (
                <>
                  Rekayasa Sistem Web <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400">
                    Enterprise & Regulasi Farmasi
                  </span>
                </>
              ) : (
                <>
                  Engineering Enterprise <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400">
                    Web Systems & Regulated APIs
                  </span>
                </>
              )}
            </motion.h1>

            {/* Typewriter Dynamic Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 flex items-center gap-2 h-8 font-mono text-base sm:text-lg text-sky-400 font-bold"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{displayText}</span>
              <span className="inline-block w-2 h-5 bg-sky-400 animate-pulse" />
            </motion.div>

            {/* Authentic subhead without AI slop */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed"
            >
              {PERSONAL_INFO.headline[language]}
            </motion.p>

            {/* Quick architectural spec tags */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex flex-wrap gap-2 text-xs font-mono"
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300 hover:border-emerald-500/50 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                CPOB/GMP Compliance
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300 hover:border-sky-500/50 transition-colors">
                <Database className="w-3.5 h-3.5 text-sky-400" />
                Laravel 12 & MySQL
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300 hover:border-indigo-500/50 transition-colors">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                React / TS & Alpine.js
              </span>
            </motion.div>

            {/* Actions with Spring Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#workflow-simulator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-sky-500/20"
              >
                <span>{language === 'id' ? 'Uji Simulator CPOB' : 'Test GMP Simulator'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all"
              >
                <span>{language === 'id' ? 'Lihat 9+ Proyek' : 'View 9+ Systems'}</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-800 bg-[#0b101e] hover:bg-slate-800 text-sky-400 hover:text-sky-300 text-sm font-mono transition-colors shadow-sm"
                title="Open interactive terminal"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>$ ./terminal.sh</span>
              </motion.button>
            </motion.div>

            {/* Grounded Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">
                    {stat.label[language]}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right Column: Floating Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-md"
            >
              {/* Card Container */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/90 border border-slate-700/70 p-3 shadow-2xl backdrop-blur-xl">
                
                {/* Photo frame */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-[#070a12] aspect-[4/5] flex items-end justify-center">
                  <img
                    src={PERSONAL_INFO.avatarNoBg}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-contain object-bottom filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Corner system badge */}
                  <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>verified_engineer.ts</span>
                  </div>

                  {/* Bottom overlay card */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-lg p-3 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-bold text-slate-100">{PERSONAL_INFO.name}</h2>
                        <p className="text-xs text-sky-400 font-mono">S1 Teknik Informatika (3.41)</p>
                      </div>
                      <div className="flex items-center gap-1 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400 font-mono font-bold">BNSP</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-card: Currently Active System */}
                <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-slate-300 font-semibold">e-Document CPOB System</p>
                      <p className="text-[10px] text-slate-400 font-mono">6-Tier RBAC • Digital Signatures</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 font-bold">
                    IN PROD
                  </span>
                </div>

              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

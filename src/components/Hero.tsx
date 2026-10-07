import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, ShieldCheck, Database, Layers, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate?: (pageId: 'projects' | 'labs' | 'contact') => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const titles = [
    language === 'id' ? 'Fullstack Web & AI Systems Engineer' : 'Fullstack Web & AI Systems Engineer',
    language === 'id' ? 'Software Engineer Intern @ PT Padepokan 79' : 'Software Engineer Intern @ PT Padepokan 79',
    language === 'id' ? 'Creator Platform Streaming LiveEuy' : 'Creator of LiveEuy Cinema Platform',
    language === 'id' ? 'Arsitek Sistem e-Document CPOB Farmasi' : 'Pharma e-Document Architect (CPOB)'
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
    <section id="overview" className="relative py-12 md:py-20 flex items-center bg-grid-pattern overflow-hidden border-b border-[#1c2452] bg-[#050713]">
      {/* Dynamic ambient cyber neon glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00f0ff]/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-10 w-[500px] h-[400px] bg-[#ff007f]/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Animated Technical Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Professional Role & Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-slate-300 w-fit mb-5 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-cyan-300">Software Engineer Intern</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">PT. Padepokan 79 (MagangHub)</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.14]"
            >
              {language === 'id' ? (
                <>
                  Rekayasa Sistem Web <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                    Enterprise, Streaming & AI
                  </span>
                </>
              ) : (
                <>
                  Engineering Enterprise <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                    Systems, Streaming & AI
                  </span>
                </>
              )}
            </motion.h1>

            {/* Typewriter Dynamic Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 flex items-center gap-2 h-8 font-mono text-base sm:text-lg text-[#00f0ff] font-bold"
            >
              <Sparkles className="w-4 h-4 text-[#ffe600] animate-spin" style={{ animationDuration: '6s' }} />
              <span>{displayText}</span>
              <span className="inline-block w-2 h-5 bg-[#00f0ff] animate-pulse" />
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
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#090e28] border border-[#00f0ff]/40 text-cyan-200 hover:border-[#00f0ff] transition-colors shadow-sm shadow-[#00f0ff]/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff]" />
                PT Padepokan 79 (MagangHub)
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#090e28] border border-[#ff007f]/40 text-pink-200 hover:border-[#ff007f] transition-colors shadow-sm shadow-[#ff007f]/10">
                <Database className="w-3.5 h-3.5 text-[#ff007f]" />
                LiveEuy Cinema VOD Engine
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#090e28] border border-[#ffe600]/40 text-amber-200 hover:border-[#ffe600] transition-colors shadow-sm shadow-[#ffe600]/10">
                <Layers className="w-3.5 h-3.5 text-[#ffe600]" />
                Antigravity Agentic Workflows
              </span>
            </motion.div>

            {/* Actions with Spring Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate ? onNavigate('projects') : (window.location.hash = '#/projects')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <span>{language === 'id' ? 'Jelajahi Proyek' : 'Explore Projects'}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate ? onNavigate('labs') : (window.location.hash = '#/labs')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium text-sm transition-all cursor-pointer shadow-sm"
              >
                <span>{language === 'id' ? 'Uji Coba Simulator' : 'Test Interactive Labs'}</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={PERSONAL_INFO.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-sm transition-colors cursor-pointer shadow-sm"
                title="Unduh CV Mohamad Rafli Adipratama"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="font-sans text-xs font-semibold">{language === 'id' ? 'Unduh CV' : 'Download CV'}</span>
              </motion.a>
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
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-100">
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
              {/* Card Container with Cyberpunk Glow */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#0e1438]/80 to-[#070a1c]/95 border border-[#00f0ff]/40 p-3 shadow-2xl shadow-[#00f0ff]/15 backdrop-blur-xl">
                
                {/* Photo frame */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[#090d26] to-[#050713] aspect-[4/5] flex items-end justify-center border border-[#1c2452]">
                  <img
                    src={PERSONAL_INFO.avatarNoBg}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-contain object-bottom filter drop-shadow-[0_15px_30px_rgba(0,240,255,0.25)] hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050713] via-transparent to-transparent opacity-85 pointer-events-none" />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 px-2.5 py-1 rounded-full text-[11px] text-cyan-300 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="font-medium">Software Engineer</span>
                  </div>

                  {/* Bottom overlay card */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-3 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-bold text-slate-100">{PERSONAL_INFO.name}</h2>
                        <p className="text-xs text-cyan-400 font-mono">S1 Teknik Informatika (IPK 3.41)</p>
                      </div>
                      <div className="flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] text-emerald-300 font-mono font-bold">BNSP</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-card: Currently Active System */}
                <div className="mt-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-slate-200 font-semibold text-[11px]">LiveEuy & e-Doc CPOB</p>
                      <p className="text-[10px] text-slate-400 font-mono">HLS Cinema • 6-Tier RBAC</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-semibold">
                    AKTIF
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

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
            
            {/* Arcade Level / Stage Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#090e28] border border-[#00f0ff]/50 text-xs font-mono text-[#00f0ff] w-fit mb-5 shadow-sm shadow-[#00f0ff]/20"
            >
              <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-ping"></span>
              <span className="font-orbitron font-bold">[STAGE: PT PADEPOKAN 79]</span>
              <span className="text-slate-600">•</span>
              <span className="text-[#ffe600] font-semibold">MagangHub Intern</span>
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
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ff007f] to-[#ffe600]">
                    Enterprise, Streaming & AI
                  </span>
                </>
              ) : (
                <>
                  Engineering Enterprise <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ff007f] to-[#ffe600]">
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
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#00c8ff] hover:brightness-110 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-[#00f0ff]/25 font-orbitron tracking-wider"
              >
                <span>{language === 'id' ? 'Jelajahi Proyek' : 'Explore Systems'}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#workflow-simulator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#ff007f]/50 bg-[#140b24] hover:bg-[#1f1038] text-pink-300 font-semibold text-sm transition-all shadow-sm shadow-[#ff007f]/20 font-orbitron"
              >
                <span>{language === 'id' ? 'Uji Simulator CPOB' : 'Test GMP Simulator'}</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-[#00f0ff]/40 bg-[#090e28] hover:bg-[#121c4e] text-[#00f0ff] hover:text-white text-sm font-mono transition-colors shadow-sm font-orbitron"
                title="Open interactive terminal"
              >
                <Terminal className="w-4 h-4 text-[#00ff9d]" />
                <span>$ agy-cli</span>
              </motion.button>
            </motion.div>

            {/* Grounded Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 pt-6 border-t border-[#1c2452] grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#00f0ff] font-orbitron">
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

                  {/* Corner arcade badge */}
                  <div className="absolute top-3 left-3 bg-[#06091e]/90 backdrop-blur-md border border-[#00f0ff]/50 px-2.5 py-1 rounded text-[11px] font-mono text-[#00f0ff] flex items-center gap-1.5 shadow-sm font-orbitron">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-ping"></span>
                    <span>LVL.99_ENGINEER</span>
                  </div>

                  {/* Bottom overlay card */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#0a0f2c]/95 backdrop-blur-md border border-[#00f0ff]/40 rounded-lg p-3 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-bold text-slate-100 font-orbitron">{PERSONAL_INFO.name}</h2>
                        <p className="text-xs text-[#00f0ff] font-mono">S1 Teknik Informatika (IPK 3.41)</p>
                      </div>
                      <div className="flex items-center gap-1 bg-[#06241a] px-2 py-0.5 rounded border border-[#00ff9d]/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff9d]" />
                        <span className="text-[10px] text-[#00ff9d] font-mono font-bold font-orbitron">BNSP</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-card: Currently Active System */}
                <div className="mt-3 p-3 rounded-xl bg-[#080c24] border border-[#1c2452] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-[#00f0ff]/50 flex items-center justify-center text-[#00f0ff]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-slate-200 font-semibold font-orbitron text-[11px]">LiveEuy & e-Doc CPOB</p>
                      <p className="text-[10px] text-slate-400 font-mono">HLS Cinema • 6-Tier RBAC</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#06241a] text-[#00ff9d] border border-[#00ff9d]/50 font-bold font-orbitron">
                    ACTIVE
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

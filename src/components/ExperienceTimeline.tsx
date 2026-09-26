import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ExperienceTimeline: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="experience" className="py-20 bg-[#090d18] border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-950/60 border border-sky-800/60 text-sky-400 font-mono text-xs mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Industrial Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
            {language === 'id' ? 'Pengalaman Kerja Industri' : 'Professional Engineering Experience'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            {language === 'id'
              ? 'Rekam jejak teknis langsung dalam merancang sistem web enterprise manufaktur farmasi, industri manufaktur pertahanan, dan manajemen server.'
              : 'Direct track record engineering enterprise web systems across pharmaceutical manufacturing, defense industries, and server infrastructure.'}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-10 group"
            >
              
              {/* Timeline Node Icon */}
              <div
                className={`absolute -left-3.5 top-1.5 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                  exp.current
                    ? 'bg-emerald-950 border-emerald-400 text-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 border-slate-700 text-slate-400 group-hover:border-sky-500 group-hover:text-sky-400'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
              </div>

              {/* Experience Card */}
              <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800/90 hover:border-slate-700 transition-all shadow-lg">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                        {exp.company}
                      </h3>
                      {exp.current && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-700/60">
                          {language === 'id' ? 'Aktif' : 'Current'}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                        {exp.type[language]}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-sky-400 mt-0.5 font-mono">
                      {exp.position[language]}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-1 text-xs font-mono text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {exp.summary[language]}
                </p>

                {/* Projects Detail Blocks */}
                {exp.projects.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-800/80">
                    {exp.projects.map((proj, pIdx) => (
                      <div key={pIdx} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/60">
                        <h4 className="text-xs font-mono font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                          {proj.name}
                        </h4>
                        <ul className="space-y-1.5">
                          {proj.highlights[language].map((hl, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed font-sans">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80 flex-shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {exp.stack.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

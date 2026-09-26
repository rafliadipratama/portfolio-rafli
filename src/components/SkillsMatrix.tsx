import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Cpu, Terminal, Database, Layout, GitBranch, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const SkillsMatrix: React.FC = () => {
  const { language } = useLanguage();

  const getCategoryDetails = (index: number) => {
    switch (index) {
      case 0:
        return {
          icon: <Database className="w-4 h-4 text-emerald-400" />,
          titleColor: 'text-emerald-300',
          borderColor: 'border-emerald-500/20',
          hoverBorder: 'hover:border-emerald-500/40 hover:shadow-emerald-500/10'
        };
      case 1:
        return {
          icon: <Layout className="w-4 h-4 text-cyan-400" />,
          titleColor: 'text-cyan-300',
          borderColor: 'border-cyan-500/20',
          hoverBorder: 'hover:border-cyan-500/40 hover:shadow-cyan-500/10'
        };
      case 2:
        return {
          icon: <GitBranch className="w-4 h-4 text-purple-400" />,
          titleColor: 'text-purple-300',
          borderColor: 'border-purple-500/20',
          hoverBorder: 'hover:border-purple-500/40 hover:shadow-purple-500/10'
        };
      default:
        return {
          icon: <Cpu className="w-4 h-4 text-indigo-400" />,
          titleColor: 'text-indigo-300',
          borderColor: 'border-indigo-500/20',
          hoverBorder: 'hover:border-indigo-500/40'
        };
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#070a12] border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-700/50 text-indigo-300 font-mono text-xs mb-3 shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
            {language === 'id' ? (
              <>
                Matriks Kompetensi &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400">
                  Stack Teknologi
                </span>
              </>
            ) : (
              <>
                Engineering Skills &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400">
                  Tech Matrix
                </span>
              </>
            )}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            {language === 'id'
              ? 'Keahlian teknis mendalam bukan sekadar daftar logo, melainkan penerapan arsitektur nyata pada skala produksi enterprise.'
              : 'Grounded technical competence across backend architectures, responsive client systems, and deployment infrastructure.'}
          </p>
        </motion.div>

        {/* Matrix Categories */}
        <div className="space-y-12">
          {SKILL_CATEGORIES.map((categoryGroup, catIdx) => {
            const meta = getCategoryDetails(catIdx);

            return (
              <div key={catIdx} className="space-y-4">
                
                {/* Category Title */}
                <div className={`flex items-center gap-2.5 pb-2 border-b ${meta.borderColor}`}>
                  <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800 shadow-sm">
                    {meta.icon}
                  </div>
                  <h3 className={`text-base font-bold font-mono ${meta.titleColor}`}>
                    {categoryGroup.category[language]}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryGroup.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: sIdx * 0.04 }}
                      whileHover={{ y: -3, scale: 1.01 }}
                      className={`p-5 rounded-2xl bg-[#0b101e] border border-slate-800/90 ${meta.hoverBorder} transition-all flex flex-col justify-between group shadow-sm`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 font-semibold">
                            {skill.experienceYears}
                          </span>
                        </div>

                        <div className="text-[11px] font-mono text-emerald-400/90 mb-2 flex items-center gap-1 font-semibold">
                          <Shield className="w-3 h-3 text-emerald-400" />
                          <span>{skill.level}</span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {skill.description[language]}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500">PRODUCTION_READY</span>
                        <span className="w-2.5 h-2.5 rounded-full ring-2 ring-slate-800 shadow-sm" style={{ backgroundColor: skill.color }}></span>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

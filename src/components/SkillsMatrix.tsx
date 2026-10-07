import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Cpu, Terminal, Database, Layout, GitBranch, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { TechIcon } from './TechIcons';

export const SkillsMatrix: React.FC = () => {
  const { language } = useLanguage();

  const coreTechList = [
    { name: 'Laravel', category: 'Backend Framework', color: '#F43F5E' },
    { name: 'Go / Golang', category: 'Backend & Concurrency', color: '#00ADD8' },
    { name: 'PHP', category: 'Backend Language', color: '#818CF8' },
    { name: 'React', category: 'Frontend UI', color: '#38BDF8' },
    { name: 'TypeScript', category: 'Typed Language', color: '#3178C6' },
    { name: 'JavaScript', category: 'Core Language', color: '#F7DF1E' },
    { name: 'Tailwind CSS', category: 'Styling System', color: '#38BDF8' },
    { name: 'MySQL', category: 'Relational DB', color: '#0284C7' },
    { name: 'Alpine.js', category: 'Micro Reactivity', color: '#2DD4BF' },
    { name: 'RESTful API', category: 'API Architecture', color: '#10B981' },
    { name: 'Spatie RBAC', category: 'Auth & Security', color: '#EAB308' },
    { name: 'Git', category: 'Version Control', color: '#F43F5E' },
    { name: 'GitLab CI/CD', category: 'DevOps & Pipeline', color: '#F97316' },
    { name: 'Linux', category: 'Server Admin', color: '#FACC15' },
    { name: 'Nginx', category: 'Reverse Proxy', color: '#10B981' },
    { name: 'Figma', category: 'Design to Code', color: '#A855F7' },
    { name: 'Antigravity CLI', category: 'Agentic Tooling', color: '#00F0FF' },
    { name: 'AI Agents', category: 'Autonomous AI', color: '#FF007F' },
    { name: 'Clean Code', category: 'Code Architecture', color: '#00FF9D' },
  ];

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
      case 3:
        return {
          icon: <Cpu className="w-4 h-4 text-[#00f0ff]" />,
          titleColor: 'text-[#00f0ff]',
          borderColor: 'border-[#00f0ff]/30',
          hoverBorder: 'hover:border-[#00f0ff]/60 hover:shadow-[#00f0ff]/20'
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
    <section id="skills" className="py-20 bg-[#050713] border-b border-[#1c2452] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs mb-3 shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium tracking-wide">{language === 'id' ? 'Keahlian & Penguasaan Stack' : 'Core Capabilities'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
            {language === 'id' ? (
              <>
                Matriks Kompetensi &{' '}
                <span className="text-cyan-400">
                  Stack Teknologi
                </span>
              </>
            ) : (
              <>
                Engineering Skills &{' '}
                <span className="text-cyan-400">
                  Tech Matrix
                </span>
              </>
            )}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            {language === 'id'
              ? 'Keahlian teknis langsung dengan alat, framework, dan bahasa pemrograman yang digunakan untuk membangun sistem produksi enterprise.'
              : 'Direct technical competence across backend architectures, responsive client systems, server infrastructure, and AI automation.'}
          </p>
        </motion.div>

        {/* Visual Tech Stack Ecosystem Showcase Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-16 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 shadow-xl"
        >
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2 text-cyan-300">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{language === 'id' ? 'Daftar Teknologi yang Dikuasai' : 'Mastered Technology Ecosystem'}</span>
            </span>
            <span className="text-[11px] text-slate-400 font-normal">
              {language === 'id' ? '18+ Alat & Framework Teruji' : '18+ Battle-Tested Tools'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {coreTechList.map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 transition-all group cursor-default shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center p-1.5 shrink-0 group-hover:scale-110 transition-transform">
                  <TechIcon name={tech.name} color={tech.color} className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">
                    {tech.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Matrix Categories */}
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
                        {/* Header: Tech Icon, Name, Level & Years */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-2 shrink-0 group-hover:border-slate-700 transition-colors shadow-inner">
                              <TechIcon name={skill.icon || skill.name} color={skill.color} className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                                {skill.name}
                              </h4>
                              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-medium mt-0.5">
                                <Shield className="w-2.5 h-2.5 text-emerald-400" />
                                <span>{skill.level}</span>
                              </div>
                            </div>
                          </div>
                          
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 font-semibold shrink-0">
                            {skill.experienceYears}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">
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

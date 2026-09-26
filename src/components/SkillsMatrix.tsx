import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Cpu, Terminal, Database, Layout, GitBranch, Shield } from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const { language } = useLanguage();

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 1:
        return <Layout className="w-4 h-4 text-sky-400" />;
      case 2:
        return <GitBranch className="w-4 h-4 text-amber-400" />;
      default:
        return <Cpu className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#070a12] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-950/60 border border-indigo-800/60 text-indigo-400 font-mono text-xs mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
            {language === 'id' ? 'Matriks Kompetensi & Stack Teknologi' : 'Engineering Skills & Tech Matrix'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            {language === 'id'
              ? 'Keahlian teknis mendalam bukan sekadar daftar logo, melainkan penerapan arsitektur nyata pada skala produksi enterprise.'
              : 'Grounded technical competence across backend architectures, responsive client systems, and deployment infrastructure.'}
          </p>
        </div>

        {/* Matrix Categories */}
        <div className="space-y-12">
          {SKILL_CATEGORIES.map((categoryGroup, catIdx) => (
            <div key={catIdx} className="space-y-4">
              
              {/* Category Title */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
                <div className="p-1.5 rounded-md bg-slate-900 border border-slate-800">
                  {getCategoryIcon(catIdx)}
                </div>
                <h3 className="text-base font-bold text-slate-200 font-mono">
                  {categoryGroup.category[language]}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryGroup.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-5 rounded-xl bg-[#0b101e] border border-slate-800 hover:border-slate-700 hover:bg-[#0e1424] transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-400">
                          {skill.experienceYears}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-emerald-400/90 mb-2 flex items-center gap-1">
                        <Shield className="w-3 h-3 text-emerald-400" />
                        <span>{skill.level}</span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {skill.description[language]}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">PRODUCTION_READY</span>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }}></span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

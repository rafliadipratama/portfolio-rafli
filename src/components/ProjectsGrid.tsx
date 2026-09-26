import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, Layers, ChevronRight } from 'lucide-react';
import { GithubIcon, GitlabIcon } from './SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsGridProps {
  onSelectProject: (project: Project) => void;
}

const getCategoryBadgeStyle = (category: string) => {
  switch (category) {
    case 'laravel':
      return 'bg-gradient-to-r from-rose-950/90 to-red-950/90 text-rose-300 border-rose-500/50 shadow-sm shadow-rose-500/10';
    case 'react':
      return 'bg-gradient-to-r from-cyan-950/90 to-sky-950/90 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/10';
    case 'fullstack':
      return 'bg-gradient-to-r from-purple-950/90 to-indigo-950/90 text-purple-300 border-purple-500/50 shadow-sm shadow-purple-500/10';
    case 'javascript':
      return 'bg-gradient-to-r from-amber-950/90 to-yellow-950/90 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/10';
    default:
      return 'bg-slate-950/90 text-sky-400 border-slate-700/80';
  }
};

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onSelectProject }) => {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'laravel' | 'react' | 'fullstack' | 'javascript'>('all');

  const filterTabs = [
    { id: 'all', label: { id: 'Semua Proyek', en: 'All Projects' } },
    { id: 'laravel', label: { id: 'Laravel & Enterprise', en: 'Laravel & Enterprise' } },
    { id: 'react', label: { id: 'React & TypeScript', en: 'React & TypeScript' } },
    { id: 'fullstack', label: { id: 'Fullstack & Omnichannel', en: 'Fullstack & Omnichannel' } },
    { id: 'javascript', label: { id: 'JavaScript Native', en: 'JavaScript Native' } }
  ];

  const filteredProjects = PROJECTS.filter(project => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  return (
    <section id="projects" className="py-20 bg-[#070a12] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-950/60 border border-sky-800/60 text-sky-400 font-mono text-xs mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Production Code & Systems</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
              {language === 'id' ? 'Koleksi Rekayasa Sistem & Aplikasi' : 'Engineering Portfolio & Production Systems'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {language === 'id'
                ? 'Sistem nyata yang diterapkan di industri farmasi, e-commerce omnichannel, dan aplikasi web performa tinggi dengan arsitektur teruji.'
                : 'Real production systems deployed across pharmaceutical manufacturing, omnichannel e-commerce, and high-performance web tooling.'}
            </p>
          </div>

          {/* Filter Pills with Motion Tap */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#0c1220] border border-slate-800 rounded-xl self-start md:self-auto">
            {filterTabs.map(tab => (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-sky-400 via-indigo-300 to-cyan-400 text-slate-950 font-bold shadow-md shadow-sky-500/25 ring-1 ring-sky-300'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.label[language]}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Animated Grid of Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="group bg-[#0b101d] rounded-2xl border border-slate-800/90 overflow-hidden flex flex-col transition-all duration-300 hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/10"
              >
                {/* Image Preview & Badge */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b101d] via-transparent to-transparent opacity-90" />

                  {/* Badge Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${getCategoryBadgeStyle(project.category)}`}>
                      {project.category}
                    </span>
                    {project.badge && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/90 backdrop-blur-md text-emerald-300 border border-emerald-700/60 shadow-sm">
                        {project.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-sky-400 font-mono mt-0.5 mb-2.5">
                      {project.role}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {project.tagline[language]}
                    </p>
                  </div>

                  <div className="mt-5 space-y-4">
                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 4).map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-500">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300 font-semibold group/btn"
                      >
                        <span>{language === 'id' ? 'Detail Arsitektur' : 'Inspect Specs'}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors hover:scale-105"
                            title="Lihat GitHub Repository"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.gitlabUrl && (
                          <a
                            href={project.gitlabUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-orange-400 border border-slate-800 transition-colors hover:scale-105"
                            title="Lihat GitLab Repository"
                          >
                            <GitlabIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-sky-950/80 hover:bg-sky-900 text-sky-400 hover:text-sky-200 border border-sky-800/40 transition-colors hover:scale-105"
                            title="Kunjungi Website Langsung"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

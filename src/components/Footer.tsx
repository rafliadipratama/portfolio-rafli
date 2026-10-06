import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Code2, ArrowUp } from 'lucide-react';
import { GithubIcon, GitlabIcon, LinkedinIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070e] text-slate-400 py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#00f0ff] via-[#9d4edd] to-[#ff007f] p-[1px] shadow-sm">
                <div className="w-full h-full rounded-[7px] bg-[#070a1e] flex items-center justify-center text-[#00f0ff]">
                  <Code2 className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="font-bold text-slate-100 font-mono text-sm">
                Rafli<span className="text-cyan-400">.dev</span>
              </span>
              <span className="text-xs text-slate-600 font-mono">/ v2.4.0</span>
            </div>

            <p className="text-xs text-slate-500 mt-2 font-mono">
              &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All systems verified.
            </p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Engineered with React, TypeScript, Tailwind CSS & Vite
            </p>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.gitlab}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-orange-400 transition-colors"
                title="GitLab"
              >
                <GitlabIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="h-5 w-px bg-slate-800"></div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <span>{language === 'id' ? 'Kembali ke Atas' : 'Top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

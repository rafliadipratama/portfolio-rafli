import React, { useState } from 'react';
import {
  Menu,
  X,
  FileDown,
  Send,
  Code2,
  Globe,
  Terminal,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export type PageId = 'home' | 'projects' | 'experience' | 'labs' | 'skills' | 'contact';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenPalette?: () => void;
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenTerminal,
}) => {
  const { language, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: { id: string; en: string }; badge?: string }[] = [
    { id: 'home', label: { id: 'Beranda', en: 'Home' } },
    { id: 'projects', label: { id: 'Proyek', en: 'Projects' } },
    { id: 'experience', label: { id: 'Karier', en: 'Career' }, badge: 'ACTIVE' },
    { id: 'labs', label: { id: 'Labs', en: 'Labs' }, badge: 'LIVE' },
    { id: 'skills', label: { id: 'Keahlian', en: 'Skills' } },
    { id: 'contact', label: { id: 'Kontak', en: 'Contact' } },
  ];

  const handleLinkClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050713]/95 backdrop-blur-xl border-b border-[#1c2452] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2.5 group shrink-0 text-left cursor-pointer"
          aria-label="Rafli Portfolio Home"
        >
          <div className="relative shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#00f0ff] via-[#9d4edd] to-[#ff007f] p-[1.5px] shadow-sm shadow-[#00f0ff]/30 group-hover:shadow-[#00f0ff]/60 transition-all duration-300">
              <div className="w-full h-full rounded-[9.5px] sm:rounded-[10.5px] bg-[#070a1e] flex items-center justify-center text-[#00f0ff] group-hover:text-white transition-colors">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff9d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff9d] border border-[#050713]"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-bold tracking-tight text-slate-100 group-hover:text-[#00f0ff] transition-colors leading-tight font-orbitron">
              <span className="text-base font-extrabold tracking-tight">RAFLI</span>
              <span className="text-[#00f0ff] font-mono text-sm font-semibold">.DEV</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono leading-none">
              Fullstack & AI Engineer
            </div>
          </div>
        </button>

        {/* Clean Page Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'text-[#00f0ff] bg-cyan-950/60 border border-[#00f0ff]/50 shadow-sm shadow-[#00f0ff]/20 font-semibold font-orbitron'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <span>{link.label[language]}</span>
                {link.badge && (
                  <span className={`text-[8px] font-mono px-1 py-0.2 rounded font-bold ${
                    link.badge === 'ACTIVE' 
                      ? 'bg-emerald-950 text-[#00ff9d] border border-[#00ff9d]/40' 
                      : 'bg-amber-950 text-[#ffe600] border border-[#ffe600]/40'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls Area */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Terminal / CLI Trigger Button */}
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-[#070b22] border border-[#1c2452] hover:border-[#00ff9d]/50 text-slate-300 hover:text-[#00ff9d] text-xs font-mono transition-all shadow-sm group cursor-pointer"
              title="Open Cyber Terminal Console (~)"
            >
              <Terminal className="w-3.5 h-3.5 text-[#00ff9d] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-[11px] font-bold">CLI</span>
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-[#1c2452] hover:border-indigo-500/50 text-slate-200 hover:text-white text-xs font-medium transition-all shadow-sm cursor-pointer"
            title={language === 'id' ? 'Switch language to English' : 'Ganti ke Bahasa Indonesia'}
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="font-mono uppercase font-semibold text-[11px]">{language}</span>
          </button>

          {/* CV Download Button */}
          <a
            href={PERSONAL_INFO.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1c2452] bg-slate-900/80 hover:bg-slate-800 hover:border-[#00f0ff]/40 text-slate-200 hover:text-white text-xs font-medium transition-all shadow-sm group whitespace-nowrap"
          >
            <FileDown className="w-3.5 h-3.5 text-[#00f0ff] group-hover:translate-y-0.5 transition-transform shrink-0" />
            <span>CV</span>
          </a>

          {/* Direct Contact Button */}
          <button
            onClick={() => handleLinkClick('contact')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#9d4edd] hover:opacity-90 text-slate-950 font-bold text-xs transition-all shadow-sm hover:shadow-[#00f0ff]/30 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap font-orbitron cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 shrink-0" />
            <span>{language === 'id' ? 'Hubungi' : 'Contact'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-[#080d1a]/98 backdrop-blur-2xl border-b border-slate-800 shadow-2xl animate-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col gap-1.5 mb-4">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-cyan-950/60 text-[#00f0ff] border border-[#00f0ff]/50 font-semibold font-orbitron'
                      : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{link.label[language]}</span>
                    {link.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#00f0ff]"></span>}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
            >
              <FileDown className="w-4 h-4 text-[#00f0ff]" />
              <span>{language === 'id' ? 'Unduh Resume (PDF)' : 'Download Resume (PDF)'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

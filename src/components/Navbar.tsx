import React, { useState } from 'react';
import {
  Menu,
  X,
  FileDown,
  Send,
  Code2,
  Globe,
  Search,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export type PageId = 'home' | 'projects' | 'experience' | 'labs' | 'skills' | 'contact';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenPalette,
}) => {
  const { language, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: { id: string; en: string } }[] = [
    { id: 'home', label: { id: 'Beranda', en: 'Home' } },
    { id: 'projects', label: { id: 'Proyek', en: 'Projects' } },
    { id: 'experience', label: { id: 'Karier', en: 'Career' } },
    { id: 'labs', label: { id: 'Labs', en: 'Labs' } },
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
          <div className="shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 border border-cyan-500/30 group-hover:border-cyan-400/80 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-all shadow-sm">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-bold tracking-tight text-slate-100 group-hover:text-cyan-400 transition-colors leading-tight">
              <span className="text-base font-extrabold tracking-tight">RAFLI</span>
              <span className="text-cyan-400 font-mono text-sm font-semibold">.DEV</span>
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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center cursor-pointer ${
                  isActive
                    ? 'text-cyan-300 bg-slate-900 border border-slate-700/80 shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <span>{link.label[language]}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls Area */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Search Palette Trigger */}
          {onOpenPalette && (
            <button
              onClick={onOpenPalette}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-[#1c2452] hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all shadow-sm cursor-pointer"
              title="Cari proyek / halaman (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] text-slate-400 hidden md:inline">Ctrl+K</span>
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
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm whitespace-nowrap cursor-pointer"
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
                      ? 'bg-slate-900 text-cyan-300 border border-slate-700/80 font-semibold'
                      : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{link.label[language]}</span>
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

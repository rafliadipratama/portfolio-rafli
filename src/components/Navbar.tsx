import React, { useState, useEffect } from 'react';
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

interface NavbarProps {
  onOpenPalette?: () => void;
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const { language, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('overview');

  // Track scroll progress & scrolled state
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
      setIsScrolled(winScroll > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section for ScrollSpy
  useEffect(() => {
    const sections = [
      'overview',
      'projects',
      'experience',
      'engineering-labs',
      'skills',
      'contact'
    ];

    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    {
      id: 'projects',
      href: '#projects',
      label: { id: 'Proyek', en: 'Projects' }
    },
    {
      id: 'experience',
      href: '#experience',
      label: { id: 'Karier', en: 'Career' }
    },
    {
      id: 'engineering-labs',
      href: '#engineering-labs',
      label: { id: 'Labs', en: 'Labs' }
    },
    {
      id: 'skills',
      href: '#skills',
      label: { id: 'Keahlian', en: 'Skills' }
    },
    {
      id: 'contact',
      href: '#contact',
      label: { id: 'Kontak', en: 'Contact' }
    }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050713]/95 backdrop-blur-xl border-b border-[#1c2452] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]'
          : 'bg-[#050713]/85 backdrop-blur-md border-b border-[#1c2452]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a
          href="#overview"
          className="flex items-center gap-2.5 group shrink-0"
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
        </a>

        {/* Clean Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-[#00f0ff] bg-cyan-950/40 border border-[#00f0ff]/40 shadow-sm shadow-[#00f0ff]/20 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {link.label[language]}
              </a>
            );
          })}
        </nav>

        {/* Action Controls Area */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Terminal / CLI Trigger Button */}
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-[#070b22] border border-[#1c2452] hover:border-[#00ff9d]/50 text-slate-300 hover:text-[#00ff9d] text-xs font-mono transition-all shadow-sm group"
              title="Open Cyber Terminal Console (~)"
            >
              <Terminal className="w-3.5 h-3.5 text-[#00ff9d] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-[11px] font-bold">CLI</span>
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-[#1c2452] hover:border-indigo-500/50 text-slate-200 hover:text-white text-xs font-medium transition-all shadow-sm"
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
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#9d4edd] hover:opacity-90 text-slate-950 font-bold text-xs transition-all shadow-sm hover:shadow-[#00f0ff]/30 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap font-orbitron"
          >
            <Send className="w-3.5 h-3.5 shrink-0" />
            <span>{language === 'id' ? 'Hubungi' : 'Contact'}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all focus:outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Reading Progress Bar */}
      <div className="w-full h-[2px] bg-slate-800/40 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#00f0ff] via-[#9d4edd] to-[#00ff9d] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-[#080d1a]/98 backdrop-blur-2xl border-b border-slate-800 shadow-2xl animate-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col gap-1.5 mb-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-cyan-950/40 text-[#00f0ff] border border-[#00f0ff]/40 font-semibold'
                      : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{link.label[language]}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#00f0ff]"></span>}
                </a>
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

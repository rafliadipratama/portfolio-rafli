import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  FileDown,
  Send,
  Code2,
  ChevronDown,
  Layers,
  Sliders,
  Database,
  Search,
  Globe,
  Activity,
  Terminal,
  ExternalLink,
  Sparkles,
  Clock
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenPalette?: () => void;
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPalette, onOpenTerminal }) => {
  const { language, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [bandungTime, setBandungTime] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Live Bandung/Jakarta Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      setBandungTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
      'workflow-simulator',
      'disc-assessment',
      'api-playground',
      'skills',
      'architecture-decisions',
      'github-telemetry',
      'contact'
    ];

    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 130;
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLabsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown & mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLabsDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isLabActive = ['engineering-labs', 'workflow-simulator', 'disc-assessment', 'api-playground'].includes(activeSection);

  const labTools = [
    {
      href: "#workflow-simulator",
      id: "workflow-simulator",
      title: { id: "Simulasi Alur CPOB", en: "GMP Workflow Simulator" },
      desc: {
        id: "Alur rilis batch 4-tier & audit trail compliance farmasi",
        en: "4-tier batch release & pharmaceutical compliance validator"
      },
      tag: "CPOB / GMP",
      tagColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      icon: Layers,
      iconColor: "text-emerald-400"
    },
    {
      href: "#disc-assessment",
      id: "disc-assessment",
      title: { id: "Kalkulator Profil DISC", en: "DISC Psychometric Engine" },
      desc: {
        id: "Analisis gaya kerja, radar kuadran & rekomendasi tim",
        en: "Workplace personality analysis & team synergy radar"
      },
      tag: "Psikometri",
      tagColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      icon: Sliders,
      iconColor: "text-amber-400"
    },
    {
      href: "#api-playground",
      id: "api-playground",
      title: { id: "Mock REST API & ERD", en: "Mock REST API & ERD Schema" },
      desc: {
        id: "Playground HTTP real-time & visualisasi relasi basis data",
        en: "Real-time HTTP tester & interactive relational schema viewer"
      },
      tag: "REST API",
      tagColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
      icon: Database,
      iconColor: "text-sky-400"
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
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo */}
        <a
          href="#overview"
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          aria-label="Mohamad Rafli Adipratama Portfolio Home"
        >
          <div className="relative shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#00f0ff] via-[#9d4edd] to-[#ff007f] p-[1.5px] shadow-sm shadow-[#00f0ff]/30 group-hover:shadow-[#00f0ff]/60 transition-all duration-300">
              <div className="w-full h-full rounded-[9.5px] sm:rounded-[10.5px] bg-[#070a1e] flex items-center justify-center text-[#00f0ff] group-hover:text-white transition-colors">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            {/* Live Indicator Dot */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff9d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff9d] border border-[#050713]"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-bold tracking-tight text-slate-100 group-hover:text-[#00f0ff] transition-colors leading-tight font-orbitron">
              <span className="text-sm sm:text-base font-extrabold tracking-tight">RAFLI</span>
              <span className="text-[#00f0ff] font-mono text-xs sm:text-sm font-semibold">.DEV</span>
            </div>
            <div className="hidden xs:flex items-center gap-1.5 text-[9px] sm:text-[10px] text-slate-400 font-mono leading-none mt-0.5">
              <span className="text-cyan-300">Fullstack & AI</span>
              <span className="text-slate-600">•</span>
              <span className="text-[#00ff9d] font-medium font-orbitron">[ARCADE ON]</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links (Responsive from lg up) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink min-w-0">
          {/* Overview */}
          <a
            href="#overview"
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeSection === 'overview'
                ? 'text-sky-400 bg-sky-500/10 border border-sky-500/25 shadow-sm shadow-sky-500/10 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            {language === 'id' ? 'Ikhtisar' : 'Overview'}
          </a>

          {/* Projects */}
          <a
            href="#projects"
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeSection === 'projects'
                ? 'text-sky-400 bg-sky-500/10 border border-sky-500/25 shadow-sm shadow-sky-500/10 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            {language === 'id' ? 'Proyek' : 'Projects'}
          </a>

          {/* Architecture Decisions (ADR) */}
          <a
            href="#architecture-decisions"
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeSection === 'architecture-decisions'
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 shadow-sm shadow-emerald-500/10 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            {language === 'id' ? 'Standar ADR' : 'ADR Specs'}
          </a>

          {/* Interactive Labs & Simulator Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setLabsDropdownOpen(true)}
            onMouseLeave={() => setLabsDropdownOpen(false)}
          >
            <button
              onClick={() => setLabsDropdownOpen(!labsDropdownOpen)}
              className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                isLabActive || labsDropdownOpen
                  ? 'text-sky-400 bg-sky-500/10 border border-sky-500/25 shadow-sm shadow-sky-500/10 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
              }`}
              aria-expanded={labsDropdownOpen}
              aria-haspopup="true"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{language === 'id' ? 'Lab & Tools' : 'Labs & Tools'}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-sky-950 text-sky-300 border border-sky-600/40">
                3
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
                  labsDropdownOpen ? 'rotate-180 text-sky-400' : ''
                }`}
              />
            </button>

            {/* Dropdown Flyout */}
            {labsDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="rounded-xl bg-[#0a0f1d] border border-slate-800/90 shadow-2xl p-2 backdrop-blur-xl">
                  <div className="px-3 py-1.5 border-b border-slate-800/60 mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      {language === 'id' ? 'Simulasi Interaktif' : 'Interactive Demos'}
                    </span>
                    <span className="text-[9px] font-mono text-sky-400 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-800/50">
                      Live Engine
                    </span>
                  </div>

                  <div className="space-y-1">
                    {labTools.map((tool) => {
                      const Icon = tool.icon;
                      const isActive = activeSection === tool.id;
                      return (
                        <a
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setLabsDropdownOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-lg transition-all group ${
                            isActive
                              ? 'bg-sky-500/10 border border-sky-500/30'
                              : 'hover:bg-slate-800/70 border border-transparent'
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-slate-700 shrink-0 ${tool.iconColor}`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="text-xs font-semibold text-slate-200 group-hover:text-sky-400 transition-colors">
                                {tool.title[language]}
                              </span>
                              <span
                                className={`text-[9px] px-1.5 py-0.2 rounded font-mono border shrink-0 ${tool.tagColor}`}
                              >
                                {tool.tag}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {tool.desc[language]}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Experience */}
          <a
            href="#experience"
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeSection === 'experience'
                ? 'text-sky-400 bg-sky-500/10 border border-sky-500/25 shadow-sm shadow-sky-500/10 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            {language === 'id' ? 'Pengalaman' : 'Experience'}
          </a>

          {/* Skills */}
          <a
            href="#skills"
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeSection === 'skills'
                ? 'text-sky-400 bg-sky-500/10 border border-sky-500/25 shadow-sm shadow-sky-500/10 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            {language === 'id' ? 'Keahlian' : 'Skills'}
          </a>

          {/* GitHub Telemetry (shown on xl+ to maintain clean breathing room) */}
          <a
            href="#github-telemetry"
            className={`hidden xl:flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeSection === 'github-telemetry'
                ? 'text-sky-400 bg-sky-500/10 border border-sky-500/25 shadow-sm shadow-sky-500/10 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{language === 'id' ? 'Telemetri' : 'Telemetry'}</span>
          </a>

          {/* Contact */}
          <a
            href="#contact"
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeSection === 'contact'
                ? 'text-sky-400 bg-sky-500/10 border border-sky-500/25 shadow-sm shadow-sky-500/10 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            {language === 'id' ? 'Kontak' : 'Contact'}
          </a>
        </nav>

        {/* Action Controls Area */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Live Bandung Clock (Shown on wide 2xl screens) */}
          {bandungTime && (
            <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-amber-300 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{bandungTime} WIB</span>
            </div>
          )}

          {/* Command Palette Trigger (Shown on xl+) */}
          {onOpenPalette && (
            <button
              onClick={onOpenPalette}
              className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-sky-500/40 text-slate-400 hover:text-slate-200 text-xs font-mono transition-all group shadow-sm"
              title="Quick Search & Command Palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 transition-colors shrink-0" />
              <span className="hidden 2xl:inline">{language === 'id' ? 'Cari...' : 'Search...'}</span>
              <kbd className="px-1.5 py-0.2 text-[9px] bg-slate-800 group-hover:bg-slate-700 rounded border border-slate-700 text-slate-400 font-mono transition-colors">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Language Switcher (Always visible, compact) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-800 border border-slate-700/70 hover:border-indigo-500/50 text-slate-200 hover:text-white text-xs font-medium transition-all shadow-sm"
            title={language === 'id' ? 'Switch language to English' : 'Ganti ke Bahasa Indonesia'}
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="font-mono uppercase font-semibold text-[11px]">{language}</span>
          </button>

          {/* CV Download Button (Hidden on small mobile, visible from sm up) */}
          <a
            href={PERSONAL_INFO.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/70 hover:bg-slate-800 hover:border-sky-500/40 text-slate-200 hover:text-white text-xs font-medium transition-all shadow-sm group whitespace-nowrap"
          >
            <FileDown className="w-3.5 h-3.5 text-sky-400 group-hover:translate-y-0.5 transition-transform shrink-0" />
            <span className="hidden md:inline">{language === 'id' ? 'Curriculum Vitae' : 'Resume PDF'}</span>
            <span className="md:hidden">CV</span>
          </a>

          {/* Direct Contact Button (Compact on mobile, full on md+) */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-sm hover:shadow-sky-500/30 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{language === 'id' ? 'Hubungi' : 'Get in Touch'}</span>
          </a>

          {/* Mobile Menu Toggle Button (Visible on screens < lg) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all focus:outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Reading Progress Bar (Subtle single pixel indicator on the bottom edge) */}
      <div className="w-full h-[2px] bg-slate-800/40 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Drawer (Responsive across phones and tablets) */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-3 sm:px-5 pt-3 pb-6 bg-[#080d1a]/98 backdrop-blur-2xl border-b border-slate-800 shadow-2xl animate-in slide-in-from-top-3 duration-200 max-h-[calc(100dvh-4rem)] overflow-y-auto">
          {/* Quick Telemetry & Status Header */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 mb-3 gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-[11px] font-mono text-slate-300">
                {bandungTime ? `${bandungTime} WIB` : 'Bandung, ID'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {onOpenTerminal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="px-2 py-1 rounded bg-teal-950/80 border border-teal-700/60 text-teal-300 text-[10px] font-mono flex items-center gap-1"
                >
                  <Terminal className="w-3 h-3" />
                  CLI
                </button>
              )}
              {onOpenPalette && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPalette();
                  }}
                  className="px-2 py-1 rounded bg-purple-950/80 border border-purple-700/60 text-purple-300 text-[10px] font-mono flex items-center gap-1"
                >
                  <Search className="w-3 h-3" />
                  ⌘K
                </button>
              )}
            </div>
          </div>

          {/* Primary Navigation Links */}
          <div className="mb-3">
            <p className="px-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
              {language === 'id' ? 'Navigasi Utama' : 'Main Navigation'}
            </p>
            <nav className="grid grid-cols-2 gap-1.5">
              {[
                { href: '#overview', label: { id: 'Ikhtisar', en: 'Overview' }, id: 'overview' },
                { href: '#projects', label: { id: 'Proyek Rekayasa', en: 'Projects' }, id: 'projects' },
                { href: '#architecture-decisions', label: { id: 'Standar ADR', en: 'ADR Specs' }, id: 'architecture-decisions' },
                { href: '#experience', label: { id: 'Pengalaman', en: 'Experience' }, id: 'experience' },
                { href: '#skills', label: { id: 'Keahlian & Stack', en: 'Skills & Stack' }, id: 'skills' },
                { href: '#github-telemetry', label: { id: 'GitHub Telemetri', en: 'GitHub Activity' }, id: 'github-telemetry' },
                { href: '#contact', label: { id: 'Kontak', en: 'Contact' }, id: 'contact' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    activeSection === item.id
                      ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold'
                      : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label[language]}</span>
                  {activeSection === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  )}
                </a>
              ))}
            </nav>
          </div>

          {/* Interactive Labs & Simulator */}
          <div className="mb-4">
            <div className="flex items-center justify-between px-1 mb-1.5">
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{language === 'id' ? 'Lab & Simulator Interaktif' : 'Interactive Labs'}</span>
              </p>
              <span className="text-[9px] font-mono text-sky-400 bg-sky-950 px-1.5 py-0.5 rounded border border-sky-800/50">
                3 Tools
              </span>
            </div>

            <div className="space-y-1.5">
              {labTools.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeSection === tool.id;
                return (
                  <a
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-start gap-2.5 p-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-sky-500/15 border border-sky-500/30'
                        : 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0 ${tool.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-semibold text-slate-200">
                          {tool.title[language]}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono border shrink-0 ${tool.tagColor}`}>
                          {tool.tag}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">
                        {tool.desc[language]}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
            >
              <FileDown className="w-4 h-4 text-sky-400" />
              <span>{language === 'id' ? 'Unduh Curriculum Vitae (PDF)' : 'Download Resume (PDF)'}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-500/20"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'id' ? 'Kirim Pesan / Hubungi Langsung' : 'Contact Directly'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

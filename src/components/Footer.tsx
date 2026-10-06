import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import {
  Code2,
  ArrowUp,
  Mail,
  Copy,
  Check,
  Terminal,
  MapPin,
  ExternalLink,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { GithubIcon, GitlabIcon, LinkedinIcon } from './SocialIcons';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate?: (page: PageId) => void;
  onOpenTerminal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTerminal }) => {
  const { language } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const navLinks: { id: PageId; label: { id: string; en: string } }[] = [
    { id: 'home', label: { id: 'Beranda', en: 'Home' } },
    { id: 'projects', label: { id: 'Proyek & Sistem', en: 'Projects & Systems' } },
    { id: 'experience', label: { id: 'Karier & Pengalaman', en: 'Career Experience' } },
    { id: 'labs', label: { id: 'Laboratorium Interaktif', en: 'Interactive Labs' } },
    { id: 'skills', label: { id: 'Keahlian & Arsitektur', en: 'Skills & Architecture' } },
    { id: 'contact', label: { id: 'Hubungi & Kolaborasi', en: 'Contact & Collaboration' } },
  ];

  const featuredProjects = [
    {
      title: 'LiveEuy Cinema VOD',
      desc: { id: 'Streaming HLS Adaptif & Ambient Glow', en: 'Adaptive HLS Streaming & Ambient Glow' },
      url: 'https://github.com/rafliadipratama/LiveEuy',
      isExternal: true,
    },
    {
      title: 'e-Doc CPOB Farmasi',
      desc: { id: 'Kepatuhan Regulasi GMP & 6-Level RBAC', en: 'GMP Regulatory Compliance & 6-Tier RBAC' },
      page: 'projects' as PageId,
    },
    {
      title: 'Solas HR ATS & DISC Engine',
      desc: { id: 'Portal Korporat & Tes Bakat Otomatis', en: 'Corporate Portal & Automated Talent Tests' },
      page: 'projects' as PageId,
    },
    {
      title: 'Marketplace Solas',
      desc: { id: 'Distribusi Omnichannel & Kunci Stok', en: 'Omnichannel Distribution & Stock Lock' },
      page: 'projects' as PageId,
    },
  ];

  const handleLinkClick = (pageId: PageId) => {
    if (onNavigate) {
      onNavigate(pageId);
    } else {
      window.location.hash = pageId === 'home' ? '#/' : `#/${pageId}`;
      scrollToTop();
    }
  };

  return (
    <footer className="relative bg-[#040711] text-slate-400 border-t border-slate-800/80 overflow-hidden">
      {/* Top subtle ambient glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          
          {/* Column 1: Brandmark & Professional Profile (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00f0ff] via-[#9d4edd] to-[#ff007f] p-[1.5px] shadow-sm">
                <div className="w-full h-full rounded-[9.5px] bg-[#070a1e] flex items-center justify-center text-[#00f0ff]">
                  <Code2 className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-center gap-1 font-bold tracking-tight text-slate-100">
                <span className="text-base font-extrabold tracking-tight">RAFLI</span>
                <span className="text-cyan-400 font-mono text-sm font-semibold">.DEV</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {language === 'id'
                ? 'Fullstack Web Engineer & AI Systems Developer. Berfokus pada arsitektur bersih (Clean Code), platform streaming berperforma tinggi, dan tata kelola sistem enterprise skala produksi.'
                : 'Fullstack Web Engineer & AI Systems Developer. Focused on Clean Architecture, high-performance streaming platforms, and high-compliance enterprise web systems.'}
            </p>

            {/* Current Position Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-slate-400">
                {language === 'id' ? 'Aktif:' : 'Active:'}
              </span>
              <span className="font-medium text-slate-200">
                Software Engineer Intern @ PT. Padepokan 79
              </span>
            </div>

            {/* Location & Timezone */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{PERSONAL_INFO.location}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{PERSONAL_INFO.timezone}</span>
            </div>
          </div>

          {/* Column 2: Directory / Navigasi (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {language === 'id' ? 'Direktori' : 'Directory'}
            </h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="text-xs text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 group cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    <span>{link.label[language]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Systems (2-3 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {language === 'id' ? 'Sistem Unggulan' : 'Featured Work'}
            </h4>
            <ul className="space-y-2.5">
              {featuredProjects.map((proj, idx) => (
                <li key={idx}>
                  {proj.isExternal ? (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-cyan-300 transition-colors block group"
                    >
                      <div className="flex items-center gap-1 font-medium text-slate-300 group-hover:text-cyan-300">
                        <span>{proj.title}</span>
                        <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover:text-cyan-400" />
                      </div>
                      <span className="text-[11px] text-slate-500 leading-none">
                        {proj.desc[language]}
                      </span>
                    </a>
                  ) : (
                    <button
                      onClick={() => proj.page && handleLinkClick(proj.page)}
                      className="text-left text-xs text-slate-400 hover:text-cyan-300 transition-colors block group cursor-pointer"
                    >
                      <div className="font-medium text-slate-300 group-hover:text-cyan-300">
                        {proj.title}
                      </div>
                      <span className="text-[11px] text-slate-500 leading-none">
                        {proj.desc[language]}
                      </span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Channels & Connect (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {language === 'id' ? 'Saluran & Kontak' : 'Direct Channels'}
            </h4>

            {/* Email quick copy card */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-mono text-slate-200 truncate select-all">
                  {PERSONAL_INFO.email}
                </span>
              </div>
              <button
                onClick={copyEmail}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                title={language === 'id' ? 'Salin email' : 'Copy email'}
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-1.5 group"
                title="GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.gitlab}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-orange-500/40 text-slate-300 hover:text-orange-400 text-xs font-medium transition-all flex items-center justify-center gap-1.5 group"
                title="GitLab"
              >
                <GitlabIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>GitLab</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-sky-500/40 text-slate-300 hover:text-sky-400 text-xs font-medium transition-all flex items-center justify-center gap-1.5 group"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* WhatsApp direct & Terminal trigger */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-950/70 text-emerald-300 text-xs font-medium transition-all flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  className="flex-1 py-2 px-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Buka interactive terminal console"
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Terminal</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          
          {/* Copyright */}
          <div className="text-slate-400 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. </span>
            <span className="text-slate-500">
              {language === 'id' ? 'Hak cipta dilindungi.' : 'All rights reserved.'}
            </span>
          </div>

          {/* Built With Badges */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 flex-wrap justify-center">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">React 18</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">TypeScript</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">Tailwind CSS</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">Vite</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
            title={language === 'id' ? 'Kembali ke atas' : 'Back to top'}
          >
            <span>{language === 'id' ? 'Ke Atas' : 'Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>
    </footer>
  );
};

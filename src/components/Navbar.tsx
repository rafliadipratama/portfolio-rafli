import React, { useState } from 'react';
import { Menu, X, FileDown, Send, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#overview", label: { id: "Ikhtisar", en: "Overview" } },
    { href: "#workflow-simulator", label: { id: "Simulasi CPOB", en: "GMP Simulator" } },
    { href: "#experience", label: { id: "Pengalaman", en: "Experience" } },
    { href: "#projects", label: { id: "Proyek Rekayasa", en: "Engineering Projects" } },
    { href: "#skills", label: { id: "Teknologi", en: "Tech Stack" } },
    { href: "#education-certs", label: { id: "Sertifikasi", en: "Credentials" } },
    { href: "#contact", label: { id: "Kontak", en: "Contact" } },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#070a12]/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#overview" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-slate-100 group-hover:text-sky-400 transition-colors">
              <span>Rafli</span>
              <span className="text-sky-400 font-mono">.dev</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono leading-none">Fullstack Systems</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              {link.label[language]}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={PERSONAL_INFO.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all"
          >
            <FileDown className="w-3.5 h-3.5 text-sky-400" />
            <span>{language === 'id' ? 'Curriculum Vitae' : 'Resume'}</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-all shadow-sm hover:shadow-sky-500/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{language === 'id' ? 'Hubungi' : 'Get in Touch'}</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-[#090d16] border-b border-slate-800 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                {link.label[language]}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-slate-700 bg-slate-800/70 text-slate-200 text-sm font-medium"
            >
              <FileDown className="w-4 h-4 text-sky-400" />
              <span>{language === 'id' ? 'Unduh Resume (PDF)' : 'Download Resume (PDF)'}</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-bold"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'id' ? 'Kirim Pesan' : 'Contact Directly'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

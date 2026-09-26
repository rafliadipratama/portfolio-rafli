import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PROJECTS } from '../data/portfolioData';
import { Search, X, Layers, Briefcase, Cpu, FileDown, Terminal, Globe, ChevronRight } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onSelectProjectById: (id: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
  onSelectProjectById,
}) => {
  const { language, toggleLanguage } = useLanguage();
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  // Global keydown handler for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickNav = [
    { label: language === 'id' ? 'Simulasi CPOB / GMP' : 'GMP State Machine Simulator', href: '#workflow-simulator', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
    { label: language === 'id' ? 'Semua Proyek Rekayasa' : 'All Engineering Projects', href: '#projects', icon: <Layers className="w-4 h-4 text-sky-400" /> },
    { label: language === 'id' ? 'Pengalaman Kerja Industri' : 'Professional Work Experience', href: '#experience', icon: <Briefcase className="w-4 h-4 text-amber-400" /> },
    { label: language === 'id' ? 'Matriks Kompetensi & Stack' : 'Skills & Tech Matrix', href: '#skills', icon: <Cpu className="w-4 h-4 text-indigo-400" /> },
    { label: language === 'id' ? 'Pendidikan & Lisensi BNSP' : 'Education & BNSP Credentials', href: '#education-certs', icon: <FileDown className="w-4 h-4 text-purple-400" /> },
  ];

  const filteredProjects = PROJECTS.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.technologies.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#0b101e] border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={language === 'id' ? 'Cari proyek, teknologi, modul...' : 'Search systems, stack, commands...'}
            className="flex-1 bg-transparent text-sm text-slate-100 focus:outline-none placeholder-slate-500 font-mono"
          />
          <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-700 text-slate-400">
            ESC
          </kbd>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="p-3 max-h-[380px] overflow-y-auto space-y-4 text-xs font-mono">
          
          {/* Quick Actions */}
          <div>
            <div className="text-[10px] text-slate-500 uppercase px-3 py-1 font-bold">
              {language === 'id' ? 'Aksi Cepat' : 'Quick Actions'}
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenTerminal();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'id' ? 'Buka Interactive CLI Terminal' : 'Launch Interactive CLI Terminal'}</span>
                </div>
                <span className="text-[10px] text-slate-500">~</span>
              </button>

              <button
                onClick={() => {
                  toggleLanguage();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-indigo-400" />
                  <span>{language === 'id' ? 'Ganti Bahasa ke English (EN)' : 'Switch Language to Indonesian (ID)'}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">{language === 'id' ? 'EN' : 'ID'}</span>
              </button>
            </div>
          </div>

          {/* Quick Section Navigation */}
          <div>
            <div className="text-[10px] text-slate-500 uppercase px-3 py-1 font-bold">
              {language === 'id' ? 'Navigasi Langsung' : 'Direct Navigation'}
            </div>
            <div className="space-y-1">
              {quickNav.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-lg text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              ))}
            </div>
          </div>

          {/* Filtered Projects */}
          <div>
            <div className="text-[10px] text-slate-500 uppercase px-3 py-1 font-bold">
              {language === 'id' ? 'Proyek Rekayasa' : 'Engineering Projects'} ({filteredProjects.length})
            </div>
            <div className="space-y-1">
              {filteredProjects.map(proj => (
                <button
                  key={proj.id}
                  onClick={() => {
                    onSelectProjectById(proj.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors text-left"
                >
                  <div>
                    <span className="text-slate-100 font-bold">{proj.title}</span>
                    <span className="text-slate-500 ml-2">[{proj.technologies.slice(0, 2).join(', ')}]</span>
                  </div>
                  <span className="text-[10px] text-sky-400">Inspect</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <span>Navigation: Arrow Keys • Select: Enter</span>
          <span>RafliDev Command Palette</span>
        </div>
      </div>
    </div>
  );
};

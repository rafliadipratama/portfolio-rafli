import React, { useState, useEffect } from 'react';
import { Terminal, Clock, Activity, ShieldCheck, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TelemetryBarProps {
  onOpenTerminal: () => void;
  onOpenPalette: () => void;
}

export const TelemetryBar: React.FC<TelemetryBarProps> = ({ onOpenTerminal, onOpenPalette }) => {
  const { language, toggleLanguage } = useLanguage();
  const [bandungTime, setBandungTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Jakarta timezone
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

  return (
    <aside aria-label="System Telemetry" className="w-full bg-[#0a0f1d] border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-400 font-mono flex flex-wrap items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400">
            {language === 'id' ? 'STATUS: AKTIF' : 'SYSTEM: ACTIVE'}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-sky-400" />
          <span>Bandung, ID (WIB)</span>
        </div>

        <div className="flex items-center gap-1 text-slate-300">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{bandungTime ? `${bandungTime} WIB` : 'UTC+7'}</span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>CPOB/GMP Enterprise Spec</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 ml-auto">
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/70 hover:bg-slate-700 text-sky-300 hover:text-sky-200 border border-slate-700/60 transition-colors"
          title="Buka Terminal CLI"
        >
          <Terminal className="w-3 h-3 text-sky-400" />
          <span>CLI Terminal</span>
          <kbd className="hidden sm:inline-block ml-1 px-1 text-[10px] bg-slate-900 rounded border border-slate-700 text-slate-400">~</kbd>
        </button>

        <button
          onClick={onOpenPalette}
          className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
          title="Command Palette"
        >
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>Commands</span>
          <kbd className="ml-1 px-1 text-[10px] bg-slate-900 rounded border border-slate-700 text-slate-400">Ctrl+K</kbd>
        </button>

        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-700/40 transition-colors font-sans font-medium"
          title="Ganti Bahasa (ID / EN)"
        >
          <Globe className="w-3 h-3 text-indigo-400" />
          <span className="font-semibold uppercase tracking-wider">{language}</span>
          <span className="text-[10px] text-indigo-400/80">({language === 'id' ? 'ID' : 'EN'})</span>
        </button>
      </div>
    </aside>
  );
};

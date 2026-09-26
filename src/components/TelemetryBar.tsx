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
    <aside
      aria-label="System Telemetry"
      className="w-full bg-[#080c1a] border-b border-slate-800/80 px-4 py-2 text-xs font-mono flex flex-wrap items-center justify-between gap-3 select-none"
    >
      <div className="flex items-center gap-3 flex-wrap">
        {/* Status Pill - Vibrant Emerald */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-600/50 text-emerald-300 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-bold tracking-wider text-[11px]">
            {language === 'id' ? 'STATUS: AKTIF' : 'SYSTEM: ACTIVE'}
          </span>
        </div>

        {/* Location - Azure Sky */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-950/60 border border-sky-600/40 text-sky-300">
          <MapPin className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[11px]">Bandung, ID (WIB)</span>
        </div>

        {/* Time - Solar Amber */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-600/40 text-amber-300">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-[11px]">{bandungTime ? `${bandungTime} WIB` : 'UTC+7'}</span>
        </div>

        {/* Spec - Royal Violet */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-950/60 border border-violet-600/40 text-violet-300">
          <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-[11px]">CPOB/GMP Enterprise Spec</span>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* CLI Button - Teal */}
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-950/80 hover:bg-teal-900 border border-teal-600/50 text-teal-300 hover:text-white transition-all shadow-sm"
          title="Buka Terminal CLI"
        >
          <Terminal className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-[11px] font-semibold">CLI Terminal</span>
          <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.2 text-[9px] bg-teal-950 rounded border border-teal-700/60 text-teal-300 font-bold">~</kbd>
        </button>

        {/* Palette - Fuchsia/Pink */}
        <button
          onClick={onOpenPalette}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/70 hover:bg-purple-900 border border-purple-600/40 text-purple-300 hover:text-white transition-all"
          title="Command Palette"
        >
          <Activity className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[11px] font-semibold">Commands</span>
          <kbd className="ml-1 px-1.5 text-[9px] bg-purple-950 rounded border border-purple-700/60 text-purple-300 font-bold">Ctrl+K</kbd>
        </button>

        {/* Language - Indigo/Blue */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-950/90 hover:bg-indigo-900 border border-indigo-500/60 text-indigo-200 hover:text-white transition-all font-sans font-semibold text-xs shadow-sm"
          title="Ganti Bahasa (ID / EN)"
        >
          <Globe className="w-3.5 h-3.5 text-indigo-400" />
          <span className="uppercase tracking-wider">{language}</span>
          <span className="text-[10px] text-indigo-400 font-mono">({language === 'id' ? 'ID' : 'EN'})</span>
        </button>
      </div>
    </aside>
  );
};

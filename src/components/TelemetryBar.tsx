import React, { useState, useEffect } from 'react';
import { Terminal, Clock, Activity, MapPin, Globe } from 'lucide-react';
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
      className="w-full bg-[#060818] border-b border-[#1c2452] px-4 py-2 text-xs font-mono flex flex-wrap items-center justify-between gap-3 select-none"
    >
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Arcade Stage Status Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-950/80 border border-[#00f0ff]/50 text-[#00f0ff] shadow-sm shadow-[#00f0ff]/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]"></span>
          </span>
          <span className="font-bold tracking-wider text-[11px] font-orbitron">
            {language === 'id' ? 'STAGE: PT PADEPOKAN 79' : 'STAGE: PT PADEPOKAN 79'}
          </span>
        </div>

        {/* Real-time Antigravity CLI Quota & Context Monitor */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#0b1028] border border-[#ff007f]/40 text-slate-300 shadow-sm shadow-[#ff007f]/10">
          <span className="text-[#00f0ff] font-semibold">🌐 3P: <span className="text-[#00ff9d]">100.0%</span></span>
          <span className="text-slate-600">│</span>
          <span className="text-[#ffe600] font-semibold">🧠 0% ctx</span>
        </div>

        {/* Location */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span className="text-[11px]">Bandung, ID (WIB)</span>
        </div>

        {/* Time */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-950/60 border border-[#ffe600]/40 text-[#ffe600]">
          <Clock className="w-3.5 h-3.5 text-[#ffe600]" />
          <span className="font-semibold text-[11px]">{bandungTime ? `${bandungTime} WIB` : 'UTC+7'}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* CLI Button - Neon Cyan */}
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-[#00f0ff]/60 text-[#00f0ff] hover:text-white transition-all shadow-sm shadow-[#00f0ff]/20 font-orbitron"
          title="Buka Terminal CLI Antigravity"
        >
          <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span className="text-[11px] font-bold">CLI [~]</span>
        </button>

        {/* Palette - Neon Pink */}
        <button
          onClick={onOpenPalette}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-pink-950/70 hover:bg-pink-900 border border-[#ff007f]/50 text-[#ff007f] hover:text-white transition-all shadow-sm font-orbitron"
          title="Command Palette"
        >
          <Activity className="w-3.5 h-3.5 text-[#ff007f]" />
          <span className="text-[11px] font-bold">CMD [Ctrl+K]</span>
        </button>

        {/* Language - Indigo/Blue */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#0e163b] hover:bg-[#162358] border border-cyan-500/40 text-cyan-200 hover:text-white transition-all font-sans font-semibold text-xs shadow-sm"
          title="Ganti Bahasa (ID / EN)"
        >
          <Globe className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span className="uppercase tracking-wider font-bold">{language}</span>
          <span className="text-[10px] text-cyan-400 font-mono">({language === 'id' ? 'ID' : 'EN'})</span>
        </button>
      </div>
    </aside>
  );
};

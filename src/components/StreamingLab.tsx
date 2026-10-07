import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Play, Pause, Wifi, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const StreamingLab: React.FC = () => {
  const { language } = useLanguage();

  const [isPlaying, setIsPlaying] = useState(true);
  const [networkSpeed, setNetworkSpeed] = useState<number>(50); // Mbps
  const [ambientGlow, setAmbientGlow] = useState(true);
  const [selectedScene, setSelectedScene] = useState<'cyberpunk' | 'matrix' | 'sunset'>('cyberpunk');
  const [bufferPercent, setBufferPercent] = useState(85);

  // Determine adaptive quality based on network speed
  const getQuality = (speed: number) => {
    if (speed >= 35) return { resolution: '1080p Full HD', bitrate: '6.5 Mbps', label: 'Ultra Jernih', color: '#00f0ff', badge: 'HD+' };
    if (speed >= 12) return { resolution: '720p HD', bitrate: '3.2 Mbps', label: 'Jernih Hemat Kuota', color: '#00ff9d', badge: 'HD' };
    if (speed >= 4) return { resolution: '480p Standar', bitrate: '1.2 Mbps', label: 'Stabil Tanpa Macet', color: '#ffe600', badge: 'SD' };
    return { resolution: '360p Hemat', bitrate: '0.6 Mbps', label: 'Sinyal Rendah (Anti-Buffering)', color: '#ff007f', badge: 'LOW' };
  };

  const currentQuality = getQuality(networkSpeed);

  // Ambient glow styles based on scene
  const sceneThemes = {
    cyberpunk: {
      name: 'Cyberpunk Tokyo',
      from: 'from-[#00f0ff]',
      to: 'to-[#ff007f]',
      glowColor: 'rgba(0, 240, 255, 0.45)',
      accentBorder: 'border-[#00f0ff]'
    },
    matrix: {
      name: 'Digital Matrix',
      from: 'from-[#00ff9d]',
      to: 'to-[#059669]',
      glowColor: 'rgba(0, 255, 157, 0.45)',
      accentBorder: 'border-[#00ff9d]'
    },
    sunset: {
      name: 'Sunset Neon',
      from: 'from-[#ffe600]',
      to: 'to-[#ff007f]',
      glowColor: 'rgba(255, 230, 0, 0.45)',
      accentBorder: 'border-[#ffe600]'
    }
  };

  const activeTheme = sceneThemes[selectedScene];

  // Dynamic buffer simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBufferPercent(prev => {
        const target = networkSpeed > 20 ? 95 : networkSpeed > 8 ? 70 : 45;
        if (prev < target) return Math.min(target, prev + 3);
        if (prev > target) return Math.max(target, prev - 2);
        return prev;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [networkSpeed, isPlaying]);

  return (
    <div className="space-y-8">
      {/* Intro Box: Non-IT Friendly Explanation */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-cyan-400 border border-cyan-500/30">
                KONSEP REAL-WORLD // ARCHITECTURE
              </span>
              <span className="text-xs font-mono text-slate-400">Proyek: LiveEuy Cinema Platform</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-100 font-sans">
              {language === 'id' 
                ? 'Bagaimana Video Streaming Menyesuaikan Sinyal Agar Tidak Buffering?' 
                : 'How Smart Streaming Eliminates Video Buffering When Signals Fluctuate'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {language === 'id'
                ? 'Pernahkah Anda streaming film lalu videonya macet dan berputar-putar karena internet melambat? Sistem cerdas ini memecah video menjadi potongan kecil (chunks). Saat sinyal Anda turun, resolusi diturunkan secara otomatis di latar belakang agar video Anda terus berputar mulus tanpa berhenti sedetik pun!'
                : 'Ever had a movie pause and buffer because of fluctuating mobile data? This streaming engine segments video into chunks and dynamically adapts the resolution in real time, guaranteeing continuous smooth playback without interruptions!'}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff9d] animate-ping" />
            <span className="text-xs font-mono text-[#00ff9d] font-bold">Simulator Aktif</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: The Simulated Video Player (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Cinema Player Container with Ambient Lighting */}
          <div className="relative">
            {/* Ambient Lighting Glow Behind Video Frame */}
            {ambientGlow && isPlaying && (
              <div
                className="absolute -inset-4 sm:-inset-6 rounded-3xl opacity-65 blur-2xl transition-all duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${activeTheme.glowColor} 0%, rgba(0,0,0,0) 70%)`
                }}
              />
            )}

            {/* Video Player Frame */}
            <div className="relative rounded-2xl bg-[#030614] border-2 border-[#1c2452] overflow-hidden shadow-2xl aspect-video flex flex-col justify-between p-4">
              
              {/* Top HUD inside Player */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-slate-200 font-bold">LIVEEUY CINEMA</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-[#00f0ff]">{activeTheme.name}</span>
                </div>

                <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] font-mono">
                  <span className="text-slate-400">Kualitas:</span>
                  <span className="font-bold px-1.5 py-0.2 rounded text-[10px]" style={{ color: currentQuality.color, backgroundColor: `${currentQuality.color}20` }}>
                    {currentQuality.resolution}
                  </span>
                </div>
              </div>

              {/* Center Animated Scene Simulation */}
              <div className="relative flex items-center justify-center my-auto">
                <motion.div
                  animate={isPlaying ? { scale: [1, 1.02, 1], rotate: [0, 0.5, -0.5, 0] } : {}}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className={`w-40 h-28 sm:w-56 sm:h-36 rounded-2xl bg-gradient-to-tr ${activeTheme.from} ${activeTheme.to} p-1 shadow-2xl flex items-center justify-center text-center`}
                >
                  <div className="w-full h-full bg-[#05091e]/90 rounded-xl flex flex-col items-center justify-center p-3 text-slate-100">
                    <span className="text-2xl sm:text-3xl mb-1">🎬</span>
                    <span className="text-xs sm:text-sm font-bold font-orbitron text-slate-100">{activeTheme.name}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      {isPlaying ? `Streaming @ ${currentQuality.bitrate}` : 'Player Paused'}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Player Controls & Buffer Indicator */}
              <div className="z-10 space-y-2 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 rounded bg-slate-800 hover:bg-[#00f0ff] hover:text-slate-950 text-slate-200 transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <span>01:42 / 02:18:00</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="text-slate-400">Buffer:</span>
                    <span className="text-[#00ff9d] font-bold">{bufferPercent}%</span>
                  </div>
                </div>

                {/* Buffer Bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-slate-600 transition-all duration-300"
                    style={{ width: `${bufferPercent}%` }}
                  />
                  <div
                    className="h-full bg-[#00f0ff] absolute top-0 left-0 transition-all duration-300"
                    style={{ width: `${Math.min(bufferPercent * 0.45, 100)}%` }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Quick Scene Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-slate-400">Pilih Adegan Film:</span>
            {(['cyberpunk', 'matrix', 'sunset'] as const).map(scene => (
              <button
                key={scene}
                onClick={() => setSelectedScene(scene)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedScene === scene
                    ? 'bg-slate-800 text-[#00f0ff] border border-[#00f0ff]/50 font-bold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {sceneThemes[scene].name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Speed Control & Impact Explainer (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Network Speed Simulator Slider */}
          <div className="p-5 rounded-2xl bg-[#080d24] border border-[#1c2452] space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-[#00f0ff]" />
                <span className="text-xs font-mono font-bold text-slate-200 uppercase">Simulasi Kecepatan Internet</span>
              </div>
              <span className="text-sm font-mono font-extrabold text-[#00f0ff] font-orbitron">{networkSpeed} Mbps</span>
            </div>

            {/* Slider */}
            <div>
              <input
                type="range"
                min="1"
                max="100"
                value={networkSpeed}
                onChange={e => setNetworkSpeed(Number(e.target.value))}
                className="w-full accent-[#00f0ff] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>1 Mbps (Sinyal Drop)</span>
                <span>50 Mbps (Normal)</span>
                <span>100 Mbps (Fiber Cepat)</span>
              </div>
            </div>

            {/* Quick Speed Presets */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={() => setNetworkSpeed(2)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500/50 text-[11px] font-mono text-slate-300 hover:text-red-400 text-center transition-colors cursor-pointer"
              >
                🐢 Sinyal Lemah (2 Mbps)
              </button>
              <button
                onClick={() => setNetworkSpeed(18)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-yellow-500/50 text-[11px] font-mono text-slate-300 hover:text-yellow-400 text-center transition-colors cursor-pointer"
              >
                📶 4G Biasa (18 Mbps)
              </button>
              <button
                onClick={() => setNetworkSpeed(65)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-[#00ff9d]/50 text-[11px] font-mono text-slate-300 hover:text-[#00ff9d] text-center transition-colors cursor-pointer"
              >
                🚀 WiFi Super (65 Mbps)
              </button>
            </div>

            {/* Ambient Glow Switcher */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-slate-300">Lampu Bioskop Ambient Glow:</span>
              </div>
              <button
                onClick={() => setAmbientGlow(!ambientGlow)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                  ambientGlow
                    ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/50'
                    : 'bg-slate-900 text-slate-500 border border-slate-800'
                }`}
              >
                {ambientGlow ? 'ON (MENYALA)' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Real-time Status Card */}
          <div className="p-4 rounded-xl bg-[#090f2b] border border-[#00f0ff]/30 text-xs font-mono space-y-2">
            <div className="text-slate-400 font-bold uppercase text-[10px]">Status Adaptif Saat Ini:</div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Resolusi Otomatis:</span>
              <span className="font-bold text-[#00f0ff]">{currentQuality.resolution}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Pengalaman Menonton:</span>
              <span className="font-bold text-[#00ff9d]">{currentQuality.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Risiko Video Macet (Buffering):</span>
              <span className="font-bold text-emerald-400">0% (Zero Dropouts)</span>
            </div>
          </div>

          {/* Under The Hood (Technical Insights for Recruiters) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1.5">
            <div className="text-slate-300 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>Di Balik Layar (Engineering Insight):</span>
            </div>
            <p className="leading-relaxed">
              Diimplementasikan menggunakan library <strong className="text-slate-200">HLS.js (.m3u8)</strong> dengan algoritma ABR (Adaptive Bitrate) yang membaca throughput koneksi pengguna per potongan segmen 2 detik, dipadu sampling warna dinamis <strong className="text-slate-200">HTML5 Canvas</strong> untuk ambient glow 60fps.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

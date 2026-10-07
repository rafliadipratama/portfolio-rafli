import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, SKILL_CATEGORIES } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TerminalConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: 'home' | 'projects' | 'experience' | 'labs' | 'skills' | 'contact') => void;
}

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ isOpen, onClose, onNavigate }) => {
  const { language } = useLanguage();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'system --info',
      output: (
        <div className="space-y-1.5 text-slate-300 font-mono">
          <div className="text-cyan-400 font-bold">
            💻 RAFLI ADIPRATAMA - DEVELOPER TERMINAL v3.0
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800 text-xs">
            <span className="text-cyan-400 font-semibold">ROLE: <span className="text-emerald-400">Software Engineer Intern</span></span>
            <span className="text-slate-600 mx-2">│</span>
            <span className="text-slate-300">PT. Padepokan 79 (MagangHub)</span>
            <span className="text-slate-600 mx-2">│</span>
            <span className="text-emerald-400">Sep 2026 - Sekarang</span>
          </div>
          <div className="text-slate-400 text-xs">
            Type <span className="text-cyan-400 font-bold">help</span> to view available system commands. Try <span className="text-emerald-400 font-bold">status</span>, <span className="text-cyan-400 font-bold">projects</span>, or <span className="text-indigo-400 font-bold">liveeuy</span>!
          </div>
        </div>
      )
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputVal.trim();
    if (!raw) return;

    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    setCommandHistory(prev => [...prev, raw]);
    setHistoryIndex(-1);

    let resultNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        resultNode = (
          <div className="space-y-1 text-slate-300 font-mono">
            <div className="text-[#00f0ff] font-bold font-mono">Daftar Perintah Sistem:</div>
            <div>• <span className="text-[#00ff9d] font-mono">status</span> - Cek status ketersediaan kerja, domisili, dan fokus engineering</div>
            <div>• <span className="text-[#00ff9d] font-mono">liveeuy</span> - Inspect LiveEuy cinematic streaming architecture</div>
            <div>• <span className="text-[#00ff9d] font-mono">padepokan</span> - View PT Padepokan 79 internship profile</div>
            <div>• <span className="text-[#00ff9d] font-mono">bio</span> - Overview of Rafli's professional profile</div>
            <div>• <span className="text-[#00ff9d] font-mono">skills</span> - Display tech stack & competencies matrix</div>
            <div>• <span className="text-[#00ff9d] font-mono">projects</span> - List deployed systems & applications</div>
            <div>• <span className="text-[#00ff9d] font-mono">exp</span> - Display industrial work history</div>
            <div>• <span className="text-[#00ff9d] font-mono">contact</span> - Output direct communication channels</div>
            <div>• <span className="text-[#00ff9d] font-mono">dino / game</span> - Play Cyber Dino 2D Pixel Endless Runner</div>
            <div>• <span className="text-[#00ff9d] font-mono">sudo hire</span> - Authorize recruitment pipeline (Easter Egg)</div>
            <div>• <span className="text-[#00ff9d] font-mono">clear</span> - Clear terminal session output</div>
            <div>• <span className="text-[#00ff9d] font-mono">exit</span> - Close terminal drawer</div>
          </div>
        );
        break;

      case 'status':
      case 'quota':
        resultNode = (
          <div className="p-3 rounded bg-[#070b22] border border-[#00f0ff]/40 text-slate-200 font-mono space-y-1.5 text-xs">
            <div className="text-[#00f0ff] font-bold font-mono">⚡ STATUS ENGINEERING & KETERSEDIAAN KERJA</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div>🟢 <span className="text-slate-400">Status:</span> <span className="text-[#00ff9d] font-bold">Open for Work (Full-time / Kontrak)</span></div>
              <div>📍 <span className="text-slate-400">Domisili:</span> <span className="text-slate-200 font-bold">Bandung / Jakarta (Onsite & Remote)</span></div>
              <div>🛠️ <span className="text-slate-400">Core Stack:</span> <span className="text-[#00f0ff] font-bold">TypeScript, React, Laravel, PHP</span></div>
              <div>🏢 <span className="text-slate-400">Posisi Terkini:</span> <span className="text-[#ffe600] font-bold">SE Intern @ PT Padepokan 79</span></div>
            </div>
            <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-1 mt-1">
              Fokus: Arsitektur perangkat lunak skala produksi, Clean Code, dan reliabilitas sistem.
            </div>
          </div>
        );
        break;

      case 'liveeuy':
        resultNode = (
          <div className="p-3 rounded bg-[#090d28] border border-[#ff007f]/40 text-slate-200 font-mono space-y-1 text-xs">
            <div className="text-[#ff007f] font-bold font-mono">🎬 LIVEEUY STREAMING PLATFORM</div>
            <div>Stack: React 18, TypeScript, Tailwind CSS, HLS.js, Lucide Icons</div>
            <div>Key Tech: Real-time Ambient Lighting Glow, Adaptive HLS Bitrate, 9-module Admin CMS</div>
            <div>Repo: <a href="https://github.com/rafliadipratama/LiveEuy" target="_blank" className="text-[#00f0ff] underline">github.com/rafliadipratama/LiveEuy</a></div>
          </div>
        );
        break;

      case 'padepokan':
        resultNode = (
          <div className="p-3 rounded bg-[#070b22] border border-[#ffe600]/40 text-slate-200 font-mono space-y-1 text-xs">
            <div className="text-[#ffe600] font-bold font-mono">🏢 PT PADEPOKAN 79 (MAGANGHUB)</div>
            <div>Role: Software Engineer Intern (MagangHub / MSIB)</div>
            <div>Focus: Clean Architecture, Enterprise Web Development, Agile Engineering, and System Scalability.</div>
          </div>
        );
        break;

      case 'bio':
        resultNode = (
          <div className="space-y-2 text-slate-300 font-mono text-xs">
            <div className="font-bold text-[#00f0ff]">{PERSONAL_INFO.name} ({PERSONAL_INFO.roleTitle[language]})</div>
            <div className="text-slate-300 leading-relaxed font-sans">{PERSONAL_INFO.bio[language]}</div>
            <div className="text-slate-400 text-xs">Based in {PERSONAL_INFO.location} • {PERSONAL_INFO.timezone}</div>
          </div>
        );
        break;

      case 'skills':
        resultNode = (
          <div className="space-y-3 font-mono text-xs">
            {SKILL_CATEGORIES.map((c, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-[#ffe600] font-bold"># {c.category[language]}</div>
                <div className="text-slate-300 text-xs">
                  {c.skills.map(s => `${s.name} (${s.experienceYears})`).join(', ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        resultNode = (
          <div className="space-y-2 font-mono text-xs">
            <div className="text-[#00f0ff] font-bold">Deployed Systems & Streaming Engines:</div>
            {PROJECTS.map(p => (
              <div key={p.id} className="text-xs">
                <span className="text-[#00ff9d] font-mono font-bold">[{p.category.toUpperCase()}]</span>{' '}
                <span className="text-slate-100 font-bold">{p.title}</span> -{' '}
                <span className="text-slate-400">{p.tagline[language]}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'exp':
        resultNode = (
          <div className="space-y-2 text-xs">
            {EXPERIENCES.map(e => (
              <div key={e.id} className="p-2.5 rounded bg-[#090d26] border border-[#1c2452]">
                <div className="font-bold text-slate-100 flex items-center justify-between">
                  <span>{e.company}</span>
                  {e.current && <span className="text-[10px] text-[#00ff9d] font-mono border border-[#00ff9d]/40 px-1.5 py-0.2 rounded">CURRENT</span>}
                </div>
                <div className="text-[#00f0ff]">{e.position[language]} | {e.period}</div>
                <div className="text-slate-400 mt-1">{e.summary[language]}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        resultNode = (
          <div className="space-y-1 text-slate-300 font-mono text-xs">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#00f0ff] underline">{PERSONAL_INFO.email}</a></div>
            <div>WhatsApp: <a href={PERSONAL_INFO.whatsappUrl} target="_blank" className="text-[#00ff9d] underline">{PERSONAL_INFO.phone}</a></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" className="text-[#00f0ff] underline">{PERSONAL_INFO.github}</a></div>
            <div>GitLab: <a href={PERSONAL_INFO.gitlab} target="_blank" className="text-[#ff5400] underline">{PERSONAL_INFO.gitlab}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" className="text-[#00f0ff] underline">{PERSONAL_INFO.linkedin}</a></div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        setInputVal('');
        return;

      case 'dino':
      case 'trex':
      case 'game':
      case 'play':
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.5 }
        });
        if (onNavigate) {
          onNavigate('labs');
        }
        window.location.hash = '#dino-runner';
        onClose();
        setInputVal('');
        return;

      case 'sudo':
        if (args[0] === 'hire') {
          confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.5 }
          });
          resultNode = (
            <div className="text-[#00ff9d] font-bold space-y-1">
              <div>🎉 [LEVEL UP // SUCCESS] Candidate unlocked! Outstanding choice.</div>
              <div className="text-slate-300 font-normal">
                Direct channel: Reach out via <a href={PERSONAL_INFO.whatsappUrl} target="_blank" className="text-[#00f0ff] underline">WhatsApp</a> or email <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#00f0ff] underline">{PERSONAL_INFO.email}</a>!
              </div>
            </div>
          );
        } else {
          resultNode = <div className="text-rose-400">sudo: permission denied. Try 'sudo hire'</div>;
        }
        break;

      default:
        resultNode = (
          <div className="text-rose-400 font-mono">
            command not found: '{cmd}'. Type <span className="text-[#00f0ff] underline cursor-pointer" onClick={() => setInputVal('help')}>help</span> for list.
          </div>
        );
    }

    setHistory(prev => [...prev, { command: raw, output: resultNode }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < commandHistory.length) {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className={`w-full bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isMaximized ? 'h-[95vh] max-w-[95vw]' : 'h-[600px] max-w-3xl'
        }`}
      >
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-semibold text-slate-200">
              rafli@workstation:~ [developer-console]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-4 text-slate-200 select-text bg-slate-950">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-emerald-400 font-bold">rafli@workstation:~$</span>
                <span className="text-slate-100">{item.command}</span>
              </div>
              <div className="pl-4 border-l border-slate-800 py-0.5">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <form onSubmit={handleCommand} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <span className="text-emerald-400 font-mono text-xs font-bold pl-1">rafli@workstation:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or any command..."
            className="flex-1 bg-transparent text-xs font-mono text-slate-100 focus:outline-none placeholder-slate-500"
          />
          <button type="submit" className="p-1 text-cyan-400 hover:text-white">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

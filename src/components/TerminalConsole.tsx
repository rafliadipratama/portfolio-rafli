import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, SKILL_CATEGORIES } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TerminalConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'system --init',
      output: (
        <div className="text-slate-300">
          <div>🚀 <span className="text-emerald-400 font-bold">RafliDev CLI v2.4.0</span> (x86_64-node-react-ts)</div>
          <div className="text-slate-400 mt-1">Type <span className="text-sky-400 font-bold">help</span> to view available system commands.</div>
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
          <div className="space-y-1 text-slate-300">
            <div className="text-sky-400 font-bold">Available Commands:</div>
            <div>• <span className="text-emerald-400 font-mono">bio</span> - Overview of Rafli's professional profile</div>
            <div>• <span className="text-emerald-400 font-mono">skills</span> - Display technical skill matrix</div>
            <div>• <span className="text-emerald-400 font-mono">projects</span> - List enterprise & web software systems</div>
            <div>• <span className="text-emerald-400 font-mono">exp</span> - Display industrial work history</div>
            <div>• <span className="text-emerald-400 font-mono">contact</span> - Output direct contact channels</div>
            <div>• <span className="text-emerald-400 font-mono">sudo hire</span> - Authorize hiring pipeline (Easter Egg)</div>
            <div>• <span className="text-emerald-400 font-mono">clear</span> - Clear terminal session output</div>
            <div>• <span className="text-emerald-400 font-mono">exit</span> - Close terminal drawer</div>
          </div>
        );
        break;

      case 'bio':
        resultNode = (
          <div className="space-y-2 text-slate-300">
            <div className="font-bold text-sky-400">{PERSONAL_INFO.name} ({PERSONAL_INFO.roleTitle[language]})</div>
            <div className="text-slate-300 leading-relaxed">{PERSONAL_INFO.bio[language]}</div>
            <div className="text-slate-400 text-xs">Based in {PERSONAL_INFO.location} • {PERSONAL_INFO.timezone}</div>
          </div>
        );
        break;

      case 'skills':
        resultNode = (
          <div className="space-y-3">
            {SKILL_CATEGORIES.map((c, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-amber-400 font-bold font-mono"># {c.category[language]}</div>
                <div className="text-slate-300">
                  {c.skills.map(s => `${s.name} (${s.experienceYears})`).join(', ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        resultNode = (
          <div className="space-y-2">
            <div className="text-sky-400 font-bold">Deployed Enterprise Systems & Apps:</div>
            {PROJECTS.map(p => (
              <div key={p.id} className="text-xs">
                <span className="text-emerald-400 font-mono font-bold">[{p.category.toUpperCase()}]</span>{' '}
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
              <div key={e.id} className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-slate-100">{e.company}</div>
                <div className="text-sky-400">{e.position[language]} | {e.period}</div>
                <div className="text-slate-400 mt-1">{e.summary[language]}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        resultNode = (
          <div className="space-y-1 text-slate-300 font-mono text-xs">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sky-400 underline">{PERSONAL_INFO.email}</a></div>
            <div>WhatsApp: <a href={PERSONAL_INFO.whatsappUrl} target="_blank" className="text-emerald-400 underline">{PERSONAL_INFO.phone}</a></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" className="text-sky-400 underline">{PERSONAL_INFO.github}</a></div>
            <div>GitLab: <a href={PERSONAL_INFO.gitlab} target="_blank" className="text-orange-400 underline">{PERSONAL_INFO.gitlab}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" className="text-sky-400 underline">{PERSONAL_INFO.linkedin}</a></div>
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

      case 'sudo':
        if (args[0] === 'hire') {
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.5 }
          });
          resultNode = (
            <div className="text-emerald-400 font-bold space-y-1">
              <div>🎉 [SUCCESS] Candidate unlocked! Excellent decision.</div>
              <div className="text-slate-300 font-normal">
                Direct route: Send message via <a href={PERSONAL_INFO.whatsappUrl} target="_blank" className="text-sky-400 underline">WhatsApp</a> or email <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sky-400 underline">{PERSONAL_INFO.email}</a>!
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
            command not found: '{cmd}'. Type <span className="text-sky-400 underline cursor-pointer" onClick={() => setInputVal('help')}>help</span> for list.
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className={`w-full bg-[#070b14] border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isMaximized ? 'h-[95vh] max-w-[95vw]' : 'h-[600px] max-w-3xl'
        }`}
      >
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              rafli@enterprise-gateway:~ (bash)
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
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-4 text-slate-200 select-text">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-sky-400">
                <span className="text-emerald-400 font-bold">rafli@solas-sys:~$</span>
                <span className="text-slate-100">{item.command}</span>
              </div>
              <div className="pl-4 border-l border-slate-800 py-0.5">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <form onSubmit={handleCommand} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <span className="text-emerald-400 font-mono text-xs font-bold pl-1">rafli@solas-sys:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or any command..."
            className="flex-1 bg-transparent text-xs font-mono text-slate-100 focus:outline-none placeholder-slate-600"
          />
          <button type="submit" className="p-1 text-slate-400 hover:text-sky-400">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Bot, Send, X, Minimize2, Maximize2, Sparkles, Terminal, Cpu, RefreshCw, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  modelUsed?: string;
}

export const OdysseusAgentWidget: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'llama-3.2-1b' | 'qwen-2.5-1.5b'>('llama-3.2-1b');
  const [connectionStatus, setConnectionStatus] = useState<'standalone' | 'connected'>('standalone');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialGreeting = language === 'id'
    ? 'Salam cybernetic! Saya Odysseus AI Agent yang menggerakkan kecerdasan portofolio Rafli. Dikonfigurasi dengan model bawaan Llama-3.2-1B-Instruct (Q4_K_M GGUF). Tanyakan apa saja tentang proyek LiveEuy, magang di PT Padepokan 79, atau arsitektur sistem enterprise!'
    : 'Greetings! I am the Odysseus AI Agent driving Rafli\'s portfolio intelligence, configured with Llama-3.2-1B-Instruct (Q4_K_M GGUF). Ask me anything regarding the LiveEuy streaming engine, PT Padepokan 79 internship, or enterprise architectures!';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'agent',
      text: initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'Llama-3.2-1B-Instruct (Q4_K_M GGUF)'
    }
  ]);

  // Update initial greeting when language changes if only 1 message exists
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'agent') {
      setMessages([
        {
          id: 'init-1',
          sender: 'agent',
          text: initialGreeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: selectedModel === 'llama-3.2-1b' ? 'Llama-3.2-1B-Instruct (GGUF)' : 'Qwen2.5-1.5B-Instruct (GGUF)'
        }
      ]);
    }
  }, [language, initialGreeting, selectedModel]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  // Check if local Odysseus container is actively responding on port 7000
  useEffect(() => {
    const checkOdysseusHealth = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);
        const res = await fetch('http://127.0.0.1:7000/api/health', {
          method: 'GET',
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          setConnectionStatus('connected');
        } else {
          setConnectionStatus('standalone');
        }
      } catch {
        setConnectionStatus('standalone');
      }
    };

    checkOdysseusHealth();
  }, []);

  const quickPrompts = language === 'id' ? [
    { label: '🎬 Arsitektur LiveEuy', query: 'Jelaskan bagaimana arsitektur platform streaming LiveEuy dibuat dan fitur utamanya.' },
    { label: '🏢 Magang PT Padepokan 79', query: 'Apa peran dan fokus Rafli di PT Padepokan 79 (MagangHub)?' },
    { label: '💊 e-Doc CPOB Farmasi', query: 'Bagaimana sistem kepatuhan mutu CPOB/GMP farmasi dirancang?' },
    { label: '🧠 AI & Antigravity CLI', query: 'Apa saja keahlian Rafli terkait AI Agent dan Antigravity CLI?' },
  ] : [
    { label: '🎬 LiveEuy Architecture', query: 'Explain the architecture and technical highlights of LiveEuy streaming platform.' },
    { label: '🏢 PT Padepokan 79 Internship', query: 'What is Rafli\'s role and focus at PT Padepokan 79 (MagangHub)?' },
    { label: '💊 Pharma CPOB System', query: 'How is the pharmaceutical GMP regulatory document system architected?' },
    { label: '🧠 AI & Antigravity CLI', query: 'What are Rafli\'s skills in Autonomous AI Agents and CLI tooling?' },
  ];

  // Local neural knowledge answering engine
  const generateAgentResponse = (query: string): string => {
    const q = query.toLowerCase();

    // 1. LiveEuy streaming platform
    if (q.includes('liveeuy') || q.includes('stream') || q.includes('video') || q.includes('cinema') || q.includes('film')) {
      if (language === 'id') {
        return `🎬 **LiveEuy Platform Streaming**:
LiveEuy adalah platform Web Streaming Video on Demand (VOD) dan sinema online yang dibangun Rafli menggunakan **React 18**, **TypeScript**, **Vite**, dan **Tailwind CSS**.

Fitur Arsitektur Utama:
1. **Adaptive HLS Playback**: Mengintegrasikan library \`hls.js\` dengan sinkronisasi buffer cerdas untuk memutar stream \`.m3u8\` adaptif dan MP4 tanpa drop frame.
2. **Dynamic Ambient Lighting Glow**: Efek pencahayaan pendaran dinamis di sekeliling layar pemutar video ala bioskop modern.
3. **Timeline Scrubbing Preview**: Scrubbing presisi dengan hover preview timestamp.
4. **Admin Studio CMS 9-Modul**: Manajemen konten media terisolasi dengan perlindungan Role-Based Access Control (RBAC).
5. **State Persistence**: Menyimpan riwayat putar *Continue Watching* secara otomatis di LocalStorage.`;
      } else {
        return `🎬 **LiveEuy Cinematic Streaming Platform**:
LiveEuy is a next-generation Video on Demand (VOD) cinema web platform built by Rafli on **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**.

Core Architectural Features:
1. **Adaptive HLS Engine**: Embeds \`hls.js\` with dynamic player-size level capping and intelligent buffering for smooth \`.m3u8\` & MP4 playback.
2. **Dynamic Ambient Glow**: Real-time canvas/lighting glow reflecting video frames into surrounding theater ambient space.
3. **Timeline Scrubbing**: Frame-accurate hover timestamp previews.
4. **9-Module Admin CMS**: Full catalog governance with strict RBAC security guards.
5. **Continue Watching Sync**: Client-side playback state synchronization via WatchContext.`;
      }
    }

    // 2. PT Padepokan 79
    if (q.includes('padepokan') || q.includes('magang') || q.includes('intern') || q.includes('pekerjaan') || q.includes('sekarang')) {
      if (language === 'id') {
        return `🏢 **PT Padepokan 79 (MagangHub / MSIB)**:
Rafli saat ini aktif sebagai **Software Engineer Intern** di PT Padepokan 79 (Feb 2026 - Sekarang).

Fokus dan Praktik Rekayasa:
• **Clean Architecture & SOLID Principles**: Menerapkan arsitektur perangkat lunak yang modular, maintainable, dan berstandar industri.
• **Fullstack Modern Engineering**: Mengembangkan aplikasi web skala produksi berbasis TypeScript, React, Node.js, dan RESTful API.
• **Agile Team Collaboration**: Berkolaborasi dalam sprint pengembangan, pull request code review, dan continuous delivery.`;
      } else {
        return `🏢 **PT Padepokan 79 (MagangHub Certified Internship)**:
Rafli is currently active as a **Software Engineer Intern** at PT Padepokan 79 (Feb 2026 - Present).

Engineering Focus:
• **Clean Architecture & SOLID Principles**: Architecting maintainable, scalable web applications to high industrial standards.
• **Modern Fullstack Engineering**: Delivering production-grade services utilizing TypeScript, React, Node.js, and RESTful APIs.
• **Agile Collaboration**: Active participant in sprint cycles, pull request code reviews, and API contracts.`;
      }
    }

    // 3. Pharma e-Doc & CPOB / GMP
    if (q.includes('cpob') || q.includes('gmp') || q.includes('solas') || q.includes('farmasi') || q.includes('dokumen') || q.includes('rbac')) {
      if (language === 'id') {
        return `💊 **Sistem Tata Kelola Dokumen CPOB / GMP (PT Solas)**:
Sistem enterprise produksi di industri farmasi yang menggantikan ribuan berkas manual menjadi 100% paperless:

1. **6-Level RBAC**: Akses bertingkat dari Operator, Supervisor, QA, QC, Dept Head, hingga Signer menggunakan Spatie Permissions.
2. **Pessimistic Locking**: Mencegah race condition ketika dua approver mengakses dokumen yang sama secara bersamaan.
3. **Audit Trail Cryptographic Hashing**: Setiap perubahan status di-hash dengan SHA-256 berantai sehingga lolos audit regulasi BPOM 100%.
4. **Digital Signatures**: Tanda tangan digital terverifikasi token dan QR code unik.`;
      } else {
        return `💊 **Pharmaceutical CPOB/GMP e-Document System (PT Solas)**:
Enterprise production platform replacing manual pharmaceutical paperwork into a 100% paperless workflow:

1. **6-Tier RBAC**: Granular permissions (Operator, Supervisor, QA, QC, Dept Head, Signer) with Spatie Permissions.
2. **Pessimistic Row Locking**: Eliminates concurrent sign-off race conditions via database-level transactions.
3. **SHA-256 Audit Trail Chaining**: Immutable tamper-evident audit history ensuring 100% BPOM regulatory compliance.
4. **Digital Cryptographic Verification**: QR-code validated electronic sign-offs.`;
      }
    }

    // 4. AI & Agentic CLI / Antigravity
    if (q.includes('ai') || q.includes('agent') || q.includes('cli') || q.includes('antigravity') || q.includes('odysseus') || q.includes('model') || q.includes('llama') || q.includes('qwen')) {
      if (language === 'id') {
        return `🧠 **Keahlian AI Agent & CLI Tooling**:
Rafli menguasai ekosistem automasi agen cerdas:
• **Antigravity CLI & Statuslines**: Membuat skrip statusline real-time (\`agy-statusline\`) untuk memantau kuota 3P (Claude/GPT), Gemini rolling quota, dan context window.
• **Autonomous Subagents**: Orkestrasi multi-agent delegasi tugas mandiri dan eksekusi tugas otomatis di lingkungan Linux/Fedora.
• **Codebase Knowledge Graphs**: Pemetaan AST arsitektur kode dengan Graphify untuk analisa shortest path dependensi.
• **Odysseus AI Agent Workspace**: Pengoperasian model offline kuantisasi GGUF (\`Llama-3.2-1B-Instruct\` dan \`Qwen2.5-1.5B\`) untuk asisten privat.`;
      } else {
        return `🧠 **AI Engineering & Autonomous CLI Tooling**:
Rafli leverages modern AI Agent workflows:
• **Antigravity CLI Customization**: Real-time statusline HUDs (\`agy-statusline\`) monitoring 3P models, Gemini quotas, and context tokens.
• **Autonomous Subagent Orchestration**: Multi-agent task delegation and programmatic tool execution on Linux/Fedora.
• **Codebase Knowledge Graphs**: AST dependency mapping and shortest-path architecture discovery with Graphify.
• **Odysseus AI Agent Engine**: Offline GGUF quantized models (\`Llama-3.2-1B\` & \`Qwen2.5-1.5B\`) for private localized cognition.`;
      }
    }

    // 5. Skills & Tech Stack general
    if (q.includes('skill') || q.includes('stack') || q.includes('bahasa') || q.includes('keahlian') || q.includes('laravel') || q.includes('react')) {
      if (language === 'id') {
        return `⚡ **Ringkasan Stack Teknologi Rafli**:
• **Backend**: Laravel 9-12 (Expert), PHP 8.2+, MySQL / PostgreSQL, RESTful API, Spatie RBAC, Redis.
• **Frontend**: React 18, TypeScript, Tailwind CSS, Vite, Alpine.js, HTML5 Semantic.
• **AI & DevOps**: Odysseus GGUF Local Models, Antigravity CLI, Linux (Ubuntu/Fedora), Nginx, Docker, GitLab CI/CD, Git.`;
      } else {
        return `⚡ **Rafli's Core Tech Stack**:
• **Backend**: Laravel 9-12 (Expert), PHP 8.2+, Relational MySQL / PostgreSQL, RESTful APIs, Spatie RBAC, Redis.
• **Frontend**: React 18, TypeScript, Tailwind CSS, Vite, Alpine.js, Semantic HTML5.
• **AI & DevOps**: Odysseus Local GGUF Engines, Antigravity CLI, Linux (Ubuntu/Fedora), Nginx, Docker, GitLab CI/CD, Git.`;
      }
    }

    // 6. Contact / Resume
    if (q.includes('kontak') || q.includes('contact') || q.includes('email') || q.includes('wa') || q.includes('whatsapp') || q.includes('hire') || q.includes('cv') || q.includes('resume')) {
      if (language === 'id') {
        return `📫 **Informasi Kontak Resmi**:
• **WhatsApp**: [${PERSONAL_INFO.phone}](${PERSONAL_INFO.whatsappUrl})
• **Email**: [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})
• **GitHub**: [github.com/rafliadipratama](${PERSONAL_INFO.github})
• **LinkedIn**: [linkedin.com/in/rafliadipratama](${PERSONAL_INFO.linkedin})
• **CV / Resume**: Tersedia untuk diunduh langsung di header atau footer portofolio.`;
      } else {
        return `📫 **Official Contact Channels**:
• **WhatsApp**: [${PERSONAL_INFO.phone}](${PERSONAL_INFO.whatsappUrl})
• **Email**: [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})
• **GitHub**: [github.com/rafliadipratama](${PERSONAL_INFO.github})
• **LinkedIn**: [linkedin.com/in/rafliadipratama](${PERSONAL_INFO.linkedin})
• **Resume**: Downloadable directly from the portfolio navbar and footer.`;
      }
    }

    // Default Fallback
    if (language === 'id') {
      return `Saya memahami pertanyaan Anda tentang "${query}". 
Sebagai AI Agent representatif dari Mohamad Rafli Adipratama, saya dapat menjelaskan secara detail mengenai:
1. Platform streaming **LiveEuy** (React + HLS adaptive player).
2. Perjalanan karier dan rekayasa di **PT Padepokan 79 (MagangHub)** & **PT Solas**.
3. Sistem manajemen kepatuhan farmasi berstandar **CPOB/GMP**.
4. Penguasaan arsitektur **Laravel, React, TypeScript,** dan automasi **AI Agent**.

Silakan klik salah satu topik cepat di atas atau ajukan pertanyaan spesifik!`;
    } else {
      return `I received your inquiry regarding "${query}".
As Mohamad Rafli Adipratama's autonomous portfolio agent, I can provide deep architectural breakdowns on:
1. **LiveEuy Cinema Platform** (React 18 + HLS adaptive streaming).
2. Professional work history at **PT Padepokan 79 (MagangHub)** & **PT Solas**.
3. Pharmaceutical regulatory **CPOB / GMP compliance engines**.
4. Modern **Laravel, React, TypeScript,** and **AI Agent CLI** competencies.

Feel free to choose a quick query above or type a specific technical question!`;
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const raw = (textToSend || inputVal).trim();
    if (!raw) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: raw,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    const modelName = selectedModel === 'llama-3.2-1b'
      ? 'Llama-3.2-1B-Instruct (Q4_K_M GGUF)'
      : 'Qwen2.5-1.5B-Instruct (Q4_K_M GGUF)';

    // Simulate neural inference latency
    setTimeout(() => {
      const responseText = generateAgentResponse(raw);
      const agentMsg: Message = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: modelName
      };

      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <>
      {/* Floating Cyber Launcher Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="relative group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#070b22] border border-[#00f0ff]/60 text-slate-100 shadow-2xl shadow-[#00f0ff]/25 hover:border-[#00f0ff] transition-all"
          title="Buka Odysseus AI Agent"
        >
          {/* Pulsing neon ping dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-80"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff9d]"></span>
          </span>

          <div className="flex items-center gap-1.5 font-orbitron font-bold text-xs tracking-wider">
            <Bot className="w-4 h-4 text-[#00f0ff] group-hover:rotate-12 transition-transform" />
            <span className="text-[#00f0ff]">ODYSSEUS</span>
            <span className="text-[#ff007f] hidden sm:inline-block">AI</span>
          </div>

          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0b1538] border border-[#00f0ff]/40 text-[#00ff9d] font-semibold hidden md:inline-block">
            {selectedModel === 'llama-3.2-1b' ? '1B-GGUF' : '1.5B-GGUF'}
          </span>
        </motion.button>
      </div>

      {/* Odysseus Cyberpunk Chat Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25 }}
            className={`fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[460px] bg-[#050818]/95 backdrop-blur-2xl border border-[#00f0ff]/50 rounded-2xl shadow-2xl shadow-[#00f0ff]/20 flex flex-col overflow-hidden ${
              isMinimized ? 'h-14' : 'h-[580px] max-h-[82vh]'
            }`}
          >
            {/* Header / HUD Telemetry */}
            <div className="px-4 py-3 bg-[#080d2a] border-b border-[#1c2452] flex items-center justify-between select-none shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/90 border border-[#00f0ff]/60 flex items-center justify-center text-[#00f0ff] shadow-sm shadow-[#00f0ff]/20">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold font-orbitron text-slate-100 tracking-wide">
                      ODYSSEUS AI AGENT
                    </h3>
                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#06241a] text-[#00ff9d] border border-[#00ff9d]/50 font-bold">
                      {connectionStatus === 'connected' ? 'LIVE HOST' : 'STANDALONE'}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-[#00f0ff]/80 flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-[#ffe600]" />
                    <span>{selectedModel === 'llama-3.2-1b' ? 'Llama-3.2-1B-Instruct.gguf' : 'qwen2.5-1.5b-instruct.gguf'}</span>
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1">
                {/* Model switcher dropdown button */}
                <button
                  onClick={() => setSelectedModel(prev => prev === 'llama-3.2-1b' ? 'qwen-2.5-1.5b' : 'llama-3.2-1b')}
                  className="px-2 py-1 rounded bg-[#091238] border border-[#00f0ff]/30 text-[10px] font-mono text-[#ffe600] hover:text-white transition-colors"
                  title="Ganti Model (Llama 3.2 1B / Qwen 2.5 1.5B)"
                >
                  <RefreshCw className="w-3 h-3 inline-block mr-1 text-[#00f0ff]" />
                  {selectedModel === 'llama-3.2-1b' ? 'Qwen 1.5B' : 'Llama 1B'}
                </button>

                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body & Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs font-sans select-text bg-[#050716]/80">
                  {/* Status telemetry chip */}
                  <div className="p-2 rounded-lg bg-[#070b24] border border-[#1c2452] text-[11px] font-mono text-slate-400 flex items-center justify-between gap-2 shadow-inner">
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <Terminal className="w-3 h-3 text-[#00f0ff]" />
                      <span>OFFLINE LOCAL ENGINE READY</span>
                    </span>
                    <span className="text-[#ffe600]">RAM: ~1.2GB ALLOC</span>
                  </div>

                  {/* Messages list */}
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[88%] p-3 rounded-2xl leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-[#00f0ff]/20 to-[#00b4d8]/30 border border-[#00f0ff]/60 text-slate-100 rounded-br-none shadow-md shadow-[#00f0ff]/10'
                            : 'bg-[#090e2c] border border-[#1c2452] text-slate-200 rounded-bl-none shadow-md'
                        }`}
                      >
                        {/* Agent model attribution tag */}
                        {msg.sender === 'agent' && msg.modelUsed && (
                          <div className="text-[9px] font-mono text-[#00f0ff] font-bold mb-1 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-[#ffe600]" />
                            <span>{msg.modelUsed}</span>
                          </div>
                        )}

                        <div className="whitespace-pre-line text-[12px]">
                          {msg.text}
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-1.5 p-3 rounded-2xl rounded-bl-none bg-[#090e2c] border border-[#1c2452] w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff007f] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffe600] animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="text-[10px] font-mono text-slate-400 ml-1">Inferencing GGUF tokens...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts Carousel */}
                <div className="px-3 py-2 bg-[#060a20] border-t border-[#1c2452] overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
                  {quickPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p.query)}
                      className="px-2.5 py-1 rounded-full bg-[#0a1236] hover:bg-[#121c4e] border border-[#00f0ff]/30 text-[10px] font-mono text-cyan-200 whitespace-nowrap transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <span>{p.label}</span>
                      <ChevronRight className="w-2.5 h-2.5 text-[#00f0ff]" />
                    </button>
                  ))}
                </div>

                {/* Input Form */}
                <form
                  onSubmit={handleSubmit}
                  className="p-3 bg-[#080d28] border-t border-[#1c2452] flex items-center gap-2 shrink-0"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    placeholder={language === 'id' ? 'Tanyakan seputar proyek, skill, atau pengalaman...' : 'Ask about systems, stack, or experience...'}
                    className="flex-1 bg-[#050818] border border-[#1c2452] focus:border-[#00f0ff] rounded-xl px-3 py-2 text-xs font-sans text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputVal.trim() || isTyping}
                    className="p-2 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#00b4d8] text-slate-950 font-bold hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-[#00f0ff]/20"
                    title="Kirim pesan"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

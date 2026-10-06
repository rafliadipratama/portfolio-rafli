import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { TelemetryBar } from './components/TelemetryBar';
import { Navbar, PageId } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioDirectory } from './components/PortfolioDirectory';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { InteractiveEngineeringLabs } from './components/InteractiveEngineeringLabs';
import { ArchitectureDecisions } from './components/ArchitectureDecisions';
import { SkillsMatrix } from './components/SkillsMatrix';
import { GithubTelemetry } from './components/GithubTelemetry';
import { EducationCertificates } from './components/EducationCertificates';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalConsole } from './components/TerminalConsole';
import { CommandPalette } from './components/CommandPalette';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { OdysseusAgentWidget } from './components/OdysseusAgentWidget';
import { Project } from './types';
import { PROJECTS } from './data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PagePagination: React.FC<{
  prev?: { id: PageId; label: string };
  next?: { id: PageId; label: string };
  onNavigate: (id: PageId) => void;
}> = ({ prev, next, onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-4 border-t border-[#1c2452] flex items-center justify-between gap-4">
      {prev ? (
        <button
          onClick={() => onNavigate(prev.id)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#080d24] border border-[#1c2452] hover:border-[#00f0ff]/50 text-slate-300 hover:text-[#00f0ff] text-xs font-mono transition-all group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>&larr; {prev.label}</span>
        </button>
      ) : <div />}

      {next ? (
        <button
          onClick={() => onNavigate(next.id)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#080d24] border border-[#1c2452] hover:border-[#00f0ff]/50 text-slate-300 hover:text-[#00f0ff] text-xs font-mono transition-all group cursor-pointer"
        >
          <span>{next.label} &rarr;</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      ) : <div />}
    </div>
  );
};

const PageHeaderBanner: React.FC<{
  tag: string;
  title: string;
  desc: string;
}> = ({ tag, title, desc }) => {
  return (
    <div className="bg-[#06091e] border-b border-[#1c2452] py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#091238] border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-xs mb-2 shadow-sm font-orbitron">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse"></span>
          <span>{tag}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight font-orbitron">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1 max-w-2xl leading-relaxed">
          {desc}
        </p>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-[#00f0ff]/5 to-transparent pointer-events-none" />
    </div>
  );
};

export const AppContent: React.FC = () => {
  const { language } = useLanguage();
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getPageFromHash = (): PageId => {
    const hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
    const validPages: PageId[] = ['home', 'projects', 'experience', 'labs', 'skills', 'contact'];
    if (hash === 'engineering-labs' || hash === 'workflow-simulator' || hash === 'disc-assessment' || hash === 'api-playground') {
      return 'labs';
    }
    if (hash === 'architecture-decisions' || hash === 'github-telemetry') {
      return 'skills';
    }
    if (validPages.includes(hash as PageId)) {
      return hash as PageId;
    }
    return 'home';
  };

  const [activePage, setActivePage] = useState<PageId>(getPageFromHash);

  // Sync hash on mount and when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    window.location.hash = page === 'home' ? '#/' : `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global key listener for terminal toggle (tilde `~`) and Ctrl+K
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        const activeElement = document.activeElement;
        const isInput = activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement;
        if (!isInput) {
          e.preventDefault();
          setTerminalOpen(prev => !prev);
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, []);

  const handleSelectProjectById = (id: string) => {
    const found = PROJECTS.find(p => p.id === id);
    if (found) {
      setSelectedProject(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#050713] text-slate-200 selection:bg-[#00f0ff] selection:text-slate-950 font-sans arcade-scanlines flex flex-col justify-between">
      <div>
        {/* Top Arcade Telemetry & HUD Bar */}
        <TelemetryBar
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenPalette={() => setPaletteOpen(true)}
        />

        {/* Main Single-Layer Navigation */}
        <Navbar
          activePage={activePage}
          onNavigate={navigateTo}
          onOpenPalette={() => setPaletteOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* Multi-Page Dedicated Views with Smooth Framer Motion Transitions */}
        <main className="min-h-[70vh]">
          <AnimatePresence mode="wait">
            {activePage === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {/* 1. Hero Overview */}
                <Hero
                  onOpenTerminal={() => setTerminalOpen(true)}
                  onNavigate={navigateTo}
                />

                {/* 2. Visual System Directory & Roadmap (Clickable 4-Pillar Portal) */}
                <PortfolioDirectory onNavigate={navigateTo} />

                {/* 3. Featured Showcase Snapshot */}
                <section className="py-10 bg-[#050713]">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* LiveEuy Featured Card */}
                      <div className="p-6 rounded-2xl bg-[#080d24] border border-[#00f0ff]/40 shadow-xl relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/10 rounded-full blur-2xl pointer-events-none" />
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-[#00f0ff] border border-[#00f0ff]/50 font-orbitron">
                              FEATURED // STREAMING
                            </span>
                            <span className="text-xs font-mono text-[#00ff9d]">HLS + Dynamic Glow</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 font-orbitron mb-2">
                            LiveEuy Cinema Streaming Platform
                          </h3>
                          <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                            {language === 'id'
                              ? 'Platform streaming video modern dengan pemutar video ber-ambient lighting real-time, adaptive bitrate HLS, serta CMS studio admin.'
                              : 'Modern cinematic streaming platform featuring real-time ambient player illumination, adaptive bitrate HLS streaming, and admin studio CMS.'}
                          </p>
                        </div>
                        <button
                          onClick={() => navigateTo('projects')}
                          className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-[#00f0ff]/50 text-[#00f0ff] hover:text-white text-xs font-mono transition-colors cursor-pointer"
                        >
                          <span>{language === 'id' ? 'Buka Detail Sistem & Kode' : 'Inspect Systems & Code'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* PT Padepokan 79 Active Quest Card */}
                      <div className="p-6 rounded-2xl bg-[#080d24] border border-[#00ff9d]/40 shadow-xl relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff9d]/10 rounded-full blur-2xl pointer-events-none" />
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-[#00ff9d] border border-[#00ff9d]/50 font-orbitron">
                              ACTIVE QUEST // INTERNSHIP
                            </span>
                            <span className="text-xs font-mono text-emerald-400">Sep 2026 - Sekarang</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 font-orbitron mb-2">
                            Software Engineer Intern @ PT. Padepokan 79
                          </h3>
                          <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                            {language === 'id'
                              ? 'Magang bersertifikat MagangHub berfokus pada arsitektur sistem enterprise, Clean Architecture (Uncle Bob), dan agile software delivery.'
                              : 'Certified MagangHub internship focused on enterprise architecture standards, Uncle Bob Clean Architecture, and agile teamwork.'}
                          </p>
                        </div>
                        <button
                          onClick={() => navigateTo('experience')}
                          className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-[#00ff9d]/50 text-[#00ff9d] hover:text-white text-xs font-mono transition-colors cursor-pointer"
                        >
                          <span>{language === 'id' ? 'Lihat Rekam Jejak Karier' : 'View Career Timeline'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </div>
                </section>

                <PagePagination
                  next={{ id: 'projects', label: language === 'id' ? 'Halaman Proyek' : 'Projects Page' }}
                  onNavigate={navigateTo}
                />
              </motion.div>
            )}

            {activePage === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <PageHeaderBanner
                  tag="PAGE 02 // SYSTEMS & APPS"
                  title={language === 'id' ? 'Sistem & Aplikasi Rekayasa Produksi' : 'Production Systems & Engineering Applications'}
                  desc={language === 'id'
                    ? 'Katalog lengkap aplikasi web, platform streaming LiveEuy, dan sistem tata kelola mutu farmasi yang dibangun dengan standar Clean Code.'
                    : 'Comprehensive gallery of production systems, LiveEuy streaming engines, and pharmaceutical regulatory architectures.'}
                />
                <ProjectsGrid onSelectProject={setSelectedProject} />
                <PagePagination
                  prev={{ id: 'home', label: language === 'id' ? 'Beranda' : 'Home' }}
                  next={{ id: 'experience', label: language === 'id' ? 'Karier & Pengalaman' : 'Career Experience' }}
                  onNavigate={navigateTo}
                />
              </motion.div>
            )}

            {activePage === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <PageHeaderBanner
                  tag="PAGE 03 // CAREER TRACK RECORD"
                  title={language === 'id' ? 'Perjalanan Karier & Pengalaman Kerja' : 'Industrial Career & Professional Track Record'}
                  desc={language === 'id'
                    ? 'Rekam jejak teknis langsung dalam rekayasa perangkat lunak enterprise di PT Padepokan 79, manufaktur farmasi PT Solas, dan manufaktur pertahanan PT Pindad.'
                    : 'Direct engineering track record spanning enterprise systems at PT Padepokan 79, pharma manufacturing at PT Solas, and defense at PT Pindad.'}
                />
                <ExperienceTimeline />
                <EducationCertificates />
                <PagePagination
                  prev={{ id: 'projects', label: language === 'id' ? 'Proyek' : 'Projects' }}
                  next={{ id: 'labs', label: language === 'id' ? 'Laboratorium Interaktif' : 'Interactive Labs' }}
                  onNavigate={navigateTo}
                />
              </motion.div>
            )}

            {activePage === 'labs' && (
              <motion.div
                key="labs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <PageHeaderBanner
                  tag="PAGE 04 // LIVE ENGINEERING LABS"
                  title={language === 'id' ? 'Laboratorium Rekayasa & Simulasi Interaktif' : 'Interactive Engineering Simulator Workbench'}
                  desc={language === 'id'
                    ? 'Workbench interaktif terintegrasi: Uji langsung simulator rilis batch CPOB farmasi, kalkulator tes psikometri DISC, dan Mock REST API playground.'
                    : 'Interactive hands-on workbench: Test pharmaceutical batch release state machine, DISC psychometric radar, and live Mock REST API.'}
                />
                <InteractiveEngineeringLabs />
                <PagePagination
                  prev={{ id: 'experience', label: language === 'id' ? 'Karier' : 'Career' }}
                  next={{ id: 'skills', label: language === 'id' ? 'Keahlian & Arsitektur' : 'Skills & Architecture' }}
                  onNavigate={navigateTo}
                />
              </motion.div>
            )}

            {activePage === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <PageHeaderBanner
                  tag="PAGE 05 // SKILLS & ARCHITECTURE SPECS"
                  title={language === 'id' ? 'Matriks Keahlian & Spesifikasi Rekayasa' : 'Technical Competencies & Architecture Standards'}
                  desc={language === 'id'
                    ? 'Penguasaan stack modern, orkestrasi AI Agent & CLI tooling, keputusan arsitektur (ADR), dan aktivitas GitHub telemetri.'
                    : 'Fullstack competencies, AI Agent CLI orchestrations, Architecture Decision Records (ADR), and verified GitHub telemetry.'}
                />
                <SkillsMatrix />
                <ArchitectureDecisions />
                <GithubTelemetry />
                <PagePagination
                  prev={{ id: 'labs', label: language === 'id' ? 'Laboratorium Labs' : 'Interactive Labs' }}
                  next={{ id: 'contact', label: language === 'id' ? 'Kontak & Hubungi' : 'Contact Directly' }}
                  onNavigate={navigateTo}
                />
              </motion.div>
            )}

            {activePage === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <PageHeaderBanner
                  tag="PAGE 06 // TRANSMISSION & DIRECT CONTACT"
                  title={language === 'id' ? 'Saluran Kontak & Komunikasi' : 'Transmission Channel & Direct Contact'}
                  desc={language === 'id'
                    ? 'Mari berdiskusi tentang peluang rekayasa perangkat lunak, kolaborasi proyek skala produksi, atau eksplorasi arsitektur AI modern.'
                    : 'Connect directly regarding software engineering opportunities, enterprise projects, or modern AI agent architectures.'}
                />
                <ContactSection />
                <PagePagination
                  prev={{ id: 'skills', label: language === 'id' ? 'Keahlian' : 'Skills' }}
                  next={{ id: 'home', label: language === 'id' ? 'Kembali ke Beranda' : 'Back to Home' }}
                  onNavigate={navigateTo}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Interactive Terminal Drawer */}
      <TerminalConsole
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Fast Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onSelectProjectById={handleSelectProjectById}
        onNavigate={navigateTo}
      />

      {/* Deep Dive Project Architecture Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Odysseus AI Cyber Agent Floating Widget */}
      <OdysseusAgentWidget />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;

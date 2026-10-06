import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar, PageId } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioDirectory } from './components/PortfolioDirectory';
import { Footer } from './components/Footer';
import { Project } from './types';
import { PROJECTS } from './data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Code-splitting dynamic page modules & modal widgets
const ProjectsGrid = lazy(() => import('./components/ProjectsGrid').then(m => ({ default: m.ProjectsGrid })));
const ExperienceTimeline = lazy(() => import('./components/ExperienceTimeline').then(m => ({ default: m.ExperienceTimeline })));
const EducationCertificates = lazy(() => import('./components/EducationCertificates').then(m => ({ default: m.EducationCertificates })));
const InteractiveEngineeringLabs = lazy(() => import('./components/InteractiveEngineeringLabs').then(m => ({ default: m.InteractiveEngineeringLabs })));
const SkillsMatrix = lazy(() => import('./components/SkillsMatrix').then(m => ({ default: m.SkillsMatrix })));
const ArchitectureDecisions = lazy(() => import('./components/ArchitectureDecisions').then(m => ({ default: m.ArchitectureDecisions })));
const GithubTelemetry = lazy(() => import('./components/GithubTelemetry').then(m => ({ default: m.GithubTelemetry })));
const ContactSection = lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })));
const TerminalConsole = lazy(() => import('./components/TerminalConsole').then(m => ({ default: m.TerminalConsole })));
const CommandPalette = lazy(() => import('./components/CommandPalette').then(m => ({ default: m.CommandPalette })));
const ProjectDetailModal = lazy(() => import('./components/ProjectDetailModal').then(m => ({ default: m.ProjectDetailModal })));
const OdysseusAgentWidget = lazy(() => import('./components/OdysseusAgentWidget').then(m => ({ default: m.OdysseusAgentWidget })));

const ModuleLoadingFallback: React.FC = () => (
  <div className="min-h-[40vh] flex flex-col items-center justify-center py-16">
    <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin mb-3"></div>
    <span className="text-xs font-mono text-slate-400">Memuat modul halaman...</span>
  </div>
);

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
    <div className="min-h-screen bg-[#070a14] text-slate-200 selection:bg-cyan-500 selection:text-slate-950 font-sans flex flex-col justify-between">
      <div>
        {/* Clean Single-Layer Navigation */}
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
                <section className="py-10 bg-[#070a14]">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* LiveEuy Featured Card */}
                      <div className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-800/50">
                              {language === 'id' ? 'Proyek Unggulan' : 'Featured Project'}
                            </span>
                            <span className="text-xs font-mono text-emerald-400">HLS Streaming & Ambient Glow</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 mb-2">
                            LiveEuy — Cinema Streaming Platform
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4">
                            {language === 'id'
                              ? 'Platform streaming video dengan pemutar video ber-ambient lighting real-time, adaptive bitrate HLS tanpa buffering, serta studio admin CMS.'
                              : 'Modern cinematic streaming platform featuring real-time ambient illumination, buffer-free adaptive HLS streaming, and admin studio CMS.'}
                          </p>
                        </div>
                        <button
                          onClick={() => navigateTo('projects')}
                          className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 hover:text-cyan-300 text-xs font-medium transition-colors cursor-pointer"
                        >
                          <span>{language === 'id' ? 'Buka Detail Sistem & Kode' : 'Inspect Systems & Code'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* PT Padepokan 79 Active Quest Card */}
                      <div className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-emerald-500/40 transition-all shadow-xl relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-800/50">
                              {language === 'id' ? 'Posisi Terkini' : 'Current Role'}
                            </span>
                            <span className="text-xs font-mono text-emerald-400">Sep 2026 - Sekarang</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 mb-2">
                            Software Engineer Intern @ PT. Padepokan 79
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4">
                            {language === 'id'
                              ? 'Magang bersertifikat MagangHub berfokus pada arsitektur sistem enterprise, standar Clean Architecture, dan pengembangan tim agile.'
                              : 'Certified MagangHub internship focused on enterprise architecture standards, Clean Architecture, and agile teamwork.'}
                          </p>
                        </div>
                        <button
                          onClick={() => navigateTo('experience')}
                          className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 hover:text-emerald-300 text-xs font-medium transition-colors cursor-pointer"
                        >
                          <span>{language === 'id' ? 'Lihat Riwayat Karier' : 'View Career Timeline'}</span>
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
                  tag={language === 'id' ? 'Halaman 02 • Proyek' : 'Page 02 • Projects'}
                  title={language === 'id' ? 'Sistem & Aplikasi Rekayasa Produksi' : 'Production Systems & Applications'}
                  desc={language === 'id'
                    ? 'Katalog aplikasi web, platform streaming LiveEuy, dan sistem tata kelola mutu farmasi yang dibangun dengan standar Clean Code.'
                    : 'Portfolio of production web applications, LiveEuy streaming platform, and compliance architectures.'}
                />
                <Suspense fallback={<ModuleLoadingFallback />}>
                  <ProjectsGrid onSelectProject={setSelectedProject} />
                </Suspense>
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
                  tag={language === 'id' ? 'Halaman 03 • Karier' : 'Page 03 • Career'}
                  title={language === 'id' ? 'Perjalanan Karier & Rekam Jejak Industri' : 'Industrial Career & Professional Track Record'}
                  desc={language === 'id'
                    ? 'Pengalaman rekayasa perangkat lunak di PT Padepokan 79, manufaktur farmasi PT Solas, dan manufaktur pertahanan PT Pindad.'
                    : 'Direct software engineering track record at PT Padepokan 79, pharmaceutical manufacturing at PT Solas, and defense at PT Pindad.'}
                />
                <Suspense fallback={<ModuleLoadingFallback />}>
                  <ExperienceTimeline />
                  <EducationCertificates />
                </Suspense>
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
                  tag={language === 'id' ? 'Halaman 04 • Laboratorium' : 'Page 04 • Labs'}
                  title={language === 'id' ? 'Laboratorium & Simulasi Sistem Interaktif' : 'Interactive Systems Simulator Workbench'}
                  desc={language === 'id'
                    ? 'Uji coba interaktif: adaptasi video streaming (LiveEuy), sistem anti-rebutan stok flash sale (Marketplace), dan kuis gaya kerja tim (DISC).'
                    : 'Interactive hands-on workbench: test adaptive video streaming (LiveEuy), flash sale anti-overselling lock, and workplace DISC talent quiz.'}
                />
                <Suspense fallback={<ModuleLoadingFallback />}>
                  <InteractiveEngineeringLabs />
                </Suspense>
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
                  tag={language === 'id' ? 'Halaman 05 • Keahlian' : 'Page 05 • Skills'}
                  title={language === 'id' ? 'Matriks Keahlian & Spesifikasi Rekayasa' : 'Technical Competencies & Architecture Standards'}
                  desc={language === 'id'
                    ? 'Penguasaan stack web modern, toolings otomatisasi CLI, keputusan arsitektur (ADR), dan aktivitas GitHub terverifikasi.'
                    : 'Fullstack web competencies, CLI toolings, Architecture Decision Records (ADR), and verified GitHub activity.'}
                />
                <Suspense fallback={<ModuleLoadingFallback />}>
                  <SkillsMatrix />
                  <ArchitectureDecisions />
                  <GithubTelemetry />
                </Suspense>
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
                  tag={language === 'id' ? 'Halaman 06 • Kontak' : 'Page 06 • Contact'}
                  title={language === 'id' ? 'Hubungi Saya & Saluran Komunikasi' : 'Direct Contact & Communication'}
                  desc={language === 'id'
                    ? 'Mari berdiskusi tentang peluang kerja sama, rekayasa perangkat lunak skala produksi, atau tanya jawab teknis.'
                    : 'Connect directly regarding software engineering opportunities, production web projects, or technical inquiries.'}
                />
                <Suspense fallback={<ModuleLoadingFallback />}>
                  <ContactSection />
                </Suspense>
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
      <Footer onNavigate={navigateTo} onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Interactive Terminal Drawer, Command Palette, Project Modal & Floating Widget */}
      <Suspense fallback={null}>
        <TerminalConsole
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />

        <CommandPalette
          isOpen={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          onOpenTerminal={() => setTerminalOpen(true)}
          onSelectProjectById={handleSelectProjectById}
          onNavigate={navigateTo}
        />

        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <OdysseusAgentWidget />
      </Suspense>
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

import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { TelemetryBar } from './components/TelemetryBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkflowSimulator } from './components/WorkflowSimulator';
import { DiscCalculator } from './components/DiscCalculator';
import { ApiPlayground } from './components/ApiPlayground';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsMatrix } from './components/SkillsMatrix';
import { GithubTelemetry } from './components/GithubTelemetry';
import { EducationCertificates } from './components/EducationCertificates';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalConsole } from './components/TerminalConsole';
import { CommandPalette } from './components/CommandPalette';
import { Project } from './types';
import { PROJECTS } from './data/portfolioData';

export const AppContent: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    <div className="min-h-screen bg-[#070a12] text-slate-200 selection:bg-sky-500 selection:text-slate-950 font-sans">
      {/* Real-time Telemetry Bar */}
      <TelemetryBar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      {/* Main Navigation */}
      <Navbar
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Main Content Flow */}
      <main>
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <WorkflowSimulator />
        <DiscCalculator />
        <ApiPlayground />
        <ProjectsGrid onSelectProject={setSelectedProject} />
        <ExperienceTimeline />
        <SkillsMatrix />
        <GithubTelemetry />
        <EducationCertificates />
        <ContactSection />
      </main>

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
      />

      {/* Deep Dive Project Architecture Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
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

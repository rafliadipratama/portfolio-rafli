import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { TelemetryBar } from './components/TelemetryBar';
import { Navbar } from './components/Navbar';
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
    <div className="min-h-screen bg-[#050713] text-slate-200 selection:bg-[#00f0ff] selection:text-slate-950 font-sans arcade-scanlines">
      {/* Top Arcade Telemetry & HUD Bar */}
      <TelemetryBar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      {/* Main Single-Layer Navigation */}
      <Navbar
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Main Content Flow - Clean Architecture & User Centric Order */}
      <main>
        {/* 1. Hero Overview */}
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />

        {/* 2. Visual System Directory & Roadmap (Eliminates visitor confusion) */}
        <PortfolioDirectory />

        {/* 3. Featured Production Systems (LiveEuy, e-Doc CPOB, Solas ATS) */}
        <ProjectsGrid onSelectProject={setSelectedProject} />

        {/* 4. Career Quests & Industrial Track Record (PT Padepokan 79, PT Solas, PT Pindad) */}
        <ExperienceTimeline />

        {/* 5. Unified Interactive Engineering Labs Suite (CPOB Sim, DISC Calculator, Mock REST API) */}
        <InteractiveEngineeringLabs />

        {/* 6. Technical Competencies & AI Agent CLI Matrix */}
        <SkillsMatrix />

        {/* 7. Architecture Decisions & Technical Rationale */}
        <ArchitectureDecisions />

        {/* 8. Telemetry & Credentials */}
        <GithubTelemetry />
        <EducationCertificates />

        {/* 9. Contact */}
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

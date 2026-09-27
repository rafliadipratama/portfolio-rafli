import React, { useState } from 'react';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  ExternalLink,
  Layers,
  Cpu,
  CheckCircle2,
  Database,
  FileCode2,
  Copy,
  Check,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { GithubIcon, GitlabIcon } from './SocialIcons';
import { DatabaseSchemaViewer } from './DatabaseSchemaViewer';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'features' | 'code' | 'schema'>('overview');
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.productionCode) {
      navigator.clipboard.writeText(project.productionCode.snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c1220] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-950/80 text-sky-400 border border-sky-800/40 uppercase">
                {project.category}
              </span>
              {project.badge && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                  {project.badge}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-100">{project.title}</h3>
            <p className="text-xs text-sky-300 font-mono mt-0.5">{project.role}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-[#090d16] px-5 text-xs font-mono overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-sky-400 text-sky-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'id' ? 'Ringkasan & Metrik' : 'Overview & Metrics'}
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-sky-400 text-sky-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'id' ? 'Arsitektur Sistem' : 'System Architecture'}
          </button>
          {project.productionCode && (
            <button
              onClick={() => setActiveTab('code')}
              className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'border-amber-400 text-amber-300 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'id' ? 'Kode Produksi' : 'Production Code'}</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('features')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'features'
                ? 'border-sky-400 text-sky-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'id' ? 'Fitur Rekayasa' : 'Engineering Features'}
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'id' ? 'Skema Basis Data (ERD)' : 'Database ERD'}</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">
                  {language === 'id' ? 'Deskripsi Teknis' : 'Technical Description'}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {project.description[language]}
                </p>
              </div>

              {project.impactHighlights && project.impactHighlights.length > 0 && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-600/30">
                  <h4 className="text-xs font-mono uppercase text-emerald-400 mb-3 flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{language === 'id' ? 'Sorotan Metrik Kinerja Nyata' : 'Verified Production Impact'}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {project.impactHighlights.map((impact, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                        <span className="text-xs font-mono font-semibold text-slate-200">
                          {impact[language]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.metrics && project.metrics.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase text-emerald-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {language === 'id' ? 'Dampak & Metrik Produksi' : 'Production Impact & Metrics'}
                  </h4>
                  <ul className="space-y-2">
                    {project.metrics.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                        <span className="text-emerald-400 mt-0.5">▹</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">
                  {language === 'id' ? 'Teknologi Kunci' : 'Technologies Used'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-mono uppercase text-sky-400 mb-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  {language === 'id' ? 'Pola Rekayasa Perangkat Lunak' : 'Software Design Pattern'}
                </h4>
                <p className="text-slate-300 leading-relaxed font-sans">
                  {project.architecture ? project.architecture[language] : (
                    language === 'id'
                      ? 'Arsitektur modular dengan pemisahan dependensi, middleware keamanan, dan manajemen state terdesentralisasi.'
                      : 'Modular architecture featuring strict dependency decoupling, security middleware, and reactive state management.'
                  )}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                <div className="text-sky-400">// Architectural Layers</div>
                <div>├─ Presentation Layer: Responsive Blade / React + Tailwind CSS</div>
                <div>├─ Authorization: Spatie RBAC Multi-guard with Policy Gates</div>
                <div>├─ Service & Domain: Business Logic, State Machine Transitions</div>
                <div>├─ Data Persistence: Relational Schemas, Indexed Foreign Keys</div>
                <div>└─ External Integrations: Webhook Listeners, PDF Render Engines</div>
              </div>
            </div>
          )}

          {activeTab === 'code' && project.productionCode && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-amber-950/20 border border-amber-600/30 rounded-xl">
                <div>
                  <h4 className="text-xs font-mono font-bold text-amber-300">
                    {project.productionCode.title[language]}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    File: <span className="text-slate-200">{project.productionCode.filename}</span>
                  </p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Kode</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-xl bg-[#080d18] border border-slate-800 overflow-hidden">
                <div className="p-4 overflow-x-auto max-h-[380px] overflow-y-auto">
                  <pre className="font-mono text-xs text-sky-200/90 leading-relaxed">
                    <code>{project.productionCode.snippet}</code>
                  </pre>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <div className="font-mono font-bold text-sky-400 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'id' ? 'Mengapa Pendekatan Ini Dipilih' : 'Architectural Rationale'}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {project.productionCode.rationale[language]}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-sky-400" />
                {language === 'id' ? 'Fitur & Kemampuan Sistem' : 'System Features & Capabilities'}
              </h4>
              <ul className="space-y-3">
                {project.keyFeatures[language].map((feature, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-sky-950 border border-sky-800 flex items-center justify-center text-[10px] font-mono text-sky-400 mt-0.5 flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-xs text-slate-200 leading-relaxed font-sans">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <DatabaseSchemaViewer />
            </div>
          )}
        </div>

        {/* Modal Footer with Links */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{language === 'id' ? 'Kunjungi Situs' : 'Live Demo'}</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {project.gitlabUrl && (
              <a
                href={project.gitlabUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
              >
                <GitlabIcon className="w-3.5 h-3.5 text-orange-400" />
                <span>GitLab</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white text-xs font-mono"
          >
            {language === 'id' ? 'Tutup' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

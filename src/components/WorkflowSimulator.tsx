import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Check, AlertCircle, Play, RotateCcw, Lock, FileCheck2, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

type Role = 'operator' | 'supervisor' | 'qa_officer' | 'dept_head' | 'signer';
type DocState = 'DRAFT' | 'DEPT_REVIEW' | 'QA_COMPLIANCE' | 'MANAGEMENT_APPROVAL' | 'SIGNED_AND_EFFECTIVE';

interface AuditLog {
  timestamp: string;
  step: string;
  actor: string;
  role: Role;
  hash: string;
  action: string;
}

export const WorkflowSimulator: React.FC = () => {
  const { language } = useLanguage();

  const [currentRole, setCurrentRole] = useState<Role>('operator');
  const [selectedDoc, setSelectedDoc] = useState<'SOP' | 'CAPA' | 'CHANGE_CONTROL'>('SOP');
  const [currentState, setCurrentState] = useState<DocState>('DRAFT');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      timestamp: new Date().toISOString(),
      step: 'INIT',
      actor: 'USR-8921 (Operator)',
      role: 'operator',
      hash: 'sha256-a9f24b81c2e01',
      action: 'Document drafted under GMP guidelines'
    }
  ]);

  const rolesConfig: { id: Role; label: string; permissions: string[] }[] = [
    {
      id: 'operator',
      label: '1. Production Operator',
      permissions: ['create_draft', 'view_revisions']
    },
    {
      id: 'supervisor',
      label: '2. Section Supervisor',
      permissions: ['review_draft', 'request_revision']
    },
    {
      id: 'qa_officer',
      label: '3. QA Compliance Specialist',
      permissions: ['audit_cpob', 'verify_capa', 'approve_qa']
    },
    {
      id: 'dept_head',
      label: '4. Department Head',
      permissions: ['approve_management']
    },
    {
      id: 'signer',
      label: '5. Qualified Person (Director/Signer)',
      permissions: ['apply_electronic_signature', 'release_document']
    }
  ];

  const stateMachineOrder: DocState[] = [
    'DRAFT',
    'DEPT_REVIEW',
    'QA_COMPLIANCE',
    'MANAGEMENT_APPROVAL',
    'SIGNED_AND_EFFECTIVE'
  ];

  const stepLabels: Record<DocState, { id: string; en: string }> = {
    DRAFT: { id: 'Draf Dokumen', en: 'Draft Mode' },
    DEPT_REVIEW: { id: 'Review Departemen', en: 'Dept Review' },
    QA_COMPLIANCE: { id: 'Audit Kepatuhan QA', en: 'QA Compliance' },
    MANAGEMENT_APPROVAL: { id: 'Persetujuan Manajemen', en: 'Mgmt Approval' },
    SIGNED_AND_EFFECTIVE: { id: 'Tersertifikasi & Berlaku', en: 'Signed & Effective' }
  };

  const advanceWorkflow = () => {
    setErrorMsg(null);

    // Validate RBAC
    if (currentState === 'DRAFT') {
      if (currentRole !== 'operator' && currentRole !== 'supervisor') {
        setErrorMsg(
          language === 'id'
            ? 'Akses Ditolak: Hanya Operator atau Supervisor yang dapat mengajukan Draf Dokumen ke Review.'
            : 'Access Denied: Only Operator or Supervisor can submit Draft for Review.'
        );
        return;
      }
      transitionTo('DEPT_REVIEW', 'Submitted draft to Section Supervisor review');
    } else if (currentState === 'DEPT_REVIEW') {
      if (currentRole !== 'supervisor' && currentRole !== 'dept_head') {
        setErrorMsg(
          language === 'id'
            ? 'Akses Ditolak: Hanya Supervisor atau Dept Head yang berwenang meloloskan review teknis departemen.'
            : 'Access Denied: Only Supervisor or Dept Head can approve departmental review.'
        );
        return;
      }
      transitionTo('QA_COMPLIANCE', 'Technical content approved, dispatched to QA Compliance team');
    } else if (currentState === 'QA_COMPLIANCE') {
      if (currentRole !== 'qa_officer') {
        setErrorMsg(
          language === 'id'
            ? 'Akses Ditolak: Kepatuhan CPOB/GMP memerlukan validasi formal dari QA Compliance Officer.'
            : 'Access Denied: CPOB/GMP compliance requires formal verification by QA Compliance Officer.'
        );
        return;
      }
      transitionTo('MANAGEMENT_APPROVAL', 'CPOB audit checklist verified, forwarded to Dept Head');
    } else if (currentState === 'MANAGEMENT_APPROVAL') {
      if (currentRole !== 'dept_head') {
        setErrorMsg(
          language === 'id'
            ? 'Akses Ditolak: Hanya Kepala Departemen (Dept Head) yang memiliki otorisasi persetujuan manajemen.'
            : 'Access Denied: Only Department Head has authorization to grant management sign-off.'
        );
        return;
      }
      transitionTo('SIGNED_AND_EFFECTIVE', 'Department Head approved, awaiting final digital signature');
    } else if (currentState === 'SIGNED_AND_EFFECTIVE') {
      if (currentRole !== 'signer') {
        setErrorMsg(
          language === 'id'
            ? 'Akses Ditolak: Hanya Qualified Person/Director yang memiliki kunci tanda tangan digital tersertifikasi.'
            : 'Access Denied: Only Qualified Person/Signer holds the cryptographic e-signature key.'
        );
        return;
      }
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      addLog('Electronic Signature stamped with SHA-256 hash & published to production archive.');
    }
  };

  const transitionTo = (nextState: DocState, actionDesc: string) => {
    setCurrentState(nextState);
    addLog(actionDesc);
    if (nextState === 'SIGNED_AND_EFFECTIVE') {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const addLog = (actionDesc: string) => {
    const newLog: AuditLog = {
      timestamp: new Date().toISOString(),
      step: currentState,
      actor: `USR-${Math.floor(1000 + Math.random() * 9000)} (${currentRole.toUpperCase()})`,
      role: currentRole,
      hash: `sha256-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 6)}`,
      action: actionDesc
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const resetSimulation = () => {
    setCurrentState('DRAFT');
    setErrorMsg(null);
    setCurrentRole('operator');
    setAuditLogs([
      {
        timestamp: new Date().toISOString(),
        step: 'RESET',
        actor: 'SYSTEM_ADMIN',
        role: 'operator',
        hash: 'sha256-reset-zero-state',
        action: 'Simulation state restored to initial clean draft.'
      }
    ]);
  };

  return (
    <section id="workflow-simulator" className="py-20 bg-[#090d18] border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-mono text-xs mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Interactive Enterprise Architecture Demo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
              {language === 'id' ? (
                <>Simulasi Workflow e-Document & RBAC CPOB</>
              ) : (
                <>GMP / CPOB e-Document RBAC Simulator</>
              )}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              {language === 'id'
                ? 'Fitur interaktif ini mereplikasi sistem e-Document farmasi yang dibangun Rafli di PT Solas Langgeng Sejahtera. Uji validasi aturan akses berjenjang (Role-Based Access Control) dan saksikan transisi state mesin secara real-time.'
                : 'This interactive simulator showcases the pharmaceutical e-Document state machine engineered by Rafli at PT Solas. Test strict multi-tier RBAC rules and observe cryptographic audit trail updates in real time.'}
            </p>
          </div>

          <button
            onClick={resetSimulation}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls & State Machine View */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Step 1: Select Active User Role */}
            <div className="p-5 rounded-2xl bg-[#0c1222] border border-slate-800">
              <label className="block text-xs font-mono text-sky-400 uppercase tracking-wider mb-2">
                {language === 'id' ? '1. Pilih Peran Pengguna Aktif (Simulasi Sesi Login)' : '1. Select Simulated Active User Session'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {rolesConfig.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setCurrentRole(r.id);
                      setErrorMsg(null);
                    }}
                    className={`px-3 py-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      currentRole === r.id
                        ? 'bg-sky-950/70 border-sky-500/80 text-sky-200 font-semibold shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{r.label}</span>
                    {currentRole === r.id && <Check className="w-3.5 h-3.5 text-sky-400 ml-1 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Document Context */}
            <div className="p-5 rounded-2xl bg-[#0c1222] border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                  {language === 'id' ? '2. Dokumen Regulasi Uji Coba' : '2. Target Regulated Document'}
                </span>
                <div className="flex gap-2">
                  {(['SOP', 'CAPA', 'CHANGE_CONTROL'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedDoc(type);
                        resetSimulation();
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-all ${
                        selectedDoc === type
                          ? 'bg-indigo-950 border-indigo-500 text-indigo-200 font-bold'
                          : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800/80 font-mono text-xs text-slate-300 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">DOC_ID:</span>
                  <span className="text-sky-300 font-semibold">
                    {selectedDoc === 'SOP' && 'SOP-PROD-2026-081 (Sanitasi Mesin Granulasi)'}
                    {selectedDoc === 'CAPA' && 'CAPA-QC-2026-042 (Penyimpangan Uji Disolusi Batch A4)'}
                    {selectedDoc === 'CHANGE_CONTROL' && 'CC-ENG-2026-019 (Upgrade Filter Udara HVAC Cleanroom)'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">STANDAR KEPATUHAN:</span>
                  <span className="text-emerald-400">BPOM RI / CPOB 2018 / PIC/S GMP Guide</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">INTEGRITAS DATA:</span>
                  <span className="text-amber-400">ALCOA+ Principle Compliant</span>
                </div>
              </div>
            </div>

            {/* Step 3: State Machine Diagram */}
            <div className="p-5 rounded-2xl bg-[#0c1222] border border-slate-800">
              <label className="block text-xs font-mono text-sky-400 uppercase tracking-wider mb-4">
                {language === 'id' ? '3. Tahapan State Machine e-Document' : '3. e-Document State Machine Pipeline'}
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {stateMachineOrder.map((step, index) => {
                  const isCurrent = currentState === step;
                  const isPast = stateMachineOrder.indexOf(currentState) > index;
                  const isEffective = step === 'SIGNED_AND_EFFECTIVE' && currentState === step;

                  return (
                    <div
                      key={step}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col justify-center items-center min-h-[80px] ${
                        isCurrent
                          ? isEffective
                            ? 'bg-emerald-950/80 border-emerald-500 shadow-md ring-1 ring-emerald-400'
                            : 'bg-sky-950/70 border-sky-400 shadow-md ring-1 ring-sky-400'
                          : isPast
                          ? 'bg-slate-900/40 border-emerald-800/40 text-emerald-400/80'
                          : 'bg-slate-950/50 border-slate-800/80 text-slate-500'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-slate-400 mb-1">Step {index + 1}</div>
                      <p className={`text-xs font-bold leading-tight ${isCurrent ? 'text-white' : ''}`}>
                        {stepLabels[step][language]}
                      </p>
                      <div className="mt-1.5">
                        {isPast ? (
                          <span className="inline-flex items-center text-[10px] text-emerald-400">✓ Selesai</span>
                        ) : isCurrent ? (
                          <span className="inline-flex items-center text-[10px] text-sky-300 font-semibold animate-pulse">● Aktif</span>
                        ) : (
                          <span className="inline-flex items-center text-[10px] text-slate-600">Menunggu</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Error banner if RBAC violation occurs */}
              {errorMsg && (
                <div className="mt-4 p-3 rounded-lg bg-rose-950/70 border border-rose-800 text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{language === 'id' ? 'Pelanggaran Otoritas RBAC: ' : 'RBAC Policy Rejection: '}</span>
                    <span>{errorMsg}</span>
                  </div>
                </div>
              )}

              {/* Action Trigger */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="text-xs text-slate-400">
                  <span>{language === 'id' ? 'Aksi Selanjutnya: ' : 'Next Action: '}</span>
                  <span className="font-mono text-slate-200 font-semibold">
                    {currentState === 'DRAFT' && (language === 'id' ? 'Ajukan ke Supervisor' : 'Submit to Supervisor')}
                    {currentState === 'DEPT_REVIEW' && (language === 'id' ? 'Verifikasi Teknis & Teruskan ke QA' : 'Approve & Pass to QA')}
                    {currentState === 'QA_COMPLIANCE' && (language === 'id' ? 'Validasi Kepatuhan CPOB' : 'Validate GMP Compliance')}
                    {currentState === 'MANAGEMENT_APPROVAL' && (language === 'id' ? 'Persetujuan Kepala Departemen' : 'Dept Head Sign-off')}
                    {currentState === 'SIGNED_AND_EFFECTIVE' && (language === 'id' ? 'Selesai: Dokumen Terkunci & Aktif' : 'Finished: Document Released')}
                  </span>
                </div>

                <button
                  onClick={advanceWorkflow}
                  disabled={currentState === 'SIGNED_AND_EFFECTIVE'}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold font-mono transition-all ${
                    currentState === 'SIGNED_AND_EFFECTIVE'
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                  }`}
                >
                  {currentState === 'SIGNED_AND_EFFECTIVE' ? (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>{language === 'id' ? 'Dokumen Sudah Berlaku' : 'Document Effective'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{language === 'id' ? 'Jalankan Aksi Transisi' : 'Execute State Transition'}</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Live Cryptographic Audit Trail Log Console */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full rounded-2xl bg-[#070b14] border border-slate-800 flex flex-col overflow-hidden shadow-xl">
              
              {/* Console header */}
              <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <span className="text-xs font-mono text-slate-300 font-semibold ml-2">
                    CPOB_AUDIT_TRAIL.log
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>IMMUTABLE</span>
                </div>
              </div>

              {/* Console Body */}
              <div className="p-4 flex-1 font-mono text-xs overflow-y-auto max-h-[460px] space-y-3">
                <div className="text-slate-500 text-[11px]">
                  # ISO 9001 / CPOB 2018 Audit Trail Subsystem initialized
                  <br /># Hash engine: SHA-256 with timestamp verification
                </div>

                <AnimatePresence>
                  {auditLogs.map((log, index) => (
                    <motion.div
                      key={`${log.timestamp}-${index}`}
                      initial={{ opacity: 0, x: 25, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="text-sky-400">{log.timestamp.slice(11, 19)} UTC</span>
                        <span className="text-amber-400">{log.hash}</span>
                      </div>
                      <div className="text-slate-200 font-semibold">
                        [{log.actor}] → <span className="text-emerald-400">{log.step}</span>
                      </div>
                      <div className="text-slate-400 text-[11px] leading-relaxed">
                        {log.action}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Bottom Console Note */}
              <div className="p-3 bg-slate-950 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" />
                  Spatie Laravel RBAC Service
                </span>
                <span className="text-emerald-400">200 OK</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Database, Key, Link2, Copy, Check, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ColumnDef {
  name: string;
  type: string;
  isPk?: boolean;
  isFk?: boolean;
  fkTarget?: string;
  fkRule?: string;
  isIndex?: boolean;
  isUnique?: boolean;
  nullable?: boolean;
  desc?: string;
}

interface TableDef {
  id: string;
  name: string;
  category: 'core' | 'rbac' | 'workflow' | 'audit';
  badgeColor: string;
  comment: { id: string; en: string };
  columns: ColumnDef[];
}

const SCHEMA_TABLES: TableDef[] = [
  {
    id: 'users',
    name: 'users',
    category: 'core',
    badgeColor: 'border-blue-500/40 bg-blue-950/60 text-blue-400',
    comment: {
      id: 'Master data personel terotentikasi farmasi dengan NIP terdaftar.',
      en: 'Authenticated pharmaceutical personnel master table with registered NIP.',
    },
    columns: [
      { name: 'id', type: 'BIGINT UNSIGNED', isPk: true, desc: 'Primary key identity' },
      { name: 'nip', type: 'VARCHAR(30)', isUnique: true, isIndex: true, desc: 'Nomor Induk Pegawai' },
      { name: 'name', type: 'VARCHAR(255)', desc: 'Nama lengkap personil' },
      { name: 'email', type: 'VARCHAR(255)', isUnique: true, isIndex: true },
      { name: 'department_id', type: 'INT UNSIGNED', isIndex: true },
      { name: 'status', type: "ENUM('ACTIVE','SUSPENDED')", desc: 'Akun status kontrol' },
      { name: 'created_at', type: 'TIMESTAMP' },
    ],
  },
  {
    id: 'roles',
    name: 'roles',
    category: 'rbac',
    badgeColor: 'border-purple-500/40 bg-purple-950/60 text-purple-400',
    comment: {
      id: 'Spatie Permission Master Role (Operator, QA, Qualified Person, dll).',
      en: 'Spatie Permission Master Role definitions (Operator, QA, QP, etc).',
    },
    columns: [
      { name: 'id', type: 'BIGINT UNSIGNED', isPk: true },
      { name: 'name', type: 'VARCHAR(125)', isUnique: true },
      { name: 'guard_name', type: 'VARCHAR(125)', desc: "'web' or 'api'" },
      { name: 'created_at', type: 'TIMESTAMP' },
    ],
  },
  {
    id: 'model_has_roles',
    name: 'model_has_roles',
    category: 'rbac',
    badgeColor: 'border-purple-500/40 bg-purple-950/60 text-purple-400',
    comment: {
      id: 'Pivot relasi M:N multi-tier peran pengguna Spatie RBAC.',
      en: 'M:N multi-tier role assignment pivot table for Spatie RBAC.',
    },
    columns: [
      { name: 'role_id', type: 'BIGINT UNSIGNED', isPk: true, isFk: true, fkTarget: 'roles.id', fkRule: 'ON DELETE CASCADE' },
      { name: 'model_type', type: 'VARCHAR(255)', isPk: true, desc: "App\\Models\\User" },
      { name: 'model_id', type: 'BIGINT UNSIGNED', isPk: true, isFk: true, fkTarget: 'users.id', fkRule: 'ON DELETE CASCADE' },
    ],
  },
  {
    id: 'documents',
    name: 'documents',
    category: 'workflow',
    badgeColor: 'border-cyan-500/40 bg-cyan-950/60 text-cyan-400',
    comment: {
      id: 'Dokumen regulasi e-CPOB (SOP/CAPA) dengan cryptographic hash ALCOA+.',
      en: 'Regulatory e-CPOB pharmaceutical documents with cryptographic hash.',
    },
    columns: [
      { name: 'id', type: 'BIGINT UNSIGNED', isPk: true },
      { name: 'doc_number', type: 'VARCHAR(50)', isUnique: true, isIndex: true, desc: 'e.g. SOP-PROD-2026-081' },
      { name: 'category', type: "ENUM('SOP','CAPA','CHANGE_CONTROL','VALIDATION')" },
      { name: 'version', type: 'VARCHAR(20)', desc: 'Semantic version v3.1.0' },
      { name: 'title', type: 'VARCHAR(255)' },
      { name: 'status', type: "ENUM('DRAFT','DEPT_REVIEW','QA_AUDIT','APPROVED','EFFECTIVE')", isIndex: true },
      { name: 'sha256_hash', type: 'CHAR(64)', isIndex: true, desc: 'SHA-256 tamper-proof digest' },
      { name: 'author_id', type: 'BIGINT UNSIGNED', isFk: true, fkTarget: 'users.id', fkRule: 'ON DELETE RESTRICT' },
      { name: 'created_at', type: 'TIMESTAMP' },
    ],
  },
  {
    id: 'approval_workflows',
    name: 'approval_workflows',
    category: 'workflow',
    badgeColor: 'border-emerald-500/40 bg-emerald-950/60 text-emerald-400',
    comment: {
      id: 'State machine transisi approval 5-tahap berjenjang.',
      en: 'Multi-stage 5-step approval workflow state transition table.',
    },
    columns: [
      { name: 'id', type: 'BIGINT UNSIGNED', isPk: true },
      { name: 'document_id', type: 'BIGINT UNSIGNED', isFk: true, fkTarget: 'documents.id', fkRule: 'ON DELETE CASCADE' },
      { name: 'step_level', type: 'TINYINT UNSIGNED', desc: '1 to 5 linear step' },
      { name: 'assigned_role', type: 'VARCHAR(125)' },
      { name: 'approved_by', type: 'BIGINT UNSIGNED', nullable: true, isFk: true, fkTarget: 'users.id', fkRule: 'ON DELETE RESTRICT' },
      { name: 'status', type: "ENUM('PENDING','APPROVED','REJECTED')" },
      { name: 'digital_signature', type: 'TEXT', nullable: true, desc: 'CA Root signed cryptographic payload' },
      { name: 'signed_at', type: 'TIMESTAMP', nullable: true },
    ],
  },
  {
    id: 'audit_trails',
    name: 'audit_trails',
    category: 'audit',
    badgeColor: 'border-rose-500/40 bg-rose-950/60 text-rose-400',
    comment: {
      id: 'Tabel audit immutable append-only (WORM) standar BPOM CPOB 2018.',
      en: 'Immutable append-only CPOB 2018 audit trail ledger (WORM compliance).',
    },
    columns: [
      { name: 'id', type: 'BIGINT UNSIGNED', isPk: true },
      { name: 'auditable_type', type: 'VARCHAR(100)', desc: "App\\Models\\Document" },
      { name: 'auditable_id', type: 'BIGINT UNSIGNED', isIndex: true },
      { name: 'action', type: 'VARCHAR(50)', desc: 'TRANSITION_APPROVE, TAMPER_CHECK' },
      { name: 'user_id', type: 'BIGINT UNSIGNED', isFk: true, fkTarget: 'users.id', fkRule: 'ON DELETE RESTRICT' },
      { name: 'payload_hash', type: 'CHAR(64)', desc: 'SHA-256 pre/post state hash' },
      { name: 'ip_address', type: 'VARCHAR(45)' },
      { name: 'created_at', type: 'TIMESTAMP', desc: 'Contemporaneous timestamp' },
    ],
  },
];

const RAW_SQL_DDL = `-- ========================================================
-- PRODUCTION DDL: CPOB Regulatory & Multi-Tier RBAC Schema
-- Architect: Mohamad Rafli Adipratama
-- Target: MySQL 8.0+ / PostgreSQL 15+ InnoDB
-- Compliance: BPOM CPOB 2018 / PIC/S GMP Guide Annex 11
-- ========================================================

CREATE TABLE \`users\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`nip\` VARCHAR(30) NOT NULL UNIQUE,
  \`name\` VARCHAR(255) NOT NULL,
  \`email\` VARCHAR(255) NOT NULL UNIQUE,
  \`department_id\` INT UNSIGNED NOT NULL,
  \`status\` ENUM('ACTIVE','SUSPENDED') DEFAULT 'ACTIVE',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_users_dept\` (\`department_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`roles\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(125) NOT NULL UNIQUE,
  \`guard_name\` VARCHAR(125) NOT NULL DEFAULT 'web',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE \`model_has_roles\` (
  \`role_id\` BIGINT UNSIGNED NOT NULL,
  \`model_type\` VARCHAR(255) NOT NULL,
  \`model_id\` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (\`role_id\`, \`model_id\`, \`model_type\`),
  CONSTRAINT \`fk_mhr_role\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_mhr_user\` FOREIGN KEY (\`model_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE \`documents\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`doc_number\` VARCHAR(50) NOT NULL UNIQUE,
  \`category\` ENUM('SOP','CAPA','CHANGE_CONTROL','VALIDATION') NOT NULL,
  \`version\` VARCHAR(20) NOT NULL DEFAULT 'v1.0.0',
  \`title\` VARCHAR(255) NOT NULL,
  \`status\` ENUM('DRAFT','DEPT_REVIEW','QA_AUDIT','APPROVED','EFFECTIVE') NOT NULL DEFAULT 'DRAFT',
  \`sha256_hash\` CHAR(64) NOT NULL COMMENT 'Tamper-proof cryptographic ALCOA+ signature',
  \`author_id\` BIGINT UNSIGNED NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_docs_status\` (\`status\`),
  INDEX \`idx_docs_hash\` (\`sha256_hash\`),
  CONSTRAINT \`fk_documents_author\` FOREIGN KEY (\`author_id\`) REFERENCES \`users\` (\`id\`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE \`approval_workflows\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`document_id\` BIGINT UNSIGNED NOT NULL,
  \`step_level\` TINYINT UNSIGNED NOT NULL,
  \`assigned_role\` VARCHAR(125) NOT NULL,
  \`approved_by\` BIGINT UNSIGNED NULL,
  \`status\` ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
  \`digital_signature\` TEXT NULL COMMENT 'CA Root signed payload',
  \`signed_at\` TIMESTAMP NULL,
  CONSTRAINT \`fk_workflow_document\` FOREIGN KEY (\`document_id\`) REFERENCES \`documents\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_workflow_approver\` FOREIGN KEY (\`approved_by\`) REFERENCES \`users\` (\`id\`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE \`audit_trails\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`auditable_type\` VARCHAR(100) NOT NULL,
  \`auditable_id\` BIGINT UNSIGNED NOT NULL,
  \`action\` VARCHAR(50) NOT NULL,
  \`user_id\` BIGINT UNSIGNED NOT NULL,
  \`payload_hash\` CHAR(64) NOT NULL,
  \`ip_address\` VARCHAR(45) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_audit_auditable\` (\`auditable_type\`, \`auditable_id\`),
  CONSTRAINT \`fk_audit_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE RESTRICT
  -- Note: Append-only table. UPDATE and DELETE grants revoked for application users.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;

export const DatabaseSchemaViewer: React.FC = () => {
  const { language } = useLanguage();
  const [activeView, setActiveView] = useState<'visual' | 'sql'>('visual');
  const [selectedTable, setSelectedTable] = useState<string>('documents');
  const [highlightedFk, setHighlightedFk] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const activeTableData = SCHEMA_TABLES.find((t) => t.id === selectedTable) || SCHEMA_TABLES[3];

  const handleCopySql = () => {
    navigator.clipboard.writeText(RAW_SQL_DDL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Subheader & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-slate-200">
            {language === 'id' ? 'Skema Relasional & ERD Farmasi' : 'Relational ERD & Database Schema'}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
            InnoDB ACID 3NF
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveView('visual')}
              className={`px-3 py-1 rounded transition-colors ${
                activeView === 'visual'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Visual ERD
            </button>
            <button
              onClick={() => setActiveView('sql')}
              className={`px-3 py-1 rounded transition-colors ${
                activeView === 'sql'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SQL DDL Script
            </button>
          </div>

          {activeView === 'sql' && (
            <button
              onClick={handleCopySql}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy DDL'}</span>
            </button>
          )}
        </div>
      </div>

      {activeView === 'visual' ? (
        <div className="space-y-4">
          {/* Table Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {SCHEMA_TABLES.map((table) => {
              const isSelected = selectedTable === table.id;
              return (
                <button
                  key={table.id}
                  onClick={() => setSelectedTable(table.id)}
                  className={`p-2.5 rounded-xl border text-left font-mono transition-all ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md ring-1 ring-cyan-400/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{table.category}</span>
                  </div>
                  <div className="text-xs font-bold truncate">{table.name}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{table.columns.length} columns</div>
                </button>
              );
            })}
          </div>

          {/* Selected Table Deep Dive Inspector */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-white bg-slate-900 px-2.5 py-1 rounded border border-slate-700">
                  TABLE: {activeTableData.name}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${activeTableData.badgeColor}`}>
                  {activeTableData.category.toUpperCase()}
                </span>
                {highlightedFk && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 animate-in fade-in duration-100">
                    Relasi Aktif: ➔ {highlightedFk}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 italic">
                {activeTableData.comment[language]}
              </p>
            </div>

            {/* Column Schema Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] text-slate-400">
                    <th className="py-2 px-3">Column Name</th>
                    <th className="py-2 px-3">Data Type</th>
                    <th className="py-2 px-3">Key / Constraint</th>
                    <th className="py-2 px-3">Referential Integrity (Cascade Rules)</th>
                    <th className="py-2 px-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {activeTableData.columns.map((col) => (
                    <tr
                      key={col.name}
                      onMouseEnter={() => col.isFk && setHighlightedFk(col.fkTarget || null)}
                      onMouseLeave={() => setHighlightedFk(null)}
                      className={`hover:bg-slate-900/60 transition-colors ${
                        col.isPk ? 'bg-amber-950/20' : col.isFk ? 'bg-cyan-950/20' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-semibold text-slate-200 flex items-center gap-1.5">
                        {col.isPk && (
                          <span title="Primary Key">
                            <Key className="w-3.5 h-3.5 text-amber-400" />
                          </span>
                        )}
                        {col.isFk && (
                          <span title="Foreign Key">
                            <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                          </span>
                        )}
                        <span>{col.name}</span>
                      </td>
                      <td className="py-2.5 px-3 text-cyan-300">{col.type}</td>
                      <td className="py-2.5 px-3">
                        {col.isPk && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800/50 text-amber-400 text-[10px]">
                            PK
                          </span>
                        )}
                        {col.isFk && (
                          <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 text-[10px]">
                            FK
                          </span>
                        )}
                        {col.isUnique && (
                          <span className="ml-1 px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-800/50 text-purple-400 text-[10px]">
                            UNIQUE
                          </span>
                        )}
                        {col.isIndex && !col.isPk && !col.isUnique && (
                          <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                            INDEX
                          </span>
                        )}
                        {!col.isPk && !col.isFk && !col.isUnique && !col.isIndex && (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3">
                        {col.isFk ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="text-cyan-400 font-semibold select-all">
                              ➔ {col.fkTarget}
                            </span>
                            <span className="text-[10px] text-slate-400">{col.fkRule}</span>
                          </div>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                        {col.desc || (col.nullable ? 'Nullable' : 'NOT NULL')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Entity Relational Diagram Map */}
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono space-y-2">
              <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Relationship Topologies for `{activeTableData.name}`:</span>
              </div>
              {activeTableData.id === 'documents' && (
                <div className="text-slate-300 space-y-1 text-[11px]">
                  <div>• <span className="text-blue-400">users (1)</span> ➔ <span className="text-cyan-400">documents (N)</span> via `author_id` [RESTRICT: User tidak dapat dihapus jika memiliki draf SOP]</div>
                  <div>• <span className="text-cyan-400">documents (1)</span> ➔ <span className="text-emerald-400">approval_workflows (N)</span> via `document_id` [CASCADE: Menghapus draf menghapus workflow turunan]</div>
                  <div>• <span className="text-cyan-400">documents (1)</span> ➔ <span className="text-rose-400">audit_trails (N)</span> via polymorphic `auditable_id` [IMMUTABLE: Tidak ada CASCADE, catatan permanen]</div>
                </div>
              )}
              {activeTableData.id === 'approval_workflows' && (
                <div className="text-slate-300 space-y-1 text-[11px]">
                  <div>• <span className="text-cyan-400">documents (1)</span> ➔ <span className="text-emerald-400">approval_workflows (N)</span> via `document_id`</div>
                  <div>• <span className="text-blue-400">users (1)</span> ➔ <span className="text-emerald-400">approval_workflows (N)</span> via `approved_by` (Nullable sampai disahkan)</div>
                </div>
              )}
              {activeTableData.id === 'users' && (
                <div className="text-slate-300 space-y-1 text-[11px]">
                  <div>• <span className="text-blue-400">users (1)</span> ➔ <span className="text-purple-400">model_has_roles (N)</span> via `model_id` (Spatie multi-guard)</div>
                  <div>• <span className="text-blue-400">users (1)</span> ➔ <span className="text-cyan-400">documents (N)</span> sebagai Author/Pembuat Dokumen</div>
                  <div>• <span className="text-blue-400">users (1)</span> ➔ <span className="text-rose-400">audit_trails (N)</span> sebagai Aktor Pelaksana Aksi</div>
                </div>
              )}
              {activeTableData.id === 'audit_trails' && (
                <div className="text-slate-300 space-y-1 text-[11px]">
                  <div>• <span className="text-blue-400">users (1)</span> ➔ <span className="text-rose-400">audit_trails (N)</span> via `user_id`</div>
                  <div>• Menggunakan prinsip WORM (Write Once, Read Many) sesuai persyaratan CPOB BPOM Bab 4 & Lampiran 11.</div>
                </div>
              )}
              {activeTableData.id === 'roles' && (
                <div className="text-slate-300 space-y-1 text-[11px]">
                  <div>• <span className="text-purple-400">roles (1)</span> ➔ <span className="text-purple-400">model_has_roles (N)</span> ➔ <span className="text-blue-400">users (N)</span></div>
                </div>
              )}
              {activeTableData.id === 'model_has_roles' && (
                <div className="text-slate-300 space-y-1 text-[11px]">
                  <div>• Pivot M:N relasi antara entitas `users` dan daftar wewenang `roles`.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* SQL DDL View */
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs overflow-auto max-h-[440px]">
          <pre className="text-slate-300 leading-relaxed selection:bg-cyan-900">
            {RAW_SQL_DDL}
          </pre>
        </div>
      )}
    </div>
  );
};

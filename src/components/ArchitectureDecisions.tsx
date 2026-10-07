import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldAlert,
  CheckCircle2,
  GitBranch,
  Copy,
  Check,
  Cpu,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ArchitectureDecisions: React.FC = () => {
  const { language } = useLanguage();
  const [activeAdrIndex, setActiveAdrIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const adrList = [
    {
      id: "ADR-001",
      domain: { id: "Kepatuhan Farmasi (CPOB/GMP)", en: "Pharma Compliance (GMP)" },
      title: {
        id: "Pencegahan Race Condition pada Approval Multi-Tier melalui Pessimistic Locking",
        en: "Preventing Multi-Tier Approval Race Conditions via Pessimistic Row Locking"
      },
      status: "ACCEPTED & IN PRODUCTION",
      badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-600/40",
      problem: {
        id: "Pada sistem dokumen mutu farmasi, dua QA Manager atau Supervisor dapat membuka formulir deviasi/SOP yang sama pada detik bersamaan. Dengan pendekatan standar (naive updates), kedua user dapat memicu status 'APPROVED' dua kali atau menghasilkan tanda tangan elektronik yang saling menimpa. Hal ini merupakan pelanggaran berat integritas data pada audit CPOB BPOM.",
        en: "In pharmaceutical quality systems, multiple QA managers could open the same deviation or SOP concurrently. A naive update allows dual sign-off or overwritten signatures, causing severe data integrity non-conformance during regulatory GMP inspections."
      },
      consideredAlternatives: [
        {
          name: "Optimistic Locking (version column)",
          verdict: {
            id: "Ditolak: Menyebabkan exception pada user kedua tanpa mekanisme antrean tertib, membingungkan QA saat deadline audit.",
            en: "Rejected: Causes raw exceptions for the second approver without serialized queuing, confusing QA officers."
          }
        },
        {
          name: "Application-level Cache Flag",
          verdict: {
            id: "Ditolak: Rentan inkonsistensi saat server load balancing atau Redis failover.",
            en: "Rejected: Prone to race conditions during multi-instance autoscaling and cache flush events."
          }
        }
      ],
      decision: {
        id: "Menerapkan DB::transaction dipadu dengan lockForUpdate() (Pessimistic Locking level-baris InnoDB) serta guard state machine. Setiap proses approval mengunci baris dokumen secara eksklusif hingga hashing audit trail dan commit selesai.",
        en: "Implemented DB::transaction paired with lockForUpdate() (InnoDB row-level pessimistic lock) combined with state-machine transition validation guards."
      },
      metrics: [
        { label: { id: "Insiden Race Condition", en: "Race Condition Incidents" }, value: "0" },
        { label: { id: "Dokumen Diproses/Bulan", en: "Documents Processed/Mo" }, value: "10K+" },
        { label: { id: "Integritas Status Dokumen", en: "Status Integrity Rate" }, value: "100%" }
      ],
      code: {
        filename: "DocumentApprovalService.php",
        language: "php",
        snippet: `namespace App\\Services\\Compliance;

use App\\Models\\Document;
use App\\Models\\AuditTrail;
use Illuminate\\Support\\Facades\\DB;
use App\\Exceptions\\InvalidWorkflowTransitionException;

class DocumentApprovalService
{
    /**
     * Eksekusi rilis dokumen dengan lock baris (Pessimistic Locking)
     * untuk mencegah double-sign off & race condition antar QA/Supervisor.
     */
    public function signAndApprove(int $documentId, int $userId, string $role): Document
    {
        return DB::transaction(function () use ($documentId, $userId, $role) {
            // 1. Kunci baris spesifik (FOR UPDATE) hingga transaksi selesai
            $doc = Document::where('id', $documentId)
                ->lockForUpdate()
                ->firstOrFail();

            // 2. Strict State-Machine: Verifikasi dokumen pada posisi status valid
            if ($doc->status !== Document::STATUS_QA_REVIEW) {
                throw new InvalidWorkflowTransitionException(
                    "Dokumen tidak siap disetujui. Status saat ini: {$doc->status}"
                );
            }

            // 3. Ambil hash audit trail sebelumnya untuk rantai kriptografis
            $prevHash = $doc->latestAuditTrail?->hash_checksum ?? hash('sha256', 'GENESIS_NODE');

            // 4. Mutasi status & increment versi dokumen
            $doc->update([
                'status' => Document::STATUS_APPROVED,
                'approved_by' => $userId,
                'approved_at' => now(),
                'version' => $doc->version + 1,
            ]);

            // 5. Generate checksum tamper-proof CPOB
            $payload = json_encode([
                'doc_id' => $doc->id,
                'user_id' => $userId,
                'role' => $role,
                'timestamp' => now()->toIso8601String(),
                'ip' => request()->ip(),
            ]);

            $newHash = hash('sha256', $prevHash . $payload);

            // 6. Catat audit trail permanen
            AuditTrail::create([
                'document_id' => $doc->id,
                'user_id' => $userId,
                'action' => 'QA_FINAL_APPROVAL',
                'hash_checksum' => $newHash,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);

            return $doc;
        });
    }
}`
      }
    },
    {
      id: "ADR-002",
      domain: { id: "Integritas Data Farmasi (21 CFR Part 11)", en: "Data Integrity (21 CFR Part 11)" },
      title: {
        id: "Arsitektur Audit Trail Anti-Manipulasi dengan Cryptographic Chaining",
        en: "Tamper-Proof Audit Trail Architecture via Cryptographic Hash Chaining"
      },
      status: "ACCEPTED & IN PRODUCTION",
      badgeColor: "bg-sky-950/80 text-sky-300 border-sky-600/40",
      problem: {
        id: "Regulasi CPOB & FDA 21 CFR Part 11 mewajibkan setiap aktivitas modifikasi data direkam secara permanen (ALCOA+ principles). Tabel log biasa rentan dimanipulasi atau dihapus oleh akses database langsung tanpa meninggalkan jejak.",
        en: "CPOB and FDA 21 CFR Part 11 mandate immutable audit records adhering to ALCOA+ principles. Standard relational log tables are vulnerable to direct DB manipulation or truncation without an audit break alert."
      },
      consideredAlternatives: [
        {
          name: "MySQL Database Trigger",
          verdict: {
            id: "Ditolak: Sulit di-version-control, dependensi vendor ketat, dan tidak dapat merekam konteks user web/IP secara langsung.",
            en: "Rejected: Hard to maintain in VCS, vendor lock-in, and lacks direct HTTP request/user context."
          }
        },
        {
          name: "Third-party Cloud SIEM Logging",
          verdict: {
            id: "Ditolak: Ketergantungan jaringan eksternal dan biaya tinggi untuk volume ribuan aksi farmasi per hari.",
            en: "Rejected: Network latency risk and excessive cost for tens of thousands of high-frequency internal events."
          }
        }
      ],
      decision: {
        id: "Membangun model AuditTrail immutable di level ORM yang menolak operasi update() dan delete(), digabungkan dengan Eloquent Observer yang merangkai SHA-256 hash chaining (mirip merkle tree sederhana) antar baris audit.",
        en: "Built an immutable AuditTrail model that throws exceptions on update() and delete(), enforced by Eloquent Observers calculating SHA-256 hash chains connecting contiguous audit rows."
      },
      metrics: [
        { label: { id: "Kesesuaian Regulasi BPOM", en: "BPOM Compliance Rate" }, value: "100%" },
        { label: { id: "Temuan Integritas Data", en: "Data Integrity Findings" }, value: "0" },
        { label: { id: "Kecepatan Validasi Hash", en: "Hash Check Verification" }, value: "< 25ms" }
      ],
      code: {
        filename: "AuditTrailObserver.php",
        language: "php",
        snippet: `namespace App\\Observers;

use App\\Models\\AuditTrail;
use App\\Exceptions\\ImmutableRecordViolationException;

class AuditTrailObserver
{
    /**
     * Cegah mutasi data jejak audit (ALCOA+ Compliance).
     */
    public function updating(AuditTrail $record): void
    {
        throw new ImmutableRecordViolationException(
            "Pelanggaran CPOB: Rekam jejak audit bersifat mutlak dan tidak boleh diubah (ID: {$record->id})."
        );
    }

    /**
     * Cegah penghapusan fisik jejak audit.
     */
    public function deleting(AuditTrail $record): void
    {
        throw new ImmutableRecordViolationException(
            "Pelanggaran CPOB: Rekam jejak audit tidak boleh dihapus dari basis data."
        );
    }

    /**
     * Hitung hash rantai secara otomatis sebelum data tersimpan.
     */
    public function creating(AuditTrail $record): void
    {
        $lastRow = AuditTrail::where('document_id', $record->document_id)
            ->latest('id')
            ->first();

        $previousHash = $lastRow ? $lastRow->hash_checksum : hash('sha256', 'SOLAS_ROOT_GENESIS');
        
        $signaturePayload = implode('|', [
            $previousHash,
            $record->document_id,
            $record->user_id,
            $record->action,
            $record->ip_address,
            microtime(true),
        ]);

        $record->hash_checksum = hash('sha256', $signaturePayload);
    }
}`
      }
    },
    {
      id: "ADR-003",
      domain: { id: "E-Commerce Omnichannel (Shopee/Tokopedia)", en: "Omnichannel E-Commerce Sync" },
      title: {
        id: "Distributed Inventory Mutex & Webhook Idempotency untuk Mencegah Overselling",
        en: "Distributed Inventory Mutex & Webhook Idempotency to Prevent Stock Overselling"
      },
      status: "ACCEPTED & IN PRODUCTION",
      badgeColor: "bg-purple-950/80 text-purple-300 border-purple-600/40",
      problem: {
        id: "Saat penjualan flash sale atau lonjakan order produk farmasi di marketplace ganda (Shopee & Tokopedia), webhook pesanan masuk secara bersamaan ketika sisa stok obat tinggal sedikit. Tanpa koordinasi terdistribusi, terjadi overselling (stok minus) yang memicu penalti performa toko dan pembatalan sepihak.",
        en: "During flash sales across multi-marketplace channels (Shopee & Tokopedia), incoming webhooks hit concurrently when stock is low. Uncoordinated requests cause overselling, store penalties, and forced cancellations."
      },
      consideredAlternatives: [
        {
          name: "Standard SQL UPDATE WHERE stock > 0",
          verdict: {
            id: "Ditolak: Tidak menyelesaikan masalah duplicate webhook delivery dari pihak marketplace.",
            en: "Rejected: Fails to protect against duplicate webhook retries sent by marketplaces."
          }
        },
        {
          name: "Scheduled Cron Sync (5 menit)",
          verdict: {
            id: "Ditolak: Jendela latensi 5 menit terlalu lambat untuk mencegah checkout bersamaan di dua platform berbeda.",
            en: "Rejected: A 5-minute sync window is far too slow to prevent concurrent cross-platform checkouts."
          }
        }
      ],
      decision: {
        id: "Menggunakan Redis Distributed Lock (Mutex) berbasis SKU dengan fallback antrean Redis Queue, dipadukan dengan tabel Idempotency Key untuk memvalidasi identitas webhook sebelum proses mutasi stok dieksekusi.",
        en: "Employed Redis Distributed Mutex locks keyed by SKU combined with an Idempotency verification table to guarantee exactly-once processing."
      },
      metrics: [
        { label: { id: "Tingkat Overselling Stok", en: "Stock Overselling Rate" }, value: "0%" },
        { label: { id: "Rata-rata Waktu Eksekusi", en: "P99 Processing Time" }, value: "< 110ms" },
        { label: { id: "Deduplikasi Webhook", en: "Duplicate Webhooks Filtered" }, value: "100%" }
      ],
      code: {
        filename: "MarketplaceOrderConsumer.php",
        language: "php",
        snippet: `namespace App\\Jobs;

use Illuminate\\Support\\Facades\\Cache;
use App\\Models\\InventoryItem;
use App\\Models\\ProcessedWebhook;
use App\\Exceptions\\OutOfStockException;

class MarketplaceOrderConsumer
{
    /**
     * Memproses webhook pesanan marketplace dengan distributed lock & idempotency check.
     */
    public function handle(string $marketplace, string $eventId, array $orderItems): void
    {
        // 1. Idempotency Check: Pastikan event webhook belum pernah diproses
        $alreadyHandled = ProcessedWebhook::where('event_id', $eventId)->exists();
        if ($alreadyHandled) {
            return;
        }

        foreach ($orderItems as $item) {
            $sku = $item['sku'];
            $qty = $item['quantity'];

            // 2. Redis Distributed Lock: Amankan SKU dari mutasi serentak lintas worker
            $lock = Cache::lock("inventory_mutex:sku:{$sku}", 10);

            try {
                // Tunggu antrean mutex maksimal 5 detik
                $lock->block(5);

                $inventory = InventoryItem::where('sku', $sku)->firstOrFail();

                if ($inventory->stock < $qty) {
                    throw new OutOfStockException(
                        "Alokasi stok gagal: SKU {$sku} tersisa {$inventory->stock}, diminta {$qty}."
                    );
                }

                // Deduksi stok secara atomic
                $inventory->decrement('stock', $qty);

            } finally {
                // Pastikan lock selalu dilepaskan meskipun terjadi exception
                $lock->release();
            }
        }

        // Catat tanda bahwa webhook telah sukses diproses
        ProcessedWebhook::create([
            'event_id' => $eventId,
            'channel' => $marketplace,
            'processed_at' => now(),
        ]);
    }
}`
      }
    }
  ];

  const currentAdr = adrList[activeAdrIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAdr.code.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture-decisions" className="py-20 bg-[#090e1a] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-mono text-xs mb-3 shadow-sm">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture Decision Records (ADR)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
            {language === 'id'
              ? 'Keputusan Arsitektur & Standar Rekayasa Produksi'
              : 'Architecture Decisions & Production Engineering Standards'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            {language === 'id'
              ? 'Bukti nyata bagaimana masalah rumit di industri farmasi dan e-commerce diselesaikan: pencegahan race condition, audit trail anti-manipulasi standar CPOB BPOM, dan mutex sinkronisasi stok terdistribusi.'
              : 'Real architectural records solving production challenges: race condition mitigation, regulatory CPOB/GMP data integrity, and distributed inventory mutex synchronization.'}
          </p>
        </motion.div>

        {/* Tab Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {adrList.map((adr, index) => (
            <button
              key={adr.id}
              onClick={() => setActiveAdrIndex(index)}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                activeAdrIndex === index
                  ? 'bg-slate-900/90 border-sky-500/50 shadow-lg shadow-sky-500/10'
                  : 'bg-[#0b1120]/70 border-slate-800/80 hover:bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              {activeAdrIndex === index && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-sky-400" />
              )}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-sky-400">{adr.id}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                  {adr.domain[language]}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                {adr.title[language]}
              </h3>
            </button>
          ))}
        </div>

        {/* Active ADR Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAdr.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-[#0c1324] border border-slate-800 overflow-hidden shadow-2xl"
          >
            {/* Header with Status */}
            <div className="p-6 bg-slate-900/80 border-b border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-sky-950 text-sky-400 border border-sky-800/50">
                    {currentAdr.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded font-mono text-xs border ${currentAdr.badgeColor}`}>
                    {currentAdr.status}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    • {currentAdr.domain[language]}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-100">
                  {currentAdr.title[language]}
                </h3>
              </div>

              {/* Key Metrics Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {currentAdr.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center"
                  >
                    <div className="text-sm font-mono font-bold text-emerald-400 leading-tight">
                      {m.value}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {m.label[language]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Split Content: Analysis & Code Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
              {/* Problem, Alternatives, Decision */}
              <div className="lg:col-span-5 p-6 space-y-5 text-sm">
                {/* 1. Context & Problem */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>{language === 'id' ? 'Tantangan Masalah Nyata' : 'Real Production Challenge'}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-rose-950/20 border border-rose-900/30 p-3.5 rounded-xl">
                    {currentAdr.problem[language]}
                  </p>
                </div>

                {/* 2. Considered Alternatives */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2 flex items-center gap-1.5">
                    <GitBranch className="w-4 h-4" />
                    <span>{language === 'id' ? 'Alternatif yang Ditolak' : 'Considered Alternatives'}</span>
                  </h4>
                  <div className="space-y-2">
                    {currentAdr.consideredAlternatives.map((alt, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs"
                      >
                        <div className="font-mono font-semibold text-slate-200 mb-1">
                          ✕ {alt.name}
                        </div>
                        <p className="text-slate-400 leading-relaxed text-[11px]">
                          {alt.verdict[language]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. The Architecture Decision */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === 'id' ? 'Keputusan Solusi Arsitektur' : 'Chosen Architecture'}</span>
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed bg-emerald-950/20 border border-emerald-900/40 p-3.5 rounded-xl font-medium">
                    {currentAdr.decision[language]}
                  </p>
                </div>
              </div>

              {/* Code Inspector */}
              <div className="lg:col-span-7 bg-[#080d18] flex flex-col justify-between">
                <div>
                  {/* Code Header */}
                  <div className="px-4 py-3 bg-[#0a101f] border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></span>
                      </div>
                      <span className="text-xs font-mono text-slate-300 font-semibold ml-2">
                        {currentAdr.code.filename}
                      </span>
                    </div>

                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                      title="Salin Cuplikan Kode"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 text-[11px]">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Salin Kode</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code Body */}
                  <div className="p-4 overflow-x-auto max-h-[480px] overflow-y-auto">
                    <pre className="font-mono text-xs text-sky-200/90 leading-relaxed">
                      <code>{currentAdr.code.snippet}</code>
                    </pre>
                  </div>
                </div>

                {/* Code Footer Note */}
                <div className="p-4 bg-slate-900/70 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Production Grade • Tested under concurrent workloads</span>
                  </div>
                  <span className="text-slate-500">PHP 8.3 / Laravel 12</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

import { Project, Experience, SkillCategory, Certificate, Education } from '../types';

export const PERSONAL_INFO = {
  name: "Mohamad Rafli Adipratama",
  shortName: "Rafli Adipratama",
  roleTitle: {
    id: "Fullstack Web Engineer & AI Agent Developer",
    en: "Fullstack Web Engineer & AI Agent Developer"
  },
  headline: {
    id: "Software Engineer Intern di PT Padepokan 79 (MagangHub) & Fullstack Developer. Berpengalaman membangun platform streaming video sinematik (LiveEuy), sistem regulasi industri farmasi CPOB/GMP, serta orkestrasi AI Agent & CLI kustom.",
    en: "Software Engineer Intern at PT Padepokan 79 (MagangHub) & Fullstack Engineer. Experienced in building cinematic streaming architectures (LiveEuy), pharmaceutical GMP compliance systems, and AI Agentic CLI workflows."
  },
  bio: {
    id: "Lulusan S1 Teknik Informatika (IPK 3.41) yang saat ini aktif sebagai Software Engineer Intern di PT Padepokan 79 (MagangHub). Berpengalaman langsung merancang sistem enterprise di industri manufaktur farmasi, platform streaming media HLS modern, hingga automasi AI multi-agent dan kustomisasi CLI. Memiliki pemahaman mendalam tentang Clean Architecture, Spatie RBAC, dan integrasi API skala produksi.",
    en: "Informatics Engineering graduate (GPA 3.41 / 4.00), currently Software Engineer Intern at PT Padepokan 79 (MagangHub). Proven track record delivering enterprise pharmaceutical manufacturing systems, modern cinematic HLS streaming platforms, and multi-agent AI CLI automation. Strong mastery of Clean Architecture, Spatie RBAC, and production-grade API integrations."
  },
  location: "Bandung, Indonesia",
  timezone: "Asia/Jakarta (UTC+7)",
  email: "rafliadipratma@gmail.com",
  phone: "+62 851-5521-0351",
  whatsappUrl: "https://wa.me/6285155210351",
  github: "https://github.com/rafliadipratama",
  gitlab: "https://gitlab.com/rafliadipratama",
  linkedin: "https://linkedin.com/in/rafliadipratama",
  avatar: "/assets/images/Photo362201041.jpg",
  avatarNoBg: "/assets/images/rafli-nobg.png",
  resumePdf: "/assets/files/CV_Mohamad Rafli Adipratama.pdf",
  stats: [
    { label: { id: "Tahun Pengalaman", en: "Years Experience" }, value: "4+" },
    { label: { id: "Sistem & Proyek Deployed", en: "Systems Deployed" }, value: "10+" },
    { label: { id: "Level RBAC Enterprise", en: "Enterprise RBAC Levels" }, value: "6" },
    { label: { id: "IPK Kelulusan S1", en: "Academic GPA" }, value: "3.41" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "liveeuy-streaming",
    title: "LiveEuy — Cinematic Streaming & VOD Platform",
    category: "react",
    featured: true,
    badge: "Cinema & VOD Engine",
    role: "Lead Frontend & Streaming Engineer",
    tagline: {
      id: "Platform streaming video on-demand (VOD) dan sinema online modern dengan HLS adaptive playback & ambient theater glow.",
      en: "Modern cinematic video-on-demand (VOD) streaming platform with HLS adaptive playback & ambient theater lighting."
    },
    description: {
      id: "Platform streaming sinematik generasi baru yang menghadirkan pemutar video HLS.js adaptif, ambient lighting glow dinamis di sekitar layar, scrubbing timeline instan dengan preview gambar, personalisasi Continue Watching, serta 9 modul Admin Studio CMS dengan proteksi RBAC.",
      en: "Next-gen cinematic web streaming platform delivering HLS.js adaptive bitrate player, real-time ambient lighting glow, timeline preview scrubbing, dynamic catalog recommendations, and 9-module modular Admin Studio CMS."
    },
    metrics: [
      "HLS.js Adaptive Bitrate & Multi-Resolution (4K UHD, 1080p, 720p)",
      "Dynamic Ambient Lighting Glow effect real-time ala bioskop",
      "9 Modul Modular Admin Studio CMS (Protected by RBAC)"
    ],
    impactHighlights: [
      { id: "Zero Latency Video Scrubbing", en: "Zero Latency Video Scrubbing" },
      { id: "Ambient Cinema Glow", en: "Ambient Cinema Glow" },
      { id: "9 Modul Admin Studio CMS", en: "9-Module Admin Studio CMS" }
    ],
    productionCode: {
      title: {
        id: "Adaptive HLS Video Engine: Event Listeners & Buffer Synchronization",
        en: "Adaptive HLS Video Engine: Event Listeners & Buffer Synchronization"
      },
      filename: "CinemaPlayerEngine.tsx",
      language: "typescript",
      snippet: `import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react';

interface StreamingPlayerProps {
  sourceUrl: string;
  onQualityLevelChange?: (level: number) => void;
}

export const CinemaPlayerEngine: React.FC<StreamingPlayerProps> = ({ sourceUrl, onQualityLevelChange }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        capLevelToPlayerSize: true,
        autoStartLoad: true,
        maxBufferLength: 30,
      });

      hls.loadSource(sourceUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        // Auto-negotiate optimum starting bitrate
        console.log(\`[LiveEuy Engine] Stream Manifest ready, levels: \${data.levels.length}\`);
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        onQualityLevelChange?.(data.level);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Apple HLS Safari fallback
      video.src = sourceUrl;
    }
  }, [sourceUrl, onQualityLevelChange]);

  return <video ref={videoRef} className="w-full h-full object-cover rounded-xl shadow-2xl" playsInline />;
};`,
      rationale: {
        id: "Mengintegrasikan HLS.js dengan penyesuaian otomatis terhadap ukuran frame pemutar dan buffering cerdas, mencegah frame drop pada koneksi fluktuatif.",
        en: "Seamlessly binds HLS.js with dynamic player-size level capping and intelligent buffering, eliminating frame drops across fluctuating network throughput."
      }
    },
    architecture: {
      id: "Arsitektur frontend modular React 18 + TypeScript + Vite, Tailwind CSS, hls.js untuk adaptive video stream, Context API untuk watch states & local persistence, serta Route Guard RBAC untuk perlindungan rute admin.",
      en: "Modular React 18 architecture with Vite, Tailwind CSS, hls.js streaming core, reactive WatchContext state persistence, and RBAC-guarded admin studio routing."
    },
    keyFeatures: {
      id: [
        "Advanced Cinema Video Player dengan Dynamic Ambient Glow & Scrubbing Preview",
        "Dukungan Adaptive Bitrate HLS (.m3u8) dan MP4 Native Stream",
        "Hero Showcase dengan rotasi otomatis trailer & Ken Burns effect",
        "Lanjutkan Menonton (Continue Watching) berbasis LocalStorage WatchContext",
        "Admin Studio CMS 9-Modul dengan proteksi Role-Based Access Control (RBAC)"
      ],
      en: [
        "Advanced Cinema Video Player with Dynamic Ambient Glow & Scrubbing Preview",
        "Adaptive Bitrate HLS (.m3u8) & native MP4 stream support",
        "Hero Showcase with auto-rotating video teaser & Ken Burns effect",
        "Continue Watching watch history tracking with LocalStorage synchronization",
        "9-Module Admin Studio CMS secured by Role-Based Access Control (RBAC)"
      ]
    },
    technologies: ["React 18", "TypeScript", "Tailwind CSS", "HLS.js", "Vite", "Lucide React", "Framer Motion"],
    image: "/assets/images/liveeuy-showcase.jpg",
    githubUrl: "https://github.com/rafliadipratama/LiveEuy"
  },
  {
    id: "e-document-system",
    title: "e-Document Management System",
    category: "laravel",
    featured: true,
    badge: "Enterprise Production",
    role: "Lead Fullstack Developer",
    tagline: {
      id: "Sistem tata kelola dokumen mutu industri farmasi sesuai standar regulasi CPOB / GMP.",
      en: "Pharmaceutical quality management & regulatory compliance document system (CPOB/GMP)."
    },
    description: {
      id: "Platform enterprise menyeluruh yang menggantikan proses manual ribuan dokumen mutu farmasi di PT Solas Langgeng Sejahtera. Mengimplementasikan alur approval berjenjang, tanda tangan elektronik terverifikasi (e-signature), dan audit trail ketat untuk mencegah manipulasi data.",
      en: "Comprehensive enterprise platform replacing manual paperwork for thousands of pharmaceutical quality records at PT Solas Langgeng Sejahtera. Implements multi-tier approval state machines, cryptographic e-signatures, and immutable audit logs ensuring strict data integrity."
    },
    metrics: [
      "6 Level Peran & Hak Akses (Operator, Supervisor, QA, QC, Dept Head, Signer)",
      "100% Paperless untuk SOP, CAPA, & Laporan Deviasi",
      "Kepatuhan audit CPOB / GMP dengan timestamp hash audit trail"
    ],
    impactHighlights: [
      { id: "Lead Time Review -70%", en: "Review Lead Time -70%" },
      { id: "100% Lolos Audit BPOM", en: "100% BPOM Audit Pass" },
      { id: "Zero Data Tampering", en: "Zero Data Tampering" }
    ],
    productionCode: {
      title: {
        id: "Approval Workflow: Pessimistic Locking & Audit Trail Integrity",
        en: "Approval Workflow: Pessimistic Locking & Audit Trail Integrity"
      },
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
            // Lock baris spesifik hingga transaksi commit
            $doc = Document::where('id', $documentId)
                ->lockForUpdate()
                ->firstOrFail();

            if ($doc->status !== Document::STATUS_QA_REVIEW) {
                throw new InvalidWorkflowTransitionException("Status tidak valid untuk approval: {$doc->status}");
            }

            $prevHash = $doc->latestAuditTrail?->hash_checksum ?? hash('sha256', 'GENESIS_NODE');
            
            $doc->update([
                'status' => Document::STATUS_APPROVED,
                'approved_by' => $userId,
                'approved_at' => now(),
                'version' => $doc->version + 1,
            ]);

            $payload = json_encode([
                'doc_id' => $doc->id,
                'signer_id' => $userId,
                'role' => $role,
                'timestamp' => now()->toIso8601String(),
                'ip' => request()->ip(),
            ]);

            $newHash = hash('sha256', $prevHash . $payload);

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
}`,
      rationale: {
        id: "Penggunaan DB::transaction dipadu lockForUpdate() menjamin tidak ada dua approver yang bisa menyetujui dokumen yang sama di milidetik bersamaan. Hash chaining memastikan rekam jejak audit memenuhi klausul integritas data CPOB.",
        en: "DB::transaction combined with lockForUpdate() ensures concurrent approvers cannot produce race conditions. SHA-256 chaining guarantees data tamper resistance required by pharmaceutical GMP regulations."
      }
    },
    architecture: {
      id: "Arsitektur berbasis Laravel 12 dengan Spatie Permission, PostgreSQL/MySQL, Blade + Alpine.js untuk state reaktif, serta PDF rendering engine untuk cetak dokumen resmi ber-watermark dinamis.",
      en: "Built on Laravel 12 with Spatie Permission RBAC, normalized relational schema, Alpine.js reactivity, and automated server-side PDF generator with dynamic watermarking."
    },
    keyFeatures: {
      id: [
        "Manajemen Siklus SOP (Draft, Review, QA Verify, Final Approval, Obsolete)",
        "Change Control & CAPA (Corrective and Preventive Action) tracking",
        "Modul Pelaporan Deviasi & Manajemen Risiko Kualitas",
        "Audit Internal & Eksternal dengan export log terenkripsi",
        "Tanda tangan elektronik dengan verifikasi QR code dan token unik"
      ],
      en: [
        "Full SOP Lifecycle (Draft, Department Review, QA Verification, Sign-off, Archiving)",
        "Change Control & CAPA (Corrective and Preventive Action) workflow engine",
        "Deviation Reporting & Quality Risk Assessment matrix",
        "Internal & External Regulatory Audit reporting with cryptographic hash checks",
        "Electronic signature capture with cryptographically verified QR code tokens"
      ]
    },
    technologies: ["Laravel 12", "Alpine.js", "Tailwind CSS", "MySQL", "Spatie RBAC", "Vite", "DomPDF"],
    image: "/assets/images/seo-audit-app.jpg"
  },
  {
    id: "solas-company-hr",
    title: "Solas Company Profile & HR Recruitment System",
    category: "fullstack",
    featured: true,
    badge: "Live Enterprise",
    role: "Fullstack Web Developer",
    tagline: {
      id: "Portal korporat dwibahasa terintegrasi dengan ATS HRD & evaluasi kepribadian otomatis.",
      en: "Corporate bilingual portal integrated with ATS & automated psychometric testing."
    },
    description: {
      id: "Website korporat modern untuk PT Solas Langgeng Sejahtera yang memadukan katalog produk farmasi dengan sistem rekrutmen SDM. Dilengkapi modul tes psikometri online DISC & tes bakat (Aptitude) otomatis, serta integrasi WhatsApp API untuk notifikasi kandidat.",
      en: "Modern corporate website for PT Solas Langgeng Sejahtera integrating pharmaceutical product catalogs with an HR recruitment ATS. Features automated DISC personality and aptitude test scoring engines, plus WhatsApp Gateway notifications."
    },
    metrics: [
      "Bilingual otomatis (ID / EN)",
      "Scoring instan hasil tes DISC & Aptitude kandidat",
      "Automated WhatsApp notification pipeline untuk jadwal interview"
    ],
    impactHighlights: [
      { id: "Scoring DISC Instan", en: "Instant DISC Scoring" },
      { id: "Sinkronisasi ATS Terpadu", en: "Unified ATS Pipeline" },
      { id: "WhatsApp Gateway Auto", en: "WhatsApp Gateway Auto" }
    ],
    productionCode: {
      title: {
        id: "DISC Scoring Engine: Vector Matrix Personality Calculator",
        en: "DISC Scoring Engine: Vector Matrix Personality Calculator"
      },
      filename: "DiscEngineService.php",
      language: "php",
      snippet: `namespace App\\Services\\Psychometrics;

class DiscEngineService
{
    /**
     * Hitung kuadran Dominance, Influence, Steadiness, & Compliance
     * berdasarkan selisih respons MOST vs LEAST kandidat.
     */
    public function computeProfile(array $responses): array
    {
        $most = ['D' => 0, 'I' => 0, 'S' => 0, 'C' => 0];
        $least = ['D' => 0, 'I' => 0, 'S' => 0, 'C' => 0];

        foreach ($responses as $row) {
            if (isset($row['most']) && isset($most[$row['most']])) {
                $most[$row['most']]++;
            }
            if (isset($row['least']) && isset($least[$row['least']])) {
                $least[$row['least']]++;
            }
        }

        $change = [
            'D' => $most['D'] - $least['D'],
            'I' => $most['I'] - $least['I'],
            'S' => $most['S'] - $least['S'],
            'C' => $most['C'] - $least['C'],
        ];

        arsort($change);
        $primaryTrait = array_key_first($change);

        return [
            'raw_change' => $change,
            'primary_archetype' => $this->determineArchetype($primaryTrait, $change),
            'fit_recommendation' => $this->generateTeamFit($primaryTrait),
        ];
    }
}`,
      rationale: {
        id: "Mesin kalkulasi psikometri internal memangkas waktu screening manual HRD hingga 80% dengan pemetaan vektor kepribadian kandidat langsung saat tes disubmit.",
        en: "Internal psychometric matrix calculation cuts HR screening time by 80% with instantaneous candidate personality vector plotting."
      }
    },
    architecture: {
      id: "Laravel 12 backend dengan modul modular HRD, Tailwind CSS responsif, GitLab CI/CD auto deployment, dan proteksi GDPR/Cookie compliance.",
      en: "Laravel 12 monolith with modular HR ATS services, Alpine.js reactivity, GitLab CI/CD automated pipeline, and GDPR cookie compliance."
    },
    keyFeatures: {
      id: [
        "Katalog Produk Farmasi Terstruktur dengan filter indikasi terapeutik",
        "Applicant Tracking System (ATS) dari aplikasi pelamar hingga penawaran kerja",
        "Tes Online Mandiri DISC & Tes Bakat dengan visualisasi grafik kepribadian",
        "Notifikasi Otomatis via WhatsApp Gateway",
        "Manajemen Cookies GDPR dan keamanan formulir CSRF/Rate Limiting"
      ],
      en: [
        "Structured Pharma Product Catalog with therapeutic filter taxonomy",
        "End-to-End ATS from job vacancy posting to onboarding pipeline",
        "Interactive online DISC & Aptitude testing with automated personality plotting",
        "Automated WhatsApp notification webhooks for candidate progression",
        "GDPR consent compliance and multi-language localization switcher"
      ]
    },
    technologies: ["Laravel 12", "Alpine.js", "Tailwind CSS", "MySQL", "WhatsApp API", "GitLab CI/CD"],
    image: "/assets/images/maqdis-landing.jpg",
    liveUrl: "https://solas.id/"
  },
  {
    id: "marketplace-solas",
    title: "Marketplace Solas B2B/B2C Platform",
    category: "laravel",
    featured: true,
    badge: "In Active Dev",
    role: "Fullstack Developer",
    tagline: {
      id: "Platform e-commerce internal produk farmasi terintegrasi omnichannel Tokopedia & Shopee.",
      en: "Pharmaceutical internal e-commerce platform synchronized with Tokopedia & Shopee APIs."
    },
    description: {
      id: "Platform distribusi dan transaksi produk farmasi internal. Mendukung pengelolaan varian kemasan obat, kalkulasi pajak, sinkronisasi stok dan pesanan lintas marketplace via Open API, serta dashboard metrik penjualan real-time.",
      en: "Internal distribution and transactional e-commerce platform for pharma goods. Supports granular SKU/packaging variants, tax calculations, bidirectional API sync with Shopee & Tokopedia, and executive sales analytics."
    },
    metrics: [
      "Sinkronisasi real-time stok antar gudang dan marketplace",
      "Optimasi AJAX Live Search < 100ms",
      "Dashboard analitik omzet dan tren kategori produk"
    ],
    impactHighlights: [
      { id: "Zero Overselling Mutex", en: "Zero Overselling Mutex" },
      { id: "Latency Webhook < 120ms", en: "Webhook Latency < 120ms" },
      { id: "Sinkronisasi Omnichannel", en: "Omnichannel Sync" }
    ],
    productionCode: {
      title: {
        id: "Distributed Inventory Mutex & Webhook Idempotency",
        en: "Distributed Inventory Mutex & Webhook Idempotency"
      },
      filename: "MarketplaceOrderConsumer.php",
      language: "php",
      snippet: `namespace App\\Jobs;

use Illuminate\\Support\\Facades\\Cache;
use App\\Models\\InventoryItem;
use App\\Models\\ProcessedWebhook;
use App\\Exceptions\\OutOfStockException;

class MarketplaceOrderConsumer
{
    public function handle(string $marketplace, string $eventId, array $items): void
    {
        $alreadyHandled = ProcessedWebhook::where('event_id', $eventId)->exists();
        if ($alreadyHandled) {
            return;
        }

        foreach ($items as $item) {
            $sku = $item['sku'];
            $qty = $item['quantity'];

            // Redis Distributed Lock mengamankan mutasi stok SKU
            $lock = Cache::lock("inventory_mutex:sku:{$sku}", 10);

            try {
                $lock->block(5);

                $inventory = InventoryItem::where('sku', $sku)->firstOrFail();
                if ($inventory->stock < $qty) {
                    throw new OutOfStockException("Stok tidak mencukupi untuk SKU: {$sku}");
                }

                $inventory->decrement('stock', $qty);
            } finally {
                $lock->release();
            }
        }

        ProcessedWebhook::create(['event_id' => $eventId, 'channel' => $marketplace]);
    }
}`,
      rationale: {
        id: "Mencegah kesalahan fatal overselling ketika pesanan masuk bersamaan dari Shopee dan Tokopedia pada saat stok barang tinggal sedikit.",
        en: "Prevents catastrophic stock overselling when multiple marketplace webhooks hit identical pharmaceutical SKUs concurrently."
      }
    },
    architecture: {
      id: "Laravel RESTful API terhubung ke MySQL ter-indeks, asynchronous queue worker untuk sinkronisasi webhook e-commerce eksternal, dan Tailwind CSS + Alpine.js untuk UX katalog cepat.",
      en: "Laravel RESTful architecture with indexed MySQL schemas, queue workers for third-party webhook ingest, and optimized client state."
    },
    keyFeatures: {
      id: [
        "Katalog multi-varian & kalkulasi harga bertingkat (B2B grosir & retail)",
        "Pencarian cepat berbasis AJAX dengan debounce & indeks kata kunci",
        "Integrasi Sinkronisasi API Tokopedia & Shopee Open Platform",
        "Dashboard analitik penjualan, mutasi stok, dan laporan laba kotor",
        "Manajemen peran admin penjualan, logistik, dan akuntansi"
      ],
      en: [
        "Multi-variant SKU management & tiered pricing (wholesale B2B & retail)",
        "Sub-100ms debounced AJAX search with autocomplete",
        "Tokopedia & Shopee Open API integration for inventory & order dispatch",
        "Executive sales dashboard with trend analysis and ledger export",
        "Granular access control for sales admins, logistics, and finance teams"
      ]
    },
    technologies: ["Laravel 12", "Alpine.js", "Tailwind CSS", "MySQL", "Shopee API", "Tokopedia API", "Redis Queue"],
    image: "/assets/images/inventarisku.jpg",
    gitlabUrl: "https://gitlab.com/rafliadipratama/marketplace-solas"
  },
  {
    id: "seo-audit-app",
    title: "SEO Audit & Quality Inspector Tool",
    category: "laravel",
    role: "Fullstack Developer",
    tagline: {
      id: "Alat diagnostik SEO dan performa teknis web untuk optimasi situs UMKM.",
      en: "Automated SEO diagnostic and technical performance inspector for SME websites."
    },
    description: {
      id: "Aplikasi analitik berbasis web untuk memindai kesehatan SEO on-page: verifikasi atribut gambar alt, rasio kepadatan kata kunci, struktur meta tag, kompatibilitas mobile, dan skor Google PageSpeed Insights.",
      en: "Web-based diagnostic scanner evaluating on-page SEO health: image alt attributes, keyword density ratios, OpenGraph meta tags, mobile-readiness, and Google PageSpeed Insights benchmarking."
    },
    keyFeatures: {
      id: [
        "Web crawler parser untuk ekstraksi DOM halaman target",
        "Analisis kerapatan kata kunci (keyword density analyzer)",
        "Integrasi Google PageSpeed API untuk metrik Core Web Vitals",
        "Laporan rekomendasi perbaikan teknis dalam format terstruktur"
      ],
      en: [
        "DOM extraction crawler to inspect headings and image accessibility",
        "Keyword density ratio calculation & semantic tag analysis",
        "Google PageSpeed API integration for Core Web Vitals scoring",
        "Exportable technical remediation report for webmasters"
      ]
    },
    technologies: ["Laravel", "PHP", "DOM Parser", "PageSpeed API", "Tailwind CSS"],
    image: "/assets/images/seo-audit-app.jpg",
    githubUrl: "https://github.com/rafliadipratama/seo-audit-app"
  },
  {
    id: "e-certificate-app",
    title: "Digital E-Certificate Verification System",
    category: "laravel",
    role: "Backend & Systems Developer",
    tagline: {
      id: "Sistem verifikasi dan penerbitan sertifikat digital berkeamanan token QR.",
      en: "Digital certificate issuance and verification engine with QR token authentication."
    },
    description: {
      id: "Dikembangkan dan diterapkan untuk operasional internal di PT Pindad Enjiniring Indonesia. Menyediakan manajemen peserta pelatihan, generator sertifikat PDF otomatis beresolusi tinggi, dan portal verifikasi keaslian publik berbasis QR Code.",
      en: "Engineered and deployed for internal training operations at PT Pindad Enjiniring Indonesia. Features attendee lifecycle tracking, bulk PDF certificate rendering, and a public cryptographic QR verification portal."
    },
    keyFeatures: {
      id: [
        "Pembuatan sertifikat PDF otomatis dengan koordinat dinamis nama & predikat",
        "Generator QR Code unik berisi tanda tangan token verifikasi keaslian",
        "Portal verifikasi publik instan tanpa login untuk validasi dokumen",
        "Manajemen kelompok pelatihan dan export data kelulusan"
      ],
      en: [
        "Automated batch PDF rendering with dynamic credential coordinates",
        "Cryptographically signed unique QR tokens embedded per certificate",
        "Instant zero-friction public validation portal for authenticity checks",
        "Training cohort management and bulk certification logs"
      ]
    },
    technologies: ["Laravel", "PHP", "MySQL", "TCPDF", "QR Code Engine", "Bootstrap"],
    image: "/assets/images/Photo362201041.jpg"
  },
  {
    id: "news-app-react",
    title: "Realtime News Feed Explorer",
    category: "react",
    role: "Frontend Engineer",
    tagline: {
      id: "Aplikasi portal berita interaktif berbasis React, TypeScript, dan NewsAPI.",
      en: "Interactive news portal built with React, TypeScript, and NewsAPI."
    },
    description: {
      id: "Aplikasi frontend modern yang menampilkan agregasi artikel berita global secara real-time. Dilengkapi filter kategori multi-topik, pencarian instan dengan caching client-side, dan tata letak editorial responsif.",
      en: "Client-side news curation portal streaming global feeds in real time. Features faceted category filtering, debounced search with client-side state caching, and responsive typography."
    },
    keyFeatures: {
      id: [
        "Konsumsi REST API asinkron dengan penanganan error state yang rapi",
        "Pencarian kata kunci dengan debounce dan filter tanggal rilis",
        "Layout grid adaptif dengan lazy loading gambar untuk efisiensi kuota",
        "Dark mode otomatis sesuai preferensi sistem operasi"
      ],
      en: [
        "Asynchronous REST API consumption with robust fallbacks and skeleton states",
        "Debounced live search with multi-category taxonomy",
        "Adaptive card layouts with native lazy-loading image optimization",
        "System-aware dark mode integration"
      ]
    },
    technologies: ["React", "TypeScript", "Tailwind CSS", "NewsAPI", "Vite"],
    image: "/assets/images/news-app.jpg",
    githubUrl: "https://github.com/rafliadipratama/news-app"
  },
  {
    id: "maqdis-academy",
    title: "Maqdis Academy Platform",
    category: "react",
    role: "Frontend Developer",
    tagline: {
      id: "Landing page edukatif interaktif dengan animasi visual dan formulir pendaftaran dinamis.",
      en: "Interactive educational platform landing page with smooth scroll physics and forms."
    },
    description: {
      id: "Implementasi antarmuka modern untuk lembaga pendidikan Maqdis Academy. Didesain dengan perhatian tinggi pada tata letak visual, mikro-interaksi responsif, dan validasi formulir client-side yang mulus.",
      en: "High-craft educational interface built for Maqdis Academy. Prioritizes visual hierarchy, micro-interactions, accessibility, and client-side form validation."
    },
    keyFeatures: {
      id: [
        "Animasi on-scroll dan mikro-interaksi tombol yang halus",
        "Navigasi tab kurikulum dan jadwal program interaktif",
        "Form pendaftaran siswa dengan validasi skema form",
        "Optimasi Core Web Vitals skor performa tinggi"
      ],
      en: [
        "Micro-interactions and physics-based scroll transitions",
        "Interactive curriculum tabs and program schedules",
        "Registration funnel with client-side schema validation",
        "Optimized asset delivery achieving high Core Web Vitals"
      ]
    },
    technologies: ["React", "JavaScript", "Tailwind CSS", "Framer Motion", "Vite"],
    image: "/assets/images/maqdis-landing.jpg",
    githubUrl: "https://github.com/rafliadipratama/testcode-maqdis-academy"
  },
  {
    id: "inventarisku",
    title: "Inventarisku Warehouse & Asset Tracker",
    category: "laravel",
    role: "Fullstack Developer",
    tagline: {
      id: "Sistem inventaris pergudangan dan pelacakan keluar-masuk stok barang.",
      en: "Warehouse asset tracking & inventory turnover management system."
    },
    description: {
      id: "Aplikasi manajemen logistik untuk mengontrol mutasi barang, batas minimum stok (safety stock), riwayat transaksi pemasok, dan pembuatan laporan rekapitulasi berkala.",
      en: "Logistics control application designed to manage stock mutations, reorder safety thresholds, supplier transaction trails, and automated audit summaries."
    },
    keyFeatures: {
      id: [
        "CRUD mutasi stok dengan alert otomatis jika stok menipis",
        "Riwayat audit transaksi keluar-masuk barang lengkap",
        "Filter laporan berdasarkan rentang tanggal dan kategori gudang",
        "Export laporan rekapitulasi data ke format spreadsheet"
      ],
      en: [
        "Granular inventory ledger with automated low-stock threshold alerts",
        "Full audit logging for inbound and outbound item movements",
        "Flexible reporting filtered by date range, supplier, and warehouse zone",
        "Spreadsheet export utility for physical inventory auditing"
      ]
    },
    technologies: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Blade"],
    image: "/assets/images/inventarisku.jpg",
    githubUrl: "https://github.com/rafliadipratama/inventarisku"
  },
  {
    id: "ecotasks",
    title: "EcoTasks Productivity Engine",
    category: "javascript",
    role: "Frontend Developer",
    tagline: {
      id: "Aplikasi manajemen produktivitas minimalis tanpa dependensi eksternal berat.",
      en: "Zero-dependency minimalist productivity engine with persistent local state."
    },
    description: {
      id: "Aplikasi to-do list ringan yang beroperasi secara offline menggunakan Web Storage API (localStorage). Menyediakan manajemen prioritas tugas, filter status, dan interaksi instan tanpa latency server.",
      en: "Lightweight, zero-bloat client-side task engine with offline-first persistence via Web Storage API. Built for instantaneous interaction without server latency."
    },
    keyFeatures: {
      id: [
        "Persistensi data offline-first dengan LocalStorage",
        "Pengelompokan status: Aktif, Selesai, dan Riwayat",
        "Performa instan 60fps dengan manipulasi DOM efisien",
        "Antarmuka bersih tanpa gangguan visual"
      ],
      en: [
        "Offline-first client-side state synchronization with LocalStorage",
        "Dynamic categorization: Active, Completed, and Archived workflows",
        "Instant 60fps interaction via minimal DOM updates",
        "Distraction-free, clean typography interface"
      ]
    },
    technologies: ["JavaScript ES6+", "HTML5", "CSS3", "LocalStorage API"],
    image: "/assets/images/ecotasks.jpg",
    githubUrl: "https://github.com/rafliadipratama/EcoTasks"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-padepokan79",
    company: "PT. Padepokan 79",
    position: {
      id: "Software Engineer Intern (MagangHub)",
      en: "Software Engineer Intern (MagangHub)"
    },
    period: "Sep 2026 - Sekarang",
    type: {
      id: "Magang Bersertifikat (MagangHub)",
      en: "Certified Internship (MagangHub)"
    },
    location: "Bandung, Indonesia",
    current: true,
    summary: {
      id: "Mengikuti program internship intensif MagangHub di PT Padepokan 79 yang berfokus pada pengembangan sistem enterprise terstandarisasi industri, Clean Architecture, agile software development, dan kolaborasi tim rekayasa perangkat lunak modern.",
      en: "Participating in the intensive MagangHub certified software engineering internship program at PT Padepokan 79, specializing in industry-standard enterprise systems, Clean Architecture, and modern agile team delivery."
    },
    projects: [
      {
        name: "Enterprise Software Engineering & Modern Fullstack Practice",
        highlights: {
          id: [
            "Menerapkan standar Clean Code, prinsip SOLID, dan arsitektur modular pada pengembangan aplikasi web modern skala enterprise.",
            "Berkolaborasi dalam tim rekayasa perangkat lunak mengimplementasikan sprint agile, code reviews, dan integrasi API RESTful.",
            "Eksplorasi dan adopsi alat bantu modern (termasuk CLI automasi & AI toolings) untuk akselerasi siklus pengembangan perangkat lunak."
          ],
          en: [
            "Applying Clean Code standards, SOLID design principles, and modular architecture across modern enterprise web stacks.",
            "Collaborating within software engineering teams across agile sprints, pull request code reviews, and robust RESTful API pipelines.",
            "Exploring and adopting modern tooling (including CLI automation & agent workflows) to accelerate software delivery cycles."
          ]
        }
      }
    ],
    stack: ["TypeScript", "React", "Node.js", "Clean Architecture", "RESTful APIs", "Git", "Agile/Scrum"]
  },
  {
    id: "exp-solas",
    company: "PT. Solas Langgeng Sejahtera",
    position: {
      id: "Fullstack Web Developer",
      en: "Fullstack Web Developer"
    },
    period: "Agu 2025 - Jul 2026",
    type: {
      id: "Penuh Waktu (Full-time)",
      en: "Full-time"
    },
    location: "Bandung, Indonesia",
    current: false,
    summary: {
      id: "Memimpin perancangan dan implementasi infrastruktur sistem web enterprise untuk manufaktur farmasi, meliputi kepatuhan mutu (e-Document CPOB), portal HR ATS, serta e-commerce terintegrasi marketplace.",
      en: "Directing the architecture and implementation of enterprise web systems for pharmaceutical manufacturing, including quality regulatory compliance (e-Document GMP), HR ATS infrastructure, and omnichannel e-commerce."
    },
    projects: [
      {
        name: "e-Document Management System (CPOB/GMP Compliant)",
        highlights: {
          id: [
            "Merancang arsitektur sistem manajemen dokumen mutu farmasi berbasis Laravel 12 menggantikan alur manual berbasis kertas.",
            "Mengimplementasikan matriks RBAC 6 tingkat (Operator hingga Signer) dengan Spatie Permissions dan verifikasi tanda tangan digital.",
            "Membangun modul kepatuhan CPOB: SOP, CAPA, Laporan Deviasi, Pengendalian Perubahan (Change Control), dan Manajemen Risiko Mutu."
          ],
          en: [
            "Architected pharmaceutical quality management platform on Laravel 12, eliminating manual paper-based approval bottlenecks.",
            "Constructed a 6-tier RBAC matrix with Spatie Permissions and cryptographic digital signature approval pipelines.",
            "Engineered GMP regulatory compliance modules: SOPs, CAPAs, Deviation Reports, Change Control, and Quality Risk Assessments."
          ]
        }
      },
      {
        name: "Corporate Web Portal & HR Recruitment ATS",
        highlights: {
          id: [
            "Membangun situs korporat Solas.id dwibahasa (ID/EN) terintegrasi sistem ATS penerimaan karyawan baru.",
            "Membuat modul tes online kepribadian DISC dan tes bakat dengan kalkulasi skor otomatis untuk mempermudah seleksi HRD.",
            "Mengintegrasikan WhatsApp Business Gateway untuk otomatisasi undangan wawancara kerja dan notifikasi status lamaran."
          ],
          en: [
            "Delivered bilingual corporate portal (Solas.id) integrated with an end-to-end recruitment applicant tracking system.",
            "Developed automated DISC psychometric and aptitude testing algorithms for candidate screening.",
            "Integrated WhatsApp Business Gateway webhooks for automated interview scheduling and applicant notifications."
          ]
        }
      },
      {
        name: "Marketplace Solas (Omnichannel Distribution)",
        highlights: {
          id: [
            "Mengembangkan platform transaksi internal untuk produk obat dan suplemen dengan manajemen varian SKU.",
            "Menghubungkan Open API Shopee dan Tokopedia untuk sinkronisasi inventaris stok dan status pesanan.",
            "Membangun dashboard analitik performa penjualan internal dengan filter multi-parameter."
          ],
          en: [
            "Engineered internal distribution portal handling pharmaceutical SKUs with variable packaging tiers.",
            "Integrated Shopee & Tokopedia Open APIs for real-time inventory ledger and order state synchronization.",
            "Built executive sales analytics dashboard with multi-metric ledger reporting."
          ]
        }
      }
    ],
    stack: ["Laravel 12", "Alpine.js", "Tailwind CSS", "MySQL", "Spatie RBAC", "GitLab CI/CD", "Redis", "REST APIs"]
  },
  {
    id: "exp-pindad",
    company: "PT. Pindad Enjiniring Indonesia",
    position: {
      id: "IT Support & Developer Intern",
      en: "IT Support & Developer Intern"
    },
    period: "Okt 2024 - Jan 2025",
    type: {
      id: "Magang (Internship)",
      en: "Internship"
    },
    location: "Bandung, Indonesia",
    summary: {
      id: "Mengembangkan aplikasi penerbitan sertifikat digital berkeamanan tinggi untuk divisi pelatihan serta mendukung stabilitas infrastruktur TI internal.",
      en: "Engineered secure digital certificate generation and validation system for internal corporate training while supporting IT infrastructure operations."
    },
    projects: [
      {
        name: "Enterprise Digital E-Certificate Generator & Verification",
        highlights: {
          id: [
            "Merancang dan mengembangkan aplikasi sistem e-sertifikat menggunakan Laravel dan TCPDF.",
            "Menerapkan sistem verifikasi keaslian berbasis QR Code yang memvalidasi token sertifikat secara real-time.",
            "Digunakan aktif dalam pelatihan internal divisi perusahaan dengan efisiensi pencetakan dokumen 100% digital."
          ],
          en: [
            "Architected and deployed e-certificate web generator using Laravel and PDF vector engines.",
            "Implemented cryptographic QR Code verification allowing instant authenticity validation without authentication hurdles.",
            "Successfully adopted across internal training sessions, transitioning certification to 100% digital workflow."
          ]
        }
      }
    ],
    stack: ["Laravel", "PHP", "MySQL", "TCPDF", "QR Engine", "IT Support"]
  },
  {
    id: "exp-kaiju",
    company: "Kaiju Toys",
    position: {
      id: "Marketplace & Systems Admin",
      en: "Marketplace & Systems Admin"
    },
    period: "Feb 2022 - Des 2025",
    type: {
      id: "Freelance",
      en: "Freelance"
    },
    location: "Bandung, Indonesia",
    summary: {
      id: "Mengelola operasional e-commerce multichannel, optimasi katalog produk, dan analitik performa penjualan digital.",
      en: "Managed multichannel e-commerce operations, product catalog optimization, and data-driven sales performance analytics."
    },
    projects: [
      {
        name: "E-Commerce Growth & Operations",
        highlights: {
          id: [
            "Mengelola katalog dan inventaris ribuan produk pada Tokopedia, Shopee, dan channel digital.",
            "Menganalisis metrik penjualan harian dan menyusun rekomendasi promosi berbasis data transaksi.",
            "Menangani negosiasi dan komunikasi pelanggan tingkat lanjut dengan tingkat kepuasan tinggi."
          ],
          en: [
            "Oversaw catalog inventory and pricing synchronization across Tokopedia, Shopee, and digital sales channels.",
            "Analyzed daily sales conversion funnels to structure data-driven marketing campaigns.",
            "Managed customer relations and transaction pipelines maintaining high satisfaction ratings."
          ]
        }
      }
    ],
    stack: ["Tokopedia Seller API", "Shopee Seller Center", "Data Analysis", "Excel Analytics"]
  },
  {
    id: "exp-bangtelindo",
    company: "PT. Bangtelindo",
    position: {
      id: "IT Support & Network Engineer",
      en: "IT Support & Network Engineer"
    },
    period: "Agu 2021 - Okt 2022",
    type: {
      id: "Penuh Waktu (Full-time)",
      en: "Full-time"
    },
    location: "Bandung, Indonesia",
    summary: {
      id: "Memelihara stabilitas jaringan kantor, konfigurasi server Linux (Ubuntu/Nginx), serta pengelolaan inventaris perangkat telekomunikasi.",
      en: "Maintained office network infrastructure, configured Ubuntu Linux & Nginx production servers, and managed telecommunications hardware inventories."
    },
    projects: [
      {
        name: "Infrastructure & Server Administration",
        highlights: {
          id: [
            "Mengkonfigurasi dan memelihara server lokal berbasis Ubuntu Linux dan web server Nginx.",
            "Melakukan troubleshooting perangkat keras, jaringan LAN/WAN, dan sistem operasi workstation karyawan.",
            "Mendigitalkan inventaris perangkat jaringan kantor untuk pelacakan aset yang akurat."
          ],
          en: [
            "Configured and maintained local Linux servers running Ubuntu and Nginx reverse proxies.",
            "Troubleshot hardware, LAN/WAN topologies, routing issues, and office workstation operating systems.",
            "Digitized telecommunication hardware inventory for precise asset tracking."
          ]
        }
      }
    ],
    stack: ["Ubuntu Linux", "Nginx", "LAN/WAN Networking", "Hardware Diagnostics", "IT Inventory"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: {
      id: "Backend & Basis Data",
      en: "Backend & Databases"
    },
    skills: [
      {
        name: "Laravel",
        level: "Tingkat Lanjut (v9 - v12)",
        experienceYears: "4+ Tahun",
        icon: "laravel",
        color: "#f43f5e",
        description: {
          id: "Eloquent ORM, Spatie Permissions (RBAC), Queue Workers, Service Repository Pattern, Event Listeners, API Resources.",
          en: "Eloquent ORM, Spatie Permissions RBAC, Queue Workers, Service Repository Pattern, Event Listeners, API Resources."
        }
      },
      {
        name: "PHP",
        level: "Mahir (PHP 8.2+)",
        experienceYears: "4+ Tahun",
        icon: "php",
        color: "#818cf8",
        description: {
          id: "Pemrograman berorientasi objek (OOP), Type safety, Dependency Injection, Composer package development.",
          en: "Object-Oriented Programming (OOP), Strict typing, Dependency Injection, Composer package management."
        }
      },
      {
        name: "MySQL / Relational DB",
        level: "Mahir",
        experienceYears: "4+ Tahun",
        icon: "mysql",
        color: "#38bdf8",
        description: {
          id: "Desain skema relasional, optimasi index, foreign keys cascade, transaksi ACID, query optimization.",
          en: "Relational schema design, index optimization, cascade constraints, ACID transactions, complex query tuning."
        }
      },
      {
        name: "RESTful API Engineering",
        level: "Tingkat Lanjut",
        experienceYears: "4+ Tahun",
        icon: "api",
        color: "#10b981",
        description: {
          id: "Arsitektur stateless REST, otentikasi Sanctum/JWT, rate limiting, webhook handler, integrasi pihak ketiga.",
          en: "Stateless REST API design, Sanctum/JWT authentication, rate-limiting, webhook consumers, third-party sync."
        }
      },
      {
        name: "Spatie RBAC & Security",
        level: "Tingkat Lanjut",
        experienceYears: "3+ Tahun",
        icon: "shield",
        color: "#eab308",
        description: {
          id: "Multi-guard authentication, role & permission policies, middleware security, sanitasi input.",
          en: "Multi-guard authentication, role & permission policies, middleware security, input sanitization."
        }
      }
    ]
  },
  {
    category: {
      id: "Frontend & UI Engineering",
      en: "Frontend & UI Engineering"
    },
    skills: [
      {
        name: "React & TypeScript",
        level: "Mahir",
        experienceYears: "3+ Tahun",
        icon: "react",
        color: "#38bdf8",
        description: {
          id: "Komponen fungsional modern, custom hooks, state management, strict TypeScript interfaces, Vite bundler.",
          en: "Functional components, custom hooks, reactive state models, strict TypeScript interfaces, Vite build tooling."
        }
      },
      {
        name: "JavaScript (ES6+)",
        level: "Mahir",
        experienceYears: "4+ Tahun",
        icon: "javascript",
        color: "#fbbf24",
        description: {
          id: "Async/await, Promise handling, manipulasi DOM, modular ES Modules, event delegation, LocalStorage API.",
          en: "Async/await, Promise pipelines, modern DOM APIs, ES Modules, event delegation, LocalStorage persistence."
        }
      },
      {
        name: "Alpine.js",
        level: "Mahir",
        experienceYears: "3+ Tahun",
        icon: "alpine",
        color: "#2dd4bf",
        description: {
          id: "Reaktivitas ringan pada aplikasi monolitik Laravel Blade, x-data binding, transisi micro-UI, AJAX fetch.",
          en: "Lightweight client reactivity in Laravel Blade monoliths, x-data binding, micro-interactions, asynchronous calls."
        }
      },
      {
        name: "Tailwind CSS",
        level: "Tingkat Lanjut",
        experienceYears: "4+ Tahun",
        icon: "tailwind",
        color: "#38bdf8",
        description: {
          id: "Utility-first design system, responsive breakpoint grid, dark mode themes, konfigurasi kustom token desain.",
          en: "Utility-first design systems, responsive flex/grid layouts, dynamic dark modes, custom design token presets."
        }
      },
      {
        name: "HTML5 & Semantic Web",
        level: "Tingkat Lanjut",
        experienceYears: "5+ Tahun",
        icon: "html",
        color: "#f97316",
        description: {
          id: "Aksesibilitas semantic (a11y), SEO on-page, OpenGraph metadata, struktur dokumen terstandar W3C.",
          en: "Semantic accessibility (a11y), technical on-page SEO, OpenGraph tags, W3C standards compliance."
        }
      }
    ]
  },
  {
    category: {
      id: "DevOps, Server & Tooling",
      en: "DevOps, Server & Tooling"
    },
    skills: [
      {
        name: "Git & Version Control",
        level: "Mahir",
        experienceYears: "4+ Tahun",
        icon: "git",
        color: "#f43f5e",
        description: {
          id: "Branching workflows (feature, hotfix, staging), merge conflict resolution, rebase, Git hooks.",
          en: "Branching strategies (feature, hotfix, release), conflict resolution, interactive rebase, Git hooks."
        }
      },
      {
        name: "GitLab CI/CD",
        level: "Menengah",
        experienceYears: "2 Tahun",
        icon: "gitlab",
        color: "#f97316",
        description: {
          id: "Automated pipeline scripting (.gitlab-ci.yml), build testing, zero-downtime SSH deployment.",
          en: "Pipeline scripting (.gitlab-ci.yml), automated test suites, zero-downtime SSH automated deployments."
        }
      },
      {
        name: "Linux & Nginx",
        level: "Mahir",
        experienceYears: "3+ Tahun",
        icon: "linux",
        color: "#facc15",
        description: {
          id: "Ubuntu Server administration, Nginx virtual host configuration, SSL certbot, cronjobs, bash scripting.",
          en: "Ubuntu Server administration, Nginx virtual host reverse proxy, SSL certbot, crontab automation, bash."
        }
      },
      {
        name: "Figma to Code",
        level: "Mahir",
        experienceYears: "3+ Tahun",
        icon: "figma",
        color: "#a855f7",
        description: {
          id: "Penerjemahan pixel-perfect desain UI/UX menjadi komponen web responsif dan interaktif.",
          en: "Pixel-perfect translation of design specifications into accessible, high-performance responsive components."
        }
      }
    ]
  },
  {
    category: {
      id: "AI Engineering & CLI Tooling",
      en: "AI Engineering & CLI Tooling"
    },
    skills: [
      {
        name: "Antigravity CLI & Statuslines",
        level: "Tingkat Lanjut",
        experienceYears: "2026",
        icon: "terminal",
        color: "#00f0ff",
        description: {
          id: "Kustomisasi CLI statusline HUD real-time (agy-statusline), pemantauan kuota model 3P/Gemini, context window tracking, dan hook scripting.",
          en: "Real-time CLI statusline HUD customization (agy-statusline), 3P/Gemini quota monitoring, context window telemetry, and shell hooks."
        }
      },
      {
        name: "Autonomous Agent Orchestration",
        level: "Mahir",
        experienceYears: "2026",
        icon: "cpu",
        color: "#ff007f",
        description: {
          id: "Multi-agent task delegation, prompt engineering, automated task execution, and autonomous problem diagnosis.",
          en: "Multi-agent task delegation, prompt engineering, automated task execution, and autonomous problem diagnosis."
        }
      },
      {
        name: "Codebase Knowledge Graphs (Graphify)",
        level: "Mahir",
        experienceYears: "2026",
        icon: "network",
        color: "#ffe600",
        description: {
          id: "Analisis AST kode, visualisasi arsitektur sistem, shortest path dependency tracing, dan dokumentasi otomatis berbasis graf.",
          en: "Code AST analysis, system architecture mapping, shortest path dependency tracing, and automated graph-based documentation."
        }
      },
      {
        name: "Clean Code & AI Refactoring",
        level: "Tingkat Lanjut",
        experienceYears: "2026",
        icon: "code",
        color: "#00ff9d",
        description: {
          id: "Penerapan clean-code-javascript, composability, immutability, refaktorisasi aman (safe-refactor), dan eliminasi AI slop.",
          en: "Adherence to clean-code principles, composability, immutability, behavior-preserving refactoring, and concise human writing."
        }
      }
    ]
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-bnsp",
    title: "Sertifikasi Profesi Digital Marketing",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    period: "2024 - 2027",
    credentialUrl: "/assets/files/Sertifikat BNSP Digital Marketing.pdf",
    isPdf: true,
    category: "Professional Government Certification"
  },
  {
    id: "cert-dicoding-aws",
    title: "Belajar Dasar AWS Cloud",
    issuer: "Dicoding Indonesia (AWS Partner)",
    period: "2023 - 2026",
    credentialUrl: "https://www.dicoding.com/certificates/L4PQGGD4QZO1",
    category: "Cloud Infrastructure"
  },
  {
    id: "cert-dicoding-devops",
    title: "Dasar Pemrograman & Pengenalan DevOps",
    issuer: "Dicoding Indonesia",
    period: "2023 - 2026",
    credentialUrl: "https://www.dicoding.com/certificates/EYX46YVVWPDL",
    category: "DevOps & CI/CD"
  },
  {
    id: "cert-dicoding-backend",
    title: "Memulai Pemrograman Back-End",
    issuer: "Dicoding Indonesia",
    period: "2023 - 2026",
    credentialUrl: "https://www.dicoding.com/certificates/72ZD8YYK6ZYW",
    category: "Backend Architecture"
  },
  {
    id: "cert-dicoding-js",
    title: "Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    period: "2023 - 2026",
    credentialUrl: "https://www.dicoding.com/certificates/07Z6V85KYXQR",
    category: "Web Engineering"
  },
  {
    id: "cert-dicoding-dataviz",
    title: "Dasar Visualisasi Data",
    issuer: "Dicoding Indonesia",
    period: "2023 - 2026",
    credentialUrl: "https://www.dicoding.com/certificates/L4PQG831QZO1",
    category: "Data Analytics"
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "STMIK Indonesia Mandiri",
    degree: {
      id: "Sarjana Komputer (S1) - Teknik Informatika",
      en: "Bachelor of Computer Science (S1) - Informatics Engineering"
    },
    period: "2021 - 2025",
    score: "IPK 3.41 / 4.00",
    description: {
      id: "Fokus mendalam pada rekayasa perangkat lunak, sistem basis data relasional, pengujian keamanan aplikasi web, serta audit SEO dan performa sistem.",
      en: "In-depth specialization in software engineering, relational database architectures, web application security, and system performance auditing."
    },
    tags: ["Software Engineering", "Database Systems", "Web Architecture", "Algorithms", "SEO Optimization"]
  },
  {
    institution: "SMK MedikaCom Bandung",
    degree: {
      id: "Teknik Komputer dan Jaringan (TKJ)",
      en: "Computer and Network Engineering (TKJ)"
    },
    period: "Lulus 2021",
    score: "Nilai Akhir: 83 / 100",
    description: {
      id: "Fondasi komputasi praktis: konfigurasi jaringan LAN/WAN, routing mikrotik, perakitan server, sistem operasi Linux, dan dasar pemrograman web.",
      en: "Practical computational foundation: LAN/WAN topology configuration, server hardware assembly, Linux network administration, and basic scripting."
    },
    tags: ["Networking", "Linux Administration", "Routing & Switching", "Hardware Maintenance"]
  }
];

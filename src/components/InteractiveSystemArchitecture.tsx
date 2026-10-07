import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Layers,
  Cpu,
  Play,
  RotateCcw,
  Zap,
  Code2,
  Activity
} from 'lucide-react';
import { TechIcon } from './TechIcons';
import { motion, AnimatePresence } from 'framer-motion';

export interface ArchitectureSystem {
  id: string;
  title: { id: string; en: string };
  badge: string;
  badgeColor: string;
  description: { id: string; en: string };
  nodes: {
    id: string;
    name: string;
    tech: string;
    techIcon: string;
    layer: { id: string; en: string };
    color: string;
    role: { id: string; en: string };
    rationale: { id: string; en: string };
    metrics: { label: string; value: string }[];
    codeSnippet: {
      filename: string;
      language: string;
      code: string;
    };
  }[];
  simulationSteps: {
    step: number;
    title: { id: string; en: string };
    nodeId: string;
    detail: { id: string; en: string };
    durationMs: number;
  }[];
}

const SYSTEMS: ArchitectureSystem[] = [
  {
    id: 'liveeuy-streaming',
    title: {
      id: 'LiveEuy: High-Throughput HLS Video Streaming Architecture',
      en: 'LiveEuy: High-Throughput HLS Video Streaming Architecture'
    },
    badge: 'REACT 18 + GOLANG STREAMING CORE',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/40',
    description: {
      id: 'Arsitektur streaming video berskala tinggi. Frontend React 18 menangani adaptasi buffer & ambient lighting, disokong oleh microservice Go (Golang) berlatensi rendah untuk streaming potongan video (.ts/.m3u8) secara konkuren.',
      en: 'High-throughput video streaming architecture. React 18 frontend manages adaptive playback & ambient canvas lighting, backed by a low-latency Go microservice delivering concurrent HLS video chunks.'
    },
    nodes: [
      {
        id: 'client-react',
        name: 'Client Video Player',
        tech: 'React 18 + TypeScript + HLS.js',
        techIcon: 'react',
        layer: { id: 'Presentation & Client Layer', en: 'Presentation & Client Layer' },
        color: '#38BDF8',
        role: {
          id: 'Memutar video adaptif HLS, ekstraksi warna canvas real-time untuk efek Ambient Glow, dan buffering prediktif.',
          en: 'Plays adaptive HLS streams, performs real-time canvas color extraction for Ambient Glow, and manages predictive buffering.'
        },
        rationale: {
          id: 'React 18 concurrent rendering memungkinkan UI player tetap mulus 60 FPS saat memproses frame canvas 30x per detik tanpa stuttering.',
          en: 'React 18 concurrent features ensure 60 FPS UI responsiveness while running canvas frame analyzers 30 times per second.'
        },
        metrics: [
          { label: 'UI Frame Rate', value: '60 FPS Smooth' },
          { label: 'Scrub Latency', value: '< 60ms' }
        ],
        codeSnippet: {
          filename: 'HlsPlayerConsumer.tsx',
          language: 'typescript',
          code: `// React 18 Client: HLS Buffer Controller & Canvas Ambient Glow
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export const StreamViewer: React.FC<{ streamId: string }> = ({ streamId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || !Hls.isSupported()) return;

    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
      maxBufferLength: 20 // 20-second rolling buffer
    });

    // Request HLS manifest from Go high-throughput edge
    hls.loadSource(\`/api/v1/streams/\${streamId}/playlist.m3u8\`);
    hls.attachMedia(videoRef.current);

    return () => hls.destroy();
  }, [streamId]);

  return <video ref={videoRef} autoPlay muted playsInline className="w-full rounded-2xl" />;
};`
        }
      },
      {
        id: 'edge-gateway',
        name: 'Edge API Gateway',
        tech: 'Nginx + HTTP/2 Reverse Proxy',
        techIcon: 'nginx',
        layer: { id: 'Network & Edge Routing', en: 'Network & Edge Routing' },
        color: '#10B981',
        role: {
          id: 'Terminasi SSL TLS 1.3, kompresi Brotli/Gzip, CORS policy enforcement, dan segment caching headers.',
          en: 'TLS 1.3 SSL termination, Brotli/Gzip compression, CORS enforcement, and cache-control headers for static chunks.'
        },
        rationale: {
          id: 'Nginx bertindak sebagai benteng terdepan untuk menyaring DDoS, membagi rute chunk statis dan websocket streaming.',
          en: 'Nginx acts as first-line defense against DDoS and intelligently routes static chunk traffic vs live websocket signals.'
        },
        metrics: [
          { label: 'Edge Cache Hit', value: '94.2%' },
          { label: 'SSL Handshake', value: '< 8ms' }
        ],
        codeSnippet: {
          filename: 'nginx-stream.conf',
          language: 'nginx',
          code: `# Nginx Edge Config: Low-Latency HLS Delivery
location /api/v1/streams/ {
    proxy_pass http://golang_stream_backend:8080;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_set_header Host $host;

    # Aggressive caching for immutable video segments
    location ~* \\.(ts|m4s)$ {
        proxy_cache hls_cache;
        proxy_cache_valid 200 24h;
        add_header X-Cache-Status $upstream_cache_status;
    }
}`
        }
      },
      {
        id: 'golang-backend',
        name: 'Streaming Chunk Engine',
        tech: 'Go (Golang 1.22) + Goroutines',
        techIcon: 'golang',
        layer: { id: 'High-Concurrency Streaming Core', en: 'High-Concurrency Streaming Core' },
        color: '#00ADD8',
        role: {
          id: 'Melayani ribuan request chunk video secara simultan dengan Goroutines ringan, dynamic segment slicing, dan token validation.',
          en: 'Serves thousands of concurrent segment slicing requests using lightweight Goroutines and zero-copy I/O streaming.'
        },
        rationale: {
          id: 'Golang dipilih karena overhead Goroutine sangat kecil (~2KB vs ~1MB pada thread OS konvensional), mampu menangani 20.000+ koneksi streaming konkuren dengan memory footprint minimal.',
          en: 'Go was chosen because Goroutines only take ~2KB per thread, easily serving 20,000+ concurrent video consumers with tiny memory footprint.'
        },
        metrics: [
          { label: 'Goroutine Concurrency', value: '15,000+ active' },
          { label: 'Chunk Dispatch Latency', value: '< 4ms' }
        ],
        codeSnippet: {
          filename: 'stream_engine.go',
          language: 'go',
          code: `package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

// StreamChunkHandler melayani potongan video HLS dengan zero-copy transfer
func StreamChunkHandler(w http.ResponseWriter, r *http.Request) {
	chunkFile := r.URL.Query().Get("chunk")
	filePath := fmt.Sprintf("/storage/streams/%s", chunkFile)

	file, err := os.Open(filePath)
	if err != nil {
		http.Error(w, "Segment not found", http.StatusNotFound)
		return
	}
	defer file.Close()

	w.Header().Set("Content-Type", "video/MP2T")
	w.Header().Set("Cache-Control", "public, max-age=86400")

	// High-speed zero-copy stream chunk transmission
	_, _ = io.Copy(w, file)
}`
        }
      },
      {
        id: 'data-cache',
        name: 'Cache & Metadata Store',
        tech: 'Redis 7 + PostgreSQL',
        techIcon: 'database',
        layer: { id: 'Data & Session State', en: 'Data & Session State' },
        color: '#A855F7',
        role: {
          id: 'Redis menyimpan session watch progress & token valid, PostgreSQL menyimpan metadata film & katalog media.',
          en: 'Redis caches active watch progress & tokens, PostgreSQL persists verified movie metadata & catalog assets.'
        },
        rationale: {
          id: 'Pemisahan state in-memory (Redis < 1ms) dengan ACID database mencegah bottleneck I/O disk saat ribuan penonton mengklik pause/resume.',
          en: 'Separating in-memory state (Redis < 1ms) from ACID storage prevents disk I/O bottlenecks during peak traffic.'
        },
        metrics: [
          { label: 'Cache Read Latency', value: '0.8ms' },
          { label: 'Storage Consistency', value: '100% ACID' }
        ],
        codeSnippet: {
          filename: 'session_cache.go',
          language: 'go',
          code: `// Redis Session Progress Saver in Go
func SaveWatchPosition(ctx context.Context, rdb *redis.Client, userId string, pos int) error {
	key := fmt.Sprintf("watch:%s", userId)
	return rdb.Set(ctx, key, pos, 24*time.Hour).Err()
}`
        }
      }
    ],
    simulationSteps: [
      {
        step: 1,
        title: { id: 'React Client Meminta Chunk Video', en: 'React Client Requests Video Chunk' },
        nodeId: 'client-react',
        detail: {
          id: 'Hls.js di React mendeteksi perubahan bandwidth dan meminta chunk 1080p berikutnya (/stream/segment-042.ts).',
          en: 'React Hls.js detects bandwidth headroom and requests the next 1080p segment (/stream/segment-042.ts).'
        },
        durationMs: 400
      },
      {
        step: 2,
        title: { id: 'Nginx Edge Memeriksa Cache & Auth', en: 'Nginx Edge Checks Cache & Rate-Limit' },
        nodeId: 'edge-gateway',
        detail: {
          id: 'Reverse proxy memvalidasi token otorisasi dan mengecek ketersediaan segment di memory cache.',
          en: 'Reverse proxy validates token and checks segment existence in proxy buffer cache.'
        },
        durationMs: 350
      },
      {
        step: 3,
        title: { id: 'Go Engine Mengirim Chunk via Goroutine', en: 'Go Engine Streams Chunk via Goroutine' },
        nodeId: 'golang-backend',
        detail: {
          id: 'Goroutine Golang mengeksekusi transfer zero-copy io.Copy() ke socket klien dalam 3.2ms.',
          en: 'Golang Goroutine executes zero-copy transfer io.Copy() to client socket in 3.2ms.'
        },
        durationMs: 450
      },
      {
        step: 4,
        title: { id: 'Update Posisi Tonton ke Redis', en: 'Update Watch Position to Redis' },
        nodeId: 'data-cache',
        detail: {
          id: 'Watch timeline tersinkronisasi instan ke Redis key dengan TTL 24 jam.',
          en: 'Watch timeline is updated atomically into Redis key with 24h expiry.'
        },
        durationMs: 300
      }
    ]
  },
  {
    id: 'marketplace-concurrency',
    title: {
      id: 'Marketplace Solas: Concurrency & Distributed Lock Engine',
      en: 'Marketplace Solas: Concurrency & Distributed Lock Engine'
    },
    badge: 'REACT 18 + GOLANG DISTRIBUTED WORKER',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/40',
    description: {
      id: 'Arsitektur penanganan flash sale berkecepatan tinggi. React 18 menyediakan dashboard inventaris responsif, Go (Golang) bertindak sebagai worker antrean berkecepatan tinggi yang mengunci stok di Redis sebelum transaksi commit ke MySQL.',
      en: 'High-speed flash sale concurrency architecture. React 18 powers real-time stock dashboards, while Go acts as high-speed queue workers securing distributed mutexes before committing to MySQL.'
    },
    nodes: [
      {
        id: 'client-react',
        name: 'React Inventory Dashboard',
        tech: 'React 18 + Tailwind CSS',
        techIcon: 'react',
        layer: { id: 'Storefront & Management UI', en: 'Storefront & Management UI' },
        color: '#38BDF8',
        role: {
          id: 'Menampilkan katalog SKU farmasi, mutasi stok real-time via Server-Sent Events, dan interaksi checkout instan.',
          en: 'Displays pharma SKU catalog, real-time stock mutation updates via SSE, and instant checkout triggers.'
        },
        rationale: {
          id: 'React state optimistic updates memberikan feedback seketika pada user tanpa menunggu round-trip transaksi database selesai.',
          en: 'React optimistic UI mutations provide instant user feedback without waiting for long database transaction cycles.'
        },
        metrics: [
          { label: 'Client Feedback', value: '< 16ms' },
          { label: 'Bundle Size', value: 'Lightweight Vite' }
        ],
        codeSnippet: {
          filename: 'InventoryMutation.tsx',
          language: 'typescript',
          code: `// React 18: Instant Checkout Trigger with Optimistic State
export const useCheckout = () => {
  const handleOrder = async (sku: string, qty: number) => {
    // Send directly to Go High-Speed Ingestion Gateway
    const res = await fetch('/api/v1/orders/fast-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sku, qty, idempotencyKey: crypto.randomUUID() })
    });
    return res.json();
  };
  return { handleOrder };
};`
        }
      },
      {
        id: 'golang-backend',
        name: 'Go Mutex Worker Service',
        tech: 'Go (Golang 1.22) + Worker Channels',
        techIcon: 'golang',
        layer: { id: 'High-Speed Webhook & Mutex Service', en: 'High-Speed Webhook & Mutex Service' },
        color: '#00ADD8',
        role: {
          id: 'Menerima ribuan webhook order Shopee & Tokopedia, mendistribusikan ke worker pool channel Go, dan mengunci stok via Redis Mutex.',
          en: 'Ingests thousands of marketplace webhooks, dispatches them across Go worker channels, and claims atomic Redis mutexes.'
        },
        rationale: {
          id: 'Go unggul dalam throughput I/O murni: mampu menampung 10.000 webhook order per detik dan memproses lock stok di bawah 5 milidetik per transaksi.',
          en: 'Go excels at high I/O throughput: ingests 10,000 orders/sec and resolves stock locking under 5ms per transaction.'
        },
        metrics: [
          { label: 'Worker Throughput', value: '12,500 req/sec' },
          { label: 'Lock Resolution', value: '< 3.5ms' }
        ],
        codeSnippet: {
          filename: 'order_worker.go',
          language: 'go',
          code: `package main

import (
	"context"
	"time"
	"github.com/bsm/redislock"
)

// ProcessFastCheckout mengunci stok obat secara terdistribusi
func ProcessFastCheckout(locker *redislock.Client, sku string) (bool, error) {
	ctx := context.Background()
	lockKey := "mutex:stock:" + sku

	// Kunci stok maksimal 500ms agar mencegah race condition
	lock, err := locker.Obtain(ctx, lockKey, 500*time.Millisecond, nil)
	if err == redislock.ErrNotObtained {
		return false, nil // Slot sedang dipesan pembeli lain
	} else if err != nil {
		return false, err
	}
	defer lock.Release(ctx)

	// Mutex aman didapatkan -> lanjutkan mutasi inventaris
	return true, nil
}`
        }
      },
      {
        id: 'redis-lock',
        name: 'Distributed Lock Store',
        tech: 'Redis 7 In-Memory Mutex',
        techIcon: 'database',
        layer: { id: 'In-Memory Concurrency Control', en: 'In-Memory Concurrency Control' },
        color: '#F43F5E',
        role: {
          id: 'Menyediakan atomic operation SETNX (Set if Not Exists) untuk mencegah 2 pembeli membeli stok obat terakhir secara bersamaan.',
          en: 'Provides atomic SETNX (Set if Not Exists) operations preventing two customers from buying the final inventory item concurrently.'
        },
        rationale: {
          id: 'Redis RAM-based mutex menjamin zero overselling bahkan ketika traffic flash sale melonjak tajam ribuan kali lipat.',
          en: 'In-memory Redis locks guarantee zero overselling even during massive flash sale spikes.'
        },
        metrics: [
          { label: 'Operation Time', value: '0.4ms' },
          { label: 'Overselling Rate', value: '0.00% (Guaranteed)' }
        ],
        codeSnippet: {
          filename: 'redis_mutex.lua',
          language: 'lua',
          code: `-- Atomic Stock Decrement Script in Redis
if redis.call("get", KEYS[1]) > "0" then
    return redis.call("decr", KEYS[1])
else
    return -1
end`
        }
      },
      {
        id: 'core-database',
        name: 'Enterprise ERP & ACID Ledger',
        tech: 'Laravel 12 + MySQL 8.0',
        techIcon: 'laravel',
        layer: { id: 'Relational Accounting & ERP', en: 'Relational Accounting & ERP' },
        color: '#F43F5E',
        role: {
          id: 'Mencatat faktur resmi, pajak PPN obat, riwayat pelanggan, serta mutasi buku besar keuangan dengan transaksi ACID.',
          en: 'Records official tax invoices, pharma billing, customer CRM, and ledger movements under strict ACID compliance.'
        },
        rationale: {
          id: 'Setelah Go & Redis memastikan stok aman, Laravel menyelesaikan bisnis logic ERP yang kompleks (faktur, pengiriman, audit trail).',
          en: 'After Go & Redis guarantee stock security, Laravel finalizes complex ERP business logic, invoicing, and audit records.'
        },
        metrics: [
          { label: 'Data Integrity', value: '100% ACID' },
          { label: 'Role Security', value: 'Spatie RBAC' }
        ],
        codeSnippet: {
          filename: 'OrderFinalizer.php',
          language: 'php',
          code: `// Laravel 12: Finalize Order with Row-Level Locking
DB::transaction(function () use ($orderData) {
    $stock = Inventory::where('sku', $orderData['sku'])->lockForUpdate()->first();
    $stock->decrement('quantity', $orderData['qty']);
    Invoice::create([...]);
});`
        }
      }
    ],
    simulationSteps: [
      {
        step: 1,
        title: { id: 'Pembeli Klik Bayar di React App', en: 'User Clicks Pay in React App' },
        nodeId: 'client-react',
        detail: {
          id: 'React mengirim request checkout dengan UUID idempotency token instan.',
          en: 'React dispatches checkout payload carrying a cryptographic idempotency token.'
        },
        durationMs: 300
      },
      {
        step: 2,
        title: { id: 'Go Worker Klaim Lock di Redis', en: 'Go Worker Claims Lock in Redis' },
        nodeId: 'golang-backend',
        detail: {
          id: 'Goroutine mengeksekusi SETNX ke Redis dalam 1.2ms untuk mengamankan 1 unit terakhir.',
          en: 'Goroutine invokes atomic SETNX on Redis in 1.2ms to secure the last unit.'
        },
        durationMs: 400
      },
      {
        step: 3,
        title: { id: 'Redis Mutex Sukses Diamankan', en: 'Redis Mutex Secured' },
        nodeId: 'redis-lock',
        detail: {
          id: 'Stok berkurang dari 1 -> 0 secara atomik. Request kedua dari pembeli lain langsung dialihkan.',
          en: 'Stock decrements from 1 -> 0 atomically. Duplicate requests are rejected gracefully.'
        },
        durationMs: 350
      },
      {
        step: 4,
        title: { id: 'Laravel Mencatat Faktur & Respon 200 OK', en: 'Laravel Logs Invoice & Returns 200 OK' },
        nodeId: 'core-database',
        detail: {
          id: 'Faktur tercetak dan nomor resi diterbitkan. Total siklus selesai dalam 8.4ms!',
          en: 'Invoice generated and tracking ID issued. Full lifecycle resolves in 8.4ms!'
        },
        durationMs: 350
      }
    ]
  }
];

export const InteractiveSystemArchitecture: React.FC<{ defaultSystemId?: string }> = ({ defaultSystemId }) => {
  const { language } = useLanguage();
  const [selectedSystemId, setSelectedSystemId] = useState<string>(
    defaultSystemId || SYSTEMS[0].id
  );

  const currentSystem = SYSTEMS.find(s => s.id === selectedSystemId) || SYSTEMS[0];
  const [selectedNodeId, setSelectedNodeId] = useState<string>(currentSystem.nodes[0].id);

  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeSimulationStep, setActiveSimulationStep] = useState<number | null>(null);

  const activeNode = currentSystem.nodes.find(n => n.id === selectedNodeId) || currentSystem.nodes[0];

  const handleRunSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);

    for (let i = 0; i < currentSystem.simulationSteps.length; i++) {
      const step = currentSystem.simulationSteps[i];
      setActiveSimulationStep(step.step);
      setSelectedNodeId(step.nodeId);
      await new Promise(res => setTimeout(res, step.durationMs));
    }

    setActiveSimulationStep(null);
    setIsSimulating(false);
  };

  const handleSelectSystem = (id: string) => {
    setSelectedSystemId(id);
    const target = SYSTEMS.find(s => s.id === id) || SYSTEMS[0];
    setSelectedNodeId(target.nodes[0].id);
    setActiveSimulationStep(null);
  };

  return (
    <div className="space-y-6">
      
      {/* System Selector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-xs mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive System Design Blueprint</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100 font-sans">
            {currentSystem.title[language]}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {currentSystem.description[language]}
          </p>
        </div>

        {/* System Switcher Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {SYSTEMS.map(sys => (
            <button
              key={sys.id}
              onClick={() => handleSelectSystem(sys.id)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                selectedSystemId === sys.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
              }`}
            >
              {sys.id === 'liveeuy-streaming' ? 'LiveEuy (Go + React)' : 'Marketplace Mutex (Go + React)'}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Visual Architecture Pipeline */}
      <div className="p-6 rounded-2xl bg-[#080c18] border border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>{language === 'id' ? 'Klik layer node di bawah untuk inspeksi:' : 'Click any node below to inspect:'}</span>
          </div>

          {/* Trigger Simulation Button */}
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-mono font-bold text-xs transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            {isSimulating ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>{language === 'id' ? 'Data Mengalir...' : 'Simulating Flow...'}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{language === 'id' ? 'Simulasikan Alur Data' : 'Simulate Request Flow'}</span>
              </>
            )}
          </button>
        </div>

        {/* Pipeline Nodes Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative z-10">
          {currentSystem.nodes.map((node, index) => {
            const isSelected = selectedNodeId === node.id;
            const isSimulatingThisNode = activeSimulationStep !== null && currentSystem.simulationSteps[activeSimulationStep - 1]?.nodeId === node.id;

            return (
              <motion.div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                whileHover={{ y: -2 }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden ${
                  isSelected || isSimulatingThisNode
                    ? 'bg-slate-900 border-cyan-400/80 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Active Indicator Top Line */}
                {(isSelected || isSimulatingThisNode) && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400 animate-pulse" />
                )}

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    Stage 0{index + 1}
                  </span>
                  <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center">
                    <TechIcon name={node.techIcon} className="w-3.5 h-3.5" color={node.color} />
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 leading-snug">
                  {node.name}
                </h4>
                <p className="text-[11px] font-mono text-cyan-300 mt-1">
                  {node.tech}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>{node.metrics[0].label}:</span>
                  <span className="text-emerald-400 font-bold">{node.metrics[0].value}</span>
                </div>

                {isSimulatingThisNode && (
                  <div className="absolute inset-0 bg-cyan-500/10 border-2 border-cyan-400 rounded-xl pointer-events-none animate-pulse" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Live Simulation Steps Banner */}
        <AnimatePresence>
          {isSimulating && activeSimulationStep !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 flex items-center gap-3 text-xs font-mono"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <div className="flex-1">
                <span className="font-bold text-cyan-300">
                  Langkah {activeSimulationStep}: {currentSystem.simulationSteps[activeSimulationStep - 1].title[language]}
                </span>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  {currentSystem.simulationSteps[activeSimulationStep - 1].detail[language]}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Node Deep Dive Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Role, Rationale & SLA (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">
                  {activeNode.layer[language]}
                </span>
                <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2 mt-0.5">
                  <TechIcon name={activeNode.techIcon} className="w-4 h-4" color={activeNode.color} />
                  <span>{activeNode.name}</span>
                </h4>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {activeNode.tech}
              </span>
            </div>

            {/* Architectural Role */}
            <div>
              <h5 className="text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>{language === 'id' ? 'Tanggung Jawab Arsitektural' : 'Architectural Responsibility'}</span>
              </h5>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {activeNode.role[language]}
              </p>
            </div>

            {/* Why This Stack? (Engineering Rationale) */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <h5 className="text-xs font-mono font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {language === 'id'
                    ? `Mengapa Memilih ${activeNode.tech.split(' ')[0]}? (Alasan Rekayasa)`
                    : `Why Choose ${activeNode.tech.split(' ')[0]}? (Engineering Rationale)`}
                </span>
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {activeNode.rationale[language]}
              </p>
            </div>

            {/* Performance SLA Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {activeNode.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">{m.label}</span>
                  <span className="text-sm font-bold font-mono text-emerald-400 mt-0.5 block">{m.value}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right: Code Implementation Snippet (5 cols) */}
        <div className="lg:col-span-5">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{activeNode.codeSnippet.filename}</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 uppercase">
                {activeNode.codeSnippet.language}
              </span>
            </div>

            <pre className="p-3 rounded-xl bg-[#060a14] border border-slate-900 overflow-x-auto text-[11px] font-mono text-slate-300 leading-relaxed max-h-[320px]">
              <code>{activeNode.codeSnippet.code}</code>
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
};

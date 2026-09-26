import React, { useState } from 'react';
import { Play, Copy, Check, Terminal, RotateCcw, ShieldCheck, Database, ShoppingBag, Users, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type HttpMethod = 'POST' | 'GET';

interface EndpointConfig {
  id: string;
  method: HttpMethod;
  path: string;
  title: { id: string; en: string };
  badge: string;
  icon: React.ElementType;
  description: { id: string; en: string };
  defaultHeaders: Record<string, string>;
  defaultBody?: string;
  responseGenerator: (body: any) => { status: number; statusText: string; latencyMs: number; headers: Record<string, string>; data: any };
}

const ENDPOINTS: EndpointConfig[] = [
  {
    id: 'cpob-verify',
    method: 'POST',
    path: '/api/v1/cpob/verify-signature',
    title: {
      id: 'Verifikasi Token & Digital Signature CPOB',
      en: 'Verify Token & CPOB Digital Signature',
    },
    badge: 'CPOB 2018 / PIC/S',
    icon: ShieldCheck,
    description: {
      id: 'Mengirimkan payload token QR audit trail untuk validasi cryptographic hash SHA-256 e-Document farmasi berstandar ALCOA+.',
      en: 'Dispatches QR audit trail token payload to validate SHA-256 cryptographic hash of pharmaceutical e-Documents under ALCOA+ principles.',
    },
    defaultHeaders: {
      'Content-Type': 'application/json',
      'X-App-Client': 'Solas-Mobile-QR-Scanner/2.4',
      'Authorization': 'Bearer cpob_sec_token_9f81a4b',
    },
    defaultBody: JSON.stringify(
      {
        token: 'QR-CPOB-2026-X981',
        document_id: 'SOP-PROD-2026-081',
        section_code: 'GRANULASI-04',
        nonce: 'd8a1c90f33',
        verify_chain: true,
      },
      null,
      2
    ),
    responseGenerator: (body) => {
      const docId = body?.document_id || 'SOP-PROD-2026-081';
      return {
        status: 200,
        statusText: 'OK',
        latencyMs: Math.floor(Math.random() * 15) + 22,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'x-ratelimit-remaining': '98',
          'x-audit-integrity': 'VALID_SHA256_MATCH',
          'server': 'nginx/1.24.0 (Ubuntu) + PHP 8.2 FPM',
        },
        data: {
          status: 'success',
          code: 200,
          verified_at: new Date().toISOString(),
          document: {
            id: docId,
            title: 'SOP Sanitasi Mesin Granulasi Produksi Sediaan Tablet',
            version: '3.1.0',
            status: 'EFFECTIVE_VALIDATED',
          },
          signature: {
            algorithm: 'SHA-256',
            digest: 'a9f24b81c2e01b34fae23901bcae8841a12e8471e98bbcf4901237a4e019bca1',
            timestamp_utc: '2026-09-26T10:14:02.812Z',
            signer: {
              name: 'Drs. Hendrawan, Apt.',
              role: 'Qualified Person (QP) / Direktur Penjaminan Mutu',
              license_id: 'STRA-19840211-2024-9182',
              authority: 'Solas Internal CA Root - BPOM Certified',
            },
          },
          compliance: {
            standard: 'BPOM CPOB 2018 / PIC/S Guide to GMP Annex 11',
            alcoa_status: {
              attributable: true,
              legible: true,
              contemporaneous: true,
              original: true,
              accurate: true,
            },
            tamper_detected: false,
          },
        },
      };
    },
  },
  {
    id: 'marketplace-sync',
    method: 'POST',
    path: '/api/v1/marketplace/sync-inventory',
    title: {
      id: 'Sinkronisasi Stok Omnichannel Marketplace',
      en: 'Omnichannel Marketplace Inventory Sync',
    },
    badge: 'Distributed Webhook',
    icon: ShoppingBag,
    description: {
      id: 'Mensimulasikan webhook pembaruan stok real-time antar ERP gudang internal, Tokopedia API, dan Shopee Open Platform dengan distributed mutex lock.',
      en: 'Simulates real-time inventory webhook updates between internal warehouse ERP, Tokopedia API, and Shopee Open Platform with distributed lock.',
    },
    defaultHeaders: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': 'hmac-sha256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      'Idempotency-Key': 'idem-89412-bdg-sync',
    },
    defaultBody: JSON.stringify(
      {
        sku: 'SOLAS-MED-9941',
        batch_number: 'BCH-2026-09A',
        warehouse_id: 'WH-BDG-01',
        stock_delta: -12,
        trigger_reason: 'OFFLINE_PHARMACY_DISPATCH',
        channels: ['internal_erp', 'tokopedia', 'shopee'],
      },
      null,
      2
    ),
    responseGenerator: (body) => {
      const sku = body?.sku || 'SOLAS-MED-9941';
      const delta = Number(body?.stock_delta) || -12;
      return {
        status: 200,
        statusText: 'OK',
        latencyMs: Math.floor(Math.random() * 20) + 38,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'x-ratelimit-remaining': '94',
          'x-distributed-lock': 'ACQUIRED_AND_RELEASED',
          'server': 'nginx/1.24.0 (Ubuntu) + Swoole Queue Worker',
        },
        data: {
          status: 'success',
          code: 200,
          sync_id: 'SYNC-89210-TX',
          processed_at: new Date().toISOString(),
          inventory_snapshot: {
            sku: sku,
            previous_stock: 240,
            delta_applied: delta,
            current_stock: 240 + delta,
            safety_stock_threshold: 50,
            status: 'IN_STOCK_HEALTHY',
          },
          channel_dispatch: [
            { channel: 'internal_erp', status: 'COMMITTED', latency_ms: 12, response_code: 200 },
            { channel: 'tokopedia_api_v2', status: 'WEBHOOK_ACK', latency_ms: 24, sync_ack: 'TOKOPEDIA_ACK_OK' },
            { channel: 'shopee_open_v2', status: 'WEBHOOK_ACK', latency_ms: 31, sync_ack: 'SHOPEE_ACK_OK' },
          ],
          distributed_lock: {
            key: `lock:inventory:${sku}`,
            engine: 'Redis Cluster v7.2 (Sentinel)',
            mutex_duration_ms: 4.8,
            released: true,
          },
        },
      };
    },
  },
  {
    id: 'hr-candidates-stats',
    method: 'GET',
    path: '/api/v1/hr/candidates/stats?batch=2026-Q3&status=active',
    title: {
      id: 'Agregasi Data Pelamar & Psikometri HR',
      en: 'Applicant & Psychometric HR Stats',
    },
    badge: 'Solas ATS Engine',
    icon: Users,
    description: {
      id: 'Endpoint agregasi analytics portal pelamar kerja: distribusi persentase DISC, conversion rate pipeline, dan status kuota departemen.',
      en: 'Applicant portal analytics endpoint: DISC percentage distribution, pipeline recruitment funnel conversion, and department quotas.',
    },
    defaultHeaders: {
      'Accept': 'application/json',
      'X-Role-Claim': 'HR_RECRUITMENT_LEAD',
      'Authorization': 'Bearer hr_recruitment_jwt_session',
    },
    responseGenerator: () => {
      return {
        status: 200,
        statusText: 'OK',
        latencyMs: Math.floor(Math.random() * 10) + 18,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'public, max-age=180, stale-while-revalidate=60',
          'x-ratelimit-remaining': '99',
          'server': 'nginx/1.24.0 (Ubuntu) + PHP 8.2 FPM',
        },
        data: {
          status: 'success',
          code: 200,
          meta: {
            batch_id: 'SOLAS-RECRUIT-2026-Q3',
            active_departments: ['Teknologi Informasi & Sistem', 'Quality Assurance Farmasi', 'Produksi Granulasi'],
            total_applicants: 1420,
            generated_at: new Date().toISOString(),
          },
          disc_distribution: {
            dominance: { percentage: '18.4%', count: 261, archetype: 'Driver' },
            influence: { percentage: '27.1%', count: 385, archetype: 'Catalyst' },
            steadiness: { percentage: '31.5%', count: 447, archetype: 'Anchor' },
            compliance: { percentage: '23.0%', count: 327, archetype: 'Architect' },
          },
          recruitment_pipeline: {
            applied: 1420,
            online_assessment_completed: 984,
            disc_qualified: 312,
            hr_interview_scheduled: 84,
            user_technical_interview: 26,
            offering_hired: 9,
          },
          ats_engine: {
            auto_wa_dispatch_enabled: true,
            average_screening_time_minutes: 4.2,
            system_uptime: '99.98%',
          },
        },
      };
    },
  },
];

export const ApiPlayground: React.FC = () => {
  const { language } = useLanguage();
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>(ENDPOINTS[0].id);
  const [requestTab, setRequestTab] = useState<'body' | 'headers' | 'curl'>('body');
  const [responseTab, setResponseTab] = useState<'pretty' | 'headers'>('pretty');
  const [customBody, setCustomBody] = useState<Record<string, string>>({
    'cpob-verify': ENDPOINTS[0].defaultBody || '',
    'marketplace-sync': ENDPOINTS[1].defaultBody || '',
    'hr-candidates-stats': '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [responseResult, setResponseResult] = useState<any>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const activeEndpoint = ENDPOINTS.find((e) => e.id === selectedEndpointId) || ENDPOINTS[0];
  const currentBody = customBody[activeEndpoint.id] ?? (activeEndpoint.defaultBody || '');

  const handleBodyChange = (value: string) => {
    setCustomBody((prev) => ({
      ...prev,
      [activeEndpoint.id]: value,
    }));
  };

  const handleResetBody = () => {
    setCustomBody((prev) => ({
      ...prev,
      [activeEndpoint.id]: activeEndpoint.defaultBody || '',
    }));
  };

  const handleSendRequest = () => {
    setIsLoading(true);
    let parsedBody: any = null;
    if (activeEndpoint.method === 'POST') {
      try {
        parsedBody = currentBody ? JSON.parse(currentBody) : {};
      } catch (e) {
        parsedBody = { raw: currentBody, parse_error: 'Invalid JSON body' };
      }
    }

    const calculatedResult = activeEndpoint.responseGenerator(parsedBody);

    setTimeout(() => {
      setResponseResult(calculatedResult);
      setIsLoading(false);
    }, calculatedResult.latencyMs * 5); // Realistic slight delay for UI feel
  };

  const generateCurl = () => {
    const baseUrl = 'https://api.solas.co.id';
    let cmd = `curl -X ${activeEndpoint.method} "${baseUrl}${activeEndpoint.path}" \\\n`;
    Object.entries(activeEndpoint.defaultHeaders).forEach(([k, v]) => {
      cmd += `  -H "${k}: ${v}" \\\n`;
    });
    if (activeEndpoint.method === 'POST' && currentBody) {
      cmd += `  -d '${currentBody.replace(/\n/g, '').replace(/\s+/g, ' ')}'`;
    }
    return cmd;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <section id="api-playground" className="py-20 relative bg-[#080c18] border-b border-slate-800/80">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'id' ? 'Enterprise API Testbench' : 'Interactive API Console'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Live Mock <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">REST API Playground</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            {language === 'id'
              ? 'Uji langsung kontrak API enterprise berstandar industri dengan request simulator real-time. Rasakan validasi signature CPOB, sinkronisasi marketplace, dan analitik ATS HR.'
              : 'Directly test enterprise-grade REST API contracts with a real-time simulator. Experience CPOB cryptographic signature verification, marketplace sync, and HR analytics.'}
          </p>
        </div>

        {/* Endpoint Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {ENDPOINTS.map((endpoint) => {
            const Icon = endpoint.icon;
            const isSelected = selectedEndpointId === endpoint.id;
            return (
              <button
                key={endpoint.id}
                onClick={() => {
                  setSelectedEndpointId(endpoint.id);
                  setResponseResult(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0f172a] border-cyan-500/60 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                    : 'bg-[#0a0f1d]/70 border-slate-800 hover:border-slate-700 hover:bg-[#0c1324]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        endpoint.method === 'POST'
                          ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-800/60'
                          : 'bg-sky-950/90 text-sky-400 border border-sky-800/60'
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {endpoint.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <h3 className="text-sm font-semibold text-slate-100">{endpoint.title[language]}</h3>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{endpoint.description[language]}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 font-mono text-[11px] text-cyan-300 truncate">
                  {endpoint.path}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Postman / Swagger Console Box */}
        <div className="bg-[#0b1020] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
          {/* Top Address Bar */}
          <div className="p-3 sm:p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center gap-2 justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-[280px]">
              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
                  activeEndpoint.method === 'POST'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                }`}
              >
                {activeEndpoint.method}
              </span>
              <div className="flex-1 bg-slate-950/90 border border-slate-700/70 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 flex items-center justify-between">
                <span className="truncate">
                  <span className="text-slate-400">https://api.solas.co.id</span>
                  <span className="text-cyan-300 font-semibold">{activeEndpoint.path}</span>
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">HTTP/1.1</span>
              </div>
            </div>

            <button
              onClick={handleSendRequest}
              disabled={isLoading}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-xs font-mono transition-all shadow-md ${
                isLoading
                  ? 'bg-cyan-600/50 text-slate-300 cursor-wait'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>DISPATCHING...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{language === 'id' ? 'KIRIM REQUEST' : 'SEND REQUEST'}</span>
                </>
              )}
            </button>
          </div>

          {/* Dual Panel: Left Request / Right Response */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {/* Left Panel: Request Configuration */}
            <div className="flex flex-col h-[420px]">
              {/* Request Sub-tabs */}
              <div className="flex items-center justify-between border-b border-slate-800 bg-[#090e1c] px-4">
                <div className="flex text-xs font-mono">
                  {activeEndpoint.method === 'POST' && (
                    <button
                      onClick={() => setRequestTab('body')}
                      className={`py-2.5 px-3 border-b-2 font-medium transition-colors ${
                        requestTab === 'body'
                          ? 'border-cyan-400 text-cyan-300'
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      JSON Body
                    </button>
                  )}
                  <button
                    onClick={() => setRequestTab('headers')}
                    className={`py-2.5 px-3 border-b-2 font-medium transition-colors ${
                      requestTab === 'headers'
                        ? 'border-cyan-400 text-cyan-300'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Headers ({Object.keys(activeEndpoint.defaultHeaders).length})
                  </button>
                  <button
                    onClick={() => setRequestTab('curl')}
                    className={`py-2.5 px-3 border-b-2 font-medium transition-colors ${
                      requestTab === 'curl'
                        ? 'border-cyan-400 text-cyan-300'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    cURL Snippet
                  </button>
                </div>

                {requestTab === 'body' && activeEndpoint.method === 'POST' && (
                  <button
                    onClick={handleResetBody}
                    title="Reset Payload ke Default"
                    className="text-[11px] font-mono text-slate-400 hover:text-slate-200 inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Request Tab Body */}
              <div className="p-4 flex-1 overflow-auto bg-[#070b16] font-mono text-xs text-slate-300">
                {requestTab === 'body' && activeEndpoint.method === 'POST' && (
                  <div className="h-full flex flex-col">
                    <textarea
                      value={currentBody}
                      onChange={(e) => handleBodyChange(e.target.value)}
                      spellCheck={false}
                      aria-label="Request JSON Body Editor"
                      className="w-full flex-1 p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-emerald-400 font-mono text-xs focus:outline-none focus:border-cyan-500/60 resize-none leading-relaxed selection:bg-cyan-900"
                    />
                    <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
                      <span>✓ Valid JSON Schema Payload</span>
                      <span>Content-Type: application/json</span>
                    </div>
                  </div>
                )}

                {requestTab === 'headers' && (
                  <div className="space-y-2">
                    <div className="text-[11px] text-slate-400 mb-2 uppercase font-semibold">
                      HTTP Request Headers
                    </div>
                    {Object.entries(activeEndpoint.defaultHeaders).map(([key, val]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80 text-xs"
                      >
                        <span className="text-cyan-400 font-semibold">{key}</span>
                        <span className="text-slate-300 font-mono select-all truncate max-w-[280px]">{val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {requestTab === 'curl' && (
                  <div className="relative h-full flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] text-slate-400 uppercase font-semibold">Terminal Command</span>
                      <button
                        onClick={() => handleCopy(generateCurl(), 'curl')}
                        className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 bg-slate-900 px-2 py-1 rounded border border-slate-800"
                      >
                        {copiedType === 'curl' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedType === 'curl' ? 'Copied' : 'Copy cURL'}</span>
                      </button>
                    </div>
                    <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-amber-300 text-xs overflow-auto flex-1 leading-relaxed">
                      {generateCurl()}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel: Response Inspector */}
            <div className="flex flex-col h-[420px] bg-[#070a14]">
              {/* Response Sub-tabs & Metrics */}
              <div className="flex items-center justify-between border-b border-slate-800 bg-[#090d19] px-4">
                <div className="flex text-xs font-mono">
                  <button
                    onClick={() => setResponseTab('pretty')}
                    className={`py-2.5 px-3 border-b-2 font-medium transition-colors ${
                      responseTab === 'pretty'
                        ? 'border-emerald-400 text-emerald-300'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    JSON Response
                  </button>
                  <button
                    onClick={() => setResponseTab('headers')}
                    className={`py-2.5 px-3 border-b-2 font-medium transition-colors ${
                      responseTab === 'headers'
                        ? 'border-emerald-400 text-emerald-300'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Response Headers
                  </button>
                </div>

                {responseResult && (
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {responseResult.status} {responseResult.statusText}
                    </span>
                    <span className="text-slate-400 hidden sm:inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {responseResult.latencyMs} ms
                    </span>
                    <button
                      onClick={() => handleCopy(JSON.stringify(responseResult.data, null, 2), 'response')}
                      className="p-1 text-slate-400 hover:text-white"
                      title="Salin JSON Respons"
                    >
                      {copiedType === 'response' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Response Content View */}
              <div className="p-4 flex-1 overflow-auto font-mono text-xs">
                {isLoading ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-mono">Eksekusi REST controller & middleware verification...</p>
                  </div>
                ) : responseResult ? (
                  responseTab === 'pretty' ? (
                    <pre className="text-slate-200 leading-relaxed overflow-x-auto text-[11px] selection:bg-emerald-900">
                      {JSON.stringify(responseResult.data, null, 2)}
                    </pre>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-[11px] text-slate-400 uppercase font-semibold mb-2">
                        HTTP/1.1 Response Headers
                      </div>
                      {Object.entries(responseResult.headers).map(([k, v]) => (
                        <div
                          key={k}
                          className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800 text-xs"
                        >
                          <span className="text-emerald-400 font-semibold">{k}</span>
                          <span className="text-slate-300 font-mono">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <Database className="w-10 h-10 mb-2 text-slate-600 stroke-[1.5]" />
                    <p className="text-xs font-mono text-slate-400 mb-1">
                      {language === 'id' ? 'Konsol Siap Digunakan' : 'Ready to Send Request'}
                    </p>
                    <p className="text-[11px] text-slate-500 max-w-xs">
                      {language === 'id'
                        ? 'Tekan tombol "KIRIM REQUEST" di atas untuk memanggil mock controller dan memeriksa respons data.'
                        : 'Click "SEND REQUEST" above to invoke the mock controller and inspect response payload.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Engineering Highlights */}
          <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                RESTful Specification v3.0 Compliant
              </span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline text-sky-400">Spatie Token Middleware Enabled</span>
            </div>
            <div className="text-slate-500">
              Protocol: <span className="text-slate-300">TLS 1.3 / HTTPS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

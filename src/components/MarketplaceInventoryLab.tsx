import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingBag, Lock, CheckCircle2, XCircle, RotateCcw, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

interface TransactionLog {
  id: string;
  time: string;
  channel: 'Shopee' | 'Tokopedia';
  buyer: string;
  status: 'SUCCESS' | 'REJECTED_OUT_OF_STOCK';
  message: string;
}

export const MarketplaceInventoryLab: React.FC = () => {
  const { language } = useLanguage();

  const [stock, setStock] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [logs, setLogs] = useState<TransactionLog[]>([]);

  const handlePurchase = (channel: 'Shopee' | 'Tokopedia', buyerName: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    setTimeout(() => {
      if (stock > 0) {
        setStock(prev => prev - 1);
        setLogs(prev => [
          {
            id: `TX-${Date.now().toString().slice(-4)}`,
            time: new Date().toLocaleTimeString('id-ID'),
            channel,
            buyer: buyerName,
            status: 'SUCCESS',
            message: language === 'id' 
              ? `Berhasil checkout 1 unit via ${channel}! Pembayaran terverifikasi.` 
              : `Successfully purchased 1 unit via ${channel}! Payment verified.`
          },
          ...prev
        ]);
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } else {
        setLogs(prev => [
          {
            id: `TX-${Date.now().toString().slice(-4)}`,
            time: new Date().toLocaleTimeString('id-ID'),
            channel,
            buyer: buyerName,
            status: 'REJECTED_OUT_OF_STOCK',
            message: language === 'id'
              ? `Ditolak otomatis! Barang sudah habis dibeli pelanggan lain di detik yang sama.`
              : `Automatically blocked! Stock depleted by another buyer in the exact same millisecond.`
          },
          ...prev
        ]);
      }
      setIsProcessing(false);
    }, 400);
  };

  const handleSimulateRaceCondition = () => {
    if (stock <= 0 || isProcessing) return;
    setIsProcessing(true);

    setTimeout(() => {
      // One wins the lock, the other gets rejected
      setStock(0);
      const now = new Date().toLocaleTimeString('id-ID');
      setLogs(prev => [
        {
          id: `TX-${Date.now().toString().slice(-4)}-1`,
          time: now,
          channel: 'Shopee',
          buyer: 'Budi (Shopee User)',
          status: 'SUCCESS',
          message: language === 'id' 
            ? 'Kunci stok (Mutex Lock) berhasil didapat! Barang aman dikirim ke Budi.'
            : 'Acquired Mutex Lock! Order secured for Budi.'
        },
        {
          id: `TX-${Date.now().toString().slice(-4)}-2`,
          time: now,
          channel: 'Tokopedia',
          buyer: 'Siti (Tokopedia User)',
          status: 'REJECTED_OUT_OF_STOCK',
          message: language === 'id'
            ? 'Stok terkunci oleh transaksi Shopee! Pembayaran Siti dibatalkan instan (Zero Overselling).'
            : 'Stock locked by concurrent Shopee order! Safely rejected without overselling.'
        },
        ...prev
      ]);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      setIsProcessing(false);
    }, 500);
  };

  const handleResetStock = () => {
    setStock(1);
    setLogs([]);
  };

  return (
    <div className="space-y-8">
      {/* Non-IT Friendly Header Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#070d28] via-[#09133b] to-[#070d28] border border-[#ff007f]/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-950 text-[#ff007f] border border-[#ff007f]/50 font-orbitron">
                KONSEP NON-IT // E-COMMERCE
              </span>
              <span className="text-xs font-mono text-slate-400">Proyek: Marketplace Solas & Inventarisku</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-100 font-orbitron">
              {language === 'id'
                ? 'Bagaimana Toko Online Mencegah Barang Habis Dibeli 2 Orang Bersamaan?'
                : 'How E-Commerce Prevents Two Customers Buying The Last Item Concurrently'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {language === 'id'
                ? 'Bayangkan toko Anda menjual barang diskon kilat (Flash Sale) dan stoknya tinggal 1 unit. Tiba-tiba di detik yang sama, pembeli di Shopee dan pembeli di Tokopedia mengklik tombol bayar bersamaan! Sistem penguncian otomatis (Mutex) ini mengamankan stok dalam milidetik sehingga toko tidak pernah menjual barang fiktif (Zero Overselling).'
                : 'Imagine an exclusive flash sale item with only 1 unit remaining. Two customers on Shopee and Tokopedia hit checkout at the exact same millisecond! This distributed mutex lock secures the stock instantly, protecting the seller from selling non-existent inventory.'}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff9d] animate-ping" />
            <span className="text-xs font-mono text-[#00ff9d] font-bold">Simulator Aktif</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Product Showcase & Interactive Checkout Triggers (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Virtual Product Card */}
          <div className="p-5 rounded-2xl bg-[#080d24] border border-[#1c2452] shadow-xl relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-[#ffe600] border border-[#ffe600]/40 font-orbitron font-bold">
                ⚡ FLASH SALE EXCLUSIVE
              </span>
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="text-slate-400">Sisa Stok Gudang:</span>
                <span className={`font-extrabold text-sm px-2 py-0.5 rounded ${
                  stock > 0 ? 'bg-emerald-950 text-[#00ff9d] border border-[#00ff9d]/50' : 'bg-red-950 text-red-400 border border-red-500/50'
                }`}>
                  {stock} UNIT
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 py-2 border-y border-slate-800">
              <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl shrink-0">
                ⌨️
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-100 font-orbitron">
                  Mechanical Keyboard Cyberpunk Edition
                </h4>
                <p className="text-xs text-[#00f0ff] font-mono font-bold mt-0.5">
                  Rp 450.000 <span className="text-slate-500 line-through text-[11px] font-normal">Rp 1.200.000</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                  Tersinkronisasi otomatis lintas channel Shopee & Tokopedia.
                </p>
              </div>
            </div>

            {/* Interactive Buy Buttons */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-mono text-slate-400">Uji Coba Transaksi:</div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handlePurchase('Shopee', 'Budi')}
                  disabled={isProcessing}
                  className="p-3 rounded-xl bg-[#ea580c]/15 hover:bg-[#ea580c]/25 border border-[#ea580c]/60 text-orange-400 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Beli via Shopee</span>
                </button>

                <button
                  onClick={() => handlePurchase('Tokopedia', 'Siti')}
                  disabled={isProcessing}
                  className="p-3 rounded-xl bg-[#16a34a]/15 hover:bg-[#16a34a]/25 border border-[#16a34a]/60 text-emerald-400 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Beli via Tokopedia</span>
                </button>
              </div>

              {/* Stress Test Simultaneous Race Condition Button */}
              <button
                onClick={handleSimulateRaceCondition}
                disabled={stock <= 0 || isProcessing}
                className="w-full mt-2 p-3.5 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#9d4edd] hover:brightness-110 text-white font-bold text-xs font-orbitron transition-all shadow-lg shadow-[#ff007f]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>Simulasikan Beli Bersamaan di 1 Milidetik!</span>
              </button>
            </div>

            {/* Reset Stock Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleResetStock}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Isi Ulang Stok Barang</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Live Mutex Ledger & Impact Explanation (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Live Transaction Ledger */}
          <div className="p-5 rounded-2xl bg-[#080d24] border border-[#1c2452] shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#00ff9d]" />
                <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                  Audit Rekam Transaksi Real-Time
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                {logs.length} Log Dicatat
              </span>
            </div>

            {/* Log Feed */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {logs.length === 0 ? (
                <div className="text-center py-8 text-xs font-mono text-slate-500">
                  Belum ada transaksi. Klik salah satu tombol beli di sebelah kiri untuk melihat sistem bekerja!
                </div>
              ) : (
                logs.map(log => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-2.5 rounded-xl border text-xs font-mono space-y-1 ${
                      log.status === 'SUCCESS'
                        ? 'bg-emerald-950/30 border-[#00ff9d]/40 text-slate-200'
                        : 'bg-red-950/30 border-red-500/40 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 font-bold">
                        {log.status === 'SUCCESS' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff9d]" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-red-400" />
                        )}
                        <span className={log.channel === 'Shopee' ? 'text-orange-400' : 'text-emerald-400'}>
                          [{log.channel}]
                        </span>
                        <span>{log.buyer}</span>
                      </div>
                      <span className="text-slate-500 text-[10px]">{log.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed pl-5">
                      {log.message}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Under The Hood Engineering Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1.5">
            <div className="text-slate-300 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00ff9d]" />
              <span>Di Balik Layar (Engineering Insight):</span>
            </div>
            <p className="leading-relaxed">
              Menerapkan pola <strong className="text-slate-200">Distributed Lock (Redis Mutex)</strong> dipadu verifikasi idempotensi webhook. Ketika pesanan masuk bersamaan, sistem menahan pesanan kedua hingga mutasi stok pertama selesai, menjamin integritas ACID dan mencegah kerugian toko online.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

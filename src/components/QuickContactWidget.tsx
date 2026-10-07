import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  MessageSquare,
  X,
  Mail,
  Phone,
  FileText,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  Send
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickContactWidget: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = language === 'id' ? [
    {
      q: 'Apakah siap penempatan onsite (misal: Jakarta / Bandung)?',
      a: 'Ya, saya sangat terbuka untuk penempatan onsite di wilayah Bandung maupun Jabodetabek, serta fleksibel untuk pola kerja hybrid atau full remote.'
    },
    {
      q: 'Kapan estimasi ketersediaan untuk mulai bekerja?',
      a: 'Saat ini aktif menyelesaikan magang di PT Padepokan 79 dan siap mendiskusikan tanggal mulai segera untuk posisi full-time maupun kontrak berikutnya.'
    },
    {
      q: 'Teknologi dan domain apa yang menjadi fokus utama?',
      a: 'Spesialisasi di Fullstack Web (TypeScript, React, Laravel, PHP), arsitektur Clean Code, sistem manajemen dokumen farmasi CPOB, serta platform streaming media HLS.'
    }
  ] : [
    {
      q: 'Are you open to onsite roles (e.g. Jakarta / Bandung)?',
      a: 'Yes, I am fully open to onsite placements in Bandung or Greater Jakarta (Jabodetabek), as well as hybrid or full remote arrangements.'
    },
    {
      q: 'When are you available to start?',
      a: 'Currently concluding my SE internship at PT Padepokan 79 and ready to discuss immediate availability for full-time or contract roles.'
    },
    {
      q: 'What are your primary technical competencies?',
      a: 'Fullstack Web Development (TypeScript, React, Laravel, PHP), Clean Architecture, pharmaceutical GMP compliance workflows, and HLS streaming platforms.'
    }
  ];

  const waMessage = language === 'id'
    ? encodeURIComponent('Halo Rafli, saya melihat portofolio Anda dan tertarik untuk berdiskusi mengenai peluang kerja / proyek.')
    : encodeURIComponent('Hello Rafli, I saw your portfolio and would like to discuss work or project opportunities.');

  const emailSubject = language === 'id'
    ? encodeURIComponent('Diskusi Peluang Kerja / Proyek - Portofolio Rafli')
    : encodeURIComponent('Work Opportunity / Technical Inquiry - Rafli Portfolio');

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(prev => !prev)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/95 border border-emerald-500/50 text-slate-100 shadow-xl shadow-emerald-950/40 hover:border-emerald-400 hover:shadow-emerald-900/50 transition-all cursor-pointer backdrop-blur-md"
          title={language === 'id' ? 'Hubungi Rafli Langsung' : 'Contact Rafli Directly'}
        >
          {/* Pulsing availability indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>

          <div className="flex items-center gap-1.5 font-medium text-xs">
            <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-slate-100 font-semibold">
              {language === 'id' ? 'Hubungi Rafli' : 'Connect with Rafli'}
            </span>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold hidden md:inline-block">
            {language === 'id' ? 'Siap Kerja' : 'Open to Work'}
          </span>
        </motion.button>
      </div>

      {/* Quick Contact Modal / Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-h-[85vh] bg-[#070b1c]/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200"
          >
            {/* Header with Avatar & Status */}
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500/60 shadow-md"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/images/rafli-nobg.png';
                    }}
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-100">
                      {PERSONAL_INFO.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Software Engineer Intern @ PT Padepokan 79
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
              
              {/* Availability Notice Card */}
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    {language === 'id' ? 'Status Ketersediaan & Lokasi' : 'Availability & Work Mode'}
                  </span>
                </div>
                <div className="space-y-1 text-slate-300 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>Bandung / Jakarta (Siap Onsite, Hybrid, atau Remote)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{language === 'id' ? 'Respons cepat via WhatsApp / Email (< 24 jam)' : 'Fast response via WhatsApp / Email (< 24 hrs)'}</span>
                  </div>
                </div>
              </div>

              {/* Primary Direct Action Buttons */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  {language === 'id' ? 'Saluran Komunikasi Langsung' : 'Direct Channels'}
                </span>

                {/* WhatsApp Direct */}
                <a
                  href={`https://wa.me/6285155210351?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-200 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100 flex items-center gap-1">
                        <span>WhatsApp Pribadi</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400 opacity-70" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">+62 851-5521-0351</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-300 group-hover:translate-x-0.5 transition-transform">
                    {language === 'id' ? 'Chat Sekarang &rarr;' : 'Chat Now &rarr;'}
                  </span>
                </a>

                {/* Email Direct */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=${emailSubject}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/40 text-cyan-200 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100 flex items-center gap-1">
                        <span>Kirim Email Resmi</span>
                        <Send className="w-3 h-3 text-cyan-400 opacity-70" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{PERSONAL_INFO.email}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-cyan-300 group-hover:translate-x-0.5 transition-transform">
                    {language === 'id' ? 'Tulis Email &rarr;' : 'Send Email &rarr;'}
                  </span>
                </a>

                {/* Download CV */}
                <a
                  href={PERSONAL_INFO.resumePdf}
                  download
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform">
                      <FileText className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100">
                        {language === 'id' ? 'Unduh Resume / CV (PDF)' : 'Download Resume / CV (PDF)'}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">Format ATS-Friendly • Terkini</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-amber-400 group-hover:translate-x-0.5 transition-transform">
                    {language === 'id' ? 'Unduh &rarr;' : 'Download &rarr;'}
                  </span>
                </a>
              </div>

              {/* Professional Social Links */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 flex items-center justify-center gap-2 transition-colors font-medium text-[11px]"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-colors font-medium text-[11px]"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
                  <span>GitHub Repos</span>
                </a>
              </div>

              {/* Fast FAQ Accordion for Recruiters */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  {language === 'id' ? 'Pertanyaan Singkat Recruiter' : 'Quick FAQ for Recruiters'}
                </span>

                <div className="space-y-1.5">
                  {faqs.map((faq, idx) => {
                    const isOpenItem = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl bg-slate-900/70 border border-slate-800/80 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpenItem ? null : idx)}
                          className="w-full p-2.5 text-left text-[11px] font-semibold text-slate-200 hover:text-cyan-300 flex items-center justify-between gap-2 transition-colors"
                        >
                          <span>{faq.q}</span>
                          {isOpenItem ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                        </button>
                        {isOpenItem && (
                          <div className="px-2.5 pb-2.5 text-[11px] text-slate-400 leading-relaxed font-sans border-t border-slate-800/60 pt-2">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Footer Note */}
            <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-between">
              <span>Bandung, Indonesia (WIB)</span>
              <span className="text-emerald-400 font-semibold">● Aktif merespons</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

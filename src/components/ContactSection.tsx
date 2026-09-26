import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, Copy, Check, Send, FileDown, MessageSquare } from 'lucide-react';
import { GithubIcon, GitlabIcon, LinkedinIcon } from './SocialIcons';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [inquiryType, setInquiryType] = useState('fulltime');
  const [message, setMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendMessage = (channel: 'whatsapp' | 'email') => {
    if (!message && !senderName) {
      alert(language === 'id' ? 'Silakan isi nama dan pesan Anda terlebih dahulu.' : 'Please enter your name and message.');
      return;
    }

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });

    const topicLabel =
      inquiryType === 'fulltime'
        ? (language === 'id' ? 'Tawaran Pekerjaan Fulltime' : 'Full-time Engineering Opportunity')
        : inquiryType === 'contract'
        ? (language === 'id' ? 'Proyek Kontrak / Konsultasi Sistem' : 'System Architecture Contract')
        : (language === 'id' ? 'Pertanyaan Teknis' : 'General Inquiry');

    const formattedText = `Halo Mohamad Rafli, saya ${senderName || 'Rekan'}.\nPerihal: ${topicLabel}\n\nPesan:\n${message}`;

    if (channel === 'whatsapp') {
      const url = `https://wa.me/6285155210351?text=${encodeURIComponent(formattedText)}`;
      window.open(url, '_blank');
    } else {
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        `[Inquiry] ${topicLabel} dari ${senderName}`
      )}&body=${encodeURIComponent(formattedText)}`;
      window.location.href = mailtoUrl;
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#070a12] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-950/60 border border-sky-800/60 text-sky-400 font-mono text-xs mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Channels</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
            {language === 'id' ? 'Inisiasi Komunikasi & Rekayasa' : 'Initiate Contact & Engineering Dialogue'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            {language === 'id'
              ? 'Terbuka untuk peluang Fullstack Engineer, perancangan sistem enterprise kepatuhan tinggi, dan pengembangan web modern.'
              : 'Available for full-time engineering roles, high-compliance enterprise web systems, and technical consulting.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card with Quick Copy */}
            <div className="p-5 rounded-2xl bg-[#0c1222] border border-slate-800 flex items-center justify-between group">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-800/60 flex items-center justify-center text-sky-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-500">Email Address</p>
                  <p className="text-sm font-semibold text-slate-100 font-mono">{PERSONAL_INFO.email}</p>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                title="Salin Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* WhatsApp Direct */}
            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#0c1222] border border-slate-800 hover:border-emerald-700/60 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-500">WhatsApp Gateway</p>
                  <p className="text-sm font-semibold text-slate-100 font-mono">{PERSONAL_INFO.phone}</p>
                </div>
              </div>
              <Send className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </a>

            {/* Social Matrix */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0c1222] border border-slate-800 hover:border-slate-700 text-center flex flex-col items-center gap-2 group transition-all"
              >
                <GithubIcon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                <span className="text-xs font-mono text-slate-300">GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.gitlab}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0c1222] border border-slate-800 hover:border-orange-700/60 text-center flex flex-col items-center gap-2 group transition-all"
              >
                <GitlabIcon className="w-5 h-5 text-orange-400 group-hover:scale-110" />
                <span className="text-xs font-mono text-slate-300">GitLab</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0c1222] border border-slate-800 hover:border-sky-700/60 text-center flex flex-col items-center gap-2 group transition-all"
              >
                <LinkedinIcon className="w-5 h-5 text-sky-400 group-hover:scale-110" />
                <span className="text-xs font-mono text-slate-300">LinkedIn</span>
              </a>
            </div>

            {/* Official Resume Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1222] to-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <FileDown className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-slate-200 font-mono">
                  Curriculum Vitae (PDF)
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'id'
                  ? 'Dokumen resume lengkap berstandar ATS dengan riwayat teknis dan rekam jejak industri farmasi.'
                  : 'Complete ATS-standardized resume documenting pharmaceutical and enterprise web systems.'}
              </p>
              <div className="flex gap-2">
                <a
                  href="/assets/files/CV_Mohamad Rafli Adipratama.pdf"
                  target="_blank"
                  className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono transition-colors"
                >
                  Download CV (EN/ID)
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1222] border border-slate-800 shadow-xl space-y-5">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-100 font-mono">
                  {language === 'id' ? 'Formulir Kontak Cepat' : 'Instant Message Dispatch'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'id'
                    ? 'Pesan akan diformat rapi dan langsung dikirimkan melalui WhatsApp atau email pilihan Anda.'
                    : 'Your message will be formatted cleanly and dispatched directly via WhatsApp or Email.'}
                </p>
              </div>

              {/* Inquiry Type Radio */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">
                  {language === 'id' ? 'Kategori Keperluan' : 'Inquiry Category'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'fulltime', label: { id: 'Peluang Fulltime', en: 'Full-time Role' } },
                    { id: 'contract', label: { id: 'Kontrak / Arsitektur', en: 'Contract Project' } },
                    { id: 'general', label: { id: 'Diskusi Teknis', en: 'Tech Discussion' } }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setInquiryType(opt.id)}
                      className={`p-2 rounded-lg border text-xs font-mono text-center transition-all ${
                        inquiryType === opt.id
                          ? 'bg-sky-950 border-sky-500 text-sky-200 font-bold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {opt.label[language]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sender Name */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  {language === 'id' ? 'Nama Anda / Perusahaan' : 'Your Name / Organization'}
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={e => setSenderName(e.target.value)}
                  placeholder="Contoh: HR Manager / Tech Lead / Client"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-100 focus:outline-none focus:border-sky-500 placeholder-slate-600"
                />
              </div>

              {/* Message Area */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  {language === 'id' ? 'Detail Pesan / Spesifikasi' : 'Message Details / Scope'}
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={
                    language === 'id'
                      ? 'Tuliskan deskripsi ringkas kebutuhan sistem, posisi kerja, atau pertanyaan Anda...'
                      : 'Provide a brief overview of your project requirements, team openings, or inquiry...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-100 focus:outline-none focus:border-sky-500 placeholder-slate-600"
                />
              </div>

              {/* Dual Action Dispatch Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleSendMessage('whatsapp')}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-emerald-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'id' ? 'Kirim via WhatsApp' : 'Dispatch via WhatsApp'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendMessage('email')}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs font-mono transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>{language === 'id' ? 'Kirim via Email' : 'Dispatch via Email'}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

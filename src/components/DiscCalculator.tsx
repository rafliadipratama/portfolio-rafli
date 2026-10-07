import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BrainCircuit, RotateCcw, Sparkles, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  prompt: {
    id: string;
    en: string;
  };
  options: {
    trait: 'D' | 'I' | 'S' | 'C';
    text: {
      id: string;
      en: string;
    };
  }[];
}

const DISC_QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: {
      id: "Saat menghadapi tantangan teknis mendadak di lingkungan produksi:",
      en: "When confronting a critical unexpected production outage:"
    },
    options: [
      {
        trait: 'D',
        text: {
          id: "Mengambil keputusan cepat, mengarahkan tindakan darurat, dan fokus pada pemulihan instan.",
          en: "Make swift executive decisions, direct hotfix actions, and focus on immediate recovery."
        }
      },
      {
        trait: 'I',
        text: {
          id: "Berkomunikasi aktif dengan tim & stakeholder agar tidak panik dan menjaga moral tetap tinggi.",
          en: "Communicate transparently with team and stakeholders to maintain high morale and unity."
        }
      },
      {
        trait: 'S',
        text: {
          id: "Bekerja secara tenang, konsisten, dan membagi beban kerja secara merata bersama tim.",
          en: "Work steadily, calmly supporting teammates and distributing the workload equitably."
        }
      },
      {
        trait: 'C',
        text: {
          id: "Mengidentifikasi akar masalah secara analitis, memeriksa log server secara mendalam, dan menjaga kepatuhan SOP.",
          en: "Isolate the root cause analytically, inspect server logs thoroughly, and ensure SOP compliance."
        }
      }
    ]
  },
  {
    id: 2,
    prompt: {
      id: "Saat mempresentasikan usulan arsitektur sistem baru di hadapan tim:",
      en: "When proposing a new software architectural revamp to peers:"
    },
    options: [
      {
        trait: 'D',
        text: {
          id: "Menekankan efisiensi waktu eksekusi, target performa terukur, dan keunggulan kompetitif.",
          en: "Emphasize time efficiency, quantifiable performance KPIs, and competitive edge."
        }
      },
      {
        trait: 'I',
        text: {
          id: "Menyampaikan visi dengan antusias, analogi menarik, dan membangun antusiasme bersama.",
          en: "Present vision with high energy, compelling analogies, and build shared excitement."
        }
      },
      {
        trait: 'S',
        text: {
          id: "Mendengarkan masukan seluruh anggota tim untuk mencapai konsensus yang aman dan minim gesekan.",
          en: "Listen patiently to every teammate's input to reach a harmonious, low-risk consensus."
        }
      },
      {
        trait: 'C',
        text: {
          id: "Menyajikan data komparasi mendalam, estimasi benchmark, diagram skema, dan mitigasi risiko.",
          en: "Present empirical benchmark comparisons, schema diagrams, and risk mitigation specs."
        }
      }
    ]
  },
  {
    id: 3,
    prompt: {
      id: "Kondisi lingkungan kerja yang paling memicu performa optimal Anda:",
      en: "The workspace culture that sparks your peak productivity:"
    },
    options: [
      {
        trait: 'D',
        text: {
          id: "Otonomi tinggi, target yang menantang, dan kebebasan mengeksekusi solusi terbaik.",
          en: "High autonomy, challenging deliverables, and authority to drive impactful results."
        }
      },
      {
        trait: 'I',
        text: {
          id: "Atmosfer kolaboratif yang ramah, ruang brainstorming dinamis, dan apresiasi karya.",
          en: "Collaborative and social atmosphere, vibrant brainstorming, and public recognition."
        }
      },
      {
        trait: 'S',
        text: {
          id: "Ritme teratur, prediktabilitas tugas harian, dan lingkungan tim yang suportif serta stabil.",
          en: "Predictable pace, well-defined daily rhythms, and a supportive, dependable team."
        }
      },
      {
        trait: 'C',
        text: {
          id: "Standar rekayasa berkualitas tinggi, dokumentasi terstruktur, dan penekanan pada akurasi.",
          en: "High engineering excellence standards, structured documentation, and emphasis on precision."
        }
      }
    ]
  },
  {
    id: 4,
    prompt: {
      id: "Saat mengevaluasi kode (code review) atau dokumen kepatuhan (SOP):",
      en: "When reviewing critical code commits or regulatory SOP drafts:"
    },
    options: [
      {
        trait: 'D',
        text: {
          id: "Fokus pada apakah implementasi tersebut memenuhi sasaran fungsional tanpa memperlambat delivery.",
          en: "Verify whether the feature meets business goals without bottlenecking delivery speed."
        }
      },
      {
        trait: 'I',
        text: {
          id: "Memberikan feedback konstruktif yang menyemangati dan mengapresiasi kreativitas pembuatnya.",
          en: "Offer uplifting constructive feedback that praises ingenuity and team effort."
        }
      },
      {
        trait: 'S',
        text: {
          id: "Memastikan perubahan tidak merusak kebiasaan tim yang sudah berjalan stabil dan aman.",
          en: "Ensure changes integrate smoothly without disrupting existing stable workflows."
        }
      },
      {
        trait: 'C',
        text: {
          id: "Menguji setiap edge-case, validasi type safety, potensi celah keamanan, dan kepatuhan linting.",
          en: "Thoroughly test edge cases, strict type safety, security postures, and strict linting rules."
        }
      }
    ]
  }
];

export const DiscCalculator: React.FC = () => {
  const { language } = useLanguage();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'D' | 'I' | 'S' | 'C'>>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleSelectOption = (trait: 'D' | 'I' | 'S' | 'C') => {
    const updated = { ...answers, [currentStep]: trait };
    setAnswers(updated);

    if (currentStep < DISC_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResult(true);
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  // Calculate scores
  const scoreCounts = { D: 0, I: 0, S: 0, C: 0 };
  Object.values(answers).forEach(val => {
    scoreCounts[val] += 1;
  });

  const totalAnswered = Object.keys(answers).length || 1;
  const percentages = {
    D: Math.round((scoreCounts.D / totalAnswered) * 100),
    I: Math.round((scoreCounts.I / totalAnswered) * 100),
    S: Math.round((scoreCounts.S / totalAnswered) * 100),
    C: Math.round((scoreCounts.C / totalAnswered) * 100)
  };

  // Determine Archetype
  const getArchetype = () => {
    const sorted = Object.entries(percentages).sort((a, b) => b[1] - a[1]);
    const primary = sorted[0][0];

    if (primary === 'D') {
      return {
        title: language === 'id' ? 'The Driver / Pioneer (Tipe Dominan)' : 'The Driver / Pioneer (Dominant)',
        textColor: 'text-rose-400',
        badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
        description: language === 'id'
          ? 'Memiliki ketegasan tinggi, berorientasi hasil, mandiri, dan cepat memecahkan kebuntuan teknis di bawah tekanan.'
          : 'High decisiveness, result-oriented, self-directed, excels at breaking technical gridlocks under pressure.'
      };
    } else if (primary === 'I') {
      return {
        title: language === 'id' ? 'The Catalyst / Inspiring (Tipe Pengaruh)' : 'The Catalyst / Inspiring (Influential)',
        textColor: 'text-amber-400',
        badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
        description: language === 'id'
          ? 'Komunikator unggul, kolaboratif, memotivasi tim dengan antusiasme, dan piawai menjembatani teknis dengan bisnis.'
          : 'Outstanding communicator, collaborative, energizes peers, bridges gap between technical and business domains.'
      };
    } else if (primary === 'S') {
      return {
        title: language === 'id' ? 'The Anchor / Supporter (Tipe Stabil)' : 'The Anchor / Supporter (Steady)',
        textColor: 'text-emerald-400',
        badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
        description: language === 'id'
          ? 'Pilar konsistensi tim, sangat andal, penuh kesabaran, pendengar ulung, dan menjaga keharmonisan jangka panjang.'
          : 'Anchor of team consistency, highly reliable, patient, active listener, ensures sustainable long-term execution.'
      };
    } else {
      return {
        title: language === 'id' ? 'The Architect / Analyst (Tipe Cermat)' : 'The Architect / Analyst (Conscientious)',
        textColor: 'text-cyan-400',
        badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
        description: language === 'id'
          ? 'Spesialis akurasi tinggi, presisi arsitektural, kepatuhan audit standar industri (CPOB/GMP), dan mitigasi bug mendalam.'
          : 'Precision-first engineer, excels in clean architecture, audit-grade compliance (GMP/CPOB), and zero-defect systems.'
      };
    }
  };

  const archetype = getArchetype();

  return (
    <section id="disc-assessment" className="py-20 bg-[#0a0d1a] border-b border-slate-800/80 relative overflow-hidden">
      {/* Subtle single ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-xs mb-3 shadow-sm">
              <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
              <span>HR Recruitment Algorithm Engine (PT. Solas Spec)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
              {language === 'id' ? (
                <>
                  Simulasi Kalkulator Psikometri{' '}
                  <span className="text-cyan-400">
                    DISC Assessment
                  </span>
                </>
              ) : (
                <>
                  Interactive DISC Psychometric{' '}
                  <span className="text-cyan-400">
                    Scoring Engine
                  </span>
                </>
              )}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              {language === 'id'
                ? 'Fitur interaktif ini mereplikasi algoritma kalkulasi tes kepribadian DISC yang dirancang Rafli untuk portal rekrutmen PT Solas Langgeng Sejahtera. Coba 4 skenario singkat dan lihat visualisasi matriks kepribadian kerja Anda.'
                : 'This interactive engine showcases the mathematical DISC assessment algorithm built by Rafli for PT Solas HR recruitment portal. Complete 4 quick work scenarios to generate your behavioral profile matrix.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            {showResult && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>{language === 'id' ? 'Ulangi Tes' : 'Retake Test'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left/Main Column: Questionnaire or Results */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
              
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-500/50" />

              {!showResult ? (
                <div>
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6 pb-4 border-b border-slate-800">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                      <span>{language === 'id' ? `Pertanyaan ${currentStep + 1} dari ${DISC_QUESTIONS.length}` : `Question ${currentStep + 1} of ${DISC_QUESTIONS.length}`}</span>
                    </span>
                    <div className="flex gap-1.5">
                      {DISC_QUESTIONS.map((_, i) => (
                        <span
                          key={i}
                          className={`w-6 h-1.5 rounded-full transition-all duration-300 ${
                            i <= currentStep ? 'bg-cyan-400' : 'bg-slate-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-6 leading-relaxed">
                    {DISC_QUESTIONS[currentStep].prompt[language]}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {DISC_QUESTIONS[currentStep].options.map((opt, oIdx) => (
                      <motion.button
                        key={oIdx}
                        whileHover={{ scale: 1.015, x: 4 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => handleSelectOption(opt.trait)}
                        className="w-full text-left p-4 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-start gap-3.5 group shadow-sm"
                      >
                        <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-cyan-400 group-hover:bg-cyan-950 flex items-center justify-center text-xs font-mono font-bold text-slate-300 group-hover:text-cyan-300 flex-shrink-0 transition-colors">
                          {String.fromCharCode(65 + oIdx)}
                        </div>
                        <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white leading-relaxed font-sans">
                          {opt.text[language]}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Results View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Result Header Badge */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      {language === 'id' ? 'Hasil Profil Rekrutmen Solas' : 'Solas Recruitment Profile Output'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${archetype.badgeColor}`}>
                      CANDIDATE_COMPATIBLE
                    </span>
                  </div>

                  {/* Archetype Title */}
                  <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                      {language === 'id' ? 'Arketipe Kepribadian Utama' : 'Primary Behavioral Archetype'}
                    </p>
                    <h3 className={`text-xl sm:text-2xl font-extrabold ${archetype.textColor}`}>
                      {archetype.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {archetype.description}
                    </p>
                  </div>

                  {/* Four Dimension Breakdown Bars with Rich Color Palette */}
                  <div className="space-y-3 font-mono text-xs">
                    {/* D - Dominance (Rose) */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-rose-400 font-bold">D - Dominance (Ketegasan & Keberanian)</span>
                        <span className="text-rose-300 font-bold">{percentages.D}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800/90 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentages.D}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full"
                        />
                      </div>
                    </div>

                    {/* I - Influence (Amber) */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-amber-400 font-bold">I - Influence (Antusiasme & Komunikasi)</span>
                        <span className="text-amber-300 font-bold">{percentages.I}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800/90 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentages.I}%` }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                        />
                      </div>
                    </div>

                    {/* S - Steadiness (Emerald) */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-emerald-400 font-bold">S - Steadiness (Konsistensi & Kerja Tim)</span>
                        <span className="text-emerald-300 font-bold">{percentages.S}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800/90 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentages.S}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                        />
                      </div>
                    </div>

                    {/* C - Conscientiousness (Cyan) */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-cyan-400 font-bold">C - Conscientiousness (Akurasi & Standar Mutu)</span>
                        <span className="text-cyan-300 font-bold">{percentages.C}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800/90 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentages.C}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary note */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Calculated via Solas HR ATS Scoring Matrix
                    </span>
                    <span className="text-cyan-400 font-bold">ALGORITHM: V2.1</span>
                  </div>
                </motion.div>
              )}

            </div>
          </div>

          {/* Right Column: Visual Radar / Matrix Widget & Production Context */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real-time Visual Matrix Chart */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5 uppercase">
                  <Award className="w-4 h-4 text-amber-400" />
                  {language === 'id' ? 'Peta Matriks 4 Dimensi' : '4-Dimension Spatial Matrix'}
                </span>
                <span className="text-[11px] font-mono text-slate-500">Live Geometry</span>
              </div>

              {/* 4 Quadrants Box */}
              <div className="grid grid-cols-2 gap-3 aspect-square max-w-[280px] mx-auto p-3 bg-slate-950/90 rounded-2xl border border-slate-800 relative">
                
                {/* D Quadrant */}
                <div className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                  answers[currentStep - 1] === 'D' || (showResult && percentages.D >= 25)
                    ? 'bg-rose-950/50 border-rose-500/80 shadow-md shadow-rose-500/10'
                    : 'bg-slate-900/60 border-slate-800'
                }`}>
                  <span className="text-xs font-mono font-bold text-rose-400">[D] Dominance</span>
                  <span className="text-2xl font-extrabold text-slate-100 font-mono">{percentages.D}%</span>
                </div>

                {/* I Quadrant */}
                <div className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                  answers[currentStep - 1] === 'I' || (showResult && percentages.I >= 25)
                    ? 'bg-amber-950/50 border-amber-500/80 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800'
                }`}>
                  <span className="text-xs font-mono font-bold text-amber-400">[I] Influence</span>
                  <span className="text-2xl font-extrabold text-slate-100 font-mono">{percentages.I}%</span>
                </div>

                {/* C Quadrant */}
                <div className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                  answers[currentStep - 1] === 'C' || (showResult && percentages.C >= 25)
                    ? 'bg-cyan-950/50 border-cyan-500/80 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800'
                }`}>
                  <span className="text-xs font-mono font-bold text-cyan-400">[C] Compliance</span>
                  <span className="text-2xl font-extrabold text-slate-100 font-mono">{percentages.C}%</span>
                </div>

                {/* S Quadrant */}
                <div className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                  answers[currentStep - 1] === 'S' || (showResult && percentages.S >= 25)
                    ? 'bg-emerald-950/50 border-emerald-500/80 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800'
                }`}>
                  <span className="text-xs font-mono font-bold text-emerald-400">[S] Steadiness</span>
                  <span className="text-2xl font-extrabold text-slate-100 font-mono">{percentages.S}%</span>
                </div>

              </div>

              <p className="text-[11px] text-slate-400 text-center mt-4 font-mono leading-relaxed">
                {language === 'id'
                  ? 'Matriks membaca kecenderungan dominan pelamar kerja untuk penempatan divisi teknik & mutu.'
                  : 'Spatial matrix mapping candidate behavioral fit for engineering and quality teams.'}
              </p>
            </div>

            {/* Production Context Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold text-indigo-300 font-mono">
                  Solas.id ATS Case Study
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {language === 'id'
                  ? 'Pada sistem rekrutmen PT Solas Langgeng Sejahtera, modul tes ini diintegrasikan langsung dengan WhatsApp API Gateway. Setelah kandidat menyelesaikan tes online, skor langsung diolah otomatis dan jadwal interview dikirimkan secara instan tanpa intervensi manual HR.'
                  : 'In PT Solas production portal, this assessment module integrates directly with WhatsApp API Gateway. Once applicants finalize testing, scores are calculated instantly and interview invitations are dispatched automatically.'}
              </p>
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold"
              >
                <span>{language === 'id' ? 'Lihat Spesifikasi Proyek Solas' : 'Inspect Solas System Specs'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

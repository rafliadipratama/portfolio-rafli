import React from 'react';
import { EDUCATION, CERTIFICATES } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, Award, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

export const EducationCertificates: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="education-certs" className="py-20 bg-[#090d18] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-mono text-xs mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Academic & Verified Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
            {language === 'id' ? 'Pendidikan & Sertifikasi Resmi' : 'Education & Professional Certifications'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            {language === 'id'
              ? 'Latar belakang akademis formal di bidang Informatika dipadukan dengan sertifikasi profesi terverifikasi BNSP dan AWS Cloud.'
              : 'Formal academic degree in Informatics Engineering paired with industry credentials from BNSP and AWS Cloud.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Academic Education */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <GraduationCap className="w-5 h-5 text-sky-400" />
              <h3 className="text-lg font-bold text-slate-100 font-mono">
                {language === 'id' ? 'Pendidikan Formal' : 'Formal Education'}
              </h3>
            </div>

            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-slate-100">{edu.institution}</h4>
                      <p className="text-xs text-sky-400 font-mono mt-0.5">{edu.degree[language]}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-sky-950/80 text-sky-300 border border-sky-800/60 flex-shrink-0">
                      {edu.score}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {edu.description[language]}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1">
                    {edu.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-slate-500 pt-1">
                    {edu.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Certifications */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Award className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-slate-100 font-mono">
                {language === 'id' ? 'Sertifikasi Profesi & Lisensi' : 'Professional Certifications'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-xl bg-[#0c1222] border border-slate-800 hover:border-slate-700 hover:bg-[#0f172a] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                        {cert.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{cert.period}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{cert.issuer}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Terverifikasi
                    </span>

                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      {cert.isPdf ? (
                        <>
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF Dokumen</span>
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Kredensial</span>
                        </>
                      )}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

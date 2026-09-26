# 🌐 Mohamad Rafli Adipratama — Enterprise Fullstack Portfolio (v2.0)

Situs portofolio rekayasa web modern dan kompleks untuk **Mohamad Rafli Adipratama** (Fullstack Web Engineer). Didesain ulang dari arsitektur HTML statis menjadi aplikasi web modern berbasis **React 18 + TypeScript + Vite + Tailwind CSS**, dengan pendekatan **Zero AI Slop** — fokus pada presisi teknis, standar industri farmasi (CPOB/GMP), arsitektur RBAC bertingkat, dan pengalaman antarmuka berstandar tinggi.

---

## ⚡ Fitur Utama & Kompleksitas Rekayasa

1. **Simulasi Interaktif e-Document & Mesin State RBAC CPOB/GMP**:
   - Memodelkan alur sistem manajemen dokumen mutu farmasi yang dikembangkan Rafli di PT Solas Langgeng Sejahtera.
   - Simulasi otorisasi 6 peran: Operator, Supervisor, QA Specialist, Dept Head, dan Qualified Person (Signer).
   - Validasi kebijakan hak akses (Role-Based Access Control) real-time dengan log audit trail kriptografis (SHA-256 hash).
2. **Terminal Interaktif CLI Emulator**:
   - Terminal Unix-like terintegrasi yang dapat dibuka dengan tombol shortcut `~` atau tombol menu.
   - Mendukung riwayat perintah (`Arrow Up / Down`), tabulasi perintah, dan eksekusi: `help`, `bio`, `skills`, `projects`, `exp`, `contact`, `clear`, serta easter egg `sudo hire`.
3. **Command Palette Global (`Ctrl + K` / `Cmd + K`)**:
   - Modal pencarian fuzzy untuk navigasi instan antar sistem, ganti bahasa, luncurkan terminal, dan akses unduh CV.
   - Aksesibilitas keyboard lengkap (ESC, panah, Enter).
4. **Bilingual Engine (Indonesian / English)**:
   - Penggantian bahasa langsung (ID / EN) tanpa reload dengan persistensi `localStorage`.
   - Menggunakan terminologi rekayasa perangkat lunak autentik dan natural, menghilangkan gaya bahasa AI generik/slop.
5. **Modal Inspeksi Arsitektur Proyek (Deep-Dive Specs)**:
   - Tab navigasi untuk setiap sistem: *Overview & Business Metrics*, *System Architecture & Schemas*, dan *Key Engineering Features*.
6. **Telemetry Bar & Bandung Time Real-time**:
   - HUD atas menampilkan waktu lokal Bandung WIB (Asia/Jakarta UTC+7) yang diperbarui setiap detik, status sistem, dan ping simulasi.

---

## 🛠️ Stack Teknologi

- **Frontend Core**: React 18, TypeScript (Strict Mode)
- **Build Engine & Bundler**: Vite 6, PostCSS, Autoprefixer
- **Styling & Design System**: Tailwind CSS, CSS Grid Pattern, Dark Obsidian Theme
- **Icons & Micro-interactions**: Lucide React, Custom SVG Brand Vectors, Canvas Confetti
- **State & Architecture**: Context API (`LanguageContext`), Custom State Machines, Component-Driven Modular Design

---

## 🚀 Menjalankan Secara Lokal

```bash
# 1. Masuk ke direktori
cd portfolio-rafli

# 2. Instalasi dependensi
npm install

# 3. Jalankan server pengembangan (Dev Server)
npm run dev

# 4. Bangun untuk produksi (Production Build)
npm run build

# 5. Pratinjau hasil build produksi
npm run preview
```

---

## 📂 Struktur Direktori Proyek

```
portfolio-rafli/
├── assets/                 # Aset asli (gambar, foto tanpa latar, PDF resume & sertifikat)
├── public/
│   └── assets/             # Aset statis terdistribusi untuk Vite
├── src/
│   ├── components/
│   │   ├── CommandPalette.tsx       # Fuzzy quick launcher (Ctrl+K)
│   │   ├── ContactSection.tsx       # Kanal komunikasi WhatsApp & Email dispatch
│   │   ├── EducationCertificates.tsx # Kredensial akademis & lisensi BNSP
│   │   ├── ExperienceTimeline.tsx   # Rekam jejak karier industri
│   │   ├── Footer.tsx               # Spesifikasi build & footer
│   │   ├── Hero.tsx                 # Hero berstandar editorial rekayasa
│   │   ├── Navbar.tsx               # Navigasi responsif
│   │   ├── ProjectDetailModal.tsx   # Modal deep-dive arsitektur sistem
│   │   ├── ProjectsGrid.tsx         # Filter dan grid sistem produksi
│   │   ├── SkillsMatrix.tsx         # Matriks keahlian teknis terperinci
│   │   ├── SocialIcons.tsx          # Vektor SVG GitHub, GitLab, LinkedIn
│   │   ├── TelemetryBar.tsx         # Telemetri waktu WIB & status sistem
│   │   ├── TerminalConsole.tsx      # Terminal emulator interaktif
│   │   └── WorkflowSimulator.tsx    # Simulator mesin state CPOB & RBAC
│   ├── context/
│   │   └── LanguageContext.tsx      # Manajemen state dwibahasa (ID / EN)
│   ├── data/
│   │   └── portfolioData.ts         # Dataset otentik tanpa teks AI generik
│   ├── types/
│   │   └── index.ts                 # Definisi tipe TypeScript
│   ├── App.tsx                      # Root App view
│   ├── main.tsx                     # Entry mount
│   └── index.css                    # Tailwind & style dasar
├── index.html                       # Entry HTML Vite dengan font JetBrains Mono
├── package.json                     # Konfigurasi dependensi v2.0.0
├── tailwind.config.js               # Token desain Tailwind
├── tsconfig.json                    # Konfigurasi TypeScript compiler
└── vite.config.ts                   # Konfigurasi bundling Vite
```

---

## 👤 Pengembang

**Mohamad Rafli Adipratama**  
- Email: [rafliadipratma@gmail.com](mailto:rafliadipratma@gmail.com)  
- WhatsApp: [+62 851-5521-0351](https://wa.me/6285155210351)  
- GitHub: [rafliadipratama](https://github.com/rafliadipratama)  
- GitLab: [rafliadipratama](https://gitlab.com/rafliadipratama)  
- LinkedIn: [linkedin.com/in/rafliadipratama](https://linkedin.com/in/rafliadipratama)

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Trophy,
  Palette,
  Gamepad2,
  ArrowUp,
  ArrowDown,
  Pause,
  Play,
  Share2,
  Check,
  Zap,
  Coffee
} from 'lucide-react';
import confetti from 'canvas-confetti';

// -------------------------------------------------------------
// 1. Retro 8-bit Web Audio Synthesizer (Zero External Audio Files)
// -------------------------------------------------------------
class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playJump() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(460, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // AudioContext policy fallback
    }
  }

  playScoreMilestone() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      gain1.gain.setValueAtTime(0.07, now);
      gain1.gain.linearRampToValueAtTime(0, now + 0.08);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.08);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(880, now + 0.09); // A5
      gain2.gain.setValueAtTime(0.07, now + 0.09);
      gain2.gain.linearRampToValueAtTime(0, now + 0.18);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.09);
      osc2.stop(now + 0.18);
    } catch {
      // AudioContext policy fallback
    }
  }

  playPowerUp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Rising arpeggio: C5 (523) -> E5 (659) -> G5 (784) -> C6 (1046)
      const notes = [523, 659, 784, 1046];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const start = now + idx * 0.06;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.09, start);
        gain.gain.linearRampToValueAtTime(0, start + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.06);
      });
    } catch {
      // AudioContext policy fallback
    }
  }

  playCollect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.09); // E6
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // AudioContext policy fallback
    }
  }

  playSmash() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // AudioContext policy fallback
    }
  }

  playGameOver() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.28);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // AudioContext policy fallback
    }
  }
}

const audio = new RetroAudioEngine();

// -------------------------------------------------------------
// 2. Pixel Art Matrices
// -------------------------------------------------------------

// --- Character 1: Classic Chrome Dino (22x24) ---
const DINO_STAND = [
  "................####..",
  "...............######.",
  "...............#.####.",
  "...............######.",
  "...............######.",
  "...............###....",
  "...............#####..",
  "..#...........#######.",
  "..#..........#########",
  ".###........##########",
  ".####################.",
  ".###################..",
  "..#################...",
  "...###############....",
  "....#############.....",
  ".....###########......",
  "......#########.......",
  ".......#######........",
  "........##..##........",
  "........##...#........",
  "........#....#........",
  "........#....#........",
  "........##...##.......",
  "......................"
];

const DINO_RUN_1 = [
  "................####..",
  "...............######.",
  "...............#.####.",
  "...............######.",
  "...............######.",
  "...............###....",
  "...............#####..",
  "..#...........#######.",
  "..#..........#########",
  ".###........##########",
  ".####################.",
  ".###################..",
  "..#################...",
  "...###############....",
  "....#############.....",
  ".....###########......",
  "......#########.......",
  ".......#######........",
  "........##..##........",
  "........##...#........",
  "........#....#........",
  "........#.............",
  "........##............",
  "......................"
];

const DINO_RUN_2 = [
  "................####..",
  "...............######.",
  "...............#.####.",
  "...............######.",
  "...............######.",
  "...............###....",
  "...............#####..",
  "..#...........#######.",
  "..#..........#########",
  ".###........##########",
  ".####################.",
  ".###################..",
  "..#################...",
  "...###############....",
  "....#############.....",
  ".....###########......",
  "......#########.......",
  ".......#######........",
  "........##..##........",
  "........#...##........",
  "........#....#........",
  ".............#........",
  "............##........",
  "......................"
];

const DINO_DUCK_1 = [
  "............................####..",
  "...........................######.",
  "...........................#.####.",
  "...........................######.",
  "...........................######.",
  "...........................###....",
  "..#........................#####..",
  "..#..........###################..",
  ".###........#####################.",
  ".###############################..",
  ".##############################...",
  "..############################....",
  "...##########################.....",
  "....#####..#####..................",
  "....##......##....................",
  "....#........#...................."
];

const DINO_DUCK_2 = [
  "............................####..",
  "...........................######.",
  "...........................#.####.",
  "...........................######.",
  "...........................######.",
  "...........................###....",
  "..#........................#####..",
  "..#..........###################..",
  ".###........#####################.",
  ".###############################..",
  ".##############################...",
  "..############################....",
  "...##########################.....",
  "....#####..#####..................",
  ".....##......##...................",
  "......#.......#..................."
];

const DINO_DEAD = [
  "................####..",
  "...............######.",
  "...............#X####.",
  "...............######.",
  "...............######.",
  "...............###....",
  "...............#####..",
  "..#...........#######.",
  "..#..........#########",
  ".###........##########",
  ".####################.",
  ".###################..",
  "..#################...",
  "...###############....",
  "....#############.....",
  ".....###########......",
  "......#########.......",
  ".......#######........",
  "........##..##........",
  "........##...#........",
  "........#....#........",
  "........#....#........",
  "........##...##.......",
  "......................"
];

// --- Character 2: Pixel Rafli Developer (22x24) ---
// Rafli with sleek hair, glasses, hoodie, laptop
const RAFLI_STAND = [
  ".........######.......",
  "........########......",
  "........##.##.##......", // glasses
  "........########......",
  ".........######.......",
  ".......##########.....",
  "......############....",
  "......###.####.###....",
  "......###.[==].###....", // laptop
  "......###.[==].###....",
  "......############....",
  ".......##########.....",
  "........########......",
  "........########......",
  "........##....##......",
  "........##....##......",
  "........##....##......",
  "........##....##......",
  "........##....##......",
  "........##....##......",
  "........##....##......",
  "........##....##......",
  ".......###....###.....",
  "......................"
];

const RAFLI_RUN_1 = [
  ".........######.......",
  "........########......",
  "........##.##.##......",
  "........########......",
  ".........######.......",
  ".......##########.....",
  "......############....",
  "......###.####.###....",
  "......###.[==].###....",
  "......###.[==].###....",
  "......############....",
  ".......##########.....",
  "........########......",
  "........########......",
  "........##....##......",
  "........##.....#......",
  "........##............",
  ".........#............",
  ".........##...........",
  "..........#...........",
  "..........#...........",
  "......................",
  ".........###..........",
  "......................"
];

const RAFLI_RUN_2 = [
  ".........######.......",
  "........########......",
  "........##.##.##......",
  "........########......",
  ".........######.......",
  ".......##########.....",
  "......############....",
  "......###.####.###....",
  "......###.[==].###....",
  "......###.[==].###....",
  "......############....",
  ".......##########.....",
  "........########......",
  "........########......",
  "........##....##......",
  "........#.....##......",
  "..............##......",
  "...............#......",
  "..............##......",
  "..............#.......",
  "..............#.......",
  "......................",
  ".............###......",
  "......................"
];

const RAFLI_DUCK_1 = [
  "...................######.......",
  "..................########......",
  "..................##.##.##......",
  "..................########......",
  ".................##########.....",
  ".......#####################....",
  "......####[==]###############...",
  "......####[==]###############...",
  ".......####################.....",
  "........#########..######.......",
  "........##...##......##.........",
  "........##....#.......#.........",
  "........#.......................",
  ".......##.......................",
  "................................",
  "................................"
];

const RAFLI_DUCK_2 = [
  "...................######.......",
  "..................########......",
  "..................##.##.##......",
  "..................########......",
  ".................##########.....",
  ".......#####################....",
  "......####[==]###############...",
  "......####[==]###############...",
  ".......####################.....",
  "........#########..######.......",
  "........#....##......##.........",
  "........#.....#.......#.........",
  "......................#.........",
  ".....................##.........",
  "................................",
  "................................"
];

const RAFLI_DEAD = [
  ".........######.......",
  "........########......",
  "........#X.##.X#......", // dead eyes
  "........########......",
  ".........######.......",
  ".......##########.....",
  "......############....",
  "......###.####.###....",
  "......###......###....",
  "......###......###....",
  "......############....",
  ".......##########.....",
  "........########......",
  "........########......",
  "........##....##......",
  "........##....##......",
  "........##....##......",
  "........##....##......",
  "........##....##......",
  "........##....##......",
  ".......###....###.....",
  "......................",
  "....[===].............", // dropped laptop!
  "......................"
];

// --- Character 3: Cyber Bot (22x24) ---
const BOT_STAND = [
  "...........#..........", // antenna
  "...........#..........",
  "........######........",
  ".......########.......",
  ".......#[====]#.......", // cyan visor
  ".......########.......",
  "........######........",
  "......##########......",
  ".....############.....",
  ".....##...##...##.....",
  ".....##..####..##.....", // core reactor
  ".....##...##...##.....",
  ".....############.....",
  "......##########......",
  "........######........",
  "........##..##........",
  "........##..##........",
  "........##..##........",
  "........##..##........",
  "........##..##........",
  "........##..##........",
  "........##..##........",
  ".......###..###.......",
  "......................"
];

const BOT_RUN_1 = [
  "...........#..........",
  "...........#..........",
  "........######........",
  ".......########.......",
  ".......#[====]#.......",
  ".......########.......",
  "........######........",
  "......##########......",
  ".....############.....",
  ".....##...##...##.....",
  ".....##..####..##.....",
  ".....##...##...##.....",
  ".....############.....",
  "......##########......",
  "........######........",
  "........##..##........",
  "........##...#........",
  "........##............",
  ".........#............",
  ".........##...........",
  "..........#...........",
  "..........#...........",
  ".........###..........",
  "......................"
];

const BOT_RUN_2 = [
  "...........#..........",
  "...........#..........",
  "........######........",
  ".......########.......",
  ".......#[====]#.......",
  ".......########.......",
  "........######........",
  "......##########......",
  ".....############.....",
  ".....##...##...##.....",
  ".....##..####..##.....",
  ".....##...##...##.....",
  ".....############.....",
  "......##########......",
  "........######........",
  "........##..##........",
  "........#...##........",
  "............##........",
  ".............#........",
  "............##........",
  "............#.........",
  "............#.........",
  "...........###........",
  "......................"
];

const BOT_DUCK_1 = [
  "...................######.......",
  "..................########......",
  "..................#[====]#......",
  "..................########......",
  ".................##########.....",
  ".......#####################....",
  "......####..####..###########...",
  "......####.######.###########...",
  ".......####################.....",
  "........#########..######.......",
  "........##...##......##.........",
  "........##....#.......#.........",
  "........#.......................",
  ".......##.......................",
  "................................",
  "................................"
];

const BOT_DUCK_2 = [
  "...................######.......",
  "..................########......",
  "..................#[====]#......",
  "..................########......",
  ".................##########.....",
  ".......#####################....",
  "......####..####..###########...",
  "......####.######.###########...",
  ".......####################.....",
  "........#########..######.......",
  "........#....##......##.........",
  "........#.....#.......#.........",
  "......................#.........",
  ".....................##.........",
  "................................",
  "................................"
];

const BOT_DEAD = [
  "...........#..........",
  "...........X..........",
  "........######........",
  ".......########.......",
  ".......#X....X#.......", // dead eyes
  ".......########.......",
  "........######........",
  "......##########......",
  ".....############.....",
  ".....##...##...##.....",
  ".....##...##...##.....",
  ".....##...##...##.....",
  ".....############.....",
  "......##########......",
  "........######........",
  "........##..##........",
  "........##..##........",
  "........##..##........",
  "........##..##........",
  "........##..##........",
  ".......###..###.......",
  "......................",
  "......................",
  "......................"
];

// --- Obstacles: Cacti & Pterodactyl ---
const CACTUS_SMALL = [
  "...##.....",
  "...##.....",
  "...##.....",
  "..###.#...",
  "..###.#...",
  "..###.#...",
  ".####.#...",
  ".####.##..",
  ".#######..",
  "..#####...",
  "...##.....",
  "...##.....",
  "...##.....",
  "...##.....",
  "...##.....",
  "...##.....",
  "...##.....",
  "...##....."
];

const CACTUS_LARGE = [
  "...##.......##....",
  "...##.......##....",
  "...##.......##....",
  "..###.#....###.#..",
  "..###.#....###.#..",
  "..###.#....###.#..",
  ".####.##..####.##.",
  ".#######..#######.",
  "..#####....#####..",
  "...##........##...",
  "...##........##...",
  "...##........##...",
  "...##........##...",
  "...##........##...",
  "...##........##...",
  "...##........##...",
  "...##........##...",
  "...##........##...",
  "...##........##...",
  "...##........##...",
  "...##........##...",
  "...##........##...",
  "...##........##...",
  "...##........##..."
];

const BIRD_WINGS_UP = [
  "...................##...",
  "..................####..",
  ".................######.",
  ".................######.",
  ".......##........######.",
  "......####.......###....",
  ".....######......#####..",
  "...##########...#######.",
  ".#####################..",
  "..###################...",
  "....###############.....",
  "......###########.......",
  "........#######.........",
  "..........###..........."
];

const BIRD_WINGS_DOWN = [
  "...................##...",
  "..................####..",
  ".................######.",
  ".................######.",
  ".................######.",
  ".................###....",
  ".................#####..",
  "..###########...#######.",
  ".#####################..",
  "..###################...",
  "....###############.....",
  ".....######..####.......",
  "....####......##........",
  "...##..................."
];

// --- Collectible Power-Ups: Coffee ☕ & Tech Chip 💾 ---
const COFFEE_SPRITE = [
  "...#..#.....",
  "....#..#....",
  "...######...",
  "...######.#.",
  "...######.##",
  "...######.##",
  "...######.#.",
  "...######...",
  "....####....",
  "....####....",
  "....####....",
  "...######..."
];

const TECH_CHIP_SPRITE = [
  ".#.#.##.#.#.",
  "############",
  "##........##",
  "##.######.##",
  "##.##..##.##",
  "##.##..##.##",
  "##.######.##",
  "##........##",
  "############",
  ".#.#.##.#.#."
];

// Cloud
const CLOUD = [
  "........######..........",
  "......##########........",
  "....##############......",
  "..##################....",
  ".####################...",
  "######################..",
  "########################",
  "########################",
  ".######################.",
  "....################...."
];

// -------------------------------------------------------------
// 3. Types & Helper Interfaces
// -------------------------------------------------------------
export type CharacterSkin = 'dino' | 'rafli' | 'bot';

interface Obstacle {
  x: number;
  y: number;
  type: 'cactus_small' | 'cactus_large' | 'bird';
  width: number;
  height: number;
  birdFrame?: number;
}

interface PowerUpItem {
  x: number;
  y: number;
  type: 'coffee' | 'chip';
  width: number;
  height: number;
  baseY: number;
}

interface CloudItem {
  x: number;
  y: number;
  speed: number;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  vy: number;
  alpha: number;
  color: string;
}

interface RankInfo {
  title: string;
  badge: string;
  desc: string;
  color: string;
}

const getPlayerRank = (score: number, lang: 'id' | 'en'): RankInfo => {
  if (score >= 1500) {
    return {
      title: lang === 'id' ? 'Principal Engineer' : 'Principal Architect',
      badge: '👑',
      desc: lang === 'id' ? 'Kecepatan Dewa & Arsitektur Legendaris' : 'God-speed execution & legendary architecture',
      color: 'from-amber-400 to-yellow-500'
    };
  }
  if (score >= 800) {
    return {
      title: lang === 'id' ? 'Lead System Architect' : 'Lead System Architect',
      badge: '🛡️',
      desc: lang === 'id' ? 'Penyelamat Server & Ahli Sistem Mutu' : 'Server savior & mission-critical stability',
      color: 'from-purple-400 to-indigo-500'
    };
  }
  if (score >= 400) {
    return {
      title: lang === 'id' ? 'Senior Fullstack' : 'Senior Fullstack Engineer',
      badge: '⚡',
      desc: lang === 'id' ? 'Bug Crusher Skala Produksi' : 'Production-grade bug crusher',
      color: 'from-cyan-400 to-blue-500'
    };
  }
  if (score >= 150) {
    return {
      title: lang === 'id' ? 'Junior Engineer' : 'Junior Software Engineer',
      badge: '💻',
      desc: lang === 'id' ? 'Lolos Code Review & Siap Sprint' : 'Code review passed, ready for production sprint',
      color: 'from-emerald-400 to-teal-500'
    };
  }
  return {
    title: lang === 'id' ? 'Intern Trial' : 'Internship Explorer',
    badge: '🐣',
    desc: lang === 'id' ? 'Masih Adaptasi Git & Setup Environment' : 'Learning git workflow & dev environment',
    color: 'from-slate-400 to-slate-500'
  };
};

// -------------------------------------------------------------
// 4. Main PixelDinoRunner Component
// -------------------------------------------------------------
export const PixelDinoRunner: React.FC = () => {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Persistent High score
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rafli_pixel_dino_highscore');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [score, setScore] = useState<number>(0);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER'>('IDLE');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [themeMode, setThemeMode] = useState<'cyber' | 'classic'>('cyber');
  const [selectedSkin, setSelectedSkin] = useState<CharacterSkin>('rafli');
  const [lastMilestone, setLastMilestone] = useState<number>(0);
  const [coffeeBoostSec, setCoffeeBoostSec] = useState<number>(0);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);

  // References for Animation & Game Loop
  const gameStateRef = useRef<'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER'>('IDLE');
  const scoreRef = useRef<number>(0);
  const highScoreRef = useRef<number>(highScore);
  const themeModeRef = useRef<'cyber' | 'classic'>('cyber');
  const selectedSkinRef = useRef<CharacterSkin>('rafli');
  const coffeeRushFramesRef = useRef<number>(0); // 0 = off, >0 = invulnerable!
  const screenShakeRef = useRef<number>(0);

  gameStateRef.current = gameState;
  scoreRef.current = score;
  highScoreRef.current = highScore;
  themeModeRef.current = themeMode;
  selectedSkinRef.current = selectedSkin;

  // Game Physics & State
  const groundY = 175;
  const dinoX = 45;
  const dinoYRef = useRef<number>(groundY - 48);
  const dinoVyRef = useRef<number>(0);
  const isJumpingRef = useRef<boolean>(false);
  const isDuckingRef = useRef<boolean>(false);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const powerUpsRef = useRef<PowerUpItem[]>([]);
  const dustParticlesRef = useRef<DustParticle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const cloudsRef = useRef<CloudItem[]>([
    { x: 180, y: 35, speed: 0.8 },
    { x: 420, y: 50, speed: 0.6 },
    { x: 620, y: 25, speed: 0.9 },
  ]);
  const groundOffsetRef = useRef<number>(0);
  const gameSpeedRef = useRef<number>(6.5);
  const frameCountRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number>(0);

  // Sound sync
  useEffect(() => {
    audio.enabled = soundEnabled;
  }, [soundEnabled]);

  // Helper: Spawn dust particles
  const spawnDust = (x: number, y: number, count: number = 3, color: string = '#38bdf8') => {
    for (let i = 0; i < count; i++) {
      dustParticlesRef.current.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 4,
        vx: -gameSpeedRef.current * 0.4 - Math.random() * 2,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() > 0.5 ? 3 : 2,
        alpha: 0.8,
        color,
      });
    }
  };

  // Helper: Spawn floating score popups
  const spawnFloatingText = (text: string, x: number, y: number, color: string = '#ffe600') => {
    floatingTextsRef.current.push({
      id: Date.now() + Math.random(),
      text,
      x,
      y,
      vy: -1.8,
      alpha: 1.0,
      color,
    });
  };

  // Start / Restart Game
  const startGame = useCallback(() => {
    dinoYRef.current = groundY - 48;
    dinoVyRef.current = 0;
    isJumpingRef.current = false;
    isDuckingRef.current = false;
    obstaclesRef.current = [];
    powerUpsRef.current = [];
    dustParticlesRef.current = [];
    floatingTextsRef.current = [];
    groundOffsetRef.current = 0;
    gameSpeedRef.current = 6.5;
    frameCountRef.current = 0;
    coffeeRushFramesRef.current = 0;
    screenShakeRef.current = 0;
    setCoffeeBoostSec(0);
    setScore(0);
    setLastMilestone(0);
    setSpeedMultiplier(1.0);
    setGameState('PLAYING');
    gameStateRef.current = 'PLAYING';
    audio.playJump();
  }, []);

  // Pause / Resume Toggle
  const togglePause = useCallback(() => {
    if (gameStateRef.current === 'PLAYING') {
      setGameState('PAUSED');
      gameStateRef.current = 'PAUSED';
    } else if (gameStateRef.current === 'PAUSED') {
      setGameState('PLAYING');
      gameStateRef.current = 'PLAYING';
    }
  }, []);

  // Jump Action
  const handleJump = useCallback(() => {
    if (gameStateRef.current === 'IDLE' || gameStateRef.current === 'GAME_OVER') {
      startGame();
      return;
    }
    if (gameStateRef.current === 'PAUSED') {
      togglePause();
      return;
    }

    if (!isJumpingRef.current && dinoYRef.current >= groundY - 50) {
      isJumpingRef.current = true;
      dinoVyRef.current = -11.5;
      audio.playJump();
      // Dust burst on launch
      spawnDust(dinoX + 10, groundY - 4, 4, themeModeRef.current === 'cyber' ? '#00f0ff' : '#757575');
    }
  }, [startGame, togglePause]);

  // Duck Action
  const handleDuckStart = useCallback(() => {
    if (gameStateRef.current === 'PLAYING') {
      isDuckingRef.current = true;
      // Fast drop if in air
      if (isJumpingRef.current) {
        dinoVyRef.current += 5;
      }
    }
  }, []);

  const handleDuckEnd = useCallback(() => {
    isDuckingRef.current = false;
  }, []);

  // Share score to clipboard
  const handleShareScore = () => {
    const rank = getPlayerRank(score, language);
    const text =
      language === 'id'
        ? `🎮 Saya baru saja mencetak rekor skor ${score} (${rank.badge} ${rank.title}) di Cyber Dino Runner portofolio Mohamad Rafli Adipratama!\n\nBisakah Anda mengalahkannya? Coba di sini: https://rafliadipratama.github.io/portfolio-rafli/#/labs`
        : `🎮 I just scored ${score} (${rank.badge} ${rank.title}) on Cyber Dino Runner in Mohamad Rafli Adipratama's portfolio!\n\nCan you beat my high score? Play here: https://rafliadipratama.github.io/portfolio-rafli/#/labs`;

    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        handleJump();
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        handleDuckStart();
      } else if (e.code === 'KeyP' || e.code === 'Escape') {
        e.preventDefault();
        togglePause();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowDown') {
        e.preventDefault();
        handleDuckEnd();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleJump, handleDuckStart, handleDuckEnd, togglePause]);

  // Helper: Draw 2D Pixel Sprite from Matrix
  const drawPixelSprite = (
    ctx: CanvasRenderingContext2D,
    matrix: string[],
    x: number,
    y: number,
    pixelSize: number,
    primaryColor: string,
    eyeColor?: string
  ) => {
    for (let r = 0; r < matrix.length; r++) {
      const row = matrix[r];
      for (let c = 0; c < row.length; c++) {
        const char = row[c];
        if (char === '#') {
          ctx.fillStyle = primaryColor;
          ctx.fillRect(Math.floor(x + c * pixelSize), Math.floor(y + r * pixelSize), pixelSize, pixelSize);
        } else if (char === 'X') {
          // X dead eye
          ctx.fillStyle = eyeColor || '#ff0055';
          ctx.fillRect(Math.floor(x + c * pixelSize), Math.floor(y + r * pixelSize), pixelSize, pixelSize);
        } else if (char === '[' || char === ']' || char === '=') {
          // Laptop or Visor special cyan highlight
          ctx.fillStyle = '#00f0ff';
          ctx.fillRect(Math.floor(x + c * pixelSize), Math.floor(y + r * pixelSize), pixelSize, pixelSize);
        }
      }
    }
  };

  // Helper: Bounding Box Collision
  const checkCollision = (
    dx: number,
    dy: number,
    dw: number,
    dh: number,
    ox: number,
    oy: number,
    ow: number,
    oh: number
  ) => {
    const inset = 3;
    return (
      dx + inset < ox + ow - inset &&
      dx + dw - inset > ox + inset &&
      dy + inset < oy + oh - inset &&
      dy + dh - inset > oy + inset
    );
  };

  // Main Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const currentTheme = themeModeRef.current;

      // Theme Colors
      const bgColor = currentTheme === 'cyber' ? '#060919' : '#f7f7f7';
      const defaultCharColor = currentTheme === 'cyber' ? '#00f0ff' : '#535353';
      const cactusColor = currentTheme === 'cyber' ? '#00ff9d' : '#535353';
      const birdColor = currentTheme === 'cyber' ? '#ff007f' : '#535353';
      const groundColor = currentTheme === 'cyber' ? '#1c2452' : '#757575';
      const cloudColor = currentTheme === 'cyber' ? '#182348' : '#e0e0e0';

      // 1. Screen Shake Apply
      ctx.save();
      if (screenShakeRef.current > 0.5) {
        const shakeX = (Math.random() - 0.5) * screenShakeRef.current;
        const shakeY = (Math.random() - 0.5) * screenShakeRef.current;
        ctx.translate(shakeX, shakeY);
        screenShakeRef.current *= 0.85; // smooth decay
      }

      // Clear Canvas Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Subtle Cyber Grid in Background
      if (currentTheme === 'cyber') {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
        ctx.lineWidth = 1;
        for (let gx = 0; gx < width; gx += 40) {
          ctx.beginPath();
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx, height);
          ctx.stroke();
        }
      }

      // 2. Clouds Floating
      cloudsRef.current.forEach(cloud => {
        if (gameStateRef.current === 'PLAYING') {
          cloud.x -= cloud.speed;
          if (cloud.x < -60) {
            cloud.x = width + Math.random() * 80;
            cloud.y = 20 + Math.random() * 50;
          }
        }
        drawPixelSprite(ctx, CLOUD, cloud.x, cloud.y, 2, cloudColor);
      });

      // 3. Ground Line with Scrolling Details
      if (gameStateRef.current === 'PLAYING') {
        groundOffsetRef.current = (groundOffsetRef.current + gameSpeedRef.current) % 800;
      }

      ctx.fillStyle = groundColor;
      ctx.fillRect(0, groundY, width, 2);

      // Pixel bumps & pebbles on the ground
      for (let gx = 0; gx < width + 80; gx += 16) {
        const px = Math.floor(gx - (groundOffsetRef.current % 16));
        if ((gx * 7) % 5 === 0) {
          ctx.fillRect(px, groundY + 5, 3, 2);
        } else if ((gx * 13) % 7 === 0) {
          ctx.fillRect(px, groundY + 10, 4, 2);
          ctx.fillRect(px + 4, groundY + 11, 2, 2);
        } else if ((gx * 19) % 11 === 0) {
          ctx.fillRect(px, groundY + 7, 2, 2);
        }
      }

      // 4. Update Game State, Score & Physics
      if (gameStateRef.current === 'PLAYING') {
        frameCountRef.current++;

        // Coffee Rush Countdown
        if (coffeeRushFramesRef.current > 0) {
          coffeeRushFramesRef.current--;
          setCoffeeBoostSec(Math.ceil(coffeeRushFramesRef.current / 60));
        } else if (coffeeBoostSec > 0) {
          setCoffeeBoostSec(0);
        }

        // Increase score
        if (frameCountRef.current % 4 === 0) {
          scoreRef.current += 1;
          setScore(scoreRef.current);

          // Milestone beep every 100 points
          if (scoreRef.current > 0 && scoreRef.current % 100 === 0 && scoreRef.current !== lastMilestone) {
            setLastMilestone(scoreRef.current);
            audio.playScoreMilestone();
          }

          // Gradually speed up
          if (scoreRef.current % 150 === 0 && gameSpeedRef.current < 13) {
            gameSpeedRef.current += 0.35;
            setSpeedMultiplier(parseFloat((gameSpeedRef.current / 6.5).toFixed(1)));
          }
        }

        // Running dust generation
        if (!isJumpingRef.current && frameCountRef.current % 6 === 0) {
          spawnDust(dinoX + 4, groundY - 2, 1, currentTheme === 'cyber' ? '#00f0ff' : '#9e9e9e');
        }

        // Apply Gravity
        if (isJumpingRef.current) {
          const gravity = isDuckingRef.current ? 0.95 : 0.62;
          dinoVyRef.current += gravity;
          dinoYRef.current += dinoVyRef.current;

          // Landing on Ground
          if (dinoYRef.current >= groundY - 48) {
            dinoYRef.current = groundY - 48;
            dinoVyRef.current = 0;
            isJumpingRef.current = false;
            // Landing burst & tiny screen thud
            spawnDust(dinoX + 8, groundY - 3, 5, currentTheme === 'cyber' ? '#00f0ff' : '#757575');
            screenShakeRef.current = Math.max(screenShakeRef.current, 2);
          }
        }
      }

      // 5. Draw & Update Dust Particles
      for (let pIdx = dustParticlesRef.current.length - 1; pIdx >= 0; pIdx--) {
        const p = dustParticlesRef.current[pIdx];
        if (gameStateRef.current === 'PLAYING') {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.035;
        }
        if (p.alpha <= 0) {
          dustParticlesRef.current.splice(pIdx, 1);
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.globalAlpha = 1.0;
        }
      }

      // 6. Spawn Obstacles
      if (gameStateRef.current === 'PLAYING') {
        const lastObstacle = obstaclesRef.current[obstaclesRef.current.length - 1];
        const minDistance = Math.max(220, 360 - gameSpeedRef.current * 10);

        if (!lastObstacle || width - lastObstacle.x > minDistance) {
          if (Math.random() < 0.05) {
            const allowBird = scoreRef.current > 250;
            const rand = Math.random();

            if (allowBird && rand < 0.3) {
              const birdYOptions = [groundY - 60, groundY - 45, groundY - 30];
              const chosenY = birdYOptions[Math.floor(Math.random() * birdYOptions.length)];
              obstaclesRef.current.push({
                x: width + 20,
                y: chosenY,
                type: 'bird',
                width: 48,
                height: 28,
                birdFrame: 0,
              });
            } else if (rand < 0.65) {
              obstaclesRef.current.push({
                x: width + 20,
                y: groundY - 36,
                type: 'cactus_small',
                width: 20,
                height: 36,
              });
            } else {
              obstaclesRef.current.push({
                x: width + 20,
                y: groundY - 48,
                type: 'cactus_large',
                width: 36,
                height: 48,
              });
            }
          }
        }

        // Spawn Power-Ups (Coffee or Chip)
        if (powerUpsRef.current.length === 0 && Math.random() < 0.008 && scoreRef.current > 100) {
          const type = Math.random() > 0.4 ? 'coffee' : 'chip';
          const y = type === 'coffee' ? groundY - 36 : groundY - 58;
          powerUpsRef.current.push({
            x: width + 60,
            y,
            type,
            width: 24,
            height: 24,
            baseY: y,
          });
        }
      }

      // 7. Update & Draw Power-Ups
      for (let puIdx = powerUpsRef.current.length - 1; puIdx >= 0; puIdx--) {
        const pu = powerUpsRef.current[puIdx];
        if (gameStateRef.current === 'PLAYING') {
          pu.x -= gameSpeedRef.current;
          // Smooth floating hover
          pu.y = pu.baseY + Math.sin(frameCountRef.current * 0.1) * 4;

          // Check Collect
          const dinoCurrentW = isDuckingRef.current ? 60 : 44;
          const dinoCurrentH = isDuckingRef.current ? 32 : 48;
          const dinoCurrentY = isDuckingRef.current ? groundY - 32 : dinoYRef.current;

          if (checkCollision(dinoX, dinoCurrentY, dinoCurrentW, dinoCurrentH, pu.x, pu.y, pu.width, pu.height)) {
            if (pu.type === 'coffee') {
              // Activate Coffee Rush: 6 seconds of invincibility + smash
              coffeeRushFramesRef.current = 360; // 6s at 60fps
              audio.playPowerUp();
              spawnFloatingText('☕ COFFEE RUSH!', pu.x, pu.y - 10, '#ffe600');
              confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
            } else {
              // Tech Chip: +100 bonus points!
              scoreRef.current += 100;
              setScore(scoreRef.current);
              audio.playCollect();
              spawnFloatingText('+100 💾', pu.x, pu.y - 10, '#00ff9d');
            }
            powerUpsRef.current.splice(puIdx, 1);
            continue;
          }
        }

        // Draw Power-Up
        if (pu.type === 'coffee') {
          drawPixelSprite(ctx, COFFEE_SPRITE, pu.x, pu.y, 2, '#fb923c');
        } else {
          drawPixelSprite(ctx, TECH_CHIP_SPRITE, pu.x, pu.y, 2, '#38bdf8');
        }

        if (pu.x < -40) {
          powerUpsRef.current.splice(puIdx, 1);
        }
      }

      // 8. Draw & Move Obstacles + Collision
      const isInvincible = coffeeRushFramesRef.current > 0;
      const dinoCurrentW = isDuckingRef.current ? 60 : 44;
      const dinoCurrentH = isDuckingRef.current ? 32 : 48;
      const dinoCurrentY = isDuckingRef.current ? groundY - 32 : dinoYRef.current;

      for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
        const obs = obstaclesRef.current[i];

        if (gameStateRef.current === 'PLAYING') {
          obs.x -= gameSpeedRef.current;

          if (obs.type === 'bird' && frameCountRef.current % 12 === 0) {
            obs.birdFrame = obs.birdFrame === 0 ? 1 : 0;
          }

          // Check Collision
          if (checkCollision(dinoX, dinoCurrentY, dinoCurrentW, dinoCurrentH, obs.x, obs.y, obs.width, obs.height)) {
            if (isInvincible) {
              // Smash obstacle into pieces!
              obstaclesRef.current.splice(i, 1);
              audio.playSmash();
              screenShakeRef.current = 9;
              scoreRef.current += 50;
              setScore(scoreRef.current);
              spawnDust(obs.x + 10, obs.y + 10, 8, '#ff007f');
              spawnFloatingText('SMASH +50!', obs.x, obs.y - 10, '#ff007f');
              continue;
            } else {
              // GAME OVER
              setGameState('GAME_OVER');
              gameStateRef.current = 'GAME_OVER';
              audio.playGameOver();
              screenShakeRef.current = 14;

              if (scoreRef.current > highScoreRef.current) {
                setHighScore(scoreRef.current);
                highScoreRef.current = scoreRef.current;
                if (typeof window !== 'undefined') {
                  localStorage.setItem('rafli_pixel_dino_highscore', scoreRef.current.toString());
                }
                confetti({
                  particleCount: 90,
                  spread: 80,
                  origin: { y: 0.6 }
                });
              }
            }
          }
        }

        // Draw Obstacle
        if (obs.type === 'cactus_small') {
          drawPixelSprite(ctx, CACTUS_SMALL, obs.x, obs.y, 2, cactusColor);
        } else if (obs.type === 'cactus_large') {
          drawPixelSprite(ctx, CACTUS_LARGE, obs.x, obs.y, 2, cactusColor);
        } else if (obs.type === 'bird') {
          const birdSprite = obs.birdFrame === 0 ? BIRD_WINGS_UP : BIRD_WINGS_DOWN;
          drawPixelSprite(ctx, birdSprite, obs.x, obs.y, 2, birdColor);
        }

        if (obs.x < -80) {
          obstaclesRef.current.splice(i, 1);
        }
      }

      // 9. Draw Character Based on Chosen Skin
      let charMatrix = DINO_STAND;
      const skin = selectedSkinRef.current;
      const runStep = Math.floor(frameCountRef.current / 6) % 2;

      // Color computation (Rainbow aura if Coffee Rush!)
      let charColor = defaultCharColor;
      if (isInvincible) {
        const auraPalette = ['#ffe600', '#00f0ff', '#ff007f', '#00ff9d'];
        charColor = auraPalette[Math.floor(frameCountRef.current / 4) % auraPalette.length];
      }

      if (skin === 'rafli') {
        if (gameStateRef.current === 'GAME_OVER') {
          charMatrix = RAFLI_DEAD;
        } else if (isDuckingRef.current) {
          charMatrix = runStep === 0 ? RAFLI_DUCK_1 : RAFLI_DUCK_2;
        } else if (isJumpingRef.current) {
          charMatrix = RAFLI_STAND;
        } else if (gameStateRef.current === 'PLAYING') {
          charMatrix = runStep === 0 ? RAFLI_RUN_1 : RAFLI_RUN_2;
        } else {
          charMatrix = RAFLI_STAND;
        }
      } else if (skin === 'bot') {
        if (gameStateRef.current === 'GAME_OVER') {
          charMatrix = BOT_DEAD;
        } else if (isDuckingRef.current) {
          charMatrix = runStep === 0 ? BOT_DUCK_1 : BOT_DUCK_2;
        } else if (isJumpingRef.current) {
          charMatrix = BOT_STAND;
        } else if (gameStateRef.current === 'PLAYING') {
          charMatrix = runStep === 0 ? BOT_RUN_1 : BOT_RUN_2;
        } else {
          charMatrix = BOT_STAND;
        }
      } else {
        // Classic Dino
        if (gameStateRef.current === 'GAME_OVER') {
          charMatrix = DINO_DEAD;
        } else if (isDuckingRef.current) {
          charMatrix = runStep === 0 ? DINO_DUCK_1 : DINO_DUCK_2;
        } else if (isJumpingRef.current) {
          charMatrix = DINO_STAND;
        } else if (gameStateRef.current === 'PLAYING') {
          charMatrix = runStep === 0 ? DINO_RUN_1 : DINO_RUN_2;
        } else {
          charMatrix = DINO_STAND;
        }
      }

      drawPixelSprite(ctx, charMatrix, dinoX, dinoCurrentY, 2, charColor, '#ff0055');

      // 10. Draw Floating Popups (+100, SMASH)
      for (let tIdx = floatingTextsRef.current.length - 1; tIdx >= 0; tIdx--) {
        const ft = floatingTextsRef.current[tIdx];
        if (gameStateRef.current === 'PLAYING') {
          ft.y += ft.vy;
          ft.alpha -= 0.025;
        }
        if (ft.alpha <= 0) {
          floatingTextsRef.current.splice(tIdx, 1);
        } else {
          ctx.save();
          ctx.font = 'bold 13px "Courier New", monospace';
          ctx.fillStyle = ft.color;
          ctx.globalAlpha = ft.alpha;
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.restore();
        }
      }

      // 11. Draw HUD: Scores & Speedometer
      const padZero = (n: number, len: number) => n.toString().padStart(len, '0');
      const scoreStr = padZero(scoreRef.current, 5);
      const hiStr = `HI ${padZero(highScoreRef.current, 5)}`;

      ctx.font = 'bold 15px "Courier New", monospace';
      ctx.textAlign = 'right';

      // High Score label
      ctx.fillStyle = currentTheme === 'cyber' ? '#64748b' : '#9e9e9e';
      ctx.fillText(hiStr, width - 90, 28);

      // Current Score with blink on milestone
      const isMilestoneFlashing = scoreRef.current % 100 < 30 && scoreRef.current > 0;
      if (!isMilestoneFlashing || Math.floor(frameCountRef.current / 8) % 2 === 0) {
        ctx.fillStyle = currentTheme === 'cyber' ? '#00f0ff' : '#212121';
        ctx.fillText(scoreStr, width - 20, 28);
      }

      // Speedometer & Coffee Rush Timer on Top Left
      ctx.textAlign = 'left';
      ctx.font = 'bold 12px "Courier New", monospace';
      if (isInvincible) {
        ctx.fillStyle = '#ffe600';
        ctx.fillText(`☕ RUSH: ${(coffeeRushFramesRef.current / 60).toFixed(1)}s (INVINCIBLE)`, 20, 28);
      } else {
        ctx.fillStyle = currentTheme === 'cyber' ? '#64748b' : '#9e9e9e';
        ctx.fillText(`SPD: ${(gameSpeedRef.current / 6.5).toFixed(1)}x`, 20, 28);
      }

      // 12. Overlay Banners (Idle / Paused / Game Over)
      if (gameStateRef.current === 'IDLE') {
        ctx.fillStyle = currentTheme === 'cyber' ? '#00f0ff' : '#333333';
        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PRESS SPACE / TAP TO JUMP', width / 2, height / 2 - 15);
        ctx.font = '12px "Courier New", monospace';
        ctx.fillStyle = currentTheme === 'cyber' ? '#94a3b8' : '#757575';
        ctx.fillText('HINDARI RINTANGAN & AMBIL KOPI POWER-UP!', width / 2, height / 2 + 10);
      } else if (gameStateRef.current === 'PAUSED') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 20px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('|| GAME PAUSED', width / 2, height / 2 - 10);
        ctx.font = '12px "Courier New", monospace';
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText('TEKAN TOMBOL P / RESUME UNTUK LANJUT', width / 2, height / 2 + 15);
      }

      ctx.restore(); // Restore screen shake transform

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    animationFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  const currentRank = getPlayerRank(score, language);

  return (
    <div className="space-y-4">
      {/* Game Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#090d26] border border-[#1c2452]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 font-orbitron flex items-center gap-2">
              <span>Cyber Dino 2D Pixel Runner</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                Chrome T-Rex Edition
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              {language === 'id'
                ? 'Lompat rintangan, ambil kopi untuk invulnerability rush, dan raih gelar rekruter tertinggi!'
                : 'Jump obstacles, grab coffee for invulnerability rush, and unlock top recruiter ranks!'}
            </p>
          </div>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Pause / Resume Button */}
          {gameState === 'PLAYING' && (
            <button
              onClick={togglePause}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 text-xs flex items-center gap-1.5 cursor-pointer"
              title="Pause Game (P)"
            >
              <Pause className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-[11px] hidden sm:inline">Pause</span>
            </button>
          )}

          {gameState === 'PAUSED' && (
            <button
              onClick={togglePause}
              className="p-2 rounded-xl bg-cyan-950 border border-cyan-700 text-cyan-300 text-xs flex items-center gap-1.5 cursor-pointer animate-pulse"
              title="Resume Game (P)"
            >
              <Play className="w-4 h-4" />
              <span className="font-mono text-[11px]">Resume</span>
            </button>
          )}

          {/* Sound Mute/Unmute */}
          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 cursor-pointer ${
              soundEnabled
                ? 'bg-cyan-950/50 border-cyan-700/60 text-cyan-300 hover:bg-cyan-900/50'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={soundEnabled ? 'Mute 8-bit Audio' : 'Unmute 8-bit Audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="font-mono text-[11px] hidden sm:inline">{soundEnabled ? '8-Bit ON' : 'MUTE'}</span>
          </button>

          {/* Theme Palette Switcher */}
          <button
            onClick={() => setThemeMode(prev => (prev === 'cyber' ? 'classic' : 'cyber'))}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 cursor-pointer"
            title="Ganti Tema Warna"
          >
            <Palette className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-[11px] hidden sm:inline">
              {themeMode === 'cyber' ? 'Cyber Dark' : 'Classic Chrome'}
            </span>
          </button>

          {/* Speed Multiplier Badge */}
          <div className="px-2.5 py-1.5 rounded-xl bg-[#0f172a] border border-cyan-500/30 text-cyan-300 font-mono text-xs flex items-center gap-1 shadow-sm">
            <span className="text-[10px] text-slate-400">SPD:</span>
            <span className="font-bold">{speedMultiplier.toFixed(1)}x</span>
          </div>

          {/* Coffee Rush Active Indicator */}
          {coffeeBoostSec > 0 && (
            <div className="px-2.5 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500 text-amber-300 font-mono text-xs flex items-center gap-1 shadow-sm animate-pulse">
              <Coffee className="w-3.5 h-3.5 text-amber-400" />
              <span>{coffeeBoostSec}s RUSH</span>
            </div>
          )}

          {/* High Score Badge */}
          <div className="px-3 py-1.5 rounded-xl bg-[#0f172a] border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>HI: {highScore.toString().padStart(5, '0')}</span>
          </div>
        </div>
      </div>

      {/* Skin / Character Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#070b20] border border-[#1c2452]/70 text-xs">
        <span className="text-slate-400 font-mono text-[11px]">
          {language === 'id' ? 'Pilih Karakter:' : 'Choose Character:'}
        </span>
        <div className="flex items-center gap-2">
          {[
            { id: 'rafli' as const, name: 'Pixel Rafli (Dev)', emoji: '👨‍💻' },
            { id: 'dino' as const, name: 'Chrome T-Rex', emoji: '🦖' },
            { id: 'bot' as const, name: 'Cyber Bot (AI)', emoji: '🤖' },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSkin(s.id)}
              className={`px-3 py-1 rounded-lg font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedSkin === s.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{s.emoji}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Arcade Canvas Frame */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#1c2452] shadow-2xl bg-black flex flex-col items-center justify-center">
        {/* Pixel Canvas Screen (Internal Virtual Res: 700x210) */}
        <canvas
          ref={canvasRef}
          width={700}
          height={210}
          onClick={handleJump}
          className="w-full h-auto cursor-pointer select-none block"
          style={{
            imageRendering: 'pixelated',
          }}
        />

        {/* Game State Overlay Buttons for Quick Touch on Canvas */}
        {gameState === 'GAME_OVER' && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] flex flex-col items-center justify-center gap-3 p-4 animate-in fade-in zoom-in-95 duration-150">
            {/* Rank Result Card */}
            <div className="p-4 rounded-2xl bg-[#090d24] border border-cyan-500/40 shadow-xl text-center max-w-sm w-full space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">{currentRank.badge}</span>
                <span className={`text-base font-extrabold font-orbitron text-transparent bg-clip-text bg-gradient-to-r ${currentRank.color}`}>
                  {currentRank.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                {currentRank.desc}
              </p>

              <div className="flex items-center justify-center gap-4 pt-1 font-mono text-xs border-t border-slate-800/80">
                <div>
                  <span className="text-slate-500 block text-[10px]">SKOR ANDA</span>
                  <span className="text-cyan-400 font-bold text-lg">{score.toString().padStart(5, '0')}</span>
                </div>
                <div className="w-px h-6 bg-slate-800" />
                <div>
                  <span className="text-slate-500 block text-[10px]">REKOR TERTINGGI</span>
                  <span className="text-amber-400 font-bold text-lg">{highScore.toString().padStart(5, '0')}</span>
                </div>
              </div>

              {/* Action Buttons: Play Again & Share */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={startGame}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/25 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>MAIN LAGI</span>
                </button>

                <button
                  onClick={handleShareScore}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Salin Skor & Tantang Rekan"
                >
                  {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400" />}
                  <span className="text-[11px]">{copiedShare ? 'Tersalin!' : 'Bagikan'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile-Friendly Tactile Controls & Keyboard Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        {/* Desktop Keyboard Hints */}
        <div className="p-3 rounded-xl bg-[#090d26] border border-slate-800/80 flex items-center gap-3 text-xs text-slate-300">
          <div className="flex gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-cyan-300">SPACE</kbd>
            <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-cyan-300">&uarr;</kbd>
          </div>
          <div>
            <span className="font-bold text-slate-200">Lompat:</span>
            <span className="text-slate-400 ml-1">Kaktus & ambil chip 💾</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#090d26] border border-slate-800/80 flex items-center gap-3 text-xs text-slate-300">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-pink-300">&darr;</kbd>
          <div>
            <span className="font-bold text-slate-200">Merunduk (Duck):</span>
            <span className="text-slate-400 ml-1">Hindari pterodactyl melayang</span>
          </div>
        </div>

        {/* Mobile Tactile Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onPointerDown={handleDuckStart}
            onPointerUp={handleDuckEnd}
            onPointerLeave={handleDuckEnd}
            className="flex-1 py-3 px-3 rounded-xl bg-[#131c38] active:bg-[#1f2d59] border border-slate-700 text-slate-200 font-mono font-bold text-xs flex items-center justify-center gap-1.5 touch-none select-none transition-transform active:scale-95 cursor-pointer"
          >
            <ArrowDown className="w-4 h-4 text-pink-400" />
            <span>MERUNDUK</span>
          </button>

          <button
            onPointerDown={handleJump}
            className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 active:from-cyan-500 active:to-blue-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 touch-none select-none shadow-md shadow-cyan-500/20 transition-transform active:scale-95 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>LOMPAT</span>
          </button>
        </div>
      </div>

      {/* Feature Guide Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
        <div className="p-2.5 rounded-xl bg-[#090d24] border border-slate-800 flex items-center gap-2">
          <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
          <span>☕ <strong>Coffee Rush:</strong> Kebal 6 detik & hancurkan kaktus (+50 SMASH bonus)!</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#090d24] border border-slate-800 flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>💾 <strong>Tech Chip:</strong> Melayang di udara, raih +100 poin instan!</span>
        </div>
      </div>
    </div>
  );
};

export default PixelDinoRunner;

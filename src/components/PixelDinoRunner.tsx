import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Volume2, VolumeX, RotateCcw, Trophy, Palette, Sparkles, Gamepad2, ArrowUp, ArrowDown } from 'lucide-react';
import confetti from 'canvas-confetti';

// -------------------------------------------------------------
// Retro 8-bit Web Audio Synthesizer (Zero External Audio Files)
// -------------------------------------------------------------
class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
// Pixel Art Matrices (Exact 2D Pixel Matrices for Classic Dino)
// -------------------------------------------------------------
// Dino Stand (22x24)
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

// Dino Run Frame 1 (left leg back, right foot forward)
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

// Dino Run Frame 2 (left leg forward, right foot back)
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

// Dino Duck Frame 1 (30x16)
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

// Dino Duck Frame 2 (30x16)
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

// Dino Dead Frame (X eye)
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

// Small Cactus (10x18)
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

// Large Double Cactus (18x24)
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

// Pterodactyl Bird Wings Up (24x14)
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

// Pterodactyl Bird Wings Down (24x14)
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

// Cloud (24x10)
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

interface Obstacle {
  x: number;
  y: number;
  type: 'cactus_small' | 'cactus_large' | 'bird';
  width: number;
  height: number;
  birdFrame?: number;
  counted?: boolean;
}

interface CloudItem {
  x: number;
  y: number;
  speed: number;
}

export const PixelDinoRunner: React.FC = () => {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High score persisted in localStorage
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rafli_pixel_dino_highscore');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [score, setScore] = useState<number>(0);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAME_OVER'>('IDLE');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [themeMode, setThemeMode] = useState<'cyber' | 'classic'>('cyber');
  const [lastMilestone, setLastMilestone] = useState<number>(0);

  // References for Animation & Game Loop
  const gameStateRef = useRef<'IDLE' | 'PLAYING' | 'GAME_OVER'>('IDLE');
  const scoreRef = useRef<number>(0);
  const highScoreRef = useRef<number>(highScore);
  const themeModeRef = useRef<'cyber' | 'classic'>('cyber');

  gameStateRef.current = gameState;
  scoreRef.current = score;
  highScoreRef.current = highScore;
  themeModeRef.current = themeMode;

  // Game Physics & State
  const groundY = 175;
  const dinoX = 45;
  const dinoYRef = useRef<number>(groundY - 48); // Baseline feet at groundY
  const dinoVyRef = useRef<number>(0);
  const isJumpingRef = useRef<boolean>(false);
  const isDuckingRef = useRef<boolean>(false);
  const obstaclesRef = useRef<Obstacle[]>([]);
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

  // Jump Action
  const handleJump = useCallback(() => {
    if (gameStateRef.current === 'IDLE' || gameStateRef.current === 'GAME_OVER') {
      startGame();
      return;
    }

    if (!isJumpingRef.current && dinoYRef.current >= groundY - 50) {
      isJumpingRef.current = true;
      dinoVyRef.current = -11.5;
      audio.playJump();
    }
  }, []);

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

  // Start / Restart Game
  const startGame = useCallback(() => {
    dinoYRef.current = groundY - 48;
    dinoVyRef.current = 0;
    isJumpingRef.current = false;
    isDuckingRef.current = false;
    obstaclesRef.current = [];
    groundOffsetRef.current = 0;
    gameSpeedRef.current = 6.5;
    frameCountRef.current = 0;
    setScore(0);
    setLastMilestone(0);
    setGameState('PLAYING');
    gameStateRef.current = 'PLAYING';
    audio.playJump();
  }, []);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        // Prevent default scrolling on space / arrow up
        e.preventDefault();
        handleJump();
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        handleDuckStart();
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
  }, [handleJump, handleDuckStart, handleDuckEnd]);

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
    // Generous hitbox inset (2px) to feel fair
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
      const dinoColor = currentTheme === 'cyber' ? '#00f0ff' : '#535353';
      const cactusColor = currentTheme === 'cyber' ? '#00ff9d' : '#535353';
      const birdColor = currentTheme === 'cyber' ? '#ff007f' : '#535353';
      const groundColor = currentTheme === 'cyber' ? '#1c2452' : '#757575';
      const cloudColor = currentTheme === 'cyber' ? '#182348' : '#e0e0e0';
      const gridGlow = currentTheme === 'cyber';

      // 1. Clear Canvas Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Subtle Cyber Grid in Background
      if (gridGlow) {
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
        // Pseudo-random dots based on position
        if ((gx * 7) % 5 === 0) {
          ctx.fillRect(px, groundY + 5, 3, 2);
        } else if ((gx * 13) % 7 === 0) {
          ctx.fillRect(px, groundY + 10, 4, 2);
          ctx.fillRect(px + 4, groundY + 11, 2, 2);
        } else if ((gx * 19) % 11 === 0) {
          ctx.fillRect(px, groundY + 7, 2, 2);
        }
      }

      // 4. Update Dino Physics
      if (gameStateRef.current === 'PLAYING') {
        frameCountRef.current++;

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
          }
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
          }
        }
      }

      // 5. Spawn Obstacles
      if (gameStateRef.current === 'PLAYING') {
        const lastObstacle = obstaclesRef.current[obstaclesRef.current.length - 1];
        const minDistance = Math.max(220, 360 - gameSpeedRef.current * 10);

        if (!lastObstacle || width - lastObstacle.x > minDistance) {
          // 40% chance when space available
          if (Math.random() < 0.05) {
            const allowBird = scoreRef.current > 250;
            const rand = Math.random();

            if (allowBird && rand < 0.3) {
              // Pterodactyl Bird: High, Medium, or Low height
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
              // Small Cactus
              obstaclesRef.current.push({
                x: width + 20,
                y: groundY - 36,
                type: 'cactus_small',
                width: 20,
                height: 36,
              });
            } else {
              // Large Double Cactus
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
      }

      // 6. Draw & Move Obstacles + Check Collision
      const dinoCurrentW = isDuckingRef.current ? 60 : 44;
      const dinoCurrentH = isDuckingRef.current ? 32 : 48;
      const dinoCurrentY = isDuckingRef.current ? groundY - 32 : dinoYRef.current;

      for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
        const obs = obstaclesRef.current[i];

        if (gameStateRef.current === 'PLAYING') {
          obs.x -= gameSpeedRef.current;

          // Bird wing flapping
          if (obs.type === 'bird' && frameCountRef.current % 12 === 0) {
            obs.birdFrame = obs.birdFrame === 0 ? 1 : 0;
          }

          // Check Collision
          if (checkCollision(dinoX, dinoCurrentY, dinoCurrentW, dinoCurrentH, obs.x, obs.y, obs.width, obs.height)) {
            // GAME OVER!
            setGameState('GAME_OVER');
            gameStateRef.current = 'GAME_OVER';
            audio.playGameOver();

            // High score update
            if (scoreRef.current > highScoreRef.current) {
              setHighScore(scoreRef.current);
              highScoreRef.current = scoreRef.current;
              if (typeof window !== 'undefined') {
                localStorage.setItem('rafli_pixel_dino_highscore', scoreRef.current.toString());
              }
              // Confetti burst for new personal record!
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
              });
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

        // Remove off-screen obstacles
        if (obs.x < -80) {
          obstaclesRef.current.splice(i, 1);
        }
      }

      // 7. Draw Dino
      let dinoMatrix = DINO_STAND;
      let pixelScale = 2;

      if (gameStateRef.current === 'GAME_OVER') {
        dinoMatrix = DINO_DEAD;
      } else if (isDuckingRef.current) {
        // Ducking run cycle
        const duckStep = Math.floor(frameCountRef.current / 6) % 2;
        dinoMatrix = duckStep === 0 ? DINO_DUCK_1 : DINO_DUCK_2;
      } else if (isJumpingRef.current) {
        // Jump pose
        dinoMatrix = DINO_STAND;
      } else if (gameStateRef.current === 'PLAYING') {
        // Running cycle
        const runStep = Math.floor(frameCountRef.current / 6) % 2;
        dinoMatrix = runStep === 0 ? DINO_RUN_1 : DINO_RUN_2;
      }

      drawPixelSprite(ctx, dinoMatrix, dinoX, dinoCurrentY, pixelScale, dinoColor, '#ff0055');

      // 8. Draw Retro Digital Score (Top Right)
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

      // 9. Overlay Banner for Idle / Game Over
      if (gameStateRef.current === 'IDLE') {
        ctx.fillStyle = currentTheme === 'cyber' ? '#00f0ff' : '#333333';
        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PRESS SPACE / TAP TO JUMP', width / 2, height / 2 - 15);
        ctx.font = '12px "Courier New", monospace';
        ctx.fillStyle = currentTheme === 'cyber' ? '#94a3b8' : '#757575';
        ctx.fillText('HINDARI RINTANGAN & CETAK REKOR TERTINGGI', width / 2, height / 2 + 10);
      } else if (gameStateRef.current === 'GAME_OVER') {
        ctx.fillStyle = currentTheme === 'cyber' ? '#ff007f' : '#d32f2f';
        ctx.font = 'bold 20px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('G A M E   O V E R', width / 2, height / 2 - 20);

        ctx.fillStyle = currentTheme === 'cyber' ? '#e2e8f0' : '#424242';
        ctx.font = 'bold 13px "Courier New", monospace';
        ctx.fillText('TEKAN SPACE / TOMBOL RESTART UNTUK MAIN LAGI', width / 2, height / 2 + 8);
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    animationFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

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
                Offline Chrome Mode
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              {language === 'id'
                ? 'Game piksel klasik lompat rintangan. Tekan Spacebar atau Tap layar untuk melompat!'
                : 'Classic endless pixel runner. Press Spacebar or Tap screen to jump!'}
            </p>
          </div>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-2">
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

          {/* High Score Badge */}
          <div className="px-3 py-1.5 rounded-xl bg-[#0f172a] border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>HI: {highScore.toString().padStart(5, '0')}</span>
          </div>
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3">
            <div className="text-center">
              <span className="text-rose-400 font-mono font-bold text-xs uppercase tracking-widest block mb-1">
                Kena Rintangan!
              </span>
              <span className="text-slate-100 font-mono text-2xl font-black">
                Skor Anda: {score.toString().padStart(5, '0')}
              </span>
            </div>
            <button
              onClick={startGame}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-105 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>MAIN LAGI (SPACE)</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile-Friendly Tactile Controls & Keyboard Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        {/* Desktop Keyboard Hints */}
        <div className="p-3.5 rounded-xl bg-[#090d26] border border-slate-800/80 flex items-center gap-3 text-xs text-slate-300">
          <div className="flex gap-1">
            <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-cyan-300">SPACE</kbd>
            <kbd className="px-1.5 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-cyan-300">&uarr;</kbd>
          </div>
          <div>
            <span className="font-bold text-slate-200">Lompat:</span>
            <span className="text-slate-400 ml-1">Lewati kaktus & burung rendah</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#090d26] border border-slate-800/80 flex items-center gap-3 text-xs text-slate-300">
          <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-pink-300">&darr;</kbd>
          <div>
            <span className="font-bold text-slate-200">Merunduk (Duck):</span>
            <span className="text-slate-400 ml-1">Hindari pterodactyl melayang tinggi</span>
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
            <span>LOMPAT (JUMP)</span>
          </button>
        </div>
      </div>

      {/* Fun Easter Egg Banner */}
      <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/30 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>
            {language === 'id'
              ? 'Easter Egg: Ketik `dino` di Interactive Terminal (tombol ~) kapan saja untuk langsung membuka arena ini!'
              : 'Easter Egg: Type `dino` in the Interactive Terminal (~ key) anytime to launch this arcade arena!'}
          </span>
        </div>
        <button
          onClick={() => {
            if (highScore > 0) {
              setHighScore(0);
              localStorage.removeItem('rafli_pixel_dino_highscore');
            }
          }}
          className="text-[11px] text-slate-500 hover:text-slate-300 font-mono underline ml-2 shrink-0 cursor-pointer"
        >
          Reset Rekor
        </button>
      </div>
    </div>
  );
};

export default PixelDinoRunner;

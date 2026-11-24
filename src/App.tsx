import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Crosshair, FastForward } from 'lucide-react';
import { HudBar } from './components/HudBar';
import { Overlays } from './components/Overlays';
import { SuperPangEngine } from './game/engine';
import { LEVELS } from './game/levels';
import { HudSnapshot } from './game/types';

const INITIAL_HUD: HudSnapshot = {
  state: 'START',
  score: 0,
  highScore: 0,
  newRecordReached: false,
  levelIndex: 0,
  levelId: 1,
  totalLevels: LEVELS.length,
  stageName: LEVELS[0].name,
  stageCountry: LEVELS[0].country,
  stageFlag: LEVELS[0].flag,
  isSpace: false,
  ostTitle: 'Koto no Sakura — Monte Fuji',
  lives: 3,
  timeRemaining: LEVELS[0].timeLimit,
  timeLimit: LEVELS[0].timeLimit,
  doubleTimer: 0,
  stickyTimer: 0,
  hasShield: false,
  freezeTimer: 0,
  comboCount: 0,
  stageTimeBonus: 0,
  victoryLivesBonus: 0,
  gameOverReason: '',
  musicEnabled: true,
  sfxMuted: false
};

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<SuperPangEngine | null>(null);

  const [hud, setHud] = useState<HudSnapshot>(INITIAL_HUD);
  const [showStageSelect, setShowStageSelect] = useState(false);

  // Mount isolated 60fps Canvas Engine once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new SuperPangEngine(canvas, (snapshot) => {
      setHud(snapshot);
    });
    engineRef.current = engine;
    engine.startLoop();

    const onResize = () => engine.resize();
    const onBlur = () => engine.clearInputs();

    window.addEventListener('resize', onResize);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('blur', onBlur);
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  // Keyboard Controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const eng = engineRef.current;
      if (!eng) return;

      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', ' ', 'Spacebar'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        eng.setLeft(true);
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        eng.setRight(true);
      }

      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === 'Enter') {
        if (!e.repeat) {
          if (showStageSelect) return;
          if (eng.getState() === 'START') {
            eng.startAtLevel(0);
          } else if (e.key !== 'Enter') {
            eng.triggerFire();
          } else if (eng.getState() === 'STAGE_CLEAR') {
            eng.advanceToNextStage();
          } else if (eng.getState() === 'MAP_TRAVEL') {
            eng.skipMapTravel();
          }
        }
      }

      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        if (showStageSelect) {
          setShowStageSelect(false);
        } else if (eng.getState() === 'PLAYING' || eng.getState() === 'PAUSED') {
          eng.togglePause();
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const eng = engineRef.current;
      if (!eng) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') eng.setLeft(false);
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') eng.setRight(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [showStageSelect]);

  const handleOpenStages = () => {
    engineRef.current?.pauseForModal();
    setShowStageSelect(true);
  };

  const handleCloseStages = () => {
    setShowStageSelect(false);
  };

  const handleSelectStage = (idx: number) => {
    setShowStageSelect(false);
    engineRef.current?.startAtLevel(idx);
  };

  return (
    <div className="w-screen h-[100dvh] flex items-center justify-center p-2 sm:p-3 overflow-hidden">
      <div className="w-full max-w-[1160px] h-full flex flex-col gap-2">
        {/* Top World-Matched Arcade HUD Bar */}
        <HudBar
          hud={hud}
          onOpenStages={handleOpenStages}
          onToggleMusic={() => engineRef.current?.toggleMusic()}
          onToggleMute={() => engineRef.current?.toggleMute()}
          onTogglePause={() => engineRef.current?.togglePause()}
        />

        {/* Isolated 16:9 Playfield Viewport */}
        <main className="relative flex-1 min-h-0 w-full flex items-center justify-center rounded-2xl bg-[#050811] border-2 border-[#2a3b68] shadow-[0_18px_48px_rgba(0,0,0,0.75)] overflow-hidden">
          <canvas
            ref={canvasRef}
            className="block max-w-full max-h-full aspect-video rounded-xl touch-none"
          />

          {/* Skip Map Cutscene Action */}
          {hud.state === 'MAP_TRAVEL' && !showStageSelect && (
            <button
              type="button"
              onClick={() => engineRef.current?.skipMapTravel()}
              className="absolute right-4 bottom-4 z-20 font-arcade text-[10px] px-4 py-2.5 rounded-xl border-2 border-amber-300 bg-[#0d1428]/92 text-amber-300 hover:bg-[#182342] inline-flex items-center gap-2 shadow-lg cursor-pointer"
            >
              PULAR VIAGEM <FastForward className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Modals & Title Screen Overlay */}
          <Overlays
            hud={hud}
            showStageSelect={showStageSelect}
            onPlayStart={() => engineRef.current?.startAtLevel(0)}
            onOpenStages={handleOpenStages}
            onCloseStages={handleCloseStages}
            onSelectStage={handleSelectStage}
            onPreviewOst={(idx) => engineRef.current?.previewStageTheme(idx)}
            onResume={() => engineRef.current?.togglePause()}
            onRestartStage={() => engineRef.current?.retryCurrentStage()}
            onRestartFromBeginning={() => engineRef.current?.startAtLevel(0)}
            onNextStage={() => engineRef.current?.advanceToNextStage()}
          />
        </main>

        {/* Compact Touch & Desktop Controls Bar */}
        <footer className="flex items-center justify-between gap-3 px-1 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Mover para esquerda"
              onPointerDown={(e) => {
                e.preventDefault();
                engineRef.current?.setLeft(true);
              }}
              onPointerUp={() => engineRef.current?.setLeft(false)}
              onPointerLeave={() => engineRef.current?.setLeft(false)}
              onPointerCancel={() => engineRef.current?.setLeft(false)}
              className="min-w-[62px] h-11 px-4 rounded-xl border border-[#35477a] bg-[#162140] active:bg-cyan-500/30 active:border-cyan-400 text-slate-100 flex items-center justify-center shadow-[0_3px_0_#0a1021] active:translate-y-0.5 touch-none cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Mover para direita"
              onPointerDown={(e) => {
                e.preventDefault();
                engineRef.current?.setRight(true);
              }}
              onPointerUp={() => engineRef.current?.setRight(false)}
              onPointerLeave={() => engineRef.current?.setRight(false)}
              onPointerCancel={() => engineRef.current?.setRight(false)}
              className="min-w-[62px] h-11 px-4 rounded-xl border border-[#35477a] bg-[#162140] active:bg-cyan-500/30 active:border-cyan-400 text-slate-100 flex items-center justify-center shadow-[0_3px_0_#0a1021] active:translate-y-0.5 touch-none cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span>A / D ou ← → Mover</span>
            <span className="text-slate-600">·</span>
            <span>Espaço / W / ↑ Atirar</span>
            <span className="text-slate-600">·</span>
            <span>P Pausar</span>
            {hud.state === 'PLAYING' && hud.ostTitle && (
              <>
                <span className="text-slate-600">·</span>
                <span className="text-cyan-300/90 font-semibold truncate max-w-[260px]">
                  ♪ {hud.ostTitle}
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label="Disparar arpão"
            onPointerDown={(e) => {
              e.preventDefault();
              engineRef.current?.triggerFire();
            }}
            className="min-w-[120px] h-11 px-5 rounded-xl border border-rose-400/80 bg-gradient-to-b from-rose-500 to-rose-700 active:from-rose-400 active:to-rose-600 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_3px_0_#6e0d20] active:translate-y-0.5 touch-none cursor-pointer"
          >
            <Crosshair className="w-4 h-4" /> ATIRAR
          </button>
        </footer>
      </div>
    </div>
  );
}

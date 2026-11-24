export type GameState =
  | 'START'
  | 'PLAYING'
  | 'PAUSED'
  | 'STAGE_CLEAR'
  | 'MAP_TRAVEL'
  | 'GAME_OVER'
  | 'VICTORY';

export type PowerupType =
  | 'double'
  | 'sticky'
  | 'shield'
  | 'freeze'
  | 'dynamite'
  | 'extralife';

export type ThemeId =
  | 'fuji'
  | 'pyramids'
  | 'neon'
  | 'alps'
  | 'caribbean'
  | 'temple'
  | 'rio'
  | 'saopaulo'
  | 'buenosaires'
  | 'machupicchu'
  | 'habana'
  | 'vegas'
  | 'nyc'
  | 'madrid'
  | 'london'
  | 'rome'
  | 'moscow'
  | 'delhi'
  | 'bangkok'
  | 'beijing'
  | 'sydney'
  | 'honolulu'
  | 'moon'
  | 'mars';

export type RegionGroup =
  | 'Ásia & Pacífico'
  | 'Américas'
  | 'Europa & África'
  | 'Espaço';

export interface BubbleConfig {
  x: number;
  y: number;
  size: 0 | 1 | 2 | 3;
  dir: 1 | -1;
}

export interface BlockConfig {
  x: number;
  y: number;
  w: number;
  h: number;
  destructible: boolean;
}

export interface LevelDef {
  id: number;
  name: string;
  country: string;
  region: RegionGroup;
  flag: string;
  theme: ThemeId;
  mapX: number;
  mapY: number;
  spaceStage?: boolean;
  gravityScale: number;
  timeLimit: number;
  palette: [string, string, string, string];
  swatch: [string, string];
  bubbles: BubbleConfig[];
  blocks: BlockConfig[];
}

export interface ScarfNode {
  x: number;
  y: number;
}

export interface Player {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  facing: 1 | -1;
  prevMoveDir: number;
  vx: number;
  tilt: number;
  walkCycle: number;
  shootAnim: number;
  recoil: number;
  muzzleFlash: number;
  blinkTimer: number;
  isBlinking: boolean;
  goggleGlint: number;
  invulnTimer: number;
  hasShield: boolean;
  doubleTimer: number;
  stickyTimer: number;
  scarfNodes: ScarfNode[];
}

export interface Bubble {
  x: number;
  y: number;
  size: 0 | 1 | 2 | 3;
  r: number;
  vx: number;
  vy: number;
  scaleX: number;
  scaleY: number;
  rotAngle: number;
  wobble: number;
  flashTimer: number;
}

export interface Harpoon {
  x: number;
  topY: number;
  bottomY: number;
  speed: number;
  sticky: boolean;
  latched: boolean;
  latchTimer: number;
  waveOffset: number;
  sparksTimer: number;
}

export interface Block {
  x: number;
  y: number;
  w: number;
  h: number;
  destructible: boolean;
}

export interface PowerupItem {
  x: number;
  y: number;
  vy: number;
  r: number;
  type: PowerupType;
  life: number;
  spin: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  life: number;
  maxLife: number;
  gravity?: number;
  glow?: boolean;
}

export interface Shard {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  vrot: number;
  color: string;
  border: string;
  life: number;
  maxLife: number;
}

export interface ShockRing {
  x: number;
  y: number;
  r: number;
  maxR: number;
  color: string;
  life: number;
  maxLife: number;
}

export interface ScorePopup {
  x: number;
  y: number;
  text: string;
  color: string;
  scale?: number;
  life: number;
  maxLife: number;
}

export interface TravelState {
  fromIndex: number;
  toIndex: number;
  progress: number;
  duration: number;
  isSpace: boolean;
  exhaust: Particle[];
}

export interface HudSnapshot {
  state: GameState;
  score: number;
  highScore: number;
  newRecordReached: boolean;
  levelIndex: number;
  levelId: number;
  totalLevels: number;
  stageName: string;
  stageCountry: string;
  stageFlag: string;
  isSpace: boolean;
  ostTitle: string;
  lives: number;
  timeRemaining: number;
  timeLimit: number;
  doubleTimer: number;
  stickyTimer: number;
  hasShield: boolean;
  freezeTimer: number;
  comboCount: number;
  stageTimeBonus: number;
  victoryLivesBonus: number;
  gameOverReason: string;
  musicEnabled: boolean;
  sfxMuted: boolean;
}

import { ThemeId } from './types';

export type OstTrackKey = ThemeId | 'travel' | 'title';

type InstrumentProfile =
  | 'koto'
  | 'oud'
  | 'synthwave'
  | 'accordion'
  | 'steelpan'
  | 'flute'
  | 'samba'
  | 'funk'
  | 'bandoneon'
  | 'panflute'
  | 'salsa'
  | 'swing'
  | 'jazzhop'
  | 'flamenco'
  | 'britrock'
  | 'mandolin'
  | 'balalaika'
  | 'sitar'
  | 'ranat'
  | 'guzheng'
  | 'surf'
  | 'ukulele'
  | 'spacepad'
  | 'bosssynth'
  | 'arcadebrass';

type DrumStyle =
  | 'taiko'
  | 'darbuka'
  | 'synth'
  | 'polka'
  | 'calypso'
  | 'samba'
  | 'groove'
  | 'tango'
  | 'huayno'
  | 'salsa'
  | 'swing'
  | 'flamenco'
  | 'rock'
  | 'tarantella'
  | 'space'
  | 'boss';

export interface OstTrackDef {
  title: string;
  bpm: number;
  instrument: InstrumentProfile;
  drumStyle: DrumStyle;
  /** 64 steps (4 bars of 16th notes) */
  melody: (string | 0)[];
  /** 64 steps (4 bars of 16th notes) */
  bass: (string | 0)[];
  /** 16 chord entries (1 per beat across 4 bars) */
  chords: (string[] | 0)[];
  /** Arpeggiate chords on 16th/8th notes vs sustained pad/stabs */
  arpMode: 'arp' | 'stab' | 'pad' | 'offbeat';
}

const NOTE_FREQ: Record<string, number> = {
  C2: 65.41, Cs2: 69.30, D2: 73.42, Eb2: 77.78, E2: 82.41, F2: 87.31, Fs2: 92.50, G2: 98.00, Ab2: 103.83, A2: 110.00, Bb2: 116.54, B2: 123.47,
  C3: 130.81, Cs3: 138.59, D3: 146.83, Eb3: 155.56, E3: 164.81, F3: 174.61, Fs3: 185.00, G3: 196.00, Ab3: 207.65, A3: 220.00, Bb3: 233.08, B3: 246.94,
  C4: 261.63, Cs4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.00, Ab4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
  C5: 523.25, Cs5: 554.37, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, Ab5: 830.61, A5: 880.00, Bb5: 932.33, B5: 987.77,
  C6: 1046.50, Cs6: 1108.73, D6: 1174.66, Eb6: 1244.51, E6: 1318.51, F6: 1396.91, G6: 1567.98
};

/** Helper to expand 4 bar strings into a 64-step sequence */
function seq(...bars: (string | 0)[][]): (string | 0)[] {
  return bars.flat();
}

export const OST_TRACKS: Record<OstTrackKey, OstTrackDef> = {
  title: {
    title: 'Abertura Mundial (Super Pang Theme)',
    bpm: 132,
    instrument: 'arcadebrass',
    drumStyle: 'rock',
    arpMode: 'arp',
    melody: seq(
      ['C5', 0, 'E5', 'G5', 'C6', 0, 'G5', 'E5', 'A5', 0, 'G5', 'F5', 'E5', 0, 'D5', 0],
      ['C5', 0, 'E5', 'G5', 'C6', 0, 'D6', 'C6', 'B5', 0, 'A5', 'G5', 'G5', 0, 0, 0],
      ['A5', 0, 'A5', 'B5', 'C6', 0, 'A5', 'F5', 'G5', 0, 'G5', 'A5', 'B5', 0, 'G5', 'E5'],
      ['F5', 0, 'A5', 'C6', 'B5', 0, 'G5', 'D5', 'E5', 'G5', 'C6', 0, 'C6', 0, 0, 0]
    ),
    bass: seq(
      ['C3', 0, 'C3', 'G2', 'C3', 0, 'E3', 0, 'F2', 0, 'F2', 'C3', 'G2', 0, 'B2', 0],
      ['C3', 0, 'C3', 'G2', 'A2', 0, 'E3', 0, 'G2', 0, 'D3', 'B2', 'G2', 'A2', 'B2', 0],
      ['F2', 0, 'F2', 'C3', 'F2', 0, 'A2', 0, 'E2', 0, 'E2', 'B2', 'E2', 0, 'G2', 0],
      ['D2', 0, 'A2', 'F2', 'G2', 0, 'D3', 'G2', 'C3', 0, 'G2', 0, 'C2', 0, 0, 0]
    ),
    chords: [
      ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4'], ['F4', 'A4', 'C5'], ['G4', 'B4', 'D5'],
      ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['G3', 'B3', 'D4'], ['G3', 'B3', 'D4'],
      ['F3', 'A3', 'C4'], ['F3', 'A3', 'C4'], ['E3', 'G3', 'B3'], ['E3', 'G3', 'B3'],
      ['D3', 'F3', 'A3'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4']
    ]
  },

  travel: {
    title: 'Voo Panorâmico (World Tour Map)',
    bpm: 136,
    instrument: 'arcadebrass',
    drumStyle: 'swing',
    arpMode: 'arp',
    melody: seq(
      ['G4', 'C5', 'E5', 'G5', 'C6', 0, 'B5', 'A5', 'G5', 0, 'E5', 'D5', 'C5', 0, 'E5', 0],
      ['F5', 0, 'A5', 'C6', 'B5', 0, 'G5', 'D5', 'E5', 'G5', 'B5', 'G5', 'C6', 0, 0, 0],
      ['A5', 0, 'C6', 'A5', 'G5', 0, 'E5', 'C5', 'D5', 'F5', 'A5', 'G5', 'F5', 0, 'D5', 0],
      ['E5', 'G5', 'C6', 'D6', 'E6', 0, 'D6', 'C6', 'B5', 0, 'G5', 'B5', 'C6', 0, 0, 0]
    ),
    bass: seq(
      ['C3', 0, 'G2', 0, 'E2', 0, 'G2', 0, 'C3', 0, 'G2', 0, 'A2', 0, 'G2', 0],
      ['F2', 0, 'C3', 0, 'G2', 0, 'D3', 0, 'E2', 0, 'B2', 0, 'C3', 0, 'G2', 0],
      ['F2', 0, 'C3', 0, 'E2', 0, 'C3', 0, 'D2', 0, 'A2', 0, 'G2', 0, 'D3', 0],
      ['C3', 0, 'E3', 0, 'A2', 0, 'E3', 0, 'G2', 0, 'D3', 0, 'C3', 0, 'G2', 0]
    ),
    chords: [
      ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'],
      ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['E3', 'G3', 'B3'], ['C4', 'E4', 'G4'],
      ['F3', 'A3', 'C4'], ['C4', 'E4', 'G4'], ['D3', 'F3', 'A3'], ['G3', 'B3', 'D4'],
      ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4']
    ]
  },

  fuji: {
    title: 'Koto no Sakura — Monte Fuji',
    bpm: 118,
    instrument: 'koto',
    drumStyle: 'taiko',
    arpMode: 'arp',
    melody: seq(
      ['D5', 0, 'Eb5', 'G5', 'A5', 0, 'G5', 'Eb5', 'D5', 0, 'C5', 'A4', 'G4', 'A4', 'C5', 'D5'],
      ['D5', 0, 'G5', 'A5', 'Bb5', 0, 'A5', 'G5', 'A5', 0, 'G5', 'Eb5', 'D5', 0, 0, 0],
      ['A5', 0, 'Bb5', 'D6', 'C6', 0, 'A5', 'G5', 'Eb5', 0, 'G5', 'A5', 'G5', 'Eb5', 'D5', 0],
      ['C5', 0, 'D5', 'Eb5', 'G5', 0, 'A5', 'G5', 'Eb5', 'D5', 'C5', 'A4', 'D5', 0, 0, 0]
    ),
    bass: seq(
      ['D2', 0, 0, 'A2', 'D2', 0, 'A2', 0, 'G2', 0, 0, 'D2', 'A2', 0, 'D2', 0],
      ['D2', 0, 0, 'A2', 'Bb2', 0, 'F2', 0, 'A2', 0, 'G2', 0, 'D2', 0, 'A2', 0],
      ['G2', 0, 'D3', 0, 'C3', 0, 'G2', 0, 'Eb2', 0, 'Bb2', 0, 'D2', 0, 'A2', 0],
      ['C2', 0, 'G2', 0, 'Eb2', 0, 'Bb2', 0, 'A2', 0, 'G2', 0, 'D2', 0, 0, 0]
    ),
    chords: [
      ['D4', 'G4', 'A4'], ['D4', 'G4', 'A4'], ['G3', 'Bb3', 'D4'], ['A3', 'D4', 'E4'],
      ['D4', 'G4', 'A4'], ['Bb3', 'D4', 'F4'], ['A3', 'C4', 'E4'], ['D4', 'G4', 'A4'],
      ['G3', 'C4', 'D4'], ['C4', 'Eb4', 'G4'], ['Eb3', 'G3', 'Bb3'], ['D4', 'G4', 'A4'],
      ['C4', 'Eb4', 'G4'], ['Eb3', 'G3', 'Bb3'], ['A3', 'C4', 'E4'], ['D4', 'A4', 'D5']
    ]
  },

  pyramids: {
    title: 'Dunas de Gizé — Hijaz do Nilo',
    bpm: 122,
    instrument: 'oud',
    drumStyle: 'darbuka',
    arpMode: 'arp',
    melody: seq(
      ['D5', 'Eb5', 'Fs5', 'G5', 'A5', 0, 'G5', 'Fs5', 'Eb5', 'D5', 'Eb5', 'Fs5', 'G5', 'Fs5', 'Eb5', 'D5'],
      ['A5', 0, 'Bb5', 'A5', 'G5', 'Fs5', 'Eb5', 'D5', 'Fs5', 'G5', 'A5', 'G5', 'Fs5', 0, 0, 0],
      ['D6', 0, 'C6', 'Bb5', 'A5', 0, 'G5', 'Fs5', 'G5', 'A5', 'Bb5', 'A5', 'G5', 'Fs5', 'Eb5', 'D5'],
      ['Eb5', 'Fs5', 'G5', 'A5', 'Fs5', 'Eb5', 'D5', 'C5', 'D5', 'Eb5', 'Fs5', 'G5', 'D5', 0, 0, 0]
    ),
    bass: seq(
      ['D2', 0, 'A2', 0, 'D2', 0, 'A2', 'D2', 'Eb2', 0, 'Bb2', 0, 'D2', 0, 'A2', 0],
      ['D2', 0, 'A2', 0, 'G2', 0, 'D2', 0, 'Eb2', 0, 'D2', 0, 'A2', 0, 'D2', 0],
      ['G2', 0, 'D3', 0, 'D2', 0, 'A2', 0, 'Eb2', 0, 'Bb2', 0, 'D2', 0, 'A2', 0],
      ['Eb2', 0, 'Bb2', 0, 'C2', 0, 'G2', 0, 'A2', 0, 'Eb2', 0, 'D2', 0, 'A2', 0]
    ),
    chords: [
      ['D4', 'Fs4', 'A4'], ['D4', 'Fs4', 'A4'], ['Eb4', 'G4', 'Bb4'], ['D4', 'Fs4', 'A4'],
      ['D4', 'Fs4', 'A4'], ['G3', 'Bb3', 'D4'], ['Eb4', 'G4', 'Bb4'], ['D4', 'Fs4', 'A4'],
      ['G3', 'Bb3', 'D4'], ['D4', 'Fs4', 'A4'], ['Eb4', 'G4', 'Bb4'], ['D4', 'Fs4', 'A4'],
      ['Eb4', 'G4', 'Bb4'], ['C4', 'Eb4', 'G4'], ['D4', 'Fs4', 'A4'], ['D4', 'Fs4', 'A4']
    ]
  },

  neon: {
    title: 'Tokyo Outrun 1989 — Synthwave',
    bpm: 134,
    instrument: 'synthwave',
    drumStyle: 'synth',
    arpMode: 'arp',
    melody: seq(
      ['A4', 0, 'C5', 'E5', 'G5', 0, 'E5', 'D5', 'C5', 0, 'A4', 'G4', 'A4', 'C5', 'E5', 0],
      ['A5', 0, 'G5', 'E5', 'D5', 0, 'C5', 'B4', 'C5', 0, 'E5', 'G5', 'E5', 0, 0, 0],
      ['F5', 0, 'A5', 'C6', 'B5', 0, 'G5', 'E5', 'D5', 0, 'F5', 'A5', 'G5', 0, 'E5', 'D5'],
      ['C5', 0, 'E5', 'G5', 'A5', 0, 'G5', 'E5', 'D5', 'C5', 'B4', 'G4', 'A4', 0, 0, 0]
    ),
    bass: seq(
      ['A2', 'A2', 'A3', 'A2', 'A2', 'A2', 'G2', 'A2', 'F2', 'F2', 'F3', 'F2', 'G2', 'G2', 'G3', 'G2'],
      ['A2', 'A2', 'A3', 'A2', 'E2', 'E2', 'E3', 'E2', 'C2', 'C2', 'C3', 'C2', 'G2', 'G2', 'B2', 'G2'],
      ['F2', 'F2', 'F3', 'F2', 'G2', 'G2', 'G3', 'G2', 'D2', 'D2', 'D3', 'D2', 'E2', 'E2', 'E3', 'E2'],
      ['C2', 'C2', 'C3', 'C2', 'D2', 'D2', 'D3', 'D2', 'E2', 'E2', 'G2', 'E2', 'A2', 'A2', 'E2', 'A2']
    ),
    chords: [
      ['A3', 'C4', 'E4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'],
      ['A3', 'C4', 'E4'], ['E3', 'G3', 'B3'], ['C4', 'E4', 'G4'], ['G3', 'B3', 'D4'],
      ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['D3', 'F3', 'A3'], ['E3', 'G3', 'B3'],
      ['C4', 'E4', 'G4'], ['D3', 'F3', 'A3'], ['E3', 'G3', 'B3'], ['A3', 'C4', 'E4']
    ]
  },

  alps: {
    title: 'Valsa dos Alpes — Aurora Suíça',
    bpm: 128,
    instrument: 'accordion',
    drumStyle: 'polka',
    arpMode: 'offbeat',
    melody: seq(
      ['C5', 'E5', 'G5', 'C6', 'A5', 0, 'G5', 'E5', 'D5', 'F5', 'A5', 'G5', 'E5', 0, 'C5', 0],
      ['G5', 'C6', 'E6', 'D6', 'C6', 0, 'A5', 'G5', 'F5', 'E5', 'D5', 'B4', 'C5', 0, 0, 0],
      ['A5', 0, 'C6', 'A5', 'G5', 0, 'E5', 'C5', 'D5', 0, 'F5', 'A5', 'G5', 0, 'D5', 0],
      ['E5', 'G5', 'C6', 'A5', 'G5', 'E5', 'D5', 'F5', 'E5', 'D5', 'C5', 'B4', 'C5', 0, 0, 0]
    ),
    bass: seq(
      ['C3', 0, 'G2', 0, 'C3', 0, 'G2', 0, 'G2', 0, 'D3', 0, 'C3', 0, 'G2', 0],
      ['C3', 0, 'G2', 0, 'F2', 0, 'C3', 0, 'G2', 0, 'D3', 0, 'C3', 0, 'G2', 0],
      ['F2', 0, 'C3', 0, 'C3', 0, 'G2', 0, 'D2', 0, 'A2', 0, 'G2', 0, 'D3', 0],
      ['C3', 0, 'A2', 0, 'F2', 0, 'G2', 0, 'G2', 0, 'D3', 0, 'C3', 0, 'G2', 0]
    ),
    chords: [
      ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4'],
      ['C4', 'E4', 'G4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4'],
      ['F3', 'A3', 'C4'], ['C4', 'E4', 'G4'], ['D3', 'F3', 'A3'], ['G3', 'B3', 'D4'],
      ['C4', 'E4', 'G4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4']
    ]
  },

  caribbean: {
    title: 'Steelpan Calypso — Baía do Caribe',
    bpm: 124,
    instrument: 'steelpan',
    drumStyle: 'calypso',
    arpMode: 'offbeat',
    melody: seq(
      ['E5', 0, 'G5', 'E5', 0, 'C5', 'D5', 'E5', 'F5', 0, 'A5', 'G5', 0, 'E5', 'D5', 'C5'],
      ['G5', 0, 'A5', 'G5', 0, 'E5', 'G5', 'C6', 'B5', 0, 'A5', 'G5', 'G5', 0, 0, 0],
      ['A5', 0, 'C6', 'A5', 0, 'F5', 'A5', 'G5', 'E5', 0, 'G5', 'E5', 0, 'C5', 'E5', 'G5'],
      ['F5', 0, 'A5', 'G5', 'F5', 'E5', 'D5', 'G5', 'E5', 0, 'D5', 'C5', 'C5', 0, 0, 0]
    ),
    bass: seq(
      ['C3', 0, 0, 'G2', 0, 'C3', 0, 0, 'F2', 0, 0, 'C3', 0, 'G2', 0, 0],
      ['C3', 0, 0, 'E2', 0, 'G2', 0, 0, 'G2', 0, 0, 'D3', 0, 'G2', 0, 0],
      ['F2', 0, 0, 'C3', 0, 'F2', 0, 0, 'C3', 0, 0, 'G2', 0, 'C3', 0, 0],
      ['D2', 0, 0, 'F2', 0, 'G2', 0, 0, 'C3', 0, 0, 'G2', 'C3', 0, 0, 0]
    ),
    chords: [
      ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4'], ['F4', 'A4', 'C5'], ['G4', 'B4', 'D5'],
      ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4'], ['G4', 'B4', 'D5'], ['G4', 'B4', 'D5'],
      ['F4', 'A4', 'C5'], ['F4', 'A4', 'C5'], ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4'],
      ['D4', 'F4', 'A4'], ['G4', 'B4', 'D5'], ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4']
    ]
  },

  temple: {
    title: 'Sinos do Templo Dourado — Ásia',
    bpm: 112,
    instrument: 'flute',
    drumStyle: 'taiko',
    arpMode: 'pad',
    melody: seq(
      ['E5', 0, 'G5', 'A5', 'B5', 0, 'A5', 'G5', 'E5', 'D5', 'E5', 0, 'G5', 'E5', 'D5', 'B4'],
      ['E5', 0, 'A5', 'B5', 'D6', 0, 'B5', 'A5', 'G5', 0, 'A5', 'G5', 'E5', 0, 0, 0],
      ['B5', 0, 'D6', 'E6', 'D6', 0, 'B5', 'A5', 'G5', 'A5', 'B5', 0, 'A5', 'G5', 'E5', 0],
      ['D5', 0, 'E5', 'G5', 'A5', 0, 'G5', 'E5', 'D5', 'B4', 'D5', 'E5', 'E5', 0, 0, 0]
    ),
    bass: seq(
      ['E2', 0, 0, 'B2', 'E2', 0, 0, 0, 'A2', 0, 0, 'E2', 'B2', 0, 'E2', 0],
      ['E2', 0, 0, 'B2', 'G2', 0, 'D2', 0, 'A2', 0, 'B2', 0, 'E2', 0, 0, 0],
      ['G2', 0, 0, 'D3', 'B2', 0, 0, 0, 'C3', 0, 'G2', 0, 'B2', 0, 'E2', 0],
      ['D2', 0, 0, 'A2', 'A2', 0, 'E2', 0, 'B2', 0, 'D2', 0, 'E2', 0, 0, 0]
    ),
    chords: [
      ['E3', 'G3', 'B3'], ['E3', 'G3', 'B3'], ['A3', 'D4', 'E4'], ['B3', 'E4', 'Fs4'],
      ['E3', 'G3', 'B3'], ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4'], ['E3', 'G3', 'B3'],
      ['G3', 'B3', 'D4'], ['B3', 'D4', 'Fs4'], ['C4', 'E4', 'G4'], ['B3', 'D4', 'Fs4'],
      ['D3', 'G3', 'A3'], ['A3', 'C4', 'E4'], ['B3', 'D4', 'Fs4'], ['E3', 'G3', 'B3']
    ]
  },

  rio: {
    title: 'Samba de Copacabana — Rio de Janeiro',
    bpm: 132,
    instrument: 'samba',
    drumStyle: 'samba',
    arpMode: 'offbeat',
    melody: seq(
      ['G5', 'A5', 'B5', 'D6', 0, 'C6', 'B5', 'A5', 'B5', 0, 'G5', 'E5', 'A5', 'B5', 'D6', 0],
      ['E6', 0, 'D6', 'B5', 0, 'A5', 'G5', 'E5', 'Fs5', 'A5', 'D6', 'C6', 'B5', 0, 0, 0],
      ['C6', 0, 'B5', 'A5', 0, 'G5', 'A5', 'B5', 'A5', 0, 'G5', 'Fs5', 'E5', 0, 'G5', 'A5'],
      ['B5', 0, 'D6', 'B5', 'A5', 'G5', 'Fs5', 'A5', 'G5', 0, 'D5', 'G5', 'G5', 0, 0, 0]
    ),
    bass: seq(
      ['G2', 0, 'D2', 0, 'G2', 0, 'D2', 'E2', 'C2', 0, 'G2', 0, 'D2', 0, 'G2', 0],
      ['E2', 0, 'B2', 0, 'A2', 0, 'E2', 0, 'D2', 0, 'A2', 0, 'G2', 0, 'D2', 0],
      ['C2', 0, 'G2', 0, 'B2', 0, 'E2', 0, 'A2', 0, 'E2', 0, 'D2', 0, 'A2', 0],
      ['G2', 0, 'E2', 0, 'A2', 0, 'D2', 0, 'G2', 0, 'D2', 0, 'G2', 0, 0, 0]
    ),
    chords: [
      ['G3', 'B3', 'D4', 'Fs4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4'], ['D4', 'Fs4', 'A4'],
      ['E3', 'G3', 'B3'], ['A3', 'C4', 'E4'], ['D4', 'Fs4', 'A4'], ['G3', 'B3', 'D4'],
      ['C4', 'E4', 'G4'], ['E3', 'G3', 'B3'], ['A3', 'C4', 'E4'], ['D4', 'Fs4', 'A4'],
      ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4'], ['D4', 'Fs4', 'A4'], ['G3', 'B3', 'D4']
    ]
  },

  saopaulo: {
    title: 'Paulista Night Groove — São Paulo',
    bpm: 126,
    instrument: 'funk',
    drumStyle: 'groove',
    arpMode: 'stab',
    melody: seq(
      ['E5', 0, 'G5', 'A5', 0, 'Bb5', 'A5', 'G5', 'E5', 0, 'D5', 'E5', 'G5', 0, 'B5', 'A5'],
      ['E5', 0, 'G5', 'A5', 'B5', 0, 'D6', 'B5', 'A5', 'G5', 'E5', 'D5', 'E5', 0, 0, 0],
      ['A5', 0, 'C6', 'A5', 'G5', 0, 'E5', 'D5', 'G5', 0, 'B5', 'A5', 'G5', 'E5', 'D5', 0],
      ['E5', 'G5', 'A5', 'Bb5', 'A5', 'G5', 'E5', 'D5', 'B4', 'D5', 'E5', 'G5', 'E5', 0, 0, 0]
    ),
    bass: seq(
      ['E2', 0, 'E2', 'G2', 0, 'A2', 0, 'G2', 'E2', 0, 'D2', 'E2', 'G2', 0, 'B2', 'A2'],
      ['E2', 0, 'E3', 'D3', 'B2', 0, 'A2', 'G2', 'A2', 0, 'B2', 'D3', 'E2', 0, 'B2', 0],
      ['A2', 0, 'A2', 'C3', 'G2', 0, 'G2', 'B2', 'D2', 0, 'D2', 'G2', 'B2', 0, 'A2', 0],
      ['C2', 0, 'C3', 'B2', 'A2', 0, 'G2', 'Fs2', 'E2', 0, 'G2', 'B2', 'E2', 0, 0, 0]
    ),
    chords: [
      ['E3', 'G3', 'B3', 'D4'], ['E3', 'G3', 'B3'], ['E3', 'G3', 'B3'], ['D3', 'G3', 'B3'],
      ['E3', 'G3', 'B3'], ['A3', 'C4', 'E4'], ['G3', 'B3', 'D4'], ['E3', 'G3', 'B3'],
      ['A3', 'C4', 'E4'], ['G3', 'B3', 'D4'], ['D3', 'Fs3', 'A3'], ['B3', 'D4', 'Fs4'],
      ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['B3', 'D4', 'Fs4'], ['E3', 'G3', 'B3']
    ]
  },

  buenosaires: {
    title: 'Tango de La Boca — Buenos Aires',
    bpm: 118,
    instrument: 'bandoneon',
    drumStyle: 'tango',
    arpMode: 'stab',
    melody: seq(
      ['E5', 0, 'C5', 'B4', 'A4', 0, 'Ab4', 'A4', 'F5', 0, 'D5', 'C5', 'B4', 0, 'Ab4', 'E4'],
      ['E5', 0, 'A5', 'G5', 'F5', 0, 'E5', 'D5', 'C5', 'B4', 'A4', 'Ab4', 'A4', 0, 0, 0],
      ['A5', 0, 'G5', 'F5', 'E5', 0, 'D5', 'C5', 'D5', 0, 'F5', 'E5', 'D5', 'C5', 'B4', 0],
      ['E5', 'Ab5', 'B5', 'A5', 'G5', 'F5', 'E5', 'D5', 'C5', 0, 'B4', 'Ab4', 'A4', 0, 0, 0]
    ),
    bass: seq(
      ['A2', 0, 0, 'E2', 'A2', 0, 'E2', 0, 'D2', 0, 0, 'A2', 'E2', 0, 'Ab2', 0],
      ['A2', 0, 0, 'E2', 'D2', 0, 'F2', 0, 'E2', 0, 'Ab2', 0, 'A2', 0, 'E2', 0],
      ['F2', 0, 0, 'C3', 'C3', 0, 'G2', 0, 'D2', 0, 0, 'A2', 'E2', 0, 'B2', 0],
      ['E2', 0, 'Ab2', 'B2', 'D2', 0, 'F2', 0, 'E2', 0, 'Ab2', 0, 'A2', 0, 0, 0]
    ),
    chords: [
      ['A3', 'C4', 'E4'], ['A3', 'C4', 'E4'], ['D3', 'F3', 'A3'], ['E3', 'Ab3', 'B3'],
      ['A3', 'C4', 'E4'], ['D3', 'F3', 'A3'], ['E3', 'Ab3', 'B3'], ['A3', 'C4', 'E4'],
      ['F3', 'A3', 'C4'], ['C4', 'E4', 'G4'], ['D3', 'F3', 'A3'], ['E3', 'Ab3', 'B3'],
      ['E3', 'Ab3', 'B3'], ['D3', 'F3', 'A3'], ['E3', 'Ab3', 'B3'], ['A3', 'C4', 'E4']
    ]
  },

  machupicchu: {
    title: 'Flauta dos Andes — Machu Picchu',
    bpm: 118,
    instrument: 'panflute',
    drumStyle: 'huayno',
    arpMode: 'arp',
    melody: seq(
      ['A4', 'C5', 'D5', 'E5', 'G5', 'E5', 'D5', 'C5', 'D5', 'E5', 'C5', 'A4', 'G4', 'A4', 'C5', 0],
      ['E5', 0, 'G5', 'A5', 'C6', 0, 'A5', 'G5', 'E5', 'D5', 'C5', 'D5', 'A4', 0, 0, 0],
      ['C6', 0, 'A5', 'G5', 'A5', 0, 'G5', 'E5', 'D5', 'E5', 'G5', 'E5', 'D5', 'C5', 'A4', 0],
      ['G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5', 'G5', 'E5', 'D5', 'C5', 'G4', 'A4', 0, 0, 0]
    ),
    bass: seq(
      ['A2', 0, 'E2', 'A2', 'C3', 0, 'G2', 'C3', 'G2', 0, 'D2', 'G2', 'A2', 0, 'E2', 'A2'],
      ['A2', 0, 'E2', 'A2', 'F2', 0, 'C3', 'F2', 'G2', 0, 'D2', 'G2', 'A2', 0, 'E2', 'A2'],
      ['C3', 0, 'G2', 'C3', 'F2', 0, 'C3', 'F2', 'G2', 0, 'D2', 'G2', 'A2', 0, 'E2', 'A2'],
      ['G2', 0, 'D2', 'G2', 'C3', 0, 'G2', 'C3', 'G2', 0, 'E2', 'G2', 'A2', 0, 'E2', 0]
    ),
    chords: [
      ['A3', 'C4', 'E4'], ['C4', 'E4', 'G4'], ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4'],
      ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4'],
      ['C4', 'E4', 'G4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4'],
      ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4'], ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4']
    ]
  },

  habana: {
    title: 'Son del Malecón — La Habana',
    bpm: 136,
    instrument: 'salsa',
    drumStyle: 'salsa',
    arpMode: 'offbeat',
    melody: seq(
      ['C5', 0, 'E5', 'G5', 0, 'A5', 'G5', 'E5', 'D5', 0, 'F5', 'A5', 0, 'G5', 'F5', 'D5'],
      ['E5', 0, 'G5', 'C6', 0, 'B5', 'A5', 'G5', 'F5', 0, 'D5', 'G5', 'E5', 0, 0, 0],
      ['A5', 0, 'C6', 'A5', 'G5', 0, 'E5', 'G5', 'F5', 0, 'A5', 'F5', 'D5', 0, 'G5', 0],
      ['E5', 'G5', 'C6', 0, 'A5', 'F5', 'D5', 'G5', 'E5', 0, 'G5', 'B5', 'C6', 0, 0, 0]
    ),
    bass: seq(
      ['C2', 0, 0, 'G2', 0, 0, 'C3', 0, 'F2', 0, 0, 'C3', 0, 0, 'G2', 0],
      ['C2', 0, 0, 'G2', 0, 0, 'A2', 0, 'D2', 0, 0, 'G2', 0, 0, 'C3', 0],
      ['F2', 0, 0, 'C3', 0, 0, 'E2', 0, 'D2', 0, 0, 'A2', 0, 0, 'G2', 0],
      ['C2', 0, 0, 'E2', 0, 0, 'F2', 0, 'G2', 0, 0, 'D3', 'C3', 0, 0, 0]
    ),
    chords: [
      ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4'], ['F4', 'A4', 'C5'], ['G4', 'B4', 'D5'],
      ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['D4', 'F4', 'A4'], ['G4', 'B4', 'D5'],
      ['F4', 'A4', 'C5'], ['C4', 'E4', 'G4'], ['D4', 'F4', 'A4'], ['G4', 'B4', 'D5'],
      ['C4', 'E4', 'G4'], ['F4', 'A4', 'C5'], ['G4', 'B4', 'D5'], ['C4', 'E4', 'G4']
    ]
  },

  vegas: {
    title: 'Strip Big Band — Las Vegas',
    bpm: 138,
    instrument: 'swing',
    drumStyle: 'swing',
    arpMode: 'stab',
    melody: seq(
      ['Bb4', 0, 'D5', 'F5', 'G5', 0, 'F5', 'D5', 'Eb5', 0, 'G5', 'Bb5', 'A5', 'G5', 'F5', 'D5'],
      ['Bb5', 0, 'A5', 'G5', 'F5', 0, 'D5', 'C5', 'D5', 'F5', 'Bb5', 'A5', 'G5', 0, 0, 0],
      ['Eb5', 0, 'G5', 'Bb5', 'C6', 0, 'Bb5', 'G5', 'F5', 0, 'A5', 'C6', 'Bb5', 0, 'F5', 'D5'],
      ['C5', 'Eb5', 'G5', 'Bb5', 'A5', 'G5', 'F5', 'Eb5', 'D5', 0, 'F5', 'A5', 'Bb5', 0, 0, 0]
    ),
    bass: seq(
      ['Bb2', 0, 'D3', 0, 'F3', 0, 'G3', 0, 'Eb3', 0, 'G3', 0, 'F3', 0, 'D3', 0],
      ['Bb2', 0, 'D3', 0, 'G2', 0, 'B2', 0, 'C3', 0, 'Eb3', 0, 'F3', 0, 'A2', 0],
      ['Eb3', 0, 'G3', 0, 'C3', 0, 'E3', 0, 'F3', 0, 'A3', 0, 'Bb2', 0, 'D3', 0],
      ['C3', 0, 'Eb3', 0, 'F2', 0, 'A2', 0, 'Bb2', 0, 'F2', 0, 'Bb2', 0, 0, 0]
    ),
    chords: [
      ['Bb3', 'D4', 'F4'], ['G3', 'Bb3', 'D4'], ['Eb4', 'G4', 'Bb4'], ['F3', 'A3', 'C4'],
      ['Bb3', 'D4', 'F4'], ['G3', 'B3', 'D4'], ['C4', 'Eb4', 'G4'], ['F3', 'A3', 'C4'],
      ['Eb4', 'G4', 'Bb4'], ['C4', 'E4', 'G4'], ['F3', 'A3', 'C4'], ['Bb3', 'D4', 'F4'],
      ['C4', 'Eb4', 'G4'], ['F3', 'A3', 'C4'], ['Bb3', 'D4', 'F4'], ['Bb3', 'D4', 'F4']
    ]
  },

  nyc: {
    title: 'Manhattan Midnight — Nova Iorque',
    bpm: 116,
    instrument: 'jazzhop',
    drumStyle: 'groove',
    arpMode: 'pad',
    melody: seq(
      ['D5', 0, 'F5', 'A5', 'C6', 0, 'A5', 'G5', 'F5', 0, 'E5', 'D5', 'C5', 'D5', 'F5', 0],
      ['A5', 0, 'C6', 'D6', 'C6', 0, 'A5', 'G5', 'F5', 'G5', 'A5', 'G5', 'E5', 0, 0, 0],
      ['Bb5', 0, 'A5', 'G5', 'F5', 0, 'D5', 'F5', 'G5', 0, 'A5', 'G5', 'E5', 0, 'C5', 'E5'],
      ['F5', 0, 'A5', 'C6', 'Bb5', 0, 'G5', 'E5', 'D5', 0, 'F5', 'E5', 'D5', 0, 0, 0]
    ),
    bass: seq(
      ['D2', 0, 0, 'A2', 'C3', 0, 'A2', 0, 'Bb2', 0, 0, 'F2', 'A2', 0, 'C3', 0],
      ['D2', 0, 0, 'A2', 'G2', 0, 'D3', 0, 'Bb2', 0, 0, 'F2', 'A2', 0, 'E2', 0],
      ['Bb2', 0, 0, 'F2', 'A2', 0, 'E2', 0, 'G2', 0, 0, 'D2', 'A2', 0, 'E2', 0],
      ['Bb2', 0, 'F2', 0, 'G2', 0, 'A2', 0, 'D2', 0, 0, 'A2', 'D2', 0, 0, 0]
    ),
    chords: [
      ['D3', 'F3', 'A3', 'C4'], ['D3', 'F3', 'A3', 'C4'], ['Bb3', 'D4', 'F4'], ['A3', 'C4', 'E4'],
      ['D3', 'F3', 'A3', 'C4'], ['G3', 'Bb3', 'D4'], ['Bb3', 'D4', 'F4'], ['A3', 'Cs4', 'E4'],
      ['Bb3', 'D4', 'F4'], ['A3', 'C4', 'E4'], ['G3', 'Bb3', 'D4'], ['A3', 'Cs4', 'E4'],
      ['Bb3', 'D4', 'F4'], ['G3', 'Bb3', 'D4'], ['A3', 'Cs4', 'E4'], ['D3', 'F3', 'A3']
    ]
  },

  madrid: {
    title: 'Pasodoble de Alcalá — Madri',
    bpm: 136,
    instrument: 'flamenco',
    drumStyle: 'flamenco',
    arpMode: 'arp',
    melody: seq(
      ['E5', 'F5', 'Ab5', 'A5', 'B5', 'A5', 'Ab5', 'F5', 'E5', 'D5', 'C5', 'B4', 'C5', 'D5', 'F5', 'E5'],
      ['B5', 0, 'C6', 'B5', 'A5', 'Ab5', 'F5', 'E5', 'F5', 'Ab5', 'A5', 'F5', 'E5', 0, 0, 0],
      ['A5', 0, 'B5', 'C6', 'B5', 0, 'A5', 'G5', 'F5', 0, 'G5', 'A5', 'G5', 'F5', 'E5', 0],
      ['F5', 'Ab5', 'B5', 'A5', 'Ab5', 'F5', 'E5', 'D5', 'C5', 'B4', 'E5', 'Ab5', 'E5', 0, 0, 0]
    ),
    bass: seq(
      ['E2', 'E2', 'B2', 0, 'F2', 'F2', 'C3', 0, 'G2', 'G2', 'D3', 0, 'F2', 'E2', 'B2', 'E2'],
      ['E2', 'E2', 'B2', 0, 'A2', 'A2', 'E2', 0, 'F2', 'F2', 'C3', 0, 'E2', 0, 'B2', 0],
      ['A2', 'A2', 'E2', 0, 'G2', 'G2', 'D2', 0, 'F2', 'F2', 'C3', 0, 'E2', 'E2', 'B2', 0],
      ['F2', 'F2', 'C3', 0, 'D2', 'D2', 'A2', 0, 'F2', 0, 'E2', 0, 'E2', 0, 0, 0]
    ),
    chords: [
      ['E3', 'Ab3', 'B3'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['E3', 'Ab3', 'B3'],
      ['E3', 'Ab3', 'B3'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['E3', 'Ab3', 'B3'],
      ['A3', 'C4', 'E4'], ['G3', 'B3', 'D4'], ['F3', 'A3', 'C4'], ['E3', 'Ab3', 'B3'],
      ['F3', 'A3', 'C4'], ['D3', 'F3', 'A3'], ['F3', 'A3', 'C4'], ['E3', 'Ab3', 'B3']
    ]
  },

  london: {
    title: 'Thames Brit-Rock — Londres',
    bpm: 138,
    instrument: 'britrock',
    drumStyle: 'rock',
    arpMode: 'stab',
    melody: seq(
      ['E5', 'E5', 'G5', 'A5', 'B5', 0, 'A5', 'G5', 'D5', 'D5', 'Fs5', 'A5', 'B5', 'A5', 'G5', 'Fs5'],
      ['E5', 0, 'B5', 'A5', 'G5', 0, 'Fs5', 'E5', 'G5', 'A5', 'B5', 'D6', 'B5', 0, 0, 0],
      ['C6', 0, 'B5', 'A5', 'G5', 0, 'E5', 'G5', 'A5', 0, 'B5', 'A5', 'Fs5', 0, 'D5', 0],
      ['E5', 'G5', 'B5', 'E6', 'D6', 'B5', 'A5', 'G5', 'Fs5', 'G5', 'A5', 'Fs5', 'E5', 0, 0, 0]
    ),
    bass: seq(
      ['E2', 'E2', 'E2', 'E2', 'G2', 'G2', 'G2', 'G2', 'D2', 'D2', 'D2', 'D2', 'A2', 'A2', 'B2', 'B2'],
      ['E2', 'E2', 'E2', 'E2', 'C2', 'C2', 'C2', 'C2', 'G2', 'G2', 'G2', 'G2', 'B2', 'B2', 'A2', 'Fs2'],
      ['C2', 'C2', 'C3', 'C2', 'G2', 'G2', 'G2', 'G2', 'A2', 'A2', 'A2', 'A2', 'D2', 'D2', 'D2', 'D2'],
      ['E2', 'E2', 'G2', 'E2', 'C2', 'C2', 'D2', 'D2', 'B2', 'B2', 'D2', 'B2', 'E2', 0, 0, 0]
    ),
    chords: [
      ['E3', 'G3', 'B3'], ['G3', 'B3', 'D4'], ['D3', 'Fs3', 'A3'], ['A3', 'C4', 'E4'],
      ['E3', 'G3', 'B3'], ['C4', 'E4', 'G4'], ['G3', 'B3', 'D4'], ['B3', 'D4', 'Fs4'],
      ['C4', 'E4', 'G4'], ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4'], ['D3', 'Fs3', 'A3'],
      ['E3', 'G3', 'B3'], ['C4', 'E4', 'G4'], ['B3', 'D4', 'Fs4'], ['E3', 'G3', 'B3']
    ]
  },

  rome: {
    title: 'Tarantella Romana — Roma',
    bpm: 146,
    instrument: 'mandolin',
    drumStyle: 'tarantella',
    arpMode: 'arp',
    melody: seq(
      ['A4', 'C5', 'E5', 'A5', 'G5', 'F5', 'E5', 'D5', 'C5', 'B4', 'A4', 'Ab4', 'A4', 'C5', 'E5', 0],
      ['A5', 'B5', 'C6', 'A5', 'G5', 'F5', 'E5', 'D5', 'E5', 'F5', 'E5', 'D5', 'C5', 'B4', 'A4', 0],
      ['F5', 'A5', 'C6', 'A5', 'E5', 'A5', 'C6', 'A5', 'D5', 'F5', 'A5', 'F5', 'E5', 'Ab5', 'B5', 0],
      ['C6', 'B5', 'A5', 'G5', 'F5', 'E5', 'D5', 'C5', 'B4', 'E5', 'Ab5', 'B5', 'A5', 0, 0, 0]
    ),
    bass: seq(
      ['A2', 0, 'E2', 0, 'D2', 0, 'A2', 0, 'E2', 0, 'Ab2', 0, 'A2', 0, 'E2', 0],
      ['A2', 0, 'E2', 0, 'D2', 0, 'A2', 0, 'E2', 0, 'B2', 0, 'A2', 0, 'E2', 0],
      ['F2', 0, 'C3', 0, 'A2', 0, 'E2', 0, 'D2', 0, 'A2', 0, 'E2', 0, 'Ab2', 0],
      ['A2', 0, 'G2', 0, 'F2', 0, 'D2', 0, 'E2', 0, 'Ab2', 0, 'A2', 0, 'E2', 0]
    ),
    chords: [
      ['A3', 'C4', 'E4'], ['D3', 'F3', 'A3'], ['E3', 'Ab3', 'B3'], ['A3', 'C4', 'E4'],
      ['A3', 'C4', 'E4'], ['D3', 'F3', 'A3'], ['E3', 'Ab3', 'B3'], ['A3', 'C4', 'E4'],
      ['F3', 'A3', 'C4'], ['A3', 'C4', 'E4'], ['D3', 'F3', 'A3'], ['E3', 'Ab3', 'B3'],
      ['A3', 'C4', 'E4'], ['D3', 'F3', 'A3'], ['E3', 'Ab3', 'B3'], ['A3', 'C4', 'E4']
    ]
  },

  moscow: {
    title: 'Balalaika na Neve — Moscou',
    bpm: 140,
    instrument: 'balalaika',
    drumStyle: 'polka',
    arpMode: 'offbeat',
    melody: seq(
      ['E5', 0, 'B4', 'C5', 'D5', 0, 'C5', 'B4', 'A4', 0, 'A4', 'C5', 'E5', 0, 'D5', 'C5'],
      ['B4', 0, 'C5', 'D5', 'E5', 0, 'C5', 0, 'A4', 0, 'A4', 0, 'E5', 0, 0, 0],
      ['D5', 0, 'F5', 'A5', 'G5', 0, 'F5', 'E5', 'C5', 0, 'E5', 'D5', 'C5', 0, 'B4', 0],
      ['B4', 'C5', 'D5', 'E5', 'C5', 0, 'A4', 'C5', 'B4', 0, 'Ab4', 'B4', 'A4', 0, 0, 0]
    ),
    bass: seq(
      ['E2', 0, 'B2', 0, 'Ab2', 0, 'E2', 0, 'A2', 0, 'E2', 0, 'A2', 0, 'E2', 0],
      ['E2', 0, 'Ab2', 0, 'A2', 0, 'E2', 0, 'A2', 0, 'E2', 0, 'A2', 0, 'E2', 0],
      ['D2', 0, 'A2', 0, 'D2', 0, 'A2', 0, 'A2', 0, 'E2', 0, 'E2', 0, 'Ab2', 0],
      ['E2', 0, 'Ab2', 0, 'A2', 0, 'E2', 0, 'E2', 0, 'Ab2', 0, 'A2', 0, 'E2', 0]
    ),
    chords: [
      ['E3', 'Ab3', 'B3'], ['E3', 'Ab3', 'B3'], ['A3', 'C4', 'E4'], ['A3', 'C4', 'E4'],
      ['E3', 'Ab3', 'B3'], ['A3', 'C4', 'E4'], ['A3', 'C4', 'E4'], ['A3', 'C4', 'E4'],
      ['D3', 'F3', 'A3'], ['D3', 'F3', 'A3'], ['A3', 'C4', 'E4'], ['E3', 'Ab3', 'B3'],
      ['E3', 'Ab3', 'B3'], ['A3', 'C4', 'E4'], ['E3', 'Ab3', 'B3'], ['A3', 'C4', 'E4']
    ]
  },

  delhi: {
    title: 'Raga de Nova Délhi — Sitar & Tabla',
    bpm: 126,
    instrument: 'sitar',
    drumStyle: 'darbuka',
    arpMode: 'arp',
    melody: seq(
      ['C5', 'Cs5', 'E5', 'F5', 'G5', 'Ab5', 'G5', 'F5', 'E5', 'Cs5', 'C5', 'E5', 'G5', 'F5', 'E5', 'C5'],
      ['G5', 0, 'Ab5', 'B5', 'C6', 0, 'B5', 'Ab5', 'G5', 'F5', 'E5', 'Cs5', 'C5', 0, 0, 0],
      ['C6', 'B5', 'Ab5', 'G5', 'F5', 'G5', 'Ab5', 'G5', 'F5', 'E5', 'Cs5', 'E5', 'G5', 'F5', 'E5', 0],
      ['Cs5', 'E5', 'G5', 'Ab5', 'G5', 'F5', 'E5', 'Cs5', 'C5', 'E5', 'G5', 'E5', 'C5', 0, 0, 0]
    ),
    bass: seq(
      ['C2', 0, 'G2', 0, 'C2', 0, 'G2', 0, 'C2', 0, 'G2', 0, 'C2', 0, 'G2', 'C2'],
      ['C2', 0, 'G2', 0, 'Ab2', 0, 'G2', 0, 'C2', 0, 'G2', 0, 'C2', 0, 'G2', 0],
      ['F2', 0, 'C3', 0, 'C2', 0, 'G2', 0, 'Cs2', 0, 'G2', 0, 'C2', 0, 'G2', 0],
      ['Cs2', 0, 'Ab2', 0, 'G2', 0, 'C2', 0, 'C2', 0, 'G2', 0, 'C2', 0, 0, 0]
    ),
    chords: [
      ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4'], ['Cs4', 'F4', 'Ab4'], ['C4', 'E4', 'G4'],
      ['C4', 'E4', 'G4'], ['Ab3', 'C4', 'E4'], ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4'],
      ['F3', 'Ab3', 'C4'], ['C4', 'E4', 'G4'], ['Cs4', 'E4', 'G4'], ['C4', 'E4', 'G4'],
      ['Cs4', 'F4', 'Ab4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4']
    ]
  },

  bangkok: {
    title: 'Lanternas do Chao Phraya — Bangcoc',
    bpm: 122,
    instrument: 'ranat',
    drumStyle: 'calypso',
    arpMode: 'arp',
    melody: seq(
      ['C5', 'D5', 'E5', 'G5', 'A5', 'G5', 'E5', 'D5', 'C5', 'E5', 'G5', 'A5', 'C6', 'A5', 'G5', 'E5'],
      ['D6', 0, 'C6', 'A5', 'G5', 0, 'A5', 'G5', 'E5', 'D5', 'C5', 'D5', 'E5', 0, 0, 0],
      ['A5', 'C6', 'D6', 'C6', 'A5', 'G5', 'E5', 'G5', 'A5', 'G5', 'E5', 'D5', 'C5', 'D5', 'E5', 'G5'],
      ['C6', 0, 'A5', 'G5', 'E5', 'G5', 'A5', 'G5', 'E5', 'D5', 'C5', 'G4', 'C5', 0, 0, 0]
    ),
    bass: seq(
      ['C3', 0, 'G2', 0, 'A2', 0, 'E2', 0, 'F2', 0, 'C3', 0, 'G2', 0, 'C3', 0],
      ['D2', 0, 'A2', 0, 'G2', 0, 'D3', 0, 'A2', 0, 'E2', 0, 'C3', 0, 'G2', 0],
      ['F2', 0, 'C3', 0, 'C3', 0, 'G2', 0, 'D2', 0, 'A2', 0, 'G2', 0, 'C3', 0],
      ['A2', 0, 'E2', 0, 'F2', 0, 'G2', 0, 'G2', 0, 'D2', 0, 'C3', 0, 0, 0]
    ),
    chords: [
      ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'C4', 'D4'],
      ['D3', 'G3', 'A3'], ['G3', 'C4', 'D4'], ['A3', 'C4', 'E4'], ['C4', 'E4', 'G4'],
      ['F3', 'A3', 'C4'], ['C4', 'E4', 'G4'], ['D3', 'G3', 'A3'], ['G3', 'C4', 'D4'],
      ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'C4', 'D4'], ['C4', 'E4', 'G4']
    ]
  },

  beijing: {
    title: 'Dragão Imperial — Beijing',
    bpm: 130,
    instrument: 'guzheng',
    drumStyle: 'taiko',
    arpMode: 'arp',
    melody: seq(
      ['G4', 'A4', 'C5', 'D5', 'E5', 0, 'D5', 'C5', 'A4', 'C5', 'D5', 'E5', 'G5', 'E5', 'D5', 'C5'],
      ['A5', 0, 'G5', 'E5', 'D5', 0, 'E5', 'G5', 'A5', 'G5', 'E5', 'D5', 'C5', 0, 0, 0],
      ['E5', 'G5', 'A5', 'C6', 'A5', 0, 'G5', 'E5', 'D5', 'E5', 'G5', 'E5', 'D5', 'C5', 'A4', 0],
      ['C5', 'D5', 'E5', 'G5', 'A5', 'G5', 'E5', 'D5', 'E5', 'D5', 'C5', 'A4', 'G4', 0, 0, 0]
    ),
    bass: seq(
      ['C2', 0, 'G2', 0, 'A2', 0, 'E2', 0, 'F2', 0, 'C2', 0, 'G2', 0, 'C2', 0],
      ['A2', 0, 'E2', 0, 'G2', 0, 'D2', 0, 'F2', 0, 'G2', 0, 'C2', 0, 'G2', 0],
      ['C2', 0, 'G2', 0, 'A2', 0, 'E2', 0, 'D2', 0, 'A2', 0, 'G2', 0, 'D2', 0],
      ['F2', 0, 'C2', 0, 'G2', 0, 'D2', 0, 'A2', 0, 'E2', 0, 'C2', 0, 0, 0]
    ),
    chords: [
      ['C4', 'D4', 'G4'], ['A3', 'D4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'C4', 'D4'],
      ['A3', 'C4', 'E4'], ['G3', 'B3', 'D4'], ['F3', 'A3', 'C4'], ['C4', 'E4', 'G4'],
      ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['D3', 'G3', 'A3'], ['G3', 'C4', 'D4'],
      ['F3', 'A3', 'C4'], ['G3', 'C4', 'D4'], ['A3', 'C4', 'E4'], ['C4', 'E4', 'G4']
    ]
  },

  sydney: {
    title: 'Harbour Surf Rock — Sydney',
    bpm: 144,
    instrument: 'surf',
    drumStyle: 'rock',
    arpMode: 'stab',
    melody: seq(
      ['E5', 'Fs5', 'G5', 'B5', 'E6', 'D6', 'B5', 'G5', 'A5', 'B5', 'C6', 'E6', 'D6', 'B5', 'A5', 'G5'],
      ['E5', 0, 'G5', 'B5', 'A5', 0, 'G5', 'Fs5', 'E5', 'Fs5', 'G5', 'A5', 'B5', 0, 0, 0],
      ['C6', 'C6', 'B5', 'A5', 'G5', 'G5', 'A5', 'B5', 'A5', 'A5', 'G5', 'Fs5', 'E5', 0, 'B4', 0],
      ['B5', 'B5', 'A5', 'G5', 'Fs5', 'G5', 'A5', 'Fs5', 'E5', 'G5', 'B5', 'G5', 'E5', 0, 0, 0]
    ),
    bass: seq(
      ['E2', 'E2', 'G2', 'A2', 'B2', 'A2', 'G2', 'Fs2', 'A2', 'A2', 'C3', 'A2', 'B2', 'B2', 'G2', 'Fs2'],
      ['E2', 'E2', 'G2', 'B2', 'A2', 'A2', 'G2', 'Fs2', 'E2', 'G2', 'A2', 'Bb2', 'B2', 0, 'B2', 0],
      ['C2', 'C2', 'E2', 'G2', 'G2', 'G2', 'B2', 'G2', 'A2', 'A2', 'C3', 'A2', 'E2', 'E2', 'B2', 'E2'],
      ['B2', 'B2', 'A2', 'G2', 'Fs2', 'Fs2', 'A2', 'B2', 'E2', 'G2', 'B2', 'G2', 'E2', 0, 0, 0]
    ),
    chords: [
      ['E3', 'G3', 'B3'], ['E3', 'G3', 'B3'], ['A3', 'C4', 'E4'], ['B3', 'D4', 'Fs4'],
      ['E3', 'G3', 'B3'], ['A3', 'C4', 'E4'], ['E3', 'G3', 'B3'], ['B3', 'D4', 'Fs4'],
      ['C4', 'E4', 'G4'], ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4'], ['E3', 'G3', 'B3'],
      ['B3', 'D4', 'Fs4'], ['B3', 'D4', 'Fs4'], ['E3', 'G3', 'B3'], ['E3', 'G3', 'B3']
    ]
  },

  honolulu: {
    title: 'Aloha Ukulele Breeze — Honolulu',
    bpm: 114,
    instrument: 'ukulele',
    drumStyle: 'calypso',
    arpMode: 'offbeat',
    melody: seq(
      ['C5', 0, 'E5', 'G5', 'A5', 0, 'G5', 'E5', 'F5', 0, 'A5', 'G5', 'E5', 0, 'D5', 'C5'],
      ['G5', 0, 'A5', 'C6', 'B5', 0, 'A5', 'G5', 'E5', 0, 'G5', 'E5', 'D5', 0, 0, 0],
      ['F5', 0, 'A5', 'C6', 'A5', 0, 'G5', 'E5', 'D5', 0, 'F5', 'A5', 'G5', 0, 'E5', 'D5'],
      ['C5', 0, 'E5', 'G5', 'A5', 0, 'F5', 'D5', 'E5', 0, 'D5', 'B4', 'C5', 0, 0, 0]
    ),
    bass: seq(
      ['C3', 0, 'G2', 0, 'A2', 0, 'E2', 0, 'F2', 0, 'C3', 0, 'G2', 0, 'C3', 0],
      ['C3', 0, 'G2', 0, 'G2', 0, 'D3', 0, 'A2', 0, 'E2', 0, 'G2', 0, 'D3', 0],
      ['F2', 0, 'C3', 0, 'C3', 0, 'G2', 0, 'D2', 0, 'A2', 0, 'G2', 0, 'D3', 0],
      ['C3', 0, 'E2', 0, 'F2', 0, 'D2', 0, 'G2', 0, 'D3', 0, 'C3', 0, 0, 0]
    ),
    chords: [
      ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'],
      ['C4', 'E4', 'G4'], ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4'], ['G3', 'B3', 'D4'],
      ['F3', 'A3', 'C4'], ['C4', 'E4', 'G4'], ['D3', 'F3', 'A3'], ['G3', 'B3', 'D4'],
      ['C4', 'E4', 'G4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4']
    ]
  },

  moon: {
    title: 'Órbita Lunar — Baixa Gravidade',
    bpm: 102,
    instrument: 'spacepad',
    drumStyle: 'space',
    arpMode: 'arp',
    melody: seq(
      ['E5', 0, 0, 'B4', 'G5', 0, 0, 'Fs5', 'D5', 0, 0, 'A4', 'E5', 0, 'B4', 0],
      ['B5', 0, 0, 'A5', 'G5', 0, 'Fs5', 'E5', 'Fs5', 0, 0, 'D5', 'E5', 0, 0, 0],
      ['C6', 0, 0, 'B5', 'A5', 0, 'G5', 'Fs5', 'G5', 0, 'B5', 'A5', 'Fs5', 0, 'D5', 0],
      ['E5', 0, 'G5', 'B5', 'A5', 0, 'Fs5', 'D5', 'E5', 0, 0, 'B4', 'E5', 0, 0, 0]
    ),
    bass: seq(
      ['E2', 0, 0, 0, 'C2', 0, 0, 0, 'D2', 0, 0, 0, 'B2', 0, 0, 0],
      ['E2', 0, 0, 0, 'G2', 0, 0, 0, 'D2', 0, 0, 0, 'E2', 0, 0, 0],
      ['C2', 0, 0, 0, 'A2', 0, 0, 0, 'G2', 0, 0, 0, 'D2', 0, 0, 0],
      ['C2', 0, 0, 0, 'D2', 0, 0, 0, 'E2', 0, 0, 0, 'E2', 0, 0, 0]
    ),
    chords: [
      ['E3', 'G3', 'B3', 'D4'], ['C3', 'E3', 'G3', 'B3'], ['D3', 'Fs3', 'A3'], ['B2', 'D3', 'Fs3'],
      ['E3', 'G3', 'B3'], ['G3', 'B3', 'D4'], ['D3', 'Fs3', 'A3'], ['E3', 'G3', 'B3'],
      ['C3', 'E3', 'G3', 'B3'], ['A2', 'C3', 'E3', 'G3'], ['G3', 'B3', 'D4'], ['D3', 'Fs3', 'A3'],
      ['C3', 'E3', 'G3'], ['D3', 'Fs3', 'A3'], ['E3', 'G3', 'B3'], ['E3', 'G3', 'B3']
    ]
  },

  mars: {
    title: 'Tempestade em Marte — Desafio Final',
    bpm: 148,
    instrument: 'bosssynth',
    drumStyle: 'boss',
    arpMode: 'arp',
    melody: seq(
      ['D5', 'D5', 'F5', 'G5', 'A5', 'Bb5', 'A5', 'G5', 'F5', 'E5', 'D5', 'F5', 'A5', 'G5', 'F5', 'E5'],
      ['D5', 'F5', 'A5', 'D6', 'C6', 'Bb5', 'A5', 'G5', 'A5', 0, 'Cs6', 'A5', 'D6', 0, 0, 0],
      ['Bb5', 0, 'A5', 'G5', 'F5', 0, 'G5', 'A5', 'G5', 'F5', 'E5', 'D5', 'Cs5', 'E5', 'A5', 0],
      ['D6', 'C6', 'Bb5', 'A5', 'G5', 'F5', 'E5', 'D5', 'F5', 'A5', 'Cs6', 'A5', 'D6', 0, 0, 0]
    ),
    bass: seq(
      ['D2', 'D2', 'D3', 'D2', 'Bb2', 'Bb2', 'Bb2', 'A2', 'G2', 'G2', 'G2', 'F2', 'A2', 'A2', 'Cs3', 'A2'],
      ['D2', 'D2', 'D3', 'D2', 'C2', 'C2', 'C3', 'C2', 'A2', 'A2', 'Cs3', 'A2', 'D2', 'D2', 'A2', 'D2'],
      ['Bb2', 'Bb2', 'Bb2', 'F2', 'G2', 'G2', 'G2', 'D2', 'E2', 'E2', 'G2', 'E2', 'A2', 'A2', 'Cs3', 'A2'],
      ['Bb2', 'Bb2', 'A2', 'G2', 'G2', 'G2', 'F2', 'E2', 'A2', 'A2', 'Cs3', 'A2', 'D2', 'D2', 'D3', 0]
    ),
    chords: [
      ['D3', 'F3', 'A3'], ['Bb3', 'D4', 'F4'], ['G3', 'Bb3', 'D4'], ['A3', 'Cs4', 'E4'],
      ['D3', 'F3', 'A3'], ['C3', 'E3', 'G3'], ['A3', 'Cs4', 'E4'], ['D3', 'F3', 'A3'],
      ['Bb3', 'D4', 'F4'], ['G3', 'Bb3', 'D4'], ['E3', 'G3', 'Bb3'], ['A3', 'Cs4', 'E4'],
      ['Bb3', 'D4', 'F4'], ['G3', 'Bb3', 'D4'], ['A3', 'Cs4', 'E4'], ['D3', 'F3', 'A3']
    ]
  }
};

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayWet: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  public sfxMuted = false;
  public musicEnabled = true;

  private currentTheme: OstTrackKey | null = null;
  private ducked = false;
  private step = 0;
  private nextNoteTime = 0;
  private schedulerId: number | null = null;

  public init(): void {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      const compressor = this.ctx.createDynamicsCompressor();
      compressor.threshold.value = -16;
      compressor.knee.value = 18;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.005;
      compressor.release.value = 0.14;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.85;

      this.musicBus = this.ctx.createGain();
      this.musicBus.gain.value = 0.62;

      this.sfxBus = this.ctx.createGain();
      this.sfxBus.gain.value = 0.9;

      // Subtle arcade stereo/echo slapback for music
      this.delayNode = this.ctx.createDelay(0.6);
      this.delayNode.delayTime.value = 0.24;
      const delayFb = this.ctx.createGain();
      delayFb.gain.value = 0.24;
      const delayFilter = this.ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.value = 2400;
      this.delayWet = this.ctx.createGain();
      this.delayWet.gain.value = 0.22;

      this.musicBus.connect(compressor);
      this.musicBus.connect(this.delayNode);
      this.delayNode.connect(delayFilter);
      delayFilter.connect(delayFb);
      delayFb.connect(this.delayNode);
      delayFilter.connect(this.delayWet);
      this.delayWet.connect(compressor);

      this.sfxBus.connect(compressor);
      compressor.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      // Pre-allocate reusable 1-second noise buffer
      const bufSize = this.ctx.sampleRate;
      this.noiseBuffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const ch = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) ch[i] = Math.random() * 2 - 1;
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.sfxMuted = !this.sfxMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.sfxMuted ? 0 : 0.85, this.ctx.currentTime, 0.02);
    }
    return this.sfxMuted;
  }

  public toggleMusic(): boolean {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled && this.currentTheme) {
      this.startScheduler();
    } else {
      this.stopScheduler();
    }
    return this.musicEnabled;
  }

  public playTheme(themeKey: OstTrackKey): void {
    const changed = this.currentTheme !== themeKey;
    this.currentTheme = themeKey;
    if (changed) this.step = 0;
    this.ducked = false;
    this.updateMusicGain();
    if (this.musicEnabled) {
      this.startScheduler();
    }
  }

  public setDucked(isDucked: boolean): void {
    this.ducked = isDucked;
    this.updateMusicGain();
  }

  public stopMusic(): void {
    this.stopScheduler();
  }

  private updateMusicGain(): void {
    if (!this.musicBus || !this.ctx) return;
    const target = this.ducked ? 0.22 : 0.62;
    this.musicBus.gain.setTargetAtTime(target, this.ctx.currentTime, 0.06);
  }

  private startScheduler(): void {
    this.stopScheduler();
    if (!this.musicEnabled || !this.currentTheme) return;
    if (this.ctx) {
      this.nextNoteTime = this.ctx.currentTime + 0.05;
    }
    this.schedulerId = window.setInterval(() => this.scheduleAhead(), 25);
  }

  private stopScheduler(): void {
    if (this.schedulerId !== null) {
      clearInterval(this.schedulerId);
      this.schedulerId = null;
    }
  }

  private scheduleAhead(): void {
    if (!this.ctx || !this.musicEnabled || this.sfxMuted || !this.currentTheme) return;
    if (this.ctx.state !== 'running') return;

    const track = OST_TRACKS[this.currentTheme];
    if (!track) return;

    const stepSec = 60 / track.bpm / 4;
    if (this.nextNoteTime < this.ctx.currentTime - 0.15) {
      this.nextNoteTime = this.ctx.currentTime + 0.03;
    }

    while (this.nextNoteTime < this.ctx.currentTime + 0.12) {
      this.scheduleStep(track, this.step, this.nextNoteTime, stepSec);
      this.nextNoteTime += stepSec;
      this.step = (this.step + 1) % 64;
    }
  }

  private scheduleStep(track: OstTrackDef, step: number, time: number, stepSec: number): void {
    if (!this.ctx || !this.musicBus) return;

    // 1. Lead melody
    const melNote = track.melody[step % track.melody.length];
    if (melNote && NOTE_FREQ[melNote]) {
      this.playLeadInstrument(track.instrument, NOTE_FREQ[melNote], time, stepSec * 1.75);
    }

    // 2. Bassline
    const bassNote = track.bass[step % track.bass.length];
    if (bassNote && NOTE_FREQ[bassNote]) {
      this.playBassNote(track.instrument, NOTE_FREQ[bassNote], time, stepSec * 1.55);
    }

    // 3. Chords / Harmony / Arpeggio
    const chordIdx = Math.floor(step / 4) % track.chords.length;
    const chord = track.chords[chordIdx];
    if (chord && chord.length > 0) {
      const sub = step % 4;
      if (track.arpMode === 'arp') {
        const arpNote = chord[sub % chord.length];
        if (NOTE_FREQ[arpNote]) {
          this.playChordTone(NOTE_FREQ[arpNote], time, stepSec * 1.15, 0.032, 'triangle', 1800);
        }
      } else if (track.arpMode === 'offbeat' && sub === 2) {
        chord.forEach((n) => {
          if (NOTE_FREQ[n]) this.playChordTone(NOTE_FREQ[n], time, stepSec * 1.2, 0.025, 'triangle', 2000);
        });
      } else if (track.arpMode === 'stab' && (sub === 0 || (step % 8 === 6))) {
        chord.forEach((n) => {
          if (NOTE_FREQ[n]) this.playChordTone(NOTE_FREQ[n], time, stepSec * 1.5, 0.026, 'sawtooth', 1400);
        });
      } else if (track.arpMode === 'pad' && sub === 0) {
        chord.forEach((n) => {
          if (NOTE_FREQ[n]) this.playChordTone(NOTE_FREQ[n], time, stepSec * 3.8, 0.024, 'sine', 1200);
        });
      }
    }

    // 4. Regional Percussion
    this.playDrumStep(track.drumStyle, step % 16, step, time);
  }

  private playLeadInstrument(profile: InstrumentProfile, freq: number, time: number, dur: number): void {
    if (!this.ctx || !this.musicBus) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    let wave: OscillatorType = 'triangle';
    let filterStart = 2800;
    let filterEnd = 1200;
    let attack = 0.01;
    let vol = 0.085;
    let detuneOsc = false;
    let fmBell = false;

    switch (profile) {
      case 'koto':
      case 'guzheng':
      case 'balalaika':
      case 'mandolin':
      case 'flamenco':
      case 'ukulele':
        wave = profile === 'ukulele' ? 'triangle' : 'sawtooth';
        filterStart = profile === 'ukulele' ? 2200 : 3400;
        filterEnd = 650;
        attack = 0.004;
        vol = 0.072;
        dur *= 0.85;
        break;
      case 'oud':
      case 'sitar':
        wave = 'sawtooth';
        filterStart = 2600;
        filterEnd = 900;
        filter.Q.value = profile === 'sitar' ? 6.5 : 2.5;
        attack = 0.006;
        vol = 0.07;
        detuneOsc = true;
        break;
      case 'synthwave':
      case 'bosssynth':
      case 'britrock':
        wave = profile === 'britrock' ? 'square' : 'sawtooth';
        filterStart = 3200;
        filterEnd = 1100;
        filter.Q.value = 3.2;
        detuneOsc = true;
        vol = 0.068;
        break;
      case 'steelpan':
      case 'ranat':
        wave = 'sine';
        fmBell = true;
        vol = 0.09;
        dur *= 0.9;
        break;
      case 'flute':
      case 'panflute':
      case 'spacepad':
        wave = 'sine';
        attack = profile === 'spacepad' ? 0.07 : 0.03;
        filterStart = 2000;
        filterEnd = 1400;
        vol = 0.095;
        dur *= profile === 'spacepad' ? 1.8 : 1.15;
        break;
      case 'accordion':
      case 'bandoneon':
      case 'salsa':
      case 'swing':
      case 'arcadebrass':
        wave = profile === 'swing' || profile === 'salsa' ? 'square' : 'sawtooth';
        filterStart = 2400;
        filterEnd = 1300;
        detuneOsc = true;
        vol = 0.064;
        break;
      default:
        wave = profile === 'surf' || profile === 'funk' ? 'square' : 'triangle';
        vol = 0.075;
    }

    osc.type = wave;
    osc.frequency.setValueAtTime(freq, time);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterStart, time);
    filter.frequency.exponentialRampToValueAtTime(Math.max(200, filterEnd), time + dur);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(vol, time + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicBus);
    osc.start(time);
    osc.stop(time + dur + 0.03);

    if (detuneOsc) {
      const osc2 = this.ctx.createOscillator();
      osc2.type = wave;
      osc2.frequency.setValueAtTime(freq, time);
      osc2.detune.setValueAtTime(profile === 'sitar' ? 18 : 9, time);
      osc2.connect(filter);
      osc2.start(time);
      osc2.stop(time + dur + 0.03);
    }

    if (fmBell) {
      const over = this.ctx.createOscillator();
      const overGain = this.ctx.createGain();
      over.type = 'sine';
      over.frequency.setValueAtTime(freq * 2.0, time);
      overGain.gain.setValueAtTime(vol * 0.45, time);
      overGain.gain.exponentialRampToValueAtTime(0.0001, time + dur * 0.45);
      over.connect(overGain);
      overGain.connect(this.musicBus);
      over.start(time);
      over.stop(time + dur * 0.5);
    }
  }

  private playBassNote(profile: InstrumentProfile, freq: number, time: number, dur: number): void {
    if (!this.ctx || !this.musicBus) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    const punchy = profile === 'synthwave' || profile === 'bosssynth' || profile === 'funk' || profile === 'britrock' || profile === 'surf';
    osc.type = punchy ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(punchy ? 720 : 480, time);
    filter.frequency.exponentialRampToValueAtTime(180, time + dur);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.11, time + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicBus);
    osc.start(time);
    osc.stop(time + dur + 0.02);
  }

  private playChordTone(freq: number, time: number, dur: number, vol: number, wave: OscillatorType, cutoff: number): void {
    if (!this.ctx || !this.musicBus) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(freq, time);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(vol, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicBus);
    osc.start(time);
    osc.stop(time + dur + 0.02);
  }

  private playDrumStep(style: DrumStyle, s: number, totalStep: number, time: number): void {
    if (!this.ctx || !this.musicBus) return;

    const kick = (f = 135, v = 0.14) => {
      if (!this.ctx || !this.musicBus) return;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(f, time);
      o.frequency.exponentialRampToValueAtTime(38, time + 0.095);
      g.gain.setValueAtTime(v, time);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 0.11);
      o.connect(g);
      g.connect(this.musicBus);
      o.start(time);
      o.stop(time + 0.12);
    };

    const noiseHit = (dur: number, v: number, freq: number, ftype: BiquadFilterType) => {
      if (!this.ctx || !this.musicBus || !this.noiseBuffer) return;
      const src = this.ctx.createBufferSource();
      src.buffer = this.noiseBuffer;
      const f = this.ctx.createBiquadFilter();
      f.type = ftype;
      f.frequency.setValueAtTime(freq, time);
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(v, time);
      g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
      src.connect(f);
      f.connect(g);
      g.connect(this.musicBus);
      src.start(time);
      src.stop(time + dur + 0.01);
    };

    const snare = (v = 0.065) => noiseHit(0.09, v, 1500, 'bandpass');
    const hat = (v = 0.032) => noiseHit(0.035, v, 5400, 'highpass');
    const rim = (v = 0.05) => {
      if (!this.ctx || !this.musicBus) return;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(860, time);
      o.frequency.exponentialRampToValueAtTime(420, time + 0.03);
      g.gain.setValueAtTime(v, time);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 0.035);
      o.connect(g);
      g.connect(this.musicBus);
      o.start(time);
      o.stop(time + 0.04);
    };

    // Subtle bar-4 fill on steps 60..63
    const isFill = totalStep >= 60;
    if (isFill && style !== 'space') {
      if (totalStep === 60 || totalStep === 62) snare(0.07);
      if (totalStep === 63) kick(165, 0.12);
    }

    switch (style) {
      case 'samba':
        if (s === 0 || s === 8) kick(102, 0.11);
        if (s === 4 || s === 12) kick(152, 0.16);
        if ([0, 2, 3, 6, 8, 10, 11, 14].includes(s)) hat(0.035);
        if ([0, 3, 6, 10, 12].includes(s)) rim(0.045);
        break;
      case 'tango':
        if ([0, 6, 8, 12].includes(s)) kick(118, 0.14);
        if (s === 4 || s === 12) snare(0.055);
        if (s === 14) rim(0.045);
        break;
      case 'salsa':
        if ([0, 3, 6, 10, 12].includes(s)) rim(0.06);
        if ([0, 6, 14].includes(s)) kick(128, 0.13);
        if (s % 2 === 0) hat(0.024);
        break;
      case 'flamenco':
        if ([0, 3, 6, 8, 10, 12].includes(s)) snare(0.055);
        if (s === 0 || s === 8) kick(125, 0.14);
        break;
      case 'taiko':
        if ([0, 6, 8, 14].includes(s)) kick(96, 0.16);
        if (s === 4 || s === 12) snare(0.06);
        if (s === 2 || s === 10) rim(0.04);
        break;
      case 'darbuka':
        if ([0, 6, 10].includes(s)) kick(140, 0.13);
        if ([2, 4, 8, 12, 14].includes(s)) rim(0.05);
        if (s % 2 === 1) hat(0.02);
        break;
      case 'space':
        if (s === 0 || s === 8) kick(82, 0.11);
        if (s === 4 || s === 12) hat(0.025);
        break;
      case 'boss':
        if (s % 4 === 0 || s === 14) kick(150, 0.16);
        if (s === 4 || s === 12) snare(0.08);
        if (s % 2 === 1) hat(0.036);
        break;
      default:
        if (s === 0 || s === 8 || (style === 'rock' && s === 10)) kick(134, 0.14);
        if (s === 4 || s === 12) snare(0.07);
        if (s % 2 === 0) hat(0.03);
        break;
    }
  }

  // =========================================================================
  // ARCADE SOUND EFFECTS
  // =========================================================================
  private playSfxTone(opts: {
    freqStart: number;
    freqEnd?: number;
    duration: number;
    type?: OscillatorType;
    volume?: number;
    delay?: number;
  }): void {
    if (this.sfxMuted || !this.ctx || !this.sfxBus) return;
    try {
      const now = this.ctx.currentTime + (opts.delay || 0);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = opts.type || 'square';
      osc.frequency.setValueAtTime(opts.freqStart, now);
      if (opts.freqEnd && opts.freqEnd !== opts.freqStart) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, opts.freqEnd), now + opts.duration);
      }
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(opts.volume ?? 0.13, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + opts.duration);
      osc.connect(gain);
      gain.connect(this.sfxBus);
      osc.start(now);
      osc.stop(now + opts.duration + 0.02);
    } catch {
      // Ignore audio errors
    }
  }

  private playSfxNoise(opts: {
    duration?: number;
    volume?: number;
    filterFreq?: number;
    filterType?: BiquadFilterType;
    delay?: number;
  }): void {
    if (this.sfxMuted || !this.ctx || !this.sfxBus || !this.noiseBuffer) return;
    try {
      const dur = opts.duration ?? 0.18;
      const now = this.ctx.currentTime + (opts.delay || 0);
      const src = this.ctx.createBufferSource();
      src.buffer = this.noiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = opts.filterType || 'lowpass';
      filter.frequency.setValueAtTime(opts.filterFreq ?? 900, now);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(opts.volume ?? 0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxBus);
      src.start(now);
      src.stop(now + dur + 0.02);
    } catch {
      // Ignore
    }
  }

  public shoot(): void {
    this.playSfxTone({ freqStart: 560, freqEnd: 1320, duration: 0.085, type: 'triangle', volume: 0.13 });
    this.playSfxNoise({ duration: 0.04, volume: 0.05, filterFreq: 2600, filterType: 'highpass' });
  }

  public hookLatch(): void {
    this.playSfxTone({ freqStart: 1040, freqEnd: 680, duration: 0.075, type: 'square', volume: 0.1 });
  }

  public pop(sizeIndex: number, combo = 1): void {
    const base = ([740, 530, 365, 240][sizeIndex] || 400) * Math.min(1.45, 1 + (combo - 1) * 0.08);
    this.playSfxTone({ freqStart: base, freqEnd: base * 1.75, duration: 0.11, type: 'sine', volume: 0.19 });
    this.playSfxNoise({ duration: 0.055, volume: 0.07, filterFreq: 2200 });
    if (combo >= 2) {
      this.playSfxTone({ freqStart: 523.25 * Math.pow(1.12, Math.min(combo, 8)), freqEnd: 659.25 * Math.pow(1.12, Math.min(combo, 8)), duration: 0.09, type: 'triangle', volume: 0.09, delay: 0.03 });
    }
  }

  public blockBreak(): void {
    this.playSfxNoise({ duration: 0.14, volume: 0.14, filterFreq: 1200 });
    this.playSfxTone({ freqStart: 240, freqEnd: 82, duration: 0.12, type: 'square', volume: 0.1 });
  }

  public powerup(): void {
    [523.25, 659.25, 783.99, 1046.5].forEach((n, i) => {
      this.playSfxTone({ freqStart: n, freqEnd: n, duration: 0.095, type: 'triangle', volume: 0.14, delay: i * 0.048 });
    });
  }

  public extraLife(): void {
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((n, i) => {
      this.playSfxTone({ freqStart: n, freqEnd: n, duration: 0.12, type: 'square', volume: 0.11, delay: i * 0.068 });
    });
  }

  public freeze(): void {
    [1320, 990, 1480, 1180].forEach((n, i) => {
      this.playSfxTone({ freqStart: n, freqEnd: n * 0.88, duration: 0.13, type: 'sine', volume: 0.11, delay: i * 0.05 });
    });
  }

  public dynamite(): void {
    this.playSfxNoise({ duration: 0.44, volume: 0.25, filterFreq: 520 });
    this.playSfxTone({ freqStart: 160, freqEnd: 34, duration: 0.4, type: 'sawtooth', volume: 0.18 });
  }

  public shieldBlock(): void {
    this.playSfxTone({ freqStart: 640, freqEnd: 290, duration: 0.2, type: 'triangle', volume: 0.15 });
    this.playSfxTone({ freqStart: 920, freqEnd: 460, duration: 0.18, type: 'sine', volume: 0.12, delay: 0.04 });
  }

  public hit(): void {
    this.playSfxTone({ freqStart: 320, freqEnd: 70, duration: 0.36, type: 'sawtooth', volume: 0.18 });
    this.playSfxNoise({ duration: 0.22, volume: 0.14, filterFreq: 600 });
  }

  public planeFlight(): void {
    this.playSfxTone({ freqStart: 115, freqEnd: 185, duration: 1.5, type: 'sawtooth', volume: 0.05 });
    this.playSfxNoise({ duration: 1.7, volume: 0.05, filterFreq: 420 });
    this.playSfxTone({ freqStart: 440, freqEnd: 554.37, duration: 0.12, type: 'triangle', volume: 0.09, delay: 0.1 });
    this.playSfxTone({ freqStart: 659.25, freqEnd: 880, duration: 0.24, type: 'triangle', volume: 0.09, delay: 0.24 });
  }

  public rocketLaunch(): void {
    this.playSfxNoise({ duration: 2.2, volume: 0.13, filterFreq: 340 });
    this.playSfxTone({ freqStart: 85, freqEnd: 270, duration: 2.0, type: 'sawtooth', volume: 0.065 });
    [523.25, 783.99, 1046.5].forEach((n, i) => {
      this.playSfxTone({ freqStart: n, freqEnd: n * 1.12, duration: 0.16, type: 'sine', volume: 0.1, delay: 0.15 + i * 0.14 });
    });
  }

  public stageClear(): void {
    const melody = [523.25, 659.25, 783.99, 659.25, 1046.5];
    const delays = [0, 0.1, 0.2, 0.3, 0.42];
    melody.forEach((n, i) => {
      this.playSfxTone({ freqStart: n, freqEnd: n, duration: i === 4 ? 0.38 : 0.11, type: 'square', volume: 0.11, delay: delays[i] });
    });
  }

  public gameOver(): void {
    [392, 369.99, 349.23, 329.63, 261.63].forEach((n, i) => {
      this.playSfxTone({ freqStart: n, freqEnd: n * 0.96, duration: i === 4 ? 0.52 : 0.16, type: 'sawtooth', volume: 0.12, delay: i * 0.17 });
    });
  }

  public victory(): void {
    const fanfare = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1318.5];
    const delays = [0, 0.1, 0.2, 0.32, 0.48, 0.58, 0.72];
    fanfare.forEach((n, i) => {
      this.playSfxTone({ freqStart: n, freqEnd: n, duration: i === 6 ? 0.58 : 0.12, type: 'triangle', volume: 0.15, delay: delays[i] });
    });
  }
}

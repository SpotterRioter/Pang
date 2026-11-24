import { GROUND_Y, WORLD_W } from './levels';
import { ThemeId } from './types';

// Deterministic pseudo-random generator for consistent painterly brushwork in offscreen caches
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function fillSky(ctx: CanvasRenderingContext2D, stops: [number, string][]): void {
  const g = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  stops.forEach(([pos, col]) => g.addColorStop(pos, col));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, WORLD_W, GROUND_Y);
}

/** Paints atmospheric depth haze between background planes */
export function paintHazeBand(
  ctx: CanvasRenderingContext2D,
  yTop: number,
  yBot: number,
  color: string
): void {
  const g = ctx.createLinearGradient(0, yTop, 0, yBot);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(0.55, color);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, yTop, WORLD_W, yBot - yTop);
}

/** Paints a glowing celestial sun/moon with atmospheric bloom and optional diagonal god-rays */
export function paintSunWithBloom(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  coreTop: string,
  coreBot: string,
  haloColor: string,
  rays = false
): void {
  // Wide atmospheric glow
  const halo = ctx.createRadialGradient(x, y, r * 0.4, x, y, r * 3.8);
  halo.addColorStop(0, haloColor);
  halo.addColorStop(0.45, haloColor.replace(/[\d.]+\)$/, '0.18)'));
  halo.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(x, y, r * 3.8, 0, Math.PI * 2);
  ctx.fill();

  if (rays) {
    ctx.save();
    for (let i = 0; i < 7; i++) {
      const ang = -0.35 + i * 0.28;
      const rg = ctx.createLinearGradient(x, y, x + Math.cos(ang) * 460, y + Math.sin(ang) * 460);
      rg.addColorStop(0, haloColor.replace(/[\d.]+\)$/, '0.18)'));
      rg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(ang - 0.06) * 520, y + Math.sin(ang - 0.06) * 520);
      ctx.lineTo(x + Math.cos(ang + 0.06) * 520, y + Math.sin(ang + 0.06) * 520);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  const sg = ctx.createLinearGradient(x, y - r, x, y + r);
  sg.addColorStop(0, coreTop);
  sg.addColorStop(1, coreBot);
  ctx.fillStyle = sg;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

/** Paints layered volumetric cumulus clouds with sunlit tops and cool undersides */
export function paintCloudBank(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  topCol: string,
  midCol: string,
  shadowCol: string
): void {
  const puffs: [number, number, number][] = [
    [-58, 12, 26],
    [-28, 2, 34],
    [8, -6, 40],
    [42, 4, 32],
    [72, 14, 24]
  ];
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  // Underside shadow
  ctx.fillStyle = shadowCol;
  for (const [px, py, pr] of puffs) {
    ctx.beginPath();
    ctx.arc(px, py + 7, pr * 0.95, 0, Math.PI * 2);
    ctx.fill();
  }
  // Midtone body
  ctx.fillStyle = midCol;
  for (const [px, py, pr] of puffs) {
    ctx.beginPath();
    ctx.arc(px, py + 2, pr * 0.96, 0, Math.PI * 2);
    ctx.fill();
  }
  // Sunlit rim highlight
  ctx.fillStyle = topCol;
  for (const [px, py, pr] of puffs) {
    ctx.beginPath();
    ctx.arc(px - 2, py - 4, pr * 0.78, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/** Paints a sculpted mountain ridge with faceted sunlit and shaded faces */
export function paintSculptedMountain(
  ctx: CanvasRenderingContext2D,
  xLeft: number,
  xPeak: number,
  xRight: number,
  yPeak: number,
  yBase: number,
  litCol: string,
  shadeCol: string,
  snowCol?: string,
  snowDrop = 0.28
): void {
  const midX = xPeak + (xRight - xLeft) * 0.03;

  // Lit side
  ctx.fillStyle = litCol;
  ctx.beginPath();
  ctx.moveTo(xLeft, yBase);
  ctx.lineTo(xPeak, yPeak);
  ctx.lineTo(midX, yBase);
  ctx.closePath();
  ctx.fill();

  // Shaded side
  ctx.fillStyle = shadeCol;
  ctx.beginPath();
  ctx.moveTo(xPeak, yPeak);
  ctx.lineTo(xRight, yBase);
  ctx.lineTo(midX, yBase);
  ctx.closePath();
  ctx.fill();

  // Optional jagged snow cap
  if (snowCol) {
    const sy = yPeak + (yBase - yPeak) * snowDrop;
    const lx = xPeak - (xPeak - xLeft) * snowDrop;
    const rx = xPeak + (xRight - xPeak) * snowDrop;
    ctx.fillStyle = snowCol;
    ctx.beginPath();
    ctx.moveTo(xPeak, yPeak);
    ctx.lineTo(lx, sy);
    ctx.lineTo(lx + (xPeak - lx) * 0.45, sy - 10);
    ctx.lineTo(xPeak - 4, sy + 9);
    ctx.lineTo(xPeak + (rx - xPeak) * 0.35, sy - 8);
    ctx.lineTo(rx, sy + 2);
    ctx.closePath();
    ctx.fill();

    // Subtle cool shadow on right half of snow cap
    ctx.fillStyle = 'rgba(30, 58, 138, 0.22)';
    ctx.beginPath();
    ctx.moveTo(xPeak, yPeak);
    ctx.lineTo(xPeak - 4, sy + 9);
    ctx.lineTo(xPeak + (rx - xPeak) * 0.35, sy - 8);
    ctx.lineTo(rx, sy + 2);
    ctx.closePath();
    ctx.fill();
  }
}

/** Paints lush layered tree/foliage tufts */
export function paintFoliageCluster(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  darkCol: string,
  midCol: string,
  lightCol: string,
  rand: () => number
): void {
  const count = 9;
  for (let i = 0; i < count; i++) {
    const ox = (rand() - 0.5) * radius * 1.4;
    const oy = (rand() - 0.5) * radius * 0.85;
    const r = radius * (0.38 + rand() * 0.32);
    ctx.fillStyle = darkCol;
    ctx.beginPath();
    ctx.arc(cx + ox, cy + oy + 4, r, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < count; i++) {
    const ox = (rand() - 0.5) * radius * 1.3;
    const oy = (rand() - 0.5) * radius * 0.75;
    const r = radius * (0.32 + rand() * 0.28);
    ctx.fillStyle = midCol;
    ctx.beginPath();
    ctx.arc(cx + ox, cy + oy, r, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 5; i++) {
    const ox = (rand() - 0.5) * radius * 1.1;
    const oy = -radius * 0.15 + (rand() - 0.5) * radius * 0.45;
    const r = radius * (0.22 + rand() * 0.2);
    ctx.fillStyle = lightCol;
    ctx.beginPath();
    ctx.arc(cx + ox - 2, cy + oy - 3, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Paints detailed arched masonry or classical windows */
export function paintArchRow(
  ctx: CanvasRenderingContext2D,
  startX: number,
  y: number,
  count: number,
  spacing: number,
  w: number,
  h: number,
  fill: string,
  trim?: string
): void {
  for (let i = 0; i < count; i++) {
    const x = startX + i * spacing;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.closePath();
    ctx.fill();
    if (trim) {
      ctx.strokeStyle = trim;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
  }
}

/** Paints a detailed architectural skyscraper with lit windows and rooftop silhouette */
export function paintSkyscraper(
  ctx: CanvasRenderingContext2D,
  x: number,
  w: number,
  h: number,
  baseCol: string,
  shadeCol: string,
  winCol: string,
  accentCol: string | null,
  rand: () => number
): void {
  const y = GROUND_Y - h;
  const g = ctx.createLinearGradient(x, y, x + w, y);
  g.addColorStop(0, baseCol);
  g.addColorStop(0.7, baseCol);
  g.addColorStop(1, shadeCol);
  ctx.fillStyle = g;
  ctx.fillRect(x, y, w, h);

  // Rooftop setback
  if (w > 48) {
    ctx.fillStyle = shadeCol;
    ctx.fillRect(x + w * 0.16, y - 10, w * 0.68, 10);
  }

  // Lit office window grid with realistic occupied/empty pattern
  for (let wy = y + 12; wy < GROUND_Y - 18; wy += 13) {
    for (let wx = x + 7; wx < x + w - 11; wx += 11) {
      if (rand() > 0.34) {
        ctx.fillStyle = winCol;
        ctx.fillRect(wx, wy, 6, 7);
      }
    }
  }

  if (accentCol) {
    ctx.strokeStyle = accentCol;
    ctx.lineWidth = 1.6;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h);
  }
}

/** Subtle painterly texture grain & subtle atmospheric vignette on cached backdrops */
export function paintBackdropFinishing(ctx: CanvasRenderingContext2D, darkness = 0.2): void {
  // Subtle edge vignette so the playfield reads crisply
  const vg = ctx.createRadialGradient(WORLD_W / 2, GROUND_Y * 0.48, 220, WORLD_W / 2, GROUND_Y * 0.5, 580);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, `rgba(4, 7, 18, ${darkness})`);
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, WORLD_W, GROUND_Y);

  // Bottom grounding gradient so player & bubbles pop cleanly near the floor
  const fg = ctx.createLinearGradient(0, GROUND_Y - 56, 0, GROUND_Y);
  fg.addColorStop(0, 'rgba(4, 7, 18, 0)');
  fg.addColorStop(1, 'rgba(4, 7, 18, 0.28)');
  ctx.fillStyle = fg;
  ctx.fillRect(0, GROUND_Y - 56, WORLD_W, 56);
}

// =========================================================================
// LIVE ANIMATED HELPERS & AMBIENT WEATHER STATE
// =========================================================================
export const BG_STARS = Array.from({ length: 145 }, (_, i) => {
  const r = mulberry32(9001 + i * 17);
  return {
    x: r() * WORLD_W,
    y: r() * GROUND_Y,
    r: r() * 1.85 + 0.45,
    phase: r() * Math.PI * 2,
    tint: i % 5 === 0 ? '#bae6fd' : i % 7 === 0 ? '#fef08a' : '#ffffff'
  };
});

export const SNOW_FLAKES = Array.from({ length: 85 }, () => ({
  x: Math.random() * WORLD_W,
  y: Math.random() * GROUND_Y,
  r: Math.random() * 2.8 + 1.0,
  depth: 0.5 + Math.random() * 0.9,
  speed: 22 + Math.random() * 44,
  drift: Math.random() * Math.PI * 2
}));

export const PETALS = Array.from({ length: 34 }, () => ({
  x: Math.random() * WORLD_W,
  y: Math.random() * GROUND_Y,
  vx: -26 - Math.random() * 28,
  vy: 15 + Math.random() * 22,
  rot: Math.random() * Math.PI * 2,
  size: 3.5 + Math.random() * 2.5
}));

export const RAIN_DROPS = Array.from({ length: 95 }, () => ({
  x: Math.random() * WORLD_W,
  y: Math.random() * GROUND_Y,
  len: 10 + Math.random() * 15,
  speed: 370 + Math.random() * 220
}));

export const DUST_PARTICLES = Array.from({ length: 60 }, () => ({
  x: Math.random() * WORLD_W,
  y: Math.random() * GROUND_Y,
  vx: 95 + Math.random() * 145,
  vy: -8 + Math.random() * 16,
  r: 1.4 + Math.random() * 2.6,
  alpha: 0.25 + Math.random() * 0.45
}));

export const SKY_LANTERNS = Array.from({ length: 18 }, (_, i) => ({
  x: 45 + ((i * 58) % (WORLD_W - 90)),
  y: Math.random() * (GROUND_Y - 90),
  vy: 11 + Math.random() * 15,
  sway: Math.random() * Math.PI * 2,
  scale: 0.65 + Math.random() * 0.55
}));

export const SHOOTING_STAR = { x: 180, y: 60, vx: 360, vy: 120, life: 0, cooldown: 2.2 };

export function updateAmbientWeather(dt: number, bgTime: number, theme: ThemeId): void {
  if (theme === 'moscow' || theme === 'alps') {
    for (const f of SNOW_FLAKES) {
      f.y += f.speed * f.depth * dt;
      f.x += Math.sin(bgTime * 1.9 + f.drift) * (theme === 'moscow' ? 34 : 18) * f.depth * dt;
      if (f.y > GROUND_Y) {
        f.y = -4;
        f.x = Math.random() * WORLD_W;
      }
      if (f.x < 0) f.x = WORLD_W;
      if (f.x > WORLD_W) f.x = 0;
    }
  }
  if (theme === 'fuji' || theme === 'delhi' || theme === 'beijing' || theme === 'buenosaires') {
    for (const p of PETALS) {
      p.x += p.vx * dt;
      p.y += p.vy * dt + Math.sin(bgTime * 3 + p.rot) * 8 * dt;
      p.rot += dt * 2.6;
      if (p.x < -12 || p.y > GROUND_Y) {
        p.x = WORLD_W + Math.random() * 80;
        p.y = Math.random() * (GROUND_Y * 0.65);
      }
    }
  }
  if (theme === 'neon' || theme === 'london') {
    for (const r of RAIN_DROPS) {
      r.y += r.speed * dt;
      r.x -= (theme === 'neon' ? 60 : 35) * dt;
      if (r.y > GROUND_Y) {
        r.y = -r.len;
        r.x = Math.random() * (WORLD_W + 70);
      }
    }
  }
  if (theme === 'mars' || theme === 'pyramids' || theme === 'temple') {
    for (const d of DUST_PARTICLES) {
      if (theme === 'temple') {
        d.y -= 20 * dt;
        d.x += Math.sin(bgTime * 2 + d.r) * 14 * dt;
        if (d.y < 10) {
          d.y = GROUND_Y - 10;
          d.x = Math.random() * WORLD_W;
        }
      } else {
        const mult = theme === 'mars' ? 1.45 : 0.65;
        d.x += d.vx * mult * dt;
        d.y += d.vy * dt;
        if (d.x > WORLD_W + 10) {
          d.x = -10;
          d.y = Math.random() * GROUND_Y;
        }
        if (d.y < 0) d.y = GROUND_Y - 5;
        if (d.y > GROUND_Y) d.y = 5;
      }
    }
  }
  if (theme === 'bangkok') {
    for (const l of SKY_LANTERNS) {
      l.y -= l.vy * dt;
      l.x += Math.sin(bgTime * 1.4 + l.sway) * 11 * dt;
      if (l.y < -30) {
        l.y = GROUND_Y - 60;
        l.x = 50 + Math.random() * (WORLD_W - 100);
      }
    }
  }
  if (theme === 'moon') {
    if (SHOOTING_STAR.life > 0) {
      SHOOTING_STAR.x += SHOOTING_STAR.vx * dt;
      SHOOTING_STAR.y += SHOOTING_STAR.vy * dt;
      SHOOTING_STAR.life -= dt;
    } else {
      SHOOTING_STAR.cooldown -= dt;
      if (SHOOTING_STAR.cooldown <= 0) {
        SHOOTING_STAR.x = 80 + Math.random() * 520;
        SHOOTING_STAR.y = 26 + Math.random() * 110;
        SHOOTING_STAR.vx = 340 + Math.random() * 180;
        SHOOTING_STAR.vy = 95 + Math.random() * 80;
        SHOOTING_STAR.life = 0.65;
        SHOOTING_STAR.cooldown = 2.8 + Math.random() * 3.8;
      }
    }
  }
}

export function drawTwinklingStars(ctx: CanvasRenderingContext2D, bgTime: number, maxY: number): void {
  for (const s of BG_STARS) {
    if (s.y > maxY) continue;
    const alpha = 0.28 + 0.72 * Math.abs(Math.sin(bgTime * 1.9 + s.phase));
    ctx.globalAlpha = alpha;
    ctx.fillStyle = s.tint;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export function drawBird(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  flapPhase: number,
  color = '#1e293b'
): void {
  const flap = Math.sin(flapPhase) * size * 0.55;
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1.5, size * 0.16);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - size, y - flap);
  ctx.quadraticCurveTo(x - size * 0.4, y - size * 0.45, x, y);
  ctx.quadraticCurveTo(x + size * 0.4, y - size * 0.45, x + size, y - flap);
  ctx.stroke();
}

export function drawSwayingPalm(
  ctx: CanvasRenderingContext2D,
  baseX: number,
  dir: 1 | -1,
  height: number,
  swayPhase: number,
  bgTime: number
): void {
  const sway = Math.sin(bgTime * 2.0 + swayPhase) * 9;
  const topX = baseX + dir * (height * 0.27) + sway;
  const topY = GROUND_Y - height;

  // Segmented curved palm trunk
  ctx.save();
  ctx.strokeStyle = '#3b2110';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(baseX, GROUND_Y);
  ctx.quadraticCurveTo(baseX + dir * 20 + sway * 0.35, GROUND_Y - height * 0.55, topX, topY);
  ctx.stroke();

  ctx.strokeStyle = '#6b3e22';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Coconuts cluster
  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.arc(topX - 4, topY + 6, 4.5, 0, Math.PI * 2);
  ctx.arc(topX + 4, topY + 7, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Layered tropical palm fronds (shadow + sunlit green)
  for (let a = 0; a < 7; a++) {
    const ang = -Math.PI * 0.96 + a * 0.44 + sway * 0.011;
    const fx = topX + Math.cos(ang) * 44;
    const fy = topY + Math.sin(ang) * 25;
    ctx.fillStyle = a % 2 === 0 ? '#14532d' : '#166534';
    ctx.beginPath();
    ctx.ellipse(fx, fy, 48, 10.5, ang, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(74, 222, 128, 0.28)';
    ctx.beginPath();
    ctx.ellipse(fx, fy - 2, 34, 4.5, ang, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function drawWaterShimmer(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  yTop: number,
  rows: number,
  rowGap: number,
  baseWidth: number,
  color: string,
  bgTime: number
): void {
  ctx.fillStyle = color;
  for (let i = 0; i < rows; i++) {
    const rw = Math.max(18, baseWidth - i * (baseWidth / (rows + 2))) + Math.sin(bgTime * 3.8 + i * 1.1) * 14;
    const rx = centerX - rw / 2 + Math.cos(bgTime * 2.4 + i) * 7;
    ctx.beginPath();
    ctx.roundRect(rx, yTop + i * rowGap, rw, 3.8, 2);
    ctx.fill();
  }
}

import { CEILING_Y, FLOOR_H, GROUND_Y, LEFT_WALL, RIGHT_WALL, WALL_THICKNESS, WORLD_H, WORLD_W } from './levels';
import { ThemeId } from './types';
import {
  DUST_PARTICLES,
  PETALS,
  RAIN_DROPS,
  SHOOTING_STAR,
  SKY_LANTERNS,
  SNOW_FLAKES,
  drawBird,
  drawSwayingPalm,
  drawTwinklingStars,
  drawWaterShimmer,
  fillSky,
  mulberry32,
  paintArchRow,
  paintBackdropFinishing,
  paintCloudBank,
  paintFoliageCluster,
  paintHazeBand,
  paintSculptedMountain,
  paintSkyscraper,
  paintSunWithBloom
} from './bgHelpers';

const staticBackdropCache = new Map<ThemeId, HTMLCanvasElement>();

function getOrRenderStaticBackdrop(theme: ThemeId): HTMLCanvasElement {
  const cached = staticBackdropCache.get(theme);
  if (cached) return cached;

  const off = document.createElement('canvas');
  off.width = WORLD_W;
  off.height = GROUND_Y;
  const octx = off.getContext('2d')!;
  renderStaticBackdrop(octx, theme);
  staticBackdropCache.set(theme, off);
  return off;
}

// =========================================================================
// PART 1: HIGH-DETAIL PAINTERLY STATIC BACKDROP (CACHED PER STAGE)
// =========================================================================
function renderStaticBackdrop(ctx: CanvasRenderingContext2D, theme: ThemeId): void {
  const rand = mulberry32(theme.split('').reduce((acc, c) => acc * 31 + c.charCodeAt(0), 7));

  switch (theme) {
    case 'fuji': {
      fillSky(ctx, [[0, '#1e0a3c'], [0.32, '#7c194f'], [0.64, '#ea580c'], [0.88, '#fbbf24'], [1, '#fef08a']]);
      paintSunWithBloom(ctx, 480, 232, 82, '#fffbeb', '#fb7185', 'rgba(253, 224, 71, 0.45)', true);
      paintCloudBank(ctx, 185, 118, 0.92, '#fed7aa', '#fb923c', '#7c2d12');
      paintCloudBank(ctx, 790, 108, 0.84, '#fde68a', '#f472b6', '#581c87');

      // Distant Hakone mountain silhouettes
      paintSculptedMountain(ctx, -40, 165, 360, 285, GROUND_Y - 72, '#3b1c5a', '#24103e');
      paintSculptedMountain(ctx, 610, 795, 1000, 290, GROUND_Y - 72, '#3b1c5a', '#24103e');
      paintHazeBand(ctx, 270, 390, 'rgba(251, 146, 60, 0.22)');

      // Iconic sculpted Mount Fuji with volcanic gullies
      ctx.fillStyle = '#251748';
      ctx.beginPath();
      ctx.moveTo(145, GROUND_Y - 72);
      ctx.quadraticCurveTo(345, 295, 434, 174);
      ctx.lineTo(526, 174);
      ctx.quadraticCurveTo(615, 295, 815, GROUND_Y - 72);
      ctx.closePath();
      ctx.fill();

      // Lit western slope tint
      ctx.fillStyle = 'rgba(190, 62, 112, 0.32)';
      ctx.beginPath();
      ctx.moveTo(145, GROUND_Y - 72);
      ctx.quadraticCurveTo(345, 295, 434, 174);
      ctx.lineTo(480, 174);
      ctx.lineTo(450, GROUND_Y - 72);
      ctx.closePath();
      ctx.fill();

      // Detailed jagged snow cap with warm sunset rim
      ctx.fillStyle = '#fff7ed';
      ctx.beginPath();
      ctx.moveTo(434, 174);
      ctx.lineTo(526, 174);
      ctx.lineTo(596, 260);
      ctx.lineTo(552, 244);
      ctx.lineTo(522, 272);
      ctx.lineTo(482, 246);
      ctx.lineTo(445, 274);
      ctx.lineTo(412, 245);
      ctx.lineTo(366, 262);
      ctx.closePath();
      ctx.fill();

      // Kawaguchiko Lake + soft reflection of Mount Fuji
      const lakeG = ctx.createLinearGradient(0, GROUND_Y - 76, 0, GROUND_Y);
      lakeG.addColorStop(0, '#4c1d57');
      lakeG.addColorStop(0.5, '#2b1647');
      lakeG.addColorStop(1, '#150d2b');
      ctx.fillStyle = lakeG;
      ctx.fillRect(0, GROUND_Y - 76, WORLD_W, 76);

      ctx.fillStyle = 'rgba(255, 241, 214, 0.12)';
      ctx.beginPath();
      ctx.moveTo(310, GROUND_Y - 76);
      ctx.lineTo(650, GROUND_Y - 76);
      ctx.lineTo(510, GROUND_Y - 12);
      ctx.lineTo(450, GROUND_Y - 12);
      ctx.closePath();
      ctx.fill();

      // Shoreline embankment
      ctx.fillStyle = '#1b1130';
      ctx.fillRect(0, GROUND_Y - 80, WORLD_W, 7);

      // Detailed Chureito 5-story Pagoda (right)
      const px = 812;
      ctx.fillStyle = '#5c1420';
      ctx.fillRect(px - 26, GROUND_Y - 196, 52, 196);
      for (let f = 0; f < 5; f++) {
        const py = GROUND_Y - 38 - f * 35;
        const pw = 96 - f * 10;
        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(px - pw * 0.34, py, pw * 0.68, 24);
        // Illuminated paper shoji windows
        ctx.fillStyle = '#fde68a';
        ctx.fillRect(px - 10, py + 6, 8, 12);
        ctx.fillRect(px + 2, py + 6, 8, 12);
        // Sweeping upturned tiled roof
        ctx.fillStyle = '#1e1b2e';
        ctx.beginPath();
        ctx.moveTo(px - pw * 0.62, py + 5);
        ctx.quadraticCurveTo(px, py - 15, px + pw * 0.62, py + 5);
        ctx.lineTo(px + pw * 0.45, py + 10);
        ctx.lineTo(px - pw * 0.45, py + 10);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      // Golden Sorin spire
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(px - 2, GROUND_Y - 232, 4, 34);
      ctx.beginPath();
      ctx.arc(px, GROUND_Y - 232, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Vermilion Torii Gate (left)
      const tx = 138;
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(tx - 34, GROUND_Y - 110, 11, 110);
      ctx.fillRect(tx + 23, GROUND_Y - 110, 11, 110);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(tx - 54, GROUND_Y - 112, 108, 10);
      ctx.fillStyle = '#18181b';
      ctx.beginPath();
      ctx.moveTo(tx - 60, GROUND_Y - 116);
      ctx.quadraticCurveTo(tx, GROUND_Y - 108, tx + 60, GROUND_Y - 116);
      ctx.lineTo(tx + 54, GROUND_Y - 110);
      ctx.lineTo(tx - 54, GROUND_Y - 110);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(tx - 42, GROUND_Y - 90, 84, 7);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(tx - 6, GROUND_Y - 106, 12, 18);

      // Framing Sakura branches in top corners
      paintFoliageCluster(ctx, 52, 58, 72, '#831843', '#db2777', '#fbcfe8', rand);
      paintFoliageCluster(ctx, 132, 34, 54, '#9d174d', '#f472b6', '#fce7f3', rand);
      paintFoliageCluster(ctx, 908, 50, 68, '#831843', '#db2777', '#fbcfe8', rand);
      paintBackdropFinishing(ctx, 0.22);
      break;
    }

    case 'pyramids': {
      fillSky(ctx, [[0, '#172554'], [0.3, '#9a3412'], [0.65, '#d97706'], [0.88, '#fbbf24'], [1, '#fef3c7']]);
      paintSunWithBloom(ctx, 765, 116, 46, '#fffbeb', '#fde047', 'rgba(253, 224, 71, 0.45)', true);
      paintCloudBank(ctx, 250, 96, 0.9, '#fef3c7', '#fdba74', '#b45309');

      // Far desert dunes with warm atmospheric glow
      ctx.fillStyle = '#c26d2d';
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y - 82);
      ctx.quadraticCurveTo(220, GROUND_Y - 135, 480, GROUND_Y - 76);
      ctx.quadraticCurveTo(730, GROUND_Y - 118, WORLD_W, GROUND_Y - 74);
      ctx.lineTo(WORLD_W, GROUND_Y);
      ctx.lineTo(0, GROUND_Y);
      ctx.fill();

      // Nile oasis strip in mid-distance
      ctx.fillStyle = '#0369a1';
      ctx.fillRect(0, GROUND_Y - 68, 175, 10);
      paintFoliageCluster(ctx, 64, GROUND_Y - 86, 28, '#14532d', '#15803d', '#4ade80', rand);
      paintFoliageCluster(ctx, 118, GROUND_Y - 82, 22, '#14532d', '#16a34a', '#86efac', rand);

      // Detailed Stepped Pyramids of Giza (Menkaure, Khufu, Khafre)
      const drawPyramid = (cx: number, bw: number, h: number) => {
        const apexY = GROUND_Y - h;
        const ridgeX = cx + bw * 0.1;

        // Lit limestone face
        const lg = ctx.createLinearGradient(cx - bw / 2, apexY, ridgeX, GROUND_Y);
        lg.addColorStop(0, '#fef08a');
        lg.addColorStop(0.5, '#eab308');
        lg.addColorStop(1, '#b45309');
        ctx.fillStyle = lg;
        ctx.beginPath();
        ctx.moveTo(cx, apexY);
        ctx.lineTo(cx - bw / 2, GROUND_Y);
        ctx.lineTo(ridgeX, GROUND_Y);
        ctx.closePath();
        ctx.fill();

        // Shaded face
        const sg = ctx.createLinearGradient(cx, apexY, cx + bw / 2, GROUND_Y);
        sg.addColorStop(0, '#92400e');
        sg.addColorStop(1, '#451a03');
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.moveTo(cx, apexY);
        ctx.lineTo(ridgeX, GROUND_Y);
        ctx.lineTo(cx + bw / 2, GROUND_Y);
        ctx.closePath();
        ctx.fill();

        // Subtle horizontal masonry block courses
        ctx.strokeStyle = 'rgba(69, 26, 3, 0.22)';
        ctx.lineWidth = 1;
        for (let row = 1; row < 12; row++) {
          const frac = row / 12;
          const ry = apexY + h * frac;
          const lx = cx - (bw / 2) * frac;
          const rx = cx + (bw / 2) * frac;
          ctx.beginPath();
          ctx.moveTo(lx, ry);
          ctx.lineTo(rx, ry);
          ctx.stroke();
        }
      };

      drawPyramid(205, 250, 170);
      drawPyramid(468, 360, 238);
      drawPyramid(695, 210, 140);

      // Sculpted Great Sphinx of Giza (right foreground)
      ctx.fillStyle = '#92400e';
      ctx.beginPath();
      ctx.roundRect(752, GROUND_Y - 46, 134, 46, [12, 18, 0, 0]);
      ctx.fill();
      // Extended lion paws
      ctx.fillStyle = '#b45309';
      ctx.fillRect(722, GROUND_Y - 18, 56, 18);
      // Nemes royal headdress & sculpted face
      ctx.fillStyle = '#a16207';
      ctx.beginPath();
      ctx.moveTo(758, GROUND_Y - 44);
      ctx.lineTo(768, GROUND_Y - 82);
      ctx.lineTo(804, GROUND_Y - 82);
      ctx.lineTo(816, GROUND_Y - 44);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.ellipse(786, GROUND_Y - 64, 13, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      // Headdress stripes
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 1.6;
      for (let s = 0; s < 4; s++) {
        ctx.beginPath();
        ctx.moveTo(762, GROUND_Y - 72 + s * 6);
        ctx.lineTo(774, GROUND_Y - 72 + s * 6);
        ctx.moveTo(798, GROUND_Y - 72 + s * 6);
        ctx.lineTo(810, GROUND_Y - 72 + s * 6);
        ctx.stroke();
      }

      // Foreground rippled sandbank
      const dg = ctx.createLinearGradient(0, GROUND_Y - 26, 0, GROUND_Y);
      dg.addColorStop(0, '#d97706');
      dg.addColorStop(1, '#78350f');
      ctx.fillStyle = dg;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y - 14);
      ctx.quadraticCurveTo(260, GROUND_Y - 30, 520, GROUND_Y - 16);
      ctx.quadraticCurveTo(760, GROUND_Y - 28, WORLD_W, GROUND_Y - 12);
      ctx.lineTo(WORLD_W, GROUND_Y);
      ctx.lineTo(0, GROUND_Y);
      ctx.fill();
      paintBackdropFinishing(ctx, 0.22);
      break;
    }

    case 'neon': {
      fillSky(ctx, [[0, '#04010d'], [0.45, '#170636'], [0.8, '#4a116b'], [1, '#be185d']]);
      // Sliced synthwave retro sun
      ctx.save();
      ctx.beginPath();
      ctx.arc(480, 178, 82, 0, Math.PI * 2);
      ctx.clip();
      const mg = ctx.createLinearGradient(0, 96, 0, 260);
      mg.addColorStop(0, '#fef08a');
      mg.addColorStop(0.5, '#fb7185');
      mg.addColorStop(1, '#c026d3');
      ctx.fillStyle = mg;
      ctx.fillRect(390, 90, 180, 180);
      ctx.fillStyle = '#170636';
      for (let sy = 186; sy < 260; sy += 11) {
        ctx.fillRect(390, sy, 180, (sy - 178) * 0.08 + 2);
      }
      ctx.restore();

      // Distant atmospheric skyline
      for (let i = 0; i < 16; i++) {
        const bx = i * 62;
        const bh = 120 + rand() * 145;
        ctx.fillStyle = '#1e0b38';
        ctx.fillRect(bx, GROUND_Y - bh, 56, bh);
      }

      // Illuminated Tokyo Tower in mid-distance
      ctx.strokeStyle = '#fb923c';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(436, GROUND_Y - 32);
      ctx.quadraticCurveTo(472, GROUND_Y - 160, 477, GROUND_Y - 295);
      ctx.lineTo(483, GROUND_Y - 295);
      ctx.quadraticCurveTo(488, GROUND_Y - 160, 524, GROUND_Y - 32);
      ctx.stroke();
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(462, GROUND_Y - 165, 36, 10);
      ctx.fillRect(470, GROUND_Y - 230, 20, 8);
      ctx.fillRect(479, GROUND_Y - 332, 2.5, 38);

      // Foreground detailed Neo-Tokyo skyscrapers
      const blds: [number, number, number, string][] = [
        [20, 82, 235, '#22d3ee'],
        [108, 92, 305, '#f43f5e'],
        [206, 76, 208, '#a855f7'],
        [288, 84, 260, '#22d3ee'],
        [585, 86, 272, '#f43f5e'],
        [678, 76, 214, '#fde047'],
        [760, 94, 310, '#22d3ee'],
        [860, 82, 240, '#f43f5e']
      ];
      for (const [bx, bw, bh, accent] of blds) {
        paintSkyscraper(ctx, bx, bw, bh, '#0b041c', '#05010d', `${accent}66`, accent, rand);
      }

      // Elevated monorail guideway bridge
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, GROUND_Y - 62, WORLD_W, 12);
      ctx.fillStyle = '#22d3ee';
      ctx.fillRect(0, GROUND_Y - 62, WORLD_W, 2);
      for (let px = 60; px < WORLD_W; px += 140) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(px, GROUND_Y - 50, 14, 50);
      }

      // Wet neon street reflection strip at base
      const wg = ctx.createLinearGradient(0, GROUND_Y - 26, 0, GROUND_Y);
      wg.addColorStop(0, 'rgba(244, 63, 94, 0.25)');
      wg.addColorStop(1, 'rgba(34, 211, 238, 0.3)');
      ctx.fillStyle = wg;
      ctx.fillRect(0, GROUND_Y - 26, WORLD_W, 26);
      paintBackdropFinishing(ctx, 0.28);
      break;
    }

    case 'alps': {
      fillSky(ctx, [[0, '#020617'], [0.45, '#0b1b3a'], [0.8, '#17345e'], [1, '#28527a']]);

      // Far alpine range
      paintSculptedMountain(ctx, -60, 120, 340, 225, GROUND_Y, '#1e3a5f', '#0f213d', '#e0f2fe', 0.34);
      paintSculptedMountain(ctx, 580, 810, 1040, 188, GROUND_Y, '#1e3a5f', '#0f213d', '#e0f2fe', 0.36);

      // Hero jagged Matterhorn peak
      paintSculptedMountain(ctx, 220, 465, 735, 132, GROUND_Y, '#2b4c7e', '#112240', '#f8fafc', 0.42);
      paintHazeBand(ctx, 300, 420, 'rgba(186, 230, 253, 0.16)');

      // Rolling snow slopes + pine tree silhouettes
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y - 76);
      ctx.quadraticCurveTo(260, GROUND_Y - 120, 520, GROUND_Y - 68);
      ctx.quadraticCurveTo(750, GROUND_Y - 108, WORLD_W, GROUND_Y - 62);
      ctx.lineTo(WORLD_W, GROUND_Y);
      ctx.lineTo(0, GROUND_Y);
      ctx.fill();

      // Pine forest silhouettes along slopes
      for (let i = 0; i < 26; i++) {
        const tx = i * 38 + rand() * 14;
        const ty = GROUND_Y - 35 - rand() * 48;
        const th = 26 + rand() * 22;
        ctx.fillStyle = '#0f2942';
        ctx.beginPath();
        ctx.moveTo(tx, ty - th);
        ctx.lineTo(tx - 11, ty);
        ctx.lineTo(tx + 11, ty);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#e0f2fe';
        ctx.beginPath();
        ctx.moveTo(tx, ty - th);
        ctx.lineTo(tx - 5, ty - th * 0.55);
        ctx.lineTo(tx + 5, ty - th * 0.55);
        ctx.closePath();
        ctx.fill();
      }

      // Stone alpine viaduct bridge (Landwasser Viaduct)
      ctx.fillStyle = '#475569';
      ctx.fillRect(280, GROUND_Y - 98, 400, 14);
      for (let a = 0; a < 5; a++) {
        const ax = 294 + a * 76;
        ctx.fillStyle = '#334155';
        ctx.fillRect(ax, GROUND_Y - 84, 16, 84);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(ax + 46, GROUND_Y - 64, 30, Math.PI, 0);
        ctx.stroke();
      }

      // Cozy Swiss timber chalets with snow roofs & warm amber windows
      const drawChalet = (cx: number, cw: number, ch: number) => {
        ctx.fillStyle = '#451a03';
        ctx.fillRect(cx, GROUND_Y - ch, cw, ch);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(cx + 4, GROUND_Y - ch + 6, cw - 8, 12);
        // Snowy gable roof
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.moveTo(cx - 14, GROUND_Y - ch + 4);
        ctx.lineTo(cx + cw / 2, GROUND_Y - ch - 32);
        ctx.lineTo(cx + cw + 14, GROUND_Y - ch + 4);
        ctx.closePath();
        ctx.fill();
        // Glowing windows
        ctx.fillStyle = '#fde047';
        ctx.fillRect(cx + 14, GROUND_Y - ch + 22, 16, 15);
        ctx.fillRect(cx + cw - 30, GROUND_Y - ch + 22, 16, 15);
      };
      drawChalet(96, 84, 58);
      drawChalet(772, 80, 52);
      paintBackdropFinishing(ctx, 0.24);
      break;
    }

    case 'caribbean': {
      fillSky(ctx, [[0, '#2e1065'], [0.34, '#db2777'], [0.66, '#f97316'], [0.9, '#fde047'], [1, '#fef9c3']]);
      paintSunWithBloom(ctx, 480, 268, 66, '#fffbeb', '#fb923c', 'rgba(253, 224, 71, 0.45)', true);
      paintCloudBank(ctx, 210, 125, 1.0, '#fef08a', '#f472b6', '#701a75');
      paintCloudBank(ctx, 760, 110, 0.9, '#fef08a', '#fb923c', '#831843');

      // Distant volcanic tropical islands
      ctx.fillStyle = '#4c1d95';
      ctx.beginPath();
      ctx.moveTo(540, GROUND_Y - 140);
      ctx.quadraticCurveTo(640, 255, 735, GROUND_Y - 140);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#581c87';
      ctx.beginPath();
      ctx.moveTo(120, GROUND_Y - 140);
      ctx.quadraticCurveTo(215, 290, 310, GROUND_Y - 140);
      ctx.closePath();
      ctx.fill();

      // Layered turquoise Caribbean Sea
      const sea = ctx.createLinearGradient(0, GROUND_Y - 142, 0, GROUND_Y - 26);
      sea.addColorStop(0, '#0369a1');
      sea.addColorStop(0.5, '#0891b2');
      sea.addColorStop(1, '#2dd4bf');
      ctx.fillStyle = sea;
      ctx.fillRect(0, GROUND_Y - 142, WORLD_W, 118);

      // Wooden tropical pier extending into bay (right-mid)
      ctx.fillStyle = '#451a03';
      for (let px = 670; px <= 830; px += 32) {
        ctx.fillRect(px, GROUND_Y - 102, 7, 52);
      }
      ctx.fillStyle = '#78350f';
      ctx.fillRect(658, GROUND_Y - 106, 195, 9);
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(668, GROUND_Y - 116, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Golden sandy beach
      const sand = ctx.createLinearGradient(0, GROUND_Y - 30, 0, GROUND_Y);
      sand.addColorStop(0, '#fde68a');
      sand.addColorStop(1, '#d97706');
      ctx.fillStyle = sand;
      ctx.fillRect(0, GROUND_Y - 28, WORLD_W, 28);
      paintBackdropFinishing(ctx, 0.16);
      break;
    }

    case 'temple': {
      fillSky(ctx, [[0, '#1a0705'], [0.35, '#581c87'], [0.7, '#b45309'], [0.92, '#f59e0b'], [1, '#fef08a']]);
      paintSunWithBloom(ctx, 480, 196, 70, '#fffbeb', '#f59e0b', 'rgba(251, 191, 36, 0.35)', true);
      paintCloudBank(ctx, 180, 108, 0.85, '#fde68a', '#d97706', '#4c1d95');
      paintCloudBank(ctx, 790, 115, 0.8, '#fde68a', '#c2410c', '#3b0764');

      // Jungle canopy silhouettes behind temple
      paintFoliageCluster(ctx, 120, GROUND_Y - 60, 86, '#14261c', '#1e3a2b', '#3f6212', rand);
      paintFoliageCluster(ctx, 840, GROUND_Y - 60, 86, '#14261c', '#1e3a2b', '#3f6212', rand);

      // Ornate Angkor-inspired tiered golden temple spires
      const drawSpire = (cx: number, baseW: number, h: number, mainCol: string, rimCol: string) => {
        for (let t = 0; t < 6; t++) {
          const frac = t / 6;
          const tw = baseW * (1 - frac * 0.72);
          const th = h / 6;
          const ty = GROUND_Y - 90 - (t + 1) * th;
          ctx.fillStyle = mainCol;
          ctx.beginPath();
          ctx.roundRect(cx - tw / 2, ty, tw, th + 2, 3);
          ctx.fill();
          ctx.strokeStyle = rimCol;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        // Finial tip
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.moveTo(cx - 8, GROUND_Y - 90 - h);
        ctx.lineTo(cx, GROUND_Y - 122 - h);
        ctx.lineTo(cx + 8, GROUND_Y - 90 - h);
        ctx.closePath();
        ctx.fill();
      };

      drawSpire(340, 84, 130, '#92400e', '#fbbf24');
      drawSpire(620, 84, 130, '#92400e', '#fbbf24');
      drawSpire(480, 124, 195, '#b45309', '#fde047');

      // Grand temple sanctuary terrace
      ctx.fillStyle = '#78350f';
      ctx.fillRect(220, GROUND_Y - 102, 520, 102);
      paintArchRow(ctx, 260, GROUND_Y - 78, 7, 64, 34, 62, '#291005', '#f59e0b');

      // Carved stone pillars for flickering fire braziers
      [110, 240, 720, 850].forEach((px, idx) => {
        const h = idx === 0 || idx === 3 ? 168 : 126;
        ctx.fillStyle = '#92400e';
        ctx.fillRect(px - 15, GROUND_Y - h, 30, h);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(px - 20, GROUND_Y - h, 40, 10);
        ctx.fillRect(px - 18, GROUND_Y - 14, 36, 14);
      });
      paintBackdropFinishing(ctx, 0.24);
      break;
    }

    case 'rio': {
      fillSky(ctx, [[0, '#0369a1'], [0.38, '#38bdf8'], [0.72, '#fde047'], [0.92, '#fb923c'], [1, '#f472b6']]);
      paintSunWithBloom(ctx, 158, 120, 48, '#fffbeb', '#fde047', 'rgba(254, 240, 138, 0.45)', true);
      paintCloudBank(ctx, 430, 95, 0.92, '#fffbeb', '#fed7aa', '#c084fc');
      paintCloudBank(ctx, 795, 108, 0.78, '#fffbeb', '#fbcfe8', '#7e22ce');

      // Distant Tijuca mountain ridge
      ctx.fillStyle = '#1e4d5c';
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y - 82);
      ctx.quadraticCurveTo(180, 260, 420, 310);
      ctx.quadraticCurveTo(600, 245, WORLD_W, GROUND_Y - 82);
      ctx.lineTo(WORLD_W, GROUND_Y);
      ctx.lineTo(0, GROUND_Y);
      ctx.fill();

      // Corcovado lush emerald peak
      ctx.fillStyle = '#14532d';
      ctx.beginPath();
      ctx.moveTo(45, GROUND_Y - 68);
      ctx.quadraticCurveTo(220, 175, 295, 168);
      ctx.quadraticCurveTo(368, 178, 485, GROUND_Y - 68);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#166534';
      ctx.beginPath();
      ctx.moveTo(45, GROUND_Y - 68);
      ctx.quadraticCurveTo(220, 175, 295, 168);
      ctx.lineTo(295, GROUND_Y - 68);
      ctx.closePath();
      ctx.fill();

      // Detailed Art Deco Cristo Redentor statue
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(286, 158, 18, 14);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(290, 114, 10, 46);
      ctx.fillRect(256, 124, 78, 7.5);
      ctx.beginPath();
      ctx.arc(295, 108, 5.5, 0, Math.PI * 2);
      ctx.fill();

      // Morro da Urca & iconic Sugarloaf (Pão de Açúcar)
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.moveTo(535, GROUND_Y - 68);
      ctx.quadraticCurveTo(615, 224, 690, GROUND_Y - 68);
      ctx.closePath();
      ctx.fill();

      const sugarG = ctx.createLinearGradient(700, 145, 895, GROUND_Y - 68);
      sugarG.addColorStop(0, '#1e5631');
      sugarG.addColorStop(0.6, '#14532d');
      sugarG.addColorStop(1, '#0c2e19');
      ctx.fillStyle = sugarG;
      ctx.beginPath();
      ctx.moveTo(672, GROUND_Y - 68);
      ctx.quadraticCurveTo(752, 142, 792, 148);
      ctx.quadraticCurveTo(845, 152, 905, GROUND_Y - 68);
      ctx.closePath();
      ctx.fill();

      // Sparkling Guanabara Bay
      const bay = ctx.createLinearGradient(0, GROUND_Y - 82, 0, GROUND_Y - 24);
      bay.addColorStop(0, '#0284c7');
      bay.addColorStop(1, '#0ea5e9');
      ctx.fillStyle = bay;
      ctx.fillRect(0, GROUND_Y - 82, WORLD_W, 58);

      // Copacabana iconic black-and-white Portuguese wave mosaic promenade
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, GROUND_Y - 24, WORLD_W, 24);
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 4.5;
      for (let row = 0; row < 2; row++) {
        ctx.beginPath();
        for (let x = 0; x <= WORLD_W; x += 16) {
          ctx.lineTo(x, GROUND_Y - 17 + row * 10 + Math.sin(x * 0.085) * 4);
        }
        ctx.stroke();
      }
      paintBackdropFinishing(ctx, 0.16);
      break;
    }

    case 'saopaulo': {
      fillSky(ctx, [[0, '#040817'], [0.42, '#0f1e45'], [0.78, '#312e81'], [1, '#7c2d12']]);

      // Distant urban glow & Paulista skyline
      const spBlds: [number, number, number][] = [
        [12, 68, 215], [86, 78, 285], [170, 62, 232], [238, 76, 312],
        [635, 82, 278], [724, 72, 242], [802, 86, 316], [894, 62, 224]
      ];
      for (const [bx, bw, bh] of spBlds) {
        paintSkyscraper(ctx, bx, bw, bh, '#0f172a', '#020617', 'rgba(253, 224, 71, 0.42)', null, rand);
      }

      // Broadcast towers on Av. Paulista
      [125, 276, 845].forEach((tx, i) => {
        const baseH = i === 0 ? 285 : i === 1 ? 312 : 316;
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(tx, GROUND_Y - baseH);
        ctx.lineTo(tx, GROUND_Y - baseH - 42);
        ctx.stroke();
      });

      // Iconic MASP museum red structural frame (left foreground)
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(102, GROUND_Y - 104, 14, 104);
      ctx.fillRect(244, GROUND_Y - 104, 14, 104);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(94, GROUND_Y - 122, 172, 46);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 4.5;
      ctx.strokeRect(94, GROUND_Y - 122, 172, 46);

      // Pinheiros River dark reflection ribbon
      ctx.fillStyle = '#0c162e';
      ctx.fillRect(0, GROUND_Y - 46, WORLD_W, 46);

      // Ponte Estaiada X-tower structure (cables drawn dynamically in animated pass!)
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 11;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(436, GROUND_Y);
      ctx.lineTo(480, 122);
      ctx.lineTo(524, GROUND_Y);
      ctx.stroke();
      ctx.fillStyle = '#334155';
      ctx.fillRect(270, GROUND_Y - 52, 420, 14);
      paintBackdropFinishing(ctx, 0.25);
      break;
    }

    case 'buenosaires': {
      fillSky(ctx, [[0, '#240b4c'], [0.42, '#9d174d'], [0.76, '#ea580c'], [1, '#fde047']]);
      paintCloudBank(ctx, 215, 112, 0.88, '#fef08a', '#fb7185', '#581c87');
      paintCloudBank(ctx, 760, 104, 0.85, '#fef08a', '#fb923c', '#4c1d95');

      // Monumental Obelisco on Av. 9 de Julio
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(458, GROUND_Y);
      ctx.lineTo(468, 122);
      ctx.lineTo(480, 88);
      ctx.lineTo(492, 122);
      ctx.lineTo(502, GROUND_Y);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.moveTo(480, 88);
      ctx.lineTo(492, 122);
      ctx.lineTo(502, GROUND_Y);
      ctx.lineTo(480, GROUND_Y);
      ctx.closePath();
      ctx.fill();

      // Vibrant Caminito (La Boca) corrugated tin houses with balconies & awnings
      const houses: [number, number, number, string, string][] = [
        [24, 152, 98, '#dc2626', '#fbbf24'],
        [122, 128, 92, '#eab308', '#0284c7'],
        [214, 162, 102, '#0284c7', '#f43f5e'],
        [644, 158, 102, '#ea580c', '#2dd4bf'],
        [746, 134, 92, '#0d9488', '#fbbf24'],
        [838, 166, 98, '#4f46e5', '#f43f5e']
      ];
      for (const [hx, hh, hw, col, trim] of houses) {
        ctx.fillStyle = col;
        ctx.fillRect(hx, GROUND_Y - hh, hw, hh);
        // Corrugated tin vertical ribs
        ctx.strokeStyle = 'rgba(0,0,0,0.12)';
        ctx.lineWidth = 1;
        for (let rx = hx + 6; rx < hx + hw; rx += 7) {
          ctx.beginPath();
          ctx.moveTo(rx, GROUND_Y - hh);
          ctx.lineTo(rx, GROUND_Y);
          ctx.stroke();
        }
        // Cornice & balcony
        ctx.fillStyle = trim;
        ctx.fillRect(hx - 2, GROUND_Y - hh, hw + 4, 8);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(hx + 16, GROUND_Y - hh + 24, 22, 32);
        ctx.fillRect(hx + hw - 38, GROUND_Y - hh + 24, 22, 32);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(hx + 19, GROUND_Y - hh + 27, 16, 26);
        ctx.fillRect(hx + hw - 35, GROUND_Y - hh + 27, 16, 26);
        // Wrought-iron balcony rail
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(hx + 10, GROUND_Y - hh + 52, hw - 20, 12);
      }

      // Belle Époque iron streetlamps
      [346, 614].forEach((lx) => {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(lx - 2.5, GROUND_Y - 96, 5, 96);
        ctx.fillRect(lx - 8, GROUND_Y - 12, 16, 12);
      });
      paintBackdropFinishing(ctx, 0.22);
      break;
    }

    case 'machupicchu': {
      fillSky(ctx, [[0, '#075985'], [0.45, '#38bdf8'], [0.8, '#bae6fd'], [1, '#fef9c3']]);
      paintSunWithBloom(ctx, 185, 118, 46, '#fffbeb', '#fde047', 'rgba(254, 240, 138, 0.4)', true);
      paintCloudBank(ctx, 430, 86, 0.9, '#ffffff', '#e0f2fe', '#94a3b8');

      // Majestic distant Andes peaks
      paintSculptedMountain(ctx, -40, 175, 420, 165, GROUND_Y, '#15803d', '#0f3d26');
      paintSculptedMountain(ctx, 430, 685, 960, 106, GROUND_Y, '#166534', '#0b2d1b');
      paintHazeBand(ctx, 210, 340, 'rgba(224, 242, 254, 0.28)');

      // Stepped Inca agricultural terraces (Andenes) with stone masonry
      for (let s = 0; s < 5; s++) {
        const sx = 115 + s * 34;
        const sw = 540 - s * 68;
        const sy = GROUND_Y - 24 - s * 22;
        ctx.fillStyle = s % 2 === 0 ? '#78716c' : '#57534e';
        ctx.fillRect(sx, sy, sw, 22);
        // Stone block seams
        ctx.strokeStyle = 'rgba(28, 25, 23, 0.35)';
        ctx.lineWidth = 1;
        for (let bx = sx + 18; bx < sx + sw; bx += 22) {
          ctx.beginPath();
          ctx.moveTo(bx, sy);
          ctx.lineTo(bx, sy + 22);
          ctx.stroke();
        }
        // Lush emerald grass terrace top
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(sx, sy, sw, 5);
      }

      // Iconic stone sanctuary ruins
      const drawStoneHouse = (x: number, y: number, w: number, h: number) => {
        ctx.fillStyle = '#a8a29e';
        ctx.beginPath();
        ctx.moveTo(x, y + h);
        ctx.lineTo(x, y + 14);
        ctx.lineTo(x + w / 2, y);
        ctx.lineTo(x + w, y + 14);
        ctx.lineTo(x + w, y + h);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#44403c';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // Trapezoidal Inca doorway
        ctx.fillStyle = '#1c1917';
        ctx.beginPath();
        ctx.moveTo(x + w * 0.38, y + h);
        ctx.lineTo(x + w * 0.42, y + h - 24);
        ctx.lineTo(x + w * 0.58, y + h - 24);
        ctx.lineTo(x + w * 0.62, y + h);
        ctx.closePath();
        ctx.fill();
      };
      drawStoneHouse(270, GROUND_Y - 166, 78, 56);
      drawStoneHouse(386, GROUND_Y - 178, 102, 68);
      paintBackdropFinishing(ctx, 0.16);
      break;
    }

    case 'habana': {
      fillSky(ctx, [[0, '#0284c7'], [0.42, '#f59e0b'], [0.78, '#fbbf24'], [1, '#fef3c7']]);
      paintSunWithBloom(ctx, 795, 118, 46, '#fffbeb', '#fde047', 'rgba(253, 224, 71, 0.45)', false);
      paintCloudBank(ctx, 210, 96, 0.85, '#fffbeb', '#fed7aa', '#d97706');

      // Caribbean Sea behind Malecón
      ctx.fillStyle = '#0369a1';
      ctx.fillRect(0, GROUND_Y - 82, WORLD_W, 82);

      // El Capitolio dome rising in background
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(415, GROUND_Y - 174, 130, 96);
      ctx.beginPath();
      ctx.arc(480, GROUND_Y - 174, 46, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(476, GROUND_Y - 242, 8, 26);

      // Pastel Spanish-colonial mansions with arched colonnades
      const colB: [number, number, number, string][] = [
        [24, 206, 116, '#fb7185'],
        [140, 180, 110, '#fbbf24'],
        [250, 218, 118, '#2dd4bf'],
        [608, 192, 118, '#fb923c'],
        [726, 222, 126, '#f472b6']
      ];
      for (const [bx, bh, bw, col] of colB) {
        ctx.fillStyle = col;
        ctx.fillRect(bx, GROUND_Y - bh, bw, bh);
        ctx.fillStyle = '#fffbeb';
        ctx.fillRect(bx - 3, GROUND_Y - bh, bw + 6, 8);
        paintArchRow(ctx, bx + 12, GROUND_Y - bh + 28, 3, 33, 22, 38, '#1e293b', '#ffffff');
        paintArchRow(ctx, bx + 12, GROUND_Y - bh + 92, 3, 33, 22, 42, '#0f172a', '#ffffff');
      }

      // Malecón seawall promenade
      ctx.fillStyle = '#e7d5be';
      ctx.fillRect(0, GROUND_Y - 36, WORLD_W, 36);
      ctx.fillStyle = '#cbb393';
      ctx.fillRect(0, GROUND_Y - 36, WORLD_W, 6);
      paintBackdropFinishing(ctx, 0.16);
      break;
    }

    case 'vegas': {
      fillSky(ctx, [[0, '#04010f'], [0.48, '#1b0736'], [0.82, '#4a124b'], [1, '#831843']]);

      // Distant Strip resort silhouettes
      for (let i = 0; i < 12; i++) {
        paintSkyscraper(ctx, 18 + i * 78, 68, 115 + rand() * 145, '#120829', '#070312', 'rgba(251, 191, 36, 0.35)', null, rand);
      }

      // Obsidian Luxor Pyramid
      ctx.fillStyle = '#090d1a';
      ctx.beginPath();
      ctx.moveTo(95, GROUND_Y);
      ctx.lineTo(212, GROUND_Y - 155);
      ctx.lineTo(328, GROUND_Y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Glowing Paris Las Vegas Eiffel replica
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(732, GROUND_Y);
      ctx.quadraticCurveTo(784, GROUND_Y - 135, 795, GROUND_Y - 275);
      ctx.quadraticCurveTo(806, GROUND_Y - 135, 858, GROUND_Y);
      ctx.stroke();
      ctx.fillStyle = '#fde047';
      ctx.fillRect(758, GROUND_Y - 96, 74, 8);
      ctx.fillRect(774, GROUND_Y - 165, 42, 6);

      // Iconic Welcome to Las Vegas diamond marquee base
      ctx.fillStyle = '#be123c';
      ctx.beginPath();
      ctx.moveTo(480, 122);
      ctx.lineTo(618, 185);
      ctx.lineTo(480, 248);
      ctx.lineTo(342, 185);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.font = 'bold 11px "Press Start 2P", monospace';
      ctx.fillText('WELCOME TO', 480, 174);
      ctx.font = 'bold 17px "Press Start 2P", monospace';
      ctx.fillStyle = '#fde047';
      ctx.fillText('LAS VEGAS', 480, 204);

      // Bellagio fountain lagoon
      ctx.fillStyle = '#0c1d3d';
      ctx.fillRect(305, GROUND_Y - 18, 350, 18);
      paintBackdropFinishing(ctx, 0.28);
      break;
    }

    case 'nyc': {
      fillSky(ctx, [[0, '#070e20'], [0.44, '#1e3a5f'], [0.76, '#c2410c'], [1, '#fb923c']]);
      paintCloudBank(ctx, 280, 108, 0.85, '#fed7aa', '#fb923c', '#334155');

      // Midtown skyline flankers
      const nyBlds: [number, number, number][] = [
        [24, 62, 175], [228, 66, 210], [302, 72, 245], [380, 52, 200],
        [530, 64, 230], [600, 58, 185], [880, 64, 215]
      ];
      for (const [bx, bw, bh] of nyBlds) {
        paintSkyscraper(ctx, bx, bw, bh, '#1e293b', '#0f172a', 'rgba(254, 240, 138, 0.45)', null, rand);
      }

      // Monumental Art Deco Empire State Building
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(435, GROUND_Y - 266, 90, 266);
      ctx.fillRect(450, GROUND_Y - 318, 60, 52);
      ctx.fillRect(466, GROUND_Y - 348, 28, 30);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(478, GROUND_Y - 398, 4, 50);
      ctx.fillStyle = 'rgba(254, 240, 138, 0.6)';
      for (let wy = GROUND_Y - 252; wy < GROUND_Y - 26; wy += 14) {
        for (let wx = 444; wx < 516; wx += 12) {
          ctx.fillRect(wx, wy, 6, 7);
        }
      }

      // Stone-arch Brooklyn Bridge (right)
      ctx.fillStyle = '#64748b';
      ctx.fillRect(670, GROUND_Y - 185, 44, 185);
      ctx.fillRect(822, GROUND_Y - 185, 44, 185);
      paintArchRow(ctx, 676, GROUND_Y - 165, 2, 17, 13, 44, '#1e293b');
      paintArchRow(ctx, 828, GROUND_Y - 165, 2, 17, 13, 44, '#1e293b');
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(575, GROUND_Y - 58);
      ctx.quadraticCurveTo(692, GROUND_Y - 178, 768, GROUND_Y - 82);
      ctx.quadraticCurveTo(844, GROUND_Y - 178, 960, GROUND_Y - 58);
      ctx.stroke();

      // Verdigris Statue of Liberty (left)
      ctx.fillStyle = '#0f766e';
      ctx.fillRect(132, GROUND_Y - 62, 54, 62);
      ctx.fillStyle = '#2dd4bf';
      ctx.beginPath();
      ctx.moveTo(138, GROUND_Y - 62);
      ctx.lineTo(146, GROUND_Y - 164);
      ctx.lineTo(172, GROUND_Y - 164);
      ctx.lineTo(180, GROUND_Y - 62);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(159, GROUND_Y - 176, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(168, GROUND_Y - 224, 7, 56);
      paintBackdropFinishing(ctx, 0.2);
      break;
    }

    case 'madrid': {
      fillSky(ctx, [[0, '#3b0764'], [0.36, '#be123c'], [0.72, '#ea580c'], [1, '#fef08a']]);
      paintSunWithBloom(ctx, 480, 210, 62, '#fffbeb', '#fb923c', 'rgba(253, 224, 71, 0.4)', true);
      paintCloudBank(ctx, 210, 102, 0.85, '#fef08a', '#fb7185', '#701a75');

      // Ornate Gran Vía domes flanking skyline
      [112, 848].forEach((dx) => {
        ctx.fillStyle = '#92400e';
        ctx.fillRect(dx - 52, GROUND_Y - 156, 104, 156);
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(dx, GROUND_Y - 156, 40, Math.PI, 0);
        ctx.fill();
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(dx - 3, GROUND_Y - 214, 6, 18);
      });

      // Monumental Puerta de Alcalá
      ctx.fillStyle = '#efe1cc';
      ctx.fillRect(232, GROUND_Y - 172, 496, 172);
      ctx.fillStyle = '#d6c1a5';
      ctx.fillRect(226, GROUND_Y - 176, 508, 12);
      // Central triangular pediment
      ctx.beginPath();
      ctx.moveTo(382, GROUND_Y - 176);
      ctx.lineTo(480, GROUND_Y - 228);
      ctx.lineTo(578, GROUND_Y - 176);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#a1886f';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 5 Classic granite arches
      const arches: [number, number, number][] = [
        [264, 48, 86], [346, 52, 92], [448, 64, 112], [562, 52, 92], [648, 48, 86]
      ];
      for (const [ax, aw, ah] of arches) {
        ctx.fillStyle = '#5c3a21';
        ctx.beginPath();
        ctx.arc(ax + aw / 2, GROUND_Y - ah + aw / 2, aw / 2, Math.PI, 0);
        ctx.lineTo(ax + aw, GROUND_Y);
        ctx.lineTo(ax, GROUND_Y);
        ctx.closePath();
        ctx.fill();
      }

      // Fountain of Cibeles basin
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(402, GROUND_Y - 24, 156, 24);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(408, GROUND_Y - 22, 144, 6);
      paintBackdropFinishing(ctx, 0.18);
      break;
    }

    case 'london': {
      fillSky(ctx, [[0, '#0f172a'], [0.46, '#334155'], [0.82, '#64748b'], [1, '#cbd5e1']]);
      paintCloudBank(ctx, 260, 95, 1.0, '#cbd5e1', '#64748b', '#334155');
      paintCloudBank(ctx, 730, 110, 0.92, '#cbd5e1', '#64748b', '#1e293b');

      // Gothic Palace of Westminster & Elizabeth Tower (Big Ben)
      ctx.fillStyle = '#856546';
      ctx.fillRect(325, GROUND_Y - 104, 130, 104);
      paintArchRow(ctx, 336, GROUND_Y - 82, 5, 22, 14, 34, '#fde68a');

      ctx.fillStyle = '#a37b56';
      ctx.fillRect(446, GROUND_Y - 285, 68, 285);
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(440, GROUND_Y - 285);
      ctx.lineTo(480, GROUND_Y - 365);
      ctx.lineTo(520, GROUND_Y - 285);
      ctx.closePath();
      ctx.fill();
      // Glowing golden Big Ben clockface
      ctx.fillStyle = '#fef9c3';
      ctx.beginPath();
      ctx.arc(480, GROUND_Y - 236, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(480, GROUND_Y - 236);
      ctx.lineTo(480, GROUND_Y - 252);
      ctx.moveTo(480, GROUND_Y - 236);
      ctx.lineTo(493, GROUND_Y - 236);
      ctx.stroke();

      // Gothic Tower Bridge
      ctx.fillStyle = '#7c5a43';
      ctx.fillRect(662, GROUND_Y - 186, 42, 186);
      ctx.fillRect(822, GROUND_Y - 186, 42, 186);
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(660, GROUND_Y - 186);
      ctx.lineTo(683, GROUND_Y - 222);
      ctx.lineTo(706, GROUND_Y - 186);
      ctx.moveTo(820, GROUND_Y - 186);
      ctx.lineTo(843, GROUND_Y - 222);
      ctx.lineTo(866, GROUND_Y - 186);
      ctx.fill();
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(704, GROUND_Y - 144, 118, 12);
      ctx.fillRect(570, GROUND_Y - 48, 390, 12);

      // River Thames at base
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, GROUND_Y - 36, WORLD_W, 36);
      paintBackdropFinishing(ctx, 0.22);
      break;
    }

    case 'rome': {
      fillSky(ctx, [[0, '#2e1065'], [0.38, '#9a3412'], [0.75, '#f59e0b'], [1, '#fef08a']]);
      paintSunWithBloom(ctx, 790, 145, 52, '#fffbeb', '#fb923c', 'rgba(253, 224, 71, 0.4)', true);
      paintCloudBank(ctx, 220, 108, 0.9, '#fef08a', '#fdba74', '#9a3412');

      // Distant St. Peter's dome on horizon
      ctx.fillStyle = '#581c45';
      ctx.beginPath();
      ctx.arc(135, GROUND_Y - 82, 32, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(103, GROUND_Y - 82, 64, 82);

      // Monumental Travertine Colosseum
      const cg = ctx.createLinearGradient(210, GROUND_Y - 205, 750, GROUND_Y);
      cg.addColorStop(0, '#e6be94');
      cg.addColorStop(0.55, '#c99763');
      cg.addColorStop(1, '#8c5a32');
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.roundRect(212, GROUND_Y - 202, 536, 202, [20, 20, 0, 0]);
      ctx.fill();

      // Authentic crumbled right upper wall cutout
      ctx.fillStyle = '#b95114';
      ctx.beginPath();
      ctx.moveTo(525, GROUND_Y - 206);
      ctx.lineTo(754, GROUND_Y - 206);
      ctx.lineTo(754, GROUND_Y - 130);
      ctx.lineTo(605, GROUND_Y - 146);
      ctx.closePath();
      ctx.fill();

      // Three tiers of floodlit Roman arches
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 10; col++) {
          if (row === 0 && col > 5) continue;
          const ax = 238 + col * 49;
          const ay = GROUND_Y - 166 + row * 54;
          ctx.fillStyle = row === 2 ? '#fbbf24' : '#4a2a14';
          ctx.beginPath();
          ctx.arc(ax + 12, ay + 12, 12, Math.PI, 0);
          ctx.fill();
          ctx.fillRect(ax, ay + 12, 24, 26);
        }
      }
      paintBackdropFinishing(ctx, 0.2);
      break;
    }

    case 'moscow': {
      fillSky(ctx, [[0, '#050819'], [0.48, '#172554'], [0.82, '#3730a3'], [1, '#6366f1']]);

      // Kremlin red brick wall & Spasskaya Tower
      ctx.fillStyle = '#7f1d1d';
      ctx.fillRect(25, GROUND_Y - 86, 910, 86);
      for (let mx = 34; mx < 925; mx += 26) {
        ctx.fillRect(mx, GROUND_Y - 98, 14, 12);
      }
      // Spasskaya Clock Tower (left)
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(108, GROUND_Y - 196, 52, 196);
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.moveTo(104, GROUND_Y - 196);
      ctx.lineTo(134, GROUND_Y - 262);
      ctx.lineTo(164, GROUND_Y - 196);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(134, GROUND_Y - 160, 12, 0, Math.PI * 2);
      ctx.fill();
      // Glowing ruby Kremlin star
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(134, GROUND_Y - 268, 7, 0, Math.PI * 2);
      ctx.fill();

      // Dazzling St. Basil's Cathedral
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(280, GROUND_Y - 124, 400, 124);
      const domes: [number, number, number, string, string][] = [
        [330, 186, 28, '#facc15', '#dc2626'],
        [405, 230, 33, '#38bdf8', '#f8fafc'],
        [480, 286, 40, '#f43f5e', '#fde047'],
        [555, 230, 33, '#10b981', '#fef08a'],
        [630, 186, 28, '#a855f7', '#38bdf8']
      ];
      for (const [dx, dh, dr, col, stripe] of domes) {
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(dx - dr * 0.52, GROUND_Y - dh, dr * 1.04, dh - 102);
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(dx, GROUND_Y - dh, dr, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = stripe;
        ctx.lineWidth = 3.2;
        ctx.beginPath();
        ctx.arc(dx, GROUND_Y - dh, dr * 0.66, -0.5, 2.5);
        ctx.stroke();
        // Onion spire tip
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.moveTo(dx - dr * 0.48, GROUND_Y - dh - dr * 0.6);
        ctx.lineTo(dx, GROUND_Y - dh - dr * 1.65);
        ctx.lineTo(dx + dr * 0.48, GROUND_Y - dh - dr * 0.6);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(dx, GROUND_Y - dh - dr * 1.65, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      paintBackdropFinishing(ctx, 0.24);
      break;
    }

    case 'delhi': {
      fillSky(ctx, [[0, '#3b0764'], [0.36, '#be185d'], [0.7, '#f97316'], [1, '#fef3c7']]);
      paintSunWithBloom(ctx, 480, 200, 74, '#fffbeb', '#fde047', 'rgba(254, 240, 138, 0.4)', true);
      paintCloudBank(ctx, 190, 96, 0.88, '#fef3c7', '#fdba74', '#9d174d');
      paintCloudBank(ctx, 775, 106, 0.85, '#fef3c7', '#fb923c', '#701a75');

      // Pearlescent Ivory Taj Mahal + 4 Minarets
      ctx.fillStyle = '#fffbeb';
      ctx.fillRect(334, GROUND_Y - 178, 292, 118);
      // Central Pishtaq portal frame
      ctx.fillRect(422, GROUND_Y - 200, 116, 140);
      // Grand onion dome
      ctx.beginPath();
      ctx.arc(480, GROUND_Y - 202, 58, Math.PI, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(466, GROUND_Y - 258);
      ctx.lineTo(480, GROUND_Y - 292);
      ctx.lineTo(494, GROUND_Y - 258);
      ctx.closePath();
      ctx.fill();
      // Flank domes
      [374, 586].forEach((fx) => {
        ctx.beginPath();
        ctx.arc(fx, GROUND_Y - 178, 24, Math.PI, 0);
        ctx.fill();
      });
      // 4 Marble Minarets
      [235, 302, 658, 725].forEach((mx) => {
        ctx.fillRect(mx - 8, GROUND_Y - 216, 16, 156);
        ctx.beginPath();
        ctx.arc(mx, GROUND_Y - 216, 10, Math.PI, 0);
        ctx.fill();
      });
      // Recessed shaded archway
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(480, GROUND_Y - 114, 34, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(446, GROUND_Y - 114, 68, 54);

      // Charbagh Gardens & Reflecting Pool
      ctx.fillStyle = '#14532d';
      ctx.fillRect(0, GROUND_Y - 60, WORLD_W, 60);
      const pool = ctx.createLinearGradient(0, GROUND_Y - 60, 0, GROUND_Y);
      pool.addColorStop(0, '#0284c7');
      pool.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = pool;
      ctx.fillRect(350, GROUND_Y - 60, 260, 60);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(344, GROUND_Y - 60, 6, 60);
      ctx.fillRect(610, GROUND_Y - 60, 6, 60);
      paintBackdropFinishing(ctx, 0.18);
      break;
    }

    case 'bangkok': {
      fillSky(ctx, [[0, '#070016'], [0.45, '#3b0764'], [0.78, '#c2410c'], [1, '#fbbf24']]);

      // Ornate Wat Arun (Temple of Dawn) prang spires
      const drawPrang = (cx: number, bw: number, h: number) => {
        const g = ctx.createLinearGradient(cx, GROUND_Y - 64 - h, cx, GROUND_Y - 64);
        g.addColorStop(0, '#fef9c3');
        g.addColorStop(0.55, '#f59e0b');
        g.addColorStop(1, '#78350f');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(cx - bw / 2, GROUND_Y - 64);
        ctx.quadraticCurveTo(cx - bw * 0.2, GROUND_Y - 64 - h * 0.72, cx, GROUND_Y - 64 - h);
        ctx.quadraticCurveTo(cx + bw * 0.2, GROUND_Y - 64 - h * 0.72, cx + bw / 2, GROUND_Y - 64);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      };
      drawPrang(335, 76, 146);
      drawPrang(480, 132, 256);
      drawPrang(625, 76, 146);

      // Chao Phraya River
      const river = ctx.createLinearGradient(0, GROUND_Y - 66, 0, GROUND_Y);
      river.addColorStop(0, '#1e1b4b');
      river.addColorStop(1, '#090d24');
      ctx.fillStyle = river;
      ctx.fillRect(0, GROUND_Y - 66, WORLD_W, 66);
      paintBackdropFinishing(ctx, 0.24);
      break;
    }

    case 'beijing': {
      fillSky(ctx, [[0, '#3b070c'], [0.42, '#991b1b'], [0.76, '#ea580c'], [1, '#fbbf24']]);
      paintSunWithBloom(ctx, 480, 190, 68, '#fef08a', '#f97316', 'rgba(251, 191, 36, 0.35)', true);

      // Dragon-back misty mountain peaks + Great Wall of China
      paintSculptedMountain(ctx, -40, 185, 440, 195, GROUND_Y, '#4c0f19', '#2b060d');
      paintSculptedMountain(ctx, 520, 775, 1020, 182, GROUND_Y, '#4c0f19', '#2b060d');

      ctx.strokeStyle = '#e7e5e4';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(0, 325);
      ctx.quadraticCurveTo(205, 206, 480, 278);
      ctx.quadraticCurveTo(755, 192, WORLD_W, 302);
      ctx.stroke();
      // Great Wall watchtowers
      [[192, 224], [756, 206]].forEach(([wx, wy]) => {
        ctx.fillStyle = '#d6d3d1';
        ctx.fillRect(wx - 12, wy - 18, 24, 24);
        ctx.fillStyle = '#78716c';
        ctx.fillRect(wx - 14, wy - 20, 28, 5);
      });

      // Forbidden City Gate of Supreme Harmony
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(268, GROUND_Y - 114, 424, 114);
      // Imperial lacquered pillars
      ctx.fillStyle = '#dc2626';
      for (let px = 290; px <= 670; px += 38) {
        ctx.fillRect(px, GROUND_Y - 104, 8, 104);
      }
      // Tiered imperial golden roofs
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.moveTo(222, GROUND_Y - 108);
      ctx.quadraticCurveTo(480, GROUND_Y - 155, 738, GROUND_Y - 108);
      ctx.lineTo(712, GROUND_Y - 98);
      ctx.lineTo(248, GROUND_Y - 98);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(295, GROUND_Y - 142);
      ctx.quadraticCurveTo(480, GROUND_Y - 196, 665, GROUND_Y - 142);
      ctx.closePath();
      ctx.fill();
      paintBackdropFinishing(ctx, 0.22);
      break;
    }

    case 'sydney': {
      fillSky(ctx, [[0, '#0c4a6e'], [0.42, '#0284c7'], [0.78, '#7dd3fc'], [1, '#e0f2fe']]);
      paintCloudBank(ctx, 210, 96, 0.9, '#ffffff', '#e0f2fe', '#93c5fd');
      paintCloudBank(ctx, 780, 92, 0.85, '#ffffff', '#e0f2fe', '#93c5fd');

      // Sydney Harbour Bridge grand steel arch + granite pylons
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.arc(625, GROUND_Y - 62, 200, Math.PI, 0);
      ctx.stroke();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      for (let bx = 450; bx <= 800; bx += 22) {
        const dy = Math.sqrt(Math.max(0, 200 * 200 - (bx - 625) * (bx - 625)));
        ctx.beginPath();
        ctx.moveTo(bx, GROUND_Y - 62);
        ctx.lineTo(bx, GROUND_Y - 62 - dy);
        ctx.stroke();
      }
      ctx.fillStyle = '#64748b';
      ctx.fillRect(408, GROUND_Y - 186, 26, 124);
      ctx.fillRect(816, GROUND_Y - 186, 26, 124);

      // Sparkling cobalt Sydney Harbour
      const harb = ctx.createLinearGradient(0, GROUND_Y - 70, 0, GROUND_Y);
      harb.addColorStop(0, '#0369a1');
      harb.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = harb;
      ctx.fillRect(0, GROUND_Y - 70, WORLD_W, 70);

      // Sculptural overlapping shells of the Sydney Opera House
      const sails: [number, number, number][] = [
        [156, 136, 94],
        [226, 174, 114],
        [308, 128, 86],
        [378, 148, 96]
      ];
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(142, GROUND_Y - 62, 342, 16);
      for (const [sx, sh, sw] of sails) {
        const sg = ctx.createLinearGradient(sx, GROUND_Y - 62 - sh, sx + sw, GROUND_Y - 62);
        sg.addColorStop(0, '#ffffff');
        sg.addColorStop(0.7, '#e2e8f0');
        sg.addColorStop(1, '#94a3b8');
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.moveTo(sx, GROUND_Y - 62);
        ctx.quadraticCurveTo(sx + sw * 0.24, GROUND_Y - 62 - sh, sx + sw, GROUND_Y - 62);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      paintBackdropFinishing(ctx, 0.14);
      break;
    }

    case 'honolulu': {
      fillSky(ctx, [[0, '#3b0764'], [0.35, '#db2777'], [0.68, '#f97316'], [0.92, '#fde047'], [1, '#fef9c3']]);

      // Soft tropical Hawaiian rainbow arc
      ['rgba(239,68,68,0.22)', 'rgba(251,191,36,0.22)', 'rgba(34,197,94,0.22)', 'rgba(56,189,248,0.22)'].forEach((col, i) => {
        ctx.strokeStyle = col;
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.arc(480, GROUND_Y - 40, 345 - i * 9, Math.PI * 1.08, Math.PI * 1.92);
        ctx.stroke();
      });

      paintSunWithBloom(ctx, 480, 252, 66, '#fffbeb', '#fb923c', 'rgba(254, 240, 138, 0.45)', true);

      // Diamond Head volcanic crater ridge
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(468, GROUND_Y - 82);
      ctx.lineTo(682, 204);
      ctx.lineTo(796, 234);
      ctx.lineTo(960, GROUND_Y - 82);
      ctx.closePath();
      ctx.fill();

      // Translucent turquoise Waikiki Ocean
      const oc = ctx.createLinearGradient(0, GROUND_Y - 86, 0, GROUND_Y);
      oc.addColorStop(0, '#0284c7');
      oc.addColorStop(0.55, '#06b6d4');
      oc.addColorStop(1, '#2dd4bf');
      ctx.fillStyle = oc;
      ctx.fillRect(0, GROUND_Y - 86, WORLD_W, 86);
      paintBackdropFinishing(ctx, 0.16);
      break;
    }

    case 'moon': {
      fillSky(ctx, [[0, '#010308'], [0.6, '#060a18'], [1, '#121a30']]);

      // Subtle diagonal Milky Way nebula band
      ctx.save();
      ctx.translate(320, 160);
      ctx.rotate(-0.35);
      const neb = ctx.createRadialGradient(0, 0, 12, 0, 0, 320);
      neb.addColorStop(0, 'rgba(99, 102, 241, 0.16)');
      neb.addColorStop(0.5, 'rgba(56, 189, 248, 0.08)');
      neb.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = neb;
      ctx.fillRect(-340, -120, 680, 240);
      ctx.restore();

      // Lunar cratered highlands & Mare ridge
      const lun = ctx.createLinearGradient(0, GROUND_Y - 108, 0, GROUND_Y);
      lun.addColorStop(0, '#94a3b8');
      lun.addColorStop(0.5, '#64748b');
      lun.addColorStop(1, '#334155');
      ctx.fillStyle = lun;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y - 56);
      ctx.quadraticCurveTo(235, GROUND_Y - 105, 480, GROUND_Y - 52);
      ctx.quadraticCurveTo(735, GROUND_Y - 114, WORLD_W, GROUND_Y - 58);
      ctx.lineTo(WORLD_W, GROUND_Y);
      ctx.lineTo(0, GROUND_Y);
      ctx.fill();

      // Sculpted lunar craters with sunlit rim & deep shadow interior
      [[155, GROUND_Y - 26, 40, 12], [435, GROUND_Y - 22, 54, 15], [755, GROUND_Y - 34, 44, 13]].forEach(([cx, cy, rx, ry]) => {
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0.15, Math.PI - 0.15);
        ctx.stroke();
      });

      // Gold-foil Apollo Lunar Module + mission flag
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(192, GROUND_Y - 72);
      ctx.lineTo(170, GROUND_Y - 46);
      ctx.moveTo(238, GROUND_Y - 72);
      ctx.lineTo(260, GROUND_Y - 46);
      ctx.stroke();
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(190, GROUND_Y - 84, 50, 20);
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.roundRect(196, GROUND_Y - 108, 38, 26, 6);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(206, GROUND_Y - 100, 16, 9);
      // Flag
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(282, GROUND_Y - 46);
      ctx.lineTo(282, GROUND_Y - 92);
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(282, GROUND_Y - 92, 24, 14);
      paintBackdropFinishing(ctx, 0.24);
      break;
    }

    case 'mars':
    default: {
      fillSky(ctx, [[0, '#0f0308'], [0.4, '#4c1115'], [0.74, '#9a3412'], [1, '#ea580c']]);

      // Phobos & Deimos Martian moons
      ctx.fillStyle = '#e7e5e4';
      ctx.beginPath();
      ctx.arc(204, 108, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#a8a29e';
      ctx.beginPath();
      ctx.arc(198, 104, 6, 0, Math.PI * 2);
      ctx.arc(212, 114, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#d6d3d1';
      ctx.beginPath();
      ctx.arc(796, 86, 11, 0, Math.PI * 2);
      ctx.fill();

      // Colossal Olympus Mons shield volcano
      paintSculptedMountain(ctx, 130, 480, 830, 164, GROUND_Y - 56, '#7c2d12', '#431407');

      // Valles Marineris layered rust-red mesas & canyons
      ctx.fillStyle = '#9a3412';
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(0, GROUND_Y - 115);
      ctx.lineTo(145, GROUND_Y - 115);
      ctx.lineTo(195, GROUND_Y - 58);
      ctx.lineTo(355, GROUND_Y - 58);
      ctx.lineTo(420, GROUND_Y - 130);
      ctx.lineTo(595, GROUND_Y - 130);
      ctx.lineTo(655, GROUND_Y - 62);
      ctx.lineTo(818, GROUND_Y - 104);
      ctx.lineTo(WORLD_W, GROUND_Y - 104);
      ctx.lineTo(WORLD_W, GROUND_Y);
      ctx.closePath();
      ctx.fill();

      // Sedimentary Martian strata bands
      ctx.fillStyle = 'rgba(253, 186, 116, 0.16)';
      ctx.fillRect(0, GROUND_Y - 94, WORLD_W, 5);
      ctx.fillRect(0, GROUND_Y - 72, WORLD_W, 4);

      const mFloor = ctx.createLinearGradient(0, GROUND_Y - 48, 0, GROUND_Y);
      mFloor.addColorStop(0, '#c2410c');
      mFloor.addColorStop(1, '#7c2d12');
      ctx.fillStyle = mFloor;
      ctx.fillRect(0, GROUND_Y - 48, WORLD_W, 48);
      paintBackdropFinishing(ctx, 0.24);
      break;
    }
  }
}

// =========================================================================
// PART 2: REAL-TIME ANIMATED MIDGROUND & WEATHER LAYER (60FPS)
// =========================================================================
export function drawBackground(
  ctx: CanvasRenderingContext2D,
  theme: ThemeId,
  bgTime: number,
  freezeTimer: number
): void {
  // 1. Blit pre-rendered painterly backdrop in <0.2ms
  const cached = getOrRenderStaticBackdrop(theme);
  ctx.drawImage(cached, 0, 0);

  // 2. Render live destination-specific animation layer
  const t = bgTime;
  switch (theme) {
    case 'fuji': {
      // Drifting mist collar around Mt. Fuji
      ctx.fillStyle = 'rgba(255, 241, 214, 0.14)';
      const mistX = ((t * 14) % (WORLD_W + 260)) - 130;
      ctx.beginPath();
      ctx.ellipse(mistX, 296, 145, 16, 0, 0, Math.PI * 2);
      ctx.fill();

      drawWaterShimmer(ctx, 480, GROUND_Y - 66, 6, 10, 112, 'rgba(253, 224, 71, 0.48)', t);

      // Sakura petals fluttering in the breeze
      ctx.fillStyle = '#fbcfe8';
      for (const p of PETALS) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.48, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      break;
    }

    case 'pyramids': {
      // Animated camel caravan crossing the horizon
      const carX = ((t * 16) % (WORLD_W + 240)) - 180;
      ctx.fillStyle = '#451a03';
      for (let c = 0; c < 4; c++) {
        const cx = carX + c * 42;
        const cy = GROUND_Y - 22 - Math.abs(Math.sin(t * 4 + c)) * 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 11, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, cy - 6, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(cx + 9, cy - 11, 3.5, 11);
        ctx.beginPath();
        ctx.arc(cx + 12, cy - 12, 3.2, 0, Math.PI * 2);
        ctx.fill();
        const stride = Math.sin(t * 5 + c) * 3;
        ctx.fillRect(cx - 7 + stride, cy + 4, 2.2, 11);
        ctx.fillRect(cx + 5 - stride, cy + 4, 2.2, 11);
      }
      // Desert wind sand dust
      ctx.fillStyle = 'rgba(255, 237, 179, 0.48)';
      for (const d of DUST_PARTICLES) {
        ctx.fillRect(d.x, d.y, d.r * 2.1, 1.4);
      }
      break;
    }

    case 'neon': {
      // Flying hover-car light trails in parallax
      for (let i = 0; i < 6; i++) {
        const dir = i % 2 === 0 ? 1 : -1;
        const speed = 78 + (i % 3) * 38;
        const fx = dir > 0
          ? ((t * speed + i * 190) % (WORLD_W + 120)) - 60
          : WORLD_W + 60 - ((t * speed + i * 170) % (WORLD_W + 120));
        const fy = 118 + i * 36;
        ctx.fillStyle = dir > 0 ? '#22d3ee' : '#f43f5e';
        ctx.fillRect(fx, fy, 16, 3.5);
        ctx.fillStyle = dir > 0 ? 'rgba(34,211,238,0.28)' : 'rgba(244,63,94,0.28)';
        ctx.fillRect(fx - dir * 34, fy + 0.5, 34, 2.5);
      }

      // Gliding futuristic Tokyo monorail
      const mx = ((t * 140) % (WORLD_W + 260)) - 180;
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.roundRect(mx, GROUND_Y - 75, 130, 14, 5);
      ctx.fill();
      ctx.fillStyle = '#22d3ee';
      ctx.fillRect(mx + 10, GROUND_Y - 71, 108, 4.5);

      // Flickering vertical neon signs
      [[178, 224, '#f43f5e'], [648, 250, '#fde047'], [834, 210, '#22d3ee']].forEach(([sx, sy, col], idx) => {
        if (Math.sin(t * 7 + idx * 2.3) > -0.65) {
          ctx.fillStyle = col as string;
          ctx.fillRect(sx as number, sy as number, 11, 58);
          ctx.fillStyle = '#ffffff';
          for (let k = 0; k < 4; k++) {
            ctx.fillRect((sx as number) + 2, (sy as number) + 6 + k * 13, 7, 5);
          }
        }
      });

      // Shimmering cyberpunk rain
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.34)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (const r of RAIN_DROPS) {
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x - 3.2, r.y + r.len);
      }
      ctx.stroke();
      break;
    }

    case 'alps': {
      drawTwinklingStars(ctx, t, GROUND_Y * 0.55);

      // Undulating emerald & violet Aurora Borealis ribbons
      for (let band = 0; band < 3; band++) {
        const ag = ctx.createLinearGradient(0, 38 + band * 24, 0, 185 + band * 22);
        ag.addColorStop(0, 'rgba(45, 212, 191, 0)');
        ag.addColorStop(0.5, band === 1 ? 'rgba(139, 92, 246, 0.28)' : 'rgba(45, 212, 191, 0.3)');
        ag.addColorStop(1, 'rgba(45, 212, 191, 0)');
        ctx.fillStyle = ag;
        ctx.beginPath();
        ctx.moveTo(0, 190);
        for (let x = 0; x <= WORLD_W; x += 30) {
          const y = 84 + band * 26 + Math.sin(x * 0.008 + t * (1.1 + band * 0.35) + band) * 24;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(WORLD_W, 215);
        ctx.lineTo(0, 215);
        ctx.closePath();
        ctx.fill();
      }

      // Illuminated Alpine Glacier Express train crossing viaduct
      const trainX = 280 + ((t * 52) % 420) - 40;
      if (trainX > 260 && trainX < 670) {
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(trainX, GROUND_Y - 110, 68, 12);
        ctx.fillStyle = '#fef08a';
        for (let w = 0; w < 5; w++) ctx.fillRect(trainX + 6 + w * 12, GROUND_Y - 107, 8, 5);
      }

      // Chimney smoke rising from chalets
      ctx.fillStyle = 'rgba(226, 232, 240, 0.35)';
      [158, 830].forEach((cx, idx) => {
        for (let s = 0; s < 3; s++) {
          const sy = GROUND_Y - 90 - ((t * 22 + s * 16 + idx * 9) % 46);
          ctx.beginPath();
          ctx.arc(cx + Math.sin(t * 2 + s) * 6, sy, 4.5 + s * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Soft drifting snowfall
      ctx.fillStyle = 'rgba(255,255,255,0.82)';
      for (const f of SNOW_FLAKES) {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * 0.85, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'caribbean': {
      drawWaterShimmer(ctx, 480, GROUND_Y - 134, 6, 15, 108, 'rgba(255, 243, 176, 0.48)', t);

      // Rolling white surf foam
      const waveShift = Math.sin(t * 2.8) * 6;
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y - 24 + waveShift);
      for (let x = 0; x <= WORLD_W; x += 40) {
        ctx.quadraticCurveTo(x + 20, GROUND_Y - 32 + waveShift, x + 40, GROUND_Y - 24 + waveShift);
      }
      ctx.lineTo(WORLD_W, GROUND_Y - 18 + waveShift);
      ctx.lineTo(0, GROUND_Y - 18 + waveShift);
      ctx.closePath();
      ctx.fill();

      drawSwayingPalm(ctx, 72, 1, 208, 0, t);
      drawSwayingPalm(ctx, 888, -1, 194, 1.5, t);

      for (let b = 0; b < 4; b++) {
        const bx = ((t * (42 + b * 7) + b * 240) % (WORLD_W + 80)) - 40;
        const by = 88 + b * 24 + Math.sin(t * 2.5 + b) * 10;
        drawBird(ctx, bx, by, 10, t * 7 + b * 1.4, '#240046');
      }
      break;
    }

    case 'temple': {
      // Flickering fire braziers on the 4 carved stone pillars
      [110, 240, 720, 850].forEach((px, idx) => {
        const h = idx === 0 || idx === 3 ? 168 : 126;
        const fy = GROUND_Y - h - 4;
        const fh = 24 + Math.sin(t * 16 + idx * 2.1) * 5;
        ctx.fillStyle = 'rgba(251, 146, 60, 0.25)';
        ctx.beginPath();
        ctx.arc(px, fy - 10, 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(px - 10, fy);
        ctx.quadraticCurveTo(px, fy - fh - 6, px + 10, fy);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.moveTo(px - 5, fy);
        ctx.quadraticCurveTo(px, fy - fh * 0.65, px + 5, fy);
        ctx.closePath();
        ctx.fill();
      });

      // Ascending golden temple embers
      ctx.fillStyle = 'rgba(254, 240, 138, 0.78)';
      for (const d of DUST_PARTICLES) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'rio': {
      // Glittering Guanabara bay reflections
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      for (let i = 0; i < 10; i++) {
        const sx = (i * 104 + Math.sin(t * 2 + i) * 14) % WORLD_W;
        ctx.fillRect(sx, GROUND_Y - 70 + (i % 3) * 14, 24, 2.5);
      }

      // Twin cables & animated Bondinho cable car between Urca and Pão de Açúcar
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(615, 232);
      ctx.lineTo(788, 162);
      ctx.stroke();

      const cableT = (Math.sin(t * 0.65) + 1) * 0.5;
      const bx = 615 + (788 - 615) * cableT;
      const by = 232 + (162 - 232) * cableT;
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.fillRect(bx - 11, by + 4, 22, 13);
      ctx.strokeRect(bx - 11, by + 4, 22, 13);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(bx - 8, by + 6, 16, 5);

      // Soaring colorful hang-glider
      const gx = ((t * 58) % (WORLD_W + 140)) - 70;
      const gy = 104 + Math.sin(t * 1.8) * 14;
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(gx + 22, gy);
      ctx.lineTo(gx - 12, gy - 10);
      ctx.lineTo(gx - 6, gy + 6);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.moveTo(gx + 22, gy);
      ctx.lineTo(gx - 6, gy + 6);
      ctx.lineTo(gx + 4, gy + 10);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'saopaulo': {
      drawTwinklingStars(ctx, t, 230);

      // Pulsing aviation beacons on Av. Paulista towers
      [125, 276, 845].forEach((tx, idx) => {
        const baseH = idx === 0 ? 285 : idx === 1 ? 312 : 316;
        if (Math.sin(t * 5 + idx) > 0) {
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(tx, GROUND_Y - baseH - 44, 3.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Dynamic multi-color LED illuminated cables on Ponte Estaiada
      const cableGlow = `hsl(${(t * 28) % 360}, 92%, 68%)`;
      ctx.strokeStyle = cableGlow;
      ctx.lineWidth = 2.2;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(480, 146 + i * 16);
        ctx.lineTo(306 + i * 18, GROUND_Y - 50);
        ctx.moveTo(480, 146 + i * 16);
        ctx.lineTo(654 - i * 18, GROUND_Y - 50);
        ctx.stroke();
      }

      // Streaming headlight/taillight traffic trails on Marginal
      for (let f = 0; f < 5; f++) {
        const fx = ((t * 195 + f * 185) % (WORLD_W + 90)) - 45;
        ctx.fillStyle = f % 2 === 0 ? 'rgba(254, 240, 138, 0.85)' : 'rgba(244, 63, 94, 0.85)';
        ctx.fillRect(fx, GROUND_Y - 14 - (f % 2) * 8, 38, 3);
      }

      // Helicopter patrolling night skyline
      const hx = WORLD_W + 60 - ((t * 72) % (WORLD_W + 140));
      const hy = 96 + Math.sin(t * 3) * 6;
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.ellipse(hx, hy, 14, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(hx + 10, hy - 2, 16, 3);
      ctx.fillRect(hx + 24, hy - 7, 3, 8);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      const rotW = 16 + Math.sin(t * 48) * 10;
      ctx.beginPath();
      ctx.moveTo(hx - rotW, hy - 9);
      ctx.lineTo(hx + rotW, hy - 9);
      ctx.stroke();
      if (Math.sin(t * 10) > 0) {
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(hx, hy + 6, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'buenosaires': {
      // Glowing Belle Époque streetlamp halos
      [346, 614].forEach((lx) => {
        const r = 24 + Math.sin(t * 6 + lx) * 2;
        ctx.fillStyle = 'rgba(254, 240, 138, 0.26)';
        ctx.beginPath();
        ctx.arc(lx, GROUND_Y - 98, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(lx, GROUND_Y - 98, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Floating golden tango notes
      ctx.font = 'bold 16px sans-serif';
      PETALS.slice(0, 12).forEach((p, idx) => {
        ctx.fillStyle = idx % 2 === 0 ? 'rgba(255, 243, 176, 0.85)' : 'rgba(255, 179, 198, 0.82)';
        ctx.fillText(idx % 2 === 0 ? '♪' : '♫', p.x, p.y);
      });
      break;
    }

    case 'machupicchu': {
      // Volumetric Andean cloud sea drifting through mountain gorge
      ctx.fillStyle = 'rgba(255,255,255,0.48)';
      for (let c = 0; c < 4; c++) {
        const cx = ((t * (16 + c * 4) + c * 260) % (WORLD_W + 260)) - 130;
        const cy = 192 + (c % 2) * 48;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 118, 22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx + 58, cy - 10, 74, 18, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Majestic Andean Condor soaring
      const cx = ((t * 50) % (WORLD_W + 140)) - 70;
      const cy = 104 + Math.sin(t * 1.4) * 16;
      drawBird(ctx, cx, cy, 22, t * 3.2, '#1c1917');
      break;
    }

    case 'habana': {
      drawSwayingPalm(ctx, 908, -1, 172, 0.8, t);

      // 1950s classic convertibles cruising the Malecón
      ([[0, '#22d3ee', 78, 1], [460, '#fb7185', 64, -1]] as [number, string, number, number][]).forEach(([off, col, spd, dir]) => {
        const x = dir > 0
          ? ((t * spd + off) % (WORLD_W + 180)) - 120
          : WORLD_W + 120 - ((t * spd + off) % (WORLD_W + 180));
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.roundRect(x, GROUND_Y - 40, 88, 18, 6);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(x + 20, GROUND_Y - 52, 44, 15, 7);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(x + 20, GROUND_Y - 22, 8, 0, Math.PI * 2);
        ctx.arc(x + 68, GROUND_Y - 22, 8, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    case 'vegas': {
      drawTwinklingStars(ctx, t, 200);

      // Sweeping Vegas Strip searchlights
      for (let s = 0; s < 3; s++) {
        const bx = 200 + s * 280;
        const ang = Math.sin(t * (1.2 + s * 0.4) + s * 2) * 0.42;
        ctx.save();
        ctx.translate(bx, GROUND_Y);
        ctx.rotate(ang);
        const sg = ctx.createLinearGradient(0, 0, 0, -440);
        sg.addColorStop(0, 'rgba(254, 240, 138, 0.24)');
        sg.addColorStop(1, 'rgba(254, 240, 138, 0)');
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(-56, -440);
        ctx.lineTo(56, -440);
        ctx.lineTo(10, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Luxor vertical sky beam
      ctx.fillStyle = 'rgba(34, 211, 238, 0.22)';
      ctx.beginPath();
      ctx.moveTo(206, GROUND_Y - 155);
      ctx.lineTo(182, 0);
      ctx.lineTo(242, 0);
      ctx.lineTo(218, GROUND_Y - 155);
      ctx.closePath();
      ctx.fill();

      // Chasing neon marquee border around Las Vegas diamond
      ctx.strokeStyle = Math.sin(t * 9) > 0 ? '#fde047' : '#22d3ee';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(480, 122);
      ctx.lineTo(618, 185);
      ctx.lineTo(480, 248);
      ctx.lineTo(342, 185);
      ctx.closePath();
      ctx.stroke();

      // Bellagio choreographed fountains
      for (let f = 0; f < 13; f++) {
        const fh = 34 + Math.abs(Math.sin(t * 4.5 + f * 0.55)) * 70;
        ctx.strokeStyle = f % 2 === 0 ? 'rgba(186, 230, 253, 0.85)' : 'rgba(254, 240, 138, 0.85)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(340 + f * 23, GROUND_Y - 12);
        ctx.lineTo(340 + f * 23, GROUND_Y - 12 - fh);
        ctx.stroke();
      }
      break;
    }

    case 'nyc': {
      drawTwinklingStars(ctx, t, 190);

      // Drifting Manhattan vintage blimp
      const bx = ((t * 28) % (WORLD_W + 160)) - 80;
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.ellipse(bx, 84, 38, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(bx - 18, 82, 36, 4);
      ctx.fillStyle = '#334155';
      ctx.fillRect(bx - 10, 97, 20, 5);

      // Flickering Statue of Liberty golden torch
      const flameR = 8 + Math.sin(t * 11) * 2.2;
      ctx.fillStyle = 'rgba(254, 240, 138, 0.32)';
      ctx.beginPath();
      ctx.arc(171.5, GROUND_Y - 230, flameR * 2.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(171.5, GROUND_Y - 230, flameR, 0, Math.PI * 2);
      ctx.fill();

      // Yellow cabs cruising the avenue
      for (let c = 0; c < 3; c++) {
        const tx = ((t * (88 + c * 22) + c * 310) % (WORLD_W + 120)) - 60;
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.roundRect(tx, GROUND_Y - 22, 48, 14, 4);
        ctx.fill();
        ctx.fillRect(tx + 10, GROUND_Y - 30, 26, 10);
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(tx + 12, GROUND_Y - 8, 5, 0, Math.PI * 2);
        ctx.arc(tx + 36, GROUND_Y - 8, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'madrid': {
      // Animated Fountain of Cibeles water arcs
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.85)';
      ctx.lineWidth = 3;
      for (let j = -2; j <= 2; j++) {
        const jh = 28 + Math.sin(t * 7 + j) * 8;
        ctx.beginPath();
        ctx.moveTo(480 + j * 22, GROUND_Y - 22);
        ctx.quadraticCurveTo(480 + j * 28, GROUND_Y - 22 - jh, 480 + j * 34, GROUND_Y - 18);
        ctx.stroke();
      }

      // White doves gliding
      for (let b = 0; b < 5; b++) {
        const px = ((t * (54 + b * 8) + b * 210) % (WORLD_W + 90)) - 45;
        const py = 82 + b * 22 + Math.sin(t * 3 + b) * 10;
        drawBird(ctx, px, py, 10, t * 9 + b, '#ffffff');
      }
      break;
    }

    case 'london': {
      // Rotating London Eye Ferris Wheel
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(220, GROUND_Y - 148, 96, 0, Math.PI * 2);
      ctx.stroke();
      for (let a = 0; a < 12; a++) {
        const ang = (a * Math.PI) / 6 + t * 0.25;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(220, GROUND_Y - 148);
        ctx.lineTo(220 + Math.cos(ang) * 96, GROUND_Y - 148 + Math.sin(ang) * 96);
        ctx.stroke();
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(220 + Math.cos(ang) * 96, GROUND_Y - 148 + Math.sin(ang) * 96, 4.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Red double-decker Routemaster bus crossing bridge
      const busX = ((t * 68) % (WORLD_W + 140)) - 90;
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.roundRect(busX, GROUND_Y - 78, 66, 30, 5);
      ctx.fill();
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(busX + 6, GROUND_Y - 73, 52, 8);
      ctx.fillRect(busX + 6, GROUND_Y - 61, 46, 8);
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(busX + 14, GROUND_Y - 48, 5, 0, Math.PI * 2);
      ctx.arc(busX + 52, GROUND_Y - 48, 5, 0, Math.PI * 2);
      ctx.fill();

      // Gentle London mist & drizzle
      ctx.fillStyle = 'rgba(226, 232, 240, 0.14)';
      ctx.fillRect(0, GROUND_Y - 110, WORLD_W, 110);
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < 55; i++) {
        const r = RAIN_DROPS[i];
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x - 2, r.y + r.len * 0.8);
      }
      ctx.stroke();
      break;
    }

    case 'rome': {
      // Gently swaying Italian cypresses
      [82, 136, 824, 878].forEach((cx, i) => {
        const sway = Math.sin(t * 1.9 + i) * 5;
        ctx.fillStyle = '#14532d';
        ctx.beginPath();
        ctx.ellipse(cx + sway, GROUND_Y - 78, 15, 76, sway * 0.015, 0, Math.PI * 2);
        ctx.fill();
      });

      // Swooping Roman swallows
      for (let b = 0; b < 6; b++) {
        const prog = ((t * 0.22 + b * 0.05) % 1.2) - 0.1;
        const bx = prog * WORLD_W;
        const by = 136 - Math.sin(prog * Math.PI) * 75 + (b % 3) * 14;
        drawBird(ctx, bx, by, 8.5, t * 10 + b, '#292524');
      }
      break;
    }

    case 'moscow': {
      drawTwinklingStars(ctx, t, 220);

      // Multi-depth Moscow winter blizzard
      for (const f of SNOW_FLAKES) {
        ctx.fillStyle = `rgba(255,255,255,${(0.38 + f.depth * 0.48).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * f.depth, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'delhi': {
      drawWaterShimmer(ctx, 480, GROUND_Y - 54, 5, 10, 165, 'rgba(255, 251, 235, 0.36)', t);

      for (let b = 0; b < 3; b++) {
        drawBird(ctx, ((t * 48 + b * 290) % (WORLD_W + 80)) - 40, 108 + b * 24, 9, t * 7 + b, '#451a03');
      }
      ctx.fillStyle = '#fda4af';
      PETALS.slice(0, 14).forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    case 'bangkok': {
      drawTwinklingStars(ctx, t, 220);
      drawWaterShimmer(ctx, 480, GROUND_Y - 58, 5, 11, 132, 'rgba(251, 191, 36, 0.36)', t);

      // Thai long-tail boats with bow lanterns
      ([[0, 44, 1], [480, 38, -1]] as [number, number, number][]).forEach(([off, spd, dir]) => {
        const bx = dir > 0
          ? ((t * spd + off) % (WORLD_W + 120)) - 60
          : WORLD_W + 60 - ((t * spd + off) % (WORLD_W + 120));
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.moveTo(bx - 28, GROUND_Y - 28);
        ctx.quadraticCurveTo(bx, GROUND_Y - 14, bx + 28, GROUND_Y - 28);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(bx, GROUND_Y - 34, 4.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ascending warm glowing khom loi sky lanterns
      for (const l of SKY_LANTERNS) {
        ctx.fillStyle = 'rgba(251, 191, 36, 0.28)';
        ctx.beginPath();
        ctx.arc(l.x, l.y, 15 * l.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.roundRect(l.x - 6 * l.scale, l.y - 9 * l.scale, 12 * l.scale, 18 * l.scale, 4);
        ctx.fill();
        ctx.fillStyle = '#fffbeb';
        ctx.beginPath();
        ctx.arc(l.x, l.y + 4 * l.scale, 3 * l.scale, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'beijing': {
      // Undulating Imperial Dragon Kite
      const dx = ((t * 62) % (WORLD_W + 260)) - 130;
      for (let seg = 0; seg < 11; seg++) {
        const sx = dx - seg * 15;
        const sy = 128 + Math.sin(t * 5.5 - seg * 0.65) * 16;
        ctx.fillStyle = seg === 0 ? '#fde047' : seg % 2 === 0 ? '#ef4444' : '#f59e0b';
        ctx.beginPath();
        ctx.arc(sx, sy, seg === 0 ? 10.5 : 6.8 - seg * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Gently swaying foreground silk red lanterns
      for (let i = 0; i < 6; i++) {
        const lx = 110 + i * 148;
        const swing = Math.sin(t * 2.4 + i) * 7;
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(lx, 14);
        ctx.lineTo(lx + swing, 62);
        ctx.stroke();
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.ellipse(lx + swing, 74, 15, 19, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fde047';
        ctx.fillRect(lx + swing - 7, 54, 14, 4);
        ctx.fillRect(lx + swing - 7, 92, 14, 4);
      }

      ctx.fillStyle = '#fecdd3';
      PETALS.slice(0, 14).forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    case 'sydney': {
      // Subtle celebratory harbor fireworks
      for (let f = 0; f < 3; f++) {
        const pulse = (t * 0.85 + f * 0.33) % 1;
        if (pulse < 0.7) {
          const fx = 160 + f * 310;
          const fy = 92 + (f % 2) * 34;
          const fr = pulse * 38;
          ctx.strokeStyle = `rgba(255, 240, 150, ${(0.7 - pulse).toFixed(2)})`;
          ctx.lineWidth = 2;
          for (let a = 0; a < 8; a++) {
            const ang = (a * Math.PI) / 4;
            ctx.beginPath();
            ctx.moveTo(fx + Math.cos(ang) * fr * 0.4, fy + Math.sin(ang) * fr * 0.4);
            ctx.lineTo(fx + Math.cos(ang) * fr, fy + Math.sin(ang) * fr);
            ctx.stroke();
          }
        }
      }

      // Sparkling harbor glints
      ctx.fillStyle = 'rgba(255,255,255,0.42)';
      for (let i = 0; i < 9; i++) {
        ctx.fillRect((i * 110 + t * 18) % WORLD_W, GROUND_Y - 54 + (i % 3) * 14, 24, 2.5);
      }

      // White-sailed yachts tacking across the bay
      ([[0, 26, 1], [420, 20, -1]] as [number, number, number][]).forEach(([off, spd, dir]) => {
        const vx = dir > 0
          ? ((t * spd + off) % (WORLD_W + 90)) - 45
          : WORLD_W + 45 - ((t * spd + off) % (WORLD_W + 90));
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(vx, GROUND_Y - 26);
        ctx.lineTo(vx, GROUND_Y - 56);
        ctx.lineTo(vx + dir * 20, GROUND_Y - 26);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(vx - 12, GROUND_Y - 26, 26, 6);
      });
      break;
    }

    case 'honolulu': {
      // Curling turquoise Pacific foam
      const wShift = Math.sin(t * 3.2) * 7;
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y - 30 + wShift);
      for (let x = 0; x <= WORLD_W; x += 48) {
        ctx.quadraticCurveTo(x + 24, GROUND_Y - 42 + wShift, x + 48, GROUND_Y - 30 + wShift);
      }
      ctx.lineTo(WORLD_W, GROUND_Y - 22 + wShift);
      ctx.lineTo(0, GROUND_Y - 22 + wShift);
      ctx.closePath();
      ctx.fill();

      // Animated surfer gliding across Waikiki wave
      const sx = ((t * 64) % (WORLD_W + 100)) - 50;
      const sy = GROUND_Y - 42 + Math.sin(sx * 0.04 + t * 3) * 4;
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.ellipse(sx, sy + 6, 14, 3, -0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(sx - 2, sy - 6, 4, 12);
      ctx.beginPath();
      ctx.arc(sx, sy - 9, 3, 0, Math.PI * 2);
      ctx.fill();

      drawSwayingPalm(ctx, 72, 1, 198, 0.3, t);
      drawSwayingPalm(ctx, 888, -1, 198, 1.8, t);
      break;
    }

    case 'moon': {
      drawTwinklingStars(ctx, t, GROUND_Y - 48);

      // Occasional shooting star
      if (SHOOTING_STAR.life > 0) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.88)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(SHOOTING_STAR.x, SHOOTING_STAR.y);
        ctx.lineTo(SHOOTING_STAR.x - SHOOTING_STAR.vx * 0.14, SHOOTING_STAR.y - SHOOTING_STAR.vy * 0.14);
        ctx.stroke();
      }

      // Majestic rotating Earthrise hanging over the lunar horizon
      ctx.save();
      ctx.beginPath();
      ctx.arc(750, 138, 68, 0, Math.PI * 2);
      ctx.clip();
      const eg = ctx.createRadialGradient(730, 118, 12, 750, 138, 70);
      eg.addColorStop(0, '#bae6fd');
      eg.addColorStop(0.55, '#0284c7');
      eg.addColorStop(1, '#082f49');
      ctx.fillStyle = eg;
      ctx.fillRect(680, 68, 140, 140);

      const rotShift = (t * 8) % 160;
      ctx.fillStyle = '#2ec4b6';
      ctx.beginPath();
      ctx.ellipse(690 + rotShift, 128, 25, 16, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(760 + rotShift - 160, 152, 21, 14, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.beginPath();
      ctx.ellipse(720 + ((t * 11) % 150) - 70, 116, 28, 7, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = 'rgba(125, 211, 252, 0.48)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(750, 138, 68, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }

    case 'mars':
    default: {
      drawTwinklingStars(ctx, t, 215);

      // Animated Mars Exploration Rover rolling along the Martian ridge
      const rx = ((t * 22) % (WORLD_W + 120)) - 60;
      const ry = GROUND_Y - 46;
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(rx - 18, ry - 16, 36, 10);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rx + 8, ry - 16);
      ctx.lineTo(rx + 12, ry - 30);
      ctx.stroke();
      ctx.fillStyle = Math.sin(t * 9) > 0 ? '#22d3ee' : '#ef4444';
      ctx.beginPath();
      ctx.arc(rx + 12, ry - 32, 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1e293b';
      [-12, 0, 12].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(rx + wx, ry - 4, 4.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Sweeping Martian dust storm streaks
      for (const d of DUST_PARTICLES) {
        ctx.fillStyle = `rgba(253, 186, 116, ${d.alpha.toFixed(2)})`;
        ctx.fillRect(d.x, d.y, d.r * 3.8, 1.6);
      }
      break;
    }
  }

  // Time-Freeze crystalline wash
  if (freezeTimer > 0) {
    ctx.fillStyle = 'rgba(125, 211, 252, 0.16)';
    ctx.fillRect(0, 0, WORLD_W, GROUND_Y);
  }
}

// =========================================================================
// PART 3: THEME-MATCHED ARCHITECTURAL ARENA FLOOR & PERIMETER FRAME
// =========================================================================
export function drawArenaFrame(ctx: CanvasRenderingContext2D, theme: ThemeId): void {
  const floorGrad = ctx.createLinearGradient(0, GROUND_Y, 0, WORLD_H);
  let accentTrim = '#60a5fa';
  let tileLine = 'rgba(255,255,255,0.12)';

  if (theme === 'moon') {
    floorGrad.addColorStop(0, '#94a3b8');
    floorGrad.addColorStop(0.35, '#64748b');
    floorGrad.addColorStop(1, '#1e293b');
    accentTrim = '#bae6fd';
  } else if (theme === 'mars') {
    floorGrad.addColorStop(0, '#c2410c');
    floorGrad.addColorStop(0.4, '#7c2d12');
    floorGrad.addColorStop(1, '#431407');
    accentTrim = '#fb923c';
  } else if (['pyramids', 'temple', 'rome', 'madrid', 'delhi'].includes(theme)) {
    floorGrad.addColorStop(0, '#b45309');
    floorGrad.addColorStop(0.35, '#78350f');
    floorGrad.addColorStop(1, '#3b1806');
    accentTrim = '#fbbf24';
  } else if (['neon', 'vegas', 'saopaulo'].includes(theme)) {
    floorGrad.addColorStop(0, '#1e1b4b');
    floorGrad.addColorStop(0.35, '#0f172a');
    floorGrad.addColorStop(1, '#020617');
    accentTrim = '#22d3ee';
    tileLine = 'rgba(34, 211, 238, 0.18)';
  } else if (['caribbean', 'honolulu', 'rio'].includes(theme)) {
    floorGrad.addColorStop(0, '#d97706');
    floorGrad.addColorStop(0.35, '#92400e');
    floorGrad.addColorStop(1, '#451a03');
    accentTrim = '#fde047';
  } else if (['alps', 'moscow'].includes(theme)) {
    floorGrad.addColorStop(0, '#475569');
    floorGrad.addColorStop(0.35, '#334155');
    floorGrad.addColorStop(1, '#0f172a');
    accentTrim = '#7dd3fc';
  } else {
    floorGrad.addColorStop(0, '#334155');
    floorGrad.addColorStop(0.35, '#1e293b');
    floorGrad.addColorStop(1, '#0b1120');
    accentTrim = '#38bdf8';
  }

  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, GROUND_Y, WORLD_W, FLOOR_H);

  // Perspective floor tile seams
  ctx.strokeStyle = tileLine;
  ctx.lineWidth = 1.6;
  for (let x = LEFT_WALL; x < RIGHT_WALL; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, GROUND_Y);
    ctx.lineTo(x + (x - WORLD_W / 2) * 0.08, WORLD_H);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(LEFT_WALL, GROUND_Y + FLOOR_H * 0.45);
  ctx.lineTo(RIGHT_WALL, GROUND_Y + FLOOR_H * 0.45);
  ctx.stroke();

  // Crisp luminous ground line
  ctx.fillStyle = accentTrim;
  ctx.fillRect(0, GROUND_Y, WORLD_W, 3);

  // Structural arcade cabinet frame walls
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, WORLD_W, CEILING_Y);
  ctx.fillRect(0, 0, LEFT_WALL, WORLD_H);
  ctx.fillRect(RIGHT_WALL, 0, WALL_THICKNESS, WORLD_H);

  // Subtle recessed metallic inner rim
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(LEFT_WALL, CEILING_Y, RIGHT_WALL - LEFT_WALL, GROUND_Y - CEILING_Y);
}

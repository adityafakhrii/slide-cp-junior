import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-48-arsitek-game-cerita-cilik';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj48-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj48-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj48-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj48-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj48-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj48-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj48-card-btn:hover {
  transform: translateY(-4px);
}
.cpj48-card-btn:active {
  transform: translateY(2px);
}
`;

if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;

  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== SCOPED_CSS) style.textContent = SCOPED_CSS;
}

/** Playful sound feedback via Web Audio API */
function playArchitectSound(kind: 'win' | 'boing' | 'click') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    if (kind === 'win') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.24);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (kind === 'boing') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    }
    setTimeout(() => {
      void ctx.close();
    }, 360);
  } catch {
    // Ignore audio blocks
  }
}

// ============================================================================
// Design System & Official CODEPOLITAN Junior Palette
// ============================================================================
export const design: DesignSystem = {
  palette: {
    bg: '#FFFBF0',
    text: '#1E1E2C',
    accent: '#4D97FF',
  },
  fonts: {
    display: '"Fredoka", "Plus Jakarta Sans", system-ui, sans-serif',
    body: '"Plus Jakarta Sans", system-ui, sans-serif',
  },
  typeScale: {
    hero: 88,
    body: 28,
  },
  radius: 24,
};

const CREAM = '#FFFBF0';
const SAND_GRID = '#F4ECDC';
const WHITE = '#FFFFFF';
const CHARCOAL = '#1E1E2C';
const MUTED = '#525266';
const TEAL = '#10B981';
const TEAL_SOFT = '#ECFDF5';
const CORAL = '#F45B49';
const CORAL_SOFT = '#FEF2F2';
const SUNNY = '#FBBF24';
const SUNNY_SOFT = '#FEF9C3';
const STABILO = '#FEF08A';
const LAVENDER = '#A78BFA';
const SKY = '#60A5FA';
const SKY_SOFT = '#EFF6FF';
const SCRATCH_BLUE = '#4D97FF';

const X0 = 100;
const W = 1720;

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];

export const transition: SlideTransition = {
  duration: 240,
  exit: { duration: 240, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 240,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const abs = (left: number, top: number, width?: number, height?: number): CSSProperties => ({
  position: 'absolute',
  left,
  top,
  width,
  height,
  boxSizing: 'border-box',
});

const row: CSSProperties = { display: 'flex', alignItems: 'center' };
const centerCol: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

// ============================================================================
// Shared Chrome, Background Grid & Micro-Decorations
// ============================================================================
const JuniorFrame = ({
  badge,
  accentDot = SCRATCH_BLUE,
  children,
}: {
  badge: string;
  accentDot?: string;
  children: ReactNode;
}) => {
  const { current, total } = useSlidePageNumber();
  const live = useIsActivePage();

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: CREAM,
        backgroundImage: `linear-gradient(to right, ${SAND_GRID} 1.5px, transparent 1.5px), linear-gradient(to bottom, ${SAND_GRID} 1.5px, transparent 1.5px)`,
        backgroundSize: '48px 48px',
        color: CHARCOAL,
        fontFamily: 'var(--osd-font-body)',
        overflow: 'hidden',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <div aria-hidden style={{ ...abs(46, 200), fontFamily: 'var(--osd-font-display)', fontSize: 40, fontWeight: 700, color: LAVENDER, opacity: 0.25, transform: 'rotate(-10deg)', pointerEvents: 'none' }}>
        {'{ }'}
      </div>
      <div aria-hidden style={{ ...abs(1816, 170), fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: SKY, opacity: 0.26, transform: 'rotate(12deg)', pointerEvents: 'none' }}>
        {'</>'}
      </div>
      <div aria-hidden style={{ ...abs(42, 870), fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: TEAL, opacity: 0.24, transform: 'rotate(-8deg)', pointerEvents: 'none' }}>
        {'( )'}
      </div>
      <div aria-hidden style={{ ...abs(1826, 860), fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CORAL, opacity: 0.25, transform: 'rotate(9deg)', pointerEvents: 'none' }}>
        {'##'}
      </div>

      <svg
        aria-hidden
        width={42}
        height={42}
        viewBox="0 0 40 40"
        style={{
          ...abs(1750, 74),
          pointerEvents: 'none',
          animation: live ? 'cpj48-twinkle 2.8s ease-in-out infinite' : undefined,
        }}
      >
        <path
          d="M20 2 L24.5 15.5 L38 20 L24.5 24.5 L20 38 L15.5 24.5 L2 20 L15.5 15.5 Z"
          fill={SUNNY}
          stroke={CHARCOAL}
          strokeWidth={2.2}
          strokeLinejoin="round"
        />
      </svg>

      {/* Top Left Header Pill Badge */}
      <div
        style={{
          ...abs(X0, 56),
          ...row,
          gap: 12,
          padding: '12px 26px',
          borderRadius: 999,
          background: WHITE,
          border: `2.5px solid ${CHARCOAL}`,
          boxShadow: `0 5px 0 ${CHARCOAL}`,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          zIndex: 5,
        }}
      >
        <span style={{ width: 14, height: 14, borderRadius: 99, background: accentDot, border: `2px solid ${CHARCOAL}`, display: 'inline-block' }} />
        <span>{badge}</span>
      </div>

      {/* Top Right Slide Number Pill */}
      <div
        style={{
          ...abs(1680, 56),
          ...row,
          gap: 10,
          padding: '12px 22px',
          borderRadius: 999,
          background: WHITE,
          border: `2.5px solid ${CHARCOAL}`,
          boxShadow: `0 4px 0 ${CHARCOAL}`,
          fontSize: 20,
          fontWeight: 800,
          fontFamily: 'var(--osd-font-display)',
          zIndex: 5,
        }}
      >
        <span style={{ color: TEAL }}>{String(current).padStart(2, '0')}</span>
        <span style={{ color: '#A1A1B5' }}>/</span>
        <span>{String(total).padStart(2, '0')}</span>
      </div>

      {children}

      {/* Subtle Bottom Program Strip */}
      <div style={{ ...abs(X0, 1020, W, 34), ...row, justifyContent: 'space-between', fontSize: 18, fontWeight: 700, color: '#7A7689' }}>
        <span style={{ ...row, gap: 10 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: SCRATCH_BLUE, border: `1.5px solid ${CHARCOAL}`, display: 'inline-block' }} />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 48 • Arsitek Game &amp; Cerita Cilik!</span>
      </div>
    </div>
  );
};

const Highlight = ({ children, color = STABILO }: { children: ReactNode; color?: string }) => (
  <span style={{ background: color, padding: '2px 18px 6px', borderRadius: 16, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone', display: 'inline-block' }}>
    {children}
  </span>
);

const SlideTitle = ({
  children,
  top = 136,
  size = 56,
  maxWidth = 1520,
  align = 'left',
}: {
  children: ReactNode;
  top?: number;
  size?: number;
  maxWidth?: number;
  align?: 'left' | 'center';
}) => (
  <h2
    style={{
      ...abs(align === 'center' ? (1920 - maxWidth) / 2 : X0, top, maxWidth),
      margin: 0,
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 700,
      lineHeight: 1.16,
      letterSpacing: '-0.015em',
      color: CHARCOAL,
      textAlign: align,
    }}
  >
    {children}
  </h2>
);

const MacWindowCard = ({
  left,
  top,
  width,
  height,
  titleBarColor = WHITE,
  headerLabel,
  children,
  padding = 36,
}: {
  left: number;
  top: number;
  width: number;
  height: number;
  titleBarColor?: string;
  headerLabel?: string;
  children: ReactNode;
  padding?: number;
}) => (
  <div
    style={{
      ...abs(left, top, width, height),
      background: WHITE,
      borderRadius: 28,
      border: `3px solid ${CHARCOAL}`,
      boxShadow: `0 8px 0 ${CHARCOAL}`,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}
  >
    <div style={{ height: 54, background: titleBarColor, borderBottom: `2.5px solid ${CHARCOAL}`, padding: '0 24px', ...row, justifyContent: 'space-between', flexShrink: 0 }}>
      <div style={{ ...row, gap: 10 }}>
        <span style={{ width: 16, height: 16, borderRadius: 99, background: CORAL, border: `2px solid ${CHARCOAL}` }} />
        <span style={{ width: 16, height: 16, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}` }} />
        <span style={{ width: 16, height: 16, borderRadius: 99, background: TEAL, border: `2px solid ${CHARCOAL}` }} />
      </div>
      {headerLabel && (
        <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700, color: MUTED }}>
          {headerLabel}
        </span>
      )}
    </div>
    <div style={{ flex: 1, padding, position: 'relative' }}>{children}</div>
  </div>
);

const BulletRow = ({
  icon,
  bgColor = SKY_SOFT,
  children,
  fontSize = 30,
}: {
  icon: JuniorIconName;
  bgColor?: string;
  children: ReactNode;
  fontSize?: number;
}) => (
  <div style={{ ...row, gap: 20, alignItems: 'center' }}>
    <div style={{ width: 64, height: 64, borderRadius: 20, background: bgColor, border: `2.8px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...centerCol, flexShrink: 0 }}>
      <JuniorIcon name={icon} size={34} />
    </div>
    <div style={{ fontSize, fontWeight: 700, lineHeight: 1.32, color: CHARCOAL }}>{children}</div>
  </div>
);

// ============================================================================
// Reusable Pertemuan 48 Visuals (Scratch Cat, Blueprint Scroll)
// ============================================================================

const ScratchCatSvg = ({ size = 115, waving = false }: { size?: number; waving?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <ellipse cx="70" cy="128" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path d="M40 100 C20 96, 14 78, 25 69 C32 63, 38 71, 35 78 C33 83, 38 90, 46 90" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <ellipse cx="56" cy="120" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="120" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="70" cy="96" rx="25" ry="23" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="98" rx="14" ry="14" fill={WHITE} />
    <path d="M46 86 C35 90, 35 103, 45 103" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d={waving ? 'M94 82 C112 72, 114 54, 105 50 C98 46, 92 58, 92 72' : 'M94 86 C105 90, 105 103, 95 103'} fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d="M36 52 L34 16 L60 35 Z" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
    <path d="M104 52 L106 16 L80 35 Z" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
    <ellipse cx="70" cy="56" rx="38" ry="29" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="65" rx="25" ry="16" fill={WHITE} />
    <ellipse cx="56" cy="50" rx="7" ry="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    <ellipse cx="84" cy="50" rx="7" ry="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    <circle cx="58" cy="50" r="3.4" fill={CHARCOAL} />
    <circle cx="82" cy="50" r="3.4" fill={CHARCOAL} />
    <polygon points="66,58 74,58 70,63" fill={CHARCOAL} />
    <path d="M62 67 Q70 74 78 67" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
  </svg>
);

const Blueprint3PanelSvg = ({ width = 260 }: { width?: number }) => (
  <svg width={width} height={Math.round(width * 0.45)} viewBox="0 0 280 126" fill="none">
    <rect x="6" y="8" width="268" height="110" rx="18" fill="#1D4ED8" stroke={CHARCOAL} strokeWidth={4} />
    <rect x="20" y="24" width="70" height="78" rx="10" fill={SKY_SOFT} stroke={WHITE} strokeWidth={2.5} />
    <rect x="105" y="24" width="70" height="78" rx="10" fill={SUNNY_SOFT} stroke={WHITE} strokeWidth={2.5} />
    <rect x="190" y="24" width="70" height="78" rx="10" fill={TEAL_SOFT} stroke={WHITE} strokeWidth={2.5} />
    <text x="55" y="70" textAnchor="middle" fill={CHARCOAL} fontFamily="Fredoka, sans-serif" fontSize="26" fontWeight="700">1</text>
    <text x="140" y="70" textAnchor="middle" fill={CHARCOAL} fontFamily="Fredoka, sans-serif" fontSize="26" fontWeight="700">2</text>
    <text x="225" y="70" textAnchor="middle" fill={CHARCOAL} fontFamily="Fredoka, sans-serif" fontSize="26" fontWeight="700">3</text>
  </svg>
);

// ============================================================================
// SLIDE 01 — Cover
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 48" accentDot={SCRATCH_BLUE}>
      {/* Left Hero Copy */}
      <div style={{ ...abs(X0, 225, 860) }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 99, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, marginBottom: 22 }}>
          <JuniorIcon name="ruler" size={26} />
          <span>Merancang Peta Cerita &amp; Aset Proyek Akhir</span>
        </div>

        <h1 style={{ margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <Highlight>Arsitek</Highlight> Game &amp;
          <br />
          Cerita Cilik!
        </h1>

        <p style={{ margin: '30px 0 0', fontSize: 31, fontWeight: 700, lineHeight: 1.4, color: MUTED, maxWidth: 790 }}>
          Merancang <strong style={{ color: CHARCOAL }}>Storyboard</strong> serta Menyiapkan{' '}
          <strong style={{ color: CHARCOAL }}>Sprite &amp; Backdrop</strong> Proyek Akhir!
        </p>

        <div style={{ ...row, gap: 16, marginTop: 34 }}>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="map" size={24} />
            <span>Storyboard 1-2-3</span>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="landscape" size={24} />
            <span>Sprite &amp; Backdrop</span>
          </div>
        </div>
      </div>

      {/* Right Visual: Biko Architect + Blueprint + Scratch Cat arranging Sprite & Backdrop Cards */}
      <MacWindowCard
        left={1010}
        top={185}
        width={810}
        height={690}
        titleBarColor={SKY_SOFT}
        headerLabel="Scratch 3.0 • Studio Arsitek Cilik"
        padding={26}
      >
        <div style={{ height: '100%', borderRadius: 20, border: `3px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #EFF6FF 0%, #FEF9C3 100%)', position: 'relative', overflow: 'hidden', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'center' }}>
            <Blueprint3PanelSvg width={430} />
          </div>

          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'flex-end' }}>
            <div style={{ animation: live ? 'cpj48-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot pose="thumbs-up" width={245} badgeIcon={<JuniorIcon name="ruler" size={22} />} speechBubble="Peta siap!" />
            </div>
            <div style={{ animation: live ? 'cpj48-hop 2.4s ease-in-out infinite' : undefined }}>
              <ScratchCatSvg size={180} waving />
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi)
// ============================================================================
const Slide02Misi: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SPESIAL HARI INI" accentDot={SUNNY}>
      <SlideTitle>
        Apa Misi Arsitek Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      {/* Biko Left Anchor */}
      <div style={{ ...abs(95, 295, 360, 620), ...centerCol }}>
        <div style={{ animation: live ? 'cpj48-hop 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="point-left" width={320} badgeIcon={<JuniorIcon name="map" size={22} />} speechBubble="Ayo rancang!" />
        </div>
      </div>

      {/* macOS Window with 2 Cards */}
      <MacWindowCard
        left={480}
        top={240}
        width={1340}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Misi Pertemuan 48"
        padding={42}
      >
        <div style={{ display: 'flex', gap: 36, height: '100%' }}>
          {/* Card 1: Draw Storyboard */}
          <div style={{ flex: 1, borderRadius: 24, background: SUNNY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>
            <Blueprint3PanelSvg width={340} />
            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Gambar <span style={{ color: '#B45309' }}>Peta Cerita</span> (<em>Storyboard</em>) Karyamu
            </div>
          </div>

          {/* Card 2: Prepare Sprite & Backdrop */}
          <div style={{ flex: 1, borderRadius: 24, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>
            <div style={{ ...row, gap: 18 }}>
              <JuniorIcon name="landscape" size={92} />
              <ScratchCatSvg size={125} waving />
            </div>
            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Siapkan Semua <span style={{ color: '#1D4ED8' }}>Sprite &amp; Backdrop!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Kamus Arsitek Cilik: Apa Itu "Storyboard"?
// ============================================================================
const Slide03KamusStoryboard: Page = () => {
  return (
    <JuniorFrame badge="KAMUS ARSITEK CILIK" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Apa Itu <Highlight>Storyboard?</Highlight>
      </SlideTitle>

      {/* Left 3-Panel Comic Visual */}
      <MacWindowCard
        left={X0}
        top={245}
        width={840}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Komik Rencana 3 Kotak"
        padding={30}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '100%', display: 'flex', gap: 16 }}>
            {[
              { num: 'Kotak 1', label: 'Mulai', bg: SKY_SOFT, border: SKY, icon: 'flag' as JuniorIconName },
              { num: 'Kotak 2', label: 'Aksi Seru', bg: SUNNY_SOFT, border: SUNNY, icon: 'sparkle' as JuniorIconName },
              { num: 'Kotak 3', label: 'Tamat / Menang', bg: TEAL_SOFT, border: TEAL, icon: 'trophy' as JuniorIconName },
            ].map((box) => (
              <div key={box.num} style={{ flex: 1, height: 295, borderRadius: 22, background: box.bg, border: `3.5px solid ${box.border}`, boxShadow: `0 6px 0 ${CHARCOAL}`, padding: 16, ...centerCol, justifyContent: 'space-between', textAlign: 'center' }}>
                <span style={{ padding: '4px 14px', borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700 }}>
                  {box.num}
                </span>
                <JuniorIcon name={box.icon} size={76} />
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700 }}>{box.label}</span>
              </div>
            ))}
          </div>

          <BikoMascot pose="point-left" width={230} speechBubble="Seperti komik!" />
        </div>
      </MacWindowCard>

      {/* Right Spotlight Explanation */}
      <MacWindowCard
        left={980}
        top={245}
        width={840}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Kamus Arsitek Cilik"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="map" bgColor={SKY_SOFT} fontSize={32}>
              <strong>Storyboard:</strong> Gambar rencana <strong>Urutan Kejadian</strong> dari awal sampai akhir!
            </BulletRow>
            <BulletRow icon="film" bgColor={SUNNY_SOFT} fontSize={32}>
              Seperti <strong>Komik 3 Kotak</strong> sebelum kita mulai merangkai kode!
            </BulletRow>
          </div>

          <div style={{ padding: '20px 26px', borderRadius: 20, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 16, fontSize: 26, fontWeight: 800 }}>
            <JuniorIcon name="pencil" size={34} />
            <span>Dengan Storyboard, arsitek game tidak bingung adegan mana yang harus muncul duluan!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Contoh Storyboard #1: Cerita Petualangan!
// ============================================================================
const Slide04ContohCerita: Page = () => {
  return (
    <JuniorFrame badge="CONTOH STORYBOARD CERITA" accentDot={SKY}>
      <SlideTitle>
        Peta Cerita <Highlight color="#DBEAFE">Petualangan!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={245}
        width={1720}
        height={700}
        titleBarColor={SKY_SOFT}
        headerLabel="Contoh 1 • Storyboard Cerita Petualangan"
        padding={38}
      >
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Kotak 1 */}
          <div style={{ flex: 1, height: '100%', borderRadius: 26, background: SKY_SOFT, border: `3.5px solid ${SKY}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '6px 20px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700 }}>
              Kotak 1 • Awal
            </div>
            <div style={{ width: '100%', height: 220, borderRadius: 20, background: 'linear-gradient(180deg, #BAE6FD 0%, #FDE68A 100%)', border: `3px solid ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 12 }}>
              <ScratchCatSvg size={135} waving />
              <div style={{ padding: '6px 14px', borderRadius: 12, background: WHITE, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>
                Ayo terbang!
              </div>
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.32 }}>
              Kucing di <strong>Pantai</strong> berkata <em>&quot;Ayo terbang!&quot;</em>
            </div>
          </div>

          <JuniorIcon name="arrow-right" size={44} />

          {/* Kotak 2 */}
          <div style={{ flex: 1, height: '100%', borderRadius: 26, background: SUNNY_SOFT, border: `3.5px solid ${SUNNY}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '6px 20px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700 }}>
              Kotak 2 • Tengah
            </div>
            <div style={{ width: '100%', height: 220, borderRadius: 20, background: 'linear-gradient(180deg, #1E1B4B 0%, #312E81 100%)', border: `3px solid ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 22 }}>
              <JuniorIcon name="rocket" size={105} />
              <JuniorIcon name="star-glow" size={85} />
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.32 }}>
              Latar pindah ke <strong>Luar Angkasa</strong> &amp; bertemu Bintang
            </div>
          </div>

          <JuniorIcon name="arrow-right" size={44} />

          {/* Kotak 3 */}
          <div style={{ flex: 1, height: '100%', borderRadius: 26, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '6px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700 }}>
              Kotak 3 • Akhir
            </div>
            <div style={{ width: '100%', height: 220, borderRadius: 20, background: 'linear-gradient(135deg, #FEF9C3 0%, #DCFCE7 100%)', border: `3px solid ${CHARCOAL}`, ...centerCol, gap: 8 }}>
              <JuniorIcon name="party" size={96} />
              <div style={{ padding: '5px 18px', borderRadius: 99, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                Tamat!
              </div>
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.32 }}>
              Menari gembira &amp; muncul ucapan <strong>&quot;Tamat!&quot;</strong>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Contoh Storyboard #2: Untuk Game Seru!
// ============================================================================
const Slide05ContohGame: Page = () => {
  return (
    <JuniorFrame badge="CONTOH STORYBOARD GAME" accentDot={TEAL}>
      <SlideTitle>
        Peta Aturan <Highlight color="#DCFCE7">Game Seru!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={245}
        width={1720}
        height={700}
        titleBarColor={TEAL_SOFT}
        headerLabel="Contoh 2 • Storyboard Game Menangkap Bintang"
        padding={38}
      >
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Kotak 1 */}
          <div style={{ flex: 1, height: '100%', borderRadius: 26, background: SKY_SOFT, border: `3.5px solid ${SKY}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '6px 20px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700 }}>
              Kotak 1 • Mulai
            </div>
            <div style={{ width: '100%', height: 220, borderRadius: 20, background: WHITE, border: `3px solid ${CHARCOAL}`, ...centerCol, gap: 14 }}>
              <JuniorIcon name="flag" size={78} />
              <div style={{ padding: '8px 22px', borderRadius: 14, background: '#FF8C1A', color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
                Skor = 0
              </div>
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.32 }}>
              Klik Bendera Hijau, <strong><code>Skor = 0</code></strong>
            </div>
          </div>

          <JuniorIcon name="arrow-right" size={44} />

          {/* Kotak 2 */}
          <div style={{ flex: 1, height: '100%', borderRadius: 26, background: SUNNY_SOFT, border: `3.5px solid ${SUNNY}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '6px 20px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700 }}>
              Kotak 2 • Main
            </div>
            <div style={{ width: '100%', height: 220, borderRadius: 20, background: WHITE, border: `3px solid ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 22 }}>
              <JuniorIcon name="keyboard" size={94} />
              <JuniorIcon name="star-glow" size={88} />
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.32 }}>
              Gerak pakai <strong>Panah Keyboard</strong> &amp; tangkap <strong>Bintang</strong>
            </div>
          </div>

          <JuniorIcon name="arrow-right" size={44} />

          {/* Kotak 3 */}
          <div style={{ flex: 1, height: '100%', borderRadius: 26, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '6px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700 }}>
              Kotak 3 • Menang
            </div>
            <div style={{ width: '100%', height: 220, borderRadius: 20, background: WHITE, border: `3px solid ${CHARCOAL}`, ...centerCol, gap: 10 }}>
              <JuniorIcon name="trophy" size={96} />
              <div style={{ padding: '5px 18px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                Skor = 5 -&gt; Menang!
              </div>
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.32 }}>
              Skor jadi <strong>5</strong> -&gt; Bunyi hore &amp; <strong>Menang!</strong>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Urutan Storyboard Mana yang Rapi?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle size={50} maxWidth={1680}>
        Mana Urutan <Highlight>Storyboard</Highlight> yang Benar untuk Karya Kita?
      </SlideTitle>

      {/* Card A — Correct: 1. Awal -> 2. Aksi Seru -> 3. Menang/Tamat */}
      <button
        type="button"
        onClick={() => {
          playArchitectSound('win');
          setPicked('A');
        }}
        className="cpj48-card-btn"
        style={{
          ...abs(X0, 250, 820, 490),
          borderRadius: 30,
          background: picked === 'A' ? TEAL_SOFT : WHITE,
          border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 16, background: SUNNY, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
            A
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Berurutan Rapi
          </span>
          <JuniorIcon name="star-glow" size={38} />
        </div>

        <div style={{ ...row, gap: 10 }}>
          {['1. Awal Mulai', '2. Aksi Seru', '3. Menang / Tamat'].map((step, i) => (
            <div key={step} style={{ ...row, gap: 8 }}>
              <div style={{ padding: '14px 16px', borderRadius: 16, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>
                {step}
              </div>
              {i < 2 && <JuniorIcon name="arrow-right" size={26} />}
            </div>
          ))}
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'A' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={26} />
              <span>Benar! Mulai dari Awal -&gt; Aksi -&gt; Tamat!</span>
            </div>
          ) : (
            <span style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Card B — Wrong: Reversed */}
      <button
        type="button"
        onClick={() => {
          playArchitectSound('boing');
          setPicked('B');
        }}
        className="cpj48-card-btn"
        style={{
          ...abs(1000, 250, 820, 490),
          borderRadius: 30,
          background: picked === 'B' ? CORAL_SOFT : WHITE,
          border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          animation: picked === 'B' ? 'cpj48-shake 320ms ease' : undefined,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 16, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
            B
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Terbalik
          </span>
          <JuniorIcon name="question" size={38} />
        </div>

        <div style={{ ...row, gap: 10 }}>
          {['1. Tamat!', '2. Belum Mulai', '3. Lupa Latar'].map((step, i) => (
            <div key={step} style={{ ...row, gap: 8 }}>
              <div style={{ padding: '14px 16px', borderRadius: 16, background: CORAL_SOFT, border: `3px solid ${CORAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>
                {step}
              </div>
              {i < 2 && <JuniorIcon name="arrow-right" size={26} />}
            </div>
          ))}
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'B' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={26} />
              <span>Bukan! Ceritanya langsung Tamat sebelum dimulai!</span>
            </div>
          ) : (
            <span style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Bottom Biko Prompt Bar */}
      <div
        style={{
          ...abs(X0, 775, W, 200),
          borderRadius: 28,
          background: SUNNY_SOFT,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 8px 0 ${CHARCOAL}`,
          padding: '0 44px',
          ...row,
          justifyContent: 'center',
          gap: 36,
        }}
      >
        <div style={{ animation: live ? 'cpj48-float 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thinking" width={165} badgeIcon={<JuniorIcon name="question" size={22} />} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
          {picked === 'A'
            ? 'Tepat sekali! Storyboard selalu berurutan dari Awal -> Aksi -> Akhir!'
            : picked === 'B'
              ? 'Ups! Kalau Tamat di nomor 1, ceritanya belum main sudah selesai!'
              : 'Tunjuk urutan storyboard yang paling tepat di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Langkah #2: Siapkan Semua Aset di Scratch 3.0!
// ============================================================================
const Slide07SiapkanAset: Page = () => {
  return (
    <JuniorFrame badge="PERSIAPAN ASET PROYEK" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Kumpulkan <Highlight>Sprite &amp; Backdrop</Highlight> Lengkap!
      </SlideTitle>

      {/* Left 3 Asset Steps */}
      <div style={{ ...abs(X0, 245, 960, 680), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {[
          {
            num: 'Langkah 1 • Latar (Backdrop)',
            bg: SKY_SOFT,
            border: SKY,
            icon: 'landscape' as JuniorIconName,
            text: 'Masukkan semua pemandangan (Latar Awal & Latar Akhir / Menang)',
          },
          {
            num: 'Langkah 2 • Karakter (Sprite)',
            bg: SUNNY_SOFT,
            border: SUNNY,
            icon: 'cat' as JuniorIconName,
            text: 'Pilih tokoh utama, hadiah / rintangan, atau alat musik',
          },
          {
            num: 'Langkah 3 • Ukuran & Posisi',
            bg: TEAL_SOFT,
            border: TEAL,
            icon: 'ruler' as JuniorIconName,
            text: 'Atur Size & geser ke Titik Awal di Panggung!',
          },
        ].map((step) => (
          <div
            key={step.num}
            style={{
              height: 205,
              borderRadius: 26,
              background: step.bg,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '22px 28px',
              ...row,
              gap: 24,
            }}
          >
            <div style={{ width: 82, height: 82, borderRadius: 22, background: WHITE, border: `3px solid ${step.border}`, ...centerCol, flexShrink: 0 }}>
              <JuniorIcon name={step.icon} size={46} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                {step.num}
              </div>
              <div style={{ fontSize: 25, fontWeight: 700, color: MUTED, marginTop: 6, lineHeight: 1.32 }}>
                {step.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Scratch 3.0 Asset Pane Mockup */}
      <MacWindowCard
        left={1100}
        top={245}
        width={720}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Panel Sprite & Backdrop Scratch 3.0"
        padding={28}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
          {/* Mini Stage Preview */}
          <div style={{ flex: 1, borderRadius: 20, border: `3px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #1E1B4B 0%, #312E81 100%)', position: 'relative', ...row, justifyContent: 'space-around', padding: 20 }}>
            <ScratchCatSvg size={130} waving />
            <JuniorIcon name="star-glow" size={95} />
            <div style={{ position: 'absolute', left: 16, top: 14, padding: '4px 14px', borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 17, fontWeight: 700 }}>
              Panggung Titik Awal
            </div>
          </div>

          {/* Bottom Inspector Row */}
          <div style={{ display: 'flex', gap: 18 }}>
            <div style={{ flex: 2, padding: 16, borderRadius: 18, background: '#F8FAFC', border: `2.5px solid ${CHARCOAL}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700 }}>Sprites (2–3 Tokoh)</div>
              <div style={{ ...row, gap: 12 }}>
                <div style={{ padding: '8px 14px', borderRadius: 14, background: SKY_SOFT, border: `2.5px solid ${SCRATCH_BLUE}`, fontWeight: 800, fontSize: 17 }}>
                  Kucing (Size: 80)
                </div>
                <div style={{ padding: '8px 14px', borderRadius: 14, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, fontWeight: 800, fontSize: 17 }}>
                  Bintang (Size: 60)
                </div>
              </div>
            </div>

            <div style={{ flex: 1, padding: 16, borderRadius: 18, background: TEAL_SOFT, border: `2.5px solid ${TEAL}`, ...centerCol, gap: 6, textAlign: 'center' }}>
              <JuniorIcon name="landscape" size={40} />
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>Backdrops: 2</div>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Arsitek Game & Cerita Cilik (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsArsitek: Page = () => {
  return (
    <JuniorFrame badge="TIPS ARSITEK CILIK" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Rancangan Karyamu <Highlight>Rapi &amp; Siap Dikode!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & RAPI"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 14 }}>
            <div style={{ padding: '10px 26px', borderRadius: 99, background: TEAL, color: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={28} />
              <span>BOLEH</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BulletRow icon="pencil" bgColor={TEAL_SOFT} fontSize={29}>
              Gambar <strong>3 Kotak Storyboard</strong> sederhana sebelum mulai menyusun blok
            </BulletRow>
            <BulletRow icon="ruler" bgColor={SUNNY_SOFT} fontSize={29}>
              Atur ukuran (<code>Size</code>) &amp; posisi awal setiap Sprite di panggung
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <BikoMascot pose="thumbs-up" width={185} speechBubble="Rapi sekali!" />
            <Blueprint3PanelSvg width={240} />
            <JuniorIcon name="check" size={58} />
          </div>
        </div>
      </MacWindowCard>

      {/* Kolom Kanan — JANGAN */}
      <MacWindowCard
        left={985}
        top={235}
        width={835}
        height={720}
        titleBarColor={CORAL_SOFT}
        headerLabel="JANGAN DILAKUKAN"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 14 }}>
            <div style={{ padding: '10px 26px', borderRadius: 99, background: CORAL, color: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={28} />
              <span>JANGAN</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BulletRow icon="dizzy" bgColor={CORAL_SOFT} fontSize={29}>
              Langsung menumpuk banyak blok tanpa tahu <strong>Alur Awal &amp; Akhir</strong>
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={29}>
              Lupa menambahkan <strong>Backdrop ke-2</strong> untuk perpindahan adegan atau layar menang
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <ScratchCatSvg size={115} />
              <div style={{ marginLeft: -45 }}>
                <ScratchCatSvg size={115} />
              </div>
              <div style={{ marginLeft: -45 }}>
                <ScratchCatSvg size={115} />
              </div>
            </div>
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Buat Storyboard & Siapkan Aset Proyek Akhir!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [scene, setScene] = useState<'awal' | 'menang'>('awal');
  const [catSize, setCatSize] = useState<60 | 85 | 110>(85);

  return (
    <JuniorFrame badge="AYO RANCANG & SIAPKAN!" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Misi <Highlight>Arsitek Proyek Akhir!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'pencil' as JuniorIconName,
            text: (
              <>
                Gambar <strong>3 Kotak Storyboard</strong> (Awal - Aksi - Akhir) untuk karya pilihanmu
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'landscape' as JuniorIconName,
            text: (
              <>
                Buka Scratch 3.0, masukkan semua <strong>Backdrop</strong> &amp; <strong>Sprite</strong>
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'ruler' as JuniorIconName,
            text: (
              <>
                Atur <strong>Size</strong> &amp; tempatkan semua Sprite di <strong>Posisi Awal</strong> yang pas!
              </>
            ),
          },
        ].map((item) => (
          <div
            key={item.num}
            style={{
              flex: 1,
              borderRadius: 22,
              background: item.bg,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              padding: '16px 22px',
              ...row,
              gap: 16,
            }}
          >
            <div style={{ width: 56, height: 56, borderRadius: 18, background: item.badgeBg, color: item.badgeText, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
              {item.num}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.24 }}>
              <JuniorIcon name={item.icon} size={26} style={{ marginRight: 8 }} />
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Scratch 3.0 Architect Asset Staging Studio */}
      <MacWindowCard
        left={X0}
        top={400}
        width={1280}
        height={565}
        titleBarColor={SCRATCH_BLUE}
        headerLabel="Studio Aset & Storyboard Scratch 3.0"
        padding={22}
      >
        <div style={{ height: '100%', display: 'flex', gap: 22 }}>
          <div style={{ width: 460, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700, marginBottom: 10 }}>
                Cek 2 Backdrop Proyek:
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {(['awal', 'menang'] as const).map((sc) => (
                  <button
                    key={sc}
                    type="button"
                    onClick={() => {
                      playArchitectSound('click');
                      setScene(sc);
                    }}
                    className="cpj48-card-btn"
                    style={{
                      flex: 1,
                      padding: '12px 10px',
                      borderRadius: 16,
                      border: `3px solid ${CHARCOAL}`,
                      background: scene === sc ? SUNNY : WHITE,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    {sc === 'awal' ? 'Backdrop Awal' : 'Backdrop Akhir'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700, marginBottom: 10 }}>
                Atur Size Sprite Utama:
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {([60, 85, 110] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => {
                      playArchitectSound('click');
                      setCatSize(sz);
                    }}
                    className="cpj48-card-btn"
                    style={{
                      flex: 1,
                      padding: '12px 8px',
                      borderRadius: 16,
                      border: `3px solid ${CHARCOAL}`,
                      background: catSize === sz ? TEAL : WHITE,
                      color: catSize === sz ? WHITE : CHARCOAL,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 21,
                      fontWeight: 700,
                    }}
                  >
                    Size: {sz}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: '14px 18px', borderRadius: 18, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, fontSize: 20, fontWeight: 800, lineHeight: 1.32 }}>
              Semua karakter &amp; latar tertata rapi di posisi awal — siap dikode minggu depan!
            </div>
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: 22,
              border: `3.5px solid ${CHARCOAL}`,
              background:
                scene === 'awal'
                  ? 'linear-gradient(180deg, #BAE6FD 0%, #DCFCE7 100%)'
                  : 'linear-gradient(135deg, #FEF9C3 0%, #DDD6FE 100%)',
              position: 'relative',
              overflow: 'hidden',
              ...row,
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 20,
            }}
          >
            <div style={{ position: 'absolute', left: 16, top: 14, padding: '5px 14px', borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
              {scene === 'awal' ? 'Adegan 1: Mulai (Posisi Awal)' : 'Adegan 3: Menang / Tamat!'}
            </div>

            <div style={{ transition: 'transform 200ms ease', transform: `scale(${catSize / 85})` }}>
              <ScratchCatSvg size={150} waving={scene === 'menang'} />
            </div>

            {scene === 'awal' ? <JuniorIcon name="star-glow" size={96} /> : <JuniorIcon name="trophy" size={115} />}
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko & Scratch Cat */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', animation: live ? 'cpj48-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thumbs-up" width={265} badgeIcon={<JuniorIcon name="ruler" size={22} />} speechBubble="Rapi sekali!" />
          <ScratchCatSvg size={135} waving />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 48 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="RANCANGAN SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj48-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj48-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="map" size={50} />
      </div>

      <SlideTitle top={135} size={58} align="center" maxWidth={1540}>
        Hore! Kamu Arsitek <Highlight>Game &amp; Cerita Cilik Hebat!</Highlight>
      </SlideTitle>

      {/* Center Celebration Window */}
      <MacWindowCard
        left={260}
        top={260}
        width={1060}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 48"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, gap: 22, textAlign: 'center' }}>
          {/* Golden Architect Blueprint Scroll & Ruler Medal */}
          <div style={{ animation: live ? 'cpj48-float 2.6s ease-in-out infinite' : undefined }}>
            <svg width={215} height={215} viewBox="0 0 210 210">
              <path d="M72 128 L52 195 L82 180 L96 198 L106 135 Z" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M138 128 L158 195 L128 180 L114 198 L104 135 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="105" cy="96" r="72" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="105" cy="96" r="56" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.2} />
              {/* Architect Blueprint + Ruler */}
              <rect x="68" y="66" width="74" height="54" rx="10" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={3.5} />
              <rect x="78" y="76" width="16" height="34" rx="4" fill={WHITE} />
              <rect x="97" y="76" width="16" height="34" rx="4" fill={STABILO} />
              <rect x="116" y="76" width="16" height="34" rx="4" fill="#A7F3D0" />
            </svg>
          </div>

          <div
            style={{
              padding: '14px 36px',
              borderRadius: 99,
              background: SUNNY,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 31,
              fontWeight: 700,
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="medal" size={34} />
            <span>Lencana Master Arsitek Storyboard &amp; Aset</span>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, lineHeight: 1.38, maxWidth: 920, color: CHARCOAL }}>
            Kamu sudah jago merancang{' '}
            <Highlight color="#DBEAFE">Alur Karya</Highlight> &amp; menyiapkan{' '}
            <Highlight color="#DCFCE7">Sprite + Backdrop!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot pose="jump" width={295} badgeIcon={<JuniorIcon name="ruler" size={22} />} speechBubble="Siap Ngoding!" />
          <div style={{ animation: live ? 'cpj48-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <ScratchCatSvg size={185} waving />
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// Speaker Notes (Talk Track for Mentors teaching Ages 5–7)
// ============================================================================
export const notes: (string | undefined)[] = [
  `Selamat datang di Pertemuan 48 — Arsitek Game & Cerita Cilik! 🗺️📐
Hari ini anak-anak menjadi arsitek cilik dengan merancang Storyboard 3 kotak dan menyiapkan seluruh Sprite & Backdrop Proyek Akhir!`,

  `Dua misi spesial hari ini:
1. Menggambar Peta Cerita (Storyboard) 3 kotak: Awal - Aksi - Akhir.
2. Menyiapkan semua Sprite & Backdrop Proyek Akhir di Scratch 3.0!`,

  `Kamus Arsitek Cilik — Apa Itu "Storyboard"?
Storyboard adalah gambar rencana urutan kejadian dari awal sampai akhir — seperti komik 3 kotak sebelum kita mulai merangkai kode!`,

  `Contoh Storyboard #1 — Cerita Petualangan:
1. Awal: Kucing di Pantai berkata "Ayo terbang!"
2. Tengah: Latar pindah ke Luar Angkasa & bertemu Bintang
3. Akhir: Menari gembira & muncul ucapan "Tamat!"`,

  `Contoh Storyboard #2 — Game Seru:
1. Mulai: Klik Bendera Hijau, Skor = 0
2. Main: Gerak pakai Panah Keyboard & tangkap Bintang
3. Menang: Skor jadi 5 -> Bunyi hore & Menang!`,

  `Permainan Cepat! Ayo tebak bersama:
Mana urutan Storyboard yang benar — Pilihan A (1. Awal Mulai -> 2. Aksi Seru -> 3. Menang/Tamat) atau Pilihan B (Terbalik)?`,

  `Langkah 2 — Kumpulkan Aset di Scratch 3.0:
1. Backdrop: masukkan pemandangan Awal & Akhir/Menang
2. Sprite: pilih tokoh utama, hadiah/rintangan, atau alat musik
3. Size & Posisi: atur ukuran dan taruh di titik awal!`,

  `Tips Arsitek Cilik:
BOLEH gambar 3 kotak Storyboard dulu & atur Size/posisi awal setiap Sprite.
JANGAN langsung menumpuk blok tanpa tahu alur, atau lupa menambah Backdrop ke-2 untuk layar menang!`,

  `Misi Praktik Buat Storyboard & Siapkan Aset Proyek Akhir!
Gunakan Studio Aset interaktif di slide untuk mengecek Backdrop Awal vs Backdrop Akhir serta mengatur Size Sprite sebelum menerapkannya di Scratch 3.0!`,

  `Hore! Kamu Arsitek Game & Cerita Cilik Hebat! 🎉🏅
Selamat meraih Lencana Master Arsitek Storyboard & Aset di Pertemuan 48!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 48 — Arsitek Game & Cerita Cilik!',
  createdAt: '2026-11-16T16:28:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03KamusStoryboard,
  Slide04ContohCerita,
  Slide05ContohGame,
  Slide06AyoTebak,
  Slide07SiapkanAset,
  Slide08TipsArsitek,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-47-misi-karya-impianku';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj47-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj47-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj47-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj47-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj47-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj47-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj47-card-btn:hover {
  transform: translateY(-4px);
}
.cpj47-card-btn:active {
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

/** Playful spark chime or boing via Web Audio API */
function playIdeaSound(kind: 'spark' | 'boing' | 'win') {
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
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.16, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
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
const LAVENDER_SOFT = '#F5F3FF';
const SKY = '#60A5FA';
const SKY_SOFT = '#EFF6FF';
const PINK = '#EC4899';
const PINK_SOFT = '#FCE7F3';
const ORANGE_SOFT = '#FFF7ED';
const SCRATCH_BLUE = '#4D97FF';
const SCRATCH_LOOKS = '#9966FF';
const SCRATCH_VAR = '#FF8C1A';
const SCRATCH_VAR_DARK = '#DB6E00';

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
  accentDot = SUNNY,
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
          animation: live ? 'cpj47-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 47 • Misi Karya Impianku!</span>
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
// Reusable Visuals (Scratch Cat, Blocks, Astronaut, Dinosaur, Fish)
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

const AstronautSvg = ({ size = 96 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 110 110" fill="none">
    <rect x="26" y="54" width="58" height="40" rx="16" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
    <circle cx="55" cy="36" r="24" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
    <ellipse cx="55" cy="37" rx="16" ry="12" fill="#38BDF8" stroke={CHARCOAL} strokeWidth={2.6} />
    <circle cx="49" cy="35" r="2.6" fill={CHARCOAL} />
    <circle cx="61" cy="35" r="2.6" fill={CHARCOAL} />
    <rect x="40" y="66" width="30" height="14" rx="5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
  </svg>
);

const DinoSvg = ({ size = 96 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 110 110" fill="none">
    <path d="M24 84 L38 70 L38 42 C38 24, 62 18, 72 30 C78 36, 86 38, 86 46 C86 54, 76 58, 66 58 L66 84 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
    <circle cx="66" cy="36" r="4" fill={WHITE} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="67" cy="36" r="2" fill={CHARCOAL} />
    <polygon points="34,42 26,38 34,32" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.4} />
    <polygon points="34,58 26,54 34,48" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.4} />
  </svg>
);

const FishSvg = ({ size = 96 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 110 110" fill="none">
    <path d="M16 38 L34 54 L16 70 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
    <ellipse cx="62" cy="54" rx="30" ry="21" fill="#FB923C" stroke={CHARCOAL} strokeWidth={3.5} />
    <circle cx="74" cy="48" r="5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.2} />
    <circle cx="75" cy="48" r="2.5" fill={CHARCOAL} />
    <path d="M74 60 Q82 64 88 58" stroke={CHARCOAL} strokeWidth={2.6} strokeLinecap="round" fill="none" />
  </svg>
);

const Scratch3Block = ({ color, scale = 1, children }: { color: string; scale?: number; children: ReactNode }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(46 * scale),
      padding: `0 ${Math.round(16 * scale)}px`,
      borderRadius: Math.round(12 * scale),
      background: color,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      color: WHITE,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

const WhiteOval = ({ val }: { val: string | number }) => (
  <span style={{ padding: '2px 10px', borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}`, color: CHARCOAL }}>
    {val}
  </span>
);

const DropPill = ({ bg, label }: { bg: string; label: string }) => (
  <span style={{ padding: '2px 11px', borderRadius: 99, background: bg, border: `2px solid ${WHITE}`, color: WHITE }}>
    {label}
  </span>
);

// ============================================================================
// SLIDE 01 — Cover
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 47" accentDot={SUNNY}>
      {/* Left Hero Copy */}
      <div style={{ ...abs(X0, 225, 860) }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 99, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, marginBottom: 22 }}>
          <JuniorIcon name="bulb" size={26} />
          <span>Persiapan Proyek Akhir (Final Project)</span>
        </div>

        <h1 style={{ margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 90, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <Highlight>Misi Karya</Highlight>
          <br />
          Impianku!
        </h1>

        <p style={{ margin: '30px 0 0', fontSize: 31, fontWeight: 700, lineHeight: 1.4, color: MUTED, maxWidth: 790 }}>
          Memilih Tema &amp; Mengeksplorasi Ide{' '}
          <strong style={{ color: CHARCOAL }}>Proyek Akhir</strong> (<em>Final Project</em>) di Scratch 3.0!
        </p>

        <div style={{ ...row, gap: 16, marginTop: 34 }}>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="book-open" size={24} />
            <span>Cerita</span>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="gamepad" size={24} />
            <span>Game Seru</span>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: LAVENDER_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="music-note" size={24} />
            <span>Konser Musik</span>
          </div>
        </div>
      </div>

      {/* Right Visual: Biko with Idea Bulb + Scratch Cat in Front of 3 Project Portals */}
      <MacWindowCard
        left={1010}
        top={185}
        width={810}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Scratch 3.0 • 3 Gerbang Karya Impian"
        padding={26}
      >
        <div style={{ height: '100%', borderRadius: 20, border: `3px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #EFF6FF 0%, #FEF9C3 100%)', position: 'relative', overflow: 'hidden', padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* 3 Project Portals */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between' }}>
            {[
              { label: 'Cerita Petualangan', icon: 'book-open' as JuniorIconName, bg: SKY_SOFT, border: SKY },
              { label: 'Game Seru', icon: 'gamepad' as JuniorIconName, bg: TEAL_SOFT, border: TEAL },
              { label: 'Konser Musik', icon: 'music-note' as JuniorIconName, bg: LAVENDER_SOFT, border: LAVENDER },
            ].map((p) => (
              <div key={p.label} style={{ flex: 1, height: 195, borderRadius: 22, background: p.bg, border: `3.5px solid ${p.border}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol, gap: 12, padding: 12, textAlign: 'center' }}>
                <JuniorIcon name={p.icon} size={58} />
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700 }}>{p.label}</span>
              </div>
            ))}
          </div>

          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'flex-end' }}>
            <div style={{ animation: live ? 'cpj47-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot pose="thumbs-up" width={245} badgeIcon={<JuniorIcon name="bulb" size={22} />} speechBubble="Pilih ide seru!" />
            </div>
            <div style={{ animation: live ? 'cpj47-hop 2.4s ease-in-out infinite' : undefined }}>
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
        Apa Misi Proyek Akhir Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      {/* Biko Left Anchor */}
      <div style={{ ...abs(95, 295, 360, 620), ...centerCol }}>
        <div style={{ animation: live ? 'cpj47-hop 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="point-left" width={320} badgeIcon={<JuniorIcon name="bulb" size={22} />} speechBubble="Ide brilian!" />
        </div>
      </div>

      {/* macOS Window with 2 Cards */}
      <MacWindowCard
        left={480}
        top={240}
        width={1340}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Misi Pertemuan 47"
        padding={42}
      >
        <div style={{ display: 'flex', gap: 36, height: '100%' }}>
          {/* Card 1 */}
          <div style={{ flex: 1, borderRadius: 24, background: SUNNY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>
            <div style={{ ...row, gap: 18 }}>
              <JuniorIcon name="bulb" size={95} />
              <JuniorIcon name="crown" size={76} />
            </div>
            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Pilih <span style={{ color: '#B45309' }}>1 Tema Karya</span> Favoritmu!
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ flex: 1, borderRadius: 24, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>
            <div style={{ ...row, gap: 16 }}>
              <JuniorIcon name="landscape" size={88} />
              <AstronautSvg size={95} />
            </div>
            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Siapkan <span style={{ color: '#1D4ED8' }}>Latar &amp; Tokoh</span> Proyek Akhirmu!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Bekal Kekuatan Supermu di Scratch 3.0! (Grid 2x2)
// ============================================================================
const Slide03EmpatKekuatan: Page = () => {
  return (
    <JuniorFrame badge="BEKAL CODER CILIK" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Lihat <Highlight>4 Kekuatan</Highlight> yang Sudah Kamu Kuasai!
      </SlideTitle>

      {/* Grid 2x2 Power Cards inside macOS Window */}
      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Senjata Rahasia Scratch 3.0"
        padding={30}
      >
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 24 }}>
          {[
            { title: 'Gerak & Kemudi', desc: 'move, glide, Tombol Panah', bg: SKY_SOFT, border: SKY, icon: 'footprints' as JuniorIconName },
            { title: 'Sulap Tampilan', desc: 'next costume, color effect, say', bg: LAVENDER_SOFT, border: LAVENDER, icon: 'paintbrush' as JuniorIconName },
            { title: 'Suara & Musik', desc: 'play sound, play note', bg: PINK_SOFT, border: PINK, icon: 'music-note' as JuniorIconName },
            { title: 'Sensor & Skor', desc: 'if touching, papan Skor', bg: ORANGE_SOFT, border: SCRATCH_VAR, icon: 'compass' as JuniorIconName },
          ].map((c) => (
            <div
              key={c.title}
              style={{
                borderRadius: 24,
                background: c.bg,
                border: `3.5px solid ${c.border}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                padding: '22px 26px',
                ...row,
                gap: 22,
              }}
            >
              <div style={{ width: 88, height: 88, borderRadius: 22, background: WHITE, border: `3px solid ${CHARCOAL}`, ...centerCol, flexShrink: 0 }}>
                <JuniorIcon name={c.icon} size={50} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: CHARCOAL }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: MUTED, marginTop: 4 }}>
                  <code>{c.desc}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MacWindowCard>

      {/* Right Biko Anchor */}
      <div style={{ ...abs(1485, 360, 350, 560), ...centerCol }}>
        <BikoMascot pose="thumbs-up" width={310} badgeIcon={<JuniorIcon name="star-glow" size={22} />} speechBubble="Kamu sudah jago!" />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Pilih 1 dari 3 Ide Proyek Akhir Seru!
// ============================================================================
const Slide04PilihTema: Page = () => {
  const [selectedTheme, setSelectedTheme] = useState<'story' | 'game' | 'music'>('game');

  return (
    <JuniorFrame badge="PILIH TEMA IMPIANMU" accentDot={TEAL}>
      <SlideTitle>
        Kamu Mau Bikin <Highlight>Karya Apa?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1720}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Klik Tema Favoritmu!"
        padding={34}
      >
        <div style={{ display: 'flex', gap: 30, height: '100%' }}>
          {[
            {
              key: 'story' as const,
              title: 'Cerita Petualangan',
              desc: 'Jalan-jalan, ngobrol dialog, & ganti latar!',
              bg: SKY_SOFT,
              border: SKY,
              icon: 'book-open' as JuniorIconName,
              visual: <AstronautSvg size={130} />,
            },
            {
              key: 'game' as const,
              title: 'Game Tangkap / Terbang',
              desc: 'Gerak pakai keyboard, hindari rintangan, & kumpul skor!',
              bg: TEAL_SOFT,
              border: TEAL,
              icon: 'gamepad' as JuniorIconName,
              visual: <ScratchCatSvg size={135} waving />,
            },
            {
              key: 'music' as const,
              title: 'Kartu Ajaib / Konser Musik',
              desc: 'Klik karakter berubah pelangi & mainkan lagu!',
              bg: LAVENDER_SOFT,
              border: LAVENDER,
              icon: 'music-note' as JuniorIconName,
              visual: <JuniorIcon name="rainbow" size={120} />,
            },
          ].map((card) => {
            const active = selectedTheme === card.key;
            return (
              <button
                key={card.key}
                type="button"
                onClick={() => {
                  playIdeaSound('spark');
                  setSelectedTheme(card.key);
                }}
                className="cpj47-card-btn"
                style={{
                  flex: 1,
                  borderRadius: 26,
                  background: card.bg,
                  border: `4px solid ${active ? CHARCOAL : card.border}`,
                  boxShadow: active ? `0 10px 0 ${CHARCOAL}` : `0 6px 0 ${CHARCOAL}`,
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div style={{ ...row, gap: 10 }}>
                  <JuniorIcon name={card.icon} size={38} />
                  <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                    {card.title}
                  </span>
                </div>

                <div style={{ width: '100%', height: 225, borderRadius: 20, background: WHITE, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
                  {card.visual}
                </div>

                <div style={{ padding: '12px 18px', borderRadius: 16, background: active ? SUNNY : WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 24, fontWeight: 800, lineHeight: 1.32 }}>
                  {card.desc}
                </div>
              </button>
            );
          })}
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Langkah #1: Tentukan Latar & Tokoh Utamamu!
// ============================================================================
const Slide05LatarDanTokoh: Page = () => {
  const [backdrop, setBackdrop] = useState<'Luar Angkasa' | 'Bawah Laut' | 'Hutan' | 'Pesta'>('Luar Angkasa');
  const [hero, setHero] = useState<'Kucing' | 'Astronot' | 'Dino' | 'Ikan'>('Astronot');

  const bgGradient =
    backdrop === 'Luar Angkasa'
      ? 'linear-gradient(180deg, #1E1B4B 0%, #312E81 100%)'
      : backdrop === 'Bawah Laut'
        ? 'linear-gradient(180deg, #0284C7 0%, #38BDF8 100%)'
        : backdrop === 'Hutan'
          ? 'linear-gradient(180deg, #86EFAC 0%, #22C55E 100%)'
          : 'linear-gradient(135deg, #FEF9C3 0%, #FCE7F3 100%)';

  return (
    <JuniorFrame badge="PERSIAPAN BAHAN KARYA" accentDot={SKY}>
      <SlideTitle>
        Pilih <Highlight color="#DBEAFE">Latar</Highlight> &amp;{' '}
        <Highlight>Tokoh Utama!</Highlight>
      </SlideTitle>

      {/* Left Interactive Backdrop & Sprite Picker */}
      <MacWindowCard
        left={X0}
        top={245}
        width={840}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Galeri Latar & Tokoh Scratch 3.0"
        padding={26}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ flex: 1, borderRadius: 20, border: `3px solid ${CHARCOAL}`, background: bgGradient, ...centerCol, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 16, top: 14, padding: '5px 14px', borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
              {backdrop} + {hero}
            </div>
            {hero === 'Kucing' && <ScratchCatSvg size={180} waving />}
            {hero === 'Astronot' && <AstronautSvg size={180} />}
            {hero === 'Dino' && <DinoSvg size={180} />}
            {hero === 'Ikan' && <FishSvg size={180} />}
          </div>

          <div style={{ ...row, gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {(['Luar Angkasa', 'Bawah Laut', 'Hutan', 'Pesta'] as const).map((b) => (
              <button key={b} type="button" onClick={() => { playIdeaSound('spark'); setBackdrop(b); }} style={{ padding: '7px 14px', borderRadius: 12, border: `2.5px solid ${CHARCOAL}`, background: backdrop === b ? SUNNY : WHITE, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
                {b}
              </button>
            ))}
          </div>
          <div style={{ ...row, gap: 10, justifyContent: 'center' }}>
            {(['Kucing', 'Astronot', 'Dino', 'Ikan'] as const).map((h) => (
              <button key={h} type="button" onClick={() => { playIdeaSound('spark'); setHero(h); }} style={{ padding: '7px 16px', borderRadius: 12, border: `2.5px solid ${CHARCOAL}`, background: hero === h ? TEAL : WHITE, color: hero === h ? WHITE : CHARCOAL, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
                {h}
              </button>
            ))}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={980}
        top={245}
        width={840}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Tentukan 2 Bahan Awal"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="landscape" bgColor={SKY_SOFT} fontSize={32}>
              <strong>Latar (Backdrop):</strong> Luar Angkasa, Bawah Laut, Hutan, atau Pesta?
            </BulletRow>
            <BulletRow icon="hero" bgColor={SUNNY_SOFT} fontSize={32}>
              <strong>Tokoh Utama (Sprite):</strong> Kucing Scratch, Astronot, Dinosaurus, atau Ikan?
            </BulletRow>
          </div>

          <div style={{ ...row, gap: 20, padding: '18px 24px', borderRadius: 20, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}` }}>
            <BikoMascot pose="point-left" width={145} />
            <div style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.32 }}>
              Cocokkan tokoh dengan dunianya supaya ceritamu atau gamemu terasa hidup!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Cocokkan Ide dengan Bloknya!
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle size={50} maxWidth={1680}>
        Jika Kamu Membuat <Highlight>Game Tangkap Bintang</Highlight>, Blok Apa untuk Menambah Poin?
      </SlideTitle>

      {/* Card A — Correct: change [Skor] by (1) */}
      <button
        type="button"
        onClick={() => {
          playIdeaSound('win');
          setPicked('A');
        }}
        className="cpj47-card-btn"
        style={{
          ...abs(X0, 250, 820, 490),
          borderRadius: 30,
          background: picked === 'A' ? TEAL_SOFT : WHITE,
          border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 36,
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
            Tambah Skor (Skor)
          </span>
        </div>

        <div style={{ ...row, gap: 18 }}>
          <JuniorIcon name="star-glow" size={68} />
          <Scratch3Block color={SCRATCH_VAR} scale={1.24}>
            <span>change</span>
            <DropPill bg={SCRATCH_VAR_DARK} label="Skor v" />
            <span>by</span>
            <WhiteOval val={1} />
          </Scratch3Block>
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'A' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={26} />
              <span>Benar! Blok Variables menambah poin!</span>
            </div>
          ) : (
            <span style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Card B — Wrong: switch backdrop */}
      <button
        type="button"
        onClick={() => {
          playIdeaSound('boing');
          setPicked('B');
        }}
        className="cpj47-card-btn"
        style={{
          ...abs(1000, 250, 820, 490),
          borderRadius: 30,
          background: picked === 'B' ? CORAL_SOFT : WHITE,
          border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 36,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          animation: picked === 'B' ? 'cpj47-shake 320ms ease' : undefined,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 16, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
            B
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Ganti Latar (Backdrop)
          </span>
        </div>

        <Scratch3Block color={SCRATCH_LOOKS} scale={1.2}>
          <span>switch backdrop to</span>
          <DropPill bg="#774DCB" label="Space" />
        </Scratch3Block>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'B' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={26} />
              <span>Bukan! Itu untuk mengganti latar belakang!</span>
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
        <div style={{ animation: live ? 'cpj47-float 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thinking" width={165} badgeIcon={<JuniorIcon name="question" size={22} />} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
          {picked === 'A'
            ? 'Tepat! Setiap game yang menghitung poin memakai change [Skor] by (1)!'
            : picked === 'B'
              ? 'Ups! switch backdrop untuk cerita pindah tempat. Pilih blok Skor!'
              : 'Tunjuk blok yang paling cocok di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Peta Ide Karyaku: 3 Pertanyaan Ajaib!
// ============================================================================
const Slide07PetaIde: Page = () => {
  return (
    <JuniorFrame badge="RENCANA PROYEK AKHIR" accentDot={TEAL}>
      <SlideTitle>
        Rancang <Highlight>Peta Ide</Highlight> Karyamu!
      </SlideTitle>

      {/* 3 Connected Flow Cards */}
      <div style={{ ...abs(X0, 250, W, 385), display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ flex: 1, height: '100%', borderRadius: 28, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 8px 0 ${CHARCOAL}`, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, ...centerCol }}>
            1
          </div>
          <AstronautSvg size={110} />
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>Siapa Tokohnya?</div>
          <div style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Contoh: Astronot &amp; Bintang</div>
        </div>

        <JuniorIcon name="arrow-right" size={44} />

        <div style={{ flex: 1, height: '100%', borderRadius: 28, background: SUNNY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 8px 0 ${CHARCOAL}`, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: SUNNY, color: CHARCOAL, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, ...centerCol }}>
            2
          </div>
          <JuniorIcon name="keyboard" size={96} />
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>Apa Aksinya?</div>
          <div style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Terbang pakai panah &amp; tangkap bintang</div>
        </div>

        <JuniorIcon name="arrow-right" size={44} />

        <div style={{ flex: 1, height: '100%', borderRadius: 28, background: TEAL_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 8px 0 ${CHARCOAL}`, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: TEAL, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, ...centerCol }}>
            3
          </div>
          <JuniorIcon name="trophy" size={96} />
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>Apa Kejutannya?</div>
          <div style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Bunyi hore &amp; skor bertambah!</div>
        </div>
      </div>

      {/* Bottom Biko Idea Sketch Strip */}
      <MacWindowCard
        left={X0}
        top={665}
        width={W}
        height={300}
        titleBarColor={WHITE}
        headerLabel="Papan Sketsa Biko"
        padding={22}
      >
        <div style={{ height: '100%', ...row, justifyContent: 'center', gap: 36 }}>
          <BikoMascot pose="detective" width={200} badgeIcon={<JuniorIcon name="bulb" size={22} />} />
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.3, maxWidth: 1120 }}>
            Jawab 3 pertanyaan ini dulu sebelum menyusun kode, supaya karyamu langsung jelas arahnya!
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Memilih Ide Proyek Akhir (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsIde: Page = () => {
  return (
    <JuniorFrame badge="TIPS KREATOR PROYEK AKHIR" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Ide Karyamu <Highlight>Seru &amp; Mudah Dibuat!</Highlight>
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
            <BulletRow icon="star-glow" bgColor={TEAL_SOFT} fontSize={29}>
              Pilih tema yang <strong>Paling Kamu Sukai</strong>
            </BulletRow>
            <BulletRow icon="target" bgColor={SUNNY_SOFT} fontSize={29}>
              Mulai dengan <strong>2–3 Sprite Utama</strong> agar rapi &amp; fokus
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <AstronautSvg size={105} />
            <JuniorIcon name="star-glow" size={85} />
            <JuniorIcon name="check" size={64} />
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
              Memasukkan <strong>Terlalu Banyak Sprite (10+)</strong> sekaligus
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={29}>
              Takut mencoba ide kreatifmu sendiri
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 20px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: 320, gap: 6, justifyContent: 'center' }}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <ScratchCatSvg key={n} size={76} />
              ))}
            </div>
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Siapkan Kanvas Proyek Akhirmu!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [tema, setTema] = useState<'Cerita' | 'Game' | 'Musik'>('Game');
  const [hero, setHero] = useState<'Kucing' | 'Astronot' | 'Dino'>('Astronot');
  const [tested, setTested] = useState(false);

  const bgGradient =
    tema === 'Cerita'
      ? 'linear-gradient(180deg, #1E1B4B 0%, #312E81 100%)'
      : tema === 'Game'
        ? 'linear-gradient(180deg, #BAE6FD 0%, #DCFCE7 100%)'
        : 'linear-gradient(135deg, #FEF9C3 0%, #EDE9FE 100%)';

  return (
    <JuniorFrame badge="AYO MULAI BERKARYA!" accentDot={SUNNY}>
      <SlideTitle>
        Misi <Highlight>Siapkan Karya Impianku!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'bulb' as JuniorIconName,
            text: (
              <>
                Tentukan <strong>1 Tema Pilihanmu</strong> (Cerita / Game / Musik &amp; Kartu)
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
                Buka Scratch 3.0, pasang <strong>Latar</strong> &amp; <strong>2–3 Sprite</strong> pilihanmu
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'play' as JuniorIconName,
            text: (
              <>
                Pasang <strong>1 Gerakan atau Suara</strong> awal untuk tokoh utamamu!
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

      {/* Interactive Scratch 3.0 Dream Project Starter Builder */}
      <MacWindowCard
        left={X0}
        top={400}
        width={1280}
        height={565}
        titleBarColor={SCRATCH_BLUE}
        headerLabel="Kanvas Ide Proyek Akhir"
        padding={22}
      >
        <div style={{ height: '100%', display: 'flex', gap: 22 }}>
          {/* Controls Column */}
          <div style={{ width: 470, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700, marginBottom: 10 }}>
                1. Pilih Tema Proyek:
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {(['Cerita', 'Game', 'Musik'] as const).map((t) => (
                  <button key={t} type="button" onClick={() => { playIdeaSound('spark'); setTema(t); setTested(false); }} className="cpj47-card-btn" style={{ flex: 1, padding: '10px 8px', borderRadius: 14, border: `3px solid ${CHARCOAL}`, background: tema === t ? SUNNY : WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700, marginBottom: 10 }}>
                2. Pilih Tokoh Utama:
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {(['Kucing', 'Astronot', 'Dino'] as const).map((h) => (
                  <button key={h} type="button" onClick={() => { playIdeaSound('spark'); setHero(h); setTested(false); }} className="cpj47-card-btn" style={{ flex: 1, padding: '10px 8px', borderRadius: 14, border: `3px solid ${CHARCOAL}`, background: hero === h ? TEAL : WHITE, color: hero === h ? WHITE : CHARCOAL, fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playIdeaSound('win');
                setTested(true);
              }}
              className="cpj47-card-btn"
              style={{
                padding: '14px 20px',
                borderRadius: 18,
                background: SCRATCH_BLUE,
                color: WHITE,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 23,
                fontWeight: 700,
                ...row,
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <JuniorIcon name="flag" size={24} />
              <span>Tes Aksi Awal Karyaku!</span>
            </button>
          </div>

          {/* Live Stage Preview */}
          <div style={{ flex: 1, borderRadius: 22, border: `3.5px solid ${CHARCOAL}`, background: bgGradient, position: 'relative', overflow: 'hidden', ...centerCol }}>
            <div style={{ position: 'absolute', left: 18, top: 16, padding: '6px 16px', borderRadius: 99, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
              Tema {tema} • Tokoh {hero}
            </div>

            <div style={{ transform: tested ? 'translateY(-22px) scale(1.1)' : 'none', transition: 'transform 220ms ease', ...row, gap: 28, alignItems: 'center' }}>
              {hero === 'Kucing' && <ScratchCatSvg size={175} waving={tested} />}
              {hero === 'Astronot' && <AstronautSvg size={175} />}
              {hero === 'Dino' && <DinoSvg size={175} />}

              {tema === 'Game' && <JuniorIcon name="star-glow" size={96} />}
              {tema === 'Cerita' && <JuniorIcon name="moon" size={96} />}
              {tema === 'Musik' && <JuniorIcon name="music-note" size={96} />}
            </div>

            {tested && (
              <div style={{ position: 'absolute', bottom: 20, padding: '8px 20px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>
                Kanvas Siap! Lanjutkan di Scratch 3.0!
              </div>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko & Scratch Cat */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', animation: live ? 'cpj47-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thumbs-up" width={265} badgeIcon={<JuniorIcon name="bulb" size={22} />} speechBubble="Ide keren!" />
          <ScratchCatSvg size={135} waving />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 47 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI IDE SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj47-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj47-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="bulb" size={50} />
      </div>

      <SlideTitle top={135} size={58} align="center" maxWidth={1540}>
        Hore! Kamu Perancang <Highlight>Karya Impian Hebat!</Highlight>
      </SlideTitle>

      {/* Center Celebration Window */}
      <MacWindowCard
        left={260}
        top={260}
        width={1060}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 47"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, gap: 22, textAlign: 'center' }}>
          {/* Golden Idea Star Lightbulb & Brush Medal */}
          <div style={{ animation: live ? 'cpj47-float 2.6s ease-in-out infinite' : undefined }}>
            <svg width={215} height={215} viewBox="0 0 210 210">
              <path d="M72 128 L52 195 L82 180 L96 198 L106 135 Z" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M138 128 L158 195 L128 180 L114 198 L104 135 Z" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="105" cy="96" r="72" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="105" cy="96" r="56" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.2} />
              {/* Glowing Idea Bulb */}
              <circle cx="105" cy="86" r="24" fill="#FEF08A" stroke={CHARCOAL} strokeWidth={3.5} />
              <rect x="94" y="109" width="22" height="14" rx="4" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={3} />
              <polygon points="105,72 109,81 119,82 112,89 114,98 105,93 96,98 98,89 91,82 101,81" fill={CORAL} />
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
            <span>Lencana Kreator Ide Proyek Akhir (Final Project)</span>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, lineHeight: 1.38, maxWidth: 920, color: CHARCOAL }}>
            Kamu sudah menemukan{' '}
            <Highlight color="#DBEAFE">Tema &amp; Bahan Karya Impianmu</Highlight> di Scratch 3.0!
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot pose="jump" width={295} badgeIcon={<JuniorIcon name="bulb" size={22} />} speechBubble="Ide Hebat!" />
          <div style={{ animation: live ? 'cpj47-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 47 — Misi Karya Impianku! 💡✨
Hari ini anak-anak memilih tema dan merancang ide Proyek Akhir (Final Project) di Scratch 3.0!`,

  `Dua misi spesial hari ini:
1. Memilih 1 Tema Karya favorit untuk Proyek Akhir.
2. Menyiapkan Latar (Backdrop) dan Tokoh Utama (Sprite)!`,

  `Lihat 4 Kekuatan Scratch 3.0 yang sudah dikuasai anak-anak:
1. Gerak & Kemudi (move, glide, Panah)
2. Sulap Tampilan (next costume, color effect, say)
3. Suara & Musik (play sound, play note)
4. Sensor & Skor (if touching, papan Skor)`,

  `Pilih 1 dari 3 Ide Proyek Akhir Seru:
1. Cerita Petualangan (jalan, dialog, ganti latar)
2. Game Tangkap / Terbang (keyboard, rintangan, skor)
3. Kartu Ajaib / Konser Musik (klik sulap warna & main lagu)!`,

  `Langkah 1 — Pilih Latar (Backdrop) & Tokoh Utama (Sprite):
Cocokkan latar seperti Luar Angkasa, Bawah Laut, Hutan, atau Pesta dengan tokoh favoritmu!`,

  `Permainan Cepat! Ayo tebak bersama:
Jika kamu membuat Game Tangkap Bintang, blok apa untuk menambah poin — Pilihan A (change [Skor] by (1)) atau Pilihan B (switch backdrop to [Space])?`,

  `Rancang Peta Ide Karyamu dengan 3 Pertanyaan Ajaib:
1. Siapa Tokohnya?
2. Apa Aksinya?
3. Apa Kejutannya?`,

  `Tips Jagoan Memilih Ide Proyek Akhir:
BOLEH pilih tema paling disukai & mulai dengan 2-3 Sprite utama agar rapi.
JANGAN memasukkan terlalu banyak Sprite (10+) sekaligus, dan jangan takut mencoba ide kreatifmu sendiri!`,

  `Misi Praktik Siapkan Kanvas Proyek Akhirmu!
Ajak anak-anak memilih Tema & Tokoh pada kanvas interaktif slide, lalu membuka Scratch 3.0 untuk memasang latar, 2-3 Sprite, dan 1 gerakan/suara awal!`,

  `Hore! Kamu Perancang Karya Impian Hebat! 🎉🏅
Selamat meraih Lencana Kreator Ide Proyek Akhir (Final Project) menuju pameran kelulusan di Pertemuan 48!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 47 — Misi Karya Impianku!',
  createdAt: '2026-11-16T16:22:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03EmpatKekuatan,
  Slide04PilihTema,
  Slide05LatarDanTokoh,
  Slide06AyoTebak,
  Slide07PetaIde,
  Slide08TipsIde,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

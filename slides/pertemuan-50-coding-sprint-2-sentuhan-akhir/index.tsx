import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-50-coding-sprint-2-sentuhan-akhir';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj50-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj50-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj50-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj50-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj50-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj50-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj50-card-btn:hover {
  transform: translateY(-4px);
}
.cpj50-card-btn:active {
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

/** Playful sound effect synthesis via Web Audio API */
function playFinishingSound(kind: 'collect' | 'pop' | 'meow' | 'boing' | 'win') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    if (kind === 'win' || kind === 'collect') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (kind === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(920, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (kind === 'meow') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 0.26);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    }
    setTimeout(() => {
      void ctx.close();
    }, 380);
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
const SCRATCH_EVENT = '#FFBF00';
const SCRATCH_CTRL = '#FFAB19';
const SCRATCH_SENSING = '#5CB1D6';
const SCRATCH_SOUND = '#CF63CF';
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
  accentDot = PINK,
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
          animation: live ? 'cpj50-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 50 • Coding Sprint 2 &amp; Sentuhan Akhir!</span>
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
// Reusable Pertemuan 50 Visuals (Scratch Cat, Score Monitor, Scratch Blocks)
// ============================================================================

const ScratchCatSvg = ({ size = 115, furColor = '#FF8C1A', waving = false }: { size?: number; furColor?: string; waving?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <ellipse cx="70" cy="128" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path d="M40 100 C20 96, 14 78, 25 69 C32 63, 38 71, 35 78 C33 83, 38 90, 46 90" fill={furColor} stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <ellipse cx="56" cy="120" rx="11" ry="7" fill={furColor} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="120" rx="11" ry="7" fill={furColor} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="70" cy="96" rx="25" ry="23" fill={furColor} stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="98" rx="14" ry="14" fill={WHITE} />
    <path d="M46 86 C35 90, 35 103, 45 103" fill={furColor} stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d={waving ? 'M94 82 C112 72, 114 54, 105 50 C98 46, 92 58, 92 72' : 'M94 86 C105 90, 105 103, 95 103'} fill={furColor} stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d="M36 52 L34 16 L60 35 Z" fill={furColor} stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
    <path d="M104 52 L106 16 L80 35 Z" fill={furColor} stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
    <ellipse cx="70" cy="56" rx="38" ry="29" fill={furColor} stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="65" rx="25" ry="16" fill={WHITE} />
    <ellipse cx="56" cy="50" rx="7" ry="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    <ellipse cx="84" cy="50" rx="7" ry="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    <circle cx="58" cy="50" r="3.4" fill={CHARCOAL} />
    <circle cx="82" cy="50" r="3.4" fill={CHARCOAL} />
    <polygon points="66,58 74,58 70,63" fill={CHARCOAL} />
    <path d="M62 67 Q70 74 78 67" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
  </svg>
);

const Scratch3ScoreMonitor = ({ score, scale = 1 }: { score: number; scale?: number }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(12 * scale),
      padding: `${Math.round(8 * scale)}px ${Math.round(14 * scale)}px`,
      borderRadius: Math.round(14 * scale),
      background: '#E2E8F0',
      border: `2.8px solid ${CHARCOAL}`,
      boxShadow: `0 4px 0 ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(22 * scale),
      fontWeight: 700,
      color: CHARCOAL,
    }}
  >
    <span>Skor</span>
    <span style={{ minWidth: Math.round(48 * scale), padding: `${Math.round(4 * scale)}px ${Math.round(14 * scale)}px`, borderRadius: Math.round(10 * scale), background: SCRATCH_VAR, color: WHITE, border: `2px solid ${CHARCOAL}`, textAlign: 'center' }}>
      {score}
    </span>
  </div>
);

const Scratch3HatFlagBlock = ({ scale = 1 }: { scale?: number }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(48 * scale),
      padding: `0 ${Math.round(18 * scale)}px`,
      borderRadius: `${Math.round(28 * scale)}px ${Math.round(28 * scale)}px ${Math.round(10 * scale)}px ${Math.round(10 * scale)}px`,
      background: SCRATCH_EVENT,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      color: CHARCOAL,
    }}
  >
    <span>when</span>
    <JuniorIcon name="flag" size={Math.round(22 * scale)} />
    <span>clicked</span>
  </div>
);

const Scratch3Block = ({ color, scale = 1, children }: { color: string; scale?: number; children: ReactNode }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(45 * scale),
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

const Scratch3TouchingHexBlock = ({ target = 'Hadiah', scale = 1 }: { target?: string; scale?: number }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(7 * scale),
      height: Math.round(42 * scale),
      padding: `0 ${Math.round(18 * scale)}px`,
      background: SCRATCH_SENSING,
      color: WHITE,
      clipPath: 'polygon(13px 0%, calc(100% - 13px) 0%, 100% 50%, calc(100% - 13px) 100%, 13px 100%, 0% 50%)',
      filter: 'drop-shadow(0 2px 0 rgba(30,30,44,0.85))',
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(17 * scale),
      fontWeight: 700,
      whiteSpace: 'nowrap',
    }}
  >
    <span>touching</span>
    <span style={{ padding: '2px 9px', borderRadius: 99, background: '#3D94B8', border: `1.5px solid ${WHITE}` }}>{target} v</span>
    <span>?</span>
  </div>
);

const Scratch3IfThenCBlock = ({ condition, scale = 1, children }: { condition: ReactNode; scale?: number; children?: ReactNode }) => {
  const s = scale;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ ...row, gap: Math.round(10 * s), minHeight: Math.round(50 * s), padding: `${Math.round(6 * s)}px ${Math.round(16 * s)}px`, borderRadius: `${Math.round(14 * s)}px ${Math.round(14 * s)}px ${Math.round(14 * s)}px 4px`, background: SCRATCH_CTRL, border: `2.8px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: Math.round(19 * s), fontWeight: 700, color: CHARCOAL }}>
        <span>if</span>
        {condition}
        <span>then</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div style={{ width: Math.round(24 * s), background: SCRATCH_CTRL, borderLeft: `2.8px solid ${CHARCOAL}`, borderRight: `2px solid ${CHARCOAL}` }} />
        <div style={{ padding: `${Math.round(6 * s)}px 0 ${Math.round(6 * s)}px ${Math.round(8 * s)}px`, display: 'flex', flexDirection: 'column', gap: Math.round(5 * s) }}>{children}</div>
      </div>
      <div style={{ width: Math.round(165 * s), height: Math.round(24 * s), borderRadius: `4px ${Math.round(12 * s)}px ${Math.round(12 * s)}px ${Math.round(12 * s)}px`, background: SCRATCH_CTRL, border: `2.8px solid ${CHARCOAL}` }} />
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Cover
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 50" accentDot={PINK}>
      {/* Left Hero Copy */}
      <div style={{ ...abs(X0, 225, 860) }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 99, background: PINK_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, marginBottom: 22 }}>
          <JuniorIcon name="sparkle" size={26} />
          <span>Proyek Akhir • Sentuhan Akhir &amp; Debugging</span>
        </div>

        <h1 style={{ margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <Highlight>Coding Sprint 2</Highlight>
          <br />
          &amp; Sentuhan Akhir!
        </h1>

        <p style={{ margin: '30px 0 0', fontSize: 31, fontWeight: 700, lineHeight: 1.4, color: MUTED, maxWidth: 790 }}>
          Melengkapi <strong style={{ color: CHARCOAL }}>Suara, Skor</strong>, serta{' '}
          <strong style={{ color: CHARCOAL }}>Debugging</strong> Proyek Akhirku!
        </p>

        <div style={{ ...row, gap: 16, marginTop: 34 }}>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: PINK_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="speaker" size={24} />
            <span>Suara &amp; Dialog</span>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="wrench" size={24} />
            <span>Skor &amp; Debugging</span>
          </div>
        </div>
      </div>

      {/* Right Visual: Biko Star Wand + Scratch Cat with Notes, Speech Bubble & Skor */}
      <MacWindowCard
        left={1010}
        top={185}
        width={810}
        height={690}
        titleBarColor={PINK_SOFT}
        headerLabel="Scratch 3.0 • Sentuhan Akhir"
        padding={26}
      >
        <div style={{ height: '100%', borderRadius: 20, border: `3px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #FEF9C3 0%, #FCE7F3 100%)', position: 'relative', overflow: 'hidden', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between', alignItems: 'center' }}>
            <Scratch3ScoreMonitor score={5} scale={1.14} />
            <div style={{ padding: '10px 22px', borderRadius: 18, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
              &quot;Hore, selesai!&quot;
            </div>
            <JuniorIcon name="music-note" size={62} />
          </div>

          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'flex-end' }}>
            <div style={{ animation: live ? 'cpj50-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot pose="thumbs-up" width={245} badgeIcon={<JuniorIcon name="sparkle" size={22} />} speechBubble="Makin keren!" />
            </div>
            <div style={{ animation: live ? 'cpj50-hop 2.4s ease-in-out infinite' : undefined }}>
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
        Apa Misi <Highlight>Coding Sprint 2</Highlight> Hari Ini?
      </SlideTitle>

      {/* Biko Left Anchor */}
      <div style={{ ...abs(95, 295, 360, 620), ...centerCol }}>
        <div style={{ animation: live ? 'cpj50-hop 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="point-left" width={320} badgeIcon={<JuniorIcon name="sparkle" size={22} />} speechBubble="Sprint 2!" />
        </div>
      </div>

      {/* macOS Window with 2 Cards */}
      <MacWindowCard
        left={480}
        top={240}
        width={1340}
        height={700}
        titleBarColor={PINK_SOFT}
        headerLabel="Misi Pertemuan 50"
        padding={42}
      >
        <div style={{ display: 'flex', gap: 36, height: '100%' }}>
          {/* Card 1 */}
          <div style={{ flex: 1, borderRadius: 24, background: PINK_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: PINK, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>
            <div style={{ ...row, gap: 16 }}>
              <JuniorIcon name="music-note" size={68} />
              <JuniorIcon name="say" size={68} />
              <Scratch3ScoreMonitor score={5} scale={0.95} />
            </div>
            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Tambah <span style={{ color: '#BE185D' }}>Suara, Dialog, &amp; Papan Skor</span> Seru!
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ flex: 1, borderRadius: 24, background: TEAL_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>
            <div style={{ ...row, gap: 18 }}>
              <JuniorIcon name="magnifier" size={88} />
              <JuniorIcon name="check" size={80} />
            </div>
            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              <span style={{ color: '#047857' }}>Uji Coba (<em>Debugging</em>)</span> sampai Siap Tampil!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Jurus #1: Tambah Efek Suara Meriah (Sound)
// ============================================================================
const Slide03EfekSuara: Page = () => {
  const [soundChoice, setSoundChoice] = useState<'Collect' | 'Pop' | 'Meow'>('Collect');

  return (
    <JuniorFrame badge="BLOK PINK • EFEK SUARA" accentDot={SCRATCH_SOUND}>
      <SlideTitle>
        Beri <Highlight color="#FCE7F3">Efek Suara</Highlight> Meriah!
      </SlideTitle>

      {/* Left Sound Block & Interactive Preview */}
      <MacWindowCard
        left={X0}
        top={245}
        width={820}
        height={680}
        titleBarColor={PINK_SOFT}
        headerLabel="Klik Tombol Suara untuk Mendengar!"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ ...row, gap: 28, alignItems: 'center' }}>
            <ScratchCatSvg size={185} waving />
            <JuniorIcon name="music-note" size={85} />
          </div>

          <Scratch3Block color={SCRATCH_SOUND} scale={1.32}>
            <JuniorIcon name="speaker" size={26} />
            <span>start sound</span>
            <DropPill bg="#B34BB3" label={`${soundChoice} v`} />
          </Scratch3Block>

          <div style={{ ...row, gap: 16 }}>
            {(['Collect', 'Pop', 'Meow'] as const).map((snd) => (
              <button
                key={snd}
                type="button"
                onClick={() => {
                  setSoundChoice(snd);
                  playFinishingSound(snd === 'Collect' ? 'collect' : snd === 'Pop' ? 'pop' : 'meow');
                }}
                className="cpj50-card-btn"
                style={{
                  padding: '12px 26px',
                  borderRadius: 16,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 5px 0 ${CHARCOAL}`,
                  background: soundChoice === snd ? SUNNY : WHITE,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {snd}
              </button>
            ))}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Explanation */}
      <MacWindowCard
        left={960}
        top={245}
        width={860}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Sentuhan Suara Meriah"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="speaker" bgColor={PINK_SOFT} fontSize={32}>
              Pasang <code>start sound [Collect / Pop / Meow]</code> saat menangkap hadiah atau klik karakter!
            </BulletRow>
            <BulletRow icon="music-note" bgColor={TEAL_SOFT} fontSize={32}>
              Atau tambahkan <code>play note</code> agar karyamu terdengar makin ceria!
            </BulletRow>
          </div>

          <div style={{ padding: '20px 26px', borderRadius: 20, background: PINK_SOFT, border: `3px solid ${PINK}`, ...row, gap: 16, fontSize: 26, fontWeight: 800 }}>
            <JuniorIcon name="sparkle" size={34} />
            <span>Suara membuat pemain langsung tahu ketika berhasil menang atau menyentuh hadiah!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus #2: Munculkan Balon Dialog & Kejutan (Looks)
// ============================================================================
const Slide04DialogKejutan: Page = () => {
  const [hue, setHue] = useState(0);

  return (
    <JuniorFrame badge="BLOK UNGU • DIALOG & KEJUTAN" accentDot={SCRATCH_LOOKS}>
      <SlideTitle>
        Tambah <Highlight color="#EDE9FE">Dialog</Highlight> &amp;{' '}
        <Highlight>Kejutan!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Explanation */}
      <MacWindowCard
        left={X0}
        top={245}
        width={880}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Balon Kata & Efek Menang"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <BulletRow icon="say" bgColor={LAVENDER_SOFT} fontSize={31}>
              Pakai <code>say [Hore, berhasil!] for (2) seconds</code> untuk sapaan atau ucapan menang!
            </BulletRow>
            <BulletRow icon="rainbow" bgColor={SUNNY_SOFT} fontSize={31}>
              Tambah <code>change [color] effect by (25)</code> atau <code>switch backdrop</code> saat akhir cerita!
            </BulletRow>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
            <Scratch3Block color={SCRATCH_LOOKS} scale={1.12}>
              <span>say</span>
              <WhiteOval val="Hore, kamu menang!" />
              <span>for</span>
              <WhiteOval val={2} />
              <span>secs</span>
            </Scratch3Block>
            <Scratch3Block color={SCRATCH_LOOKS} scale={1.12}>
              <span>change</span>
              <DropPill bg="#774DCB" label="color v" />
              <span>effect by</span>
              <WhiteOval val={25} />
            </Scratch3Block>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Interactive Rainbow + Dialog Preview */}
      <MacWindowCard
        left={1020}
        top={245}
        width={800}
        height={680}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Klik Kucing untuk Tes Kejutan!"
        padding={32}
      >
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-around' }}>
          <button
            type="button"
            onClick={() => {
              playFinishingSound('win');
              setHue((h) => (h + 75) % 360);
            }}
            className="cpj50-card-btn"
            style={{ background: 'transparent', border: 'none', padding: 0, position: 'relative' }}
          >
            <div style={{ padding: '12px 26px', borderRadius: 20, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, marginBottom: 14 }}>
              &quot;Hore, kamu menang!&quot;
            </div>
            <div style={{ filter: `hue-rotate(${hue}deg)`, transition: 'filter 180ms ease' }}>
              <ScratchCatSvg size={215} furColor="#A78BFA" waving />
            </div>
          </button>

          <BikoMascot pose="point-left" width={195} speechBubble="Makin hidup!" />
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus #3: Lengkapi Papan Skor Otomatis (Variables)
// ============================================================================
const Slide05PapanSkor: Page = () => {
  return (
    <JuniorFrame badge="BLOK ORANYE TUA • PAPAN SKOR" accentDot={SCRATCH_VAR}>
      <SlideTitle>
        Pasang <Highlight color="#FFEDD5">Papan Skor</Highlight> Gamemu!
      </SlideTitle>

      {/* Left Window: Top & Bottom Score Rules */}
      <MacWindowCard
        left={X0}
        top={235}
        width={1180}
        height={720}
        titleBarColor={ORANGE_SOFT}
        headerLabel="2 Kode Wajib Papan Skor"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 26 }}>
          {/* Top Card */}
          <div style={{ flex: 1, borderRadius: 24, background: SKY_SOFT, border: `3.5px solid ${SKY}`, boxShadow: `0 6px 0 ${CHARCOAL}`, padding: '24px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ padding: '6px 20px', borderRadius: 99, background: SKY, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, alignSelf: 'flex-start' }}>
              Mulai dari Nol (0)
            </div>
            <div style={{ ...row, gap: 14 }}>
              <Scratch3HatFlagBlock scale={1.06} />
              <JuniorIcon name="arrow-right" size={30} />
              <Scratch3Block color={SCRATCH_VAR} scale={1.06}>
                <span>set</span>
                <DropPill bg={SCRATCH_VAR_DARK} label="Skor v" />
                <span>to</span>
                <WhiteOval val={0} />
              </Scratch3Block>
            </div>
            <div style={{ fontSize: 25, fontWeight: 800, color: MUTED }}>
              Skor bersih kembali <strong>0</strong> setiap mulai main!
            </div>
          </div>

          {/* Bottom Card */}
          <div style={{ flex: 1, borderRadius: 24, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, padding: '24px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ padding: '6px 20px', borderRadius: 99, background: TEAL, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, alignSelf: 'flex-start' }}>
              Tambah Poin Otomatis (+1)
            </div>
            <Scratch3IfThenCBlock scale={0.96} condition={<Scratch3TouchingHexBlock target="Hadiah" scale={0.96} />}>
              <Scratch3Block color={SCRATCH_VAR} scale={0.96}>
                <span>change</span>
                <DropPill bg={SCRATCH_VAR_DARK} label="Skor v" />
                <span>by</span>
                <WhiteOval val={1} />
              </Scratch3Block>
            </Scratch3IfThenCBlock>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Gold Scoreboard + Biko */}
      <MacWindowCard
        left={1315}
        top={235}
        width={505}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Papan Skor Stage"
        padding={28}
      >
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-around', textAlign: 'center' }}>
          <Scratch3ScoreMonitor score={5} scale={1.55} />
          <BikoMascot pose="thumbs-up" width={275} badgeIcon={<JuniorIcon name="numbers" size={22} />} speechBubble="Skor naik +1!" />
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Pilih Blok untuk Sentuhan Akhir!
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle size={48} maxWidth={1680}>
        Supaya Karyamu Mengeluarkan <Highlight>Bunyi Meriah</Highlight> Saat Hadiah Tertangkap, Blok Mana?
      </SlideTitle>

      {/* Card A — Correct: start sound [Collect] */}
      <button
        type="button"
        onClick={() => {
          playFinishingSound('collect');
          setPicked('A');
        }}
        className="cpj50-card-btn"
        style={{
          ...abs(X0, 255, 820, 485),
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
            Blok Suara (Sound)
          </span>
        </div>

        <div style={{ ...row, gap: 18 }}>
          <JuniorIcon name="music-note" size={62} />
          <Scratch3Block color={SCRATCH_SOUND} scale={1.26}>
            <JuniorIcon name="speaker" size={24} />
            <span>start sound [Collect]</span>
          </Scratch3Block>
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'A' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={26} />
              <span>Benar! Blok pink start sound memutar bunyi meriah!</span>
            </div>
          ) : (
            <span style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Card B — Wrong: move (10) steps */}
      <button
        type="button"
        onClick={() => {
          playFinishingSound('boing');
          setPicked('B');
        }}
        className="cpj50-card-btn"
        style={{
          ...abs(1000, 255, 820, 485),
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
          animation: picked === 'B' ? 'cpj50-shake 320ms ease' : undefined,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 16, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
            B
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Blok Gerak (Motion)
          </span>
        </div>

        <div style={{ ...row, gap: 18 }}>
          <JuniorIcon name="footprints" size={62} />
          <Scratch3Block color={SCRATCH_BLUE} scale={1.32}>
            <span>move (10) steps</span>
          </Scratch3Block>
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'B' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={26} />
              <span>Bukan! Itu cuma bikin karakter melangkah!</span>
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
        <div style={{ animation: live ? 'cpj50-float 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thinking" width={165} badgeIcon={<JuniorIcon name="question" size={22} />} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
          {picked === 'A'
            ? 'Tepat sekali! Blok pink start sound bikin hadiah terdengar meriah!'
            : picked === 'B'
              ? 'Ups! move (10) steps untuk berjalan. Cari blok Pink berspeaker ya!'
              : 'Tunjuk blok yang benar di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Bengkel Debugging: Cek 3 Bagian Proyek Akhirmu!
// ============================================================================
const Slide07BengkelDebugging: Page = () => {
  const [checks, setChecks] = useState([true, true, true]);
  const toggleCheck = (idx: number) => {
    playFinishingSound('collect');
    setChecks((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <JuniorFrame badge="BENGKEL DEBUGGING" accentDot={TEAL}>
      <SlideTitle>
        Ayo Cek &amp; Perbaiki <Highlight>Bug</Highlight> Karyamu!
      </SlideTitle>

      {/* Left 3 Interactive Debug Check Cards */}
      <MacWindowCard
        left={X0}
        top={240}
        width={1260}
        height={710}
        titleBarColor={TEAL_SOFT}
        headerLabel="Klik Kotak Setelah Memeriksa Proyekmu!"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {[
            {
              idx: 0,
              title: 'Cek 1 • Awal Rapi',
              desc: 'Posisi awal karakter, latar pertama, & Skor = 0 sudah pas?',
              bg: SKY_SOFT,
              icon: 'flag' as JuniorIconName,
            },
            {
              idx: 1,
              title: 'Cek 2 • Aksi Lancar',
              desc: 'Semua tombol panah, klik, & sensor touching berfungsi?',
              bg: SUNNY_SOFT,
              icon: 'keyboard' as JuniorIconName,
            },
            {
              idx: 2,
              title: 'Cek 3 • Suara & Tamat',
              desc: 'Efek suara terdengar & ucapan menang / tamat muncul?',
              bg: TEAL_SOFT,
              icon: 'speaker' as JuniorIconName,
            },
          ].map((item) => (
            <button
              key={item.idx}
              type="button"
              onClick={() => toggleCheck(item.idx)}
              className="cpj50-card-btn"
              style={{
                borderRadius: 22,
                background: checks[item.idx] ? item.bg : '#F8FAFC',
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                padding: '22px 26px',
                ...row,
                justifyContent: 'space-between',
                textAlign: 'left',
              }}
            >
              <div style={{ ...row, gap: 22 }}>
                <div style={{ width: 68, height: 68, borderRadius: 20, background: WHITE, border: `2.8px solid ${CHARCOAL}`, ...centerCol }}>
                  <JuniorIcon name={item.icon} size={38} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: MUTED, marginTop: 4 }}>{item.desc}</div>
                </div>
              </div>
              <div style={{ width: 58, height: 58, borderRadius: 16, background: WHITE, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
                {checks[item.idx] && <JuniorIcon name="check" size={38} />}
              </div>
            </button>
          ))}
        </div>
      </MacWindowCard>

      {/* Right Biko Detective & Wrench */}
      <div style={{ ...abs(1405, 340, 420, 580), ...centerCol, gap: 18 }}>
        <BikoMascot
          pose="detective"
          width={315}
          badgeIcon={<JuniorIcon name="wrench" size={22} />}
          speechBubble={checks.every(Boolean) ? 'Siap Tampil!' : 'Cek bug lagi!'}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Sentuhan Akhir (Finishing) (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsFinishing: Page = () => {
  return (
    <JuniorFrame badge="TIPS FINISHING CODER" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Proyek Akhirmu <Highlight>Aman &amp; Siap Pameran!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & AMAN"
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
            <BulletRow icon="fullscreen" bgColor={TEAL_SOFT} fontSize={29}>
              Tes karyamu dari awal sampai selesai di <strong>Layar Penuh</strong>
            </BulletRow>
            <BulletRow icon="folder" bgColor={SUNNY_SOFT} fontSize={29}>
              Klik <code>File</code> -&gt; <code>Save to your computer</code> agar karyamu tersimpan aman!
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <JuniorIcon name="folder" size={105} />
            <JuniorIcon name="sparkle" size={78} />
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
            <BulletRow icon="laptop" bgColor={CORAL_SOFT} fontSize={29}>
              Menutup Scratch 3.0 sebelum <strong>Menyimpan Proyek</strong>
            </BulletRow>
            <BulletRow icon="warning" bgColor={SUNNY_SOFT} fontSize={29}>
              Memasang suara panjang di dalam <code>forever</code> tanpa jeda
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <JuniorIcon name="laptop" size={105} />
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Selesaikan & Simpan Proyek Akhirmu!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [score, setScore] = useState(5);
  const [saved, setSaved] = useState(false);
  const [dialogOn, setDialogOn] = useState(true);

  return (
    <JuniorFrame badge="WAKTUNYA CODING SPRINT 2!" accentDot={PINK}>
      <SlideTitle>
        Misi <Highlight>Sentuhan Akhir Proyek Akhirku!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'music-note' as JuniorIconName,
            text: (
              <>
                Tambahkan <strong>Efek Suara</strong>, <strong>Balon Dialog</strong>, &amp; <strong>Skor</strong> (untuk game)
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'magnifier' as JuniorIconName,
            text: (
              <>
                Uji coba di <strong>Layar Penuh</strong> &amp; bereskan semua <strong>Bug</strong>
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'folder' as JuniorIconName,
            text: (
              <>
                <strong>Simpan Proyekmu</strong> ke komputer agar siap pameran!
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

      {/* Finishing Studio & Save Mockup */}
      <MacWindowCard
        left={X0}
        top={400}
        width={1280}
        height={565}
        titleBarColor={SCRATCH_BLUE}
        headerLabel="Sentuhan Akhir & Save Proyek Akhir"
        padding={22}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* File -> Save Top Menu Bar */}
          <div style={{ ...row, justifyContent: 'space-between', padding: '8px 16px', borderRadius: 14, background: '#F8FAFC', border: `2.5px solid ${CHARCOAL}` }}>
            <div style={{ ...row, gap: 12 }}>
              <button
                type="button"
                onClick={() => {
                  playFinishingSound('win');
                  setSaved(true);
                }}
                className="cpj50-card-btn"
                style={{ padding: '6px 18px', borderRadius: 12, background: saved ? TEAL : SUNNY, color: saved ? WHITE : CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, ...row, gap: 8 }}
              >
                <JuniorIcon name={saved ? 'check' : 'folder'} size={22} />
                <span>{saved ? 'Proyek Tersimpan Aman!' : 'File -> Save to your computer'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playFinishingSound('collect');
                  setScore((s) => s + 1);
                  setDialogOn(true);
                }}
                className="cpj50-card-btn"
                style={{ padding: '6px 18px', borderRadius: 12, background: PINK_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, ...row, gap: 8 }}
              >
                <JuniorIcon name="speaker" size={22} />
                <span>Tes Suara &amp; Skor +1</span>
              </button>
            </div>
            <JuniorIcon name="fullscreen" size={30} />
          </div>

          {/* Complete Stage Showcase */}
          <div
            style={{
              flex: 1,
              borderRadius: 20,
              border: `3.5px solid ${CHARCOAL}`,
              background: 'linear-gradient(135deg, #FEF9C3 0%, #FCE7F3 48%, #DBEAFE 100%)',
              position: 'relative',
              overflow: 'hidden',
              ...row,
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 20,
            }}
          >
            <div style={{ ...abs(20, 18) }}>
              <Scratch3ScoreMonitor score={score} scale={1.1} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {dialogOn && (
                <div style={{ padding: '8px 20px', borderRadius: 16, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
                  &quot;Hore, proyekku lengkap!&quot;
                </div>
              )}
              <ScratchCatSvg size={180} waving />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
              <JuniorIcon name="star-glow" size={96} />
              <JuniorIcon name="music-note" size={76} />
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko & Save Reminder */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 14 }}>
        <div style={{ animation: live ? 'cpj50-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="folder" size={24} />}
            speechBubble={saved ? 'Sudah disimpan!' : 'Klik Save yuk!'}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            playFinishingSound('win');
            setSaved(true);
          }}
          className="cpj50-card-btn"
          style={{ padding: '14px 26px', borderRadius: 20, background: saved ? TEAL : SUNNY, color: saved ? WHITE : CHARCOAL, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, ...row, gap: 10 }}
        >
          <JuniorIcon name={saved ? 'check' : 'folder'} size={24} />
          <span>{saved ? 'Siap Pameran Besok!' : 'Simpan Proyek Akhir!'}</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 50 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="PROYEK AKHIR SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj50-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj50-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="trophy" size={50} />
      </div>

      <SlideTitle top={135} size={58} align="center" maxWidth={1540}>
        Hore! Proyek Akhirmu <Highlight>Sudah Jadi &amp; Sempurna!</Highlight>
      </SlideTitle>

      {/* Center Celebration Window */}
      <MacWindowCard
        left={260}
        top={260}
        width={1060}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 50"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, gap: 22, textAlign: 'center' }}>
          {/* Golden Star Wand, Music Note & Champion Check Medal */}
          <div style={{ animation: live ? 'cpj50-float 2.6s ease-in-out infinite' : undefined }}>
            <svg width={215} height={215} viewBox="0 0 210 210">
              <path d="M72 128 L52 195 L82 180 L96 198 L106 135 Z" fill={PINK} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M138 128 L158 195 L128 180 L114 198 L104 135 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="105" cy="96" r="72" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="105" cy="96" r="56" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.2} />
              {/* Trophy Cup + Checkmark */}
              <path d="M78 66 L132 66 L124 106 C120 118, 90 118, 86 106 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
              <path d="M93 84 L103 94 L121 76" fill="none" stroke={TEAL} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
              <rect x="96" y="114" width="18" height="16" fill={CHARCOAL} />
              <rect x="82" y="128" width="46" height="12" rx="4" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={2.5} />
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
              fontSize: 33,
              fontWeight: 700,
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="medal" size={34} />
            <span>Lencana Master Coding Sprint 2 &amp; Finishing</span>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, lineHeight: 1.38, maxWidth: 920, color: CHARCOAL }}>
            Kamu sudah jago melengkapi{' '}
            <Highlight color="#FCE7F3">Suara, Dialog, Skor, &amp; Debugging</Highlight> proyek akhirmu!
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot pose="jump" width={295} badgeIcon={<JuniorIcon name="trophy" size={22} />} speechBubble="Siap Pameran!" />
          <div style={{ animation: live ? 'cpj50-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 50 — Coding Sprint 2 & Sentuhan Akhir! ✨🎵
Hari ini anak-anak melengkapi Suara, Dialog, Papan Skor, dan melakukan Debugging pada Proyek Akhir sebelum pameran kelulusan!`,

  `Dua misi Sprint 2 hari ini:
1. Menambahkan Suara, Dialog, & Papan Skor seru.
2. Uji Coba (Debugging) sampai proyek akhir benar-benar siap tampil!`,

  `Jurus 1 — Beri Efek Suara Meriah (Sound):
Gunakan start sound [Collect / Pop / Meow] saat hadiah tertangkap atau sprite diklik!`,

  `Jurus 2 — Tambah Dialog & Kejutan (Looks):
Gunakan say [Hore, berhasil!] for (2) seconds untuk ucapan menang, atau change [color] effect / switch backdrop di akhir cerita!`,

  `Jurus 3 — Pasang Papan Skor Gamemu (Variables):
- when Bendera clicked -> set [Skor] to (0)
- if <touching [Hadiah]?> then -> change [Skor] by (1)!`,

  `Permainan Cepat! Ayo tebak bersama:
Supaya karyamu mengeluarkan bunyi meriah saat hadiah tertangkap, blok mana yang dipakai — Pilihan A (start sound [Collect]) atau Pilihan B (move (10) steps)?`,

  `Bengkel Debugging — Cek 3 Bagian Proyek Akhir:
1. Awal Rapi: posisi awal, latar pertama, Skor = 0
2. Aksi Lancar: tombol panah, klik, & sensor touching
3. Suara & Tamat: efek suara & ucapan menang/tamat muncul!`,

  `Tips Jagoan Finishing Coder:
BOLEH tes dari awal sampai selesai di Layar Penuh & klik File -> Save to your computer!
JANGAN menutup Scratch 3.0 sebelum menyimpan proyek, atau menaruh suara panjang dalam forever tanpa jeda!`,

  `Misi Praktik Sentuhan Akhir Proyek Akhirku!
Ajak anak-anak melengkapi suara/dialog/skor di Scratch 3.0, mengeceknya di Layar Penuh, lalu menyimpan proyek (File -> Save to your computer)!`,

  `Hore! Proyek Akhirmu Sudah Jadi & Sempurna! 🎉🏅
Selamat meraih Lencana Master Coding Sprint 2 & Finishing di Pertemuan 50!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 50 — Coding Sprint 2 & Sentuhan Akhir!',
  createdAt: '2026-11-16T16:40:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03EfekSuara,
  Slide04DialogKejutan,
  Slide05PapanSkor,
  Slide06AyoTebak,
  Slide07BengkelDebugging,
  Slide08TipsFinishing,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

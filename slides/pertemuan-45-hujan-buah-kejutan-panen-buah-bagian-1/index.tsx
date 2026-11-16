import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-45-hujan-buah-kejutan-panen-buah-bagian-1';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj45-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj45-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj45-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj45-fall {
  0% { transform: translateY(-18px); opacity: 0.25; }
  20% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translateY(230px); opacity: 0.25; }
}
@keyframes cpj45-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj45-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj45-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj45-card-btn:hover {
  transform: translateY(-4px);
}
.cpj45-card-btn:active {
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

/** Playful fruit drop & pop chime via Web Audio API */
function playFruitSound(kind: 'pop' | 'boing' | 'win') {
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
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.27);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(920, ctx.currentTime + 0.14);
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
const ORANGE_SOFT = '#FFF7ED';
const SCRATCH_BLUE = '#4D97FF';
const SCRATCH_EVENT = '#FFBF00';
const SCRATCH_CTRL = '#FFAB19';
const SCRATCH_OP = '#59C059';

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
  accentDot = CORAL,
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
          animation: live ? 'cpj45-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 45 • Hujan Buah Kejutan (Bagian 1)!</span>
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
// Reusable Pertemuan 45 Visuals (Apple, Banana, Harvest Basket, Dice, Blocks)
// ============================================================================

const RedAppleSvg = ({ size = 86 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M50 22 C50 12, 58 8, 63 11" stroke="#78350F" strokeWidth={5} strokeLinecap="round" />
    <path d="M52 20 C64 12, 76 18, 70 28 C64 34, 54 28, 52 20 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    <path
      d="M50 32 C30 22, 16 38, 18 58 C20 80, 34 90, 44 86 C48 84, 52 84, 56 86 C66 90, 80 80, 82 58 C84 38, 70 22, 50 32 Z"
      fill={CORAL}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <ellipse cx="34" cy="46" rx="6" ry="11" transform="rotate(-18 34 46)" fill={WHITE} fillOpacity={0.45} />
    <circle cx="42" cy="56" r="3.4" fill={CHARCOAL} />
    <circle cx="58" cy="56" r="3.4" fill={CHARCOAL} />
    <path d="M44 65 Q50 71 56 65" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" fill="none" />
  </svg>
);

const YellowBananaSvg = ({ size = 86 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M24 68 C42 82, 74 74, 82 34 C84 25, 76 20, 70 24 C66 48, 44 58, 22 52 C15 50, 16 62, 24 68 Z"
      fill={SUNNY}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <rect x="74" y="18" width="9" height="8" rx="3" fill="#78350F" stroke={CHARCOAL} strokeWidth={2.5} />
  </svg>
);

const HarvestBasketSvg = ({ width = 165 }: { width?: number }) => (
  <svg width={width} height={Math.round(width * 0.52)} viewBox="0 0 180 94" fill="none">
    <path d="M22 30 L158 30 L142 84 C140 88, 40 88, 38 84 Z" fill="#D97706" stroke={CHARCOAL} strokeWidth={4.5} strokeLinejoin="round" />
    <rect x="14" y="20" width="152" height="18" rx="9" fill="#F59E0B" stroke={CHARCOAL} strokeWidth={4} />
    <line x1="48" y1="38" x2="54" y2="82" stroke={CHARCOAL} strokeWidth={3} opacity={0.4} />
    <line x1="90" y1="38" x2="90" y2="82" stroke={CHARCOAL} strokeWidth={3} opacity={0.4} />
    <line x1="132" y1="38" x2="126" y2="82" stroke={CHARCOAL} strokeWidth={3} opacity={0.4} />
  </svg>
);

const SurpriseDiceSvg = ({ size = 72 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <rect x="10" y="10" width="60" height="60" rx="14" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
    <circle cx="26" cy="26" r="5" fill={CORAL} />
    <circle cx="54" cy="26" r="5" fill={CORAL} />
    <circle cx="40" cy="40" r="6" fill={SCRATCH_BLUE} />
    <circle cx="26" cy="54" r="5" fill={CORAL} />
    <circle cx="54" cy="54" r="5" fill={CORAL} />
  </svg>
);

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

const Scratch3MotionBlock = ({ scale = 1, children }: { scale?: number; children: ReactNode }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(46 * scale),
      padding: `0 ${Math.round(16 * scale)}px`,
      borderRadius: Math.round(12 * scale),
      background: SCRATCH_BLUE,
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

const BlueDrop = ({ label }: { label: string }) => (
  <span style={{ padding: '2px 11px', borderRadius: 99, background: '#3373CC', border: `2px solid ${WHITE}`, color: WHITE }}>
    {label}
  </span>
);

const Scratch3OpLessThanBlock = ({ leftLabel = 'y position', rightVal = '-170', scale = 1 }: { leftLabel?: string; rightVal?: string; scale?: number }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(7 * scale),
      height: Math.round(42 * scale),
      padding: `0 ${Math.round(18 * scale)}px`,
      background: SCRATCH_OP,
      color: WHITE,
      clipPath: 'polygon(13px 0%, calc(100% - 13px) 0%, 100% 50%, calc(100% - 13px) 100%, 13px 100%, 0% 50%)',
      filter: 'drop-shadow(0 2px 0 rgba(30,30,44,0.85))',
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(17 * scale),
      fontWeight: 700,
      whiteSpace: 'nowrap',
    }}
  >
    <span style={{ padding: '2px 9px', borderRadius: 99, background: SCRATCH_BLUE, border: `1.5px solid ${WHITE}` }}>{leftLabel}</span>
    <span>&lt;</span>
    <span style={{ padding: '2px 9px', borderRadius: 99, background: WHITE, color: CHARCOAL, border: `1.5px solid ${CHARCOAL}` }}>{rightVal}</span>
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

const Scratch3ForeverCBlock = ({ children, scale = 1 }: { children: ReactNode; scale?: number }) => {
  const s = scale;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ ...row, gap: Math.round(8 * s), height: Math.round(46 * s), padding: `0 ${Math.round(22 * s)}px`, borderRadius: `${Math.round(14 * s)}px ${Math.round(14 * s)}px ${Math.round(14 * s)}px 4px`, background: SCRATCH_CTRL, border: `2.8px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: Math.round(19 * s), fontWeight: 700, color: CHARCOAL }}>
        <span>forever</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div style={{ width: Math.round(24 * s), background: SCRATCH_CTRL, borderLeft: `2.8px solid ${CHARCOAL}`, borderRight: `2px solid ${CHARCOAL}` }} />
        <div style={{ padding: `${Math.round(8 * s)}px 0 ${Math.round(8 * s)}px ${Math.round(8 * s)}px`, display: 'flex', flexDirection: 'column', gap: Math.round(6 * s) }}>{children}</div>
      </div>
      <div style={{ ...row, justifyContent: 'flex-end', paddingRight: Math.round(12 * s), width: Math.round(220 * s), height: Math.round(28 * s), borderRadius: `4px ${Math.round(14 * s)}px ${Math.round(14 * s)}px ${Math.round(14 * s)}px`, background: SCRATCH_CTRL, border: `2.8px solid ${CHARCOAL}` }}>
        <JuniorIcon name="infinity" size={Math.round(18 * s)} />
      </div>
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Cover
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 45" accentDot={CORAL}>
      {/* Left Hero Copy */}
      <div style={{ ...abs(X0, 225, 860) }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, marginBottom: 22 }}>
          <JuniorIcon name="apple" size={26} />
          <span>Proyek Catch Game: Panen Buah Bagian 1</span>
        </div>

        <h1 style={{ margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 90, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <Highlight>Hujan Buah</Highlight>
          <br />
          Kejutan!
        </h1>

        <p style={{ margin: '30px 0 0', fontSize: 31, fontWeight: 700, lineHeight: 1.4, color: MUTED, maxWidth: 790 }}>
          Panen Buah Bagian 1: Memprogram <strong style={{ color: CHARCOAL }}>Buah Jatuh</strong>{' '}
          dari <strong style={{ color: CHARCOAL }}>Posisi Acak</strong> di Atas Layar!
        </p>

        <div style={{ ...row, gap: 16, marginTop: 34 }}>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="shuffle" size={24} />
            <span>random position</span>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="arrow-down" size={24} />
            <span>set y 180 &amp; change y -5</span>
          </div>
        </div>
      </div>

      {/* Right Visual: Biko Farmer + Orchard Rain Stage */}
      <MacWindowCard
        left={1010}
        top={185}
        width={810}
        height={690}
        titleBarColor={TEAL_SOFT}
        headerLabel="Scratch 3.0 • Kebun Hujan Buah"
        padding={26}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 20,
            border: `3px solid ${CHARCOAL}`,
            background: 'linear-gradient(180deg, #BAE6FD 0%, #DCFCE7 68%, #86EFAC 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Falling Fruits */}
          <div style={{ ...abs(310, 35), animation: live ? 'cpj45-fall 2.6s linear infinite' : undefined }}>
            <RedAppleSvg size={95} />
          </div>
          <div style={{ ...abs(545, 70), animation: live ? 'cpj45-fall 3.1s linear infinite' : undefined }}>
            <YellowBananaSvg size={95} />
          </div>
          <div style={{ ...abs(425, 110), animation: live ? 'cpj45-float 2.4s ease-in-out infinite' : undefined }}>
            <RedAppleSvg size={82} />
          </div>

          {/* Basket at bottom */}
          <div style={{ ...abs(425, 455) }}>
            <HarvestBasketSvg width={215} />
          </div>

          {/* Cheerful Biko */}
          <div style={{ ...abs(16, 225), animation: live ? 'cpj45-float 3s ease-in-out infinite' : undefined }}>
            <BikoMascot pose="thumbs-up" width={240} badgeIcon={<JuniorIcon name="apple" size={20} />} speechBubble="Panen buah!" />
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
    <JuniorFrame badge="MISI HARI INI" accentDot={SUNNY}>
      <SlideTitle>
        Apa Misi Panen Buah Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      {/* Biko Left Anchor */}
      <div style={{ ...abs(95, 295, 360, 620), ...centerCol }}>
        <div style={{ animation: live ? 'cpj45-hop 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="point-left" width={320} badgeIcon={<JuniorIcon name="apple" size={22} />} speechBubble="Siap panen!" />
        </div>
      </div>

      {/* macOS Window with 2 Cards */}
      <MacWindowCard
        left={480}
        top={240}
        width={1340}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Misi Pertemuan 45"
        padding={42}
      >
        <div style={{ display: 'flex', gap: 36, height: '100%' }}>
          {/* Card 1: Random Position */}
          <div style={{ flex: 1, borderRadius: 24, background: CORAL_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
              <SurpriseDiceSvg size={95} />
              <Scratch3MotionBlock scale={0.95}>
                <span>go to</span>
                <BlueDrop label="random position" />
              </Scratch3MotionBlock>
            </div>

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Kenali Blok <span style={{ color: '#B91C1C' }}>Posisi Acak</span> (<em>Random Position</em>)
            </div>
          </div>

          {/* Card 2: Fruit Falling from Top */}
          <div style={{ flex: 1, borderRadius: 24, background: TEAL_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ ...row, gap: 18 }}>
              <RedAppleSvg size={115} />
              <JuniorIcon name="arrow-down" size={60} />
              <YellowBananaSvg size={110} />
            </div>

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Bikin <span style={{ color: '#047857' }}>Buah Jatuh</span> dari Atas Layar!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Blok Biru Baru #1: Lompat ke Tempat Acak (go to random position)
// ============================================================================
const Slide03BlokAcak: Page = () => {
  const SPOTS = [
    { left: 22, top: 24 },
    { left: 74, top: 28 },
    { left: 46, top: 68 },
    { left: 78, top: 72 },
    { left: 26, top: 64 },
  ];
  const [spotIdx, setSpotIdx] = useState(0);

  return (
    <JuniorFrame badge="BLOK BIRU • MOTION" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Blok Biru <Highlight color="#DBEAFE">Posisi Acak!</Highlight>
      </SlideTitle>

      {/* Left Interactive Random Jump Stage */}
      <MacWindowCard
        left={X0}
        top={245}
        width={820}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Klik Blok / Apel untuk Lompat Acak!"
        padding={30}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            onClick={() => {
              playFruitSound('pop');
              setSpotIdx((i) => (i + 1) % SPOTS.length);
            }}
            style={{
              width: '100%',
              height: 410,
              borderRadius: 22,
              border: `3px solid ${CHARCOAL}`,
              background: 'linear-gradient(180deg, #E0F2FE 0%, #DCFCE7 100%)',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: `${SPOTS[spotIdx].left}%`,
                top: `${SPOTS[spotIdx].top}%`,
                transform: 'translate(-50%, -50%)',
                transition: 'left 200ms ease, top 200ms ease',
              }}
            >
              <RedAppleSvg size={110} />
            </div>
            <div style={{ position: 'absolute', right: 20, bottom: 16 }}>
              <SurpriseDiceSvg size={64} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playFruitSound('pop');
              setSpotIdx((i) => (i + 1) % SPOTS.length);
            }}
            className="cpj45-card-btn"
            style={{ background: 'transparent', border: 'none', padding: 0 }}
          >
            <Scratch3MotionBlock scale={1.32}>
              <span>go to</span>
              <BlueDrop label="random position" />
            </Scratch3MotionBlock>
          </button>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Explanation */}
      <MacWindowCard
        left={960}
        top={245}
        width={860}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Cara Kerja Random Position"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="shuffle" bgColor={SKY_SOFT} fontSize={32}>
              Pilih blok biru <code>go to [random position]</code>
            </BulletRow>
            <BulletRow icon="sparkle" bgColor={SUNNY_SOFT} fontSize={32}>
              Seperti melempar dadu: buah muncul di <strong>Tempat Kejutan</strong> yang berbeda-beda!
            </BulletRow>
          </div>

          <div style={{ ...row, gap: 20, padding: '18px 24px', borderRadius: 20, background: SKY_SOFT, border: `3px solid ${CHARCOAL}` }}>
            <BikoMascot pose="point-left" width={145} />
            <div style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.32 }}>
              Setiap kali kode ini jalan, kita tidak tahu pasti buahnya muncul di kiri, tengah, atau kanan!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus Langit Atas: Naikkan ke Paling Atas (set y to 180)
// ============================================================================
const Slide04PosisiAtas: Page = () => {
  return (
    <JuniorFrame badge="JURUS POSISI ATAS" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Taruh Buah di <Highlight>Langit Paling Atas!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Explanation */}
      <MacWindowCard
        left={X0}
        top={245}
        width={860}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Ketinggian Panggung y = 180"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <BulletRow icon="arrow-up" bgColor={SKY_SOFT} fontSize={31}>
              Sambung blok biru <code>set y to (180)</code> tepat di bawah <code>go to [random position]</code>
            </BulletRow>
            <BulletRow icon="cloud-sun" bgColor={SUNNY_SOFT} fontSize={31}>
              Angka <strong><code>180</code></strong> membuat buah selalu muncul di <strong>Garis Atas Panggung!</strong>
            </BulletRow>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
            <Scratch3MotionBlock scale={1.16}>
              <span>go to</span>
              <BlueDrop label="random position" />
            </Scratch3MotionBlock>
            <Scratch3MotionBlock scale={1.16}>
              <span>set y to</span>
              <WhiteOval val={180} />
            </Scratch3MotionBlock>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Stage Ruler Showing y = 180 */}
      <MacWindowCard
        left={1000}
        top={245}
        width={820}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Garis Batas Atas Panggung"
        padding={28}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 22,
            border: `3px solid ${CHARCOAL}`,
            background: 'linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 65%, #DCFCE7 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glowing y = 180 line */}
          <div style={{ ...abs(0, 68, '100%', 6), background: CORAL }} />
          <div style={{ ...abs(24, 18), padding: '6px 18px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
            Garis Langit Atas: y = 180
          </div>

          {/* Apples sitting neatly at y = 180 across different random X spots */}
          <div style={{ ...abs(70, 32) }}><RedAppleSvg size={94} /></div>
          <div style={{ ...abs(295, 32) }}><RedAppleSvg size={94} /></div>
          <div style={{ ...abs(545, 32) }}><YellowBananaSvg size={94} /></div>

          <div style={{ ...abs(26, 250) }}>
            <BikoMascot pose="thumbs-up" width={235} speechBubble="Rapi di atas!" />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus Gravitasi: Turun ke Bawah (change y by -5)
// ============================================================================
const Slide05GerakJatuh: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="BLOK BIRU • GERAK JATUH" accentDot={SCRATCH_CTRL}>
      <SlideTitle>
        Bikin Buah <Highlight>Meluncur Jatuh!</Highlight>
      </SlideTitle>

      {/* Left Window: Top & Bottom Motion Rules */}
      <MacWindowCard
        left={X0}
        top={235}
        width={1080}
        height={720}
        titleBarColor={ORANGE_SOFT}
        headerLabel="Aturan Jatuh & Mengulang dari Atas"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 26 }}>
          {/* Top Card */}
          <div style={{ flex: 1, borderRadius: 24, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, padding: '24px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ ...row, justifyContent: 'space-between' }}>
              <span style={{ padding: '6px 18px', borderRadius: 99, background: CORAL, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                Turun Pelan (change y by -5)
              </span>
              <Scratch3MotionBlock scale={0.96}>
                <span>change y by</span>
                <WhiteOval val={-5} />
              </Scratch3MotionBlock>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Pakai tanda <strong>Minus (<code>-5</code>)</strong> di dalam <code>forever</code> agar buah turun perlahan ke bawah!
            </div>
          </div>

          {/* Bottom Card */}
          <div style={{ flex: 1, borderRadius: 24, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, padding: '24px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ ...row, justifyContent: 'space-between' }}>
              <span style={{ padding: '6px 18px', borderRadius: 99, background: TEAL, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                Sampai Lantai (y position &lt; -170)
              </span>
              <Scratch3OpLessThanBlock leftLabel="y position" rightVal="-170" scale={0.92} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Jika sampai bawah layar (<code>y &lt; -170</code>), buah <strong>Kembali ke Atas Acak</strong> lagi!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Animated Falling & Respawn Diagram + Biko */}
      <MacWindowCard
        left={1215}
        top={235}
        width={605}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Siklus Jatuh Terus"
        padding={26}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '100%', height: 360, borderRadius: 22, border: `3px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #BAE6FD 0%, #DCFCE7 100%)', position: 'relative', overflow: 'hidden', ...centerCol }}>
            <div style={{ ...abs(18, 14), fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: '#0369A1' }}>y = 180</div>
            <div style={{ ...abs(18, 320), fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: '#B91C1C' }}>y &lt; -170 (Kembali ke Atas!)</div>
            <div style={{ animation: live ? 'cpj45-fall 2.2s linear infinite' : undefined }}>
              <RedAppleSvg size={95} />
            </div>
          </div>

          <BikoMascot pose="point-left" width={245} speechBubble="Ulang ke atas!" />
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Pilih Blok Posisi Acak!
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle size={50} maxWidth={1680}>
        Blok Mana yang Membuat Buah Muncul di <Highlight>Tempat Kejutan (Acak)?</Highlight>
      </SlideTitle>

      {/* Card A — Correct: go to random position */}
      <button
        type="button"
        onClick={() => {
          playFruitSound('win');
          setPicked('A');
        }}
        className="cpj45-card-btn"
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
            Posisi Acak (Random Position)
          </span>
        </div>

        <div style={{ ...row, gap: 18 }}>
          <SurpriseDiceSvg size={76} />
          <Scratch3MotionBlock scale={1.26}>
            <span>go to</span>
            <BlueDrop label="random position" />
          </Scratch3MotionBlock>
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'A' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={26} />
              <span>Benar! Blok ini memindahkan buah secara acak!</span>
            </div>
          ) : (
            <span style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Card B — Wrong: turn 15 degrees */}
      <button
        type="button"
        onClick={() => {
          playFruitSound('boing');
          setPicked('B');
        }}
        className="cpj45-card-btn"
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
          animation: picked === 'B' ? 'cpj45-shake 320ms ease' : undefined,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 16, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
            B
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Berputar (Turn)
          </span>
        </div>

        <div style={{ ...row, gap: 18 }}>
          <JuniorIcon name="repeat" size={72} />
          <Scratch3MotionBlock scale={1.26}>
            <span>turn</span>
            <WhiteOval val={15} />
            <span>degrees</span>
          </Scratch3MotionBlock>
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'B' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={26} />
              <span>Bukan! Itu cuma bikin apel berputar di tempat!</span>
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
        <div style={{ animation: live ? 'cpj45-float 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thinking" width={165} badgeIcon={<JuniorIcon name="question" size={22} />} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
          {picked === 'A'
            ? 'Mantap! go to [random position] artinya lompat ke tempat kejutan!'
            : picked === 'B'
              ? 'Ups! turn untuk berputar. Cari blok yang ada tulisan random position!'
              : 'Tunjuk blok yang benar di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Resep Hujan Buah: Rangkai Kode Apel Jatuh!
// ============================================================================
const Slide07ResepHujanBuah: Page = () => {
  return (
    <JuniorFrame badge="RESEP HUJAN BUAH" accentDot={TEAL}>
      <SlideTitle>
        Susun <Highlight>Kode Buah Jatuh!</Highlight>
      </SlideTitle>

      {/* Left Complete Block Stack */}
      <MacWindowCard
        left={X0}
        top={240}
        width={760}
        height={700}
        titleBarColor={SKY_SOFT}
        headerLabel="Susunan Lengkap Sprite Apple"
        padding={32}
      >
        <div style={{ height: '100%', ...centerCol, alignItems: 'flex-start', paddingLeft: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
            <Scratch3HatFlagBlock scale={0.98} />
            <Scratch3MotionBlock scale={0.96}>
              <span>go to</span>
              <BlueDrop label="random position" />
            </Scratch3MotionBlock>
            <Scratch3MotionBlock scale={0.96}>
              <span>set y to</span>
              <WhiteOval val={180} />
            </Scratch3MotionBlock>
            <Scratch3ForeverCBlock scale={0.94}>
              <Scratch3MotionBlock scale={0.94}>
                <span>change y by</span>
                <WhiteOval val={-5} />
              </Scratch3MotionBlock>
              <Scratch3IfThenCBlock scale={0.9} condition={<Scratch3OpLessThanBlock leftLabel="y position" rightVal="-170" scale={0.9} />}>
                <Scratch3MotionBlock scale={0.9}>
                  <span>go to</span>
                  <BlueDrop label="random position" />
                </Scratch3MotionBlock>
                <Scratch3MotionBlock scale={0.9}>
                  <span>set y to</span>
                  <WhiteOval val={180} />
                </Scratch3MotionBlock>
              </Scratch3IfThenCBlock>
            </Scratch3ForeverCBlock>
          </div>
        </div>
      </MacWindowCard>

      {/* Right 3 Step Cards */}
      <div style={{ ...abs(900, 240, 920, 700), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {[
          {
            num: '1. Mulai di Atas',
            bg: SKY_SOFT,
            border: SKY,
            icon: 'arrow-up' as JuniorIconName,
            text: (
              <>
                <code>when Bendera clicked</code> -&gt; <code>go to [random position]</code> -&gt; <code>set y to (180)</code>
              </>
            ),
          },
          {
            num: '2. Jatuh Terus',
            bg: SUNNY_SOFT,
            border: SUNNY,
            icon: 'infinity' as JuniorIconName,
            text: (
              <>
                <code>forever</code> memeluk <code>change y by (-5)</code> agar buah meluncur turun!
              </>
            ),
          },
          {
            num: '3. Ulang dari Atas',
            bg: TEAL_SOFT,
            border: TEAL,
            icon: 'repeat' as JuniorIconName,
            text: (
              <>
                <code>if &lt;(y position) &lt; (-170)&gt; then</code> -&gt; <code>go to [random position]</code> + <code>set y to (180)</code>
              </>
            ),
          },
        ].map((step) => (
          <div
            key={step.num}
            style={{
              height: 212,
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
              <div style={{ fontSize: 24, fontWeight: 700, color: MUTED, marginTop: 6, lineHeight: 1.32 }}>
                {step.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Hujan Buah Kejutan (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsHujanBuah: Page = () => {
  return (
    <JuniorFrame badge="TIPS PEMBUAT CATCH GAME" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Hujan Buahmu <Highlight>Lancar &amp; Seru!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & LANCAR"
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
            <BulletRow icon="arrow-down" bgColor={TEAL_SOFT} fontSize={29}>
              Pakai tanda <strong>Minus (<code>-5</code>)</strong> pada <code>change y by</code> agar jatuh ke bawah
            </BulletRow>
            <BulletRow icon="arrow-up" bgColor={SUNNY_SOFT} fontSize={29}>
              Pasang <code>set y to (180)</code> setelah <code>go to [random position]</code>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <RedAppleSvg size={100} />
            <JuniorIcon name="arrow-down" size={64} />
            <JuniorIcon name="check" size={62} />
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
            <BulletRow icon="arrow-up" bgColor={CORAL_SOFT} fontSize={29}>
              Memakai angka <strong>Positif (<code>5</code>)</strong> (buah malah terbang naik ke langit!)
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={29}>
              Lupa memasang <code>set y to (180)</code> (buah muncul tiba-tiba di tengah layar)
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <RedAppleSvg size={100} />
            <JuniorIcon name="arrow-up" size={64} />
            <JuniorIcon name="cross" size={62} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Buat Hujan Buah Kejutan!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [running, setRunning] = useState(true);
  const [fruits, setFruits] = useState([
    { id: 'apple-1', kind: 'apple' as const, x: 24, y: 12 },
    { id: 'banana-1', kind: 'banana' as const, x: 56, y: 48 },
    { id: 'apple-2', kind: 'apple' as const, x: 78, y: 28 },
  ]);

  useEffect(() => {
    if (!live || !running) return;
    const t = setInterval(() => {
      setFruits((prev) =>
        prev.map((f) => {
          const ny = f.y + 4.5;
          if (ny > 86) {
            return { ...f, x: Math.round(16 + Math.random() * 68), y: 8 };
          }
          return { ...f, y: ny };
        }),
      );
    }, 120);
    return () => clearInterval(t);
  }, [live, running]);

  const respawnFruits = () => {
    playFruitSound('pop');
    setFruits([
      { id: 'apple-1', kind: 'apple', x: Math.round(16 + Math.random() * 24), y: 10 },
      { id: 'banana-1', kind: 'banana', x: Math.round(42 + Math.random() * 20), y: 10 },
      { id: 'apple-2', kind: 'apple', x: Math.round(64 + Math.random() * 20), y: 10 },
    ]);
  };

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Hujan Buah Kejutan!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'apple' as JuniorIconName,
            text: (
              <>
                Pasang latar <strong>Kebun / Alam</strong> &amp; tambah Sprite <strong>Apel (Apple)</strong>
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'puzzle' as JuniorIconName,
            text: (
              <>
                Rangkai <strong>go to [random position]</strong>, <strong>set y to (180)</strong>, &amp; <strong>forever</strong> jatuh
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'flag' as JuniorIconName,
            text: (
              <>
                Klik <strong>Bendera Hijau!</strong> Saksikan apel jatuh dari titik acak di atas!
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

      {/* Interactive Scratch 3.0 Fruit Rain Simulator */}
      <div
        style={{
          ...abs(X0, 400, 1280, 565),
          borderRadius: 24,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          background: WHITE,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ height: 46, background: SCRATCH_BLUE, borderBottom: `2.5px solid ${CHARCOAL}`, padding: '0 18px', ...row, justifyContent: 'space-between', color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
          <span>SCRATCH 3.0 • Simulasi Hujan Buah (Bagian 1)</span>
          <div style={{ ...row, gap: 10 }}>
            <button
              type="button"
              onClick={respawnFruits}
              className="cpj45-card-btn"
              style={{ padding: '4px 14px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2px solid ${CHARCOAL}`, fontSize: 15, fontWeight: 700 }}
            >
              Acak Posisi Atas!
            </button>
            <button
              type="button"
              onClick={() => {
                playFruitSound('pop');
                setRunning((r) => !r);
              }}
              className="cpj45-card-btn"
              style={{ padding: '4px 14px', borderRadius: 99, background: WHITE, color: CHARCOAL, border: `2px solid ${CHARCOAL}`, ...row, gap: 6, fontSize: 15, fontWeight: 700 }}
            >
              <JuniorIcon name={running ? 'stop' : 'flag'} size={18} />
              <span>{running ? 'Jeda' : 'Mulai'}</span>
            </button>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex' }}>
          {/* Code Pane */}
          <div style={{ width: 515, padding: '16px 20px', borderRight: `2.5px solid ${CHARCOAL}`, background: WHITE, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3 }}>
              <Scratch3HatFlagBlock scale={0.78} />
              <Scratch3MotionBlock scale={0.76}>
                <span>go to</span>
                <BlueDrop label="random position" />
              </Scratch3MotionBlock>
              <Scratch3MotionBlock scale={0.76}>
                <span>set y to</span>
                <WhiteOval val={180} />
              </Scratch3MotionBlock>
              <Scratch3ForeverCBlock scale={0.74}>
                <Scratch3MotionBlock scale={0.74}>
                  <span>change y by</span>
                  <WhiteOval val={-5} />
                </Scratch3MotionBlock>
                <Scratch3IfThenCBlock scale={0.72} condition={<Scratch3OpLessThanBlock leftLabel="y position" rightVal="-170" scale={0.72} />}>
                  <Scratch3MotionBlock scale={0.72}>
                    <span>go to</span>
                    <BlueDrop label="random position" />
                  </Scratch3MotionBlock>
                  <Scratch3MotionBlock scale={0.72}>
                    <span>set y to</span>
                    <WhiteOval val={180} />
                  </Scratch3MotionBlock>
                </Scratch3IfThenCBlock>
              </Scratch3ForeverCBlock>
            </div>
          </div>

          {/* Orchard Stage */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              background: 'linear-gradient(180deg, #BAE6FD 0%, #DCFCE7 74%, #86EFAC 100%)',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', left: 0, right: 0, top: '10%', height: 4, background: CORAL, opacity: 0.7 }} />
            <div style={{ position: 'absolute', left: 16, top: 10, padding: '3px 12px', borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 15, fontWeight: 700 }}>
              Garis y = 180
            </div>

            {fruits.map((f) => (
              <div
                key={f.id}
                style={{
                  position: 'absolute',
                  left: `${f.x}%`,
                  top: `${f.y}%`,
                  transform: 'translate(-50%, -50%)',
                  transition: 'top 110ms linear',
                }}
              >
                {f.kind === 'apple' ? <RedAppleSvg size={76} /> : <YellowBananaSvg size={76} />}
              </div>
            ))}

            <div style={{ position: 'absolute', right: 26, bottom: 10 }}>
              <HarvestBasketSvg width={155} />
            </div>
          </div>
        </div>
      </div>

      {/* Cheering Biko & Scratch Cat */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 14 }}>
        <div style={{ ...row, alignItems: 'flex-end', animation: live ? 'cpj45-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thumbs-up" width={265} badgeIcon={<JuniorIcon name="apple" size={22} />} speechBubble="Hujan buah!" />
          <ScratchCatSvg size={130} waving />
        </div>
        <button
          type="button"
          onClick={respawnFruits}
          className="cpj45-card-btn"
          style={{
            padding: '13px 26px',
            borderRadius: 20,
            background: SUNNY,
            color: CHARCOAL,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          <JuniorIcon name="shuffle" size={24} />
          <span>Acak Jatuh Lagi!</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 45 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="PANEN BUAH BAGIAN 1 SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj45-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj45-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="apple" size={50} />
      </div>

      <SlideTitle top={135} size={58} align="center" maxWidth={1540}>
        Hore! Kamu Jagoan <Highlight>Posisi Acak!</Highlight>
      </SlideTitle>

      {/* Center Celebration Window */}
      <MacWindowCard
        left={260}
        top={260}
        width={1060}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 45"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, gap: 22, textAlign: 'center' }}>
          {/* Golden Apple + Surprise Dice Medal */}
          <div style={{ animation: live ? 'cpj45-float 2.6s ease-in-out infinite' : undefined }}>
            <svg width={215} height={215} viewBox="0 0 210 210">
              <path d="M72 128 L52 195 L82 180 L96 198 L106 135 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M138 128 L158 195 L128 180 L114 198 L104 135 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="105" cy="96" r="72" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="105" cy="96" r="56" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.2} />
              {/* Apple & Dice Center */}
              <path d="M105 64 C90 56, 79 68, 81 84 C82 100, 93 110, 105 107 C117 110, 128 100, 129 84 C131 68, 120 56, 105 64 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M106 58 C113 50, 122 54, 118 61 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.5} />
              <rect x="92" y="106" width="26" height="26" rx="6" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
              <circle cx="105" cy="119" r="3.5" fill={SCRATCH_BLUE} />
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
            <span>Lencana Master Hujan Buah Kejutan</span>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, lineHeight: 1.38, maxWidth: 920, color: CHARCOAL }}>
            Kamu sudah jago memakai{' '}
            <Highlight color="#DBEAFE">go to [random position]</Highlight> untuk membuat objek jatuh!
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot pose="jump" width={295} badgeIcon={<JuniorIcon name="star-glow" size={22} />} speechBubble="Siap Panen!" />
          <div style={{ animation: live ? 'cpj45-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 45 — Hujan Buah Kejutan (Panen Buah Bagian 1)! 🍎🍌
Hari ini anak-anak memulai proyek Catch Game dengan memprogram buah yang jatuh dari posisi acak di atas layar!`,

  `Dua misi panen buah hari ini:
1. Mengenal blok biru "go to [random position]".
2. Membuat buah jatuh terus-menerus dari atas layar!`,

  `Blok Biru Baru #1 — go to [random position]:
Seperti melempar dadu kejutan, blok ini membuat Apel atau Pisang muncul di titik acak panggung!`,

  `Jurus Posisi Atas — set y to (180):
Sambungkan tepat di bawah go to [random position] agar buah selalu muncul rapi di garis paling atas langit (y = 180)!`,

  `Jurus Gravitasi — Meluncur Jatuh:
- Pakai change y by (-5) di dalam forever supaya buah turun perlahan!
- Jika y position < -170 (sudah menyentuh lantai bawah), ulang kembali ke random position di atas!`,

  `Permainan Cepat! Ayo tebak bersama:
Blok mana yang membuat buah muncul di tempat kejutan (acak) — Pilihan A (go to [random position]) atau Pilihan B (turn 15 degrees)?`,

  `Resep Lengkap Hujan Buah:
1. Mulai di Atas: when Bendera clicked -> go to [random position] -> set y to (180)
2. Jatuh Terus: forever -> change y by (-5)
3. Ulang dari Atas: if <(y position) < (-170)> then -> go to [random position] + set y to (180)!`,

  `Tips Pembuat Catch Game:
BOLEH pakai tanda Minus (-5) untuk turun & set y to (180) setelah random position.
JANGAN pakai angka positif (+5) (buah malah terbang naik!), atau lupa set y to (180)!`,

  `Misi Praktik Hujan Buah Kejutan!
Jalankan simulasi panggung Scratch 3.0 dan amati buah Apel & Pisang jatuh dari titik acak garis y = 180 lalu berulang kembali dari atas!`,

  `Hore! Kamu Jagoan Posisi Acak! 🎉🏅
Selamat meraih Lencana Master Hujan Buah Kejutan di Pertemuan 45!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 45 — Hujan Buah Kejutan (Panen Buah Bagian 1)!',
  createdAt: '2026-11-16T16:10:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BlokAcak,
  Slide04PosisiAtas,
  Slide05GerakJatuh,
  Slide06AyoTebak,
  Slide07ResepHujanBuah,
  Slide08TipsHujanBuah,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

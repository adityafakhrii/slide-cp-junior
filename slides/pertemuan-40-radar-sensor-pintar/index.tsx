import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-40-radar-sensor-pintar';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj40-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj40-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj40-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj40-radar {
  0% { opacity: 0.9; transform: scale(0.75); }
  100% { opacity: 0; transform: scale(1.42); }
}
@keyframes cpj40-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj40-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj40-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj40-card-btn:hover {
  transform: translateY(-4px);
}
.cpj40-card-btn:active {
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

/** Happy prize collect sound or playful rock boing sound via Web Audio API */
function playSensorSound(kind: 'star' | 'rock' | 'ping') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    if (kind === 'star') {
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
    } else if (kind === 'rock') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
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
const ORANGE = '#FB923C';
const ORANGE_SOFT = '#FFF7ED';
const SCRATCH_BLUE = '#4D97FF';
const SCRATCH_LOOKS = '#9966FF';
const SCRATCH_EVENT = '#FFBF00';
const SCRATCH_CTRL = '#FFAB19';
const SCRATCH_SENSING = '#5CB1D6';
const SCRATCH_SOUND = '#CF63CF';

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
      <div
        aria-hidden
        style={{
          ...abs(46, 200),
          fontFamily: 'var(--osd-font-display)',
          fontSize: 40,
          fontWeight: 700,
          color: LAVENDER,
          opacity: 0.25,
          transform: 'rotate(-10deg)',
          pointerEvents: 'none',
        }}
      >
        {'{ }'}
      </div>
      <div
        aria-hidden
        style={{
          ...abs(1816, 170),
          fontFamily: 'var(--osd-font-display)',
          fontSize: 38,
          fontWeight: 700,
          color: SKY,
          opacity: 0.26,
          transform: 'rotate(12deg)',
          pointerEvents: 'none',
        }}
      >
        {'</>'}
      </div>
      <div
        aria-hidden
        style={{
          ...abs(42, 870),
          fontFamily: 'var(--osd-font-display)',
          fontSize: 36,
          fontWeight: 700,
          color: TEAL,
          opacity: 0.24,
          transform: 'rotate(-8deg)',
          pointerEvents: 'none',
        }}
      >
        {'( )'}
      </div>
      <div
        aria-hidden
        style={{
          ...abs(1826, 860),
          fontFamily: 'var(--osd-font-display)',
          fontSize: 38,
          fontWeight: 700,
          color: CORAL,
          opacity: 0.25,
          transform: 'rotate(9deg)',
          pointerEvents: 'none',
        }}
      >
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
          animation: live ? 'cpj40-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 99,
            background: accentDot,
            border: `2px solid ${CHARCOAL}`,
            display: 'inline-block',
          }}
        />
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
      <div
        style={{
          ...abs(X0, 1020, W, 34),
          ...row,
          justifyContent: 'space-between',
          fontSize: 18,
          fontWeight: 700,
          color: '#7A7689',
        }}
      >
        <span style={{ ...row, gap: 10 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: SCRATCH_BLUE,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 40 • Radar Sensor Pintar!</span>
      </div>
    </div>
  );
};

const Highlight = ({
  children,
  color = STABILO,
}: {
  children: ReactNode;
  color?: string;
}) => (
  <span
    style={{
      background: color,
      padding: '2px 18px 6px',
      borderRadius: 16,
      boxDecorationBreak: 'clone',
      WebkitBoxDecorationBreak: 'clone',
      display: 'inline-block',
    }}
  >
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
    <div
      style={{
        height: 54,
        background: titleBarColor,
        borderBottom: `2.5px solid ${CHARCOAL}`,
        padding: '0 24px',
        ...row,
        justifyContent: 'space-between',
        flexShrink: 0,
      }}
    >
      <div style={{ ...row, gap: 10 }}>
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: 99,
            background: CORAL,
            border: `2px solid ${CHARCOAL}`,
          }}
        />
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: 99,
            background: SUNNY,
            border: `2px solid ${CHARCOAL}`,
          }}
        />
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: 99,
            background: TEAL,
            border: `2px solid ${CHARCOAL}`,
          }}
        />
      </div>
      {headerLabel && (
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 19,
            fontWeight: 700,
            color: MUTED,
          }}
        >
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
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 20,
        background: bgColor,
        border: `2.8px solid ${CHARCOAL}`,
        boxShadow: `0 4px 0 ${CHARCOAL}`,
        ...centerCol,
        flexShrink: 0,
      }}
    >
      <JuniorIcon name={icon} size={34} />
    </div>
    <div style={{ fontSize, fontWeight: 700, lineHeight: 1.32, color: CHARCOAL }}>{children}</div>
  </div>
);

// ============================================================================
// Reusable Pertemuan 40 Visuals (Radar Waves, Star, Rock, Scratch Cat, Blocks)
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

const StarPrizeSvg = ({ size = 76 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 90 90" fill="none">
    <polygon
      points="45,7 55,30 80,33 62,50 67,75 45,63 23,75 28,50 10,33 35,30"
      fill={SUNNY}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <circle cx="38" cy="42" r="3.1" fill={CHARCOAL} />
    <circle cx="52" cy="42" r="3.1" fill={CHARCOAL} />
    <path d="M40 50 Q45 55 50 50" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" fill="none" />
  </svg>
);

const RockObstacleSvg = ({ size = 78 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 90 90" fill="none">
    <ellipse cx="45" cy="76" rx="30" ry="7" fill="rgba(30,30,44,0.16)" />
    <path
      d="M16 68 L22 36 L40 22 L62 28 L76 48 L72 68 Z"
      fill="#94A3B8"
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <path d="M27 42 L40 28 L56 34 L45 48 Z" fill="#CBD5E1" />
    <path d="M32 52 L40 48 M52 52 L60 48" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
    <path d="M38 60 Q45 56 52 60" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" fill="none" />
  </svg>
);

const RadarWaveRings = ({ color = SCRATCH_SENSING, active = true }: { color?: string; active?: boolean }) => (
  <svg
    width={140}
    height={140}
    viewBox="0 0 140 140"
    style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
  >
    <circle
      cx="70"
      cy="70"
      r="44"
      fill="none"
      stroke={color}
      strokeWidth={3.5}
      strokeDasharray="8 6"
      style={{ transformOrigin: '70px 70px', animation: active ? 'cpj40-radar 1.7s ease-out infinite' : undefined }}
    />
    <circle
      cx="70"
      cy="70"
      r="58"
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      opacity={0.45}
    />
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

/** Light-blue Scratch 3.0 hexagonal Sensing block: < touching [ target ] ? > */
const Scratch3TouchingHexBlock = ({
  target = 'Star',
  scale = 1,
  highlightHex = false,
}: {
  target?: string;
  scale?: number;
  highlightHex?: boolean;
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(44 * scale),
      padding: `0 ${Math.round(20 * scale)}px`,
      background: SCRATCH_SENSING,
      color: WHITE,
      clipPath: 'polygon(14px 0%, calc(100% - 14px) 0%, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0% 50%)',
      filter: highlightHex
        ? `drop-shadow(0 0 0 3px ${CHARCOAL}) drop-shadow(0 0 12px ${SUNNY})`
        : 'drop-shadow(0 2px 0 rgba(30,30,44,0.85))',
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      whiteSpace: 'nowrap',
    }}
  >
    <span>touching</span>
    <span
      style={{
        padding: `${Math.round(2 * scale)}px ${Math.round(10 * scale)}px`,
        borderRadius: 99,
        background: '#3D94B8',
        border: `2px solid ${WHITE}`,
        color: WHITE,
        fontSize: Math.round(16 * scale),
        ...row,
        gap: Math.round(5 * scale),
      }}
    >
      <span>{target}</span>
      <span style={{ fontSize: Math.round(12 * scale) }}>v</span>
    </span>
    <span>?</span>
  </div>
);

/** Orange Scratch 3.0 Control C-block: if < condition > then { children } */
const Scratch3IfThenCBlock = ({
  condition,
  emptySlot = false,
  glowSlot = false,
  scale = 1,
  children,
}: {
  condition?: ReactNode;
  emptySlot?: boolean;
  glowSlot?: boolean;
  scale?: number;
  children?: ReactNode;
}) => {
  const s = scale;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {/* Top Bar */}
      <div
        style={{
          ...row,
          gap: Math.round(10 * s),
          minHeight: Math.round(54 * s),
          padding: `${Math.round(6 * s)}px ${Math.round(16 * s)}px`,
          borderRadius: `${Math.round(14 * s)}px ${Math.round(14 * s)}px ${Math.round(14 * s)}px 4px`,
          background: SCRATCH_CTRL,
          border: `3px solid ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: Math.round(20 * s),
          fontWeight: 700,
          color: CHARCOAL,
        }}
      >
        <span>if</span>
        {condition ? (
          condition
        ) : (
          <div
            style={{
              width: Math.round(115 * s),
              height: Math.round(38 * s),
              background: emptySlot ? (glowSlot ? STABILO : '#A86E08') : '#A86E08',
              clipPath: 'polygon(14px 0%, calc(100% - 14px) 0%, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0% 50%)',
              boxShadow: glowSlot ? `0 0 18px ${SUNNY}` : undefined,
            }}
          />
        )}
        <span>then</span>
      </div>

      {/* Left Spine + Inner Mouth */}
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div
          style={{
            width: Math.round(26 * s),
            background: SCRATCH_CTRL,
            borderLeft: `3px solid ${CHARCOAL}`,
            borderRight: `2px solid ${CHARCOAL}`,
          }}
        />
        <div style={{ padding: `${Math.round(8 * s)}px 0 ${Math.round(8 * s)}px ${Math.round(8 * s)}px`, minHeight: Math.round(44 * s), ...row }}>
          {children}
        </div>
      </div>

      {/* Bottom Jaw */}
      <div
        style={{
          width: Math.round(170 * s),
          height: Math.round(28 * s),
          borderRadius: `4px ${Math.round(12 * s)}px ${Math.round(12 * s)}px ${Math.round(12 * s)}px`,
          background: SCRATCH_CTRL,
          border: `3px solid ${CHARCOAL}`,
        }}
      />
    </div>
  );
};

/** Scratch 3.0 Orange forever C-block wrapping children */
const Scratch3ForeverCBlock = ({ children, scale = 1 }: { children: ReactNode; scale?: number }) => {
  const s = scale;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div
        style={{
          ...row,
          gap: Math.round(8 * s),
          height: Math.round(46 * s),
          padding: `0 ${Math.round(22 * s)}px`,
          borderRadius: `${Math.round(14 * s)}px ${Math.round(14 * s)}px ${Math.round(14 * s)}px 4px`,
          background: SCRATCH_CTRL,
          border: `2.8px solid ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: Math.round(19 * s),
          fontWeight: 700,
          color: CHARCOAL,
        }}
      >
        <span>forever</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div
          style={{
            width: Math.round(26 * s),
            background: SCRATCH_CTRL,
            borderLeft: `2.8px solid ${CHARCOAL}`,
            borderRight: `2px solid ${CHARCOAL}`,
          }}
        />
        <div style={{ padding: `${Math.round(8 * s)}px 0 ${Math.round(8 * s)}px ${Math.round(8 * s)}px`, display: 'flex', flexDirection: 'column', gap: Math.round(6 * s) }}>
          {children}
        </div>
      </div>
      <div
        style={{
          ...row,
          justifyContent: 'flex-end',
          paddingRight: Math.round(12 * s),
          width: Math.round(225 * s),
          height: Math.round(32 * s),
          borderRadius: `4px ${Math.round(14 * s)}px ${Math.round(14 * s)}px ${Math.round(14 * s)}px`,
          background: SCRATCH_CTRL,
          border: `2.8px solid ${CHARCOAL}`,
        }}
      >
        <JuniorIcon name="infinity" size={Math.round(20 * s)} />
      </div>
    </div>
  );
};

const Scratch3StatementBlock = ({
  color,
  textColor = WHITE,
  scale = 1,
  children,
}: {
  color: string;
  textColor?: string;
  scale?: number;
  children: ReactNode;
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(44 * scale),
      padding: `0 ${Math.round(16 * scale)}px`,
      borderRadius: Math.round(10 * scale),
      background: color,
      border: `2.6px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(17 * scale),
      fontWeight: 700,
      color: textColor,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

// ============================================================================
// Interactive Authentic Scratch 3.0 Radar Sensor Simulator (Slide 09)
// ============================================================================
const AuthenticScratch3SensorUI = ({
  catPos,
  onMove,
  onReset,
  hitStatus,
  score,
  width = 1280,
  height = 565,
}: {
  catPos: { x: number; y: number };
  onMove: (dx: number, dy: number) => void;
  onReset: () => void;
  hitStatus: 'none' | 'star' | 'rock';
  score: number;
  width?: number;
  height?: number;
}) => {
  const starPos = { x: 80, y: 24 };
  const rockPos = { x: 74, y: 74 };

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 24,
        border: `3.5px solid ${CHARCOAL}`,
        boxShadow: `0 10px 0 ${CHARCOAL}`,
        background: '#F4F7FC',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Scratch 3.0 Official Blue Top Nav */}
      <div
        style={{
          height: 46,
          background: SCRATCH_BLUE,
          borderBottom: `2.5px solid ${CHARCOAL}`,
          padding: '0 18px',
          ...row,
          justifyContent: 'space-between',
          color: WHITE,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ letterSpacing: '0.03em' }}>SCRATCH 3.0</span>
          <span style={{ padding: '3px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.22)', fontSize: 15 }}>
            Sensor Radar Aktif
          </span>
        </div>
        <div style={{ ...row, gap: 12 }}>
          <span style={{ padding: '3px 14px', borderRadius: 99, background: SUNNY, color: CHARCOAL, fontSize: 15 }}>
            Bintang Terkumpul: {score}
          </span>
        </div>
      </div>

      {/* Main Split: Workspace Code (Left) + Playable Stage & D-Pad (Right) */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Code Workspace */}
        <div
          style={{
            width: 590,
            background: '#FFFFFF',
            backgroundImage: 'radial-gradient(#D5DEED 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px',
            borderRight: `2.5px solid ${CHARCOAL}`,
            padding: '14px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 16, fontWeight: 700, color: MUTED, ...row, justifyContent: 'space-between' }}>
            <span>Skrip Radar Sensor: Kucing Scratch</span>
            <span style={{ padding: '2px 10px', borderRadius: 99, background: TEAL_SOFT, color: TEAL, border: `1.5px solid ${TEAL}`, fontSize: 13 }}>
              Radar Menyala
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Scratch3HatFlagBlock scale={0.78} />
            <Scratch3ForeverCBlock scale={0.76}>
              <div
                style={{
                  borderRadius: 12,
                  boxShadow: hitStatus === 'star' ? `0 0 0 4px ${TEAL}` : undefined,
                  transition: 'box-shadow 150ms ease',
                }}
              >
                <Scratch3IfThenCBlock scale={0.74} condition={<Scratch3TouchingHexBlock target="Star" scale={0.74} />}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Scratch3StatementBlock color={SCRATCH_SOUND} scale={0.74}>
                      <JuniorIcon name="speaker" size={16} />
                      <span>start sound [Collect]</span>
                    </Scratch3StatementBlock>
                    <Scratch3StatementBlock color={SCRATCH_LOOKS} scale={0.74}>
                      <span>say &quot;Hore, dapat bintang!&quot;</span>
                    </Scratch3StatementBlock>
                  </div>
                </Scratch3IfThenCBlock>
              </div>
              <div
                style={{
                  borderRadius: 12,
                  boxShadow: hitStatus === 'rock' ? `0 0 0 4px ${CORAL}` : undefined,
                  transition: 'box-shadow 150ms ease',
                }}
              >
                <Scratch3IfThenCBlock scale={0.74} condition={<Scratch3TouchingHexBlock target="Rocks" scale={0.74} />}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Scratch3StatementBlock color={SCRATCH_SOUND} scale={0.74}>
                      <JuniorIcon name="speaker" size={16} />
                      <span>start sound [Boing]</span>
                    </Scratch3StatementBlock>
                    <Scratch3StatementBlock color={SCRATCH_LOOKS} scale={0.74}>
                      <span>say &quot;Ups, awas batu!&quot;</span>
                    </Scratch3StatementBlock>
                  </div>
                </Scratch3IfThenCBlock>
              </div>
            </Scratch3ForeverCBlock>
          </div>
        </div>

        {/* Interactive Stage */}
        <div
          style={{
            flex: 1,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#EEF3FA',
          }}
        >
          {/* Stage Top Toolbar */}
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 10 }}>
              <button
                type="button"
                onClick={onReset}
                className="cpj40-card-btn"
                style={{
                  padding: '6px 14px',
                  borderRadius: 99,
                  background: WHITE,
                  border: `2px solid ${CHARCOAL}`,
                  ...row,
                  gap: 6,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                <JuniorIcon name="flag" size={20} />
                <span>Reset Posisi</span>
              </button>
              <span style={{ fontSize: 15, fontWeight: 700, color: MUTED }}>
                Pakai Tombol Panah / Klik Panah di Bawah!
              </span>
            </div>
            <div style={{ ...row, gap: 6 }}>
              {(['star', 'rock'] as const).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => onMove(kind === 'star' ? 999 : -999, 0)}
                  style={{
                    padding: '5px 11px',
                    borderRadius: 99,
                    border: `2px solid ${CHARCOAL}`,
                    background: kind === 'star' ? SUNNY_SOFT : CORAL_SOFT,
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  {kind === 'star' ? 'Sentuh Bintang' : 'Sentuh Batu'}
                </button>
              ))}
            </div>
          </div>

          {/* Playable Stage Canvas */}
          <div
            style={{
              position: 'relative',
              height: 360,
              borderRadius: 18,
              border: `3px solid ${CHARCOAL}`,
              background: 'linear-gradient(180deg, #DCFCE7 0%, #FEF9C3 100%)',
              overflow: 'hidden',
            }}
          >
            {/* Garden grass ground */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 85, background: '#86EFAC', borderTop: `2.5px solid ${CHARCOAL}` }} />

            {/* Star Prize */}
            <div
              style={{
                position: 'absolute',
                left: `${starPos.x}%`,
                top: `${starPos.y}%`,
                transform: 'translate(-50%, -50%)',
                filter: hitStatus === 'star' ? `drop-shadow(0 0 18px ${SUNNY})` : undefined,
              }}
            >
              <StarPrizeSvg size={82} />
            </div>

            {/* Rock Obstacle */}
            <div
              style={{
                position: 'absolute',
                left: `${rockPos.x}%`,
                top: `${rockPos.y}%`,
                transform: 'translate(-50%, -50%)',
                filter: hitStatus === 'rock' ? `drop-shadow(0 0 14px ${CORAL})` : undefined,
              }}
            >
              <RockObstacleSvg size={84} />
            </div>

            {/* Scratch Cat with Live Radar Waves */}
            <div
              style={{
                position: 'absolute',
                left: `${catPos.x}%`,
                top: `${catPos.y}%`,
                transform: 'translate(-50%, -50%)',
                transition: 'left 130ms ease-out, top 130ms ease-out',
              }}
            >
              <RadarWaveRings
                color={hitStatus === 'star' ? TEAL : hitStatus === 'rock' ? CORAL : SCRATCH_SENSING}
                active
              />
              {hitStatus !== 'none' && (
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 98,
                    transform: 'translateX(-50%)',
                    padding: '6px 14px',
                    borderRadius: 14,
                    background: hitStatus === 'star' ? TEAL_SOFT : CORAL_SOFT,
                    border: `2.5px solid ${hitStatus === 'star' ? TEAL : CORAL}`,
                    color: CHARCOAL,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 16,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    boxShadow: `0 4px 0 ${CHARCOAL}`,
                    zIndex: 4,
                  }}
                >
                  {hitStatus === 'star' ? 'Hore, dapat bintang!' : 'Ups, awas batu!'}
                </div>
              )}
              <ScratchCatSvg size={102} waving={hitStatus === 'star'} />
            </div>
          </div>

          {/* Clickable D-Pad */}
          <div style={{ ...row, justifyContent: 'center', gap: 14 }}>
            {[
              { dir: 'left', icon: 'arrow-left' as JuniorIconName, dx: -10, dy: 0 },
              { dir: 'up', icon: 'arrow-up' as JuniorIconName, dx: 0, dy: -12 },
              { dir: 'down', icon: 'arrow-down' as JuniorIconName, dx: 0, dy: 12 },
              { dir: 'right', icon: 'arrow-right' as JuniorIconName, dx: 10, dy: 0 },
            ].map((btn) => (
              <button
                key={btn.dir}
                type="button"
                onClick={() => onMove(btn.dx, btn.dy)}
                className="cpj40-card-btn"
                style={{
                  width: 62,
                  height: 50,
                  borderRadius: 14,
                  background: SKY_SOFT,
                  border: `2.5px solid ${CHARCOAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  ...centerCol,
                }}
              >
                <JuniorIcon name={btn.icon} size={26} />
              </button>
            ))}
          </div>
        </div>
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
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 40" accentDot={SCRATCH_SENSING}>
      {/* Left Hero Copy */}
      <div style={{ ...abs(X0, 225, 860) }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 20px',
            borderRadius: 99,
            background: SKY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            color: CHARCOAL,
            marginBottom: 22,
          }}
        >
          <JuniorIcon name="compass" size={26} />
          <span>Belajar Logika Sebab-Akibat di Scratch 3.0</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 90,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
          }}
        >
          <Highlight>Radar Sensor</Highlight>
          <br />
          <Highlight>Pintar!</Highlight>
        </h1>

        <p
          style={{
            margin: '30px 0 0',
            fontSize: 31,
            fontWeight: 700,
            lineHeight: 1.4,
            color: MUTED,
            maxWidth: 790,
          }}
        >
          Logika Sebab-Akibat Saat Karakter{' '}
          <strong style={{ color: CHARCOAL }}>Menyentuh Hadiah</strong> atau{' '}
          <strong style={{ color: CHARCOAL }}>Rintangan!</strong>
        </p>

        <div style={{ ...row, gap: 16, marginTop: 34 }}>
          <div
            style={{
              padding: '12px 24px',
              borderRadius: 18,
              background: ORANGE_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              boxShadow: `0 4px 0 ${CHARCOAL}`,
              ...row,
              gap: 10,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="puzzle" size={24} />
            <span>Blok if ... then</span>
          </div>
          <div
            style={{
              padding: '12px 24px',
              borderRadius: 18,
              background: SKY_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              boxShadow: `0 4px 0 ${CHARCOAL}`,
              ...row,
              gap: 10,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="diamond" size={24} />
            <span>Sensor touching</span>
          </div>
        </div>
      </div>

      {/* Right Visual: Biko Detective + Mini Radar Scratch Window */}
      <MacWindowCard
        left={1010}
        top={185}
        width={810}
        height={690}
        titleBarColor={SKY_SOFT}
        headerLabel="Scratch 3.0 • Radar Sentuhan"
        padding={26}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 20,
            border: `3px solid ${CHARCOAL}`,
            background: 'linear-gradient(180deg, #E0F2FE 0%, #FEF9C3 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Floating Star & Rock */}
          <div style={{ ...abs(545, 75), animation: live ? 'cpj40-float 2.8s ease-in-out infinite' : undefined }}>
            <StarPrizeSvg size={110} />
          </div>
          <div style={{ ...abs(560, 390) }}>
            <RockObstacleSvg size={108} />
          </div>

          {/* Kucing Scratch with Radar Waves */}
          <div style={{ ...abs(210, 210), width: 170, height: 170, ...centerCol }}>
            <RadarWaveRings color={SCRATCH_SENSING} active={live} />
            <ScratchCatSvg size={145} waving />
          </div>

          {/* Biko Mascot with Radar Badge */}
          <div style={{ ...abs(12, 230), animation: live ? 'cpj40-float 3.2s ease-in-out infinite' : undefined }}>
            <BikoMascot
              pose="detective"
              width={230}
              badgeIcon={<JuniorIcon name="compass" size={20} />}
              speechBubble="Radar aktif!"
            />
          </div>

          {/* Mini Block Stack Pill */}
          <div style={{ ...abs(26, 480) }}>
            <Scratch3IfThenCBlock scale={0.78} condition={<Scratch3TouchingHexBlock target="Star" scale={0.78} />}>
              <Scratch3StatementBlock color={SCRATCH_LOOKS} scale={0.78}>
                <span>say &quot;Dapat Bintang!&quot;</span>
              </Scratch3StatementBlock>
            </Scratch3IfThenCBlock>
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
    <JuniorFrame badge="PETUALANGAN HARI INI" accentDot={SUNNY}>
      <SlideTitle>
        2 Misi <Highlight>Radar Sensor Pintar!</Highlight>
      </SlideTitle>

      {/* Biko Left Anchor */}
      <div style={{ ...abs(95, 295, 360, 620), ...centerCol }}>
        <div style={{ animation: live ? 'cpj40-hop 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="point-left"
            width={320}
            badgeIcon={<JuniorIcon name="compass" size={22} />}
            speechBubble="Siap deteksi!"
          />
        </div>
      </div>

      {/* macOS Window with 2 Mission Cards */}
      <MacWindowCard
        left={480}
        top={240}
        width={1340}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Misi Pertemuan 40"
        padding={42}
      >
        <div style={{ display: 'flex', gap: 36, height: '100%' }}>
          {/* Kartu Misi 1: if ... then */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: ORANGE_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: ORANGE, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ ...centerCol, padding: '16px 0' }}>
              <Scratch3IfThenCBlock scale={0.96} emptySlot glowSlot />
            </div>

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Kenali Blok Kondisi{' '}
              <span style={{ color: '#C2410C' }}>if ... then</span>{' '}
              <em>(Jika ... Maka)</em>
            </div>
          </div>

          {/* Kartu Misi 2: touching [Star]? */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SCRATCH_SENSING, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
              <Scratch3TouchingHexBlock target="Star" scale={1.06} />
              <div style={{ ...row, gap: 28 }}>
                <StarPrizeSvg size={82} />
                <JuniorIcon name="compass" size={44} />
                <RockObstacleSvg size={82} />
              </div>
            </div>

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Pakai Sensor{' '}
              <span style={{ color: '#0369A1' }}>touching</span> untuk{' '}
              <strong>Hadiah &amp; Rintangan!</strong>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Blok Oranye if ... then (Jika ... Maka)
// ============================================================================
const Slide03BlokIf: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="KENALAN SAMA BLOK BARU" accentDot={SCRATCH_CTRL}>
      <SlideTitle>
        Blok Oranye Ajaib: <Highlight color="#FFEDD5">if ... then</Highlight>
      </SlideTitle>

      {/* Left Explanation Spotlight Card */}
      <MacWindowCard
        left={X0}
        top={245}
        width={930}
        height={680}
        titleBarColor={ORANGE_SOFT}
        headerLabel="Kategori: Control (Oranye)"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
            <BulletRow icon="question" bgColor={SUNNY_SOFT} fontSize={32}>
              <strong>if (Jika):</strong> Syarat yang harus terjadi dulu di lubang segi enam atas
            </BulletRow>
            <BulletRow icon="sparkle" bgColor={ORANGE_SOFT} fontSize={32}>
              <strong>then (Maka):</strong> Aksi yang langsung dijalankan di dalam mulutnya!
            </BulletRow>
            <BulletRow icon="bulb" bgColor={TEAL_SOFT} fontSize={32}>
              Seperti aturan: <em>&quot;Jika hujan turun, maka buka payung!&quot;</em>
            </BulletRow>
          </div>

          <div
            style={{
              padding: '20px 26px',
              borderRadius: 20,
              background: SUNNY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 16,
              fontSize: 25,
              fontWeight: 800,
            }}
          >
            <JuniorIcon name="diamond" size={32} />
            <span>Lubang di atas berbentuk segi enam khusus untuk blok Sensor!</span>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Giant Block Showcase */}
      <div
        style={{
          ...abs(1070, 245, 750, 680),
          borderRadius: 30,
          background: WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          ...centerCol,
          gap: 32,
          padding: 36,
        }}
      >
        <div style={{ padding: '8px 24px', borderRadius: 99, background: ORANGE_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
          Mulut Blok Kondisi
        </div>

        <div style={{ animation: live ? 'cpj40-float 2.8s ease-in-out infinite' : undefined }}>
          <Scratch3IfThenCBlock scale={1.45} emptySlot glowSlot>
            <div style={{ padding: '10px 20px', borderRadius: 12, background: '#FEF3C7', border: `2.5px dashed ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: MUTED }}>
              Aksi di dalam sini!
            </div>
          </Scratch3IfThenCBlock>
        </div>

        <BikoMascot pose="thumbs-up" width={190} speechBubble="Jika syarat pas!" />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Blok Biru Muda touching [Objek] (Sensing)
// ============================================================================
const Slide04BlokTouching: Page = () => {
  const [selectedTarget, setSelectedTarget] = useState<'Star' | 'Rocks'>('Star');

  return (
    <JuniorFrame badge="BLOK SENSOR SENTUHAN" accentDot={SCRATCH_SENSING}>
      <SlideTitle>
        Blok Biru Muda: <Highlight color="#DBEAFE">touching [Objek]?</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card */}
      <MacWindowCard
        left={X0}
        top={245}
        width={910}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Kategori: Sensing (Biru Muda)"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
            <BulletRow icon="diamond" bgColor={SKY_SOFT} fontSize={32}>
              Bentuknya <strong>Segi Enam Runcing</strong> — pas sekali masuk ke lubang blok <code>if</code>!
            </BulletRow>
            <BulletRow icon="compass" bgColor={TEAL_SOFT} fontSize={32}>
              Mendeteksi saat karakter <strong>Menyentuh</strong> hadiah atau rintangan!
            </BulletRow>
            <BulletRow icon="mouse" bgColor={SUNNY_SOFT} fontSize={32}>
              Klik panah kecil di dalam blok untuk memilih nama benda tujuan!
            </BulletRow>
          </div>

          <div style={{ ...row, gap: 18 }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: MUTED }}>
              Coba ganti target:
            </span>
            {(['Star', 'Rocks'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  playSensorSound('ping');
                  setSelectedTarget(t);
                }}
                className="cpj40-card-btn"
                style={{
                  padding: '10px 24px',
                  borderRadius: 16,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  background: selectedTarget === t ? SCRATCH_SENSING : WHITE,
                  color: selectedTarget === t ? WHITE : CHARCOAL,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {t === 'Star' ? 'Star (Bintang)' : 'Rocks (Batu)'}
              </button>
            ))}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Interactive Slot Fit Demo */}
      <div
        style={{
          ...abs(1050, 245, 770, 680),
          borderRadius: 30,
          background: WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          ...centerCol,
          gap: 32,
          padding: 36,
        }}
      >
        <div style={{ padding: '8px 24px', borderRadius: 99, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
          Bentuk Segi Enam Pas Masuk!
        </div>

        <Scratch3TouchingHexBlock target={selectedTarget} scale={1.36} highlightHex />

        <JuniorIcon name="arrow-down" size={44} />

        <Scratch3IfThenCBlock scale={1.12} condition={<Scratch3TouchingHexBlock target={selectedTarget} scale={1.12} />}>
          <Scratch3StatementBlock color={selectedTarget === 'Star' ? SCRATCH_LOOKS : CORAL} scale={1.08}>
            <span>{selectedTarget === 'Star' ? 'say "Hore!"' : 'say "Awas!"'}</span>
          </Scratch3StatementBlock>
        </Scratch3IfThenCBlock>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Rahasia Radar Aktif Terus-Menerus (forever)
// ============================================================================
const Slide05BungkusForever: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="RAHASIA RADAR MENYALA" accentDot={SCRATCH_CTRL}>
      <SlideTitle>
        Bungkus Pakai <Highlight color="#FFEDD5">forever!</Highlight>
      </SlideTitle>

      {/* Left Concept Window */}
      <MacWindowCard
        left={X0}
        top={245}
        width={910}
        height={680}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Kenapa Harus Ada forever?"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <BulletRow icon="infinity" bgColor={ORANGE_SOFT} fontSize={31}>
              Pasang blok oranye <strong>forever</strong> di bagian paling luar!
            </BulletRow>
            <BulletRow icon="compass" bgColor={SKY_SOFT} fontSize={31}>
              Radar jadi <strong>Terus Berjaga</strong> mengecek sentuhan setiap saat!
            </BulletRow>
            <BulletRow icon="stop" bgColor={CORAL_SOFT} fontSize={31}>
              Tanpa <code>forever</code>, radar hanya mengecek <strong>1 kali</strong> di awal lalu mati!
            </BulletRow>
          </div>

          <div style={{ ...row, gap: 22, padding: '18px 24px', borderRadius: 20, background: TEAL_SOFT, border: `3px solid ${TEAL}` }}>
            <BikoMascot pose="laptop" width={145} />
            <div style={{ fontSize: 25, fontWeight: 800, color: CHARCOAL, lineHeight: 1.32 }}>
              Bungkus <code>if ... then</code> di dalam <code>forever</code> supaya radar aktif selama game berjalan!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Code Stack Showcase */}
      <div
        style={{
          ...abs(1050, 245, 770, 680),
          borderRadius: 30,
          background: WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          ...centerCol,
          gap: 14,
          padding: 36,
        }}
      >
        <div style={{ padding: '8px 24px', borderRadius: 99, background: ORANGE_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700, marginBottom: 8 }}>
          Susunan Radar Anti-Gagal
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, animation: live ? 'cpj40-float 3s ease-in-out infinite' : undefined }}>
          <Scratch3HatFlagBlock scale={1.12} />
          <Scratch3ForeverCBlock scale={1.1}>
            <Scratch3IfThenCBlock scale={1.06} condition={<Scratch3TouchingHexBlock target="Star" scale={1.06} />}>
              <Scratch3StatementBlock color={SCRATCH_SOUND} scale={1.06}>
                <JuniorIcon name="speaker" size={22} />
                <span>start sound [Collect]</span>
              </Scratch3StatementBlock>
            </Scratch3IfThenCBlock>
          </Scratch3ForeverCBlock>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Bentuk Blok Sensor Mana yang Pas?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="AYO TEBAK CEPAT!" accentDot={SUNNY}>
      <SlideTitle size={50} maxWidth={1680}>
        Bentuk Blok Sensor Mana yang Pas Masuk ke Lubang <Highlight>if &lt; &gt; then?</Highlight>
      </SlideTitle>

      {/* Card A — Correct (Hexagon Sensing Block) */}
      <button
        type="button"
        onClick={() => {
          playSensorSound('star');
          setPicked('A');
        }}
        className="cpj40-card-btn"
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
            Blok Segi Enam (Sensing)
          </span>
        </div>

        <Scratch3TouchingHexBlock target="Star" scale={1.45} highlightHex={picked === 'A'} />

        <div style={{ ...row, gap: 12, minHeight: 54 }}>
          {picked === 'A' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={26} />
              <span>Benar! Segi enam pas di lubang if!</span>
            </div>
          ) : (
            <span style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Card B — Wrong (Regular Stack Motion Block) */}
      <button
        type="button"
        onClick={() => {
          playSensorSound('rock');
          setPicked('B');
        }}
        className="cpj40-card-btn"
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
          animation: picked === 'B' ? 'cpj40-shake 320ms ease' : undefined,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 16, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
            B
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Balok Biasa (Motion)
          </span>
        </div>

        <Scratch3StatementBlock color={SCRATCH_BLUE} scale={1.45}>
          <span>move (10) steps</span>
        </Scratch3StatementBlock>

        <div style={{ ...row, gap: 12, minHeight: 54 }}>
          {picked === 'B' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={26} />
              <span>Bukan! Balok rata tidak bisa masuk!</span>
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
        <div style={{ animation: live ? 'cpj40-float 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thinking" width={165} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
          {picked === 'A'
            ? 'Hebat! Blok Segi Enam biru muda memang jodohnya lubang if < > then!'
            : picked === 'B'
              ? 'Ups! move (10) steps berbentuk balok biasa. Cari yang berbentuk Segi Enam ya!'
              : 'Tunjuk bentuk blok yang cocok di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Dua Contoh Seru: Hadiah vs Rintangan
// ============================================================================
const Slide07HadiahRintangan: Page = () => {
  const [tested, setTested] = useState<'none' | 'star' | 'rock'>('none');

  return (
    <JuniorFrame badge="DUA CONTOH SERU!" accentDot={TEAL}>
      <SlideTitle>
        Sentuh <Highlight color="#DCFCE7">Hadiah</Highlight> vs Sentuh{' '}
        <Highlight color="#FEE2E2">Rintangan</Highlight>
      </SlideTitle>

      {/* macOS Window containing both cards */}
      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Resep Sebab-Akibat di Scratch 3.0"
        padding={34}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kiri — Sentuh Hadiah */}
          <button
            type="button"
            onClick={() => {
              playSensorSound('star');
              setTested('star');
            }}
            className="cpj40-card-btn"
            style={{
              flex: 1,
              borderRadius: 24,
              background: TEAL_SOFT,
              border: `3.5px solid ${TEAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '26px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <StarPrizeSvg size={72} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ padding: '4px 14px', borderRadius: 99, background: TEAL, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, display: 'inline-block' }}>
                  SENTUH HADIAH
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, marginTop: 4 }}>
                  Dapat Pujian!
                </div>
              </div>
            </div>

            <Scratch3IfThenCBlock scale={0.94} condition={<Scratch3TouchingHexBlock target="Star" scale={0.94} />}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Scratch3StatementBlock color={SCRATCH_SOUND} scale={0.9}>
                  <JuniorIcon name="speaker" size={18} />
                  <span>start sound [Pop]</span>
                </Scratch3StatementBlock>
                <Scratch3StatementBlock color={SCRATCH_LOOKS} scale={0.9}>
                  <span>say &quot;Hore, dapat bintang!&quot;</span>
                </Scratch3StatementBlock>
              </div>
            </Scratch3IfThenCBlock>

            <div style={{ padding: '10px 20px', borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 22, fontWeight: 800 }}>
              {tested === 'star' ? 'Pop! Hore, dapat bintang!' : 'Klik kartu untuk dengar bunyinya!'}
            </div>
          </button>

          {/* Kanan — Sentuh Rintangan */}
          <button
            type="button"
            onClick={() => {
              playSensorSound('rock');
              setTested('rock');
            }}
            className="cpj40-card-btn"
            style={{
              flex: 1,
              borderRadius: 24,
              background: CORAL_SOFT,
              border: `3.5px solid ${CORAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '26px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <RockObstacleSvg size={74} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ padding: '4px 14px', borderRadius: 99, background: CORAL, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, display: 'inline-block' }}>
                  SENTUH RINTANGAN
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, marginTop: 4 }}>
                  Ada Peringatan!
                </div>
              </div>
            </div>

            <Scratch3IfThenCBlock scale={0.94} condition={<Scratch3TouchingHexBlock target="Rocks" scale={0.94} />}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Scratch3StatementBlock color={SCRATCH_SOUND} scale={0.9}>
                  <JuniorIcon name="speaker" size={18} />
                  <span>start sound [Boing]</span>
                </Scratch3StatementBlock>
                <Scratch3StatementBlock color={SCRATCH_LOOKS} scale={0.9}>
                  <span>say &quot;Ups, awas batu!&quot;</span>
                </Scratch3StatementBlock>
              </div>
            </Scratch3IfThenCBlock>

            <div style={{ padding: '10px 20px', borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 22, fontWeight: 800 }}>
              {tested === 'rock' ? 'Boing! Ups, awas batu!' : 'Klik kartu untuk dengar bunyinya!'}
            </div>
          </button>
        </div>
      </MacWindowCard>

      {/* Right Biko Anchor */}
      <div style={{ ...abs(1485, 360, 350, 560), ...centerCol }}>
        <BikoMascot
          pose={tested === 'star' ? 'jump' : tested === 'rock' ? 'detective' : 'thumbs-up'}
          width={305}
          badgeIcon={<JuniorIcon name="compass" size={22} />}
          speechBubble={tested === 'star' ? 'Hore!' : tested === 'rock' ? 'Awas!' : 'Pilih contoh!'}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Radar Sensor Pintar (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsSensor: Page = () => {
  return (
    <JuniorFrame badge="TIPS JAGOAN RADAR SENSOR" accentDot={TEAL}>
      <SlideTitle>
        Tips Jagoan <Highlight>Radar Sensor Pintar!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & BENAR"
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
            <BulletRow icon="infinity" bgColor={TEAL_SOFT} fontSize={29}>
              Taruh <code>if ... then</code> <strong>Di Dalam</strong> blok <code>forever</code>
            </BulletRow>
            <BulletRow icon="star-glow" bgColor={SUNNY_SOFT} fontSize={29}>
              Pilih <strong>Nama Sprite Tujuan</strong> (<code>Star</code> / <code>Rocks</code>) di menu <code>touching</code>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <Scratch3TouchingHexBlock target="Star" scale={1.12} />
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
            <BulletRow icon="stop" bgColor={CORAL_SOFT} fontSize={29}>
              Memasang <code>if ... then</code> <strong>tanpa</strong> <code>forever</code> (radar langsung mati)
            </BulletRow>
            <BulletRow icon="mouse" bgColor={SUNNY_SOFT} fontSize={29}>
              Membiarkan <code>mouse-pointer</code> padahal ingin menyentuh Bintang
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <Scratch3TouchingHexBlock target="mouse-pointer" scale={1.04} />
            <JuniorIcon name="cross" size={62} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Game Tangkap Bintang & Hindari Batu!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [catPos, setCatPos] = useState({ x: 24, y: 54 });
  const [hitStatus, setHitStatus] = useState<'none' | 'star' | 'rock'>('none');
  const [score, setScore] = useState(0);

  const moveCat = (dx: number, dy: number) => {
    setCatPos((prev) => {
      let nx: number;
      let ny: number;
      if (dx === 999) {
        nx = 72;
        ny = 26;
      } else if (dx === -999) {
        nx = 66;
        ny = 70;
      } else {
        nx = Math.max(12, Math.min(86, prev.x + dx));
        ny = Math.max(18, Math.min(82, prev.y + dy));
      }

      const distStar = Math.hypot(nx - 80, ny - 24);
      const distRock = Math.hypot(nx - 74, ny - 74);

      if (distStar < 18) {
        playSensorSound('star');
        setHitStatus('star');
        setScore((s) => s + 1);
      } else if (distRock < 18) {
        playSensorSound('rock');
        setHitStatus('rock');
      } else {
        setHitStatus('none');
      }

      return { x: nx, y: ny };
    });
  };

  useEffect(() => {
    if (!live) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveCat(9, 0);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveCat(-9, 0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveCat(0, -10);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveCat(0, 10);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [live]);

  const handleReset = () => {
    playSensorSound('ping');
    setCatPos({ x: 24, y: 54 });
    setHitStatus('none');
  };

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Tangkap Bintang &amp; Hindari Batu!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'keyboard' as JuniorIconName,
            text: (
              <>
                Siapkan <strong>Kucing</strong> (kemudi panah), <strong>Bintang Hadiah</strong>, &amp; <strong>Batu</strong>
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
                Pasang <strong>forever</strong> + <strong>if &lt;touching [Star]&gt;</strong> &amp; <strong>if &lt;touching [Rocks]&gt;</strong>
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
                Klik <strong>Bendera Hijau!</strong> Sentuh Bintang &amp; hindari Batu rintangan!
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

      {/* Playable Interactive Scratch 3.0 Sensor Simulator */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratch3SensorUI
          catPos={catPos}
          onMove={moveCat}
          onReset={handleReset}
          hitStatus={hitStatus}
          score={score}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Reset Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 14 }}>
        <div style={{ animation: live ? 'cpj40-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose={hitStatus === 'star' ? 'jump' : hitStatus === 'rock' ? 'thinking' : 'thumbs-up'}
            width={320}
            badgeIcon={<JuniorIcon name="compass" size={24} />}
            speechBubble={
              hitStatus === 'star' ? 'Dapat bintang!' : hitStatus === 'rock' ? 'Awas batu!' : 'Pakai panah!'
            }
          />
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="cpj40-card-btn"
          style={{
            padding: '14px 26px',
            borderRadius: 20,
            background: SUNNY,
            color: CHARCOAL,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 23,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          <JuniorIcon name="flag" size={24} />
          <span>Reset Kucing ke Awal</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 40 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj40-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj40-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="compass" size={50} />
      </div>

      <SlideTitle top={135} size={58} align="center" maxWidth={1540}>
        Hore! Kamu Master <Highlight>Logika Sensor Pintar!</Highlight>
      </SlideTitle>

      {/* Center Celebration Window */}
      <MacWindowCard
        left={260}
        top={260}
        width={1060}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 40"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, gap: 22, textAlign: 'center' }}>
          {/* Golden Radar Sensor Medal */}
          <div style={{ animation: live ? 'cpj40-float 2.6s ease-in-out infinite' : undefined }}>
            <svg width={215} height={215} viewBox="0 0 210 210">
              <path d="M72 128 L52 195 L82 180 L96 198 L106 135 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M138 128 L158 195 L128 180 L114 198 L104 135 Z" fill={SCRATCH_SENSING} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="105" cy="96" r="72" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="105" cy="96" r="56" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.2} />
              {/* Radar Rings & Hexagon Sensor Gem */}
              <circle cx="105" cy="96" r="42" fill="none" stroke={SCRATCH_SENSING} strokeWidth={3.5} strokeDasharray="7 5" />
              <polygon
                points="74,96 86,74 124,74 136,96 124,118 86,118"
                fill={SCRATCH_SENSING}
                stroke={CHARCOAL}
                strokeWidth={3.5}
              />
              <polygon
                points="105,81 109,90 119,91 112,98 114,108 105,103 96,108 98,98 91,91 101,90"
                fill={SUNNY}
                stroke={WHITE}
                strokeWidth={2}
              />
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
            <span>Lencana Ahli Radar Sensor &amp; Kondisi</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.38,
              maxWidth: 920,
              color: CHARCOAL,
            }}
          >
            Kamu sudah jago memakai{' '}
            <Highlight color="#DBEAFE">if ... then &amp; touching [Objek]</Highlight> di Scratch 3.0!
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="star-glow" size={22} />}
            speechBubble="Master Sensor!"
          />
          <div style={{ animation: live ? 'cpj40-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 40 — Radar Sensor Pintar! 📡⭐
Hari ini anak-anak belajar logika sebab-akibat di Scratch 3.0 saat karakter menyentuh Hadiah atau Rintangan!`,

  `Dua misi seru hari ini:
1. Mengenal Blok Kondisi oranye "if ... then" (Jika ... Maka).
2. Memakai Sensor biru muda "touching" untuk mendeteksi Hadiah & Rintangan!`,

  `Blok Oranye Ajaib — if ... then:
- "if" (Jika): Syarat yang harus terjadi dulu di lubang segi enam atas.
- "then" (Maka): Aksi yang langsung dijalankan di dalam mulutnya!`,

  `Blok Biru Muda — touching [Objek]?:
- Berbentuk Segi Enam Runcing agar pas masuk ke lubang blok "if".
- Mendeteksi saat karakter menyentuh hadiah (Star) atau rintangan (Rocks)!`,

  `Rahasia supaya radar aktif terus:
Bungkus blok "if ... then" DI DALAM blok oranye "forever"! Tanpa forever, radar hanya mengecek 1 kali di awal lalu mati.`,

  `Permainan Cepat! Ayo tebak bersama:
Bentuk blok mana yang pas masuk ke lubang if < > then — Pilihan A (Segi Enam touching [Star]?) atau Pilihan B (Balok Biasa move (10) steps)?`,

  `Dua Contoh Seru Sebab-Akibat:
- Sentuh Hadiah (Star): Bunyi "Pop!" + katakan "Hore, dapat bintang!"
- Sentuh Rintangan (Rocks): Bunyi "Boing!" + katakan "Ups, awas batu!"`,

  `Tips Jagoan Radar Sensor Pintar:
BOLEH taruh if di dalam forever & pilih nama sprite tujuan (Star/Rocks).
JANGAN pasang if tanpa forever, atau lupa mengganti "mouse-pointer"!`,

  `Misi Praktik Tangkap Bintang & Hindari Batu!
Ajak anak-anak menggerakkan Kucing Scratch pakai tombol panah di keyboard atau D-Pad di panggung slide untuk mencoba menyentuh Bintang & Batu!`,

  `Hore! Kamu Master Logika Sensor Pintar! 🎉🏅
Selamat meraih Lencana Ahli Radar Sensor & Kondisi di Pertemuan 40!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 40 — Radar Sensor Pintar!',
  createdAt: '2026-11-16T15:44:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BlokIf,
  Slide04BlokTouching,
  Slide05BungkusForever,
  Slide06AyoTebak,
  Slide07HadiahRintangan,
  Slide08TipsSensor,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

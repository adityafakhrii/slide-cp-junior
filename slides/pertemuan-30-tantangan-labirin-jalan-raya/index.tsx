import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-30-tantangan-labirin-jalan-raya';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj30-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj30-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj30-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj30-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj30-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj30-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.8); }
  50% { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
}
.cpj30-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj30-card-btn:hover {
  transform: translateY(-4px);
}
.cpj30-card-btn:active {
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

/** Playful step blip or victory arpeggio for Maze Game */
function playMazeChime(win = false) {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notesSeq = win ? [523.25, 659.25, 783.99, 1046.5] : [440];
    notesSeq.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + i * 0.08;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.22, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.2);
    });
    setTimeout(() => {
      void ctx.close();
    }, 600);
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
    accent: '#10B981',
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
const LAVENDER_SOFT = '#F3EEFF';
const SKY = '#60A5FA';
const SKY_SOFT = '#EFF6FF';
const ORANGE = '#FB923C';
const ORANGE_SOFT = '#FFF7ED';

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
  accentDot = TEAL,
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
          animation: live ? 'cpj30-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: TEAL,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 30 • Tantangan Labirin Jalan Raya!</span>
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
  fontSize = 31,
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
// Reusable Pertemuan 30 Visuals (Maze Backdrop, Red Car, Finish Flag, Arrows)
// ============================================================================

const RedCarSvg = ({ width = 84 }: { width?: number }) => (
  <svg width={width} height={Math.round(width * 0.62)} viewBox="0 0 160 100" fill="none">
    <ellipse cx="80" cy="91" rx="64" ry="7" fill="rgba(30,30,44,0.16)" />
    <path
      d="M28 48 L44 20 H106 L124 48 H144 C150 48 154 52 154 58 V74 C154 79 150 82 144 82 H16 C10 82 6 78 6 72 V56 C6 51 10 48 18 48 Z"
      fill={CORAL}
      stroke={CHARCOAL}
      strokeWidth={4.5}
      strokeLinejoin="round"
    />
    <path d="M48 26 H73 V47 H36 Z" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
    <path d="M82 26 H103 L116 47 H82 Z" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
    <rect x="136" y="55" width="14" height="10" rx="4" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
    <circle cx="44" cy="82" r="14" fill="#334155" stroke={CHARCOAL} strokeWidth={4} />
    <circle cx="44" cy="82" r="6" fill={WHITE} />
    <circle cx="118" cy="82" r="14" fill="#334155" stroke={CHARCOAL} strokeWidth={4} />
    <circle cx="118" cy="82" r="6" fill={WHITE} />
  </svg>
);

const FinishFlagSvg = ({ size = 76 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 90 90" fill="none">
    <line x1="20" y1="14" x2="20" y2="78" stroke={CHARCOAL} strokeWidth={6} strokeLinecap="round" />
    <rect x="23" y="16" width="52" height="34" rx="5" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
    <rect x="23" y="16" width="17" height="17" fill={CHARCOAL} />
    <rect x="57" y="16" width="18" height="17" fill={CHARCOAL} />
    <rect x="40" y="33" width="17" height="17" fill={CHARCOAL} />
    <circle cx="20" cy="13" r="5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.6} />
  </svg>
);

const MazeRoadBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 520 280" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="520" height="280" fill="#86EFAC" />
    {/* Decorative grass tufts */}
    <circle cx="52" cy="54" r="16" fill="#4ADE80" />
    <circle cx="458" cy="232" r="18" fill="#4ADE80" />
    <circle cx="310" cy="236" r="14" fill="#4ADE80" />
    {/* Winding gray maze road */}
    <path
      d="M 55 210 H 245 V 125 H 350 V 58 H 460"
      fill="none"
      stroke={CHARCOAL}
      strokeWidth={74}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 55 210 H 245 V 125 H 350 V 58 H 460"
      fill="none"
      stroke="#94A3B8"
      strokeWidth={66}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 55 210 H 245 V 125 H 350 V 58 H 460"
      fill="none"
      stroke={SUNNY_SOFT}
      strokeWidth={5}
      strokeDasharray="16 14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SteeringBtnSvg = ({
  dir,
  size = 56,
}: {
  dir: 'right' | 'up' | 'down';
  size?: number;
}) => {
  const fill = dir === 'right' ? ORANGE : dir === 'up' ? SKY : TEAL;
  const rot = dir === 'right' ? 0 : dir === 'up' ? -90 : 90;
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" fill="none">
      <circle cx="45" cy="45" r="39" fill={fill} stroke={CHARCOAL} strokeWidth={4.5} />
      <circle cx="45" cy="45" r="31" fill="none" stroke={WHITE} strokeWidth={2.4} opacity={0.45} />
      <g transform={`rotate(${rot} 45 45)`}>
        <path d="M25 39 H48 V27 L67 45 L48 63 V51 H25 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
      </g>
    </svg>
  );
};

const TicCatSvg = ({ size = 128, waving = false }: { size?: number; waving?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <ellipse cx="70" cy="126" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path d="M96 98 C118 96, 126 76, 114 66 C106 60, 100 68, 104 75 C106 80, 100 88, 92 88" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
    <ellipse cx="56" cy="118" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="118" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="70" cy="95" rx="27" ry="24" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="70" cy="97" rx="16" ry="15" fill={SUNNY_SOFT} />
    <path d={waving ? 'M44 82 C26 74, 22 58, 30 52 C37 47, 45 58, 46 72' : 'M45 86 C32 90, 32 104, 42 104 C48 104, 50 96, 48 88'} fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <path d="M94 86 C107 90, 107 104, 97 104 C91 104, 89 96, 91 88" fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <path d="M38 50 L36 18 L60 36 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    <path d="M102 50 L104 18 L80 36 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    <ellipse cx="70" cy="57" rx="34" ry="29" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="70" cy="66" rx="22" ry="15" fill={WHITE} />
    <circle cx="57" cy="53" r="5" fill={CHARCOAL} />
    <circle cx="83" cy="53" r="5" fill={CHARCOAL} />
    <circle cx="58.5" cy="51.2" r="1.8" fill={WHITE} />
    <circle cx="84.5" cy="51.2" r="1.8" fill={WHITE} />
    <polygon points="66,60 74,60 70,65" fill={CORAL} />
    <path d="M62 67 Q70 74 78 67" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" fill="none" />
  </svg>
);

type EnvColor = 'orange' | 'blue' | 'green';

const ENV_HEX: Record<EnvColor, string> = {
  orange: ORANGE,
  blue: SKY,
  green: TEAL,
};

type MazeBlockKind =
  | 'start-bump'
  | 'recv-msg'
  | 'move-right'
  | 'move-up'
  | 'move-down'
  | 'shrink'
  | 'sound-pop'
  | 'say-win';

const ScratchJrBlock = ({
  kind,
  envColor = 'orange',
  num = 1,
  scale = 1,
  activeGlow = false,
}: {
  kind: MazeBlockKind;
  envColor?: EnvColor;
  num?: number;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-bump' || kind === 'recv-msg';
  const fill = isTrigger
    ? SUNNY
    : kind === 'move-right' || kind === 'move-up' || kind === 'move-down'
      ? SKY
      : kind === 'shrink' || kind === 'say-win'
        ? LAVENDER
        : TEAL;

  const w = Math.round(134 * scale);
  const h = Math.round(118 * scale);

  const pathData = isTrigger
    ? 'M30 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H24 C14 106 8 98 8 88 V38 C8 25 18 16 30 16 Z'
    : 'M14 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H14 V74 C24 74 24 48 14 48 V16 Z';

  const hasNumber = kind === 'move-right' || kind === 'move-up' || kind === 'move-down';

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter: activeGlow ? 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.95))' : undefined,
        transform: activeGlow ? 'scale(1.07)' : 'scale(1)',
        transition: 'transform 180ms ease, filter 180ms ease',
      }}
    >
      <svg width={w} height={h} viewBox="0 0 140 120">
        <path d={pathData} fill={fill} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />

        {kind === 'start-bump' && (
          <>
            <circle cx="48" cy="43" r="10" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} />
            <path d="M31 82 C31 61, 65 61, 65 82 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <circle cx="86" cy="43" r="10" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={2.8} />
            <path d="M69 82 C69 61, 103 61, 103 82 Z" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <polygon points="67,54 73,63 61,63" fill={CORAL} />
          </>
        )}

        {kind === 'recv-msg' && (
          <>
            <path d="M32 50 L68 25 L104 50 V88 H32 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
            <rect x="46" y="38" width="44" height="28" rx="4" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={2.5} />
            <path d="M32 50 L68 72 L104 50 V88 H32 Z" fill={ENV_HEX[envColor]} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
          </>
        )}

        {kind === 'move-right' && (
          <path d="M36 52 H72 V37 L102 60 L72 83 V68 H36 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {kind === 'move-up' && (
          <path d="M62 88 V52 H47 L69 22 L91 52 H76 V88 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {kind === 'move-down' && (
          <path d="M62 32 V68 H47 L69 98 L91 68 H76 V32 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {kind === 'shrink' && (
          <>
            <circle cx="69" cy="60" r="15" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
            <path d="M32 60 H48 M42 54 L49 60 L42 66" fill="none" stroke={SUNNY_SOFT} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M106 60 H90 M96 54 L89 60 L96 66" fill="none" stroke={SUNNY_SOFT} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}

        {kind === 'sound-pop' && (
          <>
            <path d="M32 52 H46 L66 35 V83 L46 66 H32 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <path d="M74 46 Q83 59 74 72" fill="none" stroke={SUNNY} strokeWidth={4.5} strokeLinecap="round" />
            <path d="M84 37 Q98 59 84 81" fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
          </>
        )}

        {kind === 'say-win' && (
          <>
            <rect x="28" y="34" width="80" height="44" rx="16" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} />
            <polygon points="48,77 42,91 62,77" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <circle cx="52" cy="56" r="4.2" fill={CHARCOAL} />
            <circle cx="68" cy="56" r="4.2" fill={CHARCOAL} />
            <circle cx="84" cy="56" r="4.2" fill={CHARCOAL} />
          </>
        )}
      </svg>

      {hasNumber && (
        <div
          style={{
            marginTop: Math.round(-16 * scale),
            minWidth: Math.round(42 * scale),
            height: Math.round(28 * scale),
            borderRadius: Math.round(9 * scale),
            background: WHITE,
            border: `2.6px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(17 * scale),
            fontWeight: 700,
            ...centerCol,
            padding: '0 6px',
            zIndex: 2,
          }}
        >
          {num}
        </div>
      )}
    </div>
  );
};

/** Authentic ScratchJr Playable Maze Game UI */
const AuthenticScratchJrMazeUI = ({
  carX,
  carY,
  onSteer,
  onReset,
  selectedTab = 'car',
  onSelectTab,
  width = 880,
  height = 540,
}: {
  carX: number; // 0..100 %
  carY: number; // 0..100 %
  onSteer: (dir: 'right' | 'up' | 'down') => void;
  onReset: () => void;
  selectedTab?: 'car' | 'finish';
  onSelectTab?: (t: 'car' | 'finish') => void;
  width?: number | string;
  height?: number | string;
}) => {
  const reachedFinish = carX >= 74 && carY <= 25;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 24,
        background: '#CBD5E1',
        border: `3.5px solid ${CHARCOAL}`,
        boxShadow: `0 8px 0 ${CHARCOAL}`,
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        boxSizing: 'border-box',
      }}
    >
      {/* Top Toolbar */}
      <div
        style={{
          height: 48,
          borderRadius: 14,
          background: '#DBEAFE',
          border: `2.5px solid ${CHARCOAL}`,
          padding: '0 12px',
          ...row,
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ ...row, gap: 8 }}>
          <div style={{ width: 38, height: 34, borderRadius: 10, background: '#93C5FD', border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="house" size={22} />
          </div>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 16, fontWeight: 700, color: '#1E3A8A' }}>
            ScratchJr
          </span>
        </div>

        <div style={{ ...row, gap: 7 }}>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: SUNNY_SOFT, border: `2.5px solid ${SUNNY}`, ...centerCol }}>
            <JuniorIcon name="fullscreen" size={22} />
          </div>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="grid" size={22} />
          </div>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="landscape" size={22} />
          </div>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="abc" size={22} />
          </div>
          <button
            type="button"
            onClick={onReset}
            className="cpj30-card-btn"
            title="Reset Mobil"
            style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol, padding: 0 }}
          >
            <JuniorIcon name="reset" size={22} />
          </button>
          <div style={{ width: 46, height: 36, borderRadius: 10, background: TEAL_SOFT, border: `2px solid ${TEAL}`, ...centerCol }}>
            <JuniorIcon name="flag" size={24} />
          </div>
        </div>

        <div style={{ padding: '4px 12px', borderRadius: 10, background: reachedFinish ? TEAL : SUNNY, color: reachedFinish ? WHITE : CHARCOAL, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 13, fontWeight: 700 }}>
          {reachedFinish ? 'MENANG!' : 'Cari Finish'}
        </div>
      </div>

      {/* Middle 3-Column Row */}
      <div style={{ flex: 1, display: 'flex', gap: 10, minHeight: 0 }}>
        {/* Left Characters Sidebar */}
        <div style={{ width: 96, borderRadius: 16, background: '#E2E8F0', border: `2.5px solid ${CHARCOAL}`, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            onClick={() => onSelectTab?.('car')}
            className="cpj30-card-btn"
            style={{
              width: '100%',
              height: 52,
              borderRadius: 12,
              background: WHITE,
              border: `${selectedTab === 'car' ? 3 : 2}px solid ${selectedTab === 'car' ? SUNNY : CHARCOAL}`,
              ...centerCol,
              padding: 0,
            }}
          >
            <RedCarSvg width={60} />
          </button>
          <button
            type="button"
            onClick={() => onSelectTab?.('finish')}
            className="cpj30-card-btn"
            style={{
              width: '100%',
              height: 52,
              borderRadius: 12,
              background: WHITE,
              border: `${selectedTab === 'finish' ? 3 : 2}px solid ${selectedTab === 'finish' ? SUNNY : CHARCOAL}`,
              ...centerCol,
              padding: 0,
            }}
          >
            <FinishFlagSvg size={42} />
          </button>
          <div style={{ marginTop: 'auto', opacity: 0.85 }}>
            <JuniorIcon name="plus-circle" size={26} />
          </div>
        </div>

        {/* Center Maze Road Stage with 3 Clickable Steering Buttons */}
        <div style={{ flex: 1, borderRadius: 18, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
          <MazeRoadBackdropSvg />

          {/* Finish Flag at top-right */}
          <div style={{ position: 'absolute', right: '6%', top: '8%', zIndex: 2 }}>
            <FinishFlagSvg size={70} />
          </div>

          {reachedFinish && (
            <div style={{ position: 'absolute', right: '14%', top: '3%', padding: '5px 14px', borderRadius: 16, background: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: TEAL, zIndex: 5 }}>
              Menang!
            </div>
          )}

          {/* Mini Red Car */}
          <div
            style={{
              position: 'absolute',
              left: `${carX}%`,
              top: `${carY}%`,
              transition: 'left 260ms ease, top 260ms ease',
              zIndex: 4,
            }}
          >
            <RedCarSvg width={66} />
          </div>

          {/* 3 Clickable Steering Buttons at bottom-left */}
          <div style={{ position: 'absolute', left: '3%', bottom: '4%', ...row, gap: 6, zIndex: 5 }}>
            <button type="button" onClick={() => onSteer('right')} className="cpj30-card-btn" title="Kanan" style={{ background: 'transparent', border: 'none', padding: 0 }}>
              <SteeringBtnSvg dir="right" size={44} />
            </button>
            <button type="button" onClick={() => onSteer('up')} className="cpj30-card-btn" title="Atas" style={{ background: 'transparent', border: 'none', padding: 0 }}>
              <SteeringBtnSvg dir="up" size={44} />
            </button>
            <button type="button" onClick={() => onSteer('down')} className="cpj30-card-btn" title="Bawah" style={{ background: 'transparent', border: 'none', padding: 0 }}>
              <SteeringBtnSvg dir="down" size={44} />
            </button>
          </div>
        </div>

        {/* Right Page Thumbnail */}
        <div style={{ width: 90, borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: '100%', height: 58, borderRadius: 12, border: `2.5px solid ${SUNNY}`, overflow: 'hidden', position: 'relative' }}>
            <MazeRoadBackdropSvg />
            <span style={{ position: 'absolute', right: 3, top: 3, width: 20, height: 20, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 12, fontWeight: 700, ...centerCol }}>
              1
            </span>
          </div>
          <JuniorIcon name="plus-circle" size={26} />
        </div>
      </div>

      {/* Bottom Coding Area */}
      <div
        style={{
          height: 132,
          borderRadius: 16,
          background: WHITE,
          backgroundImage: 'radial-gradient(#CBD5E1 1.4px, transparent 1.4px)',
          backgroundSize: '18px 18px',
          border: `2.5px solid ${CHARCOAL}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div style={{ height: 34, background: '#E0F2FE', borderBottom: `2px solid ${CHARCOAL}`, padding: '0 12px', ...row, justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 8 }}>
            {(['dot-yellow', 'dot-blue', 'dot-purple', 'dot-green', 'dot-orange', 'dot-red'] as JuniorIconName[]).map((d) => (
              <JuniorIcon key={d} name={d} size={20} />
            ))}
          </div>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 13, fontWeight: 700, color: MUTED }}>
            {selectedTab === 'car' ? 'Kode Mobil: 3 Amplop Arah' : 'Kode Bendera Finish: Tabrakan -> Menang!'}
          </span>
        </div>

        <div style={{ flex: 1, padding: '6px 12px', ...row, justifyContent: 'space-around', alignItems: 'flex-start', overflow: 'hidden' }}>
          {selectedTab === 'car' ? (
            <>
              <div style={{ ...row, alignItems: 'flex-start' }}>
                <ScratchJrBlock kind="recv-msg" envColor="orange" scale={0.56} />
                <div style={{ marginLeft: -8 }}>
                  <ScratchJrBlock kind="move-right" num={1} scale={0.56} />
                </div>
              </div>
              <div style={{ ...row, alignItems: 'flex-start' }}>
                <ScratchJrBlock kind="recv-msg" envColor="blue" scale={0.56} />
                <div style={{ marginLeft: -8 }}>
                  <ScratchJrBlock kind="move-up" num={1} scale={0.56} />
                </div>
              </div>
              <div style={{ ...row, alignItems: 'flex-start' }}>
                <ScratchJrBlock kind="recv-msg" envColor="green" scale={0.56} />
                <div style={{ marginLeft: -8 }}>
                  <ScratchJrBlock kind="move-down" num={1} scale={0.56} />
                </div>
              </div>
            </>
          ) : (
            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-bump" scale={0.68} activeGlow={reachedFinish} />
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind="sound-pop" scale={0.68} activeGlow={reachedFinish} />
              </div>
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind="say-win" scale={0.68} activeGlow={reachedFinish} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Cover)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  const [carPos, setCarPos] = useState({ x: 8, y: 67 });

  const handleSteer = (dir: 'right' | 'up' | 'down') => {
    setCarPos((prev) => {
      const next = {
        x: dir === 'right' ? Math.min(78, prev.x + 17) : prev.x,
        y: dir === 'up' ? Math.max(14, prev.y - 18) : dir === 'down' ? Math.min(68, prev.y + 18) : prev.y,
      };
      const won = next.x >= 74 && next.y <= 25;
      playMazeChime(won);
      return next;
    });
  };

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 30" accentDot={TEAL}>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 210, 860, 700), display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            alignSelf: 'flex-start',
            padding: '10px 22px',
            borderRadius: 999,
            background: TEAL_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#047857',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="flag" size={24} />
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          Tantangan <Highlight>Labirin</Highlight>
          <br />
          <Highlight color="#D1FAE5">Jalan Raya!</Highlight>
        </h1>

        <p
          style={{
            margin: '28px 0 36px',
            fontSize: 31,
            fontWeight: 700,
            lineHeight: 1.38,
            color: MUTED,
            maxWidth: 790,
          }}
        >
          Mengemudikan Mobil Melewati Jalur Berliku ke Garis Finish!
        </p>

        {/* Quick Pill Highlights */}
        <div style={{ ...row, gap: 18 }}>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: TEAL,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="road" size={28} />
            <span>3 Tombol Kemudi</span>
          </div>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: SUNNY,
              color: CHARCOAL,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="flag" size={28} />
            <span>Capai Finish!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Playable Authentic ScratchJr Maze UI + Biko */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #ECFDF5 0%, #EFF6FF 55%, #FEF9C3 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${TEAL}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 140, zIndex: 2 }}>
          <AuthenticScratchJrMazeUI
            carX={carPos.x}
            carY={carPos.y}
            onSteer={handleSteer}
            onReset={() => setCarPos({ x: 8, y: 67 })}
            width={590}
            height={425}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: -18,
            bottom: 30,
            zIndex: 3,
            animation: live ? 'cpj30-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="flag" size={24} />}
            speechBubble={carPos.x >= 74 && carPos.y <= 25 ? 'Menang!' : 'Ayo kemudi!'}
          />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi Besar)
// ============================================================================
const Slide02Misi: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
      <SlideTitle>
        Apa Misi Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Tantangan Labirin • Pertemuan 30"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu 1 (Biru) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${SKY}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ width: 270, height: 195, borderRadius: 24, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, overflow: 'hidden', position: 'relative' }}>
              <MazeRoadBackdropSvg />
              <div style={{ position: 'absolute', left: 16, bottom: 18 }}>
                <RedCarSvg width={72} />
              </div>
              <div style={{ position: 'absolute', right: 14, top: 14 }}>
                <FinishFlagSvg size={58} />
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Buat <span style={{ color: '#1D4ED8' }}>Peta Labirin</span> &amp; <span style={{ color: '#1D4ED8' }}>Garis Finish</span>
            </div>
          </div>

          {/* Kartu 2 (Hijau) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: TEAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${TEAL}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ width: 270, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 12 }}>
              <SteeringBtnSvg dir="right" size={70} />
              <SteeringBtnSvg dir="up" size={70} />
              <SteeringBtnSvg dir="down" size={70} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Kemudikan Mobil Pakai <span style={{ color: '#047857' }}>Tombol Buatanmu!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj30-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="road" size={24} />}
          speechBubble="Seru banget!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Langkah #1: Gambar Jalur Labirin & Garis Finish!
// ============================================================================
const Slide03GambarLabirin: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="PERSIAPAN LABIRIN" accentDot={TEAL}>
      <SlideTitle>
        Gambar <Highlight>Jalur Berliku</Highlight> &amp; <Highlight color="#D1FAE5">Finish!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Paint Editor Background Canvas */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="Paint Editor Latar — Peta Jalan Berliku"
        padding={28}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ flex: 1, display: 'flex', gap: 20 }}>
            <div style={{ width: 98, borderRadius: 20, background: CREAM, border: `3px solid ${CHARCOAL}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', padding: '12px 0' }}>
              <div style={{ width: 66, height: 66, borderRadius: 16, background: SUNNY, border: `3.5px solid ${CHARCOAL}`, ...centerCol, animation: live ? 'cpj30-pulse 1.8s infinite' : undefined }}>
                <JuniorIcon name="pencil" size={32} />
              </div>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, ...centerCol }}>
                <JuniorIcon name="paint-bucket" size={30} />
              </div>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, ...centerCol }}>
                <JuniorIcon name="shapes-circle" size={30} />
              </div>
            </div>

            <div style={{ flex: 1, borderRadius: 24, border: `3.5px solid ${CHARCOAL}`, overflow: 'hidden', position: 'relative' }}>
              <MazeRoadBackdropSvg />
              <div style={{ position: 'absolute', left: 26, bottom: 26, padding: '6px 14px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
                START
              </div>
              <div style={{ position: 'absolute', right: 24, top: 20 }}>
                <FinishFlagSvg size={88} />
              </div>
            </div>
          </div>

          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700, color: '#047857' }}>
              Titik Awal di Kiri -&gt; Garis Finish di Kanan Atas!
            </span>
            <BikoMascot pose="point-left" width={140} badgeIcon={<JuniorIcon name="flag" size={18} />} speechBubble="Jalan lebar!" />
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={980}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Langkah Membuat Peta Labirin"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="road" bgColor={SUNNY_SOFT} fontSize={32}>
              Buka <strong>Paint Editor</strong> latar &amp; gambar <strong>Jalan Berliku</strong> lebar
            </BulletRow>
            <BulletRow icon="flag" bgColor={TEAL_SOFT} fontSize={32}>
              Tambah karakter <strong>Bendera Finish</strong> di ujung jalan!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Buat garis jalannya pakai kuas paling tebal supaya mobil mudah berbelok di dalam jalur abu-abu!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Rahasia Game Labirin: Kecilkan Mobilmu!
// ============================================================================
const Slide04KecilkanMobil: Page = () => {
  return (
    <JuniorFrame badge="RAHASIA PEMBUAT GAME" accentDot={LAVENDER}>
      <SlideTitle>
        <Highlight>Kecilkan Mobil</Highlight> Biar Muat di Jalan!
      </SlideTitle>

      {/* Left Spotlight Card: Size Comparison + Shrink Block */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Mengatur Ukuran Mobil dengan Blok Ungu"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '100%', height: 340, borderRadius: 24, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <MazeRoadBackdropSvg />
            <div style={{ position: 'absolute', left: '16%', bottom: '18%' }}>
              <RedCarSvg width={86} />
            </div>
            <div style={{ position: 'absolute', right: 20, bottom: 20, padding: '8px 18px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700, ...row, gap: 8 }}>
              <JuniorIcon name="check" size={22} />
              <span>Pas di Jalur!</span>
            </div>
          </div>

          <div style={{ ...row, gap: 28, alignItems: 'center' }}>
            <div style={{ opacity: 0.45, ...centerCol }}>
              <RedCarSvg width={155} />
              <span style={{ fontSize: 18, fontWeight: 800, color: CORAL }}>Terlalu Besar</span>
            </div>
            <JuniorIcon name="arrow-right" size={44} />
            <ScratchJrBlock kind="shrink" scale={1.3} activeGlow />
            <JuniorIcon name="arrow-right" size={44} />
            <div style={{ ...centerCol }}>
              <RedCarSvg width={82} />
              <span style={{ fontSize: 18, fontWeight: 800, color: TEAL }}>Mungil &amp; Pas!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={980}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Cara Mengecilkan Karakter"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="dot-purple" bgColor={LAVENDER_SOFT} fontSize={32}>
              Klik blok ungu <strong>Mengecil</strong> (<em>Shrink</em>) beberapa kali
            </BulletRow>
            <BulletRow icon="car-red" bgColor={CORAL_SOFT} fontSize={32}>
              Mobil jadi <strong>Mungil &amp; Pas</strong> melewati tikungan!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="shrink" size={42} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Cukup tap langsung blok <strong>Mengecil</strong> di palet ungu 2–3 kali sampai ukuran mobilmu pas di jalan!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Langkah #2: Siapkan 3 Tombol Kemudi!
// ============================================================================
const Slide05TigaTombol: Page = () => {
  return (
    <JuniorFrame badge="TOMBOL KEMUDI LAYAR" accentDot={ORANGE}>
      <SlideTitle>
        Pasang <Highlight>3 Tombol Arah!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1720}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Setiap Tombol Punya Warna Amplop Berbeda!"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 28 }}>
            {[
              {
                title: 'TOMBOL 1 • KANAN',
                dir: 'right' as const,
                bg: ORANGE_SOFT,
                border: ORANGE,
                badge: ORANGE,
                envText: 'Kirim Amplop Oranye',
                envColor: 'orange' as const,
              },
              {
                title: 'TOMBOL 2 • ATAS',
                dir: 'up' as const,
                bg: SKY_SOFT,
                border: SKY,
                badge: SKY,
                envText: 'Kirim Amplop Biru',
                envColor: 'blue' as const,
              },
              {
                title: 'TOMBOL 3 • BAWAH',
                dir: 'down' as const,
                bg: TEAL_SOFT,
                border: TEAL,
                badge: TEAL,
                envText: 'Kirim Amplop Hijau',
                envColor: 'green' as const,
              },
            ].map((btn) => (
              <div
                key={btn.title}
                style={{
                  flex: 1,
                  borderRadius: 24,
                  background: btn.bg,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: `0 7px 0 ${btn.border}`,
                  padding: '26px 24px',
                  ...centerCol,
                  gap: 18,
                  textAlign: 'center',
                }}
              >
                <div style={{ padding: '7px 20px', borderRadius: 99, background: btn.badge, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                  {btn.title}
                </div>
                <div style={{ ...row, gap: 16, alignItems: 'center' }}>
                  <SteeringBtnSvg dir={btn.dir} size={104} />
                  <JuniorIcon name="arrow-right" size={38} />
                  <ScratchJrBlock kind="recv-msg" envColor={btn.envColor} scale={0.95} />
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 29, fontWeight: 700, color: CHARCOAL }}>
                  {btn.envText}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '20px 32px', borderRadius: 22, background: WHITE, border: `3px solid ${CHARCOAL}`, ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 14 }}>
              <SteeringBtnSvg dir="right" size={58} />
              <SteeringBtnSvg dir="up" size={58} />
              <SteeringBtnSvg dir="down" size={58} />
            </div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
              Taruh 3 tombol berjejer rapi di pojok kiri bawah panggung biar gampang diklik!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Tekan Tombol Mana?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1620} top={118} size={46}>
        Jalan Berbelok ke <Highlight color="#DBEAFE">Atas!</Highlight> Tombol Mana yang Harus Ditekan?
      </SlideTitle>

      {/* Top Visual Map Strip */}
      <div
        style={{
          ...abs(260, 200, 1400, 128),
          borderRadius: 26,
          background: WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 6px 0 ${CHARCOAL}`,
          padding: '0 34px',
          ...row,
          justifyContent: 'space-around',
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <RedCarSvg width={96} />
          <div style={{ padding: '8px 18px', borderRadius: 16, background: SKY_SOFT, border: `2.5px solid ${SKY}`, fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
            Belokan ke Atas!
          </div>
        </div>
        <JuniorIcon name="arrow-up" size={56} />
        <FinishFlagSvg size={82} />
      </div>

      {/* Interactive Choice Cards */}
      <div style={{ ...abs(190, 355, 1540, 395), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Tombol Atas) */}
        <button
          type="button"
          onClick={() => {
            playMazeChime(false);
            setPicked('A');
          }}
          className="cpj30-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'A' ? TEAL_SOFT : WHITE,
            border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'A' ? TEAL : CHARCOAL}`,
            padding: 28,
            ...centerCol,
            gap: 14,
            position: 'relative',
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN A
          </div>

          <div style={{ marginTop: 12 }}>
            <SteeringBtnSvg dir="up" size={145} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Tombol Atas
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Tekan Tombol Atas untuk belok ke jalan atas!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Tombol Kanan) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj30-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'B' ? CORAL_SOFT : WHITE,
            border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'B' ? CORAL : CHARCOAL}`,
            padding: 28,
            ...centerCol,
            gap: 14,
            position: 'relative',
            animation: picked === 'B' ? 'cpj30-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 12 }}>
            <SteeringBtnSvg dir="right" size={145} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Tombol Kanan
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Kalau belok kanan nanti mobil keluar jalur!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 765, 1540, 235), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj30-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={205}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Belok tepat!' : 'Ayo tebak!'}
          />
        </div>
        <div style={{ padding: '20px 34px', borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...row, gap: 18 }}>
          <div style={{ width: 62, height: 62, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="question" size={34} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, color: CHARCOAL }}>
            Tunjuk tombol yang benar di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Resep Kode: Mobil & Bendera Finish!
// ============================================================================
const Slide07ResepKode: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="RESEP GAME LABIRIN" accentDot={SUNNY}>
      <SlideTitle>
        Rangkai <Highlight>Kode Mobil &amp; Finish!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Resep Kode di Mobil & Kode di Bendera Finish"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26 }}>
          {/* Kartu Atas — Kode Mobil */}
          <div
            style={{
              flex: 1.1,
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${SKY}`,
              padding: '20px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <RedCarSvg width={74} />
              <div style={{ padding: '6px 20px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                KODE MOBIL (3 AMPLOP ARAH)
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
              <div style={{ ...row, alignItems: 'flex-start' }}>
                <ScratchJrBlock kind="recv-msg" envColor="orange" scale={0.95} />
                <div style={{ marginLeft: -12 }}>
                  <ScratchJrBlock kind="move-right" num={1} scale={0.95} />
                </div>
              </div>
              <div style={{ ...row, alignItems: 'flex-start' }}>
                <ScratchJrBlock kind="recv-msg" envColor="blue" scale={0.95} />
                <div style={{ marginLeft: -12 }}>
                  <ScratchJrBlock kind="move-up" num={1} scale={0.95} />
                </div>
              </div>
              <div style={{ ...row, alignItems: 'flex-start' }}>
                <ScratchJrBlock kind="recv-msg" envColor="green" scale={0.95} />
                <div style={{ marginLeft: -12 }}>
                  <ScratchJrBlock kind="move-down" num={1} scale={0.95} />
                </div>
              </div>
            </div>
          </div>

          {/* Kartu Bawah — Kode Bendera Finish */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: TEAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${TEAL}`,
              padding: '20px 26px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 18 }}>
              <FinishFlagSvg size={94} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ alignSelf: 'flex-start', padding: '6px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                  KODE BENDERA FINISH
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 27, fontWeight: 700, color: CHARCOAL }}>
                  Tabrakan -&gt; Bunyi &ldquo;Pop!&rdquo; -&gt; Say &ldquo;Menang!&rdquo;
                </div>
              </div>
            </div>

            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-bump" scale={1.08} activeGlow />
              <div style={{ marginLeft: -14 }}>
                <ScratchJrBlock kind="sound-pop" scale={1.08} />
              </div>
              <div style={{ marginLeft: -14 }}>
                <ScratchJrBlock kind="say-win" scale={1.08} />
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1475, 345, 360, 560),
          ...centerCol,
          animation: live ? 'cpj30-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={335}
          badgeIcon={<JuniorIcon name="flag" size={22} />}
          speechBubble="Menang!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Game Labirin (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsLabirin: Page = () => {
  return (
    <JuniorFrame badge="TIPS GAME LABIRIN" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Game Labirinmu <Highlight>Seru Dimainkan!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & SERU"
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
            <BulletRow icon="road" bgColor={TEAL_SOFT} fontSize={30}>
              Gambar jalan yang <strong>Cukup Lebar</strong>
            </BulletRow>
            <BulletRow icon="palette" bgColor={SUNNY_SOFT} fontSize={30}>
              Pakai <strong>Warna Amplop Berbeda</strong> untuk tiap tombol arah
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, border: `3.5px solid ${TEAL}`, position: 'relative', overflow: 'hidden' }}>
            <MazeRoadBackdropSvg />
            <div style={{ position: 'absolute', left: '22%', bottom: '18%' }}>
              <RedCarSvg width={78} />
            </div>
            <div style={{ position: 'absolute', right: 20, bottom: 20 }}>
              <JuniorIcon name="check" size={56} />
            </div>
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
            <BulletRow icon="see-no-evil" bgColor={CORAL_SOFT} fontSize={30}>
              Memakai <strong>Warna Amplop Sama</strong> untuk semua arah
            </BulletRow>
            <BulletRow icon="car-red" bgColor={SUNNY_SOFT} fontSize={30}>
              Membiarkan mobil <strong>Terlalu Besar</strong> menutup jalan
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, border: `3.5px solid ${CORAL}`, position: 'relative', overflow: 'hidden' }}>
            <MazeRoadBackdropSvg />
            <div style={{ position: 'absolute', left: '18%', bottom: '10%' }}>
              <RedCarSvg width={190} />
            </div>
            <div style={{ position: 'absolute', right: 20, bottom: 20 }}>
              <JuniorIcon name="cross" size={62} />
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Taklukkan Labirin Jalan Raya!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [carPos, setCarPos] = useState({ x: 8, y: 67 });
  const [tab, setTab] = useState<'car' | 'finish'>('car');

  const handleSteer = (dir: 'right' | 'up' | 'down') => {
    setCarPos((prev) => {
      const next = {
        x: dir === 'right' ? Math.min(78, prev.x + 17) : prev.x,
        y: dir === 'up' ? Math.max(14, prev.y - 18) : dir === 'down' ? Math.min(68, prev.y + 18) : prev.y,
      };
      const won = next.x >= 74 && next.y <= 25;
      playMazeChime(won);
      return next;
    });
  };

  const reachedFinish = carPos.x >= 74 && carPos.y <= 25;

  return (
    <JuniorFrame badge="AYO BUAT & MAIN!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Tantangan Labirin!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'road' as JuniorIconName,
            text: (
              <>
                Gambar <strong>Jalan Berliku</strong>, kecilkan <strong>Mobil</strong>, &amp; pasang <strong>Finish</strong>
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'mail-send' as JuniorIconName,
            text: (
              <>
                Pasang <strong>3 Tombol Kemudi</strong> &amp; kode penerima di Mobil
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'fullscreen' as JuniorIconName,
            text: (
              <>
                Klik <strong>Layar Penuh</strong> &amp; kemudikan mobil ke <strong>Garis Finish!</strong>
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
            <div style={{ fontSize: 23, fontWeight: 800, lineHeight: 1.24 }}>
              <JuniorIcon name={item.icon} size={26} style={{ marginRight: 8 }} />
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Playable Authentic ScratchJr Maze Workspace */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratchJrMazeUI
          carX={carPos.x}
          carY={carPos.y}
          onSteer={handleSteer}
          onReset={() => setCarPos({ x: 8, y: 67 })}
          selectedTab={tab}
          onSelectTab={setTab}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Reset Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 18 }}>
        <div style={{ animation: live ? 'cpj30-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={345}
            badgeIcon={<JuniorIcon name="flag" size={24} />}
            speechBubble={reachedFinish ? 'Hore Menang!' : 'Tekan panah!'}
          />
        </div>
        <button
          type="button"
          onClick={() => setCarPos({ x: 8, y: 67 })}
          className="cpj30-card-btn"
          style={{
            padding: '14px 26px',
            borderRadius: 20,
            background: SKY,
            color: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 25,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          <JuniorIcon name="reset" size={26} />
          <span>Ulang dari Start</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 30 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj30-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj30-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="trophy" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj30-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={56}>
        Hore! Kamu <Highlight>Pembuat Game Labirin Hebat!</Highlight>{' '}
        <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 30"
        padding={36}
      >
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          {/* Bespoke Golden Trophy + Maze Path & Checkered Finish Medal SVG */}
          <div style={{ animation: live ? 'cpj30-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={TEAL_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Winding star maze path inside medal */}
              <path d="M74 140 H118 V108 H148 V78" fill="none" stroke={CHARCOAL} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M74 140 H118 V108 H148 V78" fill="none" stroke={SUNNY} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              {/* Checkered Finish Flag */}
              <rect x="136" y="54" width="32" height="22" rx="4" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} />
              <rect x="136" y="54" width="11" height="11" fill={CHARCOAL} />
              <rect x="157" y="54" width="11" height="11" fill={CHARCOAL} />
              <rect x="147" y="65" width="10" height="11" fill={CHARCOAL} />
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
            <span>Lencana Master Game Labirin</span>
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
            Kamu sudah jago menggabungkan{' '}
            <Highlight color="#D1FAE5">Tombol Kemudi, Amplop Pesan, &amp; Tabrakan!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="trophy" size={22} />}
            speechBubble="Juara Labirin!"
          />
          <div style={{ animation: live ? 'cpj30-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <TicCatSvg size={185} waving />
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
  `Selamat datang di Pertemuan 30 — Tantangan Labirin Jalan Raya! 🚗🏁
Hari ini kita menggabungkan semua jurus sebelumnya menjadi game labirin lengkap dengan 3 tombol kemudi!`,

  `Dua misi seru hari ini:
1. Membuat Peta Labirin jalan berliku & karakter Garis Finish.
2. Mengemudikan Mobil pakai 3 Tombol Kemudi buatanmu sendiri!`,

  `Langkah #1 — Gambar Jalur Labirin & Garis Finish:
Buka Paint Editor latar, gambar jalan berliku lebar dengan titik Start di kiri bawah, lalu tambahkan karakter Bendera Finish di ujung kanan atas!`,

  `Rahasia Pembuat Game Labirin: Kecilkan Mobilmu!
Gunakan blok ungu Mengecil (Shrink) 2–3 kali sampai Mobil Merah mungil dan muat melewati tikungan jalan tanpa keluar jalur!`,

  `Langkah #2 — Pasang 3 Tombol Kemudi di pojok kiri bawah:
1. Tombol Kanan -> Kirim Amplop Oranye
2. Tombol Atas -> Kirim Amplop Biru
3. Tombol Bawah -> Kirim Amplop Hijau`,

  `Permainan Cepat! Ayo tebak bersama:
Jika jalan di depan Mobil berbelok ke ATAS, tombol mana yang harus ditekan — Pilihan A (Tombol Atas) atau Pilihan B (Tombol Kanan)?`,

  `Resep Game Labirin:
Di karakter Mobil: pasang 3 amplop penerima (Oranye -> Maju 1, Biru -> Naik 1, Hijau -> Turun 1).
Di Bendera Finish: pasang Start on Bump -> Bunyi "Pop!" -> Say "Menang!"`,

  `Tips Jagoan Game Labirin:
BOLEH gambar jalan cukup lebar & pakai warna amplop berbeda untuk tiap arah.
JANGAN pakai warna amplop yang sama untuk semua tombol, atau biarkan mobil terlalu besar menutup jalan!`,

  `Waktunya Misi Praktik Tantangan Labirin!
Ajak siswa mencoba menekan tombol panah Oranye (Kanan) dan Biru (Atas) langsung di panggung slide untuk mengantar Mobil ke Garis Finish!`,

  `Hebat sekali! Kalian sudah menyelesaikan Pertemuan 30 dan meraih Lencana Master Game Labirin! 🎉🏅`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 30 — Tantangan Labirin Jalan Raya!',
  createdAt: '2026-11-16T14:47:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03GambarLabirin,
  Slide04KecilkanMobil,
  Slide05TigaTombol,
  Slide06AyoTebak,
  Slide07ResepKode,
  Slide08TipsLabirin,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-31-tendangan-juara-mini-soccer';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj31-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj31-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-16px) scale(1.06); }
}
@keyframes cpj31-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj31-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj31-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj31-goal-pop {
  0% { transform: scale(0.6) rotate(-6deg); opacity: 0.7; }
  60% { transform: scale(1.16) rotate(4deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
.cpj31-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj31-card-btn:hover {
  transform: translateY(-4px);
}
.cpj31-card-btn:active {
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

/** Playful stadium fanfare chime when scoring a goal */
function playGoalFanfare(goal = false) {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const seq = goal ? [523.25, 659.25, 783.99, 1046.5] : [300];
    seq.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + i * 0.08;
      osc.type = goal ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.24, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.24);
    });
    setTimeout(() => {
      void ctx.close();
    }, 650);
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
          animation: live ? 'cpj31-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 31 • Tendangan Juara Mini Soccer!</span>
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
  bgColor = TEAL_SOFT,
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
// Reusable Pertemuan 31 Visuals (Soccer Field, Ball, Goal, Star, Tic, Blocks)
// ============================================================================

const SoccerBallSvg = ({ size = 62 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="72" rx="22" ry="5" fill="rgba(30,30,44,0.16)" />
    <circle cx="40" cy="40" r="30" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
    <polygon points="40,25 53,34 48,49 32,49 27,34" fill={CHARCOAL} />
    <path d="M40 25 V10 M53 34 L67 28 M48 49 L57 63 M32 49 L23 63 M27 34 L13 28" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" />
  </svg>
);

const SoccerGoalSvg = ({ width = 88, height = 112 }: { width?: number; height?: number }) => (
  <svg width={width} height={height} viewBox="0 0 96 120" fill="none">
    <path d="M16 110 V20 H82 V110" fill={SKY_SOFT} fillOpacity={0.55} stroke={WHITE} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 110 V20 H82 V110" fill="none" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    {[34, 52, 68].map((x) => (
      <line key={x} x1={x} y1="22" x2={x} y2="110" stroke={CHARCOAL} strokeWidth={2} opacity={0.45} />
    ))}
    {[44, 68, 90].map((y) => (
      <line key={y} x1="18" y1={y} x2="80" y2={y} stroke={CHARCOAL} strokeWidth={2} opacity={0.45} />
    ))}
  </svg>
);

const ScoreStarSvg = ({ size = 56, active = true }: { size?: number; active?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ opacity: active ? 1 : 0.25, transition: 'opacity 260ms ease, transform 260ms ease' }}>
    <polygon
      points="40,6 49,26 71,29 55,44 59,66 40,56 21,66 25,44 9,29 31,26"
      fill={SUNNY}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <circle cx="34" cy="36" r="2.8" fill={CHARCOAL} />
    <circle cx="46" cy="36" r="2.8" fill={CHARCOAL} />
    <path d="M35 44 Q40 48 45 44" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" fill="none" />
  </svg>
);

const SoccerFieldBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 520 260" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="520" height="122" fill="#DBEAFE" />
    <circle cx="448" cy="40" r="22" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M58 50 C58 40, 74 36, 82 44 C90 34, 110 38, 110 50 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.4} />
    {/* Green Soccer Pitch Stripes */}
    <rect x="0" y="122" width="520" height="138" fill="#4ADE80" stroke={CHARCOAL} strokeWidth={2.8} />
    <rect x="85" y="122" width="85" height="138" fill="#22C55E" fillOpacity={0.38} />
    <rect x="260" y="122" width="85" height="138" fill="#22C55E" fillOpacity={0.38} />
    <rect x="435" y="122" width="85" height="138" fill="#22C55E" fillOpacity={0.38} />
    {/* Pitch white chalk line */}
    <line x1="20" y1="145" x2="500" y2="145" stroke={WHITE} strokeWidth={3} opacity={0.85} />
    <circle cx="260" cy="195" r="34" stroke={WHITE} strokeWidth={3} opacity={0.8} />
  </svg>
);

const GoalBurstBadge = ({ size = 86 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      position: 'relative',
      ...centerCol,
      animation: 'cpj31-goal-pop 0.55s ease-in-out infinite alternate',
    }}
  >
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}>
      <path
        d="M50 4 L60 26 L84 14 L74 38 L96 48 L74 60 L86 84 L62 74 L50 96 L38 74 L14 84 L26 60 L4 48 L26 38 L16 14 L40 26 Z"
        fill={SUNNY}
        stroke={CHARCOAL}
        strokeWidth={4}
        strokeLinejoin="round"
      />
    </svg>
    <span
      style={{
        position: 'relative',
        zIndex: 2,
        fontFamily: 'var(--osd-font-display)',
        fontSize: Math.round(size * 0.21),
        fontWeight: 700,
        color: CORAL,
      }}
    >
      GOOOL!
    </span>
  </div>
);

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

type SoccerBlockKind =
  | 'start-flag'
  | 'start-tap'
  | 'start-bump'
  | 'send-yellow'
  | 'recv-yellow'
  | 'move-right'
  | 'move-left'
  | 'hop'
  | 'turn-right'
  | 'speed-fast'
  | 'sound-goal'
  | 'show'
  | 'hide'
  | 'grow'
  | 'say-goal';

const ScratchJrBlock = ({
  kind,
  num = 2,
  scale = 1,
  activeGlow = false,
}: {
  kind: SoccerBlockKind;
  num?: number;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-flag' || kind === 'start-tap' || kind === 'start-bump' || kind === 'recv-yellow';
  const fill = isTrigger || kind === 'send-yellow'
    ? SUNNY
    : kind === 'move-right' || kind === 'move-left' || kind === 'hop' || kind === 'turn-right'
      ? SKY
      : kind === 'sound-goal'
        ? TEAL
        : kind === 'speed-fast'
          ? ORANGE
          : LAVENDER;

  const w = Math.round(134 * scale);
  const h = Math.round(118 * scale);

  const pathData = isTrigger
    ? 'M30 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H24 C14 106 8 98 8 88 V38 C8 25 18 16 30 16 Z'
    : 'M14 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H14 V74 C24 74 24 48 14 48 V16 Z';

  const hasNumber = kind === 'move-right' || kind === 'move-left' || kind === 'hop';

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter: activeGlow ? 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.95))' : undefined,
        transform: activeGlow ? 'scale(1.07)' : 'scale(1)',
        transition: 'transform 180ms ease, filter 180ms ease',
      }}
    >
      <svg width={w} height={h} viewBox="0 0 140 120">
        <path d={pathData} fill={fill} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />

        {kind === 'start-flag' && (
          <>
            <line x1="48" y1="30" x2="48" y2="90" stroke={CHARCOAL} strokeWidth={5.5} strokeLinecap="round" />
            <path d="M50 33 C68 27, 84 40, 98 35 V62 C84 68, 68 54, 50 61 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
          </>
        )}

        {kind === 'start-tap' && (
          <>
            <circle cx="56" cy="44" r="10.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
            <path d="M38 80 C38 60, 74 60, 74 80 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} strokeLinejoin="round" />
            <path d="M72 58 L92 73 L85 77 L95 90 L87 94 L77 81 L71 86 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.6} strokeLinejoin="round" />
          </>
        )}

        {kind === 'start-bump' && (
          <>
            <circle cx="48" cy="43" r="10" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} />
            <path d="M31 82 C31 61, 65 61, 65 82 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <circle cx="86" cy="43" r="10" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={2.8} />
            <path d="M69 82 C69 61, 103 61, 103 82 Z" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <polygon points="67,54 73,63 61,63" fill={CORAL} />
          </>
        )}

        {kind === 'send-yellow' && (
          <>
            <rect x="30" y="38" width="76" height="48" rx="8" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
            <path d="M32 41 L68 65 L104 41" fill="none" stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
          </>
        )}

        {kind === 'recv-yellow' && (
          <>
            <path d="M32 50 L68 25 L104 50 V88 H32 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
            <rect x="46" y="38" width="44" height="28" rx="4" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
            <path d="M32 50 L68 72 L104 50 V88 H32 Z" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
          </>
        )}

        {kind === 'move-right' && (
          <path d="M36 52 H72 V37 L102 60 L72 83 V68 H36 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {kind === 'move-left' && (
          <path d="M102 52 H66 V37 L36 60 L66 83 V68 H102 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {kind === 'hop' && (
          <path d="M40 76 C40 34, 88 34, 88 68 M76 58 L88 71 L98 56" fill="none" stroke={WHITE} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        )}

        {kind === 'turn-right' && (
          <path d="M46 65 A24 24 0 1 1 88 73 M88 86 V70 H72" fill="none" stroke={WHITE} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        )}

        {kind === 'speed-fast' && (
          <>
            <path d="M42 40 L94 40 M50 56 L100 56 M40 72 L88 72" stroke={WHITE} strokeWidth={5} strokeLinecap="round" />
            <circle cx="88" cy="56" r="13" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
          </>
        )}

        {kind === 'sound-goal' && (
          <>
            <path d="M32 52 H46 L66 35 V83 L46 66 H32 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <path d="M74 46 Q83 59 74 72" fill="none" stroke={SUNNY} strokeWidth={4.5} strokeLinecap="round" />
            <path d="M84 37 Q98 59 84 81" fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
          </>
        )}

        {kind === 'show' && (
          <>
            <circle cx="69" cy="43" r="11" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
            <path d="M47 84 C47 61, 91 61, 91 84 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
          </>
        )}

        {kind === 'hide' && (
          <>
            <circle cx="69" cy="43" r="11" fill="rgba(255,255,255,0.22)" stroke={WHITE} strokeWidth={4} strokeDasharray="6 4.5" />
            <path d="M47 84 C47 61, 91 61, 91 84 Z" fill="rgba(255,255,255,0.22)" stroke={WHITE} strokeWidth={4} strokeDasharray="7 5" strokeLinejoin="round" />
          </>
        )}

        {kind === 'grow' && (
          <>
            <circle cx="69" cy="60" r="22" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
            <path d="M36 60 H26 M32 54 L25 60 L32 66" fill="none" stroke={SUNNY_SOFT} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M102 60 H112 M106 54 L113 60 L106 66" fill="none" stroke={SUNNY_SOFT} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}

        {kind === 'say-goal' && (
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

/** Authentic ScratchJr Tablet Interface for Playable Mini Soccer Game */
const AuthenticScratchJrSoccerUI = ({
  kickPhase,
  selectedChar = 'cat',
  onSelectChar,
  onKickBall,
  onReset,
  width = 880,
  height = 540,
}: {
  kickPhase: 'ready' | 'kicking' | 'goal';
  selectedChar?: 'cat' | 'ball' | 'goal' | 'star';
  onSelectChar?: (c: 'cat' | 'ball' | 'goal' | 'star') => void;
  onKickBall?: () => void;
  onReset?: () => void;
  width?: number | string;
  height?: number | string;
}) => {
  const catLeft = kickPhase === 'kicking' ? '20%' : '8%';
  const ballLeft = kickPhase === 'ready' ? '28%' : kickPhase === 'kicking' ? '44%' : '76%';

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
            className="cpj31-card-btn"
            title="Reset Game"
            style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol, padding: 0 }}
          >
            <JuniorIcon name="reset" size={22} />
          </button>
          <button
            type="button"
            onClick={onReset}
            className="cpj31-card-btn"
            title="Bendera Hijau"
            style={{ width: 46, height: 36, borderRadius: 10, background: TEAL_SOFT, border: `2px solid ${TEAL}`, ...centerCol, padding: 0 }}
          >
            <JuniorIcon name="flag" size={24} />
          </button>
        </div>

        <div style={{ padding: '4px 12px', borderRadius: 10, background: kickPhase === 'goal' ? SUNNY : WHITE, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 13, fontWeight: 700 }}>
          {kickPhase === 'goal' ? 'GOOOL!' : 'Klik Kucing Tic!'}
        </div>
      </div>

      {/* Middle 3-Column Row */}
      <div style={{ flex: 1, display: 'flex', gap: 10, minHeight: 0 }}>
        {/* Left 4 Characters Sidebar */}
        <div style={{ width: 92, borderRadius: 16, background: '#E2E8F0', border: `2.5px solid ${CHARCOAL}`, padding: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          {[
            { id: 'cat' as const, node: <TicCatSvg size={36} /> },
            { id: 'ball' as const, node: <SoccerBallSvg size={32} /> },
            { id: 'goal' as const, node: <SoccerGoalSvg width={34} height={38} /> },
            { id: 'star' as const, node: <ScoreStarSvg size={34} /> },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectChar?.(c.id)}
              className="cpj31-card-btn"
              style={{
                width: '100%',
                height: 44,
                borderRadius: 11,
                background: WHITE,
                border: `${selectedChar === c.id ? 3 : 2}px solid ${selectedChar === c.id ? SUNNY : CHARCOAL}`,
                ...centerCol,
                padding: 0,
              }}
            >
              {c.node}
            </button>
          ))}
        </div>

        {/* Center Soccer Pitch Stage */}
        <div style={{ flex: 1, borderRadius: 18, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
          <SoccerFieldBackdropSvg />

          {/* Score Star in top-right sky */}
          <div
            style={{
              position: 'absolute',
              right: '14%',
              top: '6%',
              transform: kickPhase === 'goal' ? 'scale(1.3)' : 'scale(0.85)',
              transition: 'transform 300ms ease',
              zIndex: 3,
            }}
          >
            <ScoreStarSvg size={54} active={kickPhase === 'goal'} />
          </div>

          {/* Clickable Kucing Tic */}
          <button
            type="button"
            onClick={onKickBall}
            className="cpj31-card-btn"
            title="Klik untuk Menendang!"
            style={{
              position: 'absolute',
              left: catLeft,
              bottom: '10%',
              background: 'transparent',
              border: 'none',
              padding: 0,
              transition: 'left 250ms ease',
              animation: kickPhase === 'goal' ? 'cpj31-hop 1s ease-in-out infinite' : undefined,
              zIndex: 4,
            }}
          >
            <TicCatSvg size={104} waving={kickPhase === 'goal'} />
          </button>

          {/* Soccer Ball */}
          <div
            style={{
              position: 'absolute',
              left: ballLeft,
              bottom: '14%',
              transition: 'left 420ms cubic-bezier(0.22, 1, 0.36, 1)',
              zIndex: 4,
            }}
          >
            <SoccerBallSvg size={50} />
          </div>

          {/* Soccer Goal Net */}
          <div style={{ position: 'absolute', right: '6%', bottom: '10%', zIndex: 3 }}>
            <SoccerGoalSvg width={80} height={102} />
          </div>

          {/* GOOOL! Burst */}
          {kickPhase === 'goal' && (
            <div style={{ position: 'absolute', left: '42%', top: '16%', zIndex: 5 }}>
              <GoalBurstBadge size={90} />
            </div>
          )}
        </div>

        {/* Right Page Thumbnail */}
        <div style={{ width: 90, borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: '100%', height: 58, borderRadius: 12, border: `2.5px solid ${SUNNY}`, overflow: 'hidden', position: 'relative' }}>
            <SoccerFieldBackdropSvg />
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
            {selectedChar === 'cat'
              ? 'Kode Kucing Tic: Tendang & Selebrasi'
              : selectedChar === 'ball'
                ? 'Kode Bola: Melesat ke Gawang!'
                : selectedChar === 'goal'
                  ? 'Kode Gawang: Suara Gol + Kirim Amplop Kuning'
                  : 'Kode Bintang Skor: Sembunyi -> Muncul & Membesar!'}
          </span>
        </div>

        <div style={{ flex: 1, padding: '6px 12px', ...row, justifyContent: 'center', alignItems: 'flex-start', overflow: 'hidden' }}>
          {selectedChar === 'cat' && (
            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-tap" scale={0.62} />
              <div style={{ marginLeft: -8 }}><ScratchJrBlock kind="move-right" num={2} scale={0.62} /></div>
              <div style={{ marginLeft: -8 }}><ScratchJrBlock kind="move-left" num={2} scale={0.62} /></div>
            </div>
          )}
          {selectedChar === 'ball' && (
            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-bump" scale={0.62} />
              <div style={{ marginLeft: -8 }}><ScratchJrBlock kind="speed-fast" scale={0.62} /></div>
              <div style={{ marginLeft: -8 }}><ScratchJrBlock kind="move-right" num={6} scale={0.62} /></div>
            </div>
          )}
          {selectedChar === 'goal' && (
            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-bump" scale={0.62} />
              <div style={{ marginLeft: -8 }}><ScratchJrBlock kind="sound-goal" scale={0.62} /></div>
              <div style={{ marginLeft: -8 }}><ScratchJrBlock kind="send-yellow" scale={0.62} /></div>
            </div>
          )}
          {selectedChar === 'star' && (
            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="recv-yellow" scale={0.62} />
              <div style={{ marginLeft: -8 }}><ScratchJrBlock kind="show" scale={0.62} /></div>
              <div style={{ marginLeft: -8 }}><ScratchJrBlock kind="grow" scale={0.62} /></div>
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
  const [kickPhase, setKickPhase] = useState<'ready' | 'kicking' | 'goal'>('ready');

  const handleKick = () => {
    playGoalFanfare(false);
    setKickPhase('kicking');
    setTimeout(() => {
      playGoalFanfare(true);
      setKickPhase('goal');
    }, 380);
  };

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 31" accentDot={TEAL}>
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
          <JuniorIcon name="soccer-ball" size={24} />
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
          <Highlight>Tendangan Juara</Highlight>
          <br />
          Mini Soccer!
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
          Merancang Game Sepak Bola, Selebrasi Gol &amp; Bintang Skor
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
            <JuniorIcon name="soccer-ball" size={28} />
            <span>Tendang &amp; Gol!</span>
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
            <JuniorIcon name="star-glow" size={28} />
            <span>Bintang Skor!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Playable Authentic ScratchJr Mini Soccer UI + Biko */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #ECFDF5 0%, #FEF9C3 55%, #EFF6FF 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${TEAL}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 140, zIndex: 2 }}>
          <AuthenticScratchJrSoccerUI
            kickPhase={kickPhase}
            onKickBall={handleKick}
            onReset={() => setKickPhase('ready')}
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
            animation: live ? 'cpj31-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="soccer-ball" size={24} />}
            speechBubble={kickPhase === 'goal' ? 'GOOOL!' : 'Klik Kucing Tic!'}
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
    <JuniorFrame badge="MISI HARI INI" accentDot={TEAL}>
      <SlideTitle>
        Apa Misi Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Game Mini Soccer • Pertemuan 31"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu 1 (Hijau) */}
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
              MISI 1
            </div>

            <div style={{ width: 270, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 10 }}>
              <SoccerBallSvg size={64} />
              <JuniorIcon name="arrow-right" size={38} />
              <SoccerGoalSvg width={78} height={96} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Bikin Game <span style={{ color: '#047857' }}>Mini Soccer</span> &amp; <span style={{ color: '#047857' }}>Selebrasi Gol</span>
            </div>
          </div>

          {/* Kartu 2 (Kuning) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${SUNNY}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ width: 270, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 8 }}>
              <ScoreStarSvg size={64} />
              <ScoreStarSvg size={78} />
              <ScoreStarSvg size={64} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Munculkan <span style={{ color: '#B45309' }}>Bintang Skor</span> Saat Gol!
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj31-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="soccer-ball" size={24} />}
          speechBubble="Ayo cetak gol!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Langkah #1: Siapkan Lapangan & 4 Karakter!
// ============================================================================
const Slide03SiapkanLapangan: Page = () => {
  return (
    <JuniorFrame badge="PERSIAPAN PERTANDINGAN" accentDot={TEAL}>
      <SlideTitle>
        Siapkan <Highlight>Lapangan</Highlight> &amp; <Highlight color="#D1FAE5">4 Karakter!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Authentic ScratchJr Soccer Stage */}
      <div style={{ ...abs(X0, 235, 860, 720) }}>
        <AuthenticScratchJrSoccerUI kickPhase="ready" selectedChar="cat" width={860} height={720} />
      </div>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={995}
        top={235}
        width={825}
        height={720}
        titleBarColor={CREAM}
        headerLabel="4 Karakter di Lapangan Hijau"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 12 }}>
            <BulletRow icon="landscape" bgColor={TEAL_SOFT} fontSize={32}>
              Pasang latar <strong>Lapangan Hijau / Taman</strong>
            </BulletRow>
            <BulletRow icon="soccer-ball" bgColor={SUNNY_SOFT} fontSize={32}>
              Tambah <strong>Kucing Tic</strong>, <strong>Bola</strong>, <strong>Gawang</strong>, &amp; <strong>Bintang Skor</strong>!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Taruh <strong>Bintang Skor</strong> di pojok kanan atas langit seperti papan skor stadion!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus Tendangan Juara!
// ============================================================================
const Slide04JurusTendangan: Page = () => {
  return (
    <JuniorFrame badge="JURUS MENENDANG BOLA" accentDot={SKY}>
      <SlideTitle>
        Tendang Bola <Highlight>Melesat Kencang!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1720}
        height={720}
        titleBarColor={CREAM}
        headerLabel="2 Karakter Bekerja Sama: Kucing Tic Menendang Bola!"
        padding={34}
      >
        <div style={{ display: 'flex', gap: 34, height: '100%' }}>
          {/* Kartu Kiri — Kode Kucing Tic */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${SUNNY}`,
              padding: '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <TicCatSvg size={82} />
              <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                Kode Kucing Tic
              </div>
            </div>

            <div style={{ ...row, alignItems: 'flex-start', justifyContent: 'center' }}>
              <ScratchJrBlock kind="start-tap" scale={1.15} />
              <div style={{ marginLeft: -16 }}><ScratchJrBlock kind="move-right" num={2} scale={1.15} /></div>
              <div style={{ marginLeft: -16 }}><ScratchJrBlock kind="move-left" num={2} scale={1.15} /></div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: CHARCOAL }}>
              Diklik -&gt; <span style={{ color: '#B45309' }}>Maju Menendang!</span>
            </div>
          </div>

          {/* Kartu Kanan — Kode Bola */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${SKY}`,
              padding: '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <SoccerBallSvg size={72} />
              <div style={{ padding: '8px 22px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                Kode Bola
              </div>
            </div>

            <div style={{ ...row, alignItems: 'flex-start', justifyContent: 'center' }}>
              <ScratchJrBlock kind="start-bump" scale={1.15} activeGlow />
              <div style={{ marginLeft: -16 }}><ScratchJrBlock kind="speed-fast" scale={1.15} activeGlow /></div>
              <div style={{ marginLeft: -16 }}><ScratchJrBlock kind="move-right" num={6} scale={1.15} /></div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: CHARCOAL }}>
              Tersentuh Tic -&gt; <span style={{ color: '#1D4ED8' }}>Melesat ke Gawang!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Rahasia Wasit Gol: Gawang Kirim Amplop!
// ============================================================================
const Slide05WasitGol: Page = () => {
  return (
    <JuniorFrame badge="DETEKSI GOL AJAIB" accentDot={SUNNY}>
      <SlideTitle>
        Gawang <Highlight>Bersorak &ldquo;GOOOL!&rdquo;</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Ball entering Goal + 3 Blocks */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="Kode Gawang (Wasit Gol Otomatis)"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '100%', height: 340, borderRadius: 24, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <SoccerFieldBackdropSvg />
            <div style={{ position: 'absolute', inset: 0, ...row, justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 24, gap: 16 }}>
              <SoccerBallSvg size={72} />
              <GoalBurstBadge size={94} />
              <SoccerGoalSvg width={108} height={140} />
            </div>
          </div>

          <div style={{ ...row, alignItems: 'flex-start', justifyContent: 'center' }}>
            <ScratchJrBlock kind="start-bump" scale={1.3} activeGlow />
            <div style={{ marginLeft: -18 }}><ScratchJrBlock kind="sound-goal" scale={1.3} /></div>
            <div style={{ marginLeft: -18 }}><ScratchJrBlock kind="send-yellow" scale={1.3} activeGlow /></div>
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
        headerLabel="Tugas Karakter Gawang"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="soccer-goal" bgColor={TEAL_SOFT} fontSize={32}>
              Ketuk karakter <strong>Gawang</strong> di panel kiri
            </BulletRow>
            <BulletRow icon="mail-send" bgColor={SUNNY_SOFT} fontSize={32}>
              Rangkai: <strong>Tabrakan</strong> + <strong>Suara &ldquo;Goool!&rdquo;</strong> + <strong>Kirim Amplop Kuning</strong>
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Amplop Kuning dari Gawang memberi sinyal ke <strong>Bintang Skor</strong> dan <strong>Kucing Tic</strong> bahwa gol sudah tercipta!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Blok Apa untuk Bintang Skor?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1620} top={118} size={46}>
        Saat <Highlight>Gol Terjadi,</Highlight> Blok Apa Biar <Highlight color="#FEF9C3">Bintang Skor Muncul?</Highlight>
      </SlideTitle>

      {/* Top Visual Equation Strip */}
      <div
        style={{
          ...abs(260, 200, 1400, 128),
          borderRadius: 26,
          background: WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 6px 0 ${CHARCOAL}`,
          padding: '0 40px',
          ...row,
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <ScratchJrBlock kind="recv-yellow" scale={0.78} />
        <JuniorIcon name="arrow-right" size={38} />
        <div
          style={{
            width: 108,
            height: 92,
            borderRadius: 20,
            background: picked === 'A' ? TEAL_SOFT : SUNNY_SOFT,
            border: `3.5px dashed ${picked === 'A' ? TEAL : CHARCOAL}`,
            ...centerCol,
          }}
        >
          {picked === 'A' ? <ScratchJrBlock kind="show" scale={0.76} /> : <JuniorIcon name="question" size={44} />}
        </div>
        <JuniorIcon name="arrow-right" size={38} />
        <ScratchJrBlock kind="sound-goal" scale={0.78} />
      </div>

      {/* Interactive Choice Cards */}
      <div style={{ ...abs(190, 355, 1540, 395), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Blok Show) */}
        <button
          type="button"
          onClick={() => {
            playGoalFanfare(true);
            setPicked('A');
          }}
          className="cpj31-card-btn"
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
            <ScratchJrBlock kind="show" scale={1.45} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Blok Muncul (Show)
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Blok Muncul (Show) menampilkan Bintang Skor!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Blok Hide) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj31-card-btn"
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
            animation: picked === 'B' ? 'cpj31-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 12 }}>
            <ScratchJrBlock kind="hide" scale={1.45} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Blok Sembunyi (Hide)
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Blok Sembunyi malah menyembunyikan bintangnya!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 765, 1540, 235), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj31-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={205}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Gol mantap!' : 'Ayo tebak!'}
          />
        </div>
        <div style={{ padding: '20px 34px', borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...row, gap: 18 }}>
          <div style={{ width: 62, height: 62, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="question" size={34} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, color: CHARCOAL }}>
            Tunjuk blok yang benar di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Jurus Bintang Skor & Selebrasi Gol!
// ============================================================================
const Slide07SelebrasiSkor: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="SELEBRASI & SKOR" accentDot={LAVENDER}>
      <SlideTitle>
        Rangkai <Highlight>Bintang Skor</Highlight> &amp; <Highlight color="#F3EEFF">Selebrasi!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Reaksi Bintang Skor & Selebrasi Kucing Tic saat Gol"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26 }}>
          {/* Kartu Atas — Kode Bintang Skor */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${SUNNY}`,
              padding: '20px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <ScoreStarSvg size={54} />
              <div style={{ padding: '6px 20px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                KODE BINTANG SKOR
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ ...row, alignItems: 'flex-start' }}>
                <ScratchJrBlock kind="start-flag" scale={0.96} />
                <div style={{ marginLeft: -12 }}><ScratchJrBlock kind="hide" scale={0.96} /></div>
              </div>
              <div style={{ width: 3, height: 100, background: '#E2E8F0' }} />
              <div style={{ ...row, alignItems: 'flex-start' }}>
                <ScratchJrBlock kind="recv-yellow" scale={0.96} activeGlow />
                <div style={{ marginLeft: -12 }}><ScratchJrBlock kind="show" scale={0.96} activeGlow /></div>
                <div style={{ marginLeft: -12 }}><ScratchJrBlock kind="grow" scale={0.96} activeGlow /></div>
              </div>
            </div>
          </div>

          {/* Kartu Bawah — Kode Selebrasi Tic */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: LAVENDER_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${LAVENDER}`,
              padding: '20px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <TicCatSvg size={64} waving />
              <div style={{ padding: '6px 20px', borderRadius: 99, background: LAVENDER, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                KODE SELEBRASI KUCING TIC
              </div>
            </div>

            <div style={{ ...row, alignItems: 'flex-start', justifyContent: 'center' }}>
              <ScratchJrBlock kind="recv-yellow" scale={1.06} activeGlow />
              <div style={{ marginLeft: -14 }}><ScratchJrBlock kind="hop" num={3} scale={1.06} /></div>
              <div style={{ marginLeft: -14 }}><ScratchJrBlock kind="turn-right" scale={1.06} /></div>
              <div style={{ marginLeft: -14 }}><ScratchJrBlock kind="say-goal" scale={1.06} /></div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1475, 345, 360, 560),
          ...centerCol,
          animation: live ? 'cpj31-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={335}
          badgeIcon={<JuniorIcon name="star-glow" size={22} />}
          speechBubble="GOOOL! Hore!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Game Mini Soccer (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsSoccer: Page = () => {
  return (
    <JuniorFrame badge="TIPS GAME OLAHRAGA" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Tendanganmu <Highlight>Selalu Gol!</Highlight>
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
            <BulletRow icon="ruler" bgColor={TEAL_SOFT} fontSize={30}>
              Sejajarkan tinggi <strong>Kucing Tic, Bola, &amp; Gawang</strong>
            </BulletRow>
            <BulletRow icon="hide" bgColor={SUNNY_SOFT} fontSize={30}>
              Pasang <strong>Bendera Hijau + Sembunyi</strong> di <strong>Bintang Skor</strong> saat mulai
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, border: `3.5px solid ${TEAL}`, position: 'relative', overflow: 'hidden' }}>
            <SoccerFieldBackdropSvg />
            <div style={{ position: 'absolute', inset: 0, ...row, justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 18 }}>
              <TicCatSvg size={115} />
              <SoccerBallSvg size={54} />
              <SoccerGoalSvg width={82} height={106} />
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
              Menaruh gawang <strong>Terlalu Tinggi</strong> di langit
            </BulletRow>
            <BulletRow icon="shuffle" bgColor={SUNNY_SOFT} fontSize={30}>
              Memakai <strong>Warna Amplop Berbeda</strong> antara Gawang &amp; Bintang
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, position: 'relative', overflow: 'hidden', ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <div style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
              <SoccerBallSvg size={64} />
            </div>
            <JuniorIcon name="arrow-right" size={44} />
            <div style={{ alignSelf: 'flex-start', marginTop: 18 }}>
              <SoccerGoalSvg width={86} height={105} />
            </div>
            <JuniorIcon name="cross" size={62} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Mainkan Mini Soccer Buatanmu!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [kickPhase, setKickPhase] = useState<'ready' | 'kicking' | 'goal'>('ready');
  const [charTab, setCharTab] = useState<'cat' | 'ball' | 'goal' | 'star'>('cat');

  const handleKick = () => {
    playGoalFanfare(false);
    setKickPhase('kicking');
    setTimeout(() => {
      playGoalFanfare(true);
      setKickPhase('goal');
    }, 380);
  };

  return (
    <JuniorFrame badge="AYO BUAT & MAIN!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Tendangan Juara Mini Soccer!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'soccer-ball' as JuniorIconName,
            text: (
              <>
                Siapkan <strong>Lapangan, Tic, Bola, Gawang, &amp; Bintang Skor</strong>
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
                Rangkai kode <strong>Tendang, Gol, Bintang Skor, &amp; Selebrasi</strong>
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
                Klik <strong>Layar Penuh</strong>, klik Tic, &amp; cetak <strong>GOOOL!</strong>
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

      {/* Playable Authentic ScratchJr Mini Soccer Workspace */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratchJrSoccerUI
          kickPhase={kickPhase}
          selectedChar={charTab}
          onSelectChar={setCharTab}
          onKickBall={handleKick}
          onReset={() => setKickPhase('ready')}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Kick Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 18 }}>
        <div style={{ animation: live ? 'cpj31-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={345}
            badgeIcon={<JuniorIcon name="soccer-ball" size={24} />}
            speechBubble={kickPhase === 'goal' ? 'GOOOL!' : 'Tendang Bola!'}
          />
        </div>
        <button
          type="button"
          onClick={handleKick}
          className="cpj31-card-btn"
          style={{
            padding: '14px 26px',
            borderRadius: 20,
            background: TEAL,
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
          <JuniorIcon name="soccer-ball" size={26} />
          <span>Klik Kucing Tic!</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 31 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj31-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj31-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="trophy" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj31-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={56}>
        Hore! Kamu <Highlight>Juara Pembuat Game Olahraga!</Highlight>{' '}
        <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 31"
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
          {/* Bespoke Golden Soccer Trophy & Star Medal SVG */}
          <div style={{ animation: live ? 'cpj31-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={TEAL_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Soccer Ball Center */}
              <circle cx="120" cy="108" r="38" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
              <polygon points="120,89 136,100 130,119 110,119 104,100" fill={CHARCOAL} />
              <path d="M120 89 V70 M136 100 L153 93 M130 119 L141 136 M110 119 L99 136 M104 100 L87 93" stroke={CHARCOAL} strokeWidth={3.4} strokeLinecap="round" />
              {/* Mini Gold Stars */}
              <polygon points="74,64 78,73 88,74 80,81 82,91 74,86 66,91 68,81 60,74 70,73" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.2} />
              <polygon points="166,64 170,73 180,74 172,81 174,91 166,86 158,91 160,81 152,74 162,73" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.2} />
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
            <span>Lencana Master Mini Soccer &amp; Bintang Skor</span>
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
            Kamu sudah jago membuat{' '}
            <Highlight color="#D1FAE5">Game Sepak Bola, Selebrasi Gol, &amp; Papan Skor!</Highlight>
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
            speechBubble="Juara Soccer!"
          />
          <div style={{ animation: live ? 'cpj31-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 31 — Tendangan Juara Mini Soccer! ⚽🥅
Hari ini kita membuat game sepak bola seru lengkap dengan selebrasi gol & Bintang Skor!`,

  `Dua misi seru hari ini:
1. Bikin Game Mini Soccer lengkap dengan Selebrasi Gol.
2. Munculkan Bintang Skor otomatis di atas layar saat terjadi gol!`,

  `Langkah #1 — Siapkan Lapangan & 4 Karakter!
Pilih latar Lapangan Hijau / Taman, lalu tambahkan Kucing Tic, Bola Sepak, Gawang, dan Bintang Skor di pojok kanan atas.`,

  `Jurus Tendangan Juara:
- Kode Kucing Tic: Sentuh Karakter -> Maju 2 -> Mundur 2 (gerakan menendang).
- Kode Bola: Tabrakan -> Cepat -> Maju 6 (meluncur kencang ke gawang)!`,

  `Rahasia Wasit Gol: Gawang Kirim Amplop Kuning!
Di karakter Gawang, rangkai Tabrakan -> Suara "Goool!" -> Kirim Amplop Kuning!`,

  `Permainan Cepat! Ayo tebak bersama:
Saat Gol terjadi dan Amplop Kuning diterima Bintang Skor, blok apa untuk memunculkannya — Pilihan A (Show) atau Pilihan B (Hide)?`,

  `Jurus Bintang Skor & Selebrasi Gol:
- Bintang Skor: Bendera Hijau -> Sembunyi | Terima Amplop Kuning -> Muncul -> Membesar!
- Kucing Tic: Terima Amplop Kuning -> Lompat 3 -> Berputar -> Say "GOOOL!"`,

  `Tips Jagoan Game Mini Soccer:
BOLEH sejajarkan tinggi Tic, Bola, & Gawang, serta sembunyikan Bintang Skor saat mulai.
JANGAN taruh gawang melayang tinggi di langit, atau pakai warna amplop berbeda!`,

  `Waktunya Misi Praktik Tendangan Juara Mini Soccer!
Klik 4 karakter di panel kiri untuk melihat kodenya masing-masing, lalu klik Kucing Tic di lapangan untuk menendang bola hingga GOOOL!`,

  `Hore! Kamu Juara Pembuat Game Olahraga! 🎉🏅
Selamat meraih Lencana Master Mini Soccer & Bintang Skor di Pertemuan 31!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 31 — Tendangan Juara Mini Soccer!',
  createdAt: '2026-11-16T14:55:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03SiapkanLapangan,
  Slide04JurusTendangan,
  Slide05WasitGol,
  Slide06AyoTebak,
  Slide07SelebrasiSkor,
  Slide08TipsSoccer,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-41-misi-terbang-tinggi-flyer-game';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj41-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj41-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj41-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj41-cloud-drift {
  0% { transform: translateX(0px); }
  50% { transform: translateX(-46px); }
  100% { transform: translateX(0px); }
}
@keyframes cpj41-radar {
  0% { opacity: 0.9; transform: scale(0.76); }
  100% { opacity: 0; transform: scale(1.42); }
}
@keyframes cpj41-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj41-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj41-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj41-card-btn:hover {
  transform: translateY(-4px);
}
.cpj41-card-btn:active {
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

/** Playful flyer feedback sound via Web Audio API */
function playFlyerSound(kind: 'flap' | 'boing' | 'win') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    if (kind === 'flap') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(760, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
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
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
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
          animation: live ? 'cpj41-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 41 • Misi Terbang Tinggi (Flyer Game)!</span>
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
// Reusable Pertemuan 41 Visuals (Parrot Sprite, Clouds Obstacle, Blocks)
// ============================================================================

const ParrotSpriteSvg = ({
  size = 112,
  wingsUp = true,
  pilotGoggles = false,
}: {
  size?: number;
  wingsUp?: boolean;
  pilotGoggles?: boolean;
}) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    {/* Tail Feathers */}
    <path d="M18 82 L44 74 L38 96 Z" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
    <path d="M12 72 L40 68 L36 86 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
    {/* Back Wing */}
    <path
      d={wingsUp ? 'M54 58 C42 22, 72 14, 86 44 Z' : 'M54 74 C44 106, 74 114, 84 82 Z'}
      fill={TEAL}
      stroke={CHARCOAL}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />
    {/* Body */}
    <ellipse cx="70" cy="74" rx="31" ry="23" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="76" cy="80" rx="18" ry="12" fill={SUNNY} />
    {/* Head */}
    <circle cx="92" cy="52" r="22" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.8} />
    {/* Crest */}
    <path d="M84 31 C80 18, 92 16, 96 30 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
    {/* Cheek & Eye */}
    <circle cx="97" cy="49" r="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
    <circle cx="99" cy="49" r="4.2" fill={CHARCOAL} />
    {/* Pilot Goggles Optional */}
    {pilotGoggles && (
      <g>
        <rect x="85" y="39" width="22" height="17" rx="8" fill="#BAE6FD" fillOpacity={0.7} stroke={CHARCOAL} strokeWidth={3} />
        <line x1="70" y1="47" x2="85" y2="47" stroke={CHARCOAL} strokeWidth={3.2} />
      </g>
    )}
    {/* Curved Beak */}
    <path d="M111 49 C128 49, 130 66, 114 68 L108 58 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
    {/* Front Flapping Wing */}
    <path
      d={wingsUp ? 'M52 68 C32 34, 72 28, 80 62 Z' : 'M52 72 C34 104, 72 108, 78 76 Z'}
      fill={SKY}
      stroke={CHARCOAL}
      strokeWidth={3.8}
      strokeLinejoin="round"
    />
  </svg>
);

const CloudObstacleSvg = ({
  width = 132,
  alertGlow = false,
}: {
  width?: number;
  alertGlow?: boolean;
}) => (
  <svg width={width} height={Math.round(width * 0.64)} viewBox="0 0 140 90" fill="none">
    <path
      d="M28 74 C13 74, 7 60, 16 48 C15 32, 31 23, 46 30 C54 11, 84 10, 95 28 C113 24, 131 36, 126 54 C134 64, 124 74, 110 74 Z"
      fill={alertGlow ? '#FEE2E2' : WHITE}
      stroke={alertGlow ? CORAL : CHARCOAL}
      strokeWidth={4.2}
      strokeLinejoin="round"
    />
    <circle cx="56" cy="50" r="3.6" fill={CHARCOAL} />
    <circle cx="84" cy="50" r="3.6" fill={CHARCOAL} />
    <path d="M62 59 Q70 54 78 59" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
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

const Scratch3HatKeyBlock = ({ keyLabel, scale = 1 }: { keyLabel: string; scale?: number }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(50 * scale),
      padding: `0 ${Math.round(18 * scale)}px`,
      borderRadius: `${Math.round(28 * scale)}px ${Math.round(28 * scale)}px ${Math.round(10 * scale)}px ${Math.round(10 * scale)}px`,
      background: SCRATCH_EVENT,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      color: CHARCOAL,
      whiteSpace: 'nowrap',
    }}
  >
    <span>when</span>
    <span style={{ padding: `${Math.round(3 * scale)}px ${Math.round(12 * scale)}px`, borderRadius: 99, background: '#D99B00', color: WHITE, border: `2px solid ${CHARCOAL}`, fontSize: Math.round(16 * scale) }}>
      {keyLabel}
    </span>
    <span>key pressed</span>
  </div>
);

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

const Scratch3TouchingHexBlock = ({
  target = 'Clouds',
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

const Scratch3IfThenCBlock = ({
  condition,
  scale = 1,
  children,
}: {
  condition: ReactNode;
  scale?: number;
  children?: ReactNode;
}) => {
  const s = scale;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div
        style={{
          ...row,
          gap: Math.round(10 * s),
          minHeight: Math.round(50 * s),
          padding: `${Math.round(6 * s)}px ${Math.round(16 * s)}px`,
          borderRadius: `${Math.round(14 * s)}px ${Math.round(14 * s)}px ${Math.round(14 * s)}px 4px`,
          background: SCRATCH_CTRL,
          border: `2.8px solid ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: Math.round(19 * s),
          fontWeight: 700,
          color: CHARCOAL,
        }}
      >
        <span>if</span>
        {condition}
        <span>then</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div
          style={{
            width: Math.round(24 * s),
            background: SCRATCH_CTRL,
            borderLeft: `2.8px solid ${CHARCOAL}`,
            borderRight: `2px solid ${CHARCOAL}`,
          }}
        />
        <div style={{ padding: `${Math.round(6 * s)}px 0 ${Math.round(6 * s)}px ${Math.round(8 * s)}px`, display: 'flex', flexDirection: 'column', gap: Math.round(5 * s) }}>
          {children}
        </div>
      </div>
      <div
        style={{
          width: Math.round(165 * s),
          height: Math.round(26 * s),
          borderRadius: `4px ${Math.round(12 * s)}px ${Math.round(12 * s)}px ${Math.round(12 * s)}px`,
          background: SCRATCH_CTRL,
          border: `2.8px solid ${CHARCOAL}`,
        }}
      />
    </div>
  );
};

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
            width: Math.round(24 * s),
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
          width: Math.round(220 * s),
          height: Math.round(30 * s),
          borderRadius: `4px ${Math.round(14 * s)}px ${Math.round(14 * s)}px ${Math.round(14 * s)}px`,
          background: SCRATCH_CTRL,
          border: `2.8px solid ${CHARCOAL}`,
        }}
      >
        <JuniorIcon name="infinity" size={Math.round(18 * s)} />
      </div>
    </div>
  );
};

// ============================================================================
// Interactive Authentic Scratch 3.0 Flyer Game Simulator (Slide 09)
// ============================================================================
const AuthenticScratch3FlyerUI = ({
  birdY,
  wingsUp,
  cloudPos,
  hitCloud,
  running,
  onMoveY,
  onToggleRun,
  width = 1280,
  height = 565,
}: {
  birdY: number;
  wingsUp: boolean;
  cloudPos: { x: number; y: number };
  hitCloud: boolean;
  running: boolean;
  onMoveY: (dy: number) => void;
  onToggleRun: () => void;
  width?: number;
  height?: number;
}) => (
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
    {/* Official Scratch Blue Nav */}
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
        <span>SCRATCH 3.0</span>
        <span style={{ padding: '3px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.22)', fontSize: 15 }}>
          Flyer Game • Burung Terbang
        </span>
      </div>
      <div style={{ ...row, gap: 10 }}>
        <span style={{ padding: '3px 14px', borderRadius: 99, background: SUNNY, color: CHARCOAL, fontSize: 15 }}>
          Size Parrot: 50
        </span>
      </div>
    </div>

    {/* Split Workspace + Sky Stage */}
    <div style={{ flex: 1, display: 'flex' }}>
      {/* Code Pane */}
      <div
        style={{
          width: 575,
          background: WHITE,
          backgroundImage: 'radial-gradient(#D5DEED 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px',
          borderRight: `2.5px solid ${CHARCOAL}`,
          padding: '14px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 16, fontWeight: 700, color: MUTED, ...row, justifyContent: 'space-between' }}>
          <span>Skrip Parrot (Naik-Turun + Radar)</span>
          <span style={{ padding: '2px 10px', borderRadius: 99, background: SKY_SOFT, color: SCRATCH_BLUE, border: `1.5px solid ${SCRATCH_BLUE}`, fontSize: 13 }}>
            {running ? 'Terbang Aktif' : 'Jeda'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Scratch3HatKeyBlock keyLabel="up arrow" scale={0.72} />
            <Scratch3StatementBlock color={SCRATCH_BLUE} scale={0.72}>
              <span>change y by (20)</span>
            </Scratch3StatementBlock>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Scratch3HatKeyBlock keyLabel="down arrow" scale={0.72} />
            <Scratch3StatementBlock color={SCRATCH_BLUE} scale={0.72}>
              <span>change y by (-20)</span>
            </Scratch3StatementBlock>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Scratch3HatFlagBlock scale={0.74} />
          <Scratch3ForeverCBlock scale={0.73}>
            <div style={{ borderRadius: 12, boxShadow: hitCloud ? `0 0 0 4px ${CORAL}` : undefined }}>
              <Scratch3IfThenCBlock scale={0.72} condition={<Scratch3TouchingHexBlock target="Clouds" scale={0.72} />}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Scratch3StatementBlock color={SCRATCH_SOUND} scale={0.72}>
                    <JuniorIcon name="speaker" size={16} />
                    <span>start sound [Boing]</span>
                  </Scratch3StatementBlock>
                  <Scratch3StatementBlock color={SCRATCH_LOOKS} scale={0.72}>
                    <span>say &quot;Awas awan!&quot; for (1) secs</span>
                  </Scratch3StatementBlock>
                </div>
              </Scratch3IfThenCBlock>
            </div>
          </Scratch3ForeverCBlock>
        </div>
      </div>

      {/* Playable Blue Sky Stage */}
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
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <button
            type="button"
            onClick={onToggleRun}
            className="cpj41-card-btn"
            style={{
              padding: '6px 16px',
              borderRadius: 99,
              background: running ? TEAL_SOFT : SUNNY_SOFT,
              border: `2px solid ${CHARCOAL}`,
              ...row,
              gap: 8,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name={running ? 'stop' : 'flag'} size={20} />
            <span>{running ? 'Jeda Awan' : 'Jalankan Awan!'}</span>
          </button>

          <span style={{ fontSize: 15, fontWeight: 700, color: MUTED }}>
            Tekan Panah Atas / Bawah untuk terbang!
          </span>
        </div>

        {/* Sky Canvas */}
        <div
          style={{
            position: 'relative',
            height: 365,
            borderRadius: 18,
            border: `3px solid ${CHARCOAL}`,
            background: 'linear-gradient(180deg, #60A5FA 0%, #BAE6FD 68%, #DCFCE7 100%)',
            overflow: 'hidden',
          }}
        >
          {/* Decorative Sun */}
          <div style={{ position: 'absolute', left: 26, top: 20 }}>
            <JuniorIcon name="sun" size={48} />
          </div>

          {/* Moving Cloud Obstacle */}
          <div
            style={{
              position: 'absolute',
              left: `${cloudPos.x}%`,
              top: `${cloudPos.y}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'left 700ms linear, top 700ms linear',
            }}
          >
            <CloudObstacleSvg width={138} alertGlow={hitCloud} />
          </div>

          {/* Controlled Parrot Sprite (Size 50) */}
          <div
            style={{
              position: 'absolute',
              left: '26%',
              top: `${birdY}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'top 140ms ease-out',
            }}
          >
            {hitCloud && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 88,
                  transform: 'translateX(-50%)',
                  padding: '6px 14px',
                  borderRadius: 14,
                  background: CORAL_SOFT,
                  border: `2.5px solid ${CORAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 17,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  zIndex: 4,
                }}
              >
                Awas awan!
              </div>
            )}
            <ParrotSpriteSvg size={94} wingsUp={wingsUp} pilotGoggles />
          </div>
        </div>

        {/* Up & Down Touch Buttons */}
        <div style={{ ...row, justifyContent: 'center', gap: 18 }}>
          <button
            type="button"
            onClick={() => onMoveY(-12)}
            className="cpj41-card-btn"
            style={{
              padding: '8px 24px',
              borderRadius: 14,
              background: SKY_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              boxShadow: `0 4px 0 ${CHARCOAL}`,
              ...row,
              gap: 10,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="arrow-up" size={24} />
            <span>Terbang Naik</span>
          </button>
          <button
            type="button"
            onClick={() => onMoveY(12)}
            className="cpj41-card-btn"
            style={{
              padding: '8px 24px',
              borderRadius: 14,
              background: TEAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              boxShadow: `0 4px 0 ${CHARCOAL}`,
              ...row,
              gap: 10,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="arrow-down" size={24} />
            <span>Terbang Turun</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// SLIDE 01 — Cover
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  const [wingsUp, setWingsUp] = useState(true);

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => setWingsUp((w) => !w), 260);
    return () => clearInterval(t);
  }, [live]);

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 41" accentDot={SKY}>
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
            marginBottom: 22,
          }}
        >
          <JuniorIcon name="bird" size={26} />
          <span>Proyek Flyer Game Pertama di Scratch 3.0</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 90,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Misi <Highlight>Terbang</Highlight>
          <br />
          <Highlight>Tinggi!</Highlight>
        </h1>

        <p
          style={{
            margin: '30px 0 0',
            fontSize: 31,
            fontWeight: 700,
            lineHeight: 1.4,
            color: MUTED,
            maxWidth: 780,
          }}
        >
          Mengendalikan <strong style={{ color: CHARCOAL }}>Burung</strong> Melewati{' '}
          <strong style={{ color: CHARCOAL }}>Rintangan Awan</strong> di Langit!
        </p>

        <div style={{ ...row, gap: 16, marginTop: 34 }}>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="keyboard" size={24} />
            <span>Panah Naik-Turun</span>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="compass" size={24} />
            <span>Sensor Awan</span>
          </div>
        </div>
      </div>

      {/* Right Visual: Biko Pilot + Scratch 3.0 Sky Game */}
      <MacWindowCard
        left={1010}
        top={185}
        width={810}
        height={690}
        titleBarColor={SKY_SOFT}
        headerLabel="Scratch 3.0 • Flyer Game"
        padding={26}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 20,
            border: `3px solid ${CHARCOAL}`,
            background: 'linear-gradient(180deg, #60A5FA 0%, #BAE6FD 66%, #DCFCE7 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ ...abs(34, 28) }}>
            <JuniorIcon name="sun" size={62} />
          </div>

          <div style={{ ...abs(510, 75), animation: live ? 'cpj41-cloud-drift 4.2s ease-in-out infinite' : undefined }}>
            <CloudObstacleSvg width={190} />
          </div>
          <div style={{ ...abs(555, 345), animation: live ? 'cpj41-cloud-drift 3.4s ease-in-out infinite' : undefined }}>
            <CloudObstacleSvg width={160} />
          </div>

          <div style={{ ...abs(235, 165), animation: live ? 'cpj41-float 2.2s ease-in-out infinite' : undefined }}>
            <ParrotSpriteSvg size={185} wingsUp={wingsUp} pilotGoggles />
          </div>

          <div style={{ ...abs(14, 240), animation: live ? 'cpj41-float 3s ease-in-out infinite' : undefined }}>
            <BikoMascot
              pose="thumbs-up"
              width={235}
              badgeIcon={<JuniorIcon name="bird" size={20} />}
              speechBubble="Terbang tinggi!"
            />
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
    <JuniorFrame badge="MISI GAME HARI INI" accentDot={SUNNY}>
      <SlideTitle>
        Apa Misi Game Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      {/* Biko Left Anchor */}
      <div style={{ ...abs(95, 295, 360, 620), ...centerCol }}>
        <div style={{ animation: live ? 'cpj41-hop 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="point-left"
            width={320}
            badgeIcon={<JuniorIcon name="bird" size={22} />}
            speechBubble="Ayo terbang!"
          />
        </div>
      </div>

      {/* macOS Window with 2 Cards */}
      <MacWindowCard
        left={480}
        top={240}
        width={1340}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Misi Pertemuan 41"
        padding={42}
      >
        <div style={{ display: 'flex', gap: 36, height: '100%' }}>
          {/* Card 1: Control Bird Up & Down */}
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
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ ...row, gap: 18, padding: '16px 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <JuniorIcon name="arrow-up" size={50} />
                <JuniorIcon name="arrow-down" size={50} />
              </div>
              <ParrotSpriteSvg size={145} wingsUp />
            </div>

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Kendalikan <span style={{ color: '#1D4ED8' }}>Burung Terbang</span> Naik &amp; Turun
            </div>
          </div>

          {/* Card 2: Dodge Clouds with Sensor */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: CORAL_SOFT,
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
            <div style={{ padding: '8px 22px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ position: 'relative', ...centerCol, padding: '14px 0', gap: 16 }}>
              <CloudObstacleSvg width={155} alertGlow />
              <Scratch3TouchingHexBlock target="Clouds" scale={0.98} />
            </div>

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Hindari <span style={{ color: '#B91C1C' }}>Rintangan Awan</span> Pakai Sensor!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Langkah #1: Siapkan 3 Bahan Utama Game!
// ============================================================================
const Slide03BahanUtama: Page = () => {
  return (
    <JuniorFrame badge="PERSIAPAN PANGGUNG GAME" accentDot={SKY}>
      <SlideTitle>
        Siapkan <Highlight>3 Bahan Utama</Highlight> Game!
      </SlideTitle>

      {/* Left: Scratch 3.0 Stage & Size 50 Spotlight */}
      <MacWindowCard
        left={X0}
        top={245}
        width={820}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Panggung & Sprite Pane"
        padding={28}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              flex: 1,
              borderRadius: 20,
              border: `3px solid ${CHARCOAL}`,
              background: 'linear-gradient(180deg, #60A5FA 0%, #BAE6FD 72%, #DCFCE7 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ ...abs(24, 18) }}>
              <JuniorIcon name="sun" size={50} />
            </div>
            <div style={{ ...abs(120, 140) }}>
              <ParrotSpriteSvg size={115} wingsUp />
            </div>
            <div style={{ ...abs(475, 110) }}>
              <CloudObstacleSvg width={175} />
            </div>
          </div>

          {/* Sprite Inspector Bar highlighting Size: 50 */}
          <div
            style={{
              height: 112,
              borderRadius: 20,
              background: '#F8FAFC',
              border: `3px solid ${CHARCOAL}`,
              padding: '0 24px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <JuniorIcon name="bird" size={44} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                Sprite: Parrot
              </span>
            </div>

            <div
              style={{
                padding: '10px 24px',
                borderRadius: 16,
                background: SUNNY,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 4px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              Size: 50
            </div>

            <div style={{ ...row, gap: 10 }}>
              <JuniorIcon name="cloud-sun" size={38} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                Clouds
              </span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={960}
        top={245}
        width={860}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Checklist Bahan Game"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <BulletRow icon="cloud-sun" bgColor={SKY_SOFT} fontSize={31}>
              Latar panggung: <strong>Langit Biru</strong> (<em>Blue Sky</em>)
            </BulletRow>
            <BulletRow icon="bird" bgColor={SUNNY_SOFT} fontSize={31}>
              Karakter 1: <strong>Burung</strong> (<em>Parrot</em>) — ubah ukuran <strong><code>Size</code> jadi <code>50</code></strong> biar lincah!
            </BulletRow>
            <BulletRow icon="wind" bgColor={TEAL_SOFT} fontSize={31}>
              Karakter 2: <strong>Awan</strong> (<em>Clouds</em>) sebagai rintangan langit!
            </BulletRow>
          </div>

          <div style={{ padding: '18px 24px', borderRadius: 20, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 16, fontSize: 25, fontWeight: 800 }}>
            <JuniorIcon name="bulb" size={34} />
            <span>Burung berukuran kecil (Size 50) jauh lebih gampang menghindari awan!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus #1: Kemudi Terbang Naik & Turun!
// ============================================================================
const Slide04KemudiNaikTurun: Page = () => {
  const [birdOffset, setBirdOffset] = useState<'idle' | 'up' | 'down'>('idle');

  return (
    <JuniorFrame badge="KODE BURUNG • KEMUDI KEYBOARD" accentDot={SKY}>
      <SlideTitle>
        Atur <Highlight>Terbang Naik &amp; Turun!</Highlight>
      </SlideTitle>

      {/* macOS Window with 2 Code Cards */}
      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Kode Kemudi Panah Atas & Bawah"
        padding={34}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kiri — Terbang Naik */}
          <button
            type="button"
            onClick={() => {
              playFlyerSound('flap');
              setBirdOffset('up');
            }}
            className="cpj41-card-btn"
            style={{
              flex: 1,
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3.5px solid ${SKY}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <JuniorIcon name="arrow-up" size={56} />
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: '#1D4ED8' }}>
                Terbang Naik
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <Scratch3HatKeyBlock keyLabel="up arrow" scale={1.1} />
              <Scratch3StatementBlock color={SCRATCH_BLUE} scale={1.1}>
                <span>change y by (20)</span>
              </Scratch3StatementBlock>
            </div>

            <div style={{ padding: '12px 22px', borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 25, fontWeight: 800 }}>
              Tekan Panah Atas -&gt; <strong>Terbang Naik!</strong>
            </div>
          </button>

          {/* Kanan — Terbang Turun */}
          <button
            type="button"
            onClick={() => {
              playFlyerSound('flap');
              setBirdOffset('down');
            }}
            className="cpj41-card-btn"
            style={{
              flex: 1,
              borderRadius: 24,
              background: TEAL_SOFT,
              border: `3.5px solid ${TEAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <JuniorIcon name="arrow-down" size={56} />
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: '#047857' }}>
                Terbang Turun
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <Scratch3HatKeyBlock keyLabel="down arrow" scale={1.1} />
              <Scratch3StatementBlock color={SCRATCH_BLUE} scale={1.1}>
                <span>change y by (-20)</span>
              </Scratch3StatementBlock>
            </div>

            <div style={{ padding: '12px 22px', borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 25, fontWeight: 800 }}>
              Tekan Panah Bawah -&gt; <strong>Terbang Turun!</strong>
            </div>
          </button>
        </div>
      </MacWindowCard>

      {/* Right Flying Parrot + Biko Feedback */}
      <div style={{ ...abs(1485, 290, 350, 640), ...centerCol, justifyContent: 'space-between' }}>
        <div
          style={{
            transform: birdOffset === 'up' ? 'translateY(-36px)' : birdOffset === 'down' ? 'translateY(36px)' : 'translateY(0px)',
            transition: 'transform 220ms ease-out',
          }}
        >
          <ParrotSpriteSvg size={160} wingsUp={birdOffset !== 'down'} />
        </div>
        <BikoMascot
          pose="point-left"
          width={295}
          badgeIcon={<JuniorIcon name="keyboard" size={22} />}
          speechBubble={birdOffset === 'up' ? 'Naik +20!' : birdOffset === 'down' ? 'Turun -20!' : 'Klik kartu!'}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus #2: Awan Meluncur Otomatis di Langit!
// ============================================================================
const Slide05AwanMeluncur: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="KODE AWAN • GERAK OTOMATIS" accentDot={SCRATCH_CTRL}>
      <SlideTitle>
        Bikin <Highlight>Awan Meluncur</Highlight> Terus!
      </SlideTitle>

      {/* Left Animated Cloud Sky & Stack */}
      <MacWindowCard
        left={X0}
        top={245}
        width={820}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Skrip Sprite: Clouds"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              width: '100%',
              height: 245,
              borderRadius: 20,
              border: `3px solid ${CHARCOAL}`,
              background: 'linear-gradient(180deg, #60A5FA 0%, #BAE6FD 100%)',
              position: 'relative',
              overflow: 'hidden',
              ...row,
              justifyContent: 'center',
            }}
          >
            <svg width="86%" height="44" viewBox="0 0 600 44" style={{ position: 'absolute' }}>
              <path d="M40 22 Q200 4 360 24 T560 22" fill="none" stroke={WHITE} strokeWidth={5} strokeDasharray="12 10" strokeLinecap="round" />
            </svg>
            <div style={{ animation: live ? 'cpj41-cloud-drift 3.4s ease-in-out infinite' : undefined }}>
              <CloudObstacleSvg width={175} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
            <Scratch3HatFlagBlock scale={1.06} />
            <Scratch3ForeverCBlock scale={1.04}>
              <Scratch3StatementBlock color={SCRATCH_BLUE} scale={1.04}>
                <span>glide (2) secs to [random position]</span>
              </Scratch3StatementBlock>
            </Scratch3ForeverCBlock>
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
        headerLabel="Langkah Kode Awan"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <BulletRow icon="cloud-sun" bgColor={SKY_SOFT} fontSize={32}>
              Ketuk Sprite <strong>Awan</strong> (<em>Clouds</em>) di panel kanan bawah
            </BulletRow>
            <BulletRow icon="puzzle" bgColor={SUNNY_SOFT} fontSize={32}>
              Rangkai <code>when Bendera clicked</code> -&gt; <code>forever</code> memeluk <code>glide (2) secs to [random position]</code>!
            </BulletRow>
            <BulletRow icon="infinity" bgColor={TEAL_SOFT} fontSize={32}>
              Awan akan meluncur ke sana-kemari secara acak tanpa berhenti!
            </BulletRow>
          </div>

          <div style={{ ...row, gap: 22, padding: '16px 24px', borderRadius: 20, background: SKY_SOFT, border: `3px solid ${CHARCOAL}` }}>
            <BikoMascot pose="laptop" width={140} />
            <div style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.32 }}>
              Angka <code>2 secs</code> membuat kecepatan awan pas dan asyik untuk dihindari!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Blok Apa untuk Radar Awan?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle size={50} maxWidth={1680}>
        Blok Mana Biar Burung Tahu Kalau <Highlight>Menyentuh Awan?</Highlight>
      </SlideTitle>

      {/* Card A — Correct: touching [Clouds]? */}
      <button
        type="button"
        onClick={() => {
          playFlyerSound('win');
          setPicked('A');
        }}
        className="cpj41-card-btn"
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
            Sensor Sentuhan (Touching)
          </span>
        </div>

        <div style={{ ...row, gap: 22 }}>
          <CloudObstacleSvg width={115} />
          <Scratch3TouchingHexBlock target="Clouds" scale={1.32} highlightHex={picked === 'A'} />
        </div>

        <div style={{ ...row, gap: 12, minHeight: 54 }}>
          {picked === 'A' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={26} />
              <span>Benar! Blok ini mendeteksi sentuhan awan!</span>
            </div>
          ) : (
            <span style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Card B — Wrong: glide */}
      <button
        type="button"
        onClick={() => {
          playFlyerSound('boing');
          setPicked('B');
        }}
        className="cpj41-card-btn"
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
          animation: picked === 'B' ? 'cpj41-shake 320ms ease' : undefined,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 16, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
            B
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Blok Meluncur (Glide)
          </span>
        </div>

        <Scratch3StatementBlock color={SCRATCH_BLUE} scale={1.18}>
          <span>glide (2) secs to [random position]</span>
        </Scratch3StatementBlock>

        <div style={{ ...row, gap: 12, minHeight: 54 }}>
          {picked === 'B' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={26} />
              <span>Bukan! Itu untuk meluncur, bukan radar!</span>
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
        <div style={{ animation: live ? 'cpj41-float 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thinking" width={165} badgeIcon={<JuniorIcon name="question" size={22} />} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
          {picked === 'A'
            ? 'Tepat! touching [Clouds]? berbentuk segi enam sebagai radar sentuhan!'
            : picked === 'B'
              ? 'Ups! glide untuk meluncur. Cari blok Segi Enam touching ya!'
              : 'Tunjuk blok yang benar di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Jurus #3: Radar Sensor & Kepakan Sayap Burung!
// ============================================================================
const Slide07SayapDanSensor: Page = () => {
  const live = useIsActivePage();
  const [wingsUp, setWingsUp] = useState(true);

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => setWingsUp((w) => !w), 280);
    return () => clearInterval(t);
  }, [live]);

  return (
    <JuniorFrame badge="KODE BURUNG • ANIMASI & SENSOR" accentDot={LAVENDER}>
      <SlideTitle>
        Pasang <Highlight color="#EDE9FE">Sayap</Highlight> &amp;{' '}
        <Highlight color="#FEE2E2">Radar Sensor!</Highlight>
      </SlideTitle>

      {/* macOS Window with 2 Code Cards */}
      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Kode Lengkap Sprite Parrot"
        padding={32}
      >
        <div style={{ display: 'flex', gap: 30, height: '100%' }}>
          {/* Left Card — Wing Flap */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: LAVENDER_SOFT,
              border: `3.5px solid ${LAVENDER}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '24px 22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ ...row, gap: 12 }}>
              <ParrotSpriteSvg size={68} wingsUp={wingsUp} />
              <div style={{ padding: '6px 18px', borderRadius: 99, background: LAVENDER, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                Kepakan Sayap
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <Scratch3HatFlagBlock scale={0.9} />
              <Scratch3ForeverCBlock scale={0.9}>
                <Scratch3StatementBlock color={SCRATCH_LOOKS} scale={0.9}>
                  <span>next costume</span>
                </Scratch3StatementBlock>
                <Scratch3StatementBlock color={SCRATCH_CTRL} textColor={CHARCOAL} scale={0.9}>
                  <JuniorIcon name="wait" size={18} />
                  <span>wait (0.2) seconds</span>
                </Scratch3StatementBlock>
              </Scratch3ForeverCBlock>
            </div>

            <div style={{ padding: '10px 20px', borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 24, fontWeight: 800 }}>
              Sayap mengepak <strong>Terus-Menerus!</strong>
            </div>
          </div>

          {/* Right Card — Cloud Radar */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: CORAL_SOFT,
              border: `3.5px solid ${CORAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '24px 22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ ...row, gap: 12 }}>
              <JuniorIcon name="compass" size={50} />
              <div style={{ padding: '6px 18px', borderRadius: 99, background: CORAL, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                Radar Awan
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <Scratch3HatFlagBlock scale={0.86} />
              <Scratch3ForeverCBlock scale={0.84}>
                <Scratch3IfThenCBlock scale={0.82} condition={<Scratch3TouchingHexBlock target="Clouds" scale={0.82} />}>
                  <Scratch3StatementBlock color={SCRATCH_SOUND} scale={0.82}>
                    <JuniorIcon name="speaker" size={16} />
                    <span>start sound [Boing]</span>
                  </Scratch3StatementBlock>
                  <Scratch3StatementBlock color={SCRATCH_LOOKS} scale={0.82}>
                    <span>say [Awas awan!] for (1) seconds</span>
                  </Scratch3StatementBlock>
                </Scratch3IfThenCBlock>
              </Scratch3ForeverCBlock>
            </div>

            <div style={{ padding: '10px 20px', borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 24, fontWeight: 800 }}>
              Kena Awan -&gt; <strong>Ada Peringatan!</strong>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Biko Anchor */}
      <div style={{ ...abs(1485, 360, 350, 560), ...centerCol }}>
        <BikoMascot
          pose="thumbs-up"
          width={305}
          badgeIcon={<JuniorIcon name="bird" size={22} />}
          speechBubble="2 kode sekaligus!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Pembuat Flyer Game (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsFlyer: Page = () => {
  return (
    <JuniorFrame badge="TIPS GAME TERBANG TINGGI" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Game Terbangmu <Highlight>Makin Asyik!</Highlight>
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
            <BulletRow icon="bird" bgColor={TEAL_SOFT} fontSize={29}>
              Kecilkan ukuran Burung (<strong><code>Size: 50</code></strong>) agar mudah menyelinap
            </BulletRow>
            <BulletRow icon="cloud-sun" bgColor={SKY_SOFT} fontSize={29}>
              Pilih nama <strong><code>Clouds</code></strong> di dalam blok sensor <code>touching</code>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: 'linear-gradient(180deg, #93C5FD 0%, #E0F2FE 100%)', border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <ParrotSpriteSvg size={95} wingsUp />
            <CloudObstacleSvg width={135} />
            <JuniorIcon name="check" size={60} />
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
            <BulletRow icon="grow" bgColor={CORAL_SOFT} fontSize={29}>
              Membiarkan Burung <strong>Terlalu Besar</strong> memenuhi langit
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={29}>
              Lupa membungkus sensor <code>if</code> di dalam blok <strong><code>forever</code></strong>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px', overflow: 'hidden' }}>
            <ParrotSpriteSvg size={205} wingsUp={false} />
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Mainkan Game Terbang Tinggi!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [birdY, setBirdY] = useState(50);
  const [wingsUp, setWingsUp] = useState(true);
  const [running, setRunning] = useState(true);
  const [cloudPos, setCloudPos] = useState({ x: 76, y: 42 });

  const hitCloud = Math.hypot(26 - cloudPos.x, birdY - cloudPos.y) < 19;

  useEffect(() => {
    if (!live || !running) return;
    const flapTimer = setInterval(() => setWingsUp((w) => !w), 240);
    const cloudTargets = [
      { x: 78, y: 26 },
      { x: 30, y: 36 },
      { x: 72, y: 72 },
      { x: 28, y: 66 },
    ];
    let idx = 0;
    const glideTimer = setInterval(() => {
      idx = (idx + 1) % cloudTargets.length;
      setCloudPos(cloudTargets[idx]);
    }, 1700);
    return () => {
      clearInterval(flapTimer);
      clearInterval(glideTimer);
    };
  }, [live, running]);

  useEffect(() => {
    if (live && hitCloud) {
      playFlyerSound('boing');
    }
  }, [live, hitCloud]);

  const moveBirdY = (dy: number) => {
    playFlyerSound('flap');
    setBirdY((prev) => Math.max(16, Math.min(84, prev + dy)));
  };

  useEffect(() => {
    if (!live) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveBirdY(-12);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveBirdY(12);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [live]);

  return (
    <JuniorFrame badge="AYO BUAT & MAIN!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Game Burung Terbang!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'cloud-sun' as JuniorIconName,
            text: (
              <>
                Pasang latar <strong>Langit</strong>, <strong>Burung (Size 50)</strong>, &amp; <strong>Awan</strong>
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
                Rangkai kode <strong>Kemudi Naik-Turun</strong>, <strong>Awan Meluncur</strong>, &amp; <strong>Sensor</strong>
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
                Klik <strong>Bendera Hijau!</strong> Tekan Panah Atas/Bawah &amp; hindari awan!
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

      {/* Playable Interactive Scratch 3.0 Flyer Game Simulator */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratch3FlyerUI
          birdY={birdY}
          wingsUp={wingsUp}
          cloudPos={cloudPos}
          hitCloud={hitCloud}
          running={live && running}
          onMoveY={moveBirdY}
          onToggleRun={() => setRunning((r) => !r)}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Scratch Cat */}
      <div style={{ ...abs(1405, 415, 435, 535), ...centerCol, gap: 12 }}>
        <div style={{ ...row, alignItems: 'flex-end', animation: live ? 'cpj41-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose={hitCloud ? 'thinking' : 'thumbs-up'}
            width={265}
            badgeIcon={<JuniorIcon name="bird" size={22} />}
            speechBubble={hitCloud ? 'Awas awan!' : 'Lincah sekali!'}
          />
          <ScratchCatSvg size={130} waving />
        </div>
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="cpj41-card-btn"
          style={{
            padding: '13px 26px',
            borderRadius: 20,
            background: running ? TEAL : SUNNY,
            color: running ? WHITE : CHARCOAL,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          <JuniorIcon name={running ? 'stop' : 'flag'} size={24} />
          <span>{running ? 'Jeda Game Terbang' : 'Mulai Terbang!'}</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 41 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj41-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj41-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="bird" size={50} />
      </div>

      <SlideTitle top={135} size={56} align="center" maxWidth={1620}>
        Hore! Kamu Pilot &amp; Pembuat <Highlight>Flyer Game Hebat!</Highlight>
      </SlideTitle>

      {/* Center Celebration Window */}
      <MacWindowCard
        left={240}
        top={260}
        width={1060}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 41"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, gap: 22, textAlign: 'center' }}>
          {/* Golden Pilot Wings + Cloud Medal */}
          <div style={{ animation: live ? 'cpj41-float 2.6s ease-in-out infinite' : undefined }}>
            <svg width={225} height={215} viewBox="0 0 220 210">
              {/* Pilot Wings */}
              <path d="M40 90 L8 72 L22 104 L46 112 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
              <path d="M180 90 L212 72 L198 104 L174 112 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
              {/* Ribbon */}
              <path d="M77 128 L57 195 L87 180 L101 198 L111 135 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M143 128 L163 195 L133 180 L119 198 L109 135 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              {/* Gold Circle */}
              <circle cx="110" cy="96" r="70" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="110" cy="96" r="54" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.2} />
              {/* Sky Cloud + Star */}
              <path
                d="M78 112 C69 112, 65 103, 71 96 C70 86, 80 81, 89 85 C94 74, 112 73, 118 84 C129 82, 139 89, 136 100 C141 106, 135 112, 126 112 Z"
                fill={WHITE}
                stroke={CHARCOAL}
                strokeWidth={3.2}
                strokeLinejoin="round"
              />
              <polygon
                points="146,56 150,65 160,67 153,74 155,84 146,79 137,84 139,74 132,67 142,65"
                fill={CORAL}
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
            <span>Lencana Master Flyer Game Scratch 3.0</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.38,
              maxWidth: 940,
              color: CHARCOAL,
            }}
          >
            Kamu sudah berhasil menggabungkan{' '}
            <Highlight color="#DBEAFE">Keyboard, Gerak Otomatis, &amp; Sensor!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko, Scratch Cat & Parrot Celebrating */}
      <div style={{ ...abs(1335, 340, 520, 610), ...centerCol }}>
        <div style={{ marginBottom: 10, animation: live ? 'cpj41-float 2s ease-in-out infinite' : undefined }}>
          <ParrotSpriteSvg size={135} wingsUp pilotGoggles />
        </div>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={285}
            badgeIcon={<JuniorIcon name="trophy" size={22} />}
            speechBubble="Pilot Juara!"
          />
          <div style={{ animation: live ? 'cpj41-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <ScratchCatSvg size={175} waving />
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
  `Selamat datang di Pertemuan 41 — Misi Terbang Tinggi (Flyer Game)! 🦜☁️
Hari ini anak-anak membuat game Flyer pertama di Scratch 3.0: mengendalikan Burung Kakaktua terbang naik-turun menghindari rintangan Awan!`,

  `Dua misi seru hari ini:
1. Mengendalikan Burung terbang naik & turun memakai panah keyboard.
2. Menghindari rintangan Awan yang meluncur otomatis memakai sensor sentuhan!`,

  `Langkah 1 — Siapkan 3 Bahan Utama Game:
- Latar panggung: Langit Biru (Blue Sky)
- Sprite Parrot: ubah Size jadi 50 biar mungil dan lincah!
- Sprite Clouds sebagai rintangan awan.`,

  `Jurus 1 — Kemudi Terbang Naik & Turun:
- when [up arrow] key pressed -> change y by (20) untuk Terbang Naik!
- when [down arrow] key pressed -> change y by (-20) untuk Terbang Turun!`,

  `Jurus 2 — Awan Meluncur Otomatis:
Ketuk Sprite Clouds, lalu rangkai: when Bendera clicked -> forever memeluk glide (2) secs to [random position]!`,

  `Permainan Cepat! Ayo tebak bersama:
Blok mana yang memberi tahu Burung kalau menyentuh Awan — Pilihan A (Sensor Segi Enam touching [Clouds]?) atau Pilihan B (Blok Meluncur glide)?`,

  `Jurus 3 — Pasang Sayap & Radar Sensor pada Parrot:
- Kepakan Sayap: forever -> next costume + wait (0.2) seconds.
- Radar Awan: forever -> if <touching [Clouds]?> then -> start sound [Boing] + say [Awas awan!] for (1) seconds.`,

  `Tips Jagoan Pembuat Flyer Game:
BOLEH mengecilkan Burung jadi Size 50 dan pilih nama Clouds di blok touching.
JANGAN biarkan Burung terlalu besar memenuhi layar, dan jangan lupa membungkus if di dalam forever!`,

  `Misi Praktik Game Burung Terbang!
Gunakan tombol Panah Atas & Panah Bawah di keyboard (atau tombol klik di layar) untuk menerbangkan Parrot dan menghindari Awan yang meluncur otomatis!`,

  `Hore! Kamu Pilot & Pembuat Flyer Game Hebat! 🎉🏅
Selamat meraih Lencana Master Flyer Game Scratch 3.0 karena berhasil menggabungkan Keyboard, Gerak Otomatis, & Sensor!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 41 — Misi Terbang Tinggi (Flyer Game)!',
  createdAt: '2026-11-16T15:50:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BahanUtama,
  Slide04KemudiNaikTurun,
  Slide05AwanMeluncur,
  Slide06AyoTebak,
  Slide07SayapDanSensor,
  Slide08TipsFlyer,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

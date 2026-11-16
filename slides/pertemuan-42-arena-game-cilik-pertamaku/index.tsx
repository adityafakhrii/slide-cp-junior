import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-42-arena-game-cilik-pertamaku';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj42-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj42-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj42-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj42-cloud-drift {
  0% { transform: translateX(0px); }
  50% { transform: translateX(-42px); }
  100% { transform: translateX(0px); }
}
@keyframes cpj42-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.75); }
  50% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
}
@keyframes cpj42-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj42-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj42-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj42-card-btn:hover {
  transform: translateY(-4px);
}
.cpj42-card-btn:active {
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
function playArenaSound(kind: 'win' | 'boing' | 'click') {
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
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.28);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.34);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
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
      osc.frequency.setValueAtTime(620, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    }
    setTimeout(() => {
      void ctx.close();
    }, 400);
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
          animation: live ? 'cpj42-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 42 • Arena Game Cilik Pertamaku!</span>
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
// Reusable Pertemuan 42 Visuals (Parrot, Clouds, Cat, Gold Gamepad, Blocks)
// ============================================================================

const ParrotSpriteSvg = ({ size = 112, wingsUp = true }: { size?: number; wingsUp?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <path d="M18 82 L44 74 L38 96 Z" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
    <path d="M12 72 L40 68 L36 86 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
    <path d={wingsUp ? 'M54 58 C42 22, 72 14, 86 44 Z' : 'M54 74 C44 106, 74 114, 84 82 Z'} fill={TEAL} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
    <ellipse cx="70" cy="74" rx="31" ry="23" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="76" cy="80" rx="18" ry="12" fill={SUNNY} />
    <circle cx="92" cy="52" r="22" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.8} />
    <path d="M84 31 C80 18, 92 16, 96 30 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
    <circle cx="97" cy="49" r="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
    <circle cx="99" cy="49" r="4.2" fill={CHARCOAL} />
    <path d="M111 49 C128 49, 130 66, 114 68 L108 58 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
    <path d={wingsUp ? 'M52 68 C32 34, 72 28, 80 62 Z' : 'M52 72 C34 104, 72 108, 78 76 Z'} fill={SKY} stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
  </svg>
);

const CloudObstacleSvg = ({ width = 132, alertGlow = false }: { width?: number; alertGlow?: boolean }) => (
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

const ScratchCatSvg = ({ size = 115, clapping = false }: { size?: number; clapping?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <ellipse cx="70" cy="128" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path d="M40 100 C20 96, 14 78, 25 69 C32 63, 38 71, 35 78 C33 83, 38 90, 46 90" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <ellipse cx="56" cy="120" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="120" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="70" cy="96" rx="25" ry="23" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="98" rx="14" ry="14" fill={WHITE} />
    <path d={clapping ? 'M46 84 C32 72, 34 56, 44 56 C50 56, 52 68, 52 78' : 'M46 86 C35 90, 35 103, 45 103'} fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d={clapping ? 'M94 84 C108 72, 106 56, 96 56 C90 56, 88 68, 88 78' : 'M94 86 C105 90, 105 103, 95 103'} fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
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

const Scratch3TouchingHexBlock = ({ target = 'Clouds', scale = 1 }: { target?: string; scale?: number }) => (
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
      filter: 'drop-shadow(0 2px 0 rgba(30,30,44,0.85))',
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      whiteSpace: 'nowrap',
    }}
  >
    <span>touching</span>
    <span style={{ padding: `${Math.round(2 * scale)}px ${Math.round(10 * scale)}px`, borderRadius: 99, background: '#3D94B8', border: `2px solid ${WHITE}`, color: WHITE, fontSize: Math.round(16 * scale), ...row, gap: 4 }}>
      <span>{target}</span>
      <span style={{ fontSize: Math.round(12 * scale) }}>v</span>
    </span>
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
      <div style={{ width: Math.round(165 * s), height: Math.round(26 * s), borderRadius: `4px ${Math.round(12 * s)}px ${Math.round(12 * s)}px ${Math.round(12 * s)}px`, background: SCRATCH_CTRL, border: `2.8px solid ${CHARCOAL}` }} />
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
      <div style={{ ...row, justifyContent: 'flex-end', paddingRight: Math.round(12 * s), width: Math.round(220 * s), height: Math.round(30 * s), borderRadius: `4px ${Math.round(14 * s)}px ${Math.round(14 * s)}px ${Math.round(14 * s)}px`, background: SCRATCH_CTRL, border: `2.8px solid ${CHARCOAL}` }}>
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
  const [wingsUp, setWingsUp] = useState(true);

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => setWingsUp((w) => !w), 260);
    return () => clearInterval(t);
  }, [live]);

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 42" accentDot={SUNNY}>
      {/* Left Hero Copy */}
      <div style={{ ...abs(X0, 225, 860) }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 20px',
            borderRadius: 99,
            background: SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 22,
          }}
        >
          <JuniorIcon name="gamepad" size={26} />
          <span>Pameran &amp; Uji Coba Game Scratch 3.0</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          <Highlight>Arena Game</Highlight>
          <br />
          <Highlight>Cilik</Highlight> Pertamaku!
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
          Uji Coba &amp; <strong style={{ color: CHARCOAL }}>Pameran Proyek Flyer Game</strong>{' '}
          Scratch 3.0 di Kelas!
        </p>

        <div style={{ ...row, gap: 16, marginTop: 34 }}>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="magnifier" size={24} />
            <span>Detektif Bug</span>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="fullscreen" size={24} />
            <span>Pameran Kelas</span>
          </div>
        </div>
      </div>

      {/* Right Visual: Biko + Scratch Cat + Big Flyer Game Screen */}
      <MacWindowCard
        left={1010}
        top={185}
        width={810}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Panggung Arena Game Cilik"
        padding={26}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 20,
            border: `3px solid ${CHARCOAL}`,
            background: 'linear-gradient(180deg, #60A5FA 0%, #BAE6FD 64%, #DCFCE7 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ ...abs(34, 24), animation: live ? 'cpj42-confetti 2.4s ease-in-out infinite' : undefined }}>
            <JuniorIcon name="party" size={50} />
          </div>
          <div style={{ ...abs(500, 68), animation: live ? 'cpj42-cloud-drift 3.8s ease-in-out infinite' : undefined }}>
            <CloudObstacleSvg width={180} />
          </div>
          <div style={{ ...abs(265, 130), animation: live ? 'cpj42-float 2.2s ease-in-out infinite' : undefined }}>
            <ParrotSpriteSvg size={160} wingsUp={wingsUp} />
          </div>

          {/* Biko with Gamepad Badge & Clapping Scratch Cat */}
          <div style={{ ...abs(18, 250), animation: live ? 'cpj42-hop 2.6s ease-in-out infinite' : undefined }}>
            <BikoMascot
              pose="thumbs-up"
              width={235}
              badgeIcon={<JuniorIcon name="gamepad" size={20} />}
              speechBubble="Mainkan yuk!"
            />
          </div>
          <div style={{ ...abs(555, 360), animation: live ? 'cpj42-hop 2.1s ease-in-out infinite' : undefined }}>
            <ScratchCatSvg size={175} clapping />
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
        Apa Misi Kita di <Highlight>Arena Game Cilik?</Highlight>
      </SlideTitle>

      {/* Biko Left Anchor */}
      <div style={{ ...abs(95, 295, 360, 620), ...centerCol }}>
        <div style={{ animation: live ? 'cpj42-hop 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="point-left"
            width={320}
            badgeIcon={<JuniorIcon name="trophy" size={22} />}
            speechBubble="Hari Pameran!"
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
        headerLabel="Misi Pertemuan 42"
        padding={42}
      >
        <div style={{ display: 'flex', gap: 36, height: '100%' }}>
          {/* Card 1: Debug Simple Bugs */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SUNNY_SOFT,
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
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ ...row, gap: 18, padding: '18px 0' }}>
              <JuniorIcon name="magnifier" size={88} />
              <JuniorIcon name="check" size={76} />
            </div>

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Uji Coba &amp; Perbaiki <span style={{ color: '#B45309' }}>Bug Sederhana</span>
            </div>
          </div>

          {/* Card 2: Showcase Game */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: TEAL_SOFT,
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
            <div style={{ padding: '8px 22px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ ...row, gap: 18, padding: '18px 0' }}>
              <JuniorIcon name="fullscreen" size={74} />
              <ParrotSpriteSvg size={125} wingsUp />
            </div>

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              <span style={{ color: '#047857' }}>Pamerkan Game</span> Pertamamu di Layar Kelas!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Kamus Coder Cilik: Apa Itu "Bug"?
// ============================================================================
const Slide03KamusBug: Page = () => {
  const [fixed, setFixed] = useState(false);

  return (
    <JuniorFrame badge="KAMUS CODER CILIK" accentDot={CORAL}>
      <SlideTitle>
        Apa Itu <Highlight>Bug</Highlight> dalam Game?
      </SlideTitle>

      {/* Left Visual: Bug on loose blocks vs Biko fixing them */}
      <MacWindowCard
        left={X0}
        top={245}
        width={820}
        height={680}
        titleBarColor={CORAL_SOFT}
        headerLabel={fixed ? 'Kode Sudah Rapi!' : 'Ada Bug di Kode!'}
        padding={32}
      >
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 26, alignItems: 'center' }}>
            <BikoMascot pose="detective" width={215} speechBubble={fixed ? 'Berhasil!' : 'Ketemu bug!'} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: fixed ? 4 : 26, transition: 'gap 240ms ease' }}>
              <div style={{ position: 'relative' }}>
                <Scratch3HatFlagBlock scale={1.06} />
                {!fixed && (
                  <div style={{ position: 'absolute', right: -44, top: -24 }}>
                    <JuniorIcon name="bug" size={56} />
                  </div>
                )}
              </div>
              <div style={{ transform: fixed ? 'translateX(0px)' : 'translateX(18px) rotate(4deg)', transition: 'transform 240ms ease' }}>
                <Scratch3StatementBlock color={SCRATCH_BLUE} scale={1.06}>
                  <span>glide (2) secs to [random]</span>
                </Scratch3StatementBlock>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playArenaSound(fixed ? 'click' : 'win');
              setFixed((f) => !f);
            }}
            className="cpj42-card-btn"
            style={{
              padding: '14px 32px',
              borderRadius: 20,
              background: fixed ? TEAL : SUNNY,
              color: fixed ? WHITE : CHARCOAL,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 25,
              fontWeight: 700,
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name={fixed ? 'check' : 'wrench'} size={28} />
            <span>{fixed ? 'Bug Berhasil Diperbaiki!' : 'Klik untuk Debugging (Pasang Rapi)!'}</span>
          </button>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={960}
        top={245}
        width={860}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Kamus Coder Cilik"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="bug" bgColor={CORAL_SOFT} fontSize={32}>
              <strong>Bug:</strong> Kesalahan kecil yang bikin game <strong>Tidak Jalan Sesuai Rencana</strong>
            </BulletRow>
            <BulletRow icon="wrench" bgColor={TEAL_SOFT} fontSize={32}>
              <strong>Debugging:</strong> Jurus detektif <strong>Memperbaiki Kode</strong> sampai gamenya lancar!
            </BulletRow>
          </div>

          <div style={{ padding: '20px 26px', borderRadius: 20, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 16, fontSize: 26, fontWeight: 800 }}>
            <JuniorIcon name="bulb" size={34} />
            <span>Coder hebat tidak takut bug — bug itu teka-teki seru untuk dipecahkan!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Daftar Cek Game: Sudah Siap Main?
// ============================================================================
const Slide04DaftarCek: Page = () => {
  const [checks, setChecks] = useState([true, true, true]);
  const toggleCheck = (idx: number) => {
    playArenaSound('click');
    setChecks((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };

  return (
    <JuniorFrame badge="UJI COBA GAME (PLAYTEST)" accentDot={TEAL}>
      <SlideTitle>
        Cek <Highlight>3 Bagian</Highlight> Gamemu!
      </SlideTitle>

      {/* Left Interactive Playtest Checklist Window */}
      <MacWindowCard
        left={X0}
        top={240}
        width={1180}
        height={710}
        titleBarColor={TEAL_SOFT}
        headerLabel="Klik Kotak Setelah Kamu Mengujinya!"
        padding={36}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {[
            {
              idx: 0,
              label: 'Cek 1 • Kemudi Panah Atas / Bawah',
              desc: 'Burung bisa terbang Naik & Turun saat tombol ditekan?',
              icon: 'keyboard' as JuniorIconName,
              bg: SKY_SOFT,
            },
            {
              idx: 1,
              label: 'Cek 2 • Gerak Awan & Kepakan Sayap',
              desc: 'Awan Meluncur terus & sayap Burung Mengepak?',
              icon: 'cloud-sun' as JuniorIconName,
              bg: SUNNY_SOFT,
            },
            {
              idx: 2,
              label: 'Cek 3 • Radar Sensor Awan',
              desc: 'Ada Suara & Balon Kata saat menyentuh awan?',
              icon: 'compass' as JuniorIconName,
              bg: TEAL_SOFT,
            },
          ].map((item) => (
            <button
              key={item.idx}
              type="button"
              onClick={() => toggleCheck(item.idx)}
              className="cpj42-card-btn"
              style={{
                borderRadius: 22,
                background: checks[item.idx] ? item.bg : '#F8FAFC',
                border: `3.5px solid ${checks[item.idx] ? CHARCOAL : '#CBD5E1'}`,
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
                    {item.label}
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

      {/* Right Flyer Preview + Progress */}
      <MacWindowCard
        left={1315}
        top={240}
        width={505}
        height={710}
        titleBarColor={SKY_SOFT}
        headerLabel="Status Siap Tampil"
        padding={28}
      >
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-between', textAlign: 'center' }}>
          <div style={{ width: '100%', height: 240, borderRadius: 20, border: `3px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #60A5FA 0%, #BAE6FD 100%)', position: 'relative', overflow: 'hidden', ...row, justifyContent: 'space-around', padding: '0 16px' }}>
            <ParrotSpriteSvg size={105} wingsUp />
            <CloudObstacleSvg width={125} />
          </div>

          <div style={{ padding: '14px 28px', borderRadius: 99, background: checks.every(Boolean) ? TEAL : SUNNY, color: checks.every(Boolean) ? WHITE : CHARCOAL, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
            {checks.every(Boolean) ? '3/3 Siap Dipamerkan!' : `${checks.filter(Boolean).length}/3 Dicek`}
          </div>

          <BikoMascot pose={checks.every(Boolean) ? 'jump' : 'thinking'} width={230} speechBubble={checks.every(Boolean) ? 'Mantap!' : 'Cek lagi!'} />
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Bengkel Bug: Jurus Cepat Memperbaiki!
// ============================================================================
const Slide05BengkelBug: Page = () => {
  return (
    <JuniorFrame badge="BENGKEL BUG SEDERHANA" accentDot={SUNNY}>
      <SlideTitle>
        Ketemu <Highlight>Bug?</Highlight> Yuk Perbaiki!
      </SlideTitle>

      {/* Left Mac Window with Top & Bottom Repair Cards */}
      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Bengkel Perbaikan Kode"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 26 }}>
          {/* Top Card: Radar not working */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: CORAL_SOFT,
              border: `3.5px solid ${CORAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              padding: '24px 32px',
              ...row,
              justifyContent: 'space-between',
              gap: 28,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ padding: '6px 18px', borderRadius: 99, background: CORAL, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700, display: 'inline-block', marginBottom: 12 }}>
                Jika Radar Awan Tidak Menyala
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.34, color: CHARCOAL }}>
                <JuniorIcon name="wrench" size={28} style={{ marginRight: 10 }} />
                Pastikan blok <code>if touching [Clouds]</code> ada{' '}
                <strong style={{ color: '#B91C1C' }}>Di Dalam forever</strong> &amp; pilih nama{' '}
                <strong><code>Clouds</code></strong>!
              </div>
            </div>
            <Scratch3ForeverCBlock scale={0.78}>
              <Scratch3IfThenCBlock scale={0.78} condition={<Scratch3TouchingHexBlock target="Clouds" scale={0.78} />} />
            </Scratch3ForeverCBlock>
          </div>

          {/* Bottom Card: Bird too big */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3.5px solid ${SKY}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              padding: '24px 32px',
              ...row,
              justifyContent: 'space-between',
              gap: 28,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ padding: '6px 18px', borderRadius: 99, background: SKY, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700, display: 'inline-block', marginBottom: 12 }}>
                Jika Burung Susah Menghindar
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.34, color: CHARCOAL }}>
                <JuniorIcon name="wrench" size={28} style={{ marginRight: 10 }} />
                Ubah ukuran <strong><code>Size</code></strong> Burung menjadi{' '}
                <strong style={{ color: '#1D4ED8' }}>50</strong> agar mungil dan lincah!
              </div>
            </div>
            <div style={{ padding: '18px 28px', borderRadius: 20, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 5px 0 ${CHARCOAL}`, ...row, gap: 16 }}>
              <ParrotSpriteSvg size={76} wingsUp />
              <div style={{ padding: '8px 18px', borderRadius: 14, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
                Size: 50
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Biko Mechanic */}
      <div style={{ ...abs(1485, 340, 350, 580), ...centerCol }}>
        <BikoMascot
          pose="thumbs-up"
          width={310}
          badgeIcon={<JuniorIcon name="wrench" size={22} />}
          speechBubble="Semua beres!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Detektif Bug (Awan Meluncur 1 Kali Lalu Diam)
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle top={124} size={46} maxWidth={1680}>
        Ups! Awan Hanya Meluncur <Highlight>1 Kali</Highlight> Lalu Diam! Blok Apa yang Kurang?
      </SlideTitle>

      {/* Problem Snippet Strip */}
      <div
        style={{
          ...abs(X0, 210, W, 110),
          borderRadius: 22,
          background: CORAL_SOFT,
          border: `3px solid ${CORAL}`,
          ...row,
          justifyContent: 'center',
          gap: 18,
          padding: '0 24px',
        }}
      >
        <Scratch3HatFlagBlock scale={0.92} />
        <JuniorIcon name="arrow-right" size={32} />
        <Scratch3StatementBlock color={SCRATCH_BLUE} scale={0.92}>
          <span>glide (2) secs to [random position]</span>
        </Scratch3StatementBlock>
        <span style={{ padding: '6px 16px', borderRadius: 99, background: CORAL, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>
          Berhenti setelah 1 kali!
        </span>
      </div>

      {/* Card A — Correct: Forever */}
      <button
        type="button"
        onClick={() => {
          playArenaSound('win');
          setPicked('A');
        }}
        className="cpj42-card-btn"
        style={{
          ...abs(X0, 345, 820, 415),
          borderRadius: 30,
          background: picked === 'A' ? TEAL_SOFT : WHITE,
          border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 50, height: 50, borderRadius: 16, background: SUNNY, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, ...centerCol }}>
            A
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
            Bungkus Pakai Forever
          </span>
        </div>

        <Scratch3ForeverCBlock scale={0.86}>
          <Scratch3StatementBlock color={SCRATCH_BLUE} scale={0.86}>
            <span>glide (2) secs to [random position]</span>
          </Scratch3StatementBlock>
        </Scratch3ForeverCBlock>

        <div style={{ minHeight: 46, ...row }}>
          {picked === 'A' ? (
            <div style={{ padding: '8px 22px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Forever bikin awan terus meluncur!</span>
            </div>
          ) : (
            <span style={{ fontSize: 22, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Card B — Wrong: start sound Meow */}
      <button
        type="button"
        onClick={() => {
          playArenaSound('boing');
          setPicked('B');
        }}
        className="cpj42-card-btn"
        style={{
          ...abs(1000, 345, 820, 415),
          borderRadius: 30,
          background: picked === 'B' ? CORAL_SOFT : WHITE,
          border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          animation: picked === 'B' ? 'cpj42-shake 320ms ease' : undefined,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 50, height: 50, borderRadius: 16, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, ...centerCol }}>
            B
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
            Tambah Suara Meow
          </span>
        </div>

        <Scratch3StatementBlock color={SCRATCH_SOUND} scale={1.15}>
          <JuniorIcon name="speaker" size={24} />
          <span>start sound [Meow]</span>
        </Scratch3StatementBlock>

        <div style={{ minHeight: 46, ...row }}>
          {picked === 'B' ? (
            <div style={{ padding: '8px 22px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Bukan! Itu cuma suara, awannya tetap diam!</span>
            </div>
          ) : (
            <span style={{ fontSize: 22, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Bottom Biko Prompt Bar */}
      <div
        style={{
          ...abs(X0, 790, W, 185),
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
        <div style={{ animation: live ? 'cpj42-float 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thinking" width={155} badgeIcon={<JuniorIcon name="question" size={22} />} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
          {picked === 'A'
            ? 'Jagoan Detektif! Bungkus glide di dalam forever supaya terus berulang!'
            : picked === 'B'
              ? 'Ups! Suara Meow tidak menggerakkan awan. Pilih blok pengulangan!'
              : 'Tunjuk solusi yang benar di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Siapkan Panggung: Tombol Layar Penuh Scratch 3.0!
// ============================================================================
const Slide07LayarPenuh: Page = () => {
  const live = useIsActivePage();
  const [fullPreview, setFullPreview] = useState(false);

  return (
    <JuniorFrame badge="SIAP PAMERAN KELAS" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Buka <Highlight>Layar Penuh</Highlight> Biar Makin Seru!
      </SlideTitle>

      {/* Left Spotlight UI: Full Screen Control */}
      <MacWindowCard
        left={X0}
        top={245}
        width={840}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Pojok Kanan Atas Stage Scratch 3.0"
        padding={28}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Stage Top Toolbar highlighting Fullscreen button */}
          <div style={{ ...row, justifyContent: 'space-between', padding: '10px 18px', borderRadius: 16, background: '#F8FAFC', border: `2.5px solid ${CHARCOAL}` }}>
            <div style={{ ...row, gap: 12 }}>
              <JuniorIcon name="flag" size={30} />
              <JuniorIcon name="stop" size={30} />
            </div>

            <button
              type="button"
              onClick={() => {
                playArenaSound('click');
                setFullPreview((f) => !f);
              }}
              className="cpj42-card-btn"
              style={{
                padding: '10px 18px',
                borderRadius: 14,
                background: SUNNY,
                border: `3.5px solid ${CHARCOAL}`,
                animation: live ? 'cpj42-pulse 1.8s infinite' : undefined,
                ...row,
                gap: 10,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="fullscreen" size={28} />
              <span>{fullPreview ? 'Kecilkan' : 'Layar Penuh!'}</span>
            </button>
          </div>

          {/* Stage Canvas Preview */}
          <div
            style={{
              flex: 1,
              borderRadius: 20,
              border: `3.5px solid ${CHARCOAL}`,
              background: 'linear-gradient(180deg, #60A5FA 0%, #BAE6FD 72%, #DCFCE7 100%)',
              position: 'relative',
              overflow: 'hidden',
              transform: fullPreview ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 220ms ease',
            }}
          >
            <div style={{ ...abs(fullPreview ? 220 : 120, 120) }}>
              <ParrotSpriteSvg size={fullPreview ? 165 : 125} wingsUp />
            </div>
            <div style={{ ...abs(470, 90) }}>
              <CloudObstacleSvg width={fullPreview ? 195 : 155} />
            </div>
            <div style={{ ...abs(20, 260) }}>
              <BikoMascot pose="point-left" width={185} speechBubble="Klik pojok kanan atas!" />
            </div>
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
        headerLabel="Cara Pameran Layar Penuh"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="fullscreen" bgColor={SUNNY_SOFT} fontSize={32}>
              Klik ikon <strong>4 Panah Keluar</strong> di pojok kanan atas Panggung
            </BulletRow>
            <BulletRow icon="flag" bgColor={TEAL_SOFT} fontSize={32}>
              Tekan <strong>Bendera Hijau</strong> &amp; tunjukkan karyamu di layar kelas!
            </BulletRow>
          </div>

          <div style={{ padding: '20px 26px', borderRadius: 20, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 16, fontSize: 26, fontWeight: 800 }}>
            <JuniorIcon name="sparkle" size={34} />
            <span>Dalam mode Layar Penuh, game buatanmu tampil besar seperti game arcade asli!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan di Arena Game Cilik (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsArena: Page = () => {
  return (
    <JuniorFrame badge="ATURAN ARENA GAME" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Tampil &amp; Menonton <Highlight>Makin Seru!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & HEBAT"
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
            <BulletRow icon="happy" bgColor={TEAL_SOFT} fontSize={29}>
              <strong>Tetap Tenang</strong> &amp; perbaiki pelan-pelan jika ketemu bug
            </BulletRow>
            <BulletRow icon="clap" bgColor={SUNNY_SOFT} fontSize={29}>
              <strong>Tepuk Tangan</strong> meriah untuk game buatan teman!
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <BikoMascot pose="thumbs-up" width={175} />
            <ScratchCatSvg size={150} clapping />
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
            <BulletRow icon="sad" bgColor={CORAL_SOFT} fontSize={29}>
              <strong>Sedih atau Panik</strong> saat kode belum jalan (<em>bug itu wajar!</em>)
            </BulletRow>
            <BulletRow icon="puzzle" bgColor={SUNNY_SOFT} fontSize={29}>
              <strong>Mengubah Kode</strong> di laptop teman tanpa izin
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <JuniorIcon name="dizzy" size={96} />
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Waktunya Pameran: Giliranmu di Arena Game Cilik!
// ============================================================================
const Slide09WaktunyaPameran: Page = () => {
  const live = useIsActivePage();
  const [fullscreen, setFullscreen] = useState(false);
  const [birdY, setBirdY] = useState(48);
  const [wingsUp, setWingsUp] = useState(true);
  const [cloudX, setCloudX] = useState(74);

  const hitCloud = Math.abs(cloudX - 28) < 16 && Math.abs(birdY - 46) < 20;

  useEffect(() => {
    if (!live) return;
    const flap = setInterval(() => setWingsUp((w) => !w), 240);
    const drift = setInterval(() => {
      setCloudX((x) => (x <= 14 ? 82 : x - 6));
    }, 280);
    return () => {
      clearInterval(flap);
      clearInterval(drift);
    };
  }, [live]);

  useEffect(() => {
    if (!live) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        playArenaSound('click');
        setBirdY((y) => Math.max(18, y - 12));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        playArenaSound('click');
        setBirdY((y) => Math.min(82, y + 12));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [live]);

  return (
    <JuniorFrame badge="WAKTUNYA PAMERAN!" accentDot={SUNNY}>
      <SlideTitle>
        Misi <Highlight>Arena Game Cilik Pertamaku!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Showcase Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'magnifier' as JuniorIconName,
            text: (
              <>
                <strong>Uji Coba</strong> gamemu &amp; bereskan bug sederhana
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'fullscreen' as JuniorIconName,
            text: (
              <>
                Klik <strong>Layar Penuh</strong> &amp; tekan <strong>Bendera Hijau</strong>
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'mic' as JuniorIconName,
            text: (
              <>
                <strong>Mainkan &amp; Ceritakan</strong> keseruan gamemu di depan kelas!
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

      {/* Big Showcase Stage with Fullscreen Presentation Toggle */}
      <MacWindowCard
        left={X0}
        top={400}
        width={1260}
        height={565}
        titleBarColor={SCRATCH_BLUE}
        headerLabel="Panggung Pameran CODEPOLITAN Junior"
        padding={22}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 12 }}>
              <button
                type="button"
                onClick={() => {
                  playArenaSound('click');
                  setBirdY((y) => Math.max(18, y - 14));
                }}
                className="cpj42-card-btn"
                style={{ padding: '6px 18px', borderRadius: 12, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, ...row, gap: 8 }}
              >
                <JuniorIcon name="arrow-up" size={22} />
                <span>Naik</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playArenaSound('click');
                  setBirdY((y) => Math.min(82, y + 14));
                }}
                className="cpj42-card-btn"
                style={{ padding: '6px 18px', borderRadius: 12, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, ...row, gap: 8 }}
              >
                <JuniorIcon name="arrow-down" size={22} />
                <span>Turun</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                playArenaSound('win');
                setFullscreen((f) => !f);
              }}
              className="cpj42-card-btn"
              style={{
                padding: '6px 18px',
                borderRadius: 14,
                background: fullscreen ? TEAL : SUNNY,
                color: fullscreen ? WHITE : CHARCOAL,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 18,
                fontWeight: 700,
                ...row,
                gap: 8,
              }}
            >
              <JuniorIcon name="fullscreen" size={22} />
              <span>{fullscreen ? 'Mode Layar Penuh Aktif' : 'Klik Layar Penuh'}</span>
            </button>
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: 20,
              border: `3.5px solid ${CHARCOAL}`,
              background: 'linear-gradient(180deg, #60A5FA 0%, #BAE6FD 70%, #DCFCE7 100%)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: fullscreen ? `0 0 0 6px ${SUNNY}` : undefined,
            }}
          >
            <div style={{ ...abs(28, 22) }}>
              <JuniorIcon name="sun" size={54} />
            </div>

            <div
              style={{
                position: 'absolute',
                left: `${cloudX}%`,
                top: '46%',
                transform: 'translate(-50%, -50%)',
                transition: 'left 260ms linear',
              }}
            >
              <CloudObstacleSvg width={fullscreen ? 190 : 155} alertGlow={hitCloud} />
            </div>

            <div
              style={{
                position: 'absolute',
                left: '28%',
                top: `${birdY}%`,
                transform: 'translate(-50%, -50%)',
                transition: 'top 140ms ease-out',
              }}
            >
              {hitCloud && (
                <div style={{ position: 'absolute', left: '50%', bottom: 96, transform: 'translateX(-50%)', padding: '6px 14px', borderRadius: 14, background: CORAL_SOFT, border: `2.5px solid ${CORAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, whiteSpace: 'nowrap' }}>
                  Awas awan!
                </div>
              )}
              <ParrotSpriteSvg size={fullscreen ? 132 : 108} wingsUp={wingsUp} />
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko & Clapping Scratch Cat */}
      <div style={{ ...abs(1390, 420, 445, 535), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', animation: live ? 'cpj42-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="jump"
            width={265}
            badgeIcon={<JuniorIcon name="mic" size={22} />}
            speechBubble="Hebat sekali!"
          />
          <ScratchCatSvg size={155} clapping />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 42 & Game Maker Scratch 3.0!
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="PROYEK GAME SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(150, 220), animation: live ? 'cpj42-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj42-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={50} />
      </div>

      <SlideTitle top={135} size={56} align="center" maxWidth={1620}>
        Selamat! Kamu <Highlight>Game Maker Scratch 3.0 Hebat!</Highlight>
      </SlideTitle>

      {/* Center Celebration Window */}
      <MacWindowCard
        left={230}
        top={260}
        width={1060}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="CODEPOLITAN JUNIOR • Penghargaan Utama"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, gap: 20, textAlign: 'center' }}>
          {/* Big Golden Trophy + Star Medal + Gamepad Badge */}
          <div style={{ ...row, gap: 28, alignItems: 'center', animation: live ? 'cpj42-float 2.6s ease-in-out infinite' : undefined }}>
            <JuniorIcon name="medal" size={120} />
            <svg width={210} height={210} viewBox="0 0 210 210">
              <path d="M55 48 C26 48, 22 92, 55 98" fill="none" stroke={CHARCOAL} strokeWidth={8} strokeLinecap="round" />
              <path d="M155 48 C184 48, 188 92, 155 98" fill="none" stroke={CHARCOAL} strokeWidth={8} strokeLinecap="round" />
              <path d="M52 38 L158 38 L144 124 C138 144, 72 144, 66 124 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
              <rect x="92" y="138" width="26" height="32" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4.5} />
              <rect x="64" y="168" width="82" height="24" rx="8" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={4.5} />
              <polygon points="105,58 113,75 132,78 118,91 122,110 105,101 88,110 92,91 78,78 97,75" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
            </svg>
            <JuniorIcon name="gamepad" size={115} />
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
            <JuniorIcon name="trophy" size={34} />
            <span>Lencana Utama Kreator &amp; Detektif Bug Scratch 3.0</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 29,
              fontWeight: 700,
              lineHeight: 1.38,
              maxWidth: 940,
              color: CHARCOAL,
            }}
          >
            Kamu sudah jago{' '}
            <Highlight color="#DBEAFE">Membuat, Memperbaiki Bug, &amp; Memamerkan</Highlight> game pertamamu!
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko, Clapping Scratch Cat & Flapping Parrot Celebrating */}
      <div style={{ ...abs(1325, 340, 525, 610), ...centerCol }}>
        <div style={{ marginBottom: 10, animation: live ? 'cpj42-float 2s ease-in-out infinite' : undefined }}>
          <ParrotSpriteSvg size={135} wingsUp />
        </div>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={285}
            badgeIcon={<JuniorIcon name="crown" size={22} />}
            speechBubble="Juara Game!"
          />
          <div style={{ animation: live ? 'cpj42-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <ScratchCatSvg size={175} clapping />
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
  `Selamat datang di Pertemuan 42 — Arena Game Cilik Pertamaku! 🎮🎉
Hari ini adalah pameran seru & uji coba Flyer Game Scratch 3.0 buatan anak-anak di depan kelas!`,

  `Dua misi spesial hari ini:
1. Uji coba game dan memperbaiki Bug sederhana (Debugging).
2. Memamerkan game pertamamu di layar kelas dengan penuh percaya diri!`,

  `Kamus Coder Cilik — Apa Itu "Bug"? 🐛🔧
- Bug adalah kesalahan kecil yang bikin game tidak jalan sesuai rencana.
- Debugging adalah jurus detektif memperbaiki kode sampai gamenya kembali lancar!`,

  `Daftar Cek Game (Playtest) 3 Bagian:
1. Kemudi Panah Atas/Bawah: Burung bisa terbang naik & turun?
2. Gerak & Sayap: Awan meluncur & sayap burung mengepak?
3. Radar Sensor: Ada suara & balon kata saat kena awan?`,

  `Bengkel Bug Sederhana:
- Jika radar awan tidak menyala: pastikan blok if touching [Clouds] berada DI DALAM forever & pilih nama "Clouds".
- Jika burung susah menghindar: ubah Size Burung menjadi 50!`,

  `Permainan Cepat! Ayo Jadi Detektif Bug:
Ups! Awan hanya meluncur 1 kali lalu diam! Blok apa yang kurang — Pilihan A (Bungkus Pakai forever) atau Pilihan B (Tambah Suara Meow)?`,

  `Siapkan Panggung — Tombol Layar Penuh Scratch 3.0!
Klik ikon 4 panah keluar (Full Screen Control) di pojok kanan atas Stage, lalu klik Bendera Hijau agar game tampil besar seperti arcade asli!`,

  `Aturan Arena Game Cilik:
BOLEH tetap tenang memperbaiki bug dan tepuk tangan meriah untuk teman!
JANGAN panik/sedih jika ada bug, dan jangan mengubah kode di laptop teman tanpa izin.`,

  `Waktunya Pameran di Arena Game Cilik!
Ajak anak-anak maju bergiliran: uji coba game, aktifkan mode Layar Penuh, mainkan menggunakan panah atas-bawah, dan ceritakan keseruan gamenya!`,

  `Selamat! Kamu Game Maker Scratch 3.0 Hebat! 🏆🎉
Selamat meraih Lencana Utama Kreator & Detektif Bug Scratch 3.0 atas keberhasilan membuat, memperbaiki bug, dan memamerkan game pertamamu!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 42 — Arena Game Cilik Pertamaku!',
  createdAt: '2026-11-16T15:54:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03KamusBug,
  Slide04DaftarCek,
  Slide05BengkelBug,
  Slide06AyoTebak,
  Slide07LayarPenuh,
  Slide08TipsArena,
  Slide09WaktunyaPameran,
  Slide10Lencana,
] satisfies Page[];

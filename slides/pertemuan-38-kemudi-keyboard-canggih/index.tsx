import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-38-kemudi-keyboard-canggih';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj38-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj38-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj38-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj38-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj38-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj38-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.85); }
  50% { box-shadow: 0 0 0 12px rgba(96, 165, 250, 0); }
}
.cpj38-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj38-card-btn:hover {
  transform: translateY(-4px);
}
.cpj38-card-btn:active {
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

/** Crisp keyboard blip per arrow direction */
function playKeyBlip(dir: 'up' | 'down' | 'left' | 'right') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const freqMap = { up: 659.25, right: 587.33, left: 523.25, down: 440 };
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freqMap[dir], ctx.currentTime);
    gain.gain.setValueAtTime(0.16, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.11);
    setTimeout(() => {
      void ctx.close();
    }, 240);
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
const LAVENDER_SOFT = '#F3EEFF';
const SKY = '#60A5FA';
const SKY_SOFT = '#EFF6FF';
const SCRATCH_BLUE = '#4D97FF';
const SCRATCH_EVENT = '#FFBF00';

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
          animation: live ? 'cpj38-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 38 • Kemudi Keyboard Canggih!</span>
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
// Reusable Pertemuan 38 Visuals (Scratch Cat, Keyboard Arrow Pad, 4-Way IDE)
// ============================================================================

const ScratchCatSvg = ({
  size = 100,
  facing = 'right',
  upsideDown = false,
  waving = false,
}: {
  size?: number;
  facing?: 'left' | 'right';
  upsideDown?: boolean;
  waving?: boolean;
}) => {
  const transform = upsideDown ? 'rotate(180deg)' : facing === 'left' ? 'scaleX(-1)' : undefined;
  return (
    <svg width={size} height={size} viewBox="0 0 140 140" fill="none" style={{ transform, transition: 'transform 180ms ease' }}>
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
};

const KeyboardArrowPad = ({
  activeDir,
  onPressDir,
  scale = 1,
}: {
  activeDir?: 'up' | 'down' | 'left' | 'right' | null;
  onPressDir?: (dir: 'up' | 'down' | 'left' | 'right') => void;
  scale?: number;
}) => {
  const keyW = Math.round(78 * scale);
  const keyH = Math.round(72 * scale);

  const KeyCap = ({
    dir,
    icon,
    color,
  }: {
    dir: 'up' | 'down' | 'left' | 'right';
    icon: JuniorIconName;
    color: string;
  }) => {
    const active = activeDir === dir;
    return (
      <button
        type="button"
        onClick={() => onPressDir?.(dir)}
        className="cpj38-card-btn"
        style={{
          width: keyW,
          height: keyH,
          borderRadius: Math.round(16 * scale),
          background: active ? color : WHITE,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: active ? `0 2px 0 ${CHARCOAL}` : `0 6px 0 ${CHARCOAL}`,
          ...centerCol,
          padding: 0,
        }}
      >
        <JuniorIcon name={icon} size={Math.round(42 * scale)} />
      </button>
    );
  };

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: Math.round(10 * scale) }}>
      <KeyCap dir="up" icon="arrow-up" color={SKY_SOFT} />
      <div style={{ ...row, gap: Math.round(10 * scale) }}>
        <KeyCap dir="left" icon="arrow-left" color={LAVENDER_SOFT} />
        <KeyCap dir="down" icon="arrow-down" color={TEAL_SOFT} />
        <KeyCap dir="right" icon="arrow-right" color={SUNNY_SOFT} />
      </div>
    </div>
  );
};

const Scratch3KeyBlock = ({
  keyName,
  scale = 1,
  activeGlow = false,
}: {
  keyName: string;
  scale?: number;
  activeGlow?: boolean;
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(7 * scale),
      height: Math.round(50 * scale),
      padding: `0 ${Math.round(16 * scale)}px`,
      borderRadius: `${Math.round(28 * scale)}px ${Math.round(28 * scale)}px ${Math.round(10 * scale)}px ${Math.round(10 * scale)}px`,
      background: SCRATCH_EVENT,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(17 * scale),
      fontWeight: 700,
      color: CHARCOAL,
      boxShadow: activeGlow ? `0 0 0 5px rgba(96,165,250,0.85)` : undefined,
      whiteSpace: 'nowrap',
    }}
  >
    <span>when</span>
    <span style={{ padding: '2px 10px', borderRadius: 99, background: '#D97706', color: WHITE }}>{keyName}</span>
    <span>key pressed</span>
  </div>
);

const Scratch3MotionPill = ({
  children,
  scale = 1,
}: {
  children: ReactNode;
  scale?: number;
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(7 * scale),
      height: Math.round(44 * scale),
      padding: `0 ${Math.round(15 * scale)}px`,
      borderRadius: Math.round(10 * scale),
      background: SCRATCH_BLUE,
      border: `2.6px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(16 * scale),
      fontWeight: 700,
      color: WHITE,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

/** Authentic Scratch 3.0 4-Way Keyboard Control Playground */
const AuthenticScratch3KeyboardUI = ({
  pos,
  facing,
  lastDir,
  onMove,
  onReset,
  width = 880,
  height = 540,
}: {
  pos: { x: number; y: number };
  facing: 'left' | 'right';
  lastDir: 'up' | 'down' | 'left' | 'right' | null;
  onMove: (dir: 'up' | 'down' | 'left' | 'right') => void;
  onReset: () => void;
  width?: number | string;
  height?: number | string;
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 22,
        background: '#E5F0FF',
        border: `3.5px solid ${CHARCOAL}`,
        boxShadow: `0 8px 0 ${CHARCOAL}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Navbar */}
      <div style={{ height: 42, background: SCRATCH_BLUE, borderBottom: `2.5px solid ${CHARCOAL}`, padding: '0 16px', ...row, justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ ...row, gap: 10 }}>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: WHITE }}>Scratch 3.0</span>
          <span style={{ padding: '3px 11px', borderRadius: '8px 8px 0 0', background: WHITE, fontSize: 12, fontWeight: 800, color: SCRATCH_BLUE }}>Kode</span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 800, color: WHITE }}>Kemudi Keyboard 4 Arah!</span>
      </div>

      {/* Main Split */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0, padding: 10, gap: 10 }}>
        {/* Left Code Area showing 4 Mini Key Stacks */}
        <div
          style={{
            flex: 1.18,
            borderRadius: 16,
            backgroundColor: WHITE,
            backgroundImage: 'radial-gradient(#CBD5E1 1.4px, transparent 1.4px)',
            backgroundSize: '18px 18px',
            border: `2.5px solid ${CHARCOAL}`,
            padding: 10,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
            alignContent: 'start',
          }}
        >
          {[
            { dir: 'up' as const, key: 'up arrow', deg: 0 },
            { dir: 'down' as const, key: 'down arrow', deg: 180 },
            { dir: 'right' as const, key: 'right arrow', deg: 90 },
            { dir: 'left' as const, key: 'left arrow', deg: -90 },
          ].map((item) => (
            <div key={item.dir} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Scratch3KeyBlock keyName={item.key} scale={0.58} activeGlow={lastDir === item.dir} />
              <Scratch3MotionPill scale={0.58}>point in direction ({item.deg})</Scratch3MotionPill>
              <Scratch3MotionPill scale={0.58}>move (10) steps</Scratch3MotionPill>
            </div>
          ))}
        </div>

        {/* Right City Park Stage + Clickable Keyboard D-Pad */}
        <div style={{ flex: 1.05, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 38, borderRadius: 12, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: '0 10px', ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 8 }}>
              <button
                type="button"
                onClick={onReset}
                className="cpj38-card-btn"
                title="Reset Posisi"
                style={{ width: 34, height: 28, borderRadius: 8, background: TEAL_SOFT, border: `2px solid ${TEAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="reset" size={18} />
              </button>
            </div>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 12, fontWeight: 700, color: SCRATCH_BLUE }}>
              Tekan Tombol Panah Laptop / Layar!
            </span>
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: 16,
              background: 'linear-gradient(180deg, #DBEAFE 0%, #DBEAFE 52%, #86EFAC 52%, #86EFAC 100%)',
              border: `2.5px solid ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transition: 'left 180ms ease, top 180ms ease',
              }}
            >
              <ScratchCatSvg size={82} facing={facing} waving />
            </div>

            {/* Bottom-right mini clickable arrow keys */}
            <div style={{ position: 'absolute', right: 10, bottom: 10, background: 'rgba(255,255,255,0.88)', padding: 6, borderRadius: 14, border: `2px solid ${CHARCOAL}` }}>
              <KeyboardArrowPad activeDir={lastDir} onPressDir={onMove} scale={0.48} />
            </div>
          </div>
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
  const [pos, setPos] = useState({ x: 35, y: 38 });
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [lastDir, setLastDir] = useState<'up' | 'down' | 'left' | 'right' | null>(null);

  const handleMove = (dir: 'up' | 'down' | 'left' | 'right') => {
    playKeyBlip(dir);
    setLastDir(dir);
    if (dir === 'left') setFacing('left');
    if (dir === 'right') setFacing('right');
    setPos((prev) => ({
      x: dir === 'left' ? Math.max(6, prev.x - 14) : dir === 'right' ? Math.min(72, prev.x + 14) : prev.x,
      y: dir === 'up' ? Math.max(8, prev.y - 14) : dir === 'down' ? Math.min(62, prev.y + 14) : prev.y,
    }));
  };

  useEffect(() => {
    if (!live) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); handleMove('up'); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); handleMove('down'); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); handleMove('left'); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); handleMove('right'); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [live]);

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 38" accentDot={SCRATCH_BLUE}>
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
            background: SKY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#1D4ED8',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="keyboard" size={24} />
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
          Kemudi <Highlight>Keyboard</Highlight>
          <br />
          <Highlight color="#DBEAFE">Canggih!</Highlight>
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
          Mengendalikan Karakter ke Empat Arah dengan Tombol Panah Laptop
        </p>

        {/* Quick Pill Highlights */}
        <div style={{ ...row, gap: 18 }}>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: SCRATCH_BLUE,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="keyboard" size={28} />
            <span>4 Tombol Panah!</span>
          </div>
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
            <JuniorIcon name="compass" size={28} />
            <span>4 Penjuru Arah!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Playable Authentic Scratch 3.0 4-Way Keyboard UI + Biko */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #EFF6FF 0%, #ECFDF5 55%, #FEF9C3 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SCRATCH_BLUE}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 125, zIndex: 2 }}>
          <AuthenticScratch3KeyboardUI
            pos={pos}
            facing={facing}
            lastDir={lastDir}
            onMove={handleMove}
            onReset={() => setPos({ x: 35, y: 38 })}
            width={620}
            height={420}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: -18,
            bottom: 24,
            zIndex: 3,
            animation: live ? 'cpj38-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={315}
            badgeIcon={<JuniorIcon name="keyboard" size={24} />}
            speechBubble={lastDir ? `Arah ${lastDir}!` : 'Tekan panah!'}
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
    <JuniorFrame badge="MISI HARI INI" accentDot={SUNNY}>
      <SlideTitle>
        Apa Misi Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Kemudi Keyboard 4 Arah • Pertemuan 38"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu 1 (Kuning) */}
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
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ width: 295, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol }}>
              <Scratch3KeyBlock keyName="up arrow" scale={0.96} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Kenali Blok <span style={{ color: '#B45309' }}>Tombol Keyboard</span> (<em>Events</em>)
            </div>
          </div>

          {/* Kartu 2 (Biru) */}
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
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SCRATCH_BLUE, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ width: 295, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol }}>
              <KeyboardArrowPad scale={0.62} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Kendalikan Kucing ke <span style={{ color: '#1D4ED8' }}>4 Arah!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj38-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="keyboard" size={24} />}
          speechBubble="Jadi pilot kode!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Kenalan Sama 4 Tombol Panah di Laptop!
// ============================================================================
const Slide03TombolPanah: Page = () => {
  const [active, setActive] = useState<'up' | 'down' | 'left' | 'right' | null>('up');

  return (
    <JuniorFrame badge="KEMUDI LAPTOP" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Temukan <Highlight>4 Tombol Panah!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Close-up Colorful Keyboard Arrow Pad */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Pojok Kanan Bawah Keyboard Laptop"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ padding: '42px 54px', borderRadius: 32, background: '#E2E8F0', border: `4px solid ${CHARCOAL}`, boxShadow: `0 8px 0 ${CHARCOAL}` }}>
            <KeyboardArrowPad
              activeDir={active}
              onPressDir={(d) => {
                playKeyBlip(d);
                setActive(d);
              }}
              scale={1.35}
            />
          </div>

          <div style={{ ...row, gap: 18, alignItems: 'center' }}>
            <BikoMascot pose="point-left" width={170} badgeIcon={<JuniorIcon name="keyboard" size={20} />} speechBubble="Klik tombolnya!" />
            <div style={{ padding: '14px 24px', borderRadius: 20, background: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
              4 Arah: Atas, Bawah, Kiri, Kanan!
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
        headerLabel="Letak Tombol Panah"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="keyboard" bgColor={SKY_SOFT} fontSize={32}>
              Lihat pojok kanan bawah <strong>Keyboard Laptopmu</strong>
            </BulletRow>
            <BulletRow icon="compass" bgColor={SUNNY_SOFT} fontSize={32}>
              Ada <strong>4 Tombol Arah</strong>: <strong>Atas, Bawah, Kiri, Kanan</strong>!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: TEAL_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Coba klik 4 tombol panah di kartu sebelah kiri untuk mendengar bunyinya masing-masing!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Blok Kuning Baru: when [arrow] key pressed
// ============================================================================
const Slide04BlokEventsKey: Page = () => {
  return (
    <JuniorFrame badge="BLOK KUNING • EVENTS" accentDot={SUNNY}>
      <SlideTitle>
        Blok Topi <Highlight>Tombol Keyboard!</Highlight>
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Memilih Arah Tombol Keyboard"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="grad-cap" bgColor={SUNNY_SOFT} fontSize={32}>
              Pilih blok kuning <strong>when [space] key pressed</strong>
            </BulletRow>
            <BulletRow icon="arrow-down" bgColor={SKY_SOFT} fontSize={32}>
              Klik tulisan <code>space</code> &amp; ganti jadi <strong>up / down / left / right arrow</strong>!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Jangan lupa ganti kata <code>space</code> di dalam menu dropdown kuning supaya merespons tombol panah!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Card with Open Dropdown */}
      <MacWindowCard
        left={980}
        top={235}
        width={840}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Pilihan Tombol Panah di Blok Kuning"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <Scratch3KeyBlock keyName="right arrow" scale={1.45} activeGlow />

          <div style={{ width: 290, borderRadius: 20, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['space', 'up arrow', 'down arrow', 'right arrow', 'left arrow'].map((opt) => (
              <div
                key={opt}
                style={{
                  padding: '8px 16px',
                  borderRadius: 12,
                  background: opt === 'right arrow' ? SUNNY : '#F8FAFC',
                  border: opt === 'right arrow' ? `2.5px solid ${CHARCOAL}` : '1.5px solid #E2E8F0',
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 23,
                  fontWeight: 700,
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus Arah: Putar Jarum Kompas (point in direction)!
// ============================================================================
const Slide05BlokKompas: Page = () => {
  const [deg, setDeg] = useState<0 | 90 | 180 | -90>(90);

  return (
    <JuniorFrame badge="BLOK BIRU • MOTION" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Arahkan <Highlight color="#DBEAFE">Jarum Kompasnya!</Highlight>
      </SlideTitle>

      {/* Left Interactive Compass Spotlight */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="point in direction ( ... )"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <Scratch3MotionPill scale={1.38}>
            <span>point in direction</span>
            <span style={{ padding: '2px 14px', borderRadius: 99, background: WHITE, color: CHARCOAL, border: `3px solid ${SUNNY}` }}>
              {deg}
            </span>
          </Scratch3MotionPill>

          {/* Compass Dial */}
          <div style={{ ...row, gap: 34, alignItems: 'center' }}>
            <svg width={210} height={210} viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="80" fill={WHITE} stroke={CHARCOAL} strokeWidth={4.5} />
              <circle cx="90" cy="90" r="64" fill={SKY_SOFT} stroke={SKY} strokeWidth={2.5} strokeDasharray="6 6" />
              <text x="90" y="24" textAnchor="middle" fontSize="16" fontWeight="800" fill={CHARCOAL}>0 (Atas)</text>
              <text x="152" y="95" textAnchor="middle" fontSize="16" fontWeight="800" fill={CHARCOAL}>90</text>
              <text x="90" y="166" textAnchor="middle" fontSize="16" fontWeight="800" fill={CHARCOAL}>180</text>
              <text x="26" y="95" textAnchor="middle" fontSize="16" fontWeight="800" fill={CHARCOAL}>-90</text>
              <g transform={`rotate(${deg} 90 90)`}>
                <line x1="90" y1="90" x2="90" y2="34" stroke={CORAL} strokeWidth={8} strokeLinecap="round" />
                <polygon points="90,22 78,44 102,44" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
              </g>
              <circle cx="90" cy="90" r="10" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
            </svg>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Atas (0)', val: 0 as const },
                { label: 'Kanan (90)', val: 90 as const },
                { label: 'Bawah (180)', val: 180 as const },
                { label: 'Kiri (-90)', val: -90 as const },
              ].map((b) => (
                <button
                  key={b.val}
                  type="button"
                  onClick={() => setDeg(b.val)}
                  className="cpj38-card-btn"
                  style={{
                    padding: '10px 14px',
                    borderRadius: 14,
                    background: deg === b.val ? SUNNY : WHITE,
                    border: `2.5px solid ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {b.label}
                </button>
              ))}
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
        headerLabel="Kompas Arah & Langkah"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="compass" bgColor={SKY_SOFT} fontSize={32}>
              Pakai blok biru <strong>point in direction</strong> &amp; putar panahnya sesuai arah
            </BulletRow>
            <BulletRow icon="footprints" bgColor={TEAL_SOFT} fontSize={32}>
              Sambung <strong>move (10) steps</strong> agar langsung melangkah!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: TEAL_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Anak usia 5–7 tahun cukup memutar jarum panahnya ke arah yang diinginkan tanpa perlu menghafal angka!
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
      <SlideTitle align="center" maxWidth={1620} top={122} size={48}>
        Kucing Scratch Mau Naik ke <Highlight>Atas!</Highlight> Blok Kuning Mana yang Dipakai?
      </SlideTitle>

      {/* Interactive Choice Cards */}
      <div style={{ ...abs(170, 245, 1580, 460), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: up arrow) */}
        <button
          type="button"
          onClick={() => {
            playKeyBlip('up');
            setPicked('A');
          }}
          className="cpj38-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'A' ? TEAL_SOFT : WHITE,
            border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'A' ? TEAL : CHARCOAL}`,
            padding: 30,
            ...centerCol,
            gap: 20,
            position: 'relative',
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN A
          </div>

          <div style={{ marginTop: 22, ...row, gap: 14 }}>
            <JuniorIcon name="arrow-up" size={50} />
            <Scratch3KeyBlock keyName="up arrow" scale={1.18} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
            Up Arrow (Atas)
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Up Arrow artinya tombol panah ke atas!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: down arrow) */}
        <button
          type="button"
          onClick={() => {
            playKeyBlip('down');
            setPicked('B');
          }}
          className="cpj38-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'B' ? CORAL_SOFT : WHITE,
            border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'B' ? CORAL : CHARCOAL}`,
            padding: 30,
            ...centerCol,
            gap: 20,
            position: 'relative',
            animation: picked === 'B' ? 'cpj38-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 22, ...row, gap: 14 }}>
            <JuniorIcon name="arrow-down" size={50} />
            <Scratch3KeyBlock keyName="down arrow" scale={1.18} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
            Down Arrow (Bawah)
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Down Arrow menggerakkan karakter ke bawah!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 735, 1540, 265), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj38-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={220}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Tepat!' : 'Ayo tebak!'}
          />
        </div>
        <div style={{ padding: '22px 36px', borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...row, gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="question" size={36} />
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
// SLIDE 07 — Resep Kemudi 4 Arah Lengkap! (Grid 2x2)
// ============================================================================
const Slide07ResepEmpatArah: Page = () => {
  const live = useIsActivePage();

  const cards = [
    { title: 'ATAS', icon: 'arrow-up' as JuniorIconName, bg: SKY_SOFT, accent: SKY, key: 'up arrow', deg: 0 },
    { title: 'BAWAH', icon: 'arrow-down' as JuniorIconName, bg: TEAL_SOFT, accent: TEAL, key: 'down arrow', deg: 180 },
    { title: 'KANAN', icon: 'arrow-right' as JuniorIconName, bg: SUNNY_SOFT, accent: SUNNY, key: 'right arrow', deg: 90 },
    { title: 'KIRI', icon: 'arrow-left' as JuniorIconName, bg: LAVENDER_SOFT, accent: LAVENDER, key: 'left arrow', deg: -90 },
  ];

  return (
    <JuniorFrame badge="RESEP KEMUDI 4 ARAH" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Susun <Highlight>4 Tumpukan Kode!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={CREAM}
        headerLabel="4 Tumpukan Kode Terpisah di Area Kode Kucing Scratch"
        padding={28}
      >
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 22 }}>
          {cards.map((c) => (
            <div
              key={c.title}
              style={{
                borderRadius: 22,
                background: c.bg,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${c.accent}`,
                padding: '18px 24px',
                ...row,
                justifyContent: 'space-between',
              }}
            >
              <div style={{ ...centerCol, gap: 8 }}>
                <JuniorIcon name={c.icon} size={56} />
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>{c.title}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                <Scratch3KeyBlock keyName={c.key} scale={0.95} />
                <Scratch3MotionPill scale={0.95}>point in direction ({c.deg})</Scratch3MotionPill>
                <Scratch3MotionPill scale={0.95}>move (10) steps</Scratch3MotionPill>
              </div>
            </div>
          ))}
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1475, 345, 360, 560),
          ...centerCol,
          animation: live ? 'cpj38-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="thumbs-up"
          width={335}
          badgeIcon={<JuniorIcon name="compass" size={22} />}
          speechBubble="4 arah lengkap!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Kemudi Keyboard (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsKeyboard: Page = () => {
  return (
    <JuniorFrame badge="TIPS PILOT KEYBOARD" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Kemudimu <Highlight>Mulus &amp; Rapi!</Highlight>
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
            <BulletRow icon="compass" bgColor={TEAL_SOFT} fontSize={30}>
              Pasang <strong>set rotation style [left-right]</strong> biar kucing tidak terbalik saat ke kiri
            </BulletRow>
            <BulletRow icon="puzzle" bgColor={SUNNY_SOFT} fontSize={30}>
              Susun <strong>4 Tumpukan Terpisah</strong> rapi di Area Kode
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <ScratchCatSvg size={115} facing="left" />
            <KeyboardArrowPad scale={0.68} />
            <ScratchCatSvg size={115} facing="right" />
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
            <BulletRow icon="see-no-evil" bgColor={CORAL_SOFT} fontSize={30}>
              Membiarkan keempat blok tetap bertuliskan <strong>space</strong>
            </BulletRow>
            <BulletRow icon="turn-right" bgColor={SUNNY_SOFT} fontSize={30}>
              Salah memutar <strong>Jarum Kompas</strong> berlawanan arah
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <ScratchCatSvg size={125} upsideDown />
            <Scratch3KeyBlock keyName="space" scale={0.95} />
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Jelajahi Panggung 4 Arah!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [pos, setPos] = useState({ x: 35, y: 38 });
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [lastDir, setLastDir] = useState<'up' | 'down' | 'left' | 'right' | null>(null);

  const handleMove = (dir: 'up' | 'down' | 'left' | 'right') => {
    playKeyBlip(dir);
    setLastDir(dir);
    if (dir === 'left') setFacing('left');
    if (dir === 'right') setFacing('right');
    setPos((prev) => ({
      x: dir === 'left' ? Math.max(6, prev.x - 14) : dir === 'right' ? Math.min(72, prev.x + 14) : prev.x,
      y: dir === 'up' ? Math.max(8, prev.y - 14) : dir === 'down' ? Math.min(62, prev.y + 14) : prev.y,
    }));
  };

  useEffect(() => {
    if (!live) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); handleMove('up'); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); handleMove('down'); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); handleMove('left'); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); handleMove('right'); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [live]);

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Kemudi Keyboard 4 Arah!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'landscape' as JuniorIconName,
            text: (
              <>
                Pasang latar <strong>Kota / Taman</strong> &amp; atur <strong>left-right</strong> pada <strong>Kucing Scratch</strong>
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
                Rangkai <strong>4 Tumpukan Kode</strong> untuk <strong>Up, Down, Left, &amp; Right Arrow</strong>
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'keyboard' as JuniorIconName,
            text: (
              <>
                Tekan <strong>4 Tombol Panah</strong> di keyboard &amp; kemudikan kucingmu keliling!
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

      {/* Playable Interactive Scratch 3.0 4-Way Simulator */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratch3KeyboardUI
          pos={pos}
          facing={facing}
          lastDir={lastDir}
          onMove={handleMove}
          onReset={() => setPos({ x: 35, y: 38 })}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Big Interactive Arrow Pad */}
      <div style={{ ...abs(1405, 405, 435, 555), ...centerCol, gap: 14 }}>
        <div style={{ animation: live ? 'cpj38-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={275}
            badgeIcon={<JuniorIcon name="keyboard" size={24} />}
            speechBubble={lastDir ? `Ke ${lastDir}!` : 'Coba tombolnya!'}
          />
        </div>
        <KeyboardArrowPad activeDir={lastDir} onPressDir={handleMove} scale={0.86} />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 38 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj38-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj38-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="keyboard" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj38-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={56}>
        Hore! Kamu <Highlight>Pilot Kemudi Keyboard Hebat!</Highlight>{' '}
        <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 38"
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
          {/* Bespoke Golden 4-Way Star D-Pad + Compass Medal SVG */}
          <div style={{ animation: live ? 'cpj38-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* 4-Way D-Pad Keycaps */}
              <rect x="102" y="54" width="36" height="32" rx="8" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
              <polygon points="120,62 112,76 128,76" fill={SCRATCH_BLUE} />
              <rect x="102" y="130" width="36" height="32" rx="8" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
              <polygon points="120,154 112,140 128,140" fill={TEAL} />
              <rect x="64" y="92" width="36" height="32" rx="8" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
              <polygon points="74,108 88,100 88,116" fill={LAVENDER} />
              <rect x="140" y="92" width="36" height="32" rx="8" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
              <polygon points="166,108 152,100 152,116" fill={CORAL} />
              <circle cx="120" cy="108" r="14" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
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
            <span>Lencana Master Kemudi 4 Arah</span>
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
            Kamu sudah jago mengendalikan karakter pakai{' '}
            <Highlight color="#DBEAFE">when [arrow] key pressed!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="keyboard" size={22} />}
            speechBubble="Pilot Hebat!"
          />
          <div style={{ animation: live ? 'cpj38-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 38 — Kemudi Keyboard Canggih! ⌨️🐱
Hari ini anak-anak menjadi Pilot Keyboard yang mengendalikan Kucing Scratch ke 4 arah memakai tombol panah laptop!`,

  `Dua misi seru hari ini:
1. Mengenal Blok Kuning "when [arrow] key pressed".
2. Mengendalikan Kucing Scratch ke 4 penjuru arah (Atas, Bawah, Kiri, Kanan)!`,

  `Kenalan sama 4 Tombol Panah di pojok kanan bawah keyboard laptop! Coba tekan tombol panah di slide untuk mendengar bunyinya.`,

  `Blok Kuning Baru — when [space] key pressed:
Klik tulisan "space" lalu ubah menjadi "up arrow", "down arrow", "right arrow", atau "left arrow"!`,

  `Jurus Arah — Putar Jarum Kompas (point in direction):
Putar jarum kompas ke 0 (Atas), 90 (Kanan), 180 (Bawah), atau -90 (Kiri), lalu sambung "move (10) steps"!`,

  `Permainan Cepat! Ayo tebak bersama:
Kucing Scratch mau naik ke ATAS! Blok kuning mana yang dipakai — Pilihan A (up arrow) atau Pilihan B (down arrow)?`,

  `Resep Kemudi 4 Arah Lengkap:
Buat 4 tumpukan terpisah di Area Kode untuk Atas (0), Bawah (180), Kanan (90), dan Kiri (-90)!`,

  `Tips Pilot Keyboard:
BOLEH pasang "set rotation style [left-right]" agar kucing tidak terbalik ke kiri & rapikan 4 tumpukan.
JANGAN membiarkan keempat blok tetap bertuliskan "space", atau memutar jarum kompas berlawanan arah!`,

  `Misi Praktik Kemudi Keyboard 4 Arah!
Siswa bisa langsung menekan tombol panah di keyboard laptop atau mengklik tombol panah di layar untuk menggerakkan Kucing Scratch!`,

  `Hore! Kamu Pilot Kemudi Keyboard Hebat! 🎉🏅
Selamat meraih Lencana Master Kemudi 4 Arah di Pertemuan 38!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 38 — Kemudi Keyboard Canggih!',
  createdAt: '2026-11-16T15:33:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03TombolPanah,
  Slide04BlokEventsKey,
  Slide05BlokKompas,
  Slide06AyoTebak,
  Slide07ResepEmpatArah,
  Slide08TipsKeyboard,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

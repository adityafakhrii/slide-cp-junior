import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-35-detektif-kucing-terbalik';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj35-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj35-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj35-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj35-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj35-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj35-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.9); }
  50% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
}
.cpj35-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj35-card-btn:hover {
  transform: translateY(-4px);
}
.cpj35-card-btn:active {
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

/** Playful detective discovery chime */
function playDetectiveChime(solved = true) {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notesSeq = solved ? [523.25, 659.25, 783.99] : [330, 293.66];
    notesSeq.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + i * 0.08;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.2, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.22);
    });
    setTimeout(() => {
      void ctx.close();
    }, 550);
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
const SCRATCH_BLUE = '#4D97FF';
const SCRATCH_EVENT = '#FFBF00';
const SCRATCH_CTRL = '#FFAB19';

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
          animation: live ? 'cpj35-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 35 • Detektif Kucing Terbalik!</span>
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
// Reusable Pertemuan 35 Visuals (Scratch Cat Upright/Flipped, Forever C-Block)
// ============================================================================

const ScratchCatSvg = ({
  size = 110,
  waving = false,
  facing = 'right',
  upsideDown = false,
}: {
  size?: number;
  waving?: boolean;
  facing?: 'left' | 'right';
  upsideDown?: boolean;
}) => {
  const transform =
    upsideDown
      ? 'rotate(180deg)'
      : facing === 'left'
        ? 'scaleX(-1)'
        : undefined;

  return (
    <svg width={size} height={size} viewBox="0 0 140 140" fill="none" style={{ transform, transition: 'transform 220ms ease' }}>
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
      <line x1="28" y1="58" x2="42" y2="61" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
      <line x1="27" y1="67" x2="42" y2="67" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
      <line x1="98" y1="61" x2="113" y2="58" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
      <line x1="98" y1="67" x2="113" y2="67" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
      <polygon points="66,58 74,58 70,63" fill={CHARCOAL} />
      <path d="M62 67 Q70 74 78 67" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
    </svg>
  );
};

const Scratch3HatFlagBlock = ({ scale = 1 }: { scale?: number }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(52 * scale),
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

const Scratch3MotionBlock = ({
  label,
  highlightPill,
  scale = 1,
}: {
  label: ReactNode;
  highlightPill?: boolean;
  scale?: number;
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(48 * scale),
      padding: `0 ${Math.round(18 * scale)}px`,
      borderRadius: Math.round(10 * scale),
      background: SCRATCH_BLUE,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      color: WHITE,
      boxShadow: highlightPill ? `0 0 0 4px ${SUNNY_SOFT}` : undefined,
    }}
  >
    {label}
  </div>
);

const Scratch3ForeverHugStack = ({ scale = 1 }: { scale?: number }) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3 }}>
    <Scratch3HatFlagBlock scale={scale} />
    <Scratch3MotionBlock
      scale={scale}
      label={
        <>
          <span>set rotation style</span>
          <span style={{ padding: '2px 10px', borderRadius: 99, background: '#2563EB', border: `2px solid ${WHITE}` }}>
            left-right
          </span>
        </>
      }
    />
    {/* Orange C-shaped forever loop hugging move + bounce */}
    <div
      style={{
        borderRadius: Math.round(14 * scale),
        background: SCRATCH_CTRL,
        border: `2.8px solid ${CHARCOAL}`,
        padding: `${Math.round(8 * scale)}px ${Math.round(10 * scale)}px ${Math.round(10 * scale)}px ${Math.round(18 * scale)}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: Math.round(18 * scale), fontWeight: 700, color: WHITE, ...row, gap: 6 }}>
        <span>forever</span>
      </div>
      <div style={{ borderLeft: `${Math.round(12 * scale)}px solid ${SCRATCH_CTRL}`, display: 'flex', flexDirection: 'column', gap: 3, paddingLeft: 4 }}>
        <Scratch3MotionBlock
          scale={scale}
          label={
            <>
              <span>move</span>
              <span style={{ padding: '1px 10px', borderRadius: 99, background: WHITE, color: CHARCOAL }}>10</span>
              <span>steps</span>
            </>
          }
        />
        <Scratch3MotionBlock scale={scale} label={<span>if on edge, bounce</span>} />
      </div>
    </div>
  </div>
);

/** Authentic Scratch 3.0 Playground showing Back-and-Forth Bounce Detective Mode */
const AuthenticScratch3BounceUI = ({
  rotationMode,
  running,
  onToggleRun,
  onToggleRotation,
  width = 880,
  height = 540,
}: {
  rotationMode: 'left-right' | 'all-around';
  running: boolean;
  onToggleRun?: () => void;
  onToggleRotation?: () => void;
  width?: number | string;
  height?: number | string;
}) => {
  const [posIdx, setPosIdx] = useState(0); // 0..3 -> walks right then bounces left

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setPosIdx((p) => (p + 1) % 4);
    }, 650);
    return () => clearInterval(id);
  }, [running]);

  const isReturning = posIdx >= 2;
  const catLeft = posIdx === 0 ? '10%' : posIdx === 1 ? '62%' : posIdx === 2 ? '58%' : '14%';

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
        <span style={{ fontSize: 12, fontWeight: 800, color: WHITE }}>Detektif Pantulan &amp; Rotasi</span>
      </div>

      {/* Main Split */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0, padding: 10, gap: 10 }}>
        {/* Left Code Area */}
        <div
          style={{
            flex: 1.15,
            borderRadius: 16,
            backgroundColor: WHITE,
            backgroundImage: 'radial-gradient(#CBD5E1 1.4px, transparent 1.4px)',
            backgroundSize: '18px 18px',
            border: `2.5px solid ${CHARCOAL}`,
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: MUTED, marginBottom: 6 }}>Area Kode</div>
            <Scratch3ForeverHugStack scale={0.68} />
          </div>

          {onToggleRotation && (
            <button
              type="button"
              onClick={onToggleRotation}
              className="cpj35-card-btn"
              style={{
                padding: '7px 12px',
                borderRadius: 12,
                background: rotationMode === 'left-right' ? TEAL_SOFT : CORAL_SOFT,
                border: `2.5px solid ${rotationMode === 'left-right' ? TEAL : CORAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 13,
                fontWeight: 700,
                color: CHARCOAL,
              }}
            >
              Mode: {rotationMode === 'left-right' ? 'left-right (Tegak!)' : 'all around (Terbalik!)'}
            </button>
          )}
        </div>

        {/* Right Stage */}
        <div style={{ flex: 1.05, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 38, borderRadius: 12, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: '0 10px', ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 8 }}>
              <button
                type="button"
                onClick={onToggleRun}
                className="cpj35-card-btn"
                title="Mulai"
                style={{ width: 34, height: 28, borderRadius: 8, background: TEAL_SOFT, border: `2.5px solid ${TEAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="flag" size={19} />
              </button>
              <button
                type="button"
                onClick={onToggleRun}
                className="cpj35-card-btn"
                title="Stop"
                style={{ width: 34, height: 28, borderRadius: 8, background: CORAL_SOFT, border: `2.5px solid ${CORAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="stop" size={19} />
              </button>
            </div>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 12, fontWeight: 700, color: TEAL }}>
              {running ? 'Bolak-Balik!' : 'Klik Bendera'}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: 16,
              background: 'linear-gradient(180deg, #BAE6FD 0%, #BAE6FD 62%, #86EFAC 62%, #86EFAC 100%)',
              border: `2.5px solid ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: catLeft,
                bottom: '12%',
                transition: 'left 550ms ease',
              }}
            >
              <ScratchCatSvg
                size={98}
                facing={isReturning ? 'left' : 'right'}
                upsideDown={rotationMode === 'all-around' && isReturning}
              />
            </div>
          </div>

          <div style={{ height: 56, borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: '0 12px', ...row, justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, fontWeight: 800 }}>Sprite1 • Kucing Scratch</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: MUTED }}>
              {isReturning ? 'Arah: Kiri' : 'Arah: Kanan'}
            </span>
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
  const [running, setRunning] = useState(true);

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 35" accentDot={SCRATCH_BLUE}>
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
          <JuniorIcon name="magnifier" size={24} />
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
          <Highlight>Detektif</Highlight> Kucing
          <br />
          Terbalik!
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
          Mengatur Pantulan Layar &amp; Gaya Rotasi agar Jalan Bolak-Balik Rapi
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
            <JuniorIcon name="arrow-lr" size={28} />
            <span>Pantul Rapi!</span>
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
            <span>left-right!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Authentic Scratch 3.0 + Detective Biko */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #EFF6FF 0%, #FEF9C3 55%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SCRATCH_BLUE}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 125, zIndex: 2 }}>
          <AuthenticScratch3BounceUI
            rotationMode="left-right"
            running={live && running}
            onToggleRun={() => {
              playDetectiveChime(true);
              setRunning((r) => !r);
            }}
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
            animation: live ? 'cpj35-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="detective"
            width={325}
            badgeIcon={<JuniorIcon name="magnifier" size={24} />}
            speechBubble="Ayo selidiki!"
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
    <JuniorFrame badge="MISI HARI INI" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Apa Misi Detektif <Highlight>Kita Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Detektif Kucing Terbalik • Pertemuan 35"
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
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SCRATCH_BLUE, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ width: 290, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol, gap: 12 }}>
              <Scratch3MotionBlock label={<span>if on edge, bounce</span>} scale={0.95} />
              <JuniorIcon name="arrow-lr" size={44} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Bikin Kucing <span style={{ color: '#1D4ED8' }}>Memantul</span> di Pinggir Layar
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

            <div style={{ width: 290, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 14 }}>
              <ScratchCatSvg size={105} facing="left" />
              <ScratchCatSvg size={105} facing="right" />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Perbaiki Kucing yang <span style={{ color: '#047857' }}>Jalan Terbalik!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj35-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="detective"
          width={395}
          badgeIcon={<JuniorIcon name="magnifier" size={24} />}
          speechBubble="Pecahkan misteri!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Blok Biru Baru #1: Pantul Pinggir Layar!
// ============================================================================
const Slide03BlokBounce: Page = () => {
  return (
    <JuniorFrame badge="BLOK BIRU • MOTION" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Blok <Highlight color="#DBEAFE">Pantul Pinggir Layar!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="if on edge, bounce"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ padding: '36px 40px', borderRadius: 28, background: CREAM, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}` }}>
            <Scratch3MotionBlock label={<span>if on edge, bounce</span>} scale={1.45} highlightPill />
          </div>

          <div style={{ width: '100%', height: 240, borderRadius: 24, background: TEAL_SOFT, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden', ...row, justifyContent: 'flex-end', paddingRight: 18 }}>
            <div style={{ ...row, gap: 14, marginRight: 20 }}>
              <JuniorIcon name="arrow-left" size={56} />
              <ScratchCatSvg size={135} facing="left" />
            </div>
            {/* Right Stage Wall */}
            <div style={{ width: 22, height: '100%', background: CORAL, borderLeft: `3px solid ${CHARCOAL}` }} />
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
        headerLabel="Cara Kerja Pantulan Tepi Layar"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="brick-wall" bgColor={SKY_SOFT} fontSize={32}>
              Pilih blok biru <strong>if on edge, bounce</strong>
            </BulletRow>
            <BulletRow icon="arrow-lr" bgColor={TEAL_SOFT} fontSize={32}>
              Saat menyentuh tepi panggung, kucing <strong>Langsung Balik Arah!</strong>
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Dengan blok ini, Kucing Scratch tidak pernah nyangkut di pinggir layar lagi!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Misteri Detektif: Kenapa Kucing Jadi Terbalik?!
// ============================================================================
const Slide04MisteriTerbalik: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISTERI DETEKTIF!" accentDot={CORAL}>
      <SlideTitle>
        Ups! Kenapa Kucingnya <Highlight color="#FEE2E2">Jadi Terbalik?</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Upside Down Cat + Biko Detective with Magnifier */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={CORAL_SOFT}
        headerLabel="Kasus Aneh di Panggung Scratch 3.0!"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              width: '100%',
              height: 360,
              borderRadius: 26,
              background: 'linear-gradient(180deg, #BAE6FD 0%, #BAE6FD 64%, #86EFAC 64%, #86EFAC 100%)',
              border: `3.5px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '0 24px',
            }}
          >
            <div style={{ ...centerCol, gap: 12 }}>
              <ScratchCatSvg size={165} upsideDown />
              <div style={{ padding: '6px 16px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>
                Kepala di Bawah?!
              </div>
            </div>
            <JuniorIcon name="question" size={76} />
          </div>

          <div style={{ ...row, gap: 22, alignItems: 'center' }}>
            <div style={{ animation: live ? 'cpj35-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot pose="detective" width={205} badgeIcon={<JuniorIcon name="magnifier" size={20} />} speechBubble="Wah, aneh!" />
            </div>
            <div style={{ padding: '16px 24px', borderRadius: 20, background: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
              Ayo cari petunjuknya!
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
        headerLabel="Petunjuk Detektif"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="dizzy" bgColor={CORAL_SOFT} fontSize={32}>
              Saat memantul, kepala kucing malah <strong>Di Bawah!</strong>
            </BulletRow>
            <BulletRow icon="magnifier" bgColor={SUNNY_SOFT} fontSize={32}>
              Ayo pakai <strong>Jurus Detektif</strong> untuk meluruskannya!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Secara bawaan, karakter di Scratch 3.0 berputar keliling (<em>all around</em>), jadi ikut jungkir balik saat berbalik ke kiri!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Blok Biru Baru #2: Jurus Anti Terbalik!
// ============================================================================
const Slide05BlokRotasi: Page = () => {
  return (
    <JuniorFrame badge="BLOK BIRU • JURUS DETEKTIF" accentDot={TEAL}>
      <SlideTitle>
        Blok <Highlight>Putaran Kiri-Kanan!</Highlight>
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Jurus Anti Terbalik (Rotation Style)"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="compass" bgColor={SKY_SOFT} fontSize={32}>
              Pilih blok biru <strong>set rotation style [left-right]</strong>
            </BulletRow>
            <BulletRow icon="sparkle" bgColor={TEAL_SOFT} fontSize={32}>
              Kucing hanya menengok <strong>Kiri &amp; Kanan</strong>, tidak pernah terbalik!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: TEAL_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="check" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Dengan pilihan <code>left-right</code>, kaki kucing tetap menapak rapi di lantai baik saat menghadap kiri maupun kanan!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Card */}
      <MacWindowCard
        left={980}
        top={235}
        width={840}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="Sorot Pilihan [left-right]"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ padding: '36px 32px', borderRadius: 28, background: CREAM, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}` }}>
            <Scratch3MotionBlock
              scale={1.32}
              label={
                <>
                  <span>set rotation style</span>
                  <span style={{ padding: '4px 16px', borderRadius: 99, background: WHITE, color: CHARCOAL, border: `3px solid ${SUNNY}`, boxShadow: `0 0 0 5px rgba(251,191,36,0.75)` }}>
                    left-right
                  </span>
                </>
              }
            />
          </div>

          <div style={{ width: '100%', padding: '22px 28px', borderRadius: 24, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, justifyContent: 'space-around' }}>
            <div style={{ ...centerCol, gap: 6 }}>
              <ScratchCatSvg size={120} facing="left" />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>Menengok Kiri</span>
            </div>
            <JuniorIcon name="arrow-lr" size={56} />
            <div style={{ ...centerCol, gap: 6 }}>
              <ScratchCatSvg size={120} facing="right" />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>Menengok Kanan</span>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Pilih Blok Pemecah Misteri!
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1620} top={122} size={50}>
        Blok Mana Biar Kucing <Highlight>Tidak Jalan Terbalik?</Highlight>
      </SlideTitle>

      {/* Interactive Choice Cards */}
      <div style={{ ...abs(170, 245, 1580, 460), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: set rotation style left-right) */}
        <button
          type="button"
          onClick={() => {
            playDetectiveChime(true);
            setPicked('A');
          }}
          className="cpj35-card-btn"
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

          <div style={{ marginTop: 24, ...row, gap: 14 }}>
            <JuniorIcon name="arrow-lr" size={48} />
            <Scratch3MotionBlock
              scale={1.08}
              label={
                <>
                  <span>set rotation style</span>
                  <span style={{ padding: '2px 12px', borderRadius: 99, background: '#2563EB', border: `2px solid ${WHITE}` }}>left-right</span>
                </>
              }
            />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Putaran Kiri-Kanan
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Kucing tetap tegak menengok kiri &amp; kanan!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: move 10 steps) */}
        <button
          type="button"
          onClick={() => {
            playDetectiveChime(false);
            setPicked('B');
          }}
          className="cpj35-card-btn"
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
            animation: picked === 'B' ? 'cpj35-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 24, ...row, gap: 14 }}>
            <JuniorIcon name="footprints" size={48} />
            <Scratch3MotionBlock scale={1.18} label={<span>move 10 steps</span>} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Gerak Maju
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Itu untuk melangkah maju, bukan mengatur putaran!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 735, 1540, 265), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj35-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={220}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Kasus tuntas!' : 'Ayo tebak!'}
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
// SLIDE 07 — Resep Kode: Jalan Bolak-Balik Rapi!
// ============================================================================
const Slide07ResepKode: Page = () => {
  return (
    <JuniorFrame badge="RESEP KODE RAPI" accentDot={ORANGE}>
      <SlideTitle>
        Rangkai <Highlight>Jalan Bolak-Balik!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Full Forever C-Block Stack */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Susunan Balok Rapi (Forever Memeluk Gerak & Pantul)"
        padding={32}
      >
        <div style={{ height: '100%', ...centerCol }}>
          <Scratch3ForeverHugStack scale={1.32} />
        </div>
      </MacWindowCard>

      {/* Right 3 Step Explanation Cards */}
      <MacWindowCard
        left={980}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Urutan 3 Bagian Resep"
        padding={36}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <div style={{ borderRadius: 22, background: SUNNY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${SUNNY}`, padding: '22px 26px', ...row, gap: 18 }}>
            <div style={{ width: 58, height: 58, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
              1
            </div>
            <div style={{ fontSize: 27, fontWeight: 800 }}>
              Atas: <strong>when Bendera clicked</strong>
            </div>
          </div>

          <div style={{ borderRadius: 22, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${SKY}`, padding: '22px 26px', ...row, gap: 18 }}>
            <div style={{ width: 58, height: 58, borderRadius: 18, background: SCRATCH_BLUE, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
              2
            </div>
            <div style={{ fontSize: 27, fontWeight: 800 }}>
              Tengah: <strong>set rotation style [left-right]</strong>
            </div>
          </div>

          <div style={{ borderRadius: 22, background: '#FFF7ED', border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${ORANGE}`, padding: '22px 26px', ...row, gap: 18 }}>
            <div style={{ width: 58, height: 58, borderRadius: 18, background: ORANGE, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
              3
            </div>
            <div style={{ fontSize: 27, fontWeight: 800 }}>
              Peluk Terus: <strong>forever</strong> memeluk <strong>move 10</strong> + <strong>if on edge, bounce</strong>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Detektif Kode Rapi (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsDetektif: Page = () => {
  return (
    <JuniorFrame badge="TIPS DETEKTIF KODE" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Kucing Jalan <Highlight>Mondar-Mandir Rapi!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & BERHASIL"
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
            <BulletRow icon="infinity" bgColor={TEAL_SOFT} fontSize={30}>
              Taruh <strong>if on edge, bounce</strong> <strong>Di Dalam</strong> blok <code>forever</code>
            </BulletRow>
            <BulletRow icon="compass" bgColor={SUNNY_SOFT} fontSize={30}>
              Pasang <strong>set rotation style [left-right]</strong> di bagian atas
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <ScratchCatSvg size={115} facing="right" />
            <JuniorIcon name="arrow-lr" size={56} />
            <ScratchCatSvg size={115} facing="left" />
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
              Lupa memasang <strong>if on edge, bounce</strong> (nyangkut di pinggir)
            </BulletRow>
            <BulletRow icon="dizzy" bgColor={SUNNY_SOFT} fontSize={30}>
              Membiarkan pilihan <strong>all around</strong> (kucing terbalik)
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-between', alignItems: 'center', padding: '0 28px' }}>
            <ScratchCatSvg size={125} upsideDown />
            <div style={{ width: 20, height: 190, borderRadius: 8, background: CORAL, border: `2.5px solid ${CHARCOAL}` }} />
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Pecahkan Misteri Kucing Terbalik!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [rotationMode, setRotationMode] = useState<'left-right' | 'all-around'>('left-right');
  const [running, setRunning] = useState(true);

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Detektif Kucing Terbalik!</Highlight>
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
                Pasang latar <strong>Taman / Jalan</strong> &amp; pilih <strong>Kucing Scratch</strong>
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
                Rangkai <strong>when Bendera</strong>, <strong>left-right</strong>, <strong>forever</strong>, <strong>move</strong>, &amp; <strong>bounce</strong>
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
                Klik <strong>Bendera Hijau!</strong> Lihat kucingmu jalan bolak-balik rapi!
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

      {/* Playable Interactive Scratch 3.0 Bounce Simulator */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratch3BounceUI
          rotationMode={rotationMode}
          running={live && running}
          onToggleRun={() => setRunning((r) => !r)}
          onToggleRotation={() => {
            const next = rotationMode === 'left-right' ? 'all-around' : 'left-right';
            playDetectiveChime(next === 'left-right');
            setRotationMode(next);
          }}
          width={1280}
          height={565}
        />
      </div>

      {/* Detective Biko & Toggle Mode Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 14 }}>
        <div style={{ animation: live ? 'cpj35-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="detective"
            width={325}
            badgeIcon={<JuniorIcon name="magnifier" size={24} />}
            speechBubble={rotationMode === 'left-right' ? 'Tegak rapi!' : 'Ups terbalik!'}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            const next = rotationMode === 'left-right' ? 'all-around' : 'left-right';
            playDetectiveChime(next === 'left-right');
            setRotationMode(next);
          }}
          className="cpj35-card-btn"
          style={{
            padding: '12px 24px',
            borderRadius: 18,
            background: rotationMode === 'left-right' ? TEAL : CORAL,
            color: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          <JuniorIcon name="compass" size={24} />
          <span>Coba Mode: {rotationMode}</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 35 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISTERI TERPECAHKAN!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj35-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj35-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="magnifier" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj35-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={56}>
        Hore! Kamu <Highlight>Detektif Kode Hebat!</Highlight>{' '}
        <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 35"
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
          {/* Bespoke Golden Detective Magnifier & Left-Right Arrows Medal SVG */}
          <div style={{ animation: live ? 'cpj35-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Left-Right Bounce Arrows inside Medal */}
              <path d="M68 134 H104 M78 124 L66 134 L78 144" fill="none" stroke={TEAL} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M172 134 H136 M162 124 L174 134 L162 144" fill="none" stroke={TEAL} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
              {/* Detective Magnifier */}
              <circle cx="114" cy="90" r="28" fill={WHITE} stroke={CHARCOAL} strokeWidth={5} />
              <line x1="135" y1="111" x2="156" y2="132" stroke={CHARCOAL} strokeWidth={9} strokeLinecap="round" />
              <polygon points="114,72 119,83 131,84 122,92 125,104 114,98 103,104 106,92 97,84 109,83" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.2} />
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
            <span>Lencana Detektif Pantulan &amp; Rotasi</span>
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
            <Highlight color="#D1FAE5">if on edge, bounce &amp; left-right!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Detective Biko & Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="detective"
            width={295}
            badgeIcon={<JuniorIcon name="medal" size={22} />}
            speechBubble="Misteri tuntas!"
          />
          <div style={{ animation: live ? 'cpj35-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 35 — Detektif Kucing Terbalik! 🔍🐱
Hari ini anak-anak menjadi Detektif Kode untuk memecahkan misteri kucing yang memantul terbalik di pinggir layar!`,

  `Dua misi detektif hari ini:
1. Bikin Kucing Memantul di pinggir layar dengan "if on edge, bounce".
2. Perbaiki Kucing yang Jalan Terbalik memakai "set rotation style [left-right]"!`,

  `Blok Biru Baru #1 — Pantul Pinggir Layar (if on edge, bounce):
Saat menyentuh tepi kanan/kiri panggung, Kucing Scratch langsung balik arah!`,

  `Misteri Detektif: Kenapa Kucingnya Jadi Terbalik?!
Karena gaya putaran bawaannya "all around", ketika memantul ke kiri, kepala Kucing ikut berputar ke bawah!`,

  `Blok Biru Baru #2 — Jurus Anti Terbalik: set rotation style [left-right]!
Pilih blok biru ini lalu atur ke "left-right" agar Kucing hanya menengok kiri & kanan dengan kaki tetap menapak rapi!`,

  `Permainan Cepat! Ayo tebak bersama:
Blok mana biar Kucing tidak jalan terbalik — Pilihan A (set rotation style left-right) atau Pilihan B (move 10 steps)?`,

  `Resep Kode Jalan Bolak-Balik Rapi:
1. Atas: when Bendera clicked
2. Tengah: set rotation style [left-right]
3. Peluk Terus: forever memeluk "move 10 steps" + "if on edge, bounce"!`,

  `Tips Detektif Kode Rapi:
BOLEH taruh "if on edge, bounce" DI DALAM blok forever, dan pasang "left-right" di bagian atas.
JANGAN lupa pasang bounce atau membiarkan mode "all around"!`,

  `Misi Praktik Detektif Kucing Terbalik!
Ajak siswa mengklik tombol "Coba Mode: left-right / all-around" pada panggung slide untuk melihat langsung perbedaannya!`,

  `Hore! Kamu Detektif Kode Hebat! 🎉🔍
Selamat meraih Lencana Detektif Pantulan & Rotasi di Pertemuan 35!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 35 — Detektif Kucing Terbalik!',
  createdAt: '2026-11-16T15:21:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BlokBounce,
  Slide04MisteriTerbalik,
  Slide05BlokRotasi,
  Slide06AyoTebak,
  Slide07ResepKode,
  Slide08TipsDetektif,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-36-sulap-kostum-bergerak';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj36-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj36-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj36-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj36-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj36-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj36-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.85); }
  50% { box-shadow: 0 0 0 12px rgba(167, 139, 250, 0); }
}
.cpj36-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj36-card-btn:hover {
  transform: translateY(-4px);
}
.cpj36-card-btn:active {
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

/** Playful magic sparkle wand chime */
function playMagicWandChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    [587.33, 739.99, 880, 1174.66].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + i * 0.06;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.2);
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
    accent: '#A78BFA',
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
const SCRATCH_BLUE = '#4D97FF';
const SCRATCH_LOOKS = '#9966FF';
const SCRATCH_EVENT = '#FFBF00';
const SCRATCH_CTRL = '#FFAB19';
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
  accentDot = LAVENDER,
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
          animation: live ? 'cpj36-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: LAVENDER,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 36 • Sulap Kostum Bergerak!</span>
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
  bgColor = LAVENDER_SOFT,
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
// Reusable Pertemuan 36 Visuals (2-Pose Scratch Cat, Flapping Parrot, Blocks)
// ============================================================================

const ScratchCatWalkSvg = ({ size = 110, pose = 1 }: { size?: number; pose?: 1 | 2 }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <ellipse cx="70" cy="128" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path d="M40 100 C20 96, 14 78, 25 69 C32 63, 38 71, 35 78 C33 83, 38 90, 46 90" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    {pose === 1 ? (
      <>
        {/* Walking stride A: wide open legs */}
        <ellipse cx="47" cy="120" rx="12" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} transform="rotate(-12 47 120)" />
        <ellipse cx="93" cy="118" rx="12" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} transform="rotate(14 93 118)" />
      </>
    ) : (
      <>
        {/* Walking stride B: tucked mid-step legs */}
        <ellipse cx="61" cy="122" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} />
        <ellipse cx="81" cy="116" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} transform="rotate(-14 81 116)" />
      </>
    )}
    <ellipse cx="70" cy="96" rx="25" ry="23" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="98" rx="14" ry="14" fill={WHITE} />
    <path d={pose === 1 ? 'M46 86 C32 82, 28 96, 40 99' : 'M46 88 C39 98, 44 106, 52 103'} fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d={pose === 1 ? 'M94 84 C110 78, 112 64, 102 60' : 'M94 88 C102 96, 98 106, 89 102'} fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
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

const ParrotSvg = ({ size = 95, wingUp = true }: { size?: number; wingUp?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 110 110" fill="none">
    {/* Tail */}
    <path d="M26 66 L10 88 L28 84 L38 72 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
    {/* Wing */}
    {wingUp ? (
      <path d="M48 48 C34 18, 60 10, 74 36 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.4} strokeLinejoin="round" />
    ) : (
      <path d="M44 58 C34 86, 62 94, 72 64 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.4} strokeLinejoin="round" />
    )}
    {/* Body */}
    <ellipse cx="56" cy="58" rx="22" ry="18" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.6} />
    {/* Head */}
    <circle cx="74" cy="40" r="16" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.6} />
    <circle cx="77" cy="37" r="4.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="78" cy="37" r="2" fill={CHARCOAL} />
    {/* Beak */}
    <path d="M88 38 C98 40, 100 50, 88 50 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
  </svg>
);

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

const Scratch3BlockPill = ({
  bg,
  children,
  scale = 1,
  activeGlow = false,
}: {
  bg: string;
  children: ReactNode;
  scale?: number;
  activeGlow?: boolean;
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(48 * scale),
      padding: `0 ${Math.round(18 * scale)}px`,
      borderRadius: Math.round(10 * scale),
      background: bg,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      color: WHITE,
      boxShadow: activeGlow ? `0 0 0 5px rgba(251,191,36,0.75)` : undefined,
    }}
  >
    {children}
  </div>
);

const Scratch3RepeatCostumeStack = ({ scale = 1 }: { scale?: number }) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3 }}>
    <Scratch3HatFlagBlock scale={scale} />
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
        <span>repeat</span>
        <span style={{ padding: '1px 10px', borderRadius: 99, background: WHITE, color: CHARCOAL }}>10</span>
      </div>
      <div style={{ borderLeft: `${Math.round(12 * scale)}px solid ${SCRATCH_CTRL}`, display: 'flex', flexDirection: 'column', gap: 3, paddingLeft: 4 }}>
        <Scratch3BlockPill bg={SCRATCH_BLUE} scale={scale}>
          <span>move</span>
          <span style={{ padding: '1px 10px', borderRadius: 99, background: WHITE, color: CHARCOAL }}>15</span>
          <span>steps</span>
        </Scratch3BlockPill>
        <Scratch3BlockPill bg={SCRATCH_LOOKS} scale={scale}>
          <span>next costume</span>
        </Scratch3BlockPill>
        <Scratch3BlockPill bg={SCRATCH_CTRL} scale={scale}>
          <span>wait</span>
          <span style={{ padding: '1px 10px', borderRadius: 99, background: WHITE, color: CHARCOAL }}>0.2</span>
          <span>seconds</span>
        </Scratch3BlockPill>
      </div>
    </div>
  </div>
);

/** Authentic Scratch 3.0 Costume Magic Playground (Code + Costumes Tab + Stage) */
const AuthenticScratch3CostumeUI = ({
  activeTab = 'code',
  running = true,
  withWait = true,
  onToggleRun,
  onSwitchTab,
  width = 880,
  height = 540,
}: {
  activeTab?: 'code' | 'costumes';
  running?: boolean;
  withWait?: boolean;
  onToggleRun?: () => void;
  onSwitchTab?: (t: 'code' | 'costumes') => void;
  width?: number | string;
  height?: number | string;
}) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!running) return;
    const ms = withWait ? 340 : 65;
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % 6);
    }, ms);
    return () => clearInterval(id);
  }, [running, withWait]);

  const pose: 1 | 2 = frame % 2 === 0 ? 1 : 2;
  const wingUp = frame % 2 === 0;
  const xPct = 10 + frame * 9;

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
      {/* Top Navbar with highlighted Costumes tab */}
      <div style={{ height: 42, background: SCRATCH_BLUE, borderBottom: `2.5px solid ${CHARCOAL}`, padding: '0 16px', ...row, justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ ...row, gap: 10 }}>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: WHITE }}>Scratch 3.0</span>
          <div style={{ ...row, gap: 4 }}>
            <button
              type="button"
              onClick={() => onSwitchTab?.('code')}
              style={{
                padding: '3px 11px',
                borderRadius: '8px 8px 0 0',
                background: activeTab === 'code' ? WHITE : 'transparent',
                color: activeTab === 'code' ? SCRATCH_BLUE : '#DBEAFE',
                border: 'none',
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Kode
            </button>
            <button
              type="button"
              onClick={() => onSwitchTab?.('costumes')}
              style={{
                padding: '3px 11px',
                borderRadius: '8px 8px 0 0',
                background: activeTab === 'costumes' ? WHITE : SUNNY_SOFT,
                color: activeTab === 'costumes' ? SCRATCH_LOOKS : CHARCOAL,
                border: `2px solid ${SUNNY}`,
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Costumes
            </button>
          </div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 800, color: WHITE }}>Sulap Kostum Bergerak!</span>
      </div>

      {/* Main Split */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0, padding: 10, gap: 10 }}>
        {/* Left: Code Area or Costumes Flipbook */}
        {activeTab === 'costumes' ? (
          <div style={{ flex: 1.15, borderRadius: 16, background: WHITE, border: `3px solid ${SUNNY}`, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 15, fontWeight: 700, color: SCRATCH_LOOKS }}>
              Tab Costumes (Pose Kucing &amp; Burung)
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1, borderRadius: 14, background: SKY_SOFT, border: `2.5px solid ${SCRATCH_BLUE}`, padding: 10, ...centerCol, gap: 4 }}>
                <ScratchCatWalkSvg size={82} pose={1} />
                <span style={{ fontSize: 12, fontWeight: 800 }}>costume1</span>
              </div>
              <div style={{ flex: 1, borderRadius: 14, background: LAVENDER_SOFT, border: `2.5px solid ${SCRATCH_LOOKS}`, padding: 10, ...centerCol, gap: 4 }}>
                <ScratchCatWalkSvg size={82} pose={2} />
                <span style={{ fontSize: 12, fontWeight: 800 }}>costume2</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1, borderRadius: 14, background: TEAL_SOFT, border: `2px solid ${TEAL}`, padding: 8, ...centerCol, gap: 2 }}>
                <ParrotSvg size={64} wingUp />
                <span style={{ fontSize: 11, fontWeight: 800 }}>parrot-a</span>
              </div>
              <div style={{ flex: 1, borderRadius: 14, background: TEAL_SOFT, border: `2px solid ${TEAL}`, padding: 8, ...centerCol, gap: 2 }}>
                <ParrotSvg size={64} wingUp={false} />
                <span style={{ fontSize: 11, fontWeight: 800 }}>parrot-b</span>
              </div>
            </div>
          </div>
        ) : (
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
              <Scratch3RepeatCostumeStack scale={0.65} />
            </div>
          </div>
        )}

        {/* Right Stage */}
        <div style={{ flex: 1.05, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 38, borderRadius: 12, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: '0 10px', ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 8 }}>
              <button
                type="button"
                onClick={onToggleRun}
                className="cpj36-card-btn"
                title="Mulai Animasi"
                style={{ width: 34, height: 28, borderRadius: 8, background: TEAL_SOFT, border: `2.5px solid ${TEAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="flag" size={19} />
              </button>
              <button
                type="button"
                onClick={onToggleRun}
                className="cpj36-card-btn"
                title="Stop"
                style={{ width: 34, height: 28, borderRadius: 8, background: CORAL_SOFT, border: `2.5px solid ${CORAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="stop" size={19} />
              </button>
            </div>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 12, fontWeight: 700, color: SCRATCH_LOOKS }}>
              Kostum {pose}
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
            {/* Flying Parrot */}
            <div style={{ position: 'absolute', left: `${xPct}%`, top: '10%', transition: 'left 240ms linear' }}>
              <ParrotSvg size={82} wingUp={wingUp} />
            </div>
            {/* Walking Scratch Cat */}
            <div style={{ position: 'absolute', left: `${xPct}%`, bottom: '10%', transition: 'left 240ms linear' }}>
              <ScratchCatWalkSvg size={98} pose={pose} />
            </div>
          </div>

          <div style={{ height: 56, borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: '0 12px', ...row, justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, fontWeight: 800 }}>Kucing &amp; Burung</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: withWait ? TEAL : CORAL }}>
              {withWait ? 'wait (0.2)' : 'Tanpa wait!'}
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
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 36" accentDot={LAVENDER}>
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
            background: LAVENDER_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#6D28D9',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="sparkle" size={24} />
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
          Sulap <Highlight>Kostum</Highlight>
          <br />
          <Highlight color="#F3EEFF">Bergerak!</Highlight>
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
          Menghidupkan Langkah Kaki Kucing &amp; Kepakan Sayap Burung
        </p>

        {/* Quick Pill Highlights */}
        <div style={{ ...row, gap: 18 }}>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: SCRATCH_LOOKS,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="sparkle" size={28} />
            <span>next costume!</span>
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
            <JuniorIcon name="bird" size={28} />
            <span>Hidup Seperti Kartun!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Authentic Scratch 3.0 + Magic Biko */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #F3EEFF 0%, #EFF6FF 55%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${LAVENDER}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 125, zIndex: 2 }}>
          <AuthenticScratch3CostumeUI
            activeTab="code"
            running={live && running}
            withWait
            onToggleRun={() => {
              playMagicWandChime();
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
            animation: live ? 'cpj36-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="sparkle" size={24} />}
            speechBubble="Simsalabim!"
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
    <JuniorFrame badge="MISI HARI INI" accentDot={LAVENDER}>
      <SlideTitle>
        Apa Misi Sulap <Highlight>Kita Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Sulap Kostum Bergerak • Pertemuan 36"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu 1 (Ungu) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: LAVENDER_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${LAVENDER}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SCRATCH_LOOKS, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ width: 290, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol, gap: 12 }}>
              <Scratch3BlockPill bg={SCRATCH_LOOKS} scale={1.1}>
                <span>next costume</span>
              </Scratch3BlockPill>
              <div style={{ ...row, gap: 10 }}>
                <ScratchCatWalkSvg size={70} pose={1} />
                <ScratchCatWalkSvg size={70} pose={2} />
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Kenali Tab <span style={{ color: '#6D28D9' }}>Costumes</span> &amp; Blok <span style={{ color: '#6D28D9' }}>next costume</span>
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

            <div style={{ width: 290, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 12 }}>
              <ScratchCatWalkSvg size={95} pose={1} />
              <ParrotSvg size={85} wingUp />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Hidupkan <span style={{ color: '#047857' }}>Gerak Kaki &amp; Sayap</span> dengan <span style={{ color: '#047857' }}>repeat!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj36-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="sparkle" size={24} />}
          speechBubble="Hidup seperti kartun!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Rahasia Kartun: Apa Itu Kostum?
// ============================================================================
const Slide03TabCostumes: Page = () => {
  return (
    <JuniorFrame badge="RAHASIA ANIMASI KARTUN" accentDot={LAVENDER}>
      <SlideTitle>
        Mengenal Tab <Highlight color="#F3EEFF">Costumes!</Highlight>
      </SlideTitle>

      {/* Left Spotlight: Scratch 3.0 UI on Costumes Tab */}
      <div style={{ ...abs(X0, 235, 920, 720) }}>
        <AuthenticScratch3CostumeUI activeTab="costumes" running width={920} height={720} />
      </div>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={1050}
        top={235}
        width={770}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Buku Flipbook Karakter"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="palette" bgColor={LAVENDER_SOFT} fontSize={32}>
              Klik tab <strong>Costumes</strong> di pojok kiri atas
            </BulletRow>
            <BulletRow icon="film" bgColor={SUNNY_SOFT} fontSize={32}>
              Satu karakter punya <strong>Banyak Pose</strong> gambar (<em>seperti buku flipbook!</em>)
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Saat gambar pose 1 dan pose 2 ditukar bergantian dengan cepat, karaktermu terlihat berjalan atau terbang!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Blok Ungu Baru: Next Costume (Looks)
// ============================================================================
const Slide04BlokNextCostume: Page = () => {
  const [flip, setFlip] = useState(false);

  return (
    <JuniorFrame badge="BLOK UNGU • LOOKS" accentDot={SCRATCH_LOOKS}>
      <SlideTitle>
        Blok Ungu <Highlight color="#F3EEFF">next costume</Highlight>
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Kategori Ungu (Looks)"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="dot-purple" bgColor={LAVENDER_SOFT} fontSize={32}>
              Klik lingkaran <strong>Ungu (Looks)</strong> di rak kiri
            </BulletRow>
            <BulletRow icon="sparkle" bgColor={SUNNY_SOFT} fontSize={32}>
              Blok <strong>next costume</strong> mengganti pose karakter ke <strong>Gambar Berikutnya!</strong>
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: LAVENDER_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Coba klik blok <strong>next costume</strong> di kartu kanan untuk menyulap posenya langsung!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Interactive Magic Spotlight */}
      <MacWindowCard
        left={980}
        top={235}
        width={840}
        height={720}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Klik Blok Ungu untuk Ganti Pose!"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <button
            type="button"
            onClick={() => {
              playMagicWandChime();
              setFlip((f) => !f);
            }}
            className="cpj36-card-btn"
            style={{ background: 'transparent', border: 'none', padding: 0 }}
          >
            <Scratch3BlockPill bg={SCRATCH_LOOKS} scale={1.55} activeGlow>
              <JuniorIcon name="sparkle" size={32} />
              <span>next costume</span>
            </Scratch3BlockPill>
          </button>

          <div style={{ width: '100%', padding: '24px 32px', borderRadius: 26, background: TEAL_SOFT, border: `3.5px solid ${CHARCOAL}`, ...row, justifyContent: 'space-around' }}>
            <div style={{ ...centerCol, gap: 8 }}>
              <ScratchCatWalkSvg size={140} pose={flip ? 2 : 1} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                {flip ? 'costume2' : 'costume1'}
              </span>
            </div>
            <div style={{ ...centerCol, gap: 8 }}>
              <ParrotSvg size={130} wingUp={!flip} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                {flip ? 'parrot-b' : 'parrot-a'}
              </span>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Rahasia Animator: Pakai Jeda (wait)!
// ============================================================================
const Slide05JurusWait: Page = () => {
  return (
    <JuniorFrame badge="JURUS ANIMASI HALUS" accentDot={ORANGE}>
      <SlideTitle>
        Kenapa Harus Pakai <Highlight>wait (0.2)?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1720}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Perbandingan Animasi Tanpa Jeda vs Dengan Jeda (0.2 detik)"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Kartu Atas — Tanpa Jeda */}
          <div style={{ flex: 1, borderRadius: 24, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, padding: '24px 36px', ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 24 }}>
              <div style={{ width: 76, height: 76, borderRadius: 22, background: CORAL, color: WHITE, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
                <JuniorIcon name="cross" size={44} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: CORAL, marginBottom: 6 }}>
                  Tanpa Jeda (Ngebut!)
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                  <JuniorIcon name="lightning" size={28} style={{ marginRight: 8 }} />
                  Ganti kostum <strong>Terlalu Ngebut</strong> sampai mata tidak sempat melihat!
                </div>
              </div>
            </div>
            <div style={{ ...row, gap: 10 }}>
              <Scratch3BlockPill bg={SCRATCH_LOOKS} scale={1.08}><span>next costume</span></Scratch3BlockPill>
            </div>
          </div>

          {/* Kartu Bawah — Pakai wait (0.2) seconds */}
          <div style={{ flex: 1, borderRadius: 24, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, padding: '24px 36px', ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 24 }}>
              <div style={{ width: 76, height: 76, borderRadius: 22, background: TEAL, color: WHITE, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
                <JuniorIcon name="check" size={44} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: '#047857', marginBottom: 6 }}>
                  Pakai wait (0.2) seconds
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                  <JuniorIcon name="eyes" size={28} style={{ marginRight: 8 }} />
                  Langkah kaki &amp; kepakan sayap terlihat <strong>Jelas &amp; Halus!</strong>
                </div>
              </div>
            </div>
            <div style={{ ...row, gap: 14, alignItems: 'center' }}>
              <Scratch3BlockPill bg={SCRATCH_CTRL} scale={1.15} activeGlow>
                <span>wait</span>
                <span style={{ padding: '2px 12px', borderRadius: 99, background: WHITE, color: CHARCOAL }}>0.2</span>
                <span>seconds</span>
              </Scratch3BlockPill>
              <ParrotSvg size={105} wingUp />
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Blok Apa Agar Tidak Terlalu Ngebut?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1620} top={122} size={50}>
        Blok Mana Biar Pergantian Kostum <Highlight>Terlihat Jelas?</Highlight>
      </SlideTitle>

      {/* Interactive Choice Cards */}
      <div style={{ ...abs(170, 245, 1580, 460), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: wait 0.2 seconds) */}
        <button
          type="button"
          onClick={() => {
            playMagicWandChime();
            setPicked('A');
          }}
          className="cpj36-card-btn"
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
            <JuniorIcon name="wait" size={50} />
            <Scratch3BlockPill bg={SCRATCH_CTRL} scale={1.18}>
              <span>wait</span>
              <span style={{ padding: '2px 12px', borderRadius: 99, background: WHITE, color: CHARCOAL }}>0.2</span>
              <span>seconds</span>
            </Scratch3BlockPill>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Blok Jeda (Wait)
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Blok Jeda bikin animasi jelas dan halus!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: start sound Meow) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj36-card-btn"
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
            animation: picked === 'B' ? 'cpj36-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 22, ...row, gap: 14 }}>
            <JuniorIcon name="music-note" size={50} />
            <Scratch3BlockPill bg={SCRATCH_SOUND} scale={1.18}>
              <span>start sound Meow</span>
            </Scratch3BlockPill>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Blok Suara (Sound)
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Blok Suara untuk membunyikan audio, bukan memberi jeda!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 735, 1540, 265), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj36-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={220}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Pas banget!' : 'Ayo tebak!'}
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
// SLIDE 07 — Resep Sulap: Rangkai di Dalam repeat!
// ============================================================================
const Slide07ResepRepeat: Page = () => {
  return (
    <JuniorFrame badge="RESEP SULAP KOSTUM" accentDot={ORANGE}>
      <SlideTitle>
        Masukkan ke Dalam <Highlight>repeat!</Highlight>
      </SlideTitle>

      {/* Left Spotlight: Full Repeat(10) Stack */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Susunan Balok Sulap di Dalam repeat (10)"
        padding={32}
      >
        <div style={{ height: '100%', ...centerCol }}>
          <Scratch3RepeatCostumeStack scale={1.25} />
        </div>
      </MacWindowCard>

      {/* Right 3 Step Cards */}
      <MacWindowCard
        left={980}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="3 Bagian Resep Sulap"
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

          <div style={{ borderRadius: 22, background: '#FFF7ED', border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${ORANGE}`, padding: '22px 26px', ...row, gap: 18 }}>
            <div style={{ width: 58, height: 58, borderRadius: 18, background: ORANGE, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
              2
            </div>
            <div style={{ fontSize: 27, fontWeight: 800 }}>
              Peluk: <strong>repeat (10)</strong>
            </div>
          </div>

          <div style={{ borderRadius: 22, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${SKY}`, padding: '22px 26px', ...row, gap: 18 }}>
            <div style={{ width: 58, height: 58, borderRadius: 18, background: SCRATCH_BLUE, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
              3
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.3 }}>
              Isi Dalamnya: <strong>move (15) steps</strong> + <strong>next costume</strong> + <strong>wait (0.2)</strong>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Sulap Kostum (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsSulap: Page = () => {
  return (
    <JuniorFrame badge="TIPS ANIMATOR CILIK" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Karaktermu <Highlight>Hidup Seperti Kartun!</Highlight>
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
            <BulletRow icon="bird" bgColor={TEAL_SOFT} fontSize={30}>
              Pilih Sprite yang punya <strong>2 Kostum atau Lebih</strong>
            </BulletRow>
            <BulletRow icon="wait" bgColor={SUNNY_SOFT} fontSize={30}>
              Taruh <strong>wait (0.2)</strong> tepat di bawah <strong>next costume</strong>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <ParrotSvg size={115} wingUp />
            <ParrotSvg size={115} wingUp={false} />
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
            <BulletRow icon="apple" bgColor={CORAL_SOFT} fontSize={30}>
              Memilih Sprite yang cuma punya <strong>1 Kostum</strong> (<em>seperti Apel</em>)
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={30}>
              Menaruh <strong>next costume</strong> <strong>Di Luar</strong> blok <code>repeat</code>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 28px' }}>
            <JuniorIcon name="apple" size={115} />
            <Scratch3BlockPill bg={SCRATCH_LOOKS} scale={0.95}><span>next costume</span></Scratch3BlockPill>
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Hidupkan Kucing & Burung!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [running, setRunning] = useState(true);
  const [withWait, setWithWait] = useState(true);

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Sulap Kostum Bergerak!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'tree' as JuniorIconName,
            text: (
              <>
                Siapkan latar <strong>Taman</strong>, <strong>Kucing Scratch</strong>, &amp; <strong>Burung (Parrot)</strong>
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
                Rangkai <strong>repeat (10)</strong> berisi <strong>move</strong>, <strong>next costume</strong>, &amp; <strong>wait (0.2)</strong>
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
                Klik <strong>Bendera Hijau!</strong> Lihat kaki melangkah &amp; sayap mengepak!
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

      {/* Playable Interactive Scratch 3.0 Costume Magic Simulator */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratch3CostumeUI
          activeTab="code"
          running={live && running}
          withWait={withWait}
          onToggleRun={() => setRunning((r) => !r)}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Toggle Wait Demo Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 14 }}>
        <div style={{ animation: live ? 'cpj36-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="sparkle" size={24} />}
            speechBubble={withWait ? 'Halus & jelas!' : 'Terlalu cepat!'}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            playMagicWandChime();
            setWithWait((w) => !w);
          }}
          className="cpj36-card-btn"
          style={{
            padding: '12px 24px',
            borderRadius: 18,
            background: withWait ? TEAL : CORAL,
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
          <JuniorIcon name="wait" size={24} />
          <span>{withWait ? 'Pakai wait (0.2)' : 'Tanpa wait!'}</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 36 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj36-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj36-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="film" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj36-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={56}>
        Hore! Kamu <Highlight>Animator Kartun Hebat!</Highlight>{' '}
        <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 36"
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
          {/* Bespoke Golden Cartoon Film Reel + Wing + Paw Medal SVG */}
          <div style={{ animation: live ? 'cpj36-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={SCRATCH_LOOKS} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={LAVENDER_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Film Strip Box */}
              <rect x="74" y="72" width="92" height="70" rx="12" fill={SCRATCH_LOOKS} stroke={CHARCOAL} strokeWidth={4} />
              <rect x="82" y="82" width="12" height="10" rx="2" fill={WHITE} />
              <rect x="82" y="102" width="12" height="10" rx="2" fill={WHITE} />
              <rect x="82" y="122" width="12" height="10" rx="2" fill={WHITE} />
              <rect x="146" y="82" width="12" height="10" rx="2" fill={WHITE} />
              <rect x="146" y="102" width="12" height="10" rx="2" fill={WHITE} />
              <rect x="146" y="122" width="12" height="10" rx="2" fill={WHITE} />
              {/* Star inside Film */}
              <polygon points="120,86 125,97 137,99 128,107 130,119 120,113 110,119 112,107 103,99 115,97" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
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
            <span>Lencana Master Sulap Kostum</span>
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
            Kamu sudah jago menghidupkan gerak pakai{' '}
            <Highlight color="#F3EEFF">next costume + wait di dalam repeat!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko, Scratch Cat & Flapping Parrot Celebrating */}
      <div style={{ ...abs(1355, 415, 495, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={275}
            badgeIcon={<JuniorIcon name="medal" size={22} />}
            speechBubble="Animator!"
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ animation: live ? 'cpj36-float 1.6s ease-in-out infinite' : undefined }}>
              <ParrotSvg size={105} wingUp />
            </div>
            <div style={{ animation: live ? 'cpj36-hop 1.9s ease-in-out infinite' : undefined }}>
              <ScratchCatWalkSvg size={155} pose={1} />
            </div>
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
  `Selamat datang di Pertemuan 36 — Sulap Kostum Bergerak! ✨🐱🐦
Hari ini kita menjadi Animator Kartun yang menghidupkan langkah kaki Kucing Scratch & kepakan sayap Burung!`,

  `Dua misi sulap hari ini:
1. Mengenal Tab Costumes & Blok Ungu "next costume".
2. Menghidupkan gerak kaki & sayap di dalam blok "repeat"!`,

  `Rahasia Kartun — Apa Itu Kostum?
Klik tab Costumes di kiri atas! Satu karakter bisa punya beberapa gambar pose seperti buku flipbook (costume1, costume2, parrot-a, parrot-b)!`,

  `Blok Ungu Baru — next costume (Looks):
Klik kategori Ungu (Looks), lalu tarik blok "next costume"! Coba klik langsung blok ungunya di slide untuk melihat Kucing & Burung berganti pose!`,

  `Rahasia Animator — Kenapa Harus Pakai wait (0.2)?
Tanpa jeda, kostum berganti terlalu ngebut sampai mata tak sempat melihat. Dengan "wait (0.2) seconds", gerakan terlihat jelas dan halus!`,

  `Permainan Cepat! Ayo tebak bersama:
Blok mana biar pergantian kostum terlihat jelas — Pilihan A (Blok Jeda wait 0.2 seconds) atau Pilihan B (Blok Suara)?`,

  `Resep Sulap Rangkai di Dalam repeat (10):
1. Atas: when Bendera clicked
2. Peluk: repeat (10)
3. Isi dalamnya: move (15) steps -> next costume -> wait (0.2) seconds!`,

  `Tips Jagoan Sulap Kostum:
BOLEH pilih Sprite yang punya 2 kostum atau lebih, dan taruh wait (0.2) tepat di bawah next costume.
JANGAN memilih Sprite yang cuma punya 1 kostum (seperti Apel), atau menaruh next costume di luar repeat!`,

  `Misi Praktik Hidupkan Kucing & Burung!
Ajak siswa menekan tombol "Pakai wait (0.2) / Tanpa wait!" pada slide untuk membandingkan kelancaran animasi!`,

  `Hore! Kamu Animator Kartun Hebat! 🎉🏅
Selamat meraih Lencana Master Sulap Kostum di Pertemuan 36!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 36 — Sulap Kostum Bergerak!',
  createdAt: '2026-11-16T15:25:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03TabCostumes,
  Slide04BlokNextCostume,
  Slide05JurusWait,
  Slide06AyoTebak,
  Slide07ResepRepeat,
  Slide08TipsSulap,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-39-awan-bintang-meluncur-otomatis';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj39-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj39-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj39-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj39-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj39-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj39-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj39-card-btn:hover {
  transform: translateY(-4px);
}
.cpj39-card-btn:active {
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

/** Gentle starry glide chime */
function playGlideChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.22);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.26);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.28);
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
          animation: live ? 'cpj39-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 39 • Awan &amp; Bintang Meluncur Otomatis!</span>
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
// Reusable Pertemuan 39 Visuals (Cloud, Star, Scratch Cat, Glide + Forever)
// ============================================================================

const FluffyCloudSvg = ({ width = 104 }: { width?: number }) => (
  <svg width={width} height={Math.round(width * 0.65)} viewBox="0 0 130 84" fill="none">
    <path
      d="M28 68 C14 68, 8 56, 15 45 C14 30, 29 22, 42 29 C49 12, 76 11, 86 27 C102 24, 118 35, 114 50 C122 59, 113 68, 100 68 Z"
      fill={WHITE}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <circle cx="52" cy="48" r="3.4" fill={CHARCOAL} />
    <circle cx="76" cy="48" r="3.4" fill={CHARCOAL} />
    <path d="M58 55 Q64 60 70 55" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" fill="none" />
  </svg>
);

const GlowingStarSvg = ({ size = 76 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 90 90" fill="none">
    <polygon
      points="45,8 55,31 80,34 62,51 67,76 45,64 23,76 28,51 10,34 35,31"
      fill={SUNNY}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <circle cx="38" cy="42" r="3" fill={CHARCOAL} />
    <circle cx="52" cy="42" r="3" fill={CHARCOAL} />
    <path d="M40 50 Q45 55 50 50" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" fill="none" />
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

const Scratch3GlideBlock = ({
  secs = 2,
  scale = 1,
  highlightSec = false,
}: {
  secs?: number;
  scale?: number;
  highlightSec?: boolean;
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(7 * scale),
      height: Math.round(48 * scale),
      padding: `0 ${Math.round(16 * scale)}px`,
      borderRadius: Math.round(10 * scale),
      background: SCRATCH_BLUE,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(17 * scale),
      fontWeight: 700,
      color: WHITE,
      whiteSpace: 'nowrap',
    }}
  >
    <span>glide</span>
    <span
      style={{
        padding: '1px 10px',
        borderRadius: 99,
        background: WHITE,
        color: CHARCOAL,
        border: highlightSec ? `3px solid ${SUNNY}` : 'none',
        boxShadow: highlightSec ? `0 0 0 4px rgba(251,191,36,0.7)` : undefined,
      }}
    >
      {secs}
    </span>
    <span>secs to</span>
    <span style={{ padding: '1px 10px', borderRadius: 99, background: '#2563EB', border: `1.5px solid ${WHITE}` }}>
      random position
    </span>
  </div>
);

const Scratch3ForeverGlideStack = ({ secs = 2, scale = 1 }: { secs?: number; scale?: number }) => (
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
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: Math.round(18 * scale), fontWeight: 700, color: WHITE }}>
        forever
      </div>
      <div style={{ borderLeft: `${Math.round(12 * scale)}px solid ${SCRATCH_CTRL}`, paddingLeft: 4 }}>
        <Scratch3GlideBlock secs={secs} scale={scale} />
      </div>
    </div>
  </div>
);

const CLOUD_TARGETS = [
  { x: 10, y: 12 },
  { x: 56, y: 24 },
  { x: 24, y: 54 },
  { x: 60, y: 12 },
];

const STAR_TARGETS = [
  { x: 64, y: 16 },
  { x: 16, y: 56 },
  { x: 58, y: 62 },
  { x: 22, y: 14 },
];

/** Authentic Scratch 3.0 Sky / Space Glide Playground */
const AuthenticScratch3GlideUI = ({
  running = true,
  selectedSprite = 'cloud',
  onSelectSprite,
  onToggleRun,
  width = 880,
  height = 540,
}: {
  running?: boolean;
  selectedSprite?: 'cloud' | 'star';
  onSelectSprite?: (s: 'cloud' | 'star') => void;
  onToggleRun?: () => void;
  width?: number | string;
  height?: number | string;
}) => {
  const [cloudStep, setCloudStep] = useState(0);
  const [starStep, setStarStep] = useState(0);

  useEffect(() => {
    if (!running) return;
    const starId = setInterval(() => setStarStep((s) => (s + 1) % STAR_TARGETS.length), 1000);
    const cloudId = setInterval(() => setCloudStep((c) => (c + 1) % CLOUD_TARGETS.length), 2400);
    return () => {
      clearInterval(starId);
      clearInterval(cloudId);
    };
  }, [running]);

  const cPos = CLOUD_TARGETS[cloudStep];
  const sPos = STAR_TARGETS[starStep];

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
        <span style={{ fontSize: 12, fontWeight: 800, color: WHITE }}>Awan &amp; Bintang Meluncur Otomatis!</span>
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
            <div style={{ fontSize: 11, fontWeight: 800, color: MUTED, marginBottom: 8 }}>
              Kode Milik: {selectedSprite === 'cloud' ? 'Sprite Awan (3 secs)' : 'Sprite Bintang (1 secs)'}
            </div>
            <Scratch3ForeverGlideStack secs={selectedSprite === 'cloud' ? 3 : 1} scale={0.72} />
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, color: MUTED }}>
            Klik Sprite di kanan bawah untuk melihat kodenya!
          </div>
        </div>

        {/* Right Sky Stage + Sprite Picker */}
        <div style={{ flex: 1.05, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 38, borderRadius: 12, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: '0 10px', ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 8 }}>
              <button
                type="button"
                onClick={onToggleRun}
                className="cpj39-card-btn"
                title="Mulai Meluncur"
                style={{ width: 34, height: 28, borderRadius: 8, background: TEAL_SOFT, border: `2.5px solid ${TEAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="flag" size={19} />
              </button>
              <button
                type="button"
                onClick={onToggleRun}
                className="cpj39-card-btn"
                title="Stop"
                style={{ width: 34, height: 28, borderRadius: 8, background: CORAL_SOFT, border: `2.5px solid ${CORAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="stop" size={19} />
              </button>
            </div>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 12, fontWeight: 700, color: SCRATCH_BLUE }}>
              {running ? 'Meluncur Halus!' : 'Berhenti'}
            </span>
          </div>

          {/* Animated Sky Stage */}
          <div
            style={{
              flex: 1.25,
              borderRadius: 16,
              background: 'linear-gradient(180deg, #1E1B4B 0%, #312E81 55%, #3B82F6 100%)',
              border: `2.5px solid ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Gliding Cloud (slow, smooth 2.2s transition) */}
            <div
              style={{
                position: 'absolute',
                left: `${cPos.x}%`,
                top: `${cPos.y}%`,
                transition: 'left 2200ms ease-in-out, top 2200ms ease-in-out',
              }}
            >
              <FluffyCloudSvg width={92} />
            </div>

            {/* Gliding Star (lively 900ms transition) */}
            <div
              style={{
                position: 'absolute',
                left: `${sPos.x}%`,
                top: `${sPos.y}%`,
                transition: 'left 900ms ease-in-out, top 900ms ease-in-out',
              }}
            >
              <GlowingStarSvg size={64} />
            </div>
          </div>

          {/* Sprite Selector */}
          <div style={{ height: 64, borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: '6px 10px', ...row, gap: 10 }}>
            <button
              type="button"
              onClick={() => onSelectSprite?.('cloud')}
              className="cpj39-card-btn"
              style={{ flex: 1, height: '100%', borderRadius: 10, background: SKY_SOFT, border: `2.5px solid ${selectedSprite === 'cloud' ? SUNNY : CHARCOAL}`, ...row, justifyContent: 'center', gap: 6, padding: 0 }}
            >
              <FluffyCloudSvg width={42} />
              <span style={{ fontSize: 12, fontWeight: 800 }}>Awan (3s)</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectSprite?.('star')}
              className="cpj39-card-btn"
              style={{ flex: 1, height: '100%', borderRadius: 10, background: SUNNY_SOFT, border: `2.5px solid ${selectedSprite === 'star' ? SUNNY : CHARCOAL}`, ...row, justifyContent: 'center', gap: 6, padding: 0 }}
            >
              <GlowingStarSvg size={34} />
              <span style={{ fontSize: 12, fontWeight: 800 }}>Bintang (1s)</span>
            </button>
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
  const [sprite, setSprite] = useState<'cloud' | 'star'>('cloud');

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 39" accentDot={SCRATCH_BLUE}>
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
          <JuniorIcon name="star-glow" size={24} />
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
          <Highlight>Awan &amp; Bintang</Highlight>
          <br />
          Meluncur Otomatis!
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
          Menggerakkan Objek Tanpa Henti dengan Blok Glide &amp; Forever
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
            <JuniorIcon name="cloud-sun" size={28} />
            <span>glide (secs)</span>
          </div>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: ORANGE,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="infinity" size={28} />
            <span>forever!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Authentic Scratch 3.0 Sky Glide UI + Biko */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #EFF6FF 0%, #FFF7ED 55%, #FEF9C3 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SCRATCH_BLUE}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 125, zIndex: 2 }}>
          <AuthenticScratch3GlideUI
            running={live && running}
            selectedSprite={sprite}
            onSelectSprite={setSprite}
            onToggleRun={() => {
              playGlideChime();
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
            animation: live ? 'cpj39-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={315}
            badgeIcon={<JuniorIcon name="star-glow" size={24} />}
            speechBubble="Indah sekali!"
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
        Apa Misi Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Animasi Langit Otomatis • Pertemuan 39"
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

            <div style={{ width: 295, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol, gap: 12 }}>
              <Scratch3GlideBlock secs={2} scale={0.78} />
              <GlowingStarSvg size={64} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Kenali Blok Biru <span style={{ color: '#1D4ED8' }}>glide</span> (<em>Meluncur Mulus</em>)
            </div>
          </div>

          {/* Kartu 2 (Oranye) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: ORANGE_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${ORANGE}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: ORANGE, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ width: 295, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 10 }}>
              <FluffyCloudSvg width={92} />
              <JuniorIcon name="infinity" size={48} />
              <GlowingStarSvg size={66} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Bikin <span style={{ color: '#C2410C' }}>Awan &amp; Bintang</span> Meluncur Terus!
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj39-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="star-glow" size={24} />}
          speechBubble="Meluncur mulus!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Blok Biru Baru: Meluncur Mulus (glide)!
// ============================================================================
const Slide03BlokGlide: Page = () => {
  return (
    <JuniorFrame badge="BLOK BIRU • MOTION" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Blok Biru <Highlight color="#DBEAFE">Meluncur Mulus</Highlight> (<em>Glide</em>)
      </SlideTitle>

      {/* Left Spotlight Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="glide (2) secs to [random position]"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ padding: '32px 26px', borderRadius: 28, background: CREAM, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}` }}>
            <Scratch3GlideBlock secs={2} scale={1.12} highlightSec />
          </div>

          <div style={{ width: '100%', height: 240, borderRadius: 26, background: '#1E1B4B', border: `3.5px solid ${CHARCOAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 32px' }}>
            <div style={{ opacity: 0.35 }}><GlowingStarSvg size={72} /></div>
            <div style={{ width: 220, borderTop: `5px dashed ${SUNNY}` }} />
            <GlowingStarSvg size={105} />
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
        headerLabel="Fungsi Blok Glide"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="star-glow" bgColor={SKY_SOFT} fontSize={32}>
              Pilih blok biru <strong>glide (1) secs to [random position]</strong>
            </BulletRow>
            <BulletRow icon="sparkle" bgColor={SUNNY_SOFT} fontSize={32}>
              Membuat benda <strong>Meluncur Halus</strong> ke tempat baru seperti perosotan!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: TEAL_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Berbeda dari lompat tiba-tiba, <strong>glide</strong> memindahkan karakter secara pelan dan mulus dari titik A ke titik B!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Atur Detiknya: Meluncur Cepat vs Santai!
// ============================================================================
const Slide04AturDetik: Page = () => {
  return (
    <JuniorFrame badge="ATUR KECEPATAN MELUNCUR" accentDot={SUNNY}>
      <SlideTitle>
        Ubah <Highlight>Angka Detiknya</Highlight> (<code>secs</code>)!
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1720}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Perbandingan Angka Detik (1 secs Cepat vs 3 secs Santai)"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Kartu Atas — Angka Kecil (1 secs) */}
          <div style={{ flex: 1, borderRadius: 24, background: SUNNY_SOFT, border: `3.5px solid ${SUNNY}`, padding: '24px 36px', ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 24 }}>
              <div style={{ width: 76, height: 76, borderRadius: 22, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
                <JuniorIcon name="lightning" size={44} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: '#B45309', marginBottom: 6 }}>
                  Angka Kecil (1 secs)
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                  <strong>glide (1) secs</strong> -&gt; Meluncur <strong>Cepat</strong> (<em>Seperti Bintang Jatuh!</em>)
                </div>
              </div>
            </div>
            <div style={{ ...row, gap: 18 }}>
              <Scratch3GlideBlock secs={1} scale={0.95} highlightSec />
              <GlowingStarSvg size={82} />
            </div>
          </div>

          {/* Kartu Bawah — Angka Besar (3 secs) */}
          <div style={{ flex: 1, borderRadius: 24, background: SKY_SOFT, border: `3.5px solid ${SKY}`, padding: '24px 36px', ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 24 }}>
              <div style={{ width: 76, height: 76, borderRadius: 22, background: SCRATCH_BLUE, color: WHITE, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
                <JuniorIcon name="cloud-sun" size={44} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: '#1D4ED8', marginBottom: 6 }}>
                  Angka Besar (3 secs)
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                  <strong>glide (3) secs</strong> -&gt; Meluncur <strong>Pelan &amp; Santai</strong> (<em>Seperti Awan Lembut!</em>)
                </div>
              </div>
            </div>
            <div style={{ ...row, gap: 18 }}>
              <Scratch3GlideBlock secs={3} scale={0.95} highlightSec />
              <FluffyCloudSvg width={104} />
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Gabungkan dengan forever: Meluncur Tanpa Henti!
// ============================================================================
const Slide05GabungForever: Page = () => {
  return (
    <JuniorFrame badge="BLOK ORANYE • CONTROL" accentDot={ORANGE}>
      <SlideTitle>
        Peluk Pakai <Highlight color="#FFEDD5">forever!</Highlight>
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Membuat Objek Meluncur Terus"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="infinity" bgColor={ORANGE_SOFT} fontSize={32}>
              Taruh blok <strong>glide</strong> <strong>Di Dalam</strong> mulut blok oranye <strong>forever</strong>
            </BulletRow>
            <BulletRow icon="star-glow" bgColor={SUNNY_SOFT} fontSize={32}>
              Awan &amp; Bintang akan meluncur otomatis <strong>Tanpa Pernah Berhenti!</strong>
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Setiap kali selesai meluncur ke satu titik, blok <strong>forever</strong> langsung menyuruhnya meluncur lagi ke titik acak berikutnya!
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
        titleBarColor={ORANGE_SOFT}
        headerLabel="when Bendera clicked -> forever -> glide"
        padding={32}
      >
        <div style={{ height: '100%', ...centerCol }}>
          <Scratch3ForeverGlideStack secs={2} scale={1.18} />
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Pilih Blok Meluncur!
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1620} top={122} size={48}>
        Blok Mana yang Membuat Bintang <Highlight>Meluncur Halus</Highlight> ke Tempat Lain?
      </SlideTitle>

      {/* Interactive Choice Cards */}
      <div style={{ ...abs(170, 245, 1580, 460), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Blok Glide) */}
        <button
          type="button"
          onClick={() => {
            playGlideChime();
            setPicked('A');
          }}
          className="cpj39-card-btn"
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

          <div style={{ marginTop: 22 }}>
            <Scratch3GlideBlock secs={2} scale={1.06} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
            Blok Glide (Meluncur)
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Blok Glide bikin bintang meluncur mulus!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Blok Sound) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj39-card-btn"
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
            animation: picked === 'B' ? 'cpj39-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div
            style={{
              marginTop: 22,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              height: 54,
              padding: '0 22px',
              borderRadius: 12,
              background: SCRATCH_SOUND,
              border: `3px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
              color: WHITE,
            }}
          >
            <JuniorIcon name="music-note" size={26} />
            <span>start sound [Pop]</span>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
            Blok Sound (Suara)
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Itu untuk bunyi suara, bukan meluncur!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 735, 1540, 265), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj39-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={220}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Mantap!' : 'Ayo tebak!'}
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
// SLIDE 07 — Resep Langit Ajaib: Kode Awan & Bintang!
// ============================================================================
const Slide07ResepLangit: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="RESEP LANGIT AJAIB" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Rangkai Kode <Highlight>Awan &amp; Bintang!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Bandingkan Angka Detik pada Awan (3 secs) vs Bintang (1 secs)"
        padding={34}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu Kiri — Kode Awan */}
          <div style={{ flex: 1, borderRadius: 24, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 8px 0 ${SKY}`, padding: '26px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center' }}>
            <div style={{ ...row, gap: 12 }}>
              <FluffyCloudSvg width={78} />
              <div style={{ padding: '7px 20px', borderRadius: 99, background: SCRATCH_BLUE, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700 }}>
                KODE AWAN (SANTAI)
              </div>
            </div>

            <Scratch3ForeverGlideStack secs={3} scale={0.96} />

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, color: CHARCOAL }}>
              Melayang <span style={{ color: '#1D4ED8' }}>Pelan &amp; Lembut</span>
            </div>
          </div>

          {/* Kartu Kanan — Kode Bintang */}
          <div style={{ flex: 1, borderRadius: 24, background: SUNNY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 8px 0 ${SUNNY}`, padding: '26px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center' }}>
            <div style={{ ...row, gap: 12 }}>
              <GlowingStarSvg size={64} />
              <div style={{ padding: '7px 20px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700 }}>
                KODE BINTANG (CERIA)
              </div>
            </div>

            <Scratch3ForeverGlideStack secs={1} scale={0.96} />

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, color: CHARCOAL }}>
              Meluncur <span style={{ color: '#B45309' }}>Lincah di Langit!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1475, 345, 360, 560),
          ...centerCol,
          animation: live ? 'cpj39-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={335}
          badgeIcon={<JuniorIcon name="star-glow" size={22} />}
          speechBubble="3s vs 1s!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Animasi Meluncur (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsLangit: Page = () => {
  return (
    <JuniorFrame badge="TIPS ANIMATOR LANGIT" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Langitmu <Highlight>Cantik &amp; Hidup!</Highlight>
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
            <BulletRow icon="cloud-sun" bgColor={TEAL_SOFT} fontSize={30}>
              Pakai <strong>3 detik</strong> untuk Awan agar melayang tenang
            </BulletRow>
            <BulletRow icon="infinity" bgColor={SUNNY_SOFT} fontSize={30}>
              Masukkan <strong>glide</strong> <strong>Ke Dalam</strong> blok <code>forever</code>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: '#1E1B4B', border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <FluffyCloudSvg width={110} />
            <GlowingStarSvg size={78} />
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
            <BulletRow icon="zero" bgColor={CORAL_SOFT} fontSize={30}>
              Mengisi angka <strong>0 detik</strong> (<em>benda langsung melompat</em>)
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={30}>
              Menaruh <strong>glide</strong> <strong>Di Luar</strong> <code>forever</code> (hanya 1 kali)
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <Scratch3GlideBlock secs={0} scale={0.85} highlightSec />
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Buat Langit Penuh Awan & Bintang!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [running, setRunning] = useState(true);
  const [sprite, setSprite] = useState<'cloud' | 'star'>('cloud');

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Awan &amp; Bintang Meluncur!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'moon' as JuniorIconName,
            text: (
              <>
                Pasang latar <strong>Langit / Luar Angkasa</strong> + Sprite <strong>Awan</strong> &amp; <strong>Bintang</strong>
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
                Rangkai <strong>when Bendera</strong>, <strong>forever</strong>, &amp; <strong>glide</strong> di tiap Sprite
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
                Klik <strong>Bendera Hijau!</strong> Saksikan awan &amp; bintang meluncur otomatis!
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

      {/* Playable Interactive Scratch 3.0 Glide Simulator */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratch3GlideUI
          running={live && running}
          selectedSprite={sprite}
          onSelectSprite={setSprite}
          onToggleRun={() => {
            playGlideChime();
            setRunning((r) => !r);
          }}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Toggle Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 14 }}>
        <div style={{ animation: live ? 'cpj39-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="star-glow" size={24} />}
            speechBubble={running ? 'Meluncur terus!' : 'Klik Bendera!'}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            playGlideChime();
            setRunning((r) => !r);
          }}
          className="cpj39-card-btn"
          style={{
            padding: '14px 26px',
            borderRadius: 20,
            background: running ? TEAL : SUNNY,
            color: running ? WHITE : CHARCOAL,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 23,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          <JuniorIcon name={running ? 'stop' : 'flag'} size={24} />
          <span>{running ? 'Jeda Langit' : 'Mulai Meluncur!'}</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 39 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj39-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj39-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="infinity" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj39-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={56}>
        Hore! Kamu <Highlight>Animator Langit Otomatis Hebat!</Highlight>{' '}
        <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 39"
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
          {/* Bespoke Golden Cloud, Gliding Star & Forever Infinity Medal SVG */}
          <div style={{ animation: live ? 'cpj39-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill="#1E1B4B" stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Soft White Cloud */}
              <path d="M74 128 C64 128, 60 118, 66 111 C66 99, 78 94, 88 99 C94 87, 114 87, 121 98 C132 96, 142 104, 139 115 C144 121, 138 128, 128 128 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
              {/* Golden Star */}
              <polygon points="154,64 159,75 171,77 162,85 164,97 154,91 144,97 146,85 137,77 149,75" fill={SUNNY} stroke={WHITE} strokeWidth={2.4} />
              {/* Forever Arc */}
              <path d="M88 152 C74 152, 74 138, 88 138 C100 138, 114 152, 126 152 C140 152, 140 138, 126 138 C114 138, 100 152, 88 152 Z" fill="none" stroke={ORANGE} strokeWidth={5} />
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
            <span>Lencana Master Glide &amp; Forever</span>
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
            Kamu sudah jago menggerakkan objek tanpa henti pakai{' '}
            <Highlight color="#DBEAFE">glide &amp; forever!</Highlight>
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
            speechBubble="Langit Indah!"
          />
          <div style={{ animation: live ? 'cpj39-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 39 — Awan & Bintang Meluncur Otomatis! ☁️⭐
Hari ini anak-anak membuat pemandangan langit yang hidup dengan Awan dan Bintang yang meluncur mulus tanpa henti!`,

  `Dua misi seru hari ini:
1. Mengenal Blok Biru "glide" (Meluncur Mulus).
2. Membuat Awan & Bintang meluncur otomatis terus-menerus pakai "forever"!`,

  `Blok Biru Baru — Meluncur Mulus: glide (1) secs to [random position]!
Berbeda dari melompat tiba-tiba, blok glide membuat benda meluncur halus ke tempat acak seperti perosotan!`,

  `Mengatur Kecepatan Meluncur (secs):
- Angka kecil seperti 1 secs = Meluncur CEPAT (cocok untuk Bintang Jatuh!).
- Angka besar seperti 3 secs = Meluncur PELAN & SANTAI (cocok untuk Awan Lembut!).`,

  `Gabungkan dengan blok oranye "forever":
Masukkan blok glide DI DALAM mulut blok forever agar Awan & Bintang terus meluncur otomatis tanpa pernah berhenti!`,

  `Permainan Cepat! Ayo tebak bersama:
Blok mana yang membuat Bintang meluncur halus ke tempat lain — Pilihan A (glide) atau Pilihan B (start sound)?`,

  `Resep Langit Ajaib:
- Sprite Awan: when Bendera clicked -> forever -> glide (3) secs to [random position]
- Sprite Bintang: when Bendera clicked -> forever -> glide (1) secs to [random position]`,

  `Tips Animator Langit:
BOLEH pakai 3 detik untuk Awan & masukkan glide ke dalam forever.
JANGAN isi angka 0 detik (benda langsung melompat!), atau menaruh glide di luar forever!`,

  `Misi Praktik Buat Langit Penuh Awan & Bintang!
Klik Sprite Awan atau Bintang di panggung slide untuk membandingkan kode 3 secs vs 1 secs sambil melihat keduanya meluncur!`,

  `Hore! Kamu Animator Langit Otomatis Hebat! 🎉🏅
Selamat meraih Lencana Master Glide & Forever di Pertemuan 39!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 39 — Awan & Bintang Meluncur Otomatis!',
  createdAt: '2026-11-16T15:38:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BlokGlide,
  Slide04AturDetik,
  Slide05GabungForever,
  Slide06AyoTebak,
  Slide07ResepLangit,
  Slide08TipsLangit,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

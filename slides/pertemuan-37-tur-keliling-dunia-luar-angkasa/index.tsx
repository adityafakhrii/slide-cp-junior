import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-37-tur-keliling-dunia-luar-angkasa';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj37-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj37-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj37-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj37-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj37-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj37-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.9); }
  50% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
}
.cpj37-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj37-card-btn:hover {
  transform: translateY(-4px);
}
.cpj37-card-btn:active {
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

/** Playful backdrop warp chime for Beach -> Space story transitions */
function playWarpChime(space = false) {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const seq = space ? [523.25, 659.25, 987.77] : [440, 587.33];
    seq.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + i * 0.07;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.2, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.24);
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
    accent: '#9966FF',
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
const SCRATCH_LOOKS = '#9966FF';
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
  accentDot = SCRATCH_LOOKS,
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
          animation: live ? 'cpj37-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: SCRATCH_LOOKS,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 37 • Tur Keliling Dunia &amp; Luar Angkasa!</span>
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
// Reusable Pertemuan 37 Visuals (Scratch Cat w/ Helmet, Beach & Space Scenes)
// ============================================================================

const ScratchCatSvg = ({
  size = 110,
  waving = false,
  astronautHelmet = false,
}: {
  size?: number;
  waving?: boolean;
  astronautHelmet?: boolean;
}) => (
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
    {astronautHelmet && (
      <g>
        <circle cx="70" cy="52" r="46" fill="#BAE6FD" fillOpacity={0.28} stroke="#E0F2FE" strokeWidth={4} />
        <path d="M40 30 Q54 16 74 18" fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" opacity={0.85} />
      </g>
    )}
  </svg>
);

const BeachBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 420 240" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="420" height="142" fill="#BAE6FD" />
    <circle cx="362" cy="40" r="22" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
    <path d="M0 142 H420 V178 H0 Z" fill="#38BDF8" />
    <path d="M0 172 Q210 156 420 172 V240 H0 Z" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={2.4} />
    {/* Palm Tree */}
    <path d="M52 175 Q60 120 48 80" stroke="#92400E" strokeWidth={10} strokeLinecap="round" />
    <path d="M48 80 Q22 72 16 92 M48 80 Q68 62 84 82 M48 80 Q32 52 54 48" stroke={TEAL} strokeWidth={8} strokeLinecap="round" fill="none" />
  </svg>
);

const SpaceBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 420 240" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="420" height="240" fill="#1E1B4B" />
    {[
      [42, 36], [120, 62], [185, 28], [260, 52], [356, 36], [76, 128], [385, 118], [150, 178],
    ].map(([cx, cy], idx) => (
      <circle key={idx} cx={cx} cy={cy} r={idx % 2 === 0 ? 3.2 : 2.2} fill={SUNNY_SOFT} />
    ))}
    {/* Ringed Planet */}
    <circle cx="322" cy="76" r="26" fill={LAVENDER} stroke={WHITE} strokeWidth={2} />
    <ellipse cx="322" cy="76" rx="44" ry="10" fill="none" stroke={SUNNY} strokeWidth={4} transform="rotate(-16 322 76)" />
    {/* Moon Surface */}
    <path d="M0 185 Q210 162 420 185 V240 H0 Z" fill="#CBD5E1" stroke={WHITE} strokeWidth={2} />
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

const Scratch3LooksBlock = ({
  children,
  scale = 1,
  activeGlow = false,
}: {
  children: ReactNode;
  scale?: number;
  activeGlow?: boolean;
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(7 * scale),
      height: Math.round(48 * scale),
      padding: `0 ${Math.round(16 * scale)}px`,
      borderRadius: Math.round(10 * scale),
      background: SCRATCH_LOOKS,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(17 * scale),
      fontWeight: 700,
      color: WHITE,
      boxShadow: activeGlow ? `0 0 0 5px rgba(251,191,36,0.75)` : undefined,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

/** Authentic Scratch 3.0 Beach -> Space Story Playground */
const AuthenticScratch3TourUI = ({
  scene,
  runningLine = 0,
  highlightBackdropBtn = false,
  onRunStory,
  onSelectScene,
  width = 880,
  height = 540,
}: {
  scene: 'beach' | 'space';
  runningLine?: number;
  highlightBackdropBtn?: boolean;
  onRunStory?: () => void;
  onSelectScene?: (s: 'beach' | 'space') => void;
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
        <span style={{ fontSize: 12, fontWeight: 800, color: WHITE }}>Tur Keliling Dunia &amp; Luar Angkasa</span>
      </div>

      {/* Main Split */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0, padding: 10, gap: 10 }}>
        {/* Left Code Area with 5-Block Story Chain */}
        <div
          style={{
            flex: 1.18,
            borderRadius: 16,
            backgroundColor: WHITE,
            backgroundImage: 'radial-gradient(#CBD5E1 1.4px, transparent 1.4px)',
            backgroundSize: '18px 18px',
            border: `2.5px solid ${CHARCOAL}`,
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            overflow: 'hidden',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: MUTED, marginBottom: 4 }}>Area Kode Cerita</div>
          <Scratch3HatFlagBlock scale={0.65} />
          <Scratch3LooksBlock scale={0.62} activeGlow={runningLine === 1}>
            <span>switch backdrop to</span>
            <span style={{ padding: '1px 8px', borderRadius: 99, background: '#7C3AED', border: `1.5px solid ${WHITE}` }}>Beach</span>
          </Scratch3LooksBlock>
          <Scratch3LooksBlock scale={0.62} activeGlow={runningLine === 1}>
            <span>say</span>
            <span style={{ padding: '1px 8px', borderRadius: 99, background: WHITE, color: CHARCOAL }}>Wah, pantai!</span>
            <span>for 2 s</span>
          </Scratch3LooksBlock>
          <Scratch3LooksBlock scale={0.62} activeGlow={runningLine === 2}>
            <span>switch backdrop to</span>
            <span style={{ padding: '1px 8px', borderRadius: 99, background: '#7C3AED', border: `1.5px solid ${WHITE}` }}>Space</span>
          </Scratch3LooksBlock>
          <Scratch3LooksBlock scale={0.62} activeGlow={runningLine === 2}>
            <span>say</span>
            <span style={{ padding: '1px 8px', borderRadius: 99, background: WHITE, color: CHARCOAL }}>Luar Angkasa!</span>
            <span>for 2 s</span>
          </Scratch3LooksBlock>
        </div>

        {/* Right Stage + Backdrop Picker */}
        <div style={{ flex: 1.05, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 38, borderRadius: 12, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: '0 10px', ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 8 }}>
              <button
                type="button"
                onClick={onRunStory}
                className="cpj37-card-btn"
                title="Mulai Cerita!"
                style={{ width: 34, height: 28, borderRadius: 8, background: TEAL_SOFT, border: `2.5px solid ${TEAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="flag" size={19} />
              </button>
              <div style={{ width: 34, height: 28, borderRadius: 8, background: CORAL_SOFT, border: `2px solid ${CORAL}`, ...centerCol }}>
                <JuniorIcon name="stop" size={19} />
              </div>
            </div>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 12, fontWeight: 700, color: SCRATCH_LOOKS }}>
              {scene === 'beach' ? 'Latar: Beach' : 'Latar: Space'}
            </span>
          </div>

          <div style={{ flex: 1.25, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            {scene === 'beach' ? <BeachBackdropSvg /> : <SpaceBackdropSvg />}

            <div style={{ position: 'absolute', left: '18%', bottom: '8%' }}>
              <ScratchCatSvg size={100} waving astronautHelmet={scene === 'space'} />
              <div style={{ position: 'absolute', left: 78, top: -18, padding: '6px 12px', borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>
                {scene === 'beach' ? 'Wah, indahnya pantai!' : 'Hore, di Luar Angkasa!'}
              </div>
            </div>
          </div>

          {/* Bottom Stage Backdrop Selector */}
          <div style={{ height: 68, borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: '6px 10px', ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 8 }}>
              <button
                type="button"
                onClick={() => onSelectScene?.('beach')}
                className="cpj37-card-btn"
                style={{ width: 64, height: 48, borderRadius: 10, border: `2.5px solid ${scene === 'beach' ? SUNNY : CHARCOAL}`, overflow: 'hidden', padding: 0 }}
              >
                <BeachBackdropSvg />
              </button>
              <button
                type="button"
                onClick={() => onSelectScene?.('space')}
                className="cpj37-card-btn"
                style={{ width: 64, height: 48, borderRadius: 10, border: `2.5px solid ${scene === 'space' ? SUNNY : CHARCOAL}`, overflow: 'hidden', padding: 0 }}
              >
                <SpaceBackdropSvg />
              </button>
            </div>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 99,
                background: highlightBackdropBtn ? SUNNY : TEAL,
                border: `2.5px solid ${CHARCOAL}`,
                ...centerCol,
                animation: highlightBackdropBtn ? 'cpj37-pulse 1.8s infinite' : undefined,
              }}
            >
              <JuniorIcon name="landscape" size={22} />
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
  const [scene, setScene] = useState<'beach' | 'space'>('space');
  const [line, setLine] = useState(2);

  const handleRunStory = () => {
    playWarpChime(false);
    setScene('beach');
    setLine(1);
    setTimeout(() => {
      playWarpChime(true);
      setScene('space');
      setLine(2);
    }, 1200);
  };

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 37" accentDot={SCRATCH_LOOKS}>
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
          <JuniorIcon name="rocket" size={24} />
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          <Highlight>Tur Keliling Dunia</Highlight>
          <br />
          &amp; Luar Angkasa!
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
          Cerita Animasi Balon Dialog &amp; Pergantian Backdrop Panggung
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
            <JuniorIcon name="say" size={28} />
            <span>Balon Dialog!</span>
          </div>
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
            <JuniorIcon name="globe" size={28} />
            <span>Ganti Latar!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Authentic Scratch 3.0 Story Tour + Biko */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #F3EEFF 0%, #EFF6FF 55%, #FEF9C3 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${LAVENDER}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 125, zIndex: 2 }}>
          <AuthenticScratch3TourUI
            scene={scene}
            runningLine={line}
            onRunStory={handleRunStory}
            onSelectScene={(s) => {
              playWarpChime(s === 'space');
              setScene(s);
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
            animation: live ? 'cpj37-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="rocket" size={24} />}
            speechBubble={scene === 'space' ? 'Luar Angkasa!' : 'Pantai cerah!'}
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
    <JuniorFrame badge="MISI HARI INI" accentDot={SCRATCH_LOOKS}>
      <SlideTitle>
        Apa Misi Petualangan <Highlight>Kita Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Cerita Animasi • Pertemuan 37"
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
              <Scratch3LooksBlock scale={0.95}>
                <span>say [Halo!] for 2s</span>
              </Scratch3LooksBlock>
              <JuniorIcon name="say" size={48} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Bikin <span style={{ color: '#6D28D9' }}>Kucing Bicara</span> Pakai <span style={{ color: '#6D28D9' }}>Balon Dialog</span>
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

            <div style={{ width: 290, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol, gap: 10 }}>
              <Scratch3LooksBlock scale={0.85}>
                <span>switch backdrop to Space</span>
              </Scratch3LooksBlock>
              <div style={{ ...row, gap: 14 }}>
                <JuniorIcon name="globe" size={50} />
                <JuniorIcon name="rocket" size={50} />
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Sulap Latar <span style={{ color: '#1D4ED8' }}>Dunia ke Luar Angkasa!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj37-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="map" size={24} />}
          speechBubble="Jalan-jalan yuk!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Blok Ungu Baru #1: Balon Dialog (say for 2 seconds)
// ============================================================================
const Slide03BalonDialog: Page = () => {
  return (
    <JuniorFrame badge="BLOK UNGU • LOOKS" accentDot={SCRATCH_LOOKS}>
      <SlideTitle>
        Blok Ungu <Highlight color="#F3EEFF">Balon Dialog!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="say [Hello!] for (2) seconds"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ padding: '32px 28px', borderRadius: 28, background: CREAM, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}` }}>
            <Scratch3LooksBlock scale={1.18} activeGlow>
              <span>say</span>
              <span style={{ padding: '2px 12px', borderRadius: 99, background: WHITE, color: CHARCOAL }}>Halo, ayo jalan-jalan!</span>
              <span>for 2s</span>
            </Scratch3LooksBlock>
          </div>

          <div style={{ width: '100%', padding: '26px 32px', borderRadius: 26, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 22 }}>
            <ScratchCatSvg size={145} waving />
            <div style={{ padding: '16px 26px', borderRadius: 24, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 5px 0 ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
              Halo, ayo jalan-jalan!
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
        headerLabel="Balon Percakapan Berbatas Waktu"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="say" bgColor={LAVENDER_SOFT} fontSize={32}>
              Pilih blok <strong>say [Hello!] for (2) seconds</strong>
            </BulletRow>
            <BulletRow icon="clock" bgColor={SUNNY_SOFT} fontSize={32}>
              Balon kata muncul <strong>2 Detik</strong>, lalu hilang otomatis untuk kalimat berikutnya!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: TEAL_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Kamu bisa mengetik kalimat ceritamu sendiri di dalam kotak putihnya — bebas berimajinasi!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Langkah Persiapan: Pilih Latar Dunia & Antariksa!
// ============================================================================
const Slide04PersiapanLatar: Page = () => {
  const [scene, setScene] = useState<'beach' | 'space'>('beach');

  return (
    <JuniorFrame badge="PERSIAPAN PANGGUNG" accentDot={TEAL}>
      <SlideTitle>
        Tambah <Highlight>2 Latar</Highlight> Panggung (<em>Backdrops</em>)!
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={790}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Menambah Latar Cerita"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="landscape" bgColor={TEAL_SOFT} fontSize={32}>
              Klik ikon <strong>Choose a Backdrop</strong> di pojok kanan bawah
            </BulletRow>
            <BulletRow icon="rocket" bgColor={SKY_SOFT} fontSize={32}>
              Pilih <strong>2 Pemandangan</strong>: misalnya <strong>Pantai (Beach)</strong> &amp; <strong>Luar Angkasa (Space)</strong>!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Klik kotak kecil Pantai atau Space di kanan bawah layar untuk langsung melihat pratinjaunya!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight: Scratch 3.0 UI Highlighting Choose a Backdrop */}
      <div style={{ ...abs(920, 235, 900, 720) }}>
        <AuthenticScratch3TourUI
          scene={scene}
          highlightBackdropBtn
          onSelectScene={(s) => {
            playWarpChime(s === 'space');
            setScene(s);
          }}
          width={900}
          height={720}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Blok Ungu Baru #2: Ganti Latar (switch backdrop)
// ============================================================================
const Slide05BlokBackdrop: Page = () => {
  const [isSpace, setIsSpace] = useState(true);

  return (
    <JuniorFrame badge="BLOK UNGU • SULAP LATAR" accentDot={SCRATCH_LOOKS}>
      <SlideTitle>
        Blok <Highlight color="#F3EEFF">switch backdrop to</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Menyulap Pemandangan Seketika"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <button
            type="button"
            onClick={() => {
              const next = !isSpace;
              playWarpChime(next);
              setIsSpace(next);
            }}
            className="cpj37-card-btn"
            style={{ background: 'transparent', border: 'none', padding: 0 }}
          >
            <Scratch3LooksBlock scale={1.32} activeGlow>
              <span>switch backdrop to</span>
              <span style={{ padding: '3px 16px', borderRadius: 99, background: WHITE, color: CHARCOAL, border: `3px solid ${SUNNY}` }}>
                {isSpace ? 'Space' : 'Beach'}
              </span>
            </Scratch3LooksBlock>
          </button>

          <div style={{ width: '100%', height: 265, borderRadius: 24, border: `3.5px solid ${CHARCOAL}`, overflow: 'hidden', position: 'relative' }}>
            {isSpace ? <SpaceBackdropSvg /> : <BeachBackdropSvg />}
            <div style={{ position: 'absolute', left: '40%', bottom: '8%' }}>
              <ScratchCatSvg size={120} waving astronautHelmet={isSpace} />
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
        headerLabel="Fungsi switch backdrop to"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="sparkle" bgColor={LAVENDER_SOFT} fontSize={32}>
              Ada di rak <strong>Blok Ungu (Looks)</strong>
            </BulletRow>
            <BulletRow icon="landscape" bgColor={SKY_SOFT} fontSize={32}>
              Menyulap gambar panggung <strong>Berubah Seketika!</strong>
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Coba klik blok ungu di sebelah kiri untuk melihat latar berpindah antara Pantai dan Luar Angkasa!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Pilih Blok Pemindah Latar!
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1620} top={122} size={48}>
        Blok Mana untuk Mengubah Pemandangan ke <Highlight color="#F3EEFF">Luar Angkasa?</Highlight>
      </SlideTitle>

      {/* Interactive Choice Cards */}
      <div style={{ ...abs(170, 245, 1580, 460), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: switch backdrop to Space) */}
        <button
          type="button"
          onClick={() => {
            playWarpChime(true);
            setPicked('A');
          }}
          className="cpj37-card-btn"
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
            <JuniorIcon name="rocket" size={48} />
            <Scratch3LooksBlock scale={1.12}>
              <span>switch backdrop to [Space]</span>
            </Scratch3LooksBlock>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
            Ganti Latar (Switch Backdrop)
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Blok switch backdrop langsung mengganti latar panggung!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: say Halo! for 2 seconds) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj37-card-btn"
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
            animation: picked === 'B' ? 'cpj37-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 22, ...row, gap: 14 }}>
            <JuniorIcon name="say" size={48} />
            <Scratch3LooksBlock scale={1.12}>
              <span>say [Halo!] for (2) seconds</span>
            </Scratch3LooksBlock>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
            Balon Dialog (Say)
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Blok Say untuk memunculkan balon kata, bukan ganti latar!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 735, 1540, 265), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj37-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={220}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Betul!' : 'Ayo tebak!'}
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
// SLIDE 07 — Resep Cerita: Tur Keliling Dunia & Luar Angkasa!
// ============================================================================
const Slide07ResepCerita: Page = () => {
  return (
    <JuniorFrame badge="RESEP CERITA ANIMASI" accentDot={SCRATCH_LOOKS}>
      <SlideTitle>
        Rangkai <Highlight>Cerita Petualangan!</Highlight>
      </SlideTitle>

      {/* Left Spotlight: 5-Block Puzzle Stack */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Urutan 5 Balok Cerita Petualangan"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: 8, paddingLeft: 44 }}>
          <Scratch3HatFlagBlock scale={1.18} />
          <Scratch3LooksBlock scale={1.06}>
            <span>switch backdrop to</span>
            <span style={{ padding: '2px 12px', borderRadius: 99, background: '#7C3AED', border: `2px solid ${WHITE}` }}>Beach</span>
          </Scratch3LooksBlock>
          <Scratch3LooksBlock scale={1.06}>
            <span>say</span>
            <span style={{ padding: '2px 12px', borderRadius: 99, background: WHITE, color: CHARCOAL }}>Wah, indahnya pantai!</span>
            <span>for 2s</span>
          </Scratch3LooksBlock>
          <Scratch3LooksBlock scale={1.06} activeGlow>
            <span>switch backdrop to</span>
            <span style={{ padding: '2px 12px', borderRadius: 99, background: '#7C3AED', border: `2px solid ${WHITE}` }}>Space</span>
          </Scratch3LooksBlock>
          <Scratch3LooksBlock scale={1.06}>
            <span>say</span>
            <span style={{ padding: '2px 12px', borderRadius: 99, background: WHITE, color: CHARCOAL }}>Sampai di Luar Angkasa!</span>
            <span>for 2s</span>
          </Scratch3LooksBlock>
        </div>
      </MacWindowCard>

      {/* Right 3 Step Explanation Cards */}
      <MacWindowCard
        left={980}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Alur 3 Babak Cerita"
        padding={36}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <div style={{ borderRadius: 22, background: SUNNY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${SUNNY}`, padding: '22px 26px', ...row, gap: 18 }}>
            <div style={{ width: 58, height: 58, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
              1
            </div>
            <div style={{ fontSize: 27, fontWeight: 800 }}>
              Mulai: <strong>when Bendera clicked</strong>
            </div>
          </div>

          <div style={{ borderRadius: 22, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${SKY}`, padding: '22px 26px', ...row, gap: 18 }}>
            <div style={{ width: 58, height: 58, borderRadius: 18, background: SCRATCH_BLUE, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
              2
            </div>
            <div style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.3 }}>
              Tempat 1: <strong>switch backdrop [Beach]</strong> -&gt; <strong>say ... for 2s</strong>
            </div>
          </div>

          <div style={{ borderRadius: 22, background: LAVENDER_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${LAVENDER}`, padding: '22px 26px', ...row, gap: 18 }}>
            <div style={{ width: 58, height: 58, borderRadius: 18, background: SCRATCH_LOOKS, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
              3
            </div>
            <div style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.3 }}>
              Angkasa: <strong>switch backdrop [Space]</strong> -&gt; <strong>say ... for 2s</strong>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Cerita Animasi (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsSutradara: Page = () => {
  return (
    <JuniorFrame badge="TIPS SUTRADARA CILIK" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Ceritamu <Highlight>Seru &amp; Lancar!</Highlight>
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
            <BulletRow icon="landscape" bgColor={TEAL_SOFT} fontSize={30}>
              Tambahkan <strong>Semua Latar</strong> dulu di pojok kanan bawah
            </BulletRow>
            <BulletRow icon="clock" bgColor={SUNNY_SOFT} fontSize={30}>
              Pakai <strong>say ... for (2) seconds</strong> agar dialog bergantian rapi
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, border: `3.5px solid ${TEAL}`, position: 'relative', overflow: 'hidden' }}>
            <SpaceBackdropSvg />
            <div style={{ position: 'absolute', inset: 0, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
              <ScratchCatSvg size={115} waving astronautHelmet />
              <div style={{ padding: '10px 18px', borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                Halo Angkasa!
              </div>
              <JuniorIcon name="check" size={58} />
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
            <BulletRow icon="say" bgColor={CORAL_SOFT} fontSize={30}>
              Memakai blok <strong>say</strong> tanpa detik (tulisan tidak mau hilang)
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={30}>
              Lupa mengganti <strong>Nama Latar</strong> di dalam blok <code>switch backdrop</code>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ padding: '8px 18px', borderRadius: 14, background: WHITE, border: `2.5px solid ${CORAL}`, fontSize: 20, fontWeight: 800 }}>Halo?</div>
              <div style={{ padding: '8px 18px', borderRadius: 14, background: WHITE, border: `2.5px solid ${CORAL}`, fontSize: 20, fontWeight: 800, marginTop: -14 }}>Menumpuk!</div>
            </div>
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Buat Cerita Tur Keliling Dunia!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [scene, setScene] = useState<'beach' | 'space'>('space');
  const [line, setLine] = useState(2);

  const handleRunStory = () => {
    playWarpChime(false);
    setScene('beach');
    setLine(1);
    setTimeout(() => {
      playWarpChime(true);
      setScene('space');
      setLine(2);
    }, 1200);
  };

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Tur Keliling Dunia &amp; Luar Angkasa!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'globe' as JuniorIconName,
            text: (
              <>
                Pilih <strong>2 Latar</strong> (<strong>Pantai/Kota</strong> &amp; <strong>Luar Angkasa</strong>) + <strong>Kucing Scratch</strong>
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
                Rangkai <strong>switch backdrop</strong> &amp; <strong>say for (2) seconds</strong> berurutan
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
                Klik <strong>Bendera Hijau!</strong> Saksikan petualangan keliling duniamu!
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

      {/* Playable Interactive Scratch 3.0 Story Tour Simulator */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratch3TourUI
          scene={scene}
          runningLine={line}
          onRunStory={handleRunStory}
          onSelectScene={(s) => {
            playWarpChime(s === 'space');
            setScene(s);
          }}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Play Tour Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 14 }}>
        <div style={{ animation: live ? 'cpj37-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="rocket" size={24} />}
            speechBubble={scene === 'space' ? 'Luar Angkasa!' : 'Pantai cerah!'}
          />
        </div>
        <button
          type="button"
          onClick={handleRunStory}
          className="cpj37-card-btn"
          style={{
            padding: '14px 26px',
            borderRadius: 20,
            background: TEAL,
            color: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 23,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          <JuniorIcon name="flag" size={26} />
          <span>Mulai Tur Cerita!</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 37 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj37-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj37-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="rocket" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj37-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={56}>
        Hore! Kamu <Highlight>Sutradara Keliling Dunia Hebat!</Highlight>{' '}
        <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 37"
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
          {/* Bespoke Golden Earth Globe + Star Rocket + Speech Bubble Medal SVG */}
          <div style={{ animation: live ? 'cpj37-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={SCRATCH_LOOKS} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill="#1E1B4B" stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Earth Globe */}
              <circle cx="110" cy="116" r="34" fill={SKY} stroke={WHITE} strokeWidth={3} />
              <path d="M90 104 Q104 96 112 110 Q100 122 90 116 Z" fill={TEAL} />
              <path d="M118 116 Q130 110 135 126 Q124 136 114 130 Z" fill={TEAL} />
              {/* Mini Rocket */}
              <path d="M148 70 C158 58, 170 58, 172 72 C164 82, 152 84, 148 70 Z" fill={CORAL} stroke={WHITE} strokeWidth={2.5} />
              {/* Speech Bubble */}
              <rect x="64" y="64" width="44" height="24" rx="10" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
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
            <span>Lencana Sutradara Cerita &amp; Antariksa</span>
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
            <Highlight color="#F3EEFF">say for 2 seconds &amp; switch backdrop!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Astronaut Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="rocket" size={22} />}
            speechBubble="Ke Antariksa!"
          />
          <div style={{ animation: live ? 'cpj37-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <ScratchCatSvg size={185} waving astronautHelmet />
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
  `Selamat datang di Pertemuan 37 — Tur Keliling Dunia & Luar Angkasa! 🌍🚀
Hari ini anak-anak menjadi Sutradara Cilik yang membuat cerita animasi berpindah dari Pantai ke Luar Angkasa!`,

  `Dua misi petualangan hari ini:
1. Membuat Kucing Scratch bicara memakai balon dialog "say for 2 seconds".
2. Menyulap latar panggung berubah dari Bumi/Pantai ke Luar Angkasa!`,

  `Blok Ungu Baru #1 — Balon Dialog: say [Hello!] for (2) seconds!
Balon percakapan muncul selama 2 detik lalu otomatis hilang agar cerita dapat lanjut ke kalimat berikutnya.`,

  `Persiapan Panggung: Tambah 2 Latar (Backdrops)!
Klik ikon Choose a Backdrop di pojok kanan bawah lalu pilih Beach (Pantai) dan Space (Luar Angkasa).`,

  `Blok Ungu Baru #2 — Ganti Latar: switch backdrop to [Space]!
Klik langsung blok ungunya di slide untuk melihat Kucing Scratch memakai helm astronot dan latar berubah seketika!`,

  `Permainan Cepat! Ayo tebak bersama:
Blok mana untuk mengubah pemandangan panggung ke Luar Angkasa — Pilihan A (switch backdrop to Space) atau Pilihan B (say)?`,

  `Resep Cerita Petualangan 5 Balok:
1. when Bendera clicked
2. switch backdrop to [Beach] -> say "Wah, indahnya pantai!" for 2s
3. switch backdrop to [Space] -> say "Sampai di Luar Angkasa!" for 2s`,

  `Tips Sutradara Cilik:
BOLEH tambahkan semua latar dulu di kanan bawah & gunakan "say ... for 2 seconds".
JANGAN memakai blok say tanpa detik (tulisan tidak hilang), atau lupa memilih nama latar di switch backdrop!`,

  `Misi Praktik Tur Keliling Dunia & Luar Angkasa!
Klik "Mulai Tur Cerita!" atau tombol Pantai/Space di panggung untuk menyaksikan petualangan Kucing Scratch!`,

  `Hore! Kamu Sutradara Keliling Dunia Hebat! 🎉🏅
Selamat meraih Lencana Sutradara Cerita & Antariksa di Pertemuan 37!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 37 — Tur Keliling Dunia & Luar Angkasa!',
  createdAt: '2026-11-16T15:29:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BalonDialog,
  Slide04PersiapanLatar,
  Slide05BlokBackdrop,
  Slide06AyoTebak,
  Slide07ResepCerita,
  Slide08TipsSutradara,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

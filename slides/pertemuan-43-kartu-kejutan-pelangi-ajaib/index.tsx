import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-43-kartu-kejutan-pelangi-ajaib';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj43-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj43-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj43-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj43-rainbow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
@keyframes cpj43-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj43-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj43-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj43-card-btn:hover {
  transform: translateY(-4px);
}
.cpj43-card-btn:active {
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

/** Playful magic chime or gentle buzzer via Web Audio API */
function playMagicSound(kind: 'magic' | 'boing' | 'reset') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    if (kind === 'magic') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.06);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.24);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.32);
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
      osc.frequency.setValueAtTime(784, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(523.25, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
    setTimeout(() => {
      void ctx.close();
    }, 380);
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
          animation: live ? 'cpj43-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 43 • Kartu Kejutan Pelangi Ajaib!</span>
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
        <span style={{ width: 16, height: 16, borderRadius: 99, background: CORAL, border: `2px solid ${CHARCOAL}` }} />
        <span style={{ width: 16, height: 16, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}` }} />
        <span style={{ width: 16, height: 16, borderRadius: 99, background: TEAL, border: `2px solid ${CHARCOAL}` }} />
      </div>
      {headerLabel && (
        <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700, color: MUTED }}>
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
// Reusable Pertemuan 43 Visuals (Rainbow Scratch Cat, Effect Variants, Blocks)
// ============================================================================

const ScratchCatSvg = ({
  size = 115,
  furColor = '#FF8C1A',
  waving = false,
  effect = 'none',
}: {
  size?: number;
  furColor?: string;
  waving?: boolean;
  effect?: 'none' | 'whirl' | 'fisheye' | 'pixelate';
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 140 140"
    fill="none"
    style={{
      transform: effect === 'whirl' ? 'skewX(-12deg) rotate(-14deg)' : effect === 'fisheye' ? 'scale(1.18, 0.94)' : undefined,
      transition: 'transform 220ms ease',
    }}
  >
    <ellipse cx="70" cy="128" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path d="M40 100 C20 96, 14 78, 25 69 C32 63, 38 71, 35 78 C33 83, 38 90, 46 90" fill={furColor} stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <ellipse cx="56" cy="120" rx="11" ry="7" fill={furColor} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="120" rx="11" ry="7" fill={furColor} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="70" cy="96" rx={effect === 'fisheye' ? 32 : 25} ry="23" fill={furColor} stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="98" rx="14" ry="14" fill={WHITE} />
    <path d="M46 86 C35 90, 35 103, 45 103" fill={furColor} stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d={waving ? 'M94 82 C112 72, 114 54, 105 50 C98 46, 92 58, 92 72' : 'M94 86 C105 90, 105 103, 95 103'} fill={furColor} stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d="M36 52 L34 16 L60 35 Z" fill={furColor} stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
    <path d="M104 52 L106 16 L80 35 Z" fill={furColor} stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
    <ellipse cx="70" cy="56" rx={effect === 'fisheye' ? 46 : 38} ry={effect === 'fisheye' ? 34 : 29} fill={furColor} stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="65" rx="25" ry="16" fill={WHITE} />
    <ellipse cx="56" cy="50" rx={effect === 'fisheye' ? 11 : 7} ry={effect === 'fisheye' ? 13 : 9} fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    <ellipse cx="84" cy="50" rx={effect === 'fisheye' ? 11 : 7} ry={effect === 'fisheye' ? 13 : 9} fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    <circle cx="58" cy="50" r="3.6" fill={CHARCOAL} />
    <circle cx="82" cy="50" r="3.6" fill={CHARCOAL} />
    <polygon points="66,58 74,58 70,63" fill={CHARCOAL} />
    <path d="M62 67 Q70 74 78 67" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
    {effect === 'pixelate' && (
      <g opacity={0.42} stroke={WHITE} strokeWidth={2}>
        <line x1="25" y1="36" x2="115" y2="36" />
        <line x1="25" y1="54" x2="115" y2="54" />
        <line x1="25" y1="72" x2="115" y2="72" />
        <line x1="25" y1="90" x2="115" y2="90" />
        <line x1="46" y1="20" x2="46" y2="122" />
        <line x1="64" y1="20" x2="64" y2="122" />
        <line x1="82" y1="20" x2="82" y2="122" />
        <line x1="100" y1="20" x2="100" y2="122" />
      </g>
    )}
  </svg>
);

const Scratch3HatBlock = ({ scale = 1, kind = 'sprite' }: { scale?: number; kind?: 'sprite' | 'flag' }) => (
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
    {kind === 'sprite' ? (
      <span>when this sprite clicked</span>
    ) : (
      <>
        <span>when</span>
        <JuniorIcon name="flag" size={Math.round(22 * scale)} />
        <span>clicked</span>
      </>
    )}
  </div>
);

const Scratch3LooksBlock = ({ scale = 1, children }: { scale?: number; children: ReactNode }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(46 * scale),
      padding: `0 ${Math.round(18 * scale)}px`,
      borderRadius: Math.round(12 * scale),
      background: SCRATCH_LOOKS,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      color: WHITE,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

const Scratch3BlueBlock = ({ scale = 1, children }: { scale?: number; children: ReactNode }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(46 * scale),
      padding: `0 ${Math.round(18 * scale)}px`,
      borderRadius: Math.round(12 * scale),
      background: SCRATCH_BLUE,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      color: WHITE,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

const RainbowPill = ({ children }: { children: string }) => (
  <span style={{ padding: '2px 11px', borderRadius: 99, background: '#774DCB', border: `2px solid ${WHITE}`, color: WHITE }}>
    {children}
  </span>
);

const NumPill = ({ val }: { val: number | string }) => (
  <span style={{ padding: '2px 11px', borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}`, color: CHARCOAL }}>
    {val}
  </span>
);

// ============================================================================
// SLIDE 01 — Cover
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 43" accentDot={SCRATCH_LOOKS}>
      {/* Left Hero Copy */}
      <div style={{ ...abs(X0, 225, 860) }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 20px',
            borderRadius: 99,
            background: LAVENDER_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 22,
          }}
        >
          <JuniorIcon name="rainbow" size={26} />
          <span>Sulap Visual Interaktif di Scratch 3.0</span>
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
          <Highlight>Kartu Kejutan</Highlight>
          <br />
          Pelangi Ajaib!
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
          Sulap <strong style={{ color: CHARCOAL }}>Efek Warna, Ukuran &amp; Grafis</strong>{' '}
          Interaktif di Scratch 3.0!
        </p>

        <div style={{ ...row, gap: 16, marginTop: 34 }}>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: LAVENDER_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="paintbrush" size={24} />
            <span>color effect</span>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="grow" size={24} />
            <span>change size</span>
          </div>
        </div>
      </div>

      {/* Right Visual: Biko Rainbow Artist + Rainbow Scratch Cat Party Stage */}
      <MacWindowCard
        left={1010}
        top={185}
        width={810}
        height={690}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Scratch 3.0 • Kartu Kejutan Pelangi"
        padding={26}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 20,
            border: `3px solid ${CHARCOAL}`,
            background: 'linear-gradient(135deg, #FEF9C3 0%, #FCE7F3 48%, #DBEAFE 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ ...abs(42, 30), animation: live ? 'cpj43-confetti 2.4s ease-in-out infinite' : undefined }}>
            <JuniorIcon name="balloon" size={62} />
          </div>
          <div style={{ ...abs(630, 34), animation: live ? 'cpj43-twinkle 2.2s ease-in-out infinite' : undefined }}>
            <JuniorIcon name="star-glow" size={58} />
          </div>
          <div style={{ ...abs(560, 400), animation: live ? 'cpj43-confetti 2.8s ease-in-out infinite' : undefined }}>
            <JuniorIcon name="party" size={58} />
          </div>

          {/* Rainbow hue-cycling Scratch Cat */}
          <div
            style={{
              ...abs(345, 115),
              animation: live ? 'cpj43-rainbow 4.5s linear infinite, cpj43-hop 2.4s ease-in-out infinite' : undefined,
            }}
          >
            <ScratchCatSvg size={220} furColor="#A78BFA" waving />
          </div>

          <div style={{ ...abs(18, 240), animation: live ? 'cpj43-float 3s ease-in-out infinite' : undefined }}>
            <BikoMascot
              pose="thumbs-up"
              width={245}
              badgeIcon={<JuniorIcon name="paintbrush" size={20} />}
              speechBubble="Abrakadabra!"
            />
          </div>

          <div style={{ ...abs(34, 485) }}>
            <Scratch3LooksBlock scale={0.9}>
              <span>change</span>
              <RainbowPill>color</RainbowPill>
              <span>effect by</span>
              <NumPill val={25} />
            </Scratch3LooksBlock>
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
    <JuniorFrame badge="MISI HARI INI" accentDot={SUNNY}>
      <SlideTitle>
        Apa Misi Sulap Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      {/* Biko Left Anchor */}
      <div style={{ ...abs(95, 295, 360, 620), ...centerCol }}>
        <div style={{ animation: live ? 'cpj43-hop 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="point-left"
            width={320}
            badgeIcon={<JuniorIcon name="rainbow" size={22} />}
            speechBubble="Siap menyulap!"
          />
        </div>
      </div>

      {/* macOS Window with 2 Cards */}
      <MacWindowCard
        left={480}
        top={240}
        width={1340}
        height={700}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Misi Pertemuan 43"
        padding={42}
      >
        <div style={{ display: 'flex', gap: 36, height: '100%' }}>
          {/* Card 1: Purple Magic Color & Size */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: LAVENDER_SOFT,
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
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SCRATCH_LOOKS, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
              <JuniorIcon name="paintbrush" size={76} />
              <Scratch3LooksBlock scale={0.9}>
                <span>change</span>
                <RainbowPill>color</RainbowPill>
                <span>effect</span>
              </Scratch3LooksBlock>
            </div>

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Kenali Blok Ungu <span style={{ color: '#6D28D9' }}>Sulap Warna &amp; Ukuran</span>
            </div>
          </div>

          {/* Card 2: Interactive Rainbow Card */}
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
              MISI 2
            </div>

            <div style={{ ...row, gap: 16 }}>
              <JuniorIcon name="balloon" size={74} />
              <ScratchCatSvg size={125} furColor="#38BDF8" waving />
              <JuniorIcon name="star-glow" size={72} />
            </div>

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Bikin <span style={{ color: '#B45309' }}>Kartu Kejutan Pelangi</span> Interaktif!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Blok Ungu Baru #1: Sulap Warna Pelangi (color effect)
// ============================================================================
const Slide03SulapWarna: Page = () => {
  const RAINBOW_CAT_COLORS = ['#FF8C1A', '#60A5FA', '#A78BFA', '#10B981', '#EC4899'];
  const [colorIdx, setColorIdx] = useState(1);

  return (
    <JuniorFrame badge="BLOK UNGU • LOOKS" accentDot={SCRATCH_LOOKS}>
      <SlideTitle>
        Blok Ungu <Highlight color="#EDE9FE">Sulap Warna!</Highlight>
      </SlideTitle>

      {/* Left Interactive Color Demo */}
      <MacWindowCard
        left={X0}
        top={245}
        width={820}
        height={680}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Klik Kucing / Blok untuk Sulap Warna!"
        padding={32}
      >
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-between' }}>
          <button
            type="button"
            onClick={() => {
              playMagicSound('magic');
              setColorIdx((i) => (i + 1) % RAINBOW_CAT_COLORS.length);
            }}
            className="cpj43-card-btn"
            style={{
              width: '100%',
              height: 330,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 100%)',
              border: `3px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'center',
              gap: 32,
            }}
          >
            <ScratchCatSvg size={220} furColor={RAINBOW_CAT_COLORS[colorIdx]} waving />
            <JuniorIcon name="rainbow" size={88} />
          </button>

          <button
            type="button"
            onClick={() => {
              playMagicSound('magic');
              setColorIdx((i) => (i + 1) % RAINBOW_CAT_COLORS.length);
            }}
            className="cpj43-card-btn"
            style={{ background: 'transparent', border: 'none', padding: 0 }}
          >
            <Scratch3LooksBlock scale={1.32}>
              <span>change</span>
              <RainbowPill>color</RainbowPill>
              <span>effect by</span>
              <NumPill val={25} />
            </Scratch3LooksBlock>
          </button>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Explanation */}
      <MacWindowCard
        left={960}
        top={245}
        width={860}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Cara Pakai Sulap Warna"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="rainbow" bgColor={LAVENDER_SOFT} fontSize={32}>
              Pilih blok ungu <code>change [color] effect by (25)</code>
            </BulletRow>
            <BulletRow icon="sparkle" bgColor={SUNNY_SOFT} fontSize={32}>
              Setiap kali dijalankan, warna karakter <strong>Berubah Jadi Pelangi!</strong>
            </BulletRow>
          </div>

          <div style={{ padding: '20px 26px', borderRadius: 20, background: LAVENDER_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 16, fontSize: 26, fontWeight: 800 }}>
            <JuniorIcon name="paintbrush" size={34} />
            <span>Semakin sering diklik, warnanya berganti dari oranye, biru, ungu, hingga hijau!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Blok Ungu Baru #2: Sulap Ukuran (change size by)
// ============================================================================
const Slide04UbahUkuran: Page = () => {
  const [catScale, setCatScale] = useState<'normal' | 'big' | 'small'>('normal');

  return (
    <JuniorFrame badge="BLOK UNGU • UKURAN AJAIB" accentDot={SCRATCH_LOOKS}>
      <SlideTitle>
        Blok Ungu <Highlight color="#EDE9FE">Ubah Ukuran!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card */}
      <MacWindowCard
        left={X0}
        top={245}
        width={860}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Besar vs Kecil"
        padding={40}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
            <BulletRow icon="grow" bgColor={TEAL_SOFT} fontSize={31}>
              <code>change size by (10)</code> -&gt; Karakter jadi <strong>Membesar!</strong>
            </BulletRow>
            <BulletRow icon="shrink" bgColor={CORAL_SOFT} fontSize={31}>
              <code>change size by (-10)</code> -&gt; Karakter jadi <strong>Mengecil!</strong>
            </BulletRow>
          </div>

          <div style={{ display: 'flex', gap: 18 }}>
            <button
              type="button"
              onClick={() => {
                playMagicSound('magic');
                setCatScale('big');
              }}
              className="cpj43-card-btn"
              style={{
                flex: 1,
                padding: '16px 20px',
                borderRadius: 20,
                background: catScale === 'big' ? TEAL_SOFT : WHITE,
                border: `3px solid ${TEAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                ...centerCol,
                gap: 8,
              }}
            >
              <Scratch3LooksBlock scale={0.88}>
                <span>change size by</span>
                <NumPill val={10} />
              </Scratch3LooksBlock>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: '#047857' }}>
                Klik: Jadi Besar (+10)
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                playMagicSound('reset');
                setCatScale('small');
              }}
              className="cpj43-card-btn"
              style={{
                flex: 1,
                padding: '16px 20px',
                borderRadius: 20,
                background: catScale === 'small' ? CORAL_SOFT : WHITE,
                border: `3px solid ${CORAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                ...centerCol,
                gap: 8,
              }}
            >
              <Scratch3LooksBlock scale={0.88}>
                <span>change size by</span>
                <NumPill val={-10} />
              </Scratch3LooksBlock>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: '#B91C1C' }}>
                Klik: Jadi Kecil (-10)
              </span>
            </button>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Comparison Showcase */}
      <MacWindowCard
        left={1000}
        top={245}
        width={820}
        height={680}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Perbandingan Ukuran"
        padding={32}
      >
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 40, alignItems: 'flex-end', height: 340 }}>
            <div style={{ ...centerCol, gap: 8 }}>
              <div style={{ padding: '6px 18px', borderRadius: 99, background: TEAL, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                +10 Membesar
              </div>
              <ScratchCatSvg size={catScale === 'big' ? 235 : 205} furColor="#FF8C1A" waving />
            </div>

            <div style={{ ...centerCol, gap: 8 }}>
              <div style={{ padding: '6px 18px', borderRadius: 99, background: CORAL, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                -10 Mengecil
              </div>
              <ScratchCatSvg size={catScale === 'small' ? 92 : 112} furColor="#FF8C1A" />
            </div>
          </div>

          <BikoMascot
            pose="thumbs-up"
            width={195}
            speechBubble={catScale === 'big' ? 'Raksasa!' : catScale === 'small' ? 'Mungil!' : 'Klik tombol kiri!'}
          />
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Efek Grafis Seru Lainnya (whirl, fisheye, pixelate)
// ============================================================================
const Slide05EfekGrafis: Page = () => {
  const [activeEffect, setActiveEffect] = useState<'none' | 'whirl' | 'fisheye' | 'pixelate'>('whirl');

  return (
    <JuniorFrame badge="EFEK GRAFIS LUCU" accentDot={SCRATCH_LOOKS}>
      <SlideTitle>
        Coba <Highlight color="#EDE9FE">Efek Grafis</Highlight> Unik Lainnya!
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1720}
        height={720}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Klik Kartu untuk Lihat Ekspresi Lucu Kucing Scratch!"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {[
            {
              key: 'whirl' as const,
              title: 'whirl',
              bg: SKY_SOFT,
              border: SKY,
              icon: 'repeat' as JuniorIconName,
              desc: 'Karakter Berputar Pusaran lucu!',
            },
            {
              key: 'fisheye' as const,
              title: 'fisheye',
              bg: TEAL_SOFT,
              border: TEAL,
              icon: 'balloon' as JuniorIconName,
              desc: 'Karakter Menggembung seperti balon!',
            },
            {
              key: 'pixelate' as const,
              title: 'pixelate',
              bg: CORAL_SOFT,
              border: CORAL,
              icon: 'grid' as JuniorIconName,
              desc: 'Karakter jadi Kotak-Kotak Retro!',
            },
          ].map((card) => {
            const active = activeEffect === card.key;
            return (
              <button
                key={card.key}
                type="button"
                onClick={() => {
                  playMagicSound('magic');
                  setActiveEffect(card.key);
                }}
                className="cpj43-card-btn"
                style={{
                  flex: 1,
                  borderRadius: 26,
                  background: card.bg,
                  border: `4px solid ${active ? CHARCOAL : card.border}`,
                  boxShadow: active ? `0 10px 0 ${CHARCOAL}` : `0 6px 0 ${CHARCOAL}`,
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div style={{ ...row, gap: 12 }}>
                  <JuniorIcon name={card.icon} size={38} />
                  <span style={{ padding: '6px 20px', borderRadius: 99, background: SCRATCH_LOOKS, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
                    {card.title}
                  </span>
                </div>

                <ScratchCatSvg size={215} effect={card.key} furColor="#FF8C1A" />

                <div style={{ padding: '12px 18px', borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 26, fontWeight: 800, lineHeight: 1.3 }}>
                  {card.desc}
                </div>
              </button>
            );
          })}
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Pilih Blok Sulap Warna!
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle size={50} maxWidth={1680}>
        Blok Mana yang Membuat Kucing Berubah Warna Menjadi <Highlight>Pelangi?</Highlight>
      </SlideTitle>

      {/* Card A — Correct: change [color] effect */}
      <button
        type="button"
        onClick={() => {
          playMagicSound('magic');
          setPicked('A');
        }}
        className="cpj43-card-btn"
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
            Ubah Efek Warna (Color Effect)
          </span>
        </div>

        <div style={{ ...row, gap: 18 }}>
          <JuniorIcon name="paintbrush" size={64} />
          <Scratch3LooksBlock scale={1.16}>
            <span>change</span>
            <RainbowPill>color</RainbowPill>
            <span>effect by</span>
            <NumPill val={25} />
          </Scratch3LooksBlock>
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'A' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={26} />
              <span>Benar! Blok ungu ini menyulap warna pelangi!</span>
            </div>
          ) : (
            <span style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Card B — Wrong: move (10) steps */}
      <button
        type="button"
        onClick={() => {
          playMagicSound('boing');
          setPicked('B');
        }}
        className="cpj43-card-btn"
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
          animation: picked === 'B' ? 'cpj43-shake 320ms ease' : undefined,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 16, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
            B
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Gerak Maju (Move)
          </span>
        </div>

        <div style={{ ...row, gap: 18 }}>
          <JuniorIcon name="footprints" size={64} />
          <Scratch3BlueBlock scale={1.32}>
            <span>move (10) steps</span>
          </Scratch3BlueBlock>
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'B' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={26} />
              <span>Bukan! move (10) steps hanya bikin kucing berjalan!</span>
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
        <div style={{ animation: live ? 'cpj43-float 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thinking" width={165} badgeIcon={<JuniorIcon name="question" size={22} />} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
          {picked === 'A'
            ? 'Tepat sekali! Blok ungu change [color] effect bikin warna berubah pelangi!'
            : picked === 'B'
              ? 'Ups! move (10) steps untuk berjalan. Cari blok Ungu berkuas pelangi ya!'
              : 'Tunjuk blok yang benar di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Resep Kartu Kejutan Interaktif (when this sprite clicked)
// ============================================================================
const Slide07ResepKartu: Page = () => {
  return (
    <JuniorFrame badge="RESEP KARTU KEJUTAN" accentDot={SUNNY}>
      <SlideTitle>
        Sulap Saat <Highlight>Karakter Diklik!</Highlight>
      </SlideTitle>

      {/* Left Code Stacks */}
      <MacWindowCard
        left={X0}
        top={245}
        width={760}
        height={680}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="2 Tumpukan Kode Ajaib"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: '#B45309', marginBottom: 8 }}>
              Saat Karakter Diklik:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <Scratch3HatBlock kind="sprite" scale={1.06} />
              <Scratch3LooksBlock scale={1.06}>
                <span>change</span>
                <RainbowPill>color</RainbowPill>
                <span>effect by</span>
                <NumPill val={25} />
              </Scratch3LooksBlock>
              <Scratch3LooksBlock scale={1.06}>
                <span>change size by</span>
                <NumPill val={10} />
              </Scratch3LooksBlock>
            </div>
          </div>

          <div style={{ borderTop: `2.5px dashed #CBD5E1`, paddingTop: 20 }}>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: '#047857', marginBottom: 8 }}>
              Reset Rapi Saat Bendera Hijau:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <Scratch3HatBlock kind="flag" scale={1.06} />
              <Scratch3LooksBlock scale={1.06}>
                <span>clear graphic effects</span>
              </Scratch3LooksBlock>
              <Scratch3LooksBlock scale={1.06}>
                <span>set size to</span>
                <NumPill val="100" />
                <span>%</span>
              </Scratch3LooksBlock>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right 3 Step Cards */}
      <div style={{ ...abs(900, 245, 920, 680), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {[
          {
            num: '1. Klik Karakter',
            bg: SUNNY_SOFT,
            border: SUNNY,
            icon: 'tap' as JuniorIconName,
            text: (
              <>
                <code>when this sprite clicked</code> (Saat Sprite ini diklik)
              </>
            ),
          },
          {
            num: '2. Beri Kejutan',
            bg: LAVENDER_SOFT,
            border: LAVENDER,
            icon: 'rainbow' as JuniorIconName,
            text: (
              <>
                <code>change [color] effect by (25)</code> -&gt; <code>change size by (10)</code>
              </>
            ),
          },
          {
            num: '3. Kembali Normal',
            bg: TEAL_SOFT,
            border: TEAL,
            icon: 'flag' as JuniorIconName,
            text: (
              <>
                <code>when Bendera clicked</code> -&gt; <code>clear graphic effects</code> &amp; <code>set size to (100)%</code>
              </>
            ),
          },
        ].map((step) => (
          <div
            key={step.num}
            style={{
              height: 205,
              borderRadius: 26,
              background: step.bg,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '22px 28px',
              ...row,
              gap: 24,
            }}
          >
            <div style={{ width: 82, height: 82, borderRadius: 22, background: WHITE, border: `3px solid ${step.border}`, ...centerCol, flexShrink: 0 }}>
              <JuniorIcon name={step.icon} size={46} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                {step.num}
              </div>
              <div style={{ fontSize: 25, fontWeight: 700, color: MUTED, marginTop: 6, lineHeight: 1.32 }}>
                {step.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Sulap Grafis Scratch 3.0 (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsSulap: Page = () => {
  return (
    <JuniorFrame badge="TIPS PESULAP CODER" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Kartu Kejutanmu <Highlight>Keren &amp; Rapi!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & KEREN"
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
            <BulletRow icon="flag" bgColor={TEAL_SOFT} fontSize={28}>
              Pasang <code>clear graphic effects</code> di bawah <code>when Bendera clicked</code> agar rapi lagi
            </BulletRow>
            <BulletRow icon="balloon" bgColor={SUNNY_SOFT} fontSize={28}>
              Tambahkan Sprite <strong>Balon, Bintang, atau Hadiah</strong> yang bisa diklik
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: 'linear-gradient(135deg, #FEF9C3 0%, #DCFCE7 100%)', border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <JuniorIcon name="balloon" size={76} />
            <ScratchCatSvg size={135} furColor="#A78BFA" waving />
            <JuniorIcon name="star-glow" size={74} />
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
            <BulletRow icon="grow" bgColor={CORAL_SOFT} fontSize={28}>
              Menekan <code>change size by (50)</code> terus-terusan sampai layar penuh sesak
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={28}>
              Lupa memasang pemicu <code>when this sprite clicked</code>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px', overflow: 'hidden' }}>
            <ScratchCatSvg size={240} furColor="#FF8C1A" />
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Buat Kartu Kejutan Pelangi Ajaib!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const HUES = [0, 65, 130, 195, 260, 310];
  const [catState, setCatState] = useState({ hueIdx: 0, scale: 1 });
  const [balloonState, setBalloonState] = useState({ hueIdx: 1, scale: 1 });
  const [starState, setStarState] = useState({ hueIdx: 2, scale: 1 });

  const clickSprite = (which: 'cat' | 'balloon' | 'star') => {
    playMagicSound('magic');
    if (which === 'cat') {
      setCatState((s) => ({ hueIdx: (s.hueIdx + 1) % HUES.length, scale: Math.min(1.42, s.scale + 0.1) }));
    } else if (which === 'balloon') {
      setBalloonState((s) => ({ hueIdx: (s.hueIdx + 1) % HUES.length, scale: Math.min(1.42, s.scale + 0.1) }));
    } else {
      setStarState((s) => ({ hueIdx: (s.hueIdx + 1) % HUES.length, scale: Math.min(1.42, s.scale + 0.1) }));
    }
  };

  const resetAll = () => {
    playMagicSound('reset');
    setCatState({ hueIdx: 0, scale: 1 });
    setBalloonState({ hueIdx: 0, scale: 1 });
    setStarState({ hueIdx: 0, scale: 1 });
  };

  return (
    <JuniorFrame badge="AYO BUAT & MAIN!" accentDot={SCRATCH_LOOKS}>
      <SlideTitle>
        Misi <Highlight>Kartu Kejutan Pelangi Ajaib!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'party' as JuniorIconName,
            text: (
              <>
                Pasang latar <strong>Pesta / Bintang</strong>, <strong>Kucing Scratch</strong>, &amp; Sprite <strong>Hadiah / Balon</strong>
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'paintbrush' as JuniorIconName,
            text: (
              <>
                Rangkai <strong>when this sprite clicked</strong> + <strong>change color effect</strong> &amp; <strong>change size</strong>
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'tap' as JuniorIconName,
            text: (
              <>
                <strong>Klik Semua Karakter</strong> di panggung &amp; lihat kejutan pelanginya!
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

      {/* Playable Interactive Surprise Card Simulator */}
      <div
        style={{
          ...abs(X0, 400, 1280, 565),
          borderRadius: 24,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          background: WHITE,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Scratch 3.0 Header */}
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
          <span>SCRATCH 3.0 • Kartu Kejutan Pelangi</span>
          <button
            type="button"
            onClick={resetAll}
            className="cpj43-card-btn"
            style={{ padding: '4px 14px', borderRadius: 99, background: WHITE, color: CHARCOAL, border: `2px solid ${CHARCOAL}`, ...row, gap: 6, fontSize: 15, fontWeight: 700 }}
          >
            <JuniorIcon name="flag" size={18} />
            <span>Reset Normal</span>
          </button>
        </div>

        {/* Interactive Stage + Code Split */}
        <div style={{ flex: 1, display: 'flex' }}>
          <div style={{ width: 455, padding: 20, borderRight: `2.5px solid ${CHARCOAL}`, background: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <Scratch3HatBlock kind="sprite" scale={0.88} />
              <Scratch3LooksBlock scale={0.88}>
                <span>change</span>
                <RainbowPill>color</RainbowPill>
                <span>effect by</span>
                <NumPill val={25} />
              </Scratch3LooksBlock>
              <Scratch3LooksBlock scale={0.88}>
                <span>change size by</span>
                <NumPill val={10} />
              </Scratch3LooksBlock>
            </div>
            <div style={{ borderTop: `2px dashed #CBD5E1`, paddingTop: 14, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <Scratch3HatBlock kind="flag" scale={0.88} />
              <Scratch3LooksBlock scale={0.88}>
                <span>clear graphic effects</span>
              </Scratch3LooksBlock>
              <Scratch3LooksBlock scale={0.88}>
                <span>set size to</span>
                <NumPill val={100} />
                <span>%</span>
              </Scratch3LooksBlock>
            </div>
          </div>

          {/* Clickable Party Stage */}
          <div
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #FEF9C3 0%, #FCE7F3 48%, #DBEAFE 100%)',
              position: 'relative',
              ...row,
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 20,
            }}
          >
            <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', padding: '5px 18px', borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 17, fontWeight: 700 }}>
              Klik Balon, Kucing, atau Bintang untuk Sulap Pelangi!
            </div>

            <button
              type="button"
              onClick={() => clickSprite('balloon')}
              className="cpj43-card-btn"
              style={{
                background: 'transparent',
                border: 'none',
                filter: `hue-rotate(${HUES[balloonState.hueIdx]}deg)`,
                transform: `scale(${balloonState.scale})`,
                transition: 'transform 180ms ease, filter 180ms ease',
              }}
            >
              <JuniorIcon name="balloon" size={140} />
            </button>

            <button
              type="button"
              onClick={() => clickSprite('cat')}
              className="cpj43-card-btn"
              style={{
                background: 'transparent',
                border: 'none',
                filter: `hue-rotate(${HUES[catState.hueIdx]}deg)`,
                transform: `scale(${catState.scale})`,
                transition: 'transform 180ms ease, filter 180ms ease',
              }}
            >
              <ScratchCatSvg size={185} waving />
            </button>

            <button
              type="button"
              onClick={() => clickSprite('star')}
              className="cpj43-card-btn"
              style={{
                background: 'transparent',
                border: 'none',
                filter: `hue-rotate(${HUES[starState.hueIdx]}deg)`,
                transform: `scale(${starState.scale})`,
                transition: 'transform 180ms ease, filter 180ms ease',
              }}
            >
              <JuniorIcon name="star-glow" size={135} />
            </button>
          </div>
        </div>
      </div>

      {/* Cheering Biko & Reset Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 14 }}>
        <div style={{ animation: live ? 'cpj43-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="rainbow" size={24} />}
            speechBubble="Pelangi ajaib!"
          />
        </div>
        <button
          type="button"
          onClick={resetAll}
          className="cpj43-card-btn"
          style={{
            padding: '14px 26px',
            borderRadius: 20,
            background: TEAL,
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
          <JuniorIcon name="flag" size={24} />
          <span>Rapikan Seperti Semula</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 43 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj43-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj43-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="rainbow" size={50} />
      </div>

      <SlideTitle top={135} size={58} align="center" maxWidth={1540}>
        Hore! Kamu Pesulap Visual <Highlight>Scratch 3.0 Hebat!</Highlight>
      </SlideTitle>

      {/* Center Celebration Window */}
      <MacWindowCard
        left={260}
        top={260}
        width={1060}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 43"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, gap: 22, textAlign: 'center' }}>
          {/* Golden Rainbow Brush & Wand Medal */}
          <div style={{ animation: live ? 'cpj43-float 2.6s ease-in-out infinite' : undefined }}>
            <svg width={215} height={215} viewBox="0 0 210 210">
              <path d="M72 128 L52 195 L82 180 L96 198 L106 135 Z" fill={SCRATCH_LOOKS} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M138 128 L158 195 L128 180 L114 198 L104 135 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="105" cy="96" r="72" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="105" cy="96" r="56" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.2} />
              {/* Rainbow Arc */}
              <path d="M62 114 A43 43 0 0 1 148 114" fill="none" stroke={CORAL} strokeWidth={8} strokeLinecap="round" />
              <path d="M70 114 A35 35 0 0 1 140 114" fill="none" stroke={SKY} strokeWidth={8} strokeLinecap="round" />
              <path d="M78 114 A27 27 0 0 1 132 114" fill="none" stroke={TEAL} strokeWidth={8} strokeLinecap="round" />
              {/* Star Wand */}
              <polygon points="105,60 110,72 123,74 114,83 116,96 105,90 94,96 96,83 87,74 100,72" fill={SCRATCH_LOOKS} stroke={WHITE} strokeWidth={2.5} />
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
            <span>Lencana Master Sulap Warna &amp; Efek Grafis</span>
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
            <Highlight color="#EDE9FE">color effect, change size, &amp; graphic effects!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Rainbow Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="paintbrush" size={22} />}
            speechBubble="Kejutan Pelangi!"
          />
          <div style={{ animation: live ? 'cpj43-hop 1.9s ease-in-out infinite, cpj43-rainbow 5s linear infinite' : undefined, marginBottom: 14 }}>
            <ScratchCatSvg size={185} furColor="#A78BFA" waving />
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
  `Selamat datang di Pertemuan 43 — Kartu Kejutan Pelangi Ajaib! 🌈🪄
Hari ini anak-anak belajar menyulap warna, ukuran, dan efek grafis lucu pada Sprite di Scratch 3.0 saat diklik!`,

  `Dua misi sulap hari ini:
1. Mengenal blok ungu Looks untuk mengubah warna & ukuran karakter.
2. Membuat Kartu Kejutan Pelangi interaktif yang merespons klik!`,

  `Blok Ungu Baru #1 — Sulap Warna:
change [color] effect by (25)! Setiap kali blok ini dijalankan, warna karakter berubah seperti pelangi.`,

  `Blok Ungu Baru #2 — Ubah Ukuran:
- change size by (10) -> Karakter jadi MEMBESAR!
- change size by (-10) -> Karakter jadi MENGECIL!`,

  `Coba Efek Grafis Unik Lainnya di menu dropdown blok efek:
- whirl -> Berputar pusaran lucu
- fisheye -> Menggembung seperti balon
- pixelate -> Jadi kotak-kotak retro!`,

  `Permainan Cepat! Ayo tebak bersama:
Blok mana yang membuat Kucing berubah warna menjadi pelangi — Pilihan A (change [color] effect by (25)) atau Pilihan B (move (10) steps)?`,

  `Resep Kartu Kejutan Interaktif:
1. Pemicu: when this sprite clicked
2. Kejutan: change [color] effect by (25) + change size by (10)
3. Kembali Normal: when Bendera clicked -> clear graphic effects & set size to (100)%!`,

  `Tips Pesulap Coder:
BOLEH pasang clear graphic effects di bawah Bendera Hijau & tambah Sprite Balon/Bintang.
JANGAN tekan change size by (50) terus-terusan sampai layar penuh, atau lupa memasang when this sprite clicked!`,

  `Misi Praktik Kartu Kejutan Pelangi Ajaib!
Ajak anak-anak mengklik Balon, Kucing Scratch, dan Bintang di panggung slide untuk melihat sulap pelangi & ukuran, lalu klik Reset Normal untuk merapikan kembali!`,

  `Hore! Kamu Pesulap Visual Scratch 3.0 Hebat! 🎉🏅
Selamat meraih Lencana Master Sulap Warna & Efek Grafis di Pertemuan 43!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 43 — Kartu Kejutan Pelangi Ajaib!',
  createdAt: '2026-11-16T15:58:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03SulapWarna,
  Slide04UbahUkuran,
  Slide05EfekGrafis,
  Slide06AyoTebak,
  Slide07ResepKartu,
  Slide08TipsSulap,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

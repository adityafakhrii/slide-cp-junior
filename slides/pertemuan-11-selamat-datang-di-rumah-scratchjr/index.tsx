import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-11-selamat-datang-di-rumah-scratchjr';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj11-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj11-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-13px) scale(1.04); }
}
@keyframes cpj11-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj11-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj11-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj11-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7); }
  50% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
}
.cpj11-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj11-card-btn:hover {
  transform: translateY(-4px);
}
.cpj11-card-btn:active {
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
  accentDot = SKY,
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
          animation: live ? 'cpj11-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: SKY,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 11 • Selamat Datang di Rumah ScratchJr!</span>
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

// ============================================================================
// Reusable Pertemuan 11 Visual Components (Kucing Tic, Taman, ScratchJr UI)
// ============================================================================

/** Official Kucing Tic character illustration (chunky cartoon style) */
const TicCatSvg = ({
  size = 140,
  waving = false,
  style,
}: {
  size?: number;
  waving?: boolean;
  style?: CSSProperties;
}) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none" style={style}>
    {/* Ground Shadow */}
    <ellipse cx="70" cy="126" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    {/* Tail */}
    <path
      d="M96 98 C118 96, 126 76, 114 66 C106 60, 100 68, 104 75 C106 80, 100 88, 92 88"
      fill={ORANGE}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Feet */}
    <ellipse cx="56" cy="118" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="118" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
    {/* Body */}
    <ellipse cx="70" cy="95" rx="27" ry="24" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="70" cy="97" rx="16" ry="15" fill={SUNNY_SOFT} />
    {/* Left & Right Arms */}
    <path
      d={waving ? 'M44 82 C26 74, 22 58, 30 52 C37 47, 45 58, 46 72' : 'M45 86 C32 90, 32 104, 42 104 C48 104, 50 96, 48 88'}
      fill={ORANGE}
      stroke={CHARCOAL}
      strokeWidth={3.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M94 86 C107 90, 107 104, 97 104 C91 104, 89 96, 91 88"
      fill={ORANGE}
      stroke={CHARCOAL}
      strokeWidth={3.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Cat Ears */}
    <path d="M38 50 L36 18 L60 36 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    <path d="M42 44 L41 25 L54 36 Z" fill="#FDBA74" />
    <path d="M102 50 L104 18 L80 36 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    <path d="M98 44 L99 25 L86 36 Z" fill="#FDBA74" />
    {/* Head */}
    <ellipse cx="70" cy="57" rx="34" ry="29" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
    {/* Forehead Stripes */}
    <path d="M64 31 V39 M70 29 V41 M76 31 V39" stroke="#C2410C" strokeWidth={3.5} strokeLinecap="round" />
    {/* Cheek Patch */}
    <ellipse cx="70" cy="66" rx="22" ry="15" fill={WHITE} />
    {/* Eyes */}
    <circle cx="57" cy="53" r="5" fill={CHARCOAL} />
    <circle cx="83" cy="53" r="5" fill={CHARCOAL} />
    <circle cx="58.5" cy="51.2" r="1.8" fill={WHITE} />
    <circle cx="84.5" cy="51.2" r="1.8" fill={WHITE} />
    {/* Nose & Smile */}
    <polygon points="66,60 74,60 70,65" fill={CORAL} />
    <path d="M62 67 Q70 74 78 67" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" fill="none" />
    {/* Whiskers */}
    <path
      d="M42 58 L28 55 M42 64 L27 66 M98 58 L112 55 M98 64 L113 66"
      stroke={CHARCOAL}
      strokeWidth={2.8}
      strokeLinecap="round"
    />
  </svg>
);

/** Playground Scenery Backdrop used on Stage (Sky, Sun, Trees, Slide & Grass) */
const PlaygroundBackdropSvg = ({
  width = 420,
  height = 240,
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <svg width={width} height={height} viewBox="0 0 420 240" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    {/* Sky */}
    <rect x="0" y="0" width="420" height="240" fill="#BAE6FD" />
    {/* Sun */}
    <circle cx="358" cy="48" r="24" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
    {/* Clouds */}
    <path d="M48 56 C40 56, 38 44, 46 40 C48 30, 62 28, 69 34 C77 30, 88 36, 86 45 C92 48, 90 56, 82 56 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
    <path d="M188 44 C182 44, 180 35, 187 32 C189 24, 200 23, 206 28 C213 24, 222 29, 220 36 C225 38, 223 44, 217 44 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.2} />
    {/* Green Hills & Grass */}
    <path d="M0 156 Q110 128 220 152 Q320 174 420 144 V240 H0 Z" fill="#4ADE80" stroke={CHARCOAL} strokeWidth={3} />
    <path d="M0 178 Q160 162 420 178 V240 H0 Z" fill="#22C55E" />
    {/* Tree on Left */}
    <rect x="46" y="106" width="16" height="58" rx="4" fill="#B45309" stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="54" cy="92" r="28" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="38" cy="100" r="18" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="70" cy="100" r="18" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    {/* Cute Slide on Right */}
    <rect x="308" y="96" width="8" height="66" rx="3" fill={SKY} stroke={CHARCOAL} strokeWidth={2.6} />
    <path d="M294 98 H326" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
    <path d="M324 98 C346 98, 356 144, 388 152" stroke={CORAL} strokeWidth={11} strokeLinecap="round" />
    <path d="M324 98 C346 98, 356 144, 388 152" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
    {/* Little Flowers */}
    <circle cx="136" cy="196" r="5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="248" cy="206" r="5" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
  </svg>
);

/** Crisp ScratchJr Jigsaw Block Mini Pill */
const ScratchBlockSvg = ({
  color,
  icon,
  label,
  width = 112,
  height = 56,
  onClick,
}: {
  color: string;
  icon: JuniorIconName;
  label?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={onClick ? 'cpj11-card-btn' : undefined}
    style={{
      width,
      height,
      borderRadius: 14,
      background: color,
      border: `3px solid ${CHARCOAL}`,
      boxShadow: `0 4px 0 ${CHARCOAL}`,
      padding: '0 10px',
      ...row,
      justifyContent: 'center',
      gap: 6,
      color: color === SUNNY ? CHARCOAL : WHITE,
      fontFamily: 'var(--osd-font-display)',
      fontSize: 18,
      fontWeight: 700,
      cursor: onClick ? 'pointer' : 'default',
    }}
  >
    <JuniorIcon name={icon} size={26} />
    {label && <span>{label}</span>}
  </button>
);

/** Interactive ScratchJr Tablet Workspace Mockup */
const ScratchJrWorkspace = ({
  spotlight = 'none',
  hasPlayground = false,
  catCenter = false,
  catWaving = false,
  showExtraCat = false,
  snappedCount = 2,
  onLandscapeClick,
  onStageClick,
  onPlusClick,
  onPaletteClick,
  width = 860,
  height = 560,
}: {
  spotlight?: 'none' | 'stage' | 'character' | 'landscape-btn' | 'palette' | 'all';
  hasPlayground?: boolean;
  catCenter?: boolean;
  catWaving?: boolean;
  showExtraCat?: boolean;
  snappedCount?: number;
  onLandscapeClick?: () => void;
  onStageClick?: () => void;
  onPlusClick?: () => void;
  onPaletteClick?: () => void;
  width?: number;
  height?: number;
}) => {
  const ring = (match: boolean): CSSProperties =>
    match
      ? {
          outline: `5px solid ${SUNNY}`,
          outlineOffset: 3,
          animation: 'cpj11-pulse 1.8s infinite',
        }
      : {};

  const categoryDots = [SUNNY, SKY, LAVENDER, TEAL, ORANGE, CORAL];

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 26,
        background: '#E2E8F0',
        border: `3.5px solid ${CHARCOAL}`,
        boxShadow: `0 8px 0 ${CHARCOAL}`,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        boxSizing: 'border-box',
      }}
    >
      {/* Top Toolbar */}
      <div
        style={{
          height: 52,
          borderRadius: 14,
          background: '#F8FAFC',
          border: `2.5px solid ${CHARCOAL}`,
          padding: '0 14px',
          ...row,
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ ...row, gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: SUNNY_SOFT,
              border: `2px solid ${CHARCOAL}`,
              ...centerCol,
            }}
          >
            <JuniorIcon name="house" size={24} />
          </div>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: CHARCOAL }}>
            ScratchJr
          </span>
        </div>

        {/* Center Stage Buttons */}
        <div style={{ ...row, gap: 12 }}>
          <button
            type="button"
            onClick={onLandscapeClick}
            className={onLandscapeClick ? 'cpj11-card-btn' : undefined}
            title="Tombol Latar Pemandangan"
            style={{
              width: 44,
              height: 40,
              borderRadius: 12,
              background: spotlight === 'landscape-btn' ? TEAL_SOFT : WHITE,
              border: `2.5px solid ${spotlight === 'landscape-btn' ? TEAL : CHARCOAL}`,
              ...centerCol,
              padding: 0,
              ...ring(spotlight === 'landscape-btn'),
              cursor: onLandscapeClick ? 'pointer' : 'default',
            }}
          >
            <JuniorIcon name="landscape" size={28} />
          </button>
          <div
            style={{
              width: 42,
              height: 40,
              borderRadius: 12,
              background: WHITE,
              border: `2px solid ${CHARCOAL}`,
              ...centerCol,
            }}
          >
            <JuniorIcon name="abc" size={26} />
          </div>
          <div
            style={{
              width: 42,
              height: 40,
              borderRadius: 12,
              background: TEAL_SOFT,
              border: `2px solid ${CHARCOAL}`,
              ...centerCol,
            }}
          >
            <JuniorIcon name="flag" size={24} />
          </div>
        </div>
      </div>

      {/* Middle Section: Character Sidebar + Center Stage */}
      <div style={{ flex: 1, display: 'flex', gap: 12, minHeight: 0 }}>
        {/* Left Character List */}
        <div
          style={{
            width: 118,
            borderRadius: 18,
            background: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            ...ring(spotlight === 'character'),
          }}
        >
          <div
            style={{
              width: '100%',
              height: 82,
              borderRadius: 14,
              background: SUNNY_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              ...centerCol,
            }}
          >
            <TicCatSvg size={64} />
          </div>
          {showExtraCat && (
            <div
              style={{
                width: '100%',
                height: 62,
                borderRadius: 14,
                background: SKY_SOFT,
                border: `2px solid ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              <JuniorIcon name="bunny" size={42} />
            </div>
          )}
          <button
            type="button"
            onClick={onPlusClick}
            className={onPlusClick ? 'cpj11-card-btn' : undefined}
            style={{
              width: 66,
              height: 66,
              borderRadius: 99,
              background: SKY_SOFT,
              border: `2.5px dashed ${CHARCOAL}`,
              ...centerCol,
              cursor: onPlusClick ? 'pointer' : 'default',
            }}
          >
            <JuniorIcon name="plus-circle" size={40} />
          </button>
        </div>

        {/* Center Main Stage */}
        <div
          onClick={onStageClick}
          style={{
            flex: 1,
            borderRadius: 20,
            background: WHITE,
            border: `3.5px solid ${spotlight === 'stage' ? SUNNY : CHARCOAL}`,
            position: 'relative',
            overflow: 'hidden',
            cursor: onStageClick ? 'pointer' : 'default',
            ...ring(spotlight === 'stage'),
          }}
        >
          {hasPlayground ? (
            <PlaygroundBackdropSvg width="100%" height="100%" />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
                opacity: 0.55,
              }}
            />
          )}

          {/* Stage Corner Label */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 12,
              padding: '4px 12px',
              borderRadius: 99,
              background: 'rgba(255,255,255,0.9)',
              border: `2px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 15,
              fontWeight: 700,
              zIndex: 2,
            }}
          >
            Panggung (Stage)
          </div>

          {/* Kucing Tic on Stage */}
          <div
            style={{
              position: 'absolute',
              left: catCenter ? '50%' : '26%',
              top: catCenter ? '62%' : '56%',
              transform: 'translate(-50%, -50%)',
              transition: 'left 360ms cubic-bezier(0.22, 1, 0.36, 1), top 360ms cubic-bezier(0.22, 1, 0.36, 1)',
              zIndex: 2,
            }}
          >
            <TicCatSvg size={130} waving={catWaving} />
          </div>

          {showExtraCat && (
            <div style={{ position: 'absolute', right: '18%', bottom: '18%', zIndex: 2 }}>
              <JuniorIcon name="bunny" size={74} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Palet Blok + Area Kode */}
      <div
        onClick={onPaletteClick}
        style={{
          height: 170,
          borderRadius: 18,
          background: WHITE,
          border: `3px solid ${spotlight === 'palette' ? LAVENDER : CHARCOAL}`,
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          cursor: onPaletteClick ? 'pointer' : 'default',
          ...ring(spotlight === 'palette'),
        }}
      >
        {/* Palette Category Tabs + Blocks */}
        <div style={{ ...row, gap: 12, justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 7 }}>
            {categoryDots.map((c, idx) => (
              <span
                key={idx}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 99,
                  background: c,
                  border: `2px solid ${CHARCOAL}`,
                }}
              />
            ))}
          </div>
          <div style={{ ...row, gap: 10 }}>
            <ScratchBlockSvg color={SUNNY} icon="flag" width={78} height={44} />
            <ScratchBlockSvg color={SKY} icon="arrow-right" width={78} height={44} />
            <ScratchBlockSvg color={SKY} icon="arrow-up" width={78} height={44} />
            <ScratchBlockSvg color={LAVENDER} icon="happy" width={78} height={44} />
            <ScratchBlockSvg color={CORAL} icon="stop" width={78} height={44} />
          </div>
        </div>

        {/* White Area Kode */}
        <div
          style={{
            flex: 1,
            borderRadius: 14,
            background: '#F8FAFC',
            border: `2px dashed #94A3B8`,
            padding: '0 14px',
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ ...row, gap: 8 }}>
            <ScratchBlockSvg color={SUNNY} icon="flag" width={82} height={46} />
            <ScratchBlockSvg color={SKY} icon="arrow-right" label="2" width={92} height={46} />
            {snappedCount >= 3 && (
              <ScratchBlockSvg color={SKY} icon="arrow-up" label="1" width={92} height={46} />
            )}
          </div>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 16, fontWeight: 700, color: MUTED }}>
            Area Kode
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Cozy House Frame + Laptop ScratchJr + Biko)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 11" accentDot={SKY}>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 210, 880, 700), display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
            color: '#1E40AF',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="house" size={22} />
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          Selamat Datang di
          <br />
          <Highlight>Rumah ScratchJr!</Highlight>
        </h1>

        <p
          style={{
            margin: '28px 0 36px',
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1.38,
            color: MUTED,
            maxWidth: 790,
          }}
        >
          Tur Panggung Kucing Tic &amp; Taman Bermain
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
            <JuniorIcon name="cat" size={28} />
            <span>Kucing Tic!</span>
          </div>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: WHITE,
              color: CHARCOAL,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="tree" size={28} />
            <span>Taman Bermain</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Cozy House Arch Frame (distinct from round covers) + Laptop ScratchJr + Biko */}
      <div style={{ ...abs(980, 140, 845, 820), ...centerCol }}>
        {/* Pitched Roof House Backdrop (SVG Frame) */}
        <svg
          width={760}
          height={760}
          viewBox="0 0 760 760"
          fill="none"
          style={{ position: 'absolute', inset: 0, margin: 'auto', pointerEvents: 'none' }}
        >
          {/* House Shadow */}
          <path
            d="M84 275 L394 44 L704 275 V696 C704 720, 684 740, 660 740 H128 C104 740, 84 720, 84 696 Z"
            fill={SKY}
            transform="translate(14 14)"
          />
          {/* Main House Wall */}
          <path
            d="M84 275 L394 44 L704 275 V696 C704 720, 684 740, 660 740 H128 C104 740, 84 720, 84 696 Z"
            fill="#EFF6FF"
            stroke={CHARCOAL}
            strokeWidth={5}
            strokeLinejoin="round"
          />
          {/* Colorful Roof Trim */}
          <path
            d="M52 288 L394 34 L736 288"
            stroke={CORAL}
            strokeWidth={28}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M52 288 L394 34 L736 288"
            stroke={CHARCOAL}
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Mini ScratchJr Laptop Window Inside the House */}
        <div
          style={{
            position: 'absolute',
            left: 112,
            top: 230,
            width: 450,
            height: 300,
            borderRadius: 24,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            zIndex: 2,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', padding: '0 6px' }}>
            <span style={{ ...row, gap: 6, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
              <JuniorIcon name="house" size={20} />
              <span>ScratchJr — Taman Bermain</span>
            </span>
            <JuniorIcon name="landscape" size={22} />
          </div>
          <div
            style={{
              flex: 1,
              borderRadius: 16,
              border: `2.5px solid ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <PlaygroundBackdropSvg width="100%" height="100%" />
            <div style={{ position: 'absolute', left: '48%', top: '62%', transform: 'translate(-50%, -50%)' }}>
              <TicCatSvg size={120} waving />
            </div>
          </div>
        </div>

        {/* Laptop Keyboard Base */}
        <div
          style={{
            position: 'absolute',
            left: 88,
            top: 530,
            width: 498,
            height: 24,
            borderRadius: '0 0 18px 18px',
            background: '#CBD5E1',
            border: `3.5px solid ${CHARCOAL}`,
            zIndex: 2,
          }}
        />

        {/* Cheerful Biko Pointing at the ScratchJr Screen */}
        <BikoMascot
          pose="point-left"
          width={315}
          badgeIcon={<JuniorIcon name="cat" size={24} />}
          speechBubble="Yuk Masuk!"
          style={{ position: 'absolute', right: 32, bottom: 56, zIndex: 4 }}
        />

        {/* Floating ScratchJr Block Pill */}
        <div
          style={{
            position: 'absolute',
            left: 112,
            bottom: 84,
            padding: '10px 18px',
            borderRadius: 20,
            background: SUNNY_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 5px 0 ${CHARCOAL}`,
            ...row,
            gap: 10,
            zIndex: 5,
            animation: live ? 'cpj11-float 2.8s ease-in-out infinite' : undefined,
          }}
        >
          <JuniorIcon name="palette" size={26} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700 }}>
            4 Bagian Seru!
          </span>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi Besar dalam Bingkai macOS Window)
// ============================================================================
const Slide02Misi: Page = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <JuniorFrame badge="MISI HARI INI" accentDot={TEAL}>
      <SlideTitle>
        Apa <Highlight>Misi Kita</Highlight> Hari Ini?
      </SlideTitle>

      <MacWindowCard left={X0} top={235} width={1320} height={700} headerLabel="misi-pertemuan-11.app" padding={36}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Card 1: 4 Bagian Rumah ScratchJr */}
          <button
            type="button"
            className="cpj11-card-btn"
            onClick={() => setSelected(0)}
            style={{
              borderRadius: 28,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: selected === 0 ? `0 0 0 6px ${SUNNY}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${SKY}`,
              padding: '32px 26px',
              ...centerCol,
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                padding: '6px 20px',
                borderRadius: 99,
                background: SKY,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              MISI 1
            </div>

            {/* Colorful 4-Part House Map Illustration */}
            <svg width={270} height={240} viewBox="0 0 270 240" fill="none">
              <path d="M26 105 L135 22 L244 105 V218 H26 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
              <path d="M16 112 L135 16 L254 112" stroke={CORAL} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 112 L135 16 L254 112" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
              {/* 4 colorful quadrants */}
              <rect x="44" y="110" width="84" height="44" rx="10" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
              <rect x="142" y="110" width="84" height="44" rx="10" fill={SKY} stroke={CHARCOAL} strokeWidth={3.5} />
              <rect x="44" y="164" width="84" height="44" rx="10" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.5} />
              <rect x="142" y="164" width="84" height="44" rx="10" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={3.5} />
            </svg>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.28 }}>
              Kenali <Highlight color={WHITE}>4 Bagian</Highlight> Rumah ScratchJr
            </div>
          </button>

          {/* Card 2: Ajak Kucing Tic ke Taman Bermain */}
          <button
            type="button"
            className="cpj11-card-btn"
            onClick={() => setSelected(1)}
            style={{
              borderRadius: 28,
              background: TEAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: selected === 1 ? `0 0 0 6px ${SUNNY}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${TEAL}`,
              padding: '32px 26px',
              ...centerCol,
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                padding: '6px 20px',
                borderRadius: 99,
                background: TEAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              MISI 2
            </div>

            <div
              style={{
                width: 270,
                height: 220,
                borderRadius: 22,
                border: `3.5px solid ${CHARCOAL}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <PlaygroundBackdropSvg width="100%" height="100%" />
              <div style={{ position: 'absolute', left: '50%', top: '64%', transform: 'translate(-50%, -50%)' }}>
                <TicCatSvg size={115} waving />
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.28 }}>
              Ajak <Highlight color={SUNNY_SOFT}>Kucing Tic</Highlight> ke Taman Bermain!
            </div>
          </button>
        </div>
      </MacWindowCard>

      {/* Biko Pointing toward Mission Cards */}
      <BikoMascot
        pose="point-left"
        width={355}
        badgeIcon={<JuniorIcon name="house" size={24} />}
        speechBubble={selected === 0 ? 'Tur 4 Bagian!' : 'Ke Taman Yuk!'}
        style={{ ...abs(1470, 390) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Tur Bagian #1: Panggung (Stage)
// ============================================================================
const Slide03Panggung: Page = () => {
  const [catWaving, setCatWaving] = useState(true);

  return (
    <JuniorFrame badge="TUR SCRATCHJR #1" accentDot={SUNNY}>
      <SlideTitle>
        Ini Namanya <Highlight>Panggung</Highlight> (Stage)
      </SlideTitle>

      {/* Left: ScratchJr Workspace with Yellow Highlight around Stage */}
      <div style={{ ...abs(X0, 235) }}>
        <ScratchJrWorkspace
          spotlight="stage"
          catWaving={catWaving}
          onStageClick={() => setCatWaving((v) => !v)}
          width={930}
          height={600}
        />
        <div
          style={{
            marginTop: 18,
            padding: '12px 24px',
            borderRadius: 18,
            background: SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            ...row,
            justifyContent: 'center',
            gap: 10,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          <JuniorIcon name="tap" size={24} />
          <span>Klik Panggung untuk melihat Kucing Tic menyapa!</span>
        </div>
      </div>

      {/* Right: Short Explanation Card + Biko Pointing */}
      <MacWindowCard left={1080} top={235} width={740} height={365} headerLabel="bagian-1-panggung.app" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 18 }}>
          <div
            style={{
              padding: '22px 26px',
              borderRadius: 22,
              background: SUNNY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 18,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 31,
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            <JuniorIcon name="stage" size={44} />
            <span>
              Layar utama tempat <strong>Karakter Tampil</strong>
            </span>
          </div>

          <div
            style={{
              padding: '22px 26px',
              borderRadius: 22,
              background: SKY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 18,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 31,
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            <JuniorIcon name="star-glow" size={44} />
            <span>
              Seperti <strong>Panggung Pertunjukan</strong> seru!
            </span>
          </div>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="point-left"
        width={300}
        badgeIcon={<JuniorIcon name="stage" size={24} />}
        speechBubble="Lihat Kotak Kuning!"
        style={{ ...abs(1330, 620) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Tur Bagian #2: Karakter (Kucing Tic)
// ============================================================================
const Slide04Karakter: Page = () => {
  const [addedFriend, setAddedFriend] = useState(false);

  return (
    <JuniorFrame badge="TUR SCRATCHJR #2" accentDot={ORANGE}>
      <SlideTitle>
        Kenalan Sama <Highlight>Kucing Tic!</Highlight>
      </SlideTitle>

      {/* Left: Explanation Card + Interactive Plus Demo */}
      <MacWindowCard left={X0} top={245} width={780} height={675} headerLabel="bagian-2-karakter.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                padding: '24px 26px',
                borderRadius: 22,
                background: SUNNY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                gap: 18,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="cat" size={44} />
              <span>
                <strong>Teman Bermain</strong> baru kita di ScratchJr
              </span>
            </div>

            <div
              style={{
                padding: '24px 26px',
                borderRadius: 22,
                background: SKY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                gap: 18,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="plus-circle" size={44} />
              <span>
                Klik tanda <strong>Plus</strong> untuk tambah teman!
              </span>
            </div>
          </div>

          <button
            type="button"
            className="cpj11-card-btn"
            onClick={() => setAddedFriend((v) => !v)}
            style={{
              padding: '20px 28px',
              borderRadius: 22,
              background: addedFriend ? TEAL : SKY,
              color: WHITE,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 28,
              fontWeight: 700,
              ...row,
              justifyContent: 'center',
              gap: 12,
            }}
          >
            <JuniorIcon name={addedFriend ? 'check' : 'plus-circle'} size={32} />
            <span>{addedFriend ? 'Teman Baru Ditambahkan!' : 'Coba Klik Tombol Plus (+)'}</span>
          </button>
        </div>
      </MacWindowCard>

      {/* Right: Character Panel Highlight + Big Kucing Tic & Biko Waving */}
      <div style={{ ...abs(930, 245, 890, 675), ...row, justifyContent: 'space-between', alignItems: 'flex-end' }}>
        {/* Zoomed Character List Sidebar */}
        <div
          style={{
            width: 250,
            height: 620,
            borderRadius: 28,
            background: WHITE,
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${SKY}`,
            padding: 22,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700, color: MUTED }}>
            Daftar Karakter
          </span>
          <div
            style={{
              width: 170,
              height: 150,
              borderRadius: 22,
              background: SUNNY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
            }}
          >
            <TicCatSvg size={115} waving />
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>Kucing Tic</span>
          </div>

          {addedFriend && (
            <div
              style={{
                width: 170,
                height: 110,
                borderRadius: 20,
                background: TEAL_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              <JuniorIcon name="bunny" size={62} />
            </div>
          )}

          <button
            type="button"
            onClick={() => setAddedFriend((v) => !v)}
            className="cpj11-card-btn"
            style={{
              width: 130,
              height: 130,
              borderRadius: 99,
              background: SKY_SOFT,
              border: `4px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              ...centerCol,
            }}
          >
            <JuniorIcon name="plus-circle" size={76} />
          </button>
        </div>

        {/* Big Kucing Tic & Biko Waving Side by Side */}
        <div
          style={{
            width: 600,
            height: 620,
            borderRadius: 32,
            background: SUNNY_SOFT,
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            position: 'relative',
            ...centerCol,
            justifyContent: 'flex-end',
            paddingBottom: 28,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 24,
              padding: '10px 24px',
              borderRadius: 99,
              background: WHITE,
              border: `3px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            Halo! Aku Kucing Tic!
          </div>

          <div style={{ ...row, alignItems: 'flex-end', gap: 10 }}>
            <TicCatSvg size={265} waving />
            <BikoMascot pose="wave" width={250} />
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Tur Bagian #3: Latar Taman Bermain
// ============================================================================
const Slide05LatarTaman: Page = () => {
  const [hasPlayground, setHasPlayground] = useState(true);

  return (
    <JuniorFrame badge="TUR SCRATCHJR #3" accentDot={TEAL}>
      <SlideTitle>
        Ganti <Highlight>Latar Taman</Highlight> Bermain!
      </SlideTitle>

      {/* Left: ScratchJr Screen with Highlighted Landscape Button */}
      <div style={{ ...abs(X0, 235) }}>
        <ScratchJrWorkspace
          spotlight="landscape-btn"
          hasPlayground={hasPlayground}
          onLandscapeClick={() => setHasPlayground((v) => !v)}
          width={950}
          height={600}
        />

        {/* Green Highlight Arrow pointing up-right to Landscape Button */}
        <div
          style={{
            marginTop: 18,
            padding: '12px 24px',
            borderRadius: 18,
            background: TEAL_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            ...row,
            justifyContent: 'space-between',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          <span style={{ ...row, gap: 10 }}>
            <JuniorIcon name="landscape" size={28} />
            <span>Status Panggung: {hasPlayground ? 'Taman Bermain Indah!' : 'Panggung Putih Polos'}</span>
          </span>
          <button
            type="button"
            className="cpj11-card-btn"
            onClick={() => setHasPlayground((v) => !v)}
            style={{
              padding: '8px 20px',
              borderRadius: 14,
              background: TEAL,
              color: WHITE,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {hasPlayground ? 'Lihat Polos' : 'Pasang Taman!'}
          </button>
        </div>
      </div>

      {/* Right: Short Explanation Card */}
      <MacWindowCard left={1100} top={235} width={720} height={665} headerLabel="bagian-3-latar.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                padding: '24px 26px',
                borderRadius: 22,
                background: SKY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                gap: 18,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 31,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="landscape" size={44} />
              <span>
                Klik tombol <strong>Gambar Gunung</strong> di atas
              </span>
            </div>

            <div
              style={{
                padding: '24px 26px',
                borderRadius: 22,
                background: TEAL_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                gap: 18,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 31,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="tree" size={44} />
              <span>
                Panggung putih berubah jadi <strong>Taman Indah!</strong>
              </span>
            </div>
          </div>

          <div
            style={{
              padding: '20px 26px',
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'center',
              gap: 18,
            }}
          >
            <div style={{ ...centerCol, gap: 6 }}>
              <div style={{ width: 96, height: 64, borderRadius: 12, background: WHITE, border: `2.5px solid ${CHARCOAL}` }} />
              <span style={{ fontSize: 18, fontWeight: 800 }}>Polos</span>
            </div>
            <JuniorIcon name="arrow-right" size={38} />
            <div style={{ ...centerCol, gap: 6 }}>
              <div style={{ width: 96, height: 64, borderRadius: 12, border: `2.5px solid ${CHARCOAL}`, overflow: 'hidden' }}>
                <PlaygroundBackdropSvg width={96} height={64} />
              </div>
              <span style={{ fontSize: 18, fontWeight: 800 }}>Taman!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Tur Bagian #4: Palet Blok & Area Kode
// ============================================================================
const Slide06PaletBlok: Page = () => {
  const [snappedCount, setSnappedCount] = useState(2);

  return (
    <JuniorFrame badge="TUR SCRATCHJR #4" accentDot={LAVENDER}>
      <SlideTitle>
        <Highlight>Palet Blok</Highlight> &amp; <Highlight color={SKY_SOFT}>Area Kode</Highlight>
      </SlideTitle>

      {/* Left: Bottom ScratchJr Workspace Spotlight */}
      <div style={{ ...abs(X0, 235) }}>
        <ScratchJrWorkspace
          spotlight="palette"
          hasPlayground
          snappedCount={snappedCount}
          onPaletteClick={() => setSnappedCount((n) => (n >= 3 ? 2 : 3))}
          width={950}
          height={600}
        />
        <div
          style={{
            marginTop: 18,
            padding: '12px 24px',
            borderRadius: 18,
            background: LAVENDER_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            ...row,
            justifyContent: 'center',
            gap: 10,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          <JuniorIcon name="tap" size={24} />
          <span>Klik bagian Palet Bawah untuk tambah blok ke Area Kode!</span>
        </div>
      </div>

      {/* Right Card: Explanations */}
      <MacWindowCard left={1100} top={235} width={720} height={665} headerLabel="bagian-4-blok-kode.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                padding: '24px 26px',
                borderRadius: 22,
                background: SUNNY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                gap: 18,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="palette" size={44} />
              <span>
                <strong>Palet Blok:</strong> Rak balok perintah warna-warni
              </span>
            </div>

            <div
              style={{
                padding: '24px 26px',
                borderRadius: 22,
                background: LAVENDER_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                gap: 18,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="puzzle" size={44} />
              <span>
                <strong>Area Kode:</strong> Tempat menyusun balok di bawah!
              </span>
            </div>
          </div>

          {/* Mini Block Row Preview */}
          <div
            style={{
              padding: '22px 24px',
              borderRadius: 24,
              background: '#F8FAFC',
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
              gap: 14,
            }}
          >
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: MUTED }}>
              Susunan Balok Warna-warni:
            </div>
            <div style={{ ...row, gap: 12 }}>
              <ScratchBlockSvg color={SUNNY} icon="flag" width={100} height={54} />
              <ScratchBlockSvg color={SKY} icon="arrow-right" label="2" width={110} height={54} />
              <ScratchBlockSvg color={LAVENDER} icon="happy" width={100} height={54} />
              <ScratchBlockSvg color={CORAL} icon="stop" width={100} height={54} />
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Permainan Cepat: Ayo Tebak Tombolnya!
// ============================================================================
const Slide07AyoTebak: Page = () => {
  const [choice, setChoice] = useState<'A' | 'B' | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" top={128} size={58}>
        Tombol Mana untuk <Highlight>Ganti Latar Taman?</Highlight>
      </SlideTitle>

      {/* Left Choice Card A: Tombol Latar (CORRECT) */}
      <button
        type="button"
        className="cpj11-card-btn"
        onClick={() => setChoice('A')}
        style={{
          ...abs(160, 260, 620, 470),
          borderRadius: 34,
          background: choice === 'A' ? TEAL_SOFT : WHITE,
          border: `4px solid ${choice === 'A' ? TEAL : CHARCOAL}`,
          boxShadow: choice === 'A' ? `0 0 0 7px ${TEAL}, 0 10px 0 ${CHARCOAL}` : `0 10px 0 ${CHARCOAL}`,
          padding: 36,
          ...centerCol,
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            padding: '8px 24px',
            borderRadius: 99,
            background: TEAL_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          PILIHAN A
        </div>

        {/* Large ScratchJr Landscape Button Illustration */}
        <div
          style={{
            width: 210,
            height: 190,
            borderRadius: 34,
            background: SKY_SOFT,
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            ...centerCol,
          }}
        >
          <JuniorIcon name="landscape" size={140} />
        </div>

        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700 }}>
          Tombol Latar
        </div>
      </button>

      {/* Right Choice Card B: Tambah Karakter (INCORRECT) */}
      <button
        key={shakeKey}
        type="button"
        className="cpj11-card-btn"
        onClick={() => {
          setChoice('B');
          setShakeKey((k) => k + 1);
        }}
        style={{
          ...abs(1140, 260, 620, 470),
          borderRadius: 34,
          background: choice === 'B' ? CORAL_SOFT : WHITE,
          border: `4px solid ${choice === 'B' ? CORAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 36,
          ...centerCol,
          justifyContent: 'space-between',
          animation: choice === 'B' ? 'cpj11-shake 380ms ease' : undefined,
        }}
      >
        <div
          style={{
            padding: '8px 24px',
            borderRadius: 99,
            background: SKY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          PILIHAN B
        </div>

        <div
          style={{
            width: 210,
            height: 190,
            borderRadius: 34,
            background: SUNNY_SOFT,
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            ...centerCol,
          }}
        >
          <JuniorIcon name="plus-circle" size={132} />
        </div>

        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700 }}>
          Tambah Karakter
        </div>
      </button>

      {/* Center Bottom Biko holding ? */}
      <BikoMascot
        pose="question"
        width={255}
        speechBubble={choice === 'A' ? 'Betul Sekali!' : choice === 'B' ? 'Coba Lagi Yuk!' : undefined}
        style={{ ...abs(832, 470) }}
      />

      {/* Bottom Prompt Banner */}
      <div
        style={{
          ...abs(360, 845, 1200, 90),
          borderRadius: 24,
          background: choice === 'A' ? TEAL_SOFT : choice === 'B' ? CORAL_SOFT : SUNNY_SOFT,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 6px 0 ${CHARCOAL}`,
          ...row,
          justifyContent: 'center',
          gap: 14,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 31,
          fontWeight: 700,
        }}
      >
        <JuniorIcon name={choice === 'A' ? 'check' : choice === 'B' ? 'warning' : 'point-right'} size={34} />
        <span>
          {choice === 'A'
            ? 'Hebat! Gambar Gunung & Matahari dipakai untuk Ganti Latar Taman!'
            : choice === 'B'
              ? 'Ups, tanda Plus (+) untuk Tambah Karakter. Coba pilih tombol lainnya!'
              : 'Tunjuk tombol yang benar di layarmu ya!'}
        </span>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Jurus Jitu: Cara Pasang Latar Taman (3 Kartu Langkah Berurutan)
// ============================================================================
const Slide08CaraPasang: Page = () => {
  const [stepIdx, setStepIdx] = useState<0 | 1 | 2>(2);

  const steps: Array<{
    num: string;
    color: string;
    soft: string;
    icon: JuniorIconName;
    label: string;
  }> = [
    { num: '1', color: SKY, soft: SKY_SOFT, icon: 'landscape', label: 'Klik ikon Pemandangan di atas' },
    { num: '2', color: SUNNY, soft: SUNNY_SOFT, icon: 'tree', label: 'Pilih gambar Taman Bermain' },
    { num: '3', color: TEAL, soft: TEAL_SOFT, icon: 'check', label: 'Tekan tanda Centang di pojok!' },
  ];

  return (
    <JuniorFrame badge="JURUS SCRATCHJR" accentDot={TEAL}>
      <SlideTitle>
        Cara Pasang <Highlight>Latar Taman!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={235} width={1720} height={700} headerLabel="jurus-ganti-latar.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 22 }}>
          {/* 3 Sequential Step Cards */}
          <div style={{ ...row, justifyContent: 'space-between', gap: 18 }}>
            {steps.map((s, idx) => {
              const active = stepIdx === idx;
              return (
                <Fragment key={s.num}>
                  <button
                    type="button"
                    className="cpj11-card-btn"
                    onClick={() => setStepIdx(idx as 0 | 1 | 2)}
                    style={{
                      flex: 1,
                      height: 195,
                      borderRadius: 26,
                      background: s.soft,
                      border: `3.5px solid ${CHARCOAL}`,
                      boxShadow: active ? `0 0 0 6px ${SUNNY}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${s.color}`,
                      padding: '20px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ width: '100%', ...row, justifyContent: 'space-between' }}>
                      <span
                        style={{
                          padding: '5px 16px',
                          borderRadius: 99,
                          background: s.color,
                          color: s.color === SUNNY ? CHARCOAL : WHITE,
                          border: `2.5px solid ${CHARCOAL}`,
                          fontFamily: 'var(--osd-font-display)',
                          fontSize: 20,
                          fontWeight: 700,
                        }}
                      >
                        Langkah {s.num}
                      </span>
                      <JuniorIcon name={s.icon} size={42} />
                    </div>
                    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, lineHeight: 1.24 }}>
                      {s.label}
                    </div>
                  </button>
                  {idx < 2 && <JuniorIcon name="arrow-right" size={34} />}
                </Fragment>
              );
            })}
          </div>

          {/* Live 3-Stage ScratchJr Preview Strip */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: '#F8FAFC',
              border: `3px solid ${CHARCOAL}`,
              padding: '22px 30px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 24,
            }}
          >
            {/* Preview 1 */}
            <div
              style={{
                borderRadius: 20,
                background: WHITE,
                border: `3px solid ${stepIdx === 0 ? SKY : CHARCOAL}`,
                padding: 16,
                ...centerCol,
                gap: 12,
              }}
            >
              <div style={{ width: '100%', ...row, justifyContent: 'center', gap: 10 }}>
                <div
                  style={{
                    padding: 8,
                    borderRadius: 14,
                    background: SKY_SOFT,
                    border: `3px solid ${SKY}`,
                  }}
                >
                  <JuniorIcon name="landscape" size={44} />
                </div>
                <JuniorIcon name="tap" size={38} />
              </div>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700 }}>
                1. Buka Menu Latar
              </span>
            </div>

            {/* Preview 2 */}
            <div
              style={{
                borderRadius: 20,
                background: WHITE,
                border: `3px solid ${stepIdx === 1 ? SUNNY : CHARCOAL}`,
                padding: 16,
                ...centerCol,
                gap: 12,
              }}
            >
              <div style={{ ...row, gap: 12 }}>
                <div style={{ width: 92, height: 64, borderRadius: 12, border: `2px solid ${CHARCOAL}`, background: '#E2E8F0' }} />
                <div
                  style={{
                    width: 112,
                    height: 74,
                    borderRadius: 14,
                    border: `4px solid ${SUNNY}`,
                    overflow: 'hidden',
                  }}
                >
                  <PlaygroundBackdropSvg width={112} height={74} />
                </div>
              </div>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700 }}>
                2. Ketuk Taman Bermain
              </span>
            </div>

            {/* Preview 3 */}
            <div
              style={{
                borderRadius: 20,
                background: WHITE,
                border: `3px solid ${stepIdx === 2 ? TEAL : CHARCOAL}`,
                padding: 16,
                ...centerCol,
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 210,
                  height: 92,
                  borderRadius: 16,
                  border: `3px solid ${CHARCOAL}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <PlaygroundBackdropSvg width={210} height={92} />
                <div style={{ position: 'absolute', left: '42%', top: '62%', transform: 'translate(-50%, -50%)' }}>
                  <TicCatSvg size={64} waving />
                </div>
                <div style={{ position: 'absolute', top: 6, right: 6 }}>
                  <JuniorIcon name="check" size={32} />
                </div>
              </div>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700 }}>
                3. Latar Taman Muncul!
              </span>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Buat Taman Bermain Kucing Tic!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const [missionStep, setMissionStep] = useState<1 | 2 | 3>(3);

  const blocks: Array<{
    num: 1 | 2 | 3;
    color: string;
    soft: string;
    icon: JuniorIconName;
    label: string;
  }> = [
    { num: 1, color: SKY, soft: SKY_SOFT, icon: 'house', label: 'Buka Proyek Baru (+) di ScratchJr' },
    { num: 2, color: SUNNY, soft: SUNNY_SOFT, icon: 'tree', label: 'Ganti latar menjadi Taman Bermain' },
    { num: 3, color: TEAL, soft: TEAL_SOFT, icon: 'cat', label: 'Geser Kucing Tic ke tengah rumput!' },
  ];

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle top={120}>
        Misi <Highlight>Taman Bermain Kucing Tic!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr Step Blocks */}
      <div style={{ ...abs(X0, 206, W, 94), ...row, justifyContent: 'space-between', gap: 18 }}>
        {blocks.map((b, idx) => {
          const active = missionStep === b.num;
          return (
            <Fragment key={b.num}>
              <button
                type="button"
                className="cpj11-card-btn"
                onClick={() => setMissionStep(b.num)}
                style={{
                  flex: 1,
                  height: 90,
                  borderRadius: 22,
                  background: b.soft,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: active ? `0 0 0 5px ${SUNNY}, 0 6px 0 ${CHARCOAL}` : `0 6px 0 ${b.color}`,
                  padding: '0 20px',
                  ...row,
                  gap: 14,
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: b.color,
                    color: b.color === SUNNY ? CHARCOAL : WHITE,
                    border: `2.5px solid ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 26,
                    fontWeight: 700,
                    ...centerCol,
                    flexShrink: 0,
                  }}
                >
                  {b.num}
                </span>
                <JuniorIcon name={b.icon} size={32} />
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
                  {b.label}
                </span>
              </button>
              {idx < 2 && <JuniorIcon name="arrow-right" size={30} />}
            </Fragment>
          );
        })}
      </div>

      {/* Bottom Interactive ScratchJr Preview + Biko Cheering */}
      <MacWindowCard left={X0} top={322} width={1290} height={635} headerLabel="praktik-taman-kucing-tic.app" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <ScratchJrWorkspace
            spotlight={missionStep === 1 ? 'none' : missionStep === 2 ? 'landscape-btn' : 'stage'}
            hasPlayground={missionStep >= 2}
            catCenter={missionStep === 3}
            catWaving={missionStep === 3}
            width={1180}
            height={500}
          />
          <div style={{ ...row, gap: 16 }}>
            <button
              type="button"
              className="cpj11-card-btn"
              onClick={() => setMissionStep((s) => (s === 3 ? 1 : ((s + 1) as 1 | 2 | 3)))}
              style={{
                padding: '10px 26px',
                borderRadius: 16,
                background: TEAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                boxShadow: `0 4px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
                ...row,
                gap: 8,
              }}
            >
              <JuniorIcon name="play" size={24} />
              <span>Simulasikan Langkah {missionStep}/3</span>
            </button>
          </div>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="thumbs-up"
        width={355}
        badgeIcon={<JuniorIcon name="cat" size={24} />}
        speechBubble="Kamu Pasti Bisa!"
        style={{ ...abs(1455, 420) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 11 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  const confetti = [
    { left: 150, top: 230, color: SUNNY, rot: '18deg', size: 22 },
    { left: 260, top: 760, color: SKY, rot: '-24deg', size: 24 },
    { left: 1650, top: 220, color: CORAL, rot: '-15deg', size: 22 },
    { left: 1520, top: 820, color: LAVENDER, rot: '28deg', size: 24 },
    { left: 1380, top: 270, color: TEAL, rot: '14deg', size: 20 },
    { left: 1730, top: 520, color: SUNNY, rot: '-12deg', size: 22 },
  ];

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      {confetti.map((c, idx) => (
        <div
          key={idx}
          aria-hidden
          style={{
            ...abs(c.left, c.top, c.size, c.size),
            borderRadius: 6,
            background: c.color,
            border: `2.5px solid ${CHARCOAL}`,
            transform: `rotate(${c.rot})`,
            animation: live ? `cpj11-confetti ${2.4 + idx * 0.3}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={124} size={58}>
        <span style={{ ...row, justifyContent: 'center', gap: 14 }}>
          <span>Hore! Kamu Kenal</span>
          <Highlight>Rumah ScratchJr!</Highlight>
          <JuniorIcon name="party" size={52} />
        </span>
      </SlideTitle>

      {/* Center Celebration Card */}
      <MacWindowCard left={190} top={240} width={1140} height={685} headerLabel="lencana-penjelajah-11.app" padding={34}>
        <div
          style={{
            height: '100%',
            ...centerCol,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          {/* Large Gold Medal featuring Colorful Block House & Kucing Tic Face */}
          <div style={{ animation: live ? 'cpj11-float 3s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 260 260" fill="none">
              <path d="M84 14 L112 96 H148 L176 14 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
              <path d="M104 14 L130 90 L156 14" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="130" cy="150" r="92" fill={SUNNY} stroke={CHARCOAL} strokeWidth={6} />
              <circle cx="130" cy="150" r="74" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={4} />
              {/* Mini Colorful Block House + Kucing Tic inside Medal */}
              <path d="M88 148 L130 108 L172 148 V192 H88 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M80 152 L130 104 L180 152" stroke={TEAL} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
              {/* Cat Ears & Face Badge */}
              <path d="M108 146 L106 128 L122 140 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
              <path d="M152 146 L154 128 L138 140 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
              <circle cx="130" cy="160" r="22" fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.5} />
              <circle cx="122" cy="157" r="3" fill={CHARCOAL} />
              <circle cx="138" cy="157" r="3" fill={CHARCOAL} />
              <path d="M123 166 Q130 172 137 166" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
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
              fontSize: 34,
              fontWeight: 700,
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="medal" size={34} />
            <span>Lencana Penjelajah Rumah ScratchJr</span>
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
            Kamu sudah kenal{' '}
            <Highlight color="#D1FAE5">Panggung, Kucing Tic, Latar Taman, &amp; Palet Blok!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko + Kucing Tic Celebrating Together */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="house" size={22} />}
            speechBubble="Keren Sekali!"
          />
          <div style={{ animation: live ? 'cpj11-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 11 — Selamat Datang di Rumah ScratchJr!
Hari ini kita mulai masuk ke aplikasi coding sesungguhnya: ScratchJr! Kenalkan anak-anak pada Biko yang mengajak masuk melihat Kucing Tic di taman bermain.`,

  `Dua misi seru kita hari ini:
1. Mengenal 4 bagian utama rumah ScratchJr.
2. Mengajak Kucing Tic bermain di Latar Taman Bermain!`,

  `Tur #1 — Panggung (Stage):
Tunjukkan kotak besar di tengah layar! Ini namanya Panggung, seperti panggung pertunjukan tempat Kucing Tic dan karakter lain tampil bergerak.`,

  `Tur #2 — Karakter (Kucing Tic):
Ini dia teman bermain baru kita di ScratchJr: Kucing Tic! Di panel sebelah kiri ada daftar karakter dan tombol tanda Plus (+) untuk menambah teman baru.`,

  `Tur #3 — Latar Taman Bermain:
Supaya panggungnya tidak putih polos, klik ikon gambar Gunung & Matahari di bagian atas layar untuk menggantinya menjadi Taman Bermain yang indah!`,

  `Tur #4 — Palet Blok & Area Kode:
Di bagian bawah layar ada Palet Blok berisi balok perintah warna-warni, dan Area Kode berwarna putih tempat kita menyusun balok menjadi urutan perintah.`,

  `Permainan Cepat! Ayo tebak tombolnya:
Tombol mana untuk ganti latar taman? Pilihan A (Gambar Gunung & Matahari) atau Pilihan B (Tanda Plus +)?`,

  `Ingat 3 jurus memasang Latar Taman:
1. Klik ikon Pemandangan di atas. 2. Pilih gambar Taman Bermain. 3. Tekan tanda Centang di pojok kanan atas!`,

  `Waktunya praktik langsung di laptop atau tablet masing-masing:
1. Buka Proyek Baru (+). 2. Ganti latar menjadi Taman Bermain. 3. Geser Kucing Tic ke tengah rumput!`,

  `Hore! Selamat untuk semua Penjelajah Rumah ScratchJr!
Kalian sudah mengenal Panggung, Kucing Tic, Latar Taman, dan Palet Blok dengan sangat hebat!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 11 — Selamat Datang di Rumah ScratchJr!',
  createdAt: '2026-11-14T13:45:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03Panggung,
  Slide04Karakter,
  Slide05LatarTaman,
  Slide06PaletBlok,
  Slide07AyoTebak,
  Slide08CaraPasang,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

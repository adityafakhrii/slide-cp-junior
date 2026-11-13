import { Fragment, useEffect, useRef, useState, type CSSProperties, type DragEvent, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-7-awas-ada-rintangan';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj7-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj7-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-12px) scale(1.04); }
}
@keyframes cpj7-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj7-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj7-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj7-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj7-card-btn:hover {
  transform: translateY(-4px);
}
.cpj7-card-btn:active {
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
const ORANGE_SOFT = '#FFF7ED';

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
      {/* Low-opacity coding symbols around outer canvas edges */}
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

      {/* Sparkle accent */}
      <svg
        aria-hidden
        width={42}
        height={42}
        viewBox="0 0 40 40"
        style={{
          ...abs(1750, 74),
          pointerEvents: 'none',
          animation: live ? 'cpj7-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: SUNNY,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 7 • Awas Ada Rintangan!</span>
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
            fontSize: 17,
            fontWeight: 800,
            color: MUTED,
            letterSpacing: '0.03em',
          }}
        >
          {headerLabel}
        </span>
      )}
      <div style={{ width: 64 }} />
    </div>
    <div style={{ flex: 1, padding, position: 'relative', overflow: 'hidden' }}>{children}</div>
  </div>
);

// ============================================================================
// Pertemuan 7 Visual Assets: Obstacles, Explorer Biko Token, Flag, Treasure & Blocks
// ============================================================================
type Dir = 'up' | 'down' | 'left' | 'right';

const DIR_META: Record<
  Dir,
  { label: string; color: string; soft: string; rot: number; icon: JuniorIconName }
> = {
  up: { label: 'Atas', color: TEAL, soft: TEAL_SOFT, rot: -90, icon: 'arrow-up' },
  down: { label: 'Bawah', color: CORAL, soft: CORAL_SOFT, rot: 90, icon: 'arrow-down' },
  left: { label: 'Kiri', color: SUNNY, soft: SUNNY_SOFT, rot: 180, icon: 'arrow-left' },
  right: { label: 'Kanan', color: SKY, soft: SKY_SOFT, rot: 0, icon: 'arrow-right' },
};

/** ScratchJr-inspired interlocking directional arrow block */
const MazeArrowBlock = ({
  dir,
  size = 86,
  stepNum,
  active = false,
  highlightColor,
  showRightTab = false,
  onClick,
  style,
}: {
  dir: Dir;
  size?: number;
  stepNum?: number;
  active?: boolean;
  highlightColor?: string;
  showRightTab?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}) => {
  const m = DIR_META[dir];
  const bg = highlightColor ?? m.color;
  return (
    <button
      type="button"
      onClick={onClick}
      className={onClick ? 'cpj7-card-btn' : undefined}
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.24),
        background: bg,
        border: `3px solid ${CHARCOAL}`,
        boxShadow: active
          ? `0 0 0 6px ${SUNNY}, 0 6px 0 ${CHARCOAL}`
          : `0 6px 0 ${CHARCOAL}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        cursor: onClick ? 'pointer' : 'default',
        transform: active ? 'scale(1.07)' : undefined,
        transition: 'transform 160ms ease, box-shadow 160ms ease',
        flexShrink: 0,
        ...style,
      }}
      aria-label={`Blok panah ${m.label}`}
    >
      {showRightTab && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            right: -11,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 28,
            borderRadius: '0 10px 10px 0',
            background: bg,
            border: `3px solid ${CHARCOAL}`,
            borderLeft: 'none',
            zIndex: 2,
          }}
        />
      )}
      {stepNum !== undefined && (
        <span
          style={{
            position: 'absolute',
            top: -12,
            left: -10,
            width: 28,
            height: 28,
            borderRadius: 99,
            background: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 16,
            fontWeight: 700,
            color: CHARCOAL,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
          }}
        >
          {stepNum}
        </span>
      )}
      <svg
        width={Math.round(size * 0.56)}
        height={Math.round(size * 0.56)}
        viewBox="0 0 48 48"
        fill="none"
        style={{ transform: `rotate(${m.rot}deg)` }}
      >
        <path
          d="M8 18 H26 V9 L42 24 L26 39 V30 H8 Z"
          fill={WHITE}
          stroke={CHARCOAL}
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

/** Cute Biko Explorer face token for grid tiles */
const BikoTokenSvg = ({
  size = 64,
  alert = false,
  style,
}: {
  size?: number;
  alert?: boolean;
  style?: CSSProperties;
}) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
    {/* Otter Ears */}
    <circle cx="20" cy="28" r="9" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.2} />
    <circle cx="60" cy="28" r="9" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.2} />
    {/* Otter Head */}
    <circle cx="40" cy="44" r="24" fill="#F59E0B" stroke={CHARCOAL} strokeWidth={3.4} />
    <ellipse cx="40" cy="49" rx="17" ry="14" fill="#FEF3C7" />
    {/* Explorer Hat */}
    <path d="M22 28 C22 14, 58 14, 58 28 Z" fill="#B45309" stroke={CHARCOAL} strokeWidth={3} />
    <rect x="22" y="23" width="36" height="6" rx="2" fill={TEAL} stroke={CHARCOAL} strokeWidth={2} />
    <ellipse cx="40" cy="29" rx="28" ry="6.5" fill="#D97706" stroke={CHARCOAL} strokeWidth={3} />
    {/* Eyes */}
    <circle cx="32" cy="43" r="3.4" fill={CHARCOAL} />
    <circle cx="48" cy="43" r="3.4" fill={CHARCOAL} />
    <circle cx="33" cy="41.8" r="1.1" fill={WHITE} />
    <circle cx="49" cy="41.8" r="1.1" fill={WHITE} />
    {/* Nose & Smile */}
    <ellipse cx="40" cy="49" rx="4.5" ry="3.2" fill={CHARCOAL} />
    {alert ? (
      <circle cx="40" cy="56.5" r="3.2" fill={CORAL} stroke={CHARCOAL} strokeWidth={1.8} />
    ) : (
      <path d="M34 54.5 Q40 60 46 54.5" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" />
    )}
  </svg>
);

/** Cartoon rock obstacle with chunky charcoal outline */
const RockSvg = ({
  size = 64,
  withCross = false,
  style,
}: {
  size?: number;
  withCross?: boolean;
  style?: CSSProperties;
}) => (
  <div style={{ position: 'relative', display: 'inline-flex', ...style }}>
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="66" rx="28" ry="6.5" fill="#D6CEC2" />
      <path
        d="M14 60 L18 34 L34 20 L56 24 L67 44 L64 60 Z"
        fill="#94A3B8"
        stroke={CHARCOAL}
        strokeWidth={3.6}
        strokeLinejoin="round"
      />
      <path
        d="M20 56 L24 38 L36 27 L48 29 L40 44 L36 56 Z"
        fill="#CBD5E1"
      />
      <path d="M46 42 L56 46 M26 48 L33 44" stroke={CHARCOAL} strokeWidth={2.5} strokeLinecap="round" />
    </svg>
    {withCross && (
      <span
        style={{
          position: 'absolute',
          top: -6,
          right: -6,
          width: Math.round(size * 0.42),
          height: Math.round(size * 0.42),
          borderRadius: 99,
          background: CORAL,
          color: WHITE,
          border: `2.5px solid ${CHARCOAL}`,
          fontSize: Math.round(size * 0.25),
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ✕
      </span>
    )}
  </div>
);

/** Prickly thorny bush obstacle */
const BushSvg = ({ size = 64, style }: { size?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
    <ellipse cx="40" cy="66" rx="27" ry="6" fill="#D1FAE5" />
    <path
      d="M16 58 C10 46, 18 32, 28 32 C30 20, 48 18, 54 30 C66 30, 72 44, 64 58 Z"
      fill="#16A34A"
      stroke={CHARCOAL}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />
    {/* Little thorns / berries */}
    <path d="M22 30 L17 24 M40 20 L40 12 M58 29 L64 23" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
    <circle cx="30" cy="44" r="4" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="48" cy="40" r="4" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="42" cy="52" r="3.5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
  </svg>
);

/** Desert cactus obstacle */
const CactusSvg = ({ size = 64, style }: { size?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
    <ellipse cx="40" cy="67" rx="22" ry="5.5" fill="#FDE68A" />
    <path
      d="M33 65 V22 C33 16, 47 16, 47 22 V65 Z"
      fill="#22C55E"
      stroke={CHARCOAL}
      strokeWidth={3.4}
    />
    <path
      d="M33 44 H22 C18 44, 18 30, 22 30 C26 30, 26 37, 26 37 H33"
      fill="#22C55E"
      stroke={CHARCOAL}
      strokeWidth={3.2}
      strokeLinejoin="round"
    />
    <path
      d="M47 40 H58 C62 40, 62 26, 58 26 C54 26, 54 33, 54 33 H47"
      fill="#22C55E"
      stroke={CHARCOAL}
      strokeWidth={3.2}
      strokeLinejoin="round"
    />
    <path d="M28 28 L24 25 M52 24 L56 21 M39 32 V40 M41 48 V56" stroke={CHARCOAL} strokeWidth={2.2} strokeLinecap="round" />
  </svg>
);

/** Star finish flag */
const FlagSvg = ({ size = 64, style }: { size?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
    <ellipse cx="26" cy="68" rx="14" ry="5" fill="#D1FAE5" />
    <rect x="23" y="14" width="6" height="54" rx="3" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="26" cy="13" r="5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
    <path
      d="M29 17 L64 24 L54 34 L64 44 L29 49 Z"
      fill={TEAL}
      stroke={CHARCOAL}
      strokeWidth={3.2}
      strokeLinejoin="round"
    />
    <path
      d="M44 26 L46 31 L51 31.5 L47 35 L48 40 L44 37.5 L40 40 L41 35 L37 31.5 L42 31 Z"
      fill={SUNNY}
      stroke={CHARCOAL}
      strokeWidth={1.8}
    />
  </svg>
);

/** Colorful treasure chest */
const ChestSvg = ({ size = 64, style }: { size?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
    <ellipse cx="40" cy="67" rx="26" ry="5.5" fill="#FDE68A" />
    <rect x="14" y="34" width="52" height="30" rx="8" fill="#B45309" stroke={CHARCOAL} strokeWidth={3.4} />
    <path d="M14 36 C14 20, 66 20, 66 36 Z" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.4} />
    <rect x="24" y="24" width="8" height="40" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.4} />
    <rect x="48" y="24" width="8" height="40" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.4} />
    <rect x="34" y="36" width="12" height="14" rx="4" fill={SKY} stroke={CHARCOAL} strokeWidth={2.6} />
  </svg>
);

/** Explorer rolled map illustration */
const ExplorerMapCard = ({ size = 120 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.78)} viewBox="0 0 140 108" fill="none">
    <path
      d="M14 22 L48 14 L92 24 L126 14 V86 L92 96 L48 86 L14 94 Z"
      fill="#FEF3C7"
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <line x1="48" y1="14" x2="48" y2="86" stroke="#D97706" strokeWidth={2.5} strokeDasharray="4 4" />
    <line x1="92" y1="24" x2="92" y2="96" stroke="#D97706" strokeWidth={2.5} strokeDasharray="4 4" />
    <path
      d="M28 66 Q56 64 66 44 T106 38"
      stroke={TEAL}
      strokeWidth={4.5}
      strokeLinecap="round"
      strokeDasharray="7 6"
    />
    <circle cx="30" cy="66" r="6" fill={SKY} stroke={CHARCOAL} strokeWidth={2.5} />
    <path d="M100 32 L114 46 M114 32 L100 46" stroke={CORAL} strokeWidth={5} strokeLinecap="round" />
  </svg>
);

// ============================================================================
// SLIDE 01 — Cover (Arch Gateway Portal Shape + Biko Penjelajah + Mini Labirin)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 7" accentDot={ORANGE}>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 210, 890, 700), display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            alignSelf: 'flex-start',
            padding: '10px 22px',
            borderRadius: 999,
            background: ORANGE_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#C2410C',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="compass" size={24} />
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          Awas Ada{' '}
          <br />
          <Highlight>Rintangan!</Highlight>
        </h1>

        <p
          style={{
            margin: '28px 0 36px',
            fontSize: 33,
            fontWeight: 700,
            lineHeight: 1.38,
            color: MUTED,
            maxWidth: 790,
          }}
        >
          Menyusun Rute Pintar Melewati Labirin Digital
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
              fontSize: 27,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="rock" size={28} />
            <span>Hindari Rintangan</span>
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
              fontSize: 27,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="turn-up" size={28} />
            <span>Maju &amp; Berbelok</span>
          </div>
        </div>
      </div>

      {/* Right Visual Showcase: Arch Expedition Portal (Distinct from Pertemuan 1-6) */}
      <div style={{ ...abs(1010, 165, 810, 785), ...centerCol }}>
        {/* Arch Portal Backdrop */}
        <div
          style={{
            position: 'absolute',
            width: 630,
            height: 645,
            borderRadius: '315px 315px 42px 42px',
            background: 'linear-gradient(170deg, #FEF9C3 0%, #FFF7ED 55%, #ECFDF5 100%)',
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${ORANGE}`,
            overflow: 'hidden',
          }}
        >
          {/* Decorative contour lines inside explorer portal */}
          <svg width="100%" height="100%" viewBox="0 0 630 645" fill="none" style={{ opacity: 0.32 }}>
            <circle cx="315" cy="230" r="210" stroke={ORANGE} strokeWidth={3} strokeDasharray="12 10" />
            <circle cx="315" cy="230" r="140" stroke={TEAL} strokeWidth={2.5} />
          </svg>
        </div>

        {/* Floating Mini Laptop Screen showing Maze with Rock & Flag */}
        <div
          style={{
            position: 'absolute',
            left: 22,
            top: 46,
            width: 380,
            padding: '16px 18px',
            borderRadius: 24,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            zIndex: 4,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span
              style={{
                ...row,
                gap: 8,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 19,
                fontWeight: 700,
                color: MUTED,
              }}
            >
              <JuniorIcon name="laptop" size={20} />
              <span>Labirin Kotak</span>
            </span>
            <span
              style={{
                padding: '3px 10px',
                borderRadius: 99,
                background: TEAL_SOFT,
                border: `2px solid ${CHARCOAL}`,
                fontSize: 15,
                fontWeight: 800,
                color: '#047857',
              }}
            >
              Rute Aman!
            </span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
              background: '#F8FAFC',
              padding: 10,
              borderRadius: 16,
              border: `2px solid ${CHARCOAL}`,
            }}
          >
            <div style={{ height: 56, borderRadius: 10, background: TEAL_SOFT, border: `2px dashed ${TEAL}`, ...centerCol }}>
              <JuniorIcon name="turn-up" size={26} />
            </div>
            <div style={{ height: 56, borderRadius: 10, background: TEAL_SOFT, border: `2px dashed ${TEAL}`, ...centerCol }}>
              <JuniorIcon name="arrow-right" size={26} />
            </div>
            <div style={{ height: 56, borderRadius: 10, background: SUNNY_SOFT, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
              <FlagSvg size={42} />
            </div>
            <div style={{ height: 56, borderRadius: 10, background: SKY_SOFT, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
              <BikoTokenSvg size={44} />
            </div>
            <div style={{ height: 56, borderRadius: 10, background: CORAL_SOFT, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
              <RockSvg size={42} withCross />
            </div>
            <div style={{ height: 56, borderRadius: 10, background: WHITE, border: `2px solid #CBD5E1` }} />
          </div>
        </div>

        {/* Biko Explorer wearing Hat */}
        <BikoMascot
          pose="explorer"
          width={390}
          style={{ position: 'relative', zIndex: 3, marginTop: 150, marginLeft: 130 }}
        />

        {/* Explorer Map Floating Badge */}
        <div
          style={{
            position: 'absolute',
            right: 14,
            bottom: 58,
            padding: '12px 16px',
            borderRadius: 22,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            ...centerCol,
            zIndex: 5,
            animation: live ? 'cpj7-float 3s ease-in-out infinite' : undefined,
          }}
        >
          <ExplorerMapCard size={110} />
          <span
            style={{
              marginTop: 4,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 18,
              fontWeight: 700,
              color: CHARCOAL,
            }}
          >
            Peta Penjelajah!
          </span>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi Besar + Biko Menunjuk)
// ============================================================================
const Slide02Misi: Page = () => (
  <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
    <SlideTitle>
      Apa <Highlight>Misi Kita</Highlight> Hari Ini?
    </SlideTitle>

    <MacWindowCard left={X0} top={250} width={1280} height={675} headerLabel="daftar-misi-7.exe" padding={42}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, height: '100%' }}>
        {/* Kartu 1: Biru #60A5FA */}
        <div
          style={{
            borderRadius: 26,
            background: SKY_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${SKY}`,
            padding: '34px 32px',
            ...centerCol,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              padding: '8px 22px',
              borderRadius: 99,
              background: SKY,
              color: WHITE,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            MISI 1
          </div>

          <div
            style={{
              ...row,
              gap: 16,
              padding: '20px 28px',
              borderRadius: 24,
              background: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 18,
                background: SUNNY,
                border: `3px solid ${CHARCOAL}`,
                ...centerCol,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 42,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="warning" size={40} />
            </div>
            <RockSvg size={82} withCross />
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.25,
              color: CHARCOAL,
            }}
          >
            <Highlight color={STABILO}>Kenali Rintangan</Highlight>
            <br />
            di Jalur Peta
          </div>
        </div>

        {/* Kartu 2: Hijau #10B981 */}
        <div
          style={{
            borderRadius: 26,
            background: TEAL_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${TEAL}`,
            padding: '34px 32px',
            ...centerCol,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              padding: '8px 22px',
              borderRadius: 99,
              background: TEAL,
              color: WHITE,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            MISI 2
          </div>

          <div
            style={{
              ...row,
              gap: 10,
              padding: '18px 24px',
              borderRadius: 24,
              background: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
            }}
          >
            <MazeArrowBlock dir="up" size={68} />
            <MazeArrowBlock dir="right" size={68} />
            <FlagSvg size={72} />
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.25,
              color: CHARCOAL,
            }}
          >
            Susun <Highlight color="#D1FAE5">Rute Pintar</Highlight>
            <br />
            Maju &amp; Berbelok
          </div>
        </div>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="point-left"
      width={380}
      speechBubble="Ayo taklukkan rintangan!"
      style={{ ...abs(1435, 315) }}
    />
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Rahasia Penjelajah #1: Awas Ada Rintangan!
// ============================================================================
const Slide03Rahasia: Page = () => {
  const [routeShown, setRouteShown] = useState<'blocked' | 'safe'>('safe');

  return (
    <JuniorFrame badge="RAHASIA PENJELAJAH #1" accentDot={CORAL}>
      <SlideTitle>
        Awas Ada <Highlight>Rintangan!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: 3x3 Obstacle Grid */}
      <MacWindowCard left={X0} top={250} width={960} height={685} headerLabel="peta-rintangan.app" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Interactive Switch */}
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
              Peta Kotak 3×3:
            </div>
            <div style={{ ...row, gap: 12 }}>
              <button
                type="button"
                className="cpj7-card-btn"
                onClick={() => setRouteShown('blocked')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 14,
                  background: routeShown === 'blocked' ? CORAL : WHITE,
                  color: routeShown === 'blocked' ? WHITE : CHARCOAL,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 19,
                  fontWeight: 700,
                  ...row,
                  gap: 8,
                }}
              >
                <JuniorIcon name="rock" size={20} />
                <span>Jalan Tertutup</span>
              </button>
              <button
                type="button"
                className="cpj7-card-btn"
                onClick={() => setRouteShown('safe')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 14,
                  background: routeShown === 'safe' ? TEAL : WHITE,
                  color: routeShown === 'safe' ? WHITE : CHARCOAL,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 19,
                  fontWeight: 700,
                  ...row,
                  gap: 8,
                }}
              >
                <JuniorIcon name="turn-up" size={20} />
                <span>Cari Jalan Lain!</span>
              </button>
            </div>
          </div>

          {/* 3x3 Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 170px)',
              gridTemplateRows: 'repeat(3, 134px)',
              gap: 14,
              justifyContent: 'center',
              alignContent: 'center',
              background: '#F8FAFC',
              padding: 20,
              borderRadius: 24,
              border: `3px solid ${CHARCOAL}`,
            }}
          >
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => {
                const isBiko = r === 1 && c === 0;
                const isRock = r === 1 && c === 1;
                const isSafeDetourTop = (r === 0 && c === 0) || (r === 0 && c === 1);
                const isFlag = r === 0 && c === 2;
                const isBush = r === 2 && c === 2;

                const highlightSafe = routeShown === 'safe' && isSafeDetourTop;
                const highlightBlocked = routeShown === 'blocked' && isRock;

                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      borderRadius: 18,
                      background: isBiko
                        ? SKY_SOFT
                        : highlightBlocked
                          ? '#FEE2E2'
                          : highlightSafe
                            ? TEAL_SOFT
                            : isFlag
                              ? SUNNY_SOFT
                              : WHITE,
                      border: highlightSafe
                        ? `3.5px dashed ${TEAL}`
                        : highlightBlocked
                          ? `3.5px solid ${CORAL}`
                          : `2.5px solid ${CHARCOAL}`,
                      ...centerCol,
                      position: 'relative',
                    }}
                  >
                    {isBiko && <BikoTokenSvg size={82} alert={routeShown === 'blocked'} />}
                    {isRock && <RockSvg size={78} withCross />}
                    {isBush && <BushSvg size={70} />}
                    {isFlag && <FlagSvg size={74} />}
                    {routeShown === 'safe' && r === 0 && c === 0 && (
                      <div style={{ ...row, gap: 6 }}>
                        <JuniorIcon name="arrow-up" size={34} />
                        <JuniorIcon name="turn-up" size={34} />
                      </div>
                    )}
                    {routeShown === 'safe' && r === 0 && c === 1 && (
                      <JuniorIcon name="arrow-right" size={36} />
                    )}
                    {routeShown === 'blocked' && isRock && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 6,
                          padding: '2px 10px',
                          borderRadius: 99,
                          background: CORAL,
                          color: WHITE,
                          fontSize: 13,
                          fontWeight: 800,
                        }}
                      >
                        TERTUTUP!
                      </span>
                    )}
                  </div>
                );
              }),
            )}
          </div>

          <div
            style={{
              ...row,
              justifyContent: 'center',
              gap: 10,
              textAlign: 'center',
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
              color: routeShown === 'safe' ? '#047857' : CORAL,
            }}
          >
            {routeShown === 'safe' ? (
              <>
                <JuniorIcon name="check" size={24} />
                <span>Biko berbelok ke kotak kosong di atas untuk melewati batu!</span>
              </>
            ) : (
              <>
                <JuniorIcon name="stop" size={24} />
                <span>Ups! Ada batu besar tepat di depan — tidak bisa langsung maju!</span>
              </>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: Brief Explanation Cards + Biko */}
      <div style={{ ...abs(1100, 250, 720, 685), display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div
          style={{
            background: CORAL_SOFT,
            borderRadius: 24,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${CORAL}`,
            padding: '24px 28px',
            ...row,
            gap: 20,
          }}
        >
          <RockSvg size={74} />
          <div>
            <div style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
              <JuniorIcon name="rock" size={28} />
              <span>Batu atau Semak Menutup Jalan</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: MUTED, marginTop: 4 }}>
              Kotak yang ada rintangan tidak boleh dilewati!
            </div>
          </div>
        </div>

        <div
          style={{
            background: TEAL_SOFT,
            borderRadius: 24,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${TEAL}`,
            padding: '24px 28px',
            ...row,
            gap: 20,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: TEAL,
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
              fontSize: 38,
              color: WHITE,
              flexShrink: 0,
            }}
          >
            <JuniorIcon name="turn-up" size={38} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
              Jangan Ditabrak, Cari Jalan Lain!
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: MUTED, marginTop: 4 }}>
              Beloklah ke kotak kosong yang aman di samping atau atas.
            </div>
          </div>
        </div>

        <div style={{ flex: 1, ...centerCol }}>
          <BikoMascot
            pose="detective"
            width={245}
            speechBubble="Cek rintangannya dulu ya!"
          />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus Rute Pintar: Maju & Berbelok (3 Langkah Interaktif)
// ============================================================================
const Slide04Jurus: Page = () => {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  const steps: {
    num: string;
    title: string;
    desc: string;
    icon: JuniorIconName;
    color: string;
    soft: string;
    badge: string;
    visual: ReactNode;
  }[] = [
    {
      num: '1',
      title: 'Lihat Rintangan',
      desc: 'Amati di kotak mana ada batu atau semak',
      icon: 'eyes',
      color: SKY,
      soft: SKY_SOFT,
      badge: 'FASE 1 • AMATI',
      visual: (
        <div style={{ ...row, gap: 12 }}>
          <BikoTokenSvg size={64} />
          <JuniorIcon name="magnifier" size={32} />
          <RockSvg size={64} withCross />
        </div>
      ),
    },
    {
      num: '2',
      title: 'Belok ke Kotak Kosong',
      desc: 'Pilih panah arah menuju jalan yang aman',
      icon: 'turn-up',
      color: SUNNY,
      soft: SUNNY_SOFT,
      badge: 'FASE 2 • BELOK',
      visual: (
        <div style={{ ...row, gap: 10 }}>
          <MazeArrowBlock dir="up" size={64} />
          <MazeArrowBlock dir="right" size={64} />
        </div>
      ),
    },
    {
      num: '3',
      title: 'Maju Sampai Finis!',
      desc: 'Lanjutkan langkah sampai bendera bintang',
      icon: 'flag',
      color: TEAL,
      soft: TEAL_SOFT,
      badge: 'FASE 3 • FINIS',
      visual: (
        <div style={{ ...row, gap: 12 }}>
          <BikoTokenSvg size={62} />
          <FlagSvg size={68} />
        </div>
      ),
    },
  ];

  const phaseHint: { icon: JuniorIconName; text: string }[] = [
    { icon: 'eyes', text: 'Fase 1: Biko mengamati batu rintangan dengan cermat!' },
    { icon: 'turn-up', text: 'Fase 2: Biko berbelok ke kotak kosong agar tidak menabrak!' },
    { icon: 'flag', text: 'Fase 3: Biko maju terus sampai tiba di bendera Finis!' },
  ];

  return (
    <JuniorFrame badge="JURUS RUTE PINTAR" accentDot={SUNNY}>
      <SlideTitle>
        Jurus <Highlight>Maju &amp; Berbelok!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={245} width={1720} height={700} headerLabel="jurus-rute-pintar.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* 3 Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {steps.map((s, idx) => {
              const active = phase === idx;
              return (
                <button
                  key={s.num}
                  type="button"
                  className="cpj7-card-btn"
                  onClick={() => setPhase(idx as 0 | 1 | 2)}
                  style={{
                    borderRadius: 26,
                    background: s.soft,
                    border: `3.5px solid ${CHARCOAL}`,
                    boxShadow: active ? `0 0 0 6px ${SUNNY}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${s.color}`,
                    padding: '26px 24px',
                    ...centerCol,
                    gap: 16,
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      padding: '6px 18px',
                      borderRadius: 99,
                      background: s.color,
                      color: s.color === SUNNY ? CHARCOAL : WHITE,
                      border: `2.5px solid ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    {s.badge}
                  </div>

                  <div
                    style={{
                      padding: '14px 20px',
                      borderRadius: 20,
                      background: WHITE,
                      border: `2.5px solid ${CHARCOAL}`,
                      boxShadow: `0 5px 0 ${CHARCOAL}`,
                    }}
                  >
                    {s.visual}
                  </div>

                  <div style={{ ...row, justifyContent: 'center', gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, color: CHARCOAL }}>
                    <JuniorIcon name={s.icon} size={32} />
                    <span>{s.title}</span>
                  </div>

                  <div style={{ fontSize: 22, fontWeight: 700, color: MUTED, lineHeight: 1.35 }}>
                    {s.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Phase Strip */}
          <div
            style={{
              ...row,
              justifyContent: 'space-between',
              padding: '16px 28px',
              borderRadius: 22,
              background: '#F8FAFC',
              border: `3px solid ${CHARCOAL}`,
            }}
          >
            <div style={{ ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700, color: CHARCOAL }}>
              <JuniorIcon name={phaseHint[phase].icon} size={28} />
              <span>{phaseHint[phase].text}</span>
            </div>
            <div style={{ ...row, gap: 12 }}>
              <button
                type="button"
                className="cpj7-card-btn"
                onClick={() => setPhase(((phase + 1) % 3) as 0 | 1 | 2)}
                style={{
                  padding: '10px 22px',
                  borderRadius: 16,
                  background: TEAL,
                  color: WHITE,
                  border: `2.5px solid ${CHARCOAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 21,
                  fontWeight: 700,
                  ...row,
                  gap: 8,
                }}
              >
                <JuniorIcon name="play" size={20} />
                <span>Langkah Berikutnya</span>
              </button>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Latihan Rute #1: Yuk Belok Hindari Batu! ([⬆️] + [➡️] + [➡️])
// ============================================================================
const Slide05Latihan1: Page = () => {
  const [step, setStep] = useState(0); // 0 = start (1,0), 1 = (0,0), 2 = (0,1), 3 = (0,2)
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const replay = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStep(0);
    const tick = (s: number) => {
      timerRef.current = window.setTimeout(() => {
        setStep(s);
        if (s < 3) tick(s + 1);
      }, 480);
    };
    tick(1);
  };

  const bikoCoords: [number, number][] = [
    [1, 0],
    [0, 0],
    [0, 1],
    [0, 2],
  ];
  const [br, bc] = bikoCoords[step];

  return (
    <JuniorFrame badge="LATIHAN RUTE #1" accentDot={TEAL}>
      <SlideTitle>
        Yuk <Highlight>Belok</Highlight> Hindari Batu!
      </SlideTitle>

      {/* Left Spotlight Grid Card */}
      <MacWindowCard left={X0} top={250} width={920} height={680} headerLabel="latihan-rute-1.app" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
              Bantu Biko menuju Bendera Bintang!
            </span>
            <button
              type="button"
              className="cpj7-card-btn"
              onClick={replay}
              style={{
                padding: '10px 22px',
                borderRadius: 16,
                background: TEAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                boxShadow: `0 4px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 20,
                fontWeight: 700,
                ...row,
                gap: 8,
              }}
            >
              <JuniorIcon name="play" size={20} />
              <span>Jalankan Rute</span>
            </button>
          </div>

          {/* 3 cols x 2 playable rows + bottom garden hedge framing 3x3 feel */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 195px)',
              gridTemplateRows: 'repeat(2, 165px)',
              gap: 16,
              justifyContent: 'center',
              alignContent: 'center',
              background: '#F0FDF4',
              padding: 26,
              borderRadius: 26,
              border: `3px solid ${CHARCOAL}`,
              position: 'relative',
            }}
          >
            {[0, 1].map((r) =>
              [0, 1, 2].map((c) => {
                const isBikoHere = br === r && bc === c;
                const isRock = r === 1 && c === 1;
                const isFlag = r === 0 && c === 2;
                const isPathCell = (r === 0 && c === 0) || (r === 0 && c === 1) || (r === 0 && c === 2);

                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      borderRadius: 20,
                      background: isRock
                        ? CORAL_SOFT
                        : isFlag
                          ? SUNNY_SOFT
                          : isPathCell
                            ? TEAL_SOFT
                            : WHITE,
                      border: isPathCell
                        ? `3px dashed ${TEAL}`
                        : `3px solid ${CHARCOAL}`,
                      ...centerCol,
                      position: 'relative',
                    }}
                  >
                    {isFlag && !isBikoHere && <FlagSvg size={88} />}
                    {isRock && <RockSvg size={90} withCross />}
                    {!isBikoHere && r === 0 && c === 0 && (
                      <JuniorIcon name="arrow-up" size={34} />
                    )}
                    {!isBikoHere && r === 0 && c === 1 && (
                      <JuniorIcon name="arrow-right" size={34} />
                    )}
                    {isBikoHere && (
                      <div style={{ ...centerCol }}>
                        <BikoTokenSvg size={102} />
                        {step === 3 && (
                          <span
                            style={{
                              position: 'absolute',
                              top: -12,
                              right: -10,
                              padding: '4px 12px',
                              borderRadius: 99,
                              background: SUNNY,
                              border: `2.5px solid ${CHARCOAL}`,
                              fontFamily: 'var(--osd-font-display)',
                              fontSize: 16,
                              fontWeight: 700,
                              ...row,
                              gap: 4,
                            }}
                          >
                            <JuniorIcon name="flag" size={16} />
                            <span>FINIS!</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              }),
            )}
          </div>

          <div
            style={{
              ...row,
              justifyContent: 'center',
              gap: 8,
              textAlign: 'center',
              fontFamily: 'var(--osd-font-display)',
              fontSize: 23,
              fontWeight: 700,
              color: step === 3 ? '#047857' : MUTED,
            }}
          >
            {step === 0 && 'Klik "Jalankan Rute" atau klik blok panah di kanan satu per satu!'}
            {step === 1 && (
              <>
                <span>Langkah 1:</span>
                <JuniorIcon name="arrow-up" size={24} />
                <span>Naik 1 kotak menghindari batu!</span>
              </>
            )}
            {step === 2 && (
              <>
                <span>Langkah 2:</span>
                <JuniorIcon name="arrow-right" size={24} />
                <span>Maju ke kanan 1 kotak!</span>
              </>
            )}
            {step === 3 && (
              <>
                <JuniorIcon name="party" size={24} />
                <span>Langkah 3:</span>
                <JuniorIcon name="arrow-right" size={24} />
                <span>Maju 1 kotak lagi -&gt; Sampai di Bendera Finis!</span>
              </>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card: Block Sequence [⬆️] + [➡️] + [➡️] */}
      <MacWindowCard left={1055} top={250} width={765} height={680} headerLabel="rangkaian-blok-1.app" padding={36}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                padding: '20px 24px',
                borderRadius: 22,
                background: CORAL_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
                ...row,
                gap: 12,
              }}
            >
              <JuniorIcon name="rock" size={30} />
              <span>Ada batu tepat di depan Biko!</span>
            </div>

            <div
              style={{
                padding: '24px',
                borderRadius: 22,
                background: TEAL_SOFT,
                border: `3px solid ${CHARCOAL}`,
              }}
            >
              <div style={{ ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700, marginBottom: 18 }}>
                <JuniorIcon name="puzzle" size={28} />
                <span>Rute Pintar (Naik 1, Kanan 2):</span>
              </div>

              <div style={{ ...row, justifyContent: 'center', gap: 14 }}>
                <MazeArrowBlock
                  dir="up"
                  size={104}
                  stepNum={1}
                  active={step === 1}
                  showRightTab
                  onClick={() => setStep(1)}
                />
                <MazeArrowBlock
                  dir="right"
                  size={104}
                  stepNum={2}
                  active={step === 2}
                  showRightTab
                  onClick={() => setStep(2)}
                />
                <MazeArrowBlock
                  dir="right"
                  size={104}
                  stepNum={3}
                  active={step === 3}
                  onClick={() => setStep(3)}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              ...row,
              justifyContent: 'space-between',
              background: SUNNY_SOFT,
              borderRadius: 22,
              border: `3px solid ${CHARCOAL}`,
              padding: '16px 24px',
            }}
          >
            <div style={{ ...row, flexWrap: 'wrap', gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
              <JuniorIcon name="step-1" size={26} />
              <span>Naik 1 kotak -&gt;</span>
              <JuniorIcon name="step-2" size={26} />
              <span>Maju 2 kotak ke kanan!</span>
            </div>
            <BikoMascot pose="thumbs-up" width={120} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Biko Harus Belok ke Mana?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [choice, setChoice] = useState<'up' | 'down' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle align="center" top={122}>
        Biko Harus <Highlight>Belok ke Mana?</Highlight>
      </SlideTitle>

      {/* Top Interactive Puzzle Map (3x3) */}
      <MacWindowCard left={240} top={215} width={1440} height={310} headerLabel="tebak-jalan-aman.app" padding={20}>
        <div style={{ ...row, justifyContent: 'center', gap: 56, height: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 108px)',
              gridTemplateRows: 'repeat(3, 66px)',
              gap: 8,
              background: '#F8FAFC',
              padding: 12,
              borderRadius: 20,
              border: `3px solid ${CHARCOAL}`,
            }}
          >
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => {
                const isBikoStart = r === 1 && c === 0 && choice === null;
                const isBikoMovedUp = r === 0 && c === 0 && choice === 'up';
                const isBikoMovedDown = r === 2 && c === 0 && choice === 'down';
                const isRock = r === 1 && c === 1;
                const isCactus = r === 2 && c === 0;
                const isSafeTop = r === 0 && c === 0;
                const isFlag = r === 0 && c === 2;

                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      borderRadius: 12,
                      background: isSafeTop
                        ? TEAL_SOFT
                        : isCactus
                          ? CORAL_SOFT
                          : isRock
                            ? '#FEE2E2'
                            : isFlag
                              ? SUNNY_SOFT
                              : WHITE,
                      border: `2.5px solid ${CHARCOAL}`,
                      ...centerCol,
                    }}
                  >
                    {(isBikoStart || isBikoMovedUp || isBikoMovedDown) && (
                      <BikoTokenSvg size={50} alert={choice === 'down'} />
                    )}
                    {isRock && <RockSvg size={50} withCross />}
                    {isCactus && !isBikoMovedDown && <CactusSvg size={52} />}
                    {isFlag && <FlagSvg size={48} />}
                    {isSafeTop && !isBikoMovedUp && (
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#047857' }}>AMAN</span>
                    )}
                  </div>
                );
              }),
            )}
          </div>

          <div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
              Lihat peta di sebelah kiri:
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: MUTED, lineHeight: 1.4, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ ...row, gap: 8 }}>
                <JuniorIcon name="rock" size={24} />
                <span>Di depan Biko ada <strong>Batu</strong>.</span>
              </div>
              <div style={{ ...row, gap: 8 }}>
                <JuniorIcon name="cactus" size={24} />
                <span>Di bawah Biko ada <strong>Kaktus berduri</strong>.</span>
              </div>
              <div style={{ ...row, gap: 8 }}>
                <JuniorIcon name="sparkle" size={24} />
                <span>Di atas Biko ada kotak kosong aman!</span>
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Bottom 2 Choice Cards + Biko Question in Center Bottom */}
      <button
        type="button"
        className="cpj7-card-btn"
        onClick={() => setChoice('up')}
        style={{
          ...abs(160, 560, 580, 290),
          borderRadius: 28,
          background: choice === 'up' ? TEAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 'up' ? `0 0 0 6px ${TEAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${TEAL}`,
          padding: 28,
          ...centerCol,
          gap: 16,
        }}
      >
        <span
          style={{
            padding: '6px 18px',
            borderRadius: 99,
            background: TEAL,
            color: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          PILIHAN A
        </span>
        <MazeArrowBlock dir="up" size={102} />
        <div style={{ ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
          <span>Belok Atas</span>
          {choice === 'up' && <JuniorIcon name="check" size={32} />}
        </div>
      </button>

      {/* Biko Question Mascot in Center Bottom */}
      <div style={{ ...abs(760, 540, 400, 355), ...centerCol }}>
        <BikoMascot
          pose={choice === 'up' ? 'thumbs-up' : 'question'}
          width={240}
          speechBubble={
            choice === 'up'
              ? 'Benar! Jalan atas aman!'
              : choice === 'down'
                ? 'Aduh! Ada kaktus!'
                : 'Pilih yang mana ya?'
          }
        />
      </div>

      <button
        type="button"
        className="cpj7-card-btn"
        onClick={() => setChoice('down')}
        style={{
          ...abs(1180, 560, 580, 290),
          borderRadius: 28,
          background: choice === 'down' ? CORAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 'down' ? `0 0 0 6px ${CORAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${CORAL}`,
          padding: 28,
          ...centerCol,
          gap: 16,
          animation: choice === 'down' ? 'cpj7-shake 0.35s ease' : undefined,
        }}
      >
        <span
          style={{
            padding: '6px 18px',
            borderRadius: 99,
            background: CORAL,
            color: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          PILIHAN B
        </span>
        <MazeArrowBlock dir="down" size={102} />
        <div style={{ ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
          <span>Belok Bawah</span>
          {choice === 'down' && <JuniorIcon name="cross" size={32} />}
        </div>
      </button>

      {/* Bottom Prompt */}
      <div
        style={{
          ...abs(460, 915, 1000, 56),
          ...centerCol,
        }}
      >
        <div
          style={{
            padding: '10px 30px',
            borderRadius: 99,
            background: choice === 'up' ? TEAL_SOFT : SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 25,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          {choice === 'up' ? (
            <>
              <JuniorIcon name="party" size={26} />
              <span>Hebat! Belok Atas menghindari batu dan kaktus!</span>
            </>
          ) : (
            <>
              <JuniorIcon name="tap" size={26} />
              <span>Tunjuk atau klik jalan yang aman di layarmu ya!</span>
            </>
          )}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Latihan Rute #2: Tantangan Rute Zig-Zag!
// ============================================================================
const Slide07Latihan2: Page = () => {
  const [step, setStep] = useState(0); // 0:(1,0) -> 1:(1,1) -> 2:(0,1) -> 3:(0,2)
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const replay = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStep(0);
    const tick = (s: number) => {
      timerRef.current = window.setTimeout(() => {
        setStep(s);
        if (s < 3) tick(s + 1);
      }, 480);
    };
    tick(1);
  };

  const zigCoords: [number, number][] = [
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 2],
  ];
  const [br, bc] = zigCoords[step];

  return (
    <JuniorFrame badge="LATIHAN RUTE #2" accentDot={LAVENDER}>
      <SlideTitle>
        Tantangan <Highlight>Rute Zig-Zag!</Highlight>
      </SlideTitle>

      {/* Left: 3x3 Labyrinth Grid with 2 Obstacles (Rock + Thorny Bush) */}
      <MacWindowCard left={X0} top={250} width={920} height={680} headerLabel="labirin-zigzag.app" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
              Peta Labirin 3×3 (Jalur Tangga):
            </span>
            <button
              type="button"
              className="cpj7-card-btn"
              onClick={replay}
              style={{
                padding: '10px 22px',
                borderRadius: 16,
                background: TEAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                boxShadow: `0 4px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 20,
                fontWeight: 700,
                ...row,
                gap: 8,
              }}
            >
              <JuniorIcon name="play" size={20} />
              <span>Jalan Zig-Zag!</span>
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 180px)',
              gridTemplateRows: 'repeat(3, 134px)',
              gap: 14,
              justifyContent: 'center',
              alignContent: 'center',
              background: '#F8FAFC',
              padding: 20,
              borderRadius: 24,
              border: `3px solid ${CHARCOAL}`,
            }}
          >
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => {
                const isBikoHere = br === r && bc === c;
                const isBushObstacle = r === 0 && c === 0;
                const isRockObstacle = r === 1 && c === 2;
                const isDecoBush = r === 2 && c === 0;
                const isDecoRock = r === 2 && c === 2;
                const isFlag = r === 0 && c === 2;
                const isZigPath =
                  (r === 1 && c === 0) || (r === 1 && c === 1) || (r === 0 && c === 1) || (r === 0 && c === 2);

                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      borderRadius: 18,
                      background: isBushObstacle || isRockObstacle
                        ? CORAL_SOFT
                        : isDecoBush || isDecoRock
                          ? '#F1F5F9'
                          : isFlag
                            ? SUNNY_SOFT
                            : isZigPath
                              ? TEAL_SOFT
                              : WHITE,
                      border: isZigPath ? `3px dashed ${TEAL}` : `2.5px solid ${CHARCOAL}`,
                      ...centerCol,
                      position: 'relative',
                    }}
                  >
                    {isBushObstacle && <BushSvg size={82} />}
                    {isRockObstacle && <RockSvg size={82} withCross />}
                    {isDecoBush && <BushSvg size={68} style={{ opacity: 0.75 }} />}
                    {isDecoRock && <RockSvg size={68} style={{ opacity: 0.75 }} />}
                    {isFlag && !isBikoHere && <FlagSvg size={76} />}
                    {!isBikoHere && r === 1 && c === 1 && (
                      <JuniorIcon name="arrow-up" size={32} />
                    )}
                    {!isBikoHere && r === 0 && c === 1 && (
                      <JuniorIcon name="arrow-right" size={32} />
                    )}
                    {isBikoHere && (
                      <div style={{ ...centerCol }}>
                        <BikoTokenSvg size={86} />
                        {step === 3 && (
                          <span
                            style={{
                              position: 'absolute',
                              top: -10,
                              right: -10,
                              padding: '3px 10px',
                              borderRadius: 99,
                              background: SUNNY,
                              border: `2px solid ${CHARCOAL}`,
                              fontFamily: 'var(--osd-font-display)',
                              fontSize: 15,
                              fontWeight: 700,
                            }}
                          >
                            FINIS!
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              }),
            )}
          </div>

          <div
            style={{
              ...row,
              justifyContent: 'center',
              gap: 8,
              textAlign: 'center',
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
              color: step === 3 ? '#047857' : MUTED,
            }}
          >
            {step === 0 && (
              <>
                <span>Hindari Semak Berduri</span>
                <JuniorIcon name="bush" size={22} />
                <span>&amp; Batu</span>
                <JuniorIcon name="rock" size={22} />
                <span>dengan jalur tangga!</span>
              </>
            )}
            {step === 1 && (
              <>
                <JuniorIcon name="step-1" size={24} />
                <span>Maju Kanan</span>
                <JuniorIcon name="arrow-right" size={22} />
                <span>— hindari semak di atas!</span>
              </>
            )}
            {step === 2 && (
              <>
                <JuniorIcon name="step-2" size={24} />
                <span>Belok Atas</span>
                <JuniorIcon name="arrow-up" size={22} />
                <span>— hindari batu di sebelah kanan!</span>
              </>
            )}
            {step === 3 && (
              <>
                <JuniorIcon name="party" size={24} />
                <JuniorIcon name="step-3" size={24} />
                <span>Maju Kanan</span>
                <JuniorIcon name="arrow-right" size={22} />
                <span>-&gt; Sampai di Bendera Finis!</span>
              </>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card: 3 Numbered Instructions + Block Sequence */}
      <MacWindowCard left={1055} top={250} width={765} height={680} headerLabel="urutan-zigzag.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {(
              [
                { n: 'step-1' as const, text: 'Maju Kanan', dir: 'arrow-right' as const, bg: SKY_SOFT, active: step === 1 },
                { n: 'step-2' as const, text: 'Belok Atas', dir: 'arrow-up' as const, bg: SUNNY_SOFT, active: step === 2 },
                { n: 'step-3' as const, text: 'Maju Kanan -> Finis!', dir: 'arrow-right' as const, bg: TEAL_SOFT, active: step === 3 },
              ] as const
            ).map((item, idx) => (
              <button
                key={item.n}
                type="button"
                className="cpj7-card-btn"
                onClick={() => setStep(idx + 1)}
                style={{
                  ...row,
                  gap: 16,
                  padding: '18px 24px',
                  borderRadius: 20,
                  background: item.bg,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: item.active ? `0 0 0 5px ${SUNNY}, 0 5px 0 ${CHARCOAL}` : `0 5px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 30,
                  fontWeight: 700,
                  textAlign: 'left',
                }}
              >
                <JuniorIcon name={item.n} size={34} />
                <JuniorIcon name={item.dir} size={28} />
                <span>{item.text}</span>
              </button>
            ))}
          </div>

          {/* Connected Block Chain */}
          <div
            style={{
              padding: '22px 24px',
              borderRadius: 24,
              background: LAVENDER_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
              gap: 16,
            }}
          >
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
              Rangkaian Blok Pintar:
            </div>
            <div style={{ ...row, gap: 14 }}>
              <MazeArrowBlock dir="right" size={96} stepNum={1} active={step === 1} showRightTab onClick={() => setStep(1)} />
              <MazeArrowBlock dir="up" size={96} stepNum={2} active={step === 2} showRightTab onClick={() => setStep(2)} />
              <MazeArrowBlock dir="right" size={96} stepNum={3} active={step === 3} onClick={() => setStep(3)} />
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Labirin Digital (Boleh vs Jangan)
// ============================================================================
const Slide08Tips: Page = () => (
  <JuniorFrame badge="TIPS JAGOAN LABIRIN" accentDot={TEAL}>
    <SlideTitle>
      Rahasia <Highlight>Lolos Labirin!</Highlight>
    </SlideTitle>

    <div
      style={{
        ...abs(X0, 245, W, 695),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 44,
      }}
    >
      {/* Left Column: BOLEH */}
      <div
        style={{
          background: WHITE,
          borderRadius: 30,
          border: `4px solid ${TEAL}`,
          boxShadow: `0 10px 0 ${TEAL}`,
          padding: '30px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '10px 24px',
              borderRadius: 99,
              background: TEAL,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="check" size={30} />
            <span>BOLEH</span>
          </div>
          <BikoMascot pose="thumbs-up" width={115} />
        </div>

        {/* Mini Safe Green Path Visual */}
        <div
          style={{
            borderRadius: 24,
            background: TEAL_SOFT,
            border: `3px solid ${CHARCOAL}`,
            padding: '22px 26px',
            ...row,
            justifyContent: 'center',
            gap: 14,
          }}
        >
          <div style={{ width: 88, height: 88, borderRadius: 18, background: WHITE, border: `3px solid ${TEAL}`, ...centerCol }}>
            <BikoTokenSvg size={64} />
          </div>
          <JuniorIcon name="arrow-right" size={30} />
          <div style={{ width: 88, height: 88, borderRadius: 18, background: WHITE, border: `3px dashed ${TEAL}`, ...centerCol }}>
            <JuniorIcon name="turn-up" size={34} />
          </div>
          <JuniorIcon name="arrow-right" size={30} />
          <div style={{ width: 88, height: 88, borderRadius: 18, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
            <FlagSvg size={62} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              padding: '18px 22px',
              borderRadius: 20,
              background: TEAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="eyes" size={32} />
            <span><strong>Cek Jalur</strong> sebelum jalan</span>
          </div>
          <div
            style={{
              padding: '18px 22px',
              borderRadius: 20,
              background: TEAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="turn-up" size={32} />
            <span><strong>Belok</strong> ke kotak kosong</span>
          </div>
        </div>
      </div>

      {/* Right Column: JANGAN */}
      <div
        style={{
          background: WHITE,
          borderRadius: 30,
          border: `4px solid ${CORAL}`,
          boxShadow: `0 10px 0 ${CORAL}`,
          padding: '30px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '10px 24px',
              borderRadius: 99,
              background: CORAL,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="cross" size={30} />
            <span>JANGAN</span>
          </div>
          <BikoMascot pose="thinking" width={115} />
        </div>

        {/* Mini Blocked Crash Visual */}
        <div
          style={{
            borderRadius: 24,
            background: CORAL_SOFT,
            border: `3px solid ${CHARCOAL}`,
            padding: '22px 26px',
            ...row,
            justifyContent: 'center',
            gap: 18,
          }}
        >
          <div style={{ width: 92, height: 92, borderRadius: 18, background: WHITE, border: `3px solid ${CORAL}`, ...centerCol }}>
            <BikoTokenSvg size={64} alert />
          </div>
          <JuniorIcon name="warning" size={38} />
          <div style={{ width: 92, height: 92, borderRadius: 18, background: '#FEE2E2', border: `3px solid ${CORAL}`, ...centerCol }}>
            <RockSvg size={68} withCross />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              padding: '18px 22px',
              borderRadius: 20,
              background: CORAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="warning" size={32} />
            <span><strong>Menabrak</strong> batu rintangan</span>
          </div>
          <div
            style={{
              padding: '18px 22px',
              borderRadius: 20,
              background: CORAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="lightning" size={32} />
            <span><strong>Terburu-buru</strong> menyusun panah</span>
          </div>
        </div>
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Taklukkan Labirin Digital! (3 Blok + Game Labirin)
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const [slots, setSlots] = useState<(Dir | null)[]>([null, null, null, null]);
  const [bikoPos, setBikoPos] = useState<[number, number]>([2, 0]);
  const [status, setStatus] = useState<'idle' | 'running' | 'win' | 'hit'>('idle');
  const [message, setMessage] = useState<{ icon?: JuniorIconName; text: string }>({
    text: 'Susun 4 blok panah untuk mengambil Peti Harta Karun!',
  });
  const [dragDir, setDragDir] = useState<Dir | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const addBlock = (dir: Dir) => {
    if (status === 'running') return;
    const emptyIdx = slots.findIndex((s) => s === null);
    if (emptyIdx === -1) return;
    const next = [...slots];
    next[emptyIdx] = dir;
    setSlots(next);
    setStatus('idle');
    setBikoPos([2, 0]);
  };

  const clearSlot = (idx: number) => {
    if (status === 'running') return;
    const next = [...slots];
    next[idx] = null;
    setSlots(next);
    setStatus('idle');
    setBikoPos([2, 0]);
  };

  const resetGame = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setSlots([null, null, null, null]);
    setBikoPos([2, 0]);
    setStatus('idle');
    setMessage({ text: 'Susun 4 blok panah untuk mengambil Peti Harta Karun!' });
  };

  const fillHint = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setSlots(['right', 'up', 'right', 'up']);
    setBikoPos([2, 0]);
    setStatus('idle');
    setMessage({ icon: 'bulb', text: 'Petunjuk siap! Klik "Jalan!" untuk mencoba.' });
  };

  const handleDropSlot = (idx: number) => (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!dragDir || status === 'running') return;
    const next = [...slots];
    next[idx] = dragDir;
    setSlots(next);
    setDragDir(null);
    setStatus('idle');
    setBikoPos([2, 0]);
  };

  const runMaze = () => {
    if (status === 'running') return;
    const active = slots.filter((s): s is Dir => s !== null);
    if (active.length === 0) {
      setMessage({ text: 'Pilih atau geser blok panah dulu ya!' });
      return;
    }

    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStatus('running');
    setBikoPos([2, 0]);
    setMessage({ text: 'Biko mulai melangkah...' });

    const obstacles = new Set(['1,0', '2,2', '0,1']);
    let r = 2;
    let c = 0;

    const stepNext = (i: number) => {
      if (i >= active.length) {
        if (r === 0 && c === 2) {
          setStatus('win');
          setMessage({ icon: 'party', text: 'Hore! Biko lolos labirin & dapat Harta Karun!' });
        } else {
          setStatus('hit');
          setMessage({ text: 'Belum sampai di Harta Karun! Coba cek lagi langkahnya ya.' });
        }
        return;
      }

      const d = active[i];
      if (d === 'up') r -= 1;
      if (d === 'down') r += 1;
      if (d === 'left') c -= 1;
      if (d === 'right') c += 1;

      if (r < 0 || r > 2 || c < 0 || c > 2) {
        setStatus('hit');
        setMessage({ text: 'Ups! Biko keluar jalur peta! Ayo susun ulang.' });
        return;
      }

      if (obstacles.has(`${r},${c}`)) {
        setStatus('hit');
        setMessage({ icon: 'warning', text: 'Awas! Ada batu atau semak menghalangi jalan!' });
        return;
      }

      setBikoPos([r, c]);

      if (r === 0 && c === 2) {
        setStatus('win');
        setMessage({ icon: 'party', text: 'Yeay! Biko berhasil melewati labirin & dapat Harta Karun!' });
        return;
      }

      timerRef.current = window.setTimeout(() => stepNext(i + 1), 430);
    };

    timerRef.current = window.setTimeout(() => stepNext(0), 280);
  };

  const stepCards = [
    { num: '1', label: 'Amati rintangan & finis', color: SKY, soft: SKY_SOFT },
    { num: '2', label: 'Rangkai blok maju & belok', color: SUNNY, soft: SUNNY_SOFT },
    { num: '3', label: 'Tekan Jalan! Lolos labirin!', color: TEAL, soft: TEAL_SOFT },
  ];

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle top={120}>
        Misi <Highlight>Labirin Digital!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr Step Blocks (1 -> 2 -> 3) */}
      <div style={{ ...abs(X0, 206, W, 94), ...row, justifyContent: 'space-between', gap: 18 }}>
        {stepCards.map((sc, idx) => (
          <Fragment key={sc.num}>
            <div
              style={{
                flex: 1,
                height: 88,
                borderRadius: 22,
                background: sc.soft,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${sc.color}`,
                padding: '0 22px',
                ...row,
                gap: 16,
              }}
            >
              <span
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: sc.color,
                  color: sc.color === SUNNY ? CHARCOAL : WHITE,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 28,
                  fontWeight: 700,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                {sc.num}
              </span>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
                {sc.label}
              </span>
            </div>
            {idx < 2 && <span style={{ fontSize: 32, fontWeight: 800, color: CHARCOAL }}>➜</span>}
          </Fragment>
        ))}
      </div>

      {/* Bottom Interactive Game Window + Cheering Biko */}
      <MacWindowCard left={X0} top={322} width={1320} height={635} headerLabel="labirin-digital-game.app" padding={26}>
        <div style={{ display: 'grid', gridTemplateColumns: '520px 1fr', gap: 28, height: '100%' }}>
          {/* 3x3 Labyrinth Board */}
          <div
            style={{
              background: '#F0FDF4',
              borderRadius: 24,
              border: `3px solid ${CHARCOAL}`,
              padding: 18,
              ...centerCol,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 146px)',
                gridTemplateRows: 'repeat(3, 142px)',
                gap: 10,
              }}
            >
              {[0, 1, 2].map((r) =>
                [0, 1, 2].map((c) => {
                  const hasBiko = bikoPos[0] === r && bikoPos[1] === c;
                  const isBush = r === 1 && c === 0;
                  const isRock1 = r === 2 && c === 2;
                  const isRock2 = r === 0 && c === 1;
                  const isGoal = r === 0 && c === 2;

                  return (
                    <div
                      key={`${r}-${c}`}
                      style={{
                        borderRadius: 18,
                        background:
                          isBush || isRock1 || isRock2
                            ? CORAL_SOFT
                            : isGoal
                              ? SUNNY_SOFT
                              : WHITE,
                        border: hasBiko
                          ? `3.5px solid ${SKY}`
                          : `2.5px solid ${CHARCOAL}`,
                        ...centerCol,
                        position: 'relative',
                      }}
                    >
                      {isBush && <BushSvg size={82} />}
                      {(isRock1 || isRock2) && <RockSvg size={82} />}
                      {isGoal && !hasBiko && <ChestSvg size={82} />}
                      {hasBiko && (
                        <BikoTokenSvg
                          size={96}
                          alert={status === 'hit'}
                          style={{ animation: status === 'win' ? 'cpj7-hop 1s ease-in-out infinite' : undefined }}
                        />
                      )}
                      {r === 2 && c === 0 && !hasBiko && (
                        <span style={{ fontSize: 16, fontWeight: 800, color: MUTED }}>START</span>
                      )}
                    </div>
                  );
                }),
              )}
            </div>
          </div>

          {/* Right Controls: Palette + 4 Sequence Slots + Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
                1. Klik atau Tarik Blok Panah:
              </div>
              <div style={{ ...row, gap: 14 }}>
                {(['up', 'down', 'left', 'right'] as Dir[]).map((d) => (
                  <div
                    key={d}
                    draggable
                    onDragStart={() => setDragDir(d)}
                    style={{ display: 'inline-flex' }}
                  >
                    <MazeArrowBlock dir={d} size={80} onClick={() => addBlock(d)} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
                2. Slot Rute Pintar (4 Langkah):
              </div>
              <div
                style={{
                  ...row,
                  gap: 14,
                  padding: '16px 20px',
                  borderRadius: 22,
                  background: '#F8FAFC',
                  border: `3px solid ${CHARCOAL}`,
                }}
              >
                {slots.map((dir, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => clearSlot(idx)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDropSlot(idx)}
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 20,
                      background: dir ? WHITE : '#E2E8F0',
                      border: dir ? `3px solid ${CHARCOAL}` : `3px dashed #64748B`,
                      ...centerCol,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                    title="Klik untuk hapus blok"
                  >
                    {dir ? (
                      <MazeArrowBlock dir={dir} size={76} stepNum={idx + 1} />
                    ) : (
                      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, color: '#64748B' }}>
                        {idx + 1}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Status & Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div
                style={{
                  padding: '12px 18px',
                  borderRadius: 16,
                  background:
                    status === 'win'
                      ? TEAL_SOFT
                      : status === 'hit'
                        ? CORAL_SOFT
                        : SUNNY_SOFT,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 21,
                  fontWeight: 700,
                  ...row,
                  gap: 8,
                }}
              >
                {message.icon && <JuniorIcon name={message.icon} size={24} />}
                <span>{message.text}</span>
              </div>

              <div style={{ ...row, gap: 14 }}>
                <button
                  type="button"
                  className="cpj7-card-btn"
                  onClick={runMaze}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    borderRadius: 18,
                    background: TEAL,
                    color: WHITE,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 6px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 25,
                    fontWeight: 700,
                    ...row,
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <JuniorIcon name="play" size={24} />
                  <span>Jalan!</span>
                </button>
                <button
                  type="button"
                  className="cpj7-card-btn"
                  onClick={fillHint}
                  style={{
                    padding: '14px 20px',
                    borderRadius: 18,
                    background: SUNNY,
                    color: CHARCOAL,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 6px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 22,
                    fontWeight: 700,
                    ...row,
                    gap: 8,
                  }}
                >
                  <JuniorIcon name="bulb" size={22} />
                  <span>Petunjuk</span>
                </button>
                <button
                  type="button"
                  className="cpj7-card-btn"
                  onClick={resetGame}
                  style={{
                    padding: '14px 20px',
                    borderRadius: 18,
                    background: WHITE,
                    color: CHARCOAL,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 6px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 22,
                    fontWeight: 700,
                    ...row,
                    gap: 8,
                  }}
                >
                  <JuniorIcon name="reset" size={22} />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko on Right */}
      <BikoMascot
        pose={status === 'win' ? 'jump' : 'thumbs-up'}
        width={340}
        speechBubble={status === 'win' ? 'Penjelajah Hebat!' : 'Ayo cari harta karun!'}
        style={{ ...abs(1475, 430) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 7 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  const confetti = [
    { left: 160, top: 240, color: SUNNY, rot: '18deg', size: 22 },
    { left: 290, top: 760, color: SKY, rot: '-24deg', size: 24 },
    { left: 1640, top: 230, color: CORAL, rot: '-15deg', size: 22 },
    { left: 1520, top: 820, color: LAVENDER, rot: '28deg', size: 24 },
    { left: 1380, top: 280, color: TEAL, rot: '14deg', size: 20 },
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
            animation: live ? `cpj7-confetti ${2.4 + idx * 0.3}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={124} size={62}>
        <span style={{ ...row, justifyContent: 'center', gap: 14 }}>
          <span>
            Hebat! Kamu <Highlight>Penjelajah Pintar!</Highlight>
          </span>
          <JuniorIcon name="party" size={54} />
        </span>
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard left={240} top={245} width={1140} height={675} headerLabel="lencana-explorer-7.app" padding={36}>
        <div
          style={{
            height: '100%',
            ...centerCol,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          {/* Large Gold Medal with Labyrinth Map & Star Arrow */}
          <svg
            width={270}
            height={270}
            viewBox="0 0 240 240"
            fill="none"
            style={{ animation: live ? 'cpj7-float 3s ease-in-out infinite' : undefined }}
          >
            {/* Ribbon */}
            <path d="M74 16 L104 94 H136 L166 16 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
            <path d="M94 16 L120 88 L146 16" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            {/* Gold Medal */}
            <circle cx="120" cy="140" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={6} />
            <circle cx="120" cy="140" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={4} />
            {/* Inner Mini Maze Path & Star Arrow */}
            <rect x="86" y="106" width="68" height="68" rx="12" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
            <path
              d="M100 156 H122 V132 H142"
              stroke={TEAL}
              strokeWidth={7}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="100" cy="156" r="6" fill={SKY} stroke={CHARCOAL} strokeWidth={2} />
            <path
              d="M142 122 L145 129 L152 130 L147 135 L148 142 L142 138 L136 142 L137 135 L132 130 L139 129 Z"
              fill={SUNNY}
              stroke={CHARCOAL}
              strokeWidth={2}
            />
          </svg>

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
            <span>Lencana Penjelajah Labirin Digital</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 31,
              fontWeight: 700,
              lineHeight: 1.38,
              maxWidth: 880,
              color: CHARCOAL,
            }}
          >
            Kamu sudah jago menyusun{' '}
            <Highlight color="#D1FAE5">Rute Maju &amp; Berbelok</Highlight> menghindari rintangan!
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko Celebrating on Right */}
      <div style={{ ...abs(1410, 410, 420, 490), ...centerCol }}>
        <BikoMascot
          pose="jump"
          width={380}
          badgeIcon={<JuniorIcon name="compass" size={30} />}
          speechBubble="Misi Selesai!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// Speaker Notes (Talk Track for Mentors teaching Ages 5–7)
// ============================================================================
export const notes: (string | undefined)[] = [
  `Halo Penjelajah Cilik! Di Pertemuan 7 hari ini, Biko memakai topi penjelajah dan membawa peta labirin digital!
Kita akan belajar membaca rintangan dan menyusun rute pintar maju & berbelok!`,

  `Ada dua misi kita hari ini:
1. Mengenali rintangan seperti batu atau semak di jalur peta.
2. Menyusun rute pintar maju dan berbelok menuju bendera finis!`,

  `Rahasia Penjelajah #1: Awas Ada Rintangan!
Kalau di depan ada batu besar atau semak berduri, jangan ditabrak ya! Ayo belok dan cari kotak kosong yang aman.`,

  `Bagaimana Jurus Rute Pintar?
1. Lihat di mana rintangannya. 2. Belok ke kotak yang kosong. 3. Maju terus sampai bendera Finis!`,

  `Latihan Rute #1: Di depan Biko ada batu besar!
Supaya tidak menabrak, Biko harus naik 1 kotak lalu maju ke kanan 2 kotak: [ ⬆️ ] + [ ➡️ ] + [ ➡️ ]!`,

  `Permainan Cepat! Lihat peta di layar:
Di depan Biko ada batu, di bawah ada kaktus berduri, dan di atas ada jalan kosong. Ayo pilih: Belok Atas atau Belok Bawah?`,

  `Latihan Rute #2: Tantangan Rute Zig-Zag!
Ada semak berduri di atas dan batu di kanan. Biko bisa jalan seperti tangga: 1️⃣ Kanan (➡️), 2️⃣ Atas (⬆️), 3️⃣ Kanan (➡️) sampai Finis!`,

  `Tips Jagoan Labirin Digital:
BOLEH cek jalur dulu sebelum jalan dan belok ke kotak kosong.
JANGAN menabrak batu atau terburu-buru menyusun blok panah!`,

  `Ayo main Game Labirin Digital!
Amati letak semak & batu, rangkai 4 blok panah (petunjuk jalur tangga: ➡️ ⬆️ ➡️ ⬆️), lalu tekan tombol hijau Jalan!`,

  `Selamat untuk semua Penjelajah Pintar!
Kamu resmi meraih Lencana Penjelajah Labirin Digital karena sudah jago menghindari rintangan!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 7 — Awas Ada Rintangan!',
  createdAt: '2026-11-13T17:25:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03Rahasia,
  Slide04Jurus,
  Slide05Latihan1,
  Slide06AyoTebak,
  Slide07Latihan2,
  Slide08Tips,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

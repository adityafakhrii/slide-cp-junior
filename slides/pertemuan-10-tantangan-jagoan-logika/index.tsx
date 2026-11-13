import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-10-tantangan-jagoan-logika';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj10-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj10-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-12px) scale(1.04); }
}
@keyframes cpj10-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj10-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj10-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj10-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj10-card-btn:hover {
  transform: translateY(-4px);
}
.cpj10-card-btn:active {
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
  accentDot = SUNNY,
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
          animation: live ? 'cpj10-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 10 • Tantangan Jagoan Logika!</span>
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
// Pertemuan 10 Visual Assets: Trophy, Island Palm, Cactus, Rock, Chest, Blocks
// ============================================================================
type Dir = 'up' | 'down' | 'left' | 'right';

const DIR_META: Record<Dir, { label: string; color: string; rot: number }> = {
  up: { label: 'Atas', color: TEAL, rot: -90 },
  down: { label: 'Bawah', color: CORAL, rot: 90 },
  left: { label: 'Kiri', color: SUNNY, rot: 180 },
  right: { label: 'Kanan', color: SKY, rot: 0 },
};

const HeroArrowBlock = ({
  dir,
  size = 80,
  stepNum,
  active = false,
  showRightTab = false,
  onClick,
}: {
  dir: Dir;
  size?: number;
  stepNum?: number;
  active?: boolean;
  showRightTab?: boolean;
  onClick?: () => void;
}) => {
  const m = DIR_META[dir];
  return (
    <button
      type="button"
      onClick={onClick}
      className={onClick ? 'cpj10-card-btn' : undefined}
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.24),
        background: m.color,
        border: `3px solid ${CHARCOAL}`,
        boxShadow: active
          ? `0 0 0 6px ${SUNNY}, 0 6px 0 ${CHARCOAL}`
          : `0 6px 0 ${CHARCOAL}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        cursor: onClick ? 'pointer' : 'default',
        flexShrink: 0,
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
            background: m.color,
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

const RepeatHugBlock = ({
  count,
  dir = 'right',
  scale = 1,
  showRightTab = false,
}: {
  count: number;
  dir?: Dir;
  scale?: number;
  showRightTab?: boolean;
}) => {
  const w = Math.round(215 * scale);
  return (
    <div
      style={{
        position: 'relative',
        width: w,
        padding: `${Math.round(12 * scale)}px ${Math.round(14 * scale)}px`,
        borderRadius: Math.round(22 * scale),
        background: 'linear-gradient(135deg, #FBBF24 0%, #FB923C 100%)',
        border: `3.5px solid ${CHARCOAL}`,
        boxShadow: `0 ${Math.round(6 * scale)}px 0 ${CHARCOAL}`,
        display: 'flex',
        flexDirection: 'column',
        gap: Math.round(8 * scale),
        flexShrink: 0,
      }}
    >
      {showRightTab && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            right: -13,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 18,
            height: 34,
            borderRadius: '0 12px 12px 0',
            background: ORANGE,
            border: `3.5px solid ${CHARCOAL}`,
            borderLeft: 'none',
            zIndex: 2,
          }}
        />
      )}
      <div style={{ ...row, justifyContent: 'space-between', gap: 6 }}>
        <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: Math.round(21 * scale), fontWeight: 700 }}>
          🔁 Ulangi
        </span>
        <span
          style={{
            padding: '2px 12px',
            borderRadius: Math.round(10 * scale),
            background: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(22 * scale),
            fontWeight: 700,
          }}
        >
          {count}
        </span>
      </div>
      <div
        style={{
          marginLeft: Math.round(16 * scale),
          padding: Math.round(8 * scale),
          borderRadius: Math.round(16 * scale),
          background: WHITE,
          border: `2.5px dashed ${CHARCOAL}`,
          ...centerCol,
        }}
      >
        <HeroArrowBlock dir={dir} size={Math.round(62 * scale)} />
      </div>
      <div
        style={{
          height: Math.round(10 * scale),
          borderRadius: 99,
          background: 'rgba(255,255,255,0.45)',
          border: `2px solid ${CHARCOAL}`,
        }}
      />
    </div>
  );
};

const BikoHeroToken = ({ size = 64, style }: { size?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
    {/* Mini red hero cape */}
    <path d="M18 46 L8 70 L72 70 L62 46 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
    <circle cx="20" cy="28" r="9" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.2} />
    <circle cx="60" cy="28" r="9" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.2} />
    <circle cx="40" cy="44" r="24" fill="#F59E0B" stroke={CHARCOAL} strokeWidth={3.4} />
    <ellipse cx="40" cy="49" rx="17" ry="14" fill="#FEF3C7" />
    <circle cx="32" cy="43" r="3.4" fill={CHARCOAL} />
    <circle cx="48" cy="43" r="3.4" fill={CHARCOAL} />
    <circle cx="33" cy="41.8" r="1.1" fill={WHITE} />
    <circle cx="49" cy="41.8" r="1.1" fill={WHITE} />
    <ellipse cx="40" cy="49" rx="4.5" ry="3.2" fill={CHARCOAL} />
    <path d="M34 54.5 Q40 60 46 54.5" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" />
  </svg>
);

const TrophySvg = ({ size = 68 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M22 20 H10 C10 36, 18 42, 24 42" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
    <path d="M58 20 H70 C70 36, 62 42, 56 42" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
    <path
      d="M22 14 H58 V34 C58 48, 49 54, 40 54 C31 54, 22 48, 22 34 Z"
      fill={SUNNY}
      stroke={CHARCOAL}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />
    <rect x="35" y="54" width="10" height="10" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
    <rect x="24" y="64" width="32" height="8" rx="4" fill="#B45309" stroke={CHARCOAL} strokeWidth={3} />
    <path
      d="M40 23 L42.5 29 L49 29.5 L44 33.5 L45.5 40 L40 36.5 L34.5 40 L36 33.5 L31 29.5 L37.5 29 Z"
      fill={WHITE}
      stroke={CHARCOAL}
      strokeWidth={2}
    />
  </svg>
);

const PalmTreeSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="68" rx="22" ry="5" fill="#FDE68A" />
    <path d="M37 66 Q38 44 43 28 L49 30 Q44 46 44 66 Z" fill="#B45309" stroke={CHARCOAL} strokeWidth={3} />
    <path d="M44 28 C28 18, 16 24, 14 34 C24 30, 34 30, 44 28 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
    <path d="M44 28 C58 16, 68 22, 68 34 C58 30, 50 30, 44 28 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
    <path d="M44 28 C34 10, 48 8, 52 24 Z" fill="#22C55E" stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
  </svg>
);

const StarSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M40 10 L48 30 L70 32 L53 46 L58 68 L40 56 L22 68 L27 46 L10 32 L32 30 Z"
      fill={SUNNY}
      stroke={CHARCOAL}
      strokeWidth={3.8}
      strokeLinejoin="round"
    />
  </svg>
);

const RockSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="66" rx="28" ry="6.5" fill="#D6CEC2" />
    <path d="M14 60 L18 34 L34 20 L56 24 L67 44 L64 60 Z" fill="#94A3B8" stroke={CHARCOAL} strokeWidth={3.6} strokeLinejoin="round" />
    <path d="M20 56 L24 38 L36 27 L48 29 L40 44 L36 56 Z" fill="#CBD5E1" />
  </svg>
);

const CactusSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="67" rx="22" ry="5.5" fill="#FDE68A" />
    <path d="M33 65 V22 C33 16, 47 16, 47 22 V65 Z" fill="#22C55E" stroke={CHARCOAL} strokeWidth={3.4} />
    <path d="M33 44 H22 C18 44, 18 30, 22 30 C26 30, 26 37, 26 37 H33" fill="#22C55E" stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
    <path d="M47 40 H58 C62 40, 62 26, 58 26 C54 26, 54 33, 54 33 H47" fill="#22C55E" stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
  </svg>
);

const ChestSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="67" rx="26" ry="5.5" fill="#FDE68A" />
    <rect x="14" y="34" width="52" height="30" rx="8" fill="#B45309" stroke={CHARCOAL} strokeWidth={3.4} />
    <path d="M14 36 C14 20, 66 20, 66 36 Z" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.4} />
    <rect x="24" y="24" width="8" height="40" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.4} />
    <rect x="48" y="24" width="8" height="40" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.4} />
    <rect x="34" y="36" width="12" height="14" rx="4" fill={SKY} stroke={CHARCOAL} strokeWidth={2.6} />
  </svg>
);

// ============================================================================
// SLIDE 01 — Cover (Superhero Shield Frame + Cape Biko + Mini Laptop & Trophy)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 10" accentDot={SUNNY}>
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
            background: SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#92400E',
            marginBottom: 24,
          }}
        >
          <span>🏆</span>
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          Tantangan
          <br />
          <Highlight>Jagoan Logika!</Highlight>
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
          Misi Petualangan Urutan &amp; Arah di Laptop
        </p>

        {/* Quick Pill Highlights */}
        <div style={{ ...row, gap: 18 }}>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: CORAL,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 27,
              fontWeight: 700,
            }}
          >
            <span>🦸</span>
            <span>Jagoan Mandiri</span>
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
            <span>💻</span>
            <span>Misi Akhir Level!</span>
          </div>
        </div>
      </div>

      {/* Right Visual Showcase: Superhero Shield Backdrop (Distinct from Pertemuan 1-9) */}
      <div style={{ ...abs(1000, 165, 820, 785), ...centerCol }}>
        {/* Shield Crest Backdrop */}
        <div
          style={{
            position: 'absolute',
            width: 650,
            height: 640,
            borderRadius: '44px 44px 270px 270px',
            background: 'linear-gradient(160deg, #EFF6FF 0%, #FEF9C3 55%, #FEF2F2 100%)',
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${CORAL}`,
            overflow: 'hidden',
          }}
        >
          {/* Starburst crest lines */}
          <svg width="100%" height="100%" viewBox="0 0 650 640" fill="none" style={{ opacity: 0.25 }}>
            <circle cx="325" cy="300" r="215" stroke={SUNNY} strokeWidth={6} strokeDasharray="18 14" />
            <circle cx="325" cy="300" r="145" stroke={SKY} strokeWidth={4} />
          </svg>
        </div>

        {/* Mini Laptop displaying Map, Blocks & Star Trophy */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 44,
            width: 390,
            padding: '14px 18px',
            borderRadius: 22,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            zIndex: 4,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700, color: MUTED }}>
              💻 Peta Petualangan
            </span>
            <TrophySvg size={38} />
          </div>
          <div style={{ ...row, justifyContent: 'center', gap: 10 }}>
            <HeroArrowBlock dir="right" size={56} showRightTab />
            <HeroArrowBlock dir="up" size={56} showRightTab />
            <HeroArrowBlock dir="right" size={56} />
            <StarSvg size={50} />
          </div>
        </div>

        {/* Mini Red Superhero Cape behind Biko */}
        <svg
          width={310}
          height={230}
          viewBox="0 0 310 230"
          fill="none"
          style={{ position: 'absolute', top: 380, left: 265, zIndex: 2 }}
        >
          <path
            d="M80 20 L10 190 Q155 225 300 185 L230 20 Z"
            fill={CORAL}
            stroke={CHARCOAL}
            strokeWidth={5}
            strokeLinejoin="round"
          />
        </svg>

        <BikoMascot
          pose="explorer"
          width={395}
          style={{ position: 'relative', zIndex: 3, marginTop: 145, marginLeft: 120 }}
        />

        {/* Floating Trophy Pill */}
        <div
          style={{
            position: 'absolute',
            right: 18,
            bottom: 62,
            padding: '10px 18px',
            borderRadius: 22,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            ...row,
            gap: 10,
            zIndex: 5,
            animation: live ? 'cpj10-float 2.8s ease-in-out infinite' : undefined,
          }}
        >
          <TrophySvg size={44} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700, color: CHARCOAL }}>
            Misi Jagoan!
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

    <MacWindowCard left={X0} top={250} width={1280} height={675} headerLabel="daftar-misi-10.exe" padding={42}>
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
              gap: 12,
              padding: '18px 24px',
              borderRadius: 24,
              background: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
            }}
          >
            <HeroArrowBlock dir="right" size={62} />
            <span style={{ fontSize: 38 }}>🔁</span>
            <span style={{ fontSize: 38 }}>🧭</span>
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
            Gabungkan <Highlight color={STABILO}>Semua</Highlight>
            <br />
            <strong>Jurus Logika</strong>
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
              padding: '12px 24px',
              borderRadius: 24,
              background: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
            }}
          >
            <BikoMascot pose="laptop" width={120} />
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
            Selesaikan Misi
            <br />
            <Highlight color="#D1FAE5">Sendiri di Laptop!</Highlight>
          </div>
        </div>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="point-left"
      width={380}
      speechBubble="Siap jadi Jagoan Logika?"
      style={{ ...abs(1435, 315) }}
    />
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Bekal Petualangan: 4 Jurus Hebatmu! (Grid 2x2 + Biko di Tengah)
// ============================================================================
const Slide03BekalPetualangan: Page = () => {
  const [selected, setSelected] = useState<number>(0);

  const powers = [
    {
      title: '🧭 Arah (⬆️ ⬇️ ⬅️ ➡️)',
      desc: 'Menentukan arah langkah di peta',
      color: SKY,
      soft: SKY_SOFT,
      tip: 'Ingat arah Atas, Bawah, Kiri, dan Kanan!',
    },
    {
      title: '🔗 Urutan Rapi',
      desc: 'Merangkai blok langkah dari awal ke akhir',
      color: SUNNY,
      soft: SUNNY_SOFT,
      tip: 'Tempel blok berurutan tanpa ada yang terputus!',
    },
    {
      title: '🔁 Blok Ulangi Ringkas',
      desc: 'Memendekkan langkah lurus yang berulang',
      color: TEAL,
      soft: TEAL_SOFT,
      tip: 'Gunakan Blok Ulangi biar kodenya super pendek!',
    },
    {
      title: '🔍 Cek & Perbaiki (Debug)',
      desc: 'Cari blok yang salah lalu ganti dengan tepat',
      color: CORAL,
      soft: CORAL_SOFT,
      tip: 'Jangan panik kalau nyasar — perbaiki satu per satu!',
    },
  ];

  return (
    <JuniorFrame badge="BEKAL PETUALANGAN" accentDot={SUNNY}>
      <SlideTitle>
        Ingat <Highlight>4 Jurus</Highlight> Hebatmu!
      </SlideTitle>

      <MacWindowCard left={X0} top={245} width={1720} height={700} headerLabel="bekal-4-jurus.app" padding={34}>
        <div
          style={{
            position: 'relative',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '28px 340px',
          }}
        >
          {powers.map((p, idx) => (
            <button
              key={p.title}
              type="button"
              className="cpj10-card-btn"
              onClick={() => setSelected(idx)}
              style={{
                borderRadius: 26,
                background: p.soft,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: selected === idx ? `0 0 0 6px ${SUNNY}, 0 7px 0 ${CHARCOAL}` : `0 7px 0 ${p.color}`,
                padding: '26px 30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'left',
                gap: 10,
              }}
            >
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
                {p.title}
              </div>
              <div style={{ fontSize: 23, fontWeight: 700, color: MUTED, lineHeight: 1.35 }}>{p.desc}</div>
            </button>
          ))}

          {/* Biko standing proudly in Center Intersection */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 4,
              ...centerCol,
            }}
          >
            <BikoMascot
              pose="thumbs-up"
              width={290}
              speechBubble={powers[selected].tip}
            />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus Jagoan Mandiri di Laptop (3 Langkah Berurutan)
// ============================================================================
const Slide04JurusMandiri: Page = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      num: '1',
      title: 'Lihat Peta',
      desc: 'Cari jalan aman & hindari rintangan',
      icon: '👀',
      color: SKY,
      soft: SKY_SOFT,
    },
    {
      num: '2',
      title: 'Susun Blok',
      desc: 'Rangkai blok arah & ulangi pelan-pelan',
      icon: '🧩',
      color: SUNNY,
      soft: SUNNY_SOFT,
    },
    {
      num: '3',
      title: 'Tekan Jalan',
      desc: 'Cek hasilnya sampai karakter tiba di Finis!',
      icon: '▶️',
      color: TEAL,
      soft: TEAL_SOFT,
    },
  ];

  return (
    <JuniorFrame badge="JURUS MANDIRI" accentDot={TEAL}>
      <SlideTitle>
        Cara Main <Highlight>Sendiri</Highlight> di Laptop!
      </SlideTitle>

      <MacWindowCard left={X0} top={245} width={1720} height={700} headerLabel="jurus-mandiri.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* 3 Step Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {steps.map((s, idx) => (
              <button
                key={s.num}
                type="button"
                className="cpj10-card-btn"
                onClick={() => setStep(idx)}
                style={{
                  borderRadius: 26,
                  background: s.soft,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: step === idx ? `0 0 0 6px ${SUNNY}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${s.color}`,
                  padding: '24px 26px',
                  ...centerCol,
                  gap: 14,
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    padding: '6px 20px',
                    borderRadius: 99,
                    background: s.color,
                    color: s.color === SUNNY ? CHARCOAL : WHITE,
                    border: `2.5px solid ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 22,
                    fontWeight: 700,
                  }}
                >
                  LANGKAH {s.num}
                </span>
                <div style={{ fontSize: 56 }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700 }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: MUTED, lineHeight: 1.35 }}>{s.desc}</div>
              </button>
            ))}
          </div>

          {/* Bottom Desk Strip: Biko Sitting Calmly Focused at Laptop */}
          <div
            style={{
              ...row,
              justifyContent: 'space-between',
              padding: '12px 32px',
              borderRadius: 24,
              background: '#F8FAFC',
              border: `3px solid ${CHARCOAL}`,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
                💻 Duduk Tegak, Tenang &amp; Fokus Menggerakkan Mouse!
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: MUTED }}>
                Ikuti 3 langkah di atas satu per satu — pasti berhasil!
              </div>
            </div>
            <BikoMascot pose="laptop" width={185} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Pemanasan #1: Bantu Biko ke Pulau Bintang! (4x3 + Blok Ulangi)
// ============================================================================
const Slide05Pemanasan1: Page = () => {
  const [step, setStep] = useState(0); // 0:(1,0) -> 1:(1,1) -> 2:(1,2) -> 3:(1,3) -> 4:(0,3)
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
        if (s < 4) tick(s + 1);
      }, 420);
    };
    tick(1);
  };

  const coords: [number, number][] = [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [0, 3],
  ];
  const [br, bc] = coords[step];

  return (
    <JuniorFrame badge="PEMANASAN #1" accentDot={SUNNY}>
      <SlideTitle>
        Bantu Biko ke <Highlight>Pulau Bintang!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Grid Card: 4x3 Island Map with Palm Trees */}
      <MacWindowCard left={X0} top={250} width={920} height={680} headerLabel="pulau-bintang-4x3.app" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
              Peta Pulau Kotak 4×3:
            </span>
            <button
              type="button"
              className="cpj10-card-btn"
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
              }}
            >
              ▶️ Jalan ke Pulau Bintang!
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 160px)',
              gridTemplateRows: 'repeat(3, 130px)',
              gap: 12,
              justifyContent: 'center',
              alignContent: 'center',
              background: '#EFF6FF',
              padding: 20,
              borderRadius: 24,
              border: `3px solid ${CHARCOAL}`,
            }}
          >
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3].map((c) => {
                const isBikoHere = br === r && bc === c;
                const isStar = r === 0 && c === 3;
                const isPalm = (r === 0 && c === 1) || (r === 2 && c === 2);
                const isPath = r === 1 || isStar;

                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      borderRadius: 18,
                      background: isStar ? SUNNY_SOFT : isPath ? TEAL_SOFT : '#FEF3C7',
                      border: isPath ? `3px dashed ${TEAL}` : `2.5px solid ${CHARCOAL}`,
                      ...centerCol,
                      position: 'relative',
                    }}
                  >
                    {isPalm && <PalmTreeSvg size={82} />}
                    {isStar && !isBikoHere && <StarSvg size={78} />}
                    {isBikoHere && (
                      <div style={{ ...centerCol }}>
                        <BikoHeroToken size={88} />
                        {step === 4 && (
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
                            ⭐ DAPAT!
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
              textAlign: 'center',
              fontFamily: 'var(--osd-font-display)',
              fontSize: 23,
              fontWeight: 700,
              color: step === 4 ? '#047857' : MUTED,
            }}
          >
            {step === 0 && 'Hindari pohon kelapa! Jalan 3 kotak ke kanan lalu naik 1 kotak!'}
            {step >= 1 && step <= 3 && `🔁 Blok Ulangi: Jalan Kanan ke-${step} dari 3!`}
            {step === 4 && '🎉 Belok Atas (⬆️) -> Sampai di Pulau Bintang!'}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card: Block Combination */}
      <MacWindowCard left={1055} top={250} width={765} height={680} headerLabel="kode-pulau-bintang.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                padding: '20px 24px',
                borderRadius: 20,
                background: SKY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              🏝️ Jalan lurus <strong>3 Kotak</strong> ke kanan
            </div>
            <div
              style={{
                padding: '20px 24px',
                borderRadius: 20,
                background: TEAL_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              ⬆️ Belok <strong>1 Kotak</strong> ke atas → <strong>Bintang!</strong>
            </div>
          </div>

          <div
            style={{
              padding: '26px',
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
              gap: 18,
            }}
          >
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
              Rangkaian Kode Ringkas:
            </div>
            <div style={{ ...row, gap: 16 }}>
              <RepeatHugBlock count={3} dir="right" scale={0.96} showRightTab />
              <HeroArrowBlock dir="up" size={96} active={step === 4} />
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Kode Mana yang Sampai ke Bintang?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [choice, setChoice] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle align="center" top={122}>
        Kode Mana yang <Highlight>Sampai ke Bintang?</Highlight>
      </SlideTitle>

      {/* Top Interactive Map (3x3): Biko at (1,0), Rock at (1,1), Star at (0,2) */}
      <MacWindowCard left={240} top={215} width={1440} height={310} headerLabel="tebak-kode-bintang.app" padding={20}>
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
                const isBikoStart = r === 1 && c === 0 && choice !== 'B';
                const isRock = r === 1 && c === 1;
                const isStar = r === 0 && c === 2;
                const isSafeUp = r === 0 && c === 0;
                const isSafeMid = r === 0 && c === 1;

                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      borderRadius: 12,
                      background: isRock
                        ? CORAL_SOFT
                        : isStar
                          ? SUNNY_SOFT
                          : choice === 'B' && (isSafeUp || isSafeMid)
                            ? TEAL_SOFT
                            : r === 1 && c === 0
                              ? SKY_SOFT
                              : WHITE,
                      border: `2.5px solid ${CHARCOAL}`,
                      ...centerCol,
                    }}
                  >
                    {isBikoStart && <BikoHeroToken size={48} />}
                    {isRock && <RockSvg size={50} />}
                    {isStar && choice !== 'B' && <StarSvg size={48} />}
                    {isStar && choice === 'B' && <BikoHeroToken size={48} />}
                    {choice === 'B' && (isSafeUp || isSafeMid) && (
                      <span style={{ fontSize: 22, fontWeight: 800, color: '#047857' }}>
                        {isSafeUp ? '⬆️ ➡️' : '➡️'}
                      </span>
                    )}
                  </div>
                );
              }),
            )}
          </div>

          <div style={{ maxWidth: 540, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
              Awas ada Batu tepat di sebelah Biko!
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: MUTED, lineHeight: 1.4 }}>
              Harus jalan ke mana dulu supaya tidak menabrak batu lalu sampai di ⭐ Bintang?
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Bottom 2 Large Interactive Choice Cards + Biko Question */}
      <button
        type="button"
        className="cpj10-card-btn"
        onClick={() => setChoice('A')}
        style={{
          ...abs(140, 560, 595, 290),
          borderRadius: 28,
          background: choice === 'A' ? CORAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 'A' ? `0 0 0 6px ${CORAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${CORAL}`,
          padding: 24,
          ...centerCol,
          gap: 18,
          animation: choice === 'A' ? 'cpj10-shake 0.35s ease' : undefined,
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
          PILIHAN A
        </span>
        <div style={{ ...row, gap: 14 }}>
          <HeroArrowBlock dir="right" size={82} showRightTab />
          <HeroArrowBlock dir="right" size={82} showRightTab />
          <HeroArrowBlock dir="up" size={82} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700, color: CHARCOAL }}>
          {choice === 'A' ? '💥 Nabrak batu di kanan!' : 'Kanan → Kanan → Atas'}
        </div>
      </button>

      <div style={{ ...abs(760, 540, 400, 355), ...centerCol }}>
        <BikoMascot
          pose={choice === 'B' ? 'thumbs-up' : 'question'}
          width={240}
          speechBubble={
            choice === 'B'
              ? 'Yeay! Naik dulu lalu belok!'
              : choice === 'A'
                ? 'Aduh, nabrak batu 🪨!'
                : 'Pilih kode yang benar!'
          }
        />
      </div>

      <button
        type="button"
        className="cpj10-card-btn"
        onClick={() => setChoice('B')}
        style={{
          ...abs(1185, 560, 595, 290),
          borderRadius: 28,
          background: choice === 'B' ? TEAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 'B' ? `0 0 0 6px ${TEAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${TEAL}`,
          padding: 24,
          ...centerCol,
          gap: 18,
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
          PILIHAN B
        </span>
        <div style={{ ...row, gap: 14 }}>
          <HeroArrowBlock dir="up" size={82} showRightTab />
          <HeroArrowBlock dir="right" size={82} showRightTab />
          <HeroArrowBlock dir="right" size={82} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700, color: CHARCOAL }}>
          {choice === 'B' ? '✅ Naik dulu lalu belok kanan!' : 'Atas → Kanan → Kanan'}
        </div>
      </button>

      <div style={{ ...abs(440, 915, 1040, 56), ...centerCol }}>
        <div
          style={{
            padding: '10px 30px',
            borderRadius: 99,
            background: choice === 'B' ? TEAL_SOFT : SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 25,
            fontWeight: 700,
          }}
        >
          {choice === 'B'
            ? '🎉 Hebat! Naik ke atas (⬆️) dulu menghindari batu, lalu 2× kanan (➡️ ➡️)!'
            : '👆 Tunjuk kode yang benar di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Pemanasan #2: Lembah Rintangan (4x4 Adventure Map + Strategy)
// ============================================================================
const Slide07Pemanasan2: Page = () => {
  const [step, setStep] = useState(0); // 0..6
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const coords: [number, number][] = [
    [3, 0],
    [3, 1],
    [2, 1],
    [2, 2],
    [2, 3],
    [1, 3],
    [0, 3],
  ];

  const replay = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStep(0);
    const tick = (s: number) => {
      timerRef.current = window.setTimeout(() => {
        setStep(s);
        if (s < coords.length - 1) tick(s + 1);
      }, 360);
    };
    tick(1);
  };

  const [br, bc] = coords[step];

  return (
    <JuniorFrame badge="PEMANASAN #2" accentDot={ORANGE}>
      <SlideTitle>
        Lewati <Highlight>Lembah Rintangan!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Colorful 4x4 Adventure Map */}
      <MacWindowCard left={X0} top={250} width={920} height={680} headerLabel="lembah-rintangan-4x4.app" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
              Peta Petualangan 4×4:
            </span>
            <button
              type="button"
              className="cpj10-card-btn"
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
              }}
            >
              ▶️ Ikuti Jejak Aman!
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 150px)',
              gridTemplateRows: 'repeat(4, 102px)',
              gap: 10,
              justifyContent: 'center',
              alignContent: 'center',
              background: '#FFF7ED',
              padding: 18,
              borderRadius: 24,
              border: `3px solid ${CHARCOAL}`,
            }}
          >
            {[0, 1, 2, 3].map((r) =>
              [0, 1, 2, 3].map((c) => {
                const isBikoHere = br === r && bc === c;
                const isChest = r === 0 && c === 3;
                const isRock = (r === 2 && c === 0) || (r === 1 && c === 1) || (r === 3 && c === 2);
                const isCactus = (r === 0 && c === 2) || (r === 3 && c === 3) || (r === 1 && c === 0);
                const isPath = coords.some(([pr, pc]) => pr === r && pc === c);

                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      borderRadius: 16,
                      background: isChest
                        ? SUNNY_SOFT
                        : isRock || isCactus
                          ? CORAL_SOFT
                          : isPath
                            ? TEAL_SOFT
                            : WHITE,
                      border: isPath ? `2.5px dashed ${TEAL}` : `2.5px solid ${CHARCOAL}`,
                      ...centerCol,
                    }}
                  >
                    {isRock && <RockSvg size={64} />}
                    {isCactus && <CactusSvg size={64} />}
                    {isChest && !isBikoHere && <ChestSvg size={68} />}
                    {isPath && !isBikoHere && !isChest && !(r === 3 && c === 0) && (
                      <span style={{ fontSize: 22 }}>⭐</span>
                    )}
                    {isBikoHere && <BikoHeroToken size={72} />}
                  </div>
                );
              }),
            )}
          </div>

          <div
            style={{
              textAlign: 'center',
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
              color: step === coords.length - 1 ? '#047857' : MUTED,
            }}
          >
            {step === coords.length - 1
              ? '💎 Hebat! Biko melewati batu & kaktus menuju Peti Harta Karun!'
              : 'Ikuti jejak bintang aman menuju Peti Harta Karun di kanan atas!'}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card: Strategy & Pointing Biko */}
      <MacWindowCard left={1055} top={250} width={765} height={680} headerLabel="strategi-lembah.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                padding: '22px 26px',
                borderRadius: 22,
                background: CORAL_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              🌵 Awas ada <strong>Batu &amp; Kaktus!</strong>
            </div>

            <div
              style={{
                padding: '22px 26px',
                borderRadius: 22,
                background: TEAL_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              🧩 Gabung <strong>Belok &amp; Blok Ulangi!</strong>
            </div>

            <div
              style={{
                padding: '18px 24px',
                borderRadius: 22,
                background: SUNNY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <HeroArrowBlock dir="right" size={68} showRightTab />
              <HeroArrowBlock dir="up" size={68} showRightTab />
              <RepeatHugBlock count={2} dir="right" scale={0.72} showRightTab />
              <RepeatHugBlock count={2} dir="up" scale={0.72} />
            </div>
          </div>

          <div style={{ ...row, justifyContent: 'center' }}>
            <BikoMascot
              pose="point-left"
              width={215}
              speechBubble="Ikuti jejak bintangnya ya!"
            />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Aturan Main Jagoan Mandiri (Boleh vs Jangan)
// ============================================================================
const Slide08AturanMain: Page = () => (
  <JuniorFrame badge="ATURAN JAGOAN" accentDot={TEAL}>
    <SlideTitle>
      Aku Bisa <Highlight>Coba Sendiri!</Highlight>
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
            <span>✅</span>
            <span>BOLEH</span>
          </div>
          <span style={{ fontSize: 44 }}>💪</span>
        </div>

        <div
          style={{
            borderRadius: 24,
            background: TEAL_SOFT,
            border: `3px solid ${CHARCOAL}`,
            padding: '16px 24px',
            ...centerCol,
          }}
        >
          <BikoMascot pose="laptop" width={175} />
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
            }}
          >
            🧠 <strong>Pikir &amp; Coba</strong> sendiri dulu
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
            }}
          >
            🔄 <strong>Perbaiki</strong> kalau masih salah
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
            <span>❌</span>
            <span>JANGAN</span>
          </div>
          <span style={{ fontSize: 44 }}>🌧️</span>
        </div>

        {/* Giving-up Cloud with Red Cross */}
        <div
          style={{
            borderRadius: 24,
            background: CORAL_SOFT,
            border: `3px solid ${CHARCOAL}`,
            padding: '22px 24px',
            ...centerCol,
          }}
        >
          <svg width={210} height={155} viewBox="0 0 210 155" fill="none">
            <path
              d="M44 114 C22 114, 14 90, 32 76 C28 50, 56 34, 80 48 C94 26, 134 28, 144 54 C172 52, 188 76, 174 98 C180 112, 162 116, 148 114 Z"
              fill="#CBD5E1"
              stroke={CHARCOAL}
              strokeWidth={4.5}
              strokeLinejoin="round"
            />
            <circle cx="84" cy="76" r="4.5" fill={CHARCOAL} />
            <circle cx="118" cy="76" r="4.5" fill={CHARCOAL} />
            <path d="M84 96 Q101 84 118 96" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
            <circle cx="164" cy="40" r="22" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.5} />
            <path d="M155 31 L173 49 M173 31 L155 49" stroke={WHITE} strokeWidth={4.5} strokeLinecap="round" />
          </svg>
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
            }}
          >
            🙋 <strong>Langsung Minta</strong> dibuatkan
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
            }}
          >
            😢 <strong>Menyerah</strong> saat karakter nyasar
          </div>
        </div>
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Tantangan Utama: Petualangan Mandiri di Laptop!
// ============================================================================
const Slide09TantanganUtama: Page = () => {
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);

  const levels = [
    {
      num: 1 as const,
      title: 'Level 1',
      subtitle: 'Jejak Lurus & Belok',
      color: SKY,
      soft: SKY_SOFT,
      blocks: '➡️ ➡️ ⬆️',
      hint: 'Level 1: Susun urutan langkah dasar menghindari batu!',
    },
    {
      num: 2 as const,
      title: 'Level 2',
      subtitle: 'Detektif Bug & Labirin',
      color: SUNNY,
      soft: SUNNY_SOFT,
      blocks: '🔍 🗑️ ➡️ ⬆️',
      hint: 'Level 2: Temukan blok salah dan belok melewati rintangan!',
    },
    {
      num: 3 as const,
      title: 'Level 3',
      subtitle: 'Jurus Blok Ulangi!',
      color: TEAL,
      soft: TEAL_SOFT,
      blocks: '🔁 4× ➡️ + ⬆️',
      hint: 'Level 3: Gabungkan Blok Ulangi dan panah belok sampai Finis!',
    },
  ];

  const stepCards = [
    { num: '1', label: 'Buka misi petualangan di laptop', color: SKY, soft: SKY_SOFT },
    { num: '2', label: 'Susun blok arah & ulangi sendiri', color: SUNNY, soft: SUNNY_SOFT },
    { num: '3', label: 'Taklukkan semua level sampai Finis!', color: TEAL, soft: TEAL_SOFT },
  ];

  return (
    <JuniorFrame badge="TANTANGAN UTAMA!" accentDot={TEAL}>
      <SlideTitle top={120}>
        Waktunya <Highlight>Petualangan Mandiri!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr Step Blocks */}
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
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                {sc.label}
              </span>
            </div>
            {idx < 2 && <span style={{ fontSize: 32, fontWeight: 800, color: CHARCOAL }}>➜</span>}
          </Fragment>
        ))}
      </div>

      {/* Bottom Interactive Laptop Stage Card + Cheering Biko */}
      <MacWindowCard left={X0} top={322} width={1320} height={635} headerLabel="misi-mandiri-laptop.app" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
              💻 Pilih &amp; Lihat 3 Tahap Tantangan di Laptopmu:
            </span>
            <span
              style={{
                padding: '8px 18px',
                borderRadius: 99,
                background: SUNNY_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 21,
                fontWeight: 700,
              }}
            >
              Total: 9 ⭐ Bintang!
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
            {levels.map((lv) => {
              const active = activeLevel === lv.num;
              return (
                <button
                  key={lv.num}
                  type="button"
                  className="cpj10-card-btn"
                  onClick={() => setActiveLevel(lv.num)}
                  style={{
                    borderRadius: 26,
                    background: lv.soft,
                    border: `3.5px solid ${CHARCOAL}`,
                    boxShadow: active ? `0 0 0 6px ${SUNNY}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${lv.color}`,
                    padding: '26px 22px',
                    ...centerCol,
                    gap: 16,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      padding: '6px 20px',
                      borderRadius: 99,
                      background: lv.color,
                      color: lv.color === SUNNY ? CHARCOAL : WHITE,
                      border: `2.5px solid ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 24,
                      fontWeight: 700,
                    }}
                  >
                    {lv.title}
                  </div>
                  <div style={{ fontSize: 40 }}>⭐⭐⭐</div>
                  <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
                    {lv.subtitle}
                  </div>
                  <div
                    style={{
                      padding: '10px 18px',
                      borderRadius: 16,
                      background: WHITE,
                      border: `2.5px solid ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {lv.blocks}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            style={{
              padding: '16px 26px',
              borderRadius: 20,
              background: TEAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 25,
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            🏁 {levels[activeLevel - 1].hint}
          </div>
        </div>
      </MacWindowCard>

      {/* Biko Waving Finish Flag */}
      <BikoMascot
        pose="wave"
        width={340}
        badgeEmoji="🏁"
        speechBubble="Semangat Jagoan!"
        style={{ ...abs(1475, 430) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 10 (Celebration Center Card)
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
            animation: live ? `cpj10-confetti ${2.4 + idx * 0.3}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={124} size={60}>
        Luar Biasa! Kamu <Highlight>Jagoan Logika!</Highlight> 🏆
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard left={240} top={245} width={1140} height={675} headerLabel="lencana-jagoan-10.app" padding={34}>
        <div
          style={{
            height: '100%',
            ...centerCol,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          {/* Large Trophy + Medal Emblem with Compass Star & Mini Laptop */}
          <div style={{ ...row, gap: 36, animation: live ? 'cpj10-float 3s ease-in-out infinite' : undefined }}>
            <TrophySvg size={215} />
            <svg width={240} height={240} viewBox="0 0 240 240" fill="none">
              <path d="M74 16 L104 94 H136 L166 16 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
              <path d="M94 16 L120 88 L146 16" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="140" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={6} />
              <circle cx="120" cy="140" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={4} />
              {/* Mini Laptop + Star Compass inside Medal */}
              <rect x="82" y="108" width="76" height="50" rx="10" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={3.8} />
              <path d="M72 162 H168 L160 172 H80 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
              <path
                d="M120 116 L124 127 L136 128 L127 136 L129 148 L120 142 L111 148 L113 136 L104 128 L116 127 Z"
                fill={SUNNY}
                stroke={CHARCOAL}
                strokeWidth={2.5}
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
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            🏅 Lencana Jagoan Logika Mandiri
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
            Kamu sudah hebat menyusun{' '}
            <Highlight color="#D1FAE5">Urutan &amp; Arah</Highlight> sendiri di laptop!
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko Celebrating Graduation */}
      <div style={{ ...abs(1410, 410, 420, 490), ...centerCol }}>
        <BikoMascot
          pose="jump"
          width={380}
          badgeEmoji="🏆"
          speechBubble="Lulus Code Explorer! 🎉"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// Speaker Notes (Talk Track for Mentors teaching Ages 5–7)
// ============================================================================
export const notes: (string | undefined)[] = [
  `Selamat datang di Pertemuan 10 — Tantangan Jagoan Logika!
Hari ini Biko memakai jubah superhero mini karena kalian siap menggabungkan semua jurus coding yang sudah dipelajari selama 10 pertemuan!`,

  `Dua misi besar hari ini:
1. Menggabungkan semua jurus logika (Arah, Urutan, Blok Ulangi, dan Debugging).
2. Menyelesaikan misi petualangan secara mandiri di laptop masing-masing!`,

  `Ayo ingat kembali 4 Jurus Hebat kita:
🧭 Arah panah, 🔗 Urutan yang rapi, 🔁 Blok Ulangi yang ringkas, dan 🔍 Cek & Perbaiki (Debug)!`,

  `Bagaimana cara main sendiri di laptop?
1. Lihat Peta dan cari jalan aman dulu. 2. Susun Blok pelan-pelan. 3. Tekan Jalan dan periksa hasilnya!`,

  `Pemanasan #1: Bantu Biko ke Pulau Bintang!
Jalan lurus 3 kotak ke kanan memakai 🔁 Ulangi [ 3 ] [ ➡️ ], lalu sambung 1 blok belok Atas [ ⬆️ ] -> sampai di Bintang!`,

  `Permainan Cepat! Di depan Biko ada batu besar!
Mana kode yang sampai ke bintang: Pilihan A (➡️ ➡️ ⬆️) atau Pilihan B (⬆️ ➡️ ➡️)?`,

  `Pemanasan #2: Lembah Rintangan 4×4!
Awas banyak batu dan kaktus berduri! Gabungkan jurus belok dan Blok Ulangi mengikuti jejak bintang aman menuju peti harta karun!`,

  `Aturan Jagoan Mandiri:
BOLEH berpikir dan mencoba sendiri dulu, serta memperbaiki kode kalau masih ada yang salah.
JANGAN langsung minta dibuatkan atau menyerah ketika karakter nyasar!`,

  `Waktunya Tantangan Utama di laptop!
Buka misi petualangan di laptop kalian, susun blok arah dan Blok Ulangi sendiri, dan taklukkan Level 1 sampai Level 3!`,

  `Luar biasa untuk semua Jagoan Logika cilik!
Kalian resmi lulus tantangan akhir dan meraih Lencana Jagoan Logika Mandiri!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 10 — Tantangan Jagoan Logika!',
  createdAt: '2026-11-13T17:40:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BekalPetualangan,
  Slide04JurusMandiri,
  Slide05Pemanasan1,
  Slide06AyoTebak,
  Slide07Pemanasan2,
  Slide08AturanMain,
  Slide09TantanganUtama,
  Slide10Lencana,
] satisfies Page[];

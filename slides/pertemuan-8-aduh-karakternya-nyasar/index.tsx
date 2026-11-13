import { Fragment, useEffect, useRef, useState, type CSSProperties, type DragEvent, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-8-aduh-karakternya-nyasar';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj8-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj8-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-12px) scale(1.04); }
}
@keyframes cpj8-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj8-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj8-bug-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(244, 91, 73, 0.55), 0 6px 0 #1E1E2C; }
  50% { box-shadow: 0 0 0 10px rgba(244, 91, 73, 0), 0 6px 0 #1E1E2C; }
}
@keyframes cpj8-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj8-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj8-card-btn:hover {
  transform: translateY(-4px);
}
.cpj8-card-btn:active {
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
  accentDot = CORAL,
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
          animation: live ? 'cpj8-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 8 • Aduh Karakternya Nyasar!</span>
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
// Pertemuan 8 Visual Assets: Cute Bug, Wrench, Magnifier, Blocks & Tokens
// ============================================================================
type Dir = 'up' | 'down' | 'left' | 'right';

const DIR_META: Record<Dir, { label: string; color: string; rot: number; icon: JuniorIconName }> = {
  up: { label: 'Atas', color: TEAL, rot: -90, icon: 'arrow-up' },
  down: { label: 'Bawah', color: CORAL, rot: 90, icon: 'arrow-down' },
  left: { label: 'Kiri', color: SUNNY, rot: 180, icon: 'arrow-left' },
  right: { label: 'Kanan', color: SKY, rot: 0, icon: 'arrow-right' },
};

/** Friendly cartoon red ladybug ("Bug") */
const BugSvg = ({ size = 56, style }: { size?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
    {/* Little legs */}
    <path
      d="M20 34 L10 28 M18 46 L8 46 M22 58 L12 64 M60 34 L70 28 M62 46 L72 46 M58 58 L68 64"
      stroke={CHARCOAL}
      strokeWidth={3.8}
      strokeLinecap="round"
    />
    {/* Antennae */}
    <path d="M33 20 Q28 10 22 12 M47 20 Q52 10 58 12" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" />
    <circle cx="22" cy="12" r="3" fill={CHARCOAL} />
    <circle cx="58" cy="12" r="3" fill={CHARCOAL} />
    {/* Head */}
    <circle cx="40" cy="25" r="11" fill={CHARCOAL} />
    <circle cx="36" cy="24" r="2.2" fill={WHITE} />
    <circle cx="44" cy="24" r="2.2" fill={WHITE} />
    {/* Ladybug Wing Shell */}
    <ellipse cx="40" cy="48" rx="22" ry="20" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.8} />
    <line x1="40" y1="28" x2="40" y2="68" stroke={CHARCOAL} strokeWidth={3.2} />
    {/* Spots */}
    <circle cx="29" cy="42" r="4.2" fill={CHARCOAL} />
    <circle cx="31" cy="56" r="3.6" fill={CHARCOAL} />
    <circle cx="51" cy="42" r="4.2" fill={CHARCOAL} />
    <circle cx="49" cy="56" r="3.6" fill={CHARCOAL} />
  </svg>
);

/** Star Wrench for Debugging */
const WrenchStarSvg = ({ size = 68 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M52 14 C44 16, 40 24, 42 32 L18 56 C15 59, 15 64, 18 67 C21 70, 26 70, 29 67 L53 43 C61 45, 68 40, 70 32 L60 35 L54 29 L57 19 Z"
      fill={SUNNY}
      stroke={CHARCOAL}
      strokeWidth={3.8}
      strokeLinejoin="round"
    />
    <path
      d="M22 14 L25 22 L33 23 L27 28 L28 36 L22 32 L16 36 L17 28 L11 23 L19 22 Z"
      fill={TEAL}
      stroke={CHARCOAL}
      strokeWidth={2.5}
    />
  </svg>
);

/** Detective Magnifying Glass */
const MagnifierSvg = ({ size = 68 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <line x1="48" y1="48" x2="68" y2="68" stroke={CHARCOAL} strokeWidth={10} strokeLinecap="round" />
    <line x1="48" y1="48" x2="68" y2="68" stroke="#D97706" strokeWidth={5} strokeLinecap="round" />
    <circle cx="34" cy="34" r="22" fill="#E0F2FE" stroke={CHARCOAL} strokeWidth={4.5} />
    <path d="M23 24 Q28 18 36 18" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
  </svg>
);

/** Tactile Directional Arrow Block with Bug / Cross / Fixed states */
const DebugArrowBlock = ({
  dir,
  size = 86,
  stepNum,
  isBug = false,
  isFixed = false,
  crossed = false,
  active = false,
  highlightColor,
  showRightTab = false,
  onClick,
}: {
  dir: Dir;
  size?: number;
  stepNum?: number;
  isBug?: boolean;
  isFixed?: boolean;
  crossed?: boolean;
  active?: boolean;
  highlightColor?: string;
  showRightTab?: boolean;
  onClick?: () => void;
}) => {
  const m = DIR_META[dir];
  const bg = highlightColor ?? (isBug ? CORAL : isFixed ? TEAL : m.color);
  return (
    <button
      type="button"
      onClick={onClick}
      className={onClick ? 'cpj8-card-btn' : undefined}
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
        animation: isBug ? 'cpj8-bug-pulse 1.5s ease-in-out infinite' : undefined,
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
      {isBug && (
        <div
          style={{
            position: 'absolute',
            top: -18,
            right: -14,
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          <BugSvg size={Math.round(size * 0.48)} />
        </div>
      )}
      {crossed && (
        <span
          style={{
            position: 'absolute',
            top: -14,
            right: -12,
            width: 32,
            height: 32,
            borderRadius: 99,
            background: CORAL,
            color: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 18,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4,
          }}
        >
          ✕
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

/** Cute Biko Detective face token for grid tiles */
const BikoDetectiveToken = ({
  size = 64,
  confused = false,
  style,
}: {
  size?: number;
  confused?: boolean;
  style?: CSSProperties;
}) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
    <circle cx="20" cy="28" r="9" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.2} />
    <circle cx="60" cy="28" r="9" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.2} />
    <circle cx="40" cy="44" r="24" fill="#F59E0B" stroke={CHARCOAL} strokeWidth={3.4} />
    <ellipse cx="40" cy="49" rx="17" ry="14" fill="#FEF3C7" />
    {/* Detective Cap */}
    <path d="M22 28 C22 14, 58 14, 58 28 Z" fill="#92400E" stroke={CHARCOAL} strokeWidth={3} />
    <path d="M20 29 Q40 22 62 29 L66 33 Q40 29 18 33 Z" fill="#78350F" stroke={CHARCOAL} strokeWidth={2.5} />
    {/* Eyes */}
    <circle cx="32" cy="43" r="3.4" fill={CHARCOAL} />
    <circle cx="48" cy="43" r="3.4" fill={CHARCOAL} />
    <circle cx="33" cy="41.8" r="1.1" fill={WHITE} />
    <circle cx="49" cy="41.8" r="1.1" fill={WHITE} />
    <ellipse cx="40" cy="49" rx="4.5" ry="3.2" fill={CHARCOAL} />
    {confused ? (
      <path d="M33 56 Q37 53 40 56 T47 56" stroke={CORAL} strokeWidth={2.8} strokeLinecap="round" />
    ) : (
      <path d="M34 54.5 Q40 60 46 54.5" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" />
    )}
  </svg>
);

const BunnySvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <ellipse cx="30" cy="22" rx="7.5" ry="18" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} />
    <ellipse cx="30" cy="22" rx="3.5" ry="11" fill="#FBCFE8" />
    <ellipse cx="50" cy="22" rx="7.5" ry="18" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} />
    <ellipse cx="50" cy="22" rx="3.5" ry="11" fill="#FBCFE8" />
    <circle cx="40" cy="49" r="21" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.4} />
    <circle cx="33" cy="46" r="3" fill={CHARCOAL} />
    <circle cx="47" cy="46" r="3" fill={CHARCOAL} />
    <ellipse cx="40" cy="51.5" rx="3.5" ry="2.5" fill="#F472B6" />
    <path d="M35 56 Q40 60 45 56" stroke={CHARCOAL} strokeWidth={2.5} strokeLinecap="round" />
  </svg>
);

const CarrotSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M40 24 C32 10, 24 14, 34 25 C40 10, 44 10, 45 25 C55 14, 48 10, 40 24 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M26 30 Q40 22 54 30 L43 68 Q40 72 37 68 Z" fill="#FB923C" stroke={CHARCOAL} strokeWidth={3.4} strokeLinejoin="round" />
  </svg>
);

const RockSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="66" rx="28" ry="6.5" fill="#D6CEC2" />
    <path d="M14 60 L18 34 L34 20 L56 24 L67 44 L64 60 Z" fill="#94A3B8" stroke={CHARCOAL} strokeWidth={3.6} strokeLinejoin="round" />
    <path d="M20 56 L24 38 L36 27 L48 29 L40 44 L36 56 Z" fill="#CBD5E1" />
  </svg>
);

const BushSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="66" rx="27" ry="6" fill="#D1FAE5" />
    <path
      d="M16 58 C10 46, 18 32, 28 32 C30 20, 48 18, 54 30 C66 30, 72 44, 64 58 Z"
      fill="#16A34A"
      stroke={CHARCOAL}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />
    <path d="M22 30 L17 24 M40 20 L40 12 M58 29 L64 23" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
    <circle cx="30" cy="44" r="4" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="48" cy="40" r="4" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
  </svg>
);

const FlagSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <rect x="23" y="14" width="6" height="54" rx="3" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="26" cy="13" r="5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
    <path d="M29 17 L64 24 L54 34 L64 44 L29 49 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
    <path d="M44 26 L46 31 L51 31.5 L47 35 L48 40 L44 37.5 L40 40 L41 35 L37 31.5 L42 31 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={1.8} />
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

// ============================================================================
// SLIDE 01 — Cover (Detective Case Folder Backdrop + Biko Detektif + Bug Block)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 8" accentDot={CORAL}>
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
            background: CORAL_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#B91C1C',
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
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          Aduh, Karakternya
          <br />
          <Highlight>Nyasar!</Highlight>
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
          Detektif Kode Mencari &amp; Memperbaiki Blok Salah
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
            <JuniorIcon name="bug" size={28} />
            <span>Temukan Bug</span>
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
            <JuniorIcon name="wrench" size={28} />
            <span>Jurus Debugging!</span>
          </div>
        </div>
      </div>

      {/* Right Visual Showcase: Detective Case Folder Card (Distinct from Pertemuan 1-7) */}
      <div style={{ ...abs(1000, 165, 820, 785), ...centerCol }}>
        {/* Folder Top Tab */}
        <div
          style={{
            position: 'absolute',
            left: 88,
            top: 26,
            padding: '10px 28px',
            borderRadius: '20px 20px 0 0',
            background: SUNNY,
            border: `4px solid ${CHARCOAL}`,
            borderBottom: 'none',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            zIndex: 2,
            ...row,
            gap: 8,
          }}
        >
          <JuniorIcon name="folder" size={22} />
          <span>KASUS DETEKTIF #08</span>
        </div>

        {/* Chamfered-Style Detective Case Folder */}
        <div
          style={{
            position: 'absolute',
            top: 72,
            width: 650,
            height: 610,
            borderRadius: '0 44px 190px 44px',
            background: 'linear-gradient(155deg, #FEF2F2 0%, #FFFBEB 55%, #EFF6FF 100%)',
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${CORAL}`,
            overflow: 'hidden',
          }}
        >
          {/* Magnifier grid rings */}
          <svg width="100%" height="100%" viewBox="0 0 650 610" fill="none" style={{ opacity: 0.28 }}>
            <circle cx="325" cy="310" r="220" stroke={CORAL} strokeWidth={3} strokeDasharray="10 10" />
            <circle cx="325" cy="310" r="145" stroke={SKY} strokeWidth={3} />
          </svg>
        </div>

        {/* Arrow Block Chain with Glowing Bug Block */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 108,
            padding: '16px 22px',
            borderRadius: 24,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            zIndex: 4,
          }}
        >
          <div style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700, color: MUTED, marginBottom: 10 }}>
            <JuniorIcon name="magnifier" size={20} />
            <span>Periksa Rantai Kode:</span>
          </div>
          <div style={{ ...row, gap: 10 }}>
            <DebugArrowBlock dir="right" size={72} stepNum={1} showRightTab />
            <DebugArrowBlock dir="up" size={72} stepNum={2} showRightTab />
            <DebugArrowBlock dir="down" size={72} stepNum={3} isBug />
          </div>
        </div>

        <BikoMascot
          pose="detective"
          width={400}
          style={{ position: 'relative', zIndex: 3, marginTop: 155, marginLeft: 130 }}
        />

        {/* Cute Floating Bug Pill */}
        <div
          style={{
            position: 'absolute',
            right: 26,
            bottom: 48,
            padding: '10px 18px',
            borderRadius: 22,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            ...row,
            gap: 10,
            zIndex: 5,
            animation: live ? 'cpj8-float 2.8s ease-in-out infinite' : undefined,
          }}
        >
          <BugSvg size={44} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: CORAL }}>
            Ketemu Bug!
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
  <JuniorFrame badge="MISI HARI INI" accentDot={CORAL}>
    <SlideTitle>
      Apa <Highlight>Misi Kita</Highlight> Hari Ini?
    </SlideTitle>

    <MacWindowCard left={X0} top={250} width={1280} height={675} headerLabel="daftar-misi-8.exe" padding={42}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, height: '100%' }}>
        {/* Kartu 1: Coral #F45B49 */}
        <div
          style={{
            borderRadius: 26,
            background: CORAL_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CORAL}`,
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
              background: CORAL,
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
              padding: '18px 26px',
              borderRadius: 24,
              background: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
            }}
          >
            <MagnifierSvg size={72} />
            <DebugArrowBlock dir="down" size={76} isBug />
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
            Temukan <Highlight color={STABILO}>Bug</Highlight>
            <br />
            (Blok yang Salah)
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
              gap: 16,
              padding: '18px 26px',
              borderRadius: 24,
              background: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
            }}
          >
            <WrenchStarSvg size={72} />
            <DebugArrowBlock dir="up" size={76} isFixed />
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
            Perbaiki Kodenya
            <br />
            (<Highlight color="#D1FAE5">Debugging!</Highlight>)
          </div>
        </div>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="point-left"
      width={380}
      speechBubble="Ayo tangkap semua Bug!"
      style={{ ...abs(1435, 315) }}
    />
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Rahasia Detektif #1: Apa Itu Bug?
// ============================================================================
const Slide03ApaItuBug: Page = () => {
  const [inspectBug, setInspectBug] = useState(true);

  return (
    <JuniorFrame badge="RAHASIA DETEKTIF #1" accentDot={CORAL}>
      <SlideTitle>
        Apa Itu <Highlight>Bug</Highlight>?
      </SlideTitle>

      {/* Left Spotlight Card: Biko going off-course into Thorny Bush */}
      <MacWindowCard left={X0} top={250} width={960} height={685} headerLabel="apa-itu-bug.app" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
              Kode salah bikin Biko nyasar!
            </span>
            <button
              type="button"
              className="cpj8-card-btn"
              onClick={() => setInspectBug((v) => !v)}
              style={{
                padding: '8px 18px',
                borderRadius: 14,
                background: inspectBug ? CORAL : SKY,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 19,
                fontWeight: 700,
                ...row,
                gap: 8,
              }}
            >
              <JuniorIcon name={inspectBug ? 'bug' : 'magnifier'} size={20} />
              <span>{inspectBug ? 'Sorot Bug!' : 'Lihat Peta'}</span>
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 168px)',
              gridTemplateRows: 'repeat(3, 120px)',
              gap: 12,
              justifyContent: 'center',
              alignContent: 'center',
              background: '#F8FAFC',
              padding: 18,
              borderRadius: 24,
              border: `3px solid ${CHARCOAL}`,
            }}
          >
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => {
                const isStart = r === 1 && c === 0;
                const isWrongWay = r === 2 && c === 1;
                const isFlag = r === 0 && c === 2;
                const isOffBush = r === 2 && c === 1;

                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      borderRadius: 18,
                      background: isWrongWay
                        ? CORAL_SOFT
                        : isFlag
                          ? SUNNY_SOFT
                          : isStart
                            ? SKY_SOFT
                            : WHITE,
                      border: isWrongWay ? `3.5px solid ${CORAL}` : `2.5px solid ${CHARCOAL}`,
                      ...centerCol,
                      position: 'relative',
                    }}
                  >
                    {isStart && (
                      <span style={{ ...row, gap: 4, fontSize: 16, fontWeight: 800, color: '#1D4ED8' }}>
                        <span>START</span>
                        <JuniorIcon name="arrow-right" size={18} />
                      </span>
                    )}
                    {r === 1 && c === 1 && (
                      <JuniorIcon name="arrow-down" size={28} />
                    )}
                    {isOffBush && (
                      <div style={{ ...row, gap: 4 }}>
                        <BikoDetectiveToken size={64} confused />
                        <BushSvg size={58} />
                      </div>
                    )}
                    {isFlag && <FlagSvg size={70} />}
                  </div>
                );
              }),
            )}
          </div>

          {/* Code Strip showing the Bug */}
          <div
            style={{
              ...row,
              justifyContent: 'space-between',
              padding: '12px 24px',
              borderRadius: 20,
              background: CORAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
            }}
          >
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              Urutan Blok:
            </span>
            <div style={{ ...row, gap: 14 }}>
              <DebugArrowBlock dir="right" size={66} stepNum={1} showRightTab />
              <DebugArrowBlock dir="down" size={66} stepNum={2} isBug={inspectBug} />
            </div>
            <span style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700, color: CORAL }}>
              <JuniorIcon name="bug" size={22} />
              <span>Bug bikin nyasar ke semak!</span>
            </span>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: Definition Cards + Biko Thinking */}
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
          <BugSvg size={76} />
          <div>
            <div style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
              <JuniorIcon name="bug" size={28} />
              <span>Kesalahan di Urutan Blok</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: MUTED, marginTop: 4 }}>
              Dalam dunia coding, kesalahan perintah disebut <strong>Bug</strong>!
            </div>
          </div>
        </div>

        <div
          style={{
            background: SUNNY_SOFT,
            borderRadius: 24,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${SUNNY}`,
            padding: '24px 28px',
            ...row,
            gap: 20,
          }}
        >
          <div
            style={{
              width: 74,
              height: 74,
              borderRadius: 20,
              background: SUNNY,
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
              fontSize: 40,
              flexShrink: 0,
            }}
          >
            <JuniorIcon name="dizzy" size={40} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
              Bikin Nyasar atau Nabrak!
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: MUTED, marginTop: 4 }}>
              Karakter mengikuti perintah yang tertulis, walau salah.
            </div>
          </div>
        </div>

        <div style={{ flex: 1, ...centerCol }}>
          <BikoMascot
            pose="thinking"
            width={245}
            speechBubble="Hmm, blok mana yang salah ya?"
          />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus Detektif Kode: Debugging! (3 Langkah Interaktif)
// ============================================================================
const Slide04JurusDebugging: Page = () => {
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
      title: 'Cari Blok Nyasar',
      desc: 'Periksa urutan blok dengan teliti',
      icon: 'magnifier',
      color: SKY,
      soft: SKY_SOFT,
      badge: 'LANGKAH 1 • CARI',
      visual: (
        <div style={{ ...row, gap: 10 }}>
          <MagnifierSvg size={64} />
          <DebugArrowBlock dir="down" size={64} isBug />
        </div>
      ),
    },
    {
      num: '2',
      title: 'Buang Blok Salah',
      desc: 'Tarik keluar blok merah yang ada Bug',
      icon: 'trash',
      color: CORAL,
      soft: CORAL_SOFT,
      badge: 'LANGKAH 2 • BUANG',
      visual: (
        <div style={{ ...row, gap: 10 }}>
          <DebugArrowBlock dir="down" size={64} crossed />
          <JuniorIcon name="trash" size={38} />
        </div>
      ),
    },
    {
      num: '3',
      title: 'Ganti Blok Benar!',
      desc: 'Pasang blok hijau yang arahnya tepat',
      icon: 'sparkle',
      color: TEAL,
      soft: TEAL_SOFT,
      badge: 'LANGKAH 3 • GANTI',
      visual: (
        <div style={{ ...row, gap: 10 }}>
          <WrenchStarSvg size={60} />
          <DebugArrowBlock dir="up" size={64} isFixed />
        </div>
      ),
    },
  ];

  const hints: { icon: JuniorIconName; text: string }[] = [
    { icon: 'magnifier', text: 'Fase 1: Biko memeriksa blok dengan kaca pembesar dan menemukan blok merah!' },
    { icon: 'trash', text: 'Fase 2: Tarik keluar & buang blok merah yang salah dari rantai kode!' },
    { icon: 'sparkle', text: 'Fase 3: Pasang blok hijau yang tepat — kode kembali bersih dan benar!' },
  ];

  return (
    <JuniorFrame badge="JURUS DETEKTIF KODE" accentDot={TEAL}>
      <SlideTitle>
        Jurus <Highlight>Debugging!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={245} width={1720} height={700} headerLabel="jurus-debugging.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {steps.map((s, idx) => {
              const active = phase === idx;
              return (
                <button
                  key={s.num}
                  type="button"
                  className="cpj8-card-btn"
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
                      color: WHITE,
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

          {/* Interactive Phase Bar */}
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
            <div style={{ ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700, color: CHARCOAL }}>
              <JuniorIcon name={hints[phase].icon} size={26} />
              <span>{hints[phase].text}</span>
            </div>
            <button
              type="button"
              className="cpj8-card-btn"
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
              <span>Fase Berikutnya</span>
            </button>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Kasus Detektif #1: Langkahnya Kebanyakan!
// ============================================================================
const Slide05Kasus1: Page = () => {
  const [fixed, setFixed] = useState(false);

  return (
    <JuniorFrame badge="KASUS DETEKTIF #1" accentDot={SKY}>
      <SlideTitle>
        Langkahnya <Highlight>Kebanyakan!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Horizontal 3-box Carrot Map + Buggy vs Fixed Code */}
      <MacWindowCard left={X0} top={250} width={940} height={680} headerLabel="kasus-1-kelinci.app" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
              Peta Jalan Kelinci (3 Kotak + Batas Luar):
            </span>
            <button
              type="button"
              className="cpj8-card-btn"
              onClick={() => setFixed((f) => !f)}
              style={{
                padding: '10px 22px',
                borderRadius: 16,
                background: fixed ? CORAL : TEAL,
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
              <JuniorIcon name={fixed ? 'turn-left' : 'wrench'} size={20} />
              <span>{fixed ? 'Lihat Kode Bug' : 'Perbaiki Sekarang!'}</span>
            </button>
          </div>

          {/* 3 boxes + 4th overshoot zone */}
          <div
            style={{
              ...row,
              justifyContent: 'center',
              gap: 14,
              background: '#F8FAFC',
              padding: '34px 20px',
              borderRadius: 24,
              border: `3px solid ${CHARCOAL}`,
            }}
          >
            <div
              style={{
                width: 170,
                height: 170,
                borderRadius: 22,
                background: SKY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              <BunnySvg size={105} />
              <span style={{ fontSize: 16, fontWeight: 800, color: '#1D4ED8' }}>START</span>
            </div>

            <div
              style={{
                width: 170,
                height: 170,
                borderRadius: 22,
                background: TEAL_SOFT,
                border: `3px dashed ${TEAL}`,
                ...centerCol,
              }}
            >
              <span style={{ ...row, gap: 6, fontSize: 36, fontWeight: 800, color: '#047857' }}>
                <span>1</span>
                <JuniorIcon name="arrow-right" size={32} />
              </span>
              <span style={{ fontSize: 16, fontWeight: 700, color: MUTED }}>Kosong</span>
            </div>

            <div
              style={{
                width: 170,
                height: 170,
                borderRadius: 22,
                background: SUNNY_SOFT,
                border: fixed ? `4px solid ${TEAL}` : `3px solid ${CHARCOAL}`,
                ...centerCol,
                position: 'relative',
              }}
            >
              {fixed ? (
                <>
                  <div style={{ ...row, gap: 4 }}>
                    <BunnySvg size={80} />
                    <CarrotSvg size={64} />
                  </div>
                  <span style={{ ...row, gap: 4, fontSize: 17, fontWeight: 800, color: '#047857' }}>
                    <JuniorIcon name="check" size={18} />
                    <span>PAS! (2</span>
                    <JuniorIcon name="arrow-right" size={16} />
                    <span>)</span>
                  </span>
                </>
              ) : (
                <>
                  <CarrotSvg size={95} />
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#B45309' }}>WORTEL</span>
                </>
              )}
            </div>

            {!fixed && (
              <div
                style={{
                  width: 150,
                  height: 170,
                  borderRadius: 22,
                  background: CORAL_SOFT,
                  border: `3.5px dashed ${CORAL}`,
                  ...centerCol,
                }}
              >
                <BunnySvg size={82} />
                <span style={{ ...row, gap: 4, fontSize: 16, fontWeight: 800, color: CORAL }}>
                  <span>BABLAS! (3</span>
                  <JuniorIcon name="arrow-right" size={16} />
                  <span>)</span>
                </span>
              </div>
            )}
          </div>

          {/* Code Strip below */}
          <div
            style={{
              padding: '20px 24px',
              borderRadius: 22,
              background: fixed ? TEAL_SOFT : CORAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <DebugArrowBlock dir="right" size={76} stepNum={1} showRightTab />
              <DebugArrowBlock dir="right" size={76} stepNum={2} showRightTab={!fixed} />
              {!fixed && <DebugArrowBlock dir="right" size={76} stepNum={3} isBug crossed />}
            </div>
            <div style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700, color: fixed ? '#047857' : CORAL }}>
              <JuniorIcon name={fixed ? 'check' : 'cross'} size={24} />
              <span>{fixed ? 'Pas 2 langkah ke Wortel!' : 'Blok ke-3 kebanyakan (bablas)!'}</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card: Summary & Fix */}
      <MacWindowCard left={1075} top={250} width={745} height={680} headerLabel="perbaikan-kasus-1.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                padding: '18px 24px',
                borderRadius: 20,
                background: SUNNY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 29,
                fontWeight: 700,
                ...row,
                gap: 12,
              }}
            >
              <JuniorIcon name="carrot" size={32} />
              <span>
                Wortel cuma butuh <strong>2 Langkah</strong>
              </span>
            </div>

            <div
              style={{
                padding: '18px 24px',
                borderRadius: 20,
                background: CORAL_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 27,
                fontWeight: 700,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="cross" size={28} />
              <span>Kode salah:</span>
              <span style={{ ...row, gap: 6 }}>
                <span>[</span>
                <JuniorIcon name="arrow-right" size={24} />
                <span>] + [</span>
                <JuniorIcon name="arrow-right" size={24} />
                <span>] + [</span>
                <JuniorIcon name="arrow-right" size={24} />
                <span>]</span>
              </span>
            </div>

            <div
              style={{
                padding: '18px 24px',
                borderRadius: 20,
                background: TEAL_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 29,
                fontWeight: 700,
                ...row,
                gap: 12,
              }}
            >
              <JuniorIcon name="check" size={30} />
              <span>
                Perbaiki: Buang <strong>1 Panah</strong> berlebih!
              </span>
            </div>
          </div>

          <div
            style={{
              ...row,
              justifyContent: 'space-between',
              padding: '16px 24px',
              borderRadius: 22,
              background: SKY_SOFT,
              border: `3px solid ${CHARCOAL}`,
            }}
          >
            <div style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
              <span>Kode Bersih:</span>
              <strong>[</strong>
              <JuniorIcon name="arrow-right" size={24} />
              <strong>] + [</strong>
              <JuniorIcon name="arrow-right" size={24} />
              <strong>]</strong>
            </div>
            <BikoMascot pose="thumbs-up" width={120} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Blok Mana yang Salah?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [choice, setChoice] = useState<'b1' | 'b2' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle align="center" top={122}>
        Blok Mana yang <Highlight>Salah?</Highlight>
      </SlideTitle>

      {/* Top Interactive Map (3x3): Biko at mid/bottom-left, Star at top-right */}
      <MacWindowCard left={240} top={215} width={1440} height={310} headerLabel="cari-blok-salah.app" padding={20}>
        <div style={{ ...row, justifyContent: 'center', gap: 52, height: '100%' }}>
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
                const isStart = r === 1 && c === 0;
                const isAfterRight = r === 1 && c === 1;
                const isWrongDown = r === 2 && c === 1;
                const isStar = r === 0 && c === 2;

                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      borderRadius: 12,
                      background: isWrongDown
                        ? CORAL_SOFT
                        : isStar
                          ? SUNNY_SOFT
                          : isStart
                            ? SKY_SOFT
                            : WHITE,
                      border: `2.5px solid ${CHARCOAL}`,
                      ...centerCol,
                    }}
                  >
                    {isStart && <BikoDetectiveToken size={48} />}
                    {isAfterRight && (
                      <span style={{ ...row, gap: 4, fontSize: 22, fontWeight: 800, color: SKY }}>
                        <span>1</span>
                        <JuniorIcon name="arrow-right" size={22} />
                      </span>
                    )}
                    {isWrongDown && (
                      <span style={{ ...row, gap: 4, fontSize: 20, fontWeight: 800, color: CORAL }}>
                        <span>2</span>
                        <JuniorIcon name="arrow-down" size={20} />
                        <JuniorIcon name="dizzy" size={20} />
                      </span>
                    )}
                    {isStar && <StarSvg size={48} />}
                  </div>
                );
              }),
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
              Urutan Blok yang Tertulis:
            </div>
            <div style={{ ...row, gap: 16 }}>
              <DebugArrowBlock dir="right" size={82} stepNum={1} showRightTab />
              <DebugArrowBlock dir="down" size={82} stepNum={2} isBug={choice === 'b2'} />
            </div>
            <div style={{ ...row, gap: 8, fontSize: 22, fontWeight: 700, color: MUTED }}>
              <span>Biko malah turun ke bawah menjauhi</span>
              <JuniorIcon name="star" size={24} />
              <span>Bintang!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Bottom 2 Large Choice Cards + Biko Question */}
      <button
        type="button"
        className="cpj8-card-btn"
        onClick={() => setChoice('b1')}
        style={{
          ...abs(160, 560, 580, 290),
          borderRadius: 28,
          background: choice === 'b1' ? CORAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 'b1' ? `0 0 0 6px ${CORAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${SKY}`,
          padding: 28,
          ...centerCol,
          gap: 16,
          animation: choice === 'b1' ? 'cpj8-shake 0.35s ease' : undefined,
        }}
      >
        <span
          style={{
            padding: '6px 18px',
            borderRadius: 99,
            background: SKY,
            color: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          PILIHAN A
        </span>
        <DebugArrowBlock dir="right" size={100} stepNum={1} />
        <div style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
          <span>Blok 1 (</span>
          <JuniorIcon name="arrow-right" size={30} />
          <span>){choice === 'b1' ? ' — Ini Benar!' : ''}</span>
        </div>
      </button>

      <div style={{ ...abs(760, 540, 400, 355), ...centerCol }}>
        <BikoMascot
          pose={choice === 'b2' ? 'thumbs-up' : 'question'}
          width={240}
          speechBubble={
            choice === 'b2'
              ? 'Tepat! Blok 2 (Bawah) Bug-nya!'
              : choice === 'b1'
                ? 'Blok 1 sudah benar!'
                : 'Mana blok yang salah?'
          }
        />
      </div>

      <button
        type="button"
        className="cpj8-card-btn"
        onClick={() => setChoice('b2')}
        style={{
          ...abs(1180, 560, 580, 290),
          borderRadius: 28,
          background: choice === 'b2' ? TEAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 'b2' ? `0 0 0 6px ${TEAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${CORAL}`,
          padding: 28,
          ...centerCol,
          gap: 16,
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
        <DebugArrowBlock dir="down" size={100} stepNum={2} isBug />
        <div style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
          <span>Blok 2 (</span>
          <JuniorIcon name="arrow-down" size={30} />
          <span>)</span>
          {choice === 'b2' && (
            <>
              <JuniorIcon name="check" size={30} />
              <span>Ini Bug-nya!</span>
            </>
          )}
        </div>
      </button>

      <div style={{ ...abs(440, 915, 1040, 56), ...centerCol }}>
        <div
          style={{
            padding: '10px 30px',
            borderRadius: 99,
            background: choice === 'b2' ? TEAL_SOFT : SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 25,
            fontWeight: 700,
            ...row,
            gap: 8,
          }}
        >
          {choice === 'b2' ? (
            <>
              <JuniorIcon name="party" size={26} />
              <span>Betul! Blok 2 (</span>
              <JuniorIcon name="arrow-down" size={22} />
              <span>) membuat Biko turun — harusnya Atas (</span>
              <JuniorIcon name="arrow-up" size={22} />
              <span>)!</span>
            </>
          ) : (
            <>
              <JuniorIcon name="tap" size={26} />
              <span>Tunjuk blok yang salah di layarmu ya!</span>
            </>
          )}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Kasus Detektif #2: Salah Belok Nabrak Batu!
// ============================================================================
const Slide07Kasus2: Page = () => {
  const [fixed, setFixed] = useState(false);

  return (
    <JuniorFrame badge="KASUS DETEKTIF #2" accentDot={TEAL}>
      <SlideTitle>
        Salah Belok <Highlight>Nabrak Batu!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Grid Card */}
      <MacWindowCard left={X0} top={250} width={920} height={680} headerLabel="kasus-2-batu.app" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
              Peta Labirin 3×3:
            </span>
            <button
              type="button"
              className="cpj8-card-btn"
              onClick={() => setFixed((f) => !f)}
              style={{
                padding: '10px 22px',
                borderRadius: 16,
                background: fixed ? CORAL : TEAL,
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
              <JuniorIcon name={fixed ? 'bug' : 'wrench'} size={20} />
              <span>{fixed ? 'Lihat Kode Salah' : 'Ganti Blok Hijau!'}</span>
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
                const isStart = r === 1 && c === 0;
                const isRock = r === 1 && c === 1;
                const isDetour = r === 0 && c === 0;
                const isFlag = r === 0 && c === 1;
                const isBush = r === 2 && c === 2;

                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      borderRadius: 18,
                      background: isRock
                        ? CORAL_SOFT
                        : fixed && (isDetour || isFlag)
                          ? TEAL_SOFT
                          : isFlag
                            ? SUNNY_SOFT
                            : WHITE,
                      border: fixed && isDetour ? `3.5px dashed ${TEAL}` : `2.5px solid ${CHARCOAL}`,
                      ...centerCol,
                      position: 'relative',
                    }}
                  >
                    {isStart && !fixed && <BikoDetectiveToken size={82} confused />}
                    {isStart && fixed && (
                      <span style={{ ...row, gap: 4, fontSize: 18, fontWeight: 800, color: '#047857' }}>
                        <span>START</span>
                        <JuniorIcon name="arrow-up" size={20} />
                      </span>
                    )}
                    {isRock && (
                      <div style={{ ...centerCol }}>
                        <RockSvg size={78} />
                        {!fixed && (
                          <span style={{ ...row, gap: 4, fontSize: 15, fontWeight: 800, color: CORAL }}>
                            <JuniorIcon name="warning" size={16} />
                            <span>NABRAK!</span>
                          </span>
                        )}
                      </div>
                    )}
                    {isDetour && fixed && (
                      <div style={{ ...row, gap: 6 }}>
                        <JuniorIcon name="turn-up" size={34} />
                        <JuniorIcon name="arrow-right" size={34} />
                      </div>
                    )}
                    {isFlag && !fixed && <FlagSvg size={76} />}
                    {isFlag && fixed && (
                      <div style={{ ...row, gap: 4 }}>
                        <BikoDetectiveToken size={68} />
                        <FlagSvg size={64} />
                      </div>
                    )}
                    {isBush && <BushSvg size={68} />}
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
              color: fixed ? '#047857' : CORAL,
            }}
          >
            {fixed ? (
              <>
                <JuniorIcon name="flag" size={24} />
                <span>Yeay! Dengan [</span>
                <JuniorIcon name="arrow-up" size={22} />
                <span>] + [</span>
                <JuniorIcon name="arrow-right" size={22} />
                <span>], Biko belok aman sampai Finis!</span>
              </>
            ) : (
              <>
                <JuniorIcon name="warning" size={24} />
                <span>Aduh! Kalau langsung [</span>
                <JuniorIcon name="arrow-right" size={22} />
                <span>], Biko menabrak batu di depannya!</span>
              </>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card: Code Comparison */}
      <MacWindowCard left={1055} top={250} width={765} height={680} headerLabel="perbaikan-kasus-2.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div
            style={{
              padding: '22px 24px',
              borderRadius: 22,
              background: CORAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
                <JuniorIcon name="cross" size={28} />
                <span>Salah:</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: MUTED }}>Langsung kanan → Nabrak batu!</div>
            </div>
            <DebugArrowBlock dir="right" size={82} isBug />
          </div>

          <div style={{ ...row, justifyContent: 'center', gap: 12, fontSize: 36, fontWeight: 800 }}>
            <JuniorIcon name="arrow-down" size={34} />
            <span>Ganti Menjadi</span>
            <JuniorIcon name="arrow-down" size={34} />
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: 22,
              background: TEAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${TEAL}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
                <JuniorIcon name="check" size={28} />
                <span>Ganti jadi:</span>
              </div>
              <div style={{ ...row, gap: 8, fontSize: 22, fontWeight: 700, color: '#047857' }}>
                <JuniorIcon name="flag" size={22} />
                <span>Hore, Sampai Finis!</span>
              </div>
            </div>
            <div style={{ ...row, gap: 12 }}>
              <DebugArrowBlock dir="up" size={86} isFixed showRightTab />
              <DebugArrowBlock dir="right" size={86} isFixed />
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Detektif Kode (Boleh vs Jangan)
// ============================================================================
const Slide08Tips: Page = () => (
  <JuniorFrame badge="TIPS DETEKTIF KODE" accentDot={TEAL}>
    <SlideTitle>
      Rahasia <Highlight>Detektif Hebat!</Highlight>
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
          <JuniorIcon name="magnifier" size={44} />
        </div>

        <div
          style={{
            borderRadius: 24,
            background: TEAL_SOFT,
            border: `3px solid ${CHARCOAL}`,
            padding: '18px 24px',
            ...row,
            justifyContent: 'center',
            gap: 24,
          }}
        >
          <BikoMascot pose="thumbs-up" width={165} />
          <div style={{ ...row, gap: 10 }}>
            <DebugArrowBlock dir="up" size={72} isFixed showRightTab />
            <DebugArrowBlock dir="right" size={72} isFixed />
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
            <JuniorIcon name="happy" size={32} />
            <span><strong>Tetap Tenang</strong> kalau karakter nyasar</span>
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
            <JuniorIcon name="footprints" size={32} />
            <span><strong>Cek Ulang</strong> blok satu per satu</span>
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
          <JuniorIcon name="cloud-sad" size={44} />
        </div>

        {/* Frowning Storm Cloud with Red Cross */}
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
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="sad" size={32} />
            <span><strong>Sedih atau Marah</strong> saat ada salah</span>
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
            <JuniorIcon name="see-no-evil" size={32} />
            <span><strong>Menyerah</strong> sebelum mencoba lagi</span>
          </div>
        </div>
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Perbaiki Kode Biko! (3 Blok + Game Debugging)
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  // Pre-filled buggy sequence: ['right', 'down', 'up'], where slot 2 ('down') is the Bug!
  // Correct sequence: ['right', 'up', 'up'] from (2,0) -> (2,1) -> (1,1) -> (0,1 Flag!)
  const [slots, setSlots] = useState<(Dir | null)[]>(['right', 'down', 'up']);
  const [bikoPos, setBikoPos] = useState<[number, number]>([2, 0]);
  const [status, setStatus] = useState<'idle' | 'running' | 'win' | 'bug'>('idle');
  const [message, setMessage] = useState<{ icon?: JuniorIconName; text: string }>({
    icon: 'bug',
    text: 'Ada 1 Bug berkedip merah! Tekan "Jalan!" atau perbaiki slot ke-2.',
  });
  const [dragDir, setDragDir] = useState<Dir | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const isBugInSlot = (idx: number, dir: Dir | null) => idx === 1 && dir === 'down';

  const replaceEmptyOrBug = (dir: Dir) => {
    if (status === 'running') return;
    const emptyIdx = slots.findIndex((s) => s === null);
    if (emptyIdx !== -1) {
      const next = [...slots];
      next[emptyIdx] = dir;
      setSlots(next);
      setStatus('idle');
      setBikoPos([2, 0]);
      setMessage({ text: 'Blok terpasang! Tekan "Jalan!" untuk menguji kode.' });
      return;
    }
    // If all full and slot 1 still has bug, swap slot 1 directly for fast kid UX
    if (slots[1] === 'down') {
      const next = [...slots];
      next[1] = dir;
      setSlots(next);
      setStatus('idle');
      setBikoPos([2, 0]);
      setMessage({ text: 'Blok ke-2 diganti! Tekan "Jalan!" untuk menguji kode.' });
    }
  };

  const removeSlot = (idx: number) => {
    if (status === 'running') return;
    const next = [...slots];
    next[idx] = null;
    setSlots(next);
    setStatus('idle');
    setBikoPos([2, 0]);
    setMessage({ text: `Blok ke-${idx + 1} dibuang! Pilih blok panah pengganti.` });
  };

  const resetBug = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setSlots(['right', 'down', 'up']);
    setBikoPos([2, 0]);
    setStatus('idle');
    setMessage({ icon: 'bug', text: 'Ada 1 Bug berkedip merah! Tekan "Jalan!" atau perbaiki slot ke-2.' });
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

  const runDebugCode = () => {
    if (status === 'running') return;
    const seq = slots.filter((s): s is Dir => s !== null);
    if (seq.length === 0) {
      setMessage({ text: 'Pasang blok panah dulu di kotak urutan!' });
      return;
    }
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStatus('running');
    setBikoPos([2, 0]);
    setMessage({ text: 'Detektif Biko menjalankan kode...' });

    const obstacles = new Set(['1,0', '2,2']);
    let r = 2;
    let c = 0;

    const stepNext = (i: number) => {
      if (i >= seq.length) {
        if (r === 0 && c === 1) {
          setStatus('win');
          setMessage({ icon: 'party', text: 'Berhasil! Semua Bug tertangkap & Biko sampai Finis!' });
        } else {
          setStatus('bug');
          setMessage({ icon: 'bug', text: 'Masih ada Bug! Biko belum sampai ke Bendera Finis.' });
        }
        return;
      }

      const d = seq[i];
      if (d === 'up') r -= 1;
      if (d === 'down') r += 1;
      if (d === 'left') c -= 1;
      if (d === 'right') c += 1;

      if (r < 0 || r > 2 || c < 0 || c > 2) {
        setStatus('bug');
        setMessage({ icon: 'bug', text: `Bug di Blok ${i + 1}! Biko keluar peta! Klik blok salah untuk membuang.` });
        return;
      }

      if (obstacles.has(`${r},${c}`)) {
        setStatus('bug');
        setMessage({ icon: 'bug', text: `Bug di Blok ${i + 1}! Biko menabrak rintangan!` });
        return;
      }

      setBikoPos([r, c]);

      if (r === 0 && c === 1) {
        setStatus('win');
        setMessage({ icon: 'party', text: 'Yeay! Debugging Sukses! Biko sampai di Bendera Finis!' });
        return;
      }

      timerRef.current = window.setTimeout(() => stepNext(i + 1), 460);
    };

    timerRef.current = window.setTimeout(() => stepNext(0), 300);
  };

  const stepCards = [
    { num: '1', label: 'Tekan Jalan & lihat nyasarnya', color: SKY, soft: SKY_SOFT },
    { num: '2', label: 'Buang & Ganti blok yang salah', color: SUNNY, soft: SUNNY_SOFT },
    { num: '3', label: 'Coba lagi sampai Finis!', color: TEAL, soft: TEAL_SOFT },
  ];

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={CORAL}>
      <SlideTitle top={120}>
        Misi <Highlight>Tangkap Semua Bug!</Highlight>
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
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
                {sc.label}
              </span>
            </div>
            {idx < 2 && <span style={{ fontSize: 32, fontWeight: 800, color: CHARCOAL }}>➜</span>}
          </Fragment>
        ))}
      </div>

      {/* Bottom Interactive Debugging Game */}
      <MacWindowCard left={X0} top={322} width={1320} height={635} headerLabel="debugging-game.app" padding={26}>
        <div style={{ display: 'grid', gridTemplateColumns: '500px 1fr', gap: 28, height: '100%' }}>
          {/* 3x3 Grid */}
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
                gridTemplateColumns: 'repeat(3, 140px)',
                gridTemplateRows: 'repeat(3, 142px)',
                gap: 10,
              }}
            >
              {[0, 1, 2].map((r) =>
                [0, 1, 2].map((c) => {
                  const hasBiko = bikoPos[0] === r && bikoPos[1] === c;
                  const isBush = r === 1 && c === 0;
                  const isRock = r === 2 && c === 2;
                  const isGoal = r === 0 && c === 1;

                  return (
                    <div
                      key={`${r}-${c}`}
                      style={{
                        borderRadius: 18,
                        background:
                          isBush || isRock
                            ? CORAL_SOFT
                            : isGoal
                              ? SUNNY_SOFT
                              : WHITE,
                        border: hasBiko ? `3.5px solid ${SKY}` : `2.5px solid ${CHARCOAL}`,
                        ...centerCol,
                      }}
                    >
                      {isBush && <BushSvg size={78} />}
                      {isRock && <RockSvg size={78} />}
                      {isGoal && !hasBiko && <FlagSvg size={82} />}
                      {hasBiko && (
                        <BikoDetectiveToken
                          size={94}
                          confused={status === 'bug'}
                          style={{ animation: status === 'win' ? 'cpj8-hop 1s ease-in-out infinite' : undefined }}
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

          {/* Right Controls: Editable Buggy Sequence + Palette */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
                1. Klik blok berkedip merah untuk membuang Bug:
              </div>
              <div
                style={{
                  ...row,
                  gap: 18,
                  padding: '18px 24px',
                  borderRadius: 22,
                  background: '#F8FAFC',
                  border: `3px solid ${CHARCOAL}`,
                }}
              >
                {slots.map((dir, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => removeSlot(idx)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDropSlot(idx)}
                    style={{
                      width: 110,
                      height: 110,
                      borderRadius: 22,
                      background: dir ? WHITE : '#E2E8F0',
                      border: dir ? `3px solid ${CHARCOAL}` : `3px dashed #64748B`,
                      ...centerCol,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                    title="Klik untuk membuang blok ini"
                  >
                    {dir ? (
                      <DebugArrowBlock
                        dir={dir}
                        size={86}
                        stepNum={idx + 1}
                        isBug={isBugInSlot(idx, dir)}
                        isFixed={idx === 1 && dir === 'up'}
                      />
                    ) : (
                      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 20, color: '#64748B' }}>
                        Kosong
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
                2. Klik atau tarik blok pengganti yang benar:
              </div>
              <div style={{ ...row, gap: 16 }}>
                {(['up', 'down', 'left', 'right'] as Dir[]).map((d) => (
                  <div key={d} draggable onDragStart={() => setDragDir(d)} style={{ display: 'inline-flex' }}>
                    <DebugArrowBlock dir={d} size={82} onClick={() => replaceEmptyOrBug(d)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback & Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div
                style={{
                  padding: '12px 18px',
                  borderRadius: 16,
                  background:
                    status === 'win'
                      ? TEAL_SOFT
                      : status === 'bug'
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
                  className="cpj8-card-btn"
                  onClick={runDebugCode}
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
                  className="cpj8-card-btn"
                  onClick={resetBug}
                  style={{
                    padding: '14px 22px',
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
                  <span>Reset Bug</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko on Right */}
      <BikoMascot
        pose={status === 'win' ? 'jump' : 'detective'}
        width={340}
        speechBubble={status === 'win' ? 'Detektif Hebat!' : 'Cari blok merahnya!'}
        style={{ ...abs(1475, 430) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 8 (Celebration Center Card)
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
            animation: live ? `cpj8-confetti ${2.4 + idx * 0.3}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={124} size={62}>
        <span style={{ ...row, justifyContent: 'center', gap: 14 }}>
          <span>
            Hebat! Kamu <Highlight>Detektif Kode!</Highlight>
          </span>
          <JuniorIcon name="party" size={54} />
        </span>
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard left={240} top={245} width={1140} height={675} headerLabel="lencana-detektif-8.app" padding={36}>
        <div
          style={{
            height: '100%',
            ...centerCol,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          {/* Large Gold Medal with Star Magnifier & Wrench */}
          <svg
            width={270}
            height={270}
            viewBox="0 0 240 240"
            fill="none"
            style={{ animation: live ? 'cpj8-float 3s ease-in-out infinite' : undefined }}
          >
            <path d="M74 16 L104 94 H136 L166 16 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
            <path d="M94 16 L120 88 L146 16" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            <circle cx="120" cy="140" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={6} />
            <circle cx="120" cy="140" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={4} />
            {/* Wrench behind Magnifier */}
            <path
              d="M90 166 L146 110 C150 102, 158 100, 162 106 L154 114 L158 118 L166 110 C170 118, 164 128, 154 128 L100 176 Z"
              fill={TEAL}
              stroke={CHARCOAL}
              strokeWidth={3.5}
              strokeLinejoin="round"
            />
            {/* Star Magnifier */}
            <line x1="128" y1="146" x2="152" y2="170" stroke={CHARCOAL} strokeWidth={9} strokeLinecap="round" />
            <circle cx="112" cy="130" r="24" fill="#E0F2FE" stroke={CHARCOAL} strokeWidth={4.5} />
            <path
              d="M112 114 L115 123 L125 124 L117 130 L119 140 L112 135 L105 140 L107 130 L99 124 L109 123 Z"
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
            <span>Lencana Detektif Bug &amp; Debugging</span>
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
            Kamu sudah jago mencari <Highlight color={CORAL_SOFT}>Bug</Highlight> dan memperbaiki{' '}
            <Highlight color="#D1FAE5">Urutan Kode!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko Celebrating on Right */}
      <div style={{ ...abs(1410, 410, 420, 490), ...centerCol }}>
        <BikoMascot
          pose="jump"
          width={380}
          badgeIcon={<JuniorIcon name="magnifier" size={30} />}
          speechBubble="Bug Teratasi!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// Speaker Notes (Talk Track for Mentors teaching Ages 5–7)
// ============================================================================
export const notes: (string | undefined)[] = [
  `Halo Detektif Kode cilik! Di Pertemuan 8 hari ini, Biko memakai topi detektif dan membawa kaca pembesar!
Kita akan belajar mencari blok yang salah (Bug) dan memperbaikinya (Debugging) supaya karakter tidak nyasar lagi!`,

  `Ada dua misi kita hari ini:
1. Menemukan Bug atau blok perintah yang salah.
2. Memperbaiki kodenya — proses ini disebut Debugging!`,

  `Apa itu Bug?
Bug adalah kesalahan di urutan blok perintah. Gara-gara ada satu blok panah yang salah, karakter bisa nyasar keluar jalur atau menabrak rintangan!`,

  `Bagaimana Jurus Detektif Debugging?
1. Cari blok yang bikin nyasar. 2. Buang blok yang salah. 3. Ganti dengan blok yang benar!`,

  `Kasus Detektif #1: Langkahnya Kebanyakan!
Kelinci cuma butuh 2 langkah ke wortel, tapi kodenya tertulis 3 panah kanan ([ ➡️ ] + [ ➡️ ] + [ ➡️ ]). Ayo buang 1 panah berlebih!`,

  `Permainan Cepat! Ayo tebak mana blok yang salah:
Blok 1 (➡️) atau Blok 2 (⬇️)? Biko malah turun menjauhi Bintang!`,

  `Kasus Detektif #2: Salah Belok Nabrak Batu!
Kode langsung [ ➡️ ] bikin Biko menabrak batu. Ganti dengan [ ⬆️ ] lalu [ ➡️ ] supaya belok aman sampai Finis!`,

  `Tips Detektif Hebat:
BOLEH tetap tenang kalau karakter nyasar dan cek ulang blok satu per satu.
JANGAN sedih, marah, atau menyerah saat ada Bug ya!`,

  `Waktunya praktik Game Tangkap Semua Bug!
Klik "Jalan!" untuk melihat blok ke-2 ([ ⬇️ ]) yang bikin Biko keluar jalur, buang blok merahnya, lalu ganti dengan [ ⬆️ ] sampai Biko tiba di Bendera Finis!`,

  `Selamat untuk semua Detektif Kode cilik!
Kalian resmi meraih Lencana Detektif Bug & Debugging!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 8 — Aduh Karakternya Nyasar!',
  createdAt: '2026-11-13T17:30:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03ApaItuBug,
  Slide04JurusDebugging,
  Slide05Kasus1,
  Slide06AyoTebak,
  Slide07Kasus2,
  Slide08Tips,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

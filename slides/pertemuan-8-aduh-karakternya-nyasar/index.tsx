import { useEffect, useRef, useState, type CSSProperties, type DragEvent, type ReactNode } from 'react';
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
  50% { transform: translateY(-8px); }
}
@keyframes cpj8-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-10px) scale(1.04); }
}
@keyframes cpj8-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(8px) rotate(14deg); }
}
@keyframes cpj8-bug-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(244, 91, 73, 0.55); }
  50% { box-shadow: 0 0 0 10px rgba(244, 91, 73, 0); }
}
@keyframes cpj8-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-2deg); }
  75% { transform: translateX(7px) rotate(2deg); }
}
.cpj8-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj8-card-btn:hover {
  transform: translateY(-3px);
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
    hero: 84,
    body: 26,
  },
  radius: 24,
};

const CREAM = '#FFFBF0';
const SAND_GRID = '#F4ECDC';
const WHITE = '#FFFFFF';
const CHARCOAL = '#1E1E2C';
const MUTED = '#525266';
const BORDER_SOFT = '#CBD5E1';
const CARD_SHADOW = '0 6px 18px rgba(30, 30, 44, 0.08)';
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
// Shared Chrome, Typography, Highlights, Bullet Lists & Flat Containers
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

  return (
    <div
      data-osd-interactive="true"
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
      {/* Top Left Header Eyebrow Tag */}
      <div
        style={{
          ...abs(X0, 48),
          ...row,
          gap: 18,
          zIndex: 5,
        }}
      >
        <div
          style={{
            ...row,
            gap: 10,
            padding: '8px 20px',
            borderRadius: 12,
            background: WHITE,
            border: `2px solid ${CHARCOAL}`,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 99,
              background: accentDot,
              border: `2px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>{badge}</span>
        </div>
      </div>

      {/* Top Right Slide Number Indicator */}
      <div
        style={{
          ...abs(1690, 48),
          ...row,
          gap: 8,
          padding: '8px 18px',
          borderRadius: 12,
          background: WHITE,
          border: `2px solid ${CHARCOAL}`,
          fontSize: 19,
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

      {/* Bottom Program Strip */}
      <div
        style={{
          ...abs(X0, 1022, W, 32),
          ...row,
          justifyContent: 'space-between',
          fontSize: 18,
          fontWeight: 700,
          color: '#6E6A7C',
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
        <span>Pertemuan 8 • Aduh, Karakternya Nyasar!</span>
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
      padding: '2px 16px 5px',
      borderRadius: 14,
      boxDecorationBreak: 'clone',
      WebkitBoxDecorationBreak: 'clone',
      display: 'inline-block',
    }}
  >
    {children}
  </span>
);

const InlineHighlight = ({
  children,
  color = STABILO,
}: {
  children: ReactNode;
  color?: string;
}) => (
  <mark
    style={{
      background: color,
      color: CHARCOAL,
      fontWeight: 800,
      padding: '1px 9px 2px',
      borderRadius: 8,
    }}
  >
    {children}
  </mark>
);

const SlideTitle = ({
  children,
  top = 114,
  size = 54,
  maxWidth = 1560,
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
      lineHeight: 1.14,
      letterSpacing: '-0.015em',
      color: CHARCOAL,
      textAlign: align,
    }}
  >
    {children}
  </h2>
);

const SectionHeading = ({
  children,
  icon,
  accentColor = CHARCOAL,
  size = 30,
}: {
  children: ReactNode;
  icon?: JuniorIconName;
  accentColor?: string;
  size?: number;
}) => (
  <h3
    style={{
      margin: 0,
      ...row,
      gap: 10,
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 700,
      lineHeight: 1.2,
      color: accentColor,
    }}
  >
    {icon && <JuniorIcon name={icon} size={Math.round(size * 0.95)} />}
    <span>{children}</span>
  </h3>
);

const BulletList = ({
  items,
  bulletColor = TEAL,
  fontSize = 24,
  gap = 12,
}: {
  items: ReactNode[];
  bulletColor?: string;
  fontSize?: number;
  gap?: number;
}) => (
  <ul
    style={{
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap,
    }}
  >
    {items.map((item, idx) => (
      <li
        key={idx}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          fontSize,
          fontWeight: 700,
          lineHeight: 1.38,
          color: CHARCOAL,
          textAlign: 'left',
        }}
      >
        <span
          aria-hidden
          style={{
            width: 11,
            height: 11,
            marginTop: Math.round(fontSize * 0.42),
            borderRadius: 99,
            background: bulletColor,
            border: `2px solid ${CHARCOAL}`,
            flexShrink: 0,
          }}
        />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

/** Flat content panel (replaces button-like 3D cards for non-interactive boxes) */
const InfoPanel = ({
  children,
  bg = WHITE,
  borderColor = CHARCOAL,
  padding = 28,
  style,
}: {
  children: ReactNode;
  bg?: string;
  borderColor?: string;
  padding?: number;
  style?: CSSProperties;
}) => (
  <div
    style={{
      background: bg,
      borderRadius: 24,
      border: `3px solid ${borderColor}`,
      boxShadow: CARD_SHADOW,
      padding,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

const MacWindowCard = ({
  left,
  top,
  width,
  height,
  titleBarColor = WHITE,
  headerLabel,
  children,
  padding = 32,
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
      borderRadius: 26,
      border: `3px solid ${CHARCOAL}`,
      boxShadow: CARD_SHADOW,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        height: 48,
        background: titleBarColor,
        borderBottom: `2.5px solid ${CHARCOAL}`,
        padding: '0 22px',
        ...row,
        justifyContent: 'space-between',
        flexShrink: 0,
      }}
    >
      <div style={{ ...row, gap: 9 }}>
        <span style={{ width: 14, height: 14, borderRadius: 99, background: CORAL, border: `2px solid ${CHARCOAL}` }} />
        <span style={{ width: 14, height: 14, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}` }} />
        <span style={{ width: 14, height: 14, borderRadius: 99, background: TEAL, border: `2px solid ${CHARCOAL}` }} />
      </div>
      {headerLabel && (
        <span style={{ fontSize: 16, fontWeight: 800, color: MUTED, letterSpacing: '0.03em' }}>
          {headerLabel}
        </span>
      )}
      <div style={{ width: 56 }} />
    </div>
    <div style={{ flex: 1, padding, position: 'relative', overflow: 'hidden' }}>{children}</div>
  </div>
);

// ============================================================================
// Pertemuan 8 Visual Assets: Cute Bug, Wrench, Magnifier, Blocks & Tokens
// ============================================================================
type Dir = 'up' | 'down' | 'left' | 'right';

const DIR_META: Record<Dir, { label: string; color: string; rot: number }> = {
  up: { label: 'Atas', color: TEAL, rot: -90 },
  down: { label: 'Bawah', color: CORAL, rot: 90 },
  left: { label: 'Kiri', color: SUNNY, rot: 180 },
  right: { label: 'Kanan', color: SKY, rot: 0 },
};

/** Friendly cartoon red ladybug ("Bug") */
const BugSvg = ({ size = 56, style }: { size?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
    <path
      d="M20 34 L10 28 M18 46 L8 46 M22 58 L12 64 M60 34 L70 28 M62 46 L72 46 M58 58 L68 64"
      stroke={CHARCOAL}
      strokeWidth={3.8}
      strokeLinecap="round"
    />
    <path d="M33 20 Q28 10 22 12 M47 20 Q52 10 58 12" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" />
    <circle cx="22" cy="12" r="3" fill={CHARCOAL} />
    <circle cx="58" cy="12" r="3" fill={CHARCOAL} />
    <circle cx="40" cy="25" r="11" fill={CHARCOAL} />
    <circle cx="36" cy="24" r="2.2" fill={WHITE} />
    <circle cx="44" cy="24" r="2.2" fill={WHITE} />
    <ellipse cx="40" cy="48" rx="22" ry="20" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.8} />
    <line x1="40" y1="28" x2="40" y2="68" stroke={CHARCOAL} strokeWidth={3.2} />
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

/** Tactile Directional Arrow Block with Bug / Cross / Fixed states (button ONLY when onClick is passed) */
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

  const content = (
    <>
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
        <svg
          width={30}
          height={30}
          viewBox="0 0 28 28"
          fill="none"
          style={{
            position: 'absolute',
            top: -12,
            right: -10,
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          <circle cx="14" cy="14" r="12" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.4} />
          <path d="M9.5 9.5 L18.5 18.5 M18.5 9.5 L9.5 18.5" stroke={WHITE} strokeWidth={3} strokeLinecap="round" />
        </svg>
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
    </>
  );

  const sharedStyle: CSSProperties = {
    position: 'relative',
    width: size,
    height: size,
    borderRadius: Math.round(size * 0.24),
    background: bg,
    border: `3px solid ${CHARCOAL}`,
    boxShadow: onClick
      ? active
        ? `0 0 0 5px ${SUNNY}, 0 5px 0 ${CHARCOAL}`
        : `0 5px 0 ${CHARCOAL}`
      : active
        ? `0 0 0 5px ${SUNNY}`
        : CARD_SHADOW,
    animation: isBug ? 'cpj8-bug-pulse 1.5s ease-in-out infinite' : undefined,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flexShrink: 0,
    boxSizing: 'border-box',
  };

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="cpj8-card-btn"
        style={{ ...sharedStyle, cursor: 'pointer' }}
        aria-label={`Blok panah ${m.label}`}
      >
        {content}
      </button>
    );
  }

  return (
    <div style={sharedStyle} aria-label={`Blok panah ${m.label}`}>
      {content}
    </div>
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
    <path d="M22 28 C22 14, 58 14, 58 28 Z" fill="#92400E" stroke={CHARCOAL} strokeWidth={3} />
    <path d="M20 29 Q40 22 62 29 L66 33 Q40 29 18 33 Z" fill="#78350F" stroke={CHARCOAL} strokeWidth={2.5} />
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
// SLIDE 01 — Cover (Heading H1 + Bullet InfoPanel + Detective Folder Showcase)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 8" accentDot={CORAL}>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 170, 820, 770), display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
            padding: '8px 18px',
            borderRadius: 12,
            background: CORAL_SOFT,
            border: `2px solid ${CHARCOAL}`,
            fontSize: 20,
            fontWeight: 800,
            color: '#B91C1C',
          }}
        >
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 80,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          Aduh, Karakternya <Highlight>Nyasar!</Highlight>
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.35,
            color: MUTED,
          }}
        >
          Detektif Kode Cari &amp; Perbaiki Blok Salah
        </p>

        {/* Clean non-button Info Panel with Bullet Points */}
        <InfoPanel bg={WHITE} padding={26} style={{ marginTop: 6 }}>
          <SectionHeading icon="magnifier" size={26} accentColor={CHARCOAL}>
            Yang Kita Pelajari:
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={CORAL}
              fontSize={24}
              gap={12}
              items={[
                <>
                  Cari <InlineHighlight color="#FECACA">blok salah (Bug)</InlineHighlight>.
                </>,
                <>
                  Buang panah yang <InlineHighlight>bikin nyasar</InlineHighlight>.
                </>,
                <>
                  Ganti dengan <InlineHighlight color="#D1FAE5">panah benar</InlineHighlight>.
                </>,
              ]}
            />
          </div>
        </InfoPanel>
      </div>

      {/* Right Visual Showcase: Detective Case Folder Card */}
      <div style={{ ...abs(1000, 155, 820, 795), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            left: 88,
            top: 26,
            padding: '10px 26px',
            borderRadius: '18px 18px 0 0',
            background: SUNNY,
            border: `4px solid ${CHARCOAL}`,
            borderBottom: 'none',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 21,
            fontWeight: 700,
            zIndex: 2,
          }}
        >
          KASUS DETEKTIF #08
        </div>

        <div
          style={{
            position: 'absolute',
            top: 72,
            width: 650,
            height: 610,
            borderRadius: '0 44px 190px 44px',
            background: 'linear-gradient(155deg, #FEF2F2 0%, #FFFBEB 55%, #EFF6FF 100%)',
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `12px 12px 0 ${CORAL}`,
            overflow: 'hidden',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 650 610" fill="none" style={{ opacity: 0.28 }}>
            <circle cx="325" cy="310" r="220" stroke={CORAL} strokeWidth={3} strokeDasharray="10 10" />
            <circle cx="325" cy="310" r="145" stroke={SKY} strokeWidth={3} />
          </svg>
        </div>

        {/* Arrow Block Chain with Bug Block (Flat InfoPanel) */}
        <InfoPanel
          bg={WHITE}
          padding={18}
          style={{
            position: 'absolute',
            left: 20,
            top: 108,
            borderRadius: 22,
            zIndex: 4,
          }}
        >
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700, color: MUTED, marginBottom: 10 }}>
            Periksa Rantai Kode:
          </div>
          <div style={{ ...row, gap: 10 }}>
            <DebugArrowBlock dir="right" size={72} stepNum={1} showRightTab />
            <DebugArrowBlock dir="up" size={72} stepNum={2} showRightTab />
            <DebugArrowBlock dir="down" size={72} stepNum={3} isBug />
          </div>
        </InfoPanel>

        <BikoMascot
          pose="detective"
          width={390}
          style={{ position: 'relative', zIndex: 3, marginTop: 155, marginLeft: 130 }}
        />

        {/* Cute Floating Bug Card (Flat InfoPanel) */}
        <InfoPanel
          bg={WHITE}
          padding={12}
          style={{
            position: 'absolute',
            right: 26,
            bottom: 48,
            borderRadius: 20,
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
        </InfoPanel>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 InfoPanel Cards with SectionHeading + BulletList)
// ============================================================================
const Slide02Misi: Page = () => (
  <JuniorFrame badge="MISI HARI INI" accentDot={CORAL}>
    <SlideTitle>
      Apa <Highlight>Misi Kita</Highlight> Hari Ini?
    </SlideTitle>

    <MacWindowCard left={X0} top={215} width={1320} height={745} headerLabel="misi-pertemuan-8" padding={34}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, height: '100%' }}>
        {/* Misi 1 */}
        <InfoPanel
          bg={CORAL_SOFT}
          borderColor={CHARCOAL}
          padding={28}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#B91C1C', letterSpacing: '0.05em' }}>
              MISI 1
            </span>
            <SectionHeading icon="bug" size={32}>
              Temukan <Highlight color={STABILO}>Bug</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${CORAL}`,
              padding: '24px 20px',
              ...row,
              justifyContent: 'center',
              gap: 22,
            }}
          >
            <MagnifierSvg size={76} />
            <DebugArrowBlock dir="down" size={78} isBug />
          </div>

          <BulletList
            bulletColor={CORAL}
            fontSize={24}
            gap={12}
            items={[
              <>
                Cari <InlineHighlight color="#FECACA">blok salah</InlineHighlight> di kode.
              </>,
              <>
                Panah salah bikin <InlineHighlight color={WHITE}>nyasar</InlineHighlight>.
              </>,
            ]}
          />
        </InfoPanel>

        {/* Misi 2 */}
        <InfoPanel
          bg={TEAL_SOFT}
          borderColor={CHARCOAL}
          padding={28}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#047857', letterSpacing: '0.05em' }}>
              MISI 2
            </span>
            <SectionHeading icon="wrench" size={32}>
              Perbaiki (<Highlight color="#A7F3D0">Debugging</Highlight>)
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${TEAL}`,
              padding: '24px 20px',
              ...row,
              justifyContent: 'center',
              gap: 22,
            }}
          >
            <WrenchStarSvg size={76} />
            <DebugArrowBlock dir="up" size={78} isFixed />
          </div>

          <BulletList
            bulletColor={TEAL}
            fontSize={24}
            gap={12}
            items={[
              <>
                Buang blok <InlineHighlight color="#FECACA">yang salah</InlineHighlight>.
              </>,
              <>
                Pasang blok <InlineHighlight color="#D1FAE5">panah benar</InlineHighlight>.
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="point-left"
      width={360}
      speechBubble="Ayo tangkap Bug!"
      style={{ ...abs(1455, 315) }}
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

      {/* Left Spotlight Card */}
      <MacWindowCard left={X0} top={215} width={960} height={745} headerLabel="apa-itu-bug" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <SectionHeading size={26}>Kode salah bikin nyasar:</SectionHeading>
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
                boxShadow: `0 4px 0 ${CHARCOAL}`,
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
              gridTemplateColumns: 'repeat(3, 175px)',
              gridTemplateRows: 'repeat(3, 130px)',
              gap: 12,
              justifyContent: 'center',
              alignContent: 'center',
              background: '#F8FAFC',
              padding: 18,
              borderRadius: 22,
              border: `2.5px solid ${CHARCOAL}`,
            }}
          >
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => {
                const isStart = r === 1 && c === 0;
                const isWrongWay = r === 2 && c === 1;
                const isFlag = r === 0 && c === 2;

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
                    }}
                  >
                    {isStart && (
                      <span style={{ ...row, gap: 6, fontSize: 17, fontWeight: 800, color: '#1D4ED8' }}>
                        <span>START</span>
                        <JuniorIcon name="arrow-right" size={18} />
                      </span>
                    )}
                    {r === 1 && c === 1 && <JuniorIcon name="arrow-down" size={30} />}
                    {isWrongWay && (
                      <div style={{ ...row, gap: 4 }}>
                        <BikoDetectiveToken size={64} confused />
                        <BushSvg size={58} />
                      </div>
                    )}
                    {isFlag && <FlagSvg size={72} />}
                  </div>
                );
              }),
            )}
          </div>

          <div
            style={{
              ...row,
              justifyContent: 'space-between',
              padding: '12px 24px',
              borderRadius: 20,
              background: CORAL_SOFT,
              border: `2.5px solid ${CORAL}`,
            }}
          >
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              Urutan Blok:
            </span>
            <div style={{ ...row, gap: 14 }}>
              <DebugArrowBlock dir="right" size={64} stepNum={1} showRightTab />
              <DebugArrowBlock dir="down" size={64} stepNum={2} isBug={inspectBug} />
            </div>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: '#B91C1C' }}>
              Nyasar ke semak!
            </span>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: Flat InfoPanels + Biko */}
      <div style={{ ...abs(1095, 215, 725, 745), display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
        <InfoPanel bg={CORAL_SOFT} padding={24} style={{ ...row, gap: 20 }}>
          <BugSvg size={76} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SectionHeading size={28} accentColor="#B91C1C">
              Blok Perintah Salah
            </SectionHeading>
            <BulletList
              bulletColor={CORAL}
              fontSize={22}
              gap={8}
              items={[
                <>
                  Kesalahan kode disebut <InlineHighlight color="#FECACA">Bug</InlineHighlight>.
                </>,
                <>Panah menunjuk arah salah.</>,
              ]}
            />
          </div>
        </InfoPanel>

        <InfoPanel bg={SUNNY_SOFT} padding={24} style={{ ...row, gap: 20 }}>
          <BikoDetectiveToken size={76} confused />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SectionHeading size={28}>Bikin Karakter Nyasar</SectionHeading>
            <BulletList
              bulletColor={SUNNY}
              fontSize={22}
              gap={8}
              items={[
                <>Karakter ikut kode tertulis.</>,
                <>
                  Arah salah bikin <InlineHighlight color={WHITE}>tersesat</InlineHighlight>!
                </>,
              ]}
            />
          </div>
        </InfoPanel>

        <div style={{ flex: 1, ...centerCol }}>
          <BikoMascot
            pose="thinking"
            width={235}
            speechBubble="Blok mana yang salah?"
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
    bullets: ReactNode[];
    color: string;
    soft: string;
    badge: string;
    visual: ReactNode;
  }[] = [
    {
      num: '1',
      title: 'Cari Blok Nyasar',
      bullets: [
        <>
          Cek <InlineHighlight color={SKY_SOFT}>urutan panah</InlineHighlight>.
        </>,
        <>Temukan blok merah.</>,
      ],
      color: SKY,
      soft: SKY_SOFT,
      badge: 'LANGKAH 1 • CARI',
      visual: (
        <div style={{ ...row, gap: 12 }}>
          <MagnifierSvg size={62} />
          <DebugArrowBlock dir="down" size={62} isBug />
        </div>
      ),
    },
    {
      num: '2',
      title: 'Buang Blok Salah',
      bullets: [
        <>
          Lepas <InlineHighlight color="#FECACA">blok merah</InlineHighlight>.
        </>,
        <>Sisihkan dari barisan.</>,
      ],
      color: CORAL,
      soft: CORAL_SOFT,
      badge: 'LANGKAH 2 • BUANG',
      visual: (
        <div style={{ ...row, gap: 12 }}>
          <DebugArrowBlock dir="down" size={62} crossed />
          <JuniorIcon name="trash" size={38} />
        </div>
      ),
    },
    {
      num: '3',
      title: 'Ganti Blok Benar',
      bullets: [
        <>
          Pasang <InlineHighlight color="#D1FAE5">panah tepat</InlineHighlight>.
        </>,
        <>Jalan sampai finis!</>,
      ],
      color: TEAL,
      soft: TEAL_SOFT,
      badge: 'LANGKAH 3 • GANTI',
      visual: (
        <div style={{ ...row, gap: 12 }}>
          <WrenchStarSvg size={60} />
          <DebugArrowBlock dir="up" size={62} isFixed />
        </div>
      ),
    },
  ];

  const hints: { icon: JuniorIconName; text: string }[] = [
    { icon: 'magnifier', text: 'Langkah 1: Cari blok merah yang bikin nyasar!' },
    { icon: 'trash', text: 'Langkah 2: Buang blok salah dari barisan!' },
    { icon: 'wrench', text: 'Langkah 3: Pasang blok hijau yang benar!' },
  ];

  return (
    <JuniorFrame badge="JURUS DETEKTIF KODE" accentDot={TEAL}>
      <SlideTitle>
        Jurus <Highlight>Debugging!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={215} width={1720} height={745} headerLabel="jurus-debugging" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, flex: 1 }}>
            {steps.map((s, idx) => {
              const active = phase === idx;
              return (
                <button
                  key={s.num}
                  type="button"
                  className="cpj8-card-btn"
                  onClick={() => setPhase(idx as 0 | 1 | 2)}
                  style={{
                    borderRadius: 24,
                    background: s.soft,
                    border: `3.5px solid ${CHARCOAL}`,
                    boxShadow: active ? `0 0 0 6px ${SUNNY}, 0 8px 0 ${CHARCOAL}` : `0 7px 0 ${s.color}`,
                    padding: '24px 26px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 14,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: s.color === CORAL ? '#B91C1C' : s.color === SKY ? '#1D4ED8' : '#047857',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {s.badge}
                  </span>

                  <div
                    style={{
                      padding: '14px 24px',
                      borderRadius: 20,
                      background: WHITE,
                      border: `2.5px solid ${CHARCOAL}`,
                      ...centerCol,
                    }}
                  >
                    {s.visual}
                  </div>

                  <SectionHeading size={31}>{s.title}</SectionHeading>

                  <div style={{ width: '100%' }}>
                    <BulletList bulletColor={s.color} fontSize={22} gap={8} items={s.bullets} />
                  </div>
                </button>
              );
            })}
          </div>

          <div
            style={{
              ...row,
              justifyContent: 'space-between',
              padding: '14px 24px',
              borderRadius: 20,
              background: '#F8FAFC',
              border: `2.5px solid ${CHARCOAL}`,
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

      {/* Left Spotlight Card: Bunny 3-Box + Overshoot */}
      <MacWindowCard left={X0} top={215} width={940} height={745} headerLabel="kasus-1-kelinci" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <SectionHeading icon="carrot" size={26}>
              Jalan Kelinci ke Wortel:
            </SectionHeading>
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
              <span>{fixed ? 'Lihat Bug' : 'Perbaiki!'}</span>
            </button>
          </div>

          <div
            style={{
              ...row,
              justifyContent: 'center',
              gap: 14,
              background: '#F8FAFC',
              padding: '38px 20px',
              borderRadius: 22,
              border: `2.5px solid ${CHARCOAL}`,
            }}
          >
            <div style={{ width: 170, height: 175, borderRadius: 20, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, ...centerCol }}>
              <BunnySvg size={102} />
              <span style={{ fontSize: 16, fontWeight: 800, color: '#1D4ED8' }}>START</span>
            </div>

            <div style={{ width: 170, height: 175, borderRadius: 20, background: TEAL_SOFT, border: `2.5px dashed ${TEAL}`, ...centerCol, gap: 6 }}>
              <JuniorIcon name="arrow-right" size={34} />
              <span style={{ fontSize: 18, fontWeight: 800, color: '#047857' }}>Langkah 1</span>
            </div>

            <div
              style={{
                width: 170,
                height: 175,
                borderRadius: 20,
                background: SUNNY_SOFT,
                border: fixed ? `4px solid ${TEAL}` : `2.5px solid ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              {fixed ? (
                <>
                  <div style={{ ...row, gap: 4 }}>
                    <BunnySvg size={78} />
                    <CarrotSvg size={64} />
                  </div>
                  <span style={{ fontSize: 17, fontWeight: 800, color: '#047857' }}>PAS! (2 Kanan)</span>
                </>
              ) : (
                <>
                  <CarrotSvg size={92} />
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#B45309' }}>WORTEL</span>
                </>
              )}
            </div>

            {!fixed && (
              <div
                style={{
                  width: 155,
                  height: 175,
                  borderRadius: 20,
                  background: CORAL_SOFT,
                  border: `3px dashed ${CORAL}`,
                  ...centerCol,
                }}
              >
                <BunnySvg size={80} />
                <span style={{ fontSize: 16, fontWeight: 800, color: '#B91C1C' }}>BABLAS! (3)</span>
              </div>
            )}
          </div>

          <div
            style={{
              padding: '18px 24px',
              borderRadius: 20,
              background: fixed ? TEAL_SOFT : CORAL_SOFT,
              border: `2.5px solid ${fixed ? TEAL : CORAL}`,
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <DebugArrowBlock dir="right" size={74} stepNum={1} showRightTab />
              <DebugArrowBlock dir="right" size={74} stepNum={2} showRightTab={!fixed} />
              {!fixed && <DebugArrowBlock dir="right" size={74} stepNum={3} isBug crossed />}
            </div>
            <div style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700, color: fixed ? '#047857' : '#B91C1C' }}>
              <JuniorIcon name={fixed ? 'check' : 'cross'} size={24} />
              <span>{fixed ? 'Pas 2 langkah!' : 'Panah ke-3 bablas!'}</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card: Summary & Fix with Bullets */}
      <MacWindowCard left={1075} top={215} width={745} height={745} headerLabel="perbaikan-kasus-1" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
          <InfoPanel bg={SUNNY_SOFT} padding={20}>
            <SectionHeading icon="carrot" size={27}>
              Wortel Dekat Sekali
            </SectionHeading>
            <div style={{ marginTop: 10 }}>
              <BulletList
                bulletColor={SUNNY}
                fontSize={22}
                gap={8}
                items={[
                  <>
                    Kelinci cuma butuh <InlineHighlight color={WHITE}>2 langkah</InlineHighlight>.
                  </>,
                ]}
              />
            </div>
          </InfoPanel>

          <InfoPanel bg={CORAL_SOFT} padding={20}>
            <SectionHeading icon="cross" size={27} accentColor="#B91C1C">
              Kode Salah (3 Panah)
            </SectionHeading>
            <div style={{ ...row, gap: 12, marginTop: 12 }}>
              <DebugArrowBlock dir="right" size={62} stepNum={1} showRightTab />
              <DebugArrowBlock dir="right" size={62} stepNum={2} showRightTab />
              <DebugArrowBlock dir="right" size={62} stepNum={3} isBug crossed />
            </div>
          </InfoPanel>

          <InfoPanel bg={TEAL_SOFT} padding={20} style={{ ...row, justifyContent: 'space-between', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <SectionHeading icon="check" size={27} accentColor="#047857">
                Solusi: Buang 1 Panah
              </SectionHeading>
              <BulletList
                bulletColor={TEAL}
                fontSize={22}
                gap={6}
                items={[
                  <>
                    Pakai <InlineHighlight color="#D1FAE5">2 panah kanan</InlineHighlight> saja.
                  </>,
                ]}
              />
              <div style={{ ...row, gap: 12 }}>
                <DebugArrowBlock dir="right" size={62} stepNum={1} isFixed showRightTab />
                <DebugArrowBlock dir="right" size={62} stepNum={2} isFixed />
              </div>
            </div>
            <BikoMascot pose="thumbs-up" width={115} />
          </InfoPanel>
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
      <SlideTitle align="center" top={104}>
        Blok Mana yang <Highlight>Salah?</Highlight>
      </SlideTitle>

      {/* Top Interactive Map (3x3) */}
      <MacWindowCard left={220} top={195} width={1480} height={310} headerLabel="cari-blok-salah" padding={20}>
        <div style={{ ...row, justifyContent: 'center', gap: 52, height: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 110px)',
              gridTemplateRows: 'repeat(3, 66px)',
              gap: 8,
              background: '#F8FAFC',
              padding: 12,
              borderRadius: 20,
              border: `2.5px solid ${CHARCOAL}`,
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
                      border: `2px solid ${CHARCOAL}`,
                      ...centerCol,
                    }}
                  >
                    {isStart && <BikoDetectiveToken size={48} />}
                    {isAfterRight && <JuniorIcon name="arrow-right" size={26} />}
                    {isWrongDown && <JuniorIcon name="dizzy" size={28} />}
                    {isStar && <StarSvg size={48} />}
                  </div>
                );
              }),
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SectionHeading size={28}>Lihat Urutan Blok:</SectionHeading>
            <div style={{ ...row, gap: 16 }}>
              <DebugArrowBlock dir="right" size={76} stepNum={1} showRightTab />
              <DebugArrowBlock dir="down" size={76} stepNum={2} isBug={choice === 'b2'} />
            </div>
            <BulletList
              bulletColor={CORAL}
              fontSize={22}
              gap={6}
              items={[
                <>
                  Biko malah <InlineHighlight color="#FECACA">turun ke bawah</InlineHighlight>, menjauhi Bintang!
                </>,
              ]}
            />
          </div>
        </div>
      </MacWindowCard>

      {/* Bottom 2 Large Choice Buttons */}
      <button
        type="button"
        className="cpj8-card-btn"
        onClick={() => setChoice('b1')}
        style={{
          ...abs(160, 535, 580, 325),
          borderRadius: 26,
          background: choice === 'b1' ? CORAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 'b1' ? `0 0 0 6px ${CORAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${SKY}`,
          padding: 24,
          ...centerCol,
          justifyContent: 'space-between',
          animation: choice === 'b1' ? 'cpj8-shake 0.35s ease' : undefined,
        }}
      >
        <span style={{ fontSize: 19, fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.06em' }}>
          PILIHAN A (KLIK UNTUK PILIH)
        </span>
        <DebugArrowBlock dir="right" size={100} stepNum={1} />
        <SectionHeading size={32}>
          Blok 1 (Kanan) {choice === 'b1' && '— Sudah Benar!'}
        </SectionHeading>
      </button>

      <div style={{ ...abs(760, 520, 400, 365), ...centerCol }}>
        <BikoMascot
          pose={choice === 'b2' ? 'thumbs-up' : 'question'}
          width={240}
          speechBubble={
            choice === 'b2'
              ? 'Tepat! Blok 2 Bug!'
              : choice === 'b1'
                ? 'Blok 1 sudah benar!'
                : 'Mana yang salah?'
          }
        />
      </div>

      <button
        type="button"
        className="cpj8-card-btn"
        onClick={() => setChoice('b2')}
        style={{
          ...abs(1180, 535, 580, 325),
          borderRadius: 26,
          background: choice === 'b2' ? TEAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 'b2' ? `0 0 0 6px ${TEAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${CORAL}`,
          padding: 24,
          ...centerCol,
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 19, fontWeight: 800, color: '#B91C1C', letterSpacing: '0.06em' }}>
          PILIHAN B (KLIK UNTUK PILIH)
        </span>
        <DebugArrowBlock dir="down" size={100} stepNum={2} isBug />
        <SectionHeading size={32}>
          Blok 2 (Bawah) {choice === 'b2' && '— Ini Bug!'}
        </SectionHeading>
      </button>

      {/* Flat Feedback Banner */}
      <div style={{ ...abs(420, 905, 1080, 62), ...centerCol }}>
        <div
          style={{
            padding: '10px 28px',
            borderRadius: 16,
            background: choice === 'b2' ? TEAL_SOFT : SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 23,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          {choice === 'b2' ? (
            <>
              <JuniorIcon name="party" size={24} />
              <span>
                Betul! <InlineHighlight color="#A7F3D0">Blok 2</InlineHighlight> bikin turun — harusnya Atas!
              </span>
            </>
          ) : (
            <span>Klik blok yang salah: Pilihan A atau Pilihan B!</span>
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
      <MacWindowCard left={X0} top={215} width={920} height={745} headerLabel="kasus-2-batu" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <SectionHeading icon="rock" size={26}>
              Peta Labirin 3×3:
            </SectionHeading>
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
              <span>{fixed ? 'Lihat Bug' : 'Ganti Blok!'}</span>
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 180px)',
              gridTemplateRows: 'repeat(3, 146px)',
              gap: 14,
              justifyContent: 'center',
              alignContent: 'center',
              background: '#F8FAFC',
              padding: 20,
              borderRadius: 22,
              border: `2.5px solid ${CHARCOAL}`,
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
                    }}
                  >
                    {isStart && !fixed && <BikoDetectiveToken size={82} confused />}
                    {isStart && fixed && (
                      <span style={{ ...row, gap: 6, fontSize: 18, fontWeight: 800, color: '#047857' }}>
                        <span>START</span>
                        <JuniorIcon name="arrow-up" size={20} />
                      </span>
                    )}
                    {isRock && (
                      <div style={{ ...centerCol }}>
                        <RockSvg size={76} />
                        {!fixed && (
                          <span style={{ fontSize: 15, fontWeight: 800, color: '#B91C1C' }}>NABRAK!</span>
                        )}
                      </div>
                    )}
                    {isDetour && fixed && <JuniorIcon name="turn-up" size={38} />}
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
              gap: 10,
              padding: '10px 18px',
              borderRadius: 16,
              background: fixed ? TEAL_SOFT : CORAL_SOFT,
              border: `2px solid ${fixed ? TEAL : CORAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 23,
              fontWeight: 700,
              color: fixed ? '#047857' : '#B91C1C',
            }}
          >
            {fixed ? (
              <>
                <JuniorIcon name="flag" size={24} />
                <span>Naik lalu kanan, aman ke finis!</span>
              </>
            ) : (
              <>
                <JuniorIcon name="warning" size={24} />
                <span>Langsung kanan nabrak batu!</span>
              </>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card: Code Comparison with Bullets */}
      <MacWindowCard left={1055} top={215} width={765} height={745} headerLabel="perbaikan-kasus-2" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
          <InfoPanel bg={CORAL_SOFT} padding={24} style={{ ...row, justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SectionHeading icon="cross" size={28} accentColor="#B91C1C">
                Kode Salah
              </SectionHeading>
              <BulletList
                bulletColor={CORAL}
                fontSize={22}
                gap={8}
                items={[
                  <>
                    Langsung kanan <InlineHighlight color="#FECACA">nabrak batu</InlineHighlight>!
                  </>,
                ]}
              />
            </div>
            <DebugArrowBlock dir="right" size={82} isBug />
          </InfoPanel>

          <div style={{ ...row, justifyContent: 'center', gap: 12, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
            <JuniorIcon name="arrow-down" size={28} />
            <span>Ganti Menjadi</span>
          </div>

          <InfoPanel bg={TEAL_SOFT} padding={24} style={{ ...row, justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SectionHeading icon="check" size={28} accentColor="#047857">
                Kode Benar
              </SectionHeading>
              <BulletList
                bulletColor={TEAL}
                fontSize={22}
                gap={8}
                items={[
                  <>
                    Belok <InlineHighlight color="#D1FAE5">atas, lalu kanan</InlineHighlight>.
                  </>,
                  <>Biko tiba di finis!</>,
                ]}
              />
            </div>
            <div style={{ ...row, gap: 12 }}>
              <DebugArrowBlock dir="up" size={82} isFixed showRightTab />
              <DebugArrowBlock dir="right" size={82} isFixed />
            </div>
          </InfoPanel>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Detektif Kode (Boleh vs Jangan, Flat InfoPanels)
// ============================================================================
const Slide08Tips: Page = () => (
  <JuniorFrame badge="TIPS DETEKTIF KODE" accentDot={TEAL}>
    <SlideTitle>
      Rahasia <Highlight>Detektif Hebat!</Highlight>
    </SlideTitle>

    <div
      style={{
        ...abs(X0, 215, W, 745),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
      }}
    >
      {/* Left Column: BOLEH */}
      <InfoPanel
        bg={WHITE}
        borderColor={TEAL}
        padding={32}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}
      >
        <div style={{ ...row, justifyContent: 'space-between', borderBottom: `2.5px solid ${TEAL_SOFT}`, paddingBottom: 14 }}>
          <SectionHeading icon="check" size={34} accentColor="#047857">
            BOLEH Dilakukan
          </SectionHeading>
          <BikoMascot pose="thumbs-up" width={110} />
        </div>

        <div
          style={{
            borderRadius: 20,
            background: TEAL_SOFT,
            border: `2.5px solid ${TEAL}`,
            padding: '20px 24px',
            ...row,
            justifyContent: 'center',
            gap: 24,
          }}
        >
          <BikoDetectiveToken size={88} />
          <div style={{ ...row, gap: 12 }}>
            <DebugArrowBlock dir="up" size={74} isFixed showRightTab />
            <DebugArrowBlock dir="right" size={74} isFixed />
          </div>
        </div>

        <BulletList
          bulletColor={TEAL}
          fontSize={26}
          gap={16}
          items={[
            <>
              <InlineHighlight color="#D1FAE5">Tetap tenang</InlineHighlight> saat nyasar.
            </>,
            <>
              <InlineHighlight>Cek ulang</InlineHighlight> panah satu-satu.
            </>,
            <>
              Ganti blok <InlineHighlight color="#D1FAE5">yang salah arah</InlineHighlight>.
            </>,
          ]}
        />
      </InfoPanel>

      {/* Right Column: JANGAN */}
      <InfoPanel
        bg={WHITE}
        borderColor={CORAL}
        padding={32}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}
      >
        <div style={{ ...row, justifyContent: 'space-between', borderBottom: `2.5px solid ${CORAL_SOFT}`, paddingBottom: 14 }}>
          <SectionHeading icon="cross" size={34} accentColor="#B91C1C">
            JANGAN Dilakukan
          </SectionHeading>
          <BikoMascot pose="thinking" width={110} />
        </div>

        <div
          style={{
            borderRadius: 20,
            background: CORAL_SOFT,
            border: `2.5px solid ${CORAL}`,
            padding: '16px 24px',
            ...centerCol,
          }}
        >
          <svg width={180} height={130} viewBox="0 0 210 155" fill="none">
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

        <BulletList
          bulletColor={CORAL}
          fontSize={26}
          gap={16}
          items={[
            <>
              Jangan <InlineHighlight color="#FECACA">sedih atau marah</InlineHighlight>.
            </>,
            <>
              Jangan <InlineHighlight color="#FECACA">menyerah</InlineHighlight> sebelum coba.
            </>,
            <>
              Jangan biarkan <InlineHighlight color="#FECACA">Bug</InlineHighlight> di kode.
            </>,
          ]}
        />
      </InfoPanel>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Perbaiki Kode Biko! (Interactive Debugging Maze)
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  // Pre-filled buggy sequence: ['right', 'down', 'up'], slot 2 ('down') is the Bug!
  // Correct sequence: ['right', 'up', 'up'] from (2,0) -> (2,1) -> (1,1) -> (0,1 Flag!)
  const [slots, setSlots] = useState<(Dir | null)[]>(['right', 'down', 'up']);
  const [bikoPos, setBikoPos] = useState<[number, number]>([2, 0]);
  const [status, setStatus] = useState<'idle' | 'running' | 'win' | 'bug'>('idle');
  const [message, setMessage] = useState<{ icon?: JuniorIconName; text: string }>({
    icon: 'bug',
    text: 'Ada Bug merah! Buang & ganti slot ke-2.',
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
      setMessage({ text: 'Blok terpasang! Klik "Jalan!" ya.' });
      return;
    }
    if (slots[1] === 'down') {
      const next = [...slots];
      next[1] = dir;
      setSlots(next);
      setStatus('idle');
      setBikoPos([2, 0]);
      setMessage({ text: 'Blok ke-2 diganti! Klik "Jalan!"' });
    }
  };

  const removeSlot = (idx: number) => {
    if (status === 'running') return;
    const next = [...slots];
    next[idx] = null;
    setSlots(next);
    setStatus('idle');
    setBikoPos([2, 0]);
    setMessage({ text: `Blok ${idx + 1} dibuang! Pilih panah benar.` });
  };

  const resetBug = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setSlots(['right', 'down', 'up']);
    setBikoPos([2, 0]);
    setStatus('idle');
    setMessage({ icon: 'bug', text: 'Ada Bug merah! Buang & ganti slot ke-2.' });
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
      setMessage({ text: 'Pasang blok panah dulu ya!' });
      return;
    }
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStatus('running');
    setBikoPos([2, 0]);
    setMessage({ text: 'Detektif Biko berjalan...' });

    const obstacles = new Set(['1,0', '2,2']);
    let r = 2;
    let c = 0;

    const stepNext = (i: number) => {
      if (i >= seq.length) {
        if (r === 0 && c === 1) {
          setStatus('win');
          setMessage({ icon: 'party', text: 'Berhasil! Bug hilang & sampai Finis!' });
        } else {
          setStatus('bug');
          setMessage({ icon: 'bug', text: 'Masih ada Bug! Cek lagi panahnya.' });
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
        setMessage({ icon: 'bug', text: `Bug di Blok ${i + 1}! Biko keluar peta!` });
        return;
      }

      if (obstacles.has(`${r},${c}`)) {
        setStatus('bug');
        setMessage({ icon: 'bug', text: `Bug di Blok ${i + 1}! Biko nabrak!` });
        return;
      }

      setBikoPos([r, c]);

      if (r === 0 && c === 1) {
        setStatus('win');
        setMessage({ icon: 'party', text: 'Yeay! Debugging Sukses! Tiba di Finis!' });
        return;
      }

      timerRef.current = window.setTimeout(() => stepNext(i + 1), 460);
    };

    timerRef.current = window.setTimeout(() => stepNext(0), 300);
  };

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={CORAL}>
      <SlideTitle top={104}>
        Misi <Highlight>Tangkap Semua Bug!</Highlight>
      </SlideTitle>

      {/* Top Flat Guide Strip (no fake-button shadows, no raw arrow emojis) */}
      <InfoPanel bg={WHITE} padding={14} style={{ ...abs(X0, 188, W, 74), ...row, justifyContent: 'space-around' }}>
        <span style={{ fontSize: 22, fontWeight: 800 }}>
          1. Klik <InlineHighlight color={SKY_SOFT}>Jalan!</InlineHighlight> lihat nyasarnya
        </span>
        <JuniorIcon name="arrow-right" size={22} />
        <span style={{ fontSize: 22, fontWeight: 800 }}>
          2. <InlineHighlight color="#FECACA">Buang &amp; Ganti</InlineHighlight> blok merah
        </span>
        <JuniorIcon name="arrow-right" size={22} />
        <span style={{ fontSize: 22, fontWeight: 800 }}>
          3. Coba sampai <InlineHighlight color="#D1FAE5">Finis!</InlineHighlight>
        </span>
      </InfoPanel>

      {/* Bottom Interactive Debugging Game */}
      <MacWindowCard left={X0} top={284} width={1280} height={685} headerLabel="game-debugging-biko" padding={24}>
        <div style={{ display: 'grid', gridTemplateColumns: '485px 1fr', gap: 26, height: '100%' }}>
          {/* 3x3 Grid */}
          <div
            style={{
              background: '#F0FDF4',
              borderRadius: 22,
              border: `2.5px solid ${CHARCOAL}`,
              padding: 16,
              ...centerCol,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 140px)',
                gridTemplateRows: 'repeat(3, 148px)',
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
                        background: isBush || isRock ? CORAL_SOFT : isGoal ? SUNNY_SOFT : WHITE,
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

          {/* Right Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <SectionHeading size={24}>1. Klik Blok Merah untuk Buang Bug:</SectionHeading>
              <div
                style={{
                  ...row,
                  gap: 18,
                  marginTop: 12,
                  padding: '18px 24px',
                  borderRadius: 20,
                  background: '#F8FAFC',
                  border: `2.5px solid ${CHARCOAL}`,
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
                      border: dir ? `2.5px solid ${CHARCOAL}` : `3px dashed #64748B`,
                      ...centerCol,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                    title="Klik untuk membuang blok ini"
                  >
                    {dir ? (
                      <DebugArrowBlock
                        dir={dir}
                        size={84}
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
              <SectionHeading size={24}>2. Klik atau Tarik Pengganti Benar:</SectionHeading>
              <div style={{ ...row, gap: 16, marginTop: 12 }}>
                {(['up', 'down', 'left', 'right'] as Dir[]).map((d) => (
                  <div key={d} draggable onDragStart={() => setDragDir(d)} style={{ display: 'inline-flex' }}>
                    <DebugArrowBlock dir={d} size={82} onClick={() => replaceEmptyOrBug(d)} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div
                style={{
                  padding: '12px 18px',
                  borderRadius: 16,
                  background: status === 'win' ? TEAL_SOFT : status === 'bug' ? CORAL_SOFT : SUNNY_SOFT,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 21,
                  fontWeight: 700,
                  ...row,
                  gap: 8,
                }}
              >
                {message.icon && <JuniorIcon name={message.icon} size={22} />}
                <span>{message.text}</span>
              </div>

              <div style={{ ...row, gap: 14 }}>
                <button
                  type="button"
                  className="cpj8-card-btn"
                  onClick={runDebugCode}
                  style={{
                    flex: 1,
                    padding: '13px 20px',
                    borderRadius: 18,
                    background: TEAL,
                    color: WHITE,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 5px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 24,
                    fontWeight: 700,
                    ...row,
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <JuniorIcon name="play" size={22} />
                  <span>Jalan!</span>
                </button>
                <button
                  type="button"
                  className="cpj8-card-btn"
                  onClick={resetBug}
                  style={{
                    padding: '13px 22px',
                    borderRadius: 18,
                    background: WHITE,
                    color: CHARCOAL,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 5px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 22,
                    fontWeight: 700,
                    ...row,
                    gap: 8,
                  }}
                >
                  <JuniorIcon name="reset" size={20} />
                  <span>Reset Bug</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Reference Panel + Cheering Biko */}
      <InfoPanel
        bg={WHITE}
        padding={20}
        style={{
          ...abs(1408, 284, 412, 685),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SectionHeading icon="magnifier" size={24}>
            Petunjuk Detektif:
          </SectionHeading>
          <BulletList
            bulletColor={CORAL}
            fontSize={21}
            gap={10}
            items={[
              <>
                Blok ke-2 <InlineHighlight color="#FECACA">salah arah</InlineHighlight>.
              </>,
              <>
                Ganti jadi panah <InlineHighlight color="#D1FAE5">Atas</InlineHighlight>.
              </>,
              <>Klik Jalan sampai finis!</>,
            ]}
          />
        </div>

        <div style={{ ...centerCol }}>
          <BikoMascot
            pose={status === 'win' ? 'jump' : 'detective'}
            width={255}
            speechBubble={status === 'win' ? 'Detektif Hebat!' : 'Cari blok merah!'}
          />
        </div>
      </InfoPanel>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 8 (Summary Bullets + Gold Medal)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  const confetti = [
    { left: 140, top: 240, color: SUNNY, rot: '18deg', size: 20 },
    { left: 260, top: 820, color: SKY, rot: '-24deg', size: 22 },
    { left: 1650, top: 230, color: CORAL, rot: '-15deg', size: 20 },
    { left: 1500, top: 850, color: LAVENDER, rot: '28deg', size: 22 },
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
            border: `2px solid ${CHARCOAL}`,
            transform: `rotate(${c.rot})`,
            animation: live ? `cpj8-confetti ${2.4 + idx * 0.3}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={104} size={58}>
        Hebat! Kamu <Highlight>Detektif Kode!</Highlight>
      </SlideTitle>

      {/* Center Celebration & Recap Card */}
      <MacWindowCard left={180} top={210} width={1180} height={745} headerLabel="lencana-pertemuan-8" padding={34}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '430px 1fr', gap: 36, alignItems: 'center' }}>
          {/* Left: Gold Medal + Flat Achievement Banner */}
          <div style={{ ...centerCol, gap: 22 }}>
            <svg
              width={255}
              height={255}
              viewBox="0 0 240 240"
              fill="none"
              style={{ animation: live ? 'cpj8-float 3s ease-in-out infinite' : undefined }}
            >
              <path d="M74 16 L104 94 H136 L166 16 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
              <path d="M94 16 L120 88 L146 16" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="140" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={6} />
              <circle cx="120" cy="140" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={4} />
              <path
                d="M90 166 L146 110 C150 102, 158 100, 162 106 L154 114 L158 118 L166 110 C170 118, 164 128, 154 128 L100 176 Z"
                fill={TEAL}
                stroke={CHARCOAL}
                strokeWidth={3.5}
                strokeLinejoin="round"
              />
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
                padding: '12px 24px',
                borderRadius: 16,
                background: SUNNY_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 27,
                fontWeight: 700,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="medal" size={28} />
              <span>Lencana Detektif Bug</span>
            </div>
          </div>

          {/* Right: Concise Bullet Takeaways */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <SectionHeading icon="party" size={32}>
              Yang Sudah Kamu Kuasai:
            </SectionHeading>

            <BulletList
              bulletColor={TEAL}
              fontSize={25}
              gap={16}
              items={[
                <>
                  Menemukan <InlineHighlight color="#FECACA">Bug (blok salah)</InlineHighlight> di kode.
                </>,
                <>
                  Membuang panah yang <InlineHighlight>bikin nyasar</InlineHighlight>.
                </>,
                <>
                  Memperbaiki kode dengan <InlineHighlight color="#D1FAE5">jurus Debugging</InlineHighlight>.
                </>,
                <>
                  Memandu karakter sampai <InlineHighlight color={SKY_SOFT}>bendera finis</InlineHighlight>.
                </>,
              ]}
            />

            <InfoPanel bg={TEAL_SOFT} borderColor={TEAL} padding={18} style={{ ...row, justifyContent: 'center', gap: 16 }}>
              <DebugArrowBlock dir="up" size={62} isFixed showRightTab />
              <DebugArrowBlock dir="right" size={62} isFixed />
              <FlagSvg size={64} />
            </InfoPanel>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko Celebrating on Right */}
      <div style={{ ...abs(1400, 390, 420, 500), ...centerCol }}>
        <BikoMascot
          pose="jump"
          width={365}
          badgeIcon={<JuniorIcon name="magnifier" size={28} />}
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
Kelinci cuma butuh 2 langkah ke wortel, tapi kodenya tertulis 3 panah kanan. Ayo buang 1 panah berlebih!`,

  `Permainan Cepat! Ayo tebak mana blok yang salah:
Blok 1 (Kanan) atau Blok 2 (Bawah)? Biko malah turun menjauhi Bintang!`,

  `Kasus Detektif #2: Salah Belok Nabrak Batu!
Kode langsung ke kanan bikin Biko menabrak batu. Ganti dengan Atas lalu Kanan supaya belok aman sampai Finis!`,

  `Tips Detektif Hebat:
BOLEH tetap tenang kalau karakter nyasar dan cek ulang blok satu per satu.
JANGAN sedih, marah, atau menyerah saat ada Bug ya!`,

  `Waktunya praktik Game Tangkap Semua Bug!
Klik "Jalan!" untuk melihat blok ke-2 (Bawah) yang bikin Biko keluar jalur, buang blok merahnya, lalu ganti dengan Atas sampai Biko tiba di Bendera Finis!`,

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

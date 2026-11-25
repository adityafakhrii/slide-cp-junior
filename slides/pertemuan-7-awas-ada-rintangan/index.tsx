import { useEffect, useRef, useState, type CSSProperties, type DragEvent, type ReactNode } from 'react';
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
  50% { transform: translateY(-8px); }
}
@keyframes cpj7-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-10px) scale(1.04); }
}
@keyframes cpj7-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(8px) rotate(14deg); }
}
@keyframes cpj7-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-2deg); }
  75% { transform: translateX(7px) rotate(2deg); }
}
.cpj7-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj7-card-btn:hover {
  transform: translateY(-3px);
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
// Shared Chrome, Typography, Highlights, Bullet Lists & Flat Containers
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
// Pertemuan 7 Visual Assets: Obstacles, Explorer Biko Token, Flag, Treasure & Blocks
// ============================================================================
type Dir = 'up' | 'down' | 'left' | 'right';

const DIR_META: Record<Dir, { label: string; color: string; rot: number }> = {
  up: { label: 'Atas', color: TEAL, rot: -90 },
  down: { label: 'Bawah', color: CORAL, rot: 90 },
  left: { label: 'Kiri', color: SUNNY, rot: 180 },
  right: { label: 'Kanan', color: SKY, rot: 0 },
};

/** ScratchJr-inspired interlocking directional arrow block (button ONLY when onClick is passed) */
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
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    transform: active ? 'scale(1.06)' : undefined,
    transition: 'transform 160ms ease, box-shadow 160ms ease',
    flexShrink: 0,
    boxSizing: 'border-box',
    ...style,
  };

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="cpj7-card-btn"
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
    <circle cx="20" cy="28" r="9" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.2} />
    <circle cx="60" cy="28" r="9" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.2} />
    <circle cx="40" cy="44" r="24" fill="#F59E0B" stroke={CHARCOAL} strokeWidth={3.4} />
    <ellipse cx="40" cy="49" rx="17" ry="14" fill="#FEF3C7" />
    <path d="M22 28 C22 14, 58 14, 58 28 Z" fill="#B45309" stroke={CHARCOAL} strokeWidth={3} />
    <rect x="22" y="23" width="36" height="6" rx="2" fill={TEAL} stroke={CHARCOAL} strokeWidth={2} />
    <ellipse cx="40" cy="29" rx="28" ry="6.5" fill="#D97706" stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="32" cy="43" r="3.4" fill={CHARCOAL} />
    <circle cx="48" cy="43" r="3.4" fill={CHARCOAL} />
    <circle cx="33" cy="41.8" r="1.1" fill={WHITE} />
    <circle cx="49" cy="41.8" r="1.1" fill={WHITE} />
    <ellipse cx="40" cy="49" rx="4.5" ry="3.2" fill={CHARCOAL} />
    {alert ? (
      <circle cx="40" cy="56.5" r="3.2" fill={CORAL} stroke={CHARCOAL} strokeWidth={1.8} />
    ) : (
      <path d="M34 54.5 Q40 60 46 54.5" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" />
    )}
  </svg>
);

/** Crisp vector cross badge for obstacle graphics */
const CrossBadgeSvg = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="12" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.4} />
    <path d="M9.5 9.5 L18.5 18.5 M18.5 9.5 L9.5 18.5" stroke={WHITE} strokeWidth={3} strokeLinecap="round" />
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
      <path d="M20 56 L24 38 L36 27 L48 29 L40 44 L36 56 Z" fill="#CBD5E1" />
      <path d="M46 42 L56 46 M26 48 L33 44" stroke={CHARCOAL} strokeWidth={2.5} strokeLinecap="round" />
    </svg>
    {withCross && (
      <span style={{ position: 'absolute', top: -6, right: -6, display: 'inline-flex' }}>
        <CrossBadgeSvg size={Math.round(size * 0.4)} />
      </span>
    )}
  </div>
);

/** Prickly thorny bush obstacle */
const BushSvg = ({
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
      <circle cx="42" cy="52" r="3.5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
    </svg>
    {withCross && (
      <span style={{ position: 'absolute', top: -6, right: -6, display: 'inline-flex' }}>
        <CrossBadgeSvg size={Math.round(size * 0.4)} />
      </span>
    )}
  </div>
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
const ExplorerMapCard = ({ size = 110 }: { size?: number }) => (
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
// SLIDE 01 — Cover (Heading H1 + Bullet InfoPanel + Arch Portal)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 7" accentDot={ORANGE}>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 170, 820, 770), display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
            padding: '8px 18px',
            borderRadius: 12,
            background: ORANGE_SOFT,
            border: `2px solid ${CHARCOAL}`,
            fontSize: 20,
            fontWeight: 800,
            color: '#C2410C',
          }}
        >
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
          Awas Ada <Highlight>Rintangan!</Highlight>
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
          Cari Jalan Aman Lewati Labirin
        </p>

        {/* Clean non-button Info Panel with Bullet Points */}
        <InfoPanel bg={WHITE} padding={26} style={{ marginTop: 6 }}>
          <SectionHeading icon="compass" size={26} accentColor={CHARCOAL}>
            Yang Kita Pelajari:
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={ORANGE}
              fontSize={24}
              gap={12}
              items={[
                <>
                  Kenali <InlineHighlight color="#FECACA">batu &amp; semak</InlineHighlight> penghalang.
                </>,
                <>
                  Belok ke <InlineHighlight color="#D1FAE5">kotak kosong</InlineHighlight> aman.
                </>,
                <>
                  Susun <InlineHighlight color={SKY_SOFT}>panah rute</InlineHighlight> ke finis.
                </>,
              ]}
            />
          </div>
        </InfoPanel>
      </div>

      {/* Right Visual Showcase: Arch Expedition Portal */}
      <div style={{ ...abs(1010, 155, 810, 795), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 630,
            height: 645,
            borderRadius: '315px 315px 42px 42px',
            background: 'linear-gradient(170deg, #FEF9C3 0%, #FFF7ED 55%, #ECFDF5 100%)',
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `12px 12px 0 ${ORANGE}`,
            overflow: 'hidden',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 630 645" fill="none" style={{ opacity: 0.32 }}>
            <circle cx="315" cy="230" r="210" stroke={ORANGE} strokeWidth={3} strokeDasharray="12 10" />
            <circle cx="315" cy="230" r="140" stroke={TEAL} strokeWidth={2.5} />
          </svg>
        </div>

        {/* Mini Maze Card (Flat border + CARD_SHADOW) */}
        <InfoPanel
          bg={WHITE}
          padding={16}
          style={{
            position: 'absolute',
            left: 22,
            top: 46,
            width: 375,
            borderRadius: 22,
            zIndex: 4,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700, color: CHARCOAL }}>
              Labirin Kotak
            </span>
            <span
              style={{
                padding: '3px 10px',
                borderRadius: 10,
                background: TEAL_SOFT,
                border: `2px solid ${TEAL}`,
                fontSize: 15,
                fontWeight: 800,
                color: '#047857',
              }}
            >
              Rute Aman
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
            <div style={{ height: 56, borderRadius: 10, background: WHITE, border: `2px solid ${BORDER_SOFT}` }} />
          </div>
        </InfoPanel>

        <BikoMascot
          pose="explorer"
          width={380}
          style={{ position: 'relative', zIndex: 3, marginTop: 150, marginLeft: 130 }}
        />

        {/* Explorer Map Floating Badge (Flat InfoPanel) */}
        <InfoPanel
          bg={WHITE}
          padding={14}
          style={{
            position: 'absolute',
            right: 16,
            bottom: 58,
            borderRadius: 20,
            ...centerCol,
            zIndex: 5,
            animation: live ? 'cpj7-float 3s ease-in-out infinite' : undefined,
          }}
        >
          <ExplorerMapCard size={106} />
          <span style={{ marginTop: 4, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: CHARCOAL }}>
            Peta Penjelajah
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
  <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
    <SlideTitle>
      Apa <Highlight>Misi Kita</Highlight> Hari Ini?
    </SlideTitle>

    <MacWindowCard left={X0} top={215} width={1320} height={745} headerLabel="misi-pertemuan-7" padding={34}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, height: '100%' }}>
        {/* Misi 1 */}
        <InfoPanel
          bg={SKY_SOFT}
          borderColor={CHARCOAL}
          padding={28}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em' }}>
              MISI 1
            </span>
            <SectionHeading icon="warning" size={32}>
              Kenali <Highlight color={STABILO}>Rintangan</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${SKY}`,
              padding: '22px 20px',
              ...row,
              justifyContent: 'center',
              gap: 28,
            }}
          >
            <RockSvg size={86} withCross />
            <BushSvg size={86} withCross />
          </div>

          <BulletList
            bulletColor={SKY}
            fontSize={24}
            gap={12}
            items={[
              <>
                Amati <InlineHighlight color="#FECACA">batu dan semak</InlineHighlight>.
              </>,
              <>
                Jalan tertutup <InlineHighlight color={WHITE}>tidak dilewati</InlineHighlight>.
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
            <SectionHeading icon="turn-up" size={32}>
              Susun <Highlight color="#A7F3D0">Rute Aman</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${TEAL}`,
              padding: '22px 20px',
              ...row,
              justifyContent: 'center',
              gap: 14,
            }}
          >
            <MazeArrowBlock dir="up" size={70} />
            <MazeArrowBlock dir="right" size={70} />
            <FlagSvg size={78} />
          </div>

          <BulletList
            bulletColor={TEAL}
            fontSize={24}
            gap={12}
            items={[
              <>
                <InlineHighlight color="#D1FAE5">Maju dan belok</InlineHighlight> hindari batu.
              </>,
              <>
                Jalan sampai <InlineHighlight>bendera finis</InlineHighlight>.
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="point-left"
      width={360}
      speechBubble="Ayo lewati rintangan!"
      style={{ ...abs(1455, 315) }}
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
      <MacWindowCard left={X0} top={215} width={960} height={745} headerLabel="peta-rintangan" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <SectionHeading size={26}>Peta Kotak 3×3:</SectionHeading>
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
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 19,
                  fontWeight: 700,
                  ...row,
                  gap: 8,
                }}
              >
                <JuniorIcon name="rock" size={20} />
                <span>Jalan Tutup</span>
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
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 19,
                  fontWeight: 700,
                  ...row,
                  gap: 8,
                }}
              >
                <JuniorIcon name="turn-up" size={20} />
                <span>Jalan Aman</span>
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 175px)',
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
                    {routeShown === 'safe' && r === 0 && c === 0 && <JuniorIcon name="turn-up" size={38} />}
                    {routeShown === 'safe' && r === 0 && c === 1 && <JuniorIcon name="arrow-right" size={38} />}
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
                        TUTUP!
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
              padding: '10px 18px',
              borderRadius: 16,
              background: routeShown === 'safe' ? TEAL_SOFT : CORAL_SOFT,
              border: `2px solid ${routeShown === 'safe' ? TEAL : CORAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 23,
              fontWeight: 700,
              color: routeShown === 'safe' ? '#047857' : '#B91C1C',
            }}
          >
            {routeShown === 'safe' ? (
              <>
                <JuniorIcon name="check" size={24} />
                <span>Belok atas, lewati batu!</span>
              </>
            ) : (
              <>
                <JuniorIcon name="stop" size={24} />
                <span>Ada batu! Tidak bisa maju.</span>
              </>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: Flat InfoPanels + Biko */}
      <div style={{ ...abs(1095, 215, 725, 745), display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
        <InfoPanel bg={CORAL_SOFT} padding={24} style={{ ...row, gap: 20 }}>
          <RockSvg size={78} withCross />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SectionHeading size={28} accentColor="#B91C1C">
              Batu &amp; Semak Tutup Jalan
            </SectionHeading>
            <BulletList
              bulletColor={CORAL}
              fontSize={22}
              gap={8}
              items={[
                <>
                  Ada <InlineHighlight color="#FECACA">batu besar</InlineHighlight> di depan.
                </>,
                <>Kotak tertutup jangan ditabrak.</>,
              ]}
            />
          </div>
        </InfoPanel>

        <InfoPanel bg={TEAL_SOFT} padding={24} style={{ ...row, gap: 20 }}>
          <FlagSvg size={78} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SectionHeading size={28} accentColor="#047857">
              Cari Jalan Kosong
            </SectionHeading>
            <BulletList
              bulletColor={TEAL}
              fontSize={22}
              gap={8}
              items={[
                <>
                  Belok ke <InlineHighlight color="#D1FAE5">kotak kosong</InlineHighlight> aman.
                </>,
                <>Lanjut sampai bendera finis.</>,
              ]}
            />
          </div>
        </InfoPanel>

        <div style={{ flex: 1, ...centerCol }}>
          <BikoMascot
            pose="detective"
            width={235}
            speechBubble="Cek rintangan dulu!"
          />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus Rute Pintar: Maju & Belok (3 Langkah Interaktif)
// ============================================================================
const Slide04Jurus: Page = () => {
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
      title: 'Lihat Rintangan',
      bullets: [
        <>
          Cek kotak <InlineHighlight color="#FECACA">batu &amp; semak</InlineHighlight>.
        </>,
        <>Tandai jalan yang tutup.</>,
      ],
      color: SKY,
      soft: SKY_SOFT,
      badge: 'LANGKAH 1 • LIHAT',
      visual: (
        <div style={{ ...row, gap: 14 }}>
          <BikoTokenSvg size={64} />
          <RockSvg size={64} withCross />
        </div>
      ),
    },
    {
      num: '2',
      title: 'Belok Aman',
      bullets: [
        <>
          Pilih panah ke <InlineHighlight>kotak kosong</InlineHighlight>.
        </>,
        <>Hindari jalan berbahaya.</>,
      ],
      color: SUNNY,
      soft: SUNNY_SOFT,
      badge: 'LANGKAH 2 • BELOK',
      visual: (
        <div style={{ ...row, gap: 12 }}>
          <MazeArrowBlock dir="up" size={62} />
          <MazeArrowBlock dir="right" size={62} />
        </div>
      ),
    },
    {
      num: '3',
      title: 'Sampai Finis',
      bullets: [
        <>
          Maju ke <InlineHighlight color="#D1FAE5">bendera bintang</InlineHighlight>.
        </>,
        <>Misi labirin berhasil!</>,
      ],
      color: TEAL,
      soft: TEAL_SOFT,
      badge: 'LANGKAH 3 • FINIS',
      visual: (
        <div style={{ ...row, gap: 14 }}>
          <BikoTokenSvg size={62} />
          <FlagSvg size={68} />
        </div>
      ),
    },
  ];

  const phaseHint: { icon: JuniorIconName; text: string }[] = [
    { icon: 'eyes', text: 'Langkah 1: Lihat letak batu dan semak!' },
    { icon: 'turn-up', text: 'Langkah 2: Belok ke kotak kosong aman!' },
    { icon: 'flag', text: 'Langkah 3: Maju sampai bendera finis!' },
  ];

  return (
    <JuniorFrame badge="JURUS RUTE PINTAR" accentDot={SUNNY}>
      <SlideTitle>
        Jurus <Highlight>Maju &amp; Belok!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={215} width={1720} height={745} headerLabel="jurus-rute-pintar" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, flex: 1 }}>
            {steps.map((s, idx) => {
              const active = phase === idx;
              return (
                <button
                  key={s.num}
                  type="button"
                  className="cpj7-card-btn"
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
                      color: s.color === SUNNY ? '#B45309' : s.color === SKY ? '#1D4ED8' : '#047857',
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

                  <SectionHeading size={32}>{s.title}</SectionHeading>

                  <div style={{ width: '100%' }}>
                    <BulletList bulletColor={s.color} fontSize={22} gap={8} items={s.bullets} />
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
              padding: '14px 24px',
              borderRadius: 20,
              background: '#F8FAFC',
              border: `2.5px solid ${CHARCOAL}`,
            }}
          >
            <div style={{ ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700, color: CHARCOAL }}>
              <JuniorIcon name={phaseHint[phase].icon} size={26} />
              <span>{phaseHint[phase].text}</span>
            </div>
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
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Latihan Rute #1: Yuk Belok Hindari Batu! ([Up] + [Right] + [Right])
// ============================================================================
const Slide05Latihan1: Page = () => {
  const [step, setStep] = useState(0);
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
      <MacWindowCard left={X0} top={215} width={920} height={745} headerLabel="latihan-rute-1" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <SectionHeading icon="flag" size={26}>
              Bantu Biko ke Bendera:
            </SectionHeading>
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 195px)',
              gridTemplateRows: 'repeat(2, 175px)',
              gap: 16,
              justifyContent: 'center',
              alignContent: 'center',
              background: '#F0FDF4',
              padding: 28,
              borderRadius: 24,
              border: `2.5px solid ${CHARCOAL}`,
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
                      border: isPathCell ? `3px dashed ${TEAL}` : `2.5px solid ${CHARCOAL}`,
                      ...centerCol,
                      position: 'relative',
                    }}
                  >
                    {isFlag && !isBikoHere && <FlagSvg size={88} />}
                    {isRock && <RockSvg size={90} withCross />}
                    {!isBikoHere && r === 0 && c === 0 && <JuniorIcon name="arrow-up" size={34} />}
                    {!isBikoHere && r === 0 && c === 1 && <JuniorIcon name="arrow-right" size={34} />}
                    {isBikoHere && (
                      <div style={{ ...centerCol }}>
                        <BikoTokenSvg size={100} />
                        {step === 3 && (
                          <span
                            style={{
                              position: 'absolute',
                              top: -10,
                              right: -10,
                              padding: '4px 12px',
                              borderRadius: 99,
                              background: SUNNY,
                              border: `2.5px solid ${CHARCOAL}`,
                              fontFamily: 'var(--osd-font-display)',
                              fontSize: 16,
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
              gap: 10,
              padding: '10px 18px',
              borderRadius: 16,
              background: step === 3 ? TEAL_SOFT : '#F8FAFC',
              border: `2px solid ${step === 3 ? TEAL : BORDER_SOFT}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 23,
              fontWeight: 700,
              color: step === 3 ? '#047857' : CHARCOAL,
            }}
          >
            {step === 0 && <span>Klik &quot;Jalankan Rute&quot; atau blok panah kanan!</span>}
            {step === 1 && (
              <>
                <JuniorIcon name="arrow-up" size={24} />
                <span>Langkah 1: Naik 1 kotak.</span>
              </>
            )}
            {step === 2 && (
              <>
                <JuniorIcon name="arrow-right" size={24} />
                <span>Langkah 2: Maju ke kanan.</span>
              </>
            )}
            {step === 3 && (
              <>
                <JuniorIcon name="party" size={24} />
                <span>Langkah 3: Sampai bendera finis!</span>
              </>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card: Block Sequence */}
      <MacWindowCard left={1055} top={215} width={765} height={745} headerLabel="rangkaian-blok-1" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
          <InfoPanel bg={CORAL_SOFT} padding={20}>
            <SectionHeading icon="rock" size={27} accentColor="#B91C1C">
              Ada Batu di Depan!
            </SectionHeading>
            <div style={{ marginTop: 10 }}>
              <BulletList
                bulletColor={CORAL}
                fontSize={22}
                gap={8}
                items={[
                  <>
                    Jalan lurus <InlineHighlight color="#FECACA">tertutup batu</InlineHighlight>.
                  </>,
                  <>Biko harus belok ke atas.</>,
                ]}
              />
            </div>
          </InfoPanel>

          <InfoPanel bg={TEAL_SOFT} padding={22}>
            <SectionHeading icon="puzzle" size={27} accentColor="#047857">
              Klik Urutan Blok Pintar:
            </SectionHeading>
            <div style={{ ...row, justifyContent: 'center', gap: 16, marginTop: 18 }}>
              <MazeArrowBlock
                dir="up"
                size={98}
                stepNum={1}
                active={step === 1}
                showRightTab
                onClick={() => setStep(1)}
              />
              <MazeArrowBlock
                dir="right"
                size={98}
                stepNum={2}
                active={step === 2}
                showRightTab
                onClick={() => setStep(2)}
              />
              <MazeArrowBlock
                dir="right"
                size={98}
                stepNum={3}
                active={step === 3}
                onClick={() => setStep(3)}
              />
            </div>
          </InfoPanel>

          <InfoPanel bg={SUNNY_SOFT} padding={20} style={{ ...row, justifyContent: 'space-between', gap: 16 }}>
            <BulletList
              bulletColor={ORANGE}
              fontSize={22}
              gap={8}
              items={[
                <>
                  <InlineHighlight color={WHITE}>Naik 1 kotak</InlineHighlight> hindari batu.
                </>,
                <>
                  <InlineHighlight color="#D1FAE5">Kanan 2 kotak</InlineHighlight> sampai finis.
                </>,
              ]}
            />
            <BikoMascot pose="thumbs-up" width={115} />
          </InfoPanel>
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
      <SlideTitle align="center" top={104}>
        Biko Harus <Highlight>Belok ke Mana?</Highlight>
      </SlideTitle>

      {/* Top Interactive Puzzle Map (3x3) */}
      <MacWindowCard left={220} top={195} width={1480} height={310} headerLabel="tebak-jalan-aman" padding={20}>
        <div style={{ ...row, justifyContent: 'center', gap: 56, height: '100%' }}>
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
                      border: `2px solid ${CHARCOAL}`,
                      ...centerCol,
                    }}
                  >
                    {(isBikoStart || isBikoMovedUp || isBikoMovedDown) && (
                      <BikoTokenSvg size={48} alert={choice === 'down'} />
                    )}
                    {isRock && <RockSvg size={48} withCross />}
                    {isCactus && !isBikoMovedDown && <CactusSvg size={50} />}
                    {isFlag && <FlagSvg size={46} />}
                    {isSafeTop && !isBikoMovedUp && (
                      <span style={{ fontSize: 15, fontWeight: 800, color: '#047857' }}>AMAN</span>
                    )}
                  </div>
                );
              }),
            )}
          </div>

          <div style={{ maxWidth: 540, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SectionHeading size={28}>Amati Peta Kiri:</SectionHeading>
            <BulletList
              bulletColor={SUNNY}
              fontSize={23}
              gap={10}
              items={[
                <>
                  Depan ada <InlineHighlight color="#FECACA">batu besar</InlineHighlight>.
                </>,
                <>
                  Bawah ada <InlineHighlight color="#FECACA">kaktus berduri</InlineHighlight>.
                </>,
                <>
                  Atas ada <InlineHighlight color="#D1FAE5">kotak aman</InlineHighlight>!
                </>,
              ]}
            />
          </div>
        </div>
      </MacWindowCard>

      {/* Bottom 2 Choice Buttons + Biko Question */}
      <button
        type="button"
        className="cpj7-card-btn"
        onClick={() => setChoice('up')}
        style={{
          ...abs(160, 535, 580, 325),
          borderRadius: 26,
          background: choice === 'up' ? TEAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 'up' ? `0 0 0 6px ${TEAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${TEAL}`,
          padding: 24,
          ...centerCol,
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 19, fontWeight: 800, color: '#047857', letterSpacing: '0.06em' }}>
          PILIHAN A (KLIK UNTUK PILIH)
        </span>
        <MazeArrowBlock dir="up" size={102} />
        <SectionHeading size={32}>
          Belok Atas {choice === 'up' && '— Benar!'}
        </SectionHeading>
      </button>

      <div style={{ ...abs(760, 520, 400, 365), ...centerCol }}>
        <BikoMascot
          pose={choice === 'up' ? 'thumbs-up' : 'question'}
          width={240}
          speechBubble={
            choice === 'up'
              ? 'Benar! Atas aman!'
              : choice === 'down'
                ? 'Aduh! Ada kaktus!'
                : 'Pilih A atau B!'
          }
        />
      </div>

      <button
        type="button"
        className="cpj7-card-btn"
        onClick={() => setChoice('down')}
        style={{
          ...abs(1180, 535, 580, 325),
          borderRadius: 26,
          background: choice === 'down' ? CORAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 'down' ? `0 0 0 6px ${CORAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${CORAL}`,
          padding: 24,
          ...centerCol,
          justifyContent: 'space-between',
          animation: choice === 'down' ? 'cpj7-shake 0.35s ease' : undefined,
        }}
      >
        <span style={{ fontSize: 19, fontWeight: 800, color: '#B91C1C', letterSpacing: '0.06em' }}>
          PILIHAN B (KLIK UNTUK PILIH)
        </span>
        <MazeArrowBlock dir="down" size={102} />
        <SectionHeading size={32}>
          Belok Bawah {choice === 'down' && '— Kena Kaktus!'}
        </SectionHeading>
      </button>

      {/* Bottom Flat Feedback Banner */}
      <div style={{ ...abs(420, 905, 1080, 62), ...centerCol }}>
        <div
          style={{
            padding: '10px 28px',
            borderRadius: 16,
            background: choice === 'up' ? TEAL_SOFT : SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 23,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          {choice === 'up' ? (
            <>
              <JuniorIcon name="party" size={24} />
              <span>
                Hebat! <InlineHighlight color="#A7F3D0">Belok Atas</InlineHighlight> aman dari batu &amp; kaktus!
              </span>
            </>
          ) : (
            <span>Pilih jalan aman di layar: A atau B!</span>
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
  const [step, setStep] = useState(0);
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

      {/* Left: 3x3 Labyrinth Grid */}
      <MacWindowCard left={X0} top={215} width={920} height={745} headerLabel="labirin-zigzag" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <SectionHeading icon="footprints" size={26}>
              Peta Tangga 3×3:
            </SectionHeading>
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
                      background:
                        isBushObstacle || isRockObstacle
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
                    {isBushObstacle && <BushSvg size={82} withCross />}
                    {isRockObstacle && <RockSvg size={82} withCross />}
                    {isDecoBush && <BushSvg size={68} style={{ opacity: 0.7 }} />}
                    {isDecoRock && <RockSvg size={68} style={{ opacity: 0.7 }} />}
                    {isFlag && !isBikoHere && <FlagSvg size={76} />}
                    {!isBikoHere && r === 1 && c === 1 && <JuniorIcon name="arrow-up" size={32} />}
                    {!isBikoHere && r === 0 && c === 1 && <JuniorIcon name="arrow-right" size={32} />}
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
              gap: 10,
              padding: '10px 18px',
              borderRadius: 16,
              background: step === 3 ? TEAL_SOFT : '#F8FAFC',
              border: `2px solid ${step === 3 ? TEAL : BORDER_SOFT}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
              color: step === 3 ? '#047857' : CHARCOAL,
            }}
          >
            {step === 0 && <span>Lewati jalur tangga hindari semak &amp; batu!</span>}
            {step === 1 && (
              <>
                <JuniorIcon name="arrow-right" size={24} />
                <span>Langkah 1: Maju kanan!</span>
              </>
            )}
            {step === 2 && (
              <>
                <JuniorIcon name="arrow-up" size={24} />
                <span>Langkah 2: Belok atas!</span>
              </>
            )}
            {step === 3 && (
              <>
                <JuniorIcon name="party" size={24} />
                <span>Langkah 3: Sampai bendera finis!</span>
              </>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card: Step Buttons + Block Sequence + Bullets */}
      <MacWindowCard left={1055} top={215} width={765} height={745} headerLabel="urutan-zigzag" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
          <SectionHeading size={27}>Klik Langkah Zig-Zag:</SectionHeading>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {(
              [
                { n: '1', text: 'Maju Kanan', dir: 'arrow-right' as const, bg: SKY_SOFT, active: step === 1 },
                { n: '2', text: 'Belok Atas', dir: 'arrow-up' as const, bg: SUNNY_SOFT, active: step === 2 },
                { n: '3', text: 'Kanan ke Finis', dir: 'flag' as const, bg: TEAL_SOFT, active: step === 3 },
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
                  padding: '16px 22px',
                  borderRadius: 20,
                  background: item.bg,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: item.active ? `0 0 0 5px ${SUNNY}, 0 5px 0 ${CHARCOAL}` : `0 5px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 28,
                  fontWeight: 700,
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: WHITE,
                    border: `2.5px solid ${CHARCOAL}`,
                    ...centerCol,
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {item.n}
                </span>
                <JuniorIcon name={item.dir} size={28} />
                <span>{item.text}</span>
              </button>
            ))}
          </div>

          <InfoPanel bg={LAVENDER_SOFT} padding={20} style={{ ...centerCol, gap: 14 }}>
            <SectionHeading size={24}>Rangkaian Blok Pintar:</SectionHeading>
            <div style={{ ...row, gap: 16 }}>
              <MazeArrowBlock dir="right" size={88} stepNum={1} active={step === 1} showRightTab onClick={() => setStep(1)} />
              <MazeArrowBlock dir="up" size={88} stepNum={2} active={step === 2} showRightTab onClick={() => setStep(2)} />
              <MazeArrowBlock dir="right" size={88} stepNum={3} active={step === 3} onClick={() => setStep(3)} />
            </div>
            <BulletList
              bulletColor={LAVENDER}
              fontSize={21}
              gap={6}
              items={[
                <>
                  Belok seperti <InlineHighlight color={WHITE}>tangga</InlineHighlight> aman dari batu.
                </>,
              ]}
            />
          </InfoPanel>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Labirin Digital (Boleh vs Jangan, Flat InfoPanels)
// ============================================================================
const Slide08Tips: Page = () => (
  <JuniorFrame badge="TIPS JAGOAN LABIRIN" accentDot={TEAL}>
    <SlideTitle>
      Rahasia <Highlight>Lolos Labirin!</Highlight>
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
            padding: '22px 24px',
            ...row,
            justifyContent: 'center',
            gap: 18,
          }}
        >
          <div style={{ width: 92, height: 92, borderRadius: 18, background: WHITE, border: `2.5px solid ${TEAL}`, ...centerCol }}>
            <BikoTokenSvg size={68} />
          </div>
          <JuniorIcon name="arrow-right" size={28} />
          <div style={{ width: 92, height: 92, borderRadius: 18, background: WHITE, border: `2.5px dashed ${TEAL}`, ...centerCol }}>
            <JuniorIcon name="turn-up" size={34} />
          </div>
          <JuniorIcon name="arrow-right" size={28} />
          <div style={{ width: 92, height: 92, borderRadius: 18, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, ...centerCol }}>
            <FlagSvg size={66} />
          </div>
        </div>

        <BulletList
          bulletColor={TEAL}
          fontSize={26}
          gap={16}
          items={[
            <>
              <InlineHighlight color="#D1FAE5">Cek jalur</InlineHighlight> sebelum jalan.
            </>,
            <>
              <InlineHighlight>Belok</InlineHighlight> ke kotak kosong aman.
            </>,
            <>
              Ikuti panah sampai <InlineHighlight color="#D1FAE5">finis</InlineHighlight>.
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
            padding: '22px 24px',
            ...row,
            justifyContent: 'center',
            gap: 22,
          }}
        >
          <div style={{ width: 96, height: 96, borderRadius: 18, background: WHITE, border: `2.5px solid ${CORAL}`, ...centerCol }}>
            <BikoTokenSvg size={68} alert />
          </div>
          <JuniorIcon name="warning" size={36} />
          <div style={{ width: 96, height: 96, borderRadius: 18, background: '#FEE2E2', border: `2.5px solid ${CORAL}`, ...centerCol }}>
            <RockSvg size={70} withCross />
          </div>
        </div>

        <BulletList
          bulletColor={CORAL}
          fontSize={26}
          gap={16}
          items={[
            <>
              Jangan <InlineHighlight color="#FECACA">tabrak batu</InlineHighlight> penghalang.
            </>,
            <>
              Jangan <InlineHighlight color="#FECACA">asal susun</InlineHighlight> panah.
            </>,
            <>
              Jangan lewat <InlineHighlight color="#FECACA">semak berduri</InlineHighlight>.
            </>,
          ]}
        />
      </InfoPanel>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Taklukkan Labirin Digital! (Interactive 4-Slot Maze)
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const [slots, setSlots] = useState<(Dir | null)[]>([null, null, null, null]);
  const [bikoPos, setBikoPos] = useState<[number, number]>([2, 0]);
  const [status, setStatus] = useState<'idle' | 'running' | 'win' | 'hit'>('idle');
  const [message, setMessage] = useState<{ icon?: JuniorIconName; text: string }>({
    text: 'Susun 4 panah menuju Peti Harta Karun!',
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
    setMessage({ text: 'Susun 4 panah menuju Peti Harta Karun!' });
  };

  const fillHint = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setSlots(['right', 'up', 'right', 'up']);
    setBikoPos([2, 0]);
    setStatus('idle');
    setMessage({ icon: 'bulb', text: 'Petunjuk siap! Klik "Jalan!" ya.' });
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
      setMessage({ text: 'Pilih panah dulu ya!' });
      return;
    }

    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStatus('running');
    setBikoPos([2, 0]);
    setMessage({ text: 'Biko mulai berjalan...' });

    const obstacles = new Set(['1,0', '2,2', '0,1']);
    let r = 2;
    let c = 0;

    const stepNext = (i: number) => {
      if (i >= active.length) {
        if (r === 0 && c === 2) {
          setStatus('win');
          setMessage({ icon: 'party', text: 'Hore! Dapat Peti Harta Karun!' });
        } else {
          setStatus('hit');
          setMessage({ text: 'Belum sampai! Cek lagi langkahnya.' });
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
        setMessage({ text: 'Ups! Biko keluar peta!' });
        return;
      }

      if (obstacles.has(`${r},${c}`)) {
        setStatus('hit');
        setMessage({ icon: 'warning', text: 'Awas! Ada batu atau semak!' });
        return;
      }

      setBikoPos([r, c]);

      if (r === 0 && c === 2) {
        setStatus('win');
        setMessage({ icon: 'party', text: 'Yeay! Biko dapat Harta Karun!' });
        return;
      }

      timerRef.current = window.setTimeout(() => stepNext(i + 1), 430);
    };

    timerRef.current = window.setTimeout(() => stepNext(0), 280);
  };

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle top={104}>
        Misi <Highlight>Labirin Digital!</Highlight>
      </SlideTitle>

      {/* Top Flat Guide Strip (no fake-button shadows, no raw arrow emojis) */}
      <InfoPanel bg={WHITE} padding={14} style={{ ...abs(X0, 188, W, 74), ...row, justifyContent: 'space-around' }}>
        <span style={{ fontSize: 22, fontWeight: 800 }}>
          1. Amati <InlineHighlight color="#FECACA">batu &amp; semak</InlineHighlight>
        </span>
        <JuniorIcon name="arrow-right" size={22} />
        <span style={{ fontSize: 22, fontWeight: 800 }}>
          2. Susun <InlineHighlight>4 blok panah</InlineHighlight>
        </span>
        <JuniorIcon name="arrow-right" size={22} />
        <span style={{ fontSize: 22, fontWeight: 800 }}>
          3. Klik <InlineHighlight color="#D1FAE5">Jalan!</InlineHighlight>
        </span>
      </InfoPanel>

      {/* Bottom Interactive Game Window */}
      <MacWindowCard left={X0} top={284} width={1280} height={685} headerLabel="game-labirin-digital" padding={24}>
        <div style={{ display: 'grid', gridTemplateColumns: '500px 1fr', gap: 26, height: '100%' }}>
          {/* 3x3 Labyrinth Board */}
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
                gridTemplateColumns: 'repeat(3, 146px)',
                gridTemplateRows: 'repeat(3, 148px)',
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
                        border: hasBiko ? `3.5px solid ${SKY}` : `2.5px solid ${CHARCOAL}`,
                        ...centerCol,
                        position: 'relative',
                      }}
                    >
                      {isBush && <BushSvg size={82} withCross />}
                      {(isRock1 || isRock2) && <RockSvg size={82} withCross />}
                      {isGoal && !hasBiko && <ChestSvg size={82} />}
                      {hasBiko && (
                        <BikoTokenSvg
                          size={94}
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

          {/* Right Controls: Palette + 4 Sequence Slots + Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <SectionHeading size={24}>1. Klik atau Tarik Panah:</SectionHeading>
              <div style={{ ...row, gap: 14, marginTop: 12 }}>
                {(['up', 'down', 'left', 'right'] as Dir[]).map((d) => (
                  <div key={d} draggable onDragStart={() => setDragDir(d)} style={{ display: 'inline-flex' }}>
                    <MazeArrowBlock dir={d} size={80} onClick={() => addBlock(d)} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading size={24}>2. Slot Rute Pintar (4 Langkah):</SectionHeading>
              <div
                style={{
                  ...row,
                  gap: 14,
                  marginTop: 12,
                  padding: '16px 20px',
                  borderRadius: 20,
                  background: '#F8FAFC',
                  border: `2.5px solid ${CHARCOAL}`,
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
                      border: dir ? `2.5px solid ${CHARCOAL}` : `3px dashed #64748B`,
                      ...centerCol,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                    title="Klik untuk hapus blok"
                  >
                    {dir ? (
                      <MazeArrowBlock dir={dir} size={74} stepNum={idx + 1} />
                    ) : (
                      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, color: '#64748B' }}>
                        {idx + 1}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div
                style={{
                  padding: '12px 18px',
                  borderRadius: 16,
                  background: status === 'win' ? TEAL_SOFT : status === 'hit' ? CORAL_SOFT : SUNNY_SOFT,
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

              <div style={{ ...row, gap: 12 }}>
                <button
                  type="button"
                  className="cpj7-card-btn"
                  onClick={runMaze}
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
                  className="cpj7-card-btn"
                  onClick={fillHint}
                  style={{
                    padding: '13px 18px',
                    borderRadius: 18,
                    background: SUNNY,
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
                  <JuniorIcon name="bulb" size={22} />
                  <span>Petunjuk</span>
                </button>
                <button
                  type="button"
                  className="cpj7-card-btn"
                  onClick={resetGame}
                  style={{
                    padding: '13px 18px',
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
                  <span>Reset</span>
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
          <SectionHeading icon="map" size={24}>
            Ingat Rute Aman:
          </SectionHeading>
          <BulletList
            bulletColor={TEAL}
            fontSize={21}
            gap={10}
            items={[
              <>
                Hindari <InlineHighlight color="#FECACA">batu &amp; semak</InlineHighlight>.
              </>,
              <>
                Susun <InlineHighlight color="#D1FAE5">jalur tangga</InlineHighlight> aman.
              </>,
              <>Tuju peti harta karun!</>,
            ]}
          />
        </div>

        <div style={{ ...centerCol }}>
          <BikoMascot
            pose={status === 'win' ? 'jump' : 'thumbs-up'}
            width={255}
            speechBubble={status === 'win' ? 'Penjelajah Hebat!' : 'Ayo ke peti harta!'}
          />
        </div>
      </InfoPanel>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 7 (Summary Bullets + Gold Medal)
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
            animation: live ? `cpj7-confetti ${2.4 + idx * 0.3}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={104} size={58}>
        Hebat! Kamu <Highlight>Penjelajah Pintar!</Highlight>
      </SlideTitle>

      {/* Center Celebration & Recap Card */}
      <MacWindowCard left={180} top={210} width={1180} height={745} headerLabel="lencana-pertemuan-7" padding={34}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '430px 1fr', gap: 36, alignItems: 'center' }}>
          {/* Left: Gold Medal + Flat Achievement Banner */}
          <div style={{ ...centerCol, gap: 22 }}>
            <svg
              width={255}
              height={255}
              viewBox="0 0 240 240"
              fill="none"
              style={{ animation: live ? 'cpj7-float 3s ease-in-out infinite' : undefined }}
            >
              <path d="M74 16 L104 94 H136 L166 16 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
              <path d="M94 16 L120 88 L146 16" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="140" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={6} />
              <circle cx="120" cy="140" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={4} />
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
              <span>Lencana Penjelajah Labirin</span>
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
                  Mengenali <InlineHighlight color="#FECACA">batu &amp; semak</InlineHighlight> penghalang.
                </>,
                <>
                  Memilih <InlineHighlight color="#D1FAE5">kotak kosong</InlineHighlight> yang aman.
                </>,
                <>
                  Menyusun rute <InlineHighlight>maju &amp; berbelok</InlineHighlight>.
                </>,
                <>
                  Menaklukkan misi <InlineHighlight color={SKY_SOFT}>labirin digital</InlineHighlight>.
                </>,
              ]}
            />

            <InfoPanel bg={TEAL_SOFT} borderColor={TEAL} padding={18} style={{ ...row, justifyContent: 'center', gap: 16 }}>
              <MazeArrowBlock dir="up" size={62} />
              <MazeArrowBlock dir="right" size={62} />
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
          badgeIcon={<JuniorIcon name="compass" size={28} />}
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
Supaya tidak menabrak, Biko harus naik 1 kotak lalu maju ke kanan 2 kotak: Atas + Kanan + Kanan!`,

  `Permainan Cepat! Lihat peta di layar:
Di depan Biko ada batu, di bawah ada kaktus berduri, dan di atas ada jalan kosong. Ayo pilih: Belok Atas atau Belok Bawah?`,

  `Latihan Rute #2: Tantangan Rute Zig-Zag!
Ada semak berduri di atas dan batu di kanan. Biko bisa jalan seperti tangga: 1. Kanan, 2. Atas, 3. Kanan sampai Finis!`,

  `Tips Jagoan Labirin Digital:
BOLEH cek jalur dulu sebelum jalan dan belok ke kotak kosong.
JANGAN menabrak batu atau terburu-buru menyusun blok panah!`,

  `Ayo main Game Labirin Digital!
Amati letak semak & batu, rangkai 4 blok panah (petunjuk jalur tangga: Kanan, Atas, Kanan, Atas), lalu tekan tombol hijau Jalan!`,

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

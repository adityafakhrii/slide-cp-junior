import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

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
  50% { transform: translateY(-8px); }
}
@keyframes cpj10-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-10px) scale(1.04); }
}
@keyframes cpj10-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(8px) rotate(14deg); }
}
@keyframes cpj10-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-2deg); }
  75% { transform: translateX(7px) rotate(2deg); }
}
.cpj10-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj10-card-btn:hover {
  transform: translateY(-3px);
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
// Shared Chrome, Typography, Highlights, Bullet Lists & Panel Containers
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
          gap: 10,
          padding: '8px 20px',
          borderRadius: 12,
          background: WHITE,
          border: `2px solid ${CHARCOAL}`,
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          zIndex: 5,
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
  const baseStyle: CSSProperties = {
    position: 'relative',
    width: size,
    height: size,
    borderRadius: Math.round(size * 0.24),
    background: m.color,
    border: `3px solid ${CHARCOAL}`,
    boxShadow: active
      ? `0 0 0 6px ${SUNNY}`
      : onClick
        ? `0 5px 0 ${CHARCOAL}`
        : undefined,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flexShrink: 0,
  };

  const inner = (
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
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="cpj10-card-btn"
        style={{ ...baseStyle, cursor: 'pointer' }}
        aria-label={`Blok panah ${m.label}`}
      >
        {inner}
      </button>
    );
  }

  return (
    <div style={baseStyle} aria-label={`Blok panah ${m.label}`}>
      {inner}
    </div>
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
        <span style={{ ...row, gap: 6, fontFamily: 'var(--osd-font-display)', fontSize: Math.round(21 * scale), fontWeight: 700 }}>
          <JuniorIcon name="repeat" size={Math.round(22 * scale)} />
          <span>Ulangi</span>
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
// SLIDE 01 — Cover (Heading H1 + Concise Bullet InfoPanel + Shield Showcase)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="JUNIOR • PERTEMUAN 10" accentDot={SUNNY}>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 170, 820, 770), display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            alignSelf: 'flex-start',
            padding: '8px 18px',
            borderRadius: 12,
            background: SUNNY_SOFT,
            border: `2px solid ${CHARCOAL}`,
            fontSize: 20,
            fontWeight: 800,
            color: '#92400E',
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
          Tantangan
          <br />
          <Highlight>Jagoan Logika!</Highlight>
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
          Misi Mandiri Urutan &amp; Arah di Laptop
        </p>

        <InfoPanel bg={WHITE} padding={26} style={{ marginTop: 6 }}>
          <SectionHeading icon="trophy" size={26} accentColor={CHARCOAL}>
            Yang Akan Kita Lakukan:
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={SUNNY}
              fontSize={24}
              gap={12}
              items={[
                <>
                  Gabung <InlineHighlight>arah, urutan, ulangi</InlineHighlight>.
                </>,
                <>
                  Baca peta dan <InlineHighlight color="#D1FAE5">hindari rintangan</InlineHighlight>.
                </>,
                <>
                  Selesaikan misi <InlineHighlight color={SKY_SOFT}>sendiri di laptop</InlineHighlight>.
                </>,
              ]}
            />
          </div>
        </InfoPanel>
      </div>

      {/* Right Visual Showcase: Superhero Shield Backdrop + Cape Biko */}
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
          <svg width="100%" height="100%" viewBox="0 0 650 640" fill="none" style={{ opacity: 0.25 }}>
            <circle cx="325" cy="300" r="215" stroke={SUNNY} strokeWidth={6} strokeDasharray="18 14" />
            <circle cx="325" cy="300" r="145" stroke={SKY} strokeWidth={4} />
          </svg>
        </div>

        {/* Mini Laptop displaying Map, Blocks & Star Trophy */}
        <InfoPanel
          bg={WHITE}
          padding={16}
          style={{
            position: 'absolute',
            left: 20,
            top: 44,
            width: 390,
            borderRadius: 22,
            zIndex: 4,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700, color: MUTED }}>
              Peta Petualangan
            </span>
            <TrophySvg size={38} />
          </div>
          <div style={{ ...row, justifyContent: 'center', gap: 10 }}>
            <HeroArrowBlock dir="right" size={56} showRightTab />
            <HeroArrowBlock dir="up" size={56} showRightTab />
            <HeroArrowBlock dir="right" size={56} />
            <StarSvg size={50} />
          </div>
        </InfoPanel>

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

        {/* Floating Trophy Badge */}
        <InfoPanel
          bg={WHITE}
          padding={12}
          style={{
            position: 'absolute',
            right: 18,
            bottom: 62,
            borderRadius: 20,
            ...row,
            gap: 10,
            zIndex: 5,
            animation: live ? 'cpj10-float 2.8s ease-in-out infinite' : undefined,
          }}
        >
          <TrophySvg size={42} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700, color: CHARCOAL }}>
            Misi Jagoan!
          </span>
        </InfoPanel>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 InfoPanel Cards + Biko)
// ============================================================================
const Slide02Misi: Page = () => (
  <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
    <SlideTitle>
      Apa <Highlight>Misi Kita</Highlight> Hari Ini?
    </SlideTitle>

    <MacWindowCard left={X0} top={215} width={1320} height={745} headerLabel="misi-pertemuan-10" padding={34}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, height: '100%' }}>
        {/* Kartu 1 */}
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
            <SectionHeading icon="compass" size={32}>
              Gabung <Highlight color={STABILO}>Jurus Logika</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${SKY}`,
              padding: '26px 20px',
              ...row,
              justifyContent: 'center',
              gap: 18,
            }}
          >
            <HeroArrowBlock dir="right" size={68} showRightTab />
            <RepeatHugBlock count={3} dir="right" scale={0.76} />
          </div>

          <BulletList
            bulletColor={SKY}
            fontSize={24}
            gap={10}
            items={[
              <>
                Pilih <InlineHighlight>arah langkah</InlineHighlight> yang tepat.
              </>,
              <>
                Ringkas jalan lurus pakai <InlineHighlight color={WHITE}>Ulangi</InlineHighlight>.
              </>,
            ]}
          />
        </InfoPanel>

        {/* Kartu 2 */}
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
            <SectionHeading icon="laptop" size={32}>
              Main <Highlight color="#A7F3D0">Sendiri</Highlight> di Laptop
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${TEAL}`,
              padding: '16px 20px',
              ...centerCol,
            }}
          >
            <BikoMascot pose="laptop" width={170} />
          </div>

          <BulletList
            bulletColor={TEAL}
            fontSize={24}
            gap={10}
            items={[
              <>
                Susun blok <InlineHighlight color="#D1FAE5">sendiri tanpa takut</InlineHighlight>.
              </>,
              <>
                Capai garis <InlineHighlight color={WHITE}>Finis</InlineHighlight> sampai menang!
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="point-left"
      width={360}
      speechBubble="Siap jadi Jagoan!"
      style={{ ...abs(1455, 315) }}
    />
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Bekal Petualangan: 4 Jurus Hebatmu! (Interactive 2x2 + Biko Center)
// ============================================================================
const Slide03BekalPetualangan: Page = () => {
  const [selected, setSelected] = useState<number>(0);

  const powers: Array<{
    key: string;
    icon: JuniorIconName;
    label: string;
    desc: string;
    color: string;
    soft: string;
    tip: string;
  }> = [
    {
      key: 'arah',
      icon: 'compass',
      label: 'Arah',
      desc: 'Pilih Atas, Bawah, Kiri, Kanan.',
      color: SKY,
      soft: SKY_SOFT,
      tip: 'Ingat arah langkah di peta!',
    },
    {
      key: 'urutan',
      icon: 'link',
      label: 'Urutan Rapi',
      desc: 'Susun blok dari awal.',
      color: SUNNY,
      soft: SUNNY_SOFT,
      tip: 'Tempel blok satu per satu!',
    },
    {
      key: 'ulangi',
      icon: 'repeat',
      label: 'Blok Ulangi',
      desc: 'Pendekkan langkah lurus yang sama.',
      color: TEAL,
      soft: TEAL_SOFT,
      tip: 'Pakai Ulangi biar kode pendek!',
    },
    {
      key: 'debug',
      icon: 'magnifier',
      label: 'Cek & Perbaiki',
      desc: 'Cari blok salah lalu ganti.',
      color: CORAL,
      soft: CORAL_SOFT,
      tip: 'Salah itu biasa, ayo perbaiki!',
    },
  ];

  return (
    <JuniorFrame badge="BEKAL PETUALANGAN" accentDot={SUNNY}>
      <SlideTitle>
        Ingat <Highlight>4 Jurus</Highlight> Hebatmu!
      </SlideTitle>

      <MacWindowCard left={X0} top={215} width={1720} height={745} headerLabel="bekal-4-jurus" padding={34}>
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
              key={p.key}
              type="button"
              className="cpj10-card-btn"
              onClick={() => setSelected(idx)}
              style={{
                borderRadius: 24,
                background: p.soft,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: selected === idx ? `0 0 0 6px ${SUNNY}, 0 6px 0 ${CHARCOAL}` : `0 6px 0 ${p.color}`,
                padding: '26px 30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'left',
                gap: 12,
              }}
            >
              <SectionHeading icon={p.icon} size={34} accentColor={CHARCOAL}>
                {p.label}
              </SectionHeading>
              <div style={{ fontSize: 24, fontWeight: 700, color: MUTED, lineHeight: 1.35 }}>{p.desc}</div>
            </button>
          ))}

          {/* Biko standing in Center Intersection */}
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
// SLIDE 04 — Jurus Jagoan Mandiri di Laptop (3 Step Buttons + InfoPanel)
// ============================================================================
const Slide04JurusMandiri: Page = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      num: '1',
      title: 'Lihat Peta',
      desc: 'Cari jalan yang aman.',
      icon: 'eyes' as JuniorIconName,
      color: SKY,
      soft: SKY_SOFT,
    },
    {
      num: '2',
      title: 'Susun Blok',
      desc: 'Rangkai arah dan ulangi.',
      icon: 'puzzle' as JuniorIconName,
      color: SUNNY,
      soft: SUNNY_SOFT,
    },
    {
      num: '3',
      title: 'Tekan Jalan',
      desc: 'Cek sampai garis Finis.',
      icon: 'play' as JuniorIconName,
      color: TEAL,
      soft: TEAL_SOFT,
    },
  ];

  return (
    <JuniorFrame badge="JURUS MANDIRI" accentDot={TEAL}>
      <SlideTitle>
        Cara Main <Highlight>Sendiri</Highlight> di Laptop!
      </SlideTitle>

      <MacWindowCard left={X0} top={215} width={1720} height={745} headerLabel="jurus-mandiri" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 22 }}>
          {/* 3 Interactive Step Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, flex: 1 }}>
            {steps.map((s, idx) => (
              <button
                key={s.num}
                type="button"
                className="cpj10-card-btn"
                onClick={() => setStep(idx)}
                style={{
                  borderRadius: 24,
                  background: s.soft,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: step === idx ? `0 0 0 6px ${SUNNY}, 0 6px 0 ${CHARCOAL}` : `0 6px 0 ${s.color}`,
                  padding: '24px 26px',
                  ...centerCol,
                  gap: 14,
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: s.color === SUNNY ? '#92400E' : s.color === SKY ? '#1D4ED8' : '#047857',
                    letterSpacing: '0.06em',
                  }}
                >
                  LANGKAH {s.num}
                </span>
                <JuniorIcon name={s.icon} size={58} />
                <SectionHeading size={34}>{s.title}</SectionHeading>
                <div style={{ fontSize: 23, fontWeight: 700, color: MUTED, lineHeight: 1.35 }}>{s.desc}</div>
              </button>
            ))}
          </div>

          {/* Bottom Flat Guidance Panel */}
          <InfoPanel
            bg="#F8FAFC"
            padding={22}
            style={{
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SectionHeading icon="laptop" size={28}>
                Duduk Tenang &amp; Fokus!
              </SectionHeading>
              <BulletList
                bulletColor={TEAL}
                fontSize={22}
                gap={6}
                items={[
                  <>Gerakkan mouse pelan-pelan.</>,
                  <>Ikuti 3 langkah di atas satu per satu.</>,
                ]}
              />
            </div>
            <BikoMascot pose="laptop" width={180} />
          </InfoPanel>
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
      <MacWindowCard left={X0} top={215} width={920} height={745} headerLabel="pulau-bintang-4x3" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <SectionHeading icon="island" size={26}>
              Peta Pulau 4×3
            </SectionHeading>
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
                ...row,
                gap: 8,
              }}
            >
              <JuniorIcon name="play" size={22} />
              <span>Jalankan!</span>
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 165px)',
              gridTemplateRows: 'repeat(3, 145px)',
              gap: 12,
              justifyContent: 'center',
              alignContent: 'center',
              background: '#EFF6FF',
              padding: 20,
              borderRadius: 22,
              border: `2.5px solid ${CHARCOAL}`,
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
                            DAPAT!
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
              fontFamily: 'var(--osd-font-display)',
              fontSize: 23,
              fontWeight: 700,
              color: step === 4 ? '#047857' : MUTED,
            }}
          >
            {step === 0 && 'Hindari pohon kelapa! Jalan 3× kanan lalu 1× atas.'}
            {step >= 1 && step <= 3 && `Blok Ulangi: Jalan Kanan ke-${step} dari 3`}
            {step === 4 && (
              <>
                <JuniorIcon name="party" size={24} />
                <span>Belok Atas selesai — Sampai di Bintang!</span>
              </>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card: Bullet Steps + Block Combination */}
      <MacWindowCard left={1055} top={215} width={765} height={745} headerLabel="kode-pulau-bintang" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
          <div>
            <SectionHeading icon="repeat" size={28}>
              Langkah Menuju Bintang:
            </SectionHeading>
            <div style={{ marginTop: 14 }}>
              <BulletList
                bulletColor={TEAL}
                fontSize={24}
                gap={12}
                items={[
                  <>
                    Jalan lurus <InlineHighlight color={SKY_SOFT}>3 kotak kanan</InlineHighlight>.
                  </>,
                  <>
                    Belok <InlineHighlight color="#D1FAE5">1 kotak atas</InlineHighlight> ke Bintang.
                  </>,
                  <>Pakai Blok Ulangi biar ringkas!</>,
                ]}
              />
            </div>
          </div>

          <InfoPanel bg={SUNNY_SOFT} padding={26} style={{ ...centerCol, gap: 18 }}>
            <SectionHeading size={24}>Rangkaian Kode Ringkas:</SectionHeading>
            <div style={{ ...row, gap: 16 }}>
              <RepeatHugBlock count={3} dir="right" scale={0.96} showRightTab />
              <HeroArrowBlock dir="up" size={96} active={step === 4} />
            </div>
          </InfoPanel>

          <div style={{ ...centerCol }}>
            <BikoMascot pose="thumbs-up" width={190} speechBubble="Cuma 2 blok utama!" />
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
      <SlideTitle align="center" top={104}>
        Kode Mana yang <Highlight>Sampai ke Bintang?</Highlight>
      </SlideTitle>

      {/* Top Interactive Map (3x3): Biko at (1,0), Rock at (1,1), Star at (0,2) */}
      <MacWindowCard left={220} top={196} width={1480} height={285} headerLabel="tebak-kode-bintang" padding={20}>
        <div style={{ ...row, justifyContent: 'center', gap: 56, height: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 108px)',
              gridTemplateRows: 'repeat(3, 62px)',
              gap: 8,
              background: '#F8FAFC',
              padding: 12,
              borderRadius: 18,
              border: `2.5px solid ${CHARCOAL}`,
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
                      border: `2px solid ${CHARCOAL}`,
                      ...centerCol,
                    }}
                  >
                    {isBikoStart && <BikoHeroToken size={46} />}
                    {isRock && <RockSvg size={48} />}
                    {isStar && choice !== 'B' && <StarSvg size={46} />}
                    {isStar && choice === 'B' && <BikoHeroToken size={46} />}
                    {choice === 'B' && isSafeUp && <JuniorIcon name="arrow-up" size={22} />}
                    {choice === 'B' && isSafeMid && <JuniorIcon name="arrow-right" size={22} />}
                  </div>
                );
              }),
            )}
          </div>

          <div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SectionHeading icon="rock" size={30}>
              Awas Ada Batu!
            </SectionHeading>
            <BulletList
              bulletColor={CORAL}
              fontSize={22}
              gap={8}
              items={[
                <>
                  Batu ada di <InlineHighlight color="#FECACA">sebelah kanan</InlineHighlight>.
                </>,
                <>
                  Pilih jalur aman ke <InlineHighlight>Bintang</InlineHighlight>.
                </>,
              ]}
            />
          </div>
        </div>
      </MacWindowCard>

      {/* Bottom 2 Interactive Choice Buttons + Biko Question */}
      <button
        type="button"
        className="cpj10-card-btn"
        onClick={() => setChoice('A')}
        style={{
          ...abs(140, 515, 595, 345),
          borderRadius: 26,
          background: choice === 'A' ? CORAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 'A' ? `0 0 0 6px ${CORAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${CORAL}`,
          padding: 24,
          ...centerCol,
          justifyContent: 'space-between',
          animation: choice === 'A' ? 'cpj10-shake 0.35s ease' : undefined,
        }}
      >
        <span style={{ fontSize: 19, fontWeight: 800, color: '#B91C1C', letterSpacing: '0.06em' }}>
          PILIHAN A (KLIK UNTUK PILIH)
        </span>
        <div style={{ ...row, gap: 14 }}>
          <HeroArrowBlock dir="right" size={82} showRightTab />
          <HeroArrowBlock dir="right" size={82} showRightTab />
          <HeroArrowBlock dir="up" size={82} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700, color: CHARCOAL }}>
          {choice === 'A' ? (
            <span style={{ ...row, justifyContent: 'center', gap: 8 }}>
              <JuniorIcon name="warning" size={24} />
              <span>Nabrak batu di kanan!</span>
            </span>
          ) : (
            'Kanan, Kanan, Atas'
          )}
        </div>
      </button>

      <div style={{ ...abs(760, 505, 400, 365), ...centerCol }}>
        <BikoMascot
          pose={choice === 'B' ? 'thumbs-up' : 'question'}
          width={240}
          speechBubble={
            choice === 'B'
              ? 'Yeay! Naik lalu kanan!'
              : choice === 'A'
                ? 'Aduh, nabrak batu!'
                : 'Klik A atau B!'
          }
        />
      </div>

      <button
        type="button"
        className="cpj10-card-btn"
        onClick={() => setChoice('B')}
        style={{
          ...abs(1185, 515, 595, 345),
          borderRadius: 26,
          background: choice === 'B' ? TEAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 'B' ? `0 0 0 6px ${TEAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${TEAL}`,
          padding: 24,
          ...centerCol,
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 19, fontWeight: 800, color: '#047857', letterSpacing: '0.06em' }}>
          PILIHAN B (KLIK UNTUK PILIH)
        </span>
        <div style={{ ...row, gap: 14 }}>
          <HeroArrowBlock dir="up" size={82} showRightTab />
          <HeroArrowBlock dir="right" size={82} showRightTab />
          <HeroArrowBlock dir="right" size={82} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700, color: CHARCOAL }}>
          {choice === 'B' ? (
            <span style={{ ...row, justifyContent: 'center', gap: 8 }}>
              <JuniorIcon name="check" size={24} />
              <span>Naik dulu lalu belok kanan!</span>
            </span>
          ) : (
            'Atas, Kanan, Kanan'
          )}
        </div>
      </button>

      {/* Bottom Flat Feedback Strip */}
      <div style={{ ...abs(420, 900, 1080, 62), ...centerCol }}>
        <div
          style={{
            padding: '10px 28px',
            borderRadius: 16,
            background: choice === 'B' ? TEAL_SOFT : SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 24,
            fontWeight: 700,
            ...row,
            gap: 8,
          }}
        >
          {choice === 'B' ? (
            <>
              <JuniorIcon name="party" size={24} />
              <span>
                Hebat! <InlineHighlight color="#A7F3D0">Naik ke atas</InlineHighlight> dulu, lalu 2× kanan!
              </span>
            </>
          ) : (
            <span>Klik kode A atau B yang sampai ke Bintang!</span>
          )}
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
      <MacWindowCard left={X0} top={215} width={920} height={745} headerLabel="lembah-rintangan-4x4" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <SectionHeading size={26}>Peta Petualangan 4×4</SectionHeading>
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
                ...row,
                gap: 8,
              }}
            >
              <JuniorIcon name="play" size={22} />
              <span>Ikuti Jejak Aman!</span>
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 152px)',
              gridTemplateRows: 'repeat(4, 114px)',
              gap: 10,
              justifyContent: 'center',
              alignContent: 'center',
              background: '#FFF7ED',
              padding: 18,
              borderRadius: 22,
              border: `2.5px solid ${CHARCOAL}`,
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
                      <span
                        aria-hidden
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 99,
                          background: TEAL,
                          opacity: 0.45,
                        }}
                      />
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
              ? 'Hebat! Biko sampai di Peti Harta Karun!'
              : 'Ikuti titik hijau aman menuju Peti Harta Karun!'}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card: Strategy Bullets + Blocks + Biko */}
      <MacWindowCard left={1055} top={215} width={765} height={745} headerLabel="strategi-lembah" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
          <div>
            <SectionHeading icon="compass" size={28}>
              Strategi Lembah Rintangan:
            </SectionHeading>
            <div style={{ marginTop: 14 }}>
              <BulletList
                bulletColor={ORANGE}
                fontSize={24}
                gap={12}
                items={[
                  <>
                    Hindari <InlineHighlight color="#FECACA">batu dan kaktus</InlineHighlight>.
                  </>,
                  <>
                    Gabung <InlineHighlight color="#D1FAE5">belok dan Blok Ulangi</InlineHighlight>.
                  </>,
                  <>
                    Ikuti jalan ke <InlineHighlight>Peti Harta</InlineHighlight>.
                  </>,
                ]}
              />
            </div>
          </div>

          <InfoPanel bg={SUNNY_SOFT} padding={20} style={{ ...row, justifyContent: 'center', gap: 12 }}>
            <HeroArrowBlock dir="right" size={64} showRightTab />
            <HeroArrowBlock dir="up" size={64} showRightTab />
            <RepeatHugBlock count={2} dir="right" scale={0.7} showRightTab />
            <RepeatHugBlock count={2} dir="up" scale={0.7} />
          </InfoPanel>

          <div style={{ ...row, justifyContent: 'center' }}>
            <BikoMascot
              pose="point-left"
              width={210}
              speechBubble="Ikuti jalur aman ya!"
            />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Aturan Main Jagoan Mandiri (Boleh vs Jangan, InfoPanel)
// ============================================================================
const Slide08AturanMain: Page = () => (
  <JuniorFrame badge="ATURAN JAGOAN" accentDot={TEAL}>
    <SlideTitle>
      Aku Bisa <Highlight>Coba Sendiri!</Highlight>
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
        <div style={{ borderBottom: `2.5px solid ${TEAL_SOFT}`, paddingBottom: 14 }}>
          <SectionHeading icon="check" size={34} accentColor="#047857">
            BOLEH Dilakukan
          </SectionHeading>
        </div>

        <div
          style={{
            borderRadius: 20,
            background: TEAL_SOFT,
            border: `2.5px solid ${TEAL}`,
            padding: '18px 24px',
            ...centerCol,
          }}
        >
          <BikoMascot pose="laptop" width={185} />
        </div>

        <BulletList
          bulletColor={TEAL}
          fontSize={25}
          gap={16}
          items={[
            <>
              <InlineHighlight color="#D1FAE5">Pikir &amp; coba</InlineHighlight> sendiri dulu.
            </>,
            <>
              <InlineHighlight>Perbaiki kode</InlineHighlight> kalau masih salah.
            </>,
            <>
              Cek hasil <InlineHighlight color="#D1FAE5">sampai garis Finis</InlineHighlight>.
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
        <div style={{ borderBottom: `2.5px solid ${CORAL_SOFT}`, paddingBottom: 14 }}>
          <SectionHeading icon="cross" size={34} accentColor="#B91C1C">
            JANGAN Dilakukan
          </SectionHeading>
        </div>

        <div
          style={{
            borderRadius: 20,
            background: CORAL_SOFT,
            border: `2.5px solid ${CORAL}`,
            padding: '20px 24px',
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

        <BulletList
          bulletColor={CORAL}
          fontSize={25}
          gap={16}
          items={[
            <>
              <InlineHighlight color="#FECACA">Langsung minta</InlineHighlight> dibuatkan orang lain.
            </>,
            <>
              <InlineHighlight color="#FECACA">Menyerah cepat</InlineHighlight> saat karakter nyasar.
            </>,
            <>
              Tekan blok <InlineHighlight color="#FECACA">asal-asalan</InlineHighlight> tanpa dicek.
            </>,
          ]}
        />
      </InfoPanel>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Tantangan Utama: Petualangan Mandiri di Laptop!
// ============================================================================
const Slide09TantanganUtama: Page = () => {
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);

  const levels: Array<{
    num: 1 | 2 | 3;
    title: string;
    subtitle: string;
    color: string;
    soft: string;
    hint: string;
  }> = [
    {
      num: 1,
      title: 'Level 1',
      subtitle: 'Jejak Lurus & Belok',
      color: SKY,
      soft: SKY_SOFT,
      hint: 'Level 1: Susun langkah dasar hindari batu!',
    },
    {
      num: 2,
      title: 'Level 2',
      subtitle: 'Cari & Perbaiki Bug',
      color: SUNNY,
      soft: SUNNY_SOFT,
      hint: 'Level 2: Cari blok salah lalu perbaiki!',
    },
    {
      num: 3,
      title: 'Level 3',
      subtitle: 'Jurus Blok Ulangi',
      color: TEAL,
      soft: TEAL_SOFT,
      hint: 'Level 3: Gabung Blok Ulangi dan belok!',
    },
  ];

  const stepCards = [
    { num: '1', label: 'Buka misi di laptop', color: SKY, soft: SKY_SOFT },
    { num: '2', label: 'Susun blok arah sendiri', color: SUNNY, soft: SUNNY_SOFT },
    { num: '3', label: 'Capai Finis semua level', color: TEAL, soft: TEAL_SOFT },
  ];

  return (
    <JuniorFrame badge="TANTANGAN UTAMA!" accentDot={TEAL}>
      <SlideTitle top={104}>
        Waktunya <Highlight>Petualangan Mandiri!</Highlight>
      </SlideTitle>

      {/* Top 3 Flat Step Panels (no fake-button 3D shadows) */}
      <div style={{ ...abs(X0, 190, W, 82), display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {stepCards.map((sc) => (
          <InfoPanel
            key={sc.num}
            bg={sc.soft}
            padding={16}
            style={{
              ...row,
              gap: 16,
              borderRadius: 20,
            }}
          >
            <span
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: sc.color,
                color: sc.color === SUNNY ? CHARCOAL : WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 26,
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
          </InfoPanel>
        ))}
      </div>

      {/* Bottom Interactive Laptop Stage Card + Cheering Biko */}
      <MacWindowCard left={X0} top={296} width={1320} height={665} headerLabel="misi-mandiri-laptop" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <SectionHeading icon="laptop" size={30}>
              Pilih 3 Level Tantangan:
            </SectionHeading>
            <span
              style={{
                padding: '8px 18px',
                borderRadius: 14,
                background: SUNNY_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 21,
                fontWeight: 700,
                ...row,
                gap: 8,
              }}
            >
              <JuniorIcon name="star" size={22} />
              <span>Total 9 Bintang</span>
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
                    borderRadius: 24,
                    background: lv.soft,
                    border: `3.5px solid ${CHARCOAL}`,
                    boxShadow: active ? `0 0 0 6px ${SUNNY}, 0 6px 0 ${CHARCOAL}` : `0 6px 0 ${lv.color}`,
                    padding: '24px 22px',
                    ...centerCol,
                    gap: 16,
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 19,
                      fontWeight: 800,
                      color: lv.color === SUNNY ? '#92400E' : lv.color === SKY ? '#1D4ED8' : '#047857',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {lv.title.toUpperCase()}
                  </span>
                  <div style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                    <JuniorIcon name="star" size={28} />
                    <span>3 Bintang</span>
                  </div>
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
                      ...row,
                      gap: 10,
                    }}
                  >
                    {lv.num === 1 && (
                      <>
                        <HeroArrowBlock dir="right" size={44} showRightTab />
                        <HeroArrowBlock dir="up" size={44} />
                      </>
                    )}
                    {lv.num === 2 && (
                      <>
                        <JuniorIcon name="magnifier" size={28} />
                        <HeroArrowBlock dir="up" size={44} />
                      </>
                    )}
                    {lv.num === 3 && (
                      <>
                        <JuniorIcon name="repeat" size={28} />
                        <span>4×</span>
                        <HeroArrowBlock dir="right" size={44} />
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            style={{
              padding: '14px 24px',
              borderRadius: 18,
              background: TEAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
              ...row,
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <JuniorIcon name="flag" size={24} />
            <span>{levels[activeLevel - 1].hint}</span>
          </div>
        </div>
      </MacWindowCard>

      {/* Biko Waving Finish Flag */}
      <BikoMascot
        pose="wave"
        width={340}
        badgeIcon={<JuniorIcon name="flag" size={24} />}
        speechBubble="Semangat Jagoan!"
        style={{ ...abs(1475, 430) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 10 (Celebration Recap + Medal)
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
            animation: live ? `cpj10-confetti ${2.4 + idx * 0.3}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={104} size={58}>
        Luar Biasa! Kamu <Highlight>Jagoan Logika!</Highlight>
      </SlideTitle>

      {/* Center Celebration & Recap Card */}
      <MacWindowCard left={180} top={210} width={1180} height={745} headerLabel="lencana-pertemuan-10" padding={34}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '460px 1fr', gap: 36, alignItems: 'center' }}>
          {/* Left: Trophy + Medal + Flat Banner */}
          <div style={{ ...centerCol, gap: 22 }}>
            <div style={{ ...row, gap: 18, animation: live ? 'cpj10-float 3s ease-in-out infinite' : undefined }}>
              <TrophySvg size={180} />
              <svg width={200} height={200} viewBox="0 0 240 240" fill="none">
                <path d="M74 16 L104 94 H136 L166 16 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
                <path d="M94 16 L120 88 L146 16" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
                <circle cx="120" cy="140" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={6} />
                <circle cx="120" cy="140" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={4} />
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
              <span>Lencana Jagoan Logika</span>
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
                  Tentukan <InlineHighlight>arah dan urutan</InlineHighlight> rapi.
                </>,
                <>
                  Ringkas kode pakai <InlineHighlight color="#D1FAE5">Blok Ulangi</InlineHighlight>.
                </>,
                <>
                  Cari dan <InlineHighlight color={SKY_SOFT}>perbaiki blok salah</InlineHighlight>.
                </>,
                <>
                  Selesaikan misi <InlineHighlight>mandiri di laptop</InlineHighlight>!
                </>,
              ]}
            />
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko Celebrating Graduation */}
      <div style={{ ...abs(1400, 390, 420, 500), ...centerCol }}>
        <BikoMascot
          pose="jump"
          width={365}
          badgeIcon={<JuniorIcon name="trophy" size={24} />}
          speechBubble="Lulus Code Explorer!"
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
Arah panah, Urutan yang rapi, Blok Ulangi yang ringkas, dan Cek & Perbaiki (Debug)!`,

  `Bagaimana cara main sendiri di laptop?
1. Lihat Peta dan cari jalan aman dulu. 2. Susun Blok pelan-pelan. 3. Tekan Jalan dan periksa hasilnya!`,

  `Pemanasan #1: Bantu Biko ke Pulau Bintang!
Jalan lurus 3 kotak ke kanan memakai Ulangi 3 Kanan, lalu sambung 1 blok belok Atas sampai di Bintang!`,

  `Permainan Cepat! Di depan Biko ada batu besar!
Mana kode yang sampai ke bintang: Pilihan A (Kanan, Kanan, Atas) atau Pilihan B (Atas, Kanan, Kanan)?`,

  `Pemanasan #2: Lembah Rintangan 4×4!
Awas banyak batu dan kaktus berduri! Gabungkan jurus belok dan Blok Ulangi mengikuti jejak aman menuju peti harta karun!`,

  `Aturan Jagoan Mandiri:
BOLEH berpikir dan mencoba sendiri dulu, serta memperbaiki kode kalau masih ada yang salah.
JANGAN langsung minta dibuatkan atau menyerah ketika karakter nyasar!`,

  `Waktunya Tantangan Utama di laptop!
Buka misi petualangan di laptop kalian, susun blok arah dan Blok Ulangi sendiri, dan taklukkan Level 1 sampai Level 3!`,

  `Luar biasa untuk semua Jagoan Logika cilik!
Kalian resmi lulus tantangan akhir dan meraih Lencana Jagoan Logika!`,
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

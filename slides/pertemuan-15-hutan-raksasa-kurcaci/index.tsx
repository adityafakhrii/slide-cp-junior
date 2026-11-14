import { Fragment, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-15-hutan-raksasa-kurcaci';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj15-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj15-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-13px) scale(1.04); }
}
@keyframes cpj15-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj15-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj15-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj15-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7); }
  50% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
}
.cpj15-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj15-card-btn:hover {
  transform: translateY(-4px);
}
.cpj15-card-btn:active {
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
  accentDot = LAVENDER,
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
          animation: live ? 'cpj15-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: LAVENDER,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 15 • Hutan Raksasa &amp; Kurcaci!</span>
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
// Reusable Pertemuan 15 Visuals (Elephant, Bird, Forest Backdrop, Purple Blocks)
// ============================================================================

/** Cartoon Elephant Character SVG */
const ElephantSvg = ({
  size = 150,
  style,
}: {
  size?: number;
  style?: CSSProperties;
}) => (
  <svg width={size} height={size} viewBox="0 0 160 150" fill="none" style={{ transition: 'all 420ms cubic-bezier(0.22, 1, 0.36, 1)', ...style }}>
    <ellipse cx="80" cy="138" rx="48" ry="8" fill="rgba(30,30,44,0.16)" />
    {/* Tail */}
    <path d="M28 96 Q12 104 18 118" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" fill="none" />
    {/* Back & Front Legs */}
    <rect x="40" y="102" width="22" height="32" rx="9" fill="#94A3B8" stroke={CHARCOAL} strokeWidth={3.8} />
    <rect x="78" y="102" width="22" height="32" rx="9" fill="#94A3B8" stroke={CHARCOAL} strokeWidth={3.8} />
    {/* Body */}
    <ellipse cx="70" cy="88" rx="44" ry="34" fill="#94A3B8" stroke={CHARCOAL} strokeWidth={4} />
    {/* Big Floppy Ear */}
    <ellipse cx="78" cy="58" rx="22" ry="27" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="78" cy="60" rx="13" ry="17" fill="#FBCFE8" />
    {/* Head */}
    <circle cx="106" cy="58" r="28" fill="#94A3B8" stroke={CHARCOAL} strokeWidth={4} />
    {/* Trunk */}
    <path
      d="M130 60 C148 64, 152 88, 138 94 C131 97, 126 90, 130 85"
      fill="none"
      stroke={CHARCOAL}
      strokeWidth={14}
      strokeLinecap="round"
    />
    <path
      d="M130 60 C148 64, 152 88, 138 94 C131 97, 126 90, 130 85"
      fill="none"
      stroke="#94A3B8"
      strokeWidth={7.5}
      strokeLinecap="round"
    />
    {/* Eye & Tusk */}
    <circle cx="112" cy="49" r="4.5" fill={CHARCOAL} />
    <circle cx="113.5" cy="47.5" r="1.6" fill={WHITE} />
    <path d="M124 72 Q132 76 135 69" stroke={WHITE} strokeWidth={4.5} strokeLinecap="round" />
    <path d="M104 68 Q112 73 118 68" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
  </svg>
);

/** Cartoon Bird Character SVG */
const BirdSvg = ({
  size = 90,
  style,
}: {
  size?: number;
  style?: CSSProperties;
}) => (
  <svg width={size} height={size} viewBox="0 0 120 110" fill="none" style={{ transition: 'all 420ms cubic-bezier(0.22, 1, 0.36, 1)', ...style }}>
    {/* Tail Feathers */}
    <path d="M24 58 L6 44 L14 60 L6 70 L28 66 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
    {/* Feet */}
    <path d="M52 84 V98 M46 98 H58 M68 84 V98 M62 98 H74" stroke={SUNNY} strokeWidth={3.8} strokeLinecap="round" />
    {/* Round Body */}
    <ellipse cx="58" cy="58" rx="34" ry="29" fill={SKY} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="64" cy="64" rx="20" ry="16" fill="#E0F2FE" />
    {/* Cute Wing */}
    <path d="M40 52 C32 42, 46 32, 58 46 C62 52, 56 64, 44 62 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.4} />
    {/* Beak */}
    <polygon points="89,48 110,55 89,62" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.4} strokeLinejoin="round" />
    {/* Eye & Crest */}
    <path d="M54 29 Q58 14 66 26" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" fill="none" />
    <circle cx="75" cy="46" r="4.5" fill={CHARCOAL} />
    <circle cx="76.5" cy="44.5" r="1.5" fill={WHITE} />
  </svg>
);

/** Reusable Kucing Tic SVG for Slide 10 */
const TicCatSvg = ({ size = 140, waving = false }: { size?: number; waving?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <ellipse cx="70" cy="126" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path
      d="M96 98 C118 96, 126 76, 114 66 C106 60, 100 68, 104 75 C106 80, 100 88, 92 88"
      fill={ORANGE}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinecap="round"
    />
    <ellipse cx="56" cy="118" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="118" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="70" cy="95" rx="27" ry="24" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="70" cy="97" rx="16" ry="15" fill={SUNNY_SOFT} />
    <path
      d={waving ? 'M44 82 C26 74, 22 58, 30 52 C37 47, 45 58, 46 72' : 'M45 86 C32 90, 32 104, 42 104 C48 104, 50 96, 48 88'}
      fill={ORANGE}
      stroke={CHARCOAL}
      strokeWidth={3.8}
      strokeLinecap="round"
    />
    <path
      d="M94 86 C107 90, 107 104, 97 104 C91 104, 89 96, 91 88"
      fill={ORANGE}
      stroke={CHARCOAL}
      strokeWidth={3.8}
      strokeLinecap="round"
    />
    <path d="M38 50 L36 18 L60 36 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    <path d="M102 50 L104 18 L80 36 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    <ellipse cx="70" cy="57" rx="34" ry="29" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="70" cy="66" rx="22" ry="15" fill={WHITE} />
    <circle cx="57" cy="53" r="5" fill={CHARCOAL} />
    <circle cx="83" cy="53" r="5" fill={CHARCOAL} />
    <circle cx="58.5" cy="51.2" r="1.8" fill={WHITE} />
    <circle cx="84.5" cy="51.2" r="1.8" fill={WHITE} />
    <polygon points="66,60 74,60 70,65" fill={CORAL} />
    <path d="M62 67 Q70 74 78 67" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" fill="none" />
  </svg>
);

/** Lush Forest Backdrop SVG */
const ForestBackdropSvg = ({
  width = 480,
  height = 260,
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <svg width={width} height={height} viewBox="0 0 480 260" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    {/* Sky */}
    <rect x="0" y="0" width="480" height="260" fill="#DBEAFE" />
    <circle cx="420" cy="40" r="22" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
    {/* Distant Green Hills */}
    <path d="M0 165 Q130 120 260 155 Q370 185 480 140 V260 H0 Z" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={2.8} />
    {/* Forest Trees */}
    <rect x="50" y="88" width="22" height="88" rx="5" fill="#92400E" stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="61" cy="70" r="40" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="36" cy="84" r="26" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="86" cy="84" r="26" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />

    <rect x="378" y="96" width="22" height="82" rx="5" fill="#92400E" stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="389" cy="78" r="38" fill="#16A34A" stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="364" cy="90" r="24" fill="#16A34A" stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="414" cy="90" r="24" fill="#16A34A" stroke={CHARCOAL} strokeWidth={3} />

    {/* Lush Foreground Meadow */}
    <path d="M0 180 Q240 160 480 180 V260 H0 Z" fill="#22C55E" stroke={CHARCOAL} strokeWidth={2.8} />
    <circle cx="195" cy="212" r="5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="290" cy="222" r="5" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
  </svg>
);

/** Authentic ScratchJr Purple Looks / Trigger Jigsaw Block SVG */
const ScratchJrLooksBlock = ({
  kind,
  stepNum = 4,
  scale = 1,
  highlightNumber = false,
  onClick,
}: {
  kind: 'green-flag' | 'grow' | 'shrink' | 'reset-size';
  stepNum?: number;
  scale?: number;
  highlightNumber?: boolean;
  onClick?: () => void;
}) => {
  const isFlag = kind === 'green-flag';
  const fill = isFlag ? SUNNY : LAVENDER;
  const width = Math.round(136 * scale);
  const height = Math.round((kind === 'grow' || kind === 'shrink' ? 138 : 118) * scale);

  const bodyPath = isFlag
    ? 'M32 10 H106 C112 10, 116 14, 116 20 V42 C126 42, 130 48, 130 57 C130 66, 126 72, 116 72 V96 C116 102, 112 106, 106 106 H32 C16 106, 8 88, 8 58 C8 28, 16 10, 32 10 Z'
    : 'M14 10 H106 C112 10, 116 14, 116 20 V42 C126 42, 130 48, 130 57 C130 66, 126 72, 116 72 V96 C116 102, 112 106, 106 106 H14 C10 106, 8 102, 8 96 V72 C18 72, 22 66, 22 57 C22 48, 18 42, 8 42 V20 C8 14, 10 10, 14 10 Z';

  return (
    <div
      onClick={onClick}
      className={onClick ? 'cpj15-card-btn' : undefined}
      style={{
        position: 'relative',
        width,
        height,
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      <svg width={width} height={Math.round(118 * scale)} viewBox="0 0 136 118" fill="none">
        <path d={bodyPath} fill={CHARCOAL} transform="translate(0 5)" />
        <path d={bodyPath} fill={fill} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />

        {kind === 'green-flag' && (
          <>
            <rect x="44" y="27" width="7" height="62" rx="3.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} />
            <circle cx="47.5" cy="25" r="4.5" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.4} />
            <path d="M51 30 C64 25, 76 37, 94 31 L90 58 C75 63, 64 52, 51 56 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
          </>
        )}

        {kind === 'grow' && (
          <>
            {/* Giant Figure Silhouette + Outward Growth Arrows */}
            <circle cx="68" cy="40" r="11" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
            <path d="M50 84 C50 64, 86 64, 86 84 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
            <path d="M32 34 V24 H42 M94 24 H104 V34 M32 76 V86 H42 M94 86 H104 V76" fill="none" stroke={SUNNY} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}

        {kind === 'shrink' && (
          <>
            {/* Small Figure Silhouette + Inward Shrink Arrows */}
            <circle cx="68" cy="48" r="7.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
            <path d="M56 78 C56 64, 80 64, 80 78 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
            <path d="M34 28 L48 42 M102 28 L88 42 M34 84 L48 70 M102 84 L88 70" fill="none" stroke={SUNNY} strokeWidth={4.5} strokeLinecap="round" />
          </>
        )}

        {kind === 'reset-size' && (
          <>
            <circle cx="68" cy="44" r="9.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
            <path d="M53 80 C53 62, 83 62, 83 80 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
            <line x1="36" y1="58" x2="46" y2="58" stroke={SUNNY} strokeWidth={4.5} strokeLinecap="round" />
            <line x1="90" y1="58" x2="100" y2="58" stroke={SUNNY} strokeWidth={4.5} strokeLinecap="round" />
          </>
        )}
      </svg>

      {(kind === 'grow' || kind === 'shrink') && (
        <div
          style={{
            marginTop: Math.round(-16 * scale),
            minWidth: Math.round(52 * scale),
            height: Math.round(36 * scale),
            borderRadius: Math.round(12 * scale),
            background: WHITE,
            border: `${highlightNumber ? 4 : 3}px solid ${highlightNumber ? SUNNY : CHARCOAL}`,
            boxShadow: highlightNumber ? `0 0 0 5px rgba(251,191,36,0.45)` : `0 3px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(22 * scale),
            fontWeight: 700,
            color: CHARCOAL,
            ...centerCol,
            padding: '0 10px',
            zIndex: 2,
          }}
        >
          {stepNum}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Forest Leaf Canopy Showcase + Laptop + Biko)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 15" accentDot={LAVENDER}>
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
            background: LAVENDER_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#5B21B6',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="elephant" size={24} />
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
          Hutan
          <br />
          <Highlight>Raksasa &amp; Kurcaci!</Highlight>
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
          Menambah Karakter &amp; Mengubah Ukuran Gajah &amp; Burung
        </p>

        {/* Quick Pill Highlights */}
        <div style={{ ...row, gap: 18 }}>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: LAVENDER,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="grow" size={28} />
            <span>Gajah Raksasa</span>
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
            <JuniorIcon name="shrink" size={28} />
            <span>Burung Kurcaci</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Forest Leaf Canopy Frame (Distinct shape) + Laptop + Biko */}
      <div style={{ ...abs(980, 145, 845, 810), ...centerCol }}>
        {/* Leaf-Corner Canopy Backdrop */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 690,
            borderRadius: '210px 48px 210px 48px',
            background: 'linear-gradient(155deg, #ECFDF5 0%, #F3EEFF 55%, #FEF9C3 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${TEAL}`,
            overflow: 'hidden',
          }}
        />

        {/* Laptop Window showing Forest Stage with Giant Elephant & Tiny Bird */}
        <div
          style={{
            position: 'absolute',
            right: 40,
            top: 175,
            width: 485,
            borderRadius: 24,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            padding: 14,
            zIndex: 2,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
              <JuniorIcon name="tree" size={22} />
              <span>ScratchJr — Hutan Ajaib</span>
            </span>
            <JuniorIcon name="dot-purple" size={22} />
          </div>

          <div style={{ height: 225, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <ForestBackdropSvg width="100%" height="100%" />
            {/* Giant Elephant */}
            <div style={{ position: 'absolute', left: 100, bottom: 8 }}>
              <ElephantSvg size={185} />
            </div>
            {/* Tiny Kurcaci Bird */}
            <div
              style={{
                position: 'absolute',
                right: 78,
                top: 48,
                animation: live ? 'cpj15-float 2.4s ease-in-out infinite' : undefined,
              }}
            >
              <BirdSvg size={58} />
            </div>
          </div>

          <div style={{ marginTop: 10, ...row, justifyContent: 'center', gap: 14 }}>
            <span style={{ ...row, gap: 6, padding: '6px 14px', borderRadius: 12, background: LAVENDER_SOFT, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 17, fontWeight: 700 }}>
              <JuniorIcon name="grow" size={22} />
              <span>Raksasa!</span>
            </span>
            <span style={{ ...row, gap: 6, padding: '6px 14px', borderRadius: 12, background: SKY_SOFT, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 17, fontWeight: 700 }}>
              <JuniorIcon name="shrink" size={22} />
              <span>Kurcaci!</span>
            </span>
          </div>
        </div>

        {/* Biko Smiling beside the Laptop */}
        <BikoMascot
          pose="wave"
          width={325}
          badgeIcon={<JuniorIcon name="elephant" size={24} />}
          speechBubble="Simsalabim!"
          style={{ position: 'absolute', left: 10, bottom: 48, zIndex: 4 }}
        />

        {/* Floating Purple Pill */}
        <div
          style={{
            position: 'absolute',
            right: 22,
            bottom: 66,
            padding: '10px 18px',
            borderRadius: 20,
            background: SUNNY_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 5px 0 ${CHARCOAL}`,
            ...row,
            gap: 8,
            zIndex: 5,
            animation: live ? 'cpj15-float 2.8s ease-in-out infinite' : undefined,
          }}
        >
          <JuniorIcon name="dot-purple" size={24} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700 }}>
            Blok Ungu Baru!
          </span>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi Besar dalam macOS Window)
// ============================================================================
const Slide02Misi: Page = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
      <SlideTitle>
        Apa <Highlight>Misi Kita</Highlight> Hari Ini?
      </SlideTitle>

      <MacWindowCard left={X0} top={235} width={1320} height={700} headerLabel="misi-pertemuan-15.app" padding={36}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Card 1: Tambah Karakter Gajah & Burung */}
          <button
            type="button"
            className="cpj15-card-btn"
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

            <div style={{ ...row, gap: 18, height: 215, alignItems: 'center' }}>
              <JuniorIcon name="plus-circle" size={64} />
              <ElephantSvg size={135} />
              <BirdSvg size={82} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.28 }}>
              Tambah Karakter <Highlight color={WHITE}>Gajah &amp; Burung</Highlight>
            </div>
          </button>

          {/* Card 2: Ubah Ukuran Jadi Besar & Kecil */}
          <button
            type="button"
            className="cpj15-card-btn"
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

            <div style={{ ...row, gap: 18, height: 215, alignItems: 'center' }}>
              <ScratchJrLooksBlock kind="grow" stepNum={4} scale={1.08} />
              <ScratchJrLooksBlock kind="shrink" stepNum={4} scale={1.08} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.28 }}>
              Ubah Ukuran Jadi <Highlight color={SUNNY_SOFT}>Besar &amp; Kecil!</Highlight>
            </div>
          </button>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="point-left"
        width={355}
        badgeIcon={<JuniorIcon name="grow" size={24} />}
        speechBubble={selected === 0 ? '2 Teman Baru!' : 'Ubah Ukuran!'}
        style={{ ...abs(1470, 390) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Langkah #1: Tambah Karakter Gajah & Burung
// ============================================================================
const Slide03TambahKarakter: Page = () => {
  const [picked, setPicked] = useState(true);

  return (
    <JuniorFrame badge="LANGKAH #1" accentDot={TEAL}>
      <SlideTitle>
        Tambah <Highlight>Gajah &amp; Burung!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: ScratchJr Forest UI with highlighted + button & Check */}
      <MacWindowCard left={X0} top={240} width={960} height={680} headerLabel="tambah-karakter-hutan.app" padding={28}>
        <div style={{ height: '100%', display: 'flex', gap: 18 }}>
          {/* Highlighted Character Sidebar */}
          <div
            style={{
              width: 195,
              borderRadius: 24,
              background: WHITE,
              border: `3px solid ${CHARCOAL}`,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>
              Daftar Karakter
            </span>

            {picked && (
              <>
                <div style={{ width: '100%', height: 112, borderRadius: 18, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, ...centerCol }}>
                  <ElephantSvg size={95} />
                </div>
                <div style={{ width: '100%', height: 112, borderRadius: 18, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, ...centerCol }}>
                  <BirdSvg size={75} />
                </div>
              </>
            )}

            <button
              type="button"
              className="cpj15-card-btn"
              onClick={() => setPicked((p) => !p)}
              style={{
                width: 96,
                height: 96,
                borderRadius: 99,
                background: SUNNY_SOFT,
                border: `4px solid ${SUNNY}`,
                ...centerCol,
                animation: 'cpj15-pulse 1.9s infinite',
              }}
            >
              <JuniorIcon name="plus-circle" size={56} />
            </button>
          </div>

          {/* Forest Stage + Popup Picker Bar */}
          <div style={{ flex: 1, borderRadius: 24, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <ForestBackdropSvg width="100%" height="100%" />

            {/* Floating Picker Drawer showing Elephant & Bird + Check */}
            <div
              style={{
                position: 'absolute',
                top: 18,
                left: 18,
                right: 18,
                padding: '12px 18px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.94)',
                border: `3px solid ${CHARCOAL}`,
                ...row,
                justifyContent: 'space-between',
              }}
            >
              <div style={{ ...row, gap: 12 }}>
                <span style={{ padding: '6px 12px', borderRadius: 14, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, ...row, gap: 8 }}>
                  <JuniorIcon name="elephant" size={28} />
                  <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700 }}>Gajah</span>
                </span>
                <span style={{ padding: '6px 12px', borderRadius: 14, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, ...row, gap: 8 }}>
                  <JuniorIcon name="bird" size={28} />
                  <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700 }}>Burung</span>
                </span>
              </div>
              <JuniorIcon name="check" size={38} />
            </div>

            {picked && (
              <>
                <div style={{ position: 'absolute', left: 170, bottom: 26 }}>
                  <ElephantSvg size={185} />
                </div>
                <div style={{ position: 'absolute', right: 110, top: 150 }}>
                  <BirdSvg size={105} />
                </div>
              </>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card + Biko pointing Check */}
      <MacWindowCard left={1100} top={240} width={720} height={365} headerLabel="info-hutan.app" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 18 }}>
          <div
            style={{
              padding: '22px 26px',
              borderRadius: 22,
              background: TEAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 18,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="tree" size={44} />
            <span>
              Pasang latar <strong>Hutan</strong> yang rimbun
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
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="plus-circle" size={44} />
            <span>
              Klik tombol <strong>Plus</strong> untuk pilih <strong>Gajah &amp; Burung</strong>
            </span>
          </div>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="point-left"
        width={295}
        badgeIcon={<JuniorIcon name="check" size={24} />}
        speechBubble="Tekan Centang!"
        style={{ ...abs(1335, 625) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Kenalan Sama Blok Ungu Ajaib!
// ============================================================================
const Slide04BlokUngu: Page = () => {
  const [activeTab, setActiveTab] = useState<'purple' | 'other'>('purple');

  const categoryColors = [
    { name: 'Trigger', color: SUNNY },
    { name: 'Motion', color: SKY },
    { name: 'Looks', color: LAVENDER },
    { name: 'Sound', color: TEAL },
    { name: 'Control', color: ORANGE },
    { name: 'End', color: CORAL },
  ];

  return (
    <JuniorFrame badge="BLOK AJAIB BARU" accentDot={LAVENDER}>
      <SlideTitle>
        Ini Namanya <Highlight>Blok Ungu!</Highlight>
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard left={X0} top={240} width={740} height={680} headerLabel="rak-blok-ungu.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                padding: '24px 26px',
                borderRadius: 24,
                background: LAVENDER_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                gap: 18,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 31,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="dot-purple" size={44} />
              <span>
                Rak balok untuk <strong>Ubah Tampilan</strong>
              </span>
            </div>

            <div
              style={{
                padding: '24px 26px',
                borderRadius: 24,
                background: SUNNY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                gap: 18,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 31,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="sparkle" size={44} />
              <span>
                Bisa bikin karakter <strong>Raksasa</strong> atau <strong>Kurcaci!</strong>
              </span>
            </div>
          </div>

          <div style={{ ...row, justifyContent: 'center' }}>
            <BikoMascot
              pose="point-right"
              width={255}
              badgeIcon={<JuniorIcon name="dot-purple" size={22} />}
              speechBubble="Pilih Warna Ungu!"
            />
          </div>
        </div>
      </MacWindowCard>

      {/* Right Palette Spotlight */}
      <MacWindowCard left={880} top={240} width={940} height={680} headerLabel="palet-looks-scratchjr.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700, color: MUTED }}>
            Ketuk Lingkaran Kategori Ungu (Looks):
          </div>

          {/* ScratchJr Color Category Buttons */}
          <div
            style={{
              padding: '20px 26px',
              borderRadius: 24,
              background: '#F8FAFC',
              border: `3px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'space-around',
            }}
          >
            {categoryColors.map((cat) => {
              const isPurple = cat.name === 'Looks';
              return (
                <button
                  key={cat.name}
                  type="button"
                  className="cpj15-card-btn"
                  onClick={() => setActiveTab(isPurple ? 'purple' : 'other')}
                  style={{
                    width: isPurple ? 78 : 58,
                    height: isPurple ? 78 : 58,
                    borderRadius: 99,
                    background: cat.color,
                    border: `4px solid ${isPurple ? CHARCOAL : CHARCOAL}`,
                    boxShadow: isPurple ? `0 0 0 7px ${SUNNY}` : `0 4px 0 ${CHARCOAL}`,
                    opacity: isPurple ? 1 : 0.68,
                  }}
                />
              );
            })}
          </div>

          {/* Looks Shelf Displaying Grow, Shrink, Reset */}
          <div
            style={{
              flex: 1,
              marginTop: 22,
              borderRadius: 26,
              background: activeTab === 'purple' ? LAVENDER_SOFT : '#F1F5F9',
              border: `3.5px solid ${LAVENDER}`,
              padding: '26px 32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              alignItems: 'center',
            }}
          >
            <div style={{ ...centerCol, gap: 14 }}>
              <ScratchJrLooksBlock kind="grow" stepNum={4} scale={1.15} />
              <span style={{ padding: '6px 16px', borderRadius: 99, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700 }}>
                Membesar
              </span>
            </div>
            <div style={{ ...centerCol, gap: 14 }}>
              <ScratchJrLooksBlock kind="shrink" stepNum={4} scale={1.15} />
              <span style={{ padding: '6px 16px', borderRadius: 99, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700 }}>
                Mengecil
              </span>
            </div>
            <div style={{ ...centerCol, gap: 14 }}>
              <ScratchJrLooksBlock kind="reset-size" scale={1.15} />
              <span style={{ padding: '6px 16px', borderRadius: 99, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700 }}>
                Ukuran Normal
              </span>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Blok Ungu #1: Membesar (Grow)
// ============================================================================
const Slide05Membesar: Page = () => {
  const [giant, setGiant] = useState(true);

  return (
    <JuniorFrame badge="JURUS RAKSASA" accentDot={LAVENDER}>
      <SlideTitle>
        Blok <Highlight>Membesar</Highlight> (Grow)
      </SlideTitle>

      {/* Left Spotlight Card: Grow Block(4) + Elephant expanding into Giant */}
      <MacWindowCard left={X0} top={240} width={920} height={680} headerLabel="blok-membesar-grow.app" padding={34}>
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-between' }}>
          <div
            style={{
              padding: '10px 24px',
              borderRadius: 99,
              background: LAVENDER_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 23,
              fontWeight: 700,
              ...row,
              gap: 10,
            }}
          >
            <JuniorIcon name="tap" size={24} />
            <span>Klik Blok Membesar untuk melihat Gajah jadi Raksasa!</span>
          </div>

          <div style={{ ...row, gap: 40, alignItems: 'center' }}>
            <ScratchJrLooksBlock kind="grow" stepNum={4} scale={1.65} highlightNumber onClick={() => setGiant((g) => !g)} />

            <div
              style={{
                width: 445,
                height: 335,
                borderRadius: 28,
                background: TEAL_SOFT,
                border: `3.5px solid ${CHARCOAL}`,
                ...centerCol,
                position: 'relative',
              }}
            >
              {/* Outward Glow Arrows */}
              {giant && (
                <>
                  <div style={{ position: 'absolute', top: 18, left: 22 }}><JuniorIcon name="grow" size={34} /></div>
                  <div style={{ position: 'absolute', top: 18, right: 22 }}><JuniorIcon name="grow" size={34} /></div>
                </>
              )}
              <ElephantSvg size={giant ? 285 : 140} />
            </div>
          </div>

          <button
            type="button"
            className="cpj15-card-btn"
            onClick={() => setGiant((g) => !g)}
            style={{
              padding: '12px 28px',
              borderRadius: 18,
              background: LAVENDER,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 5px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {giant ? 'Ukuran: Gajah RAKSASA! (Klik Reset)' : 'Ukuran: Normal (Klik Membesar!)'}
          </button>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard left={1060} top={240} width={760} height={680} headerLabel="info-membesar.app" padding={36}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 22 }}>
          <div
            style={{
              padding: '28px 30px',
              borderRadius: 24,
              background: LAVENDER_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 20,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 33,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="elephant" size={50} />
            <span>
              Bikin karakter jadi <strong>Raksasa!</strong>
            </span>
          </div>

          <div
            style={{
              padding: '28px 30px',
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 20,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 33,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="numbers" size={50} />
            <span>
              Atur angka untuk <strong>Seberapa Besar</strong>
            </span>
          </div>

          <div
            style={{
              padding: '20px 26px',
              borderRadius: 20,
              background: '#F8FAFC',
              border: `2.5px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'center',
              gap: 12,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
              color: MUTED,
            }}
          >
            <JuniorIcon name="bulb" size={28} />
            <span>Panah mengembang keluar artinya membesar!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Blok Ungu #2: Mengecil (Shrink)
// ============================================================================
const Slide06Mengecil: Page = () => {
  const [tiny, setTiny] = useState(true);

  return (
    <JuniorFrame badge="JURUS KURCACI" accentDot={SKY}>
      <SlideTitle>
        Blok <Highlight>Mengecil</Highlight> (Shrink)
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard left={X0} top={240} width={760} height={680} headerLabel="info-mengecil.app" padding={36}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 22 }}>
          <div
            style={{
              padding: '28px 30px',
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 20,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 33,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="bird" size={50} />
            <span>
              Bikin karakter jadi <strong>Kurcaci!</strong>
            </span>
          </div>

          <div
            style={{
              padding: '28px 30px',
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 20,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 33,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="feather" size={50} />
            <span>
              Cocok bikin burung jadi <strong>Mungil!</strong>
            </span>
          </div>

          <div
            style={{
              padding: '20px 26px',
              borderRadius: 20,
              background: '#F8FAFC',
              border: `2.5px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'center',
              gap: 12,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
              color: MUTED,
            }}
          >
            <JuniorIcon name="bulb" size={28} />
            <span>Panah mengarah ke dalam artinya mengecil!</span>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Card: Shrink Block(4) + Bird shrinking cute */}
      <MacWindowCard left={900} top={240} width={920} height={680} headerLabel="blok-mengecil-shrink.app" padding={34}>
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-between' }}>
          <div
            style={{
              padding: '10px 24px',
              borderRadius: 99,
              background: SKY_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 23,
              fontWeight: 700,
              ...row,
              gap: 10,
            }}
          >
            <JuniorIcon name="tap" size={24} />
            <span>Klik Blok Mengecil untuk melihat Burung jadi Mungil!</span>
          </div>

          <div style={{ ...row, gap: 40, alignItems: 'center' }}>
            <div
              style={{
                width: 445,
                height: 335,
                borderRadius: 28,
                background: SKY_SOFT,
                border: `3.5px solid ${CHARCOAL}`,
                ...centerCol,
                position: 'relative',
              }}
            >
              {tiny && (
                <>
                  <div style={{ position: 'absolute', top: 18, left: 22 }}><JuniorIcon name="shrink" size={34} /></div>
                  <div style={{ position: 'absolute', top: 18, right: 22 }}><JuniorIcon name="shrink" size={34} /></div>
                </>
              )}
              <BirdSvg size={tiny ? 96 : 215} />
            </div>

            <ScratchJrLooksBlock kind="shrink" stepNum={4} scale={1.65} highlightNumber onClick={() => setTiny((t) => !t)} />
          </div>

          <button
            type="button"
            className="cpj15-card-btn"
            onClick={() => setTiny((t) => !t)}
            style={{
              padding: '12px 28px',
              borderRadius: 18,
              background: SKY,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 5px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {tiny ? 'Ukuran: Burung MUNGIL! (Klik Reset)' : 'Ukuran: Normal (Klik Mengecil!)'}
          </button>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Permainan Cepat: Pilih Blok yang Benar!
// ============================================================================
const Slide07AyoTebak: Page = () => {
  const [choice, setChoice] = useState<'A' | 'B' | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" top={124} size={56}>
        Blok Mana untuk Bikin Gajah Jadi <Highlight>Raksasa?</Highlight>
      </SlideTitle>

      {/* Choice Card A: Blok Membesar (CORRECT) */}
      <button
        type="button"
        className="cpj15-card-btn"
        onClick={() => setChoice('A')}
        style={{
          ...abs(160, 260, 620, 480),
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
            background: LAVENDER_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          PILIHAN A
        </div>

        <ScratchJrLooksBlock kind="grow" stepNum={4} scale={1.42} />

        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700 }}>
          Blok Membesar
        </div>
      </button>

      {/* Choice Card B: Blok Mengecil (INCORRECT) */}
      <button
        key={shakeKey}
        type="button"
        className="cpj15-card-btn"
        onClick={() => {
          setChoice('B');
          setShakeKey((k) => k + 1);
        }}
        style={{
          ...abs(1140, 260, 620, 480),
          borderRadius: 34,
          background: choice === 'B' ? CORAL_SOFT : WHITE,
          border: `4px solid ${choice === 'B' ? CORAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 36,
          ...centerCol,
          justifyContent: 'space-between',
          animation: choice === 'B' ? 'cpj15-shake 380ms ease' : undefined,
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

        <ScratchJrLooksBlock kind="shrink" stepNum={4} scale={1.42} />

        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700 }}>
          Blok Mengecil
        </div>
      </button>

      {/* Center Biko holding ? */}
      <BikoMascot
        pose="question"
        width={255}
        speechBubble={choice === 'A' ? 'Betul! Raksasa!' : choice === 'B' ? 'Itu Jadi Kecil!' : undefined}
        style={{ ...abs(832, 470) }}
      />

      {/* Bottom Prompt */}
      <div
        style={{
          ...abs(320, 855, 1280, 90),
          borderRadius: 24,
          background: choice === 'A' ? TEAL_SOFT : choice === 'B' ? CORAL_SOFT : SUNNY_SOFT,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 6px 0 ${CHARCOAL}`,
          ...row,
          justifyContent: 'center',
          gap: 14,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        <JuniorIcon name={choice === 'A' ? 'check' : choice === 'B' ? 'warning' : 'point-right'} size={34} />
        <span>
          {choice === 'A'
            ? 'Tepat! Blok Membesar (panah keluar) mengubah Gajah menjadi Raksasa!'
            : choice === 'B'
              ? 'Blok Mengecil membuat karakter jadi kurcaci! Pilih panah keluar ya!'
              : 'Tunjuk blok yang benar di layarmu ya!'}
        </span>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Hutan Raksasa & Kurcaci (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsUkuran: Page = () => (
  <JuniorFrame badge="TIPS JAGOAN" accentDot={TEAL}>
    <SlideTitle>
      Rahasia Ubah Ukuran <Highlight>Biar Pas!</Highlight>
    </SlideTitle>

    {/* Left Column — BOLEH / PAS */}
    <div
      style={{
        ...abs(X0, 240, 825, 700),
        borderRadius: 30,
        background: TEAL_SOFT,
        border: `4px solid ${TEAL}`,
        boxShadow: `0 9px 0 ${CHARCOAL}`,
        padding: '30px 34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ ...row, justifyContent: 'space-between' }}>
        <div
          style={{
            padding: '10px 24px',
            borderRadius: 99,
            background: TEAL,
            color: WHITE,
            border: `3px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 30,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          <JuniorIcon name="check" size={28} />
          <span>BOLEH (UKURAN PAS!)</span>
        </div>
        <JuniorIcon name="thumbs-up" size={46} />
      </div>

      {/* Just-Right Giant Elephant in Forest */}
      <div style={{ height: 245, borderRadius: 24, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
        <ForestBackdropSvg width="100%" height="100%" />
        <div style={{ position: 'absolute', left: '50%', bottom: 8, transform: 'translateX(-50%)' }}>
          <ElephantSvg size={180} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div
          style={{
            padding: '18px 24px',
            borderRadius: 20,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            ...row,
            gap: 14,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <JuniorIcon name="flag" size={34} />
          <span>
            Pasang <strong>Bendera Hijau</strong> di depan blok ungu
          </span>
        </div>
        <div
          style={{
            padding: '18px 24px',
            borderRadius: 20,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            ...row,
            gap: 14,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <JuniorIcon name="reset" size={34} />
          <span>
            Pakai blok <strong>Ukuran Normal</strong> jika terlalu besar
          </span>
        </div>
      </div>
    </div>

    {/* Right Column — JANGAN / KEBESARAN */}
    <div
      style={{
        ...abs(995, 240, 825, 700),
        borderRadius: 30,
        background: CORAL_SOFT,
        border: `4px solid ${CORAL}`,
        boxShadow: `0 9px 0 ${CHARCOAL}`,
        padding: '30px 34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ ...row, justifyContent: 'space-between' }}>
        <div
          style={{
            padding: '10px 24px',
            borderRadius: 99,
            background: CORAL,
            color: WHITE,
            border: `3px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 30,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          <JuniorIcon name="cross" size={28} />
          <span>JANGAN (MENUTUP LAYAR!)</span>
        </div>
        <JuniorIcon name="warning" size={46} />
      </div>

      {/* Overly Huge Elephant filling screen */}
      <div style={{ height: 245, borderRadius: 24, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
        <ForestBackdropSvg width="100%" height="100%" />
        <div style={{ position: 'absolute', left: '50%', top: -38, transform: 'translateX(-50%)' }}>
          <ElephantSvg size={350} />
        </div>
        <div style={{ position: 'absolute', top: 14, right: 16 }}>
          <JuniorIcon name="warning" size={42} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div
          style={{
            padding: '18px 24px',
            borderRadius: 20,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            ...row,
            gap: 14,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <JuniorIcon name="see-no-evil" size={34} />
          <span>
            Angka terlalu besar sampai <strong>Menutup Layar</strong>
          </span>
        </div>
        <div
          style={{
            padding: '18px 24px',
            borderRadius: 20,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            ...row,
            gap: 14,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <JuniorIcon name="puzzle" size={34} />
          <span>
            Lupa memilih <strong>Karakter</strong> yang mau diubah
          </span>
        </div>
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Hutan Raksasa & Kurcaci!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const [transformed, setTransformed] = useState(false);

  const stepCards = [
    { num: '1', color: SKY, soft: SKY_SOFT, icon: 'tree' as JuniorIconName, label: 'Pasang latar Hutan + Gajah & Burung' },
    { num: '2', color: SUNNY, soft: SUNNY_SOFT, icon: 'dot-purple' as JuniorIconName, label: 'Pasang Membesar & Mengecil' },
    { num: '3', color: TEAL, soft: TEAL_SOFT, icon: 'flag' as JuniorIconName, label: 'Klik Bendera Hijau! Lihat perubahannya!' },
  ];

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle top={120}>
        Misi <Highlight>Hutan Raksasa &amp; Kurcaci!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Step Blocks */}
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
                padding: '0 20px',
                ...row,
                gap: 14,
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
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
              <JuniorIcon name={sc.icon} size={32} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700 }}>
                {sc.label}
              </span>
            </div>
            {idx < 2 && <JuniorIcon name="arrow-right" size={30} />}
          </Fragment>
        ))}
      </div>

      {/* Interactive Forest Stage + Dual Code Bars */}
      <MacWindowCard left={X0} top={322} width={1320} height={635} headerLabel="misi-raksasa-kurcaci.app" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ flex: 1, borderRadius: 22, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <ForestBackdropSvg width="100%" height="100%" />

            <button
              type="button"
              className="cpj15-card-btn"
              onClick={() => setTransformed((t) => !t)}
              style={{
                position: 'absolute',
                top: 16,
                right: 18,
                padding: '12px 26px',
                borderRadius: 18,
                background: TEAL,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                ...row,
                gap: 10,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 24,
                fontWeight: 700,
                zIndex: 3,
              }}
            >
              <JuniorIcon name="flag" size={26} />
              <span>{transformed ? 'Reset Ukuran Normal' : 'Klik Bendera Hijau!'}</span>
            </button>

            {/* Giant/Normal Elephant under Forest Trees */}
            <div
              style={{
                position: 'absolute',
                left: 240,
                bottom: 12,
                transform: 'translateX(-50%)',
              }}
            >
              <ElephantSvg size={transformed ? 290 : 145} />
            </div>

            {/* Tiny/Normal Bird flying in Forest Sky */}
            <div
              style={{
                position: 'absolute',
                right: 260,
                top: transformed ? 95 : 80,
              }}
            >
              <BirdSvg size={transformed ? 70 : 145} />
            </div>
          </div>

          <div style={{ height: 152, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
            <div style={{ borderRadius: 22, background: LAVENDER_SOFT, border: `3px solid ${LAVENDER}`, padding: '0 22px', ...row, justifyContent: 'space-between' }}>
              <ElephantSvg size={105} />
              <div style={{ ...row, gap: 0 }}>
                <ScratchJrLooksBlock kind="green-flag" scale={0.78} />
                <div style={{ marginLeft: -8 }}>
                  <ScratchJrLooksBlock kind="grow" stepNum={4} scale={0.78} />
                </div>
              </div>
            </div>

            <div style={{ borderRadius: 22, background: SKY_SOFT, border: `3px solid ${SKY}`, padding: '0 22px', ...row, justifyContent: 'space-between' }}>
              <BirdSvg size={90} />
              <div style={{ ...row, gap: 0 }}>
                <ScratchJrLooksBlock kind="green-flag" scale={0.78} />
                <div style={{ marginLeft: -8 }}>
                  <ScratchJrLooksBlock kind="shrink" stepNum={4} scale={0.78} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="thumbs-up"
        width={345}
        badgeIcon={<JuniorIcon name="dot-purple" size={24} />}
        speechBubble="Ajaib Sekali!"
        style={{ ...abs(1470, 425) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 15 (Celebration Center Card)
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
            animation: live ? `cpj15-confetti ${2.4 + idx * 0.3}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={124} size={58}>
        <span style={{ ...row, justifyContent: 'center', gap: 14 }}>
          <span>Hebat! Kamu</span>
          <Highlight>Pesulap Ukuran!</Highlight>
          <JuniorIcon name="party" size={52} />
        </span>
      </SlideTitle>

      {/* Center Celebration Card */}
      <MacWindowCard left={190} top={240} width={1140} height={685} headerLabel="lencana-pesulap-15.app" padding={34}>
        <div
          style={{
            height: '100%',
            ...centerCol,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          {/* Large Gold Medal featuring Giant Elephant, Tiny Bird & Sparkle Stars */}
          <div style={{ animation: live ? 'cpj15-float 3s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 260 260" fill="none">
              <path d="M84 14 L112 96 H148 L176 14 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
              <path d="M104 14 L130 90 L156 14" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="130" cy="150" r="92" fill={SUNNY} stroke={CHARCOAL} strokeWidth={6} />
              <circle cx="130" cy="150" r="74" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={4} />
              {/* Mini Giant Elephant Emblem on Left */}
              <circle cx="112" cy="158" r="24" fill="#94A3B8" stroke={CHARCOAL} strokeWidth={3.2} />
              <ellipse cx="90" cy="156" rx="9" ry="15" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={2.8} />
              <path d="M134 156 C142 158, 144 168, 138 172" stroke={CHARCOAL} strokeWidth={6} strokeLinecap="round" />
              <circle cx="118" cy="152" r="3" fill={CHARCOAL} />
              {/* Mini Tiny Bird Emblem on Top Right */}
              <ellipse cx="164" cy="126" rx="13" ry="10" fill={SKY} stroke={CHARCOAL} strokeWidth={2.8} />
              <polygon points="176,123 186,126 176,129" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
              <circle cx="168" cy="123" r="2.2" fill={CHARCOAL} />
              {/* Sparkle Star */}
              <path d="M126 98 L130 107 L139 110 L130 113 L126 122 L122 113 L113 110 L122 107 Z" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={2} />
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
            <span>Lencana Pesulap Raksasa &amp; Kurcaci</span>
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
            Kamu sudah jago menambah karakter &amp; memakai{' '}
            <Highlight color="#D1FAE5">Blok Membesar &amp; Mengecil!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="elephant" size={22} />}
            speechBubble="Pesulap Hebat!"
          />
          <div style={{ animation: live ? 'cpj15-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 15 — Hutan Raksasa & Kurcaci!
Hari ini kita akan bertualang di latar hutan ScratchJr bersama Gajah Raksasa dan Burung Kurcaci menggunakan Blok Ungu!`,

  `Dua misi seru hari ini:
1. Menambahkan karakter Gajah dan Burung ke panggung Hutan.
2. Mengubah ukuran karakter menjadi sangat besar (Raksasa) dan sangat kecil (Kurcaci)!`,

  `Langkah #1 — Tambah Gajah & Burung:
Pasang latar Hutan yang rimbun lalu klik tombol Plus (+) di kiri layar untuk menambahkan Gajah dan Burung, lalu tekan Centang!`,

  `Kenalan dengan Blok Ungu (Looks):
Klik lingkaran kategori berwarna Ungu di palet bawah untuk membuka rak balok pengubah tampilan karakter!`,

  `Blok Ungu #1 — Membesar (Grow):
Ikon panah mengembang keluar! Angka di bawahnya menentukan seberapa besar Gajah tumbuh menjadi Raksasa!`,

  `Blok Ungu #2 — Mengecil (Shrink):
Ikon panah mengarah ke dalam! Cocok sekali untuk menyulap karakter Burung menjadi Kurcaci yang mungil!`,

  `Permainan Cepat! Ayo tebak:
Blok mana untuk bikin Gajah menjadi Raksasa — Pilihan A (Blok Membesar) atau Pilihan B (Blok Mengecil)?`,

  `Tips Jagoan Hutan Raksasa & Kurcaci:
BOLEH pasang Bendera Hijau di depan blok ungu dan gunakan blok Ukuran Normal jika terlalu besar.
JANGAN memasang angka terlalu besar sampai menutup layar, atau lupa memilih karakter yang mau diubah!`,

  `Waktunya Misi Praktik Hutan Raksasa & Kurcaci:
1. Pasang latar Hutan + karakter Gajah & Burung. 2. Pasang Membesar di Gajah & Mengecil di Burung. 3. Klik Bendera Hijau dan lihat perubahannya!`,

  `Hebat sekali untuk semua Pesulap Ukuran!
Kalian berhasil meraih Lencana Pesulap Raksasa & Kurcaci di Pertemuan 15!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 15 — Hutan Raksasa & Kurcaci!',
  createdAt: '2026-11-14T15:52:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03TambahKarakter,
  Slide04BlokUngu,
  Slide05Membesar,
  Slide06Mengecil,
  Slide07AyoTebak,
  Slide08TipsUkuran,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

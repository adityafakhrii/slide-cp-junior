import { Fragment, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-14-parade-jalan-raya';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj14-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj14-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-13px) scale(1.04); }
}
@keyframes cpj14-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj14-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj14-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj14-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7); }
  50% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
}
.cpj14-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj14-card-btn:hover {
  transform: translateY(-4px);
}
.cpj14-card-btn:active {
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
          animation: live ? 'cpj14-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: CORAL,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 14 • Parade Jalan Raya!</span>
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
// Reusable Pertemuan 14 Visuals (Race Cars, City Highway Backdrop, ScratchJr Blocks)
// ============================================================================

/** Cartoon Race Car SVG (Red or Blue) */
const RaceCarSvg = ({
  variant = 'red',
  size = 120,
  style,
}: {
  variant?: 'red' | 'blue';
  size?: number;
  style?: CSSProperties;
}) => {
  const body = variant === 'red' ? CORAL : SKY;
  const stripe = variant === 'red' ? SUNNY : WHITE;
  const height = Math.round(size * 0.68);
  return (
    <svg width={size} height={height} viewBox="0 0 140 95" fill="none" style={style}>
      {/* Ground Shadow */}
      <ellipse cx="70" cy="85" rx="54" ry="7" fill="rgba(30,30,44,0.16)" />
      {/* Cabin Roof */}
      <path
        d="M34 42 L48 16 H90 L108 42 Z"
        fill="#BAE6FD"
        stroke={CHARCOAL}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <line x1="70" y1="16" x2="70" y2="42" stroke={CHARCOAL} strokeWidth={3.5} />
      {/* Car Body */}
      <rect x="12" y="40" width="116" height="32" rx="14" fill={body} stroke={CHARCOAL} strokeWidth={4} />
      {/* Racing Stripe */}
      <rect x="20" y="51" width="100" height="8" rx="4" fill={stripe} />
      {/* Headlight */}
      <ellipse cx="122" cy="52" rx="5" ry="6" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
      {/* Wheels */}
      <circle cx="40" cy="72" r="14" fill={CHARCOAL} />
      <circle cx="40" cy="72" r="6" fill={WHITE} />
      <circle cx="100" cy="72" r="14" fill={CHARCOAL} />
      <circle cx="100" cy="72" r="6" fill={WHITE} />
    </svg>
  );
};

/** City Highway ScratchJr Backdrop SVG (Sky, City Buildings, 2-Lane Asphalt Road, Start Line) */
const CityHighwaySvg = ({
  width = 480,
  height = 260,
  showStartLine = true,
}: {
  width?: number | string;
  height?: number | string;
  showStartLine?: boolean;
}) => (
  <svg width={width} height={height} viewBox="0 0 480 260" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    {/* Sky */}
    <rect x="0" y="0" width="480" height="260" fill="#BAE6FD" />
    <circle cx="418" cy="40" r="20" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
    {/* City Silhouette Buildings */}
    <rect x="22" y="46" width="54" height="84" rx="6" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="86" y="30" width="62" height="100" rx="6" fill="#DDD6FE" stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="162" y="56" width="48" height="74" rx="6" fill="#BBF7D0" stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="234" y="42" width="66" height="88" rx="6" fill="#FED7AA" stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="318" y="60" width="58" height="70" rx="6" fill="#E0E7FF" stroke={CHARCOAL} strokeWidth={2.6} />
    {/* Sidewalk */}
    <rect x="0" y="122" width="480" height="16" fill="#E2E8F0" stroke={CHARCOAL} strokeWidth={2.5} />
    {/* Two-Lane Asphalt Road */}
    <rect x="0" y="138" width="480" height="122" fill="#475569" stroke={CHARCOAL} strokeWidth={3} />
    {/* Dashed Lane Divider */}
    <line x1="18" y1="199" x2="462" y2="199" stroke={SUNNY} strokeWidth={5} strokeDasharray="24 18" strokeLinecap="round" />
    {/* Checkered Start Line on Left */}
    {showStartLine && (
      <g>
        <rect x="34" y="142" width="14" height="114" fill={WHITE} />
        <rect x="34" y="142" width="7" height="19" fill={CHARCOAL} />
        <rect x="41" y="161" width="7" height="19" fill={CHARCOAL} />
        <rect x="34" y="180" width="7" height="19" fill={CHARCOAL} />
        <rect x="41" y="199" width="7" height="19" fill={CHARCOAL} />
        <rect x="34" y="218" width="7" height="19" fill={CHARCOAL} />
        <rect x="41" y="237" width="7" height="19" fill={CHARCOAL} />
      </g>
    )}
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

/** Authentic ScratchJr Jigsaw Block SVG */
const ScratchJrBlock = ({
  kind,
  stepNum = 6,
  scale = 1,
}: {
  kind: 'green-flag' | 'move-right' | 'jump';
  stepNum?: number;
  scale?: number;
}) => {
  const isFlag = kind === 'green-flag';
  const fill = isFlag ? SUNNY : SKY;
  const width = Math.round(136 * scale);
  const height = Math.round((isFlag ? 118 : 138) * scale);

  const bodyPath = isFlag
    ? 'M32 10 H106 C112 10, 116 14, 116 20 V42 C126 42, 130 48, 130 57 C130 66, 126 72, 116 72 V96 C116 102, 112 106, 106 106 H32 C16 106, 8 88, 8 58 C8 28, 16 10, 32 10 Z'
    : 'M14 10 H106 C112 10, 116 14, 116 20 V42 C126 42, 130 48, 130 57 C130 66, 126 72, 116 72 V96 C116 102, 112 106, 106 106 H14 C10 106, 8 102, 8 96 V72 C18 72, 22 66, 22 57 C22 48, 18 42, 8 42 V20 C8 14, 10 10, 14 10 Z';

  return (
    <div style={{ position: 'relative', width, height, display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
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

        {kind === 'move-right' && (
          <path d="M36 47 H70 V32 L100 58 L70 84 V69 H36 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.6} strokeLinejoin="round" />
        )}

        {kind === 'jump' && (
          <>
            <path d="M36 78 C42 28, 76 26, 86 64" fill="none" stroke={WHITE} strokeWidth={11} strokeLinecap="round" />
            <path d="M72 60 L88 80 L99 55 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
          </>
        )}
      </svg>

      {!isFlag && (
        <div
          style={{
            marginTop: Math.round(-16 * scale),
            minWidth: Math.round(52 * scale),
            height: Math.round(36 * scale),
            borderRadius: Math.round(12 * scale),
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 3px 0 ${CHARCOAL}`,
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
// SLIDE 01 — Sampul Pertemuan (Checkered Race Banner Ticket + Racing Biko)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 14" accentDot={CORAL}>
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
            background: CORAL_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#991B1B',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="car-red" size={24} />
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
          Parade
          <br />
          <Highlight>Jalan Raya!</Highlight>
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
          Balapan Dua Mobil Melaju Serempak dengan Bendera Hijau
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
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="car-red" size={28} />
            <span>2 Mobil Balap</span>
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
            <JuniorIcon name="flag" size={26} />
            <span>Jalan Serempak</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Checkered Race Ticket Frame + Laptop Highway + Racing-Cap Biko */}
      <div style={{ ...abs(980, 145, 845, 810), ...centerCol }}>
        {/* Race Banner Ticket Card */}
        <div
          style={{
            position: 'absolute',
            width: 710,
            height: 685,
            borderRadius: '44px 44px 120px 44px',
            background: 'linear-gradient(155deg, #FEF2F2 0%, #EFF6FF 55%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${CORAL}`,
            overflow: 'hidden',
          }}
        >
          {/* Checkered Finish Ribbon Across Top */}
          <div style={{ height: 34, display: 'flex' }}>
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: i % 2 === 0 ? CHARCOAL : WHITE,
                  borderBottom: `3px solid ${CHARCOAL}`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Laptop showing City Highway + Two Racing Cars */}
        <div
          style={{
            position: 'absolute',
            right: 40,
            top: 165,
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
              <JuniorIcon name="road" size={22} />
              <span>ScratchJr — Jalan Raya Kota</span>
            </span>
            <JuniorIcon name="flag" size={24} />
          </div>

          <div style={{ height: 225, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <CityHighwaySvg width="100%" height="100%" />
            <div style={{ position: 'absolute', left: 205, top: 102 }}>
              <RaceCarSvg variant="red" size={135} />
            </div>
            <div style={{ position: 'absolute', left: 265, top: 152 }}>
              <RaceCarSvg variant="blue" size={135} />
            </div>
          </div>

          <div style={{ marginTop: 10, ...row, justifyContent: 'center', gap: 14 }}>
            <span style={{ ...row, gap: 6, padding: '6px 14px', borderRadius: 12, background: CORAL_SOFT, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 17, fontWeight: 700 }}>
              <JuniorIcon name="car-red" size={22} />
              <span>+ Flag</span>
            </span>
            <span style={{ ...row, gap: 6, padding: '6px 14px', borderRadius: 12, background: SKY_SOFT, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 17, fontWeight: 700 }}>
              <JuniorIcon name="car-blue" size={22} />
              <span>+ Flag</span>
            </span>
          </div>
        </div>

        {/* Biko with Custom Racing Cap & Flag Badge */}
        <div style={{ position: 'absolute', left: 10, bottom: 48, zIndex: 4 }}>
          <svg
            width={150}
            height={78}
            viewBox="0 0 150 78"
            fill="none"
            style={{ position: 'absolute', top: -18, left: 78, transform: 'rotate(-8deg)', zIndex: 5, pointerEvents: 'none' }}
          >
            <path d="M22 52 C22 18, 128 18, 128 52 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4.5} strokeLinejoin="round" />
            <path d="M58 24 H92 V52 H58 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
            <path d="M18 52 Q75 66 138 56 L128 64 Q75 74 26 60 Z" fill={CHARCOAL} />
          </svg>
          <BikoMascot
            pose="wave"
            width={325}
            badgeIcon={<JuniorIcon name="flag" size={24} />}
            speechBubble="Siap... Mulai!"
          />
        </div>

        {/* Floating Start Pill */}
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
            animation: live ? 'cpj14-float 2.8s ease-in-out infinite' : undefined,
          }}
        >
          <JuniorIcon name="traffic-light" size={26} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700 }}>
            Melaju Bareng!
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

      <MacWindowCard left={X0} top={235} width={1320} height={700} headerLabel="misi-pertemuan-14.app" padding={36}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Card 1: Tambah 2 Mobil */}
          <button
            type="button"
            className="cpj14-card-btn"
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

            <div style={{ width: 295, height: 215, borderRadius: 22, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
              <CityHighwaySvg width="100%" height="100%" />
              <div style={{ position: 'absolute', left: 80, top: 96 }}>
                <RaceCarSvg variant="red" size={115} />
              </div>
              <div style={{ position: 'absolute', left: 140, top: 146 }}>
                <RaceCarSvg variant="blue" size={115} />
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.28 }}>
              Tambah <Highlight color={WHITE}>2 Mobil</Highlight> di Panggung Jalan Raya
            </div>
          </button>

          {/* Card 2: Gerakkan Serempak */}
          <button
            type="button"
            className="cpj14-card-btn"
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
              <ScratchJrBlock kind="green-flag" scale={1.15} />
              <ScratchJrBlock kind="green-flag" scale={1.15} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.28 }}>
              Gerakkan <Highlight color={SUNNY_SOFT}>2 Mobil Serempak</Highlight> (Bersamaan!)
            </div>
          </button>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="point-left"
        width={355}
        badgeIcon={<JuniorIcon name="car-red" size={24} />}
        speechBubble={selected === 0 ? '2 Mobil Balap!' : 'Jalan Bareng!'}
        style={{ ...abs(1470, 390) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Langkah #1: Siapkan Jalan Raya & 2 Mobil
// ============================================================================
const Slide03SiapkanMobil: Page = () => {
  const [hasBlueCar, setHasBlueCar] = useState(true);

  return (
    <JuniorFrame badge="PERSIAPAN PARADE" accentDot={SUNNY}>
      <SlideTitle>
        Siapkan <Highlight>2 Mobil</Highlight> di Jalan Raya!
      </SlideTitle>

      {/* Left: ScratchJr Screen with City Road + Highlighted Left Character Sidebar */}
      <MacWindowCard left={X0} top={240} width={960} height={680} headerLabel="siapkan-2-mobil.app" padding={28}>
        <div style={{ height: '100%', display: 'flex', gap: 18 }}>
          {/* Highlighted Character Panel */}
          <div
            style={{
              width: 190,
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `4px solid ${SUNNY}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'cpj14-pulse 1.9s infinite',
            }}
          >
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>
              Daftar Karakter
            </span>

            <div
              style={{
                width: '100%',
                height: 120,
                borderRadius: 18,
                background: WHITE,
                border: `3px solid ${CORAL}`,
                ...centerCol,
                gap: 6,
              }}
            >
              <RaceCarSvg variant="red" size={105} />
              <span style={{ fontSize: 16, fontWeight: 800 }}>Mobil Merah</span>
            </div>

            {hasBlueCar ? (
              <div
                style={{
                  width: '100%',
                  height: 120,
                  borderRadius: 18,
                  background: WHITE,
                  border: `3px solid ${SKY}`,
                  ...centerCol,
                  gap: 6,
                }}
              >
                <RaceCarSvg variant="blue" size={105} />
                <span style={{ fontSize: 16, fontWeight: 800 }}>Mobil Biru</span>
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  height: 120,
                  borderRadius: 18,
                  background: WHITE,
                  border: `2.5px dashed #94A3B8`,
                  ...centerCol,
                  color: MUTED,
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                Kosong
              </div>
            )}

            <button
              type="button"
              className="cpj14-card-btn"
              onClick={() => setHasBlueCar((v) => !v)}
              style={{
                width: 82,
                height: 82,
                borderRadius: 99,
                background: SKY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              <JuniorIcon name={hasBlueCar ? 'check' : 'plus-circle'} size={48} />
            </button>
          </div>

          {/* City Highway Stage */}
          <div style={{ flex: 1, borderRadius: 24, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <CityHighwaySvg width="100%" height="100%" />
            <div style={{ position: 'absolute', left: 85, top: 215 }}>
              <RaceCarSvg variant="red" size={160} />
            </div>
            {hasBlueCar && (
              <div style={{ position: 'absolute', left: 85, top: 345 }}>
                <RaceCarSvg variant="blue" size={160} />
              </div>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card + Biko pointing */}
      <MacWindowCard left={1100} top={240} width={720} height={365} headerLabel="info-parade.app" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 18 }}>
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
            <JuniorIcon name="road" size={44} />
            <span>
              Pilih latar <strong>Jalan Raya</strong> (City)
            </span>
          </div>

          <div
            style={{
              padding: '22px 26px',
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
            <JuniorIcon name="plus-circle" size={44} />
            <span>
              Klik tanda <strong>Plus</strong> untuk tambah <strong>2 Mobil</strong>
            </span>
          </div>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="point-left"
        width={295}
        badgeIcon={<JuniorIcon name="car-blue" size={24} />}
        speechBubble="Ada 2 Mobil!"
        style={{ ...abs(1335, 625) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Rahasia Coder: Ruang Kode Milik Sendiri!
// ============================================================================
const Slide04KodeSendiri: Page = () => {
  const [selectedCar, setSelectedCar] = useState<'red' | 'blue'>('red');

  return (
    <JuniorFrame badge="RAHASIA SCRATCHJR" accentDot={CORAL}>
      <SlideTitle>
        Tiap Mobil Punya <Highlight>Kode Sendiri!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={235} width={1320} height={700} headerLabel="ruang-kode-karakter.app" padding={36}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Card 1: Mobil Merah */}
          <button
            type="button"
            className="cpj14-card-btn"
            onClick={() => setSelectedCar('red')}
            style={{
              borderRadius: 28,
              background: CORAL_SOFT,
              border: `4px solid ${selectedCar === 'red' ? CORAL : CHARCOAL}`,
              boxShadow: selectedCar === 'red' ? `0 0 0 6px ${SUNNY}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${CORAL}`,
              padding: '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <JuniorIcon name="tap" size={42} />
              <div
                style={{
                  padding: '14px 24px',
                  borderRadius: 22,
                  background: WHITE,
                  border: `3.5px solid ${CORAL}`,
                }}
              >
                <RaceCarSvg variant="red" size={120} />
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, lineHeight: 1.3 }}>
              Ketuk <strong>Mobil Merah</strong> → muncul kode <strong>Mobil Merah</strong>
            </div>

            {/* Dedicated White Code Area Preview */}
            <div
              style={{
                width: '100%',
                padding: '18px 20px',
                borderRadius: 22,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <ScratchJrBlock kind="green-flag" scale={0.76} />
              <ScratchJrBlock kind="move-right" stepNum={6} scale={0.76} />
            </div>
          </button>

          {/* Card 2: Mobil Biru */}
          <button
            type="button"
            className="cpj14-card-btn"
            onClick={() => setSelectedCar('blue')}
            style={{
              borderRadius: 28,
              background: SKY_SOFT,
              border: `4px solid ${selectedCar === 'blue' ? SKY : CHARCOAL}`,
              boxShadow: selectedCar === 'blue' ? `0 0 0 6px ${SUNNY}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${SKY}`,
              padding: '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <JuniorIcon name="tap" size={42} />
              <div
                style={{
                  padding: '14px 24px',
                  borderRadius: 22,
                  background: WHITE,
                  border: `3.5px solid ${SKY}`,
                }}
              >
                <RaceCarSvg variant="blue" size={120} />
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, lineHeight: 1.3 }}>
              Ketuk <strong>Mobil Biru</strong> → muncul kode <strong>Mobil Biru</strong>
            </div>

            {/* Dedicated White Code Area Preview */}
            <div
              style={{
                width: '100%',
                padding: '18px 20px',
                borderRadius: 22,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <ScratchJrBlock kind="green-flag" scale={0.76} />
              <ScratchJrBlock kind="move-right" stepNum={6} scale={0.76} />
            </div>
          </button>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="point-left"
        width={345}
        badgeIcon={<JuniorIcon name="puzzle" size={24} />}
        speechBubble={selectedCar === 'red' ? 'Kode Si Merah!' : 'Kode Si Biru!'}
        style={{ ...abs(1470, 395) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus Serempak: Dua Bendera Hijau!
// ============================================================================
const Slide05JurusSerempak: Page = () => {
  const [launched, setLaunched] = useState(false);

  return (
    <JuniorFrame badge="JURUS MELAJU SEREMPAK" accentDot={TEAL}>
      <SlideTitle>
        Pasang <Highlight>Bendera Hijau</Highlight> di Keduanya!
      </SlideTitle>

      <MacWindowCard left={X0} top={235} width={1720} height={700} headerLabel="jurus-2-bendera-hijau.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
          {/* Top Card: Kode Mobil Merah */}
          <div
            style={{
              flex: 1,
              borderRadius: 26,
              background: CORAL_SOFT,
              border: `3.5px solid ${launched ? TEAL : CORAL}`,
              boxShadow: launched ? `0 0 0 5px ${TEAL_SOFT}, 0 7px 0 ${CHARCOAL}` : `0 7px 0 ${CORAL}`,
              padding: '16px 36px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 20 }}>
              <div style={{ padding: '12px 18px', borderRadius: 20, background: WHITE, border: `3px solid ${CHARCOAL}` }}>
                <RaceCarSvg variant="red" size={115} />
              </div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
                Kode Mobil Merah
              </div>
            </div>

            <div style={{ ...row, gap: 18 }}>
              <ScratchJrBlock kind="green-flag" scale={1.08} />
              <JuniorIcon name="arrow-right" size={38} />
              <ScratchJrBlock kind="move-right" stepNum={6} scale={1.08} />
            </div>

            <div style={{ width: 220, height: 110, borderRadius: 18, background: WHITE, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  position: 'absolute',
                  left: launched ? 105 : 14,
                  top: 22,
                  transition: 'left 550ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <RaceCarSvg variant="red" size={92} />
              </div>
            </div>
          </div>

          {/* Bottom Card: Kode Mobil Biru */}
          <div
            style={{
              flex: 1,
              borderRadius: 26,
              background: SKY_SOFT,
              border: `3.5px solid ${launched ? TEAL : SKY}`,
              boxShadow: launched ? `0 0 0 5px ${TEAL_SOFT}, 0 7px 0 ${CHARCOAL}` : `0 7px 0 ${SKY}`,
              padding: '16px 36px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 20 }}>
              <div style={{ padding: '12px 18px', borderRadius: 20, background: WHITE, border: `3px solid ${CHARCOAL}` }}>
                <RaceCarSvg variant="blue" size={115} />
              </div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
                Kode Mobil Biru
              </div>
            </div>

            <div style={{ ...row, gap: 18 }}>
              <ScratchJrBlock kind="green-flag" scale={1.08} />
              <JuniorIcon name="arrow-right" size={38} />
              <ScratchJrBlock kind="move-right" stepNum={6} scale={1.08} />
            </div>

            <div style={{ width: 220, height: 110, borderRadius: 18, background: WHITE, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  position: 'absolute',
                  left: launched ? 105 : 14,
                  top: 22,
                  transition: 'left 550ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <RaceCarSvg variant="blue" size={92} />
              </div>
            </div>
          </div>

          {/* Interactive Trigger Strip */}
          <button
            type="button"
            className="cpj14-card-btn"
            onClick={() => setLaunched((l) => !l)}
            style={{
              padding: '16px 34px',
              borderRadius: 22,
              background: TEAL,
              color: WHITE,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 29,
              fontWeight: 700,
              ...row,
              justifyContent: 'center',
              gap: 14,
            }}
          >
            <JuniorIcon name="flag" size={32} />
            <span>
              {launched
                ? 'Keduanya Melaju Bareng! (Klik lagi untuk Ulang)'
                : 'Klik Bendera Hijau di Atas Layar: Keduanya Melaju Bareng!'}
            </span>
          </button>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Kenapa Mobil Biru Diam?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [choice, setChoice] = useState<'A' | 'B' | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" top={118} size={56}>
        Kenapa <Highlight>Mobil Biru</Highlight> Tidak Jalan?
      </SlideTitle>

      {/* Top Visual Code Comparison */}
      <div
        style={{
          ...abs(210, 205, 1500, 185),
          borderRadius: 28,
          background: WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 7px 0 ${CHARCOAL}`,
          padding: '16px 34px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 30,
        }}
      >
        <div style={{ borderRadius: 20, background: TEAL_SOFT, border: `3px solid ${TEAL}`, padding: '10px 22px', ...row, justifyContent: 'space-between' }}>
          <div style={{ ...centerCol, gap: 4 }}>
            <RaceCarSvg variant="red" size={88} />
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: '#065F46' }}>
              Berhasil Jalan!
            </span>
          </div>
          <div style={{ ...row, gap: 4 }}>
            <ScratchJrBlock kind="green-flag" scale={0.74} />
            <ScratchJrBlock kind="move-right" stepNum={5} scale={0.74} />
          </div>
        </div>

        <div style={{ borderRadius: 20, background: CORAL_SOFT, border: `3px solid ${CORAL}`, padding: '10px 22px', ...row, justifyContent: 'space-between' }}>
          <div style={{ ...centerCol, gap: 4 }}>
            <RaceCarSvg variant="blue" size={88} />
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: '#991B1B' }}>
              Diam di Tempat!
            </span>
          </div>
          <div style={{ ...row, gap: 8 }}>
            {choice === 'A' ? (
              <ScratchJrBlock kind="green-flag" scale={0.74} />
            ) : (
              <div style={{ width: 92, height: 84, borderRadius: 16, background: SUNNY_SOFT, border: `3.5px dashed ${CORAL}`, ...centerCol }}>
                <JuniorIcon name="question" size={44} />
              </div>
            )}
            <ScratchJrBlock kind="move-right" stepNum={5} scale={0.74} />
          </div>
        </div>
      </div>

      {/* Choice Card A: Kurang Bendera Hijau (CORRECT) */}
      <button
        type="button"
        className="cpj14-card-btn"
        onClick={() => setChoice('A')}
        style={{
          ...abs(160, 412, 620, 408),
          borderRadius: 34,
          background: choice === 'A' ? TEAL_SOFT : WHITE,
          border: `4px solid ${choice === 'A' ? TEAL : CHARCOAL}`,
          boxShadow: choice === 'A' ? `0 0 0 7px ${TEAL}, 0 10px 0 ${CHARCOAL}` : `0 10px 0 ${CHARCOAL}`,
          padding: 32,
          ...centerCol,
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            padding: '8px 24px',
            borderRadius: 99,
            background: SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          PILIHAN A
        </div>

        <ScratchJrBlock kind="green-flag" scale={1.32} />

        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 35, fontWeight: 700 }}>
          Kurang Bendera Hijau
        </div>
      </button>

      {/* Choice Card B: Kurang Blok Lompat (INCORRECT) */}
      <button
        key={shakeKey}
        type="button"
        className="cpj14-card-btn"
        onClick={() => {
          setChoice('B');
          setShakeKey((k) => k + 1);
        }}
        style={{
          ...abs(1140, 412, 620, 408),
          borderRadius: 34,
          background: choice === 'B' ? CORAL_SOFT : WHITE,
          border: `4px solid ${choice === 'B' ? CORAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 32,
          ...centerCol,
          justifyContent: 'space-between',
          animation: choice === 'B' ? 'cpj14-shake 380ms ease' : undefined,
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

        <ScratchJrBlock kind="jump" stepNum={3} scale={1.2} />

        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 35, fontWeight: 700 }}>
          Kurang Blok Lompat
        </div>
      </button>

      {/* Center Biko holding ? */}
      <BikoMascot
        pose="question"
        width={235}
        speechBubble={choice === 'A' ? 'Betul Sekali!' : choice === 'B' ? 'Cek Lagi Depannya!' : undefined}
        style={{ ...abs(842, 510) }}
      />

      <div
        style={{
          ...abs(320, 865, 1280, 90),
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
            ? 'Hebat! Mobil Biru belum punya Bendera Hijau di depan kodenya!'
            : choice === 'B'
              ? 'Di jalan lurus tidak butuh lompat! Periksa kotak kosong paling depan ya!'
              : 'Tunjuk jawaban yang benar di layarmu ya!'}
        </span>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Seru-Seruan Balapan: Atur Angka Langkah!
// ============================================================================
const Slide07AngkaBalapan: Page = () => {
  const [raced, setRaced] = useState(true);

  return (
    <JuniorFrame badge="TANTANGAN BALAPAN" accentDot={CORAL}>
      <SlideTitle>
        Siapa Melaju <Highlight>Paling Jauh?</Highlight>
      </SlideTitle>

      {/* Left: Highway Race Stage */}
      <MacWindowCard left={X0} top={235} width={980} height={685} headerLabel="lintasan-balapan.app" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
          <div style={{ flex: 1, borderRadius: 22, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <CityHighwaySvg width="100%" height="100%" />

            {/* Mobil Merah (8 steps -> way ahead!) */}
            <div
              style={{
                position: 'absolute',
                left: raced ? 645 : 70,
                top: 235,
                transition: 'left 650ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <RaceCarSvg variant="red" size={160} />
            </div>

            {/* Mobil Biru (5 steps -> relaxed!) */}
            <div
              style={{
                position: 'absolute',
                left: raced ? 420 : 70,
                top: 345,
                transition: 'left 650ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <RaceCarSvg variant="blue" size={160} />
            </div>

            {raced && (
              <div
                style={{
                  position: 'absolute',
                  right: 22,
                  top: 18,
                  padding: '8px 18px',
                  borderRadius: 99,
                  background: SUNNY,
                  border: `3px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 20,
                  fontWeight: 700,
                  ...row,
                  gap: 8,
                }}
              >
                <JuniorIcon name="trophy" size={24} />
                <span>Mobil Merah di Depan!</span>
              </div>
            )}
          </div>

          <button
            type="button"
            className="cpj14-card-btn"
            onClick={() => setRaced((r) => !r)}
            style={{
              padding: '14px 28px',
              borderRadius: 18,
              background: TEAL,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 5px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 25,
              fontWeight: 700,
              ...row,
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <JuniorIcon name="flag" size={26} />
            <span>{raced ? 'Kembali ke Garis Start' : 'Mulai Balapan Serempak!'}</span>
          </button>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard left={1115} top={235} width={705} height={685} headerLabel="info-angka-balapan.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 20 }}>
          <div
            style={{
              padding: '24px 26px',
              borderRadius: 24,
              background: CORAL_SOFT,
              border: `3.5px solid ${CORAL}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 18,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <JuniorIcon name="car-red" size={44} />
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 29, fontWeight: 700, lineHeight: 1.25 }}>
                <strong>Mobil Merah (8):</strong> Melaju <strong>Lebih Jauh!</strong>
              </div>
            </div>
            <ScratchJrBlock kind="move-right" stepNum={8} scale={0.78} />
          </div>

          <div
            style={{
              padding: '24px 26px',
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3.5px solid ${SKY}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 18,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <JuniorIcon name="car-blue" size={44} />
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 29, fontWeight: 700, lineHeight: 1.25 }}>
                <strong>Mobil Biru (5):</strong> Melaju <strong>Santai!</strong>
              </div>
            </div>
            <ScratchJrBlock kind="move-right" stepNum={5} scale={0.78} />
          </div>

          <div
            style={{
              padding: '20px 24px',
              borderRadius: 20,
              background: SUNNY_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'center',
              gap: 12,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="bulb" size={30} />
            <span>Angka lebih besar = jarak tempuh lebih jauh!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Parade Jalan Raya (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsParade: Page = () => (
  <JuniorFrame badge="TIPS PARADE SEREMPAK" accentDot={TEAL}>
    <SlideTitle>
      Rahasia Balapan <Highlight>Mulus!</Highlight>
    </SlideTitle>

    {/* Left Column — BOLEH / MULUS */}
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
          <span>BOLEH (SEREMPAK!)</span>
        </div>
        <JuniorIcon name="thumbs-up" size={46} />
      </div>

      {/* Neat Race Illustration */}
      <div style={{ height: 245, borderRadius: 24, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
        <CityHighwaySvg width="100%" height="100%" />
        <div style={{ position: 'absolute', left: 320, top: 120 }}>
          <RaceCarSvg variant="red" size={125} />
        </div>
        <div style={{ position: 'absolute', left: 300, top: 175 }}>
          <RaceCarSvg variant="blue" size={125} />
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
            Pasang <strong>Bendera Hijau</strong> di <strong>Kedua Mobil</strong>
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
          <JuniorIcon name="traffic-light" size={34} />
          <span>
            Susun mobil rapi di <strong>Garis Start</strong>
          </span>
        </div>
      </div>
    </div>

    {/* Right Column — JANGAN / TERTINGGAL */}
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
          <span>JANGAN (TERTINGGAL!)</span>
        </div>
        <JuniorIcon name="warning" size={46} />
      </div>

      {/* Left Behind Car Illustration */}
      <div style={{ height: 245, borderRadius: 24, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
        <CityHighwaySvg width="100%" height="100%" />
        <div style={{ position: 'absolute', left: 500, top: 120 }}>
          <RaceCarSvg variant="red" size={125} />
        </div>
        <div style={{ position: 'absolute', left: 65, top: 175 }}>
          <RaceCarSvg variant="blue" size={125} />
        </div>
        <div style={{ position: 'absolute', left: 195, top: 175 }}>
          <JuniorIcon name="question" size={36} />
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
            Lupa pasang Bendera Hijau di <strong>Mobil Kedua</strong>
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
          <JuniorIcon name="warning" size={34} />
          <span>
            Menumpuk mobil di <strong>Satu Titik</strong>
          </span>
        </div>
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Balapan Dua Mobil!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const [racing, setRacing] = useState(false);

  const stepCards = [
    { num: '1', color: SKY, soft: SKY_SOFT, icon: 'road' as JuniorIconName, label: 'Pasang latar Jalan Raya & 2 Mobil' },
    { num: '2', color: SUNNY, soft: SUNNY_SOFT, icon: 'puzzle' as JuniorIconName, label: 'Pasang Bendera Hijau + Maju di Tiap Mobil' },
    { num: '3', color: TEAL, soft: TEAL_SOFT, icon: 'flag' as JuniorIconName, label: 'Klik Bendera Hijau! Lihat balapannya!' },
  ];

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle top={120}>
        Misi <Highlight>Parade Jalan Raya!</Highlight>
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

      {/* Interactive Race Stage + Dual Code Bar */}
      <MacWindowCard left={X0} top={322} width={1320} height={635} headerLabel="misi-parade-jalan-raya.app" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ flex: 1, borderRadius: 22, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <CityHighwaySvg width="100%" height="100%" />

            <button
              type="button"
              className="cpj14-card-btn"
              onClick={() => setRacing((r) => !r)}
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
              <span>{racing ? 'Ulang ke Garis Start!' : 'Klik Bendera Hijau!'}</span>
            </button>

            <div
              style={{
                position: 'absolute',
                left: racing ? 940 : 125,
                top: 162,
                transition: 'left 750ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <RaceCarSvg variant="red" size={160} />
            </div>

            <div
              style={{
                position: 'absolute',
                left: racing ? 820 : 125,
                top: 262,
                transition: 'left 750ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <RaceCarSvg variant="blue" size={160} />
            </div>
          </div>

          <div style={{ height: 152, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
            <div style={{ borderRadius: 22, background: CORAL_SOFT, border: `3px solid ${CORAL}`, padding: '0 22px', ...row, justifyContent: 'space-between' }}>
              <RaceCarSvg variant="red" size={96} />
              <div style={{ ...row, gap: 0 }}>
                <ScratchJrBlock kind="green-flag" scale={0.78} />
                <div style={{ marginLeft: -8 }}>
                  <ScratchJrBlock kind="move-right" stepNum={8} scale={0.78} />
                </div>
              </div>
            </div>

            <div style={{ borderRadius: 22, background: SKY_SOFT, border: `3px solid ${SKY}`, padding: '0 22px', ...row, justifyContent: 'space-between' }}>
              <RaceCarSvg variant="blue" size={96} />
              <div style={{ ...row, gap: 0 }}>
                <ScratchJrBlock kind="green-flag" scale={0.78} />
                <div style={{ marginLeft: -8 }}>
                  <ScratchJrBlock kind="move-right" stepNum={6} scale={0.78} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="thumbs-up"
        width={345}
        badgeIcon={<JuniorIcon name="flag" size={24} />}
        speechBubble="Gas Poll!"
        style={{ ...abs(1470, 425) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 14 (Celebration Center Card)
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
            animation: live ? `cpj14-confetti ${2.4 + idx * 0.3}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={124} size={58}>
        <span style={{ ...row, justifyContent: 'center', gap: 14 }}>
          <span>Hore! Kamu</span>
          <Highlight>Jagoan Balapan Kode!</Highlight>
          <JuniorIcon name="party" size={52} />
        </span>
      </SlideTitle>

      {/* Center Celebration Card */}
      <MacWindowCard left={190} top={240} width={1140} height={685} headerLabel="lencana-parade-14.app" padding={34}>
        <div
          style={{
            height: '100%',
            ...centerCol,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          {/* Large Gold Medal featuring Two Race Cars & Waving Green Flag */}
          <div style={{ animation: live ? 'cpj14-float 3s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 260 260" fill="none">
              <path d="M84 14 L112 96 H148 L176 14 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
              <path d="M104 14 L130 90 L156 14" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="130" cy="150" r="92" fill={SUNNY} stroke={CHARCOAL} strokeWidth={6} />
              <circle cx="130" cy="150" r="74" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={4} />
              {/* Mini Flag at Top */}
              <rect x="112" y="96" width="6" height="36" rx="3" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
              <path d="M118 98 L152 106 L118 118 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
              {/* Mini Red Car */}
              <rect x="76" y="142" width="52" height="18" rx="7" fill={CORAL} stroke={CHARCOAL} strokeWidth={3} />
              <circle cx="90" cy="161" r="6" fill={CHARCOAL} />
              <circle cx="116" cy="161" r="6" fill={CHARCOAL} />
              {/* Mini Blue Car */}
              <rect x="134" y="158" width="52" height="18" rx="7" fill={SKY} stroke={CHARCOAL} strokeWidth={3} />
              <circle cx="148" cy="177" r="6" fill={CHARCOAL} />
              <circle cx="174" cy="177" r="6" fill={CHARCOAL} />
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
            <span>Lencana Sutradara Parade Jalan Raya</span>
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
            Kamu sudah mahir menggerakkan{' '}
            <Highlight color="#D1FAE5">2 Karakter Serempak dengan Bendera Hijau!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="car-red" size={22} />}
            speechBubble="Sutradara Hebat!"
          />
          <div style={{ animation: live ? 'cpj14-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 14 — Parade Jalan Raya!
Hari ini kita akan menggelar balapan seru di jalan raya ScratchJr dengan menggerakkan DUA mobil secara bersamaan memakai Bendera Hijau!`,

  `Dua misi seru kita hari ini:
1. Menambahkan 2 karakter Mobil di panggung Jalan Raya.
2. Menggerakkan Mobil Merah dan Mobil Biru melaju serempak bersama-sama!`,

  `Langkah #1 — Siapkan Jalan Raya & 2 Mobil:
Pilih latar Jalan Raya (City) lalu klik tombol Plus (+) di sebelah kiri untuk menambahkan Mobil Merah dan Mobil Biru.`,

  `Rahasia penting ScratchJr:
Setiap karakter punya ruang kode putihnya sendiri! Ketuk ikon Mobil Merah untuk mengatur kode Si Merah, lalu ketuk Mobil Biru untuk mengatur kode Si Biru.`,

  `Jurus Melaju Serempak:
Pasang blok Bendera Hijau di kode Mobil Merah DAN di kode Mobil Biru. Saat Bendera Hijau di atas layar ditekan, keduanya langsung melaju bareng!`,

  `Permainan Cepat! Mobil Merah sudah jalan, tapi kenapa Mobil Biru diam saja?
Apakah Pilihan A (Kurang Bendera Hijau) atau Pilihan B (Kurang Blok Lompat)?`,

  `Seru-seruan Balapan:
Coba atur angka langkah yang berbeda! Mobil Merah dengan angka 8 melaju lebih jauh dibandingkan Mobil Biru dengan angka 5.`,

  `Tips Parade Jalan Raya:
BOLEH memasang Bendera Hijau di kedua mobil dan menyusun rapi di Garis Start.
JANGAN lupa Bendera Hijau di mobil kedua atau menumpuk mobil di satu titik yang sama!`,

  `Waktunya praktik balapan dua mobil di laptop atau tablet:
1. Pasang latar Jalan Raya & 2 Mobil. 2. Pasang Bendera Hijau + Maju di tiap mobil. 3. Klik Bendera Hijau dan lihat balapannya!`,

  `Hore! Selamat untuk semua Sutradara Parade Jalan Raya!
Kalian berhasil menggerakkan 2 karakter serempak dan meraih Lencana Sutradara Parade Jalan Raya!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 14 — Parade Jalan Raya!',
  createdAt: '2026-11-14T15:40:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03SiapkanMobil,
  Slide04KodeSendiri,
  Slide05JurusSerempak,
  Slide06AyoTebak,
  Slide07AngkaBalapan,
  Slide08TipsParade,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

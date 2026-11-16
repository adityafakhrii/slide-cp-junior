import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-23-balapan-seru-kelinci-vs-kura-kura';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj23-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj23-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj23-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj23-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj23-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj23-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.85); }
  50% { box-shadow: 0 0 0 14px rgba(251, 191, 36, 0); }
}
.cpj23-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj23-card-btn:hover {
  transform: translateY(-4px);
}
.cpj23-card-btn:active {
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
  accentDot = ORANGE,
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
          animation: live ? 'cpj23-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: ORANGE,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 23 • Balapan Seru Kelinci vs Kura-Kura!</span>
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

const BulletRow = ({
  icon,
  bgColor = ORANGE_SOFT,
  children,
  fontSize = 31,
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
// Reusable Pertemuan 23 Visuals (Rabbit, Turtle, Race Track, Speed Blocks)
// ============================================================================

const WhiteRabbitSvg = ({
  size = 115,
  zoomLines = false,
}: {
  size?: number;
  zoomLines?: boolean;
}) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    {zoomLines && (
      <>
        <line x1="6" y1="62" x2="28" y2="62" stroke={CORAL} strokeWidth={5} strokeLinecap="round" />
        <line x1="2" y1="82" x2="26" y2="82" stroke={SUNNY} strokeWidth={5} strokeLinecap="round" />
        <line x1="10" y1="102" x2="32" y2="102" stroke={SKY} strokeWidth={5} strokeLinecap="round" />
      </>
    )}
    <ellipse cx="82" cy="148" rx="40" ry="7" fill="rgba(30,30,44,0.16)" />
    <ellipse cx="62" cy="34" rx="13" ry="30" transform="rotate(-10 62 34)" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="104" cy="34" rx="13" ry="30" transform="rotate(10 104 34)" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="62" cy="35" rx="6.5" ry="20" transform="rotate(-10 62 35)" fill="#FBCFE8" />
    <ellipse cx="104" cy="35" rx="6.5" ry="20" transform="rotate(10 104 35)" fill="#FBCFE8" />
    <ellipse cx="83" cy="115" rx="30" ry="28" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="83" cy="117" rx="17" ry="18" fill="#FCE7F3" />
    <ellipse cx="64" cy="141" rx="13" ry="7" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="102" cy="141" rx="13" ry="7" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="83" cy="74" rx="34" ry="28" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
    <circle cx="59" cy="79" r="6" fill="#FBCFE8" />
    <circle cx="107" cy="79" r="6" fill="#FBCFE8" />
    <circle cx="70" cy="69" r="4.5" fill={CHARCOAL} />
    <circle cx="96" cy="69" r="4.5" fill={CHARCOAL} />
    <polygon points="79,76 87,76 83,81" fill={CORAL} />
    <path d="M76 83 Q83 89 90 83" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
  </svg>
);

const CuteTurtleSvg = ({ size = 115 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 160 150" fill="none">
    <ellipse cx="78" cy="136" rx="46" ry="8" fill="rgba(30,30,44,0.16)" />
    {/* Little Feet */}
    <ellipse cx="48" cy="122" rx="14" ry="10" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="98" cy="122" rx="14" ry="10" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={3.8} />
    {/* Tail */}
    <polygon points="28,108 12,102 26,95" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={3.4} strokeLinejoin="round" />
    {/* Green Shell */}
    <path d="M26 108 C26 52, 118 52, 118 108 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4.2} strokeLinejoin="round" />
    <ellipse cx="72" cy="108" rx="48" ry="8" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.8} />
    {/* Shell Pattern */}
    <polygon points="72,62 56,76 62,94 82,94 88,76" fill="#34D399" stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
    {/* Friendly Head */}
    <circle cx="128" cy="86" r="22" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={4} />
    <circle cx="135" cy="80" r="4.5" fill={CHARCOAL} />
    <circle cx="136.5" cy="78.5" r="1.5" fill={WHITE} />
    <circle cx="136" cy="91" r="4.5" fill="#FBCFE8" />
    <path d="M123 93 Q131 99 139 93" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
  </svg>
);

const RaceParkBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 480 260" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="480" height="260" fill="#DBEAFE" />
    <circle cx="426" cy="40" r="22" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M0 116 Q160 94 320 118 Q410 130 480 108 V260 H0 Z" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={2.8} />
    {/* Twin Park Race Tracks */}
    <rect x="0" y="136" width="480" height="52" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={2.4} />
    <rect x="0" y="196" width="480" height="52" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={2.4} />
    {/* Start Line */}
    <line x1="66" y1="136" x2="66" y2="248" stroke={TEAL} strokeWidth={5} strokeDasharray="7 5" />
    {/* Checkered Finish Line */}
    <rect x="424" y="128" width="14" height="122" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
    {[0, 20, 40, 60, 80, 100].map((y) => (
      <rect key={y} x="424" y={128 + y} width="14" height="10" fill={CHARCOAL} />
    ))}
    {/* Finish Flag Pole */}
    <line x1="431" y1="78" x2="431" y2="128" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
    <rect x="431" y="78" width="34" height="24" rx="3" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.4} />
  </svg>
);

type SpeedBlockKind = 'start-flag' | 'speed-slow' | 'speed-med' | 'speed-fast' | 'move-right';

/** Chunky ScratchJr Block Renderer for Speed & Race Blocks */
const ScratchJrBlock = ({
  kind,
  num = 8,
  scale = 1,
  activeGlow = false,
}: {
  kind: SpeedBlockKind;
  num?: number;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-flag';
  const fill = kind === 'start-flag' ? SUNNY : kind === 'move-right' ? SKY : ORANGE;
  const w = Math.round(134 * scale);
  const h = Math.round(118 * scale);

  const pathData = isTrigger
    ? 'M30 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H24 C14 106 8 98 8 88 V38 C8 25 18 16 30 16 Z'
    : 'M14 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H14 V74 C24 74 24 48 14 48 V16 Z';

  const windLines = kind === 'speed-slow' ? 1 : kind === 'speed-med' ? 2 : 3;

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter: activeGlow ? 'drop-shadow(0 0 14px rgba(251, 191, 36, 0.95))' : undefined,
        transform: activeGlow ? 'scale(1.07)' : 'scale(1)',
        transition: 'transform 180ms ease, filter 180ms ease',
      }}
    >
      <svg width={w} height={h} viewBox="0 0 140 120">
        <path d={pathData} fill={fill} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />

        {kind === 'start-flag' && (
          <>
            <line x1="48" y1="30" x2="48" y2="90" stroke={CHARCOAL} strokeWidth={5.5} strokeLinecap="round" />
            <path d="M50 33 C68 27, 84 40, 98 35 V62 C84 68, 68 54, 50 61 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
          </>
        )}

        {kind === 'move-right' && (
          <path d="M36 53 H72 V38 L104 60 L72 82 V67 H36 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {(kind === 'speed-slow' || kind === 'speed-med' || kind === 'speed-fast') && (
          <>
            {/* Runner Silhouette */}
            <circle cx={kind === 'speed-fast' ? '82' : '76'} cy="38" r="9.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
            <path
              d={
                kind === 'speed-fast'
                  ? 'M68 52 L84 58 L76 74 M60 88 L76 72 L95 86'
                  : kind === 'speed-med'
                    ? 'M72 50 V72 M60 88 L72 72 L86 88 M58 60 L72 56 L86 64'
                    : 'M74 50 V74 M65 89 L74 74 L83 89 M64 62 L74 58 L84 64'
              }
              fill="none"
              stroke={WHITE}
              strokeWidth={7}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Wind Lines indicating Slow (1), Medium (2), Fast (3) */}
            {windLines >= 1 && <line x1="28" y1="45" x2="48" y2="45" stroke={SUNNY_SOFT} strokeWidth={5} strokeLinecap="round" />}
            {windLines >= 2 && <line x1="24" y1="60" x2="46" y2="60" stroke={SUNNY_SOFT} strokeWidth={5} strokeLinecap="round" />}
            {windLines >= 3 && <line x1="28" y1="75" x2="50" y2="75" stroke={SUNNY_SOFT} strokeWidth={5} strokeLinecap="round" />}
          </>
        )}
      </svg>

      {kind === 'move-right' && (
        <div
          style={{
            marginTop: Math.round(-16 * scale),
            minWidth: Math.round(46 * scale),
            height: Math.round(32 * scale),
            borderRadius: Math.round(10 * scale),
            background: WHITE,
            border: `2.8px solid ${CHARCOAL}`,
            boxShadow: `0 2px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(19 * scale),
            fontWeight: 700,
            ...centerCol,
            padding: '0 8px',
            zIndex: 2,
          }}
        >
          {num}
        </div>
      )}
    </div>
  );
};

/** Authentic ScratchJr Tablet Interface configured for Pertemuan 23 Race */
const AuthenticScratchJrUI = ({
  spotlight = 'none',
  selectedChar = 'rabbit',
  onSelectChar,
  rabbitProgress = 0,
  turtleProgress = 0,
  onRunRace,
  width = 880,
  height = 540,
}: {
  spotlight?: 'none' | 'orange-category';
  selectedChar?: 'rabbit' | 'turtle';
  onSelectChar?: (c: 'rabbit' | 'turtle') => void;
  rabbitProgress?: number;
  turtleProgress?: number;
  onRunRace?: () => void;
  width?: number | string;
  height?: number | string;
}) => {
  const ringStyle = (on: boolean): CSSProperties =>
    on
      ? {
          outline: `5px solid ${SUNNY}`,
          outlineOffset: 2,
          animation: 'cpj23-pulse 1.6s infinite',
        }
      : {};

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 24,
        background: '#CBD5E1',
        border: `3.5px solid ${CHARCOAL}`,
        boxShadow: `0 8px 0 ${CHARCOAL}`,
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        boxSizing: 'border-box',
      }}
    >
      {/* Top Toolbar */}
      <div
        style={{
          height: 48,
          borderRadius: 14,
          background: '#DBEAFE',
          border: `2.5px solid ${CHARCOAL}`,
          padding: '0 12px',
          ...row,
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ ...row, gap: 8 }}>
          <div style={{ width: 38, height: 34, borderRadius: 10, background: '#93C5FD', border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="house" size={22} />
          </div>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 16, fontWeight: 700, color: '#1E3A8A' }}>
            ScratchJr
          </span>
        </div>

        <div style={{ ...row, gap: 7 }}>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="fullscreen" size={22} />
          </div>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="grid" size={22} />
          </div>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="landscape" size={22} />
          </div>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="abc" size={22} />
          </div>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="reset" size={22} />
          </div>
          <button
            type="button"
            onClick={onRunRace}
            className={onRunRace ? 'cpj23-card-btn' : undefined}
            title="Bendera Hijau"
            style={{
              width: 46,
              height: 36,
              borderRadius: 10,
              background: TEAL_SOFT,
              border: `2.5px solid ${TEAL}`,
              ...centerCol,
              padding: 0,
            }}
          >
            <JuniorIcon name="flag" size={24} />
          </button>
        </div>

        <div
          style={{
            padding: '4px 12px',
            borderRadius: 10,
            background: SUNNY,
            border: `2px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          Balapan Taman
        </div>
      </div>

      {/* Middle 3-Column Row */}
      <div style={{ flex: 1, display: 'flex', gap: 10, minHeight: 0 }}>
        {/* Left Characters Sidebar */}
        <div
          style={{
            width: 102,
            borderRadius: 16,
            background: '#E2E8F0',
            border: `2.5px solid ${CHARCOAL}`,
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <button
            type="button"
            onClick={() => onSelectChar?.('rabbit')}
            className={onSelectChar ? 'cpj23-card-btn' : undefined}
            style={{
              width: '100%',
              height: 66,
              borderRadius: 12,
              background: WHITE,
              border: `3px solid ${selectedChar === 'rabbit' ? SUNNY : CHARCOAL}`,
              ...centerCol,
              position: 'relative',
              padding: 0,
            }}
          >
            <WhiteRabbitSvg size={50} />
            <div style={{ position: 'absolute', right: -4, top: -4, width: 20, height: 20, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
              <JuniorIcon name="paintbrush" size={11} />
            </div>
          </button>

          <button
            type="button"
            onClick={() => onSelectChar?.('turtle')}
            className={onSelectChar ? 'cpj23-card-btn' : undefined}
            style={{
              width: '100%',
              height: 66,
              borderRadius: 12,
              background: WHITE,
              border: `3px solid ${selectedChar === 'turtle' ? SUNNY : CHARCOAL}`,
              ...centerCol,
              padding: 0,
            }}
          >
            <CuteTurtleSvg size={52} />
          </button>

          <div style={{ marginTop: 'auto', opacity: 0.85 }}>
            <JuniorIcon name="plus-circle" size={28} />
          </div>
        </div>

        {/* Center Race Stage */}
        <div style={{ flex: 1, borderRadius: 18, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
          <RaceParkBackdropSvg />

          {/* Rabbit Top Track Lane */}
          <div
            style={{
              position: 'absolute',
              left: `${8 + rabbitProgress * 68}%`,
              bottom: 62,
              transition: rabbitProgress > 0 ? 'left 650ms cubic-bezier(0.22, 1, 0.36, 1)' : 'left 260ms ease',
            }}
          >
            <WhiteRabbitSvg size={95} zoomLines={rabbitProgress > 0} />
          </div>

          {/* Turtle Bottom Track Lane */}
          <div
            style={{
              position: 'absolute',
              left: `${8 + turtleProgress * 68}%`,
              bottom: 6,
              transition: turtleProgress > 0 ? 'left 2400ms linear' : 'left 260ms ease',
            }}
          >
            <CuteTurtleSvg size={92} />
          </div>
        </div>

        {/* Right Page Thumbnail */}
        <div
          style={{
            width: 96,
            borderRadius: 16,
            background: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div style={{ width: '100%', height: 62, borderRadius: 12, border: `2.5px solid ${SUNNY}`, overflow: 'hidden', position: 'relative' }}>
            <RaceParkBackdropSvg />
            <span style={{ position: 'absolute', right: 3, top: 3, width: 20, height: 20, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 12, fontWeight: 700, ...centerCol }}>
              1
            </span>
          </div>
          <JuniorIcon name="plus-circle" size={30} />
        </div>
      </div>

      {/* Bottom Coding Palette & Script Area */}
      <div
        style={{
          height: 126,
          borderRadius: 16,
          background: WHITE,
          backgroundImage: 'radial-gradient(#CBD5E1 1.4px, transparent 1.4px)',
          backgroundSize: '18px 18px',
          border: `2.5px solid ${CHARCOAL}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* Category Dots Shelf */}
        <div
          style={{
            height: 36,
            background: '#E0F2FE',
            borderBottom: `2px solid ${CHARCOAL}`,
            padding: '0 12px',
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ ...row, gap: 8 }}>
            {(['dot-yellow', 'dot-blue', 'dot-purple', 'dot-green', 'dot-orange', 'dot-red'] as JuniorIconName[]).map((d) => {
              const isOrange = d === 'dot-orange';
              return (
                <div
                  key={d}
                  style={{
                    padding: 2,
                    borderRadius: 99,
                    background: isOrange ? WHITE : 'transparent',
                    border: isOrange ? `2px solid ${CHARCOAL}` : '2px solid transparent',
                    ...centerCol,
                    ...ringStyle(spotlight === 'orange-category' && isOrange),
                  }}
                >
                  <JuniorIcon name={d} size={22} />
                </div>
              );
            })}
          </div>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 13, fontWeight: 700, color: MUTED }}>
            Kode: {selectedChar === 'rabbit' ? 'Kelinci (Cepat)' : 'Kura-Kura (Pelan)'}
          </span>
        </div>

        {/* Script Canvas */}
        <div style={{ flex: 1, padding: '4px 14px', ...row, alignItems: 'flex-start', overflow: 'hidden' }}>
          <ScratchJrBlock kind="start-flag" scale={0.72} />
          <div style={{ marginLeft: -12 }}>
            <ScratchJrBlock kind={selectedChar === 'rabbit' ? 'speed-fast' : 'speed-slow'} scale={0.72} />
          </div>
          <div style={{ marginLeft: -12 }}>
            <ScratchJrBlock kind="move-right" num={8} scale={0.72} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Cover)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 23" accentDot={ORANGE}>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 210, 860, 700), display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
          <JuniorIcon name="speed" size={24} />
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          Balapan Seru
          <br />
          <Highlight>Kelinci vs Kura-Kura!</Highlight>
        </h1>

        <p
          style={{
            margin: '28px 0 36px',
            fontSize: 31,
            fontWeight: 700,
            lineHeight: 1.38,
            color: MUTED,
            maxWidth: 790,
          }}
        >
          Mengatur Kecepatan Gerak Pelan, Sedang &amp; Cepat
        </p>

        {/* Quick Pill Highlights */}
        <div style={{ ...row, gap: 18 }}>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: ORANGE,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="bunny" size={28} />
            <span>Kelinci Cepat!</span>
          </div>
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
            <JuniorIcon name="turtle" size={28} />
            <span>Kura-Kura Santai!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Authentic ScratchJr Race Track + Biko with Flag */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #FFF7ED 0%, #ECFDF5 55%, #EFF6FF 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${ORANGE}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 145, zIndex: 2 }}>
          <AuthenticScratchJrUI rabbitProgress={0.72} turtleProgress={0.22} width={590} height={415} />
        </div>

        <div
          style={{
            position: 'absolute',
            left: -18,
            bottom: 30,
            zIndex: 3,
            animation: live ? 'cpj23-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="flag" size={24} />}
            speechBubble="Siap... Mulai!"
          />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi Besar)
// ============================================================================
const Slide02Misi: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI HARI INI" accentDot={SUNNY}>
      <SlideTitle>
        Apa Misi Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Atur Kecepatan • Pertemuan 23"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu 1 (Kuning) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${SUNNY}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                padding: '8px 22px',
                borderRadius: 99,
                background: SUNNY,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              MISI 1
            </div>

            <div
              style={{
                width: 245,
                height: 195,
                borderRadius: 28,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              <ScratchJrBlock kind="speed-fast" scale={1.3} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Kenali Blok <span style={{ color: '#C2410C' }}>Atur Kecepatan</span> (Set Speed)
            </div>
          </div>

          {/* Kartu 2 (Hijau) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: TEAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${TEAL}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
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
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              MISI 2
            </div>

            <div
              style={{
                width: 265,
                height: 195,
                borderRadius: 28,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...row,
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <WhiteRabbitSvg size={115} zoomLines />
              <CuteTurtleSvg size={110} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Buat Balapan <span style={{ color: '#047857' }}>Kelinci vs Kura-Kura!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj23-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="lightning" size={24} />}
          speechBubble="Seru banget!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Kenalan Sama Blok Oranye Kecepatan!
// ============================================================================
const Slide03BlokKecepatan: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="BLOK AJAIB BARU" accentDot={ORANGE}>
      <SlideTitle>
        Ini Namanya Blok <Highlight>Kecepatan!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Orange Category in ScratchJr Palette */}
      <MacWindowCard
        left={X0}
        top={235}
        width={880}
        height={720}
        titleBarColor={ORANGE_SOFT}
        headerLabel="Palet ScratchJr — Kategori Oranye (Kontrol)"
        padding={26}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <AuthenticScratchJrUI spotlight="orange-category" width="100%" height={430} />

          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'center', paddingTop: 6 }}>
            <div style={{ ...row, gap: 16 }}>
              <ScratchJrBlock kind="speed-med" scale={1.1} activeGlow />
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700, color: '#C2410C' }}>
                Atur Kecepatan!
              </div>
            </div>
            <div style={{ animation: live ? 'cpj23-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot
                pose="thumbs-up"
                width={150}
                badgeIcon={<JuniorIcon name="dot-orange" size={18} />}
                speechBubble="Klik oranye!"
              />
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={1020}
        top={235}
        width={800}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Fungsi Blok Kecepatan"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="dot-orange" bgColor={ORANGE_SOFT} fontSize={34}>
              Ada di rak <strong>Blok Oranye</strong> (<em>Kontrol</em>)
            </BulletRow>
            <BulletRow icon="lightning" bgColor={SUNNY_SOFT} fontSize={34}>
              Atur gerak <strong>Pelan, Sedang, atau Cepat!</strong>
            </BulletRow>
          </div>

          <div
            style={{
              padding: '24px 28px',
              borderRadius: 22,
              background: ORANGE_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 18,
            }}
          >
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Ketuk bagian bawah blok orang berlari untuk membuka menu <strong>3 Pilihan Kecepatan</strong>!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — 3 Pilihan Kecepatan Gerak!
// ============================================================================
const Slide04TigaPilihan: Page = () => {
  const choices = [
    {
      title: 'Pelan',
      desc: 'Jalan santai (1 garis angin)',
      block: 'speed-slow' as SpeedBlockKind,
      icon: 'turtle' as JuniorIconName,
      bg: SKY_SOFT,
      border: SKY,
      badgeBg: SKY,
      badgeText: WHITE,
    },
    {
      title: 'Sedang',
      desc: 'Lari biasa (2 garis angin)',
      block: 'speed-med' as SpeedBlockKind,
      icon: 'cat' as JuniorIconName,
      bg: SUNNY_SOFT,
      border: SUNNY,
      badgeBg: SUNNY,
      badgeText: CHARCOAL,
    },
    {
      title: 'Cepat',
      desc: 'Lari kencang! (3 garis angin)',
      block: 'speed-fast' as SpeedBlockKind,
      icon: 'bunny' as JuniorIconName,
      bg: CORAL_SOFT,
      border: CORAL,
      badgeBg: CORAL,
      badgeText: WHITE,
    },
  ];

  return (
    <JuniorFrame badge="3 PILIHAN KECEPATAN" accentDot={SUNNY}>
      <SlideTitle>
        Pilih <Highlight>Gaya Larinya!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1720}
        height={725}
        titleBarColor={CREAM}
        headerLabel="Menu Pilihan Kecepatan ScratchJr"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', gap: 30 }}>
          {choices.map((c) => (
            <div
              key={c.title}
              style={{
                flex: 1,
                borderRadius: 26,
                background: c.bg,
                border: `4px solid ${CHARCOAL}`,
                boxShadow: `0 8px 0 ${c.border}`,
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  padding: '8px 24px',
                  borderRadius: 99,
                  background: c.badgeBg,
                  color: c.badgeText,
                  border: `2.8px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 28,
                  fontWeight: 700,
                  ...row,
                  gap: 10,
                }}
              >
                <JuniorIcon name={c.icon} size={28} />
                <span>{c.title}</span>
              </div>

              <div
                style={{
                  width: 245,
                  height: 215,
                  borderRadius: 28,
                  background: WHITE,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: `0 6px 0 ${CHARCOAL}`,
                  ...centerCol,
                }}
              >
                <ScratchJrBlock kind={c.block} scale={1.45} />
              </div>

              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: CHARCOAL, lineHeight: 1.3 }}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Rahasia Kode: Pasang Sebelum Jalan!
// ============================================================================
const Slide05PasangSebelumJalan: Page = () => {
  return (
    <JuniorFrame badge="JURUS KECEPATAN" accentDot={SUNNY}>
      <SlideTitle>
        Pasang <Highlight>Sebelum Jalan!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Code Sequence with Highlight on Speed Block */}
      <MacWindowCard
        left={X0}
        top={235}
        width={880}
        height={720}
        titleBarColor={ORANGE_SOFT}
        headerLabel="Urutan Kode Kecepatan yang Benar"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              padding: '12px 26px',
              borderRadius: 99,
              background: SUNNY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            Pasang di TENGAH — Sebelum Panah Jalan!
          </div>

          <div
            style={{
              width: '100%',
              padding: '44px 20px',
              borderRadius: 26,
              backgroundColor: CREAM,
              backgroundImage: 'radial-gradient(#CBD5E1 1.6px, transparent 1.6px)',
              backgroundSize: '20px 20px',
              border: `3.5px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <ScratchJrBlock kind="start-flag" scale={1.45} />
            <div style={{ marginLeft: -20 }}>
              <ScratchJrBlock kind="speed-fast" scale={1.45} activeGlow />
            </div>
            <div style={{ marginLeft: -20 }}>
              <ScratchJrBlock kind="move-right" num={8} scale={1.45} />
            </div>
          </div>

          <div style={{ ...row, gap: 20 }}>
            <JuniorIcon name="arrow-up" size={44} />
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: '#C2410C' }}>
              Ubah kecepatan dulu, baru karakter melesat!
            </span>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={1020}
        top={235}
        width={800}
        height={720}
        titleBarColor={CREAM}
        headerLabel="3 Langkah Urutan"
        padding={40}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 40 }}>
          <BulletRow icon="step-1" bgColor={SUNNY_SOFT} fontSize={33}>
            Pasang <strong>Bendera Hijau</strong> <JuniorIcon name="flag" size={32} />
          </BulletRow>
          <BulletRow icon="step-2" bgColor={ORANGE_SOFT} fontSize={33}>
            Sambung <strong>Blok Kecepatan</strong> <JuniorIcon name="speed" size={32} />
          </BulletRow>
          <BulletRow icon="step-3" bgColor={SKY_SOFT} fontSize={33}>
            Baru sambung <strong>Blok Jalan!</strong> <JuniorIcon name="arrow-right" size={32} />
          </BulletRow>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Mana Kecepatan Pelan?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1600} top={128} size={54}>
        Ikon Mana untuk Gerak <Highlight>Pelan</Highlight> Kura-Kura?
      </SlideTitle>

      <div style={{ ...abs(190, 255, 1540, 445), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Kecepatan Pelan 1 Garis) */}
        <button
          type="button"
          onClick={() => setPicked('A')}
          className="cpj23-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'A' ? TEAL_SOFT : WHITE,
            border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'A' ? TEAL : CHARCOAL}`,
            padding: 32,
            ...centerCol,
            gap: 18,
            position: 'relative',
          }}
        >
          <div
            style={{
              ...abs(26, 24),
              padding: '6px 18px',
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

          <div style={{ marginTop: 18 }}>
            <ScratchJrBlock kind="speed-slow" scale={1.65} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Kecepatan Pelan (1 Garis)
          </div>

          {picked === 'A' && (
            <div
              style={{
                ...row,
                gap: 10,
                padding: '8px 22px',
                borderRadius: 99,
                background: TEAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              <JuniorIcon name="check" size={24} />
              <span>Benar! 1 garis angin artinya jalan pelan santai!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Kecepatan Cepat 3 Garis) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj23-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'B' ? CORAL_SOFT : WHITE,
            border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'B' ? CORAL : CHARCOAL}`,
            padding: 32,
            ...centerCol,
            gap: 18,
            position: 'relative',
            animation: picked === 'B' ? 'cpj23-shake 0.35s ease' : undefined,
          }}
        >
          <div
            style={{
              ...abs(26, 24),
              padding: '6px 18px',
              borderRadius: 99,
              background: CORAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            PILIHAN B
          </div>

          <div style={{ marginTop: 18 }}>
            <ScratchJrBlock kind="speed-fast" scale={1.65} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Kecepatan Cepat (3 Garis)
          </div>

          {picked === 'B' && (
            <div
              style={{
                ...row,
                gap: 10,
                padding: '8px 22px',
                borderRadius: 99,
                background: CORAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              <JuniorIcon name="cross" size={24} />
              <span>Ups! 3 garis angin itu untuk berlari kencang!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Center Prompt + Biko holding Question Sign */}
      <div style={{ ...abs(190, 725, 1540, 280), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj23-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={230}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Betul!' : 'Yang mana?'}
          />
        </div>

        <div
          style={{
            padding: '22px 36px',
            borderRadius: 26,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            ...row,
            gap: 20,
          }}
        >
          <div style={{ width: 68, height: 68, borderRadius: 20, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="question" size={38} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: CHARCOAL }}>
            Tunjuk ikon yang benar di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Resep Balapan Kelinci vs Kura-Kura!
// ============================================================================
const Slide07ResepBalapan: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="RESEP BALAPAN" accentDot={ORANGE}>
      <SlideTitle>
        Rangkai <Highlight>Kode Dua Pelari!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={230}
        width={1360}
        height={735}
        titleBarColor={CREAM}
        headerLabel="Resep Kode Kelinci vs Kura-Kura"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Kartu Atas — Kode Kelinci */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: CORAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CORAL}`,
              padding: '22px 34px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 20 }}>
              <div style={{ width: 135, height: 155, borderRadius: 22, background: WHITE, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
                <WhiteRabbitSvg size={115} zoomLines />
              </div>
              <div>
                <div style={{ padding: '6px 18px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, display: 'inline-block', marginBottom: 8 }}>
                  PELARI CEPAT
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700 }}>
                  Kode Kelinci
                </div>
              </div>
            </div>

            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-flag" scale={1.25} />
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="speed-fast" scale={1.25} activeGlow />
              </div>
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="move-right" num={8} scale={1.25} />
              </div>
            </div>
          </div>

          {/* Kartu Bawah — Kode Kura-Kura */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: TEAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${TEAL}`,
              padding: '22px 34px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 20 }}>
              <div style={{ width: 135, height: 155, borderRadius: 22, background: WHITE, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
                <CuteTurtleSvg size={115} />
              </div>
              <div>
                <div style={{ padding: '6px 18px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, display: 'inline-block', marginBottom: 8 }}>
                  PELARI PELAN
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700 }}>
                  Kode Kura-Kura
                </div>
              </div>
            </div>

            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-flag" scale={1.25} />
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="speed-slow" scale={1.25} activeGlow />
              </div>
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="move-right" num={8} scale={1.25} />
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Biko Mascot pointing enthusiastically */}
      <div
        style={{
          ...abs(1475, 345, 360, 560),
          ...centerCol,
          animation: live ? 'cpj23-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={335}
          badgeIcon={<JuniorIcon name="lightning" size={22} />}
          speechBubble="Bedanya di kecepatan!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Atur Kecepatan (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsBalapan: Page = () => {
  return (
    <JuniorFrame badge="TIPS JAGOAN BALAPAN" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Balapan <Highlight>Makin Seru!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & BERHASIL"
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
            <BulletRow icon="speed" bgColor={ORANGE_SOFT} fontSize={30}>
              Pasang blok kecepatan <strong>Sebelum</strong> blok jalan
            </BulletRow>
            <BulletRow icon="numbers" bgColor={TEAL_SOFT} fontSize={30}>
              Pakai jumlah langkah <strong>Sama (8)</strong> biar adil!
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, border: `3.5px solid ${TEAL}`, position: 'relative', overflow: 'hidden' }}>
            <RaceParkBackdropSvg />
            <div style={{ position: 'absolute', right: 85, bottom: 72 }}>
              <WhiteRabbitSvg size={105} zoomLines />
            </div>
            <div style={{ position: 'absolute', left: 95, bottom: 10 }}>
              <CuteTurtleSvg size={100} />
            </div>
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
            <BulletRow icon="see-no-evil" bgColor={CORAL_SOFT} fontSize={30}>
              Taruh blok kecepatan <strong>Di Akhir</strong> setelah jalan
            </BulletRow>
            <BulletRow icon="flag" bgColor={SUNNY_SOFT} fontSize={30}>
              Lupa pasang <strong>Bendera Hijau</strong> di salah satu karakter
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', padding: '0 24px' }}>
            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-flag" scale={0.95} />
              <div style={{ marginLeft: -12 }}>
                <ScratchJrBlock kind="move-right" num={8} scale={0.95} />
              </div>
              <div style={{ marginLeft: -12 }}>
                <ScratchJrBlock kind="speed-fast" scale={0.95} />
              </div>
            </div>
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Balapan Kelinci vs Kura-Kura!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [selectedChar, setSelectedChar] = useState<'rabbit' | 'turtle'>('rabbit');
  const [racing, setRacing] = useState(false);

  useEffect(() => {
    if (!racing) return;
    const t = setTimeout(() => setRacing(false), 3200);
    return () => clearTimeout(t);
  }, [racing]);

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Balapan Kelinci vs Kura-Kura!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'tree' as JuniorIconName,
            text: (
              <>
                Pasang latar <strong>Taman</strong> + <strong>Kelinci &amp; Kura-Kura</strong>
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'speed' as JuniorIconName,
            text: (
              <>
                Atur <strong>Cepat</strong> di Kelinci &amp; <strong>Pelan</strong> di Kura-Kura
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'flag' as JuniorIconName,
            text: (
              <>
                Klik <strong>Bendera Hijau!</strong> Siapa pemenangnya?
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
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: item.badgeBg,
                color: item.badgeText,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
                ...centerCol,
                flexShrink: 0,
              }}
            >
              {item.num}
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.24 }}>
              <JuniorIcon name={item.icon} size={26} style={{ marginRight: 8 }} />
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Authentic Interactive ScratchJr Race Workspace */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratchJrUI
          selectedChar={selectedChar}
          onSelectChar={setSelectedChar}
          rabbitProgress={racing ? 1 : 0}
          turtleProgress={racing ? 1 : 0}
          onRunRace={() => setRacing(true)}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Run Race Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 18 }}>
        <div style={{ animation: live ? 'cpj23-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={345}
            badgeIcon={<JuniorIcon name="flag" size={24} />}
            speechBubble={racing ? 'Ayo melesat!' : 'Siapa menang?'}
          />
        </div>
        <button
          type="button"
          onClick={() => setRacing(true)}
          className="cpj23-card-btn"
          style={{
            padding: '14px 26px',
            borderRadius: 20,
            background: TEAL,
            color: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 25,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          <JuniorIcon name="flag" size={26} />
          <span>{racing ? 'Balapan Berlangsung...' : 'Mulai Balapan!'}</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 23 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj23-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj23-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="star-glow" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj23-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={58}>
        Hore! Kamu <Highlight>Jagoan Pengatur Kecepatan!</Highlight>{' '}
        <JuniorIcon name="party" size={52} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={230}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 23"
        padding={36}
      >
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          {/* Bespoke Golden Speed Trophy & Lightning Medal SVG */}
          <div style={{ animation: live ? 'cpj23-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Race Trophy */}
              <path d="M88 74 H152 V102 C152 121, 138 132, 120 132 C102 132, 88 121, 88 102 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M88 82 C72 82, 70 105, 88 107" fill="none" stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
              <path d="M152 82 C168 82, 170 105, 152 107" fill="none" stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
              <rect x="113" y="130" width="14" height="16" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
              <rect x="96" y="145" width="48" height="12" rx="5" fill={CHARCOAL} />
              {/* Lightning Bolt on Trophy */}
              <polygon points="124,78 109,102 120,102 115,123 134,97 122,97" fill={ORANGE} stroke={CHARCOAL} strokeWidth={2.2} strokeLinejoin="round" />
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
            <span>Lencana Master Pengatur Kecepatan</span>
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
            Kamu sudah jago mengatur gerak{' '}
            <Highlight color="#D1FAE5">Pelan, Sedang, &amp; Cepat!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko, Rabbit & Turtle Celebrating */}
      <div style={{ ...abs(1320, 415, 540, 520), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 0 }}>
          <BikoMascot
            pose="jump"
            width={255}
            badgeIcon={<JuniorIcon name="trophy" size={22} />}
            speechBubble="Juara Balap!"
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
            <div style={{ animation: live ? 'cpj23-hop 1.7s ease-in-out infinite' : undefined }}>
              <WhiteRabbitSvg size={135} zoomLines />
            </div>
            <CuteTurtleSvg size={130} />
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
  `Selamat datang di Pertemuan 23 — Balapan Seru Kelinci vs Kura-Kura! 🐇🐢
Hari ini kita akan menggelar balapan di taman ScratchJr dan belajar mengatur kecepatan gerak Pelan, Sedang, dan Cepat!`,

  `Dua misi seru hari ini:
1. Mengenal blok Oranye baru: Atur Kecepatan (Set Speed).
2. Membuat balapan seru antara Kelinci yang cepat dan Kura-Kura yang berjalan pelan!`,

  `Kenalan sama Blok Oranye Kecepatan:
Ajak anak-anak mengetuk lingkaran kategori berwarna Oranye (Kontrol) dan menarik keluar blok bergambar Orang Berlari!`,

  `3 Pilihan Kecepatan Gerak:
Lihat jumlah garis angin di belakang pelari: 1 garis = Pelan (santai), 2 garis = Sedang (biasa), 3 garis = Cepat (melesat kencang)!`,

  `Rahasia Kode — Pasang Sebelum Jalan!
Pastikan urutan blok selalu: 1. Bendera Hijau -> 2. Blok Kecepatan -> 3. Blok Jalan (Maju 8). Kalau dipasang setelah jalan, kecepatannya tidak berubah!`,

  `Permainan Cepat! Ayo tebak bersama:
Ikon mana untuk gerak Pelan Kura-Kura — Pilihan A (1 Garis) atau Pilihan B (3 Garis)?`,

  `Resep Balapan Kelinci vs Kura-Kura:
- Kelinci: Bendera Hijau -> Kecepatan Cepat -> Maju 8.
- Kura-Kura: Bendera Hijau -> Kecepatan Pelan -> Maju 8.`,

  `Tips Jagoan Balapan:
BOLEH pasang blok kecepatan sebelum blok jalan dan gunakan jumlah langkah yang sama (8) biar adil.
JANGAN taruh blok kecepatan di akhir setelah jalan, atau lupa pasang Bendera Hijau di salah satu pelari!`,

  `Waktunya Misi Praktik Balapan Kelinci vs Kura-Kura:
1. Pasang latar Taman + Kelinci & Kura-Kura. 2. Atur Cepat di Kelinci & Pelan di Kura-Kura. 3. Klik Bendera Hijau dan lihat siapa yang sampai finis duluan!`,

  `Selamat untuk semua Jagoan Pengatur Kecepatan! 🎉
Kalian berhasil meraih Lencana Master Pengatur Kecepatan di Pertemuan 23!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 23 — Balapan Seru Kelinci vs Kura-Kura!',
  createdAt: '2026-11-16T14:09:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BlokKecepatan,
  Slide04TigaPilihan,
  Slide05PasangSebelumJalan,
  Slide06AyoTebak,
  Slide07ResepBalapan,
  Slide08TipsBalapan,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

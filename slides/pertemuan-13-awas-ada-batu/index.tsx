import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-13-awas-ada-batu';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj13-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj13-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-16px) scale(1.04); }
}
@keyframes cpj13-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj13-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj13-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj13-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj13-card-btn:hover {
  transform: translateY(-4px);
}
.cpj13-card-btn:active {
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
          animation: live ? 'cpj13-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 13 • Awas Ada Batu!</span>
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
// Reusable Pertemuan 13 Visuals (Kucing Tic, Boulder Rock, Playground, Blocks)
// ============================================================================

/** Kucing Tic Character SVG with rotation/waving/bump states */
const TicCatSvg = ({
  size = 140,
  waving = false,
  confused = false,
  spinDeg = 0,
  style,
}: {
  size?: number;
  waving?: boolean;
  confused?: boolean;
  spinDeg?: number;
  style?: CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 140 140"
    fill="none"
    style={{
      transform: `rotate(${spinDeg}deg)`,
      transition: 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
      ...style,
    }}
  >
    <ellipse cx="70" cy="126" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path
      d="M96 98 C118 96, 126 76, 114 66 C106 60, 100 68, 104 75 C106 80, 100 88, 92 88"
      fill={ORANGE}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
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
    <path d="M38 50 L36 18 L60 36 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    <path d="M42 44 L41 25 L54 36 Z" fill="#FDBA74" />
    <path d="M102 50 L104 18 L80 36 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    <path d="M98 44 L99 25 L86 36 Z" fill="#FDBA74" />
    <ellipse cx="70" cy="57" rx="34" ry="29" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
    <path d="M64 31 V39 M70 29 V41 M76 31 V39" stroke="#C2410C" strokeWidth={3.5} strokeLinecap="round" />
    <ellipse cx="70" cy="66" rx="22" ry="15" fill={WHITE} />
    <circle cx="57" cy="53" r="5" fill={CHARCOAL} />
    <circle cx="83" cy="53" r="5" fill={CHARCOAL} />
    <circle cx="58.5" cy="51.2" r="1.8" fill={WHITE} />
    <circle cx="84.5" cy="51.2" r="1.8" fill={WHITE} />
    <polygon points="66,60 74,60 70,65" fill={CORAL} />
    {confused ? (
      <path d="M62 71 Q70 65 78 71" stroke={CORAL} strokeWidth={3.2} strokeLinecap="round" fill="none" />
    ) : (
      <path d="M62 67 Q70 74 78 67" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" fill="none" />
    )}
    <path
      d="M42 58 L28 55 M42 64 L27 66 M98 58 L112 55 M98 64 L113 66"
      stroke={CHARCOAL}
      strokeWidth={2.8}
      strokeLinecap="round"
    />
  </svg>
);

/** Chunky Cartoon Rock / Boulder Obstacle SVG */
const RockBoulderSvg = ({ size = 95 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="86" rx="38" ry="8" fill="rgba(30,30,44,0.18)" />
    <path
      d="M14 78 L18 42 L38 22 L68 24 L86 48 L84 78 C84 82, 14 82, 14 78 Z"
      fill="#94A3B8"
      stroke={CHARCOAL}
      strokeWidth={4.2}
      strokeLinejoin="round"
    />
    <path d="M22 72 L26 46 L42 30 L58 32 L48 54 L44 72 Z" fill="#CBD5E1" />
    <path d="M56 54 L66 44 M62 64 L74 58" stroke="#64748B" strokeWidth={3.2} strokeLinecap="round" />
  </svg>
);

/** Green Playground Scenery SVG */
const PlaygroundBackdropSvg = ({
  width = 420,
  height = 240,
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <svg width={width} height={height} viewBox="0 0 420 240" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="420" height="240" fill="#BAE6FD" />
    <circle cx="358" cy="48" r="24" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
    <path d="M48 56 C40 56, 38 44, 46 40 C48 30, 62 28, 69 34 C77 30, 88 36, 86 45 C92 48, 90 56, 82 56 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
    <path d="M188 44 C182 44, 180 35, 187 32 C189 24, 200 23, 206 28 C213 24, 222 29, 220 36 C225 38, 223 44, 217 44 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.2} />
    <path d="M0 156 Q110 128 220 152 Q320 174 420 144 V240 H0 Z" fill="#4ADE80" stroke={CHARCOAL} strokeWidth={3} />
    <path d="M0 178 Q160 162 420 178 V240 H0 Z" fill="#22C55E" />
    <rect x="46" y="106" width="16" height="58" rx="4" fill="#B45309" stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="54" cy="92" r="28" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="38" cy="100" r="18" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="70" cy="100" r="18" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="136" cy="196" r="5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="248" cy="206" r="5" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
  </svg>
);

/** Authentic ScratchJr Action Block SVG supporting flag, move-right, jump, turn-right, turn-left */
const ScratchJrActionBlock = ({
  kind,
  stepNum = 1,
  scale = 1,
  highlightNumber = false,
  onClick,
}: {
  kind: 'green-flag' | 'move-right' | 'jump' | 'turn-right' | 'turn-left';
  stepNum?: number;
  scale?: number;
  highlightNumber?: boolean;
  onClick?: () => void;
}) => {
  const isFlag = kind === 'green-flag';
  const fill = isFlag ? SUNNY : SKY;
  const width = Math.round(136 * scale);
  const height = Math.round((isFlag ? 118 : 138) * scale);

  const bodyPath = isFlag
    ? 'M32 10 H106 C112 10, 116 14, 116 20 V42 C126 42, 130 48, 130 57 C130 66, 126 72, 116 72 V96 C116 102, 112 106, 106 106 H32 C16 106, 8 88, 8 58 C8 28, 16 10, 32 10 Z'
    : 'M14 10 H106 C112 10, 116 14, 116 20 V42 C126 42, 130 48, 130 57 C130 66, 126 72, 116 72 V96 C116 102, 112 106, 106 106 H14 C10 106, 8 102, 8 96 V72 C18 72, 22 66, 22 57 C22 48, 18 42, 8 42 V20 C8 14, 10 10, 14 10 Z';

  return (
    <div
      onClick={onClick}
      className={onClick ? 'cpj13-card-btn' : undefined}
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
            <path
              d="M51 30 C64 25, 76 37, 94 31 L90 58 C75 63, 64 52, 51 56 Z"
              fill={TEAL}
              stroke={CHARCOAL}
              strokeWidth={3.2}
              strokeLinejoin="round"
            />
          </>
        )}

        {kind === 'move-right' && (
          <path
            d="M36 47 H70 V32 L100 58 L70 84 V69 H36 Z"
            fill={WHITE}
            stroke={CHARCOAL}
            strokeWidth={3.6}
            strokeLinejoin="round"
          />
        )}

        {kind === 'jump' && (
          <>
            {/* ScratchJr Curved Jump Arrow (Up & Down Arc) */}
            <path
              d="M36 78 C42 28, 76 26, 86 64"
              fill="none"
              stroke={WHITE}
              strokeWidth={11}
              strokeLinecap="round"
            />
            <path
              d="M72 60 L88 80 L99 55 Z"
              fill={WHITE}
              stroke={CHARCOAL}
              strokeWidth={3}
              strokeLinejoin="round"
            />
          </>
        )}

        {kind === 'turn-right' && (
          <>
            {/* Clockwise Turn Arrow */}
            <path
              d="M44 50 C52 28, 86 28, 88 54"
              fill="none"
              stroke={WHITE}
              strokeWidth={10}
              strokeLinecap="round"
            />
            <path d="M74 52 L90 73 L100 50 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
          </>
        )}

        {kind === 'turn-left' && (
          <>
            {/* Counter-Clockwise Turn Arrow */}
            <path
              d="M90 50 C82 28, 48 28, 46 54"
              fill="none"
              stroke={WHITE}
              strokeWidth={10}
              strokeLinecap="round"
            />
            <path d="M34 50 L44 73 L60 52 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
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
// SLIDE 01 — Sampul Pertemuan (Octagonal Adventure Frame + Jumping Cat + Biko)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 13" accentDot={SUNNY}>
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
            background: SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#92400E',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="rock" size={22} />
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
          Awas Ada
          <br />
          <Highlight>Batu!</Highlight>
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
          Kombinasi Blok Jalan, Lompat &amp; Berputar
        </p>

        {/* Quick Pill Highlights */}
        <div style={{ ...row, gap: 18 }}>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: SKY,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="jump" size={28} />
            <span>Blok Lompat</span>
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
            <JuniorIcon name="turn-right" size={28} />
            <span>Blok Berputar</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Octagonal Action Frame (distinct cover shape) + Laptop + Biko */}
      <div style={{ ...abs(985, 145, 840, 810), ...centerCol }}>
        {/* Octagonal Adventure Card SVG */}
        <svg
          width={740}
          height={720}
          viewBox="0 0 740 720"
          fill="none"
          style={{ position: 'absolute', inset: 0, margin: 'auto', pointerEvents: 'none' }}
        >
          <polygon
            points="120,24 620,24 716,120 716,600 620,696 120,696 24,600 24,120"
            fill={CORAL}
            transform="translate(14 14)"
          />
          <polygon
            points="120,24 620,24 716,120 716,600 620,696 120,696 24,600 24,120"
            fill="#FEF9C3"
            stroke={CHARCOAL}
            strokeWidth={5}
            strokeLinejoin="round"
          />
          <circle cx="370" cy="360" r="245" fill="none" stroke={SUNNY} strokeWidth={5} strokeDasharray="16 14" />
        </svg>

        {/* Laptop Window displaying Kucing Tic leaping high over big Boulder */}
        <div
          style={{
            position: 'absolute',
            right: 46,
            top: 175,
            width: 475,
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
              <JuniorIcon name="laptop" size={22} />
              <span>ScratchJr — Awas Batu!</span>
            </span>
            <JuniorIcon name="flag" size={24} />
          </div>

          <div style={{ height: 225, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <PlaygroundBackdropSvg width="100%" height="100%" />
            {/* Parabolic Golden Jump Arc */}
            <svg width="100%" height="100%" viewBox="0 0 440 220" style={{ position: 'absolute', inset: 0 }}>
              <path
                d="M70 160 Q220 20 355 155"
                fill="none"
                stroke={SUNNY}
                strokeWidth={7}
                strokeDasharray="12 10"
                strokeLinecap="round"
              />
            </svg>
            {/* Big Rock Boulder on Ground */}
            <div style={{ position: 'absolute', left: '48%', bottom: 18, transform: 'translateX(-50%)' }}>
              <RockBoulderSvg size={105} />
            </div>
            {/* High-Jumping Kucing Tic Above the Rock */}
            <div
              style={{
                position: 'absolute',
                left: '48%',
                top: 16,
                transform: 'translateX(-50%)',
                animation: live ? 'cpj13-hop 2s ease-in-out infinite' : undefined,
              }}
            >
              <TicCatSvg size={120} waving />
            </div>
          </div>

          <div style={{ marginTop: 10, ...row, justifyContent: 'center', gap: 4 }}>
            <ScratchJrActionBlock kind="green-flag" scale={0.55} />
            <ScratchJrActionBlock kind="move-right" stepNum={2} scale={0.55} />
            <ScratchJrActionBlock kind="jump" stepNum={4} scale={0.55} />
            <ScratchJrActionBlock kind="turn-right" stepNum={12} scale={0.55} />
          </div>
        </div>

        {/* Biko Pressing Green Flag */}
        <BikoMascot
          pose="point-right"
          width={325}
          badgeIcon={<JuniorIcon name="jump" size={24} />}
          speechBubble="Lompat Tinggi!"
          style={{ position: 'absolute', left: 10, bottom: 48, zIndex: 4 }}
        />

        {/* Floating Action Pill */}
        <div
          style={{
            position: 'absolute',
            right: 24,
            bottom: 64,
            padding: '10px 18px',
            borderRadius: 20,
            background: TEAL_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 5px 0 ${CHARCOAL}`,
            ...row,
            gap: 8,
            zIndex: 5,
            animation: live ? 'cpj13-float 2.8s ease-in-out infinite' : undefined,
          }}
        >
          <JuniorIcon name="sparkle" size={24} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700 }}>
            Jagoan Akrobat!
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

      <MacWindowCard left={X0} top={235} width={1320} height={700} headerLabel="misi-pertemuan-13.app" padding={36}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Card 1: Blok Lompat & Berputar */}
          <button
            type="button"
            className="cpj13-card-btn"
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

            <div style={{ ...row, gap: 16, height: 220, alignItems: 'center' }}>
              <ScratchJrActionBlock kind="jump" stepNum={2} scale={1.1} />
              <ScratchJrActionBlock kind="turn-right" stepNum={12} scale={1.1} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.28 }}>
              Kenali Blok <Highlight color={WHITE}>Lompat &amp; Berputar</Highlight>
            </div>
          </button>

          {/* Card 2: Lewati Batu Rintangan */}
          <button
            type="button"
            className="cpj13-card-btn"
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
                width: 280,
                height: 215,
                borderRadius: 22,
                border: `3.5px solid ${CHARCOAL}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <PlaygroundBackdropSvg width="100%" height="100%" />
              <div style={{ position: 'absolute', left: '50%', bottom: 10, transform: 'translateX(-50%)' }}>
                <RockBoulderSvg size={90} />
              </div>
              <div style={{ position: 'absolute', left: '50%', top: 14, transform: 'translateX(-50%)' }}>
                <TicCatSvg size={100} waving />
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.28 }}>
              Lewati <Highlight color={SUNNY_SOFT}>Batu Rintangan</Highlight> di Panggung!
            </div>
          </button>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="point-left"
        width={355}
        badgeIcon={<JuniorIcon name="jump" size={24} />}
        speechBubble={selected === 0 ? '2 Blok Baru!' : 'Lompati Batu!'}
        style={{ ...abs(1470, 390) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Blok Biru Baru #1: Lompat (Jump)
// ============================================================================
const Slide03BlokLompat: Page = () => {
  const [jumping, setJumping] = useState(false);

  return (
    <JuniorFrame badge="BLOK BIRU BARU #1" accentDot={SKY}>
      <SlideTitle>
        Ini Namanya Blok <Highlight>Lompat!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Giant Jump Block + Arc Jumping Cat */}
      <MacWindowCard left={X0} top={240} width={920} height={680} headerLabel="blok-lompat-scratchjr.app" padding={34}>
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
            <span>Klik Blok Lompat untuk melihat aksi Kucing Tic!</span>
          </div>

          <div style={{ ...row, alignItems: 'center', gap: 44 }}>
            <ScratchJrActionBlock
              kind="jump"
              stepNum={2}
              scale={1.7}
              onClick={() => {
                setJumping(true);
                window.setTimeout(() => setJumping(false), 620);
              }}
            />

            {/* Jump Arc Demo Box */}
            <div
              style={{
                width: 440,
                height: 310,
                borderRadius: 28,
                background: TEAL_SOFT,
                border: `3.5px solid ${CHARCOAL}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, background: '#4ADE80', borderTop: `3px solid ${CHARCOAL}` }} />
              <svg width="440" height="310" viewBox="0 0 440 310" style={{ position: 'absolute', inset: 0 }}>
                <path
                  d="M90 230 Q220 38 350 230"
                  fill="none"
                  stroke={SUNNY}
                  strokeWidth={8}
                  strokeDasharray="12 10"
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: 'absolute', left: '50%', bottom: 26, transform: 'translateX(-50%)' }}>
                <RockBoulderSvg size={95} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: jumping ? 148 : 112,
                  transform: 'translateX(-50%)',
                  transition: 'bottom 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <TicCatSvg size={135} waving />
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '12px 26px',
              borderRadius: 18,
              background: SUNNY_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
              ...row,
              gap: 10,
            }}
          >
            <JuniorIcon name="jump" size={26} />
            <span>Panah melengkung naik-turun membuat karakter melompat ke atas lalu turun lagi!</span>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard left={1060} top={240} width={760} height={680} headerLabel="info-lompat.app" padding={36}>
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
              lineHeight: 1.32,
            }}
          >
            <JuniorIcon name="jump" size={50} />
            <span>
              Bikin karakter <strong>Melompat Tinggi</strong>
            </span>
          </div>

          <div
            style={{
              padding: '28px 30px',
              borderRadius: 24,
              background: TEAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 20,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 33,
              fontWeight: 700,
              lineHeight: 1.32,
            }}
          >
            <JuniorIcon name="rock" size={50} />
            <span>
              Cocok untuk <strong>Melewati Batu!</strong>
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
            <span>Angka besar = lompat makin tinggi!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Blok Biru Baru #2: Berputar (Turn)
// ============================================================================
const Slide04BlokBerputar: Page = () => {
  const [spinDeg, setSpinDeg] = useState(0);

  return (
    <JuniorFrame badge="BLOK BIRU BARU #2" accentDot={TEAL}>
      <SlideTitle>
        Ini Namanya Blok <Highlight>Berputar!</Highlight>
      </SlideTitle>

      {/* Left Explanation Card + Spin Buttons */}
      <MacWindowCard left={X0} top={240} width={760} height={680} headerLabel="info-berputar.app" padding={36}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                padding: '26px 28px',
                borderRadius: 24,
                background: SKY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                gap: 20,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="turn-right" size={48} />
              <span>
                Bikin karakter <strong>Berputar Gembira</strong>
              </span>
            </div>

            <div
              style={{
                padding: '26px 28px',
                borderRadius: 24,
                background: SUNNY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                gap: 20,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="sparkle" size={48} />
              <span>
                Bisa putar ke <strong>Kanan</strong> atau <strong>Kiri!</strong>
              </span>
            </div>
          </div>

          <div style={{ ...row, gap: 18 }}>
            <button
              type="button"
              className="cpj13-card-btn"
              onClick={() => setSpinDeg((d) => d + 360)}
              style={{
                flex: 1,
                padding: '18px 20px',
                borderRadius: 20,
                background: SKY,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 25,
                fontWeight: 700,
                ...row,
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <JuniorIcon name="turn-right" size={28} />
              <span>Putar Kanan</span>
            </button>
            <button
              type="button"
              className="cpj13-card-btn"
              onClick={() => setSpinDeg((d) => d - 360)}
              style={{
                flex: 1,
                padding: '18px 20px',
                borderRadius: 20,
                background: TEAL,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 25,
                fontWeight: 700,
                ...row,
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <JuniorIcon name="turn-left" size={28} />
              <span>Putar Kiri</span>
            </button>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Card: Two Turn Blocks + Spinning Kucing Tic */}
      <MacWindowCard left={900} top={240} width={920} height={680} headerLabel="aksi-berputar.app" padding={34}>
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 48, alignItems: 'center' }}>
            <div style={{ ...centerCol, gap: 10 }}>
              <ScratchJrActionBlock
                kind="turn-right"
                stepNum={12}
                scale={1.38}
                onClick={() => setSpinDeg((d) => d + 360)}
              />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                Putar Kanan
              </span>
            </div>

            <div style={{ ...centerCol, gap: 10 }}>
              <ScratchJrActionBlock
                kind="turn-left"
                stepNum={12}
                scale={1.38}
                onClick={() => setSpinDeg((d) => d - 360)}
              />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                Putar Kiri
              </span>
            </div>
          </div>

          {/* Cheerful Spinning Kucing Tic Box */}
          <div
            style={{
              width: '100%',
              height: 310,
              borderRadius: 28,
              background: SUNNY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              ...centerCol,
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', left: 100, top: 45 }}>
              <JuniorIcon name="star-glow" size={44} />
            </div>
            <div style={{ position: 'absolute', right: 100, top: 45 }}>
              <JuniorIcon name="sparkle" size={44} />
            </div>
            <div style={{ position: 'absolute', left: 150, bottom: 38 }}>
              <JuniorIcon name="sparkle" size={38} />
            </div>
            <div style={{ position: 'absolute', right: 150, bottom: 38 }}>
              <JuniorIcon name="star-glow" size={38} />
            </div>
            <TicCatSvg size={200} waving spinDeg={spinDeg} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus Kombinasi: Jalan, Lompat & Berputar!
// ============================================================================
const Slide05JurusKombinasi: Page = () => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(2);

  const steps: Array<{
    num: 1 | 2 | 3;
    color: string;
    soft: string;
    icon: JuniorIconName;
    label: string;
  }> = [
    { num: 1, color: SKY, soft: SKY_SOFT, icon: 'arrow-right', label: 'Jalan mendekati batu' },
    { num: 2, color: SUNNY, soft: SUNNY_SOFT, icon: 'jump', label: 'Lompat melewati atas batu!' },
    { num: 3, color: TEAL, soft: TEAL_SOFT, icon: 'turn-right', label: 'Berputar tanda berhasil!' },
  ];

  return (
    <JuniorFrame badge="JURUS KOMBINASI" accentDot={SUNNY}>
      <SlideTitle>
        Jurus <Highlight>Jalan, Lompat &amp; Berputar!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={235} width={1720} height={700} headerLabel="jurus-kombinasi-blok.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 22 }}>
          {/* 3 Step Cards */}
          <div style={{ ...row, justifyContent: 'space-between', gap: 18 }}>
            {steps.map((s, idx) => {
              const active = activeStep === s.num;
              return (
                <Fragment key={s.num}>
                  <button
                    type="button"
                    className="cpj13-card-btn"
                    onClick={() => setActiveStep(s.num)}
                    style={{
                      flex: 1,
                      height: 195,
                      borderRadius: 26,
                      background: s.soft,
                      border: `3.5px solid ${CHARCOAL}`,
                      boxShadow: active ? `0 0 0 6px ${SUNNY}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${s.color}`,
                      padding: '22px 26px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
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
                          fontSize: 21,
                          fontWeight: 700,
                        }}
                      >
                        Langkah {s.num}
                      </span>
                      <JuniorIcon name={s.icon} size={42} />
                    </div>
                    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, lineHeight: 1.24 }}>
                      {s.label}
                    </div>
                  </button>
                  {idx < 2 && <JuniorIcon name="arrow-right" size={34} />}
                </Fragment>
              );
            })}
          </div>

          {/* Connected ScratchJr Code Chain */}
          <div
            style={{
              flex: 1,
              borderRadius: 26,
              background: '#F8FAFC',
              border: `3.5px solid ${CHARCOAL}`,
              padding: '24px 36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700, color: MUTED }}>
              Rangkaian Kode Lengkap:
            </div>

            <div style={{ ...row, justifyContent: 'center', gap: 0 }}>
              <ScratchJrActionBlock kind="green-flag" scale={1.2} />
              <div style={{ marginLeft: -12, outline: activeStep === 1 ? `5px solid ${SUNNY}` : 'none', borderRadius: 18 }}>
                <ScratchJrActionBlock kind="move-right" stepNum={2} scale={1.2} onClick={() => setActiveStep(1)} />
              </div>
              <div style={{ marginLeft: -12, outline: activeStep === 2 ? `5px solid ${SUNNY}` : 'none', borderRadius: 18 }}>
                <ScratchJrActionBlock kind="jump" stepNum={4} scale={1.2} onClick={() => setActiveStep(2)} />
              </div>
              <div style={{ marginLeft: -12, outline: activeStep === 3 ? `5px solid ${TEAL}` : 'none', borderRadius: 18 }}>
                <ScratchJrActionBlock kind="turn-right" stepNum={12} scale={1.2} onClick={() => setActiveStep(3)} />
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: CHARCOAL }}>
              {activeStep === 1 && 'Langkah 1: Maju 2 kotak ke depan batu!'}
              {activeStep === 2 && 'Langkah 2: Lompat tinggi 4 melewati atas batu!'}
              {activeStep === 3 && 'Langkah 3: Berputar penuh 12 sebagai perayaan!'}
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Blok Apa untuk Lewati Batu?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [choice, setChoice] = useState<'A' | 'B' | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" top={118} size={56}>
        Blok Apa untuk <Highlight>Melewati Batu?</Highlight>
      </SlideTitle>

      {/* Top Visual Stage + Code Prompt */}
      <div
        style={{
          ...abs(210, 208, 1500, 175),
          borderRadius: 28,
          background: WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 7px 0 ${CHARCOAL}`,
          padding: '16px 32px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 28,
          alignItems: 'center',
        }}
      >
        {/* Mini Stage with Cat in front of Big Boulder */}
        <div style={{ height: 138, borderRadius: 18, border: `2.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
          <PlaygroundBackdropSvg width="100%" height="100%" />
          <div
            style={{
              position: 'absolute',
              left: choice === 'A' ? '64%' : '26%',
              top: choice === 'A' ? '26%' : '56%',
              transform: 'translate(-50%, -50%)',
              transition: 'left 450ms ease, top 450ms ease',
            }}
          >
            <TicCatSvg size={94} waving />
          </div>
          <div style={{ position: 'absolute', left: '54%', bottom: 8, transform: 'translateX(-50%)' }}>
            <RockBoulderSvg size={72} />
          </div>
        </div>

        {/* Code Equation: [Flag] -> [ ? ] */}
        <div style={{ ...row, justifyContent: 'center', gap: 14 }}>
          <ScratchJrActionBlock kind="green-flag" scale={0.95} />
          <JuniorIcon name="arrow-right" size={36} />
          {choice === 'A' ? (
            <ScratchJrActionBlock kind="jump" stepNum={4} scale={0.95} />
          ) : (
            <div
              style={{
                width: 128,
                height: 112,
                borderRadius: 22,
                background: SUNNY_SOFT,
                border: `4px dashed ${CORAL}`,
                ...centerCol,
              }}
            >
              <JuniorIcon name="question" size={56} />
            </div>
          )}
        </div>
      </div>

      {/* Choice Card A: Blok Lompat (CORRECT) */}
      <button
        type="button"
        className="cpj13-card-btn"
        onClick={() => setChoice('A')}
        style={{
          ...abs(160, 405, 620, 415),
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
            background: TEAL_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          PILIHAN A
        </div>

        <ScratchJrActionBlock kind="jump" stepNum={4} scale={1.25} />

        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700 }}>
          Blok Lompat
        </div>
      </button>

      {/* Choice Card B: Blok Berputar (INCORRECT) */}
      <button
        key={shakeKey}
        type="button"
        className="cpj13-card-btn"
        onClick={() => {
          setChoice('B');
          setShakeKey((k) => k + 1);
        }}
        style={{
          ...abs(1140, 405, 620, 415),
          borderRadius: 34,
          background: choice === 'B' ? CORAL_SOFT : WHITE,
          border: `4px solid ${choice === 'B' ? CORAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 32,
          ...centerCol,
          justifyContent: 'space-between',
          animation: choice === 'B' ? 'cpj13-shake 380ms ease' : undefined,
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

        <ScratchJrActionBlock kind="turn-right" stepNum={12} scale={1.25} />

        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700 }}>
          Blok Berputar
        </div>
      </button>

      {/* Center Biko holding ? */}
      <BikoMascot
        pose="question"
        width={240}
        speechBubble={choice === 'A' ? 'Mulus Sekali!' : choice === 'B' ? 'Masih Kena Batu!' : undefined}
        style={{ ...abs(840, 505) }}
      />

      {/* Bottom Prompt */}
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
            ? 'Tepat! Blok Lompat membuat Kucing Tic melompat melewati atas batu!'
            : choice === 'B'
              ? 'Kalau hanya berputar, batunya belum terlewati! Coba pilih Blok Lompat!'
              : 'Tunjuk blok yang benar di layarmu ya!'}
        </span>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Rahasia Angka: Atur Tinggi Lompatan! (Top/Bottom Comparison)
// ============================================================================
const Slide07TinggiLompatan: Page = () => {
  const [selectedHeight, setSelectedHeight] = useState<'2' | '5'>('5');

  return (
    <JuniorFrame badge="RAHASIA ANGKA AJAIB" accentDot={SKY}>
      <SlideTitle>
        Atur <Highlight>Tinggi Lompatan!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={235} width={1720} height={700} headerLabel="tinggi-lompatan.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
          {/* Top Card: Angka Kecil (2) */}
          <button
            type="button"
            className="cpj13-card-btn"
            onClick={() => setSelectedHeight('2')}
            style={{
              flex: 1,
              borderRadius: 28,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: selectedHeight === '2' ? `0 0 0 6px ${SUNNY}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${SKY}`,
              padding: '20px 36px',
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr 1fr',
              alignItems: 'center',
              gap: 24,
              textAlign: 'left',
            }}
          >
            <div style={{ ...row, gap: 20 }}>
              <ScratchJrActionBlock kind="jump" stepNum={2} scale={1.08} highlightNumber />
              <div>
                <div style={{ padding: '4px 14px', borderRadius: 99, background: SKY, color: WHITE, border: `2px solid ${CHARCOAL}`, display: 'inline-block', fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700, marginBottom: 6 }}>
                  ANGKA KECIL (2)
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
                  Lompat Pendek
                </div>
              </div>
            </div>

            <div style={{ ...row, gap: 14, fontFamily: 'var(--osd-font-display)', fontSize: 27, fontWeight: 700 }}>
              <JuniorIcon name="bunny" size={44} />
              <span>Cocok untuk batu kecil</span>
            </div>

            {/* Small Hop Scene */}
            <div style={{ height: 185, borderRadius: 22, background: WHITE, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 42, background: '#86EFAC', borderTop: `2.5px solid ${CHARCOAL}` }} />
              <div style={{ position: 'absolute', left: '50%', bottom: 18, transform: 'translateX(-50%)' }}>
                <RockBoulderSvg size={54} />
              </div>
              <div style={{ position: 'absolute', left: '50%', bottom: 72, transform: 'translateX(-50%)' }}>
                <TicCatSvg size={88} waving />
              </div>
            </div>
          </button>

          {/* Bottom Card: Angka Besar (5) */}
          <button
            type="button"
            className="cpj13-card-btn"
            onClick={() => setSelectedHeight('5')}
            style={{
              flex: 1,
              borderRadius: 28,
              background: TEAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: selectedHeight === '5' ? `0 0 0 6px ${SUNNY}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${TEAL}`,
              padding: '20px 36px',
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr 1fr',
              alignItems: 'center',
              gap: 24,
              textAlign: 'left',
            }}
          >
            <div style={{ ...row, gap: 20 }}>
              <ScratchJrActionBlock kind="jump" stepNum={5} scale={1.08} highlightNumber />
              <div>
                <div style={{ padding: '4px 14px', borderRadius: 99, background: TEAL, color: WHITE, border: `2px solid ${CHARCOAL}`, display: 'inline-block', fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700, marginBottom: 6 }}>
                  ANGKA BESAR (5)
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
                  Lompat Tinggi!
                </div>
              </div>
            </div>

            <div style={{ ...row, gap: 14, fontFamily: 'var(--osd-font-display)', fontSize: 27, fontWeight: 700 }}>
              <JuniorIcon name="rocket" size={44} />
              <span>Bisa lewati batu besar!</span>
            </div>

            {/* High Smooth Leap Over Big Boulder */}
            <div style={{ height: 185, borderRadius: 22, background: WHITE, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 42, background: '#4ADE80', borderTop: `2.5px solid ${CHARCOAL}` }} />
              <svg width="100%" height="100%" viewBox="0 0 260 185" style={{ position: 'absolute', inset: 0 }}>
                <path d="M40 140 Q130 12 220 140" fill="none" stroke={SUNNY} strokeWidth={5} strokeDasharray="8 8" />
              </svg>
              <div style={{ position: 'absolute', left: '50%', bottom: 14, transform: 'translateX(-50%)' }}>
                <RockBoulderSvg size={78} />
              </div>
              <div style={{ position: 'absolute', left: '50%', top: 10, transform: 'translateX(-50%)' }}>
                <TicCatSvg size={88} waving />
              </div>
            </div>
          </button>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Melewati Rintangan (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsAksi: Page = () => (
  <JuniorFrame badge="TIPS JAGOAN AKSI" accentDot={TEAL}>
    <SlideTitle>
      Rahasia Mulus <Highlight>Lewati Batu!</Highlight>
    </SlideTitle>

    {/* Left Column — BOLEH / BERHASIL */}
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
          <span>BOLEH (MULUS!)</span>
        </div>
        <JuniorIcon name="thumbs-up" size={46} />
      </div>

      {/* High Safe Jump Illustration */}
      <div
        style={{
          height: 250,
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 55, background: '#86EFAC', borderTop: `3px solid ${CHARCOAL}` }} />
        <svg width="100%" height="100%" viewBox="0 0 740 250" style={{ position: 'absolute', inset: 0 }}>
          <path d="M160 190 Q370 10 580 190" fill="none" stroke={TEAL} strokeWidth={7} strokeDasharray="12 10" />
        </svg>
        <div style={{ position: 'absolute', left: '50%', bottom: 20, transform: 'translateX(-50%)' }}>
          <RockBoulderSvg size={95} />
        </div>
        <div style={{ position: 'absolute', left: '50%', top: 14, transform: 'translateX(-50%)' }}>
          <TicCatSvg size={115} waving />
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
          <JuniorIcon name="rock" size={34} />
          <span>
            <strong>Tambah Batu</strong> di panggung dulu
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
          <JuniorIcon name="jump" size={34} />
          <span>
            Atur angka <strong>Lompat Cukup Tinggi</strong>
          </span>
        </div>
      </div>
    </div>

    {/* Right Column — JANGAN / KENA BATU */}
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
          <span>JANGAN (KENA BATU!)</span>
        </div>
        <JuniorIcon name="warning" size={46} />
      </div>

      {/* Low Jump Touching Rock Illustration */}
      <div
        style={{
          height: 250,
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 55, background: '#FED7AA', borderTop: `3px solid ${CHARCOAL}` }} />
        <div style={{ position: 'absolute', left: '54%', bottom: 20, transform: 'translateX(-50%)' }}>
          <RockBoulderSvg size={105} />
        </div>
        <div style={{ position: 'absolute', left: '38%', bottom: 32, transform: 'translateX(-50%)' }}>
          <TicCatSvg size={115} confused />
        </div>
        <div style={{ position: 'absolute', left: '47%', top: 70 }}>
          <JuniorIcon name="warning" size={40} />
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
            Lompat <strong>Terlalu Pendek</strong> kena batu
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
            Blok gerakan <strong>Terpisah</strong> tidak menyatu
          </span>
        </div>
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Lewati Batu Rintangan!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  // phase 0: start; 1: walk close to rock; 2: jump high over rock; 3: land across & spin!
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  const stopTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => () => stopTimer(), []);

  const handlePlay = () => {
    stopTimer();
    setPhase(0);
    setPlaying(true);
    let step = 0;
    timerRef.current = window.setInterval(() => {
      step += 1;
      if (step > 3) {
        stopTimer();
        setPlaying(false);
        return;
      }
      setPhase(step as 1 | 2 | 3);
    }, 650);
  };

  const catLeft = phase === 0 ? 110 : phase === 1 ? 330 : phase === 2 ? 560 : 810;
  const catBottom = phase === 2 ? 175 : 44;

  const stepCards = [
    { num: '1', color: SKY, soft: SKY_SOFT, icon: 'rock' as JuniorIconName, label: 'Klik + dan tambah karakter Batu' },
    { num: '2', color: SUNNY, soft: SUNNY_SOFT, icon: 'puzzle' as JuniorIconName, label: 'Rangkai Jalan + Lompat + Berputar' },
    { num: '3', color: TEAL, soft: TEAL_SOFT, icon: 'flag' as JuniorIconName, label: 'Klik Bendera Hijau! Lihat aksinya!' },
  ];

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle top={120}>
        Misi <Highlight>Lompati Batu &amp; Berputar!</Highlight>
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
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                {sc.label}
              </span>
            </div>
            {idx < 2 && <JuniorIcon name="arrow-right" size={30} />}
          </Fragment>
        ))}
      </div>

      {/* Interactive ScratchJr Stage */}
      <MacWindowCard left={X0} top={322} width={1320} height={635} headerLabel="misi-lompati-batu.app" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
          <div
            style={{
              flex: 1,
              borderRadius: 22,
              border: `3.5px solid ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <PlaygroundBackdropSvg width="100%" height="100%" />

            <button
              type="button"
              className="cpj13-card-btn"
              onClick={handlePlay}
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
              <span>{playing ? 'Beraksi...' : 'Klik Bendera Hijau!'}</span>
            </button>

            {/* Rock Obstacle in Center */}
            <div style={{ position: 'absolute', left: 555, bottom: 26, zIndex: 2 }}>
              <RockBoulderSvg size={115} />
            </div>

            {/* Animated Kucing Tic */}
            <div
              style={{
                position: 'absolute',
                left: catLeft,
                bottom: catBottom,
                transition: 'left 450ms cubic-bezier(0.22, 1, 0.36, 1), bottom 360ms cubic-bezier(0.22, 1, 0.36, 1)',
                zIndex: 3,
              }}
            >
              <TicCatSvg size={145} waving={phase === 3} spinDeg={phase === 3 ? 360 : 0} />
            </div>
          </div>

          {/* Code Bar: [Flag] + [Maju 2] + [Lompat 5] + [Berputar 12] */}
          <div
            style={{
              height: 158,
              borderRadius: 22,
              background: '#F8FAFC',
              border: `3px solid ${CHARCOAL}`,
              padding: '0 26px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 0 }}>
              <ScratchJrActionBlock kind="green-flag" scale={0.86} />
              <div style={{ marginLeft: -10, outline: phase === 1 ? `4px solid ${SUNNY}` : 'none', borderRadius: 16 }}>
                <ScratchJrActionBlock kind="move-right" stepNum={2} scale={0.86} />
              </div>
              <div style={{ marginLeft: -10, outline: phase === 2 ? `4px solid ${SUNNY}` : 'none', borderRadius: 16 }}>
                <ScratchJrActionBlock kind="jump" stepNum={5} scale={0.86} />
              </div>
              <div style={{ marginLeft: -10, outline: phase === 3 ? `4px solid ${TEAL}` : 'none', borderRadius: 16 }}>
                <ScratchJrActionBlock kind="turn-right" stepNum={12} scale={0.86} />
              </div>
            </div>

            <div
              style={{
                padding: '12px 22px',
                borderRadius: 18,
                background: phase === 3 ? TEAL_SOFT : SUNNY_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {phase === 0 && 'Siap di Panggung!'}
              {phase === 1 && '1. Maju ke dekat Batu!'}
              {phase === 2 && '2. Lompat tinggi lewati Batu!'}
              {phase === 3 && '3. Berputar Gembira! Berhasil!'}
            </div>
          </div>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="thumbs-up"
        width={345}
        badgeIcon={<JuniorIcon name="jump" size={24} />}
        speechBubble="Hap! Lompat!"
        style={{ ...abs(1470, 425) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 13 (Celebration Center Card)
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
            animation: live ? `cpj13-confetti ${2.4 + idx * 0.3}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={124} size={58}>
        <span style={{ ...row, justifyContent: 'center', gap: 14 }}>
          <span>Hebat! Kamu</span>
          <Highlight>Jagoan Akrobat!</Highlight>
          <JuniorIcon name="party" size={52} />
        </span>
      </SlideTitle>

      {/* Center Celebration Card */}
      <MacWindowCard left={190} top={240} width={1140} height={685} headerLabel="lencana-akrobat-13.app" padding={34}>
        <div
          style={{
            height: '100%',
            ...centerCol,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          {/* Large Gold Medal featuring Kucing Tic Leaping over Star Boulder */}
          <div style={{ animation: live ? 'cpj13-float 3s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 260 260" fill="none">
              <path d="M84 14 L112 96 H148 L176 14 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
              <path d="M104 14 L130 90 L156 14" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="130" cy="150" r="92" fill={SUNNY} stroke={CHARCOAL} strokeWidth={6} />
              <circle cx="130" cy="150" r="74" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={4} />
              {/* Jump Arc + Star Rock inside Medal */}
              <path d="M82 170 Q130 98 178 170" fill="none" stroke={TEAL} strokeWidth={6} strokeDasharray="8 6" />
              <path d="M102 192 L106 168 L124 156 L146 160 L158 178 L154 192 Z" fill="#94A3B8" stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
              {/* Star Cat Emblem Jumping at Apex */}
              <circle cx="130" cy="126" r="18" fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.2} />
              <path d="M114 116 L112 102 L124 110 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
              <path d="M146 116 L148 102 L136 110 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
              <circle cx="124" cy="124" r="2.5" fill={CHARCOAL} />
              <circle cx="136" cy="124" r="2.5" fill={CHARCOAL} />
              <path d="M125 131 Q130 135 135 131" stroke={CHARCOAL} strokeWidth={2.5} strokeLinecap="round" />
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
            <span>Lencana Jagoan Lompat &amp; Berputar</span>
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
            Kamu sudah mahir menggabungkan{' '}
            <Highlight color="#D1FAE5">Jalan, Lompat, &amp; Berputar!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="jump" size={22} />}
            speechBubble="Akrobat Hebat!"
          />
          <div style={{ animation: live ? 'cpj13-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 13 — Awas Ada Batu!
Hari ini Kucing Tic harus melewati batu besar di taman bermain dengan kombinasi blok Jalan, Lompat, dan Berputar!`,

  `Dua misi seru hari ini:
1. Mengenal Blok Biru baru: Lompat dan Berputar!
2. Menggabungkan blok untuk melewati batu rintangan di panggung ScratchJr!`,

  `Blok Biru Baru #1 — Blok Lompat (Jump):
Bergambar panah melengkung naik-turun. Bikin karakter melompat ke atas lalu turun lagi, pas sekali untuk melompati batu!`,

  `Blok Biru Baru #2 — Blok Berputar (Turn):
Ada Putar Kanan dan Putar Kiri. Kalau diisi angka 12, Kucing Tic akan berputar satu lingkaran penuh dengan gembira!`,

  `Jurus Kombinasi melewati rintangan:
1. Jalan mendekati batu (Maju 2). 2. Lompat melewati atas batu (Lompat 4). 3. Berputar merayakan keberhasilan (Berputar 12)!`,

  `Permainan Cepat! Kucing Tic berdiri tepat di depan batu besar:
Blok mana yang harus dipilih setelah Bendera Hijau — Pilihan A (Blok Lompat) atau Pilihan B (Blok Berputar)?`,

  `Rahasia Angka — Atur Tinggi Lompatan!
Angka kecil (2) hanya lompat pendek, sedangkan angka besar (5) bikin Kucing Tic melompat tinggi melewati batu besar dengan aman!`,

  `Tips Jagoan Aksi:
BOLEH tambahkan batu dulu di panggung dan atur angka lompat yang cukup tinggi.
JANGAN pasang angka lompat terlalu pendek sampai kena batu, atau membiarkan blok terpisah!`,

  `Waktunya praktik langsung:
1. Klik + dan tambah karakter Batu. 2. Rangkai Jalan + Lompat + Berputar. 3. Klik Bendera Hijau dan lihat aksi akrobat Kucing Tic!`,

  `Hebat sekali untuk semua Jagoan Akrobat!
Kalian resmi meraih Lencana Jagoan Lompat & Berputar di Pertemuan 13!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 13 — Awas Ada Batu!',
  createdAt: '2026-11-14T15:35:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BlokLompat,
  Slide04BlokBerputar,
  Slide05JurusKombinasi,
  Slide06AyoTebak,
  Slide07TinggiLompatan,
  Slide08TipsAksi,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

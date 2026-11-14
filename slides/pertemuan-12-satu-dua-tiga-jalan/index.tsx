import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-12-satu-dua-tiga-jalan';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj12-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj12-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-13px) scale(1.04); }
}
@keyframes cpj12-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj12-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj12-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj12-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7); }
  50% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
}
.cpj12-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj12-card-btn:hover {
  transform: translateY(-4px);
}
.cpj12-card-btn:active {
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
          animation: live ? 'cpj12-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: TEAL,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 12 • Satu, Dua, Tiga, Jalan!</span>
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
// Reusable Pertemuan 12 Visual Components (Kucing Tic, ScratchJr Blocks)
// ============================================================================

/** Official Kucing Tic character illustration (chunky cartoon style) */
const TicCatSvg = ({
  size = 140,
  waving = false,
  facingLeft = false,
  confused = false,
  style,
}: {
  size?: number;
  waving?: boolean;
  facingLeft?: boolean;
  confused?: boolean;
  style?: CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 140 140"
    fill="none"
    style={{ transform: facingLeft ? 'scaleX(-1)' : undefined, ...style }}
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
    <rect x="308" y="96" width="8" height="66" rx="3" fill={SKY} stroke={CHARCOAL} strokeWidth={2.6} />
    <path d="M294 98 H326" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
    <path d="M324 98 C346 98, 356 144, 388 152" stroke={CORAL} strokeWidth={11} strokeLinecap="round" />
    <path d="M324 98 C346 98, 356 144, 388 152" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
    <circle cx="136" cy="196" r="5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="248" cy="206" r="5" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
  </svg>
);

/**
 * Authentic ScratchJr-styled Notched Jigsaw Block SVG (Green Flag Trigger OR Blue Arrow Motion)
 */
const ScratchJrJigsawBlock = ({
  kind,
  stepNum = 1,
  scale = 1,
  highlightRightNotch = false,
  highlightNumber = false,
  onNumberClick,
  onClick,
}: {
  kind: 'green-flag' | 'move-right' | 'move-left';
  stepNum?: number;
  scale?: number;
  highlightRightNotch?: boolean;
  highlightNumber?: boolean;
  onNumberClick?: () => void;
  onClick?: () => void;
}) => {
  const isFlag = kind === 'green-flag';
  const fill = isFlag ? SUNNY : SKY;
  const width = Math.round(136 * scale);
  const height = Math.round((isFlag ? 118 : 138) * scale);

  // Classic ScratchJr notched puzzle path inside 136x118 viewBox
  const bodyPath = isFlag
    ? 'M32 10 H106 C112 10, 116 14, 116 20 V42 C126 42, 130 48, 130 57 C130 66, 126 72, 116 72 V96 C116 102, 112 106, 106 106 H32 C16 106, 8 88, 8 58 C8 28, 16 10, 32 10 Z'
    : 'M14 10 H106 C112 10, 116 14, 116 20 V42 C126 42, 130 48, 130 57 C130 66, 126 72, 116 72 V96 C116 102, 112 106, 106 106 H14 C10 106, 8 102, 8 96 V72 C18 72, 22 66, 22 57 C22 48, 18 42, 8 42 V20 C8 14, 10 10, 14 10 Z';

  return (
    <div
      onClick={onClick}
      className={onClick ? 'cpj12-card-btn' : undefined}
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
        {/* Drop shadow */}
        <path d={bodyPath} fill={CHARCOAL} transform="translate(0 5)" />
        {/* Main Block Shape */}
        <path d={bodyPath} fill={fill} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />

        {isFlag ? (
          <>
            {/* Green Flag Icon inside Yellow Block */}
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
        ) : (
          <g transform={kind === 'move-left' ? 'rotate(180 68 58)' : undefined}>
            {/* Crisp White Right/Left Arrow inside Blue Block */}
            <path
              d="M36 47 H70 V32 L100 58 L70 84 V69 H36 Z"
              fill={WHITE}
              stroke={CHARCOAL}
              strokeWidth={3.6}
              strokeLinejoin="round"
            />
          </g>
        )}

        {highlightRightNotch && (
          <circle
            cx="122"
            cy="57"
            r="16"
            fill="none"
            stroke={CORAL}
            strokeWidth={4}
            strokeDasharray="6 4"
          />
        )}
      </svg>

      {/* Bottom Step Number Box for Motion Blocks */}
      {!isFlag && (
        <button
          type="button"
          onClick={(e) => {
            if (onNumberClick) {
              e.stopPropagation();
              onNumberClick();
            }
          }}
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
            cursor: onNumberClick ? 'pointer' : 'default',
            zIndex: 2,
          }}
        >
          {stepNum}
        </button>
      )}
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Archway Stage Frame + Laptop ScratchJr + Biko)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 12" accentDot={TEAL}>
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
            background: TEAL_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#065F46',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="flag" size={22} />
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
          Satu, Dua, Tiga,
          <br />
          <Highlight>Jalan!</Highlight>
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
          Langkah Pertama Kucing Tic dengan Bendera Hijau &amp; Blok Panah
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
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="flag" size={26} />
            <span>Bendera Hijau</span>
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
            <JuniorIcon name="arrow-lr" size={28} />
            <span>Maju &amp; Mundur</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Tall Playground Archway Frame (Distinct from Round & House Covers) */}
      <div style={{ ...abs(1000, 145, 825, 810), ...centerCol }}>
        {/* Archway Frame */}
        <div
          style={{
            position: 'absolute',
            width: 670,
            height: 700,
            borderRadius: '335px 335px 44px 44px',
            background: 'linear-gradient(180deg, #DBEAFE 0%, #FEF9C3 55%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${TEAL}`,
            overflow: 'hidden',
          }}
        >
          {/* Decorative Pennant Ribbon Across Archway Top */}
          <svg width="100%" height="140" viewBox="0 0 670 140" fill="none">
            <path d="M50 72 Q335 125 620 72" stroke={CHARCOAL} strokeWidth={4} strokeDasharray="10 8" />
            <polygon points="160,82 192,89 172,120" fill={CORAL} stroke={CHARCOAL} strokeWidth={3} />
            <polygon points="315,96 355,96 335,130" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
            <polygon points="478,89 510,82 498,120" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
          </svg>
        </div>

        {/* Laptop Display showing Playground + Kucing Tic walking along Blue Arrow Code */}
        <div
          style={{
            position: 'absolute',
            right: 42,
            top: 235,
            width: 470,
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
              <span>ScratchJr — Panggung Utama</span>
            </span>
            <span
              style={{
                padding: '4px 12px',
                borderRadius: 99,
                background: TEAL_SOFT,
                border: `2px solid ${CHARCOAL}`,
                ...row,
                gap: 6,
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              <JuniorIcon name="flag" size={16} />
              <span>Mulai!</span>
            </span>
          </div>

          <div style={{ height: 200, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <PlaygroundBackdropSvg width="100%" height="100%" />
            {/* Footstep Dots */}
            <div style={{ position: 'absolute', left: 95, bottom: 26, ...row, gap: 18 }}>
              <span style={{ width: 14, height: 14, borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}` }} />
              <span style={{ width: 14, height: 14, borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}` }} />
              <span style={{ width: 14, height: 14, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}` }} />
            </div>
            <div style={{ position: 'absolute', right: 70, top: 68 }}>
              <TicCatSvg size={125} waving />
            </div>
          </div>

          {/* Mini Snapped Code Row inside Laptop */}
          <div style={{ marginTop: 12, ...row, justifyContent: 'center', gap: 2 }}>
            <ScratchJrJigsawBlock kind="green-flag" scale={0.58} />
            <ScratchJrJigsawBlock kind="move-right" stepNum={3} scale={0.58} />
          </div>
        </div>

        {/* Biko Pressing the Green Flag cheerfully */}
        <BikoMascot
          pose="point-right"
          width={325}
          badgeIcon={<JuniorIcon name="flag" size={24} />}
          speechBubble="1, 2, 3, Jalan!"
          style={{ position: 'absolute', left: 10, bottom: 48, zIndex: 4 }}
        />

        {/* Floating Step Badge */}
        <div
          style={{
            position: 'absolute',
            right: 26,
            bottom: 66,
            padding: '10px 18px',
            borderRadius: 20,
            background: SUNNY_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 5px 0 ${CHARCOAL}`,
            ...row,
            gap: 8,
            zIndex: 5,
            animation: live ? 'cpj12-float 2.8s ease-in-out infinite' : undefined,
          }}
        >
          <JuniorIcon name="footprints" size={26} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700 }}>
            Langkah Pertama!
          </span>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi Besar dalam Bingkai macOS Window)
// ============================================================================
const Slide02Misi: Page = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <JuniorFrame badge="MISI HARI INI" accentDot={SUNNY}>
      <SlideTitle>
        Apa <Highlight>Misi Kita</Highlight> Hari Ini?
      </SlideTitle>

      <MacWindowCard left={X0} top={235} width={1320} height={700} headerLabel="misi-pertemuan-12.app" padding={36}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Card 1: Bendera Hijau */}
          <button
            type="button"
            className="cpj12-card-btn"
            onClick={() => setSelected(0)}
            style={{
              borderRadius: 28,
              background: SUNNY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: selected === 0 ? `0 0 0 6px ${TEAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${SUNNY}`,
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
                background: SUNNY,
                color: CHARCOAL,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              MISI 1
            </div>

            <div style={{ ...centerCol, height: 220 }}>
              <ScratchJrJigsawBlock kind="green-flag" scale={1.45} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.28 }}>
              Kenali <Highlight color={WHITE}>Bendera Hijau</Highlight> (Tombol Mulai!)
            </div>
          </button>

          {/* Card 2: Blok Gerakan Maju & Mundur */}
          <button
            type="button"
            className="cpj12-card-btn"
            onClick={() => setSelected(1)}
            style={{
              borderRadius: 28,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: selected === 1 ? `0 0 0 6px ${TEAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${SKY}`,
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
              MISI 2
            </div>

            <div style={{ ...row, gap: 14, height: 220, alignItems: 'center' }}>
              <ScratchJrJigsawBlock kind="move-right" stepNum={3} scale={1.08} />
              <ScratchJrJigsawBlock kind="move-left" stepNum={2} scale={1.08} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.28 }}>
              Gerakkan <Highlight color={SUNNY_SOFT}>Kucing Tic</Highlight> Maju &amp; Mundur
            </div>
          </button>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="point-left"
        width={355}
        badgeIcon={<JuniorIcon name="flag" size={24} />}
        speechBubble={selected === 0 ? 'Tombol Mulai!' : 'Maju & Mundur!'}
        style={{ ...abs(1470, 390) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Rahasia Coder: Blok Kuning Bendera Hijau
// ============================================================================
const Slide03BenderaHijau: Page = () => {
  const [triggered, setTriggered] = useState(false);

  return (
    <JuniorFrame badge="BLOK AJAIB #1" accentDot={SUNNY}>
      <SlideTitle>
        Ini Namanya <Highlight>Bendera Hijau!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Giant Yellow Green-Flag Trigger Block + Biko pointing to notch */}
      <MacWindowCard left={X0} top={240} width={920} height={680} headerLabel="blok-pemicu-kuning.app" padding={34}>
        <div
          style={{
            height: '100%',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              padding: '10px 24px',
              borderRadius: 99,
              background: SUNNY_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
              ...row,
              gap: 10,
            }}
          >
            <JuniorIcon name="tap" size={24} />
            <span>Klik Blok Kuning ini!</span>
          </div>

          <div style={{ ...row, alignItems: 'center', gap: 18 }}>
            <div
              style={{
                padding: '34px 44px',
                borderRadius: 34,
                background: triggered ? TEAL_SOFT : '#F8FAFC',
                border: `4px dashed ${triggered ? TEAL : SUNNY}`,
                ...row,
                gap: 22,
              }}
            >
              <ScratchJrJigsawBlock
                kind="green-flag"
                scale={1.85}
                highlightRightNotch
                onClick={() => setTriggered((t) => !t)}
              />
              {/* Slot Preview showing where next block attaches */}
              <div
                style={{
                  width: 145,
                  height: 155,
                  borderRadius: 22,
                  border: `3.5px dashed ${SKY}`,
                  background: SKY_SOFT,
                  ...centerCol,
                  gap: 8,
                  padding: 12,
                  textAlign: 'center',
                }}
              >
                <JuniorIcon name="puzzle" size={44} />
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700, color: '#1E40AF' }}>
                  Tempel di Sini!
                </span>
              </div>
            </div>

            <BikoMascot
              pose="point-left"
              width={235}
              speechBubble={triggered ? 'Mulai!' : 'Ujung Kanan!'}
            />
          </div>

          <div
            style={{
              padding: '12px 26px',
              borderRadius: 18,
              background: triggered ? TEAL_SOFT : SUNNY_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 23,
              fontWeight: 700,
              ...row,
              gap: 10,
            }}
          >
            <JuniorIcon name={triggered ? 'play' : 'flag'} size={24} />
            <span>
              {triggered ? 'Pertunjukan Kode Dimulai!' : 'Ujung kanan blok kuning siap disambung balok biru!'}
            </span>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard left={1060} top={240} width={760} height={680} headerLabel="rahasia-bendera-hijau.app" padding={36}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 22 }}>
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
            <JuniorIcon name="flag" size={50} />
            <span>
              Tombol <strong>Mulai</strong> pertunjukan kode
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
              lineHeight: 1.32,
            }}
          >
            <JuniorIcon name="sparkle" size={50} />
            <span>
              Selalu ditaruh paling <strong>Depan!</strong>
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
              gap: 14,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 25,
              fontWeight: 700,
              color: MUTED,
            }}
          >
            <JuniorIcon name="bulb" size={30} />
            <span>Tanpa Bendera Hijau, kode tidak jalan!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Blok Gerakan Biru: Maju & Mundur
// ============================================================================
const Slide04MajuMundur: Page = () => {
  const [rightStep, setRightStep] = useState(0);
  const [leftStep, setLeftStep] = useState(0);

  return (
    <JuniorFrame badge="BLOK AJAIB #2" accentDot={SKY}>
      <SlideTitle>
        Blok Biru <Highlight>Maju &amp; Mundur</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={235} width={1720} height={700} headerLabel="blok-panah-biru.app" padding={36}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
          {/* Card 1: Panah Kanan = Jalan Maju */}
          <div
            style={{
              borderRadius: 30,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${SKY}`,
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ ...row, gap: 18 }}>
              <ScratchJrJigsawBlock kind="move-right" stepNum={1} scale={1.18} />
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: 99,
                    background: SKY,
                    color: WHITE,
                    border: `2px solid ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  ARAH KANAN
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700 }}>
                  Panah Kanan = <Highlight color={WHITE}>Jalan Maju</Highlight>
                </div>
              </div>
            </div>

            {/* Interactive Track for Kucing Tic stepping Forward */}
            <div
              style={{
                width: '100%',
                height: 220,
                borderRadius: 24,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                position: 'relative',
                overflow: 'hidden',
                padding: '16px 24px',
              }}
            >
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, background: '#86EFAC', borderTop: `3px solid ${CHARCOAL}` }} />
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: 85 + i * 165,
                    bottom: 18,
                    width: 44,
                    height: 26,
                    borderRadius: 99,
                    background: i <= rightStep ? SUNNY : WHITE,
                    border: `2.5px solid ${CHARCOAL}`,
                  }}
                />
              ))}
              <div
                style={{
                  position: 'absolute',
                  left: 35 + rightStep * 165,
                  bottom: 34,
                  transition: 'left 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <TicCatSvg size={145} waving={rightStep === 3} />
              </div>
            </div>

            <button
              type="button"
              className="cpj12-card-btn"
              onClick={() => setRightStep((s) => (s >= 3 ? 0 : s + 1))}
              style={{
                padding: '14px 32px',
                borderRadius: 18,
                background: SKY,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 24,
                fontWeight: 700,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="arrow-right" size={26} />
              <span>Coba Maju! (Langkah {rightStep})</span>
            </button>
          </div>

          {/* Card 2: Panah Kiri = Jalan Mundur */}
          <div
            style={{
              borderRadius: 30,
              background: TEAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${TEAL}`,
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ ...row, gap: 18 }}>
              <ScratchJrJigsawBlock kind="move-left" stepNum={1} scale={1.18} />
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: 99,
                    background: TEAL,
                    color: WHITE,
                    border: `2px solid ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  ARAH KIRI
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700 }}>
                  Panah Kiri = <Highlight color={SUNNY_SOFT}>Jalan Mundur</Highlight>
                </div>
              </div>
            </div>

            {/* Interactive Track for Kucing Tic stepping Backward */}
            <div
              style={{
                width: '100%',
                height: 220,
                borderRadius: 24,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                position: 'relative',
                overflow: 'hidden',
                padding: '16px 24px',
              }}
            >
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, background: '#86EFAC', borderTop: `3px solid ${CHARCOAL}` }} />
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: 85 + i * 165,
                    bottom: 18,
                    width: 44,
                    height: 26,
                    borderRadius: 99,
                    background: 3 - i <= leftStep ? SUNNY : WHITE,
                    border: `2.5px solid ${CHARCOAL}`,
                  }}
                />
              ))}
              <div
                style={{
                  position: 'absolute',
                  left: 530 - leftStep * 165,
                  bottom: 34,
                  transition: 'left 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <TicCatSvg size={145} facingLeft waving={leftStep === 3} />
              </div>
            </div>

            <button
              type="button"
              className="cpj12-card-btn"
              onClick={() => setLeftStep((s) => (s >= 3 ? 0 : s + 1))}
              style={{
                padding: '14px 32px',
                borderRadius: 18,
                background: TEAL,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 24,
                fontWeight: 700,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="arrow-left" size={26} />
              <span>Coba Mundur! (Langkah {leftStep})</span>
            </button>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Angka Ajaib di Bawah Blok Panah
// ============================================================================
const Slide05AngkaAjaib: Page = () => {
  const [num, setNum] = useState(3);

  return (
    <JuniorFrame badge="JURUS ANGKA AJAIB" accentDot={SKY}>
      <SlideTitle>
        Atur <Highlight>Jumlah Langkah!</Highlight>
      </SlideTitle>

      {/* Left Close-Up Block + Numpad + Mini Step Track */}
      <MacWindowCard left={X0} top={240} width={980} height={685} headerLabel="atur-angka-langkah.app" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'center' }}>
            {/* Giant Blue Arrow Block with highlighted bottom number box */}
            <div style={{ ...centerCol, gap: 14 }}>
              <ScratchJrJigsawBlock
                kind="move-right"
                stepNum={num}
                scale={1.55}
                highlightNumber
                onNumberClick={() => setNum((n) => (n >= 5 ? 1 : n + 1))}
              />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700, color: '#92400E' }}>
                Kotak Angka (Ketuk!)
              </span>
            </div>

            {/* Interactive ScratchJr Number Pad Popup */}
            <div
              style={{
                padding: '22px 24px',
                borderRadius: 26,
                background: '#F8FAFC',
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 7px 0 ${CHARCOAL}`,
                ...centerCol,
                gap: 14,
              }}
            >
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                Pilih Angka Langkah:
              </div>
              <div style={{ ...row, gap: 12 }}>
                {[1, 2, 3, 4, 5].map((n) => {
                  const active = num === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      className="cpj12-card-btn"
                      onClick={() => setNum(n)}
                      style={{
                        width: 64,
                        height: 68,
                        borderRadius: 16,
                        background: active ? SUNNY : WHITE,
                        border: `3px solid ${CHARCOAL}`,
                        boxShadow: active ? `0 0 0 4px ${SKY}` : `0 4px 0 ${CHARCOAL}`,
                        fontFamily: 'var(--osd-font-display)',
                        fontSize: 32,
                        fontWeight: 700,
                      }}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Step Ruler showing how far Kucing Tic walks for chosen number */}
          <div
            style={{
              height: 205,
              borderRadius: 24,
              background: TEAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 58, background: '#4ADE80', borderTop: `3px solid ${CHARCOAL}` }} />
            {[1, 2, 3, 4, 5].map((tile) => (
              <div
                key={tile}
                style={{
                  position: 'absolute',
                  left: 105 + tile * 125,
                  bottom: 10,
                  width: 66,
                  height: 38,
                  borderRadius: 12,
                  background: tile <= num ? SUNNY : WHITE,
                  border: `2.5px solid ${CHARCOAL}`,
                  ...centerCol,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {tile}
              </div>
            ))}
            <div
              style={{
                position: 'absolute',
                left: 85 + num * 125,
                bottom: 34,
                transition: 'left 320ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <TicCatSvg size={135} waving />
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card + Biko pointing */}
      <MacWindowCard left={1115} top={240} width={705} height={365} headerLabel="info-angka.app" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 18 }}>
          <div
            style={{
              padding: '22px 24px',
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
            <JuniorIcon name="numbers" size={44} />
            <span>
              Ketuk <strong>Angka</strong> di bawah blok panah
            </span>
          </div>

          <div
            style={{
              padding: '22px 24px',
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
            <JuniorIcon name="footprints" size={44} />
            <span>
              Pilih <strong>1, 2, atau 3</strong> langkah!
            </span>
          </div>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="point-left"
        width={295}
        badgeIcon={<JuniorIcon name="numbers" size={24} />}
        speechBubble={`Jalan ${num} Langkah!`}
        style={{ ...abs(1335, 625) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Blok Apa yang Kurang?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [choice, setChoice] = useState<'A' | 'B' | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" top={120} size={56}>
        Blok Apa yang Harus Ditaruh di <Highlight>Depan?</Highlight>
      </SlideTitle>

      {/* Top Visual Equation: [ ? ] + [ Maju 3 ] */}
      <div
        style={{
          ...abs(360, 212, 1200, 155),
          borderRadius: 28,
          background: WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 7px 0 ${CHARCOAL}`,
          ...row,
          justifyContent: 'center',
          gap: 18,
        }}
      >
        {choice === 'A' ? (
          <ScratchJrJigsawBlock kind="green-flag" scale={0.95} />
        ) : (
          <div
            style={{
              width: 132,
              height: 112,
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `4px dashed ${CORAL}`,
              ...centerCol,
            }}
          >
            <JuniorIcon name="question" size={58} />
          </div>
        )}
        <JuniorIcon name="arrow-right" size={40} />
        <ScratchJrJigsawBlock kind="move-right" stepNum={3} scale={0.95} />
      </div>

      {/* Choice Card A: Yellow Bendera Hijau (CORRECT) */}
      <button
        type="button"
        className="cpj12-card-btn"
        onClick={() => setChoice('A')}
        style={{
          ...abs(160, 395, 620, 415),
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

        <ScratchJrJigsawBlock kind="green-flag" scale={1.38} />

        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700 }}>
          Bendera Hijau
        </div>
      </button>

      {/* Choice Card B: Blue Panah Mundur (INCORRECT) */}
      <button
        key={shakeKey}
        type="button"
        className="cpj12-card-btn"
        onClick={() => {
          setChoice('B');
          setShakeKey((k) => k + 1);
        }}
        style={{
          ...abs(1140, 395, 620, 415),
          borderRadius: 34,
          background: choice === 'B' ? CORAL_SOFT : WHITE,
          border: `4px solid ${choice === 'B' ? CORAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 32,
          ...centerCol,
          justifyContent: 'space-between',
          animation: choice === 'B' ? 'cpj12-shake 380ms ease' : undefined,
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

        <ScratchJrJigsawBlock kind="move-left" stepNum={1} scale={1.25} />

        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700 }}>
          Panah Mundur
        </div>
      </button>

      {/* Center Biko holding ? */}
      <BikoMascot
        pose="question"
        width={245}
        speechBubble={choice === 'A' ? 'Tepat Sekali!' : choice === 'B' ? 'Coba Cek Lagi!' : undefined}
        style={{ ...abs(838, 495) }}
      />

      {/* Bottom Prompt */}
      <div
        style={{
          ...abs(320, 860, 1280, 90),
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
            ? 'Hebat! Bendera Hijau selalu dipasang paling depan sebagai tombol Mulai!'
            : choice === 'B'
              ? 'Panah Mundur tidak bisa memulai kode! Pilih blok yang paling depan ya!'
              : 'Tunjuk blok yang benar di layarmu ya!'}
        </span>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Ayo Rangkai Kode Pertama Kucing Tic!
// ============================================================================
const Slide07RangkaiKode: Page = () => {
  const [stageStep, setStageStep] = useState<1 | 2 | 3>(3);
  const [catWalked, setCatWalked] = useState(true);

  const steps: Array<{
    num: 1 | 2 | 3;
    color: string;
    soft: string;
    icon: JuniorIconName;
    label: string;
  }> = [
    { num: 1, color: SUNNY, soft: SUNNY_SOFT, icon: 'flag', label: 'Geser Bendera Hijau ke area kode' },
    { num: 2, color: SKY, soft: SKY_SOFT, icon: 'arrow-right', label: 'Tempel Blok Maju (3) di sebelahnya' },
    { num: 3, color: TEAL, soft: TEAL_SOFT, icon: 'tap', label: 'Klik Bendera Hijau di atas panggung!' },
  ];

  return (
    <JuniorFrame badge="CARA MAIN SCRATCHJR" accentDot={TEAL}>
      <SlideTitle>
        Rangkai <Highlight>Kode Pertama!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={235} width={1720} height={700} headerLabel="rangkai-kode-pertama.app" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
          {/* 3 Sequential Step Cards */}
          <div style={{ ...row, justifyContent: 'space-between', gap: 18 }}>
            {steps.map((s, idx) => {
              const active = stageStep === s.num;
              return (
                <Fragment key={s.num}>
                  <button
                    type="button"
                    className="cpj12-card-btn"
                    onClick={() => {
                      setStageStep(s.num);
                      if (s.num === 3) setCatWalked(true);
                      if (s.num < 3) setCatWalked(false);
                    }}
                    style={{
                      flex: 1,
                      height: 185,
                      borderRadius: 24,
                      background: s.soft,
                      border: `3.5px solid ${CHARCOAL}`,
                      boxShadow: active ? `0 0 0 6px ${SUNNY}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${s.color}`,
                      padding: '20px 24px',
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
                          fontSize: 20,
                          fontWeight: 700,
                        }}
                      >
                        Langkah {s.num}
                      </span>
                      <JuniorIcon name={s.icon} size={40} />
                    </div>
                    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 27, fontWeight: 700, lineHeight: 1.25 }}>
                      {s.label}
                    </div>
                  </button>
                  {idx < 2 && <JuniorIcon name="arrow-right" size={32} />}
                </Fragment>
              );
            })}
          </div>

          {/* Interactive Live Demo Area */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: '#F8FAFC',
              border: `3px solid ${CHARCOAL}`,
              padding: '22px 32px',
              display: 'grid',
              gridTemplateColumns: '1fr 1.15fr',
              gap: 30,
              alignItems: 'center',
            }}
          >
            {/* Left: Assembled Code Chain */}
            <div style={{ ...centerCol, gap: 16 }}>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: MUTED }}>
                Area Kode ScratchJr:
              </div>
              <div
                style={{
                  padding: '24px 34px',
                  borderRadius: 24,
                  background: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  ...row,
                  justifyContent: 'center',
                  gap: 4,
                  minHeight: 170,
                }}
              >
                <ScratchJrJigsawBlock kind="green-flag" scale={1.1} />
                {stageStep >= 2 && <ScratchJrJigsawBlock kind="move-right" stepNum={3} scale={1.1} />}
              </div>
            </div>

            {/* Right: Stage with Top Green Flag Trigger */}
            <div
              style={{
                height: '100%',
                borderRadius: 22,
                border: `3.5px solid ${CHARCOAL}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <PlaygroundBackdropSvg width="100%" height="100%" />
              {/* Top-Right Green Flag Button */}
              <button
                type="button"
                className="cpj12-card-btn"
                onClick={() => {
                  setStageStep(3);
                  setCatWalked((w) => !w);
                }}
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 16,
                  padding: '10px 20px',
                  borderRadius: 16,
                  background: WHITE,
                  border: `3px solid ${TEAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  ...row,
                  gap: 8,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 20,
                  fontWeight: 700,
                  zIndex: 3,
                }}
              >
                <JuniorIcon name="flag" size={26} />
                <span>{catWalked ? 'Ulangi!' : 'Klik Jalan!'}</span>
              </button>

              <div
                style={{
                  position: 'absolute',
                  left: catWalked ? '66%' : '22%',
                  top: '62%',
                  transform: 'translate(-50%, -50%)',
                  transition: 'left 550ms cubic-bezier(0.22, 1, 0.36, 1)',
                  zIndex: 2,
                }}
              >
                <TicCatSvg size={135} waving={catWalked} />
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan ScratchJr (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsJagoan: Page = () => (
  <JuniorFrame badge="TIPS JAGOAN" accentDot={TEAL}>
    <SlideTitle>
      Rahasia Kucing Tic <Highlight>Bisa Jalan!</Highlight>
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
          <span>BOLEH (BERHASIL!)</span>
        </div>
        <JuniorIcon name="thumbs-up" size={46} />
      </div>

      {/* Snapped Blocks Illustration + Walking Cat */}
      <div
        style={{
          padding: '22px 26px',
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
          ...row,
          justifyContent: 'space-around',
        }}
      >
        <div style={{ ...row, gap: 0 }}>
          <ScratchJrJigsawBlock kind="green-flag" scale={0.92} />
          <div style={{ marginLeft: -12 }}>
            <ScratchJrJigsawBlock kind="move-right" stepNum={3} scale={0.92} />
          </div>
        </div>
        <TicCatSvg size={125} waving />
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
          <JuniorIcon name="link" size={32} />
          <span>
            <strong>Tempel Rapat</strong> ke Bendera Hijau
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
          <JuniorIcon name="flag" size={32} />
          <span>
            Tekan Bendera Hijau <strong>Di Atas Layar</strong>
          </span>
        </div>
      </div>
    </div>

    {/* Right Column — JANGAN / GAGAL */}
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
          <span>JANGAN (DIAM SAJA!)</span>
        </div>
        <JuniorIcon name="warning" size={46} />
      </div>

      {/* Separated Blocks Illustration + Confused Cat */}
      <div
        style={{
          padding: '22px 26px',
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
          ...row,
          justifyContent: 'space-around',
        }}
      >
        <div style={{ ...row, gap: 38 }}>
          <ScratchJrJigsawBlock kind="green-flag" scale={0.85} />
          <ScratchJrJigsawBlock kind="move-right" stepNum={3} scale={0.85} />
        </div>
        <div style={{ ...row, gap: 4 }}>
          <TicCatSvg size={125} confused />
          <JuniorIcon name="question" size={32} />
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
          <JuniorIcon name="puzzle" size={32} />
          <span>
            Blok <strong>Terpisah</strong> tidak menyatu
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
          <JuniorIcon name="see-no-evil" size={32} />
          <span>
            Lupa memasang <strong>Bendera Hijau</strong>
          </span>
        </div>
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Jalan-Jalan di Taman! (3 Blok Horizontal + Live Sim)
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  // Sequence: 0 -> start (pos 1), 1 -> +1 (pos 2), 2 -> +2 (pos 3), 3 -> +3 (pos 4), 4 -> -1 (pos 3), 5 -> -2 (pos 2)
  const [seqStep, setSeqStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  const positions = [1, 2, 3, 4, 3, 2];
  const currentPos = positions[seqStep] ?? 1;
  const facingLeft = seqStep >= 4;

  const stopTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => () => stopTimer(), []);

  const handlePlay = () => {
    stopTimer();
    setSeqStep(0);
    setPlaying(true);
    let idx = 0;
    timerRef.current = window.setInterval(() => {
      idx += 1;
      if (idx >= positions.length) {
        stopTimer();
        setPlaying(false);
        return;
      }
      setSeqStep(idx);
    }, 560);
  };

  const stepCards = [
    { num: '1', color: SUNNY, soft: SUNNY_SOFT, icon: 'flag' as JuniorIconName, label: 'Pasang Bendera Hijau di awal' },
    { num: '2', color: SKY, soft: SKY_SOFT, icon: 'arrow-lr' as JuniorIconName, label: 'Sambung Maju 3 lalu Mundur 2' },
    { num: '3', color: TEAL, soft: TEAL_SOFT, icon: 'play' as JuniorIconName, label: 'Klik Bendera Hijau! Lihat Tic jalan!' },
  ];

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle top={120}>
        Misi <Highlight>Kucing Tic Jalan-Jalan!</Highlight>
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
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700 }}>
                {sc.label}
              </span>
            </div>
            {idx < 2 && <JuniorIcon name="arrow-right" size={30} />}
          </Fragment>
        ))}
      </div>

      {/* Interactive ScratchJr Stage + Code Chain */}
      <MacWindowCard left={X0} top={322} width={1320} height={635} headerLabel="misi-jalan-taman.app" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
          {/* Playground Stage */}
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

            {/* Top-Right Clickable Green Flag */}
            <button
              type="button"
              className="cpj12-card-btn"
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
              <span>{playing ? 'Berjalan...' : 'Klik Bendera Hijau!'}</span>
            </button>

            {/* Numbered Step Tiles on Grass */}
            {[1, 2, 3, 4, 5].map((tile) => (
              <div
                key={tile}
                style={{
                  position: 'absolute',
                  left: 110 + (tile - 1) * 205,
                  bottom: 18,
                  width: 94,
                  height: 44,
                  borderRadius: 14,
                  background: currentPos === tile ? SUNNY : WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  ...centerCol,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                  zIndex: 2,
                }}
              >
                {tile}
              </div>
            ))}

            {/* Animated Kucing Tic */}
            <div
              style={{
                position: 'absolute',
                left: 82 + (currentPos - 1) * 205,
                bottom: 54,
                transition: 'left 380ms cubic-bezier(0.22, 1, 0.36, 1)',
                zIndex: 2,
              }}
            >
              <TicCatSvg size={150} facingLeft={facingLeft} waving={seqStep === 5} />
            </div>
          </div>

          {/* Code Bar: [Flag] + [Right 3] + [Left 2] */}
          <div
            style={{
              height: 158,
              borderRadius: 22,
              background: '#F8FAFC',
              border: `3px solid ${CHARCOAL}`,
              padding: '0 28px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 4 }}>
              <ScratchJrJigsawBlock kind="green-flag" scale={0.9} />
              <div style={{ marginLeft: -10, outline: seqStep >= 1 && seqStep <= 3 ? `4px solid ${SUNNY}` : 'none', borderRadius: 16 }}>
                <ScratchJrJigsawBlock kind="move-right" stepNum={3} scale={0.9} />
              </div>
              <div style={{ marginLeft: -10, outline: seqStep >= 4 ? `4px solid ${TEAL}` : 'none', borderRadius: 16 }}>
                <ScratchJrJigsawBlock kind="move-left" stepNum={2} scale={0.9} />
              </div>
            </div>

            <div
              style={{
                padding: '12px 22px',
                borderRadius: 18,
                background: seqStep === 5 ? TEAL_SOFT : SUNNY_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {seqStep === 0 && 'Siap di Kotak 1!'}
              {seqStep >= 1 && seqStep <= 3 && `Maju langkah ke-${seqStep}!`}
              {seqStep >= 4 && `Mundur langkah ke-${seqStep - 3}!`}
            </div>
          </div>
        </div>
      </MacWindowCard>

      <BikoMascot
        pose="thumbs-up"
        width={345}
        badgeIcon={<JuniorIcon name="flag" size={24} />}
        speechBubble="Ayo Jalan-Jalan!"
        style={{ ...abs(1470, 425) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 12 (Celebration Center Card)
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
            animation: live ? `cpj12-confetti ${2.4 + idx * 0.3}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={124} size={58}>
        <span style={{ ...row, justifyContent: 'center', gap: 14 }}>
          <span>Hore! Kucing Tic</span>
          <Highlight>Bisa Jalan!</Highlight>
          <JuniorIcon name="party" size={52} />
        </span>
      </SlideTitle>

      {/* Center Celebration Card */}
      <MacWindowCard left={190} top={240} width={1140} height={685} headerLabel="lencana-penggerak-12.app" padding={34}>
        <div
          style={{
            height: '100%',
            ...centerCol,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          {/* Large Gold Medal featuring Waving Green Flag & Star Footprints */}
          <div style={{ animation: live ? 'cpj12-float 3s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 260 260" fill="none">
              <path d="M84 14 L112 96 H148 L176 14 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
              <path d="M104 14 L130 90 L156 14" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="130" cy="150" r="92" fill={SUNNY} stroke={CHARCOAL} strokeWidth={6} />
              <circle cx="130" cy="150" r="74" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={4} />
              {/* Waving Green Flag inside Medal */}
              <rect x="92" y="106" width="8" height="82" rx="4" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
              <circle cx="96" cy="103" r="5" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.5} />
              <path
                d="M100 110 C124 102, 146 122, 174 112 L166 152 C142 160, 122 144, 100 150 Z"
                fill={TEAL}
                stroke={CHARCOAL}
                strokeWidth={4}
                strokeLinejoin="round"
              />
              {/* Star Footprints */}
              <path d="M132 168 L136 177 L146 178 L138 184 L140 194 L132 189 L124 194 L126 184 L118 178 L128 177 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={2.4} />
              <path d="M164 162 L167 169 L174 170 L168 175 L170 182 L164 178 L158 182 L160 175 L154 170 L161 169 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={2.2} />
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
            <span>Lencana Penggerak Kucing Tic</span>
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
            Kamu sudah jago pakai{' '}
            <Highlight color="#D1FAE5">Bendera Hijau &amp; Blok Panah Maju-Mundur!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="flag" size={22} />}
            speechBubble="Hebat Sekali!"
          />
          <div style={{ animation: live ? 'cpj12-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 12 — Satu, Dua, Tiga, Jalan!
Hari ini kita akan membuat Kucing Tic benar-benar berjalan di ScratchJr memakai Bendera Hijau dan Blok Panah Biru!`,

  `Dua misi seru kita hari ini:
1. Mengenal Blok Kuning Bendera Hijau sebagai tombol Mulai.
2. Menggerakkan Kucing Tic Maju dan Mundur di taman bermain!`,

  `Rahasia Coder #1 — Blok Kuning Bendera Hijau:
Bendera Hijau selalu ditaruh paling depan! Ujung kanannya punya lekukan tempat blok lain menempel untuk memulai pertunjukan kode.`,

  `Blok Gerakan Biru:
Panah Kanan artinya Kucing Tic berjalan Maju, sedangkan Panah Kiri artinya berjalan Mundur! Coba klik tombol di slide untuk melihat langkahnya.`,

  `Angka Ajaib di bawah Blok Panah:
Ketuk angka di bawah blok biru untuk memilih jumlah langkah (1, 2, 3, 4, atau 5)! Biko mengetuk angka 3 supaya Tic berjalan 3 langkah!`,

  `Permainan Cepat! Ayo tebak blok apa yang kurang di depan [ Maju 3 ]:
Apakah Pilihan A (Bendera Hijau) atau Pilihan B (Panah Mundur)?`,

  `Ayo rangkai kode pertama Kucing Tic:
1. Geser Bendera Hijau ke area kode. 2. Tempel Blok Maju (3) tepat di sebelahnya. 3. Klik Bendera Hijau di pojok kanan atas panggung!`,

  `Tips Jagoan ScratchJr:
BOLEH menempel rapat balok ke Bendera Hijau lalu tekan Bendera Hijau di atas layar.
JANGAN membiarkan balok terpisah atau lupa memasang Bendera Hijau di depan!`,

  `Waktunya Misi Praktik: Jalan-Jalan di Taman!
1. Pasang Bendera Hijau di awal. 2. Sambung Maju 3 lalu Mundur 2. 3. Klik Bendera Hijau dan lihat Kucing Tic berjalan maju lalu mundur!`,

  `Hore! Kucing Tic sudah bisa berjalan!
Selamat untuk seluruh Jagoan Coding cilik yang berhasil meraih Lencana Penggerak Kucing Tic!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 12 — Satu, Dua, Tiga, Jalan!',
  createdAt: '2026-11-14T15:00:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BenderaHijau,
  Slide04MajuMundur,
  Slide05AngkaAjaib,
  Slide06AyoTebak,
  Slide07RangkaiKode,
  Slide08TipsJagoan,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

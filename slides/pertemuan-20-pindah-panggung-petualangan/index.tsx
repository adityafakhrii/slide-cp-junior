import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-20-pindah-panggung-petualangan';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj20-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj20-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj20-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj20-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj20-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj20-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.75); }
  50% { box-shadow: 0 0 0 14px rgba(251, 191, 36, 0); }
}
.cpj20-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj20-card-btn:hover {
  transform: translateY(-4px);
}
.cpj20-card-btn:active {
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
          animation: live ? 'cpj20-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 20 • Pindah Panggung Petualangan!</span>
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
  bgColor = SKY_SOFT,
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
// Reusable Pertemuan 20 Visuals (Home Stage, School Stage, Tic Cat, End Blocks)
// ============================================================================

const HomeStageBackdropSvg = ({
  width = '100%',
  height = '100%',
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <svg width={width} height={height} viewBox="0 0 360 220" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="360" height="220" fill="#DBEAFE" />
    <circle cx="310" cy="36" r="18" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
    <path d="M40 50 C40 42, 54 38, 60 44 C66 36, 84 40, 84 50 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.2} />
    <path d="M0 155 Q120 132 240 154 Q300 165 360 146 V220 H0 Z" fill="#4ADE80" stroke={CHARCOAL} strokeWidth={2.6} />
    {/* Cozy House */}
    <rect x="75" y="96" width="125" height="78" rx="6" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3} />
    <path d="M64 100 L138 46 L212 100 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
    <rect x="122" y="126" width="32" height="48" rx="4" fill={ORANGE} stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="88" y="114" width="22" height="22" rx="4" fill={SKY} stroke={CHARCOAL} strokeWidth={2.4} />
    <rect x="166" y="114" width="22" height="22" rx="4" fill={SKY} stroke={CHARCOAL} strokeWidth={2.4} />
    {/* Tree */}
    <rect x="275" y="114" width="16" height="52" rx="4" fill="#92400E" stroke={CHARCOAL} strokeWidth={2.5} />
    <circle cx="283" cy="96" r="28" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.8} />
  </svg>
);

const SchoolStageBackdropSvg = ({
  width = '100%',
  height = '100%',
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <svg width={width} height={height} viewBox="0 0 360 220" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="360" height="220" fill="#E0F2FE" />
    <circle cx="52" cy="36" r="18" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
    <path d="M230 46 C230 38, 244 34, 250 40 C256 32, 274 36, 274 46 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.2} />
    <path d="M0 155 Q120 135 240 154 Q300 165 360 148 V220 H0 Z" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={2.6} />
    {/* Cheerful School Building */}
    <rect x="92" y="84" width="176" height="90" rx="8" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
    <path d="M80 88 L180 34 L280 88 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
    {/* School Clock */}
    <circle cx="180" cy="64" r="14" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.6} />
    <path d="M180 56 V64 L186 67" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    {/* Main Double Door */}
    <rect x="160" y="128" width="40" height="46" rx="4" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.6} />
    <line x1="180" y1="128" x2="180" y2="174" stroke={CHARCOAL} strokeWidth={2.2} />
    {/* Classroom Windows */}
    <rect x="108" y="106" width="36" height="26" rx="4" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={2.4} />
    <rect x="216" y="106" width="36" height="26" rx="4" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={2.4} />
    {/* Flagpole */}
    <line x1="56" y1="88" x2="56" y2="174" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" />
    <polygon points="58,90 86,98 58,107" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.2} strokeLinejoin="round" />
  </svg>
);

const TicCatSvg = ({
  size = 135,
  waving = false,
  speechBubble,
}: {
  size?: number;
  waving?: boolean;
  speechBubble?: string;
}) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
    {speechBubble && (
      <div
        style={{
          marginBottom: 6,
          padding: '7px 18px',
          borderRadius: 22,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: `0 4px 0 ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 20,
          fontWeight: 700,
          color: CHARCOAL,
          whiteSpace: 'nowrap',
        }}
      >
        {speechBubble}
      </div>
    )}
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
  </div>
);

type PageBlockKind = 'start-flag' | 'move-right' | 'say' | 'go-page-2' | 'end-plain';

/** Chunky ScratchJr Block Renderer for Multi-Page Adventure */
const ScratchJrBlock = ({
  kind,
  num = 6,
  sayText = 'Sampai!',
  scale = 1,
  activeGlow = false,
}: {
  kind: PageBlockKind;
  num?: number;
  sayText?: string;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-flag';
  const isEndCap = kind === 'go-page-2' || kind === 'end-plain';
  const fill =
    kind === 'start-flag'
      ? SUNNY
      : kind === 'move-right'
        ? SKY
        : kind === 'say'
          ? LAVENDER
          : CORAL;

  const w = Math.round(134 * scale);
  const h = Math.round(118 * scale);

  // Start block has left rounded cap; End block has right rounded cap; Middle blocks have notch & tab
  const pathData = isTrigger
    ? 'M30 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H24 C14 106 8 98 8 88 V38 C8 25 18 16 30 16 Z'
    : isEndCap
      ? 'M14 16 H104 C118 16 128 26 128 40 V82 C128 96 118 106 104 106 H14 V74 C24 74 24 48 14 48 V16 Z'
      : 'M14 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H14 V74 C24 74 24 48 14 48 V16 Z';

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter: activeGlow ? 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.95))' : undefined,
        transform: activeGlow ? 'scale(1.07)' : 'scale(1)',
        transition: 'transform 180ms ease, filter 180ms ease',
      }}
    >
      <svg width={w} height={h} viewBox="0 0 140 120">
        <path d={pathData} fill={fill} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />

        {/* Yellow Start on Green Flag */}
        {kind === 'start-flag' && (
          <>
            <line x1="48" y1="30" x2="48" y2="90" stroke={CHARCOAL} strokeWidth={5.5} strokeLinecap="round" />
            <path
              d="M50 33 C68 27, 84 40, 98 35 V62 C84 68, 68 54, 50 61 Z"
              fill={TEAL}
              stroke={CHARCOAL}
              strokeWidth={3.2}
              strokeLinejoin="round"
            />
          </>
        )}

        {/* Blue Move Right */}
        {kind === 'move-right' && (
          <path
            d="M36 53 H72 V38 L104 60 L72 82 V67 H36 Z"
            fill={WHITE}
            stroke={CHARCOAL}
            strokeWidth={3.2}
            strokeLinejoin="round"
          />
        )}

        {/* Purple Say Speech Bubble */}
        {kind === 'say' && (
          <>
            <path
              d="M34 32 H104 C109 32 113 36 113 41 V71 C113 76 109 80 104 80 H64 L48 93 V80 H34 C29 80 25 76 25 71 V41 C25 36 29 32 34 32 Z"
              fill={WHITE}
              stroke={CHARCOAL}
              strokeWidth={3.2}
              strokeLinejoin="round"
            />
            <text
              x="69"
              y="62"
              textAnchor="middle"
              fill={CHARCOAL}
              fontSize={sayText.length > 6 ? '12' : '17'}
              fontWeight="800"
              fontFamily="Fredoka, sans-serif"
            >
              {sayText}
            </text>
          </>
        )}

        {/* Red Go To Page 2 */}
        {kind === 'go-page-2' && (
          <>
            <rect x="40" y="30" width="60" height="58" rx="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} />
            <rect x="46" y="36" width="48" height="22" rx="4" fill="#E0F2FE" stroke={CHARCOAL} strokeWidth={2} />
            <path d="M56 54 L70 43 L84 54" fill={SKY} stroke={CHARCOAL} strokeWidth={1.8} />
            <circle cx="88" cy="76" r="14" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
            <text
              x="88"
              y="82"
              textAnchor="middle"
              fill={CHARCOAL}
              fontSize="17"
              fontWeight="800"
              fontFamily="Fredoka, sans-serif"
            >
              2
            </text>
          </>
        )}

        {/* Red End Plain */}
        {kind === 'end-plain' && (
          <circle cx="70" cy="60" r="14" fill="rgba(255,255,255,0.28)" stroke={WHITE} strokeWidth={3.2} />
        )}
      </svg>

      {kind === 'move-right' && (
        <div
          style={{
            marginTop: Math.round(-16 * scale),
            minWidth: Math.round(48 * scale),
            height: Math.round(34 * scale),
            borderRadius: Math.round(12 * scale),
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 3px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(21 * scale),
            fontWeight: 700,
            color: CHARCOAL,
            ...centerCol,
            padding: '0 10px',
            zIndex: 2,
          }}
        >
          {num}
        </div>
      )}

      {kind === 'say' && (
        <div
          style={{
            marginTop: Math.round(-16 * scale),
            minWidth: Math.round(78 * scale),
            height: Math.round(34 * scale),
            borderRadius: Math.round(12 * scale),
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 3px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(16 * scale),
            fontWeight: 700,
            color: CHARCOAL,
            ...centerCol,
            padding: '0 10px',
            zIndex: 2,
          }}
        >
          {sayText}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Cover)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 20" accentDot={CORAL}>
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
            background: CORAL_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#991B1B',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="school" size={24} />
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
          Pindah
          <br />
          <Highlight>Panggung Petualangan!</Highlight>
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
          Perjalanan Karakterku dari Rumah ke Sekolah Antar-Halaman
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
            <JuniorIcon name="house" size={28} />
            <span>Halaman 1: Rumah</span>
          </div>
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
            <JuniorIcon name="go-page-2" size={28} />
            <span>Halaman 2: Sekolah</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Dual Connected Stage Window (Rumah -> Sekolah) + Biko */}
      <div style={{ ...abs(980, 145, 845, 810), ...centerCol }}>
        {/* Multi-Stage Backdrop Frame */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 690,
            borderRadius: '56px 200px 56px 200px',
            background: 'linear-gradient(155deg, #EFF6FF 0%, #FEF9C3 52%, #FEF2F2 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${CORAL}`,
            overflow: 'hidden',
          }}
        />

        {/* Dual Connected Stages Laptop Window */}
        <div
          style={{
            position: 'absolute',
            right: 28,
            top: 155,
            width: 550,
            borderRadius: 26,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            padding: 16,
            zIndex: 2,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700 }}>
              <JuniorIcon name="door" size={22} />
              <span>ScratchJr — Panggung 1 &rarr; 2</span>
            </span>
            <JuniorIcon name="go-page-2" size={22} />
          </div>

          <div style={{ ...row, gap: 12, alignItems: 'center' }}>
            {/* Page 1 Rumah */}
            <div style={{ flex: 1, height: 195, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
              <HomeStageBackdropSvg />
              <div style={{ position: 'absolute', left: 10, top: 10, padding: '3px 10px', borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}`, fontSize: 15, fontWeight: 800 }}>
                Hal. 1
              </div>
              <div style={{ position: 'absolute', right: 6, bottom: 8 }}>
                <TicCatSvg size={95} />
              </div>
            </div>

            <div style={{ animation: live ? 'cpj20-float 1.8s ease-in-out infinite' : undefined }}>
              <JuniorIcon name="arrow-right" size={40} />
            </div>

            {/* Page 2 Sekolah */}
            <div style={{ flex: 1, height: 195, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
              <SchoolStageBackdropSvg />
              <div style={{ position: 'absolute', left: 10, top: 10, padding: '3px 10px', borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontSize: 15, fontWeight: 800 }}>
                Hal. 2
              </div>
              <div style={{ position: 'absolute', left: 16, bottom: 8 }}>
                <TicCatSvg size={95} waving />
              </div>
            </div>
          </div>
        </div>

        {/* Biko Mascot Smiling */}
        <div
          style={{
            position: 'absolute',
            left: -8,
            bottom: 35,
            zIndex: 3,
            animation: live ? 'cpj20-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={335}
            badgeIcon={<JuniorIcon name="school" size={24} />}
            speechBubble="Berangkat yuk!"
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
    <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
      <SlideTitle>
        Apa Misi Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Pindah Panggung • Pertemuan 20"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu Misi 1 (Aksen Biru) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${SKY}`,
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

            {/* Two Page Cards: 1 (Rumah) & 2 (Sekolah) */}
            <div style={{ ...row, gap: 18 }}>
              <div
                style={{
                  width: 145,
                  height: 175,
                  borderRadius: 22,
                  background: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 6px 0 ${CHARCOAL}`,
                  ...centerCol,
                  gap: 8,
                }}
              >
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: '#1D4ED8' }}>
                  1
                </span>
                <JuniorIcon name="house" size={64} />
                <span style={{ fontSize: 18, fontWeight: 800 }}>Rumah</span>
              </div>

              <div
                style={{
                  width: 145,
                  height: 175,
                  borderRadius: 22,
                  background: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 6px 0 ${CHARCOAL}`,
                  ...centerCol,
                  gap: 8,
                }}
              >
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: '#047857' }}>
                  2
                </span>
                <JuniorIcon name="school" size={64} />
                <span style={{ fontSize: 18, fontWeight: 800 }}>Sekolah</span>
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Tambah <span style={{ color: '#1D4ED8' }}>Halaman Baru</span> di ScratchJr
            </div>
          </div>

          {/* Kartu Misi 2 (Aksen Coral) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: CORAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${CORAL}`,
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
                background: CORAL,
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
                width: 240,
                height: 185,
                borderRadius: 28,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              <ScratchJrBlock kind="go-page-2" scale={1.25} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Pindahkan Karakter{' '}
              <span style={{ color: '#B91C1C' }}>Dari Rumah ke Sekolah!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Biko Mascot excitedly pointing */}
      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj20-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="door" size={24} />}
          speechBubble="Yuk pindah!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Langkah #1: Tambah Halaman Baru!
// ============================================================================
const Slide03HalamanBaru: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="FITUR HALAMAN BARU" accentDot={SUNNY}>
      <SlideTitle>
        Tambah <Highlight>Halaman 2</Highlight> di Kanan!
      </SlideTitle>

      {/* Left Spotlight Card: Right Page Panel + Glowing + Button */}
      <MacWindowCard
        left={X0}
        top={235}
        width={860}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Panel Halaman Kanan Layar ScratchJr"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', gap: 28, alignItems: 'center' }}>
          {/* Biko pointing right toward Page Bar */}
          <div style={{ flex: 1, ...centerCol, gap: 18 }}>
            <BikoMascot
              pose="thumbs-up"
              width={260}
              badgeIcon={<JuniorIcon name="plus-circle" size={22} />}
              speechBubble="Klik tombol (+)!"
            />
            <div
              style={{
                padding: '14px 22px',
                borderRadius: 20,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 23,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              Panel halaman ada di kanan panggung!
            </div>
          </div>

          {/* Right Page Sidebar Mockup */}
          <div
            style={{
              width: 310,
              height: '100%',
              borderRadius: 24,
              background: CREAM,
              border: `3.5px solid ${CHARCOAL}`,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            {/* Halaman 1 Rumah */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 225, height: 140, borderRadius: 16, border: `3px solid ${SKY}`, overflow: 'hidden', position: 'relative' }}>
                <HomeStageBackdropSvg />
                <div style={{ position: 'absolute', left: 8, top: 8, padding: '2px 10px', borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}`, fontSize: 15, fontWeight: 800 }}>
                  1 • Rumah
                </div>
              </div>
            </div>

            {/* Glowing Plus Button */}
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: 99,
                background: SUNNY,
                border: `4px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...centerCol,
                animation: live ? 'cpj20-pulse 1.8s ease-in-out infinite' : undefined,
              }}
            >
              <JuniorIcon name="plus-circle" size={56} />
            </div>

            {/* Halaman 2 Sekolah */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 225, height: 140, borderRadius: 16, border: `3px solid ${TEAL}`, overflow: 'hidden', position: 'relative' }}>
                <SchoolStageBackdropSvg />
                <div style={{ position: 'absolute', left: 8, top: 8, padding: '2px 10px', borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontSize: 15, fontWeight: 800 }}>
                  2 • Sekolah
                </div>
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={1000}
        top={235}
        width={820}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Cara Tambah Halaman"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="plus-circle" bgColor={SUNNY_SOFT} fontSize={34}>
              Klik tombol <strong>Plus (+)</strong> di sisi kanan panggung
            </BulletRow>
            <BulletRow icon="school" bgColor={SKY_SOFT} fontSize={34}>
              Halaman 1 <strong>Rumah</strong>, Halaman 2 <strong>Sekolah!</strong>
            </BulletRow>
          </div>

          <div
            style={{
              padding: '24px 28px',
              borderRadius: 22,
              background: SUNNY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 18,
            }}
          >
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Sekarang ceritamu punya <strong>dua panggung berbeda</strong> seperti buku cerita bergambar!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Kenalan Sama Blok Merah Ajaib!
// ============================================================================
const Slide04BlokMerah: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="BLOK AJAIB BARU" accentDot={CORAL}>
      <SlideTitle>
        Ini Namanya <Highlight>Blok Merah!</Highlight>
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={860}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Kategori Merah • Akhir Cerita"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="dot-red" bgColor={CORAL_SOFT} fontSize={34}>
              Rak balok <strong>Akhir Cerita</strong>
            </BulletRow>
            <BulletRow icon="door" bgColor={SUNNY_SOFT} fontSize={34}>
              Punya blok spesial <strong>Pindah ke Halaman 2!</strong>
            </BulletRow>
          </div>

          <div
            style={{
              padding: '24px 28px',
              borderRadius: 22,
              background: CORAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 18,
            }}
          >
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Blok Merah bergambar <strong>Halaman 2</strong> baru akan muncul setelah kamu membuat Halaman 2 ya!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Card: Red Category Circle + Go To Page 2 Block + Biko */}
      <MacWindowCard
        left={1000}
        top={235}
        width={820}
        height={720}
        titleBarColor={CORAL_SOFT}
        headerLabel="Palet ScratchJr — Tombol Merah (End Blocks)"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Category Dots with Red Highlighted */}
          <div
            style={{
              padding: '16px 24px',
              borderRadius: 22,
              background: WHITE,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'space-around',
            }}
          >
            {(['dot-yellow', 'dot-blue', 'dot-purple', 'dot-green'] as JuniorIconName[]).map((d) => (
              <div key={d} style={{ opacity: 0.4 }}>
                <JuniorIcon name={d} size={40} />
              </div>
            ))}
            <div
              style={{
                padding: '8px 18px',
                borderRadius: 99,
                background: CORAL_SOFT,
                border: `3.5px solid ${CORAL}`,
                boxShadow: `0 0 0 6px rgba(244,91,73,0.22)`,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="dot-red" size={42} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: '#991B1B' }}>
                AKHIR!
              </span>
            </div>
          </div>

          {/* Big Block + Biko */}
          <div
            style={{
              flex: 1,
              marginTop: 22,
              borderRadius: 24,
              background: CREAM,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'space-around',
              padding: '0 24px',
            }}
          >
            <div style={{ ...centerCol, gap: 12 }}>
              <ScratchJrBlock kind="go-page-2" scale={1.65} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: '#991B1B' }}>
                Blok Pindah Halaman 2
              </span>
            </div>

            <div style={{ animation: live ? 'cpj20-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot
                pose="point-left"
                width={235}
                badgeIcon={<JuniorIcon name="go-page-2" size={20} />}
                speechBubble="Ini kuncinya!"
              />
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus Pindah Panggung: 3 Langkah Mudah!
// ============================================================================
const Slide05JurusPindah: Page = () => {
  return (
    <JuniorFrame badge="JURUS PINDAH PANGGUNG" accentDot={CORAL}>
      <SlideTitle>
        Cara Pindah <Highlight>Antar-Halaman!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={230}
        width={1720}
        height={735}
        titleBarColor={CREAM}
        headerLabel="Urutan Langkah Pindah Panggung"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* 3 Sequential Step Cards */}
          <div style={{ display: 'flex', gap: 28 }}>
            <div
              style={{
                flex: 1,
                borderRadius: 22,
                background: SKY_SOFT,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${SKY}`,
                padding: '22px 24px',
                ...row,
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background: SKY,
                  color: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 30,
                  fontWeight: 700,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                1
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="school" size={28} style={{ marginRight: 8 }} />
                Buat <strong>Halaman 2</strong> (Latar Sekolah) dulu
              </div>
            </div>

            <div
              style={{
                flex: 1,
                borderRadius: 22,
                background: SUNNY_SOFT,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${SUNNY}`,
                padding: '22px 24px',
                ...row,
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background: SUNNY,
                  color: CHARCOAL,
                  border: `3px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 30,
                  fontWeight: 700,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                2
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="house" size={28} style={{ marginRight: 8 }} />
                Kembali ke <strong>Halaman 1</strong> &amp; rangkai jalan
              </div>
            </div>

            <div
              style={{
                flex: 1,
                borderRadius: 22,
                background: CORAL_SOFT,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CORAL}`,
                padding: '22px 24px',
                ...row,
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background: CORAL,
                  color: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 30,
                  fontWeight: 700,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                3
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="go-page-2" size={28} style={{ marginRight: 8 }} />
                Pasang <strong>Blok Pindah Halaman 2</strong> di ujung!
              </div>
            </div>
          </div>

          {/* Code Chain Strip on Halaman 1 */}
          <div
            style={{
              height: 390,
              borderRadius: 26,
              background: WHITE,
              border: `3.5px solid ${CHARCOAL}`,
              padding: '26px 40px',
              ...centerCol,
              gap: 22,
            }}
          >
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: MUTED }}>
              Rangkaian Kode di Halaman 1 (Rumah):
            </div>

            <div style={{ ...row, alignItems: 'flex-start', gap: 0 }}>
              <ScratchJrBlock kind="start-flag" scale={1.55} />
              <div style={{ marginLeft: -22 }}>
                <ScratchJrBlock kind="move-right" num={6} scale={1.55} />
              </div>
              <div style={{ marginLeft: -22 }}>
                <ScratchJrBlock kind="go-page-2" scale={1.55} />
              </div>
            </div>

            <div
              style={{
                padding: '10px 26px',
                borderRadius: 99,
                background: TEAL_SOFT,
                border: `2.5px solid ${TEAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 23,
                fontWeight: 700,
                color: '#065F46',
              }}
            >
              Setelah Kucing Tic jalan 6 langkah ke kanan, panggung otomatis berpindah ke Halaman 2!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Blok Apa untuk Pindah Halaman?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1600} top={122} size={52}>
        Blok Mana untuk Pindah ke <Highlight>Halaman 2?</Highlight>
      </SlideTitle>

      {/* Visual Code Question Strip */}
      <div
        style={{
          ...abs(340, 212, 1240, 124),
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: `0 6px 0 ${CHARCOAL}`,
          ...row,
          justifyContent: 'center',
          gap: 18,
          padding: '0 24px',
        }}
      >
        <ScratchJrBlock kind="start-flag" scale={0.78} />
        <JuniorIcon name="arrow-right" size={32} />
        <ScratchJrBlock kind="move-right" num={6} scale={0.78} />
        <JuniorIcon name="arrow-right" size={32} />
        <div
          style={{
            width: 112,
            height: 86,
            borderRadius: 18,
            background: SUNNY_SOFT,
            border: `3.5px dashed ${CORAL}`,
            ...centerCol,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 38,
            fontWeight: 700,
            color: CORAL,
          }}
        >
          ?
        </div>
      </div>

      {/* Choice Cards */}
      <div style={{ ...abs(190, 360, 1540, 385), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Go to Page 2) */}
        <button
          type="button"
          onClick={() => setPicked('A')}
          className="cpj20-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'A' ? TEAL_SOFT : WHITE,
            border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'A' ? TEAL : CHARCOAL}`,
            padding: 26,
            ...centerCol,
            gap: 14,
            position: 'relative',
          }}
        >
          <div
            style={{
              ...abs(26, 22),
              padding: '6px 18px',
              borderRadius: 99,
              background: SUNNY_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            PILIHAN A
          </div>

          <div style={{ marginTop: 14 }}>
            <ScratchJrBlock kind="go-page-2" scale={1.4} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Pindah Halaman 2
          </div>

          {picked === 'A' && (
            <div
              style={{
                ...row,
                gap: 10,
                padding: '6px 20px',
                borderRadius: 99,
                background: TEAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              <JuniorIcon name="check" size={22} />
              <span>Benar! Ada gambar halaman angka 2!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: End Plain) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj20-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'B' ? CORAL_SOFT : WHITE,
            border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'B' ? CORAL : CHARCOAL}`,
            padding: 26,
            ...centerCol,
            gap: 14,
            position: 'relative',
            animation: picked === 'B' ? 'cpj20-shake 0.35s ease' : undefined,
          }}
        >
          <div
            style={{
              ...abs(26, 22),
              padding: '6px 18px',
              borderRadius: 99,
              background: CORAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            PILIHAN B
          </div>

          <div style={{ marginTop: 14 }}>
            <ScratchJrBlock kind="end-plain" scale={1.4} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Blok Selesai
          </div>

          {picked === 'B' && (
            <div
              style={{
                ...row,
                gap: 10,
                padding: '6px 20px',
                borderRadius: 99,
                background: CORAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              <JuniorIcon name="cross" size={22} />
              <span>Ups! Blok Selesai cuma menghentikan kode!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Center Prompt + Biko holding Question Sign */}
      <div style={{ ...abs(190, 760, 1540, 240), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj20-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={205}
            badgeIcon={<JuniorIcon name="question" size={20} />}
            speechBubble={picked === 'A' ? 'Betul!' : 'Yang mana?'}
          />
        </div>

        <div
          style={{
            padding: '20px 34px',
            borderRadius: 26,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            ...row,
            gap: 20,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: SUNNY,
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
            }}
          >
            <JuniorIcon name="question" size={36} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, color: CHARCOAL }}>
            Tunjuk blok yang benar di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Lanjutkan Cerita di Halaman 2!
// ============================================================================
const Slide07CeritaSekolah: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CERITA DI SEKOLAH" accentDot={TEAL}>
      <SlideTitle>
        Sampai di <Highlight>Sekolah!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Halaman 2 School Stage + Tic + Code */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Panggung Halaman 2 • Sekolah"
        padding={30}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* School Stage */}
          <div style={{ width: '100%', height: 340, borderRadius: 22, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <SchoolStageBackdropSvg />
            <div
              style={{
                position: 'absolute',
                left: 20,
                top: 16,
                padding: '6px 16px',
                borderRadius: 99,
                background: SUNNY,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              HALAMAN 2
            </div>
            <div
              style={{
                position: 'absolute',
                left: 225,
                bottom: 18,
                animation: live ? 'cpj20-hop 2.2s ease-in-out infinite' : undefined,
              }}
            >
              <TicCatSvg size={160} waving speechBubble="Hore, sampai sekolah!" />
            </div>
          </div>

          {/* Halaman 2 Code Strip */}
          <div
            style={{
              width: '100%',
              padding: '20px 26px',
              borderRadius: 22,
              background: CREAM,
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
              gap: 12,
            }}
          >
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: MUTED }}>
              Kode di Halaman 2:
            </div>
            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-flag" scale={1.15} />
              <div style={{ marginLeft: -14 }}>
                <ScratchJrBlock kind="move-right" num={3} scale={1.15} />
              </div>
              <div style={{ marginLeft: -14 }}>
                <ScratchJrBlock kind="say" sayText="Sampai!" scale={1.15} />
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={980}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Aksi saat Tiba di Sekolah"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="flag" bgColor={TEAL_SOFT} fontSize={34}>
              Pasang <strong>Bendera Hijau</strong> di Halaman 2
            </BulletRow>
            <BulletRow icon="say" bgColor={LAVENDER_SOFT} fontSize={34}>
              Tambah balon kata: <strong>&ldquo;Hore, sampai sekolah!&rdquo;</strong>
            </BulletRow>
          </div>

          <div
            style={{
              padding: '24px 28px',
              borderRadius: 22,
              background: TEAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 18,
            }}
          >
            <JuniorIcon name="sparkle" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Saat pindah ke Halaman 2, kode di Halaman 2 otomatis langsung berjalan melanjutkan petualangan!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Pindah Panggung (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsPindah: Page = () => {
  return (
    <JuniorFrame badge="TIPS CERITA MULTI-HALAMAN" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Perjalanan <Highlight>Mulus!</Highlight>
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
            <div
              style={{
                padding: '10px 26px',
                borderRadius: 99,
                background: TEAL,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 4px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="check" size={28} />
              <span>BOLEH</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BulletRow icon="school" bgColor={SKY_SOFT} fontSize={30}>
              Buat <strong>Halaman 2</strong> dulu agar blok merahnya muncul
            </BulletRow>
            <BulletRow icon="flag" bgColor={TEAL_SOFT} fontSize={30}>
              Mulai jalankan cerita dari <strong>Halaman 1</strong>
            </BulletRow>
          </div>

          <div
            style={{
              height: 245,
              borderRadius: 22,
              background: TEAL_SOFT,
              border: `3.5px solid ${TEAL}`,
              ...row,
              justifyContent: 'space-around',
              padding: '0 22px',
            }}
          >
            <div style={{ width: 220, height: 155, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, overflow: 'hidden', position: 'relative' }}>
              <HomeStageBackdropSvg />
              <div style={{ position: 'absolute', right: 8, bottom: 4 }}>
                <TicCatSvg size={80} />
              </div>
            </div>
            <JuniorIcon name="arrow-right" size={44} />
            <div style={{ width: 220, height: 155, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, overflow: 'hidden', position: 'relative' }}>
              <SchoolStageBackdropSvg />
              <div style={{ position: 'absolute', left: 16, bottom: 4 }}>
                <TicCatSvg size={80} waving />
              </div>
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
            <div
              style={{
                padding: '10px 26px',
                borderRadius: 99,
                background: CORAL,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 4px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="cross" size={28} />
              <span>JANGAN</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BulletRow icon="see-no-evil" bgColor={CORAL_SOFT} fontSize={30}>
              Mencari blok pindah sebelum <strong>Buat Halaman 2</strong>
            </BulletRow>
            <BulletRow icon="dot-red" bgColor={SUNNY_SOFT} fontSize={30}>
              Menaruh blok merah di <strong>Tengah</strong> urutan kode
            </BulletRow>
          </div>

          <div
            style={{
              height: 245,
              borderRadius: 22,
              background: CORAL_SOFT,
              border: `3.5px solid ${CORAL}`,
              ...row,
              justifyContent: 'space-around',
              padding: '0 22px',
            }}
          >
            <BikoMascot
              pose="thinking"
              width={175}
              badgeIcon={<JuniorIcon name="question" size={18} />}
              speechBubble="Halaman 2 mana?"
            />
            <div
              style={{
                padding: '16px 22px',
                borderRadius: 18,
                background: WHITE,
                border: `3px dashed ${CORAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 23,
                fontWeight: 700,
                color: '#991B1B',
                textAlign: 'center',
              }}
            >
              <div>Cuma ada 1 Halaman!</div>
              <div style={{ fontSize: 19, color: MUTED, marginTop: 4 }}>Tambah Halaman 2 dulu ya!</div>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Perjalanan dari Rumah ke Sekolah!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [journeyPhase, setJourneyPhase] = useState<'idle' | 'page1' | 'page2'>('idle');

  useEffect(() => {
    if (journeyPhase === 'idle') return;
    if (journeyPhase === 'page1') {
      const t = setTimeout(() => setJourneyPhase('page2'), 1200);
      return () => clearTimeout(t);
    }
    if (journeyPhase === 'page2') {
      const t = setTimeout(() => setJourneyPhase('idle'), 1600);
      return () => clearTimeout(t);
    }
  }, [journeyPhase]);

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={SKY}>
      <SlideTitle>
        Misi <Highlight>Dari Rumah ke Sekolah!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 232, W, 175), display: 'flex', gap: 28 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'house' as JuniorIconName,
            text: (
              <>
                Siapkan <strong>Halaman 1 (Rumah)</strong> &amp; <strong>Halaman 2 (Sekolah)</strong>
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'go-page-2' as JuniorIconName,
            text: (
              <>
                Sambung <strong>Maju</strong> + <strong>Blok Pindah Hal. 2</strong> di Hal. 1
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
                Klik <strong>Bendera Hijau</strong> di Hal. 1 &amp; lihat perjalanannya!
              </>
            ),
          },
        ].map((item) => (
          <div
            key={item.num}
            style={{
              flex: 1,
              borderRadius: 24,
              background: item.bg,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '20px 24px',
              ...row,
              gap: 18,
            }}
          >
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: 20,
                background: item.badgeBg,
                color: item.badgeText,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 32,
                fontWeight: 700,
                ...centerCol,
                flexShrink: 0,
              }}
            >
              {item.num}
            </div>
            <div style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.26 }}>
              <JuniorIcon name={item.icon} size={28} style={{ marginRight: 8 }} />
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Dual Stage Adventure Simulator + Cheering Biko */}
      <MacWindowCard
        left={X0}
        top={435}
        width={1260}
        height={530}
        titleBarColor={WHITE}
        headerLabel="Simulasi Perjalanan Antar-Halaman — Klik Jalankan!"
        padding={26}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 22, alignItems: 'center', flex: 1 }}>
            {/* Page 1 Rumah */}
            <div
              style={{
                flex: 1,
                height: 310,
                borderRadius: 22,
                border: `4px solid ${journeyPhase === 'page1' ? SUNNY : CHARCOAL}`,
                boxShadow: `0 6px 0 ${journeyPhase === 'page1' ? SUNNY : CHARCOAL}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <HomeStageBackdropSvg />
              <div style={{ position: 'absolute', left: 14, top: 14, padding: '5px 14px', borderRadius: 99, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
                Halaman 1 • Rumah
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: journeyPhase === 'page1' ? 275 : 55,
                  bottom: 14,
                  opacity: journeyPhase === 'page2' ? 0.25 : 1,
                  transition: 'left 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease',
                }}
              >
                <TicCatSvg size={135} speechBubble={journeyPhase === 'page1' ? 'Berangkat!' : undefined} />
              </div>
            </div>

            <div style={{ ...centerCol, gap: 6 }}>
              <JuniorIcon name="sparkle" size={34} />
              <JuniorIcon name="arrow-right" size={48} />
            </div>

            {/* Page 2 Sekolah */}
            <div
              style={{
                flex: 1,
                height: 310,
                borderRadius: 22,
                border: `4px solid ${journeyPhase === 'page2' ? TEAL : CHARCOAL}`,
                boxShadow: `0 6px 0 ${journeyPhase === 'page2' ? TEAL : CHARCOAL}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <SchoolStageBackdropSvg />
              <div style={{ position: 'absolute', left: 14, top: 14, padding: '5px 14px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
                Halaman 2 • Sekolah
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: 165,
                  bottom: 14,
                  opacity: journeyPhase === 'page1' ? 0.25 : 1,
                  transform: journeyPhase === 'page2' ? 'translateY(-10px) scale(1.06)' : undefined,
                  transition: 'all 280ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <TicCatSvg
                  size={135}
                  waving={journeyPhase === 'page2'}
                  speechBubble={journeyPhase === 'page2' ? 'Hore, sampai!' : undefined}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setJourneyPhase('page1')}
            className="cpj20-card-btn"
            style={{
              marginTop: 18,
              padding: '15px 28px',
              borderRadius: 20,
              background: TEAL,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 5px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
              ...row,
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <JuniorIcon name="flag" size={28} />
            <span>Klik Bendera Hijau di Halaman 1!</span>
          </button>
        </div>
      </MacWindowCard>

      {/* Cheering Biko on Right */}
      <div
        style={{
          ...abs(1400, 445, 430, 520),
          ...centerCol,
          animation: live ? 'cpj20-hop 2.4s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="thumbs-up"
          width={360}
          badgeIcon={<JuniorIcon name="go-page-2" size={24} />}
          speechBubble="Selamat jalan Tic!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 20 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj20-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj20-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="school" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj20-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1450} top={122} size={60}>
        Hebat! Kamu <Highlight>Sutradara Petualangan!</Highlight>{' '}
        <JuniorIcon name="party" size={52} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 20"
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
          {/* Bespoke Golden Champion Medal SVG: Dual Page Cards (1 -> 2) & School */}
          <div style={{ animation: live ? 'cpj20-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Page 1 Mini Card */}
              <rect x="64" y="80" width="44" height="58" rx="8" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} />
              <text x="86" y="102" textAnchor="middle" fill={SKY} fontSize="18" fontWeight="800" fontFamily="Fredoka, sans-serif">
                1
              </text>
              <path d="M74 122 L86 112 L98 122 V132 H74 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
              {/* Arrow */}
              <path d="M111 109 H125 M120 103 L127 109 L120 115" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
              {/* Page 2 School Card */}
              <rect x="132" y="80" width="44" height="58" rx="8" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} />
              <text x="154" y="102" textAnchor="middle" fill={TEAL} fontSize="18" fontWeight="800" fontFamily="Fredoka, sans-serif">
                2
              </text>
              <path d="M140 124 L154 113 L168 124 V132 H140 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={2} />
              {/* Star on top */}
              <path
                d="M120 50 L124 60 L135 62 L127 69 L129 80 L120 74 L111 80 L113 69 L105 62 L116 60 Z"
                fill={TEAL}
                stroke={CHARCOAL}
                strokeWidth={2}
                strokeLinejoin="round"
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
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="medal" size={34} />
            <span>Lencana Penjelajah Antar-Halaman</span>
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
            Kamu sudah jago membuat perpindahan cerita{' '}
            <Highlight color="#D1FAE5">Multi-Halaman di ScratchJr!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="go-page-2" size={22} />}
            speechBubble="Penjelajah!"
          />
          <div style={{ animation: live ? 'cpj20-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <TicCatSvg size={185} waving speechBubble="Hore!" />
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
  `Selamat datang di Pertemuan 20 — Pindah Panggung Petualangan! 🏫
Hari ini kita akan membuat cerita perjalanan Kucing Tic dari Halaman 1 (Rumah) pindah otomatis ke Halaman 2 (Sekolah)!`,

  `Dua misi seru hari ini:
1. Menambahkan Halaman Baru (Halaman 2) di ScratchJr.
2. Memindahkan karakter Kucing Tic dari Rumah ke Sekolah memakai Blok Merah!`,

  `Langkah #1 — Tambah Halaman Baru:
Ajak anak-anak mencari panel halaman di sisi kanan layar ScratchJr, lalu tekan tombol Plus (+) untuk membuat Halaman 2 berlatar Sekolah!`,

  `Kenalan sama Blok Merah Ajaib:
Klik kategori berwarna Merah (Akhir Cerita). Jika Halaman 2 sudah dibuat, di dalamnya akan muncul blok spesial bergambar miniatur Halaman 2!`,

  `Jurus Pindah Panggung 3 Langkah Mudah:
1. Buat Halaman 2 (Sekolah) dulu. 2. Kembali ke Halaman 1 & rangkai jalan. 3. Pasang Blok Merah Pindah Halaman 2 di paling ujung!`,

  `Permainan Cepat! Ayo tebak bersama:
Blok mana untuk pindah ke Halaman 2 setelah Maju 6 — Pilihan A (Pindah Halaman 2) atau Pilihan B (Blok Selesai polos)?`,

  `Lanjutkan Cerita di Halaman 2:
Buka Halaman 2 (Sekolah), lalu pasang Bendera Hijau + Maju 3 + Say "Hore, sampai sekolah!" supaya saat Tic tiba di sekolah langsung menyapa ceria!`,

  `Tips Jagoan Pindah Panggung:
BOLEH buat Halaman 2 dulu sebelum mencari blok merahnya, dan mulai cerita dari Halaman 1.
JANGAN mencari blok pindah halaman sebelum membuat Halaman 2, atau menaruh blok merah di tengah kode!`,

  `Waktunya Misi Praktik Dari Rumah ke Sekolah:
1. Siapkan Halaman 1 (Rumah) & Halaman 2 (Sekolah). 2. Sambung Maju + Blok Pindah Halaman 2. 3. Klik Bendera Hijau di Halaman 1!`,

  `Selamat untuk semua Sutradara Petualangan! 🎉
Kalian berhasil membuat cerita Multi-Halaman dan meraih Lencana Penjelajah Antar-Halaman di Pertemuan 20!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 20 — Pindah Panggung Petualangan!',
  createdAt: '2026-11-14T16:20:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03HalamanBaru,
  Slide04BlokMerah,
  Slide05JurusPindah,
  Slide06AyoTebak,
  Slide07CeritaSekolah,
  Slide08TipsPindah,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

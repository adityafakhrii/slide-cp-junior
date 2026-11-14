import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-18-ngobrol-seru-di-taman';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj18-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj18-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj18-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj18-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj18-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj18-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj18-card-btn:hover {
  transform: translateY(-4px);
}
.cpj18-card-btn:active {
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
          animation: live ? 'cpj18-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 18 • Ngobrol Seru di Taman!</span>
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
  bgColor = LAVENDER_SOFT,
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
// Reusable Pertemuan 18 Visuals (Tic, White Rabbit, Park Backdrop, Say & Wait)
// ============================================================================

const TicCatSvg = ({
  size = 135,
  waving = false,
  speechBubble,
  bubbleBg = WHITE,
}: {
  size?: number;
  waving?: boolean;
  speechBubble?: string;
  bubbleBg?: string;
}) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
    {speechBubble && (
      <div
        style={{
          marginBottom: 6,
          padding: '7px 18px',
          borderRadius: 22,
          background: bubbleBg,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: `0 4px 0 ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 21,
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

const WhiteRabbitSvg = ({
  size = 135,
  speechBubble,
  bubbleBg = SUNNY_SOFT,
}: {
  size?: number;
  speechBubble?: string;
  bubbleBg?: string;
}) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
    {speechBubble && (
      <div
        style={{
          marginBottom: 6,
          padding: '7px 18px',
          borderRadius: 22,
          background: bubbleBg,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: `0 4px 0 ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 21,
          fontWeight: 700,
          color: CHARCOAL,
          whiteSpace: 'nowrap',
        }}
      >
        {speechBubble}
      </div>
    )}
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <ellipse cx="75" cy="148" rx="40" ry="7" fill="rgba(30,30,44,0.16)" />
      <ellipse cx="54" cy="34" rx="13" ry="30" transform="rotate(-10 54 34)" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
      <ellipse cx="96" cy="34" rx="13" ry="30" transform="rotate(10 96 34)" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
      <ellipse cx="54" cy="35" rx="6.5" ry="20" transform="rotate(-10 54 35)" fill="#FBCFE8" />
      <ellipse cx="96" cy="35" rx="6.5" ry="20" transform="rotate(10 96 35)" fill="#FBCFE8" />
      <circle cx="110" cy="126" r="12" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.6} />
      <ellipse cx="75" cy="115" rx="30" ry="28" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
      <ellipse cx="75" cy="117" rx="17" ry="18" fill="#FCE7F3" />
      <ellipse cx="56" cy="141" rx="13" ry="7" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.6} />
      <ellipse cx="94" cy="141" rx="13" ry="7" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.6} />
      <ellipse cx="46" cy="108" rx="9" ry="12" transform="rotate(24 46 108)" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.6} />
      <ellipse cx="104" cy="108" rx="9" ry="12" transform="rotate(-24 104 108)" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.6} />
      <ellipse cx="75" cy="74" rx="34" ry="28" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
      <circle cx="51" cy="79" r="6" fill="#FBCFE8" />
      <circle cx="99" cy="79" r="6" fill="#FBCFE8" />
      <circle cx="62" cy="69" r="4.5" fill={CHARCOAL} />
      <circle cx="88" cy="69" r="4.5" fill={CHARCOAL} />
      <circle cx="63.5" cy="67.5" r="1.6" fill={WHITE} />
      <circle cx="89.5" cy="67.5" r="1.6" fill={WHITE} />
      <polygon points="71,76 79,76 75,81" fill={CORAL} />
      <path d="M68 83 Q75 89 82 83" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
      <path d="M44 73 H32 M44 79 H33 M106 73 H118 M106 79 H117" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
    </svg>
  </div>
);

const ParkPlaygroundSvg = ({
  width = 480,
  height = 240,
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <svg width={width} height={height} viewBox="0 0 480 240" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="480" height="240" fill="#DBEAFE" />
    <circle cx="422" cy="40" r="22" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M58 54 C58 44, 74 40, 82 48 C90 38, 112 42, 112 54 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.4} />
    <path d="M235 42 C235 34, 249 30, 255 37 C262 29, 281 32, 281 42 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.4} />
    <path d="M0 152 Q145 112 285 150 Q390 176 480 135 V240 H0 Z" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M0 180 Q180 156 340 185 Q420 198 480 174 V240 H0 Z" fill="#4ADE80" stroke={CHARCOAL} strokeWidth={2.8} />
    <rect x="44" y="96" width="20" height="72" rx="4" fill="#92400E" stroke={CHARCOAL} strokeWidth={2.8} />
    <circle cx="54" cy="76" r="36" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="395" cy="198" r="7" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="395" cy="198" r="3" fill={SUNNY} />
    <circle cx="130" cy="204" r="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
  </svg>
);

type DialogBlockKind = 'start-flag' | 'say' | 'wait';

/** Chunky ScratchJr Block Renderer (Green Flag, Purple Say, Orange Wait) */
const ScratchJrBlock = ({
  kind,
  sayText = 'Hai!',
  waitValue = 20,
  scale = 1,
  activeGlow = false,
}: {
  kind: DialogBlockKind;
  sayText?: string;
  waitValue?: number;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-flag';
  const fill = kind === 'start-flag' ? SUNNY : kind === 'say' ? LAVENDER : ORANGE;
  const w = Math.round(134 * scale);
  const h = Math.round(118 * scale);

  const pathData = isTrigger
    ? 'M30 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H24 C14 106 8 98 8 88 V38 C8 25 18 16 30 16 Z'
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

        {/* Purple Say Speech Bubble */}
        {kind === 'say' && (
          <path
            d="M34 32 H104 C109 32 113 36 113 41 V71 C113 76 109 80 104 80 H64 L48 93 V80 H34 C29 80 25 76 25 71 V41 C25 36 29 32 34 32 Z"
            fill={WHITE}
            stroke={CHARCOAL}
            strokeWidth={3.2}
            strokeLinejoin="round"
          />
        )}

        {kind === 'say' && (
          <text
            x="69"
            y="62"
            textAnchor="middle"
            fill={CHARCOAL}
            fontSize={sayText.length > 6 ? '13' : '18'}
            fontWeight="800"
            fontFamily="Fredoka, sans-serif"
          >
            {sayText}
          </text>
        )}

        {/* Orange Wait Clock */}
        {kind === 'wait' && (
          <>
            <circle cx="69" cy="57" r="24" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.4} />
            <path d="M69 40 V57 L81 63" fill="none" stroke={CHARCOAL} strokeWidth={4.2} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="69" cy="57" r="3" fill={CORAL} />
          </>
        )}
      </svg>

      {kind === 'say' && (
        <div
          style={{
            marginTop: Math.round(-16 * scale),
            minWidth: Math.round(74 * scale),
            height: Math.round(34 * scale),
            borderRadius: Math.round(12 * scale),
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 3px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(18 * scale),
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

      {kind === 'wait' && (
        <div
          style={{
            marginTop: Math.round(-16 * scale),
            minWidth: Math.round(52 * scale),
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
          {waitValue}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Hero Split + Dialog Showcase)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 18" accentDot={LAVENDER}>
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
            background: LAVENDER_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#5B21B6',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="say" size={24} />
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
          Ngobrol
          <br />
          <Highlight>Seru di Taman!</Highlight>
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
          Membuat Cerita Dialog Dua Sahabat dengan Balon Kata &amp; Jeda
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
            <JuniorIcon name="say" size={28} />
            <span>Balon Kata (Say)</span>
          </div>
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
            <JuniorIcon name="wait" size={28} />
            <span>Jeda (Wait)</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Storybook Frame + Garden Laptop Stage + Biko */}
      <div style={{ ...abs(980, 145, 845, 810), ...centerCol }}>
        {/* Storybook Rounded Backdrop */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 690,
            borderRadius: '64px 220px 64px 220px',
            background: 'linear-gradient(155deg, #F3EEFF 0%, #FEF9C3 52%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${LAVENDER}`,
            overflow: 'hidden',
          }}
        />

        {/* Floating Sparkles */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 112,
            top: 86,
            animation: live ? 'cpj18-twinkle 2.6s ease-in-out infinite' : undefined,
            zIndex: 2,
          }}
        >
          <JuniorIcon name="sparkle" size={44} />
        </div>

        {/* Laptop Window with Kucing Tic & Kelinci Chatting */}
        <div
          style={{
            position: 'absolute',
            right: 40,
            top: 180,
            width: 500,
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
              <span>ScratchJr — Cerita Taman</span>
            </span>
            <JuniorIcon name="say" size={22} />
          </div>

          <div style={{ height: 240, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <ParkPlaygroundSvg width="100%" height="100%" />
            <div style={{ position: 'absolute', left: 95, bottom: 16 }}>
              <TicCatSvg size={130} waving speechBubble="Halo!" />
            </div>
            <div style={{ position: 'absolute', right: 85, bottom: 16 }}>
              <WhiteRabbitSvg size={130} speechBubble="Hai Tic!" />
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
            animation: live ? 'cpj18-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={335}
            badgeIcon={<JuniorIcon name="say" size={24} />}
            speechBubble="Ayo bercerita!"
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
    <JuniorFrame badge="MISI HARI INI" accentDot={LAVENDER}>
      <SlideTitle>
        Apa Misi Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Cerita Dialog • Pertemuan 18"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu Misi 1 (Aksen Ungu) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: LAVENDER_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${LAVENDER}`,
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
                background: LAVENDER,
                color: WHITE,
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
                width: 235,
                height: 195,
                borderRadius: 28,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              <ScratchJrBlock kind="say" sayText="Halo!" scale={1.15} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Pasang <span style={{ color: '#6D28D9' }}>Balon Kata</span> (Say) di Karakter
            </div>
          </div>

          {/* Kartu Misi 2 (Aksen Kuning / Oranye) */}
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
                color: CHARCOAL,
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
                width: 235,
                height: 195,
                borderRadius: 28,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              <ScratchJrBlock kind="wait" waitValue={20} scale={1.15} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Atur <span style={{ color: '#B45309' }}>Jeda</span> (Wait) Biar Ngobrol{' '}
              <span style={{ color: '#047857' }}>Bergantian!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Biko pointing enthusiastically */}
      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj18-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="say" size={24} />}
          speechBubble="Seru banget!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Blok Ungu Baru: Balon Kata (Say)
// ============================================================================
const Slide03BalonKata: Page = () => {
  const greetings = ['Hai!', 'Halo!', 'Main yuk!'];
  const [idx, setIdx] = useState(0);

  return (
    <JuniorFrame badge="BLOK UNGU BARU" accentDot={LAVENDER}>
      <SlideTitle>
        Ini Namanya <Highlight>Balon Kata!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Say Block + Kucing Tic */}
      <MacWindowCard
        left={X0}
        top={235}
        width={820}
        height={720}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Blok Ungu • Balon Kata (Say)"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 28 }}>
            <ScratchJrBlock kind="say" sayText={greetings[idx]} scale={1.45} />
            <div
              style={{
                padding: '16px 26px',
                borderRadius: 22,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: '#6D28D9' }}>NAMA BLOK:</div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700 }}>
                Balon Kata (Say)
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: MUTED }}>Ketuk kotak teksnya!</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIdx((i) => (i + 1) % greetings.length)}
            className="cpj18-card-btn"
            style={{
              width: '100%',
              height: 335,
              borderRadius: 24,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
              padding: 0,
            }}
          >
            <ParkPlaygroundSvg width="100%" height="100%" />
            <div style={{ position: 'absolute', left: 265, bottom: 20 }}>
              <TicCatSvg size={185} waving speechBubble={greetings[idx]} />
            </div>
            <div
              style={{
                position: 'absolute',
                right: 22,
                bottom: 20,
                padding: '8px 16px',
                borderRadius: 99,
                background: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 19,
                fontWeight: 700,
              }}
            >
              Klik untuk ganti kata!
            </div>
          </button>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={960}
        top={235}
        width={860}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Fungsi Balon Kata"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="say" bgColor={LAVENDER_SOFT} fontSize={34}>
              Munculkan <strong>Tulisan</strong> di atas kepala karakter
            </BulletRow>
            <BulletRow icon="pencil" bgColor={SUNNY_SOFT} fontSize={34}>
              Ketuk kotak kata untuk <strong>Mengetik Sapaan!</strong>
            </BulletRow>
          </div>

          <div
            style={{
              padding: '24px 28px',
              borderRadius: 22,
              background: LAVENDER_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 18,
            }}
          >
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Tulis kata pendek seperti <strong>&ldquo;Hai!&rdquo;</strong> atau <strong>&ldquo;Apa kabar?&rdquo;</strong> supaya mudah dibaca!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Blok Oranye Baru: Jeda (Wait)
// ============================================================================
const Slide04BlokJeda: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="BLOK ORANYE BARU" accentDot={ORANGE}>
      <SlideTitle>
        Ini Namanya <Highlight>Blok Jeda!</Highlight> (Wait)
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={860}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Fungsi Blok Jeda"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="wait" bgColor={ORANGE_SOFT} fontSize={34}>
              Bikin karakter <strong>Menunggu Sebentar</strong>
            </BulletRow>
            <BulletRow icon="ear" bgColor={TEAL_SOFT} fontSize={34}>
              Supaya gantian dengar <strong>Teman Bicara!</strong>
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
              Angka <strong>20</strong> di bawah blok jam berarti menunggu sekitar <strong>2 detik</strong>!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Visual: Orange Wait Block + Biko */}
      <MacWindowCard
        left={1000}
        top={235}
        width={820}
        height={720}
        titleBarColor={ORANGE_SOFT}
        headerLabel="Blok Kontrol Oranye • Jeda (Wait)"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 30, marginTop: 10 }}>
            <div style={{ animation: live ? 'cpj18-float 3s ease-in-out infinite' : undefined }}>
              <ScratchJrBlock kind="wait" waitValue={20} scale={1.55} />
            </div>
            <div
              style={{
                padding: '16px 26px',
                borderRadius: 22,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: '#C2410C' }}>BLOK ORANYE:</div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700 }}>
                Jeda (Wait)
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: MUTED }}>Ikon Jam Waktu = Tunggu!</div>
            </div>
          </div>

          <div
            style={{
              width: '100%',
              height: 315,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF9C3 100%)',
              border: `3.5px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'center',
              gap: 32,
              padding: '0 28px',
            }}
          >
            <BikoMascot
              pose="wave"
              width={230}
              badgeIcon={<JuniorIcon name="wait" size={22} />}
              speechBubble="Tunggu giliran!"
            />
            <div
              style={{
                padding: '18px 26px',
                borderRadius: 22,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
                lineHeight: 1.35,
              }}
            >
              <div>1. Teman bicara dulu</div>
              <div style={{ color: '#C2410C' }}>2. Aku tunggu 20</div>
              <div style={{ color: '#047857' }}>3. Baru aku membalas!</div>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Rahasia Ngobrol: Jangan Tabrakan! (Top-Bottom Comparison)
// ============================================================================
const Slide05RahasiaDialog: Page = () => {
  return (
    <JuniorFrame badge="RAHASIA DIALOG SERU" accentDot={CORAL}>
      <SlideTitle>
        Ngobrol Harus <Highlight>Bergantian!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={230}
        width={1720}
        height={735}
        titleBarColor={CREAM}
        headerLabel="Perbandingan: Bicara Barengan vs Bergantian"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Kartu Atas — Bicara Barengan (CORAL) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: CORAL_SOFT,
              border: `4px solid ${CORAL}`,
              boxShadow: `0 7px 0 ${CORAL}`,
              padding: '22px 34px',
              ...row,
              justifyContent: 'space-between',
              gap: 32,
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 20px',
                  borderRadius: 99,
                  background: CORAL,
                  color: WHITE,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 25,
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                <JuniorIcon name="cross" size={26} />
                <span>Bicara Barengan</span>
              </div>
              <div style={{ ...row, gap: 16, fontSize: 32, fontWeight: 800, color: CHARCOAL }}>
                <JuniorIcon name="dizzy" size={46} />
                <span>
                  Balon kata <strong>Bertabrakan</strong> &amp; susah dibaca!
                </span>
              </div>
            </div>

            {/* Crashing Overlapping Speech Bubbles Visual */}
            <div
              style={{
                width: 620,
                height: '100%',
                borderRadius: 20,
                background: WHITE,
                border: `3px solid ${CORAL}`,
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <div style={{ position: 'absolute', left: 105, bottom: 4 }}>
                <TicCatSvg size={135} />
              </div>
              <div style={{ position: 'absolute', right: 105, bottom: 4 }}>
                <WhiteRabbitSvg size={135} />
              </div>
              {/* Crashing Overlapping Bubbles */}
              <div
                style={{
                  position: 'absolute',
                  left: 165,
                  top: 22,
                  padding: '10px 22px',
                  borderRadius: 20,
                  background: SUNNY,
                  border: `3px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 24,
                  fontWeight: 700,
                  transform: 'rotate(-8deg)',
                }}
              >
                Halo aku mau...
              </div>
              <div
                style={{
                  position: 'absolute',
                  right: 140,
                  top: 38,
                  padding: '10px 22px',
                  borderRadius: 20,
                  background: LAVENDER,
                  color: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 24,
                  fontWeight: 700,
                  transform: 'rotate(7deg)',
                }}
              >
                Hai Tic ayo main...
              </div>
            </div>
          </div>

          {/* Kartu Bawah — Bicara Bergantian (GREEN) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: TEAL_SOFT,
              border: `4px solid ${TEAL}`,
              boxShadow: `0 7px 0 ${TEAL}`,
              padding: '22px 34px',
              ...row,
              justifyContent: 'space-between',
              gap: 32,
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 20px',
                  borderRadius: 99,
                  background: TEAL,
                  color: WHITE,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 25,
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                <JuniorIcon name="check" size={26} />
                <span>Bicara Bergantian</span>
              </div>
              <div style={{ ...row, gap: 14, flexWrap: 'wrap', fontSize: 30, fontWeight: 800, color: CHARCOAL }}>
                <JuniorIcon name="say" size={34} />
                <span>Tic bicara dulu</span>
                <JuniorIcon name="arrow-right" size={28} />
                <JuniorIcon name="wait" size={34} />
                <span>Teman menunggu</span>
                <JuniorIcon name="arrow-right" size={28} />
                <JuniorIcon name="say" size={34} />
                <span>Baru membalas!</span>
              </div>
            </div>

            {/* Clean Turn-Taking Visual */}
            <div
              style={{
                width: 620,
                height: '100%',
                borderRadius: 20,
                background: WHITE,
                border: `3px solid ${TEAL}`,
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
                ...row,
                justifyContent: 'space-around',
                padding: '0 24px',
              }}
            >
              <TicCatSvg size={132} waving speechBubble="1. Halo!" bubbleBg={SUNNY_SOFT} />
              <div style={{ ...centerCol, gap: 6 }}>
                <JuniorIcon name="wait" size={44} />
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: '#C2410C' }}>
                  Jeda 20
                </span>
              </div>
              <WhiteRabbitSvg size={132} speechBubble="2. Hai Tic!" bubbleBg={TEAL_SOFT} />
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Blok Apa untuk Menunggu?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1600} top={128} size={54}>
        Blok Mana untuk <Highlight>Menunggu Giliran Bicara?</Highlight>
      </SlideTitle>

      <div style={{ ...abs(190, 255, 1540, 445), display: 'flex', gap: 56 }}>
        {/* Kartu A (Salah: Balon Kata Say) */}
        <button
          type="button"
          onClick={() => setPicked('A')}
          className="cpj18-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'A' ? CORAL_SOFT : WHITE,
            border: `4px solid ${picked === 'A' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'A' ? CORAL : CHARCOAL}`,
            padding: 32,
            ...centerCol,
            gap: 18,
            position: 'relative',
            animation: picked === 'A' ? 'cpj18-shake 0.35s ease' : undefined,
          }}
        >
          <div
            style={{
              ...abs(26, 24),
              padding: '6px 18px',
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

          <div style={{ marginTop: 18 }}>
            <ScratchJrBlock kind="say" sayText="Hai!" scale={1.55} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Balon Kata (Say)
          </div>

          {picked === 'A' && (
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
              <span>Ups! Ini untuk bicara, bukan menunggu!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Benar: Blok Jeda Wait) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj18-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'B' ? TEAL_SOFT : WHITE,
            border: `4px solid ${picked === 'B' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'B' ? TEAL : CHARCOAL}`,
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
              background: ORANGE_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            PILIHAN B
          </div>

          <div style={{ marginTop: 18 }}>
            <ScratchJrBlock kind="wait" waitValue={20} scale={1.55} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Blok Jeda (Wait)
          </div>

          {picked === 'B' && (
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
              <span>Benar! Blok Jeda bergambar jam bikin menunggu!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Center Prompt + Biko holding Question Sign */}
      <div style={{ ...abs(190, 725, 1540, 280), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj18-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={230}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'B' ? 'Pintar!' : 'Ayo tebak!'}
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
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background: SUNNY,
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
            }}
          >
            <JuniorIcon name="question" size={38} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: CHARCOAL }}>
            Tunjuk blok yang benar di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Resep Dialog Dua Sahabat!
// ============================================================================
const Slide07ResepDialog: Page = () => {
  return (
    <JuniorFrame badge="RESEP DIALOG" accentDot={TEAL}>
      <SlideTitle>
        Rangkai <Highlight>Kode Dua Sahabat!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={230}
        width={1720}
        height={735}
        titleBarColor={CREAM}
        headerLabel="Resep Kode Kucing Tic & Kelinci"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          {/* Kartu Atas — Kode Kucing Tic */}
          <div
            style={{
              height: 285,
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${SUNNY}`,
              padding: '22px 36px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 22 }}>
              <div
                style={{
                  width: 145,
                  height: 165,
                  borderRadius: 22,
                  background: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  ...centerCol,
                }}
              >
                <TicCatSvg size={120} />
              </div>
              <div>
                <div
                  style={{
                    padding: '6px 18px',
                    borderRadius: 99,
                    background: SUNNY,
                    border: `2.5px solid ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 22,
                    fontWeight: 700,
                    display: 'inline-block',
                    marginBottom: 10,
                  }}
                >
                  PEMBICARA 1
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700 }}>
                  Kode Kucing Tic
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: MUTED }}>Langsung bicara duluan!</div>
              </div>
            </div>

            <div style={{ ...row, gap: 10, paddingRight: 180 }}>
              <ScratchJrBlock kind="start-flag" scale={1.32} />
              <div style={{ marginLeft: -18 }}>
                <ScratchJrBlock kind="say" sayText="Halo!" scale={1.32} />
              </div>
            </div>
          </div>

          {/* Connecting Sync Badge & Arrow between Row 1 and Row 2 */}
          <div
            style={{
              position: 'absolute',
              right: 265,
              top: 268,
              zIndex: 5,
              padding: '10px 22px',
              borderRadius: 99,
              background: TEAL,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 5px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 23,
              fontWeight: 700,
              ...row,
              gap: 10,
            }}
          >
            <JuniorIcon name="arrow-down" size={26} />
            <span>Tunggu selesai bicara dulu!</span>
          </div>

          {/* Kartu Bawah — Kode Kelinci */}
          <div
            style={{
              height: 285,
              borderRadius: 24,
              background: LAVENDER_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${LAVENDER}`,
              padding: '22px 36px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 22 }}>
              <div
                style={{
                  width: 145,
                  height: 165,
                  borderRadius: 22,
                  background: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  ...centerCol,
                }}
              >
                <WhiteRabbitSvg size={120} />
              </div>
              <div>
                <div
                  style={{
                    padding: '6px 18px',
                    borderRadius: 99,
                    background: LAVENDER,
                    color: WHITE,
                    border: `2.5px solid ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 22,
                    fontWeight: 700,
                    display: 'inline-block',
                    marginBottom: 10,
                  }}
                >
                  PENJAWAB 2
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700 }}>
                  Kode Kelinci
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: MUTED }}>Menunggu 20, lalu membalas!</div>
              </div>
            </div>

            <div style={{ ...row, gap: 10 }}>
              <ScratchJrBlock kind="start-flag" scale={1.32} />
              <div style={{ marginLeft: -18 }}>
                <ScratchJrBlock kind="wait" waitValue={20} scale={1.32} />
              </div>
              <div style={{ marginLeft: -18 }}>
                <ScratchJrBlock kind="say" sayText="Hai Tic!" scale={1.32} />
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Cerita Dialog (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsCerita: Page = () => {
  return (
    <JuniorFrame badge="TIPS JAGOAN CERITA" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Obrolan <Highlight>Mudah Dibaca!</Highlight>
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
            <BulletRow icon="wait" bgColor={ORANGE_SOFT} fontSize={30}>
              Pasang <strong>Blok Jeda (20)</strong> pada penjawab
            </BulletRow>
            <BulletRow icon="say" bgColor={TEAL_SOFT} fontSize={30}>
              Tulis kata yang <strong>Pendek &amp; Ramah</strong>
            </BulletRow>
          </div>

          <div
            style={{
              height: 245,
              borderRadius: 22,
              border: `3.5px solid ${TEAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <ParkPlaygroundSvg width="100%" height="100%" />
            <div style={{ position: 'absolute', left: 105, bottom: 10 }}>
              <TicCatSvg size={135} waving speechBubble="Halo!" />
            </div>
            <div style={{ position: 'absolute', right: 105, bottom: 10 }}>
              <WhiteRabbitSvg size={135} speechBubble="Hai Tic!" />
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
            <BulletRow icon="speak" bgColor={CORAL_SOFT} fontSize={30}>
              Bicara <strong>Barengan</strong> tanpa jeda
            </BulletRow>
            <BulletRow icon="scroll" bgColor={SUNNY_SOFT} fontSize={30}>
              Menulis kalimat <strong>Terlalu Panjang</strong>
            </BulletRow>
          </div>

          <div
            style={{
              height: 245,
              borderRadius: 22,
              border: `3.5px solid ${CORAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <ParkPlaygroundSvg width="100%" height="100%" />
            <div style={{ position: 'absolute', left: 120, bottom: 4 }}>
              <TicCatSvg size={130} />
            </div>
            <div style={{ position: 'absolute', right: 120, bottom: 4 }}>
              <WhiteRabbitSvg size={130} />
            </div>
            {/* Giant Crowded Overlapping Text */}
            <div
              style={{
                position: 'absolute',
                left: 110,
                top: 22,
                padding: '10px 18px',
                borderRadius: 18,
                background: CORAL,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 20,
                fontWeight: 700,
                transform: 'rotate(-4deg)',
              }}
            >
              Halo hari ini cerah banget ayo kita main kejar-kejaran yuk!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Ngobrol Seru di Taman!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [step, setStep] = useState<'idle' | 'tic' | 'rabbit'>('idle');

  useEffect(() => {
    if (step === 'idle') return;
    if (step === 'tic') {
      const t = setTimeout(() => setStep('rabbit'), 1200);
      return () => clearTimeout(t);
    }
    if (step === 'rabbit') {
      const t = setTimeout(() => setStep('idle'), 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={SKY}>
      <SlideTitle>
        Misi <Highlight>Ngobrol Seru di Taman!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 232, W, 175), display: 'flex', gap: 28 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'tree' as JuniorIconName,
            text: (
              <>
                Latar <strong>Taman</strong> + <strong>2 Sahabat</strong> (Tic &amp; Kelinci)
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'say' as JuniorIconName,
            text: (
              <>
                <strong>Balon Kata</strong> di Tic &amp; <strong>Jeda + Balon Kata</strong> di Kelinci
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
                Klik <strong>Bendera Hijau!</strong> Baca ceritanya!
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

      {/* Interactive Garden Dialog Workspace + Cheering Biko */}
      <MacWindowCard
        left={X0}
        top={435}
        width={1260}
        height={530}
        titleBarColor={WHITE}
        headerLabel="Simulasi Cerita Taman — Klik Bendera Hijau!"
        padding={26}
      >
        <div style={{ display: 'flex', gap: 28, height: '100%', alignItems: 'center' }}>
          {/* Playground Stage */}
          <div
            style={{
              width: 590,
              height: 410,
              borderRadius: 22,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <ParkPlaygroundSvg width="100%" height="100%" />

            <div style={{ position: 'absolute', left: 82, bottom: 20 }}>
              <TicCatSvg
                size={165}
                waving
                speechBubble={step === 'tic' ? 'Halo, apa kabar?' : undefined}
              />
            </div>

            <div style={{ position: 'absolute', right: 82, bottom: 20 }}>
              <WhiteRabbitSvg
                size={165}
                speechBubble={
                  step === 'rabbit'
                    ? 'Baik! Main yuk!'
                    : step === 'tic'
                      ? '...tunggu...'
                      : undefined
                }
                bubbleBg={step === 'tic' ? ORANGE_SOFT : SUNNY_SOFT}
              />
            </div>
          </div>

          {/* Dialog Code Summary & Green Flag Run Button */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                padding: '12px 18px',
                borderRadius: 18,
                background: SUNNY_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="cat" size={30} />
              <ScratchJrBlock kind="start-flag" scale={0.78} activeGlow={step === 'tic'} />
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind="say" sayText="Halo!" scale={0.78} activeGlow={step === 'tic'} />
              </div>
            </div>

            <div
              style={{
                padding: '12px 18px',
                borderRadius: 18,
                background: LAVENDER_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="bunny" size={30} />
              <ScratchJrBlock kind="start-flag" scale={0.78} activeGlow={step === 'tic' || step === 'rabbit'} />
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind="wait" waitValue={20} scale={0.78} activeGlow={step === 'tic'} />
              </div>
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind="say" sayText="Hai Tic!" scale={0.78} activeGlow={step === 'rabbit'} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep('tic')}
              className="cpj18-card-btn"
              style={{
                padding: '15px 24px',
                borderRadius: 20,
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
              <JuniorIcon name="flag" size={28} />
              <span>Jalankan Cerita Taman!</span>
            </button>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko on Right */}
      <div
        style={{
          ...abs(1400, 445, 430, 520),
          ...centerCol,
          animation: live ? 'cpj18-hop 2.4s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="thumbs-up"
          width={360}
          badgeIcon={<JuniorIcon name="say" size={24} />}
          speechBubble="Ayo baca!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 18 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj18-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj18-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="star-glow" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj18-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1450} top={122} size={62}>
        Hore! Kamu <Highlight>Penulis Cerita Hebat!</Highlight>{' '}
        <JuniorIcon name="party" size={54} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 18"
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
          {/* Bespoke Golden Champion Medal SVG: Two Smiling Speech Bubbles & Star Clock */}
          <div style={{ animation: live ? 'cpj18-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Left Speech Bubble */}
              <path
                d="M64 78 H114 C118 78 121 81 121 85 V107 C121 111 118 114 114 114 H86 L74 125 V114 H64 C60 114 57 111 57 107 V85 C57 81 60 78 64 78 Z"
                fill={LAVENDER}
                stroke={CHARCOAL}
                strokeWidth={3.4}
                strokeLinejoin="round"
              />
              <circle cx="80" cy="94" r="2.5" fill={WHITE} />
              <circle cx="98" cy="94" r="2.5" fill={WHITE} />
              <path d="M82 102 Q89 107 96 102" stroke={WHITE} strokeWidth={2.8} strokeLinecap="round" fill="none" />
              {/* Right Speech Bubble */}
              <path
                d="M126 94 H176 C180 94 183 97 183 101 V123 C183 127 180 130 176 130 H164 L164 141 L150 130 H126 C122 130 119 127 119 123 V101 C119 97 122 94 126 94 Z"
                fill={TEAL}
                stroke={CHARCOAL}
                strokeWidth={3.4}
                strokeLinejoin="round"
              />
              <circle cx="142" cy="110" r="2.5" fill={WHITE} />
              <circle cx="160" cy="110" r="2.5" fill={WHITE} />
              <path d="M144 118 Q151 123 158 118" stroke={WHITE} strokeWidth={2.8} strokeLinecap="round" fill="none" />
              {/* Top Star Clock */}
              <circle cx="120" cy="64" r="14" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
              <path d="M120 56 V64 L126 67" stroke={ORANGE} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
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
            <span>Lencana Sutradara Dialog Sahabat</span>
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
            <Highlight color="#D1FAE5">Balon Kata (Say) &amp; Jeda (Wait)!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="say" size={22} />}
            speechBubble="Sutradara!"
          />
          <div style={{ animation: live ? 'cpj18-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 18 — Ngobrol Seru di Taman! 💬
Hari ini kita akan membuat Kucing Tic dan Kelinci mengobrol bergantian di taman ScratchJr dengan Balon Kata dan Blok Jeda!`,

  `Dua misi seru hari ini:
1. Memasang Balon Kata (Say) di atas kepala karakter.
2. Mengatur Blok Jeda (Wait) agar dua sahabat bisa ngobrol bergantian!`,

  `Blok Ungu Baru — Balon Kata (Say):
Tunjukkan ikon gelembung percakapan ungu. Ketuk kotak teksnya untuk menuliskan sapaan ramah seperti "Hai!" atau "Halo!".`,

  `Blok Oranye Baru — Jeda (Wait):
Kenalkan kategori Oranye (Control) dan ikon Jam! Angka 20 di bawahnya menyuruh karakter menunggu sekitar 2 detik supaya teman selesai bicara dulu.`,

  `Rahasia Dialog Seru — Jangan Tabrakan!
Kalau dua karakter langsung pakai Balon Kata bersama-sama tanpa Jeda, tulisannya saling menumpuk dan susah dibaca. Harus bergantian ya!`,

  `Permainan Cepat! Ayo tebak bersama:
Blok mana untuk menunggu giliran bicara — Pilihan A (Balon Kata) atau Pilihan B (Blok Jeda bergambar jam)?`,

  `Resep Dialog Dua Sahabat:
- Kode Kucing Tic: Bendera Hijau -> Say "Halo!"
- Kode Kelinci: Bendera Hijau -> Wait 20 -> Say "Hai Tic!"`,

  `Tips Jagoan Cerita Dialog:
BOLEH pasang Blok Jeda (20) pada penjawab dan tulis kata yang pendek & ramah.
JANGAN bicara barengan tanpa jeda atau menulis kalimat terlalu panjang!`,

  `Waktunya Misi Praktik Ngobrol Seru di Taman:
1. Pasang latar Taman + Kucing Tic & Kelinci. 2. Pasang Say di Tic dan Wait + Say di Kelinci. 3. Klik Bendera Hijau dan baca ceritanya!`,

  `Selamat untuk semua Penulis Cerita Hebat! 🎉
Hari ini kalian berhasil meraih Lencana Sutradara Dialog Sahabat di Pertemuan 18!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 18 — Ngobrol Seru di Taman!',
  createdAt: '2026-11-14T16:12:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BalonKata,
  Slide04BlokJeda,
  Slide05RahasiaDialog,
  Slide06AyoTebak,
  Slide07ResepDialog,
  Slide08TipsCerita,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

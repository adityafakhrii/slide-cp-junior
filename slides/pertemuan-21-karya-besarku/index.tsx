import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-21-karya-besarku';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj21-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj21-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj21-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj21-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj21-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj21-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.85); }
  50% { box-shadow: 0 0 0 14px rgba(251, 191, 36, 0); }
}
@keyframes cpj21-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.cpj21-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj21-card-btn:hover {
  transform: translateY(-4px);
}
.cpj21-card-btn:active {
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
          animation: live ? 'cpj21-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 21 • Karya Besarku: Buku Cerita 3 Halaman!</span>
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
// Reusable Pertemuan 21 Visuals (Characters, 3 Story Stages & ScratchJr Blocks)
// ============================================================================

const TicCatSvg = ({
  size = 120,
  waving = false,
  speechBubble,
  spinning = false,
}: {
  size?: number;
  waving?: boolean;
  speechBubble?: string;
  spinning?: boolean;
}) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
    {speechBubble && (
      <div
        style={{
          marginBottom: 4,
          padding: '5px 14px',
          borderRadius: 18,
          background: WHITE,
          border: `2.5px solid ${CHARCOAL}`,
          boxShadow: `0 3px 0 ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 17,
          fontWeight: 700,
          color: CHARCOAL,
          whiteSpace: 'nowrap',
        }}
      >
        {speechBubble}
      </div>
    )}
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      style={{ animation: spinning ? 'cpj21-spin 1.1s ease-in-out' : undefined }}
    >
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

const WhiteRabbitSvg = ({ size = 110 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
    <ellipse cx="75" cy="148" rx="40" ry="7" fill="rgba(30,30,44,0.16)" />
    <ellipse cx="54" cy="34" rx="13" ry="30" transform="rotate(-10 54 34)" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="96" cy="34" rx="13" ry="30" transform="rotate(10 96 34)" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="54" cy="35" rx="6.5" ry="20" transform="rotate(-10 54 35)" fill="#FBCFE8" />
    <ellipse cx="96" cy="35" rx="6.5" ry="20" transform="rotate(10 96 35)" fill="#FBCFE8" />
    <ellipse cx="75" cy="115" rx="30" ry="28" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="75" cy="117" rx="17" ry="18" fill="#FCE7F3" />
    <ellipse cx="56" cy="141" rx="13" ry="7" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="94" cy="141" rx="13" ry="7" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="75" cy="74" rx="34" ry="28" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
    <circle cx="51" cy="79" r="6" fill="#FBCFE8" />
    <circle cx="99" cy="79" r="6" fill="#FBCFE8" />
    <circle cx="62" cy="69" r="4.5" fill={CHARCOAL} />
    <circle cx="88" cy="69" r="4.5" fill={CHARCOAL} />
    <polygon points="71,76 79,76 75,81" fill={CORAL} />
    <path d="M68 83 Q75 89 82 83" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
  </svg>
);

const HomeBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 360 220" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="360" height="220" fill="#DBEAFE" />
    <circle cx="310" cy="36" r="18" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
    <path d="M0 155 Q120 132 240 154 Q300 165 360 146 V220 H0 Z" fill="#4ADE80" stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="65" y="96" width="120" height="78" rx="6" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3} />
    <path d="M54 100 L125 48 L196 100 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
    <rect x="110" y="126" width="30" height="48" rx="4" fill={ORANGE} stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="78" y="114" width="22" height="22" rx="4" fill={SKY} stroke={CHARCOAL} strokeWidth={2.4} />
    <rect x="275" y="114" width="16" height="52" rx="4" fill="#92400E" stroke={CHARCOAL} strokeWidth={2.5} />
    <circle cx="283" cy="96" r="28" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.8} />
  </svg>
);

const ParkForestBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 360 220" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="360" height="220" fill="#E0F2FE" />
    <circle cx="54" cy="38" r="18" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
    <path d="M0 152 Q120 120 240 150 Q310 166 360 140 V220 H0 Z" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="52" y="98" width="16" height="62" rx="4" fill="#92400E" stroke={CHARCOAL} strokeWidth={2.6} />
    <circle cx="60" cy="80" r="32" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.8} />
    <rect x="278" y="90" width="18" height="68" rx="4" fill="#92400E" stroke={CHARCOAL} strokeWidth={2.6} />
    <circle cx="287" cy="72" r="34" fill="#22C55E" stroke={CHARCOAL} strokeWidth={2.8} />
    <circle cx="148" cy="190" r="5" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="212" cy="196" r="5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
  </svg>
);

const StarPartyBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 360 220" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="360" height="220" fill="#F3EEFF" />
    <path d="M0 158 Q180 132 360 158 V220 H0 Z" fill="#A7F3D0" stroke={CHARCOAL} strokeWidth={2.6} />
    {/* Festive Bunting Banner */}
    <path d="M0 24 Q90 54 180 28 Q270 54 360 24" stroke={CHARCOAL} strokeWidth={2.4} fill="none" />
    <polygon points="40,36 58,54 72,34" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
    <polygon points="108,42 124,62 140,38" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
    <polygon points="205,38 220,62 238,42" fill={SKY} stroke={CHARCOAL} strokeWidth={2} />
    <polygon points="282,34 298,54 316,36" fill={TEAL} stroke={CHARCOAL} strokeWidth={2} />
    {/* Stars */}
    <circle cx="80" cy="88" r="6" fill={SUNNY} stroke={CHARCOAL} strokeWidth={1.8} />
    <circle cx="285" cy="92" r="6" fill={CORAL} stroke={CHARCOAL} strokeWidth={1.8} />
  </svg>
);

type StoryBlockKind =
  | 'start-flag'
  | 'sound-rec-1'
  | 'move-right'
  | 'jump'
  | 'turn-right'
  | 'say'
  | 'go-page-1'
  | 'go-page-2'
  | 'go-page-3';

/** Chunky ScratchJr Block Renderer for Book Story Recipes */
const ScratchJrBlock = ({
  kind,
  num = 5,
  sayText = 'Hai!',
  scale = 1,
  activeGlow = false,
}: {
  kind: StoryBlockKind;
  num?: number;
  sayText?: string;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-flag';
  const isEndCap = kind === 'go-page-1' || kind === 'go-page-2' || kind === 'go-page-3';
  const fill =
    kind === 'start-flag'
      ? SUNNY
      : kind === 'sound-rec-1'
        ? TEAL
        : kind === 'move-right' || kind === 'jump' || kind === 'turn-right'
          ? SKY
          : kind === 'say'
            ? LAVENDER
            : CORAL;

  const w = Math.round(134 * scale);
  const h = Math.round(118 * scale);

  const pathData = isTrigger
    ? 'M30 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H24 C14 106 8 98 8 88 V38 C8 25 18 16 30 16 Z'
    : isEndCap
      ? 'M14 16 H104 C118 16 128 26 128 40 V82 C128 96 118 106 104 106 H14 V74 C24 74 24 48 14 48 V16 Z'
      : 'M14 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H14 V74 C24 74 24 48 14 48 V16 Z';

  const pageNum = kind === 'go-page-1' ? '1' : kind === 'go-page-2' ? '2' : kind === 'go-page-3' ? '3' : '';

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

        {kind === 'start-flag' && (
          <>
            <line x1="48" y1="30" x2="48" y2="90" stroke={CHARCOAL} strokeWidth={5.5} strokeLinecap="round" />
            <path d="M50 33 C68 27, 84 40, 98 35 V62 C84 68, 68 54, 50 61 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
          </>
        )}

        {kind === 'sound-rec-1' && (
          <>
            <rect x="46" y="31" width="24" height="36" rx="12" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} />
            <path d="M38 56 C38 71, 78 71, 78 56" fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
            <line x1="58" y1="68" x2="58" y2="83" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
            <circle cx="96" cy="48" r="16" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
            <text x="96" y="55" textAnchor="middle" fill={CHARCOAL} fontSize="19" fontWeight="800" fontFamily="Fredoka, sans-serif">
              1
            </text>
          </>
        )}

        {kind === 'move-right' && (
          <path d="M36 53 H72 V38 L104 60 L72 82 V67 H36 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {kind === 'jump' && (
          <path d="M38 78 C38 38, 100 38, 100 78 M89 68 L100 79 L110 66" fill="none" stroke={WHITE} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        )}

        {kind === 'turn-right' && (
          <path d="M46 66 A24 24 0 1 1 88 74 M80 62 L92 75 L76 80" fill="none" stroke={WHITE} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        )}

        {kind === 'say' && (
          <>
            <path
              d="M34 32 H104 C109 32 113 36 113 41 V71 C113 76 109 80 104 80 H64 L48 93 V80 H34 C29 80 25 76 25 71 V41 C25 36 29 32 34 32 Z"
              fill={WHITE}
              stroke={CHARCOAL}
              strokeWidth={3.2}
              strokeLinejoin="round"
            />
            <text x="69" y="61" textAnchor="middle" fill={CHARCOAL} fontSize="13" fontWeight="800" fontFamily="Fredoka, sans-serif">
              {sayText.length > 7 ? `${sayText.slice(0, 6)}..` : sayText}
            </text>
          </>
        )}

        {isEndCap && (
          <>
            <rect x="40" y="30" width="60" height="58" rx="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} />
            <rect x="46" y="36" width="48" height="22" rx="4" fill="#E0F2FE" stroke={CHARCOAL} strokeWidth={2} />
            <circle cx="88" cy="76" r="14" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
            <text x="88" y="82" textAnchor="middle" fill={CHARCOAL} fontSize="17" fontWeight="800" fontFamily="Fredoka, sans-serif">
              {pageNum}
            </text>
          </>
        )}
      </svg>

      {(kind === 'move-right' || kind === 'jump' || kind === 'turn-right') && (
        <div
          style={{
            marginTop: Math.round(-16 * scale),
            minWidth: Math.round(44 * scale),
            height: Math.round(30 * scale),
            borderRadius: Math.round(10 * scale),
            background: WHITE,
            border: `2.8px solid ${CHARCOAL}`,
            boxShadow: `0 2px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(18 * scale),
            fontWeight: 700,
            color: CHARCOAL,
            ...centerCol,
            padding: '0 8px',
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
            minWidth: Math.round(74 * scale),
            height: Math.round(30 * scale),
            borderRadius: Math.round(10 * scale),
            background: WHITE,
            border: `2.8px solid ${CHARCOAL}`,
            boxShadow: `0 2px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(14 * scale),
            fontWeight: 700,
            color: CHARCOAL,
            ...centerCol,
            padding: '0 8px',
            zIndex: 2,
          }}
        >
          {sayText}
        </div>
      )}
    </div>
  );
};

/**
 * Faithful ScratchJr Tablet Interface Component:
 * Top Toolbar (Home, Presentation Fullscreen, Grid, Landscape, ABC Text, Reset, Green Flag) +
 * Left Character List + Center Stage + Right Page Switcher (1, 2, 3) +
 * Bottom Category Palette Dots & Programming Script Workspace.
 */
const AuthenticScratchJrUI = ({
  page,
  onSelectPage,
  spotlight = 'none',
  fullscreen = false,
  onToggleFullscreen,
  showGrid = false,
  onToggleGrid,
  onRunStory,
  activeStoryStep = false,
  width = 1140,
  height = 540,
}: {
  page: 1 | 2 | 3;
  onSelectPage?: (p: 1 | 2 | 3) => void;
  spotlight?: 'none' | 'fullscreen';
  fullscreen?: boolean;
  onToggleFullscreen?: () => void;
  showGrid?: boolean;
  onToggleGrid?: () => void;
  onRunStory?: () => void;
  activeStoryStep?: boolean;
  width?: number | string;
  height?: number | string;
}) => {
  const ringStyle = (on: boolean): CSSProperties =>
    on
      ? {
          outline: `5px solid ${SUNNY}`,
          outlineOffset: 2,
          animation: 'cpj21-pulse 1.6s infinite',
        }
      : {};

  const stageTitle = page === 1 ? 'Halaman 1: Rumah' : page === 2 ? 'Halaman 2: Taman' : 'Halaman 3: Pesta Bintang';

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
        position: 'relative',
      }}
    >
      {/* Authentic ScratchJr Top Toolbar */}
      <div
        style={{
          height: 50,
          borderRadius: 14,
          background: '#DBEAFE',
          border: `2.5px solid ${CHARCOAL}`,
          padding: '0 12px',
          ...row,
          justifyContent: 'space-between',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Left: Authentic Blue Home Button */}
        <div style={{ ...row, gap: 8 }}>
          <div style={{ width: 40, height: 36, borderRadius: 10, background: '#93C5FD', border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="house" size={24} />
          </div>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 17, fontWeight: 700, color: '#1E3A8A' }}>
            ScratchJr
          </span>
        </div>

        {/* Center: Stage Header Buttons (Fullscreen, Grid, Landscape, ABC, Reset, Green Flag) */}
        <div style={{ ...row, gap: 7 }}>
          {/* Presentation Mode / Layar Penuh */}
          <button
            type="button"
            onClick={onToggleFullscreen}
            className={onToggleFullscreen ? 'cpj21-card-btn' : undefined}
            title="Layar Penuh (Presentation Mode)"
            style={{
              width: 44,
              height: 38,
              borderRadius: 10,
              background: fullscreen || spotlight === 'fullscreen' ? SUNNY : WHITE,
              border: `2.5px solid ${CHARCOAL}`,
              ...centerCol,
              padding: 0,
              ...ringStyle(spotlight === 'fullscreen'),
            }}
          >
            <JuniorIcon name="fullscreen" size={26} />
          </button>

          {/* Grid Button */}
          <button
            type="button"
            onClick={onToggleGrid}
            className={onToggleGrid ? 'cpj21-card-btn' : undefined}
            title="Grid Koordinat"
            style={{
              width: 40,
              height: 38,
              borderRadius: 10,
              background: showGrid ? SUNNY_SOFT : WHITE,
              border: `2px solid ${CHARCOAL}`,
              ...centerCol,
              padding: 0,
            }}
          >
            <JuniorIcon name="grid" size={24} />
          </button>

          {/* Change Background */}
          <div style={{ width: 40, height: 38, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="landscape" size={24} />
          </div>

          {/* ABC Text */}
          <div style={{ width: 40, height: 38, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="abc" size={24} />
          </div>

          {/* Reset Characters */}
          <div style={{ width: 40, height: 38, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="reset" size={24} />
          </div>

          {/* Green Flag */}
          <button
            type="button"
            onClick={onRunStory}
            className={onRunStory ? 'cpj21-card-btn' : undefined}
            title="Jalankan Bendera Hijau"
            style={{
              width: 48,
              height: 38,
              borderRadius: 10,
              background: TEAL_SOFT,
              border: `2.5px solid ${TEAL}`,
              ...centerCol,
              padding: 0,
            }}
          >
            <JuniorIcon name="flag" size={26} />
          </button>
        </div>

        {/* Right: Classic Yellow Project Dog-Ear Corner & Stage Label */}
        <div
          style={{
            padding: '4px 12px',
            borderRadius: 10,
            background: SUNNY,
            border: `2px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          {stageTitle}
        </div>
      </div>

      {/* Middle 3-Column Row: Characters | Center Stage | Pages */}
      <div style={{ flex: 1, display: 'flex', gap: 10, minHeight: 0 }}>
        {/* Left Character Panel (hidden in Fullscreen presentation) */}
        {!fullscreen && (
          <div
            style={{
              width: 106,
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
            <div
              style={{
                width: '100%',
                height: 70,
                borderRadius: 12,
                background: WHITE,
                border: `3px solid ${SKY}`,
                ...centerCol,
                position: 'relative',
              }}
            >
              <TicCatSvg size={50} />
              {/* Paintbrush edit badge in top-right corner like ScratchJr */}
              <div
                style={{
                  position: 'absolute',
                  right: -4,
                  top: -4,
                  width: 24,
                  height: 24,
                  borderRadius: 99,
                  background: SUNNY,
                  border: `2px solid ${CHARCOAL}`,
                  ...centerCol,
                }}
              >
                <JuniorIcon name="paintbrush" size={14} />
              </div>
            </div>
            {(page === 2 || page === 3) && (
              <div
                style={{
                  width: '100%',
                  height: 60,
                  borderRadius: 12,
                  background: WHITE,
                  border: `2px solid ${CHARCOAL}`,
                  ...centerCol,
                }}
              >
                <WhiteRabbitSvg size={46} />
              </div>
            )}
            <div style={{ marginTop: 'auto', opacity: 0.85 }}>
              <JuniorIcon name="plus-circle" size={30} />
            </div>
          </div>
        )}

        {/* Center Stage */}
        <div
          style={{
            flex: 1,
            borderRadius: 18,
            border: `3px solid ${CHARCOAL}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {page === 1 && <HomeBackdropSvg />}
          {page === 2 && <ParkForestBackdropSvg />}
          {page === 3 && <StarPartyBackdropSvg />}

          {/* Optional Coordinate Grid Overlay */}
          {showGrid && (
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(to right, rgba(30,30,44,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,30,44,0.16) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Characters on Stage */}
          <div
            style={{
              position: 'absolute',
              left: page === 1 ? (activeStoryStep ? 235 : 85) : page === 2 ? 120 : 140,
              bottom: page === 2 && activeStoryStep ? 44 : 16,
              transition: 'all 450ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <TicCatSvg
              size={fullscreen ? 140 : 108}
              waving={page === 3 || activeStoryStep}
              spinning={page === 3 && activeStoryStep}
              speechBubble={
                page === 1 && activeStoryStep
                  ? 'Halo!'
                  : page === 2
                    ? 'Ayo main!'
                    : page === 3
                      ? 'Hore, berhasil!'
                      : undefined
              }
            />
          </div>

          {(page === 2 || page === 3) && (
            <div style={{ position: 'absolute', right: 85, bottom: 16 }}>
              <WhiteRabbitSvg size={fullscreen ? 132 : 104} />
            </div>
          )}
        </div>

        {/* Right Pages Panel (hidden in Fullscreen presentation) */}
        {!fullscreen && (
          <div
            style={{
              width: 112,
              borderRadius: 16,
              background: WHITE,
              border: `2.5px solid ${CHARCOAL}`,
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              justifyContent: 'space-around',
            }}
          >
            {([1, 2, 3] as const).map((p) => {
              const active = page === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onSelectPage?.(p)}
                  className={onSelectPage ? 'cpj21-card-btn' : undefined}
                  style={{
                    height: 62,
                    borderRadius: 12,
                    border: `2.5px solid ${active ? SUNNY : CHARCOAL}`,
                    boxShadow: active ? `0 0 0 3px rgba(251,191,36,0.45)` : undefined,
                    position: 'relative',
                    overflow: 'hidden',
                    padding: 0,
                  }}
                >
                  {p === 1 && <HomeBackdropSvg />}
                  {p === 2 && <ParkForestBackdropSvg />}
                  {p === 3 && <StarPartyBackdropSvg />}
                  <span
                    style={{
                      position: 'absolute',
                      right: 4,
                      top: 4,
                      width: 22,
                      height: 22,
                      borderRadius: 99,
                      background: active ? SUNNY : WHITE,
                      border: `2px solid ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 13,
                      fontWeight: 700,
                      ...centerCol,
                    }}
                  >
                    {p}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Coding Area (hidden in Fullscreen presentation) */}
      {!fullscreen && (
        <div
          style={{
            height: 138,
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
          {/* Real ScratchJr Category Dots Shelf */}
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
              {(['dot-yellow', 'dot-blue', 'dot-purple', 'dot-green', 'wait', 'dot-red'] as JuniorIconName[]).map((d, idx) => (
                <div
                  key={d}
                  style={{
                    padding: 2,
                    borderRadius: 99,
                    border: idx === 1 ? `2px solid ${CHARCOAL}` : '2px solid transparent',
                    background: idx === 1 ? WHITE : 'transparent',
                    ...centerCol,
                  }}
                >
                  <JuniorIcon name={d} size={22} />
                </div>
              ))}
            </div>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 13, fontWeight: 700, color: MUTED }}>
              Area Susun Balok Kode — Hal. {page}
            </span>
          </div>

          {/* Programming Script Workspace */}
          <div style={{ flex: 1, padding: '6px 14px', ...row, alignItems: 'flex-start', overflow: 'hidden' }}>
            {page === 1 && (
              <>
                <ScratchJrBlock kind="start-flag" scale={0.74} />
                <div style={{ marginLeft: -12 }}>
                  <ScratchJrBlock kind="sound-rec-1" scale={0.74} />
                </div>
                <div style={{ marginLeft: -12 }}>
                  <ScratchJrBlock kind="move-right" num={5} scale={0.74} />
                </div>
                <div style={{ marginLeft: -12 }}>
                  <ScratchJrBlock kind="go-page-2" scale={0.74} />
                </div>
              </>
            )}
            {page === 2 && (
              <>
                <ScratchJrBlock kind="start-flag" scale={0.74} />
                <div style={{ marginLeft: -12 }}>
                  <ScratchJrBlock kind="say" sayText="Ayo main!" scale={0.74} />
                </div>
                <div style={{ marginLeft: -12 }}>
                  <ScratchJrBlock kind="jump" num={2} scale={0.74} />
                </div>
                <div style={{ marginLeft: -12 }}>
                  <ScratchJrBlock kind="go-page-3" scale={0.74} />
                </div>
              </>
            )}
            {page === 3 && (
              <>
                <ScratchJrBlock kind="start-flag" scale={0.74} />
                <div style={{ marginLeft: -12 }}>
                  <ScratchJrBlock kind="say" sayText="Berhasil!" scale={0.74} />
                </div>
                <div style={{ marginLeft: -12 }}>
                  <ScratchJrBlock kind="turn-right" num={12} scale={0.74} />
                </div>
              </>
            )}
          </div>
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
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 21" accentDot={SUNNY}>
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
            background: SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#92400E',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="book-open" size={24} />
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          <Highlight>Karya Besarku:</Highlight>
          <br />
          Buku Cerita <Highlight color="#D1FAE5">3 Halaman!</Highlight>
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
          Petualangan Karakterku di ScratchJr
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
            <JuniorIcon name="book-open" size={28} />
            <span>Buku 3 Halaman</span>
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
            <JuniorIcon name="puzzle" size={28} />
            <span>Semua Jurus Ajaib!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Authentic 3-Page ScratchJr Laptop + Biko Creator Badge */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        {/* Storybook Arch Frame */}
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #FEF9C3 0%, #EFF6FF 52%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SUNNY}`,
            overflow: 'hidden',
          }}
        />

        {/* Mini Authentic ScratchJr Tablet Preview showing Pages 1, 2, 3 */}
        <div style={{ position: 'absolute', right: 10, top: 145, zIndex: 2 }}>
          <AuthenticScratchJrUI page={2} width={590} height={410} />
        </div>

        {/* Biko with Star Creator Badge */}
        <div
          style={{
            position: 'absolute',
            left: -18,
            bottom: 30,
            zIndex: 3,
            animation: live ? 'cpj21-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="book-open" size={24} />}
            speechBubble="Karya Besarku!"
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
        Apa Misi Besar Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Proyek Akhir • Pertemuan 21"
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

            <div
              style={{
                width: 280,
                height: 190,
                borderRadius: 28,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...row,
                justifyContent: 'center',
                gap: 14,
              }}
            >
              <JuniorIcon name="book-open" size={76} />
              <div style={{ ...row, gap: 8 }}>
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    style={{
                      width: 40,
                      height: 48,
                      borderRadius: 10,
                      background: SUNNY_SOFT,
                      border: `2.5px solid ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 24,
                      fontWeight: 700,
                      ...centerCol,
                    }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Buat <span style={{ color: '#1D4ED8' }}>Buku Cerita</span> 3 Halaman
            </div>
          </div>

          {/* Kartu Misi 2 (Aksen Hijau) */}
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
                width: 310,
                height: 190,
                borderRadius: 28,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...row,
                justifyContent: 'center',
              }}
            >
              <ScratchJrBlock kind="move-right" num={5} scale={0.78} />
              <div style={{ marginLeft: -12 }}>
                <ScratchJrBlock kind="sound-rec-1" scale={0.78} />
              </div>
              <div style={{ marginLeft: -12 }}>
                <ScratchJrBlock kind="say" sayText="Hai!" scale={0.78} />
              </div>
              <div style={{ marginLeft: -12 }}>
                <ScratchJrBlock kind="go-page-2" scale={0.78} />
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1.24 }}>
              Gabung <span style={{ color: '#047857' }}>Gerak, Suara, Dialog &amp; Pindah Halaman!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Biko Mascot excitedly pointing */}
      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj21-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="star-glow" size={24} />}
          speechBubble="Proyek Besar!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Bekal Kreator: 4 Kekuatan Ajaib! (Grid 2x2)
// ============================================================================
const Slide03BekalKreator: Page = () => {
  const live = useIsActivePage();

  const powers = [
    {
      title: 'Gerak',
      desc: 'Jalan, Lompat, Putar',
      bg: SKY_SOFT,
      border: SKY,
      badgeBg: SKY,
      icon: 'arrow-right' as JuniorIconName,
    },
    {
      title: 'Suara',
      desc: '"Pop!" & Rekam Suara',
      bg: TEAL_SOFT,
      border: TEAL,
      badgeBg: TEAL,
      icon: 'speaker' as JuniorIconName,
    },
    {
      title: 'Dialog',
      desc: 'Balon Kata & Jeda',
      bg: LAVENDER_SOFT,
      border: LAVENDER,
      badgeBg: LAVENDER,
      icon: 'say' as JuniorIconName,
    },
    {
      title: 'Pindah Halaman',
      desc: 'Halaman 1 -> 2 -> 3',
      bg: CORAL_SOFT,
      border: CORAL,
      badgeBg: CORAL,
      icon: 'door' as JuniorIconName,
    },
  ];

  return (
    <JuniorFrame badge="BEKAL KREATOR" accentDot={TEAL}>
      <SlideTitle>
        Pakai <Highlight>4 Kekuatan</Highlight> Ajaibmu!
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="4 Kategori Blok Andalan Kita"
        padding={32}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 28, height: '100%' }}>
          {powers.map((p) => (
            <div
              key={p.title}
              style={{
                borderRadius: 24,
                background: p.bg,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 7px 0 ${p.border}`,
                padding: '24px 30px',
                ...row,
                gap: 24,
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 24,
                  background: p.badgeBg,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                <JuniorIcon name={p.icon} size={56} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 25, fontWeight: 700, color: MUTED, marginTop: 4 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </MacWindowCard>

      {/* Biko Mascot proud beside the 4 powers */}
      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj21-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="thumbs-up"
          width={385}
          badgeIcon={<JuniorIcon name="puzzle" size={24} />}
          speechBubble="Semua bisa!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Peta Buku Cerita 3 Halaman (1 -> 2 -> 3)
// ============================================================================
const Slide04PetaCerita: Page = () => {
  const pages = [
    {
      num: 'Halaman 1',
      label: 'Awal:',
      desc: 'Karakter menyapa & berangkat',
      bg: SKY_SOFT,
      badgeBg: SKY,
      badgeText: WHITE,
      icon: 'house' as JuniorIconName,
    },
    {
      num: 'Halaman 2',
      label: 'Tengah:',
      desc: 'Ketemu teman & ngobrol seru',
      bg: SUNNY_SOFT,
      badgeBg: SUNNY,
      badgeText: CHARCOAL,
      icon: 'tree' as JuniorIconName,
    },
    {
      num: 'Halaman 3',
      label: 'Akhir:',
      desc: 'Sampai tujuan & pesta gembira!',
      bg: TEAL_SOFT,
      badgeBg: TEAL,
      badgeText: WHITE,
      icon: 'party' as JuniorIconName,
    },
  ];

  return (
    <JuniorFrame badge="RENCANA CERITA" accentDot={SKY}>
      <SlideTitle>
        Peta <Highlight>3 Halaman</Highlight> Petualangan!
      </SlideTitle>

      <div style={{ ...abs(X0, 240, W, 710), display: 'flex', alignItems: 'center', gap: 22 }}>
        {pages.map((p, idx) => (
          <div key={p.num} style={{ display: 'flex', alignItems: 'center', flex: 1, height: '100%', gap: 20 }}>
            <div
              style={{
                flex: 1,
                height: '100%',
                borderRadius: 28,
                background: p.bg,
                border: `4px solid ${CHARCOAL}`,
                boxShadow: `0 9px 0 ${CHARCOAL}`,
                padding: 26,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  padding: '8px 24px',
                  borderRadius: 99,
                  background: p.badgeBg,
                  color: p.badgeText,
                  border: `2.8px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                {p.num}
              </div>

              {/* Mini ScratchJr Stage Preview */}
              <div
                style={{
                  width: '100%',
                  height: 335,
                  borderRadius: 20,
                  border: `3.5px solid ${CHARCOAL}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {idx === 0 && <HomeBackdropSvg />}
                {idx === 1 && <ParkForestBackdropSvg />}
                {idx === 2 && <StarPartyBackdropSvg />}

                <div style={{ position: 'absolute', left: idx === 0 ? 150 : 90, bottom: 12 }}>
                  <TicCatSvg size={130} waving={idx === 2} speechBubble={idx === 0 ? 'Halo!' : idx === 2 ? 'Hore!' : undefined} />
                </div>
                {idx > 0 && (
                  <div style={{ position: 'absolute', right: 75, bottom: 12 }}>
                    <WhiteRabbitSvg size={118} />
                  </div>
                )}
              </div>

              <div>
                <div style={{ ...row, justifyContent: 'center', gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
                  <JuniorIcon name={p.icon} size={32} />
                  <span>{p.label}</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: CHARCOAL, marginTop: 6, lineHeight: 1.3 }}>
                  {p.desc}
                </div>
              </div>
            </div>

            {idx < 2 && <JuniorIcon name="arrow-right" size={48} />}
          </div>
        ))}
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Resep Halaman 1 & Halaman 2
// ============================================================================
const Slide05ResepHal12: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="RESEP BUKU CERITA" accentDot={CORAL}>
      <SlideTitle>
        Rangkai <Highlight>Halaman 1 &amp; 2!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={230}
        width={1360}
        height={735}
        titleBarColor={CREAM}
        headerLabel="Resep Kode Halaman 1 & Halaman 2"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Kartu Atas — Halaman 1 */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${SKY}`,
              padding: '22px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, justifyContent: 'space-between' }}>
              <span
                style={{
                  padding: '6px 20px',
                  borderRadius: 99,
                  background: SKY,
                  color: WHITE,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                Halaman 1 (Awal Cerita)
              </span>
              <span style={{ fontSize: 22, fontWeight: 700, color: MUTED }}>Sapa, Jalan, lalu Pindah ke 2!</span>
            </div>

            <div style={{ ...row, alignItems: 'flex-start', justifyContent: 'center' }}>
              <ScratchJrBlock kind="start-flag" scale={1.25} />
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="sound-rec-1" scale={1.25} />
              </div>
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="move-right" num={5} scale={1.25} />
              </div>
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="go-page-2" scale={1.25} activeGlow />
              </div>
            </div>
          </div>

          {/* Kartu Bawah — Halaman 2 */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${SUNNY}`,
              padding: '22px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, justifyContent: 'space-between' }}>
              <span
                style={{
                  padding: '6px 20px',
                  borderRadius: 99,
                  background: SUNNY,
                  color: CHARCOAL,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                Halaman 2 (Petualangan Seru)
              </span>
              <span style={{ fontSize: 22, fontWeight: 700, color: MUTED }}>Ngobrol, Lompat, lalu Pindah ke 3!</span>
            </div>

            <div style={{ ...row, alignItems: 'flex-start', justifyContent: 'center' }}>
              <ScratchJrBlock kind="start-flag" scale={1.25} />
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="say" sayText="Ayo main!" scale={1.25} />
              </div>
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="jump" num={2} scale={1.25} />
              </div>
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="go-page-3" scale={1.25} activeGlow />
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Biko Mascot pointing at the connecting Red end-blocks */}
      <div
        style={{
          ...abs(1475, 345, 360, 560),
          ...centerCol,
          animation: live ? 'cpj21-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={335}
          badgeIcon={<JuniorIcon name="go-page-3" size={22} />}
          speechBubble="Jembatan Cerita!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Pindah ke Halaman Berapa?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1600} top={122} size={52}>
        Setelah <Highlight>Halaman 2,</Highlight> Pindah ke Mana?
      </SlideTitle>

      {/* Visual Page Progression Question Strip */}
      <div
        style={{
          ...abs(340, 212, 1240, 120),
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: `0 6px 0 ${CHARCOAL}`,
          ...row,
          justifyContent: 'center',
          gap: 24,
          padding: '0 24px',
        }}
      >
        <div style={{ padding: '12px 24px', borderRadius: 16, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
          1. Awal
        </div>
        <JuniorIcon name="arrow-right" size={34} />
        <div style={{ padding: '12px 24px', borderRadius: 16, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
          2. Tengah
        </div>
        <JuniorIcon name="arrow-right" size={34} />
        <div style={{ padding: '12px 28px', borderRadius: 16, background: CORAL_SOFT, border: `3.5px dashed ${CORAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CORAL }}>
          Blok Merah ?
        </div>
      </div>

      {/* Choice Cards */}
      <div style={{ ...abs(190, 355, 1540, 390), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Go to Page 3) */}
        <button
          type="button"
          onClick={() => setPicked('A')}
          className="cpj21-card-btn"
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
              background: TEAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            PILIHAN A
          </div>

          <div style={{ marginTop: 14 }}>
            <ScratchJrBlock kind="go-page-3" scale={1.4} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Pindah Halaman 3
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
              <span>Benar! Lanjut ke Halaman 3 (Akhir Cerita)!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Go to Page 1) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj21-card-btn"
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
            animation: picked === 'B' ? 'cpj21-shake 0.35s ease' : undefined,
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
            <ScratchJrBlock kind="go-page-1" scale={1.4} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Pindah Halaman 1
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
              <span>Ups! Nanti balik lagi ke awal dong!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Center Prompt + Biko holding Question Sign */}
      <div style={{ ...abs(190, 760, 1540, 240), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj21-float 3s ease-in-out infinite' : undefined }}>
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
// SLIDE 07 — Resep Halaman 3 & Mode Layar Penuh!
// ============================================================================
const Slide07Hal3LayarPenuh: Page = () => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <JuniorFrame badge="AKHIR CERITA & TAYANG" accentDot={TEAL}>
      <SlideTitle>
        <Highlight>Akhir Bahagia</Highlight> &amp; Layar Penuh!
      </SlideTitle>

      {/* Left Spotlight: Authentic ScratchJr Tablet UI on Halaman 3 with Spotlight on Presentation Mode Button */}
      <div style={{ ...abs(X0, 235, 920, 720) }}>
        <AuthenticScratchJrUI
          page={3}
          spotlight="fullscreen"
          fullscreen={fullscreen}
          onToggleFullscreen={() => setFullscreen((f) => !f)}
          activeStoryStep
          width={920}
          height={720}
        />
      </div>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={1060}
        top={235}
        width={760}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Halaman 3 & Mode Presentasi"
        padding={38}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 12 }}>
            <BulletRow icon="party" bgColor={TEAL_SOFT} fontSize={31}>
              <strong>Halaman 3:</strong> Bendera Hijau + Say <strong>&ldquo;Hore, berhasil!&rdquo;</strong> + Berputar
            </BulletRow>
            <BulletRow icon="fullscreen" bgColor={SUNNY_SOFT} fontSize={31}>
              Klik ikon <strong>Layar Penuh</strong> di atas panggung untuk membaca bukumu!
            </BulletRow>
          </div>

          <button
            type="button"
            onClick={() => setFullscreen((f) => !f)}
            className="cpj21-card-btn"
            style={{
              padding: '20px 26px',
              borderRadius: 22,
              background: fullscreen ? SUNNY : TEAL,
              color: fullscreen ? CHARCOAL : WHITE,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
              ...row,
              justifyContent: 'center',
              gap: 12,
            }}
          >
            <JuniorIcon name="fullscreen" size={32} />
            <span>{fullscreen ? 'Keluar Mode Layar Penuh' : 'Coba Klik Ikon Layar Penuh!'}</span>
          </button>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Kreator Buku Cerita Hebat (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsKreator: Page = () => {
  return (
    <JuniorFrame badge="TIPS KREATOR CILIK" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Buku Ceritamu <Highlight>Keren!</Highlight>
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
            <BulletRow icon="book-open" bgColor={SKY_SOFT} fontSize={29}>
              Buat <strong>3 Halaman</strong> dulu sebelum pasang blok pindah
            </BulletRow>
            <BulletRow icon="flag" bgColor={TEAL_SOFT} fontSize={29}>
              Tes jalankan cerita dari <strong>Halaman 1</strong>
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
            <BikoMascot
              pose="thumbs-up"
              width={175}
              badgeIcon={<JuniorIcon name="check" size={18} />}
              speechBubble="Cerita mulus!"
            />
            <div style={{ ...row, gap: 10 }}>
              {[1, 2, 3].map((p) => (
                <div
                  key={p}
                  style={{
                    width: 66,
                    height: 84,
                    borderRadius: 16,
                    background: WHITE,
                    border: `3px solid ${TEAL}`,
                    ...centerCol,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 32,
                    fontWeight: 700,
                  }}
                >
                  {p}
                </div>
              ))}
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
            <BulletRow icon="shuffle" bgColor={CORAL_SOFT} fontSize={29}>
              Salah pilih <strong>Angka Halaman</strong> tujuan
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={29}>
              Lupa memberi <strong>Jeda (Wait)</strong> saat 2 karakter ngobrol
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
            <div style={{ ...row, gap: 14 }}>
              <span style={{ padding: '14px 20px', borderRadius: 16, background: WHITE, border: `3px solid ${CORAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
                1
              </span>
              <JuniorIcon name="shuffle" size={46} />
              <span style={{ padding: '14px 20px', borderRadius: 16, background: WHITE, border: `3px solid ${CORAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
                3?
              </span>
            </div>
            <div style={{ ...centerCol, gap: 8 }}>
              <JuniorIcon name="cross" size={56} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: '#991B1B' }}>
                Urutan melompat acak!
              </span>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Buat Karya Besarku!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [page, setPage] = useState<1 | 2 | 3>(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (page === 1) {
      const t = setTimeout(() => setPage(2), 1400);
      return () => clearTimeout(t);
    }
    if (page === 2) {
      const t = setTimeout(() => setPage(3), 1400);
      return () => clearTimeout(t);
    }
    if (page === 3) {
      const t = setTimeout(() => setRunning(false), 1600);
      return () => clearTimeout(t);
    }
  }, [running, page]);

  const startStoryRun = () => {
    setPage(1);
    setRunning(true);
  };

  return (
    <JuniorFrame badge="PROYEK KARYA BESARKU!" accentDot={SUNNY}>
      <SlideTitle>
        Misi <Highlight>Buku Cerita 3 Halaman!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'palette' as JuniorIconName,
            text: (
              <>
                Siapkan <strong>3 Halaman</strong> latar &amp; karakter pilihanmu
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'puzzle' as JuniorIconName,
            text: (
              <>
                Rangkai <strong>Gerak, Suara, Dialog &amp; Pindah Halaman</strong>
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'fullscreen' as JuniorIconName,
            text: (
              <>
                Klik <strong>Layar Penuh</strong> &amp; tampilkan karyamu!
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

      {/* Authentic Interactive ScratchJr Workspace */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratchJrUI
          page={page}
          onSelectPage={(p) => {
            setRunning(false);
            setPage(p);
          }}
          fullscreen={fullscreen}
          onToggleFullscreen={() => setFullscreen((f) => !f)}
          showGrid={showGrid}
          onToggleGrid={() => setShowGrid((g) => !g)}
          onRunStory={startStoryRun}
          activeStoryStep={running}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Tic */}
      <div
        style={{
          ...abs(1405, 430, 435, 520),
          ...centerCol,
          animation: live ? 'cpj21-hop 2.4s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="thumbs-up"
          width={355}
          badgeIcon={<JuniorIcon name="flag" size={24} />}
          speechBubble={running ? `Halaman ${page}!` : 'Klik Bendera!'}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 21 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="PROYEK BESAR SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj21-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj21-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="star-glow" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj21-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1500} top={122} size={60}>
        Luar Biasa! Kamu <Highlight>Kreator Buku Digital!</Highlight>{' '}
        <JuniorIcon name="trophy" size={52} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Proyek Besar • Pertemuan 21"
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
          {/* Bespoke Golden Champion Trophy & Open Storybook Medal SVG */}
          <div style={{ animation: live ? 'cpj21-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={270} height={260} viewBox="0 0 250 240" fill="none">
              <path d="M88 152 L70 222 L102 202 L118 224 L122 160 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M162 152 L180 222 L148 202 L132 224 L128 160 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="125" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="125" cy="108" r="68" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Open Digital Storybook inside Medal */}
              <path d="M72 86 C90 80, 112 86, 125 96 V142 C112 132, 90 126, 72 132 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.4} strokeLinejoin="round" />
              <path d="M178 86 C160 80, 138 86, 125 96 V142 C138 132, 160 126, 178 132 Z" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={3.4} strokeLinejoin="round" />
              <line x1="84" y1="104" x2="112" y2="108" stroke={LAVENDER} strokeWidth={3.4} strokeLinecap="round" />
              <line x1="84" y1="116" x2="108" y2="119" stroke={TEAL} strokeWidth={3.4} strokeLinecap="round" />
              <line x1="138" y1="108" x2="164" y2="104" stroke={CORAL} strokeWidth={3.4} strokeLinecap="round" />
              <line x1="142" y1="119" x2="164" y2="116" stroke={SKY} strokeWidth={3.4} strokeLinecap="round" />
              {/* Glowing Crown Star */}
              <path
                d="M125 46 L130 58 L143 60 L133 68 L136 81 L125 74 L114 81 L117 68 L107 60 L120 58 Z"
                fill={SUNNY}
                stroke={CHARCOAL}
                strokeWidth={2.8}
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
              fontSize: 33,
              fontWeight: 700,
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="medal" size={34} />
            <span>Lencana Kreator Buku Cerita Interaktif</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.38,
              maxWidth: 940,
              color: CHARCOAL,
            }}
          >
            Kamu berhasil menggabungkan{' '}
            <Highlight color="#D1FAE5">Gerak, Suara, Dialog, &amp; Pindah Halaman!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="trophy" size={22} />}
            speechBubble="Kreator Juara!"
          />
          <div style={{ animation: live ? 'cpj21-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 21 — Karya Besarku: Buku Cerita 3 Halaman! 📖
Hari ini adalah proyek puncak seru untuk menggabungkan semua ilmu ScratchJr menjadi buku cerita interaktif 3 halaman!`,

  `Dua misi besar hari ini:
1. Membuat Buku Cerita 3 Halaman di ScratchJr.
2. Menggabungkan Gerak, Suara, Dialog, dan Pindah Halaman!`,

  `Bekal Kreator — 4 Kekuatan Ajaib:
Review cepat bersama anak-anak: Blok Biru (Gerak), Blok Hijau (Suara), Blok Ungu/Oranye (Dialog & Jeda), dan Blok Merah (Pindah Halaman 1 -> 2 -> 3)!`,

  `Peta Buku Cerita 3 Halaman:
- Halaman 1 (Awal): Karakter menyapa & berangkat dari rumah.
- Halaman 2 (Tengah): Ketemu teman & ngobrol seru di taman.
- Halaman 3 (Akhir): Sampai di pesta bintang & merayakan keberhasilan!`,

  `Resep Halaman 1 & Halaman 2:
- Halaman 1: Bendera Hijau -> Suara Sapaan 1 -> Maju 5 -> Pindah Halaman 2.
- Halaman 2: Bendera Hijau -> Say "Ayo main!" -> Lompat -> Pindah Halaman 3.`,

  `Permainan Cepat! Ayo tebak bersama:
Setelah Halaman 2 (Tengah), blok merah mana yang dipilih agar cerita lanjut ke akhir — Pilihan A (Pindah Halaman 3) atau Pilihan B (Pindah Halaman 1)?`,

  `Resep Halaman 3 & Mode Layar Penuh:
Di Halaman 3, pasang Bendera Hijau + Say "Hore, berhasil!" + Berputar! Lalu klik ikon Layar Penuh di toolbar atas panggung ScratchJr untuk menonton bukunya!`,

  `Tips Kreator Buku Cerita Hebat:
BOLEH buat 3 halaman dulu sebelum pasang blok pindah, dan tes cerita dari Halaman 1.
JANGAN salah pilih angka halaman tujuan atau lupa memberi Jeda (Wait) saat 2 karakter ngobrol!`,

  `Waktunya Proyek Karya Besarku:
1. Siapkan 3 halaman latar & karakter. 2. Rangkai Gerak, Suara, Dialog & Pindah Halaman. 3. Klik Layar Penuh & klik Bendera Hijau di simulasi maupun laptop anak!`,

  `Luar biasa untuk semua Kreator Buku Digital! 🏆
Kalian berhasil menuntaskan Proyek Karya Besarku dan meraih Lencana Kreator Buku Cerita Interaktif di Pertemuan 21!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 21 — Karya Besarku: Buku Cerita 3 Halaman!',
  createdAt: '2026-11-16T13:55:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BekalKreator,
  Slide04PetaCerita,
  Slide05ResepHal12,
  Slide06AyoTebak,
  Slide07Hal3LayarPenuh,
  Slide08TipsKreator,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

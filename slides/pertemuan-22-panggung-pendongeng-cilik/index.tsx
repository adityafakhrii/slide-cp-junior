import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-22-panggung-pendongeng-cilik';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj22-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj22-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj22-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj22-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj22-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj22-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.85); }
  50% { box-shadow: 0 0 0 14px rgba(251, 191, 36, 0); }
}
.cpj22-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj22-card-btn:hover {
  transform: translateY(-4px);
}
.cpj22-card-btn:active {
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
          animation: live ? 'cpj22-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 22 • Panggung Pendongeng Cilik!</span>
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
// Reusable Pertemuan 22 Visuals (ScratchJr UI, Tic Cat, Grad Cap, Storybook)
// ============================================================================

const TicCatSvg = ({
  size = 120,
  waving = false,
  speechBubble,
  gradCap = false,
}: {
  size?: number;
  waving?: boolean;
  speechBubble?: string;
  gradCap?: boolean;
}) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
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
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      {gradCap && (
        <div style={{ position: 'absolute', left: '28%', top: -14, zIndex: 4 }}>
          <JuniorIcon name="grad-cap" size={Math.round(size * 0.44)} />
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
  </div>
);

const WhiteRabbitSvg = ({ size = 100 }: { size?: number }) => (
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

const ParkBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 360 220" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="360" height="220" fill="#E0F2FE" />
    <circle cx="54" cy="38" r="18" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
    <path d="M0 152 Q120 120 240 150 Q310 166 360 140 V220 H0 Z" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="52" y="98" width="16" height="62" rx="4" fill="#92400E" stroke={CHARCOAL} strokeWidth={2.6} />
    <circle cx="60" cy="80" r="32" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.8} />
    <rect x="278" y="90" width="18" height="68" rx="4" fill="#92400E" stroke={CHARCOAL} strokeWidth={2.6} />
    <circle cx="287" cy="72" r="34" fill="#22C55E" stroke={CHARCOAL} strokeWidth={2.8} />
  </svg>
);

const StarPartyBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 360 220" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="360" height="220" fill="#F3EEFF" />
    <path d="M0 158 Q180 132 360 158 V220 H0 Z" fill="#A7F3D0" stroke={CHARCOAL} strokeWidth={2.6} />
    <path d="M0 24 Q90 54 180 28 Q270 54 360 24" stroke={CHARCOAL} strokeWidth={2.4} fill="none" />
    <polygon points="40,36 58,54 72,34" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
    <polygon points="108,42 124,62 140,38" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
    <polygon points="205,38 220,62 238,42" fill={SKY} stroke={CHARCOAL} strokeWidth={2} />
    <polygon points="282,34 298,54 316,36" fill={TEAL} stroke={CHARCOAL} strokeWidth={2} />
  </svg>
);

type ShowcaseBlockKind = 'start-flag' | 'move-right' | 'sound-pop' | 'say' | 'go-page-2' | 'go-page-3';

const ScratchJrBlock = ({
  kind,
  num = 5,
  sayText = 'Halo!',
  scale = 1,
}: {
  kind: ShowcaseBlockKind;
  num?: number;
  sayText?: string;
  scale?: number;
}) => {
  const isTrigger = kind === 'start-flag';
  const isEndCap = kind === 'go-page-2' || kind === 'go-page-3';
  const fill =
    kind === 'start-flag'
      ? SUNNY
      : kind === 'move-right'
        ? SKY
        : kind === 'sound-pop'
          ? TEAL
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

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
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

        {kind === 'sound-pop' && (
          <>
            <path d="M34 52 H48 L68 35 V83 L48 66 H34 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <path d="M76 46 Q85 59 76 72" fill="none" stroke={SUNNY} strokeWidth={4.5} strokeLinecap="round" />
            <path d="M86 37 Q100 59 86 81" fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
          </>
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
            <text x="69" y="61" textAnchor="middle" fill={CHARCOAL} fontSize="14" fontWeight="800" fontFamily="Fredoka, sans-serif">
              {sayText}
            </text>
          </>
        )}

        {isEndCap && (
          <>
            <rect x="40" y="30" width="60" height="58" rx="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} />
            <rect x="46" y="36" width="48" height="22" rx="4" fill="#E0F2FE" stroke={CHARCOAL} strokeWidth={2} />
            <circle cx="88" cy="76" r="14" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
            <text x="88" y="82" textAnchor="middle" fill={CHARCOAL} fontSize="17" fontWeight="800" fontFamily="Fredoka, sans-serif">
              {kind === 'go-page-2' ? '2' : '3'}
            </text>
          </>
        )}
      </svg>

      {kind === 'move-right' && (
        <div
          style={{
            marginTop: Math.round(-16 * scale),
            minWidth: Math.round(42 * scale),
            height: Math.round(28 * scale),
            borderRadius: Math.round(10 * scale),
            background: WHITE,
            border: `2.8px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(17 * scale),
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

/** Authentic ScratchJr Tablet Interface matching real ScratchJr toolbar & stage layout */
const AuthenticScratchJrUI = ({
  page,
  onSelectPage,
  spotlight = 'none',
  fullscreen = false,
  onToggleFullscreen,
  onRunStory,
  activeStoryStep = false,
  width = 860,
  height = 540,
}: {
  page: 1 | 2 | 3;
  onSelectPage?: (p: 1 | 2 | 3) => void;
  spotlight?: 'none' | 'ready-check' | 'fullscreen';
  fullscreen?: boolean;
  onToggleFullscreen?: () => void;
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
          animation: 'cpj22-pulse 1.6s infinite',
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
          <button
            type="button"
            onClick={onToggleFullscreen}
            className={onToggleFullscreen ? 'cpj22-card-btn' : undefined}
            title="Layar Penuh"
            style={{
              width: 42,
              height: 36,
              borderRadius: 10,
              background: fullscreen || spotlight === 'ready-check' || spotlight === 'fullscreen' ? SUNNY : WHITE,
              border: `2.5px solid ${CHARCOAL}`,
              ...centerCol,
              padding: 0,
              ...ringStyle(spotlight === 'ready-check' || spotlight === 'fullscreen'),
            }}
          >
            <JuniorIcon name="fullscreen" size={24} />
          </button>
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
            onClick={onRunStory}
            className={onRunStory ? 'cpj22-card-btn' : undefined}
            title="Bendera Hijau"
            style={{
              width: 44,
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
          Hal. {page}
        </div>
      </div>

      {/* Middle 3-Column Row */}
      <div style={{ flex: 1, display: 'flex', gap: 10, minHeight: 0 }}>
        {!fullscreen && (
          <div
            style={{
              width: 98,
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
            <div style={{ width: '100%', height: 64, borderRadius: 12, background: WHITE, border: `3px solid ${SKY}`, ...centerCol, position: 'relative' }}>
              <TicCatSvg size={48} />
              <div style={{ position: 'absolute', right: -4, top: -4, width: 22, height: 22, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
                <JuniorIcon name="paintbrush" size={12} />
              </div>
            </div>
            {page > 1 && (
              <div style={{ width: '100%', height: 56, borderRadius: 12, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
                <WhiteRabbitSvg size={42} />
              </div>
            )}
            <div style={{ marginTop: 'auto', opacity: 0.85 }}>
              <JuniorIcon name="plus-circle" size={28} />
            </div>
          </div>
        )}

        {/* Center Stage */}
        <div style={{ flex: 1, borderRadius: 18, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
          {page === 1 && <HomeBackdropSvg />}
          {page === 2 && <ParkBackdropSvg />}
          {page === 3 && <StarPartyBackdropSvg />}

          <div
            style={{
              position: 'absolute',
              left: page === 1 ? (activeStoryStep ? 235 : 85) : 135,
              bottom: activeStoryStep ? 38 : 16,
              transition: 'all 420ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <TicCatSvg
              size={fullscreen ? 142 : 108}
              waving
              speechBubble={page === 1 ? 'Halo semua!' : page === 2 ? 'Ayo main!' : 'Hore, berhasil!'}
            />
          </div>

          {page > 1 && (
            <div style={{ position: 'absolute', right: 85, bottom: 16 }}>
              <WhiteRabbitSvg size={fullscreen ? 128 : 98} />
            </div>
          )}
        </div>

        {/* Right Pages Panel */}
        {!fullscreen && (
          <div
            style={{
              width: 106,
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
              const spotP1 = spotlight === 'ready-check' && p === 1;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onSelectPage?.(p)}
                  className={onSelectPage ? 'cpj22-card-btn' : undefined}
                  style={{
                    height: 58,
                    borderRadius: 12,
                    border: `2.5px solid ${active || spotP1 ? SUNNY : CHARCOAL}`,
                    position: 'relative',
                    overflow: 'hidden',
                    padding: 0,
                    ...ringStyle(spotP1),
                  }}
                >
                  {p === 1 && <HomeBackdropSvg />}
                  {p === 2 && <ParkBackdropSvg />}
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

      {/* Bottom Coding Palette & Workspace */}
      {!fullscreen && (
        <div
          style={{
            height: 118,
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
          <div
            style={{
              height: 32,
              background: '#E0F2FE',
              borderBottom: `2px solid ${CHARCOAL}`,
              padding: '0 12px',
              ...row,
              gap: 8,
            }}
          >
            {(['dot-yellow', 'dot-blue', 'dot-purple', 'dot-green', 'wait', 'dot-red'] as JuniorIconName[]).map((d) => (
              <JuniorIcon key={d} name={d} size={20} />
            ))}
          </div>
          <div style={{ flex: 1, padding: '4px 14px', ...row, alignItems: 'flex-start', overflow: 'hidden' }}>
            <ScratchJrBlock kind="start-flag" scale={0.68} />
            <div style={{ marginLeft: -10 }}>
              <ScratchJrBlock kind="move-right" num={5} scale={0.68} />
            </div>
            <div style={{ marginLeft: -10 }}>
              <ScratchJrBlock kind="sound-pop" scale={0.68} />
            </div>
            <div style={{ marginLeft: -10 }}>
              <ScratchJrBlock kind="say" sayText="Halo!" scale={0.68} />
            </div>
            {page < 3 && (
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind={page === 1 ? 'go-page-2' : 'go-page-3'} scale={0.68} />
              </div>
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
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 22" accentDot={SUNNY}>
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
          <JuniorIcon name="grad-cap" size={24} />
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
          Panggung
          <br />
          <Highlight>Pendongeng Cilik!</Highlight>
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
          Pameran &amp; Cerita Seru di Balik Buku Digitalku
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
            <JuniorIcon name="fullscreen" size={28} />
            <span>Pameran Karya</span>
          </div>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: SUNNY,
              color: CHARCOAL,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="trophy" size={28} />
            <span>Wisuda Level 1!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Spotlight Theater Arch + Authentic ScratchJr + Biko Presenter */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        {/* Theater Spotlight Arch */}
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '340px 340px 56px 56px',
            background: 'linear-gradient(170deg, #FEF9C3 0%, #EFF6FF 55%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SUNNY}`,
            overflow: 'hidden',
          }}
        />

        {/* Mini Authentic ScratchJr Tablet */}
        <div style={{ position: 'absolute', right: 12, top: 150, zIndex: 2 }}>
          <AuthenticScratchJrUI page={1} width={580} height={415} />
        </div>

        {/* Biko Presenter with Mic Badge */}
        <div
          style={{
            position: 'absolute',
            left: -18,
            bottom: 30,
            zIndex: 3,
            animation: live ? 'cpj22-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="mic" size={24} />}
            speechBubble="Selamat datang!"
          />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Spesial Hari Ini
// ============================================================================
const Slide02Misi: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SPESIAL HARI INI" accentDot={SKY}>
      <SlideTitle>
        Apa Misi Spesial Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Pameran & Presentasi • Pertemuan 22"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu 1 (Biru) */}
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
                width: 245,
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
              <JuniorIcon name="fullscreen" size={84} />
              <JuniorIcon name="book-open" size={84} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Putar <span style={{ color: '#1D4ED8' }}>Buku Cerita Digital</span> di Layar Penuh
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
                width: 245,
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
              <JuniorIcon name="happy" size={78} />
              <JuniorIcon name="family" size={84} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Ceritakan <span style={{ color: '#047857' }}>Karyamu</span> di Depan{' '}
              <span style={{ color: '#047857' }}>Ayah &amp; Bunda!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj22-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="mic" size={24} />}
          speechBubble="Bangga banget!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Jejak Perjalanan Hebatku! (Grid 2x2)
// ============================================================================
const Slide03JejakBelajar: Page = () => {
  const live = useIsActivePage();

  const stages = [
    {
      title: 'Kenal Laptop & Klik',
      sub: 'Pertemuan 1–3',
      bg: SKY_SOFT,
      border: SKY,
      badgeBg: SKY,
      icon: 'laptop' as JuniorIconName,
    },
    {
      title: 'Pola, Arah & Logika',
      sub: 'Pertemuan 4–10',
      bg: SUNNY_SOFT,
      border: SUNNY,
      badgeBg: SUNNY,
      icon: 'puzzle' as JuniorIconName,
    },
    {
      title: 'Gerak, Suara & Dialog',
      sub: 'Pertemuan 11–18',
      bg: LAVENDER_SOFT,
      border: LAVENDER,
      badgeBg: LAVENDER,
      icon: 'cat' as JuniorIconName,
    },
    {
      title: 'Karya Buku 3 Halaman!',
      sub: 'Pertemuan 19–21',
      bg: TEAL_SOFT,
      border: TEAL,
      badgeBg: TEAL,
      icon: 'book-open' as JuniorIconName,
    },
  ];

  return (
    <JuniorFrame badge="JEJAK BELAJARKU" accentDot={SUNNY}>
      <SlideTitle>
        Lihat <Highlight>Perjalanan Hebatmu!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="22 Pertemuan Code Explorer"
        padding={32}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 28, height: '100%' }}>
          {stages.map((s) => (
            <div
              key={s.title}
              style={{
                borderRadius: 24,
                background: s.bg,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 7px 0 ${s.border}`,
                padding: '24px 28px',
                ...row,
                gap: 22,
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 24,
                  background: s.badgeBg,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                <JuniorIcon name={s.icon} size={56} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: MUTED, marginTop: 4 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj22-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="thumbs-up"
          width={385}
          badgeIcon={<JuniorIcon name="star-glow" size={24} />}
          speechBubble="Hebat sekali!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Cek Siap Tampil: Siapkan Panggungmu!
// ============================================================================
const Slide04CekSiapTampil: Page = () => {
  const [page, setPage] = useState<1 | 2 | 3>(1);
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <JuniorFrame badge="CEK SIAP TAMPIL" accentDot={TEAL}>
      <SlideTitle>
        Yuk Siapkan <Highlight>Panggungmu!</Highlight>
      </SlideTitle>

      {/* Left 3 Sequential Preparation Steps */}
      <MacWindowCard
        left={X0}
        top={235}
        width={760}
        height={720}
        titleBarColor={CREAM}
        headerLabel="3 Langkah Persiapan"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ padding: '20px 24px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
              <JuniorIcon name="step-1" size={44} />
              <div style={{ fontSize: 28, fontWeight: 800 }}>
                <JuniorIcon name="book-open" size={28} style={{ marginRight: 8 }} />
                Buka proyek <strong>Buku Cerita 3 Halaman</strong>
              </div>
            </div>

            <div style={{ padding: '20px 24px', borderRadius: 22, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
              <JuniorIcon name="step-2" size={44} />
              <div style={{ fontSize: 28, fontWeight: 800 }}>
                <JuniorIcon name="go-page-1" size={28} style={{ marginRight: 8 }} />
                Ketuk <strong>Halaman 1</strong> agar mulai dari awal
              </div>
            </div>

            <div style={{ padding: '20px 24px', borderRadius: 22, background: TEAL_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
              <JuniorIcon name="step-3" size={44} />
              <div style={{ fontSize: 28, fontWeight: 800 }}>
                <JuniorIcon name="fullscreen" size={28} style={{ marginRight: 8 }} />
                Klik tombol <strong>Layar Penuh</strong> di atas!
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFullscreen((f) => !f)}
            className="cpj22-card-btn"
            style={{
              padding: '18px 24px',
              borderRadius: 20,
              background: fullscreen ? SUNNY : TEAL,
              color: fullscreen ? CHARCOAL : WHITE,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
              ...row,
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <JuniorIcon name="fullscreen" size={30} />
            <span>{fullscreen ? 'Tutup Layar Penuh' : 'Coba Tombol Layar Penuh!'}</span>
          </button>
        </div>
      </MacWindowCard>

      {/* Right Authentic ScratchJr Screen highlighting Halaman 1 & Fullscreen */}
      <div style={{ ...abs(900, 235, 920, 720) }}>
        <AuthenticScratchJrUI
          page={page}
          onSelectPage={setPage}
          spotlight="ready-check"
          fullscreen={fullscreen}
          onToggleFullscreen={() => setFullscreen((f) => !f)}
          width={920}
          height={720}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus Pendongeng Cilik: 3 Langkah Cerita Seru!
// ============================================================================
const Slide05JurusPendongeng: Page = () => {
  const steps = [
    {
      num: 'LANGKAH 1',
      title: 'Sapa & Senyum:',
      quote: '"Halo Ayah, Bunda & Teman!"',
      bg: SKY_SOFT,
      border: SKY,
      badgeBg: SKY,
      badgeText: WHITE,
      icon: 'hand' as JuniorIconName,
      pose: 'wave' as const,
      bubble: 'Halo semua!',
    },
    {
      num: 'LANGKAH 2',
      title: 'Klik Bendera Hijau:',
      quote: 'Putar ceritamu!',
      bg: SUNNY_SOFT,
      border: SUNNY,
      badgeBg: SUNNY,
      badgeText: CHARCOAL,
      icon: 'flag' as JuniorIconName,
      pose: 'point-left' as const,
      bubble: 'Mulai yuk!',
    },
    {
      num: 'LANGKAH 3',
      title: 'Ceritakan:',
      quote: 'Apa isi Halaman 1, 2, & 3?',
      bg: TEAL_SOFT,
      border: TEAL,
      badgeBg: TEAL,
      badgeText: WHITE,
      icon: 'speak' as JuniorIconName,
      pose: 'thumbs-up' as const,
      bubble: 'Jadi gini...',
    },
  ];

  return (
    <JuniorFrame badge="JURUS PENDONGENG CILIK" accentDot={SKY}>
      <SlideTitle>
        <Highlight>3 Langkah</Highlight> Cerita Seru!
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1720}
        height={725}
        titleBarColor={CREAM}
        headerLabel="Panduan Presentasi Anak Hebat"
        padding={32}
      >
        <div style={{ display: 'flex', gap: 30, height: '100%' }}>
          {steps.map((s) => (
            <div
              key={s.num}
              style={{
                flex: 1,
                borderRadius: 24,
                background: s.bg,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 8px 0 ${s.border}`,
                padding: '24px 26px',
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
                  background: s.badgeBg,
                  color: s.badgeText,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {s.num}
              </div>

              <BikoMascot
                pose={s.pose}
                width={205}
                badgeIcon={<JuniorIcon name={s.icon} size={20} />}
                speechBubble={s.bubble}
              />

              <div>
                <div style={{ ...row, justifyContent: 'center', gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
                  <JuniorIcon name={s.icon} size={32} />
                  <span>{s.title}</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: CHARCOAL, marginTop: 8, lineHeight: 1.3 }}>
                  {s.quote}
                </div>
              </div>
            </div>
          ))}
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Pemanasan Seru: Mana Gaya Pendongeng Hebat?
// ============================================================================
const Slide06Pemanasan: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="PEMANASAN SERU!" accentDot={SUNNY}>
      <SlideTitle align="center" maxWidth={1600} top={128} size={54}>
        Mana Gaya <Highlight>Pendongeng Hebat?</Highlight>
      </SlideTitle>

      <div style={{ ...abs(190, 250, 1540, 455), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Senyum & Suara Jelas) */}
        <button
          type="button"
          onClick={() => setPicked('A')}
          className="cpj22-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'A' ? TEAL_SOFT : WHITE,
            border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'A' ? TEAL : CHARCOAL}`,
            padding: 28,
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

          <BikoMascot
            pose="wave"
            width={220}
            badgeIcon={<JuniorIcon name="happy" size={20} />}
            speechBubble="Halo Ayah & Bunda!"
          />

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Senyum &amp; Suara Jelas
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
              <span>Mantap! Percaya diri &amp; suaranya lantang!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Malu & Berbisik) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj22-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'B' ? CORAL_SOFT : WHITE,
            border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'B' ? CORAL : CHARCOAL}`,
            padding: 28,
            ...centerCol,
            gap: 14,
            position: 'relative',
            animation: picked === 'B' ? 'cpj22-shake 0.35s ease' : undefined,
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

          <BikoMascot
            pose="thinking"
            width={220}
            badgeIcon={<JuniorIcon name="mute" size={20} />}
            speechBubble="...ssst pelan..."
          />

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Malu &amp; Berbisik
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
              <span>Jangan malu ya, suara jelas bikin semua senang!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Center Prompt + Biko holding Star Board */}
      <div style={{ ...abs(190, 735, 1540, 265), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj22-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={210}
            badgeIcon={<JuniorIcon name="star-glow" size={22} />}
            speechBubble={picked === 'A' ? 'Bintang!' : 'Senyum yuk!'}
          />
        </div>

        <div
          style={{
            padding: '20px 36px',
            borderRadius: 26,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            ...row,
            gap: 20,
          }}
        >
          <div style={{ width: 64, height: 64, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="star-glow" size={38} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, color: CHARCOAL }}>
            Ayo tunjukkan senyum terbaikmu sekarang!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Rahasia di Balik Layar: Tunjukkan Kode Ajaibmu!
// ============================================================================
const Slide07TunjukkanKode: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="RAHASIA CODER CILIK" accentDot={LAVENDER}>
      <SlideTitle>
        Tunjukkan <Highlight>Kode Ajaibmu!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Full Sparkling ScratchJr Code Chain */}
      <MacWindowCard
        left={X0}
        top={235}
        width={940}
        height={720}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Dapur Kode Warna-Warni Buatanmu"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ ...row, gap: 18 }}>
            <JuniorIcon name="sparkle" size={38} />
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
              Balok Kode Kebanggaanku:
            </span>
            <JuniorIcon name="star-glow" size={38} />
          </div>

          <div
            style={{
              width: '100%',
              padding: '38px 22px',
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
            <ScratchJrBlock kind="start-flag" scale={1.18} />
            <div style={{ marginLeft: -16 }}>
              <ScratchJrBlock kind="move-right" num={5} scale={1.18} />
            </div>
            <div style={{ marginLeft: -16 }}>
              <ScratchJrBlock kind="sound-pop" scale={1.18} />
            </div>
            <div style={{ marginLeft: -16 }}>
              <ScratchJrBlock kind="say" sayText="Halo!" scale={1.18} />
            </div>
            <div style={{ marginLeft: -16 }}>
              <ScratchJrBlock kind="go-page-2" scale={1.18} />
            </div>
          </div>

          <div style={{ ...row, gap: 22 }}>
            <div style={{ animation: live ? 'cpj22-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot
                pose="point-left"
                width={205}
                badgeIcon={<JuniorIcon name="puzzle" size={20} />}
                speechBubble="Ini kodenya!"
              />
            </div>
            <div
              style={{
                padding: '16px 24px',
                borderRadius: 20,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 24,
                fontWeight: 700,
                maxWidth: 390,
              }}
            >
              Setelah cerita selesai, keluar dari Layar Penuh dan pamerkan rangkaian blokmu!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={1080}
        top={235}
        width={740}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Cerita di Balik Kode"
        padding={40}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="puzzle" bgColor={LAVENDER_SOFT} fontSize={33}>
              Tunjukkan <strong>Blok Warna-Warni</strong> buatanmu
            </BulletRow>
            <BulletRow icon="heart" bgColor={CORAL_SOFT} fontSize={33}>
              Ceritakan bagian yang <strong>Paling Kamu Suka!</strong>
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
              Ayah &amp; Bunda pasti senang melihat bagaimana kamu merangkai kode seperti programmer cilik!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Jadilah Penonton Jempolan! (BOLEH vs JANGAN)
// ============================================================================
const Slide08PenontonJempolan: Page = () => {
  return (
    <JuniorFrame badge="ATURAN PENONTON HEBAT" accentDot={TEAL}>
      <SlideTitle>
        Jadilah <Highlight>Penonton Jempolan!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & HEBAT"
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
            <BulletRow icon="eyes" bgColor={SKY_SOFT} fontSize={30}>
              <strong>Perhatikan</strong> teman yang sedang cerita
            </BulletRow>
            <BulletRow icon="clap" bgColor={TEAL_SOFT} fontSize={30}>
              <strong>Tepuk Tangan</strong> meriah setelah selesai!
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
            <BikoMascot pose="thumbs-up" width={165} badgeIcon={<JuniorIcon name="clap" size={18} />} speechBubble="Prok prok!" />
            <JuniorIcon name="clap" size={68} />
            <TicCatSvg size={140} waving speechBubble="Hebat!" />
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
        headerLabel="JANGAN MENGGANGGU"
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
              <strong>Mengobrol</strong> saat teman bercerita
            </BulletRow>
            <BulletRow icon="warning" bgColor={SUNNY_SOFT} fontSize={30}>
              <strong>Berlari-lari</strong> di depan panggung
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
            <div style={{ ...row, gap: 16 }}>
              <JuniorIcon name="speak" size={74} />
              <JuniorIcon name="speaker" size={74} />
            </div>
            <div style={{ ...centerCol, gap: 8 }}>
              <JuniorIcon name="cross" size={64} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: '#991B1B' }}>
                Jangan ramai sendiri ya!
              </span>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Waktunya Pameran: Giliranmu di Panggung Utama!
// ============================================================================
const Slide09WaktunyaPameran: Page = () => {
  const live = useIsActivePage();
  const [page, setPage] = useState<1 | 2 | 3>(1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (page === 1) {
      const t = setTimeout(() => setPage(2), 1300);
      return () => clearTimeout(t);
    }
    if (page === 2) {
      const t = setTimeout(() => setPage(3), 1300);
      return () => clearTimeout(t);
    }
    if (page === 3) {
      const t = setTimeout(() => setPlaying(false), 1500);
      return () => clearTimeout(t);
    }
  }, [playing, page]);

  const startDemo = () => {
    setPage(1);
    setPlaying(true);
  };

  return (
    <JuniorFrame badge="WAKTUNYA PAMERAN!" accentDot={SUNNY}>
      <SlideTitle>
        Giliranmu di <Highlight>Panggung Utama!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Exhibition Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'mic' as JuniorIconName,
            text: (
              <>
                Maju ke depan &amp; <strong>Sapa Penonton</strong>
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'fullscreen' as JuniorIconName,
            text: (
              <>
                Putar <strong>Buku Digitalmu</strong> di Layar Penuh
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'clap' as JuniorIconName,
            text: (
              <>
                Terima <strong>Tepuk Tangan</strong> Meriah!
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
            <div style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.24 }}>
              <JuniorIcon name={item.icon} size={28} style={{ marginRight: 8 }} />
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Exhibition Spotlight Stage (Fullscreen ScratchJr Presentation + Cheering Mascots) */}
      <MacWindowCard
        left={X0}
        top={400}
        width={1260}
        height={565}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Panggung Pameran CODEPOLITAN Junior — Mode Layar Penuh"
        padding={22}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <AuthenticScratchJrUI
              page={page}
              fullscreen
              onRunStory={startDemo}
              activeStoryStep={playing}
              width="100%"
              height="100%"
            />
          </div>
          <button
            type="button"
            onClick={startDemo}
            className="cpj22-card-btn"
            style={{
              padding: '12px 24px',
              borderRadius: 18,
              background: TEAL,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 4px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
              ...row,
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <JuniorIcon name="flag" size={26} />
            <span>{playing ? `Memutar Halaman ${page}...` : 'Putar Pameran Buku 3 Halaman!'}</span>
          </button>
        </div>
      </MacWindowCard>

      {/* Cheering Biko & Tic */}
      <div style={{ ...abs(1385, 420, 460, 520), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 2 }}>
          <BikoMascot
            pose="thumbs-up"
            width={280}
            badgeIcon={<JuniorIcon name="clap" size={22} />}
            speechBubble="Semangat!"
          />
          <div style={{ animation: live ? 'cpj22-hop 2s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <TicCatSvg size={160} waving speechBubble="Bravo!" />
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Tertinggi & Wisuda Level 1!
// ============================================================================
const Slide10Wisuda: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="SELAMAT LULUS LEVEL 1!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj22-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj22-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="star-glow" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj22-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={120} size={56}>
        Selamat! Kamu <Highlight>Pendongeng &amp; Coder Cilik!</Highlight>{' '}
        <JuniorIcon name="grad-cap" size={50} /> <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Grand Celebration Center Card */}
      <MacWindowCard
        left={240}
        top={240}
        width={1080}
        height={710}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Wisuda Level 1: Code Explorer • Pertemuan 22"
        padding={34}
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
          {/* Bespoke Grand Gold Trophy & Medal SVG engraved with CODEPOLITAN JUNIOR */}
          <div style={{ animation: live ? 'cpj22-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={285} height={275} viewBox="0 0 260 250" fill="none">
              <path d="M90 165 L72 232 L104 212 L120 234 L124 170 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M170 165 L188 232 L156 212 L140 234 L136 170 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="130" cy="112" r="88" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="130" cy="112" r="73" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Golden Trophy inside Medal */}
              <path d="M96 76 H164 V108 C164 128, 149 140, 130 140 C111 140, 96 128, 96 108 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M96 84 C78 84, 76 110, 96 112" fill="none" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
              <path d="M164 84 C182 84, 184 110, 164 112" fill="none" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
              <rect x="122" y="138" width="16" height="18" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.2} />
              <rect x="104" y="155" width="52" height="14" rx="5" fill={CHARCOAL} />
              {/* Center Star on Trophy */}
              <path
                d="M130 84 L134 95 L146 97 L137 104 L139 116 L130 110 L121 116 L123 104 L114 97 L126 95 Z"
                fill={WHITE}
                stroke={CHARCOAL}
                strokeWidth={2.2}
                strokeLinejoin="round"
              />
              {/* Bottom Ribbon Banner: CODEPOLITAN JUNIOR */}
              <rect x="44" y="176" width="172" height="30" rx="12" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} />
              <text x="130" y="196" textAnchor="middle" fill={WHITE} fontSize="13.5" fontWeight="800" fontFamily="Fredoka, sans-serif">
                CODEPOLITAN JUNIOR
              </text>
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
            <JuniorIcon name="trophy" size={34} />
            <span>Lencana Utama Code Explorer</span>
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
            Kamu hebat berani bercerita &amp; berkarya di depan{' '}
            <Highlight color="#D1FAE5">Ayah &amp; Bunda!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Graduated Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1355, 415, 490, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 95, top: -22, zIndex: 4 }}>
              <JuniorIcon name="grad-cap" size={76} />
            </div>
            <BikoMascot
              pose="jump"
              width={295}
              badgeIcon={<JuniorIcon name="trophy" size={22} />}
              speechBubble="Lulus Level 1!"
            />
          </div>
          <div style={{ animation: live ? 'cpj22-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <TicCatSvg size={185} waving gradCap speechBubble="Wisuda!" />
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
  `Selamat datang di Pertemuan 22 — Panggung Pendongeng Cilik! 🎤🎉
Hari ini adalah hari istimewa! Anak-anak akan memamerkan Buku Cerita Digital 3 Halaman mereka dan lulus Level 1 Code Explorer!`,

  `Dua misi spesial hari ini:
1. Memutar Buku Cerita Digital di mode Layar Penuh ScratchJr.
2. Menceritakan karya dengan percaya diri di depan Ayah, Bunda, dan teman-teman!`,

  `Jejak Perjalanan Hebatku:
Ajak anak-anak & orang tua melihat kembali pencapaian luar biasa sejak Pertemuan 1 (mengenal laptop & klik) hingga Pertemuan 21 (membuat buku cerita 3 halaman)!`,

  `Cek Siap Tampil:
Pastikan setiap anak membuka proyek Buku Cerita 3 Halaman, mengetuk Halaman 1 di panel kanan agar mulai dari awal, lalu klik ikon Layar Penuh di toolbar atas!`,

  `Jurus Pendongeng Cilik — 3 Langkah Cerita Seru:
1. Sapa & Senyum: "Halo Ayah, Bunda & Teman!"
2. Klik Bendera Hijau untuk memutar cerita.
3. Ceritakan isi Halaman 1, 2, dan 3 dengan suara ceria!`,

  `Pemanasan Seru! Ayo tebak bersama:
Mana gaya pendongeng hebat — Pilihan A (Senyum & Suara Jelas) atau Pilihan B (Malu & Berbisik)? Latih senyum bersama sebelum tampil!`,

  `Rahasia di Balik Layar:
Setelah selesai memutar cerita, keluar dari Layar Penuh dan pamerkan rangkaian blok kode warna-warni buatan sendiri kepada Ayah & Bunda!`,

  `Aturan Penonton Jempolan:
BOLEH perhatikan teman yang bercerita dan beri tepuk tangan meriah setelah selesai.
JANGAN mengobrol sendiri atau berlari-lari di depan panggung saat teman sedang presentasi!`,

  `Waktunya Pameran — Giliranmu di Panggung Utama!
Panggil anak-anak satu per satu ke panggung utama: 1. Sapa Penonton, 2. Putar Buku Digital di Layar Penuh, 3. Terima Tepuk Tangan Meriah!`,

  `Selamat Wisuda Level 1: Code Explorer! 🎓🏆🎉
Semua anak hebat resmi meraih Lencana Utama Code Explorer karena berani bercerita dan berkarya di depan Ayah & Bunda!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 22 — Panggung Pendongeng Cilik!',
  createdAt: '2026-11-16T14:04:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03JejakBelajar,
  Slide04CekSiapTampil,
  Slide05JurusPendongeng,
  Slide06Pemanasan,
  Slide07TunjukkanKode,
  Slide08PenontonJempolan,
  Slide09WaktunyaPameran,
  Slide10Wisuda,
] satisfies Page[];

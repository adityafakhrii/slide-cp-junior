import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-25-langit-yang-tak-pernah-tidur';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj25-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj25-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj25-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj25-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj25-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj25-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.85); }
  50% { box-shadow: 0 0 0 14px rgba(251, 191, 36, 0); }
}
@keyframes cpj25-spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes cpj25-fly-loop {
  0% { transform: translateX(-80px) translateY(0px); opacity: 0; }
  12% { opacity: 1; }
  50% { transform: translateX(170px) translateY(-14px); opacity: 1; }
  88% { opacity: 1; }
  100% { transform: translateX(420px) translateY(0px); opacity: 0; }
}
.cpj25-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj25-card-btn:hover {
  transform: translateY(-4px);
}
.cpj25-card-btn:active {
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
  accentDot = SKY,
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
          animation: live ? 'cpj25-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: SKY,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 25 • Langit yang Tak Pernah Tidur!</span>
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
// Reusable Pertemuan 25 Visuals (Smiling Sun, Flying Bird, Sky Stage, Blocks)
// ============================================================================

const SmilingSunSvg = ({ size = 110, spinning = false }: { size?: number; spinning?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 140 140"
    fill="none"
    style={{ animation: spinning ? 'cpj25-spin-slow 7s linear infinite' : undefined }}
  >
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
      <polygon
        key={deg}
        points="70,6 62,24 78,24"
        fill={SUNNY}
        stroke={CHARCOAL}
        strokeWidth={2.8}
        strokeLinejoin="round"
        transform={`rotate(${deg} 70 70)`}
      />
    ))}
    <circle cx="70" cy="70" r="40" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} />
    <circle cx="56" cy="64" r="4.2" fill={CHARCOAL} />
    <circle cx="84" cy="64" r="4.2" fill={CHARCOAL} />
    <circle cx="48" cy="74" r="5" fill="#FCA5A5" />
    <circle cx="92" cy="74" r="5" fill="#FCA5A5" />
    <path d="M56 76 Q70 88 84 76" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" fill="none" />
  </svg>
);

const FlyingBirdSvg = ({ size = 96, flying = false }: { size?: number; flying?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 130 115"
    fill="none"
    style={{ animation: flying ? 'cpj25-fly-loop 4.5s linear infinite' : undefined }}
  >
    <path d="M26 58 L6 43 L15 60 L6 72 L30 67 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
    <ellipse cx="62" cy="58" rx="34" ry="27" fill={SKY} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="68" cy="65" rx="20" ry="15" fill="#E0F2FE" />
    <path d="M40 50 C30 34, 52 24, 62 46 C64 53, 56 64, 44 61 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.4} />
    <polygon points="94,48 117,56 94,63" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.4} strokeLinejoin="round" />
    <path d="M58 29 Q62 14 70 26" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" fill="none" />
    <circle cx="79" cy="46" r="4.5" fill={CHARCOAL} />
    <circle cx="80.5" cy="44.5" r="1.5" fill={WHITE} />
  </svg>
);

const SkyParkBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 480 260" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="480" height="260" fill="#BAE6FD" />
    {/* Fluffy White Clouds */}
    <path d="M55 82 C42 82, 40 62, 54 58 C58 42, 82 38, 92 50 C104 42, 122 50, 118 64 C128 68, 125 82, 112 82 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    <path d="M295 104 C284 104, 282 88, 294 84 C298 70, 318 68, 326 78 C336 70, 352 78, 348 90 C356 94, 353 104, 342 104 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    {/* Green Park Hills */}
    <path d="M0 176 Q140 144 260 176 Q380 202 480 168 V260 H0 Z" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M0 206 Q190 186 480 204 V260 H0 Z" fill="#4ADE80" stroke={CHARCOAL} strokeWidth={2.6} />
  </svg>
);

const TicCatSvg = ({ size = 135, waving = false }: { size?: number; waving?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <ellipse cx="70" cy="126" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path d="M96 98 C118 96, 126 76, 114 66 C106 60, 100 68, 104 75 C106 80, 100 88, 92 88" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
    <ellipse cx="56" cy="118" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="118" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="70" cy="95" rx="27" ry="24" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="70" cy="97" rx="16" ry="15" fill={SUNNY_SOFT} />
    <path d={waving ? 'M44 82 C26 74, 22 58, 30 52 C37 47, 45 58, 46 72' : 'M45 86 C32 90, 32 104, 42 104 C48 104, 50 96, 48 88'} fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <path d="M94 86 C107 90, 107 104, 97 104 C91 104, 89 96, 91 88" fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
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

type SkyBlockKind = 'start-flag' | 'turn-right' | 'move-right' | 'repeat-forever' | 'end-plain';

const ScratchJrBlock = ({
  kind,
  num = 1,
  scale = 1,
  activeGlow = false,
}: {
  kind: SkyBlockKind;
  num?: number;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-flag';
  const isEndCap = kind === 'repeat-forever' || kind === 'end-plain';
  const fill = kind === 'start-flag' ? SUNNY : isEndCap ? CORAL : SKY;
  const w = Math.round(134 * scale);
  const h = Math.round(118 * scale);

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

        {kind === 'start-flag' && (
          <>
            <line x1="48" y1="30" x2="48" y2="90" stroke={CHARCOAL} strokeWidth={5.5} strokeLinecap="round" />
            <path d="M50 33 C68 27, 84 40, 98 35 V62 C84 68, 68 54, 50 61 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
          </>
        )}

        {kind === 'move-right' && (
          <path d="M36 53 H72 V38 L104 60 L72 82 V67 H36 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {kind === 'turn-right' && (
          <path d="M46 66 A24 24 0 1 1 88 74 M80 62 L92 75 L76 80" fill="none" stroke={WHITE} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* Red Repeat Forever: Dual Looping Arrows */}
        {kind === 'repeat-forever' && (
          <>
            <path d="M44 55 A24 24 0 0 1 92 43 M92 33 V48 H77" fill="none" stroke={WHITE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M96 65 A24 24 0 0 1 48 77 M48 87 V72 H63" fill="none" stroke={SUNNY_SOFT} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}

        {/* Red End Plain */}
        {kind === 'end-plain' && (
          <circle cx="70" cy="60" r="14" fill="rgba(255,255,255,0.28)" stroke={WHITE} strokeWidth={3.2} />
        )}
      </svg>

      {(kind === 'move-right' || kind === 'turn-right') && (
        <div
          style={{
            marginTop: Math.round(-16 * scale),
            minWidth: Math.round(42 * scale),
            height: Math.round(28 * scale),
            borderRadius: Math.round(9 * scale),
            background: WHITE,
            border: `2.6px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(17 * scale),
            fontWeight: 700,
            ...centerCol,
            padding: '0 6px',
            zIndex: 2,
          }}
        >
          {num}
        </div>
      )}
    </div>
  );
};

/** Authentic ScratchJr Tablet Interface for Pertemuan 25 Infinite Sky */
const AuthenticScratchJrUI = ({
  spotlight = 'none',
  selectedChar = 'sun',
  onSelectChar,
  playing = true,
  onTogglePlay,
  width = 880,
  height = 540,
}: {
  spotlight?: 'none' | 'red-category' | 'stop-btn';
  selectedChar?: 'sun' | 'bird';
  onSelectChar?: (c: 'sun' | 'bird') => void;
  playing?: boolean;
  onTogglePlay?: (next: boolean) => void;
  width?: number | string;
  height?: number | string;
}) => {
  const ringStyle = (on: boolean): CSSProperties =>
    on
      ? {
          outline: `5px solid ${SUNNY}`,
          outlineOffset: 2,
          animation: 'cpj25-pulse 1.6s infinite',
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
          {/* Stop Button / Green Flag Toggle */}
          <button
            type="button"
            onClick={() => onTogglePlay?.(false)}
            className={onTogglePlay ? 'cpj25-card-btn' : undefined}
            title="Tombol Stop Merah"
            style={{
              width: 40,
              height: 36,
              borderRadius: 10,
              background: CORAL_SOFT,
              border: `2px solid ${CORAL}`,
              ...centerCol,
              padding: 0,
              ...ringStyle(spotlight === 'stop-btn'),
            }}
          >
            <JuniorIcon name="stop" size={22} />
          </button>
          <button
            type="button"
            onClick={() => onTogglePlay?.(true)}
            className={onTogglePlay ? 'cpj25-card-btn' : undefined}
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
          Langit Cerah
        </div>
      </div>

      {/* Middle 3-Column Row */}
      <div style={{ flex: 1, display: 'flex', gap: 10, minHeight: 0 }}>
        {/* Left Character Panel */}
        <div
          style={{
            width: 100,
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
            onClick={() => onSelectChar?.('sun')}
            className={onSelectChar ? 'cpj25-card-btn' : undefined}
            style={{
              width: '100%',
              height: 64,
              borderRadius: 12,
              background: WHITE,
              border: `3px solid ${selectedChar === 'sun' ? SUNNY : CHARCOAL}`,
              ...centerCol,
              position: 'relative',
              padding: 0,
            }}
          >
            <SmilingSunSvg size={48} />
            <div style={{ position: 'absolute', right: -4, top: -4, width: 20, height: 20, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
              <JuniorIcon name="paintbrush" size={11} />
            </div>
          </button>

          <button
            type="button"
            onClick={() => onSelectChar?.('bird')}
            className={onSelectChar ? 'cpj25-card-btn' : undefined}
            style={{
              width: '100%',
              height: 64,
              borderRadius: 12,
              background: WHITE,
              border: `3px solid ${selectedChar === 'bird' ? SUNNY : CHARCOAL}`,
              ...centerCol,
              padding: 0,
            }}
          >
            <FlyingBirdSvg size={48} />
          </button>

          <div style={{ marginTop: 'auto', opacity: 0.85 }}>
            <JuniorIcon name="plus-circle" size={28} />
          </div>
        </div>

        {/* Center Sky Stage */}
        <div style={{ flex: 1, borderRadius: 18, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
          <SkyParkBackdropSvg />
          <div style={{ position: 'absolute', right: 30, top: 18 }}>
            <SmilingSunSvg size={95} spinning={playing} />
          </div>
          <div style={{ position: 'absolute', left: 30, top: 68 }}>
            <FlyingBirdSvg size={82} flying={playing} />
          </div>
        </div>

        {/* Right Page Thumbnail */}
        <div
          style={{
            width: 92,
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
          <div style={{ width: '100%', height: 60, borderRadius: 12, border: `2.5px solid ${SUNNY}`, overflow: 'hidden', position: 'relative' }}>
            <SkyParkBackdropSvg />
            <span style={{ position: 'absolute', right: 3, top: 3, width: 20, height: 20, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 12, fontWeight: 700, ...centerCol }}>
              1
            </span>
          </div>
          <JuniorIcon name="plus-circle" size={28} />
        </div>
      </div>

      {/* Bottom Coding Palette & Script Area */}
      <div
        style={{
          height: 132,
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
              const isRed = d === 'dot-red';
              return (
                <div
                  key={d}
                  style={{
                    padding: 2,
                    borderRadius: 99,
                    background: isRed ? WHITE : 'transparent',
                    border: isRed ? `2px solid ${CHARCOAL}` : '2px solid transparent',
                    ...centerCol,
                    ...ringStyle(spotlight === 'red-category' && isRed),
                  }}
                >
                  <JuniorIcon name={d} size={22} />
                </div>
              );
            })}
          </div>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 13, fontWeight: 700, color: MUTED }}>
            Kode {selectedChar === 'sun' ? 'Matahari' : 'Burung'}: Tak Berhenti!
          </span>
        </div>

        <div style={{ flex: 1, padding: '4px 14px', ...row, alignItems: 'flex-start', overflow: 'hidden' }}>
          <ScratchJrBlock kind="start-flag" scale={0.72} />
          <div style={{ marginLeft: -12 }}>
            <ScratchJrBlock kind={selectedChar === 'sun' ? 'turn-right' : 'move-right'} num={1} scale={0.72} />
          </div>
          <div style={{ marginLeft: -12 }}>
            <ScratchJrBlock kind="repeat-forever" scale={0.72} activeGlow={playing} />
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
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 25" accentDot={SKY}>
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
            background: SKY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#1D4ED8',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="cloud-sun" size={24} />
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
          Langit yang
          <br />
          <Highlight>Tak Pernah Tidur!</Highlight>
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
          Animasi Matahari Berputar &amp; Burung Terbang Selamanya
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
            <JuniorIcon name="infinity" size={28} />
            <span>Repeat Forever</span>
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
            <JuniorIcon name="sun" size={28} />
            <span>Animasi Langit!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Sky Backdrop Frame + Authentic ScratchJr Sky Stage + Biko */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 200px 56px 56px',
            background: 'linear-gradient(160deg, #E0F2FE 0%, #FEF9C3 55%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SKY}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 145, zIndex: 2 }}>
          <AuthenticScratchJrUI playing={live} width={590} height={420} />
        </div>

        <div
          style={{
            position: 'absolute',
            left: -18,
            bottom: 30,
            zIndex: 3,
            animation: live ? 'cpj25-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="sun" size={24} />}
            speechBubble="Terus berputar!"
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
    <JuniorFrame badge="MISI HARI INI" accentDot={CORAL}>
      <SlideTitle>
        Apa Misi Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Animasi Selamanya • Pertemuan 25"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu 1 (Coral) */}
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
            <div style={{ padding: '8px 22px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ width: 245, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol }}>
              <ScratchJrBlock kind="repeat-forever" scale={1.3} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Kenali <span style={{ color: '#B91C1C' }}>Blok Repeat Forever</span> (<em>Selamanya</em>)
            </div>
          </div>

          {/* Kartu 2 (Biru) */}
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
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ width: 265, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 10 }}>
              <SmilingSunSvg size={110} spinning={live} />
              <FlyingBirdSvg size={100} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Bikin <span style={{ color: '#1D4ED8' }}>Matahari Berputar</span> &amp;{' '}
              <span style={{ color: '#1D4ED8' }}>Burung Terbang!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj25-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="infinity" size={24} />}
          speechBubble="Tanpa henti!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Kenalan Sama Blok Merah Repeat Forever!
// ============================================================================
const Slide03BlokRepeatForever: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="BLOK AJAIB BARU" accentDot={CORAL}>
      <SlideTitle>
        Ini Namanya <Highlight>Repeat Forever!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Red Category in ScratchJr Palette */}
      <MacWindowCard
        left={X0}
        top={235}
        width={880}
        height={720}
        titleBarColor={CORAL_SOFT}
        headerLabel="Palet ScratchJr — Kategori Merah (Akhir)"
        padding={26}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <AuthenticScratchJrUI spotlight="red-category" playing={live} width="100%" height={440} />

          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ ...row, gap: 16 }}>
              <ScratchJrBlock kind="repeat-forever" scale={1.1} activeGlow />
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: '#991B1B' }}>
                Panah Berputar Tanpa Henti!
              </div>
            </div>
            <div style={{ animation: live ? 'cpj25-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot
                pose="thumbs-up"
                width={150}
                badgeIcon={<JuniorIcon name="dot-red" size={18} />}
                speechBubble="Klik merah!"
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
        headerLabel="Fungsi Repeat Forever"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="dot-red" bgColor={CORAL_SOFT} fontSize={34}>
              Ada di rak <strong>Blok Merah</strong> paling ujung
            </BulletRow>
            <BulletRow icon="infinity" bgColor={SUNNY_SOFT} fontSize={34}>
              Mengulang gerakan <strong>Terus-Menerus Tanpa Henti!</strong>
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: CORAL_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Sekali klik Bendera Hijau, seluruh rangkaian di belakang Bendera akan diulang terus selamanya!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Bedanya Repeat vs Repeat Forever!
// ============================================================================
const Slide04BedanyaRepeat: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="RAHASIA CODER" accentDot={ORANGE}>
      <SlideTitle>
        Berhenti vs <Highlight>Selamanya!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={230}
        width={1720}
        height={735}
        titleBarColor={CREAM}
        headerLabel="Perbandingan Repeat [4] vs Repeat Forever"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Kartu Atas — Repeat Oranye */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: ORANGE_SOFT,
              border: `4px solid ${ORANGE}`,
              boxShadow: `0 7px 0 ${ORANGE}`,
              padding: '24px 36px',
              ...row,
              justifyContent: 'space-between',
              gap: 32,
            }}
          >
            <div style={{ ...row, gap: 28, flex: 1 }}>
              <div style={{ padding: '14px 24px', borderRadius: 22, background: ORANGE, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, ...row, gap: 12 }}>
                <JuniorIcon name="repeat" size={38} />
                <span>Repeat [ 4 ]</span>
              </div>
              <div style={{ ...row, gap: 16, fontSize: 34, fontWeight: 800 }}>
                <JuniorIcon name="numbers" size={44} />
                <span>
                  Mengulang <strong>4 Kali</strong> lalu <strong>Berhenti</strong>
                </span>
              </div>
            </div>

            <div style={{ ...row, gap: 14 }}>
              {[1, 2, 3, 4].map((n) => (
                <div key={n} style={{ width: 62, height: 62, borderRadius: 18, background: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
                  {n}
                </div>
              ))}
              <BikoMascot pose="point-left" width={135} badgeIcon={<JuniorIcon name="stop" size={16} />} speechBubble="Stop di 4!" />
            </div>
          </div>

          {/* Kartu Bawah — Repeat Forever Merah */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: CORAL_SOFT,
              border: `4px solid ${CORAL}`,
              boxShadow: `0 7px 0 ${CORAL}`,
              padding: '24px 36px',
              ...row,
              justifyContent: 'space-between',
              gap: 32,
            }}
          >
            <div style={{ ...row, gap: 28, flex: 1 }}>
              <ScratchJrBlock kind="repeat-forever" scale={1.15} />
              <div style={{ ...row, gap: 16, fontSize: 34, fontWeight: 800 }}>
                <JuniorIcon name="infinity" size={46} />
                <span>
                  Mengulang <strong>Terus Selamanya</strong> tanpa berhenti!
                </span>
              </div>
            </div>

            <div style={{ ...row, gap: 22 }}>
              <div style={{ animation: live ? 'cpj25-spin-slow 5s linear infinite' : undefined }}>
                <JuniorIcon name="star-glow" size={92} />
              </div>
              <div style={{ padding: '12px 24px', borderRadius: 99, background: CORAL, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
                Jalan Terus!
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Animasi #1: Matahari Berputar Terus!
// ============================================================================
const Slide05AnimasiMatahari: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="ANIMASI LANGIT #1" accentDot={SUNNY}>
      <SlideTitle>
        Bikin <Highlight>Matahari Berputar!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Spinning Sun + 3 Blocks */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Kode Matahari Berputar Selamanya"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '100%', height: 340, borderRadius: 24, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden', ...centerCol }}>
            <SkyParkBackdropSvg />
            <div style={{ position: 'absolute', ...centerCol }}>
              <SmilingSunSvg size={220} spinning={live} />
            </div>
          </div>

          <div style={{ ...row, alignItems: 'flex-start', justifyContent: 'center' }}>
            <ScratchJrBlock kind="start-flag" scale={1.3} />
            <div style={{ marginLeft: -18 }}>
              <ScratchJrBlock kind="turn-right" num={1} scale={1.3} />
            </div>
            <div style={{ marginLeft: -18 }}>
              <ScratchJrBlock kind="repeat-forever" scale={1.3} activeGlow />
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
        headerLabel="Cara Membuat Matahari Berputar"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="sun" bgColor={SUNNY_SOFT} fontSize={33}>
              Pasang karakter <strong>Matahari</strong> di langit atas
            </BulletRow>
            <BulletRow icon="puzzle" bgColor={SKY_SOFT} fontSize={33}>
              Rangkai: <strong>Bendera Hijau</strong> &rarr; <strong>Putar 1</strong> &rarr; <strong>Repeat Forever</strong>
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="turn-right" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Putar angka <strong>1</strong> yang diulang selamanya membuat Matahari berputar halus dan hangat!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Pilih Blok yang Benar!
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1600} top={120} size={52}>
        Blok Mana Biar Burung Terbang <Highlight>Selamanya?</Highlight>
      </SlideTitle>

      {/* Visual Code Question Strip */}
      <div
        style={{
          ...abs(340, 210, 1240, 124),
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
        <ScratchJrBlock kind="move-right" num={1} scale={0.78} />
        <JuniorIcon name="arrow-right" size={32} />
        <div style={{ width: 112, height: 86, borderRadius: 18, background: CORAL_SOFT, border: `3.5px dashed ${CORAL}`, ...centerCol, fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CORAL }}>
          ?
        </div>
      </div>

      {/* Choice Cards */}
      <div style={{ ...abs(190, 358, 1540, 385), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Repeat Forever) */}
        <button
          type="button"
          onClick={() => setPicked('A')}
          className="cpj25-card-btn"
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
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN A
          </div>

          <div style={{ marginTop: 14 }}>
            <ScratchJrBlock kind="repeat-forever" scale={1.45} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Repeat Forever
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '6px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 20, fontWeight: 800 }}>
              <JuniorIcon name="check" size={22} />
              <span>Benar! Panah melingkar terbang selamanya!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: End Plain) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj25-card-btn"
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
            animation: picked === 'B' ? 'cpj25-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 14 }}>
            <ScratchJrBlock kind="end-plain" scale={1.45} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Blok Selesai
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '6px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 20, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={22} />
              <span>Ups! Blok Selesai membuat burung langsung berhenti!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 760, 1540, 240), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj25-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={205}
            badgeIcon={<JuniorIcon name="question" size={20} />}
            speechBubble={picked === 'A' ? 'Pintar!' : 'Yang mana?'}
          />
        </div>
        <div style={{ padding: '20px 34px', borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...row, gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
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
// SLIDE 07 — Animasi #2: Burung Terbang Selamanya!
// ============================================================================
const Slide07AnimasiBurung: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="ANIMASI LANGIT #2" accentDot={SKY}>
      <SlideTitle>
        Burung <Highlight>Terbang Melintasi Langit!</Highlight>
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Kode Burung Terbang"
        padding={38}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 10 }}>
            <BulletRow icon="bird" bgColor={SKY_SOFT} fontSize={31}>
              Pasang karakter <strong>Burung</strong> di langit
            </BulletRow>
            <BulletRow icon="puzzle" bgColor={CORAL_SOFT} fontSize={31}>
              Rangkai: <strong>Bendera</strong> &rarr; <strong>Maju 1</strong> &rarr; <strong>Repeat Forever</strong>
            </BulletRow>
            <BulletRow icon="sparkle" bgColor={SUNNY_SOFT} fontSize={31}>
              Burung terbang <strong>Muncul Lagi &amp; Lagi!</strong>
            </BulletRow>
          </div>

          <div style={{ padding: '18px 26px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, justifyContent: 'center' }}>
            <ScratchJrBlock kind="start-flag" scale={1.08} />
            <div style={{ marginLeft: -14 }}>
              <ScratchJrBlock kind="move-right" num={1} scale={1.08} />
            </div>
            <div style={{ marginLeft: -14 }}>
              <ScratchJrBlock kind="repeat-forever" scale={1.08} activeGlow />
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Card: Bird wrapping across sky */}
      <MacWindowCard
        left={980}
        top={235}
        width={840}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Panggung Langit ScratchJr — Terbang Tanpa Henti"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '100%', height: 470, borderRadius: 24, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <SkyParkBackdropSvg />
            <div style={{ position: 'absolute', left: 90, top: 110 }}>
              <FlyingBirdSvg size={150} flying={live} />
            </div>
          </div>

          <div style={{ padding: '12px 28px', borderRadius: 99, background: TEAL_SOFT, border: `3px solid ${TEAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700, color: '#065F46' }}>
            Keluar di kanan layar, muncul lagi di kiri!
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Animasi Tanpa Henti (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsAnimasi: Page = () => {
  return (
    <JuniorFrame badge="TIPS JAGOAN ANIMASI" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Langit <Highlight>Hidup Terus!</Highlight>
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
            <BulletRow icon="dot-red" bgColor={CORAL_SOFT} fontSize={30}>
              Taruh <strong>Repeat Forever</strong> di <strong>Paling Ujung</strong>
            </BulletRow>
            <BulletRow icon="stop" bgColor={TEAL_SOFT} fontSize={30}>
              Tekan <strong>Tombol Stop Merah</strong> di atas jika ingin berhenti
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', padding: '0 24px' }}>
            <div style={{ padding: '16px 24px', borderRadius: 20, background: '#DBEAFE', border: `3px solid ${CHARCOAL}`, ...row, gap: 16 }}>
              <div style={{ width: 64, height: 58, borderRadius: 14, background: CORAL_SOFT, border: `3px solid ${CORAL}`, ...centerCol }}>
                <JuniorIcon name="stop" size={38} />
              </div>
              <div style={{ width: 64, height: 58, borderRadius: 14, background: TEAL_SOFT, border: `3px solid ${TEAL}`, ...centerCol }}>
                <JuniorIcon name="flag" size={38} />
              </div>
            </div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700, color: '#065F46', maxWidth: 260 }}>
              Tombol Stop Merah ada tepat di sebelah Bendera Hijau!
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
              Menempelkan blok lain <strong>Setelah</strong> Repeat Forever
            </BulletRow>
            <BulletRow icon="flag" bgColor={SUNNY_SOFT} fontSize={30}>
              Lupa menekan <strong>Bendera Hijau</strong> untuk mulai
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', padding: '0 24px' }}>
            <div style={{ ...row, alignItems: 'center', gap: 10 }}>
              <ScratchJrBlock kind="repeat-forever" scale={1.0} />
              <div style={{ padding: '10px 14px', borderRadius: 14, background: WHITE, border: `3px dashed ${CORAL}` }}>
                <JuniorIcon name="cross" size={44} />
              </div>
            </div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: '#991B1B', maxWidth: 250 }}>
              Sisi kanan blok merah rata — tidak bisa disambung lagi!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Langit yang Tak Pernah Tidur!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const [selectedChar, setSelectedChar] = useState<'sun' | 'bird'>('sun');
  const [playing, setPlaying] = useState(true);

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Langit Tak Pernah Tidur!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'cloud-sun' as JuniorIconName,
            text: (
              <>
                Pasang latar <strong>Langit / Taman</strong> + <strong>Matahari &amp; Burung</strong>
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
                Rangkai <strong>Bendera + Gerak + Repeat Forever</strong> di keduanya
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
                Klik <strong>Bendera Hijau!</strong> Lihat langit hidup selamanya!
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
            <div style={{ width: 56, height: 56, borderRadius: 18, background: item.badgeBg, color: item.badgeText, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
              {item.num}
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.24 }}>
              <JuniorIcon name={item.icon} size={26} style={{ marginRight: 8 }} />
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Authentic Interactive ScratchJr Sky Workspace */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratchJrUI
          selectedChar={selectedChar}
          onSelectChar={setSelectedChar}
          playing={playing}
          onTogglePlay={setPlaying}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Play/Stop Toggle */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 18 }}>
        <BikoMascot
          pose="thumbs-up"
          width={345}
          badgeIcon={<JuniorIcon name="infinity" size={24} />}
          speechBubble={playing ? 'Hidup terus!' : 'Berhenti!'}
        />
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="cpj25-card-btn"
          style={{
            padding: '14px 26px',
            borderRadius: 20,
            background: playing ? CORAL : TEAL,
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
          <JuniorIcon name={playing ? 'stop' : 'flag'} size={26} />
          <span>{playing ? 'Klik Stop Merah' : 'Klik Bendera Hijau!'}</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 25 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj25-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj25-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sun" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj25-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={58}>
        Hore! Kamu <Highlight>Animator Langit Hebat!</Highlight>{' '}
        <JuniorIcon name="party" size={52} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 25"
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
          {/* Bespoke Golden Sun, Bird & Infinity Arrows Medal SVG */}
          <div style={{ animation: live ? 'cpj25-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill="#E0F2FE" stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Smiling Mini Sun */}
              <circle cx="144" cy="84" r="22" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.4} />
              <circle cx="138" cy="81" r="2.2" fill={CHARCOAL} />
              <circle cx="150" cy="81" r="2.2" fill={CHARCOAL} />
              <path d="M138 89 Q144 94 150 89" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" fill="none" />
              {/* Mini Blue Bird */}
              <ellipse cx="92" cy="104" rx="22" ry="16" fill={SKY} stroke={CHARCOAL} strokeWidth={3.2} />
              <polygon points="113,100 125,105 113,109" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.4} strokeLinejoin="round" />
              <circle cx="104" cy="99" r="2.5" fill={CHARCOAL} />
              {/* Infinity / Repeat Forever Symbol Below */}
              <path
                d="M92 138 C92 128, 108 128, 120 138 C132 148, 148 148, 148 138 C148 128, 132 128, 120 138 C108 148, 92 148, 92 138 Z"
                fill="none"
                stroke={CORAL}
                strokeWidth={5.5}
                strokeLinecap="round"
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
            <span>Lencana Animator Repeat Forever</span>
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
            Kamu sudah jago membuat gerakan{' '}
            <Highlight color="#D1FAE5">Tanpa Henti (Infinite Loop)!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="infinity" size={22} />}
            speechBubble="Tak Pernah Tidur!"
          />
          <div style={{ animation: live ? 'cpj25-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 25 — Langit yang Tak Pernah Tidur! 🌤️
Hari ini kita akan membuat langit yang terus hidup: Matahari berputar hangat dan Burung terbang tanpa henti menggunakan Blok Merah Repeat Forever!`,

  `Dua misi seru hari ini:
1. Mengenal Blok Merah Repeat Forever (mengulang selamanya).
2. Membuat animasi Matahari Berputar dan Burung Terbang tanpa henti!`,

  `Kenalan sama Blok Merah Repeat Forever:
Tunjukkan lingkaran kategori berwarna Merah paling ujung di ScratchJr, lalu tarik keluar blok merah bergambar dua panah melingkar!`,

  `Bedanya Repeat vs Repeat Forever:
- Blok Oranye Repeat [ 4 ] hanya mengulang 4 kali lalu berhenti.
- Blok Merah Repeat Forever mengulang terus-menerus selamanya tanpa berhenti!`,

  `Animasi #1 — Matahari Berputar Terus!
Pasang karakter Matahari di langit atas, lalu rangkai: Bendera Hijau -> Putar 1 -> Blok Merah Repeat Forever!`,

  `Permainan Cepat! Ayo tebak bersama:
Blok mana biar Burung terbang selamanya — Pilihan A (Repeat Forever panah melingkar) atau Pilihan B (Blok Selesai polos)?`,

  `Animasi #2 — Burung Terbang Selamanya!
Rangkai Bendera Hijau -> Maju 1 -> Repeat Forever pada Burung! Saat burung terbang keluar di kanan layar, burung akan muncul kembali di kiri terus-menerus!`,

  `Tips Jagoan Animasi Tanpa Henti:
BOLEH taruh Repeat Forever di paling ujung dan tekan Tombol Stop Merah di toolbar atas saat ingin menghentikan animasi.
JANGAN mencoba menempelkan blok lain setelah Repeat Forever atau lupa menekan Bendera Hijau!`,

  `Waktunya Misi Praktik Langit Tak Pernah Tidur:
1. Pasang latar Langit + karakter Matahari & Burung. 2. Rangkai Bendera + Gerak + Repeat Forever di keduanya. 3. Klik Bendera Hijau & tombol Stop Merah untuk mengujinya!`,

  `Selamat untuk semua Animator Langit Hebat! 🎉
Kalian berhasil menguasai Infinite Loop dasar dan meraih Lencana Animator Repeat Forever di Pertemuan 25!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 25 — Langit yang Tak Pernah Tidur!',
  createdAt: '2026-11-16T14:17:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BlokRepeatForever,
  Slide04BedanyaRepeat,
  Slide05AnimasiMatahari,
  Slide06AyoTebak,
  Slide07AnimasiBurung,
  Slide08TipsAnimasi,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

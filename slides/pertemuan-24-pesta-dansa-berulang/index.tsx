import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-24-pesta-dansa-berulang';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj24-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj24-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj24-dance {
  0%, 100% { transform: translateX(0px) rotate(0deg); }
  25% { transform: translateX(-10px) rotate(-6deg); }
  50% { transform: translateY(-12px) scale(1.04); }
  75% { transform: translateX(10px) rotate(6deg); }
}
@keyframes cpj24-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj24-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj24-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj24-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.85); }
  50% { box-shadow: 0 0 0 14px rgba(251, 191, 36, 0); }
}
@keyframes cpj24-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.cpj24-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj24-card-btn:hover {
  transform: translateY(-4px);
}
.cpj24-card-btn:active {
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
          animation: live ? 'cpj24-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 24 • Pesta Dansa Berulang!</span>
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
// Reusable Pertemuan 24 Visuals (Tic Cat, Bunny, Disco Stage, Repeat Loop)
// ============================================================================

const TicCatSvg = ({
  size = 120,
  waving = false,
  dancing = false,
  spinning = false,
}: {
  size?: number;
  waving?: boolean;
  dancing?: boolean;
  spinning?: boolean;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 140 140"
    fill="none"
    style={{
      animation: spinning
        ? 'cpj24-spin 1s ease-in-out infinite'
        : dancing
          ? 'cpj24-dance 1.3s ease-in-out infinite'
          : undefined,
    }}
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
      d={waving ? 'M96 82 C114 74, 118 58, 110 52 C103 47, 95 58, 94 72' : 'M94 86 C107 90, 107 104, 97 104 C91 104, 89 96, 91 88'}
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

const WhiteRabbitSvg = ({ size = 100, dancing = false }: { size?: number; dancing?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 150 160"
    fill="none"
    style={{ animation: dancing ? 'cpj24-hop 1.2s ease-in-out infinite' : undefined }}
  >
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

const DiscoStageBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 480 260" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="480" height="260" fill="#312E81" />
    {/* Stage Spotlight Cones */}
    <polygon points="90,0 185,205 15,205" fill="rgba(251,191,36,0.22)" />
    <polygon points="240,0 360,205 120,205" fill="rgba(167,139,250,0.28)" />
    <polygon points="390,0 465,205 315,205" fill="rgba(96,165,250,0.22)" />
    {/* Disco Ball */}
    <line x1="240" y1="0" x2="240" y2="22" stroke={WHITE} strokeWidth={3} />
    <circle cx="240" cy="46" r="24" fill={LAVENDER} stroke={WHITE} strokeWidth={2.8} />
    <path d="M217 46 H263 M240 22 V70 M222 33 H258 M222 59 H258" stroke={WHITE} strokeWidth={1.6} opacity={0.85} />
    <circle cx="231" cy="39" r="3" fill={SUNNY} />
    <circle cx="249" cy="53" r="3" fill={TEAL} />
    {/* Colorful Dance Floor */}
    <rect x="0" y="184" width="480" height="76" fill="#4338CA" stroke={CHARCOAL} strokeWidth={3} />
    {[0, 80, 160, 240, 320, 400].map((x, idx) => (
      <rect
        key={x}
        x={x + 4}
        y="192"
        width="72"
        height="28"
        rx="6"
        fill={[SUNNY, TEAL, CORAL, SKY, LAVENDER, SUNNY][idx]}
        opacity={0.78}
      />
    ))}
    {/* Star Sparkles */}
    <circle cx="65" cy="64" r="5" fill={SUNNY} />
    <circle cx="415" cy="70" r="5" fill={TEAL} />
  </svg>
);

type DanceBlockKind = 'start-flag' | 'move-left' | 'move-right' | 'jump' | 'turn-right' | 'sound-pop';

const ScratchJrBlock = ({
  kind,
  num = 1,
  scale = 1,
  activeGlow = false,
}: {
  kind: DanceBlockKind;
  num?: number;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-flag';
  const fill = kind === 'start-flag' ? SUNNY : kind === 'sound-pop' ? TEAL : SKY;
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

        {kind === 'start-flag' && (
          <>
            <line x1="48" y1="30" x2="48" y2="90" stroke={CHARCOAL} strokeWidth={5.5} strokeLinecap="round" />
            <path d="M50 33 C68 27, 84 40, 98 35 V62 C84 68, 68 54, 50 61 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
          </>
        )}

        {kind === 'move-right' && (
          <path d="M36 53 H72 V38 L104 60 L72 82 V67 H36 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {kind === 'move-left' && (
          <path d="M104 53 H68 V38 L36 60 L68 82 V67 H104 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {kind === 'jump' && (
          <path d="M38 78 C38 38, 100 38, 100 78 M89 68 L100 79 L110 66" fill="none" stroke={WHITE} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        )}

        {kind === 'turn-right' && (
          <path d="M46 66 A24 24 0 1 1 88 74 M80 62 L92 75 L76 80" fill="none" stroke={WHITE} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        )}

        {kind === 'sound-pop' && (
          <>
            <path d="M34 52 H48 L68 35 V83 L48 66 H34 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <path d="M76 46 Q85 59 76 72" fill="none" stroke={SUNNY} strokeWidth={4.5} strokeLinecap="round" />
            <path d="M86 37 Q100 59 86 81" fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
          </>
        )}
      </svg>

      {kind !== 'start-flag' && kind !== 'sound-pop' && (
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

/** ScratchJr Orange C-Shaped Repeat Loop Clamp wrapping inner dance blocks */
const RepeatLoopBlock = ({
  count = 4,
  scale = 1,
  activeGlow = false,
  children,
}: {
  count?: number;
  scale?: number;
  activeGlow?: boolean;
  children?: ReactNode;
}) => (
  <div
    style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      filter: activeGlow ? 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.95))' : undefined,
    }}
  >
    <div
      style={{
        padding: `${Math.round(14 * scale)}px ${Math.round(24 * scale)}px ${Math.round(16 * scale)}px ${Math.round(22 * scale)}px`,
        borderRadius: Math.round(22 * scale),
        background: ORANGE,
        border: `${Math.max(3, Math.round(4 * scale))}px solid ${CHARCOAL}`,
        boxShadow: `0 ${Math.round(6 * scale)}px 0 ${CHARCOAL}`,
        display: 'flex',
        flexDirection: 'column',
        gap: Math.round(8 * scale),
      }}
    >
      {/* Top Loop Bar Label + Circular Arrow */}
      <div style={{ ...row, justifyContent: 'space-between', gap: 14 }}>
        <div style={{ ...row, gap: 8, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: Math.round(20 * scale), fontWeight: 700 }}>
          <JuniorIcon name="repeat" size={Math.round(28 * scale)} />
          <span>Ulangi</span>
        </div>
        <div
          style={{
            minWidth: Math.round(44 * scale),
            height: Math.round(32 * scale),
            borderRadius: Math.round(11 * scale),
            background: WHITE,
            border: `2.8px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(20 * scale),
            fontWeight: 700,
            color: CHARCOAL,
            ...centerCol,
            padding: '0 8px',
          }}
        >
          {count}
        </div>
      </div>

      {/* Inner Hugging Slot */}
      <div
        style={{
          padding: `${Math.round(10 * scale)}px ${Math.round(14 * scale)}px`,
          borderRadius: Math.round(16 * scale),
          background: CREAM,
          border: `3px solid ${CHARCOAL}`,
          ...row,
          alignItems: 'flex-start',
          justifyContent: 'center',
          minWidth: Math.round(160 * scale),
        }}
      >
        {children}
      </div>
    </div>
  </div>
);

/** Authentic ScratchJr Tablet Interface for Pertemuan 24 Dance Party */
const AuthenticScratchJrUI = ({
  spotlight = 'none',
  dancing = false,
  repeatCount = 4,
  width = 880,
  height = 540,
  onRunDance,
}: {
  spotlight?: 'none' | 'orange-category';
  dancing?: boolean;
  repeatCount?: number;
  width?: number | string;
  height?: number | string;
  onRunDance?: () => void;
}) => {
  const ringStyle = (on: boolean): CSSProperties =>
    on
      ? {
          outline: `5px solid ${SUNNY}`,
          outlineOffset: 2,
          animation: 'cpj24-pulse 1.6s infinite',
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
            onClick={onRunDance}
            className={onRunDance ? 'cpj24-card-btn' : undefined}
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
          Pesta Dansa
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
          <div style={{ width: '100%', height: 64, borderRadius: 12, background: WHITE, border: `3px solid ${SUNNY}`, ...centerCol, position: 'relative' }}>
            <TicCatSvg size={48} />
            <div style={{ position: 'absolute', right: -4, top: -4, width: 20, height: 20, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
              <JuniorIcon name="paintbrush" size={11} />
            </div>
          </div>
          <div style={{ width: '100%', height: 58, borderRadius: 12, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <WhiteRabbitSvg size={44} />
          </div>
          <div style={{ marginTop: 'auto', opacity: 0.85 }}>
            <JuniorIcon name="plus-circle" size={28} />
          </div>
        </div>

        {/* Center Disco Dance Stage */}
        <div style={{ flex: 1, borderRadius: 18, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
          <DiscoStageBackdropSvg />
          <div style={{ position: 'absolute', left: 95, bottom: 18 }}>
            <TicCatSvg size={115} waving dancing={dancing} />
          </div>
          <div style={{ position: 'absolute', right: 85, bottom: 20 }}>
            <WhiteRabbitSvg size={108} dancing={dancing} />
          </div>
          <div style={{ position: 'absolute', left: 32, top: 26 }}>
            <JuniorIcon name="music-note" size={34} />
          </div>
          <div style={{ position: 'absolute', right: 32, top: 26 }}>
            <JuniorIcon name="music-note" size={34} />
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
            <DiscoStageBackdropSvg />
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
          height: 152,
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
            Area Kode — Blok Repeat ({repeatCount})
          </span>
        </div>

        <div style={{ flex: 1, padding: '6px 14px', ...row, alignItems: 'center', gap: 6, overflow: 'hidden' }}>
          <ScratchJrBlock kind="start-flag" scale={0.62} />
          <RepeatLoopBlock count={repeatCount} scale={0.62} activeGlow={dancing}>
            <ScratchJrBlock kind="move-left" num={1} scale={0.56} />
            <div style={{ marginLeft: -8 }}>
              <ScratchJrBlock kind="move-right" num={1} scale={0.56} />
            </div>
            <div style={{ marginLeft: -8 }}>
              <ScratchJrBlock kind="jump" num={2} scale={0.56} />
            </div>
          </RepeatLoopBlock>
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
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 24" accentDot={ORANGE}>
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
          <JuniorIcon name="disco" size={24} />
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
          Pesta
          <br />
          <Highlight>Dansa Berulang!</Highlight>
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
          Membuat Karakter Menari Lincah dengan Blok Repeat
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
            <JuniorIcon name="repeat" size={28} />
            <span>Blok Repeat</span>
          </div>
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
            <JuniorIcon name="music-note" size={28} />
            <span>Pesta Dansa</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Disco Showcase Frame + Authentic ScratchJr + Biko & Tic */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '340px 340px 56px 56px',
            background: 'linear-gradient(155deg, #F3EEFF 0%, #FFF7ED 55%, #FEF9C3 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${LAVENDER}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 140, zIndex: 2 }}>
          <AuthenticScratchJrUI dancing={live} width={590} height={430} />
        </div>

        <div
          style={{
            position: 'absolute',
            left: -18,
            bottom: 28,
            zIndex: 3,
            animation: live ? 'cpj24-dance 2.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="jump"
            width={305}
            badgeIcon={<JuniorIcon name="repeat" size={24} />}
            speechBubble="Menari yuk!"
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
        headerLabel="Misi Blok Repeat • Pertemuan 24"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu 1 (Kuning / Oranye) */}
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
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ width: 255, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol }}>
              <RepeatLoopBlock count={4} scale={0.95}>
                <JuniorIcon name="repeat" size={52} />
              </RepeatLoopBlock>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Kenali <span style={{ color: '#C2410C' }}>Blok Repeat</span> (<em>Ulangi Gerak</em>)
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
            <div style={{ padding: '8px 22px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ width: 255, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 12 }}>
              <TicCatSvg size={135} waving dancing={live} />
              <JuniorIcon name="music-note" size={56} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Bikin <span style={{ color: '#047857' }}>Pesta Dansa</span> Lincah!
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj24-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="disco" size={24} />}
          speechBubble="Ayo goyang!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Kenalan Sama Blok Oranye Repeat!
// ============================================================================
const Slide03BlokRepeat: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="BLOK AJAIB BARU" accentDot={ORANGE}>
      <SlideTitle>
        Ini Namanya Blok <Highlight>Repeat!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Authentic ScratchJr Orange Category */}
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
          <AuthenticScratchJrUI spotlight="orange-category" width="100%" height={440} />

          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'center' }}>
            <RepeatLoopBlock count={4} scale={0.78} activeGlow>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: MUTED }}>
                Ulangi 4x!
              </span>
            </RepeatLoopBlock>
            <div style={{ animation: live ? 'cpj24-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot
                pose="thumbs-up"
                width={150}
                badgeIcon={<JuniorIcon name="repeat" size={18} />}
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
        headerLabel="Fungsi Blok Repeat"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="dot-orange" bgColor={ORANGE_SOFT} fontSize={34}>
              Ada di rak <strong>Blok Oranye</strong> (<em>Kontrol</em>)
            </BulletRow>
            <BulletRow icon="repeat" bgColor={SUNNY_SOFT} fontSize={34}>
              <strong>Mengulang</strong> gerakan di dalamnya!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: ORANGE_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Bentuknya melengkung seperti <strong>pelukan</strong> agar bisa membungkus blok gerakan di dalamnya!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Cara Pakai: Peluk Gerakan Dansamu!
// ============================================================================
const Slide04PelukGerakan: Page = () => {
  const [count, setCount] = useState(4);

  return (
    <JuniorFrame badge="JURUS BLOK REPEAT" accentDot={ORANGE}>
      <SlideTitle>
        <Highlight>Peluk</Highlight> Gerakan Dansamu!
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={820}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Cara Pakai Blok Repeat"
        padding={40}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="heart" bgColor={ORANGE_SOFT} fontSize={33}>
              Taruh blok gerak <strong>Di Dalam</strong> blok Repeat
            </BulletRow>
            <BulletRow icon="numbers" bgColor={SUNNY_SOFT} fontSize={33}>
              Atur <strong>Angka</strong> berapa kali diulang!
            </BulletRow>
          </div>

          {/* Interactive Repeat Count Selector */}
          <div style={{ padding: '20px 24px', borderRadius: 22, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
              Coba Pilih Angka Pengulangan:
            </span>
            <div style={{ ...row, gap: 14 }}>
              {[2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  className="cpj24-card-btn"
                  style={{
                    width: 68,
                    height: 58,
                    borderRadius: 16,
                    background: count === n ? ORANGE : WHITE,
                    color: count === n ? WHITE : CHARCOAL,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 4px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 28,
                    fontWeight: 700,
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Card: Repeat hugging Left + Right blocks + Biko */}
      <MacWindowCard
        left={960}
        top={235}
        width={860}
        height={720}
        titleBarColor={ORANGE_SOFT}
        headerLabel="Blok Repeat Memeluk Gerakan Kiri & Kanan"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ marginTop: 28 }}>
            <RepeatLoopBlock count={count} scale={1.25} activeGlow>
              <ScratchJrBlock kind="move-left" num={1} scale={1.15} />
              <div style={{ marginLeft: -14 }}>
                <ScratchJrBlock kind="move-right" num={1} scale={1.15} />
              </div>
            </RepeatLoopBlock>
          </div>

          <div style={{ ...row, justifyContent: 'center', gap: 28, width: '100%' }}>
            <BikoMascot
              pose="thumbs-up"
              width={215}
              badgeIcon={<JuniorIcon name="repeat" size={20} />}
              speechBubble={`Diulang ${count} kali!`}
            />
            <div style={{ padding: '18px 26px', borderRadius: 22, background: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700, maxWidth: 340, lineHeight: 1.32 }}>
              Gerak Kiri &amp; Kanan diulang otomatis sebanyak <strong>{count} kali!</strong>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus Gerakan Dansa Lincah!
// ============================================================================
const Slide05GerakanDansa: Page = () => {
  const live = useIsActivePage();

  const moves = [
    {
      num: 'LANGKAH 1',
      title: 'Goyang Kiri & Kanan',
      bg: SKY_SOFT,
      border: SKY,
      badgeBg: SKY,
      badgeText: WHITE,
      blocks: (
        <div style={{ ...row, alignItems: 'flex-start' }}>
          <ScratchJrBlock kind="move-left" num={1} scale={0.96} />
          <div style={{ marginLeft: -12 }}>
            <ScratchJrBlock kind="move-right" num={1} scale={0.96} />
          </div>
        </div>
      ),
      cat: <TicCatSvg size={135} dancing={live} />,
    },
    {
      num: 'LANGKAH 2',
      title: 'Lompat Ceria di Tempat',
      bg: SUNNY_SOFT,
      border: SUNNY,
      badgeBg: SUNNY,
      badgeText: CHARCOAL,
      blocks: <ScratchJrBlock kind="jump" num={2} scale={1.08} />,
      cat: <TicCatSvg size={135} waving />,
    },
    {
      num: 'LANGKAH 3',
      title: 'Berputar Ikuti Irama!',
      bg: TEAL_SOFT,
      border: TEAL,
      badgeBg: TEAL,
      badgeText: WHITE,
      blocks: <ScratchJrBlock kind="turn-right" num={12} scale={1.08} />,
      cat: <TicCatSvg size={135} waving spinning={live} />,
    },
  ];

  return (
    <JuniorFrame badge="JURUS DANSA SERU" accentDot={TEAL}>
      <SlideTitle>
        Rangkai <Highlight>Gerakan Dansa!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1720}
        height={725}
        titleBarColor={CREAM}
        headerLabel="3 Pilihan Gerakan Dansa Kucing Tic"
        padding={32}
      >
        <div style={{ display: 'flex', gap: 30, height: '100%' }}>
          {moves.map((m) => (
            <div
              key={m.num}
              style={{
                flex: 1,
                borderRadius: 24,
                background: m.bg,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 8px 0 ${m.border}`,
                padding: '24px 26px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'center',
              }}
            >
              <div style={{ padding: '8px 22px', borderRadius: 99, background: m.badgeBg, color: m.badgeText, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                {m.num}
              </div>

              <div style={{ width: '100%', height: 185, borderRadius: 22, background: WHITE, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
                {m.cat}
              </div>

              <div>{m.blocks}</div>

              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: CHARCOAL }}>
                {m.title}
              </div>
            </div>
          ))}
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Berapa Kali Menari?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1600} top={120} size={52}>
        Kucing Tic Akan Melompat <Highlight>Berapa Kali?</Highlight>
      </SlideTitle>

      {/* Question Code Strip */}
      <div
        style={{
          ...abs(320, 206, 1280, 152),
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: `0 6px 0 ${CHARCOAL}`,
          ...row,
          justifyContent: 'center',
          gap: 14,
          padding: '0 24px',
        }}
      >
        <ScratchJrBlock kind="start-flag" scale={0.78} />
        <RepeatLoopBlock count={3} scale={0.72}>
          <ScratchJrBlock kind="jump" num={2} scale={0.68} />
        </RepeatLoopBlock>
      </div>

      {/* Choice Cards */}
      <div style={{ ...abs(190, 382, 1540, 365), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: 3 Kali) */}
        <button
          type="button"
          onClick={() => setPicked('A')}
          className="cpj24-card-btn"
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

          <div style={{ ...row, gap: 14, marginTop: 12 }}>
            {[1, 2, 3].map((i) => (
              <JuniorIcon key={i} name="star-glow" size={56} />
            ))}
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 54, fontWeight: 700, color: CHARCOAL }}>
            3 Kali
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '6px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 20, fontWeight: 800 }}>
              <JuniorIcon name="check" size={22} />
              <span>Benar! Repeat angka 3 mengulang lompat 3 kali!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: 1 Kali) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj24-card-btn"
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
            animation: picked === 'B' ? 'cpj24-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 12 }}>
            <JuniorIcon name="star-glow" size={56} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 54, fontWeight: 700, color: CHARCOAL }}>
            1 Kali
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '6px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 20, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={22} />
              <span>Ups! Lihat angka di pojok blok Repeat-nya ya!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 765, 1540, 235), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj24-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={200}
            badgeIcon={<JuniorIcon name="question" size={20} />}
            speechBubble={picked === 'A' ? 'Jago!' : 'Hitung yuk!'}
          />
        </div>
        <div style={{ padding: '20px 34px', borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...row, gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="question" size={36} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, color: CHARCOAL }}>
            Tunjuk jawaban yang benar di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Sulap Kode: Panjang vs Ringkas!
// ============================================================================
const Slide07KodeRapi: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="RAHASIA CODER PINTAR" accentDot={TEAL}>
      <SlideTitle>
        Kode Jadi <Highlight>Super Rapi!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={230}
        width={1360}
        height={735}
        titleBarColor={CREAM}
        headerLabel="Perbandingan: Tanpa Repeat vs Pakai Repeat"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Kartu Atas — Tanpa Repeat (Panjang) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: CORAL_SOFT,
              border: `3.5px solid ${CORAL}`,
              boxShadow: `0 7px 0 ${CORAL}`,
              padding: '22px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, justifyContent: 'space-between' }}>
              <span style={{ padding: '6px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                Tanpa Repeat (Panjang)
              </span>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#991B1B' }}>6 Blok Panjang!</span>
            </div>

            <div style={{ ...row, justifyContent: 'center', alignItems: 'flex-start' }}>
              {(['move-left', 'move-right', 'move-left', 'move-right', 'move-left', 'move-right'] as DanceBlockKind[]).map((k, idx) => (
                <div key={idx} style={{ marginLeft: idx > 0 ? -14 : 0 }}>
                  <ScratchJrBlock kind={k} num={1} scale={0.95} />
                </div>
              ))}
            </div>
          </div>

          {/* Kartu Bawah — Pakai Repeat (Ringkas!) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: TEAL_SOFT,
              border: `3.5px solid ${TEAL}`,
              boxShadow: `0 7px 0 ${TEAL}`,
              padding: '22px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, justifyContent: 'space-between' }}>
              <span style={{ padding: '6px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                Pakai Repeat (Ringkas!)
              </span>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#065F46' }}>Hemat &amp; Rapi!</span>
            </div>

            <div style={{ ...row, justifyContent: 'center', alignItems: 'center' }}>
              <RepeatLoopBlock count={3} scale={0.95} activeGlow>
                <ScratchJrBlock kind="move-left" num={1} scale={0.9} />
                <div style={{ marginLeft: -12 }}>
                  <ScratchJrBlock kind="move-right" num={1} scale={0.9} />
                </div>
              </RepeatLoopBlock>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1475, 345, 360, 560),
          ...centerCol,
          animation: live ? 'cpj24-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={335}
          badgeIcon={<JuniorIcon name="repeat" size={22} />}
          speechBubble="Lebih ringkas!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Pesta Dansa (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsDansa: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="TIPS PESTA DANSA" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Dansa <Highlight>Makin Lincah!</Highlight>
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
            <BulletRow icon="heart" bgColor={ORANGE_SOFT} fontSize={30}>
              Masukkan gerakan <strong>Ke Dalam</strong> blok Repeat
            </BulletRow>
            <BulletRow icon="bubble" bgColor={TEAL_SOFT} fontSize={30}>
              Tambah bunyi <strong>&ldquo;Pop!&rdquo;</strong> biar makin meriah
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', padding: '0 22px' }}>
            <TicCatSvg size={145} waving dancing={live} />
            <RepeatLoopBlock count={4} scale={0.75}>
              <ScratchJrBlock kind="move-left" num={1} scale={0.7} />
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind="sound-pop" scale={0.7} />
              </div>
            </RepeatLoopBlock>
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
              Menaruh semua blok <strong>Di Luar</strong> Repeat
            </BulletRow>
            <BulletRow icon="zero" bgColor={SUNNY_SOFT} fontSize={30}>
              Mengisi angka pengulangan dengan <strong>Nol (0)</strong>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', padding: '0 22px' }}>
            <div style={{ ...row, alignItems: 'center', gap: 14 }}>
              <RepeatLoopBlock count={0} scale={0.68}>
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 16, fontWeight: 700, color: CORAL }}>
                  Kosong!
                </span>
              </RepeatLoopBlock>
              <ScratchJrBlock kind="move-right" num={1} scale={0.85} />
            </div>
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Pesta Dansa Berulang!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [dancing, setDancing] = useState(false);

  useEffect(() => {
    if (!dancing) return;
    const t = setTimeout(() => setDancing(false), 3800);
    return () => clearTimeout(t);
  }, [dancing]);

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Pesta Dansa Berulang!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'disco' as JuniorIconName,
            text: (
              <>
                Pilih latar <strong>Panggung / Pesta</strong> &amp; karakter penari
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'repeat' as JuniorIconName,
            text: (
              <>
                Pasang <strong>Blok Repeat (4)</strong> &amp; isi gerakan dansa
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
                Klik <strong>Bendera Hijau!</strong> Ayo menari bersama!
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

      {/* Authentic Interactive ScratchJr Dance Party Stage */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratchJrUI
          dancing={dancing}
          repeatCount={4}
          onRunDance={() => setDancing(true)}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Dance Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 18 }}>
        <div style={{ animation: dancing || live ? 'cpj24-dance 1.9s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={345}
            badgeIcon={<JuniorIcon name="disco" size={24} />}
            speechBubble={dancing ? 'Asyik menari!' : 'Klik Bendera!'}
          />
        </div>
        <button
          type="button"
          onClick={() => setDancing(true)}
          className="cpj24-card-btn"
          style={{
            padding: '14px 26px',
            borderRadius: 20,
            background: ORANGE,
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
          <span>{dancing ? 'Sedang Menari...' : 'Mulai Pesta Dansa!'}</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 24 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj24-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj24-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="disco" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj24-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1500} top={122} size={58}>
        Hore! Kamu <Highlight>Bintang Pesta Dansa!</Highlight>{' '}
        <JuniorIcon name="party" size={52} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 24"
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
          {/* Bespoke Golden Disco Ball & Repeat Arrow Medal SVG */}
          <div style={{ animation: live ? 'cpj24-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Hanging Disco Ball */}
              <line x1="120" y1="42" x2="120" y2="66" stroke={CHARCOAL} strokeWidth={4} />
              <circle cx="120" cy="104" r="38" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={3.8} />
              <path d="M82 104 H158 M120 66 V142 M89 84 H151 M89 124 H151" stroke={WHITE} strokeWidth={2.2} />
              <circle cx="105" cy="94" r="5" fill={SUNNY} />
              <circle cx="135" cy="114" r="5" fill={TEAL} />
              {/* Circular Repeat Arrow */}
              <path d="M74 104 A46 46 0 0 1 154 73" fill="none" stroke={ORANGE} strokeWidth={6} strokeLinecap="round" />
              <polygon points="159,66 158,82 144,76" fill={ORANGE} stroke={CHARCOAL} strokeWidth={1.8} />
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
            <span>Lencana Koreografer Blok Repeat</span>
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
            Kamu sudah jago mengulang gerakan tari dengan{' '}
            <Highlight color="#D1FAE5">Blok Repeat (Looping)!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Dancing Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <div style={{ animation: live ? 'cpj24-dance 1.8s ease-in-out infinite' : undefined }}>
            <BikoMascot
              pose="jump"
              width={295}
              badgeIcon={<JuniorIcon name="repeat" size={22} />}
              speechBubble="Dansa Hebat!"
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <TicCatSvg size={185} waving dancing={live} />
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
  `Selamat datang di Pertemuan 24 — Pesta Dansa Berulang! 🪩🎉
Hari ini kita akan membuat Kucing Tic dan teman-teman menari lincah di pesta disko ScratchJr memakai Blok Oranye Repeat!`,

  `Dua misi seru hari ini:
1. Mengenal Blok Oranye melengkung bernama Repeat (Ulangi Gerak).
2. Membuat gerakan Pesta Dansa yang lincah dan ringkas!`,

  `Kenalan sama Blok Oranye Repeat:
Tunjukkan lingkaran kategori berwarna Oranye (Kontrol). Tarik keluar blok melengkung bertanda panah melingkar dengan angka 4 di bawahnya!`,

  `Cara Pakai — Peluk Gerakan Dansamu!
Blok Repeat bekerja seperti pelukan: masukkan blok gerak (misalnya Kiri & Kanan) ke dalam pelukan Repeat, lalu atur angkanya berapa kali mau diulang!`,

  `Jurus Gerakan Dansa Lincah:
Ajak anak-anak meniru gerakan lucu bersama: 1. Goyang Kiri & Kanan, 2. Lompat Ceria di tempat, 3. Berputar ikuti irama!`,

  `Permainan Cepat! Ayo tebak bersama:
Kalau Bendera Hijau menyambung Repeat [ 3 ] yang memeluk Lompat 2, Kucing Tic akan melompat berapa kali — Pilihan A (3 Kali) atau Pilihan B (1 Kali)?`,

  `Sulap Kode — Panjang vs Ringkas:
Daripada menempel 6 blok Kiri-Kanan secara panjang, cukup bungkus 1 pasang Kiri-Kanan ke dalam Repeat [ 3 ] agar kodenya super rapi!`,

  `Tips Jagoan Pesta Dansa:
BOLEH masukkan blok gerakan ke dalam blok Repeat dan tambahkan efek suara "Pop!" biar makin meriah.
JANGAN menaruh blok gerak di luar Repeat atau mengisi angka pengulangan dengan Nol (0)!`,

  `Waktunya Misi Praktik Pesta Dansa Berulang:
1. Pilih latar Panggung/Pesta & penari. 2. Pasang Blok Repeat (4) berisi gerakan dansa. 3. Klik Bendera Hijau dan menari bersama!`,

  `Selamat untuk semua Bintang Pesta Dansa! 🎉
Kalian berhasil menguasai Looping dasar dan meraih Lencana Koreografer Blok Repeat di Pertemuan 24!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 24 — Pesta Dansa Berulang!',
  createdAt: '2026-11-16T14:12:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BlokRepeat,
  Slide04PelukGerakan,
  Slide05GerakanDansa,
  Slide06AyoTebak,
  Slide07KodeRapi,
  Slide08TipsDansa,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

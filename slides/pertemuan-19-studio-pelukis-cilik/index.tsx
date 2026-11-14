import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-19-studio-pelukis-cilik';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj19-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj19-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj19-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj19-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj19-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj19-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.75); }
  50% { box-shadow: 0 0 0 14px rgba(251, 191, 36, 0); }
}
.cpj19-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj19-card-btn:hover {
  transform: translateY(-4px);
}
.cpj19-card-btn:active {
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
          animation: live ? 'cpj19-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 19 • Studio Pelukis Cilik!</span>
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
// Reusable Pertemuan 19 Visuals (Cute Monster, Dream House, Paint Tools, Tic)
// ============================================================================

/** Friendly 3-Eyed Cartoon Monster with Mini Horns */
const CuteMonsterSvg = ({
  size = 150,
  bodyColor = LAVENDER,
  bellyColor = SUNNY_SOFT,
  sketchOnly = false,
}: {
  size?: number;
  bodyColor?: string;
  bellyColor?: string;
  sketchOnly?: boolean;
}) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    {!sketchOnly && <ellipse cx="80" cy="148" rx="44" ry="7" fill="rgba(30,30,44,0.16)" />}
    {/* Mini Horns */}
    <path d="M48 44 L34 16 L62 32 Z" fill={sketchOnly ? WHITE : SUNNY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    <path d="M112 44 L126 16 L98 32 Z" fill={sketchOnly ? WHITE : SUNNY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    {/* Cute Feet */}
    <ellipse cx="58" cy="138" rx="14" ry="8" fill={sketchOnly ? WHITE : bodyColor} stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="102" cy="138" rx="14" ry="8" fill={sketchOnly ? WHITE : bodyColor} stroke={CHARCOAL} strokeWidth={3.8} />
    {/* Stubby Arms */}
    <ellipse cx="30" cy="92" rx="14" ry="9" transform="rotate(-24 30 92)" fill={sketchOnly ? WHITE : bodyColor} stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="130" cy="92" rx="14" ry="9" transform="rotate(24 130 92)" fill={sketchOnly ? WHITE : bodyColor} stroke={CHARCOAL} strokeWidth={3.8} />
    {/* Rounded Monster Body */}
    <rect x="34" y="34" width="92" height="100" rx="42" fill={sketchOnly ? WHITE : bodyColor} stroke={CHARCOAL} strokeWidth={4.2} />
    {/* Belly Circle */}
    <ellipse cx="80" cy="104" rx="28" ry="22" fill={sketchOnly ? WHITE : bellyColor} stroke={sketchOnly ? CHARCOAL : 'none'} strokeWidth={2.5} strokeDasharray={sketchOnly ? '5 4' : undefined} />
    {/* 3 Cheerful Eyes */}
    <circle cx="56" cy="68" r="10.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="80" cy="56" r="11.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="104" cy="68" r="10.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="56" cy="68" r="4.5" fill={CHARCOAL} />
    <circle cx="80" cy="56" r="5" fill={CHARCOAL} />
    <circle cx="104" cy="68" r="4.5" fill={CHARCOAL} />
    {/* Big Happy Smile & One Cute Tooth */}
    <path d="M58 84 Q80 98 102 84" stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" fill="none" />
    <polygon points="75,88 85,88 80,95" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.2} strokeLinejoin="round" />
  </svg>
);

/** Colorful Dream House Playground Backdrop SVG */
const DreamHouseBackdropSvg = ({
  width = 480,
  height = 240,
  sketchOnly = false,
}: {
  width?: number | string;
  height?: number | string;
  sketchOnly?: boolean;
}) => (
  <svg width={width} height={height} viewBox="0 0 480 240" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="480" height="240" fill={sketchOnly ? WHITE : '#DBEAFE'} />
    <circle cx="422" cy="40" r="22" fill={sketchOnly ? WHITE : SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
    {/* Soft Lawn */}
    <path d="M0 165 Q150 138 300 164 Q400 180 480 155 V240 H0 Z" fill={sketchOnly ? '#F8FAFC' : '#4ADE80'} stroke={CHARCOAL} strokeWidth={2.8} />
    {/* Rainbow Arch behind house */}
    {!sketchOnly && (
      <>
        <path d="M40 165 A120 110 0 0 1 280 165" fill="none" stroke={CORAL} strokeWidth={8} opacity={0.7} />
        <path d="M52 165 A108 98 0 0 1 268 165" fill="none" stroke={SUNNY} strokeWidth={8} opacity={0.75} />
        <path d="M64 165 A96 86 0 0 1 256 165" fill="none" stroke={SKY} strokeWidth={8} opacity={0.75} />
      </>
    )}
    {/* Dream House */}
    <rect x="200" y="96" width="150" height="92" rx="8" fill={sketchOnly ? WHITE : SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
    <path d="M185 102 L275 38 L365 102 Z" fill={sketchOnly ? WHITE : CORAL} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
    <rect x="255" y="132" width="38" height="56" rx="6" fill={sketchOnly ? WHITE : ORANGE} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="285" cy="160" r="3" fill={CHARCOAL} />
    <rect x="216" y="118" width="26" height="26" rx="5" fill={sketchOnly ? WHITE : SKY} stroke={CHARCOAL} strokeWidth={2.8} />
    <rect x="308" y="118" width="26" height="26" rx="5" fill={sketchOnly ? WHITE : LAVENDER} stroke={CHARCOAL} strokeWidth={2.8} />
    {/* Garden Tree */}
    <rect x="66" y="122" width="18" height="60" rx="4" fill={sketchOnly ? WHITE : '#92400E'} stroke={CHARCOAL} strokeWidth={2.8} />
    <circle cx="75" cy="104" r="30" fill={sketchOnly ? WHITE : TEAL} stroke={CHARCOAL} strokeWidth={3} />
  </svg>
);

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

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Cover)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 19" accentDot={SKY}>
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
          <JuniorIcon name="palette" size={24} />
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
          Studio
          <br />
          <Highlight>Pelukis Cilik!</Highlight>
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
          Menggambar Monster Lucu &amp; Mewarnai Rumah Impian
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
            <JuniorIcon name="monster" size={28} />
            <span>Monster Lucu</span>
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
            <JuniorIcon name="paint-bucket" size={28} />
            <span>Rumah Impian</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Artist Palette Showcase + Laptop + Biko */}
      <div style={{ ...abs(980, 145, 845, 810), ...centerCol }}>
        {/* Painter Easel Frame */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 690,
            borderRadius: '180px 56px 180px 56px',
            background: 'linear-gradient(155deg, #EFF6FF 0%, #F3EEFF 52%, #FEF9C3 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SKY}`,
            overflow: 'hidden',
          }}
        />

        {/* Floating Paintbrush & Palette Icons */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 112,
            top: 82,
            animation: live ? 'cpj19-twinkle 2.6s ease-in-out infinite' : undefined,
            zIndex: 2,
          }}
        >
          <JuniorIcon name="paintbrush" size={50} />
        </div>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 88,
            top: 98,
            animation: live ? 'cpj19-twinkle 3.1s ease-in-out infinite' : undefined,
            zIndex: 2,
          }}
        >
          <JuniorIcon name="palette" size={48} />
        </div>

        {/* Laptop Window with Cute Monster in front of Dream House */}
        <div
          style={{
            position: 'absolute',
            right: 40,
            top: 180,
            width: 495,
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
              <JuniorIcon name="paintbrush" size={22} />
              <span>Paint Editor — Karya Sendiri!</span>
            </span>
            <JuniorIcon name="house" size={22} />
          </div>

          <div style={{ height: 240, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <DreamHouseBackdropSvg width="100%" height="100%" />
            <div style={{ position: 'absolute', left: 56, bottom: 10, animation: live ? 'cpj19-hop 2.4s ease-in-out infinite' : undefined }}>
              <CuteMonsterSvg size={135} bodyColor={LAVENDER} />
            </div>
          </div>
        </div>

        {/* Biko Painter Mascot */}
        <div
          style={{
            position: 'absolute',
            left: -8,
            bottom: 35,
            zIndex: 3,
            animation: live ? 'cpj19-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={345}
            badgeIcon={<JuniorIcon name="paintbrush" size={24} />}
            speechBubble="Ayo melukis!"
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
        headerLabel="Misi Paint Editor • Pertemuan 19"
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
                width: 245,
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
              <CuteMonsterSvg size={135} bodyColor={LAVENDER} />
              <JuniorIcon name="paintbrush" size={52} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Gambar <span style={{ color: '#1D4ED8' }}>Monster Lucu</span> Sendiri
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
                width: 245,
                height: 195,
                borderRadius: 28,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...row,
                justifyContent: 'center',
                gap: 14,
              }}
            >
              <JuniorIcon name="paint-bucket" size={76} />
              <JuniorIcon name="house" size={82} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Warnai <span style={{ color: '#047857' }}>Rumah Impian</span> di{' '}
              <em>Paint Editor</em>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Biko Mascot excitedly pointing */}
      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj19-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="palette" size={24} />}
          speechBubble="Ayo berkreasi!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Kenalan Sama Paint Editor!
// ============================================================================
const Slide03PaintEditor: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="STUDIO GAMBAR BARU" accentDot={SUNNY}>
      <SlideTitle>
        Ini Namanya <Highlight>Paint Editor!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: ScratchJr Brush Button Spotlight + Biko */}
      <MacWindowCard
        left={X0}
        top={235}
        width={860}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Pilih Karakter atau Latar -> Tekan Kuas Cat!"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Mockup Picker Top Bar */}
          <div
            style={{
              padding: '28px 32px',
              borderRadius: 24,
              background: CREAM,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'space-around',
            }}
          >
            {/* Empty Character Slot */}
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: 22,
                background: WHITE,
                border: `3px dashed ${MUTED}`,
                ...centerCol,
                gap: 8,
              }}
            >
              <JuniorIcon name="plus-circle" size={44} />
              <span style={{ fontSize: 18, fontWeight: 700, color: MUTED }}>Kosong</span>
            </div>

            <JuniorIcon name="arrow-right" size={46} />

            {/* Highlighted Paintbrush Icon */}
            <div
              style={{
                width: 168,
                height: 168,
                borderRadius: 28,
                background: SUNNY,
                border: `4.5px solid ${CHARCOAL}`,
                boxShadow: `0 8px 0 ${CHARCOAL}`,
                ...centerCol,
                gap: 8,
                animation: live ? 'cpj19-pulse 1.8s ease-in-out infinite' : undefined,
              }}
            >
              <JuniorIcon name="paintbrush" size={78} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                KUAS CAT!
              </span>
            </div>
          </div>

          {/* Biko pointing up at Kuas Cat */}
          <div style={{ ...row, justifyContent: 'center', gap: 28 }}>
            <BikoMascot
              pose="thumbs-up"
              width={230}
              badgeIcon={<JuniorIcon name="paintbrush" size={22} />}
              speechBubble="Klik kuasnya!"
            />
            <div
              style={{
                padding: '18px 26px',
                borderRadius: 22,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 26,
                fontWeight: 700,
                maxWidth: 340,
                lineHeight: 1.32,
              }}
            >
              Di sinilah tempat kita membuat gambar baru dari nol!
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
        headerLabel="Membuka Studio Gambar"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="paintbrush" bgColor={SUNNY_SOFT} fontSize={34}>
              Klik ikon <strong>Kuas Cat</strong> untuk membuka studio
            </BulletRow>
            <BulletRow icon="palette" bgColor={LAVENDER_SOFT} fontSize={34}>
              Tempat <strong>Menggambar &amp; Mewarnai</strong> sendiri!
            </BulletRow>
          </div>

          <div
            style={{
              padding: '24px 28px',
              borderRadius: 22,
              background: SKY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 18,
            }}
          >
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Bisa dipakai untuk menggambar <strong>Karakter Baru</strong> dan <strong>Latar Panggung Baru</strong>!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus Lukis #1: Gambar Monster Lucu!
// ============================================================================
const Slide04JurusMonster: Page = () => {
  const [sketchMode, setSketchMode] = useState(true);

  return (
    <JuniorFrame badge="JURUS LUKIS #1" accentDot={LAVENDER}>
      <SlideTitle>
        Gambar <Highlight>Monster Lucu!</Highlight>
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Alat Bentuk Paint Editor"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="shapes-circle" bgColor={SKY_SOFT} fontSize={33}>
              Pakai bentuk <strong>Lingkaran &amp; Kotak</strong> untuk badan
            </BulletRow>
            <BulletRow icon="pencil" bgColor={SUNNY_SOFT} fontSize={33}>
              Tambah <strong>Mata Besar &amp; Tanduk</strong> lucu!
            </BulletRow>
          </div>

          <button
            type="button"
            onClick={() => setSketchMode((s) => !s)}
            className="cpj19-card-btn"
            style={{
              padding: '20px 28px',
              borderRadius: 22,
              background: sketchMode ? LAVENDER : TEAL,
              color: WHITE,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 27,
              fontWeight: 700,
              ...row,
              justifyContent: 'center',
              gap: 12,
            }}
          >
            <JuniorIcon name="monster" size={32} />
            <span>{sketchMode ? 'Lihat Setelah Diwarnai!' : 'Lihat Sketsa Garis Dulu!'}</span>
          </button>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Card: Paint Editor Canvas with Left Shape Tools + 3-Eyed Monster */}
      <MacWindowCard
        left={980}
        top={235}
        width={840}
        height={720}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Kanvas Paint Editor — Monster Bermata Tiga"
        padding={28}
      >
        <div style={{ height: '100%', display: 'flex', gap: 24 }}>
          {/* Left Shape Tools Column */}
          <div
            style={{
              width: 112,
              borderRadius: 22,
              background: CREAM,
              border: `3px solid ${CHARCOAL}`,
              padding: '18px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            {/* Freehand Line */}
            <div style={{ width: 68, height: 68, borderRadius: 16, background: WHITE, border: `2.8px solid ${CHARCOAL}`, ...centerCol }}>
              <JuniorIcon name="pencil" size={34} />
            </div>
            {/* Circle Tool */}
            <div style={{ width: 68, height: 68, borderRadius: 16, background: SUNNY_SOFT, border: `3px solid ${SUNNY}`, ...centerCol }}>
              <div style={{ width: 34, height: 34, borderRadius: 99, border: `4px solid ${CHARCOAL}` }} />
            </div>
            {/* Rectangle Tool */}
            <div style={{ width: 68, height: 68, borderRadius: 16, background: WHITE, border: `2.8px solid ${CHARCOAL}`, ...centerCol }}>
              <div style={{ width: 32, height: 32, borderRadius: 5, border: `4px solid ${CHARCOAL}` }} />
            </div>
            {/* Triangle Tool */}
            <div style={{ width: 68, height: 68, borderRadius: 16, background: WHITE, border: `2.8px solid ${CHARCOAL}`, ...centerCol }}>
              <svg width={34} height={34} viewBox="0 0 36 36">
                <polygon points="18,5 32,31 4,31" fill="none" stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Checkered Paint Canvas */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              backgroundColor: WHITE,
              backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
              border: `3.5px solid ${CHARCOAL}`,
              ...centerCol,
              gap: 18,
              position: 'relative',
            }}
          >
            <CuteMonsterSvg size={320} bodyColor={LAVENDER} sketchOnly={sketchMode} />
            <div
              style={{
                padding: '10px 24px',
                borderRadius: 99,
                background: SUNNY_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {sketchMode ? 'Sketsa Bentuk Monster Lucu!' : 'Monster Lucu Bermata Tiga!'}
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus Lukis #2: Warnai dengan Ember Cat!
// ============================================================================
const Slide05EmberCat: Page = () => {
  const paletteColors = [
    { name: 'Ungu', hex: LAVENDER },
    { name: 'Kuning', hex: SUNNY },
    { name: 'Biru', hex: SKY },
    { name: 'Hijau', hex: TEAL },
    { name: 'Coral', hex: CORAL },
  ];
  const [selectedColor, setSelectedColor] = useState(LAVENDER);

  return (
    <JuniorFrame badge="JURUS LUKIS #2" accentDot={TEAL}>
      <SlideTitle>
        Warnai Pakai <Highlight>Ember Cat!</Highlight>
      </SlideTitle>

      {/* Left Interactive Fill-Bucket Spotlight */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Coba Klik Warna di Palet Bawah!"
        padding={28}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Fill Tool Header Badge + Monster Preview */}
          <div
            style={{
              width: '100%',
              flex: 1,
              borderRadius: 24,
              backgroundColor: WHITE,
              backgroundImage: 'radial-gradient(#E2E8F0 1.5px, transparent 1.5px)',
              backgroundSize: '22px 22px',
              border: `3.5px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'space-around',
              padding: '0 26px',
              marginBottom: 20,
            }}
          >
            <div style={{ ...centerCol, gap: 10 }}>
              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 26,
                  background: SKY_SOFT,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: `0 6px 0 ${CHARCOAL}`,
                  ...centerCol,
                }}
              >
                <JuniorIcon name="paint-bucket" size={64} />
              </div>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                Ember Cat
              </span>
            </div>

            <CuteMonsterSvg size={280} bodyColor={selectedColor} />
          </div>

          {/* Interactive ScratchJr Color Swatch Palette */}
          <div
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: 22,
              background: CREAM,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'space-around',
            }}
          >
            {paletteColors.map((col) => {
              const active = selectedColor === col.hex;
              return (
                <button
                  key={col.name}
                  type="button"
                  onClick={() => setSelectedColor(col.hex)}
                  className="cpj19-card-btn"
                  style={{
                    width: 78,
                    height: 78,
                    borderRadius: 99,
                    background: col.hex,
                    border: `${active ? 5 : 3}px solid ${CHARCOAL}`,
                    boxShadow: active ? `0 0 0 5px ${SUNNY}` : `0 4px 0 ${CHARCOAL}`,
                    ...centerCol,
                    color: WHITE,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  {active ? <JuniorIcon name="check" size={30} /> : null}
                </button>
              );
            })}
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
        headerLabel="Cara Pakai Ember Cat"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="palette" bgColor={SUNNY_SOFT} fontSize={34}>
              Pilih <strong>Warna Cerah</strong> di palet bawah
            </BulletRow>
            <BulletRow icon="paint-bucket" bgColor={SKY_SOFT} fontSize={34}>
              Klik ikon <strong>Ember Cat</strong> lalu ketuk gambarnya!
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
              Sekali ketuk, seluruh badan monster langsung penuh warna dalam sekejap!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Alat Mana untuk Mewarnai?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1600} top={128} size={54}>
        Alat Mana untuk <Highlight>Mewarnai Cepat?</Highlight>
      </SlideTitle>

      <div style={{ ...abs(190, 255, 1540, 445), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Ember Cat / Fill Bucket) */}
        <button
          type="button"
          onClick={() => setPicked('A')}
          className="cpj19-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'A' ? TEAL_SOFT : WHITE,
            border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'A' ? TEAL : CHARCOAL}`,
            padding: 32,
            ...centerCol,
            gap: 20,
            position: 'relative',
          }}
        >
          <div
            style={{
              ...abs(26, 24),
              padding: '6px 18px',
              borderRadius: 99,
              background: SKY_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            PILIHAN A
          </div>

          <div
            style={{
              width: 175,
              height: 175,
              borderRadius: 32,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              ...centerCol,
              marginTop: 14,
            }}
          >
            <JuniorIcon name="paint-bucket" size={115} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Ember Cat
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
              <span>Benar! Ember Cat mewarnai gambar dengan cepat!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Gunting) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj19-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'B' ? CORAL_SOFT : WHITE,
            border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'B' ? CORAL : CHARCOAL}`,
            padding: 32,
            ...centerCol,
            gap: 20,
            position: 'relative',
            animation: picked === 'B' ? 'cpj19-shake 0.35s ease' : undefined,
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

          <div
            style={{
              width: 175,
              height: 175,
              borderRadius: 32,
              background: CORAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              ...centerCol,
              marginTop: 14,
            }}
          >
            <JuniorIcon name="scissors" size={115} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Gunting
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
              <span>Ups! Gunting untuk menghapus bagian gambar!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Center Prompt + Biko holding Question Sign */}
      <div style={{ ...abs(190, 725, 1540, 280), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj19-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={230}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Hebat!' : 'Alat yang mana?'}
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
            Tunjuk alat yang benar di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Ayo Hias Latar Rumah Impian! (3 Langkah dalam MacWindowCard)
// ============================================================================
const Slide07RumahImpian: Page = () => {
  return (
    <JuniorFrame badge="JURUS LATAR IMPIAN" accentDot={SUNNY}>
      <SlideTitle>
        Warnai <Highlight>Rumah Impianmu!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={230}
        width={1720}
        height={735}
        titleBarColor={CREAM}
        headerLabel="3 Tahapan Menghias Latar Rumah Impian"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* 3 Step Cards */}
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
                <JuniorIcon name="landscape" size={28} style={{ marginRight: 8 }} />
                Klik ikon <strong>Latar</strong> lalu tekan <strong>Kuas Cat</strong>
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
                Gambar &amp; warnai <strong>Rumah Impian</strong> cantik
              </div>
            </div>

            <div
              style={{
                flex: 1,
                borderRadius: 22,
                background: TEAL_SOFT,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${TEAL}`,
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
                  background: TEAL,
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
                <JuniorIcon name="check" size={28} style={{ marginRight: 8 }} />
                Tekan <strong>Centang</strong> -&gt; Muncul di panggung!
              </div>
            </div>
          </div>

          {/* 3-Panel Visual Progression */}
          <div style={{ height: 410, display: 'flex', gap: 28, alignItems: 'center' }}>
            {/* Panel 1: Backdrop + Kuas Cat */}
            <div
              style={{
                flex: 1,
                height: '100%',
                borderRadius: 24,
                background: SKY_SOFT,
                border: `3.5px solid ${CHARCOAL}`,
                ...centerCol,
                gap: 18,
                padding: 20,
              }}
            >
              <div style={{ ...row, gap: 18 }}>
                <JuniorIcon name="landscape" size={88} />
                <JuniorIcon name="plus-circle" size={44} />
                <JuniorIcon name="paintbrush" size={84} />
              </div>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                Buka Kanvas Latar
              </span>
            </div>

            <JuniorIcon name="arrow-right" size={44} />

            {/* Panel 2: Coloring Dream House */}
            <div
              style={{
                flex: 1.2,
                height: '100%',
                borderRadius: 24,
                background: WHITE,
                border: `3.5px solid ${CHARCOAL}`,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '100%', height: 285, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, overflow: 'hidden', position: 'relative' }}>
                <DreamHouseBackdropSvg width="100%" height="100%" />
                <div style={{ position: 'absolute', right: 16, bottom: 14, padding: 8, borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}` }}>
                  <JuniorIcon name="paint-bucket" size={40} />
                </div>
              </div>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                Warnai Pakai Ember Cat!
              </span>
            </div>

            <JuniorIcon name="arrow-right" size={44} />

            {/* Panel 3: Saved on Stage */}
            <div
              style={{
                flex: 1,
                height: '100%',
                borderRadius: 24,
                background: TEAL_SOFT,
                border: `3.5px solid ${TEAL}`,
                ...centerCol,
                gap: 18,
                padding: 20,
              }}
            >
              <div
                style={{
                  width: 112,
                  height: 112,
                  borderRadius: 99,
                  background: WHITE,
                  border: `3.5px solid ${TEAL}`,
                  ...centerCol,
                }}
              >
                <JuniorIcon name="check" size={68} />
              </div>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, textAlign: 'center' }}>
                Rumah Impian Siap Dipakai!
              </span>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Studio Pelukis Cilik (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsPelukis: Page = () => {
  return (
    <JuniorFrame badge="TIPS PELUKIS CILIK" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Gambarmu <Highlight>Makin Keren!</Highlight>
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
            <BulletRow icon="undo" bgColor={SUNNY_SOFT} fontSize={30}>
              Tekan <strong>Panah Kembali</strong> (Undo) jika salah coret
            </BulletRow>
            <BulletRow icon="check" bgColor={TEAL_SOFT} fontSize={30}>
              Tekan <strong>Centang Hijau</strong> setelah selesai lukis
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
              padding: '0 24px',
            }}
          >
            <BikoMascot
              pose="thumbs-up"
              width={185}
              badgeIcon={<JuniorIcon name="paintbrush" size={18} />}
              speechBubble="Karyaku jadi!"
            />
            <div
              style={{
                width: 310,
                height: 180,
                borderRadius: 18,
                border: `3px solid ${CHARCOAL}`,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <DreamHouseBackdropSvg width="100%" height="100%" />
              <div style={{ position: 'absolute', left: 32, bottom: 4 }}>
                <CuteMonsterSvg size={95} bodyColor={LAVENDER} />
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
            <BulletRow icon="cross" bgColor={CORAL_SOFT} fontSize={30}>
              Tekan <strong>Silang Merah</strong> sebelum disimpan
            </BulletRow>
            <BulletRow icon="sad" bgColor={SUNNY_SOFT} fontSize={30}>
              Takut <strong>Mencoba Bentuk</strong> monster lucu
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
              padding: '0 24px',
            }}
          >
            <div
              style={{
                width: 280,
                height: 175,
                borderRadius: 18,
                background: WHITE,
                border: `3px dashed ${CORAL}`,
                ...centerCol,
                gap: 10,
              }}
            >
              <JuniorIcon name="cross" size={64} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: '#991B1B' }}>
                Gambar Terhapus!
              </span>
            </div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700, color: '#991B1B', maxWidth: 260, lineHeight: 1.32 }}>
              Jangan tekan tombol silang X sebelum menekan Centang ya!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Monster & Rumah Impian!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [jumping, setJumping] = useState(false);

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={SKY}>
      <SlideTitle>
        Misi <Highlight>Monster di Rumah Impian!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 232, W, 175), display: 'flex', gap: 28 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'monster' as JuniorIconName,
            text: (
              <>
                Gambar &amp; warnai <strong>Monster Lucu</strong> sendiri
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'house' as JuniorIconName,
            text: (
              <>
                Hias latar <strong>Rumah Impian</strong> warna-warni
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
                Pasang <strong>Bendera Hijau</strong> &amp; gerakkan!
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
            <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.28 }}>
              <JuniorIcon name={item.icon} size={30} style={{ marginRight: 8 }} />
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Practice ScratchJr Stage + Cheering Biko */}
      <MacWindowCard
        left={X0}
        top={435}
        width={1260}
        height={530}
        titleBarColor={WHITE}
        headerLabel="Hasil Karya Pelukis Cilik — Klik Monster untuk Melompat!"
        padding={26}
      >
        <div style={{ display: 'flex', gap: 28, height: '100%', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setJumping((j) => !j)}
            className="cpj19-card-btn"
            style={{
              width: 720,
              height: 410,
              borderRadius: 22,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <DreamHouseBackdropSvg width="100%" height="100%" />
            <div
              style={{
                position: 'absolute',
                left: 110,
                bottom: jumping ? 54 : 14,
                transition: 'bottom 240ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <CuteMonsterSvg size={185} bodyColor={LAVENDER} />
            </div>
          </button>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div
              style={{
                padding: '18px 22px',
                borderRadius: 20,
                background: SUNNY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 26,
                fontWeight: 700,
                lineHeight: 1.35,
              }}
            >
              Karya gambar buatanmu sendiri sekarang bisa bergerak dan melompat di panggung!
            </div>

            <button
              type="button"
              onClick={() => setJumping((j) => !j)}
              className="cpj19-card-btn"
              style={{
                padding: '18px 24px',
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
              <span>{jumping ? 'Turunkan Monster!' : 'Lompatkan Monstermu!'}</span>
            </button>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko on Right */}
      <div
        style={{
          ...abs(1400, 445, 430, 520),
          ...centerCol,
          animation: live ? 'cpj19-hop 2.4s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="thumbs-up"
          width={360}
          badgeIcon={<JuniorIcon name="palette" size={24} />}
          speechBubble="Karyamu hebat!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 19 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj19-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj19-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="palette" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj19-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1450} top={122} size={62}>
        Hore! Kamu <Highlight>Pelukis Cilik Hebat!</Highlight>{' '}
        <JuniorIcon name="party" size={54} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 19"
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
          {/* Bespoke Golden Champion Medal SVG: Artist Palette + Paintbrush + Cute Monster */}
          <div style={{ animation: live ? 'cpj19-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Wooden Painter Palette */}
              <path
                d="M120 62 C86 62, 62 84, 62 110 C62 134, 84 152, 114 152 C126 152, 130 144, 128 136 C126 128, 134 124, 144 128 C160 134, 178 122, 178 104 C178 78, 152 62, 120 62 Z"
                fill={WHITE}
                stroke={CHARCOAL}
                strokeWidth={3.8}
              />
              {/* Paint Blobs */}
              <circle cx="88" cy="96" r="8" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.2} />
              <circle cx="108" cy="80" r="8" fill={SKY} stroke={CHARCOAL} strokeWidth={2.2} />
              <circle cx="136" cy="82" r="8" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.2} />
              <circle cx="154" cy="102" r="8" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={2.2} />
              {/* Cute Tiny Monster Face on Center of Palette */}
              <circle cx="100" cy="122" r="14" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={2.8} />
              <circle cx="96" cy="120" r="2.2" fill={WHITE} />
              <circle cx="104" cy="120" r="2.2" fill={WHITE} />
              <path d="M95 127 Q100 131 105 127" stroke={WHITE} strokeWidth={2} strokeLinecap="round" fill="none" />
              {/* Paintbrush Crossing */}
              <path d="M136 144 L176 74 L184 80 L146 148 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
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
            <span>Lencana Seniman Paint Editor</span>
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
            Kamu sudah jago menggambar{' '}
            <Highlight color="#D1FAE5">Monster Lucu &amp; mewarnai Rumah Impian!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="paintbrush" size={22} />}
            speechBubble="Seniman Hebat!"
          />
          <div style={{ animation: live ? 'cpj19-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 19 — Studio Pelukis Cilik! 🎨
Hari ini anak-anak akan menjadi seniman cilik di Paint Editor ScratchJr untuk menggambar Monster Lucu dan mewarnai Rumah Impian!`,

  `Dua misi seru hari ini:
1. Menggambar karakter Monster Lucu buatan sendiri.
2. Mewarnai latar Rumah Impian di Paint Editor!`,

  `Kenalan sama Paint Editor:
Ajak anak-anak mengetuk ikon Kuas Cat di sebelah slot karakter atau latar kosong untuk masuk ke studio gambar!`,

  `Jurus Lukis #1 — Gambar Monster Lucu:
Pakai alat bentuk Lingkaran, Kotak, atau Garis Bebas untuk membuat badan monster, lalu tambahkan mata besar dan tanduk mini yang lucu!`,

  `Jurus Lukis #2 — Warnai dengan Ember Cat:
Pilih warna cerah di palet bawah lalu ketuk ikon Ember Cat dan sentuh badan monster. Sekali klik langsung terisi warna penuh!`,

  `Permainan Cepat! Ayo tebak bersama:
Alat mana untuk mewarnai cepat — Pilihan A (Ember Cat) atau Pilihan B (Gunting)?`,

  `Ayo Hias Latar Rumah Impian:
1. Klik ikon Latar lalu tekan Kuas Cat. 2. Gambar & warnai Rumah Impian cantik. 3. Tekan Centang Hijau agar tampil di panggung!`,

  `Tips Jagoan Studio Pelukis Cilik:
BOLEH tekan Panah Kembali (Undo) jika salah coret, dan pastikan menekan Centang Hijau saat selesai.
JANGAN tekan Silang Merah sebelum disimpan, dan jangan takut mencoba bentuk lucu!`,

  `Waktunya Misi Praktik Monster di Rumah Impian:
1. Gambar & warnai Monster Lucu sendiri. 2. Hias latar Rumah Impian warna-warni. 3. Pasang Bendera Hijau dan gerakkan monstermu!`,

  `Selamat untuk semua Pelukis Cilik Hebat! 🎉
Kalian berhasil meraih Lencana Seniman Paint Editor di Pertemuan 19!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 19 — Studio Pelukis Cilik!',
  createdAt: '2026-11-14T16:17:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03PaintEditor,
  Slide04JurusMonster,
  Slide05EmberCat,
  Slide06AyoTebak,
  Slide07RumahImpian,
  Slide08TipsPelukis,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-16-cilukba-kelinci-ajaib';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj16-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj16-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj16-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj16-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj16-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj16-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7); }
  50% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
}
@keyframes cpj16-tap {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(-5px, -5px) scale(0.93); }
}
.cpj16-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj16-card-btn:hover {
  transform: translateY(-4px);
}
.cpj16-card-btn:active {
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
          animation: live ? 'cpj16-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 16 • Cilukba Kelinci Ajaib!</span>
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
  bgColor = SUNNY_SOFT,
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
// Reusable Pertemuan 16 Visuals (White Rabbit, Park Stage, ScratchJr Blocks)
// ============================================================================

/** Cartoon White Bunny SVG with solid, ghosted (Hide), and speech bubble modes */
const WhiteRabbitSvg = ({
  size = 150,
  ghosted = false,
  speechBubble,
  style,
}: {
  size?: number;
  ghosted?: boolean;
  speechBubble?: string;
  style?: CSSProperties;
}) => (
  <div
    style={{
      position: 'relative',
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'opacity 320ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
      ...style,
    }}
  >
    {speechBubble && !ghosted && (
      <div
        style={{
          marginBottom: 6,
          padding: '6px 18px',
          borderRadius: 99,
          background: SUNNY,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: `0 4px 0 ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 22,
          fontWeight: 700,
          color: CHARCOAL,
          whiteSpace: 'nowrap',
        }}
      >
        {speechBubble}
      </div>
    )}
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      {!ghosted && <ellipse cx="75" cy="148" rx="40" ry="7" fill="rgba(30,30,44,0.16)" />}
      {/* Ears */}
      <ellipse
        cx="54"
        cy="34"
        rx="13"
        ry="30"
        transform="rotate(-10 54 34)"
        fill={ghosted ? 'rgba(255,255,255,0.28)' : WHITE}
        stroke={ghosted ? LAVENDER : CHARCOAL}
        strokeWidth={4}
        strokeDasharray={ghosted ? '7 5' : undefined}
      />
      <ellipse
        cx="96"
        cy="34"
        rx="13"
        ry="30"
        transform="rotate(10 96 34)"
        fill={ghosted ? 'rgba(255,255,255,0.28)' : WHITE}
        stroke={ghosted ? LAVENDER : CHARCOAL}
        strokeWidth={4}
        strokeDasharray={ghosted ? '7 5' : undefined}
      />
      {!ghosted && (
        <>
          <ellipse cx="54" cy="35" rx="6.5" ry="20" transform="rotate(-10 54 35)" fill="#FBCFE8" />
          <ellipse cx="96" cy="35" rx="6.5" ry="20" transform="rotate(10 96 35)" fill="#FBCFE8" />
        </>
      )}
      {/* Tail */}
      <circle
        cx="110"
        cy="126"
        r="12"
        fill={ghosted ? 'rgba(255,255,255,0.22)' : WHITE}
        stroke={ghosted ? LAVENDER : CHARCOAL}
        strokeWidth={3.6}
        strokeDasharray={ghosted ? '6 5' : undefined}
      />
      {/* Body */}
      <ellipse
        cx="75"
        cy="115"
        rx="30"
        ry="28"
        fill={ghosted ? 'rgba(255,255,255,0.28)' : WHITE}
        stroke={ghosted ? LAVENDER : CHARCOAL}
        strokeWidth={4}
        strokeDasharray={ghosted ? '7 5' : undefined}
      />
      {!ghosted && <ellipse cx="75" cy="117" rx="17" ry="18" fill="#FCE7F3" />}
      {/* Feet */}
      <ellipse
        cx="56"
        cy="141"
        rx="13"
        ry="7"
        fill={ghosted ? 'rgba(255,255,255,0.25)' : WHITE}
        stroke={ghosted ? LAVENDER : CHARCOAL}
        strokeWidth={3.6}
        strokeDasharray={ghosted ? '6 4' : undefined}
      />
      <ellipse
        cx="94"
        cy="141"
        rx="13"
        ry="7"
        fill={ghosted ? 'rgba(255,255,255,0.25)' : WHITE}
        stroke={ghosted ? LAVENDER : CHARCOAL}
        strokeWidth={3.6}
        strokeDasharray={ghosted ? '6 4' : undefined}
      />
      {/* Paws */}
      <ellipse
        cx="46"
        cy="108"
        rx="9"
        ry="12"
        transform="rotate(24 46 108)"
        fill={ghosted ? 'rgba(255,255,255,0.25)' : WHITE}
        stroke={ghosted ? LAVENDER : CHARCOAL}
        strokeWidth={3.6}
        strokeDasharray={ghosted ? '5 4' : undefined}
      />
      <ellipse
        cx="104"
        cy="108"
        rx="9"
        ry="12"
        transform="rotate(-24 104 108)"
        fill={ghosted ? 'rgba(255,255,255,0.25)' : WHITE}
        stroke={ghosted ? LAVENDER : CHARCOAL}
        strokeWidth={3.6}
        strokeDasharray={ghosted ? '5 4' : undefined}
      />
      {/* Head */}
      <ellipse
        cx="75"
        cy="74"
        rx="34"
        ry="28"
        fill={ghosted ? 'rgba(255,255,255,0.32)' : WHITE}
        stroke={ghosted ? LAVENDER : CHARCOAL}
        strokeWidth={4}
        strokeDasharray={ghosted ? '7 5' : undefined}
      />
      {!ghosted ? (
        <>
          <circle cx="51" cy="79" r="6" fill="#FBCFE8" />
          <circle cx="99" cy="79" r="6" fill="#FBCFE8" />
          <circle cx="62" cy="69" r="4.5" fill={CHARCOAL} />
          <circle cx="88" cy="69" r="4.5" fill={CHARCOAL} />
          <circle cx="63.5" cy="67.5" r="1.6" fill={WHITE} />
          <circle cx="89.5" cy="67.5" r="1.6" fill={WHITE} />
          <polygon points="71,76 79,76 75,81" fill={CORAL} />
          <path d="M68 83 Q75 89 82 83" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
          <path d="M44 73 H32 M44 79 H33 M106 73 H118 M106 79 H117" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M58 69 Q63 65 68 69" stroke={LAVENDER} strokeWidth={3} strokeLinecap="round" fill="none" />
          <path d="M82 69 Q87 65 92 69" stroke={LAVENDER} strokeWidth={3} strokeLinecap="round" fill="none" />
          <path d="M114 38 L118 46 L126 49 L118 52 L114 60 L110 52 L102 49 L110 46 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
        </>
      )}
    </svg>
  </div>
);

/** Sunny Park Garden Backdrop SVG for Peek-a-Boo Stage */
const ParkBackdropSvg = ({
  width = 480,
  height = 240,
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <svg width={width} height={height} viewBox="0 0 480 240" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="480" height="240" fill="#DBEAFE" />
    <circle cx="422" cy="40" r="22" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
    {/* Soft Clouds */}
    <path d="M60 54 C60 44, 76 40, 84 48 C92 38, 114 42, 114 54 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.4} />
    <path d="M230 42 C230 34, 244 30, 250 37 C257 29, 276 32, 276 42 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.4} />
    {/* Rolling Grass Hills */}
    <path d="M0 150 Q140 112 280 148 Q390 174 480 135 V240 H0 Z" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M0 178 Q180 155 340 184 Q420 198 480 172 V240 H0 Z" fill="#4ADE80" stroke={CHARCOAL} strokeWidth={2.8} />
    {/* Garden Tree */}
    <rect x="44" y="96" width="20" height="72" rx="4" fill="#92400E" stroke={CHARCOAL} strokeWidth={2.8} />
    <circle cx="54" cy="76" r="36" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    {/* Flowers */}
    <circle cx="152" cy="198" r="7" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="152" cy="198" r="3" fill={SUNNY} />
    <circle cx="386" cy="204" r="7" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="386" cy="204" r="3" fill={SUNNY} />
  </svg>
);

/** Front Bush SVG for Peek-a-Boo hiding */
const BushForegroundSvg = ({ width = 175 }: { width?: number }) => (
  <svg width={width} height={Math.round(width * 0.56)} viewBox="0 0 180 100" fill="none">
    <path
      d="M16 92 C6 92, 6 62, 28 58 C30 34, 62 24, 82 40 C98 20, 134 26, 140 54 C166 54, 174 88, 156 92 Z"
      fill={TEAL}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <circle cx="56" cy="70" r="6" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.2} />
    <circle cx="118" cy="66" r="6" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.2} />
    <circle cx="88" cy="56" r="5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.2} />
  </svg>
);

/** Reusable Kucing Tic SVG for Slide 10 */
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

type BlockKind = 'start-tap' | 'start-flag' | 'hide' | 'show';

/** Chunky ScratchJr Block Renderer (Triggers & Looks Hide/Show) */
const ScratchJrBlock = ({
  kind,
  scale = 1,
  activeGlow = false,
}: {
  kind: BlockKind;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-tap' || kind === 'start-flag';
  const fill = isTrigger ? SUNNY : LAVENDER;
  const w = Math.round(134 * scale);
  const h = Math.round(118 * scale);

  // Start block has smooth rounded top-left cap (no left notch)
  const pathData = isTrigger
    ? 'M30 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H24 C14 106 8 98 8 88 V38 C8 25 18 16 30 16 Z'
    : 'M14 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H14 V74 C24 74 24 48 14 48 V16 Z';

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter: activeGlow ? 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.9))' : undefined,
        transform: activeGlow ? 'scale(1.07)' : 'scale(1)',
        transition: 'transform 180ms ease, filter 180ms ease',
      }}
    >
      <svg width={w} height={h} viewBox="0 0 140 120">
        <path
          d={pathData}
          fill={fill}
          stroke={CHARCOAL}
          strokeWidth={5}
          strokeLinejoin="round"
        />

        {/* Yellow Start on Tap: Person silhouette + pointing finger */}
        {kind === 'start-tap' && (
          <>
            <circle cx="56" cy="44" r="10.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
            <path d="M38 80 C38 60, 74 60, 74 80 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} strokeLinejoin="round" />
            <path
              d="M72 58 L92 73 L85 77 L95 90 L87 94 L77 81 L71 86 Z"
              fill={CORAL}
              stroke={CHARCOAL}
              strokeWidth={2.6}
              strokeLinejoin="round"
            />
          </>
        )}

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

        {/* Purple Hide: Dashed hollow silhouette */}
        {kind === 'hide' && (
          <>
            <circle
              cx="69"
              cy="43"
              r="11"
              fill="rgba(255,255,255,0.22)"
              stroke={WHITE}
              strokeWidth={4}
              strokeDasharray="6 4.5"
            />
            <path
              d="M47 84 C47 61, 91 61, 91 84 Z"
              fill="rgba(255,255,255,0.22)"
              stroke={WHITE}
              strokeWidth={4}
              strokeDasharray="7 5"
              strokeLinejoin="round"
            />
          </>
        )}

        {/* Purple Show: Solid filled white silhouette */}
        {kind === 'show' && (
          <>
            <circle cx="69" cy="43" r="11.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} />
            <path
              d="M47 84 C47 61, 91 61, 91 84 Z"
              fill={WHITE}
              stroke={CHARCOAL}
              strokeWidth={2.8}
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Hero Split + Interactive Garden Peek-a-Boo)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  const [peeking, setPeeking] = useState(true);

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 16" accentDot={SUNNY}>
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
          <JuniorIcon name="bunny" size={24} />
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
          Cilukba
          <br />
          <Highlight>Kelinci Ajaib!</Highlight>
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
          Bermain Petak Umpet dengan Klik Karakter, Hide &amp; Show
        </p>

        {/* Quick Pill Highlights */}
        <div style={{ ...row, gap: 18 }}>
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
            <JuniorIcon name="start-tap" size={28} />
            <span>Sentuh Karakter</span>
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
            <JuniorIcon name="hide" size={28} />
            <span>Hide &amp; Show</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Distinct Magic Arch Showcase + Laptop Garden + Biko */}
      <div style={{ ...abs(980, 145, 845, 810), ...centerCol }}>
        {/* Arch-Topped Showcase Frame */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 690,
            borderRadius: '340px 340px 56px 56px',
            background: 'linear-gradient(160deg, #FEF9C3 0%, #ECFDF5 52%, #F3EEFF 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SUNNY}`,
            overflow: 'hidden',
          }}
        />

        {/* Floating Magic Stars */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 110,
            top: 90,
            animation: live ? 'cpj16-twinkle 2.4s ease-in-out infinite' : undefined,
            zIndex: 2,
          }}
        >
          <JuniorIcon name="sparkle" size={44} />
        </div>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 90,
            top: 105,
            animation: live ? 'cpj16-twinkle 3.1s ease-in-out infinite' : undefined,
            zIndex: 2,
          }}
        >
          <JuniorIcon name="star-glow" size={44} />
        </div>

        {/* Interactive ScratchJr Laptop Window with Bunny playing Cilukba behind Bush */}
        <button
          type="button"
          onClick={() => setPeeking((v) => !v)}
          className="cpj16-card-btn"
          style={{
            position: 'absolute',
            right: 45,
            top: 185,
            width: 485,
            borderRadius: 24,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            padding: 14,
            zIndex: 2,
            textAlign: 'left',
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
              <JuniorIcon name="bunny" size={22} />
              <span>ScratchJr — Taman Cilukba</span>
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 99,
                background: SUNNY_SOFT,
                border: `2px solid ${CHARCOAL}`,
              }}
            >
              Klik untuk Cilukba!
            </span>
          </div>

          <div style={{ height: 235, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <ParkBackdropSvg width="100%" height="100%" />

            {/* White Bunny peeking behind bush */}
            <div
              style={{
                position: 'absolute',
                left: 195,
                bottom: peeking ? 36 : -6,
                opacity: peeking ? 1 : 0.25,
                transform: peeking ? 'scale(1)' : 'scale(0.84)',
                transition: 'all 320ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <WhiteRabbitSvg size={142} speechBubble={peeking ? 'Cilukba!' : undefined} />
            </div>

            {/* Foreground Garden Bush */}
            <div style={{ position: 'absolute', left: 175, bottom: -8, pointerEvents: 'none' }}>
              <BushForegroundSvg width={190} />
            </div>
          </div>
        </button>

        {/* Biko Mascot cheerfully pointing at the Bunny on ScratchJr screen */}
        <div
          style={{
            position: 'absolute',
            left: -10,
            bottom: 35,
            zIndex: 3,
            animation: live ? 'cpj16-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={345}
            badgeIcon={<JuniorIcon name="bunny" size={24} />}
            speechBubble="Cilukba!"
          />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi Besar dalam Bingkai macOS + Biko)
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
        headerLabel="Misi Petak Umpet • Pertemuan 16"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu Misi 1 (Aksen Kuning) */}
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
                width: 225,
                height: 195,
                borderRadius: 28,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              <ScratchJrBlock kind="start-tap" scale={1.15} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Kenali Pemicu{' '}
              <span style={{ color: '#B45309' }}>Sentuh Karakter</span> (Tap)
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
                height: 195,
                borderRadius: 28,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...row,
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <ScratchJrBlock kind="hide" scale={0.96} />
              <ScratchJrBlock kind="show" scale={0.96} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Main Petak Umpet pakai{' '}
              <span style={{ color: '#047857' }}>Hide &amp; Show!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Biko Mascot excitedly pointing to the 2 mission cards */}
      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj16-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="target" size={24} />}
          speechBubble="Yuk mulai!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Blok Kuning Baru: Sentuh Karakter (Start on Tap)
// ============================================================================
const Slide03SentuhKarakter: Page = () => {
  const live = useIsActivePage();
  const [tappedCount, setTappedCount] = useState(0);

  return (
    <JuniorFrame badge="BLOK KUNING BARU" accentDot={SUNNY}>
      <SlideTitle>
        Ini Namanya <Highlight>Sentuh Karakter!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Visual: Giant Start-on-Tap Block + Clickable Bunny Stage */}
      <MacWindowCard
        left={X0}
        top={235}
        width={820}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Blok Pemicu Kuning • Start on Tap"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Giant Block + Label */}
          <div style={{ ...row, gap: 30, marginTop: 6 }}>
            <div style={{ animation: live ? 'cpj16-float 3s ease-in-out infinite' : undefined }}>
              <ScratchJrBlock kind="start-tap" scale={1.55} activeGlow={tappedCount > 0} />
            </div>
            <div
              style={{
                padding: '16px 26px',
                borderRadius: 22,
                background: SUNNY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: '#92400E', textTransform: 'uppercase' }}>NAMA BLOK:</div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
                Sentuh Karakter
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: MUTED }}>(Start on Tap)</div>
            </div>
          </div>

          {/* Interactive Mini Stage: Tap the Bunny directly! */}
          <button
            type="button"
            onClick={() => setTappedCount((c) => c + 1)}
            className="cpj16-card-btn"
            style={{
              width: '100%',
              height: 310,
              borderRadius: 24,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
              padding: 0,
            }}
          >
            <ParkBackdropSvg width="100%" height="100%" />

            <div
              style={{
                position: 'absolute',
                left: 230,
                bottom: 24,
                transform: tappedCount > 0 ? `translateY(${tappedCount % 2 === 1 ? '-18px' : '0px'})` : undefined,
                transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <WhiteRabbitSvg
                size={185}
                speechBubble={tappedCount > 0 ? `Klik #${tappedCount}! Jalan!` : 'Klik Aku!'}
              />
            </div>

            {/* Animated Hand Pointer tapping bunny */}
            <div
              style={{
                position: 'absolute',
                left: 418,
                bottom: 58,
                padding: '10px 18px',
                borderRadius: 99,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 4px 0 ${CHARCOAL}`,
                ...row,
                gap: 8,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
                animation: live ? 'cpj16-tap 1.3s ease-in-out infinite' : undefined,
              }}
            >
              <JuniorIcon name="tap" size={28} />
              <span>Sentuh Badan Kelinci!</span>
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
        headerLabel="Cara Kerjanya"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 10 }}>
            <BulletRow icon="tap" bgColor={SUNNY_SOFT} fontSize={34}>
              Kode jalan saat <strong>Karakter Diklik</strong>
            </BulletRow>
            <BulletRow icon="sparkle" bgColor={LAVENDER_SOFT} fontSize={34}>
              Tidak perlu tekan <strong>Bendera Hijau!</strong>
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
              Blok <strong>Kuning</strong> ditaruh paling depan untuk memulai kode saat kelinci disentuh!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Blok Ungu Baru #1: Sembunyi (Hide)
// ============================================================================
const Slide04BlokSembunyi: Page = () => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <JuniorFrame badge="BLOK UNGU BARU #1" accentDot={LAVENDER}>
      <SlideTitle>
        Blok <Highlight>Sembunyi</Highlight> (Hide)
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={860}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Mengenal Blok Sembunyi"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="hide" bgColor={LAVENDER_SOFT} fontSize={34}>
              Bikin karakter <strong>Menghilang</strong> dari layar
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={34}>
              Seperti sedang <strong>Bersembunyi!</strong>
            </BulletRow>
          </div>

          <button
            type="button"
            onClick={() => setIsHidden((v) => !v)}
            className="cpj16-card-btn"
            style={{
              padding: '20px 28px',
              borderRadius: 22,
              background: isHidden ? LAVENDER : WHITE,
              color: isHidden ? WHITE : CHARCOAL,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 28,
              fontWeight: 700,
              ...row,
              justifyContent: 'center',
              gap: 14,
            }}
          >
            <JuniorIcon name={isHidden ? 'hide' : 'show'} size={34} />
            <span>{isHidden ? 'Lihat Sebelum Sembunyi' : 'Klik untuk Sembunyi (Hide)!'}</span>
          </button>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Visual: Hide Block + Fading Bunny */}
      <MacWindowCard
        left={1000}
        top={235}
        width={820}
        height={720}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Blok Ungu • Sembunyi (Hide)"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 28 }}>
            <ScratchJrBlock kind="hide" scale={1.55} />
            <div
              style={{
                padding: '16px 26px',
                borderRadius: 22,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: '#6D28D9' }}>CIRI IKONNYA:</div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
                Garis Putus-Putus
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: MUTED }}>Artinya menghilang / ngumpet!</div>
            </div>
          </div>

          <div
            style={{
              width: '100%',
              height: 335,
              borderRadius: 24,
              border: `3.5px solid ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <ParkBackdropSvg width="100%" height="100%" />
            <div style={{ position: 'absolute', left: 265, bottom: 20 }}>
              <WhiteRabbitSvg size={195} ghosted={isHidden} speechBubble={isHidden ? undefined : 'Aku di sini!'} />
            </div>
            {isHidden && (
              <div
                style={{
                  position: 'absolute',
                  right: 26,
                  top: 22,
                  padding: '10px 18px',
                  borderRadius: 99,
                  background: LAVENDER,
                  color: WHITE,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                Wuuush... Menghilang!
              </div>
            )}
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Blok Ungu Baru #2: Muncul (Show)
// ============================================================================
const Slide05BlokMuncul: Page = () => {
  const live = useIsActivePage();
  const [popped, setPopped] = useState(true);

  return (
    <JuniorFrame badge="BLOK UNGU BARU #2" accentDot={LAVENDER}>
      <SlideTitle>
        Blok <Highlight>Muncul</Highlight> (Show)
      </SlideTitle>

      {/* Left Spotlight Visual: Show Block + Bunny hopping out shouting Cilukba! */}
      <MacWindowCard
        left={X0}
        top={235}
        width={820}
        height={720}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Blok Ungu • Muncul (Show)"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 28 }}>
            <ScratchJrBlock kind="show" scale={1.55} />
            <div
              style={{
                padding: '16px 26px',
                borderRadius: 22,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: '#6D28D9' }}>CIRI IKONNYA:</div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
                Siluet Putih Penuh
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: MUTED }}>Artinya tampil kembali!</div>
            </div>
          </div>

          <div
            style={{
              width: '100%',
              height: 335,
              borderRadius: 24,
              border: `3.5px solid ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <ParkBackdropSvg width="100%" height="100%" />

            <div
              style={{
                position: 'absolute',
                left: 255,
                bottom: popped ? 20 : -35,
                opacity: popped ? 1 : 0.2,
                transition: 'all 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                animation: popped && live ? 'cpj16-hop 2s ease-in-out infinite' : undefined,
              }}
            >
              <WhiteRabbitSvg size={195} ghosted={!popped} speechBubble={popped ? 'Cilukba!' : undefined} />
            </div>

            {popped && (
              <>
                <div style={{ position: 'absolute', left: 170, top: 46 }}>
                  <JuniorIcon name="sparkle" size={38} />
                </div>
                <div style={{ position: 'absolute', right: 175, top: 42 }}>
                  <JuniorIcon name="star-glow" size={38} />
                </div>
              </>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={960}
        top={235}
        width={860}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Mengenal Blok Muncul"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="show" bgColor={LAVENDER_SOFT} fontSize={34}>
              Bikin karakter <strong>Tampil Kembali</strong>
            </BulletRow>
            <BulletRow icon="party" bgColor={TEAL_SOFT} fontSize={34}>
              <strong>&ldquo;Cilukba!&rdquo;</strong> Kelinci muncul lagi!
            </BulletRow>
          </div>

          <button
            type="button"
            onClick={() => setPopped((v) => !v)}
            className="cpj16-card-btn"
            style={{
              padding: '20px 28px',
              borderRadius: 22,
              background: popped ? TEAL : WHITE,
              color: popped ? WHITE : CHARCOAL,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 28,
              fontWeight: 700,
              ...row,
              justifyContent: 'center',
              gap: 14,
            }}
          >
            <JuniorIcon name={popped ? 'hide' : 'show'} size={34} />
            <span>{popped ? 'Umpetin Kelinci Dulu' : 'Klik untuk Muncul (Show)!'}</span>
          </button>
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
      <SlideTitle align="center" maxWidth={1600} top={128} size={54}>
        Blok Mana untuk Bikin Kelinci <Highlight>Menghilang?</Highlight>
      </SlideTitle>

      {/* Choice Cards */}
      <div style={{ ...abs(190, 255, 1540, 445), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Blok Sembunyi / Hide) */}
        <button
          type="button"
          onClick={() => setPicked('A')}
          className="cpj16-card-btn"
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
              background: SUNNY,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            PILIHAN A
          </div>

          <div style={{ marginTop: 18 }}>
            <ScratchJrBlock kind="hide" scale={1.7} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Blok Sembunyi (Hide)
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
              <span>Benar! Ikon putus-putus bikin menghilang!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Blok Muncul / Show) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj16-card-btn"
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
            animation: picked === 'B' ? 'cpj16-shake 0.35s ease' : undefined,
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
            PILIHAN B
          </div>

          <div style={{ marginTop: 18 }}>
            <ScratchJrBlock kind="show" scale={1.7} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Blok Muncul (Show)
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
              <span>Ups! Yang ini bikin tampil lagi!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Center Prompt + Biko holding Question Sign */}
      <div style={{ ...abs(190, 725, 1540, 280), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj16-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={230}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Jagoan!' : 'Yang mana ya?'}
          />
        </div>

        {/* Question Sign & Instruction */}
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
// SLIDE 07 — Jurus Cilukba: Gabung Sentuh, Hide & Show!
// ============================================================================
const Slide07JurusCilukba: Page = () => {
  const [phase, setPhase] = useState<'idle' | 'tap' | 'hide' | 'show'>('idle');

  useEffect(() => {
    if (phase === 'idle') return;
    if (phase === 'tap') {
      const t = setTimeout(() => setPhase('hide'), 550);
      return () => clearTimeout(t);
    }
    if (phase === 'hide') {
      const t = setTimeout(() => setPhase('show'), 1050);
      return () => clearTimeout(t);
    }
    if (phase === 'show') {
      const t = setTimeout(() => setPhase('idle'), 1500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <JuniorFrame badge="JURUS CILUKBA AJAIB" accentDot={TEAL}>
      <SlideTitle>
        Rangkai <Highlight>Sulap Cilukba!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={230}
        width={1720}
        height={735}
        titleBarColor={CREAM}
        headerLabel="Urutan Kode Cilukba"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top 3 Sequential Step Cards */}
          <div style={{ display: 'flex', gap: 28 }}>
            {/* Langkah 1 */}
            <div
              style={{
                flex: 1,
                borderRadius: 22,
                background: SUNNY_SOFT,
                border: `3.5px solid ${phase === 'tap' ? TEAL : CHARCOAL}`,
                boxShadow: `0 6px 0 ${SUNNY}`,
                padding: '20px 24px',
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
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="start-tap" size={30} style={{ marginRight: 8 }} />
                Pasang <strong>Sentuh Karakter</strong> di depan
              </div>
            </div>

            {/* Langkah 2 */}
            <div
              style={{
                flex: 1,
                borderRadius: 22,
                background: LAVENDER_SOFT,
                border: `3.5px solid ${phase === 'hide' ? TEAL : CHARCOAL}`,
                boxShadow: `0 6px 0 ${LAVENDER}`,
                padding: '20px 24px',
                ...row,
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background: LAVENDER,
                  color: WHITE,
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
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="hide" size={30} style={{ marginRight: 8 }} />
                Sambung blok <strong>Sembunyi</strong> (Hide)
              </div>
            </div>

            {/* Langkah 3 */}
            <div
              style={{
                flex: 1,
                borderRadius: 22,
                background: TEAL_SOFT,
                border: `3.5px solid ${phase === 'show' ? SUNNY : CHARCOAL}`,
                boxShadow: `0 6px 0 ${TEAL}`,
                padding: '20px 24px',
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
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="show" size={30} style={{ marginRight: 8 }} />
                Sambung <strong>Muncul</strong> -&gt; &ldquo;Cilukba!&rdquo;
              </div>
            </div>
          </div>

          {/* Bottom Section: Snapped Chain + Interactive Mini Demo Stage */}
          <div
            style={{
              height: 410,
              borderRadius: 26,
              background: CREAM,
              border: `3px solid ${CHARCOAL}`,
              padding: '24px 36px',
              ...row,
              justifyContent: 'space-between',
              gap: 36,
            }}
          >
            {/* Snapped Blocks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700, color: MUTED }}>
                Rangkaian Blok yang Menempel Rapat:
              </div>
              <div style={{ ...row, alignItems: 'center' }}>
                <ScratchJrBlock kind="start-tap" scale={1.35} activeGlow={phase === 'tap'} />
                <div style={{ marginLeft: -18 }}>
                  <ScratchJrBlock kind="hide" scale={1.35} activeGlow={phase === 'hide'} />
                </div>
                <div style={{ marginLeft: -18 }}>
                  <ScratchJrBlock kind="show" scale={1.35} activeGlow={phase === 'show'} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPhase('tap')}
                className="cpj16-card-btn"
                style={{
                  marginTop: 6,
                  padding: '14px 28px',
                  borderRadius: 18,
                  background: SUNNY,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 5px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 25,
                  fontWeight: 700,
                  ...row,
                  gap: 10,
                }}
              >
                <JuniorIcon name="tap" size={28} />
                <span>Klik Kelinci untuk Tes Jurus!</span>
              </button>
            </div>

            {/* Interactive Bunny Stage */}
            <button
              type="button"
              onClick={() => setPhase('tap')}
              className="cpj16-card-btn"
              style={{
                width: 540,
                height: 350,
                borderRadius: 24,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                position: 'relative',
                overflow: 'hidden',
                padding: 0,
                flexShrink: 0,
              }}
            >
              <ParkBackdropSvg width="100%" height="100%" />
              <div
                style={{
                  position: 'absolute',
                  left: 175,
                  bottom: 22,
                  opacity: phase === 'hide' ? 0.14 : 1,
                  transform: phase === 'show' ? 'scale(1.08) translateY(-10px)' : 'scale(1)',
                  transition: 'all 280ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <WhiteRabbitSvg
                  size={185}
                  ghosted={phase === 'hide'}
                  speechBubble={
                    phase === 'show'
                      ? 'Cilukba!'
                      : phase === 'tap'
                        ? 'Diklik!'
                        : undefined
                  }
                />
              </div>
            </button>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Petak Umpet (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsSulap: Page = () => {
  return (
    <JuniorFrame badge="TIPS JAGOAN SULAP" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Kelinci <Highlight>Tidak Hilang Terus!</Highlight>
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
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
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
            <BulletRow icon="show" bgColor={TEAL_SOFT} fontSize={30}>
              Pasang blok <strong>Muncul</strong> setelah Sembunyi
            </BulletRow>
            <BulletRow icon="start-tap" bgColor={SUNNY_SOFT} fontSize={30}>
              Klik <strong>Langsung</strong> badan kelinci di panggung
            </BulletRow>
          </div>

          {/* Success Illustration Box */}
          <div
            style={{
              height: 245,
              borderRadius: 22,
              border: `3.5px solid ${TEAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <ParkBackdropSvg width="100%" height="100%" />
            <div style={{ position: 'absolute', left: 36, bottom: 16 }}>
              <WhiteRabbitSvg size={155} speechBubble="Cilukba!" />
            </div>
            <div
              style={{
                position: 'absolute',
                right: 26,
                bottom: 28,
                padding: '12px 16px',
                borderRadius: 20,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                ...row,
              }}
            >
              <ScratchJrBlock kind="start-tap" scale={0.78} />
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind="hide" scale={0.78} />
              </div>
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind="show" scale={0.78} />
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
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
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
              Pakai <strong>Sembunyi</strong> saja tanpa Muncul
            </BulletRow>
            <BulletRow icon="flag" bgColor={SUNNY_SOFT} fontSize={30}>
              Salah pasang <strong>Bendera Hijau</strong> padahal mau diklik
            </BulletRow>
          </div>

          {/* Empty Stage Illustration Box with Detective Biko */}
          <div
            style={{
              height: 245,
              borderRadius: 22,
              border: `3.5px solid ${CORAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <ParkBackdropSvg width="100%" height="100%" />
            {/* Faint dashed outline of missing rabbit */}
            <div style={{ position: 'absolute', left: 260, bottom: 18, opacity: 0.55 }}>
              <WhiteRabbitSvg size={130} ghosted />
            </div>
            {/* Biko Detective looking around */}
            <div style={{ position: 'absolute', left: 38, bottom: -6 }}>
              <BikoMascot
                pose="detective"
                width={175}
                badgeIcon={<JuniorIcon name="magnifier" size={18} />}
                speechBubble="Kelincinya hilang?"
              />
            </div>
            <div
              style={{
                position: 'absolute',
                right: 26,
                top: 20,
                padding: '10px 14px',
                borderRadius: 18,
                background: WHITE,
                border: `3px solid ${CORAL}`,
                ...row,
              }}
            >
              <ScratchJrBlock kind="start-flag" scale={0.72} />
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind="hide" scale={0.72} />
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Petak Umpet Kelinci Ajaib!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [practicePhase, setPracticePhase] = useState<'ready' | 'hiding' | 'cilukba'>('ready');

  const triggerPractice = () => {
    if (practicePhase !== 'ready') return;
    setPracticePhase('hiding');
    setTimeout(() => setPracticePhase('cilukba'), 900);
    setTimeout(() => setPracticePhase('ready'), 2300);
  };

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={SKY}>
      <SlideTitle>
        Misi <Highlight>Cilukba Kelinci Ajaib!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 232, W, 175), display: 'flex', gap: 28 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'bunny' as JuniorIconName,
            text: (
              <>
                Tambah karakter <strong>Kelinci</strong> di taman
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
                Rangkai <strong>Sentuh + Sembunyi + Muncul</strong>
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'start-tap' as JuniorIconName,
            text: (
              <>
                <strong>Klik Kelincinya!</strong> Mainkan cilukba!
              </>
            ),
          },
        ].map((step) => (
          <div
            key={step.num}
            style={{
              flex: 1,
              borderRadius: 24,
              background: step.bg,
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
                background: step.badgeBg,
                color: step.badgeText,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 32,
                fontWeight: 700,
                ...centerCol,
                flexShrink: 0,
              }}
            >
              {step.num}
            </div>
            <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
              <JuniorIcon name={step.icon} size={30} style={{ marginRight: 8 }} />
              {step.text}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive ScratchJr Practice Stage + Code Tray + Biko */}
      <MacWindowCard
        left={X0}
        top={435}
        width={1260}
        height={530}
        titleBarColor={WHITE}
        headerLabel="Simulasi Proyek Taman Kelinci — Klik Kelincinya!"
        padding={26}
      >
        <div style={{ display: 'flex', gap: 28, height: '100%', alignItems: 'center' }}>
          {/* Interactive Park Stage */}
          <button
            type="button"
            onClick={triggerPractice}
            className="cpj16-card-btn"
            style={{
              width: 590,
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
            <ParkBackdropSvg width="100%" height="100%" />

            <div
              style={{
                position: 'absolute',
                left: 205,
                bottom: 24,
                opacity: practicePhase === 'hiding' ? 0.14 : 1,
                transform: practicePhase === 'cilukba' ? 'scale(1.08) translateY(-14px)' : 'scale(1)',
                transition: 'all 260ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <WhiteRabbitSvg
                size={190}
                ghosted={practicePhase === 'hiding'}
                speechBubble={
                  practicePhase === 'cilukba'
                    ? 'Cilukba!'
                    : practicePhase === 'ready'
                      ? 'Klik Aku!'
                      : undefined
                }
              />
            </div>
          </button>

          {/* Code Tray */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                padding: '12px 20px',
                borderRadius: 16,
                background: SKY_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                ...row,
                gap: 12,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="bunny" size={28} />
              <span>Kode untuk Kelinci Putih:</span>
            </div>

            <div
              style={{
                padding: '24px 20px',
                borderRadius: 22,
                background: CREAM,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                justifyContent: 'center',
              }}
            >
              <ScratchJrBlock kind="start-tap" scale={1.18} activeGlow={practicePhase === 'ready'} />
              <div style={{ marginLeft: -14 }}>
                <ScratchJrBlock kind="hide" scale={1.18} activeGlow={practicePhase === 'hiding'} />
              </div>
              <div style={{ marginLeft: -14 }}>
                <ScratchJrBlock kind="show" scale={1.18} activeGlow={practicePhase === 'cilukba'} />
              </div>
            </div>

            <button
              type="button"
              onClick={triggerPractice}
              className="cpj16-card-btn"
              style={{
                padding: '16px 24px',
                borderRadius: 20,
                background: SUNNY,
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
              <JuniorIcon name="tap" size={28} />
              <span>Coba Klik Kelinci Sekarang!</span>
            </button>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko on Right */}
      <div
        style={{
          ...abs(1400, 445, 430, 520),
          ...centerCol,
          animation: live ? 'cpj16-hop 2.4s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="thumbs-up"
          width={360}
          badgeIcon={<JuniorIcon name="sparkle" size={24} />}
          speechBubble="Ayo coba!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 16 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      {/* Floating Confetti Dots & Shapes */}
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj16-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj16-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="star-glow" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj16-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1450} top={122} size={62}>
        Hore! Kamu <Highlight>Pesulap Cilukba!</Highlight>{' '}
        <JuniorIcon name="party" size={54} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 16"
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
          {/* Bespoke Golden Champion Medal SVG: Magician Hat with Star + Bunny Ears */}
          <div style={{ animation: live ? 'cpj16-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              {/* Ribbons */}
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              {/* Outer Gold Medal Circle */}
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Cute White Bunny Ears peeking inside/behind hat */}
              <ellipse cx="101" cy="64" rx="10" ry="24" transform="rotate(-14 101 64)" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.4} />
              <ellipse cx="139" cy="64" rx="10" ry="24" transform="rotate(14 139 64)" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.4} />
              <ellipse cx="101" cy="65" rx="4.5" ry="14" transform="rotate(-14 101 65)" fill="#FBCFE8" />
              <ellipse cx="139" cy="65" rx="4.5" ry="14" transform="rotate(14 139 65)" fill="#FBCFE8" />
              {/* Magician Hat */}
              <path d="M88 122 L95 72 H145 L152 122 Z" fill={CHARCOAL} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
              <rect x="91" y="109" width="58" height="11" rx="3" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={2.2} />
              <ellipse cx="120" cy="123" rx="50" ry="11" fill={CHARCOAL} />
              {/* Glowing Star on Hat */}
              <path
                d="M120 77 L124 88 L135 90 L126 97 L129 108 L120 101 L111 108 L114 97 L105 90 L116 88 Z"
                fill={SUNNY}
                stroke={WHITE}
                strokeWidth={1.8}
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
            <span>Lencana Pesulap Petak Umpet</span>
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
            Kamu sudah mahir pakai{' '}
            <Highlight color="#D1FAE5">Sentuh Karakter, Hide, &amp; Show!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="bunny" size={22} />}
            speechBubble="Cilukba Hebat!"
          />
          <div style={{ animation: live ? 'cpj16-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 16 — Cilukba Kelinci Ajaib! 🐰
Hari ini kita akan bermain petak umpet interaktif di ScratchJr: kalau kelinci kita diklik, kelincinya bersembunyi lalu muncul lagi!`,

  `Dua misi seru hari ini:
1. Mengenal blok pemicu Kuning baru: Sentuh Karakter (Start on Tap).
2. Menggabungkan blok Ungu Sembunyi (Hide) dan Muncul (Show) untuk main cilukba!`,

  `Blok Kuning Baru — Sentuh Karakter (Start on Tap):
Berbeda dengan Bendera Hijau, kode di belakang blok ini baru berjalan ketika anak-anak menyentuh/mengklik langsung badan Kelincinya di panggung!`,

  `Blok Ungu Baru #1 — Sembunyi (Hide):
Lihat ikonnya bergaris putus-putus! Blok ini menyulap karakter menjadi menghilang dari layar, seperti sedang ngumpet di balik semak.`,

  `Blok Ungu Baru #2 — Muncul (Show):
Ikonnya siluet penuh putih! Setelah bersembunyi, blok Show membuat Kelinci tampil kembali sambil berseru "Cilukba!"`,

  `Permainan Cepat! Ayo tebak bersama:
Blok mana untuk bikin Kelinci menghilang — Pilihan A (Garis putus-putus / Sembunyi) atau Pilihan B (Siluet penuh / Muncul)?`,

  `Jurus Cilukba Ajaib!
Rangkai 3 blok berurutan: 1. Sentuh Karakter (Kuning) -> 2. Sembunyi/Hide (Ungu) -> 3. Muncul/Show (Ungu). Coba klik Kelinci di layar untuk melihat aksinya!`,

  `Tips Jagoan Petak Umpet:
BOLEH pasang blok Muncul setelah Sembunyi dan klik badan kelinci langsung.
JANGAN pasang Sembunyi sendirian tanpa Muncul (nanti kelincinya hilang terus!), atau salah pakai Bendera Hijau padahal maunya diklik!`,

  `Waktunya Misi Praktik Cilukba Kelinci Ajaib:
1. Tambah karakter Kelinci di taman. 2. Rangkai Sentuh + Sembunyi + Muncul. 3. Klik Kelincinya dan mainkan cilukba berulang kali!`,

  `Selamat untuk semua Pesulap Cilukba! 🎉
Hari ini kalian berhasil meraih Lencana Pesulap Petak Umpet karena mahir memakai Sentuh Karakter, Hide, & Show!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 16 — Cilukba Kelinci Ajaib!',
  createdAt: '2026-11-14T15:54:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03SentuhKarakter,
  Slide04BlokSembunyi,
  Slide05BlokMuncul,
  Slide06AyoTebak,
  Slide07JurusCilukba,
  Slide08TipsSulap,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-9-jurus-kode-ringkas';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj9-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj9-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-12px) scale(1.04); }
}
@keyframes cpj9-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj9-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj9-spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes cpj9-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj9-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj9-card-btn:hover {
  transform: translateY(-4px);
}
.cpj9-card-btn:active {
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
          animation: live ? 'cpj9-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 9 • Jurus Kode Ringkas!</span>
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
            fontSize: 17,
            fontWeight: 800,
            color: MUTED,
            letterSpacing: '0.03em',
          }}
        >
          {headerLabel}
        </span>
      )}
      <div style={{ width: 64 }} />
    </div>
    <div style={{ flex: 1, padding, position: 'relative', overflow: 'hidden' }}>{children}</div>
  </div>
);

// ============================================================================
// Pertemuan 9 Visual Assets: Repeat Hug Block, Arrows, Wand, Biko Token & Maze
// ============================================================================
type Dir = 'up' | 'down' | 'left' | 'right';

const DIR_META: Record<Dir, { label: string; color: string; rot: number; symbol: string }> = {
  up: { label: 'Atas', color: TEAL, rot: -90, symbol: '⬆️' },
  down: { label: 'Bawah', color: CORAL, rot: 90, symbol: '⬇️' },
  left: { label: 'Kiri', color: SUNNY, rot: 180, symbol: '⬅️' },
  right: { label: 'Kanan', color: SKY, rot: 0, symbol: '➡️' },
};

const LoopArrowBlock = ({
  dir,
  size = 80,
  stepNum,
  active = false,
  showRightTab = false,
  onClick,
}: {
  dir: Dir;
  size?: number;
  stepNum?: number;
  active?: boolean;
  showRightTab?: boolean;
  onClick?: () => void;
}) => {
  const m = DIR_META[dir];
  return (
    <button
      type="button"
      onClick={onClick}
      className={onClick ? 'cpj9-card-btn' : undefined}
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.24),
        background: m.color,
        border: `3px solid ${CHARCOAL}`,
        boxShadow: active
          ? `0 0 0 6px ${SUNNY}, 0 6px 0 ${CHARCOAL}`
          : `0 6px 0 ${CHARCOAL}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        cursor: onClick ? 'pointer' : 'default',
        flexShrink: 0,
      }}
      aria-label={`Blok panah ${m.label}`}
    >
      {showRightTab && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            right: -11,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 28,
            borderRadius: '0 10px 10px 0',
            background: m.color,
            border: `3px solid ${CHARCOAL}`,
            borderLeft: 'none',
            zIndex: 2,
          }}
        />
      )}
      {stepNum !== undefined && (
        <span
          style={{
            position: 'absolute',
            top: -12,
            left: -10,
            width: 28,
            height: 28,
            borderRadius: 99,
            background: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 16,
            fontWeight: 700,
            color: CHARCOAL,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
          }}
        >
          {stepNum}
        </span>
      )}
      <svg
        width={Math.round(size * 0.56)}
        height={Math.round(size * 0.56)}
        viewBox="0 0 48 48"
        fill="none"
        style={{ transform: `rotate(${m.rot}deg)` }}
      >
        <path
          d="M8 18 H26 V9 L42 24 L26 39 V30 H8 Z"
          fill={WHITE}
          stroke={CHARCOAL}
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

/** ScratchJr-inspired C-Shaped Repeat ("Ulangi") Hug Block */
const RepeatHugBlock = ({
  count,
  dir = 'right',
  scale = 1,
  showRightTab = false,
  detached = false,
  wrongNumber = false,
  onCountClick,
}: {
  count: number;
  dir?: Dir;
  scale?: number;
  showRightTab?: boolean;
  detached?: boolean;
  wrongNumber?: boolean;
  onCountClick?: () => void;
}) => {
  const w = Math.round(230 * scale);
  const blockBg = wrongNumber ? '#FCA5A5' : 'linear-gradient(135deg, #FBBF24 0%, #FB923C 100%)';

  return (
    <div
      style={{
        position: 'relative',
        width: w,
        padding: `${Math.round(14 * scale)}px ${Math.round(16 * scale)}px`,
        borderRadius: Math.round(24 * scale),
        background: blockBg,
        border: `3.5px solid ${CHARCOAL}`,
        boxShadow: `0 ${Math.round(7 * scale)}px 0 ${CHARCOAL}`,
        display: 'flex',
        flexDirection: 'column',
        gap: Math.round(10 * scale),
        flexShrink: 0,
      }}
    >
      {showRightTab && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            right: -13,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 18,
            height: 36,
            borderRadius: '0 12px 12px 0',
            background: ORANGE,
            border: `3.5px solid ${CHARCOAL}`,
            borderLeft: 'none',
            zIndex: 2,
          }}
        />
      )}

      {/* Top Loop Bar */}
      <div style={{ ...row, justifyContent: 'space-between', gap: 8 }}>
        <div
          style={{
            ...row,
            gap: 6,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(23 * scale),
            fontWeight: 700,
            color: CHARCOAL,
          }}
        >
          <span>🔁</span>
          <span>Ulangi</span>
        </div>

        <button
          type="button"
          onClick={onCountClick}
          className={onCountClick ? 'cpj9-card-btn' : undefined}
          style={{
            minWidth: Math.round(46 * scale),
            height: Math.round(40 * scale),
            padding: '0 12px',
            borderRadius: Math.round(12 * scale),
            background: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(24 * scale),
            fontWeight: 700,
            color: wrongNumber ? CORAL : CHARCOAL,
            cursor: onCountClick ? 'pointer' : 'default',
          }}
        >
          {count}
        </button>
      </div>

      {/* Inner Hugging Cavity */}
      <div
        style={{
          marginLeft: Math.round(18 * scale),
          padding: Math.round(10 * scale),
          borderRadius: Math.round(18 * scale),
          background: WHITE,
          border: `2.5px dashed ${CHARCOAL}`,
          ...centerCol,
          minHeight: Math.round(78 * scale),
        }}
      >
        {detached ? (
          <span
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: Math.round(18 * scale),
              fontWeight: 700,
              color: CORAL,
            }}
          >
            Kosong! 🚫
          </span>
        ) : (
          <LoopArrowBlock dir={dir} size={Math.round(68 * scale)} />
        )}
      </div>

      {/* Bottom Closing Bar */}
      <div
        style={{
          height: Math.round(12 * scale),
          borderRadius: 99,
          background: 'rgba(255,255,255,0.45)',
          border: `2px solid ${CHARCOAL}`,
        }}
      />
    </div>
  );
};

/** Cute Biko token for grid tiles */
const BikoTokenSvg = ({
  size = 64,
  tired = false,
  style,
}: {
  size?: number;
  tired?: boolean;
  style?: CSSProperties;
}) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
    <circle cx="20" cy="28" r="9" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.2} />
    <circle cx="60" cy="28" r="9" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.2} />
    <circle cx="40" cy="44" r="24" fill="#F59E0B" stroke={CHARCOAL} strokeWidth={3.4} />
    <ellipse cx="40" cy="49" rx="17" ry="14" fill="#FEF3C7" />
    <circle cx="32" cy="43" r="3.4" fill={CHARCOAL} />
    <circle cx="48" cy="43" r="3.4" fill={CHARCOAL} />
    <circle cx="33" cy="41.8" r="1.1" fill={WHITE} />
    <circle cx="49" cy="41.8" r="1.1" fill={WHITE} />
    <ellipse cx="40" cy="49" rx="4.5" ry="3.2" fill={CHARCOAL} />
    {tired ? (
      <>
        <path d="M58 26 Q66 32 62 38 Q56 36 58 26 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={2} />
        <path d="M33 57 Q40 52 47 57" stroke={CORAL} strokeWidth={2.8} strokeLinecap="round" />
      </>
    ) : (
      <path d="M34 54.5 Q40 60 46 54.5" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" />
    )}
  </svg>
);

const StarSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M40 10 L48 30 L70 32 L53 46 L58 68 L40 56 L22 68 L27 46 L10 32 L32 30 Z"
      fill={SUNNY}
      stroke={CHARCOAL}
      strokeWidth={3.8}
      strokeLinejoin="round"
    />
  </svg>
);

const ChestSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="67" rx="26" ry="5.5" fill="#FDE68A" />
    <rect x="14" y="34" width="52" height="30" rx="8" fill="#B45309" stroke={CHARCOAL} strokeWidth={3.4} />
    <path d="M14 36 C14 20, 66 20, 66 36 Z" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.4} />
    <rect x="24" y="24" width="8" height="40" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.4} />
    <rect x="48" y="24" width="8" height="40" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.4} />
    <rect x="34" y="36" width="12" height="14" rx="4" fill={SKY} stroke={CHARCOAL} strokeWidth={2.6} />
  </svg>
);

const RockSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="66" rx="28" ry="6.5" fill="#D6CEC2" />
    <path d="M14 60 L18 34 L34 20 L56 24 L67 44 L64 60 Z" fill="#94A3B8" stroke={CHARCOAL} strokeWidth={3.6} strokeLinejoin="round" />
    <path d="M20 56 L24 38 L36 27 L48 29 L40 44 L36 56 Z" fill="#CBD5E1" />
  </svg>
);

const MagicWandSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <line x1="16" y1="64" x2="52" y2="28" stroke={CHARCOAL} strokeWidth={9} strokeLinecap="round" />
    <line x1="16" y1="64" x2="52" y2="28" stroke={LAVENDER} strokeWidth={4.5} strokeLinecap="round" />
    <path
      d="M54 8 L58 20 L70 22 L61 30 L63 42 L54 36 L45 42 L47 30 L38 22 L50 20 Z"
      fill={SUNNY}
      stroke={CHARCOAL}
      strokeWidth={3.2}
      strokeLinejoin="round"
    />
  </svg>
);

// ============================================================================
// SLIDE 01 — Cover (Stadium Loop Capsule Backdrop + Repeat Hug Block + Biko)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 9" accentDot={SUNNY}>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 210, 890, 700), display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
          <span>🔁</span>
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          Jurus{' '}
          <br />
          <Highlight>Kode Ringkas!</Highlight>
        </h1>

        <p
          style={{
            margin: '28px 0 36px',
            fontSize: 33,
            fontWeight: 700,
            lineHeight: 1.38,
            color: MUTED,
            maxWidth: 790,
          }}
        >
          Mengenal Blok Ulangi (<em>Repeat</em>) di Labirin Visual
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
              fontSize: 27,
              fontWeight: 700,
            }}
          >
            <span>🔁</span>
            <span>Blok Ulangi (Repeat)</span>
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
              fontSize: 27,
              fontWeight: 700,
            }}
          >
            <span>⚡</span>
            <span>Kode Jadi Pendek!</span>
          </div>
        </div>
      </div>

      {/* Right Visual Showcase: Stadium Loop Capsule Backdrop (Distinct from Pertemuan 1-8) */}
      <div style={{ ...abs(1000, 165, 820, 785), ...centerCol }}>
        {/* Loop Capsule Backdrop */}
        <div
          style={{
            position: 'absolute',
            width: 670,
            height: 590,
            borderRadius: '260px 64px 260px 64px',
            background: 'linear-gradient(155deg, #FEF9C3 0%, #FFF7ED 55%, #EFF6FF 100%)',
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${LAVENDER}`,
            overflow: 'hidden',
          }}
        >
          {/* Repeating Loop Track Arcs */}
          <svg width="100%" height="100%" viewBox="0 0 670 590" fill="none" style={{ opacity: 0.3 }}>
            <rect x="65" y="75" width="540" height="440" rx="180" stroke={ORANGE} strokeWidth={4} strokeDasharray="16 12" />
            <rect x="115" y="125" width="440" height="340" rx="140" stroke={SKY} strokeWidth={3} />
          </svg>
        </div>

        {/* Mini Laptop Long Track Card */}
        <div
          style={{
            position: 'absolute',
            left: 24,
            top: 44,
            width: 410,
            padding: '14px 18px',
            borderRadius: 22,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            zIndex: 4,
          }}
        >
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: MUTED, marginBottom: 8 }}>
            💻 Jalur Labirin Panjang (4 Langkah):
          </div>
          <div style={{ ...row, gap: 6, justifyContent: 'space-between', background: '#F8FAFC', padding: 8, borderRadius: 14, border: `2px solid ${CHARCOAL}` }}>
            <BikoTokenSvg size={44} />
            <span style={{ fontSize: 22, fontWeight: 800, color: SKY }}>➡️ ➡️ ➡️ ➡️</span>
            <StarSvg size={44} />
          </div>
        </div>

        {/* Floating Repeat Hug Block on Bottom-Left */}
        <div
          style={{
            position: 'absolute',
            left: 26,
            bottom: 72,
            zIndex: 5,
            animation: live ? 'cpj9-float 3s ease-in-out infinite' : undefined,
          }}
        >
          <RepeatHugBlock count={4} dir="right" scale={0.96} />
        </div>

        <BikoMascot
          pose="wave"
          width={395}
          style={{ position: 'relative', zIndex: 3, marginTop: 120, marginLeft: 180 }}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi Besar + Biko Menunjuk)
// ============================================================================
const Slide02Misi: Page = () => (
  <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
    <SlideTitle>
      Apa <Highlight>Misi Kita</Highlight> Hari Ini?
    </SlideTitle>

    <MacWindowCard left={X0} top={250} width={1280} height={675} headerLabel="daftar-misi-9.exe" padding={42}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, height: '100%' }}>
        {/* Kartu 1: Biru #60A5FA */}
        <div
          style={{
            borderRadius: 26,
            background: SKY_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${SKY}`,
            padding: '34px 32px',
            ...centerCol,
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
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            MISI 1
          </div>

          <div
            style={{
              padding: '22px 32px',
              borderRadius: 26,
              background: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              ...centerCol,
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 99,
                background: SUNNY,
                border: `3.5px solid ${CHARCOAL}`,
                ...centerCol,
                fontSize: 52,
              }}
            >
              🔁
            </div>
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.25,
              color: CHARCOAL,
            }}
          >
            Kenali <Highlight color={STABILO}>Blok Ulangi</Highlight>
            <br />
            (<em>Repeat</em>)
          </div>
        </div>

        {/* Kartu 2: Hijau #10B981 */}
        <div
          style={{
            borderRadius: 26,
            background: TEAL_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${TEAL}`,
            padding: '34px 32px',
            ...centerCol,
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
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            MISI 2
          </div>

          <div
            style={{
              ...row,
              gap: 12,
              padding: '18px 22px',
              borderRadius: 24,
              background: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 800 }}>➡️➡️➡️</div>
            <span style={{ fontSize: 28, fontWeight: 800 }}>➜</span>
            <div
              style={{
                padding: '8px 14px',
                borderRadius: 14,
                background: SUNNY,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              🔁 3× ➡️
            </div>
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.25,
              color: CHARCOAL,
            }}
          >
            Ubah <Highlight color="#D1FAE5">Kode Panjang</Highlight>
            <br />
            Jadi <strong>Ringkas!</strong>
          </div>
        </div>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="point-left"
      width={380}
      speechBubble="Ayo belajar kode ringkas!"
      style={{ ...abs(1435, 315) }}
    />
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Masalah Coder: Wah, Kodenya Kepanjangan!
// ============================================================================
const Slide03Masalah: Page = () => {
  const [step, setStep] = useState(0); // 0..5
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const walkFive = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStep(0);
    const tick = (s: number) => {
      timerRef.current = window.setTimeout(() => {
        setStep(s);
        if (s < 5) tick(s + 1);
      }, 360);
    };
    tick(1);
  };

  return (
    <JuniorFrame badge="TANTANGAN CODER" accentDot={CORAL}>
      <SlideTitle>
        Wah, Kodenya <Highlight>Kepanjangan!</Highlight>
      </SlideTitle>

      {/* Top Spotlight Window: 6-Box Track + 5 Long Arrow Blocks */}
      <MacWindowCard left={X0} top={236} width={1720} height={430} headerLabel="masalah-kode-panjang.app" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
              Peta Jalan Lurus (5 Langkah ke Bintang ⭐):
            </span>
            <button
              type="button"
              className="cpj9-card-btn"
              onClick={walkFive}
              style={{
                padding: '10px 22px',
                borderRadius: 16,
                background: SKY,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                boxShadow: `0 4px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              ▶️ Jalan 5 Langkah
            </button>
          </div>

          {/* 6 Horizontal Boxes */}
          <div
            style={{
              ...row,
              justifyContent: 'center',
              gap: 16,
              background: '#F8FAFC',
              padding: '18px 24px',
              borderRadius: 22,
              border: `3px solid ${CHARCOAL}`,
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((idx) => {
              const isBikoHere = step === idx;
              const isStar = idx === 5;
              const visited = idx > 0 && idx <= step;
              return (
                <div
                  key={idx}
                  style={{
                    width: 220,
                    height: 112,
                    borderRadius: 18,
                    background: isStar ? SUNNY_SOFT : visited ? TEAL_SOFT : WHITE,
                    border: `3px solid ${CHARCOAL}`,
                    ...centerCol,
                  }}
                >
                  {isBikoHere && <BikoTokenSvg size={76} tired={step >= 3 && step < 5} />}
                  {isStar && !isBikoHere && <StarSvg size={74} />}
                  {!isBikoHere && !isStar && (
                    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, color: '#94A3B8' }}>
                      {idx === 0 ? 'START' : `Langkah ${idx}`}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 5 Repeated Arrow Blocks */}
          <div style={{ ...row, justifyContent: 'center', gap: 18 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Fragment key={n}>
                <LoopArrowBlock dir="right" size={76} stepNum={n} active={step === n} showRightTab={n < 5} />
                {n < 5 && <span style={{ fontSize: 28, fontWeight: 800, color: CHARCOAL }}>+</span>}
              </Fragment>
            ))}
          </div>
        </div>
      </MacWindowCard>

      {/* Bottom Explanation Cards + Tired Biko */}
      <div style={{ ...abs(X0, 695, 1310, 265), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div
          style={{
            background: SKY_SOFT,
            borderRadius: 26,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${SKY}`,
            padding: '28px 30px',
            ...row,
            gap: 20,
          }}
        >
          <span style={{ fontSize: 56 }}>👣</span>
          <div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
              Jalan 5 Langkah Lurus
            </div>
            <div style={{ fontSize: 23, fontWeight: 700, color: MUTED, marginTop: 6 }}>
              Semua arah langkahnya sama: ke Kanan (➡️)!
            </div>
          </div>
        </div>

        <div
          style={{
            background: CORAL_SOFT,
            borderRadius: 26,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${CORAL}`,
            padding: '28px 30px',
            ...row,
            gap: 20,
          }}
        >
          <span style={{ fontSize: 56 }}>😫</span>
          <div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
              Susun 5 Blok Bikin Capek!
            </div>
            <div style={{ fontSize: 23, fontWeight: 700, color: MUTED, marginTop: 6 }}>
              Bagaimana ya supaya kodenya lebih pendek &amp; cepat?
            </div>
          </div>
        </div>
      </div>

      <BikoMascot
        pose="thinking"
        width={290}
        speechBubble="Huff, panjang sekali..."
        style={{ ...abs(1470, 635) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus Ajaib: Blok Ulangi (Repeat)!
// ============================================================================
const Slide04BlokUlangi: Page = () => {
  const [count, setCount] = useState(5);

  return (
    <JuniorFrame badge="JURUS KODE RINGKAS" accentDot={SUNNY}>
      <SlideTitle>
        Ini Namanya <Highlight>Blok Ulangi!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Interactive Giant Repeat Hug Block */}
      <MacWindowCard left={X0} top={250} width={880} height={680} headerLabel="blok-ulangi-repeat.app" padding={36}>
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
            Klik tombol <strong>- / +</strong> untuk ubah jumlah ulangan!
          </div>

          <RepeatHugBlock count={count} dir="right" scale={1.55} />

          <div style={{ ...row, gap: 18 }}>
            <button
              type="button"
              className="cpj9-card-btn"
              onClick={() => setCount((c) => Math.max(1, c - 1))}
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: CORAL,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 34,
                fontWeight: 700,
              }}
            >
              -
            </button>
            <div
              style={{
                padding: '12px 28px',
                borderRadius: 18,
                background: SUNNY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              Jalan Kanan {count}× Berturut-turut!
            </div>
            <button
              type="button"
              className="cpj9-card-btn"
              onClick={() => setCount((c) => Math.min(8, c + 1))}
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: TEAL,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 34,
                fontWeight: 700,
              }}
            >
              +
            </button>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: Brief Explanation + Biko Thumbs Up */}
      <div style={{ ...abs(1025, 250, 795, 680), display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div
          style={{
            background: SUNNY_SOFT,
            borderRadius: 24,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${SUNNY}`,
            padding: '24px 28px',
            ...row,
            gap: 20,
          }}
        >
          <span style={{ fontSize: 54 }}>🔁</span>
          <div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
              Blok Peluk yang Mengulang Gerakan
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: MUTED, marginTop: 4 }}>
              Blok panah di dalam pelukan akan dijalankan berkali-kali!
            </div>
          </div>
        </div>

        <div
          style={{
            background: TEAL_SOFT,
            borderRadius: 24,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${TEAL}`,
            padding: '24px 28px',
            ...row,
            gap: 20,
          }}
        >
          <span style={{ fontSize: 54 }}>🔢</span>
          <div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
              Cukup Pilih Berapa Kali Diulang!
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: MUTED, marginTop: 4 }}>
              Mau 4, 5, atau 8 langkah? Tinggal ganti angkanya saja!
            </div>
          </div>
        </div>

        <div style={{ flex: 1, ...centerCol }}>
          <BikoMascot
            pose="thumbs-up"
            width={255}
            speechBubble="Praktis & Hemat Blok!"
          />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Sulap Kode: Panjang vs Ringkas!
// ============================================================================
const Slide05SulapKode: Page = () => {
  const [transformed, setTransformed] = useState(true);

  return (
    <JuniorFrame badge="SULAP KODE AJAIB" accentDot={LAVENDER}>
      <SlideTitle>
        Ubah Jadi <Highlight>Super Ringkas!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={245} width={1720} height={700} headerLabel="sulap-kode-ajaib.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top Card: Kode Lama (Panjang) */}
          <div
            style={{
              borderRadius: 24,
              background: CORAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CORAL}`,
              padding: '22px 34px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span
                style={{
                  padding: '6px 16px',
                  borderRadius: 99,
                  background: CORAL,
                  color: WHITE,
                  border: `2px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                KODE LAMA (PANJANG)
              </span>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, marginTop: 10 }}>
                4 Blok Panah Berderet
              </div>
            </div>

            <div style={{ ...row, gap: 14 }}>
              {[1, 2, 3, 4].map((n) => (
                <Fragment key={n}>
                  <LoopArrowBlock dir="right" size={84} stepNum={n} showRightTab={n < 4} />
                  {n < 4 && <span style={{ fontSize: 28, fontWeight: 800 }}>+</span>}
                </Fragment>
              ))}
            </div>
          </div>

          {/* Middle Magic Wand Row */}
          <div style={{ ...row, justifyContent: 'center', gap: 22 }}>
            <MagicWandSvg size={68} />
            <button
              type="button"
              className="cpj9-card-btn"
              onClick={() => setTransformed((t) => !t)}
              style={{
                padding: '12px 30px',
                borderRadius: 99,
                background: LAVENDER,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              ✨ Sulap Kode Sekarang! ({transformed ? 'Ringkas Aktif!' : 'Klik!'})
            </button>
            <MagicWandSvg size={68} />
          </div>

          {/* Bottom Card: Kode Baru (Ringkas!) */}
          <div
            style={{
              borderRadius: 24,
              background: transformed ? TEAL_SOFT : '#F8FAFC',
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: transformed ? `0 8px 0 ${TEAL}` : `0 6px 0 ${CHARCOAL}`,
              padding: '20px 34px',
              ...row,
              justifyContent: 'space-between',
              opacity: transformed ? 1 : 0.45,
              transition: 'all 220ms ease',
            }}
          >
            <div>
              <span
                style={{
                  padding: '6px 16px',
                  borderRadius: 99,
                  background: TEAL,
                  color: WHITE,
                  border: `2px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                KODE BARU (RINGKAS!)
              </span>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, marginTop: 10 }}>
                Cuma <Highlight color={STABILO}>1 Blok Ulangi!</Highlight>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: MUTED, marginTop: 4 }}>
                Hasil jalannya sama persis: 4 langkah ke kanan!
              </div>
            </div>

            <div style={{ ...row, gap: 24 }}>
              <RepeatHugBlock count={4} dir="right" scale={0.94} />
              <BikoMascot pose="thumbs-up" width={145} />
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Harus Diulang Berapa Kali?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [choice, setChoice] = useState<2 | 3 | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle align="center" top={122}>
        Harus Diulang <Highlight>Berapa Kali?</Highlight>
      </SlideTitle>

      {/* Top 4-Box Horizontal Track: Biko -> Empty -> Empty -> Star (Needs 3 steps!) */}
      <MacWindowCard left={200} top={215} width={1520} height={240} headerLabel="tebak-angka-ulangi.app" padding={22}>
        <div style={{ ...row, justifyContent: 'center', gap: 20, height: '100%' }}>
          {[0, 1, 2, 3].map((idx) => (
            <Fragment key={idx}>
              <div
                style={{
                  width: 240,
                  height: 120,
                  borderRadius: 20,
                  background: idx === 0 ? SKY_SOFT : idx === 3 ? SUNNY_SOFT : TEAL_SOFT,
                  border: `3px solid ${CHARCOAL}`,
                  ...centerCol,
                }}
              >
                {idx === 0 && <BikoTokenSvg size={82} />}
                {idx === 3 && <StarSvg size={78} />}
                {(idx === 1 || idx === 2) && (
                  <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, color: '#047857' }}>
                    Langkah {idx}
                  </span>
                )}
              </div>
              {idx < 3 && <span style={{ fontSize: 32, fontWeight: 800 }}>➡️</span>}
            </Fragment>
          ))}
        </div>
      </MacWindowCard>

      {/* Bottom 2 Large Interactive Choice Cards + Biko Question */}
      <button
        type="button"
        className="cpj9-card-btn"
        onClick={() => setChoice(2)}
        style={{
          ...abs(140, 495, 580, 385),
          borderRadius: 28,
          background: choice === 2 ? CORAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 2 ? `0 0 0 6px ${CORAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${SKY}`,
          padding: 24,
          ...centerCol,
          gap: 14,
          animation: choice === 2 ? 'cpj9-shake 0.35s ease' : undefined,
        }}
      >
        <span
          style={{
            padding: '6px 18px',
            borderRadius: 99,
            background: SKY,
            color: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          PILIHAN A
        </span>
        <RepeatHugBlock count={2} dir="right" scale={0.95} />
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
          Ulangi 2 Kali {choice === 2 && '— Kurang 1 Langkah!'}
        </div>
      </button>

      <div style={{ ...abs(760, 505, 400, 365), ...centerCol }}>
        <BikoMascot
          pose={choice === 3 ? 'thumbs-up' : 'question'}
          width={245}
          speechBubble={
            choice === 3
              ? 'Benar! Pas 3 Langkah!'
              : choice === 2
                ? 'Kurang 1 kotak lagi!'
                : 'Berapa kali ya?'
          }
        />
      </div>

      <button
        type="button"
        className="cpj9-card-btn"
        onClick={() => setChoice(3)}
        style={{
          ...abs(1200, 495, 580, 385),
          borderRadius: 28,
          background: choice === 3 ? TEAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 3 ? `0 0 0 6px ${TEAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${TEAL}`,
          padding: 24,
          ...centerCol,
          gap: 14,
        }}
      >
        <span
          style={{
            padding: '6px 18px',
            borderRadius: 99,
            background: TEAL,
            color: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          PILIHAN B
        </span>
        <RepeatHugBlock count={3} dir="right" scale={0.95} />
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
          Ulangi 3 Kali {choice === 3 && '✅'}
        </div>
      </button>

      <div style={{ ...abs(440, 915, 1040, 56), ...centerCol }}>
        <div
          style={{
            padding: '10px 30px',
            borderRadius: 99,
            background: choice === 3 ? TEAL_SOFT : SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 25,
            fontWeight: 700,
          }}
        >
          {choice === 3
            ? '🎉 Hebat! 3 panah ke kanan (➡️) pas mencapai ⭐ Bintang!'
            : '👆 Hitung jumlah panah dan tunjuk blok yang pas di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Jurus Gabungan: Ulangi & Belok! (Peta Labirin 4x3 Huruf L)
// ============================================================================
const Slide07UlangiBelok: Page = () => {
  const [step, setStep] = useState(0); // 0:(2,0), 1:(2,1), 2:(2,2), 3:(2,3), 4:(1,3)
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const replay = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStep(0);
    const tick = (s: number) => {
      timerRef.current = window.setTimeout(() => {
        setStep(s);
        if (s < 4) tick(s + 1);
      }, 430);
    };
    tick(1);
  };

  const coords: [number, number][] = [
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [1, 3],
  ];
  const [br, bc] = coords[step];

  return (
    <JuniorFrame badge="TANTANGAN LABIRIN" accentDot={TEAL}>
      <SlideTitle>
        Coba <Highlight>Ulangi &amp; Belok!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Grid Card: 4x3 L-Shaped Maze */}
      <MacWindowCard left={X0} top={250} width={920} height={680} headerLabel="labirin-huruf-L.app" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
              Peta Labirin 4×3 (Jalur Huruf L):
            </span>
            <button
              type="button"
              className="cpj9-card-btn"
              onClick={replay}
              style={{
                padding: '10px 22px',
                borderRadius: 16,
                background: TEAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                boxShadow: `0 4px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              ▶️ Jalankan Ulangi &amp; Belok!
            </button>
          </div>

          {/* 4 cols x 3 rows grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 160px)',
              gridTemplateRows: 'repeat(3, 130px)',
              gap: 12,
              justifyContent: 'center',
              alignContent: 'center',
              background: '#F0FDF4',
              padding: 20,
              borderRadius: 24,
              border: `3px solid ${CHARCOAL}`,
            }}
          >
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3].map((c) => {
                const isBikoHere = br === r && bc === c;
                const isChest = r === 1 && c === 3;
                const isLPath = r === 2 || (r === 1 && c === 3);
                const isWall = !isLPath;

                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      borderRadius: 18,
                      background: isWall
                        ? '#E2E8F0'
                        : isChest
                          ? SUNNY_SOFT
                          : TEAL_SOFT,
                      border: isLPath ? `3px dashed ${TEAL}` : `2.5px solid ${CHARCOAL}`,
                      ...centerCol,
                      position: 'relative',
                    }}
                  >
                    {isWall && <RockSvg size={68} />}
                    {isChest && !isBikoHere && <ChestSvg size={82} />}
                    {!isBikoHere && r === 2 && (c === 1 || c === 2 || c === 3) && (
                      <span style={{ fontSize: 30, fontWeight: 800, color: '#047857' }}>
                        {c === 3 ? '⬆️' : '➡️'}
                      </span>
                    )}
                    {isBikoHere && (
                      <div style={{ ...centerCol }}>
                        <BikoTokenSvg size={88} />
                        {step === 4 && (
                          <span
                            style={{
                              position: 'absolute',
                              top: -10,
                              right: -10,
                              padding: '3px 10px',
                              borderRadius: 99,
                              background: SUNNY,
                              border: `2px solid ${CHARCOAL}`,
                              fontFamily: 'var(--osd-font-display)',
                              fontSize: 15,
                              fontWeight: 700,
                            }}
                          >
                            💎 DAPAT!
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              }),
            )}
          </div>

          <div
            style={{
              textAlign: 'center',
              fontFamily: 'var(--osd-font-display)',
              fontSize: 23,
              fontWeight: 700,
              color: step === 4 ? '#047857' : MUTED,
            }}
          >
            {step === 0 && 'Jalur lurus 3 kotak ke kanan, lalu belok 1 kotak ke atas!'}
            {step >= 1 && step <= 3 && `🔁 Blok Ulangi: Jalan Kanan ke-${step} dari 3!`}
            {step === 4 && '🎉 Lalu Belok Atas (⬆️) -> Harta Karun Didapat!'}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Card: Connected Repeat + Turn Blocks */}
      <MacWindowCard left={1055} top={250} width={765} height={680} headerLabel="rangkaian-ulangi-belok.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                padding: '20px 24px',
                borderRadius: 20,
                background: SUNNY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              1️⃣ 🔁 <strong>Ulangi [ 3 ]</strong> jalan <strong>Kanan</strong> (➡️)
            </div>
            <div
              style={{
                padding: '20px 24px',
                borderRadius: 20,
                background: TEAL_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              2️⃣ Lalu belok <strong>Atas</strong> (⬆️) → <strong>Finis!</strong>
            </div>
          </div>

          <div
            style={{
              padding: '26px',
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
              gap: 18,
            }}
          >
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
              Susunan Blok Gabungan:
            </div>
            <div style={{ ...row, gap: 16 }}>
              <RepeatHugBlock count={3} dir="right" scale={0.96} showRightTab />
              <LoopArrowBlock dir="up" size={96} active={step === 4} />
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Blok Ulangi (Boleh vs Jangan)
// ============================================================================
const Slide08Tips: Page = () => (
  <JuniorFrame badge="TIPS KODE RINGKAS" accentDot={TEAL}>
    <SlideTitle>
      Rahasia Pakai <Highlight>Blok Ulangi!</Highlight>
    </SlideTitle>

    <div
      style={{
        ...abs(X0, 245, W, 695),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 44,
      }}
    >
      {/* Left Column: BOLEH */}
      <div
        style={{
          background: WHITE,
          borderRadius: 30,
          border: `4px solid ${TEAL}`,
          boxShadow: `0 10px 0 ${TEAL}`,
          padding: '30px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '10px 24px',
              borderRadius: 99,
              background: TEAL,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            <span>✅</span>
            <span>BOLEH</span>
          </div>
          <span style={{ fontSize: 44 }}>📦</span>
        </div>

        <div
          style={{
            borderRadius: 24,
            background: TEAL_SOFT,
            border: `3px solid ${CHARCOAL}`,
            padding: '16px 24px',
            ...row,
            justifyContent: 'center',
            gap: 24,
          }}
        >
          <RepeatHugBlock count={3} dir="right" scale={0.86} />
          <BikoMascot pose="thumbs-up" width={140} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              padding: '18px 22px',
              borderRadius: 20,
              background: TEAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            🔢 <strong>Hitung Langkah</strong> lurus yang sama
          </div>
          <div
            style={{
              padding: '18px 22px',
              borderRadius: 20,
              background: TEAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            📦 Taruh panah <strong>Di Dalam</strong> pelukan blok
          </div>
        </div>
      </div>

      {/* Right Column: JANGAN */}
      <div
        style={{
          background: WHITE,
          borderRadius: 30,
          border: `4px solid ${CORAL}`,
          boxShadow: `0 10px 0 ${CORAL}`,
          padding: '30px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '10px 24px',
              borderRadius: 99,
              background: CORAL,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            <span>❌</span>
            <span>JANGAN</span>
          </div>
          <span style={{ fontSize: 44 }}>🚧</span>
        </div>

        {/* Wrong number crashing into brick wall */}
        <div
          style={{
            borderRadius: 24,
            background: CORAL_SOFT,
            border: `3px solid ${CHARCOAL}`,
            padding: '16px 24px',
            ...row,
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <RepeatHugBlock count={9} detached wrongNumber scale={0.84} />
          <div style={{ ...row, gap: 10 }}>
            <BikoTokenSvg size={64} tired />
            <span style={{ fontSize: 32 }}>💥</span>
            <RockSvg size={68} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              padding: '18px 22px',
              borderRadius: 20,
              background: CORAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            🙈 <strong>Salah Angka</strong> bikin Biko kelewatan
          </div>
          <div
            style={{
              padding: '18px 22px',
              borderRadius: 20,
              background: CORAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            🚫 Panah <strong>Terlepas</strong> di luar blok
          </div>
        </div>
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Labirin Kode Ringkas! (3 Blok + Game Blok Ulangi)
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  // Interactive puzzle on 4x3 grid: Start (2,0) -> (2,1) -> (2,2) -> (2,3) -> Goal Chest (1,3)!
  // Student configures: Repeat [repeatCount] of [loopDir], followed by [turnDir].
  // Solution: repeatCount = 3, loopDir = 'right', turnDir = 'up'.
  const [repeatCount, setRepeatCount] = useState(2);
  const [loopDir, setLoopDir] = useState<Dir>('right');
  const [turnDir, setTurnDir] = useState<Dir>('up');
  const [bikoPos, setBikoPos] = useState<[number, number]>([2, 0]);
  const [status, setStatus] = useState<'idle' | 'running' | 'win' | 'oops'>('idle');
  const [message, setMessage] = useState('Hitung kotak lurusnya, lalu atur angka di Blok Ulangi!');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const resetGame = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setRepeatCount(2);
    setLoopDir('right');
    setTurnDir('up');
    setBikoPos([2, 0]);
    setStatus('idle');
    setMessage('Hitung kotak lurusnya, lalu atur angka di Blok Ulangi!');
  };

  const runMaze = () => {
    if (status === 'running') return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStatus('running');
    setBikoPos([2, 0]);
    setMessage('Biko menjalankan Blok Ulangi...');

    const commands: Dir[] = [...Array(repeatCount).fill(loopDir), turnDir];
    const walls = new Set(['0,0', '0,1', '0,2', '0,3', '1,0', '1,1', '1,2']);
    let r = 2;
    let c = 0;

    const stepNext = (i: number) => {
      if (i >= commands.length) {
        if (r === 1 && c === 3) {
          setStatus('win');
          setMessage('🎉 Hore! Kode ringkas sukses membawa Biko ke Peti Harta Karun!');
        } else {
          setStatus('oops');
          setMessage('Belum sampai di Harta Karun! Coba cek lagi angka ulangannya ya.');
        }
        return;
      }

      const d = commands[i];
      if (d === 'up') r -= 1;
      if (d === 'down') r += 1;
      if (d === 'left') c -= 1;
      if (d === 'right') c += 1;

      if (r < 0 || r > 2 || c < 0 || c > 3) {
        setStatus('oops');
        setMessage('💥 Kelewatan! Angka di Blok Ulangi terlalu besar!');
        return;
      }

      if (walls.has(`${r},${c}`)) {
        setStatus('oops');
        setMessage('🪨 Ups! Menabrak batu rintangan! Cek arahnya ya.');
        return;
      }

      setBikoPos([r, c]);

      if (r === 1 && c === 3) {
        setStatus('win');
        setMessage('🎉 Yeay! Kode super pendek & berhasil dapat Harta Karun!');
        return;
      }

      timerRef.current = window.setTimeout(() => stepNext(i + 1), 390);
    };

    timerRef.current = window.setTimeout(() => stepNext(0), 260);
  };

  const stepCards = [
    { num: '1', label: 'Hitung kotak lurus yang sama', color: SKY, soft: SKY_SOFT },
    { num: '2', label: 'Pasang Blok Ulangi & angkanya', color: SUNNY, soft: SUNNY_SOFT },
    { num: '3', label: 'Tekan Jalan! Kode pendek sukses!', color: TEAL, soft: TEAL_SOFT },
  ];

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={SUNNY}>
      <SlideTitle top={120}>
        Misi <Highlight>Labirin Kode Ringkas!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr Step Blocks */}
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
                padding: '0 22px',
                ...row,
                gap: 16,
              }}
            >
              <span
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: sc.color,
                  color: sc.color === SUNNY ? CHARCOAL : WHITE,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 28,
                  fontWeight: 700,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                {sc.num}
              </span>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                {sc.label}
              </span>
            </div>
            {idx < 2 && <span style={{ fontSize: 32, fontWeight: 800, color: CHARCOAL }}>➜</span>}
          </Fragment>
        ))}
      </div>

      {/* Bottom Interactive Repeat Maze Puzzle */}
      <MacWindowCard left={X0} top={322} width={1320} height={635} headerLabel="game-blok-ulangi.app" padding={26}>
        <div style={{ display: 'grid', gridTemplateColumns: '560px 1fr', gap: 26, height: '100%' }}>
          {/* 4x3 Labyrinth Map */}
          <div
            style={{
              background: '#F0FDF4',
              borderRadius: 24,
              border: `3px solid ${CHARCOAL}`,
              padding: 16,
              ...centerCol,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 122px)',
                gridTemplateRows: 'repeat(3, 140px)',
                gap: 10,
              }}
            >
              {[0, 1, 2].map((r) =>
                [0, 1, 2, 3].map((c) => {
                  const hasBiko = bikoPos[0] === r && bikoPos[1] === c;
                  const isChest = r === 1 && c === 3;
                  const isPath = r === 2 || isChest;
                  const isWall = !isPath;

                  return (
                    <div
                      key={`${r}-${c}`}
                      style={{
                        borderRadius: 18,
                        background: isWall ? '#E2E8F0' : isChest ? SUNNY_SOFT : WHITE,
                        border: hasBiko ? `3.5px solid ${SKY}` : `2.5px solid ${CHARCOAL}`,
                        ...centerCol,
                      }}
                    >
                      {isWall && <RockSvg size={64} />}
                      {isChest && !hasBiko && <ChestSvg size={76} />}
                      {hasBiko && (
                        <BikoTokenSvg
                          size={86}
                          tired={status === 'oops'}
                          style={{ animation: status === 'win' ? 'cpj9-hop 1s ease-in-out infinite' : undefined }}
                        />
                      )}
                      {r === 2 && c === 0 && !hasBiko && (
                        <span style={{ fontSize: 16, fontWeight: 800, color: MUTED }}>START</span>
                      )}
                    </div>
                  );
                }),
              )}
            </div>
          </div>

          {/* Right Controls: Configure Repeat Loop + Final Turn */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, marginBottom: 10 }}>
                1. Atur Angka Ulangan &amp; Arah Blok:
              </div>

              <div
                style={{
                  ...row,
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: 22,
                  background: '#F8FAFC',
                  border: `3px solid ${CHARCOAL}`,
                  gap: 16,
                }}
              >
                <RepeatHugBlock
                  count={repeatCount}
                  dir={loopDir}
                  scale={0.95}
                  showRightTab
                  onCountClick={() => setRepeatCount((c) => (c >= 5 ? 1 : c + 1))}
                />
                <LoopArrowBlock
                  dir={turnDir}
                  size={86}
                  onClick={() => setTurnDir((d) => (d === 'up' ? 'right' : 'up'))}
                />
              </div>
            </div>

            {/* Quick Number & Direction Pickers */}
            <div style={{ ...row, justifyContent: 'space-between', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>
                  Pilih Angka Ulangi:
                </span>
                <div style={{ ...row, gap: 10 }}>
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className="cpj9-card-btn"
                      onClick={() => {
                        setRepeatCount(num);
                        setStatus('idle');
                        setBikoPos([2, 0]);
                      }}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        background: repeatCount === num ? SUNNY : WHITE,
                        border: `3px solid ${CHARCOAL}`,
                        boxShadow: `0 4px 0 ${CHARCOAL}`,
                        fontFamily: 'var(--osd-font-display)',
                        fontSize: 26,
                        fontWeight: 700,
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>
                  Arah di Dalam Ulangi:
                </span>
                <div style={{ ...row, gap: 10 }}>
                  {(['right', 'up'] as Dir[]).map((d) => (
                    <LoopArrowBlock
                      key={d}
                      dir={d}
                      size={58}
                      active={loopDir === d}
                      onClick={() => {
                        setLoopDir(d);
                        setStatus('idle');
                        setBikoPos([2, 0]);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Feedback & Play Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div
                style={{
                  padding: '12px 18px',
                  borderRadius: 16,
                  background:
                    status === 'win'
                      ? TEAL_SOFT
                      : status === 'oops'
                        ? CORAL_SOFT
                        : SUNNY_SOFT,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 21,
                  fontWeight: 700,
                }}
              >
                {message}
              </div>

              <div style={{ ...row, gap: 14 }}>
                <button
                  type="button"
                  className="cpj9-card-btn"
                  onClick={runMaze}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    borderRadius: 18,
                    background: TEAL,
                    color: WHITE,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 6px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 25,
                    fontWeight: 700,
                  }}
                >
                  ▶️ Jalan!
                </button>
                <button
                  type="button"
                  className="cpj9-card-btn"
                  onClick={resetGame}
                  style={{
                    padding: '14px 22px',
                    borderRadius: 18,
                    background: WHITE,
                    color: CHARCOAL,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 6px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 22,
                    fontWeight: 700,
                  }}
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko on Right */}
      <BikoMascot
        pose={status === 'win' ? 'jump' : 'thumbs-up'}
        width={340}
        speechBubble={status === 'win' ? 'Kode Ringkas Juara!' : 'Pilih angka 3 ya?'}
        style={{ ...abs(1475, 430) }}
      />
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 9 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  const confetti = [
    { left: 160, top: 240, color: SUNNY, rot: '18deg', size: 22 },
    { left: 290, top: 760, color: SKY, rot: '-24deg', size: 24 },
    { left: 1640, top: 230, color: CORAL, rot: '-15deg', size: 22 },
    { left: 1520, top: 820, color: LAVENDER, rot: '28deg', size: 24 },
    { left: 1380, top: 280, color: TEAL, rot: '14deg', size: 20 },
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
            animation: live ? `cpj9-confetti ${2.4 + idx * 0.3}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={124} size={60}>
        Hebat! Kamu <Highlight>Master Kode Ringkas!</Highlight> 🎉
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard left={240} top={245} width={1140} height={675} headerLabel="lencana-ulangi-9.app" padding={36}>
        <div
          style={{
            height: '100%',
            ...centerCol,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          {/* Large Gold Medal with Circular Repeat Loop & Star */}
          <svg
            width={270}
            height={270}
            viewBox="0 0 240 240"
            fill="none"
            style={{ animation: live ? 'cpj9-float 3s ease-in-out infinite' : undefined }}
          >
            <path d="M74 16 L104 94 H136 L166 16 Z" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
            <path d="M94 16 L120 88 L146 16" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            <circle cx="120" cy="140" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={6} />
            <circle cx="120" cy="140" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={4} />
            {/* Circular Repeat Arrows */}
            <path
              d="M92 126 A32 32 0 0 1 148 126"
              stroke={TEAL}
              strokeWidth={9}
              strokeLinecap="round"
            />
            <path d="M140 112 L152 128 L134 132 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
            <path
              d="M148 154 A32 32 0 0 1 92 154"
              stroke={ORANGE}
              strokeWidth={9}
              strokeLinecap="round"
            />
            <path d="M100 168 L88 152 L106 148 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
            {/* Center Star */}
            <path
              d="M120 124 L124 135 L136 136 L127 144 L129 156 L120 150 L111 156 L113 144 L104 136 L116 135 Z"
              fill={SUNNY}
              stroke={CHARCOAL}
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
          </svg>

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
            }}
          >
            🏅 Lencana Master Blok Ulangi
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 31,
              fontWeight: 700,
              lineHeight: 1.38,
              maxWidth: 880,
              color: CHARCOAL,
            }}
          >
            Kamu sudah jago memendekkan kode dengan{' '}
            <Highlight color="#D1FAE5">Blok Ulangi (Repeat)!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko Celebrating on Right */}
      <div style={{ ...abs(1410, 410, 420, 490), ...centerCol }}>
        <BikoMascot
          pose="jump"
          width={380}
          badgeEmoji="🔁"
          speechBubble="Kode Ringkas Juara! 🎉"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// Speaker Notes (Talk Track for Mentors teaching Ages 5–7)
// ============================================================================
export const notes: (string | undefined)[] = [
  `Halo Code Explorer cilik! Di Pertemuan 9 hari ini, Biko punya jurus baru bernama Blok Ulangi (Repeat)!
Kita bisa membuat kode panah yang panjang menjadi super pendek dan ringkas!`,

  `Ada dua misi kita hari ini:
1. Mengenal Blok Ulangi (Repeat) yang berbentuk seperti blok peluk.
2. Mengubah kode panjang yang melelahkan menjadi kode super ringkas!`,

  `Masalah Coder: Biko harus jalan 5 langkah lurus ke kanan untuk mengambil bintang.
Kalau kita menyusun 5 blok panah kanan satu per satu ([ ➡️ ] + [ ➡️ ] + [ ➡️ ] + [ ➡️ ] + [ ➡️ ]), tangan kita bisa capek!`,

  `Inilah penyelamatnya: Blok Ulangi (Repeat)!
Blok kuning-oranye ini memeluk satu blok panah di dalamnya. Cukup pilih angkanya — misalnya 5 — maka panah kanan otomatis berjalan 5 kali!`,

  `Ayo lihat sulap kodenya!
Kode lama butuh 4 blok panah kanan. Dengan sulap Blok Ulangi [ 4 ] berisi [ ➡️ ], kode langsung menyusut jadi cuma 1 blok saja!`,

  `Permainan Cepat! Hitung kotak dari Biko menuju Bintang: butuh 3 langkah ke kanan.
Jadi mana yang pas: Pilihan A (Ulangi 2 Kali) atau Pilihan B (Ulangi 3 Kali)?`,

  `Sekarang kita gabungkan Ulangi & Belok di peta huruf L!
Pertama: 🔁 Ulangi [ 3 ] jalan Kanan (➡️), lalu sambung dengan blok Belok Atas (⬆️) -> Harta Karun didapat!`,

  `Tips Jagoan Blok Ulangi:
BOLEH hitung dulu langkah lurus yang sama dan taruh panah rapi DI DALAM pelukan blok.
JANGAN asal pasang angka terlalu besar nanti Biko menabrak tembok, dan jangan biarkan panah terlepas di luar!`,

  `Ayo main Game Labirin Kode Ringkas!
Hitung jalur lurus ke kanan di baris bawah (ada 3 kotak!), ganti angka di Blok Ulangi menjadi 3, lalu tekan ▶️ Jalan!`,

  `Selamat untuk semua Master Kode Ringkas cilik!
Kalian resmi meraih Lencana Master Blok Ulangi!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 9 — Jurus Kode Ringkas!',
  createdAt: '2026-11-13T17:35:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03Masalah,
  Slide04BlokUlangi,
  Slide05SulapKode,
  Slide06AyoTebak,
  Slide07UlangiBelok,
  Slide08Tips,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

import { Fragment, useState, type CSSProperties, type DragEvent, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import bikoWave from '../../assets/biko/biko-wave.png';
import bikoLaptop from '../../assets/biko/biko-laptop.png';
import bikoPointLeft from '../../assets/biko/biko-point-left.png';
import bikoJump from '../../assets/biko/biko-jump.png';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-3-pecahkan-misi-besar-jadi-kecil';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj3-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes cpj3-bob {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(-1.2deg); }
}
@keyframes cpj3-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj3-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj3-drag-slide {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  45%, 65% { transform: translate(118px, -24px) scale(1.04); }
}
@keyframes cpj3-pulse-ring {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.14); opacity: 0.45; }
}
.cpj3-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj3-card-btn:hover {
  transform: translateY(-4px);
}
.cpj3-card-btn:active {
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
const CHOCO = '#78350F';
const BREAD_CRUST = '#D97706';
const BREAD_INNER = '#FEF3C7';

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
      {/* Low-opacity coding symbols around outer canvas edges */}
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

      {/* Sparkle accent */}
      <svg
        aria-hidden
        width={42}
        height={42}
        viewBox="0 0 40 40"
        style={{
          ...abs(1750, 74),
          pointerEvents: 'none',
          animation: live ? 'cpj3-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 3 • Pecahkan Misi Besar Jadi Kecil</span>
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
      <div style={{ ...row, gap: 11 }}>
        <span style={{ width: 16, height: 16, borderRadius: 99, background: CORAL, border: `2px solid ${CHARCOAL}` }} />
        <span style={{ width: 16, height: 16, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}` }} />
        <span style={{ width: 16, height: 16, borderRadius: 99, background: TEAL, border: `2px solid ${CHARCOAL}` }} />
      </div>
      {headerLabel && (
        <span style={{ fontSize: 18, fontWeight: 800, color: MUTED, letterSpacing: '0.03em' }}>
          {headerLabel}
        </span>
      )}
      <div style={{ width: 64 }} />
    </div>
    <div style={{ position: 'relative', flex: 1, padding, boxSizing: 'border-box' }}>{children}</div>
  </div>
);

// ============================================================================
// Official Biko Mascot Component (Uses verified transparent Biko PNG assets)
// ============================================================================
type BikoPose = 'cover-laptop' | 'point-left' | 'point-right' | 'question' | 'thumbs-up' | 'jump' | 'wave' | 'chef';

const BIKO_POSE_ASSETS: Record<BikoPose, string> = {
  'cover-laptop': bikoLaptop,
  'point-left': bikoPointLeft,
  'point-right': bikoPointLeft,
  question: bikoWave,
  'thumbs-up': bikoWave,
  jump: bikoJump,
  wave: bikoWave,
  chef: bikoWave,
};

const BikoMascot = ({
  pose = 'point-left',
  width = 340,
  badgeEmoji,
  style,
}: {
  pose?: BikoPose;
  width?: number;
  badgeEmoji?: string;
  style?: CSSProperties;
}) => {
  const live = useIsActivePage();
  const isJump = pose === 'jump';
  const imgSrc = BIKO_POSE_ASSETS[pose] ?? bikoWave;
  const imgHeight = Math.round(width * 1.1);

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        width,
        userSelect: 'none',
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: live
            ? isJump
              ? 'cpj3-float 1.8s ease-in-out infinite'
              : 'cpj3-bob 3.2s ease-in-out infinite'
            : undefined,
        }}
      >
        <img
          src={imgSrc}
          alt="Maskot Biko"
          draggable={false}
          style={{
            display: 'block',
            height: imgHeight,
            width: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            transform: pose === 'point-right' ? 'scaleX(-1)' : undefined,
            filter: 'drop-shadow(0 8px 14px rgba(30, 30, 44, 0.12))',
          }}
        />

        {pose === 'chef' && (
          <svg
            aria-hidden="true"
            width={Math.round(width * 0.42)}
            height={Math.round(width * 0.34)}
            viewBox="0 0 140 110"
            fill="none"
            style={{
              position: 'absolute',
              top: -Math.round(width * 0.08),
              left: '50%',
              transform: 'translateX(-48%) rotate(-6deg)',
              pointerEvents: 'none',
              filter: 'drop-shadow(0 4px 6px rgba(30,30,44,0.16))',
            }}
          >
            <path
              d="M34 74 C14 70, 14 40, 38 36 C42 16, 64 12, 70 22 C78 10, 102 16, 104 36 C126 40, 126 70, 106 74 Z"
              fill={WHITE}
              stroke={CHARCOAL}
              strokeWidth={4.5}
              strokeLinejoin="round"
            />
            <rect x="32" y="72" width="76" height="24" rx="8" fill={WHITE} stroke={CHARCOAL} strokeWidth={4.5} />
            <rect x="34" y="84" width="72" height="10" rx="4" fill={TEAL} />
          </svg>
        )}

        {pose === 'question' && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: 2,
              top: '8%',
              width: 74,
              height: 82,
              borderRadius: 20,
              background: SUNNY,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--osd-font-display)',
              fontSize: 50,
              fontWeight: 700,
              color: CHARCOAL,
              transform: 'rotate(10deg)',
              pointerEvents: 'none',
            }}
          >
            ?
          </div>
        )}

        {(pose === 'thumbs-up' || badgeEmoji) && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: 4,
              top: '10%',
              width: 66,
              height: 66,
              borderRadius: '50%',
              background: SUNNY,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 5px 0 ${CHARCOAL}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              transform: 'rotate(8deg)',
              pointerEvents: 'none',
            }}
          >
            {badgeEmoji ?? '👍'}
          </div>
        )}
      </div>

      <div
        aria-hidden="true"
        style={{
          width: isJump ? width * 0.36 : width * 0.52,
          height: 15,
          marginTop: isJump ? 8 : -6,
          borderRadius: '50%',
          background: CHARCOAL,
          opacity: 0.13,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

// ============================================================================
// Reusable Flat-Vector Illustrations (Puzzle, Cursor, Hand, Toothbrush, Bread)
// ============================================================================
const IconCheck = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="21" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    <path d="M14 25 L21 32 L34 17" stroke={WHITE} strokeWidth={4.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCross = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="21" fill={CORAL} stroke={CHARCOAL} strokeWidth={3} />
    <path d="M16 16 L32 32 M32 16 L16 32" stroke={WHITE} strokeWidth={4.8} strokeLinecap="round" />
  </svg>
);

const CursorHandSvg = ({
  grabbing = false,
  size = 56,
  style,
}: {
  grabbing?: boolean;
  size?: number;
  style?: CSSProperties;
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ display: 'block', ...style }}>
    {grabbing ? (
      <g>
        {/* Closed grabbing cartoon hand */}
        <rect x="14" y="22" width="36" height="30" rx="14" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={4} />
        <path d="M18 24 C18 14, 26 12, 28 22" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" />
        <path d="M26 22 C26 12, 34 12, 36 22" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" />
        <path d="M34 22 C34 13, 42 13, 44 24" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" />
        <path d="M10 34 C6 28, 12 22, 18 28" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" />
      </g>
    ) : (
      <path
        d="M14 8 L50 30 L32 35 L42 51 L34 55 L24 39 L14 49 Z"
        fill={WHITE}
        stroke={CHARCOAL}
        strokeWidth={4}
        strokeLinejoin="round"
      />
    )}
  </svg>
);

const PuzzleTileSvg = ({
  color = SKY,
  label,
  size = 120,
  children,
}: {
  color?: string;
  label?: string;
  size?: number;
  children?: ReactNode;
}) => (
  <div
    style={{
      position: 'relative',
      width: size,
      height: size,
      borderRadius: 24,
      background: color,
      border: `3.5px solid ${CHARCOAL}`,
      boxShadow: `0 6px 0 ${CHARCOAL}`,
      ...centerCol,
    }}
  >
    {/* Top puzzle knob */}
    <div
      style={{
        position: 'absolute',
        top: -13,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 28,
        height: 16,
        borderRadius: '14px 14px 0 0',
        background: color,
        border: `3.5px solid ${CHARCOAL}`,
        borderBottom: 'none',
      }}
    />
    {children}
    {label && (
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 20,
          fontWeight: 700,
          color: CHARCOAL,
          marginTop: 4,
        }}
      >
        {label}
      </span>
    )}
  </div>
);

const ToothbrushStepArt = ({ step, size = 140 }: { step: 1 | 2 | 3; size?: number }) => {
  if (step === 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
        {/* Toothbrush */}
        <rect x="24" y="88" width="102" height="18" rx="9" fill={SKY} stroke={CHARCOAL} strokeWidth={3.5} />
        <rect x="86" y="70" width="36" height="18" rx="6" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
        <line x1="94" y1="70" x2="94" y2="88" stroke={SKY} strokeWidth={2.5} />
        <line x1="104" y1="70" x2="104" y2="88" stroke={SKY} strokeWidth={2.5} />
        <line x1="114" y1="70" x2="114" y2="88" stroke={SKY} strokeWidth={2.5} />
        {/* Mint toothpaste swirl on brush */}
        <path
          d="M84 68 C86 52, 108 50, 120 60 C124 64, 120 70, 110 70 H88 Z"
          fill={TEAL}
          stroke={CHARCOAL}
          strokeWidth={3}
        />
        {/* Toothpaste tube squeezing */}
        <g transform="translate(22, 18) rotate(-22)">
          <rect x="0" y="10" width="58" height="28" rx="8" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.5} />
          <rect x="56" y="16" width="12" height="16" rx="4" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
          <circle cx="24" cy="24" r="6" fill={SUNNY} />
        </g>
      </svg>
    );
  }
  if (step === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
        {/* Happy Tooth with Foam Bubbles */}
        <path
          d="M42 42 C42 26, 62 24, 75 34 C88 24, 108 26, 108 42 C112 68, 104 114, 92 118 C82 120, 80 96, 75 96 C70 96, 68 120, 58 118 C46 114, 38 68, 42 42 Z"
          fill={WHITE}
          stroke={CHARCOAL}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        {/* Smile */}
        <circle cx="62" cy="58" r="4" fill={CHARCOAL} />
        <circle cx="88" cy="58" r="4" fill={CHARCOAL} />
        <path d="M64 72 Q75 82 86 72" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" />
        {/* Fluffy Foam Bubbles */}
        <circle cx="34" cy="56" r="14" fill="#E0F2FE" stroke={CHARCOAL} strokeWidth={3} />
        <circle cx="48" cy="36" r="11" fill="#E0F2FE" stroke={CHARCOAL} strokeWidth={3} />
        <circle cx="114" cy="50" r="13" fill="#E0F2FE" stroke={CHARCOAL} strokeWidth={3} />
        <circle cx="104" cy="32" r="10" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
        {/* Toothbrush Scrubbing */}
        <rect x="14" y="78" width="74" height="14" rx="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} transform="rotate(-14 14 78)" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
      {/* Sparkling Blue Water Cup */}
      <path d="M22 52 H72 L65 120 H29 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
      <path d="M26 76 H68 L63 116 H31 Z" fill={SKY} />
      {/* Water Splash Drops */}
      <path d="M48 22 C54 32, 58 38, 48 44 C38 38, 42 32, 48 22 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={2.5} />
      {/* Shiny Clean Tooth */}
      <path
        d="M84 54 C84 42, 98 40, 108 48 C118 40, 132 42, 132 54 C134 74, 128 106, 120 110 C114 112, 112 96, 108 96 C104 96, 102 112, 96 110 C88 106, 82 74, 84 54 Z"
        fill={WHITE}
        stroke={CHARCOAL}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      <path d="M98 76 Q108 86 118 76" stroke={TEAL} strokeWidth={3.5} strokeLinecap="round" />
      {/* Sparkles */}
      <path d="M124 22 L128 32 L138 36 L128 40 L124 50 L120 40 L110 36 L120 32 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
    </svg>
  );
};

const BreadStepArt = ({ step, size = 140 }: { step: 1 | 2 | 3; size?: number }) => {
  if (step === 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
        {/* Plate */}
        <ellipse cx="75" cy="112" rx="58" ry="18" fill="#E2E8F0" stroke={CHARCOAL} strokeWidth={3.5} />
        {/* Toast Bread Slice */}
        <path
          d="M34 52 C34 32, 116 32, 116 52 C116 58, 110 62, 110 68 V104 C110 110, 104 114, 98 114 H52 C46 114, 40 110, 40 104 V68 C40 62, 34 58, 34 52 Z"
          fill={BREAD_CRUST}
          stroke={CHARCOAL}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <path
          d="M44 54 C44 42, 106 42, 106 54 C106 58, 102 62, 102 66 V102 H48 V66 C48 62, 44 58, 44 54 Z"
          fill={BREAD_INNER}
        />
        <circle cx="66" cy="76" r="3.5" fill={CHARCOAL} />
        <circle cx="84" cy="76" r="3.5" fill={CHARCOAL} />
        <path d="M68 88 Q75 94 82 88" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
      </svg>
    );
  }
  if (step === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
        {/* Plate */}
        <ellipse cx="75" cy="116" rx="58" ry="16" fill="#E2E8F0" stroke={CHARCOAL} strokeWidth={3.5} />
        {/* Bread Slice */}
        <path
          d="M34 54 C34 34, 116 34, 116 54 C116 60, 110 64, 110 70 V106 C110 112, 104 116, 98 116 H52 C46 116, 40 112, 40 106 V70 C40 64, 34 60, 34 54 Z"
          fill={BREAD_CRUST}
          stroke={CHARCOAL}
          strokeWidth={4}
        />
        <path
          d="M44 56 C44 44, 106 44, 106 56 C106 60, 102 64, 102 68 V104 H48 V68 C48 64, 44 60, 44 56 Z"
          fill={BREAD_INNER}
        />
        {/* Rich Chocolate Spread */}
        <path
          d="M50 66 C56 54, 94 54, 100 66 C102 78, 96 98, 75 98 C54 98, 48 80, 50 66 Z"
          fill={CHOCO}
          stroke={CHARCOAL}
          strokeWidth={3}
        />
        {/* Cute Spreader Spoon */}
        <g transform="translate(86, 18) rotate(26)">
          <rect x="0" y="24" width="12" height="44" rx="6" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
          <ellipse cx="6" cy="16" rx="11" ry="16" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
        </g>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
      {/* Plate */}
      <ellipse cx="75" cy="118" rx="60" ry="16" fill="#E2E8F0" stroke={CHARCOAL} strokeWidth={3.5} />
      {/* Bottom Bread */}
      <rect x="28" y="88" width="94" height="24" rx="10" fill={BREAD_CRUST} stroke={CHARCOAL} strokeWidth={4} />
      {/* Chocolate Layer */}
      <path d="M28 84 Q52 94 75 84 Q98 94 122 84 V92 H28 Z" fill={CHOCO} stroke={CHARCOAL} strokeWidth={3} />
      {/* Top Bread */}
      <path
        d="M28 66 C28 48, 122 48, 122 66 V84 H28 Z"
        fill={BREAD_INNER}
        stroke={CHARCOAL}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path d="M28 66 C28 48, 122 48, 122 66" stroke={BREAD_CRUST} strokeWidth={8} strokeLinecap="round" />
      {/* Yummy Sparkles */}
      <path d="M124 26 L128 35 L137 39 L128 43 L124 52 L120 43 L111 39 L120 35 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
      <circle cx="32" cy="36" r="7" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.5} />
    </svg>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Hero Split Layout)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 3" accentDot={SUNNY}>
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
            background: SKY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#1D4ED8',
            marginBottom: 24,
          }}
        >
          <span>🧩</span>
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
          Pecahkan <Highlight color={STABILO}>Misi Besar</Highlight> Jadi Kecil!
        </h1>

        <p
          style={{
            margin: '28px 0 38px',
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1.38,
            color: MUTED,
            maxWidth: 790,
          }}
        >
          Puzzle Drag &amp; Drop Urutan Sikat Gigi &amp; Buat Roti
        </p>

        {/* Kids-friendly Quick Pill Highlights */}
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
              fontSize: 27,
              fontWeight: 700,
            }}
          >
            <span>🖱️</span>
            <span>Jurus Drag &amp; Drop</span>
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
            <span>🧩</span>
            <span>Urutan 1 • 2 • 3</span>
          </div>
        </div>
      </div>

      {/* Right Visual Showcase: Biko + Puzzle Pieces Sliding Into Target Slots */}
      <div style={{ ...abs(1020, 175, 790, 770), ...centerCol }}>
        {/* Warm Soft Backdrop Blob */}
        <div
          style={{
            position: 'absolute',
            width: 660,
            height: 620,
            borderRadius: '44% 56% 52% 48% / 48% 44% 56% 52%',
            background: '#FEF3C7',
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${TEAL}`,
          }}
        />

        {/* Floating Mini Laptop Screen showing Drag & Drop Puzzle */}
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 58,
            width: 390,
            padding: '16px 20px',
            borderRadius: 24,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            zIndex: 4,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700, color: CHARCOAL }}>
              🧩 Puzzle Urutan
            </span>
            <span
              style={{
                padding: '3px 12px',
                borderRadius: 99,
                background: TEAL_SOFT,
                border: `2px solid ${TEAL}`,
                fontSize: 15,
                fontWeight: 800,
                color: '#065F46',
              }}
            >
              Geser ke Kotak!
            </span>
          </div>

          <div style={{ ...row, justifyContent: 'space-between', gap: 14 }}>
            {/* Moving Toothbrush Tile */}
            <div
              style={{
                position: 'relative',
                animation: live ? 'cpj3-drag-slide 3.2s ease-in-out infinite' : undefined,
                zIndex: 5,
              }}
            >
              <PuzzleTileSvg color={SKY_SOFT} size={92}>
                <span style={{ fontSize: 38 }}>🪥</span>
              </PuzzleTileSvg>
              <div style={{ position: 'absolute', right: -16, bottom: -16 }}>
                <CursorHandSvg grabbing size={42} />
              </div>
            </div>

            {/* Dashed Target Box */}
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 22,
                background: TEAL_SOFT,
                border: `3px dashed ${TEAL}`,
                ...centerCol,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
                color: TEAL,
              }}
            >
              1
            </div>

            {/* Bread Piece Waiting */}
            <PuzzleTileSvg color={SUNNY_SOFT} size={92}>
              <span style={{ fontSize: 38 }}>🥪</span>
            </PuzzleTileSvg>
          </div>
        </div>

        {/* Floating Toothbrush & Bread Badges */}
        <div
          style={{
            position: 'absolute',
            right: 54,
            top: 90,
            padding: '12px 18px',
            borderRadius: 22,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CORAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 24,
            fontWeight: 700,
            transform: 'rotate(6deg)',
            zIndex: 4,
            animation: live ? 'cpj3-float 2.8s ease-in-out infinite' : undefined,
          }}
        >
          🍞 Buat Roti!
        </div>

        <BikoMascot
          pose="cover-laptop"
          width={440}
          style={{ position: 'relative', zIndex: 2, marginTop: 155 }}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi Besar dalam macOS Window + Biko)
// ============================================================================
const Slide02Misi: Page = () => (
  <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
    <SlideTitle>
      Apa <Highlight>Misi Kita</Highlight> Hari Ini?
    </SlideTitle>

    <MacWindowCard left={X0} top={250} width={1280} height={675} headerLabel="daftar-misi-3.exe" padding={42}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, height: '100%' }}>
        {/* Kartu 1: Biru #60A5FA — Drag & Drop */}
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

          {/* Hand dragging puzzle piece into dashed box */}
          <svg width={260} height={180} viewBox="0 0 260 180" fill="none">
            {/* Dashed Target Box */}
            <rect x="150" y="34" width="90" height="90" rx="20" fill={WHITE} stroke={TEAL} strokeWidth={4} strokeDasharray="10 8" />
            <text x="195" y="90" textAnchor="middle" fontFamily='"Fredoka", sans-serif' fontSize="34" fontWeight="700" fill={TEAL}>
              PAS!
            </text>
            {/* Dashed arrow */}
            <path d="M98 78 H142" stroke={CHARCOAL} strokeWidth={4} strokeDasharray="7 6" strokeLinecap="round" />
            <path d="M132 68 L144 78 L132 88" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            {/* Moving Puzzle Piece */}
            <rect x="18" y="34" width="82" height="82" rx="20" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} />
            <circle cx="59" cy="28" r="13" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} />
            <text x="59" y="88" textAnchor="middle" fontSize="38">
              🧩
            </text>
            {/* Grabbing Hand */}
            <rect x="44" y="102" width="44" height="36" rx="14" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} />
          </svg>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 36,
              fontWeight: 700,
              lineHeight: 1.24,
              color: CHARCOAL,
            }}
          >
            Jago Jurus <Highlight color="#DBEAFE">Klik, Tahan, Geser</Highlight> (Drag &amp; Drop)
          </div>
        </div>

        {/* Kartu 2: Hijau #10B981 — Pecah Misi Besar Jadi Kecil */}
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

          {/* 1 Giant Box Split Into 3 Small Boxes 1-2-3 */}
          <svg width={270} height={180} viewBox="0 0 270 180" fill="none">
            <rect x="14" y="20" width="242" height="48" rx="14" fill={CORAL_SOFT} stroke={CORAL} strokeWidth={3.5} />
            <text x="135" y="51" textAnchor="middle" fontFamily='"Fredoka", sans-serif' fontSize="22" fontWeight="700" fill={CHARCOAL}>
              MISI BESAR
            </text>
            <path d="M135 68 V96 M135 82 H48 V96 M135 82 H222 V96" stroke={CHARCOAL} strokeWidth={3.5} strokeDasharray="6 5" />
            {[
              { x: 16, n: '1', bg: SKY },
              { x: 103, n: '2', bg: SUNNY },
              { x: 190, n: '3', bg: TEAL },
            ].map((b) => (
              <g key={b.n}>
                <rect x={b.x} y="98" width="64" height="64" rx="16" fill={b.bg} stroke={CHARCOAL} strokeWidth={3.5} />
                <text
                  x={b.x + 32}
                  y="141"
                  textAnchor="middle"
                  fontFamily='"Fredoka", sans-serif'
                  fontSize="32"
                  fontWeight="700"
                  fill={b.n === '2' ? CHARCOAL : WHITE}
                >
                  {b.n}
                </text>
              </g>
            ))}
          </svg>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 36,
              fontWeight: 700,
              lineHeight: 1.24,
              color: CHARCOAL,
            }}
          >
            <Highlight color="#D1FAE5">Pecah Misi Besar</Highlight> Jadi Langkah Kecil
          </div>
        </div>
      </div>
    </MacWindowCard>

    {/* Biko Pointing Enthusiastically */}
    <div style={{ ...abs(1425, 310, 400, 620), ...centerCol }}>
      <BikoMascot pose="point-left" width={360} />
      <div
        style={{
          marginTop: 12,
          padding: '12px 24px',
          borderRadius: 99,
          background: SUNNY,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: `0 5px 0 ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 25,
          fontWeight: 700,
        }}
      >
        Ayo Pecahkan! 🚀
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Rahasia Coder #1: Pecah Misi Jadi Kecil! (Spotlight Card)
// ============================================================================
const Slide03PecahMisi: Page = () => {
  const [split, setSplit] = useState(true);

  return (
    <JuniorFrame badge="RAHASIA CODER #1" accentDot={SUNNY}>
      <SlideTitle>
        <Highlight>Pecah Misi</Highlight> Jadi Kecil!
      </SlideTitle>

      {/* Left Spotlight Illustration inside MacWindowCard */}
      <MacWindowCard left={X0} top={245} width={960} height={685} headerLabel="rahasia-dekomposisi.app" padding={28}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: 'linear-gradient(180deg, #FEF9C3 0%, #ECFDF5 100%)',
            border: `3px solid ${CHARCOAL}`,
            ...centerCol,
            justifyContent: 'space-between',
            padding: '28px 34px',
          }}
        >
          {/* Giant Puzzle vs Split Pieces */}
          <div style={{ ...row, gap: 22, marginTop: 12 }}>
            {!split ? (
              <div
                style={{
                  width: 580,
                  height: 300,
                  borderRadius: 32,
                  background: CORAL,
                  border: `4px solid ${CHARCOAL}`,
                  boxShadow: `0 10px 0 ${CHARCOAL}`,
                  ...centerCol,
                  position: 'relative',
                }}
              >
                {/* Dashed split preview lines */}
                <div style={{ position: 'absolute', left: '33%', top: 14, bottom: 14, borderLeft: `4px dashed ${WHITE}`, opacity: 0.7 }} />
                <div style={{ position: 'absolute', left: '66%', top: 14, bottom: 14, borderLeft: `4px dashed ${WHITE}`, opacity: 0.7 }} />
                <span style={{ fontSize: 66 }}>🧩</span>
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 42, fontWeight: 700, color: WHITE }}>
                  1 Misi Raksasa!
                </span>
              </div>
            ) : (
              <div style={{ ...row, gap: 26 }}>
                {[
                  { n: '1', color: SKY, text: 'Langkah 1', emoji: '🪥' },
                  { n: '2', color: SUNNY, text: 'Langkah 2', emoji: '😁' },
                  { n: '3', color: TEAL, text: 'Langkah 3', emoji: '💧' },
                ].map((item, idx) => (
                  <Fragment key={item.n}>
                    <div
                      style={{
                        width: 210,
                        height: 270,
                        borderRadius: 28,
                        background: WHITE,
                        border: `4px solid ${CHARCOAL}`,
                        boxShadow: `0 8px 0 ${item.color}`,
                        padding: 20,
                        ...centerCol,
                        justifyContent: 'space-between',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: 58,
                          height: 58,
                          borderRadius: 18,
                          background: item.color,
                          border: `3px solid ${CHARCOAL}`,
                          fontFamily: 'var(--osd-font-display)',
                          fontSize: 32,
                          fontWeight: 700,
                          color: item.n === '2' ? CHARCOAL : WHITE,
                          ...centerCol,
                        }}
                      >
                        {item.n}
                      </div>
                      <span style={{ fontSize: 62 }}>{item.emoji}</span>
                      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700, color: CHARCOAL }}>
                        {item.text}
                      </span>
                    </div>
                    {idx < 2 && (
                      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
                        ➜
                      </span>
                    )}
                  </Fragment>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="cpj3-card-btn"
            onClick={() => setSplit((s) => !s)}
            style={{
              padding: '14px 30px',
              borderRadius: 99,
              background: split ? SUNNY : TEAL,
              color: split ? CHARCOAL : WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 5px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {split ? '🔄 Lihat Misi Utuh' : '✂️ Pecah Jadi 3 Langkah Kecil!'}
          </button>
        </div>
      </MacWindowCard>

      {/* Right Column: Explanation Cards + Smiling Biko */}
      <div style={{ ...abs(1105, 255, 715, 675), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div
          style={{
            ...row,
            gap: 20,
            padding: '24px 28px',
            borderRadius: 24,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CORAL}`,
          }}
        >
          <span style={{ fontSize: 52 }}>🧩</span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.25 }}>
            Misi besar terasa <Highlight color="#FEE2E2">Sulit</Highlight>
          </span>
        </div>

        <div
          style={{
            ...row,
            gap: 20,
            padding: '24px 28px',
            borderRadius: 24,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${TEAL}`,
          }}
        >
          <span style={{ fontSize: 52 }}>✨</span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.25 }}>
            Bagi jadi <Highlight color="#D1FAE5">Langkah Kecil</Highlight> agar mudah!
          </span>
        </div>

        <div style={{ ...row, justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 6 }}>
          <div
            style={{
              padding: '18px 24px',
              borderRadius: 22,
              background: SUNNY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
              lineHeight: 1.3,
              maxWidth: 330,
            }}
          >
            Mulai dari langkah 1 dulu ya! ☝️
          </div>
          <BikoMascot pose="point-left" width={310} />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus Tangkas Baru: Drag & Drop! (3 Step Cards in MacWindowCard)
// ============================================================================
const DRAG_STEPS = [
  {
    num: 1,
    color: SKY,
    soft: SKY_SOFT,
    icon: '👇',
    title: 'Klik & Tahan',
    desc: 'tombol kiri',
  },
  {
    num: 2,
    color: SUNNY,
    soft: SUNNY_SOFT,
    icon: '➡️',
    title: 'Geser',
    desc: 'gambar ke kotak tujuan',
  },
  {
    num: 3,
    color: TEAL,
    soft: TEAL_SOFT,
    icon: '🖐️',
    title: 'Lepas Jari:',
    desc: '"Pas!"',
  },
];

const Slide04DragDrop: Page = () => {
  const live = useIsActivePage();
  const [phase, setPhase] = useState<1 | 2 | 3>(2);

  return (
    <JuniorFrame badge="JURUS TANGKAS BARU" accentDot={SKY}>
      <SlideTitle>
        Jurus <Highlight>Drag &amp; Drop!</Highlight>
      </SlideTitle>

      {/* Top 3 Sequential Step Cards inside MacWindowCard */}
      <MacWindowCard left={X0} top={240} width={W} height={695} headerLabel="tutorial-drag-and-drop.app" padding={34}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', gap: 26 }}>
          {/* 3 Step Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28 }}>
            {DRAG_STEPS.map((st) => {
              const active = phase === st.num;
              return (
                <button
                  key={st.num}
                  type="button"
                  className="cpj3-card-btn"
                  onClick={() => setPhase(st.num as 1 | 2 | 3)}
                  style={{
                    borderRadius: 26,
                    background: active ? st.soft : WHITE,
                    border: `4px solid ${active ? CHARCOAL : '#CBD5E1'}`,
                    boxShadow: active ? `0 8px 0 ${st.color}` : '0 4px 0 #CBD5E1',
                    padding: '22px 24px',
                    ...row,
                    gap: 18,
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: 18,
                      background: st.color,
                      border: `3px solid ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 34,
                      fontWeight: 700,
                      color: st.num === 2 ? CHARCOAL : WHITE,
                      ...centerCol,
                      flexShrink: 0,
                    }}
                  >
                    {st.num}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: CHARCOAL }}>
                      {st.icon} {st.title}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: MUTED, marginTop: 4 }}>{st.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 3-Phase Mouse & Cursor Visual Demonstration */}
          <div
            style={{
              flex: 1,
              borderRadius: 26,
              background: '#FFFDF7',
              border: `3px dashed #D6CDBB`,
              padding: '24px 36px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 28,
            }}
          >
            {/* Phase 1: Press Yellow Left Button */}
            <div
              onClick={() => setPhase(1)}
              style={{
                borderRadius: 22,
                background: phase === 1 ? SKY_SOFT : WHITE,
                border: `3px solid ${phase === 1 ? SKY : CHARCOAL}`,
                padding: 18,
                ...centerCol,
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <svg width={210} height={185} viewBox="0 0 210 185" fill="none">
                <rect x="52" y="28" width="106" height="142" rx="53" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
                <path d="M55 88 C55 52, 76 31, 105 31 V94 H55 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
                <path d="M155 88 C155 52, 134 31, 105 31 V94 H155 Z" fill="#F1F5F9" stroke={CHARCOAL} strokeWidth={3.5} />
                <rect x="97" y="46" width="16" height="30" rx="8" fill={CHARCOAL} />
                {/* Index finger holding down */}
                <rect x="66" y="4" width="32" height="66" rx="16" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} />
                <circle
                  cx="82"
                  cy="62"
                  r="24"
                  stroke={CORAL}
                  strokeWidth={3.5}
                  strokeDasharray="6 5"
                  style={{ transformOrigin: '82px 62px', animation: live ? 'cpj3-pulse-ring 1.5s infinite' : undefined }}
                />
              </svg>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: CHARCOAL }}>
                1. Tekan &amp; Tahan!
              </div>
            </div>

            {/* Phase 2: Glide Cursor Carrying Star */}
            <div
              onClick={() => setPhase(2)}
              style={{
                borderRadius: 22,
                background: phase === 2 ? SUNNY_SOFT : WHITE,
                border: `3px solid ${phase === 2 ? SUNNY : CHARCOAL}`,
                padding: 18,
                ...centerCol,
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <svg width={260} height={185} viewBox="0 0 260 185" fill="none">
                {/* Dashed trail */}
                <path d="M50 112 Q130 58 206 86" stroke={SKY} strokeWidth={6} strokeDasharray="10 8" strokeLinecap="round" />
                {/* Target dashed box */}
                <rect x="174" y="44" width="72" height="72" rx="18" fill={TEAL_SOFT} stroke={TEAL} strokeWidth={3.5} strokeDasharray="8 6" />
                {/* Star being dragged */}
                <g transform="translate(86, 48)">
                  <rect x="0" y="0" width="66" height="66" rx="16" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
                  <text x="33" y="44" textAnchor="middle" fontSize="34">
                    ⭐
                  </text>
                  {/* Grabbing hand */}
                  <rect x="26" y="48" width="34" height="28" rx="12" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3} />
                </g>
              </svg>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: CHARCOAL }}>
                2. Geser Pelan ➡️
              </div>
            </div>

            {/* Phase 3: Release Into Target Box */}
            <div
              onClick={() => setPhase(3)}
              style={{
                borderRadius: 22,
                background: phase === 3 ? TEAL_SOFT : WHITE,
                border: `3px solid ${phase === 3 ? TEAL : CHARCOAL}`,
                padding: 18,
                ...centerCol,
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <svg width={240} height={185} viewBox="0 0 240 185" fill="none">
                {/* Target Box with Star Fitted Inside */}
                <rect x="74" y="46" width="92" height="92" rx="22" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} />
                <rect x="84" y="56" width="72" height="72" rx="16" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
                <text x="120" y="104" textAnchor="middle" fontSize="38">
                  ⭐
                </text>
                {/* Sparkles */}
                <path d="M180 28 L184 38 L194 42 L184 46 L180 56 L176 46 L166 42 L176 38 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
                <text x="52" y="44" fontFamily='"Fredoka", sans-serif' fontSize="24" fontWeight="700" fill={TEAL}>
                  PAS!
                </text>
              </svg>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: '#065F46' }}>
                3. Lepas Jari: &ldquo;Pas!&rdquo;
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Latihan Logika #1: Urutan Sikat Gigi (Horizontal Sequence Cards)
// ============================================================================
const TOOTH_STEPS = [
  {
    num: 1,
    step: 1 as const,
    color: SKY,
    soft: SKY_SOFT,
    emoji: '🪥',
    title: 'Siapkan',
    highlight: 'Sikat & Pasta',
  },
  {
    num: 2,
    step: 2 as const,
    color: SUNNY,
    soft: SUNNY_SOFT,
    emoji: '😁',
    title: 'Gosok Gigi',
    highlight: 'sampai bersih',
  },
  {
    num: 3,
    step: 3 as const,
    color: TEAL,
    soft: TEAL_SOFT,
    emoji: '💧',
    title: 'Kumur Air',
    highlight: '& senyum kinclong!',
  },
];

const Slide05SikatGigi: Page = () => (
  <JuniorFrame badge="MISI PUZZLE #1" accentDot={SKY}>
    <SlideTitle>
      Urutan <Highlight>Sikat Gigi</Highlight> Pagi
    </SlideTitle>

    {/* 3 Horizontal Sequence Puzzle Cards */}
    <div style={{ ...abs(X0, 250, W, 620), ...row, justifyContent: 'space-between', gap: 22 }}>
      {TOOTH_STEPS.map((item, idx) => (
        <Fragment key={item.num}>
          <div
            style={{
              flex: 1,
              height: '100%',
              borderRadius: 32,
              background: WHITE,
              border: `4px solid ${CHARCOAL}`,
              boxShadow: `0 10px 0 ${item.color}`,
              padding: '32px 28px',
              ...centerCol,
              justifyContent: 'space-between',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {/* Puzzle Notch Visual Hint */}
            <div
              style={{
                width: 78,
                height: 78,
                borderRadius: 24,
                background: item.color,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 42,
                fontWeight: 700,
                color: item.num === 2 ? CHARCOAL : WHITE,
                ...centerCol,
              }}
            >
              {item.num}
            </div>

            <div
              style={{
                width: 240,
                height: 210,
                borderRadius: 28,
                background: item.soft,
                border: `3px solid ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              <ToothbrushStepArt step={item.step} size={175} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.25 }}>
              <div>
                {item.emoji} {item.title}
              </div>
              <Highlight color={item.soft}>{item.highlight}</Highlight>
            </div>
          </div>

          {idx < 2 && (
            <svg width={52} height={52} viewBox="0 0 52 52" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="26" cy="26" r="23" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
              <path
                d="M16 26 H34 M27 18 L36 26 L27 34"
                stroke={CHARCOAL}
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </Fragment>
      ))}
    </div>

    {/* Bottom Cheer Strip with Mini Biko */}
    <div style={{ ...abs(X0, 895, W, 100), ...row, justifyContent: 'center', gap: 22 }}>
      <div
        style={{
          padding: '14px 34px',
          borderRadius: 99,
          background: STABILO,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: `0 5px 0 ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        ✨ Urutannya selalu 1 ➜ 2 ➜ 3 supaya gigi kinclong!
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 06 — Permainan Cepat: Ayo Tebak Urutannya!
// ============================================================================
const Slide06TebakUrutan: Page = () => {
  const [choice, setChoice] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" top={130}>
        Mana Langkah <Highlight>Pertama</Highlight> Sikat Gigi?
      </SlideTitle>

      {/* Two Big Interactive Choice Cards */}
      <div style={{ ...abs(160, 240, 1600, 440), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        {/* Kartu A: Kumur Air */}
        <button
          type="button"
          className="cpj3-card-btn"
          onClick={() => setChoice('A')}
          style={{
            borderRadius: 32,
            background: choice === 'A' ? CORAL_SOFT : WHITE,
            border: `4px solid ${choice === 'A' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${choice === 'A' ? CORAL : SKY}`,
            padding: '28px 36px',
            ...centerCol,
            justifyContent: 'space-between',
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
            PILIHAN A
          </div>

          <ToothbrushStepArt step={3} size={190} />

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 42, fontWeight: 700, color: CHARCOAL }}>
            💧 Kumur Air
          </div>
        </button>

        {/* Kartu B: Siapkan Sikat */}
        <button
          type="button"
          className="cpj3-card-btn"
          onClick={() => setChoice('B')}
          style={{
            borderRadius: 32,
            background: choice === 'B' ? TEAL_SOFT : WHITE,
            border: `4px solid ${choice === 'B' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${choice === 'B' ? TEAL : SUNNY}`,
            padding: '28px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              padding: '8px 24px',
              borderRadius: 99,
              background: SUNNY,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            PILIHAN B
          </div>

          <ToothbrushStepArt step={1} size={190} />

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 42, fontWeight: 700, color: CHARCOAL }}>
            🪥 Siapkan Sikat
          </div>
        </button>
      </div>

      {/* Bottom Center: Biko Holding ? Sign + Prompt / Feedback Pill */}
      <div style={{ ...abs(240, 695, 1440, 305), ...row, justifyContent: 'center', gap: 36 }}>
        <BikoMascot pose="question" width={250} />

        <div
          style={{
            padding: '26px 40px',
            borderRadius: 28,
            background: choice === 'B' ? TEAL_SOFT : choice === 'A' ? CORAL_SOFT : STABILO,
            border: `3.5px solid ${choice === 'B' ? TEAL : choice === 'A' ? CORAL : CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 36,
            fontWeight: 700,
            color: CHARCOAL,
            textAlign: 'center',
            minWidth: 560,
          }}
        >
          {choice === 'B' && '✅ BENAR SEKALI! Siapkan Sikat dulu! ⭐'}
          {choice === 'A' && '🤔 Hampir! Kumur Air itu langkah terakhir!'}
          {choice === null && '👉 Tunjuk gambar yang benar ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Latihan Logika #2: Ayo Buat Roti Enak!
// ============================================================================
const BREAD_STEPS = [
  {
    num: 1,
    step: 1 as const,
    color: SKY,
    soft: SKY_SOFT,
    emoji: '🍞',
    title: 'Ambil',
    highlight: 'Roti Tawar',
  },
  {
    num: 2,
    step: 2 as const,
    color: SUNNY,
    soft: SUNNY_SOFT,
    emoji: '🍫',
    title: 'Oles',
    highlight: 'Selai Cokelat',
  },
  {
    num: 3,
    step: 3 as const,
    color: TEAL,
    soft: TEAL_SOFT,
    emoji: '🥪',
    title: 'Tutup Roti:',
    highlight: 'Siap Dimakan!',
  },
];

const Slide07BuatRoti: Page = () => (
  <JuniorFrame badge="MISI PUZZLE #2" accentDot={SUNNY}>
    <SlideTitle>
      Ayo <Highlight>Buat Roti</Highlight> Enak!
    </SlideTitle>

    {/* 3 Horizontal Sequence Cards on Left/Center */}
    <div style={{ ...abs(X0, 250, 1340, 660), ...row, justifyContent: 'space-between', gap: 18 }}>
      {BREAD_STEPS.map((item, idx) => (
        <Fragment key={item.num}>
          <div
            style={{
              flex: 1,
              height: '100%',
              borderRadius: 30,
              background: WHITE,
              border: `4px solid ${CHARCOAL}`,
              boxShadow: `0 10px 0 ${item.color}`,
              padding: '28px 22px',
              ...centerCol,
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 22,
                background: item.color,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 38,
                fontWeight: 700,
                color: item.num === 2 ? CHARCOAL : WHITE,
                ...centerCol,
              }}
            >
              {item.num}
            </div>

            <div
              style={{
                width: 220,
                height: 210,
                borderRadius: 26,
                background: item.soft,
                border: `3px solid ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              <BreadStepArt step={item.step} size={175} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1.25 }}>
              <div>
                {item.emoji} {item.title}
              </div>
              <Highlight color={item.soft}>{item.highlight}</Highlight>
            </div>
          </div>

          {idx < 2 && (
            <svg width={44} height={44} viewBox="0 0 44 44" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="22" cy="22" r="20" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
              <path d="M13 22 H29 M23 15 L31 22 L23 29" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </Fragment>
      ))}
    </div>

    {/* Chef Biko on Right */}
    <div style={{ ...abs(1470, 320, 360, 600), ...centerCol }}>
      <BikoMascot pose="chef" width={340} />
      <div
        style={{
          marginTop: 14,
          padding: '12px 24px',
          borderRadius: 99,
          background: SUNNY,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: `0 5px 0 ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 25,
          fontWeight: 700,
        }}
      >
        Koki Biko! 👨‍🍳🥪
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 08 — Tips Jagoan Drag & Drop (2 Kolom Perbandingan Boleh vs Jangan)
// ============================================================================
const Slide08TipsDragDrop: Page = () => (
  <JuniorFrame badge="TIPS JAGOAN" accentDot={TEAL}>
    <SlideTitle>
      Rahasia Geser Biar <Highlight>Pas!</Highlight>
    </SlideTitle>

    {/* Left Column: BOLEH */}
    <div
      style={{
        ...abs(X0, 245, 830, 695),
        borderRadius: 32,
        background: TEAL_SOFT,
        border: `4px solid ${TEAL}`,
        boxShadow: `0 10px 0 ${TEAL}`,
        padding: '30px 34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ ...row, gap: 18 }}>
        <IconCheck size={58} />
        <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 700, color: '#065F46' }}>
          BOLEH
        </span>
      </div>

      {/* Visual: Puzzle piece lands neatly inside target box */}
      <div
        style={{
          padding: '18px 26px',
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <svg width={240} height={115} viewBox="0 0 240 115" fill="none">
          <path d="M24 58 H118" stroke={TEAL} strokeWidth={5} strokeDasharray="8 6" strokeLinecap="round" />
          <path d="M108 48 L120 58 L108 68" stroke={TEAL} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          <rect x="132" y="14" width="88" height="88" rx="22" fill={TEAL_SOFT} stroke={TEAL} strokeWidth={4} />
          <rect x="142" y="24" width="68" height="68" rx="16" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
          <text x="176" y="70" textAnchor="middle" fontSize="34">
            🧩
          </text>
        </svg>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: '#065F46' }}>
          Masuk Tepat! ✅
        </div>
      </div>

      <div
        style={{
          ...row,
          gap: 20,
          padding: '22px 26px',
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
        }}
      >
        <span style={{ fontSize: 46 }}>✊</span>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
          <Highlight color="#D1FAE5">Tahan Tombol</Highlight> saat menggeser
        </div>
      </div>

      <div
        style={{
          ...row,
          gap: 20,
          padding: '22px 26px',
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
        }}
      >
        <span style={{ fontSize: 46 }}>🐢</span>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
          Geser <Highlight color="#D1FAE5">Pelan &amp; Rapi</Highlight> ke kotak
        </div>
      </div>
    </div>

    {/* Right Column: JANGAN */}
    <div
      style={{
        ...abs(990, 245, 830, 695),
        borderRadius: 32,
        background: CORAL_SOFT,
        border: `4px solid ${CORAL}`,
        boxShadow: `0 10px 0 ${CORAL}`,
        padding: '30px 34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ ...row, gap: 18 }}>
        <IconCross size={58} />
        <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 700, color: '#991B1B' }}>
          JANGAN
        </span>
      </div>

      {/* Visual: Puzzle piece falls outside box */}
      <div
        style={{
          padding: '18px 26px',
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <svg width={240} height={115} viewBox="0 0 240 115" fill="none">
          {/* Empty Target Box */}
          <rect x="136" y="14" width="84" height="84" rx="22" fill="#FFF1F2" stroke={CORAL} strokeWidth={4} strokeDasharray="8 6" />
          {/* Dropped Piece Outside */}
          <g transform="translate(22, 34) rotate(-14)">
            <rect x="0" y="0" width="66" height="66" rx="16" fill="#FEE2E2" stroke={CHARCOAL} strokeWidth={3.5} />
            <text x="33" y="45" textAnchor="middle" fontSize="32">
              🧩
            </text>
          </g>
          <path d="M96 42 L124 72" stroke={CORAL} strokeWidth={4} strokeDasharray="5 5" strokeLinecap="round" />
        </svg>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: '#991B1B' }}>
          Jatuh di Luar! ❌
        </div>
      </div>

      <div
        style={{
          ...row,
          gap: 20,
          padding: '22px 26px',
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
        }}
      >
        <span style={{ fontSize: 46 }}>💨</span>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
          <Highlight color="#FEE2E2">Lepas Tombol</Highlight> di tengah jalan
        </div>
      </div>

      <div
        style={{
          ...row,
          gap: 20,
          padding: '22px 26px',
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
        }}
      >
        <span style={{ fontSize: 46 }}>⚡</span>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
          Menggeser <Highlight color="#FEE2E2">Terlalu Cepat</Highlight>
        </div>
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Susun Puzzle Urutan! (3 Blok ScratchJr + Interactive Drag & Drop)
// ============================================================================
const MISSION_BLOCKS = [
  {
    num: 1,
    color: SKY,
    soft: SKY_SOFT,
    title: 'Klik & Tahan',
    sub: 'gambar langkah',
    icon: '👇',
  },
  {
    num: 2,
    color: SUNNY,
    soft: SUNNY_SOFT,
    title: 'Geser',
    sub: 'ke kotak 1, 2, 3',
    icon: '➡️',
  },
  {
    num: 3,
    color: TEAL,
    soft: TEAL_SOFT,
    title: 'Lepas Jari',
    sub: 'sampai semua pas!',
    icon: '🖐️',
  },
];

type PuzzleItem = {
  id: string;
  order: number;
  emoji: string;
  label: string;
  color: string;
};

const PUZZLE_SETS: Record<'gigi' | 'roti', { title: string; items: PuzzleItem[] }> = {
  gigi: {
    title: 'Urutan Sikat Gigi',
    items: [
      { id: 'g2', order: 2, emoji: '😁', label: 'Gosok Gigi', color: SUNNY_SOFT },
      { id: 'g3', order: 3, emoji: '💧', label: 'Kumur Air', color: TEAL_SOFT },
      { id: 'g1', order: 1, emoji: '🪥', label: 'Siapkan Sikat', color: SKY_SOFT },
    ],
  },
  roti: {
    title: 'Urutan Buat Roti',
    items: [
      { id: 'r3', order: 3, emoji: '🥪', label: 'Tutup Roti', color: TEAL_SOFT },
      { id: 'r1', order: 1, emoji: '🍞', label: 'Roti Tawar', color: SKY_SOFT },
      { id: 'r2', order: 2, emoji: '🍫', label: 'Oles Selai', color: SUNNY_SOFT },
    ],
  },
};

const Slide09MisiPuzzle: Page = () => {
  const [mode, setMode] = useState<'gigi' | 'roti'>('gigi');
  const [slots, setSlots] = useState<(PuzzleItem | null)[]>([null, null, null]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('Tarik gambar atau klik kartu lalu klik kotak 1, 2, 3!');

  const currentItems = PUZZLE_SETS[mode].items;
  const placedIds = new Set(slots.filter((s): s is PuzzleItem => s !== null).map((s) => s.id));
  const remainingItems = currentItems.filter((item) => !placedIds.has(item.id));
  const completed = slots.every((s, idx) => s !== null && s.order === idx + 1);

  const switchMode = (next: 'gigi' | 'roti') => {
    setMode(next);
    setSlots([null, null, null]);
    setSelectedId(null);
    setFeedback('Tarik gambar atau klik kartu lalu klik kotak 1, 2, 3!');
  };

  const resetPuzzle = () => {
    setSlots([null, null, null]);
    setSelectedId(null);
    setFeedback('Ayo susun dari nomor 1, 2, lalu 3!');
  };

  const placeItemInSlot = (item: PuzzleItem, slotIdx: number) => {
    if (item.order === slotIdx + 1) {
      const next = [...slots];
      next[slotIdx] = item;
      setSlots(next);
      setSelectedId(null);
      const isDone = next.every((s, i) => s !== null && s.order === i + 1);
      setFeedback(isDone ? '🎉 Yeay! Semua urutan PAS! Hebat!' : `✅ Pas! "${item.label}" masuk kotak ${slotIdx + 1}!`);
    } else {
      setFeedback(`🤔 Coba cek lagi! "${item.label}" bukan urutan nomor ${slotIdx + 1}!`);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
    setSelectedId(itemId);
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>, slotIdx: number) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || selectedId;
    const item = currentItems.find((x) => x.id === id);
    if (item) placeItemInSlot(item, slotIdx);
  };

  const handleSlotClick = (slotIdx: number) => {
    if (!selectedId) return;
    const item = currentItems.find((x) => x.id === selectedId);
    if (item) placeItemInSlot(item, slotIdx);
  };

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={SUNNY}>
      <SlideTitle>
        Misi Susun <Highlight>Puzzle Urutan!</Highlight>
      </SlideTitle>

      {/* Top Row: 3 ScratchJr-Style Step Blocks */}
      <div style={{ ...abs(X0, 224, W, 184), ...row, justifyContent: 'space-between', gap: 18 }}>
        {MISSION_BLOCKS.map((blk, i) => (
          <Fragment key={blk.num}>
            <div
              style={{
                flex: 1,
                height: 170,
                borderRadius: 26,
                background: blk.soft,
                border: `4px solid ${CHARCOAL}`,
                boxShadow: `0 7px 0 ${blk.color}`,
                padding: '18px 24px',
                ...row,
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 18,
                  background: blk.color,
                  border: `3px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 34,
                  fontWeight: 700,
                  color: blk.num === 2 ? CHARCOAL : WHITE,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                {blk.num}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1.15 }}>
                  {blk.icon} {blk.title}
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: MUTED, marginTop: 4 }}>{blk.sub}</div>
              </div>
            </div>

            {i < 2 && (
              <svg width={40} height={40} viewBox="0 0 44 44" fill="none" style={{ flexShrink: 0 }}>
                <path
                  d="M6 22 H34 M24 12 L36 22 L24 32"
                  stroke={CHARCOAL}
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </Fragment>
        ))}
      </div>

      {/* Bottom Interactive Drag & Drop Puzzle Board */}
      <MacWindowCard left={X0} top={428} width={1320} height={542} headerLabel="game-puzzle-urutan.app" padding={22}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: 'linear-gradient(180deg, #F0FDF4 0%, #FFFBEB 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            padding: '18px 26px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Mode Tabs & Reset */}
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 12 }}>
              <button
                type="button"
                className="cpj3-card-btn"
                onClick={() => switchMode('gigi')}
                style={{
                  padding: '8px 20px',
                  borderRadius: 99,
                  background: mode === 'gigi' ? SKY : WHITE,
                  color: mode === 'gigi' ? WHITE : CHARCOAL,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                🪥 Sikat Gigi
              </button>
              <button
                type="button"
                className="cpj3-card-btn"
                onClick={() => switchMode('roti')}
                style={{
                  padding: '8px 20px',
                  borderRadius: 99,
                  background: mode === 'roti' ? SUNNY : WHITE,
                  color: CHARCOAL,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                🥪 Buat Roti
              </button>
            </div>

            <button
              type="button"
              className="cpj3-card-btn"
              onClick={resetPuzzle}
              style={{
                padding: '8px 18px',
                borderRadius: 99,
                background: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                boxShadow: `0 3px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              🔄 Ulang
            </button>
          </div>

          {/* 3 Numbered Target Drop Slots */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 22 }}>
            {[0, 1, 2].map((idx) => {
              const placed = slots[idx];
              return (
                <button
                  key={idx}
                  type="button"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, idx)}
                  onClick={() => handleSlotClick(idx)}
                  style={{
                    height: 150,
                    borderRadius: 22,
                    background: placed ? placed.color : WHITE,
                    border: placed ? `3.5px solid ${TEAL}` : `3.5px dashed ${selectedId ? SKY : '#94A3B8'}`,
                    boxShadow: placed ? `0 6px 0 ${TEAL}` : 'none',
                    ...centerCol,
                    gap: 6,
                    cursor: selectedId && !placed ? 'pointer' : 'default',
                  }}
                >
                  {placed ? (
                    <>
                      <span style={{ fontSize: 48 }}>{placed.emoji}</span>
                      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: CHARCOAL }}>
                        {idx + 1}. {placed.label} ✅
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 14,
                          background: '#E2E8F0',
                          fontFamily: 'var(--osd-font-display)',
                          fontSize: 26,
                          fontWeight: 700,
                          color: CHARCOAL,
                          ...centerCol,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span style={{ fontSize: 19, fontWeight: 800, color: MUTED }}>Taruh Langkah {idx + 1}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Draggable / Clickable Piece Tray */}
          <div style={{ ...row, justifyContent: 'space-between', gap: 18 }}>
            <div style={{ ...row, gap: 14 }}>
              {remainingItems.map((item) => {
                const isSelected = selectedId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    draggable
                    className="cpj3-card-btn"
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onClick={() => setSelectedId(isSelected ? null : item.id)}
                    style={{
                      padding: '10px 22px',
                      borderRadius: 20,
                      background: isSelected ? SUNNY : WHITE,
                      border: `3px solid ${isSelected ? CORAL : CHARCOAL}`,
                      boxShadow: `0 5px 0 ${CHARCOAL}`,
                      ...row,
                      gap: 10,
                    }}
                  >
                    <span style={{ fontSize: 34 }}>{item.emoji}</span>
                    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
              {remainingItems.length === 0 && (
                <div
                  style={{
                    padding: '12px 26px',
                    borderRadius: 20,
                    background: TEAL,
                    color: WHITE,
                    border: `3px solid ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 26,
                    fontWeight: 700,
                  }}
                >
                  🏆 {PUZZLE_SETS[mode].title} Selesai!
                </div>
              )}
            </div>

            <div
              style={{
                padding: '10px 20px',
                borderRadius: 99,
                background: completed ? TEAL_SOFT : STABILO,
                border: `2.5px solid ${CHARCOAL}`,
                fontSize: 20,
                fontWeight: 800,
                color: CHARCOAL,
              }}
            >
              {feedback}
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko on Right */}
      <div style={{ ...abs(1455, 450, 365, 500), ...centerCol }}>
        <BikoMascot pose="jump" width={310} />
        <div
          style={{
            marginTop: 8,
            padding: '10px 22px',
            borderRadius: 99,
            background: TEAL,
            color: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            boxShadow: `0 4px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          {completed ? 'Jagoan Puzzle! 🎉' : 'Ayo Geser! 🧩'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 3
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      {/* Colorful Confetti */}
      {[
        { x: 140, y: 210, c: CORAL, s: 20 },
        { x: 310, y: 170, c: TEAL, s: 18 },
        { x: 1290, y: 180, c: SKY, s: 22 },
        { x: 1720, y: 260, c: LAVENDER, s: 20 },
        { x: 165, y: 830, c: SUNNY, s: 22 },
        { x: 1410, y: 870, c: CORAL, s: 18 },
      ].map((dot, idx) => (
        <div
          key={idx}
          aria-hidden
          style={{
            ...abs(dot.x, dot.y, dot.s, dot.s),
            borderRadius: 6,
            background: dot.c,
            border: `2px solid ${CHARCOAL}`,
            animation: live ? `cpj3-confetti ${2.4 + (idx % 3) * 0.4}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={130} size={62}>
        Keren! Kamu <Highlight color={STABILO}>Jagoan Puzzle! 🎉</Highlight>
      </SlideTitle>

      {/* Center Celebration Medal Card */}
      <MacWindowCard left={170} top={250} width={1160} height={680} headerLabel="lencana-juara-3.award" padding={42}>
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-between', textAlign: 'center' }}>
          {/* Gold Medal SVG with Star Puzzle Piece & Cursor Hand */}
          <svg width={270} height={260} viewBox="0 0 260 250" fill="none">
            {/* Ribbons */}
            <path d="M90 156 L66 238 L104 218 L122 240 L122 156 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            <path d="M170 156 L194 238 L156 218 L138 240 L138 156 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            {/* Gold Medal */}
            <circle cx="130" cy="98" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
            <circle cx="130" cy="98" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={3.5} />
            {/* Puzzle Tile Inside Medal */}
            <rect x="94" y="64" width="72" height="72" rx="18" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
            <circle cx="130" cy="59" r="11" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
            {/* Star Inside Puzzle */}
            <path
              d="M130 74 L135 86 L148 88 L138 97 L141 110 L130 103 L119 110 L122 97 L112 88 L125 86 Z"
              fill={SUNNY}
              stroke={CHARCOAL}
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
            {/* Cursor Arrow */}
            <path
              d="M142 106 L172 126 L156 130 L163 144 L156 148 L149 134 L142 142 Z"
              fill={SKY}
              stroke={CHARCOAL}
              strokeWidth={3}
              strokeLinejoin="round"
            />
          </svg>

          <div
            style={{
              padding: '14px 34px',
              borderRadius: 99,
              background: TEAL,
              color: WHITE,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            🏅 Lencana Jagoan Drag &amp; Drop
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 32,
              fontWeight: 700,
              lineHeight: 1.38,
              maxWidth: 880,
              color: CHARCOAL,
            }}
          >
            Kamu sudah mahir <Highlight>Klik-Tahan-Geser</Highlight> dan pintar{' '}
            <Highlight color="#D1FAE5">Memecah Misi Besar!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Celebrating Jumping Biko on Right */}
      <div style={{ ...abs(1370, 385, 420, 520), ...centerCol }}>
        <BikoMascot pose="jump" width={400} />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// Speaker Notes (Talk Track for Mentors teaching Ages 5–7)
// ============================================================================
export const notes: (string | undefined)[] = [
  `Halo Code Explorer cilik! Di Pertemuan 3 hari ini, Biko membawa misi seru: Pecahkan Misi Besar Jadi Kecil!
Kita akan bermain Puzzle Drag & Drop untuk menyusun urutan Sikat Gigi dan Buat Roti.`,

  `Ada dua misi kita hari ini:
1. Jago jurus Klik, Tahan, dan Geser (Drag & Drop) pakai mouse atau trackpad.
2. Belajar memecah misi besar menjadi langkah kecil yang urut 1-2-3!`,

  `Ini Rahasia Coder #1: Kalau ada misi besar yang terasa sulit, jangan bingung!
Pecah menjadi langkah-langkah kecil bernomor 1, 2, 3 supaya gampang dikerjakan!`,

  `Bagaimana cara jurus Drag & Drop?
1. Klik & Tahan tombol kiri (jangan dilepas dulu ya!).
2. Geser gambar pelan-pelan ke kotak tujuan.
3. Lepas jari kalau sudah sampai di kotak: "Pas!"`,

  `Latihan Logika #1: Urutan Sikat Gigi Pagi!
Langkah 1: Siapkan sikat dan pasta gigi.
Langkah 2: Gosok gigi sampai bersih berbusa.
Langkah 3: Kumur air bersih & senyum kinclong!`,

  `Permainan Cepat! Ayo tebak ya:
Mana langkah PERTAMA sebelum sikat gigi — Pilihan A (Kumur Air) atau Pilihan B (Siapkan Sikat)? Coba tunjuk di layar!`,

  `Latihan Logika #2: Ayo Buat Roti Enak bersama Koki Biko!
Langkah 1: Ambil roti tawar.
Langkah 2: Oles selai cokelat manis.
Langkah 3: Tutup roti, siap dimakan!`,

  `Ingat Tips Jagoan Drag & Drop:
BOLEH tahan tombol saat menggeser dan geser pelan-pelan agar rapi.
JANGAN lepas tombol di tengah jalan atau menggeser terlalu cepat supaya puzzle tidak jatuh di luar kotak!`,

  `Waktunya praktik langsung!
Ikuti blok 1-2-3: Klik & Tahan gambar, Geser ke kotak nomor 1, 2, 3, lalu Lepas sampai semua pas! Mentor bisa coba drag & drop langsung di layar.`,

  `Selamat! Kalian luar biasa hari ini!
Semua resmi mendapatkan Lencana Jagoan Drag & Drop karena sudah mahir Klik-Tahan-Geser dan pintar Memecah Misi Besar!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 3 — Pecahkan Misi Besar Jadi Kecil',
  createdAt: '2026-11-13T09:00:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03PecahMisi,
  Slide04DragDrop,
  Slide05SikatGigi,
  Slide06TebakUrutan,
  Slide07BuatRoti,
  Slide08TipsDragDrop,
  Slide09MisiPuzzle,
  Slide10Lencana,
] satisfies Page[];

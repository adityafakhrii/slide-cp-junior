import { Fragment, useState, type CSSProperties, type DragEvent, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-4-detektif-kereta-berpola';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj4-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj4-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj4-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj4-chug {
  0%, 100% { transform: translateX(0px) translateY(0px); }
  50% { transform: translateX(8px) translateY(-3px); }
}
@keyframes cpj4-puff {
  0% { opacity: 0.85; transform: translate(0px, 0px) scale(0.8); }
  100% { opacity: 0.15; transform: translate(-18px, -16px) scale(1.25); }
}
.cpj4-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj4-card-btn:hover {
  transform: translateY(-4px);
}
.cpj4-card-btn:active {
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
          animation: live ? 'cpj4-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 4 • Detektif Kereta Berpola</span>
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
// Reusable Flat-Vector Illustrations (Train Engine, Wagons, Shapes, Track)
// ============================================================================
type ShapeKind = 'star' | 'circle' | 'triangle' | 'heart';

const PatternShapeSvg = ({
  shape,
  fill,
  size = 76,
}: {
  shape: ShapeKind;
  fill: string;
  size?: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ display: 'block' }}>
    {shape === 'star' && (
      <path
        d="M40 8 L49 27 L70 30 L55 44 L59 65 L40 55 L21 65 L25 44 L10 30 L31 27 Z"
        fill={fill}
        stroke={CHARCOAL}
        strokeWidth={4}
        strokeLinejoin="round"
      />
    )}
    {shape === 'circle' && (
      <circle cx="40" cy="40" r="28" fill={fill} stroke={CHARCOAL} strokeWidth={4} />
    )}
    {shape === 'triangle' && (
      <path
        d="M40 12 L68 64 H12 Z"
        fill={fill}
        stroke={CHARCOAL}
        strokeWidth={4}
        strokeLinejoin="round"
      />
    )}
    {shape === 'heart' && (
      <path
        d="M40 66 C40 66, 12 48, 12 29 C12 18, 22 12, 31 15 C36 17, 39 21, 40 24 C41 21, 44 17, 49 15 C58 12, 68 18, 68 29 C68 48, 40 66, 40 66 Z"
        fill={fill}
        stroke={CHARCOAL}
        strokeWidth={4}
        strokeLinejoin="round"
      />
    )}
  </svg>
);

const TrainLocomotiveSvg = ({ width = 200 }: { width?: number }) => {
  const height = Math.round(width * 0.78);
  return (
    <svg width={width} height={height} viewBox="0 0 210 165" fill="none" style={{ display: 'block', flexShrink: 0 }}>
      {/* Chimney Puffs */}
      <circle cx="152" cy="18" r="10" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
      <circle cx="132" cy="28" r="7" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
      {/* Chimney */}
      <path d="M142 36 H168 L162 66 H148 Z" fill={CHARCOAL} />
      {/* Cabin */}
      <rect x="26" y="42" width="70" height="78" rx="14" fill={SKY} stroke={CHARCOAL} strokeWidth={4} />
      <rect x="18" y="34" width="86" height="14" rx="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
      {/* Cabin Window */}
      <rect x="42" y="56" width="38" height="32" rx="8" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
      {/* Boiler Body */}
      <rect x="92" y="64" width="90" height="56" rx="16" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} />
      {/* Nose Bumper */}
      <path d="M178 90 L198 120 H174 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
      {/* Stripes */}
      <rect x="96" y="88" width="80" height="10" rx="5" fill={SUNNY} />
      {/* Wheels */}
      <circle cx="56" cy="132" r="21" fill={CHARCOAL} />
      <circle cx="56" cy="132" r="9" fill={SUNNY} />
      <circle cx="122" cy="134" r="17" fill={CHARCOAL} />
      <circle cx="122" cy="134" r="7" fill={WHITE} />
      <circle cx="164" cy="134" r="17" fill={CHARCOAL} />
      <circle cx="164" cy="134" r="7" fill={WHITE} />
    </svg>
  );
};

const TrainWagonCard = ({
  color,
  label,
  shape,
  shapeColor,
  isUnknown = false,
  width = 185,
  height = 148,
  onClick,
}: {
  color: string;
  label?: string;
  shape?: ShapeKind;
  shapeColor?: string;
  isUnknown?: boolean;
  width?: number;
  height?: number;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    style={{
      position: 'relative',
      width,
      height,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: onClick ? 'pointer' : 'default',
      flexShrink: 0,
    }}
  >
    {/* Wagon Body */}
    <div
      style={{
        width: '100%',
        height: height - 26,
        borderRadius: 22,
        background: isUnknown ? WHITE : color,
        border: isUnknown ? `4px dashed ${CORAL}` : `4px solid ${CHARCOAL}`,
        boxShadow: isUnknown ? 'none' : `0 6px 0 ${CHARCOAL}`,
        ...centerCol,
        gap: 4,
      }}
    >
      {isUnknown ? (
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 52,
            fontWeight: 700,
            color: CORAL,
          }}
        >
          ?
        </span>
      ) : shape ? (
        <PatternShapeSvg shape={shape} fill={shapeColor ?? WHITE} size={74} />
      ) : (
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 28,
            fontWeight: 700,
            color: color === SUNNY ? CHARCOAL : WHITE,
          }}
        >
          {label}
        </span>
      )}
    </div>

    {/* Two Wheels */}
    <div style={{ ...row, justifyContent: 'space-around', width: '78%', marginTop: -6 }}>
      {[0, 1].map((w) => (
        <div
          key={w}
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: CHARCOAL,
            border: `3px solid ${WHITE}`,
            ...centerCol,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: SUNNY }} />
        </div>
      ))}
    </div>
  </div>
);

const TrainTrack = ({ width = '100%' }: { width?: string | number }) => (
  <div style={{ width, height: 18, position: 'relative' }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 4, height: 6, borderRadius: 4, background: '#94A3B8', border: `2px solid ${CHARCOAL}` }} />
    <div
      style={{
        position: 'absolute',
        left: 10,
        right: 10,
        top: 10,
        height: 8,
        backgroundImage: `repeating-linear-gradient(to right, #92400E 0 18px, transparent 18px 46px)`,
      }}
    />
  </div>
);

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Cover)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 4" accentDot={SUNNY}>
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
          <JuniorIcon name="magnifier" size={26} />
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          Detektif <Highlight color={STABILO}>Kereta Berpola!</Highlight>
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
          Menebak Urutan Warna &amp; Bentuk di Layar
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
            <JuniorIcon name="palette" size={30} />
            <span>Pola Warna &amp; Bentuk</span>
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
            <JuniorIcon name="train" size={30} />
            <span>Lengkapi Kereta</span>
          </div>
        </div>
      </div>

      {/* Right Visual Showcase: Train Station Arch Frame + Detective Biko */}
      <div style={{ ...abs(1000, 170, 820, 775), ...centerCol }}>
        {/* Arched Train Station Dome Backdrop (Distinct Silhouette) */}
        <div
          style={{
            position: 'absolute',
            width: 640,
            height: 635,
            borderRadius: '320px 320px 40px 40px',
            background: 'linear-gradient(180deg, #DBEAFE 0%, #FFFBEB 100%)',
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SUNNY}`,
            overflow: 'hidden',
          }}
        >
          {/* Decorative Station Track along bottom of Arch */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 26 }}>
            <TrainTrack width="100%" />
          </div>
        </div>

        {/* Mini Pattern Train Screen Card at Top Left */}
        <div
          style={{
            position: 'absolute',
            left: 26,
            top: 38,
            width: 440,
            padding: '14px 20px',
            borderRadius: 24,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            zIndex: 4,
            animation: live ? 'cpj4-chug 3.4s ease-in-out infinite' : undefined,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>
              <JuniorIcon name="train" size={22} />
              <span>Kereta Berpola</span>
            </span>
            <span
              style={{
                padding: '3px 12px',
                borderRadius: 99,
                background: SUNNY_SOFT,
                border: `2px solid ${CHARCOAL}`,
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              Ayo Tebak!
            </span>
          </div>
          <div style={{ ...row, gap: 10, justifyContent: 'center' }}>
            {[CORAL, SUNNY, CORAL, SUNNY].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 68,
                  height: 52,
                  borderRadius: 14,
                  background: c,
                  border: `3px solid ${CHARCOAL}`,
                  ...centerCol,
                }}
              >
                <JuniorIcon name={i % 2 === 0 ? 'star' : 'dot-blue'} size={26} />
              </div>
            ))}
            <div
              style={{
                width: 68,
                height: 52,
                borderRadius: 14,
                background: WHITE,
                border: `3px dashed ${CORAL}`,
                ...centerCol,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
                color: CORAL,
              }}
            >
              ?
            </div>
          </div>
        </div>

        {/* Detective Biko Mascot */}
        <BikoMascot
          pose="detective"
          width={420}
          style={{ position: 'relative', zIndex: 3, marginTop: 145, marginLeft: 120 }}
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

    <MacWindowCard left={X0} top={250} width={1280} height={675} headerLabel="daftar-misi-4.exe" padding={42}>
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

          {/* Magnifying glass highlighting colorful star and circle */}
          <svg width={260} height={180} viewBox="0 0 260 180" fill="none">
            <path d="M52 60 L61 78 L80 81 L66 94 L69 114 L52 104 L35 114 L38 94 L24 81 L43 78 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            <circle cx="132" cy="88" r="28" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} />
            <path d="M204 60 L213 78 L232 81 L218 94 L221 114 L204 104 L187 114 L190 94 L176 81 L195 78 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            {/* Magnifying Glass */}
            <circle cx="132" cy="86" r="46" fill="#E0F2FE" fillOpacity={0.35} stroke={CHARCOAL} strokeWidth={6} />
            <line x1="166" y1="120" x2="202" y2="156" stroke="#92400E" strokeWidth={12} strokeLinecap="round" />
          </svg>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.24,
              color: CHARCOAL,
            }}
          >
            Temukan <Highlight color="#DBEAFE">Pola Warna &amp; Bentuk</Highlight>
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

          {/* Connected Train Wagons */}
          <svg width={270} height={180} viewBox="0 0 270 180" fill="none">
            <rect x="16" y="48" width="70" height="62" rx="14" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} />
            <rect x="100" y="48" width="70" height="62" rx="14" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} />
            <rect x="184" y="48" width="70" height="62" rx="14" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} />
            <line x1="86" y1="88" x2="100" y2="88" stroke={CHARCOAL} strokeWidth={5} />
            <line x1="170" y1="88" x2="184" y2="88" stroke={CHARCOAL} strokeWidth={5} />
            {[36, 66, 120, 150, 204, 234].map((cx) => (
              <circle key={cx} cx={cx} cy="122" r="11" fill={CHARCOAL} />
            ))}
            <line x1="10" y1="136" x2="260" y2="136" stroke="#94A3B8" strokeWidth={5} strokeLinecap="round" />
          </svg>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.24,
              color: CHARCOAL,
            }}
          >
            Lengkapi <Highlight color="#D1FAE5">Gerbong Kereta</Highlight> yang Kosong
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
          ...row,
          gap: 10,
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
        <span>Siap Detektif!</span>
        <JuniorIcon name="magnifier" size={26} />
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Rahasia Detektif: Apa Itu Pola? (Spotlight Card)
// ============================================================================
const PATTERN_SEQ = [
  { shape: 'star' as const, fill: SUNNY, label: 'Bintang' },
  { shape: 'circle' as const, fill: SKY, label: 'Lingkaran' },
  { shape: 'star' as const, fill: SUNNY, label: 'Bintang' },
  { shape: 'circle' as const, fill: SKY, label: 'Lingkaran' },
];

const Slide03ApaItuPola: Page = () => {
  const [groupHighlight, setGroupHighlight] = useState(true);

  return (
    <JuniorFrame badge="RAHASIA DETEKTIF #1" accentDot={SUNNY}>
      <SlideTitle>
        Apa Itu <Highlight>Pola?</Highlight>
      </SlideTitle>

      {/* Left Spotlight Illustration */}
      <MacWindowCard left={X0} top={245} width={980} height={685} headerLabel="detektif-pola.app" padding={28}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: 'linear-gradient(180deg, #EFF6FF 0%, #FFFBEB 100%)',
            border: `3px solid ${CHARCOAL}`,
            padding: '24px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Repeating curved arrows */}
          <div style={{ ...row, justifyContent: 'space-around', padding: '0 60px' }}>
            <div style={{ ...centerCol }}>
              <span style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: TEAL }}>
                <JuniorIcon name="repeat" size={22} />
                <span>Pola 1</span>
              </span>
              <svg width={240} height={44} viewBox="0 0 240 44" fill="none">
                <path d="M24 38 Q120 -4 216 34" stroke={TEAL} strokeWidth={5} strokeDasharray="8 6" strokeLinecap="round" />
                <path d="M204 26 L218 35 L204 40" stroke={TEAL} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ ...centerCol }}>
              <span style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: CORAL }}>
                <JuniorIcon name="repeat" size={22} />
                <span>Ulang Lagi!</span>
              </span>
              <svg width={240} height={44} viewBox="0 0 240 44" fill="none">
                <path d="M24 38 Q120 -4 216 34" stroke={CORAL} strokeWidth={5} strokeDasharray="8 6" strokeLinecap="round" />
                <path d="M204 26 L218 35 L204 40" stroke={CORAL} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Star - Circle - Star - Circle Row */}
          <div style={{ ...row, justifyContent: 'center', gap: 20 }}>
            {PATTERN_SEQ.map((item, i) => {
              const pairBorder = groupHighlight ? (i < 2 ? TEAL : CORAL) : CHARCOAL;
              return (
                <div
                  key={i}
                  style={{
                    width: 175,
                    height: 175,
                    borderRadius: 26,
                    background: WHITE,
                    border: `4px solid ${pairBorder}`,
                    boxShadow: `0 7px 0 ${pairBorder}`,
                    ...centerCol,
                    gap: 8,
                  }}
                >
                  <PatternShapeSvg shape={item.shape} fill={item.fill} size={92} />
                  <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Detective Biko + Interactive Toggle */}
          <div style={{ ...row, justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <BikoMascot pose="detective" width={205} style={{ marginBottom: -12 }} />
            <button
              type="button"
              className="cpj4-card-btn"
              onClick={() => setGroupHighlight((v) => !v)}
              style={{
                ...row,
                gap: 10,
                padding: '14px 28px',
                borderRadius: 99,
                background: groupHighlight ? SUNNY : TEAL,
                color: groupHighlight ? CHARCOAL : WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              {groupHighlight ? (
                <>
                  <JuniorIcon name="magnifier" size={24} />
                  <span>Pola Terlihat Jelas!</span>
                </>
              ) : (
                <>
                  <JuniorIcon name="repeat" size={24} />
                  <span>Sorot Urutan Berulang</span>
                </>
              )}
            </button>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: Concise Cards */}
      <div style={{ ...abs(1120, 255, 700, 675), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div
          style={{
            ...row,
            gap: 20,
            padding: '28px 30px',
            borderRadius: 26,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${SKY}`,
          }}
        >
          <JuniorIcon name="repeat" size={50} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.25 }}>
            Gambar atau warna yang <Highlight color="#DBEAFE">Berulang</Highlight>
          </span>
        </div>

        <div
          style={{
            ...row,
            gap: 20,
            padding: '28px 30px',
            borderRadius: 26,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${TEAL}`,
          }}
        >
          <JuniorIcon name="magnifier" size={50} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.25 }}>
            Punya <Highlight color="#D1FAE5">Urutan Teratur!</Highlight>
          </span>
        </div>

        <div
          style={{
            ...row,
            justifyContent: 'center',
            gap: 8,
            flexWrap: 'wrap',
            padding: '24px 28px',
            borderRadius: 26,
            background: SUNNY_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.35,
            textAlign: 'center',
          }}
        >
          <JuniorIcon name="star" size={28} />
          <span>Bintang —</span>
          <JuniorIcon name="dot-blue" size={28} />
          <span>Lingkaran —</span>
          <JuniorIcon name="star" size={28} />
          <span>Bintang —</span>
          <JuniorIcon name="dot-blue" size={28} />
          <span>Lingkaran!</span>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Detektif Warna: Pola 2 Warna (Horizontal Sequence Card)
// ============================================================================
const Slide04Pola2Warna: Page = () => {
  const [guess, setGuess] = useState<'red' | 'yellow' | null>(null);

  return (
    <JuniorFrame badge="LATIHAN POLA #1" accentDot={CORAL}>
      <SlideTitle>
        Lihat <Highlight>Pola Warna</Highlight> Kereta!
      </SlideTitle>

      <MacWindowCard left={X0} top={245} width={W} height={695} headerLabel="kereta-2-warna.app" padding={36}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top 2 Concise Icon Points */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 28 }}>
            <div
              style={{
                ...row,
                gap: 18,
                padding: '18px 26px',
                borderRadius: 22,
                background: SUNNY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="train" size={32} />
              <span>Merah — Kuning — Merah — Kuning</span>
            </div>
            <div
              style={{
                ...row,
                gap: 18,
                padding: '18px 26px',
                borderRadius: 22,
                background: CORAL_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="question" size={32} />
              <span>Habis Kuning, warna apa ya?</span>
            </div>
          </div>

          {/* Train Illustration on Track */}
          <div
            style={{
              padding: '28px 28px 18px',
              borderRadius: 26,
              background: 'linear-gradient(180deg, #E0F2FE 0%, #F8FAFC 100%)',
              border: `3px solid ${CHARCOAL}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ ...row, alignItems: 'flex-end', gap: 16, width: '100%', justifyContent: 'center' }}>
              <TrainLocomotiveSvg width={215} />
              <TrainWagonCard color={CORAL} label="Merah" width={190} height={148} />
              <TrainWagonCard color={SUNNY} label="Kuning" width={190} height={148} />
              <TrainWagonCard color={CORAL} label="Merah" width={190} height={148} />
              <TrainWagonCard color={SUNNY} label="Kuning" width={190} height={148} />
              <TrainWagonCard
                color={guess === 'red' ? CORAL : guess === 'yellow' ? SUNNY : WHITE}
                label={guess === 'red' ? 'Merah!' : guess === 'yellow' ? 'Kuning?' : undefined}
                isUnknown={guess === null}
                width={190}
                height={148}
              />
            </div>
            <TrainTrack width="96%" />
          </div>

          {/* Interactive Mentor Quick Answer Buttons */}
          <div style={{ ...row, justifyContent: 'space-between', gap: 24 }}>
            <div style={{ ...row, gap: 18 }}>
              <button
                type="button"
                className="cpj4-card-btn"
                onClick={() => setGuess('red')}
                style={{
                  ...row,
                  gap: 10,
                  padding: '14px 32px',
                  borderRadius: 20,
                  background: CORAL,
                  color: WHITE,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: `0 6px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 28,
                  fontWeight: 700,
                }}
              >
                <JuniorIcon name="dot-red" size={26} />
                <span>Merah</span>
              </button>
              <button
                type="button"
                className="cpj4-card-btn"
                onClick={() => setGuess('yellow')}
                style={{
                  ...row,
                  gap: 10,
                  padding: '14px 32px',
                  borderRadius: 20,
                  background: SUNNY,
                  color: CHARCOAL,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: `0 6px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 28,
                  fontWeight: 700,
                }}
              >
                <JuniorIcon name="dot-yellow" size={26} />
                <span>Kuning</span>
              </button>
            </div>

            <div
              style={{
                flex: 1,
                ...row,
                justifyContent: 'center',
                gap: 10,
                padding: '14px 28px',
                borderRadius: 22,
                background: guess === 'red' ? TEAL_SOFT : guess === 'yellow' ? CORAL_SOFT : STABILO,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              {guess === 'red' && (
                <>
                  <JuniorIcon name="check" size={28} />
                  <span>Tepat! Habis Kuning kembali Merah!</span>
                  <JuniorIcon name="party" size={28} />
                </>
              )}
              {guess === 'yellow' && (
                <>
                  <JuniorIcon name="thinking" size={28} />
                  <span>Yuk ulangi: Merah - Kuning - Merah - Kuning...</span>
                </>
              )}
              {guess === null && (
                <>
                  <JuniorIcon name="tap" size={28} />
                  <span>Coba klik warna gerbong yang kosong!</span>
                </>
              )}
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Detektif Bentuk: Pola Bentuk Seru (Biko sebagai Masinis)
// ============================================================================
const SHAPE_WAGONS: { shape: ShapeKind; fill: string; label: string }[] = [
  { shape: 'circle', fill: SKY, label: 'Lingkaran' },
  { shape: 'triangle', fill: TEAL, label: 'Segitiga' },
  { shape: 'circle', fill: SKY, label: 'Lingkaran' },
  { shape: 'triangle', fill: TEAL, label: 'Segitiga' },
];

const Slide05PolaBentuk: Page = () => (
  <JuniorFrame badge="LATIHAN POLA #2" accentDot={TEAL}>
    <SlideTitle>
      Sekarang <Highlight>Pola Bentuk!</Highlight>
    </SlideTitle>

    <MacWindowCard left={X0} top={245} width={W} height={695} headerLabel="kereta-pola-bentuk.app" padding={34}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Top 2 Concise Points */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 28 }}>
          <div
            style={{
              ...row,
              gap: 16,
              padding: '18px 26px',
              borderRadius: 22,
              background: SKY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="shape-diamond" size={32} />
            <span>Lingkaran — Segitiga — Lingkaran — Segitiga</span>
          </div>
          <div
            style={{
              ...row,
              gap: 16,
              padding: '18px 26px',
              borderRadius: 22,
              background: TEAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="sparkle" size={32} />
            <span>Bentuknya bergantian rapi!</span>
          </div>
        </div>

        {/* Train + Conductor Biko + 4 Shape Wagons */}
        <div
          style={{
            flex: 1,
            marginTop: 24,
            padding: '24px 28px 18px',
            borderRadius: 26,
            background: 'linear-gradient(180deg, #F0FDF4 0%, #FFFBEB 100%)',
            border: `3px solid ${CHARCOAL}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div style={{ ...row, alignItems: 'flex-end', justifyContent: 'center', gap: 18 }}>
            {/* Conductor Biko standing beside Locomotive */}
            <div style={{ position: 'relative', ...row, alignItems: 'flex-end' }}>
              <BikoMascot pose="conductor" width={200} style={{ marginRight: -28, zIndex: 3 }} />
              <TrainLocomotiveSvg width={215} />
            </div>

            {/* 4 Wagons Carrying Big Geometric Shapes */}
            {SHAPE_WAGONS.map((w, idx) => (
              <div key={idx} style={{ ...centerCol, gap: 10 }}>
                <div
                  style={{
                    padding: '6px 16px',
                    borderRadius: 99,
                    background: WHITE,
                    border: `2.5px solid ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  {w.label}
                </div>
                <TrainWagonCard color={WHITE} shape={w.shape} shapeColor={w.fill} width={220} height={175} />
              </div>
            ))}
          </div>

          <TrainTrack width="100%" />
        </div>
      </div>
    </MacWindowCard>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 06 — Permainan Cepat: Ayo Tebak Gerbongnya!
// ============================================================================
const Slide06TebakGerbong: Page = () => {
  const [choice, setChoice] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" top={124}>
        Gambar Apa <Highlight>Selanjutnya?</Highlight>
      </SlideTitle>

      {/* Top Pattern Sequence Bar */}
      <div
        style={{
          ...abs(140, 212, 1640, 124),
          borderRadius: 28,
          background: WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 7px 0 ${CHARCOAL}`,
          ...row,
          justifyContent: 'center',
          gap: 24,
        }}
      >
        {[
          { shape: 'star' as const, fill: SUNNY, label: 'Bintang' },
          { shape: 'heart' as const, fill: CORAL, label: 'Hati' },
          { shape: 'star' as const, fill: SUNNY, label: 'Bintang' },
          { shape: 'heart' as const, fill: CORAL, label: 'Hati' },
        ].map((item, i) => (
          <Fragment key={i}>
            <div style={{ ...row, gap: 10, padding: '8px 18px', borderRadius: 18, background: '#F8FAFC', border: `2.5px solid ${CHARCOAL}` }}>
              <PatternShapeSvg shape={item.shape} fill={item.fill} size={52} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>{item.label}</span>
            </div>
            <JuniorIcon name="arrow-right" size={30} />
          </Fragment>
        ))}

        <div
          style={{
            minWidth: 136,
            height: 76,
            borderRadius: 20,
            background: choice === 'A' ? TEAL_SOFT : SUNNY_SOFT,
            border: `3.5px ${choice === 'A' ? 'solid' : 'dashed'} ${choice === 'A' ? TEAL : CORAL}`,
            ...centerCol,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 38,
            fontWeight: 700,
            color: CORAL,
          }}
        >
          {choice === 'A' ? <PatternShapeSvg shape="star" fill={SUNNY} size={54} /> : '[ ? ]'}
        </div>
      </div>

      {/* Two Big Interactive Choice Cards */}
      <div style={{ ...abs(180, 362, 1560, 355), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        {/* Kartu A: Bintang Kuning */}
        <button
          type="button"
          className="cpj4-card-btn"
          onClick={() => setChoice('A')}
          style={{
            borderRadius: 32,
            background: choice === 'A' ? TEAL_SOFT : WHITE,
            border: `4px solid ${choice === 'A' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${choice === 'A' ? TEAL : SUNNY}`,
            padding: '22px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              padding: '6px 22px',
              borderRadius: 99,
              background: SUNNY,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            PILIHAN A
          </div>

          <PatternShapeSvg shape="star" fill={SUNNY} size={145} />

          <div style={{ ...row, gap: 12, fontFamily: 'var(--osd-font-display)', fontSize: 40, fontWeight: 700, color: CHARCOAL }}>
            <JuniorIcon name="star" size={38} />
            <span>Bintang</span>
          </div>
        </button>

        {/* Kartu B: Hati Merah */}
        <button
          type="button"
          className="cpj4-card-btn"
          onClick={() => setChoice('B')}
          style={{
            borderRadius: 32,
            background: choice === 'B' ? CORAL_SOFT : WHITE,
            border: `4px solid ${choice === 'B' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${choice === 'B' ? CORAL : LAVENDER}`,
            padding: '22px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              padding: '6px 22px',
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

          <PatternShapeSvg shape="heart" fill={CORAL} size={145} />

          <div style={{ ...row, gap: 12, fontFamily: 'var(--osd-font-display)', fontSize: 40, fontWeight: 700, color: CHARCOAL }}>
            <JuniorIcon name="heart" size={38} />
            <span>Hati</span>
          </div>
        </button>
      </div>

      {/* Bottom Center: Biko Question + Feedback */}
      <div style={{ ...abs(240, 725, 1440, 275), ...row, justifyContent: 'center', gap: 36 }}>
        <BikoMascot pose="question" width={225} />

        <div
          style={{
            ...row,
            justifyContent: 'center',
            gap: 12,
            padding: '24px 38px',
            borderRadius: 28,
            background: choice === 'A' ? TEAL_SOFT : choice === 'B' ? CORAL_SOFT : STABILO,
            border: `3.5px solid ${choice === 'A' ? TEAL : choice === 'B' ? CORAL : CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 34,
            fontWeight: 700,
            color: CHARCOAL,
            textAlign: 'center',
            minWidth: 580,
          }}
        >
          {choice === 'A' && (
            <>
              <JuniorIcon name="check" size={34} />
              <span>BENAR SEKALI! Habis Hati pasti Bintang!</span>
              <JuniorIcon name="star" size={34} />
            </>
          )}
          {choice === 'B' && (
            <>
              <JuniorIcon name="thinking" size={34} />
              <span>Hampir! Bintang — Hati — Bintang — Hati — ...</span>
            </>
          )}
          {choice === null && (
            <>
              <JuniorIcon name="point-right" size={34} />
              <span>Tunjuk jawabanmu di layar ya!</span>
            </>
          )}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Tantangan Detektif: Pola 3 Warna!
// ============================================================================
const Slide07Pola3Warna: Page = () => {
  const [answer, setAnswer] = useState<'red' | 'yellow' | 'green' | null>(null);

  return (
    <JuniorFrame badge="TANTANGAN DETEKTIF" accentDot={SUNNY}>
      <SlideTitle>
        Wah, Sekarang <Highlight>3 Warna!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={245} width={W} height={695} headerLabel="kereta-3-warna.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top 2 Concise Pattern Clues */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <div
              style={{
                ...row,
                gap: 16,
                padding: '18px 26px',
                borderRadius: 22,
                background: SKY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="rainbow" size={32} />
              <span>Merah — Kuning — Hijau</span>
            </div>
            <div
              style={{
                ...row,
                gap: 16,
                padding: '18px 26px',
                borderRadius: 22,
                background: SUNNY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="train" size={32} />
              <span>Merah — Kuning — [ ? ]</span>
            </div>
          </div>

          {/* Long 6-Wagon Train */}
          <div
            style={{
              padding: '28px 22px 18px',
              borderRadius: 26,
              background: 'linear-gradient(180deg, #EFF6FF 0%, #F0FDF4 100%)',
              border: `3px solid ${CHARCOAL}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ ...row, alignItems: 'flex-end', gap: 12, width: '100%', justifyContent: 'center' }}>
              <TrainLocomotiveSvg width={185} />
              <TrainWagonCard color={CORAL} label="Merah" width={165} height={140} />
              <TrainWagonCard color={SUNNY} label="Kuning" width={165} height={140} />
              <TrainWagonCard color={TEAL} label="Hijau" width={165} height={140} />
              <TrainWagonCard color={CORAL} label="Merah" width={165} height={140} />
              <TrainWagonCard color={SUNNY} label="Kuning" width={165} height={140} />
              <TrainWagonCard
                color={answer === 'green' ? TEAL : answer === 'red' ? CORAL : answer === 'yellow' ? SUNNY : WHITE}
                label={answer === 'green' ? 'Hijau!' : answer === 'red' ? 'Merah?' : answer === 'yellow' ? 'Kuning?' : undefined}
                isUnknown={answer === null}
                width={165}
                height={140}
              />
            </div>
            <TrainTrack width="98%" />
          </div>

          {/* 3 Interactive Color Buttons + Feedback */}
          <div style={{ ...row, justifyContent: 'space-between', gap: 20 }}>
            <div style={{ ...row, gap: 14 }}>
              <button
                type="button"
                className="cpj4-card-btn"
                onClick={() => setAnswer('red')}
                style={{
                  ...row,
                  gap: 8,
                  padding: '12px 26px',
                  borderRadius: 20,
                  background: CORAL,
                  color: WHITE,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: `0 5px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                <JuniorIcon name="dot-red" size={24} />
                <span>Merah</span>
              </button>
              <button
                type="button"
                className="cpj4-card-btn"
                onClick={() => setAnswer('yellow')}
                style={{
                  ...row,
                  gap: 8,
                  padding: '12px 26px',
                  borderRadius: 20,
                  background: SUNNY,
                  color: CHARCOAL,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: `0 5px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                <JuniorIcon name="dot-yellow" size={24} />
                <span>Kuning</span>
              </button>
              <button
                type="button"
                className="cpj4-card-btn"
                onClick={() => setAnswer('green')}
                style={{
                  ...row,
                  gap: 8,
                  padding: '12px 26px',
                  borderRadius: 20,
                  background: TEAL,
                  color: WHITE,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: `0 5px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                <JuniorIcon name="dot-green" size={24} />
                <span>Hijau</span>
              </button>
            </div>

            <div
              style={{
                flex: 1,
                ...row,
                justifyContent: 'center',
                gap: 10,
                padding: '14px 24px',
                borderRadius: 22,
                background: answer === 'green' ? TEAL_SOFT : answer !== null ? CORAL_SOFT : STABILO,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 26,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              {answer === 'green' && (
                <>
                  <JuniorIcon name="check" size={26} />
                  <span>Hebat! Merah - Kuning - Hijau lengkap!</span>
                  <JuniorIcon name="star-glow" size={26} />
                </>
              )}
              {answer === 'red' && (
                <>
                  <JuniorIcon name="thinking" size={26} />
                  <span>Habis Kuning tadi warna apa ya? Cek kelompok pertama!</span>
                </>
              )}
              {answer === 'yellow' && (
                <>
                  <JuniorIcon name="thinking" size={26} />
                  <span>Kuning baru saja lewat! Coba cek warna ke-3!</span>
                </>
              )}
              {answer === null && (
                <>
                  <JuniorIcon name="tap" size={26} />
                  <span>Warna apa yang melengkapi gerbong ke-6?</span>
                </>
              )}
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Jurus Jitu Detektif Pola (2 Kartu Langkah Besar + Biko Thumbs Up)
// ============================================================================
const Slide08JurusDetektif: Page = () => (
  <JuniorFrame badge="TIPS DETEKTIF" accentDot={TEAL}>
    <SlideTitle>
      Cara Mudah <Highlight>Menebak Pola</Highlight>
    </SlideTitle>

    <MacWindowCard left={X0} top={250} width={1320} height={675} headerLabel="tips-detektif-pola.app" padding={40}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, height: '100%' }}>
        {/* Kartu 1: Sebutkan urutannya pelan-pelan */}
        <div
          style={{
            borderRadius: 26,
            background: SKY_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${SKY}`,
            padding: '32px 30px',
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
            JURUS #1
          </div>

          <div style={{ ...centerCol, gap: 14 }}>
            <div
              style={{
                ...row,
                gap: 10,
                padding: '12px 24px',
                borderRadius: 22,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="speak" size={28} />
              <span>&ldquo;Merah... Kuning...&rdquo;</span>
            </div>
            <div style={{ ...row, gap: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: CORAL, border: `3px solid ${CHARCOAL}` }} />
              <div style={{ width: 52, height: 52, borderRadius: 14, background: SUNNY, border: `3px solid ${CHARCOAL}` }} />
              <div style={{ width: 52, height: 52, borderRadius: 14, background: CORAL, border: `3px solid ${CHARCOAL}` }} />
              <div style={{ width: 52, height: 52, borderRadius: 14, background: SUNNY, border: `3px solid ${CHARCOAL}` }} />
            </div>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, lineHeight: 1.26 }}>
            <Highlight color="#DBEAFE">Sebutkan</Highlight> urutannya pelan-pelan
          </div>
        </div>

        {/* Kartu 2: Geser gerbong yang cocok! */}
        <div
          style={{
            borderRadius: 26,
            background: TEAL_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${TEAL}`,
            padding: '32px 30px',
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
            JURUS #2
          </div>

          {/* Drag & Drop Wagon into Dashed Slot */}
          <svg width={270} height={175} viewBox="0 0 270 175" fill="none">
            <rect x="160" y="34" width="90" height="72" rx="18" fill={WHITE} stroke={TEAL} strokeWidth={4} strokeDasharray="9 7" />
            <text x="205" y="80" textAnchor="middle" fontFamily='"Fredoka", sans-serif' fontSize="28" fontWeight="700" fill={TEAL}>
              PAS!
            </text>
            <path d="M104 70 H150" stroke={CHARCOAL} strokeWidth={4.5} strokeDasharray="7 6" strokeLinecap="round" />
            <path d="M140 60 L152 70 L140 80" stroke={CHARCOAL} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
            <rect x="16" y="34" width="84" height="68" rx="16" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} />
            <circle cx="38" cy="112" r="11" fill={CHARCOAL} />
            <circle cx="78" cy="112" r="11" fill={CHARCOAL} />
            <rect x="46" y="96" width="42" height="34" rx="14" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} />
          </svg>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, lineHeight: 1.26 }}>
            <Highlight color="#D1FAE5">Geser</Highlight> gerbong yang cocok!
          </div>
        </div>
      </div>
    </MacWindowCard>

    {/* Biko Big Thumbs Up on Right */}
    <div style={{ ...abs(1470, 360, 350, 560), ...centerCol }}>
      <BikoMascot pose="thumbs-up" width={330} />
      <div
        style={{
          marginTop: 10,
          ...row,
          gap: 10,
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
        <span>Jempol Detektif!</span>
        <JuniorIcon name="thumbs-up" size={26} />
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Lengkapi Kereta Berpola! (3 Blok ScratchJr + Game)
// ============================================================================
const MISSION_BLOCKS: { num: number; color: string; soft: string; title: string; sub: string; icon: JuniorIconName }[] = [
  { num: 1, color: SKY, soft: SKY_SOFT, title: 'Amati', sub: 'urutan warna & bentuk', icon: 'eyes' },
  { num: 2, color: SUNNY, soft: SUNNY_SOFT, title: 'Klik & Geser', sub: 'gerbong yang tepat', icon: 'mouse' },
  { num: 3, color: TEAL, soft: TEAL_SOFT, title: '"TUT-TUT!"', sub: 'Kereta siap jalan!', icon: 'train' },
];

type TrainOption = {
  id: string;
  label: string;
  color: string;
  shape?: ShapeKind;
  shapeColor?: string;
  correct: boolean;
};

const TRAIN_LEVELS: Record<
  'warna' | 'bentuk',
  {
    name: string;
    wagons: { color: string; label?: string; shape?: ShapeKind; shapeColor?: string }[];
    options: TrainOption[];
  }
> = {
  warna: {
    name: 'Pola Warna',
    wagons: [
      { color: CORAL, label: 'Merah' },
      { color: SUNNY, label: 'Kuning' },
      { color: TEAL, label: 'Hijau' },
      { color: CORAL, label: 'Merah' },
      { color: SUNNY, label: 'Kuning' },
    ],
    options: [
      { id: 'w-red', label: 'Merah', color: CORAL, correct: false },
      { id: 'w-green', label: 'Hijau', color: TEAL, correct: true },
      { id: 'w-sky', label: 'Biru', color: SKY, correct: false },
    ],
  },
  bentuk: {
    name: 'Pola Bentuk',
    wagons: [
      { color: WHITE, shape: 'circle', shapeColor: SKY },
      { color: WHITE, shape: 'triangle', shapeColor: TEAL },
      { color: WHITE, shape: 'circle', shapeColor: SKY },
      { color: WHITE, shape: 'triangle', shapeColor: TEAL },
      { color: WHITE, shape: 'circle', shapeColor: SKY },
    ],
    options: [
      { id: 's-star', label: 'Bintang', color: WHITE, shape: 'star', shapeColor: SUNNY, correct: false },
      { id: 's-circle', label: 'Lingkaran', color: WHITE, shape: 'circle', shapeColor: SKY, correct: false },
      { id: 's-tri', label: 'Segitiga', color: WHITE, shape: 'triangle', shapeColor: TEAL, correct: true },
    ],
  },
};

const Slide09MisiKereta: Page = () => {
  const live = useIsActivePage();
  const [level, setLevel] = useState<'warna' | 'bentuk'>('warna');
  const [placed, setPlaced] = useState<TrainOption | null>(null);
  const [feedback, setFeedback] = useState<{ icon?: JuniorIconName; text: string }>({
    text: 'Geser atau klik gerbong yang cocok ke kotak [ ? ]!',
  });

  const currentLevel = TRAIN_LEVELS[level];
  const isSolved = placed?.correct === true;

  const switchLevel = (next: 'warna' | 'bentuk') => {
    setLevel(next);
    setPlaced(null);
    setFeedback({ text: 'Geser atau klik gerbong yang cocok ke kotak [ ? ]!' });
  };

  const tryOption = (opt: TrainOption) => {
    if (opt.correct) {
      setPlaced(opt);
      setFeedback({ icon: 'train', text: 'TUT-TUT! Kereta berpola siap jalan!' });
    } else {
      setFeedback({ icon: 'thinking', text: `"${opt.label}" belum pas! Coba amati urutannya lagi!` });
    }
  };

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, optId: string) => {
    e.dataTransfer.setData('text/plain', optId);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const opt = currentLevel.options.find((o) => o.id === id);
    if (opt) tryOption(opt);
  };

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={SUNNY}>
      <SlideTitle>
        Misi <Highlight>Kereta Berpola!</Highlight>
      </SlideTitle>

      {/* Top Row: 3 ScratchJr-Style Step Blocks */}
      <div style={{ ...abs(X0, 224, W, 178), ...row, justifyContent: 'space-between', gap: 18 }}>
        {MISSION_BLOCKS.map((blk, i) => (
          <Fragment key={blk.num}>
            <div
              style={{
                flex: 1,
                height: 164,
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
                  width: 60,
                  height: 60,
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
                <div style={{ ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1.15 }}>
                  <JuniorIcon name={blk.icon} size={32} />
                  <span>{blk.title}</span>
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

      {/* Bottom Interactive Train Pattern Game */}
      <MacWindowCard left={X0} top={424} width={1320} height={546} headerLabel="game-kereta-berpola.app" padding={22}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: 'linear-gradient(180deg, #E0F2FE 0%, #FFFBEB 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Level Tabs & Reset */}
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 12 }}>
              <button
                type="button"
                className="cpj4-card-btn"
                onClick={() => switchLevel('warna')}
                style={{
                  ...row,
                  gap: 8,
                  padding: '8px 20px',
                  borderRadius: 99,
                  background: level === 'warna' ? CORAL : WHITE,
                  color: level === 'warna' ? WHITE : CHARCOAL,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                <JuniorIcon name="palette" size={24} />
                <span>Pola Warna</span>
              </button>
              <button
                type="button"
                className="cpj4-card-btn"
                onClick={() => switchLevel('bentuk')}
                style={{
                  ...row,
                  gap: 8,
                  padding: '8px 20px',
                  borderRadius: 99,
                  background: level === 'bentuk' ? TEAL : WHITE,
                  color: level === 'bentuk' ? WHITE : CHARCOAL,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                <JuniorIcon name="shape-diamond" size={24} />
                <span>Pola Bentuk</span>
              </button>
            </div>

            <button
              type="button"
              className="cpj4-card-btn"
              onClick={() => switchLevel(level)}
              style={{
                ...row,
                gap: 8,
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
              <JuniorIcon name="reset" size={22} />
              <span>Ulang</span>
            </button>
          </div>

          {/* Train + Drop Slot */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: isSolved && live ? 'cpj4-chug 1.4s ease-in-out infinite' : undefined,
            }}
          >
            <div style={{ ...row, alignItems: 'flex-end', gap: 10 }}>
              <TrainLocomotiveSvg width={155} />
              {currentLevel.wagons.map((w, i) => (
                <TrainWagonCard
                  key={i}
                  color={w.color}
                  label={w.label}
                  shape={w.shape}
                  shapeColor={w.shapeColor}
                  width={150}
                  height={128}
                />
              ))}
              <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                <TrainWagonCard
                  color={placed ? placed.color : WHITE}
                  label={placed?.label}
                  shape={placed?.shape}
                  shapeColor={placed?.shapeColor}
                  isUnknown={!placed}
                  width={150}
                  height={128}
                />
              </div>
            </div>
            <TrainTrack width="98%" />
          </div>

          {/* Draggable / Clickable Wagon Choices + Feedback */}
          <div style={{ ...row, justifyContent: 'space-between', gap: 16 }}>
            <div style={{ ...row, gap: 14 }}>
              {currentLevel.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  draggable
                  className="cpj4-card-btn"
                  onDragStart={(e) => handleDragStart(e, opt.id)}
                  onClick={() => tryOption(opt)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: 20,
                    background: opt.color,
                    color: opt.color === WHITE || opt.color === SUNNY ? CHARCOAL : WHITE,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 5px 0 ${CHARCOAL}`,
                    ...row,
                    gap: 10,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                >
                  {opt.shape && <PatternShapeSvg shape={opt.shape} fill={opt.shapeColor ?? SUNNY} size={36} />}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            <div
              style={{
                ...row,
                gap: 8,
                padding: '10px 20px',
                borderRadius: 99,
                background: isSolved ? TEAL_SOFT : STABILO,
                border: `2.5px solid ${CHARCOAL}`,
                fontSize: 20,
                fontWeight: 800,
                color: CHARCOAL,
              }}
            >
              {feedback.icon && <JuniorIcon name={feedback.icon} size={22} />}
              <span>{feedback.text}</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Waving Biko on Right */}
      <div style={{ ...abs(1455, 450, 365, 500), ...centerCol }}>
        <BikoMascot pose={isSolved ? 'jump' : 'wave'} width={310} />
        <div
          style={{
            marginTop: 8,
            ...row,
            gap: 8,
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
          {isSolved ? (
            <>
              <span>TUT-TUT!</span>
              <JuniorIcon name="train" size={24} />
              <JuniorIcon name="party" size={24} />
            </>
          ) : (
            <>
              <span>Ayo Lengkapi!</span>
              <JuniorIcon name="magnifier" size={24} />
            </>
          )}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 4
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
            animation: live ? `cpj4-confetti ${2.4 + (idx % 3) * 0.4}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={130} size={62}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
          <span>
            Hebat! Kamu <Highlight color={STABILO}>Detektif Ulung!</Highlight>
          </span>
          <JuniorIcon name="party" size={58} />
        </span>
      </SlideTitle>

      {/* Center Celebration Medal Card */}
      <MacWindowCard left={170} top={250} width={1160} height={680} headerLabel="lencana-juara-4.award" padding={42}>
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-between', textAlign: 'center' }}>
          {/* Gold Medal SVG with Mini Train & Geometric Star */}
          <svg width={270} height={260} viewBox="0 0 260 250" fill="none">
            {/* Ribbons */}
            <path d="M90 156 L66 238 L104 218 L122 240 L122 156 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            <path d="M170 156 L194 238 L156 218 L138 240 L138 156 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            {/* Gold Medal */}
            <circle cx="130" cy="98" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
            <circle cx="130" cy="98" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={3.5} />
            {/* Mini Train Inside Medal */}
            <rect x="82" y="84" width="34" height="36" rx="8" fill={SKY} stroke={CHARCOAL} strokeWidth={3} />
            <rect x="112" y="94" width="44" height="26" rx="8" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
            <rect x="140" y="78" width="12" height="16" rx="4" fill={CHARCOAL} />
            <circle cx="98" cy="126" r="8" fill={CHARCOAL} />
            <circle cx="124" cy="126" r="8" fill={CHARCOAL} />
            <circle cx="146" cy="126" r="8" fill={CHARCOAL} />
            {/* Geometric Star Above Train */}
            <path
              d="M164 56 L168 65 L178 66 L171 73 L173 83 L164 78 L155 83 L157 73 L150 66 L160 65 Z"
              fill={CORAL}
              stroke={CHARCOAL}
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
          </svg>

          <div
            style={{
              ...row,
              gap: 14,
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
            <JuniorIcon name="medal" size={36} />
            <span>Lencana Detektif Kereta Berpola</span>
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
            Kamu sudah jago menebak <Highlight>Pola Warna &amp; Bentuk!</Highlight>
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
  `Halo Code Explorer cilik! Hari ini Biko berubah jadi Detektif Kereta Berpola!
Kita akan memakai kaca pembesar untuk menebak urutan warna dan bentuk di layar.`,

  `Ada dua misi kita hari ini:
1. Menemukan pola warna dan pola bentuk.
2. Melengkapi gerbong kereta yang masih kosong!`,

  `Apa itu POLA? Pola adalah gambar atau warna yang berulang dengan urutan teratur!
Lihat barisan ini: Bintang — Lingkaran — Bintang — Lingkaran!`,

  `Latihan Pola #1: Lihat pola warna kereta!
Merah — Kuning — Merah — Kuning... Habis Kuning, warna apa ya? Klik tombol warna untuk mengecek jawaban anak-anak!`,

  `Latihan Pola #2: Sekarang Biko jadi Masinis Kereta Pola Bentuk!
Lihat gerbongnya bergantian rapi: Lingkaran — Segitiga — Lingkaran — Segitiga!`,

  `Permainan Cepat! Ayo tebak gambar apa selanjutnya:
Bintang ➡️ Hati ➡️ Bintang ➡️ Hati ➡️ [ ? ]. Pilihan A (Bintang) atau Pilihan B (Hati)?`,

  `Tantangan Detektif! Sekarang ada 3 warna berulang:
Merah — Kuning — Hijau — Merah — Kuning — [ ? ]. Warna apa yang hilang di gerbong ke-6?`,

  `Jurus Jitu Detektif Pola:
1. Sebutkan urutannya pelan-pelan ("Merah... Kuning...").
2. Geser gerbong yang cocok dengan Drag & Drop!`,

  `Waktunya praktik Game Kereta Berpola!
1. Amati urutan warna & bentuk. 2. Klik & Geser gerbong yang tepat. 3. TUT-TUT! Kereta siap jalan!`,

  `Hebat sekali! Kalian semua resmi menjadi Detektif Ulung dan meraih Lencana Detektif Kereta Berpola!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 4 — Detektif Kereta Berpola',
  createdAt: '2026-11-13T09:50:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03ApaItuPola,
  Slide04Pola2Warna,
  Slide05PolaBentuk,
  Slide06TebakGerbong,
  Slide07Pola3Warna,
  Slide08JurusDetektif,
  Slide09MisiKereta,
  Slide10Lencana,
] satisfies Page[];

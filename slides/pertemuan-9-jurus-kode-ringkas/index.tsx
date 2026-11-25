import { Fragment, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

import imgLogoCdpl from '../../Gambar/logo cdpl.png';
import imgSlide21 from '../../Gambar/slide 2.1.png';
import imgSlide22 from '../../Gambar/slide 2.2.png';
import imgSlide3 from '../../Gambar/slide 3.png';
import imgSlide4 from '../../Gambar/slide 4.png';
import imgSlide51 from '../../Gambar/slide 5.1.png';
import imgSlide52 from '../../Gambar/slide 5.2.png';
import imgSlide61 from '../../Gambar/slide 6.1.png';
import imgSlide62 from '../../Gambar/slide 6.2.png';

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
  50% { transform: translateY(-8px); }
}
@keyframes cpj9-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-10px) scale(1.04); }
}
@keyframes cpj9-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(8px) rotate(14deg); }
}
@keyframes cpj9-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-2deg); }
  75% { transform: translateX(7px) rotate(2deg); }
}
.cpj9-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj9-card-btn:hover {
  transform: translateY(-3px);
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
    hero: 84,
    body: 26,
  },
  radius: 24,
};

const CREAM = '#FFFBF0';
const SAND_GRID = '#F4ECDC';
const WHITE = '#FFFFFF';
const CHARCOAL = '#1E1E2C';
const MUTED = '#525266';
const BORDER_SOFT = '#CBD5E1';
const CARD_SHADOW = '0 6px 18px rgba(30, 30, 44, 0.08)';
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
const SPACE_DARK = '#1E293B';

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
// Shared Chrome, Typography, Highlights, Bullet Lists & Image Containers
// ============================================================================
const JuniorFrame = ({
  badge,
  accentDot = SUNNY,
  showLogo = false,
  children,
}: {
  badge: string;
  accentDot?: string;
  showLogo?: boolean;
  children: ReactNode;
}) => {
  const { current, total } = useSlidePageNumber();

  return (
    <div
      data-osd-interactive="true"
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
      {/* Top Left Logo (Slide 1 Cover only) + Header Eyebrow Tag */}
      <div
        style={{
          ...abs(X0, showLogo ? 42 : 48),
          ...row,
          gap: 18,
          zIndex: 5,
        }}
      >
        {showLogo && (
          <img
            src={imgLogoCdpl}
            alt="Logo CODEPOLITAN"
            style={{
              display: 'block',
              height: 48,
              width: 'auto',
              objectFit: 'contain',
              flexShrink: 0,
            }}
          />
        )}
        <div
          style={{
            ...row,
            gap: 10,
            padding: '8px 20px',
            borderRadius: 12,
            background: WHITE,
            border: `2px solid ${CHARCOAL}`,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 99,
              background: accentDot,
              border: `2px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>{badge}</span>
        </div>
      </div>

      {/* Top Right Slide Number Indicator */}
      <div
        style={{
          ...abs(1690, 48),
          ...row,
          gap: 8,
          padding: '8px 18px',
          borderRadius: 12,
          background: WHITE,
          border: `2px solid ${CHARCOAL}`,
          fontSize: 19,
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

      {/* Bottom Program Strip */}
      <div
        style={{
          ...abs(X0, 1022, W, 32),
          ...row,
          justifyContent: 'space-between',
          fontSize: 18,
          fontWeight: 700,
          color: '#6E6A7C',
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
      padding: '2px 16px 5px',
      borderRadius: 14,
      boxDecorationBreak: 'clone',
      WebkitBoxDecorationBreak: 'clone',
      display: 'inline-block',
    }}
  >
    {children}
  </span>
);

const InlineHighlight = ({
  children,
  color = STABILO,
}: {
  children: ReactNode;
  color?: string;
}) => (
  <mark
    style={{
      background: color,
      color: CHARCOAL,
      fontWeight: 800,
      padding: '1px 9px 2px',
      borderRadius: 8,
    }}
  >
    {children}
  </mark>
);

const SlideTitle = ({
  children,
  top = 114,
  size = 54,
  maxWidth = 1560,
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
      lineHeight: 1.14,
      letterSpacing: '-0.015em',
      color: CHARCOAL,
      textAlign: align,
    }}
  >
    {children}
  </h2>
);

const SectionHeading = ({
  children,
  icon,
  accentColor = CHARCOAL,
  size = 30,
}: {
  children: ReactNode;
  icon?: JuniorIconName;
  accentColor?: string;
  size?: number;
}) => (
  <h3
    style={{
      margin: 0,
      ...row,
      gap: 10,
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 700,
      lineHeight: 1.2,
      color: accentColor,
    }}
  >
    {icon && <JuniorIcon name={icon} size={Math.round(size * 0.95)} />}
    <span>{children}</span>
  </h3>
);

const BulletList = ({
  items,
  bulletColor = TEAL,
  fontSize = 24,
  gap = 12,
}: {
  items: ReactNode[];
  bulletColor?: string;
  fontSize?: number;
  gap?: number;
}) => (
  <ul
    style={{
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap,
    }}
  >
    {items.map((item, idx) => (
      <li
        key={idx}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          fontSize,
          fontWeight: 700,
          lineHeight: 1.38,
          color: CHARCOAL,
          textAlign: 'left',
        }}
      >
        <span
          aria-hidden
          style={{
            width: 11,
            height: 11,
            marginTop: Math.round(fontSize * 0.42),
            borderRadius: 99,
            background: bulletColor,
            border: `2px solid ${CHARCOAL}`,
            flexShrink: 0,
          }}
        />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

/** Crisp flat-framed container for real ScratchJr screenshots (never looks like a button) */
const ScratchImageFrame = ({
  src,
  alt,
  caption,
  bg = WHITE,
  borderColor = BORDER_SOFT,
  padding = 14,
  imgStyle,
  style,
}: {
  src: string;
  alt: string;
  caption?: string;
  bg?: string;
  borderColor?: string;
  padding?: number;
  imgStyle?: CSSProperties;
  style?: CSSProperties;
}) => (
  <figure
    style={{
      margin: 0,
      background: bg,
      borderRadius: 18,
      border: `2.5px solid ${borderColor}`,
      padding,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        borderRadius: 10,
        ...imgStyle,
      }}
    />
    {caption && (
      <figcaption
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: MUTED,
          textAlign: 'center',
        }}
      >
        {caption}
      </figcaption>
    )}
  </figure>
);

/** Flat content panel (replaces button-like 3D cards for non-interactive boxes) */
const InfoPanel = ({
  children,
  bg = WHITE,
  borderColor = CHARCOAL,
  padding = 28,
  style,
}: {
  children: ReactNode;
  bg?: string;
  borderColor?: string;
  padding?: number;
  style?: CSSProperties;
}) => (
  <div
    style={{
      background: bg,
      borderRadius: 24,
      border: `3px solid ${borderColor}`,
      boxShadow: CARD_SHADOW,
      padding,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

const MacWindowCard = ({
  left,
  top,
  width,
  height,
  titleBarColor = WHITE,
  headerLabel,
  children,
  padding = 32,
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
      borderRadius: 26,
      border: `3px solid ${CHARCOAL}`,
      boxShadow: CARD_SHADOW,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        height: 48,
        background: titleBarColor,
        borderBottom: `2.5px solid ${CHARCOAL}`,
        padding: '0 22px',
        ...row,
        justifyContent: 'space-between',
        flexShrink: 0,
      }}
    >
      <div style={{ ...row, gap: 9 }}>
        <span style={{ width: 14, height: 14, borderRadius: 99, background: CORAL, border: `2px solid ${CHARCOAL}` }} />
        <span style={{ width: 14, height: 14, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}` }} />
        <span style={{ width: 14, height: 14, borderRadius: 99, background: TEAL, border: `2px solid ${CHARCOAL}` }} />
      </div>
      {headerLabel && (
        <span style={{ fontSize: 16, fontWeight: 800, color: MUTED, letterSpacing: '0.03em' }}>
          {headerLabel}
        </span>
      )}
      <div style={{ width: 56 }} />
    </div>
    <div style={{ flex: 1, padding, position: 'relative', overflow: 'hidden' }}>{children}</div>
  </div>
);

// ============================================================================
// Pertemuan 9 Visual Assets: Arrow Block, Repeat Block, Space & Maze Tokens
// ============================================================================
type Dir = 'up' | 'down' | 'left' | 'right';

const DIR_ORDER: Dir[] = ['right', 'left', 'up', 'down'];

const DIR_META: Record<Dir, { label: string; rot: number }> = {
  right: { label: 'Kanan', rot: 0 },
  left: { label: 'Kiri', rot: 180 },
  up: { label: 'Atas', rot: -90 },
  down: { label: 'Bawah', rot: 90 },
};

/** ScratchJr-authentic Blue Motion Block ("Kanan", "Kiri", "Atas", "Bawah" with white dashed arrow + pill "1") */
const LoopArrowBlock = ({
  dir,
  size = 76,
  stepNum = 1,
  active = false,
  inRepeat = false,
  labelText,
  onClick,
}: {
  dir: Dir;
  size?: number;
  stepNum?: number | null;
  active?: boolean;
  inRepeat?: boolean;
  labelText?: string;
  onClick?: () => void;
}) => {
  const m = DIR_META[dir];
  const w = Math.round(size * 1.12);
  const h = size;
  const rawUid = useId();
  const uid = rawUid.replace(/:/g, '');

  const svgGraphic = (
    <svg
      width={w}
      height={h}
      viewBox="0 0 104 92"
      fill="none"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`sjr-blue-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5CD3FF" />
          <stop offset="100%" stopColor="#18A4F8" />
        </linearGradient>
      </defs>

      {active && (
        <rect
          x={4}
          y={2}
          width={92}
          height={86}
          rx={18}
          fill="none"
          stroke={SUNNY}
          strokeWidth={5}
        />
      )}

      {/* Puzzle Body matching ScratchJr Motion Block */}
      <path
        d="M 18 8 H 76 Q 84 8 84 16 V 24 C 98 20 98 52 84 48 V 56 Q 84 64 76 64 H 18 Q 10 64 10 56 V 48 C 23 52 23 20 10 24 V 16 Q 10 8 18 8 Z"
        fill={`url(#sjr-blue-${uid})`}
        stroke="#0369A1"
        strokeWidth={3.2}
        strokeLinejoin="round"
      />

      {/* Top Subtle Specular Highlight */}
      <path d="M 20 12.5 H 74" stroke="rgba(255,255,255,0.55)" strokeWidth={2.5} strokeLinecap="round" />

      {/* Dashed-tail White Direction Arrow (Rotated for Kanan/Kiri/Atas/Bawah) */}
      <g transform={`rotate(${m.rot} 49 36)`}>
        <rect x="24" y="29" width="5.5" height="14" rx="2.75" fill={WHITE} />
        <rect x="33" y="28" width="6.5" height="16" rx="3" fill={WHITE} />
        <path
          d="M 43 30 H 56 V 22 L 73 36 L 56 50 V 42 H 43 Z"
          fill={WHITE}
          stroke="#0369A1"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
      </g>

      {/* Bottom White Number Pill ("1" like ScratchJr) */}
      {stepNum !== null && (
        <g>
          <rect
            x="29"
            y="57"
            width="40"
            height="24"
            rx="12"
            fill={WHITE}
            stroke="#94A3B8"
            strokeWidth={2.5}
          />
          <text
            x="49"
            y="74"
            textAnchor="middle"
            fill="#475569"
            fontSize="15"
            fontWeight="800"
            fontFamily="var(--osd-font-body), sans-serif"
          >
            {stepNum}
          </text>
        </g>
      )}
    </svg>
  );

  const wrapperStyle: CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    padding: 0,
    border: 'none',
    background: 'transparent',
    flexShrink: 0,
  };

  const labelEl = labelText ? (
    <span
      style={{
        fontSize: 13,
        fontWeight: 800,
        color: active ? '#0369A1' : MUTED,
        lineHeight: 1.1,
      }}
    >
      {labelText}
    </span>
  ) : null;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="cpj9-card-btn"
        style={{ ...wrapperStyle, cursor: 'pointer' }}
        aria-label={`Pilih blok ${m.label}`}
      >
        {svgGraphic}
        {labelEl}
      </button>
    );
  }

  return (
    <div style={wrapperStyle} aria-label={`Blok ScratchJr ${m.label}`}>
      {svgGraphic}
      {labelEl}
    </div>
  );
};

/** ScratchJr-authentic Orange Horizontal Repeat C-Bracket ("Ulangi") wrapping a ScratchJr Motion Block */
const RepeatHugBlock = ({
  count,
  dir = 'right',
  scale = 1,
  detached = false,
  wrongNumber = false,
  onCountClick,
}: {
  count: number;
  dir?: Dir;
  scale?: number;
  detached?: boolean;
  wrongNumber?: boolean;
  onCountClick?: () => void;
}) => {
  const m = DIR_META[dir];
  const w = Math.round(238 * scale);
  const h = Math.round(118 * scale);
  const rawUid = useId();
  const uid = rawUid.replace(/:/g, '');

  return (
    <div
      style={{
        position: 'relative',
        width: w,
        height: h,
        flexShrink: 0,
      }}
      aria-label={`Blok ScratchJr Ulangi ${count} kali arah ${m.label}`}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 238 118"
        fill="none"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`sjr-orange-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={wrongNumber ? '#FDA4AF' : '#FFD43B'} />
            <stop offset="100%" stopColor={wrongNumber ? '#F43F5E' : '#F59E0B'} />
          </linearGradient>
          <linearGradient id={`sjr-inner-blue-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5CD3FF" />
            <stop offset="100%" stopColor="#18A4F8" />
          </linearGradient>
        </defs>

        {/* Outer Orange C-Bracket Frame wrapping inner motion block */}
        <path
          d="M 22 10 H 204 Q 214 10 214 20 V 35 C 230 31 230 63 214 59 V 72 Q 214 82 204 82 H 146 Q 138 82 138 72 V 63 C 152 67 152 35 138 39 V 30 Q 138 22 130 22 H 58 Q 50 22 50 30 V 39 C 62 35 62 67 50 63 V 72 Q 50 82 42 82 H 22 Q 12 82 12 72 V 59 C 26 63 26 31 12 35 V 20 Q 12 10 22 10 Z"
          fill={`url(#sjr-orange-${uid})`}
          stroke={wrongNumber ? '#9F1239' : '#B45309'}
          strokeWidth={3.2}
          strokeLinejoin="round"
        />

        {/* Top Gloss */}
        <path d="M 24 14.5 H 202" stroke="rgba(255,255,255,0.5)" strokeWidth={2.5} strokeLinecap="round" />

        {/* Inner Motion Block OR Empty Dashed Cavity */}
        {detached ? (
          <g>
            <rect
              x="54"
              y="26"
              width="82"
              height="52"
              rx="10"
              fill="rgba(255,255,255,0.8)"
              stroke="#B91C1C"
              strokeWidth={2.4}
              strokeDasharray="6 4"
            />
            <text
              x="95"
              y="57"
              textAnchor="middle"
              fill="#B91C1C"
              fontSize="15"
              fontWeight="800"
              fontFamily="var(--osd-font-display), sans-serif"
            >
              Kosong!
            </text>
          </g>
        ) : (
          <g>
            <path
              d="M 56 23 H 132 Q 140 23 140 31 V 39 C 154 35 154 67 140 63 V 71 Q 140 79 132 79 H 56 Q 48 79 48 71 V 63 C 62 67 62 35 48 39 V 31 Q 48 23 56 23 Z"
              fill={`url(#sjr-inner-blue-${uid})`}
              stroke="#0369A1"
              strokeWidth={3}
              strokeLinejoin="round"
            />
            <path d="M 58 27.5 H 130" stroke="rgba(255,255,255,0.5)" strokeWidth={2.2} strokeLinecap="round" />
            <g transform={`rotate(${m.rot} 97 51)`}>
              <rect x="72" y="44" width="5.5" height="14" rx="2.75" fill={WHITE} />
              <rect x="81" y="43" width="6.5" height="16" rx="3" fill={WHITE} />
              <path
                d="M 91 45 H 104 V 37 L 121 51 L 104 65 V 57 H 91 Z"
                fill={WHITE}
                stroke="#0369A1"
                strokeWidth={1.6}
                strokeLinejoin="round"
              />
            </g>
            <rect x="74" y="72" width="44" height="24" rx="12" fill={WHITE} stroke="#94A3B8" strokeWidth={2.5} />
            <text
              x="96"
              y="89"
              textAnchor="middle"
              fill="#475569"
              fontSize="15"
              fontWeight="800"
              fontFamily="var(--osd-font-body), sans-serif"
            >
              1
            </text>
          </g>
        )}

        {/* White Curved Repeat Arrow on Right Side */}
        <path
          d="M 176 62 C 194 62 197 34 176 34 H 171 V 26 L 156 38.5 L 171 51 V 43 H 176 C 186 43 185 53 176 53 H 168"
          fill={WHITE}
          stroke={wrongNumber ? '#9F1239' : '#B45309'}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      {/* Bottom-Right Repeat Number Pill (button ONLY if onCountClick is passed) */}
      {onCountClick ? (
        <button
          type="button"
          onClick={onCountClick}
          className="cpj9-card-btn"
          style={{
            position: 'absolute',
            left: Math.round(154 * scale),
            top: Math.round(70 * scale),
            width: Math.round(48 * scale),
            height: Math.round(28 * scale),
            borderRadius: 99,
            background: '#0EA5E9',
            border: `2.5px solid ${WHITE}`,
            boxShadow: `0 3px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(17 * scale),
            fontWeight: 700,
            color: WHITE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            cursor: 'pointer',
          }}
          aria-label={`Ubah angka ulangi (${count})`}
        >
          {count}
        </button>
      ) : (
        <div
          style={{
            position: 'absolute',
            left: Math.round(154 * scale),
            top: Math.round(70 * scale),
            width: Math.round(48 * scale),
            height: Math.round(28 * scale),
            borderRadius: 99,
            background: WHITE,
            border: `2.5px solid ${wrongNumber ? '#B91C1C' : '#94A3B8'}`,
            fontFamily: 'var(--osd-font-body)',
            fontSize: Math.round(16 * scale),
            fontWeight: 800,
            color: wrongNumber ? '#B91C1C' : '#475569',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          {count}
        </div>
      )}
    </div>
  );
};

/** Cute Tic / Biko token for grid tiles */
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
    <path
      d="M14 60 L18 34 L34 20 L56 24 L67 44 L64 60 Z"
      fill="#94A3B8"
      stroke={CHARCOAL}
      strokeWidth={3.6}
      strokeLinejoin="round"
    />
    <path d="M20 56 L24 38 L36 27 L48 29 L40 44 L36 56 Z" fill="#CBD5E1" />
  </svg>
);

const MagicWandSvg = ({ size = 58 }: { size?: number }) => (
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
// SLIDE 01 — Cover (Heading H1 + Concise Bullet Intro + Real ScratchJr Visuals)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="JUNIOR • PERTEMUAN 9" accentDot={SUNNY} showLogo>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 170, 820, 770), display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            alignSelf: 'flex-start',
            padding: '8px 18px',
            borderRadius: 12,
            background: SUNNY_SOFT,
            border: `2px solid ${CHARCOAL}`,
            fontSize: 20,
            fontWeight: 800,
            color: '#92400E',
          }}
        >
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
          Jurus <Highlight>Kode Ringkas!</Highlight>
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.35,
            color: MUTED,
          }}
        >
          Mengenal Blok Ulangi (<em>Repeat</em>) di ScratchJr
        </p>

        {/* Clean non-button Info Panel with Bullet Points */}
        <InfoPanel bg={WHITE} padding={26} style={{ marginTop: 6 }}>
          <SectionHeading icon="repeat" size={26} accentColor={CHARCOAL}>
            Yang Akan Kita Pelajari:
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={SUNNY}
              fontSize={24}
              gap={12}
              items={[
                <>
                  Pakai <InlineHighlight>Blok Ulangi</InlineHighlight> berbentuk pelukan oranye.
                </>,
                <>
                  Ubah kode panjang jadi <InlineHighlight color="#D1FAE5">1 blok ringkas</InlineHighlight>.
                </>,
                <>
                  Atur jumlah langkah lewat <InlineHighlight color={SKY_SOFT}>keypad angka</InlineHighlight>.
                </>,
              ]}
            />
          </div>
        </InfoPanel>
      </div>

      {/* Right Visual Showcase: Real ScratchJr Screenshots + Biko */}
      <div style={{ ...abs(955, 130, 865, 830), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            inset: '20px 10px',
            borderRadius: '180px 48px 180px 48px',
            background: 'linear-gradient(155deg, #FEF9C3 0%, #FFF7ED 55%, #EFF6FF 100%)',
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `12px 12px 0 ${LAVENDER}`,
          }}
        />

        {/* Real ScratchJr Screenshot: Repeat 4 + Numeric Keypad */}
        <ScratchImageFrame
          src={imgSlide4}
          alt="Blok Repeat 4 dengan keypad angka di ScratchJr"
          caption="Contoh Blok Ulangi & Keypad Angka di ScratchJr"
          bg={WHITE}
          borderColor={CHARCOAL}
          padding={14}
          imgStyle={{ maxHeight: 175 }}
          style={{
            position: 'relative',
            zIndex: 4,
            width: 740,
            marginBottom: 18,
          }}
        />

        {/* Bottom Visual Row: Repeat 3 card + Biko */}
        <div style={{ position: 'relative', zIndex: 4, ...row, gap: 28, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <ScratchImageFrame
              src={imgSlide21}
              alt="Blok Repeat 3 memeluk blok panah kanan"
              caption="Ulangi Gerak Kanan 3×"
              bg={WHITE}
              borderColor={CHARCOAL}
              padding={14}
              imgStyle={{ width: 290, height: 150 }}
              style={{
                animation: live ? 'cpj9-float 3.2s ease-in-out infinite' : undefined,
              }}
            />
          </div>

          <BikoMascot pose="wave" width={310} />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (Uses slide 2.1.png & slide 2.2.png clearly!)
// ============================================================================
const Slide02Misi: Page = () => (
  <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
    <SlideTitle>
      Apa <Highlight>Misi Kita</Highlight> Hari Ini?
    </SlideTitle>

    <MacWindowCard left={X0} top={215} width={1320} height={745} headerLabel="misi-pertemuan-9" padding={34}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, height: '100%' }}>
        {/* Kartu 1 */}
        <InfoPanel
          bg={SKY_SOFT}
          borderColor={CHARCOAL}
          padding={26}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em' }}>
              MISI 1
            </span>
            <SectionHeading icon="repeat" size={32}>
              Kenali <Highlight color={STABILO}>Blok Ulangi</Highlight>
            </SectionHeading>
          </div>

          <ScratchImageFrame
            src={imgSlide21}
            alt="Blok Repeat 3 di ScratchJr"
            caption="Blok Oranye memeluk panah Kanan"
            borderColor={SKY}
            padding={16}
            imgStyle={{ width: 390, height: 195 }}
            style={{ width: '100%' }}
          />

          <BulletList
            bulletColor={SKY}
            fontSize={23}
            gap={10}
            items={[
              <>
                Bentuknya seperti <InlineHighlight>pelukan</InlineHighlight> warna oranye.
              </>,
              <>
                Angka menentukan <InlineHighlight color={WHITE}>berapa kali</InlineHighlight> diulang.
              </>,
            ]}
          />
        </InfoPanel>

        {/* Kartu 2: Kode Panjang (2.2) -> Kode Ringkas (2.1) */}
        <InfoPanel
          bg={TEAL_SOFT}
          borderColor={CHARCOAL}
          padding={26}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#047857', letterSpacing: '0.05em' }}>
              MISI 2
            </span>
            <SectionHeading icon="lightning" size={32}>
              Ubah Kode Jadi <Highlight color="#A7F3D0">Ringkas!</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 18,
              border: `2.5px solid ${TEAL}`,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <img
              src={imgSlide22}
              alt="3 blok panah kanan berderet"
              style={{ width: '100%', maxWidth: 370, height: 96, objectFit: 'contain' }}
            />
            <div style={{ ...row, gap: 8, fontSize: 18, fontWeight: 800, color: '#047857' }}>
              <JuniorIcon name="arrow-down" size={20} />
              <span>Diringkas jadi 1 blok:</span>
            </div>
            <img
              src={imgSlide21}
              alt="1 blok Repeat 3"
              style={{ width: '100%', maxWidth: 320, height: 102, objectFit: 'contain' }}
            />
          </div>

          <BulletList
            bulletColor={TEAL}
            fontSize={23}
            gap={10}
            items={[
              <>
                3 panah lurus jadi <InlineHighlight>1 Blok Ulangi</InlineHighlight>.
              </>,
              <>
                Hasil gerak karakter tetap <InlineHighlight color="#D1FAE5">sama persis</InlineHighlight>!
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="point-left"
      width={360}
      speechBubble="Ayo ringkas kodenya!"
      style={{ ...abs(1455, 315) }}
    />
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Tantangan Coder: Wah, Kodenya Kepanjangan! (Uses slide 3.png!)
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
      }, 340);
    };
    tick(1);
  };

  return (
    <JuniorFrame badge="TANTANGAN CODER" accentDot={CORAL}>
      <SlideTitle>
        Wah, Kodenya <Highlight>Kepanjangan!</Highlight>
      </SlideTitle>

      {/* Left Spotlight: Full Crisp ScratchJr Space Screenshot (slide 3.png) */}
      <MacWindowCard left={X0} top={215} width={1040} height={515} headerLabel="contoh-scratchjr-5-langkah" padding={20}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
          <ScratchImageFrame
            src={imgSlide3}
            alt="Tampilan ScratchJr tema luar angkasa dengan 5 blok panah kanan"
            bg={SPACE_DARK}
            borderColor={CHARCOAL}
            padding={10}
            imgStyle={{ width: '100%', height: 390, objectFit: 'contain' }}
            style={{ width: '100%', flex: 1 }}
          />
          <div style={{ ...row, justifyContent: 'space-between', padding: '0 6px' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: CHARCOAL }}>
              Tampak di ScratchJr: <InlineHighlight>5 blok panah kanan</InlineHighlight> disusun berderet!
            </span>
          </div>
        </div>
      </MacWindowCard>

      {/* Bottom Interactive Track Simulating the 5 Space Steps */}
      <InfoPanel
        bg={WHITE}
        padding={18}
        style={{
          ...abs(X0, 750, 1040, 225),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <SectionHeading icon="star" size={24}>
            Simulasi 5 Langkah ke Bintang
          </SectionHeading>
          <button
            type="button"
            className="cpj9-card-btn"
            onClick={walkFive}
            style={{
              padding: '8px 20px',
              borderRadius: 14,
              background: SKY,
              color: WHITE,
              border: `2.5px solid ${CHARCOAL}`,
              boxShadow: `0 4px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 19,
              fontWeight: 700,
              ...row,
              gap: 8,
            }}
          >
            <JuniorIcon name="play" size={18} />
            <span>Jalan 5 Langkah</span>
          </button>
        </div>

        <div
          style={{
            ...row,
            justifyContent: 'space-between',
            gap: 10,
            background: '#0F172A',
            padding: '10px 14px',
            borderRadius: 16,
            border: `2.5px solid ${CHARCOAL}`,
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const isHeroHere = step === idx;
            const isStar = idx === 5;
            const visited = idx > 0 && idx <= step;
            return (
              <div
                key={idx}
                style={{
                  flex: 1,
                  height: 76,
                  borderRadius: 12,
                  background: isStar ? '#FEF9C3' : visited ? '#CCFBF1' : '#1E293B',
                  border: `2px solid ${visited || isStar ? CHARCOAL : '#475569'}`,
                  ...centerCol,
                }}
              >
                {isHeroHere && <BikoTokenSvg size={54} tired={step >= 3 && step < 5} />}
                {isStar && !isHeroHere && <StarSvg size={54} />}
                {!isHeroHere && !isStar && (
                  <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, color: '#94A3B8' }}>
                    {idx === 0 ? 'START' : idx}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ ...row, justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} style={{ marginLeft: n === 1 ? 0 : -8 }}>
              <LoopArrowBlock dir="right" size={48} stepNum={1} active={step === n} />
            </div>
          ))}
        </div>
      </InfoPanel>

      {/* Right Column: Concise Bullet Breakdown + Biko Thinking */}
      <div style={{ ...abs(1170, 215, 650, 760), display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
        <InfoPanel bg={CORAL_SOFT} padding={28}>
          <SectionHeading icon="tired" size={30} accentColor="#B91C1C">
            Kenapa Jadi Repot?
          </SectionHeading>
          <div style={{ marginTop: 16 }}>
            <BulletList
              bulletColor={CORAL}
              fontSize={24}
              gap={14}
              items={[
                <>
                  Tujuan Bintang butuh <InlineHighlight>5 langkah kanan</InlineHighlight>.
                </>,
                <>
                  Semua panahnya <InlineHighlight color={WHITE}>sama persis</InlineHighlight> ke kanan.
                </>,
                <>
                  Susun berulang bikin <InlineHighlight color="#FECACA">layar penuh &amp; capek</InlineHighlight>!
                </>,
              ]}
            />
          </div>
        </InfoPanel>

        <InfoPanel bg={SKY_SOFT} padding={24}>
          <SectionHeading icon="question" size={26} accentColor="#1D4ED8">
            Pertanyaan Penting:
          </SectionHeading>
          <p style={{ margin: '10px 0 0', fontSize: 23, fontWeight: 700, color: CHARCOAL, lineHeight: 1.4 }}>
            Bagaimana cara menulis 5 langkah kanan dalam <InlineHighlight>1 blok saja</InlineHighlight>?
          </p>
        </InfoPanel>

        <div style={{ ...centerCol, flex: 1 }}>
          <BikoMascot
            pose="thinking"
            width={230}
            speechBubble="Pasti ada cara ringkas!"
          />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Ini Namanya Blok Ulangi! (Uses slide 4.png wide screenshot + Keypad demo!)
// ============================================================================
const Slide04BlokUlangi: Page = () => {
  const [count, setCount] = useState(4);
  const [demoDir, setDemoDir] = useState<Dir>('right');

  return (
    <JuniorFrame badge="JURUS KODE RINGKAS" accentDot={SUNNY}>
      <SlideTitle>
        Ini Namanya <Highlight>Blok Ulangi!</Highlight>
      </SlideTitle>

      {/* Top Wide Card: Real ScratchJr Repeat + Numeric Keypad Screenshot (slide 4.png) */}
      <MacWindowCard left={X0} top={210} width={1720} height={305} headerLabel="tampilan-blok-ulangi-scratchjr" padding={20}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1120px 1fr', gap: 28, alignItems: 'center' }}>
          <ScratchImageFrame
            src={imgSlide4}
            alt="Blok Repeat 4 dan keypad angka di ScratchJr"
            bg="#F8FAFC"
            borderColor={SUNNY}
            padding={10}
            imgStyle={{ width: '100%', height: 198, objectFit: 'contain' }}
            style={{ height: '100%' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SectionHeading icon="numbers" size={28}>
              Lihat Di Layar ScratchJr!
            </SectionHeading>
            <BulletList
              bulletColor={ORANGE}
              fontSize={22}
              gap={10}
              items={[
                <>
                  Blok oranye memeluk <InlineHighlight>blok arah biru</InlineHighlight>.
                </>,
                <>
                  Ketuk angka, lalu pilih di <InlineHighlight color={SKY_SOFT}>keypad</InlineHighlight>.
                </>,
              ]}
            />
          </div>
        </div>
      </MacWindowCard>

      {/* Bottom Left: Interactive Simulator with ScratchJr Orange Repeat + Blue Kanan/Kiri/Atas/Bawah */}
      <MacWindowCard left={X0} top={535} width={1040} height={440} headerLabel="coba-ubah-blok-scratchjr" padding={22}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '360px 1fr', gap: 24, alignItems: 'center' }}>
          <div
            style={{
              height: '100%',
              background: '#F8FAFC',
              borderRadius: 20,
              border: `2.5px solid ${BORDER_SOFT}`,
              padding: 18,
              ...centerCol,
              gap: 16,
            }}
          >
            <RepeatHugBlock count={count} dir={demoDir} scale={1.32} />
            <div
              style={{
                padding: '8px 18px',
                borderRadius: 12,
                background: SUNNY_SOFT,
                border: `2px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              Jalan {DIR_META[demoDir].label} {count}×
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'space-between', height: '100%' }}>
            <div>
              <SectionHeading icon="tap" size={24}>
                1. Pilih Angka &amp; Arah Blok ScratchJr:
              </SectionHeading>

              <div style={{ ...row, gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
                <div style={{ ...row, gap: 10 }}>
                  <button
                    type="button"
                    className="cpj9-card-btn"
                    onClick={() => setCount((c) => Math.max(1, c - 1))}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 14,
                      background: CORAL,
                      color: WHITE,
                      border: `2.5px solid ${CHARCOAL}`,
                      boxShadow: `0 4px 0 ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 30,
                      fontWeight: 700,
                    }}
                    aria-label="Kurangi angka ulangi"
                  >
                    -
                  </button>
                  <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700, minWidth: 74, textAlign: 'center' }}>
                    {count} Kali
                  </span>
                  <button
                    type="button"
                    className="cpj9-card-btn"
                    onClick={() => setCount((c) => Math.min(8, c + 1))}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 14,
                      background: TEAL,
                      color: WHITE,
                      border: `2.5px solid ${CHARCOAL}`,
                      boxShadow: `0 4px 0 ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 30,
                      fontWeight: 700,
                    }}
                    aria-label="Tambah angka ulangi"
                  >
                    +
                  </button>
                </div>

                <div style={{ width: 2, height: 42, background: BORDER_SOFT }} />

                <div style={{ ...row, gap: 8 }}>
                  {DIR_ORDER.map((d) => (
                    <LoopArrowBlock
                      key={d}
                      dir={d}
                      size={56}
                      active={demoDir === d}
                      labelText={DIR_META[d].label}
                      onClick={() => setDemoDir(d)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                background: '#F0F9FF',
                borderRadius: 16,
                border: `2px solid ${SKY}`,
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 17, fontWeight: 800, color: '#0369A1' }}>
                Sama artinya dengan {count} blok {DIR_META[demoDir].label} berderet:
              </span>
              <div style={{ ...row, flexWrap: 'wrap' }}>
                {Array.from({ length: count }).map((_, i) => (
                  <div key={i} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                    <LoopArrowBlock dir={demoDir} size={48} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Bottom Right: Key Rules + Biko */}
      <InfoPanel
        bg={TEAL_SOFT}
        padding={24}
        style={{
          ...abs(1165, 535, 655, 440),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <SectionHeading icon="repeat" size={27}>
            Cara Kerja Blok Ulangi:
          </SectionHeading>
          <div style={{ marginTop: 12 }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={22}
              gap={11}
              items={[
                <>
                  Taruh <InlineHighlight>1 blok arah</InlineHighlight> di dalam pelukan.
                </>,
                <>
                  Ganti angka sesuai <InlineHighlight color={WHITE}>jumlah langkah</InlineHighlight>.
                </>,
                <>Hemat blok dan layar tetap rapi!</>,
              ]}
            />
          </div>
        </div>

        <div style={{ ...row, justifyContent: 'flex-end' }}>
          <BikoMascot pose="thumbs-up" width={180} speechBubble="Praktis & rapi!" />
        </div>
      </InfoPanel>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Sulap Kode: 5 Langkah Panjang vs Ringkas! (Uses slide 5.2.png & slide 5.1.png!)
// ============================================================================
const Slide05SulapKode: Page = () => {
  const [transformed, setTransformed] = useState(true);

  return (
    <JuniorFrame badge="SULAP KODE AJAIB" accentDot={LAVENDER}>
      <SlideTitle>
        Ubah 5 Blok Jadi <Highlight>Super Ringkas!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={215} width={1720} height={750} headerLabel="sulap-kode-5-langkah" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
          {/* Top Panel: Kode Panjang (5.2.png) */}
          <InfoPanel
            bg={CORAL_SOFT}
            padding={22}
            style={{
              display: 'grid',
              gridTemplateColumns: '640px 1fr',
              gap: 28,
              alignItems: 'center',
            }}
          >
            <div>
              <span style={{ fontSize: 17, fontWeight: 800, color: '#B91C1C', letterSpacing: '0.05em' }}>
                KODE LAMA (PANJANG)
              </span>
              <SectionHeading icon="footprints" size={30} accentColor={CHARCOAL}>
                5 Blok Panah Berderet
              </SectionHeading>
              <div style={{ marginTop: 10 }}>
                <BulletList
                  bulletColor={CORAL}
                  fontSize={22}
                  gap={6}
                  items={[
                    <>
                      Harus menarik blok panah <InlineHighlight color="#FECACA">5 kali</InlineHighlight>.
                    </>,
                    <>Barisan kode jadi panjang di layar.</>,
                  ]}
                />
              </div>
            </div>

            <ScratchImageFrame
              src={imgSlide52}
              alt="5 blok panah kanan berderet di ScratchJr"
              borderColor={CORAL}
              padding={14}
              imgStyle={{ width: '100%', height: 150, objectFit: 'contain' }}
              style={{ width: '100%' }}
            />
          </InfoPanel>

          {/* Interactive Magic Toggle Button */}
          <div style={{ ...row, justifyContent: 'center', gap: 20 }}>
            <MagicWandSvg size={54} />
            <button
              type="button"
              className="cpj9-card-btn"
              onClick={() => setTransformed((t) => !t)}
              style={{
                padding: '12px 30px',
                borderRadius: 18,
                background: LAVENDER,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 24,
                fontWeight: 700,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="sparkle" size={24} />
              <span>{transformed ? 'Kode Ringkas Aktif! (Klik untuk Bandingkan)' : 'Sulap Jadi Kode Ringkas!'}</span>
            </button>
            <MagicWandSvg size={54} />
          </div>

          {/* Bottom Panel: Kode Baru Ringkas (5.1.png) */}
          <InfoPanel
            bg={transformed ? TEAL_SOFT : '#F8FAFC'}
            padding={22}
            style={{
              display: 'grid',
              gridTemplateColumns: '640px 1fr',
              gap: 28,
              alignItems: 'center',
              opacity: transformed ? 1 : 0.42,
              transition: 'opacity 220ms ease, background 220ms ease',
            }}
          >
            <div>
              <span style={{ fontSize: 17, fontWeight: 800, color: '#047857', letterSpacing: '0.05em' }}>
                KODE BARU (RINGKAS!)
              </span>
              <SectionHeading icon="repeat" size={30} accentColor={CHARCOAL}>
                Cuma <Highlight color={STABILO}>1 Blok Ulangi [ 5 ]!</Highlight>
              </SectionHeading>
              <div style={{ marginTop: 10 }}>
                <BulletList
                  bulletColor={TEAL}
                  fontSize={22}
                  gap={6}
                  items={[
                    <>
                      Karakter tetap maju <InlineHighlight color="#A7F3D0">5 langkah kanan</InlineHighlight>.
                    </>,
                    <>Kode langsung jadi super pendek &amp; rapi!</>,
                  ]}
                />
              </div>
            </div>

            <div style={{ ...row, gap: 24, justifyContent: 'space-between', alignItems: 'center' }}>
              <ScratchImageFrame
                src={imgSlide51}
                alt="1 blok Repeat 5 memeluk blok panah kanan di ScratchJr"
                borderColor={TEAL}
                padding={14}
                imgStyle={{ width: 340, height: 155, objectFit: 'contain' }}
                style={{ flex: 1 }}
              />
              <BikoMascot pose="thumbs-up" width={150} />
            </div>
          </InfoPanel>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Pilih Blok yang Pas! (Uses slide 6.1.png & slide 6.2.png!)
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [choice, setChoice] = useState<2 | 3 | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle align="center" top={104}>
        Harus Diulang <Highlight>Berapa Kali?</Highlight>
      </SlideTitle>

      {/* Top 4-Box Horizontal Track: Start -> 1 -> 2 -> Star (Needs 3 steps) */}
      <MacWindowCard left={180} top={196} width={1560} height={240} headerLabel="hitung-kotak-ke-bintang" padding={18}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: CHARCOAL }}>
            Hitung langkah dari <InlineHighlight color={SKY_SOFT}>Start</InlineHighlight> sampai ke <InlineHighlight>Bintang</InlineHighlight>!
          </div>
          <div style={{ ...row, justifyContent: 'center', gap: 18 }}>
            {[0, 1, 2, 3].map((idx) => (
              <Fragment key={idx}>
                <div
                  style={{
                    width: 240,
                    height: 112,
                    borderRadius: 18,
                    background: idx === 0 ? SKY_SOFT : idx === 3 ? SUNNY_SOFT : TEAL_SOFT,
                    border: `2.5px solid ${CHARCOAL}`,
                    ...centerCol,
                  }}
                >
                  {idx === 0 && <BikoTokenSvg size={76} />}
                  {idx === 3 && <StarSvg size={74} />}
                  {(idx === 1 || idx === 2) && (
                    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, color: '#047857' }}>
                      Langkah {idx}
                    </span>
                  )}
                </div>
                {idx < 3 && <JuniorIcon name="arrow-right" size={28} />}
              </Fragment>
            ))}
          </div>
        </div>
      </MacWindowCard>

      {/* Pilihan A (Interactive Button Card) */}
      <button
        type="button"
        className="cpj9-card-btn"
        onClick={() => setChoice(2)}
        style={{
          ...abs(140, 468, 590, 420),
          borderRadius: 26,
          background: choice === 2 ? CORAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 2 ? `0 0 0 6px ${CORAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${SKY}`,
          padding: 24,
          ...centerCol,
          justifyContent: 'space-between',
          animation: choice === 2 ? 'cpj9-shake 0.35s ease' : undefined,
        }}
      >
        <span style={{ fontSize: 19, fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.06em' }}>
          PILIHAN A (KLIK UNTUK PILIH)
        </span>
        <ScratchImageFrame
          src={imgSlide61}
          alt="Blok Repeat 2 di ScratchJr"
          borderColor={BORDER_SOFT}
          padding={14}
          imgStyle={{ width: 350, height: 170 }}
        />
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: CHARCOAL }}>
          Ulangi 2 Kali {choice === 2 && '— Kurang 1!'}
        </div>
      </button>

      {/* Center Mascot Feedback */}
      <div style={{ ...abs(760, 485, 400, 385), ...centerCol }}>
        <BikoMascot
          pose={choice === 3 ? 'thumbs-up' : 'question'}
          width={240}
          speechBubble={
            choice === 3
              ? 'Benar! Pas 3 Langkah!'
              : choice === 2
                ? 'Kurang 1 langkah lagi!'
                : 'Klik A atau B!'
          }
        />
      </div>

      {/* Pilihan B (Interactive Button Card) */}
      <button
        type="button"
        className="cpj9-card-btn"
        onClick={() => setChoice(3)}
        style={{
          ...abs(1190, 468, 590, 420),
          borderRadius: 26,
          background: choice === 3 ? TEAL_SOFT : WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: choice === 3 ? `0 0 0 6px ${TEAL}, 0 8px 0 ${CHARCOAL}` : `0 8px 0 ${TEAL}`,
          padding: 24,
          ...centerCol,
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 19, fontWeight: 800, color: '#047857', letterSpacing: '0.06em' }}>
          PILIHAN B (KLIK UNTUK PILIH)
        </span>
        <ScratchImageFrame
          src={imgSlide62}
          alt="Blok Repeat 3 di ScratchJr"
          borderColor={BORDER_SOFT}
          padding={14}
          imgStyle={{ width: 350, height: 170 }}
        />
        <div style={{ ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: CHARCOAL }}>
          <span>Ulangi 3 Kali</span>
          {choice === 3 && <JuniorIcon name="check" size={30} />}
        </div>
      </button>

      {/* Feedback Banner (flat card, not button) */}
      <div style={{ ...abs(420, 916, 1080, 60), ...centerCol }}>
        <div
          style={{
            padding: '10px 28px',
            borderRadius: 16,
            background: choice === 3 ? TEAL_SOFT : SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 23,
            fontWeight: 700,
            ...row,
            gap: 8,
          }}
        >
          {choice === 3 ? (
            <>
              <JuniorIcon name="party" size={24} />
              <span>
                Hebat! <InlineHighlight color="#A7F3D0">Ulangi 3 kali</InlineHighlight> ke kanan pas mencapai Bintang!
              </span>
            </>
          ) : (
            <span>Hitung jumlah kotaknya, lalu klik Pilihan A atau Pilihan B!</span>
          )}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Jurus Gabungan: Ulangi & Belok! (Reuses slide 2.1.png!)
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
      }, 420);
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
        Jurus Gabungan: <Highlight>Ulangi &amp; Belok!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Grid Card: 4x3 L-Shaped Maze */}
      <MacWindowCard left={X0} top={215} width={920} height={745} headerLabel="labirin-huruf-L" padding={28}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <SectionHeading icon="chest" size={26}>
              Peta Labirin 4×3 (Jalur Huruf L)
            </SectionHeading>
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
                ...row,
                gap: 8,
              }}
            >
              <JuniorIcon name="play" size={20} />
              <span>Jalankan Kode!</span>
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 170px)',
              gridTemplateRows: 'repeat(3, 145px)',
              gap: 12,
              justifyContent: 'center',
              alignContent: 'center',
              background: '#F0FDF4',
              padding: 20,
              borderRadius: 22,
              border: `2.5px solid ${CHARCOAL}`,
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
                      borderRadius: 16,
                      background: isWall ? '#E2E8F0' : isChest ? SUNNY_SOFT : WHITE,
                      border: isLPath ? `2.5px dashed ${TEAL}` : `2px solid ${CHARCOAL}`,
                      ...centerCol,
                      position: 'relative',
                    }}
                  >
                    {isWall && <RockSvg size={64} />}
                    {isChest && !isBikoHere && <ChestSvg size={78} />}
                    {!isBikoHere && r === 2 && (c === 1 || c === 2 || c === 3) && (
                      <JuniorIcon name={c === 3 ? 'arrow-up' : 'arrow-right'} size={28} />
                    )}
                    {isBikoHere && (
                      <div style={{ ...centerCol }}>
                        <BikoTokenSvg size={82} />
                        {step === 4 && (
                          <span
                            style={{
                              position: 'absolute',
                              top: -8,
                              right: -8,
                              padding: '2px 10px',
                              borderRadius: 99,
                              background: SUNNY,
                              border: `2px solid ${CHARCOAL}`,
                              fontFamily: 'var(--osd-font-display)',
                              fontSize: 15,
                              fontWeight: 700,
                            }}
                          >
                            DAPAT!
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
              ...row,
              justifyContent: 'center',
              gap: 8,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
              color: step === 4 ? '#047857' : MUTED,
            }}
          >
            {step === 0 && 'Jalur lurus 3 kotak ke kanan, lalu belok 1 kotak ke atas!'}
            {step >= 1 && step <= 3 && (
              <>
                <JuniorIcon name="repeat" size={22} />
                <span>Blok Ulangi: Jalan Kanan ke-{step} dari 3</span>
              </>
            )}
            {step === 4 && (
              <>
                <JuniorIcon name="party" size={22} />
                <span>Belok Atas selesai — Harta Karun didapat!</span>
              </>
            )}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: Reused ScratchJr Repeat 3 Image + Turn Up + Bullets */}
      <MacWindowCard left={1055} top={215} width={765} height={745} headerLabel="gabungan-ulangi-belok" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
          <div>
            <SectionHeading icon="repeat" size={28}>
              Langkah Menyusun Kode:
            </SectionHeading>
            <div style={{ marginTop: 14 }}>
              <BulletList
                bulletColor={TEAL}
                fontSize={24}
                gap={12}
                items={[
                  <>
                    Pakai <InlineHighlight>Ulangi 3×</InlineHighlight> untuk jalan kanan.
                  </>,
                  <>
                    Sambung blok <InlineHighlight color="#D1FAE5">Belok Atas</InlineHighlight> setelahnya.
                  </>,
                  <>Kode pendek, jalan belok tetap aman!</>,
                ]}
              />
            </div>
          </div>

          <InfoPanel bg={SKY_SOFT} padding={24} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <SectionHeading size={24}>Contoh Blok di ScratchJr:</SectionHeading>
            <div style={{ ...row, gap: 18, justifyContent: 'center', alignItems: 'center' }}>
              <ScratchImageFrame
                src={imgSlide21}
                alt="Blok Repeat 3 memeluk panah kanan"
                caption="1. Ulangi 3× Kanan"
                borderColor={ORANGE}
                padding={12}
                imgStyle={{ width: 290, height: 145 }}
              />
              <span style={{ fontSize: 32, fontWeight: 800, color: CHARCOAL }}>+</span>
              <div style={{ ...centerCol, gap: 6 }}>
                <LoopArrowBlock dir="up" size={88} active={step === 4} labelText="2. Belok Atas" />
              </div>
            </div>
          </InfoPanel>

          <div style={{ ...row, justifyContent: 'space-between', alignItems: 'center', background: SUNNY_SOFT, padding: '14px 20px', borderRadius: 18, border: `2.5px solid ${CHARCOAL}` }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              Total cuma pakai 2 blok utama saja!
            </span>
            <JuniorIcon name="check" size={30} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Rahasia Pakai Blok Ulangi (Boleh vs Jangan, Reuses slide 2.1.png!)
// ============================================================================
const Slide08Tips: Page = () => (
  <JuniorFrame badge="TIPS KODE RINGKAS" accentDot={TEAL}>
    <SlideTitle>
      Rahasia Pakai <Highlight>Blok Ulangi!</Highlight>
    </SlideTitle>

    <div
      style={{
        ...abs(X0, 215, W, 745),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
      }}
    >
      {/* Left Column: BOLEH */}
      <InfoPanel
        bg={WHITE}
        borderColor={TEAL}
        padding={32}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}
      >
        <div style={{ borderBottom: `2.5px solid ${TEAL_SOFT}`, paddingBottom: 14 }}>
          <SectionHeading icon="check" size={34} accentColor="#047857">
            BOLEH Dilakukan
          </SectionHeading>
        </div>

        <div
          style={{
            borderRadius: 20,
            background: TEAL_SOFT,
            border: `2.5px solid ${TEAL}`,
            padding: '16px 22px',
            ...row,
            justifyContent: 'center',
            gap: 24,
          }}
        >
          <ScratchImageFrame
            src={imgSlide21}
            alt="Contoh benar Blok Repeat 3 memeluk blok kanan di ScratchJr"
            caption="Panah rapi di dalam pelukan & angka pas"
            borderColor={TEAL}
            padding={12}
            imgStyle={{ width: 320, height: 155 }}
          />
          <BikoMascot pose="thumbs-up" width={145} />
        </div>

        <BulletList
          bulletColor={TEAL}
          fontSize={25}
          gap={16}
          items={[
            <>
              <InlineHighlight color="#D1FAE5">Hitung langkah lurus</InlineHighlight> yang sama dulu.
            </>,
            <>
              Taruh panah <InlineHighlight>di dalam pelukan</InlineHighlight> oranye.
            </>,
            <>
              Pilih angka yang <InlineHighlight color="#D1FAE5">pas jumlahnya</InlineHighlight> sesuai kotak.
            </>,
          ]}
        />
      </InfoPanel>

      {/* Right Column: JANGAN */}
      <InfoPanel
        bg={WHITE}
        borderColor={CORAL}
        padding={32}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}
      >
        <div style={{ borderBottom: `2.5px solid ${CORAL_SOFT}`, paddingBottom: 14 }}>
          <SectionHeading icon="cross" size={34} accentColor="#B91C1C">
            JANGAN Dilakukan
          </SectionHeading>
        </div>

        <div
          style={{
            borderRadius: 20,
            background: CORAL_SOFT,
            border: `2.5px solid ${CORAL}`,
            padding: '16px 20px',
            ...row,
            justifyContent: 'space-between',
            gap: 14,
          }}
        >
          <div style={{ ...row, gap: 8, alignItems: 'center' }}>
            <RepeatHugBlock count={9} detached wrongNumber scale={0.78} />
            <LoopArrowBlock dir="right" size={56} labelText="Terlepas" />
          </div>
          <div style={{ ...centerCol, gap: 8 }}>
            <div style={{ ...row, gap: 8 }}>
              <BikoTokenSvg size={58} tired />
              <JuniorIcon name="warning" size={28} />
              <RockSvg size={60} />
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#B91C1C', textAlign: 'center' }}>
              Kosong &amp; angka salah menabrak!
            </span>
          </div>
        </div>

        <BulletList
          bulletColor={CORAL}
          fontSize={25}
          gap={16}
          items={[
            <>
              <InlineHighlight color="#FECACA">Angka terlalu besar</InlineHighlight> bikin Biko menabrak!
            </>,
            <>
              Jangan biarkan panah <InlineHighlight color="#FECACA">terlepas di luar</InlineHighlight>.
            </>,
            <>Cek juga jalur belokan setelahnya.</>,
          ]}
        />
      </InfoPanel>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Labirin Kode Ringkas! (Reuses slide 4.png Keypad guide!)
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const [repeatCount, setRepeatCount] = useState(2);
  const [loopDir, setLoopDir] = useState<Dir>('right');
  const [turnDir, setTurnDir] = useState<Dir>('up');
  const [bikoPos, setBikoPos] = useState<[number, number]>([2, 0]);
  const [status, setStatus] = useState<'idle' | 'running' | 'win' | 'oops'>('idle');
  const [message, setMessage] = useState<{ icon?: JuniorIconName; text: string }>({
    text: 'Hitung kotak lurusnya, lalu atur angka di Blok Ulangi!',
  });
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
    setMessage({ text: 'Hitung kotak lurusnya, lalu atur angka di Blok Ulangi!' });
  };

  const runMaze = () => {
    if (status === 'running') return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStatus('running');
    setBikoPos([2, 0]);
    setMessage({ text: 'Menjalankan Blok Ulangi...' });

    const commands: Dir[] = [...Array(repeatCount).fill(loopDir), turnDir];
    const walls = new Set(['0,0', '0,1', '0,2', '0,3', '1,0', '1,1', '1,2']);
    let r = 2;
    let c = 0;

    const stepNext = (i: number) => {
      if (i >= commands.length) {
        if (r === 1 && c === 3) {
          setStatus('win');
          setMessage({ icon: 'party', text: 'Hore! Kode ringkas berhasil dapat Harta Karun!' });
        } else {
          setStatus('oops');
          setMessage({ text: 'Belum sampai! Coba cek lagi angka ulangannya.' });
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
        setMessage({ icon: 'warning', text: 'Kelewatan! Angka di Blok Ulangi terlalu besar!' });
        return;
      }

      if (walls.has(`${r},${c}`)) {
        setStatus('oops');
        setMessage({ icon: 'rock', text: 'Ups! Menabrak batu! Cek arah beloknya.' });
        return;
      }

      setBikoPos([r, c]);

      if (r === 1 && c === 3) {
        setStatus('win');
        setMessage({ icon: 'party', text: 'Yeay! Kode pendek sukses mencapai Harta Karun!' });
        return;
      }

      timerRef.current = window.setTimeout(() => stepNext(i + 1), 390);
    };

    timerRef.current = window.setTimeout(() => stepNext(0), 260);
  };

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={SUNNY}>
      <SlideTitle top={104}>
        Misi <Highlight>Labirin Kode Ringkas!</Highlight>
      </SlideTitle>

      {/* Top Static Guide Strip (flat boxes, zero button shadows) */}
      <InfoPanel bg={WHITE} padding={14} style={{ ...abs(X0, 188, W, 74), ...row, justifyContent: 'space-around' }}>
        <span style={{ fontSize: 22, fontWeight: 800 }}>
          1. Hitung <InlineHighlight color={SKY_SOFT}>kotak lurus</InlineHighlight> yang sama
        </span>
        <span style={{ fontSize: 24, fontWeight: 800, color: MUTED }}>→</span>
        <span style={{ fontSize: 22, fontWeight: 800 }}>
          2. Atur <InlineHighlight>angka &amp; arah</InlineHighlight> Blok Ulangi
        </span>
        <span style={{ fontSize: 24, fontWeight: 800, color: MUTED }}>→</span>
        <span style={{ fontSize: 22, fontWeight: 800 }}>
          3. Tekan <InlineHighlight color="#D1FAE5">Jalan!</InlineHighlight>
        </span>
      </InfoPanel>

      {/* Bottom Left Interactive Repeat Maze Puzzle */}
      <MacWindowCard left={X0} top={284} width={1280} height={685} headerLabel="game-labirin-blok-ulangi" padding={24}>
        <div style={{ display: 'grid', gridTemplateColumns: '540px 1fr', gap: 24, height: '100%' }}>
          {/* 4x3 Labyrinth Map */}
          <div
            style={{
              background: '#F0FDF4',
              borderRadius: 20,
              border: `2.5px solid ${CHARCOAL}`,
              padding: 14,
              ...centerCol,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 118px)',
                gridTemplateRows: 'repeat(3, 148px)',
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
                        borderRadius: 16,
                        background: isWall ? '#E2E8F0' : isChest ? SUNNY_SOFT : WHITE,
                        border: hasBiko ? `3.5px solid ${SKY}` : `2px solid ${CHARCOAL}`,
                        ...centerCol,
                      }}
                    >
                      {isWall && <RockSvg size={60} />}
                      {isChest && !hasBiko && <ChestSvg size={72} />}
                      {hasBiko && (
                        <BikoTokenSvg
                          size={82}
                          tired={status === 'oops'}
                          style={{ animation: status === 'win' ? 'cpj9-hop 1s ease-in-out infinite' : undefined }}
                        />
                      )}
                      {r === 2 && c === 0 && !hasBiko && (
                        <span style={{ fontSize: 15, fontWeight: 800, color: MUTED }}>START</span>
                      )}
                    </div>
                  );
                }),
              )}
            </div>
          </div>

          {/* Right Controls: Authentic ScratchJr Repeat + 4 Motion Blocks (Kanan, Kiri, Atas, Bawah) */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 10 }}>
            <div>
              <SectionHeading size={24}>Susunan Kode ScratchJr:</SectionHeading>

              <div
                style={{
                  ...row,
                  justifyContent: 'center',
                  marginTop: 8,
                  padding: '12px 18px',
                  borderRadius: 18,
                  background: '#F8FAFC',
                  border: `2.5px solid ${CHARCOAL}`,
                }}
              >
                <RepeatHugBlock
                  count={repeatCount}
                  dir={loopDir}
                  scale={0.88}
                  onCountClick={() => setRepeatCount((c) => (c >= 4 ? 1 : c + 1))}
                />
                <div style={{ marginLeft: -12, marginTop: -8 }}>
                  <LoopArrowBlock dir={turnDir} size={76} active={status === 'running'} />
                </div>
              </div>
            </div>

            <div style={{ ...row, justifyContent: 'space-between', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
                  1. Angka Ulangi:
                </span>
                <div style={{ ...row, gap: 8 }}>
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
                        width: 48,
                        height: 48,
                        borderRadius: 13,
                        background: repeatCount === num ? SUNNY : WHITE,
                        border: `2.5px solid ${CHARCOAL}`,
                        boxShadow: `0 4px 0 ${CHARCOAL}`,
                        fontFamily: 'var(--osd-font-display)',
                        fontSize: 22,
                        fontWeight: 700,
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
                  2. Arah di Dalam Ulangi:
                </span>
                <div style={{ ...row, gap: 6 }}>
                  {DIR_ORDER.map((d) => (
                    <LoopArrowBlock
                      key={d}
                      dir={d}
                      size={48}
                      active={loopDir === d}
                      labelText={DIR_META[d].label}
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
                3. Blok Belok Setelah Ulangi:
              </span>
              <div style={{ ...row, gap: 10 }}>
                {DIR_ORDER.map((d) => (
                  <LoopArrowBlock
                    key={d}
                    dir={d}
                    size={48}
                    active={turnDir === d}
                    labelText={DIR_META[d].label}
                    onClick={() => {
                      setTurnDir(d);
                      setStatus('idle');
                      setBikoPos([2, 0]);
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                style={{
                  padding: '10px 16px',
                  borderRadius: 14,
                  background: status === 'win' ? TEAL_SOFT : status === 'oops' ? CORAL_SOFT : SUNNY_SOFT,
                  border: `2px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 20,
                  fontWeight: 700,
                  ...row,
                  gap: 8,
                }}
              >
                {message.icon && <JuniorIcon name={message.icon} size={22} />}
                <span>{message.text}</span>
              </div>

              <div style={{ ...row, gap: 12 }}>
                <button
                  type="button"
                  className="cpj9-card-btn"
                  onClick={runMaze}
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    borderRadius: 16,
                    background: TEAL,
                    color: WHITE,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 5px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 24,
                    fontWeight: 700,
                    ...row,
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <JuniorIcon name="play" size={22} />
                  <span>Jalan!</span>
                </button>
                <button
                  type="button"
                  className="cpj9-card-btn"
                  onClick={resetGame}
                  style={{
                    padding: '12px 20px',
                    borderRadius: 16,
                    background: WHITE,
                    color: CHARCOAL,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 5px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 22,
                    fontWeight: 700,
                    ...row,
                    gap: 8,
                  }}
                >
                  <JuniorIcon name="reset" size={20} />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Reference Panel: Reused ScratchJr Keypad Guide + Biko */}
      <InfoPanel
        bg={WHITE}
        padding={20}
        style={{
          ...abs(1408, 284, 412, 685),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SectionHeading icon="laptop" size={24}>
            Ingat di ScratchJr!
          </SectionHeading>
          <ScratchImageFrame
            src={imgSlide4}
            alt="Keypad angka ScratchJr"
            caption="Ketuk angka lalu pilih di keypad"
            borderColor={SUNNY}
            padding={10}
            imgStyle={{ width: '100%', height: 115, objectFit: 'contain' }}
          />
          <BulletList
            bulletColor={SUNNY}
            fontSize={20}
            gap={10}
            items={[
              <>
                Butuh <InlineHighlight>3 langkah</InlineHighlight> kanan ke tikungan.
              </>,
              <>
                Lalu belok <InlineHighlight color={TEAL_SOFT}>1 kali</InlineHighlight> ke atas.
              </>,
            ]}
          />
        </div>

        <div style={{ ...centerCol }}>
          <BikoMascot
            pose={status === 'win' ? 'jump' : 'thumbs-up'}
            width={235}
            speechBubble={status === 'win' ? 'Kode Ringkas Juara!' : 'Pilih angka 3 ya?'}
          />
        </div>
      </InfoPanel>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 9 (Summary Bullets + Reused Image + Medal)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  const confetti = [
    { left: 140, top: 240, color: SUNNY, rot: '18deg', size: 20 },
    { left: 260, top: 820, color: SKY, rot: '-24deg', size: 22 },
    { left: 1650, top: 230, color: CORAL, rot: '-15deg', size: 20 },
    { left: 1500, top: 850, color: LAVENDER, rot: '28deg', size: 22 },
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
            border: `2px solid ${CHARCOAL}`,
            transform: `rotate(${c.rot})`,
            animation: live ? `cpj9-confetti ${2.4 + idx * 0.3}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={104} size={58}>
        Hebat! Kamu <Highlight>Master Kode Ringkas!</Highlight>
      </SlideTitle>

      {/* Center Celebration & Recap Card */}
      <MacWindowCard left={180} top={210} width={1180} height={745} headerLabel="lencana-pertemuan-9" padding={34}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '430px 1fr', gap: 36, alignItems: 'center' }}>
          {/* Left: Gold Medal + Flat Achievement Banner */}
          <div style={{ ...centerCol, gap: 22 }}>
            <svg
              width={255}
              height={255}
              viewBox="0 0 240 240"
              fill="none"
              style={{ animation: live ? 'cpj9-float 3s ease-in-out infinite' : undefined }}
            >
              <path d="M74 16 L104 94 H136 L166 16 Z" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
              <path d="M94 16 L120 88 L146 16" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="140" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={6} />
              <circle cx="120" cy="140" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={4} />
              <path d="M92 126 A32 32 0 0 1 148 126" stroke={TEAL} strokeWidth={9} strokeLinecap="round" />
              <path d="M140 112 L152 128 L134 132 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
              <path d="M148 154 A32 32 0 0 1 92 154" stroke={ORANGE} strokeWidth={9} strokeLinecap="round" />
              <path d="M100 168 L88 152 L106 148 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
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
                padding: '12px 24px',
                borderRadius: 16,
                background: SUNNY_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 27,
                fontWeight: 700,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="medal" size={28} />
              <span>Lencana Master Blok Ulangi</span>
            </div>
          </div>

          {/* Right: Concise Bullet Takeaways + Reused ScratchJr Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <SectionHeading icon="party" size={32}>
              Yang Sudah Kamu Kuasai:
            </SectionHeading>

            <BulletList
              bulletColor={TEAL}
              fontSize={25}
              gap={16}
              items={[
                <>
                  Mengenal <InlineHighlight>Blok Ulangi (Repeat)</InlineHighlight> di ScratchJr.
                </>,
                <>
                  Ubah kode panjang menjadi <InlineHighlight color="#D1FAE5">1 blok ringkas</InlineHighlight>.
                </>,
                <>
                  Atur jumlah langkah lewat <InlineHighlight color={SKY_SOFT}>keypad angka</InlineHighlight>.
                </>,
                <>
                  Gabung <InlineHighlight>Ulangi + Belok</InlineHighlight> lewati labirin.
                </>,
              ]}
            />

            <ScratchImageFrame
              src={imgSlide51}
              alt="Blok Repeat 5 di ScratchJr"
              caption="Blok andalanmu untuk kode super ringkas!"
              bg={TEAL_SOFT}
              borderColor={TEAL}
              padding={12}
              imgStyle={{ width: 280, height: 130 }}
            />
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko Celebrating on Right */}
      <div style={{ ...abs(1400, 390, 420, 500), ...centerCol }}>
        <BikoMascot
          pose="jump"
          width={365}
          badgeIcon={<JuniorIcon name="repeat" size={28} />}
          speechBubble="Kode Ringkas Juara!"
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
1. Mengenal Blok Ulangi (Repeat) yang berbentuk seperti pelukan oranye.
2. Mengubah kode panjang 3 langkah menjadi 1 blok super ringkas!`,

  `Masalah Coder: Di ScratchJr tema luar angkasa, karakter harus jalan 5 langkah lurus ke kanan menuju Bintang.
Kalau kita menyusun 5 blok panah kanan satu per satu, tangan kita capek dan layarnya penuh!`,

  `Inilah penyelamatnya: Blok Ulangi (Repeat)!
Blok oranye ini memeluk satu blok panah di dalamnya. Ketuk angkanya lalu pilih jumlah langkah di keypad ScratchJr!`,

  `Ayo lihat sulap kodenya!
Kode lama butuh 5 blok panah kanan berderet. Dengan sulap Blok Ulangi [ 5 ] berisi panah kanan, kode langsung menyusut jadi cuma 1 blok saja!`,

  `Permainan Cepat! Hitung kotak dari Biko menuju Bintang: butuh 3 langkah ke kanan.
Jadi mana yang pas: Pilihan A (Ulangi 2 Kali) atau Pilihan B (Ulangi 3 Kali)?`,

  `Sekarang kita gabungkan Ulangi & Belok di peta huruf L!
Pertama: Ulangi [ 3 ] jalan Kanan, lalu sambung dengan blok Belok Atas -> Harta Karun didapat!`,

  `Tips Jagoan Blok Ulangi:
BOLEH hitung dulu langkah lurus yang sama dan taruh panah rapi DI DALAM pelukan blok.
JANGAN asal pasang angka terlalu besar nanti menabrak tembok, dan jangan biarkan panah terlepas di luar!`,

  `Ayo main Game Labirin Kode Ringkas!
Hitung jalur lurus ke kanan di baris bawah (ada 3 kotak!), ganti angka di Blok Ulangi menjadi 3, lalu tekan Jalan!`,

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

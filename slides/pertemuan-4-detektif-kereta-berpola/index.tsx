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
@keyframes cpj4-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj4-chug {
  0%, 100% { transform: translateX(0px) translateY(0px); }
  50% { transform: translateX(8px) translateY(-3px); }
}
.cpj4-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj4-card-btn:hover {
  transform: translateY(-3px);
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
const CARD_SHADOW = '0 6px 18px rgba(30, 30, 44, 0.08)';
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
// Shared Chrome, Typography, Highlights, Bullet Lists & Flat Cards
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
      {/* Top Left Logo (Slide 1 Cover only) + Flat Header Tag */}
      <div
        style={{
          ...abs(X0, 48),
          ...row,
          gap: 18,
          zIndex: 5,
        }}
      >
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

      {/* Top Right Flat Slide Number Indicator */}
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

/** Flat content panel (never looks like a clickable push-button) */
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
    <div style={{ position: 'relative', flex: 1, padding, boxSizing: 'border-box', overflow: 'hidden' }}>{children}</div>
  </div>
);

const StepNumberBadge = ({
  num,
  color,
  size = 56,
}: {
  num: number | string;
  color: string;
  size?: number;
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.3),
      background: color,
      border: `3px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(size * 0.52),
      fontWeight: 700,
      color: color === SUNNY ? CHARCOAL : WHITE,
      ...centerCol,
      flexShrink: 0,
    }}
  >
    {num}
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
      <circle cx="152" cy="18" r="10" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
      <circle cx="132" cy="28" r="7" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
      <path d="M142 36 H168 L162 66 H148 Z" fill={CHARCOAL} />
      <rect x="26" y="42" width="70" height="78" rx="14" fill={SKY} stroke={CHARCOAL} strokeWidth={4} />
      <rect x="18" y="34" width="86" height="14" rx="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
      <rect x="42" y="56" width="38" height="32" rx="8" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
      <rect x="92" y="64" width="90" height="56" rx="16" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} />
      <path d="M178 90 L198 120 H174 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
      <rect x="96" y="88" width="80" height="10" rx="5" fill={SUNNY} />
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
}) => {
  const inner = (
    <>
      <div
        style={{
          width: '100%',
          height: height - 26,
          borderRadius: 22,
          background: isUnknown ? WHITE : color,
          border: isUnknown ? `4px dashed ${CORAL}` : `3.5px solid ${CHARCOAL}`,
          boxShadow: onClick && !isUnknown ? `0 6px 0 ${CHARCOAL}` : isUnknown ? 'none' : CARD_SHADOW,
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
    </>
  );

  const sharedStyle: CSSProperties = {
    position: 'relative',
    width,
    height,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
    padding: 0,
    border: 'none',
    background: 'transparent',
  };

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="cpj4-card-btn" style={sharedStyle}>
        {inner}
      </button>
    );
  }

  return <div style={sharedStyle}>{inner}</div>;
};

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
// SLIDE 01 — Sampul Pertemuan (H1 + InfoPanel BulletList + Station Showcase)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 4" accentDot={SUNNY}>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 175, 830, 770), display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            alignSelf: 'flex-start',
            padding: '8px 18px',
            borderRadius: 12,
            background: SKY_SOFT,
            border: `2px solid ${CHARCOAL}`,
            fontSize: 20,
            fontWeight: 800,
            color: '#1D4ED8',
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
          Detektif <Highlight color={STABILO}>Kereta Berpola!</Highlight>
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
          Tebak Urutan Warna &amp; Bentuk di Layar
        </p>

        <InfoPanel bg={WHITE} padding={26} style={{ marginTop: 4 }}>
          <SectionHeading icon="magnifier" size={26}>
            Yang Akan Kita Pelajari:
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={24}
              gap={12}
              items={[
                <>
                  Cari <InlineHighlight>pola warna</InlineHighlight> yang berulang.
                </>,
                <>
                  Kenali <InlineHighlight color="#D1FAE5">pola bentuk</InlineHighlight> yang teratur.
                </>,
                <>
                  Lengkapi <InlineHighlight color={SKY_SOFT}>gerbong kereta</InlineHighlight> yang kosong.
                </>,
              ]}
            />
          </div>
        </InfoPanel>
      </div>

      {/* Right Visual Showcase: Train Station Arch Frame + Mini Train Card + Detective Biko */}
      <div style={{ ...abs(980, 155, 840, 795), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 640,
            height: 640,
            borderRadius: '320px 320px 40px 40px',
            background: 'linear-gradient(180deg, #DBEAFE 0%, #FFFBEB 100%)',
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: CARD_SHADOW,
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 26 }}>
            <TrainTrack width="100%" />
          </div>
        </div>

        {/* Flat Mini Pattern Train Screen Card */}
        <InfoPanel
          bg={WHITE}
          padding={16}
          style={{
            position: 'relative',
            zIndex: 4,
            width: 460,
            marginBottom: 14,
            animation: live ? 'cpj4-chug 3.4s ease-in-out infinite' : undefined,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <SectionHeading icon="train" size={20}>
              Kereta Berpola
            </SectionHeading>
            <span
              style={{
                padding: '4px 12px',
                borderRadius: 10,
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
        </InfoPanel>

        <BikoMascot
          pose="detective"
          width={390}
          style={{ position: 'relative', zIndex: 3 }}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 InfoPanel Misi + Visuals + BulletList)
// ============================================================================
const Slide02Misi: Page = () => (
  <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
    <SlideTitle>
      Apa <Highlight>Misi Kita</Highlight> Hari Ini?
    </SlideTitle>

    <MacWindowCard left={X0} top={215} width={1320} height={745} headerLabel="daftar-misi-4" padding={34}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, height: '100%' }}>
        {/* Misi 1 */}
        <InfoPanel
          bg={SKY_SOFT}
          padding={28}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em' }}>
              MISI 1
            </span>
            <SectionHeading icon="palette" size={32}>
              Temukan <Highlight color={STABILO}>Pola</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${SKY}`,
              padding: 16,
              ...centerCol,
            }}
          >
            <svg width={260} height={175} viewBox="0 0 260 180" fill="none">
              <path d="M52 60 L61 78 L80 81 L66 94 L69 114 L52 104 L35 114 L38 94 L24 81 L43 78 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="132" cy="88" r="28" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} />
              <path d="M204 60 L213 78 L232 81 L218 94 L221 114 L204 104 L187 114 L190 94 L176 81 L195 78 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="132" cy="86" r="46" fill="#E0F2FE" fillOpacity={0.35} stroke={CHARCOAL} strokeWidth={6} />
              <line x1="166" y1="120" x2="202" y2="156" stroke="#92400E" strokeWidth={12} strokeLinecap="round" />
            </svg>
          </div>

          <BulletList
            bulletColor={SKY}
            fontSize={24}
            gap={10}
            items={[
              <>
                Amati <InlineHighlight color="#DBEAFE">warna</InlineHighlight> yang berulang.
              </>,
              <>
                Amati <InlineHighlight>bentuk</InlineHighlight> yang berulang.
              </>,
            ]}
          />
        </InfoPanel>

        {/* Misi 2 */}
        <InfoPanel
          bg={TEAL_SOFT}
          padding={28}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#047857', letterSpacing: '0.05em' }}>
              MISI 2
            </span>
            <SectionHeading icon="train" size={32}>
              Lengkapi <Highlight color="#A7F3D0">Kereta</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${TEAL}`,
              padding: 16,
              ...centerCol,
            }}
          >
            <svg width={270} height={175} viewBox="0 0 270 180" fill="none">
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
          </div>

          <BulletList
            bulletColor={TEAL}
            fontSize={24}
            gap={10}
            items={[
              <>
                Cari gerbong yang <InlineHighlight color="#D1FAE5">kosong</InlineHighlight>.
              </>,
              <>
                Pasang warna yang <InlineHighlight>tepat</InlineHighlight>!
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </MacWindowCard>

    <div style={{ ...abs(1445, 310, 375, 620), ...centerCol, gap: 12 }}>
      <BikoMascot pose="point-left" width={350} />
      <InfoPanel bg={SUNNY_SOFT} padding={14} style={{ borderRadius: 16 }}>
        <SectionHeading icon="magnifier" size={24}>
          Siap Detektif!
        </SectionHeading>
      </InfoPanel>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Rahasia Detektif: Apa Itu Pola?
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
      <MacWindowCard left={X0} top={215} width={980} height={745} headerLabel="detektif-pola" padding={26}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
            background: 'linear-gradient(180deg, #EFF6FF 0%, #FFFBEB 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            padding: '22px 28px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Repeating curved arrows */}
          <div style={{ ...row, justifyContent: 'space-around', padding: '0 40px' }}>
            <div style={{ ...centerCol }}>
              <SectionHeading icon="repeat" size={22} accentColor={TEAL}>
                Pola 1
              </SectionHeading>
              <svg width={240} height={44} viewBox="0 0 240 44" fill="none">
                <path d="M24 38 Q120 -4 216 34" stroke={TEAL} strokeWidth={5} strokeDasharray="8 6" strokeLinecap="round" />
                <path d="M204 26 L218 35 L204 40" stroke={TEAL} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ ...centerCol }}>
              <SectionHeading icon="repeat" size={22} accentColor={CORAL}>
                Ulang Lagi!
              </SectionHeading>
              <svg width={240} height={44} viewBox="0 0 240 44" fill="none">
                <path d="M24 38 Q120 -4 216 34" stroke={CORAL} strokeWidth={5} strokeDasharray="8 6" strokeLinecap="round" />
                <path d="M204 26 L218 35 L204 40" stroke={CORAL} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Flat Star - Circle - Star - Circle Cards */}
          <div style={{ ...row, justifyContent: 'center', gap: 20 }}>
            {PATTERN_SEQ.map((item, i) => {
              const pairBorder = groupHighlight ? (i < 2 ? TEAL : CORAL) : CHARCOAL;
              return (
                <InfoPanel
                  key={i}
                  bg={WHITE}
                  borderColor={pairBorder}
                  padding={16}
                  style={{
                    width: 175,
                    height: 175,
                    ...centerCol,
                    gap: 8,
                  }}
                >
                  <PatternShapeSvg shape={item.shape} fill={item.fill} size={92} />
                  <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                    {item.label}
                  </span>
                </InfoPanel>
              );
            })}
          </div>

          {/* Detective Biko + Interactive Toggle */}
          <div style={{ ...row, justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <BikoMascot pose="detective" width={205} style={{ marginBottom: -10 }} />
            <button
              type="button"
              className="cpj4-card-btn"
              onClick={() => setGroupHighlight((v) => !v)}
              style={{
                ...row,
                gap: 10,
                padding: '14px 28px',
                borderRadius: 18,
                background: groupHighlight ? SUNNY : TEAL,
                color: groupHighlight ? CHARCOAL : WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              <JuniorIcon name={groupHighlight ? 'magnifier' : 'repeat'} size={24} />
              <span>{groupHighlight ? 'Pola Terlihat Jelas!' : 'Sorot Urutan Berulang'}</span>
            </button>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: Concise Bullet Explanation Panels */}
      <div style={{ ...abs(1115, 215, 705, 745), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <InfoPanel bg={WHITE} borderColor={SKY} padding={28}>
          <SectionHeading icon="repeat" size={30} accentColor="#1D4ED8">
            Arti Pola
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={SKY}
              fontSize={26}
              gap={12}
              items={[
                <>
                  Gambar atau warna <InlineHighlight color="#DBEAFE">berulang</InlineHighlight>.
                </>,
                <>
                  Punya <InlineHighlight color="#D1FAE5">urutan teratur</InlineHighlight>!
                </>,
              ]}
            />
          </div>
        </InfoPanel>

        <InfoPanel bg={WHITE} borderColor={TEAL} padding={28}>
          <SectionHeading icon="magnifier" size={30} accentColor="#047857">
            Cara Melihat Pola
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={26}
              gap={12}
              items={[
                <>
                  Habis Bintang, selalu <InlineHighlight color={SKY_SOFT}>Lingkaran</InlineHighlight>.
                </>,
                <>
                  Habis Lingkaran, kembali <InlineHighlight>Bintang</InlineHighlight>.
                </>,
              ]}
            />
          </div>
        </InfoPanel>

        <InfoPanel bg={SUNNY_SOFT} padding={24}>
          <div style={{ ...row, justifyContent: 'space-around' }}>
            <PatternShapeSvg shape="star" fill={SUNNY} size={58} />
            <JuniorIcon name="arrow-right" size={28} />
            <PatternShapeSvg shape="circle" fill={SKY} size={58} />
            <JuniorIcon name="arrow-right" size={28} />
            <PatternShapeSvg shape="star" fill={SUNNY} size={58} />
            <JuniorIcon name="arrow-right" size={28} />
            <PatternShapeSvg shape="circle" fill={SKY} size={58} />
          </div>
        </InfoPanel>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Detektif Warna: Pola 2 Warna
// ============================================================================
const Slide04Pola2Warna: Page = () => {
  const [guess, setGuess] = useState<'red' | 'yellow' | null>(null);

  return (
    <JuniorFrame badge="LATIHAN POLA #1" accentDot={CORAL}>
      <SlideTitle>
        Lihat <Highlight>Pola Warna</Highlight> Kereta!
      </SlideTitle>

      <MacWindowCard left={X0} top={215} width={W} height={745} headerLabel="kereta-2-warna" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top 2 Clue InfoPanels */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28 }}>
            <InfoPanel bg={SUNNY_SOFT} padding={20}>
              <SectionHeading icon="train" size={26}>
                Urutan Gerbong
              </SectionHeading>
              <div style={{ marginTop: 10 }}>
                <BulletList
                  bulletColor={CORAL}
                  fontSize={24}
                  gap={6}
                  items={[
                    <>
                      <InlineHighlight color="#FEE2E2">Merah</InlineHighlight> — <InlineHighlight>Kuning</InlineHighlight> — <InlineHighlight color="#FEE2E2">Merah</InlineHighlight> — <InlineHighlight>Kuning</InlineHighlight>
                    </>,
                  ]}
                />
              </div>
            </InfoPanel>

            <InfoPanel bg={CORAL_SOFT} padding={20}>
              <SectionHeading icon="question" size={26}>
                Tebak Gerbong 5
              </SectionHeading>
              <div style={{ marginTop: 10 }}>
                <BulletList
                  bulletColor={SUNNY}
                  fontSize={24}
                  gap={6}
                  items={[
                    <>
                      Habis Kuning, <InlineHighlight color="#FEE2E2">warna apa</InlineHighlight> ya?
                    </>,
                  ]}
                />
              </div>
            </InfoPanel>
          </div>

          {/* Train Illustration on Track */}
          <div
            style={{
              padding: '26px 28px 18px',
              borderRadius: 24,
              background: 'linear-gradient(180deg, #E0F2FE 0%, #F8FAFC 100%)',
              border: `3px solid ${CHARCOAL}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ ...row, alignItems: 'flex-end', gap: 16, width: '100%', justifyContent: 'center' }}>
              <TrainLocomotiveSvg width={210} />
              <TrainWagonCard color={CORAL} label="Merah" width={185} height={148} />
              <TrainWagonCard color={SUNNY} label="Kuning" width={185} height={148} />
              <TrainWagonCard color={CORAL} label="Merah" width={185} height={148} />
              <TrainWagonCard color={SUNNY} label="Kuning" width={185} height={148} />
              <TrainWagonCard
                color={guess === 'red' ? CORAL : guess === 'yellow' ? SUNNY : WHITE}
                label={guess === 'red' ? 'Merah!' : guess === 'yellow' ? 'Kuning?' : undefined}
                isUnknown={guess === null}
                width={185}
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
                  borderRadius: 18,
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
                  borderRadius: 18,
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

            <InfoPanel
              bg={guess === 'red' ? TEAL_SOFT : guess === 'yellow' ? CORAL_SOFT : STABILO}
              borderColor={guess === 'red' ? TEAL : guess === 'yellow' ? CORAL : CHARCOAL}
              padding={16}
              style={{ flex: 1, ...row, justifyContent: 'center', gap: 10, borderRadius: 18 }}
            >
              <JuniorIcon name={guess === 'red' ? 'check' : guess === 'yellow' ? 'thinking' : 'tap'} size={28} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
                {guess === 'red'
                  ? 'Tepat! Habis Kuning kembali Merah!'
                  : guess === 'yellow'
                    ? 'Cek lagi: Merah - Kuning - Merah - Kuning...'
                    : 'Klik warna gerbong ke-5!'}
              </span>
            </InfoPanel>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Detektif Bentuk: Pola Bentuk Seru
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

    <MacWindowCard left={X0} top={215} width={W} height={745} headerLabel="kereta-pola-bentuk" padding={30}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Top 2 Clue InfoPanels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 28 }}>
          <InfoPanel bg={SKY_SOFT} padding={20}>
            <SectionHeading icon="shape-diamond" size={26}>
              Urutan Bentuk
            </SectionHeading>
            <div style={{ marginTop: 10 }}>
              <BulletList
                bulletColor={SKY}
                fontSize={24}
                gap={6}
                items={[
                  <>
                    <InlineHighlight color="#DBEAFE">Lingkaran</InlineHighlight> — <InlineHighlight color="#D1FAE5">Segitiga</InlineHighlight> — <InlineHighlight color="#DBEAFE">Lingkaran</InlineHighlight> — <InlineHighlight color="#D1FAE5">Segitiga</InlineHighlight>
                  </>,
                ]}
              />
            </div>
          </InfoPanel>

          <InfoPanel bg={TEAL_SOFT} padding={20}>
            <SectionHeading icon="sparkle" size={26}>
              Aturan Pola
            </SectionHeading>
            <div style={{ marginTop: 10 }}>
              <BulletList
                bulletColor={TEAL}
                fontSize={24}
                gap={6}
                items={[
                  <>
                    Bentuknya <InlineHighlight color="#D1FAE5">bergantian rapi</InlineHighlight>!
                  </>,
                ]}
              />
            </div>
          </InfoPanel>
        </div>

        {/* Train + Conductor Biko + 4 Shape Wagons */}
        <div
          style={{
            flex: 1,
            marginTop: 22,
            padding: '22px 26px 18px',
            borderRadius: 24,
            background: 'linear-gradient(180deg, #F0FDF4 0%, #FFFBEB 100%)',
            border: `3px solid ${CHARCOAL}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div style={{ ...row, alignItems: 'flex-end', justifyContent: 'center', gap: 18 }}>
            <div style={{ position: 'relative', ...row, alignItems: 'flex-end' }}>
              <BikoMascot pose="conductor" width={195} style={{ marginRight: -28, zIndex: 3 }} />
              <TrainLocomotiveSvg width={210} />
            </div>

            {SHAPE_WAGONS.map((w, idx) => (
              <div key={idx} style={{ ...centerCol, gap: 10 }}>
                <div
                  style={{
                    ...row,
                    gap: 8,
                    padding: '6px 14px',
                    borderRadius: 14,
                    background: WHITE,
                    border: `2.5px solid ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  <span>{idx + 1}. {w.label}</span>
                </div>
                <TrainWagonCard color={WHITE} shape={w.shape} shapeColor={w.fill} width={218} height={172} />
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
      <SlideTitle align="center" top={114}>
        Gambar Apa <Highlight>Selanjutnya?</Highlight>
      </SlideTitle>

      {/* Top Flat Pattern Sequence Bar */}
      <InfoPanel
        bg={WHITE}
        padding={16}
        style={{
          ...abs(140, 200, 1640, 118),
          ...row,
          justifyContent: 'center',
          gap: 22,
        }}
      >
        {[
          { shape: 'star' as const, fill: SUNNY, label: 'Bintang' },
          { shape: 'heart' as const, fill: CORAL, label: 'Hati' },
          { shape: 'star' as const, fill: SUNNY, label: 'Bintang' },
          { shape: 'heart' as const, fill: CORAL, label: 'Hati' },
        ].map((item, i) => (
          <Fragment key={i}>
            <div style={{ ...row, gap: 10, padding: '8px 16px', borderRadius: 16, background: '#F8FAFC', border: `2.5px solid ${CHARCOAL}` }}>
              <PatternShapeSvg shape={item.shape} fill={item.fill} size={50} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>{item.label}</span>
            </div>
            <JuniorIcon name="arrow-right" size={28} />
          </Fragment>
        ))}

        <div
          style={{
            minWidth: 120,
            height: 74,
            borderRadius: 18,
            background: choice === 'A' ? TEAL_SOFT : SUNNY_SOFT,
            border: `3.5px ${choice === 'A' ? 'solid' : 'dashed'} ${choice === 'A' ? TEAL : CORAL}`,
            ...centerCol,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 36,
            fontWeight: 700,
            color: CORAL,
          }}
        >
          {choice === 'A' ? <PatternShapeSvg shape="star" fill={SUNNY} size={52} /> : '?'}
        </div>
      </InfoPanel>

      {/* Two Big Interactive Choice Buttons */}
      <div style={{ ...abs(180, 345, 1560, 360), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        <button
          type="button"
          className="cpj4-card-btn"
          onClick={() => setChoice('A')}
          style={{
            borderRadius: 30,
            background: choice === 'A' ? TEAL_SOFT : WHITE,
            border: `4px solid ${choice === 'A' ? TEAL : CHARCOAL}`,
            boxShadow: `0 9px 0 ${choice === 'A' ? TEAL : SUNNY}`,
            padding: '22px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              padding: '6px 22px',
              borderRadius: 14,
              background: SUNNY,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            PILIHAN A
          </span>

          <PatternShapeSvg shape="star" fill={SUNNY} size={145} />

          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 40, fontWeight: 700, color: CHARCOAL }}>
            Bintang
          </span>
        </button>

        <button
          type="button"
          className="cpj4-card-btn"
          onClick={() => setChoice('B')}
          style={{
            borderRadius: 30,
            background: choice === 'B' ? CORAL_SOFT : WHITE,
            border: `4px solid ${choice === 'B' ? CORAL : CHARCOAL}`,
            boxShadow: `0 9px 0 ${choice === 'B' ? CORAL : LAVENDER}`,
            padding: '22px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              padding: '6px 22px',
              borderRadius: 14,
              background: CORAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            PILIHAN B
          </span>

          <PatternShapeSvg shape="heart" fill={CORAL} size={145} />

          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 40, fontWeight: 700, color: CHARCOAL }}>
            Hati
          </span>
        </button>
      </div>

      {/* Bottom: Biko Question + Flat Feedback Panel */}
      <div style={{ ...abs(240, 725, 1440, 270), ...row, justifyContent: 'center', gap: 36 }}>
        <BikoMascot pose="question" width={220} />

        <InfoPanel
          bg={choice === 'A' ? TEAL_SOFT : choice === 'B' ? CORAL_SOFT : STABILO}
          borderColor={choice === 'A' ? TEAL : choice === 'B' ? CORAL : CHARCOAL}
          padding={26}
          style={{ minWidth: 580, ...row, justifyContent: 'center', gap: 14 }}
        >
          {choice === 'A' && (
            <SectionHeading icon="check" size={34} accentColor="#065F46">
              BENAR! Habis Hati pasti Bintang!
            </SectionHeading>
          )}
          {choice === 'B' && (
            <SectionHeading icon="thinking" size={34} accentColor="#991B1B">
              Bintang — Hati — Bintang — Hati...
            </SectionHeading>
          )}
          {choice === null && (
            <SectionHeading icon="point-right" size={34}>
              Klik gambar yang tepat ya!
            </SectionHeading>
          )}
        </InfoPanel>
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

      <MacWindowCard left={X0} top={215} width={W} height={745} headerLabel="kereta-3-warna" padding={30}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top 2 Clue InfoPanels */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <InfoPanel bg={SKY_SOFT} padding={20}>
              <SectionHeading icon="rainbow" size={26}>
                Pola 3 Warna
              </SectionHeading>
              <div style={{ marginTop: 10 }}>
                <BulletList
                  bulletColor={TEAL}
                  fontSize={24}
                  gap={6}
                  items={[
                    <>
                      <InlineHighlight color="#FEE2E2">Merah</InlineHighlight> — <InlineHighlight>Kuning</InlineHighlight> — <InlineHighlight color="#D1FAE5">Hijau</InlineHighlight>
                    </>,
                  ]}
                />
              </div>
            </InfoPanel>

            <InfoPanel bg={SUNNY_SOFT} padding={20}>
              <SectionHeading icon="train" size={26}>
                Cari Gerbong 6
              </SectionHeading>
              <div style={{ marginTop: 10 }}>
                <BulletList
                  bulletColor={CORAL}
                  fontSize={24}
                  gap={6}
                  items={[
                    <>
                      Merah — Kuning — <InlineHighlight>[ ? ]</InlineHighlight>
                    </>,
                  ]}
                />
              </div>
            </InfoPanel>
          </div>

          {/* Long 6-Wagon Train */}
          <div
            style={{
              padding: '26px 22px 18px',
              borderRadius: 24,
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

          {/* 3 Interactive Color Buttons + Flat Feedback */}
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
                  borderRadius: 18,
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
                  borderRadius: 18,
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
                  borderRadius: 18,
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

            <InfoPanel
              bg={answer === 'green' ? TEAL_SOFT : answer !== null ? CORAL_SOFT : STABILO}
              borderColor={answer === 'green' ? TEAL : answer !== null ? CORAL : CHARCOAL}
              padding={14}
              style={{ flex: 1, ...row, justifyContent: 'center', gap: 10, borderRadius: 18 }}
            >
              <JuniorIcon name={answer === 'green' ? 'check' : answer !== null ? 'thinking' : 'tap'} size={26} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
                {answer === 'green'
                  ? 'Hebat! Merah - Kuning - Hijau pas!'
                  : answer === 'red'
                    ? 'Habis Kuning apa ya? Cek kelompok 1!'
                    : answer === 'yellow'
                      ? 'Kuning sudah! Cek warna ke-3!'
                      : 'Pilih warna gerbong ke-6!'}
              </span>
            </InfoPanel>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Jurus Jitu Detektif Pola (2 InfoPanel Jurus + Biko)
// ============================================================================
const Slide08JurusDetektif: Page = () => (
  <JuniorFrame badge="TIPS DETEKTIF" accentDot={TEAL}>
    <SlideTitle>
      Cara Mudah <Highlight>Menebak Pola</Highlight>
    </SlideTitle>

    <MacWindowCard left={X0} top={215} width={1320} height={745} headerLabel="tips-detektif-pola" padding={34}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, height: '100%' }}>
        {/* Jurus 1 */}
        <InfoPanel
          bg={SKY_SOFT}
          padding={28}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em' }}>
              JURUS 1
            </span>
            <SectionHeading icon="speak" size={32}>
              Sebutkan <Highlight color="#DBEAFE">Pelan-Pelan</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${SKY}`,
              padding: 18,
              ...centerCol,
              gap: 16,
            }}
          >
            <div
              style={{
                padding: '10px 22px',
                borderRadius: 16,
                background: SUNNY_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              &ldquo;Merah... Kuning...&rdquo;
            </div>
            <div style={{ ...row, gap: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: CORAL, border: `3px solid ${CHARCOAL}` }} />
              <div style={{ width: 52, height: 52, borderRadius: 14, background: SUNNY, border: `3px solid ${CHARCOAL}` }} />
              <div style={{ width: 52, height: 52, borderRadius: 14, background: CORAL, border: `3px solid ${CHARCOAL}` }} />
              <div style={{ width: 52, height: 52, borderRadius: 14, background: SUNNY, border: `3px solid ${CHARCOAL}` }} />
            </div>
          </div>

          <BulletList
            bulletColor={SKY}
            fontSize={24}
            gap={10}
            items={[
              <>
                Ucapkan urutan <InlineHighlight color="#DBEAFE">dengan suara</InlineHighlight>.
              </>,
              <>
                Tebak <InlineHighlight>warna berikutnya</InlineHighlight>.
              </>,
            ]}
          />
        </InfoPanel>

        {/* Jurus 2 */}
        <InfoPanel
          bg={TEAL_SOFT}
          padding={28}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#047857', letterSpacing: '0.05em' }}>
              JURUS 2
            </span>
            <SectionHeading icon="mouse" size={32}>
              Geser <Highlight color="#A7F3D0">yang Cocok</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${TEAL}`,
              padding: 18,
              ...centerCol,
            }}
          >
            <svg width={270} height={160} viewBox="0 0 270 165" fill="none">
              <rect x="160" y="34" width="90" height="72" rx="18" fill={TEAL_SOFT} stroke={TEAL} strokeWidth={4} strokeDasharray="9 7" />
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
          </div>

          <BulletList
            bulletColor={TEAL}
            fontSize={24}
            gap={10}
            items={[
              <>
                Pilih gerbong <InlineHighlight color="#D1FAE5">paling tepat</InlineHighlight>.
              </>,
              <>
                Geser ke <InlineHighlight>kotak kosong</InlineHighlight>!
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </MacWindowCard>

    <div style={{ ...abs(1455, 330, 365, 580), ...centerCol, gap: 12 }}>
      <BikoMascot pose="thumbs-up" width={330} />
      <InfoPanel bg={SUNNY_SOFT} padding={14} style={{ borderRadius: 16 }}>
        <SectionHeading icon="thumbs-up" size={24}>
          Jempol Detektif!
        </SectionHeading>
      </InfoPanel>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Lengkapi Kereta Berpola!
// ============================================================================
const MISSION_BLOCKS: { num: number; color: string; soft: string; title: string; sub: string }[] = [
  { num: 1, color: SKY, soft: SKY_SOFT, title: 'Amati Pola', sub: 'Lihat urutannya' },
  { num: 2, color: SUNNY, soft: SUNNY_SOFT, title: 'Klik & Geser', sub: 'Gerbong yang pas' },
  { num: 3, color: TEAL, soft: TEAL_SOFT, title: 'TUT-TUT!', sub: 'Kereta siap jalan' },
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
    text: 'Geser atau klik gerbong yang cocok!',
  });

  const currentLevel = TRAIN_LEVELS[level];
  const isSolved = placed?.correct === true;

  const switchLevel = (next: 'warna' | 'bentuk') => {
    setLevel(next);
    setPlaced(null);
    setFeedback({ text: 'Geser atau klik gerbong yang cocok!' });
  };

  const tryOption = (opt: TrainOption) => {
    if (opt.correct) {
      setPlaced(opt);
      setFeedback({ icon: 'train', text: 'TUT-TUT! Kereta berpola siap jalan!' });
    } else {
      setFeedback({ icon: 'thinking', text: `${opt.label} belum pas! Cek lagi ya!` });
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

      {/* Top Row: 3 Flat Instruction Panels */}
      <div style={{ ...abs(X0, 205, W, 150), ...row, justifyContent: 'space-between', gap: 18 }}>
        {MISSION_BLOCKS.map((blk, i) => (
          <Fragment key={blk.num}>
            <InfoPanel
              bg={blk.soft}
              padding={20}
              style={{
                flex: 1,
                height: 144,
                ...row,
                gap: 18,
              }}
            >
              <StepNumberBadge num={blk.num} color={blk.color} size={58} />
              <div>
                <SectionHeading size={30}>{blk.title}</SectionHeading>
                <div style={{ fontSize: 22, fontWeight: 800, color: MUTED, marginTop: 4 }}>{blk.sub}</div>
              </div>
            </InfoPanel>

            {i < 2 && <JuniorIcon name="arrow-right" size={32} />}
          </Fragment>
        ))}
      </div>

      {/* Bottom Interactive Train Pattern Game */}
      <MacWindowCard left={X0} top={385} width={1320} height={585} headerLabel="game-kereta-berpola" padding={22}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
            background: 'linear-gradient(180deg, #E0F2FE 0%, #FFFBEB 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            padding: '16px 24px',
            boxSizing: 'border-box',
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
                  borderRadius: 14,
                  background: level === 'warna' ? CORAL : WHITE,
                  color: level === 'warna' ? WHITE : CHARCOAL,
                  border: `2.5px solid ${CHARCOAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
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
                  borderRadius: 14,
                  background: level === 'bentuk' ? TEAL : WHITE,
                  color: level === 'bentuk' ? WHITE : CHARCOAL,
                  border: `2.5px solid ${CHARCOAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
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
                borderRadius: 14,
                background: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                boxShadow: `0 4px 0 ${CHARCOAL}`,
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

          {/* Draggable / Clickable Wagon Choices + Flat Feedback */}
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
                    borderRadius: 18,
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
                borderRadius: 16,
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

      {/* Waving / Jumping Biko on Right */}
      <div style={{ ...abs(1455, 420, 365, 530), ...centerCol, gap: 10 }}>
        <BikoMascot pose={isSolved ? 'jump' : 'wave'} width={300} />
        <InfoPanel bg={isSolved ? TEAL_SOFT : SUNNY_SOFT} padding={12} style={{ borderRadius: 16, paddingLeft: 20, paddingRight: 20 }}>
          <SectionHeading icon={isSolved ? 'train' : 'magnifier'} size={22}>
            {isSolved ? 'TUT-TUT!' : 'Ayo Lengkapi!'}
          </SectionHeading>
        </InfoPanel>
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

      <SlideTitle align="center" top={104} size={58}>
        Hebat! Kamu <Highlight color={STABILO}>Detektif Ulung!</Highlight>
      </SlideTitle>

      {/* Center Celebration & Recap Card */}
      <MacWindowCard left={170} top={210} width={1180} height={745} headerLabel="lencana-pertemuan-4" padding={36}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '430px 1fr', gap: 36, alignItems: 'center' }}>
          {/* Left: Gold Medal + Flat Achievement Banner */}
          <div style={{ ...centerCol, gap: 22 }}>
            <svg width={260} height={250} viewBox="0 0 260 250" fill="none">
              <path d="M90 156 L66 238 L104 218 L122 240 L122 156 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M170 156 L194 238 L156 218 L138 240 L138 156 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="130" cy="98" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="130" cy="98" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={3.5} />
              <rect x="82" y="84" width="34" height="36" rx="8" fill={SKY} stroke={CHARCOAL} strokeWidth={3} />
              <rect x="112" y="94" width="44" height="26" rx="8" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
              <rect x="140" y="78" width="12" height="16" rx="4" fill={CHARCOAL} />
              <circle cx="98" cy="126" r="8" fill={CHARCOAL} />
              <circle cx="124" cy="126" r="8" fill={CHARCOAL} />
              <circle cx="146" cy="126" r="8" fill={CHARCOAL} />
              <path
                d="M164 56 L168 65 L178 66 L171 73 L173 83 L164 78 L155 83 L157 73 L150 66 L160 65 Z"
                fill={CORAL}
                stroke={CHARCOAL}
                strokeWidth={2.5}
                strokeLinejoin="round"
              />
            </svg>

            <InfoPanel bg={SUNNY_SOFT} padding={14} style={{ borderRadius: 16, paddingLeft: 22, paddingRight: 22 }}>
              <SectionHeading icon="medal" size={25}>
                Lencana Detektif Pola
              </SectionHeading>
            </InfoPanel>
          </div>

          {/* Right: Concise Bullet Takeaways + Mini Train Pattern Recap */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHeading icon="trophy" size={32}>
              Yang Sudah Kamu Kuasai:
            </SectionHeading>

            <BulletList
              bulletColor={TEAL}
              fontSize={26}
              gap={16}
              items={[
                <>
                  Menebak <InlineHighlight>pola warna</InlineHighlight> yang berulang.
                </>,
                <>
                  Mengenali <InlineHighlight color="#D1FAE5">pola bentuk</InlineHighlight> yang teratur.
                </>,
                <>
                  Melengkapi <InlineHighlight color={SKY_SOFT}>gerbong kereta</InlineHighlight> dengan tepat.
                </>,
              ]}
            />

            <InfoPanel bg={SKY_SOFT} borderColor={SKY} padding={16}>
              <div style={{ ...row, justifyContent: 'center', gap: 14 }}>
                <div style={{ width: 54, height: 44, borderRadius: 12, background: CORAL, border: `3px solid ${CHARCOAL}` }} />
                <JuniorIcon name="arrow-right" size={24} />
                <div style={{ width: 54, height: 44, borderRadius: 12, background: SUNNY, border: `3px solid ${CHARCOAL}` }} />
                <JuniorIcon name="arrow-right" size={24} />
                <div style={{ width: 54, height: 44, borderRadius: 12, background: TEAL, border: `3px solid ${CHARCOAL}` }} />
              </div>
            </InfoPanel>
          </div>
        </div>
      </MacWindowCard>

      {/* Celebrating Jumping Biko on Right */}
      <div style={{ ...abs(1390, 385, 420, 520), ...centerCol }}>
        <BikoMascot pose="jump" width={365} />
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
Bintang — Hati — Bintang — Hati — [ ? ]. Pilihan A (Bintang) atau Pilihan B (Hati)?`,

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

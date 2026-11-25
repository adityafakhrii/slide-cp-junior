import { Fragment, useState, type CSSProperties, type DragEvent, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';
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
  transform: translateY(-3px);
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
// Reusable Flat-Vector Illustrations (Puzzle, Cursor, Toothbrush, Bread)
// ============================================================================
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
      borderRadius: 22,
      background: color,
      border: `3px solid ${CHARCOAL}`,
      boxShadow: CARD_SHADOW,
      ...centerCol,
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: -12,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 26,
        height: 14,
        borderRadius: '14px 14px 0 0',
        background: color,
        border: `3px solid ${CHARCOAL}`,
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
        <rect x="24" y="88" width="102" height="18" rx="9" fill={SKY} stroke={CHARCOAL} strokeWidth={3.5} />
        <rect x="86" y="70" width="36" height="18" rx="6" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
        <line x1="94" y1="70" x2="94" y2="88" stroke={SKY} strokeWidth={2.5} />
        <line x1="104" y1="70" x2="104" y2="88" stroke={SKY} strokeWidth={2.5} />
        <line x1="114" y1="70" x2="114" y2="88" stroke={SKY} strokeWidth={2.5} />
        <path
          d="M84 68 C86 52, 108 50, 120 60 C124 64, 120 70, 110 70 H88 Z"
          fill={TEAL}
          stroke={CHARCOAL}
          strokeWidth={3}
        />
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
        <path
          d="M42 42 C42 26, 62 24, 75 34 C88 24, 108 26, 108 42 C112 68, 104 114, 92 118 C82 120, 80 96, 75 96 C70 96, 68 120, 58 118 C46 114, 38 68, 42 42 Z"
          fill={WHITE}
          stroke={CHARCOAL}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <circle cx="62" cy="58" r="4" fill={CHARCOAL} />
        <circle cx="88" cy="58" r="4" fill={CHARCOAL} />
        <path d="M64 72 Q75 82 86 72" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" />
        <circle cx="34" cy="56" r="14" fill="#E0F2FE" stroke={CHARCOAL} strokeWidth={3} />
        <circle cx="48" cy="36" r="11" fill="#E0F2FE" stroke={CHARCOAL} strokeWidth={3} />
        <circle cx="114" cy="50" r="13" fill="#E0F2FE" stroke={CHARCOAL} strokeWidth={3} />
        <circle cx="104" cy="32" r="10" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
        <rect x="14" y="78" width="74" height="14" rx="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} transform="rotate(-14 14 78)" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
      <path d="M22 52 H72 L65 120 H29 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
      <path d="M26 76 H68 L63 116 H31 Z" fill={SKY} />
      <path d="M48 22 C54 32, 58 38, 48 44 C38 38, 42 32, 48 22 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={2.5} />
      <path
        d="M84 54 C84 42, 98 40, 108 48 C118 40, 132 42, 132 54 C134 74, 128 106, 120 110 C114 112, 112 96, 108 96 C104 96, 102 112, 96 110 C88 106, 82 74, 84 54 Z"
        fill={WHITE}
        stroke={CHARCOAL}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      <path d="M98 76 Q108 86 118 76" stroke={TEAL} strokeWidth={3.5} strokeLinecap="round" />
      <path d="M124 22 L128 32 L138 36 L128 40 L124 50 L120 40 L110 36 L120 32 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
    </svg>
  );
};

const BreadStepArt = ({ step, size = 140 }: { step: 1 | 2 | 3; size?: number }) => {
  if (step === 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
        <ellipse cx="75" cy="112" rx="58" ry="18" fill="#E2E8F0" stroke={CHARCOAL} strokeWidth={3.5} />
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
        <ellipse cx="75" cy="116" rx="58" ry="16" fill="#E2E8F0" stroke={CHARCOAL} strokeWidth={3.5} />
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
        <path
          d="M50 66 C56 54, 94 54, 100 66 C102 78, 96 98, 75 98 C54 98, 48 80, 50 66 Z"
          fill={CHOCO}
          stroke={CHARCOAL}
          strokeWidth={3}
        />
        <g transform="translate(86, 18) rotate(26)">
          <rect x="0" y="24" width="12" height="44" rx="6" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
          <ellipse cx="6" cy="16" rx="11" ry="16" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
        </g>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
      <ellipse cx="75" cy="118" rx="60" ry="16" fill="#E2E8F0" stroke={CHARCOAL} strokeWidth={3.5} />
      <rect x="28" y="88" width="94" height="24" rx="10" fill={BREAD_CRUST} stroke={CHARCOAL} strokeWidth={4} />
      <path d="M28 84 Q52 94 75 84 Q98 94 122 84 V92 H28 Z" fill={CHOCO} stroke={CHARCOAL} strokeWidth={3} />
      <path
        d="M28 66 C28 48, 122 48, 122 66 V84 H28 Z"
        fill={BREAD_INNER}
        stroke={CHARCOAL}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path d="M28 66 C28 48, 122 48, 122 66" stroke={BREAD_CRUST} strokeWidth={8} strokeLinecap="round" />
      <path d="M124 26 L128 35 L137 39 L128 43 L124 52 L120 43 L111 39 L120 35 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
      <circle cx="32" cy="36" r="7" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.5} />
    </svg>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (H1 + InfoPanel BulletList + Visual Showcase)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 3" accentDot={SUNNY}>
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
            margin: 0,
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.35,
            color: MUTED,
          }}
        >
          Susun Urutan Sikat Gigi &amp; Buat Roti di Layar
        </p>

        <InfoPanel bg={WHITE} padding={26} style={{ marginTop: 4 }}>
          <SectionHeading icon="puzzle" size={26}>
            Yang Akan Kita Pelajari:
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={24}
              gap={12}
              items={[
                <>
                  <InlineHighlight>Pecah misi besar</InlineHighlight> jadi langkah kecil.
                </>,
                <>
                  Susun urutan <InlineHighlight color="#D1FAE5">1, 2, lalu 3</InlineHighlight>.
                </>,
                <>
                  Jago jurus <InlineHighlight color={SKY_SOFT}>Klik, Tahan, Geser</InlineHighlight>.
                </>,
              ]}
            />
          </div>
        </InfoPanel>
      </div>

      {/* Right Visual Showcase: Flat Puzzle-Board + Drag & Drop Preview + Biko */}
      <div style={{ ...abs(980, 155, 840, 795), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 630,
            height: 600,
            borderRadius: 48,
            background: TEAL_SOFT,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: CARD_SHADOW,
            transform: 'rotate(-2deg)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: -30,
              top: '44%',
              width: 32,
              height: 76,
              borderRadius: '0 38px 38px 0',
              background: TEAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              borderLeft: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -30,
              left: '44%',
              width: 76,
              height: 32,
              borderRadius: '0 0 38px 38px',
              background: TEAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              borderTop: 'none',
            }}
          />
        </div>

        {/* Flat Mini Drag & Drop Preview Card */}
        <InfoPanel
          bg={WHITE}
          padding={18}
          style={{
            position: 'relative',
            zIndex: 4,
            width: 440,
            marginBottom: 16,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 12 }}>
            <SectionHeading icon="puzzle" size={20}>
              Puzzle Urutan
            </SectionHeading>
            <span
              style={{
                padding: '4px 12px',
                borderRadius: 10,
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

          <div style={{ ...row, justifyContent: 'space-between', gap: 14, paddingTop: 10 }}>
            <div
              style={{
                position: 'relative',
                animation: live ? 'cpj3-drag-slide 3.2s ease-in-out infinite' : undefined,
                zIndex: 5,
              }}
            >
              <PuzzleTileSvg color={SKY_SOFT} size={92}>
                <JuniorIcon name="toothbrush" size={44} />
              </PuzzleTileSvg>
              <div style={{ position: 'absolute', right: -14, bottom: -14 }}>
                <CursorHandSvg grabbing size={40} />
              </div>
            </div>

            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 22,
                background: TEAL_SOFT,
                border: `3px dashed ${TEAL}`,
                ...centerCol,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
                color: TEAL,
              }}
            >
              1
            </div>

            <PuzzleTileSvg color={SUNNY_SOFT} size={92}>
              <JuniorIcon name="sandwich" size={44} />
            </PuzzleTileSvg>
          </div>
        </InfoPanel>

        <BikoMascot
          pose="cover-laptop"
          width={390}
          style={{ position: 'relative', zIndex: 2 }}
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

    <MacWindowCard left={X0} top={215} width={1320} height={745} headerLabel="daftar-misi-3" padding={34}>
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
            <SectionHeading icon="mouse" size={32}>
              Jurus <Highlight color={STABILO}>Drag &amp; Drop</Highlight>
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
            <svg width={270} height={175} viewBox="0 0 260 175" fill="none">
              <rect x="150" y="34" width="90" height="90" rx="20" fill={TEAL_SOFT} stroke={TEAL} strokeWidth={4} strokeDasharray="10 8" />
              <text x="195" y="90" textAnchor="middle" fontFamily='"Fredoka", sans-serif' fontSize="32" fontWeight="700" fill={TEAL}>
                PAS!
              </text>
              <path d="M98 78 H142" stroke={CHARCOAL} strokeWidth={4} strokeDasharray="7 6" strokeLinecap="round" />
              <path d="M132 68 L144 78 L132 88" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
              <rect x="18" y="34" width="82" height="82" rx="20" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} />
              <circle cx="59" cy="28" r="13" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} />
              <path
                d="M59 54 L63.5 64 L74.5 65.5 L66.5 73 L68.5 84 L59 78.5 L49.5 84 L51.5 73 L43.5 65.5 L54.5 64 Z"
                fill={WHITE}
                stroke={CHARCOAL}
                strokeWidth={3}
                strokeLinejoin="round"
              />
              <rect x="44" y="102" width="44" height="36" rx="14" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} />
            </svg>
          </div>

          <BulletList
            bulletColor={SKY}
            fontSize={24}
            gap={10}
            items={[
              <>
                <InlineHighlight color="#DBEAFE">Klik &amp; tahan</InlineHighlight> gambar di layar.
              </>,
              <>
                <InlineHighlight>Geser pelan</InlineHighlight> ke kotak tujuan.
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
            <SectionHeading icon="scissors" size={32}>
              Pecah <Highlight color="#A7F3D0">Misi Besar</Highlight>
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
            <svg width={270} height={175} viewBox="0 0 270 175" fill="none">
              <rect x="14" y="16" width="242" height="48" rx="14" fill={CORAL_SOFT} stroke={CORAL} strokeWidth={3.5} />
              <text x="135" y="47" textAnchor="middle" fontFamily='"Fredoka", sans-serif' fontSize="22" fontWeight="700" fill={CHARCOAL}>
                MISI BESAR
              </text>
              <path d="M135 64 V94 M135 79 H48 V94 M135 79 H222 V94" stroke={CHARCOAL} strokeWidth={3.5} strokeDasharray="6 5" />
              {[
                { x: 16, n: '1', bg: SKY },
                { x: 103, n: '2', bg: SUNNY },
                { x: 190, n: '3', bg: TEAL },
              ].map((b) => (
                <g key={b.n}>
                  <rect x={b.x} y="96" width="64" height="64" rx="16" fill={b.bg} stroke={CHARCOAL} strokeWidth={3.5} />
                  <text
                    x={b.x + 32}
                    y="139"
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
          </div>

          <BulletList
            bulletColor={TEAL}
            fontSize={24}
            gap={10}
            items={[
              <>
                Bagi tugas jadi <InlineHighlight color="#D1FAE5">langkah kecil</InlineHighlight>.
              </>,
              <>
                Susun urut <InlineHighlight>1, 2, lalu 3</InlineHighlight>!
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </MacWindowCard>

    {/* Biko on Right with flat caption */}
    <div style={{ ...abs(1445, 310, 375, 620), ...centerCol, gap: 12 }}>
      <BikoMascot pose="point-left" width={350} />
      <InfoPanel bg={SUNNY_SOFT} padding={14} style={{ borderRadius: 16 }}>
        <SectionHeading icon="sparkle" size={24}>
          Ayo Pecahkan!
        </SectionHeading>
      </InfoPanel>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Rahasia Coder #1: Pecah Misi Jadi Kecil!
// ============================================================================
const Slide03PecahMisi: Page = () => {
  const [split, setSplit] = useState(true);

  return (
    <JuniorFrame badge="RAHASIA CODER #1" accentDot={SUNNY}>
      <SlideTitle>
        <Highlight>Pecah Misi</Highlight> Jadi Kecil!
      </SlideTitle>

      {/* Left Interactive Demo inside MacWindowCard */}
      <MacWindowCard left={X0} top={215} width={980} height={745} headerLabel="rahasia-dekomposisi" padding={26}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
            background: 'linear-gradient(180deg, #FEF9C3 0%, #ECFDF5 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 28px',
            boxSizing: 'border-box',
          }}
        >
          <SectionHeading icon="puzzle" size={30}>
            {split ? 'Dipecah Jadi 3 Langkah Kecil:' : '1 Misi Besar Masih Utuh:'}
          </SectionHeading>

          <div style={{ ...row, gap: 20, justifyContent: 'center', flex: 1 }}>
            {!split ? (
              <InfoPanel
                bg={CORAL}
                padding={32}
                style={{
                  width: 560,
                  height: 300,
                  ...centerCol,
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', left: '33%', top: 16, bottom: 16, borderLeft: `4px dashed ${WHITE}`, opacity: 0.7 }} />
                <div style={{ position: 'absolute', left: '66%', top: 16, bottom: 16, borderLeft: `4px dashed ${WHITE}`, opacity: 0.7 }} />
                <JuniorIcon name="puzzle" size={72} />
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 42, fontWeight: 700, color: WHITE, marginTop: 12 }}>
                  1 Misi Raksasa!
                </span>
              </InfoPanel>
            ) : (
              <div style={{ ...row, gap: 18 }}>
                {(
                  [
                    { n: 1, color: SKY, text: 'Siapkan', icon: 'toothbrush' },
                    { n: 2, color: SUNNY, text: 'Gosok', icon: 'teeth' },
                    { n: 3, color: TEAL, text: 'Kumur', icon: 'water' },
                  ] as const
                ).map((item, idx) => (
                  <Fragment key={item.n}>
                    <InfoPanel
                      bg={WHITE}
                      padding={20}
                      style={{
                        width: 215,
                        height: 270,
                        ...centerCol,
                        justifyContent: 'space-between',
                      }}
                    >
                      <StepNumberBadge num={item.n} color={item.color} size={58} />
                      <JuniorIcon name={item.icon} size={74} />
                      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                        {item.text}
                      </span>
                    </InfoPanel>
                    {idx < 2 && <JuniorIcon name="arrow-right" size={32} />}
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
              ...row,
              gap: 10,
              padding: '14px 30px',
              borderRadius: 18,
              background: split ? SUNNY : TEAL,
              color: split ? CHARCOAL : WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 5px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 25,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name={split ? 'reset' : 'scissors'} size={24} />
            <span>{split ? 'Lihat Misi Utuh' : 'Pecah Jadi 3 Langkah!'}</span>
          </button>
        </div>
      </MacWindowCard>

      {/* Right Column: Bullet Explanation + Biko */}
      <div style={{ ...abs(1115, 215, 705, 745), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <InfoPanel bg={WHITE} borderColor={CORAL} padding={26}>
          <SectionHeading icon="warning" size={28} accentColor="#B91C1C">
            Kalau Terlalu Besar:
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={CORAL}
              fontSize={25}
              gap={10}
              items={[
                <>
                  Misi besar terasa <InlineHighlight color="#FEE2E2">sulit</InlineHighlight>.
                </>,
                <>
                  Kita jadi <InlineHighlight color="#FEE2E2">bingung mulai</InlineHighlight>.
                </>,
              ]}
            />
          </div>
        </InfoPanel>

        <InfoPanel bg={WHITE} borderColor={TEAL} padding={26}>
          <SectionHeading icon="sparkle" size={28} accentColor="#047857">
            Jurus Coder Hebat:
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={25}
              gap={10}
              items={[
                <>
                  Pecah jadi <InlineHighlight color="#D1FAE5">langkah kecil</InlineHighlight>.
                </>,
                <>
                  Mulai dari <InlineHighlight>nomor 1</InlineHighlight> dulu!
                </>,
              ]}
            />
          </div>
        </InfoPanel>

        <div style={{ ...row, justifyContent: 'space-between', alignItems: 'center' }}>
          <InfoPanel bg={SUNNY_SOFT} padding={20} style={{ maxWidth: 370 }}>
            <SectionHeading icon="tap" size={24}>
              Mulai Langkah 1!
            </SectionHeading>
          </InfoPanel>
          <BikoMascot pose="point-left" width={285} />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus Tangkas Baru: Drag & Drop!
// ============================================================================
const DRAG_STEPS: { num: number; color: string; soft: string; icon: JuniorIconName; title: string; desc: string }[] = [
  { num: 1, color: SKY, soft: SKY_SOFT, icon: 'tap', title: 'Klik & Tahan', desc: 'Tombol kiri' },
  { num: 2, color: SUNNY, soft: SUNNY_SOFT, icon: 'arrow-right', title: 'Geser Pelan', desc: 'Ke kotak tujuan' },
  { num: 3, color: TEAL, soft: TEAL_SOFT, icon: 'hand', title: 'Lepas Jari', desc: 'Masuk pas!' },
];

const Slide04DragDrop: Page = () => {
  const live = useIsActivePage();
  const [phase, setPhase] = useState<1 | 2 | 3>(2);

  return (
    <JuniorFrame badge="JURUS TANGKAS BARU" accentDot={SKY}>
      <SlideTitle>
        Jurus <Highlight>Drag &amp; Drop!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={215} width={W} height={745} headerLabel="tutorial-drag-and-drop" padding={30}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <SectionHeading icon="mouse" size={28}>
              Klik Angka untuk Lihat Caranya:
            </SectionHeading>
            <BulletList
              bulletColor={TEAL}
              fontSize={22}
              gap={4}
              items={[
                <>
                  Ikuti urutan <InlineHighlight>1 - 2 - 3</InlineHighlight> dengan rapi!
                </>,
              ]}
            />
          </div>

          {/* 3 Interactive Step Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 26 }}>
            {DRAG_STEPS.map((st) => {
              const active = phase === st.num;
              return (
                <button
                  key={st.num}
                  type="button"
                  className="cpj3-card-btn"
                  onClick={() => setPhase(st.num as 1 | 2 | 3)}
                  style={{
                    borderRadius: 24,
                    background: active ? st.soft : WHITE,
                    border: `4px solid ${active ? CHARCOAL : BORDER_SOFT}`,
                    boxShadow: active ? `0 7px 0 ${st.color}` : `0 4px 0 ${BORDER_SOFT}`,
                    padding: '18px 22px',
                    ...row,
                    gap: 16,
                    textAlign: 'left',
                  }}
                >
                  <StepNumberBadge num={st.num} color={st.color} size={58} />
                  <div>
                    <div style={{ ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                      <JuniorIcon name={st.icon} size={28} />
                      <span>{st.title}</span>
                    </div>
                    <div style={{ fontSize: 21, fontWeight: 800, color: MUTED, marginTop: 4 }}>{st.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 3 Interactive Visual Demonstration Buttons */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: '#FFFDF7',
              border: `2.5px dashed #D6CDBB`,
              padding: '20px 26px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 24,
            }}
          >
            {/* Phase 1 */}
            <button
              type="button"
              className="cpj3-card-btn"
              onClick={() => setPhase(1)}
              style={{
                borderRadius: 22,
                background: phase === 1 ? SKY_SOFT : WHITE,
                border: `3.5px solid ${phase === 1 ? SKY : CHARCOAL}`,
                boxShadow: `0 6px 0 ${phase === 1 ? SKY : CHARCOAL}`,
                padding: 16,
                ...centerCol,
                justifyContent: 'space-between',
              }}
            >
              <svg width={205} height={180} viewBox="0 0 210 185" fill="none">
                <rect x="52" y="28" width="106" height="142" rx="53" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
                <path d="M55 88 C55 52, 76 31, 105 31 V94 H55 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
                <path d="M155 88 C155 52, 134 31, 105 31 V94 H155 Z" fill="#F1F5F9" stroke={CHARCOAL} strokeWidth={3.5} />
                <rect x="97" y="46" width="16" height="30" rx="8" fill={CHARCOAL} />
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
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700, color: CHARCOAL }}>
                1. Tekan &amp; Tahan
              </span>
            </button>

            {/* Phase 2 */}
            <button
              type="button"
              className="cpj3-card-btn"
              onClick={() => setPhase(2)}
              style={{
                borderRadius: 22,
                background: phase === 2 ? SUNNY_SOFT : WHITE,
                border: `3.5px solid ${phase === 2 ? SUNNY : CHARCOAL}`,
                boxShadow: `0 6px 0 ${phase === 2 ? SUNNY : CHARCOAL}`,
                padding: 16,
                ...centerCol,
                justifyContent: 'space-between',
              }}
            >
              <svg width={250} height={180} viewBox="0 0 260 185" fill="none">
                <path d="M50 112 Q130 58 206 86" stroke={SKY} strokeWidth={6} strokeDasharray="10 8" strokeLinecap="round" />
                <rect x="174" y="44" width="72" height="72" rx="18" fill={TEAL_SOFT} stroke={TEAL} strokeWidth={3.5} strokeDasharray="8 6" />
                <g transform="translate(86, 48)">
                  <rect x="0" y="0" width="66" height="66" rx="16" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
                  <path
                    d="M33 14 L38 25 L50 27 L41 35 L43 47 L33 41 L23 47 L25 35 L16 27 L28 25 Z"
                    fill={WHITE}
                    stroke={CHARCOAL}
                    strokeWidth={2.8}
                    strokeLinejoin="round"
                  />
                  <rect x="26" y="48" width="34" height="28" rx="12" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3} />
                </g>
              </svg>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700, color: CHARCOAL }}>
                2. Geser Pelan
              </span>
            </button>

            {/* Phase 3 */}
            <button
              type="button"
              className="cpj3-card-btn"
              onClick={() => setPhase(3)}
              style={{
                borderRadius: 22,
                background: phase === 3 ? TEAL_SOFT : WHITE,
                border: `3.5px solid ${phase === 3 ? TEAL : CHARCOAL}`,
                boxShadow: `0 6px 0 ${phase === 3 ? TEAL : CHARCOAL}`,
                padding: 16,
                ...centerCol,
                justifyContent: 'space-between',
              }}
            >
              <svg width={230} height={180} viewBox="0 0 240 185" fill="none">
                <rect x="74" y="46" width="92" height="92" rx="22" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} />
                <rect x="84" y="56" width="72" height="72" rx="16" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
                <path
                  d="M120 71 L126 84 L140 86 L130 96 L132 110 L120 103 L108 110 L110 96 L100 86 L114 84 Z"
                  fill={WHITE}
                  stroke={CHARCOAL}
                  strokeWidth={3}
                  strokeLinejoin="round"
                />
                <path d="M180 28 L184 38 L194 42 L184 46 L180 56 L176 46 L166 42 L176 38 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
                <text x="52" y="44" fontFamily='"Fredoka", sans-serif' fontSize="24" fontWeight="700" fill={TEAL}>
                  PAS!
                </text>
              </svg>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700, color: '#065F46' }}>
                3. Lepas Jari: Pas!
              </span>
            </button>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Latihan Logika #1: Urutan Sikat Gigi
// ============================================================================
const TOOTH_STEPS: {
  num: number;
  step: 1 | 2 | 3;
  color: string;
  soft: string;
  title: string;
  bullet: ReactNode;
}[] = [
  {
    num: 1,
    step: 1,
    color: SKY,
    soft: SKY_SOFT,
    title: 'Siapkan Sikat',
    bullet: (
      <>
        Taruh <InlineHighlight color={SKY_SOFT}>pasta gigi</InlineHighlight>.
      </>
    ),
  },
  {
    num: 2,
    step: 2,
    color: SUNNY,
    soft: SUNNY_SOFT,
    title: 'Gosok Gigi',
    bullet: (
      <>
        Gosok sampai <InlineHighlight>berbusa</InlineHighlight>.
      </>
    ),
  },
  {
    num: 3,
    step: 3,
    color: TEAL,
    soft: TEAL_SOFT,
    title: 'Kumur Air',
    bullet: (
      <>
        Gigi <InlineHighlight color="#D1FAE5">bersih kinclong</InlineHighlight>!
      </>
    ),
  },
];

const Slide05SikatGigi: Page = () => (
  <JuniorFrame badge="MISI PUZZLE #1" accentDot={SKY}>
    <SlideTitle>
      Urutan <Highlight>Sikat Gigi</Highlight> Pagi
    </SlideTitle>

    {/* 3 Horizontal Flat Sequence Cards */}
    <div style={{ ...abs(X0, 225, W, 625), ...row, justifyContent: 'space-between', gap: 22 }}>
      {TOOTH_STEPS.map((item, idx) => (
        <Fragment key={item.num}>
          <InfoPanel
            bg={WHITE}
            borderColor={CHARCOAL}
            padding={30}
            style={{
              flex: 1,
              height: '100%',
              ...centerCol,
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <StepNumberBadge num={item.num} color={item.color} size={70} />

            <div
              style={{
                width: 250,
                height: 220,
                borderRadius: 26,
                background: item.soft,
                border: `3px solid ${item.color}`,
                ...centerCol,
              }}
            >
              <ToothbrushStepArt step={item.step} size={185} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <SectionHeading size={34}>{item.title}</SectionHeading>
              <BulletList bulletColor={item.color} fontSize={25} gap={6} items={[item.bullet]} />
            </div>
          </InfoPanel>

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

    {/* Bottom Flat Summary Strip */}
    <div style={{ ...abs(X0, 882, W, 92), ...row, justifyContent: 'center' }}>
      <InfoPanel bg={STABILO} padding={16} style={{ borderRadius: 20, paddingLeft: 32, paddingRight: 32 }}>
        <div style={{ ...row, gap: 14, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
          <span>Urutan selalu 1</span>
          <JuniorIcon name="arrow-right" size={26} />
          <span>2</span>
          <JuniorIcon name="arrow-right" size={26} />
          <span>3 supaya gigi bersih!</span>
        </div>
      </InfoPanel>
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
      <SlideTitle align="center" top={114}>
        Mana Langkah <Highlight>Pertama</Highlight> Sikat Gigi?
      </SlideTitle>

      {/* Two Big Interactive Choice Buttons */}
      <div style={{ ...abs(160, 225, 1600, 445), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        <button
          type="button"
          className="cpj3-card-btn"
          onClick={() => setChoice('A')}
          style={{
            borderRadius: 30,
            background: choice === 'A' ? CORAL_SOFT : WHITE,
            border: `4px solid ${choice === 'A' ? CORAL : CHARCOAL}`,
            boxShadow: `0 9px 0 ${choice === 'A' ? CORAL : SKY}`,
            padding: '26px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              padding: '8px 24px',
              borderRadius: 14,
              background: SKY_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            PILIHAN A
          </span>

          <ToothbrushStepArt step={3} size={195} />

          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 42, fontWeight: 700, color: CHARCOAL }}>
            Kumur Air
          </span>
        </button>

        <button
          type="button"
          className="cpj3-card-btn"
          onClick={() => setChoice('B')}
          style={{
            borderRadius: 30,
            background: choice === 'B' ? TEAL_SOFT : WHITE,
            border: `4px solid ${choice === 'B' ? TEAL : CHARCOAL}`,
            boxShadow: `0 9px 0 ${choice === 'B' ? TEAL : SUNNY}`,
            padding: '26px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              padding: '8px 24px',
              borderRadius: 14,
              background: SUNNY,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            PILIHAN B
          </span>

          <ToothbrushStepArt step={1} size={195} />

          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 42, fontWeight: 700, color: CHARCOAL }}>
            Siapkan Sikat
          </span>
        </button>
      </div>

      {/* Bottom: Question Biko + Flat Feedback Panel */}
      <div style={{ ...abs(240, 695, 1440, 290), ...row, justifyContent: 'center', gap: 36 }}>
        <BikoMascot pose="question" width={235} />

        <InfoPanel
          bg={choice === 'B' ? TEAL_SOFT : choice === 'A' ? CORAL_SOFT : STABILO}
          borderColor={choice === 'B' ? TEAL : choice === 'A' ? CORAL : CHARCOAL}
          padding={28}
          style={{ minWidth: 580, ...row, justifyContent: 'center', gap: 14 }}
        >
          {choice === 'B' && (
            <SectionHeading icon="check" size={34} accentColor="#065F46">
              BENAR! Siapkan Sikat dulu!
            </SectionHeading>
          )}
          {choice === 'A' && (
            <SectionHeading icon="thinking" size={34} accentColor="#991B1B">
              Kumur Air itu langkah terakhir!
            </SectionHeading>
          )}
          {choice === null && (
            <SectionHeading icon="point-right" size={34}>
              Klik gambar langkah ke-1 ya!
            </SectionHeading>
          )}
        </InfoPanel>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Latihan Logika #2: Ayo Buat Roti Enak!
// ============================================================================
const BREAD_STEPS: {
  num: number;
  step: 1 | 2 | 3;
  color: string;
  soft: string;
  title: string;
  bullet: ReactNode;
}[] = [
  {
    num: 1,
    step: 1,
    color: SKY,
    soft: SKY_SOFT,
    title: 'Ambil Roti',
    bullet: (
      <>
        Siapkan <InlineHighlight color={SKY_SOFT}>roti tawar</InlineHighlight>.
      </>
    ),
  },
  {
    num: 2,
    step: 2,
    color: SUNNY,
    soft: SUNNY_SOFT,
    title: 'Oles Selai',
    bullet: (
      <>
        Oles <InlineHighlight>selai cokelat</InlineHighlight>.
      </>
    ),
  },
  {
    num: 3,
    step: 3,
    color: TEAL,
    soft: TEAL_SOFT,
    title: 'Tutup Roti',
    bullet: (
      <>
        Roti <InlineHighlight color="#D1FAE5">siap dimakan</InlineHighlight>!
      </>
    ),
  },
];

const Slide07BuatRoti: Page = () => (
  <JuniorFrame badge="MISI PUZZLE #2" accentDot={SUNNY}>
    <SlideTitle>
      Ayo <Highlight>Buat Roti</Highlight> Enak!
    </SlideTitle>

    {/* 3 Horizontal Sequence InfoPanels */}
    <div style={{ ...abs(X0, 225, 1340, 695), ...row, justifyContent: 'space-between', gap: 18 }}>
      {BREAD_STEPS.map((item, idx) => (
        <Fragment key={item.num}>
          <InfoPanel
            bg={WHITE}
            borderColor={CHARCOAL}
            padding={26}
            style={{
              flex: 1,
              height: '100%',
              ...centerCol,
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <StepNumberBadge num={item.num} color={item.color} size={66} />

            <div
              style={{
                width: 220,
                height: 215,
                borderRadius: 24,
                background: item.soft,
                border: `3px solid ${item.color}`,
                ...centerCol,
              }}
            >
              <BreadStepArt step={item.step} size={178} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <SectionHeading size={32}>{item.title}</SectionHeading>
              <BulletList bulletColor={item.color} fontSize={24} gap={6} items={[item.bullet]} />
            </div>
          </InfoPanel>

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
    <div style={{ ...abs(1470, 300, 360, 620), ...centerCol, gap: 12 }}>
      <BikoMascot pose="chef" width={330} />
      <InfoPanel bg={SUNNY_SOFT} padding={14} style={{ borderRadius: 16 }}>
        <SectionHeading icon="sandwich" size={24}>
          Koki Biko!
        </SectionHeading>
      </InfoPanel>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 08 — Tips Jagoan Drag & Drop (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsDragDrop: Page = () => (
  <JuniorFrame badge="TIPS JAGOAN" accentDot={TEAL}>
    <SlideTitle>
      Rahasia Geser Biar <Highlight>Pas!</Highlight>
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
        <div style={{ ...row, justifyContent: 'space-between', borderBottom: `2.5px solid ${TEAL_SOFT}`, paddingBottom: 14 }}>
          <SectionHeading icon="check" size={36} accentColor="#047857">
            BOLEH Dilakukan
          </SectionHeading>
          <JuniorIcon name="thumbs-up" size={36} />
        </div>

        <div
          style={{
            borderRadius: 20,
            background: TEAL_SOFT,
            border: `2.5px solid ${TEAL}`,
            padding: '18px 26px',
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <svg width={240} height={115} viewBox="0 0 240 115" fill="none">
            <path d="M24 58 H118" stroke={TEAL} strokeWidth={5} strokeDasharray="8 6" strokeLinecap="round" />
            <path d="M108 48 L120 58 L108 68" stroke={TEAL} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            <rect x="132" y="14" width="88" height="88" rx="22" fill={WHITE} stroke={TEAL} strokeWidth={4} />
            <rect x="142" y="24" width="68" height="68" rx="16" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
            <path
              d="M176 38 L181 50 L194 52 L185 61 L187 74 L176 68 L165 74 L167 61 L158 52 L171 50 Z"
              fill={WHITE}
              stroke={CHARCOAL}
              strokeWidth={3}
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: '#065F46' }}>
            Masuk Tepat!
          </span>
        </div>

        <BulletList
          bulletColor={TEAL}
          fontSize={27}
          gap={18}
          items={[
            <>
              <InlineHighlight color="#D1FAE5">Tahan tombol</InlineHighlight> saat menggeser.
            </>,
            <>
              Geser <InlineHighlight color="#D1FAE5">pelan &amp; rapi</InlineHighlight> ke kotak.
            </>,
            <>
              Lepas jari saat <InlineHighlight>sudah pas</InlineHighlight>!
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
        <div style={{ ...row, justifyContent: 'space-between', borderBottom: `2.5px solid ${CORAL_SOFT}`, paddingBottom: 14 }}>
          <SectionHeading icon="cross" size={36} accentColor="#B91C1C">
            JANGAN Dilakukan
          </SectionHeading>
          <JuniorIcon name="warning" size={36} />
        </div>

        <div
          style={{
            borderRadius: 20,
            background: CORAL_SOFT,
            border: `2.5px solid ${CORAL}`,
            padding: '18px 26px',
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <svg width={240} height={115} viewBox="0 0 240 115" fill="none">
            <rect x="136" y="14" width="84" height="84" rx="22" fill={WHITE} stroke={CORAL} strokeWidth={4} strokeDasharray="8 6" />
            <g transform="translate(22, 34) rotate(-14)">
              <rect x="0" y="0" width="66" height="66" rx="16" fill="#FEE2E2" stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M21 21 L45 45 M45 21 L21 45" stroke={CORAL} strokeWidth={6} strokeLinecap="round" />
            </g>
            <path d="M96 42 L124 72" stroke={CORAL} strokeWidth={4} strokeDasharray="5 5" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: '#991B1B' }}>
            Jatuh di Luar!
          </span>
        </div>

        <BulletList
          bulletColor={CORAL}
          fontSize={27}
          gap={18}
          items={[
            <>
              Jangan <InlineHighlight color="#FECACA">lepas tombol</InlineHighlight> di tengah.
            </>,
            <>
              Jangan geser <InlineHighlight color="#FECACA">terlalu cepat</InlineHighlight>.
            </>,
            <>Jangan taruh di luar kotak.</>,
          ]}
        />
      </InfoPanel>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Susun Puzzle Urutan!
// ============================================================================
const MISSION_BLOCKS: { num: number; color: string; soft: string; title: string; sub: string }[] = [
  { num: 1, color: SKY, soft: SKY_SOFT, title: 'Klik & Tahan', sub: 'Pilih gambar' },
  { num: 2, color: SUNNY, soft: SUNNY_SOFT, title: 'Geser', sub: 'Ke kotak 1, 2, 3' },
  { num: 3, color: TEAL, soft: TEAL_SOFT, title: 'Lepas Jari', sub: 'Sampai pas!' },
];

type PuzzleItem = {
  id: string;
  order: number;
  icon: JuniorIconName;
  label: string;
  color: string;
};

const PUZZLE_SETS: Record<'gigi' | 'roti', { title: string; items: PuzzleItem[] }> = {
  gigi: {
    title: 'Urutan Sikat Gigi',
    items: [
      { id: 'g2', order: 2, icon: 'teeth', label: 'Gosok Gigi', color: SUNNY_SOFT },
      { id: 'g3', order: 3, icon: 'water', label: 'Kumur Air', color: TEAL_SOFT },
      { id: 'g1', order: 1, icon: 'toothbrush', label: 'Siapkan Sikat', color: SKY_SOFT },
    ],
  },
  roti: {
    title: 'Urutan Buat Roti',
    items: [
      { id: 'r3', order: 3, icon: 'sandwich', label: 'Tutup Roti', color: TEAL_SOFT },
      { id: 'r1', order: 1, icon: 'bread', label: 'Roti Tawar', color: SKY_SOFT },
      { id: 'r2', order: 2, icon: 'chocolate', label: 'Oles Selai', color: SUNNY_SOFT },
    ],
  },
};

const Slide09MisiPuzzle: Page = () => {
  const [mode, setMode] = useState<'gigi' | 'roti'>('gigi');
  const [slots, setSlots] = useState<(PuzzleItem | null)[]>([null, null, null]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ icon?: JuniorIconName; text: string }>({
    text: 'Geser gambar ke kotak 1, 2, 3!',
  });

  const currentItems = PUZZLE_SETS[mode].items;
  const placedIds = new Set(slots.filter((s): s is PuzzleItem => s !== null).map((s) => s.id));
  const remainingItems = currentItems.filter((item) => !placedIds.has(item.id));
  const completed = slots.every((s, idx) => s !== null && s.order === idx + 1);

  const switchMode = (next: 'gigi' | 'roti') => {
    setMode(next);
    setSlots([null, null, null]);
    setSelectedId(null);
    setFeedback({ text: 'Geser gambar ke kotak 1, 2, 3!' });
  };

  const resetPuzzle = () => {
    setSlots([null, null, null]);
    setSelectedId(null);
    setFeedback({ text: 'Susun dari nomor 1, 2, lalu 3!' });
  };

  const placeItemInSlot = (item: PuzzleItem, slotIdx: number) => {
    if (item.order === slotIdx + 1) {
      const next = [...slots];
      next[slotIdx] = item;
      setSlots(next);
      setSelectedId(null);
      const isDone = next.every((s, i) => s !== null && s.order === i + 1);
      setFeedback(
        isDone
          ? { icon: 'party', text: 'Yeay! Semua urutan PAS!' }
          : { icon: 'check', text: `Pas! ${item.label} di kotak ${slotIdx + 1}!` },
      );
    } else {
      setFeedback({ icon: 'thinking', text: `Bukan kotak ${slotIdx + 1}! Cek lagi ya!` });
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

      {/* Bottom Interactive Drag & Drop Puzzle Board */}
      <MacWindowCard left={X0} top={385} width={1320} height={585} headerLabel="game-puzzle-urutan" padding={22}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
            background: 'linear-gradient(180deg, #F0FDF4 0%, #FFFBEB 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            padding: '18px 26px',
            boxSizing: 'border-box',
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
                  ...row,
                  gap: 8,
                  padding: '8px 20px',
                  borderRadius: 14,
                  background: mode === 'gigi' ? SKY : WHITE,
                  color: mode === 'gigi' ? WHITE : CHARCOAL,
                  border: `2.5px solid ${CHARCOAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                <JuniorIcon name="toothbrush" size={24} />
                <span>Sikat Gigi</span>
              </button>
              <button
                type="button"
                className="cpj3-card-btn"
                onClick={() => switchMode('roti')}
                style={{
                  ...row,
                  gap: 8,
                  padding: '8px 20px',
                  borderRadius: 14,
                  background: mode === 'roti' ? SUNNY : WHITE,
                  color: CHARCOAL,
                  border: `2.5px solid ${CHARCOAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                <JuniorIcon name="sandwich" size={24} />
                <span>Buat Roti</span>
              </button>
            </div>

            <button
              type="button"
              className="cpj3-card-btn"
              onClick={resetPuzzle}
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
                    height: 165,
                    borderRadius: 22,
                    background: placed ? placed.color : WHITE,
                    border: placed ? `3.5px solid ${TEAL}` : `3.5px dashed ${selectedId ? SKY : '#94A3B8'}`,
                    boxShadow: placed ? CARD_SHADOW : 'none',
                    ...centerCol,
                    gap: 8,
                    cursor: selectedId && !placed ? 'pointer' : 'default',
                  }}
                >
                  {placed ? (
                    <>
                      <JuniorIcon name={placed.icon} size={52} />
                      <span style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: CHARCOAL }}>
                        <span>{idx + 1}. {placed.label}</span>
                        <JuniorIcon name="check" size={22} />
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 14,
                          background: '#E2E8F0',
                          fontFamily: 'var(--osd-font-display)',
                          fontSize: 28,
                          fontWeight: 700,
                          color: CHARCOAL,
                          ...centerCol,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span style={{ fontSize: 20, fontWeight: 800, color: MUTED }}>Langkah {idx + 1}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Draggable / Clickable Piece Tray + Flat Feedback */}
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
                      borderRadius: 18,
                      background: isSelected ? SUNNY : WHITE,
                      border: `3px solid ${isSelected ? CORAL : CHARCOAL}`,
                      boxShadow: `0 5px 0 ${CHARCOAL}`,
                      ...row,
                      gap: 10,
                    }}
                  >
                    <JuniorIcon name={item.icon} size={34} />
                    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
              {remainingItems.length === 0 && (
                <InfoPanel bg={TEAL_SOFT} borderColor={TEAL} padding={12} style={{ borderRadius: 16, paddingLeft: 22, paddingRight: 22 }}>
                  <SectionHeading icon="trophy" size={24} accentColor="#065F46">
                    {PUZZLE_SETS[mode].title} Selesai!
                  </SectionHeading>
                </InfoPanel>
              )}
            </div>

            <div
              style={{
                ...row,
                gap: 8,
                padding: '10px 20px',
                borderRadius: 16,
                background: completed ? TEAL_SOFT : STABILO,
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

      {/* Cheering Biko on Right */}
      <div style={{ ...abs(1455, 420, 365, 530), ...centerCol, gap: 10 }}>
        <BikoMascot pose={completed ? 'jump' : 'wave'} width={300} />
        <InfoPanel bg={completed ? TEAL_SOFT : SUNNY_SOFT} padding={12} style={{ borderRadius: 16, paddingLeft: 20, paddingRight: 20 }}>
          <SectionHeading icon={completed ? 'party' : 'puzzle'} size={22}>
            {completed ? 'Jagoan Puzzle!' : 'Ayo Geser!'}
          </SectionHeading>
        </InfoPanel>
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

      <SlideTitle align="center" top={104} size={58}>
        Keren! Kamu <Highlight color={STABILO}>Jagoan Puzzle!</Highlight>
      </SlideTitle>

      {/* Center Celebration & Recap Card */}
      <MacWindowCard left={170} top={210} width={1180} height={745} headerLabel="lencana-pertemuan-3" padding={36}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '430px 1fr', gap: 36, alignItems: 'center' }}>
          {/* Left: Gold Medal + Flat Achievement Banner */}
          <div style={{ ...centerCol, gap: 22 }}>
            <svg width={260} height={250} viewBox="0 0 260 250" fill="none">
              <path d="M90 156 L66 238 L104 218 L122 240 L122 156 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M170 156 L194 238 L156 218 L138 240 L138 156 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="130" cy="98" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="130" cy="98" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={3.5} />
              <rect x="94" y="64" width="72" height="72" rx="18" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
              <circle cx="130" cy="59" r="11" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
              <path
                d="M130 74 L135 86 L148 88 L138 97 L141 110 L130 103 L119 110 L122 97 L112 88 L125 86 Z"
                fill={SUNNY}
                stroke={CHARCOAL}
                strokeWidth={2.5}
                strokeLinejoin="round"
              />
              <path
                d="M142 106 L172 126 L156 130 L163 144 L156 148 L149 134 L142 142 Z"
                fill={SKY}
                stroke={CHARCOAL}
                strokeWidth={3}
                strokeLinejoin="round"
              />
            </svg>

            <InfoPanel bg={SUNNY_SOFT} padding={14} style={{ borderRadius: 16, paddingLeft: 24, paddingRight: 24 }}>
              <SectionHeading icon="medal" size={26}>
                Lencana Jagoan Puzzle
              </SectionHeading>
            </InfoPanel>
          </div>

          {/* Right: Concise Bullet Takeaways + 1-2-3 Visual Recap */}
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
                  Pintar <InlineHighlight>memecah misi besar</InlineHighlight> jadi kecil.
                </>,
                <>
                  Menyusun urutan <InlineHighlight color="#D1FAE5">1, 2, lalu 3</InlineHighlight> dengan tepat.
                </>,
                <>
                  Mahir jurus <InlineHighlight color={SKY_SOFT}>Klik, Tahan, Geser</InlineHighlight>.
                </>,
              ]}
            />

            <InfoPanel bg={TEAL_SOFT} borderColor={TEAL} padding={18}>
              <div style={{ ...row, justifyContent: 'center', gap: 18 }}>
                <StepNumberBadge num={1} color={SKY} size={52} />
                <JuniorIcon name="arrow-right" size={28} />
                <StepNumberBadge num={2} color={SUNNY} size={52} />
                <JuniorIcon name="arrow-right" size={28} />
                <StepNumberBadge num={3} color={TEAL} size={52} />
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

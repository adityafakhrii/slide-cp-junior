import { Fragment, useState, type CSSProperties, type DragEvent, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-6-jejak-langkah-berurutan';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj6-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-12px) scale(1.04); }
}
@keyframes cpj6-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(8px) rotate(14deg); }
}
.cpj6-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj6-card-btn:hover {
  transform: translateY(-3px);
}
.cpj6-card-btn:active {
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
// Shared Chrome, Typography, Highlights, Bullet Lists & Panels
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
      {/* Top Left Header Eyebrow Tag */}
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
        <span>Pertemuan 6 • Jejak Langkah Berurutan</span>
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

/** Flat content panel (no button extrusion shadow) */
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
// Reusable Flat-Vector Illustrations (Bunny, Carrot, Rock, Puzzle Blocks)
// ============================================================================
const BunnySvg = ({ size = 120, style }: { size?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" style={{ display: 'block', ...style }}>
    <ellipse cx="44" cy="30" rx="11" ry="24" transform="rotate(-8 44 30)" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
    <ellipse cx="44" cy="30" rx="5.5" ry="15" transform="rotate(-8 44 30)" fill="#FBCFE8" />
    <ellipse cx="76" cy="30" rx="11" ry="24" transform="rotate(8 76 30)" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
    <ellipse cx="76" cy="30" rx="5.5" ry="15" transform="rotate(8 76 30)" fill="#FBCFE8" />
    <ellipse cx="60" cy="92" rx="24" ry="20" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
    <circle cx="60" cy="64" r="26" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
    <circle cx="49" cy="61" r="3.8" fill={CHARCOAL} />
    <circle cx="71" cy="61" r="3.8" fill={CHARCOAL} />
    <circle cx="41" cy="69" r="5" fill="#FBCFE8" />
    <circle cx="79" cy="69" r="5" fill="#FBCFE8" />
    <ellipse cx="60" cy="67" rx="4.5" ry="3" fill="#F472B6" />
    <path d="M54 73 Q60 79 66 73" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
  </svg>
);

const CarrotSvg = ({ size = 110, style }: { size?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 110 110" fill="none" style={{ display: 'block', ...style }}>
    <path d="M55 34 C44 12, 32 18, 44 36" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
    <path d="M55 34 C55 10, 66 10, 62 35" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
    <path d="M55 34 C68 14, 80 20, 64 38" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
    <path
      d="M36 42 C36 32, 74 32, 74 42 L61 94 C59 100, 51 100, 49 94 Z"
      fill={ORANGE}
      stroke={CHARCOAL}
      strokeWidth={3.8}
      strokeLinejoin="round"
    />
    <path d="M44 54 H58 M52 68 H65" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" opacity={0.45} />
  </svg>
);

const RockSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ display: 'block' }}>
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

const StepArrowConnector = ({ color = CHARCOAL, size = 34 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
    <path d="M6 18 H28 M20 10 L29 18 L20 26" stroke={color} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type Dir = 'up' | 'down' | 'left' | 'right';

const DIR_META: Record<Dir, { label: string; icon: JuniorIconName; color: string; rotate: number }> = {
  up: { label: 'Atas', icon: 'arrow-up', color: SKY, rotate: 0 },
  down: { label: 'Bawah', icon: 'arrow-down', color: SUNNY, rotate: 180 },
  left: { label: 'Kiri', icon: 'arrow-left', color: CORAL, rotate: -90 },
  right: { label: 'Kanan', icon: 'arrow-right', color: TEAL, rotate: 90 },
};

/**
 * Puzzle arrow block: interactive <button> ONLY when onClick is provided;
 * otherwise flat <div> with zero button-extrusion shadow.
 */
const PuzzleArrowBlock = ({
  dir,
  size = 96,
  stepNum,
  showRightTab = false,
  onClick,
  draggable = false,
  onDragStart,
}: {
  dir: Dir;
  size?: number;
  stepNum?: number;
  showRightTab?: boolean;
  onClick?: () => void;
  draggable?: boolean;
  onDragStart?: (e: DragEvent<HTMLButtonElement>) => void;
}) => {
  const m = DIR_META[dir];
  const arrowSize = Math.round(size * 0.56);

  const inner = (
    <>
      {showRightTab && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: -14,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 15,
            height: 26,
            borderRadius: '0 12px 12px 0',
            background: m.color,
            border: `3.5px solid ${CHARCOAL}`,
            borderLeft: 'none',
            zIndex: 2,
          }}
        />
      )}
      {stepNum !== undefined && (
        <span
          style={{
            position: 'absolute',
            left: -10,
            top: -12,
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: SUNNY,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 17,
            fontWeight: 700,
            color: CHARCOAL,
            ...centerCol,
            zIndex: 3,
          }}
        >
          {stepNum}
        </span>
      )}
      <svg
        width={arrowSize}
        height={arrowSize}
        viewBox="0 0 64 64"
        fill="none"
        style={{ transform: `rotate(${m.rotate}deg)` }}
      >
        <path
          d="M32 10 L52 30 H40 V54 H24 V30 H12 Z"
          fill={WHITE}
          stroke={CHARCOAL}
          strokeWidth={4}
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  const baseStyle: CSSProperties = {
    position: 'relative',
    width: size,
    height: size,
    borderRadius: 20,
    background: m.color,
    border: `3.5px solid ${CHARCOAL}`,
    ...centerCol,
    boxSizing: 'border-box',
    padding: 0,
  };

  if (onClick) {
    return (
      <button
        type="button"
        draggable={draggable}
        onDragStart={onDragStart}
        className="cpj6-card-btn"
        onClick={onClick}
        aria-label={`Blok arah ${m.label}`}
        style={{
          ...baseStyle,
          boxShadow: `0 6px 0 ${CHARCOAL}`,
          cursor: 'pointer',
        }}
      >
        {inner}
      </button>
    );
  }

  return <div style={baseStyle}>{inner}</div>;
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Hero Split + InfoPanel + BulletList)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 6" accentDot={SUNNY}>
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
            background: LAVENDER_SOFT,
            border: `2px solid ${CHARCOAL}`,
            fontSize: 20,
            fontWeight: 800,
            color: '#5B21B6',
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
          Jejak Langkah <Highlight color={STABILO}>Berurutan!</Highlight>
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
          Merangkai Blok Panah Bantu Kelinci Ambil Wortel
        </p>

        {/* Clean non-button InfoPanel with BulletList */}
        <InfoPanel bg={WHITE} padding={26} style={{ marginTop: 6 }}>
          <SectionHeading icon="link" size={26}>
            Yang Akan Kita Pelajari:
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={24}
              gap={12}
              items={[
                <>
                  Sambung blok panah <InlineHighlight>berurutan</InlineHighlight>.
                </>,
                <>
                  Mengenal <InlineHighlight color={SKY_SOFT}>sekuens</InlineHighlight> dari awal ke akhir.
                </>,
                <>
                  Bantu kelinci ambil <InlineHighlight color="#D1FAE5">wortel segar</InlineHighlight>.
                </>,
              ]}
            />
          </div>
        </InfoPanel>
      </div>

      {/* Right Visual Showcase: Leaf Meadow Backdrop + Sequence Preview + Biko */}
      <div style={{ ...abs(975, 150, 845, 795), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 640,
            height: 605,
            borderRadius: '44px 175px 44px 175px',
            background: 'linear-gradient(155deg, #ECFDF5 0%, #FEF9C3 100%)',
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `12px 12px 0 ${LAVENDER}`,
            overflow: 'hidden',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 650 615" fill="none" style={{ opacity: 0.35 }}>
            <circle cx="140" cy="510" r="24" fill={TEAL} />
            <circle cx="235" cy="495" r="22" fill={TEAL} />
            <circle cx="330" cy="480" r="20" fill={TEAL} />
          </svg>
        </div>

        {/* Mini Bunny & Carrot Screen + Snapped Static Arrow Blocks */}
        <InfoPanel
          bg={WHITE}
          padding={18}
          style={{
            position: 'absolute',
            left: 38,
            top: 46,
            width: 420,
            zIndex: 4,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ ...row, gap: 10 }}>
              <BunnySvg size={58} style={{ animation: live ? 'cpj6-hop 2.4s ease-in-out infinite' : undefined }} />
              <StepArrowConnector color={TEAL} size={28} />
              <StepArrowConnector color={SKY} size={28} />
            </div>
            <CarrotSvg size={58} />
          </div>

          <div style={{ ...row, gap: 12, justifyContent: 'center' }}>
            <PuzzleArrowBlock dir="right" size={72} stepNum={1} showRightTab />
            <PuzzleArrowBlock dir="right" size={72} stepNum={2} showRightTab />
            <PuzzleArrowBlock dir="up" size={72} stepNum={3} />
          </div>
        </InfoPanel>

        <BikoMascot
          pose="cover-laptop"
          width={400}
          style={{ position: 'relative', zIndex: 3, marginTop: 150, marginLeft: 105 }}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 InfoPanel Cards + BulletList + Biko)
// ============================================================================
const Slide02Misi: Page = () => (
  <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
    <SlideTitle>
      Apa <Highlight>Misi Kita</Highlight> Hari Ini?
    </SlideTitle>

    <MacWindowCard left={X0} top={215} width={1320} height={745} headerLabel="daftar-misi-6.app" padding={34}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, height: '100%' }}>
        {/* Kartu 1 */}
        <InfoPanel
          bg={SKY_SOFT}
          padding={28}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em' }}>
              MISI 1
            </span>
            <SectionHeading icon="link" size={32}>
              Rangkai <Highlight color="#DBEAFE">Blok Panah</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${SKY}`,
              padding: '44px 20px',
              ...row,
              justifyContent: 'center',
              gap: 12,
            }}
          >
            <PuzzleArrowBlock dir="right" size={86} stepNum={1} showRightTab />
            <PuzzleArrowBlock dir="right" size={86} stepNum={2} showRightTab />
            <PuzzleArrowBlock dir="up" size={86} stepNum={3} />
          </div>

          <BulletList
            bulletColor={SKY}
            fontSize={23}
            gap={10}
            items={[
              <>
                Sambung blok panah <InlineHighlight color={WHITE}>berurutan</InlineHighlight>.
              </>,
              <>
                Urutan langkah disebut <InlineHighlight color="#DBEAFE">sekuens</InlineHighlight>.
              </>,
            ]}
          />
        </InfoPanel>

        {/* Kartu 2 */}
        <InfoPanel
          bg={TEAL_SOFT}
          padding={28}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#047857', letterSpacing: '0.05em' }}>
              MISI 2
            </span>
            <SectionHeading icon="carrot" size={32}>
              Bantu <Highlight color="#D1FAE5">Kelinci</Highlight>!
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${TEAL}`,
              padding: '28px 20px',
              ...row,
              justifyContent: 'center',
              gap: 16,
            }}
          >
            <BunnySvg size={120} />
            <StepArrowConnector color={TEAL} size={36} />
            <CarrotSvg size={108} />
          </div>

          <BulletList
            bulletColor={TEAL}
            fontSize={23}
            gap={10}
            items={[
              <>
                Hitung langkah ke <InlineHighlight color={STABILO}>wortel segar</InlineHighlight>.
              </>,
              <>
                Hindari <InlineHighlight color={WHITE}>batu rintangan</InlineHighlight> di peta!
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="point-left"
      width={360}
      speechBubble="Ayo rangkai!"
      style={{ ...abs(1455, 315) }}
    />
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Rahasia Coder: Apa Itu Urutan (Sekuens)?
// ============================================================================
const Slide03Sekuens: Page = () => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  return (
    <JuniorFrame badge="RAHASIA CODER #1" accentDot={SUNNY}>
      <SlideTitle>
        Rangkai <Highlight>Jejak Berurutan!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card */}
      <MacWindowCard left={X0} top={215} width={960} height={745} headerLabel="apa-itu-sekuens.app" padding={28}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
            background: 'linear-gradient(180deg, #EFF6FF 0%, #ECFDF5 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            padding: '28px 34px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          {/* Interactive Connected Blocks 1 -> 2 -> 3 */}
          <div style={{ ...row, gap: 22, marginTop: 32 }}>
            {(
              [
                { n: 1 as const, dir: 'right' as const },
                { n: 2 as const, dir: 'right' as const },
                { n: 3 as const, dir: 'up' as const },
              ]
            ).map((b) => {
              const isLit = activeStep === b.n;
              return (
                <div
                  key={b.n}
                  style={{
                    padding: 14,
                    borderRadius: 26,
                    background: isLit ? STABILO : 'transparent',
                    border: isLit ? `3px solid ${CHARCOAL}` : '3px solid transparent',
                    transition: 'all 180ms ease',
                  }}
                >
                  <PuzzleArrowBlock
                    dir={b.dir}
                    size={124}
                    stepNum={b.n}
                    showRightTab={b.n < 3}
                    onClick={() => setActiveStep(b.n)}
                  />
                </div>
              );
            })}
          </div>

          {/* Reading Direction + Pointing Biko */}
          <div style={{ width: '100%', ...row, justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <BikoMascot pose="point-right" width={235} style={{ marginBottom: -12 }} />
            <div style={{ ...centerCol, gap: 14, marginBottom: 24 }}>
              <InfoPanel bg={WHITE} borderColor={TEAL} padding={14} style={{ padding: '12px 24px' }}>
                <SectionHeading icon="biko" size={26}>
                  Baca Urutan: Blok #{activeStep}
                </SectionHeading>
              </InfoPanel>

              <button
                type="button"
                className="cpj6-card-btn"
                onClick={() => setActiveStep((s) => (s === 3 ? 1 : ((s + 1) as 1 | 2 | 3)))}
                style={{
                  padding: '12px 26px',
                  borderRadius: 16,
                  background: TEAL,
                  color: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 5px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                  ...row,
                  gap: 8,
                }}
              >
                <JuniorIcon name="play" size={20} />
                <span>Langkah Berikutnya</span>
              </button>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: InfoPanels with SectionHeading + BulletList */}
      <div style={{ ...abs(1100, 215, 720, 745), display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
        <InfoPanel bg={WHITE} borderColor={SKY} padding={28}>
          <SectionHeading icon="link" size={30}>
            Apa Itu Sekuens?
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={SKY}
              fontSize={24}
              gap={14}
              items={[
                <>
                  Blok disambung <InlineHighlight color="#DBEAFE">satu per satu</InlineHighlight>.
                </>,
                <>
                  Komputer baca dari <InlineHighlight color="#D1FAE5">awal ke akhir</InlineHighlight>.
                </>,
              ]}
            />
          </div>
        </InfoPanel>

        <InfoPanel bg={SUNNY_SOFT} padding={28} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <SectionHeading icon="laptop" size={28}>
            Urutan Langkah Komputer
          </SectionHeading>

          <div style={{ ...row, justifyContent: 'center', gap: 16, padding: '14px 0' }}>
            {[1, 2, 3].map((num, idx) => (
              <Fragment key={num}>
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: '50%',
                    background: activeStep === num ? TEAL : WHITE,
                    color: activeStep === num ? WHITE : CHARCOAL,
                    border: `3px solid ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 32,
                    fontWeight: 700,
                    ...centerCol,
                  }}
                >
                  {num}
                </div>
                {idx < 2 && <StepArrowConnector size={28} />}
              </Fragment>
            ))}
          </div>

          <BulletList
            bulletColor={SUNNY}
            fontSize={24}
            gap={10}
            items={[
              <>
                Mulai dari <InlineHighlight color={WHITE}>Blok 1</InlineHighlight>, lalu Blok 2, lalu Blok 3!
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus Merangkai Blok Panah (3 InfoPanel Steps + Snap Demo)
// ============================================================================
const CHAIN_STEPS: { num: number; color: string; soft: string; title: string; sub: string }[] = [
  { num: 1, color: SKY, soft: SKY_SOFT, title: 'Geser Blok', sub: 'Pilih panah pertama' },
  { num: 2, color: SUNNY, soft: SUNNY_SOFT, title: 'Tempel Blok', sub: 'Sambung sampai klik!' },
  { num: 3, color: TEAL, soft: TEAL_SOFT, title: 'Jalan!', sub: 'Tekan tombol jalan' },
];

const Slide04JurusMerangkai: Page = () => {
  const [snapped, setSnapped] = useState(true);

  return (
    <JuniorFrame badge="JURUS MERANGKAI BLOK" accentDot={SKY}>
      <SlideTitle>
        Sambung Seperti <Highlight>Puzzle!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={215} width={W} height={745} headerLabel="jurus-sambung-blok.app" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 26 }}>
          {/* Top 3 Step InfoPanels (No button extrusion shadow) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 26 }}>
            {CHAIN_STEPS.map((st) => (
              <InfoPanel
                key={st.num}
                bg={st.soft}
                padding={22}
                style={{ ...row, gap: 18 }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    background: st.color,
                    border: `3px solid ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 32,
                    fontWeight: 700,
                    color: st.num === 2 ? CHARCOAL : WHITE,
                    ...centerCol,
                    flexShrink: 0,
                  }}
                >
                  {st.num}
                </div>
                <div>
                  <SectionHeading size={28}>{st.title}</SectionHeading>
                  <div style={{ fontSize: 21, fontWeight: 700, color: MUTED, marginTop: 4 }}>{st.sub}</div>
                </div>
              </InfoPanel>
            ))}
          </div>

          {/* Interactive Magnetic Snap Demo */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: '#FFFDF7',
              border: `3px dashed #CBD5E1`,
              padding: '26px 40px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: snapped ? 14 : 68, transition: 'gap 280ms ease' }}>
              <PuzzleArrowBlock dir="right" size={120} stepNum={1} showRightTab />
              <div style={{ position: 'relative' }}>
                <PuzzleArrowBlock dir="up" size={120} stepNum={2} />
                {snapped && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -24,
                      left: -26,
                      padding: '4px 14px',
                      borderRadius: 12,
                      background: SUNNY,
                      border: `2.5px solid ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 20,
                      fontWeight: 700,
                      transform: 'rotate(-6deg)',
                    }}
                  >
                    KLIK!
                  </div>
                )}
              </div>
            </div>

            <div style={{ ...row, gap: 20 }}>
              <button
                type="button"
                className="cpj6-card-btn"
                onClick={() => setSnapped((s) => !s)}
                style={{
                  padding: '16px 32px',
                  borderRadius: 18,
                  background: snapped ? WHITE : SKY,
                  color: snapped ? CHARCOAL : WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 6px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 26,
                  fontWeight: 700,
                  ...row,
                  gap: 10,
                }}
              >
                <JuniorIcon name={snapped ? 'arrow-lr' : 'magnet'} size={26} />
                <span>{snapped ? 'Lepas Blok' : 'Tempelkan Blok!'}</span>
              </button>

              <InfoPanel
                bg={snapped ? TEAL_SOFT : CORAL_SOFT}
                borderColor={snapped ? TEAL : CORAL}
                padding={16}
                style={{ padding: '14px 24px', ...row, gap: 10 }}
              >
                <JuniorIcon name={snapped ? 'check' : 'warning'} size={26} />
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                  {snapped ? 'Tersambung Rapat!' : 'Masih Terpisah!'}
                </span>
              </InfoPanel>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Latihan Jejak #1: Jalan Lurus Ambil Wortel
// ============================================================================
const Slide05JalanLurus: Page = () => {
  const [step, setStep] = useState<0 | 1 | 2>(2);

  return (
    <JuniorFrame badge="LATIHAN JEJAK #1" accentDot={TEAL}>
      <SlideTitle>
        Bantu Kelinci <Highlight>Jalan Lurus!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={215} width={W} height={745} headerLabel="latihan-jejak-lurus.app" padding={32}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
          {/* Top 2 InfoPanel Explanations with BulletList */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <InfoPanel bg={SKY_SOFT} padding={20}>
              <SectionHeading icon="bunny" size={26}>
                Hitung Kotaknya
              </SectionHeading>
              <div style={{ marginTop: 10 }}>
                <BulletList
                  bulletColor={SKY}
                  fontSize={23}
                  gap={8}
                  items={[
                    <>
                      Kelinci butuh <InlineHighlight color={WHITE}>2 langkah kanan</InlineHighlight>.
                    </>,
                  ]}
                />
              </div>
            </InfoPanel>

            <InfoPanel bg={TEAL_SOFT} padding={20}>
              <SectionHeading icon="puzzle" size={26}>
                Rangkai Bloknya
              </SectionHeading>
              <div style={{ marginTop: 10 }}>
                <BulletList
                  bulletColor={TEAL}
                  fontSize={23}
                  gap={8}
                  items={[
                    <>
                      Sambung <InlineHighlight color="#D1FAE5">2 blok panah kanan</InlineHighlight>.
                    </>,
                  ]}
                />
              </div>
            </InfoPanel>
          </div>

          {/* 3-Box Horizontal Map */}
          <div
            style={{
              padding: '26px 36px',
              borderRadius: 24,
              background: 'linear-gradient(180deg, #ECFDF5 0%, #FFFBEB 100%)',
              border: `2.5px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'center',
              gap: 32,
            }}
          >
            {[0, 1, 2].map((idx) => {
              const isBunnyHere = step === idx;
              const isCarrotHere = idx === 2;
              return (
                <Fragment key={idx}>
                  <div
                    style={{
                      width: 240,
                      height: 175,
                      borderRadius: 24,
                      background: isCarrotHere ? SUNNY_SOFT : step > idx ? TEAL_SOFT : WHITE,
                      border: `3.5px solid ${isBunnyHere ? TEAL : CHARCOAL}`,
                      boxShadow: isBunnyHere ? `0 0 0 6px ${STABILO}` : undefined,
                      ...centerCol,
                      gap: 6,
                    }}
                  >
                    {isBunnyHere && isCarrotHere ? (
                      <div style={{ ...row, gap: 4 }}>
                        <BunnySvg size={95} />
                        <CarrotSvg size={85} />
                      </div>
                    ) : isBunnyHere ? (
                      <BunnySvg size={115} />
                    ) : isCarrotHere ? (
                      <CarrotSvg size={110} />
                    ) : (
                      <JuniorIcon name="arrow-right" size={44} />
                    )}
                  </div>
                  {idx < 2 && <StepArrowConnector color={TEAL} size={40} />}
                </Fragment>
              );
            })}
          </div>

          {/* Snapped Static Arrow Blocks + Interactive Step Replay */}
          <div style={{ ...row, justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ ...row, gap: 16 }}>
              <PuzzleArrowBlock dir="right" size={92} stepNum={1} showRightTab />
              <PuzzleArrowBlock dir="right" size={92} stepNum={2} />
            </div>

            <div style={{ ...row, gap: 14 }}>
              {(
                [
                  { s: 0 as const, label: 'Start' },
                  { s: 1 as const, label: '1. Kanan' },
                  { s: 2 as const, label: '2. Dapat Wortel!' },
                ] as const
              ).map((btn) => (
                <button
                  key={btn.s}
                  type="button"
                  className="cpj6-card-btn"
                  onClick={() => setStep(btn.s)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 16,
                    background: step === btn.s ? TEAL : WHITE,
                    color: step === btn.s ? WHITE : CHARCOAL,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 4px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 22,
                    fontWeight: 700,
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Mana Rangkaian yang Benar?
// ============================================================================
const Slide06TebakRangkaian: Page = () => {
  const [choice, setChoice] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" top={114}>
        Rangkaian Mana yang <Highlight>Sampai?</Highlight>
      </SlideTitle>

      {/* Top 3-Box Scenario Bar (Flat InfoPanel) */}
      <InfoPanel
        bg={WHITE}
        padding={18}
        style={{
          ...abs(240, 206, 1440, 146),
          ...row,
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <div
          style={{
            width: 280,
            height: 92,
            borderRadius: 18,
            background: choice === 'B' ? '#F8FAFC' : TEAL_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            ...row,
            justifyContent: 'center',
            gap: 10,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {choice !== 'B' && <BunnySvg size={54} />}
          <span>{choice === 'B' ? 'Start' : 'Kelinci'}</span>
        </div>

        <StepArrowConnector color={TEAL} />

        <div
          style={{
            width: 280,
            height: 92,
            borderRadius: 18,
            background: choice === 'A' ? CORAL_SOFT : choice === 'B' ? TEAL_SOFT : '#F8FAFC',
            border: `2.5px solid ${CHARCOAL}`,
            ...row,
            justifyContent: 'center',
            gap: 10,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          {choice === 'B' && <JuniorIcon name="arrow-right" size={34} />}
          {choice === 'A' && (
            <>
              <BunnySvg size={50} />
              <span>Berhenti!</span>
            </>
          )}
          {choice === null && <span>Kotak Kosong</span>}
        </div>

        <StepArrowConnector color={TEAL} />

        <div
          style={{
            width: 280,
            height: 92,
            borderRadius: 18,
            background: SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            ...row,
            justifyContent: 'center',
            gap: 10,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {choice === 'B' ? (
            <>
              <BunnySvg size={50} />
              <CarrotSvg size={48} />
            </>
          ) : (
            <>
              <CarrotSvg size={52} />
              <span>Wortel</span>
            </>
          )}
        </div>
      </InfoPanel>

      {/* Two Big Interactive Choice Cards */}
      <div style={{ ...abs(180, 380, 1560, 345), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        {/* Kartu A: 1 Langkah */}
        <button
          type="button"
          className="cpj6-card-btn"
          onClick={() => setChoice('A')}
          style={{
            borderRadius: 30,
            background: choice === 'A' ? CORAL_SOFT : WHITE,
            border: `4px solid ${choice === 'A' ? CORAL : CHARCOAL}`,
            boxShadow: `0 8px 0 ${choice === 'A' ? CORAL : SKY}`,
            padding: '22px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, color: '#B91C1C', letterSpacing: '0.06em' }}>
            PILIHAN A (KLIK)
          </span>

          <PuzzleArrowBlock dir="right" size={110} />

          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            1 Langkah
          </span>
        </button>

        {/* Kartu B: 2 Langkah */}
        <button
          type="button"
          className="cpj6-card-btn"
          onClick={() => setChoice('B')}
          style={{
            borderRadius: 30,
            background: choice === 'B' ? TEAL_SOFT : WHITE,
            border: `4px solid ${choice === 'B' ? TEAL : CHARCOAL}`,
            boxShadow: `0 8px 0 ${choice === 'B' ? TEAL : SUNNY}`,
            padding: '22px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, color: '#047857', letterSpacing: '0.06em' }}>
            PILIHAN B (KLIK)
          </span>

          <div style={{ ...row, gap: 16 }}>
            <PuzzleArrowBlock dir="right" size={102} showRightTab />
            <PuzzleArrowBlock dir="right" size={102} />
          </div>

          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            2 Langkah
          </span>
        </button>
      </div>

      {/* Bottom Center: Biko + Flat Feedback InfoPanel */}
      <div style={{ ...abs(240, 742, 1440, 260), ...row, justifyContent: 'center', gap: 36 }}>
        <BikoMascot pose={choice === 'B' ? 'thumbs-up' : 'question'} width={215} />

        <InfoPanel
          bg={choice === 'B' ? TEAL_SOFT : choice === 'A' ? CORAL_SOFT : STABILO}
          borderColor={choice === 'B' ? TEAL : choice === 'A' ? CORAL : CHARCOAL}
          padding={24}
          style={{ minWidth: 560, ...centerCol }}
        >
          {choice === 'B' && (
            <SectionHeading icon="check" size={32} accentColor="#047857">
              Benar! Kelinci butuh 2 Langkah!
            </SectionHeading>
          )}
          {choice === 'A' && (
            <SectionHeading icon="thinking" size={32} accentColor="#B91C1C">
              Hampir! Kelinci berhenti di kotak kosong!
            </SectionHeading>
          )}
          {choice === null && (
            <SectionHeading icon="point-right" size={32}>
              Pilih Pilihan A atau B!
            </SectionHeading>
          )}
        </InfoPanel>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Latihan Jejak #2: Jalan Belok Ambil Wortel! (3x3 Grid)
// ============================================================================
const Slide07JalanBelok: Page = () => {
  const [step, setStep] = useState<0 | 1 | 2>(2);
  // Start (row=2, col=0) -> idx 6; Right (row=2, col=1) -> idx 7; Up (row=1, col=1) -> idx 4 (Carrot!)
  const bunnyIdx = step === 0 ? 6 : step === 1 ? 7 : 4;

  return (
    <JuniorFrame badge="LATIHAN JEJAK #2" accentDot={SUNNY}>
      <SlideTitle>
        Wah, Wortelnya <Highlight>Belok!</Highlight>
      </SlideTitle>

      {/* Left Column: 3x3 Turning Path Grid */}
      <MacWindowCard left={X0} top={215} width={940} height={745} headerLabel="latihan-jejak-belok.app" padding={28}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
            background: 'linear-gradient(180deg, #ECFDF5 0%, #FFFBEB 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 150px)', gap: 16 }}>
            {Array.from({ length: 9 }).map((_, idx) => {
              const isBunny = idx === bunnyIdx;
              const isCarrot = idx === 4;
              const isPath = idx === 6 || idx === 7;
              return (
                <div
                  key={idx}
                  style={{
                    width: 150,
                    height: 140,
                    borderRadius: 20,
                    background: isCarrot ? SUNNY_SOFT : isPath ? TEAL_SOFT : WHITE,
                    border: `3px solid ${isBunny ? TEAL : CHARCOAL}`,
                    boxShadow: isBunny ? `0 0 0 5px ${STABILO}` : undefined,
                    ...centerCol,
                    position: 'relative',
                  }}
                >
                  {isBunny && isCarrot ? (
                    <div style={{ ...row, gap: 4 }}>
                      <BunnySvg size={68} />
                      <CarrotSvg size={64} />
                    </div>
                  ) : isBunny ? (
                    <BunnySvg size={88} />
                  ) : isCarrot ? (
                    <CarrotSvg size={84} />
                  ) : idx === 6 ? (
                    <JuniorIcon name="arrow-right" size={34} />
                  ) : idx === 7 ? (
                    <JuniorIcon name="arrow-up" size={34} />
                  ) : null}
                </div>
              );
            })}
          </div>

          <div style={{ ...row, gap: 14 }}>
            {(
              [
                { s: 0 as const, label: 'Start' },
                { s: 1 as const, label: '1. Kanan' },
                { s: 2 as const, label: '2. Atas' },
              ] as const
            ).map((btn) => (
              <button
                key={btn.s}
                type="button"
                className="cpj6-card-btn"
                onClick={() => setStep(btn.s)}
                style={{
                  padding: '12px 26px',
                  borderRadius: 16,
                  background: step === btn.s ? TEAL : WHITE,
                  color: step === btn.s ? WHITE : CHARCOAL,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: InfoPanels with SectionHeading + BulletList + Snapped Blocks */}
      <div style={{ ...abs(1080, 215, 740, 745), display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
        <InfoPanel bg={WHITE} borderColor={TEAL} padding={28}>
          <SectionHeading icon="footprints" size={30}>
            Urutan Jalan Belok
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={25}
              gap={14}
              items={[
                <>
                  1. Jalan <InlineHighlight color="#D1FAE5">1 kotak kanan</InlineHighlight>.
                </>,
                <>
                  2. Lalu belok <InlineHighlight color={SKY_SOFT}>1 kotak atas</InlineHighlight>.
                </>,
                <>
                  Hore, kelinci <InlineHighlight>dapat wortel</InlineHighlight>!
                </>,
              ]}
            />
          </div>
        </InfoPanel>

        <InfoPanel bg={SUNNY_SOFT} padding={28} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <SectionHeading icon="link" size={28}>
            Rangkaian Bloknya:
          </SectionHeading>
          <div style={{ ...row, justifyContent: 'center', gap: 22, padding: '14px 0' }}>
            <PuzzleArrowBlock dir="right" size={104} stepNum={1} showRightTab />
            <PuzzleArrowBlock dir="up" size={104} stepNum={2} />
          </div>
        </InfoPanel>

        <InfoPanel bg={SKY_SOFT} borderColor={SKY} padding={20} style={{ ...row, justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
            Blok 1 Kanan + Blok 2 Atas = Sampai!
          </span>
          <JuniorIcon name="check" size={30} />
        </InfoPanel>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Merangkai Jejak (Boleh vs Jangan, InfoPanel + BulletList)
// ============================================================================
const Slide08TipsMerangkai: Page = () => (
  <JuniorFrame badge="TIPS JAGOAN" accentDot={TEAL}>
    <SlideTitle>
      Rahasia Biar Kelinci <Highlight>Sampai!</Highlight>
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
          <SectionHeading icon="check" size={34} accentColor="#047857">
            BOLEH Dilakukan
          </SectionHeading>
          <JuniorIcon name="thumbs-up" size={36} />
        </div>

        <div
          style={{
            borderRadius: 20,
            background: TEAL_SOFT,
            border: `2.5px solid ${TEAL}`,
            padding: '22px 26px',
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ ...row, gap: 12 }}>
            <PuzzleArrowBlock dir="right" size={82} stepNum={1} showRightTab />
            <PuzzleArrowBlock dir="up" size={82} stepNum={2} />
          </div>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: '#047857' }}>
            Menempel Rapat!
          </span>
        </div>

        <BulletList
          bulletColor={TEAL}
          fontSize={25}
          gap={16}
          items={[
            <>
              <InlineHighlight color="#D1FAE5">Tempel blok</InlineHighlight> sampai menyatu rapat.
            </>,
            <>
              <InlineHighlight color="#D1FAE5">Hitung kotak</InlineHighlight> satu per satu.
            </>,
            <>Cek urutan dari blok nomor 1.</>,
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
          <SectionHeading icon="cross" size={34} accentColor="#B91C1C">
            JANGAN Dilakukan
          </SectionHeading>
          <JuniorIcon name="barrier" size={36} />
        </div>

        <div
          style={{
            borderRadius: 20,
            background: CORAL_SOFT,
            border: `2.5px solid ${CORAL}`,
            padding: '22px 26px',
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ ...row, gap: 58 }}>
            <PuzzleArrowBlock dir="right" size={82} showRightTab />
            <PuzzleArrowBlock dir="left" size={82} />
          </div>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: '#991B1B' }}>
            Blok Terpisah!
          </span>
        </div>

        <BulletList
          bulletColor={CORAL}
          fontSize={25}
          gap={16}
          items={[
            <>
              Jangan biarkan blok <InlineHighlight color="#FECACA">terputus</InlineHighlight>.
            </>,
            <>
              Jangan <InlineHighlight color="#FECACA">salah arah</InlineHighlight> panahnya.
            </>,
            <>Jangan lupa hitung belokan ke wortel.</>,
          ]}
        />
      </InfoPanel>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Bantu Kelinci Ambil Wortel! (Obstacle Maze Game)
// ============================================================================
const MISSION_STEPS: { num: number; color: string; soft: string; title: string; sub: string }[] = [
  { num: 1, color: SKY, soft: SKY_SOFT, title: 'Hitung', sub: 'kotak jalan kelinci' },
  { num: 2, color: SUNNY, soft: SUNNY_SOFT, title: 'Rangkai', sub: 'blok panah berurutan' },
  { num: 3, color: TEAL, soft: TEAL_SOFT, title: 'Jalan!', sub: 'wortel segar termakan' },
];

// 3x3 Grid:
// (0,0) [0]  (0,1) [1]  (0,2) [2: Carrot!]
// (1,0) [3]  (1,1) [4: Rock] (1,2) [5]
// (2,0) [6: Bunny Start] (2,1) [7] (2,2) [8]
const Slide09MisiKelinci: Page = () => {
  const [commands, setCommands] = useState<(Dir | null)[]>([null, null, null, null]);
  const [bunnyPos, setBunnyPos] = useState<{ r: number; c: number }>({ r: 2, c: 0 });
  const [status, setStatus] = useState<'idle' | 'won' | 'rock' | 'oops'>('idle');

  const addCommand = (dir: Dir) => {
    const emptyIdx = commands.findIndex((c) => c === null);
    if (emptyIdx === -1) return;
    const next = [...commands];
    next[emptyIdx] = dir;
    setCommands(next);
    setStatus('idle');
    setBunnyPos({ r: 2, c: 0 });
  };

  const handleDropSlot = (e: DragEvent<HTMLButtonElement>, slotIdx: number) => {
    e.preventDefault();
    const dir = e.dataTransfer.getData('text/plain') as Dir;
    if (!DIR_META[dir]) return;
    const next = [...commands];
    next[slotIdx] = dir;
    setCommands(next);
    setStatus('idle');
    setBunnyPos({ r: 2, c: 0 });
  };

  const clearSlot = (slotIdx: number) => {
    const next = [...commands];
    next[slotIdx] = null;
    setCommands(next);
    setStatus('idle');
    setBunnyPos({ r: 2, c: 0 });
  };

  const runSequence = () => {
    let r = 2;
    let c = 0;
    for (const cmd of commands) {
      if (!cmd) continue;
      if (cmd === 'up') r = Math.max(0, r - 1);
      if (cmd === 'down') r = Math.min(2, r + 1);
      if (cmd === 'left') c = Math.max(0, c - 1);
      if (cmd === 'right') c = Math.min(2, c + 1);
      if (r === 1 && c === 1) {
        setBunnyPos({ r, c });
        setStatus('rock');
        return;
      }
    }
    setBunnyPos({ r, c });
    if (r === 0 && c === 2) {
      setStatus('won');
    } else {
      setStatus('oops');
    }
  };

  const resetGame = () => {
    setCommands([null, null, null, null]);
    setBunnyPos({ r: 2, c: 0 });
    setStatus('idle');
  };

  const bunnyIdx = bunnyPos.r * 3 + bunnyPos.c;

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={SUNNY}>
      <SlideTitle top={104}>
        Misi <Highlight>Kelinci &amp; Wortel!</Highlight>
      </SlideTitle>

      {/* Top Row: 3 Flat InfoPanel Step Cards */}
      <div style={{ ...abs(X0, 192, W, 136), ...row, justifyContent: 'space-between', gap: 18 }}>
        {MISSION_STEPS.map((blk, i) => (
          <Fragment key={blk.num}>
            <InfoPanel
              bg={blk.soft}
              padding={16}
              style={{
                flex: 1,
                height: 128,
                ...row,
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  background: blk.color,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 28,
                  fontWeight: 700,
                  color: blk.num === 2 ? CHARCOAL : WHITE,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                {blk.num}
              </div>
              <div>
                <SectionHeading size={28}>{blk.title}</SectionHeading>
                <div style={{ fontSize: 20, fontWeight: 700, color: MUTED, marginTop: 2 }}>{blk.sub}</div>
              </div>
            </InfoPanel>

            {i < 2 && <StepArrowConnector />}
          </Fragment>
        ))}
      </div>

      {/* Interactive Bunny & Golden Carrot Game Board */}
      <MacWindowCard left={X0} top={352} width={1320} height={618} headerLabel="game-kelinci-wortel.app" padding={22}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
            background: 'linear-gradient(180deg, #ECFDF5 0%, #FFFBEB 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            padding: '18px 24px',
            display: 'grid',
            gridTemplateColumns: '410px 1fr',
            gap: 28,
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          {/* Left: 3x3 Meadow Grid with Rock Obstacle */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 122px)', gap: 12, justifyContent: 'center' }}>
            {Array.from({ length: 9 }).map((_, idx) => {
              const isBunny = idx === bunnyIdx;
              const isCarrot = idx === 2;
              const isRock = idx === 4;
              return (
                <div
                  key={idx}
                  style={{
                    width: 122,
                    height: 122,
                    borderRadius: 18,
                    background: isCarrot ? SUNNY_SOFT : isRock ? '#E2E8F0' : WHITE,
                    border: `3px solid ${isBunny ? TEAL : CHARCOAL}`,
                    boxShadow: isBunny ? `0 0 0 4px ${STABILO}` : undefined,
                    ...centerCol,
                  }}
                >
                  {isBunny && isCarrot ? (
                    <div style={{ ...row, gap: 2 }}>
                      <BunnySvg size={54} />
                      <CarrotSvg size={52} />
                    </div>
                  ) : isBunny ? (
                    <BunnySvg size={74} />
                  ) : isCarrot ? (
                    <CarrotSvg size={74} />
                  ) : isRock ? (
                    <RockSvg size={58} />
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Right: Command Sequence Builder */}
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '6px 0' }}>
            <div>
              <SectionHeading size={20}>1. Pilih Blok Panah (Hindari Batu):</SectionHeading>
              <div style={{ ...row, gap: 14, marginTop: 10 }}>
                {(['up', 'down', 'left', 'right'] as Dir[]).map((d) => (
                  <PuzzleArrowBlock
                    key={d}
                    dir={d}
                    size={76}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', d)}
                    onClick={() => addCommand(d)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 19, fontWeight: 800, color: MUTED, marginBottom: 10 }}>
                2. Rangkaian Sekuens 1–4 (Klik Slot untuk Hapus):
              </div>
              <div style={{ ...row, gap: 12 }}>
                {commands.map((cmd, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropSlot(e, idx)}
                    onClick={() => clearSlot(idx)}
                    style={{
                      width: 106,
                      height: 90,
                      borderRadius: 20,
                      background: cmd ? DIR_META[cmd].color : WHITE,
                      border: cmd ? `3.5px solid ${CHARCOAL}` : `3.5px dashed #94A3B8`,
                      ...centerCol,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: cmd ? 36 : 26,
                      fontWeight: 700,
                      color: cmd ? (cmd === 'down' ? CHARCOAL : WHITE) : MUTED,
                      cursor: 'pointer',
                    }}
                  >
                    {cmd ? <JuniorIcon name={DIR_META[cmd].icon} size={36} /> : idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ ...row, gap: 12, justifyContent: 'space-between' }}>
              <div style={{ ...row, gap: 12 }}>
                <button
                  type="button"
                  className="cpj6-card-btn"
                  onClick={runSequence}
                  style={{
                    padding: '12px 26px',
                    borderRadius: 16,
                    background: TEAL,
                    color: WHITE,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 5px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 24,
                    fontWeight: 700,
                    ...row,
                    gap: 8,
                  }}
                >
                  <JuniorIcon name="play" size={22} />
                  <span>Jalan!</span>
                </button>
                <button
                  type="button"
                  className="cpj6-card-btn"
                  onClick={resetGame}
                  style={{
                    padding: '12px 20px',
                    borderRadius: 16,
                    background: WHITE,
                    color: CHARCOAL,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 4px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 20,
                    fontWeight: 700,
                    ...row,
                    gap: 6,
                  }}
                >
                  <JuniorIcon name="reset" size={20} />
                  <span>Ulang</span>
                </button>
              </div>

              <div
                style={{
                  padding: '10px 18px',
                  borderRadius: 14,
                  background: status === 'won' ? TEAL_SOFT : status === 'rock' || status === 'oops' ? CORAL_SOFT : STABILO,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontSize: 19,
                  fontWeight: 800,
                  ...row,
                  gap: 8,
                }}
              >
                {status === 'won' && (
                  <>
                    <JuniorIcon name="party" size={22} />
                    <span>Hore! Wortel Emas Termakan!</span>
                  </>
                )}
                {status === 'rock' && (
                  <>
                    <JuniorIcon name="rock" size={22} />
                    <span>Ups, nabrak batu! Lewat pinggir ya!</span>
                  </>
                )}
                {status === 'oops' && (
                  <>
                    <JuniorIcon name="thinking" size={22} />
                    <span>Belum sampai! Coba: 2x Kanan, 2x Atas!</span>
                  </>
                )}
                {status === 'idle' && (
                  <>
                    <JuniorIcon name="bulb" size={20} />
                    <span>Petunjuk: 2x Kanan, 2x Atas!</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko on Right */}
      <div style={{ ...abs(1450, 415, 370, 520), ...centerCol }}>
        <BikoMascot
          pose={status === 'won' ? 'jump' : 'thumbs-up'}
          width={305}
          speechBubble={status === 'won' ? 'Hore Wortel!' : 'Semangat Kelinci!'}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 6 (Summary Bullets + Medal + Biko)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  const confetti = [
    { x: 140, y: 210, c: CORAL, s: 20 },
    { x: 310, y: 170, c: TEAL, s: 18 },
    { x: 1290, y: 180, c: SKY, s: 22 },
    { x: 1720, y: 260, c: LAVENDER, s: 20 },
    { x: 165, y: 830, c: SUNNY, s: 22 },
    { x: 1410, y: 870, c: CORAL, s: 18 },
  ];

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      {confetti.map((dot, idx) => (
        <div
          key={idx}
          aria-hidden
          style={{
            ...abs(dot.x, dot.y, dot.s, dot.s),
            borderRadius: 6,
            background: dot.c,
            border: `2px solid ${CHARCOAL}`,
            animation: live ? `cpj6-confetti ${2.4 + (idx % 3) * 0.4}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={104} size={58}>
        Keren! Kamu <Highlight color={STABILO}>Master Urutan!</Highlight>
      </SlideTitle>

      {/* Center Celebration & Summary Card */}
      <MacWindowCard left={180} top={210} width={1140} height={745} headerLabel="lencana-pertemuan-6" padding={34}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '410px 1fr', gap: 36, alignItems: 'center' }}>
          {/* Left: Gold Medal + Flat Badge */}
          <div style={{ ...centerCol, gap: 22 }}>
            <svg
              width={255}
              height={250}
              viewBox="0 0 260 250"
              fill="none"
              style={{ animation: live ? 'cpj6-hop 3s ease-in-out infinite' : undefined }}
            >
              <path d="M90 156 L66 238 L104 218 L122 240 L122 156 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M170 156 L194 238 L156 218 L138 240 L138 156 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="130" cy="98" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="130" cy="98" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={3.5} />
              <rect x="78" y="72" width="54" height="54" rx="14" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M92 99 H118 M108 89 L120 99 L108 109" stroke={WHITE} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M162 72 C154 58, 170 58, 162 72" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
              <path d="M148 76 C148 70, 176 70, 176 76 L166 124 C164 128, 160 128, 158 124 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
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
              <span>Lencana Jagoan Urutan</span>
            </div>
          </div>

          {/* Right: Concise Bullet Takeaways + Sequence Preview */}
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
                  Merangkai blok panah <InlineHighlight>berurutan</InlineHighlight>.
                </>,
                <>
                  Menyambung blok rapat seperti <InlineHighlight color={SKY_SOFT}>puzzle</InlineHighlight>.
                </>,
                <>
                  Membaca urutan dari <InlineHighlight color="#D1FAE5">awal ke akhir</InlineHighlight>.
                </>,
                <>
                  Membantu kelinci ambil <InlineHighlight>wortel segar</InlineHighlight>!
                </>,
              ]}
            />

            <InfoPanel bg={TEAL_SOFT} borderColor={BORDER_SOFT} padding={18} style={{ ...row, justifyContent: 'center', gap: 14 }}>
              <PuzzleArrowBlock dir="right" size={64} stepNum={1} showRightTab />
              <PuzzleArrowBlock dir="right" size={64} stepNum={2} showRightTab />
              <PuzzleArrowBlock dir="up" size={64} stepNum={3} />
            </InfoPanel>
          </div>
        </div>
      </MacWindowCard>

      {/* Celebrating Jumping Biko + Jumping Bunny on Right */}
      <div style={{ ...abs(1345, 385, 480, 520), ...row, alignItems: 'flex-end', justifyContent: 'center' }}>
        <BikoMascot pose="jump" width={350} speechBubble="Master Urutan Juara!" />
        <BunnySvg
          size={145}
          style={{
            marginLeft: -48,
            marginBottom: 24,
            animation: live ? 'cpj6-hop 1.9s ease-in-out infinite' : undefined,
          }}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// Speaker Notes (Talk Track for Mentors teaching Ages 5–7)
// ============================================================================
export const notes: (string | undefined)[] = [
  `Halo Code Explorer cilik! Di Pertemuan 6 hari ini, Biko punya teman baru: Kelinci putih lucu!
Kita akan belajar merangkai Jejak Langkah Berurutan (Sekuens) dengan blok panah agar kelinci bisa mengambil wortel segar.`,

  `Ada dua misi kita hari ini:
1. Merangkai Blok Panah Berurutan atau Sekuens.
2. Membantu Kelinci mengambil Wortel segar di peta kotak!`,

  `Apa itu Sekuens (Urutan)?
Blok panah disambung satu per satu seperti puzzle. Komputer selalu membaca perintah dari awal (blok 1) sampai akhir (blok 3)!`,

  `Bagaimana jurus merangkai blok panah?
1. Geser blok panah pertama. 2. Tempel blok berikutnya sampai bunyi "Klik!". 3. Lepas atau tempelkan untuk melihat bedanya!`,

  `Latihan Jejak #1: Kelinci mau jalan lurus mengambil wortel.
Hitungan kotaknya: Kelinci butuh 2 langkah ke kanan, jadi kita rangkai blok Kanan + Kanan!`,

  `Permainan Cepat! Ayo tebak rangkaian blok mana yang membuat kelinci sampai ke wortel:
Pilihan A (1 Langkah) atau Pilihan B (2 Langkah)?`,

  `Latihan Jejak #2: Wah, wortelnya belok!
Pertama jalan 1 kotak ke Kanan, lalu jalan 1 kotak ke Atas. Hore, dapat wortel!`,

  `Tips Jagoan Merangkai Jejak:
BOLEH tempel blok sampai menyatu rapat dan hitung kotak satu per satu.
JANGAN biarkan blok terputus di tengah jalan atau salah arah panahnya ya!`,

  `Waktunya praktik Game Kelinci & Wortel!
Hati-hati ada rintangan batu di tengah! Rangkai 4 blok panah menghindari batu (petunjuk: 2x Kanan lalu 2x Atas, atau 2x Atas lalu 2x Kanan), lalu klik Jalan!`,

  `Selamat untuk semua Master Urutan cilik!
Biko dan Kelinci sangat bangga! Kalian resmi meraih Lencana Jagoan Jejak Berurutan!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 6 — Jejak Langkah Berurutan',
  createdAt: '2026-11-13T10:15:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03Sekuens,
  Slide04JurusMerangkai,
  Slide05JalanLurus,
  Slide06TebakRangkaian,
  Slide07JalanBelok,
  Slide08TipsMerangkai,
  Slide09MisiKelinci,
  Slide10Lencana,
] satisfies Page[];

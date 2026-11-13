import { Fragment, useState, type CSSProperties, type DragEvent, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-6-jejak-langkah-berurutan';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj6-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj6-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj6-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj6-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
.cpj6-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj6-card-btn:hover {
  transform: translateY(-4px);
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
          animation: live ? 'cpj6-twinkle 2.8s ease-in-out infinite' : undefined,
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
// Reusable Flat-Vector Illustrations (Bunny, Carrot, Snapping Puzzle Blocks)
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

const BunnySvg = ({ size = 120, style }: { size?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" style={{ display: 'block', ...style }}>
    {/* Ears */}
    <ellipse cx="44" cy="30" rx="11" ry="24" transform="rotate(-8 44 30)" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
    <ellipse cx="44" cy="30" rx="5.5" ry="15" transform="rotate(-8 44 30)" fill="#FBCFE8" />
    <ellipse cx="76" cy="30" rx="11" ry="24" transform="rotate(8 76 30)" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
    <ellipse cx="76" cy="30" rx="5.5" ry="15" transform="rotate(8 76 30)" fill="#FBCFE8" />
    {/* Body */}
    <ellipse cx="60" cy="92" rx="24" ry="20" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
    {/* Head */}
    <circle cx="60" cy="64" r="26" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
    {/* Cute Cheeks & Eyes */}
    <circle cx="49" cy="61" r="3.8" fill={CHARCOAL} />
    <circle cx="71" cy="61" r="3.8" fill={CHARCOAL} />
    <circle cx="41" cy="69" r="5" fill="#FBCFE8" />
    <circle cx="79" cy="69" r="5" fill="#FBCFE8" />
    {/* Nose & Smile */}
    <ellipse cx="60" cy="67" rx="4.5" ry="3" fill="#F472B6" />
    <path d="M54 73 Q60 79 66 73" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
  </svg>
);

const CarrotSvg = ({ size = 110, style }: { size?: number; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 110 110" fill="none" style={{ display: 'block', ...style }}>
    {/* Leafy Green Crown */}
    <path d="M55 34 C44 12, 32 18, 44 36" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
    <path d="M55 34 C55 10, 66 10, 62 35" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
    <path d="M55 34 C68 14, 80 20, 64 38" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
    {/* Carrot Body */}
    <path
      d="M36 42 C36 32, 74 32, 74 42 L61 94 C59 100, 51 100, 49 94 Z"
      fill={ORANGE}
      stroke={CHARCOAL}
      strokeWidth={3.8}
      strokeLinejoin="round"
    />
    {/* Texture lines */}
    <path d="M44 54 H58 M52 68 H65" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" opacity={0.45} />
  </svg>
);

type Dir = 'up' | 'down' | 'left' | 'right';

const DIR_META: Record<Dir, { label: string; emoji: string; color: string; rotate: number }> = {
  up: { label: 'Atas', emoji: '⬆️', color: SKY, rotate: 0 },
  down: { label: 'Bawah', emoji: '⬇️', color: SUNNY, rotate: 180 },
  left: { label: 'Kiri', emoji: '⬅️', color: CORAL, rotate: -90 },
  right: { label: 'Kanan', emoji: '➡️', color: TEAL, rotate: 90 },
};

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
  return (
    <button
      type="button"
      draggable={draggable}
      onDragStart={onDragStart}
      className={onClick || draggable ? 'cpj6-card-btn' : undefined}
      onClick={onClick}
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: 22,
        background: m.color,
        border: `4px solid ${CHARCOAL}`,
        boxShadow: `0 6px 0 ${CHARCOAL}`,
        ...centerCol,
        cursor: onClick || draggable ? 'pointer' : 'default',
      }}
    >
      {showRightTab && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: -15,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 28,
            borderRadius: '0 14px 14px 0',
            background: m.color,
            border: `4px solid ${CHARCOAL}`,
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
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: SUNNY,
            border: `3px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 18,
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
    </button>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Distinct Leaf-Corner Garden Stage Card)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 6" accentDot={SUNNY}>
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
            background: LAVENDER_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#5B21B6',
            marginBottom: 24,
          }}
        >
          <span>🐰</span>
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
            margin: '28px 0 38px',
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1.38,
            color: MUTED,
            maxWidth: 790,
          }}
        >
          Merangkai Blok Panah Bantu Kelinci Ambil Wortel
        </p>

        {/* Quick Pill Highlights */}
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
            <span>🔗</span>
            <span>Rangkai Sekuens</span>
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
            <span>🥕</span>
            <span>Misi Kelinci &amp; Wortel</span>
          </div>
        </div>
      </div>

      {/* Right Visual Showcase: Asymmetric Garden Leaf Card (Distinct from Pertemuan 1-5) */}
      <div style={{ ...abs(1000, 170, 820, 775), ...centerCol }}>
        {/* Leaf-Shaped Asymmetric Meadow Backdrop */}
        <div
          style={{
            position: 'absolute',
            width: 650,
            height: 615,
            borderRadius: '44px 175px 44px 175px',
            background: 'linear-gradient(155deg, #ECFDF5 0%, #FEF9C3 100%)',
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${LAVENDER}`,
            overflow: 'hidden',
          }}
        >
          {/* Stepping stone dots */}
          <svg width="100%" height="100%" viewBox="0 0 650 615" fill="none" style={{ opacity: 0.35 }}>
            <circle cx="140" cy="510" r="24" fill={TEAL} />
            <circle cx="235" cy="495" r="22" fill={TEAL} />
            <circle cx="330" cy="480" r="20" fill={TEAL} />
          </svg>
        </div>

        {/* Mini Bunny & Carrot Screen + Snapped Arrow Blocks */}
        <div
          style={{
            position: 'absolute',
            left: 34,
            top: 44,
            width: 420,
            padding: '16px 20px',
            borderRadius: 24,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            zIndex: 4,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ ...row, gap: 8 }}>
              <BunnySvg size={54} style={{ animation: live ? 'cpj6-hop 2.4s ease-in-out infinite' : undefined }} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                ➡️ ➡️ ⬆️
              </span>
            </div>
            <CarrotSvg size={54} />
          </div>

          <div style={{ ...row, gap: 10, justifyContent: 'center' }}>
            <PuzzleArrowBlock dir="right" size={72} stepNum={1} showRightTab />
            <PuzzleArrowBlock dir="right" size={72} stepNum={2} showRightTab />
            <PuzzleArrowBlock dir="up" size={72} stepNum={3} />
          </div>
        </div>

        <BikoMascot
          pose="cover-laptop"
          width={420}
          style={{ position: 'relative', zIndex: 3, marginTop: 150, marginLeft: 105 }}
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

    <MacWindowCard left={X0} top={250} width={1280} height={675} headerLabel="daftar-misi-6.exe" padding={42}>
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

          <div style={{ ...row, gap: 10 }}>
            <PuzzleArrowBlock dir="right" size={88} showRightTab />
            <PuzzleArrowBlock dir="right" size={88} showRightTab />
            <PuzzleArrowBlock dir="up" size={88} />
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 36,
              fontWeight: 700,
              lineHeight: 1.24,
              color: CHARCOAL,
            }}
          >
            Rangkai <Highlight color="#DBEAFE">Blok Panah Berurutan</Highlight> (Sekuens)
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

          <div style={{ ...row, gap: 8, alignItems: 'center' }}>
            <BunnySvg size={135} />
            <CarrotSvg size={115} />
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 36,
              fontWeight: 700,
              lineHeight: 1.24,
              color: CHARCOAL,
            }}
          >
            Bantu <Highlight color="#D1FAE5">Kelinci</Highlight> Ambil <Highlight color={STABILO}>Wortel</Highlight> Segar!
          </div>
        </div>
      </div>
    </MacWindowCard>

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
        Ayo Rangkai! 🔗
      </div>
    </div>
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
      <MacWindowCard left={X0} top={245} width={960} height={685} headerLabel="apa-itu-sekuens.app" padding={28}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: 'linear-gradient(180deg, #EFF6FF 0%, #ECFDF5 100%)',
            border: `3px solid ${CHARCOAL}`,
            padding: '28px 34px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Glowing Connected Blocks 1 -> 2 -> 3 */}
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
                    borderRadius: 28,
                    background: isLit ? STABILO : 'transparent',
                    border: isLit ? `3px solid ${CHARCOAL}` : '3px solid transparent',
                    transition: 'all 180ms ease',
                  }}
                >
                  <PuzzleArrowBlock
                    dir={b.dir}
                    size={128}
                    stepNum={b.n}
                    showRightTab={b.n < 3}
                    onClick={() => setActiveStep(b.n)}
                  />
                </div>
              );
            })}
          </div>

          {/* Reading Direction Arrow + Pointing Biko */}
          <div style={{ width: '100%', ...row, justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <BikoMascot pose="point-right" width={235} style={{ marginBottom: -12 }} />
            <div style={{ ...centerCol, gap: 12, marginBottom: 24 }}>
              <div
                style={{
                  padding: '12px 26px',
                  borderRadius: 99,
                  background: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 5px 0 ${TEAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                🤖 Baca Urutan: Blok #{activeStep}
              </div>
              <button
                type="button"
                className="cpj6-card-btn"
                onClick={() => setActiveStep((s) => (s === 3 ? 1 : ((s + 1) as 1 | 2 | 3)))}
                style={{
                  padding: '10px 24px',
                  borderRadius: 99,
                  background: TEAL,
                  color: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                ➡️ Langkah Berikutnya
              </button>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: Concise Cards */}
      <div style={{ ...abs(1105, 255, 715, 675), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
          <span style={{ fontSize: 54 }}>🔗</span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.25 }}>
            Blok panah disambung <Highlight color="#DBEAFE">Satu per Satu</Highlight>
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
          <span style={{ fontSize: 54 }}>🤖</span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.25 }}>
            Komputer baca dari <Highlight color="#D1FAE5">Awal ke Akhir</Highlight>
          </span>
        </div>

        <div
          style={{
            padding: '24px 28px',
            borderRadius: 26,
            background: SUNNY_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 28,
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          1️⃣ ➡️ 2️⃣ ➡️ 3️⃣ Jalan berurutan! ✨
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus Merangkai Blok Panah (3 Step Cards in MacWindowCard)
// ============================================================================
const CHAIN_STEPS = [
  { num: 1, color: SKY, soft: SKY_SOFT, icon: '1️⃣', title: 'Geser blok', sub: 'Panah Pertama' },
  { num: 2, color: SUNNY, soft: SUNNY_SOFT, icon: '2️⃣', title: 'Tempel blok:', sub: '"Klik!"' },
  { num: 3, color: TEAL, soft: TEAL_SOFT, icon: '▶️', title: 'Tekan tombol', sub: 'Jalan!' },
];

const Slide04JurusMerangkai: Page = () => {
  const [snapped, setSnapped] = useState(true);

  return (
    <JuniorFrame badge="JURUS MERANGKAI BLOK" accentDot={SKY}>
      <SlideTitle>
        Sambung Seperti <Highlight>Puzzle!</Highlight>
      </SlideTitle>

      <MacWindowCard left={X0} top={240} width={W} height={695} headerLabel="jurus-sambung-blok.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 26 }}>
          {/* Top 3 Step Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28 }}>
            {CHAIN_STEPS.map((st) => (
              <div
                key={st.num}
                style={{
                  borderRadius: 26,
                  background: st.soft,
                  border: `4px solid ${CHARCOAL}`,
                  boxShadow: `0 8px 0 ${st.color}`,
                  padding: '22px 24px',
                  ...row,
                  gap: 18,
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
                  <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
                    {st.icon} {st.title}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: MUTED, marginTop: 4 }}>{st.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Magnetic Snap + Play Button Demo */}
          <div
            style={{
              flex: 1,
              borderRadius: 26,
              background: '#FFFDF7',
              border: `3px dashed #D6CDBB`,
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
                      top: -28,
                      left: -32,
                      padding: '4px 14px',
                      borderRadius: 99,
                      background: SUNNY,
                      border: `2.5px solid ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 22,
                      fontWeight: 700,
                      transform: 'rotate(-8deg)',
                    }}
                  >
                    KLIK! ✨
                  </div>
                )}
              </div>
            </div>

            <div style={{ ...row, gap: 22 }}>
              <button
                type="button"
                className="cpj6-card-btn"
                onClick={() => setSnapped((s) => !s)}
                style={{
                  padding: '16px 32px',
                  borderRadius: 99,
                  background: snapped ? WHITE : SKY,
                  color: snapped ? CHARCOAL : WHITE,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: `0 6px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                {snapped ? '↔️ Lepas Blok' : '🧲 Tempelkan Blok!'}
              </button>

              <div
                style={{
                  padding: '18px 36px',
                  borderRadius: 99,
                  background: TEAL,
                  color: WHITE,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: `0 6px 0 ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 30,
                  fontWeight: 700,
                }}
              >
                ▶️ Jalan!
              </div>
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

      <MacWindowCard left={X0} top={245} width={W} height={695} headerLabel="latihan-jejak-lurus.app" padding={34}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top 2 Concise Icon Points */}
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
              <span>🐰</span>
              <span>Kelinci butuh 2 Langkah ke kanan</span>
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
              <span>🧩</span>
              <span>Rangkai blok: [ ➡️ ] + [ ➡️ ]</span>
            </div>
          </div>

          {/* 3-Box Horizontal Map */}
          <div
            style={{
              padding: '28px 36px',
              borderRadius: 26,
              background: 'linear-gradient(180deg, #ECFDF5 0%, #FFFBEB 100%)',
              border: `3px solid ${CHARCOAL}`,
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
                      height: 180,
                      borderRadius: 26,
                      background: isCarrotHere ? SUNNY_SOFT : step > idx ? TEAL_SOFT : WHITE,
                      border: `4px solid ${isBunnyHere ? TEAL : CHARCOAL}`,
                      boxShadow: isBunnyHere ? `0 0 0 6px ${STABILO}` : `0 6px 0 #CBD5E1`,
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
                      <span style={{ fontSize: 48, opacity: 0.7 }}>👣</span>
                    )}
                  </div>
                  {idx < 2 && (
                    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 42, fontWeight: 700, color: TEAL }}>
                      ➜
                    </span>
                  )}
                </Fragment>
              );
            })}
          </div>

          {/* Snapped Arrow Blocks + Step Replay */}
          <div style={{ ...row, justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ ...row, gap: 16 }}>
              <PuzzleArrowBlock dir="right" size={96} stepNum={1} showRightTab />
              <PuzzleArrowBlock dir="right" size={96} stepNum={2} />
            </div>

            <div style={{ ...row, gap: 14 }}>
              {[
                { s: 0 as const, label: 'Start 🐰' },
                { s: 1 as const, label: '1. Kanan ➡️' },
                { s: 2 as const, label: '2. Dapat Wortel! 🥕' },
              ].map((btn) => (
                <button
                  key={btn.s}
                  type="button"
                  className="cpj6-card-btn"
                  onClick={() => setStep(btn.s)}
                  style={{
                    padding: '12px 22px',
                    borderRadius: 99,
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
      <SlideTitle align="center" top={124}>
        Rangkaian Mana yang <Highlight>Sampai?</Highlight>
      </SlideTitle>

      {/* Top 3-Box Scenario Bar */}
      <div
        style={{
          ...abs(260, 212, 1400, 126),
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
          { label: choice === 'B' ? 'Start' : '🐰 Kelinci', bg: choice === 'B' ? '#F8FAFC' : TEAL_SOFT },
          { label: choice === 'B' ? '➡️' : choice === 'A' ? '🐰 Berhenti!' : 'Kotak Kosong', bg: choice === 'A' ? CORAL_SOFT : '#F8FAFC' },
          { label: choice === 'B' ? '🐰 + 🥕!' : '🥕 Wortel', bg: SUNNY_SOFT },
        ].map((cell, i) => (
          <Fragment key={i}>
            <div
              style={{
                width: 280,
                height: 82,
                borderRadius: 20,
                background: cell.bg,
                border: `3px solid ${CHARCOAL}`,
                ...centerCol,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              {cell.label}
            </div>
            {i < 2 && <span style={{ fontSize: 28, fontWeight: 700, color: MUTED }}>➡️</span>}
          </Fragment>
        ))}
      </div>

      {/* Two Big Interactive Choice Cards */}
      <div style={{ ...abs(180, 365, 1560, 350), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        {/* Kartu A: 1 Langkah */}
        <button
          type="button"
          className="cpj6-card-btn"
          onClick={() => setChoice('A')}
          style={{
            borderRadius: 32,
            background: choice === 'A' ? CORAL_SOFT : WHITE,
            border: `4px solid ${choice === 'A' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${choice === 'A' ? CORAL : SKY}`,
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
            PILIHAN A
          </div>

          <PuzzleArrowBlock dir="right" size={114} />

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 40, fontWeight: 700, color: CHARCOAL }}>
            1 Langkah
          </div>
        </button>

        {/* Kartu B: 2 Langkah */}
        <button
          type="button"
          className="cpj6-card-btn"
          onClick={() => setChoice('B')}
          style={{
            borderRadius: 32,
            background: choice === 'B' ? TEAL_SOFT : WHITE,
            border: `4px solid ${choice === 'B' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${choice === 'B' ? TEAL : SUNNY}`,
            padding: '22px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              padding: '6px 22px',
              borderRadius: 99,
              background: TEAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            PILIHAN B
          </div>

          <div style={{ ...row, gap: 16 }}>
            <PuzzleArrowBlock dir="right" size={104} showRightTab />
            <PuzzleArrowBlock dir="right" size={104} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 40, fontWeight: 700, color: CHARCOAL }}>
            2 Langkah
          </div>
        </button>
      </div>

      {/* Bottom Center: Biko Holding ? Sign + Prompt / Feedback Pill */}
      <div style={{ ...abs(240, 725, 1440, 275), ...row, justifyContent: 'center', gap: 36 }}>
        <BikoMascot pose="question" width={225} />

        <div
          style={{
            padding: '24px 38px',
            borderRadius: 28,
            background: choice === 'B' ? TEAL_SOFT : choice === 'A' ? CORAL_SOFT : STABILO,
            border: `3.5px solid ${choice === 'B' ? TEAL : choice === 'A' ? CORAL : CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 34,
            fontWeight: 700,
            color: CHARCOAL,
            textAlign: 'center',
            minWidth: 580,
          }}
        >
          {choice === 'B' && '✅ BENAR SEKALI! Kelinci butuh 2 Langkah! 🥕'}
          {choice === 'A' && '🤔 Hampir! Kalau 1 langkah, kelinci berhenti di kotak kosong!'}
          {choice === null && '👉 Tunjuk rangkaian blok yang benar di layarmu ya!'}
        </div>
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
      <MacWindowCard left={X0} top={245} width={940} height={685} headerLabel="latihan-jejak-belok.app" padding={28}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: 'linear-gradient(180deg, #ECFDF5 0%, #FFFBEB 100%)',
            border: `3px solid ${CHARCOAL}`,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 148px)', gap: 16 }}>
            {Array.from({ length: 9 }).map((_, idx) => {
              const isBunny = idx === bunnyIdx;
              const isCarrot = idx === 4;
              const isPath = idx === 6 || idx === 7;
              return (
                <div
                  key={idx}
                  style={{
                    width: 148,
                    height: 132,
                    borderRadius: 22,
                    background: isCarrot ? SUNNY_SOFT : isPath ? TEAL_SOFT : WHITE,
                    border: `3.5px solid ${isBunny ? TEAL : CHARCOAL}`,
                    boxShadow: isBunny ? `0 0 0 5px ${STABILO}` : '0 4px 0 #CBD5E1',
                    ...centerCol,
                    position: 'relative',
                  }}
                >
                  {isBunny && isCarrot ? (
                    <div style={{ ...row, gap: 2 }}>
                      <BunnySvg size={68} />
                      <CarrotSvg size={64} />
                    </div>
                  ) : isBunny ? (
                    <BunnySvg size={88} />
                  ) : isCarrot ? (
                    <CarrotSvg size={84} />
                  ) : idx === 6 ? (
                    <span style={{ fontSize: 36 }}>➡️</span>
                  ) : idx === 7 ? (
                    <span style={{ fontSize: 36 }}>⬆️</span>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div style={{ ...row, gap: 14 }}>
            {[
              { s: 0 as const, label: 'Start 🐰' },
              { s: 1 as const, label: '1. Kanan ➡️' },
              { s: 2 as const, label: '2. Atas ⬆️🥕' },
            ].map((btn) => (
              <button
                key={btn.s}
                type="button"
                className="cpj6-card-btn"
                onClick={() => setStep(btn.s)}
                style={{
                  padding: '10px 22px',
                  borderRadius: 99,
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

      {/* Right Column: Concise Cards + Snapped Blocks */}
      <div style={{ ...abs(1085, 245, 735, 685), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div
          style={{
            ...row,
            gap: 18,
            padding: '22px 26px',
            borderRadius: 24,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${TEAL}`,
          }}
        >
          <span style={{ fontSize: 46 }}>1️⃣</span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
            Jalan <Highlight color="#D1FAE5">1 Kotak ke Kanan</Highlight> (➡️)
          </span>
        </div>

        <div
          style={{
            ...row,
            gap: 18,
            padding: '22px 26px',
            borderRadius: 24,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${SKY}`,
          }}
        >
          <span style={{ fontSize: 46 }}>2️⃣</span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
            Lalu <Highlight color="#DBEAFE">1 Kotak ke Atas</Highlight> (⬆️)
          </span>
        </div>

        <div
          style={{
            ...row,
            gap: 18,
            padding: '22px 26px',
            borderRadius: 24,
            background: SUNNY_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${SUNNY}`,
          }}
        >
          <span style={{ fontSize: 46 }}>🥕</span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
            Hore, <Highlight>Dapat Wortel!</Highlight>
          </span>
        </div>

        {/* Rangkaian Blok Tersambung */}
        <div
          style={{
            padding: '24px 30px',
            borderRadius: 28,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
            Rangkaian Blok:
          </span>
          <div style={{ ...row, gap: 16 }}>
            <PuzzleArrowBlock dir="right" size={92} stepNum={1} showRightTab />
            <PuzzleArrowBlock dir="up" size={92} stepNum={2} />
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Merangkai Jejak (Boleh vs Jangan)
// ============================================================================
const Slide08TipsMerangkai: Page = () => (
  <JuniorFrame badge="TIPS JAGOAN" accentDot={TEAL}>
    <SlideTitle>
      Rahasia Biar Kelinci <Highlight>Sampai!</Highlight>
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

      {/* Visual: Tightly Snapped Blocks */}
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
        <div style={{ ...row, gap: 12 }}>
          <PuzzleArrowBlock dir="right" size={76} showRightTab />
          <PuzzleArrowBlock dir="up" size={76} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: '#065F46' }}>
          Menempel Rapat! ✅
        </div>
      </div>

      <div style={{ ...row, gap: 20, padding: '22px 26px', borderRadius: 24, background: WHITE, border: `3px solid ${CHARCOAL}` }}>
        <span style={{ fontSize: 46 }}>🔗</span>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700 }}>
          <Highlight color="#D1FAE5">Tempel Blok</Highlight> sampai menyatu
        </div>
      </div>

      <div style={{ ...row, gap: 20, padding: '22px 26px', borderRadius: 24, background: WHITE, border: `3px solid ${CHARCOAL}` }}>
        <span style={{ fontSize: 46 }}>👣</span>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700 }}>
          <Highlight color="#D1FAE5">Hitung Kotak</Highlight> satu per satu
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

      {/* Visual: Disconnected Blocks */}
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
        <div style={{ ...row, gap: 58 }}>
          <PuzzleArrowBlock dir="right" size={76} showRightTab />
          <PuzzleArrowBlock dir="left" size={76} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: '#991B1B' }}>
          Terpisah! ❌
        </div>
      </div>

      <div style={{ ...row, gap: 20, padding: '22px 26px', borderRadius: 24, background: WHITE, border: `3px solid ${CHARCOAL}` }}>
        <span style={{ fontSize: 46 }}>🧩</span>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700 }}>
          Blok <Highlight color="#FEE2E2">Terputus</Highlight> di tengah jalan
        </div>
      </div>

      <div style={{ ...row, gap: 20, padding: '22px 26px', borderRadius: 24, background: WHITE, border: `3px solid ${CHARCOAL}` }}>
        <span style={{ fontSize: 46 }}>🔄</span>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700 }}>
          <Highlight color="#FEE2E2">Salah Arah</Highlight> panahnya
        </div>
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Bantu Kelinci Ambil Wortel! (3 Blok + Obstacle Game)
// ============================================================================
const MISSION_BLOCKS = [
  { num: 1, color: SKY, soft: SKY_SOFT, title: 'Hitung', sub: 'kotak jalan kelinci', icon: '👣' },
  { num: 2, color: SUNNY, soft: SUNNY_SOFT, title: 'Rangkai', sub: 'blok panah berurutan', icon: '🔗' },
  { num: 3, color: TEAL, soft: TEAL_SOFT, title: 'Jalan!', sub: 'Wortel termakan!', icon: '🥕' },
];

// 3x3 Grid:
// (0,0) [0]  (0,1) [1]  (0,2) [2: Carrot!]
// (1,0) [3]  (1,1) [4: Rock] (1,2) [5]
// (2,0) [6: Bunny Start] (2,1) [7] (2,2) [8]
// Shortest 4-step path avoiding Rock at (1,1): right, right, up, up (or up, up, right, right)
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
      <SlideTitle>
        Misi <Highlight>Kelinci &amp; Wortel!</Highlight>
      </SlideTitle>

      {/* Top Row: 3 ScratchJr-Style Step Blocks */}
      <div style={{ ...abs(X0, 222, W, 174), ...row, justifyContent: 'space-between', gap: 18 }}>
        {MISSION_BLOCKS.map((blk, i) => (
          <Fragment key={blk.num}>
            <div
              style={{
                flex: 1,
                height: 160,
                borderRadius: 26,
                background: blk.soft,
                border: `4px solid ${CHARCOAL}`,
                boxShadow: `0 7px 0 ${blk.color}`,
                padding: '16px 22px',
                ...row,
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background: blk.color,
                  border: `3px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 32,
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
                <path d="M6 22 H34 M24 12 L36 22 L24 32" stroke={CHARCOAL} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </Fragment>
        ))}
      </div>

      {/* Interactive Bunny & Golden Carrot Game Board */}
      <MacWindowCard left={X0} top={420} width={1320} height={552} headerLabel="game-kelinci-wortel.app" padding={22}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: 'linear-gradient(180deg, #ECFDF5 0%, #FFFBEB 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            padding: '18px 24px',
            display: 'grid',
            gridTemplateColumns: '410px 1fr',
            gap: 28,
            alignItems: 'center',
          }}
        >
          {/* Left: 3x3 Meadow Grid with Rock Obstacle */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 120px)', gap: 12, justifyContent: 'center' }}>
            {Array.from({ length: 9 }).map((_, idx) => {
              const isBunny = idx === bunnyIdx;
              const isCarrot = idx === 2;
              const isRock = idx === 4;
              return (
                <div
                  key={idx}
                  style={{
                    width: 120,
                    height: 112,
                    borderRadius: 18,
                    background: isCarrot ? SUNNY_SOFT : isRock ? '#E2E8F0' : WHITE,
                    border: `3px solid ${isBunny ? TEAL : CHARCOAL}`,
                    boxShadow: isBunny ? `0 0 0 4px ${STABILO}` : '0 4px 0 #CBD5E1',
                    ...centerCol,
                  }}
                >
                  {isBunny && isCarrot ? (
                    <div style={{ ...row, gap: 2 }}>
                      <BunnySvg size={54} />
                      <CarrotSvg size={52} />
                    </div>
                  ) : isBunny ? (
                    <BunnySvg size={72} />
                  ) : isCarrot ? (
                    <CarrotSvg size={72} />
                  ) : isRock ? (
                    <span style={{ fontSize: 44 }}>🪨</span>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Right: Command Sequence Builder */}
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '6px 0' }}>
            <div>
              <div style={{ fontSize: 19, fontWeight: 800, color: MUTED, marginBottom: 10 }}>
                1. KLIK ATAU GESER BLOK PANAH (HINDARI BATU 🪨):
              </div>
              <div style={{ ...row, gap: 14 }}>
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
                2. RANGKAIAN SEKUENS 1–4 (KLIK SLOT UNTUK HAPUS):
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
                      width: 104,
                      height: 88,
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
                    {cmd ? DIR_META[cmd].emoji : idx + 1}
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
                    borderRadius: 99,
                    background: TEAL,
                    color: WHITE,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 5px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                >
                  ▶️ Jalan!
                </button>
                <button
                  type="button"
                  className="cpj6-card-btn"
                  onClick={resetGame}
                  style={{
                    padding: '12px 20px',
                    borderRadius: 99,
                    background: WHITE,
                    color: CHARCOAL,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 4px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  🔄 Ulang
                </button>
              </div>

              <div
                style={{
                  padding: '10px 18px',
                  borderRadius: 99,
                  background: status === 'won' ? TEAL_SOFT : status === 'rock' || status === 'oops' ? CORAL_SOFT : STABILO,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontSize: 19,
                  fontWeight: 800,
                }}
              >
                {status === 'won' && '🎉 Nyam! Wortel Emas Termakan! 🥕'}
                {status === 'rock' && '🪨 Ups, nabrak batu! Lewat jalur pinggir ya!'}
                {status === 'oops' && '🤔 Belum sampai! Coba ➡️ ➡️ ⬆️ ⬆️'}
                {status === 'idle' && '💡 Petunjuk: ➡️ ➡️ ⬆️ ⬆️ atau ⬆️ ⬆️ ➡️ ➡️'}
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko + Bunny on Right */}
      <div style={{ ...abs(1455, 450, 365, 500), ...centerCol }}>
        <BikoMascot pose={status === 'won' ? 'jump' : 'thumbs-up'} width={305} />
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
          {status === 'won' ? 'Hore Wortel! 🥕🎉' : 'Semangat Kelinci! 🐰'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 6
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
            animation: live ? `cpj6-confetti ${2.4 + (idx % 3) * 0.4}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={130} size={62}>
        Keren! Kamu <Highlight color={STABILO}>Master Urutan! 🎉</Highlight>
      </SlideTitle>

      {/* Center Celebration Medal Card */}
      <MacWindowCard left={170} top={250} width={1140} height={680} headerLabel="lencana-juara-6.award" padding={42}>
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-between', textAlign: 'center' }}>
          {/* Gold Medal SVG with Star Arrow Block & Carrot */}
          <svg width={270} height={260} viewBox="0 0 260 250" fill="none">
            {/* Ribbons */}
            <path d="M90 156 L66 238 L104 218 L122 240 L122 156 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            <path d="M170 156 L194 238 L156 218 L138 240 L138 156 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            {/* Gold Medal */}
            <circle cx="130" cy="98" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
            <circle cx="130" cy="98" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={3.5} />
            {/* Arrow Block Inside Left */}
            <rect x="78" y="72" width="54" height="54" rx="14" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.5} />
            <path d="M92 99 H118 M108 89 L120 99 L108 109" stroke={WHITE} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
            {/* Carrot Inside Right */}
            <path d="M162 72 C154 58, 170 58, 162 72" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
            <path d="M148 76 C148 70, 176 70, 176 76 L166 124 C164 128, 160 128, 158 124 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
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
            🏅 Lencana Jagoan Jejak Berurutan
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 32,
              fontWeight: 700,
              lineHeight: 1.38,
              maxWidth: 900,
              color: CHARCOAL,
            }}
          >
            Kamu sudah mahir merangkai <Highlight>Blok Panah</Highlight> untuk membantu{' '}
            <Highlight color="#D1FAE5">Kelinci!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Celebrating Jumping Biko + Jumping Bunny on Right */}
      <div style={{ ...abs(1345, 385, 480, 520), ...row, alignItems: 'flex-end', justifyContent: 'center' }}>
        <BikoMascot pose="jump" width={360} />
        <BunnySvg
          size={150}
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
1. Geser blok panah pertama. 2. Tempel blok berikutnya sampai bunyi "Klik!". 3. Tekan tombol hijau Jalan!`,

  `Latihan Jejak #1: Kelinci mau jalan lurus mengambil wortel.
Hitung kotaknya ya: Kelinci butuh 2 langkah ke kanan, jadi kita rangkai [ ➡️ ] + [ ➡️ ]!`,

  `Permainan Cepat! Ayo tebak rangkaian blok mana yang membuat kelinci sampai ke wortel:
Pilihan A (1 Langkah) atau Pilihan B (2 Langkah)?`,

  `Latihan Jejak #2: Wah, wortelnya belok!
Pertama jalan 1 kotak ke Kanan (➡️), lalu jalan 1 kotak ke Atas (⬆️). Hore, dapat wortel!`,

  `Tips Jagoan Merangkai Jejak:
BOLEH tempel blok sampai menyatu rapat dan hitung kotak satu per satu.
JANGAN biarkan blok terputus di tengah jalan atau salah arah panahnya ya!`,

  `Waktunya praktik Game Kelinci & Wortel!
Hati-hati ada rintangan batu (🪨) di tengah! Rangkai 4 blok panah menghindari batu (petunjuk: ➡️ ➡️ ⬆️ ⬆️ atau ⬆️ ⬆️ ➡️ ➡️), lalu klik Jalan!`,

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

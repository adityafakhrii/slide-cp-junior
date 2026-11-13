import { Fragment, useState, type CSSProperties, type DragEvent, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-5-komando-panah-ajaib';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj5-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj5-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj5-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj5-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.07); }
}
.cpj5-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj5-card-btn:hover {
  transform: translateY(-4px);
}
.cpj5-card-btn:active {
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
          animation: live ? 'cpj5-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 5 • Komando Panah Ajaib</span>
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
// Reusable Flat-Vector Arrow Command Blocks & Compass Art
// ============================================================================
type Dir = 'up' | 'down' | 'left' | 'right';

const DIR_META: Record<Dir, { label: string; icon: JuniorIconName; color: string; rotate: number }> = {
  up: { label: 'Atas', icon: 'arrow-up', color: SKY, rotate: 0 },
  down: { label: 'Bawah', icon: 'arrow-down', color: SUNNY, rotate: 180 },
  left: { label: 'Kiri', icon: 'arrow-left', color: CORAL, rotate: -90 },
  right: { label: 'Kanan', icon: 'arrow-right', color: TEAL, rotate: 90 },
};

const ArrowCommandBlock = ({
  dir,
  size = 110,
  label,
  active = false,
  onClick,
  draggable = false,
  onDragStart,
}: {
  dir: Dir;
  size?: number;
  label?: string;
  active?: boolean;
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
      className={onClick || draggable ? 'cpj5-card-btn' : undefined}
      onClick={onClick}
      style={{
        width: size,
        height: label ? size + 28 : size,
        borderRadius: 24,
        background: m.color,
        border: `4px solid ${CHARCOAL}`,
        boxShadow: active ? `0 0 0 6px ${STABILO}, 0 7px 0 ${CHARCOAL}` : `0 7px 0 ${CHARCOAL}`,
        ...centerCol,
        gap: 4,
        padding: 8,
        cursor: onClick || draggable ? 'pointer' : 'default',
      }}
    >
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
      {label && (
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            color: dir === 'down' ? CHARCOAL : WHITE,
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Hero Split Layout)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 5" accentDot={SUNNY}>
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
          <JuniorIcon name="compass" size={26} />
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
          Komando <Highlight color={STABILO}>Panah Ajaib!</Highlight>
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
          Petualangan Arah Atas, Bawah, Kiri &amp; Kanan
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
            <span style={{ ...row, gap: 3 }}>
              <JuniorIcon name="arrow-up" size={22} />
              <JuniorIcon name="arrow-down" size={22} />
              <JuniorIcon name="arrow-left" size={22} />
              <JuniorIcon name="arrow-right" size={22} />
            </span>
            <span>4 Arah Panah</span>
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
            <JuniorIcon name="map" size={30} />
            <span>Peta Kotak Bintang</span>
          </div>
        </div>
      </div>

      {/* Right Visual Showcase: Explorer Map Frame + Compass Biko */}
      <div style={{ ...abs(1000, 170, 820, 775), ...centerCol }}>
        {/* Tilted Treasure-Map Card Backdrop (Distinct Chamfered Map Style) */}
        <div
          style={{
            position: 'absolute',
            width: 640,
            height: 600,
            borderRadius: 36,
            background: '#FEF9C3',
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `-14px 14px 0 ${SKY}`,
            transform: 'rotate(2.2deg)',
            overflow: 'hidden',
          }}
        >
          {/* Dashed Explorer Route Trail inside Map Card */}
          <svg width="100%" height="100%" viewBox="0 0 640 600" fill="none" style={{ opacity: 0.45 }}>
            <path
              d="M70 500 Q190 420 260 320 T510 130"
              stroke={CORAL}
              strokeWidth={8}
              strokeDasharray="16 14"
              strokeLinecap="round"
            />
            <circle cx="515" cy="128" r="24" stroke={CORAL} strokeWidth={6} />
          </svg>
        </div>

        {/* Mini Treasure Grid Laptop Card */}
        <div
          style={{
            position: 'absolute',
            left: 28,
            top: 42,
            width: 290,
            padding: '14px 18px',
            borderRadius: 24,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            zIndex: 4,
          }}
        >
          <div style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700, marginBottom: 10 }}>
            <JuniorIcon name="map" size={22} />
            <span>Peta Harta Karun</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {(
              [
                null, null, 'star',
                null, 'arrow-right', 'arrow-up',
                'biko', 'arrow-right', null,
              ] as (JuniorIconName | null)[]
            ).map((cell, idx) => (
              <div
                key={idx}
                style={{
                  height: 54,
                  borderRadius: 12,
                  background: cell === 'star' ? SUNNY_SOFT : cell ? TEAL_SOFT : '#F8FAFC',
                  border: `2.5px solid ${CHARCOAL}`,
                  ...centerCol,
                }}
              >
                {cell && <JuniorIcon name={cell} size={26} />}
              </div>
            ))}
          </div>
        </div>

        {/* 4 Floating Arrow Blocks */}
        <div style={{ position: 'absolute', right: 62, top: 44, zIndex: 4, animation: live ? 'cpj5-float 2.6s ease-in-out infinite' : undefined }}>
          <ArrowCommandBlock dir="up" size={86} />
        </div>
        <div style={{ position: 'absolute', right: 34, top: 230, zIndex: 4, animation: live ? 'cpj5-float 3.1s ease-in-out infinite' : undefined }}>
          <ArrowCommandBlock dir="right" size={82} />
        </div>
        <div style={{ position: 'absolute', left: 52, bottom: 130, zIndex: 4, animation: live ? 'cpj5-float 2.9s ease-in-out infinite' : undefined }}>
          <ArrowCommandBlock dir="left" size={82} />
        </div>
        <div style={{ position: 'absolute', right: 68, bottom: 92, zIndex: 4, animation: live ? 'cpj5-float 3.3s ease-in-out infinite' : undefined }}>
          <ArrowCommandBlock dir="down" size={82} />
        </div>

        {/* Explorer Biko with Golden Compass */}
        <BikoMascot
          pose="explorer"
          width={410}
          badgeIcon={<JuniorIcon name="compass" size={34} />}
          style={{ position: 'relative', zIndex: 3, marginTop: 125, marginLeft: 55 }}
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

    <MacWindowCard left={X0} top={250} width={1280} height={675} headerLabel="daftar-misi-5.exe" padding={42}>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <ArrowCommandBlock dir="up" size={84} />
            <ArrowCommandBlock dir="down" size={84} />
            <ArrowCommandBlock dir="left" size={84} />
            <ArrowCommandBlock dir="right" size={84} />
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.24,
              color: CHARCOAL,
            }}
          >
            Kenali <Highlight color="#DBEAFE">4 Arah Panah Ajaib</Highlight>
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

          {/* Mini 3x2 Step Grid to Star */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 84px)', gap: 10 }}>
            {(
              [
                { bg: WHITE, icon: 'biko' },
                { bg: SUNNY_SOFT, icon: 'arrow-right' },
                { bg: WHITE },
                { bg: WHITE },
                { bg: SUNNY_SOFT, icon: 'arrow-down' },
                { bg: SUNNY, icon: 'star' },
              ] as { bg: string; icon?: JuniorIconName }[]
            ).map((c, idx) => (
              <div
                key={idx}
                style={{
                  width: 84,
                  height: 78,
                  borderRadius: 16,
                  background: c.bg,
                  border: `3px solid ${CHARCOAL}`,
                  ...centerCol,
                }}
              >
                {c.icon && <JuniorIcon name={c.icon} size={34} />}
              </div>
            ))}
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.24,
              color: CHARCOAL,
            }}
          >
            Bantu <Highlight color="#D1FAE5">Biko</Highlight> Sampai ke Bintang!
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
        <span>Siap Beraksi!</span>
        <JuniorIcon name="compass" size={26} />
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Kenalan Sama 4 Panah Ajaib (Spotlight Center Cross-Pad)
// ============================================================================
const Slide03CrossPad: Page = () => {
  const [selected, setSelected] = useState<Dir>('up');
  const activeMeta = DIR_META[selected];

  return (
    <JuniorFrame badge="KOMANDO ARAH" accentDot={SUNNY}>
      <SlideTitle align="center" top={128}>
        Ini <Highlight>4 Panah Ajaib</Highlight> Kita!
      </SlideTitle>

      <MacWindowCard left={190} top={232} width={1540} height={720} headerLabel="komando-4-panah.app" padding={28}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 24,
            background: 'linear-gradient(180deg, #FFFDF7 0%, #EFF6FF 100%)',
            border: `3px solid ${CHARCOAL}`,
            ...centerCol,
          }}
        >
          {/* Cross-Pad Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '210px 270px 210px',
              gridTemplateRows: '155px 240px 155px',
              alignItems: 'center',
              justifyItems: 'center',
              gap: 10,
            }}
          >
            <div />
            <ArrowCommandBlock dir="up" size={120} label="Atas" active={selected === 'up'} onClick={() => setSelected('up')} />
            <div />

            <ArrowCommandBlock dir="left" size={120} label="Kiri" active={selected === 'left'} onClick={() => setSelected('left')} />

            {/* Center Circle with Cheerful Biko */}
            <div
              style={{
                width: 230,
                height: 230,
                borderRadius: '50%',
                background: SUNNY_SOFT,
                border: `4px solid ${CHARCOAL}`,
                boxShadow: `0 8px 0 ${CHARCOAL}`,
                ...centerCol,
                overflow: 'hidden',
              }}
            >
              <BikoMascot pose="wave" width={165} style={{ marginTop: 18 }} />
            </div>

            <ArrowCommandBlock dir="right" size={120} label="Kanan" active={selected === 'right'} onClick={() => setSelected('right')} />

            <div />
            <ArrowCommandBlock dir="down" size={120} label="Bawah" active={selected === 'down'} onClick={() => setSelected('down')} />
            <div />
          </div>

          {/* Interactive Direction Callout Pill */}
          <div
            style={{
              position: 'absolute',
              right: 32,
              bottom: 26,
              padding: '12px 24px',
              borderRadius: 99,
              background: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 5px 0 ${activeMeta.color}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {activeMeta.emoji} Arah dipilih: <Highlight color={STABILO}>{activeMeta.label}</Highlight>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Arah Atas & Bawah (Naik & Turun)
// ============================================================================
const Slide04AtasBawah: Page = () => (
  <JuniorFrame badge="JURUS ARAH #1" accentDot={SKY}>
    <SlideTitle>
      Naik ke <Highlight>Atas</Highlight>, Turun ke <Highlight>Bawah</Highlight>
    </SlideTitle>

    <MacWindowCard left={X0} top={245} width={W} height={695} headerLabel="arah-atas-bawah.app" padding={38}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 38, height: '100%' }}>
        {/* Kartu 1: Atas = Melangkah Naik */}
        <div
          style={{
            borderRadius: 28,
            background: SKY_SOFT,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 10px 0 ${SKY}`,
            padding: '32px 34px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ ...row, gap: 16 }}>
            <ArrowCommandBlock dir="up" size={92} />
            <div
              style={{
                ...row,
                gap: 10,
                padding: '10px 24px',
                borderRadius: 99,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="arrow-up" size={28} />
              <span>ATAS</span>
            </div>
          </div>

          {/* Ladder + Cloud & Star Illustration + Biko Climbing */}
          <div style={{ position: 'relative', width: 420, height: 270, ...row, justifyContent: 'center', gap: 28 }}>
            <svg width={210} height={260} viewBox="0 0 210 260" fill="none">
              {/* Cloud & Star at Top */}
              <path d="M36 58 H114 C126 58, 130 38, 114 34 C108 18, 80 18, 74 34 C56 30, 34 44, 36 58 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M164 18 L170 32 L185 34 L174 44 L177 59 L164 52 L151 59 L154 44 L143 34 L158 32 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
              {/* Wooden Ladder */}
              <line x1="78" y1="74" x2="78" y2="246" stroke="#92400E" strokeWidth={10} strokeLinecap="round" />
              <line x1="138" y1="74" x2="138" y2="246" stroke="#92400E" strokeWidth={10} strokeLinecap="round" />
              {[104, 142, 180, 218].map((y) => (
                <line key={y} x1="78" y1={y} x2="138" y2={y} stroke="#D97706" strokeWidth={8} strokeLinecap="round" />
              ))}
              {/* Big Up Arrow Beside Ladder */}
              <path d="M174 220 V110 M158 128 L174 106 L190 128" stroke={SKY} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <BikoMascot pose="jump" width={175} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Atas = Melangkah <Highlight color="#DBEAFE">Naik</Highlight>
          </div>
        </div>

        {/* Kartu 2: Bawah = Melangkah Turun */}
        <div
          style={{
            borderRadius: 28,
            background: SUNNY_SOFT,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 10px 0 ${SUNNY}`,
            padding: '32px 34px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ ...row, gap: 16 }}>
            <ArrowCommandBlock dir="down" size={92} />
            <div
              style={{
                ...row,
                gap: 10,
                padding: '10px 24px',
                borderRadius: 99,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="arrow-down" size={28} />
              <span>BAWAH</span>
            </div>
          </div>

          {/* Slide Down to Treasure Chest Illustration */}
          <div style={{ position: 'relative', width: 420, height: 270, ...row, justifyContent: 'center', gap: 18 }}>
            <BikoMascot pose="wave" width={165} style={{ marginBottom: 40 }} />
            <svg width={220} height={260} viewBox="0 0 220 260" fill="none">
              {/* Slide Ramp */}
              <path d="M24 54 Q96 76 138 174" stroke={CORAL} strokeWidth={16} strokeLinecap="round" fill="none" />
              <path d="M24 54 Q96 76 138 174" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" fill="none" />
              {/* Big Down Arrow */}
              <path d="M178 60 V168 M162 150 L178 172 L194 150" stroke={SUNNY} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
              {/* Treasure Chest at Bottom */}
              <rect x="92" y="182" width="102" height="58" rx="12" fill="#B45309" stroke={CHARCOAL} strokeWidth={4} />
              <path d="M92 204 H194" stroke={SUNNY} strokeWidth={8} />
              <rect x="134" y="194" width="18" height="22" rx="5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
            </svg>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Bawah = Melangkah <Highlight color={STABILO}>Turun</Highlight>
          </div>
        </div>
      </div>
    </MacWindowCard>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 05 — Arah Kiri & Kanan (Searah Pandangan Anak)
// ============================================================================
const Slide05KiriKanan: Page = () => (
  <JuniorFrame badge="JURUS ARAH #2" accentDot={TEAL}>
    <SlideTitle>
      Geser <Highlight>Kiri</Highlight> &amp; <Highlight color="#D1FAE5">Kanan</Highlight>
    </SlideTitle>

    <MacWindowCard left={X0} top={245} width={W} height={695} headerLabel="arah-kiri-kanan.app" padding={38}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 38, height: '100%' }}>
        {/* Kartu 1: Kiri (Coral #F45B49) */}
        <div
          style={{
            borderRadius: 28,
            background: CORAL_SOFT,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 10px 0 ${CORAL}`,
            padding: '32px 34px',
            ...centerCol,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          <div style={{ ...row, gap: 16 }}>
            <ArrowCommandBlock dir="left" size={92} />
            <div
              style={{
                ...row,
                gap: 10,
                padding: '10px 24px',
                borderRadius: 99,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="arrow-left" size={28} />
              <span>KIRI</span>
            </div>
          </div>

          {/* Biko Facing Left + Big Left Trail */}
          <div style={{ ...row, alignItems: 'center', gap: 14 }}>
            <svg width={180} height={100} viewBox="0 0 180 100" fill="none">
              <path d="M164 50 H30 M56 26 L24 50 L56 74" stroke={CORAL} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <BikoMascot pose="point-left" width={235} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Kiri = Jalan ke <Highlight color="#FEE2E2">Kiri</Highlight>
          </div>
        </div>

        {/* Kartu 2: Kanan (Hijau #10B981) */}
        <div
          style={{
            borderRadius: 28,
            background: TEAL_SOFT,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 10px 0 ${TEAL}`,
            padding: '32px 34px',
            ...centerCol,
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          <div style={{ ...row, gap: 16 }}>
            <ArrowCommandBlock dir="right" size={92} />
            <div
              style={{
                ...row,
                gap: 10,
                padding: '10px 24px',
                borderRadius: 99,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="arrow-right" size={28} />
              <span>KANAN</span>
            </div>
          </div>

          {/* Biko Facing Right (point-right) + Big Right Trail */}
          <div style={{ ...row, alignItems: 'center', gap: 14 }}>
            <BikoMascot pose="point-right" width={235} />
            <svg width={180} height={100} viewBox="0 0 180 100" fill="none">
              <path d="M16 50 H150 M124 26 L156 50 L124 74" stroke={TEAL} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Kanan = Jalan ke <Highlight color="#D1FAE5">Kanan</Highlight>
          </div>
        </div>
      </div>
    </MacWindowCard>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 06 — Permainan Cepat: Ayo Tebak Arahnya! (Interactive Grid Scenario)
// ============================================================================
const Slide06TebakArah: Page = () => {
  const [choice, setChoice] = useState<'left' | 'right' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" top={124}>
        Biko Harus <Highlight>Jalan ke Mana?</Highlight>
      </SlideTitle>

      {/* Top 3-Box Horizontal Scenario Map */}
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
        {(
          [
            { icons: choice === 'right' ? [] : ['biko'], label: choice === 'right' ? 'Start' : 'Biko', bg: choice === 'right' ? '#F8FAFC' : SKY_SOFT },
            { icons: choice === 'right' ? ['arrow-right'] : [], label: choice === 'right' ? undefined : 'Kotak Kosong', bg: choice === 'right' ? TEAL_SOFT : '#F8FAFC' },
            { icons: choice === 'right' ? ['biko', 'star'] : ['star'], label: choice === 'right' ? undefined : 'Bintang', bg: SUNNY_SOFT },
          ] as { icons: JuniorIconName[]; label?: string; bg: string }[]
        ).map((cell, i) => (
          <Fragment key={i}>
            <div
              style={{
                width: 280,
                height: 82,
                borderRadius: 20,
                background: cell.bg,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                justifyContent: 'center',
                gap: 8,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              {cell.icons.map((ic, j) => (
                <JuniorIcon key={j} name={ic} size={32} />
              ))}
              {cell.label && <span>{cell.label}</span>}
            </div>
            {i < 2 && <JuniorIcon name="arrow-right" size={28} />}
          </Fragment>
        ))}
      </div>

      {/* Two Big Choice Cards */}
      <div style={{ ...abs(180, 365, 1560, 350), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        {/* Kartu A: Ke Kiri (Coral) */}
        <button
          type="button"
          className="cpj5-card-btn"
          onClick={() => setChoice('left')}
          style={{
            borderRadius: 32,
            background: choice === 'left' ? CORAL_SOFT : WHITE,
            border: `4px solid ${choice === 'left' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${choice === 'left' ? CORAL : SKY}`,
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

          <ArrowCommandBlock dir="left" size={126} />

          <div style={{ ...row, gap: 12, fontFamily: 'var(--osd-font-display)', fontSize: 40, fontWeight: 700, color: CHARCOAL }}>
            <JuniorIcon name="arrow-left" size={36} />
            <span>Ke Kiri</span>
          </div>
        </button>

        {/* Kartu B: Ke Kanan (Hijau) */}
        <button
          type="button"
          className="cpj5-card-btn"
          onClick={() => setChoice('right')}
          style={{
            borderRadius: 32,
            background: choice === 'right' ? TEAL_SOFT : WHITE,
            border: `4px solid ${choice === 'right' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${choice === 'right' ? TEAL : SUNNY}`,
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

          <ArrowCommandBlock dir="right" size={126} />

          <div style={{ ...row, gap: 12, fontFamily: 'var(--osd-font-display)', fontSize: 40, fontWeight: 700, color: CHARCOAL }}>
            <JuniorIcon name="arrow-right" size={36} />
            <span>Ke Kanan</span>
          </div>
        </button>
      </div>

      {/* Bottom Center: Biko Holding ? Sign + Prompt / Feedback Pill */}
      <div style={{ ...abs(240, 725, 1440, 275), ...row, justifyContent: 'center', gap: 36 }}>
        <BikoMascot pose="question" width={225} />

        <div
          style={{
            ...row,
            justifyContent: 'center',
            gap: 12,
            padding: '24px 38px',
            borderRadius: 28,
            background: choice === 'right' ? TEAL_SOFT : choice === 'left' ? CORAL_SOFT : STABILO,
            border: `3.5px solid ${choice === 'right' ? TEAL : choice === 'left' ? CORAL : CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 34,
            fontWeight: 700,
            color: CHARCOAL,
            textAlign: 'center',
            minWidth: 580,
          }}
        >
          {choice === 'right' && (
            <>
              <JuniorIcon name="check" size={32} />
              <span>BENAR SEKALI! Jalan ke Kanan menuju Bintang!</span>
              <JuniorIcon name="star" size={32} />
            </>
          )}
          {choice === 'left' && (
            <>
              <JuniorIcon name="thinking" size={32} />
              <span>Hampir! Lihat Bintangnya ada di sebelah mana ya?</span>
            </>
          )}
          {choice === null && (
            <>
              <JuniorIcon name="point-right" size={32} />
              <span>Tunjuk panah yang benar di layarmu ya!</span>
            </>
          )}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Peta Kotak 2D (Grid Petualangan 3x3)
// ============================================================================
const Slide07PetaKotak: Page = () => {
  const [step, setStep] = useState<0 | 1 | 2>(2);

  // Path: Start (row 2, col 0) -> Right (row 2, col 1) -> Up (row 1, col 1)
  const bikoIndex = step === 0 ? 6 : step === 1 ? 7 : 4;

  return (
    <JuniorFrame badge="PETA PETUALANGAN" accentDot={SKY}>
      <SlideTitle>
        Jalan di <Highlight>Peta Kotak</Highlight>
      </SlideTitle>

      {/* Left Column: 3x3 Adventure Grid inside MacWindowCard */}
      <MacWindowCard left={X0} top={245} width={960} height={685} headerLabel="peta-kotak-3x3.app" padding={30}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: 'linear-gradient(180deg, #EFF6FF 0%, #FFFBEB 100%)',
            border: `3px solid ${CHARCOAL}`,
            padding: 26,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* 3x3 Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 148px)', gap: 16 }}>
            {Array.from({ length: 9 }).map((_, idx) => {
              const isBikoHere = idx === bikoIndex;
              const isStar = idx === 4;
              const isStep1 = idx === 6 || (step >= 1 && idx === 7);
              return (
                <div
                  key={idx}
                  style={{
                    width: 148,
                    height: 132,
                    borderRadius: 22,
                    background: isStar ? SUNNY_SOFT : isStep1 ? TEAL_SOFT : WHITE,
                    border: `3.5px solid ${isBikoHere ? TEAL : CHARCOAL}`,
                    boxShadow: isBikoHere ? `0 0 0 5px ${STABILO}` : '0 4px 0 #CBD5E1',
                    ...centerCol,
                    position: 'relative',
                    fontSize: 46,
                  }}
                >
                  {isBikoHere ? (
                    isStar ? (
                      <div style={{ ...row, gap: 4 }}>
                        <JuniorIcon name="biko" size={44} />
                        <JuniorIcon name="star" size={38} />
                      </div>
                    ) : (
                      <JuniorIcon name="biko" size={50} />
                    )
                  ) : isStar ? (
                    <JuniorIcon name="star" size={48} />
                  ) : idx === 6 ? (
                    <JuniorIcon name="footprints" size={34} style={{ opacity: 0.7 }} />
                  ) : idx === 7 && step >= 1 ? (
                    <JuniorIcon name="footprints" size={34} style={{ opacity: 0.8 }} />
                  ) : null}

                  {idx === 7 && step >= 1 && !isBikoHere && (
                    <span style={{ position: 'absolute', bottom: 6, right: 8 }}>
                      <JuniorIcon name="arrow-up" size={22} />
                    </span>
                  )}
                  {idx === 6 && step >= 1 && (
                    <span style={{ position: 'absolute', bottom: 6, right: 8 }}>
                      <JuniorIcon name="arrow-right" size={22} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Step Replay Controls */}
          <div style={{ ...row, gap: 16 }}>
            {(
              [
                { s: 0 as const, label: 'Mulai', icons: ['biko'] },
                { s: 1 as const, label: '1. Kanan', icons: ['arrow-right'] },
                { s: 2 as const, label: '2. Atas', icons: ['arrow-up', 'star'] },
              ] as { s: 0 | 1 | 2; label: string; icons: JuniorIconName[] }[]
            ).map((btn) => (
              <button
                key={btn.s}
                type="button"
                className="cpj5-card-btn"
                onClick={() => setStep(btn.s)}
                style={{
                  ...row,
                  gap: 8,
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
                <span>{btn.label}</span>
                {btn.icons.map((ic, idx) => (
                  <JuniorIcon key={idx} name={ic} size={22} />
                ))}
              </button>
            ))}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: Concise Cards + Pointing Biko */}
      <div style={{ ...abs(1105, 255, 715, 675), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div
          style={{
            ...row,
            gap: 20,
            padding: '24px 28px',
            borderRadius: 24,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${SKY}`,
          }}
        >
          <JuniorIcon name="square-blue" size={48} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.25 }}>
            <Highlight color="#DBEAFE">1 Panah</Highlight> = Jalan <Highlight color={STABILO}>1 Kotak</Highlight>
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
          <JuniorIcon name="footprints" size={48} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.25 }}>
            Hitung kotaknya <Highlight color="#D1FAE5">Pelan-Pelan!</Highlight>
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
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span>1 Kanan</span>
              <JuniorIcon name="arrow-right" size={24} />
              <span>lalu 1 Atas</span>
              <JuniorIcon name="arrow-up" size={24} />
              <span>!</span>
            </span>
          </div>
          <BikoMascot pose="point-left" width={310} />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Jurus Jitu Komando Arah (2 Kartu Langkah Besar + Biko Thumbs Up)
// ============================================================================
const Slide08JurusKomando: Page = () => (
  <JuniorFrame badge="TIPS KOMANDAN" accentDot={TEAL}>
    <SlideTitle>
      Rahasia Biar <Highlight>Tidak Nyasar!</Highlight>
    </SlideTitle>

    <MacWindowCard left={X0} top={250} width={1320} height={675} headerLabel="tips-komandan.app" padding={40}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, height: '100%' }}>
        {/* Kartu 1: Hitung Kotak dari tempat Biko berdiri */}
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

          {/* Finger counting boxes */}
          <div style={{ ...row, gap: 14, alignItems: 'center' }}>
            {(
              [
                { icon: 'biko' as JuniorIconName, bg: WHITE },
                { n: '1', bg: SUNNY_SOFT },
                { n: '2', bg: TEAL_SOFT },
              ]
            ).map((b, i) => (
              <div
                key={i}
                style={{
                  width: 86,
                  height: 86,
                  borderRadius: 20,
                  background: b.bg,
                  border: `3.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 34,
                  fontWeight: 700,
                  ...centerCol,
                }}
              >
                {b.icon ? <JuniorIcon name={b.icon} size={46} /> : b.n}
              </div>
            ))}
            <JuniorIcon name="tap" size={44} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 35, fontWeight: 700, lineHeight: 1.26 }}>
            <Highlight color="#DBEAFE">Hitung Kotak</Highlight> dari tempat Biko berdiri
          </div>
        </div>

        {/* Kartu 2: Susun Panah satu per satu! */}
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

          {/* Two Connected Puzzle Arrow Blocks */}
          <div style={{ ...row, gap: 14, alignItems: 'center' }}>
            <ArrowCommandBlock dir="right" size={96} />
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700 }}>+</span>
            <ArrowCommandBlock dir="up" size={96} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 35, fontWeight: 700, lineHeight: 1.26 }}>
            <Highlight color="#D1FAE5">Susun Panah</Highlight> satu per satu!
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
        <span>Pasti Sampai!</span>
        <JuniorIcon name="thumbs-up" size={26} />
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Bantu Biko Ambil Bintang! (3 Blok + Interactive Grid Game)
// ============================================================================
const MISSION_BLOCKS: { num: number; color: string; soft: string; title: string; sub: string; icon: JuniorIconName }[] = [
  { num: 1, color: SKY, soft: SKY_SOFT, title: 'Lihat', sub: 'posisi bintang di peta', icon: 'eyes' },
  { num: 2, color: SUNNY, soft: SUNNY_SOFT, title: 'Geser', sub: 'blok panah arah', icon: 'puzzle' },
  { num: 3, color: TEAL, soft: TEAL_SOFT, title: 'Jalan!', sub: 'Biko dapat bintang!', icon: 'star' },
];

// 3x3 Grid: Start at (row=2, col=0) -> idx 6; Target Star at (row=1, col=2) -> idx 5
// Valid 3-step solution: right, right, up (or right, up, right)
const Slide09MisiAmbilBintang: Page = () => {
  const [commands, setCommands] = useState<(Dir | null)[]>([null, null, null]);
  const [bikoPos, setBikoPos] = useState<{ r: number; c: number }>({ r: 2, c: 0 });
  const [status, setStatus] = useState<'idle' | 'won' | 'oops'>('idle');

  const addCommand = (dir: Dir) => {
    const emptyIdx = commands.findIndex((c) => c === null);
    if (emptyIdx === -1) return;
    const next = [...commands];
    next[emptyIdx] = dir;
    setCommands(next);
    setStatus('idle');
    setBikoPos({ r: 2, c: 0 });
  };

  const handleDropSlot = (e: DragEvent<HTMLButtonElement>, slotIdx: number) => {
    e.preventDefault();
    const dir = e.dataTransfer.getData('text/plain') as Dir;
    if (!DIR_META[dir]) return;
    const next = [...commands];
    next[slotIdx] = dir;
    setCommands(next);
    setStatus('idle');
    setBikoPos({ r: 2, c: 0 });
  };

  const clearSlot = (slotIdx: number) => {
    const next = [...commands];
    next[slotIdx] = null;
    setCommands(next);
    setStatus('idle');
    setBikoPos({ r: 2, c: 0 });
  };

  const runCommands = () => {
    let r = 2;
    let c = 0;
    for (const cmd of commands) {
      if (!cmd) continue;
      if (cmd === 'up') r = Math.max(0, r - 1);
      if (cmd === 'down') r = Math.min(2, r + 1);
      if (cmd === 'left') c = Math.max(0, c - 1);
      if (cmd === 'right') c = Math.min(2, c + 1);
    }
    setBikoPos({ r, c });
    if (r === 1 && c === 2) {
      setStatus('won');
    } else {
      setStatus('oops');
    }
  };

  const resetGame = () => {
    setCommands([null, null, null]);
    setBikoPos({ r: 2, c: 0 });
    setStatus('idle');
  };

  const bikoIdx = bikoPos.r * 3 + bikoPos.c;

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={SUNNY}>
      <SlideTitle>
        Misi <Highlight>Ambil Bintang Emas!</Highlight>
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
                <div style={{ ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1.15 }}>
                  <JuniorIcon name={blk.icon} size={32} />
                  <span>{blk.title}</span>
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

      {/* Interactive 2D Grid Adventure Board */}
      <MacWindowCard left={X0} top={420} width={1320} height={552} headerLabel="petualangan-bintang-2d.app" padding={22}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: 'linear-gradient(180deg, #EFF6FF 0%, #FFFBEB 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            padding: '18px 24px',
            display: 'grid',
            gridTemplateColumns: '410px 1fr',
            gap: 28,
            alignItems: 'center',
          }}
        >
          {/* Left: 3x3 Adventure Map */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 120px)', gap: 12, justifyContent: 'center' }}>
            {Array.from({ length: 9 }).map((_, idx) => {
              const isBiko = idx === bikoIdx;
              const isStar = idx === 5;
              const isObstacle = idx === 3;
              return (
                <div
                  key={idx}
                  style={{
                    width: 120,
                    height: 112,
                    borderRadius: 18,
                    background: isStar ? SUNNY_SOFT : isObstacle ? '#E2E8F0' : WHITE,
                    border: `3px solid ${isBiko ? TEAL : CHARCOAL}`,
                    boxShadow: isBiko ? `0 0 0 4px ${STABILO}` : '0 4px 0 #CBD5E1',
                    ...centerCol,
                  }}
                >
                  {isBiko && isStar ? (
                    <div style={{ ...row, gap: 4 }}>
                      <JuniorIcon name="biko" size={40} />
                      <JuniorIcon name="star" size={34} />
                    </div>
                  ) : isBiko ? (
                    <JuniorIcon name="biko" size={48} />
                  ) : isStar ? (
                    <JuniorIcon name="star" size={44} />
                  ) : isObstacle ? (
                    <JuniorIcon name="rock" size={44} />
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Right: Command Builder + Run */}
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '6px 0' }}>
            {/* Arrow Palette */}
            <div>
              <div style={{ fontSize: 19, fontWeight: 800, color: MUTED, marginBottom: 10 }}>
                1. KLIK ATAU GESER BLOK PANAH KE SLOT:
              </div>
              <div style={{ ...row, gap: 14 }}>
                {(['up', 'down', 'left', 'right'] as Dir[]).map((d) => (
                  <ArrowCommandBlock
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

            {/* 3 Command Slots */}
            <div>
              <div style={{ fontSize: 19, fontWeight: 800, color: MUTED, marginBottom: 10 }}>
                2. URUTAN PERINTAH (KLIK SLOT UNTUK HAPUS):
              </div>
              <div style={{ ...row, gap: 14 }}>
                {commands.map((cmd, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropSlot(e, idx)}
                    onClick={() => clearSlot(idx)}
                    style={{
                      width: 110,
                      height: 92,
                      borderRadius: 20,
                      background: cmd ? DIR_META[cmd].color : WHITE,
                      border: cmd ? `3.5px solid ${CHARCOAL}` : `3.5px dashed #94A3B8`,
                      ...centerCol,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: cmd ? 38 : 26,
                      fontWeight: 700,
                      color: cmd ? (cmd === 'down' ? CHARCOAL : WHITE) : MUTED,
                      cursor: 'pointer',
                    }}
                  >
                    {cmd ? <JuniorIcon name={DIR_META[cmd].icon} size={38} /> : idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Run & Reset Row + Feedback */}
            <div style={{ ...row, gap: 14, justifyContent: 'space-between' }}>
              <div style={{ ...row, gap: 12 }}>
                <button
                  type="button"
                  className="cpj5-card-btn"
                  onClick={runCommands}
                  style={{
                    ...row,
                    gap: 8,
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
                  <JuniorIcon name="play" size={24} />
                  <span>Jalan!</span>
                </button>
                <button
                  type="button"
                  className="cpj5-card-btn"
                  onClick={resetGame}
                  style={{
                    ...row,
                    gap: 8,
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
                  <JuniorIcon name="reset" size={22} />
                  <span>Ulang</span>
                </button>
              </div>

              <div
                style={{
                  ...row,
                  gap: 8,
                  padding: '10px 18px',
                  borderRadius: 99,
                  background: status === 'won' ? TEAL_SOFT : status === 'oops' ? CORAL_SOFT : STABILO,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontSize: 19,
                  fontWeight: 800,
                }}
              >
                {status === 'won' && (
                  <>
                    <JuniorIcon name="party" size={22} />
                    <span>Yeay! Biko dapat Bintang!</span>
                  </>
                )}
                {status === 'oops' && (
                  <>
                    <JuniorIcon name="thinking" size={22} />
                    <span>Belum pas! Coba</span>
                    <JuniorIcon name="arrow-right" size={20} />
                    <JuniorIcon name="arrow-right" size={20} />
                    <JuniorIcon name="arrow-up" size={20} />
                  </>
                )}
                {status === 'idle' && (
                  <>
                    <JuniorIcon name="bulb" size={22} />
                    <span>Petunjuk: 2x Kanan, 1x Atas!</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko on Right */}
      <div style={{ ...abs(1455, 450, 365, 500), ...centerCol }}>
        <BikoMascot pose={status === 'won' ? 'jump' : 'wave'} width={310} />
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
          {status === 'won' ? (
            <>
              <span>Dapat Bintang!</span>
              <JuniorIcon name="star" size={24} />
            </>
          ) : (
            <>
              <span>Ayo Beri Komando!</span>
              <JuniorIcon name="compass" size={24} />
            </>
          )}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 5
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
            animation: live ? `cpj5-confetti ${2.4 + (idx % 3) * 0.4}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={130} size={62}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
          <span>
            Hebat! Kamu <Highlight color={STABILO}>Komandan Arah!</Highlight>
          </span>
          <JuniorIcon name="party" size={58} />
        </span>
      </SlideTitle>

      {/* Center Celebration Medal Card */}
      <MacWindowCard left={170} top={250} width={1160} height={680} headerLabel="lencana-juara-5.award" padding={42}>
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-between', textAlign: 'center' }}>
          {/* Gold Compass Medal SVG with 4 Arrows & Star */}
          <svg width={270} height={260} viewBox="0 0 260 250" fill="none">
            {/* Ribbons */}
            <path d="M90 156 L66 238 L104 218 L122 240 L122 156 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            <path d="M170 156 L194 238 L156 218 L138 240 L138 156 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            {/* Gold Medal */}
            <circle cx="130" cy="98" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
            <circle cx="130" cy="98" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={3.5} />
            {/* 4-Way Compass Arrows */}
            <path d="M130 42 L140 72 L130 66 L120 72 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
            <path d="M130 154 L140 124 L130 130 L120 124 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
            <path d="M74 98 L104 88 L98 98 L104 108 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
            <path d="M186 98 L156 88 L162 98 L156 108 Z" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
            {/* Center Star */}
            <path
              d="M130 78 L136 90 L149 92 L139 101 L142 114 L130 107 L118 114 L121 101 L111 92 L124 90 Z"
              fill={WHITE}
              stroke={CHARCOAL}
              strokeWidth={3}
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
            <span>Lencana Komandan Panah Ajaib</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 32,
              fontWeight: 700,
              lineHeight: 1.38,
              maxWidth: 920,
              color: CHARCOAL,
            }}
          >
            Kamu sudah jago memberi perintah <Highlight>Atas, Bawah, Kiri, &amp; Kanan!</Highlight>
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
  `Halo Code Explorer cilik! Di Pertemuan 5 ini, Biko memakai topi petualang dan kompas emas!
Kita akan belajar Komando Panah Ajaib untuk mengarahkan Biko ke Atas, Bawah, Kiri, dan Kanan.`,

  `Ada dua misi kita hari ini:
1. Mengenal 4 arah panah ajaib: Atas, Bawah, Kiri, dan Kanan.
2. Membantu Biko melangkah di peta kotak sampai ke bintang emas!`,

  `Ini 4 Panah Ajaib kita!
Klik masing-masing tombol panah di layar: Atas (naik), Bawah (turun), Kiri, dan Kanan.`,

  `Jurus Arah #1: Atas dan Bawah!
Panah ATAS artinya melangkah naik (seperti naik tangga ke awan). Panah BAWAH artinya melangkah turun (seperti meluncur ke peti harta karun).`,

  `Jurus Arah #2: Kiri dan Kanan!
Arah kiri dan kanan mengikuti pandangan anak di depan layar ya: KIRI jalan ke kiri layar, KANAN jalan ke kanan layar!`,

  `Permainan Cepat! Lihat peta di atas: Biko di kiri, ada 1 kotak kosong, lalu Bintang di kanan.
Biko harus jalan ke mana — Pilihan A (Ke Kiri) atau Pilihan B (Ke Kanan)?`,

  `Sekarang kita kenalan dengan Peta Kotak!
Ingat aturan emasnya: 1 Panah = Jalan 1 Kotak. Hitung kotaknya pelan-pelan ya: 1 Kanan lalu 1 Atas!`,

  `Tips Komandan supaya tidak nyasar:
1. Hitung jumlah kotak dari tempat Biko berdiri.
2. Susun blok panahnya satu per satu seperti puzzle!`,

  `Waktunya praktik Game Ambil Bintang Emas!
Klik atau geser blok panah ke slot 1, 2, 3 (petunjuk: Kanan, Kanan, Atas), lalu klik tombol Jalan!`,

  `Selamat untuk semua Komandan Arah cilik!
Kalian resmi meraih Lencana Komandan Panah Ajaib! Sampai jumpa di petualangan berikutnya bersama Biko!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 5 — Komando Panah Ajaib',
  createdAt: '2026-11-13T10:00:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03CrossPad,
  Slide04AtasBawah,
  Slide05KiriKanan,
  Slide06TebakArah,
  Slide07PetaKotak,
  Slide08JurusKomando,
  Slide09MisiAmbilBintang,
  Slide10Lencana,
] satisfies Page[];

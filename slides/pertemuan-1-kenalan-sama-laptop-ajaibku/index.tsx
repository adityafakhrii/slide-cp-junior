import { Fragment, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import bikoWave from '../../assets/biko/biko-wave.png';
import bikoLaptop from '../../assets/biko/biko-laptop.png';
import bikoPointLeft from '../../assets/biko/biko-point-left.png';
import bikoJump from '../../assets/biko/biko-jump.png';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-1-kenalan-sama-laptop-ajaibku';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj-bob {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(-1.2deg); }
}
@keyframes cpj-twinkle {
  0%, 100% { opacity: 0.9; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj-cursor-glide {
  0%, 100% { transform: translate(0px, 0px); }
  50% { transform: translate(62px, -22px); }
}
@keyframes cpj-rocket {
  0%, 100% { transform: translate(0px, 0px) rotate(-4deg); }
  50% { transform: translate(8px, -10px) rotate(4deg); }
}
.cpj-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj-card-btn:hover {
  transform: translateY(-4px);
}
.cpj-card-btn:active {
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
const TEAL_DARK = '#0D9488';
const TEAL_SOFT = '#ECFDF5';
const CORAL = '#F45B49';
const CORAL_SOFT = '#FEF2F2';
const SUNNY = '#FBBF24';
const STABILO = '#FEF08A';
const LAVENDER = '#A78BFA';
const LAVENDER_SOFT = '#F3EEFF';
const SKY = '#60A5FA';
const SKY_SOFT = '#EFF6FF';
const OTTER_GOLD = '#FBBF24';
const OTTER_FUR = '#F59E0B';
const OTTER_BELLY = '#FEF3C7';

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

      {/* Sparkle accents */}
      <svg
        aria-hidden
        width={42}
        height={42}
        viewBox="0 0 40 40"
        style={{
          ...abs(1750, 74),
          pointerEvents: 'none',
          animation: live ? 'cpj-twinkle 2.8s ease-in-out infinite' : undefined,
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

      {/* Slide Content */}
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
        <span>Pertemuan 1 • Kenalan Sama Laptop Ajaibku</span>
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
  top = 138,
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
    {/* Window Header */}
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
            fontSize: 18,
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
    {/* Body */}
    <div style={{ position: 'relative', flex: 1, padding, boxSizing: 'border-box' }}>
      {children}
    </div>
  </div>
);

// ============================================================================
// BIKO — Official Otter Mascot Component (Flat Vector 2D Cartoon)
// ============================================================================
type BikoPose =
  | 'cover-laptop'
  | 'point-left'
  | 'point-right'
  | 'press-key'
  | 'question'
  | 'thumbs-up'
  | 'jump';

const BIKO_POSE_ASSETS: Record<BikoPose, string> = {
  'cover-laptop': bikoLaptop,
  'point-left': bikoPointLeft,
  'point-right': bikoPointLeft,
  'press-key': bikoPointLeft,
  question: bikoWave,
  'thumbs-up': bikoWave,
  jump: bikoJump,
};

const BikoMascot = ({
  pose = 'point-left',
  width = 360,
  style,
}: {
  pose?: BikoPose;
  width?: number;
  style?: CSSProperties;
}) => {
  const live = useIsActivePage();
  const isJump = pose === 'jump';
  const imgSrc = BIKO_POSE_ASSETS[pose] ?? bikoWave;
  const imgHeight = Math.round(width * 1.12);

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
              ? 'cpj-float 1.8s ease-in-out infinite'
              : 'cpj-bob 3.2s ease-in-out infinite'
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

        {/* Pose-specific interactive vector prop accents for slides using Biko base artwork */}
        {pose === 'press-key' && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: -6,
              top: '39%',
              width: 52,
              height: 52,
              borderRadius: 14,
              background: SUNNY,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 5px 0 ${CHARCOAL}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
              color: CHARCOAL,
              transform: 'rotate(-8deg)',
              pointerEvents: 'none',
            }}
          >
            A
          </div>
        )}

        {pose === 'question' && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: 2,
              top: '8%',
              width: 78,
              height: 86,
              borderRadius: 20,
              background: SUNNY,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--osd-font-display)',
              fontSize: 54,
              fontWeight: 700,
              color: CHARCOAL,
              transform: 'rotate(10deg)',
              pointerEvents: 'none',
            }}
          >
            ?
          </div>
        )}

        {pose === 'thumbs-up' && (
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
            👍
          </div>
        )}
      </div>

      {/* Soft Ground Contact Shadow */}
      <div
        aria-hidden="true"
        style={{
          width: isJump ? width * 0.36 : width * 0.52,
          height: 16,
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
// Reusable Clean Check / Cross SVG Icons
// ============================================================================
const IconCheck = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="21" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    <path
      d="M14 25 L21 32 L34 17"
      stroke={WHITE}
      strokeWidth={4.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCross = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="21" fill={CORAL} stroke={CHARCOAL} strokeWidth={3} />
    <path
      d="M16 16 L32 32 M32 16 L16 32"
      stroke={WHITE}
      strokeWidth={4.8}
      strokeLinecap="round"
    />
  </svg>
);

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Hero Split Layout)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 1" accentDot={SUNNY}>
      {/* Left Column: Hero Title & Subtitle */}
      <h1
        style={{
          ...abs(X0, 224, 920),
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 92,
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          color: CHARCOAL,
        }}
      >
        Kenalan Sama
        <br />
        <Highlight color={STABILO}>Laptop Ajaibku!</Highlight>
      </h1>

      <div
        style={{
          ...abs(X0, 488, 780),
          fontSize: 34,
          fontWeight: 700,
          lineHeight: 1.4,
          color: MUTED,
        }}
      >
        Belajar Bagian Laptop &amp; Cara Merawatnya
      </div>

      {/* Playful Level & Visual Tag Chips */}
      <div style={{ ...abs(X0, 620), ...row, gap: 18 }}>
        <div
          style={{
            ...row,
            gap: 12,
            padding: '16px 28px',
            borderRadius: 20,
            background: TEAL_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            boxShadow: `0 5px 0 ${CHARCOAL}`,
            fontSize: 24,
            fontWeight: 800,
            color: CHARCOAL,
          }}
        >
          <span style={{ fontSize: 28 }}>💻</span>
          <span>Level 1: Code Explorer</span>
        </div>

        <div
          style={{
            ...row,
            gap: 12,
            padding: '16px 28px',
            borderRadius: 20,
            background: SKY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            boxShadow: `0 5px 0 ${CHARCOAL}`,
            fontSize: 24,
            fontWeight: 800,
            color: CHARCOAL,
          }}
        >
          <span style={{ fontSize: 28 }}>🌟</span>
          <span>Usia 5–7 Tahun</span>
        </div>
      </div>

      {/* Right Column: Large Cheerful Biko Holding Coding Laptop */}
      <div
        style={{
          ...abs(1080, 175, 720, 760),
          ...centerCol,
          background: WHITE,
          borderRadius: 40,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          overflow: 'hidden',
        }}
      >
        {/* Warm Radial Backdrop Inside Hero Card */}
        <div
          style={{
            position: 'absolute',
            width: 480,
            height: 480,
            borderRadius: 999,
            background: STABILO,
            opacity: 0.45,
          }}
        />
        {/* Decorative floating coding chips */}
        <div
          style={{
            ...abs(56, 54),
            padding: '10px 18px',
            borderRadius: 14,
            background: SKY,
            border: `2.5px solid ${CHARCOAL}`,
            boxShadow: `0 4px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            color: WHITE,
            animation: live ? 'cpj-float 2.6s ease-in-out infinite' : undefined,
          }}
        >
          ▶ MULAI!
        </div>
        <div
          style={{
            ...abs(530, 82),
            padding: '10px 18px',
            borderRadius: 14,
            background: CORAL,
            border: `2.5px solid ${CHARCOAL}`,
            boxShadow: `0 4px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            color: WHITE,
            animation: live ? 'cpj-float 3.1s ease-in-out 0.4s infinite' : undefined,
          }}
        >
          ✦ HAI BIKO!
        </div>

        <BikoMascot pose="cover-laptop" width={480} style={{ position: 'relative', zIndex: 2, marginTop: 40 }} />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: 8,
            padding: '10px 26px',
            borderRadius: 999,
            background: STABILO,
            border: `2.5px solid ${CHARCOAL}`,
            boxShadow: `0 4px 0 ${CHARCOAL}`,
            color: CHARCOAL,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          Teman Belajar: Biko si Berang-berang 🦦
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi Besar dalam macOS Window)
// ============================================================================
const Slide02Misi: Page = () => (
  <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
    <SlideTitle top={140}>
      Apa <Highlight>Misi Kita</Highlight> Hari Ini?
    </SlideTitle>

    <MacWindowCard
      left={X0}
      top={260}
      width={1270}
      height={680}
      titleBarColor={SAND_GRID}
      headerLabel="PETUALANGAN LAPTOP"
      padding={44}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 38,
          height: '100%',
        }}
      >
        {/* Kartu 1: Blue Accent */}
        <div
          style={{
            background: SKY_SOFT,
            borderRadius: 26,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${SKY}`,
            padding: 36,
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
              border: `2px solid ${CHARCOAL}`,
              color: WHITE,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            MISI 1
          </div>

          {/* Icon: Laptop with Magnifying Glass */}
          <svg width={260} height={210} viewBox="0 0 260 210" fill="none">
            <rect x="34" y="34" width="164" height="114" rx="14" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
            <rect x="48" y="48" width="136" height="84" rx="8" fill="#DBEAFE" />
            <path d="M18 148 H214 L228 172 H4 Z" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            {/* Three mini colored dots on laptop screen */}
            <circle cx="84" cy="90" r="14" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.5} />
            <circle cx="116" cy="90" r="14" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
            <circle cx="148" cy="90" r="14" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.5} />
            {/* Magnifying Glass */}
            <circle cx="192" cy="116" r="38" fill="#FEF08A" fillOpacity={0.75} stroke={CHARCOAL} strokeWidth={4.5} />
            <path d="M218 144 L246 172" stroke={CORAL} strokeWidth={12} strokeLinecap="round" />
            <path d="M218 144 L246 172" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
          </svg>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 34,
              fontWeight: 700,
              lineHeight: 1.25,
              color: CHARCOAL,
            }}
          >
            Kenali <Highlight color="#DBEAFE">3 Bagian Utama</Highlight> Laptop
          </div>
        </div>

        {/* Kartu 2: Green Accent */}
        <div
          style={{
            background: TEAL_SOFT,
            borderRadius: 26,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${TEAL}`,
            padding: 36,
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
              border: `2px solid ${CHARCOAL}`,
              color: WHITE,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            MISI 2
          </div>

          {/* Icon: Shield with Heart & Gold Star */}
          <svg width={260} height={210} viewBox="0 0 260 210" fill="none">
            <path
              d="M130 22 L206 48 V106 C206 154, 168 184, 130 198 C92 184, 54 154, 54 106 V48 Z"
              fill={WHITE}
              stroke={CHARCOAL}
              strokeWidth={4.5}
              strokeLinejoin="round"
            />
            <path
              d="M130 40 L188 60 V104 C188 140, 158 164, 130 176 C102 164, 72 140, 72 104 V60 Z"
              fill="#D1FAE5"
            />
            {/* Heart */}
            <path
              d="M130 146 C130 146, 92 122, 92 96 C92 80, 106 72, 118 78 C124 81, 128 86, 130 92 C132 86, 136 81, 142 78 C154 72, 168 80, 168 96 C168 122, 130 146, 130 146 Z"
              fill={CORAL}
              stroke={CHARCOAL}
              strokeWidth={3.5}
              strokeLinejoin="round"
            />
            {/* Gold Star badge top right */}
            <path
              d="M204 20 L212 36 L230 39 L217 51 L220 69 L204 60 L188 69 L191 51 L178 39 L196 36 Z"
              fill={SUNNY}
              stroke={CHARCOAL}
              strokeWidth={3}
              strokeLinejoin="round"
            />
          </svg>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 34,
              fontWeight: 700,
              lineHeight: 1.25,
              color: CHARCOAL,
            }}
          >
            Hafal <Highlight color="#D1FAE5">Aturan Emas</Highlight> Merawat Laptop
          </div>
        </div>
      </div>
    </MacWindowCard>

    {/* Biko Mascot Pointing Left to Cards */}
    <div style={{ ...abs(1410, 420, 420, 520), ...centerCol }}>
      <div
        style={{
          marginBottom: 14,
          padding: '12px 24px',
          borderRadius: 20,
          background: WHITE,
          border: `2.5px solid ${CHARCOAL}`,
          boxShadow: `0 4px 0 ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 26,
          fontWeight: 700,
        }}
      >
        Ayo kita taklukkan! 🚀
      </div>
      <BikoMascot pose="point-left" width={360} />
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Bagian Utama 1: Layar (Monitor)
// ============================================================================
const Slide03Layar: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="BAGIAN LAPTOP #1" accentDot={SUNNY}>
      <SlideTitle top={140}>
        Ini Namanya <Highlight>Layar</Highlight>
      </SlideTitle>

      {/* Left Large Visual Laptop Spotlight */}
      <MacWindowCard
        left={X0}
        top={258}
        width={1030}
        height={690}
        titleBarColor="#FEF9C3"
        headerLabel="BAGIAN #1 • LAYAR MONITOR"
        padding={32}
      >
        <div style={{ ...centerCol, height: '100%' }}>
          <svg width={900} height={540} viewBox="0 0 900 540" fill="none">
            {/* Golden Glow Behind Screen */}
            <rect
              x="128"
              y="18"
              width="644"
              height="386"
              rx="34"
              fill={STABILO}
              stroke={SUNNY}
              strokeWidth={6}
              strokeDasharray="16 12"
            />
            {/* Laptop Lid Frame */}
            <rect x="150" y="38" width="600" height="346" rx="22" fill={CHARCOAL} />
            {/* Bright Screen Area */}
            <rect x="172" y="60" width="556" height="302" rx="12" fill="#E0F2FE" stroke={SUNNY} strokeWidth={5} />

            {/* Game World Inside Screen: Clouds, Planet & Flying Rocket */}
            <circle cx="628" cy="128" r="36" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={3} />
            <ellipse cx="628" cy="128" rx="58" ry="12" transform="rotate(-16 628 128)" stroke={SUNNY} strokeWidth={5} />
            <circle cx="268" cy="130" r="24" fill={WHITE} />
            <circle cx="294" cy="122" r="30" fill={WHITE} />
            <circle cx="324" cy="130" r="22" fill={WHITE} />
            <circle cx="480" cy="296" r="46" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />

            {/* Cute Flying Rocket Animated */}
            <g style={{ animation: live ? 'cpj-rocket 2.4s ease-in-out infinite' : undefined }}>
              <path
                d="M420 140 C460 116, 510 132, 524 166 C490 198, 444 206, 408 188 Z"
                fill={CORAL}
                stroke={CHARCOAL}
                strokeWidth={3.5}
              />
              <circle cx="468" cy="158" r="14" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
              <path d="M404 176 L372 192 L396 202 Z" fill={SUNNY} />
            </g>

            {/* Cute Game Character */}
            <rect x="242" y="254" width="66" height="66" rx="18" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
            <circle cx="264" cy="282" r="5" fill={CHARCOAL} />
            <circle cx="288" cy="282" r="5" fill={CHARCOAL} />
            <path d="M266 298 Q276 306 286 298" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />

            {/* Laptop Lower Keyboard Base (Faded slightly to keep spotlight on Screen) */}
            <path
              d="M110 384 H790 L842 464 H58 Z"
              fill="#E2E8F0"
              stroke={CHARCOAL}
              strokeWidth={4}
              strokeLinejoin="round"
            />
            <rect x="176" y="400" width="548" height="28" rx="6" fill="#CBD5E1" />
            <rect x="370" y="434" width="160" height="22" rx="6" fill="#CBD5E1" />

            {/* Arrow & Label "LAYAR" */}
            <rect x="34" y="156" width="150" height="58" rx="16" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
            <text x="109" y="195" textAnchor="middle" fontFamily='"Fredoka", sans-serif' fontSize="28" fontWeight="700" fill={CHARCOAL}>
              LAYAR
            </text>
            <path d="M186 185 H226" stroke={CHARCOAL} strokeWidth={5} strokeLinecap="round" />
            <polygon points="222,175 240,185 222,195" fill={CHARCOAL} />
          </svg>
        </div>
      </MacWindowCard>

      {/* Right Column: Short Icon Points + Biko Pointing */}
      <div style={{ ...abs(1170, 258, 650), display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div
          style={{
            ...row,
            gap: 22,
            padding: '24px 30px',
            borderRadius: 24,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${SUNNY}`,
          }}
        >
          <span style={{ fontSize: 52 }}>👀</span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700 }}>
            Seperti <Highlight>TV Ajaib</Highlight>
          </span>
        </div>

        <div
          style={{
            ...row,
            gap: 22,
            padding: '24px 30px',
            borderRadius: 24,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${TEAL}`,
          }}
        >
          <span style={{ fontSize: 52 }}>🎮</span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700 }}>
            Tempat gambar &amp; game muncul
          </span>
        </div>
      </div>

      <div style={{ ...abs(1330, 560, 420, 410), ...centerCol }}>
        <BikoMascot pose="point-left" width={360} />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Bagian Utama 2: Keyboard (Interactive Close-Up Keys)
// ============================================================================
const KEY_ROWS = [
  [
    { label: '1', bg: SKY_SOFT, activeBg: SKY },
    { label: '2', bg: SKY_SOFT, activeBg: SKY },
    { label: '3', bg: SKY_SOFT, activeBg: SKY },
    { label: '4', bg: SKY_SOFT, activeBg: SKY },
    { label: '5', bg: SKY_SOFT, activeBg: SKY },
  ],
  [
    { label: 'A', bg: '#FEF9C3', activeBg: SUNNY },
    { label: 'B', bg: '#FEF9C3', activeBg: SUNNY },
    { label: 'C', bg: '#FEF9C3', activeBg: SUNNY },
    { label: 'D', bg: '#FEF9C3', activeBg: SUNNY },
    { label: 'E', bg: '#FEF9C3', activeBg: SUNNY },
  ],
];

const Slide04Keyboard: Page = () => {
  const [pressedKey, setPressedKey] = useState<string>('A');

  return (
    <JuniorFrame badge="BAGIAN LAPTOP #2" accentDot={CORAL}>
      <SlideTitle top={140}>
        Ini Namanya <Highlight>Keyboard</Highlight>
      </SlideTitle>

      {/* Left Column: Brief Explanation + Biko Pressing Gently */}
      <div style={{ ...abs(X0, 260, 620), display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div
          style={{
            ...row,
            gap: 20,
            padding: '22px 26px',
            borderRadius: 24,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${SKY}`,
          }}
        >
          <span style={{ fontSize: 48 }}>🔤</span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, lineHeight: 1.25 }}>
            Punya tombol <Highlight color="#DBEAFE">Huruf &amp; Angka</Highlight>
          </span>
        </div>

        <div
          style={{
            ...row,
            gap: 20,
            padding: '22px 26px',
            borderRadius: 24,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${TEAL}`,
          }}
        >
          <span style={{ fontSize: 48 }}>✨</span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, lineHeight: 1.25 }}>
            Untuk mengetik &amp; memberi perintah
          </span>
        </div>

        {/* Pressed Feedback + Biko */}
        <div style={{ ...row, gap: 18, marginTop: 12 }}>
          <BikoMascot pose="press-key" width={270} />
          <div
            style={{
              padding: '20px 26px',
              borderRadius: 24,
              background: '#FEF9C3',
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              textAlign: 'center',
              flex: 1,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: MUTED }}>TOMBOL DIKLIK:</div>
            <div
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontSize: 64,
                fontWeight: 700,
                color: CORAL,
                marginTop: 6,
              }}
            >
              {pressedKey}
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, color: CHARCOAL }}>Tekan pelan ya! 🪶</div>
          </div>
        </div>
      </div>

      {/* Right Column: Big Interactive Colorful Keyboard Close-up */}
      <MacWindowCard
        left={760}
        top={260}
        width={1060}
        height={680}
        titleBarColor="#EFF6FF"
        headerLabel="KLIK TOMBOLNYA YUK!"
        padding={38}
      >
        <div
          style={{
            height: '100%',
            background: '#E2E8F0',
            borderRadius: 24,
            border: `3px solid ${CHARCOAL}`,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {KEY_ROWS.map((kRow, rIdx) => (
            <div key={rIdx} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
              {kRow.map((k) => {
                const isActive = pressedKey === k.label;
                return (
                  <button
                    key={k.label}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPressedKey(k.label);
                    }}
                    className="cpj-card-btn"
                    style={{
                      height: 124,
                      borderRadius: 20,
                      background: isActive ? k.activeBg : k.bg,
                      color: isActive ? WHITE : CHARCOAL,
                      border: `3px solid ${CHARCOAL}`,
                      boxShadow: isActive ? `0 2px 0 ${CHARCOAL}` : `0 8px 0 ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 52,
                      fontWeight: 700,
                      transform: isActive ? 'translateY(4px)' : undefined,
                    }}
                  >
                    {k.label}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Bottom Row: Long SPASI + Arrow Keys */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.6fr', gap: 22 }}>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                setPressedKey('SPASI');
              }}
              className="cpj-card-btn"
              style={{
                height: 122,
                borderRadius: 20,
                background: pressedKey === 'SPASI' ? TEAL : TEAL_SOFT,
                color: pressedKey === 'SPASI' ? WHITE : CHARCOAL,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: pressedKey === 'SPASI' ? `0 2px 0 ${CHARCOAL}` : `0 8px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 38,
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              ␣ SPASI
            </button>

            {/* Arrow Keys Cluster */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 56px)',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <div />
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.stopPropagation();
                  setPressedKey('▲');
                }}
                className="cpj-card-btn"
                style={{
                  height: 56,
                  borderRadius: 14,
                  background: pressedKey === '▲' ? CORAL : CORAL_SOFT,
                  color: pressedKey === '▲' ? WHITE : CHARCOAL,
                  border: `2.5px solid ${CHARCOAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  fontSize: 26,
                  fontWeight: 800,
                }}
              >
                ▲
              </button>
              <div />
              {['◀', '▼', '▶'].map((arrow) => (
                <button
                  key={arrow}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPressedKey(arrow);
                  }}
                  className="cpj-card-btn"
                  style={{
                    height: 56,
                    borderRadius: 14,
                    background: pressedKey === arrow ? CORAL : CORAL_SOFT,
                    color: pressedKey === arrow ? WHITE : CHARCOAL,
                    border: `2.5px solid ${CHARCOAL}`,
                    boxShadow: `0 4px 0 ${CHARCOAL}`,
                    fontSize: 26,
                    fontWeight: 800,
                  }}
                >
                  {arrow}
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
// SLIDE 05 — Bagian Utama 3: Trackpad & Mouse
// ============================================================================
const Slide05TrackpadMouse: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="BAGIAN LAPTOP #3" accentDot={LAVENDER}>
      <SlideTitle top={140}>
        <Highlight>Trackpad</Highlight> &amp; <Highlight color="#DBEAFE">Mouse</Highlight>
      </SlideTitle>

      {/* Main Spotlight Card */}
      <MacWindowCard
        left={X0}
        top={258}
        width={1720}
        height={690}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="PENGGERAK PANAH AJAIB"
        padding={40}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1.05fr',
            gap: 32,
            height: '100%',
            alignItems: 'center',
          }}
        >
          {/* 1. Trackpad Illustration Card */}
          <div
            style={{
              height: '100%',
              background: SKY_SOFT,
              borderRadius: 24,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${SKY}`,
              padding: 30,
              ...centerCol,
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <svg width={320} height={270} viewBox="0 0 320 270" fill="none">
              {/* Laptop Palm Rest */}
              <rect x="24" y="34" width="272" height="198" rx="20" fill="#E2E8F0" stroke={CHARCOAL} strokeWidth={4} />
              {/* Keyboard strip top */}
              <rect x="44" y="48" width="232" height="44" rx="8" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={2.5} />
              {/* Glowing Blue Trackpad Box */}
              <rect x="86" y="108" width="148" height="106" rx="16" fill={SKY} stroke={CHARCOAL} strokeWidth={4} />
              <rect x="98" y="120" width="124" height="82" rx="10" fill="#DBEAFE" />
              {/* Cute Finger Icon Touching Trackpad */}
              <circle cx="160" cy="158" r="18" fill={SUNNY} opacity={0.65} />
              <path
                d="M160 154 C166 154, 174 162, 174 176 V228 H144 V174 C144 162, 152 154, 160 154 Z"
                fill="#FDE68A"
                stroke={CHARCOAL}
                strokeWidth={3.5}
              />
            </svg>
            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
                👆 Trackpad
              </div>
              <div style={{ fontSize: 25, fontWeight: 700, color: MUTED, marginTop: 6 }}>
                Kotak sentuh di laptop
              </div>
            </div>
          </div>

          {/* 2. Cute Mouse Illustration Card */}
          <div
            style={{
              height: '100%',
              background: CORAL_SOFT,
              borderRadius: 24,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CORAL}`,
              padding: 30,
              ...centerCol,
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <svg width={300} height={270} viewBox="0 0 300 270" fill="none">
              {/* Desk Pad */}
              <ellipse cx="150" cy="212" rx="116" ry="26" fill="#FEE2E2" stroke={CHARCOAL} strokeWidth={3} />
              {/* Cord Wire Curve */}
              <path d="M150 58 C150 22, 224 14, 246 44" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
              {/* Cute Rounded Mouse Body */}
              <rect x="94" y="56" width="112" height="156" rx="56" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
              <path d="M96 124 H204" stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M150 58 V124" stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Left Click Highlight */}
              <path
                d="M148 59 C116 61, 97 86, 97 122 H148 Z"
                fill={CORAL}
                opacity={0.85}
              />
              {/* Scroll Wheel */}
              <rect x="142" y="80" width="16" height="30" rx="8" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
              {/* Cute Smiley on Mouse Belly */}
              <circle cx="132" cy="158" r="4" fill={CHARCOAL} />
              <circle cx="168" cy="158" r="4" fill={CHARCOAL} />
              <path d="M140 172 Q150 182 160 172" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
            </svg>
            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
                🖱️ Mouse
              </div>
              <div style={{ fontSize: 25, fontWeight: 700, color: MUTED, marginTop: 6 }}>
                Teman genggam di meja
              </div>
            </div>
          </div>

          {/* 3. Magic Cursor Destination Screen */}
          <div
            style={{
              height: '100%',
              background: TEAL_SOFT,
              borderRadius: 24,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${TEAL}`,
              padding: 30,
              ...centerCol,
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <svg width={340} height={270} viewBox="0 0 340 270" fill="none">
              <rect x="20" y="24" width="300" height="214" rx="22" fill={CHARCOAL} />
              <rect x="34" y="38" width="272" height="186" rx="14" fill="#0F172A" />
              {/* Dotted path inside screen */}
              <path
                d="M90 176 Q155 120 226 108"
                stroke={SUNNY}
                strokeWidth={5}
                strokeDasharray="10 10"
                strokeLinecap="round"
              />
              {/* Target Button */}
              <rect x="202" y="74" width="76" height="44" rx="14" fill={TEAL} stroke={WHITE} strokeWidth={3} />
              <text x="240" y="103" textAnchor="middle" fontFamily='"Fredoka", sans-serif' fontSize="20" fontWeight="700" fill={WHITE}>
                KLIK!
              </text>
              {/* Giant White Cursor Arrow Animated */}
              <g style={{ animation: live ? 'cpj-cursor-glide 2.4s ease-in-out infinite' : undefined }}>
                <path
                  d="M96 144 L96 206 L114 190 L128 214 L142 206 L128 182 L152 178 Z"
                  fill={WHITE}
                  stroke={CHARCOAL}
                  strokeWidth={4}
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <div
              style={{
                padding: '14px 20px',
                borderRadius: 18,
                background: STABILO,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
                lineHeight: 1.25,
              }}
            >
              ➡️ Menggerakkan Panah Ajaib!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Ayo Tunjuk! (Interactive Pins 1-2-3)
// ============================================================================
const QUIZ_PINS = [
  { id: 1, name: 'Layar', emoji: '👀', color: CORAL, x: 563, y: 156, desc: 'Tempat gambar & game!' },
  { id: 2, name: 'Keyboard', emoji: '🔤', color: SUNNY, x: 563, y: 370, desc: 'Tombol huruf & angka!' },
  { id: 3, name: 'Trackpad', emoji: '👆', color: TEAL, x: 563, y: 468, desc: 'Penggerak panah ajaib!' },
];

const Slide06Tebak: Page = () => {
  const [revealed, setRevealed] = useState<number[]>([1, 2, 3]);

  const togglePin = (id: number) => {
    setRevealed((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle top={140}>
        Mana <Highlight>Bagian Laptopnya?</Highlight>
      </SlideTitle>

      {/* Center-Left Interactive Laptop Diagram */}
      <MacWindowCard
        left={X0}
        top={258}
        width={1180}
        height={680}
        titleBarColor="#FEF2F2"
        headerLabel="KLIK ANGKA UNTUK CEK JAWABAN"
        padding={24}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <svg width={880} height={540} viewBox="0 0 880 540" fill="none" style={{ display: 'block', margin: '0 auto' }}>
            {/* Top-Front Isometric-Flat Laptop */}
            <rect x="170" y="24" width="540" height="274" rx="22" fill={CHARCOAL} />
            <rect x="190" y="44" width="500" height="234" rx="12" fill="#E0F2FE" stroke={SKY} strokeWidth={4} />
            {/* Screen Sparkles */}
            <circle cx="310" cy="145" r="32" fill={SUNNY} />
            <rect x="370" y="122" width="180" height="26" rx="13" fill={WHITE} />
            <rect x="370" y="162" width="120" height="20" rx="10" fill="#BAE6FD" />

            {/* Lower Base */}
            <path
              d="M140 298 H740 L800 508 H80 Z"
              fill="#E2E8F0"
              stroke={CHARCOAL}
              strokeWidth={4.5}
              strokeLinejoin="round"
            />
            {/* Keyboard Grid */}
            <rect x="190" y="318" width="500" height="106" rx="12" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={3} />
            {/* Trackpad */}
            <rect x="336" y="438" width="208" height="58" rx="12" fill="#94A3B8" stroke={CHARCOAL} strokeWidth={3} />
          </svg>

          {/* 3 Clickable Number Pins */}
          {QUIZ_PINS.map((pin) => {
            const isOpen = revealed.includes(pin.id);
            return (
              <div
                key={pin.id}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(pin.id);
                }}
                className="cpj-card-btn"
                style={{
                  position: 'absolute',
                  left: pin.x,
                  top: pin.y,
                  transform: 'translate(-50%, -50%)',
                  ...row,
                  gap: 14,
                  zIndex: 4,
                }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 99,
                    background: pin.color,
                    border: `4px solid ${CHARCOAL}`,
                    boxShadow: `0 5px 0 ${CHARCOAL}`,
                    ...centerCol,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 34,
                    fontWeight: 700,
                    color: pin.id === 2 ? CHARCOAL : WHITE,
                  }}
                >
                  {pin.id}
                </div>
                {isOpen && (
                  <div
                    style={{
                      padding: '10px 22px',
                      borderRadius: 18,
                      background: WHITE,
                      border: `3px solid ${CHARCOAL}`,
                      boxShadow: `0 4px 0 ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 26,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {pin.emoji} {pin.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </MacWindowCard>

      {/* Right Column: Biko with ? Sign + Callout */}
      <div style={{ ...abs(1330, 260, 490, 640), ...centerCol, justifyContent: 'space-between' }}>
        <BikoMascot pose="question" width={370} />

        <div
          style={{
            width: '100%',
            padding: '24px 28px',
            borderRadius: 24,
            background: STABILO,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 32,
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          👉 Tunjuk di laptopmu ya!
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Aturan Emas #1 & #2: Jaga Kebersihan & Kelembutan
// ============================================================================
const Slide07Aturan12: Page = () => (
  <JuniorFrame badge="ATURAN EMAS LAPTOP" accentDot={TEAL}>
    <SlideTitle top={140}>
      <Highlight>Sayangi</Highlight> Laptop Ajaibmu!
    </SlideTitle>

    {/* Left Column: BOLEH (Green Card) */}
    <div
      style={{
        ...abs(X0, 262, 825, 670),
        background: TEAL_SOFT,
        borderRadius: 30,
        border: `4px solid ${TEAL}`,
        boxShadow: `0 8px 0 ${TEAL}`,
        padding: 36,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      <div style={{ ...row, gap: 16 }}>
        <IconCheck size={52} />
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 42,
            fontWeight: 700,
            color: TEAL_DARK,
          }}
        >
          BOLEH DILAKUKAN
        </span>
      </div>

      {/* Point 1: Clean & Dry Hands */}
      <div
        style={{
          flex: 1,
          background: WHITE,
          borderRadius: 24,
          border: `3px solid ${CHARCOAL}`,
          padding: '20px 28px',
          ...row,
          gap: 28,
        }}
      >
        <svg width={138} height={138} viewBox="0 0 140 140" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="70" cy="70" r="62" fill="#D1FAE5" />
          {/* Clean Shining Hand */}
          <path
            d="M50 86 V44 C50 38, 60 38, 60 44 V66 M60 36 C60 30, 70 30, 70 36 V66 M70 34 C70 28, 80 28, 80 34 V66 M80 42 C80 36, 90 36, 90 42 V84 C90 100, 78 112, 64 112 C52 112, 44 102, 44 88 L36 74 C32 68, 40 62, 46 68 Z"
            fill="#FDE68A"
            stroke={CHARCOAL}
            strokeWidth={3.5}
            strokeLinejoin="round"
          />
          {/* Sparkle Bubbles */}
          <circle cx="30" cy="36" r="10" fill={SKY} stroke={CHARCOAL} strokeWidth={2.5} />
          <circle cx="110" cy="40" r="8" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
          <path d="M108 86 L112 94 L120 98 L112 102 L108 110 L104 102 L96 98 L104 94 Z" fill={TEAL} />
        </svg>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.25 }}>
          🧼 Tangan Bersih &amp; Kering
        </div>
      </div>

      {/* Point 2: Gentle Typing */}
      <div
        style={{
          flex: 1,
          background: WHITE,
          borderRadius: 24,
          border: `3px solid ${CHARCOAL}`,
          padding: '20px 28px',
          ...row,
          gap: 28,
        }}
      >
        <svg width={138} height={138} viewBox="0 0 140 140" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="70" cy="70" r="62" fill="#D1FAE5" />
          {/* Keycap */}
          <rect x="28" y="80" width="84" height="32" rx="10" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
          {/* Gentle Feather */}
          <path
            d="M94 26 C64 28, 44 52, 46 84 C74 82, 98 60, 94 26 Z"
            fill={SKY}
            stroke={CHARCOAL}
            strokeWidth={3.5}
          />
          <path d="M42 92 L90 32" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
        </svg>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.25 }}>
          🪶 Tekan Tombol Pelan-Pelan
        </div>
      </div>
    </div>

    {/* Right Column: JANGAN (Coral Red Card) */}
    <div
      style={{
        ...abs(995, 262, 825, 670),
        background: CORAL_SOFT,
        borderRadius: 30,
        border: `4px solid ${CORAL}`,
        boxShadow: `0 8px 0 ${CORAL}`,
        padding: 36,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      <div style={{ ...row, gap: 16 }}>
        <IconCross size={52} />
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 42,
            fontWeight: 700,
            color: CORAL,
          }}
        >
          JANGAN DILAKUKAN
        </span>
      </div>

      {/* Point 1: Keep Drinks & Snacks Away */}
      <div
        style={{
          flex: 1,
          background: WHITE,
          borderRadius: 24,
          border: `3px solid ${CHARCOAL}`,
          padding: '20px 28px',
          ...row,
          gap: 28,
        }}
      >
        <svg width={138} height={138} viewBox="0 0 140 140" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="70" cy="70" r="62" fill="#FEE2E2" />
          {/* Tilted Spilling Cup */}
          <path
            d="M42 48 L74 36 L86 78 L52 90 Z"
            fill={WHITE}
            stroke={CHARCOAL}
            strokeWidth={3.5}
            strokeLinejoin="round"
          />
          <path d="M84 42 L98 22" stroke={CORAL} strokeWidth={5} strokeLinecap="round" />
          {/* Splash Drops */}
          <path d="M58 92 Q78 110 108 106 Q112 118 82 118 Q54 116 58 92 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={2.5} />
          {/* Red Prohibition Line */}
          <path d="M24 24 L116 116" stroke={CORAL} strokeWidth={7} strokeLinecap="round" />
        </svg>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.25 }}>
          🥤 Jauhkan Air &amp; Makanan
        </div>
      </div>

      {/* Point 2: Don't Hit Hard */}
      <div
        style={{
          flex: 1,
          background: WHITE,
          borderRadius: 24,
          border: `3px solid ${CHARCOAL}`,
          padding: '20px 28px',
          ...row,
          gap: 28,
        }}
      >
        <svg width={138} height={138} viewBox="0 0 140 140" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="70" cy="70" r="62" fill="#FEE2E2" />
          {/* Toy Hammer / Fist Impact */}
          <rect x="52" y="28" width="54" height="32" rx="8" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.5} />
          <rect x="74" y="58" width="12" height="44" rx="5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
          {/* Impact Shock Lines */}
          <path d="M36 92 L50 84 M32 104 L50 102 M108 92 L94 84" stroke={CORAL} strokeWidth={4.5} strokeLinecap="round" />
          {/* Red Prohibition Line */}
          <path d="M24 24 L116 116" stroke={CORAL} strokeWidth={7} strokeLinecap="round" />
        </svg>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.25 }}>
          🔨 Jangan Dipukul Keras
        </div>
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 08 — Aturan Emas #3 & #4: Cara Buka & Duduk Aman
// ============================================================================
const Slide08Aturan34: Page = () => (
  <JuniorFrame badge="ATURAN EMAS LAPTOP" accentDot={TEAL}>
    <SlideTitle top={140}>
      <Highlight>Buka Pelan</Highlight> &amp; Duduk Rapi
    </SlideTitle>

    <MacWindowCard
      left={X0}
      top={258}
      width={1360}
      height={680}
      titleBarColor={TEAL_SOFT}
      headerLabel="ATURAN #3 & #4"
      padding={42}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 36,
          height: '100%',
        }}
      >
        {/* Kartu 1: Open with 2 Hands (Green Accent) */}
        <div
          style={{
            background: TEAL_SOFT,
            borderRadius: 26,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${TEAL}`,
            padding: 32,
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
              border: `2px solid ${CHARCOAL}`,
              color: WHITE,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            ATURAN #3
          </div>

          <svg width={340} height={260} viewBox="0 0 340 260" fill="none">
            {/* Laptop Opening */}
            <rect x="64" y="64" width="212" height="132" rx="16" fill={CHARCOAL} />
            <rect x="78" y="78" width="184" height="104" rx="8" fill="#D1FAE5" />
            <path d="M44 196 H296 L316 232 H24 Z" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            {/* Left Hand holding top edge */}
            <rect x="96" y="42" width="44" height="32" rx="12" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} />
            {/* Right Hand holding top edge */}
            <rect x="200" y="42" width="44" height="32" rx="12" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} />
            {/* Gentle Up Arrows */}
            <path d="M170 28 V52 M160 38 L170 26 L180 38" stroke={TEAL} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1.28 }}>
            Buka &amp; tutup layar dengan <Highlight color="#D1FAE5">Dua Tangan</Highlight>
          </div>
        </div>

        {/* Kartu 2: Laptop on Desk, Sit Upright (Blue Accent) */}
        <div
          style={{
            background: SKY_SOFT,
            borderRadius: 26,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${SKY}`,
            padding: 32,
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
              border: `2px solid ${CHARCOAL}`,
              color: WHITE,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            ATURAN #4
          </div>

          <svg width={340} height={260} viewBox="0 0 340 260" fill="none">
            {/* Desk */}
            <rect x="132" y="148" width="184" height="18" rx="8" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} />
            <path d="M158 166 V242 M290 166 V242" stroke={CHARCOAL} strokeWidth={5} strokeLinecap="round" />
            {/* Laptop on Desk */}
            <path d="M214 146 H276 L296 96" stroke={CHARCOAL} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            {/* Upright Seated Character */}
            <circle cx="102" cy="70" r="26" fill={OTTER_GOLD} stroke={CHARCOAL} strokeWidth={3.5} />
            <circle cx="112" cy="68" r="3.5" fill={CHARCOAL} />
            <path d="M84 98 H120 L132 160 H74 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
            <path d="M116 124 L182 142" stroke={OTTER_GOLD} strokeWidth={12} strokeLinecap="round" />
            {/* Chair */}
            <path d="M56 108 V182 H124 V242 M68 182 V242" stroke={CHARCOAL} strokeWidth={5} strokeLinecap="round" />
            {/* Upright Green Straight Back Indicator */}
            <path d="M42 66 V142" stroke={TEAL} strokeWidth={5} strokeDasharray="8 6" strokeLinecap="round" />
          </svg>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1.28 }}>
            Laptop di atas <Highlight color="#DBEAFE">Meja</Highlight> &amp; duduk tegak!
          </div>
        </div>
      </div>
    </MacWindowCard>

    {/* Biko Giving Big Thumbs Up on Right */}
    <div style={{ ...abs(1488, 450, 340, 490), ...centerCol }}>
      <BikoMascot pose="thumbs-up" width={340} />
      <div
        style={{
          marginTop: 6,
          padding: '10px 22px',
          borderRadius: 99,
          background: SUNNY,
          border: `2.5px solid ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        Anak Hebat! 👍
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik Pertama! (3 Blok Ala ScratchJr + Interactive Demo)
// ============================================================================
const MISSION_STEPS = [
  {
    num: 1,
    color: SKY,
    soft: SKY_SOFT,
    title: 'Sentuh Trackpad',
    sub: 'Dengan 1 jari lembut',
    cursorPos: { x: 160, y: 118 },
    started: false,
  },
  {
    num: 2,
    color: SUNNY,
    soft: '#FEF9C3',
    title: 'Geser Pelan',
    sub: 'Ke Kiri & ke Kanan',
    cursorPos: { x: 430, y: 84 },
    started: false,
  },
  {
    num: 3,
    color: TEAL,
    soft: TEAL_SOFT,
    title: 'Tekan Klik 1x!',
    sub: 'Arahkan ke START',
    cursorPos: { x: 670, y: 92 },
    started: true,
  },
];

const Slide09MisiPraktik: Page = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const currentStep = MISSION_STEPS[activeStep - 1];

  return (
    <JuniorFrame badge="AYO COBA SEKARANG!" accentDot={SKY}>
      <SlideTitle top={140}>
        Misi Menggerakkan <Highlight>Panah Ajaib</Highlight>
      </SlideTitle>

      {/* Top Row: 3 Horizontal ScratchJr-Style Puzzle Step Blocks */}
      <div
        style={{
          ...abs(X0, 260, W, 240),
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 1fr',
          gap: 18,
          alignItems: 'center',
        }}
      >
        {MISSION_STEPS.map((s, idx) => {
          const isSelected = activeStep === s.num;
          return (
            <Fragment key={s.num}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveStep(s.num);
                }}
                className="cpj-card-btn"
                style={{
                  height: 218,
                  background: isSelected ? s.color : s.soft,
                  color: isSelected && s.num !== 2 ? WHITE : CHARCOAL,
                  borderRadius: 28,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: isSelected ? `0 4px 0 ${CHARCOAL}` : `0 8px 0 ${CHARCOAL}`,
                  padding: '22px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <div style={{ ...row, justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      background: WHITE,
                      color: CHARCOAL,
                      border: `3px solid ${CHARCOAL}`,
                      ...centerCol,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 32,
                      fontWeight: 700,
                    }}
                  >
                    {s.num}
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 800, opacity: 0.85 }}>
                    {isSelected ? 'AKTIF ●' : 'KLIK COBA'}
                  </span>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: 23, fontWeight: 700, marginTop: 4, opacity: 0.92 }}>
                    {s.sub}
                  </div>
                </div>
              </div>

              {idx < 2 && (
                <div style={{ fontSize: 42, fontWeight: 800, color: CHARCOAL }}>
                  ➔
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Bottom Stage: Interactive Trackpad to START Button Demo */}
      <MacWindowCard
        left={X0}
        top={526}
        width={W}
        height={418}
        titleBarColor={SAND_GRID}
        headerLabel="SIMULASI MISI: KLIK BLOK 1, 2, ATAU 3 DI ATAS!"
        padding={28}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '420px 1fr',
            gap: 32,
            height: '100%',
            alignItems: 'center',
          }}
        >
          {/* Left: Trackpad Finger Demo */}
          <div
            style={{
              height: '100%',
              background: SKY_SOFT,
              borderRadius: 22,
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
            }}
          >
            <svg width={320} height={240} viewBox="0 0 320 240" fill="none">
              <rect x="44" y="28" width="232" height="168" rx="22" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
              <rect x="64" y="46" width="192" height="132" rx="14" fill="#DBEAFE" stroke={SKY} strokeWidth={3} />
              {/* Sliding Finger */}
              <g
                style={{
                  transform: `translateX(${(activeStep - 1) * 44}px)`,
                  transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <circle cx="110" cy="112" r="22" fill={SUNNY} opacity={0.65} />
                <path
                  d="M110 106 C118 106, 124 114, 124 128 V192 H96 V128 C96 114, 102 106, 110 106 Z"
                  fill="#FDE68A"
                  stroke={CHARCOAL}
                  strokeWidth={3.5}
                />
              </g>
            </svg>
          </div>

          {/* Right: Starry Path to START Button */}
          <div
            style={{
              height: '100%',
              background: '#0F172A',
              borderRadius: 22,
              border: `3px solid ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 1160 280" fill="none">
              {/* Star Dotted Trail */}
              <path
                d="M160 150 Q410 70 760 124"
                stroke={SUNNY}
                strokeWidth={6}
                strokeDasharray="14 14"
                strokeLinecap="round"
              />
              <circle cx="290" cy="114" r="8" fill={SUNNY} />
              <circle cx="440" cy="94" r="10" fill={LAVENDER} />
              <circle cx="590" cy="102" r="8" fill={SKY} />

              {/* Big START Target Button */}
              <g
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveStep(3);
                }}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x="760"
                  y="74"
                  width="270"
                  height="104"
                  rx="28"
                  fill={currentStep.started ? TEAL : CORAL}
                  stroke={WHITE}
                  strokeWidth={5}
                />
                <text
                  x="895"
                  y="140"
                  textAnchor="middle"
                  fontFamily='"Fredoka", sans-serif'
                  fontSize="44"
                  fontWeight="700"
                  fill={WHITE}
                >
                  {currentStep.started ? '★ YEAY!' : '▶ START'}
                </text>
              </g>

              {/* Moving Big White Cursor */}
              <g
                style={{
                  transform: `translate(${currentStep.cursorPos.x}px, ${currentStep.cursorPos.y}px)`,
                  transition: 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <path
                  d="M0 0 L0 76 L22 56 L40 88 L56 78 L38 46 L68 42 Z"
                  fill={WHITE}
                  stroke={CHARCOAL}
                  strokeWidth={5}
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 1 (Celebration Center Card)
// ============================================================================
const CONFETTI = [
  { x: 140, y: 270, color: CORAL, size: 22, shape: 'circle' },
  { x: 150, y: 500, color: SKY, size: 24, shape: 'rect' },
  { x: 1740, y: 260, color: TEAL, size: 24, shape: 'circle' },
  { x: 1650, y: 340, color: SUNNY, size: 26, shape: 'rect' },
  { x: 180, y: 780, color: LAVENDER, size: 24, shape: 'rect' },
  { x: 1710, y: 770, color: CORAL, size: 22, shape: 'circle' },
];

const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      {/* Floating Confetti */}
      {CONFETTI.map((c, idx) => (
        <div
          key={idx}
          aria-hidden
          style={{
            ...abs(c.x, c.y, c.size, c.size),
            borderRadius: c.shape === 'circle' ? 99 : 6,
            background: c.color,
            border: `2px solid ${CHARCOAL}`,
            animation: live ? `cpj-confetti ${2.2 + idx * 0.25}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle top={134} size={62} align="center">
        Hore! <Highlight>Kamu Hebat!</Highlight> 🎉
      </SlideTitle>

      {/* Center Celebration Window Card */}
      <MacWindowCard
        left={260}
        top={246}
        width={1060}
        height={690}
        titleBarColor="#FEF9C3"
        headerLabel="LENCANA PERTEMUAN 1"
        padding={36}
      >
        <div style={{ ...centerCol, height: '100%', textAlign: 'center', gap: 22 }}>
          {/* Big Gold Medal with Laptop Emblem */}
          <svg
            width={280}
            height={280}
            viewBox="0 0 280 280"
            fill="none"
            style={{
              animation: live ? 'cpj-float 2.8s ease-in-out infinite' : undefined,
            }}
          >
            {/* Ribbons */}
            <path d="M88 20 L122 108 H84 L54 20 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            <path d="M192 20 L158 108 H196 L226 20 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            {/* Gold Outer Ring */}
            <circle cx="140" cy="158" r="102" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
            <circle cx="140" cy="158" r="82" fill="#FEF08A" stroke={CHARCOAL} strokeWidth={3.5} />
            {/* Mini Laptop Emblem */}
            <rect x="94" y="114" width="92" height="58" rx="10" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} />
            <rect x="104" y="124" width="72" height="38" rx="4" fill={WHITE} />
            <path d="M80 174 H200 L210 190 H70 Z" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            {/* Star on Mini Screen */}
            <path
              d="M140 130 L144 139 L154 140 L146 147 L148 156 L140 151 L132 156 L134 147 L126 140 L136 139 Z"
              fill={SUNNY}
              stroke={CHARCOAL}
              strokeWidth={2}
            />
          </svg>

          <div
            style={{
              padding: '12px 32px',
              borderRadius: 99,
              background: SUNNY,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 5px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            🏅 Lencana Sahabat Laptop Ajaib
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 32,
              fontWeight: 700,
              lineHeight: 1.38,
              maxWidth: 820,
              color: CHARCOAL,
            }}
          >
            Kamu sudah kenal <Highlight>Layar, Keyboard, Trackpad</Highlight> dan{' '}
            <Highlight color="#D1FAE5">Aturan Emas!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Celebrating Jumping Biko on Right */}
      <div style={{ ...abs(1370, 390, 420, 520), ...centerCol }}>
        <BikoMascot pose="jump" width={400} />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// Speaker Notes (Talk Track for Mentors teaching Ages 5–7)
// ============================================================================
export const notes: (string | undefined)[] = [
  `Halo teman-teman kecil! Kenalkan, ini Biko si berang-berang.
Hari ini Biko mau mengajak kita kenalan dengan teman baru yang super seru: Laptop Ajaib kita!`,

  `Kita punya dua misi seru hari ini:
1. Mengenal 3 bagian utama laptop.
2. Menghafal Aturan Emas supaya laptop kita selalu awet dan senang!`,

  `Bagian pertama namanya LAYAR!
Coba lihat, layar itu seperti TV ajaib. Semua gambar lucu, roket, dan game seru muncul di sini.`,

  `Bagian kedua adalah KEYBOARD!
Ada banyak sekali tombol huruf, angka, dan spasi yang panjang. Klik tombolnya pelan-pelan ya untuk memberi perintah ke laptop!`,

  `Bagian ketiga ada TRACKPAD dan MOUSE.
Trackpad itu kotak sentuh yang ada di laptop, sedangkan Mouse adalah teman genggam di meja. Keduanya bertugas menggerakkan Panah Ajaib di layar!`,

  `Waktunya main tebak-tebakan!
Coba anak-anak tunjuk langsung di laptop masing-masing: mana nomor 1, mana nomor 2, dan mana nomor 3? Klik angkanya untuk cek bersama!`,

  `Sekarang kita belajar Aturan Emas!
Yang BOLEH: tangan harus bersih & kering, tekan tombol pelan seperti menyentuh bulu.
Yang JANGAN: jauhkan air dan makanan, dan jangan pernah memukul tombol keras-keras!`,

  `Aturan Emas berikutnya: selalu buka dan tutup layar dari tengah dengan DUA TANGAN.
Dan saat belajar, taruh laptop di atas meja sambil duduk tegak rapi seperti Biko!`,

  `Ayo kita coba misi pertama kita!
Langkah 1: Sentuh trackpad dengan 1 jari. Langkah 2: Geser pelan ke kiri dan kanan. Langkah 3: Klik 1 kali di tombol START!`,

  `Horeee! Selamat untuk semua Code Explorer cilik!
Kalian berhasil mendapatkan Lencana Sahabat Laptop Ajaib. Sampai jumpa di petualangan coding berikutnya bersama Biko!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 1 — Kenalan Sama Laptop Ajaibku',
  createdAt: '2026-11-13T07:51:03.987Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03Layar,
  Slide04Keyboard,
  Slide05TrackpadMouse,
  Slide06Tebak,
  Slide07Aturan12,
  Slide08Aturan34,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];


import { Fragment, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import bikoWave from '../../assets/biko/biko-wave.png';
import bikoLaptop from '../../assets/biko/biko-laptop.png';
import bikoPointLeft from '../../assets/biko/biko-point-left.png';
import bikoJump from '../../assets/biko/biko-jump.png';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-2-misi-pecahkan-balon-bintang';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj2-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes cpj2-bob {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(-1.2deg); }
}
@keyframes cpj2-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj2-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj2-cursor-glide {
  0%, 100% { transform: translate(0px, 0px); }
  50% { transform: translate(84px, -34px); }
}
@keyframes cpj2-balloon-sway {
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}
@keyframes cpj2-pulse-ring {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.16); opacity: 0.45; }
}
.cpj2-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj2-card-btn:hover {
  transform: translateY(-4px);
}
.cpj2-card-btn:active {
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
          animation: live ? 'cpj2-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 2 • Misi Pecahkan Balon Bintang</span>
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
type BikoPose = 'cover-laptop' | 'point-left' | 'point-right' | 'press-key' | 'question' | 'thumbs-up' | 'jump' | 'wave';

const BIKO_POSE_ASSETS: Record<BikoPose, string> = {
  'cover-laptop': bikoLaptop,
  'point-left': bikoPointLeft,
  'point-right': bikoPointLeft,
  'press-key': bikoPointLeft,
  question: bikoWave,
  'thumbs-up': bikoWave,
  jump: bikoJump,
  wave: bikoWave,
};

const BikoMascot = ({
  pose = 'point-left',
  width = 340,
  badgeEmoji,
  badgeIcon,
  style,
}: {
  pose?: BikoPose;
  width?: number;
  badgeEmoji?: string;
  badgeIcon?: ReactNode;
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
              ? 'cpj2-float 1.8s ease-in-out infinite'
              : 'cpj2-bob 3.2s ease-in-out infinite'
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

        {(pose === 'thumbs-up' || badgeEmoji || badgeIcon) && (
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
            {badgeIcon ?? badgeEmoji ?? <JuniorIcon name="thumbs-up" size={34} />}
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
// Reusable Flat-Vector Illustrations (Balloons, Star, Cursor, Mouse, Check/Cross)
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

const StarBalloonSvg = ({
  color = CORAL,
  width = 110,
  starColor = SUNNY,
  style,
}: {
  color?: string;
  width?: number;
  starColor?: string;
  style?: CSSProperties;
}) => (
  <svg width={width} viewBox="0 0 110 156" fill="none" style={{ display: 'block', ...style }}>
    {/* Curvy string */}
    <path d="M55 112 Q46 130 57 142 Q63 149 54 154" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
    {/* Knot */}
    <path d="M47 110 L63 110 L55 101 Z" fill={color} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
    {/* Balloon Oval */}
    <ellipse cx="55" cy="54" rx="44" ry="50" fill={color} stroke={CHARCOAL} strokeWidth={3.8} />
    {/* Soft glossy highlight */}
    <path d="M27 38 C28 24, 38 16, 48 15" stroke={WHITE} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
    {/* Golden Star Inside Balloon */}
    <path
      d="M55 30 L61.5 43.2 L76 45.3 L65.5 55.5 L68 70 L55 63.1 L42 70 L44.5 55.5 L34 45.3 L48.5 43.2 Z"
      fill={starColor}
      stroke={CHARCOAL}
      strokeWidth={2.8}
      strokeLinejoin="round"
    />
  </svg>
);

const CursorArrowSvg = ({
  size = 58,
  fill = WHITE,
  style,
}: {
  size?: number;
  fill?: string;
  style?: CSSProperties;
}) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" style={{ display: 'block', ...style }}>
    <path
      d="M12 6 L46 28 L29 32 L38 47 L31 51 L22 36 L12 45 Z"
      fill={fill}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinejoin="round"
    />
  </svg>
);

const TopMouseVector = ({
  litSide,
  width = 180,
  fingerColor = SUNNY,
}: {
  litSide: 'left' | 'right';
  width?: number;
  fingerColor?: string;
}) => {
  const height = Math.round(width * 1.28);
  return (
    <svg width={width} height={height} viewBox="0 0 180 230" fill="none" style={{ display: 'block' }}>
      {/* Cord */}
      <path d="M90 8 C90 22, 90 26, 90 34" stroke={CHARCOAL} strokeWidth={5} strokeLinecap="round" />
      {/* Base Body */}
      <rect x="28" y="34" width="124" height="178" rx="62" fill={WHITE} stroke={CHARCOAL} strokeWidth={4.5} />
      {/* Left Button Half */}
      <path
        d="M30 96 C30 58, 56 36, 90 36 L90 106 L30 106 Z"
        fill={litSide === 'left' ? SUNNY : '#F1F5F9'}
        stroke={CHARCOAL}
        strokeWidth={3.5}
      />
      {/* Right Button Half */}
      <path
        d="M150 96 C150 58, 124 36, 90 36 L90 106 L150 106 Z"
        fill={litSide === 'right' ? LAVENDER : '#F1F5F9'}
        stroke={CHARCOAL}
        strokeWidth={3.5}
      />
      {/* Scroll Wheel */}
      <rect x="81" y="56" width="18" height="36" rx="9" fill={CHARCOAL} />
      <line x1="90" y1="64" x2="90" y2="82" stroke={WHITE} strokeWidth={3} strokeLinecap="round" />
      {/* Center Palm Smile */}
      <path d="M58 152 Q90 172 122 152" stroke="#CBD5E1" strokeWidth={4.5} strokeLinecap="round" />
      {/* Cute Finger Tap Dot on Active Side */}
      <circle
        cx={litSide === 'left' ? 58 : 122}
        cy={72}
        r={14}
        fill={fingerColor}
        stroke={CHARCOAL}
        strokeWidth={3.5}
      />
      <circle
        cx={litSide === 'left' ? 58 : 122}
        cy={72}
        r={22}
        stroke={CHARCOAL}
        strokeWidth={2.5}
        strokeDasharray="5 5"
      />
    </svg>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Hero Split Layout)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 2" accentDot={SUNNY}>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 220, 880, 690), display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
            marginBottom: 26,
          }}
        >
          <JuniorIcon name="balloon" size={26} />
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
          Misi Pecahkan{' '}
          <Highlight color={STABILO}>Balon Bintang!</Highlight>
        </h1>

        <p
          style={{
            margin: '30px 0 40px',
            fontSize: 33,
            fontWeight: 700,
            lineHeight: 1.38,
            color: MUTED,
            maxWidth: 790,
          }}
        >
          Tangkas Klik Mouse &amp; Jagoan Screen Time Sehat
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
            <JuniorIcon name="mouse" size={30} />
            <span>Klik Kiri &amp; Kursor</span>
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
            <JuniorIcon name="eyes" size={30} />
            <span>Mata Sehat &amp; Ceria</span>
          </div>
        </div>
      </div>

      {/* Right Visual Showcase: Sky Arcade Stage Card + Star Balloons & Biko */}
      <div style={{ ...abs(1020, 175, 790, 770), ...centerCol }}>
        {/* Sky-Blue Arcade Stage Card (Distinct from plain circle) */}
        <div
          style={{
            position: 'absolute',
            width: 650,
            height: 615,
            borderRadius: 46,
            background: 'linear-gradient(180deg, #E0F2FE 0%, #ECFDF5 100%)',
            border: `4px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${CORAL}`,
            overflow: 'hidden',
          }}
        >
          {/* Festive Arcade Header Strip */}
          <div
            style={{
              height: 54,
              background: SUNNY,
              borderBottom: `3.5px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'center',
              gap: 12,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
              color: CHARCOAL,
            }}
          >
            <JuniorIcon name="balloon" size={26} />
            <span>GAME BALON BINTANG</span>
            <JuniorIcon name="star" size={26} />
          </div>
          {/* Soft Dotted Sky Hills at Bottom */}
          <div
            style={{
              position: 'absolute',
              left: -40,
              right: -40,
              bottom: -40,
              height: 150,
              borderRadius: '50%',
              background: '#D1FAE5',
              borderTop: `3px solid ${CHARCOAL}`,
            }}
          />
        </div>

        {/* Floating Colorful Star Balloons */}
        <div
          style={{
            position: 'absolute',
            left: 72,
            top: 44,
            zIndex: 3,
            animation: live ? 'cpj2-balloon-sway 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <StarBalloonSvg color={CORAL} width={116} />
        </div>
        <div
          style={{
            position: 'absolute',
            right: 78,
            top: 34,
            zIndex: 3,
            animation: live ? 'cpj2-balloon-sway 3.7s ease-in-out infinite' : undefined,
          }}
        >
          <StarBalloonSvg color={SKY} width={112} />
        </div>
        <div
          style={{
            position: 'absolute',
            right: 52,
            bottom: 145,
            zIndex: 3,
            animation: live ? 'cpj2-balloon-sway 2.9s ease-in-out infinite' : undefined,
          }}
        >
          <StarBalloonSvg color={TEAL} width={96} />
        </div>

        {/* Cursor Aiming Right at the Coral Star Balloon */}
        <div
          style={{
            position: 'absolute',
            left: 162,
            top: 122,
            zIndex: 4,
            animation: live ? 'cpj2-cursor-glide 3.0s ease-in-out infinite' : undefined,
          }}
        >
          <CursorArrowSvg size={64} fill={WHITE} />
        </div>

        {/* Cute Wireless Mouse Pill Next to Biko */}
        <div
          style={{
            position: 'absolute',
            left: 62,
            bottom: 120,
            zIndex: 4,
            padding: '12px 16px',
            borderRadius: 24,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            transform: 'rotate(-8deg)',
          }}
        >
          <TopMouseVector litSide="left" width={82} />
        </div>

        <BikoMascot
          pose="cover-laptop"
          width={450}
          style={{ position: 'relative', zIndex: 2, marginTop: 64 }}
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

    <MacWindowCard left={X0} top={250} width={1280} height={675} headerLabel="daftar-misi-2.exe" padding={42}>
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

          {/* Cursor Arrow Aiming at Star Balloon Illustration */}
          <div style={{ position: 'relative', width: 220, height: 185, ...centerCol }}>
            <StarBalloonSvg color={CORAL} width={104} style={{ marginLeft: 36 }} />
            <div style={{ position: 'absolute', left: 32, bottom: 26 }}>
              <CursorArrowSvg size={64} fill={SUNNY} />
            </div>
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
            Jago Gerakkan{' '}
            <Highlight color="#DBEAFE">Kursor &amp; Klik Kiri</Highlight>
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

          {/* Smiling Clock + Healthy Eye Illustration */}
          <svg width={220} height={175} viewBox="0 0 220 175" fill="none">
            {/* Friendly Alarm Clock */}
            <circle cx="78" cy="96" r="52" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
            <circle cx="78" cy="96" r="40" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={2.5} />
            <path d="M40 50 L54 62 M116 50 L102 62" stroke={CHARCOAL} strokeWidth={6} strokeLinecap="round" />
            <path d="M78 96 V70 M78 96 L98 106" stroke={CORAL} strokeWidth={5} strokeLinecap="round" />
            <circle cx="78" cy="96" r="5" fill={CHARCOAL} />
            {/* Happy Sparkling Healthy Eye */}
            <ellipse cx="164" cy="94" rx="46" ry="30" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
            <circle cx="164" cy="94" r="17" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
            <circle cx="164" cy="94" r="8" fill={CHARCOAL} />
            <circle cx="170" cy="88" r="4" fill={WHITE} />
            {/* Cute eye sparkle */}
            <path d="M196 48 L200 58 L210 62 L200 66 L196 76 L192 66 L182 62 L192 58 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
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
            Jadi <Highlight color="#D1FAE5">Jagoan Screen Time</Highlight> Sehat
          </div>
        </div>
      </div>
    </MacWindowCard>

    {/* Biko Pointing Enthusiastically to Mission Cards */}
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
        <JuniorIcon name="rocket" size={26} />
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Jurus 1: Gerakkan Panah Ajaib (Kursor)
// ============================================================================
const BALLOON_TARGETS = [
  { id: 'coral', label: 'Balon Merah', color: CORAL, x: 540, y: 80 },
  { id: 'sky', label: 'Balon Biru', color: SKY, x: 700, y: 180 },
  { id: 'teal', label: 'Balon Hijau', color: TEAL, x: 560, y: 310 },
];

const Slide03Kursor: Page = () => {
  const live = useIsActivePage();
  const [targetIdx, setTargetIdx] = useState(0);
  const currentTarget = BALLOON_TARGETS[targetIdx];

  return (
    <JuniorFrame badge="JURUS TANGKAS #1" accentDot={SKY}>
      <SlideTitle>
        Gerakkan <Highlight>Panah Ajaib</Highlight>
      </SlideTitle>

      {/* Left Column: Spotlight Illustration Inside macOS Screen */}
      <MacWindowCard left={X0} top={245} width={960} height={685} headerLabel="gerakkan-panah-ajaib.app" padding={30}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: 'linear-gradient(180deg, #E0F2FE 0%, #F0FDF4 100%)',
            border: `3px solid ${CHARCOAL}`,
            overflow: 'hidden',
          }}
        >
          {/* Dashed movement path from Mouse/Hand to Target Balloon */}
          <svg width="100%" height="100%" viewBox="0 0 890 560" fill="none" style={{ position: 'absolute', inset: 0 }}>
            <path
              d="M170 430 C230 280, 340 220, 480 185"
              stroke={SKY}
              strokeWidth={7}
              strokeDasharray="16 14"
              strokeLinecap="round"
            />
            {/* Cross directional arrows */}
            <g transform="translate(86, 86)">
              <circle cx="56" cy="56" r="48" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} opacity={0.9} />
              <path d="M56 22 V90 M22 56 H90" stroke={TEAL} strokeWidth={5} strokeLinecap="round" />
              <path d="M46 32 L56 20 L66 32 M46 80 L56 92 L66 80 M32 46 L20 56 L32 66 M80 46 L92 56 L80 66" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Cute Hand Holding Mouse at Bottom Left */}
            <g transform="translate(86, 368)">
              <rect x="0" y="34" width="142" height="122" rx="44" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
              <path d="M71 34 V90 M10 90 H132" stroke={CHARCOAL} strokeWidth={3} />
              {/* Little hand palm */}
              <ellipse cx="78" cy="120" rx="42" ry="30" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} />
              <text
                x="71"
                y="22"
                textAnchor="middle"
                fontFamily='"Fredoka", sans-serif'
                fontSize="22"
                fontWeight="700"
                fill={CHARCOAL}
              >
                Geser Pelan
              </text>
            </g>
          </svg>

          {/* Clickable / Target Star Balloons */}
          {BALLOON_TARGETS.map((item, idx) => {
            const active = idx === targetIdx;
            return (
              <button
                key={item.id}
                type="button"
                className="cpj2-card-btn"
                onClick={() => setTargetIdx(idx)}
                style={{
                  position: 'absolute',
                  left: item.x,
                  top: item.y,
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  transform: active ? 'scale(1.12)' : 'scale(0.95)',
                  opacity: active ? 1 : 0.8,
                }}
              >
                <StarBalloonSvg color={item.color} width={118} />
                {active && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -12,
                      right: -18,
                      ...row,
                      gap: 6,
                      padding: '4px 12px',
                      borderRadius: 99,
                      background: SUNNY,
                      border: `2.5px solid ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    <JuniorIcon name="target" size={18} />
                    <span>Target!</span>
                  </div>
                )}
              </button>
            );
          })}

          {/* Animated Large White Cursor Arrow Gliding Near Active Balloon */}
          <div
            style={{
              position: 'absolute',
              left: currentTarget.x - 42,
              top: currentTarget.y + 44,
              pointerEvents: 'none',
              transition: 'left 260ms ease, top 260ms ease',
              animation: live ? 'cpj2-float 2.2s ease-in-out infinite' : undefined,
            }}
          >
            <CursorArrowSvg size={72} fill={WHITE} />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 24,
              bottom: 20,
              ...row,
              gap: 8,
              padding: '10px 20px',
              borderRadius: 99,
              background: WHITE,
              border: `2.5px solid ${CHARCOAL}`,
              fontSize: 20,
              fontWeight: 800,
              color: CHARCOAL,
            }}
          >
            <JuniorIcon name="tap" size={24} />
            <span>Coba klik balon lain untuk memindahkan Panah!</span>
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
          <JuniorIcon name="mouse" size={48} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1.25 }}>
            Geser <Highlight color="#DBEAFE">Mouse</Highlight> atau <Highlight color="#D1FAE5">Trackpad</Highlight>
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
            boxShadow: `0 6px 0 ${SUNNY}`,
          }}
        >
          <JuniorIcon name="target" size={48} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1.25 }}>
            Arahkan panah tepat ke <Highlight color={STABILO}>Balon</Highlight>
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
              maxWidth: 320,
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span>Ke kiri, kanan, atas, atau bawah!</span>
              <JuniorIcon name="compass" size={26} />
            </span>
          </div>
          <BikoMascot pose="point-left" width={310} />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus 2: Klik Kiri dengan Mouse
// ============================================================================
const Slide04KlikMouse: Page = () => {
  const live = useIsActivePage();
  const [clicks, setClicks] = useState(1);

  return (
    <JuniorFrame badge="JURUS TANGKAS #2" accentDot={SUNNY}>
      <SlideTitle>
        Ayo Tekan <Highlight>Klik Kiri!</Highlight>
      </SlideTitle>

      {/* Left Column: Concise Cards + Sound Effect + Biko */}
      <div style={{ ...abs(X0, 250, 720, 680), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div
          style={{
            ...row,
            gap: 20,
            padding: '24px 28px',
            borderRadius: 24,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${SUNNY}`,
          }}
        >
          <JuniorIcon name="tap" size={48} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
            Pakai <Highlight color={STABILO}>Jari Telunjuk</Highlight>
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
          <JuniorIcon name="sparkle" size={48} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
            Tekan tombol <Highlight color="#DBEAFE">Kiri</Highlight> 1 kali: <em>&ldquo;Klik!&rdquo;</em>
          </span>
        </div>

        {/* Biko + Click Burst Counter Card */}
        <div style={{ ...row, gap: 18, alignItems: 'center' }}>
          <BikoMascot pose="thumbs-up" width={275} badgeIcon={<JuniorIcon name="tap" size={32} />} />
          <div
            style={{
              flex: 1,
              padding: '24px 26px',
              borderRadius: 26,
              background: SUNNY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: MUTED }}>SUARA KARTUN:</div>
            <div
              style={{
                ...row,
                justifyContent: 'center',
                gap: 10,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 60,
                fontWeight: 700,
                color: CORAL,
                margin: '4px 0',
              }}
            >
              <span>KLIK!</span>
              <JuniorIcon name="sparkle" size={46} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: CHARCOAL }}>
              Sudah dicoba: <span style={{ color: TEAL }}>{clicks}x</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Large Interactive Mouse Close-Up Inside MacWindowCard */}
      <MacWindowCard left={865} top={245} width={955} height={685} headerLabel="tombol-klik-kiri.app" padding={28}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: '#FFFDF7',
            border: `2.5px dashed #E2D9C5`,
            ...centerCol,
            position: 'relative',
          }}
        >
          <button
            type="button"
            className="cpj2-card-btn"
            onClick={() => setClicks((c) => c + 1)}
            aria-label="Klik tombol kiri mouse"
            style={{
              position: 'relative',
              background: 'transparent',
              border: 'none',
              padding: 0,
              ...centerCol,
            }}
          >
            {/* Big Close-up Top-Down Mouse SVG */}
            <svg width={360} height={420} viewBox="0 0 360 420" fill="none">
              {/* Cable */}
              <path d="M180 6 C180 34, 180 42, 180 58" stroke={CHARCOAL} strokeWidth={8} strokeLinecap="round" />
              {/* Outer Mouse Body */}
              <rect x="64" y="56" width="232" height="332" rx="116" fill={WHITE} stroke={CHARCOAL} strokeWidth={6} />
              {/* Highlighted Left Mouse Button (#FBBF24) */}
              <path
                d="M68 176 C68 100, 114 60, 180 60 L180 194 L68 194 Z"
                fill={SUNNY}
                stroke={CHARCOAL}
                strokeWidth={5}
              />
              {/* Neutral Right Button */}
              <path
                d="M292 176 C292 100, 246 60, 180 60 L180 194 L292 194 Z"
                fill="#F1F5F9"
                stroke={CHARCOAL}
                strokeWidth={5}
              />
              {/* Scroll Wheel */}
              <rect x="163" y="96" width="34" height="68" rx="17" fill={CHARCOAL} />
              <line x1="180" y1="112" x2="180" y2="146" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />

              {/* Label KIRI */}
              <text x="122" y="148" textAnchor="middle" fontFamily='"Fredoka", sans-serif' fontSize="28" fontWeight="700" fill={CHARCOAL}>
                KIRI
              </text>

              {/* Soft Index Finger Pressing Left Button */}
              <g transform="translate(88, 12)">
                <rect x="14" y="0" width="44" height="100" rx="22" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={4.5} />
                <rect x="22" y="68" width="28" height="22" rx="10" fill={WHITE} opacity={0.65} />
              </g>

              {/* Animated Glow Pulse Around Left Click Target */}
              <circle
                cx="124"
                cy="110"
                r="42"
                stroke={CORAL}
                strokeWidth={4}
                strokeDasharray="8 6"
                style={{ transformOrigin: '124px 110px', animation: live ? 'cpj2-pulse-ring 1.6s ease-in-out infinite' : undefined }}
              />
            </svg>
          </button>

          {/* Comic Sound Bubble */}
          <div
            style={{
              position: 'absolute',
              left: 56,
              top: 52,
              padding: '12px 24px',
              borderRadius: 20,
              background: CORAL,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              ...row,
              gap: 8,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 34,
              fontWeight: 700,
              transform: 'rotate(-8deg)',
              pointerEvents: 'none',
            }}
          >
            <span>KLIK!</span>
            <JuniorIcon name="star" size={32} />
          </div>

          <div
            style={{
              marginTop: 12,
              ...row,
              gap: 10,
              padding: '12px 26px',
              borderRadius: 99,
              background: SUNNY,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="tap" size={26} />
            <span>Coba klik tombol kuning di atas!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus 3: Klik Kiri dengan Trackpad
// ============================================================================
const Slide05KlikTrackpad: Page = () => {
  const live = useIsActivePage();
  const [tapCount, setTapCount] = useState(1);

  return (
    <JuniorFrame badge="JURUS TANGKAS #3" accentDot={TEAL}>
      <SlideTitle>
        Klik di <Highlight>Trackpad</Highlight> Laptop
      </SlideTitle>

      {/* Left Column: Trackpad Bottom-Left Green Spotlight Illustration */}
      <MacWindowCard left={X0} top={245} width={960} height={685} headerLabel="trackpad-klik-kiri.app" padding={28}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: '#F8FAFC',
            border: `2.5px solid #CBD5E1`,
            ...centerCol,
            position: 'relative',
          }}
        >
          {/* Laptop Palmrest & Keyboard Edge */}
          <div
            style={{
              width: 780,
              height: 455,
              borderRadius: 28,
              background: '#CBD5E1',
              border: `4px solid ${CHARCOAL}`,
              boxShadow: `0 10px 0 ${CHARCOAL}`,
              padding: '24px 36px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Bottom Row Keyboard Keys Hint */}
            <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'center' }}>
              {[76, 76, 76, 260, 76, 76].map((kw, i) => (
                <div
                  key={i}
                  style={{
                    width: kw,
                    height: 44,
                    borderRadius: 10,
                    background: WHITE,
                    border: `2.5px solid ${CHARCOAL}`,
                    boxShadow: `0 4px 0 ${CHARCOAL}`,
                  }}
                />
              ))}
            </div>

            {/* Interactive Trackpad Surface */}
            <button
              type="button"
              className="cpj2-card-btn"
              onClick={() => setTapCount((n) => n + 1)}
              aria-label="Klik area kiri bawah trackpad"
              style={{
                position: 'relative',
                width: 460,
                height: 295,
                borderRadius: 24,
                background: WHITE,
                border: `4px solid ${CHARCOAL}`,
                boxShadow: `inset 0 4px 0 #E2E8F0`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Subtle divider line */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 18,
                  width: 3,
                  height: 76,
                  background: '#CBD5E1',
                  borderRadius: 2,
                }}
              />

              {/* Green Circle Highlight on Bottom-Left */}
              <div
                style={{
                  position: 'absolute',
                  left: 38,
                  bottom: 24,
                  width: 146,
                  height: 112,
                  borderRadius: 22,
                  background: TEAL_SOFT,
                  border: `4px solid ${TEAL}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: '50%',
                    background: TEAL,
                    border: `3px solid ${CHARCOAL}`,
                    ...centerCol,
                    color: WHITE,
                    animation: live ? 'cpj2-pulse-ring 1.6s ease-in-out infinite' : undefined,
                  }}
                >
                  <JuniorIcon name="tap" size={30} />
                </div>
                <span
                  style={{
                    marginTop: 6,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 20,
                    fontWeight: 700,
                    color: CHARCOAL,
                  }}
                >
                  KIRI BAWAH
                </span>
              </div>

              <span
                style={{
                  position: 'absolute',
                  right: 38,
                  top: 28,
                  padding: '8px 16px',
                  borderRadius: 99,
                  background: TEAL,
                  color: WHITE,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                KLIK! ({tapCount}x)
              </span>
            </button>
          </div>

          <div
            style={{
              marginTop: 22,
              ...row,
              gap: 10,
              padding: '10px 24px',
              borderRadius: 99,
              background: TEAL_SOFT,
              border: `2.5px solid ${TEAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
              color: CHARCOAL,
            }}
          >
            <JuniorIcon name="tap" size={24} />
            <span>Coba ketuk lingkaran hijau di kiri bawah trackpad!</span>
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
            boxShadow: `0 6px 0 ${TEAL}`,
          }}
        >
          <JuniorIcon name="tap" size={48} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1.25 }}>
            Ketuk bagian <Highlight color="#D1FAE5">Kiri Bawah</Highlight> trackpad
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
            boxShadow: `0 6px 0 ${SUNNY}`,
          }}
        >
          <JuniorIcon name="sparkle" size={48} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1.25 }}>
            Tekan 1 kali sampai berbunyi <em>&ldquo;Klik!&rdquo;</em>
          </span>
        </div>

        <div style={{ ...row, justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 6 }}>
          <div
            style={{
              padding: '18px 24px',
              borderRadius: 22,
              background: TEAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
              lineHeight: 1.3,
              maxWidth: 320,
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span>Pakai 1 jari telunjuk saja ya!</span>
              <JuniorIcon name="sprout" size={26} />
            </span>
          </div>
          <BikoMascot pose="point-left" width={310} />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Pilih Tombol yang Benar!
// ============================================================================
const Slide06TebakTombol: Page = () => {
  const [choice, setChoice] = useState<'left' | 'right' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" top={130}>
        Tombol Mana untuk <Highlight>Klik Kiri?</Highlight>
      </SlideTitle>

      {/* Two Big Interactive Choice Cards */}
      <div style={{ ...abs(160, 240, 1600, 440), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        {/* Card A: Left Button */}
        <button
          type="button"
          className="cpj2-card-btn"
          onClick={() => setChoice('left')}
          style={{
            borderRadius: 32,
            background: choice === 'left' ? TEAL_SOFT : WHITE,
            border: `4px solid ${choice === 'left' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${choice === 'left' ? TEAL : SUNNY}`,
            padding: '28px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              ...row,
              gap: 10,
              padding: '8px 22px',
              borderRadius: 99,
              background: SUNNY,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            <span>PILIHAN A •</span>
            <JuniorIcon name="tap" size={24} />
            <span>JARI TELUNJUK</span>
          </div>

          <TopMouseVector litSide="left" width={170} fingerColor={SUNNY} />

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 42,
              fontWeight: 700,
              color: CHARCOAL,
            }}
          >
            Tombol Kiri
          </div>
        </button>

        {/* Card B: Right Button */}
        <button
          type="button"
          className="cpj2-card-btn"
          onClick={() => setChoice('right')}
          style={{
            borderRadius: 32,
            background: choice === 'right' ? CORAL_SOFT : WHITE,
            border: `4px solid ${choice === 'right' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${choice === 'right' ? CORAL : LAVENDER}`,
            padding: '28px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              ...row,
              gap: 10,
              padding: '8px 22px',
              borderRadius: 99,
              background: LAVENDER_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            <span>PILIHAN B •</span>
            <JuniorIcon name="hand" size={24} />
            <span>JARI TENGAH</span>
          </div>

          <TopMouseVector litSide="right" width={170} fingerColor={LAVENDER} />

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 42,
              fontWeight: 700,
              color: CHARCOAL,
            }}
          >
            Tombol Kanan
          </div>
        </button>
      </div>

      {/* Bottom Center: Biko Holding ? Sign + Prompt / Feedback Pill */}
      <div style={{ ...abs(260, 695, 1400, 305), ...row, justifyContent: 'center', gap: 36 }}>
        <BikoMascot pose="question" width={250} />

        <div
          style={{
            ...row,
            justifyContent: 'center',
            gap: 12,
            padding: '26px 40px',
            borderRadius: 28,
            background: choice === 'left' ? TEAL_SOFT : choice === 'right' ? CORAL_SOFT : STABILO,
            border: `3.5px solid ${choice === 'left' ? TEAL : choice === 'right' ? CORAL : CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 36,
            fontWeight: 700,
            color: CHARCOAL,
            textAlign: 'center',
            minWidth: 520,
          }}
        >
          {choice === 'left' && (
            <>
              <JuniorIcon name="check" size={34} />
              <span>BENAR SEKALI! Itu Tombol Kiri!</span>
              <JuniorIcon name="star" size={34} />
            </>
          )}
          {choice === 'right' && (
            <>
              <JuniorIcon name="thinking" size={34} />
              <span>Hampir! Coba cek sebelah Kiri ya!</span>
            </>
          )}
          {choice === null && (
            <>
              <JuniorIcon name="point-right" size={34} />
              <span>Tunjuk di layarmu ya!</span>
            </>
          )}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Jagoan Screen Time Sehat #1: Atur Waktu Main (Boleh vs Jangan)
// ============================================================================
const Slide07AturanWaktu: Page = () => (
  <JuniorFrame badge="JAGOAN SCREEN TIME" accentDot={TEAL}>
    <SlideTitle>
      Jaga Waktu di Depan <Highlight>Layar!</Highlight>
    </SlideTitle>

    {/* Left Column: BOLEH */}
    <div
      style={{
        ...abs(X0, 245, 830, 695),
        borderRadius: 32,
        background: TEAL_SOFT,
        border: `4px solid ${TEAL}`,
        boxShadow: `0 10px 0 ${TEAL}`,
        padding: '32px 36px',
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

      {/* Item 1: Main & Belajar Secukupnya */}
      <div
        style={{
          ...row,
          gap: 24,
          padding: '26px 28px',
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
        }}
      >
        <svg width={104} height={104} viewBox="0 0 100 100" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="50" cy="54" r="38" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={4} />
          <path d="M50 54 V30 M50 54 L68 62" stroke={TEAL} strokeWidth={5} strokeLinecap="round" />
          <circle cx="50" cy="54" r="4.5" fill={CHARCOAL} />
          <path d="M40 72 Q50 80 60 72" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" />
          <circle cx="38" cy="46" r="3.5" fill={CHARCOAL} />
          <circle cx="62" cy="46" r="3.5" fill={CHARCOAL} />
        </svg>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <JuniorIcon name="clock" size={34} />
            <span>
              Main &amp; belajar <Highlight color="#D1FAE5">Secukupnya</Highlight>
            </span>
          </span>
        </div>
      </div>

      {/* Item 2: Main di Luar */}
      <div
        style={{
          ...row,
          gap: 24,
          padding: '26px 28px',
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
        }}
      >
        <svg width={104} height={104} viewBox="0 0 100 100" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="76" cy="24" r="14" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
          <rect x="44" y="54" width="14" height="34" rx="4" fill="#B45309" stroke={CHARCOAL} strokeWidth={3} />
          <circle cx="51" cy="44" r="26" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.5} />
          <path d="M12 88 H88" stroke={TEAL} strokeWidth={5} strokeLinecap="round" />
        </svg>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <JuniorIcon name="tree" size={34} />
            <span>
              Jangan lupa <Highlight color="#D1FAE5">Main di Luar</Highlight>
            </span>
          </span>
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
        padding: '32px 36px',
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

      {/* Item 1: Menatap Layar Terlalu Lama */}
      <div
        style={{
          ...row,
          gap: 24,
          padding: '26px 28px',
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
        }}
      >
        <svg width={104} height={104} viewBox="0 0 100 100" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="50" cy="52" r="36" fill="#FEE2E2" stroke={CHARCOAL} strokeWidth={4} />
          {/* Dizzy eyes */}
          <path d="M32 40 L42 50 M42 40 L32 50" stroke={CORAL} strokeWidth={4} strokeLinecap="round" />
          <path d="M58 40 L68 50 M68 40 L58 50" stroke={CORAL} strokeWidth={4} strokeLinecap="round" />
          <path d="M36 70 Q50 60 64 70" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" fill="none" />
        </svg>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <JuniorIcon name="dizzy" size={34} />
            <span>
              Menatap layar <Highlight color="#FEE2E2">Terlalu Lama</Highlight>
            </span>
          </span>
        </div>
      </div>

      {/* Item 2: Main Sampai Larut Malam */}
      <div
        style={{
          ...row,
          gap: 24,
          padding: '26px 28px',
          borderRadius: 24,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
        }}
      >
        <svg width={104} height={104} viewBox="0 0 100 100" fill="none" style={{ flexShrink: 0 }}>
          <rect x="10" y="10" width="80" height="80" rx="22" fill="#1E1E2C" />
          <path
            d="M58 22 C40 24, 30 38, 30 54 C30 70, 44 82, 62 78 C46 72, 42 56, 46 42 C48 32, 54 26, 58 22 Z"
            fill={SUNNY}
          />
          <text x="64" y="42" fontFamily='"Fredoka", sans-serif' fontSize="18" fontWeight="700" fill={WHITE}>
            Zzz
          </text>
        </svg>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <JuniorIcon name="moon" size={34} />
            <span>
              Main laptop sampai <Highlight color="#FEE2E2">Larut Malam</Highlight>
            </span>
          </span>
        </div>
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 08 — Jagoan Screen Time Sehat #2: Sayangi Mata Hebatmu!
// ============================================================================
const Slide08SayangiMata: Page = () => (
  <JuniorFrame badge="JAGOAN SCREEN TIME" accentDot={TEAL}>
    <SlideTitle>
      Sayangi <Highlight>Mata</Highlight> Hebatmu!
    </SlideTitle>

    <MacWindowCard left={X0} top={250} width={1320} height={675} headerLabel="tips-mata-sehat.app" padding={40}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, height: '100%' }}>
        {/* Card 1: Lihat Benda Jauh */}
        <div
          style={{
            borderRadius: 26,
            background: SKY_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${SKY}`,
            padding: '34px 30px',
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
            TIPS #1
          </div>

          {/* Window Looking Out at Green Tree & Fluffy Clouds */}
          <svg width={240} height={190} viewBox="0 0 240 190" fill="none">
            <rect x="28" y="16" width="184" height="148" rx="22" fill="#BAE6FD" stroke={CHARCOAL} strokeWidth={4.5} />
            <circle cx="166" cy="48" r="18" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
            {/* Cloud */}
            <path d="M56 62 H104 C112 62, 114 48, 102 46 C98 34, 78 34, 74 46 C62 44, 52 54, 56 62 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
            {/* Green Hills & Tree */}
            <path d="M30 132 Q95 96 156 128 Q190 112 210 132 V162 H30 Z" fill="#86EFAC" />
            <rect x="122" y="102" width="12" height="36" fill="#92400E" stroke={CHARCOAL} strokeWidth={2.5} />
            <circle cx="128" cy="88" r="26" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
            {/* Window Crossbars */}
            <line x1="120" y1="16" x2="120" y2="164" stroke={WHITE} strokeWidth={5} />
            <line x1="28" y1="90" x2="212" y2="90" stroke={WHITE} strokeWidth={5} />
            <rect x="28" y="16" width="184" height="148" rx="22" stroke={CHARCOAL} strokeWidth={4.5} />
          </svg>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.28 }}>
            Lihat <Highlight color="#DBEAFE">Benda Jauh</Highlight> saat mata lelah
          </div>
        </div>

        {/* Card 2: Gerakkan Badan & Minum Air Putih */}
        <div
          style={{
            borderRadius: 26,
            background: TEAL_SOFT,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${TEAL}`,
            padding: '34px 30px',
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
            TIPS #2
          </div>

          {/* Cute Water Glass + Happy Stretch Arms Illustration */}
          <svg width={240} height={190} viewBox="0 0 240 190" fill="none">
            {/* Stretch character on left */}
            <circle cx="76" cy="56" r="24" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
            <path d="M52 104 L30 72 M100 104 L122 72" stroke={CHARCOAL} strokeWidth={7} strokeLinecap="round" />
            <rect x="54" y="84" width="44" height="58" rx="16" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.5} />
            {/* Sparkling Water Glass on right */}
            <path d="M148 56 H204 L196 146 H156 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            <path d="M153 86 H199 L194 142 H158 Z" fill="#7DD3FC" />
            <circle cx="170" cy="112" r="5" fill={WHITE} />
            <circle cx="184" cy="124" r="3.5" fill={WHITE} />
          </svg>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.28 }}>
            <Highlight color="#D1FAE5">Gerakkan Badan</Highlight> &amp; minum air putih!
          </div>
        </div>
      </div>
    </MacWindowCard>

    {/* Biko Giving Encouraging Thumbs Up on Right */}
    <div style={{ ...abs(1470, 390, 350, 540), ...centerCol }}>
      <BikoMascot pose="thumbs-up" width={330} badgeIcon={<JuniorIcon name="thumbs-up" size={34} />} />
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
        <span>Mata Sehat!</span>
        <JuniorIcon name="thumbs-up" size={26} />
      </div>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Pecahkan Balon Bintang! (3 Blok ScratchJr + Game Demo)
// ============================================================================
const MISSION_BLOCKS: { num: number; color: string; soft: string; title: string; sub: string; icon: JuniorIconName }[] = [
  {
    num: 1,
    color: SKY,
    soft: SKY_SOFT,
    title: 'Arahkan',
    sub: 'Panah ke balon',
    icon: 'target',
  },
  {
    num: 2,
    color: SUNNY,
    soft: SUNNY_SOFT,
    title: 'Klik Kiri',
    sub: 'Tekan 1 kali!',
    icon: 'tap',
  },
  {
    num: 3,
    color: TEAL,
    soft: TEAL_SOFT,
    title: '"DOR!"',
    sub: 'Kumpulkan 10 Bintang!',
    icon: 'star',
  },
];

const INITIAL_BALLOONS = [
  { id: 'b1', color: CORAL, x: 90, y: 26, popped: false },
  { id: 'b2', color: SKY, x: 250, y: 42, popped: true },
  { id: 'b3', color: TEAL, x: 430, y: 22, popped: false },
  { id: 'b4', color: LAVENDER, x: 615, y: 44, popped: false },
  { id: 'b5', color: SUNNY, x: 785, y: 26, popped: false },
];

const Slide09MisiBalon: Page = () => {
  const [balloons, setBalloons] = useState(INITIAL_BALLOONS);
  const score = balloons.filter((b) => b.popped).length;

  const popBalloon = (id: string) => {
    setBalloons((prev) => prev.map((b) => (b.id === id ? { ...b, popped: true } : b)));
  };

  const resetGame = () => {
    setBalloons(INITIAL_BALLOONS.map((b) => ({ ...b, popped: false })));
  };

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={SUNNY}>
      <SlideTitle>
        Misi <Highlight>Pecahkan Balon Bintang!</Highlight>
      </SlideTitle>

      {/* Top Row: 3 ScratchJr-Style Step Blocks */}
      <div style={{ ...abs(X0, 232, W, 215), ...row, justifyContent: 'space-between', gap: 20 }}>
        {MISSION_BLOCKS.map((blk, i) => (
          <Fragment key={blk.num}>
            <div
              style={{
                flex: 1,
                height: 202,
                borderRadius: 28,
                background: blk.soft,
                border: `4px solid ${CHARCOAL}`,
                boxShadow: `0 8px 0 ${blk.color}`,
                padding: '22px 26px',
                ...row,
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 20,
                  background: blk.color,
                  border: `3px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 38,
                  fontWeight: 700,
                  color: blk.num === 2 ? CHARCOAL : WHITE,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                {blk.num}
              </div>

              <div>
                <div style={{ ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.15 }}>
                  <JuniorIcon name={blk.icon} size={34} />
                  <span>{blk.title}</span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: MUTED, marginTop: 6 }}>{blk.sub}</div>
              </div>
            </div>

            {i < 2 && (
              <svg width={44} height={44} viewBox="0 0 44 44" fill="none" style={{ flexShrink: 0 }}>
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

      {/* Bottom Interactive Balloon-Popping Game + Cheering Biko */}
      <MacWindowCard left={X0} top={476} width={1320} height={470} headerLabel="game-balon-bintang.app" padding={24}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: 'linear-gradient(180deg, #E0F2FE 0%, #FFFBEB 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            overflow: 'hidden',
          }}
        >
          {/* Top Score Pill + Reset Button */}
          <div
            style={{
              position: 'absolute',
              right: 22,
              top: 16,
              ...row,
              gap: 14,
              zIndex: 4,
            }}
          >
            <div
              style={{
                padding: '8px 22px',
                borderRadius: 99,
                background: SUNNY,
                border: `2.5px solid ${CHARCOAL}`,
                boxShadow: `0 4px 0 ${CHARCOAL}`,
                ...row,
                gap: 8,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="star" size={26} />
              <span>Bintang: {score} / {balloons.length}</span>
            </div>
            <button
              type="button"
              className="cpj2-card-btn"
              onClick={resetGame}
              style={{
                ...row,
                gap: 8,
                padding: '8px 18px',
                borderRadius: 99,
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

          {/* Clickable Balloons inside Game Screen */}
          {balloons.map((b) => (
            <div key={b.id} style={{ position: 'absolute', left: b.x, top: b.y + 42 }}>
              {b.popped ? (
                <div
                  style={{
                    width: 118,
                    height: 150,
                    ...centerCol,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      ...row,
                      justifyContent: 'center',
                      gap: 6,
                      padding: '8px 14px',
                      borderRadius: 18,
                      background: SUNNY,
                      border: `3px solid ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 28,
                      fontWeight: 700,
                      color: CORAL,
                      transform: 'rotate(-6deg)',
                    }}
                  >
                    <span>DOR!</span>
                    <JuniorIcon name="sparkle" size={24} />
                  </div>
                  <div
                    style={{
                      ...row,
                      justifyContent: 'center',
                      gap: 6,
                      marginTop: 6,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 32,
                      fontWeight: 700,
                      color: TEAL,
                    }}
                  >
                    <span>+1</span>
                    <JuniorIcon name="star" size={28} />
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="cpj2-card-btn"
                  onClick={() => popBalloon(b.id)}
                  aria-label={`Pecahkan balon ${b.id}`}
                  style={{ background: 'transparent', border: 'none', padding: 0 }}
                >
                  <StarBalloonSvg color={b.color} width={116} />
                </button>
              )}
            </div>
          ))}

          <div
            style={{
              position: 'absolute',
              left: 24,
              bottom: 18,
              ...row,
              gap: 8,
              padding: '8px 20px',
              borderRadius: 99,
              background: WHITE,
              border: `2.5px solid ${CHARCOAL}`,
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            <JuniorIcon name="tap" size={22} />
            <span>Ayo klik semua balon warna-warni di atas!</span>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko on Right */}
      <div style={{ ...abs(1455, 480, 365, 470), ...centerCol }}>
        <BikoMascot pose="jump" width={310} />
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
          {score === balloons.length ? (
            <>
              <span>Menang Semua!</span>
              <JuniorIcon name="party" size={24} />
            </>
          ) : (
            <>
              <span>Semangat Klik!</span>
              <JuniorIcon name="star" size={24} />
            </>
          )}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 2
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      {/* Colorful Confetti Circles & Stars */}
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
            animation: live ? `cpj2-confetti ${2.4 + (idx % 3) * 0.4}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={130} size={62}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
          <span>
            Hebat! Kamu <Highlight color={STABILO}>Jagoan Klik!</Highlight>
          </span>
          <JuniorIcon name="party" size={58} />
        </span>
      </SlideTitle>

      {/* Center Celebration Medal Card */}
      <MacWindowCard left={170} top={250} width={1160} height={680} headerLabel="lencana-juara-2.award" padding={42}>
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-between', textAlign: 'center' }}>
          {/* Gold Medal SVG with Star Cursor + Healthy Eye Shield */}
          <svg width={270} height={260} viewBox="0 0 260 250" fill="none">
            {/* Ribbons */}
            <path d="M90 156 L66 238 L104 218 L122 240 L122 156 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            <path d="M170 156 L194 238 L156 218 L138 240 L138 156 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            {/* Scalloped Gold Medal */}
            <circle cx="130" cy="98" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
            <circle cx="130" cy="98" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={3.5} />
            {/* Healthy Eye Shield Inside */}
            <path
              d="M90 68 Q130 52 170 68 V100 C170 124, 150 140, 130 148 C110 140, 90 124, 90 100 Z"
              fill={WHITE}
              stroke={CHARCOAL}
              strokeWidth={3.5}
              strokeLinejoin="round"
            />
            {/* Cursor Arrow + Little Star */}
            <path
              d="M112 80 L146 102 L129 106 L137 122 L130 126 L122 110 L112 119 Z"
              fill={SKY}
              stroke={CHARCOAL}
              strokeWidth={3}
              strokeLinejoin="round"
            />
            <path
              d="M150 76 L154 83 L162 84 L156 89 L157 97 L150 93 L143 97 L144 89 L138 84 L146 83 Z"
              fill={SUNNY}
              stroke={CHARCOAL}
              strokeWidth={2}
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
            <span>Lencana Jagoan Klik &amp; Screen Time</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 32,
              fontWeight: 700,
              lineHeight: 1.38,
              maxWidth: 850,
              color: CHARCOAL,
            }}
          >
            Kamu sudah mahir <Highlight>Klik Kiri</Highlight> dan pintar{' '}
            <Highlight color="#D1FAE5">Menjaga Mata!</Highlight>
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
  `Halo Code Explorer cilik! Hari ini Biko punya misi seru: Misi Pecahkan Balon Bintang!
Kita akan belajar menggerakkan panah ajaib dan menjaga kesehatan mata saat pakai laptop.`,

  `Ada dua misi hari ini:
1. Jago menggerakkan Kursor & menekan Klik Kiri.
2. Menjadi Jagoan Screen Time Sehat supaya mata selalu bersinar cerah!`,

  `Jurus Pertama: Gerakkan Panah Ajaib!
Geser mouse atau trackpad pelan ke kiri, kanan, atas, atau bawah sampai panah putih menunjuk tepat ke balon bintang.`,

  `Jurus Kedua: Ayo tekan Klik Kiri pakai Mouse!
Gunakan jari telunjuk kananmu, lalu tekan tombol bagian KIRI satu kali saja sampai bunyi "Klik!".`,

  `Kalau pakai Trackpad laptop bagaimana, Kak?
Ketuk lembut bagian kiri bawah trackpad menggunakan satu jari telunjuk sampai terdengar bunyi "Klik!".`,

  `Waktunya kuis cepat!
Coba anak-anak tunjuk di gambar layar: mana tombol untuk KLIK KIRI — Pilihan A atau Pilihan B? Klik untuk cek jawabannya!`,

  `Sekarang rahasia Jagoan Screen Time!
BOLEH main & belajar secukupnya dan bermain di luar. JANGAN menatap layar terlalu lama atau main sampai larut malam ya!`,

  `Tips menjaga mata hebat:
1. Kalau mata lelah, lihat pemandangan atau benda jauh seperti pohon hijau di luar jendela.
2. Gerakkan badan peregangan dan minum air putih!`,

  `Waktunya praktik Game Balon Bintang!
Langkah 1: Arahkan panah. Langkah 2: Klik kiri 1 kali. Langkah 3: DOR! Ayo klik balon warna-warni di layar untuk mengumpulkan bintang!`,

  `Selamat untuk semua anak hebat!
Kalian resmi meraih Lencana Jagoan Klik & Screen Time. Sampai jumpa di pertemuan berikutnya bersama Biko!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 2 — Misi Pecahkan Balon Bintang',
  createdAt: '2026-11-13T08:40:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03Kursor,
  Slide04KlikMouse,
  Slide05KlikTrackpad,
  Slide06TebakTombol,
  Slide07AturanWaktu,
  Slide08SayangiMata,
  Slide09MisiBalon,
  Slide10Lencana,
] satisfies Page[];


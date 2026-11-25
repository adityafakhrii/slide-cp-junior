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
  transform: translateY(-3px);
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
// Shared Chrome, Typography, Highlights, Bullet Lists & Containers
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
    <div style={{ position: 'relative', flex: 1, padding, boxSizing: 'border-box', overflow: 'hidden' }}>
      {children}
    </div>
  </div>
);

// ============================================================================
// Official Biko Mascot Component
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
  badgeIcon,
  speechBubble,
  style,
}: {
  pose?: BikoPose;
  width?: number;
  badgeIcon?: ReactNode;
  speechBubble?: string;
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
      {speechBubble && (
        <div
          style={{
            marginBottom: 8,
            padding: '10px 20px',
            borderRadius: 18,
            background: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            boxShadow: CARD_SHADOW,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            color: CHARCOAL,
            textAlign: 'center',
            zIndex: 3,
          }}
        >
          {speechBubble}
        </div>
      )}

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
              width: 72,
              height: 80,
              borderRadius: 18,
              background: SUNNY,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: CARD_SHADOW,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--osd-font-display)',
              fontSize: 48,
              fontWeight: 700,
              color: CHARCOAL,
              transform: 'rotate(10deg)',
              pointerEvents: 'none',
            }}
          >
            ?
          </div>
        )}

        {(pose === 'thumbs-up' || badgeIcon) && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: 4,
              top: '10%',
              width: 62,
              height: 62,
              borderRadius: '50%',
              background: SUNNY,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: CARD_SHADOW,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(8deg)',
              pointerEvents: 'none',
            }}
          >
            {badgeIcon ?? <JuniorIcon name="thumbs-up" size={32} />}
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
// Reusable Flat-Vector Illustrations (Balloons, Cursor, Mouse)
// ============================================================================
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
    <path d="M55 112 Q46 130 57 142 Q63 149 54 154" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
    <path d="M47 110 L63 110 L55 101 Z" fill={color} stroke={CHARCOAL} strokeWidth={3} strokeLinejoin="round" />
    <ellipse cx="55" cy="54" rx="44" ry="50" fill={color} stroke={CHARCOAL} strokeWidth={3.8} />
    <path d="M27 38 C28 24, 38 16, 48 15" stroke={WHITE} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
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
      <path d="M90 8 C90 22, 90 26, 90 34" stroke={CHARCOAL} strokeWidth={5} strokeLinecap="round" />
      <rect x="28" y="34" width="124" height="178" rx="62" fill={WHITE} stroke={CHARCOAL} strokeWidth={4.5} />
      <path
        d="M30 96 C30 58, 56 36, 90 36 L90 106 L30 106 Z"
        fill={litSide === 'left' ? SUNNY : '#F1F5F9'}
        stroke={CHARCOAL}
        strokeWidth={3.5}
      />
      <path
        d="M150 96 C150 58, 124 36, 90 36 L90 106 L150 106 Z"
        fill={litSide === 'right' ? LAVENDER : '#F1F5F9'}
        stroke={CHARCOAL}
        strokeWidth={3.5}
      />
      <rect x="81" y="56" width="18" height="36" rx="9" fill={CHARCOAL} />
      <line x1="90" y1="64" x2="90" y2="82" stroke={WHITE} strokeWidth={3} strokeLinecap="round" />
      <path d="M58 152 Q90 172 122 152" stroke="#CBD5E1" strokeWidth={4.5} strokeLinecap="round" />
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
// SLIDE 01 — Sampul Pertemuan (Heading H1 + Concise Bullet Intro + Arcade Stage)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 2" accentDot={SUNNY}>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 175, 840, 765), display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
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
          Misi Pecahkan{' '}
          <Highlight color={STABILO}>Balon Bintang!</Highlight>
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
          Tangkas Klik Mouse &amp; Jaga Mata Sehat
        </p>

        {/* Clean non-button InfoPanel with BulletList */}
        <InfoPanel bg={WHITE} padding={26} style={{ marginTop: 6 }}>
          <SectionHeading icon="balloon" size={26} accentColor={CHARCOAL}>
            Yang Akan Kita Pelajari:
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={24}
              gap={12}
              items={[
                <>
                  Gerakkan <InlineHighlight color={SKY_SOFT}>Panah Ajaib</InlineHighlight> ke balon.
                </>,
                <>
                  Tekan <InlineHighlight>Klik Kiri</InlineHighlight> pelan 1 kali.
                </>,
                <>
                  Jaga <InlineHighlight color="#D1FAE5">waktu dan mata</InlineHighlight> tetap sehat.
                </>,
              ]}
            />
          </div>
        </InfoPanel>
      </div>

      {/* Right Visual Showcase: Sky Arcade Stage Card + Star Balloons & Biko */}
      <div style={{ ...abs(1020, 175, 790, 765), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 650,
            height: 615,
            borderRadius: 42,
            background: 'linear-gradient(180deg, #E0F2FE 0%, #ECFDF5 100%)',
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: CARD_SHADOW,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: 52,
              background: SUNNY,
              borderBottom: `3px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'center',
              gap: 10,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
              color: CHARCOAL,
            }}
          >
            <JuniorIcon name="star" size={24} />
            <span>GAME BALON BINTANG</span>
          </div>
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

        {/* Flat Mouse Card Next to Biko */}
        <div
          style={{
            position: 'absolute',
            left: 62,
            bottom: 120,
            zIndex: 4,
            padding: '12px 16px',
            borderRadius: 22,
            background: WHITE,
            border: `2.5px solid ${CHARCOAL}`,
            boxShadow: CARD_SHADOW,
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

    <MacWindowCard left={X0} top={215} width={1320} height={745} headerLabel="daftar-misi-2" padding={34}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, height: '100%' }}>
        {/* Kartu 1: Biru */}
        <InfoPanel
          bg={SKY_SOFT}
          padding={26}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em' }}>
              MISI 1
            </span>
            <SectionHeading icon="mouse" size={32}>
              Jago <Highlight color="#DBEAFE">Klik Kiri</Highlight>
            </SectionHeading>
          </div>

          <div style={{ ...centerCol }}>
            <div style={{ position: 'relative', width: 220, height: 185, ...centerCol }}>
              <StarBalloonSvg color={CORAL} width={104} style={{ marginLeft: 36 }} />
              <div style={{ position: 'absolute', left: 32, bottom: 26 }}>
                <CursorArrowSvg size={64} fill={SUNNY} />
              </div>
            </div>
          </div>

          <BulletList
            bulletColor={SKY}
            fontSize={23}
            gap={10}
            items={[
              <>
                Gerakkan <InlineHighlight color={WHITE}>panah ajaib</InlineHighlight>.
              </>,
              <>
                Tekan <InlineHighlight color={WHITE}>klik kiri</InlineHighlight> 1 kali.
              </>,
            ]}
          />
        </InfoPanel>

        {/* Kartu 2: Hijau */}
        <InfoPanel
          bg={TEAL_SOFT}
          padding={26}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#047857', letterSpacing: '0.05em' }}>
              MISI 2
            </span>
            <SectionHeading icon="eyes" size={32}>
              Jaga <Highlight color="#D1FAE5">Mata Sehat</Highlight>
            </SectionHeading>
          </div>

          <div style={{ ...centerCol }}>
            <svg width={220} height={175} viewBox="0 0 220 175" fill="none">
              <circle cx="78" cy="96" r="52" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
              <circle cx="78" cy="96" r="40" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={2.5} />
              <path d="M40 50 L54 62 M116 50 L102 62" stroke={CHARCOAL} strokeWidth={6} strokeLinecap="round" />
              <path d="M78 96 V70 M78 96 L98 106" stroke={CORAL} strokeWidth={5} strokeLinecap="round" />
              <circle cx="78" cy="96" r="5" fill={CHARCOAL} />
              <ellipse cx="164" cy="94" rx="46" ry="30" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
              <circle cx="164" cy="94" r="17" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
              <circle cx="164" cy="94" r="8" fill={CHARCOAL} />
              <circle cx="170" cy="88" r="4" fill={WHITE} />
              <path d="M196 48 L200 58 L210 62 L200 66 L196 76 L192 66 L182 62 L192 58 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
            </svg>
          </div>

          <BulletList
            bulletColor={TEAL}
            fontSize={23}
            gap={10}
            items={[
              <>
                Atur <InlineHighlight color="#D1FAE5">waktu layar</InlineHighlight> cukup.
              </>,
              <>
                Istirahatkan <InlineHighlight color={WHITE}>mata yang lelah</InlineHighlight>.
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="point-left"
      width={360}
      speechBubble="Siap Beraksi!"
      style={{ ...abs(1455, 325) }}
    />
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

      {/* Left Column: Spotlight Illustration Inside MacWindowCard */}
      <MacWindowCard left={X0} top={225} width={960} height={725} headerLabel="gerakkan-panah-ajaib" padding={28}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 22,
            background: 'linear-gradient(180deg, #E0F2FE 0%, #F0FDF4 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            overflow: 'hidden',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 890 560" fill="none" style={{ position: 'absolute', inset: 0 }}>
            <path
              d="M170 430 C230 280, 340 220, 480 185"
              stroke={SKY}
              strokeWidth={7}
              strokeDasharray="16 14"
              strokeLinecap="round"
            />
            <g transform="translate(86, 86)">
              <circle cx="56" cy="56" r="48" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} opacity={0.9} />
              <path d="M56 22 V90 M22 56 H90" stroke={TEAL} strokeWidth={5} strokeLinecap="round" />
              <path d="M46 32 L56 20 L66 32 M46 80 L56 92 L66 80 M32 46 L20 56 L32 66 M80 46 L92 56 L80 66" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
            </g>

            <g transform="translate(86, 368)">
              <rect x="0" y="34" width="142" height="122" rx="44" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
              <path d="M71 34 V90 M10 90 H132" stroke={CHARCOAL} strokeWidth={3} />
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

          {BALLOON_TARGETS.map((item, idx) => {
            const active = idx === targetIdx;
            return (
              <button
                key={item.id}
                type="button"
                className="cpj2-card-btn"
                onClick={() => setTargetIdx(idx)}
                aria-label={`Arahkan panah ke ${item.label}`}
                style={{
                  position: 'absolute',
                  left: item.x,
                  top: item.y,
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  transform: active ? 'scale(1.12)' : 'scale(0.95)',
                  opacity: active ? 1 : 0.82,
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
                      color: CHARCOAL,
                    }}
                  >
                    <JuniorIcon name="target" size={18} />
                    <span>Target!</span>
                  </div>
                )}
              </button>
            );
          })}

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
              borderRadius: 16,
              background: WHITE,
              border: `2.5px solid ${CHARCOAL}`,
              fontSize: 20,
              fontWeight: 800,
              color: CHARCOAL,
            }}
          >
            <JuniorIcon name="tap" size={24} />
            <span>Klik balon lain untuk geser Panah!</span>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: InfoPanel with BulletList + Biko */}
      <div style={{ ...abs(1105, 225, 715, 725), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <InfoPanel bg={WHITE} padding={30}>
          <SectionHeading icon="mouse" size={32}>
            Cara Gerakkan Panah
          </SectionHeading>
          <div style={{ marginTop: 18 }}>
            <BulletList
              bulletColor={SKY}
              fontSize={26}
              gap={16}
              items={[
                <>
                  Geser <InlineHighlight color="#DBEAFE">Mouse</InlineHighlight> atau <InlineHighlight color="#D1FAE5">Trackpad</InlineHighlight>.
                </>,
                <>
                  Arahkan tepat ke <InlineHighlight>Balon Bintang</InlineHighlight>.
                </>,
                <>Bisa ke kiri, kanan, atas, bawah.</>,
              ]}
            />
          </div>
        </InfoPanel>

        <div style={{ ...centerCol }}>
          <BikoMascot pose="point-left" width={310} speechBubble="Geser pelan ya!" />
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

      {/* Left Column: InfoPanel with BulletList + Biko & Counter */}
      <div style={{ ...abs(X0, 225, 720, 725), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <InfoPanel bg={WHITE} padding={28}>
          <SectionHeading icon="tap" size={32}>
            Cara Klik Kiri
          </SectionHeading>
          <div style={{ marginTop: 16 }}>
            <BulletList
              bulletColor={SUNNY}
              fontSize={26}
              gap={14}
              items={[
                <>
                  Pakai <InlineHighlight>Jari Telunjuk</InlineHighlight>.
                </>,
                <>
                  Tekan tombol <InlineHighlight color="#DBEAFE">Kiri</InlineHighlight> 1 kali.
                </>,
                <>Bunyinya pelan: &ldquo;Klik!&rdquo;</>,
              ]}
            />
          </div>
        </InfoPanel>

        <div style={{ ...row, gap: 18, alignItems: 'center' }}>
          <BikoMascot pose="thumbs-up" width={265} badgeIcon={<JuniorIcon name="tap" size={30} />} />
          <InfoPanel bg={SUNNY_SOFT} padding={24} style={{ flex: 1, textAlign: 'center' }}>
            <SectionHeading icon="sparkle" size={24} accentColor={MUTED}>
              Suara Klik:
            </SectionHeading>
            <div
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontSize: 58,
                fontWeight: 700,
                color: CORAL,
                margin: '6px 0',
              }}
            >
              KLIK!
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: CHARCOAL }}>
              Sudah dicoba: <span style={{ color: TEAL }}>{clicks}x</span>
            </div>
          </InfoPanel>
        </div>
      </div>

      {/* Right Column: Large Interactive Mouse Close-Up Inside MacWindowCard */}
      <MacWindowCard left={865} top={225} width={955} height={725} headerLabel="tombol-klik-kiri" padding={28}>
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
            <svg width={360} height={420} viewBox="0 0 360 420" fill="none">
              <path d="M180 6 C180 34, 180 42, 180 58" stroke={CHARCOAL} strokeWidth={8} strokeLinecap="round" />
              <rect x="64" y="56" width="232" height="332" rx="116" fill={WHITE} stroke={CHARCOAL} strokeWidth={6} />
              <path
                d="M68 176 C68 100, 114 60, 180 60 L180 194 L68 194 Z"
                fill={SUNNY}
                stroke={CHARCOAL}
                strokeWidth={5}
              />
              <path
                d="M292 176 C292 100, 246 60, 180 60 L180 194 L292 194 Z"
                fill="#F1F5F9"
                stroke={CHARCOAL}
                strokeWidth={5}
              />
              <rect x="163" y="96" width="34" height="68" rx="17" fill={CHARCOAL} />
              <line x1="180" y1="112" x2="180" y2="146" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
              <text x="122" y="148" textAnchor="middle" fontFamily='"Fredoka", sans-serif' fontSize="28" fontWeight="700" fill={CHARCOAL}>
                KIRI
              </text>
              <g transform="translate(88, 12)">
                <rect x="14" y="0" width="44" height="100" rx="22" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={4.5} />
                <rect x="22" y="68" width="28" height="22" rx="10" fill={WHITE} opacity={0.65} />
              </g>
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

          {/* Flat Comic Label */}
          <div
            style={{
              position: 'absolute',
              left: 56,
              top: 52,
              padding: '10px 22px',
              borderRadius: 18,
              background: CORAL,
              color: WHITE,
              border: `2.5px solid ${CHARCOAL}`,
              boxShadow: CARD_SHADOW,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 32,
              fontWeight: 700,
              transform: 'rotate(-8deg)',
              pointerEvents: 'none',
            }}
          >
            KLIK!
          </div>

          <div
            style={{
              marginTop: 12,
              ...row,
              gap: 10,
              padding: '10px 24px',
              borderRadius: 16,
              background: SUNNY_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 23,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="tap" size={24} />
            <span>Klik tombol kuning di atas!</span>
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
      <MacWindowCard left={X0} top={225} width={960} height={725} headerLabel="trackpad-klik-kiri" padding={28}>
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
          {/* Laptop Palmrest & Keyboard Edge (flat border, no push-button shadow) */}
          <div
            style={{
              width: 780,
              height: 455,
              borderRadius: 28,
              background: '#CBD5E1',
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: CARD_SHADOW,
              padding: '24px 36px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'center' }}>
              {[76, 76, 76, 260, 76, 76].map((kw, i) => (
                <div
                  key={i}
                  style={{
                    width: kw,
                    height: 42,
                    borderRadius: 10,
                    background: WHITE,
                    border: `2px solid ${CHARCOAL}`,
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
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
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

              <div
                style={{
                  position: 'absolute',
                  left: 38,
                  bottom: 24,
                  width: 146,
                  height: 112,
                  borderRadius: 22,
                  background: TEAL_SOFT,
                  border: `3.5px solid ${TEAL}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: TEAL,
                    border: `3px solid ${CHARCOAL}`,
                    ...centerCol,
                    color: WHITE,
                    animation: live ? 'cpj2-pulse-ring 1.6s ease-in-out infinite' : undefined,
                  }}
                >
                  <JuniorIcon name="tap" size={28} />
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
                  borderRadius: 14,
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
              padding: '10px 22px',
              borderRadius: 16,
              background: TEAL_SOFT,
              border: `2.5px solid ${TEAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 22,
              fontWeight: 700,
              color: CHARCOAL,
            }}
          >
            <JuniorIcon name="tap" size={24} />
            <span>Ketuk kiri bawah trackpad!</span>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: InfoPanel with BulletList + Biko */}
      <div style={{ ...abs(1105, 225, 715, 725), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <InfoPanel bg={WHITE} padding={30}>
          <SectionHeading icon="tap" size={32}>
            Cara Klik Trackpad
          </SectionHeading>
          <div style={{ marginTop: 18 }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={26}
              gap={16}
              items={[
                <>
                  Ketuk bagian <InlineHighlight color="#D1FAE5">Kiri Bawah</InlineHighlight> trackpad.
                </>,
                <>
                  Pakai <InlineHighlight>1 jari telunjuk</InlineHighlight> saja.
                </>,
                <>Tekan 1 kali bunyi &ldquo;Klik!&rdquo;</>,
              ]}
            />
          </div>
        </InfoPanel>

        <div style={{ ...centerCol }}>
          <BikoMascot pose="point-left" width={310} speechBubble="Pelan saja ya!" />
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
      <SlideTitle align="center" top={104}>
        Tombol Mana untuk <Highlight>Klik Kiri?</Highlight>
      </SlideTitle>

      {/* Two Big Interactive Choice Cards */}
      <div style={{ ...abs(160, 210, 1600, 445), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        {/* Card A: Left Button */}
        <button
          type="button"
          className="cpj2-card-btn"
          onClick={() => setChoice('left')}
          style={{
            borderRadius: 30,
            background: choice === 'left' ? TEAL_SOFT : WHITE,
            border: `4px solid ${choice === 'left' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${choice === 'left' ? TEAL : SUNNY}`,
            padding: '26px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#92400E',
              letterSpacing: '0.05em',
            }}
          >
            PILIHAN A • JARI TELUNJUK
          </span>

          <TopMouseVector litSide="left" width={165} fingerColor={SUNNY} />

          <SectionHeading icon="tap" size={38}>
            Tombol Kiri
          </SectionHeading>
        </button>

        {/* Card B: Right Button */}
        <button
          type="button"
          className="cpj2-card-btn"
          onClick={() => setChoice('right')}
          style={{
            borderRadius: 30,
            background: choice === 'right' ? CORAL_SOFT : WHITE,
            border: `4px solid ${choice === 'right' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${choice === 'right' ? CORAL : LAVENDER}`,
            padding: '26px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#6D28D9',
              letterSpacing: '0.05em',
            }}
          >
            PILIHAN B • JARI TENGAH
          </span>

          <TopMouseVector litSide="right" width={165} fingerColor={LAVENDER} />

          <SectionHeading icon="hand" size={38}>
            Tombol Kanan
          </SectionHeading>
        </button>
      </div>

      {/* Bottom Center: Biko Holding ? Sign + Flat Feedback InfoPanel */}
      <div style={{ ...abs(240, 680, 1440, 315), ...row, justifyContent: 'center', gap: 36 }}>
        <BikoMascot pose={choice === 'left' ? 'thumbs-up' : 'question'} width={240} />

        <InfoPanel
          bg={choice === 'left' ? TEAL_SOFT : choice === 'right' ? CORAL_SOFT : STABILO}
          borderColor={choice === 'left' ? TEAL : choice === 'right' ? CORAL : CHARCOAL}
          padding={26}
          style={{ minWidth: 580, ...row, justifyContent: 'center', gap: 14 }}
        >
          {choice === 'left' && (
            <>
              <JuniorIcon name="check" size={34} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700 }}>
                BENAR! Itu Tombol Kiri!
              </span>
            </>
          )}
          {choice === 'right' && (
            <>
              <JuniorIcon name="thinking" size={34} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700 }}>
                Hampir! Cek sebelah Kiri ya!
              </span>
            </>
          )}
          {choice === null && (
            <>
              <JuniorIcon name="point-right" size={34} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700 }}>
                Klik Pilihan A atau B!
              </span>
            </>
          )}
        </InfoPanel>
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

    <div
      style={{
        ...abs(X0, 225, W, 725),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 38,
      }}
    >
      {/* Left Column: BOLEH */}
      <InfoPanel
        bg={TEAL_SOFT}
        borderColor={TEAL}
        padding={32}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}
      >
        <div style={{ borderBottom: `2.5px solid #A7F3D0`, paddingBottom: 14 }}>
          <SectionHeading icon="check" size={38} accentColor="#065F46">
            BOLEH Dilakukan
          </SectionHeading>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          <div
            style={{
              background: WHITE,
              borderRadius: 22,
              border: `2.5px solid ${CHARCOAL}`,
              padding: 20,
              ...centerCol,
              gap: 12,
              textAlign: 'center',
            }}
          >
            <svg width={120} height={120} viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="54" r="38" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={4} />
              <path d="M50 54 V30 M50 54 L68 62" stroke={TEAL} strokeWidth={5} strokeLinecap="round" />
              <circle cx="50" cy="54" r="4.5" fill={CHARCOAL} />
              <path d="M40 72 Q50 80 60 72" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" />
              <circle cx="38" cy="46" r="3.5" fill={CHARCOAL} />
              <circle cx="62" cy="46" r="3.5" fill={CHARCOAL} />
            </svg>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
              Main Secukupnya
            </span>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 22,
              border: `2.5px solid ${CHARCOAL}`,
              padding: 20,
              ...centerCol,
              gap: 12,
              textAlign: 'center',
            }}
          >
            <svg width={120} height={120} viewBox="0 0 100 100" fill="none">
              <circle cx="76" cy="24" r="14" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
              <rect x="44" y="54" width="14" height="34" rx="4" fill="#B45309" stroke={CHARCOAL} strokeWidth={3} />
              <circle cx="51" cy="44" r="26" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M12 88 H88" stroke={TEAL} strokeWidth={5} strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
              Main di Luar
            </span>
          </div>
        </div>

        <InfoPanel bg={WHITE} borderColor={TEAL} padding={24}>
          <BulletList
            bulletColor={TEAL}
            fontSize={26}
            gap={14}
            items={[
              <>
                Main dan belajar <InlineHighlight color="#D1FAE5">secukupnya</InlineHighlight>.
              </>,
              <>
                Jangan lupa <InlineHighlight color="#D1FAE5">main di luar</InlineHighlight>.
              </>,
            ]}
          />
        </InfoPanel>
      </InfoPanel>

      {/* Right Column: JANGAN */}
      <InfoPanel
        bg={CORAL_SOFT}
        borderColor={CORAL}
        padding={32}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}
      >
        <div style={{ borderBottom: `2.5px solid #FECACA`, paddingBottom: 14 }}>
          <SectionHeading icon="cross" size={38} accentColor="#991B1B">
            JANGAN Dilakukan
          </SectionHeading>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          <div
            style={{
              background: WHITE,
              borderRadius: 22,
              border: `2.5px solid ${CHARCOAL}`,
              padding: 20,
              ...centerCol,
              gap: 12,
              textAlign: 'center',
            }}
          >
            <svg width={120} height={120} viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="52" r="36" fill="#FEE2E2" stroke={CHARCOAL} strokeWidth={4} />
              <path d="M32 40 L42 50 M42 40 L32 50" stroke={CORAL} strokeWidth={4} strokeLinecap="round" />
              <path d="M58 40 L68 50 M68 40 L58 50" stroke={CORAL} strokeWidth={4} strokeLinecap="round" />
              <path d="M36 70 Q50 60 64 70" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" fill="none" />
            </svg>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
              Terlalu Lama
            </span>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 22,
              border: `2.5px solid ${CHARCOAL}`,
              padding: 20,
              ...centerCol,
              gap: 12,
              textAlign: 'center',
            }}
          >
            <svg width={120} height={120} viewBox="0 0 100 100" fill="none">
              <rect x="10" y="10" width="80" height="80" rx="22" fill={CHARCOAL} />
              <path
                d="M58 22 C40 24, 30 38, 30 54 C30 70, 44 82, 62 78 C46 72, 42 56, 46 42 C48 32, 54 26, 58 22 Z"
                fill={SUNNY}
              />
              <text x="64" y="42" fontFamily='"Fredoka", sans-serif' fontSize="18" fontWeight="700" fill={WHITE}>
                Zzz
              </text>
            </svg>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
              Larut Malam
            </span>
          </div>
        </div>

        <InfoPanel bg={WHITE} borderColor={CORAL} padding={24}>
          <BulletList
            bulletColor={CORAL}
            fontSize={26}
            gap={14}
            items={[
              <>
                Tatap layar <InlineHighlight color="#FECACA">terlalu lama</InlineHighlight>.
              </>,
              <>
                Main sampai <InlineHighlight color="#FECACA">larut malam</InlineHighlight>.
              </>,
            ]}
          />
        </InfoPanel>
      </InfoPanel>
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

    <MacWindowCard left={X0} top={225} width={1320} height={725} headerLabel="tips-mata-sehat" padding={34}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, height: '100%' }}>
        {/* Card 1: Lihat Benda Jauh */}
        <InfoPanel
          bg={SKY_SOFT}
          padding={26}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em' }}>
              TIPS #1
            </span>
            <SectionHeading icon="eyes" size={32}>
              Lihat <Highlight color="#DBEAFE">Benda Jauh</Highlight>
            </SectionHeading>
          </div>

          <div style={{ ...centerCol }}>
            <svg width={240} height={190} viewBox="0 0 240 190" fill="none">
              <rect x="28" y="16" width="184" height="148" rx="22" fill="#BAE6FD" stroke={CHARCOAL} strokeWidth={4.5} />
              <circle cx="166" cy="48" r="18" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
              <path d="M56 62 H104 C112 62, 114 48, 102 46 C98 34, 78 34, 74 46 C62 44, 52 54, 56 62 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
              <path d="M30 132 Q95 96 156 128 Q190 112 210 132 V162 H30 Z" fill="#86EFAC" />
              <rect x="122" y="102" width="12" height="36" fill="#92400E" stroke={CHARCOAL} strokeWidth={2.5} />
              <circle cx="128" cy="88" r="26" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
              <line x1="120" y1="16" x2="120" y2="164" stroke={WHITE} strokeWidth={5} />
              <line x1="28" y1="90" x2="212" y2="90" stroke={WHITE} strokeWidth={5} />
              <rect x="28" y="16" width="184" height="148" rx="22" stroke={CHARCOAL} strokeWidth={4.5} />
            </svg>
          </div>

          <BulletList
            bulletColor={SKY}
            fontSize={23}
            gap={10}
            items={[
              <>Istirahat saat mata lelah.</>,
              <>
                Lihat <InlineHighlight color="#DBEAFE">pohon hijau</InlineHighlight> jauh.
              </>,
            ]}
          />
        </InfoPanel>

        {/* Card 2: Gerakkan Badan & Minum Air Putih */}
        <InfoPanel
          bg={TEAL_SOFT}
          padding={26}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#047857', letterSpacing: '0.05em' }}>
              TIPS #2
            </span>
            <SectionHeading icon="water" size={32}>
              Gerak &amp; <Highlight color="#D1FAE5">Minum Air</Highlight>
            </SectionHeading>
          </div>

          <div style={{ ...centerCol }}>
            <svg width={240} height={190} viewBox="0 0 240 190" fill="none">
              <circle cx="76" cy="56" r="24" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M52 104 L30 72 M100 104 L122 72" stroke={CHARCOAL} strokeWidth={7} strokeLinecap="round" />
              <rect x="54" y="84" width="44" height="58" rx="16" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M148 56 H204 L196 146 H156 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M153 86 H199 L194 142 H158 Z" fill="#7DD3FC" />
              <circle cx="170" cy="112" r="5" fill={WHITE} />
              <circle cx="184" cy="124" r="3.5" fill={WHITE} />
            </svg>
          </div>

          <BulletList
            bulletColor={TEAL}
            fontSize={23}
            gap={10}
            items={[
              <>Regangkan tangan dan badan.</>,
              <>
                Minum <InlineHighlight color="#D1FAE5">air putih</InlineHighlight> segar.
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="thumbs-up"
      width={330}
      speechBubble="Mata Sehat!"
      style={{ ...abs(1470, 360) }}
    />
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Pecahkan Balon Bintang!
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
    sub: 'Tekan 1 kali',
    icon: 'tap',
  },
  {
    num: 3,
    color: TEAL,
    soft: TEAL_SOFT,
    title: 'DOR!',
    sub: 'Dapat Bintang',
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
      <SlideTitle top={104}>
        Misi <Highlight>Pecahkan Balon Bintang!</Highlight>
      </SlideTitle>

      {/* Top Row: 3 Flat InfoPanel Step Blocks */}
      <div style={{ ...abs(X0, 208, W, 200), ...row, justifyContent: 'space-between', gap: 18 }}>
        {MISSION_BLOCKS.map((blk, i) => (
          <Fragment key={blk.num}>
            <InfoPanel
              bg={blk.soft}
              padding={22}
              style={{ flex: 1, height: 186, ...row, gap: 20 }}
            >
              <div
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 18,
                  background: blk.color,
                  border: `3px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 36,
                  fontWeight: 700,
                  color: blk.num === 2 ? CHARCOAL : WHITE,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                {blk.num}
              </div>

              <div>
                <SectionHeading icon={blk.icon} size={32}>
                  {blk.title}
                </SectionHeading>
                <div style={{ fontSize: 24, fontWeight: 800, color: MUTED, marginTop: 6 }}>{blk.sub}</div>
              </div>
            </InfoPanel>

            {i < 2 && <JuniorIcon name="arrow-right" size={32} />}
          </Fragment>
        ))}
      </div>

      {/* Bottom Interactive Balloon-Popping Game + Cheering Biko */}
      <MacWindowCard left={X0} top={438} width={1320} height={512} headerLabel="game-balon-bintang" padding={24}>
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
          {/* Top Score Pill (flat) + Reset Button */}
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
                padding: '8px 20px',
                borderRadius: 14,
                background: SUNNY_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                ...row,
                gap: 8,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 25,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="star" size={24} />
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

          {/* Clickable Balloons inside Game Screen */}
          {balloons.map((b) => (
            <div key={b.id} style={{ position: 'absolute', left: b.x, top: b.y + 58 }}>
              {b.popped ? (
                <div
                  style={{
                    width: 118,
                    height: 150,
                    ...centerCol,
                    textAlign: 'center',
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      padding: '8px 14px',
                      borderRadius: 16,
                      background: SUNNY,
                      border: `2.5px solid ${CHARCOAL}`,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 28,
                      fontWeight: 700,
                      color: CORAL,
                      transform: 'rotate(-6deg)',
                    }}
                  >
                    DOR!
                  </div>
                  <div
                    style={{
                      ...row,
                      justifyContent: 'center',
                      gap: 6,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 30,
                      fontWeight: 700,
                      color: TEAL,
                    }}
                  >
                    <span>+1</span>
                    <JuniorIcon name="star" size={26} />
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
              borderRadius: 16,
              background: WHITE,
              border: `2.5px solid ${CHARCOAL}`,
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            <JuniorIcon name="tap" size={22} />
            <span>Klik semua balon warna-warni!</span>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko on Right */}
      <div style={{ ...abs(1455, 450, 365, 490), ...centerCol }}>
        <BikoMascot
          pose="jump"
          width={310}
          speechBubble={score === balloons.length ? 'Menang Semua!' : 'Semangat Klik!'}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 2 (Summary Bullets + Medal + Biko)
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
            animation: live ? `cpj2-confetti ${2.4 + (idx % 3) * 0.4}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={104} size={58}>
        Hebat! Kamu <Highlight color={STABILO}>Jagoan Klik!</Highlight>
      </SlideTitle>

      {/* Center Celebration Medal Card */}
      <MacWindowCard left={180} top={210} width={1180} height={745} titleBarColor={SUNNY_SOFT} headerLabel="lencana-pertemuan-2" padding={34}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '430px 1fr', gap: 36, alignItems: 'center' }}>
          {/* Left: Gold Medal + Flat Banner */}
          <div style={{ ...centerCol, gap: 22 }}>
            <svg
              width={255}
              height={255}
              viewBox="0 0 260 250"
              fill="none"
              style={{ animation: live ? 'cpj2-float 2.8s ease-in-out infinite' : undefined }}
            >
              <path d="M90 156 L66 238 L104 218 L122 240 L122 156 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M170 156 L194 238 L156 218 L138 240 L138 156 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="130" cy="98" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="130" cy="98" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={3.5} />
              <path
                d="M90 68 Q130 52 170 68 V100 C170 124, 150 140, 130 148 C110 140, 90 124, 90 100 Z"
                fill={WHITE}
                stroke={CHARCOAL}
                strokeWidth={3.5}
                strokeLinejoin="round"
              />
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
                padding: '12px 24px',
                borderRadius: 16,
                background: TEAL_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 25,
                fontWeight: 700,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="medal" size={28} />
              <span>Lencana Jagoan Klik</span>
            </div>
          </div>

          {/* Right: Concise Bullet Takeaways */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHeading icon="party" size={32}>
              Yang Sudah Kamu Kuasai:
            </SectionHeading>

            <BulletList
              bulletColor={TEAL}
              fontSize={26}
              gap={18}
              items={[
                <>
                  Gerakkan <InlineHighlight color={SKY_SOFT}>Panah Ajaib</InlineHighlight> tepat.
                </>,
                <>
                  Tekan <InlineHighlight>Klik Kiri</InlineHighlight> pakai jari telunjuk.
                </>,
                <>
                  Ketuk <InlineHighlight color="#D1FAE5">kiri bawah</InlineHighlight> trackpad.
                </>,
                <>
                  Jaga <InlineHighlight color={SUNNY_SOFT}>waktu dan mata</InlineHighlight> sehat.
                </>,
              ]}
            />
          </div>
        </div>
      </MacWindowCard>

      {/* Celebrating Jumping Biko on Right */}
      <div style={{ ...abs(1400, 385, 420, 520), ...centerCol }}>
        <BikoMascot pose="jump" width={365} speechBubble="Jagoan Klik!" />
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

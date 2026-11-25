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
  transform: translateY(-3px);
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
const CARD_SHADOW = '0 6px 18px rgba(30, 30, 44, 0.08)';
const TEAL = '#10B981';
const TEAL_DARK = '#0D9488';
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
const OTTER_GOLD = '#FBBF24';

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
    {/* Window Header */}
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
    {/* Body */}
    <div style={{ position: 'relative', flex: 1, padding, boxSizing: 'border-box', overflow: 'hidden' }}>
      {children}
    </div>
  </div>
);

// ============================================================================
// BIKO — Official Otter Mascot Component
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
  speechBubble,
  style,
}: {
  pose?: BikoPose;
  width?: number;
  speechBubble?: string;
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

        {pose === 'press-key' && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: -6,
              top: '39%',
              width: 50,
              height: 50,
              borderRadius: 14,
              background: SUNNY,
              border: `2.5px solid ${CHARCOAL}`,
              boxShadow: CARD_SHADOW,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
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

        {pose === 'thumbs-up' && (
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
            <JuniorIcon name="thumbs-up" size={32} />
          </div>
        )}
      </div>

      {/* Soft Ground Contact Shadow */}
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
// SLIDE 01 — Sampul Pertemuan (Heading H1 + Concise Bullet Intro + Biko)
// ============================================================================
const Slide01Cover: Page = () => {
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 1" accentDot={SUNNY}>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 175, 840, 765), display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
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
            fontSize: 86,
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

        <p
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.35,
            color: MUTED,
          }}
        >
          Mengenal Bagian Laptop &amp; Cara Merawatnya
        </p>

        {/* Clean non-button InfoPanel with BulletList */}
        <InfoPanel bg={WHITE} padding={26} style={{ marginTop: 6 }}>
          <SectionHeading icon="laptop" size={26} accentColor={CHARCOAL}>
            Yang Akan Kita Pelajari:
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={24}
              gap={12}
              items={[
                <>
                  Kenali <InlineHighlight color={SKY_SOFT}>Layar, Keyboard, Trackpad</InlineHighlight>.
                </>,
                <>
                  Hafal <InlineHighlight color="#D1FAE5">Aturan Emas</InlineHighlight> merawat laptop.
                </>,
                <>
                  Gerakkan <InlineHighlight>Panah Ajaib</InlineHighlight> ke tombol.
                </>,
              ]}
            />
          </div>
        </InfoPanel>
      </div>

      {/* Right Column: Large Cheerful Biko Holding Coding Laptop */}
      <InfoPanel
        bg={WHITE}
        padding={32}
        style={{
          ...abs(1040, 175, 780, 765),
          ...centerCol,
          borderRadius: 36,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: 999,
            background: STABILO,
            opacity: 0.45,
          }}
        />

        <BikoMascot
          pose="cover-laptop"
          width={470}
          speechBubble="Hai! Aku Biko!"
          style={{ position: 'relative', zIndex: 2 }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: 10,
            padding: '10px 24px',
            borderRadius: 14,
            background: TEAL_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            color: CHARCOAL,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 23,
            fontWeight: 700,
          }}
        >
          Teman Belajar: Biko si Berang-berang
        </div>
      </InfoPanel>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi Besar dalam macOS Window)
// ============================================================================
const Slide02Misi: Page = () => (
  <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
    <SlideTitle>
      Apa <Highlight>Misi Kita</Highlight> Hari Ini?
    </SlideTitle>

    <MacWindowCard
      left={X0}
      top={215}
      width={1320}
      height={745}
      titleBarColor={SAND_GRID}
      headerLabel="petualangan-laptop"
      padding={34}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          height: '100%',
        }}
      >
        {/* Kartu 1: Blue Accent */}
        <InfoPanel
          bg={SKY_SOFT}
          borderColor={CHARCOAL}
          padding={26}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em' }}>
              MISI 1
            </span>
            <SectionHeading icon="laptop" size={32}>
              Kenali <Highlight color="#DBEAFE">Bagian Laptop</Highlight>
            </SectionHeading>
          </div>

          <div style={{ ...centerCol }}>
            <svg width={250} height={195} viewBox="0 0 260 210" fill="none">
              <rect x="34" y="34" width="164" height="114" rx="14" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
              <rect x="48" y="48" width="136" height="84" rx="8" fill="#DBEAFE" />
              <path d="M18 148 H214 L228 172 H4 Z" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="84" cy="90" r="14" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.5} />
              <circle cx="116" cy="90" r="14" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
              <circle cx="148" cy="90" r="14" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.5} />
              <circle cx="192" cy="116" r="38" fill={STABILO} fillOpacity={0.78} stroke={CHARCOAL} strokeWidth={4.5} />
              <path d="M218 144 L246 172" stroke={CORAL} strokeWidth={12} strokeLinecap="round" />
              <path d="M218 144 L246 172" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
            </svg>
          </div>

          <BulletList
            bulletColor={SKY}
            fontSize={23}
            gap={10}
            items={[
              <>
                <InlineHighlight color={WHITE}>Layar</InlineHighlight> untuk lihat gambar.
              </>,
              <>
                <InlineHighlight color={WHITE}>Keyboard</InlineHighlight> untuk ketik.
              </>,
              <>
                <InlineHighlight color={WHITE}>Trackpad</InlineHighlight> geser panah.
              </>,
            ]}
          />
        </InfoPanel>

        {/* Kartu 2: Green Accent */}
        <InfoPanel
          bg={TEAL_SOFT}
          borderColor={CHARCOAL}
          padding={26}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#047857', letterSpacing: '0.05em' }}>
              MISI 2
            </span>
            <SectionHeading icon="heart" size={32}>
              Hafal <Highlight color="#D1FAE5">Aturan Emas</Highlight>
            </SectionHeading>
          </div>

          <div style={{ ...centerCol }}>
            <svg width={250} height={195} viewBox="0 0 260 210" fill="none">
              <path
                d="M130 22 L206 48 V106 C206 154, 168 184, 130 198 C92 184, 54 154, 54 106 V48 Z"
                fill={WHITE}
                stroke={CHARCOAL}
                strokeWidth={4.5}
                strokeLinejoin="round"
              />
              <path d="M130 40 L188 60 V104 C188 140, 158 164, 130 176 C102 164, 72 140, 72 104 V60 Z" fill="#D1FAE5" />
              <path
                d="M130 146 C130 146, 92 122, 92 96 C92 80, 106 72, 118 78 C124 81, 128 86, 130 92 C132 86, 136 81, 142 78 C154 72, 168 80, 168 96 C168 122, 130 146, 130 146 Z"
                fill={CORAL}
                stroke={CHARCOAL}
                strokeWidth={3.5}
                strokeLinejoin="round"
              />
              <path
                d="M204 20 L212 36 L230 39 L217 51 L220 69 L204 60 L188 69 L191 51 L178 39 L196 36 Z"
                fill={SUNNY}
                stroke={CHARCOAL}
                strokeWidth={3}
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <BulletList
            bulletColor={TEAL}
            fontSize={23}
            gap={10}
            items={[
              <>
                <InlineHighlight color="#D1FAE5">Tangan bersih</InlineHighlight> dan kering.
              </>,
              <>
                Jauhkan <InlineHighlight color="#FECACA">air dan makan</InlineHighlight>.
              </>,
              <>
                Duduk <InlineHighlight>tegak dan rapi</InlineHighlight>.
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="point-left"
      width={360}
      speechBubble="Ayo kita taklukkan!"
      style={{ ...abs(1455, 325) }}
    />
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Bagian Utama 1: Layar (Monitor)
// ============================================================================
const Slide03Layar: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="BAGIAN LAPTOP #1" accentDot={SUNNY}>
      <SlideTitle>
        Ini Namanya <Highlight>Layar</Highlight>
      </SlideTitle>

      {/* Left Large Visual Laptop Spotlight */}
      <MacWindowCard
        left={X0}
        top={225}
        width={1030}
        height={725}
        titleBarColor={SUNNY_SOFT}
        headerLabel="bagian-1-layar"
        padding={28}
      >
        <div style={{ ...centerCol, height: '100%' }}>
          <svg width={900} height={540} viewBox="0 0 900 540" fill="none">
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
            <rect x="150" y="38" width="600" height="346" rx="22" fill={CHARCOAL} />
            <rect x="172" y="60" width="556" height="302" rx="12" fill="#E0F2FE" stroke={SUNNY} strokeWidth={5} />

            {/* Game World Inside Screen */}
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

            {/* Laptop Lower Keyboard Base */}
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

      {/* Right Column: InfoPanel with BulletList + Biko Pointing */}
      <div style={{ ...abs(1170, 225, 650, 725), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <InfoPanel bg={WHITE} padding={30}>
          <SectionHeading icon="eyes" size={32}>
            Apa Itu <Highlight>Layar?</Highlight>
          </SectionHeading>
          <div style={{ marginTop: 18 }}>
            <BulletList
              bulletColor={SUNNY}
              fontSize={27}
              gap={16}
              items={[
                <>
                  Seperti <InlineHighlight>TV ajaib</InlineHighlight> di laptop.
                </>,
                <>
                  Muncul <InlineHighlight color={SKY_SOFT}>gambar dan warna</InlineHighlight> cerah.
                </>,
                <>
                  Tempat lihat <InlineHighlight color="#D1FAE5">game seru</InlineHighlight>.
                </>,
              ]}
            />
          </div>
        </InfoPanel>

        <div style={{ ...centerCol }}>
          <BikoMascot pose="point-left" width={320} speechBubble="Lihat gambar di layar!" />
        </div>
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
    { label: 'A', bg: SUNNY_SOFT, activeBg: SUNNY },
    { label: 'B', bg: SUNNY_SOFT, activeBg: SUNNY },
    { label: 'C', bg: SUNNY_SOFT, activeBg: SUNNY },
    { label: 'D', bg: SUNNY_SOFT, activeBg: SUNNY },
    { label: 'E', bg: SUNNY_SOFT, activeBg: SUNNY },
  ],
];

const Slide04Keyboard: Page = () => {
  const [pressedKey, setPressedKey] = useState<string>('A');

  return (
    <JuniorFrame badge="BAGIAN LAPTOP #2" accentDot={CORAL}>
      <SlideTitle>
        Ini Namanya <Highlight>Keyboard</Highlight>
      </SlideTitle>

      {/* Left Column: InfoPanel + Biko & Pressed Key Feedback */}
      <div style={{ ...abs(X0, 225, 630, 725), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <InfoPanel bg={WHITE} padding={28}>
          <SectionHeading icon="abc" size={32}>
            Apa Itu <Highlight color="#DBEAFE">Keyboard?</Highlight>
          </SectionHeading>
          <div style={{ marginTop: 16 }}>
            <BulletList
              bulletColor={SKY}
              fontSize={26}
              gap={14}
              items={[
                <>
                  Punya tombol <InlineHighlight color={SKY_SOFT}>huruf dan angka</InlineHighlight>.
                </>,
                <>
                  Untuk mengetik dan <InlineHighlight>memberi perintah</InlineHighlight>.
                </>,
                <>
                  Tekan <InlineHighlight color="#D1FAE5">pelan-pelan</InlineHighlight> saja.
                </>,
              ]}
            />
          </div>
        </InfoPanel>

        <div style={{ ...row, gap: 18, alignItems: 'center' }}>
          <BikoMascot pose="press-key" width={250} />
          <InfoPanel bg={SUNNY_SOFT} padding={24} style={{ flex: 1, textAlign: 'center' }}>
            <SectionHeading icon="feather" size={24} accentColor={MUTED}>
              Tombol Diklik:
            </SectionHeading>
            <div
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontSize: pressedKey.length > 2 ? 44 : 66,
                fontWeight: 700,
                color: CORAL,
                marginTop: 8,
              }}
            >
              {pressedKey}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: CHARCOAL, marginTop: 4 }}>
              Tekan pelan ya!
            </div>
          </InfoPanel>
        </div>
      </div>

      {/* Right Column: Big Interactive Colorful Keyboard Close-up */}
      <MacWindowCard
        left={760}
        top={225}
        width={1060}
        height={725}
        titleBarColor={SKY_SOFT}
        headerLabel="klik-tombolnya"
        padding={34}
      >
        <div
          style={{
            height: '100%',
            background: '#E2E8F0',
            borderRadius: 22,
            border: `3px solid ${CHARCOAL}`,
            padding: 30,
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
                      height: 132,
                      borderRadius: 20,
                      background: isActive ? k.activeBg : k.bg,
                      color: isActive && rIdx === 0 ? WHITE : CHARCOAL,
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
                height: 130,
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
              SPASI
            </button>

            {/* Arrow Keys Cluster */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 60px)',
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
                  setPressedKey('ATAS');
                }}
                className="cpj-card-btn"
                aria-label="Tombol panah atas"
                style={{
                  height: 60,
                  borderRadius: 14,
                  background: pressedKey === 'ATAS' ? CORAL : CORAL_SOFT,
                  border: `2.5px solid ${CHARCOAL}`,
                  boxShadow: `0 4px 0 ${CHARCOAL}`,
                  ...centerCol,
                }}
              >
                <JuniorIcon name="arrow-up" size={28} />
              </button>
              <div />
              {(
                [
                  { id: 'KIRI', icon: 'arrow-left' },
                  { id: 'BAWAH', icon: 'arrow-down' },
                  { id: 'KANAN', icon: 'arrow-right' },
                ] as const
              ).map((arrow) => (
                <button
                  key={arrow.id}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPressedKey(arrow.id);
                  }}
                  className="cpj-card-btn"
                  aria-label={`Tombol panah ${arrow.id.toLowerCase()}`}
                  style={{
                    height: 60,
                    borderRadius: 14,
                    background: pressedKey === arrow.id ? CORAL : CORAL_SOFT,
                    border: `2.5px solid ${CHARCOAL}`,
                    boxShadow: `0 4px 0 ${CHARCOAL}`,
                    ...centerCol,
                  }}
                >
                  <JuniorIcon name={arrow.icon} size={28} />
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
      <SlideTitle>
        <Highlight>Trackpad</Highlight> &amp; <Highlight color="#DBEAFE">Mouse</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={225}
        width={W}
        height={725}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="penggerak-panah-ajaib"
        padding={34}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1.05fr',
            gap: 30,
            height: '100%',
            alignItems: 'stretch',
          }}
        >
          {/* 1. Trackpad Illustration Card */}
          <InfoPanel
            bg={SKY_SOFT}
            padding={26}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <svg width={320} height={260} viewBox="0 0 320 270" fill="none">
              <rect x="24" y="34" width="272" height="198" rx="20" fill="#E2E8F0" stroke={CHARCOAL} strokeWidth={4} />
              <rect x="44" y="48" width="232" height="44" rx="8" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={2.5} />
              <rect x="86" y="108" width="148" height="106" rx="16" fill={SKY} stroke={CHARCOAL} strokeWidth={4} />
              <rect x="98" y="120" width="124" height="82" rx="10" fill="#DBEAFE" />
              <circle cx="160" cy="158" r="18" fill={SUNNY} opacity={0.65} />
              <path
                d="M160 154 C166 154, 174 162, 174 176 V228 H144 V174 C144 162, 152 154, 160 154 Z"
                fill="#FDE68A"
                stroke={CHARCOAL}
                strokeWidth={3.5}
              />
            </svg>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <SectionHeading icon="tap" size={32}>
                Trackpad
              </SectionHeading>
              <BulletList
                bulletColor={SKY}
                fontSize={23}
                gap={8}
                items={[
                  <>
                    <InlineHighlight color={WHITE}>Kotak sentuh</InlineHighlight> di laptop.
                  </>,
                  <>Geser pakai 1 jari.</>,
                ]}
              />
            </div>
          </InfoPanel>

          {/* 2. Cute Mouse Illustration Card */}
          <InfoPanel
            bg={CORAL_SOFT}
            padding={26}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <svg width={300} height={260} viewBox="0 0 300 270" fill="none">
              <ellipse cx="150" cy="212" rx="116" ry="26" fill="#FEE2E2" stroke={CHARCOAL} strokeWidth={3} />
              <path d="M150 58 C150 22, 224 14, 246 44" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
              <rect x="94" y="56" width="112" height="156" rx="56" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
              <path d="M96 124 H204" stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M150 58 V124" stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M148 59 C116 61, 97 86, 97 122 H148 Z" fill={CORAL} opacity={0.85} />
              <rect x="142" y="80" width="16" height="30" rx="8" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
              <circle cx="132" cy="158" r="4" fill={CHARCOAL} />
              <circle cx="168" cy="158" r="4" fill={CHARCOAL} />
              <path d="M140 172 Q150 182 160 172" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
            </svg>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <SectionHeading icon="mouse" size={32}>
                Mouse
              </SectionHeading>
              <BulletList
                bulletColor={CORAL}
                fontSize={23}
                gap={8}
                items={[
                  <>
                    Teman <InlineHighlight color={WHITE}>genggam</InlineHighlight> di meja.
                  </>,
                  <>Klik tombol dan geser.</>,
                ]}
              />
            </div>
          </InfoPanel>

          {/* 3. Magic Cursor Destination Screen */}
          <InfoPanel
            bg={TEAL_SOFT}
            padding={26}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <svg width={340} height={260} viewBox="0 0 340 270" fill="none">
              <rect x="20" y="24" width="300" height="214" rx="22" fill={CHARCOAL} />
              <rect x="34" y="38" width="272" height="186" rx="14" fill="#0F172A" />
              <path
                d="M90 176 Q155 120 226 108"
                stroke={SUNNY}
                strokeWidth={5}
                strokeDasharray="10 10"
                strokeLinecap="round"
              />
              <rect x="202" y="74" width="76" height="44" rx="14" fill={TEAL} stroke={WHITE} strokeWidth={3} />
              <text x="240" y="103" textAnchor="middle" fontFamily='"Fredoka", sans-serif' fontSize="20" fontWeight="700" fill={WHITE}>
                KLIK!
              </text>
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
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <SectionHeading icon="arrow-right" size={32}>
                Panah Ajaib
              </SectionHeading>
              <BulletList
                bulletColor={TEAL}
                fontSize={23}
                gap={8}
                items={[
                  <>
                    Ikuti <InlineHighlight>gerak jari</InlineHighlight> kita.
                  </>,
                  <>Arahkan ke tombol game.</>,
                ]}
              />
            </div>
          </InfoPanel>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Ayo Tunjuk! (Interactive Pins 1-2-3)
// ============================================================================
const QUIZ_PINS: { id: number; name: string; icon: JuniorIconName; color: string; x: number; y: number }[] = [
  { id: 1, name: 'Layar', icon: 'eyes', color: CORAL, x: 563, y: 156 },
  { id: 2, name: 'Keyboard', icon: 'abc', color: SUNNY, x: 563, y: 370 },
  { id: 3, name: 'Trackpad', icon: 'tap', color: TEAL, x: 563, y: 468 },
];

const Slide06Tebak: Page = () => {
  const [revealed, setRevealed] = useState<number[]>([1, 2, 3]);

  const togglePin = (id: number) => {
    setRevealed((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle>
        Mana <Highlight>Bagian Laptopnya?</Highlight>
      </SlideTitle>

      {/* Center-Left Interactive Laptop Diagram */}
      <MacWindowCard
        left={X0}
        top={225}
        width={1180}
        height={725}
        titleBarColor={CORAL_SOFT}
        headerLabel="klik-angka-untuk-cek"
        padding={24}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', ...centerCol }}>
          <svg width={880} height={540} viewBox="0 0 880 540" fill="none" style={{ display: 'block', margin: '0 auto' }}>
            <rect x="170" y="24" width="540" height="274" rx="22" fill={CHARCOAL} />
            <rect x="190" y="44" width="500" height="234" rx="12" fill="#E0F2FE" stroke={SKY} strokeWidth={4} />
            <circle cx="310" cy="145" r="32" fill={SUNNY} />
            <rect x="370" y="122" width="180" height="26" rx="13" fill={WHITE} />
            <rect x="370" y="162" width="120" height="20" rx="10" fill="#BAE6FD" />

            <path
              d="M140 298 H740 L800 508 H80 Z"
              fill="#E2E8F0"
              stroke={CHARCOAL}
              strokeWidth={4.5}
              strokeLinejoin="round"
            />
            <rect x="190" y="318" width="500" height="106" rx="12" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={3} />
            <rect x="336" y="438" width="208" height="58" rx="12" fill="#94A3B8" stroke={CHARCOAL} strokeWidth={3} />
          </svg>

          {/* 3 Clickable Number Pins (real <button type="button">) */}
          {QUIZ_PINS.map((pin) => {
            const isOpen = revealed.includes(pin.id);
            return (
              <div
                key={pin.id}
                style={{
                  position: 'absolute',
                  left: pin.x,
                  top: pin.y,
                  transform: 'translate(-20%, -50%)',
                  ...row,
                  gap: 14,
                  zIndex: 4,
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePin(pin.id);
                  }}
                  className="cpj-card-btn"
                  aria-label={`Tampilkan atau sembunyikan bagian ${pin.id}: ${pin.name}`}
                  style={{
                    width: 66,
                    height: 66,
                    borderRadius: 99,
                    background: pin.color,
                    border: `3.5px solid ${CHARCOAL}`,
                    boxShadow: `0 5px 0 ${CHARCOAL}`,
                    ...centerCol,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 32,
                    fontWeight: 700,
                    color: pin.id === 2 ? CHARCOAL : WHITE,
                    padding: 0,
                  }}
                >
                  {pin.id}
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: '10px 20px',
                      borderRadius: 16,
                      ...row,
                      gap: 10,
                      background: WHITE,
                      border: `2.5px solid ${CHARCOAL}`,
                      boxShadow: CARD_SHADOW,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 26,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <JuniorIcon name={pin.icon} size={26} />
                    <span>{pin.name}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </MacWindowCard>

      {/* Right Column: InfoPanel + Biko with ? Sign */}
      <div style={{ ...abs(1315, 225, 505, 725), display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
        <InfoPanel bg={STABILO} padding={26} style={{ width: '100%' }}>
          <SectionHeading icon="point-right" size={30}>
            Tunjuk di Laptopmu!
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={CHARCOAL}
              fontSize={24}
              gap={10}
              items={[
                <>
                  Nomor 1: <InlineHighlight color={WHITE}>Layar</InlineHighlight>
                </>,
                <>
                  Nomor 2: <InlineHighlight color={WHITE}>Keyboard</InlineHighlight>
                </>,
                <>
                  Nomor 3: <InlineHighlight color={WHITE}>Trackpad</InlineHighlight>
                </>,
              ]}
            />
          </div>
        </InfoPanel>

        <BikoMascot pose="question" width={340} />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Aturan Emas #1 & #2: Jaga Kebersihan & Kelembutan
// ============================================================================
const Slide07Aturan12: Page = () => (
  <JuniorFrame badge="ATURAN EMAS LAPTOP" accentDot={TEAL}>
    <SlideTitle>
      <Highlight>Sayangi</Highlight> Laptop Ajaibmu!
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
          <SectionHeading icon="check" size={38} accentColor={TEAL_DARK}>
            BOLEH Dilakukan
          </SectionHeading>
        </div>

        {/* Visual Cards */}
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
            <svg width={132} height={132} viewBox="0 0 140 140" fill="none">
              <circle cx="70" cy="70" r="62" fill="#D1FAE5" />
              <path
                d="M50 86 V44 C50 38, 60 38, 60 44 V66 M60 36 C60 30, 70 30, 70 36 V66 M70 34 C70 28, 80 28, 80 34 V66 M80 42 C80 36, 90 36, 90 42 V84 C90 100, 78 112, 64 112 C52 112, 44 102, 44 88 L36 74 C32 68, 40 62, 46 68 Z"
                fill="#FDE68A"
                stroke={CHARCOAL}
                strokeWidth={3.5}
                strokeLinejoin="round"
              />
              <circle cx="30" cy="36" r="10" fill={SKY} stroke={CHARCOAL} strokeWidth={2.5} />
              <circle cx="110" cy="40" r="8" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
              <path d="M108 86 L112 94 L120 98 L112 102 L108 110 L104 102 L96 98 L104 94 Z" fill={TEAL} />
            </svg>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
              Tangan Bersih
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
            <svg width={132} height={132} viewBox="0 0 140 140" fill="none">
              <circle cx="70" cy="70" r="62" fill="#D1FAE5" />
              <rect x="28" y="80" width="84" height="32" rx="10" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M94 26 C64 28, 44 52, 46 84 C74 82, 98 60, 94 26 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M42 92 L90 32" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
              Tekan Pelan
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
                Cuci <InlineHighlight color="#D1FAE5">tangan bersih</InlineHighlight> dan kering.
              </>,
              <>
                Tekan tombol <InlineHighlight>pelan-pelan</InlineHighlight> seperti bulu.
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
          <SectionHeading icon="cross" size={38} accentColor="#B91C1C">
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
            <svg width={132} height={132} viewBox="0 0 140 140" fill="none">
              <circle cx="70" cy="70" r="62" fill="#FEE2E2" />
              <path
                d="M42 48 L74 36 L86 78 L52 90 Z"
                fill={WHITE}
                stroke={CHARCOAL}
                strokeWidth={3.5}
                strokeLinejoin="round"
              />
              <path d="M84 42 L98 22" stroke={CORAL} strokeWidth={5} strokeLinecap="round" />
              <path d="M58 92 Q78 110 108 106 Q112 118 82 118 Q54 116 58 92 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={2.5} />
              <path d="M24 24 L116 116" stroke={CORAL} strokeWidth={7} strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
              Air &amp; Makanan
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
            <svg width={132} height={132} viewBox="0 0 140 140" fill="none">
              <circle cx="70" cy="70" r="62" fill="#FEE2E2" />
              <rect x="52" y="28" width="54" height="32" rx="8" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.5} />
              <rect x="74" y="58" width="12" height="44" rx="5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
              <path d="M36 92 L50 84 M32 104 L50 102 M108 92 L94 84" stroke={CORAL} strokeWidth={4.5} strokeLinecap="round" />
              <path d="M24 24 L116 116" stroke={CORAL} strokeWidth={7} strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
              Dipukul Keras
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
                Jauhkan <InlineHighlight color="#FECACA">air dan makanan</InlineHighlight>.
              </>,
              <>
                Jangan <InlineHighlight color="#FECACA">pukul tombol</InlineHighlight> keras.
              </>,
            ]}
          />
        </InfoPanel>
      </InfoPanel>
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 08 — Aturan Emas #3 & #4: Cara Buka & Duduk Aman
// ============================================================================
const Slide08Aturan34: Page = () => (
  <JuniorFrame badge="ATURAN EMAS LAPTOP" accentDot={TEAL}>
    <SlideTitle>
      <Highlight>Buka Pelan</Highlight> &amp; Duduk Rapi
    </SlideTitle>

    <MacWindowCard
      left={X0}
      top={225}
      width={1360}
      height={725}
      titleBarColor={TEAL_SOFT}
      headerLabel="aturan-3-dan-4"
      padding={36}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 34,
          height: '100%',
        }}
      >
        {/* Kartu 1: Open with 2 Hands */}
        <InfoPanel
          bg={TEAL_SOFT}
          padding={28}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#047857', letterSpacing: '0.05em' }}>
              ATURAN #3
            </span>
            <SectionHeading icon="hand" size={30}>
              Pakai <Highlight color="#D1FAE5">Dua Tangan</Highlight>
            </SectionHeading>
          </div>

          <svg width={320} height={240} viewBox="0 0 340 260" fill="none">
            <rect x="64" y="64" width="212" height="132" rx="16" fill={CHARCOAL} />
            <rect x="78" y="78" width="184" height="104" rx="8" fill="#D1FAE5" />
            <path d="M44 196 H296 L316 232 H24 Z" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
            <rect x="96" y="42" width="44" height="32" rx="12" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} />
            <rect x="200" y="42" width="44" height="32" rx="12" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} />
            <path d="M170 28 V52 M160 38 L170 26 L180 38" stroke={TEAL} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div style={{ width: '100%' }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={24}
              gap={10}
              items={[
                <>
                  Pegang <InlineHighlight color="#D1FAE5">kiri dan kanan</InlineHighlight> layar.
                </>,
                <>Buka dan tutup pelan.</>,
              ]}
            />
          </div>
        </InfoPanel>

        {/* Kartu 2: Laptop on Desk, Sit Upright */}
        <InfoPanel
          bg={SKY_SOFT}
          padding={28}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em' }}>
              ATURAN #4
            </span>
            <SectionHeading icon="laptop" size={30}>
              Duduk <Highlight color="#DBEAFE">Tegak Rapi</Highlight>
            </SectionHeading>
          </div>

          <svg width={320} height={240} viewBox="0 0 340 260" fill="none">
            <rect x="132" y="148" width="184" height="18" rx="8" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.5} />
            <path d="M158 166 V242 M290 166 V242" stroke={CHARCOAL} strokeWidth={5} strokeLinecap="round" />
            <path d="M214 146 H276 L296 96" stroke={CHARCOAL} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="102" cy="70" r="26" fill={OTTER_GOLD} stroke={CHARCOAL} strokeWidth={3.5} />
            <circle cx="112" cy="68" r="3.5" fill={CHARCOAL} />
            <path d="M84 98 H120 L132 160 H74 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
            <path d="M116 124 L182 142" stroke={OTTER_GOLD} strokeWidth={12} strokeLinecap="round" />
            <path d="M56 108 V182 H124 V242 M68 182 V242" stroke={CHARCOAL} strokeWidth={5} strokeLinecap="round" />
            <path d="M42 66 V142" stroke={TEAL} strokeWidth={5} strokeDasharray="8 6" strokeLinecap="round" />
          </svg>

          <div style={{ width: '100%' }}>
            <BulletList
              bulletColor={SKY}
              fontSize={24}
              gap={10}
              items={[
                <>
                  Taruh laptop di <InlineHighlight color="#DBEAFE">atas meja</InlineHighlight>.
                </>,
                <>Duduk tegak tidak bungkuk.</>,
              ]}
            />
          </div>
        </InfoPanel>
      </div>
    </MacWindowCard>

    <div style={{ ...abs(1485, 390, 340, 520), ...centerCol }}>
      <BikoMascot pose="thumbs-up" width={330} speechBubble="Anak Hebat!" />
    </div>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik Pertama! (3 Blok Interactive + Simulasi Demo)
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
    soft: SUNNY_SOFT,
    title: 'Geser Pelan',
    sub: 'Ke kiri dan kanan',
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
      <SlideTitle top={114}>
        Misi Gerakkan <Highlight>Panah Ajaib</Highlight>
      </SlideTitle>

      {/* Top Row: 3 Interactive Step Buttons */}
      <div
        style={{
          ...abs(X0, 224, W, 225),
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
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveStep(s.num);
                }}
                className="cpj-card-btn"
                style={{
                  height: 210,
                  background: isSelected ? s.color : s.soft,
                  color: isSelected && s.num !== 2 ? WHITE : CHARCOAL,
                  borderRadius: 26,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: isSelected ? `0 3px 0 ${CHARCOAL}` : `0 8px 0 ${CHARCOAL}`,
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  transform: isSelected ? 'translateY(3px)' : undefined,
                }}
              >
                <div style={{ ...row, justifyContent: 'space-between', width: '100%' }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: WHITE,
                      color: CHARCOAL,
                      border: `2.5px solid ${CHARCOAL}`,
                      ...centerCol,
                      fontFamily: 'var(--osd-font-display)',
                      fontSize: 30,
                      fontWeight: 700,
                    }}
                  >
                    {s.num}
                  </div>
                  <span style={{ fontSize: 18, fontWeight: 800, opacity: 0.88 }}>
                    {isSelected ? 'AKTIF' : 'KLIK COBA'}
                  </span>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4, opacity: 0.92 }}>
                    {s.sub}
                  </div>
                </div>
              </button>

              {idx < 2 && <JuniorIcon name="arrow-right" size={32} />}
            </Fragment>
          );
        })}
      </div>

      {/* Bottom Stage: Interactive Trackpad to START Button Demo */}
      <MacWindowCard
        left={X0}
        top={478}
        width={W}
        height={472}
        titleBarColor={SAND_GRID}
        headerLabel="simulasi-panah-ajaib"
        padding={26}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '440px 1fr',
            gap: 30,
            height: '100%',
            alignItems: 'stretch',
          }}
        >
          {/* Left: Trackpad Finger Demo */}
          <InfoPanel
            bg={SKY_SOFT}
            padding={20}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <SectionHeading icon="tap" size={26}>
              Sentuh &amp; Geser
            </SectionHeading>
            <svg width={300} height={220} viewBox="0 0 320 240" fill="none">
              <rect x="44" y="28" width="232" height="168" rx="22" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
              <rect x="64" y="46" width="192" height="132" rx="14" fill="#DBEAFE" stroke={SKY} strokeWidth={3} />
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
            <BulletList
              bulletColor={SKY}
              fontSize={20}
              gap={6}
              items={[<>Klik langkah 1, 2, atau 3 di atas!</>]}
            />
          </InfoPanel>

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

            {/* Real Interactive START Button */}
            <button
              type="button"
              className="cpj-card-btn"
              onClick={(e) => {
                e.stopPropagation();
                setActiveStep(3);
              }}
              style={{
                position: 'absolute',
                right: 120,
                top: 105,
                width: 260,
                height: 112,
                borderRadius: 26,
                background: currentStep.started ? TEAL : CORAL,
                border: `4px solid ${WHITE}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 42,
                fontWeight: 700,
                color: WHITE,
                ...centerCol,
              }}
            >
              {currentStep.started ? 'YEAY!' : 'START'}
            </button>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 1 (Summary Bullets + Medal + Biko)
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

      <SlideTitle top={104} size={58} align="center">
        Hore! Kamu <Highlight>Sahabat Laptop!</Highlight>
      </SlideTitle>

      {/* Center Celebration Window Card */}
      <MacWindowCard
        left={180}
        top={210}
        width={1180}
        height={745}
        titleBarColor={SUNNY_SOFT}
        headerLabel="lencana-pertemuan-1"
        padding={34}
      >
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '430px 1fr', gap: 36, alignItems: 'center' }}>
          {/* Left: Gold Medal + Flat Achievement Banner */}
          <div style={{ ...centerCol, gap: 22 }}>
            <svg
              width={260}
              height={260}
              viewBox="0 0 280 280"
              fill="none"
              style={{
                animation: live ? 'cpj-float 2.8s ease-in-out infinite' : undefined,
              }}
            >
              <path d="M88 20 L122 108 H84 L54 20 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M192 20 L158 108 H196 L226 20 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="140" cy="158" r="102" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="140" cy="158" r="82" fill={STABILO} stroke={CHARCOAL} strokeWidth={3.5} />
              <rect x="94" y="114" width="92" height="58" rx="10" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} />
              <rect x="104" y="124" width="72" height="38" rx="4" fill={WHITE} />
              <path d="M80 174 H200 L210 190 H70 Z" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path
                d="M140 130 L144 139 L154 140 L146 147 L148 156 L140 151 L132 156 L134 147 L126 140 L136 139 Z"
                fill={SUNNY}
                stroke={CHARCOAL}
                strokeWidth={2}
              />
            </svg>

            <div
              style={{
                padding: '12px 24px',
                borderRadius: 16,
                background: SUNNY_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 26,
                fontWeight: 700,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="medal" size={28} />
              <span>Lencana Sahabat Laptop</span>
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
                  Kenal <InlineHighlight color={SKY_SOFT}>Layar, Keyboard, Trackpad</InlineHighlight>.
                </>,
                <>
                  Tekan tombol <InlineHighlight>pelan-pelan</InlineHighlight>.
                </>,
                <>
                  Hafal <InlineHighlight color="#D1FAE5">Aturan Emas</InlineHighlight> laptop.
                </>,
                <>
                  Bisa geser <InlineHighlight color={SUNNY_SOFT}>Panah Ajaib</InlineHighlight> dan klik.
                </>,
              ]}
            />
          </div>
        </div>
      </MacWindowCard>

      {/* Celebrating Jumping Biko on Right */}
      <div style={{ ...abs(1400, 385, 420, 520), ...centerCol }}>
        <BikoMascot pose="jump" width={365} speechBubble="Kamu Hebat!" />
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

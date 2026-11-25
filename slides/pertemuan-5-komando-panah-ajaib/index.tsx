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
  50% { transform: translateY(-8px); }
}
@keyframes cpj5-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(8px) rotate(14deg); }
}
.cpj5-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj5-card-btn:hover {
  transform: translateY(-3px);
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
// Reusable Flat-Vector Arrow Command Blocks & Grid Tokens
// ============================================================================
type Dir = 'up' | 'down' | 'left' | 'right';

const DIR_META: Record<Dir, { label: string; icon: JuniorIconName; color: string; rotate: number }> = {
  up: { label: 'Atas', icon: 'arrow-up', color: SKY, rotate: 0 },
  down: { label: 'Bawah', icon: 'arrow-down', color: SUNNY, rotate: 180 },
  left: { label: 'Kiri', icon: 'arrow-left', color: CORAL, rotate: -90 },
  right: { label: 'Kanan', icon: 'arrow-right', color: TEAL, rotate: 90 },
};

/**
 * Arrow block: interactive <button> ONLY when onClick is provided;
 * otherwise flat <div> with zero button-extrusion shadow.
 */
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
  const arrowSize = Math.round(size * 0.54);
  const content = (
    <>
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
            lineHeight: 1.1,
          }}
        >
          {label}
        </span>
      )}
    </>
  );

  const baseStyle: CSSProperties = {
    width: size,
    height: label ? size + 28 : size,
    borderRadius: 22,
    background: m.color,
    border: `3.5px solid ${CHARCOAL}`,
    ...centerCol,
    gap: 4,
    padding: 8,
    boxSizing: 'border-box',
  };

  if (onClick) {
    return (
      <button
        type="button"
        draggable={draggable}
        onDragStart={onDragStart}
        className="cpj5-card-btn"
        onClick={onClick}
        aria-label={`Arah ${m.label}`}
        style={{
          ...baseStyle,
          boxShadow: active ? `0 0 0 5px ${STABILO}, 0 6px 0 ${CHARCOAL}` : `0 6px 0 ${CHARCOAL}`,
          cursor: 'pointer',
        }}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      style={{
        ...baseStyle,
        boxShadow: active ? `0 0 0 5px ${STABILO}` : undefined,
      }}
    >
      {content}
    </div>
  );
};

const BikoTokenSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ display: 'block' }}>
    <circle cx="20" cy="28" r="9" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.2} />
    <circle cx="60" cy="28" r="9" fill="#D97706" stroke={CHARCOAL} strokeWidth={3.2} />
    <circle cx="40" cy="44" r="24" fill="#F59E0B" stroke={CHARCOAL} strokeWidth={3.4} />
    <ellipse cx="40" cy="49" rx="17" ry="14" fill="#FEF3C7" />
    <circle cx="32" cy="43" r="3.4" fill={CHARCOAL} />
    <circle cx="48" cy="43" r="3.4" fill={CHARCOAL} />
    <circle cx="33" cy="41.8" r="1.1" fill={WHITE} />
    <circle cx="49" cy="41.8" r="1.1" fill={WHITE} />
    <ellipse cx="40" cy="49" rx="4.5" ry="3.2" fill={CHARCOAL} />
    <path d="M34 54.5 Q40 60 46 54.5" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" />
  </svg>
);

const StarSvg = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ display: 'block' }}>
    <path
      d="M40 10 L48 30 L70 32 L53 46 L58 68 L40 56 L22 68 L27 46 L10 32 L32 30 Z"
      fill={SUNNY}
      stroke={CHARCOAL}
      strokeWidth={3.8}
      strokeLinejoin="round"
    />
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

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Hero Split + InfoPanel + BulletList)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 5" accentDot={SUNNY}>
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
          Komando <Highlight color={STABILO}>Panah Ajaib!</Highlight>
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
          Petualangan Arah Atas, Bawah, Kiri &amp; Kanan
        </p>

        {/* Clean non-button Info Panel with Bullet Points */}
        <InfoPanel bg={WHITE} padding={26} style={{ marginTop: 6 }}>
          <SectionHeading icon="compass" size={26}>
            Yang Akan Kita Pelajari:
          </SectionHeading>
          <div style={{ marginTop: 14 }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={24}
              gap={12}
              items={[
                <>
                  Kenal <InlineHighlight>4 arah panah</InlineHighlight>: Atas, Bawah, Kiri, Kanan.
                </>,
                <>
                  Hitung langkah di <InlineHighlight color={SKY_SOFT}>peta kotak</InlineHighlight>.
                </>,
                <>
                  Bantu Biko ambil <InlineHighlight color="#D1FAE5">bintang emas</InlineHighlight>.
                </>,
              ]}
            />
          </div>
        </InfoPanel>
      </div>

      {/* Right Visual Showcase: Explorer Map Frame + Compass Biko */}
      <div style={{ ...abs(975, 150, 845, 795), ...centerCol }}>
        {/* Explorer Map Card Backdrop */}
        <div
          style={{
            position: 'absolute',
            width: 640,
            height: 600,
            borderRadius: 36,
            background: SUNNY_SOFT,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `12px 12px 0 ${SKY}`,
            overflow: 'hidden',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 640 600" fill="none" style={{ opacity: 0.4 }}>
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

        {/* Mini Treasure Grid Preview Card (Flat InfoPanel) */}
        <InfoPanel
          bg={WHITE}
          padding={16}
          style={{
            position: 'absolute',
            left: 36,
            top: 48,
            width: 280,
            zIndex: 4,
          }}
        >
          <SectionHeading icon="map" size={20}>
            Peta Harta Karun
          </SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 10 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
              const isStart = idx === 6;
              const isStar = idx === 2;
              const isRight = idx === 7 || idx === 4;
              const isUp = idx === 5;
              return (
                <div
                  key={idx}
                  style={{
                    height: 52,
                    borderRadius: 12,
                    background: isStar ? SUNNY_SOFT : isRight || isUp || isStart ? TEAL_SOFT : '#F8FAFC',
                    border: `2px solid ${CHARCOAL}`,
                    ...centerCol,
                  }}
                >
                  {isStart && <BikoTokenSvg size={34} />}
                  {isStar && <StarSvg size={34} />}
                  {isRight && <JuniorIcon name="arrow-right" size={24} />}
                  {isUp && <JuniorIcon name="arrow-up" size={24} />}
                </div>
              );
            })}
          </div>
        </InfoPanel>

        {/* 4 Floating Static Arrow Blocks (rendered as <div>, flat border) */}
        <div style={{ position: 'absolute', right: 66, top: 48, zIndex: 4, animation: live ? 'cpj5-float 2.6s ease-in-out infinite' : undefined }}>
          <ArrowCommandBlock dir="up" size={82} />
        </div>
        <div style={{ position: 'absolute', right: 36, top: 230, zIndex: 4, animation: live ? 'cpj5-float 3.1s ease-in-out infinite' : undefined }}>
          <ArrowCommandBlock dir="right" size={78} />
        </div>
        <div style={{ position: 'absolute', left: 56, bottom: 130, zIndex: 4, animation: live ? 'cpj5-float 2.9s ease-in-out infinite' : undefined }}>
          <ArrowCommandBlock dir="left" size={78} />
        </div>
        <div style={{ position: 'absolute', right: 72, bottom: 92, zIndex: 4, animation: live ? 'cpj5-float 3.3s ease-in-out infinite' : undefined }}>
          <ArrowCommandBlock dir="down" size={78} />
        </div>

        <BikoMascot
          pose="explorer"
          width={395}
          style={{ position: 'relative', zIndex: 3, marginTop: 125, marginLeft: 55 }}
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

    <MacWindowCard left={X0} top={215} width={1320} height={745} headerLabel="daftar-misi-5.app" padding={34}>
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
            <SectionHeading icon="compass" size={32}>
              Kenali <Highlight color="#DBEAFE">4 Arah Panah</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${SKY}`,
              padding: 20,
              ...centerCol,
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <ArrowCommandBlock dir="up" size={82} label="Atas" />
              <ArrowCommandBlock dir="down" size={82} label="Bawah" />
              <ArrowCommandBlock dir="left" size={82} label="Kiri" />
              <ArrowCommandBlock dir="right" size={82} label="Kanan" />
            </div>
          </div>

          <BulletList
            bulletColor={SKY}
            fontSize={23}
            gap={10}
            items={[
              <>
                Arah <InlineHighlight color={WHITE}>Atas</InlineHighlight> dan <InlineHighlight color={WHITE}>Bawah</InlineHighlight>.
              </>,
              <>
                Arah <InlineHighlight color={WHITE}>Kiri</InlineHighlight> dan <InlineHighlight color={WHITE}>Kanan</InlineHighlight>.
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
            <SectionHeading icon="map" size={32}>
              Jalan di <Highlight color="#D1FAE5">Peta Kotak</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${TEAL}`,
              padding: 24,
              ...centerCol,
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 96px)', gap: 12 }}>
              {[
                { bg: WHITE, node: <BikoTokenSvg size={48} /> },
                { bg: SUNNY_SOFT, node: <JuniorIcon name="arrow-right" size={36} /> },
                { bg: WHITE, node: null },
                { bg: WHITE, node: null },
                { bg: SUNNY_SOFT, node: <JuniorIcon name="arrow-down" size={36} /> },
                { bg: SUNNY_SOFT, node: <StarSvg size={48} /> },
              ].map((c, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 96,
                    height: 88,
                    borderRadius: 16,
                    background: c.bg,
                    border: `2.5px solid ${CHARCOAL}`,
                    ...centerCol,
                  }}
                >
                  {c.node}
                </div>
              ))}
            </div>
          </div>

          <BulletList
            bulletColor={TEAL}
            fontSize={23}
            gap={10}
            items={[
              <>
                <InlineHighlight>1 Panah</InlineHighlight> = jalan <InlineHighlight color={WHITE}>1 kotak</InlineHighlight>.
              </>,
              <>
                Bantu Biko ambil <InlineHighlight color="#D1FAE5">Bintang Emas</InlineHighlight>!
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="point-left"
      width={360}
      speechBubble="Siap beraksi!"
      style={{ ...abs(1455, 315) }}
    />
  </JuniorFrame>
);

// ============================================================================
// SLIDE 03 — Kenalan Sama 4 Panah Ajaib (Interactive Cross-Pad + Guide Panel)
// ============================================================================
const Slide03CrossPad: Page = () => {
  const [selected, setSelected] = useState<Dir>('up');
  const activeMeta = DIR_META[selected];

  const dirMeaning: Record<Dir, string> = {
    up: 'Biko melangkah naik 1 kotak',
    down: 'Biko melangkah turun 1 kotak',
    left: 'Biko geser ke kiri 1 kotak',
    right: 'Biko geser ke kanan 1 kotak',
  };

  return (
    <JuniorFrame badge="KOMANDO ARAH" accentDot={SUNNY}>
      <SlideTitle>
        Ini <Highlight>4 Panah Ajaib</Highlight> Kita!
      </SlideTitle>

      {/* Left Interactive Cross-Pad */}
      <MacWindowCard left={X0} top={215} width={1040} height={745} headerLabel="komando-4-panah.app" padding={24}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 20,
            background: 'linear-gradient(180deg, #FFFDF7 0%, #EFF6FF 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            ...centerCol,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '190px 250px 190px',
              gridTemplateRows: '150px 220px 150px',
              alignItems: 'center',
              justifyItems: 'center',
              gap: 10,
            }}
          >
            <div />
            <ArrowCommandBlock dir="up" size={112} label="Atas" active={selected === 'up'} onClick={() => setSelected('up')} />
            <div />

            <ArrowCommandBlock dir="left" size={112} label="Kiri" active={selected === 'left'} onClick={() => setSelected('left')} />

            <div
              style={{
                width: 210,
                height: 210,
                borderRadius: '50%',
                background: SUNNY_SOFT,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: CARD_SHADOW,
                ...centerCol,
                overflow: 'hidden',
              }}
            >
              <BikoMascot pose="wave" width={155} style={{ marginTop: 16 }} />
            </div>

            <ArrowCommandBlock dir="right" size={112} label="Kanan" active={selected === 'right'} onClick={() => setSelected('right')} />

            <div />
            <ArrowCommandBlock dir="down" size={112} label="Bawah" active={selected === 'down'} onClick={() => setSelected('down')} />
            <div />
          </div>
        </div>
      </MacWindowCard>

      {/* Right Column: Selected Direction Info + Bullet Guide */}
      <div style={{ ...abs(1175, 215, 645, 745), display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
        <InfoPanel bg={WHITE} borderColor={activeMeta.color} padding={28}>
          <SectionHeading icon={activeMeta.icon} size={30}>
            Arah Dipilih: <Highlight>{activeMeta.label}</Highlight>
          </SectionHeading>
          <p style={{ margin: '14px 0 0', fontSize: 25, fontWeight: 700, color: CHARCOAL, lineHeight: 1.35 }}>
            {dirMeaning[selected]}.
          </p>
        </InfoPanel>

        <InfoPanel bg={SUNNY_SOFT} padding={28} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <SectionHeading icon="tap" size={28}>
            Klik Panah di Kiri!
          </SectionHeading>
          <BulletList
            bulletColor={TEAL}
            fontSize={24}
            gap={16}
            items={[
              <>
                <InlineHighlight color={SKY_SOFT}>Atas</InlineHighlight> = langkah naik.
              </>,
              <>
                <InlineHighlight color={STABILO}>Bawah</InlineHighlight> = langkah turun.
              </>,
              <>
                <InlineHighlight color="#FEE2E2">Kiri</InlineHighlight> = geser ke kiri.
              </>,
              <>
                <InlineHighlight color="#D1FAE5">Kanan</InlineHighlight> = geser ke kanan.
              </>,
            ]}
          />
        </InfoPanel>
      </div>
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

    <MacWindowCard left={X0} top={215} width={W} height={745} headerLabel="arah-atas-bawah.app" padding={34}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, height: '100%' }}>
        {/* Kartu 1: Atas = Melangkah Naik */}
        <InfoPanel
          bg={SKY_SOFT}
          padding={30}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ ...row, gap: 18 }}>
            <ArrowCommandBlock dir="up" size={88} label="Atas" />
            <SectionHeading size={36}>
              Atas = <Highlight color="#DBEAFE">Naik</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              width: '100%',
              background: WHITE,
              borderRadius: 22,
              border: `2.5px solid ${SKY}`,
              padding: '16px 24px',
              ...row,
              justifyContent: 'center',
              gap: 24,
            }}
          >
            <svg width={190} height={240} viewBox="0 0 210 260" fill="none">
              <path d="M36 58 H114 C126 58, 130 38, 114 34 C108 18, 80 18, 74 34 C56 30, 34 44, 36 58 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M164 18 L170 32 L185 34 L174 44 L177 59 L164 52 L151 59 L154 44 L143 34 L158 32 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
              <line x1="78" y1="74" x2="78" y2="246" stroke="#92400E" strokeWidth={10} strokeLinecap="round" />
              <line x1="138" y1="74" x2="138" y2="246" stroke="#92400E" strokeWidth={10} strokeLinecap="round" />
              {[104, 142, 180, 218].map((y) => (
                <line key={y} x1="78" y1={y} x2="138" y2={y} stroke="#D97706" strokeWidth={8} strokeLinecap="round" />
              ))}
              <path d="M174 220 V110 M158 128 L174 106 L190 128" stroke={SKY} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <BikoMascot pose="jump" width={165} />
          </div>

          <div style={{ width: '100%' }}>
            <BulletList
              bulletColor={SKY}
              fontSize={24}
              gap={10}
              items={[
                <>
                  Melangkah <InlineHighlight color={WHITE}>naik ke atas</InlineHighlight>.
                </>,
                <>Seperti naik tangga ke awan!</>,
              ]}
            />
          </div>
        </InfoPanel>

        {/* Kartu 2: Bawah = Melangkah Turun */}
        <InfoPanel
          bg={SUNNY_SOFT}
          padding={30}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ ...row, gap: 18 }}>
            <ArrowCommandBlock dir="down" size={88} label="Bawah" />
            <SectionHeading size={36}>
              Bawah = <Highlight color={STABILO}>Turun</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              width: '100%',
              background: WHITE,
              borderRadius: 22,
              border: `2.5px solid ${SUNNY}`,
              padding: '16px 24px',
              ...row,
              justifyContent: 'center',
              gap: 18,
            }}
          >
            <BikoMascot pose="wave" width={155} style={{ marginBottom: 30 }} />
            <svg width={205} height={240} viewBox="0 0 220 260" fill="none">
              <path d="M24 54 Q96 76 138 174" stroke={CORAL} strokeWidth={16} strokeLinecap="round" fill="none" />
              <path d="M24 54 Q96 76 138 174" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" fill="none" />
              <path d="M178 60 V168 M162 150 L178 172 L194 150" stroke={SUNNY} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
              <rect x="92" y="182" width="102" height="58" rx="12" fill="#B45309" stroke={CHARCOAL} strokeWidth={4} />
              <path d="M92 204 H194" stroke={SUNNY} strokeWidth={8} />
              <rect x="134" y="194" width="18" height="22" rx="5" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
            </svg>
          </div>

          <div style={{ width: '100%' }}>
            <BulletList
              bulletColor={SUNNY}
              fontSize={24}
              gap={10}
              items={[
                <>
                  Melangkah <InlineHighlight color={WHITE}>turun ke bawah</InlineHighlight>.
                </>,
                <>Seperti meluncur ke peti harta!</>,
              ]}
            />
          </div>
        </InfoPanel>
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

    <MacWindowCard left={X0} top={215} width={W} height={745} headerLabel="arah-kiri-kanan.app" padding={34}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, height: '100%' }}>
        {/* Kartu 1: Kiri */}
        <InfoPanel
          bg={CORAL_SOFT}
          padding={30}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ ...row, gap: 18 }}>
            <ArrowCommandBlock dir="left" size={88} label="Kiri" />
            <SectionHeading size={36}>
              Geser ke <Highlight color="#FEE2E2">Kiri</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              width: '100%',
              background: WHITE,
              borderRadius: 22,
              border: `2.5px solid ${CORAL}`,
              padding: '18px 24px',
              ...row,
              justifyContent: 'center',
              gap: 16,
            }}
          >
            <svg width={170} height={100} viewBox="0 0 180 100" fill="none">
              <path d="M164 50 H30 M56 26 L24 50 L56 74" stroke={CORAL} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <BikoMascot pose="point-left" width={210} />
          </div>

          <div style={{ width: '100%' }}>
            <BulletList
              bulletColor={CORAL}
              fontSize={24}
              gap={10}
              items={[
                <>
                  Jalan ke <InlineHighlight color={WHITE}>sebelah kiri</InlineHighlight> layar.
                </>,
                <>Ikuti arah tangan kirimu!</>,
              ]}
            />
          </div>
        </InfoPanel>

        {/* Kartu 2: Kanan */}
        <InfoPanel
          bg={TEAL_SOFT}
          padding={30}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ ...row, gap: 18 }}>
            <ArrowCommandBlock dir="right" size={88} label="Kanan" />
            <SectionHeading size={36}>
              Geser ke <Highlight color="#D1FAE5">Kanan</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              width: '100%',
              background: WHITE,
              borderRadius: 22,
              border: `2.5px solid ${TEAL}`,
              padding: '18px 24px',
              ...row,
              justifyContent: 'center',
              gap: 16,
            }}
          >
            <BikoMascot pose="point-right" width={210} />
            <svg width={170} height={100} viewBox="0 0 180 100" fill="none">
              <path d="M16 50 H150 M124 26 L156 50 L124 74" stroke={TEAL} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ width: '100%' }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={24}
              gap={10}
              items={[
                <>
                  Jalan ke <InlineHighlight color={WHITE}>sebelah kanan</InlineHighlight> layar.
                </>,
                <>Ikuti arah tangan kananmu!</>,
              ]}
            />
          </div>
        </InfoPanel>
      </div>
    </MacWindowCard>
  </JuniorFrame>
);

// ============================================================================
// SLIDE 06 — Permainan Cepat: Ayo Tebak Arahnya! (Interactive Scenario)
// ============================================================================
const Slide06TebakArah: Page = () => {
  const [choice, setChoice] = useState<'left' | 'right' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" top={114}>
        Biko Harus <Highlight>Jalan ke Mana?</Highlight>
      </SlideTitle>

      {/* Top 3-Box Horizontal Scenario Map (Flat InfoPanel) */}
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
            background: choice === 'right' ? '#F8FAFC' : SKY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            ...row,
            justifyContent: 'center',
            gap: 12,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {choice !== 'right' && <BikoTokenSvg size={50} />}
          <span>{choice === 'right' ? 'Start' : 'Biko'}</span>
        </div>

        <StepArrowConnector color={TEAL} />

        <div
          style={{
            width: 280,
            height: 92,
            borderRadius: 18,
            background: choice === 'right' ? TEAL_SOFT : '#F8FAFC',
            border: `2.5px solid ${CHARCOAL}`,
            ...row,
            justifyContent: 'center',
            gap: 10,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          {choice === 'right' ? <JuniorIcon name="arrow-right" size={34} /> : <span>Kotak Kosong</span>}
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
          {choice === 'right' ? (
            <>
              <BikoTokenSvg size={48} />
              <StarSvg size={44} />
            </>
          ) : (
            <>
              <StarSvg size={48} />
              <span>Bintang</span>
            </>
          )}
        </div>
      </InfoPanel>

      {/* Two Big Interactive Choice Cards */}
      <div style={{ ...abs(180, 380, 1560, 345), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        {/* Kartu A: Ke Kiri */}
        <button
          type="button"
          className="cpj5-card-btn"
          onClick={() => setChoice('left')}
          style={{
            borderRadius: 30,
            background: choice === 'left' ? CORAL_SOFT : WHITE,
            border: `4px solid ${choice === 'left' ? CORAL : CHARCOAL}`,
            boxShadow: `0 8px 0 ${choice === 'left' ? CORAL : SKY}`,
            padding: '22px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, color: '#B91C1C', letterSpacing: '0.06em' }}>
            PILIHAN A (KLIK)
          </span>

          <ArrowCommandBlock dir="left" size={118} />

          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Ke Kiri
          </span>
        </button>

        {/* Kartu B: Ke Kanan */}
        <button
          type="button"
          className="cpj5-card-btn"
          onClick={() => setChoice('right')}
          style={{
            borderRadius: 30,
            background: choice === 'right' ? TEAL_SOFT : WHITE,
            border: `4px solid ${choice === 'right' ? TEAL : CHARCOAL}`,
            boxShadow: `0 8px 0 ${choice === 'right' ? TEAL : SUNNY}`,
            padding: '22px 36px',
            ...centerCol,
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, color: '#047857', letterSpacing: '0.06em' }}>
            PILIHAN B (KLIK)
          </span>

          <ArrowCommandBlock dir="right" size={118} />

          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Ke Kanan
          </span>
        </button>
      </div>

      {/* Bottom Center: Biko + Flat Feedback Panel */}
      <div style={{ ...abs(240, 742, 1440, 260), ...row, justifyContent: 'center', gap: 36 }}>
        <BikoMascot pose={choice === 'right' ? 'thumbs-up' : 'question'} width={215} />

        <InfoPanel
          bg={choice === 'right' ? TEAL_SOFT : choice === 'left' ? CORAL_SOFT : STABILO}
          borderColor={choice === 'right' ? TEAL : choice === 'left' ? CORAL : CHARCOAL}
          padding={24}
          style={{ minWidth: 560, ...centerCol }}
        >
          {choice === 'right' && (
            <SectionHeading icon="check" size={32} accentColor="#047857">
              Benar! Jalan ke Kanan ke Bintang!
            </SectionHeading>
          )}
          {choice === 'left' && (
            <SectionHeading icon="thinking" size={32} accentColor="#B91C1C">
              Hampir! Bintangnya ada di sebelah kanan!
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
      <MacWindowCard left={X0} top={215} width={960} height={745} headerLabel="peta-kotak-3x3.app" padding={28}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
            background: 'linear-gradient(180deg, #EFF6FF 0%, #FFFBEB 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 152px)', gap: 16 }}>
            {Array.from({ length: 9 }).map((_, idx) => {
              const isBikoHere = idx === bikoIndex;
              const isStar = idx === 4;
              const isVisited = idx === 6 || (step >= 1 && idx === 7);
              return (
                <div
                  key={idx}
                  style={{
                    width: 152,
                    height: 140,
                    borderRadius: 20,
                    background: isStar ? SUNNY_SOFT : isVisited ? TEAL_SOFT : WHITE,
                    border: `3px solid ${isBikoHere ? TEAL : CHARCOAL}`,
                    boxShadow: isBikoHere ? `0 0 0 5px ${STABILO}` : undefined,
                    ...centerCol,
                    position: 'relative',
                  }}
                >
                  {isBikoHere ? (
                    isStar ? (
                      <div style={{ ...row, gap: 4 }}>
                        <BikoTokenSvg size={58} />
                        <StarSvg size={50} />
                      </div>
                    ) : (
                      <BikoTokenSvg size={68} />
                    )
                  ) : isStar ? (
                    <StarSvg size={64} />
                  ) : idx === 6 ? (
                    <JuniorIcon name="arrow-right" size={34} />
                  ) : idx === 7 && step >= 1 ? (
                    <JuniorIcon name="arrow-up" size={34} />
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Interactive Step Replay Buttons */}
          <div style={{ ...row, gap: 14 }}>
            {(
              [
                { s: 0 as const, label: 'Mulai' },
                { s: 1 as const, label: '1. Kanan' },
                { s: 2 as const, label: '2. Atas' },
              ] as const
            ).map((btn) => (
              <button
                key={btn.s}
                type="button"
                className="cpj5-card-btn"
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

      {/* Right Column: InfoPanels with SectionHeading + BulletList + Biko */}
      <div style={{ ...abs(1100, 215, 720, 745), display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
        <InfoPanel bg={WHITE} borderColor={SKY} padding={26}>
          <SectionHeading icon="map" size={28}>
            Aturan Peta Kotak
          </SectionHeading>
          <div style={{ marginTop: 12 }}>
            <BulletList
              bulletColor={SKY}
              fontSize={24}
              gap={12}
              items={[
                <>
                  <InlineHighlight color={SKY_SOFT}>1 Panah</InlineHighlight> = jalan <InlineHighlight>1 Kotak</InlineHighlight>.
                </>,
                <>
                  Hitung kotaknya <InlineHighlight color="#D1FAE5">pelan-pelan</InlineHighlight>!
                </>,
              ]}
            />
          </div>
        </InfoPanel>

        <InfoPanel bg={SUNNY_SOFT} padding={26}>
          <SectionHeading icon="footprints" size={28}>
            Jejak Biko ke Bintang
          </SectionHeading>
          <div style={{ marginTop: 12 }}>
            <BulletList
              bulletColor={TEAL}
              fontSize={24}
              gap={10}
              items={[
                <>
                  Langkah 1: <InlineHighlight color="#D1FAE5">1 Kotak Kanan</InlineHighlight>.
                </>,
                <>
                  Langkah 2: <InlineHighlight color={SKY_SOFT}>1 Kotak Atas</InlineHighlight>.
                </>,
              ]}
            />
          </div>
        </InfoPanel>

        <div style={{ ...row, justifyContent: 'center' }}>
          <BikoMascot pose="point-left" width={260} speechBubble="1 Kanan, 1 Atas!" />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Komandan: Biar Tidak Nyasar! (2 InfoPanels + BulletList)
// ============================================================================
const Slide08JurusKomando: Page = () => (
  <JuniorFrame badge="TIPS KOMANDAN" accentDot={TEAL}>
    <SlideTitle>
      Rahasia Biar <Highlight>Tidak Nyasar!</Highlight>
    </SlideTitle>

    <MacWindowCard left={X0} top={215} width={1320} height={745} headerLabel="tips-komandan.app" padding={34}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, height: '100%' }}>
        {/* Kartu 1 */}
        <InfoPanel
          bg={SKY_SOFT}
          padding={28}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em' }}>
              JURUS #1
            </span>
            <SectionHeading icon="tap" size={32}>
              Hitung <Highlight color="#DBEAFE">Kotaknya</Highlight>
            </SectionHeading>
          </div>

          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              border: `2.5px solid ${SKY}`,
              padding: '28px 20px',
              ...row,
              justifyContent: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 18,
                background: SKY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              <BikoTokenSvg size={54} />
            </div>
            <StepArrowConnector color={SKY} size={28} />
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 18,
                background: SUNNY_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 36,
                fontWeight: 700,
                ...centerCol,
              }}
            >
              1
            </div>
            <StepArrowConnector color={SKY} size={28} />
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 18,
                background: TEAL_SOFT,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 36,
                fontWeight: 700,
                ...centerCol,
              }}
            >
              2
            </div>
          </div>

          <BulletList
            bulletColor={SKY}
            fontSize={23}
            gap={10}
            items={[
              <>
                Mulai hitung dari <InlineHighlight color={WHITE}>tempat Biko</InlineHighlight>.
              </>,
              <>
                Tunjuk kotak <InlineHighlight color="#DBEAFE">satu per satu</InlineHighlight>.
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
              JURUS #2
            </span>
            <SectionHeading icon="puzzle" size={32}>
              Susun <Highlight color="#D1FAE5">Panahnya</Highlight>
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
              gap: 18,
            }}
          >
            <ArrowCommandBlock dir="right" size={94} label="Kanan" />
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700 }}>+</span>
            <ArrowCommandBlock dir="up" size={94} label="Atas" />
          </div>

          <BulletList
            bulletColor={TEAL}
            fontSize={23}
            gap={10}
            items={[
              <>
                Pasang blok panah <InlineHighlight color={WHITE}>berurutan</InlineHighlight>.
              </>,
              <>
                Cek lagi <InlineHighlight color="#D1FAE5">sebelum jalan</InlineHighlight>!
              </>,
            ]}
          />
        </InfoPanel>
      </div>
    </MacWindowCard>

    <BikoMascot
      pose="thumbs-up"
      width={340}
      speechBubble="Pasti sampai!"
      style={{ ...abs(1465, 325) }}
    />
  </JuniorFrame>
);

// ============================================================================
// SLIDE 09 — Misi Praktik: Bantu Biko Ambil Bintang! (Interactive Grid Game)
// ============================================================================
const MISSION_STEPS: { num: number; color: string; soft: string; title: string; sub: string }[] = [
  { num: 1, color: SKY, soft: SKY_SOFT, title: 'Lihat', sub: 'posisi bintang di peta' },
  { num: 2, color: SUNNY, soft: SUNNY_SOFT, title: 'Geser', sub: 'blok panah ke slot' },
  { num: 3, color: TEAL, soft: TEAL_SOFT, title: 'Jalan!', sub: 'Biko dapat bintang' },
];

// 3x3 Grid: Start at (row=2, col=0) -> idx 6; Target Star at (row=1, col=2) -> idx 5
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
      <SlideTitle top={104}>
        Misi <Highlight>Ambil Bintang Emas!</Highlight>
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

      {/* Interactive 2D Grid Adventure Board */}
      <MacWindowCard left={X0} top={352} width={1320} height={618} headerLabel="petualangan-bintang-2d.app" padding={22}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
            background: 'linear-gradient(180deg, #EFF6FF 0%, #FFFBEB 100%)',
            border: `2.5px solid ${CHARCOAL}`,
            padding: '18px 24px',
            display: 'grid',
            gridTemplateColumns: '410px 1fr',
            gap: 28,
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          {/* Left: 3x3 Adventure Map */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 122px)', gap: 12, justifyContent: 'center' }}>
            {Array.from({ length: 9 }).map((_, idx) => {
              const isBiko = idx === bikoIdx;
              const isStar = idx === 5;
              const isObstacle = idx === 3;
              return (
                <div
                  key={idx}
                  style={{
                    width: 122,
                    height: 122,
                    borderRadius: 18,
                    background: isStar ? SUNNY_SOFT : isObstacle ? '#E2E8F0' : WHITE,
                    border: `3px solid ${isBiko ? TEAL : CHARCOAL}`,
                    boxShadow: isBiko ? `0 0 0 4px ${STABILO}` : undefined,
                    ...centerCol,
                  }}
                >
                  {isBiko && isStar ? (
                    <div style={{ ...row, gap: 4 }}>
                      <BikoTokenSvg size={48} />
                      <StarSvg size={42} />
                    </div>
                  ) : isBiko ? (
                    <BikoTokenSvg size={64} />
                  ) : isStar ? (
                    <StarSvg size={60} />
                  ) : isObstacle ? (
                    <RockSvg size={56} />
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Right: Command Builder + Run */}
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '6px 0' }}>
            <div>
              <SectionHeading size={20}>1. Pilih Blok Panah:</SectionHeading>
              <div style={{ ...row, gap: 14, marginTop: 10 }}>
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

            <div>
              <div style={{ fontSize: 19, fontWeight: 800, color: MUTED, marginBottom: 10 }}>
                2. Urutan Perintah (Klik Slot untuk Hapus):
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
                    borderRadius: 16,
                    background: TEAL,
                    color: WHITE,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 5px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                >
                  <JuniorIcon name="play" size={22} />
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
                    borderRadius: 16,
                    background: WHITE,
                    color: CHARCOAL,
                    border: `3px solid ${CHARCOAL}`,
                    boxShadow: `0 4px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  <JuniorIcon name="reset" size={20} />
                  <span>Ulang</span>
                </button>
              </div>

              <div
                style={{
                  ...row,
                  gap: 8,
                  padding: '10px 18px',
                  borderRadius: 14,
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
                    <span>Belum pas! Coba: 2x Kanan, 1x Atas!</span>
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
      <div style={{ ...abs(1450, 415, 370, 520), ...centerCol }}>
        <BikoMascot
          pose={status === 'won' ? 'jump' : 'wave'}
          width={310}
          speechBubble={status === 'won' ? 'Dapat Bintang!' : 'Ayo beri komando!'}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 5 (Summary Bullets + Medal + Biko)
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
            animation: live ? `cpj5-confetti ${2.4 + (idx % 3) * 0.4}s ease-in-out infinite` : undefined,
          }}
        />
      ))}

      <SlideTitle align="center" top={104} size={58}>
        Hebat! Kamu <Highlight color={STABILO}>Komandan Arah!</Highlight>
      </SlideTitle>

      {/* Center Celebration & Summary Card */}
      <MacWindowCard left={180} top={210} width={1180} height={745} headerLabel="lencana-pertemuan-5" padding={34}>
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '430px 1fr', gap: 36, alignItems: 'center' }}>
          {/* Left: Gold Compass Medal + Flat Badge */}
          <div style={{ ...centerCol, gap: 22 }}>
            <svg
              width={255}
              height={250}
              viewBox="0 0 260 250"
              fill="none"
              style={{ animation: live ? 'cpj5-float 3s ease-in-out infinite' : undefined }}
            >
              <path d="M90 156 L66 238 L104 218 L122 240 L122 156 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M170 156 L194 238 L156 218 L138 240 L138 156 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="130" cy="98" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="130" cy="98" r="64" fill="#FEF3C7" stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M130 42 L140 72 L130 66 L120 72 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
              <path d="M130 154 L140 124 L130 130 L120 124 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
              <path d="M74 98 L104 88 L98 98 L104 108 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
              <path d="M186 98 L156 88 L162 98 L156 108 Z" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={2.5} strokeLinejoin="round" />
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
              <span>Lencana Komandan Panah</span>
            </div>
          </div>

          {/* Right: Concise Bullet Takeaways + 4 Arrow Preview */}
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
                  Kenal <InlineHighlight>4 arah panah</InlineHighlight>: Atas, Bawah, Kiri, Kanan.
                </>,
                <>
                  Aturan <InlineHighlight color={SKY_SOFT}>1 Panah = 1 Kotak</InlineHighlight> di peta.
                </>,
                <>
                  Menghitung kotak dari tempat <InlineHighlight color="#D1FAE5">Biko berdiri</InlineHighlight>.
                </>,
                <>
                  Memberi komando sampai dapat <InlineHighlight>bintang emas</InlineHighlight>!
                </>,
              ]}
            />

            <InfoPanel bg={SKY_SOFT} borderColor={BORDER_SOFT} padding={16} style={{ ...row, justifyContent: 'space-around' }}>
              <ArrowCommandBlock dir="up" size={62} />
              <ArrowCommandBlock dir="down" size={62} />
              <ArrowCommandBlock dir="left" size={62} />
              <ArrowCommandBlock dir="right" size={62} />
            </InfoPanel>
          </div>
        </div>
      </MacWindowCard>

      {/* Celebrating Jumping Biko on Right */}
      <div style={{ ...abs(1400, 390, 420, 500), ...centerCol }}>
        <BikoMascot
          pose="jump"
          width={365}
          badgeIcon={<JuniorIcon name="compass" size={28} />}
          speechBubble="Komandan Panah Juara!"
        />
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

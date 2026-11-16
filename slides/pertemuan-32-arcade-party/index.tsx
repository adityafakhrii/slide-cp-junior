import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-32-arcade-party';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj32-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj32-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-16px) scale(1.06); }
}
@keyframes cpj32-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj32-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj32-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj32-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.9); }
  50% { box-shadow: 0 0 0 14px rgba(251, 191, 36, 0); }
}
.cpj32-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj32-card-btn:hover {
  transform: translateY(-4px);
}
.cpj32-card-btn:active {
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

/** Cheerful star award chime for Arcade Party interactions */
function playPartyChime(celebration = false) {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const seq = celebration ? [523.25, 659.25, 783.99, 1046.5] : [587.33, 880];
    seq.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + i * 0.08;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.22, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.24);
    });
    setTimeout(() => {
      void ctx.close();
    }, 650);
  } catch {
    // Ignore audio blocks
  }
}

// ============================================================================
// Design System & Official CODEPOLITAN Junior Palette
// ============================================================================
export const design: DesignSystem = {
  palette: {
    bg: '#FFFBF0',
    text: '#1E1E2C',
    accent: '#FBBF24',
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
  accentDot = SUNNY,
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

      <svg
        aria-hidden
        width={42}
        height={42}
        viewBox="0 0 40 40"
        style={{
          ...abs(1750, 74),
          pointerEvents: 'none',
          animation: live ? 'cpj32-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 32 • Arcade Party!</span>
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
      <div style={{ ...row, gap: 10 }}>
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
            fontFamily: 'var(--osd-font-display)',
            fontSize: 19,
            fontWeight: 700,
            color: MUTED,
          }}
        >
          {headerLabel}
        </span>
      )}
    </div>
    <div style={{ flex: 1, padding, position: 'relative' }}>{children}</div>
  </div>
);

const BulletRow = ({
  icon,
  bgColor = SUNNY_SOFT,
  children,
  fontSize = 31,
}: {
  icon: JuniorIconName;
  bgColor?: string;
  children: ReactNode;
  fontSize?: number;
}) => (
  <div style={{ ...row, gap: 20, alignItems: 'center' }}>
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 20,
        background: bgColor,
        border: `2.8px solid ${CHARCOAL}`,
        boxShadow: `0 4px 0 ${CHARCOAL}`,
        ...centerCol,
        flexShrink: 0,
      }}
    >
      <JuniorIcon name={icon} size={34} />
    </div>
    <div style={{ fontSize, fontWeight: 700, lineHeight: 1.32, color: CHARCOAL }}>{children}</div>
  </div>
);

// ============================================================================
// Reusable Pertemuan 32 Visuals (Party Tic Cat, Appreciation Stars, ScratchJr UI)
// ============================================================================

const TicCatSvg = ({
  size = 130,
  waving = false,
  partyHat = false,
}: {
  size?: number;
  waving?: boolean;
  partyHat?: boolean;
}) => (
  <svg width={size} height={size} viewBox="0 0 140 155" fill="none">
    <ellipse cx="70" cy="141" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path d="M96 113 C118 111, 126 91, 114 81 C106 75, 100 83, 104 90 C106 95, 100 103, 92 103" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
    <ellipse cx="56" cy="133" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="133" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="70" cy="110" rx="27" ry="24" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="70" cy="112" rx="16" ry="15" fill={SUNNY_SOFT} />
    <path d={waving ? 'M44 97 C26 89, 22 73, 30 67 C37 62, 45 73, 46 87' : 'M45 101 C32 105, 32 119, 42 119 C48 119, 50 111, 48 103'} fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <path d="M94 101 C107 105, 107 119, 97 119 C91 119, 89 111, 91 103" fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <path d="M38 65 L36 33 L60 51 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    <path d="M102 65 L104 33 L80 51 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    <ellipse cx="70" cy="72" rx="34" ry="29" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="70" cy="81" rx="22" ry="15" fill={WHITE} />
    <circle cx="57" cy="68" r="5" fill={CHARCOAL} />
    <circle cx="83" cy="68" r="5" fill={CHARCOAL} />
    <circle cx="58.5" cy="66.2" r="1.8" fill={WHITE} />
    <circle cx="84.5" cy="66.2" r="1.8" fill={WHITE} />
    <polygon points="66,75 74,75 70,80" fill={CORAL} />
    <path d="M62 82 Q70 89 78 82" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" fill="none" />
    {partyHat && (
      <g>
        <polygon points="52,44 70,8 88,44" fill={SKY} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
        <line x1="59" y1="31" x2="81" y2="31" stroke={SUNNY} strokeWidth={4} />
        <circle cx="70" cy="8" r="6" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.5} />
      </g>
    )}
  </svg>
);

const AppreciationStarSvg = ({
  size = 96,
  fill = SUNNY,
  ribbon = TEAL,
}: {
  size?: number;
  fill?: string;
  ribbon?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 110 110" fill="none">
    <path d="M38 72 L28 102 L44 92 L54 104 L58 76 Z" fill={ribbon} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
    <path d="M72 72 L82 102 L66 92 L56 104 L52 76 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
    <polygon
      points="55,10 66,34 92,38 73,56 78,82 55,70 32,82 37,56 18,38 44,34"
      fill={fill}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <circle cx="47" cy="48" r="3" fill={CHARCOAL} />
    <circle cx="63" cy="48" r="3" fill={CHARCOAL} />
    <path d="M48 56 Q55 62 62 56" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" fill="none" />
  </svg>
);

/** Authentic ScratchJr Presentation / Arcade Showcase UI */
const AuthenticScratchJrArcadeUI = ({
  stars,
  onAwardStar,
  highlightFullscreen = false,
  width = 880,
  height = 540,
}: {
  stars: Record<number, number>;
  onAwardStar: (gameId: number) => void;
  highlightFullscreen?: boolean;
  width?: number | string;
  height?: number | string;
}) => {
  const games = [
    { id: 1, title: 'Gelembung', bg: SKY_SOFT, border: SKY, icon: 'bubble' as JuniorIconName },
    { id: 2, title: 'Labirin', bg: TEAL_SOFT, border: TEAL, icon: 'road' as JuniorIconName },
    { id: 3, title: 'Mini Soccer', bg: SUNNY_SOFT, border: SUNNY, icon: 'soccer-ball' as JuniorIconName },
  ];

  const totalStars = (stars[1] || 0) + (stars[2] || 0) + (stars[3] || 0);

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 24,
        background: '#CBD5E1',
        border: `3.5px solid ${CHARCOAL}`,
        boxShadow: `0 8px 0 ${CHARCOAL}`,
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        boxSizing: 'border-box',
      }}
    >
      {/* Top Toolbar with Presentation (Fullscreen) Highlight */}
      <div
        style={{
          height: 48,
          borderRadius: 14,
          background: '#DBEAFE',
          border: `2.5px solid ${CHARCOAL}`,
          padding: '0 12px',
          ...row,
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ ...row, gap: 8 }}>
          <div style={{ width: 38, height: 34, borderRadius: 10, background: '#93C5FD', border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="house" size={22} />
          </div>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 16, fontWeight: 700, color: '#1E3A8A' }}>
            ScratchJr • Arcade
          </span>
        </div>

        <div style={{ ...row, gap: 7 }}>
          <div
            style={{
              width: 44,
              height: 40,
              borderRadius: 11,
              background: highlightFullscreen ? SUNNY : SUNNY_SOFT,
              border: `3px solid ${highlightFullscreen ? CORAL : CHARCOAL}`,
              ...centerCol,
              animation: highlightFullscreen ? 'cpj32-pulse 1.8s infinite' : undefined,
            }}
          >
            <JuniorIcon name="fullscreen" size={24} />
          </div>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="grid" size={22} />
          </div>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="landscape" size={22} />
          </div>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="abc" size={22} />
          </div>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="reset" size={22} />
          </div>
          <div style={{ width: 44, height: 36, borderRadius: 10, background: TEAL_SOFT, border: `2px solid ${TEAL}`, ...centerCol }}>
            <JuniorIcon name="flag" size={24} />
          </div>
        </div>

        <div style={{ padding: '4px 12px', borderRadius: 10, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 13, fontWeight: 700, ...row, gap: 5 }}>
          <JuniorIcon name="star" size={16} />
          <span>{totalStars} Bintang</span>
        </div>
      </div>

      {/* Middle Showcase: 3 Mini-Game Arcade Booth Cards inside ScratchJr Stage */}
      <div style={{ flex: 1, display: 'flex', gap: 10, minHeight: 0 }}>
        {/* Left Characters Sidebar */}
        <div style={{ width: 88, borderRadius: 16, background: '#E2E8F0', border: `2.5px solid ${CHARCOAL}`, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: '100%', height: 52, borderRadius: 12, background: WHITE, border: `3px solid ${SUNNY}`, ...centerCol }}>
            <TicCatSvg size={42} partyHat />
          </div>
          <div style={{ width: '100%', height: 52, borderRadius: 12, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="gamepad" size={28} />
          </div>
          <div style={{ marginTop: 'auto', opacity: 0.85 }}>
            <JuniorIcon name="plus-circle" size={26} />
          </div>
        </div>

        {/* Center Arcade Party Stage */}
        <div
          style={{
            flex: 1,
            borderRadius: 18,
            border: `3px solid ${CHARCOAL}`,
            background: 'linear-gradient(180deg, #EFF6FF 0%, #FFFBF0 100%)',
            padding: 14,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: '#1E3A8A' }}>
              Klik Bintang untuk Mengapresiasi Game Teman!
            </span>
            <JuniorIcon name="party" size={26} />
          </div>

          <div style={{ flex: 1, display: 'flex', gap: 12, alignItems: 'stretch', marginTop: 8 }}>
            {games.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => onAwardStar(g.id)}
                className="cpj32-card-btn"
                style={{
                  flex: 1,
                  borderRadius: 18,
                  background: g.bg,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 5px 0 ${g.border}`,
                  padding: '10px 8px',
                  ...centerCol,
                  gap: 8,
                }}
              >
                <JuniorIcon name={g.icon} size={44} />
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 17, fontWeight: 700, color: CHARCOAL }}>
                  {g.title}
                </span>
                <div style={{ ...row, gap: 4, padding: '3px 10px', borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}`, fontSize: 13, fontWeight: 800 }}>
                  <JuniorIcon name="star" size={16} />
                  <span>{stars[g.id] || 0}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Page 1 Thumbnail Highlighted */}
        <div style={{ width: 90, borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: '100%', height: 58, borderRadius: 12, background: SUNNY_SOFT, border: `3px solid ${SUNNY}`, ...centerCol, position: 'relative' }}>
            <JuniorIcon name="gamepad" size={28} />
            <span style={{ position: 'absolute', right: 3, top: 3, width: 20, height: 20, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 12, fontWeight: 700, ...centerCol }}>
              1
            </span>
          </div>
          <JuniorIcon name="plus-circle" size={26} />
        </div>
      </div>

      {/* Bottom Coding Category Strip */}
      <div
        style={{
          height: 54,
          borderRadius: 14,
          background: WHITE,
          border: `2.5px solid ${CHARCOAL}`,
          padding: '0 14px',
          ...row,
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ ...row, gap: 8 }}>
          {(['dot-yellow', 'dot-blue', 'dot-purple', 'dot-green', 'dot-orange', 'dot-red'] as JuniorIconName[]).map((d) => (
            <JuniorIcon key={d} name={d} size={20} />
          ))}
        </div>
        <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 15, fontWeight: 700, color: '#047857' }}>
          Siap Mode Presentasi Arcade Party!
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Cover)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  const [stars, setStars] = useState<Record<number, number>>({ 1: 1, 2: 1, 3: 1 });

  const handleAward = (id: number) => {
    playPartyChime(false);
    setStars((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 32" accentDot={SUNNY}>
      {/* Left Hero Column */}
      <div style={{ ...abs(X0, 210, 860, 700), display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            alignSelf: 'flex-start',
            padding: '10px 22px',
            borderRadius: 999,
            background: SUNNY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#92400E',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="party" size={24} />
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          <Highlight>Arcade Party!</Highlight> Serunya
          <br />
          Mencoba Game Teman!
        </h1>

        <p
          style={{
            margin: '28px 0 36px',
            fontSize: 31,
            fontWeight: 700,
            lineHeight: 1.38,
            color: MUTED,
            maxWidth: 790,
          }}
        >
          Bermain Bersama &amp; Memberi Bintang Apresiasi
        </p>

        {/* Quick Pill Highlights */}
        <div style={{ ...row, gap: 18 }}>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: SKY,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="gamepad" size={28} />
            <span>Playtesting Seru!</span>
          </div>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: SUNNY,
              color: CHARCOAL,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="star-glow" size={28} />
            <span>Bintang Apresiasi</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Arcade ScratchJr + Party Biko & Party Tic */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #FEF9C3 0%, #EFF6FF 52%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SUNNY}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 120, zIndex: 2 }}>
          <AuthenticScratchJrArcadeUI
            stars={stars}
            onAwardStar={handleAward}
            width={600}
            height={380}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: -14,
            bottom: 24,
            zIndex: 3,
            ...row,
            alignItems: 'flex-end',
            animation: live ? 'cpj32-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={305}
            badgeIcon={<JuniorIcon name="star" size={24} />}
            speechBubble="Arcade Party!"
          />
          <div style={{ marginLeft: -36, marginBottom: 8 }}>
            <TicCatSvg size={155} waving partyHat />
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi Besar)
// ============================================================================
const Slide02Misi: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SPESIAL HARI INI" accentDot={SKY}>
      <SlideTitle>
        Apa Misi Kita di <Highlight>Arcade Party?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Pesta Game Bersama • Pertemuan 32"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu 1 (Biru) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${SKY}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ width: 270, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 14 }}>
              <JuniorIcon name="laptop" size={68} />
              <JuniorIcon name="happy" size={64} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Coba Mainkan <span style={{ color: '#1D4ED8' }}>Game Buatan Teman</span> (<em>Playtesting</em>)
            </div>
          </div>

          {/* Kartu 2 (Kuning) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${SUNNY}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ width: 270, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol }}>
              <AppreciationStarSvg size={140} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Beri <span style={{ color: '#B45309' }}>Bintang Apresiasi</span> &amp; Pujian Seru!
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj32-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="party" size={24} />}
          speechBubble="Ayo coba!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Apa Itu Playtesting di Arcade Party?
// ============================================================================
const Slide03KenalPlaytesting: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="KENAL PLAYTESTING" accentDot={SUNNY}>
      <SlideTitle>
        Serunya Jadi <Highlight>Tester Game!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Arcade Arena with Biko & Tic Swapping Seats */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Arena Pesta Game Teman"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ ...row, gap: 18 }}>
            <JuniorIcon name="party" size={44} />
            <JuniorIcon name="star-glow" size={48} />
            <JuniorIcon name="gamepad" size={46} />
            <JuniorIcon name="star-glow" size={48} />
            <JuniorIcon name="party" size={44} />
          </div>

          <div
            style={{
              width: '100%',
              height: 360,
              borderRadius: 28,
              background: 'linear-gradient(155deg, #EFF6FF 0%, #ECFDF5 100%)',
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              ...row,
              justifyContent: 'space-around',
              padding: '0 24px',
            }}
          >
            <div style={{ animation: live ? 'cpj32-float 2.8s ease-in-out infinite' : undefined }}>
              <BikoMascot pose="laptop" width={235} badgeIcon={<JuniorIcon name="gamepad" size={20} />} speechBubble="Keren gamemu!" />
            </div>

            <div style={{ ...centerCol, gap: 10 }}>
              <JuniorIcon name="arrow-lr" size={56} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: '#047857' }}>
                Tukar Giliran!
              </span>
            </div>

            <div style={{ animation: live ? 'cpj32-hop 2.6s ease-in-out infinite' : undefined }}>
              <TicCatSvg size={180} waving partyHat />
            </div>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
            Saling Mencoba &amp; Saling Mengapresiasi Karya!
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={980}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Arti Playtesting"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="gamepad" bgColor={SKY_SOFT} fontSize={32}>
              <strong>Playtesting:</strong> Mencoba memainkan game buatan teman
            </BulletRow>
            <BulletRow icon="heart" bgColor={CORAL_SOFT} fontSize={32}>
              Ikut <strong>Senang &amp; Memberi Semangat</strong> atas karya teman!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Semua pembuat game hebat belajar menjadi <strong>pemain yang ramah</strong> saat mencoba game karya teman-temannya!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Cek Siap Pameran: Siapkan Game Terbaikmu!
// ============================================================================
const Slide04SiapPameran: Page = () => {
  const [stars, setStars] = useState<Record<number, number>>({ 1: 2, 2: 2, 3: 2 });

  return (
    <JuniorFrame badge="CEK SIAP PAMERAN" accentDot={TEAL}>
      <SlideTitle>
        Siapkan <Highlight>Game Terbaikmu!</Highlight>
      </SlideTitle>

      {/* Top 3 Sequential Step Cards */}
      <div style={{ ...abs(X0, 224, W, 160), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'gamepad' as JuniorIconName,
            text: (
              <>
                Buka <strong>Game Favoritmu</strong> (<em>Gelembung / Labirin / Soccer</em>)
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'step-1' as JuniorIconName,
            text: (
              <>
                Ketuk <strong>Halaman 1</strong> agar siap dimainkan
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'fullscreen' as JuniorIconName,
            text: (
              <>
                Klik tombol <strong>Layar Penuh</strong> di atas!
              </>
            ),
          },
        ].map((item) => (
          <div
            key={item.num}
            style={{
              flex: 1,
              borderRadius: 22,
              background: item.bg,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              padding: '18px 22px',
              ...row,
              gap: 16,
            }}
          >
            <div style={{ width: 58, height: 58, borderRadius: 18, background: item.badgeBg, color: item.badgeText, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
              {item.num}
            </div>
            <div style={{ fontSize: 23, fontWeight: 800, lineHeight: 1.24 }}>
              <JuniorIcon name={item.icon} size={28} style={{ marginRight: 8 }} />
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Centered ScratchJr Interface Highlighting Fullscreen Presentation Mode Button */}
      <div style={{ ...abs(340, 415, 1240, 545) }}>
        <AuthenticScratchJrArcadeUI
          stars={stars}
          highlightFullscreen
          onAwardStar={(id) => {
            playPartyChime(false);
            setStars((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
          }}
          width={1240}
          height={545}
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus Tester Hebat: 3 Langkah Main Game Teman!
// ============================================================================
const Slide05JurusTester: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="JURUS TESTER HEBAT" accentDot={SKY}>
      <SlideTitle>
        <Highlight>3 Langkah</Highlight> Mencoba Game Teman!
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Tata Cara Ramah Bermain Game Teman"
        padding={34}
      >
        <div style={{ display: 'flex', gap: 28, height: '100%' }}>
          {[
            {
              step: 'LANGKAH 1',
              bg: SKY_SOFT,
              accent: SKY,
              badgeText: WHITE,
              icon: 'raise-hand' as JuniorIconName,
              title: 'Minta Izin Ramah',
              desc: '"Boleh aku coba gamemu?"',
            },
            {
              step: 'LANGKAH 2',
              bg: SUNNY_SOFT,
              accent: SUNNY,
              badgeText: CHARCOAL,
              icon: 'mouse' as JuniorIconName,
              title: 'Mainkan Pelan-Pelan',
              desc: 'Ikuti aturan main dengan lembut',
            },
            {
              step: 'LANGKAH 3',
              bg: TEAL_SOFT,
              accent: TEAL,
              badgeText: WHITE,
              icon: 'star-glow' as JuniorIconName,
              title: 'Beri Bintang!',
              desc: 'Ucapkan pujian & terima kasih!',
            },
          ].map((card) => (
            <div
              key={card.step}
              style={{
                flex: 1,
                borderRadius: 24,
                background: card.bg,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 8px 0 ${card.accent}`,
                padding: '28px 22px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'center',
              }}
            >
              <div style={{ padding: '7px 20px', borderRadius: 99, background: card.accent, color: card.badgeText, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                {card.step}
              </div>

              <div style={{ width: 170, height: 170, borderRadius: 32, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol }}>
                <JuniorIcon name={card.icon} size={96} />
              </div>

              <div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: CHARCOAL, marginBottom: 8 }}>
                  {card.title}
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: MUTED, lineHeight: 1.3 }}>
                  {card.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1475, 345, 360, 560),
          ...centerCol,
          animation: live ? 'cpj32-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={335}
          badgeIcon={<JuniorIcon name="raise-hand" size={22} />}
          speechBubble="Sopan & ramah!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Ucapan Mana yang Bikin Teman Senang?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1620} top={122} size={48}>
        Setelah Mencoba Game Teman, Kita <Highlight>Ucapkan Apa?</Highlight>
      </SlideTitle>

      {/* Interactive Choice Cards */}
      <div style={{ ...abs(170, 245, 1580, 460), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Pujian Hangat) */}
        <button
          type="button"
          onClick={() => {
            playPartyChime(false);
            setPicked('A');
          }}
          className="cpj32-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'A' ? TEAL_SOFT : WHITE,
            border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'A' ? TEAL : CHARCOAL}`,
            padding: 30,
            ...centerCol,
            gap: 18,
            position: 'relative',
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN A
          </div>

          <div style={{ marginTop: 18, padding: '20px 28px', borderRadius: 24, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 14 }}>
            <JuniorIcon name="star-glow" size={44} />
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: CHARCOAL }}>
              &ldquo;Wah, gamemu seru sekali!&rdquo;
            </span>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: '#047857' }}>
            Pujian Hangat
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Pujian hangat membuat teman bangga dan senang!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Kurang Ramah) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj32-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'B' ? CORAL_SOFT : WHITE,
            border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'B' ? CORAL : CHARCOAL}`,
            padding: 30,
            ...centerCol,
            gap: 18,
            position: 'relative',
            animation: picked === 'B' ? 'cpj32-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 18, padding: '20px 28px', borderRadius: 24, background: CORAL_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 14 }}>
            <JuniorIcon name="sad" size={44} />
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
              &ldquo;Gamemu susah, aku tidak mau!&rdquo;
            </span>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CORAL }}>
            Kurang Ramah
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Ucapan itu bisa bikin teman sedih ya!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 735, 1540, 265), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj32-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={220}
            badgeIcon={<JuniorIcon name="star" size={22} />}
            speechBubble={picked === 'A' ? 'Ramah banget!' : 'Yang baik ya!'}
          />
        </div>
        <div style={{ padding: '22px 36px', borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...row, gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="star" size={36} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, color: CHARCOAL }}>
            Tunjuk ucapan yang paling baik di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Pilih 3 Bintang Apresiasimu!
// ============================================================================
const Slide07BintangApresiasi: Page = () => {
  const [lit, setLit] = useState<number[]>([0, 1, 2]);

  const toggleStar = (idx: number) => {
    playPartyChime(false);
    setLit((prev) => (prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx]));
  };

  const awards = [
    {
      idx: 0,
      bg: SKY_SOFT,
      accent: SKY,
      starFill: SKY,
      ribbon: CORAL,
      icon: 'palette' as JuniorIconName,
      title: 'Bintang Gambar Keren!',
      sub: 'Karakter & latarnya bagus',
    },
    {
      idx: 1,
      bg: SUNNY_SOFT,
      accent: SUNNY,
      starFill: SUNNY,
      ribbon: TEAL,
      icon: 'gamepad' as JuniorIconName,
      title: 'Bintang Seru Dimainkan!',
      sub: 'Asyik & menantang',
    },
    {
      idx: 2,
      bg: TEAL_SOFT,
      accent: TEAL,
      starFill: TEAL,
      ribbon: SUNNY,
      icon: 'speaker' as JuniorIconName,
      title: 'Bintang Aksi & Suara Lucu!',
      sub: 'Efeknya meriah',
    },
  ];

  return (
    <JuniorFrame badge="BINTANG APRESIASI" accentDot={SUNNY}>
      <SlideTitle>
        Beri <Highlight>Bintang Spesial</Highlight> untuk Teman!
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1720}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Pilih Penghargaan Bintang Favorit untuk Game Temanmu"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {awards.map((a) => {
            const isLit = lit.includes(a.idx);
            return (
              <button
                key={a.idx}
                type="button"
                onClick={() => toggleStar(a.idx)}
                className="cpj32-card-btn"
                style={{
                  flex: 1,
                  borderRadius: 26,
                  background: isLit ? a.bg : WHITE,
                  border: `3.5px solid ${CHARCOAL}`,
                  boxShadow: `0 8px 0 ${a.accent}`,
                  padding: '32px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                }}
              >
                <div style={{ padding: '10px 22px', borderRadius: 99, background: WHITE, border: `2.5px solid ${CHARCOAL}`, ...row, gap: 10 }}>
                  <JuniorIcon name={a.icon} size={28} />
                  <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                    KATEGORI {a.idx + 1}
                  </span>
                </div>

                <div style={{ transform: isLit ? 'scale(1.06)' : 'scale(0.95)', transition: 'transform 200ms ease' }}>
                  <AppreciationStarSvg size={185} fill={a.starFill} ribbon={a.ribbon} />
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, color: CHARCOAL, marginBottom: 10 }}>
                    {a.title}
                  </div>
                  <div style={{ fontSize: 25, fontWeight: 700, color: MUTED }}>
                    ({a.sub})
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Aturan Main di Arcade Party! (BOLEH vs JANGAN)
// ============================================================================
const Slide08AturanArcade: Page = () => {
  return (
    <JuniorFrame badge="ATURAN ARCADE PARTY" accentDot={TEAL}>
      <SlideTitle>
        Main Bersama dengan <Highlight>Tertib!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & HEBAT"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 14 }}>
            <div style={{ padding: '10px 26px', borderRadius: 99, background: TEAL, color: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={28} />
              <span>BOLEH</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BulletRow icon="mouse" bgColor={TEAL_SOFT} fontSize={30}>
              Klik mouse &amp; tombol dengan <strong>Lembut</strong>
            </BulletRow>
            <BulletRow icon="start-bump" bgColor={SUNNY_SOFT} fontSize={30}>
              <strong>Antre Bergantian</strong> dengan sabar
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <BikoMascot pose="laptop" width={190} badgeIcon={<JuniorIcon name="happy" size={18} />} speechBubble="Giliranmu!" />
            <TicCatSvg size={135} waving partyHat />
            <JuniorIcon name="check" size={62} />
          </div>
        </div>
      </MacWindowCard>

      {/* Kolom Kanan — JANGAN */}
      <MacWindowCard
        left={985}
        top={235}
        width={835}
        height={720}
        titleBarColor={CORAL_SOFT}
        headerLabel="JANGAN DILAKUKAN"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 14 }}>
            <div style={{ padding: '10px 26px', borderRadius: 99, background: CORAL, color: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={28} />
              <span>JANGAN</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BulletRow icon="puzzle" bgColor={CORAL_SOFT} fontSize={30}>
              <strong>Mengubah Kode</strong> teman tanpa izin
            </BulletRow>
            <BulletRow icon="warning" bgColor={SUNNY_SOFT} fontSize={30}>
              <strong>Merebut Mouse</strong> saat teman sedang bermain
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <JuniorIcon name="mouse" size={88} />
            <JuniorIcon name="warning" size={76} />
            <JuniorIcon name="cross" size={68} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Waktunya Arcade Party: Ayo Keliling & Mainkan!
// ============================================================================
const Slide09ArcadeParty: Page = () => {
  const live = useIsActivePage();
  const [stars, setStars] = useState<Record<number, number>>({ 1: 3, 2: 2, 3: 4 });

  const handleAward = (id: number) => {
    playPartyChime(true);
    setStars((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <JuniorFrame badge="WAKTUNYA ARCADE PARTY!" accentDot={SUNNY}>
      <SlideTitle>
        Ayo <Highlight>Keliling &amp; Mainkan!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'raise-hand' as JuniorIconName,
            text: (
              <>
                Kunjungi <strong>Meja Teman</strong> &amp; sapa ramah
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'gamepad' as JuniorIconName,
            text: (
              <>
                Mainkan <strong>Game Buatan Teman</strong> di Layar Penuh
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'star-glow' as JuniorIconName,
            text: (
              <>
                Berikan <strong>Bintang Apresiasi</strong> &amp; pujian terbaikmu!
              </>
            ),
          },
        ].map((item) => (
          <div
            key={item.num}
            style={{
              flex: 1,
              borderRadius: 22,
              background: item.bg,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              padding: '16px 22px',
              ...row,
              gap: 16,
            }}
          >
            <div style={{ width: 56, height: 56, borderRadius: 18, background: item.badgeBg, color: item.badgeText, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
              {item.num}
            </div>
            <div style={{ fontSize: 23, fontWeight: 800, lineHeight: 1.24 }}>
              <JuniorIcon name={item.icon} size={26} style={{ marginRight: 8 }} />
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Playable Arcade Party Showcase */}
      <div style={{ ...abs(X0, 400, 1240, 565) }}>
        <AuthenticScratchJrArcadeUI
          stars={stars}
          onAwardStar={handleAward}
          highlightFullscreen
          width={1240}
          height={565}
        />
      </div>

      {/* Cheering Biko & Tic */}
      <div style={{ ...abs(1375, 420, 465, 530), ...centerCol, gap: 14 }}>
        <div style={{ ...row, alignItems: 'flex-end', animation: live ? 'cpj32-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={285}
            badgeIcon={<JuniorIcon name="party" size={22} />}
            speechBubble="Keren semua!"
          />
          <div style={{ marginLeft: -25, marginBottom: 10 }}>
            <TicCatSvg size={160} waving partyHat />
          </div>
        </div>
        <button
          type="button"
          onClick={() => playPartyChime(true)}
          className="cpj32-card-btn"
          style={{
            padding: '14px 26px',
            borderRadius: 20,
            background: SUNNY,
            color: CHARCOAL,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 24,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          <JuniorIcon name="star-glow" size={26} />
          <span>Rayakan Arcade Party!</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 32 & Game Maker Cilik!
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="ARCADE PARTY SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(145, 220), animation: live ? 'cpj32-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(1710, 210), animation: live ? 'cpj32-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="trophy" size={52} />
      </div>
      <div aria-hidden style={{ ...abs(140, 790), animation: live ? 'cpj32-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={46} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={118} size={56}>
        Selamat! Kamu <Highlight>Game Maker Cilik Hebat!</Highlight>{' '}
        <JuniorIcon name="trophy" size={50} />{' '}
        <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Grand Graduation Celebration Center Card */}
      <MacWindowCard
        left={240}
        top={240}
        width={1080}
        height={710}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Lulus Level 1 • CODEPOLITAN Junior Arcade Party!"
        padding={32}
      >
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          {/* Bespoke Grand Gold Arcade Trophy + CODEPOLITAN JUNIOR Star Medal SVG */}
          <div style={{ animation: live ? 'cpj32-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={270} height={260} viewBox="0 0 260 250" fill="none">
              {/* Ribbons */}
              <path d="M90 154 L70 228 L104 206 L122 230 L126 160 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M170 154 L190 228 L156 206 L138 230 L134 160 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              {/* Outer Gold Medal */}
              <circle cx="130" cy="108" r="88" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="130" cy="108" r="73" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Trophy Cup */}
              <path d="M98 62 H162 V100 C162 122, 148 134, 130 134 C112 134, 98 122, 98 100 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M98 72 H82 C82 96, 94 102, 100 100" fill="none" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
              <path d="M162 72 H178 C178 96, 166 102, 160 100" fill="none" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
              <rect x="122" y="134" width="16" height="16" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.5} />
              <rect x="104" y="150" width="52" height="14" rx="5" fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Banner reading CODEPOLITAN JUNIOR */}
              <rect x="64" y="168" width="132" height="26" rx="10" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
              <text x="130" y="186" textAnchor="middle" fill={WHITE} fontSize="11.5" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
                CODEPOLITAN JUNIOR
              </text>
            </svg>
          </div>

          <div
            style={{
              padding: '14px 36px',
              borderRadius: 99,
              background: SUNNY,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 32,
              fontWeight: 700,
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="medal" size={34} />
            <span>Lencana Utama Game Maker &amp; Tester Apresiatif</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.38,
              maxWidth: 940,
              color: CHARCOAL,
            }}
          >
            Kamu sudah jago <Highlight color="#D1FAE5">Membuat Game Sendiri</Highlight> &amp;{' '}
            <Highlight color="#DBEAFE">Menghargai Karya Teman!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Party Tic Celebrating */}
      <div style={{ ...abs(1355, 415, 495, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="trophy" size={22} />}
            speechBubble="Game Maker!"
          />
          <div style={{ animation: live ? 'cpj32-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <TicCatSvg size={190} waving partyHat />
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// Speaker Notes (Talk Track for Mentors teaching Ages 5–7)
// ============================================================================
export const notes: (string | undefined)[] = [
  `Selamat datang di Pertemuan 32 — Arcade Party! 🎮🎉
Hari spesial penutup rangkaian game Level 1: anak-anak bermain bersama dan memberi Bintang Apresiasi pada game buatan teman!`,

  `Dua misi spesial di Arcade Party:
1. Mencoba memainkan game buatan teman (Playtesting).
2. Memberi Bintang Apresiasi & pujian seru atas karya teman!`,

  `Apa itu Playtesting?
Playtesting artinya mencoba memainkan game buatan teman, ikut senang melihat ide teman, dan memberi semangat!`,

  `Cek Siap Pameran sebelum berkeliling:
1. Buka Game Favoritmu (Gelembung, Labirin, atau Mini Soccer).
2. Ketuk Halaman 1 agar mulai dari awal.
3. Klik tombol Layar Penuh (Presentation Mode) di toolbar atas!`,

  `Jurus Tester Hebat — 3 Langkah Main Game Teman:
1. Minta izin ramah: "Boleh aku coba gamemu?"
2. Mainkan pelan-pelan dan ikuti aturannya.
3. Beri Bintang Apresiasi & ucapkan terima kasih!`,

  `Permainan Cepat! Ayo tebak bersama:
Setelah mencoba game teman, ucapan mana yang bikin teman senang — Pilihan A ("Wah, gamemu seru sekali!") atau Pilihan B?`,

  `Pilih 3 Bintang Apresiasi spesial untuk teman:
- Bintang Gambar Keren! (Biru)
- Bintang Seru Dimainkan! (Emas)
- Bintang Aksi & Suara Lucu! (Hijau)`,

  `Aturan Main di Arcade Party:
BOLEH klik mouse/tombol dengan lembut dan antre bergantian dengan sabar.
JANGAN mengubah kode teman tanpa izin atau merebut mouse saat teman bermain!`,

  `Waktunya Arcade Party — Ayo Keliling & Mainkan!
1. Kunjungi meja teman & sapa ramah. 2. Mainkan gamenya di Layar Penuh. 3. Berikan Bintang Apresiasi & pujian terbaikmu!`,

  `Selamat! Kalian semua sudah menjadi Game Maker Cilik Hebat! 🏆🎉
Terima kasih sudah menyelesaikan Level 1 Code Explorer dan meraih Lencana Utama Game Maker & Tester Apresiatif!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 32 — Arcade Party!',
  createdAt: '2026-11-16T15:05:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03KenalPlaytesting,
  Slide04SiapPameran,
  Slide05JurusTester,
  Slide06AyoTebak,
  Slide07BintangApresiasi,
  Slide08AturanArcade,
  Slide09ArcadeParty,
  Slide10Lencana,
] satisfies Page[];

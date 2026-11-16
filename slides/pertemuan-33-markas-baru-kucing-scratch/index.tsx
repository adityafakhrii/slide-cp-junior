import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-33-markas-baru-kucing-scratch';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj33-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj33-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj33-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj33-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj33-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj33-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.9); }
  50% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
}
.cpj33-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj33-card-btn:hover {
  transform: translateY(-4px);
}
.cpj33-card-btn:active {
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

/** Playful friendly synth chime when testing Scratch 3.0 Green Flag / Stage */
function playScratchChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.14);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.24);
    setTimeout(() => {
      void ctx.close();
    }, 350);
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
    accent: '#FB923C',
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
const ORANGE = '#FB923C';
const ORANGE_SOFT = '#FFF7ED';
const SCRATCH_BLUE = '#4D97FF';

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
  accentDot = ORANGE,
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
          animation: live ? 'cpj33-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: ORANGE,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 33 • Markas Baru Kucing Scratch!</span>
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
  bgColor = SKY_SOFT,
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
// Reusable Pertemuan 33 Visuals (Scratch Cat, Friend Sprite, Scratch 3.0 UI)
// ============================================================================

const ScratchCatSvg = ({ size = 115, waving = false }: { size?: number; waving?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <ellipse cx="70" cy="128" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    {/* Tail */}
    <path d="M40 100 C20 96, 14 78, 25 69 C32 63, 38 71, 35 78 C33 83, 38 90, 46 90" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    {/* Feet */}
    <ellipse cx="56" cy="120" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="120" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} />
    {/* Body */}
    <ellipse cx="70" cy="96" rx="25" ry="23" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="98" rx="14" ry="14" fill={WHITE} />
    {/* Arms */}
    <path d="M46 86 C35 90, 35 103, 45 103" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d={waving ? 'M94 82 C112 72, 114 54, 105 50 C98 46, 92 58, 92 72' : 'M94 86 C105 90, 105 103, 95 103'} fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    {/* Pointy Cat Ears */}
    <path d="M36 52 L34 16 L60 35 Z" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
    <path d="M104 52 L106 16 L80 35 Z" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
    {/* Wide Scratch Cat Head */}
    <ellipse cx="70" cy="56" rx="38" ry="29" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} />
    {/* White Muzzle */}
    <ellipse cx="70" cy="65" rx="25" ry="16" fill={WHITE} />
    {/* Big Oval Eyes */}
    <ellipse cx="56" cy="50" rx="7" ry="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    <ellipse cx="84" cy="50" rx="7" ry="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    <circle cx="58" cy="50" r="3.4" fill={CHARCOAL} />
    <circle cx="82" cy="50" r="3.4" fill={CHARCOAL} />
    {/* Whiskers */}
    <line x1="28" y1="58" x2="42" y2="61" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
    <line x1="27" y1="67" x2="42" y2="67" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
    <line x1="98" y1="61" x2="113" y2="58" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
    <line x1="98" y1="67" x2="113" y2="67" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
    {/* Cute Smile */}
    <polygon points="66,58 74,58 70,63" fill={CHARCOAL} />
    <path d="M62 67 Q70 74 78 67" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
  </svg>
);

const FriendPuppySvg = ({ size = 78 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="88" rx="26" ry="5" fill="rgba(30,30,44,0.14)" />
    <ellipse cx="26" cy="46" rx="9" ry="18" fill="#92400E" stroke={CHARCOAL} strokeWidth={3.2} transform="rotate(15 26 46)" />
    <ellipse cx="74" cy="46" rx="9" ry="18" fill="#92400E" stroke={CHARCOAL} strokeWidth={3.2} transform="rotate(-15 74 46)" />
    <ellipse cx="50" cy="68" rx="20" ry="17" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.4} />
    <circle cx="50" cy="42" r="22" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={3.4} />
    <circle cx="42" cy="39" r="3.4" fill={CHARCOAL} />
    <circle cx="58" cy="39" r="3.4" fill={CHARCOAL} />
    <ellipse cx="50" cy="47" rx="5" ry="3.5" fill={CHARCOAL} />
    <path d="M44 52 Q50 57 56 52" stroke={CHARCOAL} strokeWidth={2.6} strokeLinecap="round" fill="none" />
  </svg>
);

/** Vertical Scratch 3.0 Stack Block SVG */
const Scratch3StackBlock = ({
  color,
  label,
  isHat = false,
  width = 210,
}: {
  color: string;
  label: string;
  isHat?: boolean;
  width?: number;
}) => (
  <div
    style={{
      width,
      height: isHat ? 44 : 38,
      borderRadius: isHat ? '18px 18px 8px 8px' : 8,
      background: color,
      border: `2.5px solid ${CHARCOAL}`,
      padding: '0 14px',
      ...row,
      gap: 8,
      color: isHat ? CHARCOAL : WHITE,
      fontFamily: 'var(--osd-font-display)',
      fontSize: 15,
      fontWeight: 700,
      boxShadow: `0 3px 0 rgba(30,30,44,0.22)`,
      flexShrink: 0,
    }}
  >
    {isHat && <JuniorIcon name="flag" size={20} />}
    <span>{label}</span>
  </div>
);

/** Authentic Scratch 3.0 IDE Mockup matching real layout & colors */
const AuthenticScratch3UI = ({
  highlightZone = 'all',
  running = false,
  hasFriend = false,
  backdrop = 0,
  onToggleRun,
  onAddSprite,
  onCycleBackdrop,
  width = 880,
  height = 540,
}: {
  highlightZone?: 'all' | 'stage' | 'sprites' | 'palette-code' | 'controls';
  running?: boolean;
  hasFriend?: boolean;
  backdrop?: number;
  onToggleRun?: () => void;
  onAddSprite?: () => void;
  onCycleBackdrop?: () => void;
  width?: number | string;
  height?: number | string;
}) => {
  const categories = [
    { name: 'Gerakan', color: '#4C97FF' },
    { name: 'Tampilan', color: '#9966FF' },
    { name: 'Suara', color: '#CF63CF' },
    { name: 'Kejadian', color: '#FFBF00' },
    { name: 'Kontrol', color: '#FFAB19' },
  ];

  const backdropBg =
    backdrop === 0
      ? WHITE
      : backdrop === 1
        ? 'linear-gradient(180deg, #BAE6FD 0%, #BAE6FD 62%, #4ADE80 62%, #4ADE80 100%)'
        : 'linear-gradient(180deg, #FEF08A 0%, #BAE6FD 55%, #FDE68A 55%, #60A5FA 100%)';

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 22,
        background: '#E5F0FF',
        border: `3.5px solid ${CHARCOAL}`,
        boxShadow: `0 8px 0 ${CHARCOAL}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Scratch 3.0 Blue Navbar */}
      <div
        style={{
          height: 44,
          background: SCRATCH_BLUE,
          borderBottom: `2.5px solid ${CHARCOAL}`,
          padding: '0 16px',
          ...row,
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ ...row, gap: 12 }}>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700, color: WHITE }}>
            Scratch 3.0
          </span>
          <div style={{ ...row, gap: 6 }}>
            <span style={{ padding: '4px 12px', borderRadius: '10px 10px 0 0', background: WHITE, fontSize: 13, fontWeight: 800, color: SCRATCH_BLUE }}>
              Kode
            </span>
            <span style={{ padding: '4px 12px', fontSize: 13, fontWeight: 700, color: '#DBEAFE' }}>
              Kostum
            </span>
            <span style={{ padding: '4px 12px', fontSize: 13, fontWeight: 700, color: '#DBEAFE' }}>
              Suara
            </span>
          </div>
        </div>

        <span style={{ fontSize: 13, fontWeight: 800, color: WHITE }}>Proyek Kucing Scratch</span>
      </div>

      {/* Main Scratch 3.0 Workspace Split */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0, padding: 10, gap: 10 }}>
        {/* Left: Block Categories + Palette + Code Area */}
        <div
          style={{
            flex: 1.28,
            display: 'flex',
            borderRadius: 16,
            background: WHITE,
            border: `${highlightZone === 'palette-code' ? 4 : 2.5}px solid ${highlightZone === 'palette-code' ? SUNNY : CHARCOAL}`,
            boxShadow: highlightZone === 'palette-code' ? `0 0 0 4px ${SUNNY_SOFT}` : undefined,
            overflow: 'hidden',
          }}
        >
          {/* Category Dots Column */}
          <div style={{ width: 64, background: '#F8FAFC', borderRight: `2px solid #E2E8F0`, padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            {categories.map((cat) => (
              <div key={cat.name} style={{ ...centerCol, gap: 2 }}>
                <span style={{ width: 20, height: 20, borderRadius: 99, background: cat.color, border: `2px solid ${CHARCOAL}` }} />
                <span style={{ fontSize: 9.5, fontWeight: 800, color: MUTED }}>{cat.name}</span>
              </div>
            ))}
          </div>

          {/* Block Drawer */}
          <div style={{ width: 158, background: '#F8FAFC', borderRight: `2px solid #E2E8F0`, padding: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: MUTED }}>Palet Blok</div>
            <Scratch3StackBlock color="#FFBF00" label="ketika diklik" isHat width={140} />
            <Scratch3StackBlock color="#4C97FF" label="gerak 10 langkah" width={140} />
            <Scratch3StackBlock color="#9966FF" label="katakan Halo!" width={140} />
            <Scratch3StackBlock color="#CF63CF" label="suara Meong" width={140} />
          </div>

          {/* Code Area (Center White Dot Grid) */}
          <div
            style={{
              flex: 1,
              backgroundColor: WHITE,
              backgroundImage: 'radial-gradient(#CBD5E1 1.4px, transparent 1.4px)',
              backgroundSize: '18px 18px',
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              position: 'relative',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 800, color: MUTED, marginBottom: 6 }}>Area Kode</div>
            <Scratch3StackBlock color="#FFBF00" label="ketika bendera diklik" isHat width={196} />
            <Scratch3StackBlock color="#4C97FF" label="gerak 10 langkah" width={196} />
            <Scratch3StackBlock color="#9966FF" label="katakan Halo!" width={196} />
          </div>
        </div>

        {/* Right: Stage (Top) + Sprite List & Backdrop Panel (Bottom) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Top-Right Controls Bar: Green Flag + Stop */}
          <div
            style={{
              height: 40,
              borderRadius: 12,
              background: highlightZone === 'controls' ? SUNNY_SOFT : WHITE,
              border: `${highlightZone === 'controls' ? 3.5 : 2.5}px solid ${highlightZone === 'controls' ? SUNNY : CHARCOAL}`,
              padding: '0 10px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 8 }}>
              <button
                type="button"
                onClick={onToggleRun}
                className="cpj33-card-btn"
                title="Bendera Hijau (Mulai)"
                style={{ width: 32, height: 30, borderRadius: 8, background: TEAL_SOFT, border: `2px solid ${TEAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="flag" size={20} />
              </button>
              <button
                type="button"
                onClick={onToggleRun}
                className="cpj33-card-btn"
                title="Tombol Stop"
                style={{ width: 32, height: 30, borderRadius: 8, background: CORAL_SOFT, border: `2px solid ${CORAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="stop" size={20} />
              </button>
            </div>
            <div style={{ width: 30, height: 28, borderRadius: 8, background: '#F8FAFC', border: `1.8px solid ${CHARCOAL}`, ...centerCol }}>
              <JuniorIcon name="fullscreen" size={18} />
            </div>
          </div>

          {/* Stage */}
          <div
            style={{
              flex: 1.15,
              borderRadius: 16,
              background: backdropBg,
              border: `${highlightZone === 'stage' ? 4 : 2.5}px solid ${highlightZone === 'stage' ? SUNNY : CHARCOAL}`,
              boxShadow: highlightZone === 'stage' ? `0 0 0 4px ${SUNNY_SOFT}` : undefined,
              position: 'relative',
              overflow: 'hidden',
              ...row,
              justifyContent: 'center',
              gap: 18,
            }}
          >
            <div style={{ position: 'relative', transform: running ? 'translateX(16px)' : 'none', transition: 'transform 250ms ease' }}>
              <ScratchCatSvg size={104} waving={running} />
              {running && (
                <div style={{ position: 'absolute', right: -56, top: -6, padding: '4px 12px', borderRadius: 12, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 15, fontWeight: 700 }}>
                  Halo!
                </div>
              )}
            </div>
            {hasFriend && <FriendPuppySvg size={82} />}
            <span style={{ position: 'absolute', left: 10, top: 8, fontSize: 11, fontWeight: 800, color: MUTED, background: WHITE, padding: '2px 8px', borderRadius: 8, border: `1.5px solid #CBD5E1` }}>
              Panggung (Stage)
            </span>
          </div>

          {/* Bottom-Right Sprite List + Stage Backdrop Selector */}
          <div style={{ flex: 0.9, display: 'flex', gap: 8 }}>
            {/* Sprite List Panel */}
            <div
              style={{
                flex: 1,
                borderRadius: 16,
                background: WHITE,
                border: `${highlightZone === 'sprites' ? 4 : 2.5}px solid ${highlightZone === 'sprites' ? SUNNY : CHARCOAL}`,
                boxShadow: highlightZone === 'sprites' ? `0 0 0 4px ${SUNNY_SOFT}` : undefined,
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, color: MUTED }}>Daftar Sprite</div>
              <div style={{ ...row, gap: 8 }}>
                <div style={{ width: 66, height: 66, borderRadius: 14, background: SKY_SOFT, border: `2.5px solid ${SCRATCH_BLUE}`, ...centerCol, position: 'relative' }}>
                  <ScratchCatSvg size={44} />
                  <span style={{ fontSize: 10, fontWeight: 800 }}>Sprite1</span>
                  <div style={{ position: 'absolute', right: -6, top: -6, width: 18, height: 18, borderRadius: 99, background: SCRATCH_BLUE, border: `1.5px solid ${CHARCOAL}`, ...centerCol }}>
                    <JuniorIcon name="trash" size={10} />
                  </div>
                </div>
                {hasFriend && (
                  <div style={{ width: 66, height: 66, borderRadius: 14, background: SUNNY_SOFT, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
                    <FriendPuppySvg size={42} />
                    <span style={{ fontSize: 10, fontWeight: 800 }}>Teman</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={onAddSprite}
                className="cpj33-card-btn"
                title="Tambah Sprite"
                style={{ position: 'absolute', right: 8, bottom: 8, width: 34, height: 34, borderRadius: 99, background: SCRATCH_BLUE, border: `2px solid ${CHARCOAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="cat" size={20} />
              </button>
            </div>

            {/* Stage Backdrop Panel */}
            <div style={{ width: 76, borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: MUTED }}>Latar</span>
              <div style={{ width: '100%', height: 42, borderRadius: 8, background: backdropBg, border: `1.5px solid #CBD5E1` }} />
              <button
                type="button"
                onClick={onCycleBackdrop}
                className="cpj33-card-btn"
                title="Ganti Latar"
                style={{ width: 32, height: 32, borderRadius: 99, background: TEAL, border: `2px solid ${CHARCOAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="landscape" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Cover)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  const [running, setRunning] = useState(false);
  const [hasFriend, setHasFriend] = useState(false);
  const [backdrop, setBackdrop] = useState(1);

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 33" accentDot={ORANGE}>
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
            background: ORANGE_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#C2410C',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="laptop" size={24} />
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
          Markas Baru
          <br />
          <Highlight>Kucing Scratch!</Highlight>
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
          Menjelajahi Panggung, Daftar Sprite &amp; Palet Blok Scratch 3.0
        </p>

        {/* Quick Pill Highlights */}
        <div style={{ ...row, gap: 18 }}>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: SCRATCH_BLUE,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="stage" size={28} />
            <span>Scratch 3.0!</span>
          </div>
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
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="flag" size={28} />
            <span>Panggung &amp; Sprite</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Authentic Scratch 3.0 UI + Biko & Scratch Cat */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #EFF6FF 0%, #FFF7ED 55%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${ORANGE}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 125, zIndex: 2 }}>
          <AuthenticScratch3UI
            running={running}
            hasFriend={hasFriend}
            backdrop={backdrop}
            onToggleRun={() => {
              playScratchChime();
              setRunning((r) => !r);
            }}
            onAddSprite={() => setHasFriend((f) => !f)}
            onCycleBackdrop={() => setBackdrop((b) => (b + 1) % 3)}
            width={620}
            height={420}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: -18,
            bottom: 24,
            zIndex: 3,
            animation: live ? 'cpj33-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={315}
            badgeIcon={<JuniorIcon name="laptop" size={24} />}
            speechBubble="Halo Scratch 3.0!"
          />
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
    <JuniorFrame badge="MISI HARI INI" accentDot={SKY}>
      <SlideTitle>
        Apa Misi Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Menjelajahi Scratch 3.0 • Pertemuan 33"
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

            <div style={{ width: 270, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol }}>
              <JuniorIcon name="map" size={96} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Kenali <span style={{ color: '#1D4ED8' }}>4 Bagian</span> Markas Scratch 3.0
            </div>
          </div>

          {/* Kartu 2 (Hijau) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: TEAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${TEAL}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ width: 270, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 14 }}>
              <ScratchCatSvg size={115} waving />
              <JuniorIcon name="flag" size={58} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Kenalan dengan <span style={{ color: '#047857' }}>Sprite</span> &amp; <span style={{ color: '#047857' }}>Bendera Hijau!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj33-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="map" size={24} />}
          speechBubble="Seru banget!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Tur Markas #1: Panggung (Stage)
// ============================================================================
const Slide03Stage: Page = () => {
  return (
    <JuniorFrame badge="TUR SCRATCH 3.0 #1" accentDot={SUNNY}>
      <SlideTitle>
        Ini Namanya <Highlight>Panggung</Highlight> (<em>Stage</em>)
      </SlideTitle>

      {/* Left Spotlight: Scratch 3.0 UI Highlighting Stage */}
      <div style={{ ...abs(X0, 235, 920, 720) }}>
        <AuthenticScratch3UI highlightZone="stage" width={920} height={720} />
      </div>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={1050}
        top={235}
        width={770}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Bagian #1 • Panggung (Stage)"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="stage" bgColor={SUNNY_SOFT} fontSize={32}>
              Layar di kanan tempat <strong>Karakter Beraksi</strong>
            </BulletRow>
            <BulletRow icon="happy" bgColor={SKY_SOFT} fontSize={32}>
              Seperti <strong>Layar Bioskop</strong> untuk cerita &amp; game!
            </BulletRow>
          </div>

          <div style={{ ...row, gap: 18, alignItems: 'center' }}>
            <BikoMascot pose="point-left" width={175} badgeIcon={<JuniorIcon name="stage" size={18} />} speechBubble="Lihat kotak kuning!" />
            <div style={{ flex: 1, padding: '20px 22px', borderRadius: 22, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, fontSize: 24, fontWeight: 700, lineHeight: 1.35 }}>
              Semua gerakan Kucing Scratch tampil di <strong>Panggung kanan atas</strong> ini!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Tur Markas #2: Daftar Sprite (Sprite List)
// ============================================================================
const Slide04SpriteList: Page = () => {
  return (
    <JuniorFrame badge="TUR SCRATCH 3.0 #2" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Kenalan Sama <Highlight>Daftar Sprite!</Highlight>
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={770}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Bagian #2 • Daftar Sprite"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="cat" bgColor={ORANGE_SOFT} fontSize={32}>
              <strong>Sprite</strong> = Sebutan baru untuk <strong>Karakter!</strong>
            </BulletRow>
            <BulletRow icon="plus-circle" bgColor={SKY_SOFT} fontSize={32}>
              Klik ikon <strong>Kepala Kucing</strong> di kanan bawah untuk tambah teman!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Di Scratch 3.0 kita bisa memilih puluhan karakter keren seperti anjing, roket, apel, atau peri!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight: Scratch 3.0 UI Highlighting Sprite List */}
      <div style={{ ...abs(900, 235, 920, 720) }}>
        <AuthenticScratch3UI highlightZone="sprites" hasFriend width={920} height={720} />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Tur Markas #3: Palet Blok & Area Kode
// ============================================================================
const Slide05PaletKode: Page = () => {
  return (
    <JuniorFrame badge="TUR SCRATCH 3.0 #3" accentDot={LAVENDER}>
      <SlideTitle>
        <Highlight>Palet Blok</Highlight> &amp; <Highlight color="#DBEAFE">Area Kode</Highlight>
      </SlideTitle>

      {/* Left Spotlight: Scratch 3.0 UI Highlighting Palette + Code Area */}
      <div style={{ ...abs(X0, 235, 920, 720) }}>
        <AuthenticScratch3UI highlightZone="palette-code" width={920} height={720} />
      </div>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={1050}
        top={235}
        width={770}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Bagian #3 • Palet & Area Kode"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="palette" bgColor={SUNNY_SOFT} fontSize={32}>
              <strong>Palet Blok (Kiri):</strong> Rak balok perintah warna-warni
            </BulletRow>
            <BulletRow icon="puzzle" bgColor={SKY_SOFT} fontSize={32}>
              <strong>Area Kode (Tengah):</strong> Tempat menyusun balok seperti puzzle!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: TEAL_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="arrow-down" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Tarik balok dari rak kiri lalu tempelkan dari <strong>Atas ke Bawah</strong> di Area Kode!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Tur Markas #4: Bendera Hijau & Tombol Stop!
// ============================================================================
const Slide06BenderaStop: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="TUR SCRATCH 3.0 #4" accentDot={TEAL}>
      <SlideTitle>
        <Highlight color="#D1FAE5">Bendera Hijau</Highlight> &amp; <Highlight color="#FEE2E2">Tombol Stop!</Highlight>
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={830}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Bagian #4 • Kontrol Pertunjukan"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="flag" bgColor={TEAL_SOFT} fontSize={33}>
              <strong>Bendera Hijau:</strong> Tombol <strong>Mulai</strong> pertunjukan
            </BulletRow>
            <BulletRow icon="stop" bgColor={CORAL_SOFT} fontSize={33}>
              <strong>Tombol Merah:</strong> Tombol <strong>Berhenti</strong> seketika!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Kedua tombol ini selalu berada tepat di atas sudut kiri Panggung agar mudah diklik!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Close-up Card */}
      <MacWindowCard
        left={965}
        top={235}
        width={855}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="Close-Up Tombol di Atas Panggung"
        padding={36}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '100%', padding: '36px 28px', borderRadius: 28, background: CREAM, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...row, justifyContent: 'space-around' }}>
            <div style={{ ...centerCol, gap: 14 }}>
              <div style={{ width: 145, height: 145, borderRadius: 28, background: TEAL_SOFT, border: `4px solid ${TEAL}`, ...centerCol, animation: live ? 'cpj33-pulse 1.8s infinite' : undefined }}>
                <JuniorIcon name="flag" size={92} />
              </div>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: '#047857' }}>MULAI</span>
            </div>

            <div style={{ ...centerCol, gap: 14 }}>
              <div style={{ width: 145, height: 145, borderRadius: 28, background: CORAL_SOFT, border: `4px solid ${CORAL}`, ...centerCol }}>
                <JuniorIcon name="stop" size={92} />
              </div>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: CORAL }}>BERHENTI</span>
            </div>
          </div>

          <div style={{ ...row, gap: 22, alignItems: 'center' }}>
            <BikoMascot pose="point-left" width={205} badgeIcon={<JuniorIcon name="flag" size={20} />} speechBubble="Hijau jalan, Merah stop!" />
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
              Letaknya di atas Panggung!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Permainan Cepat: Ayo Tebak Bagian Layarnya!
// ============================================================================
const Slide07AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1620} top={122} size={50}>
        Di Mana Tempat Menyusun <Highlight>Balok Kode</Highlight> di Scratch 3.0?
      </SlideTitle>

      {/* Interactive Choice Cards */}
      <div style={{ ...abs(170, 245, 1580, 460), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Area Kode Tengah) */}
        <button
          type="button"
          onClick={() => {
            playScratchChime();
            setPicked('A');
          }}
          className="cpj33-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'A' ? TEAL_SOFT : WHITE,
            border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'A' ? TEAL : CHARCOAL}`,
            padding: 30,
            ...centerCol,
            gap: 16,
            position: 'relative',
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN A
          </div>

          <div
            style={{
              marginTop: 18,
              width: 300,
              height: 195,
              borderRadius: 22,
              backgroundColor: WHITE,
              backgroundImage: 'radial-gradient(#CBD5E1 2px, transparent 2px)',
              backgroundSize: '20px 20px',
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
              gap: 6,
            }}
          >
            <Scratch3StackBlock color="#FFBF00" label="ketika diklik" isHat width={190} />
            <Scratch3StackBlock color="#4C97FF" label="gerak 10 langkah" width={190} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Area Kode (Tengah)
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Area Kode di tengah adalah tempat menyusun balok!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Panggung / Stage Kanan) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj33-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'B' ? CORAL_SOFT : WHITE,
            border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'B' ? CORAL : CHARCOAL}`,
            padding: 30,
            ...centerCol,
            gap: 16,
            position: 'relative',
            animation: picked === 'B' ? 'cpj33-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div
            style={{
              marginTop: 18,
              width: 300,
              height: 195,
              borderRadius: 22,
              background: SKY_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
            }}
          >
            <ScratchCatSvg size={135} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Panggung / Stage (Kanan)
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Stage di kanan itu layar tempat Kucing beraksi!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 735, 1540, 265), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj33-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={220}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Betul sekali!' : 'Tebak tempatnya!'}
          />
        </div>
        <div style={{ padding: '22px 36px', borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...row, gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="question" size={36} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, color: CHARCOAL }}>
            Tunjuk bagian yang benar di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan di Markas Baru Scratch 3.0 (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsMarkas: Page = () => {
  return (
    <JuniorFrame badge="TIPS PENJELAJAH BARU" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Nyaman di <Highlight>Scratch 3.0!</Highlight>
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
            <BulletRow icon="arrow-down" bgColor={TEAL_SOFT} fontSize={30}>
              Susun balok kode <strong>Menempel ke Bawah</strong>
            </BulletRow>
            <BulletRow icon="cat" bgColor={SUNNY_SOFT} fontSize={30}>
              Klik <strong>Sprite</strong> di kanan bawah sebelum memberi kode
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Scratch3StackBlock color="#FFBF00" label="ketika diklik" isHat width={220} />
              <Scratch3StackBlock color="#4C97FF" label="gerak 10 langkah" width={220} />
              <Scratch3StackBlock color="#9966FF" label="katakan Halo!" width={220} />
            </div>
            <JuniorIcon name="check" size={64} />
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
            <BulletRow icon="arrow-right" bgColor={CORAL_SOFT} fontSize={30}>
              Memaksa balok menempel <strong>Ke Samping</strong>
            </BulletRow>
            <BulletRow icon="trash" bgColor={SUNNY_SOFT} fontSize={30}>
              Mengklik tanda <strong>Tempat Sampah</strong> pada Kucing Scratch
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <div style={{ width: 145, height: 145, borderRadius: 24, background: WHITE, border: `3px solid ${CHARCOAL}`, ...centerCol, position: 'relative' }}>
              <ScratchCatSvg size={94} />
              <div style={{ position: 'absolute', right: -10, top: -10, width: 42, height: 42, borderRadius: 99, background: CORAL, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
                <JuniorIcon name="trash" size={24} />
              </div>
            </div>
            <JuniorIcon name="cross" size={68} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Jelajahi Markas Scratch 3.0!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [running, setRunning] = useState(false);
  const [hasFriend, setHasFriend] = useState(true);
  const [backdrop, setBackdrop] = useState(1);

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Jelajahi Markas Scratch 3.0!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'laptop' as JuniorIconName,
            text: (
              <>
                Buka <strong>Scratch 3.0</strong> &amp; temukan <strong>Kucing Scratch</strong> di Panggung
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'cat' as JuniorIconName,
            text: (
              <>
                Klik tombol <strong>Tambah Sprite (+)</strong> &amp; pilih 1 teman baru!
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'landscape' as JuniorIconName,
            text: (
              <>
                Klik tombol <strong>Latar (Backdrop)</strong> di pojok kanan bawah untuk ganti pemandangan!
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
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.24 }}>
              <JuniorIcon name={item.icon} size={26} style={{ marginRight: 8 }} />
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Playable Interactive Scratch 3.0 Explorer */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratch3UI
          running={running}
          hasFriend={hasFriend}
          backdrop={backdrop}
          onToggleRun={() => {
            playScratchChime();
            setRunning((r) => !r);
          }}
          onAddSprite={() => setHasFriend((f) => !f)}
          onCycleBackdrop={() => setBackdrop((b) => (b + 1) % 3)}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Quick Demo Controls */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 14 }}>
        <div style={{ animation: live ? 'cpj33-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="laptop" size={24} />}
            speechBubble={running ? 'Halo Scratch!' : 'Coba tombolnya!'}
          />
        </div>
        <button
          type="button"
          onClick={() => setBackdrop((b) => (b + 1) % 3)}
          className="cpj33-card-btn"
          style={{
            padding: '12px 24px',
            borderRadius: 18,
            background: TEAL,
            color: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 23,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          <JuniorIcon name="landscape" size={24} />
          <span>Ganti Pemandangan!</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 33 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj33-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj33-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="cat" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj33-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={56}>
        Hore! Selamat Datang di <Highlight>Scratch 3.0!</Highlight>{' '}
        <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 33"
        padding={36}
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
          {/* Bespoke Golden Orange Scratch Cat & Sparkling Star Medal SVG */}
          <div style={{ animation: live ? 'cpj33-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={ORANGE_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Orange Scratch Cat Head inside Medal */}
              <path d="M86 98 L83 62 L109 80 Z" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M154 98 L157 62 L131 80 Z" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <ellipse cx="120" cy="108" rx="40" ry="30" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={4} />
              <ellipse cx="120" cy="117" rx="26" ry="16" fill={WHITE} />
              <ellipse cx="105" cy="102" rx="7" ry="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
              <ellipse cx="135" cy="102" rx="7" ry="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
              <circle cx="107" cy="102" r="3.4" fill={CHARCOAL} />
              <circle cx="133" cy="102" r="3.4" fill={CHARCOAL} />
              <path d="M111 119 Q120 126 129 119" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" fill="none" />
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
              fontSize: 33,
              fontWeight: 700,
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="medal" size={34} />
            <span>Lencana Penjelajah Markas Scratch 3.0</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.38,
              maxWidth: 920,
              color: CHARCOAL,
            }}
          >
            Kamu sudah kenal{' '}
            <Highlight color="#D1FAE5">Panggung, Daftar Sprite, Palet Blok, &amp; Bendera Hijau!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="laptop" size={22} />}
            speechBubble="Markas Baru!"
          />
          <div style={{ animation: live ? 'cpj33-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <ScratchCatSvg size={185} waving />
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
  `Selamat datang di Pertemuan 33 — Markas Baru Kucing Scratch! 🐱💻
Mulai hari ini kita naik level ke Scratch 3.0 di laptop/komputer dan berkenalan dengan Kucing Scratch!`,

  `Dua misi seru hari ini:
1. Mengenal 4 bagian utama Markas Scratch 3.0.
2. Berkenalan dengan Sprite (karakter) & Bendera Hijau!`,

  `Tur Scratch 3.0 #1 — Panggung (Stage):
Layar di kanan atas adalah tempat semua karakter (Sprite) beraksi seperti layar bioskop!`,

  `Tur Scratch 3.0 #2 — Daftar Sprite (Sprite List):
Di kanan bawah ada Daftar Sprite. "Sprite" adalah sebutan baru untuk karakter. Klik ikon Kepala Kucing (+) untuk menambah teman!`,

  `Tur Scratch 3.0 #3 — Palet Blok & Area Kode:
Di sebelah kiri ada rak Palet Blok warna-warni, dan di tengah ada Area Kode putih tempat menyusun balok seperti puzzle!`,

  `Tur Scratch 3.0 #4 — Bendera Hijau & Tombol Stop:
Tepat di atas Panggung ada Bendera Hijau untuk Mulai dan Tombol Segi Delapan Merah untuk Berhenti seketika!`,

  `Permainan Cepat! Ayo tebak bersama:
Di mana tempat menyusun balok kode di Scratch 3.0 — Pilihan A (Area Kode Tengah) atau Pilihan B (Panggung/Stage Kanan)?`,

  `Tips Jagoan di Scratch 3.0:
BOLEH menyusun balok menempel dari atas ke bawah (vertikal), dan klik Sprite dahulu sebelum memberi kode.
JANGAN memaksa balok menempel ke samping, atau mengklik tanda Tempat Sampah pada Kucing Scratch!`,

  `Misi Praktik Jelajahi Markas Scratch 3.0!
Coba klik ikon Kepala Kucing (+) untuk menambah teman, klik ikon Pemandangan untuk ganti latar, dan klik Bendera Hijau di layar!`,

  `Hore! Selamat Datang di Scratch 3.0! 🎉🏅
Kalian sudah meraih Lencana Penjelajah Markas Scratch 3.0 di Pertemuan 33!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 33 — Markas Baru Kucing Scratch!',
  createdAt: '2026-11-16T15:12:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03Stage,
  Slide04SpriteList,
  Slide05PaletKode,
  Slide06BenderaStop,
  Slide07AyoTebak,
  Slide08TipsMarkas,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

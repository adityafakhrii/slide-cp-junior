import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-34-langkah-pertama-di-scratch-3-0';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj34-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj34-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj34-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj34-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj34-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj34-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.9); }
  50% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
}
.cpj34-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj34-card-btn:hover {
  transform: translateY(-4px);
}
.cpj34-card-btn:active {
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

/** Synthesized playful "Meow!" pitch glide for interactive Scratch 3.0 demos */
function playMeowSound() {
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
    const t = ctx.currentTime;
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(840, t + 0.12);
    osc.frequency.exponentialRampToValueAtTime(480, t + 0.34);
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.24, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.36);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.38);
    setTimeout(() => {
      void ctx.close();
    }, 500);
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
    accent: '#4D97FF',
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
const PINK = '#EC4899';
const PINK_SOFT = '#FDF2F8';
const SCRATCH_BLUE = '#4D97FF';
const SCRATCH_EVENT = '#FFBF00';
const SCRATCH_SOUND = '#CF63CF';

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
  accentDot = SCRATCH_BLUE,
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
          animation: live ? 'cpj34-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: SCRATCH_BLUE,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 34 • Langkah Pertama di Scratch 3.0!</span>
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
// Reusable Pertemuan 34 Visuals (Scratch Cat, Scratch 3.0 Blocks, Playable IDE)
// ============================================================================

const ScratchCatSvg = ({ size = 115, waving = false }: { size?: number; waving?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <ellipse cx="70" cy="128" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path d="M40 100 C20 96, 14 78, 25 69 C32 63, 38 71, 35 78 C33 83, 38 90, 46 90" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <ellipse cx="56" cy="120" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="120" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="70" cy="96" rx="25" ry="23" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="98" rx="14" ry="14" fill={WHITE} />
    <path d="M46 86 C35 90, 35 103, 45 103" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d={waving ? 'M94 82 C112 72, 114 54, 105 50 C98 46, 92 58, 92 72' : 'M94 86 C105 90, 105 103, 95 103'} fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d="M36 52 L34 16 L60 35 Z" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
    <path d="M104 52 L106 16 L80 35 Z" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
    <ellipse cx="70" cy="56" rx="38" ry="29" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="65" rx="25" ry="16" fill={WHITE} />
    <ellipse cx="56" cy="50" rx="7" ry="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    <ellipse cx="84" cy="50" rx="7" ry="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    <circle cx="58" cy="50" r="3.4" fill={CHARCOAL} />
    <circle cx="82" cy="50" r="3.4" fill={CHARCOAL} />
    <line x1="28" y1="58" x2="42" y2="61" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
    <line x1="27" y1="67" x2="42" y2="67" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
    <line x1="98" y1="61" x2="113" y2="58" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
    <line x1="98" y1="67" x2="113" y2="67" stroke={CHARCOAL} strokeWidth={2.4} strokeLinecap="round" />
    <polygon points="66,58 74,58 70,63" fill={CHARCOAL} />
    <path d="M62 67 Q70 74 78 67" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
  </svg>
);

const Scratch3HatFlagBlock = ({ scale = 1, activeGlow = false }: { scale?: number; activeGlow?: boolean }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(10 * scale),
      height: Math.round(62 * scale),
      padding: `0 ${Math.round(24 * scale)}px`,
      borderRadius: `${Math.round(32 * scale)}px ${Math.round(32 * scale)}px ${Math.round(12 * scale)}px ${Math.round(12 * scale)}px`,
      background: SCRATCH_EVENT,
      border: `3px solid ${CHARCOAL}`,
      boxShadow: activeGlow ? `0 0 0 6px ${SUNNY_SOFT}, 0 4px 0 ${CHARCOAL}` : `0 4px 0 ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(22 * scale),
      fontWeight: 700,
      color: CHARCOAL,
    }}
  >
    <span>when</span>
    <JuniorIcon name="flag" size={Math.round(28 * scale)} />
    <span>clicked</span>
  </div>
);

const Scratch3MoveBlock = ({
  steps = 50,
  scale = 1,
  highlightNum = false,
}: {
  steps?: number;
  scale?: number;
  highlightNum?: boolean;
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(10 * scale),
      height: Math.round(54 * scale),
      padding: `0 ${Math.round(22 * scale)}px`,
      borderRadius: Math.round(12 * scale),
      background: SCRATCH_BLUE,
      border: `3px solid ${CHARCOAL}`,
      boxShadow: `0 4px 0 ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(22 * scale),
      fontWeight: 700,
      color: WHITE,
    }}
  >
    <span>move</span>
    <span
      style={{
        minWidth: Math.round(48 * scale),
        height: Math.round(34 * scale),
        borderRadius: 99,
        background: WHITE,
        color: CHARCOAL,
        border: `2.5px solid ${highlightNum ? SUNNY : CHARCOAL}`,
        boxShadow: highlightNum ? `0 0 0 5px rgba(251,191,36,0.75)` : undefined,
        ...centerCol,
        padding: '0 8px',
        fontSize: Math.round(20 * scale),
      }}
    >
      {steps}
    </span>
    <span>steps</span>
  </div>
);

const Scratch3SoundBlock = ({ scale = 1, activeGlow = false }: { scale?: number; activeGlow?: boolean }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(10 * scale),
      height: Math.round(54 * scale),
      padding: `0 ${Math.round(22 * scale)}px`,
      borderRadius: Math.round(12 * scale),
      background: SCRATCH_SOUND,
      border: `3px solid ${CHARCOAL}`,
      boxShadow: activeGlow ? `0 0 0 6px ${PINK_SOFT}, 0 4px 0 ${CHARCOAL}` : `0 4px 0 ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(21 * scale),
      fontWeight: 700,
      color: WHITE,
    }}
  >
    <span>start sound</span>
    <span
      style={{
        height: Math.round(34 * scale),
        borderRadius: 99,
        background: '#A855F7',
        border: `2px solid ${WHITE}`,
        padding: '0 12px',
        ...centerCol,
        fontSize: Math.round(18 * scale),
      }}
    >
      Meow
    </span>
  </div>
);

/** Authentic Playable Scratch 3.0 Move + Meow Workspace */
const AuthenticScratch3MoveMeowUI = ({
  steps = 100,
  stepCount,
  onRunFlag,
  onReset,
  width = 880,
  height = 540,
}: {
  steps?: number;
  stepCount: number;
  onRunFlag: () => void;
  onReset: () => void;
  width?: number | string;
  height?: number | string;
}) => {
  const catLeftPct = Math.min(68, 12 + stepCount * (steps >= 80 ? 22 : 12));
  const meowing = stepCount > 0;

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
      {/* Top Navbar */}
      <div
        style={{
          height: 42,
          background: SCRATCH_BLUE,
          borderBottom: `2.5px solid ${CHARCOAL}`,
          padding: '0 16px',
          ...row,
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ ...row, gap: 10 }}>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700, color: WHITE }}>
            Scratch 3.0
          </span>
          <span style={{ padding: '3px 11px', borderRadius: '8px 8px 0 0', background: WHITE, fontSize: 12, fontWeight: 800, color: SCRATCH_BLUE }}>
            Kode
          </span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 800, color: WHITE }}>Misi Jalan &amp; Meong!</span>
      </div>

      {/* Main Split */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0, padding: 10, gap: 10 }}>
        {/* Left Palette + Snapped Stack */}
        <div style={{ flex: 1.2, display: 'flex', borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, overflow: 'hidden' }}>
          <div style={{ width: 58, background: '#F8FAFC', borderRight: `2px solid #E2E8F0`, padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            {[
              { name: 'Gerakan', color: SCRATCH_BLUE },
              { name: 'Tampilan', color: '#9966FF' },
              { name: 'Suara', color: SCRATCH_SOUND },
              { name: 'Kejadian', color: SCRATCH_EVENT },
            ].map((c) => (
              <div key={c.name} style={{ ...centerCol, gap: 2 }}>
                <span style={{ width: 18, height: 18, borderRadius: 99, background: c.color, border: `2px solid ${CHARCOAL}` }} />
                <span style={{ fontSize: 9, fontWeight: 800, color: MUTED }}>{c.name}</span>
              </div>
            ))}
          </div>

          {/* Code Area */}
          <div
            style={{
              flex: 1,
              backgroundColor: WHITE,
              backgroundImage: 'radial-gradient(#CBD5E1 1.4px, transparent 1.4px)',
              backgroundSize: '18px 18px',
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 3,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: MUTED, marginBottom: 6 }}>Area Kode (Tersusun ke Bawah)</div>
            <Scratch3HatFlagBlock scale={0.78} activeGlow={meowing} />
            <Scratch3MoveBlock steps={steps} scale={0.78} />
            <Scratch3SoundBlock scale={0.78} activeGlow={meowing} />
          </div>
        </div>

        {/* Right Stage & Controls */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 38, borderRadius: 12, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: '0 10px', ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 8 }}>
              <button
                type="button"
                onClick={onRunFlag}
                className="cpj34-card-btn"
                title="Klik Bendera Hijau!"
                style={{ width: 34, height: 28, borderRadius: 8, background: TEAL_SOFT, border: `2.5px solid ${TEAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="flag" size={19} />
              </button>
              <button
                type="button"
                onClick={onReset}
                className="cpj34-card-btn"
                title="Stop / Reset Posisi"
                style={{ width: 34, height: 28, borderRadius: 8, background: CORAL_SOFT, border: `2.5px solid ${CORAL}`, ...centerCol, padding: 0 }}
              >
                <JuniorIcon name="stop" size={19} />
              </button>
            </div>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 12, fontWeight: 700, color: TEAL }}>
              {meowing ? 'Meong!' : 'Siap Jalan'}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: 16,
              background: 'linear-gradient(180deg, #BAE6FD 0%, #BAE6FD 62%, #4ADE80 62%, #4ADE80 100%)',
              border: `2.5px solid ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: `${catLeftPct}%`,
                bottom: '14%',
                transition: 'left 360ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <ScratchCatSvg size={102} waving={meowing} />
              {meowing && (
                <div style={{ position: 'absolute', right: -64, top: -8, padding: '4px 12px', borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 15, fontWeight: 700, ...row, gap: 4 }}>
                  <JuniorIcon name="music-note" size={16} />
                  <span>Meong!</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ height: 64, borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: '0 12px', ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 8 }}>
              <ScratchCatSvg size={44} />
              <span style={{ fontSize: 13, fontWeight: 800 }}>Sprite1 (Kucing Scratch)</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: MUTED }}>x: {stepCount * steps}</span>
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
  const [stepCount, setStepCount] = useState(0);

  const handleRunFlag = () => {
    playMeowSound();
    setStepCount((c) => (c >= 2 ? 0 : c + 1));
  };

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 34" accentDot={SCRATCH_BLUE}>
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
            background: SKY_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#1D4ED8',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="flag" size={24} />
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
          Langkah Pertama di
          <br />
          <Highlight>Scratch 3.0!</Highlight>
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
          Merangkai Blok Gerak Maju &amp; Suara Meong Saat Bendera Hijau Diklik
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
            <JuniorIcon name="footprints" size={28} />
            <span>Gerak Maju!</span>
          </div>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: PINK,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="music-note" size={28} />
            <span>Suara Meong!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Playable Authentic Scratch 3.0 Move + Meow UI + Biko */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #EFF6FF 0%, #FDF2F8 55%, #FEF9C3 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SCRATCH_BLUE}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 125, zIndex: 2 }}>
          <AuthenticScratch3MoveMeowUI
            steps={100}
            stepCount={stepCount}
            onRunFlag={handleRunFlag}
            onReset={() => setStepCount(0)}
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
            animation: live ? 'cpj34-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={315}
            badgeIcon={<JuniorIcon name="music-note" size={24} />}
            speechBubble={stepCount > 0 ? 'Meong!' : 'Klik Bendera Hijau!'}
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
    <JuniorFrame badge="MISI HARI INI" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Apa Misi Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Kode Pertama Scratch 3.0 • Pertemuan 34"
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
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SCRATCH_BLUE, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ width: 290, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol, gap: 6 }}>
              <Scratch3HatFlagBlock scale={0.76} />
              <Scratch3MoveBlock steps={50} scale={0.76} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Gerakkan <span style={{ color: '#1D4ED8' }}>Kucing Scratch Maju</span>
            </div>
          </div>

          {/* Kartu 2 (Pink) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: PINK_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${PINK}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: PINK, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ width: 290, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol, gap: 10 }}>
              <Scratch3SoundBlock scale={0.78} />
              <div style={{ ...row, gap: 8 }}>
                <JuniorIcon name="music-note" size={34} />
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: PINK }}>Meong!</span>
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Tambah <span style={{ color: '#BE185D' }}>Suara Meong</span> Seru!
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj34-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="music-note" size={24} />}
          speechBubble="Meong!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Blok Ajaib #1: Bendera Hijau (Events)
// ============================================================================
const Slide03BlokEvents: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="BLOK KUNING • EVENTS" accentDot={SUNNY}>
      <SlideTitle>
        Blok Topi <Highlight>Bendera Hijau!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Kategori Kuning (Events)"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ padding: '54px 44px', borderRadius: 32, background: CREAM, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...centerCol, position: 'relative' }}>
            <Scratch3HatFlagBlock scale={1.55} activeGlow />
            <div style={{ marginTop: 18, padding: '6px 18px', borderRadius: 99, background: SUNNY_SOFT, border: `2px solid ${CHARCOAL}`, fontSize: 18, fontWeight: 800 }}>
              Lekukan Bawah = Tempat Tempel Blok!
            </div>
          </div>

          <div style={{ ...row, gap: 22, alignItems: 'center' }}>
            <div style={{ animation: live ? 'cpj34-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot pose="point-left" width={185} badgeIcon={<JuniorIcon name="flag" size={20} />} speechBubble="Seperti topi!" />
            </div>
            <div style={{ padding: '16px 24px', borderRadius: 20, background: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 27, fontWeight: 700 }}>
              Selalu di Paling Atas!
            </div>
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
        headerLabel="Fungsi Blok Events"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="grad-cap" bgColor={SUNNY_SOFT} fontSize={32}>
              Bentuknya melengkung seperti <strong>Topi</strong> di paling atas
            </BulletRow>
            <BulletRow icon="flag" bgColor={TEAL_SOFT} fontSize={32}>
              Perintah mulai jalan saat <strong>Bendera Hijau Diklik!</strong>
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Karena bentuknya melengkung di atas, tidak ada blok lain yang bisa ditaruh di atas blok Topi ini!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Blok Ajaib #2: Gerak Maju (Motion)
// ============================================================================
const Slide04BlokMotion: Page = () => {
  return (
    <JuniorFrame badge="BLOK BIRU • MOTION" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Blok Biru <Highlight color="#DBEAFE">Gerak Maju</Highlight> (<em>Move</em>)
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Kategori Biru (Motion)"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="footprints" bgColor={SKY_SOFT} fontSize={32}>
              Membuat karakter <strong>Melangkah Maju</strong> ke depan
            </BulletRow>
            <BulletRow icon="numbers" bgColor={SUNNY_SOFT} fontSize={32}>
              Ubah angka <code>10</code> jadi <strong>50 atau 100</strong> biar langkahnya lebar!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Di Scratch 3.0, angka <code>10</code> langkahnya pendek sekali — ketik <code>50</code> atau <code>100</code> supaya terlihat jelas meluncur!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Card */}
      <MacWindowCard
        left={980}
        top={235}
        width={840}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Sorot Angka Langkah di Blok Move"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ padding: '44px 36px', borderRadius: 30, background: CREAM, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}` }}>
            <Scratch3MoveBlock steps={50} scale={1.55} highlightNum />
          </div>

          <div style={{ width: '100%', padding: '24px 32px', borderRadius: 24, background: TEAL_SOFT, border: `3px solid ${CHARCOAL}`, ...row, justifyContent: 'space-around' }}>
            <div style={{ opacity: 0.35 }}><ScratchCatSvg size={100} /></div>
            <JuniorIcon name="arrow-right" size={56} />
            <ScratchCatSvg size={118} waving />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Blok Ajaib #3: Suara Meong (Sound)
// ============================================================================
const Slide05BlokSound: Page = () => {
  return (
    <JuniorFrame badge="BLOK PINK • SOUND" accentDot={PINK}>
      <SlideTitle>
        Blok Pink <Highlight color="#FCE7F3">Suara Meong!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Pink Sound Category + Meow Block */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={PINK_SOFT}
        headerLabel="Kategori Pink (Sound)"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ ...row, gap: 16 }}>
            <div style={{ padding: '12px 24px', borderRadius: 99, background: SCRATCH_SOUND, color: WHITE, border: `3px solid ${CHARCOAL}`, ...row, gap: 10 }}>
              <JuniorIcon name="music-note" size={28} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>Sound</span>
            </div>
            <button
              type="button"
              onClick={playMeowSound}
              className="cpj34-card-btn"
              style={{ padding: '12px 24px', borderRadius: 99, background: SUNNY, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 8 }}
            >
              <JuniorIcon name="speaker" size={26} />
              <span>Tes Bunyi Meong!</span>
            </button>
          </div>

          <div style={{ padding: '38px 32px', borderRadius: 28, background: CREAM, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}` }}>
            <Scratch3SoundBlock scale={1.45} activeGlow />
          </div>

          <div style={{ ...row, gap: 18, alignItems: 'center' }}>
            <ScratchCatSvg size={130} waving />
            <div style={{ padding: '14px 26px', borderRadius: 22, background: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: PINK }}>
              Meow!
            </div>
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
        headerLabel="Cara Memasang Suara"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="music-note" bgColor={PINK_SOFT} fontSize={32}>
              Klik lingkaran <strong>Pink (Sound)</strong> di rak kiri
            </BulletRow>
            <BulletRow icon="cat" bgColor={SUNNY_SOFT} fontSize={32}>
              Pilih blok <strong>start sound [ Meow ]</strong> biar kucing bersuara!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: PINK_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="speaker" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Pastikan speaker laptop menyala supaya kamu bisa mendengar suara Kucing Scratch!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Rangkaian Mana yang Benar?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1620} top={122} size={48}>
        Susunan Blok Mana yang Bisa <Highlight>Jalan Saat Bendera Hijau Diklik?</Highlight>
      </SlideTitle>

      {/* Interactive Choice Cards */}
      <div style={{ ...abs(170, 245, 1580, 460), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Hat Flag + Move 50) */}
        <button
          type="button"
          onClick={() => {
            playMeowSound();
            setPicked('A');
          }}
          className="cpj34-card-btn"
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

          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
            <Scratch3HatFlagBlock scale={1.15} />
            <Scratch3MoveBlock steps={50} scale={1.15} />
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Ada blok topi Bendera Hijau di paling atas!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Move 50 alone) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj34-card-btn"
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
            animation: picked === 'B' ? 'cpj34-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 32 }}>
            <Scratch3MoveBlock steps={50} scale={1.25} />
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Tanpa blok topi Bendera Hijau, ia tidak ikut berjalan!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 735, 1540, 265), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj34-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={220}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Betul!' : 'Ayo tebak!'}
          />
        </div>
        <div style={{ padding: '22px 36px', borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...row, gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="question" size={36} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, color: CHARCOAL }}>
            Tunjuk susunan yang benar di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Jurus Merangkai Puzzle ke Bawah!
// ============================================================================
const Slide07RangkaiPuzzle: Page = () => {
  return (
    <JuniorFrame badge="JURUS RANGKAI KODE" accentDot={SUNNY}>
      <SlideTitle>
        Susun <Highlight>Menempel ke Bawah!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1720}
        height={720}
        titleBarColor={CREAM}
        headerLabel="3 Langkah Menyusun Blok Vertikal Scratch 3.0"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', gap: 40, alignItems: 'center' }}>
          {/* Left 3 Sequential Step Cards */}
          <div style={{ flex: 1.15, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ borderRadius: 22, background: SUNNY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${SUNNY}`, padding: '22px 26px', ...row, gap: 18 }}>
              <div style={{ width: 58, height: 58, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
                1
              </div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>
                Taruh <strong>when Bendera clicked</strong> paling atas
              </div>
            </div>

            <div style={{ borderRadius: 22, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${SKY}`, padding: '22px 26px', ...row, gap: 18 }}>
              <div style={{ width: 58, height: 58, borderRadius: 18, background: SCRATCH_BLUE, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
                2
              </div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>
                Tempel <strong>move 50 steps</strong> tepat di bawahnya
              </div>
            </div>

            <div style={{ borderRadius: 22, background: PINK_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${PINK}`, padding: '22px 26px', ...row, gap: 18 }}>
              <div style={{ width: 58, height: 58, borderRadius: 18, background: PINK, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
                3
              </div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>
                Tempel <strong>start sound Meow</strong> di paling bawah!
              </div>
            </div>
          </div>

          {/* Right Snapped Vertical Stack */}
          <div style={{ flex: 0.9, height: '100%', borderRadius: 28, background: CREAM, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...centerCol, gap: 6 }}>
            <Scratch3HatFlagBlock scale={1.32} />
            <JuniorIcon name="arrow-down" size={32} />
            <Scratch3MoveBlock steps={50} scale={1.32} />
            <JuniorIcon name="arrow-down" size={32} />
            <Scratch3SoundBlock scale={1.32} activeGlow />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Kode Pertama Scratch 3.0 (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsKode: Page = () => {
  return (
    <JuniorFrame badge="TIPS CODER SCRATCH 3.0" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Kucingmu <Highlight>Berjalan &amp; Bersuara!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & BERHASIL"
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
            <BulletRow icon="numbers" bgColor={TEAL_SOFT} fontSize={30}>
              Ubah angka <code>10</code> menjadi <strong>50 atau 100</strong>
            </BulletRow>
            <BulletRow icon="flag" bgColor={SUNNY_SOFT} fontSize={30}>
              Klik <strong>Bendera Hijau</strong> di atas Panggung untuk tes
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Scratch3HatFlagBlock scale={0.92} />
              <Scratch3MoveBlock steps={100} scale={0.92} />
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
            <BulletRow icon="puzzle" bgColor={CORAL_SOFT} fontSize={30}>
              Membiarkan balok <strong>Terpisah Jauh</strong> tidak menempel
            </BulletRow>
            <BulletRow icon="mute" bgColor={SUNNY_SOFT} fontSize={30}>
              Mengecilkan <strong>Volume Laptop</strong> sampai habis
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
              <Scratch3HatFlagBlock scale={0.84} />
              <Scratch3MoveBlock steps={50} scale={0.84} />
            </div>
            <JuniorIcon name="cross" size={68} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Kucing Scratch Jalan & Meong!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [stepCount, setStepCount] = useState(0);

  const handleRunFlag = () => {
    playMeowSound();
    setStepCount((c) => (c >= 2 ? 0 : c + 1));
  };

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Jalan &amp; Meong!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'cat' as JuniorIconName,
            text: (
              <>
                Klik <strong>Kucing Scratch</strong> &amp; pasang latar cerah pilihanmu
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'puzzle' as JuniorIconName,
            text: (
              <>
                Susun <strong>when Bendera clicked</strong> + <strong>move 100</strong> + <strong>Meow</strong>
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'flag' as JuniorIconName,
            text: (
              <>
                Klik <strong>Bendera Hijau!</strong> Lihat dia jalan &amp; dengar meongnya!
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

      {/* Playable Interactive Scratch 3.0 Workspace */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratch3MoveMeowUI
          steps={100}
          stepCount={stepCount}
          onRunFlag={handleRunFlag}
          onReset={() => setStepCount(0)}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Run Green Flag Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 14 }}>
        <div style={{ animation: live ? 'cpj34-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="music-note" size={24} />}
            speechBubble={stepCount > 0 ? 'Meong!' : 'Ayo tes kode!'}
          />
        </div>
        <button
          type="button"
          onClick={handleRunFlag}
          className="cpj34-card-btn"
          style={{
            padding: '14px 26px',
            borderRadius: 20,
            background: TEAL,
            color: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 24,
            fontWeight: 700,
            ...row,
            gap: 10,
          }}
        >
          <JuniorIcon name="flag" size={26} />
          <span>Klik Bendera Hijau!</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 34 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj34-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj34-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="music-note" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj34-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={56}>
        Hore! Kode Pertamamu di <Highlight>Scratch 3.0 Berhasil!</Highlight>{' '}
        <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 34"
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
          {/* Bespoke Golden Green Flag + Music Note Medal SVG */}
          <div style={{ animation: live ? 'cpj34-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={PINK} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Waving Green Flag inside Medal */}
              <line x1="88" y1="68" x2="88" y2="146" stroke={CHARCOAL} strokeWidth={6} strokeLinecap="round" />
              <path d="M90 72 C110 64, 128 80, 146 73 V110 C128 117, 110 101, 90 109 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              {/* Cheerful Pink Music Note */}
              <circle cx="150" cy="134" r="11" fill={PINK} stroke={CHARCOAL} strokeWidth={3.2} />
              <path d="M159 134 V96 L175 92 V104 L159 108" fill={PINK} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
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
            <span>Lencana Coder Pemula Scratch 3.0</span>
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
            Kamu sudah jago merangkai{' '}
            <Highlight color="#D1FAE5">Bendera Hijau, Gerak Maju, &amp; Suara Meong!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="medal" size={22} />}
            speechBubble="Kode Pertama!"
          />
          <div style={{ animation: live ? 'cpj34-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 34 — Langkah Pertama di Scratch 3.0! 🐱🎵
Hari ini kita merangkai kode pertama di Scratch 3.0: menggerakkan Kucing Scratch maju sambil bersuara Meong!`,

  `Dua misi seru hari ini:
1. Menggerakkan Kucing Scratch maju memakai Bendera Hijau & blok Motion.
2. Menambahkan suara Meong memakai kategori Sound!`,

  `Blok Ajaib #1 — Bendera Hijau (Events):
Bentuknya melengkung seperti Topi di paling atas. Perintah akan mulai berjalan saat Bendera Hijau diklik!`,

  `Blok Ajaib #2 — Gerak Maju (Motion):
Blok biru "move ( ) steps" menggerakkan karakter maju. Ubah angka 10 menjadi 50 atau 100 supaya langkahnya terlihat lebar!`,

  `Blok Ajaib #3 — Suara Meong (Sound):
Klik kategori Pink (Sound), lalu tarik blok "start sound [ Meow ]"! Coba klik tombol "Tes Bunyi Meong!" di layar!`,

  `Permainan Cepat! Ayo tebak bersama:
Susunan blok mana yang bisa berjalan saat Bendera Hijau diklik — Pilihan A (dengan blok Topi Bendera Hijau) atau Pilihan B (tanpa blok Topi)?`,

  `Jurus Merangkai Puzzle ke Bawah:
1. Taruh "when Bendera clicked" di paling atas.
2. Tempel "move 50 steps" tepat di bawahnya.
3. Tempel "start sound Meow" di paling bawah!`,

  `Tips Jagoan Kode Pertama Scratch 3.0:
BOLEH ubah angka 10 menjadi 50/100 dan tes dengan Bendera Hijau.
JANGAN biarkan balok terpisah jauh tidak menempel, atau mengecilkan volume laptop sampai habis!`,

  `Misi Praktik Kucing Scratch Jalan & Meong!
Klik Bendera Hijau pada panggung slide atau di Scratch 3.0 anak untuk melihat Kucing Scratch melangkah maju sambil berbunyi Meong!`,

  `Hore! Kode Pertamamu di Scratch 3.0 Berhasil! 🎉🏅
Selamat meraih Lencana Coder Pemula Scratch 3.0 di Pertemuan 34!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 34 — Langkah Pertama di Scratch 3.0!',
  createdAt: '2026-11-16T15:15:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BlokEvents,
  Slide04BlokMotion,
  Slide05BlokSound,
  Slide06AyoTebak,
  Slide07RangkaiPuzzle,
  Slide08TipsKode,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

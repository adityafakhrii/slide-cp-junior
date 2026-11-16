import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-46-tangkap-hitung-poinmu-panen-buah-bagian-2';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj46-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj46-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj46-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj46-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.78); }
  50% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
}
@keyframes cpj46-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj46-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj46-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj46-card-btn:hover {
  transform: translateY(-4px);
}
.cpj46-card-btn:active {
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

/** Playful catch chime or reset blip via Web Audio API */
function playCatchSound(kind: 'collect' | 'boing' | 'reset') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    if (kind === 'collect') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.07);
      osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.26);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } else if (kind === 'boing') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    }
    setTimeout(() => {
      void ctx.close();
    }, 360);
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
const ORANGE_SOFT = '#FFF7ED';
const SCRATCH_BLUE = '#4D97FF';
const SCRATCH_EVENT = '#FFBF00';
const SCRATCH_CTRL = '#FFAB19';
const SCRATCH_SENSING = '#5CB1D6';
const SCRATCH_SOUND = '#CF63CF';
const SCRATCH_VAR = '#FF8C1A';
const SCRATCH_VAR_DARK = '#DB6E00';

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
  accentDot = SCRATCH_VAR,
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
      <div aria-hidden style={{ ...abs(46, 200), fontFamily: 'var(--osd-font-display)', fontSize: 40, fontWeight: 700, color: LAVENDER, opacity: 0.25, transform: 'rotate(-10deg)', pointerEvents: 'none' }}>
        {'{ }'}
      </div>
      <div aria-hidden style={{ ...abs(1816, 170), fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: SKY, opacity: 0.26, transform: 'rotate(12deg)', pointerEvents: 'none' }}>
        {'</>'}
      </div>
      <div aria-hidden style={{ ...abs(42, 870), fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: TEAL, opacity: 0.24, transform: 'rotate(-8deg)', pointerEvents: 'none' }}>
        {'( )'}
      </div>
      <div aria-hidden style={{ ...abs(1826, 860), fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CORAL, opacity: 0.25, transform: 'rotate(9deg)', pointerEvents: 'none' }}>
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
          animation: live ? 'cpj46-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span style={{ width: 14, height: 14, borderRadius: 99, background: accentDot, border: `2px solid ${CHARCOAL}`, display: 'inline-block' }} />
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
      <div style={{ ...abs(X0, 1020, W, 34), ...row, justifyContent: 'space-between', fontSize: 18, fontWeight: 700, color: '#7A7689' }}>
        <span style={{ ...row, gap: 10 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: SCRATCH_BLUE, border: `1.5px solid ${CHARCOAL}`, display: 'inline-block' }} />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 46 • Tangkap &amp; Hitung Poinmu (Bagian 2)!</span>
      </div>
    </div>
  );
};

const Highlight = ({ children, color = STABILO }: { children: ReactNode; color?: string }) => (
  <span style={{ background: color, padding: '2px 18px 6px', borderRadius: 16, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone', display: 'inline-block' }}>
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
    <div style={{ height: 54, background: titleBarColor, borderBottom: `2.5px solid ${CHARCOAL}`, padding: '0 24px', ...row, justifyContent: 'space-between', flexShrink: 0 }}>
      <div style={{ ...row, gap: 10 }}>
        <span style={{ width: 16, height: 16, borderRadius: 99, background: CORAL, border: `2px solid ${CHARCOAL}` }} />
        <span style={{ width: 16, height: 16, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}` }} />
        <span style={{ width: 16, height: 16, borderRadius: 99, background: TEAL, border: `2px solid ${CHARCOAL}` }} />
      </div>
      {headerLabel && (
        <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700, color: MUTED }}>
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
  fontSize = 30,
}: {
  icon: JuniorIconName;
  bgColor?: string;
  children: ReactNode;
  fontSize?: number;
}) => (
  <div style={{ ...row, gap: 20, alignItems: 'center' }}>
    <div style={{ width: 64, height: 64, borderRadius: 20, background: bgColor, border: `2.8px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...centerCol, flexShrink: 0 }}>
      <JuniorIcon name={icon} size={34} />
    </div>
    <div style={{ fontSize, fontWeight: 700, lineHeight: 1.32, color: CHARCOAL }}>{children}</div>
  </div>
);

// ============================================================================
// Reusable Pertemuan 46 Visuals (Apple, Bowl, Scoreboard Monitor, Blocks)
// ============================================================================

const RedAppleSvg = ({ size = 86 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M50 22 C50 12, 58 8, 63 11" stroke="#78350F" strokeWidth={5} strokeLinecap="round" />
    <path d="M52 20 C64 12, 76 18, 70 28 C64 34, 54 28, 52 20 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    <path
      d="M50 32 C30 22, 16 38, 18 58 C20 80, 34 90, 44 86 C48 84, 52 84, 56 86 C66 90, 80 80, 82 58 C84 38, 70 22, 50 32 Z"
      fill={CORAL}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <ellipse cx="34" cy="46" rx="6" ry="11" transform="rotate(-18 34 46)" fill={WHITE} fillOpacity={0.45} />
    <circle cx="42" cy="56" r="3.4" fill={CHARCOAL} />
    <circle cx="58" cy="56" r="3.4" fill={CHARCOAL} />
    <path d="M44 65 Q50 71 56 65" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" fill="none" />
  </svg>
);

const BowlSpriteSvg = ({ width = 165 }: { width?: number }) => (
  <svg width={width} height={Math.round(width * 0.56)} viewBox="0 0 180 100" fill="none">
    <ellipse cx="90" cy="28" rx="76" ry="16" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={4} />
    <path d="M16 30 C20 76, 52 92, 90 92 C128 92, 160 76, 164 30 Z" fill="#F59E0B" stroke={CHARCOAL} strokeWidth={4.5} strokeLinejoin="round" />
    <ellipse cx="90" cy="30" rx="62" ry="10" fill="#B45309" />
    <path d="M52 64 Q90 78 128 64" stroke={WHITE} strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.7} />
  </svg>
);

const Scratch3ScoreMonitor = ({ score, scale = 1 }: { score: number; scale?: number }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(12 * scale),
      padding: `${Math.round(8 * scale)}px ${Math.round(14 * scale)}px`,
      borderRadius: Math.round(14 * scale),
      background: '#E2E8F0',
      border: `2.8px solid ${CHARCOAL}`,
      boxShadow: `0 4px 0 ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(22 * scale),
      fontWeight: 700,
      color: CHARCOAL,
    }}
  >
    <span>Skor</span>
    <span
      style={{
        minWidth: Math.round(52 * scale),
        padding: `${Math.round(4 * scale)}px ${Math.round(14 * scale)}px`,
        borderRadius: Math.round(10 * scale),
        background: SCRATCH_VAR,
        color: WHITE,
        border: `2px solid ${CHARCOAL}`,
        textAlign: 'center',
      }}
    >
      {score}
    </span>
  </div>
);

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
    <polygon points="66,58 74,58 70,63" fill={CHARCOAL} />
    <path d="M62 67 Q70 74 78 67" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
  </svg>
);

const Scratch3HatFlagBlock = ({ scale = 1 }: { scale?: number }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(48 * scale),
      padding: `0 ${Math.round(18 * scale)}px`,
      borderRadius: `${Math.round(28 * scale)}px ${Math.round(28 * scale)}px ${Math.round(10 * scale)}px ${Math.round(10 * scale)}px`,
      background: SCRATCH_EVENT,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      color: CHARCOAL,
    }}
  >
    <span>when</span>
    <JuniorIcon name="flag" size={Math.round(22 * scale)} />
    <span>clicked</span>
  </div>
);

const Scratch3HatKeyBlock = ({ keyLabel, scale = 1 }: { keyLabel: string; scale?: number }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(48 * scale),
      padding: `0 ${Math.round(16 * scale)}px`,
      borderRadius: `${Math.round(28 * scale)}px ${Math.round(28 * scale)}px ${Math.round(10 * scale)}px ${Math.round(10 * scale)}px`,
      background: SCRATCH_EVENT,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      color: CHARCOAL,
      whiteSpace: 'nowrap',
    }}
  >
    <span>when</span>
    <span style={{ padding: `${Math.round(2 * scale)}px ${Math.round(10 * scale)}px`, borderRadius: 99, background: '#D99B00', color: WHITE, border: `2px solid ${CHARCOAL}`, fontSize: Math.round(15 * scale) }}>
      {keyLabel}
    </span>
    <span>key pressed</span>
  </div>
);

const Scratch3Block = ({
  color,
  textColor = WHITE,
  scale = 1,
  children,
}: {
  color: string;
  textColor?: string;
  scale?: number;
  children: ReactNode;
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(45 * scale),
      padding: `0 ${Math.round(16 * scale)}px`,
      borderRadius: Math.round(12 * scale),
      background: color,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      color: textColor,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

const WhiteOval = ({ val }: { val: string | number }) => (
  <span style={{ padding: '2px 10px', borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}`, color: CHARCOAL }}>
    {val}
  </span>
);

const DropPill = ({ bg, label }: { bg: string; label: string }) => (
  <span style={{ padding: '2px 11px', borderRadius: 99, background: bg, border: `2px solid ${WHITE}`, color: WHITE }}>
    {label}
  </span>
);

const Scratch3TouchingHexBlock = ({ target = 'Bowl', scale = 1 }: { target?: string; scale?: number }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(7 * scale),
      height: Math.round(42 * scale),
      padding: `0 ${Math.round(18 * scale)}px`,
      background: SCRATCH_SENSING,
      color: WHITE,
      clipPath: 'polygon(13px 0%, calc(100% - 13px) 0%, 100% 50%, calc(100% - 13px) 100%, 13px 100%, 0% 50%)',
      filter: 'drop-shadow(0 2px 0 rgba(30,30,44,0.85))',
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(17 * scale),
      fontWeight: 700,
      whiteSpace: 'nowrap',
    }}
  >
    <span>touching</span>
    <span style={{ padding: '2px 9px', borderRadius: 99, background: '#3D94B8', border: `1.5px solid ${WHITE}` }}>{target} v</span>
    <span>?</span>
  </div>
);

const Scratch3IfThenCBlock = ({ condition, scale = 1, children }: { condition: ReactNode; scale?: number; children?: ReactNode }) => {
  const s = scale;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ ...row, gap: Math.round(10 * s), minHeight: Math.round(50 * s), padding: `${Math.round(6 * s)}px ${Math.round(16 * s)}px`, borderRadius: `${Math.round(14 * s)}px ${Math.round(14 * s)}px ${Math.round(14 * s)}px 4px`, background: SCRATCH_CTRL, border: `2.8px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: Math.round(19 * s), fontWeight: 700, color: CHARCOAL }}>
        <span>if</span>
        {condition}
        <span>then</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div style={{ width: Math.round(24 * s), background: SCRATCH_CTRL, borderLeft: `2.8px solid ${CHARCOAL}`, borderRight: `2px solid ${CHARCOAL}` }} />
        <div style={{ padding: `${Math.round(6 * s)}px 0 ${Math.round(6 * s)}px ${Math.round(8 * s)}px`, display: 'flex', flexDirection: 'column', gap: Math.round(5 * s) }}>{children}</div>
      </div>
      <div style={{ width: Math.round(165 * s), height: Math.round(24 * s), borderRadius: `4px ${Math.round(12 * s)}px ${Math.round(12 * s)}px ${Math.round(12 * s)}px`, background: SCRATCH_CTRL, border: `2.8px solid ${CHARCOAL}` }} />
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Cover
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 46" accentDot={SCRATCH_VAR}>
      {/* Left Hero Copy */}
      <div style={{ ...abs(X0, 225, 860) }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 99, background: ORANGE_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, marginBottom: 22 }}>
          <JuniorIcon name="numbers" size={26} />
          <span>Proyek Catch Game: Panen Buah Bagian 2</span>
        </div>

        <h1 style={{ margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 90, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <Highlight>Tangkap &amp; Hitung</Highlight>
          <br />
          Poinmu!
        </h1>

        <p style={{ margin: '30px 0 0', fontSize: 31, fontWeight: 700, lineHeight: 1.4, color: MUTED, maxWidth: 790 }}>
          Panen Buah Bagian 2: Menambahkan <strong style={{ color: CHARCOAL }}>Papan Skor Digital</strong>{' '}
          Otomatis di Scratch 3.0!
        </p>

        <div style={{ ...row, gap: 16, marginTop: 34 }}>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: ORANGE_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="numbers" size={24} />
            <span>Variables: Skor</span>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="apple" size={24} />
            <span>Tangkap ke Bowl!</span>
          </div>
        </div>
      </div>

      {/* Right Visual: Biko + Orchard Catch Game with Skor: 5 */}
      <MacWindowCard
        left={1010}
        top={185}
        width={810}
        height={690}
        titleBarColor={ORANGE_SOFT}
        headerLabel="Scratch 3.0 • Papan Skor Panen Buah"
        padding={26}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 20,
            border: `3px solid ${CHARCOAL}`,
            background: 'linear-gradient(180deg, #BAE6FD 0%, #DCFCE7 68%, #86EFAC 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ ...abs(24, 22) }}>
            <Scratch3ScoreMonitor score={5} scale={1.15} />
          </div>

          <div style={{ ...abs(455, 115), animation: live ? 'cpj46-float 2.4s ease-in-out infinite' : undefined }}>
            <RedAppleSvg size={115} />
          </div>
          <div style={{ ...abs(575, 145), padding: '6px 16px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
            +1 Poin!
          </div>

          <div style={{ ...abs(410, 420) }}>
            <BowlSpriteSvg width={215} />
          </div>

          <div style={{ ...abs(18, 230), animation: live ? 'cpj46-float 3s ease-in-out infinite' : undefined }}>
            <BikoMascot pose="thumbs-up" width={240} badgeIcon={<JuniorIcon name="numbers" size={20} />} speechBubble="Skor naik!" />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Hari Ini (2 Kartu Misi)
// ============================================================================
const Slide02Misi: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI HARI INI" accentDot={SUNNY}>
      <SlideTitle>
        Apa Misi Panen Buah Bagian 2 <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      {/* Biko Left Anchor */}
      <div style={{ ...abs(95, 295, 360, 620), ...centerCol }}>
        <div style={{ animation: live ? 'cpj46-hop 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="point-left" width={320} badgeIcon={<JuniorIcon name="numbers" size={22} />} speechBubble="Hitung poin!" />
        </div>
      </div>

      {/* macOS Window with 2 Cards */}
      <MacWindowCard
        left={480}
        top={240}
        width={1340}
        height={700}
        titleBarColor={ORANGE_SOFT}
        headerLabel="Misi Pertemuan 46"
        padding={42}
      >
        <div style={{ display: 'flex', gap: 36, height: '100%' }}>
          {/* Card 1: Score Variable */}
          <div style={{ flex: 1, borderRadius: 24, background: ORANGE_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SCRATCH_VAR, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <Scratch3ScoreMonitor score={0} scale={1.38} />

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Buat <span style={{ color: '#C2410C' }}>Papan Skor Digital</span> (<em>Variable</em>)
            </div>
          </div>

          {/* Card 2: Catch Fruit & Increment Score */}
          <div style={{ flex: 1, borderRadius: 24, background: TEAL_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ ...row, gap: 12 }}>
                <RedAppleSvg size={82} />
                <span style={{ padding: '6px 14px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
                  +1
                </span>
              </div>
              <BowlSpriteSvg width={170} />
            </div>

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Tangkap Buah &amp; Tambah <span style={{ color: '#047857' }}>Skor Otomatis!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Kenalan Sama Kotak Skor (Variables)
// ============================================================================
const Slide03BuatVariabel: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="BLOK ORANYE TUA • VARIABLES" accentDot={SCRATCH_VAR}>
      <SlideTitle>
        Buat <Highlight color="#FFEDD5">Kotak Skor</Highlight> Ajaib!
      </SlideTitle>

      {/* Left Scratch 3.0 Variables Palette Mockup */}
      <MacWindowCard
        left={X0}
        top={245}
        width={840}
        height={680}
        titleBarColor={ORANGE_SOFT}
        headerLabel="Palet Variables Scratch 3.0"
        padding={28}
      >
        <div style={{ height: '100%', display: 'flex', gap: 24 }}>
          <div style={{ width: 170, borderRadius: 20, background: '#F8FAFC', border: `2.5px solid ${CHARCOAL}`, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
            {[
              { label: 'Events', color: SCRATCH_EVENT, active: false },
              { label: 'Control', color: SCRATCH_CTRL, active: false },
              { label: 'Sensing', color: SCRATCH_SENSING, active: false },
              { label: 'Variables', color: SCRATCH_VAR, active: true },
            ].map((c) => (
              <div key={c.label} style={{ width: '100%', padding: '10px 6px', borderRadius: 14, background: c.active ? ORANGE_SOFT : 'transparent', border: c.active ? `2.5px solid ${SCRATCH_VAR}` : 'none', ...centerCol, gap: 6 }}>
                <span style={{ width: 32, height: 32, borderRadius: 99, background: c.color, border: `2px solid ${CHARCOAL}` }} />
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 16, fontWeight: 700 }}>{c.label}</span>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, ...centerCol, gap: 26 }}>
            <div style={{ padding: '14px 28px', borderRadius: 18, background: WHITE, border: `3.5px solid ${CHARCOAL}`, animation: live ? 'cpj46-pulse 1.8s infinite' : undefined, fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
              Make a Variable
            </div>

            <JuniorIcon name="arrow-down" size={40} />

            <div style={{ padding: '14px 30px', borderRadius: 18, background: ORANGE_SOFT, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
              Ketik: <Highlight>Skor</Highlight> -&gt; OK!
            </div>

            <JuniorIcon name="arrow-down" size={40} />

            <Scratch3ScoreMonitor score={0} scale={1.25} />
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={980}
        top={245}
        width={840}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Langkah Membuat Papan Skor"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="numbers" bgColor={ORANGE_SOFT} fontSize={32}>
              Klik lingkaran <strong>Oranye Tua (Variables)</strong> di rak kiri
            </BulletRow>
            <BulletRow icon="plus-circle" bgColor={SUNNY_SOFT} fontSize={32}>
              Klik <strong>Make a Variable</strong>, ketik <strong><code>Skor</code></strong>, lalu klik <strong>OK</strong> -&gt; Muncul <strong>Papan Skor</strong> di layar!
            </BulletRow>
          </div>

          <div style={{ ...row, gap: 20, padding: '18px 24px', borderRadius: 20, background: ORANGE_SOFT, border: `3px solid ${CHARCOAL}` }}>
            <BikoMascot pose="thumbs-up" width={145} />
            <div style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.32 }}>
              <strong>Variable</strong> seperti kotak ajaib untuk menyimpan angka skor pemain!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus #1: Siapkan Keranjang Penangkap (Bowl)
// ============================================================================
const Slide04KeranjangPenangkap: Page = () => {
  const [bowlX, setBowlX] = useState(50);

  return (
    <JuniorFrame badge="PERSIAPAN PENANGKAP" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Pasang <Highlight>Keranjang</Highlight> di Bawah!
      </SlideTitle>

      {/* Left Spotlight Explanation */}
      <MacWindowCard
        left={X0}
        top={245}
        width={860}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Kemudi Kiri & Kanan untuk Bowl"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <BulletRow icon="box" bgColor={SUNNY_SOFT} fontSize={31}>
              Tambah Sprite <strong>Mangkuk (Bowl)</strong> &amp; taruh di bagian bawah panggung
            </BulletRow>
            <BulletRow icon="arrow-lr" bgColor={SKY_SOFT} fontSize={31}>
              Pasang kemudi <code>left arrow</code> (<code>change x by -20</code>) &amp;{' '}
              <code>right arrow</code> (<code>change x by 20</code>)!
            </BulletRow>
          </div>

          <div style={{ display: 'flex', gap: 20 }}>
            <button
              type="button"
              onClick={() => {
                playCatchSound('reset');
                setBowlX((x) => Math.max(20, x - 18));
              }}
              className="cpj46-card-btn"
              style={{ flex: 1, padding: 18, borderRadius: 20, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, boxShadow: `0 5px 0 ${CHARCOAL}`, ...centerCol, gap: 6 }}
            >
              <Scratch3HatKeyBlock keyLabel="left arrow" scale={0.78} />
              <Scratch3Block color={SCRATCH_BLUE} scale={0.8}>
                <span>change x by</span>
                <WhiteOval val={-20} />
              </Scratch3Block>
            </button>

            <button
              type="button"
              onClick={() => {
                playCatchSound('reset');
                setBowlX((x) => Math.min(80, x + 18));
              }}
              className="cpj46-card-btn"
              style={{ flex: 1, padding: 18, borderRadius: 20, background: TEAL_SOFT, border: `3px solid ${CHARCOAL}`, boxShadow: `0 5px 0 ${CHARCOAL}`, ...centerCol, gap: 6 }}
            >
              <Scratch3HatKeyBlock keyLabel="right arrow" scale={0.78} />
              <Scratch3Block color={SCRATCH_BLUE} scale={0.8}>
                <span>change x by</span>
                <WhiteOval val={20} />
              </Scratch3Block>
            </button>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Stage Bowl Demo */}
      <MacWindowCard
        left={1000}
        top={245}
        width={820}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Klik Tombol Kode Kiri untuk Geser Bowl!"
        padding={28}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 22,
            border: `3px solid ${CHARCOAL}`,
            background: 'linear-gradient(180deg, #BAE6FD 0%, #DCFCE7 74%, #86EFAC 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ ...abs(24, 24) }}>
            <BikoMascot pose="point-left" width={235} speechBubble="Geser kiri kanan!" />
          </div>

          <div
            style={{
              position: 'absolute',
              left: `${bowlX}%`,
              bottom: 32,
              transform: 'translateX(-50%)',
              transition: 'left 180ms ease-out',
            }}
          >
            <BowlSpriteSvg width={210} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus #2: Mulai Permainan dari Angka 0 (set [Skor] to 0)
// ============================================================================
const Slide05MulaiDariNol: Page = () => {
  const [score, setScore] = useState(7);

  return (
    <JuniorFrame badge="ATURAN MAIN GAME" accentDot={SCRATCH_VAR}>
      <SlideTitle>
        Mulai Game dari <Highlight>Angka 0!</Highlight>
      </SlideTitle>

      {/* Left Interactive Reset Block */}
      <MacWindowCard
        left={X0}
        top={245}
        width={820}
        height={680}
        titleBarColor={ORANGE_SOFT}
        headerLabel="Klik untuk Coba Reset Skor!"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-around' }}>
          <Scratch3ScoreMonitor score={score} scale={1.48} />

          <button
            type="button"
            onClick={() => {
              playCatchSound('reset');
              setScore((s) => (s === 0 ? 7 : 0));
            }}
            className="cpj46-card-btn"
            style={{ background: 'transparent', border: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}
          >
            <Scratch3HatFlagBlock scale={1.24} />
            <Scratch3Block color={SCRATCH_VAR} scale={1.24}>
              <span>set</span>
              <DropPill bg={SCRATCH_VAR_DARK} label="Skor v" />
              <span>to</span>
              <WhiteOval val={0} />
            </Scratch3Block>
          </button>

          <div style={{ padding: '12px 24px', borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 23, fontWeight: 800 }}>
            {score === 0 ? 'Skor kembali menjadi 0! Siap main game baru!' : 'Klik tumpukan blok di atas untuk mereset Skor jadi 0!'}
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={960}
        top={245}
        width={860}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Kenapa Harus Reset ke 0?"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="reset" bgColor={ORANGE_SOFT} fontSize={32}>
              Pilih blok <code>set [Skor] to (0)</code> di rak <em>Variables</em>
            </BulletRow>
            <BulletRow icon="flag" bgColor={TEAL_SOFT} fontSize={32}>
              Pasang tepat di bawah <code>when Bendera clicked</code> agar skor kembali{' '}
              <strong><code>0</code></strong> setiap mulai main!
            </BulletRow>
          </div>

          <div style={{ ...row, gap: 20, padding: '18px 24px', borderRadius: 20, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}` }}>
            <BikoMascot pose="thumbs-up" width={145} />
            <div style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.32 }}>
              Sama seperti papan skor lomba: setiap pertandingan baru selalu dimulai dari angka <strong>0</strong>!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Blok Apa untuk Menambah Poin?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle size={48} maxWidth={1680}>
        Saat Apel Masuk ke <Highlight>Keranjang (Bowl)</Highlight>, Blok Apa untuk Menambah{' '}
        <Highlight>+1 Poin?</Highlight>
      </SlideTitle>

      {/* Card A — Correct: change [Skor] by (1) */}
      <button
        type="button"
        onClick={() => {
          playCatchSound('collect');
          setPicked('A');
        }}
        className="cpj46-card-btn"
        style={{
          ...abs(X0, 260, 820, 480),
          borderRadius: 30,
          background: picked === 'A' ? TEAL_SOFT : WHITE,
          border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 36,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 16, background: SUNNY, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
            A
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Tambah Skor 1 (change by 1)
          </span>
        </div>

        <div style={{ ...row, gap: 18 }}>
          <JuniorIcon name="star-glow" size={68} />
          <Scratch3Block color={SCRATCH_VAR} scale={1.24}>
            <span>change</span>
            <DropPill bg={SCRATCH_VAR_DARK} label="Skor v" />
            <span>by</span>
            <WhiteOval val={1} />
          </Scratch3Block>
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'A' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={26} />
              <span>Benar! Blok change by (1) menambah +1 poin!</span>
            </div>
          ) : (
            <span style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Card B — Wrong: set [Skor] to (0) */}
      <button
        type="button"
        onClick={() => {
          playCatchSound('boing');
          setPicked('B');
        }}
        className="cpj46-card-btn"
        style={{
          ...abs(1000, 260, 820, 480),
          borderRadius: 30,
          background: picked === 'B' ? CORAL_SOFT : WHITE,
          border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 36,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          animation: picked === 'B' ? 'cpj46-shake 320ms ease' : undefined,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 16, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
            B
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Atur Skor ke 0 (set to 0)
          </span>
        </div>

        <div style={{ ...row, gap: 18 }}>
          <JuniorIcon name="zero" size={68} />
          <Scratch3Block color={SCRATCH_VAR} scale={1.24}>
            <span>set</span>
            <DropPill bg={SCRATCH_VAR_DARK} label="Skor v" />
            <span>to</span>
            <WhiteOval val={0} />
          </Scratch3Block>
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'B' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={26} />
              <span>Bukan! Itu bikin skornya kembali ke angka 0!</span>
            </div>
          ) : (
            <span style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Bottom Biko Prompt Bar */}
      <div
        style={{
          ...abs(X0, 775, W, 200),
          borderRadius: 28,
          background: SUNNY_SOFT,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 8px 0 ${CHARCOAL}`,
          padding: '0 44px',
          ...row,
          justifyContent: 'center',
          gap: 36,
        }}
      >
        <div style={{ animation: live ? 'cpj46-float 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thinking" width={165} badgeIcon={<JuniorIcon name="question" size={22} />} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
          {picked === 'A'
            ? 'Cerdas! change [Skor] by (1) menambah poin setiap menangkap buah!'
            : picked === 'B'
              ? 'Ups! set to (0) untuk mereset skor. Cari yang menambah by (1)!'
              : 'Tunjuk blok yang benar di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Jurus #3: Tangkap Buah & Tambah Poin Otomatis!
// ============================================================================
const Slide07ResepTambahSkor: Page = () => {
  return (
    <JuniorFrame badge="RESEP TAMBAH SKOR" accentDot={TEAL}>
      <SlideTitle>
        Tangkap Buah, <Highlight>Poin Bertambah!</Highlight>
      </SlideTitle>

      {/* Left Code Block Stack */}
      <MacWindowCard
        left={X0}
        top={240}
        width={760}
        height={700}
        titleBarColor={TEAL_SOFT}
        headerLabel="Kode di Dalam forever (Sprite Apel)"
        padding={32}
      >
        <div style={{ height: '100%', ...centerCol, alignItems: 'flex-start', paddingLeft: 26 }}>
          <Scratch3IfThenCBlock scale={1.12} condition={<Scratch3TouchingHexBlock target="Bowl" scale={1.12} />}>
            <Scratch3Block color={SCRATCH_SOUND} scale={1.08}>
              <JuniorIcon name="speaker" size={22} />
              <span>start sound [Collect]</span>
            </Scratch3Block>
            <Scratch3Block color={SCRATCH_VAR} scale={1.08}>
              <span>change</span>
              <DropPill bg={SCRATCH_VAR_DARK} label="Skor v" />
              <span>by</span>
              <WhiteOval val={1} />
            </Scratch3Block>
            <Scratch3Block color={SCRATCH_BLUE} scale={1.08}>
              <span>go to</span>
              <DropPill bg="#3373CC" label="random position" />
            </Scratch3Block>
            <Scratch3Block color={SCRATCH_BLUE} scale={1.08}>
              <span>set y to</span>
              <WhiteOval val={180} />
            </Scratch3Block>
          </Scratch3IfThenCBlock>
        </div>
      </MacWindowCard>

      {/* Right 3 Step Cards */}
      <div style={{ ...abs(900, 240, 920, 700), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {[
          {
            num: '1. Deteksi Sentuhan',
            bg: SKY_SOFT,
            border: SKY,
            icon: 'compass' as JuniorIconName,
            text: (
              <>
                <code>if &lt; touching [Bowl] ? &gt; then</code>
              </>
            ),
          },
          {
            num: '2. Bunyi & Tambah Poin',
            bg: ORANGE_SOFT,
            border: SCRATCH_VAR,
            icon: 'speaker' as JuniorIconName,
            text: (
              <>
                <code>start sound [Collect]</code> -&gt; <code>change [Skor] by (1)</code>
              </>
            ),
          },
          {
            num: '3. Muncul Lagi dari Atas',
            bg: TEAL_SOFT,
            border: TEAL,
            icon: 'arrow-up' as JuniorIconName,
            text: (
              <>
                <code>go to [random position]</code> -&gt; <code>set y to (180)</code>
              </>
            ),
          },
        ].map((step) => (
          <div
            key={step.num}
            style={{
              height: 212,
              borderRadius: 26,
              background: step.bg,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '22px 28px',
              ...row,
              gap: 24,
            }}
          >
            <div style={{ width: 82, height: 82, borderRadius: 22, background: WHITE, border: `3px solid ${step.border}`, ...centerCol, flexShrink: 0 }}>
              <JuniorIcon name={step.icon} size={46} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                {step.num}
              </div>
              <div style={{ fontSize: 25, fontWeight: 700, color: MUTED, marginTop: 6, lineHeight: 1.32 }}>
                {step.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Papan Skor Digital (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsSkor: Page = () => {
  return (
    <JuniorFrame badge="TIPS PEMBUAT GAME SKOR" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Papan Skormu <Highlight>Menghitung dengan Tepat!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & TEPAT"
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
            <BulletRow icon="zero" bgColor={TEAL_SOFT} fontSize={28}>
              Taruh <code>set [Skor] to (0)</code> <strong>Di Luar</strong> <code>forever</code> (tepat di bawah Bendera Hijau)
            </BulletRow>
            <BulletRow icon="arrow-up" bgColor={SUNNY_SOFT} fontSize={28}>
              Langsung kembalikan Apel ke <code>y = 180</code> setelah menyentuh Keranjang
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <Scratch3ScoreMonitor score={1} scale={1.0} />
            <JuniorIcon name="arrow-right" size={32} />
            <Scratch3ScoreMonitor score={2} scale={1.0} />
            <JuniorIcon name="check" size={56} />
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
            <BulletRow icon="warning" bgColor={CORAL_SOFT} fontSize={28}>
              Menaruh <code>set [Skor] to (0)</code> <strong>Di Dalam</strong> <code>forever</code> (skor terkunci di 0 terus!)
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={28}>
              Lupa memindahkan Apel ke atas saat tertangkap (skor melonjak cepat sekali sentuh)
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <Scratch3ScoreMonitor score={0} scale={1.25} />
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Mainkan Game Panen Buah Lengkap!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [bowlX, setBowlX] = useState(50);
  const [apple, setApple] = useState({ x: 52, y: 12 });
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(true);
  const [caughtFlash, setCaughtFlash] = useState(false);

  useEffect(() => {
    if (!live || !running) return;
    const t = setInterval(() => {
      setApple((prev) => {
        const ny = prev.y + 4.5;
        if (ny >= 74 && ny <= 88 && Math.abs(prev.x - bowlX) < 16) {
          playCatchSound('collect');
          setScore((s) => s + 1);
          setCaughtFlash(true);
          setTimeout(() => setCaughtFlash(false), 380);
          return { x: Math.round(16 + Math.random() * 68), y: 10 };
        }
        if (ny > 92) {
          return { x: Math.round(16 + Math.random() * 68), y: 10 };
        }
        return { ...prev, y: ny };
      });
    }, 115);
    return () => clearInterval(t);
  }, [live, running, bowlX]);

  useEffect(() => {
    if (!live) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setBowlX((x) => Math.max(14, x - 11));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setBowlX((x) => Math.min(86, x + 11));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [live]);

  const resetGame = () => {
    playCatchSound('reset');
    setScore(0);
    setBowlX(50);
    setApple({ x: 50, y: 10 });
    setRunning(true);
  };

  return (
    <JuniorFrame badge="AYO BUAT & MAIN!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Tangkap &amp; Hitung Poinmu!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'box' as JuniorIconName,
            text: (
              <>
                Tambah Sprite <strong>Keranjang (Bowl)</strong> &amp; pasang kemudi <strong>Kiri-Kanan</strong>
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'numbers' as JuniorIconName,
            text: (
              <>
                Buat Variable <strong>Skor</strong>, pasang <strong>set to (0)</strong> &amp; <strong>change by (1)</strong> saat kena Bowl
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
                Klik <strong>Bendera Hijau!</strong> Tangkap apel &amp; kumpulkan <strong>10 Poin!</strong>
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

      {/* Playable Interactive Catch Game Simulator */}
      <div
        style={{
          ...abs(X0, 400, 1280, 565),
          borderRadius: 24,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          background: WHITE,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ height: 46, background: SCRATCH_BLUE, borderBottom: `2.5px solid ${CHARCOAL}`, padding: '0 18px', ...row, justifyContent: 'space-between', color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
          <span>SCRATCH 3.0 • Panen Buah Lengkap (Target: 10 Poin!)</span>
          <div style={{ ...row, gap: 10 }}>
            <button
              type="button"
              onClick={resetGame}
              className="cpj46-card-btn"
              style={{ padding: '4px 14px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2px solid ${CHARCOAL}`, ...row, gap: 6, fontSize: 15, fontWeight: 700 }}
            >
              <JuniorIcon name="flag" size={18} />
              <span>Reset Skor 0</span>
            </button>
            <button
              type="button"
              onClick={() => setRunning((r) => !r)}
              className="cpj46-card-btn"
              style={{ padding: '4px 14px', borderRadius: 99, background: WHITE, color: CHARCOAL, border: `2px solid ${CHARCOAL}`, ...row, gap: 6, fontSize: 15, fontWeight: 700 }}
            >
              <JuniorIcon name={running ? 'stop' : 'play'} size={18} />
              <span>{running ? 'Jeda' : 'Main'}</span>
            </button>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex' }}>
          {/* Code Snippet Summary */}
          <div style={{ width: 510, padding: '16px 20px', borderRight: `2.5px solid ${CHARCOAL}`, background: WHITE, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <Scratch3HatFlagBlock scale={0.78} />
              <Scratch3Block color={SCRATCH_VAR} scale={0.78}>
                <span>set</span>
                <DropPill bg={SCRATCH_VAR_DARK} label="Skor v" />
                <span>to</span>
                <WhiteOval val={0} />
              </Scratch3Block>
              <Scratch3IfThenCBlock scale={0.76} condition={<Scratch3TouchingHexBlock target="Bowl" scale={0.76} />}>
                <Scratch3Block color={SCRATCH_SOUND} scale={0.74}>
                  <JuniorIcon name="speaker" size={16} />
                  <span>start sound [Collect]</span>
                </Scratch3Block>
                <Scratch3Block color={SCRATCH_VAR} scale={0.74}>
                  <span>change</span>
                  <DropPill bg={SCRATCH_VAR_DARK} label="Skor v" />
                  <span>by</span>
                  <WhiteOval val={1} />
                </Scratch3Block>
                <Scratch3Block color={SCRATCH_BLUE} scale={0.74}>
                  <span>go to [random] &amp; set y (180)</span>
                </Scratch3Block>
              </Scratch3IfThenCBlock>
            </div>
          </div>

          {/* Interactive Catch Stage + D-pad */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#EEF3FA', padding: 14, gap: 10 }}>
            <div style={{ flex: 1, position: 'relative', borderRadius: 18, border: `3px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #BAE6FD 0%, #DCFCE7 74%, #86EFAC 100%)', overflow: 'hidden' }}>
              <div style={{ ...abs(14, 14) }}>
                <Scratch3ScoreMonitor score={score} scale={0.92} />
              </div>

              {score >= 10 && (
                <div style={{ ...abs(215, 16), padding: '6px 16px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
                  Yeay! 10 Poin Tercapai!
                </div>
              )}

              <div style={{ position: 'absolute', left: `${apple.x}%`, top: `${apple.y}%`, transform: 'translate(-50%, -50%)', transition: 'top 100ms linear' }}>
                <RedAppleSvg size={72} />
              </div>

              <div style={{ position: 'absolute', left: `${bowlX}%`, bottom: 12, transform: 'translateX(-50%)', transition: 'left 130ms ease-out' }}>
                {caughtFlash && (
                  <div style={{ position: 'absolute', left: '50%', bottom: 76, transform: 'translateX(-50%)', padding: '4px 12px', borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
                    +1!
                  </div>
                )}
                <BowlSpriteSvg width={145} />
              </div>
            </div>

            <div style={{ ...row, justifyContent: 'center', gap: 18 }}>
              <button
                type="button"
                onClick={() => setBowlX((x) => Math.max(14, x - 14))}
                className="cpj46-card-btn"
                style={{ padding: '7px 26px', borderRadius: 14, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}
              >
                <JuniorIcon name="arrow-left" size={22} />
                <span>Geser Kiri</span>
              </button>
              <button
                type="button"
                onClick={() => setBowlX((x) => Math.min(86, x + 14))}
                className="cpj46-card-btn"
                style={{ padding: '7px 26px', borderRadius: 14, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}
              >
                <span>Geser Kanan</span>
                <JuniorIcon name="arrow-right" size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cheering Biko & Scratch Cat */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 14 }}>
        <div style={{ ...row, alignItems: 'flex-end', animation: live ? 'cpj46-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thumbs-up" width={265} badgeIcon={<JuniorIcon name="numbers" size={22} />} speechBubble={score >= 10 ? '10 Poin!' : 'Tangkap apel!'} />
          <ScratchCatSvg size={130} waving />
        </div>
        <button
          type="button"
          onClick={resetGame}
          className="cpj46-card-btn"
          style={{ padding: '13px 26px', borderRadius: 20, background: SUNNY, color: CHARCOAL, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, ...row, gap: 10 }}
        >
          <JuniorIcon name="flag" size={24} />
          <span>Ulang dari Skor 0</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 46 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="PANEN BUAH SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj46-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj46-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="trophy" size={50} />
      </div>

      <SlideTitle top={135} size={58} align="center" maxWidth={1540}>
        Hore! Kamu Master <Highlight>Papan Skor Digital Hebat!</Highlight>
      </SlideTitle>

      {/* Center Celebration Window */}
      <MacWindowCard
        left={260}
        top={260}
        width={1060}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 46"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, gap: 22, textAlign: 'center' }}>
          {/* Golden Scoreboard 100 & Fruit Basket Medal */}
          <div style={{ animation: live ? 'cpj46-float 2.6s ease-in-out infinite' : undefined }}>
            <svg width={215} height={215} viewBox="0 0 210 210">
              <path d="M72 128 L52 195 L82 180 L96 198 L106 135 Z" fill={SCRATCH_VAR} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M138 128 L158 195 L128 180 L114 198 L104 135 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="105" cy="96" r="72" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="105" cy="96" r="56" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.2} />
              {/* Score 100 Badge + Basket */}
              <rect x="65" y="58" width="80" height="36" rx="10" fill={SCRATCH_VAR} stroke={CHARCOAL} strokeWidth={3.2} />
              <text x="105" y="83" textAnchor="middle" fill={WHITE} fontFamily="Fredoka, sans-serif" fontSize="22" fontWeight="700">100</text>
              <path d="M72 104 L138 104 L130 128 C128 132, 82 132, 80 128 Z" fill="#F59E0B" stroke={CHARCOAL} strokeWidth={3.2} />
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
            <span>Lencana Jagoan Variabel &amp; Catch Game</span>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, lineHeight: 1.38, maxWidth: 920, color: CHARCOAL }}>
            Kamu sudah jago membuat{' '}
            <Highlight color="#FFEDD5">Papan Skor Otomatis (Variables)</Highlight> di Scratch 3.0!
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot pose="jump" width={295} badgeIcon={<JuniorIcon name="star-glow" size={22} />} speechBubble="Juara Skor!" />
          <div style={{ animation: live ? 'cpj46-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 46 — Tangkap & Hitung Poinmu! (Panen Buah Bagian 2) 🍎🧮
Hari ini anak-anak melengkapi game Panen Buah dengan Keranjang penangkap dan Papan Skor Digital otomatis!`,

  `Dua misi hari ini:
1. Membuat Papan Skor Digital (Variable) bernama "Skor".
2. Menangkap Apel dengan Keranjang (Bowl) agar Skor bertambah +1 otomatis!`,

  `Kenalan sama Kotak Skor (Variables):
Klik kategori Oranye Tua (Variables) -> Make a Variable -> ketik "Skor" -> OK! Kotak Skor [ 0 ] langsung muncul di Stage!`,

  `Jurus 1 — Pasang Keranjang Penangkap (Bowl) di bagian bawah Stage, lalu pasang kemudi panah kiri (change x by -20) & kanan (change x by 20)!`,

  `Jurus 2 — Mulai Game dari Angka 0:
Pasang set [Skor] to (0) tepat di bawah when Bendera clicked agar permainan baru selalu dimulai dari 0.`,

  `Permainan Cepat! Ayo tebak bersama:
Saat Apel masuk ke Keranjang (Bowl), blok apa untuk menambah +1 poin — Pilihan A (change [Skor] by (1)) atau Pilihan B (set [Skor] to (0))?`,

  `Jurus 3 — Resep Tambah Skor di Sprite Apel:
Di dalam forever, pasang if <touching [Bowl]?> then -> start sound [Collect] -> change [Skor] by (1) -> go to [random position] -> set y to (180)!`,

  `Tips Jagoan Papan Skor Digital:
BOLEH taruh set [Skor] to (0) DI LUAR forever & langsung kembalikan Apel ke y = 180 saat tertangkap.
JANGAN menaruh set to (0) di dalam forever (skor terkunci di 0 terus!) atau lupa memindahkan Apel ke atas!`,

  `Misi Praktik Mainkan Game Panen Buah Lengkap!
Gunakan tombol Panah Kiri/Kanan di keyboard atau tombol layar untuk menggeser Bowl dan kumpulkan 10 Poin!`,

  `Hore! Kamu Master Papan Skor Digital Hebat! 🎉🏅
Selamat meraih Lencana Jagoan Variabel & Catch Game di Pertemuan 46!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 46 — Tangkap & Hitung Poinmu (Panen Buah Bagian 2)!',
  createdAt: '2026-11-16T16:14:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BuatVariabel,
  Slide04KeranjangPenangkap,
  Slide05MulaiDariNol,
  Slide06AyoTebak,
  Slide07ResepTambahSkor,
  Slide08TipsSkor,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

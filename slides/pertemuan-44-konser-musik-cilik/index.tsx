import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-44-konser-musik-cilik';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj44-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj44-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj44-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj44-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.78); }
  50% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
}
@keyframes cpj44-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj44-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj44-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj44-card-btn:hover {
  transform: translateY(-4px);
}
.cpj44-card-btn:active {
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

/** Play authentic MIDI piano/instrument notes (Do=60, Re=62, Mi=64) or Snare Drum via Web Audio API */
function playMusicTone(
  midiOrKind: 60 | 62 | 64 | 'drum' | 'boing',
  instrument: 'Piano' | 'Marimba' | 'Gitar' = 'Piano',
) {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (midiOrKind === 'drum') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(195, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (midiOrKind === 'boing') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else {
      const freqMap: Record<60 | 62 | 64, number> = {
        60: 261.63, // C4 (Do)
        62: 293.66, // D4 (Re)
        64: 329.63, // E4 (Mi)
      };
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = instrument === 'Gitar' ? 'sawtooth' : instrument === 'Marimba' ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freqMap[midiOrKind], ctx.currentTime);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.34);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    }

    setTimeout(() => {
      void ctx.close();
    }, 420);
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
const MUSIC_TEAL = '#14B8A6';
const MUSIC_TEAL_DARK = '#0F766E';
const MUSIC_TEAL_SOFT = '#CCFBF1';
const CORAL = '#F45B49';
const CORAL_SOFT = '#FEF2F2';
const SUNNY = '#FBBF24';
const SUNNY_SOFT = '#FEF9C3';
const STABILO = '#FEF08A';
const LAVENDER = '#A78BFA';
const SKY = '#60A5FA';
const SKY_SOFT = '#EFF6FF';
const PINK = '#EC4899';
const PINK_SOFT = '#FCE7F3';
const SCRATCH_BLUE = '#4D97FF';
const SCRATCH_LOOKS = '#9966FF';
const SCRATCH_EVENT = '#FFBF00';

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
  accentDot = MUSIC_TEAL,
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
          animation: live ? 'cpj44-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 44 • Konser Musik Cilik!</span>
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
// Reusable Pertemuan 44 Visuals (Piano Sprite, Snare Drum, Music Blocks)
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
    <polygon points="66,58 74,58 70,63" fill={CHARCOAL} />
    <path d="M62 67 Q70 74 78 67" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
  </svg>
);

const RainbowPianoSvg = ({
  width = 240,
  activeNote = null,
  hueRotateDeg = 0,
}: {
  width?: number;
  activeNote?: 60 | 62 | 64 | null;
  hueRotateDeg?: number;
}) => (
  <svg
    width={width}
    height={Math.round(width * 0.56)}
    viewBox="0 0 260 146"
    fill="none"
    style={{ filter: `hue-rotate(${hueRotateDeg}deg)`, transition: 'filter 180ms ease' }}
  >
    <rect x="10" y="14" width="240" height="122" rx="18" fill={WHITE} stroke={CHARCOAL} strokeWidth={4.5} />
    {/* Three Main Rainbow Keys */}
    <rect x="22" y="24" width="68" height="100" rx="10" fill={activeNote === 60 ? '#93C5FD' : '#DBEAFE'} stroke={CHARCOAL} strokeWidth={3.5} />
    <rect x="96" y="24" width="68" height="100" rx="10" fill={activeNote === 62 ? SUNNY : '#FEF9C3'} stroke={CHARCOAL} strokeWidth={3.5} />
    <rect x="170" y="24" width="68" height="100" rx="10" fill={activeNote === 64 ? '#6EE7B7' : '#D1FAE5'} stroke={CHARCOAL} strokeWidth={3.5} />
    {/* Black Sharps */}
    <rect x="76" y="24" width="34" height="58" rx="7" fill={CHARCOAL} />
    <rect x="150" y="24" width="34" height="58" rx="7" fill={CHARCOAL} />
    {/* Key Labels */}
    <text x="56" y="108" textAnchor="middle" fill={CHARCOAL} fontFamily="Fredoka, sans-serif" fontSize="22" fontWeight="700">Do</text>
    <text x="130" y="108" textAnchor="middle" fill={CHARCOAL} fontFamily="Fredoka, sans-serif" fontSize="22" fontWeight="700">Re</text>
    <text x="204" y="108" textAnchor="middle" fill={CHARCOAL} fontFamily="Fredoka, sans-serif" fontSize="22" fontWeight="700">Mi</text>
  </svg>
);

const SnareDrumSvg = ({ size = 128, hit = false }: { size?: number; hit?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 140 140"
    fill="none"
    style={{ transform: hit ? 'scale(1.08)' : 'scale(1)', transition: 'transform 140ms ease' }}
  >
    {/* Drum Sticks */}
    <line x1="28" y1="24" x2="64" y2="50" stroke={CHARCOAL} strokeWidth={5} strokeLinecap="round" />
    <line x1="112" y1="24" x2="76" y2="50" stroke={CHARCOAL} strokeWidth={5} strokeLinecap="round" />
    <circle cx="64" cy="50" r="6" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
    <circle cx="76" cy="50" r="6" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.5} />
    {/* Drum Body */}
    <rect x="24" y="54" width="92" height="56" rx="14" fill={PINK} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="70" cy="54" rx="46" ry="15" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={4} />
    <path d="M40 69 L56 108 L70 70 L84 108 L100 69" fill="none" stroke={WHITE} strokeWidth={3.5} strokeLinejoin="round" />
  </svg>
);

const Scratch3KeyHatBlock = ({ keyName = '1', scale = 1 }: { keyName?: string; scale?: number }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(50 * scale),
      padding: `0 ${Math.round(18 * scale)}px`,
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
    <span style={{ padding: `${Math.round(2 * scale)}px ${Math.round(12 * scale)}px`, borderRadius: 99, background: '#D99B00', color: WHITE, border: `2px solid ${CHARCOAL}`, fontSize: Math.round(16 * scale) }}>
      {keyName}
    </span>
    <span>key pressed</span>
  </div>
);

const Scratch3MusicBlock = ({ scale = 1, children }: { scale?: number; children: ReactNode }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(46 * scale),
      padding: `0 ${Math.round(16 * scale)}px`,
      borderRadius: Math.round(12 * scale),
      background: MUSIC_TEAL,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      color: WHITE,
      whiteSpace: 'nowrap',
    }}
  >
    <JuniorIcon name="music-note" size={Math.round(20 * scale)} />
    {children}
  </div>
);

const Scratch3LooksBlock = ({ scale = 1, children }: { scale?: number; children: ReactNode }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(8 * scale),
      height: Math.round(46 * scale),
      padding: `0 ${Math.round(16 * scale)}px`,
      borderRadius: Math.round(12 * scale),
      background: SCRATCH_LOOKS,
      border: `2.8px solid ${CHARCOAL}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: Math.round(18 * scale),
      fontWeight: 700,
      color: WHITE,
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

const TealDrop = ({ label }: { label: string }) => (
  <span style={{ padding: '2px 11px', borderRadius: 99, background: MUSIC_TEAL_DARK, border: `2px solid ${WHITE}`, color: WHITE }}>
    {label}
  </span>
);

// ============================================================================
// SLIDE 01 — Cover
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 44" accentDot={MUSIC_TEAL}>
      {/* Left Hero Copy */}
      <div style={{ ...abs(X0, 225, 860) }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 20px',
            borderRadius: 99,
            background: MUSIC_TEAL_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 22,
          }}
        >
          <JuniorIcon name="music-note" size={26} />
          <span>Scratch 3.0 • Music Extension Interaktif</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          <Highlight>Konser Musik</Highlight>
          <br />
          <Highlight>Cilik!</Highlight>
        </h1>

        <p style={{ margin: '30px 0 0', fontSize: 31, fontWeight: 700, lineHeight: 1.4, color: MUTED, maxWidth: 790 }}>
          Merancang <strong style={{ color: CHARCOAL }}>Piano &amp; Alat Musik Digital</strong>{' '}
          Interaktif dengan Tombol Keyboard!
        </p>

        <div style={{ ...row, gap: 16, marginTop: 34 }}>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: MUSIC_TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="music-note" size={24} />
            <span>play note</span>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="keyboard" size={24} />
            <span>Tombol 1 - 2 - 3</span>
          </div>
        </div>
      </div>

      {/* Right Visual: Biko Musician + Scratch Cat + Rainbow Piano Concert Stage */}
      <MacWindowCard
        left={1010}
        top={185}
        width={810}
        height={690}
        titleBarColor={MUSIC_TEAL_SOFT}
        headerLabel="Scratch 3.0 • Panggung Konser Musik"
        padding={26}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 20,
            border: `3px solid ${CHARCOAL}`,
            background: 'linear-gradient(180deg, #1E1B4B 0%, #312E81 65%, #4338CA 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ ...abs(44, 30), animation: live ? 'cpj44-twinkle 2.2s ease-in-out infinite' : undefined }}>
            <JuniorIcon name="music-note" size={58} />
          </div>
          <div style={{ ...abs(660, 36), animation: live ? 'cpj44-twinkle 2.8s ease-in-out infinite' : undefined }}>
            <JuniorIcon name="star-glow" size={58} />
          </div>

          <div style={{ ...abs(345, 72), animation: live ? 'cpj44-hop 2.4s ease-in-out infinite' : undefined }}>
            <ScratchCatSvg size={185} waving />
          </div>

          <div style={{ ...abs(305, 255) }}>
            <RainbowPianoSvg width={310} activeNote={60} />
          </div>

          <div style={{ ...abs(18, 220), animation: live ? 'cpj44-float 3s ease-in-out infinite' : undefined }}>
            <BikoMascot
              pose="thumbs-up"
              width={240}
              badgeIcon={<JuniorIcon name="music-note" size={20} />}
              speechBubble="Do Re Mi!"
            />
          </div>

          <div style={{ ...abs(34, 485) }}>
            <Scratch3MusicBlock scale={0.9}>
              <span>play note</span>
              <WhiteOval val={60} />
              <span>for</span>
              <WhiteOval val={0.25} />
              <span>beats</span>
            </Scratch3MusicBlock>
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
        Apa Misi Konser Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      {/* Biko Left Anchor */}
      <div style={{ ...abs(95, 295, 360, 620), ...centerCol }}>
        <div style={{ animation: live ? 'cpj44-hop 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="point-left"
            width={320}
            badgeIcon={<JuniorIcon name="music-note" size={22} />}
            speechBubble="Ayo bermusik!"
          />
        </div>
      </div>

      {/* macOS Window with 2 Cards */}
      <MacWindowCard
        left={480}
        top={240}
        width={1340}
        height={700}
        titleBarColor={MUSIC_TEAL_SOFT}
        headerLabel="Misi Pertemuan 44"
        padding={42}
      >
        <div style={{ display: 'flex', gap: 36, height: '100%' }}>
          {/* Card 1: Open Music Extension */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: MUSIC_TEAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: MUSIC_TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
              <RainbowPianoSvg width={215} />
              <Scratch3MusicBlock scale={0.86}>
                <span>play note</span>
                <WhiteOval val={60} />
              </Scratch3MusicBlock>
            </div>

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Buka <span style={{ color: MUSIC_TEAL_DARK }}>Rak Blok Musik</span> &amp; Pilih{' '}
              <strong>Alat Musik</strong>
            </div>
          </div>

          {/* Card 2: Play Notes via Keyboard */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>

            <div style={{ ...row, gap: 16 }}>
              {[
                { key: '1', note: 'Do', bg: SKY_SOFT },
                { key: '2', note: 'Re', bg: SUNNY },
                { key: '3', note: 'Mi', bg: TEAL_SOFT },
              ].map((k) => (
                <div key={k.key} style={{ width: 92, height: 105, borderRadius: 18, background: k.bg, border: `3px solid ${CHARCOAL}`, boxShadow: `0 5px 0 ${CHARCOAL}`, ...centerCol, gap: 4 }}>
                  <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700 }}>{k.key}</span>
                  <span style={{ fontSize: 20, fontWeight: 800 }}>{k.note}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Mainkan <span style={{ color: '#B45309' }}>Nada &amp; Instrumen</span> Pakai{' '}
              <strong>Keyboard!</strong>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Jurus Baru: Buka Rak Blok Musik (Add Extension)
// ============================================================================
const Slide03AddExtension: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="FITUR SPESIAL • MUSIC" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Buka Rak <Highlight>Blok Musik!</Highlight>
      </SlideTitle>

      {/* Left Scratch 3.0 Bottom-Left Extension Mockup */}
      <MacWindowCard
        left={X0}
        top={245}
        width={840}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Pojok Kiri Bawah Scratch 3.0"
        padding={28}
      >
        <div style={{ height: '100%', display: 'flex', gap: 24 }}>
          {/* Category Rail with Glowing Add Extension button */}
          <div style={{ width: 175, borderRadius: 20, background: '#F8FAFC', border: `2.5px solid ${CHARCOAL}`, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
              {[
                { label: 'Motion', color: SCRATCH_BLUE },
                { label: 'Looks', color: SCRATCH_LOOKS },
                { label: 'Sound', color: '#CF63CF' },
                { label: 'Events', color: SCRATCH_EVENT },
              ].map((cat) => (
                <div key={cat.label} style={{ ...centerCol, gap: 4 }}>
                  <span style={{ width: 28, height: 28, borderRadius: 99, background: cat.color, border: `2px solid ${CHARCOAL}` }} />
                  <span style={{ fontSize: 14, fontWeight: 800 }}>{cat.label}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                width: '100%',
                padding: '14px 10px',
                borderRadius: 16,
                background: SCRATCH_BLUE,
                color: WHITE,
                border: `3.5px solid ${CHARCOAL}`,
                animation: live ? 'cpj44-pulse 1.8s infinite' : undefined,
                ...centerCol,
                gap: 6,
              }}
            >
              <JuniorIcon name="plus-circle" size={34} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 16, fontWeight: 700, textAlign: 'center' }}>
                Add Extension
              </span>
            </div>
          </div>

          {/* Music Extension Card */}
          <div style={{ flex: 1, ...centerCol, gap: 22 }}>
            <div style={{ ...row, gap: 12 }}>
              <JuniorIcon name="arrow-right" size={44} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: MUTED }}>
                Lalu pilih kartu:
              </span>
            </div>

            <div
              style={{
                width: 390,
                padding: 28,
                borderRadius: 26,
                background: MUSIC_TEAL_SOFT,
                border: `4px solid ${MUSIC_TEAL}`,
                boxShadow: `0 9px 0 ${CHARCOAL}`,
                ...centerCol,
                gap: 16,
                textAlign: 'center',
              }}
            >
              <RainbowPianoSvg width={210} activeNote={62} />
              <div style={{ padding: '8px 26px', borderRadius: 99, background: MUSIC_TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
                Music
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: CHARCOAL }}>
                Play instruments &amp; drums!
              </div>
            </div>
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
        headerLabel="Cara Membuka Blok Musik"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="plus-circle" bgColor={SKY_SOFT} fontSize={32}>
              Klik tombol biru <strong>Add Extension</strong> di pojok kiri bawah
            </BulletRow>
            <BulletRow icon="music-note" bgColor={MUSIC_TEAL_SOFT} fontSize={32}>
              Pilih kartu <strong>Music</strong> (gambar piano &amp; not musik) untuk membuka blok nada!
            </BulletRow>
          </div>

          <div style={{ ...row, gap: 20, padding: '18px 24px', borderRadius: 20, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}` }}>
            <BikoMascot pose="point-left" width={145} />
            <div style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.32 }}>
              Setelah diklik, rak blok baru berwarna <strong>Hijau Tosca</strong> langsung muncul di daftar blokmu!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Blok Musik Baru: Mainkan Nada Piano (play note)
// ============================================================================
const Slide04PlayNote: Page = () => {
  const [selectedNote, setSelectedNote] = useState<60 | 62 | 64>(60);

  return (
    <JuniorFrame badge="BLOK MUSIK • NADA PIANO" accentDot={MUSIC_TEAL}>
      <SlideTitle>
        Blok <Highlight color="#CCFBF1">play note</Highlight> &amp;{' '}
        <Highlight>Piano Mini!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Explanation */}
      <MacWindowCard
        left={X0}
        top={245}
        width={880}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Pilih Nada Do - Re - Mi"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <BulletRow icon="music-note" bgColor={MUSIC_TEAL_SOFT} fontSize={31}>
              Pilih blok <code>play note (60) for (0.25) beats</code>
            </BulletRow>
            <BulletRow icon="keyboard" bgColor={SUNNY_SOFT} fontSize={31}>
              Klik angkanya -&gt; Muncul <strong>Tuts Piano Mini</strong> untuk pilih nada{' '}
              <strong>Do (60), Re (62), Mi (64)</strong>!
            </BulletRow>
          </div>

          <div style={{ ...row, gap: 18 }}>
            <BikoMascot pose="thumbs-up" width={160} speechBubble="Klik tutsnya!" />
            <div style={{ padding: '16px 22px', borderRadius: 20, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, fontSize: 25, fontWeight: 800, lineHeight: 1.34 }}>
              Coba klik tuts <strong>Do, Re, Mi</strong> di sebelah kanan untuk dengar nadanya!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Interactive Mini Piano Block Showcase */}
      <MacWindowCard
        left={1020}
        top={245}
        width={800}
        height={680}
        titleBarColor={MUSIC_TEAL_SOFT}
        headerLabel="Klik Tuts Piano di Bawah Blok!"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-around' }}>
          <Scratch3MusicBlock scale={1.24}>
            <span>play note</span>
            <WhiteOval val={selectedNote} />
            <span>for</span>
            <WhiteOval val={0.25} />
            <span>beats</span>
          </Scratch3MusicBlock>

          {/* Interactive Clickable Mini Piano Popup */}
          <div style={{ padding: 22, borderRadius: 24, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 8px 0 ${CHARCOAL}`, display: 'flex', gap: 16 }}>
            {([
              { midi: 60, name: 'Do', color: SKY_SOFT },
              { midi: 62, name: 'Re', color: SUNNY_SOFT },
              { midi: 64, name: 'Mi', color: TEAL_SOFT },
            ] as const).map((k) => {
              const active = selectedNote === k.midi;
              return (
                <button
                  key={k.midi}
                  type="button"
                  onClick={() => {
                    setSelectedNote(k.midi);
                    playMusicTone(k.midi, 'Piano');
                  }}
                  className="cpj44-card-btn"
                  style={{
                    width: 155,
                    height: 215,
                    borderRadius: 18,
                    background: active ? SUNNY : k.color,
                    border: `3.5px solid ${CHARCOAL}`,
                    boxShadow: `0 6px 0 ${CHARCOAL}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingBottom: 18,
                    gap: 6,
                  }}
                >
                  <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
                    {k.name}
                  </span>
                  <span style={{ padding: '4px 12px', borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}`, fontSize: 20, fontWeight: 800 }}>
                    {k.midi}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Ganti Suara Alat Musik (set instrument) & Tambah Drum!
// ============================================================================
const Slide05PilihInstrumen: Page = () => {
  const [instrument, setInstrument] = useState<'Piano' | 'Marimba' | 'Gitar'>('Piano');
  const [drumHit, setDrumHit] = useState(false);

  return (
    <JuniorFrame badge="PILIH INSTRUMEN SERU" accentDot={MUSIC_TEAL}>
      <SlideTitle>
        Ganti <Highlight color="#CCFBF1">Suara Alat Musikmu!</Highlight>
      </SlideTitle>

      {/* Left Window with 2 Instrument Cards */}
      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={MUSIC_TEAL_SOFT}
        headerLabel="Klik Kartu untuk Dengar Suaranya!"
        padding={34}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Card Left: Choose Instrument */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: MUSIC_TEAL_SOFT,
              border: `3.5px solid ${MUSIC_TEAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '26px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '6px 20px', borderRadius: 99, background: MUSIC_TEAL, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              Pilih Instrumen
            </div>

            <Scratch3MusicBlock scale={0.96}>
              <span>set instrument to</span>
              <TealDrop label={`(1) ${instrument}`} />
            </Scratch3MusicBlock>

            <div style={{ ...row, gap: 12 }}>
              {(['Piano', 'Marimba', 'Gitar'] as const).map((inst) => (
                <button
                  key={inst}
                  type="button"
                  onClick={() => {
                    setInstrument(inst);
                    playMusicTone(60, inst);
                  }}
                  className="cpj44-card-btn"
                  style={{
                    padding: '10px 18px',
                    borderRadius: 14,
                    background: instrument === inst ? SUNNY : WHITE,
                    border: `2.8px solid ${CHARCOAL}`,
                    boxShadow: `0 4px 0 ${CHARCOAL}`,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  {inst}
                </button>
              ))}
            </div>

            <div style={{ padding: '12px 20px', borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 24, fontWeight: 800 }}>
              Bisa diubah jadi <strong>Gitar, Trompet, atau Marimba!</strong>
            </div>
          </div>

          {/* Card Right: Add Snare Drum */}
          <button
            type="button"
            onClick={() => {
              setDrumHit(true);
              playMusicTone('drum');
              setTimeout(() => setDrumHit(false), 180);
            }}
            className="cpj44-card-btn"
            style={{
              flex: 1,
              borderRadius: 24,
              background: PINK_SOFT,
              border: `3.5px solid ${PINK}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '26px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '6px 20px', borderRadius: 99, background: PINK, color: WHITE, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              Tambah Drum!
            </div>

            <SnareDrumSvg size={140} hit={drumHit} />

            <Scratch3MusicBlock scale={0.82}>
              <span>play drum</span>
              <TealDrop label="Snare" />
              <span>for</span>
              <WhiteOval val={0.25} />
              <span>beats</span>
            </Scratch3MusicBlock>

            <div style={{ padding: '12px 20px', borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 24, fontWeight: 800 }}>
              Tekan <strong>Space</strong> -&gt; Bunyi ketukan <strong>Drum Meriah!</strong>
            </div>
          </button>
        </div>
      </MacWindowCard>

      {/* Right Scratch Cat & Biko */}
      <div style={{ ...abs(1485, 340, 350, 580), ...centerCol, justifyContent: 'space-between' }}>
        <ScratchCatSvg size={175} waving />
        <BikoMascot pose="thumbs-up" width={275} badgeIcon={<JuniorIcon name="music-note" size={22} />} speechBubble="Band seru!" />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Tombol Mana untuk Nada "Do"?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle top={124} size={46} maxWidth={1680}>
        Tombol Keyboard Mana yang Ditekan untuk Nada <Highlight>Do (60)?</Highlight>
      </SlideTitle>

      {/* Question Block Strip */}
      <div
        style={{
          ...abs(X0, 210, W, 110),
          borderRadius: 22,
          background: MUSIC_TEAL_SOFT,
          border: `3px solid ${MUSIC_TEAL}`,
          ...row,
          justifyContent: 'center',
          gap: 18,
          padding: '0 24px',
        }}
      >
        <Scratch3KeyHatBlock keyName="1" scale={0.94} />
        <JuniorIcon name="arrow-right" size={32} />
        <Scratch3MusicBlock scale={0.94}>
          <span>play note</span>
          <WhiteOval val={60} />
          <span>for</span>
          <WhiteOval val={0.25} />
          <span>beats</span>
        </Scratch3MusicBlock>
      </div>

      {/* Card A — Correct: Key 1 */}
      <button
        type="button"
        onClick={() => {
          playMusicTone(60, 'Piano');
          setPicked('A');
        }}
        className="cpj44-card-btn"
        style={{
          ...abs(X0, 345, 820, 415),
          borderRadius: 30,
          background: picked === 'A' ? TEAL_SOFT : WHITE,
          border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 50, height: 50, borderRadius: 16, background: SUNNY, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, ...centerCol }}>
            A
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
            Tombol Angka 1
          </span>
        </div>

        <div style={{ width: 150, height: 145, borderRadius: 26, background: SUNNY, border: `4px solid ${CHARCOAL}`, boxShadow: `0 8px 0 ${CHARCOAL}`, ...centerCol }}>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 74, fontWeight: 700 }}>1</span>
        </div>

        <div style={{ minHeight: 46, ...row }}>
          {picked === 'A' ? (
            <div style={{ padding: '8px 22px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Nada Do berbunyi!</span>
            </div>
          ) : (
            <span style={{ fontSize: 22, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Card B — Wrong: Space */}
      <button
        type="button"
        onClick={() => {
          playMusicTone('boing');
          setPicked('B');
        }}
        className="cpj44-card-btn"
        style={{
          ...abs(1000, 345, 820, 415),
          borderRadius: 30,
          background: picked === 'B' ? CORAL_SOFT : WHITE,
          border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
          boxShadow: `0 10px 0 ${CHARCOAL}`,
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          animation: picked === 'B' ? 'cpj44-shake 320ms ease' : undefined,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 50, height: 50, borderRadius: 16, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, ...centerCol }}>
            B
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
            Tombol Space
          </span>
        </div>

        <div style={{ width: 390, height: 115, borderRadius: 24, background: SKY_SOFT, border: `4px solid ${CHARCOAL}`, boxShadow: `0 8px 0 ${CHARCOAL}`, ...centerCol }}>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 700 }}>SPACE</span>
        </div>

        <div style={{ minHeight: 46, ...row }}>
          {picked === 'B' ? (
            <div style={{ padding: '8px 22px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Bukan! Di blok tertulis angka 1!</span>
            </div>
          ) : (
            <span style={{ fontSize: 22, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Bottom Biko Prompt Bar */}
      <div
        style={{
          ...abs(X0, 790, W, 185),
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
        <div style={{ animation: live ? 'cpj44-float 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thinking" width={155} badgeIcon={<JuniorIcon name="question" size={22} />} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, color: CHARCOAL }}>
          {picked === 'A'
            ? 'Hebat! when [1] key pressed artinya menekan tombol angka 1!'
            : picked === 'B'
              ? 'Ups! Blok topinya tertulis when [1] key pressed. Cari tombol angka 1 ya!'
              : 'Tunjuk tombol keyboard yang benar di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Resep Konser Musik: Petakan Tombol 1, 2, 3!
// ============================================================================
const Slide07ResepKonser: Page = () => {
  const [activeNote, setActiveNote] = useState<60 | 62 | 64 | null>(60);
  const [hue, setHue] = useState(0);

  return (
    <JuniorFrame badge="RESEP PIANO DIGITAL" accentDot={SUNNY}>
      <SlideTitle>
        Petakan <Highlight>3 Nada</Highlight> ke Tombol Keyboard!
      </SlideTitle>

      {/* Left Window: 3 Note Stack Cards */}
      <MacWindowCard
        left={X0}
        top={235}
        width={1260}
        height={720}
        titleBarColor={MUSIC_TEAL_SOFT}
        headerLabel="Klik Kartu Nada untuk Mainkan & Ubah Warna!"
        padding={28}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
          {([
            { keyName: '1', note: 60 as const, label: 'Nada Do', dotColor: SKY, bg: SKY_SOFT },
            { keyName: '2', note: 62 as const, label: 'Nada Re', dotColor: SUNNY, bg: SUNNY_SOFT },
            { keyName: '3', note: 64 as const, label: 'Nada Mi', dotColor: TEAL, bg: TEAL_SOFT },
          ]).map((item) => (
            <button
              key={item.keyName}
              type="button"
              onClick={() => {
                playMusicTone(item.note, 'Piano');
                setActiveNote(item.note);
                setHue((h) => (h + 75) % 360);
              }}
              className="cpj44-card-btn"
              style={{
                flex: 1,
                borderRadius: 22,
                background: item.bg,
                border: `3.5px solid ${activeNote === item.note ? CHARCOAL : item.dotColor}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                padding: '12px 24px',
                ...row,
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <div style={{ ...row, gap: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: item.dotColor, color: item.keyName === '2' ? CHARCOAL : WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
                  {item.keyName}
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
                  {item.label}
                </div>
              </div>

              <div style={{ ...row, gap: 8 }}>
                <Scratch3KeyHatBlock keyName={item.keyName} scale={0.78} />
                <JuniorIcon name="arrow-right" size={24} />
                <Scratch3MusicBlock scale={0.78}>
                  <span>play note</span>
                  <WhiteOval val={item.note} />
                </Scratch3MusicBlock>
                <JuniorIcon name="arrow-right" size={24} />
                <Scratch3LooksBlock scale={0.78}>
                  <span>color +25</span>
                </Scratch3LooksBlock>
              </div>
            </button>
          ))}
        </div>
      </MacWindowCard>

      {/* Right Interactive Rainbow Piano Preview */}
      <MacWindowCard
        left={1395}
        top={235}
        width={425}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Sprite Piano"
        padding={26}
      >
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-around' }}>
          <RainbowPianoSvg width={340} activeNote={activeNote} hueRotateDeg={hue} />
          <div style={{ padding: '12px 22px', borderRadius: 16, background: MUSIC_TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, textAlign: 'center' }}>
            {activeNote === 60 ? 'Nada Do (60) Aktif!' : activeNote === 62 ? 'Nada Re (62) Aktif!' : 'Nada Mi (64) Aktif!'}
          </div>
          <BikoMascot pose="thumbs-up" width={225} speechBubble="Warna-warni!" />
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Konser Musik Cilik (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsKonser: Page = () => {
  return (
    <JuniorFrame badge="TIPS MUSISI CODER" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Konser Musikmu <Highlight>Merdu &amp; Seru!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & MERDU"
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
            <BulletRow icon="keyboard" bgColor={TEAL_SOFT} fontSize={29}>
              Pilih tombol keyboard yang <strong>Berurutan</strong> (<code>1, 2, 3</code> atau <code>A, S, D</code>)
            </BulletRow>
            <BulletRow icon="rainbow" bgColor={SUNNY_SOFT} fontSize={29}>
              Tambah <code>change color effect</code> agar alat musik <strong>Menyala</strong> saat ditekan!
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <BikoMascot pose="thumbs-up" width={185} speechBubble="1 - 2 - 3!" />
            <RainbowPianoSvg width={215} activeNote={62} />
            <JuniorIcon name="check" size={58} />
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
            <BulletRow icon="shuffle" bgColor={CORAL_SOFT} fontSize={29}>
              Memakai <strong>Tombol yang Sama</strong> untuk semua nada (bunyinya bertabrakan)
            </BulletRow>
            <BulletRow icon="mute" bgColor={SUNNY_SOFT} fontSize={29}>
              Membiarkan <strong>Suara Laptop Mute / Kecil</strong>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <JuniorIcon name="mute" size={115} />
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Gelar Konser Musik Cilikmu!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [instrument, setInstrument] = useState<'Piano' | 'Marimba' | 'Gitar'>('Piano');
  const [activeNote, setActiveNote] = useState<60 | 62 | 64 | null>(null);
  const [drumHit, setDrumHit] = useState(false);
  const [hue, setHue] = useState(0);

  const playNoteKey = (midi: 60 | 62 | 64) => {
    playMusicTone(midi, instrument);
    setActiveNote(midi);
    setHue((h) => (h + 65) % 360);
    setTimeout(() => setActiveNote(null), 240);
  };

  const hitDrum = () => {
    playMusicTone('drum');
    setDrumHit(true);
    setTimeout(() => setDrumHit(false), 200);
  };

  useEffect(() => {
    if (!live) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') {
        playNoteKey(60);
      } else if (e.key === '2') {
        playNoteKey(62);
      } else if (e.key === '3') {
        playNoteKey(64);
      } else if (e.code === 'Space') {
        e.preventDefault();
        hitDrum();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [live, instrument]);

  return (
    <JuniorFrame badge="AYO BUAT & MAIN!" accentDot={MUSIC_TEAL}>
      <SlideTitle>
        Misi <Highlight>Konser Musik Cilik!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'mic' as JuniorIconName,
            text: (
              <>
                Pasang latar <strong>Panggung Konser</strong> + Sprite <strong>Piano / Drum</strong>
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'music-note' as JuniorIconName,
            text: (
              <>
                Buka <strong>Music Extension</strong> &amp; rangkai <strong>when [1/2/3] key pressed</strong> + <strong>play note</strong>
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'keyboard' as JuniorIconName,
            text: (
              <>
                Tekan tombol <strong>1 - 2 - 3 - 1</strong> (atau Space untuk Drum) &amp; mainkan melodi!
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

      {/* Playable Interactive Scratch 3.0 Concert Stage */}
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
        {/* Top Bar with Instrument Selector */}
        <div
          style={{
            height: 48,
            background: SCRATCH_BLUE,
            borderBottom: `2.5px solid ${CHARCOAL}`,
            padding: '0 18px',
            ...row,
            justifyContent: 'space-between',
            color: WHITE,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          <span>SCRATCH 3.0 • Panggung Konser Digital</span>
          <div style={{ ...row, gap: 8 }}>
            <span style={{ fontSize: 15 }}>Alat Musik:</span>
            {(['Piano', 'Marimba', 'Gitar'] as const).map((inst) => (
              <button
                key={inst}
                type="button"
                onClick={() => setInstrument(inst)}
                style={{
                  padding: '3px 12px',
                  borderRadius: 99,
                  background: instrument === inst ? SUNNY : 'rgba(255,255,255,0.2)',
                  color: instrument === inst ? CHARCOAL : WHITE,
                  border: `2px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {inst}
              </button>
            ))}
          </div>
        </div>

        {/* Stage + Playable Keys */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #1E1B4B 0%, #312E81 66%, #4338CA 100%)', padding: 18, justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'center' }}>
            <ScratchCatSvg size={155} waving />
            <RainbowPianoSvg width={310} activeNote={activeNote} hueRotateDeg={hue} />
            <SnareDrumSvg size={160} hit={drumHit} />
          </div>

          {/* Clickable Musical Keyboard Buttons */}
          <div style={{ ...row, justifyContent: 'center', gap: 18 }}>
            {([
              { keyLabel: '1', note: 60 as const, name: 'Do (60)', bg: SKY_SOFT },
              { keyLabel: '2', note: 62 as const, name: 'Re (62)', bg: SUNNY_SOFT },
              { keyLabel: '3', note: 64 as const, name: 'Mi (64)', bg: TEAL_SOFT },
            ]).map((btn) => (
              <button
                key={btn.keyLabel}
                type="button"
                onClick={() => playNoteKey(btn.note)}
                className="cpj44-card-btn"
                style={{
                  padding: '12px 28px',
                  borderRadius: 18,
                  background: activeNote === btn.note ? SUNNY : btn.bg,
                  border: `3px solid ${CHARCOAL}`,
                  boxShadow: `0 6px 0 ${CHARCOAL}`,
                  ...row,
                  gap: 12,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                <span style={{ padding: '2px 10px', borderRadius: 8, background: WHITE, border: `2px solid ${CHARCOAL}` }}>
                  {btn.keyLabel}
                </span>
                <span>{btn.name}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={hitDrum}
              className="cpj44-card-btn"
              style={{
                padding: '12px 30px',
                borderRadius: 18,
                background: drumHit ? SUNNY : PINK_SOFT,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...row,
                gap: 10,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              <span style={{ padding: '2px 10px', borderRadius: 8, background: WHITE, border: `2px solid ${CHARCOAL}` }}>
                Space
              </span>
              <span>Drum!</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cheering Biko */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 14 }}>
        <div style={{ animation: live ? 'cpj44-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="music-note" size={24} />}
            speechBubble={activeNote ? 'Merdu sekali!' : drumHit ? 'Asyik drum!' : 'Tekan 1 2 3!'}
          />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 44 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj44-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj44-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="music-note" size={50} />
      </div>

      <SlideTitle top={135} size={58} align="center" maxWidth={1540}>
        Hore! Kamu Musisi &amp; Komposer <Highlight>Digital Hebat!</Highlight>
      </SlideTitle>

      {/* Center Celebration Window */}
      <MacWindowCard
        left={260}
        top={260}
        width={1060}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 44"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, gap: 22, textAlign: 'center' }}>
          {/* Golden Treble Clef & Rainbow Piano Medal */}
          <div style={{ animation: live ? 'cpj44-float 2.6s ease-in-out infinite' : undefined }}>
            <svg width={215} height={215} viewBox="0 0 210 210">
              <path d="M72 128 L52 195 L82 180 L96 198 L106 135 Z" fill={MUSIC_TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M138 128 L158 195 L128 180 L114 198 L104 135 Z" fill={PINK} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="105" cy="96" r="72" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="105" cy="96" r="56" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.2} />
              {/* Mini Rainbow Piano Keys */}
              <rect x="65" y="92" width="24" height="36" rx="4" fill={SKY} stroke={CHARCOAL} strokeWidth={2.8} />
              <rect x="93" y="92" width="24" height="36" rx="4" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} />
              <rect x="121" y="92" width="24" height="36" rx="4" fill={TEAL} stroke={CHARCOAL} strokeWidth={2.8} />
              {/* Music Note */}
              <circle cx="94" cy="76" r="9" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.6} />
              <path d="M103 76 L103 48 L124 54 L124 72" fill="none" stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="115" cy="74" r="9" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.6} />
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
            <span>Lencana Master Konser Musik Interaktif</span>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, lineHeight: 1.38, maxWidth: 920, color: CHARCOAL }}>
            Kamu sudah jago memetakan{' '}
            <Highlight color="#CCFBF1">Tombol Keyboard ke Nada &amp; Alat Musik!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="music-note" size={22} />}
            speechBubble="Konser Hebat!"
          />
          <div style={{ animation: live ? 'cpj44-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 44 — Konser Musik Cilik! 🎹🎶
Hari ini anak-anak merancang Piano & Alat Musik Digital interaktif menggunakan Music Extension di Scratch 3.0!`,

  `Dua misi konser hari ini:
1. Membuka Rak Blok Musik (Add Extension -> Music) dan memilih alat musik.
2. Memainkan nada Do-Re-Mi & Drum menggunakan tombol Keyboard!`,

  `Cara Membuka Rak Blok Musik:
Klik tombol biru "Add Extension" di pojok kiri bawah Scratch 3.0, lalu pilih kartu "Music" berwarna hijau tosca!`,

  `Blok Musik Baru — play note (60) for (0.25) beats:
Klik angka 60 agar muncul Tuts Piano Mini untuk memilih nada Do (60), Re (62), dan Mi (64)!`,

  `Ganti Suara Alat Musik & Tambah Drum:
- Gunakan set instrument to (1) Piano untuk mengubah suara jadi Gitar, Marimba, atau Trompet.
- Gunakan play drum (1) Snare Drum for (0.25) beats untuk ketukan drum meriah!`,

  `Permainan Cepat! Ayo tebak bersama:
Jika kodenya when [1] key pressed -> play note (60), tombol keyboard mana yang ditekan untuk nada Do (60) — Pilihan A (Tombol Angka 1) atau Pilihan B (Tombol Space)?`,

  `Resep Piano Digital — Petakan 3 Nada:
- Tombol 1 -> Nada Do (60) + change [color] effect by (25)
- Tombol 2 -> Nada Re (62) + change [color] effect by (25)
- Tombol 3 -> Nada Mi (64) + change [color] effect by (25)`,

  `Tips Jagoan Konser Musik Cilik:
BOLEH pilih tombol berurutan (1, 2, 3) & tambah change color effect agar alat musik menyala.
JANGAN pakai tombol yang sama untuk semua nada, dan jangan lupa nyalakan volume suara laptop!`,

  `Misi Praktik Gelar Konser Musik Cilikmu!
Tekan tombol 1, 2, 3, dan Space di keyboard (atau klik tombol di panggung slide) untuk memainkan lagu Do - Re - Mi - Do sambil mencoba ganti alat musik Piano, Marimba, dan Gitar!`,

  `Hore! Kamu Musisi & Komposer Digital Hebat! 🎉🏅
Selamat meraih Lencana Master Konser Musik Interaktif di Pertemuan 44!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 44 — Konser Musik Cilik!',
  createdAt: '2026-11-16T16:04:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03AddExtension,
  Slide04PlayNote,
  Slide05PilihInstrumen,
  Slide06AyoTebak,
  Slide07ResepKonser,
  Slide08TipsKonser,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-49-coding-sprint-1';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj49-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj49-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj49-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj49-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj49-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj49-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj49-card-btn:hover {
  transform: translateY(-4px);
}
.cpj49-card-btn:active {
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

/** Playful sound feedback via Web Audio API */
function playSprintSound(kind: 'win' | 'boing' | 'step') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    if (kind === 'win') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.24);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
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
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
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
const LAVENDER_SOFT = '#F5F3FF';
const SKY = '#60A5FA';
const SKY_SOFT = '#EFF6FF';
const SCRATCH_BLUE = '#4D97FF';
const SCRATCH_LOOKS = '#9966FF';
const SCRATCH_EVENT = '#FFBF00';
const SCRATCH_CTRL = '#FFAB19';
const SCRATCH_SOUND = '#CF63CF';
const MUSIC_TEAL = '#14B8A6';

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
          animation: live ? 'cpj49-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 49 • Coding Sprint 1: Gerak &amp; Kontrol!</span>
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
// Reusable Pertemuan 49 Visuals (Scratch Cat, Stopwatch, Scratch 3.0 Blocks)
// ============================================================================

const ScratchCatSvg = ({ size = 115, waving = false, flipX = false }: { size?: number; waving?: boolean; flipX?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none" style={{ transform: flipX ? 'scaleX(-1)' : undefined }}>
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

const Scratch3HatBlock = ({ scale = 1, children }: { scale?: number; children: ReactNode }) => (
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
    {children}
  </div>
);

const Scratch3Block = ({ color, textColor = WHITE, scale = 1, children }: { color: string; textColor?: string; scale?: number; children: ReactNode }) => (
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

const Scratch3RepeatOrForeverCBlock = ({ label, count, scale = 1, children }: { label: 'forever' | 'repeat'; count?: number; scale?: number; children?: ReactNode }) => {
  const s = scale;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ ...row, gap: Math.round(8 * s), height: Math.round(46 * s), padding: `0 ${Math.round(20 * s)}px`, borderRadius: `${Math.round(14 * s)}px ${Math.round(14 * s)}px ${Math.round(14 * s)}px 4px`, background: SCRATCH_CTRL, border: `2.8px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: Math.round(19 * s), fontWeight: 700, color: CHARCOAL }}>
        <span>{label}</span>
        {count !== undefined && <WhiteOval val={count} />}
      </div>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div style={{ width: Math.round(24 * s), background: SCRATCH_CTRL, borderLeft: `2.8px solid ${CHARCOAL}`, borderRight: `2px solid ${CHARCOAL}` }} />
        <div style={{ padding: `${Math.round(8 * s)}px 0 ${Math.round(8 * s)}px ${Math.round(8 * s)}px`, display: 'flex', flexDirection: 'column', gap: Math.round(6 * s) }}>{children}</div>
      </div>
      <div style={{ ...row, justifyContent: 'flex-end', paddingRight: Math.round(12 * s), width: Math.round(215 * s), height: Math.round(28 * s), borderRadius: `4px ${Math.round(14 * s)}px ${Math.round(14 * s)}px ${Math.round(14 * s)}px`, background: SCRATCH_CTRL, border: `2.8px solid ${CHARCOAL}` }}>
        <JuniorIcon name={label === 'forever' ? 'infinity' : 'repeat'} size={Math.round(18 * s)} />
      </div>
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Cover
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 49" accentDot={SCRATCH_BLUE}>
      {/* Left Hero Copy */}
      <div style={{ ...abs(X0, 225, 860) }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 99, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, marginBottom: 22 }}>
          <JuniorIcon name="lightning" size={26} />
          <span>Proyek Akhir • Bagian Merakit Kode Utama</span>
        </div>

        <h1 style={{ margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <Highlight>Coding Sprint 1:</Highlight>
          <br />
          Gerak &amp; Kontrol!
        </h1>

        <p style={{ margin: '30px 0 0', fontSize: 31, fontWeight: 700, lineHeight: 1.4, color: MUTED, maxWidth: 790 }}>
          Merakit Kode <strong style={{ color: CHARCOAL }}>Pergerakan Utama</strong> &amp;{' '}
          <strong style={{ color: CHARCOAL }}>Kontrol Interaktif</strong> Proyek Akhirku!
        </p>

        <div style={{ ...row, gap: 16, marginTop: 34 }}>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="keyboard" size={24} />
            <span>Kontrol Panah / Klik</span>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="footprints" size={24} />
            <span>Gerak Utama Hidup</span>
          </div>
        </div>
      </div>

      {/* Right Visual: Biko with Stopwatch + Scratch Cat assembling Motion & Event Blocks */}
      <MacWindowCard
        left={1010}
        top={185}
        width={810}
        height={690}
        titleBarColor={SKY_SOFT}
        headerLabel="Scratch 3.0 • Sprint 1 Arena"
        padding={26}
      >
        <div style={{ height: '100%', borderRadius: 20, border: `3px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #EFF6FF 0%, #DCFCE7 100%)', position: 'relative', overflow: 'hidden', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <Scratch3HatBlock scale={1.04}>
                <span>when</span>
                <DropPill bg="#D99B00" label="right arrow" />
                <span>key pressed</span>
              </Scratch3HatBlock>
              <Scratch3Block color={SCRATCH_BLUE} scale={1.04}>
                <span>change x by</span>
                <WhiteOval val={15} />
              </Scratch3Block>
              <Scratch3Block color={SCRATCH_LOOKS} scale={1.04}>
                <span>next costume</span>
              </Scratch3Block>
            </div>
            <JuniorIcon name="clock" size={76} />
          </div>

          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'flex-end' }}>
            <div style={{ animation: live ? 'cpj49-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot pose="thumbs-up" width={245} badgeIcon={<JuniorIcon name="lightning" size={22} />} speechBubble="Sprint 1 mulai!" />
            </div>
            <div style={{ animation: live ? 'cpj49-hop 2.4s ease-in-out infinite' : undefined }}>
              <ScratchCatSvg size={180} waving />
            </div>
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
    <JuniorFrame badge="MISI SPESIAL HARI INI" accentDot={SUNNY}>
      <SlideTitle>
        Apa Misi <Highlight>Coding Sprint 1</Highlight> Hari Ini?
      </SlideTitle>

      {/* Biko Left Anchor */}
      <div style={{ ...abs(95, 295, 360, 620), ...centerCol }}>
        <div style={{ animation: live ? 'cpj49-hop 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="point-left" width={320} badgeIcon={<JuniorIcon name="lightning" size={22} />} speechBubble="Fokus gerak!" />
        </div>
      </div>

      {/* macOS Window with 2 Cards */}
      <MacWindowCard
        left={480}
        top={240}
        width={1340}
        height={700}
        titleBarColor={SKY_SOFT}
        headerLabel="Misi Pertemuan 49"
        padding={42}
      >
        <div style={{ display: 'flex', gap: 36, height: '100%' }}>
          {/* Card 1 */}
          <div style={{ flex: 1, borderRadius: 24, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>
            <div style={{ ...row, gap: 18 }}>
              <ScratchCatSvg size={130} waving />
              <JuniorIcon name="footprints" size={84} />
            </div>
            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Hidupkan <span style={{ color: '#1D4ED8' }}>Pergerakan Utama</span> Karakter!
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ flex: 1, borderRadius: 24, background: SUNNY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>
            <div style={{ ...row, gap: 18 }}>
              <JuniorIcon name="keyboard" size={90} />
              <JuniorIcon name="tap" size={86} />
            </div>
            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Pasang <span style={{ color: '#B45309' }}>Kontrol Interaktif</span> (<em>Keyboard / Klik</em>)!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Kamus Coder Cilik: Apa Itu "Coding Sprint"?
// ============================================================================
const Slide03KamusSprint: Page = () => {
  return (
    <JuniorFrame badge="KAMUS CODER CILIK" accentDot={SUNNY}>
      <SlideTitle>
        Apa Itu <Highlight>Coding Sprint?</Highlight>
      </SlideTitle>

      {/* Left Arena Visual */}
      <MacWindowCard
        left={X0}
        top={245}
        width={820}
        height={680}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Kerja Fokus Bagian Demi Bagian"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '100%', padding: 24, borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, justifyContent: 'space-around' }}>
            <div style={{ ...centerCol, gap: 6 }}>
              <span style={{ padding: '6px 18px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                Sprint 1 (Hari Ini)
              </span>
              <span style={{ fontSize: 24, fontWeight: 800 }}>Gerak &amp; Kontrol</span>
            </div>
            <JuniorIcon name="arrow-right" size={40} />
            <div style={{ ...centerCol, gap: 6, opacity: 0.65 }}>
              <span style={{ padding: '6px 18px', borderRadius: 99, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                Sprint 2 (Besok)
              </span>
              <span style={{ fontSize: 24, fontWeight: 800 }}>Sensor, Skor &amp; Efek</span>
            </div>
          </div>

          <div style={{ ...row, gap: 18, alignItems: 'flex-end' }}>
            <BikoMascot pose="laptop" width={235} speechBubble="Bagian 1 dulu!" />
            <ScratchCatSvg size={165} waving />
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Explanation */}
      <MacWindowCard
        left={960}
        top={245}
        width={860}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Kamus Coder Cilik"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="lightning" bgColor={SUNNY_SOFT} fontSize={32}>
              <strong>Coding Sprint:</strong> Waktu seru &amp; fokus untuk <strong>Merakit Kode</strong> bagian demi bagian!
            </BulletRow>
            <BulletRow icon="puzzle" bgColor={SKY_SOFT} fontSize={32}>
              Di <strong>Sprint 1</strong>, kita fokus menghidupkan <strong>Gerak &amp; Kontrol</strong> dulu sebelum efek tambahan!
            </BulletRow>
          </div>

          <div style={{ padding: '20px 26px', borderRadius: 20, background: TEAL_SOFT, border: `3px solid ${TEAL}`, ...row, gap: 16, fontSize: 26, fontWeight: 800 }}>
            <JuniorIcon name="check" size={34} />
            <span>Mengerjakan satu bagian sampai tuntas membuat proyek besarmu jauh lebih mudah!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Jurus #1: Pasang Kontrol Interaktif!
// ============================================================================
const Slide04KontrolInteraktif: Page = () => {
  return (
    <JuniorFrame badge="BLOK KUNING • KONTROL INTERAKTIF" accentDot={SCRATCH_EVENT}>
      <SlideTitle>
        Pilih <Highlight>Kontrol Interaktif</Highlight> Karyamu!
      </SlideTitle>

      {/* Left Window with 2 Cards */}
      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="2 Pemicu Kontrol Paling Seru"
        padding={34}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Card Left: Keyboard */}
          <div style={{ flex: 1, borderRadius: 24, background: SKY_SOFT, border: `3.5px solid ${SKY}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ ...row, gap: 12 }}>
              <JuniorIcon name="keyboard" size={50} />
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: '#1D4ED8' }}>
                Kontrol Keyboard
              </div>
            </div>

            <Scratch3HatBlock scale={0.94}>
              <span>when</span>
              <DropPill bg="#D99B00" label="right / left / up / down arrow" />
              <span>key pressed</span>
            </Scratch3HatBlock>

            <div style={{ padding: '14px 22px', borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 26, fontWeight: 800 }}>
              Cocok untuk <strong>Game Gerak &amp; Tangkap!</strong>
            </div>
          </div>

          {/* Card Right: Click */}
          <div style={{ flex: 1, borderRadius: 24, background: SUNNY_SOFT, border: `3.5px solid ${SUNNY}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ ...row, gap: 12 }}>
              <JuniorIcon name="tap" size={50} />
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: '#B45309' }}>
                Kontrol Klik / Spasi
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <Scratch3HatBlock scale={1.06}>
                <span>when this sprite clicked</span>
              </Scratch3HatBlock>
              <span style={{ fontSize: 20, fontWeight: 800, color: MUTED }}>atau</span>
              <Scratch3HatBlock scale={1.06}>
                <span>when</span>
                <DropPill bg="#D99B00" label="space" />
                <span>key pressed</span>
              </Scratch3HatBlock>
            </div>

            <div style={{ padding: '14px 22px', borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 26, fontWeight: 800 }}>
              Cocok untuk <strong>Cerita, Kartu Ajaib, &amp; Musik!</strong>
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Biko Anchor */}
      <div style={{ ...abs(1485, 360, 350, 560), ...centerCol }}>
        <BikoMascot pose="point-left" width={305} badgeIcon={<JuniorIcon name="keyboard" size={22} />} speechBubble="Pilih pemicunya!" />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Jurus #2: Hidupkan Gerak Utama Karakter!
// ============================================================================
const Slide05GerakUtama: Page = () => {
  return (
    <JuniorFrame badge="BLOK BIRU & UNGU • GERAK HIDUP" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Bikin Karakter <Highlight>Bergerak Hidup!</Highlight>
      </SlideTitle>

      {/* Left Code Stack Showcase */}
      <MacWindowCard
        left={X0}
        top={245}
        width={780}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Kombinasi Gerak + Kostum"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
            <Scratch3HatBlock scale={1.06}>
              <span>when</span>
              <JuniorIcon name="flag" size={22} />
              <span>clicked</span>
            </Scratch3HatBlock>
            <Scratch3RepeatOrForeverCBlock label="forever" scale={1.02}>
              <Scratch3Block color={SCRATCH_BLUE} scale={1.02}>
                <span>glide</span>
                <WhiteOval val={1} />
                <span>secs to</span>
                <DropPill bg="#3373CC" label="random position" />
              </Scratch3Block>
              <Scratch3Block color={SCRATCH_LOOKS} scale={1.02}>
                <span>next costume</span>
              </Scratch3Block>
              <Scratch3Block color={SCRATCH_CTRL} textColor={CHARCOAL} scale={1.02}>
                <JuniorIcon name="wait" size={20} />
                <span>wait</span>
                <WhiteOval val={0.2} />
                <span>seconds</span>
              </Scratch3Block>
            </Scratch3RepeatOrForeverCBlock>
          </div>

          <div style={{ ...row, gap: 18 }}>
            <ScratchCatSvg size={120} waving />
            <JuniorIcon name="footprints" size={76} />
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={920}
        top={245}
        width={900}
        height={680}
        titleBarColor={WHITE}
        headerLabel="3 Cara Menggerakkan Tokoh"
        padding={40}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
            <BulletRow icon="footprints" bgColor={SKY_SOFT} fontSize={30}>
              <strong>Gerak Kemudi:</strong> Pakai <code>change x by</code> / <code>change y by</code> atau <code>move (10) steps</code>
            </BulletRow>
            <BulletRow icon="repeat" bgColor={SUNNY_SOFT} fontSize={30}>
              <strong>Gerak Otomatis:</strong> Pakai <code>glide</code> / jatuh ke bawah di dalam <code>forever</code>
            </BulletRow>
            <BulletRow icon="film" bgColor={LAVENDER_SOFT} fontSize={30}>
              <strong>Animasi Langkah:</strong> Tambah <code>next costume</code> + <code>wait (0.2)</code> biar makin hidup!
            </BulletRow>
          </div>

          <div style={{ padding: '18px 24px', borderRadius: 20, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 16, fontSize: 24, fontWeight: 800 }}>
            <JuniorIcon name="sparkle" size={32} />
            <span>Gabungkan gerak biru dengan pergantian kostum ungu supaya karakter terlihat berjalan alami!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Pilih Pemicu Kontrol yang Pas!
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle size={48} maxWidth={1680}>
        Jika Kamu Membuat <Highlight>Game Menggerakkan Karakter ke Kanan</Highlight>, Blok Kuning Mana?
      </SlideTitle>

      {/* Card A — Correct: when [right arrow] key pressed */}
      <button
        type="button"
        onClick={() => {
          playSprintSound('win');
          setPicked('A');
        }}
        className="cpj49-card-btn"
        style={{
          ...abs(X0, 255, 820, 485),
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
            Tombol Panah Kanan
          </span>
        </div>

        <div style={{ ...row, gap: 16 }}>
          <JuniorIcon name="arrow-right" size={58} />
          <Scratch3HatBlock scale={1.15}>
            <span>when</span>
            <DropPill bg="#D99B00" label="right arrow" />
            <span>key pressed</span>
          </Scratch3HatBlock>
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'A' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={26} />
              <span>Benar! Blok pemicu kuning Panah Kanan!</span>
            </div>
          ) : (
            <span style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Card B — Wrong: start sound Pop */}
      <button
        type="button"
        onClick={() => {
          playSprintSound('boing');
          setPicked('B');
        }}
        className="cpj49-card-btn"
        style={{
          ...abs(1000, 255, 820, 485),
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
          animation: picked === 'B' ? 'cpj49-shake 320ms ease' : undefined,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 16, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
            B
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Blok Suara (Sound)
          </span>
        </div>

        <div style={{ ...row, gap: 16 }}>
          <JuniorIcon name="music-note" size={60} />
          <Scratch3Block color={SCRATCH_SOUND} scale={1.25}>
            <JuniorIcon name="speaker" size={24} />
            <span>start sound [Pop]</span>
          </Scratch3Block>
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'B' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={26} />
              <span>Bukan! Itu cuma membunyikan suara!</span>
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
        <div style={{ animation: live ? 'cpj49-float 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thinking" width={165} badgeIcon={<JuniorIcon name="question" size={22} />} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
          {picked === 'A'
            ? 'Jagoan! Blok topi kuning when [right arrow] key pressed siap menggerakkan ke kanan!'
            : picked === 'B'
              ? 'Ups! start sound hanya memutar suara. Pilih blok topi kuning Events ya!'
              : 'Tunjuk blok pemicu yang benar di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Resep Coding Sprint 1: Sesuai Tema Karyamu!
// ============================================================================
const Slide07ResepSprint1: Page = () => {
  return (
    <JuniorFrame badge="CONTOH KODE SPRINT 1" accentDot={TEAL}>
      <SlideTitle>
        Rangkai Kode Sesuai <Highlight>Tema Karyamu!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1720}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Resep Awal Berdasarkan 3 Tema Pilihan"
        padding={34}
      >
        <div style={{ display: 'flex', gap: 28, height: '100%' }}>
          {/* Tema 1 */}
          <div style={{ flex: 1, borderRadius: 24, background: SKY_SOFT, border: `3.5px solid ${SKY}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ ...row, gap: 10 }}>
              <JuniorIcon name="book-open" size={38} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 27, fontWeight: 700 }}>Cerita Petualangan</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <Scratch3HatBlock scale={0.9}>
                <span>when</span>
                <JuniorIcon name="flag" size={18} />
                <span>clicked</span>
              </Scratch3HatBlock>
              <Scratch3RepeatOrForeverCBlock label="repeat" count={10} scale={0.9}>
                <Scratch3Block color={SCRATCH_BLUE} scale={0.9}>
                  <span>move</span>
                  <WhiteOval val={10} />
                  <span>steps</span>
                </Scratch3Block>
                <Scratch3Block color={SCRATCH_LOOKS} scale={0.9}>
                  <span>next costume</span>
                </Scratch3Block>
              </Scratch3RepeatOrForeverCBlock>
            </div>

            <div style={{ padding: '10px 18px', borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 22, fontWeight: 800 }}>
              Karakter berjalan mulus!
            </div>
          </div>

          {/* Tema 2 */}
          <div style={{ flex: 1, borderRadius: 24, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ ...row, gap: 10 }}>
              <JuniorIcon name="gamepad" size={38} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 27, fontWeight: 700 }}>Game Tangkap / Terbang</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <Scratch3HatBlock scale={0.9}>
                <span>when</span>
                <DropPill bg="#D99B00" label="arrow" />
                <span>key pressed</span>
              </Scratch3HatBlock>
              <Scratch3Block color={SCRATCH_BLUE} scale={0.92}>
                <span>change x / y by</span>
                <WhiteOval val={15} />
              </Scratch3Block>
              <div style={{ marginTop: 10, padding: '8px 14px', borderRadius: 12, background: WHITE, border: `2px dashed ${TEAL}`, fontSize: 19, fontWeight: 800 }}>
                + objek jatuh / meluncur otomatis
              </div>
            </div>

            <div style={{ padding: '10px 18px', borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 22, fontWeight: 800 }}>
              Kemudi keyboard langsung aktif!
            </div>
          </div>

          {/* Tema 3 */}
          <div style={{ flex: 1, borderRadius: 24, background: LAVENDER_SOFT, border: `3.5px solid ${LAVENDER}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ ...row, gap: 10 }}>
              <JuniorIcon name="music-note" size={38} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 27, fontWeight: 700 }}>Kartu Ajaib / Musik</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <Scratch3HatBlock scale={0.88}>
                <span>when this sprite clicked</span>
              </Scratch3HatBlock>
              <Scratch3Block color={SCRATCH_LOOKS} scale={0.88}>
                <span>change [color] effect by</span>
                <WhiteOval val={25} />
              </Scratch3Block>
              <Scratch3Block color={MUSIC_TEAL} scale={0.88}>
                <JuniorIcon name="music-note" size={18} />
                <span>play note</span>
                <WhiteOval val={60} />
              </Scratch3Block>
            </div>

            <div style={{ padding: '10px 18px', borderRadius: 14, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 22, fontWeight: 800 }}>
              Warna &amp; nada bereaksi saat diklik!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Coding Sprint 1 (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsSprint1: Page = () => {
  return (
    <JuniorFrame badge="TIPS SPRINT CODER CILIK" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Kode Pertamamu <Highlight>Langsung Jalan!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & LANCAR"
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
            <BulletRow icon="flag" bgColor={TEAL_SOFT} fontSize={29}>
              <strong>Tes Langsung</strong> setelah merakit 1 tumpukan kode
            </BulletRow>
            <BulletRow icon="arrow-lr" bgColor={SUNNY_SOFT} fontSize={29}>
              Pasang <code>set rotation style [left-right]</code> jika karakter memantul kiri-kanan
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <BikoMascot pose="thumbs-up" width={180} speechBubble="Tes yuk!" />
            <JuniorIcon name="flag" size={85} />
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
            <BulletRow icon="dizzy" bgColor={CORAL_SOFT} fontSize={29}>
              Merakit <strong>Semua Kode Sekaligus</strong> tanpa pernah dicoba
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={29}>
              Lupa mengklik <strong>Sprite yang Benar</strong> sebelum menarik balok kode
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <JuniorIcon name="warning" size={105} />
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Mulai Coding Sprint 1 Sekarang!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [mode, setMode] = useState<'cerita' | 'game' | 'musik'>('game');
  const [catX, setCatX] = useState(50);
  const [hue, setHue] = useState(0);

  const moveX = (dx: number) => {
    playSprintSound('step');
    setCatX((x) => Math.max(16, Math.min(84, x + dx)));
  };

  useEffect(() => {
    if (!live) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveX(10);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveX(-10);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [live]);

  return (
    <JuniorFrame badge="WAKTUNYA CODING SPRINT 1!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Rakit Gerak &amp; Kontrol Proyek Akhir!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'hero' as JuniorIconName,
            text: (
              <>
                Ketuk <strong>Tokoh Utama</strong> di proyek akhirmu
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
                Rangkai <strong>Kode Gerak Utama</strong> &amp; <strong>Kontrol Interaktif</strong> (Panah / Klik)
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
                Klik <strong>Bendera Hijau</strong> &amp; uji semua tombol kontrolmu!
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

      {/* Interactive Sprint 1 Sandbox Simulator */}
      <MacWindowCard
        left={X0}
        top={400}
        width={1280}
        height={565}
        titleBarColor={SCRATCH_BLUE}
        headerLabel="Tester Sprint 1 • Gerak Utama & Kontrol"
        padding={22}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <div style={{ ...row, gap: 10 }}>
              {(['cerita', 'game', 'musik'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    playSprintSound('step');
                    setMode(m);
                  }}
                  className="cpj49-card-btn"
                  style={{
                    padding: '6px 18px',
                    borderRadius: 99,
                    border: `2.5px solid ${CHARCOAL}`,
                    background: mode === m ? SUNNY : WHITE,
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {m === 'cerita' ? 'Cerita' : m === 'game' ? 'Game Panah' : 'Musik / Klik'}
                </button>
              ))}
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: MUTED }}>
              Uji kontrol kiri/kanan atau klik karakter!
            </span>
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: 20,
              border: `3px solid ${CHARCOAL}`,
              background:
                mode === 'cerita'
                  ? 'linear-gradient(180deg, #1E1B4B 0%, #312E81 100%)'
                  : mode === 'game'
                    ? 'linear-gradient(180deg, #BAE6FD 0%, #DCFCE7 100%)'
                    : 'linear-gradient(135deg, #FEF9C3 0%, #EDE9FE 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <button
              type="button"
              onClick={() => {
                playSprintSound('win');
                setHue((h) => (h + 75) % 360);
              }}
              style={{
                position: 'absolute',
                left: `${catX}%`,
                top: '52%',
                transform: 'translate(-50%, -50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                filter: `hue-rotate(${hue}deg)`,
                transition: 'left 150ms ease-out, filter 180ms ease',
              }}
            >
              <ScratchCatSvg size={165} waving />
            </button>
          </div>

          <div style={{ ...row, justifyContent: 'center', gap: 16 }}>
            <button type="button" onClick={() => moveX(-14)} className="cpj49-card-btn" style={{ padding: '8px 24px', borderRadius: 14, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
              <JuniorIcon name="arrow-left" size={22} />
              <span>Geser Kiri</span>
            </button>
            <button type="button" onClick={() => { playSprintSound('win'); setHue((h) => (h + 75) % 360); }} className="cpj49-card-btn" style={{ padding: '8px 24px', borderRadius: 14, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
              <JuniorIcon name="tap" size={22} />
              <span>Klik Karakter!</span>
            </button>
            <button type="button" onClick={() => moveX(14)} className="cpj49-card-btn" style={{ padding: '8px 24px', borderRadius: 14, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
              <span>Geser Kanan</span>
              <JuniorIcon name="arrow-right" size={22} />
            </button>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko & Scratch Cat */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', animation: live ? 'cpj49-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thumbs-up" width={265} badgeIcon={<JuniorIcon name="lightning" size={22} />} speechBubble="Sudah hidup!" />
          <ScratchCatSvg size={135} waving />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 49 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODING SPRINT 1 SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj49-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj49-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="rocket" size={50} />
      </div>

      <SlideTitle top={135} size={58} align="center" maxWidth={1540}>
        Hore! Karakter Proyek Akhirmu <Highlight>Sudah Hidup!</Highlight>
      </SlideTitle>

      {/* Center Celebration Window */}
      <MacWindowCard
        left={260}
        top={260}
        width={1060}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 49"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, gap: 22, textAlign: 'center' }}>
          {/* Golden Speed Rocket & Arrow Medal */}
          <div style={{ animation: live ? 'cpj49-float 2.6s ease-in-out infinite' : undefined }}>
            <svg width={215} height={215} viewBox="0 0 210 210">
              <path d="M72 128 L52 195 L82 180 L96 198 L106 135 Z" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M138 128 L158 195 L128 180 L114 198 L104 135 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="105" cy="96" r="72" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="105" cy="96" r="56" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.2} />
              {/* Rocket Center */}
              <path d="M105 56 C120 72, 122 104, 105 124 C88 104, 90 72, 105 56 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.5} />
              <circle cx="105" cy="86" r="9" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={2.8} />
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
            <span>Lencana Juara Coding Sprint 1</span>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, lineHeight: 1.38, maxWidth: 920, color: CHARCOAL }}>
            Kamu sudah berhasil merakit{' '}
            <Highlight color="#DBEAFE">Gerak Utama &amp; Kontrol Interaktif</Highlight> pada proyek akhirmu!
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot pose="jump" width={295} badgeIcon={<JuniorIcon name="lightning" size={22} />} speechBubble="Sprint 1 Lolos!" />
          <div style={{ animation: live ? 'cpj49-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 49 — Coding Sprint 1: Gerak & Kontrol! ⚡🎮
Hari ini anak-anak fokus merakit kode Pergerakan Utama dan Kontrol Interaktif untuk Proyek Akhir masing-masing!`,

  `Dua misi Sprint 1 hari ini:
1. Menghidupkan pergerakan utama karakter (gerak & kostum).
2. Memasang kontrol interaktif menggunakan Keyboard atau Klik!`,

  `Kamus Coder Cilik — Apa Itu "Coding Sprint"?
Coding Sprint adalah waktu seru & fokus untuk merakit kode bagian demi bagian! Di Sprint 1 kita bereskan Gerak & Kontrol dulu.`,

  `Jurus 1 — Pilih Kontrol Interaktif:
- Kontrol Keyboard: when [right/left/up/down arrow] key pressed -> cocok untuk Game!
- Kontrol Klik / Spasi: when this sprite clicked / when [space] key pressed -> cocok untuk Cerita, Kartu Ajaib, & Musik!`,

  `Jurus 2 — Bikin Karakter Bergerak Hidup:
Gabungkan change x/y / move / glide dengan next costume + wait (0.2) di dalam forever!`,

  `Permainan Cepat! Ayo tebak bersama:
Jika kamu membuat Game Menggerakkan Karakter ke Kanan, blok kuning mana yang dipakai — Pilihan A (when [right arrow] key pressed) atau Pilihan B (start sound [Pop])?`,

  `Contoh Kode Sprint 1 Sesuai Tema:
- Cerita Petualangan: when Bendera clicked -> repeat (10) move + next costume
- Game: when [arrow] key pressed -> change x/y by
- Kartu Ajaib / Musik: when this sprite clicked -> change color / play note`,

  `Tips Jagoan Coding Sprint 1:
BOLEH tes langsung setelah merakit 1 tumpukan kode & pakai set rotation style [left-right] jika memantul.
JANGAN merakit semua kode sekaligus tanpa dicoba, atau lupa mengklik Sprite yang benar sebelum menarik blok!`,

  `Misi Praktik Rakit Gerak & Kontrol Proyek Akhir!
Ajak anak-anak mengetuk Tokoh Utama di Scratch 3.0 mereka, memasang kode gerak + kontrol, dan menguji langsung lewat Bendera Hijau!`,

  `Hore! Karakter Proyek Akhirmu Sudah Hidup! 🎉🏅
Selamat meraih Lencana Juara Coding Sprint 1 — siap melaju ke Coding Sprint 2!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 49 — Coding Sprint 1: Gerak & Kontrol!',
  createdAt: '2026-11-16T16:36:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03KamusSprint,
  Slide04KontrolInteraktif,
  Slide05GerakUtama,
  Slide06AyoTebak,
  Slide07ResepSprint1,
  Slide08TipsSprint1,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

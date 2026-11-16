import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-52-graduation-day-final-showcase';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj52-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj52-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-16px) scale(1.06); }
}
@keyframes cpj52-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj52-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj52-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj52-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj52-card-btn:hover {
  transform: translateY(-4px);
}
.cpj52-card-btn:active {
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

/** Triumphant graduation fanfare or gentle boing via Web Audio API */
function playGraduationSound(kind: 'fanfare' | 'boing' | 'clap') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    if (kind === 'fanfare') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.09);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.18);
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.32);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.42);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
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
      osc.frequency.setValueAtTime(740, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.16, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
    setTimeout(() => {
      void ctx.close();
    }, 520);
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
const PINK_SOFT = '#FCE7F3';
const SKY = '#60A5FA';
const SKY_SOFT = '#EFF6FF';
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
          animation: live ? 'cpj52-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 52 • Graduation Day &amp; Final Showcase!</span>
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
// Reusable Pertemuan 52 Visuals (Scratch Cat & Tic Cat in Toga Caps)
// ============================================================================

const ScratchCatSvg = ({ size = 115, gradCap = false, waving = false }: { size?: number; gradCap?: boolean; waving?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 140 150" fill="none">
    <ellipse cx="70" cy="138" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path d="M40 110 C20 106, 14 88, 25 79 C32 73, 38 81, 35 88 C33 93, 38 100, 46 100" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <ellipse cx="56" cy="130" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="130" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="70" cy="106" rx="25" ry="23" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="108" rx="14" ry="14" fill={WHITE} />
    <path d="M46 96 C35 100, 35 113, 45 113" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d={waving ? 'M94 92 C112 82, 114 64, 105 60 C98 56, 92 68, 92 82' : 'M94 96 C105 100, 105 113, 95 113'} fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d="M36 62 L34 26 L60 45 Z" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
    <path d="M104 62 L106 26 L80 45 Z" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
    <ellipse cx="70" cy="66" rx="38" ry="29" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="75" rx="25" ry="16" fill={WHITE} />
    <ellipse cx="56" cy="60" rx="7" ry="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    <ellipse cx="84" cy="60" rx="7" ry="9" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
    <circle cx="58" cy="60" r="3.4" fill={CHARCOAL} />
    <circle cx="82" cy="60" r="3.4" fill={CHARCOAL} />
    <polygon points="66,68 74,68 70,73" fill={CHARCOAL} />
    <path d="M62 77 Q70 84 78 77" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" fill="none" />
    {gradCap && (
      <g>
        <polygon points="70,8 106,22 70,36 34,22" fill={CHARCOAL} stroke={WHITE} strokeWidth={2} strokeLinejoin="round" />
        <rect x="52" y="28" width="36" height="12" rx="4" fill={CHARCOAL} />
        <line x1="100" y1="24" x2="104" y2="46" stroke={SUNNY} strokeWidth={3.5} strokeLinecap="round" />
        <circle cx="104" cy="48" r="4.5" fill={SUNNY} />
      </g>
    )}
  </svg>
);

const TicCatSvg = ({ size = 105, gradCap = false }: { size?: number; gradCap?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 130 140" fill="none">
    <ellipse cx="65" cy="128" rx="30" ry="6" fill="rgba(30,30,44,0.14)" />
    <ellipse cx="65" cy="96" rx="26" ry="24" fill="#38BDF8" stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="65" cy="98" rx="14" ry="13" fill={WHITE} />
    <path d="M36 52 L34 22 L56 38 Z" fill="#38BDF8" stroke={CHARCOAL} strokeWidth={3.6} strokeLinejoin="round" />
    <path d="M94 52 L96 22 L74 38 Z" fill="#38BDF8" stroke={CHARCOAL} strokeWidth={3.6} strokeLinejoin="round" />
    <circle cx="65" cy="60" r="31" fill="#38BDF8" stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="65" cy="68" rx="19" ry="13" fill={WHITE} />
    <circle cx="53" cy="54" r="5" fill={CHARCOAL} />
    <circle cx="77" cy="54" r="5" fill={CHARCOAL} />
    <path d="M58 70 Q65 76 72 70" stroke={CHARCOAL} strokeWidth={2.8} strokeLinecap="round" fill="none" />
    {gradCap && (
      <g>
        <polygon points="65,6 96,18 65,30 34,18" fill={CHARCOAL} stroke={WHITE} strokeWidth={2} strokeLinejoin="round" />
        <rect x="49" y="23" width="32" height="10" rx="3" fill={CHARCOAL} />
        <line x1="91" y1="20" x2="94" y2="40" stroke={SUNNY} strokeWidth={3} strokeLinecap="round" />
      </g>
    )}
  </svg>
);

// ============================================================================
// SLIDE 01 — Cover
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 52" accentDot={SUNNY}>
      {/* Left Hero Copy */}
      <div style={{ ...abs(X0, 225, 860) }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 99, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, marginBottom: 22 }}>
          <JuniorIcon name="grad-cap" size={26} />
          <span>Level 1 Code Explorer • Hari Kelulusan!</span>
        </div>

        <h1 style={{ margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <Highlight>Graduation Day</Highlight>
          <br />
          &amp; Final Showcase!
        </h1>

        <p style={{ margin: '30px 0 0', fontSize: 31, fontWeight: 700, lineHeight: 1.4, color: MUTED, maxWidth: 790 }}>
          Pameran Karya Coding Cilik di Depan{' '}
          <strong style={{ color: CHARCOAL }}>Orang Tua &amp; Teman!</strong>
        </p>

        <div style={{ ...row, gap: 16, marginTop: 34 }}>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="mic" size={24} />
            <span>Final Showcase</span>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="trophy" size={24} />
            <span>Wisuda Code Explorer</span>
          </div>
        </div>
      </div>

      {/* Right Visual: Biko, Scratch Cat & Tic Cat in Graduation Toga Caps */}
      <MacWindowCard
        left={1010}
        top={185}
        width={810}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Panggung Wisuda CODEPOLITAN Junior"
        padding={26}
      >
        <div style={{ height: '100%', borderRadius: 20, border: `3px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #EFF6FF 0%, #FEF9C3 100%)', position: 'relative', overflow: 'hidden', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...row, justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ animation: live ? 'cpj52-confetti 2.4s ease-in-out infinite' : undefined }}>
              <JuniorIcon name="party" size={58} />
            </div>
            <div style={{ padding: '10px 26px', borderRadius: 99, background: SUNNY, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="grad-cap" size={28} />
              <span>Code Explorer Graduate!</span>
            </div>
            <div style={{ animation: live ? 'cpj52-confetti 2.8s ease-in-out infinite' : undefined }}>
              <JuniorIcon name="trophy" size={58} />
            </div>
          </div>

          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'flex-end' }}>
            <div style={{ animation: live ? 'cpj52-hop 2.4s ease-in-out infinite' : undefined }}>
              <TicCatSvg size={145} gradCap />
            </div>
            <div style={{ animation: live ? 'cpj52-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot pose="thumbs-up" width={245} badgeIcon={<JuniorIcon name="grad-cap" size={22} />} speechBubble="Selamat Lulus!" />
            </div>
            <div style={{ animation: live ? 'cpj52-hop 2.2s ease-in-out infinite' : undefined }}>
              <ScratchCatSvg size={175} gradCap waving />
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 02 — Misi Spesial Hari Kelulusan
// ============================================================================
const Slide02Misi: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI HARI INI" accentDot={SUNNY}>
      <SlideTitle>
        Apa Misi Besar Kita di <Highlight>Graduation Day?</Highlight>
      </SlideTitle>

      {/* Biko Left Anchor */}
      <div style={{ ...abs(95, 295, 360, 620), ...centerCol }}>
        <div style={{ animation: live ? 'cpj52-hop 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="point-left" width={320} badgeIcon={<JuniorIcon name="grad-cap" size={22} />} speechBubble="Hari Wisuda!" />
        </div>
      </div>

      {/* macOS Window with 2 Cards */}
      <MacWindowCard
        left={480}
        top={240}
        width={1340}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Misi Pertemuan 52"
        padding={42}
      >
        <div style={{ display: 'flex', gap: 36, height: '100%' }}>
          {/* Card 1: Final Showcase */}
          <div style={{ flex: 1, borderRadius: 24, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>
            <div style={{ ...row, gap: 18 }}>
              <JuniorIcon name="fullscreen" size={88} />
              <JuniorIcon name="mic" size={88} />
            </div>
            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              <span style={{ color: '#1D4ED8' }}>Pamerkan Proyek Akhir</span> di Depan Ayah, Bunda &amp; Teman!
            </div>
          </div>

          {/* Card 2: Graduation Celebration */}
          <div style={{ flex: 1, borderRadius: 24, background: SUNNY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>
            <div style={{ ...row, gap: 18 }}>
              <JuniorIcon name="grad-cap" size={92} />
              <JuniorIcon name="medal" size={88} />
            </div>
            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Rayakan <span style={{ color: '#B45309' }}>Kelulusan Coder Cilik</span> Hebat!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Cek Siap Panggung: 3 Langkah Sebelum Tampil!
// ============================================================================
const Slide03CekSiapPanggung: Page = () => {
  return (
    <JuniorFrame badge="SIAP TAMPIL SHOWCASE" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Cek <Highlight>3 Langkah</Highlight> Sebelum Naik Panggung!
      </SlideTitle>

      {/* Left 3 Steps */}
      <div style={{ ...abs(X0, 245, 960, 680), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {[
          {
            title: 'Langkah 1 • Buka File Proyek Akhir',
            desc: 'Buka File Proyek Akhirmu di Scratch 3.0',
            bg: SKY_SOFT,
            border: SKY,
            icon: 'folder' as JuniorIconName,
          },
          {
            title: 'Langkah 2 • Mode Layar Penuh',
            desc: 'Klik tombol Layar Penuh di sudut kanan atas Panggung',
            bg: SUNNY_SOFT,
            border: SUNNY,
            icon: 'fullscreen' as JuniorIconName,
          },
          {
            title: 'Langkah 3 • Tarik Napas & Tersenyum',
            desc: 'Tarik napas dalam, Tersenyum, & siap bercerita!',
            bg: TEAL_SOFT,
            border: TEAL,
            icon: 'happy' as JuniorIconName,
          },
        ].map((step) => (
          <div
            key={step.title}
            style={{
              height: 205,
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
                {step.title}
              </div>
              <div style={{ fontSize: 25, fontWeight: 700, color: MUTED, marginTop: 6 }}>{step.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Fullscreen Scratch Stage Preview + Biko */}
      <MacWindowCard
        left={1100}
        top={245}
        width={720}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Layar Penuh Siap Main!"
        padding={28}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '100%', height: 320, borderRadius: 22, border: `3.5px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #60A5FA 0%, #DCFCE7 100%)', ...centerCol, gap: 14 }}>
            <JuniorIcon name="flag" size={76} />
            <div style={{ padding: '8px 24px', borderRadius: 99, background: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
              Klik Bendera Hijau Saat Demo!
            </div>
          </div>

          <BikoMascot pose="thumbs-up" width={235} badgeIcon={<JuniorIcon name="grad-cap" size={20} />} speechBubble="Tarik napas, senyum!" />
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Kartu Panduan: Cara Tampil di Final Showcase!
// ============================================================================
const Slide04KartuPanduan: Page = () => {
  return (
    <JuniorFrame badge="PANDUAN FINAL SHOWCASE" accentDot={SUNNY}>
      <SlideTitle>
        Jurus <Highlight>Presentasi Bintang</Highlight> Panggung!
      </SlideTitle>

      {/* Left Stage Presentation Spotlight */}
      <MacWindowCard
        left={X0}
        top={245}
        width={760}
        height={680}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Panggung Pameran CODEPOLITAN Junior"
        padding={32}
      >
        <div style={{ height: '100%', borderRadius: 22, border: `3px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #1E1B4B 0%, #312E81 100%)', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ padding: '8px 24px', borderRadius: 99, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            Panggung Bintang Kreator
          </div>

          <div style={{ ...row, gap: 22, alignItems: 'center' }}>
            <ScratchCatSvg size={195} gradCap waving />
            <JuniorIcon name="mic" size={92} />
          </div>

          <div style={{ ...row, gap: 18 }}>
            <JuniorIcon name="family" size={76} />
            <JuniorIcon name="clap" size={72} />
          </div>
        </div>
      </MacWindowCard>

      {/* Right 3 Spotlight Points */}
      <MacWindowCard
        left={900}
        top={245}
        width={920}
        height={680}
        titleBarColor={WHITE}
        headerLabel="3 Jurus Presentasi Bintang"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
            <BulletRow icon="hand" bgColor={SKY_SOFT} fontSize={30}>
              <strong>Sapa Ramah:</strong> <em>&quot;Halo Ayah, Bunda, &amp; teman-teman! Namaku ...&quot;</em>
            </BulletRow>
            <BulletRow icon="gamepad" bgColor={SUNNY_SOFT} fontSize={30}>
              <strong>Demo Karya:</strong> Klik <strong>Bendera Hijau</strong> &amp; tunjukkan cara main karyamu!
            </BulletRow>
            <BulletRow icon="star-glow" bgColor={TEAL_SOFT} fontSize={30}>
              <strong>Cerita Seru:</strong> Sebutkan <strong>Judul Karya</strong> &amp; <strong>Bagian Paling Seru!</strong>
            </BulletRow>
          </div>

          <div style={{ padding: '18px 24px', borderRadius: 20, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 16, fontSize: 25, fontWeight: 800 }}>
            <JuniorIcon name="heart" size={34} />
            <span>Ayah, Bunda, dan teman-teman siap memberi tepuk tangan paling meriah untukmu!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Kilas Balik Petualangan Coding Kita!
// ============================================================================
const Slide05KilasBalik: Page = () => {
  return (
    <JuniorFrame badge="JEJAK BELAJAR CODE EXPLORER" accentDot={TEAL}>
      <SlideTitle>
        Lihat <Highlight>Hebatnya Perjalanan</Highlight> Kalian!
      </SlideTitle>

      {/* Top 3 Achievement Milestone Cards */}
      <MacWindowCard
        left={X0}
        top={240}
        width={1720}
        height={480}
        titleBarColor={SKY_SOFT}
        headerLabel="52 Pertemuan • Dari ScratchJr hingga Scratch 3.0"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', gap: 22 }}>
          {[
            {
              title: 'Logika & Urutan',
              desc: 'Menyusun langkah bergerak, menari, & bercerita!',
              bg: CORAL_SOFT,
              border: CORAL,
              icon: 'puzzle' as JuniorIconName,
            },
            {
              title: 'Game & Animasi',
              desc: 'Membuat kontrol keyboard, sensor sentuhan, & papan skor!',
              bg: SKY_SOFT,
              border: SKY,
              icon: 'gamepad' as JuniorIconName,
            },
            {
              title: 'Karya Impian',
              desc: 'Merancang ide, storyboard, & proyek akhir sendiri!',
              bg: TEAL_SOFT,
              border: TEAL,
              icon: 'trophy' as JuniorIconName,
            },
          ].map((c, idx) => (
            <div key={c.title} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ flex: 1, height: '100%', borderRadius: 24, background: c.bg, border: `3.5px solid ${c.border}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                <JuniorIcon name={c.icon} size={82} />
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>{c.title}</div>
                <div style={{ fontSize: 23, fontWeight: 800, color: MUTED, lineHeight: 1.32 }}>{c.desc}</div>
              </div>
              {idx < 2 && <JuniorIcon name="arrow-right" size={40} />}
            </div>
          ))}
        </div>
      </MacWindowCard>

      {/* Bottom Mascot Trio Banner */}
      <div style={{ ...abs(X0, 750, W, 230), borderRadius: 28, background: SUNNY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 8px 0 ${CHARCOAL}`, padding: '0 44px', ...row, justifyContent: 'space-around' }}>
        <TicCatSvg size={135} gradCap />
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, textAlign: 'center', maxWidth: 820 }}>
          Luar biasa! Kalian sudah menaklukkan 52 pertemuan Code Explorer!
        </div>
        <div style={{ ...row, gap: 12 }}>
          <BikoMascot pose="thumbs-up" width={165} />
          <ScratchCatSvg size={145} gradCap waving />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Bagaimana Sikap Penonton yang Baik?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle size={50} maxWidth={1680}>
        Saat Teman Sedang <Highlight>Presentasi di Depan</Highlight>, Apa yang Kita Lakukan?
      </SlideTitle>

      {/* Card A — Correct: Listen & Clap */}
      <button
        type="button"
        onClick={() => {
          playGraduationSound('fanfare');
          setPicked('A');
        }}
        className="cpj52-card-btn"
        style={{
          ...abs(X0, 250, 820, 490),
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
            Dengarkan &amp; Tepuk Tangan
          </span>
        </div>

        <div style={{ ...row, gap: 24 }}>
          <JuniorIcon name="clap" size={96} />
          <JuniorIcon name="star-glow" size={88} />
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'A' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={26} />
              <span>Benar! Penonton juara selalu memberi tepuk tangan!</span>
            </div>
          ) : (
            <span style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Card B — Wrong: Chatting */}
      <button
        type="button"
        onClick={() => {
          playGraduationSound('boing');
          setPicked('B');
        }}
        className="cpj52-card-btn"
        style={{
          ...abs(1000, 250, 820, 490),
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
          animation: picked === 'B' ? 'cpj52-shake 320ms ease' : undefined,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 16, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
            B
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Mengobrol Sendiri
          </span>
        </div>

        <div style={{ ...row, gap: 24 }}>
          <JuniorIcon name="speak" size={96} />
          <JuniorIcon name="cross" size={84} />
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'B' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={26} />
              <span>Kurang tepat! Yuk dengarkan cerita teman dengan tertib!</span>
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
        <div style={{ animation: live ? 'cpj52-float 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thumbs-up" width={165} badgeIcon={<JuniorIcon name="grad-cap" size={22} />} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
          {picked === 'A'
            ? 'Hebat! Penonton juara selalu mendengarkan & bertepuk tangan meriah!'
            : picked === 'B'
              ? 'Ups! Kalau mengobrol sendiri, suara teman di panggung jadi tidak terdengar.'
              : 'Tunjuk sikap penonton juara di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Aturan Panggung: Final Showcase & Graduation Day!
// ============================================================================
const Slide07AturanPanggung: Page = () => {
  return (
    <JuniorFrame badge="ATURAN FINAL SHOWCASE" accentDot={TEAL}>
      <SlideTitle>
        Panggung Pameran yang <Highlight>Hangat &amp; Seru!</Highlight>
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
            <BulletRow icon="mic" bgColor={TEAL_SOFT} fontSize={29}>
              Bicara dengan <strong>Suara Jelas</strong> &amp; penuh senyum bangga
            </BulletRow>
            <BulletRow icon="clap" bgColor={SUNNY_SOFT} fontSize={29}>
              Beri <strong>Tepuk Tangan</strong> &amp; pujian hangat untuk semua teman
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <BikoMascot pose="thumbs-up" width={180} speechBubble="Keren semua!" />
            <JuniorIcon name="clap" size={78} />
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
            <BulletRow icon="see-no-evil" bgColor={CORAL_SOFT} fontSize={29}>
              Malu-malu menutup wajah saat <strong>Orang Tua &amp; Teman</strong> menyimak
            </BulletRow>
            <BulletRow icon="footprints" bgColor={SUNNY_SOFT} fontSize={29}>
              Berlari-lari di depan layar saat teman sedang <strong>Demo Karya</strong>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <JuniorIcon name="see-no-evil" size={105} />
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Waktunya Pameran: Giliranmu Bersinar di Panggung!
// ============================================================================
const Slide08WaktunyaPameran: Page = () => {
  const live = useIsActivePage();
  const [claps, setClaps] = useState(0);

  return (
    <JuniorFrame badge="WAKTUNYA FINAL SHOWCASE!" accentDot={SUNNY}>
      <SlideTitle>
        Ayo Tunjukkan <Highlight>Karya Terbaikmu!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Showcase Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'happy' as JuniorIconName,
            text: (
              <>
                Maju ke depan dengan <strong>Senyum Ceria</strong> saat namamu dipanggil
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'fullscreen' as JuniorIconName,
            text: (
              <>
                Jalankan <strong>Proyek Akhirmu</strong> di Layar Penuh &amp; ceritakan keseruannya
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'clap' as JuniorIconName,
            text: (
              <>
                Ucapkan <strong>&quot;Terima kasih!&quot;</strong> &amp; terima tepuk tangan meriah!
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

      {/* Main Spotlight Showcase Stage + Interactive Applause */}
      <MacWindowCard
        left={X0}
        top={400}
        width={1260}
        height={565}
        titleBarColor={SCRATCH_BLUE}
        headerLabel="Panggung Utama CODEPOLITAN Junior Final Showcase"
        padding={28}
      >
        <div style={{ height: '100%', borderRadius: 22, border: `3.5px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #1E1B4B 0%, #312E81 66%, #4338CA 100%)', position: 'relative', overflow: 'hidden', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ ...row, gap: 18 }}>
            <JuniorIcon name="star-glow" size={50} />
            <div style={{ padding: '8px 28px', borderRadius: 99, background: SUNNY, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
              FINAL SHOWCASE CODE EXPLORER
            </div>
            <JuniorIcon name="star-glow" size={50} />
          </div>

          <div style={{ ...row, gap: 38, alignItems: 'center' }}>
            <ScratchCatSvg size={180} gradCap waving />
            <div style={{ padding: '22px 32px', borderRadius: 24, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol, gap: 8, textAlign: 'center' }}>
              <JuniorIcon name="trophy" size={76} />
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
                Tepuk Tangan: {claps}x
              </div>
            </div>
            <TicCatSvg size={160} gradCap />
          </div>

          <button
            type="button"
            onClick={() => {
              playGraduationSound('clap');
              setClaps((c) => c + 1);
            }}
            className="cpj52-card-btn"
            style={{ padding: '12px 34px', borderRadius: 18, background: SUNNY, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 12 }}
          >
            <JuniorIcon name="clap" size={30} />
            <span>Beri Tepuk Tangan Meriah!</span>
          </button>
        </div>
      </MacWindowCard>

      {/* Cheering Biko */}
      <div style={{ ...abs(1395, 420, 440, 530), ...centerCol }}>
        <div style={{ animation: live ? 'cpj52-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="jump"
            width={320}
            badgeIcon={<JuniorIcon name="mic" size={24} />}
            speechBubble="Kamu bintangnya!"
          />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Momen Kebanggaan: Apresiasi Orang Tua & Foto Bersama!
// ============================================================================
const Slide09MomenKeluarga: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MOMEN SPESIAL KELUARGA" accentDot={CORAL}>
      <SlideTitle>
        Terima Kasih <Highlight color="#FCE7F3">Ayah, Bunda &amp; Sahabat!</Highlight>
      </SlideTitle>

      {/* Left Gold Polaroid Photo Frame */}
      <MacWindowCard
        left={X0}
        top={245}
        width={800}
        height={680}
        titleBarColor={PINK_SOFT}
        headerLabel="Foto Kenangan Kelulusan"
        padding={30}
      >
        <div style={{ height: '100%', padding: 20, borderRadius: 24, background: SUNNY, border: `4px solid ${CHARCOAL}`, boxShadow: `0 8px 0 ${CHARCOAL}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '100%', flex: 1, borderRadius: 18, border: `3px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #DBEAFE 0%, #FCE7F3 100%)', ...row, justifyContent: 'space-around', alignItems: 'flex-end', padding: '16px 12px', position: 'relative' }}>
            <div style={{ ...abs(20, 14), animation: live ? 'cpj52-twinkle 2.4s ease-in-out infinite' : undefined }}>
              <JuniorIcon name="star-glow" size={44} />
            </div>
            <div style={{ ...abs(630, 14), animation: live ? 'cpj52-twinkle 2.8s ease-in-out infinite' : undefined }}>
              <JuniorIcon name="heart" size={44} />
            </div>
            <TicCatSvg size={145} gradCap />
            <BikoMascot pose="thumbs-up" width={210} badgeIcon={<JuniorIcon name="grad-cap" size={20} />} />
            <ScratchCatSvg size={165} gradCap waving />
          </div>
          <div style={{ paddingTop: 14, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
            Code Explorer Class • CODEPOLITAN Junior
          </div>
        </div>
      </MacWindowCard>

      {/* Right Appreciation Card */}
      <MacWindowCard
        left={940}
        top={245}
        width={880}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Apresiasi & Foto Bersama"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="heart" bgColor={PINK_SOFT} fontSize={32}>
              Terima kasih sudah menemani perjalanan belajar coding dari awal hingga lulus!
            </BulletRow>
            <BulletRow icon="landscape" bgColor={SUNNY_SOFT} fontSize={32}>
              Waktunya <strong>Foto Bersama</strong> memegang Sertifikat Kelulusan!
            </BulletRow>
          </div>

          <div style={{ padding: '20px 26px', borderRadius: 20, background: TEAL_SOFT, border: `3px solid ${TEAL}`, ...row, gap: 16, fontSize: 26, fontWeight: 800 }}>
            <JuniorIcon name="family" size={38} />
            <span>Senyum lebar! Abadikan momen kelulusan pertama coder cilik kita bersama keluarga!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Wisuda Besar: Selamat Lulus Code Explorer CODEPOLITAN Junior!
// ============================================================================
const Slide10Wisuda: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="GRADUATION DAY • LULUS!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(145, 220), animation: live ? 'cpj52-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={52} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj52-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={52} />
      </div>

      <SlideTitle top={135} size={56} align="center" maxWidth={1620}>
        Selamat! Kamu Resmi Lulus <Highlight>Code Explorer Hebat!</Highlight>
      </SlideTitle>

      {/* Center Grand Graduation Card */}
      <MacWindowCard
        left={220}
        top={255}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="CODEPOLITAN JUNIOR GRADUATE"
        padding={34}
      >
        <div style={{ height: '100%', ...centerCol, gap: 20, textAlign: 'center' }}>
          {/* Big Graduation Trophy + Diploma Scroll + Gold Star Medal */}
          <div style={{ ...row, gap: 28, alignItems: 'center', animation: live ? 'cpj52-float 2.6s ease-in-out infinite' : undefined }}>
            <JuniorIcon name="grad-cap" size={125} />
            <svg width={215} height={215} viewBox="0 0 210 210">
              <path d="M55 48 C26 48, 22 92, 55 98" fill="none" stroke={CHARCOAL} strokeWidth={8} strokeLinecap="round" />
              <path d="M155 48 C184 48, 188 92, 155 98" fill="none" stroke={CHARCOAL} strokeWidth={8} strokeLinecap="round" />
              <path d="M52 38 L158 38 L144 124 C138 144, 72 144, 66 124 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />
              <rect x="92" y="138" width="26" height="32" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4.5} />
              <rect x="64" y="168" width="82" height="24" rx="8" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={4.5} />
              <polygon points="105,58 113,75 132,78 118,91 122,110 105,101 88,110 92,91 78,78 97,75" fill={WHITE} stroke={CHARCOAL} strokeWidth={3} />
            </svg>
            <JuniorIcon name="medal" size={125} />
          </div>

          <div
            style={{
              padding: '14px 36px',
              borderRadius: 99,
              background: SUNNY,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 31,
              fontWeight: 700,
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="trophy" size={34} />
            <span>Sertifikat &amp; Medali Kelulusan Utama CODEPOLITAN Junior</span>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 29, fontWeight: 700, lineHeight: 1.38, maxWidth: 940, color: CHARCOAL }}>
            Teruslah berkarya, berimajinasi, &amp; menciptakan hal ajaib dengan{' '}
            <Highlight color="#DBEAFE">Coding!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Celebrating Trio: Biko, Scratch Cat & Tic Cat */}
      <div style={{ ...abs(1310, 330, 560, 620), ...centerCol }}>
        <div style={{ marginBottom: 8, animation: live ? 'cpj52-hop 2s ease-in-out infinite' : undefined }}>
          <TicCatSvg size={145} gradCap />
        </div>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot pose="jump" width={285} badgeIcon={<JuniorIcon name="grad-cap" size={22} />} speechBubble="Lulus Hebat!" />
          <div style={{ animation: live ? 'cpj52-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <ScratchCatSvg size={175} gradCap waving />
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
  `Selamat datang di Pertemuan 52 — Graduation Day & Final Showcase! 🎓🏆🎉
Hari kelulusan spesial Level 1 Code Explorer! Anak-anak akan memamerkan Proyek Akhir di depan Orang Tua dan teman-teman!`,

  `Dua misi besar Graduation Day hari ini:
1. Memamerkan Proyek Akhir di depan Ayah, Bunda, & teman-teman.
2. Merayakan kelulusan Coder Cilik hebat Level 1 Code Explorer!`,

  `Cek 3 Langkah Sebelum Naik Panggung:
1. Buka File Proyek Akhirmu di Scratch 3.0.
2. Klik tombol Layar Penuh di sudut kanan atas Panggung.
3. Tarik napas dalam, tersenyum, dan siap bercerita!`,

  `Kartu Panduan Presentasi Bintang Panggung:
- Sapa Ramah: "Halo Ayah, Bunda, & teman-teman! Namaku ..."
- Demo Karya: Klik Bendera Hijau & tunjukkan cara mainnya!
- Cerita Seru: Sebutkan Judul Karya & bagian paling seru!`,

  `Kilas Balik Hebatnya Perjalanan Belajar Code Explorer (Pertemuan 1–52):
1. Logika & Urutan (ScratchJr)
2. Game & Animasi (Kontrol keyboard, sensor, skor)
3. Karya Impian (Ide, storyboard, & proyek akhir sendiri)!`,

  `Permainan Cepat! Bagaimana sikap penonton yang baik?
Saat teman presentasi di depan — Pilihan A (Dengarkan & Tepuk Tangan) atau Pilihan B (Mengobrol Sendiri)?`,

  `Aturan Panggung Final Showcase:
BOLEH bicara dengan suara jelas sambil tersenyum & beri tepuk tangan hangat untuk teman.
JANGAN menutup wajah karena malu atau berlari-lari di depan layar saat teman sedang demo!`,

  `Waktunya Final Showcase — Giliranmu Bersinar di Panggung!
Panggil anak-anak satu per satu untuk tampil percaya diri memamerkan karya di Layar Penuh sambil kita beri tepuk tangan meriah!`,

  `Momen Kebanggaan — Terima Kasih Ayah, Bunda & Sahabat! 💖📸
Terima kasih kepada orang tua yang mendampingi dari pertemuan 1 sampai lulus. Waktunya foto bersama memegang Sertifikat Kelulusan!`,

  `Selamat! Kamu Resmi Lulus Code Explorer Hebat! 🎓🏆🎉
Teruslah berkarya, berimajinasi, dan menciptakan hal ajaib dengan Coding bersama CODEPOLITAN Junior!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 52 — Graduation Day & Final Showcase!',
  createdAt: '2026-11-16T16:48:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03CekSiapPanggung,
  Slide04KartuPanduan,
  Slide05KilasBalik,
  Slide06AyoTebak,
  Slide07AturanPanggung,
  Slide08WaktunyaPameran,
  Slide09MomenKeluarga,
  Slide10Wisuda,
] satisfies Page[];

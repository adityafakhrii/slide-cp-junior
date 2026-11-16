import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-51-galeri-karya-digitalku';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj51-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj51-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-15px) scale(1.05); }
}
@keyframes cpj51-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj51-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.78); }
  50% { box-shadow: 0 0 0 12px rgba(251, 191, 36, 0); }
}
@keyframes cpj51-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj51-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
.cpj51-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj51-card-btn:hover {
  transform: translateY(-4px);
}
.cpj51-card-btn:active {
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

/** Playful camera shutter / save chime via Web Audio API */
function playGallerySound(kind: 'win' | 'boing' | 'snap') {
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
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1240, ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.16, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
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
          animation: live ? 'cpj51-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 51 • Galeri Karya Digitalku!</span>
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
// Reusable Pertemuan 51 Visuals (Scratch Cat, Framed Gallery Snapshot Card)
// ============================================================================

const ScratchCatSvg = ({ size = 115, clapping = false }: { size?: number; clapping?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <ellipse cx="70" cy="128" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path d="M40 100 C20 96, 14 78, 25 69 C32 63, 38 71, 35 78 C33 83, 38 90, 46 90" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <ellipse cx="56" cy="120" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="120" rx="11" ry="7" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="70" cy="96" rx="25" ry="23" fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.8} />
    <ellipse cx="70" cy="98" rx="14" ry="14" fill={WHITE} />
    <path d={clapping ? 'M46 84 C32 72, 34 56, 44 56 C50 56, 52 68, 52 78' : 'M46 86 C35 90, 35 103, 45 103'} fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
    <path d={clapping ? 'M94 84 C108 72, 106 56, 96 56 C90 56, 88 68, 88 78' : 'M94 86 C105 90, 105 103, 95 103'} fill="#FF8C1A" stroke={CHARCOAL} strokeWidth={3.6} strokeLinecap="round" />
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

const FramedGalleryTile = ({
  title,
  icon,
  bg,
}: {
  title: string;
  icon: JuniorIconName;
  bg: string;
}) => (
  <div
    style={{
      flex: 1,
      height: 195,
      borderRadius: 20,
      background: WHITE,
      border: `3px solid ${CHARCOAL}`,
      boxShadow: `0 6px 0 ${CHARCOAL}`,
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <div style={{ width: '100%', height: 118, borderRadius: 14, background: bg, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
      <JuniorIcon name={icon} size={64} />
    </div>
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, fontWeight: 700 }}>{title}</span>
  </div>
);

// ============================================================================
// SLIDE 01 — Cover
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 51" accentDot={SCRATCH_BLUE}>
      {/* Left Hero Copy */}
      <div style={{ ...abs(X0, 225, 860) }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 99, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, marginBottom: 22 }}>
          <JuniorIcon name="landscape" size={26} />
          <span>Portofolio Digital &amp; Latihan Presentasi</span>
        </div>

        <h1 style={{ margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: 90, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <Highlight>Galeri Karya</Highlight>
          <br />
          Digitalku!
        </h1>

        <p style={{ margin: '30px 0 0', fontSize: 31, fontWeight: 700, lineHeight: 1.4, color: MUTED, maxWidth: 790 }}>
          Menyimpan Proyek, Menyusun <strong style={{ color: CHARCOAL }}>Portofolio</strong> &amp;{' '}
          <strong style={{ color: CHARCOAL }}>Latihan Presentasi Cilik!</strong>
        </p>

        <div style={{ ...row, gap: 16, marginTop: 34 }}>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SKY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="folder" size={24} />
            <span>Simpan &amp; Galeri</span>
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 18, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, ...row, gap: 10, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            <JuniorIcon name="mic" size={24} />
            <span>Latihan Presentasi</span>
          </div>
        </div>
      </div>

      {/* Right Visual: Biko with Star Album & Mic + Scratch Cat Framed Gallery */}
      <MacWindowCard
        left={1010}
        top={185}
        width={810}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Scratch 3.0 • Galeri Karyaku"
        padding={26}
      >
        <div style={{ height: '100%', borderRadius: 20, border: `3px solid ${CHARCOAL}`, background: 'linear-gradient(180deg, #EFF6FF 0%, #FEF9C3 100%)', position: 'relative', overflow: 'hidden', padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <FramedGalleryTile title="Flyer Game" icon="bird" bg="#BAE6FD" />
            <FramedGalleryTile title="Konser Musik" icon="music-note" bg="#EDE9FE" />
            <FramedGalleryTile title="Proyek Akhir" icon="trophy" bg="#FEF3C7" />
          </div>

          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'flex-end' }}>
            <div style={{ animation: live ? 'cpj51-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot pose="thumbs-up" width={245} badgeIcon={<JuniorIcon name="mic" size={22} />} speechBubble="Siap cerita!" />
            </div>
            <div style={{ animation: live ? 'cpj51-hop 2.4s ease-in-out infinite' : undefined }}>
              <ScratchCatSvg size={180} clapping />
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
        Apa Misi Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      {/* Biko Left Anchor */}
      <div style={{ ...abs(95, 295, 360, 620), ...centerCol }}>
        <div style={{ animation: live ? 'cpj51-hop 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="point-left" width={320} badgeIcon={<JuniorIcon name="mic" size={22} />} speechBubble="Album & Mic!" />
        </div>
      </div>

      {/* macOS Window with 2 Cards */}
      <MacWindowCard
        left={480}
        top={240}
        width={1340}
        height={700}
        titleBarColor={SKY_SOFT}
        headerLabel="Misi Pertemuan 51"
        padding={42}
      >
        <div style={{ display: 'flex', gap: 36, height: '100%' }}>
          {/* Card 1: Save & Portfolio */}
          <div style={{ flex: 1, borderRadius: 24, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 1
            </div>
            <div style={{ ...row, gap: 18 }}>
              <JuniorIcon name="folder" size={88} />
              <JuniorIcon name="landscape" size={88} />
            </div>
            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Simpan Proyek &amp; Susun <span style={{ color: '#1D4ED8' }}>Galeri Portofolio</span>
            </div>
          </div>

          {/* Card 2: Presentation Practice */}
          <div style={{ flex: 1, borderRadius: 24, background: SUNNY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
              MISI 2
            </div>
            <div style={{ ...row, gap: 18 }}>
              <JuniorIcon name="mic" size={90} />
              <JuniorIcon name="say" size={86} />
            </div>
            <div style={{ fontSize: 31, fontWeight: 800, lineHeight: 1.32, color: CHARCOAL }}>
              Latihan <span style={{ color: '#B45309' }}>Presentasi Cilik</span> Ceritakan Karyamu!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Langkah #1: Beri Nama & Simpan Proyek dengan Aman!
// ============================================================================
const Slide03SimpanProyek: Page = () => {
  const live = useIsActivePage();
  const [savedToast, setSavedToast] = useState(false);

  return (
    <JuniorFrame badge="SIMPAN PROYEK AKHIR" accentDot={SCRATCH_BLUE}>
      <SlideTitle>
        Beri <Highlight>Nama Keren</Highlight> &amp; Simpan!
      </SlideTitle>

      {/* Left Scratch 3.0 Top File Menu Mockup */}
      <MacWindowCard
        left={X0}
        top={245}
        width={840}
        height={680}
        titleBarColor={SKY_SOFT}
        headerLabel="Menu Atas Scratch 3.0"
        padding={26}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Simulated Blue Scratch Nav Bar */}
          <div style={{ borderRadius: 18, border: `3px solid ${CHARCOAL}`, overflow: 'hidden', background: WHITE }}>
            <div style={{ height: 58, background: SCRATCH_BLUE, padding: '0 16px', ...row, gap: 14, color: WHITE }}>
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700 }}>SCRATCH</span>
              <span style={{ padding: '5px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.22)', border: `2px solid ${SUNNY}`, fontWeight: 800 }}>
                File
              </span>
              <div style={{ flex: 1, padding: '6px 14px', borderRadius: 10, background: WHITE, color: CHARCOAL, border: `2.5px solid ${SUNNY}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
                Game Tangkap Bintang - Biko
              </div>
            </div>

            {/* Dropdown Menu */}
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10, width: 350 }}>
              <div style={{ padding: '8px 14px', fontSize: 18, fontWeight: 700, color: MUTED }}>New</div>
              <div style={{ padding: '8px 14px', fontSize: 18, fontWeight: 700, color: MUTED }}>Load from your computer</div>
              <button
                type="button"
                onClick={() => {
                  playGallerySound('win');
                  setSavedToast(true);
                }}
                className="cpj51-card-btn"
                style={{
                  padding: '12px 16px',
                  borderRadius: 14,
                  background: SUNNY,
                  border: `3px solid ${CHARCOAL}`,
                  animation: live ? 'cpj51-pulse 1.8s infinite' : undefined,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 20,
                  fontWeight: 700,
                  textAlign: 'left',
                  ...row,
                  gap: 10,
                }}
              >
                <JuniorIcon name="folder" size={24} />
                <span>Save to your computer</span>
              </button>
            </div>
          </div>

          <div style={{ ...row, justifyContent: 'space-between', alignItems: 'center' }}>
            <BikoMascot pose="point-left" width={190} speechBubble={savedToast ? 'Tersimpan!' : 'Klik Save!'} />
            {savedToast && (
              <div style={{ padding: '14px 24px', borderRadius: 18, background: TEAL_SOFT, border: `3px solid ${TEAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
                <JuniorIcon name="check" size={30} />
                <span>File .sb3 tersimpan aman!</span>
              </div>
            )}
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
        headerLabel="2 Langkah Menyimpan Karya"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="abc" bgColor={SUNNY_SOFT} fontSize={31}>
              Ketik <strong>Judul Proyekmu</strong> di kotak atas (Contoh: <code>Game Tangkap Bintang - Biko</code>)
            </BulletRow>
            <BulletRow icon="folder" bgColor={TEAL_SOFT} fontSize={31}>
              Klik menu <strong><code>File</code> -&gt; <code>Save to your computer</code></strong> agar file tersimpan aman!
            </BulletRow>
          </div>

          <div style={{ padding: '20px 26px', borderRadius: 20, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 16, fontSize: 25, fontWeight: 800 }}>
            <JuniorIcon name="star-glow" size={34} />
            <span>Menambahkan namamu di judul file membuat file proyekmu gampang dikenali saat pameran!</span>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Langkah #2: Kenalan Sama "Portofolio Digital"!
// ============================================================================
const Slide04PortofolioDigital: Page = () => {
  return (
    <JuniorFrame badge="KAMUS KREATOR CILIK" accentDot={TEAL}>
      <SlideTitle>
        Apa Itu <Highlight>Portofolio Digital?</Highlight>
      </SlideTitle>

      {/* Left Spotlight Explanation */}
      <MacWindowCard
        left={X0}
        top={245}
        width={860}
        height={680}
        titleBarColor={WHITE}
        headerLabel="Kamus Kreator Cilik"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
            <BulletRow icon="landscape" bgColor={SUNNY_SOFT} fontSize={32}>
              <strong>Portofolio:</strong> Album pameran berisi <strong>Foto &amp; Cerita Karya Terbaikmu!</strong>
            </BulletRow>
            <BulletRow icon="fullscreen" bgColor={SKY_SOFT} fontSize={32}>
              Kita ambil <strong>Foto Layar (Screenshot)</strong> saat karya dimainkan di Layar Penuh!
            </BulletRow>
          </div>

          <div style={{ padding: '20px 26px', borderRadius: 20, background: TEAL_SOFT, border: `3px solid ${TEAL}`, ...row, gap: 16, fontSize: 25, fontWeight: 800 }}>
            <JuniorIcon name="sparkle" size={34} />
            <span>Portofolio bisa ditunjukkan kepada ayah, ibu, dan teman-teman sebagai kenangan karya hebatmu!</span>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Colorful Gallery Wall Mockup */}
      <MacWindowCard
        left={1000}
        top={245}
        width={820}
        height={680}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Dinding Pameran Galeri Karyaku"
        padding={30}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ padding: '8px 28px', borderRadius: 99, background: SCRATCH_BLUE, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>
            GALERI KARYAKU
          </div>

          <div style={{ width: '100%', display: 'flex', gap: 16 }}>
            <FramedGalleryTile title="Cerita Luar Angkasa" icon="rocket" bg="#1E1B4B" />
            <FramedGalleryTile title="Panen Buah" icon="apple" bg="#DCFCE7" />
            <FramedGalleryTile title="Konser Musik" icon="music-note" bg="#FCE7F3" />
          </div>

          <BikoMascot pose="thumbs-up" width={205} speechBubble="Album keren!" />
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Langkah #3: Jurus Latihan Presentasi Cilik!
// ============================================================================
const Slide05JurusPresentasi: Page = () => {
  return (
    <JuniorFrame badge="JURUS PRESENTASI CILIK" accentDot={SUNNY}>
      <SlideTitle>
        <Highlight>3 Langkah</Highlight> Bercerita dengan Percaya Diri!
      </SlideTitle>

      {/* Left 3 Steps Window */}
      <MacWindowCard
        left={X0}
        top={235}
        width={1320}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Panduan Presentasi 3 Langkah"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
          {[
            {
              title: 'Langkah 1 • Sapa & Kenalkan',
              desc: '"Halo! Namaku ..., ini karyaku ...!"',
              bg: SKY_SOFT,
              border: SKY,
              icon: 'hand' as JuniorIconName,
            },
            {
              title: 'Langkah 2 • Tunjukkan Aksinya',
              desc: 'Tekan Bendera Hijau & mainkan di Layar Penuh!',
              bg: SUNNY_SOFT,
              border: SUNNY,
              icon: 'gamepad' as JuniorIconName,
            },
            {
              title: 'Langkah 3 • Cerita Bagian Seru',
              desc: '"Bagian favoritku adalah saat ...!"',
              bg: TEAL_SOFT,
              border: TEAL,
              icon: 'star-glow' as JuniorIconName,
            },
          ].map((step) => (
            <div
              key={step.title}
              style={{
                flex: 1,
                borderRadius: 22,
                background: step.bg,
                border: `3.5px solid ${step.border}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                padding: '18px 28px',
                ...row,
                gap: 24,
              }}
            >
              <div style={{ width: 82, height: 82, borderRadius: 22, background: WHITE, border: `3px solid ${CHARCOAL}`, ...centerCol, flexShrink: 0 }}>
                <JuniorIcon name={step.icon} size={46} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 29, fontWeight: 700, color: CHARCOAL }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 27, fontWeight: 800, color: MUTED, marginTop: 4 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </MacWindowCard>

      {/* Right Biko Mic & Clapping Cat */}
      <div style={{ ...abs(1455, 310, 380, 620), ...centerCol, justifyContent: 'space-between' }}>
        <BikoMascot pose="thumbs-up" width={295} badgeIcon={<JuniorIcon name="mic" size={22} />} speechBubble="Suara jelas!" />
        <ScratchCatSvg size={185} clapping />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Pilih Cara Menyimpan Proyek!
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={SUNNY}>
      <SlideTitle size={50} maxWidth={1680}>
        Menu Mana di Scratch 3.0 untuk <Highlight>Menyimpan Proyek</Highlight> ke Komputer?
      </SlideTitle>

      {/* Card A — Correct: File -> Save to your computer */}
      <button
        type="button"
        onClick={() => {
          playGallerySound('win');
          setPicked('A');
        }}
        className="cpj51-card-btn"
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
            Save to your computer
          </span>
        </div>

        <div style={{ padding: '18px 34px', borderRadius: 22, background: SKY_SOFT, border: `3.5px solid ${SCRATCH_BLUE}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, gap: 16, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
          <JuniorIcon name="folder" size={44} />
          <span>File -&gt; Save to your computer</span>
        </div>

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'A' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="check" size={26} />
              <span>Benar! Menu ini menyimpan proyekmu dengan aman!</span>
            </div>
          ) : (
            <span style={{ fontSize: 23, fontWeight: 700, color: MUTED }}>Klik kartu ini untuk cek!</span>
          )}
        </div>
      </button>

      {/* Card B — Wrong: Stop Button */}
      <button
        type="button"
        onClick={() => {
          playGallerySound('boing');
          setPicked('B');
        }}
        className="cpj51-card-btn"
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
          animation: picked === 'B' ? 'cpj51-shake 320ms ease' : undefined,
        }}
      >
        <div style={{ ...row, gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 16, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol }}>
            B
          </span>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Tombol Stop
          </span>
        </div>

        <JuniorIcon name="stop" size={120} />

        <div style={{ minHeight: 54, ...row }}>
          {picked === 'B' ? (
            <div style={{ padding: '10px 24px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 10 }}>
              <JuniorIcon name="cross" size={26} />
              <span>Bukan! Itu cuma menghentikan panggung game!</span>
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
        <div style={{ animation: live ? 'cpj51-float 2.6s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thinking" width={165} badgeIcon={<JuniorIcon name="question" size={22} />} />
        </div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
          {picked === 'A'
            ? 'Hebat! Klik File lalu pilih Save to your computer ya!'
            : picked === 'B'
              ? 'Ups! Tombol merah Stop untuk berhenti. Pilih menu File -> Save!'
              : 'Tunjuk pilihan yang benar di layarmu ya!'}
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Kartu Contekan: Latihan Bicara di Depan Cermin / Teman!
// ============================================================================
const Slide07KartuCerita: Page = () => {
  return (
    <JuniorFrame badge="CONTOH KALIMAT PRESENTASI" accentDot={LAVENDER}>
      <SlideTitle>
        Yuk Latihan Pakai <Highlight color="#EDE9FE">Kartu Cerita</Highlight> Ini!
      </SlideTitle>

      {/* Left Rehearsal Visual */}
      <MacWindowCard
        left={X0}
        top={245}
        width={640}
        height={680}
        titleBarColor={LAVENDER_SOFT}
        headerLabel="Panggung Latihan Berdua"
        padding={28}
      >
        <div style={{ height: '100%', ...centerCol, justifyContent: 'space-around' }}>
          <div style={{ ...row, gap: 10, alignItems: 'flex-end' }}>
            <BikoMascot pose="thumbs-up" width={275} badgeIcon={<JuniorIcon name="mic" size={22} />} speechBubble="Halo teman-teman!" />
            <ScratchCatSvg size={180} clapping />
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 16, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, textAlign: 'center' }}>
            Bacakan kartu di kanan bergantian dengan teman sebangku!
          </div>
        </div>
      </MacWindowCard>

      {/* Right 3 Speech Cards */}
      <div style={{ ...abs(780, 245, 1040, 680), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {[
          {
            label: '1. Pembuka',
            quote: '"Halo teman-teman! Namaku Biko."',
            bg: SKY_SOFT,
            border: SKY,
            icon: 'hand' as JuniorIconName,
          },
          {
            label: '2. Nama Karya',
            quote: '"Ini proyek akhirku berjudul Petualangan Luar Angkasa."',
            bg: SUNNY_SOFT,
            border: SUNNY,
            icon: 'rocket' as JuniorIconName,
          },
          {
            label: '3. Cara Main & Favorit',
            quote: '"Cara mainnya tekan Panah Atas-Bawah. Aku paling suka saat muncul Suara Hore & Skor!"',
            bg: TEAL_SOFT,
            border: TEAL,
            icon: 'mic' as JuniorIconName,
          },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              height: 205,
              borderRadius: 26,
              background: item.bg,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '20px 28px',
              ...row,
              gap: 24,
            }}
          >
            <div style={{ width: 82, height: 82, borderRadius: 22, background: WHITE, border: `3px solid ${item.border}`, ...centerCol, flexShrink: 0 }}>
              <JuniorIcon name={item.icon} size={46} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700, color: CHARCOAL }}>
                {item.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: MUTED, marginTop: 6, lineHeight: 1.3 }}>
                <em>{item.quote}</em>
              </div>
            </div>
          </div>
        ))}
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Menyusun Galeri & Presentasi (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsPresentasi: Page = () => {
  return (
    <JuniorFrame badge="TIPS PEMBICARA CILIK" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Galeri &amp; Presentasimu <Highlight>Keren!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & PERCAYA DIRI"
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
            <BulletRow icon="happy" bgColor={TEAL_SOFT} fontSize={29}>
              <strong>Tersenyum</strong> &amp; bicara dengan suara yang <strong>Jelas</strong>
            </BulletRow>
            <BulletRow icon="fullscreen" bgColor={SUNNY_SOFT} fontSize={29}>
              Ambil foto layar saat karakter sedang <strong>Beraksi Seru</strong>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <BikoMascot pose="thumbs-up" width={180} speechBubble="Suara lantang!" />
            <JuniorIcon name="mic" size={78} />
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
              Menutup wajah atau berbicara <strong>Terlalu Pelan</strong>
            </BulletRow>
            <BulletRow icon="folder" bgColor={SUNNY_SOFT} fontSize={29}>
              Lupa memberi <strong>Nama File</strong> saat menyimpan proyek
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <JuniorIcon name="mute" size={105} />
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Susun Galeri & Latihan Presentasi!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [photosCount, setPhotosCount] = useState(1);
  const [stepIdx, setStepIdx] = useState(0);
  const speechSteps = [
    '"Halo! Namaku ..., ini proyek akhirku!"',
    'Klik Bendera Hijau & tunjukkan aksinya di Layar Penuh!',
    '"Bagian favoritku adalah saat muncul suara & skor!"',
  ];

  return (
    <JuniorFrame badge="AYO PRAKTIK & LATIHAN!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Galeri Karya &amp; Latihan Presentasi!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'folder' as JuniorIconName,
            text: (
              <>
                Beri nama proyekmu &amp; klik <strong>Save to your computer</strong>
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'landscape' as JuniorIconName,
            text: (
              <>
                Buka <strong>Layar Penuh</strong>, jalankan proyek, &amp; ambil <strong>Foto Galeri</strong>
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'mic' as JuniorIconName,
            text: (
              <>
                Berlatih cerita <strong>3 Langkah Presentasi</strong> bersama mentor / teman!
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

      {/* Interactive Portfolio Snapshot + Rehearsal Studio */}
      <MacWindowCard
        left={X0}
        top={400}
        width={1280}
        height={565}
        titleBarColor={SCRATCH_BLUE}
        headerLabel="Studio Portofolio & Latihan Presentasi"
        padding={22}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={() => {
                playGallerySound('snap');
                setPhotosCount((c) => Math.min(3, c + 1));
              }}
              className="cpj51-card-btn"
              style={{ padding: '8px 22px', borderRadius: 14, background: SUNNY, border: `2.5px solid ${CHARCOAL}`, boxShadow: `0 4px 0 ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 20, fontWeight: 700, ...row, gap: 10 }}
            >
              <JuniorIcon name="landscape" size={24} />
              <span>Ambil Foto Galeri ({photosCount}/3)</span>
            </button>

            <div style={{ ...row, gap: 10 }}>
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    playGallerySound('win');
                    setStepIdx(i);
                  }}
                  className="cpj51-card-btn"
                  style={{ padding: '8px 18px', borderRadius: 14, background: stepIdx === i ? TEAL : WHITE, color: stepIdx === i ? WHITE : CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}
                >
                  Kartu {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', gap: 18 }}>
            <FramedGalleryTile title="Foto 1: Mulai" icon="flag" bg="#DBEAFE" />
            {photosCount >= 2 ? (
              <FramedGalleryTile title="Foto 2: Aksi Seru" icon="star-glow" bg="#FEF9C3" />
            ) : (
              <div style={{ flex: 1, height: 195, borderRadius: 20, border: `3px dashed #94A3B8`, ...centerCol, color: MUTED, fontWeight: 800 }}>
                Klik Ambil Foto!
              </div>
            )}
            {photosCount >= 3 ? (
              <FramedGalleryTile title="Foto 3: Tamat!" icon="trophy" bg="#DCFCE7" />
            ) : (
              <div style={{ flex: 1, height: 195, borderRadius: 20, border: `3px dashed #94A3B8`, ...centerCol, color: MUTED, fontWeight: 800 }}>
                Klik Ambil Foto!
              </div>
            )}
          </div>

          <div style={{ padding: '16px 26px', borderRadius: 18, background: SUNNY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 16 }}>
            <JuniorIcon name="mic" size={38} />
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700 }}>
              Latihan Kartu {stepIdx + 1}: {speechSteps[stepIdx]}
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko & Scratch Cat */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', animation: live ? 'cpj51-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot pose="thumbs-up" width={265} badgeIcon={<JuniorIcon name="mic" size={22} />} speechBubble="Percaya diri!" />
          <ScratchCatSvg size={135} clapping />
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 51 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj51-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj51-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="mic" size={50} />
      </div>

      <SlideTitle top={135} size={58} align="center" maxWidth={1540}>
        Hore! Kamu Kurator Galeri &amp; <Highlight>Pembicara Cilik Hebat!</Highlight>
      </SlideTitle>

      {/* Center Celebration Window */}
      <MacWindowCard
        left={260}
        top={260}
        width={1060}
        height={690}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 51"
        padding={36}
      >
        <div style={{ height: '100%', ...centerCol, gap: 22, textAlign: 'center' }}>
          {/* Golden Star Frame & Champion Microphone Medal */}
          <div style={{ animation: live ? 'cpj51-float 2.6s ease-in-out infinite' : undefined }}>
            <svg width={215} height={215} viewBox="0 0 210 210">
              <path d="M72 128 L52 195 L82 180 L96 198 L106 135 Z" fill={SCRATCH_BLUE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M138 128 L158 195 L128 180 L114 198 L104 135 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="105" cy="96" r="72" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="105" cy="96" r="56" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.2} />
              {/* Framed Star + Mic */}
              <rect x="68" y="68" width="54" height="52" rx="8" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} />
              <polygon points="95,78 99,86 108,87 101,93 103,102 95,97 87,102 89,93 82,87 91,86" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
              <circle cx="136" cy="82" r="14" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={3.2} />
              <rect x="131" y="96" width="10" height="24" rx="4" fill={CHARCOAL} />
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
            <span>Lencana Master Portofolio &amp; Presentasi Cilik</span>
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, lineHeight: 1.38, maxWidth: 920, color: CHARCOAL }}>
            Kamu sudah siap tampil percaya diri di{' '}
            <Highlight color="#DBEAFE">Pameran Proyek Akhir!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Scratch Cat Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot pose="jump" width={295} badgeIcon={<JuniorIcon name="mic" size={22} />} speechBubble="Siap Pameran!" />
          <div style={{ animation: live ? 'cpj51-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <ScratchCatSvg size={185} clapping />
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
  `Selamat datang di Pertemuan 51 — Galeri Karya Digitalku! 🖼️🎤
Hari ini anak-anak menyimpan proyek akhir dengan rapi, menyusun Galeri Portofolio digital, dan berlatih Presentasi Cilik menuju Demo Day!`,

  `Dua misi spesial hari ini:
1. Menyimpan proyek dan menyusun Galeri Portofolio foto karya.
2. Latihan Presentasi Cilik menceritakan karya dengan percaya diri!`,

  `Langkah 1 — Beri Nama Keren & Simpan Proyek dengan Aman:
Ketik judul proyek yang jelas (misalnya "Game Tangkap Bintang - Biko") lalu klik File -> Save to your computer!`,

  `Langkah 2 — Apa Itu Portofolio Digital?
Portofolio adalah album pameran berisi foto dan cerita karya terbaikmu! Kita ambil tangkapan layar (Screenshot) saat karya dimainkan di Layar Penuh!`,

  `Langkah 3 — 3 Langkah Bercerita dengan Percaya Diri:
1. Sapa & Kenalkan: "Halo! Namaku ..., ini karyaku ...!"
2. Tunjukkan Aksinya: Klik Bendera Hijau & Layar Penuh!
3. Cerita Bagian Seru: "Bagian favoritku adalah saat ...!"`,

  `Permainan Cepat! Ayo tebak bersama:
Menu mana di Scratch 3.0 untuk menyimpan proyek ke komputer — Pilihan A (File -> Save to your computer) atau Pilihan B (Tombol Stop merah)?`,

  `Kartu Contekan Latihan Presentasi Cilik:
Ajak anak-anak membaca 3 kartu cerita (Pembuka -> Nama Karya -> Cara Main & Favorit) secara berpasangan atau di depan cermin!`,

  `Tips Jagoan Pembicara Cilik:
BOLEH tersenyum dengan suara jelas & mengambil foto layar saat karakter beraksi seru.
JANGAN menutup wajah/berbicara terlalu pelan, atau lupa memberi nama file saat menyimpan proyek!`,

  `Misi Praktik Susun Galeri & Latihan Presentasi!
Klik "Ambil Foto Galeri" dan coba bacakan Kartu 1 sampai Kartu 3 di studio latihan bersama teman sebangku!`,

  `Hore! Kamu Kurator Galeri & Pembicara Cilik Hebat! 🎉🏅
Selamat meraih Lencana Master Portofolio & Presentasi Cilik menuju Pameran Wisuda di Pertemuan 52!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 51 — Galeri Karya Digitalku!',
  createdAt: '2026-11-16T16:44:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03SimpanProyek,
  Slide04PortofolioDigital,
  Slide05JurusPresentasi,
  Slide06AyoTebak,
  Slide07KartuCerita,
  Slide08TipsPresentasi,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

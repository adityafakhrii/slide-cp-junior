import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-27-bruk-mobil-memantul-saat-nabrak-tembok';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj27-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj27-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj27-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj27-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj27-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj27-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.85); }
  50% { box-shadow: 0 0 0 14px rgba(251, 191, 36, 0); }
}
@keyframes cpj27-bump-burst {
  0% { transform: scale(0.75) rotate(-8deg); opacity: 0.8; }
  50% { transform: scale(1.12) rotate(4deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
.cpj27-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj27-card-btn:hover {
  transform: translateY(-4px);
}
.cpj27-card-btn:active {
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

/** Gentle synthesized cartoon "BRUK!" bump thud for interactive bumper car demos */
function playBumpSound() {
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
    osc.frequency.setValueAtTime(195, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(68, ctx.currentTime + 0.14);
    gain.gain.setValueAtTime(0.32, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.17);
    setTimeout(() => {
      void ctx.close();
    }, 300);
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
          animation: live ? 'cpj27-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 27 • Bruk! Mobil Memantul Saat Nabrak Tembok!</span>
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
// Reusable Pertemuan 27 Visuals (Red Car, Brick Wall, City Road, Bump Blocks)
// ============================================================================

const RedCarSvg = ({ width = 140 }: { width?: number }) => (
  <svg width={width} height={Math.round(width * 0.62)} viewBox="0 0 160 100" fill="none">
    <ellipse cx="80" cy="91" rx="64" ry="7" fill="rgba(30,30,44,0.16)" />
    <path
      d="M28 48 L44 20 H106 L124 48 H144 C150 48 154 52 154 58 V74 C154 79 150 82 144 82 H16 C10 82 6 78 6 72 V56 C6 51 10 48 18 48 Z"
      fill={CORAL}
      stroke={CHARCOAL}
      strokeWidth={4.5}
      strokeLinejoin="round"
    />
    <path
      d="M48 26 H73 V47 H36 Z"
      fill={SKY_SOFT}
      stroke={CHARCOAL}
      strokeWidth={3.2}
      strokeLinejoin="round"
    />
    <path
      d="M82 26 H103 L116 47 H82 Z"
      fill={SKY_SOFT}
      stroke={CHARCOAL}
      strokeWidth={3.2}
      strokeLinejoin="round"
    />
    <rect x="136" y="55" width="14" height="10" rx="4" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
    <circle cx="44" cy="82" r="14" fill="#334155" stroke={CHARCOAL} strokeWidth={4} />
    <circle cx="44" cy="82" r="6" fill={WHITE} />
    <circle cx="118" cy="82" r="14" fill="#334155" stroke={CHARCOAL} strokeWidth={4} />
    <circle cx="118" cy="82" r="6" fill={WHITE} />
  </svg>
);

const BrickWallSvg = ({ width = 84, height = 112, ghost = false }: { width?: number; height?: number; ghost?: boolean }) => (
  <svg width={width} height={height} viewBox="0 0 90 120" fill="none" style={{ opacity: ghost ? 0.55 : 1 }}>
    <rect
      x="6"
      y="8"
      width="78"
      height="104"
      rx="10"
      fill={ghost ? '#FDA4AF' : '#DC2626'}
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeDasharray={ghost ? '7 5' : undefined}
    />
    <line x1="6" y1="34" x2="84" y2="34" stroke={WHITE} strokeWidth={3.2} />
    <line x1="6" y1="60" x2="84" y2="60" stroke={WHITE} strokeWidth={3.2} />
    <line x1="6" y1="86" x2="84" y2="86" stroke={WHITE} strokeWidth={3.2} />
    <line x1="45" y1="8" x2="45" y2="34" stroke={WHITE} strokeWidth={3.2} />
    <line x1="28" y1="34" x2="28" y2="60" stroke={WHITE} strokeWidth={3.2} />
    <line x1="62" y1="34" x2="62" y2="60" stroke={WHITE} strokeWidth={3.2} />
    <line x1="45" y1="60" x2="45" y2="86" stroke={WHITE} strokeWidth={3.2} />
    <line x1="28" y1="86" x2="28" y2="112" stroke={WHITE} strokeWidth={3.2} />
    <line x1="62" y1="86" x2="62" y2="112" stroke={WHITE} strokeWidth={3.2} />
  </svg>
);

const CityRoadBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 520 260" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="520" height="260" fill="#DBEAFE" />
    <circle cx="465" cy="38" r="22" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M62 46 C62 36, 78 32, 86 40 C94 30, 114 34, 114 46 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.4} />
    {/* City buildings */}
    <rect x="26" y="76" width="56" height="90" fill="#93C5FD" stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="94" y="56" width="64" height="110" fill="#A5B4FC" stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="170" y="88" width="52" height="78" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="332" y="70" width="62" height="96" fill="#A7F3D0" stroke={CHARCOAL} strokeWidth={2.6} />
    {/* Green grass strip */}
    <rect x="0" y="156" width="520" height="26" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={2.6} />
    {/* Asphalt city road */}
    <rect x="0" y="182" width="520" height="78" fill="#64748B" stroke={CHARCOAL} strokeWidth={2.8} />
    <line x1="16" y1="221" x2="504" y2="221" stroke={SUNNY} strokeWidth={5} strokeDasharray="24 18" strokeLinecap="round" />
  </svg>
);

const BumpBurstBadge = ({ label = 'BRUK!', size = 86 }: { label?: string; size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      position: 'relative',
      ...centerCol,
      animation: 'cpj27-bump-burst 0.55s ease-in-out infinite alternate',
    }}
  >
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}>
      <path
        d="M50 4 L60 26 L84 14 L74 38 L96 48 L74 60 L86 84 L62 74 L50 96 L38 74 L14 84 L26 60 L4 48 L26 38 L16 14 L40 26 Z"
        fill={SUNNY}
        stroke={CHARCOAL}
        strokeWidth={4}
        strokeLinejoin="round"
      />
    </svg>
    <span
      style={{
        position: 'relative',
        zIndex: 2,
        fontFamily: 'var(--osd-font-display)',
        fontSize: Math.round(size * 0.24),
        fontWeight: 700,
        color: CORAL,
      }}
    >
      {label}
    </span>
  </div>
);

const TicCatSvg = ({ size = 135, waving = false }: { size?: number; waving?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <ellipse cx="70" cy="126" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
    <path d="M96 98 C118 96, 126 76, 114 66 C106 60, 100 68, 104 75 C106 80, 100 88, 92 88" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
    <ellipse cx="56" cy="118" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="84" cy="118" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
    <ellipse cx="70" cy="95" rx="27" ry="24" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="70" cy="97" rx="16" ry="15" fill={SUNNY_SOFT} />
    <path d={waving ? 'M44 82 C26 74, 22 58, 30 52 C37 47, 45 58, 46 72' : 'M45 86 C32 90, 32 104, 42 104 C48 104, 50 96, 48 88'} fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <path d="M94 86 C107 90, 107 104, 97 104 C91 104, 89 96, 91 88" fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.8} strokeLinecap="round" />
    <path d="M38 50 L36 18 L60 36 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    <path d="M102 50 L104 18 L80 36 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
    <ellipse cx="70" cy="57" rx="34" ry="29" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
    <ellipse cx="70" cy="66" rx="22" ry="15" fill={WHITE} />
    <circle cx="57" cy="53" r="5" fill={CHARCOAL} />
    <circle cx="83" cy="53" r="5" fill={CHARCOAL} />
    <circle cx="58.5" cy="51.2" r="1.8" fill={WHITE} />
    <circle cx="84.5" cy="51.2" r="1.8" fill={WHITE} />
    <polygon points="66,60 74,60 70,65" fill={CORAL} />
    <path d="M62 67 Q70 74 78 67" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" fill="none" />
  </svg>
);

type BumpBlockKind =
  | 'start-flag'
  | 'start-bump'
  | 'start-tap'
  | 'move-right'
  | 'move-left'
  | 'sound-bruk'
  | 'repeat-forever';

const ScratchJrBlock = ({
  kind,
  num = 1,
  scale = 1,
  activeGlow = false,
}: {
  kind: BumpBlockKind;
  num?: number;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-flag' || kind === 'start-bump' || kind === 'start-tap';
  const isEndCap = kind === 'repeat-forever';
  const fill = isTrigger
    ? SUNNY
    : kind === 'move-right' || kind === 'move-left'
      ? SKY
      : kind === 'sound-bruk'
        ? TEAL
        : CORAL;

  const w = Math.round(134 * scale);
  const h = Math.round(118 * scale);

  const pathData = isTrigger
    ? 'M30 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H24 C14 106 8 98 8 88 V38 C8 25 18 16 30 16 Z'
    : isEndCap
      ? 'M14 16 H104 C118 16 128 26 128 40 V82 C128 96 118 106 104 106 H14 V74 C24 74 24 48 14 48 V16 Z'
      : 'M14 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H14 V74 C24 74 24 48 14 48 V16 Z';

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter: activeGlow ? 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.95))' : undefined,
        transform: activeGlow ? 'scale(1.07)' : 'scale(1)',
        transition: 'transform 180ms ease, filter 180ms ease',
      }}
    >
      <svg width={w} height={h} viewBox="0 0 140 120">
        <path d={pathData} fill={fill} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />

        {kind === 'start-flag' && (
          <>
            <line x1="48" y1="30" x2="48" y2="90" stroke={CHARCOAL} strokeWidth={5.5} strokeLinecap="round" />
            <path d="M50 33 C68 27, 84 40, 98 35 V62 C84 68, 68 54, 50 61 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
          </>
        )}

        {kind === 'start-bump' && (
          <>
            {/* Left Person touching Right Person */}
            <circle cx="48" cy="43" r="10" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} />
            <path d="M31 82 C31 61, 65 61, 65 82 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <circle cx="86" cy="43" r="10" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={2.8} />
            <path d="M69 82 C69 61, 103 61, 103 82 Z" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <polygon points="67,54 73,63 61,63" fill={CORAL} />
          </>
        )}

        {kind === 'start-tap' && (
          <>
            <circle cx="56" cy="44" r="10.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
            <path d="M38 80 C38 60, 74 60, 74 80 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} strokeLinejoin="round" />
            <path d="M72 58 L92 73 L85 77 L95 90 L87 94 L77 81 L71 86 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.6} strokeLinejoin="round" />
          </>
        )}

        {kind === 'move-right' && (
          <path d="M36 52 H72 V37 L102 60 L72 83 V68 H36 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {kind === 'move-left' && (
          <path d="M102 52 H66 V37 L36 60 L66 83 V68 H102 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {kind === 'sound-bruk' && (
          <>
            <path d="M32 52 H46 L66 35 V83 L46 66 H32 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <path d="M74 46 Q83 59 74 72" fill="none" stroke={SUNNY} strokeWidth={4.5} strokeLinecap="round" />
            <path d="M84 37 Q98 59 84 81" fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
          </>
        )}

        {kind === 'repeat-forever' && (
          <>
            <path d="M44 55 A24 24 0 0 1 92 43 M92 33 V48 H77" fill="none" stroke={WHITE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M96 65 A24 24 0 0 1 48 77 M48 87 V72 H63" fill="none" stroke={SUNNY_SOFT} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
      </svg>

      {(kind === 'move-right' || kind === 'move-left') && (
        <div
          style={{
            marginTop: Math.round(-16 * scale),
            minWidth: Math.round(42 * scale),
            height: Math.round(28 * scale),
            borderRadius: Math.round(9 * scale),
            background: WHITE,
            border: `2.6px solid ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: Math.round(17 * scale),
            fontWeight: 700,
            ...centerCol,
            padding: '0 6px',
            zIndex: 2,
          }}
        >
          {num}
        </div>
      )}
    </div>
  );
};

/** Authentic ScratchJr Tablet Interface for Playable Bumper-Car Simulation */
const AuthenticScratchJrBumpUI = ({
  carPhase,
  onTriggerRun,
  onReset,
  highlightAdd = false,
  width = 880,
  height = 540,
}: {
  carPhase: 'idle' | 'driving' | 'bumped' | 'bounced';
  onTriggerRun?: () => void;
  onReset?: () => void;
  highlightAdd?: boolean;
  width?: number | string;
  height?: number | string;
}) => {
  const carLeft =
    carPhase === 'idle'
      ? '12%'
      : carPhase === 'driving' || carPhase === 'bumped'
        ? '49%'
        : '26%';

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
      {/* Top Toolbar */}
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
            ScratchJr
          </span>
        </div>

        <div style={{ ...row, gap: 7 }}>
          <div style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="fullscreen" size={22} />
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
          <button
            type="button"
            onClick={onReset}
            className="cpj27-card-btn"
            title="Reset Mobil"
            style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol, padding: 0 }}
          >
            <JuniorIcon name="reset" size={22} />
          </button>
          <button
            type="button"
            onClick={onTriggerRun}
            className="cpj27-card-btn"
            title="Bendera Hijau"
            style={{ width: 46, height: 36, borderRadius: 10, background: TEAL_SOFT, border: `2.5px solid ${TEAL}`, ...centerCol, padding: 0 }}
          >
            <JuniorIcon name="flag" size={24} />
          </button>
        </div>

        <div style={{ padding: '4px 12px', borderRadius: 10, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 13, fontWeight: 700 }}>
          {carPhase === 'bumped' ? 'BRUK!' : carPhase === 'bounced' ? 'Memantul!' : 'Siap Jalan'}
        </div>
      </div>

      {/* Middle 3-Column Row */}
      <div style={{ flex: 1, display: 'flex', gap: 10, minHeight: 0 }}>
        {/* Left Characters Sidebar */}
        <div style={{ width: 96, borderRadius: 16, background: '#E2E8F0', border: `2.5px solid ${CHARCOAL}`, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: '100%', height: 54, borderRadius: 12, background: WHITE, border: `3px solid ${SUNNY}`, ...centerCol, position: 'relative' }}>
            <RedCarSvg width={66} />
            <div style={{ position: 'absolute', right: -4, top: -4, width: 18, height: 18, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
              <JuniorIcon name="paintbrush" size={10} />
            </div>
          </div>
          <div style={{ width: '100%', height: 54, borderRadius: 12, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
            <BrickWallSvg width={36} height={42} />
          </div>
          <div
            style={{
              marginTop: 'auto',
              padding: 4,
              borderRadius: 99,
              background: highlightAdd ? SUNNY : 'transparent',
              border: highlightAdd ? `2.5px solid ${CHARCOAL}` : 'none',
            }}
          >
            <JuniorIcon name="plus-circle" size={26} />
          </div>
        </div>

        {/* Center City Road Stage */}
        <div style={{ flex: 1, borderRadius: 18, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
          <CityRoadBackdropSvg />
          {/* Red Car */}
          <div
            style={{
              position: 'absolute',
              left: carLeft,
              bottom: '10%',
              transition: 'left 480ms cubic-bezier(0.22, 1, 0.36, 1)',
              zIndex: 3,
            }}
          >
            <RedCarSvg width={128} />
          </div>
          {/* Bump Burst */}
          {carPhase === 'bumped' && (
            <div style={{ position: 'absolute', left: '66%', bottom: '20%', zIndex: 4 }}>
              <BumpBurstBadge label="BRUK!" size={78} />
            </div>
          )}
          {/* Brick Wall */}
          <div style={{ position: 'absolute', right: '8%', bottom: '9%', zIndex: 2 }}>
            <BrickWallSvg width={72} height={96} />
          </div>
        </div>

        {/* Right Page Thumbnail */}
        <div style={{ width: 90, borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: '100%', height: 58, borderRadius: 12, border: `2.5px solid ${SUNNY}`, overflow: 'hidden', position: 'relative' }}>
            <CityRoadBackdropSvg />
            <span style={{ position: 'absolute', right: 3, top: 3, width: 20, height: 20, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 12, fontWeight: 700, ...centerCol }}>
              1
            </span>
          </div>
          <JuniorIcon name="plus-circle" size={26} />
        </div>
      </div>

      {/* Bottom Coding Area */}
      <div
        style={{
          height: 132,
          borderRadius: 16,
          background: WHITE,
          backgroundImage: 'radial-gradient(#CBD5E1 1.4px, transparent 1.4px)',
          backgroundSize: '18px 18px',
          border: `2.5px solid ${CHARCOAL}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div style={{ height: 34, background: '#E0F2FE', borderBottom: `2px solid ${CHARCOAL}`, padding: '0 12px', ...row, justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 8 }}>
            {(['dot-yellow', 'dot-blue', 'dot-purple', 'dot-green', 'dot-orange', 'dot-red'] as JuniorIconName[]).map((d) => (
              <JuniorIcon key={d} name={d} size={20} />
            ))}
          </div>
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 13, fontWeight: 700, color: MUTED }}>
            Kode Mobil: Maju Terus + Memantul saat Nabrak!
          </span>
        </div>

        <div style={{ flex: 1, padding: '6px 14px', ...row, justifyContent: 'space-around', alignItems: 'flex-start', overflow: 'hidden' }}>
          {/* Script 1: Melaju Terus */}
          <div style={{ ...row, alignItems: 'flex-start' }}>
            <ScratchJrBlock kind="start-flag" scale={0.68} activeGlow={carPhase === 'driving'} />
            <div style={{ marginLeft: -10 }}>
              <ScratchJrBlock kind="move-right" num={1} scale={0.68} activeGlow={carPhase === 'driving'} />
            </div>
            <div style={{ marginLeft: -10 }}>
              <ScratchJrBlock kind="repeat-forever" scale={0.68} activeGlow={carPhase === 'driving'} />
            </div>
          </div>

          <div style={{ width: 2.5, height: '82%', background: '#CBD5E1' }} />

          {/* Script 2: Tabrakan Memantul */}
          <div style={{ ...row, alignItems: 'flex-start' }}>
            <ScratchJrBlock kind="start-bump" scale={0.68} activeGlow={carPhase === 'bumped'} />
            <div style={{ marginLeft: -10 }}>
              <ScratchJrBlock kind="move-left" num={3} scale={0.68} activeGlow={carPhase === 'bounced'} />
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
  const [phase, setPhase] = useState<'idle' | 'driving' | 'bumped' | 'bounced'>('idle');

  useEffect(() => {
    if (!live) {
      setPhase('idle');
      return;
    }
    const t1 = setTimeout(() => setPhase('driving'), 350);
    const t2 = setTimeout(() => setPhase('bumped'), 900);
    const t3 = setTimeout(() => setPhase('bounced'), 1450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [live]);

  const handleReplay = () => {
    setPhase('driving');
    setTimeout(() => {
      playBumpSound();
      setPhase('bumped');
    }, 450);
    setTimeout(() => setPhase('bounced'), 950);
  };

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 27" accentDot={SUNNY}>
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
          <JuniorIcon name="start-bump" size={24} />
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          <Highlight>Bruk!</Highlight> Mobil Memantul Saat
          <br />
          <Highlight color="#FDE68A">Nabrak Tembok!</Highlight>
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
          Mengenal Pemicu Tabrakan (<em>Start on Bump</em>)
        </p>

        {/* Quick Pill Highlights */}
        <div style={{ ...row, gap: 18 }}>
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
            <JuniorIcon name="start-bump" size={28} />
            <span>Start on Bump</span>
          </div>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: CORAL,
              color: WHITE,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="car-red" size={28} />
            <span>Nabrak = Memantul!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Authentic ScratchJr Bumper Car UI + Biko */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #FEF9C3 0%, #EFF6FF 55%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SUNNY}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 140, zIndex: 2 }}>
          <AuthenticScratchJrBumpUI
            carPhase={phase}
            onTriggerRun={handleReplay}
            onReset={() => setPhase('idle')}
            width={590}
            height={425}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: -18,
            bottom: 30,
            zIndex: 3,
            animation: live ? 'cpj27-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="car-red" size={24} />}
            speechBubble={phase === 'bumped' ? 'BRUK!' : 'Klik Bendera Hijau!'}
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
    <JuniorFrame badge="MISI HARI INI" accentDot={SUNNY}>
      <SlideTitle>
        Apa Misi Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Pemicu Tabrakan • Pertemuan 27"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu 1 (Kuning) */}
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
              MISI 1
            </div>

            <div style={{ width: 255, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...centerCol }}>
              <ScratchJrBlock kind="start-bump" scale={1.35} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.25 }}>
              Kenali Blok <span style={{ color: '#B45309' }}>Tabrakan</span> (<em>Start on Bump</em>)
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

            <div style={{ width: 255, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 10 }}>
              <RedCarSvg width={115} />
              <JuniorIcon name="arrow-left" size={44} />
              <BrickWallSvg width={54} height={74} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.25 }}>
              Bikin <span style={{ color: '#047857' }}>Mobil Memantul</span> Saat Nabrak!
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj27-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="start-bump" size={24} />}
          speechBubble="Main mobil senggol!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Kenalan Sama Blok Kuning Tabrakan!
// ============================================================================
const Slide03BlokTabrakan: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="BLOK KUNING BARU" accentDot={SUNNY}>
      <SlideTitle>
        Ini Namanya Blok <Highlight>Tabrakan!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Giant Start on Bump Block + Biko pointing */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Blok Pemicu Tabrakan (Start on Bump)"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
          <div
            style={{
              width: 470,
              height: 360,
              borderRadius: 32,
              background: CREAM,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              ...centerCol,
              position: 'relative',
            }}
          >
            <ScratchJrBlock kind="start-bump" scale={2.4} activeGlow />
            <div
              style={{
                position: 'absolute',
                right: 20,
                top: 18,
                padding: '6px 16px',
                borderRadius: 99,
                background: CORAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 19,
                fontWeight: 700,
              }}
            >
              Titik Sentuh!
            </div>
          </div>

          <div style={{ ...row, gap: 22, alignItems: 'center' }}>
            <div style={{ animation: live ? 'cpj27-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot
                pose="point-left"
                width={175}
                badgeIcon={<JuniorIcon name="start-bump" size={20} />}
                speechBubble="Dua karakter ketemu!"
              />
            </div>
            <div style={{ padding: '16px 24px', borderRadius: 20, background: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>
              Start on Bump
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
        headerLabel="Kapan Blok Ini Bekerja?"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="start-bump" bgColor={SUNNY_SOFT} fontSize={33}>
              Kode jalan saat <strong>2 Karakter Bersentuhan</strong>
            </BulletRow>
            <BulletRow icon="car-red" bgColor={CORAL_SOFT} fontSize={33}>
              Seperti main <strong>Mobil Senggol</strong> (<em>Bumper Car</em>)!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Tidak perlu diklik dan tidak menunggu bendera — cukup <strong>saling menyentuh</strong> di panggung, kode langsung aktif!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Langkah #1: Siapkan Mobil & Karakter Tembok!
// ============================================================================
const Slide04SiapkanPanggung: Page = () => {
  return (
    <JuniorFrame badge="PERSIAPAN PANGGUNG" accentDot={SKY}>
      <SlideTitle>
        Siapkan <Highlight>Mobil &amp; Tembok!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Authentic ScratchJr Road Stage with Car + Brick Wall */}
      <div style={{ ...abs(X0, 235, 860, 720) }}>
        <AuthenticScratchJrBumpUI carPhase="idle" highlightAdd width={860} height={720} />
      </div>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={995}
        top={235}
        width={825}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Langkah Menambah Karakter"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="car-red" bgColor={CORAL_SOFT} fontSize={33}>
              Karakter 1: <strong>Mobil</strong> di sisi kiri
            </BulletRow>
            <BulletRow icon="brick-wall" bgColor={SUNNY_SOFT} fontSize={33}>
              Karakter 2: Tambah <strong>Tembok</strong> lewat tombol <strong>+</strong>!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: TEAL_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="landscape" size={42} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Pilih latar <strong>Jalan Raya Kota</strong> lalu taruh Mobil dan Tembok sejajar di atas aspal jalan!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Rahasia Mobil: 2 Kode dalam 1 Mobil!
// ============================================================================
const Slide05DuaKodeMobil: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="RAHASIA PEMBUAT GAME" accentDot={SUNNY}>
      <SlideTitle>
        <Highlight>2 Kode</Highlight> dalam 1 Mobil!
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Area Kode Milik Karakter Mobil (Ditaruh Berdampingan!)"
        padding={34}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu Kiri — Kode Melaju */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${SKY}`,
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 8 }}>
              <JuniorIcon name="arrow-right" size={24} />
              <span>Kode Melaju</span>
            </div>

            <div style={{ ...row, alignItems: 'flex-start', justifyContent: 'center' }}>
              <ScratchJrBlock kind="start-flag" scale={1.15} />
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="move-right" num={1} scale={1.15} />
              </div>
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="repeat-forever" scale={1.15} />
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: CHARCOAL, lineHeight: 1.25 }}>
              Bikin mobil <span style={{ color: '#1D4ED8' }}>Melaju Terus</span>
            </div>
          </div>

          {/* Kartu Kanan — Kode Memantul */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${SUNNY}`,
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 8 }}>
              <JuniorIcon name="arrow-left" size={24} />
              <span>Kode Memantul</span>
            </div>

            <div style={{ ...row, alignItems: 'flex-start', justifyContent: 'center' }}>
              <ScratchJrBlock kind="start-bump" scale={1.25} activeGlow />
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="move-left" num={3} scale={1.25} />
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: CHARCOAL, lineHeight: 1.25 }}>
              Nabrak tembok -&gt; <span style={{ color: '#C2410C' }}>Langsung Memantul!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1475, 345, 360, 560),
          ...centerCol,
          animation: live ? 'cpj27-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={335}
          badgeIcon={<JuniorIcon name="car-red" size={22} />}
          speechBubble="Keduanya di Mobil!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Blok Apa Saat Mobil Nabrak?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1600} top={118} size={48}>
        Blok Mana Biar Mobil <Highlight>Memantul</Highlight> Saat Nabrak?
      </SlideTitle>

      {/* Top Visual Equation Strip */}
      <div
        style={{
          ...abs(190, 200, 1540, 128),
          borderRadius: 26,
          background: WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 6px 0 ${CHARCOAL}`,
          padding: '0 34px',
          ...row,
          justifyContent: 'space-around',
        }}
      >
        <div style={{ ...row, gap: 12 }}>
          <RedCarSvg width={108} />
          <BumpBurstBadge label="BRUK!" size={72} />
          <BrickWallSvg width={52} height={68} />
        </div>
        <JuniorIcon name="arrow-right" size={44} />
        <div style={{ ...row, alignItems: 'flex-start', gap: 10 }}>
          <div
            style={{
              width: 108,
              height: 92,
              borderRadius: 20,
              background: picked === 'A' ? TEAL_SOFT : SUNNY_SOFT,
              border: `3.5px dashed ${picked === 'A' ? TEAL : CHARCOAL}`,
              ...centerCol,
            }}
          >
            {picked === 'A' ? (
              <ScratchJrBlock kind="start-bump" scale={0.76} />
            ) : (
              <JuniorIcon name="question" size={44} />
            )}
          </div>
          <ScratchJrBlock kind="move-left" num={3} scale={0.78} />
        </div>
      </div>

      {/* Interactive Choice Cards */}
      <div style={{ ...abs(190, 355, 1540, 395), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Start on Bump) */}
        <button
          type="button"
          onClick={() => setPicked('A')}
          className="cpj27-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'A' ? TEAL_SOFT : WHITE,
            border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'A' ? TEAL : CHARCOAL}`,
            padding: 28,
            ...centerCol,
            gap: 14,
            position: 'relative',
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN A
          </div>

          <div style={{ marginTop: 12 }}>
            <ScratchJrBlock kind="start-bump" scale={1.45} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Blok Tabrakan
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Blok Tabrakan aktif saat menyentuh tembok!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Start on Tap) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj27-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'B' ? CORAL_SOFT : WHITE,
            border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'B' ? CORAL : CHARCOAL}`,
            padding: 28,
            ...centerCol,
            gap: 14,
            position: 'relative',
            animation: picked === 'B' ? 'cpj27-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 12 }}>
            <ScratchJrBlock kind="start-tap" scale={1.45} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Sentuh Karakter
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Sentuh Karakter menunggu klik jari, bukan tabrakan!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 765, 1540, 235), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj27-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={205}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Hebat!' : 'Ayo tebak!'}
          />
        </div>
        <div style={{ padding: '20px 34px', borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...row, gap: 18 }}>
          <div style={{ width: 62, height: 62, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="question" size={34} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, color: CHARCOAL }}>
            Tunjuk blok yang benar di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Tambah Seru: Bunyi "Bruk!" Saat Nabrak!
// ============================================================================
const Slide07EfekSuara: Page = () => {
  const [bumpDemo, setBumpDemo] = useState(false);

  const handleTestBump = () => {
    playBumpSound();
    setBumpDemo(true);
    setTimeout(() => setBumpDemo(false), 1100);
  };

  return (
    <JuniorFrame badge="JURUS EFEK SERU" accentDot={TEAL}>
      <SlideTitle>
        Tambah <Highlight>Suara</Highlight> Saat Tabrakan!
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={230}
        width={1720}
        height={735}
        titleBarColor={CREAM}
        headerLabel='Urutan Kode Tabrakan + Suara "Bruk!" + Memantul'
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top 3 Sequential Step Cards */}
          <div style={{ display: 'flex', gap: 28 }}>
            <div style={{ flex: 1, borderRadius: 22, background: SUNNY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${SUNNY}`, padding: '22px 24px', ...row, gap: 18 }}>
              <div style={{ width: 58, height: 58, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
                1
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="start-bump" size={30} style={{ marginRight: 8 }} />
                Pasang <strong>Blok Tabrakan</strong> di depan
              </div>
            </div>

            <div style={{ flex: 1, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${TEAL}`, padding: '22px 24px', ...row, gap: 18 }}>
              <div style={{ width: 58, height: 58, borderRadius: 18, background: TEAL, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
                2
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="mic" size={30} style={{ marginRight: 8 }} />
                Sambung <strong>Suara &ldquo;Bruk!&rdquo;</strong> (atau <em>&ldquo;Pop!&rdquo;</em>)
              </div>
            </div>

            <div style={{ flex: 1, borderRadius: 22, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${SKY}`, padding: '22px 24px', ...row, gap: 18 }}>
              <div style={{ width: 58, height: 58, borderRadius: 18, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
                3
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="arrow-left" size={30} style={{ marginRight: 8 }} />
                Sambung <strong>Mundur 3</strong> -&gt; Memantul!
              </div>
            </div>
          </div>

          {/* Snapped Chain + Interactive Clickable Bumper Test */}
          <div style={{ height: 410, borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, padding: '26px 40px', ...row, justifyContent: 'space-around', gap: 36 }}>
            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-bump" scale={1.55} activeGlow={bumpDemo} />
              <div style={{ marginLeft: -22 }}>
                <ScratchJrBlock kind="sound-bruk" scale={1.55} activeGlow={bumpDemo} />
              </div>
              <div style={{ marginLeft: -22 }}>
                <ScratchJrBlock kind="move-left" num={3} scale={1.55} activeGlow={bumpDemo} />
              </div>
            </div>

            <button
              type="button"
              onClick={handleTestBump}
              className="cpj27-card-btn"
              style={{
                width: 340,
                height: 310,
                borderRadius: 32,
                background: SUNNY_SOFT,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 7px 0 ${CHARCOAL}`,
                ...centerCol,
                gap: 16,
                position: 'relative',
              }}
            >
              <div style={{ ...row, alignItems: 'center', gap: 10 }}>
                <div style={{ transform: bumpDemo ? 'translateX(-22px)' : 'translateX(12px)', transition: 'transform 260ms ease' }}>
                  <RedCarSvg width={135} />
                </div>
                <BrickWallSvg width={68} height={90} />
              </div>
              {bumpDemo && (
                <div style={{ position: 'absolute', top: 18, right: 24 }}>
                  <BumpBurstBadge label="BRUK!" size={82} />
                </div>
              )}
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: CHARCOAL }}>
                Klik untuk Bunyi &ldquo;BRUK!&rdquo;
              </span>
            </button>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Pemicu Tabrakan (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsTabrakan: Page = () => {
  return (
    <JuniorFrame badge="TIPS JAGOAN KODE" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Mobil <Highlight>Bisa Memantul!</Highlight>
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
            <BulletRow icon="brick-wall" bgColor={TEAL_SOFT} fontSize={30}>
              Buat tembok sebagai <strong>Karakter (+)</strong>
            </BulletRow>
            <BulletRow icon="ruler" bgColor={SUNNY_SOFT} fontSize={30}>
              Sejajarkan tinggi <strong>Mobil &amp; Tembok</strong>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, border: `3.5px solid ${TEAL}`, position: 'relative', overflow: 'hidden' }}>
            <CityRoadBackdropSvg />
            <div style={{ position: 'absolute', inset: 0, ...row, justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 18 }}>
              <RedCarSvg width={150} />
              <BumpBurstBadge label="BRUK!" size={72} />
              <BrickWallSvg width={78} height={102} />
              <JuniorIcon name="check" size={56} />
            </div>
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
            <BulletRow icon="landscape" bgColor={CORAL_SOFT} fontSize={30}>
              Gambar tembok di <strong>Latar Belakang</strong> saja
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={30}>
              Tembok terlalu tinggi tidak <strong>Tersentuh Mobil</strong>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, position: 'relative', overflow: 'hidden', ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
            <div style={{ position: 'relative', ...row, alignItems: 'flex-end', gap: 20 }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <RedCarSvg width={150} />
              </div>
              <div style={{ marginLeft: -55 }}>
                <BrickWallSvg width={78} height={102} ghost />
              </div>
            </div>
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Mobil Bumper Car!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [phase, setPhase] = useState<'idle' | 'driving' | 'bumped' | 'bounced'>('idle');

  const handleRunBumperCar = () => {
    setPhase('driving');
    setTimeout(() => {
      playBumpSound();
      setPhase('bumped');
    }, 450);
    setTimeout(() => {
      setPhase('bounced');
    }, 950);
  };

  return (
    <JuniorFrame badge="AYO BUAT & MAIN!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Mobil Memantul!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'car-red' as JuniorIconName,
            text: (
              <>
                Tambah karakter <strong>Mobil</strong> &amp; <strong>Tembok</strong> di jalan raya
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
                Pasang <strong>Kode Maju Terus</strong> &amp; <strong>Kode Tabrakan</strong>
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
                Klik <strong>Bendera Hijau!</strong> Lihat mobil memantul!
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
            <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.24 }}>
              <JuniorIcon name={item.icon} size={26} style={{ marginRight: 8 }} />
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Playable Authentic ScratchJr Bumper-Car Workspace */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratchJrBumpUI
          carPhase={phase}
          onTriggerRun={handleRunBumperCar}
          onReset={() => setPhase('idle')}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Run Bumper Car Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 18 }}>
        <div style={{ animation: live ? 'cpj27-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={345}
            badgeIcon={<JuniorIcon name="start-bump" size={24} />}
            speechBubble={phase === 'bumped' ? 'BRUK!' : phase === 'bounced' ? 'Memantul!' : 'Ayo Jalankan!'}
          />
        </div>
        <button
          type="button"
          onClick={handleRunBumperCar}
          className="cpj27-card-btn"
          style={{
            padding: '14px 26px',
            borderRadius: 20,
            background: TEAL,
            color: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 6px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 25,
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
// SLIDE 10 — Lencana Juara Pertemuan 27 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj27-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj27-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="car-red" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj27-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={56}>
        Hore! Kamu <Highlight>Master Pemicu Tabrakan!</Highlight>{' '}
        <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 27"
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
          {/* Bespoke Golden Start on Bump + Racing Car Medal SVG */}
          <div style={{ animation: live ? 'cpj27-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Two touching mini stars */}
              <polygon points="88,68 94,80 107,82 97,91 100,104 88,98 76,104 79,91 69,82 82,80" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.5} />
              <polygon points="152,68 158,80 171,82 161,91 164,104 152,98 140,104 143,91 133,82 146,80" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={2.5} />
              {/* Cute Red Racing Car at center */}
              <rect x="74" y="108" width="92" height="28" rx="12" fill={CORAL} stroke={CHARCOAL} strokeWidth={3.8} />
              <path d="M90 108 L100 90 H138 L148 108 Z" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
              <circle cx="94" cy="138" r="10" fill="#334155" stroke={CHARCOAL} strokeWidth={3} />
              <circle cx="146" cy="138" r="10" fill="#334155" stroke={CHARCOAL} strokeWidth={3} />
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
            <span>Lencana Jagoan Start on Bump</span>
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
            Kamu sudah jago membuat interaksi{' '}
            <Highlight color="#D1FAE5">Tabrakan Antar-Karakter!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="start-bump" size={22} />}
            speechBubble="Master Tabrakan!"
          />
          <div style={{ animation: live ? 'cpj27-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <TicCatSvg size={185} waving />
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
  `Selamat datang di Pertemuan 27 — Bruk! Mobil Memantul Saat Nabrak Tembok! 🚗🧱
Hari ini anak-anak mengenal pemicu tabrakan Start on Bump seperti permainan mobil senggol!`,

  `Dua misi seru hari ini:
1. Mengenal blok kuning Tabrakan (Start on Bump).
2. Membuat Mobil melaju lalu memantul mundur otomatis saat menyentuh Tembok!`,

  `Kenalan sama Blok Kuning Tabrakan (Start on Bump)!
Blok bergambar dua karakter bersentuhan ini membuat kode langsung aktif saat dua karakter di panggung saling bertabrakan!`,

  `Persiapan Panggung ScratchJr:
Pilih latar jalan raya kota, lalu siapkan Karakter 1 (Mobil) dan tambah Karakter 2 (Tembok Bata) lewat tombol +. Pastikan sejajar di atas jalan!`,

  `Rahasia Mobil — 2 Kode dalam 1 Mobil:
Kode Melaju: Bendera Hijau -> Maju 1 -> Repeat Forever.
Kode Memantul: Blok Tabrakan (Start on Bump) -> Mundur 3! Keduanya dipasang sejajar di area kode Mobil.`,

  `Permainan Cepat! Ayo tebak bersama:
Blok mana biar Mobil memantul saat nabrak Tembok — Pilihan A (Blok Tabrakan) atau Pilihan B (Sentuh Karakter)?`,

  `Tambah Jurus Efek Seru!
Sambungkan Blok Tabrakan -> Suara "Bruk!" (atau Pop) -> Mundur 3! Klik demo mobil di slide untuk mendengar bunyi "BRUK!"`,

  `Tips Jagoan Pemicu Tabrakan:
BOLEH: Buat tembok sebagai Karakter (+), dan sejajarkan tingginya dengan Mobil.
JANGAN: Menggambar tembok hanya di Latar Belakang, atau menaruh tembok terlalu tinggi sehingga tidak tersentuh Mobil.`,

  `Misi Praktik Mobil Bumper Car!
1. Tambah Mobil & Tembok di jalan raya.
2. Pasang Kode Maju Terus & Kode Tabrakan sejajar.
3. Klik Bendera Hijau di layar atau di ScratchJr untuk melihat mobil memantul bolak-balik!`,

  `Hore! Kamu Master Pemicu Tabrakan! 🎉
Selamat meraih Lencana Jagoan Start on Bump di Pertemuan 27!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 27 — Bruk! Mobil Memantul Saat Nabrak Tembok!',
  createdAt: '2026-11-16T14:27:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BlokTabrakan,
  Slide04SiapkanPanggung,
  Slide05DuaKodeMobil,
  Slide06AyoTebak,
  Slide07EfekSuara,
  Slide08TipsTabrakan,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

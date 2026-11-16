import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-26-pop-tangkap-gelembung-sabun';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj26-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj26-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj26-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj26-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj26-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj26-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.85); }
  50% { box-shadow: 0 0 0 14px rgba(251, 191, 36, 0); }
}
@keyframes cpj26-bubble-rise {
  0% { transform: translateY(28px) scale(0.96); }
  50% { transform: translateY(-16px) scale(1.03); }
  100% { transform: translateY(28px) scale(0.96); }
}
.cpj26-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj26-card-btn:hover {
  transform: translateY(-4px);
}
.cpj26-card-btn:active {
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

/** Gentle synthesized bubble pop sound for interactive slides */
function playPopChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(340, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(920, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
    setTimeout(() => {
      void ctx.close();
    }, 250);
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
  accentDot = SKY,
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
          animation: live ? 'cpj26-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: SKY,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 26 • Pop! Tangkap Gelembung Sabun!</span>
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
// Reusable Pertemuan 26 Visuals (Soap Bubbles, Park Stage, Tic Cat, Blocks)
// ============================================================================

const SoapBubbleSvg = ({
  size = 95,
  color = SKY,
  popped = false,
}: {
  size?: number;
  color?: string;
  popped?: boolean;
}) => {
  if (popped) {
    return (
      <div
        style={{
          width: size,
          height: size,
          ...centerCol,
          fontFamily: 'var(--osd-font-display)',
          fontSize: Math.round(size * 0.28),
          fontWeight: 700,
          color: CORAL,
        }}
      >
        POP!
      </div>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 110 110" fill="none">
      <circle cx="55" cy="55" r="44" fill={color} fillOpacity={0.32} stroke={CHARCOAL} strokeWidth={3.8} />
      <circle cx="55" cy="55" r="38" stroke={WHITE} strokeWidth={2.5} opacity={0.85} />
      <path d="M32 38 Q42 22 60 25" fill="none" stroke={WHITE} strokeWidth={6} strokeLinecap="round" />
      <circle cx="29" cy="48" r="4" fill={WHITE} />
      <circle cx="77" cy="76" r="5" fill={SUNNY_SOFT} opacity={0.85} />
    </svg>
  );
};

const ParkGardenBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 480 260" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="480" height="260" fill="#DBEAFE" />
    <circle cx="422" cy="40" r="22" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M56 54 C56 44, 72 40, 80 48 C88 38, 110 42, 110 54 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.4} />
    <path d="M0 170 Q150 135 290 170 Q395 195 480 158 V260 H0 Z" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M0 200 Q180 182 480 198 V260 H0 Z" fill="#4ADE80" stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="52" y="114" width="18" height="68" rx="4" fill="#92400E" stroke={CHARCOAL} strokeWidth={2.8} />
    <circle cx="61" cy="96" r="34" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
  </svg>
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

type GameBlockKind = 'start-flag' | 'start-tap' | 'move-up' | 'sound-pop' | 'hide' | 'repeat-forever';

const ScratchJrBlock = ({
  kind,
  num = 1,
  scale = 1,
  activeGlow = false,
}: {
  kind: GameBlockKind;
  num?: number;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-flag' || kind === 'start-tap';
  const isEndCap = kind === 'repeat-forever';
  const fill = isTrigger
    ? SUNNY
    : kind === 'move-up'
      ? SKY
      : kind === 'sound-pop'
        ? TEAL
        : kind === 'hide'
          ? LAVENDER
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

        {kind === 'start-tap' && (
          <>
            <circle cx="56" cy="44" r="10.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
            <path d="M38 80 C38 60, 74 60, 74 80 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} strokeLinejoin="round" />
            <path d="M72 58 L92 73 L85 77 L95 90 L87 94 L77 81 L71 86 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.6} strokeLinejoin="round" />
          </>
        )}

        {kind === 'move-up' && (
          <path d="M62 88 V52 H47 L69 22 L91 52 H76 V88 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {kind === 'sound-pop' && (
          <>
            <path d="M32 52 H46 L66 35 V83 L46 66 H32 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <path d="M74 46 Q83 59 74 72" fill="none" stroke={SUNNY} strokeWidth={4.5} strokeLinecap="round" />
            <path d="M84 37 Q98 59 84 81" fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
          </>
        )}

        {kind === 'hide' && (
          <>
            <circle cx="69" cy="43" r="11" fill="rgba(255,255,255,0.22)" stroke={WHITE} strokeWidth={4} strokeDasharray="6 4.5" />
            <path d="M47 84 C47 61, 91 61, 91 84 Z" fill="rgba(255,255,255,0.22)" stroke={WHITE} strokeWidth={4} strokeDasharray="7 5" strokeLinejoin="round" />
          </>
        )}

        {kind === 'repeat-forever' && (
          <>
            <path d="M44 55 A24 24 0 0 1 92 43 M92 33 V48 H77" fill="none" stroke={WHITE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M96 65 A24 24 0 0 1 48 77 M48 87 V72 H63" fill="none" stroke={SUNNY_SOFT} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
      </svg>

      {kind === 'move-up' && (
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

/** Authentic ScratchJr Tablet Interface for Playable Bubble-Pop Game */
const AuthenticScratchJrGameUI = ({
  poppedIds,
  onPopBubble,
  onResetGame,
  rising = true,
  width = 880,
  height = 540,
}: {
  poppedIds: number[];
  onPopBubble: (id: number) => void;
  onResetGame: () => void;
  rising?: boolean;
  width?: number | string;
  height?: number | string;
}) => {
  const bubbles = [
    { id: 1, left: '16%', top: '34%', size: 88, color: SKY },
    { id: 2, left: '46%', top: '22%', size: 96, color: LAVENDER },
    { id: 3, left: '72%', top: '38%', size: 84, color: SUNNY },
  ];

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
            onClick={onResetGame}
            className="cpj26-card-btn"
            title="Reset Gelembung"
            style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol, padding: 0 }}
          >
            <JuniorIcon name="reset" size={22} />
          </button>
          <button
            type="button"
            onClick={onResetGame}
            className="cpj26-card-btn"
            title="Bendera Hijau"
            style={{ width: 46, height: 36, borderRadius: 10, background: TEAL_SOFT, border: `2.5px solid ${TEAL}`, ...centerCol, padding: 0 }}
          >
            <JuniorIcon name="flag" size={24} />
          </button>
        </div>

        <div style={{ padding: '4px 12px', borderRadius: 10, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 14, fontWeight: 700 }}>
          Skor: {poppedIds.length}/3
        </div>
      </div>

      {/* Middle 3-Column Row */}
      <div style={{ flex: 1, display: 'flex', gap: 10, minHeight: 0 }}>
        {/* Left Characters Sidebar */}
        <div style={{ width: 96, borderRadius: 16, background: '#E2E8F0', border: `2.5px solid ${CHARCOAL}`, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          {bubbles.map((b, i) => (
            <div key={b.id} style={{ width: '100%', height: 52, borderRadius: 12, background: WHITE, border: `${i === 0 ? 3 : 2}px solid ${i === 0 ? SUNNY : CHARCOAL}`, ...centerCol, position: 'relative' }}>
              <SoapBubbleSvg size={40} color={b.color} />
              {i === 0 && (
                <div style={{ position: 'absolute', right: -4, top: -4, width: 18, height: 18, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, ...centerCol }}>
                  <JuniorIcon name="paintbrush" size={10} />
                </div>
              )}
            </div>
          ))}
          <div style={{ marginTop: 'auto', opacity: 0.85 }}>
            <JuniorIcon name="plus-circle" size={26} />
          </div>
        </div>

        {/* Center Playable Bubble Game Stage */}
        <div style={{ flex: 1, borderRadius: 18, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
          <ParkGardenBackdropSvg />
          {bubbles.map((b, idx) => {
            const isPopped = poppedIds.includes(b.id);
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => onPopBubble(b.id)}
                className="cpj26-card-btn"
                style={{
                  position: 'absolute',
                  left: b.left,
                  top: b.top,
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  animation: rising && !isPopped ? `cpj26-bubble-rise ${2.8 + idx * 0.4}s ease-in-out infinite` : undefined,
                }}
              >
                <SoapBubbleSvg size={b.size} color={b.color} popped={isPopped} />
              </button>
            );
          })}
        </div>

        {/* Right Page Thumbnail */}
        <div style={{ width: 90, borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: '100%', height: 58, borderRadius: 12, border: `2.5px solid ${SUNNY}`, overflow: 'hidden', position: 'relative' }}>
            <ParkGardenBackdropSvg />
            <span style={{ position: 'absolute', right: 3, top: 3, width: 20, height: 20, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 12, fontWeight: 700, ...centerCol }}>
              1
            </span>
          </div>
          <JuniorIcon name="plus-circle" size={26} />
        </div>
      </div>

      {/* Bottom Coding Area showing BOTH Parallel Scripts side-by-side */}
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
            2 Kode Paralel dalam 1 Gelembung!
          </span>
        </div>

        <div style={{ flex: 1, padding: '6px 14px', ...row, justifyContent: 'space-around', alignItems: 'flex-start', overflow: 'hidden' }}>
          {/* Script 1: Terbang */}
          <div style={{ ...row, alignItems: 'flex-start' }}>
            <ScratchJrBlock kind="start-flag" scale={0.68} />
            <div style={{ marginLeft: -10 }}>
              <ScratchJrBlock kind="move-up" num={1} scale={0.68} />
            </div>
            <div style={{ marginLeft: -10 }}>
              <ScratchJrBlock kind="repeat-forever" scale={0.68} />
            </div>
          </div>

          <div style={{ width: 2.5, height: '82%', background: '#CBD5E1' }} />

          {/* Script 2: Klik Pecah */}
          <div style={{ ...row, alignItems: 'flex-start' }}>
            <ScratchJrBlock kind="start-tap" scale={0.68} />
            <div style={{ marginLeft: -10 }}>
              <ScratchJrBlock kind="sound-pop" scale={0.68} />
            </div>
            <div style={{ marginLeft: -10 }}>
              <ScratchJrBlock kind="hide" scale={0.68} />
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
  const [popped, setPopped] = useState<number[]>([]);

  const handlePop = (id: number) => {
    playPopChime();
    setPopped((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 26" accentDot={SKY}>
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
          <JuniorIcon name="gamepad" size={24} />
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          <Highlight>Pop!</Highlight> Tangkap
          <br />
          <Highlight color="#DBEAFE">Gelembung Sabun!</Highlight>
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
          Membuat Game Ketangkasan Klik Pertamaku
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
            <JuniorIcon name="bubble" size={28} />
            <span>Terbang Terus!</span>
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
            <JuniorIcon name="tap" size={28} />
            <span>Klik = &ldquo;POP!&rdquo;</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Playable Authentic ScratchJr Bubble Game + Biko */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #EFF6FF 0%, #F3EEFF 52%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SKY}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 140, zIndex: 2 }}>
          <AuthenticScratchJrGameUI
            poppedIds={popped}
            onPopBubble={handlePop}
            onResetGame={() => setPopped([])}
            rising={live}
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
            animation: live ? 'cpj26-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="bubble" size={24} />}
            speechBubble={popped.length > 0 ? 'POP!' : 'Klik gelembung!'}
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
        headerLabel="Misi Game Ketangkasan • Pertemuan 26"
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

            <div style={{ width: 255, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 14 }}>
              <SoapBubbleSvg size={115} color={SKY} />
              <JuniorIcon name="infinity" size={62} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Bikin <span style={{ color: '#1D4ED8' }}>Gelembung Terbang</span> Terus
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

            <div style={{ width: 255, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 14 }}>
              <JuniorIcon name="tap" size={72} />
              <div style={{ padding: '12px 20px', borderRadius: 99, background: SUNNY, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
                POP!
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Tangkap Gelembung Pakai <span style={{ color: '#047857' }}>Klik!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj26-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="gamepad" size={24} />}
          speechBubble="Game Pertamaku!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Langkah #1: Gambar Gelembung Sabun!
// ============================================================================
const Slide03GambarGelembung: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="PERSIAPAN GAME" accentDot={SKY}>
      <SlideTitle>
        Gambar <Highlight>Gelembung Sabun!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Paint Editor with Circle Tool Glowing + Shiny Bubble */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Paint Editor — Menggambar Gelembung Sabun"
        padding={28}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ flex: 1, display: 'flex', gap: 20 }}>
            {/* Left Shape Tools with Circle Highlighted */}
            <div style={{ width: 98, borderRadius: 20, background: CREAM, border: `3px solid ${CHARCOAL}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', padding: '12px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, ...centerCol }}>
                <JuniorIcon name="pencil" size={30} />
              </div>
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 16,
                  background: SUNNY,
                  border: `3.5px solid ${CHARCOAL}`,
                  ...centerCol,
                  animation: live ? 'cpj26-pulse 1.7s infinite' : undefined,
                }}
              >
                <div style={{ width: 34, height: 34, borderRadius: 99, border: `4px solid ${CHARCOAL}` }} />
              </div>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, ...centerCol }}>
                <div style={{ width: 30, height: 30, borderRadius: 5, border: `3.5px solid ${CHARCOAL}` }} />
              </div>
            </div>

            {/* Canvas with Gleaming Soap Bubble */}
            <div
              style={{
                flex: 1,
                borderRadius: 24,
                backgroundColor: WHITE,
                backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
                backgroundSize: '22px 22px',
                border: `3.5px solid ${CHARCOAL}`,
                ...centerCol,
                position: 'relative',
              }}
            >
              <SoapBubbleSvg size={260} color={SKY} />
              <div style={{ position: 'absolute', right: 16, top: 16, width: 64, height: 64, borderRadius: 99, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...centerCol }}>
                <JuniorIcon name="check" size={38} />
              </div>
            </div>
          </div>

          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ ...row, gap: 12 }}>
              <JuniorIcon name="paint-bucket" size={44} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 25, fontWeight: 700, color: '#1D4ED8' }}>
                Warna Biru Muda Berkilau!
              </span>
            </div>
            <BikoMascot pose="thumbs-up" width={145} badgeIcon={<JuniorIcon name="check" size={18} />} speechBubble="Klik centang!" />
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
        headerLabel="Langkah Menggambar"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="shapes-circle" bgColor={SUNNY_SOFT} fontSize={33}>
              Buka <strong>Paint Editor</strong> &amp; pilih bentuk <strong>Lingkaran</strong>
            </BulletRow>
            <BulletRow icon="bubble" bgColor={SKY_SOFT} fontSize={33}>
              Warnai <strong>Biru Muda</strong> biar tampak berkilau!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: TEAL_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Jangan lupa tekan tombol <strong>Centang Hijau</strong> di kanan atas kanvas agar gelembungmu tampil di panggung!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Rahasia Game: 2 Kode dalam 1 Gelembung!
// ============================================================================
const Slide04DuaKode: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="RAHASIA PEMBUAT GAME" accentDot={SUNNY}>
      <SlideTitle>
        <Highlight>2 Kode</Highlight> dalam 1 Gelembung!
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={CREAM}
        headerLabel="1 Karakter Gelembung Punya 2 Tugas Bersamaan!"
        padding={34}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu Kiri — Kode Terbang */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${SKY}`,
              padding: '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 8 }}>
              <JuniorIcon name="infinity" size={24} />
              <span>Kode Terbang</span>
            </div>

            <ScratchJrBlock kind="start-flag" scale={1.45} />

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: CHARCOAL, lineHeight: 1.25 }}>
              Bikin gelembung <span style={{ color: '#1D4ED8' }}>Melayang Terus</span>
            </div>
          </div>

          {/* Kartu Kanan — Kode Pecah */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SUNNY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${SUNNY}`,
              padding: '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '8px 22px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, ...row, gap: 8 }}>
              <JuniorIcon name="tap" size={24} />
              <span>Kode Pecah</span>
            </div>

            <ScratchJrBlock kind="start-tap" scale={1.45} />

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: CHARCOAL, lineHeight: 1.25 }}>
              Bikin gelembung <span style={{ color: '#C2410C' }}>Pecah saat Diklik!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1475, 345, 360, 560),
          ...centerCol,
          animation: live ? 'cpj26-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={335}
          badgeIcon={<JuniorIcon name="bubble" size={22} />}
          speechBubble="Ditaruh sejajar!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Kode #1: Gelembung Terbang Selamanya!
// ============================================================================
const Slide05KodeTerbang: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="KODE GAME #1" accentDot={SKY}>
      <SlideTitle>
        Bikin <Highlight>Terbang Selamanya!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Floating Bubble + 3 Blocks */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SKY_SOFT}
        headerLabel="Kode Terbang — Naik Tanpa Henti"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '100%', height: 340, borderRadius: 24, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden', ...centerCol }}>
            <ParkGardenBackdropSvg />
            <div style={{ position: 'absolute', animation: live ? 'cpj26-bubble-rise 3s ease-in-out infinite' : undefined }}>
              <SoapBubbleSvg size={160} color={SKY} />
            </div>
          </div>

          <div style={{ ...row, alignItems: 'flex-start', justifyContent: 'center' }}>
            <ScratchJrBlock kind="start-flag" scale={1.3} />
            <div style={{ marginLeft: -18 }}>
              <ScratchJrBlock kind="move-up" num={1} scale={1.3} />
            </div>
            <div style={{ marginLeft: -18 }}>
              <ScratchJrBlock kind="repeat-forever" scale={1.3} activeGlow />
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
        headerLabel="Cara Membuat Gelembung Melayang"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="balloon" bgColor={SKY_SOFT} fontSize={32}>
              Pasang <strong>Bendera Hijau</strong> + <strong>Naik 1</strong> + <strong>Repeat Forever</strong>
            </BulletRow>
            <BulletRow icon="sparkle" bgColor={SUNNY_SOFT} fontSize={32}>
              Gelembung melayang <strong>Naik Tanpa Henti!</strong>
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="arrow-up" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Saat gelembung keluar di langit atas, gelembung otomatis muncul kembali dari bawah!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Blok Apa untuk Menangkap?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1600} top={128} size={52}>
        Blok Mana Biar Gelembung Pecah saat <Highlight>Diklik?</Highlight>
      </SlideTitle>

      <div style={{ ...abs(190, 255, 1540, 445), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Start on Tap) */}
        <button
          type="button"
          onClick={() => setPicked('A')}
          className="cpj26-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'A' ? TEAL_SOFT : WHITE,
            border: `4px solid ${picked === 'A' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'A' ? TEAL : CHARCOAL}`,
            padding: 32,
            ...centerCol,
            gap: 18,
            position: 'relative',
          }}
        >
          <div style={{ ...abs(26, 24), padding: '6px 18px', borderRadius: 99, background: TEAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
            PILIHAN A
          </div>

          <div style={{ marginTop: 18 }}>
            <ScratchJrBlock kind="start-tap" scale={1.65} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Sentuh Karakter
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 22px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 22, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Sentuh Karakter jalan saat gelembung diklik!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Green Flag) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj26-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'B' ? CORAL_SOFT : WHITE,
            border: `4px solid ${picked === 'B' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'B' ? CORAL : CHARCOAL}`,
            padding: 32,
            ...centerCol,
            gap: 18,
            position: 'relative',
            animation: picked === 'B' ? 'cpj26-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 24), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 18 }}>
            <ScratchJrBlock kind="start-flag" scale={1.65} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Bendera Hijau
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 22px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 22, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Bendera Hijau tidak menunggu klik gelembung!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 725, 1540, 280), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj26-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={230}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Jagoan!' : 'Yang mana?'}
          />
        </div>
        <div style={{ padding: '22px 36px', borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...row, gap: 20 }}>
          <div style={{ width: 68, height: 68, borderRadius: 20, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="question" size={38} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: CHARCOAL }}>
            Tunjuk blok yang benar di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Kode #2: Tangkap & "Pop!" saat Diklik!
// ============================================================================
const Slide07KodePecah: Page = () => {
  const [poppedDemo, setPoppedDemo] = useState(false);

  const handlePopDemo = () => {
    playPopChime();
    setPoppedDemo(true);
    setTimeout(() => setPoppedDemo(false), 1200);
  };

  return (
    <JuniorFrame badge="KODE GAME #2" accentDot={TEAL}>
      <SlideTitle>
        Tangkap &amp; <Highlight>&ldquo;Pop!&rdquo;</Highlight> saat Diklik!
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={230}
        width={1720}
        height={735}
        titleBarColor={CREAM}
        headerLabel='Urutan Kode Klik "Pop!" & Sembunyi'
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
                <JuniorIcon name="start-tap" size={30} style={{ marginRight: 8 }} />
                Pasang <strong>Sentuh Karakter</strong>
              </div>
            </div>

            <div style={{ flex: 1, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${TEAL}`, padding: '22px 24px', ...row, gap: 18 }}>
              <div style={{ width: 58, height: 58, borderRadius: 18, background: TEAL, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
                2
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="speaker" size={30} style={{ marginRight: 8 }} />
                Sambung bunyi <strong>&ldquo;Pop!&rdquo;</strong>
              </div>
            </div>

            <div style={{ flex: 1, borderRadius: 22, background: LAVENDER_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${LAVENDER}`, padding: '22px 24px', ...row, gap: 18 }}>
              <div style={{ width: 58, height: 58, borderRadius: 18, background: LAVENDER, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
                3
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="hide" size={30} style={{ marginRight: 8 }} />
                Sambung <strong>Sembunyi (Hide)</strong> -&gt; Hilang!
              </div>
            </div>
          </div>

          {/* Snapped Chain + Interactive Clickable Bubble Burst */}
          <div style={{ height: 410, borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, padding: '26px 40px', ...row, justifyContent: 'space-around', gap: 36 }}>
            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-tap" scale={1.55} />
              <div style={{ marginLeft: -22 }}>
                <ScratchJrBlock kind="sound-pop" scale={1.55} activeGlow={poppedDemo} />
              </div>
              <div style={{ marginLeft: -22 }}>
                <ScratchJrBlock kind="hide" scale={1.55} activeGlow={poppedDemo} />
              </div>
            </div>

            <button
              type="button"
              onClick={handlePopDemo}
              className="cpj26-card-btn"
              style={{
                width: 310,
                height: 310,
                borderRadius: 32,
                background: SKY_SOFT,
                border: `3.5px solid ${CHARCOAL}`,
                boxShadow: `0 7px 0 ${CHARCOAL}`,
                ...centerCol,
                gap: 12,
              }}
            >
              <SoapBubbleSvg size={185} color={SKY} popped={poppedDemo} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: CHARCOAL }}>
                Klik Gelembung Ini!
              </span>
            </button>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Pembuat Game (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsGame: Page = () => {
  return (
    <JuniorFrame badge="TIPS GAME SERU" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Gamemu <Highlight>Makin Seru!</Highlight>
      </SlideTitle>

      {/* Kolom Kiri — BOLEH */}
      <MacWindowCard
        left={X0}
        top={235}
        width={835}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="BOLEH & SERU"
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
            <BulletRow icon="bubble" bgColor={SKY_SOFT} fontSize={30}>
              Buat <strong>2 atau 3 Gelembung</strong> warna-warni
            </BulletRow>
            <BulletRow icon="turtle" bgColor={TEAL_SOFT} fontSize={30}>
              Pakai kecepatan <strong>Pelan / Sedang</strong> biar mudah diklik
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, border: `3.5px solid ${TEAL}`, position: 'relative', overflow: 'hidden', ...row, justifyContent: 'space-around' }}>
            <ParkGardenBackdropSvg />
            <div style={{ position: 'absolute', inset: 0, ...row, justifyContent: 'space-around', alignItems: 'center' }}>
              <SoapBubbleSvg size={105} color={SKY} />
              <SoapBubbleSvg size={115} color={LAVENDER} />
              <SoapBubbleSvg size={100} color={SUNNY} />
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
            <BulletRow icon="lightning" bgColor={CORAL_SOFT} fontSize={30}>
              Gerak <strong>Terlalu Cepat</strong> sampai susah ditangkap
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={30}>
              Lupa pasang blok <strong>Sembunyi (Hide)</strong> setelah &ldquo;Pop!&rdquo;
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', padding: '0 24px' }}>
            <div style={{ ...row, gap: 10 }}>
              <JuniorIcon name="lightning" size={64} />
              <SoapBubbleSvg size={110} color={CORAL} />
            </div>
            <JuniorIcon name="cross" size={64} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Mainkan Game Pertamamu!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [poppedIds, setPoppedIds] = useState<number[]>([]);

  const handlePop = (id: number) => {
    playPopChime();
    setPoppedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <JuniorFrame badge="AYO BUAT & MAIN!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Game Tangkap Gelembung!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'bubble' as JuniorIconName,
            text: (
              <>
                Gambar <strong>Gelembung Sabun</strong> di latar taman
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
                Pasang <strong>Kode Terbang</strong> &amp; <strong>Kode Klik &ldquo;Pop!&rdquo;</strong>
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
                Klik <strong>Bendera Hijau!</strong> Tangkap semua gelembung!
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

      {/* Playable Authentic ScratchJr Bubble-Pop Workspace */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratchJrGameUI
          poppedIds={poppedIds}
          onPopBubble={handlePop}
          onResetGame={() => setPoppedIds([])}
          rising={live}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Reset Game Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 18 }}>
        <div style={{ animation: live ? 'cpj26-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={345}
            badgeIcon={<JuniorIcon name="gamepad" size={24} />}
            speechBubble={poppedIds.length === 3 ? 'Menang semua!' : `Skor: ${poppedIds.length}/3`}
          />
        </div>
        <button
          type="button"
          onClick={() => setPoppedIds([])}
          className="cpj26-card-btn"
          style={{
            padding: '14px 26px',
            borderRadius: 20,
            background: SKY,
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
          <JuniorIcon name="reset" size={26} />
          <span>Main Lagi!</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 26 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj26-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj26-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="gamepad" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj26-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={58}>
        Hore! Kamu <Highlight>Pembuat Game Cilik!</Highlight>{' '}
        <JuniorIcon name="party" size={52} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 26"
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
          {/* Bespoke Golden Gamepad & Sparkling Soap Bubble Medal SVG */}
          <div style={{ animation: live ? 'cpj26-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Sparkling Soap Bubbles behind */}
              <circle cx="88" cy="76" r="16" fill={SKY} fillOpacity={0.45} stroke={CHARCOAL} strokeWidth={3} />
              <circle cx="152" cy="76" r="14" fill={LAVENDER} fillOpacity={0.45} stroke={CHARCOAL} strokeWidth={3} />
              {/* Cartoon Gamepad Controller */}
              <rect x="74" y="96" width="92" height="48" rx="22" fill={WHITE} stroke={CHARCOAL} strokeWidth={4} />
              <path d="M96 112 V128 M88 120 H104" stroke={CHARCOAL} strokeWidth={4.5} strokeLinecap="round" />
              <circle cx="142" cy="114" r="5" fill={CORAL} />
              <circle cx="152" cy="124" r="5" fill={TEAL} />
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
            <span>Lencana Pembuat Game Pertama</span>
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
            Kamu sudah berhasil menggabungkan{' '}
            <Highlight color="#D1FAE5">Loop &amp; Sentuh Karakter</Highlight> jadi game seru!
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="gamepad" size={22} />}
            speechBubble="Game Maker!"
          />
          <div style={{ animation: live ? 'cpj26-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 26 — Pop! Tangkap Gelembung Sabun! 🫧
Hari ini anak-anak akan membuat Game Ketangkasan Klik Pertama mereka di ScratchJr!`,

  `Dua misi seru hari ini:
1. Membuat Gelembung Sabun melayang naik terus-menerus.
2. Menangkap dan meletuskan gelembung pakai klik jari hingga berbunyi "POP!"`,

  `Langkah #1 — Gambar Gelembung Sabun:
Buka Paint Editor, pilih alat Lingkaran (Circle), isi warna Biru Muda berkilau dengan Ember Cat, lalu klik Centang Hijau!`,

  `Rahasia Game — 2 Kode dalam 1 Gelembung!
Jelaskan bahwa 1 gelembung punya 2 tugas paralel yang ditaruh sejajar: Kode Terbang (Bendera Hijau) dan Kode Pecah (Sentuh Karakter)!`,

  `Kode #1 — Gelembung Terbang Selamanya:
Rangkai Bendera Hijau -> Naik 1 -> Blok Merah Repeat Forever agar gelembung terus melayang ke atas!`,

  `Permainan Cepat! Ayo tebak bersama:
Blok mana biar gelembung pecah saat diklik — Pilihan A (Sentuh Karakter) atau Pilihan B (Bendera Hijau)?`,

  `Kode #2 — Tangkap & "Pop!" saat Diklik!
Rangkai 1. Sentuh Karakter (Kuning) -> 2. Bunyi "Pop!" (Hijau) -> 3. Sembunyi/Hide (Ungu)! Ajak anak mengklik gelembung demo di layar!`,

  `Tips Jagoan Pembuat Game:
BOLEH buat 2–3 gelembung warna-warni dengan kecepatan Pelan/Sedang.
JANGAN gerak terlalu cepat sampai susah diklik, atau lupa pasang blok Sembunyi (Hide) setelah "Pop!"`,

  `Waktunya Misi Praktik Game Tangkap Gelembung:
1. Gambar gelembung sabun di taman. 2. Pasang Kode Terbang & Kode Klik "Pop!" sejajar. 3. Klik Bendera Hijau dan mainkan gamemu!`,

  `Hebat sekali untuk semua Pembuat Game Cilik! 🎉
Kalian berhasil membuat game interaktif pertama dan meraih Lencana Pembuat Game Pertama di Pertemuan 26!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 26 — Pop! Tangkap Gelembung Sabun!',
  createdAt: '2026-11-16T14:22:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03GambarGelembung,
  Slide04DuaKode,
  Slide05KodeTerbang,
  Slide06AyoTebak,
  Slide07KodePecah,
  Slide08TipsGame,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

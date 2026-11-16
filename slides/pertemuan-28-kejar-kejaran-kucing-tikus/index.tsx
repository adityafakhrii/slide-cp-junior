import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-28-kejar-kejaran-kucing-tikus';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj28-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj28-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj28-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj28-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj28-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj28-pop-burst {
  0% { transform: scale(0.7) rotate(-8deg); opacity: 0.8; }
  60% { transform: scale(1.14) rotate(4deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
.cpj28-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj28-card-btn:hover {
  transform: translateY(-4px);
}
.cpj28-card-btn:active {
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

/** Playful cartoon "POP!" chime when Kucing Tic catches Tikus */
function playPopChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(340, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(920, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.24, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.13);
    setTimeout(() => {
      void ctx.close();
    }, 260);
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
    accent: '#60A5FA',
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
          animation: live ? 'cpj28-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 28 • Kejar-Kejaran Kucing &amp; Tikus!</span>
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
// Reusable Pertemuan 28 Visuals (Tic Cat, Little Mouse, Living Room, Blocks)
// ============================================================================

const TicCatSvg = ({ size = 128, waving = false }: { size?: number; waving?: boolean }) => (
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

const LittleMouseSvg = ({ size = 92, hidden = false }: { size?: number; hidden?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 110 110"
    fill="none"
    style={{ opacity: hidden ? 0.25 : 1, transition: 'opacity 250ms ease' }}
  >
    <ellipse cx="56" cy="94" rx="30" ry="6" fill="rgba(30,30,44,0.14)" />
    <path d="M18 76 C6 68, 10 50, 24 54" fill="none" stroke="#F472B6" strokeWidth={4.5} strokeLinecap="round" />
    <circle cx="48" cy="36" r="14" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={3.8} />
    <circle cx="48" cy="36" r="7.5" fill="#F9A8D4" />
    <circle cx="72" cy="38" r="13" fill="#CBD5E1" stroke={CHARCOAL} strokeWidth={3.8} />
    <circle cx="72" cy="38" r="7" fill="#F9A8D4" />
    <path
      d="M22 76 C22 50, 48 44, 72 52 C88 57, 94 68, 92 77 C90 84, 72 86, 48 86 C30 86, 22 83, 22 76 Z"
      fill="#E2E8F0"
      stroke={CHARCOAL}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <circle cx="72" cy="63" r="4.2" fill={CHARCOAL} />
    <circle cx="73.2" cy="61.6" r="1.4" fill={WHITE} />
    <circle cx="92" cy="72" r="5" fill="#F43F5E" stroke={CHARCOAL} strokeWidth={2.5} />
    <line x1="78" y1="73" x2="96" y2="69" stroke={CHARCOAL} strokeWidth={2.2} strokeLinecap="round" />
    <line x1="78" y1="77" x2="95" y2="80" stroke={CHARCOAL} strokeWidth={2.2} strokeLinecap="round" />
  </svg>
);

const CozyRoomBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 520 260" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="520" height="172" fill="#FEF3C7" />
    {/* Window overlooking blue sky */}
    <rect x="200" y="24" width="120" height="84" rx="10" fill="#DBEAFE" stroke={CHARCOAL} strokeWidth={3} />
    <line x1="260" y1="24" x2="260" y2="108" stroke={CHARCOAL} strokeWidth={2.6} />
    <line x1="200" y1="66" x2="320" y2="66" stroke={CHARCOAL} strokeWidth={2.6} />
    {/* Cozy sofa */}
    <rect x="24" y="102" width="134" height="72" rx="16" fill="#93C5FD" stroke={CHARCOAL} strokeWidth={2.8} />
    <rect x="38" y="132" width="106" height="42" rx="10" fill="#60A5FA" stroke={CHARCOAL} strokeWidth={2.4} />
    {/* Bookshelf */}
    <rect x="372" y="64" width="118" height="108" rx="8" fill="#FDBA74" stroke={CHARCOAL} strokeWidth={2.8} />
    <line x1="372" y1="114" x2="490" y2="114" stroke={CHARCOAL} strokeWidth={2.6} />
    {/* Warm wooden floor */}
    <rect x="0" y="172" width="520" height="88" fill="#FDE68A" stroke={CHARCOAL} strokeWidth={2.8} />
    <ellipse cx="260" cy="216" rx="176" ry="26" fill="#FCA5A5" fillOpacity={0.55} stroke={CHARCOAL} strokeWidth={2.4} />
  </svg>
);

const PopBurstBadge = ({ size = 84 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      position: 'relative',
      ...centerCol,
      animation: 'cpj28-pop-burst 0.55s ease-in-out infinite alternate',
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
        fontSize: Math.round(size * 0.27),
        fontWeight: 700,
        color: CORAL,
      }}
    >
      POP!
    </span>
  </div>
);

type ChaseBlockKind =
  | 'start-flag'
  | 'start-bump'
  | 'move-right'
  | 'turn-right'
  | 'speed-fast'
  | 'speed-slow'
  | 'sound-pop'
  | 'hide';

const ScratchJrBlock = ({
  kind,
  num = 1,
  scale = 1,
  activeGlow = false,
}: {
  kind: ChaseBlockKind;
  num?: number;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-flag' || kind === 'start-bump';
  const fill = isTrigger
    ? SUNNY
    : kind === 'move-right' || kind === 'turn-right'
      ? SKY
      : kind === 'sound-pop'
        ? TEAL
        : kind === 'hide'
          ? LAVENDER
          : ORANGE;

  const w = Math.round(134 * scale);
  const h = Math.round(118 * scale);

  const pathData = isTrigger
    ? 'M30 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H24 C14 106 8 98 8 88 V38 C8 25 18 16 30 16 Z'
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
            <circle cx="48" cy="43" r="10" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} />
            <path d="M31 82 C31 61, 65 61, 65 82 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <circle cx="86" cy="43" r="10" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={2.8} />
            <path d="M69 82 C69 61, 103 61, 103 82 Z" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <polygon points="67,54 73,63 61,63" fill={CORAL} />
          </>
        )}

        {kind === 'move-right' && (
          <path d="M36 52 H72 V37 L102 60 L72 83 V68 H36 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
        )}

        {kind === 'turn-right' && (
          <path d="M46 65 A24 24 0 1 1 88 73 M88 86 V70 H72" fill="none" stroke={WHITE} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        )}

        {kind === 'speed-fast' && (
          <>
            <path d="M42 40 L94 40 M50 56 L100 56 M40 72 L88 72" stroke={WHITE} strokeWidth={5} strokeLinecap="round" />
            <circle cx="88" cy="56" r="13" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
          </>
        )}

        {kind === 'speed-slow' && (
          <>
            <ellipse cx="68" cy="64" rx="22" ry="14" fill={TEAL_SOFT} stroke={CHARCOAL} strokeWidth={3} />
            <circle cx="94" cy="58" r="8" fill={TEAL_SOFT} stroke={CHARCOAL} strokeWidth={3} />
            <line x1="56" y1="78" x2="56" y2="85" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" />
            <line x1="80" y1="78" x2="80" y2="85" stroke={CHARCOAL} strokeWidth={3.5} strokeLinecap="round" />
          </>
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
      </svg>

      {kind === 'move-right' && (
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

/** Authentic ScratchJr Tablet Interface for Kucing & Tikus Chase Game */
const AuthenticScratchJrChaseUI = ({
  chasePhase,
  selectedChar = 'mouse',
  onSelectChar,
  onRunChase,
  onReset,
  width = 880,
  height = 540,
}: {
  chasePhase: 'ready' | 'chasing' | 'caught';
  selectedChar?: 'cat' | 'mouse';
  onSelectChar?: (c: 'cat' | 'mouse') => void;
  onRunChase?: () => void;
  onReset?: () => void;
  width?: number | string;
  height?: number | string;
}) => {
  const catLeft = chasePhase === 'ready' ? '8%' : chasePhase === 'chasing' ? '38%' : '56%';
  const mouseLeft = chasePhase === 'ready' ? '48%' : chasePhase === 'chasing' ? '64%' : '69%';

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
            className="cpj28-card-btn"
            title="Reset Game"
            style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol, padding: 0 }}
          >
            <JuniorIcon name="reset" size={22} />
          </button>
          <button
            type="button"
            onClick={onRunChase}
            className="cpj28-card-btn"
            title="Bendera Hijau"
            style={{ width: 46, height: 36, borderRadius: 10, background: TEAL_SOFT, border: `2.5px solid ${TEAL}`, ...centerCol, padding: 0 }}
          >
            <JuniorIcon name="flag" size={24} />
          </button>
        </div>

        <div style={{ padding: '4px 12px', borderRadius: 10, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 13, fontWeight: 700 }}>
          {chasePhase === 'caught' ? 'POP! Tertangkap!' : chasePhase === 'chasing' ? 'Mengejar!' : 'Siap Kejar'}
        </div>
      </div>

      {/* Middle 3-Column Row */}
      <div style={{ flex: 1, display: 'flex', gap: 10, minHeight: 0 }}>
        {/* Left Characters Sidebar */}
        <div style={{ width: 96, borderRadius: 16, background: '#E2E8F0', border: `2.5px solid ${CHARCOAL}`, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            onClick={() => onSelectChar?.('cat')}
            className="cpj28-card-btn"
            style={{
              width: '100%',
              height: 54,
              borderRadius: 12,
              background: WHITE,
              border: `${selectedChar === 'cat' ? 3 : 2}px solid ${selectedChar === 'cat' ? SUNNY : CHARCOAL}`,
              ...centerCol,
              padding: 0,
            }}
          >
            <TicCatSvg size={44} />
          </button>
          <button
            type="button"
            onClick={() => onSelectChar?.('mouse')}
            className="cpj28-card-btn"
            style={{
              width: '100%',
              height: 54,
              borderRadius: 12,
              background: WHITE,
              border: `${selectedChar === 'mouse' ? 3 : 2}px solid ${selectedChar === 'mouse' ? SUNNY : CHARCOAL}`,
              ...centerCol,
              padding: 0,
            }}
          >
            <LittleMouseSvg size={42} />
          </button>
          <div style={{ marginTop: 'auto', opacity: 0.85 }}>
            <JuniorIcon name="plus-circle" size={26} />
          </div>
        </div>

        {/* Center Cozy Room Chase Stage */}
        <div style={{ flex: 1, borderRadius: 18, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
          <CozyRoomBackdropSvg />
          {/* Kucing Tic */}
          <div
            style={{
              position: 'absolute',
              left: catLeft,
              bottom: '8%',
              transition: 'left 450ms cubic-bezier(0.22, 1, 0.36, 1)',
              zIndex: 3,
            }}
          >
            <TicCatSvg size={115} waving={chasePhase === 'caught'} />
          </div>
          {/* Little Mouse */}
          {chasePhase !== 'caught' && (
            <div
              style={{
                position: 'absolute',
                left: mouseLeft,
                bottom: '9%',
                transition: 'left 550ms ease',
                zIndex: 2,
              }}
            >
              <LittleMouseSvg size={82} />
            </div>
          )}
          {/* POP! Burst */}
          {chasePhase === 'caught' && (
            <div style={{ position: 'absolute', left: '68%', bottom: '18%', zIndex: 4 }}>
              <PopBurstBadge size={82} />
            </div>
          )}
        </div>

        {/* Right Page Thumbnail */}
        <div style={{ width: 90, borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: '100%', height: 58, borderRadius: 12, border: `2.5px solid ${SUNNY}`, overflow: 'hidden', position: 'relative' }}>
            <CozyRoomBackdropSvg />
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
            {selectedChar === 'cat' ? 'Kode Kucing Tic (Cepat)' : 'Kode Tikus (Lari Pelan + Reaksi Tabrakan)'}
          </span>
        </div>

        <div style={{ flex: 1, padding: '6px 14px', ...row, justifyContent: 'space-around', alignItems: 'flex-start', overflow: 'hidden' }}>
          {selectedChar === 'cat' ? (
            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-flag" scale={0.68} />
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind="speed-fast" scale={0.68} activeGlow={chasePhase === 'chasing'} />
              </div>
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind="move-right" num={8} scale={0.68} activeGlow={chasePhase === 'chasing'} />
              </div>
            </div>
          ) : (
            <>
              <div style={{ ...row, alignItems: 'flex-start' }}>
                <ScratchJrBlock kind="start-flag" scale={0.62} />
                <div style={{ marginLeft: -10 }}>
                  <ScratchJrBlock kind="speed-slow" scale={0.62} />
                </div>
                <div style={{ marginLeft: -10 }}>
                  <ScratchJrBlock kind="move-right" num={3} scale={0.62} />
                </div>
              </div>
              <div style={{ width: 2, height: '82%', background: '#CBD5E1' }} />
              <div style={{ ...row, alignItems: 'flex-start' }}>
                <ScratchJrBlock kind="start-bump" scale={0.62} activeGlow={chasePhase === 'caught'} />
                <div style={{ marginLeft: -10 }}>
                  <ScratchJrBlock kind="sound-pop" scale={0.62} activeGlow={chasePhase === 'caught'} />
                </div>
                <div style={{ marginLeft: -10 }}>
                  <ScratchJrBlock kind="hide" scale={0.62} activeGlow={chasePhase === 'caught'} />
                </div>
              </div>
            </>
          )}
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
  const [phase, setPhase] = useState<'ready' | 'chasing' | 'caught'>('ready');

  useEffect(() => {
    if (!live) {
      setPhase('ready');
      return;
    }
    const t1 = setTimeout(() => setPhase('chasing'), 380);
    const t2 = setTimeout(() => setPhase('caught'), 1050);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [live]);

  const handleRunChase = () => {
    setPhase('chasing');
    setTimeout(() => {
      playPopChime();
      setPhase('caught');
    }, 550);
  };

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 28" accentDot={SKY}>
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
          <JuniorIcon name="cat" size={24} />
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
          <Highlight>Kejar-Kejaran</Highlight>
          <br />
          Kucing &amp; Tikus!
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
          Merancang Reaksi Suara &amp; Sembunyi Saat Bertabrakan
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
            <JuniorIcon name="lightning" size={28} />
            <span>Kucing Kejar Cepat!</span>
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
            <JuniorIcon name="hide" size={28} />
            <span>Tertangkap = POP!</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Playable Authentic ScratchJr Chase UI + Biko */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #EFF6FF 0%, #FEF9C3 55%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${SKY}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 140, zIndex: 2 }}>
          <AuthenticScratchJrChaseUI
            chasePhase={phase}
            selectedChar="mouse"
            onRunChase={handleRunChase}
            onReset={() => setPhase('ready')}
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
            animation: live ? 'cpj28-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="cat" size={24} />}
            speechBubble={phase === 'caught' ? 'POP! Kena!' : 'Klik Bendera Hijau!'}
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
        headerLabel="Misi Game Kejar-Kejaran • Pertemuan 28"
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

            <div style={{ width: 270, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 10 }}>
              <JuniorIcon name="start-bump" size={58} />
              <JuniorIcon name="arrow-right" size={34} />
              <JuniorIcon name="speaker" size={54} />
              <JuniorIcon name="hide" size={54} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Pahami <span style={{ color: '#1D4ED8' }}>Sebab &amp; Akibat</span> Saat Tabrakan
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

            <div style={{ width: 270, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 10 }}>
              <TicCatSvg size={110} />
              <LittleMouseSvg size={86} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Bikin Game <span style={{ color: '#047857' }}>Kejar-Kejaran Kucing &amp; Tikus!</span>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj28-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="cat" size={24} />}
          speechBubble="Seru banget!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Rahasia Game: Apa Itu Sebab & Akibat?
// ============================================================================
const Slide03SebabAkibat: Page = () => {
  return (
    <JuniorFrame badge="RAHASIA PEMBUAT GAME" accentDot={SUNNY}>
      <SlideTitle>
        Mengenal <Highlight>Sebab &amp; Akibat!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Cause -> Effect Visual Boxes */}
      <MacWindowCard
        left={X0}
        top={235}
        width={860}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Hubungan Sebab & Akibat di Game"
        padding={30}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 20 }}>
          {/* Box 1: Sebab */}
          <div style={{ borderRadius: 24, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, padding: '20px 28px', ...row, justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: 99, background: CORAL, color: WHITE, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700, marginBottom: 8 }}>
                SEBAB
              </div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
                Kucing Tic Menyentuh Tikus
              </div>
            </div>
            <div style={{ ...row, alignItems: 'center', gap: 8 }}>
              <TicCatSvg size={105} />
              <LittleMouseSvg size={82} />
            </div>
          </div>

          <div style={{ ...row, justifyContent: 'center', gap: 14 }}>
            <JuniorIcon name="star-glow" size={38} />
            <JuniorIcon name="arrow-down" size={46} />
            <JuniorIcon name="star-glow" size={38} />
          </div>

          {/* Box 2: Akibat */}
          <div style={{ borderRadius: 24, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, padding: '20px 28px', ...row, justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: 99, background: TEAL, color: WHITE, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 21, fontWeight: 700, marginBottom: 8 }}>
                AKIBAT
              </div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
                Bunyi &ldquo;POP!&rdquo; &amp; Tikus Hilang
              </div>
            </div>
            <div style={{ ...row, alignItems: 'center', gap: 10 }}>
              <PopBurstBadge size={82} />
              <LittleMouseSvg size={80} hidden />
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={995}
        top={235}
        width={825}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Aturan Sebab & Akibat"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="bump-burst" bgColor={CORAL_SOFT} fontSize={32}>
              <strong>Sebab:</strong> Kucing Tic <strong>Menyentuh</strong> Tikus (Tabrakan)
            </BulletRow>
            <BulletRow icon="sparkle" bgColor={TEAL_SOFT} fontSize={32}>
              <strong>Akibat:</strong> Tikus bunyi <strong>&ldquo;Pop!&rdquo;</strong> lalu <strong>Menghilang</strong> (Hide)!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Dalam game seru, setiap ada kejadian (<strong>Sebab</strong>), selalu muncul reaksi balasan (<strong>Akibat</strong>)!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Langkah #1: Siapkan Panggung Kejar-Kejaran!
// ============================================================================
const Slide04SiapkanPanggung: Page = () => {
  return (
    <JuniorFrame badge="PERSIAPAN PANGGUNG" accentDot={SKY}>
      <SlideTitle>
        Siapkan <Highlight>Kucing &amp; Tikus!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Authentic ScratchJr Stage */}
      <div style={{ ...abs(X0, 235, 860, 720) }}>
        <AuthenticScratchJrChaseUI chasePhase="ready" selectedChar="mouse" width={860} height={720} />
      </div>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={995}
        top={235}
        width={825}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Menyiapkan Karakter & Latar"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="house" bgColor={SUNNY_SOFT} fontSize={33}>
              Pasang latar <strong>Kamar</strong> atau <strong>Taman</strong>
            </BulletRow>
            <BulletRow icon="mouse-animal" bgColor={SKY_SOFT} fontSize={33}>
              Taruh <strong>Kucing Tic</strong> di kiri &amp; <strong>Tikus</strong> di tengah!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: TEAL_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="ruler" size={42} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Taruh posisi berjauhan sedikit di lantai yang sejajar supaya seru melihat Kucing Tic berlari mengejar!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Kode #1: Kucing Tic Mengejar Tikus!
// ============================================================================
const Slide05KodeKucing: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="KODE KUCING TIC" accentDot={ORANGE}>
      <SlideTitle>
        Kucing Tic <Highlight>Berlari Mengejar!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Running Tic + Speed Wind Lines + 3 Blocks */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Karakter 1: Kucing Tic (Pengejar)"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '100%', height: 340, borderRadius: 24, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden', ...row, justifyContent: 'center', gap: 16 }}>
            <CozyRoomBackdropSvg />
            <div style={{ position: 'absolute', inset: 0, ...row, justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 24, gap: 18 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 44 }}>
                <div style={{ width: 64, height: 8, borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}` }} />
                <div style={{ width: 88, height: 8, borderRadius: 99, background: SUNNY, border: `2px solid ${CHARCOAL}` }} />
                <div style={{ width: 54, height: 8, borderRadius: 99, background: WHITE, border: `2px solid ${CHARCOAL}` }} />
              </div>
              <div style={{ animation: live ? 'cpj28-hop 1.4s ease-in-out infinite' : undefined }}>
                <TicCatSvg size={185} waving />
              </div>
              <JuniorIcon name="lightning" size={56} />
            </div>
          </div>

          <div style={{ ...row, alignItems: 'flex-start', justifyContent: 'center' }}>
            <ScratchJrBlock kind="start-flag" scale={1.3} />
            <div style={{ marginLeft: -18 }}>
              <ScratchJrBlock kind="speed-fast" scale={1.3} activeGlow />
            </div>
            <div style={{ marginLeft: -18 }}>
              <ScratchJrBlock kind="move-right" num={8} scale={1.3} />
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
        headerLabel="Langkah Kode Kucing Tic"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="cat" bgColor={SUNNY_SOFT} fontSize={32}>
              Ketuk ikon <strong>Kucing Tic</strong> di panel karakter
            </BulletRow>
            <BulletRow icon="puzzle" bgColor={SKY_SOFT} fontSize={32}>
              Rangkai: <strong>Bendera Hijau</strong> + <strong>Cepat</strong> + <strong>Maju 8</strong>
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="lightning" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Blok <strong>Kecepatan Cepat</strong> membuat Kucing Tic lari kencang mengejar si Tikus!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Apa Akibatnya Saat Tertangkap?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1600} top={118} size={48}>
        Saat Tikus <Highlight>Tertangkap,</Highlight> Blok Apa untuk Bunyi?
      </SlideTitle>

      {/* Top Visual Equation Strip */}
      <div
        style={{
          ...abs(260, 200, 1400, 128),
          borderRadius: 26,
          background: WHITE,
          border: `3.5px solid ${CHARCOAL}`,
          boxShadow: `0 6px 0 ${CHARCOAL}`,
          padding: '0 40px',
          ...row,
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <ScratchJrBlock kind="start-bump" scale={0.78} />
        <JuniorIcon name="arrow-right" size={38} />
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
            <ScratchJrBlock kind="sound-pop" scale={0.76} />
          ) : (
            <JuniorIcon name="question" size={44} />
          )}
        </div>
        <JuniorIcon name="arrow-right" size={38} />
        <ScratchJrBlock kind="hide" scale={0.78} />
      </div>

      {/* Interactive Choice Cards */}
      <div style={{ ...abs(190, 355, 1540, 395), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Blok Suara) */}
        <button
          type="button"
          onClick={() => {
            playPopChime();
            setPicked('A');
          }}
          className="cpj28-card-btn"
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
            <ScratchJrBlock kind="sound-pop" scale={1.45} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Blok Suara
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Blok Hijau Suara bikin bunyi &ldquo;Pop!&rdquo;!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Blok Berputar) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj28-card-btn"
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
            animation: picked === 'B' ? 'cpj28-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 12 }}>
            <ScratchJrBlock kind="turn-right" scale={1.45} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Blok Berputar
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Itu blok memutar karakter, bukan bunyi!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 765, 1540, 235), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj28-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={205}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Pintar!' : 'Ayo tebak!'}
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
// SLIDE 07 — Kode #2: Tikus Lari & Sembunyi Saat Tertangkap!
// ============================================================================
const Slide07KodeTikus: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="KODE KARAKTER TIKUS" accentDot={LAVENDER}>
      <SlideTitle>
        <Highlight>2 Kode</Highlight> pada Tikus!
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Area Kode Karakter Tikus (Lari Pelan + Reaksi Tertangkap)"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26 }}>
          {/* Kartu Atas — Kode Lari Pelan */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: TEAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${TEAL}`,
              padding: '22px 32px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ alignSelf: 'flex-start', padding: '7px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700, ...row, gap: 8 }}>
                <JuniorIcon name="turtle" size={24} />
                <span>Kode Lari Pelan</span>
              </div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                Tikus berlari pelan biar bisa disusul Kucing!
              </div>
            </div>

            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-flag" scale={1.15} />
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="speed-slow" scale={1.15} />
              </div>
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="move-right" num={3} scale={1.15} />
              </div>
            </div>
          </div>

          {/* Kartu Bawah — Kode Reaksi Tertangkap */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: LAVENDER_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${LAVENDER}`,
              padding: '22px 32px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ alignSelf: 'flex-start', padding: '7px 20px', borderRadius: 99, background: SUNNY, color: CHARCOAL, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 23, fontWeight: 700, ...row, gap: 8 }}>
                <JuniorIcon name="bump-burst" size={24} />
                <span>Kode Reaksi Tertangkap</span>
              </div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                Saat kena Kucing: Bunyi &ldquo;Pop!&rdquo; -&gt; Hilang!
              </div>
            </div>

            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-bump" scale={1.15} activeGlow />
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="sound-pop" scale={1.15} activeGlow />
              </div>
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="hide" scale={1.15} activeGlow />
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1475, 345, 360, 560),
          ...centerCol,
          animation: live ? 'cpj28-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={335}
          badgeIcon={<JuniorIcon name="mouse-animal" size={22} />}
          speechBubble="Baris bawah menyala!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Game Kejar-Kejaran (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsKejar: Page = () => {
  return (
    <JuniorFrame badge="TIPS GAME KEJAR-KEJARAN" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Tikus <Highlight>Bisa Tertangkap!</Highlight>
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
            <BulletRow icon="lightning" bgColor={SUNNY_SOFT} fontSize={30}>
              Atur <strong>Kucing Cepat</strong> &amp; <strong>Tikus Pelan</strong>
            </BulletRow>
            <BulletRow icon="start-bump" bgColor={TEAL_SOFT} fontSize={30}>
              Pasang blok <strong>Tabrakan</strong> di karakter <strong>Tikus</strong>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, border: `3.5px solid ${TEAL}`, position: 'relative', overflow: 'hidden' }}>
            <CozyRoomBackdropSvg />
            <div style={{ position: 'absolute', inset: 0, ...row, justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 16 }}>
              <TicCatSvg size={130} waving />
              <PopBurstBadge size={74} />
              <LittleMouseSvg size={86} />
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
            <BulletRow icon="turtle" bgColor={CORAL_SOFT} fontSize={30}>
              Bikin Kucing <strong>Lebih Pelan</strong> dari Tikus
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={30}>
              Lupa pasang blok <strong>Sembunyi (Hide)</strong> setelah suara
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-between', alignItems: 'center', padding: '0 28px' }}>
            <TicCatSvg size={105} />
            <div style={{ width: 90, borderTop: `5px dashed ${CORAL}` }} />
            <LittleMouseSvg size={86} />
            <JuniorIcon name="cross" size={62} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Mainkan Kejar-Kejaran Kucing & Tikus!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [phase, setPhase] = useState<'ready' | 'chasing' | 'caught'>('ready');
  const [charTab, setCharTab] = useState<'cat' | 'mouse'>('mouse');

  const handleRunChase = () => {
    setPhase('chasing');
    setTimeout(() => {
      playPopChime();
      setPhase('caught');
    }, 550);
  };

  return (
    <JuniorFrame badge="AYO BUAT & MAIN!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Kejar-Kejaran Kucing &amp; Tikus!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
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
                Pasang <strong>Kucing Tic</strong> &amp; <strong>Tikus</strong> di panggung
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
                Rangkai kode <strong>Mengejar</strong> di Kucing &amp; <strong>Reaksi Tabrakan</strong> di Tikus
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
                Klik <strong>Bendera Hijau!</strong> Lihat aksinya!
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

      {/* Playable Authentic ScratchJr Chase Workspace */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratchJrChaseUI
          chasePhase={phase}
          selectedChar={charTab}
          onSelectChar={setCharTab}
          onRunChase={handleRunChase}
          onReset={() => setPhase('ready')}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Run Chase Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 18 }}>
        <div style={{ animation: live ? 'cpj28-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={345}
            badgeIcon={<JuniorIcon name="cat" size={24} />}
            speechBubble={phase === 'caught' ? 'POP! Kena!' : 'Klik Bendera Hijau!'}
          />
        </div>
        <button
          type="button"
          onClick={handleRunChase}
          className="cpj28-card-btn"
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
// SLIDE 10 — Lencana Juara Pertemuan 28 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj28-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj28-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="crown" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj28-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={56}>
        Hore! Kamu <Highlight>Master Game Kejar-Kejaran!</Highlight>{' '}
        <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 28"
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
          {/* Bespoke Golden Game Crown + Cause-Effect Lightning Medal SVG */}
          <div style={{ animation: live ? 'cpj28-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={SKY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={SKY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Crown */}
              <path d="M82 98 L76 62 L100 78 L120 52 L140 78 L164 62 L158 98 Z" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <rect x="82" y="96" width="76" height="14" rx="5" fill={ORANGE} stroke={CHARCOAL} strokeWidth={3.2} />
              {/* Cause-effect lightning bolt */}
              <polygon points="124,116 106,138 119,138 114,160 138,132 124,132" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
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
            <span>Lencana Perancang Sebab-Akibat</span>
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
            Kamu sudah jago merancang{' '}
            <Highlight color="#D1FAE5">Reaksi Suara &amp; Sembunyi</Highlight> saat tabrakan!
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="crown" size={22} />}
            speechBubble="Juara Sebab-Akibat!"
          />
          <div style={{ animation: live ? 'cpj28-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 28 — Kejar-Kejaran Kucing & Tikus! 🐱🐭
Hari ini kita akan merancang game seru dengan reaksi Suara & Sembunyi saat bertabrakan!`,

  `Dua misi seru hari ini:
1. Memahami konsep Sebab & Akibat saat terjadi tabrakan.
2. Membuat game Kejar-Kejaran Kucing Tic dan Tikus!`,

  `Rahasia Pembuat Game: Sebab & Akibat!
Sebabnya adalah Kucing Tic menyentuh Tikus (Start on Bump). Akibatnya adalah Tikus berbunyi "Pop!" lalu menghilang (Hide)!`,

  `Persiapan Panggung ScratchJr:
Pilih latar Kamar atau Taman, lalu letakkan Kucing Tic di sisi kiri dan karakter Tikus di tengah panggung.`,

  `Kode #1 — Kucing Tic Berlari Mengejar!
Pilih karakter Kucing Tic, lalu rangkai Bendera Hijau -> Kecepatan Cepat -> Maju 8 supaya lincah mengejar Tikus.`,

  `Permainan Cepat! Ayo tebak bersama:
Saat Tikus tertangkap, di antara Start on Bump dan Sembunyi (Hide), blok apa yang dipakai untuk bunyi "Pop!" — Pilihan A (Blok Suara) atau Pilihan B (Blok Berputar)?`,

  `Kode #2 — 2 Kode Paralel pada Tikus!
Baris atas: Bendera Hijau -> Kecepatan Pelan -> Maju 3 (agar bisa tersusul).
Baris bawah: Blok Tabrakan -> Bunyi "Pop!" -> Sembunyi (Hide)!`,

  `Tips Jagoan Game Kejar-Kejaran:
BOLEH atur Kucing lebih Cepat & Tikus lebih Pelan, dan taruh blok Tabrakan di Tikus.
JANGAN bikin Kucing lebih pelan, atau lupa pasang blok Sembunyi (Hide) setelah bunyi!`,

  `Waktunya Misi Praktik Kejar-Kejaran Kucing & Tikus!
Klik ikon Kucing/Tikus di panel kiri untuk melihat kodenya, lalu klik Bendera Hijau untuk memainkan animasinya!`,

  `Hore! Kamu Master Game Kejar-Kejaran! 🎉
Selamat meraih Lencana Perancang Sebab-Akibat di Pertemuan 28!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 28 — Kejar-Kejaran Kucing & Tikus!',
  createdAt: '2026-11-16T14:32:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03SebabAkibat,
  Slide04SiapkanPanggung,
  Slide05KodeKucing,
  Slide06AyoTebak,
  Slide07KodeTikus,
  Slide08TipsKejar,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

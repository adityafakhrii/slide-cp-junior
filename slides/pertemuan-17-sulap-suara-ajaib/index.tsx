import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-17-sulap-suara-ajaib';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj17-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj17-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj17-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj17-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj17-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj17-wavebar {
  0%, 100% { transform: scaleY(0.45); }
  50% { transform: scaleY(1); }
}
@keyframes cpj17-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(244, 91, 73, 0.55); }
  50% { box-shadow: 0 0 0 12px rgba(244, 91, 73, 0); }
}
.cpj17-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj17-card-btn:hover {
  transform: translateY(-4px);
}
.cpj17-card-btn:active {
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

/** Play a tiny playful Web Audio "Pop!" bubble sound on mentor click */
function playPopChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(860, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
    setTimeout(() => {
      void ctx.close();
    }, 250);
  } catch {
    // Ignore audio context blocks
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
  accentDot = TEAL,
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
          animation: live ? 'cpj17-twinkle 2.8s ease-in-out infinite' : undefined,
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
              background: TEAL,
              border: `1.5px solid ${CHARCOAL}`,
              display: 'inline-block',
            }}
          />
          <span>CODEPOLITAN Junior • Level 1: Code Explorer</span>
        </span>
        <span>Pertemuan 17 • Sulap Suara Ajaib!</span>
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
  bgColor = TEAL_SOFT,
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
// Reusable Pertemuan 17 Visuals (Kucing Tic, Park Stage, Sound Blocks, Mic)
// ============================================================================

/** Kucing Tic SVG with optional speech bubble */
const TicCatSvg = ({
  size = 150,
  waving = false,
  speechBubble,
}: {
  size?: number;
  waving?: boolean;
  speechBubble?: string;
}) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
    {speechBubble && (
      <div
        style={{
          marginBottom: 6,
          padding: '7px 18px',
          borderRadius: 99,
          background: WHITE,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: `0 4px 0 ${CHARCOAL}`,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 21,
          fontWeight: 700,
          color: CHARCOAL,
          whiteSpace: 'nowrap',
        }}
      >
        {speechBubble}
      </div>
    )}
    <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
      <ellipse cx="70" cy="126" rx="34" ry="7" fill="rgba(30,30,44,0.14)" />
      <path
        d="M96 98 C118 96, 126 76, 114 66 C106 60, 100 68, 104 75 C106 80, 100 88, 92 88"
        fill={ORANGE}
        stroke={CHARCOAL}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <ellipse cx="56" cy="118" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
      <ellipse cx="84" cy="118" rx="11" ry="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.6} />
      <ellipse cx="70" cy="95" rx="27" ry="24" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
      <ellipse cx="70" cy="97" rx="16" ry="15" fill={SUNNY_SOFT} />
      <path
        d={waving ? 'M44 82 C26 74, 22 58, 30 52 C37 47, 45 58, 46 72' : 'M45 86 C32 90, 32 104, 42 104 C48 104, 50 96, 48 88'}
        fill={ORANGE}
        stroke={CHARCOAL}
        strokeWidth={3.8}
        strokeLinecap="round"
      />
      <path
        d="M94 86 C107 90, 107 104, 97 104 C91 104, 89 96, 91 88"
        fill={ORANGE}
        stroke={CHARCOAL}
        strokeWidth={3.8}
        strokeLinecap="round"
      />
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
  </div>
);

/** Sunny Playground Park Backdrop SVG */
const ParkPlaygroundSvg = ({
  width = 480,
  height = 240,
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <svg width={width} height={height} viewBox="0 0 480 240" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="480" height="240" fill="#DBEAFE" />
    <circle cx="422" cy="40" r="22" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M58 54 C58 44, 74 40, 82 48 C90 38, 112 42, 112 54 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.4} />
    <path d="M235 42 C235 34, 249 30, 255 37 C262 29, 281 32, 281 42 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.4} />
    <path d="M0 152 Q145 112 285 150 Q390 176 480 135 V240 H0 Z" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M0 180 Q180 156 340 185 Q420 198 480 174 V240 H0 Z" fill="#4ADE80" stroke={CHARCOAL} strokeWidth={2.8} />
    <rect x="44" y="96" width="20" height="72" rx="4" fill="#92400E" stroke={CHARCOAL} strokeWidth={2.8} />
    <circle cx="54" cy="76" r="36" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
    <circle cx="395" cy="198" r="7" fill={CORAL} stroke={CHARCOAL} strokeWidth={2} />
    <circle cx="395" cy="198" r="3" fill={SUNNY} />
    <circle cx="130" cy="204" r="7" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2} />
  </svg>
);

type SoundBlockKind = 'start-tap' | 'sound-pop' | 'sound-mic-btn' | 'sound-rec-1';

/** Chunky ScratchJr Block Renderer for Sound Blocks & Trigger */
const ScratchJrBlock = ({
  kind,
  scale = 1,
  activeGlow = false,
}: {
  kind: SoundBlockKind;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-tap';
  const fill = isTrigger ? SUNNY : TEAL;
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
        {kind === 'sound-mic-btn' ? (
          <rect
            x="10"
            y="14"
            width="120"
            height="92"
            rx="24"
            fill={TEAL}
            stroke={CHARCOAL}
            strokeWidth={5}
          />
        ) : (
          <path
            d={pathData}
            fill={fill}
            stroke={CHARCOAL}
            strokeWidth={5}
            strokeLinejoin="round"
          />
        )}

        {/* Yellow Start on Tap */}
        {kind === 'start-tap' && (
          <>
            <circle cx="56" cy="44" r="10.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
            <path d="M38 80 C38 60, 74 60, 74 80 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} strokeLinejoin="round" />
            <path
              d="M72 58 L92 73 L85 77 L95 90 L87 94 L77 81 L71 86 Z"
              fill={CORAL}
              stroke={CHARCOAL}
              strokeWidth={2.6}
              strokeLinejoin="round"
            />
          </>
        )}

        {/* Green Pop! Speaker */}
        {kind === 'sound-pop' && (
          <>
            <path d="M32 52 H46 L66 35 V83 L46 66 H32 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} strokeLinejoin="round" />
            <path d="M74 46 Q83 59 74 72" fill="none" stroke={SUNNY} strokeWidth={4.5} strokeLinecap="round" />
            <path d="M84 37 Q98 59 84 81" fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
            <rect x="64" y="75" width="46" height="22" rx="9" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.4} />
            <text
              x="87"
              y="91"
              textAnchor="middle"
              fill={CHARCOAL}
              fontSize="13"
              fontWeight="800"
              fontFamily="Fredoka, sans-serif"
            >
              POP!
            </text>
          </>
        )}

        {/* Green Microphone Record Button */}
        {kind === 'sound-mic-btn' && (
          <>
            <rect x="57" y="28" width="26" height="38" rx="13" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3.2} />
            <path d="M47 56 C47 74, 93 74, 93 56" fill="none" stroke={WHITE} strokeWidth={4.5} strokeLinecap="round" />
            <line x1="70" y1="70" x2="70" y2="88" stroke={WHITE} strokeWidth={4.5} strokeLinecap="round" />
            <line x1="55" y1="88" x2="85" y2="88" stroke={WHITE} strokeWidth={4.5} strokeLinecap="round" />
            <circle cx="103" cy="36" r="8" fill={CORAL} stroke={WHITE} strokeWidth={2.2} />
          </>
        )}

        {/* Green Recorded Sound Block "1" */}
        {kind === 'sound-rec-1' && (
          <>
            <rect x="46" y="31" width="24" height="36" rx="12" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.8} />
            <path d="M38 56 C38 71, 78 71, 78 56" fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
            <line x1="58" y1="68" x2="58" y2="83" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
            <circle cx="96" cy="48" r="17" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
            <text
              x="96"
              y="55"
              textAnchor="middle"
              fill={CHARCOAL}
              fontSize="20"
              fontWeight="800"
              fontFamily="Fredoka, sans-serif"
            >
              1
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

// ============================================================================
// SLIDE 01 — Sampul Pertemuan (Cover)
// ============================================================================
const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 17" accentDot={TEAL}>
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
            background: TEAL_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#065F46',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="music-note" size={24} />
          <span>LEVEL 1: CODE EXPLORER (USIA 5–7 TAHUN)</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 80,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: CHARCOAL,
          }}
        >
          Sulap
          <br />
          <Highlight>Suara Ajaib!</Highlight>
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
          Efek Bunyi &ldquo;Pop&rdquo; &amp; Rekam Suaraku agar Kucing Tic Bicara!
        </p>

        {/* Quick Pill Highlights */}
        <div style={{ ...row, gap: 18 }}>
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
            <JuniorIcon name="speaker" size={28} />
            <span>Bunyi &ldquo;Pop!&rdquo;</span>
          </div>
          <div
            style={{
              ...row,
              gap: 12,
              padding: '15px 26px',
              borderRadius: 20,
              background: WHITE,
              color: CHARCOAL,
              border: `3px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <JuniorIcon name="mic" size={28} />
            <span>Rekam Suaraku</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Soundwave Rounded Frame + Laptop Kucing Tic + Biko */}
      <div style={{ ...abs(980, 145, 845, 810), ...centerCol }}>
        {/* Sound Stadium Showcase Backdrop */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 690,
            borderRadius: '180px 180px 56px 56px',
            background: 'linear-gradient(155deg, #ECFDF5 0%, #FEF9C3 55%, #EFF6FF 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${TEAL}`,
            overflow: 'hidden',
          }}
        />

        {/* Floating Music Notes */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 115,
            top: 86,
            animation: live ? 'cpj17-twinkle 2.6s ease-in-out infinite' : undefined,
            zIndex: 2,
          }}
        >
          <JuniorIcon name="music-note" size={48} />
        </div>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 88,
            top: 102,
            animation: live ? 'cpj17-twinkle 3.1s ease-in-out infinite' : undefined,
            zIndex: 2,
          }}
        >
          <JuniorIcon name="sparkle" size={44} />
        </div>

        {/* Laptop Window with Talking Kucing Tic */}
        <div
          style={{
            position: 'absolute',
            right: 45,
            top: 185,
            width: 485,
            borderRadius: 24,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 8px 0 ${CHARCOAL}`,
            padding: 14,
            zIndex: 2,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ ...row, gap: 8, fontFamily: 'var(--osd-font-display)', fontSize: 18, fontWeight: 700 }}>
              <JuniorIcon name="cat" size={22} />
              <span>ScratchJr — Panggung Suara</span>
            </span>
            <JuniorIcon name="dot-green" size={22} />
          </div>

          <div style={{ height: 235, borderRadius: 16, border: `2.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
            <ParkPlaygroundSvg width="100%" height="100%" />
            <div style={{ position: 'absolute', left: 165, bottom: 16 }}>
              <TicCatSvg size={155} waving speechBubble="Halo, aku Tic!" />
            </div>
            <div style={{ position: 'absolute', left: 72, top: 38 }}>
              <JuniorIcon name="music-note" size={34} />
            </div>
            <div style={{ position: 'absolute', right: 66, top: 58 }}>
              <JuniorIcon name="music-note" size={30} />
            </div>
          </div>
        </div>

        {/* Biko with Golden Microphone */}
        <div
          style={{
            position: 'absolute',
            left: -8,
            bottom: 35,
            zIndex: 3,
            animation: live ? 'cpj17-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={345}
            badgeIcon={<JuniorIcon name="mic" size={24} />}
            speechBubble="Ayo bicara!"
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
    <JuniorFrame badge="MISI HARI INI" accentDot={TEAL}>
      <SlideTitle>
        Apa Misi Kita <Highlight>Hari Ini?</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1265}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Misi Suara Ajaib • Pertemuan 17"
        padding={36}
      >
        <div style={{ display: 'flex', gap: 32, height: '100%' }}>
          {/* Kartu Misi 1 (Aksen Hijau) */}
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
            <div
              style={{
                padding: '8px 22px',
                borderRadius: 99,
                background: TEAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              MISI 1
            </div>

            <div
              style={{
                width: 235,
                height: 195,
                borderRadius: 28,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...centerCol,
              }}
            >
              <ScratchJrBlock kind="sound-pop" scale={1.25} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              Pasang Efek Bunyi{' '}
              <span style={{ color: '#047857' }}>&ldquo;Pop!&rdquo;</span>
            </div>
          </div>

          {/* Kartu Misi 2 (Aksen Coral) */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: CORAL_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${CORAL}`,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                padding: '8px 22px',
                borderRadius: 99,
                background: CORAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              MISI 2
            </div>

            <div
              style={{
                width: 235,
                height: 195,
                borderRadius: 28,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 6px 0 ${CHARCOAL}`,
                ...centerCol,
                gap: 8,
              }}
            >
              <JuniorIcon name="mic" size={96} />
              <div style={{ ...row, gap: 6 }}>
                {[18, 30, 22, 36, 20].map((barH, idx) => (
                  <span
                    key={idx}
                    style={{
                      width: 8,
                      height: barH,
                      borderRadius: 99,
                      background: idx % 2 === 0 ? CORAL : SUNNY,
                      border: `1.8px solid ${CHARCOAL}`,
                      animation: live ? `cpj17-wavebar ${0.9 + idx * 0.14}s ease-in-out infinite` : undefined,
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700, lineHeight: 1.24 }}>
              <span style={{ color: '#B91C1C' }}>Rekam Suaraku</span> agar Tic Bicara!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Biko Mascot excitedly pointing to the 2 mission cards */}
      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj17-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="speaker" size={24} />}
          speechBubble="Seru banget!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Kenalan Sama Blok Hijau Suara!
// ============================================================================
const Slide03BlokHijau: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="BLOK AJAIB BARU" accentDot={TEAL}>
      <SlideTitle>
        Ini Namanya <Highlight>Blok Hijau!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Palette Category Highlighter + Biko */}
      <MacWindowCard
        left={X0}
        top={235}
        width={860}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="Palet ScratchJr — Kategori Suara"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Category Dots Row with Green Highlighted */}
          <div
            style={{
              padding: '18px 26px',
              borderRadius: 24,
              background: CREAM,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'space-around',
            }}
          >
            {(['dot-yellow', 'dot-blue', 'dot-purple'] as JuniorIconName[]).map((d) => (
              <div key={d} style={{ opacity: 0.45 }}>
                <JuniorIcon name={d} size={42} />
              </div>
            ))}
            <div
              style={{
                padding: '10px 18px',
                borderRadius: 99,
                background: TEAL_SOFT,
                border: `3.5px solid ${TEAL}`,
                boxShadow: `0 0 0 6px rgba(16,185,129,0.22)`,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="speaker" size={44} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: '#065F46' }}>
                SUARA!
              </span>
            </div>
            <div style={{ opacity: 0.45 }}>
              <JuniorIcon name="dot-red" size={42} />
            </div>
          </div>

          {/* Green Rack Showcase */}
          <div
            style={{
              padding: '26px 28px',
              borderRadius: 24,
              background: TEAL_SOFT,
              border: `3.5px solid ${TEAL}`,
              ...row,
              justifyContent: 'center',
              gap: 36,
            }}
          >
            <div style={{ ...centerCol, gap: 8 }}>
              <ScratchJrBlock kind="sound-pop" scale={1.3} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                Bunyi &ldquo;Pop!&rdquo;
              </span>
            </div>
            <div style={{ ...centerCol, gap: 8 }}>
              <ScratchJrBlock kind="sound-mic-btn" scale={1.3} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                Rekam Suara
              </span>
            </div>
          </div>

          {/* Biko Mascot pointing up at the Green Palette */}
          <div style={{ ...row, justifyContent: 'center', gap: 20 }}>
            <div style={{ animation: live ? 'cpj17-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot
                pose="thumbs-up"
                width={195}
                badgeIcon={<JuniorIcon name="dot-green" size={20} />}
                speechBubble="Klik tombol hijau!"
              />
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={1000}
        top={235}
        width={820}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Fungsi Blok Hijau"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="dot-green" bgColor={TEAL_SOFT} fontSize={34}>
              Rak balok khusus <strong>Suara &amp; Bunyi</strong>
            </BulletRow>
            <BulletRow icon="speaker" bgColor={SUNNY_SOFT} fontSize={34}>
              Bikin panggung jadi <strong>Ramai &amp; Seru!</strong>
            </BulletRow>
          </div>

          <div
            style={{
              padding: '24px 28px',
              borderRadius: 22,
              background: TEAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 18,
            }}
          >
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Cari tombol <strong>Hijau bergambar Speaker</strong> di bagian bawah layar ScratchJr ya!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Blok Hijau #1: Efek Bunyi "Pop!"
// ============================================================================
const Slide04EfekPop: Page = () => {
  const live = useIsActivePage();
  const [poppedTimes, setPoppedTimes] = useState(0);

  const handlePop = () => {
    playPopChime();
    setPoppedTimes((c) => c + 1);
  };

  return (
    <JuniorFrame badge="BLOK HIJAU #1" accentDot={TEAL}>
      <SlideTitle>
        Efek Bunyi <Highlight>&ldquo;Pop!&rdquo;</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Giant Pop Block + Jumping Tic Cat with Bubbles */}
      <MacWindowCard
        left={X0}
        top={235}
        width={820}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel='Blok Hijau • Bunyi "Pop!"'
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 28 }}>
            <button
              type="button"
              onClick={handlePop}
              className="cpj17-card-btn"
              style={{ background: 'transparent', border: 'none', padding: 0 }}
            >
              <ScratchJrBlock kind="sound-pop" scale={1.6} activeGlow={poppedTimes > 0} />
            </button>
            <div
              style={{
                padding: '16px 26px',
                borderRadius: 22,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: '#047857' }}>IKON SPEAKER:</div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 700 }}>
                Bunyi &ldquo;Pop!&rdquo;
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: MUTED }}>Klik blok untuk coba!</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePop}
            className="cpj17-card-btn"
            style={{
              width: '100%',
              height: 335,
              borderRadius: 24,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
              padding: 0,
            }}
          >
            <ParkPlaygroundSvg width="100%" height="100%" />

            {/* Floating Colorful Bubbles */}
            <div style={{ position: 'absolute', left: 95, top: 44, animation: live ? 'cpj17-float 2.6s ease-in-out infinite' : undefined }}>
              <JuniorIcon name="bubble" size={56} />
            </div>
            <div style={{ position: 'absolute', right: 90, top: 36, animation: live ? 'cpj17-float 3s ease-in-out infinite' : undefined }}>
              <JuniorIcon name="bubble" size={62} />
            </div>
            <div style={{ position: 'absolute', left: 165, bottom: 130 }}>
              <JuniorIcon name="sparkle" size={34} />
            </div>

            <div
              style={{
                position: 'absolute',
                left: 270,
                bottom: 18,
                animation: live ? 'cpj17-hop 2s ease-in-out infinite' : undefined,
              }}
            >
              <TicCatSvg size={175} waving speechBubble={poppedTimes > 0 ? `Pop! (${poppedTimes})` : 'Pop! Pop!'} />
            </div>
          </button>
        </div>
      </MacWindowCard>

      {/* Right Explanation Card */}
      <MacWindowCard
        left={960}
        top={235}
        width={860}
        height={720}
        titleBarColor={CREAM}
        headerLabel='Mengenal Efek "Pop!"'
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="bubble" bgColor={SKY_SOFT} fontSize={34}>
              Bunyi lucu seperti <strong>Gelembung Pecah!</strong>
            </BulletRow>
            <BulletRow icon="sparkle" bgColor={SUNNY_SOFT} fontSize={34}>
              Tinggal geser blok <strong>&ldquo;Pop&rdquo;</strong> ke area kode!
            </BulletRow>
          </div>

          <button
            type="button"
            onClick={handlePop}
            className="cpj17-card-btn"
            style={{
              padding: '20px 28px',
              borderRadius: 22,
              background: TEAL,
              color: WHITE,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 28,
              fontWeight: 700,
              ...row,
              justifyContent: 'center',
              gap: 14,
            }}
          >
            <JuniorIcon name="speaker" size={34} />
            <span>Dengar Bunyi &ldquo;Pop!&rdquo;</span>
          </button>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Blok Hijau #2: Merekam Suaraku Sendiri!
// ============================================================================
const Slide05RekamSuara: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="BLOK HIJAU #2" accentDot={CORAL}>
      <SlideTitle>
        Yuk <Highlight>Rekam Suaramu!</Highlight>
      </SlideTitle>

      {/* Left Explanation Card */}
      <MacWindowCard
        left={X0}
        top={235}
        width={860}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Suara Asli Anak Hebat!"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 38, marginTop: 12 }}>
            <BulletRow icon="mic" bgColor={TEAL_SOFT} fontSize={34}>
              Klik tombol <strong>Mikrofon Hijau</strong> di rak blok
            </BulletRow>
            <BulletRow icon="speak" bgColor={SUNNY_SOFT} fontSize={34}>
              Ucapkan kata lucu untuk <strong>Kucing Tic!</strong>
            </BulletRow>
          </div>

          <div
            style={{
              padding: '24px 28px',
              borderRadius: 22,
              background: CORAL_SOFT,
              border: `3px solid ${CHARCOAL}`,
              ...row,
              gap: 18,
            }}
          >
            <JuniorIcon name="music-note" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Kamu bisa rekam salam <strong>&ldquo;Halo, aku Tic!&rdquo;</strong> atau tawa lucumu sendiri!
            </div>
          </div>
        </div>
      </MacWindowCard>

      {/* Right Spotlight Visual: Mic Button + Biko Speaking with Soundwaves */}
      <MacWindowCard
        left={1000}
        top={235}
        width={820}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="Tombol Mikrofon ScratchJr"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 28 }}>
            <ScratchJrBlock kind="sound-mic-btn" scale={1.55} />
            <div
              style={{
                padding: '16px 26px',
                borderRadius: 22,
                background: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: '#047857' }}>TOMBOL BARU:</div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
                Mikrofon Hijau
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: MUTED }}>Klik untuk mulai rekam!</div>
            </div>
          </div>

          {/* Biko speaking warmly with colorful soundwave bars */}
          <div
            style={{
              width: '100%',
              height: 335,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #EFF6FF 0%, #FEF9C3 100%)',
              border: `3.5px solid ${CHARCOAL}`,
              ...row,
              justifyContent: 'space-around',
              padding: '0 28px',
            }}
          >
            <div style={{ animation: live ? 'cpj17-float 3s ease-in-out infinite' : undefined }}>
              <BikoMascot
                pose="wave"
                width={230}
                badgeIcon={<JuniorIcon name="mic" size={20} />}
                speechBubble="Halo Tic!"
              />
            </div>

            {/* Colorful Animated Soundwaves */}
            <div style={{ ...centerCol, gap: 14 }}>
              <div style={{ ...row, gap: 12, height: 110, alignItems: 'center' }}>
                {[38, 76, 102, 62, 92, 46, 80].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      width: 14,
                      height: h,
                      borderRadius: 99,
                      background: [TEAL, SUNNY, CORAL, SKY, LAVENDER, TEAL, SUNNY][i],
                      border: `2.5px solid ${CHARCOAL}`,
                      animation: live ? `cpj17-wavebar ${0.75 + i * 0.11}s ease-in-out infinite` : undefined,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  padding: '8px 20px',
                  borderRadius: 99,
                  background: WHITE,
                  border: `2.5px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                Suaramu masuk ke laptop!
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Pilih Tombol yang Benar!
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1600} top={128} size={54}>
        Tombol Mana untuk <Highlight>Merekam Suara?</Highlight>
      </SlideTitle>

      {/* Choice Cards */}
      <div style={{ ...abs(190, 255, 1540, 445), display: 'flex', gap: 56 }}>
        {/* Kartu A (Salah: Speaker Pop) */}
        <button
          type="button"
          onClick={() => setPicked('A')}
          className="cpj17-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'A' ? CORAL_SOFT : WHITE,
            border: `4px solid ${picked === 'A' ? CORAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'A' ? CORAL : CHARCOAL}`,
            padding: 32,
            ...centerCol,
            gap: 20,
            position: 'relative',
            animation: picked === 'A' ? 'cpj17-shake 0.35s ease' : undefined,
          }}
        >
          <div
            style={{
              ...abs(26, 24),
              padding: '6px 18px',
              borderRadius: 99,
              background: SUNNY_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            PILIHAN A
          </div>

          <div style={{ marginTop: 18 }}>
            <ScratchJrBlock kind="sound-pop" scale={1.7} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Bunyi Pop
          </div>

          {picked === 'A' && (
            <div
              style={{
                ...row,
                gap: 10,
                padding: '8px 22px',
                borderRadius: 99,
                background: CORAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Itu bunyi gelembung Pop!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Benar: Mikrofon Rekam Suara) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj17-card-btn"
          style={{
            flex: 1,
            borderRadius: 32,
            background: picked === 'B' ? TEAL_SOFT : WHITE,
            border: `4px solid ${picked === 'B' ? TEAL : CHARCOAL}`,
            boxShadow: `0 10px 0 ${picked === 'B' ? TEAL : CHARCOAL}`,
            padding: 32,
            ...centerCol,
            gap: 20,
            position: 'relative',
          }}
        >
          <div
            style={{
              ...abs(26, 24),
              padding: '6px 18px',
              borderRadius: 99,
              background: TEAL_SOFT,
              border: `2.5px solid ${CHARCOAL}`,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            PILIHAN B
          </div>

          <div style={{ marginTop: 18 }}>
            <ScratchJrBlock kind="sound-mic-btn" scale={1.7} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 700, color: CHARCOAL }}>
            Rekam Suara
          </div>

          {picked === 'B' && (
            <div
              style={{
                ...row,
                gap: 10,
                padding: '8px 22px',
                borderRadius: 99,
                background: TEAL,
                color: WHITE,
                border: `2.5px solid ${CHARCOAL}`,
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              <JuniorIcon name="check" size={24} />
              <span>Benar! Ikon Mikrofon untuk merekam suara!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Center Prompt + Biko holding Question Sign */}
      <div style={{ ...abs(190, 725, 1540, 280), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj17-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={230}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'B' ? 'Pintar!' : 'Tebak yuk!'}
          />
        </div>

        <div
          style={{
            padding: '22px 36px',
            borderRadius: 26,
            background: WHITE,
            border: `3.5px solid ${CHARCOAL}`,
            boxShadow: `0 7px 0 ${CHARCOAL}`,
            ...row,
            gap: 20,
          }}
        >
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background: SUNNY,
              border: `3px solid ${CHARCOAL}`,
              ...centerCol,
            }}
          >
            <JuniorIcon name="question" size={38} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700, color: CHARCOAL }}>
            Tunjuk tombol yang benar di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Jurus Rekam Suara: 3 Tombol Ajaib!
// ============================================================================
const Slide07JurusMikrofon: Page = () => {
  const live = useIsActivePage();
  const [recStep, setRecStep] = useState<1 | 2 | 3>(1);

  return (
    <JuniorFrame badge="JURUS MIKROFON" accentDot={CORAL}>
      <SlideTitle>
        Cara <Highlight>Rekam &amp; Simpan</Highlight> Suara!
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={230}
        width={1720}
        height={735}
        titleBarColor={CREAM}
        headerLabel="Jendela Perekam Suara ScratchJr"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* 3 Sequential Steps */}
          <div style={{ display: 'flex', gap: 28 }}>
            <button
              type="button"
              onClick={() => setRecStep(1)}
              className="cpj17-card-btn"
              style={{
                flex: 1,
                borderRadius: 22,
                background: CORAL_SOFT,
                border: `4px solid ${recStep === 1 ? CORAL : CHARCOAL}`,
                boxShadow: `0 6px 0 ${CORAL}`,
                padding: '20px 24px',
                ...row,
                gap: 18,
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background: CORAL,
                  color: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 30,
                  fontWeight: 700,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                1
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="dot-red" size={28} style={{ marginRight: 8 }} />
                Tekan <strong>Bulat Merah</strong> lalu bicara!
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRecStep(2)}
              className="cpj17-card-btn"
              style={{
                flex: 1,
                borderRadius: 22,
                background: SUNNY_SOFT,
                border: `4px solid ${recStep === 2 ? SUNNY : CHARCOAL}`,
                boxShadow: `0 6px 0 ${SUNNY}`,
                padding: '20px 24px',
                ...row,
                gap: 18,
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background: SUNNY,
                  color: CHARCOAL,
                  border: `3px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 30,
                  fontWeight: 700,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                2
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="play" size={28} style={{ marginRight: 8 }} />
                Tekan <strong>Segitiga</strong> untuk dengar suaramu
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRecStep(3)}
              className="cpj17-card-btn"
              style={{
                flex: 1,
                borderRadius: 22,
                background: TEAL_SOFT,
                border: `4px solid ${recStep === 3 ? TEAL : CHARCOAL}`,
                boxShadow: `0 6px 0 ${TEAL}`,
                padding: '20px 24px',
                ...row,
                gap: 18,
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background: TEAL,
                  color: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 30,
                  fontWeight: 700,
                  ...centerCol,
                  flexShrink: 0,
                }}
              >
                3
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="check" size={28} style={{ marginRight: 8 }} />
                Tekan <strong>Centang</strong> -&gt; Blok <strong>Mikrofon 1</strong>!
              </div>
            </button>
          </div>

          {/* Voice Recorder Window Illustration */}
          <div
            style={{
              height: 410,
              borderRadius: 28,
              background: '#EEF2FF',
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 8px 0 ${CHARCOAL}`,
              padding: '26px 40px',
              ...row,
              justifyContent: 'space-between',
              gap: 36,
            }}
          >
            {/* Left Side: ScratchJr Voice Recorder Controls */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
              {/* Waveform Display */}
              <div
                style={{
                  width: '100%',
                  height: 120,
                  borderRadius: 22,
                  background: WHITE,
                  border: `3px solid ${CHARCOAL}`,
                  ...row,
                  justifyContent: 'center',
                  gap: 14,
                  padding: '0 24px',
                }}
              >
                <JuniorIcon name="mic" size={44} />
                <div style={{ ...row, gap: 10, height: 70, alignItems: 'center' }}>
                  {[24, 52, 68, 40, 62, 34, 68, 48, 28, 56, 42].map((h, i) => (
                    <span
                      key={i}
                      style={{
                        width: 12,
                        height: h,
                        borderRadius: 99,
                        background: recStep === 1 ? CORAL : recStep === 2 ? SUNNY : TEAL,
                        border: `2px solid ${CHARCOAL}`,
                        animation:
                          live && recStep !== 3
                            ? `cpj17-wavebar ${0.7 + i * 0.08}s ease-in-out infinite`
                            : undefined,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* 4 Recorder Buttons: Record (Red Circle), Stop (Gray Square), Play (Yellow Triangle), Check (Green Check) */}
              <div style={{ ...row, gap: 26 }}>
                <button
                  type="button"
                  onClick={() => setRecStep(1)}
                  className="cpj17-card-btn"
                  style={{
                    width: 102,
                    height: 102,
                    borderRadius: 99,
                    background: WHITE,
                    border: `4px solid ${recStep === 1 ? CORAL : CHARCOAL}`,
                    boxShadow: `0 6px 0 ${CHARCOAL}`,
                    ...centerCol,
                    animation: live && recStep === 1 ? 'cpj17-pulse 1.5s ease-in-out infinite' : undefined,
                  }}
                >
                  <span
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 99,
                      background: CORAL,
                      border: `3px solid ${CHARCOAL}`,
                      display: 'block',
                    }}
                  />
                </button>

                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 24,
                    background: WHITE,
                    border: `3.5px solid ${CHARCOAL}`,
                    boxShadow: `0 6px 0 ${CHARCOAL}`,
                    ...centerCol,
                  }}
                >
                  <span
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 8,
                      background: '#64748B',
                      border: `3px solid ${CHARCOAL}`,
                      display: 'block',
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setRecStep(2)}
                  className="cpj17-card-btn"
                  style={{
                    width: 102,
                    height: 102,
                    borderRadius: 24,
                    background: WHITE,
                    border: `4px solid ${recStep === 2 ? SUNNY : CHARCOAL}`,
                    boxShadow: `0 6px 0 ${CHARCOAL}`,
                    ...centerCol,
                  }}
                >
                  <JuniorIcon name="play" size={50} />
                </button>

                <button
                  type="button"
                  onClick={() => setRecStep(3)}
                  className="cpj17-card-btn"
                  style={{
                    width: 102,
                    height: 102,
                    borderRadius: 24,
                    background: TEAL_SOFT,
                    border: `4px solid ${recStep === 3 ? TEAL : CHARCOAL}`,
                    boxShadow: `0 6px 0 ${CHARCOAL}`,
                    ...centerCol,
                  }}
                >
                  <JuniorIcon name="check" size={52} />
                </button>
              </div>
            </div>

            {/* Arrow + Resulting Green Block #1 */}
            <div style={{ ...centerCol, gap: 14 }}>
              <JuniorIcon name="arrow-right" size={58} />
            </div>

            <div
              style={{
                width: 390,
                height: 310,
                borderRadius: 26,
                background: WHITE,
                border: `3.5px solid ${TEAL}`,
                boxShadow: `0 6px 0 ${TEAL}`,
                ...centerCol,
                gap: 16,
                padding: 20,
              }}
            >
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: '#047857' }}>
                Muncul Balok Baru!
              </div>
              <ScratchJrBlock kind="sound-rec-1" scale={1.45} activeGlow={recStep === 3} />
              <div style={{ fontSize: 21, fontWeight: 700, color: MUTED }}>Blok Rekaman Suara 1</div>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Sulap Suara (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsSuara: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="TIPS JAGOAN SUARA" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Suara <Highlight>Jelas &amp; Seru!</Highlight>
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
            <div
              style={{
                padding: '10px 26px',
                borderRadius: 99,
                background: TEAL,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 4px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="check" size={28} />
              <span>BOLEH</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BulletRow icon="happy" bgColor={TEAL_SOFT} fontSize={30}>
              Bicara dengan <strong>Suara Jelas &amp; Ceria</strong>
            </BulletRow>
            <BulletRow icon="check" bgColor={SUNNY_SOFT} fontSize={30}>
              Tekan <strong>Centang</strong> setelah selesai rekam
            </BulletRow>
          </div>

          <div
            style={{
              height: 245,
              borderRadius: 22,
              background: TEAL_SOFT,
              border: `3.5px solid ${TEAL}`,
              ...row,
              justifyContent: 'space-around',
              padding: '0 24px',
            }}
          >
            <BikoMascot
              pose="thumbs-up"
              width={185}
              badgeIcon={<JuniorIcon name="mic" size={18} />}
              speechBubble="Halo teman-teman!"
            />
            <div style={{ ...centerCol, gap: 12 }}>
              <div style={{ ...row, gap: 10, height: 70, alignItems: 'center' }}>
                {[30, 52, 42, 58, 36].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      width: 12,
                      height: h,
                      borderRadius: 99,
                      background: TEAL,
                      border: `2px solid ${CHARCOAL}`,
                    }}
                  />
                ))}
              </div>
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: '#065F46' }}>
                Jelas &amp; Merdu!
              </div>
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
            <div
              style={{
                padding: '10px 26px',
                borderRadius: 99,
                background: CORAL,
                color: WHITE,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 4px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 700,
                ...row,
                gap: 10,
              }}
            >
              <JuniorIcon name="cross" size={28} />
              <span>JANGAN</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BulletRow icon="speaker" bgColor={CORAL_SOFT} fontSize={30}>
              <strong>Berteriak Terlalu Keras</strong> ke laptop
            </BulletRow>
            <BulletRow icon="mute" bgColor={SUNNY_SOFT} fontSize={30}>
              <strong>Diam Saja</strong> saat tombol merah menyala
            </BulletRow>
          </div>

          <div
            style={{
              height: 245,
              borderRadius: 22,
              background: CORAL_SOFT,
              border: `3.5px solid ${CORAL}`,
              ...row,
              justifyContent: 'space-around',
              padding: '0 24px',
            }}
          >
            <div style={{ animation: live ? 'cpj17-shake 1.4s ease-in-out infinite' : undefined }}>
              <JuniorIcon name="speaker" size={115} />
            </div>
            <div style={{ ...centerCol, gap: 10 }}>
              <JuniorIcon name="cross" size={62} />
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: '#991B1B' }}>
                Jangan teriak atau diam ya!
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Buat Kucing Tic Bicara!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [runStep, setRunStep] = useState<'idle' | 'tap' | 'voice' | 'pop'>('idle');

  useEffect(() => {
    if (runStep === 'idle') return;
    if (runStep === 'tap') {
      const t = setTimeout(() => setRunStep('voice'), 500);
      return () => clearTimeout(t);
    }
    if (runStep === 'voice') {
      const t = setTimeout(() => {
        playPopChime();
        setRunStep('pop');
      }, 1100);
      return () => clearTimeout(t);
    }
    if (runStep === 'pop') {
      const t = setTimeout(() => setRunStep('idle'), 1200);
      return () => clearTimeout(t);
    }
  }, [runStep]);

  return (
    <JuniorFrame badge="AYO MAIN & PRAKTIK!" accentDot={SKY}>
      <SlideTitle>
        Misi <Highlight>Kucing Tic Bicara!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal Mission Step Blocks */}
      <div style={{ ...abs(X0, 232, W, 175), display: 'flex', gap: 28 }}>
        {[
          {
            num: '1',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'start-tap' as JuniorIconName,
            text: (
              <>
                Pasang <strong>Sentuh Karakter</strong> / Bendera
              </>
            ),
          },
          {
            num: '2',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'mic' as JuniorIconName,
            text: (
              <>
                Rekam: <strong>&ldquo;Halo, namaku Tic!&rdquo;</strong>
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'dot-green' as JuniorIconName,
            text: (
              <>
                Tempel <strong>Suara 1</strong> &amp; <strong>&ldquo;Pop!&rdquo;</strong>
              </>
            ),
          },
        ].map((step) => (
          <div
            key={step.num}
            style={{
              flex: 1,
              borderRadius: 24,
              background: step.bg,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${CHARCOAL}`,
              padding: '20px 24px',
              ...row,
              gap: 18,
            }}
          >
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: 20,
                background: step.badgeBg,
                color: step.badgeText,
                border: `3px solid ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 32,
                fontWeight: 700,
                ...centerCol,
                flexShrink: 0,
              }}
            >
              {step.num}
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.28 }}>
              <JuniorIcon name={step.icon} size={30} style={{ marginRight: 8 }} />
              {step.text}
            </div>
          </div>
        ))}
      </div>

      {/* ScratchJr Practice Window + Cheering Biko */}
      <MacWindowCard
        left={X0}
        top={435}
        width={1260}
        height={530}
        titleBarColor={WHITE}
        headerLabel="Simulasi Kucing Tic Bicara — Klik Kucing Tic!"
        padding={26}
      >
        <div style={{ display: 'flex', gap: 28, height: '100%', alignItems: 'center' }}>
          {/* Interactive Playground Stage */}
          <button
            type="button"
            onClick={() => setRunStep('tap')}
            className="cpj17-card-btn"
            style={{
              width: 575,
              height: 410,
              borderRadius: 22,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              position: 'relative',
              overflow: 'hidden',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <ParkPlaygroundSvg width="100%" height="100%" />

            {runStep === 'pop' && (
              <>
                <div style={{ position: 'absolute', left: 100, top: 65 }}>
                  <JuniorIcon name="bubble" size={58} />
                </div>
                <div style={{ position: 'absolute', right: 90, top: 55 }}>
                  <JuniorIcon name="sparkle" size={48} />
                </div>
              </>
            )}

            <div
              style={{
                position: 'absolute',
                left: 200,
                bottom: 24,
                transform: runStep === 'pop' ? 'translateY(-14px) scale(1.06)' : undefined,
                transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <TicCatSvg
                size={185}
                waving
                speechBubble={
                  runStep === 'voice'
                    ? 'Halo, namaku Tic!'
                    : runStep === 'pop'
                      ? 'Pop!'
                      : 'Klik Aku!'
                }
              />
            </div>
          </button>

          {/* Code Tray */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                padding: '12px 20px',
                borderRadius: 16,
                background: TEAL_SOFT,
                border: `2.5px solid ${CHARCOAL}`,
                ...row,
                gap: 12,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              <JuniorIcon name="cat" size={28} />
              <span>Kode untuk Kucing Tic:</span>
            </div>

            <div
              style={{
                padding: '24px 18px',
                borderRadius: 22,
                background: CREAM,
                border: `3px solid ${CHARCOAL}`,
                ...row,
                justifyContent: 'center',
              }}
            >
              <ScratchJrBlock kind="start-tap" scale={1.18} activeGlow={runStep === 'tap'} />
              <div style={{ marginLeft: -14 }}>
                <ScratchJrBlock kind="sound-rec-1" scale={1.18} activeGlow={runStep === 'voice'} />
              </div>
              <div style={{ marginLeft: -14 }}>
                <ScratchJrBlock kind="sound-pop" scale={1.18} activeGlow={runStep === 'pop'} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setRunStep('tap')}
              className="cpj17-card-btn"
              style={{
                padding: '16px 24px',
                borderRadius: 20,
                background: SUNNY,
                border: `3px solid ${CHARCOAL}`,
                boxShadow: `0 5px 0 ${CHARCOAL}`,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 25,
                fontWeight: 700,
                ...row,
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <JuniorIcon name="tap" size={28} />
              <span>Klik Kucing Tic Sekarang!</span>
            </button>
          </div>
        </div>
      </MacWindowCard>

      {/* Cheering Biko on Right */}
      <div
        style={{
          ...abs(1400, 445, 430, 520),
          ...centerCol,
          animation: live ? 'cpj17-hop 2.4s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="thumbs-up"
          width={360}
          badgeIcon={<JuniorIcon name="music-note" size={24} />}
          speechBubble="Suaramu keren!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 17 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      {/* Floating Confetti & Music Notes */}
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj17-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj17-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="music-note" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj17-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1450} top={122} size={62}>
        Hore! Kucing Tic <Highlight>Bisa Bicara!</Highlight>{' '}
        <JuniorIcon name="party" size={54} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 17"
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
          {/* Bespoke Golden Champion Medal SVG: Star Microphone + Music Notes */}
          <div style={{ animation: live ? 'cpj17-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Center Golden Microphone */}
              <rect x="104" y="62" width="32" height="52" rx="16" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} />
              <path d="M90 100 C90 124, 150 124, 150 100" fill="none" stroke={CHARCOAL} strokeWidth={4.5} strokeLinecap="round" />
              <line x1="120" y1="118" x2="120" y2="142" stroke={CHARCOAL} strokeWidth={4.5} strokeLinecap="round" />
              <line x1="100" y1="142" x2="140" y2="142" stroke={CHARCOAL} strokeWidth={4.5} strokeLinecap="round" />
              {/* Star on Microphone */}
              <path
                d="M120 74 L123 82 L132 84 L125 89 L127 97 L120 92 L113 97 L115 89 L108 84 L117 82 Z"
                fill={SUNNY}
                stroke={CHARCOAL}
                strokeWidth={2}
                strokeLinejoin="round"
              />
              {/* Musical Notes Left & Right */}
              <path d="M72 92 V70 L84 67 V87" fill="none" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="69" cy="94" r="5.5" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.4} />
              <path d="M164 96 V74 L176 71 V91" fill="none" stroke={CHARCOAL} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="161" cy="98" r="5.5" fill={LAVENDER} stroke={CHARCOAL} strokeWidth={2.4} />
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
              fontSize: 34,
              fontWeight: 700,
              ...row,
              gap: 12,
            }}
          >
            <JuniorIcon name="medal" size={34} />
            <span>Lencana Pesulap Suara Ajaib</span>
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
            Kamu sudah jago memakai{' '}
            <Highlight color="#D1FAE5">Efek &ldquo;Pop!&rdquo; &amp; Merekam Suara Sendiri!</Highlight>
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="mic" size={22} />}
            speechBubble="Keren!"
          />
          <div style={{ animation: live ? 'cpj17-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
            <TicCatSvg size={185} waving speechBubble="Hore!" />
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
  `Selamat datang di Pertemuan 17 — Sulap Suara Ajaib! 🎙️
Hari ini kita akan membuat Kucing Tic bersuara dengan blok Hijau "Pop!" dan rekaman suara anak-anak sendiri!`,

  `Dua misi seru hari ini:
1. Memasang blok efek bunyi "Pop!".
2. Merekam suara sendiri agar Kucing Tic bisa menyapa dan berbicara!`,

  `Kenalan sama Blok Hijau (Sound):
Ajak anak-anak mencari lingkaran kategori berwarna Hijau bergambar Speaker di palet ScratchJr.`,

  `Blok Hijau #1 — Efek Bunyi "Pop!":
Bunyi lucu seperti gelembung pecah! Klik tombol Pop di slide untuk memperdengarkan contoh bunyi Pop kepada anak-anak.`,

  `Blok Hijau #2 — Merekam Suara Sendiri:
Klik ikon Mikrofon di rak blok hijau untuk membuka jendela perekam suara, lalu ucapkan kata sapaan yang ceria!`,

  `Permainan Cepat! Ayo tebak bersama:
Tombol mana untuk merekam suara sendiri — Pilihan A (Speaker Pop) atau Pilihan B (Mikrofon)?`,

  `Jurus 3 Tombol Ajaib Perekam Suara:
1. Tekan Bulat Merah lalu bicara. 2. Tekan Segitiga untuk mendengar hasil rekaman. 3. Tekan Centang Hijau — nanti muncul Blok Mikrofon angka 1!`,

  `Tips Jagoan Sulap Suara:
BOLEH bicara dengan suara jelas dan ceria lalu tekan Centang.
JANGAN berteriak terlalu keras ke laptop atau diam saja saat tombol merah menyala!`,

  `Waktunya Misi Praktik Kucing Tic Bicara:
1. Pasang Sentuh Karakter atau Bendera Hijau. 2. Rekam suaramu: "Halo, namaku Tic!". 3. Tempel Blok Suara 1 + Pop lalu klik Kucing Tic!`,

  `Hebat sekali untuk semua Pesulap Suara Ajaib! 🎉
Kalian berhasil membuat Kucing Tic bicara dan meraih Lencana Pesulap Suara Ajaib di Pertemuan 17!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 17 — Sulap Suara Ajaib!',
  createdAt: '2026-11-14T16:02:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BlokHijau,
  Slide04EfekPop,
  Slide05RekamSuara,
  Slide06AyoTebak,
  Slide07JurusMikrofon,
  Slide08TipsSuara,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import { BikoMascot } from '../../components/BikoMascot';
import { JuniorIcon, type JuniorIconName } from '../../components/JuniorIcons';

// ============================================================================
// Webfont Loading & Scoped Keyframe Styles (loaded once in <head>)
// ============================================================================
const SLIDE_ID = 'pertemuan-29-rahasia-amplop-pesan-ajaib';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
@keyframes cpj29-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-9px); }
}
@keyframes cpj29-hop {
  0%, 100% { transform: translateY(0px) scale(1); }
  45% { transform: translateY(-14px) scale(1.04); }
}
@keyframes cpj29-twinkle {
  0%, 100% { opacity: 0.92; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.45; transform: scale(0.84) rotate(12deg); }
}
@keyframes cpj29-confetti {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(18deg); }
}
@keyframes cpj29-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px) rotate(-3deg); }
  75% { transform: translateX(7px) rotate(3deg); }
}
@keyframes cpj29-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 146, 60, 0.85); }
  50% { box-shadow: 0 0 0 14px rgba(251, 146, 60, 0); }
}
@keyframes cpj29-fly-mail {
  0% { transform: translate(0px, 0px) scale(0.85); opacity: 0.4; }
  45% { transform: translate(95px, -48px) scale(1.15); opacity: 1; }
  100% { transform: translate(190px, -18px) scale(0.95); opacity: 0; }
}
.cpj29-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj29-card-btn:hover {
  transform: translateY(-4px);
}
.cpj29-card-btn:active {
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

/** Gentle magic chime when an envelope message is sent & received */
function playEnvelopeChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    [523.25, 659.25].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + i * 0.08;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.2, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.24);
    });
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
const ORANGE_SOFT = '#FFF7ED';

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
          animation: live ? 'cpj29-twinkle 2.8s ease-in-out infinite' : undefined,
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
        <span>Pertemuan 29 • Rahasia Amplop Pesan Ajaib!</span>
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
// Reusable Pertemuan 29 Visuals (Envelopes, Arrow Control Button, Park, Tic)
// ============================================================================

const ArrowControlBtnSvg = ({ size = 76 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 90 90" fill="none">
    <circle cx="45" cy="45" r="39" fill={TEAL} stroke={CHARCOAL} strokeWidth={4.5} />
    <circle cx="45" cy="45" r="31" fill="none" stroke={WHITE} strokeWidth={2.5} opacity={0.45} />
    <path
      d="M25 39 H48 V27 L67 45 L48 63 V51 H25 Z"
      fill={WHITE}
      stroke={CHARCOAL}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />
  </svg>
);

const ParkGardenBackdropSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 520 260" preserveAspectRatio="none" fill="none" style={{ display: 'block' }}>
    <rect x="0" y="0" width="520" height="260" fill="#DBEAFE" />
    <circle cx="456" cy="40" r="22" fill={SUNNY} stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M56 54 C56 44, 72 40, 80 48 C88 38, 110 42, 110 54 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.4} />
    <path d="M0 166 Q160 132 310 168 Q420 192 520 154 V260 H0 Z" fill="#86EFAC" stroke={CHARCOAL} strokeWidth={2.8} />
    <path d="M0 198 Q195 178 520 196 V260 H0 Z" fill="#4ADE80" stroke={CHARCOAL} strokeWidth={2.6} />
    <rect x="40" y="106" width="18" height="68" rx="4" fill="#92400E" stroke={CHARCOAL} strokeWidth={2.8} />
    <circle cx="49" cy="88" r="34" fill={TEAL} stroke={CHARCOAL} strokeWidth={3} />
  </svg>
);

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

type EnvelopeColor = 'orange' | 'blue' | 'red' | 'green';

const ENV_HEX: Record<EnvelopeColor, string> = {
  orange: ORANGE,
  blue: SKY,
  red: CORAL,
  green: TEAL,
};

type MailBlockKind = 'start-tap' | 'send-msg' | 'recv-msg' | 'move-right';

const ScratchJrBlock = ({
  kind,
  envColor = 'orange',
  num = 2,
  scale = 1,
  activeGlow = false,
}: {
  kind: MailBlockKind;
  envColor?: EnvelopeColor;
  num?: number;
  scale?: number;
  activeGlow?: boolean;
}) => {
  const isTrigger = kind === 'start-tap' || kind === 'recv-msg';
  const fill = isTrigger ? SUNNY : kind === 'send-msg' ? SUNNY : SKY;
  const w = Math.round(134 * scale);
  const h = Math.round(118 * scale);

  const pathData = isTrigger
    ? 'M30 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H24 C14 106 8 98 8 88 V38 C8 25 18 16 30 16 Z'
    : 'M14 16 H110 C118 16 124 22 124 30 V48 C134 48 134 74 124 74 V92 C124 100 118 106 110 106 H14 V74 C24 74 24 48 14 48 V16 Z';

  const mailHex = ENV_HEX[envColor];

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter: activeGlow ? 'drop-shadow(0 0 12px rgba(251, 146, 60, 0.95))' : undefined,
        transform: activeGlow ? 'scale(1.07)' : 'scale(1)',
        transition: 'transform 180ms ease, filter 180ms ease',
      }}
    >
      <svg width={w} height={h} viewBox="0 0 140 120">
        <path d={pathData} fill={fill} stroke={CHARCOAL} strokeWidth={5} strokeLinejoin="round" />

        {kind === 'start-tap' && (
          <>
            <circle cx="56" cy="44" r="10.5" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} />
            <path d="M38 80 C38 60, 74 60, 74 80 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2.6} strokeLinejoin="round" />
            <path d="M72 58 L92 73 L85 77 L95 90 L87 94 L77 81 L71 86 Z" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.6} strokeLinejoin="round" />
          </>
        )}

        {kind === 'send-msg' && (
          <>
            <rect x="30" y="38" width="76" height="48" rx="8" fill={mailHex} stroke={CHARCOAL} strokeWidth={3.5} />
            <path d="M32 41 L68 65 L104 41" fill="none" stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
          </>
        )}

        {kind === 'recv-msg' && (
          <>
            <path d="M32 50 L68 25 L104 50 V88 H32 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
            <rect x="46" y="38" width="44" height="28" rx="4" fill={SUNNY_SOFT} stroke={CHARCOAL} strokeWidth={2.5} />
            <path d="M32 50 L68 72 L104 50 V88 H32 Z" fill={mailHex} stroke={CHARCOAL} strokeWidth={3.5} strokeLinejoin="round" />
          </>
        )}

        {kind === 'move-right' && (
          <path d="M36 52 H72 V37 L102 60 L72 83 V68 H36 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={3.2} strokeLinejoin="round" />
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

/** Authentic ScratchJr Tablet Interface for Remote Control Arrow Button + Kucing Tic */
const AuthenticScratchJrRemoteUI = ({
  stepIndex,
  flyingMail,
  selectedChar = 'button',
  onSelectChar,
  onPressRemote,
  onReset,
  width = 880,
  height = 540,
}: {
  stepIndex: number;
  flyingMail: boolean;
  selectedChar?: 'button' | 'cat';
  onSelectChar?: (c: 'button' | 'cat') => void;
  onPressRemote?: () => void;
  onReset?: () => void;
  width?: number | string;
  height?: number | string;
}) => {
  const catLeft = `${Math.min(72, 22 + stepIndex * 14)}%`;

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
            className="cpj29-card-btn"
            title="Reset Posisi"
            style={{ width: 38, height: 36, borderRadius: 10, background: WHITE, border: `2px solid ${CHARCOAL}`, ...centerCol, padding: 0 }}
          >
            <JuniorIcon name="reset" size={22} />
          </button>
          <div style={{ width: 46, height: 36, borderRadius: 10, background: TEAL_SOFT, border: `2px solid ${TEAL}`, ...centerCol }}>
            <JuniorIcon name="flag" size={24} />
          </div>
        </div>

        <div style={{ padding: '4px 12px', borderRadius: 10, background: SUNNY, border: `2px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 13, fontWeight: 700 }}>
          Langkah: {stepIndex}
        </div>
      </div>

      {/* Middle 3-Column Row */}
      <div style={{ flex: 1, display: 'flex', gap: 10, minHeight: 0 }}>
        {/* Left Characters Sidebar */}
        <div style={{ width: 96, borderRadius: 16, background: '#E2E8F0', border: `2.5px solid ${CHARCOAL}`, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            onClick={() => onSelectChar?.('cat')}
            className="cpj29-card-btn"
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
            onClick={() => onSelectChar?.('button')}
            className="cpj29-card-btn"
            style={{
              width: '100%',
              height: 54,
              borderRadius: 12,
              background: WHITE,
              border: `${selectedChar === 'button' ? 3 : 2}px solid ${selectedChar === 'button' ? SUNNY : CHARCOAL}`,
              ...centerCol,
              padding: 0,
            }}
          >
            <ArrowControlBtnSvg size={38} />
          </button>
          <div style={{ marginTop: 'auto', opacity: 0.85 }}>
            <JuniorIcon name="plus-circle" size={26} />
          </div>
        </div>

        {/* Center Park Stage with Remote Arrow Button + Kucing Tic */}
        <div style={{ flex: 1, borderRadius: 18, border: `3px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden' }}>
          <ParkGardenBackdropSvg />
          {/* Kucing Tic */}
          <div
            style={{
              position: 'absolute',
              left: catLeft,
              bottom: '18%',
              transition: 'left 350ms cubic-bezier(0.22, 1, 0.36, 1)',
              zIndex: 3,
            }}
          >
            <TicCatSvg size={115} waving={flyingMail} />
          </div>

          {/* Flying Envelope Animation */}
          {flyingMail && (
            <div style={{ position: 'absolute', left: '16%', bottom: '20%', zIndex: 4, animation: 'cpj29-fly-mail 0.65s ease-out forwards' }}>
              <JuniorIcon name="mail-send" size={44} />
            </div>
          )}

          {/* Clickable Round Arrow Remote Button at bottom-left */}
          <button
            type="button"
            onClick={onPressRemote}
            className="cpj29-card-btn"
            title="Klik Tombol Panah!"
            style={{
              position: 'absolute',
              left: '5%',
              bottom: '7%',
              background: 'transparent',
              border: 'none',
              padding: 0,
              borderRadius: 99,
              animation: 'cpj29-pulse 2s infinite',
              zIndex: 5,
            }}
          >
            <ArrowControlBtnSvg size={70} />
          </button>
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
            {selectedChar === 'button' ? 'Kode Tombol Panah (Pengirim)' : 'Kode Kucing Tic (Penerima)'}
          </span>
        </div>

        <div style={{ flex: 1, padding: '6px 14px', ...row, justifyContent: 'center', alignItems: 'flex-start', overflow: 'hidden' }}>
          {selectedChar === 'button' ? (
            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-tap" scale={0.7} activeGlow={flyingMail} />
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind="send-msg" envColor="orange" scale={0.7} activeGlow={flyingMail} />
              </div>
            </div>
          ) : (
            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="recv-msg" envColor="orange" scale={0.7} activeGlow={flyingMail} />
              <div style={{ marginLeft: -10 }}>
                <ScratchJrBlock kind="move-right" num={2} scale={0.7} activeGlow={flyingMail} />
              </div>
            </div>
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
  const [stepIndex, setStepIndex] = useState(0);
  const [flyingMail, setFlyingMail] = useState(false);

  const handlePressRemote = () => {
    playEnvelopeChime();
    setFlyingMail(true);
    setStepIndex((s) => (s >= 3 ? 0 : s + 1));
    setTimeout(() => setFlyingMail(false), 650);
  };

  return (
    <JuniorFrame badge="CODEPOLITAN JUNIOR • PERTEMUAN 29" accentDot={ORANGE}>
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
            background: ORANGE_SOFT,
            border: `2.5px solid ${CHARCOAL}`,
            fontSize: 22,
            fontWeight: 800,
            color: '#C2410C',
            marginBottom: 24,
          }}
        >
          <JuniorIcon name="mail-send" size={24} />
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
          Rahasia <Highlight>Amplop</Highlight>
          <br />
          <Highlight color="#FFEDD5">Pesan Ajaib!</Highlight>
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
          Membuat Tombol Kemudi Visual di Layar
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
            <JuniorIcon name="mail-send" size={28} />
            <span>Kirim Pesan</span>
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
            <JuniorIcon name="mail-open" size={28} />
            <span>Terima Pesan</span>
          </div>
        </div>
      </div>

      {/* Right Showcase: Playable Authentic ScratchJr Remote Control + Biko */}
      <div style={{ ...abs(955, 145, 875, 810), ...centerCol }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 690,
            borderRadius: '200px 56px 200px 56px',
            background: 'linear-gradient(155deg, #FFF7ED 0%, #EFF6FF 55%, #ECFDF5 100%)',
            border: `4.5px solid ${CHARCOAL}`,
            boxShadow: `14px 14px 0 ${ORANGE}`,
            overflow: 'hidden',
          }}
        />

        <div style={{ position: 'absolute', right: 10, top: 140, zIndex: 2 }}>
          <AuthenticScratchJrRemoteUI
            stepIndex={stepIndex}
            flyingMail={flyingMail}
            selectedChar="button"
            onPressRemote={handlePressRemote}
            onReset={() => setStepIndex(0)}
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
            animation: live ? 'cpj29-float 3.2s ease-in-out infinite' : undefined,
          }}
        >
          <BikoMascot
            pose="thumbs-up"
            width={325}
            badgeIcon={<JuniorIcon name="mail-send" size={24} />}
            speechBubble={stepIndex > 0 ? 'Terkirim!' : 'Klik tombol hijau!'}
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
        headerLabel="Misi Tombol Kemudi Pesan • Pertemuan 29"
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

            <div style={{ width: 270, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 12 }}>
              <ScratchJrBlock kind="send-msg" envColor="orange" scale={0.9} />
              <ScratchJrBlock kind="recv-msg" envColor="orange" scale={0.9} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Kenali <span style={{ color: '#B45309' }}>Blok Amplop</span> (<em>Kirim &amp; Terima Pesan</em>)
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

            <div style={{ width: 270, height: 195, borderRadius: 28, background: WHITE, border: `3px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${CHARCOAL}`, ...row, justifyContent: 'center', gap: 12 }}>
              <ArrowControlBtnSvg size={76} />
              <JuniorIcon name="arrow-right" size={38} />
              <TicCatSvg size={105} />
            </div>

            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.24 }}>
              Bikin <span style={{ color: '#047857' }}>Tombol Kemudi</span> di Layar!
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1400, 315, 430, 620),
          ...centerCol,
          animation: live ? 'cpj29-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={395}
          badgeIcon={<JuniorIcon name="mail-open" size={24} />}
          speechBubble="Amplop ajaib!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 03 — Kenalan Sama 2 Blok Amplop Kuning!
// ============================================================================
const Slide03BlokAmplop: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="BLOK KUNING BARU" accentDot={SUNNY}>
      <SlideTitle>
        Ini Namanya <Highlight>Blok Amplop!</Highlight>
      </SlideTitle>

      {/* Left Spotlight Card: Yellow Block Palette Highlight */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Kategori Blok Kuning (Send & Receive Message)"
        padding={30}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ ...row, gap: 12, padding: '10px 24px', borderRadius: 99, background: SUNNY_SOFT, border: `2.5px solid ${CHARCOAL}` }}>
            <JuniorIcon name="dot-yellow" size={28} />
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700 }}>
              Kategori Blok Kuning
            </span>
          </div>

          <div style={{ width: '100%', display: 'flex', gap: 24, justifyContent: 'center' }}>
            <div style={{ flex: 1, borderRadius: 24, background: ORANGE_SOFT, border: `3px solid ${CHARCOAL}`, padding: '24px 16px', ...centerCol, gap: 14 }}>
              <ScratchJrBlock kind="send-msg" envColor="orange" scale={1.4} activeGlow />
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>Amplop Tertutup</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#C2410C' }}>PENGIRIM</div>
            </div>

            <div style={{ flex: 1, borderRadius: 24, background: TEAL_SOFT, border: `3px solid ${CHARCOAL}`, padding: '24px 16px', ...centerCol, gap: 14 }}>
              <ScratchJrBlock kind="recv-msg" envColor="orange" scale={1.4} activeGlow />
              <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>Amplop Terbuka</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#047857' }}>PENERIMA</div>
            </div>
          </div>

          <div style={{ animation: live ? 'cpj29-float 3s ease-in-out infinite' : undefined }}>
            <BikoMascot
              pose="point-left"
              width={165}
              badgeIcon={<JuniorIcon name="mail-send" size={18} />}
              speechBubble="Ada 2 jenis amplop!"
            />
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
        headerLabel="Tugas Dua Blok Amplop"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="mail-send" bgColor={ORANGE_SOFT} fontSize={32}>
              <strong>Amplop Tertutup:</strong> <strong>Kirim Pesan</strong> (<em>Send Message</em>)
            </BulletRow>
            <BulletRow icon="mail-open" bgColor={TEAL_SOFT} fontSize={32}>
              <strong>Amplop Terbuka:</strong> <strong>Terima Pesan</strong> (<em>Start on Message</em>)
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Satu karakter menekan tombol untuk <strong>mengirim amplop</strong>, karakter lain menunggu untuk <strong>membuka amplop</strong>!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 04 — Cara Kerja Amplop: Seperti Remote TV!
// ============================================================================
const Slide04CaraKerja: Page = () => {
  return (
    <JuniorFrame badge="CARA KERJA PESAN" accentDot={SKY}>
      <SlideTitle>
        Seperti <Highlight>Remote Control</Highlight> Ajaib!
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1720}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Alur Kerja Amplop Pesan di Layar"
        padding={34}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top 3 Step Cards */}
          <div style={{ display: 'flex', gap: 28 }}>
            <div style={{ flex: 1, borderRadius: 22, background: SKY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${SKY}`, padding: '22px 24px', ...row, gap: 18 }}>
              <div style={{ width: 58, height: 58, borderRadius: 18, background: SKY, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
                1
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="tap" size={30} style={{ marginRight: 8 }} />
                <strong>Klik Tombol</strong> di layar
              </div>
            </div>

            <div style={{ flex: 1, borderRadius: 22, background: SUNNY_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${SUNNY}`, padding: '22px 24px', ...row, gap: 18 }}>
              <div style={{ width: 58, height: 58, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
                2
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="mail-send" size={30} style={{ marginRight: 8 }} />
                Tombol <strong>Kirim Amplop</strong> ke Kucing Tic
              </div>
            </div>

            <div style={{ flex: 1, borderRadius: 22, background: TEAL_SOFT, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 6px 0 ${TEAL}`, padding: '22px 24px', ...row, gap: 18 }}>
              <div style={{ width: 58, height: 58, borderRadius: 18, background: TEAL, color: WHITE, border: `3px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, ...centerCol, flexShrink: 0 }}>
                3
              </div>
              <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.28 }}>
                <JuniorIcon name="mail-open" size={30} style={{ marginRight: 8 }} />
                Tic <strong>Terima Amplop</strong> -&gt; <strong>Jalan!</strong>
              </div>
            </div>
          </div>

          {/* Curved Light Path Diagram */}
          <div style={{ height: 390, borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, position: 'relative', overflow: 'hidden', ...row, justifyContent: 'space-around', padding: '0 60px' }}>
            <div style={{ ...centerCol, gap: 12 }}>
              <ArrowControlBtnSvg size={125} />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>Tombol Kemudi</span>
            </div>

            <div style={{ flex: 1, height: 220, position: 'relative', ...centerCol }}>
              <svg width="100%" height="180" viewBox="0 0 500 180" fill="none">
                <path d="M20 130 Q250 15 470 115" stroke={SUNNY} strokeWidth={8} strokeDasharray="16 12" strokeLinecap="round" />
                <polygon points="462,96 485,120 454,126" fill={CORAL} stroke={CHARCOAL} strokeWidth={2.5} />
              </svg>
              <div style={{ position: 'absolute', top: 18, padding: '8px 20px', borderRadius: 99, background: ORANGE_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 10 }}>
                <JuniorIcon name="mail-send" size={32} />
                <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>Pesan Terbang!</span>
              </div>
            </div>

            <div style={{ ...centerCol, gap: 12 }}>
              <TicCatSvg size={165} waving />
              <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700 }}>Kucing Tic</span>
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 05 — Langkah #1: Gambar Tombol Kemudi Panah!
// ============================================================================
const Slide05GambarTombol: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="PERSIAPAN TOMBOL" accentDot={TEAL}>
      <SlideTitle>
        Buat <Highlight>Tombol Kemudi</Highlight> Sendiri!
      </SlideTitle>

      {/* Left Spotlight Card: Paint Editor Drawing Round Arrow Button */}
      <MacWindowCard
        left={X0}
        top={235}
        width={840}
        height={720}
        titleBarColor={TEAL_SOFT}
        headerLabel="Paint Editor — Menggambar Tombol Panah"
        padding={28}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ flex: 1, display: 'flex', gap: 20 }}>
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
                  animation: live ? 'cpj29-pulse 1.8s infinite' : undefined,
                }}
              >
                <div style={{ width: 34, height: 34, borderRadius: 99, border: `4px solid ${CHARCOAL}` }} />
              </div>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: WHITE, border: `2.5px solid ${CHARCOAL}`, ...centerCol }}>
                <JuniorIcon name="paint-bucket" size={30} />
              </div>
            </div>

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
              <ArrowControlBtnSvg size={220} />
              <div style={{ position: 'absolute', right: 16, top: 16, width: 64, height: 64, borderRadius: 99, background: TEAL_SOFT, border: `3.5px solid ${TEAL}`, ...centerCol }}>
                <JuniorIcon name="check" size={38} />
              </div>
            </div>
          </div>

          <div style={{ ...row, justifyContent: 'space-around', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700, color: '#047857' }}>
              Taruh rapi di Pojok Bawah Panggung!
            </span>
            <BikoMascot pose="thumbs-up" width={140} badgeIcon={<JuniorIcon name="arrow-button" size={18} />} speechBubble="Keren!" />
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
        headerLabel="Langkah Membuat Tombol"
        padding={42}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 12 }}>
            <BulletRow icon="palette" bgColor={SUNNY_SOFT} fontSize={32}>
              Buka <strong>Paint Editor</strong> &amp; gambar <strong>Lingkaran</strong>
            </BulletRow>
            <BulletRow icon="arrow-button" bgColor={TEAL_SOFT} fontSize={32}>
              Tambah gambar <strong>Panah</strong> di dalamnya &amp; taruh di pojok bawah!
            </BulletRow>
          </div>

          <div style={{ padding: '24px 28px', borderRadius: 22, background: SKY_SOFT, border: `3px solid ${CHARCOAL}`, ...row, gap: 18 }}>
            <JuniorIcon name="bulb" size={40} />
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: CHARCOAL }}>
              Kamu bisa memberi warna cerah seperti hijau atau biru supaya tombol kemudimu terlihat jelas saat bermain!
            </div>
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 06 — Permainan Cepat: Amplop Mana yang Cocok?
// ============================================================================
const Slide06AyoTebak: Page = () => {
  const live = useIsActivePage();
  const [picked, setPicked] = useState<'A' | 'B' | null>(null);

  return (
    <JuniorFrame badge="AYO TEBAK!" accentDot={CORAL}>
      <SlideTitle align="center" maxWidth={1620} top={118} size={46}>
        Tombol Mengirim <Highlight color="#DBEAFE">Amplop Biru.</Highlight> Tic Harus Pasang Amplop Apa?
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
          gap: 26,
        }}
      >
        <div style={{ ...row, gap: 12 }}>
          <ArrowControlBtnSvg size={72} />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700 }}>Tombol</span>
        </div>
        <JuniorIcon name="arrow-right" size={40} />
        <ScratchJrBlock kind="send-msg" envColor="blue" scale={0.82} />
        <JuniorIcon name="arrow-right" size={40} />
        <div style={{ ...row, gap: 12 }}>
          <TicCatSvg size={82} />
          <div
            style={{
              width: 102,
              height: 88,
              borderRadius: 20,
              background: picked === 'A' ? TEAL_SOFT : SUNNY_SOFT,
              border: `3.5px dashed ${picked === 'A' ? TEAL : CHARCOAL}`,
              ...centerCol,
            }}
          >
            {picked === 'A' ? <ScratchJrBlock kind="recv-msg" envColor="blue" scale={0.72} /> : <JuniorIcon name="question" size={42} />}
          </div>
        </div>
      </div>

      {/* Interactive Choice Cards */}
      <div style={{ ...abs(190, 355, 1540, 395), display: 'flex', gap: 56 }}>
        {/* Kartu A (Benar: Amplop Terbuka BIRU) */}
        <button
          type="button"
          onClick={() => {
            playEnvelopeChime();
            setPicked('A');
          }}
          className="cpj29-card-btn"
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
            <ScratchJrBlock kind="recv-msg" envColor="blue" scale={1.45} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Amplop Biru
          </div>

          {picked === 'A' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: TEAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="check" size={24} />
              <span>Benar! Warna amplop pengirim &amp; penerima harus sama-sama Biru!</span>
            </div>
          )}
        </button>

        {/* Kartu B (Salah: Amplop Terbuka MERAH) */}
        <button
          type="button"
          onClick={() => setPicked('B')}
          className="cpj29-card-btn"
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
            animation: picked === 'B' ? 'cpj29-shake 0.35s ease' : undefined,
          }}
        >
          <div style={{ ...abs(26, 22), padding: '6px 18px', borderRadius: 99, background: CORAL_SOFT, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
            PILIHAN B
          </div>

          <div style={{ marginTop: 12 }}>
            <ScratchJrBlock kind="recv-msg" envColor="red" scale={1.45} />
          </div>

          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 36, fontWeight: 700, color: CHARCOAL }}>
            Amplop Merah
          </div>

          {picked === 'B' && (
            <div style={{ ...row, gap: 10, padding: '8px 20px', borderRadius: 99, background: CORAL, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontSize: 21, fontWeight: 800 }}>
              <JuniorIcon name="cross" size={24} />
              <span>Ups! Amplop Merah tidak bisa membuka pesan Biru!</span>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Prompt */}
      <div style={{ ...abs(190, 765, 1540, 235), ...row, justifyContent: 'center', gap: 34 }}>
        <div style={{ animation: live ? 'cpj29-float 3s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thinking"
            width={205}
            badgeIcon={<JuniorIcon name="question" size={22} />}
            speechBubble={picked === 'A' ? 'Cocok!' : 'Pilih warnanya!'}
          />
        </div>
        <div style={{ padding: '20px 34px', borderRadius: 26, background: WHITE, border: `3.5px solid ${CHARCOAL}`, boxShadow: `0 7px 0 ${CHARCOAL}`, ...row, gap: 18 }}>
          <div style={{ width: 62, height: 62, borderRadius: 18, background: SUNNY, border: `3px solid ${CHARCOAL}`, ...centerCol }}>
            <JuniorIcon name="question" size={34} />
          </div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 31, fontWeight: 700, color: CHARCOAL }}>
            Tunjuk warna amplop yang cocok di layarmu ya!
          </div>
        </div>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 07 — Resep Kode: Tombol vs Karakter Utama!
// ============================================================================
const Slide07ResepKode: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="RESEP TOMBOL KEMUDI" accentDot={ORANGE}>
      <SlideTitle>
        Rangkai <Highlight>Kode Pengirim &amp; Penerima!</Highlight>
      </SlideTitle>

      <MacWindowCard
        left={X0}
        top={235}
        width={1360}
        height={720}
        titleBarColor={CREAM}
        headerLabel="Resep Rahasia Remote Control di ScratchJr"
        padding={32}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26, position: 'relative' }}>
          {/* Kartu Atas — Kode Tombol Panah */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: ORANGE_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${ORANGE}`,
              padding: '22px 32px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 18 }}>
              <ArrowControlBtnSvg size={94} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ alignSelf: 'flex-start', padding: '6px 18px', borderRadius: 99, background: ORANGE, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                  KODE TOMBOL PANAH
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                  Sentuh Karakter -&gt; Kirim Amplop Oranye
                </div>
              </div>
            </div>

            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="start-tap" scale={1.15} />
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="send-msg" envColor="orange" scale={1.15} activeGlow />
              </div>
            </div>
          </div>

          {/* Connecting Star Arrow */}
          <div style={{ ...row, justifyContent: 'center', gap: 14, margin: '-12px 0' }}>
            <JuniorIcon name="star-glow" size={34} />
            <JuniorIcon name="arrow-down" size={44} />
            <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 700, color: '#C2410C' }}>
              Mengirim Amplop Oranye yang Sama!
            </span>
            <JuniorIcon name="star-glow" size={34} />
          </div>

          {/* Kartu Bawah — Kode Kucing Tic */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              background: SKY_SOFT,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 7px 0 ${SKY}`,
              padding: '22px 32px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 18 }}>
              <TicCatSvg size={105} waving />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ alignSelf: 'flex-start', padding: '6px 18px', borderRadius: 99, background: SKY, color: WHITE, border: `2.5px solid ${CHARCOAL}`, fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700 }}>
                  KODE KUCING TIC
                </div>
                <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 700, color: CHARCOAL }}>
                  Terima Amplop Oranye -&gt; Maju 2
                </div>
              </div>
            </div>

            <div style={{ ...row, alignItems: 'flex-start' }}>
              <ScratchJrBlock kind="recv-msg" envColor="orange" scale={1.15} activeGlow />
              <div style={{ marginLeft: -16 }}>
                <ScratchJrBlock kind="move-right" num={2} scale={1.15} />
              </div>
            </div>
          </div>
        </div>
      </MacWindowCard>

      <div
        style={{
          ...abs(1475, 345, 360, 560),
          ...centerCol,
          animation: live ? 'cpj29-float 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <BikoMascot
          pose="point-left"
          width={335}
          badgeIcon={<JuniorIcon name="mail-open" size={22} />}
          speechBubble="Warna sama!"
        />
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 08 — Tips Jagoan Amplop Pesan Ajaib (BOLEH vs JANGAN)
// ============================================================================
const Slide08TipsAmplop: Page = () => {
  return (
    <JuniorFrame badge="TIPS TOMBOL KEMUDI" accentDot={TEAL}>
      <SlideTitle>
        Rahasia Tombol Kemudimu <Highlight>Berfungsi!</Highlight>
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
            <BulletRow icon="palette" bgColor={TEAL_SOFT} fontSize={30}>
              Samakan <strong>Warna Amplop</strong> pengirim &amp; penerima
            </BulletRow>
            <BulletRow icon="arrow-button" bgColor={SUNNY_SOFT} fontSize={30}>
              Taruh tombol rapi di <strong>Pojok Bawah</strong> panggung
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, border: `3.5px solid ${TEAL}`, position: 'relative', overflow: 'hidden' }}>
            <ParkGardenBackdropSvg />
            <div style={{ position: 'absolute', inset: 0, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 24px' }}>
              <ArrowControlBtnSvg size={82} />
              <ScratchJrBlock kind="send-msg" envColor="orange" scale={0.9} />
              <ScratchJrBlock kind="recv-msg" envColor="orange" scale={0.9} />
              <TicCatSvg size={115} waving />
              <JuniorIcon name="check" size={54} />
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
            <BulletRow icon="shuffle" bgColor={CORAL_SOFT} fontSize={30}>
              Memasang <strong>Warna Amplop Berbeda</strong> (Merah vs Hijau)
            </BulletRow>
            <BulletRow icon="see-no-evil" bgColor={SUNNY_SOFT} fontSize={30}>
              Menumpuk tombol di atas <strong>Badan Kucing Tic</strong>
            </BulletRow>
          </div>

          <div style={{ height: 245, borderRadius: 22, background: CORAL_SOFT, border: `3.5px solid ${CORAL}`, ...row, justifyContent: 'space-around', alignItems: 'center', padding: '0 28px' }}>
            <ScratchJrBlock kind="send-msg" envColor="red" scale={1.05} />
            <JuniorIcon name="cross" size={56} />
            <ScratchJrBlock kind="recv-msg" envColor="green" scale={1.05} />
          </div>
        </div>
      </MacWindowCard>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 09 — Misi Praktik: Buat Remote Control Sendiri!
// ============================================================================
const Slide09MisiPraktik: Page = () => {
  const live = useIsActivePage();
  const [stepIndex, setStepIndex] = useState(0);
  const [flyingMail, setFlyingMail] = useState(false);
  const [charTab, setCharTab] = useState<'button' | 'cat'>('button');

  const handlePressRemote = () => {
    playEnvelopeChime();
    setFlyingMail(true);
    setStepIndex((s) => (s >= 3 ? 0 : s + 1));
    setTimeout(() => setFlyingMail(false), 650);
  };

  return (
    <JuniorFrame badge="AYO BUAT & MAIN!" accentDot={TEAL}>
      <SlideTitle>
        Misi <Highlight>Tombol Kemudi Layar!</Highlight>
      </SlideTitle>

      {/* Top 3 Horizontal ScratchJr-style Mission Steps */}
      <div style={{ ...abs(X0, 224, W, 152), display: 'flex', gap: 24 }}>
        {[
          {
            num: '1',
            bg: SKY_SOFT,
            badgeBg: SKY,
            badgeText: WHITE,
            icon: 'arrow-button' as JuniorIconName,
            text: (
              <>
                Gambar <strong>Tombol Panah</strong> &amp; siapkan <strong>Kucing Tic</strong>
              </>
            ),
          },
          {
            num: '2',
            bg: SUNNY_SOFT,
            badgeBg: SUNNY,
            badgeText: CHARCOAL,
            icon: 'mail-send' as JuniorIconName,
            text: (
              <>
                Pasang <strong>Kirim Amplop</strong> di Tombol &amp; <strong>Terima Amplop + Maju</strong> di Tic
              </>
            ),
          },
          {
            num: '3',
            bg: TEAL_SOFT,
            badgeBg: TEAL,
            badgeText: WHITE,
            icon: 'tap' as JuniorIconName,
            text: (
              <>
                <strong>Klik Tombolnya!</strong> Gerakkan Tic sesukamu!
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

      {/* Playable Authentic ScratchJr Remote Control Workspace */}
      <div style={{ ...abs(X0, 400, 1280, 565) }}>
        <AuthenticScratchJrRemoteUI
          stepIndex={stepIndex}
          flyingMail={flyingMail}
          selectedChar={charTab}
          onSelectChar={setCharTab}
          onPressRemote={handlePressRemote}
          onReset={() => setStepIndex(0)}
          width={1280}
          height={565}
        />
      </div>

      {/* Cheering Biko & Press Remote Button */}
      <div style={{ ...abs(1405, 420, 435, 530), ...centerCol, gap: 18 }}>
        <div style={{ animation: live ? 'cpj29-hop 2.4s ease-in-out infinite' : undefined }}>
          <BikoMascot
            pose="thumbs-up"
            width={345}
            badgeIcon={<JuniorIcon name="mail-send" size={24} />}
            speechBubble={flyingMail ? 'Maju 2!' : 'Klik tombol panah!'}
          />
        </div>
        <button
          type="button"
          onClick={handlePressRemote}
          className="cpj29-card-btn"
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
          <JuniorIcon name="arrow-button" size={28} />
          <span>Tekan Tombol Maju!</span>
        </button>
      </div>
    </JuniorFrame>
  );
};

// ============================================================================
// SLIDE 10 — Lencana Juara Pertemuan 29 (Celebration Center Card)
// ============================================================================
const Slide10Lencana: Page = () => {
  const live = useIsActivePage();

  return (
    <JuniorFrame badge="MISI SELESAI!" accentDot={SUNNY}>
      <div aria-hidden style={{ ...abs(165, 225), animation: live ? 'cpj29-confetti 2.4s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="party" size={48} />
      </div>
      <div aria-hidden style={{ ...abs(1700, 210), animation: live ? 'cpj29-confetti 2.8s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="mail-open" size={50} />
      </div>
      <div aria-hidden style={{ ...abs(150, 790), animation: live ? 'cpj29-twinkle 2.6s ease-in-out infinite' : undefined }}>
        <JuniorIcon name="sparkle" size={44} />
      </div>

      <SlideTitle align="center" maxWidth={1540} top={122} size={56}>
        Hore! Kamu <Highlight>Insinyur Remote Control!</Highlight>{' '}
        <JuniorIcon name="party" size={50} />
      </SlideTitle>

      {/* Celebration Center Card */}
      <MacWindowCard
        left={260}
        top={245}
        width={1060}
        height={700}
        titleBarColor={SUNNY_SOFT}
        headerLabel="Penghargaan Pertemuan 29"
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
          {/* Bespoke Golden Sparkling Envelope + Arrow Control Button Medal SVG */}
          <div style={{ animation: live ? 'cpj29-float 3.2s ease-in-out infinite' : undefined }}>
            <svg width={260} height={260} viewBox="0 0 240 240" fill="none">
              <path d="M84 152 L66 222 L98 202 L114 224 L118 160 Z" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <path d="M156 152 L174 222 L142 202 L126 224 L122 160 Z" fill={TEAL} stroke={CHARCOAL} strokeWidth={4} strokeLinejoin="round" />
              <circle cx="120" cy="108" r="82" fill={SUNNY} stroke={CHARCOAL} strokeWidth={5} />
              <circle cx="120" cy="108" r="68" fill={ORANGE_SOFT} stroke={CHARCOAL} strokeWidth={3.5} />
              {/* Sparkling Envelope */}
              <rect x="78" y="82" width="84" height="54" rx="10" fill={ORANGE} stroke={CHARCOAL} strokeWidth={4} />
              <path d="M81 86 L120 114 L159 86" fill="none" stroke={CHARCOAL} strokeWidth={3.8} strokeLinejoin="round" />
              {/* Mini Green Arrow Control Badge */}
              <circle cx="152" cy="76" r="20" fill={TEAL} stroke={CHARCOAL} strokeWidth={3.5} />
              <path d="M142 74 H153 V68 L163 76 L153 84 V78 H142 Z" fill={WHITE} stroke={CHARCOAL} strokeWidth={2} strokeLinejoin="round" />
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
            <span>Lencana Master Amplop Pesan Ajaib</span>
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
            <Highlight color="#D1FAE5">Send &amp; Receive Message</Highlight> untuk tombol kemudi!
          </div>
        </div>
      </MacWindowCard>

      {/* Jumping Biko & Kucing Tic Celebrating */}
      <div style={{ ...abs(1360, 415, 480, 500), ...centerCol }}>
        <div style={{ ...row, alignItems: 'flex-end', gap: 4 }}>
          <BikoMascot
            pose="jump"
            width={295}
            badgeIcon={<JuniorIcon name="mail-open" size={22} />}
            speechBubble="Master Remote!"
          />
          <div style={{ animation: live ? 'cpj29-hop 1.9s ease-in-out infinite' : undefined, marginBottom: 14 }}>
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
  `Selamat datang di Pertemuan 29 — Rahasia Amplop Pesan Ajaib! ✉️📩
Hari ini kita akan membuat Tombol Kemudi Visual di layar memakai Send & Receive Message!`,

  `Dua misi seru hari ini:
1. Mengenal Blok Amplop (Kirim & Terima Pesan).
2. Membuat Tombol Kemudi panah di layar untuk menggerakkan Kucing Tic!`,

  `Kenalan sama 2 Blok Amplop Kuning:
- Amplop Tertutup = Kirim Pesan (Send Message)
- Amplop Terbuka = Terima Pesan (Start on Message)`,

  `Cara kerja amplop seperti Remote Control TV!
1. Klik Tombol di layar -> 2. Tombol mengirim Amplop -> 3. Kucing Tic menerima Amplop dan langsung berjalan!`,

  `Langkah #1 — Gambar Tombol Kemudi Panah!
Buka Paint Editor, buat Lingkaran warna cerah lalu gambar panah kanan di dalamnya, dan letakkan rapi di pojok bawah panggung!`,

  `Permainan Cepat! Ayo tebak bersama:
Jika Tombol mengirim Amplop BIRU, maka Kucing Tic harus memasang Amplop Terbuka BIRU (Pilihan A) atau MERAH (Pilihan B)?`,

  `Resep Kode Tombol Kemudi:
- Kode Tombol Panah: Sentuh Karakter -> Kirim Amplop Oranye.
- Kode Kucing Tic: Terima Amplop Oranye -> Maju 2!`,

  `Tips Jagoan Amplop Pesan Ajaib:
BOLEH samakan warna amplop pengirim & penerima, serta taruh tombol rapi di pojok bawah.
JANGAN pasang warna amplop berbeda, atau menumpuk tombol di atas badan Kucing Tic!`,

  `Waktunya Misi Praktik Tombol Kemudi Layar!
Klik karakter Tombol atau Kucing Tic di panel kiri untuk melihat kodenya, lalu tekan tombol panah hijau di panggung untuk menggerakkan Tic!`,

  `Hore! Kamu Insinyur Remote Control! 🎉
Selamat meraih Lencana Master Amplop Pesan Ajaib di Pertemuan 29!`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 29 — Rahasia Amplop Pesan Ajaib!',
  createdAt: '2026-11-16T14:42:00.000Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03BlokAmplop,
  Slide04CaraKerja,
  Slide05GambarTombol,
  Slide06AyoTebak,
  Slide07ResepKode,
  Slide08TipsAmplop,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

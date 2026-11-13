import type { CSSProperties } from 'react';
import { useIsActivePage } from '@open-slide/core';
import bikoWave from '../assets/biko/biko-wave.png';
import bikoLaptop from '../assets/biko/biko-laptop.png';
import bikoPointLeft from '../assets/biko/biko-point-left.png';
import bikoJump from '../assets/biko/biko-jump.png';
import bikoDetective from '../assets/biko/biko-detective.png';
import bikoThumbsUp from '../assets/biko/biko-thumbs-up.png';
import bikoThinking from '../assets/biko/biko-thinking.png';

const CHARCOAL = '#1E1E2C';
const SUNNY = '#FBBF24';
const SKY = '#60A5FA';
const TEAL = '#10B981';
const WHITE = '#FFFFFF';

const BIKO_STYLE_ID = 'osd-biko-mascot-keyframes';
const BIKO_KEYFRAMES = `
@keyframes cpj-biko-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes cpj-biko-bob {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(-1.2deg); }
}
`;

if (typeof document !== 'undefined') {
  let style = document.getElementById(BIKO_STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = BIKO_STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== BIKO_KEYFRAMES) style.textContent = BIKO_KEYFRAMES;
}

export type BikoPose =
  | 'wave'
  | 'laptop'
  | 'cover-laptop'
  | 'point-left'
  | 'point-right'
  | 'jump'
  | 'detective'
  | 'thumbs-up'
  | 'thinking'
  | 'question'
  | 'conductor'
  | 'chef';

export const BIKO_ASSETS: Record<BikoPose, string> = {
  wave: bikoWave,
  laptop: bikoLaptop,
  'cover-laptop': bikoLaptop,
  'point-left': bikoPointLeft,
  'point-right': bikoPointLeft,
  jump: bikoJump,
  detective: bikoDetective,
  'thumbs-up': bikoThumbsUp,
  thinking: bikoThinking,
  question: bikoThinking,
  conductor: bikoWave,
  chef: bikoWave,
};

export interface BikoMascotProps {
  pose?: BikoPose;
  width?: number;
  flipX?: boolean;
  badgeEmoji?: string;
  speechBubble?: string;
  style?: CSSProperties;
}

/**
 * Reusable official Biko otter mascot component for CODEPOLITAN Junior decks.
 */
export const BikoMascot = ({
  pose = 'wave',
  width = 340,
  flipX = false,
  badgeEmoji,
  speechBubble,
  style,
}: BikoMascotProps) => {
  const live = useIsActivePage();
  const isJump = pose === 'jump';
  const imgSrc = BIKO_ASSETS[pose] ?? bikoWave;
  const imgHeight = Math.round(width * 1.12);
  const mirror = flipX || pose === 'point-right';

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        width,
        userSelect: 'none',
        ...style,
      }}
    >
      {speechBubble && (
        <div
          style={{
            marginBottom: 8,
            padding: '10px 20px',
            borderRadius: 20,
            background: WHITE,
            border: `3px solid ${CHARCOAL}`,
            boxShadow: `0 5px 0 ${CHARCOAL}`,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            color: CHARCOAL,
            textAlign: 'center',
            zIndex: 3,
          }}
        >
          {speechBubble}
        </div>
      )}

      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: live
            ? isJump
              ? 'cpj-biko-float 1.8s ease-in-out infinite'
              : 'cpj-biko-bob 3.2s ease-in-out infinite'
            : undefined,
        }}
      >
        <img
          src={imgSrc}
          alt={`Maskot Biko (${pose})`}
          draggable={false}
          style={{
            display: 'block',
            height: imgHeight,
            width: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            transform: mirror ? 'scaleX(-1)' : undefined,
            filter: 'drop-shadow(0 8px 14px rgba(30, 30, 44, 0.12))',
          }}
        />

        {pose === 'conductor' && (
          <svg
            aria-hidden="true"
            width={Math.round(width * 0.48)}
            height={Math.round(width * 0.3)}
            viewBox="0 0 160 100"
            fill="none"
            style={{
              position: 'absolute',
              top: -Math.round(width * 0.05),
              left: '50%',
              transform: 'translateX(-50%) rotate(-4deg)',
              pointerEvents: 'none',
              filter: 'drop-shadow(0 4px 6px rgba(30,30,44,0.16))',
            }}
          >
            {/* Conductor Cap Crown */}
            <path
              d="M32 58 C24 30, 48 14, 80 14 C112 14, 136 30, 128 58 Z"
              fill={SKY}
              stroke={CHARCOAL}
              strokeWidth={4.5}
              strokeLinejoin="round"
            />
            {/* Yellow Band */}
            <rect x="30" y="54" width="100" height="16" rx="6" fill={SUNNY} stroke={CHARCOAL} strokeWidth={4} />
            {/* Dark Visor Brim */}
            <path
              d="M28 70 Q80 88 134 70 L126 78 Q80 94 36 78 Z"
              fill={CHARCOAL}
            />
            {/* Front Star Emblem */}
            <circle cx="80" cy="36" r="11" fill={SUNNY} stroke={CHARCOAL} strokeWidth={3} />
          </svg>
        )}

        {pose === 'chef' && (
          <svg
            aria-hidden="true"
            width={Math.round(width * 0.42)}
            height={Math.round(width * 0.34)}
            viewBox="0 0 140 110"
            fill="none"
            style={{
              position: 'absolute',
              top: -Math.round(width * 0.08),
              left: '50%',
              transform: 'translateX(-48%) rotate(-6deg)',
              pointerEvents: 'none',
              filter: 'drop-shadow(0 4px 6px rgba(30,30,44,0.16))',
            }}
          >
            <path
              d="M34 74 C14 70, 14 40, 38 36 C42 16, 64 12, 70 22 C78 10, 102 16, 104 36 C126 40, 126 70, 106 74 Z"
              fill={WHITE}
              stroke={CHARCOAL}
              strokeWidth={4.5}
              strokeLinejoin="round"
            />
            <rect x="32" y="72" width="76" height="24" rx="8" fill={WHITE} stroke={CHARCOAL} strokeWidth={4.5} />
            <rect x="34" y="84" width="72" height="10" rx="4" fill={TEAL} />
          </svg>
        )}

        {pose === 'question' && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: -4,
              top: '6%',
              width: 72,
              height: 80,
              borderRadius: 20,
              background: SUNNY,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 6px 0 ${CHARCOAL}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--osd-font-display)',
              fontSize: 48,
              fontWeight: 700,
              color: CHARCOAL,
              transform: 'rotate(10deg)',
              pointerEvents: 'none',
            }}
          >
            ?
          </div>
        )}

        {badgeEmoji && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: 2,
              top: '8%',
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: SUNNY,
              border: `3.5px solid ${CHARCOAL}`,
              boxShadow: `0 5px 0 ${CHARCOAL}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              transform: 'rotate(8deg)',
              pointerEvents: 'none',
            }}
          >
            {badgeEmoji}
          </div>
        )}
      </div>

      <div
        aria-hidden="true"
        style={{
          width: isJump ? width * 0.36 : width * 0.52,
          height: 15,
          marginTop: isJump ? 8 : -6,
          borderRadius: '50%',
          background: CHARCOAL,
          opacity: 0.13,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

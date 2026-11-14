import type { CSSProperties, ReactNode } from 'react';

const C = '#1E1E2C';
const W = '#FFFFFF';
const SUNNY = '#FBBF24';
const TEAL = '#10B981';
const SKY = '#60A5FA';
const CORAL = '#F45B49';
const LAVENDER = '#A78BFA';
const ORANGE = '#FB923C';
const SOFT_YELLOW = '#FEF3C7';
const SOFT_BLUE = '#DBEAFE';

export type JuniorIconName =
  // Directions & Loop
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-lr'
  | 'turn-up'
  | 'turn-left'
  | 'turn-right'
  | 'jump'
  | 'repeat'
  // UI Status & Actions
  | 'play'
  | 'reset'
  | 'check'
  | 'cross'
  | 'warning'
  | 'stop'
  | 'bulb'
  | 'trash'
  | 'question'
  | 'step-1'
  | 'step-2'
  | 'step-3'
  // Rewards & Celebration
  | 'star'
  | 'star-glow'
  | 'sparkle'
  | 'trophy'
  | 'medal'
  | 'party'
  | 'target'
  | 'diamond'
  // Devices, Tools & Concepts
  | 'laptop'
  | 'mouse'
  | 'keyboard'
  | 'eyes'
  | 'compass'
  | 'map'
  | 'puzzle'
  | 'link'
  | 'magnet'
  | 'magnifier'
  | 'wrench'
  | 'scissors'
  | 'folder'
  | 'footprints'
  | 'lightning'
  | 'palette'
  | 'rainbow'
  | 'gamepad'
  | 'numbers'
  | 'box'
  // Hands & Expressions
  | 'thumbs-up'
  | 'tap'
  | 'point-right'
  | 'hand'
  | 'fist'
  | 'thinking'
  | 'happy'
  | 'sad'
  | 'dizzy'
  | 'tired'
  | 'see-no-evil'
  | 'raise-hand'
  | 'muscle'
  | 'brain'
  | 'speak'
  | 'clock'
  | 'feather'
  // Characters, Obstacles & Story Objects
  | 'biko'
  | 'bunny'
  | 'carrot'
  | 'balloon'
  | 'train'
  | 'rocket'
  | 'turtle'
  | 'bug'
  | 'rock'
  | 'bush'
  | 'cactus'
  | 'palm'
  | 'tree'
  | 'sprout'
  | 'moon'
  | 'flag'
  | 'chest'
  | 'island'
  | 'toothbrush'
  | 'teeth'
  | 'water'
  | 'bread'
  | 'chocolate'
  | 'sandwich'
  | 'soap'
  | 'cup'
  | 'hammer'
  | 'heart'
  | 'chef'
  | 'hero'
  | 'cloud-sad'
  | 'barrier'
  | 'wind'
  | 'square-blue'
  | 'dot-red'
  | 'dot-yellow'
  | 'dot-green'
  | 'dot-blue'
  | 'shape-diamond'
  | 'abc'
  | 'house'
  | 'cat'
  | 'landscape'
  | 'plus-circle'
  | 'stage'
  | 'car-red'
  | 'car-blue'
  | 'road'
  | 'traffic-light'
  | 'dot-purple'
  | 'elephant'
  | 'bird'
  | 'grow'
  | 'shrink'
  | 'start-tap'
  | 'hide'
  | 'show'
  | 'speaker'
  | 'mic'
  | 'bubble'
  | 'music-note'
  | 'mute'
  | 'say'
  | 'wait'
  | 'pencil'
  | 'ear'
  | 'scroll'
  | 'paintbrush'
  | 'paint-bucket'
  | 'monster'
  | 'shapes-circle'
  | 'undo'
  | 'school'
  | 'door'
  | 'go-page-2';

const ARROW_ROT: Record<'arrow-up' | 'arrow-down' | 'arrow-left' | 'arrow-right', number> = {
  'arrow-right': 0,
  'arrow-down': 90,
  'arrow-left': 180,
  'arrow-up': -90,
};

const ARROW_BG: Record<'arrow-up' | 'arrow-down' | 'arrow-left' | 'arrow-right', string> = {
  'arrow-right': SKY,
  'arrow-up': TEAL,
  'arrow-down': CORAL,
  'arrow-left': SUNNY,
};

function renderGlyph(name: JuniorIconName): ReactNode {
  // Directional badge arrows
  if (name === 'arrow-up' || name === 'arrow-down' || name === 'arrow-left' || name === 'arrow-right') {
    const rot = ARROW_ROT[name];
    const bg = ARROW_BG[name];
    return (
      <>
        <rect x="4" y="4" width="40" height="40" rx="11" fill={bg} stroke={C} strokeWidth="3.2" />
        <g transform={`rotate(${rot} 24 24)`}>
          <path d="M12 20 H25 V13 L37 24 L25 35 V28 H12 Z" fill={W} stroke={C} strokeWidth="2.6" strokeLinejoin="round" />
        </g>
      </>
    );
  }

  switch (name) {
    case 'arrow-lr':
      return (
        <>
          <rect x="4" y="8" width="40" height="32" rx="10" fill={SKY} stroke={C} strokeWidth="3" />
          <path d="M16 18 L9 24 L16 30 V26 H32 V30 L39 24 L32 18 V22 H16 Z" fill={W} stroke={C} strokeWidth="2.2" strokeLinejoin="round" />
        </>
      );
    case 'turn-up':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={TEAL} stroke={C} strokeWidth="3.2" />
          <path d="M14 34 H26 V20 H19 L29 10 L39 20 H32 V34 C32 37 29 39 26 39 H14 Z" fill={W} stroke={C} strokeWidth="2.4" strokeLinejoin="round" />
        </>
      );
    case 'turn-left':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={ORANGE} stroke={C} strokeWidth="3.2" />
          <path d="M32 16 C20 12 13 18 13 28 H8 L16 37 L24 28 H19 C19 21 24 19 32 21 Z" fill={W} stroke={C} strokeWidth="2.4" strokeLinejoin="round" />
        </>
      );
    case 'turn-right':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={SKY} stroke={C} strokeWidth="3.2" />
          <path d="M16 16 C28 12 35 18 35 28 H40 L32 37 L24 28 H29 C29 21 24 19 16 21 Z" fill={W} stroke={C} strokeWidth="2.4" strokeLinejoin="round" />
        </>
      );
    case 'jump':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={SKY} stroke={C} strokeWidth="3.2" />
          <path d="M11 33 C14 14, 30 14, 34 26" fill="none" stroke={W} strokeWidth="4.2" strokeLinecap="round" />
          <path d="M27 25 L36 33 L39 21 Z" fill={W} stroke={C} strokeWidth="2.2" strokeLinejoin="round" />
        </>
      );
    case 'repeat':
      return (
        <>
          <circle cx="24" cy="24" r="20" fill={SUNNY} stroke={C} strokeWidth="3.2" />
          <path d="M14 21 A10 10 0 0 1 32 18" fill="none" stroke={C} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M30 12 L36 19 L27 21 Z" fill={TEAL} stroke={C} strokeWidth="2" strokeLinejoin="round" />
          <path d="M34 27 A10 10 0 0 1 16 30" fill="none" stroke={C} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M18 36 L12 29 L21 27 Z" fill={CORAL} stroke={C} strokeWidth="2" strokeLinejoin="round" />
        </>
      );
    case 'play':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={TEAL} stroke={C} strokeWidth="3.2" />
          <path d="M18 13 L35 24 L18 35 Z" fill={W} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
        </>
      );
    case 'reset':
      return (
        <>
          <circle cx="24" cy="24" r="19" fill={SKY} stroke={C} strokeWidth="3.2" />
          <path d="M32 18 A10 10 0 1 0 33 28" fill="none" stroke={W} strokeWidth="3.8" strokeLinecap="round" />
          <path d="M27 19 L35 19 L34 11 Z" fill={W} stroke={C} strokeWidth="2" strokeLinejoin="round" />
        </>
      );
    case 'check':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="12" fill={TEAL} stroke={C} strokeWidth="3.2" />
          <path d="M13 24 L21 32 L36 16" fill="none" stroke={W} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case 'cross':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="12" fill={CORAL} stroke={C} strokeWidth="3.2" />
          <path d="M15 15 L33 33 M33 15 L15 33" fill="none" stroke={W} strokeWidth="4.5" strokeLinecap="round" />
        </>
      );
    case 'warning':
      return (
        <>
          <path d="M24 5 L44 41 H4 Z" fill={SUNNY} stroke={C} strokeWidth="3.2" strokeLinejoin="round" />
          <line x1="24" y1="17" x2="24" y2="28" stroke={C} strokeWidth="4" strokeLinecap="round" />
          <circle cx="24" cy="34.5" r="2.5" fill={C} />
        </>
      );
    case 'stop':
      return (
        <>
          <circle cx="24" cy="24" r="19" fill={CORAL} stroke={C} strokeWidth="3.2" />
          <rect x="13" y="21" width="22" height="6" rx="3" fill={W} />
        </>
      );
    case 'bulb':
      return (
        <>
          <path d="M17 31 C12 27 12 19 16 13 C20 8 28 8 32 13 C36 19 36 27 31 31 V36 H17 Z" fill={SUNNY} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <rect x="18" y="36" width="12" height="6" rx="3" fill="#CBD5E1" stroke={C} strokeWidth="2.8" />
          <path d="M21 20 L24 24 L27 20" fill="none" stroke={C} strokeWidth="2.4" strokeLinecap="round" />
        </>
      );
    case 'trash':
      return (
        <>
          <rect x="12" y="15" width="24" height="27" rx="5" fill="#CBD5E1" stroke={C} strokeWidth="3" />
          <path d="M9 14 H39 M19 8 H29 L31 14 H17 Z" fill={CORAL} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <line x1="20" y1="21" x2="20" y2="35" stroke={C} strokeWidth="2.6" strokeLinecap="round" />
          <line x1="28" y1="21" x2="28" y2="35" stroke={C} strokeWidth="2.6" strokeLinecap="round" />
        </>
      );
    case 'question':
      return (
        <>
          <circle cx="24" cy="24" r="19" fill={SUNNY} stroke={C} strokeWidth="3.2" />
          <path d="M18 18 C18 13 30 13 30 19 C30 23 24 24 24 28" fill="none" stroke={C} strokeWidth="4" strokeLinecap="round" />
          <circle cx="24" cy="34.5" r="2.6" fill={C} />
        </>
      );
    case 'step-1':
    case 'step-2':
    case 'step-3': {
      const bg = name === 'step-1' ? SKY : name === 'step-2' ? SUNNY : TEAL;
      const fg = name === 'step-2' ? C : W;
      const num = name.slice(-1);
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={bg} stroke={C} strokeWidth="3.2" />
          <text
            x="24"
            y="32.5"
            textAnchor="middle"
            fontFamily='"Fredoka", system-ui, sans-serif'
            fontSize="24"
            fontWeight="700"
            fill={fg}
          >
            {num}
          </text>
        </>
      );
    }
    case 'star':
      return (
        <path
          d="M24 5 L29.5 16.5 L42 18 L33 27 L35 39.5 L24 33.5 L13 39.5 L15 27 L6 18 L18.5 16.5 Z"
          fill={SUNNY}
          stroke={C}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
      );
    case 'star-glow':
      return (
        <>
          <circle cx="24" cy="24" r="20" fill={SOFT_YELLOW} stroke={SUNNY} strokeWidth="2.5" strokeDasharray="5 4" />
          <path
            d="M24 7 L28.8 17 L40 18.5 L32 26 L34 37 L24 31.8 L14 37 L16 26 L8 18.5 L19.2 17 Z"
            fill={SUNNY}
            stroke={C}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </>
      );
    case 'sparkle':
      return (
        <>
          <path d="M22 5 L25.5 17.5 L38 21 L25.5 24.5 L22 37 L18.5 24.5 L6 21 L18.5 17.5 Z" fill={SUNNY} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M37 29 L38.5 34 L43 35.5 L38.5 37 L37 42 L35.5 37 L31 35.5 L35.5 34 Z" fill={SKY} stroke={C} strokeWidth="2" strokeLinejoin="round" />
        </>
      );
    case 'trophy':
      return (
        <>
          <path d="M13 12 H7 C7 22 11 26 15 26 M35 12 H41 C41 22 37 26 33 26" fill="none" stroke={C} strokeWidth="3" strokeLinecap="round" />
          <path d="M13 8 H35 V21 C35 29 30 33 24 33 C18 33 13 29 13 21 Z" fill={SUNNY} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <rect x="21" y="33" width="6" height="6" fill={SUNNY} stroke={C} strokeWidth="2.5" />
          <rect x="15" y="39" width="18" height="5" rx="2.5" fill={ORANGE} stroke={C} strokeWidth="2.6" />
        </>
      );
    case 'medal':
      return (
        <>
          <path d="M14 5 L20 20 H28 L34 5 Z" fill={SKY} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
          <circle cx="24" cy="30" r="13" fill={SUNNY} stroke={C} strokeWidth="3" />
          <path d="M24 22 L26.2 27 L31.5 27.5 L27.5 31 L28.6 36 L24 33.3 L19.4 36 L20.5 31 L16.5 27.5 L21.8 27 Z" fill={W} stroke={C} strokeWidth="1.8" />
        </>
      );
    case 'party':
      return (
        <>
          <path d="M8 40 L16 16 L32 32 Z" fill={CORAL} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <path d="M14 25 L23 34" stroke={SUNNY} strokeWidth="3" />
          <circle cx="32" cy="12" r="3.5" fill={SUNNY} stroke={C} strokeWidth="2" />
          <circle cx="40" cy="20" r="3" fill={TEAL} stroke={C} strokeWidth="2" />
          <circle cx="25" cy="8" r="2.8" fill={SKY} stroke={C} strokeWidth="2" />
        </>
      );
    case 'target':
      return (
        <>
          <circle cx="24" cy="24" r="19" fill={W} stroke={C} strokeWidth="3" />
          <circle cx="24" cy="24" r="13" fill={CORAL} stroke={C} strokeWidth="2.5" />
          <circle cx="24" cy="24" r="7" fill={W} stroke={C} strokeWidth="2.2" />
          <circle cx="24" cy="24" r="3" fill={CORAL} />
        </>
      );
    case 'diamond':
      return (
        <path d="M13 10 H35 L43 20 L24 41 L5 20 Z" fill={SKY} stroke={C} strokeWidth="3" strokeLinejoin="round" />
      );
    case 'laptop':
      return (
        <>
          <rect x="8" y="10" width="32" height="22" rx="4" fill={SOFT_BLUE} stroke={C} strokeWidth="3" />
          <rect x="13" y="15" width="10" height="7" rx="2" fill={TEAL} />
          <rect x="26" y="15" width="9" height="4" rx="1.5" fill={SUNNY} />
          <path d="M4 34 H44 L40 41 H8 Z" fill={W} stroke={C} strokeWidth="3" strokeLinejoin="round" />
        </>
      );
    case 'mouse':
      return (
        <>
          <rect x="13" y="7" width="22" height="34" rx="11" fill={W} stroke={C} strokeWidth="3" />
          <line x1="13" y1="22" x2="35" y2="22" stroke={C} strokeWidth="2.6" />
          <line x1="24" y1="7" x2="24" y2="22" stroke={C} strokeWidth="2.6" />
          <path d="M14 21 V18 C14 12 18 8 23 8 V21 Z" fill={SUNNY} />
        </>
      );
    case 'keyboard':
      return (
        <>
          <rect x="4" y="12" width="40" height="24" rx="6" fill={W} stroke={C} strokeWidth="3" />
          <rect x="9" y="17" width="6" height="5" rx="1.5" fill={SKY} stroke={C} strokeWidth="1.6" />
          <rect x="18" y="17" width="6" height="5" rx="1.5" fill={SUNNY} stroke={C} strokeWidth="1.6" />
          <rect x="27" y="17" width="12" height="5" rx="1.5" fill={TEAL} stroke={C} strokeWidth="1.6" />
          <rect x="12" y="25" width="24" height="5" rx="2" fill={LAVENDER} stroke={C} strokeWidth="1.6" />
        </>
      );
    case 'abc':
      return (
        <>
          <rect x="4" y="6" width="40" height="36" rx="10" fill={SUNNY} stroke={C} strokeWidth="3.2" />
          <text x="24" y="30" textAnchor="middle" fontFamily='"Fredoka", sans-serif' fontSize="18" fontWeight="700" fill={C}>
            ABC
          </text>
        </>
      );
    case 'eyes':
      return (
        <>
          <ellipse cx="16" cy="24" rx="9" ry="12" fill={W} stroke={C} strokeWidth="3" />
          <ellipse cx="32" cy="24" rx="9" ry="12" fill={W} stroke={C} strokeWidth="3" />
          <circle cx="18" cy="24" r="4.5" fill={C} />
          <circle cx="34" cy="24" r="4.5" fill={C} />
          <circle cx="19.5" cy="22" r="1.5" fill={W} />
          <circle cx="35.5" cy="22" r="1.5" fill={W} />
        </>
      );
    case 'compass':
      return (
        <>
          <circle cx="24" cy="24" r="19" fill={W} stroke={C} strokeWidth="3.2" />
          <circle cx="24" cy="24" r="14" fill={SOFT_YELLOW} />
          <path d="M24 11 L29 24 L24 21 L19 24 Z" fill={CORAL} stroke={C} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M24 37 L29 24 L24 27 L19 24 Z" fill={SKY} stroke={C} strokeWidth="2.2" strokeLinejoin="round" />
        </>
      );
    case 'map':
      return (
        <>
          <path d="M5 12 L17 8 L31 13 L43 8 V36 L31 40 L17 35 L5 39 Z" fill={SOFT_YELLOW} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <path d="M11 29 Q22 28 25 20 T37 17" fill="none" stroke={TEAL} strokeWidth="3" strokeDasharray="4 3" strokeLinecap="round" />
          <path d="M34 14 L40 20 M40 14 L34 20" stroke={CORAL} strokeWidth="2.8" strokeLinecap="round" />
        </>
      );
    case 'puzzle':
      return (
        <path
          d="M10 14 H19 C19 9 27 9 27 14 H35 V22 C40 22 40 30 35 30 V38 H10 V30 C15 30 15 22 10 22 Z"
          fill={TEAL}
          stroke={C}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      );
    case 'link':
      return (
        <>
          <rect x="6" y="17" width="20" height="14" rx="7" fill="none" stroke={SKY} strokeWidth="5.5" />
          <rect x="6" y="17" width="20" height="14" rx="7" fill="none" stroke={C} strokeWidth="2" />
          <rect x="22" y="17" width="20" height="14" rx="7" fill="none" stroke={ORANGE} strokeWidth="5.5" />
          <rect x="22" y="17" width="20" height="14" rx="7" fill="none" stroke={C} strokeWidth="2" />
        </>
      );
    case 'magnet':
      return (
        <>
          <path d="M12 10 V26 A12 12 0 0 0 36 26 V10 H28 V26 A4 4 0 0 1 20 26 V10 Z" fill={CORAL} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <rect x="12" y="10" width="8" height="7" fill={W} stroke={C} strokeWidth="2.6" />
          <rect x="28" y="10" width="8" height="7" fill={W} stroke={C} strokeWidth="2.6" />
        </>
      );
    case 'magnifier':
      return (
        <>
          <line x1="29" y1="29" x2="41" y2="41" stroke={C} strokeWidth="6" strokeLinecap="round" />
          <line x1="29" y1="29" x2="41" y2="41" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
          <circle cx="20" cy="20" r="13" fill={SOFT_BLUE} stroke={C} strokeWidth="3.2" />
          <path d="M14 14 Q17 11 22 11" fill="none" stroke={W} strokeWidth="2.6" strokeLinecap="round" />
        </>
      );
    case 'wrench':
      return (
        <path
          d="M31 8 C26 10 24 15 25 20 L10 35 C8 37 8 40 10 42 C12 44 15 44 17 42 L32 27 C37 28 41 25 42 20 L36 22 L32 18 L34 12 Z"
          fill={SUNNY}
          stroke={C}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      );
    case 'scissors':
      return (
        <>
          <circle cx="14" cy="34" r="6" fill={CORAL} stroke={C} strokeWidth="3" />
          <circle cx="34" cy="34" r="6" fill={CORAL} stroke={C} strokeWidth="3" />
          <path d="M17 29 L33 9 M31 29 L15 9" stroke={C} strokeWidth="4" strokeLinecap="round" />
        </>
      );
    case 'folder':
      return (
        <>
          <path d="M5 12 H18 L22 17 H43 V39 H5 Z" fill={SUNNY} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <rect x="9" y="21" width="30" height="14" rx="3" fill={SOFT_YELLOW} />
        </>
      );
    case 'footprints':
      return (
        <>
          <ellipse cx="16" cy="20" rx="5.5" ry="9" fill={ORANGE} stroke={C} strokeWidth="2.6" />
          <ellipse cx="32" cy="30" rx="5.5" ry="9" fill={ORANGE} stroke={C} strokeWidth="2.6" />
          <circle cx="16" cy="8" r="2.2" fill={C} />
          <circle cx="32" cy="18" r="2.2" fill={C} />
        </>
      );
    case 'lightning':
      return (
        <path d="M27 4 L11 26 H23 L19 44 L37 21 H25 Z" fill={SUNNY} stroke={C} strokeWidth="3" strokeLinejoin="round" />
      );
    case 'palette':
      return (
        <>
          <path d="M24 6 C13 6 6 14 6 24 C6 33 13 40 22 40 C26 40 27 36 25 33 C24 31 27 29 30 29 H34 C39 29 42 25 42 20 C42 12 34 6 24 6 Z" fill={SOFT_YELLOW} stroke={C} strokeWidth="3" />
          <circle cx="15" cy="18" r="3" fill={CORAL} />
          <circle cx="24" cy="13" r="3" fill={SKY} />
          <circle cx="33" cy="18" r="3" fill={TEAL} />
        </>
      );
    case 'rainbow':
      return (
        <>
          <path d="M7 35 A17 17 0 0 1 41 35" fill="none" stroke={CORAL} strokeWidth="5" strokeLinecap="round" />
          <path d="M12 35 A12 12 0 0 1 36 35" fill="none" stroke={SUNNY} strokeWidth="5" strokeLinecap="round" />
          <path d="M17 35 A7 7 0 0 1 31 35" fill="none" stroke={SKY} strokeWidth="5" strokeLinecap="round" />
        </>
      );
    case 'gamepad':
      return (
        <>
          <rect x="6" y="13" width="36" height="22" rx="11" fill={LAVENDER} stroke={C} strokeWidth="3" />
          <path d="M13 24 H21 M17 20 V28" stroke={W} strokeWidth="3" strokeLinecap="round" />
          <circle cx="31" cy="21" r="2.5" fill={SUNNY} />
          <circle cx="35" cy="26" r="2.5" fill={TEAL} />
        </>
      );
    case 'numbers':
      return (
        <>
          <rect x="5" y="5" width="17" height="17" rx="5" fill={SKY} stroke={C} strokeWidth="2.5" />
          <rect x="26" y="5" width="17" height="17" rx="5" fill={SUNNY} stroke={C} strokeWidth="2.5" />
          <rect x="5" y="26" width="17" height="17" rx="5" fill={TEAL} stroke={C} strokeWidth="2.5" />
          <rect x="26" y="26" width="17" height="17" rx="5" fill={CORAL} stroke={C} strokeWidth="2.5" />
        </>
      );
    case 'box':
      return (
        <>
          <rect x="8" y="14" width="32" height="26" rx="5" fill={ORANGE} stroke={C} strokeWidth="3" />
          <path d="M8 14 L14 7 H34 L40 14 Z" fill={SUNNY} stroke={C} strokeWidth="3" strokeLinejoin="round" />
        </>
      );
    case 'thumbs-up':
      return (
        <>
          <rect x="7" y="21" width="9" height="19" rx="3" fill={SKY} stroke={C} strokeWidth="2.8" />
          <path d="M16 22 L22 10 C24 7 28 8 27 13 L25 19 H36 C39 19 41 22 40 25 L38 36 C37 39 34 40 31 40 H16 Z" fill={SUNNY} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
        </>
      );
    case 'tap':
      return (
        <>
          <circle cx="24" cy="11" r="6" fill="none" stroke={SUNNY} strokeWidth="2.5" strokeDasharray="3 3" />
          <path d="M21 39 V16 C21 13 27 13 27 16 V26 H34 C37 26 38 29 37 32 L35 39 Z" fill={SOFT_YELLOW} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
        </>
      );
    case 'point-right':
      return (
        <path d="M8 20 H34 C38 20 38 26 34 26 H26 V32 C26 35 23 37 20 37 H12 C9 37 8 34 8 31 Z" fill={SUNNY} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
      );
    case 'hand':
      return (
        <path d="M12 24 V14 C12 11 16 11 16 14 V22 V9 C16 6 21 6 21 9 V22 V10 C21 7 26 7 26 10 V22 V13 C26 10 31 10 31 13 V25 L35 21 C38 22 39 26 36 30 L30 39 H15 C12 39 12 32 12 24 Z" fill={SOFT_YELLOW} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
      );
    case 'fist':
      return (
        <rect x="11" y="13" width="26" height="25" rx="9" fill={SUNNY} stroke={C} strokeWidth="3" />
      );
    case 'thinking':
    case 'happy':
    case 'sad':
    case 'dizzy':
    case 'tired':
      return (
        <>
          <circle cx="24" cy="24" r="18" fill={SUNNY} stroke={C} strokeWidth="3" />
          <circle cx="18" cy="20" r="2.6" fill={C} />
          <circle cx="30" cy="20" r="2.6" fill={C} />
          {name === 'happy' && <path d="M16 28 Q24 35 32 28" fill="none" stroke={C} strokeWidth="2.8" strokeLinecap="round" />}
          {name === 'sad' && <path d="M16 33 Q24 27 32 33" fill="none" stroke={C} strokeWidth="2.8" strokeLinecap="round" />}
          {name === 'thinking' && <line x1="18" y1="30" x2="29" y2="29" stroke={C} strokeWidth="2.8" strokeLinecap="round" />}
          {(name === 'dizzy' || name === 'tired') && (
            <path d="M16 31 Q20 28 24 31 T32 31" fill="none" stroke={CORAL} strokeWidth="2.8" strokeLinecap="round" />
          )}
        </>
      );
    case 'see-no-evil':
      return (
        <>
          <circle cx="24" cy="25" r="16" fill={ORANGE} stroke={C} strokeWidth="3" />
          <ellipse cx="17" cy="25" rx="6" ry="8" fill={SOFT_YELLOW} stroke={C} strokeWidth="2.4" />
          <ellipse cx="31" cy="25" rx="6" ry="8" fill={SOFT_YELLOW} stroke={C} strokeWidth="2.4" />
        </>
      );
    case 'raise-hand':
      return (
        <>
          <circle cx="24" cy="17" r="8" fill={SUNNY} stroke={C} strokeWidth="2.8" />
          <path d="M13 40 C13 30 35 30 35 40 Z" fill={SKY} stroke={C} strokeWidth="2.8" />
          <path d="M35 28 V11" stroke={C} strokeWidth="4" strokeLinecap="round" />
        </>
      );
    case 'muscle':
      return (
        <path d="M11 36 C9 26 14 15 21 15 C24 15 25 20 22 24 C29 22 37 25 37 32 C37 38 30 40 20 40 Z" fill={ORANGE} stroke={C} strokeWidth="3" strokeLinejoin="round" />
      );
    case 'brain':
      return (
        <>
          <path d="M24 10 C15 10 10 16 10 23 C8 29 13 36 20 36 H24 V10 Z" fill="#FBCFE8" stroke={C} strokeWidth="2.8" />
          <path d="M24 10 C33 10 38 16 38 23 C40 29 35 36 28 36 H24 V10 Z" fill="#F9A8D4" stroke={C} strokeWidth="2.8" />
        </>
      );
    case 'speak':
      return (
        <>
          <circle cx="17" cy="24" r="10" fill={SKY} stroke={C} strokeWidth="2.8" />
          <path d="M31 18 Q36 24 31 30 M36 14 Q43 24 36 34" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
        </>
      );
    case 'clock':
      return (
        <>
          <circle cx="24" cy="24" r="18" fill={W} stroke={C} strokeWidth="3.2" />
          <circle cx="24" cy="24" r="14" fill={SOFT_BLUE} />
          <path d="M24 14 V24 L31 28" fill="none" stroke={C} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case 'feather':
      return (
        <path d="M38 8 C24 9 14 18 11 34 L7 41 L14 37 C28 34 37 23 38 8 Z" fill={SKY} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
      );
    case 'biko':
      return (
        <>
          <circle cx="12" cy="17" r="5" fill="#D97706" stroke={C} strokeWidth="2.5" />
          <circle cx="36" cy="17" r="5" fill="#D97706" stroke={C} strokeWidth="2.5" />
          <circle cx="24" cy="26" r="15" fill="#F59E0B" stroke={C} strokeWidth="3" />
          <ellipse cx="24" cy="29" rx="10" ry="8" fill={SOFT_YELLOW} />
          <circle cx="19" cy="25" r="2.2" fill={C} />
          <circle cx="29" cy="25" r="2.2" fill={C} />
          <ellipse cx="24" cy="29" rx="3" ry="2" fill={C} />
        </>
      );
    case 'bunny':
      return (
        <>
          <ellipse cx="18" cy="13" rx="4.5" ry="10" fill={W} stroke={C} strokeWidth="2.8" />
          <ellipse cx="30" cy="13" rx="4.5" ry="10" fill={W} stroke={C} strokeWidth="2.8" />
          <circle cx="24" cy="29" r="13" fill={W} stroke={C} strokeWidth="3" />
          <circle cx="20" cy="27" r="2" fill={C} />
          <circle cx="28" cy="27" r="2" fill={C} />
          <circle cx="24" cy="31" r="2" fill="#F472B6" />
        </>
      );
    case 'carrot':
      return (
        <>
          <path d="M24 14 C19 6 14 9 20 15 C24 6 27 6 28 15 C34 9 29 6 24 14 Z" fill={TEAL} stroke={C} strokeWidth="2.2" />
          <path d="M16 17 Q24 13 32 17 L25 41 Q24 44 23 41 Z" fill={ORANGE} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
        </>
      );
    case 'balloon':
      return (
        <>
          <path d="M24 35 Q20 40 24 44" fill="none" stroke={C} strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="24" cy="20" rx="13" ry="15" fill={CORAL} stroke={C} strokeWidth="3" />
          <ellipse cx="19" cy="14" rx="3" ry="5" fill={W} opacity="0.6" />
        </>
      );
    case 'train':
      return (
        <>
          <rect x="7" y="14" width="34" height="20" rx="5" fill={CORAL} stroke={C} strokeWidth="3" />
          <rect x="26" y="8" width="11" height="10" rx="3" fill={SKY} stroke={C} strokeWidth="2.6" />
          <rect x="11" y="8" width="6" height="6" fill={SUNNY} stroke={C} strokeWidth="2.4" />
          <circle cx="15" cy="36" r="4.5" fill={CHARCOAL_WHEEL} stroke={C} strokeWidth="2.4" />
          <circle cx="33" cy="36" r="4.5" fill={CHARCOAL_WHEEL} stroke={C} strokeWidth="2.4" />
        </>
      );
    case 'rocket':
      return (
        <>
          <path d="M24 5 C33 13 34 26 29 34 H19 C14 26 15 13 24 5 Z" fill={W} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="24" cy="19" r="4.5" fill={SKY} stroke={C} strokeWidth="2.2" />
          <path d="M19 34 L24 44 L29 34 Z" fill={ORANGE} stroke={C} strokeWidth="2.2" strokeLinejoin="round" />
        </>
      );
    case 'turtle':
      return (
        <>
          <path d="M10 30 C10 15 36 15 36 30 Z" fill={TEAL} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="40" cy="26" r="5" fill="#86EFAC" stroke={C} strokeWidth="2.6" />
          <rect x="14" y="30" width="5" height="6" rx="2" fill="#86EFAC" stroke={C} strokeWidth="2.2" />
          <rect x="27" y="30" width="5" height="6" rx="2" fill="#86EFAC" stroke={C} strokeWidth="2.2" />
        </>
      );
    case 'bug':
      return (
        <>
          <circle cx="24" cy="14" r="6" fill={C} />
          <ellipse cx="24" cy="28" rx="12" ry="12" fill={CORAL} stroke={C} strokeWidth="3" />
          <line x1="24" y1="16" x2="24" y2="40" stroke={C} strokeWidth="2.4" />
          <circle cx="19" cy="25" r="2.2" fill={C} />
          <circle cx="29" cy="25" r="2.2" fill={C} />
          <circle cx="20" cy="33" r="2" fill={C} />
          <circle cx="28" cy="33" r="2" fill={C} />
        </>
      );
    case 'rock':
      return (
        <path d="M8 38 L12 20 L22 12 L35 15 L41 27 L39 38 Z" fill="#94A3B8" stroke={C} strokeWidth="3" strokeLinejoin="round" />
      );
    case 'bush':
      return (
        <>
          <path d="M8 36 C5 27 11 19 18 19 C20 11 31 10 34 18 C42 18 44 27 40 36 Z" fill={TEAL} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="18" cy="27" r="2.5" fill={CORAL} />
          <circle cx="30" cy="24" r="2.5" fill={SUNNY} />
        </>
      );
    case 'cactus':
      return (
        <>
          <path d="M20 40 V12 C20 8 28 8 28 12 V40 Z" fill="#22C55E" stroke={C} strokeWidth="2.8" />
          <path d="M20 26 H13 V18 M28 23 H35 V15" fill="none" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 26 H13 V18 M28 23 H35 V15" fill="none" stroke={C} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case 'palm':
    case 'island':
      return (
        <>
          <path d="M12 40 Q24 32 36 40 Z" fill={SUNNY} stroke={C} strokeWidth="2.6" />
          <path d="M24 35 Q24 23 27 16" fill="none" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
          <path d="M27 16 C17 10 11 14 10 20 C17 18 22 18 27 16 Z" fill={TEAL} stroke={C} strokeWidth="2.2" />
          <path d="M27 16 C37 10 41 14 41 20 C35 18 31 18 27 16 Z" fill={TEAL} stroke={C} strokeWidth="2.2" />
        </>
      );
    case 'tree':
      return (
        <>
          <rect x="21" y="29" width="6" height="13" fill="#92400E" stroke={C} strokeWidth="2.4" />
          <circle cx="24" cy="19" r="13" fill={TEAL} stroke={C} strokeWidth="3" />
        </>
      );
    case 'sprout':
      return (
        <>
          <path d="M24 40 V22" stroke={TEAL} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M24 24 C13 24 10 14 14 11 C21 12 24 18 24 24 Z" fill={TEAL} stroke={C} strokeWidth="2.5" />
          <path d="M24 22 C35 22 38 12 34 9 C27 10 24 16 24 22 Z" fill="#4ADE80" stroke={C} strokeWidth="2.5" />
        </>
      );
    case 'moon':
      return (
        <path d="M31 10 A15 15 0 1 0 38 33 A12 12 0 1 1 31 10 Z" fill={SUNNY} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
      );
    case 'flag':
      return (
        <>
          <rect x="12" y="8" width="4" height="33" rx="2" fill={W} stroke={C} strokeWidth="2.4" />
          <path d="M16 9 L39 14 L33 20 L39 26 L16 29 Z" fill={TEAL} stroke={C} strokeWidth="2.6" strokeLinejoin="round" />
        </>
      );
    case 'chest':
      return (
        <>
          <rect x="8" y="20" width="32" height="20" rx="5" fill="#B45309" stroke={C} strokeWidth="2.8" />
          <path d="M8 21 C8 11 40 11 40 21 Z" fill={ORANGE} stroke={C} strokeWidth="2.8" />
          <rect x="20" y="21" width="8" height="9" rx="2" fill={SUNNY} stroke={C} strokeWidth="2.2" />
        </>
      );
    case 'toothbrush':
      return (
        <>
          <rect x="8" y="23" width="32" height="6" rx="3" fill={SKY} stroke={C} strokeWidth="2.6" />
          <rect x="28" y="13" width="11" height="10" rx="3" fill={W} stroke={C} strokeWidth="2.6" />
        </>
      );
    case 'teeth':
      return (
        <path d="M12 14 C12 9 20 9 24 13 C28 9 36 9 36 14 L34 36 C33 39 28 39 27 33 L24 27 L21 33 C20 39 15 39 14 36 Z" fill={W} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
      );
    case 'water':
      return (
        <path d="M24 7 C24 7 11 22 11 30 A13 13 0 0 0 37 30 C37 22 24 7 24 7 Z" fill={SKY} stroke={C} strokeWidth="3" strokeLinejoin="round" />
      );
    case 'bread':
    case 'sandwich':
      return (
        <>
          <path d="M9 19 C7 12 15 8 24 8 C33 8 41 12 39 19 V36 H9 Z" fill={SOFT_YELLOW} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          {name === 'sandwich' && <rect x="11" y="22" width="26" height="5" rx="2" fill={TEAL} />}
        </>
      );
    case 'chocolate':
      return (
        <>
          <rect x="11" y="8" width="26" height="32" rx="4" fill="#78350F" stroke={C} strokeWidth="2.8" />
          <rect x="11" y="22" width="26" height="18" rx="3" fill={CORAL} stroke={C} strokeWidth="2.4" />
        </>
      );
    case 'soap':
      return (
        <>
          <ellipse cx="24" cy="27" rx="16" ry="10" fill={LAVENDER} stroke={C} strokeWidth="3" />
          <circle cx="15" cy="14" r="4" fill={SOFT_BLUE} stroke={C} strokeWidth="2" />
          <circle cx="24" cy="11" r="3" fill={SOFT_BLUE} stroke={C} strokeWidth="2" />
        </>
      );
    case 'cup':
      return (
        <>
          <path d="M13 15 H35 L32 40 H16 Z" fill={SKY} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M26 15 L31 6" stroke={CORAL} strokeWidth="3.5" strokeLinecap="round" />
        </>
      );
    case 'hammer':
      return (
        <>
          <line x1="12" y1="38" x2="29" y2="21" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
          <rect x="20" y="9" width="18" height="10" rx="3" transform="rotate(45 29 14)" fill="#94A3B8" stroke={C} strokeWidth="2.6" />
        </>
      );
    case 'heart':
      return (
        <path
          d="M24 39 C24 39 7 29 7 17 C7 11 12 7 17 7 C21 7 24 10 24 10 C24 10 27 7 31 7 C36 7 41 11 41 17 C41 29 24 39 24 39 Z"
          fill={CORAL}
          stroke={C}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      );
    case 'chef':
      return (
        <>
          <path d="M12 27 C7 25 8 15 15 14 C17 7 31 7 33 14 C40 15 41 25 36 27 Z" fill={W} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
          <rect x="13" y="27" width="22" height="10" rx="3" fill={W} stroke={C} strokeWidth="2.8" />
        </>
      );
    case 'hero':
      return (
        <>
          <path d="M12 12 L36 12 L33 34 L24 41 L15 34 Z" fill={CORAL} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <path d="M24 16 L26.5 22 L32 22.5 L27.8 26.2 L29 31.5 L24 28.5 L19 31.5 L20.2 26.2 L16 22.5 L21.5 22 Z" fill={SUNNY} />
        </>
      );
    case 'cloud-sad':
      return (
        <>
          <path d="M11 33 C6 33 5 25 10 22 C10 14 19 11 25 15 C31 11 40 15 39 23 C43 25 42 33 36 33 Z" fill="#CBD5E1" stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M18 28 Q24 24 30 28" fill="none" stroke={C} strokeWidth="2.4" strokeLinecap="round" />
        </>
      );
    case 'barrier':
      return (
        <>
          <rect x="6" y="13" width="36" height="12" rx="4" fill={SUNNY} stroke={C} strokeWidth="2.8" />
          <path d="M14 13 L18 25 M26 13 L30 25" stroke={CORAL} strokeWidth="4" />
          <line x1="13" y1="25" x2="13" y2="39" stroke={C} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="35" y1="25" x2="35" y2="39" stroke={C} strokeWidth="3.5" strokeLinecap="round" />
        </>
      );
    case 'wind':
      return (
        <>
          <path d="M8 18 H32 A5 5 0 1 0 28 12" fill="none" stroke={SKY} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M8 28 H36 A5 5 0 1 1 32 34" fill="none" stroke={TEAL} strokeWidth="3.5" strokeLinecap="round" />
        </>
      );
    case 'square-blue':
      return <rect x="8" y="8" width="32" height="32" rx="8" fill={SKY} stroke={C} strokeWidth="3" />;
    case 'dot-red':
      return <circle cx="24" cy="24" r="16" fill={CORAL} stroke={C} strokeWidth="3" />;
    case 'dot-yellow':
      return <circle cx="24" cy="24" r="16" fill={SUNNY} stroke={C} strokeWidth="3" />;
    case 'dot-green':
      return <circle cx="24" cy="24" r="16" fill={TEAL} stroke={C} strokeWidth="3" />;
    case 'dot-blue':
      return <circle cx="24" cy="24" r="16" fill={SKY} stroke={C} strokeWidth="3" />;
    case 'shape-diamond':
      return <polygon points="24,6 42,24 24,42 6,24" fill={SKY} stroke={C} strokeWidth="3" strokeLinejoin="round" />;
    case 'house':
      return (
        <>
          <path d="M8 22 L24 8 L40 22 V41 H8 Z" fill={SOFT_YELLOW} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <path d="M5 23 L24 6 L43 23" fill="none" stroke={CORAL} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 23 L24 6 L43 23" fill="none" stroke={C} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="19" y="27" width="10" height="14" rx="2" fill={SKY} stroke={C} strokeWidth="2.6" />
        </>
      );
    case 'cat':
      return (
        <>
          <path d="M10 19 L12 8 L21 15 Z" fill={ORANGE} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M38 19 L36 8 L27 15 Z" fill={ORANGE} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
          <ellipse cx="24" cy="27" rx="15" ry="13" fill={SUNNY} stroke={C} strokeWidth="3" />
          <circle cx="19" cy="25" r="2.3" fill={C} />
          <circle cx="29" cy="25" r="2.3" fill={C} />
          <polygon points="22,29 26,29 24,32" fill={CORAL} />
          <path d="M12 27 H7 M12 31 H8 M36 27 H41 M36 31 H40" stroke={C} strokeWidth="2.2" strokeLinecap="round" />
        </>
      );
    case 'landscape':
      return (
        <>
          <rect x="5" y="7" width="38" height="34" rx="8" fill={SOFT_BLUE} stroke={C} strokeWidth="3" />
          <circle cx="33" cy="16" r="4.5" fill={SUNNY} stroke={C} strokeWidth="2.2" />
          <path d="M7 35 L17 20 L26 30 L32 23 L41 35 V37 C41 39 39 41 37 41 H11 C9 41 7 39 7 37 Z" fill={TEAL} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
        </>
      );
    case 'plus-circle':
      return (
        <>
          <circle cx="24" cy="24" r="18" fill={SKY} stroke={C} strokeWidth="3.2" />
          <line x1="24" y1="14" x2="24" y2="34" stroke={W} strokeWidth="4.8" strokeLinecap="round" />
          <line x1="14" y1="24" x2="34" y2="24" stroke={W} strokeWidth="4.8" strokeLinecap="round" />
        </>
      );
    case 'stage':
      return (
        <>
          <rect x="5" y="9" width="38" height="28" rx="7" fill={W} stroke={C} strokeWidth="3" />
          <path d="M5 16 Q13 21 15 9 M43 16 Q35 21 33 9" fill={CORAL} stroke={C} strokeWidth="2.4" strokeLinejoin="round" />
          <rect x="13" y="37" width="22" height="5" rx="2.5" fill={SUNNY} stroke={C} strokeWidth="2.4" />
        </>
      );
    case 'car-red':
    case 'car-blue': {
      const carColor = name === 'car-red' ? CORAL : SKY;
      return (
        <>
          <path d="M12 22 L16 12 H32 L36 22 Z" fill={SOFT_BLUE} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
          <rect x="6" y="21" width="36" height="14" rx="6" fill={carColor} stroke={C} strokeWidth="3" />
          <circle cx="15" cy="36" r="5" fill={C} />
          <circle cx="15" cy="36" r="2" fill={W} />
          <circle cx="33" cy="36" r="5" fill={C} />
          <circle cx="33" cy="36" r="2" fill={W} />
        </>
      );
    }
    case 'road':
      return (
        <>
          <path d="M13 8 H35 L42 40 H6 Z" fill="#475569" stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <line x1="24" y1="13" x2="24" y2="19" stroke={SUNNY} strokeWidth="3.2" strokeLinecap="round" />
          <line x1="24" y1="24" x2="24" y2="30" stroke={SUNNY} strokeWidth="3.2" strokeLinecap="round" />
          <line x1="24" y1="35" x2="24" y2="38" stroke={SUNNY} strokeWidth="3.2" strokeLinecap="round" />
        </>
      );
    case 'traffic-light':
      return (
        <>
          <rect x="15" y="6" width="18" height="36" rx="7" fill={C} />
          <circle cx="24" cy="14" r="4" fill={CORAL} />
          <circle cx="24" cy="24" r="4" fill={SUNNY} />
          <circle cx="24" cy="34" r="4" fill={TEAL} />
        </>
      );
    case 'dot-purple':
      return <circle cx="24" cy="24" r="16" fill={LAVENDER} stroke={C} strokeWidth="3" />;
    case 'elephant':
      return (
        <>
          <ellipse cx="14" cy="22" rx="7" ry="11" fill="#CBD5E1" stroke={C} strokeWidth="2.8" />
          <circle cx="26" cy="24" r="13" fill="#94A3B8" stroke={C} strokeWidth="3" />
          <path d="M37 25 C43 26, 44 35, 38 38" fill="none" stroke={C} strokeWidth="5.5" strokeLinecap="round" />
          <path d="M37 25 C43 26, 44 35, 38 38" fill="none" stroke="#94A3B8" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="29" cy="20" r="2.3" fill={C} />
        </>
      );
    case 'bird':
      return (
        <>
          <ellipse cx="22" cy="26" rx="13" ry="11" fill={SKY} stroke={C} strokeWidth="3" />
          <path d="M9 24 L4 18 L12 20 Z" fill={SKY} stroke={C} strokeWidth="2.4" strokeLinejoin="round" />
          <polygon points="34,21 43,25 34,28" fill={SUNNY} stroke={C} strokeWidth="2.4" strokeLinejoin="round" />
          <circle cx="27" cy="22" r="2.2" fill={C} />
          <path d="M16 26 Q21 20 24 28 Z" fill={SOFT_BLUE} stroke={C} strokeWidth="2" />
        </>
      );
    case 'grow':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={LAVENDER} stroke={C} strokeWidth="3.2" />
          <circle cx="24" cy="24" r="6" fill={W} stroke={C} strokeWidth="2.4" />
          <path d="M11 17 V11 H17 M31 11 H37 V17 M11 31 V37 H17 M31 37 H37 V31" fill="none" stroke={W} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case 'shrink':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={LAVENDER} stroke={C} strokeWidth="3.2" />
          <circle cx="24" cy="24" r="5" fill={W} stroke={C} strokeWidth="2.4" />
          <path d="M8 10 L16 18 M40 10 L32 18 M8 38 L16 30 M40 38 L32 30" fill="none" stroke={W} strokeWidth="3.2" strokeLinecap="round" />
        </>
      );
    case 'start-tap':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={SUNNY} stroke={C} strokeWidth="3.2" />
          <circle cx="20" cy="16" r="4.5" fill={W} stroke={C} strokeWidth="2.4" />
          <path d="M12 31 C12 24, 28 24, 28 31" fill={W} stroke={C} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M27 23 L35 30 L32 32 L36 37 L33 39 L29 34 L26 36 Z" fill={CORAL} stroke={C} strokeWidth="2.2" strokeLinejoin="round" />
        </>
      );
    case 'hide':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={LAVENDER} stroke={C} strokeWidth="3.2" />
          <circle cx="24" cy="17" r="5" fill="none" stroke={W} strokeWidth="2.8" strokeDasharray="3.5 3" />
          <path d="M14 35 C14 25, 34 25, 34 35 Z" fill="none" stroke={W} strokeWidth="2.8" strokeDasharray="4 3" strokeLinejoin="round" />
        </>
      );
    case 'show':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={LAVENDER} stroke={C} strokeWidth="3.2" />
          <circle cx="24" cy="17" r="5.2" fill={W} stroke={C} strokeWidth="2.4" />
          <path d="M14 35 C14 25, 34 25, 34 35 Z" fill={W} stroke={C} strokeWidth="2.4" strokeLinejoin="round" />
        </>
      );
    case 'speaker':
      return (
        <>
          <path d="M8 19 H16 L28 10 V38 L16 29 H8 Z" fill={TEAL} stroke={C} strokeWidth="3" strokeLinejoin="round" />
          <path d="M33 17 Q39 24 33 31" fill="none" stroke={SUNNY} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M38 12 Q46 24 38 36" fill="none" stroke={CORAL} strokeWidth="3.2" strokeLinecap="round" />
        </>
      );
    case 'mic':
      return (
        <>
          <rect x="17" y="6" width="14" height="22" rx="7" fill={SUNNY} stroke={C} strokeWidth="3" />
          <path d="M12 22 C12 31, 36 31, 36 22" fill="none" stroke={C} strokeWidth="3.2" strokeLinecap="round" />
          <line x1="24" y1="30" x2="24" y2="41" stroke={C} strokeWidth="3.4" strokeLinecap="round" />
          <line x1="16" y1="41" x2="32" y2="41" stroke={C} strokeWidth="3.4" strokeLinecap="round" />
        </>
      );
    case 'bubble':
      return (
        <>
          <circle cx="20" cy="26" r="13" fill={SOFT_BLUE} stroke={SKY} strokeWidth="3" />
          <path d="M14 21 Q17 17 22 18" fill="none" stroke={W} strokeWidth="3" strokeLinecap="round" />
          <circle cx="36" cy="14" r="7" fill={SOFT_BLUE} stroke={TEAL} strokeWidth="2.6" />
          <circle cx="35" cy="34" r="4.5" fill={SOFT_YELLOW} stroke={SUNNY} strokeWidth="2.2" />
        </>
      );
    case 'music-note':
      return (
        <>
          <path d="M19 33 V11 L37 7 V28" fill="none" stroke={C} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 16 L37 12" fill="none" stroke={LAVENDER} strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="14" cy="35" rx="6.5" ry="5" fill={CORAL} stroke={C} strokeWidth="2.8" />
          <ellipse cx="32" cy="30" rx="6.5" ry="5" fill={SUNNY} stroke={C} strokeWidth="2.8" />
        </>
      );
    case 'mute':
      return (
        <>
          <circle cx="24" cy="24" r="17" fill={SOFT_YELLOW} stroke={C} strokeWidth="3" />
          <circle cx="18" cy="20" r="2.2" fill={C} />
          <circle cx="30" cy="20" r="2.2" fill={C} />
          <rect x="21" y="23" width="6" height="15" rx="3" fill={ORANGE} stroke={C} strokeWidth="2.4" />
          <line x1="17" y1="29" x2="31" y2="29" stroke={C} strokeWidth="2.2" strokeLinecap="round" />
        </>
      );
    case 'say':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={LAVENDER} stroke={C} strokeWidth="3.2" />
          <path d="M12 15 H36 V30 H24 L17 36 V30 H12 Z" fill={W} stroke={C} strokeWidth="2.6" strokeLinejoin="round" />
          <line x1="18" y1="21" x2="30" y2="21" stroke={C} strokeWidth="2.6" strokeLinecap="round" />
          <line x1="18" y1="25" x2="26" y2="25" stroke={LAVENDER} strokeWidth="2.4" strokeLinecap="round" />
        </>
      );
    case 'wait':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={ORANGE} stroke={C} strokeWidth="3.2" />
          <circle cx="24" cy="24" r="12" fill={W} stroke={C} strokeWidth="2.6" />
          <path d="M24 16 V24 L30 27" fill="none" stroke={C} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case 'pencil':
      return (
        <>
          <path d="M11 32 L30 13 L36 19 L17 38 H11 Z" fill={SUNNY} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M28 15 L33 10 L39 16 L34 21 Z" fill={CORAL} stroke={C} strokeWidth="2.6" strokeLinejoin="round" />
          <polygon points="11,32 17,38 9,40" fill={C} />
        </>
      );
    case 'ear':
      return (
        <>
          <circle cx="24" cy="24" r="17" fill={SOFT_YELLOW} stroke={C} strokeWidth="3" />
          <path d="M20 33 C17 33, 16 27, 19 25 C21 23, 18 18, 22 15 C27 12, 33 16, 32 23 C31 28, 26 30, 26 34" fill="none" stroke={CORAL} strokeWidth="3.2" strokeLinecap="round" />
          <path d="M10 18 Q7 24 10 30" fill="none" stroke={TEAL} strokeWidth="2.8" strokeLinecap="round" />
        </>
      );
    case 'scroll':
      return (
        <>
          <rect x="11" y="9" width="26" height="30" rx="5" fill={SOFT_YELLOW} stroke={C} strokeWidth="2.8" />
          <line x1="16" y1="17" x2="32" y2="17" stroke={C} strokeWidth="2.6" strokeLinecap="round" />
          <line x1="16" y1="23" x2="32" y2="23" stroke={C} strokeWidth="2.6" strokeLinecap="round" />
          <line x1="16" y1="29" x2="27" y2="29" stroke={CORAL} strokeWidth="2.6" strokeLinecap="round" />
        </>
      );
    case 'paintbrush':
      return (
        <>
          <path d="M12 36 C9 30, 14 23, 21 23 L35 9 L39 13 L25 27 C25 34, 18 39, 12 36 Z" fill={SUNNY} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M12 36 C8 34, 10 26, 17 25 C21 25, 22 30, 18 35 C15 38, 13 37, 12 36 Z" fill={CORAL} stroke={C} strokeWidth="2.4" />
        </>
      );
    case 'paint-bucket':
      return (
        <>
          <path d="M12 20 L25 9 L37 22 L24 34 Z" fill={SKY} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M19 15 C19 8, 29 8, 29 14" fill="none" stroke={C} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M35 23 C41 25, 42 35, 36 39 C31 39, 32 30, 35 23 Z" fill={LAVENDER} stroke={C} strokeWidth="2.4" />
        </>
      );
    case 'monster':
      return (
        <>
          <path d="M13 15 L10 6 L19 11 M35 15 L38 6 L29 11" fill={SUNNY} stroke={C} strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="9" y="12" width="30" height="28" rx="12" fill={LAVENDER} stroke={C} strokeWidth="3" />
          <circle cx="17" cy="23" r="3.5" fill={W} stroke={C} strokeWidth="2" />
          <circle cx="24" cy="20" r="3.5" fill={W} stroke={C} strokeWidth="2" />
          <circle cx="31" cy="23" r="3.5" fill={W} stroke={C} strokeWidth="2" />
          <circle cx="17" cy="23" r="1.4" fill={C} />
          <circle cx="24" cy="20" r="1.4" fill={C} />
          <circle cx="31" cy="23" r="1.4" fill={C} />
          <path d="M17 31 Q24 36 31 31" fill="none" stroke={C} strokeWidth="2.6" strokeLinecap="round" />
        </>
      );
    case 'shapes-circle':
      return (
        <>
          <circle cx="17" cy="19" r="10" fill={CORAL} stroke={C} strokeWidth="2.8" />
          <rect x="23" y="21" width="17" height="17" rx="4" fill={SKY} stroke={C} strokeWidth="2.8" />
        </>
      );
    case 'undo':
      return (
        <>
          <circle cx="24" cy="24" r="17" fill={SOFT_YELLOW} stroke={C} strokeWidth="3" />
          <path d="M18 16 L11 23 L18 30" fill="none" stroke={C} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 23 H28 C33 23, 36 26, 36 31" fill="none" stroke={C} strokeWidth="3.2" strokeLinecap="round" />
        </>
      );
    case 'school':
      return (
        <>
          <path d="M6 22 L24 9 L42 22 V41 H6 Z" fill={SOFT_YELLOW} stroke={C} strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M4 23 L24 7 L44 23" fill="none" stroke={CORAL} strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="18" r="4" fill={SUNNY} stroke={C} strokeWidth="2.2" />
          <rect x="19" y="28" width="10" height="13" rx="2" fill={SKY} stroke={C} strokeWidth="2.4" />
          <rect x="10" y="28" width="5" height="6" rx="1" fill={TEAL} stroke={C} strokeWidth="1.8" />
          <rect x="33" y="28" width="5" height="6" rx="1" fill={TEAL} stroke={C} strokeWidth="1.8" />
        </>
      );
    case 'door':
      return (
        <>
          <rect x="11" y="7" width="26" height="34" rx="4" fill={ORANGE} stroke={C} strokeWidth="3" />
          <rect x="15" y="11" width="18" height="26" rx="2" fill={SOFT_YELLOW} stroke={C} strokeWidth="2.2" />
          <circle cx="30" cy="24" r="2.6" fill={C} />
        </>
      );
    case 'go-page-2':
      return (
        <>
          <rect x="4" y="4" width="40" height="40" rx="11" fill={CORAL} stroke={C} strokeWidth="3.2" />
          <rect x="12" y="11" width="24" height="26" rx="4" fill={W} stroke={C} strokeWidth="2.6" />
          <text x="24" y="30" textAnchor="middle" fill={C} fontSize="16" fontWeight="800" fontFamily="Fredoka, sans-serif">
            2
          </text>
        </>
      );
    default:
      return <circle cx="24" cy="24" r="16" fill={SUNNY} stroke={C} strokeWidth="3" />;
  }
}

const CHARCOAL_WHEEL = '#334155';

export interface JuniorIconProps {
  name: JuniorIconName;
  size?: number;
  style?: CSSProperties;
}

/**
 * Unified chunky-outlined cartoon SVG icon component for CODEPOLITAN Junior slides.
 */
export const JuniorIcon = ({ name, size = 28, style }: JuniorIconProps) => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      verticalAlign: '-0.18em',
      flexShrink: 0,
      ...style,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {renderGlyph(name)}
    </svg>
  </span>
);

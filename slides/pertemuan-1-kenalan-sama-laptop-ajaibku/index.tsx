import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import bikoWave from '../../assets/biko/biko-wave.png';
import bikoPointLeft from '../../assets/biko/biko-point-left.png';
import bikoThumbsUp from '../../assets/biko/biko-thumbs-up.png';
import bikoJump from '../../assets/biko/biko-jump.png';

import imgLogoCdpl from '../../Gambar/logo cdpl.png';
import imgLaptop from '../../Gambar/laptop.png';
import imgLayar from '../../Gambar/layar monitor.jpeg';
import imgTrackpad from '../../Gambar/trackpad laptop.jpg';
import imgMouse from '../../Gambar/mouse wireles.jpg';

import imgTanganBersih from '../../assets/pertemuan-1/tangan-bersih-laptop.jpg';
import imgBahayaAir from '../../assets/pertemuan-1/bahaya-air-laptop.jpg';
import imgBukaDuaTangan from '../../assets/pertemuan-1/buka-dua-tangan.jpg';
import imgDudukTegak from '../../assets/pertemuan-1/duduk-tegak-rapi.jpg';

// ============================================================================
// Webfont Loading & Scoped Styles
// ============================================================================
const SLIDE_ID = 'pertemuan-1-kenalan-sama-laptop-ajaibku';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const SCOPED_CSS = `
.cpj-card-btn {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms ease;
  cursor: pointer;
}
.cpj-card-btn:hover {
  transform: translateY(-3px);
}
.cpj-card-btn:active {
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

// ============================================================================
// Design System & Cheerful Kid-Friendly Palette
// ============================================================================
export const design: DesignSystem = {
  palette: {
    bg: '#FFF6D6',
    text: '#1E1E2C',
    accent: '#10B981',
  },
  fonts: {
    display: '"Fredoka", "Plus Jakarta Sans", system-ui, sans-serif',
    body: '"Plus Jakarta Sans", system-ui, sans-serif',
  },
  typeScale: {
    hero: 84,
    body: 28,
  },
  radius: 36,
};

const WHITE = '#FFFFFF';
const CHARCOAL = '#1E1E2C';
const TEAL = '#10B981';
const TEAL_LIGHT = '#A7F3D0';
const CORAL = '#F45B49';
const CORAL_LIGHT = '#FDA4AF';
const SUNNY = '#FBBF24';
const SUNNY_BRIGHT = '#FDE047';
const SUNNY_LIGHT = '#FDE68A';
const SKY = '#38BDF8';
const SKY_LIGHT = '#BAE6FD';
const LAVENDER = '#A78BFA';
const LAVENDER_LIGHT = '#DDD6FE';
const PINK_LIGHT = '#FBCFE8';

const SOFT_SHADOW = '0 14px 34px rgba(30, 30, 44, 0.08)';

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

// ============================================================================
// Clean Cheerful Primitives (Logo top-right on all slides, zero corner text clutter)
// ============================================================================
const CleanCanvas = ({
  bg = 'linear-gradient(135deg, #FFF7CC 0%, #FFFDF2 50%, #E0F7FA 100%)',
  blobA = '#FDE68A',
  blobB = '#BAE6FD',
  children,
}: {
  bg?: string;
  blobA?: string;
  blobB?: string;
  children: ReactNode;
}) => (
  <div
    data-osd-interactive="true"
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: bg,
      color: CHARCOAL,
      fontFamily: 'var(--osd-font-body)',
      overflow: 'hidden',
      WebkitFontSmoothing: 'antialiased',
    }}
  >
    {/* Subtle Cheerful Pastel Ambient Circles */}
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: -110,
        bottom: -120,
        width: 420,
        height: 420,
        borderRadius: 999,
        background: blobA,
        opacity: 0.35,
        pointerEvents: 'none',
      }}
    />
    <div
      aria-hidden
      style={{
        position: 'absolute',
        right: -90,
        top: -100,
        width: 360,
        height: 360,
        borderRadius: 999,
        background: blobB,
        opacity: 0.35,
        pointerEvents: 'none',
      }}
    />

    {/* Codepolitan Logo in Top-Right on Every Slide */}
    <img
      src={imgLogoCdpl}
      alt="Logo CODEPOLITAN"
      draggable={false}
      style={{
        position: 'absolute',
        right: 76,
        top: 44,
        height: 46,
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    />

    {children}
  </div>
);

const SlideHeading = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      ...abs(96, 56, 1440),
      margin: 0,
      fontFamily: 'var(--osd-font-display)',
      fontSize: 54,
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
      color: CHARCOAL,
    }}
  >
    {children}
  </h2>
);

const Highlight = ({
  children,
  color = SUNNY_BRIGHT,
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

const InlineHighlight = ({
  children,
  color = SUNNY_BRIGHT,
}: {
  children: ReactNode;
  color?: string;
}) => (
  <mark
    style={{
      background: color,
      color: CHARCOAL,
      fontWeight: 800,
      padding: '2px 10px 3px',
      borderRadius: 8,
    }}
  >
    {children}
  </mark>
);

const WhiteBox = ({
  children,
  left,
  top,
  width,
  height,
  padding = 36,
  borderColor = SUNNY_LIGHT,
  style,
}: {
  children: ReactNode;
  left: number;
  top: number;
  width: number;
  height: number;
  padding?: number;
  borderColor?: string;
  style?: CSSProperties;
}) => (
  <div
    style={{
      ...abs(left, top, width, height),
      background: WHITE,
      borderRadius: 36,
      border: `4px solid ${borderColor}`,
      boxShadow: SOFT_SHADOW,
      padding,
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);

const BulletList = ({
  items,
  bulletColor = TEAL,
  fontSize = 29,
  gap = 18,
}: {
  items: ReactNode[];
  bulletColor?: string;
  fontSize?: number;
  gap?: number;
}) => (
  <ul
    style={{
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap,
    }}
  >
    {items.map((item, idx) => (
      <li
        key={idx}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontSize,
          fontWeight: 700,
          lineHeight: 1.35,
          color: CHARCOAL,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 15,
            height: 15,
            borderRadius: 99,
            background: bulletColor,
            flexShrink: 0,
          }}
        />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const BikoCorner = ({
  src,
  alt,
  width = 355,
  right = 72,
  bottom = 18,
}: {
  src: string;
  alt: string;
  width?: number;
  right?: number;
  bottom?: number;
}) => (
  <img
    src={src}
    alt={alt}
    draggable={false}
    style={{
      position: 'absolute',
      right,
      bottom,
      width,
      height: 'auto',
      display: 'block',
      pointerEvents: 'none',
      userSelect: 'none',
    }}
  />
);

/** Standard Cheerful Slide Template */
const StandardSlide = ({
  bg,
  blobA,
  blobB,
  borderColor,
  title,
  visual,
  descTitle,
  bullets,
  bulletColor = TEAL,
  mascot = bikoPointLeft,
  mascotAlt = 'Biko menunjuk gambar',
}: {
  bg: string;
  blobA: string;
  blobB: string;
  borderColor: string;
  title: ReactNode;
  visual: ReactNode;
  descTitle: ReactNode;
  bullets: ReactNode[];
  bulletColor?: string;
  mascot?: string;
  mascotAlt?: string;
}) => (
  <CleanCanvas bg={bg} blobA={blobA} blobB={blobB}>
    <SlideHeading>{title}</SlideHeading>

    {/* Left Large Pure White Image Container */}
    <WhiteBox
      left={96}
      top={168}
      width={1110}
      height={820}
      padding={36}
      borderColor={borderColor}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {visual}
    </WhiteBox>

    {/* Top-Right Concise Description Box */}
    <WhiteBox
      left={1250}
      top={168}
      width={574}
      height={400}
      padding={38}
      borderColor={borderColor}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 22,
      }}
    >
      <h3
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 36,
          fontWeight: 700,
          lineHeight: 1.2,
          color: CHARCOAL,
        }}
      >
        {descTitle}
      </h3>
      <BulletList items={bullets} bulletColor={bulletColor} fontSize={29} gap={18} />
    </WhiteBox>

    {/* Bottom-Right Mascot */}
    <BikoCorner src={mascot} alt={mascotAlt} width={355} right={72} bottom={18} />
  </CleanCanvas>
);

// ============================================================================
// SLIDE 01 — Sampul Ceria & Menarik untuk Anak-Anak (To the point + Biko kanan bawah)
// ============================================================================
const COVER_PREVIEWS = [
  { label: 'Layar', img: imgLayar, border: SKY },
  { label: 'Trackpad', img: imgTrackpad, border: TEAL },
  { label: 'Mouse', img: imgMouse, border: CORAL },
];

const Slide01Cover: Page = () => (
  <CleanCanvas
    bg="linear-gradient(135deg, #FFF3B0 0%, #FFFDF5 48%, #D8F3FF 100%)"
    blobA="#FDE047"
    blobB="#7DD3FC"
  >
    {/* Left Column: Playful Hero Title + To-The-Point Visual Trio */}
    <div
      style={{
        ...abs(96, 130, 710, 840),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 30,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 88,
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          color: CHARCOAL,
        }}
      >
        Kenalan Sama
        <br />
        <Highlight color={SUNNY_BRIGHT}>Laptop Ajaibku!</Highlight>
      </h1>

      <p
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 34,
          fontWeight: 700,
          color: '#0F766E',
          lineHeight: 1.3,
        }}
      >
        Mengenal &amp; Merawat Laptop Pertamaku
      </p>

      {/* Playful Real-Photo Visual Trio for Pre-readers */}
      <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
        {COVER_PREVIEWS.map((item) => (
          <div
            key={item.label}
            style={{
              background: WHITE,
              borderRadius: 24,
              border: `4px solid ${item.border}`,
              boxShadow: SOFT_SHADOW,
              padding: 12,
              width: 176,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <img
              src={item.img}
              alt={item.label}
              style={{
                width: 144,
                height: 102,
                objectFit: 'cover',
                borderRadius: 16,
                display: 'block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
                color: CHARCOAL,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Center White Hero Showcase Card */}
    <WhiteBox
      left={846}
      top={160}
      width={615}
      height={745}
      padding={36}
      borderColor={SUNNY}
      style={{
        borderRadius: 44,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: 460,
          height: 460,
          borderRadius: 999,
          background: 'radial-gradient(circle, #FEF08A 0%, #E0F2FE 65%, rgba(255,255,255,0) 75%)',
        }}
      />
      <img
        src={imgLaptop}
        alt="Laptop asli"
        style={{
          position: 'relative',
          zIndex: 2,
          width: 520,
          height: 520,
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </WhiteBox>

    {/* Bottom-Right Mascot (clear of logo, title, and laptop card) */}
    <BikoCorner src={bikoWave} alt="Biko menyapa" width={390} right={52} bottom={20} />
  </CleanCanvas>
);

// ============================================================================
// SLIDE 02 — Misi Hari Ini
// ============================================================================
const Slide02Misi: Page = () => (
  <StandardSlide
    bg="linear-gradient(135deg, #E0F2FE 0%, #FFFDF5 52%, #D1FAE5 100%)"
    blobA={SKY_LIGHT}
    blobB={TEAL_LIGHT}
    borderColor={SKY_LIGHT}
    title={
      <>
        Apa <Highlight color={SKY_LIGHT}>Misi Kita</Highlight> Hari Ini?
      </>
    }
    visual={
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 36,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <img
            src={imgLaptop}
            alt="Mengenal bagian laptop"
            style={{ width: 420, height: 420, objectFit: 'contain', borderRadius: 24 }}
          />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            1. Bagian Laptop
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <img
            src={imgDudukTegak}
            alt="Merawat dan memakai laptop dengan rapi"
            style={{ width: '100%', height: 420, objectFit: 'contain', borderRadius: 24 }}
          />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            2. Cara Merawatnya
          </span>
        </div>
      </div>
    }
    descTitle="Misi Hari Ini:"
    bullets={[
      <>
        Kenali <InlineHighlight color={SKY_LIGHT}>bagian laptop</InlineHighlight>
      </>,
      <>
        Jaga laptop agar <InlineHighlight color={TEAL_LIGHT}>awet</InlineHighlight>
      </>,
    ]}
    bulletColor={SKY}
  />
);

// ============================================================================
// SLIDE 03 — Layar (Gambar Asli dari Folder Gambar)
// ============================================================================
const Slide03Layar: Page = () => (
  <StandardSlide
    bg="linear-gradient(135deg, #FEF3C7 0%, #FFFDF5 52%, #E0F2FE 100%)"
    blobA={SUNNY_LIGHT}
    blobB={SKY_LIGHT}
    borderColor={SUNNY_LIGHT}
    title={
      <>
        Ini Namanya <Highlight color={SUNNY_BRIGHT}>Layar</Highlight>
      </>
    }
    visual={
      <img
        src={imgLayar}
        alt="Layar monitor laptop asli"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: 24,
          display: 'block',
        }}
      />
    }
    descTitle="Layar Laptop"
    bullets={[
      <>
        Muncul <InlineHighlight>gambar</InlineHighlight> dan warna
      </>,
      <>Tempat melihat permainan</>,
    ]}
    bulletColor={SUNNY}
  />
);

// ============================================================================
// SLIDE 04 — Keyboard (Gambar Asli dari Folder Gambar)
// ============================================================================
const Slide04Keyboard: Page = () => (
  <StandardSlide
    bg="linear-gradient(135deg, #DCFCE7 0%, #FFFDF5 52%, #DBEAFE 100%)"
    blobA={TEAL_LIGHT}
    blobB={SKY_LIGHT}
    borderColor={TEAL_LIGHT}
    title={
      <>
        Ini Namanya <Highlight color={TEAL_LIGHT}>Keyboard</Highlight>
      </>
    }
    visual={
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 24,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={imgTrackpad}
          alt="Keyboard asli laptop dengan tombol huruf"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '0% 0%',
            transform: 'scale(2.8)',
            transformOrigin: '0% 0%',
            display: 'block',
          }}
        />
      </div>
    }
    descTitle="Keyboard Laptop"
    bullets={[
      <>
        Ada tombol <InlineHighlight color={SKY_LIGHT}>huruf</InlineHighlight>
      </>,
      <>
        Tekan tombol dengan <InlineHighlight color={TEAL_LIGHT}>pelan</InlineHighlight>
      </>,
    ]}
    bulletColor={TEAL}
  />
);

// ============================================================================
// SLIDE 05 — Trackpad & Mouse (Gambar Asli dari Folder Gambar)
// ============================================================================
const Slide05TrackpadMouse: Page = () => (
  <StandardSlide
    bg="linear-gradient(135deg, #EDE9FE 0%, #FFFDF5 52%, #FFEDD5 100%)"
    blobA={LAVENDER_LIGHT}
    blobB={SUNNY_LIGHT}
    borderColor={LAVENDER_LIGHT}
    title={
      <>
        <Highlight color={LAVENDER_LIGHT}>Trackpad</Highlight> &amp; <Highlight color={SKY_LIGHT}>Mouse</Highlight>
      </>
    }
    visual={
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: 32,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <img
            src={imgTrackpad}
            alt="Trackpad laptop dengan jari menyentuh"
            style={{ width: '100%', height: 470, objectFit: 'cover', borderRadius: 24 }}
          />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
            Trackpad
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <img
            src={imgMouse}
            alt="Mouse wireless asli"
            style={{ width: '100%', height: 470, objectFit: 'contain', borderRadius: 24 }}
          />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 700 }}>
            Mouse
          </span>
        </div>
      </div>
    }
    descTitle="Penggerak Panah"
    bullets={[
      <>
        <InlineHighlight color={LAVENDER_LIGHT}>Trackpad</InlineHighlight>: geser pakai jari
      </>,
      <>
        <InlineHighlight color={SKY_LIGHT}>Mouse</InlineHighlight>: genggam di meja
      </>,
    ]}
    bulletColor={LAVENDER}
  />
);

// ============================================================================
// SLIDE 06 — Ayo Tebak! (Gambar Asli Laptop + Pin Angka 1, 2, 3 Interaktif)
// ============================================================================
const QUIZ_PINS = [
  { id: 1, name: 'Layar', color: CORAL, left: 415, top: 250 },
  { id: 2, name: 'Keyboard', color: SUNNY, left: 505, top: 455 },
  { id: 3, name: 'Trackpad', color: TEAL, left: 645, top: 535 },
];

const Slide06Tebak: Page = () => {
  const [selectedPin, setSelectedPin] = useState<number>(1);
  const currentPin = QUIZ_PINS.find((p) => p.id === selectedPin) ?? QUIZ_PINS[0];

  return (
    <StandardSlide
      bg="linear-gradient(135deg, #FFE4E6 0%, #FFFDF5 52%, #FEF3C7 100%)"
      blobA={PINK_LIGHT}
      blobB={SUNNY_LIGHT}
      borderColor={CORAL_LIGHT}
      title={
        <>
          Mana <Highlight color={PINK_LIGHT}>Bagian Laptopnya?</Highlight>
        </>
      }
      visual={
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={imgLaptop}
            alt="Gambar asli laptop untuk ditebak bagiannya"
            style={{
              width: 650,
              height: 650,
              objectFit: 'contain',
              display: 'block',
            }}
          />

          {QUIZ_PINS.map((pin) => {
            const isSelected = selectedPin === pin.id;
            return (
              <button
                key={pin.id}
                type="button"
                className="cpj-card-btn"
                onClick={() => setSelectedPin(pin.id)}
                aria-label={`Pilih nomor ${pin.id}: ${pin.name}`}
                style={{
                  position: 'absolute',
                  left: pin.left,
                  top: pin.top,
                  width: 72,
                  height: 72,
                  borderRadius: 99,
                  background: pin.color,
                  color: pin.id === 2 ? CHARCOAL : WHITE,
                  border: `4px solid ${WHITE}`,
                  boxShadow: isSelected ? `0 0 0 5px ${CHARCOAL}` : `0 4px 12px rgba(0,0,0,0.22)`,
                  fontFamily: 'var(--osd-font-display)',
                  fontSize: 34,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              >
                {pin.id}
              </button>
            );
          })}
        </div>
      }
      descTitle={
        <>
          Nomor {currentPin.id}: <Highlight color={SUNNY_BRIGHT}>{currentPin.name}</Highlight>
        </>
      }
      bullets={QUIZ_PINS.map((pin) => (
        <span key={pin.id} style={{ fontWeight: selectedPin === pin.id ? 800 : 700 }}>
          {pin.id}. {selectedPin === pin.id ? <InlineHighlight>{pin.name}</InlineHighlight> : pin.name}
        </span>
      ))}
      bulletColor={CORAL}
    />
  );
};

// ============================================================================
// SLIDE 07 — Aturan Merawat Laptop #1 & #2 (Foto Real Boleh vs Jangan)
// ============================================================================
const Slide07Aturan12: Page = () => (
  <StandardSlide
    bg="linear-gradient(135deg, #D1FAE5 0%, #FFFDF5 52%, #FFE4E6 100%)"
    blobA={TEAL_LIGHT}
    blobB={PINK_LIGHT}
    borderColor={TEAL_LIGHT}
    title={
      <>
        <Highlight color={TEAL_LIGHT}>Sayangi</Highlight> Laptopmu!
      </>
    }
    visual={
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <img
            src={imgTanganBersih}
            alt="Tangan bersih menyentuh keyboard laptop dengan lembut"
            style={{ width: '100%', height: 470, objectFit: 'cover', borderRadius: 24, border: `4px solid ${TEAL_LIGHT}` }}
          />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: '#047857' }}>
            <InlineHighlight color={TEAL_LIGHT}>BOLEH</InlineHighlight> Tangan Bersih
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <img
            src={imgBahayaAir}
            alt="Bahaya air tumpah dekat laptop"
            style={{ width: '100%', height: 470, objectFit: 'cover', borderRadius: 24, border: `4px solid ${CORAL_LIGHT}` }}
          />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: '#B91C1C' }}>
            <InlineHighlight color="#FECACA">JANGAN</InlineHighlight> Dekat Air
          </span>
        </div>
      </div>
    }
    descTitle="Jaga Kebersihan:"
    bullets={[
      <>
        Cuci tangan <InlineHighlight color={TEAL_LIGHT}>bersih</InlineHighlight>
      </>,
      <>
        Jauhkan <InlineHighlight color="#FECACA">air &amp; makan</InlineHighlight>
      </>,
    ]}
    bulletColor={TEAL}
    mascot={bikoThumbsUp}
    mascotAlt="Biko memberi jempol"
  />
);

// ============================================================================
// SLIDE 08 — Cara Membuka & Duduk Aman (Foto Real)
// ============================================================================
const Slide08Aturan34: Page = () => (
  <StandardSlide
    bg="linear-gradient(135deg, #E0F7FA 0%, #FFFDF5 52%, #DCFCE7 100%)"
    blobA={SKY_LIGHT}
    blobB={TEAL_LIGHT}
    borderColor={SKY_LIGHT}
    title={
      <>
        <Highlight color={SKY_LIGHT}>Buka Pelan</Highlight> &amp; Duduk Rapi
      </>
    }
    visual={
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <img
            src={imgBukaDuaTangan}
            alt="Membuka laptop memakai dua tangan secara pelan"
            style={{ width: '100%', height: 470, objectFit: 'cover', borderRadius: 24 }}
          />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Dua Tangan
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <img
            src={imgDudukTegak}
            alt="Anak duduk tegak rapi menggunakan laptop di meja"
            style={{ width: '100%', height: 470, objectFit: 'cover', borderRadius: 24 }}
          />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>
            Duduk Tegak
          </span>
        </div>
      </div>
    }
    descTitle="Cara Pakai Aman:"
    bullets={[
      <>
        Buka pakai <InlineHighlight color={TEAL_LIGHT}>dua tangan</InlineHighlight>
      </>,
      <>
        Duduk <InlineHighlight color={SKY_LIGHT}>tegak</InlineHighlight> di meja
      </>,
    ]}
    bulletColor={TEAL}
    mascot={bikoThumbsUp}
    mascotAlt="Biko senang melihat posisi duduk rapi"
  />
);

// ============================================================================
// SLIDE 09 — Ayo Coba! Sentuh, Geser, Klik (Trackpad + Layar Real)
// ============================================================================
const PRACTICE_STEPS = [
  { num: 1, label: 'Sentuh', color: SKY, left: 260, top: 260 },
  { num: 2, label: 'Geser', color: SUNNY, left: 520, top: 190 },
  { num: 3, label: 'Klik!', color: TEAL, left: 480, top: 340 },
];

const Slide09MisiPraktik: Page = () => {
  const [step, setStep] = useState<number>(1);
  const current = PRACTICE_STEPS[step - 1];

  return (
    <StandardSlide
      bg="linear-gradient(135deg, #E0F2FE 0%, #FFFDF5 52%, #FEF3C7 100%)"
      blobA={SKY_LIGHT}
      blobB={SUNNY_LIGHT}
      borderColor={SKY_LIGHT}
      title={
        <>
          Ayo Coba <Highlight color={SUNNY_BRIGHT}>Gerakkan Panah</Highlight>
        </>
      }
      visual={
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 26, flex: 1, minHeight: 0 }}>
            <img
              src={imgTrackpad}
              alt="Sentuh trackpad dengan satu jari"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24 }}
            />

            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 24, overflow: 'hidden' }}>
              <img
                src={imgLayar}
                alt="Layar desktop komputer dengan panah bergerak"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <svg
                width={52}
                height={62}
                viewBox="0 0 52 62"
                fill="none"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  transform: `translate(${Math.round(current.left * 0.52)}px, ${Math.round(current.top * 0.65)}px)`,
                  transition: 'transform 340ms cubic-bezier(0.22, 1, 0.36, 1)',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.35))',
                  pointerEvents: 'none',
                }}
              >
                <path
                  d="M6 4 L6 46 L18 34 L28 54 L37 49 L27 29 L44 26 Z"
                  fill={WHITE}
                  stroke={CHARCOAL}
                  strokeWidth={3.5}
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 18 }}>
            {PRACTICE_STEPS.map((s) => {
              const active = step === s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  className="cpj-card-btn"
                  onClick={() => setStep(s.num)}
                  style={{
                    padding: '14px 32px',
                    borderRadius: 18,
                    background: active ? s.color : '#F3F4F6',
                    color: active && s.num !== 2 ? WHITE : CHARCOAL,
                    border: `2.5px solid ${active ? CHARCOAL : '#D1D5DB'}`,
                    boxShadow: active ? `0 4px 0 ${CHARCOAL}` : 'none',
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 26,
                    fontWeight: 700,
                  }}
                >
                  {s.num}. {s.label}
                </button>
              );
            })}
          </div>
        </div>
      }
      descTitle="3 Langkah Mudah:"
      bullets={[
        <>
          1. <InlineHighlight color={SKY_LIGHT}>Sentuh</InlineHighlight> trackpad
        </>,
        <>
          2. <InlineHighlight>Geser</InlineHighlight> pelan
        </>,
        <>
          3. <InlineHighlight color={TEAL_LIGHT}>Klik</InlineHighlight> satu kali
        </>,
      ]}
      bulletColor={SKY}
    />
  );
};

// ============================================================================
// SLIDE 10 — Penutup (Anak Hebat Sahabat Laptop)
// ============================================================================
const Slide10Lencana: Page = () => (
  <StandardSlide
    bg="linear-gradient(135deg, #FEF9C3 0%, #FFFDF5 48%, #D1FAE5 100%)"
    blobA={SUNNY_LIGHT}
    blobB={TEAL_LIGHT}
    borderColor={SUNNY}
    title={
      <>
        Hore! Kamu <Highlight color={SUNNY_BRIGHT}>Sahabat Laptop!</Highlight>
      </>
    }
    visual={
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          alignItems: 'center',
        }}
      >
        <img
          src={imgDudukTegak}
          alt="Anak belajar laptop dengan senang dan rapi"
          style={{ width: '100%', height: 520, objectFit: 'contain', borderRadius: 24 }}
        />
        <img
          src={imgLaptop}
          alt="Laptop siap dipakai belajar"
          style={{ width: '100%', height: 460, objectFit: 'contain', borderRadius: 24 }}
        />
      </div>
    }
    descTitle="Kamu Hebat!"
    bullets={[
      <>
        Tahu <InlineHighlight color={SKY_LIGHT}>bagian laptop</InlineHighlight>
      </>,
      <>
        Tahu cara <InlineHighlight color={TEAL_LIGHT}>merawatnya</InlineHighlight>
      </>,
      <>Siap belajar lagi!</>,
    ]}
    bulletColor={TEAL}
    mascot={bikoJump}
    mascotAlt="Biko melompat gembira"
  />
);

// ============================================================================
// Speaker Notes (Panduan Pengajar untuk Usia 5–7 Tahun)
// ============================================================================
export const notes: (string | undefined)[] = [
  `Halo teman-teman! Hari ini kita kenalan dengan Laptop Ajaib bersama Biko.`,
  `Ada dua misi kita hari ini: mengenal bagian laptop dan belajar cara merawatnya.`,
  `Ini namanya Layar. Semua gambar lucu dan permainan muncul di layar.`,
  `Ini namanya Keyboard. Punya banyak tombol huruf dan angka. Tekannya pelan-pelan ya!`,
  `Untuk menggerakkan panah di layar, kita bisa geser jari di Trackpad atau pakai Mouse di meja.`,
  `Ayo tebak! Klik angka 1, 2, dan 3 untuk menunjukkan Layar, Keyboard, dan Trackpad pada laptop asli.`,
  `Aturan kebersihan: tangan harus bersih & kering, dan jauhkan air dari laptop.`,
  `Aturan aman: buka layar pelan memakai dua tangan, lalu duduk tegak rapi di meja.`,
  `Ayo praktik! Tekan langkah 1 Sentuh, 2 Geser, dan 3 Klik untuk melihat panah bergerak di layar.`,
  `Hebat! Sekarang kalian sudah kenal bagian laptop dan siap untuk petualangan berikutnya.`,
];

export const meta: SlideMeta = {
  title: 'Pertemuan 1 — Kenalan Sama Laptop Ajaibku',
  createdAt: '2026-11-13T07:51:03.987Z',
};

export default [
  Slide01Cover,
  Slide02Misi,
  Slide03Layar,
  Slide04Keyboard,
  Slide05TrackpadMouse,
  Slide06Tebak,
  Slide07Aturan12,
  Slide08Aturan34,
  Slide09MisiPraktik,
  Slide10Lencana,
] satisfies Page[];

import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import bikoWave from '../../assets/biko/biko-wave.png';
import bikoPointLeft from '../../assets/biko/biko-point-left.png';
import bikoThumbsUp from '../../assets/biko/biko-thumbs-up.png';
import bikoJump from '../../assets/biko/biko-jump.png';

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
// Design System & Palette (Ultra-clean solid warm cream + pure white cards)
// ============================================================================
export const design: DesignSystem = {
  palette: {
    bg: '#FFF8DF',
    text: '#1E1E2C',
    accent: '#10B981',
  },
  fonts: {
    display: '"Fredoka", "Plus Jakarta Sans", system-ui, sans-serif',
    body: '"Plus Jakarta Sans", system-ui, sans-serif',
  },
  typeScale: {
    hero: 82,
    body: 28,
  },
  radius: 36,
};

const CANVAS_BG = '#FFF8DF';
const WHITE = '#FFFFFF';
const CHARCOAL = '#1E1E2C';
const MUTED = '#4B5563';
const TEAL = '#10B981';
const CORAL = '#F45B49';
const SUNNY = '#FBBF24';
const STABILO = '#FEF08A';
const SKY = '#60A5FA';
const SKY_SOFT = '#DBEAFE';

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
// Clean Layout Primitives (Zero corner chrome, zero app windows, zero blocks)
// ============================================================================
const CleanCanvas = ({ children }: { children: ReactNode }) => (
  <div
    data-osd-interactive="true"
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: CANVAS_BG,
      color: CHARCOAL,
      fontFamily: 'var(--osd-font-body)',
      overflow: 'hidden',
      WebkitFontSmoothing: 'antialiased',
    }}
  >
    {children}
  </div>
);

const SlideHeading = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      ...abs(96, 62, 1720),
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
  color = STABILO,
}: {
  children: ReactNode;
  color?: string;
}) => (
  <span
    style={{
      background: color,
      padding: '2px 16px 5px',
      borderRadius: 14,
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
  color = STABILO,
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
  style,
}: {
  children: ReactNode;
  left: number;
  top: number;
  width: number;
  height: number;
  padding?: number;
  style?: CSSProperties;
}) => (
  <div
    style={{
      ...abs(left, top, width, height),
      background: WHITE,
      borderRadius: 36,
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
  fontSize = 30,
  gap = 20,
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
            width: 14,
            height: 14,
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
  width = 360,
  right = 72,
  bottom = 24,
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

/** Standard Content Slide Template matching the user's clean reference */
const StandardSlide = ({
  title,
  visual,
  descTitle,
  bullets,
  bulletColor = TEAL,
  mascot = bikoPointLeft,
  mascotAlt = 'Biko menunjuk gambar',
}: {
  title: ReactNode;
  visual: ReactNode;
  descTitle: ReactNode;
  bullets: ReactNode[];
  bulletColor?: string;
  mascot?: string;
  mascotAlt?: string;
}) => (
  <CleanCanvas>
    <SlideHeading>{title}</SlideHeading>

    {/* Left Large Pure White Image Container */}
    <WhiteBox
      left={96}
      top={172}
      width={1110}
      height={816}
      padding={36}
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
      top={172}
      width={574}
      height={410}
      padding={40}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 24,
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

    {/* Bottom-Right Mascot (always clean in corner, zero overlap with text) */}
    <BikoCorner src={mascot} alt={mascotAlt} width={350} right={86} bottom={20} />
  </CleanCanvas>
);

// ============================================================================
// SLIDE 01 — Sampul (Hanya Judul Besar + Gambar Laptop Real + Maskot Kanan Bawah)
// ============================================================================
const Slide01Cover: Page = () => (
  <CleanCanvas>
    <h1
      style={{
        ...abs(96, 86, 1720),
        margin: 0,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 82,
        fontWeight: 700,
        lineHeight: 1.12,
        letterSpacing: '-0.02em',
        color: CHARCOAL,
      }}
    >
      Kenalan Sama <Highlight>Laptop Ajaibku!</Highlight>
    </h1>

    <WhiteBox
      left={96}
      top={256}
      width={1160}
      height={730}
      padding={40}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={imgLaptop}
        alt="Laptop asli"
        style={{
          width: 620,
          height: 620,
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </WhiteBox>

    <BikoCorner src={bikoWave} alt="Biko menyapa" width={430} right={84} bottom={28} />
  </CleanCanvas>
);

// ============================================================================
// SLIDE 02 — Misi Hari Ini
// ============================================================================
const Slide02Misi: Page = () => (
  <StandardSlide
    title={
      <>
        Apa <Highlight>Misi Kita</Highlight> Hari Ini?
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
        Kenali <InlineHighlight color={SKY_SOFT}>bagian laptop</InlineHighlight>
      </>,
      <>
        Jaga laptop agar <InlineHighlight color="#D1FAE5">awet</InlineHighlight>
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
    title={
      <>
        Ini Namanya <Highlight>Layar</Highlight>
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
    title={
      <>
        Ini Namanya <Highlight>Keyboard</Highlight>
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
        Ada tombol <InlineHighlight color={SKY_SOFT}>huruf</InlineHighlight>
      </>,
      <>
        Tekan tombol dengan <InlineHighlight color="#D1FAE5">pelan</InlineHighlight>
      </>,
    ]}
    bulletColor={SKY}
  />
);

// ============================================================================
// SLIDE 05 — Trackpad & Mouse (Gambar Asli dari Folder Gambar)
// ============================================================================
const Slide05TrackpadMouse: Page = () => (
  <StandardSlide
    title={
      <>
        <Highlight>Trackpad</Highlight> &amp; <Highlight color={SKY_SOFT}>Mouse</Highlight>
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
        <InlineHighlight>Trackpad</InlineHighlight>: geser pakai jari
      </>,
      <>
        <InlineHighlight color={SKY_SOFT}>Mouse</InlineHighlight>: genggam di meja
      </>,
    ]}
    bulletColor={TEAL}
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
      title={
        <>
          Mana <Highlight>Bagian Laptopnya?</Highlight>
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
                  width: 70,
                  height: 70,
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
          Nomor {currentPin.id}: <Highlight>{currentPin.name}</Highlight>
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
    title={
      <>
        <Highlight>Sayangi</Highlight> Laptopmu!
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
            style={{ width: '100%', height: 470, objectFit: 'cover', borderRadius: 24 }}
          />
          <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: '#047857' }}>
            <InlineHighlight color="#D1FAE5">BOLEH</InlineHighlight> Tangan Bersih
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <img
            src={imgBahayaAir}
            alt="Bahaya air tumpah dekat laptop"
            style={{ width: '100%', height: 470, objectFit: 'cover', borderRadius: 24 }}
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
        Cuci tangan <InlineHighlight color="#D1FAE5">bersih</InlineHighlight>
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
    title={
      <>
        <Highlight>Buka Pelan</Highlight> &amp; Duduk Rapi
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
        Buka pakai <InlineHighlight color="#D1FAE5">dua tangan</InlineHighlight>
      </>,
      <>
        Duduk <InlineHighlight color={SKY_SOFT}>tegak</InlineHighlight> di meja
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
  { num: 1, label: 'Sentuh', left: 260, top: 260 },
  { num: 2, label: 'Geser', left: 520, top: 190 },
  { num: 3, label: 'Klik!', left: 480, top: 340 },
];

const Slide09MisiPraktik: Page = () => {
  const [step, setStep] = useState<number>(1);
  const current = PRACTICE_STEPS[step - 1];

  return (
    <StandardSlide
      title={
        <>
          Ayo Coba <Highlight>Gerakkan Panah</Highlight>
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
              {/* Simple crisp cursor gliding over real screen */}
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
                    background: active ? TEAL : '#F3F4F6',
                    color: active ? WHITE : CHARCOAL,
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
          1. <InlineHighlight color={SKY_SOFT}>Sentuh</InlineHighlight> trackpad
        </>,
        <>
          2. <InlineHighlight>Geser</InlineHighlight> pelan
        </>,
        <>
          3. <InlineHighlight color="#D1FAE5">Klik</InlineHighlight> satu kali
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
    title={
      <>
        Hore! Kamu <Highlight>Sahabat Laptop!</Highlight>
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
        Tahu <InlineHighlight color={SKY_SOFT}>bagian laptop</InlineHighlight>
      </>,
      <>
        Tahu cara <InlineHighlight color="#D1FAE5">merawatnya</InlineHighlight>
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

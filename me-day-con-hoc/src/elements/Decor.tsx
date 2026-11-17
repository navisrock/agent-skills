import type React from 'react';
import {Easing, Interactive, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';

// Chữ cái & con số trôi nhẹ ở nền (một mẫu trang trí, sinh theo vòng lặp).
const FloatingGlyphsInner: React.FC<{readonly style?: React.CSSProperties}> = ({style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const glyphs = ['a', 'b', 'c', '1', '2', '3', 'ă', 'â', '+', '=', 'ơ', 'ư', '5', 'đ'];

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', ...style}}>
      {glyphs.map((g, i) => {
        const x = random(`x-${i}`) * 1800 + 60;
        const speed = 18 + random(`s-${i}`) * 26;
        const y = 1120 - ((frame / fps) * speed + random(`y-${i}`) * 1200) % 1240;
        const size = 60 + random(`z-${i}`) * 70;
        return (
          <div
            key={g + i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              fontFamily: 'Patrick Hand',
              fontSize: size,
              color: '#ffffff',
              opacity: 0.12 + random(`o-${i}`) * 0.12,
              rotate: `${Math.sin(frame / fps + i) * 12}deg`,
            }}
          >
            {g}
          </div>
        );
      })}
    </div>
  );
};

export const FloatingGlyphs = Interactive.create({
  Component: FloatingGlyphsInner,
  layout: 'none',
  schema: {},
});

type HeartProps = {readonly style?: React.CSSProperties; readonly color?: string};

const HeartInner: React.FC<HeartProps> = ({style, color = '#ff6b81'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const beat = 1 + Math.max(0, Math.sin((frame / fps) * Math.PI * 1.6)) * 0.06;

  return (
    <div style={{position: 'absolute', width: 240, height: 220, ...style}}>
      <svg viewBox="0 0 240 220" width="100%" height="100%" style={{scale: `${beat}`}}>
        <path
          d="M 120 210 C 40 150 0 110 0 62 C 0 26 28 0 62 0 C 88 0 108 14 120 36 C 132 14 152 0 178 0 C 212 0 240 26 240 62 C 240 110 200 150 120 210 Z"
          fill={color}
        />
        <ellipse cx={64} cy={56} rx={22} ry={14} fill="#ffffff" opacity={0.35} />
      </svg>
    </div>
  );
};

export const Heart = Interactive.create({
  Component: HeartInner,
  layout: 'none',
  schema: {color: {type: 'color', default: '#ff6b81', description: 'Màu trái tim'}},
});

type StarBurstProps = {readonly style?: React.CSSProperties};

// Các ngôi sao bung ra quanh một tâm điểm.
const StarBurstInner: React.FC<StarBurstProps> = ({style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const count = 12;

  return (
    <div style={{position: 'absolute', width: 0, height: 0, ...style}}>
      {new Array(count).fill(true).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const delay = (i % 3) * 4;
        const progress = interpolate(frame - delay, [0, 1.2 * fps], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        const dist = 160 + (i % 2) * 120;
        const twinkle = 0.75 + Math.sin(frame / 6 + i) * 0.25;
        return (
          <svg
            key={i}
            viewBox="0 0 100 100"
            width={50 + (i % 3) * 22}
            height={50 + (i % 3) * 22}
            style={{
              position: 'absolute',
              left: Math.cos(angle) * dist * progress,
              top: Math.sin(angle) * dist * progress,
              translate: '-50% -50%',
              opacity: progress * twinkle,
              rotate: `${frame * 2 + i * 30}deg`,
            }}
          >
            <path d="M 50 0 L 62 36 L 100 38 L 70 60 L 80 98 L 50 76 L 20 98 L 30 60 L 0 38 L 38 36 Z" fill={i % 2 ? '#ffd166' : '#ffe8a3'} />
          </svg>
        );
      })}
    </div>
  );
};

export const StarBurst = Interactive.create({
  Component: StarBurstInner,
  layout: 'none',
  schema: {},
});

type AppleProps = {readonly style?: React.CSSProperties; readonly label?: string};

// Quả táo nảy lên kèm con số.
const AppleInner: React.FC<AppleProps> = ({style, label = '1'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div
      style={{
        position: 'absolute',
        width: 190,
        height: 260,
        scale: interpolate(frame, [0, 0.5 * fps], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.spring({damping: 12}),
          output: 'perceptual-scale',
        }),
        ...style,
      }}
    >
      <svg viewBox="0 0 190 190" width={190} height={190}>
        <path d="M 95 40 C 70 20 10 30 14 100 C 18 160 60 186 95 172 C 130 186 172 160 176 100 C 180 30 120 20 95 40 Z" fill="#ef4f4f" />
        <path d="M 95 42 Q 100 18 112 8" stroke="#6b3e1f" strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M 104 28 C 120 6 150 10 156 20 C 140 34 118 36 104 28 Z" fill="#4cc38a" />
        <ellipse cx={58} cy={80} rx={14} ry={24} fill="#ffffff" opacity={0.35} />
      </svg>
      <div style={{fontFamily: 'Be Vietnam Pro', fontWeight: 800, fontSize: 64, color: '#fffaf0', textAlign: 'center'}}>
        {label}
      </div>
    </div>
  );
};

export const Apple = Interactive.create({
  Component: AppleInner,
  layout: 'none',
  schema: {label: {type: 'string', default: '1', description: 'Số dưới quả táo'}},
});

type BubbleProps = {readonly style?: React.CSSProperties; readonly children: React.ReactNode};

// Bong bóng lời thoại, đuôi chỉ xuống bên trái.
const SpeechBubbleInner: React.FC<BubbleProps> = ({style, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div
      style={{
        position: 'absolute',
        padding: '30px 44px',
        borderRadius: 40,
        backgroundColor: '#fffaf0',
        color: '#3a2a4a',
        fontFamily: 'Be Vietnam Pro',
        fontWeight: 600,
        fontSize: 54,
        lineHeight: 1.3,
        boxShadow: '0 18px 40px rgba(0,0,0,0.25)',
        transformOrigin: '10% 100%',
        scale: interpolate(frame, [0, 0.5 * fps], [0.4, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.spring({damping: 14}),
          output: 'perceptual-scale',
        }),
        opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        ...style,
      }}
    >
      {children}
      <div
        style={{
          position: 'absolute',
          left: 60,
          bottom: -34,
          width: 0,
          height: 0,
          borderLeft: '22px solid transparent',
          borderRight: '22px solid transparent',
          borderTop: '36px solid #fffaf0',
        }}
      />
    </div>
  );
};

export const SpeechBubble = Interactive.create({
  Component: SpeechBubbleInner,
  layout: 'none',
  schema: {
    ...Interactive.textSchema,
    ...Interactive.backgroundSchema,
    ...Interactive.childrenSchema,
  },
});

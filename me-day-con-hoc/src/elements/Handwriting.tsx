import type React from 'react';
import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

type HandwritingProps = {
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
  /** Thời gian viết hết dòng (giây). */
  readonly writeSeconds?: number;
};

// Một dòng chữ viết tay hiện dần từ trái sang phải, có cây bút chì chạy theo.
const HandwritingInner: React.FC<HandwritingProps> = ({children, style, writeSeconds = 5}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = interpolate(frame, [0, writeSeconds * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  const wobble = Math.sin(frame / 2.2) * 6 * (progress < 1 ? 1 : 0);

  return (
    <div
      style={{
        position: 'absolute',
        fontFamily: 'Patrick Hand',
        fontSize: 150,
        color: '#2d4a8a',
        whiteSpace: 'pre',
        ...style,
      }}
    >
      <div style={{clipPath: `inset(-20% ${(1 - progress) * 100}% -20% 0)`}}>{children}</div>
      <svg
        viewBox="0 0 60 240"
        width={46}
        height={184}
        style={{
          position: 'absolute',
          left: `${progress * 100}%`,
          top: -40,
          rotate: '28deg',
          translate: `-6px ${wobble}px`,
          opacity: progress < 1 ? 1 : interpolate(frame, [writeSeconds * fps, writeSeconds * fps + 10], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        <path d="M 30 240 L 14 200 L 46 200 Z" fill="#f3d2a2" />
        <path d="M 30 240 L 25 228 L 35 228 Z" fill="#333333" />
        <rect x={14} y={30} width={32} height={170} fill="#ffcf4a" />
        <rect x={14} y={14} width={32} height={18} fill="#b8b8b8" />
        <rect x={14} y={0} width={32} height={16} rx={6} fill="#ef8fa0" />
      </svg>
    </div>
  );
};

export const Handwriting = Interactive.create({
  Component: HandwritingInner,
  layout: 'none',
  schema: {
    ...Interactive.textSchema,
    ...Interactive.childrenSchema,
    writeSeconds: {type: 'number', default: 5, min: 0.5, max: 20, step: 0.5, hiddenFromList: false, description: 'Thời gian viết (giây)'},
  },
});

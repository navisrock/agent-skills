import type React from 'react';
import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

type CaptionProps = {
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
};

// Phụ đề dưới khung hình: tự mờ vào/ra theo độ dài của chính nó.
const CaptionInner: React.FC<CaptionProps> = ({children, style}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  return (
    <div
      style={{
        position: 'absolute',
        left: 160,
        right: 160,
        bottom: 110,
        display: 'flex',
        justifyContent: 'center',
        opacity: interpolate(
          frame,
          [0, 0.6 * fps, durationInFrames - 0.6 * fps, durationInFrames],
          [0, 1, 1, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        ),
        translate: `0px ${interpolate(frame, [0, 0.8 * fps], [24, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}px`,
      }}
    >
      <div
        style={{
          fontFamily: 'Be Vietnam Pro',
          fontWeight: 600,
          fontSize: 66,
          lineHeight: 1.3,
          color: '#fffaf0',
          textAlign: 'center',
          padding: '22px 48px',
          borderRadius: 28,
          backgroundColor: 'rgba(20, 16, 40, 0.55)',
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const Caption = Interactive.create({
  Component: CaptionInner,
  layout: 'none',
  schema: {
    ...Interactive.textSchema,
    ...Interactive.backgroundSchema,
    ...Interactive.childrenSchema,
  },
});

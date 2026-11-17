import type React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';

type DeskProps = {
  readonly style?: React.CSSProperties;
  readonly lampOn?: boolean;
};

// Bàn học gỗ + đèn bàn với quầng sáng ấm.
const DeskInner: React.FC<DeskProps> = ({style, lampOn = true}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const flicker = 0.85 + Math.sin((frame / fps) * 3.1) * 0.04 + Math.sin((frame / fps) * 7.3) * 0.02;

  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, pointerEvents: 'none', ...style}}>
      {lampOn ? (
        <div
          style={{
            position: 'absolute',
            left: 1180,
            top: 260,
            width: 900,
            height: 900,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 213, 138, 0.55) 0%, rgba(255, 213, 138, 0) 65%)',
            opacity: flicker,
          }}
        />
      ) : null}
      <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        {/* Đèn bàn */}
        <rect x={1560} y={760} width={150} height={22} rx={10} fill="#2f3b52" />
        <path d="M 1635 765 L 1600 560 L 1700 470" fill="none" stroke="#2f3b52" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 1650 430 L 1790 470 L 1740 560 L 1620 520 Z" fill="#f2b84b" />
        {lampOn ? <ellipse cx={1690} cy={540} rx={40} ry={14} fill="#fff4cf" /> : null}
        {/* Mặt bàn */}
        <rect x={120} y={770} width={1680} height={46} rx={14} fill="#a8683d" />
        <rect x={160} y={816} width={1600} height={264} fill="#8a5330" />
        <rect x={200} y={850} width={1520} height={8} rx={4} fill="#764628" />
        {/* Hộp bút */}
        <rect x={1380} y={680} width={90} height={92} rx={14} fill="#5b8def" />
        <rect x={1395} y={620} width={14} height={80} rx={6} fill="#ffcf4a" />
        <rect x={1420} y={606} width={14} height={92} rx={6} fill="#ef6f6c" />
        <rect x={1445} y={630} width={14} height={70} rx={6} fill="#4cc38a" />
      </svg>
    </div>
  );
};

export const Desk = Interactive.create({
  Component: DeskInner,
  layout: 'none',
  schema: {
    lampOn: {type: 'boolean', default: true, description: 'Bật đèn bàn'},
  },
});

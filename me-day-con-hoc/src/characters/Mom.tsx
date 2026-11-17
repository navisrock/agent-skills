import type React from "react";
import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type MomProps = {
  readonly style?: React.CSSProperties;
  /** Góc tay phải (độ). 0 = buông xuống, ~-55 = chỉ vào vở. */
  readonly armAngle?: number;
  readonly dressColor?: string;
};

const MomInner: React.FC<MomProps> = ({
  style,
  armAngle = -40,
  dressColor = "#e8746b",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Chuyển động nhẹ: thở và chớp mắt định kỳ (trang trí, không cần chỉnh trong Studio).
  const breathe = Math.sin((frame / fps) * 1.6) * 4;
  const blinkPhase = frame % (4 * fps);
  const blink = interpolate(blinkPhase, [0, 3, 6], [1, 0.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const armWave = Math.sin((frame / fps) * 2.2) * 4;

  return (
    <div style={{ position: "absolute", width: 380, height: 680, ...style }}>
      <svg
        viewBox="0 0 380 680"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <g style={{ translate: `0px ${breathe}px` }}>
          {/* Tóc phía sau + búi tóc */}
          <circle cx={190} cy={70} r={52} fill="#3b2420" />
          <ellipse cx={190} cy={200} rx={108} ry={120} fill="#3b2420" />
          {/* Thân & áo */}
          <rect x={168} y={262} width={44} height={40} rx={12} fill="#e9b892" />
          <path
            d="M 60 680 C 60 420 90 300 190 300 C 290 300 320 420 320 680 Z"
            fill={dressColor}
          />
          <path
            d="M 150 302 Q 190 350 230 302"
            fill="none"
            stroke="#ffffff"
            strokeOpacity={0.55}
            strokeWidth={8}
            strokeLinecap="round"
          />
          {/* Tay chỉ bài */}
          <g
            style={{
              transformOrigin: "290px 360px",
              rotate: `${armAngle + armWave}deg`,
            }}
          >
            <path
              d="M 280 345 Q 330 450 330 540"
              fill="none"
              stroke={dressColor}
              strokeWidth={52}
              strokeLinecap="round"
            />
            <circle cx={330} cy={560} r={28} fill="#f1c7a5" />
          </g>
          {/* Đầu */}
          <circle cx={190} cy={185} r={86} fill="#f1c7a5" />
          {/* Tóc mái */}
          <path
            d="M 104 180 C 100 100 160 80 200 92 C 250 100 282 140 276 186 C 240 150 180 130 104 180 Z"
            fill="#3b2420"
          />
          {/* Mắt */}
          <g style={{ transformOrigin: "190px 192px", scale: `1 ${blink}` }}>
            <ellipse cx={158} cy={192} rx={8} ry={10} fill="#2b1a17" />
            <ellipse cx={222} cy={192} rx={8} ry={10} fill="#2b1a17" />
          </g>
          {/* Má hồng & miệng cười */}
          <circle cx={138} cy={222} r={14} fill="#f08a8a" opacity={0.45} />
          <circle cx={242} cy={222} r={14} fill="#f08a8a" opacity={0.45} />
          <path
            d="M 166 228 Q 190 252 214 228"
            fill="none"
            stroke="#8a3b34"
            strokeWidth={6}
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

export const Mom = Interactive.create({
  Component: MomInner,
  layout: "none",
  schema: {
    armAngle: {
      type: "number",
      default: -40,
      min: -120,
      max: 40,
      step: 1,
      hiddenFromList: false,
      description: "Góc tay",
    },
    dressColor: {
      type: "color",
      default: "#e8746b",
      description: "Màu áo của mẹ",
    },
  },
});

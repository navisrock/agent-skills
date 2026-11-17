import type React from "react";
import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Mood = "happy" | "neutral" | "confused" | "wow";

type ChildProps = {
  readonly style?: React.CSSProperties;
  readonly mood?: Mood;
  readonly shirtColor?: string;
};

const Mouth: React.FC<{ readonly mood: Mood }> = ({ mood }) => {
  if (mood === "happy") {
    return <path d="M 120 205 Q 150 245 180 205 Z" fill="#8a3b34" />;
  }
  if (mood === "confused") {
    return (
      <path
        d="M 124 218 Q 137 208 150 218 Q 163 228 176 218"
        fill="none"
        stroke="#8a3b34"
        strokeWidth={6}
        strokeLinecap="round"
      />
    );
  }
  if (mood === "wow") {
    return <ellipse cx={150} cy={218} rx={14} ry={18} fill="#8a3b34" />;
  }
  return (
    <path
      d="M 132 212 Q 150 228 168 212"
      fill="none"
      stroke="#8a3b34"
      strokeWidth={6}
      strokeLinecap="round"
    />
  );
};

const ChildInner: React.FC<ChildProps> = ({
  style,
  mood = "neutral",
  shirtColor = "#3fb8af",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bounce =
    mood === "happy"
      ? Math.abs(Math.sin((frame / fps) * 4)) * -14
      : Math.sin((frame / fps) * 1.8) * 3;
  const tilt = mood === "confused" ? Math.sin((frame / fps) * 1.5) * 4 - 6 : 0;
  const blinkPhase = (frame + 40) % Math.round(3.4 * fps);
  const blink = interpolate(blinkPhase, [0, 3, 6], [1, 0.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", width: 300, height: 520, ...style }}>
      <svg
        viewBox="0 0 300 520"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <g style={{ translate: `0px ${bounce}px` }}>
          {/* Thân */}
          <path
            d="M 40 520 C 40 360 70 290 150 290 C 230 290 260 360 260 520 Z"
            fill={shirtColor}
          />
          <circle cx={150} cy={360} r={10} fill="#ffffff" opacity={0.7} />
          <circle cx={150} cy={400} r={10} fill="#ffffff" opacity={0.7} />
          <g style={{ transformOrigin: "150px 260px", rotate: `${tilt}deg` }}>
            {/* Đầu */}
            <circle cx={150} cy={170} r={92} fill="#f6d0b1" />
            {/* Tóc */}
            <path
              d="M 58 170 C 50 80 120 60 160 66 C 220 72 252 120 242 168 C 220 120 170 104 120 120 C 96 128 70 146 58 170 Z"
              fill="#231815"
            />
            <path
              d="M 150 70 C 160 40 190 36 196 50 C 180 50 166 58 158 72 Z"
              fill="#231815"
            />
            {/* Mắt */}
            <g style={{ transformOrigin: "150px 168px", scale: `1 ${blink}` }}>
              <circle cx={118} cy={168} r={11} fill="#231815" />
              <circle cx={182} cy={168} r={11} fill="#231815" />
              <circle cx={122} cy={164} r={4} fill="#ffffff" />
              <circle cx={186} cy={164} r={4} fill="#ffffff" />
            </g>
            {mood === "confused" ? (
              <path
                d="M 160 132 L 200 124"
                stroke="#231815"
                strokeWidth={6}
                strokeLinecap="round"
              />
            ) : null}
            <circle cx={96} cy={200} r={15} fill="#f39a9a" opacity={0.5} />
            <circle cx={204} cy={200} r={15} fill="#f39a9a" opacity={0.5} />
            <Mouth mood={mood} />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const Child = Interactive.create({
  Component: ChildInner,
  layout: "none",
  schema: {
    shirtColor: {
      type: "color",
      default: "#3fb8af",
      description: "Màu áo của con",
    },
  },
});

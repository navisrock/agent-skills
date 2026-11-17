import { Audio } from "@remotion/media";
import {
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FloatingGlyphs } from "../elements/Decor";

// Ngôi nhà nhỏ với ô cửa sổ sáng đèn — nơi câu chuyện bắt đầu.
const House = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = 0.8 + Math.sin((frame / fps) * 2) * 0.2;

  return (
    <svg viewBox="0 0 600 460" width={600} height={460}>
      <path d="M 40 210 L 300 20 L 560 210 Z" fill="#c95b5b" />
      <rect x={90} y={200} width={420} height={260} fill="#f4e1c1" />
      <rect
        x={140}
        y={250}
        width={140}
        height={120}
        rx={10}
        fill="#ffd56b"
        opacity={glow}
      />
      <path
        d="M 210 250 L 210 370 M 140 310 L 280 310"
        stroke="#c98a3c"
        strokeWidth={8}
      />
      <rect x={340} y={290} width={110} height={170} rx={10} fill="#7a4a2e" />
      <circle cx={430} cy={380} r={8} fill="#ffd56b" />
      <rect x={420} y={60} width={50} height={110} fill="#9c4545" />
    </svg>
  );
};

const OpeningSceneInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <FloatingGlyphs name="Chữ trôi nền" />
      <Interactive.Div
        name="Ngôi nhà"
        style={{
          position: "absolute",
          left: 660,
          top: 120,
          opacity: interpolate(frame, [0, 1 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [0, 14 * fps], [0.9, 1.05], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            output: "perceptual-scale",
          }),
        }}
      >
        <House />
      </Interactive.Div>
      <Interactive.Div
        name="Tiêu đề"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 620,
          textAlign: "center",
          fontFamily: "Be Vietnam Pro",
          fontWeight: 800,
          fontSize: 150,
          color: "#fff4dc",
          textShadow: "0 10px 30px rgba(0,0,0,0.35)",
          opacity: interpolate(frame, [1 * fps, 2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [1 * fps, 2.2 * fps],
            ["0px 60px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        Mẹ dạy con học
      </Interactive.Div>
      <Interactive.Div
        name="Phụ đề mở đầu"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 820,
          textAlign: "center",
          fontFamily: "Be Vietnam Pro",
          fontWeight: 400,
          fontSize: 78,
          color: "#ffd9a0",
          opacity: interpolate(frame, [2.5 * fps, 3.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Một câu chuyện nhỏ về tình thương gia đình
      </Interactive.Div>
      {/* Lời thoại (sinh từ scripts/dialogue-timed.json) */}
      <Audio
        name="Con: Mẹ ơi, tối nay mình học gì hả mẹ?"
        src={staticFile("voice/s1-01.wav")}
        from={120}
      />
      <Audio
        name="Mẹ: Tối nay mẹ con mình cùng học chữ và học đếm nhé!"
        src={staticFile("voice/s1-02.wav")}
        from={240}
      />
    </>
  );
};

export const OpeningScene = Interactive.create({
  Component: OpeningSceneInner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});

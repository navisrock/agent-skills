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

// Thông điệp: điều mẹ thật sự dạy con.
const MessageSceneInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <FloatingGlyphs name="Chữ trôi nền" />
      <Interactive.Div
        name="Thông điệp dòng 1"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 250,
          textAlign: "center",
          fontFamily: "Be Vietnam Pro",
          fontWeight: 600,
          fontSize: 96,
          color: "#fff4dc",
          opacity: interpolate(frame, [1 * fps, 2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [1 * fps, 2.2 * fps],
            ["0px 40px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        Mẹ không chỉ dạy con chữ,
      </Interactive.Div>
      <Interactive.Div
        name="Thông điệp dòng 2"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 400,
          textAlign: "center",
          fontFamily: "Be Vietnam Pro",
          fontWeight: 600,
          fontSize: 96,
          color: "#fff4dc",
          opacity: interpolate(frame, [4 * fps, 5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [4 * fps, 5.2 * fps],
            ["0px 40px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        mẹ dạy con sự kiên trì
      </Interactive.Div>
      <Interactive.Div
        name="Thông điệp dòng 3"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 550,
          textAlign: "center",
          fontFamily: "Be Vietnam Pro",
          fontWeight: 800,
          fontSize: 110,
          color: "#ffb36b",
          opacity: interpolate(frame, [7 * fps, 8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [7 * fps, 8.2 * fps], [0.85, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 14 }),
            output: "perceptual-scale",
          }),
        }}
      >
        và cách yêu thương.
      </Interactive.Div>
      <Interactive.Div
        name="Lời kết thông điệp"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 820,
          textAlign: "center",
          fontFamily: "Be Vietnam Pro",
          fontWeight: 400,
          fontSize: 78,
          color: "#c9c3e6",
          opacity: interpolate(frame, [13 * fps, 14.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Mỗi buổi tối bên bàn học là một món quà.
      </Interactive.Div>
      {/* Lời thoại (sinh từ scripts/dialogue-timed.json) */}
      <Audio
        name="Con: Mẹ không chỉ dạy con chữ,"
        src={staticFile("voice/s7-01.wav")}
        from={30}
      />
      <Audio
        name="Con: mẹ dạy con sự kiên trì,"
        src={staticFile("voice/s7-02.wav")}
        from={120}
      />
      <Audio
        name="Con: và cách yêu thương."
        src={staticFile("voice/s7-03.wav")}
        from={210}
      />
      <Audio
        name="Con: Mỗi buổi tối bên bàn học là một món quà."
        src={staticFile("voice/s7-04.wav")}
        from={390}
      />
    </>
  );
};

export const MessageScene = Interactive.create({
  Component: MessageSceneInner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});

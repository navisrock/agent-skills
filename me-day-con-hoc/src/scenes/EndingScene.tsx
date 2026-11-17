import { Audio } from "@remotion/media";
import {
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Child } from "../characters/Child";
import { Mom } from "../characters/Mom";
import { Caption } from "../elements/Caption";
import { Heart } from "../elements/Decor";

// Kết: mẹ ôm con, trái tim và lời cảm ơn mẹ.
const EndingSceneInner = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <>
      <Interactive.Div
        name="Quầng sáng"
        style={{
          position: "absolute",
          left: 460,
          top: 280,
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 179, 107, 0.45) 0%, rgba(255, 179, 107, 0) 65%)",
        }}
      />
      <Mom
        name="Mẹ (ôm con)"
        speech={[{ clip: "s8-02", from: 255 }]}
        armAngle={20}
        style={{ left: 690, top: 430 }}
      />
      <Child
        name="Con (ôm mẹ)"
        speech={[{ clip: "s8-01", from: 90 }]}
        mood="happy"
        style={{ left: 930, top: 560 }}
      />
      <Heart name="Trái tim" from={3 * fps} style={{ left: 1300, top: 420 }} />
      <Interactive.Div
        name="Cảm ơn mẹ"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 90,
          textAlign: "center",
          fontFamily: "Be Vietnam Pro",
          fontWeight: 800,
          fontSize: 150,
          color: "#fff4dc",
          opacity: interpolate(frame, [5 * fps, 6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [5 * fps, 6.2 * fps],
            ["0px -40px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        Cảm ơn mẹ!
      </Interactive.Div>
      <Interactive.Div
        name="Câu kết"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 280,
          textAlign: "center",
          fontFamily: "Be Vietnam Pro",
          fontWeight: 400,
          fontSize: 78,
          color: "#ffd9a0",
          opacity: interpolate(frame, [9 * fps, 10 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Gia đình là ngôi trường đầu tiên.
      </Interactive.Div>
      <Interactive.Div
        name="Mờ dần về đen"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#000000",
          opacity: interpolate(
            frame,
            [durationInFrames - 2 * fps, durationInFrames - 1],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      />
      <Audio
        name="Chuông trái tim"
        src={staticFile("audio/chime.wav")}
        from={3 * fps}
        volume={0.35}
      />
      {/* Lời thoại (sinh từ scripts/dialogue-timed.json) */}
      <Audio
        name="Con: Con cảm ơn mẹ! Con yêu mẹ nhiều lắm!"
        src={staticFile("voice/s8-01.wav")}
        from={90}
      />
      <Audio
        name="Mẹ: Mẹ cũng yêu con. Ngủ ngon nhé, con yêu."
        src={staticFile("voice/s8-02.wav")}
        from={255}
      />
      <Caption
        name="Thoại 1"
        from={84}
        durationInFrames={94}
        style={{ color: "#c9f5ef" }}
      >
        Con: Con cảm ơn mẹ! Con yêu mẹ nhiều lắm!
      </Caption>
      <Caption
        name="Thoại 2"
        from={249}
        durationInFrames={102}
        style={{ color: "#ffe1d6" }}
      >
        Mẹ: Mẹ cũng yêu con. Ngủ ngon nhé, con yêu.
      </Caption>
    </>
  );
};

export const EndingScene = Interactive.create({
  Component: EndingSceneInner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});

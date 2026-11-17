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
import { StarBurst } from "../elements/Decor";
import { Desk } from "../elements/Desk";

// Con làm đúng bài: điểm 10, sao lấp lánh, hai mẹ con cùng vui.
const SuccessSceneInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <Mom
        name="Mẹ"
        armAngle={-70}
        dressColor="#e8746b"
        style={{ left: 380, top: 300 }}
      />
      <Child name="Con (vui)" mood="happy" style={{ left: 1000, top: 340 }} />
      <Desk name="Bàn học" />
      <StarBurst
        name="Sao lấp lánh"
        from={1 * fps}
        style={{ left: 1150, top: 500 }}
      />
      <Interactive.Div
        name="Tờ giấy điểm 10"
        style={{
          position: "absolute",
          left: 1360,
          top: 120,
          width: 380,
          padding: "30px 20px",
          borderRadius: 18,
          backgroundColor: "#fffaf0",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          textAlign: "center",
          fontFamily: "Patrick Hand",
          color: "#d62828",
          rotate: "6deg",
          scale: interpolate(frame, [2 * fps, 2.7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 10 }),
            output: "perceptual-scale",
          }),
        }}
      >
        <div style={{ fontSize: 190, lineHeight: 1 }}>10</div>
        <div style={{ fontSize: 80 }}>Giỏi lắm!</div>
      </Interactive.Div>
      {/* Lời thoại (sinh từ scripts/dialogue-timed.json) */}
      <Audio
        name="Con: Mẹ ơi, con được mười điểm này!"
        src={staticFile("voice/s6-01.wav")}
        from={30}
      />
      <Audio
        name="Mẹ: Ôi, con của mẹ giỏi quá!"
        src={staticFile("voice/s6-02.wav")}
        from={150}
      />
      <Audio
        name="Con: Là nhờ mẹ dạy con đó!"
        src={staticFile("voice/s6-03.wav")}
        from={285}
      />
      <Audio
        name="Mẹ: Mẹ tự hào về con lắm."
        src={staticFile("voice/s6-04.wav")}
        from={405}
      />
      <Audio
        name="Chuông lấp lánh"
        src={staticFile("audio/chime.wav")}
        from={1 * fps}
        volume={0.45}
      />
      <Caption
        name="Thoại 1"
        from={24}
        durationInFrames={99}
        style={{ color: "#c9f5ef" }}
      >
        Con: Mẹ ơi, con được mười điểm này!
      </Caption>
      <Caption
        name="Thoại 2"
        from={144}
        durationInFrames={81}
        style={{ color: "#ffe1d6" }}
      >
        Mẹ: Ôi, con của mẹ giỏi quá!
      </Caption>
      <Caption
        name="Thoại 3"
        from={279}
        durationInFrames={77}
        style={{ color: "#c9f5ef" }}
      >
        Con: Là nhờ mẹ dạy con đó!
      </Caption>
      <Caption
        name="Thoại 4"
        from={399}
        durationInFrames={78}
        style={{ color: "#ffe1d6" }}
      >
        Mẹ: Mẹ tự hào về con lắm.
      </Caption>
    </>
  );
};

export const SuccessScene = Interactive.create({
  Component: SuccessSceneInner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});

import { Audio } from "@remotion/media";
import {
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Child } from "../characters/Child";
import { Mom } from "../characters/Mom";
import { Caption } from "../elements/Caption";
import { Desk } from "../elements/Desk";
import { SpeechBubble } from "../elements/Decor";

// Con gặp bài khó và bối rối; mẹ kiên nhẫn động viên.
const StruggleSceneInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <Mom
        name="Mẹ"
        speech={[
          { clip: "s5-02", from: 270 },
          { clip: "s5-03", from: 390 },
        ]}
        armAngle={-20}
        style={{ left: 380, top: 300 }}
      />
      <Child
        name="Con (bối rối)"
        speech={[{ clip: "s5-01", from: 30 }]}
        mood="confused"
        durationInFrames={15 * fps}
        style={{ left: 1000, top: 340 }}
      />
      <Child
        name="Con (hiểu bài)"
        speech={[{ clip: "s5-04", from: 105 }]}
        mood="neutral"
        from={15 * fps}
        style={{ left: 1000, top: 340 }}
      />
      <Desk name="Bàn học" />
      <Interactive.Div
        name="Dấu hỏi"
        style={{
          position: "absolute",
          left: 1290,
          top: 180,
          fontFamily: "Be Vietnam Pro",
          fontWeight: 800,
          fontSize: 150,
          color: "#ffd166",
          opacity: interpolate(
            frame,
            [1 * fps, 2 * fps, 13 * fps, 14 * fps],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
          rotate: interpolate(
            frame,
            [1 * fps, 7 * fps, 13 * fps],
            ["-10deg", "12deg", "-10deg"],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      >
        ?
      </Interactive.Div>
      <SpeechBubble
        name="Lời mẹ"
        from={9 * fps}
        durationInFrames={9 * fps}
        style={{ left: 200, top: 90 }}
      >
        Không sao đâu con, mình thử lại nhé!
      </SpeechBubble>
      {/* Lời thoại (sinh từ scripts/dialogue-timed.json) */}
      <Audio
        name="Con: Mẹ ơi, bài này khó quá, con không làm được đâu."
        src={staticFile("voice/s5-01.wav")}
        from={30}
      />
      <Audio
        name="Mẹ: Không sao đâu con, mình thử lại nhé!"
        src={staticFile("voice/s5-02.wav")}
        from={270}
      />
      <Audio
        name="Mẹ: Mình đọc thật chậm, từng bước một. Con thấy chưa?"
        src={staticFile("voice/s5-03.wav")}
        from={390}
      />
      <Audio
        name="Con: À, con hiểu rồi mẹ ơi!"
        src={staticFile("voice/s5-04.wav")}
        from={555}
      />
      <Caption
        name="Thoại 1"
        from={24}
        durationInFrames={135}
        style={{ color: "#c9f5ef" }}
      >
        Con: Mẹ ơi, bài này khó quá, con không làm được đâu.
      </Caption>
      <Caption
        name="Thoại 2"
        from={384}
        durationInFrames={105}
        style={{ color: "#ffe1d6" }}
      >
        Mẹ: Mình đọc thật chậm, từng bước một. Con thấy chưa?
      </Caption>
      <Caption
        name="Thoại 3"
        from={549}
        durationInFrames={79}
        style={{ color: "#c9f5ef" }}
      >
        Con: À, con hiểu rồi mẹ ơi!
      </Caption>
    </>
  );
};

export const StruggleScene = Interactive.create({
  Component: StruggleSceneInner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});

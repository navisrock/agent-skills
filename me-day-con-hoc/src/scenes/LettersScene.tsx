import { Audio } from "@remotion/media";
import { Interactive, staticFile, useVideoConfig } from "remotion";
import { Caption } from "../elements/Caption";
import { Handwriting } from "../elements/Handwriting";

// Cận cảnh trang vở ô li: con tập viết chữ cái rồi viết "Mẹ yêu con".
const LettersSceneInner = () => {
  const { fps } = useVideoConfig();

  return (
    <>
      <Interactive.Svg
        name="Trang vở"
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {new Array(14).fill(true).map((_, i) => (
          <line
            key={i}
            x1={0}
            x2={1920}
            y1={90 + i * 72}
            y2={90 + i * 72}
            stroke="#b9c9ea"
            strokeWidth={3}
          />
        ))}
        <line
          x1={230}
          x2={230}
          y1={0}
          y2={1080}
          stroke="#f08a8a"
          strokeWidth={5}
        />
      </Interactive.Svg>
      <Handwriting
        name="Dòng chữ cái"
        from={1 * fps}
        durationInFrames={24 * fps}
        writeSeconds={6}
        style={{ left: 330, top: 120 }}
      >
        a ă â b c d đ
      </Handwriting>
      <Handwriting
        name="Dòng Mẹ yêu con"
        from={9 * fps}
        durationInFrames={16 * fps}
        writeSeconds={5}
        style={{ left: 330, top: 380, color: "#c2410c", fontSize: 170 }}
      >
        Mẹ yêu con.
      </Handwriting>
      <Audio
        name="Tiếng bút: chữ cái"
        src={staticFile("audio/scribble.wav")}
        from={1 * fps}
        durationInFrames={6 * fps}
        volume={0.35}
      />
      <Audio
        name="Tiếng bút: Mẹ yêu con"
        src={staticFile("audio/scribble.wav")}
        from={9 * fps}
        durationInFrames={5 * fps}
        volume={0.35}
      />
      {/* Lời thoại (sinh từ scripts/dialogue-timed.json) */}
      <Audio
        name="Mẹ: Con cầm bút thế này, nắn nót từng nét nhé."
        src={staticFile("voice/s3-01.wav")}
        from={15}
      />
      <Audio
        name="Con: A, Ă, Â, B, C, D, Đ!"
        src={staticFile("voice/s3-02.wav")}
        from={120}
      />
      <Audio
        name="Mẹ: Đúng rồi! Bây giờ con viết một câu thật hay đi."
        src={staticFile("voice/s3-03.wav")}
        from={255}
      />
      <Audio
        name="Con: Con viết: Mẹ yêu con!"
        src={staticFile("voice/s3-04.wav")}
        from={435}
      />
      <Audio
        name="Mẹ: Mẹ cũng yêu con nhiều lắm."
        src={staticFile("voice/s3-05.wav")}
        from={555}
      />
      <Caption
        name="Thoại 1"
        from={9}
        durationInFrames={103}
        style={{ color: "#ffe1d6" }}
      >
        Mẹ: Con cầm bút thế này, nắn nót từng nét nhé.
      </Caption>
      <Caption
        name="Thoại 2"
        from={114}
        durationInFrames={93}
        style={{ color: "#c9f5ef" }}
      >
        Con: A, Ă, Â, B, C, D, Đ!
      </Caption>
      <Caption
        name="Thoại 3"
        from={249}
        durationInFrames={111}
        style={{ color: "#ffe1d6" }}
      >
        Mẹ: Đúng rồi! Bây giờ con viết một câu thật hay đi.
      </Caption>
      <Caption
        name="Thoại 4"
        from={429}
        durationInFrames={76}
        style={{ color: "#c9f5ef" }}
      >
        Con: Con viết: Mẹ yêu con!
      </Caption>
      <Caption
        name="Thoại 5"
        from={549}
        durationInFrames={73}
        style={{ color: "#ffe1d6" }}
      >
        Mẹ: Mẹ cũng yêu con nhiều lắm.
      </Caption>
    </>
  );
};

export const LettersScene = Interactive.create({
  Component: LettersSceneInner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});

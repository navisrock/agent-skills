import { Audio } from "@remotion/media";
import {
  Easing,
  Interactive,
  interpolate,
  staticFile,
  Track,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Caption } from "../elements/Caption";
import { Apple } from "../elements/Decor";

// Bảng đen: đếm táo từ 1 đến 5, rồi phép cộng 2 + 3 = 5.
const CountingSceneInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <Interactive.Div
        name="Khung bảng"
        style={{
          position: "absolute",
          left: 60,
          top: 50,
          right: 60,
          bottom: 50,
          borderRadius: 30,
          border: "28px solid #8a5330",
          boxShadow: "inset 0 0 120px rgba(0,0,0,0.35)",
        }}
      />
      <Apple
        name="Táo 1"
        label="1"
        from={1 * fps}
        style={{ left: 330, top: 150 }}
      />
      <Apple
        name="Táo 2"
        label="2"
        from={2 * fps}
        style={{ left: 610, top: 150 }}
      />
      <Apple
        name="Táo 3"
        label="3"
        from={3 * fps}
        style={{ left: 890, top: 150 }}
      />
      <Apple
        name="Táo 4"
        label="4"
        from={4 * fps}
        style={{ left: 1170, top: 150 }}
      />
      <Apple
        name="Táo 5"
        label="5"
        from={5 * fps}
        style={{ left: 1450, top: 150 }}
      />
      <Interactive.Div
        name="Phép cộng"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 470,
          textAlign: "center",
          fontFamily: "Patrick Hand",
          fontSize: 210,
          color: "#f7f3e8",
          opacity: interpolate(frame, [12 * fps, 13 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [12 * fps, 13 * fps], [0.6, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 12 }),
            output: "perceptual-scale",
          }),
        }}
      >
        2 + 3 = <span style={{ color: "#ffd166" }}>5</span>
      </Interactive.Div>
      <Track name="Hiệu ứng táo">
        <Audio
          name="Bụp táo 1"
          src={staticFile("audio/pop.wav")}
          from={1 * fps}
          volume={0.6}
        />
        <Audio
          name="Bụp táo 2"
          src={staticFile("audio/pop.wav")}
          from={2 * fps}
          volume={0.6}
        />
        <Audio
          name="Bụp táo 3"
          src={staticFile("audio/pop.wav")}
          from={3 * fps}
          volume={0.6}
        />
        <Audio
          name="Bụp táo 4"
          src={staticFile("audio/pop.wav")}
          from={4 * fps}
          volume={0.6}
        />
        <Audio
          name="Bụp táo 5"
          src={staticFile("audio/pop.wav")}
          from={5 * fps}
          volume={0.6}
        />
      </Track>
      {/* Lời thoại (sinh từ scripts/dialogue-timed.json) */}
      <Audio name="Con: Một!" src={staticFile("voice/s4-01.wav")} from={33} />
      <Audio name="Con: Hai!" src={staticFile("voice/s4-02.wav")} from={63} />
      <Audio name="Con: Ba!" src={staticFile("voice/s4-03.wav")} from={93} />
      <Audio name="Con: Bốn!" src={staticFile("voice/s4-04.wav")} from={123} />
      <Audio name="Con: Năm!" src={staticFile("voice/s4-05.wav")} from={153} />
      <Audio
        name="Mẹ: Có tất cả năm quả táo. Giỏi quá!"
        src={staticFile("voice/s4-06.wav")}
        from={198}
      />
      <Audio
        name="Mẹ: Bây giờ, hai quả táo thêm ba quả táo là mấy quả?"
        src={staticFile("voice/s4-07.wav")}
        from={315}
      />
      <Audio
        name="Con: Là năm quả táo ạ!"
        src={staticFile("voice/s4-08.wav")}
        from={465}
      />
      <Audio
        name="Mẹ: Chính xác! Hai cộng ba bằng năm."
        src={staticFile("voice/s4-09.wav")}
        from={555}
      />
      <Caption
        name="Thoại 1"
        from={27}
        durationInFrames={158}
        style={{ color: "#c9f5ef" }}
      >
        Con: Một, hai, ba, bốn, năm!
      </Caption>
      <Caption
        name="Thoại 2"
        from={192}
        durationInFrames={101}
        style={{ color: "#ffe1d6" }}
      >
        Mẹ: Có tất cả năm quả táo. Giỏi quá!
      </Caption>
      <Caption
        name="Thoại 3"
        from={309}
        durationInFrames={127}
        style={{ color: "#ffe1d6" }}
      >
        Mẹ: Bây giờ, hai quả táo thêm ba quả táo là mấy quả?
      </Caption>
      <Caption
        name="Thoại 4"
        from={459}
        durationInFrames={67}
        style={{ color: "#c9f5ef" }}
      >
        Con: Là năm quả táo ạ!
      </Caption>
      <Caption
        name="Thoại 5"
        from={549}
        durationInFrames={82}
        style={{ color: "#ffe1d6" }}
      >
        Mẹ: Chính xác! Hai cộng ba bằng năm.
      </Caption>
    </>
  );
};

export const CountingScene = Interactive.create({
  Component: CountingSceneInner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});

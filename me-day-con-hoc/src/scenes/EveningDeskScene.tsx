import { Audio } from "@remotion/media";
import { Interactive, staticFile } from "remotion";
import { Child } from "../characters/Child";
import { Mom } from "../characters/Mom";
import { Caption } from "../elements/Caption";
import { Desk } from "../elements/Desk";

const EveningDeskSceneInner = () => {
  return (
    <>
      {/* Cửa sổ có trăng trên tường */}
      <Interactive.Svg
        name="Cửa sổ đêm"
        width={300}
        height={243}
        viewBox="0 0 420 340"
        style={{ position: "absolute", left: 60, top: 70 }}
      >
        <rect
          x={0}
          y={0}
          width={420}
          height={340}
          rx={20}
          fill="#1b2147"
          stroke="#c9a77a"
          strokeWidth={18}
        />
        <circle cx={300} cy={110} r={56} fill="#fff1c1" />
        <circle cx={278} cy={96} r={56} fill="#1b2147" />
        <circle cx={90} cy={80} r={5} fill="#ffffff" />
        <circle cx={150} cy={190} r={4} fill="#ffffff" />
        <circle cx={360} cy={250} r={5} fill="#ffffff" />
        <path
          d="M 210 0 L 210 340 M 0 170 L 420 170"
          stroke="#c9a77a"
          strokeWidth={12}
        />
      </Interactive.Svg>
      <Mom
        name="Mẹ"
        speech={[
          { clip: "s2-01", from: 30 },
          { clip: "s2-03", from: 330 },
          { clip: "s2-05", from: 615 },
        ]}
        armAngle={-45}
        style={{ left: 420, top: 300 }}
      />
      <Child
        name="Con"
        speech={[
          { clip: "s2-02", from: 180 },
          { clip: "s2-04", from: 480 },
        ]}
        mood="neutral"
        style={{ left: 980, top: 340 }}
      />
      <Desk name="Bàn học" />
      {/* Quyển sách mở trên bàn */}
      <Interactive.Svg
        name="Sách mở"
        width={420}
        height={140}
        viewBox="0 0 420 140"
        style={{ position: "absolute", left: 760, top: 660 }}
      >
        <path
          d="M 210 30 C 150 0 60 0 0 20 L 0 130 C 60 110 150 110 210 140 Z"
          fill="#fffaf0"
        />
        <path
          d="M 210 30 C 270 0 360 0 420 20 L 420 130 C 360 110 270 110 210 140 Z"
          fill="#f4ecd8"
        />
        <path
          d="M 40 50 L 170 50 M 40 75 L 160 75 M 250 50 L 380 50 M 250 75 L 370 75"
          stroke="#b9c4dd"
          strokeWidth={5}
        />
      </Interactive.Svg>
      {/* Lời thoại (sinh từ scripts/dialogue-timed.json) */}
      <Audio
        name="Mẹ: Con ăn cơm no chưa? Lại đây ngồi với mẹ nào."
        src={staticFile("voice/s2-01.wav")}
        from={30}
      />
      <Audio
        name="Con: Dạ, con no rồi ạ! Con lấy sách vở ra đây."
        src={staticFile("voice/s2-02.wav")}
        from={180}
      />
      <Audio
        name="Mẹ: Con ngồi thẳng lưng, mở vở ra trang mới nhé."
        src={staticFile("voice/s2-03.wav")}
        from={330}
      />
      <Audio
        name="Con: Mẹ ơi, đèn sáng quá, con nhìn rõ hết rồi!"
        src={staticFile("voice/s2-04.wav")}
        from={480}
      />
      <Audio
        name="Mẹ: Giỏi lắm. Mình bắt đầu thôi!"
        src={staticFile("voice/s2-05.wav")}
        from={615}
      />
      <Caption
        name="Thoại 1"
        from={24}
        durationInFrames={110}
        style={{ color: "#ffe1d6" }}
      >
        Mẹ: Con ăn cơm no chưa? Lại đây ngồi với mẹ nào.
      </Caption>
      <Caption
        name="Thoại 2"
        from={174}
        durationInFrames={101}
        style={{ color: "#c9f5ef" }}
      >
        Con: Dạ, con no rồi ạ! Con lấy sách vở ra đây.
      </Caption>
      <Caption
        name="Thoại 3"
        from={324}
        durationInFrames={111}
        style={{ color: "#ffe1d6" }}
      >
        Mẹ: Con ngồi thẳng lưng, mở vở ra trang mới nhé.
      </Caption>
      <Caption
        name="Thoại 4"
        from={474}
        durationInFrames={110}
        style={{ color: "#c9f5ef" }}
      >
        Con: Mẹ ơi, đèn sáng quá, con nhìn rõ hết rồi!
      </Caption>
      <Caption
        name="Thoại 5"
        from={609}
        durationInFrames={79}
        style={{ color: "#ffe1d6" }}
      >
        Mẹ: Giỏi lắm. Mình bắt đầu thôi!
      </Caption>
    </>
  );
};

export const EveningDeskScene = Interactive.create({
  Component: EveningDeskSceneInner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});

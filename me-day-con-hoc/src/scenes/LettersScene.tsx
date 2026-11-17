import {Interactive, useVideoConfig} from 'remotion';
import {Caption} from '../elements/Caption';
import {Handwriting} from '../elements/Handwriting';

// Cận cảnh trang vở ô li: con tập viết chữ cái rồi viết "Mẹ yêu con".
const LettersSceneInner = () => {
  const {fps} = useVideoConfig();

  return (
    <>
      <Interactive.Svg name="Trang vở" width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
        {new Array(14).fill(true).map((_, i) => (
          <line key={i} x1={0} x2={1920} y1={90 + i * 72} y2={90 + i * 72} stroke="#b9c9ea" strokeWidth={3} />
        ))}
        <line x1={230} x2={230} y1={0} y2={1080} stroke="#f08a8a" strokeWidth={5} />
      </Interactive.Svg>
      <Handwriting name="Dòng chữ cái" from={1 * fps} durationInFrames={24 * fps} writeSeconds={6} style={{left: 330, top: 120}}>
        a   ă   â   b   c   d   đ
      </Handwriting>
      <Handwriting
        name="Dòng Mẹ yêu con"
        from={9 * fps}
        durationInFrames={16 * fps}
        writeSeconds={5}
        style={{left: 330, top: 380, color: '#c2410c', fontSize: 170}}
      >
        Mẹ yêu con.
      </Handwriting>
      <Caption name="Lời dẫn 1" from={0.5 * fps} durationInFrames={8 * fps}>
        Mẹ cầm tay con, nắn nót từng nét chữ.
      </Caption>
      <Caption name="Lời dẫn 2" from={14.5 * fps} durationInFrames={10 * fps}>
        Câu đầu tiên con viết trọn vẹn: “Mẹ yêu con”.
      </Caption>
    </>
  );
};

export const LettersScene = Interactive.create({
  Component: LettersSceneInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});

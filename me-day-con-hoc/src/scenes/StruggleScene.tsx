import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Child} from '../characters/Child';
import {Mom} from '../characters/Mom';
import {Caption} from '../elements/Caption';
import {Desk} from '../elements/Desk';
import {SpeechBubble} from '../elements/Decor';

// Con gặp bài khó và bối rối; mẹ kiên nhẫn động viên.
const StruggleSceneInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <>
      <Mom name="Mẹ" armAngle={-20} style={{left: 380, top: 300}} />
      <Child name="Con (bối rối)" mood="confused" durationInFrames={15 * fps} style={{left: 1000, top: 340}} />
      <Child name="Con (hiểu bài)" mood="neutral" from={15 * fps} style={{left: 1000, top: 340}} />
      <Desk name="Bàn học" />
      <Interactive.Div
        name="Dấu hỏi"
        style={{
          position: 'absolute',
          left: 1290,
          top: 180,
          fontFamily: 'Be Vietnam Pro',
          fontWeight: 800,
          fontSize: 150,
          color: '#ffd166',
          opacity: interpolate(frame, [1 * fps, 2 * fps, 13 * fps, 14 * fps], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          rotate: interpolate(frame, [1 * fps, 7 * fps, 13 * fps], ['-10deg', '12deg', '-10deg'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        ?
      </Interactive.Div>
      <SpeechBubble name="Lời mẹ" from={9 * fps} durationInFrames={9 * fps} style={{left: 200, top: 90}}>
        Không sao đâu con, mình thử lại nhé!
      </SpeechBubble>
      <Caption name="Lời dẫn 1" from={0.5 * fps} durationInFrames={8 * fps}>
        Có những bài khó làm con bối rối…
      </Caption>
      <Caption name="Lời dẫn 2" from={9 * fps} durationInFrames={7.5 * fps}>
        Nhưng mẹ luôn kiên nhẫn ở bên.
      </Caption>
      <Caption name="Lời dẫn 3" from={17 * fps} durationInFrames={7.5 * fps}>
        Mẹ giảng lại thật chậm, từng bước một.
      </Caption>
    </>
  );
};

export const StruggleScene = Interactive.create({
  Component: StruggleSceneInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});

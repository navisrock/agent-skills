import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Child} from '../characters/Child';
import {Mom} from '../characters/Mom';
import {Caption} from '../elements/Caption';
import {StarBurst} from '../elements/Decor';
import {Desk} from '../elements/Desk';

// Con làm đúng bài: điểm 10, sao lấp lánh, hai mẹ con cùng vui.
const SuccessSceneInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <>
      <Mom name="Mẹ" armAngle={-70} dressColor="#e8746b" style={{left: 380, top: 300}} />
      <Child name="Con (vui)" mood="happy" style={{left: 1000, top: 340}} />
      <Desk name="Bàn học" />
      <StarBurst name="Sao lấp lánh" from={1 * fps} style={{left: 1150, top: 500}} />
      <Interactive.Div
        name="Tờ giấy điểm 10"
        style={{
          position: 'absolute',
          left: 1360,
          top: 120,
          width: 380,
          padding: '30px 20px',
          borderRadius: 18,
          backgroundColor: '#fffaf0',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          textAlign: 'center',
          fontFamily: 'Patrick Hand',
          color: '#d62828',
          rotate: '6deg',
          scale: interpolate(frame, [2 * fps, 2.7 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.spring({damping: 10}),
            output: 'perceptual-scale',
          }),
        }}
      >
        <div style={{fontSize: 190, lineHeight: 1}}>10</div>
        <div style={{fontSize: 80}}>Giỏi lắm!</div>
      </Interactive.Div>
      <Caption name="Lời dẫn 1" from={0.5 * fps} durationInFrames={8.5 * fps}>
        Con làm được rồi!
      </Caption>
      <Caption name="Lời dẫn 2" from={10 * fps} durationInFrames={9.5 * fps}>
        Con vui là mẹ hạnh phúc nhất.
      </Caption>
    </>
  );
};

export const SuccessScene = Interactive.create({
  Component: SuccessSceneInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});

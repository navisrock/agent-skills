import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Child} from '../characters/Child';
import {Mom} from '../characters/Mom';
import {Heart} from '../elements/Decor';

// Kết: mẹ ôm con, trái tim và lời cảm ơn mẹ.
const EndingSceneInner = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  return (
    <>
      <Interactive.Div
        name="Quầng sáng"
        style={{
          position: 'absolute',
          left: 460,
          top: 280,
          width: 1000,
          height: 1000,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 179, 107, 0.45) 0%, rgba(255, 179, 107, 0) 65%)',
        }}
      />
      <Mom name="Mẹ (ôm con)" armAngle={20} style={{left: 690, top: 430}} />
      <Child name="Con (ôm mẹ)" mood="happy" style={{left: 930, top: 560}} />
      <Heart name="Trái tim" from={3 * fps} style={{left: 1300, top: 420}} />
      <Interactive.Div
        name="Cảm ơn mẹ"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 90,
          textAlign: 'center',
          fontFamily: 'Be Vietnam Pro',
          fontWeight: 800,
          fontSize: 150,
          color: '#fff4dc',
          opacity: interpolate(frame, [5 * fps, 6 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          translate: interpolate(frame, [5 * fps, 6.2 * fps], ['0px -40px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Cảm ơn mẹ!
      </Interactive.Div>
      <Interactive.Div
        name="Câu kết"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 280,
          textAlign: 'center',
          fontFamily: 'Be Vietnam Pro',
          fontWeight: 400,
          fontSize: 78,
          color: '#ffd9a0',
          opacity: interpolate(frame, [9 * fps, 10 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        Gia đình là ngôi trường đầu tiên.
      </Interactive.Div>
      <Interactive.Div
        name="Mờ dần về đen"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          opacity: interpolate(frame, [durationInFrames - 2 * fps, durationInFrames - 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      />
    </>
  );
};

export const EndingScene = Interactive.create({
  Component: EndingSceneInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});

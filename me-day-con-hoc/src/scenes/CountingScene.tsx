import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Caption} from '../elements/Caption';
import {Apple} from '../elements/Decor';

// Bảng đen: đếm táo từ 1 đến 5, rồi phép cộng 2 + 3 = 5.
const CountingSceneInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <>
      <Interactive.Div
        name="Khung bảng"
        style={{
          position: 'absolute',
          left: 60,
          top: 50,
          right: 60,
          bottom: 50,
          borderRadius: 30,
          border: '28px solid #8a5330',
          boxShadow: 'inset 0 0 120px rgba(0,0,0,0.35)',
        }}
      />
      <Apple name="Táo 1" label="1" from={1 * fps} style={{left: 330, top: 150}} />
      <Apple name="Táo 2" label="2" from={2 * fps} style={{left: 610, top: 150}} />
      <Apple name="Táo 3" label="3" from={3 * fps} style={{left: 890, top: 150}} />
      <Apple name="Táo 4" label="4" from={4 * fps} style={{left: 1170, top: 150}} />
      <Apple name="Táo 5" label="5" from={5 * fps} style={{left: 1450, top: 150}} />
      <Interactive.Div
        name="Phép cộng"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 470,
          textAlign: 'center',
          fontFamily: 'Patrick Hand',
          fontSize: 210,
          color: '#f7f3e8',
          opacity: interpolate(frame, [12 * fps, 13 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          scale: interpolate(frame, [12 * fps, 13 * fps], [0.6, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.spring({damping: 12}),
            output: 'perceptual-scale',
          }),
        }}
      >
        2 + 3 = <span style={{color: '#ffd166'}}>5</span>
      </Interactive.Div>
      <Caption name="Lời dẫn 1" from={0.5 * fps} durationInFrames={10.5 * fps} style={{backgroundColor: 'rgba(0, 0, 0, 0.35)'}}>
        Rồi mẹ dạy con đếm: một, hai, ba, bốn, năm…
      </Caption>
      <Caption name="Lời dẫn 2" from={13.5 * fps} durationInFrames={11 * fps} style={{backgroundColor: 'rgba(0, 0, 0, 0.35)'}}>
        Hai quả táo thêm ba quả táo là năm quả táo!
      </Caption>
    </>
  );
};

export const CountingScene = Interactive.create({
  Component: CountingSceneInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});

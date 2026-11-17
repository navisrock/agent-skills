import {Interactive, useVideoConfig} from 'remotion';
import {Child} from '../characters/Child';
import {Mom} from '../characters/Mom';
import {Caption} from '../elements/Caption';
import {Desk} from '../elements/Desk';

const EveningDeskSceneInner = () => {
  const {fps} = useVideoConfig();

  return (
    <>
      {/* Cửa sổ có trăng trên tường */}
      <Interactive.Svg name="Cửa sổ đêm" width={300} height={243} viewBox="0 0 420 340" style={{position: 'absolute', left: 60, top: 70}}>
        <rect x={0} y={0} width={420} height={340} rx={20} fill="#1b2147" stroke="#c9a77a" strokeWidth={18} />
        <circle cx={300} cy={110} r={56} fill="#fff1c1" />
        <circle cx={278} cy={96} r={56} fill="#1b2147" />
        <circle cx={90} cy={80} r={5} fill="#ffffff" />
        <circle cx={150} cy={190} r={4} fill="#ffffff" />
        <circle cx={360} cy={250} r={5} fill="#ffffff" />
        <path d="M 210 0 L 210 340 M 0 170 L 420 170" stroke="#c9a77a" strokeWidth={12} />
      </Interactive.Svg>
      <Mom name="Mẹ" armAngle={-45} style={{left: 420, top: 300}} />
      <Child name="Con" mood="neutral" style={{left: 980, top: 340}} />
      <Desk name="Bàn học" />
      {/* Quyển sách mở trên bàn */}
      <Interactive.Svg name="Sách mở" width={420} height={140} viewBox="0 0 420 140" style={{position: 'absolute', left: 760, top: 660}}>
        <path d="M 210 30 C 150 0 60 0 0 20 L 0 130 C 60 110 150 110 210 140 Z" fill="#fffaf0" />
        <path d="M 210 30 C 270 0 360 0 420 20 L 420 130 C 360 110 270 110 210 140 Z" fill="#f4ecd8" />
        <path d="M 40 50 L 170 50 M 40 75 L 160 75 M 250 50 L 380 50 M 250 75 L 370 75" stroke="#b9c4dd" strokeWidth={5} />
      </Interactive.Svg>
      <Caption name="Lời dẫn 1" from={0.5 * fps} durationInFrames={10.5 * fps}>
        Mỗi tối, hai mẹ con ngồi bên bàn học.
      </Caption>
      <Caption name="Lời dẫn 2" from={12 * fps} durationInFrames={12.5 * fps}>
        Dưới ánh đèn vàng ấm áp, giờ học bắt đầu.
      </Caption>
    </>
  );
};

export const EveningDeskScene = Interactive.create({
  Component: EveningDeskSceneInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});

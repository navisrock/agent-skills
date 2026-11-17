import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {useVideoConfig} from 'remotion';
import './fonts';
import {CountingScene} from './scenes/CountingScene';
import {EndingScene} from './scenes/EndingScene';
import {EveningDeskScene} from './scenes/EveningDeskScene';
import {LettersScene} from './scenes/LettersScene';
import {MessageScene} from './scenes/MessageScene';
import {OpeningScene} from './scenes/OpeningScene';
import {StruggleScene} from './scenes/StruggleScene';
import {SuccessScene} from './scenes/SuccessScene';

// 8 cảnh, 7 chuyển cảnh mờ (mỗi cái 20 khung hình).
// Tổng: 15 + 25×5 + 20 + 24⅔ giây − 7×20 khung = 180 giây.
export const MeDayConHoc = () => {
  const {fps} = useVideoConfig();

  return (
    <TransitionSeries name="Các cảnh">
      <TransitionSeries.Sequence name="1. Mở đầu" durationInFrames={15 * fps}>
        <OpeningScene style={{backgroundColor: '#2b2350'}} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 20})} />
      <TransitionSeries.Sequence name="2. Bàn học buổi tối" durationInFrames={25 * fps}>
        <EveningDeskScene style={{backgroundColor: '#3a2f5f'}} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 20})} />
      <TransitionSeries.Sequence name="3. Tập viết" durationInFrames={25 * fps}>
        <LettersScene style={{backgroundColor: '#fdf6e3'}} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 20})} />
      <TransitionSeries.Sequence name="4. Tập đếm" durationInFrames={25 * fps}>
        <CountingScene style={{backgroundColor: '#2f5d50'}} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 20})} />
      <TransitionSeries.Sequence name="5. Bài khó" durationInFrames={25 * fps}>
        <StruggleScene style={{backgroundColor: '#33294f'}} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 20})} />
      <TransitionSeries.Sequence name="6. Con làm được" durationInFrames={20 * fps}>
        <SuccessScene style={{backgroundColor: '#5a3f7a'}} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 20})} />
      <TransitionSeries.Sequence name="7. Thông điệp" durationInFrames={25 * fps}>
        <MessageScene style={{backgroundColor: '#1f1a3a'}} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 20})} />
      <TransitionSeries.Sequence name="8. Cảm ơn mẹ" durationInFrames={740}>
        <EndingScene style={{backgroundColor: '#2b2350'}} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

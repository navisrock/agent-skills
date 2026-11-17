import {Composition, Folder} from 'remotion';
import './fonts';
import {MeDayConHoc} from './MeDayConHoc';
import {CountingScene} from './scenes/CountingScene';
import {EndingScene} from './scenes/EndingScene';
import {EveningDeskScene} from './scenes/EveningDeskScene';
import {LettersScene} from './scenes/LettersScene';
import {MessageScene} from './scenes/MessageScene';
import {OpeningScene} from './scenes/OpeningScene';
import {StruggleScene} from './scenes/StruggleScene';
import {SuccessScene} from './scenes/SuccessScene';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MeDayConHoc"
        component={MeDayConHoc}
        durationInFrames={5400}
        fps={30}
        width={1920}
        height={1080}
      />
      <Folder name="Canh">
        <Composition id="OpeningScene" component={OpeningScene} durationInFrames={450} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#2b2350'}}} />
        <Composition id="EveningDeskScene" component={EveningDeskScene} durationInFrames={750} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#3a2f5f'}}} />
        <Composition id="LettersScene" component={LettersScene} durationInFrames={750} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#fdf6e3'}}} />
        <Composition id="CountingScene" component={CountingScene} durationInFrames={750} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#2f5d50'}}} />
        <Composition id="StruggleScene" component={StruggleScene} durationInFrames={750} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#33294f'}}} />
        <Composition id="SuccessScene" component={SuccessScene} durationInFrames={600} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#5a3f7a'}}} />
        <Composition id="MessageScene" component={MessageScene} durationInFrames={750} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#1f1a3a'}}} />
        <Composition id="EndingScene" component={EndingScene} durationInFrames={740} fps={30} width={1920} height={1080} defaultProps={{style: {backgroundColor: '#2b2350'}}} />
      </Folder>
    </>
  );
};

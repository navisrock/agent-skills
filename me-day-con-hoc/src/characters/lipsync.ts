import { useCurrentFrame } from "remotion";
import { LIPSYNC } from "../lipsync-data";

/** Một câu thoại của nhân vật: tên file trong public/voice (không đuôi) và khung hình bắt đầu. */
export type SpeechLine = {
  readonly clip: string;
  readonly from: number;
};

/** Độ mở miệng (0–1) ở khung hình hiện tại, theo âm lượng của câu thoại đang nói. */
export const useMouthOpen = (speech: readonly SpeechLine[] = []): number => {
  const frame = useCurrentFrame();
  for (const line of speech) {
    const data = LIPSYNC[line.clip];
    if (!data) {
      continue;
    }
    const i = frame - line.from;
    if (i >= 0 && i < data.length) {
      return data[i];
    }
  }
  return 0;
};

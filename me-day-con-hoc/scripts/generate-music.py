"""Tổng hợp nhạc nền & hiệu ứng âm thanh bằng numpy (không cần mạng, không bản quyền).

Chạy: python scripts/generate-music.py
Kết quả (public/audio/):
  music.wav     – nhạc ru êm 180 giây: piano rải hợp âm + nền pad, C – Am – F – G
  pop.wav       – tiếng "bụp" khi quả táo xuất hiện
  scribble.wav  – tiếng bút chì sột soạt (6 giây)
  chime.wav     – tiếng chuông lấp lánh khi con được điểm 10 / trái tim
"""
from pathlib import Path
import wave

import numpy as np

RATE = 44100
OUT = Path(__file__).resolve().parent.parent / "public" / "audio"
rng = np.random.default_rng(7)


def write(name: str, y: np.ndarray) -> None:
    y = y / (np.max(np.abs(y)) + 1e-9) * 0.85
    with wave.open(str(OUT / name), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes((y * 32767).astype(np.int16).tobytes())


def midi(n: float) -> float:
    return 440 * 2 ** ((n - 69) / 12)


def piano(freq: float, dur: float, vel: float = 1.0) -> np.ndarray:
    t = np.arange(int(dur * RATE)) / RATE
    tone = (np.sin(2 * np.pi * freq * t) + 0.35 * np.sin(4 * np.pi * freq * t) + 0.12 * np.sin(6 * np.pi * freq * t))
    env = np.exp(-t * 2.2) * np.minimum(1, t / 0.005)
    return vel * tone * env


def pad(freqs: list[float], dur: float) -> np.ndarray:
    t = np.arange(int(dur * RATE)) / RATE
    y = sum(np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * f * 1.003 * t) for f in freqs)
    env = np.minimum(1, t / 0.8) * np.minimum(1, (dur - t) / 0.8)
    return y * env


def music(total: float = 180.0) -> np.ndarray:
    bpm = 72
    beat = 60 / bpm
    bar = 4 * beat
    # Hợp âm (MIDI): C, Am, F, G — lặp lại.
    chords = [[48, 52, 55, 60], [45, 52, 57, 60], [41, 53, 57, 60], [43, 50, 55, 59]]
    # Giai điệu chuông nhẹ, mỗi ô nhịp 2 nốt (None = nghỉ).
    melody = [[76, 74], [72, None], [69, 72], [74, None], [76, 79], [77, 76], [74, 72], [71, None]]
    y = np.zeros(int((total + 4) * RATE))
    n_bars = int(total / bar) + 1
    for b in range(n_bars):
        start = b * bar
        ch = chords[b % 4]
        y_pad = pad([midi(n) for n in ch[:3]], bar + 0.4) * 0.05
        i = int(start * RATE)
        y[i:i + len(y_pad)] += y_pad[: len(y) - i]
        # Rải hợp âm móc đơn: 8 nốt mỗi ô nhịp.
        pattern = [0, 1, 2, 3, 2, 1, 2, 3]
        for k, idx in enumerate(pattern):
            note = piano(midi(ch[idx] + 12), 1.6, 0.22 if k % 2 else 0.3)
            j = int((start + k * beat / 2) * RATE)
            y[j:j + len(note)] += note[: len(y) - j]
        # Giai điệu xuất hiện sau 8 ô nhịp đầu, nghỉ xen kẽ cho đỡ đơn điệu.
        if b >= 4 and (b // 8) % 2 == 1:
            for k, n in enumerate(melody[b % 8]):
                if n is None:
                    continue
                note = piano(midi(n), 2.4, 0.28)
                j = int((start + k * 2 * beat) * RATE)
                y[j:j + len(note)] += note[: len(y) - j]
    y = y[: int(total * RATE)]
    # Mờ vào 2 giây, mờ ra 4 giây.
    fade_in = np.minimum(1, np.arange(len(y)) / (2 * RATE))
    fade_out = np.minimum(1, (len(y) - np.arange(len(y))) / (4 * RATE))
    # Vọng nhẹ (delay) cho ấm.
    d = int(0.32 * RATE)
    echo = np.zeros_like(y)
    echo[d:] = y[:-d] * 0.25
    return (y + echo) * fade_in * fade_out


def pop() -> np.ndarray:
    t = np.arange(int(0.18 * RATE)) / RATE
    f = 900 * np.exp(-t * 18) + 250
    return np.sin(2 * np.pi * np.cumsum(f) / RATE) * np.exp(-t * 25)


def scribble(dur: float = 6.0) -> np.ndarray:
    n = int(dur * RATE)
    noise = rng.standard_normal(n)
    # Lọc thông cao đơn giản cho tiếng giấy sột soạt.
    hp = np.diff(noise, prepend=0)
    t = np.arange(n) / RATE
    # Từng nét bút: biên độ dao động ~6 lần/giây.
    strokes = np.clip(np.sin(2 * np.pi * 6.3 * t + np.sin(2 * np.pi * 1.1 * t) * 2), 0, 1) ** 1.5
    env = np.minimum(1, t / 0.1) * np.minimum(1, (dur - t) / 0.2)
    return hp * strokes * env * 0.5


def chime() -> np.ndarray:
    y = np.zeros(int(2.5 * RATE))
    for k, n in enumerate([84, 88, 91, 96]):
        t = np.arange(len(y) - int(k * 0.09 * RATE)) / RATE
        f = midi(n)
        tone = (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 2.76 * t)) * np.exp(-t * 3)
        y[int(k * 0.09 * RATE):] += tone
    return y


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    write("music.wav", music())
    write("pop.wav", pop())
    write("scribble.wav", scribble())
    write("chime.wav", chime())
    print("ok")

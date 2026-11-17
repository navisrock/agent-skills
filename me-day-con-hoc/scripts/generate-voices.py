"""Tổng hợp giọng nói mẹ & con bằng Piper (offline) từ scripts/dialogue.json.

Cách chạy (cần piper-tts và các mô hình vi_VN của rhasspy/piper-voices):
  python scripts/generate-voices.py --piper <đường dẫn piper> --models <thư mục .onnx>

Kết quả: public/voice/<cảnh>-<số>.wav và scripts/dialogue-timed.json (thời điểm & độ dài đã đo).
"""
import argparse
import json
import subprocess
import tempfile
import wave
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent

VOICES = {
    # Mẹ: giọng nữ vais1000, đọc chậm & ấm.
    "me": {"model": "vi_VN-vais1000-medium.onnx", "length_scale": 1.3, "pitch": 1.0},
    # Con: giọng 25hours nâng tông ×1.3 (cả cao độ lẫn âm sắc, như tua nhanh) để giống trẻ em.
    # Tua nhanh cũng làm nói nhanh ×1.3, nên đọc chậm sẵn (length_scale 1.4) để bù.
    "con": {"model": "vi_VN-25hours_single-low.onnx", "length_scale": 1.4, "pitch": 1.3},
}
OUT_RATE = 44100
TARGET_RMS_DB = -20.0
MIN_GAP = 0.35  # giây nghỉ tối thiểu giữa hai câu


def read_wav(path: Path) -> tuple[np.ndarray, int]:
    with wave.open(str(path)) as w:
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
        return x, w.getframerate()


def process(x: np.ndarray, rate: int, pitch: float) -> np.ndarray:
    # Nâng tông kiểu "asetrate": coi tín hiệu như có tần số lấy mẫu rate*pitch, rồi lấy mẫu lại.
    src_rate = rate * pitch
    t_out = np.arange(0, len(x) / src_rate, 1 / OUT_RATE)
    y = np.interp(t_out, np.arange(len(x)) / src_rate, x)
    # Cắt khoảng lặng đầu/cuối.
    env = np.abs(y) > 10 ** (-40 / 20)
    idx = np.flatnonzero(env)
    if len(idx):
        y = y[max(0, idx[0] - int(0.02 * OUT_RATE)): idx[-1] + int(0.08 * OUT_RATE)]
    # Chuẩn hóa âm lượng theo RMS của phần có tiếng, giới hạn đỉnh.
    voiced = y[np.abs(y) > 0.02]
    rms = np.sqrt(np.mean(voiced**2)) if len(voiced) else 1e-3
    y = y * (10 ** (TARGET_RMS_DB / 20) / rms)
    y = np.clip(y, -0.89, 0.89)
    # Fade 10ms hai đầu để tránh tiếng "tách".
    f = int(0.01 * OUT_RATE)
    y[:f] *= np.linspace(0, 1, f)
    y[-f:] *= np.linspace(1, 0, f)
    return y


def write_wav(path: Path, y: np.ndarray) -> None:
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(OUT_RATE)
        w.writeframes((y * 32767).astype(np.int16).tobytes())


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--piper", required=True)
    ap.add_argument("--models", required=True)
    args = ap.parse_args()

    script = json.loads((ROOT / "scripts" / "dialogue.json").read_text())
    out_dir = ROOT / "public" / "voice"
    out_dir.mkdir(parents=True, exist_ok=True)

    for scene in script["scenes"]:
        cursor = 0.0
        for i, line in enumerate(scene["lines"], start=1):
            voice = VOICES[line["who"]]
            name = f"{scene['id']}-{i:02d}.wav"
            with tempfile.TemporaryDirectory() as tmp:
                raw = Path(tmp) / "raw.wav"
                subprocess.run(
                    [args.piper, "-m", str(Path(args.models) / voice["model"]), "-f", str(raw),
                     "--length-scale", str(line.get("length_scale", voice["length_scale"])), "--sentence-silence", "0.1"],
                    input=line["text"].encode(), check=True, capture_output=True,
                )
                x, rate = read_wav(raw)
            y = process(x, rate, voice["pitch"])
            write_wav(out_dir / name, y)
            d = len(y) / OUT_RATE
            start = max(line["at"], cursor)
            line.update({"file": f"voice/{name}", "start": round(start, 2), "duration": round(d, 2)})
            cursor = start + d + MIN_GAP
            print(f"{name}  {line['who']:>3}  start={start:6.2f}s  dur={d:5.2f}s  {line['text']}")

    (ROOT / "scripts" / "dialogue-timed.json").write_text(json.dumps(script, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()

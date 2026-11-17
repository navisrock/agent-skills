"""Tính độ mở miệng (0–1) cho từng khung hình (30 fps) của mỗi câu thoại trong public/voice/.

Chạy: python scripts/generate-lipsync.py  (sau generate-voices.py)
Kết quả: src/lipsync-data.ts — map tên file → mảng độ mở miệng theo khung hình.
"""
from pathlib import Path
import wave

import numpy as np

FPS = 30
ROOT = Path(__file__).resolve().parent.parent


def envelope(path: Path) -> list[float]:
    with wave.open(str(path)) as w:
        sr = w.getframerate()
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
    hop = sr // FPS
    n = int(np.ceil(len(x) / hop))
    dbs = []
    for i in range(n):
        # Cửa sổ ~1 khung hình (chồng 25%) để bắt được nhịp từng âm tiết.
        seg = x[max(0, i * hop - hop // 4): (i + 1) * hop + hop // 4]
        dbs.append(20 * np.log10(np.sqrt(np.mean(seg**2)) + 1e-9))
    # Chuẩn hóa theo mức to nhất của câu: thấp hơn đỉnh 20 dB trở xuống = miệng khép.
    top = np.percentile(dbs, 95)
    values = [float(np.clip((d - (top - 20)) / 20, 0, 1)) ** 1.6 for d in dbs]
    # Mở nhanh, khép chậm hơn một chút.
    out, prev = [], 0.0
    for v in values:
        prev = v if v > prev else prev * 0.4 + v * 0.6
        out.append(round(prev, 2))
    out.append(0.0)
    return out


def main() -> None:
    entries = []
    for f in sorted((ROOT / "public" / "voice").glob("*.wav")):
        entries.append(f"  {f.stem!r}: [{', '.join(str(v) for v in envelope(f))}],".replace("'", '"'))
    ts = (
        "// Tự sinh bởi scripts/generate-lipsync.py — không sửa tay.\n"
        "// Độ mở miệng (0–1) theo từng khung hình 30 fps của mỗi câu thoại.\n"
        "export const LIPSYNC: Record<string, readonly number[]> = {\n" + "\n".join(entries) + "\n};\n"
    )
    (ROOT / "src" / "lipsync-data.ts").write_text(ts)
    print(f"{len(entries)} clips")


if __name__ == "__main__":
    main()

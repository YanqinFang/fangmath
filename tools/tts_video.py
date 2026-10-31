#!/usr/bin/env python3
"""Slides PDF + one narration line per page -> 1080p MP4 with an AI voice (Kokoro, offline).
  python3 tts_video.py slides.pdf KEY out.mp4 [--voice af_heart] [--speed 0.92]
KEY is the entry in narration_geo_ch1.py (e.g. 1-3)."""
import argparse, os, subprocess, tempfile, shutil, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
M = os.environ.get("KOKORO_DIR", "/tmp/claude-0/-home-claude/365523ff-c735-5edd-83a7-c39253aa0f9e/scratchpad/tts")
ap = argparse.ArgumentParser(); ap.add_argument("pdf"); ap.add_argument("key"); ap.add_argument("out")
ap.add_argument("--voice", default="af_heart"); ap.add_argument("--speed", type=float, default=0.92)
ap.add_argument("--narr", default=os.path.join(os.path.dirname(__file__), "narration_geo_ch1.py"))
a = ap.parse_args()
import re
def say(t):   # fix words the voice reads wrong: the letter A ("ay", not "uh") and "Prof."
    t = t.replace("Prof.", "Professor")
    return re.sub(r"\bA\b(?! (point|line|plane|ray|segment)\b)", "Eigh", t)
G = {}; exec(open(a.narr).read(), G); lines = G["N"][a.key]
tmp = tempfile.mkdtemp()
subprocess.run(["pdftoppm", "-png", "-scale-to-x", "1920", "-scale-to-y", "1080", a.pdf, os.path.join(tmp, "s")], check=True)
pages = sorted(f for f in os.listdir(tmp) if f.endswith(".png"))
assert len(pages) == len(lines), f"{len(pages)} pages but {len(lines)} lines"
k = Kokoro(os.path.join(M, "kokoro.onnx"), os.path.join(M, "voices.bin"))
SR = 24000; chunks = []; durs = []
for i, ln in enumerate(lines):
    wait = 3.5 if ln.endswith("|") else 0.0
    audio, sr = k.create(say(ln.rstrip("|")), voice=a.voice, speed=a.speed, lang="en-us"); assert sr == SR
    lead = np.zeros(int(0.35 * SR), dtype=np.float32); tail = np.zeros(int((0.55 + wait) * SR), dtype=np.float32)
    seg = np.concatenate([lead, audio.astype(np.float32), tail]); chunks.append(seg); durs.append(len(seg) / SR)
    print(f"page {i+1:2d}: {durs[-1]:5.1f}s")
wav = os.path.join(tmp, "voice.wav"); sf.write(wav, np.concatenate(chunks), SR)
lst = os.path.join(tmp, "list.txt")
with open(lst, "w") as f:
    for p, d in zip(pages, durs): f.write(f"file '{os.path.join(tmp, p)}'\nduration {d:.3f}\n")
    f.write(f"file '{os.path.join(tmp, pages[-1])}'\n")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst, "-i", wav,
    "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", "48000",
    "-vf", "fps=30,format=yuv420p", "-c:v", "libx264", "-preset", "veryfast", "-tune", "stillimage", "-crf", "20",
    "-ac", "2", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", a.out], check=True)
shutil.rmtree(tmp); print(f"wrote {a.out}  ({sum(durs)/60:.1f} min)")

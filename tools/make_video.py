#!/usr/bin/env python3
"""FangMath — turn Beamer slides + one voice recording into a YouTube video.

Yan records her voice while flipping through the slide PDF, pausing ~2 s each time she
moves to the next page. This script finds the (pages - 1) longest pauses, uses them as the
page changes, cleans up the audio and writes a 1080p MP4.

  python3 make_video.py slides.pdf voice.m4a out.mp4 [--pause 1.2] [--noise -38]
"""
import subprocess, sys, re, os, tempfile, argparse, shutil

def run(cmd, **k): return subprocess.run(cmd, check=True, capture_output=True, text=True, **k)

def duration(f):
    return float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).stdout)

def silences(audio, noise, minlen):
    err = subprocess.run(["ffmpeg", "-i", audio, "-af", f"silencedetect=noise={noise}dB:d={minlen}", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    S = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    E = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    return [(s, e) for s, e in zip(S, E)]

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("pdf"); ap.add_argument("audio"); ap.add_argument("out")
    ap.add_argument("--pause", type=float, default=1.2, help="shortest pause that can be a page change (s)")
    ap.add_argument("--noise", type=float, default=-38, help="silence threshold (dB)")
    ap.add_argument("--times", help="manual page-change times in seconds, comma separated")
    a = ap.parse_args()
    tmp = tempfile.mkdtemp()
    # 1) clean audio: trim the start/end hiss, reduce noise, even out loudness
    clean = os.path.join(tmp, "voice.m4a")
    run(["ffmpeg", "-y", "-i", a.audio, "-af",
         "highpass=f=80,afftdn=nf=-25,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.3,"
         "areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.6,areverse,loudnorm=I=-16:TP=-1.5:LRA=11",
         "-ar", "48000", "-c:a", "aac", "-b:a", "160k", clean])
    total = duration(clean)
    # 2) slides → 1920x1080 images
    run(["pdftoppm", "-png", "-scale-to-x", "1920", "-scale-to-y", "1080", a.pdf, os.path.join(tmp, "s")])
    pages = sorted(f for f in os.listdir(tmp) if f.startswith("s") and f.endswith(".png"))
    n = len(pages)
    # 3) page-change times
    if a.times:
        cuts = [float(x) for x in a.times.split(",")]
    else:
        sil = silences(clean, a.noise, a.pause)
        sil = [s for s in sil if s[0] > 0.5 and s[1] < total - 0.5]
        if len(sil) < n - 1:
            print(f"WARNING: found {len(sil)} pauses but the PDF has {n} pages ({n-1} page changes needed). "
                  f"Try --pause 0.8 or --noise -33.", file=sys.stderr)
        best = sorted(sorted(sil, key=lambda s: s[1] - s[0], reverse=True)[: n - 1])
        cuts = [(s + e) / 2 for s, e in best]
    edges = [0.0] + cuts + [total]
    print(f"{n} pages, {len(cuts)} page changes, {total:.1f} s of audio")
    for i in range(min(n, len(edges) - 1)): print(f"  page {i+1:2d}: {edges[i]:7.1f} → {edges[i+1]:7.1f}")
    # 4) concat list (last page stays on screen until the audio ends)
    lst = os.path.join(tmp, "list.txt")
    with open(lst, "w") as f:
        for i, p in enumerate(pages):
            d = (edges[i + 1] - edges[i]) if i + 1 < len(edges) else 0.5
            f.write(f"file '{os.path.join(tmp, p)}'\nduration {max(d, 0.04):.3f}\n")
        f.write(f"file '{os.path.join(tmp, pages[-1])}'\n")
    run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-i", clean, "-vf", "fps=30,format=yuv420p",
         "-c:v", "libx264", "-preset", "veryfast", "-tune", "stillimage", "-crf", "20", "-c:a", "copy", "-shortest",
         "-movflags", "+faststart", a.out])
    shutil.rmtree(tmp)
    print("wrote", a.out)

if __name__ == "__main__": main()

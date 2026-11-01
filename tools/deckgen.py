"""Build a Beamer video deck + matching narration from one structure.
Each frame: (title, steps, fig) where steps = [(latex, narration), ...]. Step k appears on overlay k.
A narration ending in '|' gets a 3.5 s 'Your turn' pause."""
import os
PRE_SRC = os.path.join(os.path.dirname(__file__), "..", "materials/geometry/ch01/Geo_1-3_Midpoint_Distance_Video_Slides.tex")
def preamble(sec):
    s = open(PRE_SRC).read(); pre = s[:s.index(r"\begin{document}")].split("\n", 1)[1]
    pre = pre.replace(r"Geometry $\cdot$ Chapter 1", r"Geometry $\cdot$ Chapter \CHNO").replace(r"$\to$ Geometry $\to$ Chapter 1", r"$\to$ Geometry $\to$ Chapter \CHNO")
    return "\\def\\SECTION{" + sec + "}\n" + pre
def build(path, sec, chno, lesson, title, sub, frames, remember, remember_say):
    tex = [preamble(sec), "\\def\\CHNO{%s}\n\\usetikzlibrary{angles,quotes}\n\\begin{document}\n" % chno]
    narr = []
    tex.append("\\titleframe{Lesson %s}{%s}{%s}\n" % (lesson, title, sub))
    narr.append(f"Welcome to Fang Math. This is Geometry, lesson {lesson.replace('.', ' point ')}: {strip(title)}.")
    for fr in frames:
        ftitle, steps = fr[0], fr[1]; fig = fr[2] if len(fr) > 2 else None; kind = fr[3] if len(fr) > 3 else ""
        body = []
        for k, (lx, say) in enumerate(steps, 1):
            body.append("\\onslide<%d->{%s}\\par\\medskip" % (k, lx)); narr.append(say)
        inner = "\n".join(body)
        if kind == "turn":
            q = "\\begin{yourturn}%s\\end{yourturn}\\par\\medskip\n" % steps[0][0]
            inner = q + "\n".join("\\onslide<%d->{%s}\\par\\medskip" % (k, lx) for k, (lx, _) in enumerate(steps[1:], 2))
            if fig: inner = "\\begin{columns}[c]\\begin{column}{0.6\\textwidth}%s\\end{column}\\begin{column}{0.38\\textwidth}\\centering %s\\end{column}\\end{columns}" % (inner, fig)
            tex.append("\\begin{frame}{}\n%s\n\\end{frame}\n" % inner)
            continue
        if fig:
            inner = "\\begin{columns}[c]\\begin{column}{0.44\\textwidth}\\centering %s\\end{column}\\begin{column}{0.54\\textwidth}%s\\end{column}\\end{columns}" % (fig, inner)
        tex.append("\\begin{frame}{%s}\n%s\n\\end{frame}\n" % (ftitle, inner))
    tex.append("\\closeframe{\\begin{itemize}\\setlength\\itemsep{8pt}\n%s\n\\end{itemize}}\n\\end{document}\n" % "\n".join("\\item " + r for r in remember))
    narr.append("Remember: " + remember_say + " Now go to fang math dot com and practice at your level. See you next time!")
    open(path, "w").write("".join(tex))
    return narr
def strip(t):
    import re
    return re.sub(r"\\&", "and", re.sub(r"[{}$\\]", "", t)) if "\\" in t else t.replace("&", "and")

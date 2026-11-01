#!/usr/bin/env python3
"""Learn-section video kit from one lesson spec (same words and examples as the Learn page).

  python3 learn_video.py SPEC.py OUTDIR

SPEC.py defines L = {...} (see lessons/alg1_2-2.py). Writes into OUTDIR:
  <base>_Video_Slides.tex   Beamer deck: every blank is shown empty, then filled in (one PDF page each)
  <base>_Fill_In_Notes.tex  student sheet with the same blanks, to fill in while watching
  <base>_Fill_In_Key.tex    the same sheet with the blanks filled in
  <base>_narration.py       one narration line per Beamer PDF page (for tts_video.py)

Blanks are written {{answer}} inside any text or math string.
"""
import re, sys, os

PRE_COMMON = r"""\usepackage[T1]{fontenc}
\usepackage[scaled]{helvet}
\renewcommand{\familydefault}{\sfdefault}
\usepackage{amsmath,amssymb,calc}
\usepackage{tikz}
\definecolor{ftitle}{HTML}{3D2C8D}
\definecolor{fkey}{HTML}{0096C7}
\definecolor{fwatch}{HTML}{2BB673}
\definecolor{fturn}{HTML}{F4A100}
\definecolor{fpink}{HTML}{EF476F}
\definecolor{fnotice}{HTML}{9B5DE5}
\definecolor{fink}{HTML}{1E1B33}
"""

def blanks(s):
    return re.findall(r"\{\{(.*?)\}\}", s)

def fill(s, mode, k=None, start=None):
    """mode: 'beamer' (blank i revealed on overlay start+i), 'blank', 'key'.  Math-safe: answers are typeset as text boxes."""
    out, i = [], 0
    def rep(m):
        nonlocal i
        a = m.group(1); box = a if a.startswith("$") else a
        if mode == "beamer":
            r = rf"\fb{{{start[i]}}}{{{box}}}"
        elif mode == "plain":
            r = box
        elif mode == "blank":
            r = rf"\nb{{{box}}}"
        else:
            r = rf"\kb{{{box}}}"
        i += 1; return r
    return re.sub(r"\{\{(.*?)\}\}", rep, s)

def html2tex(s):
    return s.replace("<b>", r"\textbf{").replace("</b>", "}").replace("—", "---")

def build(L, out):
    base = L["base"]; os.makedirs(out, exist_ok=True)
    narr = []
    wr = lambda x: x if x[-1:] in "~|" else x + "~"   # after a blank is filled in: 2 s to write it down
    # ---------- Beamer ----------
    B = [r"\documentclass[aspectratio=169,14pt]{beamer}", PRE_COMMON, r"""
\setbeamertemplate{navigation symbols}{}
\setbeamercolor{normal text}{fg=fink}
\setbeamercolor{frametitle}{fg=ftitle}
\setbeamerfont{frametitle}{series=\bfseries,size=\Large}
\setbeamercolor{structure}{fg=fkey}
\setbeamertemplate{frametitle}{\vspace{8pt}\insertframetitle\par\vspace{-1pt}{\color{fturn}\rule{2.2cm}{2.5pt}}}
\setbeamertemplate{footline}{\hspace{0.6cm}{\color{ftitle}\scriptsize\bfseries Prof.\ Fang \textcolor{fkey}{Math}}\hfill{\scriptsize\color{gray}\SECTION}\hspace{0.6cm}\vspace{6pt}}
% fill-in blank: empty line before overlay #1, the answer (pink) from overlay #1 on; same width both ways
\newcommand{\fb}[2]{\underline{\makebox[\widthof{#2}+1.2em][c]{\alt<#1->{\textcolor{fpink}{\bfseries #2}}{\phantom{#2}}}}}
\newenvironment{lbox}[3]{\begin{beamercolorbox}[sep=9pt,rounded=true]{#1}{\color{#2}\bfseries #3}\par\smallskip}{\end{beamercolorbox}}
\setbeamercolor{keyb}{bg=fkey!10,fg=fink}
\setbeamercolor{watchb}{bg=fwatch!10,fg=fink}
\setbeamercolor{warnb}{bg=fpink!10,fg=fink}
\setbeamercolor{noteb}{bg=fnotice!10,fg=fink}
""", rf"\def\SECTION{{{L['course']} $\cdot$ {L['no']} {L['title']}}}", r"\begin{document}"]
    # title
    B.append(rf"""\begin{{frame}}[plain]
\begin{{tikzpicture}}[remember picture,overlay]
\fill[ftitle] (current page.north west) rectangle ([yshift=-0.9cm]current page.north east);
\node[anchor=west,text=white,font=\bfseries] at ([xshift=0.6cm,yshift=-0.45cm]current page.north west) {{Prof.\ Fang \textcolor{{fturn}}{{Math}}}};
\node[anchor=east,text=white,font=\small] at ([xshift=-0.6cm,yshift=-0.45cm]current page.north east) {{{L['course']} $\cdot$ Chapter {L['no'].split('.')[0]}}};
\end{{tikzpicture}}
\vfill
{{\color{{fkey}}\large\bfseries Lesson {L['no']}}}\par\medskip
{{\color{{ftitle}}\fontsize{{30}}{{34}}\selectfont\bfseries {L['title']}}}\par\medskip
{{\color{{fturn}}\rule{{3cm}}{{3pt}}}}\par\bigskip
{{\large Get your \textbf{{fill-in notes}} and a pencil ready.}}
\vfill
{{\small\color{{gray}} fangmath.com}}
\end{{frame}}""")
    narr.append(L["say"]["title"])

    def frame(title, box, color, head, lines, says, extra=""):
        """lines: list of strings (may contain blanks); each blank gets its own overlay, in order.
        says: narration for overlay 1 (all empty) then one per blank."""
        nb = sum(len(blanks(x)) for x in lines)
        assert len(says) == nb + 1, (title, nb, len(says))
        k = 2; body = []
        for x in lines:
            st = list(range(k, k + len(blanks(x)))); k += len(blanks(x))
            body.append(html2tex(fill(x, "beamer", start=st)))
        B.append(rf"\begin{{frame}}{{{title}}}" + "\n" + rf"\begin{{lbox}}{{{box}}}{{{color}}}{{{head}}}" + "\n\\large " + "\n\n".join(body) + "\n" + r"\end{lbox}" + extra + "\n" + r"\end{frame}")
        narr.extend([says[0]] + [wr(x) for x in says[1:]])

    # big idea
    frame("The big idea", "keyb", "fkey", "Key idea", [L["idea"]], L["say"]["idea"])
    # watch me: steps appear one at a time; each step = math (with blanks) + why (with blanks)
    S = L["steps"]; k = 1; rows = []; sayw = []
    for j, (m, w, says) in enumerate(S):
        show = k  # step j appears on overlay `show`
        nbm, nbw = len(blanks(m)), len(blanks(w))
        st = list(range(show + 1, show + 1 + nbm + nbw))
        mt = fill(m, "beamer", start=st[:nbm]); wt = fill(w, "beamer", start=st[nbm:])
        rows.append(rf"\onslide<{show}->{{${mt}$}} & \onslide<{show}->{{\color{{gray}}{wt}}}\\[7pt]")
        assert len(says) == 1 + nbm + nbw, m
        sayw.extend([says[0]] + [wr(x) for x in says[1:]]); k = show + 1 + nbm + nbw
    B.append(r"\begin{frame}{Watch me}" + "\n" + rf"\begin{{lbox}}{{watchb}}{{fwatch}}{{{L['watch_intro']}}}" + "\n"
             + r"\large\renewcommand{\arraystretch}{1.25}\begin{tabular}{@{}l@{\qquad}l@{}}" + "\n" + "\n".join(rows) + "\n" + r"\end{tabular}" + "\n" + r"\end{lbox}" + "\n" + r"\end{frame}")
    narr.extend(sayw)
    # watch out
    frame("Watch out!", "warnb", "fpink", "Common mistake", [L["warn"]], L["say"]["warn"])
    # remember
    # remember = the Learn page's own key idea and warning, word for word (blanks filled in)
    B.append(r"\begin{frame}{Remember}" + "\n" + r"\begin{lbox}{keyb}{fkey}{Key idea}" + "\n" + html2tex(fill(L["idea"], "plain")) + "\n" + r"\end{lbox}\medskip" + "\n"
             + r"\begin{lbox}{warnb}{fpink}{Watch out}" + "\n" + html2tex(fill(L["warn"], "plain")) + "\n" + r"\end{lbox}\vfill" + "\n"
             + rf"\begin{{center}}{{\color{{ftitle}}\bfseries Now practice at your level:}}\enskip{{\large\color{{fkey}}\bfseries fangmath.com}}\enskip{{\small\color{{gray}}$\to$ {L['course']} $\to$ {L['no']}}}\end{{center}}" + "\n" + r"\end{frame}")
    narr.append(L["say"]["end"])
    B.append(r"\end{document}")
    open(f"{out}/{base}_Video_Slides.tex", "w").write("\n".join(B) + "\n")

    # ---------- notes + key ----------
    def sheet(mode):
        badge = "VIDEO NOTES" if mode == "blank" else "ANSWER KEY"
        bcol = "ftitle" if mode == "blank" else "fpink"
        T = [r"\documentclass[11pt]{article}", PRE_COMMON, r"""
\usepackage[margin=1.8cm,top=1.5cm]{geometry}
\usepackage[most]{tcolorbox}
\usepackage{array}
\pagestyle{empty}
\setlength{\parindent}{0pt}
\newcommand{\nb}[1]{\underline{\makebox[\widthof{#1}+2.6em]{}}}
\newcommand{\kb}[1]{\underline{\makebox[\widthof{#1}+2.6em]{\textcolor{fpink}{\bfseries #1}}}}
\newtcolorbox{lbox}[2]{enhanced,colback=#1!7,colframe=#1,boxrule=0.9pt,arc=3mm,left=10pt,right=10pt,top=8pt,bottom=8pt,
  title={#2},fonttitle=\bfseries,coltitle=#1,attach boxed title to top left={xshift=10pt,yshift=-8pt},
  boxed title style={colback=white,colframe=#1,boxrule=0.9pt,arc=2mm}}
\begin{document}
""",
             rf"\colorbox{{{bcol}}}{{\color{{white}}\bfseries\small\ {badge}\ }}\hfill{{\small\color{{gray}}{L['course']} $\cdot$ Chapter {L['no'].split('.')[0]}}}\par\medskip",
             rf"{{\color{{ftitle}}\LARGE\bfseries {L['no']} {L['title']}}}\par\smallskip",
             (r"{\small Watch the video and fill in each blank as it appears. Pause whenever you need to.}\hfill Name: \underline{\makebox[4.5cm]{}}" if mode == "blank" else r"{\small Answers in pink.}") + r"\par\bigskip",
             r"\begin{lbox}{fkey}{Key Idea}" + "\n" + html2tex(fill(L["idea"], mode)) + r"\\[2pt]\end{lbox}\par\bigskip",
             r"\begin{lbox}{fwatch}{Watch Me --- " + L["watch_intro"] + "}\n" + r"\renewcommand{\arraystretch}{1.9}\begin{tabular}{@{}>{\large}p{0.36\linewidth}p{0.55\linewidth}@{}}" + "\n" + r"\textbf{Step} & \textbf{Why}\\" + "\n"
             + "\n".join(rf"${fill(m, mode)}$ & {fill(w, mode)}\\" for m, w, _ in L["steps"]) + "\n" + r"\end{tabular}\end{lbox}\par\bigskip",
             r"\begin{lbox}{fpink}{Common Mistake}" + "\n" + html2tex(fill(L["warn"], mode)) + r"\\[2pt]\end{lbox}\par\bigskip",
             r"\vfill{\centering\small\color{gray} Practice at your level: \textbf{fangmath.com} $\to$ " + L["course"] + r" $\to$ " + L["no"] + r"\par \textcopyright\ 2026 Prof.\ Fang Math. All rights reserved.\par}",
             r"\end{document}"]
        return "\n".join(T) + "\n"
    open(f"{out}/{base}_Fill_In_Notes.tex", "w").write(sheet("blank"))
    open(f"{out}/{base}_Fill_In_Key.tex", "w").write(sheet("key"))
    open(f"{out}/{base}_narration.py", "w").write("N = {}\nN[%r] = %r\n" % (L["no"], narr))
    return len(narr)

if __name__ == "__main__":
    G = {}; exec(open(sys.argv[1]).read(), G)
    print("narration lines:", build(G["L"], sys.argv[2]))

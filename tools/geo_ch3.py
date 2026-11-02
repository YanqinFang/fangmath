import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from deckgen import build
OUT = os.path.join(os.path.dirname(__file__), "..", "materials/geometry/ch03")
os.makedirs(OUT, exist_ok=True)
N = {}

# two parallel lines cut by a transversal, angles 1-8 (1 top-left, 2 top-right, 3 bottom-left, 4 bottom-right at each crossing)
def TFIG(hl="", sc=0.85):
    lab = []
    for (x0, y0, base) in [(0.6, 1, 1), (-0.6, -1, 5)]:
        for k, (dx, dy) in enumerate([(-0.62, 0.3), (0.55, 0.3), (-0.55, -0.3), (0.62, -0.3)]):
            n = base + k; col = "fred" if str(n) in hl.split(",") else "fink"
            lab.append("\\node[font=\\small\\bfseries,text=%s] at (%.2f,%.2f){%d};" % (col, x0 + dx, y0 + dy, n))
    return ("\\begin{tikzpicture}[scale=%s]\\draw[very thick,fteal,{Stealth}-{Stealth}] (-2.6,1)--(2.6,1) node[right,fink]{$\\ell$};"
            "\\draw[very thick,fteal,{Stealth}-{Stealth}] (-2.6,-1)--(2.6,-1) node[right,fink]{$m$};"
            "\\draw[very thick,{Stealth}-{Stealth}] (-1.32,-2.2)--(1.32,2.2) node[above,fink]{$t$};%s\\end{tikzpicture}" % (sc, "".join(lab)))

# ---------- 3.1 ----------
BOX = ("\\begin{tikzpicture}[scale=0.95]\\draw[thick] (0,0) rectangle (2.4,1.6);\\draw[thick] (0,1.6)--(0.9,2.3)--(3.3,2.3)--(2.4,1.6);"
       "\\draw[thick] (3.3,2.3)--(3.3,0.7)--(2.4,0);\\draw[thick,dashed] (0.9,2.3)--(0.9,0.7)--(3.3,0.7) (0.9,0.7)--(0,0);"
       
       "\\node[above left] at (0,1.6){$A$};\\node[below left] at (2.4,1.6){$B$};\\node[above right] at (3.3,2.3){$C$};\\node[above] at (0.9,2.3){$D$};"
       "\\node[below left] at (0,0){$E$};\\node[below] at (2.4,0){$F$};\\node[right] at (3.3,0.7){$G$};\\node[below right] at (0.9,0.7){$H$};\\end{tikzpicture}")
N["3-1"] = build(f"{OUT}/Geo_3-1_Pairs_of_Lines_Angles_Video_Slides.tex", "3.1 Pairs of Lines and Angles", 3, "3.1",
 "Pairs of Lines \\& Angles", "Parallel, skew, and the angles a transversal makes", [
 ("Three ways two lines can relate", [
  ("\\key{Intersecting}: the lines meet in one point.", "Two lines in space can relate in three ways. First, they can be intersecting: they meet at exactly one point."),
  ("\\key{Parallel}: coplanar and \\textbf{never} meet.", "Second, they can be parallel. Parallel lines lie in the same plane and never meet."),
  ("\\key{Skew}: \\textbf{not} coplanar and never meet --- only in 3D.", "Third, they can be skew. Skew lines never meet, but they are not in the same plane. Skew lines only happen in three dimensions.")]),
 ("Look at a box", [
  ("$\\overleftrightarrow{AB}$ and $\\overleftrightarrow{DC}$: \\ans{\\text{parallel}}", "Let's use a box. Line A B and line D C are both on the top face, and they never meet. So they are parallel."),
  ("$\\overleftrightarrow{AB}$ and $\\overleftrightarrow{BF}$: \\ans{\\text{intersecting}}", "Line A B and line B F share point B. So they are intersecting."),
  ("$\\overleftrightarrow{AB}$ and $\\overleftrightarrow{CG}$: \\ans{\\text{skew}}", "Line A B and line C G never meet, and no flat face contains both of them. So they are skew."),
  ("plane $ABCD \\parallel$ plane $EFGH$", "Planes can be parallel too. The top face and the bottom face never meet, so they are parallel planes.")], BOX),
 ("A transversal makes 8 angles", [
  ("A \\key{transversal} $t$ crosses two lines and makes \\key{8 angles}.", "A transversal is a line that crosses two other lines. Here, line t crosses lines l and m, and it makes eight angles."),
  ("Angles $1$--$4$ at the top crossing, $5$--$8$ at the bottom crossing.", "Angles one to four are at the top crossing. Angles five to eight are at the bottom crossing, in the same positions."),
  ("\\key{Interior}: between the two lines. \\quad \\key{Exterior}: outside them.", "Angles between the two lines are called interior. Angles outside the two lines are called exterior.")], TFIG()),
 ("Name the angle pairs", [
  ("\\key{Corresponding}: same position, e.g. $\\angle 1$ and $\\angle 5$", "Now let's name the pairs. Corresponding angles are in the same position at each crossing, like angle one and angle five."),
  ("\\key{Alternate interior}: inside, opposite sides, e.g. $\\angle 4$ and $\\angle 5$", "Alternate interior angles are inside the two lines, on opposite sides of the transversal, like angle four and angle five."),
  ("\\key{Alternate exterior}: outside, opposite sides, e.g. $\\angle 1$ and $\\angle 8$", "Alternate exterior angles are outside the two lines, on opposite sides, like angle one and angle eight."),
  ("\\key{Same-side interior}: inside, same side, e.g. $\\angle 3$ and $\\angle 5$", "And same side interior angles are inside, on the same side of the transversal, like angle three and angle five.")], TFIG("1,4,5,8,3")),
 ("Watch out", [
  ("\\warn{Two lines that never meet are not always parallel. If no plane contains both, they are \\textbf{skew}.}", "Watch out. Two lines that never meet are not always parallel. If you can't find one flat plane that contains both, they are skew.")]),
 ("", [
  ("Name each pair: \\ (a) $\\angle 2$ and $\\angle 6$ \\quad (b) $\\angle 3$ and $\\angle 6$ \\quad (c) $\\angle 4$ and $\\angle 6$", "Your turn. Name each pair. Angle two and angle six. Angle three and angle six. Angle four and angle six. Pause the video and try it.|"),
  ("(a) \\ans{\\text{corresponding}} \\\\ (b) \\ans{\\text{alternate interior}} \\\\ (c) \\ans{\\text{same-side interior}}", "Angles two and six are in the same position, so they are corresponding. Angles three and six are inside, on opposite sides, so they are alternate interior. Angles four and six are inside, on the same side, so they are same side interior.")], TFIG(), "turn"),
 ],
 ["Lines can be \\key{intersecting}, \\key{parallel} or \\key{skew}.", "A \\key{transversal} makes 8 angles.", "Pairs: \\key{corresponding}, \\key{alternate interior}, \\key{alternate exterior}, \\key{same-side interior}."],
 "two lines can be intersecting, parallel or skew. A transversal makes eight angles, and we name the pairs corresponding, alternate interior, alternate exterior, and same side interior.")

# ---------- 3.2 ----------
N["3-2"] = build(f"{OUT}/Geo_3-2_Parallel_Lines_Transversals_Video_Slides.tex", "3.2 Parallel Lines and Transversals", 3, "3.2",
 "Parallel Lines \\& Transversals", "Equal or supplementary --- that's the whole pattern", [
 ("When $\\ell \\parallel m$", [
  ("\\key{Corresponding} angles are \\key{congruent}.", "When the two lines are parallel, the angle pairs have special relationships. Corresponding angles are congruent."),
  ("\\key{Alternate interior} and \\key{alternate exterior} angles are \\key{congruent}.", "Alternate interior angles are congruent, and alternate exterior angles are congruent too."),
  ("\\key{Same-side interior} angles are \\key{supplementary} (add to $180^\\circ$).", "But same side interior angles are supplementary. They add up to one hundred eighty degrees.")], TFIG()),
 ("The easy way to see it", [
  ("Every angle is either \\key{acute} or \\key{obtuse}.", "Here's the easy way to remember it. When two parallel lines are cut by a transversal, there are only two sizes of angle: a small acute one and a big obtuse one."),
  ("Two acute angles are \\key{equal}. Two obtuse angles are \\key{equal}.", "Any two acute angles are equal. Any two obtuse angles are equal."),
  ("An acute $+$ an obtuse $= \\ans{180^\\circ}$", "And an acute angle plus an obtuse angle always makes one hundred eighty degrees.")], TFIG("1,4,5,8")),
 ("Find the angle", [
  ("$\\ell \\parallel m$, \\ $m\\angle 1 = 110^\\circ$. \\ Find $m\\angle 5$ and $m\\angle 6$.", "Let's try one. Lines l and m are parallel, and angle one is one hundred ten degrees. Find angle five and angle six."),
  ("$\\angle 1$, $\\angle 5$ corresponding: \\ $m\\angle 5 = \\ans{110^\\circ}$", "Angles one and five are corresponding, so they are congruent. Angle five is one hundred ten degrees."),
  ("$\\angle 5$, $\\angle 6$ linear pair: \\ $m\\angle 6 = 180 - 110 = \\ans{70^\\circ}$", "Angles five and six form a linear pair, so angle six is one eighty minus one ten, which is seventy degrees.")], TFIG("1,5,6")),
 ("With algebra", [
  ("Alternate interior: $(3x + 15)^\\circ$ and $(5x - 25)^\\circ$", "Now with algebra. Two alternate interior angles are three x plus fifteen and five x minus twenty five."),
  ("Congruent: $3x + 15 = 5x - 25 \\Rightarrow 40 = 2x \\Rightarrow x = \\ans{20}$", "Since the lines are parallel, alternate interior angles are congruent. Set them equal. Three x plus fifteen equals five x minus twenty five. So forty equals two x, and x is twenty."),
  ("Angle: $3(20) + 15 = \\ans{75^\\circ}$", "Then the angle is three times twenty plus fifteen, which is seventy five degrees. Always answer the question they asked.")]),
 ("Watch out", [
  ("\\warn{Same-side interior angles are \\textbf{supplementary}, not equal. Set them to add to $180^\\circ$.}", "Watch out. Same side interior angles are not equal. They add to one hundred eighty. So set up the equation with a sum of one eighty.")]),
 ("", [
  ("$\\ell \\parallel m$. Same-side interior angles are $(2x + 10)^\\circ$ and $(3x - 5)^\\circ$. Find $x$ and both angles.", "Your turn. The lines are parallel. Same side interior angles are two x plus ten, and three x minus five. Find x and both angles. Pause the video and try it.|"),
  ("$5x + 5 = 180 \\Rightarrow x = \\ans{35}$; \\ angles \\ans{80^\\circ} and \\ans{100^\\circ}", "They add to one eighty. Five x plus five equals one eighty, so x is thirty five. The angles are eighty degrees and one hundred degrees. Check: eighty plus one hundred is one eighty.")], None, "turn"),
 ],
 ["Parallel lines: corresponding, alternate interior, alternate exterior angles are \\key{congruent}.", "Same-side interior angles are \\key{supplementary}.", "Acute $=$ acute, obtuse $=$ obtuse, acute $+$ obtuse $= 180^\\circ$."],
 "when lines are parallel, corresponding and alternate angles are congruent, and same side interior angles add to one eighty. Acute equals acute, obtuse equals obtuse, and acute plus obtuse is one eighty.")

# ---------- 3.3 ----------
N["3-3"] = build(f"{OUT}/Geo_3-3_Proving_Lines_Parallel_Video_Slides.tex", "3.3 Proving Lines Parallel", 3, "3.3",
 "Proving Lines Parallel", "Use the angle facts backwards", [
 ("Run it backwards", [
  ("Last lesson: lines parallel $\\Rightarrow$ angles congruent.", "In the last lesson we started with parallel lines and found angles. Now we go backwards."),
  ("This lesson: angles congruent $\\Rightarrow$ \\key{lines parallel}.", "If the angles are right, then the lines must be parallel. These are called converses.")]),
 ("The converses", [
  ("\\key{Corresponding} angles congruent $\\Rightarrow \\ell \\parallel m$", "If corresponding angles are congruent, the lines are parallel."),
  ("\\key{Alternate interior} \\textbf{or} \\key{alternate exterior} angles congruent $\\Rightarrow \\ell \\parallel m$", "If alternate interior angles are congruent, or alternate exterior angles are congruent, the lines are parallel."),
  ("\\key{Same-side interior} angles \\key{supplementary} $\\Rightarrow \\ell \\parallel m$", "If same side interior angles are supplementary, the lines are parallel."),
  ("Two lines parallel to the \\textbf{same} line are parallel.", "And one more: if two lines are both parallel to a third line, they are parallel to each other.")], TFIG()),
 ("Prove it", [
  ("$m\\angle 4 = 72^\\circ$, \\ $m\\angle 5 = 72^\\circ$. \\ Is $\\ell \\parallel m$?", "Angle four is seventy two degrees, and angle five is seventy two degrees. Are lines l and m parallel? Don't assume it. Prove it."),
  ("$\\angle 4$ and $\\angle 5$ are \\ans{\\text{alternate interior}}", "First, name the pair. Angles four and five are alternate interior angles."),
  ("$\\angle 4 \\cong \\angle 5$, so $\\ell \\parallel m$ \\ --- \\ Alternate Interior Angles Converse", "They have the same measure, so they are congruent. By the alternate interior angles converse, l is parallel to m.")], TFIG("4,5")),
 ("Find $x$ so the lines are parallel", [
  ("Same-side interior: $(4x + 6)^\\circ$ and $(5x - 15)^\\circ$", "Same side interior angles are four x plus six, and five x minus fifteen. For what x are the lines parallel?"),
  ("Need a sum of $180^\\circ$: \\ $9x - 9 = 180 \\Rightarrow x = \\ans{21}$", "For same side interior angles, we need them to add to one eighty. Nine x minus nine equals one eighty, so nine x is one eighty nine, and x is twenty one.")]),
 ("Watch out", [
  ("\\warn{Never use ``they look parallel.'' Name the angle pair, show it is congruent (or supplementary), then name the converse.}", "Watch out. Never say the lines look parallel. Name the angle pair, show it is congruent or supplementary, and then name the converse you used.")]),
 ("", [
  ("$m\\angle 1 = 115^\\circ$, \\ $m\\angle 8 = 115^\\circ$. \\ Is $\\ell \\parallel m$? Which converse?", "Your turn. Angle one is one hundred fifteen degrees, and angle eight is one hundred fifteen degrees. Are the lines parallel? Which converse proves it? Pause the video and try it.|"),
  ("$\\angle 1$, $\\angle 8$ are alternate exterior and congruent: \\ \\ans{\\text{yes}} --- Alternate Exterior Angles Converse", "Angles one and eight are alternate exterior angles, and they are congruent. So yes, the lines are parallel, by the alternate exterior angles converse.")], TFIG("1,8"), "turn"),
 ],
 ["Congruent corresponding / alternate angles $\\Rightarrow$ \\key{parallel}.", "Supplementary same-side interior angles $\\Rightarrow$ \\key{parallel}.", "Name the pair, show the angle fact, name the \\key{converse}."],
 "if corresponding or alternate angles are congruent, the lines are parallel. If same side interior angles are supplementary, the lines are parallel. Name the pair, show the angle fact, and name the converse.")

# ---------- 3.4 ----------
PFIG = ("\\begin{tikzpicture}[scale=0.9]\\draw[very thick,{Stealth}-{Stealth}] (-2.4,0)--(2.4,0) node[right]{$\\ell$};"
        "\\fill (0,2) circle(2.5pt) node[above]{$P$};\\draw[very thick,fteal] (0,2)--(0,0);\\fill (0,0) circle(2.2pt) node[below]{$Q$};"
        "\\draw (0,0)--(0.25,0)--(0.25,0.25)--(0,0.25);\\draw[thick,dashed,fred] (0,2)--(-1.6,0) (0,2)--(1.3,0);\\end{tikzpicture}")
XFIG = ("\\begin{tikzpicture}[scale=0.9]\\draw[very thick,{Stealth}-{Stealth}] (-2,0)--(2,0);\\draw[very thick,{Stealth}-{Stealth}] (0,-1.6)--(0,1.6);"
        "\\node at (-0.45,0.35){$1$};\\node at (0.45,0.35){$2$};\\draw (0,0)--(0.22,0)--(0.22,0.22)--(0,0.22);\\end{tikzpicture}")
N["3-4"] = build(f"{OUT}/Geo_3-4_Perpendicular_Lines_Video_Slides.tex", "3.4 Perpendicular Lines", 3, "3.4",
 "Perpendicular Lines", "Right angles, and the shortest distance to a line", [
 ("Perpendicular lines", [
  ("\\key{Perpendicular} lines meet at a \\key{right angle}: \\ $a \\perp b$", "Perpendicular lines meet at a right angle, ninety degrees. We write a, upside down T, b."),
  ("The little \\key{square} in a picture marks a right angle.", "In a picture, a little square at the corner marks the right angle.")], XFIG),
 ("Linear pair of congruent angles", [
  ("$\\angle 1$ and $\\angle 2$ form a linear pair: \\ $m\\angle 1 + m\\angle 2 = 180^\\circ$", "Angles one and two form a linear pair, so they add to one eighty."),
  ("If $\\angle 1 \\cong \\angle 2$: each is $180 \\div 2 = \\ans{90^\\circ}$", "If they are also congruent, each one is one eighty divided by two, which is ninety degrees."),
  ("\\defn{Two lines that form a linear pair of congruent angles are \\key{perpendicular}.}", "So: if two lines form a linear pair of congruent angles, the lines are perpendicular.")], XFIG),
 ("Two lines perpendicular to the same line", [
  ("In a plane: $a \\perp t$ and $b \\perp t$ $\\Rightarrow$ \\key{$a \\parallel b$}", "In a plane, if two lines are both perpendicular to the same line, then they are parallel to each other."),
  ("Why: corresponding angles are both $90^\\circ$, so they are congruent.", "Why? Both lines make ninety degree corresponding angles with the transversal. Congruent corresponding angles mean the lines are parallel.")]),
 ("Distance from a point to a line", [
  ("Drop a segment from $P$ straight down to $\\ell$: $\\overline{PQ} \\perp \\ell$", "How far is point P from line l? Drop a segment from P straight down to the line, so it is perpendicular. Call the foot Q."),
  ("Every slanted path is \\textbf{longer} than $PQ$.", "Any slanted path from P to the line is longer. The red dashed paths are longer than P Q."),
  ("\\defn{Distance from a point to a line $=$ length of the \\key{perpendicular} segment.}", "So the distance from a point to a line is the length of the perpendicular segment. It's the shortest path.")], PFIG),
 ("Watch out", [
  ("\\warn{Only the \\textbf{perpendicular} segment measures the distance to a line --- not a slanted one.}", "Watch out. Only the perpendicular segment gives the distance to a line. A slanted segment is always too long.")]),
 ("", [
  ("Point $P(3, 5)$ and the line $y = 1$. \\ What is the distance from $P$ to the line?", "Your turn. Point P is at three, five, and the line is y equals one. What is the distance from P to the line? Pause the video and try it.|"),
  ("Go straight down to $(3, 1)$: \\ distance $= 5 - 1 = \\ans{4}$", "The line is horizontal, so go straight down to three, one. The distance is five minus one, which is four.")], None, "turn"),
 ],
 ["\\key{Perpendicular} lines meet at $90^\\circ$.", "Linear pair of congruent angles $\\Rightarrow$ perpendicular.", "Distance to a line $=$ the \\key{perpendicular} segment, the shortest path."],
 "perpendicular lines meet at ninety degrees. A linear pair of congruent angles means the lines are perpendicular. And the distance from a point to a line is the perpendicular segment, the shortest path.")

# ---------- 3.5 ----------
N["3-5"] = build(f"{OUT}/Geo_3-5_Equations_Parallel_Perpendicular_Video_Slides.tex", "3.5 Equations of Parallel and Perpendicular Lines", 3, "3.5",
 "Equations of Parallel \\& Perpendicular Lines", "Same slope, or flip and change the sign", [
 ("Slope rules", [
  ("\\key{Parallel} lines have the \\key{same} slope.", "On a coordinate grid, parallel lines have the same slope. They rise at exactly the same rate."),
  ("\\key{Perpendicular} lines: slopes are \\key{negative reciprocals}.", "Perpendicular lines have slopes that are negative reciprocals."),
  ("Flip the fraction \\textbf{and} change the sign: \\ $\\tfrac23 \\to -\\tfrac32$ \\quad ($\\tfrac23 \\cdot -\\tfrac32 = -1$)", "That means flip the fraction, and change the sign. Two thirds becomes negative three halves. And their product is negative one.")]),
 ("Find the slopes", [
  ("$y = \\tfrac23 x + 1$: \\ slope $\\tfrac23$", "Start with y equals two thirds x plus one. The slope is two thirds."),
  ("Parallel slope: \\ans{\\tfrac23}", "A parallel line has the same slope, two thirds."),
  ("Perpendicular slope: \\ans{-\\tfrac32}", "A perpendicular line has the slope negative three halves.")]),
 ("Write a parallel line", [
  ("Through $(2, 3)$, parallel to $y = 4x - 1$", "Write the line through two, three that is parallel to y equals four x minus one."),
  ("Same slope $m = 4$: \\ $y - 3 = 4(x - 2)$", "Parallel, so the slope is four. Use point slope form: y minus three equals four times x minus two."),
  ("$y = \\ans{4x - 5}$", "Distribute and add three: y equals four x minus five.")]),
 ("Write a perpendicular line", [
  ("Through $(4, 1)$, perpendicular to $2x + 3y = 6$", "Now a perpendicular line through four, one, perpendicular to two x plus three y equals six."),
  ("Solve for $y$: $y = -\\tfrac23 x + 2$, \\ slope $-\\tfrac23$", "First solve for y to find the slope. Y equals negative two thirds x plus two. The slope is negative two thirds."),
  ("Perpendicular slope $\\tfrac32$: \\ $y - 1 = \\tfrac32(x - 4)$ \\ $\\Rightarrow$ \\ $y = \\ans{\\tfrac32 x - 5}$", "Flip and change the sign: three halves. So y minus one equals three halves times x minus four. That gives y equals three halves x minus five.")]),
 ("Watch out", [
  ("\\warn{Perpendicular needs \\textbf{both} steps: flip \\textbf{and} change the sign. The perpendicular slope of $2$ is $-\\tfrac12$, not $\\tfrac12$.}", "Watch out. Perpendicular needs both steps, flip and change the sign. The perpendicular slope of two is negative one half, not one half.")]),
 ("", [
  ("Write the line through $(3, -2)$ perpendicular to $y = -3x + 7$.", "Your turn. Write the line through three, negative two that is perpendicular to y equals negative three x plus seven. Pause the video and try it.|"),
  ("Slope $\\tfrac13$: \\ $y + 2 = \\tfrac13(x - 3)$ \\ $\\Rightarrow$ \\ $y = \\ans{\\tfrac13 x - 3}$", "The slope negative three flips to one third. Y plus two equals one third times x minus three. So y equals one third x minus three.")], None, "turn"),
 ],
 ["\\key{Parallel}: same slope.", "\\key{Perpendicular}: negative reciprocal --- flip and change the sign.", "Then use point-slope form: $y - y_1 = m(x - x_1)$."],
 "parallel lines have the same slope. Perpendicular lines have negative reciprocal slopes: flip and change the sign. Then use point slope form.")

import json; json.dump(N, open(os.path.join(os.path.dirname(__file__), "narration_geo_ch3.json"), "w"), indent=1)
print({k: len(v) for k, v in N.items()})

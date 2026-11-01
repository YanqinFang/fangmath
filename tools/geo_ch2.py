import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from deckgen import build
OUT = os.path.join(os.path.dirname(__file__), "..", "materials/geometry/ch02")
N = {}
# ---------- 2.1 ----------
N["2-1"] = build(f"{OUT}/Geo_2-1_Inductive_Reasoning_Video_Slides.tex", "2.1 Inductive Reasoning", 2, "2.1",
 "Patterns \\& Inductive Reasoning", "Look for the pattern, then predict", [
 ("What is inductive reasoning?", [
  ("\\defn{\\key{Inductive reasoning}: look at examples, find a \\key{pattern}, and use it to \\key{predict}.}",
   "Inductive reasoning means: look at some examples, find a pattern, and use the pattern to predict what comes next."),
  ("\\textbf{1.} Look \\quad $\\to$ \\quad \\textbf{2.} Describe the rule \\quad $\\to$ \\quad \\textbf{3.} Predict",
   "So there are three steps. Look carefully. Describe the rule in words. Then use the rule to predict.")]),
 ("A number pattern", [
  ("{\\Large $3,\\ 7,\\ 11,\\ 15,\\ \\ldots$}", "Here is a pattern: three, seven, eleven, fifteen. What changes each time?"),
  ("Rule: \\key{add 4} each time \\quad {\\small\\color{gray}(check every pair: $7-3$, $11-7$, $15-11$)}", "Each number is four more than the one before. Check every pair, not just the first two: seven minus three, eleven minus seven, fifteen minus eleven. All four. So the rule is: add four."),
  ("Next term: $15 + 4 = \\ans{19}$", "So the next term is fifteen plus four, which is nineteen."),
  ("10th term: $3 + 9 \\cdot 4 = \\ans{39}$ \\quad {\\small\\color{gray}start at 3, add 4 nine times}", "We can even jump ahead. For the tenth term, start at three and add four, nine times. Three plus thirty six is thirty nine.")]),
 ("A picture pattern", [
  ("\\tikz{\\foreach \\n/\\x in {1/0,2/1.2,3/3,4/5.4}{\\foreach \\i in {1,...,\\n}{\\foreach \\j in {1,...,\\n}{\\fill[fteal] (\\x+\\i*0.3,\\j*0.3) circle(0.1);}}}}\\par\\smallskip $1,\\ 4,\\ 9,\\ 16,\\ \\ldots$",
   "Patterns can be pictures too. One dot, then a two by two square, then three by three, then four by four. One, four, nine, sixteen."),
  ("These are \\key{square numbers}: $1^2, 2^2, 3^2, 4^2$. \\quad Next: $5^2 = \\ans{25}$", "These are the square numbers: one squared, two squared, three squared, four squared. So the next one is five squared, which is twenty five.")]),
 ("Conjecture and counterexample", [
  ("\\key{Conjecture}: a statement you believe is true, based on a pattern.", "When you use a pattern to make a guess, that guess is called a conjecture."),
  ("Conjecture: ``The sum of two numbers is always greater than each number.''", "Here's a conjecture: the sum of two numbers is always greater than each of the numbers. Two plus three is five, and five is bigger than both. It seems true."),
  ("\\key{Counterexample}: $-2 + 5 = 3$, \\ and $3 < 5$. \\quad So the conjecture is \\textbf{false}.", "But one example is enough to show it's false. Negative two plus five is three, and three is not greater than five. One example that breaks a conjecture is called a counterexample.")]),
 ("Watch out", [
  ("$2,\\ 4,\\ 8,\\ \\ldots$ \\quad times 2? \\ $\\to 16$", "Watch out. Look at two, four, eight. If the rule is times two, the next number is sixteen."),
  ("\\warn{Or $+2, +4, +6$? \\ $\\to 14$. \\ Two rules can fit the same first terms --- that's why inductive reasoning gives a \\textbf{conjecture}, not a proof.}", "But if the rule is add two, then add four, then add six, the next number is fourteen. Two different rules fit the same first terms. That's why inductive reasoning only gives a conjecture, not a proof.")]),
 ("", [
  ("Find the next two terms: \\quad {\\Large $1,\\ 3,\\ 6,\\ 10,\\ \\ldots$}", "Your turn. Find the next two terms: one, three, six, ten. Pause the video and try it.|"),
  ("The differences are $+2, +3, +4$, so next $+5$, then $+6$: \\quad $10 + 5 = \\ans{15}$, \\ $15 + 6 = \\ans{21}$", "The differences are plus two, plus three, plus four. So next we add five, then six. Ten plus five is fifteen, and fifteen plus six is twenty one.")], None, "turn"),
 ],
 ["\\key{Inductive reasoning}: look, describe the rule, predict.", "Check the rule on \\textbf{every} pair of terms.", "A pattern gives a \\key{conjecture}; one \\key{counterexample} shows it is false."],
 "inductive reasoning means look, describe the rule, and predict. Check the rule on every pair of terms. A pattern gives you a conjecture, and just one counterexample shows that a conjecture is false.")
# ---------- 2.2 ----------
N["2-2"] = build(f"{OUT}/Geo_2-2_Conditional_Statements_Video_Slides.tex", "2.2 Conditional Statements", 2, "2.2",
 "Conditional Statements", "If\\ldots\\ then\\ldots --- and its converse, inverse and contrapositive", [
 ("If $p$, then $q$", [
  ("{\\large If \\colorbox{fteal!15}{it rains}, then \\colorbox{fgold!25}{the ground is wet}.}", "A conditional statement has the form: if p, then q. For example: if it rains, then the ground is wet."),
  ("{\\color{fteal}\\textbf{$p$ = hypothesis}} (the ``if'' part) \\qquad {\\color{fgold}\\textbf{$q$ = conclusion}} (the ``then'' part) \\qquad written $p \\to q$", "The if part, it rains, is called the hypothesis. We call it p. The then part, the ground is wet, is the conclusion. We call it q. We write it as p arrow q.")]),
 ("Four related statements", [
  ("\\key{Conditional} \\quad $p \\to q$ \\quad If it rains, then the ground is wet.", "From one conditional we can make three more statements. Here's the conditional again: if it rains, then the ground is wet."),
  ("\\key{Converse} \\quad $q \\to p$ \\quad \\textbf{switch}: If the ground is wet, then it rained.", "The converse switches the two parts: if the ground is wet, then it rained."),
  ("\\key{Inverse} \\quad $\\sim p \\to \\sim q$ \\quad \\textbf{negate}: If it does not rain, then the ground is not wet.", "The inverse keeps the order, but negates both parts, which means adding not: if it does not rain, then the ground is not wet."),
  ("\\key{Contrapositive} \\quad $\\sim q \\to \\sim p$ \\quad \\textbf{switch and negate}: If the ground is not wet, then it did not rain.", "And the contrapositive does both. Switch and negate: if the ground is not wet, then it did not rain.")]),
 ("True or false?", [
  ("Conditional: If it rains, the ground is wet. \\quad {\\color{fteal}\\textbf{true}}", "Now let's check which ones are true. The conditional: if it rains, the ground is wet. That's true."),
  ("Converse: If the ground is wet, it rained. \\quad {\\color{fred}\\textbf{false}} --- a sprinkler!", "The converse: if the ground is wet, then it rained. That's false. The ground could be wet because of a sprinkler. That's a counterexample."),
  ("Contrapositive: If the ground is not wet, it did not rain. \\quad {\\color{fteal}\\textbf{true}}", "The contrapositive: if the ground is not wet, then it did not rain. That's true, just like the original.")]),
 ("The rule", [
  ("\\defn{A conditional and its \\key{contrapositive} are always both true or both false. \\\\ The \\key{converse} and the \\key{inverse} also match each other --- but they may not match the original.}",
   "Here's the rule. A conditional and its contrapositive always have the same truth value: both true, or both false. The converse and the inverse match each other, but they might not match the original.")]),
 ("Biconditional", [
  ("If a conditional \\textbf{and} its converse are both true, write ``\\key{if and only if}''.", "Sometimes a conditional and its converse are both true. Then we can combine them with the words if and only if. That's called a biconditional."),
  ("An angle is right \\key{if and only if} it measures $90^\\circ$.", "For example: an angle is right if and only if it measures ninety degrees. Both directions are true. That's exactly what a good definition looks like.")]),
 ("", [
  ("``If an angle measures $30^\\circ$, then it is acute.'' \\\\ Write the \\textbf{converse}. Is it true?", "Your turn. Here's a conditional: if an angle measures thirty degrees, then it is acute. Write the converse, and decide whether it's true. Pause the video and try it.|"),
  ("Converse: If an angle is acute, then it measures $30^\\circ$. \\quad \\ans{\\text{false}} \\quad counterexample: a $50^\\circ$ angle is acute.", "The converse switches the parts: if an angle is acute, then it measures thirty degrees. That's false. A fifty degree angle is acute, but it doesn't measure thirty degrees.")], None, "turn"),
 ],
 ["Conditional $p \\to q$: \\key{converse} switches, \\key{inverse} negates, \\key{contrapositive} does both.", "A conditional and its contrapositive are both true or both false.", "Both directions true? Use ``\\key{if and only if}''."],
 "the converse switches, the inverse negates, and the contrapositive switches and negates. A conditional and its contrapositive are always both true or both false. And when both directions are true, use if and only if.")
# ---------- 2.3 ----------
DIAG = "\\begin{tikzpicture}[scale=0.9]\\draw[very thick,{Stealth}-{Stealth}] (-2.2,-0.5)--(2.2,0.5); \\draw[very thick,{Stealth}-{Stealth}] (-0.6,-1.8)--(0.6,1.8); \\fill (-1.6,-0.36) circle(2pt) node[below]{$A$} (1.6,0.36) circle(2pt) node[below right]{$B$} (-0.4,-1.2) circle(2pt) node[left]{$D$} (0.4,1.2) circle(2pt) node[left]{$C$}; \\fill[fred] (0,0) circle(2.5pt) node[below right]{$E$};\\end{tikzpicture}"
N["2-3"] = build(f"{OUT}/Geo_2-3_Postulates_Diagrams_Video_Slides.tex", "2.3 Postulates \\& Diagrams", 2, "2.3",
 "Postulates \\& Diagrams", "Rules we accept --- and what a picture really tells you", [
 ("What is a postulate?", [
  ("\\defn{A \\key{postulate} is a rule we accept as true \\textbf{without proof}. Everything else in geometry is built on postulates.}", "A postulate is a rule we accept as true without proving it. All of geometry is built on top of these basic rules.")]),
 ("Point, line and plane postulates", [
  ("\\tikz[baseline=-3pt]{\\draw[thick] (0,0)--(1.4,0); \\fill (0.2,0) circle(2pt) (1.2,0) circle(2pt);} \\ Through any \\textbf{two points} there is exactly \\key{one line}.", "Here are four of them. Through any two points, there is exactly one line."),
  ("\\tikz[baseline=-3pt]{\\fill[fteal!15] (0,-0.2)--(1.2,-0.2)--(1.5,0.3)--(0.3,0.3)--cycle; \\fill (0.3,-0.05) circle(2pt) (1.1,0) circle(2pt) (0.7,0.2) circle(2pt);} \\ Through any \\textbf{three noncollinear points} there is exactly \\key{one plane}.", "Through any three points that are not on one line, there is exactly one plane. That's why a three legged stool never wobbles."),
  ("\\tikz[baseline=-3pt]{\\draw[thick] (0,-0.25)--(1,0.25) (0,0.25)--(1,-0.25); \\fill[fred] (0.5,0) circle(2pt);} \\ Two lines meet in exactly \\key{one point}.", "If two lines meet, they meet in exactly one point."),
  ("\\tikz[baseline=-3pt]{\\fill[fteal!15] (0,-0.25)--(1.2,-0.25)--(1.4,0.15)--(0.2,0.15)--cycle; \\draw[fred,thick] (0.7,-0.25)--(0.7,0.35);} \\ Two planes meet in exactly \\key{one line}.", "And if two planes meet, they meet in exactly one line, like two walls meeting at a corner.")]),
 ("Reading a diagram", [
  ("You \\key{can} assume: $A$, $E$, $B$ are collinear \\checkmark", "Now, what can you assume from a diagram? You can assume what is drawn. Points A, E, and B are drawn on one line, so they are collinear.", ),
  ("You \\key{can} assume: the two lines meet at $E$ \\checkmark", "You can also assume the two lines meet at point E."),
  ("You \\textbf{cannot} assume: $\\angle AEC = 90^\\circ$ \\ {\\color{fred}$\\times$} \\ (no right-angle mark)", "But you cannot assume that angle Eigh E C is ninety degrees. It might look like a right angle, but there is no right angle mark."),
  ("You \\textbf{cannot} assume: $AE = EB$ \\ {\\color{fred}$\\times$} \\ (no tick marks)", "And you cannot assume that Eigh E equals E B. There are no tick marks showing equal lengths.")], DIAG),
 ("Marks tell you sizes", [
  ("\\tikz[baseline=0]{\\draw[thick] (0,0)--(1,0) (0,0)--(0,1); \\draw (0.2,0)--(0.2,0.2)--(0,0.2);} \\ right angle \\qquad \\tikz[baseline=0]{\\draw[thick] (0,0.2)--(1.2,0.2); \\draw (0.3,0.1)--(0.3,0.3) (0.9,0.1)--(0.9,0.3);} \\ equal lengths \\qquad \\tikz[baseline=0]{\\draw[thick,-{Stealth}] (0,0.4)--(1.2,0.4); \\draw[thick,-{Stealth}] (0,0)--(1.2,0); \\draw[thick] (0.5,0.3)--(0.6,0.4)--(0.5,0.5) (0.5,-0.1)--(0.6,0)--(0.5,0.1);} \\ parallel",
   "Sizes and special relationships must be marked. A little square means a right angle. Matching tick marks mean equal lengths. And matching arrows mean the lines are parallel.")]),
 ("Watch out", [
  ("\\warn{``It looks like it'' is \\textbf{not} a reason. Only what is \\textbf{drawn} (position) or \\textbf{marked} (size) counts.}", "Watch out. It looks like it is never a reason in geometry. Only what is drawn, the positions, or what is marked, the sizes, counts.")]),
 ("", [
  ("Which can you assume? \\\\ (a) $A$, $P$, $B$ are collinear \\quad (b) $PA = PB$ \\quad (c) the lines are perpendicular",
   "Your turn. Look at the diagram. Which can you assume? Eigh, P, and B are collinear. P Eigh equals P B. Or the lines are perpendicular. Pause the video and try it.|"),
  ("(a) \\ans{\\text{yes}} --- drawn on one line. \\quad (b) \\ans{\\text{yes}} --- tick marks. \\quad (c) \\ans{\\text{no}} --- no right-angle mark.", "Eigh, P, and B: yes, they are drawn on one line. P Eigh equals P B: yes, because of the tick marks. The lines are perpendicular: no. There is no right angle mark.")],
  "\\begin{tikzpicture}[scale=0.8]\\draw[very thick] (-2,0)--(2,0); \\draw[very thick] (-0.8,-1.6)--(0.8,1.6); \\fill (-1.5,0) circle(2pt) node[below]{$A$} (1.5,0) circle(2pt) node[below]{$B$} (0,0) circle(2.5pt) node[below right]{$P$}; \\draw (-0.75,-0.12)--(-0.75,0.12) (0.75,-0.12)--(0.75,0.12);\\end{tikzpicture}", "turn"),
 ],
 ["Two points $\\to$ one line; three noncollinear points $\\to$ one plane.", "Two lines meet in a point; two planes meet in a line.", "Assume what is \\key{drawn}, not sizes --- unless they are \\key{marked}."],
 "two points determine one line, and three noncollinear points determine one plane. Two lines meet in a point, and two planes meet in a line. And from a diagram, assume what is drawn, but never sizes unless they are marked.")
# ---------- 2.4 ----------
N["2-4"] = build(f"{OUT}/Geo_2-4_Algebraic_Reasoning_Video_Slides.tex", "2.4 Algebraic Reasoning", 2, "2.4",
 "Algebraic Reasoning \\& Properties", "Every step needs a reason", [
 ("Every step needs a reason", [
  ("\\defn{In geometry we don't just get the answer --- we \\key{justify} every step with a \\key{reason}: a definition, a property, a postulate or a theorem.}",
   "In geometry, getting the answer is not enough. We justify every step with a reason. A reason can be a definition, a property, a postulate, or a theorem.")]),
 ("Solve and justify", [
  ("$x - 4 = 10$ \\hfill Given", "Let's start with algebra you already know. Solve x minus four equals ten. This first line is what we were given."),
  ("$x = 14$ \\hfill Addition Property of Equality", "We add four to both sides, so x equals fourteen. The reason is the addition property of equality."),
  ("\\defn{The reason names \\textbf{what you did to both sides}.}", "See the pattern? The reason simply names what you did to both sides of the equation.")]),
 ("Properties of equality", [
  ("\\key{Addition / Subtraction}: add or subtract the same number on both sides. \\\\ \\key{Multiplication / Division}: multiply or divide both sides by the same number (not 0).",
   "Here are the properties of equality. Addition and subtraction: you can add or subtract the same number on both sides. Multiplication and division: you can multiply or divide both sides by the same number, as long as it's not zero."),
  ("\\key{Substitution}: if $a = b$, you can replace $a$ with $b$. \\\\ \\key{Distributive}: $a(b + c) = ab + ac$.", "Substitution: if a equals b, you can replace a with b anywhere. And the distributive property: a times b plus c equals a b plus a c.")]),
 ("Reflexive, symmetric, transitive", [
  ("\\key{Reflexive}: $a = a$ \\quad {\\small\\color{gray}e.g. $AB = AB$}", "Three more properties are used all the time in proofs. Reflexive: anything equals itself. Eigh B equals Eigh B."),
  ("\\key{Symmetric}: if $a = b$, then $b = a$.", "Symmetric: if a equals b, then b equals a. You can flip an equation."),
  ("\\key{Transitive}: if $a = b$ and $b = c$, then $a = c$.", "Transitive: if a equals b, and b equals c, then a equals c. Like a chain.")]),
 ("A longer example", [
  ("$3(x + 2) = 21$ \\hfill Given", "Let's solve three times x plus two equals twenty one, with a reason for every line. Line one is given."),
  ("$3x + 6 = 21$ \\hfill Distributive Property", "Multiply out the parentheses: three x plus six equals twenty one. That's the distributive property."),
  ("$3x = 15$ \\hfill Subtraction Property of Equality", "Subtract six from both sides: three x equals fifteen. Subtraction property of equality."),
  ("$x = 5$ \\hfill Division Property of Equality", "Divide both sides by three: x equals five. Division property of equality.")]),
 ("", [
  ("Name the property. \\\\ (a) If $AB = CD$, then $CD = AB$. \\qquad (b) If $m\\angle 1 = m\\angle 2$ and $m\\angle 2 = m\\angle 3$, then $m\\angle 1 = m\\angle 3$.",
   "Your turn. Name the property. First: if Eigh B equals C D, then C D equals Eigh B. Second: if angle one equals angle two, and angle two equals angle three, then angle one equals angle three. Pause the video and try it.|"),
  ("(a) \\ans{\\text{Symmetric}} --- the equation is flipped. \\qquad (b) \\ans{\\text{Transitive}} --- a chain.", "The first one is symmetric, because the equation is just flipped. The second one is transitive, because it's a chain: one equals two, two equals three, so one equals three.")], None, "turn"),
 ],
 ["Every step needs a \\key{reason}.", "Did something to both sides? Name that property of equality.", "\\key{Reflexive} $a = a$, \\key{symmetric} flip, \\key{transitive} chain."],
 "every step needs a reason. If you did something to both sides, name that property of equality. Reflexive means anything equals itself, symmetric means flip it, and transitive means a chain.")
# ---------- 2.5 ----------
SEGFIG = "\\begin{tikzpicture}\\draw[very thick] (0,0)--(4.2,0); \\foreach \\x/\\l in {0/A,1.2/B,3/C,4.2/D} \\fill (\\x,0) circle(2.5pt) node[below]{$\\l$};\\end{tikzpicture}"
N["2-5"] = build(f"{OUT}/Geo_2-5_Two_Column_Proofs_Video_Slides.tex", "2.5 Two-Column Proofs", 2, "2.5",
 "Two-Column Proofs", "Statements on the left, reasons on the right", [
 ("What a two-column proof looks like", [
  ("\\begin{tabular}{l|l}\\textbf{Statements} & \\textbf{Reasons}\\\\ \\hline 1.\\ \\ldots\\ (given) & Given\\\\ 2.\\ \\ldots & a property, definition, \\ldots\\\\ \\ldots\\ (what you must prove) & \\ldots\\end{tabular}",
   "A two column proof has statements on the left, and the reason for each statement on the right."),
  ("\\defn{Start with what is \\key{given}. End with what you must \\key{prove}. Every line must follow from the lines above it.}", "Three rules. Start with what is given. End with what you have to prove. And every line has to follow from the lines above it.")]),
 ("An algebra proof", [
  ("Given: $2x + 5 = 13$ \\qquad Prove: $x = 4$", "Let's do one. Given: two x plus five equals thirteen. Prove: x equals four. Always read where you start and where you have to end."),
  ("1.\\ $2x + 5 = 13$ \\hfill Given", "Line one is always the given information. Two x plus five equals thirteen. Reason: given."),
  ("2.\\ $2x = 8$ \\hfill Subtraction Property of Equality", "Line two: subtract five from both sides. Two x equals eight. Reason: subtraction property of equality."),
  ("3.\\ $x = 4$ \\hfill Division Property of Equality", "Line three: divide both sides by two. x equals four. Reason: division property of equality. And that's exactly what we had to prove.")]),
 ("A geometry proof", [
  ("Given: $AB = CD$ \\qquad Prove: $AC = BD$", "Now a geometry proof. Points Eigh, B, C, D are on a line, in that order. Given: Eigh B equals C D. Prove: Eigh C equals B D."),
  ("1.\\ $AB = CD$ \\hfill Given \\\\ 2.\\ $BC = BC$ \\hfill Reflexive Property", "Line one: Eigh B equals C D, given. Line two: B C equals B C. That's the reflexive property. It looks silly, but we need it."),
  ("3.\\ $AB + BC = BC + CD$ \\hfill Addition Property of Equality", "Line three: add B C to both sides. Eigh B plus B C equals B C plus C D. Addition property of equality."),
  ("4.\\ $AB + BC = AC$, \\ $BC + CD = BD$ \\hfill Segment Addition Postulate", "Line four: by the segment addition postulate, Eigh B plus B C is Eigh C, and B C plus C D is B D."),
  ("5.\\ $AC = BD$ \\hfill Substitution Property", "Line five: substitute into line three, and Eigh C equals B D. Reason: substitution. Done!")], SEGFIG),
 ("Watch out", [
  ("\\warn{A reason must be a \\textbf{given}, a \\textbf{definition}, a \\textbf{property}, a \\textbf{postulate} or a \\textbf{theorem} --- never ``it looks like it'' or ``I calculated it''.}", "Watch out. A reason must be a given, a definition, a property, a postulate, or a theorem. It is never because it looks like it, or because I calculated it.")]),
 ("", [
  ("Given: $5x - 2 = 18$ \\quad Prove: $x = 4$ \\\\ 1.\\ $5x - 2 = 18$ \\ Given \\quad 2.\\ $5x = 20$ \\ \\underline{\\ ?\\ } \\quad 3.\\ $x = 4$ \\ \\underline{\\ ?\\ }",
   "Your turn. Given: five x minus two equals eighteen. Prove: x equals four. Line one is given. Line two: five x equals twenty. Line three: x equals four. Fill in the two missing reasons. Pause the video and try it.|"),
  ("2.\\ \\ans{\\text{Addition Property of Equality}} \\quad 3.\\ \\ans{\\text{Division Property of Equality}}", "Line two: we added two to both sides, so the reason is the addition property of equality. Line three: we divided both sides by five, so it's the division property of equality.")], None, "turn"),
 ],
 ["\\key{Statements} on the left, \\key{reasons} on the right.", "Start with the \\key{given}; end with what you must \\key{prove}.", "Every reason is a given, definition, property, postulate or theorem."],
 "statements go on the left and reasons on the right. Start with the given, and end with what you must prove. And every reason is a given, a definition, a property, a postulate, or a theorem.")
# ---------- 2.6 ----------
VFIG = "\\begin{tikzpicture}[scale=0.9]\\draw[very thick] (-2,-0.73)--(2,0.73); \\draw[very thick] (-2,0.73)--(2,-0.73); \\node at (0.85,0){$1$}; \\node at (0,0.5){$2$}; \\node at (-0.85,0){$3$}; \\node at (0,-0.5){$4$};\\end{tikzpicture}"
N["2-6"] = build(f"{OUT}/Geo_2-6_Proving_Angles_Video_Slides.tex", "2.6 Proving Angle Relationships", 2, "2.6",
 "Proving Angle Relationships", "Four facts you can use as reasons", [
 ("Four facts you can use", [
  ("\\key{Linear Pair Postulate}: a linear pair is supplementary (adds to $180^\\circ$).", "Here are four facts you can use as reasons in proofs. The linear pair postulate: two angles that form a linear pair are supplementary. They add to one hundred eighty degrees."),
  ("\\key{Vertical Angles Congruence Theorem}: vertical angles are congruent.", "The vertical angles congruence theorem: vertical angles are congruent."),
  ("\\key{Right Angles Congruence Theorem}: all right angles are congruent.", "The right angles congruence theorem: all right angles are congruent."),
  ("\\key{Congruent Supplements / Complements}: two angles supplementary (or complementary) to the \\textbf{same} angle are congruent.", "And the congruent supplements and complements theorems: if two angles are both supplementary to the same angle, they are congruent. The same is true for complementary angles.")]),
 ("Why vertical angles are congruent", [
  ("$m\\angle 1 + m\\angle 2 = 180^\\circ$ \\hfill Linear Pair Postulate", "Let's prove that vertical angles are congruent. Angles one and two form a linear pair, so they add to one eighty. Linear pair postulate."),
  ("$m\\angle 3 + m\\angle 2 = 180^\\circ$ \\hfill Linear Pair Postulate", "Angles three and two also form a linear pair, so they also add to one eighty."),
  ("$\\angle 1 \\cong \\angle 3$ \\hfill Congruent Supplements Theorem", "So angle one and angle three are both supplementary to angle two. By the congruent supplements theorem, angle one is congruent to angle three."),
  ("\\defn{So vertical angles are congruent --- that's the whole proof.}", "And angles one and three are vertical angles. So we just proved the vertical angles congruence theorem.")], VFIG),
 ("Use it to find angles", [
  ("$m\\angle 1 = 3x + 10$, \\quad $m\\angle 3 = 5x - 30$", "Now let's use it. Angle one is three x plus ten, and angle three, its vertical angle, is five x minus thirty."),
  ("Vertical angles are congruent: $3x + 10 = 5x - 30 \\Rightarrow 40 = 2x \\Rightarrow x = 20$", "Vertical angles are congruent, so set them equal. Three x plus ten equals five x minus thirty. So forty equals two x, and x equals twenty."),
  ("$m\\angle 1 = 3(20) + 10 = \\ans{70^\\circ}$, \\quad $m\\angle 2 = 180 - 70 = \\ans{110^\\circ}$", "Angle one is three times twenty plus ten, which is seventy degrees. And angle two forms a linear pair with angle one, so it's one eighty minus seventy, which is one hundred ten degrees.")], VFIG),
 ("Watch out", [
  ("\\warn{Vertical angles are \\textbf{across} from each other --- they are equal. Angles \\textbf{next to} each other on a line are a linear pair --- they add to $180^\\circ$, they are not equal.}", "Watch out. Vertical angles are across from each other, and they are equal. Angles next to each other on a line are a linear pair. They add up to one hundred eighty. They are not equal.")]),
 ("", [
  ("$\\angle A$ and $\\angle B$ are both supplementary to $\\angle C$. \\\\ $m\\angle A = 2x + 15$, \\quad $m\\angle B = 3x - 5$. \\ Find $x$ and $m\\angle A$.",
   "Your turn. Angle Eigh and angle B are both supplementary to angle C. Angle Eigh is two x plus fifteen, and angle B is three x minus five. Find x, and find angle Eigh. Pause the video and try it.|"),
  ("Congruent Supplements: $2x + 15 = 3x - 5 \\Rightarrow x = \\ans{20}$, \\quad $m\\angle A = \\ans{55^\\circ}$", "They are supplementary to the same angle, so they are congruent. Two x plus fifteen equals three x minus five, so x equals twenty. Then angle Eigh is two times twenty plus fifteen, which is fifty five degrees.")], None, "turn"),
 ],
 ["Linear pair: adds to $180^\\circ$. \\ Vertical angles: congruent.", "All right angles are congruent.", "Supplementary (or complementary) to the \\textbf{same} angle $\\Rightarrow$ congruent."],
 "a linear pair adds to one eighty, and vertical angles are congruent. All right angles are congruent. And two angles that are supplementary, or complementary, to the same angle are congruent.")
import json; json.dump(N, open(os.path.join(os.path.dirname(__file__), "narration_geo_ch2.json"), "w"), indent=1)
print({k: len(v) for k, v in N.items()})

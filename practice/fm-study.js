/* =====================================================================
   PROF. FANG MATH — "HOW TO STUDY THIS CHAPTER" (Algebra 1, Algebra 2,
   Precalculus levels pages)
   Adds, for the open chapter:
     • a route strip above the Learn / Practice tabs
       (How to study → Lessons → Practice at your level → Ready for the test?)
     • a "How to study this chapter" card at the top of the Learn tab
       (steps, what to memorize and how, what to understand)
     • a "Ready for the test?" card at the top of the Practice tab
       (common traps + a checklist the student ticks)
   Data is keyed by page (algebra1 / algebra2 / precalculus) and chapter id.
   ===================================================================== */
(function () {
  const PAGE = (location.pathname.match(/([a-z0-9]+)-levels\.html/) || [])[1];

  const css = `
  .fms{background:#fff;border:1.5px solid var(--teal);border-radius:var(--radius);margin:0 0 18px;box-shadow:var(--shadow);overflow:hidden}
  .fms>summary{list-style:none;cursor:pointer;padding:14px 20px;display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,#E6F4F2,#fff 70%)}
  .fms>summary::-webkit-details-marker{display:none}
  .fms>summary b{font-family:Fraunces,Georgia,serif;font-size:20px;font-weight:600}
  .fms>summary span{font-size:14px;color:var(--muted)}
  .fms>summary i{margin-left:auto;font-style:normal;color:var(--faint);transition:transform .2s}
  .fms[open]>summary i{transform:rotate(90deg)}
  .fms .wb{padding:6px 20px 20px}
  .fms h4{font-family:Fraunces,Georgia,serif;font-size:18px;margin:16px 0 8px;font-weight:600}
  .fms ol.ssteps{margin:4px 0 0;padding-left:22px;font-size:15px;line-height:1.65}
  .fms .smem{display:grid;gap:8px} .fms .smem>div{border:1px solid var(--line);border-radius:12px;padding:9px 13px;background:#fff;font-size:15px} .fms .smem .x{color:var(--muted);font-size:14px;margin-top:3px}
  .fms .howmem{background:var(--teal-soft);border-radius:12px;padding:10px 14px;margin:10px 0 0;font-size:14.5px}
  .fms ul.sund{margin:4px 0 0;padding-left:22px;font-size:15px;line-height:1.6}
  .fms .vocab{display:flex;flex-wrap:wrap;gap:8px}
  .fms .vocab label{display:flex;align-items:center;gap:6px;border:1px solid var(--line);border-radius:999px;padding:6px 12px;font-size:14px;cursor:pointer;background:#fff}
  .fms .vocab label:has(input:checked){background:var(--teal-soft);border-color:var(--teal)}
  .fms .vocab input{accent-color:var(--teal)}
  .fms.ready{border-color:var(--green,#2E7D32)} .fms.ready>summary{background:linear-gradient(135deg,#EAF5EA,#fff 70%)}
  .chroute{background:#fff;border:1px solid var(--line);border-radius:16px;padding:12px 14px;margin:0 0 14px;box-shadow:var(--shadow)}
  .chroute .rk{font-size:14px;color:var(--ink);margin-bottom:8px} .chroute .rk span{color:var(--muted)}
  .chroute .rs{display:flex;flex-wrap:wrap;align-items:center;gap:6px} .chroute .rs>span{color:var(--faint)}
  .chroute button{display:flex;align-items:center;gap:7px;border:1px solid var(--line);background:var(--bg);border-radius:999px;padding:6px 12px 6px 6px;font:inherit;font-size:13.5px;font-weight:600;color:var(--ink);cursor:pointer}
  .chroute button:hover{border-color:var(--teal);background:var(--teal-soft)}
  .chroute button i{font-style:normal;width:22px;height:22px;border-radius:50%;background:var(--navy);color:#fff;display:grid;place-items:center;font-size:12px}
  `;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const HOWMEM = "<b>How to memorize with understanding:</b> ① picture it or try a tiny example → ② say <i>why</i> it's true → ③ cover it and write it from memory → ④ review on day 1, 3 and 7 (the Mistake Log does this for missed problems).";

  /* kind, why, steps[], mem[[fact, tip]], und[], traps[], ready[] */
  const D = {};

  /* ------------------------------ ALGEBRA 1 ------------------------------ */
  D.algebra1 = {
    ch1: { kind: "Build habits — almost nothing to memorize", why: "Every later chapter is built from these moves. Sloppy order of operations or signs here causes most mistakes later.",
      steps: ["Watch each lesson's example step by step. Say out loud what happens first and why.", "Redo the example on paper without looking.", "Practice at your level; slow down on negatives.", "Log every miss in the Mistake Log and redo it in 3 days."],
      mem: [["Order: grouping → exponents → × and ÷ (left to right) → + and − (left to right)", "Multiplication does <b>not</b> always come before division — they're a tie, so go left to right."], ["$a(b + c) = ab + ac$", "Picture a rectangle $a$ tall split into widths $b$ and $c$."]],
      und: ["Why $-3^2 = -9$ but $(-3)^2 = 9$", "Why only <b>like terms</b> combine ($3x + 2x = 5x$, but $3x + 2y$ stays)"],
      traps: ["Distributing only to the first term: $-2(x - 4) \\ne -2x - 8$", "Squaring a negative without parentheses"],
      ready: ["I can evaluate an expression with negatives correctly", "I distribute to <b>every</b> term, including the sign", "I combine only like terms"] },
    ch2: { kind: "Understand balance, then practice", why: "Solving equations is the main skill of Algebra 1 — every later topic uses it.",
      steps: ["Think of an equation as a balance scale: whatever you do to one side, do to the other.", "Watch the lessons in order: one/two-step, multi-step, variables on both sides.", "Write one step per line — never skip.", "Check every answer by substituting it back."],
      mem: [["Undo in reverse order: last operation done is the first one undone", "Getting dressed: socks then shoes; undressing: shoes then socks."]],
      und: ["Why an equation can have no solution ($0 = 5$) or infinitely many ($0 = 0$)", "How to solve for a letter in a formula (literal equations) — same moves"],
      traps: ["Doing something to one side only", "Losing a negative when you divide"],
      ready: ["I solve multi-step equations and check by substituting", "I recognize no-solution and all-real-numbers cases", "I can solve $A = lw$ for $w$"] },
    ch3: { kind: "Same as equations — plus one rule", why: "Inequalities describe ranges: speed limits, budgets, scores you need.",
      steps: ["Solve like an equation.", "Pay attention every time you multiply or divide by a negative.", "Graph the answer on a number line and test one point.", "Practice compound and absolute value inequalities last."],
      mem: [["Multiply or divide by a negative → flip the sign", "$-1 < 2$, but $1 > -2$: multiplying by $-1$ flips the order."], ["$|x| < a$ → AND (between); $|x| > a$ → OR (outside)", "Less th<b>AND</b>; great<b>OR</b>."]],
      und: ["Why open vs. closed circles", "Why “AND” is the overlap and “OR” is everything in either"],
      traps: ["Forgetting to flip the sign", "Writing $|x| > 3$ as $-3 < x < 3$"],
      ready: ["I flip the sign when needed — and only then", "I can graph and test my answer", "I can solve absolute value inequalities"] },
    ch4: { kind: "Understand the idea of a function", why: "Functions are the language of all higher math: an input goes in, exactly one output comes out.",
      steps: ["Think of a function as a machine: input → rule → output.", "Practice reading $f(3)$ as “the output when the input is $3$.”", "For domain and range, look at the graph: left–right is domain, down–up is range.", "Write functions from real situations."],
      mem: [["Function: each input has <b>exactly one</b> output", "Vertical line test: a vertical line hits the graph at most once."]],
      und: ["Why $f(x)$ does not mean $f \\cdot x$", "Domain = allowed inputs; range = outputs you get"],
      traps: ["Mixing up $f(2)$ (input $2$) and $f(x) = 2$ (output $2$)", "Swapping domain and range"],
      ready: ["I can evaluate $f(a + 1)$", "I can tell if a relation is a function", "I can state domain and range from a graph"] },
    ch5: { kind: "Understand slope as a rate", why: "Slope is the most-used idea in algebra: speed, price per item, growth per year.",
      steps: ["Picture slope as stairs: rise over run.", "Find slope from two points, then from a graph.", "Read $y = mx + b$: $m$ is the steepness, $b$ is where it starts.", "Graph lines from the equation by starting at $b$ and stepping $m$."],
      mem: [["$m = \\dfrac{y_2 - y_1}{x_2 - x_1}$", "“Rise over run”: up–down change over left–right change."], ["$y = mx + b$", "$b$ = <b>b</b>eginning (the $y$-intercept)."]],
      und: ["Positive, negative, zero, undefined slope — what each looks like", "Why the $x$-intercept is where $y = 0$"],
      traps: ["Putting $x$ on top", "Subtracting in different orders on top and bottom"],
      ready: ["I find slope from two points without mistakes", "I graph $y = mx + b$ quickly", "I can explain slope in a word problem (units!)"] },
    ch6: { kind: "Practice the recipe", why: "Writing the equation of a line turns a situation into a model you can use.",
      steps: ["Recipe: find the slope, then use a point to find $b$.", "Learn point-slope form as a shortcut.", "Convert between slope-intercept and standard form.", "Use parallel (same slope) and perpendicular (negative reciprocal) lines."],
      mem: [["Point-slope: $y - y_1 = m(x - x_1)$", "It's just the slope formula with the denominator multiplied over."], ["Horizontal: $y = k$; vertical: $x = k$", "A horizontal line keeps the same $y$."]],
      und: ["Why parallel lines have equal slopes", "What slope and intercept mean in a real model"],
      traps: ["Sign errors in $y - y_1$ when $y_1$ is negative", "Mixing up $x = 3$ and $y = 3$"],
      ready: ["I can write a line from a point and slope, and from two points", "I can write parallel and perpendicular lines", "I can build a linear model from a story"] },
    ch7: { kind: "Learn three methods, choose wisely", why: "Systems answer “when are two things equal?” — two phone plans, two runners.",
      steps: ["Graph first, to see what a solution means (the crossing point).", "Learn substitution, then elimination.", "Decide which method fits before you start.", "Check your answer in <b>both</b> equations."],
      mem: [["Same slope, different intercept → no solution; same line → infinitely many", "Parallel lines never cross; the same line crosses everywhere."]],
      und: ["Why the solution is an ordered pair", "When elimination is faster than substitution"],
      traps: ["Checking in only one equation", "Forgetting to multiply <b>every</b> term when scaling an equation"],
      ready: ["I can solve by substitution and by elimination", "I can tell how many solutions without solving", "I can set up a system from a word problem"] },
    ch8: { kind: "Understand why each rule works", why: "Exponent rules make huge and tiny numbers manageable and lead to exponential growth.",
      steps: ["For each rule, write it out the long way once: $x^2 \\cdot x^3 = x \\cdot x \\cdot x \\cdot x \\cdot x$.", "Then use the shortcut.", "Practice zero and negative exponents as patterns.", "Finish with scientific notation and growth/decay."],
      mem: [["$x^a x^b = x^{a+b}$, $\\dfrac{x^a}{x^b} = x^{a-b}$, $(x^a)^b = x^{ab}$", "Multiply → add exponents; power of a power → multiply."], ["$x^0 = 1$, $x^{-n} = \\dfrac{1}{x^n}$", "Pattern: $2^2 = 4$, $2^1 = 2$, $2^0 = 1$, $2^{-1} = \\tfrac12$ — divide by $2$ each step."]],
      und: ["Why $x^0 = 1$ (the pattern)", "Why a negative exponent means a reciprocal, not a negative number"],
      traps: ["$(x^3)^2 = x^5$ (it's $x^6$)", "$2^{-3} = -8$ (it's $\\tfrac18$)"],
      ready: ["I simplify expressions with all the rules", "I convert to and from scientific notation", "I tell growth from decay"] },
    ch9: { kind: "Practice — combine like terms carefully", why: "Polynomial operations are the arithmetic of algebra.",
      steps: ["Add/subtract: line up like terms.", "Multiply: use the area (box) method until FOIL is automatic.", "Learn the special products.", "Divide by a monomial, then try long division."],
      mem: [["$(a + b)^2 = a^2 + 2ab + b^2$", "Draw the square: two squares plus <b>two</b> rectangles."], ["$(a + b)(a - b) = a^2 - b^2$", "The middle terms cancel."]],
      und: ["Why $(x + 3)^2 \\ne x^2 + 9$", "Why subtracting a polynomial changes <b>every</b> sign"],
      traps: ["Forgetting the middle term when squaring", "Distributing the minus to only the first term"],
      ready: ["I multiply binomials with no missed terms", "I know the special products", "I subtract polynomials correctly"] },
    ch10: { kind: "Practice patterns until they're automatic", why: "Factoring is multiplying backwards — the key to solving quadratics.",
      steps: ["Always check for a GCF first.", "For $x^2 + bx + c$: find two numbers that multiply to $c$ and add to $b$.", "Recognize difference of squares and perfect squares.", "Use grouping (or the $ac$ method) when $a \\ne 1$.", "Check by multiplying back."],
      mem: [["$a^2 - b^2 = (a + b)(a - b)$", "No middle term? Look for two perfect squares."], ["Signs: $c > 0$ → same signs; $c < 0$ → opposite signs", "A positive product comes from two of the same sign."]],
      und: ["Factoring = undoing multiplication", "Why $x^2 + 9$ doesn't factor over the reals"],
      traps: ["Skipping the GCF", "Not checking by multiplying back"],
      ready: ["I always take out the GCF first", "I factor $x^2 + bx + c$ and $ax^2 + bx + c$", "I check every factorization"] },
    ch11: { kind: "Understand the graph, memorize one formula", why: "Quadratics model anything thrown, launched or optimized.",
      steps: ["Solve by factoring, then square roots, then the quadratic formula.", "Graph: find the vertex, axis of symmetry and intercepts.", "Learn completing the square and the discriminant last."],
      mem: [["$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$", "Sing it (to “Pop Goes the Weasel”) and write it 3 times from memory."], ["Vertex: $x = -\\dfrac{b}{2a}$", "It's the part of the formula before the $\\pm$."], ["Discriminant $b^2 - 4ac$: $> 0$ two, $= 0$ one, $< 0$ no real solutions", "It's what's under the square root."]],
      und: ["Why solutions are the $x$-intercepts", "Why a parabola is symmetric"],
      traps: ["Forgetting $\\pm$", "Using $-b^2$ instead of $b^2$ when $b$ is negative"],
      ready: ["I choose the fastest method", "I graph a parabola from its equation", "I use the discriminant to count solutions"] },
    ch12: { kind: "Mix of rules and review", why: "Radicals and rational expressions tie everything together; the capstone uses it all.",
      steps: ["Simplify radicals with perfect-square factors.", "Treat rational expressions like fractions: factor first, then cancel.", "Find excluded values before you cancel.", "Use the capstone problems to review the whole year."],
      mem: [["$\\sqrt{ab} = \\sqrt a \\sqrt b$", "Pull out perfect squares: $\\sqrt{50} = 5\\sqrt2$."], ["$a^2 + b^2 = c^2$", "$c$ is the hypotenuse, across from the right angle."]],
      und: ["Why you may cancel factors but not terms", "Why excluded values matter (no dividing by zero)"],
      traps: ["$\\sqrt{a + b} = \\sqrt a + \\sqrt b$ (false)", "Cancelling terms: $\\dfrac{x + 2}{x} \\ne 2$"],
      ready: ["I simplify radicals completely", "I simplify and solve rational expressions/equations", "I use the Pythagorean Theorem in word problems"] }
  };

  /* ------------------------------ ALGEBRA 2 ------------------------------ */
  D.algebra2 = {
    ch1: { kind: "Review fast, fix gaps", why: "Algebra 2 moves quickly. This chapter makes sure equations and absolute value are solid.",
      steps: ["Do Level 3 first. If it's easy, move up; if not, review Levels 1–2.", "Solve literal equations as if the letters were numbers.", "For absolute value, split into two cases and check both."],
      mem: [["$|x| = a$ → $x = a$ or $x = -a$ (if $a \\ge 0$)", "Distance from $0$ is $a$: two places on the number line."]],
      und: ["Why an absolute value equation can have no solution", "Why you must check for extraneous answers"],
      traps: ["Only solving the positive case", "Sign errors in literal equations"],
      ready: ["I solve absolute value equations and inequalities", "I solve a formula for any variable"] },
    ch2: { kind: "Understand transformations — memorize one pattern", why: "Every function family in Algebra 2 moves and stretches the same way.",
      steps: ["Learn the parent graphs: line, absolute value, parabola.", "Practice one change at a time: shift, then stretch, then reflect.", "Then combine them."],
      mem: [["$y = a f(x - h) + k$", "Inside the parentheses = horizontal and <b>opposite</b>; outside = vertical and as written."]],
      und: ["Why $f(x - 3)$ moves right, not left", "Direct variation $y = kx$ goes through the origin"],
      traps: ["Moving the wrong way for $h$", "Forgetting that $a < 0$ reflects"],
      ready: ["I sketch $y = -2|x - 1| + 3$ without a calculator", "I identify domain and range"] },
    ch3: { kind: "Practice methods, understand regions", why: "Systems with three variables and linear programming solve real optimization problems.",
      steps: ["Review two-variable systems.", "Graph inequalities: boundary line, then shade a test point.", "Linear programming: graph, find corners, test each corner.", "Three variables: eliminate the same variable twice."],
      mem: [["The max/min of a linear objective is at a <b>corner</b> of the region", "Check every vertex — the answer is always one of them."]],
      und: ["Why dashed vs. solid boundary", "Why you eliminate down to two equations"],
      traps: ["Shading the wrong side", "Missing a corner point"],
      ready: ["I solve 3×3 systems", "I graph a feasible region and optimize"] },
    ch4: { kind: "Understand forms; memorize the formula", why: "Quadratics appear everywhere; complex numbers finish the story when there's no real solution.",
      steps: ["Switch between standard, vertex and factored form.", "Solve with every method; choose the fastest.", "Learn $i$ and arithmetic with complex numbers."],
      mem: [["Vertex form $y = a(x - h)^2 + k$, vertex $(h, k)$", "Same $h$-is-opposite rule as transformations."], ["$i^2 = -1$; powers of $i$ cycle $i, -1, -i, 1$", "Divide the exponent by $4$ and use the remainder."]],
      und: ["What the discriminant tells you", "Why complex solutions come in conjugate pairs"],
      traps: ["$\\sqrt{-9} = -3$ (it's $3i$)", "Sign of $h$ in vertex form"],
      ready: ["I convert between forms", "I solve any quadratic, including complex solutions", "I simplify powers of $i$"] },
    ch5: { kind: "Understand end behavior and zeros", why: "Polynomials model curves with several turns; their zeros tell the whole story.",
      steps: ["End behavior from the leading term.", "Synthetic division, then Remainder and Factor Theorems.", "Find all zeros: rational root test → divide → solve the quadratic."],
      mem: [["Remainder Theorem: $P(a)$ = remainder of $P(x) \\div (x - a)$", "Quick check: plug $a$ in instead of dividing."], ["Vieta: sum of roots $= -\\dfrac{b}{a}$, product (quadratic) $= \\dfrac{c}{a}$", "Expand $(x - r)(x - s)$ to see why."]],
      und: ["Why degree $n$ means $n$ zeros (counting complex and repeated)", "Multiplicity: even bounces, odd crosses"],
      traps: ["Missing a zero coefficient in synthetic division", "Sign of $a$ in $(x - a)$"],
      ready: ["I describe end behavior", "I divide polynomials", "I find all zeros"] },
    ch6: { kind: "Understand roots as exponents", why: "Rational exponents connect roots and powers; inverses undo functions.",
      steps: ["Rewrite roots as exponents and back.", "Solve radical equations: isolate, raise to a power, <b>check</b>.", "Compose functions and find inverses by swapping $x$ and $y$."],
      mem: [["$a^{m/n} = \\sqrt[n]{a^m}$", "Denominator = the root (it's “under”)."]],
      und: ["Why squaring both sides can create extraneous solutions", "Why an inverse reflects over $y = x$"],
      traps: ["Not checking radical equations", "$(f \\circ g)(x)$ order: $g$ first"],
      ready: ["I simplify rational exponents", "I solve and check radical equations", "I find an inverse and test it"] },
    ch7: { kind: "Understand logs as exponents", why: "Exponentials model growth and decay; logs are how you solve for the exponent.",
      steps: ["Exponential models: growth vs. decay, compound interest.", "Read $\\log_b x$ as “the exponent on $b$ that gives $x$.”", "Use the log properties.", "Solve equations by taking logs of both sides."],
      mem: [["$\\log_b x = y \\iff b^y = x$", "“The log IS the exponent.”"], ["$\\log(MN) = \\log M + \\log N$, $\\log M^k = k \\log M$", "They're the exponent rules in disguise."]],
      und: ["Why $\\log$ of a negative is undefined", "Why $e$ appears in continuous growth"],
      traps: ["$\\log(M + N) = \\log M + \\log N$ (false)", "Mixing up growth factor $1 + r$ and rate $r$"],
      ready: ["I convert between log and exponential form", "I use all three log properties", "I solve exponential and log equations"] },
    ch8: { kind: "Understand asymptotes; practice fractions", why: "Rational functions model rates, averages and inverse relationships.",
      steps: ["Inverse and joint variation.", "Graph: find holes, vertical and horizontal asymptotes.", "Simplify, add and solve rational expressions — factor first, check excluded values."],
      mem: [["Horizontal asymptote: compare degrees (bottom bigger → $y = 0$; equal → ratio of leading coefficients; top bigger → none)", "Think about huge $x$: which part wins?"]],
      und: ["Hole vs. vertical asymptote (does the factor cancel?)", "Why solutions that make a denominator $0$ are thrown out"],
      traps: ["Calling a hole an asymptote", "Forgetting the LCD on every term"],
      ready: ["I find holes and asymptotes", "I solve rational equations and check"] },
    ch9: { kind: "Understand two patterns", why: "Sequences and series model savings, loans and repeating decimals.",
      steps: ["Arithmetic: add the same $d$. Geometric: multiply by the same $r$.", "Write explicit formulas.", "Sum formulas; sigma notation.", "Infinite geometric series when $|r| < 1$."],
      mem: [["$a_n = a_1 + (n - 1)d$; $a_n = a_1 r^{n-1}$", "$n - 1$ steps from the first term to the $n$th."], ["$S_\\infty = \\dfrac{a_1}{1 - r}$, $|r| < 1$", "Only shrinking terms can add to a finite number."]],
      und: ["Why the arithmetic sum is (first + last)/2 × $n$ (pair them up)", "Why $0.\\overline{3} = \\tfrac13$"],
      traps: ["Using $n$ instead of $n - 1$", "Using the infinite sum when $|r| \\ge 1$"],
      ready: ["I identify and write both kinds of sequences", "I use the sum formulas and sigma notation"] },
    ch10: { kind: "Memorize standard forms; understand the shapes", why: "Conics describe orbits, satellite dishes and whispering galleries.",
      steps: ["Parabola: focus and directrix.", "Circle: center and radius (complete the square).", "Ellipse and hyperbola: find $a$, $b$, $c$."],
      mem: [["Circle $(x - h)^2 + (y - k)^2 = r^2$", "It's the distance formula."], ["Ellipse $c^2 = a^2 - b^2$; hyperbola $c^2 = a^2 + b^2$", "Hyperbola is “plus” (bigger $c$, foci outside)."]],
      und: ["Each conic is a set of points with a distance rule", "Why completing the square reveals the center"],
      traps: ["Sign of $h$ and $k$", "Using $r^2$ as the radius"],
      ready: ["I identify any conic from its equation", "I find center, radius, foci and vertices"] },
    ch11: { kind: "Understand counting; practice data", why: "Probability and statistics are used in every science and in daily decisions.",
      steps: ["Counting: permutations vs. combinations.", "Statistics: center, spread, normal distribution.", "Conditional probability and expected value."],
      mem: [["$_nP_r = \\dfrac{n!}{(n - r)!}$, $_nC_r = \\dfrac{n!}{r!(n - r)!}$", "Combinations divide out the $r!$ orders."], ["Normal: 68–95–99.7", "Within 1, 2, 3 standard deviations."]],
      und: ["When order matters", "Expected value is a long-run average"],
      traps: ["Using permutations when order doesn't matter", "$P(A \\mid B)$ vs. $P(B \\mid A)$"],
      ready: ["I choose the right counting method", "I use the 68–95–99.7 rule", "I compute expected value"] },
    ch12: { kind: "Practice the procedures", why: "Matrices organize data and solve systems with one operation.",
      steps: ["Add, subtract, multiply by a scalar.", "Matrix multiplication: row × column.", "Determinants and inverses; solve $AX = B$."],
      mem: [["$\\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc$", "Down-diagonal minus up-diagonal."], ["$A^{-1} = \\dfrac{1}{ad - bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$", "Swap $a$ and $d$, negate $b$ and $c$, divide by the determinant."]],
      und: ["Why $AB \\ne BA$ in general", "When an inverse doesn't exist ($\\det = 0$)"],
      traps: ["Multiplying matrices with mismatched sizes", "Forgetting to divide by the determinant"],
      ready: ["I multiply matrices", "I find a 2×2 inverse and use it to solve a system"] },
    ch13: { kind: "Memorize the unit circle with understanding", why: "Trig functions describe anything that repeats: waves, tides, sound.",
      steps: ["Convert degrees ↔ radians.", "Build the unit circle from the 30-60-90 and 45-45-90 triangles.", "Graph sine and cosine: amplitude, period, shifts."],
      mem: [["$\\pi$ rad $= 180^\\circ$", "Half a circle."], ["Unit circle: $(\\cos\\theta, \\sin\\theta)$", "Alphabetical: $x$ before $y$, $c$ before $s$."], ["Period $= \\dfrac{2\\pi}{b}$", "A bigger $b$ squeezes the wave."]],
      und: ["Why $\\sin^2 + \\cos^2 = 1$ (Pythagoras on the unit circle)", "Signs in each quadrant"],
      traps: ["Calculator in the wrong mode", "Mixing up amplitude and period"],
      ready: ["I fill in the unit circle from memory", "I graph $y = a\\sin(bx)$"] },
    ch14: { kind: "Understand identities, practice solving", why: "Identities simplify trig expressions; equations find angles.",
      steps: ["Verify identities: work on one side only.", "Solve trig equations: isolate, find reference angles, list all solutions.", "Law of Sines, Law of Cosines, sum formulas."],
      mem: [["$\\sin^2\\theta + \\cos^2\\theta = 1$", "Divide by $\\cos^2$ or $\\sin^2$ to get the other two."], ["$\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B$", "Sine mixes: sin-cos, cos-sin, same sign."]],
      und: ["Why trig equations have infinitely many solutions", "When to use Law of Sines vs. Cosines"],
      traps: ["Dividing by $\\sin x$ and losing solutions", "Giving only one angle in $[0, 2\\pi)$"],
      ready: ["I verify basic identities", "I find all solutions in an interval", "I use the sum formulas"] }
  };

  /* ------------------------------ PRECALCULUS ------------------------------ */
  D.precalculus = {
    ch1: { kind: "Understand functions as objects", why: "Precalculus treats functions as things you can shift, combine and reverse — calculus does the same.",
      steps: ["Domain: what inputs are allowed (no dividing by 0, no even root of a negative).", "Transformations one at a time.", "Composition and inverses."],
      mem: [["$y = a f(b(x - h)) + k$", "Inside = horizontal & opposite; outside = vertical & as written."]],
      und: ["Why $(f \\circ g)(x) \\ne (g \\circ f)(x)$", "Why only one-to-one functions have inverses"],
      traps: ["Wrong order in composition", "Forgetting domain restrictions"],
      ready: ["I find domains", "I sketch transformations", "I compose and invert functions"] },
    ch2: { kind: "Understand shape from equation", why: "Polynomial and rational functions are the main examples in calculus.",
      steps: ["End behavior and multiplicities.", "Division and the Factor Theorem.", "Rational functions: asymptotes and holes; rational inequalities with a sign chart."],
      mem: [["Sign chart: mark zeros and undefined points, test each interval", "The sign can only change at those points."]],
      und: ["Even multiplicity bounces, odd crosses", "Why a rational inequality needs a sign chart (not cross-multiplying)"],
      traps: ["Multiplying an inequality by an expression of unknown sign", "Missing a hole"],
      ready: ["I sketch a polynomial from its factors", "I find all asymptotes", "I solve rational inequalities"] },
    ch3: { kind: "Understand logs as exponents", why: "Exponential and log models are essential for science, finance and calculus.",
      steps: ["Growth, decay and interest formulas.", "Log properties and change of base.", "Solving equations."],
      mem: [["$A = P\\left(1 + \\tfrac{r}{n}\\right)^{nt}$, $A = Pe^{rt}$", "$n$ times a year, for $t$ years; $e$ for continuous."], ["$\\log_b x = \\dfrac{\\ln x}{\\ln b}$", "Change of base: any log over the same log of the base."]],
      und: ["Why $e$ is the continuous limit", "Logs turn multiplication into addition"],
      traps: ["$\\ln(a + b) = \\ln a + \\ln b$ (false)", "Mixing up $r$ and $1 + r$"],
      ready: ["I solve exponential and log equations", "I build and use growth/decay models"] },
    ch4: { kind: "Memorize the unit circle with understanding", why: "Trig functions are the language of everything periodic.",
      steps: ["Radians, coterminal angles, arc length.", "Exact values from the unit circle and right triangles.", "Graphs of sine and cosine."],
      mem: [["$s = r\\theta$ ($\\theta$ in radians)", "That's why radians exist: arc length is just $r$ times the angle."], ["Unit circle values for $\\tfrac{\\pi}{6}, \\tfrac{\\pi}{4}, \\tfrac{\\pi}{3}$", "$\\sin$: $\\tfrac{\\sqrt1}{2}, \\tfrac{\\sqrt2}{2}, \\tfrac{\\sqrt3}{2}$ — count up."]],
      und: ["Reference angles and signs in each quadrant", "Amplitude, period, phase shift"],
      traps: ["Degrees mode on the calculator", "Period $2\\pi b$ instead of $\\tfrac{2\\pi}{b}$"],
      ready: ["I give exact values without a calculator", "I graph a transformed sine or cosine"] },
    ch5: { kind: "Understand restricted ranges", why: "Inverse trig turns ratios back into angles — needed for equations and applications.",
      steps: ["Inverse trig and their ranges.", "Solve trig equations on an interval.", "Right-triangle applications."],
      mem: [["$\\sin^{-1}$: $[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}]$; $\\cos^{-1}$: $[0, \\pi]$; $\\tan^{-1}$: $(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2})$", "Cosine's range is the top half; sine's is the right half."]],
      und: ["Why the ranges are restricted (to make a function)", "Why equations have two solutions per period"],
      traps: ["$\\sin^{-1}x = \\dfrac{1}{\\sin x}$ (false)", "Missing the second solution"],
      ready: ["I evaluate inverse trig exactly", "I solve trig equations on $[0, 2\\pi)$"] },
    ch6: { kind: "Memorize a few, derive the rest", why: "Identities rewrite trig expressions so they can be solved or integrated.",
      steps: ["Fundamental identities.", "Sum and difference.", "Double and half angles."],
      mem: [["$\\sin^2 + \\cos^2 = 1$", "The Pythagorean Theorem on the unit circle."], ["$\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta$", "The other two forms come from $\\sin^2 + \\cos^2 = 1$."]],
      und: ["Double-angle formulas come from sum formulas with $A = B$", "Verify by working one side only"],
      traps: ["$\\sin 2\\theta = 2\\sin\\theta$ (false)", "Moving terms across the equals sign while verifying"],
      ready: ["I verify identities", "I find exact values with sum, double and half angles"] },
    ch7: { kind: "Choose the right law", why: "Solve any triangle — surveying, navigation, engineering.",
      steps: ["Law of Sines (and the ambiguous SSA case).", "Law of Cosines.", "Area with $\\tfrac12 ab\\sin C$ and Heron's formula."],
      mem: [["$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$; $c^2 = a^2 + b^2 - 2ab\\cos C$", "Have an angle and its opposite side? Sines. Otherwise cosines."], ["Heron: $A = \\sqrt{s(s - a)(s - b)(s - c)}$", "$s$ = half the perimeter."]],
      und: ["Why SSA can give 0, 1 or 2 triangles", "Law of Cosines is Pythagoras with a correction"],
      traps: ["Missing the second triangle in SSA", "Calculator mode"],
      ready: ["I solve any triangle", "I find a triangle's area three ways"] },
    ch8: { kind: "Picture arrows, then compute", why: "Vectors describe forces, velocities and directions.",
      steps: ["Components, magnitude, unit vectors.", "Dot product and angle between vectors.", "Resultants and navigation."],
      mem: [["$|\\vec v| = \\sqrt{a^2 + b^2}$; $\\vec u \\cdot \\vec v = |\\vec u||\\vec v|\\cos\\theta$", "Dot product $0$ ⇒ perpendicular."]],
      und: ["Adding vectors tip to tail", "Bearing vs. standard angle"],
      traps: ["Wrong quadrant for the direction angle", "Mixing bearings with standard position"],
      ready: ["I find magnitude and direction", "I find the angle between vectors", "I solve navigation problems"] },
    ch9: { kind: "Understand new coordinate systems", why: "Polar, complex and parametric forms describe motion and curves that $y = f(x)$ can't.",
      steps: ["Polar ↔ rectangular.", "Complex numbers in polar form; De Moivre.", "Parametric equations: eliminate the parameter."],
      mem: [["$x = r\\cos\\theta$, $y = r\\sin\\theta$, $r^2 = x^2 + y^2$", "It's the unit circle scaled by $r$."], ["$(r\\,\\text{cis}\\,\\theta)^n = r^n\\,\\text{cis}\\,(n\\theta)$", "Multiply → multiply lengths and add angles."]],
      und: ["Why one point has many polar names", "A parameter is time"],
      traps: ["Wrong quadrant for $\\theta = \\tan^{-1}(y/x)$", "Forgetting to raise $r$ to the $n$"],
      ready: ["I convert polar ↔ rectangular", "I use De Moivre's Theorem", "I eliminate a parameter"] },
    ch10: { kind: "Memorize forms; understand shapes", why: "Conics show up in orbits, optics and engineering.",
      steps: ["Classify a conic from its equation; eccentricity.", "Translated ellipses and hyperbolas.", "Translated parabolas."],
      mem: [["Ellipse $c^2 = a^2 - b^2$; hyperbola $c^2 = a^2 + b^2$", "Hyperbola's foci are farther out."], ["Eccentricity $e = \\dfrac{c}{a}$", "Circle $0$, ellipse $< 1$, parabola $1$, hyperbola $> 1$."]],
      und: ["Completing the square reveals center and axes", "Each conic is a distance rule"],
      traps: ["Using $a$ from the wrong denominator", "Sign of $h$ and $k$"],
      ready: ["I classify any conic", "I find vertices, foci and asymptotes"] },
    ch11: { kind: "Understand patterns and proof", why: "Sequences and series lead to limits; induction proves patterns forever.",
      steps: ["Sequences and series; sigma notation.", "The Binomial Theorem and Pascal's triangle.", "Sum formulas and proof by induction."],
      mem: [["$(a + b)^n = \\sum \\binom{n}{k} a^{n-k} b^k$", "Coefficients are a row of Pascal's triangle."], ["Induction: base case, then $k \\Rightarrow k + 1$", "Dominoes: the first falls, and each one knocks over the next."]],
      und: ["Why induction proves infinitely many cases", "Why $\\binom{n}{k}$ counts the terms"],
      traps: ["Off-by-one in the general term of the binomial expansion", "Skipping the base case"],
      ready: ["I expand binomials and find a specific term", "I write a proof by induction"] },
    ch12: { kind: "Understand the idea of approaching", why: "Limits and rates of change are the start of calculus.",
      steps: ["Evaluate limits: substitute, factor, rationalize.", "Continuity and one-sided limits; limits at infinity.", "Average rate of change → the derivative."],
      mem: [["$f'(x) = \\lim_{h \\to 0} \\dfrac{f(x + h) - f(x)}{h}$", "The slope of a secant line as the two points move together."]],
      und: ["A limit is about getting close, not about the value at the point", "Continuity: no holes, jumps or breaks"],
      traps: ["Saying $\\tfrac00$ means the limit doesn't exist", "Mixing up left and right limits"],
      ready: ["I evaluate limits algebraically", "I check continuity", "I find a derivative from the definition"] }
  };

  const DATA = D[PAGE]; if (!DATA) return;
  const KEY = "fm-study-" + PAGE;
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } };
  const save = v => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} };
  const math = el => { if (window.renderMathInElement) renderMathInElement(el, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false }); };

  function draw(chId) {
    const g = DATA[chId], tabs = document.querySelector(".tabs[role=tablist]"), lv = document.getElementById("learnView"), pv = document.getElementById("practiceView");
    ["chroute", "fmstudy", "ready"].forEach(id => { const e = document.getElementById(id); if (e && (!g || !tabs)) e.remove(); });
    if (!g || !tabs || !lv || !pv) return;

    let r = document.getElementById("chroute");
    if (!r) { r = document.createElement("div"); r.id = "chroute"; r.className = "chroute"; tabs.parentNode.insertBefore(r, tabs); }
    r.innerHTML = `<div class="rk">🧭 This chapter: <b>${g.kind}</b> <span>${g.why}</span></div>
      <div class="rs"><button type="button" data-s="1"><i>1</i>How to study</button><span>→</span><button type="button" data-s="2"><i>2</i>Lessons</button><span>→</span><button type="button" data-s="3"><i>3</i>Practice at your level</button><span>→</span><button type="button" data-s="4"><i>4</i>Ready for the test?</button></div>`;

    let s = document.getElementById("fmstudy");
    if (!s) { s = document.createElement("details"); s.id = "fmstudy"; s.className = "fms"; lv.insertBefore(s, lv.firstChild); }
    s.open = false;
    s.innerHTML = `<summary><span style="font-size:22px">🧭</span><div><b>How to study this chapter</b><br><span>${g.steps.length} steps · ${g.mem.length} thing${g.mem.length > 1 ? "s" : ""} to memorize · ${g.und.length} to understand</span></div><i>›</i></summary>
      <div class="wb"><h4>📋 Steps</h4><ol class="ssteps">${g.steps.map(x => `<li>${x}</li>`).join("")}</ol>
        <h4>🧠 What to memorize — and how</h4><div class="smem">${g.mem.map(([a, b]) => `<div><div class="t">${a}</div><div class="x">💡 ${b}</div></div>`).join("")}</div>
        <div class="howmem">${HOWMEM}</div>
        <h4>🔍 Understand — don't just memorize</h4><ul class="sund">${g.und.map(x => `<li>${x}</li>`).join("")}</ul></div>`;

    let b = document.getElementById("ready");
    if (!b) { b = document.createElement("details"); b.id = "ready"; b.className = "fms ready"; pv.insertBefore(b, pv.firstChild); }
    b.open = false;
    const k = load(), done = k[chId] || [];
    b.innerHTML = `<summary><span style="font-size:22px">✅</span><div><b>Ready for the test?</b><br><span>Common traps and a ${g.ready.length}-point checklist</span></div><i>›</i></summary>
      <div class="wb"><h4>⚠️ Common traps</h4><ul class="sund">${g.traps.map(x => `<li>${x}</li>`).join("")}</ul>
        <h4>✅ I'm ready when…</h4><div class="vocab">${g.ready.map(x => `<label><input type="checkbox" value="${x.replace(/"/g, "&quot;")}" ${done.includes(x) ? "checked" : ""}>${x}</label>`).join("")}</div></div>`;
    b.querySelectorAll("input").forEach(i => i.onchange = () => { const s2 = load(); s2[chId] = [...b.querySelectorAll("input:checked")].map(x => x.value); save(s2); });

    const go = el => { if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60); };
    r.querySelectorAll("button").forEach(x => x.onclick = () => { const n = +x.dataset.s;
      if (n === 1) { setTab("learn"); s.open = true; go(s); }
      else if (n === 2) { setTab("learn"); s.open = false; go(document.getElementById("road") || document.getElementById("lesson")); }
      else if (n === 3) { setTab("practice"); go(pv); }
      else { setTab("practice"); b.open = true; go(b); } });
    [r, s, b].forEach(math);
  }

  const orig = window.openChapter;
  if (typeof orig === "function") {
    window.openChapter = function (id, tab) { const out = orig.apply(this, arguments); try { draw(CH.id); } catch (e) {} return out; };
  }
})();

/* =====================================================================
   PROF. FANG MATH — SITE CONTENT
   This is the ONLY file you edit to add lessons, PDFs, videos,
   weekly challenges and flash cards. The page layout is in index.html.

   HOW TO ADD A LESSON
   1. Upload the PDFs into the "files" folder on GitHub.
   2. Find the course and unit below, and add a lesson like this:
        { title:"Adding Fractions", video:"dQw4w9WgXcQ",
          notes:"files/fractions-notes.pdf", worksheet:"files/fractions-ws.pdf", answers:"files/fractions-key.pdf",
          example:{ q:"Find $\\tfrac12 + \\tfrac13$.", steps:["Common denominator 6: $\\tfrac36+\\tfrac26$", "$=\\tfrac56$"] } }
      • video = the YouTube video ID (the part after "v=" in the YouTube link). Leave it out if no video yet.
      • Any of notes / worksheet / answers can be left out.
      • Math goes between $ ... $ (LaTeX). In this file every backslash is typed twice: \\frac, \\times.
      • Optional practice quiz (scores are saved for signed-in students):
          quiz: [ { q:"Find $12 \\times 3$.", answer:"36" },
                  { q:"Which is bigger?", choices:["$\\tfrac12$", "$\\tfrac13$"], answer:0 } ]   // answer = number of the right choice, starting at 0
      • SIMPLER CASE: add  simpler:"Try $3$ people first: ..."  to an example, a quiz question or a challenge.
        Every problem gets a "Try a simpler case" button; if you leave simpler out, students see a general tip instead.
   INTERACTIVE PRACTICE APP: add  app:"practice/algebra2.html?chapter=sys"  to a unit (an "Interactive practice"
      row in that unit) and/or  app:"practice/algebra2.html"  to a course (a big button on the course page).
      Apps in the practice folder open inside the site with Learn / Practice tabs, and scores are saved.
      (A full web address https://... also works, but those scores are not saved.)
   WEEKLY CHALLENGE: add  check:"7"  (the exact final answer) so students can submit and get it marked.
   3. Upload this file (content.js) to GitHub again. Done.
   ===================================================================== */

const SITE = {
  name: "Prof. Fang Math",
  tagline: "Experience first. Symbols second. Understanding always.",
  email: "fangacademy@fangmath.com",
  youtube: "",            // your YouTube channel link, e.g. "https://www.youtube.com/@ProfFangMath"
  pma: "https://parentsmeetai.org",
};

/* ---------------- COURSE GROUPS (menu pages) ---------------- */
const GROUPS = {
  "K–8":               { key:"k8",         title:"Grades K–8",        intro:"Elementary and middle school math — every idea starts with something you can see, touch or draw." },
  "High School":       { key:"highschool", title:"High School",       intro:"Algebra 1, Geometry, Algebra 2 and Precalculus, chapter by chapter.", alias:["algebra"] },
  "Calculus & Beyond": { key:"calculus",   title:"Calculus & Beyond", intro:"AP Calculus AB and BC, then college math: Linear Algebra and Multivariable Calculus." },
  "Competition":       { key:"competition", title:"Competition Math", intro:"A step-by-step pathway from AMC 8 and MATHCOUNTS to AMC 10/12, AIME and Olympiad proofs. (Not affiliated with the MAA or MATHCOUNTS.)", alias:["amc"] },
};

/* ---------------- COURSES ---------------- */
const COURSES = [
  {
    id: "k2", group: "K–8", title: "Grades K–2", short: "K–2", color: "#E0873A",
    blurb: "Counting, place value, adding and subtracting — built with objects and pictures first.",
    units: [
      { title: "Counting & Place Value", lessons: [] },
      { title: "Addition & Subtraction within 100", lessons: [] },
      { title: "Measurement, Time & Money", lessons: [] },
    ],
  },
  {
    id: "g35", group: "K–8", title: "Grades 3–5", short: "3–5", color: "#0F7C7C",
    blurb: "Multiplication, division, fractions and decimals — from area models to fluent methods.",
    units: [
      { title: "Multiplication & Division", lessons: [
        { title: "Multiplying 3-Digit by 1-Digit & Long Division", grade: "3–4",
          notes: "files/multiply-divide-notes.pdf", worksheet: "files/multiply-divide-worksheet.pdf", answers: "files/multiply-divide-answer-key.pdf",
          summary: "Four ways to multiply (expanded form, area model, partial products, standard algorithm) and 2-digit ÷ 1-digit long division.",
          example: { q: "Find $347 \\times 6$ with the area model.",
            steps: ["Split $347$ into $300 + 40 + 7$.", "Multiply each part: $300\\times6=1800$, $\\;40\\times6=240$, $\\;7\\times6=42$.", "Add the parts: $1800+240+42=\\mathbf{2082}$."],
            simpler: "Try a 2-digit number first: $47 \\times 6 = 40\\times6 + 7\\times6 = 240 + 42 = 282$. Now add a hundreds box." },
          quiz: [
            { q: "Find $347 \\times 6$.", answer: "2082", simpler: "First find $47 \\times 6 = 282$. Then add $300 \\times 6$." },
            { q: "Find $125 \\times 4$.", answer: "500", simpler: "What is $25 \\times 4$? Now there is an extra $100 \\times 4$." },
            { q: "Find $208 \\times 3$.", answer: "624", simpler: "Split it: $200 \\times 3$ and $8 \\times 3$. The tens box is $0$!" },
            { q: "In the area model for $453 \\times 7$, what is the hundreds box ($400 \\times 7$)?", answer: "2800", simpler: "What is $4 \\times 7$? Then $400$ is $4$ hundreds." },
            { q: "Find $84 \\div 4$.", answer: "21", simpler: "Split $84$ into $80 + 4$. What is $80 \\div 4$? $4 \\div 4$?" },
            { q: "What is $96 \\div 7$?", choices: ["$13$ R $5$", "$13$ R $4$", "$12$ R $12$", "$14$ R $2$"], answer: 0, simpler: "What is $7 \\times 13$? How far is that from $96$? (A remainder must be less than $7$.)" },
          ] },
      ] },
      { title: "Fractions", lessons: [] },
      { title: "Decimals", lessons: [] },
      { title: "Geometry & Measurement", lessons: [] },
    ],
  },
  {
    id: "g68", group: "K–8", title: "Grades 6–8", short: "6–8", color: "#6A4BD8",
    blurb: "Ratios, integers, equations and transformations — the bridge to Algebra.",
    units: [
      { title: "Ratios, Rates & Percents", lessons: [] },
      { title: "Integers & Rational Numbers", lessons: [] },
      { title: "Expressions & Equations", lessons: [] },
      { title: "Transformations & Geometry", lessons: [] },
      { title: "Statistics & Probability", lessons: [] },
    ],
  },
  {
    id: "alg1", group: "High School", title: "Algebra 1", short: "Algebra 1", color: "#1F3A68",
    blurb: "12 chapters, from the language of algebra to quadratics. Simple, specific, systematic.",
    app: "practice/algebra1.html",
    units: [
      { title: "1. Foundations of Algebraic Thinking", app: "practice/algebra1.html?chapter=a1", appTopics: 5, lessons: [] },
      { title: "2. Solving Linear Equations", app: "practice/algebra1.html?chapter=a2", appTopics: 6, lessons: [] },
      { title: "3. Linear Inequalities", app: "practice/algebra1.html?chapter=a3", appTopics: 5, lessons: [] },
      { title: "4. Functions & Function Notation", app: "practice/algebra1.html?chapter=a4", appTopics: 5, lessons: [] },
      { title: "5. Linear Functions & Graphing", app: "practice/algebra1.html?chapter=a5", appTopics: 5, lessons: [] },
      { title: "6. Writing Linear Equations", app: "practice/algebra1.html?chapter=a6", appTopics: 5, lessons: [] },
      { title: "7. Systems of Linear Equations", app: "practice/algebra1.html?chapter=a7", appTopics: 4, lessons: [] },
      { title: "8. Exponents & Exponent Rules", app: "practice/algebra1.html?chapter=a8", appTopics: 5, lessons: [] },
      { title: "9. Polynomials: Operations", app: "practice/algebra1.html?chapter=a9", appTopics: 5, lessons: [] },
      { title: "10. Factoring Polynomials", app: "practice/algebra1.html?chapter=a10", appTopics: 5, lessons: [] },
      { title: "11. Quadratic Functions & Equations", app: "practice/algebra1.html?chapter=a11", appTopics: 5, lessons: [] },
      { title: "12. Radicals, Rational Expressions & Capstone", app: "practice/algebra1.html?chapter=a12", appTopics: 5, lessons: [] },
    ],
  },
  {
    id: "geo", group: "High School", title: "Geometry", short: "Geometry", color: "#2E7D32",
    blurb: "Reasoning and proof, congruence and similarity, right triangles, circles, area and volume.",
    app: "practice/geometry.html",
    units: [
      { title: "1. Tools of Geometry", app: "practice/geometry.html?chapter=g1", appTopics: 6, lessons: [] },
      { title: "2. Reasoning & Proof", app: "practice/geometry.html?chapter=g2", appTopics: 5, lessons: [] },
      { title: "3. Parallel & Perpendicular Lines", app: "practice/geometry.html?chapter=g3", appTopics: 5, lessons: [] },
      { title: "4. Congruent Triangles", app: "practice/geometry.html?chapter=g4", appTopics: 5, lessons: [] },
      { title: "5. Relationships Within Triangles", app: "practice/geometry.html?chapter=g5", appTopics: 5, lessons: [] },
      { title: "6. Polygons & Quadrilaterals", app: "practice/geometry.html?chapter=g6", appTopics: 5, lessons: [] },
      { title: "7. Similarity", app: "practice/geometry.html?chapter=g7", appTopics: 5, lessons: [] },
      { title: "8. Right Triangles & Trigonometry", app: "practice/geometry.html?chapter=g8", appTopics: 7, lessons: [] },
      { title: "9. Transformations", app: "practice/geometry.html?chapter=g9", appTopics: 5, lessons: [] },
      { title: "10. Circles", app: "practice/geometry.html?chapter=g10", appTopics: 6, lessons: [] },
      { title: "11. Area", app: "practice/geometry.html?chapter=g11", appTopics: 5, lessons: [] },
      { title: "12. Surface Area & Volume", app: "practice/geometry.html?chapter=g12", appTopics: 5, lessons: [] },
      { title: "13. Probability", app: "practice/geometry.html?chapter=g13", appTopics: 5, lessons: [] },
    ],
  },
  {
    id: "alg2", group: "High School", title: "Algebra 2", short: "Algebra 2", color: "#B7472A",
    blurb: "Functions, polynomials, logarithms, trigonometry and more — with flash cards for every chapter.",
    app: "practice/algebra2.html",
    units: [
      { title: "1. Expressions, Equations & Inequalities", lessons: [] },
      { title: "2. Functions, Equations & Graphs", app: "practice/algebra2.html?chapter=gr", appTopics: 2, lessons: [] },
      { title: "3. Linear Systems", app: "practice/algebra2.html?chapter=sys", appTopics: 6, lessons: [] },
      { title: "4. Quadratic Functions & Equations", app: "practice/algebra2.html?chapter=qt", appTopics: 16, lessons: [] },
      { title: "5. Polynomials & Polynomial Functions", app: "practice/algebra2.html?chapter=py", appTopics: 17, lessons: [] },
      { title: "6. Radical Functions & Rational Exponents", app: "practice/algebra2.html?chapter=rf", appTopics: 7, lessons: [] },
      { title: "7. Exponential & Logarithmic Functions", app: "practice/algebra2.html?chapter=el", appTopics: 7, lessons: [] },
      { title: "8. Rational Functions", app: "practice/algebra2.html?chapter=rt", appTopics: 7, lessons: [] },
      { title: "9. Sequences & Series", app: "practice/algebra2.html?chapter=ss", appTopics: 7, lessons: [] },
      { title: "10. Quadratic Relations & Conic Sections", app: "practice/algebra2.html?chapter=qr", appTopics: 7, lessons: [] },
      { title: "11. Probability & Statistics", app: "practice/algebra2.html?chapter=ps", appTopics: 7, lessons: [] },
      { title: "12. Matrices", app: "practice/algebra2.html?chapter=mx", appTopics: 8, lessons: [] },
      { title: "13. Periodic Functions & Trigonometry", app: "practice/algebra2.html?chapter=tr", appTopics: 7, lessons: [] },
      { title: "14. Trigonometric Identities & Equations", app: "practice/algebra2.html?chapter=tr2", appTopics: 7, lessons: [] },
    ],
  },
  {
    id: "precalc", group: "High School", title: "Precalculus", short: "Precalc", color: "#7B1FA2",
    blurb: "Functions of every kind, trigonometry, polar, vectors and matrices — follows the AP Precalculus units.",
    app: "practice/precalculus.html",
    units: [
      { title: "1. Polynomial & Rational Functions", app: "practice/precalculus.html?chapter=p1", appTopics: 13, lessons: [] },
      { title: "2. Exponential & Logarithmic Functions", app: "practice/precalculus.html?chapter=p2", appTopics: 12, lessons: [] },
      { title: "3. Trigonometric & Polar Functions", app: "practice/precalculus.html?chapter=p3", appTopics: 12, lessons: [] },
      { title: "4. Functions Involving Parameters, Vectors & Matrices", app: "practice/precalculus.html?chapter=p4", appTopics: 10, lessons: [] },
    ],
  },
  {
    id: "calcab", group: "Calculus & Beyond", title: "AP Calculus AB", short: "Calc AB", color: "#C0392B",
    app: "practice/calculus.html?level=ab",
    blurb: "Limits, derivatives and integrals — the 8 units of AP Calculus AB.",
    units: [
      { title: "1. Limits & Continuity", app: "practice/calculus.html?chapter=c1&level=ab", appTopics: 7, lessons: [] },
      { title: "2. Differentiation: Definition & Fundamental Properties", app: "practice/calculus.html?chapter=c2&level=ab", appTopics: 7, lessons: [] },
      { title: "3. Differentiation: Composite, Implicit & Inverse Functions", app: "practice/calculus.html?chapter=c3&level=ab", appTopics: 6, lessons: [] },
      { title: "4. Contextual Applications of Differentiation", app: "practice/calculus.html?chapter=c4&level=ab", appTopics: 4, lessons: [] },
      { title: "5. Analytical Applications of Differentiation", app: "practice/calculus.html?chapter=c5&level=ab", appTopics: 8, lessons: [] },
      { title: "6. Integration & Accumulation of Change", app: "practice/calculus.html?chapter=c6&level=ab", appTopics: 7, lessons: [] },
      { title: "7. Differential Equations", app: "practice/calculus.html?chapter=c7&level=ab", appTopics: 4, lessons: [] },
      { title: "8. Applications of Integration", app: "practice/calculus.html?chapter=c8&level=ab", appTopics: 5, lessons: [] },
    ],
  },
  {
    id: "calcbc", group: "Calculus & Beyond", title: "AP Calculus BC", short: "Calc BC", color: "#AD1457",
    app: "practice/calculus.html",
    blurb: "Everything in AB, plus parametric, polar and vector functions, and infinite series.",
    units: [
      { title: "1. Limits & Continuity", app: "practice/calculus.html?chapter=c1", appTopics: 7, lessons: [] },
      { title: "2. Differentiation: Definition & Fundamental Properties", app: "practice/calculus.html?chapter=c2", appTopics: 7, lessons: [] },
      { title: "3. Differentiation: Composite, Implicit & Inverse Functions", app: "practice/calculus.html?chapter=c3", appTopics: 6, lessons: [] },
      { title: "4. Contextual Applications of Differentiation", app: "practice/calculus.html?chapter=c4", appTopics: 4, lessons: [] },
      { title: "5. Analytical Applications of Differentiation", app: "practice/calculus.html?chapter=c5", appTopics: 8, lessons: [] },
      { title: "6. Integration & Accumulation of Change", app: "practice/calculus.html?chapter=c6", appTopics: 10, lessons: [] },
      { title: "7. Differential Equations", app: "practice/calculus.html?chapter=c7", appTopics: 6, lessons: [] },
      { title: "8. Applications of Integration", app: "practice/calculus.html?chapter=c8", appTopics: 6, lessons: [] },
      { title: "9. Parametric Equations, Polar Coordinates & Vector-Valued Functions", app: "practice/calculus.html?chapter=c9", appTopics: 4, lessons: [] },
      { title: "10. Infinite Sequences & Series", app: "practice/calculus.html?chapter=c10", appTopics: 6, lessons: [] },
    ],
  },
  {
    id: "linalg", group: "Calculus & Beyond", title: "Linear Algebra", short: "Linear Algebra", color: "#00695C",
    blurb: "Vectors, matrices and linear transformations — the language of data science and engineering.",
    units: [
      { title: "1. Systems of Linear Equations & Row Reduction", lessons: [] },
      { title: "2. Vectors & Matrix Equations", lessons: [] },
      { title: "3. Matrix Algebra & Inverses", lessons: [] },
      { title: "4. Determinants", lessons: [] },
      { title: "5. Vector Spaces & Subspaces", lessons: [] },
      { title: "6. Basis, Dimension & Rank", lessons: [] },
      { title: "7. Linear Transformations", lessons: [] },
      { title: "8. Eigenvalues & Eigenvectors", lessons: [] },
      { title: "9. Orthogonality & Least Squares", lessons: [] },
    ],
  },
  {
    id: "multivar", group: "Calculus & Beyond", title: "Multivariable Calculus", short: "Multivariable", color: "#4527A0",
    app: "practice/multivariable.html",
    blurb: "Calculus in three dimensions: partial derivatives, multiple integrals and vector calculus.",
    units: [
      { title: "1. Vectors & the Geometry of Space", app: "practice/multivariable.html?chapter=m1", appTopics: 7, lessons: [] },
      { title: "2. Vector-Valued Functions & Motion", app: "practice/multivariable.html?chapter=m2", appTopics: 5, lessons: [] },
      { title: "3. Partial Derivatives", app: "practice/multivariable.html?chapter=m3", appTopics: 8, lessons: [] },
      { title: "4. Gradients, Directional Derivatives & Optimization", app: "practice/multivariable.html?chapter=m4", appTopics: 6, lessons: [] },
      { title: "5. Double & Triple Integrals", app: "practice/multivariable.html?chapter=m5", appTopics: 6, lessons: [] },
      { title: "6. Polar, Cylindrical & Spherical Coordinates", app: "practice/multivariable.html?chapter=m6", appTopics: 5, lessons: [] },
      { title: "7. Vector Fields & Line Integrals", app: "practice/multivariable.html?chapter=m7", appTopics: 6, lessons: [] },
      { title: "8. Green's Theorem", app: "practice/multivariable.html?chapter=m8", appTopics: 4, lessons: [] },
      { title: "9. Surface Integrals, Stokes' & Divergence Theorems", app: "practice/multivariable.html?chapter=m9", appTopics: 6, lessons: [] },
    ],
  },
  /* ---------------- COMPETITION PATHWAY ---------------- */
  {
    id: "amc8", group: "Competition", title: "AMC 8 & MATHCOUNTS", short: "AMC 8", color: "#D35400",
    blurb: "Middle-school contest math: clever counting, number sense and geometry — speed through understanding.",
    units: [
      { title: "1. Number Sense & Mental Math Tricks", lessons: [] },
      { title: "2. Ratios, Rates & Percents", lessons: [] },
      { title: "3. Primes, Divisibility & Remainders", lessons: [] },
      { title: "4. Counting & Casework", lessons: [
        { title: "Handshakes & Choosing Pairs", grade: "6–8",
          summary: "When everyone meets everyone once, count each person's handshakes, then divide out the double counting: $\\tfrac{n(n-1)}{2}$.",
          example: { q: "At a party, $8$ people each shake hands with everyone else exactly once. How many handshakes are there?",
            steps: ["Each person shakes $7$ hands: $8 \\times 7 = 56$.", "But every handshake was counted twice — once for each person in it.", "$56 \\div 2 = \\mathbf{28}$ handshakes."],
            simpler: "Try $3$ people first: A–B, A–C, B–C is $3$ handshakes. Then $4$ people gives $6$. Can you see $\\tfrac{n(n-1)}{2}$?" },
          quiz: [
            { q: "How many handshakes happen among $10$ people?", answer: "45", simpler: "With $4$ people: $\\tfrac{4 \\times 3}{2} = 6$. Now do the same with $10$." },
            { q: "A league of $6$ teams plays every other team twice. How many games are played?", answer: "30", simpler: "With $3$ teams playing once there are $3$ games. Playing twice doubles it: $6$." },
            { q: "How many diagonals does a hexagon have?", choices: ["$6$", "$9$", "$12$", "$15$"], answer: 1, simpler: "A square: $4$ corners make $\\tfrac{4\\times3}{2} = 6$ segments. Take away the $4$ sides — $2$ diagonals." },
            { q: "How many ways can you choose $2$ helpers from $12$ students?", answer: "66", simpler: "From $4$ students (A, B, C, D) there are $6$ pairs: AB, AC, AD, BC, BD, CD." },
            { q: "A round-robin tournament had $21$ games. How many players were there?", answer: "7", simpler: "Make a table of $\\tfrac{n(n-1)}{2}$: $n = 4 \\to 6$, $\;n = 5 \\to 10$, $\;n = 6 \\to 15$ … keep going." },
          ] },
      ] },
      { title: "5. Probability", lessons: [] },
      { title: "6. Angles, Area & the Pythagorean Theorem", lessons: [] },
      { title: "7. Patterns & Sequences", lessons: [] },
      { title: "8. Logic & Word Problems", lessons: [] },
      { title: "9. Mock Contests", lessons: [] },
    ],
  },
  {
    id: "amc10", group: "Competition", title: "AMC 10", short: "AMC 10", color: "#1565C0",
    blurb: "Algebra 1 & Geometry taken to contest depth: Vieta, modular arithmetic, complementary counting, power of a point.",
    units: [
      { title: "1. Equations, Systems & Word Problems", lessons: [] },
      { title: "2. Quadratics & Vieta's Formulas", lessons: [] },
      { title: "3. Modular Arithmetic & Divisors", lessons: [] },
      { title: "4. Permutations, Combinations & Complementary Counting", lessons: [] },
      { title: "5. Probability & Expected Value", lessons: [] },
      { title: "6. Triangles & Similarity", lessons: [] },
      { title: "7. Circles & Power of a Point", lessons: [] },
      { title: "8. Coordinate Geometry", lessons: [] },
      { title: "9. Sequences & Series", lessons: [] },
      { title: "10. Mock Contests", lessons: [] },
    ],
  },
  {
    id: "amc12", group: "Competition", title: "AMC 12", short: "AMC 12", color: "#283593",
    blurb: "Everything in AMC 10, plus logs, trigonometry, complex numbers and polynomials at contest speed.",
    units: [
      { title: "1. Functions & Polynomials", lessons: [] },
      { title: "2. Exponents & Logarithms", lessons: [] },
      { title: "3. Trigonometry", lessons: [] },
      { title: "4. Complex Numbers", lessons: [] },
      { title: "5. Advanced Counting & Probability", lessons: [] },
      { title: "6. Number Theory", lessons: [] },
      { title: "7. 3D & Analytic Geometry", lessons: [] },
      { title: "8. Sequences & Recursion", lessons: [] },
      { title: "9. Inequalities", lessons: [] },
      { title: "10. Mock Contests", lessons: [] },
    ],
  },
  {
    id: "aime", group: "Competition", title: "AIME", short: "AIME", color: "#6D4C41",
    blurb: "15 problems, 3 hours, integer answers 000–999. Deeper techniques and long, careful solutions.",
    units: [
      { title: "1. Algebraic Manipulation & Inequalities", lessons: [] },
      { title: "2. Polynomials & Roots of Unity", lessons: [] },
      { title: "3. Number Theory: CRT, Orders & Digits", lessons: [] },
      { title: "4. Combinatorics: Bijections, Recursion & PIE", lessons: [] },
      { title: "5. Probability & States", lessons: [] },
      { title: "6. Geometry: Trig, Coordinates & Complex Numbers", lessons: [] },
      { title: "7. Sequences & Functional Equations", lessons: [] },
      { title: "8. Full-Length AIME Practice", lessons: [] },
    ],
  },
  {
    id: "olympiad", group: "Competition", title: "Olympiad (USAJMO / USAMO)", short: "Olympiad", color: "#37474F",
    blurb: "From answers to proofs: induction, inequalities, invariants, olympiad geometry and writing a complete solution.",
    units: [
      { title: "1. Proof Writing & Induction", lessons: [] },
      { title: "2. Inequalities: AM-GM & Cauchy-Schwarz", lessons: [] },
      { title: "3. Olympiad Number Theory", lessons: [] },
      { title: "4. Combinatorics: Invariants & Extremal Principle", lessons: [] },
      { title: "5. Olympiad Geometry", lessons: [] },
      { title: "6. Functional Equations", lessons: [] },
      { title: "7. Polynomials", lessons: [] },
      { title: "8. Writing Full Solutions", lessons: [] },
    ],
  },
];

/* ---------------- WEEKLY CHALLENGE (newest first) ----------------
   Each challenge walks through the Five Moves: Observe → Simplify → Explore → Generalize → Master. */
const CHALLENGES = [
  { date: "2026-09-28", level: "Grades 5–8", title: "Whole-Number Rectangles",
    q: "A rectangle has whole-number side lengths and a perimeter of $30$. How many different rectangles are possible? (A $3\\times 12$ and a $12\\times 3$ rectangle count as the same.)",
    moves: {
      Observe: "Perimeter $= 2(\\ell + w) = 30$, so $\\ell + w = 15$.",
      Simplify: "Only count pairs with $w \\le \\ell$, so each rectangle is counted once.",
      Explore: "$w = 1, 2, 3, \\dots$ gives $1\\times14,\\ 2\\times13,\\ \\dots$ — stop when $w$ passes $\\ell$.",
      Generalize: "For $\\ell + w = n$ with $n$ odd, there are $\\tfrac{n-1}{2}$ rectangles.",
      Master: "Try perimeter $40$. (Careful: now a square is possible!)",
    },
    simpler: "Try perimeter $10$ first: $\\ell + w = 5$ gives $1\\times4$ and $2\\times3$ — that's $2$ rectangles. Now perimeter $12$, $14$…",
    check: "7", answer: "$7$ rectangles: $1\\times14,\\ 2\\times13,\\ 3\\times12,\\ 4\\times11,\\ 5\\times10,\\ 6\\times9,\\ 7\\times8$." },
  { date: "2026-09-21", level: "Grades 5–8", title: "Adding the Odd Numbers",
    q: "What is $1 + 3 + 5 + 7 + \\cdots + 99$?",
    moves: {
      Observe: "These are the odd numbers from $1$ to $99$. How many are there?",
      Simplify: "Try short versions: $1$, $\\;1+3$, $\\;1+3+5$, $\\;1+3+5+7$.",
      Explore: "The totals are $1, 4, 9, 16$ — perfect squares!",
      Generalize: "The sum of the first $n$ odd numbers is $n^2$. From $1$ to $99$ there are $50$ odd numbers.",
      Master: "Draw it: each odd number adds an L-shaped layer to a square of dots.",
    },
    simpler: "Find $1+3+5+7+9$ first. How many odd numbers is that, and what is the total?",
    check: "2500", answer: "$50^2 = 2500$." },
  { date: "2026-09-14", level: "Competition", title: "Zeros at the End of 25!",
    q: "$25! = 25 \\times 24 \\times 23 \\times \\cdots \\times 2 \\times 1$. How many zeros are at the end of this number?",
    moves: {
      Observe: "Each zero at the end comes from a factor of $10 = 2 \\times 5$.",
      Simplify: "There are plenty of 2s, so just count the 5s.",
      Explore: "Multiples of $5$: $5, 10, 15, 20, 25$ — that's $5$ numbers, but $25 = 5\\times5$ has two 5s.",
      Generalize: "Zeros in $n!$ $= \\lfloor n/5 \\rfloor + \\lfloor n/25 \\rfloor + \\lfloor n/125 \\rfloor + \\cdots$",
      Master: "How many zeros are at the end of $100!$?",
    },
    simpler: "How many zeros are at the end of $10! = 3{,}628{,}800$? Count the 5s in $1,2,\\dots,10$.",
    check: "6", answer: "$5 + 1 = 6$ zeros." },
];

/* ---------------- FLASH CARDS ----------------
   Each deck: a list of [front, back]. Math allowed with $ ... $. */
const DECKS = [
  { id: "alg1-ch1", course: "Algebra 1", title: "Ch. 1 — The Language of Algebra", cards: [
    ["Variable", "A letter that stands for a number that can change or is unknown. Example: $x$ in $x + 5$."],
    ["Expression", "Numbers, variables and operations with no equals sign. Example: $3x + 2$."],
    ["Equation", "A statement that two expressions are equal. Example: $3x + 2 = 11$."],
    ["Term", "A number, a variable, or their product, separated by $+$ or $-$. $3x + 2$ has two terms."],
    ["Coefficient", "The number multiplied by a variable. In $7y$, the coefficient is $7$."],
    ["Constant", "A term with no variable. In $4x - 9$, the constant is $-9$."],
    ["Like terms", "Terms with the same variable part. $5x$ and $-2x$ are like terms; $5x$ and $5x^2$ are not."],
    ["Distributive Property", "$a(b + c) = ab + ac$. Example: $3(x + 4) = 3x + 12$."],
    ["Order of operations", "Parentheses → Exponents → Multiply/Divide (left to right) → Add/Subtract (left to right)."],
    ["Evaluate", "Replace each variable with its value and simplify. $2x + 1$ at $x = 4$ is $9$."],
  ] },
  { id: "alg2-exp-log", course: "Algebra 2", title: "Exponent & Logarithm Rules", cards: [
    ["Product rule (exponents)", "$a^m \\cdot a^n = a^{m+n}$"],
    ["Quotient rule (exponents)", "$\\dfrac{a^m}{a^n} = a^{m-n}$"],
    ["Power rule (exponents)", "$(a^m)^n = a^{mn}$"],
    ["Zero & negative exponents", "$a^0 = 1,\\quad a^{-n} = \\dfrac{1}{a^n}\\quad (a \\ne 0)$"],
    ["Definition of logarithm", "$\\log_b x = y \\iff b^y = x$"],
    ["Product rule (logs)", "$\\log_b(MN) = \\log_b M + \\log_b N$"],
    ["Quotient rule (logs)", "$\\log_b\\!\\left(\\dfrac{M}{N}\\right) = \\log_b M - \\log_b N$"],
    ["Power rule (logs)", "$\\log_b(M^k) = k\\,\\log_b M$"],
    ["Change of base", "$\\log_b x = \\dfrac{\\ln x}{\\ln b}$"],
    ["Natural log", "$\\ln x = \\log_e x$, where $e \\approx 2.718$"],
  ] },
  { id: "g35-mult", course: "Grades 3–5", title: "Multiplication Words", cards: [
    ["Factor", "A number being multiplied. In $6 \\times 7 = 42$, $6$ and $7$ are factors."],
    ["Product", "The answer to a multiplication. In $6 \\times 7 = 42$, the product is $42$."],
    ["Partial products", "Split one factor by place value, multiply each part, then add: $23\\times4 = 80 + 12 = 92$."],
    ["Area model", "A rectangle split into parts; each box shows one partial product."],
    ["Dividend", "The number being divided. In $84 \\div 4 = 21$, the dividend is $84$."],
    ["Divisor", "The number you divide by. In $84 \\div 4 = 21$, the divisor is $4$."],
    ["Quotient", "The answer to a division. In $84 \\div 4 = 21$, the quotient is $21$."],
    ["Remainder", "What is left over. $96 \\div 7 = 13$ R $5$."],
  ] },
];

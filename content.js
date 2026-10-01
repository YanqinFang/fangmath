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
            steps: ["Split $347$ into $300 + 40 + 7$.", "Multiply each part: $300\\times6=1800$, $\\;40\\times6=240$, $\\;7\\times6=42$.", "Add the parts: $1800+240+42=\\mathbf{2082}$."]  },
          quiz: [
            { q: "Find $347 \\times 6$.", answer: "2082" },
            { q: "Find $125 \\times 4$.", answer: "500" },
            { q: "Find $208 \\times 3$.", answer: "624" },
            { q: "In the area model for $453 \\times 7$, what is the hundreds box ($400 \\times 7$)?", answer: "2800" },
            { q: "Find $84 \\div 4$.", answer: "21" },
            { q: "What is $96 \\div 7$?", choices: ["$13$ R $5$", "$13$ R $4$", "$12$ R $12$", "$14$ R $2$"], answer: 0 },
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
    id: "alg1", group: "Algebra", title: "Algebra 1", short: "Algebra 1", color: "#1F3A68",
    blurb: "12 chapters, from the language of algebra to quadratics. Simple, specific, systematic.",
    units: [
      { title: "1. Foundations of Algebraic Thinking", lessons: [] },
      { title: "2. Solving Linear Equations", lessons: [] },
      { title: "3. Linear Inequalities", lessons: [] },
      { title: "4. Functions & Function Notation", lessons: [] },
      { title: "5. Linear Functions & Graphing", lessons: [] },
      { title: "6. Writing Linear Equations", lessons: [] },
      { title: "7. Systems of Linear Equations", lessons: [] },
      { title: "8. Exponents & Exponent Rules", lessons: [] },
      { title: "9. Polynomials: Operations", lessons: [] },
      { title: "10. Factoring Polynomials", lessons: [] },
      { title: "11. Quadratic Functions & Equations", lessons: [] },
      { title: "12. Radicals, Rational Expressions & Capstone", lessons: [] },
    ],
  },
  {
    id: "alg2", group: "Algebra", title: "Algebra 2", short: "Algebra 2", color: "#B7472A",
    blurb: "Functions, polynomials, logarithms, trigonometry and more — with flash cards for every chapter.",
    units: [
      { title: "1. Expressions, Equations & Inequalities", lessons: [] },
      { title: "2. Functions, Equations & Graphs", lessons: [] },
      { title: "3. Linear Systems", lessons: [] },
      { title: "4. Quadratic Functions & Equations", lessons: [] },
      { title: "5. Polynomials & Polynomial Functions", lessons: [] },
      { title: "6. Radical Functions & Rational Exponents", lessons: [] },
      { title: "7. Exponential & Logarithmic Functions", lessons: [] },
      { title: "8. Rational Functions", lessons: [] },
      { title: "9. Sequences & Series", lessons: [] },
      { title: "10. Quadratic Relations & Conic Sections", lessons: [] },
      { title: "11. Probability & Statistics", lessons: [] },
      { title: "12. Matrices", lessons: [] },
      { title: "13. Periodic Functions & Trigonometry", lessons: [] },
      { title: "14. Trigonometric Identities & Equations", lessons: [] },
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

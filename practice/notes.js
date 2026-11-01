/* =====================================================================
   FANGMATH — DR. FANG'S NOTES ON THE LESSONS
   The key ideas from Yan's handouts, shown as a "Notes" step after "Learn it".
   FM_NOTES[page][topic id] = { key: [...cards], ex: [...worked examples], tryit: [[q, a], ...], pdf: [[label, file], ...] }
   Math goes in $...$ (KaTeX). File paths are relative to the practice/ folder.
   ===================================================================== */
window.FM_NOTES = {
  algebra1: {
    /* ---------- 1.1 Order of Operations ---------- */
    ops: {
      key: [
        { t: "Exponents", b: "An exponent tells you how many times to multiply the base by itself: $3^4 = 3\\cdot3\\cdot3\\cdot3 = 81$, and $\\left(\\tfrac23\\right)^3 = \\tfrac23\\cdot\\tfrac23\\cdot\\tfrac23 = \\tfrac{8}{27}$." },
        { t: "Order of Operations (PEMDAS)", b: "<b>P</b>arentheses → <b>E</b>xponents → <b>M</b>ultiply / <b>D</b>ivide (left to right) → <b>A</b>dd / <b>S</b>ubtract (left to right)." },
        { t: "A fraction bar is a grouping symbol", b: "Work out the whole numerator (and the whole denominator) first, then divide." },
        { t: "Adding & subtracting negatives", b: "<b>Same signs:</b> add, keep the sign: $-4 + (-9) = -13$.<br><b>Different signs:</b> subtract, keep the sign of the bigger one: $-8 + 5 = -3$.<br><b>Subtracting</b> = adding the opposite: $7 - 12 = 7 + (-12) = -5$." },
      ],
      ex: [
        ["$30 \\div (1 + 2^2)$", "$= 30 \\div (1 + 4) = 30 \\div 5 = 6$"],
        ["$\\dfrac{4 + 3^4}{5}$", "$= \\dfrac{4 + 81}{5} = \\dfrac{85}{5} = 17$ — the fraction bar groups $4 + 81$, so add before dividing."],
      ],
      tryit: [["$5^2 - 3 \\times (8 - 2)$", "$25 - 3 \\times 6 = 25 - 18 = 7$"], ["$(9 - 4)^2 + 3 \\times 2$", "$5^2 + 6 = 25 + 6 = 31$"], ["$48 \\div (2^3 - 2) + 5$", "$48 \\div 6 + 5 = 8 + 5 = 13$"]],
      pdf: [["Notes · Real Numbers, Exponents & Roots", "../materials/algebra1/ch01/Alg1_ch01_Real_Numbers_Exponents_Roots.pdf"], ["Warm-Up · Adding & Subtracting Mixed Numbers with Negatives", "../materials/algebra1/ch01/Alg1_ch01_Mixed_Numbers_Negatives_Warmup.pdf"]],
    },
    /* ---------- 1.2 Evaluating Expressions ---------- */
    eval: {
      key: [
        { t: "Evaluate = substitute, then simplify", b: "Put the given number in place of each variable — <b>in parentheses</b> — then follow the order of operations." },
        { t: "Writing an expression from words", b: "Translate one piece at a time. <b>more than / increased by</b> → $+$ · <b>less than</b> → subtract, and the order flips: “5 less than $2m$” is $2m - 5$ · <b>times / product</b> → $\\times$ · <b>quotient</b> → $\\div$." },
      ],
      ex: [
        ["Evaluate $2x^2 \\div y$ when $x = 3,\\ y = 6$", "$2(3)^2 \\div 6 = 2(9) \\div 6 = 18 \\div 6 = 3$"],
        ["“4 more than three times a number $t$”", "three times $t$ is $3t$; 4 more than that is $3t + 4$"],
        ["A kayak costs \\$8 plus \\$3 per hour $h$", "$8 + 3h$"],
      ],
      tryit: [["Evaluate $(3a)^2 \\div (b - 1)$ when $a = 2,\\ b = 5$", "$(3\\cdot2)^2 \\div (5 - 1) = 36 \\div 4 = 9$"], ["Evaluate $2(x + y) - z$ when $x = 4,\\ y = 3,\\ z = 5$", "$2(7) - 5 = 14 - 5 = 9$"], ["Write: “5 less than twice a number $m$”", "$2m - 5$"]],
      pdf: [["Practice · Real Numbers & Algebraic Expressions", "../materials/algebra1/ch01/Alg1_ch01_Real_Numbers_Algebraic_Expressions.pdf"]],
    },
    /* ---------- 1.3 Distribute & Combine Like Terms ---------- */
    simp: {
      key: [
        { t: "Properties you can use", b: "<table class='fn-tab'><tr><th></th><th>Addition</th><th>Multiplication</th></tr>" +
          "<tr><td><b>Commutative</b> (swap order)</td><td>$a + b = b + a$</td><td>$ab = ba$</td></tr>" +
          "<tr><td><b>Associative</b> (regroup)</td><td>$(a + b) + c = a + (b + c)$</td><td>$(ab)c = a(bc)$</td></tr>" +
          "<tr><td><b>Identity</b></td><td>$a + 0 = a$</td><td>$a \\cdot 1 = a$</td></tr>" +
          "<tr><td><b>Inverse</b></td><td>$a + (-a) = 0$</td><td>$a \\cdot \\tfrac1a = 1\\ (a \\ne 0)$</td></tr>" +
          "<tr><td><b>Zero</b></td><td></td><td>$a \\cdot 0 = 0$</td></tr>" +
          "<tr><td><b>Distributive</b></td><td colspan='2'>$a(b + c) = ab + ac$, e.g. $3(x + 4) = 3x + 12$</td></tr></table>" },
        { t: "Commutative or associative?", b: "If the <b>numbers switch places</b>, it's commutative. If the numbers <b>stay in the same order</b> but the parentheses move, it's associative." },
        { t: "Simplify in two moves", b: "1. <b>Distribute</b> to clear the parentheses. 2. <b>Combine like terms</b> (same variable, same power)." },
      ],
      ex: [["Simplify $5(2x - 3) + 4$", "$= 10x - 15 + 4$ (distribute) $= 10x - 11$ (combine like terms)"]],
      tryit: [["Name the property: $(4 + 9) + 6 = 4 + (9 + 6)$", "Associative — same order, the parentheses moved."], ["Name the property: $n + 15 = 15 + n$", "Commutative — the terms switched places."], ["Simplify $4(x + 2) - 3x$", "$4x + 8 - 3x = x + 8$"]],
      pdf: [["Practice · Properties of Real Numbers", "../materials/algebra1/ch01/Alg1_ch01_Properties_Worksheet.pdf"]],
    },
  },
};

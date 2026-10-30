/* =====================================================================
   PROF. FANG MATH — GEOMETRY "WORDS & POSTULATES"
   A start-here card at the top of each chapter's Learn tab:
   See it → Say it → Write it, then Words to know, Postulates (each with
   a hands-on experiment) and a Quick check. Keyed by chapter id.
   ===================================================================== */
(function () {
  const S = String.raw;
  const css = S`
  .words{background:#fff;border:1.5px solid var(--navy);border-radius:var(--radius);margin:0 0 18px;box-shadow:var(--shadow);overflow:hidden}
  .words>summary{list-style:none;cursor:pointer;padding:16px 20px;display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,#EEF2FA,#fff 70%)}
  .words>summary::-webkit-details-marker{display:none}
  .words>summary b{font-family:Fraunces,Georgia,serif;font-size:21px;font-weight:600}
  .words>summary span{font-size:14px;color:var(--muted)}
  .words>summary i{margin-left:auto;font-style:normal;color:var(--faint);transition:transform .2s}
  .words[open]>summary i{transform:rotate(90deg)}
  .words .wb{padding:6px 20px 20px}
  .words .intro{background:var(--gold-soft);border-radius:12px;padding:12px 14px;margin:8px 0 14px;font-size:15px}
  .words h4{font-family:Fraunces,Georgia,serif;font-size:19px;margin:18px 0 8px;font-weight:600}
  .wgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}
  .wcard{border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:var(--bg)}
  .wcard h5{margin:0 0 6px;font-size:17px;display:flex;align-items:center;gap:8px}
  .wcard h5 em{font-style:normal;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#8A6415;background:var(--gold-soft);border-radius:999px;padding:2px 8px}
  .wcard > svg{width:100%;max-width:230px;height:auto;display:block;margin:2px 0 6px}
  .wcard .wrow{font-size:14.5px;line-height:1.5;margin:4px 0}
  .wcard .wrow .lb{display:inline-block;min-width:62px;color:var(--teal);font-weight:700}
  .wtable{border-collapse:collapse;width:100%;font-size:14.5px;background:#fff;border-radius:10px;overflow:hidden}
  .wtable th,.wtable td{border:1px solid var(--line);padding:7px 10px;text-align:center}
  .wtable th{background:var(--bg)}
  .vocab{display:flex;flex-wrap:wrap;gap:8px}
  .vocab label{display:flex;align-items:center;gap:6px;border:1px solid var(--line);border-radius:999px;padding:6px 12px;font-size:14px;cursor:pointer;background:#fff}
  .vocab label:has(input:checked){background:var(--teal-soft);border-color:var(--teal)}
  .vocab input{accent-color:var(--teal)}
  .post{display:grid;grid-template-columns:1fr 1fr;gap:10px;border:1px solid var(--line);border-radius:12px;padding:10px 14px;margin:8px 0;background:#fff;font-size:14.5px}
  .post .t b{color:var(--navy)} .post .x{color:var(--muted)} .post .x b{color:#8A6415}
  @media (max-width:640px){.post{grid-template-columns:1fr}}
  .qc{border:1px dashed var(--line);border-radius:12px;padding:10px 14px;margin:8px 0;background:#fff;font-size:15px}
  .qc button{border:1px solid var(--teal);background:#fff;color:var(--teal);border-radius:999px;padding:4px 12px;font:inherit;font-size:13px;font-weight:600;cursor:pointer;margin-left:8px}
  .qc .a{margin-top:6px;color:var(--teal)}
  .study{border-color:var(--teal)} .study>summary{background:linear-gradient(135deg,#E6F4F2,#fff 70%)}
  .sstep{margin:4px 0 0;padding-left:22px;font-size:15px;line-height:1.6} .sstep li{margin:4px 0}
  .smem{display:grid;gap:8px} .smem>div{border:1px solid var(--line);border-radius:12px;padding:9px 13px;background:#fff;font-size:15px} .smem .x{color:var(--muted);font-size:14px;margin-top:3px}
  .howmem{background:var(--teal-soft);border-radius:12px;padding:10px 14px;margin:10px 0 0;font-size:14.5px}
  .sund{margin:4px 0 0;padding-left:22px;font-size:15px;line-height:1.6}
  `;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ---------- little pictures ---------- */
  const W = 230, H = 70, ink = "#16233B", teal = "#0F7C7C", red = "#B3261E";
  const svg = (inner, alt) => `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${alt}"><defs><marker id="wa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="${teal}"/></marker></defs>${inner}</svg>`;
  const dot = (x, y, l, dy = -10) => `<circle cx="${x}" cy="${y}" r="4.5" fill="${red}"/><text x="${x}" y="${y + dy}" text-anchor="middle" font-family="Inter,sans-serif" font-size="13" font-weight="700" fill="${ink}">${l}</text>`;
  const PIC = {
    point: svg(dot(115, 40, "A"), "point A"),
    line: svg(`<line x1="14" y1="42" x2="216" y2="42" stroke="${teal}" stroke-width="3" marker-start="url(#wa)" marker-end="url(#wa)"/>${dot(75, 42, "A")}${dot(155, 42, "B")}<text x="205" y="30" font-family="Inter,sans-serif" font-size="13" font-style="italic" fill="${teal}">ℓ</text>`, "line AB"),
    seg: svg(`<line x1="50" y1="42" x2="180" y2="42" stroke="${teal}" stroke-width="3"/>${dot(50, 42, "A")}${dot(180, 42, "B")}`, "segment AB"),
    ray: svg(`<line x1="40" y1="42" x2="216" y2="42" stroke="${teal}" stroke-width="3" marker-end="url(#wa)"/>${dot(40, 42, "A")}${dot(130, 42, "B")}`, "ray AB"),
    plane: svg(`<polygon points="40,62 190,62 220,12 70,12" fill="#DDF0EE" stroke="${teal}" stroke-width="2"/>${dot(90, 44, "A", 16)}${dot(150, 30, "B", 16)}${dot(170, 50, "C", 16)}<text x="200" y="56" font-family="Fraunces,serif" font-size="16" font-style="italic" fill="${teal}">P</text>`, "plane P"),
    col: svg(`<line x1="14" y1="50" x2="216" y2="22" stroke="#94A3B8" stroke-width="2" stroke-dasharray="5 4"/>${dot(45, 46, "A")}${dot(105, 37.6, "B")}${dot(165, 29.3, "C")}${dot(130, 60, "D", -8)}`, "A, B, C collinear; D not"),
    inter: svg(`<line x1="20" y1="15" x2="210" y2="62" stroke="${teal}" stroke-width="3"/><line x1="20" y1="62" x2="210" y2="15" stroke="#6A4BD8" stroke-width="3"/>${dot(115, 38.5, "P")}`, "two lines crossing at P"),
    angle: svg(`<line x1="40" y1="58" x2="216" y2="58" stroke="${teal}" stroke-width="3" marker-end="url(#wa)"/><line x1="40" y1="58" x2="170" y2="10" stroke="${teal}" stroke-width="3" marker-end="url(#wa)"/><path d="M70,58 A30,30 0 0 0 68,47" fill="none" stroke="${red}" stroke-width="2"/>${dot(40, 58, "B", -9)}${dot(130, 24.9, "A", 16)}${dot(180, 58, "C", -9)}`, "angle ABC")
  };

  /* ---------- the chapters ---------- */
  const WORDS = {};
  WORDS.ch1 = {
    sub: "Point, line, plane, segment, ray, angle — and the first postulates",
    intro: S`Geometry starts with three words we <b>cannot define</b>: <b>point</b>, <b>line</b> and <b>plane</b>. We can only describe them with examples. Every other word in geometry is then defined using these three. They are called <b>undefined terms</b>.`,
    cards: [
      { k: "point", t: "Point", tag: "undefined", see: "The pin marking your house on a map. A star so far away it is just a dot.", say: "A location. It has <b>no size</b> at all — no length, no width.", write: "A capital letter: point $A$." },
      { k: "line", t: "Line", tag: "undefined", see: "A perfectly straight road that never ends in either direction. The fold in a sheet of paper, going on forever. The edge where a wall meets the floor.", say: "A straight path of points that goes on <b>forever in both directions</b>. It has no thickness.", write: "Two points on it: $\\overleftrightarrow{AB}$, or a lowercase letter: line $\\ell$." },
      { k: "plane", t: "Plane", tag: "undefined", see: "A perfectly flat floor, a calm lake, a sheet of paper that never ends.", say: "A <b>flat surface</b> that goes on forever in all directions. It has no thickness.", write: "A script capital letter (plane $\\mathcal{P}$) or three points on it that are not in a line (plane $ABC$)." },
      { k: "seg", t: "Line segment", tag: "defined", see: "The part of a road between two towns. The edge of a ruler. A pencil.", say: "Part of a line made of two <b>endpoints</b> and all the points between them. It can be <b>measured</b>.", write: "$\\overline{AB}$ is the segment. $AB$ (no bar) is its length." },
      { k: "ray", t: "Ray", tag: "defined", see: "A flashlight beam. Sunlight leaving the sun: it starts somewhere and never stops.", say: "Part of a line with <b>one endpoint</b> that goes on forever in <b>one direction</b>.", write: "Endpoint first: $\\overrightarrow{AB}$ starts at $A$ and passes through $B$. $\\overrightarrow{AB} \\ne \\overrightarrow{BA}$!" },
      { k: "angle", t: "Angle", tag: "defined", see: "The two hands of a clock. A slice of pizza at its tip. An open book.", say: "Two <b>rays</b> with the <b>same endpoint</b>. The shared endpoint is the <b>vertex</b>; the rays are the <b>sides</b>.", write: "$\\angle ABC$ — the vertex is always the <b>middle</b> letter. Or $\\angle B$, or $\\angle 1$." },
      { k: "col", t: "Collinear / coplanar", tag: "defined", see: "Kids standing in one straight line for lunch. Fence posts along a straight fence.", say: "<b>Collinear</b> points lie on the same line. <b>Coplanar</b> points (or lines) lie in the same plane.", write: "$A$, $B$, $C$ are collinear; $D$ is not." },
      { k: "inter", t: "Intersection", tag: "defined", see: "Two roads crossing. Two walls meeting in a corner line.", say: "The set of points that two (or more) figures have <b>in common</b>.", write: "Two lines meet at a point; two planes meet in a line." }
    ],
    table: S`<table class="wtable"><tr><th></th><th>Endpoints</th><th>Goes on forever?</th><th>Can you measure its length?</th><th>Symbol</th></tr>
      <tr><td><b>Line</b></td><td>0</td><td>both ways</td><td>no</td><td>$\overleftrightarrow{AB}$</td></tr>
      <tr><td><b>Ray</b></td><td>1</td><td>one way</td><td>no</td><td>$\overrightarrow{AB}$</td></tr>
      <tr><td><b>Segment</b></td><td>2</td><td>no</td><td>yes</td><td>$\overline{AB}$</td></tr></table>`,
    vocab: ["point", "line", "plane", "undefined term", "line segment", "endpoint", "ray", "opposite rays", "angle", "vertex", "sides of an angle", "collinear", "coplanar", "intersection", "postulate", "length", "midpoint", "congruent segments"],
    posts: [
      ["Through any two points there is <b>exactly one line</b>.", "Pull a string tight between two nails. It can only go one way."],
      ["If two lines intersect, they meet in <b>exactly one point</b>.", "Two straight roads cross at one intersection — they can't cross twice."],
      ["If two planes intersect, they meet in <b>exactly one line</b>.", "Look up: a wall meets the ceiling along one straight edge."],
      ["Through any three points not on one line there is <b>exactly one plane</b>.", "A three-legged stool never wobbles. A four-legged chair can!"],
      ["<b>Ruler Postulate:</b> points on a line can be matched with numbers, so the distance $AB = |b - a|$.", "Lay a ruler along a segment: read both ends and subtract."],
      ["<b>Segment Addition:</b> if $B$ is between $A$ and $C$, then $AB + BC = AC$.", "Drive from town $A$ to $B$, then $B$ to $C$: the trip adds up to $A$ to $C$."]
    ],
    checks: [
      ["Is a sunbeam more like a line, a ray or a segment?", "A <b>ray</b>: it starts at the sun (one endpoint) and keeps going in one direction."],
      ["Are $\\overrightarrow{AB}$ and $\\overrightarrow{BA}$ the same ray?", "No. $\\overrightarrow{AB}$ starts at $A$; $\\overrightarrow{BA}$ starts at $B$ and points the other way. (But $\\overline{AB}$ and $\\overline{BA}$ are the same segment.)"],
      ["Points $A$, $B$, $C$ are on line $\\ell$. How many different ways can you name the line using two of the letters?", "Six: $\\overleftrightarrow{AB}, \\overleftrightarrow{BA}, \\overleftrightarrow{AC}, \\overleftrightarrow{CA}, \\overleftrightarrow{BC}, \\overleftrightarrow{CB}$ (and also line $\\ell$)."],
      ["Why does a camera tripod have three legs, not four?", "Three points not on one line always lie in exactly one plane, so three feet always touch the ground — no wobble."],
      ["How many segments can you draw between 5 points, no three on a line?", "Each point connects to 4 others: $5 \\times 4 = 20$, but each segment is counted twice, so $20 \\div 2 = 10$."]
    ]
  };

  const KEY = "fm-geo-words";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } };
  const save = v => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} };

  function draw(chId) {
    const lv = document.getElementById("learnView"); if (!lv) return;
    let box = document.getElementById("words");
    const w = WORDS[chId];
    if (!w) { if (box) box.remove(); return; }
    const known = load(), mine = known[chId] || [];
    if (!box) { box = document.createElement("details"); box.id = "words"; box.className = "words"; lv.insertBefore(box, lv.firstChild); }
    box.open = !(known["_seen_" + chId]);
    box.innerHTML = `<summary><span style="font-size:24px">📘</span><div><b>Words &amp; Postulates — start here</b><br><span>${w.sub}</span></div><i>›</i></summary>
      <div class="wb">
        <div class="intro">${w.intro}</div>
        <h4>👀 See it → 🗣 Say it → ✏️ Write it</h4>
        <div class="wgrid">${w.cards.map(c => `<div class="wcard"><h5>${c.t}<em>${c.tag}</em></h5>${PIC[c.k] || ""}
          <div class="wrow"><span class="lb">See it</span>${c.see}</div><div class="wrow"><span class="lb">Say it</span>${c.say}</div><div class="wrow"><span class="lb">Write it</span>${c.write}</div></div>`).join("")}</div>
        ${w.table ? `<h4>Line, ray or segment?</h4>${w.table}` : ""}
        <h4>📌 Postulates — try each one with your hands</h4>
        ${w.posts.map(([t, x]) => `<div class="post"><div class="t">${t}</div><div class="x"><b>Try it: </b>${x}</div></div>`).join("")}
        <h4>📝 Words to know <span style="font-size:14px;font-family:Inter;color:var(--muted);font-weight:500">— tick each word you can explain in your own words</span></h4>
        <div class="vocab">${w.vocab.map(v => `<label><input type="checkbox" value="${v}" ${mine.includes(v) ? "checked" : ""}>${v}</label>`).join("")}</div>
        <div id="vocabN" style="font-size:13.5px;color:var(--muted);margin-top:6px"></div>
        <h4>✅ Quick check</h4>
        ${w.checks.map(([q, a]) => `<div class="qc">${q}<button type="button">Show answer</button><div class="a" hidden>${a}</div></div>`).join("")}
      </div>`;
    const upd = () => { const n = box.querySelectorAll(".vocab input:checked").length; box.querySelector("#vocabN").textContent = `${n} of ${w.vocab.length} words ready${n === w.vocab.length ? " — great job! 🎉" : ""}`; };
    box.querySelectorAll(".vocab input").forEach(i => i.onchange = () => { const k = load(); k[chId] = [...box.querySelectorAll(".vocab input:checked")].map(x => x.value); save(k); upd(); });
    box.querySelectorAll(".qc button").forEach(b => b.onclick = () => { const a = b.nextElementSibling; a.hidden = !a.hidden; b.textContent = a.hidden ? "Show answer" : "Hide"; });
    box.addEventListener("toggle", () => { const k = load(); k["_seen_" + chId] = !box.open; save(k); });
    upd();
    if (window.renderMathInElement) renderMathInElement(box, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false });
    else setTimeout(() => draw(chId), 300);
  }


  /* =====================================================================
     HOW TO STUDY THIS CHAPTER — one guide per chapter
     kind: what sort of chapter it is; steps: the order to study in;
     mem: what to memorize (with the "why" that makes it stick);
     und: what to understand instead of memorizing; traps; ready: self-check
     ===================================================================== */
  const STUDY = {
    ch1: { kind: "Understand, then memorize", why: "Every later chapter uses these words and symbols. If the words are fuzzy, proofs will be too.",
      steps: ["Read the <b>Words &amp; Postulates</b> card below. For each word, picture the real thing first (a road, a flashlight beam).", "Draw each figure yourself and label it: a line, a ray, a segment, an angle with its vertex.", "Cover the definitions and say each one aloud in your own words. Then check.", "Do the lessons in order: midpoint and distance first, then angle pairs.", "Practice at your level. Log every miss in the Mistake Log."],
      mem: [["Notation: $\\overleftrightarrow{AB}$, $\\overrightarrow{AB}$, $\\overline{AB}$, $AB$", "the picture on top shows what the figure looks like: two arrows, one arrow, no arrows; no bar means a number (length)"], ["Midpoint $\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$", "it's just the average — the middle of two numbers"], ["Distance $\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$", "it's the Pythagorean Theorem on a grid"], ["Complementary $= 90^\\circ$, supplementary $= 180^\\circ$", "C comes before S, and $90$ comes before $180$"]],
      und: ["Why point, line, plane can't be defined", "Why the vertex is the middle letter of $\\angle ABC$", "Why vertical angles are equal (both are supplementary to the same angle)"],
      traps: ["Writing $AB$ when you mean the segment $\\overline{AB}$ (or the other way)", "Subtracting in the midpoint formula, or adding in the distance formula"],
      ready: ["I can draw and name a line, ray, segment and angle without looking", "I can explain each postulate with a real example", "I can find a midpoint and a distance without the formula sheet", "I ticked all the Words to know"] },
    ch2: { kind: "Logic & writing", why: "This chapter teaches how mathematicians <b>prove</b> things. It's like learning the grammar of geometry.",
      steps: ["Start with patterns: guess the next term, then try to break your own guess (that's inductive reasoning).", "Learn if–then statements with everyday sentences first (“If it rains, the ground is wet”).", "Make the four forms — conditional, converse, inverse, contrapositive — and decide which are true.", "Memorize the properties of equality by <b>using</b> them in short algebra proofs.", "Then write two-column proofs: copy a model proof once, then write it again from memory."],
      mem: [["Converse: swap. Inverse: negate. Contrapositive: swap <b>and</b> negate.", "the contrapositive always has the same truth value as the original"], ["Properties: Addition, Subtraction, Multiplication, Division, Substitution, Reflexive, Symmetric, Transitive, Distributive", "each one is a step you already do in algebra — now it gets a name"], ["Vertical Angles Theorem, Linear Pair Postulate", "you'll cite these in almost every angle proof"]],
      und: ["Why one counterexample is enough to prove a statement false", "Why a pattern (inductive) is not a proof (deductive)", "Why every proof line needs a reason"],
      traps: ["Thinking the converse is automatically true", "Skipping a reason in a two-column proof"],
      ready: ["I can write the converse, inverse and contrapositive of any if–then sentence", "I can give a counterexample", "I can write a 5-step two-column proof with a reason on every line"] },
    ch3: { kind: "Understand a picture, then memorize names", why: "Parallel lines create equal angles everywhere. Seeing that pattern solves most angle problems in geometry.",
      steps: ["Draw two parallel lines and a transversal. Number the 8 angles 1–8.", "Measure them (or trace one onto paper and slide it): see that there are only <b>two</b> different sizes.", "Learn the pair names by their position (corresponding = same corner, alternate = opposite sides, interior = between the lines).", "Do the lessons, then practice.", "For slope problems, remember: parallel = same slope, perpendicular = negative reciprocal."],
      mem: [["Corresponding, alternate interior, alternate exterior: equal. Same-side interior: add to $180^\\circ$", "shortcut: acute angles are equal, obtuse angles are equal, acute + obtuse $= 180^\\circ$"], ["Parallel slopes are equal; perpendicular slopes multiply to $-1$", "$m$ and $-\\frac{1}{m}$: flip it and change the sign"]],
      und: ["Why the angle pairs only work when the lines are parallel", "How the converses let you <b>prove</b> lines are parallel"],
      traps: ["Using the angle pairs when the lines are not marked parallel", "Calling same-side interior angles equal"],
      ready: ["I can name any angle pair in the 8-angle picture", "I can find all 8 angles from one", "I can write the equation of a parallel or perpendicular line"] },
    ch4: { kind: "Memorize the shortcuts, understand why they work", why: "Congruent triangles are the main tool for proving almost anything in the rest of geometry.",
      steps: ["Start with the triangle angle sum ($180^\\circ$) and the exterior angle rule.", "Cut out two triangles to test each shortcut: SSS, SAS, ASA, AAS, HL.", "Learn why SSA and AAA do <b>not</b> work (draw a counterexample).", "Practice marking diagrams: tick marks for sides, arcs for angles.", "Then write congruence proofs, ending with CPCTC when you need a part."],
      mem: [["Angle sum $180^\\circ$; exterior angle $=$ sum of the two remote interior angles", "tear the corners off a paper triangle — they make a straight line"], ["SSS, SAS, ASA, AAS, HL (and NOT SSA, AAA)", "SSA fails because the same two sides and angle can make two different triangles — draw it and see"], ["Isosceles: base angles are equal", "fold an isosceles triangle in half — the angles match"]],
      und: ["Why the order of letters in $\\triangle ABC \\cong \\triangle DEF$ matters", "Why CPCTC only comes <b>after</b> the triangles are proven congruent"],
      traps: ["Matching the wrong vertices", "Using SSA"],
      ready: ["I can pick the right shortcut from a marked diagram", "I can write a congruence proof with CPCTC"] },
    ch5: { kind: "Understand constructions, memorize the 4 centers", why: "Special segments in triangles show up in tests and in real design problems (where to put a fire station, etc.).",
      steps: ["Draw a large triangle and fold it to find each special segment: midsegment, perpendicular bisector, angle bisector, median, altitude.", "Notice where three of the same kind meet — that's a point of concurrency.", "Learn the triangle inequality with three straws or strips of paper.", "Practice."],
      mem: [["Circumcenter (perpendicular bisectors), incenter (angle bisectors), centroid (medians), orthocenter (altitudes)", "<b>C</b>ircum-<b>P</b>erp, <b>I</b>n-<b>A</b>ngle, <b>C</b>entroid-<b>M</b>edian: “CP, IA, CM”"], ["Midsegment $=$ half the third side, and parallel to it", "a midsegment is a triangle shrunk to half"], ["Centroid splits a median $2 : 1$", "it's the balance point, two-thirds of the way down"], ["Two sides must add to <b>more</b> than the third", "try making a triangle with straws $3, 4, 8$ — it won't close"]],
      und: ["Why the circumcenter is the same distance from all three vertices", "Why the biggest angle is across from the longest side"],
      traps: ["Mixing up median and altitude", "Forgetting “greater than,” not “equal to,” in the triangle inequality"],
      ready: ["I can match each center to its segments", "I can tell if three lengths make a triangle", "I can use the $2 : 1$ centroid rule"] },
    ch6: { kind: "Understand one idea, then memorize properties", why: "Every polygon fact comes from cutting it into triangles.",
      steps: ["Draw polygons with 4, 5, 6 sides and cut each into triangles from one corner.", "Find the angle-sum pattern yourself: $(n - 2) \\cdot 180^\\circ$.", "Make a quadrilateral family tree (parallelogram → rectangle, rhombus → square; trapezoid; kite).", "List the properties of each shape; then practice."],
      mem: [["Interior sum $(n - 2) \\cdot 180^\\circ$; exterior sum always $360^\\circ$", "walk around any polygon: you turn exactly once around"], ["Parallelogram: opposite sides equal and parallel, opposite angles equal, diagonals bisect each other", "a parallelogram is two congruent triangles glued together"], ["Rectangle: equal diagonals. Rhombus: perpendicular diagonals. Square: both", "a square is in both clubs"]],
      und: ["Why the exterior angles always add to $360^\\circ$", "Which properties a square inherits from its “parents”"],
      traps: ["Using $(n - 2) \\cdot 180$ for <b>one</b> angle instead of the total", "Assuming a quadrilateral is a parallelogram without proof"],
      ready: ["I can find one angle of a regular $n$-gon", "I can name a quadrilateral from its properties", "I can draw the quadrilateral family tree from memory"] },
    ch7: { kind: "Understand scaling — very little to memorize", why: "Similarity is “same shape, different size.” It connects geometry to maps, models and photos.",
      steps: ["Start with a photo enlarged $2\\times$: every length doubles, every angle stays the same.", "Practice setting up proportions with matching sides in the <b>same order</b>.", "Learn AA, SSS~, SAS~ by comparing with the congruence shortcuts.", "Then the side-splitter and geometric mean."],
      mem: [["AA, SSS~, SAS~", "like congruence, but sides are <b>in proportion</b> instead of equal"], ["Lengths scale by $k$, areas by $k^2$, volumes by $k^3$", "a $2\\times$ bigger square has $4\\times$ the area — count the small squares"]],
      und: ["Why only two angles are needed (AA)", "Why the side-splitter makes proportional pieces"],
      traps: ["Matching the wrong sides in a proportion", "Scaling area by $k$ instead of $k^2$"],
      ready: ["I can set up and solve a similarity proportion", "I can prove two triangles similar", "I can use the scale factor for area"] },
    ch8: { kind: "Memorize a few key facts, understand the rest", why: "Right triangles let you measure things you can't reach — heights of trees, distances across rivers.",
      steps: ["Prove the Pythagorean Theorem with a picture once (squares on the sides).", "Learn the two special triangles by drawing them from a square and an equilateral triangle.", "Learn SOH-CAH-TOA, then practice which ratio fits which problem.", "Finish with angles of elevation and depression."],
      mem: [["$a^2 + b^2 = c^2$; common triples $3\\text{-}4\\text{-}5$, $5\\text{-}12\\text{-}13$, $8\\text{-}15\\text{-}17$", "triples save time on tests"], ["$45\\text{-}45\\text{-}90$: $1 : 1 : \\sqrt2$. $30\\text{-}60\\text{-}90$: $1 : \\sqrt3 : 2$", "cut a square on its diagonal; cut an equilateral triangle in half"], ["SOH-CAH-TOA", "Sine = Opposite / Hypotenuse, Cosine = Adjacent / Hypotenuse, Tangent = Opposite / Adjacent"]],
      und: ["Why $\\sin$ of an angle doesn't depend on the triangle's size (similar triangles!)", "Which side is “opposite” changes with the angle you look from"],
      traps: ["Using the Pythagorean Theorem on a triangle with no right angle", "Calculator in radian mode"],
      ready: ["I can draw both special triangles from memory", "I can choose sin, cos or tan for any problem", "I can solve an angle-of-elevation word problem"] },
    ch9: { kind: "Hands-on — understand by moving shapes", why: "Transformations explain congruence (slides, flips, turns) and similarity (dilations).",
      steps: ["Use tracing paper: trace a shape, then slide, flip and turn the paper.", "Write down what happens to the coordinates for each move.", "Learn the rules from your own table, not the other way around.", "Then compose two moves and look for symmetry."],
      mem: [["Reflect over $x$-axis: $(x, -y)$; $y$-axis: $(-x, y)$; $y = x$: $(y, x)$", "say it with tracing paper — flip over the line"], ["Rotate $90^\\circ$: $(-y, x)$; $180^\\circ$: $(-x, -y)$", "turn the paper a quarter turn and watch one point"], ["Dilation by $k$: $(kx, ky)$", "zoom in or out from the origin"]],
      und: ["Which moves keep size and shape (rigid motions)", "Why two reflections make a rotation or translation"],
      traps: ["Rotating clockwise instead of counterclockwise", "Mixing up $(x, -y)$ and $(-x, y)$"],
      ready: ["I can transform a point without a picture", "I can describe a composition", "I can find lines of symmetry"] },
    ch10: { kind: "Understand angle relationships, memorize a few formulas", why: "Circles bring together angles, segments and coordinates.",
      steps: ["Learn the parts by drawing: radius, diameter, chord, tangent, secant, arc.", "Measure a central angle and an inscribed angle on the same arc — see the $2 : 1$ relationship.", "Then tangent and chord lengths.", "Finish with the circle equation, arc length and sector area."],
      mem: [["Inscribed angle $=$ half the arc", "the central angle equals the arc; an inscribed angle is half as big"], ["Tangent $\\perp$ radius at the point of tangency", "a wheel touching the road: the spoke is straight up"], ["$(x - h)^2 + (y - k)^2 = r^2$", "it's the distance formula: every point is $r$ from the center"], ["Arc length $\\frac{\\theta}{360} \\cdot 2\\pi r$, sector $\\frac{\\theta}{360} \\cdot \\pi r^2$", "a slice is just a fraction of the whole circle"]],
      und: ["Why an angle inscribed in a semicircle is $90^\\circ$", "How the circle equation comes from the Pythagorean Theorem"],
      traps: ["Using the diameter instead of the radius", "Forgetting the $\\frac12$ for inscribed angles"],
      ready: ["I can find any angle from an arc", "I can write a circle's equation from its graph", "I can find arc length and sector area"] },
    ch11: { kind: "Understand where formulas come from", why: "Almost every area formula comes from the rectangle, by cutting and moving pieces.",
      steps: ["Cut a parallelogram into a rectangle; cut a rectangle into two triangles.", "Derive each formula yourself (triangle, trapezoid, rhombus, circle).", "Practice shaded-region problems: whole minus the part.", "Then regular polygons and similar figures."],
      mem: [["Triangle $\\frac12 bh$, trapezoid $\\frac12(b_1 + b_2)h$, circle $\\pi r^2$", "each one is a rectangle in disguise"], ["Similar figures: area ratio $= k^2$", "count the small squares in a $2\\times$ drawing"]],
      und: ["Why the height must be perpendicular to the base", "Why a circle's area is $\\pi r^2$ (cut it into thin pizza slices)"],
      traps: ["Using a slanted side as the height", "Mixing up circumference and area"],
      ready: ["I can derive the trapezoid formula", "I can find a shaded area", "I can use $k^2$ for similar figures"] },
    ch12: { kind: "Understand nets and the ⅓ rule", why: "Surface area wraps a solid; volume fills it. Real packages and containers use both.",
      steps: ["Unfold a box into a net. Surface area = area of the net.", "Volume of a prism or cylinder: base area × height (stack of layers).", "A pyramid or cone is exactly $\\frac13$ of its prism — test with water or sand if you can.", "Then spheres and similar solids."],
      mem: [["Prism / cylinder $V = Bh$; pyramid / cone $V = \\frac13 Bh$", "pour the cone three times to fill the cylinder"], ["Sphere $V = \\frac43\\pi r^3$, $SA = 4\\pi r^2$", "the surface is exactly 4 great circles"], ["Similar solids: area $k^2$, volume $k^3$", "a $2\\times$ cube holds $8$ small cubes"]],
      und: ["Why $B$ is the base <b>area</b>, not a length", "The difference between height and slant height"],
      traps: ["Forgetting the $\\frac13$", "Using slant height for volume"],
      ready: ["I can sketch a net and find surface area", "I can find the volume of any solid in the chapter", "I can use $k^2$ and $k^3$"] },
    ch13: { kind: "Understand counting — memorize very little", why: "Probability is counting carefully: favorable outcomes over all outcomes.",
      steps: ["List small sample spaces by hand (two coins, two dice).", "Learn the counting principle: multiply the choices.", "Decide: does order matter? Permutation if yes, combination if no.", "Then compound and conditional probability with tree diagrams and tables."],
      mem: [["$P = \\frac{\\text{favorable}}{\\text{total}}$", "always between $0$ and $1$"], ["$_nP_r = \\frac{n!}{(n - r)!}$, $_nC_r = \\frac{n!}{r!(n - r)!}$", "C divides by $r!$ more, because order doesn't matter"], ["Independent: $P(A \\text{ and } B) = P(A) \\cdot P(B)$", "the first coin doesn't change the second"]],
      und: ["When order matters", "Why $P(B \\mid A)$ shrinks the sample space to $A$"],
      traps: ["Using a permutation when order doesn't matter", "Adding probabilities that overlap"],
      ready: ["I can decide permutation vs. combination", "I can draw a tree diagram", "I can find a conditional probability from a table"] }
  };
  const HOWMEM = "<b>How to memorize with understanding:</b> ① picture it or draw it → ② say <i>why</i> it's true → ③ cover it and write it from memory → ④ review on day 1, 3 and 7 (the Mistake Log does this for missed problems).";

  function drawStudy(chId) {
    const lv = document.getElementById("learnView"); if (!lv) return;
    let box = document.getElementById("study"); const g = STUDY[chId];
    if (!g) { if (box) box.remove(); return; }
    const k = load();
    if (!box) { box = document.createElement("details"); box.id = "study"; box.className = "words study"; }
    lv.insertBefore(box, lv.firstChild);
    box.open = !(k["_sseen_" + chId]);
    const ready = k["_ready_" + chId] || [];
    box.innerHTML = `<summary><span style="font-size:24px">🧭</span><div><b>How to study this chapter</b><br><span>${g.kind}</span></div><i>›</i></summary>
      <div class="wb">
        <div class="intro">${g.why}</div>
        <h4>👣 Study in this order</h4><ol class="sstep">${g.steps.map(x => `<li>${x}</li>`).join("")}</ol>
        <h4>🧠 Memorize — but understand first</h4>
        <div class="smem">${g.mem.map(([a, b]) => `<div><div class="t">${a}</div><div class="x">💡 ${b}</div></div>`).join("")}</div>
        <div class="howmem">${HOWMEM}</div>
        <h4>🔍 Understand — don't memorize</h4><ul class="sund">${g.und.map(x => `<li>${x}</li>`).join("")}</ul>
        <h4>⚠️ Common traps</h4><ul class="sund">${g.traps.map(x => `<li>${x}</li>`).join("")}</ul>
        <h4>✅ I'm ready for the test when…</h4>
        <div class="vocab sready">${g.ready.map(x => `<label><input type="checkbox" value="${x.replace(/"/g, "&quot;")}" ${ready.includes(x) ? "checked" : ""}>${x}</label>`).join("")}</div>
      </div>`;
    box.querySelectorAll(".sready input").forEach(i => i.onchange = () => { const s2 = load(); s2["_ready_" + chId] = [...box.querySelectorAll(".sready input:checked")].map(x => x.value); save(s2); });
    box.addEventListener("toggle", () => { const s2 = load(); s2["_sseen_" + chId] = !box.open; save(s2); });
    if (window.renderMathInElement) renderMathInElement(box, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false });
    else setTimeout(() => drawStudy(chId), 300);
  }

  if (typeof openChapter === "function") {
    const orig = openChapter;
    window.openChapter = function (id, tab) { const r = orig.apply(this, arguments); try { draw(id); drawStudy(id); } catch (e) { console.warn("words", e); } return r; };
  }
  window.GEOMETRY_WORDS = WORDS; window.GEOMETRY_STUDY = STUDY; window.drawWords = draw; window.drawStudy = drawStudy;
})();

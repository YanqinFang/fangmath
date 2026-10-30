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

  if (typeof openChapter === "function") {
    const orig = openChapter;
    window.openChapter = function (id, tab) { const r = orig.apply(this, arguments); try { draw(id); } catch (e) { console.warn("words", e); } return r; };
  }
  window.GEOMETRY_WORDS = WORDS; window.drawWords = draw;
})();

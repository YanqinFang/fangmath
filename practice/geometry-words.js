/* =====================================================================
   PROF. FANG MATH — GEOMETRY "WORDS & POSTULATES"
   A start-here card at the top of each chapter's Learn tab:
   See it → Say it → Write it, then Words to know, Postulates (each with
   a hands-on experiment) and a Quick check. Keyed by chapter id.
   ===================================================================== */
(function () {
  const S = String.raw;
  const css = S`
  .words{background:#fff;border:1.5px solid var(--navy);border-radius:var(--radius);margin:0 0 18px;box-shadow:var(--shadow)}
  .words>summary{border-radius:calc(var(--radius) - 2px) calc(var(--radius) - 2px) 0 0}
  .ddm.up{top:auto;bottom:110%}
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
  #words,#ready,#road,#practiceView{scroll-margin-top:80px}
  .wmore{margin:-6px 0 12px;font-size:14px;color:var(--muted)} .wmore>summary{cursor:pointer;color:var(--teal);font-weight:600;list-style:none} .wmore>summary::-webkit-details-marker{display:none}
  .wmore>div{background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin-top:6px;color:var(--ink);font-size:14.5px}
  .tries{border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:var(--bg)} .tries .tip{margin:0 0 6px;font-size:14px;color:var(--muted)}
  .tries > svg{width:100%;max-width:320px;height:auto;display:block;margin:4px 0 8px}
  .tq{background:#fff;border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin:8px 0;font-size:15px}
  .tqa{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:8px} .tqa .and{color:var(--muted);font-size:14px}
  .dd{position:relative;display:inline-block} .ddb{min-width:96px;border:1.5px dashed var(--teal);background:#fff;color:var(--teal);border-radius:10px;padding:5px 12px;font:inherit;font-size:15px;cursor:pointer}
  .ddb.on{border-style:solid;color:var(--ink);background:var(--teal-soft)}
  .ddm{position:absolute;z-index:30;top:110%;left:0;background:#fff;border:1px solid var(--line);border-radius:10px;box-shadow:var(--shadow);padding:4px;display:flex;flex-direction:column;min-width:110px}
  .ddm[hidden]{display:none!important} .ddm button{border:0;background:#fff;text-align:left;padding:6px 10px;border-radius:8px;font:inherit;font-size:15px;cursor:pointer} .ddm button:hover{background:var(--teal-soft)}
  .tchk{border:0;background:var(--navy);color:#fff;border-radius:999px;padding:6px 16px;font:inherit;font-size:14px;font-weight:600;cursor:pointer}
  .tfb .fb{margin-top:8px}
  .wgroup{border-top:1px dashed var(--line);margin-top:14px;padding-top:4px} .wgroup:first-of-type{border-top:0}
  .wgroup h4 .gn{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--navy);color:#fff;font:700 13px Inter,sans-serif;margin-right:8px;vertical-align:2px}
  .defb{margin-top:6px;border:1px solid var(--teal);background:#fff;color:var(--teal);border-radius:999px;padding:4px 12px;font:inherit;font-size:13px;font-weight:600;cursor:pointer}
  .tries{margin-top:12px} .tries .th{font-family:Fraunces,Georgia,serif;font-size:17px;font-weight:600;margin-bottom:2px}
  .inlesson{margin:0 0 18px} .inlesson .wb{padding-top:14px} .ilh{padding:16px 20px 0} .ilh .label{color:var(--teal)} .ilh-t{font-size:clamp(24px,3vw,32px);margin:4px 0 0}
  .chroute{background:#fff;border:1px solid var(--line);border-radius:16px;padding:12px 14px;margin:0 0 14px;box-shadow:var(--shadow)}
  .chroute .rk{font-size:14px;color:var(--ink);margin-bottom:8px} .chroute .rk span{color:var(--muted)}
  .chroute .rs{display:flex;flex-wrap:wrap;align-items:center;gap:6px} .chroute .rs>span{color:var(--faint)}
  .chroute button{display:flex;align-items:center;gap:7px;border:1px solid var(--line);background:var(--bg);border-radius:999px;padding:6px 12px 6px 6px;font:inherit;font-size:13.5px;font-weight:600;color:var(--ink);cursor:pointer}
  .chroute button:hover{border-color:var(--teal);background:var(--teal-soft)}
  .chroute button i{font-style:normal;width:22px;height:22px;border-radius:50%;background:var(--navy);color:#fff;display:grid;place-items:center;font-size:12px}
  .wnav{display:flex;gap:6px;overflow-x:auto;padding:2px 0 10px;margin:4px 0 2px;scrollbar-width:thin}
  .wnav button{flex:none;display:flex;align-items:center;gap:7px;border:1px solid var(--line);background:#fff;border-radius:999px;padding:5px 12px 5px 5px;font:inherit;font-size:13px;font-weight:600;color:var(--muted);cursor:pointer;white-space:nowrap}
  .wnav button i{font-style:normal;width:22px;height:22px;border-radius:50%;background:var(--line);color:var(--ink);display:grid;place-items:center;font-size:12px}
  .wnav button.past i{background:var(--teal-soft);color:var(--teal)}
  .wnav button.on{border-color:var(--navy);color:var(--ink);background:#EEF2FA} .wnav button.on i{background:var(--navy);color:#fff}
  .wstep .wgroup{border-top:0;margin-top:6px}
  .wfoot{display:flex;align-items:center;justify-content:space-between;gap:10px;border-top:1px solid var(--line);margin-top:16px;padding-top:12px}
  .wcount{font-size:13px;color:var(--faint)}
  .wsub{margin:0 0 8px;font-size:14px;color:var(--muted)} .wsubh{font-size:17px!important}
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
    angle: svg(`<line x1="40" y1="58" x2="216" y2="58" stroke="${teal}" stroke-width="3" marker-end="url(#wa)"/><line x1="40" y1="58" x2="170" y2="10" stroke="${teal}" stroke-width="3" marker-end="url(#wa)"/><path d="M70,58 A30,30 0 0 0 68,47" fill="none" stroke="${red}" stroke-width="2"/><text x="83" y="55" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" font-weight="700" fill="${red}">1</text>${dot(40, 58, "B", -9)}${dot(130, 24.9, "A", 16)}${dot(180, 58, "C", -9)}`, "angle ABC")
  };

  /* ---------- the chapters ---------- */
  const WORDS = {};
  WORDS.ch1 = {
    sub: "Point, line, plane, segment, ray, angle — and the first postulates",
    intro: S`Every word in geometry starts from a picture you already know. Read each card: <b>see it</b>, <b>say it</b>, then <b>write it</b>.`,
    more: ["Extra: what is an “undefined term”?", S`Geometry starts with three words we <b>cannot define</b>: <b>point</b>, <b>line</b> and <b>plane</b>. Any definition would need other words, and those would need more words… so mathematicians agree to start with these three and only <b>describe</b> them with examples. Every other word (segment, ray, angle, …) is then defined using them. That is why the cards are marked <i>undefined</i> or <i>defined</i>.`],
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


  /* ---------- more pictures (chapters 2–13) ---------- */
  const fig = (inner, h = 90, alt = "figure") => `<svg viewBox="0 0 ${W} ${h}" role="img" aria-label="${alt}">${inner}</svg>`;
  const T2 = (x, y, t, c = ink, s = 13, a = "middle") => `<text x="${x}" y="${y}" text-anchor="${a}" font-family="Inter,sans-serif" font-size="${s}" font-weight="700" fill="${c}">${t}</text>`;
  const poly = (pts, f = "#DDF0EE", s = teal) => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${f}" stroke="${s}" stroke-width="2.5"/>`;
  const ln = (a, b, c = teal, w = 2.5, d = "") => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c}" stroke-width="${w}" ${d ? `stroke-dasharray="${d}"` : ""}/>`;
  const tick = (a, b, n = 1) => { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = -dy / L * 6, uy = dx / L * 6, vx = dx / L * 4, vy = dy / L * 4; let s = ""; for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2); s += `<line x1="${mx + ux + vx * o}" y1="${my + uy + vy * o}" x2="${mx - ux + vx * o}" y2="${my - uy + vy * o}" stroke="${ink}" stroke-width="2"/>`; } return s; };
  Object.assign(PIC, {
    venn: fig(`<ellipse cx="115" cy="45" rx="95" ry="40" fill="#DDF0EE" stroke="${teal}" stroke-width="2"/><ellipse cx="85" cy="48" rx="45" ry="24" fill="#FBF1DC" stroke="#C9962B" stroke-width="2"/>${T2(85, 52, "p", "#8A6415")}${T2(178, 50, "q", teal)}`, 90, "p inside q"),
    trans: (() => { const X = y => 40 + (88 - y) / 86 * 150, L = (y, n, side) => T2(X(y) + side * 13, y + 4, n, ink, 11); return fig(`<defs><marker id="gaD" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#16233B"/></marker><marker id="gaT" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#0F7C7C"/></marker><marker id="gaB" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1F3A68"/></marker><marker id="gaR" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#B3261E"/></marker></defs><line x1="12" y1="25" x2="218" y2="25" stroke="${ink}" stroke-width="2" marker-start="url(#gaD)" marker-end="url(#gaD)"/><line x1="12" y1="65" x2="218" y2="65" stroke="${ink}" stroke-width="2" marker-start="url(#gaD)" marker-end="url(#gaD)"/><line x1="43" y1="85" x2="187" y2="5" stroke="${red}" stroke-width="2.5" marker-start="url(#gaR)" marker-end="url(#gaR)"/>${L(16, "1", -1)}${L(16, "2", 1)}${L(36, "3", -1)}${L(36, "4", 1)}${L(56, "5", -1)}${L(56, "6", 1)}${L(76, "7", -1)}${L(76, "8", 1)}`, 90, "two parallel lines cut by a transversal"); })(),
    tri: fig(`${poly([[30, 80], [200, 80], [90, 12]])}${T2(22, 86, "A")}${T2(208, 86, "B")}${T2(90, 9, "C")}`, 92, "triangle ABC"),
    cong: fig(`${poly([[10, 80], [100, 80], [40, 18]])}${poly([[125, 80], [215, 80], [155, 18]], "#FBF1DC", "#C9962B")}${tick([10, 80], [100, 80], 1)}${tick([125, 80], [215, 80], 1)}${tick([10, 80], [40, 18], 2)}${tick([125, 80], [155, 18], 2)}${tick([100, 80], [40, 18], 3)}${tick([215, 80], [155, 18], 3)}`, 90, "two congruent triangles with matching tick marks"),
    iso: fig(`${poly([[55, 82], [175, 82], [115, 10]])}${tick([55, 82], [115, 10], 1)}${tick([175, 82], [115, 10], 1)}<path d="M72,82 A18,18 0 0 0 66,69" fill="none" stroke="${red}" stroke-width="2"/><path d="M158,82 A18,18 0 0 1 164,69" fill="none" stroke="${red}" stroke-width="2"/>`, 90, "isosceles triangle"),
    mid: fig(`${poly([[20, 82], [210, 82], [90, 10]])}${ln([55, 46], [150, 46], red, 3)}<circle cx="55" cy="46" r="4" fill="${red}"/><circle cx="150" cy="46" r="4" fill="${red}"/>${tick([20, 82], [55, 46], 1)}${tick([55, 46], [90, 10], 1)}${tick([210, 82], [150, 46], 2)}${tick([150, 46], [90, 10], 2)}`, 92, "midsegment of a triangle"),
    med: fig(`${poly([[20, 82], [210, 82], [90, 10]])}${ln([90, 10], [115, 82], red, 2.5)}${ln([90, 10], [90, 82], "#6A4BD8", 2.5, "5 4")}<rect x="90" y="74" width="8" height="8" fill="none" stroke="#6A4BD8"/>${T2(130, 76, "median", red, 11, "start")}${T2(86, 60, "altitude", "#6A4BD8", 11, "end")}`, 92, "median and altitude"),
    para: fig(`${poly([[20, 78], [160, 78], [210, 14], [70, 14]])}${ln([20, 78], [210, 14], red, 1.5, "5 4")}${ln([160, 78], [70, 14], red, 1.5, "5 4")}${tick([20, 78], [160, 78], 1)}${tick([70, 14], [210, 14], 1)}${tick([20, 78], [70, 14], 2)}${tick([160, 78], [210, 14], 2)}`, 90, "parallelogram with diagonals"),
    penta: fig(`${poly([[115, 8], [190, 40], [160, 84], [70, 84], [40, 40]])}${ln([115, 8], [160, 84], red, 1.5, "4 3")}${ln([115, 8], [70, 84], red, 1.5, "4 3")}`, 92, "pentagon split into 3 triangles"),
    sim: fig(`${poly([[10, 82], [80, 82], [30, 46]])}${poly([[100, 82], [220, 82], [134, 20]], "#FBF1DC", "#C9962B")}${T2(46, 94, "×1", ink, 11)}${T2(160, 94, "×1.7", ink, 11)}`, 98, "two similar triangles"),
    rt: fig(`${poly([[30, 80], [190, 80], [190, 14]])}<rect x="178" y="68" width="12" height="12" fill="none" stroke="${ink}"/><path d="M64,80 A34,34 0 0 0 62,68" fill="none" stroke="${red}" stroke-width="2"/>${T2(74, 74, "θ", red, 14)}${T2(110, 96, "adjacent", ink, 11)}${T2(198, 52, "opposite", ink, 11, "start")}${T2(96, 40, "hypotenuse", ink, 11)}`, 100, "right triangle with sides named from angle theta"),
    refl: fig(`${ln([115, 2], [115, 88], red, 2, "5 4")}${poly([[40, 70], [40, 20], [80, 30], [40, 40]])}${poly([[190, 70], [190, 20], [150, 30], [190, 40]], "#FBF1DC", "#C9962B")}${T2(115, 98, "line of reflection", red, 11)}`, 100, "a flag reflected over a line"),
    circ: fig(`<circle cx="100" cy="48" r="40" fill="#DDF0EE" stroke="${teal}" stroke-width="2.5"/><circle cx="100" cy="48" r="3.5" fill="${ink}"/>${ln([100, 48], [140, 48], red, 2.5)}${ln([72, 20], [128, 76], "#6A4BD8", 2.5)}${ln([60, 8], [200, 8], "#C9962B", 2.5)}${T2(122, 44, "r", red, 12)}${T2(66, 62, "chord", "#6A4BD8", 11)}${T2(210, 12, "tangent", "#8A6415", 11, "end")}`, 96, "circle with radius, chord and tangent"),
    area: fig(`${poly([[20, 80], [170, 80], [210, 18], [60, 18]])}${ln([60, 18], [60, 80], red, 2, "5 4")}<rect x="60" y="70" width="10" height="10" fill="none" stroke="${red}"/>${T2(95, 96, "base b", ink, 11)}${T2(54, 54, "h", red, 13, "end")}`, 100, "parallelogram with base and height"),
    solid: fig(`${poly([[20, 40], [100, 40], [100, 86], [20, 86]])}${poly([[20, 40], [45, 18], [125, 18], [100, 40]], "#C8E8E4")}${poly([[100, 40], [125, 18], [125, 64], [100, 86]], "#B5DED9")}<ellipse cx="180" cy="22" rx="30" ry="9" fill="#FBF1DC" stroke="#C9962B" stroke-width="2"/>${ln([150, 22], [150, 78], "#C9962B")}${ln([210, 22], [210, 78], "#C9962B")}<path d="M150,78 A30,9 0 0 0 210,78" fill="#FBF1DC" stroke="#C9962B" stroke-width="2"/>`, 96, "a prism and a cylinder"),
    tree: fig(`${ln([20, 48], [80, 20], teal, 2)}${ln([20, 48], [80, 76], teal, 2)}${ln([90, 20], [150, 8], "#6A4BD8", 2)}${ln([90, 20], [150, 32], "#6A4BD8", 2)}${ln([90, 76], [150, 64], "#6A4BD8", 2)}${ln([90, 76], [150, 88], "#6A4BD8", 2)}${T2(85, 24, "H", teal, 12)}${T2(85, 80, "T", teal, 12)}${T2(160, 12, "HH", ink, 11, "start")}${T2(160, 36, "HT", ink, 11, "start")}${T2(160, 68, "TH", ink, 11, "start")}${T2(160, 92, "TT", ink, 11, "start")}`, 96, "tree diagram for two coins")
  });

  WORDS.ch2 = {
    sub: "Conditional statements, reasoning, and the properties used in proofs",
    intro: S`In this chapter you learn the <b>language of proof</b>. A proof is a chain of true statements, where every link has a reason. The words below are the tools for building that chain.`,
    cards: [
      { k: "venn", t: "Conditional statement", tag: "defined", see: "“If it is raining, then the ground is wet.” A promise: whenever the first part happens, the second part happens.", say: "An <b>if–then</b> statement. The “if” part is the <b>hypothesis</b> $p$; the “then” part is the <b>conclusion</b> $q$.", write: "$p \\to q$, read “if $p$, then $q$.” In the picture, every $p$ is inside $q$." },
      { t: "Converse, inverse, contrapositive", tag: "defined", see: "“If it's a dog, it has 4 legs.” Flip it: “If it has 4 legs, it's a dog”? Not always — a cat!", say: "<b>Converse</b>: swap ($q \\to p$). <b>Inverse</b>: negate both ($\\sim p \\to \\sim q$). <b>Contrapositive</b>: swap <b>and</b> negate ($\\sim q \\to \\sim p$).", write: "The contrapositive is always true when the original is true." },
      { t: "Biconditional", tag: "defined", see: "“A triangle is equilateral <b>if and only if</b> all its sides are equal.” Works both ways.", say: "A statement where the conditional <b>and</b> its converse are both true. Every good definition is a biconditional.", write: "$p \\leftrightarrow q$, “$p$ if and only if $q$” (iff)." },
      { t: "Counterexample", tag: "defined", see: "“All birds can fly.” One penguin is enough to break it.", say: "<b>One</b> example that shows a statement is false.", write: "To disprove: find one counterexample. To prove: one example is never enough." },
      { t: "Inductive reasoning", tag: "defined", see: "The sun has risen every morning, so it will rise tomorrow. You see a pattern and guess.", say: "Making a <b>conjecture</b> (a guess) from a pattern of examples. It can be wrong!", write: "Pattern → conjecture. Test it, try to break it." },
      { t: "Deductive reasoning", tag: "defined", see: "A detective: “Only the cook had a key. The door was unlocked with a key. So the cook did it.”", say: "Reaching a conclusion that <b>must</b> be true, using facts, definitions and rules of logic.", write: "Law of Detachment: $p \\to q$ and $p$ is true, so $q$ is true. Law of Syllogism: $p \\to q$, $q \\to r$, so $p \\to r$." },
      { t: "Theorem & proof", tag: "defined", see: "A courtroom: every claim needs evidence.", say: "A <b>theorem</b> is a statement that has been <b>proven</b>. A <b>proof</b> is a logical argument where each statement has a reason.", write: "Two-column proof: <b>Statements</b> on the left, <b>Reasons</b> on the right." }
    ],
    table: S`<table class="wtable"><tr><th>Form</th><th>Example (original: if a figure is a square, then it has 4 sides)</th><th>Always true?</th></tr>
      <tr><td><b>Converse</b></td><td>If a figure has 4 sides, then it is a square.</td><td>no</td></tr>
      <tr><td><b>Inverse</b></td><td>If a figure is not a square, then it does not have 4 sides.</td><td>no</td></tr>
      <tr><td><b>Contrapositive</b></td><td>If a figure does not have 4 sides, then it is not a square.</td><td>yes ✓</td></tr></table>`,
    tableTitle: "The four forms",
    vocab: ["conjecture", "inductive reasoning", "counterexample", "conditional", "hypothesis", "conclusion", "converse", "inverse", "contrapositive", "negation", "biconditional", "deductive reasoning", "Law of Detachment", "Law of Syllogism", "theorem", "proof", "two-column proof", "Reflexive Property", "Symmetric Property", "Transitive Property", "Substitution Property"],
    postTitle: "Properties you'll use as reasons",
    posts: [
      ["<b>Reflexive:</b> $a = a$.", "Everything is equal to itself — like your reflection in a mirror."],
      ["<b>Symmetric:</b> if $a = b$, then $b = a$.", "If Mia is as tall as Leo, then Leo is as tall as Mia."],
      ["<b>Transitive:</b> if $a = b$ and $b = c$, then $a = c$.", "Mia = Leo in height, Leo = Ava, so Mia = Ava."],
      ["<b>Substitution:</b> if $a = b$, you can replace $a$ with $b$ anywhere.", "Trade a 5-dollar bill for five 1-dollar bills — same value."],
      ["<b>Addition / Subtraction / Multiplication / Division Properties:</b> do the same thing to both sides.", "A balance scale stays level if you add the same weight to both pans."],
      ["<b>Vertical Angles Theorem:</b> vertical angles are congruent.", "Cross two pencils: the opposite angles always match."]
    ],
    checks: [
      ["Write the converse of: “If an angle measures $90^\\circ$, then it is a right angle.” Is it true?", "“If an angle is a right angle, then it measures $90^\\circ$.” True — so this is a good definition (a biconditional)."],
      ["Give a counterexample: “Every number that ends in 5 is odd.”", "None exists — this one is true! A counterexample must make the hypothesis true and the conclusion false."],
      ["Is a pattern of 100 examples a proof?", "No. Inductive reasoning makes a conjecture. Only deductive reasoning proves it."],
      ["Which property: if $AB = CD$, then $CD = AB$?", "The Symmetric Property."]
    ]
  };

  WORDS.ch3 = {
    sub: "Parallel lines, transversals and the angles they make",
    intro: S`When a line crosses two parallel lines, it makes <b>8 angles</b> — but only <b>two different sizes</b>. Learn the names of the angle pairs by their <b>position</b>, and the rest follows.`,
    cards: [
      { t: "Parallel lines", tag: "defined", see: "Railroad tracks. The lines on notebook paper.", say: "Coplanar lines that <b>never intersect</b>.", write: "$\\ell \\parallel m$. Arrows on the lines in a diagram ($>$ and $>$) mean parallel." },
      { t: "Perpendicular lines", tag: "defined", see: "The corner of a book. A street sign post standing on flat ground.", say: "Lines that meet to form <b>right angles</b>.", write: "$\\ell \\perp m$, with a small square at the corner." },
      { t: "Skew lines", tag: "defined", see: "A highway bridge passing over a road below: they never meet, but they aren't parallel.", say: "Lines that are <b>not coplanar</b>: they don't meet and aren't parallel.", write: "Only possible in 3D." },
      { k: "trans", t: "Transversal", tag: "defined", see: "A street crossing two parallel avenues.", say: "A line that crosses two or more lines at different points.", write: "It makes 8 angles, numbered $1$–$8$." },
      { t: "Corresponding angles", tag: "defined", see: "Same corner at each crossing — like the same seat in two identical rows of a theater.", say: "Angles in the <b>same position</b> at each intersection.", write: "In the picture: $\\angle 1$ and $\\angle 5$. Equal when lines are parallel." },
      { t: "Alternate interior / exterior", tag: "defined", see: "“Alternate” = opposite sides of the transversal. “Interior” = between the two lines.", say: "<b>Alternate interior</b>: between the lines, on opposite sides. <b>Alternate exterior</b>: outside the lines, on opposite sides.", write: "$\\angle 4$ and $\\angle 5$ are alternate interior; $\\angle 1$ and $\\angle 8$ are alternate exterior." },
      { t: "Same-side interior", tag: "defined", see: "Two angles between the lines on the same side, like the inside of the letter C.", say: "Interior angles on the <b>same side</b> of the transversal. When lines are parallel they add to $180^\\circ$.", write: "$\\angle 3$ and $\\angle 5$ (also called consecutive interior)." },
      { t: "Slope of parallel / perpendicular lines", tag: "defined", see: "Two ramps with the same steepness never meet.", say: "Parallel lines have <b>equal slopes</b>. Perpendicular lines have slopes that are <b>negative reciprocals</b>.", write: "$m_1 = m_2$; $m_1 \\cdot m_2 = -1$ (like $2$ and $-\\frac12$)." }
    ],
    vocab: ["parallel lines", "perpendicular lines", "skew lines", "parallel planes", "transversal", "corresponding angles", "alternate interior angles", "alternate exterior angles", "same-side interior angles", "slope", "negative reciprocal", "Parallel Postulate"],
    postTitle: "Postulates & theorems — try them",
    posts: [
      ["<b>Corresponding Angles Postulate:</b> parallel lines → corresponding angles are equal.", "Trace one angle on tracing paper and slide it down the transversal: it fits the other exactly."],
      ["<b>Alternate Interior Angles Theorem:</b> parallel lines → alternate interior angles are equal.", "Look for the letter Z in the picture: its two corners match."],
      ["<b>Same-Side Interior Angles Theorem:</b> parallel lines → same-side interior angles add to $180^\\circ$.", "Look for the letter C: its two inside corners make a straight angle together."],
      ["<b>Converses:</b> if any of these angle pairs match, the lines <b>are</b> parallel.", "This is how carpenters check that shelves are parallel."],
      ["<b>Parallel Postulate:</b> through a point not on a line, there is exactly one parallel line.", "Try drawing two different parallels through the same point — they'd have to be the same line."]
    ],
    checks: [
      ["If $\\angle 1 = 110^\\circ$ and the lines are parallel, how many of the 8 angles are $110^\\circ$?", "Four of them. The other four are $70^\\circ$."],
      ["A line has slope $\\frac{3}{4}$. What slope is perpendicular to it?", "$-\\frac{4}{3}$ (flip it and change the sign)."],
      ["Can two lines be neither parallel nor intersecting?", "Yes — skew lines, in 3D (like a bridge over a road)."]
    ]
  };

  WORDS.ch4 = {
    sub: "Triangle angles, congruence and the five shortcuts",
    intro: S`Two figures are <b>congruent</b> when one can be moved exactly on top of the other: same size and same shape. For triangles you don't need to check all six parts — five <b>shortcuts</b> are enough.`,
    cards: [
      { k: "tri", t: "Triangle parts", tag: "defined", see: "A slice of pizza, a roof, a yield sign.", say: "Three <b>sides</b>, three <b>vertices</b>, three <b>angles</b>. The angles always add to $180^\\circ$.", write: "$\\triangle ABC$; side $\\overline{AB}$ is across from $\\angle C$." },
      { t: "Exterior angle", tag: "defined", see: "Walking along a side, then turning at a corner: the turn is the exterior angle.", say: "An angle formed by one side and the <b>extension</b> of another side.", write: "Exterior angle $=$ sum of the two <b>remote interior</b> angles." },
      { k: "cong", t: "Congruent figures", tag: "defined", see: "Two cookies from the same cookie cutter.", say: "Figures with <b>all</b> matching sides and angles equal.", write: "$\\triangle ABC \\cong \\triangle DEF$ — letters in matching order. Tick marks show equal sides." },
      { k: "iso", t: "Isosceles triangle", tag: "defined", see: "A triangle that folds onto itself: a tent from the front.", say: "A triangle with <b>at least two equal sides</b> (legs). The angles opposite them (base angles) are equal.", write: "Legs, base, base angles, vertex angle." },
      { t: "Equilateral / equiangular", tag: "defined", see: "A yield sign: all sides the same.", say: "All three sides equal ⇔ all three angles equal ($60^\\circ$ each).", write: "Equilateral ⇔ equiangular." },
      { t: "CPCTC", tag: "defined", see: "Once you know two cookies came from the same cutter, every part matches.", say: "<b>C</b>orresponding <b>P</b>arts of <b>C</b>ongruent <b>T</b>riangles are <b>C</b>ongruent.", write: "Used <b>after</b> proving the triangles congruent." }
    ],
    table: S`<table class="wtable"><tr><th>Shortcut</th><th>What you need</th><th>Works?</th></tr>
      <tr><td><b>SSS</b></td><td>3 pairs of sides</td><td>✓</td></tr><tr><td><b>SAS</b></td><td>2 sides and the angle <b>between</b> them</td><td>✓</td></tr>
      <tr><td><b>ASA</b></td><td>2 angles and the side <b>between</b> them</td><td>✓</td></tr><tr><td><b>AAS</b></td><td>2 angles and a side not between</td><td>✓</td></tr>
      <tr><td><b>HL</b></td><td>right triangles: hypotenuse and a leg</td><td>✓</td></tr><tr><td>SSA, AAA</td><td>—</td><td>✗ (not enough)</td></tr></table>`,
    tableTitle: "The congruence shortcuts",
    vocab: ["triangle", "vertex", "interior angle", "exterior angle", "remote interior angles", "congruent", "corresponding parts", "SSS", "SAS", "ASA", "AAS", "HL", "CPCTC", "isosceles", "legs", "base angles", "equilateral", "equiangular", "hypotenuse"],
    postTitle: "Theorems — try them",
    posts: [
      ["<b>Triangle Angle Sum:</b> the angles add to $180^\\circ$.", "Tear off the 3 corners of a paper triangle and line them up: they make a straight line."],
      ["<b>Exterior Angle Theorem:</b> exterior angle $=$ sum of the remote interior angles.", "Place the two far corners from your torn triangle into the outside angle — they fill it."],
      ["<b>SSS:</b> three sides decide the triangle.", "Make a triangle from 3 straws joined at the ends: it's rigid, it can't change shape."],
      ["<b>SSA does NOT work.</b>", "Fix one side and an angle, then swing the second side: it can land in two places."],
      ["<b>Isosceles Triangle Theorem:</b> equal sides → equal base angles.", "Fold an isosceles triangle down the middle: the base angles land on each other."]
    ],
    checks: [
      ["Two angles of a triangle are $50^\\circ$ and $70^\\circ$. What is the exterior angle at the third vertex?", "$50 + 70 = 120^\\circ$ (and the interior angle there is $60^\\circ$)."],
      ["Why doesn't AAA prove congruence?", "A small and a large equilateral triangle have the same angles but different sizes."],
      ["If $\\triangle ABC \\cong \\triangle XYZ$, which side matches $\\overline{BC}$?", "$\\overline{YZ}$ — match the letters in order."]
    ]
  };

  WORDS.ch5 = {
    sub: "Special segments in triangles and where they meet",
    intro: S`Every triangle has special segments: <b>midsegments, bisectors, medians and altitudes</b>. When three of the same kind are drawn, they always meet at one point — a <b>point of concurrency</b>.`,
    cards: [
      { k: "mid", t: "Midsegment", tag: "defined", see: "Connect the middles of two sides: a shelf halfway up a triangle-shaped frame.", say: "A segment joining the <b>midpoints</b> of two sides. It is <b>parallel</b> to the third side and <b>half</b> as long.", write: "Midsegment $= \\frac12 \\times$ third side." },
      { t: "Perpendicular bisector", tag: "defined", see: "The line of points exactly as far from home as from school.", say: "A line that cuts a segment in half at a <b>right angle</b>. Every point on it is <b>equidistant</b> from the endpoints.", write: "Three of them meet at the <b>circumcenter</b>." },
      { t: "Angle bisector", tag: "defined", see: "Folding an angle exactly in half.", say: "A ray that splits an angle into two equal angles. Every point on it is equidistant from the angle's sides.", write: "Three of them meet at the <b>incenter</b>." },
      { k: "med", t: "Median & altitude", tag: "defined", see: "Median: balance a triangle on a ruler edge along it. Altitude: the straight-down height.", say: "<b>Median</b>: vertex to the midpoint of the opposite side. <b>Altitude</b>: vertex <b>perpendicular</b> to the opposite side.", write: "Medians meet at the <b>centroid</b>; altitudes at the <b>orthocenter</b>." },
      { t: "Point of concurrency", tag: "defined", see: "Three roads that all meet at one roundabout.", say: "A point where <b>three or more lines</b> meet.", write: "Circumcenter, incenter, centroid, orthocenter." },
      { t: "Triangle inequality", tag: "defined", see: "Try to build a triangle from sticks $2$, $3$ and $8$ cm: it won't close.", say: "The sum of any two sides must be <b>greater</b> than the third side.", write: "$a + b > c$, $a + c > b$, $b + c > a$." }
    ],
    table: S`<table class="wtable"><tr><th>Point</th><th>Made by</th><th>Special fact</th></tr>
      <tr><td><b>Circumcenter</b></td><td>perpendicular bisectors</td><td>same distance to all 3 <b>vertices</b> (center of the circle around)</td></tr>
      <tr><td><b>Incenter</b></td><td>angle bisectors</td><td>same distance to all 3 <b>sides</b> (center of the circle inside)</td></tr>
      <tr><td><b>Centroid</b></td><td>medians</td><td>balance point; splits each median $2 : 1$</td></tr>
      <tr><td><b>Orthocenter</b></td><td>altitudes</td><td>can be outside an obtuse triangle</td></tr></table>`,
    tableTitle: "The four centers",
    vocab: ["midsegment", "perpendicular bisector", "equidistant", "angle bisector", "median", "altitude", "point of concurrency", "circumcenter", "incenter", "centroid", "orthocenter", "circumscribed circle", "inscribed circle", "triangle inequality"],
    postTitle: "Theorems — try them",
    posts: [
      ["<b>Midsegment Theorem:</b> parallel to the third side and half as long.", "Measure both with a ruler on any triangle you draw."],
      ["<b>Centroid Theorem:</b> the centroid is $\\frac23$ of the way along each median.", "Cut a cardboard triangle, draw the medians, and balance it on a pencil tip at the centroid."],
      ["<b>Triangle Inequality:</b> any two sides add to more than the third.", "Try straws of lengths $3, 4, 8$ — then $3, 4, 6$."],
      ["<b>Biggest side across from biggest angle.</b>", "Open a pair of scissors wider: the gap between the tips grows."]
    ],
    checks: [
      ["A midsegment is parallel to a side of length $14$. How long is it?", "$7$."],
      ["Can $5$, $6$ and $12$ be the sides of a triangle?", "No: $5 + 6 = 11 < 12$."],
      ["A town wants a fire station the same distance from three villages. Which center?", "The circumcenter."]
    ]
  };

  WORDS.ch6 = {
    sub: "Polygons, their angles, and the quadrilateral family",
    intro: S`Every polygon can be cut into <b>triangles</b>, and that one idea gives all the angle formulas. Then you'll meet the <b>quadrilateral family</b>: each shape inherits the properties of the shapes above it.`,
    cards: [
      { k: "penta", t: "Polygon", tag: "defined", see: "A stop sign (8 sides), a honeycomb cell (6), a home plate (5).", say: "A closed plane figure made of segments that meet only at their endpoints. <b>Regular</b>: all sides and angles equal.", write: "Named by sides: pentagon (5), hexagon (6), octagon (8), $n$-gon." },
      { t: "Interior & exterior angle sums", tag: "defined", see: "Walking all the way around any polygon, you turn exactly once around.", say: "Interior angles add to $(n - 2) \\cdot 180^\\circ$. Exterior angles (one per vertex) always add to $360^\\circ$.", write: "Regular $n$-gon: each interior angle $= \\frac{(n - 2) \\cdot 180^\\circ}{n}$." },
      { k: "para", t: "Parallelogram", tag: "defined", see: "A folding gate; a leaning rectangle.", say: "A quadrilateral with <b>both pairs of opposite sides parallel</b>.", write: "Opposite sides equal, opposite angles equal, diagonals <b>bisect each other</b>." },
      { t: "Rectangle, rhombus, square", tag: "defined", see: "A door, a diamond, a chessboard square.", say: "<b>Rectangle</b>: parallelogram with 4 right angles (diagonals equal). <b>Rhombus</b>: parallelogram with 4 equal sides (diagonals perpendicular). <b>Square</b>: both.", write: "Square ⊂ rectangle, square ⊂ rhombus." },
      { t: "Trapezoid", tag: "defined", see: "A lampshade seen from the side; a bucket.", say: "A quadrilateral with <b>exactly one pair</b> of parallel sides (the <b>bases</b>). Isosceles trapezoid: legs equal.", write: "Midsegment $= \\frac{b_1 + b_2}{2}$." },
      { t: "Kite", tag: "defined", see: "A kite in the sky.", say: "Two pairs of <b>consecutive</b> equal sides. Diagonals are perpendicular.", write: "One pair of opposite angles equal." }
    ],
    vocab: ["polygon", "regular polygon", "convex", "concave", "diagonal", "interior angle sum", "exterior angle sum", "parallelogram", "rectangle", "rhombus", "square", "trapezoid", "bases", "legs", "isosceles trapezoid", "kite", "midsegment of a trapezoid"],
    postTitle: "Theorems — try them",
    posts: [
      ["<b>Polygon Angle Sum:</b> $(n - 2) \\cdot 180^\\circ$.", "Draw a hexagon, draw diagonals from one corner: count the triangles ($6 - 2 = 4$)."],
      ["<b>Exterior Angle Sum:</b> always $360^\\circ$.", "Walk around a pentagon drawn on the playground: you end up facing the way you started."],
      ["<b>Parallelogram diagonals bisect each other.</b>", "Measure from the crossing point to each corner: opposite pieces are equal."],
      ["<b>Rhombus diagonals are perpendicular.</b>", "Fold a paper rhombus along both diagonals: the folds make a right angle."]
    ],
    checks: [
      ["What is the sum of the interior angles of an octagon?", "$(8 - 2) \\cdot 180 = 1080^\\circ$."],
      ["Each exterior angle of a regular polygon is $30^\\circ$. How many sides?", "$360 \\div 30 = 12$."],
      ["Is every rhombus a square?", "No — a rhombus doesn't need right angles. But every square is a rhombus."]
    ]
  };

  WORDS.ch7 = {
    sub: "Ratios, proportions and similar figures",
    intro: S`<b>Similar</b> means same shape, maybe a different size — like a photo and its enlargement. Angles stay the same; lengths are all multiplied by the same <b>scale factor</b>.`,
    cards: [
      { t: "Ratio & proportion", tag: "defined", see: "A recipe: 2 cups flour for every 1 cup sugar.", say: "A <b>ratio</b> compares two numbers. A <b>proportion</b> says two ratios are equal.", write: "$a : b$ or $\\frac{a}{b}$. In $\\frac{a}{b} = \\frac{c}{d}$, cross products are equal: $ad = bc$." },
      { k: "sim", t: "Similar figures", tag: "defined", see: "A map and the real town. A model car and a real car.", say: "Corresponding angles are <b>equal</b> and corresponding sides are <b>proportional</b>.", write: "$\\triangle ABC \\sim \\triangle DEF$ — letters in matching order." },
      { t: "Scale factor", tag: "defined", see: "“1 inch on the map = 10 miles.”", say: "The number $k$ every length is multiplied by.", write: "Lengths × $k$, areas × $k^2$, volumes × $k^3$." },
      { t: "AA, SSS~, SAS~", tag: "defined", see: "Two triangles with the same angles always look like zoomed copies.", say: "<b>AA</b>: two angles equal. <b>SSS~</b>: all sides in the same ratio. <b>SAS~</b>: two sides in ratio and the angle between them equal.", write: "Proves $\\sim$, not $\\cong$." },
      { t: "Side-Splitter", tag: "defined", see: "A shelf parallel to the floor in a triangle-shaped bookcase.", say: "A line parallel to one side of a triangle divides the other two sides <b>proportionally</b>.", write: "$\\frac{AD}{DB} = \\frac{AE}{EC}$." },
      { t: "Geometric mean", tag: "defined", see: "The side of a square with the same area as a rectangle.", say: "The geometric mean of $a$ and $b$ is $\\sqrt{ab}$.", write: "$\\frac{a}{x} = \\frac{x}{b}$, so $x = \\sqrt{ab}$. It appears in right triangles with an altitude." }
    ],
    vocab: ["ratio", "proportion", "extremes", "means", "cross products", "similar", "scale factor", "scale drawing", "AA Similarity", "SSS Similarity", "SAS Similarity", "Side-Splitter Theorem", "geometric mean", "indirect measurement"],
    postTitle: "Theorems — try them",
    posts: [
      ["<b>AA Similarity:</b> two equal angles are enough.", "Stand in the sun next to a flagpole: your shadow triangle and the pole's are similar (same sun angle, both right angles)."],
      ["<b>Area scales by $k^2$.</b>", "Draw a $1 \\times 1$ square and a $2 \\times 2$ square: count the unit squares — $4$, not $2$."],
      ["<b>Side-Splitter Theorem.</b>", "Draw a triangle, a parallel line across it, and measure the four pieces: check the ratios."]
    ],
    checks: [
      ["A $3$-$4$-$5$ triangle is enlarged by scale factor $3$. What is the new hypotenuse?", "$15$."],
      ["Two similar rectangles have scale factor $2$. The small one has area $6$. Big one?", "$6 \\times 2^2 = 24$."],
      ["A $6$ ft person casts a $4$ ft shadow; a tree casts a $20$ ft shadow. How tall is the tree?", "$\\frac{6}{4} = \\frac{h}{20}$, so $h = 30$ ft."]
    ]
  };

  WORDS.ch8 = {
    sub: "The Pythagorean Theorem, special right triangles and trigonometry",
    intro: S`In a right triangle, the sides have <b>names that depend on where you stand</b>. From angle $\\theta$, one leg is <b>opposite</b> you and one is <b>adjacent</b> (next to you); the longest side is always the <b>hypotenuse</b>.`,
    cards: [
      { k: "rt", t: "Hypotenuse, opposite, adjacent", tag: "defined", see: "A ladder against a wall: the ladder is the hypotenuse.", say: "<b>Hypotenuse</b>: the side across from the right angle (longest). <b>Opposite</b>/<b>adjacent</b>: the legs, named from the angle you're using.", write: "Opposite and adjacent swap if you switch to the other acute angle." },
      { t: "Pythagorean Theorem", tag: "theorem", see: "A baseball diamond: home to second base is a diagonal.", say: "In a right triangle, the squares on the legs add up to the square on the hypotenuse.", write: "$a^2 + b^2 = c^2$. Triples: $3\\text{-}4\\text{-}5$, $5\\text{-}12\\text{-}13$, $8\\text{-}15\\text{-}17$." },
      { t: "45-45-90 triangle", tag: "defined", see: "Half of a square, cut on the diagonal.", say: "Legs equal; hypotenuse $=$ leg $\\times \\sqrt2$.", write: "$1 : 1 : \\sqrt2$." },
      { t: "30-60-90 triangle", tag: "defined", see: "Half of an equilateral triangle.", say: "Short leg $s$, long leg $s\\sqrt3$, hypotenuse $2s$.", write: "$1 : \\sqrt3 : 2$." },
      { t: "Sine, cosine, tangent", tag: "defined", see: "The steepness of a ramp only depends on its angle, not its size.", say: "Ratios of sides in a right triangle, for an acute angle $\\theta$.", write: "$\\sin\\theta = \\frac{\\text{opp}}{\\text{hyp}}$, $\\cos\\theta = \\frac{\\text{adj}}{\\text{hyp}}$, $\\tan\\theta = \\frac{\\text{opp}}{\\text{adj}}$ — SOH-CAH-TOA." },
      { t: "Angles of elevation & depression", tag: "defined", see: "Looking <b>up</b> at a kite (elevation) or <b>down</b> from a cliff at a boat (depression).", say: "Angles measured from the <b>horizontal</b> line of sight.", write: "The angle of elevation from A to B equals the angle of depression from B to A." }
    ],
    vocab: ["right triangle", "legs", "hypotenuse", "Pythagorean Theorem", "Pythagorean triple", "converse of the Pythagorean Theorem", "45-45-90 triangle", "30-60-90 triangle", "opposite side", "adjacent side", "sine", "cosine", "tangent", "inverse trig", "angle of elevation", "angle of depression"],
    postTitle: "Theorems — try them",
    posts: [
      ["<b>Pythagorean Theorem.</b>", "Cut out squares of $3 \\times 3$ and $4 \\times 4$ grid paper: together they cover a $5 \\times 5$ square ($9 + 16 = 25$)."],
      ["<b>Converse:</b> if $a^2 + b^2 = c^2$, the triangle is right.", "Builders tie knots at $3$, $4$ and $5$ units on a rope to make a perfect corner."],
      ["<b>Trig ratios depend only on the angle.</b>", "Draw two right triangles with the same $30^\\circ$ angle, one big, one small: opposite ÷ hypotenuse is $0.5$ in both."]
    ],
    checks: [
      ["Legs $6$ and $8$. Hypotenuse?", "$10$ (a $3$-$4$-$5$ triangle doubled)."],
      ["A 30-60-90 triangle has hypotenuse $10$. Short leg? Long leg?", "Short leg $5$, long leg $5\\sqrt3$."],
      ["From angle $A$, opposite $= 3$ and hypotenuse $= 5$. What is $\\cos A$?", "Adjacent $= 4$, so $\\cos A = \\frac45$."]
    ]
  };

  WORDS.ch9 = {
    sub: "Moving figures: translations, reflections, rotations and dilations",
    intro: S`A <b>transformation</b> moves a figure (the <b>preimage</b>) to a new position (the <b>image</b>). Slides, flips and turns keep size and shape — they are <b>rigid motions</b>. A dilation changes the size.`,
    cards: [
      { t: "Translation", tag: "defined", see: "Sliding a book across a table without turning it.", say: "Every point moves the <b>same distance in the same direction</b>.", write: "$(x, y) \\to (x + a, y + b)$." },
      { k: "refl", t: "Reflection", tag: "defined", see: "Your reflection in a mirror; a butterfly's wings.", say: "A flip over a <b>line of reflection</b>. Each point and its image are the same distance from the line.", write: "Over the $x$-axis: $(x, -y)$. Over the $y$-axis: $(-x, y)$. Over $y = x$: $(y, x)$." },
      { t: "Rotation", tag: "defined", see: "The hands of a clock; a Ferris wheel.", say: "A turn around a <b>center</b> by an angle (counterclockwise is positive).", write: "$90^\\circ$: $(-y, x)$. $180^\\circ$: $(-x, -y)$. $270^\\circ$: $(y, -x)$." },
      { t: "Dilation", tag: "defined", see: "Zooming a photo in or out.", say: "Resizing from a <b>center</b> by a scale factor $k$. Shape stays, size changes.", write: "From the origin: $(x, y) \\to (kx, ky)$. $k > 1$ enlarges, $0 < k < 1$ shrinks." },
      { t: "Composition", tag: "defined", see: "Slide, then flip: footprints in the sand.", say: "Doing one transformation <b>after</b> another.", write: "A glide reflection = translation + reflection." },
      { t: "Symmetry", tag: "defined", see: "A snowflake, a starfish, the letter A.", say: "<b>Line symmetry</b>: a reflection maps the figure onto itself. <b>Rotational symmetry</b>: a rotation less than $360^\\circ$ does.", write: "A regular hexagon has 6 lines of symmetry and rotational symmetry of $60^\\circ$." }
    ],
    vocab: ["transformation", "preimage", "image", "prime notation", "rigid motion", "translation", "vector", "reflection", "line of reflection", "rotation", "center of rotation", "angle of rotation", "dilation", "scale factor", "composition", "glide reflection", "line symmetry", "rotational symmetry"],
    postTitle: "Big ideas — try them",
    posts: [
      ["<b>Rigid motions preserve distance and angle measure.</b>", "Trace a triangle, then slide, flip and turn the paper: the triangle never changes size."],
      ["<b>Two reflections over parallel lines = a translation.</b>", "Flip tracing paper over one line, then another parallel line: the figure just slid."],
      ["<b>Two reflections over intersecting lines = a rotation.</b>", "Same experiment with crossing lines: the figure turned."]
    ],
    checks: [
      ["Reflect $(3, -2)$ over the $y$-axis.", "$(-3, -2)$."],
      ["Rotate $(4, 1)$ by $90^\\circ$ counterclockwise about the origin.", "$(-1, 4)$."],
      ["Is a dilation a rigid motion?", "No — it changes size (unless $k = 1$)."]
    ]
  };

  WORDS.ch10 = {
    sub: "Parts of a circle, angles and arcs, and the circle equation",
    intro: S`A <b>circle</b> is all the points in a plane at the same distance from a center. Most circle facts come from comparing an angle with the <b>arc</b> it cuts off.`,
    cards: [
      { k: "circ", t: "Radius, diameter, chord", tag: "defined", see: "Spokes of a bike wheel (radii). A pizza cut straight across (a chord).", say: "<b>Radius</b>: center to circle. <b>Chord</b>: segment with both ends on the circle. <b>Diameter</b>: a chord through the center.", write: "$d = 2r$." },
      { t: "Tangent & secant", tag: "defined", see: "A wheel touching the road at one point (tangent). A straw through a donut (secant).", say: "<b>Tangent</b>: a line that touches the circle at exactly one point. <b>Secant</b>: a line that crosses the circle at two points.", write: "A tangent is perpendicular to the radius at the point of tangency." },
      { t: "Central angle & arc", tag: "defined", see: "A pizza slice: the angle at the center and the crust edge.", say: "A <b>central angle</b> has its vertex at the center. Its <b>arc</b> has the same degree measure.", write: "Minor arc $\\overset{\\frown}{AB}$ (less than $180^\\circ$); major arc $\\overset{\\frown}{ACB}$." },
      { t: "Inscribed angle", tag: "defined", see: "Watching a stage from a seat on a round theater's wall.", say: "An angle with its vertex <b>on</b> the circle and sides that are chords.", write: "Inscribed angle $= \\frac12$ its intercepted arc." },
      { t: "Arc length & sector", tag: "defined", see: "The crust length and the size of one pizza slice.", say: "Fractions of the circumference and of the area.", write: "Arc length $= \\frac{\\theta}{360} \\cdot 2\\pi r$; sector area $= \\frac{\\theta}{360} \\cdot \\pi r^2$." },
      { t: "Equation of a circle", tag: "defined", see: "Every point on a sprinkler's spray edge is the same distance from the sprinkler.", say: "Center $(h, k)$, radius $r$.", write: "$(x - h)^2 + (y - k)^2 = r^2$." }
    ],
    vocab: ["circle", "center", "radius", "diameter", "chord", "secant", "tangent", "point of tangency", "central angle", "minor arc", "major arc", "semicircle", "inscribed angle", "intercepted arc", "circumference", "arc length", "sector", "standard form of a circle"],
    postTitle: "Theorems — try them",
    posts: [
      ["<b>Inscribed Angle Theorem:</b> half the arc.", "Draw a central angle and an inscribed angle on the same arc and measure: the inscribed one is half."],
      ["<b>An angle inscribed in a semicircle is $90^\\circ$.</b>", "Put the corner of a sheet of paper inside a circle with two edges touching the ends of a diameter — the corner lands on the circle."],
      ["<b>Tangent ⊥ radius.</b>", "Lay a ruler touching a coin: the line from the coin's center to the touching point meets the ruler at a right angle."],
      ["<b>Two tangents from one point are equal.</b>", "Like the two straps of a backpack hanging from your shoulder."]
    ],
    checks: [
      ["An inscribed angle intercepts a $100^\\circ$ arc. Its measure?", "$50^\\circ$."],
      ["Center $(2, -1)$, radius $3$. Equation?", "$(x - 2)^2 + (y + 1)^2 = 9$."],
      ["Arc length of a $90^\\circ$ arc in a circle of radius $4$?", "$\\frac14 \\cdot 8\\pi = 2\\pi$."]
    ]
  };

  WORDS.ch11 = {
    sub: "Area formulas and where they come from",
    intro: S`<b>Area</b> counts square units inside a figure. Almost every area formula comes from the <b>rectangle</b>: cut a shape apart and rearrange the pieces into a rectangle.`,
    cards: [
      { k: "area", t: "Base & height", tag: "defined", see: "The height of a tent is straight up from the floor, not along the slanted side.", say: "The <b>height</b> is always <b>perpendicular</b> to the base.", write: "Mark it with a small right-angle square." },
      { t: "Triangle & parallelogram", tag: "defined", see: "Cut a parallelogram's corner and slide it over: a rectangle. Two copies of a triangle make a parallelogram.", say: "Parallelogram: $A = bh$. Triangle: half of that.", write: "$A = \\frac12 bh$." },
      { t: "Trapezoid, rhombus, kite", tag: "defined", see: "Two copies of a trapezoid (one flipped) make a parallelogram.", say: "Trapezoid: average of the bases times the height. Rhombus & kite: half the product of the diagonals.", write: "$A = \\frac12(b_1 + b_2)h$; $A = \\frac12 d_1 d_2$." },
      { t: "Circle", tag: "defined", see: "Cut a pizza into many thin slices and line them up head-to-tail: almost a rectangle.", say: "The rectangle is half the circumference long and $r$ tall.", write: "$A = \\pi r^2$, $C = 2\\pi r$." },
      { t: "Regular polygon & apothem", tag: "defined", see: "A hexagon is 6 equal triangles around a center.", say: "The <b>apothem</b> $a$ is the distance from the center to a side.", write: "$A = \\frac12 a P$ ($P$ = perimeter)." },
      { t: "Shaded regions", tag: "defined", see: "A picture frame: the frame's area is the big rectangle minus the picture.", say: "Find the area of the whole and subtract the parts that aren't shaded.", write: "Whole $-$ part." }
    ],
    vocab: ["area", "base", "height", "parallelogram area", "triangle area", "trapezoid area", "diagonal", "circumference", "pi", "circle area", "apothem", "regular polygon area", "composite figure", "shaded region", "ratio of areas"],
    postTitle: "Where the formulas come from — try them",
    posts: [
      ["<b>Parallelogram → rectangle.</b>", "Cut a paper parallelogram along a height and move the triangle to the other side."],
      ["<b>Two triangles make a parallelogram.</b>", "Cut out two identical triangles and fit them together."],
      ["<b>Circle → rectangle.</b>", "Cut a paper circle into 16 slices and arrange them in a row, alternating up and down."],
      ["<b>Similar figures: area ratio $= k^2$.</b>", "Draw a triangle on grid paper, then the same triangle twice as big: count the squares."]
    ],
    checks: [
      ["A trapezoid has bases $6$ and $10$ and height $4$. Area?", "$\\frac12(6 + 10) \\cdot 4 = 32$."],
      ["Why can't you use the slanted side of a parallelogram as the height?", "The height must be perpendicular to the base; the slanted side is longer than the height."],
      ["Area of a circle with diameter $10$?", "$r = 5$, so $25\\pi$."]
    ]
  };

  WORDS.ch12 = {
    sub: "Solids: faces, nets, surface area and volume",
    intro: S`<b>Surface area</b> is the wrapping paper on a solid. <b>Volume</b> is how much it holds. Prisms and cylinders are “stacks” of their base; pyramids and cones are exactly $\\frac13$ of the stack.`,
    cards: [
      { k: "solid", t: "Prism & cylinder", tag: "defined", see: "A cereal box (prism), a soup can (cylinder).", say: "Two parallel, congruent <b>bases</b> connected by side faces (or a curved side).", write: "$V = Bh$ ($B$ = area of the base)." },
      { t: "Pyramid & cone", tag: "defined", see: "The pyramids of Egypt; an ice-cream cone.", say: "One base and a point at the top (the <b>apex</b>).", write: "$V = \\frac13 Bh$." },
      { t: "Sphere", tag: "defined", see: "A ball, a bubble.", say: "All points in space at distance $r$ from a center.", write: "$V = \\frac43\\pi r^3$, $SA = 4\\pi r^2$." },
      { t: "Net", tag: "defined", see: "A cereal box cut open and laid flat.", say: "A flat pattern that folds into a solid.", write: "Surface area = total area of the net." },
      { t: "Height vs. slant height", tag: "defined", see: "A tent: the pole is the height; the slanted fabric is the slant height.", say: "<b>Height</b>: straight up from the base (for volume). <b>Slant height</b>: along the side (for lateral area).", write: "$h$ vs. $\\ell$." },
      { t: "Faces, edges, vertices", tag: "defined", see: "A die: 6 faces, 12 edges, 8 corners.", say: "Flat surfaces, the segments where they meet, and the corner points.", write: "Euler's formula: $F + V = E + 2$." }
    ],
    vocab: ["polyhedron", "face", "edge", "vertex", "net", "cross section", "prism", "cylinder", "pyramid", "cone", "sphere", "hemisphere", "base area", "height", "slant height", "lateral area", "surface area", "volume", "Cavalieri's Principle", "similar solids"],
    postTitle: "Big ideas — try them",
    posts: [
      ["<b>Cone $= \\frac13$ of a cylinder</b> with the same base and height.", "Fill a paper cone with rice and pour it into a matching cylinder: it takes 3 cones."],
      ["<b>Cavalieri's Principle:</b> same cross-section areas → same volume.", "Push a stack of coins so it leans: same coins, same volume."],
      ["<b>Euler's formula:</b> $F + V = E + 2$.", "Count on a cube: $6 + 8 = 12 + 2$."],
      ["<b>Similar solids: volume ratio $= k^3$.</b>", "Build a $2 \\times 2 \\times 2$ cube from unit cubes: it takes $8$."]
    ],
    checks: [
      ["A cylinder has $r = 3$ and $h = 5$. Volume?", "$\\pi \\cdot 9 \\cdot 5 = 45\\pi$."],
      ["A cone has the same base and height as that cylinder. Volume?", "$15\\pi$."],
      ["Two similar boxes have scale factor $3$. How many times more does the big one hold?", "$27$ times."]
    ]
  };

  WORDS.ch13 = {
    sub: "Outcomes, counting, and probability",
    intro: S`<b>Probability</b> measures how likely something is, from $0$ (impossible) to $1$ (certain). Most of the work is <b>counting carefully</b>: how many outcomes are favorable, and how many are possible.`,
    cards: [
      { t: "Outcome, event, sample space", tag: "defined", see: "Rolling a die: the outcomes are $1$ to $6$; “rolling an even number” is an event.", say: "<b>Outcome</b>: one possible result. <b>Sample space</b>: all outcomes. <b>Event</b>: a set of outcomes.", write: "$S = \\{1, 2, 3, 4, 5, 6\\}$; $E = \\{2, 4, 6\\}$." },
      { t: "Probability", tag: "defined", see: "A bag with 3 red and 7 blue marbles.", say: "Favorable outcomes divided by all outcomes (when all are equally likely).", write: "$P(\\text{red}) = \\frac{3}{10}$. Complement: $P(\\text{not } A) = 1 - P(A)$." },
      { k: "tree", t: "Counting principle", tag: "defined", see: "3 shirts and 4 pants make $12$ outfits.", say: "Multiply the number of choices at each step.", write: "A tree diagram shows every path." },
      { t: "Permutation", tag: "defined", see: "Choosing a president, vice president and secretary: order matters.", say: "An arrangement where <b>order matters</b>.", write: "$_nP_r = \\frac{n!}{(n - r)!}$." },
      { t: "Combination", tag: "defined", see: "Choosing 3 friends to invite: order doesn't matter.", say: "A selection where <b>order doesn't matter</b>.", write: "$_nC_r = \\frac{n!}{r!(n - r)!}$." },
      { t: "Independent & conditional", tag: "defined", see: "Two coin flips (independent). Drawing two cards without putting the first back (dependent).", say: "<b>Independent</b>: one doesn't change the other. <b>Conditional</b>: probability of $B$ given that $A$ happened.", write: "$P(A \\text{ and } B) = P(A) \\cdot P(B)$ if independent; $P(B \\mid A) = \\frac{P(A \\text{ and } B)}{P(A)}$." }
    ],
    vocab: ["outcome", "sample space", "event", "probability", "complement", "theoretical probability", "experimental probability", "counting principle", "factorial", "permutation", "combination", "independent events", "dependent events", "mutually exclusive", "conditional probability", "two-way table", "tree diagram"],
    postTitle: "Big ideas — try them",
    posts: [
      ["<b>Experimental → theoretical.</b>", "Flip a coin 10 times, then 100 times: the fraction of heads gets closer to $\\frac12$."],
      ["<b>Order matters?</b> Permutation. <b>Doesn't?</b> Combination.", "List the ways to pick 2 of A, B, C: AB, AC, BC (3 combinations) vs. AB, BA, AC, CA, BC, CB (6 permutations)."],
      ["<b>Addition Rule:</b> $P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)$.", "Count students who play soccer or basketball: don't count the ones who play both twice."]
    ],
    checks: [
      ["A die is rolled. $P(\\text{greater than } 4)$?", "$\\frac{2}{6} = \\frac13$."],
      ["How many ways can 5 runners finish 1st, 2nd and 3rd?", "$5 \\cdot 4 \\cdot 3 = 60$ (a permutation)."],
      ["How many ways to choose 2 toppings from 6?", "$_6C_2 = 15$."]
    ]
  };


  /* ---------- "Your turn — on paper first": fill-in questions after the concept cards ---------- */
  const OL = t => `\\overleftrightarrow{${t}}`, OR = t => `\\overrightarrow{${t}}`, SG = t => `\\overline{${t}}`;
  const PL = t => `\\text{plane } ${t}`;
  WORDS.ch1.inLesson = "terms";   // shown as the lesson for section 1.1, not as a separate card
  WORDS.ch1.groups = [
    { title: "Point, line, plane — the three building blocks", cards: [0, 1, 2],
      tries: { fig: `<svg viewBox="0 0 230 110" role="img" aria-label="plane P with line through A and B, point C in the plane and point E above"><defs><marker id="wa2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="${teal}"/></marker></defs><polygon points="20,100 170,100 215,50 65,50" fill="#DDF0EE" stroke="${teal}" stroke-width="2"/><line x1="38" y1="88" x2="196" y2="62" stroke="${teal}" stroke-width="3" marker-start="url(#wa2)" marker-end="url(#wa2)"/>${dot(75, 82, "A", 16)}${dot(150, 69.6, "B", 16)}${dot(120, 92, "C", 14)}${dot(170, 18, "E", -8)}<line x1="170" y1="18" x2="170" y2="66" stroke="#94A3B8" stroke-dasharray="3 3"/><text x="205" y="94" font-family="Fraunces,serif" font-size="16" font-style="italic" fill="${teal}">P</text><text x="198" y="58" font-family="Inter,sans-serif" font-size="13" font-style="italic" fill="${teal}">ℓ</text></svg>`,
        qs: [
          { q: "Name the line $\\ell$ in <b>two different ways</b>.", n: 2, opts: [OL("AB"), OL("BA"), "\\text{line } \\ell", OR("AB"), SG("AB"), OL("AC")],
            ok: s => s.every(x => [OL("AB"), OL("BA"), "\\text{line } \\ell"].includes(x)) && s[0] !== s[1],
            sol: "Any two of $\\overleftrightarrow{AB}$, $\\overleftrightarrow{BA}$, line $\\ell$. A line gets a two-arrow bar. $C$ is in the plane but <b>not on</b> the line, so $\\overleftrightarrow{AC}$ is a different line." },
          { q: "Name plane $\\mathcal{P}$ using <b>three of its points</b>.", n: 1, opts: [PL("ABC"), PL("ABE"), PL("AB"), PL("BCE")],
            ok: s => s[0] === PL("ABC"), sol: "Plane $ABC$. You need three points that are <b>in</b> the plane and not all on one line. $E$ is above the plane, and two points aren't enough." },
          { q: "Which point is <b>not</b> in plane $\\mathcal{P}$?", n: 1, opts: ["A", "B", "C", "E"],
            ok: s => s[0] === "E", sol: "$E$ — it floats above the plane (the dashed line shows it is not on the flat surface)." }
        ] } },
    { title: "Segment, ray, angle — pieces of a line", cards: [3, 4, 5],
      tries: { fig: svg(`<line x1="14" y1="58" x2="216" y2="58" stroke="${teal}" stroke-width="3" marker-start="url(#wa)" marker-end="url(#wa)"/><line x1="105" y1="58" x2="176" y2="4" stroke="#6A4BD8" stroke-width="3" marker-end="url(#wa)"/>${dot(45, 58, "A", 16)}${dot(105, 58, "B", 16)}${dot(170, 58, "C", 16)}${dot(150, 24, "D", -8)}`, "line through A, B, C and a ray from B through D").replace('viewBox="0 0 230 70"', 'viewBox="0 0 230 80"'),
        qs: [
          { q: "Name the ray that starts at $B$ and passes through $D$.", n: 1, opts: [OR("BD"), OR("DB"), OL("BD"), SG("BD")],
            ok: s => s[0] === OR("BD"), sol: "$\\overrightarrow{BD}$ — the <b>endpoint comes first</b>. $\\overrightarrow{DB}$ would start at $D$ and point the other way." },
          { q: "Name two <b>opposite rays</b> with endpoint $B$.", n: 2, opts: [OR("BA"), OR("BC"), OR("AB"), OR("CB"), OR("BD")],
            ok: s => s.slice().sort().join() === [OR("BA"), OR("BC")].sort().join(), sol: "$\\overrightarrow{BA}$ and $\\overrightarrow{BC}$: same endpoint $B$, opposite directions along one line." },
          { q: "Name the angle formed by $\\overrightarrow{BD}$ and $\\overrightarrow{BC}$.", n: 1, opts: ["\\angle DBC", "\\angle BDC", "\\angle BCD", "\\angle DCB"],
            ok: s => s[0] === "\\angle DBC", sol: "$\\angle DBC$ (or $\\angle CBD$): the vertex $B$ is always the <b>middle</b> letter." }
        ] } },
    { title: "Collinear, coplanar, intersection — how figures meet", cards: [6, 7],
      tries: { fig: svg(`<line x1="14" y1="50" x2="216" y2="50" stroke="${teal}" stroke-width="3" marker-start="url(#wa)" marker-end="url(#wa)"/><line x1="37" y1="5" x2="166" y2="63.6" stroke="#6A4BD8" stroke-width="2.5"/>${dot(40, 50, "A", 16)}${dot(136, 50, "B", -8)}${dot(190, 50, "C", -8)}${dot(70, 20, "D", 16)}<text x="208" y="42" font-family="Inter,sans-serif" font-size="13" font-style="italic" fill="${teal}">ℓ</text><text x="22" y="12" font-family="Inter,sans-serif" font-size="13" font-style="italic" fill="#6A4BD8">m</text>`, "line l through A, B, C; line m through D and B").replace('viewBox="0 0 230 70"', 'viewBox="0 0 230 74"'),
        qs: [
          { q: "Name <b>three collinear</b> points.", n: 1, opts: ["A, B, C", "A, B, D", "B, C, D", "A, C, D"],
            ok: s => s[0] === "A, B, C", sol: "$A$, $B$, $C$ all lie on line $\\ell$." },
          { q: "Which point is <b>not</b> collinear with $A$ and $C$?", n: 1, opts: ["A", "B", "C", "D"],
            ok: s => s[0] === "D", sol: "$D$ is not on line $\\ell$ (it's on line $m$)." },
          { q: "Lines $\\ell$ and $m$ intersect at which point?", n: 1, opts: ["A", "B", "C", "D"],
            ok: s => s[0] === "B", sol: "$B$ — the one point on <b>both</b> lines. Two lines meet in at most one point." }
        ] } }
  ];

  /* ---------- Ch 2–13: concepts in groups, definitions on click, 3 paper-first questions per group ---------- */
  const TX = s => `\\text{${s}}`, ONE = v => s => s[0] === v, DG = v => `${v}^\\circ`;
  const G = (title, cards, qs, fig) => ({ title, cards, tries: { fig: fig || "", qs } });
  const Q1 = (q, ans, wrong, sol) => ({ q, n: 1, opts: [ans, ...wrong].sort(), ok: ONE(ans), sol });

  WORDS.ch2.groups = [
    G("If–then statements", [0, 1, 2], [
      Q1("Statement: “If an angle is a right angle, then it measures $90^\\circ$.” What is the <b>hypothesis</b>?", TX("an angle is a right angle"), [TX("it measures 90°"), TX("an angle measures 90°"), TX("it is not a right angle")], "The hypothesis is the part right after <b>if</b>: “an angle is a right angle.”"),
      Q1("Write the <b>converse</b> of “If it is a dog, then it has 4 legs.”", TX("If it has 4 legs, then it is a dog."), [TX("If it is not a dog, then it does not have 4 legs."), TX("If it does not have 4 legs, then it is not a dog."), TX("If it is a dog, then it does not have 4 legs.")], "The converse <b>swaps</b> the two parts. (It is false — a cat has 4 legs too.)"),
      Q1("Which statement is the <b>contrapositive</b> of “If it is a dog, then it has 4 legs”?", TX("If it does not have 4 legs, then it is not a dog."), [TX("If it has 4 legs, then it is a dog."), TX("If it is not a dog, then it does not have 4 legs."), TX("It is a dog if and only if it has 4 legs.")], "Swap <b>and</b> negate. The contrapositive is true whenever the original is true.")
    ]),
    G("Two ways to reason", [4, 3, 5], [
      Q1("You notice $2, 4, 8, 16$ and guess the next number is $32$. What kind of reasoning is that?", TX("inductive"), [TX("deductive"), TX("a proof"), TX("a counterexample")], "Guessing from a pattern is <b>inductive</b> reasoning. It makes a conjecture, not a proof."),
      Q1("Find a <b>counterexample</b> to “Every prime number is odd.”", "2", ["3", "9", "15"], "$2$ is prime and even, so it breaks the statement. ($9$ and $15$ aren't prime; $3$ is odd.)"),
      Q1("“If two angles are vertical, they are congruent.” $\\angle 1$ and $\\angle 2$ are vertical. What can you conclude?", "\\angle 1 \\cong \\angle 2", ["\\angle 1 + \\angle 2 = 180^\\circ", TX("nothing"), "\\angle 1 \\perp \\angle 2"], "Law of Detachment: the hypothesis is true, so the conclusion is true. That's <b>deductive</b> reasoning.")
    ]),
    G("Theorems & proofs", [6], [
      Q1("Which property: if $AB = CD$, then $CD = AB$?", TX("Symmetric Property"), [TX("Reflexive Property"), TX("Transitive Property"), TX("Substitution Property")], "Flipping the two sides of an equation is the <b>Symmetric</b> Property."),
      Q1("Which reason takes you from $x + 5 = 12$ to $x = 7$?", TX("Subtraction Property of Equality"), [TX("Addition Property of Equality"), TX("Division Property of Equality"), TX("Reflexive Property")], "You subtracted $5$ from both sides."),
      Q1("In a proof, $\\overline{AC} \\cong \\overline{AC}$ (a side shared by two triangles). What is the reason?", TX("Reflexive Property"), [TX("Symmetric Property"), TX("Transitive Property"), TX("Given")], "Anything is congruent to itself: <b>Reflexive</b>.")
    ])
  ];
  WORDS.ch3.groups = [
    G("Parallel, perpendicular, skew", [0, 1, 2], [
      Q1("Two edges of a box never meet and no face of the box contains both. They are…", TX("skew"), [TX("parallel"), TX("perpendicular"), TX("intersecting")], "Not coplanar and never meet: <b>skew</b>."),
      Q1("How do you write “line $\\ell$ is perpendicular to line $m$”?", "\\ell \\perp m", ["\\ell \\parallel m", "\\ell \\cong m", "\\ell = m"], "$\\perp$ means perpendicular; $\\parallel$ means parallel."),
      Q1("Two coplanar lines never intersect. They are…", TX("parallel"), [TX("skew"), TX("perpendicular"), TX("collinear")], "Coplanar + never meet = <b>parallel</b>.")
    ]),
    G("A transversal and its angle pairs", [3, 4, 5, 6], [
      Q1("Angles in the <b>same position</b> at each crossing are called…", TX("corresponding angles"), [TX("alternate interior angles"), TX("same-side interior angles"), TX("vertical angles")], "Same corner, two crossings: <b>corresponding</b>."),
      Q1("$\\ell \\parallel m$. Alternate interior angles: one is $65^\\circ$. The other is…", DG(65), [DG(115), DG(25), DG(130)], "Alternate interior angles are <b>congruent</b> when the lines are parallel."),
      Q1("$\\ell \\parallel m$. Same-side interior angles: one is $65^\\circ$. The other is…", DG(115), [DG(65), DG(25), DG(130)], "Same-side interior angles are <b>supplementary</b>: $180 - 65 = 115$.")
    ]),
    G("Slopes of parallel & perpendicular lines", [7], [
      Q1("A line has slope $\\tfrac23$. A <b>parallel</b> line has slope…", "\\tfrac23", ["-\\tfrac32", "\\tfrac32", "-\\tfrac23"], "Parallel lines have the <b>same</b> slope."),
      Q1("A line has slope $\\tfrac23$. A <b>perpendicular</b> line has slope…", "-\\tfrac32", ["\\tfrac23", "\\tfrac32", "-\\tfrac23"], "Flip and change the sign: $-\\tfrac32$."),
      Q1("The slopes of two perpendicular lines multiply to…", "-1", ["1", "0", TX("the same number")], "$\\tfrac23 \\cdot \\left(-\\tfrac32\\right) = -1$.")
    ])
  ];
  WORDS.ch4.groups = [
    G("Triangle parts & angles", [0, 1], [
      Q1("Two angles of a triangle are $50^\\circ$ and $60^\\circ$. The third angle is…", DG(70), [DG(110), DG(80), DG(60)], "$180 - 50 - 60 = 70$."),
      Q1("Remote interior angles $40^\\circ$ and $75^\\circ$. The exterior angle is…", DG(115), [DG(65), DG(35), DG(140)], "Exterior angle = sum of the two remote interior angles: $40 + 75 = 115$."),
      Q1("In $\\triangle ABC$, which angle is <b>included</b> between $\\overline{AB}$ and $\\overline{BC}$?", "\\angle B", ["\\angle A", "\\angle C", TX("none")], "The included angle is at the vertex the two sides share: $B$.")
    ]),
    G("Congruent figures & CPCTC", [2, 5], [
      Q1("$\\triangle ABC \\cong \\triangle XYZ$. Which side matches $\\overline{BC}$?", "\\overline{YZ}", ["\\overline{XY}", "\\overline{XZ}", "\\overline{ZY}\\ \\text{and}\\ \\overline{XY}"], "2nd and 3rd letters match: $\\overline{BC} \\leftrightarrow \\overline{YZ}$."),
      Q1("$\\triangle ABC \\cong \\triangle XYZ$. Which angle matches $\\angle A$?", "\\angle X", ["\\angle Y", "\\angle Z", "\\angle B"], "1st letter with 1st letter."),
      Q1("When can you use CPCTC?", TX("after proving the triangles congruent"), [TX("as the first step"), TX("to prove the triangles congruent"), TX("only for right triangles")], "Prove the triangles congruent first; then matching parts follow.")
    ]),
    G("Isosceles & equilateral", [3, 4], [
      Q1("An isosceles triangle has a vertex angle of $40^\\circ$. Each base angle is…", DG(70), [DG(40), DG(140), DG(50)], "$(180 - 40) \\div 2 = 70$."),
      Q1("Each angle of an equilateral triangle measures…", DG(60), [DG(90), DG(45), DG(180)], "$180 \\div 3 = 60$."),
      Q1("In an isosceles triangle, the base angles are opposite the…", TX("congruent sides (legs)"), [TX("base"), TX("vertex angle"), TX("longest side")], "Base Angles Theorem: angles opposite congruent sides are congruent.")
    ])
  ];
  WORDS.ch5.groups = [
    G("Special segments", [0, 1, 2, 3], [
      Q1("A midsegment is parallel to the third side, and its length is…", TX("half the third side"), [TX("twice the third side"), TX("equal to the third side"), TX("half of a side it touches")], "Midsegment = $\\tfrac12$ of the parallel side."),
      Q1("Every point on the perpendicular bisector of $\\overline{AB}$ is…", TX("the same distance from A and B"), [TX("the midpoint of AB"), TX("on AB"), TX("closer to A")], "That's the Perpendicular Bisector Theorem."),
      Q1("A segment from a vertex to the midpoint of the opposite side is a(n)…", TX("median"), [TX("altitude"), TX("angle bisector"), TX("midsegment")], "Median → midpoint. Altitude → perpendicular to the opposite side.")
    ]),
    G("Points of concurrency", [4], [
      Q1("The three medians meet at the…", TX("centroid"), [TX("circumcenter"), TX("incenter"), TX("orthocenter")], "Medians → <b>centroid</b> (the balance point)."),
      Q1("The perpendicular bisectors meet at the…", TX("circumcenter"), [TX("centroid"), TX("incenter"), TX("orthocenter")], "It's the center of the circle through all three vertices."),
      Q1("$G$ is the centroid and median $\\overline{AM}$ has $GM = 4$. Then $AG = $", "8", ["4", "12", "2"], "The centroid splits a median $2 : 1$: $AG = 2 \\cdot GM = 8$.")
    ]),
    G("Triangle inequality", [5], [
      Q1("Which three lengths can form a triangle?", "4, 5, 8", ["2, 3, 6", "1, 2, 3", "5, 5, 11"], "The two shorter sides must add to <b>more</b> than the longest: $4 + 5 > 8$."),
      Q1("Two sides are $5$ and $9$. The third side must be between…", "4\\ \\text{and}\\ 14", ["5\\ \\text{and}\\ 9", "0\\ \\text{and}\\ 14", "4\\ \\text{and}\\ 9"], "Difference $< x <$ sum: $4 < x < 14$."),
      Q1("In $\\triangle ABC$, $AB = 3$, $BC = 7$, $AC = 5$. The largest angle is…", "\\angle A", ["\\angle B", "\\angle C", TX("all equal")], "The largest angle is opposite the longest side $\\overline{BC}$: $\\angle A$.")
    ])
  ];
  WORDS.ch6.groups = [
    G("Polygons and their angles", [0, 1], [
      Q1("The interior angles of a hexagon add to…", DG(720), [DG(360), DG(540), DG(1080)], "$(n - 2) \\cdot 180 = 4 \\cdot 180 = 720$."),
      Q1("The exterior angles of <b>any</b> convex polygon add to…", DG(360), [DG(180), DG(540), TX("depends on n")], "Walk around the polygon: you turn one full circle."),
      Q1("Each interior angle of a regular octagon is…", DG(135), [DG(45), DG(120), DG(150)], "Exterior $= 360 \\div 8 = 45$, interior $= 180 - 45 = 135$.")
    ]),
    G("Parallelograms & special ones", [2, 3], [
      Q1("In a parallelogram, the diagonals…", TX("bisect each other"), [TX("are always congruent"), TX("are always perpendicular"), TX("bisect the angles")], "Bisecting each other is true for <b>every</b> parallelogram."),
      Q1("Which shape has congruent diagonals (always)?", TX("rectangle"), [TX("rhombus"), TX("parallelogram"), TX("kite")], "Rectangle (and square)."),
      Q1("Parallelogram $ABCD$ with $m\\angle A = 70^\\circ$. Then $m\\angle B = $", DG(110), [DG(70), DG(20), DG(140)], "Consecutive angles are supplementary.")
    ]),
    G("Trapezoids & kites", [4, 5], [
      Q1("A trapezoid has bases $8$ and $14$. Its midsegment is…", "11", ["22", "6", "3"], "Average of the bases: $(8 + 14) \\div 2 = 11$."),
      Q1("The base angles of an <b>isosceles</b> trapezoid are…", TX("congruent"), [TX("supplementary"), TX("right angles"), TX("complementary")], "Each pair of base angles is congruent."),
      Q1("The diagonals of a kite are…", TX("perpendicular"), [TX("congruent"), TX("parallel"), TX("bisected by each other")], "Kite diagonals meet at right angles.")
    ])
  ];
  WORDS.ch7.groups = [
    G("Ratios & similar figures", [0, 1, 2], [
      Q1("Solve $\\dfrac{x}{6} = \\dfrac{4}{8}$.", "3", ["12", "2", "48"], "Cross-multiply: $8x = 24$."),
      Q1("Similar figures have congruent angles and…", TX("proportional sides"), [TX("congruent sides"), TX("equal areas"), TX("equal perimeters")], "Same shape, sides in the same ratio."),
      Q1("Scale factor $3$. A side of $5$ becomes…", "15", ["8", "5", "45"], "Multiply by the scale factor.")
    ]),
    G("Proving triangles similar", [3], [
      Q1("Two angles of one triangle match two angles of another. They are similar by…", TX("AA"), [TX("SSS~"), TX("SAS~"), TX("ASA")], "Two angles are enough: <b>AA</b>."),
      Q1("Sides $3, 4, 5$ and $6, 8, 10$. Similar by…", TX("SSS~"), [TX("AA"), TX("SAS~"), TX("not similar")], "Every side doubles: <b>SSS~</b>."),
      Q1("Which is <b>not</b> a similarity shortcut?", TX("SSA"), [TX("AA"), TX("SSS~"), TX("SAS~")], "SSA doesn't work for congruence or similarity.")
    ]),
    G("Side-Splitter & geometric mean", [4, 5], [
      Q1("$\\overline{DE} \\parallel \\overline{BC}$, $AD = 3$, $DB = 6$, $AE = 4$. Then $EC = $", "8", ["2", "6", "12"], "$\\tfrac36 = \\tfrac{4}{EC}$, so $EC = 8$."),
      Q1("The geometric mean of $4$ and $9$ is…", "6", ["6.5", "13", "36"], "$\\sqrt{4 \\cdot 9} = 6$."),
      Q1("The geometric mean of $2$ and $8$ is…", "4", ["5", "10", "16"], "$\\sqrt{16} = 4$.")
    ])
  ];
  WORDS.ch8.groups = [
    G("Right-triangle words & the Pythagorean Theorem", [0, 1], [
      Q1("Legs $6$ and $8$. The hypotenuse is…", "10", ["14", "12", "48"], "$\\sqrt{36 + 64} = 10$."),
      Q1("The hypotenuse is always across from…", TX("the right angle"), [TX("the smallest angle"), TX("angle A"), TX("the longest leg")], "It's the longest side, opposite the $90^\\circ$ angle."),
      Q1("Is $5, 12, 14$ a right triangle?", TX("no"), [TX("yes")], "$25 + 144 = 169 \\ne 196$.")
    ]),
    G("Special right triangles", [2, 3], [
      Q1("A 45-45-90 triangle has legs $5$. The hypotenuse is…", "5\\sqrt2", ["10", "5\\sqrt3", "5"], "Hypotenuse = leg $\\cdot \\sqrt2$."),
      Q1("A 30-60-90 triangle has short leg $4$. The hypotenuse is…", "8", ["4\\sqrt3", "4\\sqrt2", "12"], "Hypotenuse = $2 \\cdot$ short leg."),
      Q1("A 30-60-90 triangle has short leg $4$. The long leg is…", "4\\sqrt3", ["8", "4\\sqrt2", "2"], "Long leg = short leg $\\cdot \\sqrt3$.")
    ]),
    G("Sine, cosine, tangent", [4, 5], [
      Q1("Opposite $3$, adjacent $4$, hypotenuse $5$. $\\sin A = $", "\\tfrac35", ["\\tfrac45", "\\tfrac34", "\\tfrac53"], "SOH: opposite over hypotenuse."),
      Q1("Same triangle. $\\tan A = $", "\\tfrac34", ["\\tfrac35", "\\tfrac45", "\\tfrac43"], "TOA: opposite over adjacent."),
      Q1("Looking <b>up</b> from the ground to a kite makes an angle of…", TX("elevation"), [TX("depression"), TX("inclination"), TX("reflection")], "Up = elevation; down = depression.")
    ])
  ];
  WORDS.ch9.groups = [
    G("Slides, flips, turns", [0, 1, 2], [
      Q1("Translate $(2, 3)$ by $(x, y) \\to (x + 4, y - 1)$.", "(6, 2)", ["(-2, 4)", "(6, 4)", "(2, 3)"], "Add $4$ to $x$, subtract $1$ from $y$."),
      Q1("Reflect $(2, 3)$ over the $x$-axis.", "(2, -3)", ["(-2, 3)", "(3, 2)", "(-2, -3)"], "Over the $x$-axis: keep $x$, flip the sign of $y$."),
      Q1("Rotate $(2, 3)$ by $180^\\circ$ about the origin.", "(-2, -3)", ["(3, -2)", "(-3, 2)", "(2, -3)"], "$180^\\circ$: flip both signs.")
    ]),
    G("Dilations & compositions", [3, 4], [
      Q1("Dilate $(2, 3)$ by $k = 3$ about the origin.", "(6, 9)", ["(5, 6)", "(2, 9)", "(6, 3)"], "Multiply both coordinates by $3$."),
      Q1("A dilation with $k = \\tfrac12$ makes a figure…", TX("smaller"), [TX("larger"), TX("the same size"), TX("flipped")], "$0 < k < 1$ shrinks."),
      Q1("A composition is…", TX("two or more transformations in a row"), [TX("a single reflection"), TX("a dilation"), TX("a symmetry")], "Do one move, then the next.")
    ]),
    G("Symmetry", [5], [
      Q1("How many lines of symmetry does a square have?", "4", ["2", "1", "8"], "2 through the midpoints of sides, 2 along the diagonals."),
      Q1("A regular hexagon has rotational symmetry of order…", "6", ["3", "2", "12"], "It matches itself every $60^\\circ$: 6 times in a full turn."),
      Q1("Which letter has a vertical line of symmetry?", TX("A"), [TX("F"), TX("G"), TX("R")], "A folds onto itself along a vertical line.")
    ])
  ];
  WORDS.ch10.groups = [
    G("Parts of a circle", [0, 1], [
      Q1("Radius $7$. The diameter is…", "14", ["7", "3.5", "49"], "Diameter = $2r$."),
      Q1("A line that touches a circle at exactly one point is a…", TX("tangent"), [TX("secant"), TX("chord"), TX("radius")], "Tangent: one point. Secant: two points."),
      Q1("A tangent and the radius to the point of tangency are…", TX("perpendicular"), [TX("parallel"), TX("congruent"), TX("the same line")], "They meet at a right angle.")
    ]),
    G("Arcs and angles", [2, 3], [
      Q1("A central angle of $80^\\circ$ intercepts an arc of…", DG(80), [DG(40), DG(160), DG(280)], "A central angle equals its arc."),
      Q1("An inscribed angle intercepts an arc of $80^\\circ$. The angle is…", DG(40), [DG(80), DG(160), DG(20)], "Inscribed angle = half the arc."),
      Q1("An inscribed angle that intercepts a semicircle is…", DG(90), [DG(180), DG(45), DG(60)], "Half of $180^\\circ$.")
    ]),
    G("Measuring circles", [4, 5], [
      Q1("The circle $(x - 2)^2 + (y + 1)^2 = 9$ has center…", "(2, -1)", ["(-2, 1)", "(2, 1)", "(-2, -1)"], "Change the signs inside the parentheses."),
      Q1("Same circle. The radius is…", "3", ["9", "81", "4.5"], "$r^2 = 9$, so $r = 3$."),
      Q1("A $90^\\circ$ sector is what fraction of the circle?", "\\tfrac14", ["\\tfrac12", "\\tfrac13", "\\tfrac19"], "$\\tfrac{90}{360} = \\tfrac14$.")
    ])
  ];
  WORDS.ch11.groups = [
    G("Base, height & the basic shapes", [0, 1, 2], [
      Q1("Area of a triangle with base $10$ and height $6$:", "30", ["60", "16", "15"], "$\\tfrac12 \\cdot 10 \\cdot 6 = 30$."),
      Q1("Area of a trapezoid with bases $4$ and $10$, height $5$:", "35", ["70", "50", "19"], "$\\tfrac12(4 + 10)(5) = 35$."),
      Q1("Area of a rhombus with diagonals $6$ and $8$:", "24", ["48", "14", "12"], "$\\tfrac12 d_1 d_2 = 24$.")
    ]),
    G("Circles & regular polygons", [3, 4], [
      Q1("Area of a circle with radius $5$:", "25\\pi", ["10\\pi", "5\\pi", "50\\pi"], "$\\pi r^2 = 25\\pi$."),
      Q1("Circumference of a circle with radius $5$:", "10\\pi", ["25\\pi", "5\\pi", "50\\pi"], "$2\\pi r = 10\\pi$."),
      Q1("A regular polygon: area $= \\tfrac12 \\cdot$ apothem $\\cdot$ …", TX("perimeter"), [TX("side"), TX("radius"), TX("number of sides")], "$A = \\tfrac12 a P$.")
    ]),
    G("Shaded regions", [5], [
      Q1("Shaded region = …", TX("big area − small area"), [TX("big area + small area"), TX("big area × small area"), TX("half the big area")], "Find the whole, subtract what is cut out."),
      Q1("A $10 \\times 10$ square with a circle of radius $5$ cut out. Shaded area:", "100 - 25\\pi", ["100 - 10\\pi", "100 + 25\\pi", "25\\pi"], "$100 - \\pi(5)^2$."),
      Q1("Two similar figures, scale factor $3$. The area ratio is…", "9", ["3", "6", "27"], "Areas scale by $k^2$.")
    ])
  ];
  WORDS.ch12.groups = [
    G("Prisms, cylinders, pyramids, cones, spheres", [0, 1, 2], [
      Q1("Volume of a cylinder with $r = 3$, $h = 5$:", "45\\pi", ["15\\pi", "30\\pi", "9\\pi"], "$\\pi r^2 h = \\pi(9)(5)$."),
      Q1("A cone with the same base and height as that cylinder has volume…", "15\\pi", ["45\\pi", "30\\pi", "135\\pi"], "Cones and pyramids are $\\tfrac13$ of the matching cylinder or prism."),
      Q1("Volume of a sphere with $r = 3$:", "36\\pi", ["27\\pi", "12\\pi", "108\\pi"], "$\\tfrac43\\pi r^3 = \\tfrac43\\pi(27) = 36\\pi$.")
    ]),
    G("Nets, heights & counting faces", [3, 4, 5], [
      Q1("A net of a cube is made of how many squares?", "6", ["4", "8", "12"], "One square for each face."),
      Q1("The height of a cone measured <b>along its side</b> is the…", TX("slant height"), [TX("height"), TX("radius"), TX("apothem")], "Height goes straight down the middle; slant height goes along the side."),
      Q1("A triangular prism has how many faces?", "5", ["6", "3", "9"], "2 triangles + 3 rectangles.")
    ])
  ];
  WORDS.ch13.groups = [
    G("Outcomes & probability", [0, 1], [
      Q1("Roll one die. The sample space has how many outcomes?", "6", ["1", "3", "36"], "$\\{1, 2, 3, 4, 5, 6\\}$."),
      Q1("Roll one die. $P(\\text{even})$ =", "\\tfrac12", ["\\tfrac13", "\\tfrac16", "\\tfrac23"], "$3$ even outcomes out of $6$."),
      Q1("A probability is always between…", "0\\ \\text{and}\\ 1", ["1\\ \\text{and}\\ 100", "-1\\ \\text{and}\\ 1", "0\\ \\text{and}\\ 10"], "$0$ = impossible, $1$ = certain.")
    ]),
    G("Counting: permutations & combinations", [2, 3, 4], [
      Q1("3 shirts and 4 pants. How many outfits?", "12", ["7", "34", "24"], "Counting Principle: $3 \\cdot 4$."),
      Q1("Arrange 3 different books on a shelf. How many orders?", "6", ["3", "9", "27"], "$3! = 6$ — order matters: a permutation."),
      Q1("Choose 2 of 4 friends to invite. How many ways?", "6", ["12", "8", "16"], "$_4C_2 = 6$ — order doesn't matter: a combination.")
    ]),
    G("Independent & conditional", [5], [
      Q1("Flip a coin twice. $P(\\text{heads, heads})$ =", "\\tfrac14", ["\\tfrac12", "\\tfrac13", "1"], "Independent: $\\tfrac12 \\cdot \\tfrac12$."),
      Q1("$P(B \\mid A)$ means…", TX("the probability of B given A"), [TX("the probability of A and B"), TX("the probability of A or B"), TX("A divided by B")], "Read the bar as “given.”"),
      Q1("Events are independent when…", "P(B \\mid A) = P(B)", ["P(A) = P(B)", "P(A \\text{ and } B) = 0", "P(A) + P(B) = 1"], "Knowing $A$ doesn't change the chance of $B$.")
    ])
  ];

  /* the chapter's summary table, for the Cheat Sheet (geometry-levels.html cheatSheet()) */
  window.geoCsTable = chId => { const w = WORDS[chId]; return w && w.table ? { title: w.tableTitle || "Line, ray or segment?", html: w.table } : null; };

  const KEY = "fm-geo-words";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } };
  const save = v => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} };

  const cardHtml = (c, fold) => `<div class="wcard"><h5>${c.t}${c.tag ? `<em class="tg" hidden>${c.tag}</em>` : ""}</h5>${PIC[c.k] || ""}
    <div class="wrow"><span class="lb">See it</span>${c.see}</div>${fold ? `<button type="button" class="defb">Show the definition ▾</button><div class="defs" hidden>` : ""}<div class="wrow"><span class="lb">Say it</span>${c.say}</div><div class="wrow"><span class="lb">Write it</span>${c.write}</div>${fold ? "</div>" : ""}</div>`;
  const triesHtml = (tr, gi) => !tr ? "" : `<div class="tries" data-g="${gi}"><div class="th">✍️ Your turn — on paper first</div><p class="tip">Write each answer on your paper first. Then choose what you wrote from the menu and press <b>Check</b>.</p>${tr.fig}
    ${tr.qs.map((t, qi) => `<div class="tq" data-q="${qi}"><div class="tqq"><b>${qi + 1}.</b> ${t.q}</div><div class="tqa">${Array.from({ length: t.n }, (_, k) => `<span class="dd" data-k="${k}"><button type="button" class="ddb">choose ▾</button><span class="ddm" hidden>${t.opts.map(o => `<button type="button" data-v="${o.replace(/"/g, "&quot;")}">$${o}$</button>`).join("")}</span></span>`).join(t.n > 1 ? `<span class="and">and</span>` : "")}<button type="button" class="tchk">Check</button></div><div class="tfb"></div></div>`).join("")}</div>`;

  /* ---------- the card as one-section-at-a-time steps (Next / Back) ---------- */
  const SHORT = t => t.replace(/<[^>]+>/g, "").split(/\s+—\s+|:\s/)[0].replace(/^\W+\s*/, "");
  function stepsHtml(w, g, mine) {
    const steps = [], intro = `<div class="intro">${w.intro}</div>${w.more ? `<details class="wmore"><summary>ℹ️ ${w.more[0]}</summary><div>${w.more[1]}</div></details>` : ""}`;
    if (w.groups) w.groups.forEach((gr, gi) => steps.push({ t: gr.title, h: `<div class="wgrid">${gr.cards.map(i => cardHtml(w.cards[i], true)).join("")}</div>${triesHtml(gr.tries, gi)}` }));
    else steps.push({ t: "See it → Say it → Write it", short: "Concepts", h: `<div class="wgrid">${w.cards.map(c => cardHtml(c, false)).join("")}</div>${w.tries ? triesHtml(w.tries, 0) : ""}` });
    if (w.table) steps.push({ t: w.tableTitle || "Line, ray or segment?", h: w.table });
    steps.push({ t: w.postTitle || "Postulates — try each one with your hands", short: (w.postTitle || "Postulates").replace(/\s+—.*$/, "").replace(/ you'll use as reasons$/, "").replace(/^Where the formulas come from$/, "Formulas"),
      h: w.posts.map(([t, x]) => `<div class="post"><div class="t">${t}</div><div class="x"><b>Try it: </b>${x}</div></div>`).join("") });
    steps.push({ t: "Words to know", h: `<p class="wsub">Tick each word you can explain in your own words.</p><div class="vocab">${w.vocab.map(v => `<label><input type="checkbox" value="${v}" ${mine.includes(v) ? "checked" : ""}>${v}</label>`).join("")}</div>
        <div id="vocabN" style="font-size:13.5px;color:var(--muted);margin-top:6px"></div>` });
    if (g) steps.push({ t: "What to memorize — and how", short: "Memorize", h: `<div class="smem">${g.mem.map(([a, b]) => `<div><div class="t">${a}</div><div class="x">💡 ${b}</div></div>`).join("")}</div>
        <div class="howmem">${HOWMEM}</div><h4 class="wsubh">🔍 Understand — don't just memorize</h4><ul class="sund">${g.und.map(x => `<li>${x}</li>`).join("")}</ul>` });
    steps.push({ t: "Quick check", h: w.checks.map(([q, a]) => `<div class="qc">${q}<button type="button">Show answer</button><div class="a" hidden>${a}</div></div>`).join("") });
    return `${intro}<div class="wnav" role="tablist">${steps.map((st, i) => `<button type="button" role="tab" data-i="${i}"><i>${i + 1}</i><span>${st.short || SHORT(st.t)}</span></button>`).join("")}</div>
      ${steps.map((st, i) => `<section class="wstep" data-i="${i}" hidden><div class="wgroup"><h4><span class="gn">${i + 1}</span>${st.t}</h4>${st.h}</div>
        <div class="wfoot">${i ? `<button type="button" class="btn ghost sm wprev">← Back</button>` : "<span></span>"}<span class="wcount">${i + 1} of ${steps.length}</span>${i < steps.length - 1
          ? `<button type="button" class="btn sm wnext">Next: ${steps[i + 1].short || SHORT(steps[i + 1].t)} →</button>` : `<button type="button" class="btn teal sm wdone">${w.inLesson ? "Done — next lesson →" : "Done — go to the lessons →"}</button>`}</div></section>`).join("")}`;
  }
  function paginate(box, chId, known) {
    const secs = [...box.querySelectorAll(".wstep")], tabs = [...box.querySelectorAll(".wnav button")], key = "_step_" + chId;
    const show = (i, scroll) => {
      i = Math.max(0, Math.min(secs.length - 1, i | 0));
      secs.forEach((s, k) => s.hidden = k !== i);
      tabs.forEach((b, k) => { b.classList.toggle("on", k === i); b.classList.toggle("past", k < i); b.setAttribute("aria-selected", k === i); });
      box.querySelector(".intro").hidden = i > 0; const m = box.querySelector(".wmore"); if (m) m.hidden = i > 0;
      const k = load(); k[key] = i; save(k);
      if (scroll) { const r = box.getBoundingClientRect(); if (r.top < 70 || r.top > innerHeight * 0.4) box.scrollIntoView({ behavior: "smooth", block: "start" }); }
      const cur = tabs[i], nav = cur && cur.parentNode;
      if (cur && box.open !== false) nav.scrollTo({ left: nav.scrollLeft + cur.getBoundingClientRect().left - nav.getBoundingClientRect().left - 40, behavior: "smooth" });
    };
    tabs.forEach((b, k) => b.onclick = () => show(k, true));
    box.querySelectorAll(".wprev").forEach(b => b.onclick = () => show(+b.closest(".wstep").dataset.i - 1, true));
    box.querySelectorAll(".wnext").forEach(b => b.onclick = () => show(+b.closest(".wstep").dataset.i + 1, true));
    box.querySelectorAll(".wdone").forEach(b => b.onclick = () => { const inl = box.classList.contains("inlesson");
      if (inl && typeof openLesson === "function") {             // this card is the whole lesson: mark it learned, go to the next lesson
        try { const t = CH.topics[LI]; if (t && window.fmMarkLearned) fmMarkLearned(t.id); } catch (e) {}
        openLesson(Math.min(LI + 1, CH.topics.length - 1), true); return; }
      box.open = false; const r = document.getElementById("road"); if (r) setTimeout(() => r.scrollIntoView({ behavior: "smooth", block: "start" }), 60); });
    show(known[key] || 0, false);
  }

  function draw(chId, target) {
    const lv = document.getElementById("learnView"); if (!lv) return;
    let box = target || document.getElementById("words");
    const w = WORDS[chId];
    if (!w || (w.inLesson && !target)) { if (box) box.remove(); return; }
    const known = load(), mine = known[chId] || [];
    if (!box) { box = document.createElement("details"); box.id = "words"; box.className = "words"; lv.insertBefore(box, lv.firstChild); }
    if (!target) box.open = !(known["_seen_" + chId]);
    const g = STUDY[chId], nPost = w.posts.length, pw = (w.postTitle || "Postulates").split(/[ —&]/)[0].toLowerCase();
    box.innerHTML = `<summary><span style="font-size:24px">📘</span><div><b>Start here: Words &amp; Postulates</b><br><span>${w.cards.length} concepts · ${nPost} ${pw === "postulates" ? "postulates" : "key facts"} · ${w.vocab.length} words to know — ${w.sub}</span></div><i>›</i></summary>
      <div class="wb">${stepsHtml(w, g, mine)}</div>`;
    if (target) { const sm = box.querySelector(":scope > summary"); if (sm) { const ti = CH.topics.findIndex(t => t.id === w.inLesson), tt = (CH.topics[ti] || {}).title || "";
      sm.outerHTML = `<div class="ilh"><span class="label">Lesson ${ti + 1} of ${CH.topics.length}</span><h2 class="ilh-t">${tt}</h2></div>`; } }
    paginate(box, chId, known);
    const upd = () => { const n = box.querySelectorAll(".vocab input:checked").length; box.querySelector("#vocabN").textContent = `${n} of ${w.vocab.length} words ready${n === w.vocab.length ? " — great job! 🎉" : ""}`; };
    box.querySelectorAll(".vocab input").forEach(i => i.onchange = () => { const k = load(); k[chId] = [...box.querySelectorAll(".vocab input:checked")].map(x => x.value); save(k); upd(); });
    box.querySelectorAll(".defb").forEach(b => b.onclick = () => { const d = b.nextElementSibling; d.hidden = !d.hidden; b.textContent = d.hidden ? "Show the definition ▾" : "Hide the definition ▴"; });
    box.querySelectorAll(".tries .tq").forEach(el => { const gi = +el.closest(".tries").dataset.g, tr = w.groups ? w.groups[gi].tries : w.tries, t = tr.qs[+el.dataset.q], sel = Array(t.n).fill(null);
      el.querySelectorAll(".dd").forEach(dd => { const b = dd.querySelector(".ddb"), m = dd.querySelector(".ddm");
        b.onclick = () => { box.querySelectorAll(".ddm").forEach(x => { if (x !== m) x.hidden = true; }); m.hidden = !m.hidden;
          if (!m.hidden) { m.classList.remove("up"); const r = m.getBoundingClientRect(); if (r.bottom > innerHeight - 8 && b.getBoundingClientRect().top > r.height + 8) m.classList.add("up"); } };
        m.querySelectorAll("button").forEach(o => o.onclick = () => { sel[+dd.dataset.k] = o.dataset.v; b.innerHTML = o.innerHTML; b.classList.add("on"); m.hidden = true; el.querySelector(".tfb").innerHTML = ""; }); });
      el.querySelector(".tchk").onclick = () => { const fb = el.querySelector(".tfb");
        if (sel.some(x => !x)) { fb.innerHTML = `<div class="fb hint"><span class="tag">Choose first</span>Pick ${t.n > 1 ? "both answers" : "an answer"} from the menu.</div>`; return; }
        const good = t.ok(sel); fb.innerHTML = `<div class="fb ${good ? "good" : "bad"}"><span class="tag">${good ? "Correct!" : "Not yet"}</span>${good ? "" : "Check your paper again. "}${t.sol}</div>`;
        if (window.renderMathInElement) renderMathInElement(fb, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false }); }; });
    box.querySelectorAll(".qc button").forEach(b => b.onclick = () => { const a = b.nextElementSibling; a.hidden = !a.hidden; b.textContent = a.hidden ? "Show answer" : "Hide"; });
    if (!target) box.addEventListener("toggle", e => { if (e.target !== box) return; const k = load(); k["_seen_" + chId] = !box.open; save(k); });
    const more = box.querySelector(".wmore"); if (more) more.addEventListener("toggle", () => box.querySelectorAll(".tg").forEach(t => t.hidden = !more.open));
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
      mem: [["Notation: $\\overleftrightarrow{AB}$, $\\overrightarrow{AB}$, $\\overline{AB}$, $AB$", "the picture on top shows what the figure looks like: two arrows, one arrow, no arrows; no bar means a number (length)"], ["Midpoint $\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$", "<b>M</b>idpoint = <b>M</b>ean (add), <b>D</b>istance = <b>D</b>ifference (subtract). Forgot? Simple case: the middle of $2$ and $4$ is $3$, so you add. (Not $0$ and $2$ — both ways give $1$.)"], ["Missing endpoint: $B = 2M - A$", "take the same step again: from $3$ to the midpoint $5$ is $+2$, so the other end is $5 + 2 = 7$"], ["Distance $\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$", "it's the Pythagorean Theorem on a grid"], ["Complementary $= 90^\\circ$, supplementary $= 180^\\circ$", "C comes before S, and $90$ comes before $180$"]],
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
    const old = document.getElementById("study"); if (old) old.remove();
    const g = STUDY[chId], tabs = document.querySelector(".tabs[role=tablist]"), pv = document.getElementById("practiceView");
    let r = document.getElementById("chroute");
    if (!g || !tabs) { if (r) r.remove(); return; }
    if (!r) { r = document.createElement("div"); r.id = "chroute"; r.className = "chroute"; tabs.parentNode.insertBefore(r, tabs); }
    r.innerHTML = `<div class="rk">🧭 This chapter: <b>${g.kind}</b> <span>${g.why}</span></div>
      <div class="rs"><button type="button" data-s="1"><i>1</i>Start here: ${WORDS[chId] && WORDS[chId].inLesson ? "1.1 words &amp; symbols" : "words &amp; postulates"}</button><span>→</span><button type="button" data-s="2"><i>2</i>Stories &amp; lessons</button><span>→</span><button type="button" data-s="3"><i>3</i>Practice at your level</button><span>→</span><button type="button" data-s="4"><i>4</i>Ready for the test?</button></div>`;
    const go = el => { if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60); };
    r.querySelectorAll("button").forEach(b => b.onclick = () => { const n = +b.dataset.s;
      if (n === 1) { setTab("learn"); const W1 = WORDS[chId]; if (W1 && W1.inLesson) { const i = CH.topics.findIndex(t => t.id === W1.inLesson); if (i >= 0) openLesson(i); go(document.getElementById("story")); } else { const w = document.getElementById("words"); if (w) { w.open = true; go(w); } } }
      else if (n === 2) { setTab("learn"); const w = document.getElementById("words"); if (w) w.open = false; go(document.getElementById("road")); }
      else if (n === 3) { setTab("practice"); go(document.getElementById("practiceView")); }
      else { setTab("practice"); const rd = document.getElementById("ready"); if (rd) { rd.open = true; go(rd); } } });
    /* step 4: traps + checklist, at the top of the practice tab */
    let box = document.getElementById("ready");
    if (!pv) return;
    if (!box) { box = document.createElement("details"); box.id = "ready"; box.className = "words study"; pv.insertBefore(box, pv.firstChild); }
    const k = load(), ready = k["_ready_" + chId] || [];
    box.open = false;
    box.innerHTML = `<summary><span style="font-size:22px">✅</span><div><b>Ready for the test?</b><br><span>Common traps and a ${g.ready.length}-point checklist</span></div><i>›</i></summary>
      <div class="wb">
        <h4>⚠️ Common traps</h4><ul class="sund">${g.traps.map(x => `<li>${x}</li>`).join("")}</ul>
        <h4>✅ I'm ready when…</h4>
        <div class="vocab sready">${g.ready.map(x => `<label><input type="checkbox" value="${x.replace(/"/g, "&quot;")}" ${ready.includes(x) ? "checked" : ""}>${x}</label>`).join("")}</div>
      </div>`;
    box.querySelectorAll(".sready input").forEach(i => i.onchange = () => { const s2 = load(); s2["_ready_" + chId] = [...box.querySelectorAll(".sready input:checked")].map(x => x.value); save(s2); });
    if (window.renderMathInElement) { renderMathInElement(box, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false }); renderMathInElement(r, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false }); }
  }

  const origStory = window.drawStory;
  window.drawStory = function (chId, topic) {
    const w = WORDS[chId]; let box = document.getElementById("story");
    if (w && w.inLesson === topic.id) {
      const lesson = document.getElementById("lesson");
      if (box && !box.classList.contains("inlesson")) { box.remove(); box = null; }
      if (!box) { box = document.createElement("div"); box.id = "story"; box.className = "words inlesson"; lesson.parentNode.insertBefore(box, lesson); }
      draw(chId, box); return;
    }
    if (box && box.classList.contains("inlesson")) box.remove();
    if (origStory) origStory(chId, topic);
  };
  if (typeof openChapter === "function") {
    const orig = openChapter;
    window.openChapter = function (id, tab) { const r = orig.apply(this, arguments); try { draw(id); drawStudy(id); } catch (e) { console.warn("words", e); } return r; };
  }
  window.GEOMETRY_WORDS = WORDS; window.GEOMETRY_STUDY = STUDY; window.drawWords = draw; window.drawStudy = drawStudy;
})();

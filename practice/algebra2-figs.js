/* =====================================================================
   PROF. FANG MATH — ALGEBRA 2 LESSON FIGURES
   One picture for every lesson's "Watch me" example. Each figure is
   drawn as an inline SVG and attached to the lesson as lesson.fig
   (shown by drawLesson in algebra2-levels.html). Lessons that already
   have their own figure are left alone.
   ===================================================================== */
(function () {
  const C = { ink: "#16233B", grid: "#E8E2D8", axis: "#5B6474", teal: "#0F7C7C", gold: "#C9962B", red: "#B3261E", navy: "#1F3A68", purple: "#6A4BD8", soft: "#DDF0EE" };
  const F = "font-family=\"Inter,sans-serif\"";
  const css = `.a2fig{background:#fff;border:1px solid var(--line);border-radius:14px;padding:10px 12px;margin:10px 0 4px}
  .a2fig > svg{width:100%;max-width:420px;height:auto;display:block;margin:0 auto}
  .a2fig .cap{font-size:13.5px;color:var(--muted);text-align:center;margin-top:4px;line-height:1.45}
  .a2fig table.mx{border-collapse:separate;border-spacing:6px;margin:4px auto;font-size:17px}
  .a2fig table.mx td{padding:6px 12px;border-radius:8px;text-align:center;min-width:34px}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ---------- a tiny plotter ---------- */
  function plot(o) {
    const W = o.w || 400, H = o.h || 280, P = 26, [x0, x1] = o.xr, [y0, y1] = o.yr;
    const X = x => P + (x - x0) / (x1 - x0) * (W - 2 * P), Y = y => H - P - (y - y0) / (y1 - y0) * (H - 2 * P);
    let s = "";
    const gx = o.gx || 1, gy = o.gy || 1;
    if (o.grid !== false) {
      for (let x = Math.ceil(x0 / gx) * gx; x <= x1 + 1e-9; x += gx) s += `<line x1="${X(x)}" y1="${Y(y0)}" x2="${X(x)}" y2="${Y(y1)}" stroke="${C.grid}"/>`;
      for (let y = Math.ceil(y0 / gy) * gy; y <= y1 + 1e-9; y += gy) s += `<line x1="${X(x0)}" y1="${Y(y)}" x2="${X(x1)}" y2="${Y(y)}" stroke="${C.grid}"/>`;
    }
    if (o.axes !== false) {
      if (y0 <= 0 && y1 >= 0) s += `<line x1="${X(x0)}" y1="${Y(0)}" x2="${X(x1)}" y2="${Y(0)}" stroke="${C.axis}" stroke-width="1.5"/><text x="${X(x1) - 4}" y="${Y(0) - 6}" ${F} font-size="12" fill="${C.axis}" text-anchor="end">${o.xl || "x"}</text>`;
      if (!o.noy && x0 <= 0 && x1 >= 0) s += `<line x1="${X(0)}" y1="${Y(y0)}" x2="${X(0)}" y2="${Y(y1)}" stroke="${C.axis}" stroke-width="1.5"/><text x="${X(0) + 6}" y="${Y(y1) + 12}" ${F} font-size="12" fill="${C.axis}">${o.yl || "y"}</text>`;
      (o.xt || []).forEach(t => { const [v, lab] = Array.isArray(t) ? t : [t, t]; s += `<line x1="${X(v)}" y1="${Y(0) - 3}" x2="${X(v)}" y2="${Y(0) + 3}" stroke="${C.axis}"/><text x="${X(v)}" y="${Y(0) + 15}" ${F} font-size="11" fill="${C.axis}" text-anchor="middle">${lab}</text>`; });
      (o.yt || []).forEach(t => { const [v, lab] = Array.isArray(t) ? t : [t, t]; s += `<line x1="${X(0) - 3}" y1="${Y(v)}" x2="${X(0) + 3}" y2="${Y(v)}" stroke="${C.axis}"/><text x="${X(0) - 6}" y="${Y(v) + 4}" ${F} font-size="11" fill="${C.axis}" text-anchor="end">${lab}</text>`; });
    }
    (o.polys || []).forEach(p => { s += `<polygon points="${p.pts.map(([x, y]) => X(x) + "," + Y(y)).join(" ")}" fill="${p.fill || C.soft}" fill-opacity="${p.op ?? 0.8}" stroke="${p.stroke || C.teal}" stroke-width="${p.sw || 1.5}"/>`; });
    (o.vl || []).forEach(v => { const [x, col, dash] = Array.isArray(v) ? v : [v]; s += `<line x1="${X(x)}" y1="${Y(y0)}" x2="${X(x)}" y2="${Y(y1)}" stroke="${col || C.red}" stroke-width="1.5" stroke-dasharray="${dash || "6 5"}"/>`; });
    (o.hl || []).forEach(v => { const [y, col, dash] = Array.isArray(v) ? v : [v]; s += `<line x1="${X(x0)}" y1="${Y(y)}" x2="${X(x1)}" y2="${Y(y)}" stroke="${col || C.red}" stroke-width="1.5" stroke-dasharray="${dash || "6 5"}"/>`; });
    (o.segs || []).forEach(g => { s += `<line x1="${X(g[0])}" y1="${Y(g[1])}" x2="${X(g[2])}" y2="${Y(g[3])}" stroke="${g[4] || C.navy}" stroke-width="${g[6] || 2}" ${g[5] ? `stroke-dasharray="${g[5]}"` : ""}/>`; });
    (o.fns || []).forEach(fn => {
      const [a, b] = fn.dom || [x0, x1], n = 400; let d = "", pen = false, prev = null;
      for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n, y = fn.f(x);
        const ok = isFinite(y) && y >= y0 - (y1 - y0) && y <= y1 + (y1 - y0) && !(prev !== null && Math.abs(y - prev) > (y1 - y0));
        if (ok) { d += (pen ? "L" : "M") + X(x).toFixed(1) + "," + Y(Math.max(y0 - 2, Math.min(y1 + 2, y))).toFixed(1); pen = true; } else pen = false; prev = isFinite(y) ? y : null; }
      s += `<path d="${d}" fill="none" stroke="${fn.c || C.teal}" stroke-width="${fn.w || 2.5}" ${fn.dash ? `stroke-dasharray="${fn.dash}"` : ""} clip-path="url(#clip${o.id})"/>`;
      if (fn.lab) s += `<text x="${X(fn.lab[0])}" y="${Y(fn.lab[1])}" ${F} font-size="13" font-weight="600" fill="${fn.c || C.teal}" text-anchor="${fn.lab[2] || "start"}">${fn.lab[3] || ""}</text>`;
    });
    (o.pts || []).forEach(p => { s += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="${p.r || 5}" fill="${p.open ? "#fff" : p.c || C.red}" stroke="${p.c || C.red}" stroke-width="2"/>`;
      if (p.t) s += `<text x="${X(p.x) + (p.dx ?? 8)}" y="${Y(p.y) + (p.dy ?? -8)}" ${F} font-size="12.5" font-weight="600" fill="${p.c || C.red}" text-anchor="${p.a || "start"}">${p.t}</text>`; });
    (o.txt || []).forEach(t => { s += `<text x="${X(t[0])}" y="${Y(t[1])}" ${F} font-size="${t[4] || 12.5}" fill="${t[3] || C.ink}" text-anchor="${t[5] || "middle"}" font-weight="${t[6] || 500}">${t[2]}</text>`; });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.alt || "graph"}"><defs><clipPath id="clip${o.id}"><rect x="${P}" y="${P}" width="${W - 2 * P}" height="${H - 2 * P}"/></clipPath></defs>${s}</svg>`;
  }
  const box = (svg, cap) => `<div class="a2fig">${svg}${cap ? `<div class="cap">${cap}</div>` : ""}</div>`;
  let uid = 0; const P = o => plot(Object.assign({ id: "a2" + (uid++) }, o));
  const rng = (a, b, s = 1) => { const r = []; for (let v = a; v <= b + 1e-9; v += s) if (Math.abs(v) > 1e-9) r.push(+v.toFixed(6)); return r; };
  const svgRaw = (w, h, inner, alt) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${alt}">${inner}</svg>`;
  const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" ${F} font-size="${o.s || 13}" fill="${o.c || C.ink}" text-anchor="${o.a || "middle"}" font-weight="${o.w || 500}">${t}</text>`;

  const FIG = {};
  /* ---------- Chapter 1 ---------- */
  FIG["ch1/eqn"] = () => box(svgRaw(470, 220, `
      <ellipse cx="200" cy="170" rx="90" ry="22" fill="${C.soft}" stroke="${C.teal}" stroke-width="2"/>
      <path d="M110 170 L200 30 L290 170" fill="none" stroke="${C.teal}" stroke-width="2.5"/>
      <line x1="200" y1="30" x2="200" y2="170" stroke="${C.red}" stroke-width="2" stroke-dasharray="6 5"/><line x1="200" y1="170" x2="290" y2="170" stroke="${C.navy}" stroke-width="2"/>
      ${T(212, 105, "h", { c: C.red, w: 700, a: "start", s: 15 })}${T(245, 162, "r", { c: C.navy, w: 700, s: 15 })}
      ${T(330, 70, "V = ⅓ π r² h", { a: "start", s: 14, w: 600 })}${T(330, 95, "solve for h:", { a: "start", s: 12.5, c: C.axis })}${T(330, 117, "undo ×⅓, then ÷ πr²", { a: "start", s: 12.5, c: C.axis })}`, "cone with radius r and height h"),
    "A literal equation is just a formula. To get $h$ alone, undo what was done to it, in reverse order.");
  FIG["ch1/abs"] = () => box(P({ xr: [-4, 8], yr: [-1.2, 1.6], h: 150, grid: false, noy: true, xt: [-3, -1, 0, 1, 2, 3, 4, 6, 7], gx: 1,
      segs: [[1, 0.55, 5, 0.55, C.teal, null, 3], [1, 0.55, -2, 0.55, C.teal, null, 3]],
      pts: [{ x: -2, y: 0, t: "x = −2", a: "middle", dx: 0, dy: 32 }, { x: 5, y: 0, t: "x = 5", a: "middle", dx: 0, dy: 32 }, { x: 1.5, y: 0, c: C.navy, r: 4, t: "1.5", a: "middle", dx: 0, dy: 32 }],
      txt: [[3.25, 0.9, "3.5 away", C.teal, 12.5], [-0.25, 0.9, "3.5 away", C.teal, 12.5]], alt: "number line" }),
    "$|2x - 3| = 7$ means $2x - 3$ is $7$ away from $0$ — so $x$ is $3.5$ away from $1.5$ in both directions: $x = 5$ or $x = -2$.");

  /* ---------- Chapter 2 ---------- */
  FIG["ch2/func"] = () => box(P({ xr: [-3, 5], yr: [-3, 11], gy: 2, xt: rng(-2, 4), yt: rng(-2, 10, 2),
      fns: [{ f: x => x * x - 3 * x, lab: [3.6, 6, "start", "f(x) = x² − 3x"] }],
      segs: [[-2, 0, -2, 10, C.red, "5 4", 1.5], [-2, 10, 0, 10, C.red, "5 4", 1.5]],
      pts: [{ x: -2, y: 10, t: "(−2, 10)" }], alt: "parabola through (-2,10)" }),
    "Input $x = -2$ goes up to the graph; the output is the height there: $f(-2) = 10$.");
  FIG["ch2/lin"] = () => box(P({ xr: [-1, 6], yr: [-2, 16], gy: 2, xt: rng(1, 5), yt: rng(2, 14, 2),
      fns: [{ f: x => 3 * x, lab: [4.4, 14.5, "end", "y = 3x"] }], pts: [{ x: 4, y: 12, t: "(4, 12)" }, { x: 0, y: 0, c: C.navy, r: 4, t: "(0, 0)", dx: 6, dy: 14 }],
      segs: [[1, 3, 2, 3, C.gold, null, 2.5], [2, 3, 2, 6, C.gold, null, 2.5]], txt: [[1.5, 1.8, "+1", C.gold, 12], [2.35, 4.5, "+3", C.gold, 12, "start"]], alt: "line y = 3x" }),
    "Direct variation is a line through the origin. $k = \\dfrac{y}{x} = \\dfrac{12}{4} = 3$ is the slope: over $1$, up $3$.");
  FIG["ch2/trans"] = () => box(P({ xr: [-8, 3], yr: [-6, 5], xt: rng(-7, 2), yt: rng(-5, 4),
      fns: [{ f: x => Math.abs(x), c: C.axis, dash: "6 5", w: 2, lab: [1.6, 3.2, "start", "y = |x|"] }, { f: x => -2 * Math.abs(x + 3) + 1, lab: [-7.8, 3.4, "start", "y = −2|x + 3| + 1"] }],
      pts: [{ x: -3, y: 1, t: "vertex (−3, 1)", a: "middle", dx: 0, dy: -12 }], alt: "absolute value transformation" }),
    "Start with $y = |x|$: shift left $3$, up $1$; $a = -2$ flips it upside down and makes it twice as steep.");

  /* ---------- Chapter 3 ---------- */
  FIG["ch3/two"] = () => box(P({ xr: [-1, 6], yr: [-3, 8], xt: rng(1, 5), yt: rng(-2, 7),
      fns: [{ f: x => 7 - 2 * x, lab: [2.3, 5.4, "start", "2x + y = 7"] }, { f: x => x - 2, c: C.purple, lab: [5.6, 2.3, "end", "x − y = 2"] }],
      pts: [{ x: 3, y: 1, t: "(3, 1)", dx: 10, dy: 4 }], alt: "two lines meeting at (3,1)" }),
    "The solution of a system is the point that lies on <b>both</b> lines.");
  FIG["ch3/lp"] = () => box(P({ xr: [-1, 6], yr: [-1, 5], xt: rng(1, 5), yt: rng(1, 4),
      polys: [{ pts: [[0, 0], [4, 0], [2, 2], [0, 3]] }],
      pts: [{ x: 0, y: 0, c: C.navy, t: "P = 0", dx: -6, dy: 16, a: "end" }, { x: 4, y: 0, t: "P = 12 (max)", dx: 10, dy: -10 }, { x: 2, y: 2, c: C.navy, t: "P = 10", dx: 8 }, { x: 0, y: 3, c: C.navy, t: "P = 6", dx: 8, dy: -6 }],
      alt: "feasible region" }),
    "The shaded region is every point that satisfies all the inequalities. The best value of $P = 3x + 2y$ is always at a <b>corner</b>.");
  FIG["ch3/three"] = () => box(svgRaw(400, 230, (() => { const o = [200, 160], ex = [-0.7, 0.42], ey = [1, 0], ez = [0, -1], u = 34, p = (x, y, z) => [o[0] + u * (x * ex[0] + y * ey[0] + z * ez[0]), o[1] + u * (x * ex[1] + y * ey[1] + z * ez[1])];
      const L = (a, b, c, d = "") => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c}" stroke-width="${d ? 1.5 : 2}" ${d ? `stroke-dasharray="${d}"` : ""}/>`;
      let s = L(p(0, 0, 0), p(3.4, 0, 0), C.axis) + L(p(0, 0, 0), p(0, 3.8, 0), C.axis) + L(p(0, 0, 0), p(0, 0, 3.6), C.axis);
      s += T(...p(3.7, 0, 0), "x", { c: C.axis }) + T(...p(0, 4.1, 0), "y", { c: C.axis }) + T(...p(0, 0, 3.9), "z", { c: C.axis });
      s += L(p(2, 0, 0), p(2, 2, 0), C.teal, "5 4") + L(p(0, 2, 0), p(2, 2, 0), C.teal, "5 4") + L(p(2, 2, 0), p(2, 2, 2), C.teal, "5 4");
      const q = p(2, 2, 2); s += `<circle cx="${q[0]}" cy="${q[1]}" r="6" fill="${C.red}"/>` + T(q[0] + 10, q[1] - 8, "(2, 2, 2)", { a: "start", c: C.red, w: 700 });
      s += T(30, 30, "three equations →", { a: "start", s: 12.5, c: C.axis }) + T(30, 48, "one point in space", { a: "start", s: 12.5, c: C.axis }); return s; })(), "point (2,2,2) in 3D"),
    "With three variables, each equation is a flat plane. The solution is the one point where all three planes meet.");

  /* ---------- Chapter 4 ---------- */
  FIG["ch4/vf"] = () => box(P({ xr: [-1, 5], yr: [-4, 6], xt: rng(1, 4), yt: rng(-3, 5),
      fns: [{ f: x => 2 * x * x - 8 * x + 5, lab: [4.1, 5.4, "start", ""] }], vl: [[2, C.gold]],
      pts: [{ x: 2, y: -3, t: "vertex (2, −3)", dx: 10, dy: 4 }, { x: 0, y: 5, c: C.navy, r: 4, t: "(0, 5)", dx: 8 }, { x: 4, y: 5, c: C.navy, r: 4, t: "(4, 5)", dx: -8, a: "end" }],
      txt: [[2.1, 5.3, "axis x = 2", C.gold, 12, "start"]], alt: "parabola with vertex (2,-3)" }),
    "The axis of symmetry $x = -\\dfrac{b}{2a} = 2$ splits the parabola in half; the vertex sits on it.");
  FIG["ch4/solve"] = () => box(P({ xr: [-2, 6], yr: [-6, 5], xt: rng(-1, 5), yt: rng(-5, 4),
      fns: [{ f: x => x * x - 4 * x - 1 }], vl: [[2, C.gold]],
      pts: [{ x: 2 - Math.sqrt(5), y: 0, t: "2 − √5", a: "end", dx: -6, dy: -8 }, { x: 2 + Math.sqrt(5), y: 0, t: "2 + √5", dx: 6, dy: -8 }],
      segs: [[2, -5.4, 2 + Math.sqrt(5), -5.4, C.purple, null, 2.5]], txt: [[3.1, -4.8, "√5", C.purple, 13]], alt: "parabola crossing the x-axis" }),
    "The solutions are where the graph crosses the $x$-axis: $\\sqrt5 \\approx 2.24$ on each side of the axis $x = 2$.");
  FIG["ch4/cplx"] = () => box(P({ xr: [-2, 6], yr: [-2, 4], xt: rng(-1, 5), yt: [[-1, "−i"], [1, "i"], [2, "2i"], [3, "3i"]], xl: "real", yl: "imaginary",
      segs: [[0, 0, 2, 3, C.teal, "4 4", 1.5], [0, 0, 1, -1, C.purple, "4 4", 1.5], [0, 0, 5, 1, C.red, "4 4", 1.5]],
      pts: [{ x: 2, y: 3, c: C.teal, t: "2 + 3i" }, { x: 1, y: -1, c: C.purple, t: "1 − i", dy: 16 }, { x: 5, y: 1, t: "(2 + 3i)(1 − i) = 5 + i", a: "end", dx: 0, dy: -12 }], alt: "complex plane" }),
    "Complex numbers live on a plane: real part across, imaginary part up. Multiplying them gives a new point, $5 + i$.");

  /* ---------- Chapter 5 ---------- */
  FIG["ch5/beh"] = () => box(P({ xr: [-2.5, 2.5], yr: [-12, 10], gy: 2, gx: 0.5, xt: rng(-2, 2), yt: [-8, -4, 4, 8],
      fns: [{ f: x => -2 * x ** 3 + x - 4, lab: [0.25, 8.3, "start", "f(x) = −2x³ + x − 4"] }],
      txt: [[-2.1, 6.5, "↖ up", C.red, 14, "middle", 700], [2.15, -10.6, "down ↘", C.red, 14, "middle", 700]], alt: "cubic end behavior" }),
    "Odd degree: the two ends go opposite ways. Negative leading coefficient: up on the left, down on the right.");
  FIG["ch5/div"] = () => box(P({ xr: [-3, 3.5], yr: [-4, 14], gy: 2, xt: rng(-2, 3), yt: rng(2, 12, 2),
      fns: [{ f: x => x ** 3 - 2 * x + 5, lab: [2.75, 13, "end", "P(x) = x³ − 2x + 5"] }], segs: [[2, 0, 2, 9, C.red, "5 4", 1.5]],
      pts: [{ x: 2, y: 9, t: "(2, 9)" }], alt: "polynomial value at 2" }),
    "Remainder Theorem: dividing by $(x - 2)$ leaves the same remainder as the height of the graph at $x = 2$: $P(2) = 9$.");
  FIG["ch5/roots"] = () => box(P({ xr: [-0.5, 4], yr: [-3, 3], gx: 0.5, xt: rng(1, 3), yt: [-2, -1, 1, 2],
      fns: [{ f: x => (x - 1) * (x - 2) * (x - 3), lab: [3.3, 2.5, "start", ""] }],
      pts: [{ x: 1, y: 0, t: "1", dx: -10, dy: -8, a: "end" }, { x: 2, y: 0, t: "2", dx: 4, dy: -8 }, { x: 3, y: 0, t: "3", dx: 10, dy: 14 }], txt: [[0.2, 2.4, "(x − 1)(x − 2)(x − 3)", C.teal, 13, "start", 600]], alt: "cubic with zeros 1,2,3" }),
    "Each factor $(x - r)$ gives a zero at $x = r$. Vieta: the zeros add to $6$ and multiply to $6$ — the coefficients $-6x^2$ and $-6$.");

  /* ---------- Chapter 6 ---------- */
  FIG["ch6/root"] = () => box(svgRaw(400, 200, (() => { let s = "";
      const cube = (x, y, n, u) => { let g = ""; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { g += `<rect x="${x + i * u}" y="${y + j * u}" width="${u}" height="${u}" fill="${C.soft}" stroke="${C.teal}"/>`; }
        const d = u * 0.55; g += `<path d="M${x},${y} l${d},${-d} h${n * u} v${n * u} l${-d},${d}" fill="none" stroke="${C.teal}" stroke-width="1.5"/><path d="M${x + n * u},${y} l${d},${-d}" stroke="${C.teal}"/>`;
        for (let i = 1; i < n; i++) g += `<path d="M${x + i * u},${y} l${d},${-d}" stroke="${C.teal}" stroke-opacity=".6"/><path d="M${x + n * u},${y + i * u} l${d},${-d}" stroke="${C.teal}" stroke-opacity=".6"/>`; return g; };
      s += cube(40, 60, 3, 28) + T(82, 170, "27 cubes: edge 3", { s: 12.5 }) + T(82, 188, "∛27 = 3", { c: C.red, w: 700 });
      s += T(215, 110, "→ square it →", { s: 13, c: C.axis });
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) s += `<rect x="${280 + i * 28}" y="${54 + j * 28}" width="28" height="28" fill="#FBF1DC" stroke="${C.gold}"/>`;
      s += T(322, 170, "3² = 9", { c: C.red, w: 700 }); return s; })(), "27 to the two-thirds"),
    "$27^{2/3}$: the denominator $3$ says “cube root” (the edge of a $27$-cube is $3$), the numerator $2$ says “square it”: $3^2 = 9$.");
  FIG["ch6/radeq"] = () => box(P({ xr: [-4, 8], yr: [-4, 5], xt: rng(-3, 7), yt: rng(-3, 4),
      fns: [{ f: x => Math.sqrt(x + 3), dom: [-3, 8], lab: [-2.5, 2.2, "start", "y = √(x + 3)"] }, { f: x => x - 3, c: C.purple, lab: [5.3, 0.9, "start", "y = x − 3"] }],
      pts: [{ x: 6, y: 3, t: "x = 6 ✓", dx: -8, dy: -10, a: "end" }, { x: 1, y: -2, c: C.axis, open: true, t: "x = 1 ✗ (extraneous)", dx: 10, dy: 4 }, { x: 1, y: 2, c: C.axis, r: 3 }], alt: "radical equation graph" }),
    "Squaring both sides created $x = 1$, but there the two sides are $2$ and $-2$. The graphs meet only at $x = 6$ — always check!");
  FIG["ch6/inv"] = () => box(P({ xr: [-4, 6], yr: [-4, 6], xt: rng(-3, 5), yt: rng(-3, 5),
      fns: [{ f: x => x, c: C.axis, dash: "6 5", w: 1.5, lab: [5.5, 5.1, "end", "y = x"] }, { f: x => 2 * x + 3, lab: [0.6, 5.3, "start", "f(x) = 2x + 3"] }, { f: x => (x - 3) / 2, c: C.purple, lab: [5.6, 0.2, "end", "f⁻¹(x)"] }],
      pts: [{ x: 0, y: 3, c: C.teal, t: "(0, 3)", dx: 8 }, { x: 3, y: 0, c: C.purple, t: "(3, 0)", dx: 4, dy: -10 }], alt: "function and inverse mirror images" }),
    "An inverse swaps inputs and outputs, so its graph is the mirror image of $f$ across the line $y = x$: $(0, 3) \\leftrightarrow (3, 0)$.");

  /* ---------- Chapter 7 ---------- */
  FIG["ch7/exp"] = () => box(svgRaw(400, 224, (() => { const v = [1000, 1050, 1102.5, 1157.63], x0 = 60, bw = 64, s0 = 140 / 1200; let s = `<line x1="40" y1="180" x2="380" y2="180" stroke="${C.axis}"/>`;
      v.forEach((a, i) => { const h = a * s0, x = x0 + i * 82; s += `<rect x="${x}" y="${180 - h}" width="${bw}" height="${h}" fill="${i ? C.soft : "#FBF1DC"}" stroke="${i ? C.teal : C.gold}"/>` + T(x + bw / 2, 172 - h, "$" + (i === 3 ? "1157.63" : a.toFixed(i === 2 ? 2 : 0)), { s: 12, w: 600 }) + T(x + bw / 2, 198, "year " + i, { s: 12, c: C.axis });
        if (i) s += T(x - 9, 214, "×1.05 →", { s: 11, c: C.red, w: 700 }); }); return s; })(), "compound interest bars"),
    "Each year the money is multiplied by $1.05$ (that's $+5\\%$), so after $3$ years: $1000(1.05)^3$. It grows a little faster every year.");
  FIG["ch7/log"] = () => box(P({ xr: [-2, 9], yr: [-2, 9], xt: rng(-1, 8), yt: rng(-1, 8),
      fns: [{ f: x => x, c: C.axis, dash: "6 5", w: 1.5 }, { f: x => 2 ** x, lab: [1.4, 8.4, "end", "y = 2ˣ"] }, { f: x => Math.log2(x), dom: [0.02, 9], c: C.purple, lab: [8.8, 4.1, "end", "y = log₂ x"] }],
      pts: [{ x: 3, y: 8, c: C.teal, t: "(3, 8)", dx: 8, dy: 4 }, { x: 8, y: 3, c: C.purple, t: "(8, 3)", dx: -4, dy: 18, a: "end" }], alt: "exponential and log graphs" }),
    "$\\log_2$ undoes $2^x$: since $2^3 = 8$, $\\log_2 8 = 3$. In the same way $2^5 = 32$ gives $\\log_2 32 = 5$. The graphs are mirror images across $y = x$.");
  FIG["ch7/solve"] = () => box(P({ xr: [-1, 4], yr: [-2, 26], gx: 0.5, gy: 2, xt: rng(1, 3), yt: rng(4, 24, 4),
      fns: [{ f: x => 3 ** x, lab: [3.3, 25, "end", "y = 3ˣ"] }], hl: [[20, C.purple, "1"]], vl: [[Math.log(20) / Math.log(3), C.red]],
      pts: [{ x: Math.log(20) / Math.log(3), y: 20, t: "x ≈ 2.73", dx: -8, dy: -10, a: "end" }], txt: [[0, 21.4, "y = 20", C.purple, 12.5, "start"]], alt: "3^x equals 20" }),
    "$3^2 = 9$ and $3^3 = 27$, so $3^x = 20$ is between $x = 2$ and $x = 3$. Logs find it exactly: $x = \\dfrac{\\log 20}{\\log 3} \\approx 2.73$.");

  /* ---------- Chapter 8 ---------- */
  FIG["ch8/var"] = () => box(P({ xr: [0, 13], yr: [0, 13], xt: rng(2, 12, 2), yt: rng(2, 12, 2),
      fns: [{ f: x => 24 / x, dom: [1.6, 13], lab: [11.8, 3.5, "middle", "y = 24/x"] }],
      polys: [{ pts: [[0, 0], [4, 0], [4, 6], [0, 6]], op: 0.35 }, { pts: [[0, 0], [8, 0], [8, 3], [0, 3]], fill: "#FBF1DC", stroke: C.gold, op: 0.45 }],
      pts: [{ x: 4, y: 6, t: "(4, 6)" }, { x: 8, y: 3, t: "(8, 3)" }], alt: "inverse variation" }),
    "Inverse variation: $xy$ stays $24$. Double $x$ and $y$ is cut in half — the two rectangles have the same area.");
  FIG["ch8/asym"] = () => box(P({ xr: [-6, 12], yr: [-6, 10], gx: 2, gy: 2, xt: rng(-4, 10, 2), yt: rng(-4, 8, 2),
      fns: [{ f: x => (2 * x + 1) / (x - 3) }], vl: [[3]], hl: [[2]],
      txt: [[3.4, 8.6, "x = 3", C.red, 12.5, "start"], [-5.6, 2.6, "y = 2", C.red, 12.5, "start"], [4.3, -4.2, "f(x) = (2x + 1)/(x − 3)", C.teal, 13, "start", 600]], alt: "rational function with asymptotes" }),
    "The denominator is $0$ at $x = 3$: a vertical asymptote. For huge $x$, $\\dfrac{2x + 1}{x - 3} \\approx \\dfrac{2x}{x} = 2$: a horizontal asymptote.");
  FIG["ch8/rexp"] = () => box(P({ xr: [-4, 8], yr: [-6, 10], gy: 2, xt: rng(-3, 7), yt: rng(-4, 8, 2),
      fns: [{ f: x => x / (x - 2), lab: [7.6, 0.55, "end", "x/(x − 2)"] }, { f: x => 2 / (x - 2) + 3, c: C.purple, lab: [6, 5.2, "middle", "2/(x − 2) + 3"] }], vl: [[2]],
      txt: [[2.3, 9, "x = 2 not allowed", C.red, 12.5, "start"]], alt: "two rational graphs that never meet" }),
    "The two sides are always exactly $2$ apart — the graphs never meet. The algebra gives $x = 2$, which divides by $0$: <b>no solution</b>.");

  /* ---------- Chapter 9 ---------- */
  FIG["ch9/arith"] = () => box(P({ xr: [0, 7], yr: [0, 26], gy: 4, xt: rng(1, 6), yt: rng(4, 24, 4), xl: "n", yl: "aₙ",
      fns: [{ f: n => 4 * n - 1, c: C.axis, dash: "4 5", w: 1.5 }],
      pts: [1, 2, 3, 4, 5, 6].map(n => ({ x: n, y: 4 * n - 1, c: C.teal, t: String(4 * n - 1), dx: -6, dy: -8, a: "end" })),
      txt: [[3.8, 22, "+4 every step: a line of dots", C.teal, 12.5]], alt: "arithmetic sequence points" }),
    "An arithmetic sequence adds the same amount each time, so its points lie on a line: $a_n = 3 + (n - 1) \\cdot 4$.");
  FIG["ch9/geom"] = () => box(P({ xr: [0, 6.5], yr: [0, 180], gy: 20, xt: rng(1, 6), yt: rng(40, 160, 40), xl: "n", yl: "aₙ",
      fns: [{ f: n => 2 * 3 ** (n - 1), c: C.axis, dash: "4 5", w: 1.5, dom: [0.6, 5.3] }],
      pts: [1, 2, 3, 4, 5].map(n => ({ x: n, y: 2 * 3 ** (n - 1), c: C.teal, t: String(2 * 3 ** (n - 1)), dx: -6, dy: -8, a: "end" })),
      txt: [[2.4, 150, "×3 every step: a curve that shoots up", C.teal, 12.5]], alt: "geometric sequence points" }),
    "A geometric sequence multiplies by the same ratio each time ($\\times 3$), so it grows faster and faster: $2, 6, 18, 54, 162, 486, \\dots$");
  FIG["ch9/sigma"] = () => box(svgRaw(400, 190, (() => { let s = "", x = 30; [1, 2, 3, 4].forEach(k => { for (let i = 0; i < k; i++) for (let j = 0; j < k; j++) s += `<rect x="${x + i * 18}" y="${150 - (j + 1) * 18}" width="18" height="18" fill="${[C.soft, "#FBF1DC", "#EDE7FB", "#FBE7E5"][k - 1]}" stroke="${[C.teal, C.gold, C.purple, C.red][k - 1]}"/>`;
      s += T(x + k * 9, 172, `${k}² = ${k * k}`, { s: 12.5, w: 600 }); x += k * 18 + 26; }); return s + T(370, 70, "= 30", { s: 18, w: 700, c: C.red, a: "end" }); })(), "sum of squares picture"),
    "$\\displaystyle\\sum_{k=1}^{4} k^2$ means: put $k = 1, 2, 3, 4$ into $k^2$ and add. Here it's literally adding up squares: $1 + 4 + 9 + 16 = 30$.");

  /* ---------- Chapter 10 ---------- */
  FIG["ch10/para"] = () => box(P({ xr: [-7, 7], yr: [-3, 6], xt: rng(-6, 6, 2), yt: rng(-2, 5),
      fns: [{ f: x => x * x / 8, lab: [-6.6, 5.6, "start", "y = x²/8"] }], hl: [[-2, C.purple]],
      segs: [[4, 2, 0, 2, C.red, "4 3", 1.5], [4, 2, 4, -2, C.red, "4 3", 1.5]],
      pts: [{ x: 0, y: 2, t: "focus (0, 2)", dx: -8, dy: -8, a: "end" }, { x: 4, y: 2, c: C.navy, t: "P", dx: 8, dy: -4 }],
      txt: [[4.4, -2.6, "directrix y = −2", C.purple, 12.5, "start"], [2, 1.4, "4", C.red, 12], [4.4, 0, "4", C.red, 12, "start"]], alt: "parabola focus and directrix" }),
    "Every point $P$ on a parabola is the same distance from the <b>focus</b> as from the <b>directrix</b>. For $P(4, 2)$: both distances are $4$.");
  FIG["ch10/circ"] = () => box(P({ xr: [-5, 9], yr: [-9, 3], xt: rng(-4, 8, 2), yt: rng(-8, 2, 2),
      fns: [{ f: x => -3 + Math.sqrt(Math.max(0, 25 - (x - 2) ** 2)), dom: [-3, 7] }, { f: x => -3 - Math.sqrt(Math.max(0, 25 - (x - 2) ** 2)), dom: [-3, 7] }],
      segs: [[2, -3, 7, -3, C.red, null, 2]], pts: [{ x: 2, y: -3, t: "center (2, −3)", dx: 0, dy: 20, a: "middle" }], txt: [[4.5, -2.4, "r = 5", C.red, 13]], alt: "circle" }),
    "Completing the square turns $x^2 + y^2 - 4x + 6y = 12$ into $(x - 2)^2 + (y + 3)^2 = 25$: center $(2, -3)$, radius $5$.");
  FIG["ch10/ell"] = () => box(P({ xr: [-7, 7], yr: [-4.5, 4.5], xt: rng(-6, 6, 2), yt: [-3, 3],
      fns: [{ f: x => 3 * Math.sqrt(Math.max(0, 1 - x * x / 25)), dom: [-5, 5] }, { f: x => -3 * Math.sqrt(Math.max(0, 1 - x * x / 25)), dom: [-5, 5] }],
      segs: [[-4, 0, 2.4, 2.4, C.gold, "4 3", 1.5], [4, 0, 2.4, 2.4, C.gold, "4 3", 1.5]],
      pts: [{ x: -4, y: 0, t: "(−4, 0)", dx: 0, dy: 18, a: "middle" }, { x: 4, y: 0, t: "(4, 0)", dx: 0, dy: 18, a: "middle" }, { x: 5, y: 0, c: C.navy, r: 3, t: "5", dx: 6, dy: -6 }, { x: 0, y: 3, c: C.navy, r: 3, t: "3", dx: 6, dy: -6 }],
      txt: [[0, -3.9, "c² = a² − b² = 25 − 9 = 16", C.ink, 12.5]], alt: "ellipse with foci" }),
    "For an ellipse the two distances to the foci always add to $2a = 10$. The foci sit $c = 4$ from the center.");

  /* ---------- Chapter 11 ---------- */
  FIG["ch11/count"] = () => box(svgRaw(400, 120, (() => { let s = ""; const pick = [1, 3, 6]; for (let i = 0; i < 7; i++) { const x = 40 + i * 52, on = pick.includes(i); s += `<circle cx="${x}" cy="50" r="18" fill="${on ? C.soft : "#fff"}" stroke="${on ? C.teal : C.axis}" stroke-width="${on ? 3 : 1.5}"/>` + T(x, 55, String.fromCharCode(65 + i), { w: 700, c: on ? C.teal : C.axis }); }
      return s + T(200, 100, "one choice: {B, D, G} — order doesn't matter, so ABC = CBA", { s: 12.5, c: C.axis }); })(), "choose 3 of 7"),
    "Choosing $3$ of $7$ where order doesn't matter: $_7C_3 = \\dfrac{7 \\cdot 6 \\cdot 5}{3 \\cdot 2 \\cdot 1} = 35$ different groups.");
  FIG["ch11/stat"] = () => box(P({ xr: [0.5, 10], yr: [-0.6, 4], grid: false, h: 190, xt: rng(1, 9), yl: " ",
      pts: [[2, 1], [4, 1], [4, 2], [4, 3], [5, 1], [5, 2], [7, 1], [9, 1]].map(([x, y]) => ({ x, y: y * 0.8, c: C.teal, r: 7 })),
      vl: [[5, C.red, "1"], [3, C.gold], [7, C.gold]], txt: [[5, 3.7, "mean 5", C.red, 12.5], [3, 3.7, "5 − 2", C.gold, 12], [7, 3.7, "5 + 2", C.gold, 12]], alt: "dot plot with mean and standard deviation" }),
    "The mean is the balance point ($5$). The standard deviation $\\sigma = 2$ is a typical distance from the mean.");
  FIG["ch11/cond"] = () => box(svgRaw(400, 190, `<rect x="20" y="20" width="360" height="140" rx="8" fill="#fff" stroke="${C.axis}"/>
      <rect x="20" y="20" width="180" height="140" fill="${C.soft}" stroke="${C.teal}" stroke-width="2"/><rect x="128" y="20" width="72" height="140" fill="#7FC8C0" stroke="${C.teal}" stroke-width="2"/>
      <rect x="128" y="20" width="144" height="140" fill="none" stroke="${C.purple}" stroke-width="2.5" stroke-dasharray="6 4"/>
      ${T(70, 95, "A: 0.5", { w: 700, c: C.teal })}${T(164, 95, "A ∩ B", { w: 700, s: 12 })}${T(164, 112, "0.2", { w: 700 })}${T(236, 95, "B", { w: 700, c: C.purple })}
      ${T(200, 182, "Given A, we only look inside A:  0.2 ÷ 0.5 = 0.4", { s: 12.5, c: C.axis })}`, "conditional probability area model"),
    "$P(B \\mid A)$: the <b>whole</b> shrinks to $A$. The part of $A$ that is also $B$ is $0.2$ out of $0.5$, so $P(B \\mid A) = 0.4$.");

  /* ---------- Chapter 12 ---------- */
  FIG["ch12/ops"] = () => box(`<table class="mx"><tr><td rowspan="2" style="font-size:22px;color:${C.red};font-weight:700">2 ×</td><td style="background:${C.soft}">1</td><td style="background:${C.soft}">3</td><td rowspan="2" style="font-size:22px">=</td><td style="background:#FBF1DC">2</td><td style="background:#FBF1DC">6</td></tr><tr><td style="background:${C.soft}">−2</td><td style="background:${C.soft}">0</td><td style="background:#FBF1DC">−4</td><td style="background:#FBF1DC">0</td></tr></table>`,
    "Scalar multiplication: every entry gets multiplied by $2$. Adding matrices works the same way — entry by entry, same positions.");
  FIG["ch12/mult"] = () => box(`<table class="mx"><tr><td style="background:${C.soft};color:${C.teal};font-weight:700">1</td><td style="background:${C.soft};color:${C.teal};font-weight:700">2</td><td rowspan="2" style="width:6px"></td><td style="background:#FBF1DC;font-weight:700">5</td><td rowspan="2" style="font-size:20px">=</td><td style="background:${C.soft};color:${C.teal};font-weight:700">1·5 + 2·6 = 17</td></tr><tr><td style="background:#EDE7FB;color:${C.purple};font-weight:700">3</td><td style="background:#EDE7FB;color:${C.purple};font-weight:700">4</td><td style="background:#FBF1DC;font-weight:700">6</td><td style="background:#EDE7FB;color:${C.purple};font-weight:700">3·5 + 4·6 = 39</td></tr></table>`,
    "Row times column: walk across a <b>row</b> of the first matrix and down the <b>column</b> of the second, multiply pairs, and add.");
  FIG["ch12/det"] = () => box(P({ xr: [-1, 12], yr: [-1, 9], xt: rng(2, 11, 2), yt: rng(2, 8, 2),
      polys: [{ pts: [[0, 0], [4, 2], [11, 8], [7, 6]] }], segs: [[0, 0, 4, 2, C.teal, null, 3], [0, 0, 7, 6, C.purple, null, 3]],
      pts: [{ x: 4, y: 2, c: C.teal, t: "(4, 2)", dx: 8, dy: 10 }, { x: 7, y: 6, c: C.purple, t: "(7, 6)", dx: -8, dy: -6, a: "end" }], txt: [[5.6, 4.3, "area = 10", C.ink, 14, "middle", 700]], alt: "determinant as area" }),
    "The columns $(4, 2)$ and $(7, 6)$ make a parallelogram. Its area is the determinant: $4 \\cdot 6 - 7 \\cdot 2 = 10$.");

  /* ---------- Chapter 13 ---------- */
  const unitCircle = (deg, extra) => { const W = 400, H = 300, c = [200, 150], r = 110, a = deg * Math.PI / 180, px = c[0] + r * Math.cos(a), py = c[1] - r * Math.sin(a);
    let s = `<line x1="40" y1="${c[1]}" x2="360" y2="${c[1]}" stroke="${C.axis}"/><line x1="${c[0]}" y1="20" x2="${c[0]}" y2="280" stroke="${C.axis}"/><circle cx="${c[0]}" cy="${c[1]}" r="${r}" fill="none" stroke="${C.teal}" stroke-width="2"/>`;
    s += `<path d="M${c[0] + 28},${c[1]} A28,28 0 ${deg > 180 ? 1 : 0} 0 ${c[0] + 28 * Math.cos(a)},${c[1] - 28 * Math.sin(a)}" fill="none" stroke="${C.red}" stroke-width="2"/>`;
    s += `<line x1="${c[0]}" y1="${c[1]}" x2="${px}" y2="${py}" stroke="${C.navy}" stroke-width="2.5"/><circle cx="${px}" cy="${py}" r="5" fill="${C.red}"/>`;
    return svgRaw(W, H, s + (extra ? extra(c, r, px, py) : ""), "unit circle"); };
  FIG["ch13/rad"] = () => box(unitCircle(120, (c, r, px, py) => `<path d="M${c[0] + r},${c[1]} A${r},${r} 0 0 0 ${px},${py}" fill="none" stroke="${C.gold}" stroke-width="5" stroke-opacity=".8"/>` + T(c[0] + 30, c[1] - 34, "120°", { c: C.red, w: 700, a: "start" }) + T(c[0] + 96, c[1] - 104, "arc = 2π/3", { c: C.gold, w: 700, a: "start" }) + T(c[0] + r + 8, c[1] + 16, "r = 1", { a: "start", s: 12, c: C.axis })),
    "On a circle of radius $1$, the radian measure <b>is</b> the arc length. A full turn is $2\\pi$, so $120^\\circ = \\dfrac{120}{360} \\cdot 2\\pi = \\dfrac{2\\pi}{3}$.");
  FIG["ch13/unit"] = () => box(unitCircle(120, (c, r, px, py) => { const qx = c[0] + r * Math.cos(Math.PI / 3), qy = c[1] - r * Math.sin(Math.PI / 3);
      return `<line x1="${px}" y1="${py}" x2="${px}" y2="${c[1]}" stroke="${C.purple}" stroke-dasharray="5 4"/><line x1="${c[0]}" y1="${c[1]}" x2="${qx}" y2="${qy}" stroke="${C.axis}" stroke-dasharray="5 4"/><circle cx="${qx}" cy="${qy}" r="4" fill="${C.axis}"/>`
        + T(px - 6, py - 12, "(−½, √3/2)", { c: C.red, w: 700, a: "end" }) + T(qx + 6, qy - 10, "(½, √3/2)", { c: C.axis, a: "start" }) + T(c[0] + 30, c[1] - 34, "120°", { c: C.red, w: 700, a: "start" }) + T(c[0] - 40, c[1] + 18, "60°", { c: C.purple, s: 12 }); }),
    "$120^\\circ$ is a mirror image of $60^\\circ$ across the $y$-axis: same height, opposite side. So $\\cos 120^\\circ = -\\tfrac12$.");
  FIG["ch13/graph"] = () => box(P({ h: 300, xr: [-0.5, 2 * Math.PI + 0.3], yr: [-5.2, 3.8], gx: Math.PI / 4, xt: [[Math.PI / 2, "π/2"], [Math.PI, "π"], [3 * Math.PI / 2, "3π/2"], [2 * Math.PI, "2π"]], yt: [-4, -1, 2],
      fns: [{ f: x => 3 * Math.sin(2 * x) - 1 }], hl: [[-1, C.gold], [2, C.purple, "2 4"], [-4, C.purple, "2 4"]],
      segs: [[0, 2.5, Math.PI, 2.5, C.red, null, 2.5], [Math.PI / 4, -1, Math.PI / 4, 2, C.purple, null, 2.5]],
      txt: [[Math.PI / 2, 2.85, "period π", C.red, 12.5], [Math.PI / 4 + 0.1, 0.4, "3", C.purple, 13, "start", 700], [2 * Math.PI, -4.85, "midline y = −1 (gold)   amplitude 3 (purple)", C.axis, 11.5, "end"]], alt: "sine graph" }),
    "$y = 3\\sin(2x) - 1$: the midline moves to $y = -1$, the wave goes $3$ above and below it, and the $2$ squeezes one full wave into $\\dfrac{2\\pi}{2} = \\pi$.");

  /* ---------- Chapter 14 ---------- */
  FIG["ch14/ident"] = () => box(svgRaw(400, 200, `<polygon points="60,170 300,170 300,30" fill="${C.soft}" stroke="${C.teal}" stroke-width="2.5"/><rect x="286" y="156" width="14" height="14" fill="none" stroke="${C.teal}"/>
      <path d="M100,170 A40,40 0 0 0 95,150" fill="none" stroke="${C.red}" stroke-width="2"/>${T(112, 160, "θ", { c: C.red, w: 700, s: 15 })}
      ${T(180, 190, "4", { w: 700, s: 15 })}${T(316, 105, "3", { w: 700, s: 15, a: "start" })}${T(165, 88, "5", { w: 700, s: 15 })}
      ${T(40, 40, "sin θ = 3/5", { a: "start", s: 12.5 })}${T(40, 60, "cos θ = 4/5", { a: "start", s: 12.5 })}${T(40, 80, "tan θ = 3/4", { a: "start", s: 12.5 })}`, "3-4-5 right triangle"),
    "$\\sin\\theta = \\tfrac35$ means opposite $3$, hypotenuse $5$. The Pythagorean identity $\\sin^2\\theta + \\cos^2\\theta = 1$ is this triangle: $3^2 + 4^2 = 5^2$.");
  FIG["ch14/eq"] = () => box(P({ xr: [-10, 370], yr: [-2.6, 2.8], gx: 30, gy: 1, xt: [[90, "90°"], [180, "180°"], [270, "270°"], [360, "360°"]], yt: [-2, -1, 1, 2],
      fns: [{ f: x => 2 * Math.sin(x * Math.PI / 180), lab: [100, 2.3, "start", "y = 2 sin x"] }], hl: [[1, C.purple, "1"]],
      pts: [{ x: 30, y: 1, t: "30°", dx: -6, dy: -10, a: "end" }, { x: 150, y: 1, t: "150°", dx: 8, dy: -10 }], txt: [[330, 1.25, "y = 1", C.purple, 12.5]], alt: "2 sin x = 1" }),
    "In one turn, the wave $y = 2\\sin x$ crosses the line $y = 1$ twice: at $30^\\circ$ and at $180^\\circ - 30^\\circ = 150^\\circ$.");
  FIG["ch14/laws"] = () => box(svgRaw(400, 210, (() => { const Cc = [60, 180], u = 34, A = [Cc[0] + 7 * u, Cc[1]], B = [Cc[0] + 5 * u * Math.cos(Math.PI / 3), Cc[1] - 5 * u * Math.sin(Math.PI / 3)];
      return `<polygon points="${Cc.join(",")} ${A.join(",")} ${B.join(",")}" fill="${C.soft}" stroke="${C.teal}" stroke-width="2.5"/><line x1="${B[0]}" y1="${B[1]}" x2="${A[0]}" y2="${A[1]}" stroke="${C.red}" stroke-width="3"/>
        <path d="M${Cc[0] + 30},${Cc[1]} A30,30 0 0 0 ${Cc[0] + 30 * Math.cos(Math.PI / 3)},${Cc[1] - 30 * Math.sin(Math.PI / 3)}" fill="none" stroke="${C.navy}" stroke-width="2"/>
        ${T(Cc[0] + 42, Cc[1] - 12, "60°", { a: "start", c: C.navy, w: 700, s: 12.5 })}${T(Cc[0] - 10, Cc[1] + 4, "C", { w: 700 })}${T(A[0] + 10, A[1] + 4, "A", { w: 700 })}${T(B[0], B[1] - 10, "B", { w: 700 })}
        ${T((Cc[0] + A[0]) / 2, Cc[1] + 20, "b = 7", { w: 700 })}${T((Cc[0] + B[0]) / 2 - 22, (Cc[1] + B[1]) / 2, "a = 5", { w: 700 })}${T((A[0] + B[0]) / 2 + 26, (A[1] + B[1]) / 2 - 6, "c = ?", { w: 700, c: C.red, a: "start" })}`; })(), "triangle with two sides and included angle"),
    "Two sides and the angle <b>between</b> them: use the Law of Cosines, $c^2 = a^2 + b^2 - 2ab\\cos C = 25 + 49 - 35 = 39$.");


  /* =====================================================================
     READ-THE-GRAPH PRACTICE PROBLEMS
     For each topic below, one level now mixes in problems that are read
     from a graph (half of the problems at that level). The original
     problems stay exactly as they were.
     ===================================================================== */
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pk = a => a[Math.floor(Math.random() * a.length)];
  const nz = (a, b) => { let x; do { x = ri(a, b); } while (x === 0); return x; };
  const pt = (x, y) => `(${x}, ${y})`;
  const fig = svg => `<div class="a2fig" style="margin:10px 0">${svg}</div>`;
  const G10 = { xr: [-7, 7], yr: [-7, 7], xt: rng(-6, 6), yt: rng(-6, 6) };
  const GQ = {};
  GQ["ch2/lin"] = { lv: 2, gen: () => { const m = nz(-3, 3), b = ri(-4, 4), x1 = ri(-3, 1), x2 = x1 + (Math.abs(m) > 1 ? 2 : 3);
      return { q: `What is the <b>slope</b> of the line?${fig(P(Object.assign({}, G10, { fns: [{ f: x => m * x + b }], pts: [{ x: x1, y: m * x1 + b, c: C.navy, r: 4 }, { x: x2, y: m * x2 + b, c: C.navy, r: 4 }] })))}`, type: "number", ans: m, ansTex: `m = ${m}`, hint: "Pick two lattice points on the line. Slope = rise ÷ run.", sol: [`From $${pt(x1, m * x1 + b)}$ to $${pt(x2, m * x2 + b)}$: rise $${m * (x2 - x1)}$, run $${x2 - x1}$.`, `$m = ${m * (x2 - x1)} \\div ${x2 - x1} = ${m}$.`] }; } };
  GQ["ch2/trans"] = { lv: 2, gen: () => { const h = ri(-4, 4), k = ri(-4, 4), a = pk([1, -1, 2, -2]);
      return { q: `This is the graph of $y = a|x - h| + k$. What is its <b>vertex</b>?${fig(P(Object.assign({}, G10, { fns: [{ f: x => a * Math.abs(x - h) + k }] })))}`, type: "point", ans: [h, k], ansTex: pt(h, k), hint: "The vertex is the sharp corner of the V.", sol: [`The corner is at $${pt(h, k)}$, so $h = ${h}$ and $k = ${k}$.`] }; } };
  GQ["ch3/two"] = { lv: 1, gen: () => { let m1, m2, x0, y0; do { m1 = nz(-3, 3); m2 = nz(-3, 3); x0 = ri(-4, 4); y0 = ri(-4, 4); } while (m1 === m2);
      return { q: `What is the solution of the system shown by the two lines?${fig(P(Object.assign({}, G10, { fns: [{ f: x => m1 * (x - x0) + y0 }, { f: x => m2 * (x - x0) + y0, c: C.purple }] })))}`, type: "point", ans: [x0, y0], ansTex: pt(x0, y0), hint: "The solution is where the lines cross.", sol: [`The lines cross at $${pt(x0, y0)}$.`] }; } };
  GQ["ch3/lp"] = { lv: 3, gen: () => { let a, b, c, d; do { a = ri(3, 6); b = ri(2, 5); c = ri(1, a - 1); d = ri(1, b); } while (c / a + d / b <= 1.15 || (d === b && c === 0)); const V = [[0, 0], [a, 0], [c, d], [0, b]];
      const p = ri(2, 5), q = ri(2, 5), vals = V.map(([x, y]) => p * x + q * y), mx = Math.max(...vals), at = V[vals.indexOf(mx)];
      return { q: `The shaded region is the feasible region. What is the <b>maximum</b> of $P = ${p}x + ${q}y$?${fig(P({ xr: [-1, 7], yr: [-1, 6], xt: rng(1, 6), yt: rng(1, 5), polys: [{ pts: V }], pts: V.map(([x, y]) => ({ x, y, c: C.navy, r: 4, t: pt(x, y), dx: 6, dy: -6 })) }))}`, type: "number", ans: mx, ansTex: `${mx}`, hint: "Try every corner of the region.", sol: [V.map(([x, y], i) => `$P${pt(x, y)} = ${vals[i]}$`).join(", ") + ".", `The largest is $${mx}$ at $${pt(at[0], at[1])}$.`] }; } };
  GQ["ch4/vf"] = { lv: 1, gen: () => { const h = ri(-3, 3), k = ri(-4, 4), a = pk([1, -1, 0.5, -0.5, 2]);
      return { q: `What is the <b>vertex</b> of this parabola?${fig(P(Object.assign({}, G10, { fns: [{ f: x => a * (x - h) ** 2 + k }] })))}`, type: "point", ans: [h, k], ansTex: pt(h, k), hint: `It's the ${a > 0 ? "lowest" : "highest"} point of the parabola.`, sol: [`The ${a > 0 ? "lowest" : "highest"} point is $${pt(h, k)}$.`] }; } };
  GQ["ch4/solve"] = { lv: 1, gen: () => { let r1, r2; do { r1 = ri(-5, 4); r2 = ri(-4, 5); } while (r2 - r1 < 2); const a = pk([1, -1, 0.5]), v = -a * ((r2 - r1) / 2) ** 2;
      return { q: `Use the graph of $y = f(x)$ to solve $f(x) = 0$. Give both solutions.${fig(P(Object.assign({}, G10, { yr: [-8, 8], fns: [{ f: x => a * (x - r1) * (x - r2) }] })))}`, type: "roots", ans: [r1, r2], ansTex: `x = ${r1},\\ ${r2}`, hint: "Where does the graph cross the x-axis?", sol: [`The graph crosses the $x$-axis at $x = ${r1}$ and $x = ${r2}$.`] }; } };
  GQ["ch5/beh"] = { lv: 2, gen: () => { const deg = pk([3, 4]), s = pk([1, -1]), r = [ri(-4, -2), ri(-1, 1), ri(2, 4), ri(-3, 3)].slice(0, deg), k = deg === 3 ? 0.15 : 0.04, ask = Math.random() < .5;
      const f = x => s * k * r.reduce((p, z) => p * (x - z), 1);
      return { q: `This is the graph of a polynomial. Is its ${ask ? "<b>leading coefficient</b> positive or negative" : "<b>degree</b> even or odd"}?${fig(P(Object.assign({}, G10, { yr: [-8, 8], fns: [{ f }] })))}`, type: "word", opts: ask ? ["POSITIVE", "NEGATIVE"] : ["EVEN", "ODD"], ans: ask ? (s > 0 ? "POSITIVE" : "NEGATIVE") : (deg % 2 ? "ODD" : "EVEN"), ansTex: `\\text{${ask ? (s > 0 ? "positive" : "negative") : (deg % 2 ? "odd" : "even")}}`, hint: "Look only at the two ends: same direction → even degree. Right end up → positive leading coefficient.", sol: [deg % 2 ? "The ends go opposite ways: odd degree." : "Both ends go the same way: even degree.", `The right end goes ${s > 0 ? "up: positive" : "down: negative"} leading coefficient.`] }; } };
  GQ["ch5/roots"] = { lv: 2, gen: () => { const z = []; while (z.length < 3) { const v = ri(-4, 4); if (!z.includes(v)) z.push(v); } z.sort((a, b) => a - b); const s = pk([1, -1]), f = x => s * 0.25 * (x - z[0]) * (x - z[1]) * (x - z[2]);
      return { q: `Find all the zeros of the polynomial from its graph.${fig(P(Object.assign({}, G10, { yr: [-8, 8], fns: [{ f }] })))}`, type: "roots", ans: z, ansTex: `x = ${z.join(",\\ ")}`, hint: "Zeros are where the graph meets the x-axis.", sol: [`The graph crosses at $x = ${z.join(", ")}$.`, `So $f(x) = a(x ${z[0] < 0 ? "+ " + -z[0] : "- " + z[0]})(x ${z[1] < 0 ? "+ " + -z[1] : "- " + z[1]})(x ${z[2] < 0 ? "+ " + -z[2] : "- " + z[2]})$.`] }; } };
  GQ["ch6/inv"] = { lv: 3, gen: () => { const m = pk([1, 2, -1, 0.5]), b = ri(-3, 3), x0 = pk(m === 0.5 ? [-4, -2, 2, 4] : [-2, -1, 1, 2, 3]), y0 = m * x0 + b;
      return { q: `The graph of $f$ is shown. Find $f^{-1}(${y0})$.${fig(P(Object.assign({}, G10, { fns: [{ f: x => m * x + b, lab: [5.5, m * 5.5 + b, "end", "f"] }], pts: [{ x: x0, y: y0, c: C.navy, r: 4 }] })))}`, type: "number", ans: x0, ansTex: `${x0}`, hint: `$f^{-1}(${y0})$ asks: which input gives the output $${y0}$?`, sol: [`Go across from $y = ${y0}$ to the graph: the point $${pt(x0, y0)}$.`, `So $f(${x0}) = ${y0}$ and $f^{-1}(${y0}) = ${x0}$.`] }; } };
  GQ["ch7/exp"] = { lv: 2, gen: () => { const a = pk([1, 2, 3]), b = pk([2, 3]);
      return { q: `The graph shows $y = a \\cdot b^x$. Find $b$.${fig(P({ xr: [-2, 3.5], yr: [-2, 30], gx: 1, gy: 4, xt: rng(-1, 3), yt: rng(4, 28, 4), fns: [{ f: x => a * b ** x }], pts: [{ x: 0, y: a, c: C.navy, r: 4, t: pt(0, a) }, { x: 1, y: a * b, c: C.navy, r: 4, t: pt(1, a * b) }] }))}`, type: "number", ans: b, ansTex: `b = ${b}`, hint: "Compare the heights at x = 0 and x = 1. What do you multiply by?", sol: [`At $x = 0$: $y = a = ${a}$. At $x = 1$: $y = ab = ${a * b}$.`, `$b = ${a * b} \\div ${a} = ${b}$.`] }; } };
  GQ["ch7/log"] = { lv: 2, gen: () => { const b = pk([2, 3, 4, 5]);
      return { q: `The graph of $y = \\log_b x$ passes through the marked point. Find $b$.${fig(P({ xr: [-1, 9], yr: [-3, 3], xt: rng(1, 8), yt: [-2, -1, 1, 2], fns: [{ f: x => Math.log(x) / Math.log(b), dom: [0.05, 9] }], pts: [{ x: b, y: 1, c: C.navy, t: pt(b, 1) }, { x: 1, y: 0, c: C.navy, r: 3 }] }))}`, type: "number", ans: b, ansTex: `b = ${b}`, hint: "$\\log_b b = 1$ for every base.", sol: [`The point $${pt(b, 1)}$ means $\\log_b ${b} = 1$, so $b^1 = ${b}$.`, `$b = ${b}$.`] }; } };
  GQ["ch8/asym"] = { lv: 1, gen: () => { const h = ri(-4, 4), k = ri(-3, 3), a = pk([1, 2, -1, -2]), ask = Math.random() < .5;
      return { q: `What is the equation of the <b>${ask ? "vertical" : "horizontal"}</b> asymptote? Type just the number.${fig(P(Object.assign({}, G10, { fns: [{ f: x => a / (x - h) + k }], vl: [[h]], hl: [[k]] })))}`, type: "number", ans: ask ? h : k, ansTex: ask ? `x = ${h}` : `y = ${k}`, hint: "Asymptotes are the dashed lines the graph gets closer and closer to.", sol: [ask ? `The vertical dashed line is $x = ${h}$.` : `The horizontal dashed line is $y = ${k}$.`] }; } };
  GQ["ch9/arith"] = { lv: 1, gen: () => { const a = ri(-3, 5), d = pk([2, 3, 4, -2, -3]), ys = [1, 2, 3, 4, 5].map(n => a + (n - 1) * d), lo = Math.min(0, ...ys) - 2, hi = Math.max(0, ...ys) + 2;
      return { q: `The graph shows the first five terms of an arithmetic sequence. What is the common difference $d$?${fig(P({ xr: [0, 6], yr: [lo, hi], gy: 2, xt: rng(1, 5), yt: rng(Math.ceil(lo / 2) * 2, hi, 2), xl: "n", yl: "aₙ", pts: ys.map((y, i) => ({ x: i + 1, y, c: C.teal, t: String(y), dx: 6, dy: -6 })) }))}`, type: "number", ans: d, ansTex: `d = ${d}`, hint: "How much does each term change from the one before?", sol: [`$${ys[1]} - ${ys[0] < 0 ? "(" + ys[0] + ")" : ys[0]} = ${d}$ each step.`] }; } };
  GQ["ch10/circ"] = { lv: 1, gen: () => { const h = ri(-2, 2), k = ri(-2, 2), r = ri(2, 4), ask = Math.random() < .5;
      return { q: `What is the ${ask ? "<b>center</b>" : "<b>radius</b>"} of the circle?${fig(P(Object.assign({}, G10, { fns: [{ f: x => k + Math.sqrt(Math.max(0, r * r - (x - h) ** 2)), dom: [h - r, h + r] }, { f: x => k - Math.sqrt(Math.max(0, r * r - (x - h) ** 2)), dom: [h - r, h + r] }], pts: [{ x: h, y: k, c: C.navy, r: 3 }] })))}`, type: ask ? "point" : "number", ans: ask ? [h, k] : r, ansTex: ask ? pt(h, k) : `${r}`, hint: ask ? "The center is the middle point." : "Count from the center to the circle.", sol: [`Center $${pt(h, k)}$, radius $${r}$: $(x ${h < 0 ? "+ " + -h : "- " + h})^2 + (y ${k < 0 ? "+ " + -k : "- " + k})^2 = ${r * r}$.`] }; } };
  GQ["ch10/ell"] = { lv: 2, gen: () => { let a, b; do { a = ri(3, 6); b = ri(2, 5); } while (a === b); const wide = a > b;
      return { q: `How long is the <b>major axis</b> (the longest width) of the ellipse?${fig(P(Object.assign({}, G10, { fns: [{ f: x => b * Math.sqrt(Math.max(0, 1 - x * x / (a * a))), dom: [-a, a] }, { f: x => -b * Math.sqrt(Math.max(0, 1 - x * x / (a * a))), dom: [-a, a] }] })))}`, type: "number", ans: 2 * Math.max(a, b), ansTex: `${2 * Math.max(a, b)}`, hint: "Find the longest distance across through the center.", sol: [wide ? `It reaches $x = \\pm ${a}$: length $${2 * a}$.` : `It reaches $y = \\pm ${b}$: length $${2 * b}$.`] }; } };
  GQ["ch11/stat"] = { lv: 2, gen: () => { const n = pk([5, 7, 9]), d = Array.from({ length: n }, () => ri(1, 9)).sort((x, y) => x - y), cnt = {}; d.forEach(v => cnt[v] = (cnt[v] || 0) + 1);
      const pts = []; Object.entries(cnt).forEach(([v, c]) => { for (let i = 1; i <= c; i++) pts.push({ x: +v, y: i * 0.8, c: C.teal, r: 7 }); });
      return { q: `The dot plot shows ${n} test scores. What is the <b>median</b>?${fig(P({ xr: [0.5, 9.5], yr: [-0.6, Math.max(...Object.values(cnt)) * 0.8 + 0.8], grid: false, h: 170, xt: rng(1, 9), yl: " ", pts }))}`, type: "number", ans: d[(n - 1) / 2], ansTex: `${d[(n - 1) / 2]}`, hint: `Count to the middle dot: number ${(n + 1) / 2} of ${n}.`, sol: [`In order: $${d.join(", ")}$.`, `The middle (${(n + 1) / 2}th) value is $${d[(n - 1) / 2]}$.`] }; } };
  GQ["ch12/det"] = { lv: 3, gen: () => { let a, b, c, d; do { a = ri(1, 5); b = ri(-1, 3); c = ri(-1, 4); d = ri(1, 5); } while (a * d - b * c <= 0 || a + c > 7 || b + d > 7);
      return { q: `Two column vectors $(${a}, ${b})$ and $(${c}, ${d})$ make the parallelogram. What is its area?${fig(P({ xr: [-2, 8], yr: [-2, 8], xt: rng(-1, 7), yt: rng(-1, 7), polys: [{ pts: [[0, 0], [a, b], [a + c, b + d], [c, d]] }], segs: [[0, 0, a, b, C.teal, null, 3], [0, 0, c, d, C.purple, null, 3]] }))}`, type: "number", ans: a * d - b * c, ansTex: `${a} \\cdot ${d} - ${b < 0 ? "(" + b + ")" : b} \\cdot ${c < 0 ? "(" + c + ")" : c} = ${a * d - b * c}`, hint: "Area = |determinant| of the matrix with these columns.", sol: [`$\\det = ${a} \\cdot ${d} - ${b < 0 ? "(" + b + ")" : b} \\cdot ${c < 0 ? "(" + c + ")" : c} = ${a * d - b * c}$.`] }; } };
  GQ["ch13/unit"] = { lv: 1, gen: () => { const deg = pk([30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330]);
      return { q: `The point on the unit circle is at what angle (in degrees, from $0^\\circ$ to $360^\\circ$)?${fig(unitCircle(deg, () => ""))}`, type: "number", ans: deg, ansTex: `${deg}^\\circ`, hint: "Start on the positive x-axis and turn counterclockwise. Use the reference angle (30°, 45° or 60°).", sol: [`Reference angle $${[30, 45, 60].find(r => [r, 180 - r, 180 + r, 360 - r].includes(deg))}^\\circ$ in quadrant ${deg < 90 ? "I" : deg < 180 ? "II" : deg < 270 ? "III" : "IV"}: $${deg}^\\circ$.`] }; } };
  GQ["ch13/graph"] = { lv: 1, gen: () => { const a = ri(1, 3), d = ri(-2, 2), b = pk([1, 2]), ask = pk(["amplitude", "midline"]);
      return { q: `For the graph of $y = a\\sin(bx) + d$ shown, what is the <b>${ask}</b>? ${ask === "midline" ? "(Type the number $d$.)" : ""}${fig(P({ h: 260, xr: [-0.4, 2 * Math.PI + 0.3], yr: [-5.5, 5.5], gx: Math.PI / 4, xt: [[Math.PI / 2, "π/2"], [Math.PI, "π"], [3 * Math.PI / 2, "3π/2"], [2 * Math.PI, "2π"]], yt: rng(-5, 5), fns: [{ f: x => a * Math.sin(b * x) + d }] }))}`, type: "number", ans: ask === "amplitude" ? a : d, ansTex: ask === "amplitude" ? `${a}` : `y = ${d}`, hint: ask === "amplitude" ? "Half the distance from the highest point to the lowest point." : "The line halfway between the highest and lowest points.", sol: [`Highest $${d + a}$, lowest $${d - a}$.`, ask === "amplitude" ? `Amplitude $= (${d + a} - ${d - a < 0 ? "(" + (d - a) + ")" : d - a}) \\div 2 = ${a}$.` : `Midline $y = (${d + a} + ${d - a < 0 ? "(" + (d - a) + ")" : d - a}) \\div 2 = ${d}$.`] }; } };
  GQ["ch14/eq"] = { lv: 2, gen: () => { const c = pk([0.5, 1, 1.5, -0.5, -1, 2, 2.5]), A = 2, n = Math.abs(c) < A ? 2 : Math.abs(c) === A ? 1 : 0;
      return { q: `How many solutions does $2\\sin x = ${c}$ have for $0^\\circ \\le x < 360^\\circ$? Use the graph.${fig(P({ xr: [-10, 370], yr: [-3, 3], gx: 30, gy: 1, xt: [[90, "90°"], [180, "180°"], [270, "270°"], [360, "360°"]], yt: [-2, -1, 1, 2], fns: [{ f: x => 2 * Math.sin(x * Math.PI / 180), dom: [0, 359.9] }], hl: [[c, C.purple, "1"]] }))}`, type: "number", ans: n, ansTex: `${n}`, hint: "Count the places where the wave meets the horizontal line.", sol: [n ? `The line $y = ${c}$ meets the wave ${n === 2 ? "twice" : "once (at the top)"}.` : `The line $y = ${c}$ is above the wave's highest point $2$: no solutions.`] }; } };

  /* ---------- attach ---------- */
  function attach() {
    if (typeof CHAPTERS === "undefined") return;
    CHAPTERS.forEach(ch => ch.topics.forEach(t => { const f = FIG[ch.id + "/" + t.id]; if (f && t.lesson && !t.lesson.fig) { try { t.lesson.fig = f(); } catch (e) { console.warn("a2 fig", ch.id, t.id, e); } } }));
    CHAPTERS.forEach(ch => ch.topics.forEach(t => { const g = GQ[ch.id + "/" + t.id]; if (!g || !t.gen || !t.gen[g.lv - 1] || t.gen[g.lv - 1].graphMix) return;
      const orig = t.gen[g.lv - 1], mixed = () => Math.random() < 0.5 ? g.gen() : orig(); mixed.graphMix = true; t.gen[g.lv - 1] = mixed; }));
  }
  attach();
  window.ALGEBRA2_FIGS = FIG; window.ALGEBRA2_GRAPHQ = GQ;
})();

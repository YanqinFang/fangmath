/* =====================================================================
   PROF. FANG MATH — "Learn & Practice at Your Level" pages ⇄ the site
   1. Scores: each run of practice (one chapter + topic + level) is saved to
      the signed-in student's record, like the other practice apps.
   2. Mistake Log: a problem missed after two tries (or "Show answer") is
      added to the student's Mistake Log for spaced review.
   Works with the shared globals of every practice/*-levels.html page:
   finish(correct), T (topic), L (level), PR (problem), CH (chapter).
   ===================================================================== */
(function () {
  const SUPABASE_URL = "https://zelwkxoefgywnktauyuq.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_7qJFwmQ-6RXRllYG-wXx9Q_GU6YSYWd";
  const PAGES = {
    "algebra1-levels": ["alg1", "Algebra 1"], "geometry-levels": ["geo", "Geometry"],
    "algebra2-levels": ["alg2", "Algebra 2"], "precalculus-levels": ["precalc", "Precalculus"],
    "calculus-ab-levels": ["calcab", "AP Calculus AB"], "grade3-levels": ["grade3", "Grade 3"], "grade4-levels": ["grade4", "Grade 4"], "grade6-levels": ["grade6", "Grade 6"], "calculus-bc-levels": ["calcbc", "AP Calculus BC"],
  };
  const page = (location.pathname.match(/([\w-]+)\.html$/) || [])[1] || "";
  const [CID, CTITLE] = PAGES[page] || [page, page];
  const NAMES = ["Foundation", "Basic", "Standard", "Challenge", "Competition"];
  const QKEY = "fm-lv-pending";            // sessions waiting to be saved
  const per = 10;                          // save after this many problems

  // the signed-in student (same storage as the main site); mistakes.js reads `kid`
  const getKid = () => { try { return JSON.parse(localStorage.getItem("fm-kid") || "null"); } catch (e) { return null; } };
  window.kid = getKid();

  let sb = null;
  function client() {
    if (!sb && window.supabase) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return sb;
  }
  const loadQ = () => { try { return JSON.parse(localStorage.getItem(QKEY) || "[]"); } catch (e) { return []; } };
  const saveQ = q => { try { localStorage.setItem(QKEY, JSON.stringify(q.slice(-50))); } catch (e) {} };

  /* ---------- status line under the practice box ---------- */
  let note = null;
  function status(html) {
    if (!note) {
      const fbBox = document.getElementById("pFb"); if (!fbBox) return;
      note = document.createElement("div");
      note.style.cssText = "font-size:13.5px;color:#5b6475;margin:10px 0 0;line-height:1.5";
      const box = document.getElementById("pSuggest") || fbBox;
      box.parentNode.insertBefore(note, box.nextSibling);
    }
    note.innerHTML = html;
  }
  const SIGNIN = '💾 <a href="../index.html#/login">Sign in as a student</a> to save your scores.';
  const MLOG = '<a href="../index.html#/mistakes">Mistake Log</a>';

  /* ---------- saving sessions ---------- */
  let flushing = false;
  async function flush() {
    const k = getKid(); window.kid = k;
    if (!k || flushing) return;
    const c = client(); if (!c) return;
    let q = loadQ().filter(s => s.kid === k.token);
    if (!q.length) return;
    flushing = true;
    try {
      for (const s of q) {
        const { error } = await c.rpc("fm_kid_record", { p_token: k.token, p_kind: s.kind || "practice", p_item: s.item, p_title: s.title,
          p_score: s.right, p_total: s.n, p_detail: s.detail || { firstTry: s.first, missed: s.missed, level: s.level }, p_seconds: s.sec });
        if (error) {
          if (/sign in again/i.test(error.message)) { try { localStorage.removeItem("fm-kid"); } catch (e) {} window.kid = null; status("Please " + SIGNIN.replace("💾 ", "").replace("Sign in", "sign in again")); }
          break;
        }
        saveQ(loadQ().filter(x => x.id !== s.id));
        status(`✓ Saved to ${k.avatar || ""} ${k.nickname}'s record: ${s.right} / ${s.n} correct · ${s.label}`);
      }
    } catch (e) { /* offline: stays in the queue and is saved next time */ }
    flushing = false;
  }

  let ses = null;
  function close() {
    if (!ses || !ses.n) { ses = null; return; }
    const k = getKid();
    if (k) { const q = loadQ(); q.push(Object.assign({ kid: k.token, sec: Math.round((Date.now() - ses.t0) / 1000) }, ses)); saveQ(q); }
    ses = null;
    flush();
  }

  /* ---------- watch every finished problem ---------- */
  function hook() {
    if (typeof finish !== "function" || typeof T === "undefined") return setTimeout(hook, 100);
    const orig = finish;
    window.finish = function (correct) {
      try { onFinish(correct); } catch (e) { console.warn("fm bridge", e); }
      return orig.apply(this, arguments);
    };
    flush();
    if (!getKid()) status(SIGNIN + " Missed problems still go to this browser's " + MLOG + ".");
  }
  function onFinish(correct) {
    const ch = CH, t = T, lv = L, pr = PR;
    if (!ch || !t || !lv || !pr) return;
    const chNum = String(ch.id).replace(/\D/g, "");
    const label = `Ch ${chNum} · ${t.title} (Level ${lv} · ${NAMES[lv - 1]})`;
    const item = `${CID}:lv:${ch.id}:${t.id}:L${lv}`;
    if (ses && ses.item !== item) close();
    if (!ses) ses = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), item, label, level: lv,
      title: `${CTITLE} · ${label}`, n: 0, right: 0, first: 0, missed: [], t0: Date.now() };
    ses.n++;
    if (correct) { ses.right++; if (firstTry) ses.first++; } else ses.missed.push(ses.n);
    const k = getKid();
    const run = `This run: ${ses.right} / ${ses.n} correct`;
    let msg = k ? `${run} — saved to ${k.avatar || ""} ${k.nickname}'s record after ${per} problems or when you switch topic/level.` : `${run}. ${SIGNIN}`;

    if (!correct && window.fmMistakes) {
      const inp = document.getElementById("pAns");
      fmMistakes.add({ src: "levels", course: `lv:${CID}:${ch.id}:${t.id}`, courseTitle: CTITLE,
        where: `Ch ${chNum} · Level ${lv} · ${NAMES[lv - 1]}`, topic: t.title,
        link: `practice/${page}.html#${ch.id}-learn`,
        q: { type: "html", v: pr.q }, mine: inp ? inp.value.trim() : "", ans: { type: "tex", v: String(pr.ansTex || "") } });
      msg += ` 📒 Added to your ${MLOG} — redo it in 1, 3, 7 and 14 days.`;
    }
    status(msg);
    if (ses.n >= per) close();
  }

  // shared with the Quiz & Test tab below
  window.fmLv = { client, getKid, loadQ, saveQ, flush, CID, CTITLE, page, NAMES, MLOG, SIGNIN };

  /* ---------- arrowheads: give every SVG picture its own marker ids ----------
     Many pictures reuse the same <marker id="..."> text. A browser draws url(#id) from the FIRST
     element with that id — if that picture is in a hidden step, the arrowheads vanish everywhere.
     So each SVG gets its own copy of the ids. */
  let mk = 0;
  function fixMarkers(root) {
    if (!root || !root.querySelectorAll) return;
    const svgs = root.tagName === "svg" ? [root] : root.querySelectorAll("svg");
    svgs.forEach(sv => {
      if (sv.dataset.mk) return; sv.dataset.mk = "1";
      const ids = [...sv.querySelectorAll("marker[id], clipPath[id], linearGradient[id], pattern[id]")];
      if (!ids.length) return;
      const n = ++mk;
      ids.forEach(el => {
        const old = el.id, neu = old + "__" + n; el.id = neu;
        sv.querySelectorAll("*").forEach(x => {
          for (const at of ["marker-start", "marker-end", "marker-mid", "clip-path", "fill", "stroke"]) {
            const v = x.getAttribute(at); if (v && v.includes("#" + old + ")")) x.setAttribute(at, v.split("#" + old + ")").join("#" + neu + ")"));
          }
          const st = x.getAttribute("style"); if (st && st.includes("#" + old + ")")) x.setAttribute("style", st.split("#" + old + ")").join("#" + neu + ")"));
        });
      });
    });
  }
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(nd => { if (nd.nodeType === 1) fixMarkers(nd); })))
    .observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => fixMarkers(document.body)); else fixMarkers(document.body);

  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") close(); });
  window.addEventListener("pagehide", close);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", hook); else hook();
})();

/* =====================================================================
   PROF. FANG MATH — ③ QUIZ & TEST tab (every practice/*-levels.html page)
   • Quick Quiz: 10 questions at one level, instant feedback, no hints.
   • Chapter Test: like a real test — timed, no hints, graded at the end,
     with a topic-by-topic report. "Cumulative" covers Ch 1 → this chapter.
   • Print: a paper test with name/date lines + a separate answer key.
   Uses the page's own CHAPTERS / LEVELS / check() / HOW / render().
   Scores save to the signed-in student's record (shows on the dashboard
   as a quiz); missed questions go to the Mistake Log.
   ===================================================================== */
(function () {
  const g = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const MIN_PER_LEVEL = [1.5, 2, 2.5, 3.5, 5];          // minutes allowed per question, by level
  const DIFF = {
    review:   { name: "Review",   sub: "Levels 1–2", mix: [0.4, 0.6, 0, 0, 0] },
    standard: { name: "Standard", sub: "Levels 2–4 · school test", mix: [0, 0.3, 0.5, 0.2, 0] },
    honors:   { name: "Honors",   sub: "Levels 3–5", mix: [0, 0, 0.3, 0.5, 0.2] },
  };
  const HASH0 = location.hash;          // read now: the page rewrites the hash when it loads
  const WS = {
    easy:     { name: "Easy",     sub: "Levels 1–2", lv: [1, 2] },
    medium:   { name: "Medium",   sub: "Level 3",    lv: [3] },
    hard:     { name: "Hard",     sub: "Levels 4–5", lv: [4, 4, 5] },
    combined: { name: "Combined", sub: "Easy → Medium → Hard" },
  };
  let PG, RUNKEY, HISTKEY, view, tabBtn, run = null, tick = null, opt = null;

  function ready() {
    if (typeof CHAPTERS === "undefined" || typeof setTab !== "function" || !g("practiceView") || !g("tabPractice") || typeof CH === "undefined" || !CH) return setTimeout(ready, 120);
    init();
  }

  /* ---------------- setup ---------------- */
  function init() {
    const L = window.fmLv || {};
    PG = L.page || (location.pathname.match(/([\w-]+)\.html$/) || [])[1] || "page";
    RUNKEY = "fm-qt-run-" + PG; HISTKEY = "fm-qt-hist-" + PG;
    css();
    tabBtn = document.createElement("button");
    tabBtn.className = "tab"; tabBtn.id = "tabQuiz"; tabBtn.type = "button"; tabBtn.setAttribute("role", "tab");
    tabBtn.textContent = "③ Quiz & Test";
    g("tabPractice").after(tabBtn);
    view = document.createElement("div"); view.id = "quizView"; view.className = "qt"; view.hidden = true;
    g("practiceView").after(view);

    const orig = window.setTab;
    window.setTab = function (t) {
      if (t === "quiz") return showQuiz();
      view.hidden = true; tabBtn.classList.remove("on"); stopTick();
      return orig.apply(this, arguments);
    };
    tabBtn.onclick = () => setTab("quiz");
    drawHandouts();
    const oc = window.openChapter;
    window.openChapter = function () { const r = oc.apply(this, arguments); try { drawHandouts(); } catch (e) {} return r; };
    const hd = document.querySelector("header.top .in");
    if (hd && !hd.querySelector(".lv-search")) { const sl = document.createElement("a"); sl.className = "lv-search"; sl.href = "../index.html#/search"; sl.textContent = "🔍 Search";
      sl.style.cssText = "margin-left:auto;text-decoration:none;color:var(--muted);font-weight:600;font-size:14px;border:1px solid var(--line);border-radius:999px;padding:6px 13px;white-space:nowrap"; const back = hd.querySelector(".back"); if (back) { back.style.marginLeft = "0"; hd.insertBefore(sl, back); } else hd.appendChild(sl); }
    const t = /^#(ch\w+)-(learn|practice)-(\w+)$/.exec(HASH0);       // a link to one lesson (from the site search)
    if (t && CHAPTERS.some(c => c.id === t[1])) {
      if (CH.id !== t[1]) openChapter(t[1], t[2]); else setTab(t[2]);
      const i = CH.topics.findIndex(x => x.id === t[3]);
      if (i >= 0) { if (t[2] === "learn" && typeof openLesson === "function") openLesson(i, true); else if (typeof startPractice === "function") startPractice(CH.topics[i]); }
    }
    const m = /^#(ch\w+)-(quiz|ws|test)$/.exec(HASH0);
    if (m) { if (CHAPTERS.some(c => c.id === m[1]) && CH.id !== m[1]) openChapter(m[1], "practice"); setTab("quiz");
      const card = (g(m[2] === "ws" ? "wsGo" : m[2] === "test" ? "tsGo" : "qzGo") || {}).closest && g(m[2] === "ws" ? "wsGo" : m[2] === "test" ? "tsGo" : "qzGo").closest(".qt-box");
      if (card && m[2] !== "quiz") setTimeout(() => { card.scrollIntoView({ behavior: "smooth", block: "center" }); card.classList.add("qt-flash"); setTimeout(() => card.classList.remove("qt-flash"), 1800); }, 250); }
  }

  /* ---------- printable handouts (PDF worksheet + answer key) for this chapter ----------
     To add one: put the PDFs in materials/..., then add a line here under the page and chapter. */
  const HANDOUTS = {
    "algebra2-levels": {
      ch2: [{ t: "2-1 Domain & Range", ws: "../materials/algebra2/ch02/Alg2_2-1_Domain_Range_Worksheet.pdf", key: "../materials/algebra2/ch02/Alg2_2-1_Domain_Range_Key.pdf" }],
      ch4: [{ t: "4-1 Quadratic Functions & Transformations (notes)", ws: "../materials/algebra2/ch04/Alg2_4-1_Notes.pdf", key: "../materials/algebra2/ch04/Alg2_4-1_Notes_Key.pdf" }],
      ch6: [{ t: "6-7 Inverse Relations & Functions", ws: "../materials/algebra2/ch06/Alg2_6-7_Inverse_Functions_Worksheet.pdf", key: "../materials/algebra2/ch06/Alg2_6-7_Inverse_Functions_Key.pdf" }],
    },
  };
  function drawHandouts() {
    const tabs = document.querySelector(".tabs[role=tablist]"); if (!tabs || !CH) return;
    let box = g("handouts"); const list = (HANDOUTS[PG] || {})[CH.id] || [];
    if (!list.length) { if (box) box.remove(); return; }
    if (!box) { box = document.createElement("div"); box.id = "handouts"; box.className = "qt-handouts"; tabs.parentNode.insertBefore(box, tabs); }
    box.innerHTML = `<span class="qt-hl">📎 Printable handout${list.length > 1 ? "s" : ""}</span>` + list.map(h => `<span class="qt-hrow"><b>${esc(h.t)}</b>
      <a class="btn sm" style="background:#8A6415" href="${h.ws}" target="_blank" rel="noopener">📄 Worksheet PDF</a>${h.key ? `<a class="btn sm ghost" href="${h.key}" target="_blank" rel="noopener">🔑 Answer key</a>` : ""}</span>`).join("");
  }

  function showQuiz() {
    g("learnView").hidden = true; g("practiceView").hidden = true; view.hidden = false;
    g("tabLearn").classList.remove("on"); g("tabPractice").classList.remove("on"); tabBtn.classList.add("on");
    try { history.replaceState(null, "", "#" + CH.id + "-quiz"); } catch (e) {}
    const saved = loadRun();
    if (run && run.live && run.ch === CH.id) drawRun();
    else if (saved && saved.ch === CH.id) { run = saved; drawRun(); }
    else home();
  }

  /* ---------------- storage ---------------- */
  const loadRun = () => { try { return JSON.parse(localStorage.getItem(RUNKEY) || "null"); } catch (e) { return null; } };
  const saveRun = () => { try { run && run.kind === "test" && run.live ? localStorage.setItem(RUNKEY, JSON.stringify(run)) : localStorage.removeItem(RUNKEY); } catch (e) {} };
  const hist = () => { try { return JSON.parse(localStorage.getItem(HISTKEY) || "[]"); } catch (e) { return []; } };
  const addHist = r => { try { localStorage.setItem(HISTKEY, JSON.stringify(hist().concat(r).slice(-40))); } catch (e) {} };

  /* ---------------- building a question set ---------------- */
  const chNum = c => CHAPTERS.indexOf(c) + 1;
  function make(t, lv, seen) {
    let p = null;
    for (let k = 0; k < 40; k++) {
      try { p = t.gen[lv - 1](); } catch (e) { p = null; }
      if (p && !seen.has(p.q)) break;
    }
    if (p) seen.add(p.q);
    return p;
  }
  function pool(scope) {           // [{t, c}] — topics in this chapter, or chapters 1 → this one interleaved
    if (scope !== "cumul") return shuffle(CH.topics).map(t => ({ t, c: CH }));
    const chs = CHAPTERS.slice(0, CHAPTERS.indexOf(CH) + 1).map(c => shuffle(c.topics).map(t => ({ t, c })));
    const out = [], most = Math.max(...chs.map(x => x.length));
    for (let r = 0; r < most; r++) shuffle(chs).forEach(x => { if (x[r]) out.push(x[r]); });
    return out;
  }
  function levelList(mix, n) {
    const cnt = mix.map(x => Math.floor(x * n)); let left = n - cnt.reduce((a, b) => a + b, 0);
    const order = mix.map((x, i) => [x * n - Math.floor(x * n), i]).filter(x => mix[x[1]] > 0).sort((a, b) => b[0] - a[0]);
    for (let k = 0; left > 0; k++, left--) cnt[order[k % order.length][1]]++;
    return cnt.flatMap((c, i) => Array(c).fill(i + 1));
  }
  function buildTest(o) {
    const P = pool(o.scope), n = o.n, seen = new Set();
    const slots = []; for (let i = 0; i < n; i++) slots.push(P[i % P.length]);
    const lvs = shuffle(levelList(DIFF[o.diff].mix, n));
    const items = [];                       // easy → hard, and inside each level take turns between topics
    [1, 2, 3, 4, 5].forEach(lv => {
      const by = new Map(); slots.forEach((s, i) => { if (lvs[i] !== lv) return; const k = s.c.id + s.t.id; by.set(k, (by.get(k) || []).concat(s)); });
      const qs = shuffle([...by.values()]); for (let r = 0; qs.some(q => q[r]); r++) qs.forEach(q => { if (q[r]) items.push({ s: q[r], lv }); });
    });
    return items.map(({ s, lv }) => pack(s, lv, seen)).filter(Boolean);
  }
  function buildQuiz(o) {
    const seen = new Set();
    const P = o.topic === "all" ? pool("chapter") : [{ t: CH.topics.find(t => t.id === o.topic), c: CH }];
    const out = []; for (let i = 0; i < 10; i++) out.push(pack(P[i % P.length], o.lv, seen));
    return shuffle(out.filter(Boolean));
  }
  function buildWorksheet(o) {
    const seen = new Set(), n = o.wsN;
    const P = o.wsTopic === "all" ? pool("chapter") : [{ t: CH.topics.find(t => t.id === o.wsTopic), c: CH }];
    const parts = o.wsLv === "combined" ? [["Part A · Easy", WS.easy.lv, Math.floor(n / 3)], ["Part B · Medium", WS.medium.lv, n - 2 * Math.floor(n / 3)], ["Part C · Hard", WS.hard.lv, Math.floor(n / 3)]]
      : [[null, WS[o.wsLv].lv, n]];
    const out = [];
    parts.forEach(([name, lvs, cnt]) => {
      const off = Math.floor(Math.random() * P.length), items = [];
      for (let i = 0; i < cnt; i++) items.push({ s: P[(i + off) % P.length], lv: lvs[i % lvs.length] });
      items.sort((a, b) => a.lv - b.lv).forEach(({ s, lv }) => { const q = pack(s, lv, seen); if (q) { q.part = name; out.push(q); } });
    });
    return out;
  }
  function pack(s, lv, seen) {
    const p = make(s.t, lv, seen); if (!p) return null;
    return { p, lv, tid: s.t.id, tt: s.t.title, cid: s.c.id, cn: chNum(s.c) };
  }
  const minutes = qs => Math.max(5, Math.ceil(qs.reduce((a, q) => a + MIN_PER_LEVEL[q.lv - 1], 0) / 5) * 5);
  function howTo(p) {
    if (p.type === "word" && p.opts) return "Type one of: " + p.opts.map(o => o === "NONE" ? "none" : o.length > 3 ? o.toLowerCase() : o).join(", ") + ".";
    const F = { factored: "Type the factored form, like 2(x - 3)(x + 4).", poly: "Type the simplified polynomial, like 3x^2 - 5x + 2.", simp: "Type the simplified expression with positive exponents, like 6x^5 or 3x^2/y^4.", rad: "Type the simplest radical form, like 5sqrt(2).", si: "Type it as y = mx + b, like y = -2x + 5.", std: "Type it as Ax + By = C with whole numbers, like 3x - 2y = 6." };
    return F[p.form] || (typeof HOW !== "undefined" && HOW[p.type]) || "";
  }
  function grade(pct) {
    return pct >= 93 ? "A" : pct >= 90 ? "A−" : pct >= 87 ? "B+" : pct >= 83 ? "B" : pct >= 80 ? "B−" : pct >= 77 ? "C+" : pct >= 73 ? "C" : pct >= 70 ? "C−" : pct >= 60 ? "D" : "F";
  }
  function preview(inp, box) {
    const v = inp.value.trim(); box.innerHTML = "";
    if (!v || !window.katex || !window.math) return;
    try {
      let tex; const c = clean(v);
      if (/<|>/.test(c)) tex = c.replace(/<=/g, "\\le ").replace(/>=/g, "\\ge ").replace(/\bor\b/gi, "\\text{ or }").replace(/\band\b/gi, "\\text{ and }");
      else tex = c.split("=").map(x => math.parse(x).toTex({ parenthesis: "auto", implicit: "hide" })).join(" = ");
      box.innerHTML = '<span class="pl">You wrote</span><span class="pm"></span>';
      katex.render(tex, box.querySelector(".pm"), { throwOnError: false });
    } catch (e) { box.innerHTML = ""; }
  }
  const tryCheck = (p, v) => { if (!String(v || "").trim()) return null; try { return check(p, v); } catch (e) { return null; } };
  const fmtTime = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
  const solList = p => `<ol class="sol">${(p.sol || []).map(x => `<li>${x}</li>`).join("")}</ol>`;

  /* ---------------- home ---------------- */
  function home() {
    stopTick(); run = null;
    const n = chNum(CH), lv0 = (typeof curLv === "function" ? curLv() : 1);
    opt = opt && opt.ch === CH.id ? opt : { ch: CH.id, topic: "all", lv: lv0, scope: "chapter", diff: "standard", n: 15, wsTopic: "all", wsLv: "combined", wsN: 21 };
    const H = hist().filter(r => r.ch === CH.id).slice(-5).reverse();
    const other = loadRun();
    view.innerHTML = `
      ${other && other.live && other.ch !== CH.id ? `<div class="fb hint qt-resume"><span class="tag">Unfinished test</span>${esc(other.title)} is still open (the clock keeps running). <button class="btn sm" id="qtResume">Go back to it →</button></div>` : ""}
      <div class="qt-grid">
        <div class="card qt-box">
          <span class="label" style="color:var(--teal)">Quick Quiz</span>
          <h2>Check one topic — or the whole chapter</h2>
          <p class="qt-sub">10 questions · one level · you see right or wrong after each one · no hints.</p>
          <label class="qt-lab">Topic</label>
          <select id="qzTopic" class="qt-sel"><option value="all">All topics in Chapter ${n}</option>${CH.topics.map(t => `<option value="${t.id}">${esc(t.title)}</option>`).join("")}</select>
          <label class="qt-lab">Level</label>
          <div class="pills" id="qzLv"></div>
          <div class="qt-go"><button class="btn teal" id="qzGo">Start quiz →</button><button class="btn ghost" id="qzPrint">📄 Paper quiz + answer key</button></div>
        </div>
        <div class="card qt-box">
          <span class="label" style="color:var(--navy)">Chapter Test</span>
          <h2>Like a real test</h2>
          <p class="qt-sub">Timed · no hints · nothing is checked until you hand it in · graded with a topic-by-topic report.</p>
          <label class="qt-lab">Covers</label>
          <div class="qt-seg" id="tsScope"><button data-v="chapter">Chapter ${n} only</button>${n > 1 ? `<button data-v="cumul">Chapters 1–${n} (cumulative)</button>` : ""}</div>
          <label class="qt-lab">Difficulty</label>
          <div class="qt-seg" id="tsDiff">${Object.entries(DIFF).map(([k, d]) => `<button data-v="${k}">${d.name}<small>${d.sub}</small></button>`).join("")}</div>
          <label class="qt-lab">Length</label>
          <div class="qt-seg" id="tsN">${[10, 15, 20, 25].map(k => `<button data-v="${k}">${k} questions</button>`).join("")}</div>
          <div class="qt-go"><button class="btn" id="tsGo">Start test →</button><button class="btn ghost" id="tsPrint">📄 Paper test + answer key</button><span class="qt-time" id="tsTime"></span></div>
        </div>
        <div class="card qt-box qt-wide">
          <span class="label" style="color:#8A6415">Worksheet</span>
          <h2>Printable practice — easy, medium, hard, or all three</h2>
          <p class="qt-sub">A paper worksheet with room to work, plus an answer key with steps. “Combined” has three parts that go from easy to hard.</p>
          <div class="qt-wsrow">
            <div><label class="qt-lab">Topic</label>
              <select id="wsTopic" class="qt-sel"><option value="all">All topics in Chapter ${n}</option>${CH.topics.map(t => `<option value="${t.id}">${esc(t.title)}</option>`).join("")}</select></div>
            <div><label class="qt-lab">Level</label>
              <div class="qt-seg" id="wsLv">${Object.entries(WS).map(([k, d]) => `<button data-v="${k}">${d.name}<small>${d.sub}</small></button>`).join("")}</div></div>
            <div><label class="qt-lab">Problems</label>
              <div class="qt-seg" id="wsN">${[12, 21, 30].map(k => `<button data-v="${k}">${k}</button>`).join("")}</div></div>
          </div>
          <div class="qt-go"><button class="btn" style="background:#8A6415" id="wsGo">📄 Make worksheet + answer key</button></div>
        </div>
      </div>
      ${H.length ? `<div class="card qt-hist"><span class="label">Your recent results · Chapter ${n} · this device</span>
        <table>${H.map(r => `<tr><td>${esc(r.title)}</td><td class="pct">${r.score} / ${r.total}</td><td><b>${r.pct}%</b>${r.kind === "test" ? " · " + grade(r.pct) : ""}</td><td class="qt-faint">${new Date(r.at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td></tr>`).join("")}</table></div>` : ""}`;
    const lvBox = g("qzLv");
    LEVELS.forEach(l => { const b = document.createElement("button"); b.type = "button"; b.className = "pill" + (l.n === opt.lv ? " on" : ""); b.style.setProperty("--c", l.c); b.textContent = l.n + " " + l.name; b.onclick = () => { opt.lv = l.n; home(); }; lvBox.appendChild(b); });
    g("qzTopic").value = opt.topic; g("qzTopic").onchange = e => { opt.topic = e.target.value; };
    const seg = (id, key, num) => g(id).querySelectorAll("button").forEach(b => { b.type = "button"; const v = num ? +b.dataset.v : b.dataset.v; b.classList.toggle("on", v === opt[key]); b.onclick = () => { opt[key] = v; home(); }; });
    seg("tsScope", "scope"); seg("tsDiff", "diff"); seg("tsN", "n", true); seg("wsLv", "wsLv"); seg("wsN", "wsN", true);
    g("wsTopic").value = opt.wsTopic; g("wsTopic").onchange = e => { opt.wsTopic = e.target.value; };
    g("wsGo").onclick = () => paper("ws");
    const estQs = levelList(DIFF[opt.diff].mix, opt.n).map(lv => ({ lv }));
    g("tsTime").textContent = "⏱ " + minutes(estQs) + " minutes";
    if (g("qtResume")) g("qtResume").onclick = () => { openChapter(other.ch, "practice"); setTab("quiz"); };
    g("qzGo").onclick = () => start("quiz");
    g("tsGo").onclick = () => start("test");
    g("tsPrint").onclick = () => paper("test");
    g("qzPrint").onclick = () => paper("quiz");
  }
  function titleFor(kind, o) {
    const n = chNum(CH);
    if (kind === "ws") { const t = o.wsTopic === "all" ? "Chapter " + n : CH.topics.find(t => t.id === o.wsTopic).title; return `${t} Worksheet · ${WS[o.wsLv].name}`; }
    if (kind === "quiz") { const t = o.topic === "all" ? "Chapter " + n : CH.topics.find(t => t.id === o.topic).title; return `Quiz · ${t} · Level ${o.lv} ${LEVELS[o.lv - 1].name}`; }
    return (o.scope === "cumul" ? `Cumulative Test · Ch 1–${n}` : `Chapter ${n} Test`) + ` · ${DIFF[o.diff].name}`;
  }
  function start(kind) {
    const o = Object.assign({}, opt);
    const qs = kind === "quiz" ? buildQuiz(o) : buildTest(o);
    if (!qs.length) { alert("Sorry — couldn't make questions for this chapter."); return; }
    run = { live: true, kind, ch: CH.id, o, title: titleFor(kind, o), qs, ans: qs.map(() => ""), res: qs.map(() => null), i: 0, t0: Date.now(),
      end: kind === "test" ? Date.now() + minutes(qs) * 60000 : null };
    saveRun(); drawRun(); view.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function drawRun() { if (!run.live) return results(); run.kind === "quiz" ? drawQuiz() : drawTest(); }

  /* ---------------- quick quiz (one at a time) ---------------- */
  function drawQuiz() {
    stopTick();
    const q = run.qs[run.i], answered = run.res[run.i] !== null;
    view.innerHTML = `<div class="card qt-run">
      <div class="phead"><h2>${esc(run.title)}</h2><button class="btn ghost sm" id="qtQuit">Quit</button></div>
      <div class="qprog">${run.qs.map((_, k) => `<i class="${run.res[k] === true ? "ok" : run.res[k] === false ? "no" : k === run.i ? "now" : ""}"></i>`).join("")}</div>
      <div class="problem"><span class="label">Question ${run.i + 1} of ${run.qs.length} · ${esc(q.tt)}</span><div>${q.p.q}</div></div>
      <div class="row"><input type="text" id="qtA" autocomplete="off" placeholder="Your answer" aria-label="Your answer"><button class="btn" id="qtC">Check</button><button class="btn teal" id="qtN" hidden>${run.i + 1 < run.qs.length ? "Next →" : "See my score →"}</button></div>
      <div class="preview" id="qtP"></div><div class="howto">${esc(howTo(q.p))}</div><div id="qtF"></div></div>`;
    render(view);
    const inp = g("qtA");
    inp.value = run.ans[run.i] || "";
    inp.oninput = () => preview(inp, g("qtP"));
    const check1 = () => {
      if (run.res[run.i] !== null) return next();
      const v = inp.value.trim(); if (!v) return;
      const r = tryCheck(q.p, v);
      if (r === null) { fbk("hint", "Try again", "I couldn't read that. " + esc(howTo(q.p))); return; }
      run.ans[run.i] = v; run.res[run.i] = r; lock(r);
    };
    const lock = r => {
      inp.disabled = true; g("qtC").hidden = true; g("qtN").hidden = false; g("qtN").focus({ preventScroll: true });
      fbk(r ? "good" : "bad", r ? "Correct" : "Not quite — the answer is", `$${q.p.ansTex}$` + solList(q.p));
      view.querySelectorAll(".qprog i")[run.i].className = r ? "ok" : "no";
    };
    const next = () => { if (run.i + 1 < run.qs.length) { run.i++; drawQuiz(); } else finishRun(); };
    const fbk = (k, tag, html) => { g("qtF").innerHTML = `<div class="fb ${k}"><span class="tag">${tag}</span>${html}</div>`; render(g("qtF")); };
    g("qtC").onclick = check1; g("qtN").onclick = next;
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); check1(); } });
    g("qtQuit").onclick = () => { if (confirm("Quit this quiz? Your answers won't be saved.")) home(); };
    if (answered) lock(run.res[run.i]); else inp.focus({ preventScroll: true });
  }

  /* ---------------- chapter test (all on one page, timed) ---------------- */
  function drawTest() {
    view.innerHTML = `<div class="qt-bar"><div><b>${esc(run.title)}</b><span class="qt-faint" id="qtCount"></span></div><div class="qt-clock" id="qtClock"></div><button class="btn sm" id="qtSubmit">Hand it in</button></div>
      <p class="qt-note">No hints and nothing is checked until you hand it in. Your answers are kept on this device if you leave the page — the clock keeps running. Work on paper, then type each final answer.</p>
      <div id="qtList"></div>
      <div class="qt-endrow"><button class="btn" id="qtSubmit2">Hand it in →</button></div><div id="qtWarn"></div>`;
    const list = g("qtList");
    run.qs.forEach((q, k) => {
      const c = document.createElement("div"); c.className = "card qt-q"; c.id = "qtq" + k;
      c.innerHTML = `<div class="qt-num">${k + 1}</div><div class="qt-body"><div class="qt-text">${q.p.q}</div>
        <div class="row"><input type="text" autocomplete="off" placeholder="Your answer" aria-label="Answer to question ${k + 1}"></div>
        <div class="preview"></div><div class="howto">${esc(howTo(q.p))}</div></div>`;
      const inp = c.querySelector("input"), pv = c.querySelector(".preview");
      inp.value = run.ans[k] || ""; if (inp.value) preview(inp, pv);
      inp.oninput = () => { run.ans[k] = inp.value; preview(inp, pv); c.classList.remove("qt-flag"); count(); saveRun(); };
      inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); const nx = g("qtq" + (k + 1)); if (nx) nx.querySelector("input").focus(); else g("qtSubmit2").focus(); } });
      list.appendChild(c);
    });
    render(list); count();
    g("qtSubmit").onclick = g("qtSubmit2").onclick = () => handIn(false);
    startTick();
  }
  function count() { const c = g("qtCount"); if (c) c.textContent = ` · ${run.ans.filter(a => String(a).trim()).length} of ${run.qs.length} answered`; }
  function startTick() {
    stopTick();
    const step = () => {
      const left = (run.end - Date.now()) / 1000, el = g("qtClock");
      if (el) { el.textContent = "⏱ " + fmtTime(left); el.classList.toggle("low", left < 120); }
      if (left <= 0) { stopTick(); handIn(true); }
    };
    step(); tick = setInterval(step, 1000);
  }
  function stopTick() { if (tick) clearInterval(tick); tick = null; }
  function handIn(timeUp) {
    if (!timeUp) {
      const blank = [], unread = [];
      run.qs.forEach((q, k) => { const a = String(run.ans[k] || "").trim(); if (!a) blank.push(k + 1); else if (tryCheck(q.p, a) === null) unread.push(k + 1); });
      view.querySelectorAll(".qt-q").forEach((c, k) => c.classList.toggle("qt-flag", blank.includes(k + 1) || unread.includes(k + 1)));
      if ((blank.length || unread.length) && !run.warned) {
        run.warned = true;
        g("qtWarn").innerHTML = `<div class="fb hint"><span class="tag">Before you hand it in</span>${blank.length ? `Blank: #${blank.join(", #")}. ` : ""}${unread.length ? `I can't read your answer to #${unread.join(", #")} — check the format under each question. ` : ""}Those count as wrong. Fix them, or press <b>Hand it in</b> again to finish.</div>`;
        g("qtWarn").scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }
    run.qs.forEach((q, k) => { run.res[k] = tryCheck(q.p, run.ans[k]) === true; });
    run.timeUp = !!timeUp;
    finishRun();
  }

  /* ---------------- results ---------------- */
  function finishRun() {
    stopTick();
    run.live = false; run.sec = Math.round((Math.min(Date.now(), run.end || Infinity) - run.t0) / 1000);
    const score = run.res.filter(r => r === true).length, total = run.qs.length, pct = Math.round(100 * score / total);
    run.score = score; run.pct = pct;
    saveRun(); try { localStorage.removeItem(RUNKEY); } catch (e) {}
    addHist({ ch: run.ch, kind: run.kind, title: run.title, score, total, pct, at: Date.now() });
    // missed → Mistake Log
    const L = window.fmLv || {};
    if (window.fmMistakes) run.qs.forEach((q, k) => {
      if (run.res[k] === true) return;
      try {
        fmMistakes.add({ src: "levels", course: `lv:${L.CID}:${q.cid}:${q.tid}`, courseTitle: L.CTITLE,
          where: `Ch ${q.cn} · ${run.kind === "test" ? "Test" : "Quiz"} · Level ${q.lv}`, topic: q.tt,
          link: `practice/${PG}.html#${q.cid}-learn`, q: { type: "html", v: q.p.q }, mine: String(run.ans[k] || ""), ans: { type: "tex", v: String(q.p.ansTex || "") } });
      } catch (e) {}
    });
    results();
    saveScore(score, total);
  }
  function saveScore(score, total) {
    const L = window.fmLv; if (!L) return;
    const k = L.getKid(), note = g("qtSaved");
    if (!k) { if (note) note.innerHTML = L.SIGNIN; return; }
    const by = topicStats();
    const s = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), kid: k.token, kind: "quiz",
      item: `${L.CID}:${run.kind}:${run.ch}:${run.kind === "test" ? run.o.scope + ":" + run.o.diff : run.o.topic + ":L" + run.o.lv}`,
      title: `${L.CTITLE} · ${run.title}`, label: run.title, n: total, right: score, sec: run.sec,
      detail: { kind: run.kind, missed: run.res.map((r, i) => r === true ? null : i + 1).filter(Boolean), topics: by.map(t => ({ t: t.tt, r: t.r, n: t.n })), timeUp: !!run.timeUp } };
    L.saveQ(L.loadQ().concat(s));
    if (note) note.innerHTML = "Saving…";
    Promise.resolve(L.flush()).then(() => {
      const still = L.loadQ().some(x => x.id === s.id);
      if (note) note.innerHTML = still ? "Couldn't reach the server — it will be saved next time you practice." : `✓ Saved to ${esc(k.avatar || "")} ${esc(k.nickname)}'s record`;
    });
  }
  function topicStats() {
    const m = new Map();
    run.qs.forEach((q, k) => { const key = q.cid + ":" + q.tid; const x = m.get(key) || { cid: q.cid, tid: q.tid, tt: q.tt, cn: q.cn, r: 0, n: 0 }; x.n++; if (run.res[k] === true) x.r++; m.set(key, x); });
    return [...m.values()].sort((a, b) => a.r / a.n - b.r / b.n);
  }
  function results() {
    const score = run.score, total = run.qs.length, pct = run.pct, test = run.kind === "test";
    const by = topicStats(), cum = run.qs.some(q => q.cid !== run.ch);
    const color = pct >= 80 ? "var(--green)" : pct >= 60 ? "var(--gold)" : "var(--red)";
    const msg = pct === 100 ? "Perfect score! 🎉" : pct >= 90 ? "Excellent work." : pct >= 80 ? "Solid — fix the few you missed and you've got this chapter." : pct >= 60 ? "Getting there. Practice the weak topics below, then try again." : "This chapter needs more practice. Start with the weakest topic below.";
    view.innerHTML = `<div class="card qt-res">
        <div class="qt-score" style="--c:${color}"><div class="qt-ring" style="--p:${pct}"><b>${pct}%</b>${test ? `<span>${grade(pct)}</span>` : ""}</div>
          <div><span class="label">${esc(run.title)}</span><h2>${score} out of ${total} correct</h2><p>${msg}</p>
          <p class="qt-faint">${run.timeUp ? "⏰ Time ran out — it was handed in automatically. " : ""}Time used: ${fmtTime(run.sec)}${run.res.some(r => r !== true) ? " · missed questions were added to your " + ((window.fmLv || {}).MLOG || "Mistake Log") : ""}</p>
          <p class="qt-faint" id="qtSaved"></p></div></div>
        <div class="qt-acts"><button class="btn" id="qtAgain">${test ? "New test (new questions)" : "New quiz"}</button><button class="btn ghost" id="qtHome">Back to Quiz &amp; Test</button></div>
      </div>
      <div class="card"><span class="label">By topic — weakest first</span><div class="qt-topics">${by.map((t, i) => `
        <div class="qt-trow"><div class="qt-tname">${cum ? `<span class="qt-faint">Ch ${t.cn} · </span>` : ""}${esc(t.tt)}</div>
          <div class="qt-tbar"><i style="width:${Math.round(100 * t.r / t.n)}%;background:${t.r === t.n ? "var(--green)" : t.r / t.n >= .5 ? "var(--gold)" : "var(--red)"}"></i></div>
          <div class="qt-tn">${t.r}/${t.n}</div>${t.r < t.n ? `<button class="btn ghost sm" data-i="${i}">Practice →</button>` : `<span class="qt-ok">✓</span>`}</div>`).join("")}</div></div>
      <div class="card"><span class="label">Review every question</span><div id="qtRev"></div></div>`;
    const rev = g("qtRev");
    run.qs.forEach((q, k) => {
      const ok = run.res[k] === true, d = document.createElement("details"); d.className = "qt-rv " + (ok ? "ok" : "no"); d.open = !ok;
      d.innerHTML = `<summary><span class="qt-mark">${ok ? "✓" : "✗"}</span><b>${k + 1}.</b> <span class="qt-faint">${cum ? "Ch " + q.cn + " · " : ""}${esc(q.tt)} · Level ${q.lv}</span></summary>
        <div class="qt-text">${q.p.q}</div>
        <div class="qt-ans"><div><span class="label">Your answer</span><div>${run.ans[k] ? esc(run.ans[k]) : '<span class="qt-faint">(blank)</span>'}</div></div><div><span class="label">Correct answer</span><div>$${q.p.ansTex}$</div></div></div>${solList(q.p)}`;
      rev.appendChild(d);
    });
    view.querySelectorAll(".qt-trow button").forEach(b => b.onclick = () => {
      const t = by[+b.dataset.i]; const c = CHAPTERS.find(c => c.id === t.cid); if (!c) return;
      if (CH.id !== c.id) openChapter(c.id, "practice"); else setTab("practice");
      const topic = c.topics.find(x => x.id === t.tid); if (topic && typeof startPractice === "function") startPractice(topic);
    });
    g("qtAgain").onclick = () => { opt = Object.assign({}, run.o, { ch: CH.id }); start(run.kind); };
    g("qtHome").onclick = home;
    render(view);
    view.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------------- printable test + answer key ---------------- */
  function paper(kind) {
    const o = Object.assign({}, opt), qs = kind === "quiz" ? buildQuiz(o) : kind === "ws" ? buildWorksheet(o) : buildTest(o), title = titleFor(kind, o);
    const course = ((document.querySelector(".intro .label") || {}).textContent || "").split("·")[0].trim();
    const ver = Math.random().toString(36).slice(2, 6).toUpperCase();
    const fileBase = ["FangMath", course, "Ch" + chNum(CH), kind === "quiz" ? "Quiz" : kind === "ws" ? "Worksheet" : (o.scope === "cumul" ? "Cumulative-Test" : "Test"), kind === "quiz" ? "L" + o.lv : kind === "ws" ? WS[o.wsLv].name : DIFF[o.diff].name, ver].join("_").replace(/[^\w-]+/g, "-");
    const old = document.querySelector(".qtp"); if (old) old.remove();
    const m = document.createElement("div"); m.className = "qtp";
    const head = (h, extra) => `<div class="qtp-head"><div><div class="qtp-brand">Prof. Fang <span>Math</span></div><h1>${h}</h1><div class="qtp-sub">${esc(course)} · ${esc(CH.title)} · ${qs.length} ${kind === "ws" ? "problems" : "questions"}${kind === "test" ? " · " + minutes(qs) + " minutes" : ""} · Version ${ver}</div></div>${extra || ""}</div>`;
    const groups = []; qs.forEach((q, i) => { const last = groups[groups.length - 1]; if (!last || last.name !== q.part) groups.push({ name: q.part, start: i + 1, qs: [q] }); else last.qs.push(q); });
    const partHead = gr => gr.name ? `<h3 class="qtp-part">${esc(gr.name)}</h3>` : "";
    m.innerHTML = `<div class="qtp-sheet${kind === "ws" ? " qtp-ws" : ""}">
      <div class="qtp-acts">
        <span class="qtp-dl">📥 Download PDF:</span>
        <button class="btn teal sm" data-dl="paper">${kind === "quiz" ? "Quiz" : kind === "ws" ? "Worksheet" : "Test"}</button>
        <button class="btn teal sm" data-dl="key">Answer key</button>
        <button class="btn ghost sm" data-dl="both">Both in one file</button>
        <span class="qtp-sp"></span>
        <button class="btn ghost sm" id="qtpGo">🖨 Print</button><button class="btn ghost sm" id="qtpNew">New version</button><button class="btn ghost sm" id="qtpX">Close</button>
      </div>
      <div class="qtp-msg" id="qtpMsg"></div>
      <div class="qtp-paper">${head(esc(title), `<div class="qtp-lines"><div>Name <i></i></div><div>Date <i></i></div><div>Score <i></i> / ${qs.length}</div></div>`)}
        <p class="qtp-dir">${kind === "ws" ? "Show your work under each problem and write your answer on the line. When you finish, check every answer with the answer key and redo any you missed." : "Show your work in the space under each question. Write your final answer on the line. No calculator unless your teacher says so."}</p>
        ${groups.map(gr => `${partHead(gr)}<ol class="qtp-qs" start="${gr.start}">${gr.qs.map(q => `<li><div class="qtp-q">${q.p.q}</div><div class="qtp-work"></div><div class="qtp-ansline">Answer: <i></i></div></li>`).join("")}</ol>`).join("")}
        <div class="qtp-foot">fangmath.com</div></div>
      <div class="qtp-key">${head("Answer Key — " + esc(title))}
        ${groups.map(gr => `${partHead(gr)}<ol class="qtp-ks" start="${gr.start}">${gr.qs.map(q => `<li><div><b>$${q.p.ansTex}$</b> <span class="qtp-meta">${esc(q.tt)} · Level ${q.lv}</span></div>${solList(q.p)}</li>`).join("")}</ol>`).join("")}
        <div class="qtp-foot">fangmath.com</div></div></div>`;
    document.body.appendChild(m); render(m);
    const close = () => { m.remove(); document.body.classList.remove("qt-printing"); };
    m.querySelector("#qtpX").onclick = close;
    m.querySelector("#qtpNew").onclick = () => { close(); paper(kind); };
    m.querySelector("#qtpGo").onclick = () => { document.body.classList.add("qt-printing"); window.print(); setTimeout(() => document.body.classList.remove("qt-printing"), 600); };
    m.onclick = e => { if (e.target === m) close(); };
    m.querySelectorAll("[data-dl]").forEach(b => b.onclick = () => download(m, b.dataset.dl, fileBase));
  }
  let h2pLoading = null;
  function loadH2P() {
    if (window.html2pdf) return Promise.resolve();
    return h2pLoading || (h2pLoading = new Promise((ok, bad) => {
      const s = document.createElement("script"); s.src = "https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.2/dist/html2pdf.bundle.min.js";
      s.onload = ok; s.onerror = () => { h2pLoading = null; bad(); }; document.head.appendChild(s);
    }));
  }
  async function download(m, which, base) {
    const msg = m.querySelector("#qtpMsg"), btns = m.querySelectorAll("[data-dl]");
    btns.forEach(b => b.disabled = true); msg.textContent = "Making the PDF…";
    try {
      await loadH2P();
      const W = 725, H = 940;                 // px per letter page at 12 mm margins (width 725 ↔ height ≈ 965)
      const meas = document.createElement("div"); meas.className = "qtp-pdf" + (m.querySelector(".qtp-ws") ? " qtp-ws" : "");
      meas.style.cssText = `position:absolute;left:-20000px;top:0;width:${W}px`; document.body.appendChild(meas);
      const blocks = [];                       // [{el, newDoc}] — head, part titles (kept with the next problem) and one problem each
      const parts = which === "paper" ? [".qtp-paper"] : which === "key" ? [".qtp-key"] : [".qtp-paper", ".qtp-key"];
      parts.forEach((sel, pi) => {
        const src = m.querySelector(sel).cloneNode(true); let first = true, carry = null;
        [...src.children].forEach(ch => {
          if (ch.classList.contains("qtp-foot")) return;
          if (ch.tagName === "OL") {
            const start = +ch.getAttribute("start") || 1;
            [...ch.children].forEach((li, k) => {
              const ol = document.createElement("ol"); ol.className = ch.className; ol.start = start + k; ol.appendChild(li);
              const w = document.createElement("div"); w.className = "qtp-blk"; if (carry) { w.appendChild(carry); carry = null; } w.appendChild(ol);
              blocks.push({ el: w, newDoc: first && pi > 0 }); first = false; });
          } else if (ch.classList.contains("qtp-part")) carry = ch;
          else { const w = document.createElement("div"); w.className = "qtp-blk"; w.appendChild(ch); blocks.push({ el: w, newDoc: first && pi > 0 }); first = false; }
        });
      });
      blocks.forEach(bk => meas.appendChild(bk.el));
      meas.querySelectorAll("svg[viewBox]").forEach(sv => {        // give every figure a fixed size so it draws the same in the PDF
        const vb = sv.getAttribute("viewBox").split(/[\s,]+/).map(Number), w = Math.min(340, vb[2] || 340), h = vb[2] ? w * vb[3] / vb[2] : w;
        sv.setAttribute("width", w); sv.setAttribute("height", h); sv.style.width = w + "px"; sv.style.height = h + "px"; sv.style.maxWidth = "none"; });
      const box = document.createElement("div"); box.className = meas.className; box.style.width = W + "px";
      let page = null, used = 0;
      blocks.forEach(bk => {
        const hgt = bk.el.getBoundingClientRect().height;
        if (!page || bk.newDoc || used + hgt > H) { page = document.createElement("div"); page.className = "qtp-pg" + (box.children.length ? " qtp-newpage" : ""); box.appendChild(page); used = 0; }
        page.appendChild(bk.el); used += hgt;
      });
      meas.remove();
      const name = base + (which === "key" ? "_AnswerKey" : which === "both" ? "_with-Answers" : "") + ".pdf";
      await html2pdf().set({ margin: [12, 12, 12, 12], filename: name, image: { type: "jpeg", quality: 0.96 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", scrollX: 0, scrollY: 0 }, jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
        pagebreak: { mode: ["css"], before: ".qtp-newpage" } }).from(box).save();
      msg.textContent = "✓ Downloaded " + name;
    } catch (e) {
      msg.innerHTML = "Couldn't make the PDF here. Use <b>🖨 Print</b> and choose <b>Save as PDF</b> instead.";
    }
    btns.forEach(b => b.disabled = false);
  }

  /* ---------------- styles ---------------- */
  function css() {
    const s = document.createElement("style");
    s.textContent = `
.qt{display:flex;flex-direction:column;gap:18px}
.qt-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media (max-width:820px){.qt-grid{grid-template-columns:1fr}}
.qt-box{display:flex;flex-direction:column;gap:8px}
.qt-wide{grid-column:1/-1;border-color:#E9D6A8}
.qt-handouts{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;background:#FFF8EA;border:1.5px solid #E9D6A8;border-radius:14px;padding:10px 14px;margin:0 0 12px}
.qt-hl{font-weight:700;color:#8A6415;font-size:14px}
.qt-hrow{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.qt-hrow b{font-weight:600;font-size:14.5px}
.qt-flash{box-shadow:0 0 0 3px var(--gold);transition:box-shadow .4s}
.qt-wsrow{display:grid;grid-template-columns:minmax(200px,1fr) auto auto;gap:16px;align-items:start}
@media (max-width:900px){.qt-wsrow{grid-template-columns:1fr}}
.qt-wsrow>div{display:flex;flex-direction:column;gap:8px}
.qtp-part{font-family:Fraunces,Georgia,serif;font-size:18px;color:var(--navy);margin:16px 0 4px;padding-bottom:4px;border-bottom:1px solid var(--line);break-after:avoid;page-break-after:avoid}
.qtp-ws .qtp-work,.qtp-pdf.qtp-ws .qtp-work{height:95px}
.qt-box h2{font-size:22px}
.qt-sub{margin:0 0 4px;color:var(--muted);font-size:14.5px}
.qt-lab{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--faint);font-weight:700;margin-top:6px}
.qt-sel{border:1px solid var(--line);border-radius:12px;padding:9px 12px;background:var(--bg);font:inherit;width:100%}
.qt-seg{display:flex;flex-wrap:wrap;gap:6px}
.qt-seg button{border:1.5px solid var(--line);background:var(--surface);border-radius:12px;padding:7px 12px;font:inherit;font-size:14px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:flex-start;line-height:1.25}
.qt-seg button small{font-weight:500;font-size:11.5px;color:var(--faint)}
.qt-seg button.on{border-color:var(--navy);background:var(--navy);color:#fff}
.qt-seg button.on small{color:#cfd8ea}
.qt-go{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:auto;padding-top:12px}
.qt-time{font-size:14px;color:var(--muted);font-weight:600}
.qt-hist table{width:100%;border-collapse:collapse;margin-top:8px;font-size:14.5px}
.qt-hist td{padding:7px 6px;border-top:1px solid var(--line)}
.qt-hist .pct{white-space:nowrap}
.qt-faint{color:var(--faint);font-size:13.5px}
.qt-run{display:flex;flex-direction:column;gap:12px}
.qt-bar{position:sticky;top:64px;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;background:rgba(255,255,255,.97);border:1px solid var(--line);border-radius:14px;padding:10px 14px;box-shadow:var(--shadow)}
.qt-clock{font-variant-numeric:tabular-nums;font-weight:700;font-size:18px;color:var(--navy)}
.qt-clock.low{color:var(--red)}
.qt-note{margin:0;font-size:14px;color:var(--muted)}
.qt-q{display:flex;gap:14px;align-items:flex-start;padding:16px 18px}
.qt-q.qt-flag{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold-soft)}
.qt-num{flex:none;width:32px;height:32px;border-radius:50%;background:var(--navy);color:#fff;display:grid;place-items:center;font-weight:700;font-size:14px}
.qt-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px}
.qt-text{font-size:18px;line-height:1.7;overflow-x:auto}
.qt-endrow{display:flex;justify-content:flex-end}
.qt-res{display:flex;flex-direction:column;gap:14px}
.qt-score{display:flex;gap:22px;align-items:center;flex-wrap:wrap}
.qt-score h2{font-size:26px;margin:4px 0}
.qt-score p{margin:4px 0}
.qt-ring{--p:0;width:120px;height:120px;border-radius:50%;background:conic-gradient(var(--c) calc(var(--p)*1%),var(--line) 0);display:grid;place-items:center;align-content:center;position:relative;flex:none}
.qt-ring::before{content:"";position:absolute;inset:12px;border-radius:50%;background:var(--surface)}
.qt-ring b,.qt-ring span{position:relative;line-height:1.1;text-align:center}
.qt-ring b{font-size:26px;font-family:Fraunces,Georgia,serif}
.qt-ring span{font-weight:700;color:var(--c)}
.qt-acts{display:flex;gap:8px;flex-wrap:wrap}
.qt-topics{display:flex;flex-direction:column;gap:8px;margin-top:10px}
.qt-trow{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(80px,1fr) 44px 110px;gap:12px;align-items:center}
@media (max-width:640px){.qt-trow{grid-template-columns:1fr 60px 40px;}.qt-trow .qt-tbar{display:none}}
.qt-tbar{height:10px;border-radius:5px;background:var(--line);overflow:hidden}.qt-tbar i{display:block;height:100%}
.qt-tn{font-weight:700;text-align:right}
.qt-ok{color:var(--green);font-weight:700;text-align:center}
.qt-rv{border-top:1px solid var(--line);padding:10px 0}
.qt-rv summary{cursor:pointer;list-style:none;display:flex;gap:8px;align-items:baseline}
.qt-rv summary::-webkit-details-marker{display:none}
.qt-mark{font-weight:800}.qt-rv.ok .qt-mark{color:var(--green)}.qt-rv.no .qt-mark{color:var(--red)}
.qt-rv .qt-text{margin:8px 0}
.qt-ans{display:grid;grid-template-columns:1fr 1fr;gap:10px;background:var(--bg);border-radius:12px;padding:10px 14px}
.qt-rv.no .qt-ans>div:first-child div{color:var(--red)}
.qtp{position:fixed;inset:0;z-index:100;background:rgba(22,35,59,.55);overflow:auto;padding:24px 14px}
.qtp-sheet{background:#fff;max-width:860px;margin:0 auto;border-radius:14px;padding:26px 30px;box-shadow:0 20px 50px rgba(0,0,0,.25)}
.qtp-acts{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px}
.qtp-dl{font-weight:700;font-size:14px}.qtp-sp{flex:1}
.qtp-msg{font-size:13.5px;color:var(--muted);min-height:1.3em;margin-bottom:10px}
.qtp-pdf{background:#fff;color:#16233B;padding:0}
.qtp-q .a2fig{max-width:380px;margin:8px 0}
.qtp-blk{display:flow-root}.qtp-blk>ol{margin:0}
.qtp-pdf *{break-inside:auto!important;break-after:auto!important;page-break-inside:auto!important;page-break-after:auto!important}
.qtp-pdf .qtp-key,.qtp-pdf .qtp-blk{break-before:auto!important;page-break-before:auto!important}
.qtp-pdf .qtp-key{margin-top:0;padding-top:0;border-top:0;break-before:auto;page-break-before:auto}
.qtp-pdf .qtp-work{height:150px}
.qtp-head{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;border-bottom:2px solid var(--navy);padding-bottom:12px}
.qtp-brand{font-weight:700;font-size:14px;color:var(--ink)}.qtp-brand span{color:var(--teal)}
.qtp-sheet h1{font-family:Fraunces,Georgia,serif;font-size:24px;color:var(--navy);margin:2px 0}
.qtp-sub{font-size:13px;color:var(--muted)}
.qtp-lines{display:flex;flex-direction:column;gap:10px;font-size:14px;min-width:240px}
.qtp-lines div{display:flex;gap:8px;align-items:flex-end}.qtp-lines i{flex:1;border-bottom:1px solid #333;min-width:60px;height:16px}
.qtp-dir{font-size:13.5px;color:var(--muted);margin:10px 0}
.qtp-qs{padding-left:24px;margin:0}
.qtp-qs li{break-inside:avoid;page-break-inside:avoid;padding:8px 0 4px}
.qtp-q{font-size:16px;line-height:1.6}
.qtp-work{height:120px}
.qtp-ansline{display:flex;gap:8px;justify-content:flex-end;font-size:14px}.qtp-ansline i{width:200px;border-bottom:1px solid #333}
.qtp-key{margin-top:30px;padding-top:16px;border-top:2px dashed var(--line);break-before:page;page-break-before:always}
.qtp-ks{padding-left:24px;font-size:14px}.qtp-ks li{break-inside:avoid;margin:6px 0}
.qtp-ks .sol{font-size:13px;color:var(--muted)}
.qtp-meta{font-size:12px;color:var(--faint);margin-left:6px}
.qtp-foot{margin-top:14px;font-size:12px;color:var(--faint);text-align:right}
@media print{
  body.qt-printing > *:not(.qtp){display:none !important}
  body.qt-printing .qtp{position:static;background:none;padding:0;overflow:visible}
  body.qt-printing .qtp-sheet{box-shadow:none;border-radius:0;padding:0;max-width:none}
  body.qt-printing .qtp-acts,body.qt-printing .qtp-msg{display:none}
  @page{margin:14mm}
}`;
    document.head.appendChild(s);
  }

  window.fmQuizState = () => run;      // for checking in the browser console
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready); else ready();
})();

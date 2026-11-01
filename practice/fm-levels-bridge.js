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
    tabBtn.textContent = "③ Worksheets";
    g("tabPractice").after(tabBtn); tabBtn.hidden = true;   // quiz & test open from the lesson path; worksheets are on the main Worksheets page
    view = document.createElement("div"); view.id = "quizView"; view.className = "qt"; view.hidden = true;
    g("practiceView").after(view);

    const orig = window.setTab;
    window.setTab = function (t) {
      if (t === "quiz") return showQuiz();
      view.hidden = true; tabBtn.classList.remove("on"); stopTick();
      return orig.apply(this, arguments);
    };
    tabBtn.onclick = () => setTab("quiz");
    fmtInit();
    cpHooks();
    progInit();
    eocHooks();
    vidInit();
    partsInit();
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
    if (/^#p?eoc(-\w+)?$/.test(HASH0)) { const d = (/-(review|standard|honors)$/.exec(HASH0) || [])[1] || "standard";
      setTimeout(() => HASH0.startsWith("#peoc") ? eocPaper(d) : eocHome(d), 150); }
    const m = /^#(ch\w+)-(quiz|test|ws|pquiz|ptest)(?:-(easy|medium|hard|combined))?(?:-(\d+))?(?:-([\w,]+))?$/.exec(HASH0);
    if (m) {
      if (CHAPTERS.some(c => c.id === m[1]) && CH.id !== m[1]) openChapter(m[1], "learn");
      const [, , what, wl, wn, wt] = m;
      setTimeout(() => {
        if (what === "quiz" || what === "test") return gotoCp(what);
        if (what === "pquiz" || what === "ptest") { opt = what === "ptest" ? cpTestOpts() : cpQuizOpts(); return paper(what === "ptest" ? "test" : "quiz"); }
        opt = Object.assign({}, opt || {}, { ch: CH.id, wsLv: wl || "combined", wsN: +wn || 21, wsTopic: wt || "all" }); paper("ws");
      }, 150);
    }
  }

  /* ---------- printable handouts (PDF worksheet + answer key) for this chapter ----------
     To add one: put the PDFs in materials/..., then add a line here under the page and chapter. */
  const HANDOUTS = {
    "algebra2-levels": {
      ch2: [{ t: "2-1 Domain & Range", ws: "../materials/algebra2/ch02/Alg2_2-1_Domain_Range_Worksheet.pdf", key: "../materials/algebra2/ch02/Alg2_2-1_Domain_Range_Key.pdf", bw: 1 }],
      ch4: [{ t: "4-1 Quadratic Functions & Transformations (notes)", ws: "../materials/algebra2/ch04/Alg2_4-1_Notes.pdf", key: "../materials/algebra2/ch04/Alg2_4-1_Notes_Key.pdf" }],
      ch6: [{ t: "6-7 Inverse Relations & Functions", ws: "../materials/algebra2/ch06/Alg2_6-7_Inverse_Functions_Worksheet.pdf", key: "../materials/algebra2/ch06/Alg2_6-7_Inverse_Functions_Key.pdf", bw: 1 }],
    },
  };
  function drawHandouts() {
    const tabs = document.querySelector(".tabs[role=tablist]"); if (!tabs || !CH) return;
    let box = g("handouts"); const list = (HANDOUTS[PG] || {})[CH.id] || [];
    if (!list.length) { if (box) box.remove(); return; }
    if (!box) { box = document.createElement("div"); box.id = "handouts"; box.className = "qt-handouts"; tabs.parentNode.insertBefore(box, tabs); }
    box.innerHTML = `<span class="qt-hl">📎 Printable handout${list.length > 1 ? "s" : ""}</span>` + list.map(h => `<span class="qt-hrow"><b>${esc(h.t)}</b>
      <a class="btn sm" style="background:#8A6415" href="${h.ws}" target="_blank" rel="noopener">📄 Worksheet PDF</a>${h.key ? `<a class="btn sm ghost" href="${h.key}" target="_blank" rel="noopener">🔑 Answer key</a>` : ""}${h.bw ? `<a class="btn sm ghost" href="${h.ws.replace(/\.pdf$/, "_BW.pdf")}" target="_blank" rel="noopener">⚫ B&amp;W</a>${h.key ? `<a class="btn sm ghost" href="${h.key.replace(/\.pdf$/, "_BW.pdf")}" target="_blank" rel="noopener">⚫ B&amp;W key</a>` : ""}` : ""}</span>`).join("");
  }

  /* ================= CHECKPOINTS: 1 quiz in the middle of each chapter, 1 test at the end =================
     The chapter's sections (1.1, 1.2, …) are split in half: the quiz covers the first half and sits right
     after it in the lesson path; the chapter test covers everything and sits at the end. */
  function secGroups() {
    let G;
    if (typeof sections === "function") { try { G = sections().map(x => ({ no: x.no, name: x.name, idx: x.idx })); } catch (e) {} }
    if (!G) { G = []; CH.topics.forEach((t, i) => { const m = /^(\d+\.\d+)\s/.exec(t.title), no = m ? m[1] : chNum(CH) + "." + (i + 1); const last = G[G.length - 1];
      if (m && last && last.no === no) last.idx.push(i); else G.push({ no, name: m ? t.title.slice(m[0].length) : t.title, idx: [i] }); }); }
    G.forEach(x => x.label = x.no + " " + x.name);
    return G;
  }
  function cpPlan() {
    const G = secGroups(), k = G.length < 2 ? 1 : Math.ceil(G.length / 2) - (G.length % 2 ? 0 : 0);
    const q = G.slice(0, Math.min(k, Math.max(1, G.length - 1))), lastIdx = Math.max(...q.flatMap(x => x.idx));
    const label = q.length > 1 ? `${q[0].no}–${q[q.length - 1].no}` : q[0].no;
    return { G, quiz: { secs: q, ids: q.flatMap(x => x.idx).map(i => CH.topics[i].id).join(","), after: lastIdx, label }, testAfter: CH.topics.length - 1 };
  }
  function best(cp) { const H = hist().filter(r => r.ch === CH.id && r.cp === cp); return H.length ? Math.max(...H.map(r => r.pct)) : null; }
  const badge = p => p == null ? "" : `<span class="cp-best ${p >= 80 ? "ok" : p >= 60 ? "mid" : "low"}">best ${p}%</span>`;
  function cpCard() {
    const P = cpPlan(), n = chNum(CH), G = P.G;
    return `<div class="card qt-cp" id="qtCp">
      <span class="label" style="color:var(--navy)">Chapter ${n} checkpoints</span>
      <div class="cp-row" id="cpQuizRow"><span class="cp-ic">📝</span><div class="cp-t"><b>Chapter ${n} Quiz · ${esc(P.quiz.label)}</b>
          <small>After lesson ${esc(P.quiz.label.split("–").pop())} · 10 questions on ${esc(P.quiz.secs.map(x => x.name).join(", "))} · see right or wrong after each one</small></div>
        ${badge(best("quiz"))}<span class="cp-btns"><button class="btn sm teal" id="cpQuiz">Start quiz →</button><button class="btn sm ghost" id="cpQuizP">📄 Paper + key</button></span></div>
      <div class="cp-row" id="cpTestRow"><span class="cp-ic">⏱</span><div class="cp-t"><b>Chapter ${n} Test · all of Chapter ${n}</b>
          <small>At the end of the chapter · 15 questions, timed, graded with a topic report</small></div>
        ${badge(best("test"))}<span class="cp-btns"><button class="btn sm" id="cpTest">Start test →</button><button class="btn sm ghost" id="cpTestP">📄 Paper + key</button></span></div>
      <div class="cp-ws"><span class="cp-wl">📄 Worksheet for each lesson <small>(Easy → Medium → Hard, with answer key)</small></span>
        <span class="cp-wsb">${G.map((x, i) => `<button class="btn sm ghost" data-ws="${i}">${esc(x.no)}</button>`).join("")}</span></div>
    </div>`;
  }
  function cpQuizOpts() { const P = cpPlan(), lv = Math.max(2, Math.min(4, typeof curLv === "function" ? curLv() : 2));
    return Object.assign({}, opt || {}, { ch: CH.id, topic: P.quiz.ids, lv, cp: "quiz", cpLabel: P.quiz.label }); }
  function cpTestOpts() { return Object.assign({}, opt || {}, { ch: CH.id, scope: "chapter", diff: "standard", n: 15, cp: "" }); }
  function lessonWs(ids, label) { opt = Object.assign({}, opt || {}, { ch: CH.id, wsTopic: ids, wsLv: "combined", wsN: 12 }); paper("ws"); }
  function cpPrint() {
    const P = cpPlan();
    return `<div class="cp-print"><div class="cp-ws"><span class="cp-wl">One lesson:</span><span class="cp-wsb">${P.G.map((x, i) => `<button class="btn sm ghost" data-ws="${i}" title="${esc(x.label)}">${esc(x.no)}</button>`).join("")}</span></div>
      <div class="cp-ws"><span class="cp-wl">Printable quiz &amp; test:</span><span class="cp-wsb"><button class="btn sm ghost" id="cpQuizP">📝 Quiz ${esc(P.quiz.label)} + key</button><button class="btn sm ghost" id="cpTestP">⏱ Chapter ${chNum(CH)} Test + key</button></span></div></div>`;
  }
  function wireCp() {
    const P = cpPlan(), keep = () => Object.assign({}, opt);
    const go = (o, k, pap) => { const save = keep(); opt = o; pap ? paper(k) : start(k); if (pap) opt = save; };
    if (g("cpQuizP")) g("cpQuizP").onclick = () => go(cpQuizOpts(), "quiz", true);
    if (g("cpTestP")) g("cpTestP").onclick = () => go(cpTestOpts(), "test", true);
    view.querySelectorAll("[data-ws]").forEach(b => b.onclick = () => { const x = P.G[+b.dataset.ws]; lessonWs(x.idx.map(i => CH.topics[i].id).join(","), x.label); });
  }
  function gotoCp(which) {
    setTab("quiz"); if (run && run.live && run.ch === CH.id) return;
    opt = which === "test" ? cpTestOpts() : cpQuizOpts(); start(which === "test" ? "test" : "quiz");
  }
  // checkpoint stops in the lesson path, the end-of-lesson buttons and (Geometry) the section list
  function cpHooks() {
    const chip = (ic, txt, cls, fn) => { const b = document.createElement("button"); b.type = "button"; b.className = "stop cp-stop " + cls; b.innerHTML = `<i>${ic}</i>${txt}`; b.onclick = fn; return b; };
    const oRoad = window.road;
    if (oRoad) window.road = function () { const r = oRoad.apply(this, arguments); try {
        const box = g("road"); if (!box || !CH) return r; const P = cpPlan(), stops = [...box.querySelectorAll(".stop:not(.cp-stop)")];
        const qb = best("quiz"), tb = best("test");
        const q = chip("📝", `Quiz ${esc(P.quiz.label)}${qb != null ? " · " + qb + "%" : ""}`, qb != null ? "done" : "", () => gotoCp("quiz"));
        const t = chip("⏱", `Chapter test${tb != null ? " · " + tb + "%" : ""}`, tb != null ? "done" : "", () => gotoCp("test"));
        const after = stops[P.quiz.after]; if (after) after.after(q); else box.appendChild(q);
        box.appendChild(t);
      } catch (e) { console.warn("cp road", e); } return r; };
    const oNext = window.showNext;
    if (oNext) window.showNext = function () { const r = oNext.apply(this, arguments); try {
        const box = g("tNext"); if (!box || !CH) return r; const P = cpPlan(), t = CH.topics[LI];
        const G = P.G.find(x => x.idx.includes(LI));
        const ws = document.createElement("button"); ws.className = "btn ghost sm"; ws.textContent = "📄 Worksheet";
        ws.title = "Printable worksheet + answer key for this lesson"; ws.onclick = () => { lessonWs(G ? G.idx.map(i => CH.topics[i].id).join(",") : t.id); };
        box.insertBefore(ws, box.lastChild);
        if (LI === P.quiz.after || LI === P.testAfter) {
          const b = document.createElement("button"); b.className = "btn sm"; b.style.background = LI === P.testAfter ? "var(--navy)" : "var(--teal)";
          b.textContent = LI === P.testAfter ? "⏱ Take the Chapter Test →" : `📝 Take the Quiz (${P.quiz.label}) →`;
          b.onclick = () => gotoCp(LI === P.testAfter ? "test" : "quiz"); box.appendChild(b);
        }
      } catch (e) { console.warn("cp next", e); } return r; };
    const oSec = window.secList;
    if (oSec) window.secList = function () { const r = oSec.apply(this, arguments); try {
        const box = g("secs"); if (!box || !CH) return r; const P = cpPlan(), items = [...box.querySelectorAll(".sec")];
        const mk = (ic, txt, fn) => { const x = document.createElement("button"); x.type = "button"; x.className = "sec cp-sec"; x.innerHTML = `<b>${ic}</b><span>${txt}</span>`; x.onclick = fn; return x; };
        const qi = P.G.indexOf(P.quiz.secs[P.quiz.secs.length - 1]);
        if (items[qi]) items[qi].after(mk("📝", "Quiz " + esc(P.quiz.label), () => gotoCp("quiz")));
        box.appendChild(mk("⏱", "Chapter test", () => gotoCp("test")));
      } catch (e) { console.warn("cp secs", e); } return r; };
    try { if (CH && g("road")) road(); if (CH && g("secs") && window.secList) secList(); } catch (e) {}
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
    if (scope !== "cumul" && scope !== "course") return shuffle(CH.topics).map(t => ({ t, c: CH }));
    const chs = (scope === "course" ? CHAPTERS : CHAPTERS.slice(0, CHAPTERS.indexOf(CH) + 1)).map(c => shuffle(c.topics).map(t => ({ t, c })));
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
    const P = topicPool(o.topic);
    const lvs = o.cp ? [o.lv, o.lv, Math.min(5, o.lv + 1)] : [o.lv];      // checkpoint quiz: mostly your level, some one step up
    const out = []; for (let i = 0; i < 10; i++) out.push(pack(P[i % P.length], lvs[i % lvs.length], seen));
    return shuffle(out.filter(Boolean));
  }
  function buildWorksheet(o) {
    const seen = new Set(), n = o.wsN;
    const P = topicPool(o.wsTopic);
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
  function topicPool(sel) {           // "all", one topic id, or several ids joined by ","
    if (!sel || sel === "all") return pool("chapter");
    const ids = String(sel).split(","), P = shuffle(CH.topics.filter(t => ids.includes(t.id))).map(t => ({ t, c: CH }));
    return P.length ? P : pool("chapter");
  }
  function topicName(sel) {
    if (!sel || sel === "all") return "Chapter " + chNum(CH);
    const ids = String(sel).split(","); if (ids.length === 1) return (CH.topics.find(t => t.id === ids[0]) || {}).title || "";
    const g2 = secGroups().find(x => x.idx.map(i => CH.topics[i].id).join(",") === sel); return g2 ? g2.label : "Selected lessons";
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
    const other = loadRun();
    view.innerHTML = other && other.live && other.ch !== CH.id ? `<div class="fb hint qt-resume"><span class="tag">Unfinished test</span>${esc(other.title)} is still open (the clock keeps running). <button class="btn sm" id="qtResume">Go back to it →</button></div>` : "";
    if (g("qtResume")) g("qtResume").onclick = () => { openChapter(other.ch, "practice"); setTab("quiz"); };
  }
  function titleFor(kind, o) {
    const n = chNum(CH);
    if (kind === "ws") return `${topicName(o.wsTopic)} Worksheet · ${WS[o.wsLv].name}`;
    if (kind === "quiz" && o.cp) return `Chapter ${n} Quiz · ${o.cpLabel}`;
    if (kind === "quiz") return `Quiz · ${topicName(o.topic)} · Level ${o.lv} ${LEVELS[o.lv - 1].name}`;
    if (o.scope === "course") return `End-of-Course Test · ${DIFF[o.diff].name}`;
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
    g("qtQuit").onclick = () => { if (confirm("Quit this quiz? Your answers won't be saved.")) { home(); setTab("learn"); } };
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
    setTimeout(() => progRefresh(), 300);
    addHist({ ch: run.ch, kind: run.kind, cp: run.o.cp || (run.kind === "test" && run.o.scope === "chapter" ? "test" : ""), title: run.title, score, total, pct, at: Date.now() });
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
    const msg = pct === 100 ? "Perfect score! 🎉" : pct >= 90 ? "Excellent work." : pct >= 80 ? (run.o.scope === "course" ? "Solid — fix the few you missed and you've got this course." : "Solid — fix the few you missed and you've got this chapter.") : pct >= 60 ? "Getting there. Practice the weak topics below, then try again." : (run.o.scope === "course" ? "Review the weakest chapters below first, then try a new version." : "This chapter needs more practice. Start with the weakest topic below.");
    view.innerHTML = `<div class="card qt-res">
        <div class="qt-score" style="--c:${color}"><div class="qt-ring" style="--p:${pct}"><b>${pct}%</b>${test ? `<span>${grade(pct)}</span>` : ""}</div>
          <div><span class="label">${esc(run.title)}</span><h2>${score} out of ${total} correct</h2><p>${msg}</p>
          <p class="qt-faint">${run.timeUp ? "⏰ Time ran out — it was handed in automatically. " : ""}Time used: ${fmtTime(run.sec)}${run.res.some(r => r !== true) ? " · missed questions were added to your " + ((window.fmLv || {}).MLOG || "Mistake Log") : ""}</p>
          <p class="qt-faint" id="qtSaved"></p></div></div>
        <div class="qt-acts"><button class="btn" id="qtAgain">${test ? "New test (new questions)" : "New quiz"}</button><button class="btn ghost" id="qtHome">Back to the lessons</button></div>
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
    g("qtHome").onclick = () => { home(); setTab("learn"); };
    render(view);
    view.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------------- printable test + answer key ---------------- */
  function paper(kind) {
    const o = Object.assign({}, opt), qs = kind === "quiz" ? buildQuiz(o) : kind === "ws" ? buildWorksheet(o) : buildTest(o), title = titleFor(kind, o);
    const course = ((document.querySelector(".intro .label") || {}).textContent || "").split("·")[0].trim();
    const ver = Math.random().toString(36).slice(2, 6).toUpperCase();
    const eoc = kind === "test" && o.scope === "course";
    const fileBase = ["FangMath", course, eoc ? "End-of-Course" : "Ch" + chNum(CH), kind === "quiz" ? "Quiz" : kind === "ws" ? "Worksheet" : (o.scope === "cumul" ? "Cumulative-Test" : "Test"), kind === "quiz" ? "L" + o.lv : kind === "ws" ? WS[o.wsLv].name : DIFF[o.diff].name, ver].filter((x, i) => !(eoc && i === 3)).join("_").replace(/[^\w-]+/g, "-");
    const old = document.querySelector(".qtp"); if (old) old.remove();
    const m = document.createElement("div"); m.className = "qtp";
    const head = (h, extra) => `<div class="qtp-head"><div><div class="qtp-brand">Fang<span>Math</span></div><h1>${h}</h1><div class="qtp-sub">${esc(course)} · ${o.scope === "course" && kind === "test" ? "All " + CHAPTERS.length + " chapters" : esc(CH.title)} · ${qs.length} ${kind === "ws" ? "problems" : "questions"}${kind === "test" ? " · " + minutes(qs) + " minutes" : ""} · Version ${ver}</div></div>${extra || ""}</div>`;
    const groups = []; qs.forEach((q, i) => { const last = groups[groups.length - 1]; if (!last || last.name !== q.part) groups.push({ name: q.part, start: i + 1, qs: [q] }); else last.qs.push(q); });
    const partHead = gr => gr.name ? `<h3 class="qtp-part">${esc(gr.name)}</h3>` : "";
    m.innerHTML = `<div class="qtp-sheet${kind === "ws" ? " qtp-ws" : ""}">
      <div class="qtp-acts">
        <span class="qtp-mode" role="group" aria-label="Color or black and white"><button type="button" class="on" data-mode="color">🎨 Color</button><button type="button" data-mode="bw">⚫ Black &amp; white</button></span>
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
    m.querySelectorAll(".qtp-mode button").forEach(b => b.onclick = () => { m.classList.toggle("bw", b.dataset.mode === "bw"); try { localStorage.setItem("fm-print-mode", b.dataset.mode); } catch (e) {}
      m.querySelectorAll(".qtp-mode button").forEach(x => x.classList.toggle("on", x === b)); });
    try { if (localStorage.getItem("fm-print-mode") === "bw") m.querySelector('.qtp-mode [data-mode="bw"]').click(); } catch (e) {}
    m.querySelector("#qtpX").onclick = close;
    m.querySelector("#qtpNew").onclick = () => { close(); const save = opt; opt = o; paper(kind); opt = save; };
    m.querySelector("#qtpGo").onclick = () => { document.body.classList.add("qt-printing"); window.print(); setTimeout(() => document.body.classList.remove("qt-printing"), 600); };
    m.onclick = e => { if (e.target === m) close(); };
    m.querySelectorAll("[data-dl]").forEach(b => b.onclick = () => download(m, b.dataset.dl, fileBase));
  }
  /* black & white: every color becomes the gray of the same brightness */
  function grayOf(c) {
    const m = /rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)(?:[ ,/]+([\d.]+))?/.exec(c); if (!m) return null;
    const y = Math.round(0.299 * m[1] + 0.587 * m[2] + 0.114 * m[3]), v = y > 235 ? 255 : y < 120 ? Math.round(y * 0.4) : y;
    return m[4] != null ? `rgba(${v},${v},${v},${m[4]})` : `rgb(${v},${v},${v})`;
  }
  function toGray(root) {
    [root, ...root.querySelectorAll("*")].forEach(el => {
      const cs = getComputedStyle(el);
      for (const [prop, css] of [["color", "color"], ["backgroundColor", "background-color"], ["borderTopColor", "border-top-color"], ["borderBottomColor", "border-bottom-color"], ["borderLeftColor", "border-left-color"], ["borderRightColor", "border-right-color"]]) {
        const g2 = grayOf(cs[prop]); if (g2) el.style.setProperty(css, g2, "important"); }
      if (el instanceof SVGElement) for (const a of ["fill", "stroke"]) { const v = cs[a]; if (v && v !== "none" && !/url\(/.test(v)) { const g2 = grayOf(v); if (g2) el.style.setProperty(a, g2, "important"); } }
    });
  }
  let h2pLoading = null;
  function loadH2P() {
    if (window.html2pdf) return Promise.resolve();
    return h2pLoading || (h2pLoading = new Promise((ok, bad) => {
      const s = document.createElement("script"); s.src = "https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.2/dist/html2pdf.bundle.min.js";
      s.onload = ok; s.onerror = () => { h2pLoading = null; bad(); }; document.head.appendChild(s);
    }));
  }
  const kindName = m => { const b = m.querySelector('[data-dl="paper"]'); return b ? b.textContent.trim() : "Worksheet"; };
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
      if (m.classList.contains("bw")) toGray(meas);
      const box = document.createElement("div"); box.className = meas.className; box.style.width = W + "px";
      let page = null, used = 0, part = 0; const pagePart = [];
      blocks.forEach(bk => {
        const hgt = bk.el.getBoundingClientRect().height;
        if (bk.newDoc) part++;
        if (!page || bk.newDoc || used + hgt > H) { page = document.createElement("div"); page.className = "qtp-pg" + (box.children.length ? " qtp-newpage" : ""); box.appendChild(page); pagePart.push(part); used = 0; }
        page.appendChild(bk.el); used += hgt;
      });
      meas.remove();
      const name = base + (which === "key" ? "_AnswerKey" : which === "both" ? "_with-Answers" : "") + ".pdf";
      await html2pdf().set({ margin: [12, 12, 12, 12], filename: name, image: { type: "jpeg", quality: 0.96 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", scrollX: 0, scrollY: 0 }, jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
        pagebreak: { mode: ["css"], before: ".qtp-newpage" } }).from(box).toPdf().get("pdf").then(pdf => {
          // page numbers: "Page 2 / 4" — the worksheet and the answer key are numbered separately
          const n = pdf.internal.getNumberOfPages(), same = n === pagePart.length, labels = which === "both" ? [kindName(m), "Answer key"] : [which === "key" ? "Answer key" : kindName(m)];
          const pw = pdf.internal.pageSize.getWidth(), ph = pdf.internal.pageSize.getHeight();
          for (let i = 1; i <= n; i++) {
            const pt = same ? pagePart[i - 1] : 0, inPart = same ? pagePart.filter(x => x === pt) : Array(n).fill(0), k = same ? pagePart.slice(0, i).filter(x => x === pt).length : i;
            pdf.setPage(i); pdf.setFontSize(9); pdf.setTextColor(120);
            pdf.text("FangMath \u00b7 fangmath.com", 12, ph - 5);
            pdf.text(`${labels[pt] || labels[0]} \u00b7 Page ${k} / ${inPart.length}`, pw - 12, ph - 5, { align: "right" });
          }
        }).save();
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
.qt-cp{display:flex;flex-direction:column;gap:8px;border:1.5px solid var(--navy)}
.cp-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:10px 12px;border-radius:12px;background:var(--bg)}
.cp-ic{font-size:22px}.cp-t{flex:1 1 260px;display:flex;flex-direction:column}.cp-t small{color:var(--muted);font-size:13px}
.cp-btns{display:flex;gap:6px;flex-wrap:wrap}
.cp-best{font-size:12.5px;font-weight:700;border-radius:999px;padding:3px 10px}.cp-best.ok{background:var(--green-soft);color:var(--green)}.cp-best.mid{background:var(--gold-soft);color:#8A6415}.cp-best.low{background:var(--red-soft);color:var(--red)}
.cp-print{border-top:1px dashed var(--line);margin-top:10px;padding-top:6px}
.cp-ws{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:6px 2px 0}.cp-wl{font-weight:600;font-size:14px}.cp-wl small{font-weight:400;color:var(--muted)}.cp-wsb{display:flex;gap:6px;flex-wrap:wrap}
.stop.cp-stop{border-style:dashed;border-color:var(--navy);color:var(--navy);font-weight:700}.stop.cp-stop i{background:none;font-style:normal}
.stop.cp-stop.done{border-style:solid;background:var(--green-soft)}
.sec.cp-sec b{background:none!important}.sec.cp-sec span{font-weight:700;color:var(--navy)}
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
.qtp-dl{font-weight:700;font-size:14px}
.qtp-mode{display:inline-flex;border:1.5px solid var(--line);border-radius:999px;overflow:hidden;margin-right:4px}
.qtp-mode button{border:0;background:#fff;padding:6px 12px;font:inherit;font-size:13px;font-weight:600;cursor:pointer;color:var(--muted)}
.qtp-mode button.on{background:var(--navy);color:#fff}
.qtp.bw .qtp-paper,.qtp.bw .qtp-key{filter:grayscale(1)}.qtp-sp{flex:1}
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
  @page{margin:14mm 14mm 16mm;@bottom-right{content:"Page " counter(page) " / " counter(pages);font:9pt Inter,sans-serif;color:#777}@bottom-left{content:"FangMath \\00B7  fangmath.com";font:9pt Inter,sans-serif;color:#777}}
}`;
    document.head.appendChild(s);
  }


  /* ================= PROGRESS · colors · encouragement · certificate =================
     A lesson is DONE when it was learned (its "Your turn" problem) and 3 practice problems were solved.
     A section is done when all its lessons are done. A chapter is done when all sections are done
     and the chapter test was passed (70%+). When every chapter is done, the student gets a certificate:
     Gold = Highest Honors (tests average 90%+), Silver = Honors (80%+), Bronze = Completion.
     Saved in this browser (per course page). */
  const NEED = 3, PASS = 70;
  const CHEERS = ["Awesome work — one more step done! 🌟", "You did it! Your brain just got stronger. 💪", "Great job! Keep that streak going. 🚀",
    "Nice! Practice is paying off. 🎯", "Section complete — be proud of yourself! 🎉", "Way to go! Every expert started exactly like this. 🌱",
    "Fantastic! You're building real understanding. 🧠", "Boom — finished! On to the next one. ⭐"];
  const progKey = () => "fm-prog-" + PG;
  const loadSeen = () => { try { return JSON.parse(localStorage.getItem(progKey()) || "{}"); } catch (e) { return {}; } };
  const saveSeen = v => { try { localStorage.setItem(progKey(), JSON.stringify(v)); } catch (e) {} };
  const chState = c => (typeof ST !== "undefined" && ST.ch && ST.ch[c.id]) || { learned: {}, solved: {} };
  const solvedT = (S, t) => [1, 2, 3, 4, 5].reduce((a, l) => a + ((S.solved || {})[t.id + l] || 0), 0);
  const topLevel = (S, t) => Math.max(0, ...[1, 2, 3, 4, 5].filter(l => ((S.solved || {})[t.id + l] || 0) > 0));
  const topicDone = (S, t) => !!(S.learned || {})[t.id] && solvedT(S, t) >= NEED;
  function groupsOf(c) {
    const G = []; c.topics.forEach((t, i) => { const m = /^(\d+\.\d+)\s/.exec(t.title), no = m ? m[1] : (CHAPTERS.indexOf(c) + 1) + "." + (i + 1), last = G[G.length - 1];
      if (m && last && last.no === no) last.idx.push(i); else G.push({ no, idx: [i] }); });
    return G;
  }
  function bestTest(c) { const H = hist().filter(r => r.ch === c.id && r.kind === "test" && r.cp !== "eoc"); return H.length ? Math.max(...H.map(r => r.pct)) : null; }
  function chapterProg(c) {
    const S = chState(c), G = groupsOf(c), secs = G.map(g => g.idx.every(i => topicDone(S, c.topics[i])));
    const nd = secs.filter(Boolean).length, test = bestTest(c), allSecs = nd === G.length;
    const lessons = c.topics.filter(t => topicDone(S, t)).length;
    return { G, secs, nd, total: G.length, test, done: allSecs && test != null && test >= PASS, allSecs, lessons,
      level: Math.max(0, ...c.topics.map(t => topLevel(S, t))), solved: c.topics.reduce((a, t) => a + solvedT(S, t), 0) };
  }
  function courseProg() {
    const P = CHAPTERS.map(chapterProg), done = P.filter(p => p.done).length;
    const tests = P.map(p => p.test).filter(x => x != null), avg = tests.length ? Math.round(tests.reduce((a, b) => a + b, 0) / tests.length) : 0;
    const tier = avg >= 90 ? { k: "gold", name: "Gold", title: "With Highest Honors", medal: "🥇" } : avg >= 80 ? { k: "silver", name: "Silver", title: "With Honors", medal: "🥈" } : { k: "bronze", name: "Bronze", title: "Course Completion", medal: "🥉" };
    const lv = P.length ? Math.round(P.reduce((a, p) => a + p.level, 0) / P.length) : 0;
    let total = P.length; try { if (typeof ALLCH !== "undefined") total = Math.max(total, ALLCH.length); else if (typeof COMING !== "undefined") total += COMING.length; } catch (e) {}
    return { P, done, total, complete: done === total && P.length > 0, avg, tier, level: lv, solved: P.reduce((a, p) => a + p.solved, 0) };
  }
  function toast(msg, big) {
    const t = document.createElement("div"); t.className = "fm-toast" + (big ? " big" : ""); t.innerHTML = msg; document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("in")); setTimeout(() => { t.classList.remove("in"); setTimeout(() => t.remove(), 400); }, big ? 6000 : 4200);
  }
  let progBusy = false;
  function progRefresh(quiet) {
    if (progBusy || typeof CHAPTERS === "undefined" || !CH) return; progBusy = true;
    try {
      const C = courseProg(), seen = loadSeen(); seen.secs = seen.secs || {}; seen.chs = seen.chs || {};
      if (quiet && seen.init) { progUI(C); progBusy = false; return; }   // redraw only; celebrations happen after real work
      const news = [];
      C.P.forEach((p, ci) => { const c = CHAPTERS[ci];
        p.G.forEach((g, gi) => { const k = c.id + ":" + g.no; if (p.secs[gi] && !seen.secs[k]) { seen.secs[k] = 1; news.push(["sec", g.no]); } });
        if (p.done && !seen.chs[c.id]) { seen.chs[c.id] = 1; news.push(["ch", ci + 1]); }
      });
      const first = !seen.init; seen.init = 1;
      if (C.complete && !seen.course) { seen.course = 1; news.push(["course"]); }
      saveSeen(seen);
      if (!quiet && !first && news.length) {
        const last = news[news.length - 1], cheer = CHEERS[Math.floor(Math.random() * CHEERS.length)];
        if (last[0] === "course") toast(`🎓 <b>You finished the whole course!</b> Your certificate is ready.<br><button class="btn sm" id="fmCertGo">Get my certificate →</button>`, true);
        else if (last[0] === "ch") toast(`🏆 <b>Chapter ${last[1]} complete!</b> ${cheer}`, true);
        else toast(`✅ <b>Section ${last[1]} complete!</b> ${cheer}`);
        const go = document.getElementById("fmCertGo"); if (go) go.onclick = () => certificate();
      }
      progUI(C);
    } catch (e) { console.warn("progress", e); }
    progBusy = false;
  }
  function progUI(C) {
    // 1) chapter list: green when done, small x/y otherwise
    document.querySelectorAll("#chapters button.chap:not(.eoc)").forEach((b, i) => { const n = +((b.querySelector("i") || {}).textContent || 0);
      let ci = CHAPTERS.findIndex(c => c.id === "ch" + n); if (ci < 0) ci = i; const p = C.P[ci]; if (!p) return;
      b.classList.toggle("pg-done", p.done); b.classList.toggle("pg-part", !p.done && p.nd > 0);
      let tag = b.querySelector(".pg-tag"); if (!tag) { tag = document.createElement("small"); tag.className = "pg-tag"; b.appendChild(tag); }
      tag.textContent = p.done ? "✓" : p.nd ? `${p.nd}/${p.total}` : ""; });
    // 2) section list (Geometry) and lesson path: green when done
    const cur = C.P[CHAPTERS.indexOf(CH)];
    if (cur) {
      let k = 0; document.querySelectorAll("#secs .sec:not(.cp-sec)").forEach(x => { x.classList.toggle("pg-done", !!cur.secs[k]); k++; });
      const S = chState(CH); document.querySelectorAll("#road .stop:not(.cp-stop)").forEach((x, i) => { const t = CH.topics[i]; if (t) x.classList.toggle("pg-done", topicDone(S, t)); });
    }
    // 3) progress card
    let card = g("fmProg"); const tabs = document.querySelector(".tabs[role=tablist]"); if (!tabs) return;
    if (!card) { card = document.createElement("div"); card.id = "fmProg"; card.className = "fm-prog"; tabs.parentNode.insertBefore(card, tabs); }
    const n = CHAPTERS.indexOf(CH) + 1, pc = cur ? Math.round(100 * cur.nd / cur.total) : 0, pt = Math.round(100 * C.done / C.total);
    const next = !cur ? "" : cur.done ? "Chapter complete! 🎉" : cur.allSecs ? `All sections done — pass the chapter test (${PASS}%+) to finish the chapter.` : `Finish a section: learn each lesson, then get ${NEED} practice problems right.`;
    card.innerHTML = `<div class="pg-row"><span class="pg-lab">Chapter ${n}</span><span class="pg-bar"><i style="width:${pc}%"></i></span><span class="pg-n">${cur ? cur.nd : 0}/${cur ? cur.total : 0} sections</span></div>
      <div class="pg-row"><span class="pg-lab">Course</span><span class="pg-bar c"><i style="width:${pt}%"></i></span><span class="pg-n">${C.done}/${C.total} chapters</span></div>
      <div class="pg-foot"><span>${next}</span>${C.complete ? `<button class="btn sm" id="fmCert">🎓 My certificate</button>` : `<button class="pg-link" id="fmCert">🎓 See the certificate you'll earn</button>`}</div>`;
    g("fmCert").onclick = () => certificate();
  }
  /* ---------- certificate ---------- */
  function certificate() {
    const C = courseProg(), course = ((document.querySelector(".intro .label") || {}).textContent || "").split("·")[0].trim() || "this course";
    const k = (window.fmLv && window.fmLv.getKid && window.fmLv.getKid()) || null;
    let name = ""; try { name = localStorage.getItem("fm-cert-name") || (k && k.nickname) || ""; } catch (e) {}
    const preview = !C.complete, T = C.tier, LV = ["", "Foundation", "Basic", "Standard", "Challenge", "Competition"];
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const old = document.querySelector(".fm-certm"); if (old) old.remove();
    const m = document.createElement("div"); m.className = "fm-certm";
    m.innerHTML = `<div class="fm-certw">
      <div class="fm-certbar">${preview ? `<span class="pg-pv">Preview — finish all ${C.total} chapters (${C.done} done) to earn it.</span>` : ""}
        <label>Name on certificate <input id="fmCertName" value="${esc(name)}" placeholder="Student name"></label>
        <button class="btn sm teal" id="fmCertPdf" ${preview ? "disabled" : ""}>📥 Download PDF</button><button class="btn sm ghost" id="fmCertPrint" ${preview ? "disabled" : ""}>🖨 Print</button><button class="btn sm ghost" id="fmCertX">Close</button></div>
      <div class="fm-cert ${T.k}${preview ? " pv" : ""}" id="fmCertDoc"><div class="fc-in">
        <div class="fc-brand">Fang<span>Math</span></div>
        <div class="fc-k">Certificate of ${T.k === "bronze" ? "Completion" : "Achievement"}</div>
        <div class="fc-medal">${T.medal}</div>
        <div class="fc-small">This certifies that</div>
        <div class="fc-name" id="fmCertN">${esc(name) || "Student Name"}</div>
        <div class="fc-small">has successfully completed</div>
        <div class="fc-course">${esc(course)}</div>
        <div class="fc-tier">${T.name} · ${T.title}</div>
        <div class="fc-stats"><span><b>${C.done}/${C.total}</b> chapters</span><span><b>${C.avg}%</b> average chapter test</span><span><b>${C.solved}</b> problems solved</span>${eocBest() != null ? `<span>End-of-course test <b>${eocBest()}%</b></span>` : ""}${C.level ? `<span>practiced up to <b>Level ${C.level} · ${LV[C.level]}</b></span>` : ""}</div>
        <div class="fc-sign"><div><div class="fc-line">${date}</div><small>Date</small></div><div><div class="fc-line fc-sig">Dr. Yanqin Fang</div><small>FangMath</small></div></div>
        <div class="fc-tiers">🥇 Gold: tests 90%+ &nbsp;·&nbsp; 🥈 Silver: 80%+ &nbsp;·&nbsp; 🥉 Bronze: course completed</div>
        ${preview ? `<div class="fc-wm">PREVIEW</div>` : ""}
      </div></div></div>`;
    document.body.appendChild(m);
    const nm = m.querySelector("#fmCertName");
    nm.oninput = () => { m.querySelector("#fmCertN").textContent = nm.value.trim() || "Student Name"; try { localStorage.setItem("fm-cert-name", nm.value.trim()); } catch (e) {} };
    const close = () => { m.remove(); document.body.classList.remove("cert-printing"); };
    m.querySelector("#fmCertX").onclick = close; m.onclick = e => { if (e.target === m) close(); };
    m.querySelector("#fmCertPrint").onclick = () => { document.body.classList.add("cert-printing"); window.print(); setTimeout(() => document.body.classList.remove("cert-printing"), 600); };
    m.querySelector("#fmCertPdf").onclick = async () => {
      try { await loadH2P(); await html2pdf().set({ margin: 0, filename: `FangMath_Certificate_${course.replace(/\W+/g, "-")}_${(nm.value || "Student").replace(/\W+/g, "-")}.pdf`, image: { type: "jpeg", quality: 0.97 },
        html2canvas: { scale: 2, backgroundColor: "#ffffff", scrollX: 0, scrollY: 0 }, jsPDF: { unit: "in", format: "letter", orientation: "landscape" } }).from(m.querySelector("#fmCertDoc")).save(); }
      catch (e) { alert("Couldn't make the PDF here — use Print and choose Save as PDF."); }
    };
  }
  function progInit() {
    const css = document.createElement("style"); css.textContent = `
.fm-prog{background:#fff;border:1px solid var(--line);border-radius:16px;padding:12px 16px;margin:0 0 14px;box-shadow:var(--shadow);display:flex;flex-direction:column;gap:6px}
.pg-row{display:flex;align-items:center;gap:10px}.pg-lab{width:96px;white-space:nowrap;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--faint)}
.pg-bar{flex:1;height:10px;border-radius:5px;background:var(--line);overflow:hidden}.pg-bar i{display:block;height:100%;background:var(--green);border-radius:5px;transition:width .6s}.pg-bar.c i{background:var(--gold)}
.pg-n{width:110px;text-align:right;font-size:13px;font-weight:600;color:var(--muted)}
.pg-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;font-size:13.5px;color:var(--muted)}
.pg-link{border:0;background:none;color:var(--teal);font:inherit;font-weight:600;cursor:pointer;padding:0}
.chap.pg-done:not(.on){background:var(--green-soft)!important;color:var(--green)!important}.chap.pg-done i{background:var(--green)!important;color:#fff!important}
.chap .pg-tag{margin-left:auto;font-size:11.5px;font-weight:700;color:var(--green);padding-left:6px}.chap.on .pg-tag{color:#cfe9da}
.sec.pg-done{background:var(--green-soft)}.sec.pg-done b{color:var(--green)}.sec.pg-done span{color:var(--green)}
.stop.pg-done{border-color:var(--green)!important;background:var(--green-soft)!important}.stop.pg-done i{background:var(--green)!important;border-color:var(--green)!important;color:#fff!important}
.fm-toast{position:fixed;left:50%;bottom:24px;transform:translate(-50%,30px);opacity:0;z-index:200;background:#16233B;color:#fff;padding:12px 18px;border-radius:14px;box-shadow:0 12px 30px rgba(0,0,0,.25);font-size:15px;max-width:min(560px,92vw);text-align:center;transition:all .35s}
.fm-toast.in{opacity:1;transform:translate(-50%,0)}.fm-toast.big{background:linear-gradient(135deg,#1E7A45,#0F7C7C);font-size:16.5px;padding:16px 22px}.fm-toast .btn{margin-top:8px;background:#fff;color:#0F7C7C}
.fm-certm{position:fixed;inset:0;z-index:150;background:rgba(22,35,59,.6);overflow:auto;padding:20px 12px}
.fm-certw{max-width:1000px;margin:0 auto}
.fm-certbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;background:#fff;border-radius:12px;padding:10px 12px;margin-bottom:10px;font-size:14px}
.fm-certbar label{display:flex;gap:6px;align-items:center;font-weight:600;flex:1;min-width:240px}.fm-certbar input{flex:1;border:1px solid var(--line);border-radius:8px;padding:6px 10px;font:inherit}
.pg-pv{width:100%;color:#8A6415;font-weight:600;font-size:13px}
.fm-cert{position:relative;background:#fff;width:100%;aspect-ratio:11/8.5;padding:3.2%;box-sizing:border-box;font-family:Fraunces,Georgia,serif;color:#16233B;overflow:hidden}
.fm-cert .fc-in{position:relative;height:100%;border:6px double var(--fc);border-radius:6px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.6%;text-align:center;padding:2% 4%;box-sizing:border-box}
.fm-cert.gold{--fc:#C9962B}.fm-cert.silver{--fc:#8C93A0}.fm-cert.bronze{--fc:#B0703A}
.fc-brand{font-family:Inter,sans-serif;font-weight:700;font-size:clamp(14px,2vw,20px)}.fc-brand span{color:#0F7C7C}
.fc-k{font-size:clamp(22px,4vw,42px);font-weight:700;color:var(--fc);letter-spacing:.02em}
.fc-medal{font-size:clamp(30px,5vw,54px);line-height:1.1}
.fc-small{font-family:Inter,sans-serif;font-size:clamp(11px,1.4vw,15px);color:#5B6474}
.fc-name{font-size:clamp(26px,4.6vw,50px);font-style:italic;border-bottom:2px solid var(--fc);padding:0 4% 1%;min-width:50%}
.fc-course{font-size:clamp(18px,3vw,32px);font-weight:700}
.fc-tier{font-family:Inter,sans-serif;font-weight:700;color:#fff;background:var(--fc);border-radius:999px;padding:.5% 2.4%;font-size:clamp(11px,1.5vw,16px)}
.fc-stats{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 18px;font-family:Inter,sans-serif;font-size:clamp(10px,1.3vw,14px);color:#5B6474;margin-top:.6%}
.fc-sign{display:flex;justify-content:space-around;width:80%;margin-top:2%;font-family:Inter,sans-serif}.fc-sign small{color:#8C93A0;font-size:clamp(9px,1.1vw,12px)}
.fc-line{border-bottom:1px solid #16233B;min-width:180px;padding-bottom:2px;font-size:clamp(11px,1.4vw,15px)}.fc-sig{font-family:"Brush Script MT","Segoe Script",cursive;font-size:clamp(16px,2.2vw,24px)}
.fc-tiers{position:absolute;bottom:2.5%;font-family:Inter,sans-serif;font-size:clamp(8px,1vw,11px);color:#8C93A0}
.fc-wm{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-18deg);font-family:Inter,sans-serif;font-weight:800;font-size:clamp(50px,11vw,130px);color:rgba(179,38,30,.10);pointer-events:none}
@media print{body.cert-printing > *:not(.fm-certm){display:none!important}body.cert-printing .fm-certm{position:static;background:none;padding:0}body.cert-printing .fm-certbar{display:none}.fm-certm{page:cert}}@page cert{size:letter landscape;margin:0;@bottom-right{content:none}@bottom-left{content:none}}`;
    document.head.appendChild(css);
    const wrap = (name, after) => { const o = window[name]; if (typeof o !== "function") return; window[name] = function () { const r = o.apply(this, arguments); try { after(); } catch (e) {} return r; }; };
    wrap("chapters", () => setTimeout(() => progRefresh(true), 0));
    wrap("road", () => setTimeout(() => progRefresh(), 0));
    wrap("finish", () => setTimeout(() => progRefresh(), 0));
    wrap("secList", () => setTimeout(() => progRefresh(true), 0));
    progRefresh(true);
  }

  /* ================= END-OF-COURSE TEST =================
     Covers every chapter of the course (questions taken in turn from each chapter), timed, graded with a
     chapter-by-chapter report. Opens from the bottom of the chapter list, the course page and the Worksheets page. */
  const eocN = () => Math.max(20, Math.min(30, CHAPTERS.length * 2 + 4));
  const eocOpts = d => Object.assign({}, opt || {}, { ch: CH.id, scope: "course", diff: d || "standard", n: eocN(), cp: "eoc" });
  const eocBest = () => { const H = hist().filter(r => r.cp === "eoc"); return H.length ? Math.max(...H.map(r => r.pct)) : null; };
  function eocPaper(d) { const save = opt; opt = eocOpts(d); paper("test"); opt = save; }
  function eocHome(d) {
    setTab("quiz"); if (run && run.live) return;          // an unfinished test is already on screen
    let diff = d || "standard";
    const C = courseProg(), b = eocBest(), course = ((document.querySelector(".intro .label") || {}).textContent || "").split("·")[0].trim();
    const est = () => { const o = eocOpts(diff), lv = levelList(DIFF[diff].mix, o.n); return Math.max(5, Math.ceil(lv.reduce((a, l) => a + MIN_PER_LEVEL[l - 1], 0) / 5) * 5); };
    const draw = () => {
      view.innerHTML = `<div class="card qt-eoc">
        <span class="label" style="color:var(--navy)">${esc(course)} · all ${CHAPTERS.length} chapters</span>
        <h2>🏁 End-of-Course Test</h2>
        <p>One big test over the whole course — questions from every chapter, easy to hard. Timed, no hints, graded at the end with a chapter-by-chapter report so you can see what to review.</p>
        <div class="eoc-facts"><span><b>${eocN()}</b> questions</span><span><b>${est()}</b> minutes</span><span><b>${C.done}/${C.total}</b> chapters finished</span>${b != null ? `<span>best so far <b>${b}%</b></span>` : ""}</div>
        <div class="eoc-diff" role="group" aria-label="Difficulty">${Object.entries(DIFF).map(([k, x]) => `<button type="button" data-d="${k}" class="${k === diff ? "on" : ""}"><b>${x.name}</b><small>${x.sub}</small></button>`).join("")}</div>
        ${C.done < C.total ? `<p class="qt-faint">Tip: it's best taken after you finish every chapter — but you can try it any time.</p>` : ""}
        <div class="qt-acts"><button class="btn" id="eocGo">Start the test →</button><button class="btn ghost" id="eocP">📄 Paper test + answer key</button><button class="btn ghost" id="eocX">Back to the lessons</button></div></div>`;
      view.querySelectorAll("[data-d]").forEach(x => x.onclick = () => { diff = x.dataset.d; draw(); });
      g("eocGo").onclick = () => { opt = eocOpts(diff); start("test"); };
      g("eocP").onclick = () => eocPaper(diff);
      g("eocX").onclick = () => { home(); setTab("learn"); };
    };
    draw(); try { history.replaceState(null, "", "#eoc"); } catch (e) {}
    view.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function eocHooks() {
    const add = () => { const b = g("chapters"); if (!b || b.querySelector(".eoc")) return;
      const x = document.createElement("button"); x.type = "button"; x.className = "chap eoc"; const bb = eocBest();
      x.innerHTML = `<i>🏁</i>End-of-Course Test${bb != null ? ` <small class="pg-tag" style="color:inherit">${bb}%</small>` : ""}`; x.onclick = () => eocHome(); b.appendChild(x); };
    const o = window.chapters; if (typeof o === "function") window.chapters = function () { const r = o.apply(this, arguments); try { add(); } catch (e) {} return r; };
    add();
    const css = document.createElement("style"); css.textContent = `
.chap.eoc{margin-top:8px;border:1.5px solid var(--navy)!important;color:var(--navy)!important;font-weight:700}.chap.eoc i{background:var(--gold-soft)!important}
.chap.eoc:hover{background:var(--navy)!important;color:#fff!important}
.qt-eoc h2{margin:6px 0 8px}.qt-eoc p{max-width:680px}
.eoc-facts{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.eoc-facts span{background:var(--bg);border:1px solid var(--line);border-radius:999px;padding:5px 12px;font-size:14px}
.eoc-diff{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 12px}.eoc-diff button{display:flex;flex-direction:column;align-items:flex-start;border:1.5px solid var(--line);background:#fff;border-radius:12px;padding:8px 14px;cursor:pointer;font:inherit;color:var(--ink)}
.eoc-diff button small{color:var(--muted);font-size:12px}.eoc-diff button.on{border-color:var(--navy);background:var(--navy);color:#fff}.eoc-diff button.on small{color:#cfd8e6}`;
    document.head.appendChild(css);
  }
  /* ================= LESSON VIDEOS (links live in practice/videos.js) ================= */
  const VKEY = () => "fm-vid-" + PG;
  const vSeen = () => { try { return JSON.parse(localStorage.getItem(VKEY()) || "{}"); } catch (e) { return {}; } };
  function ytId(u) { u = String(u || "").trim(); const m = /(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/.exec(u) || /^([\w-]{11})$/.exec(u); return m ? m[1] : null; }
  function vidMap() { const V = window.FM_VIDEOS || {}; return V[PG.replace(/-levels$/, "")] || V[PG] || {}; }
  function vidFor(i) {
    const V = vidMap(), t = CH.topics[i]; if (!t) return null;
    const G = secGroups().find(x => x.idx.includes(i)); const no = G ? G.no : chNum(CH) + "." + (i + 1);
    const keys = [t.id, no, chNum(CH) + "." + (i + 1)];
    for (const k of keys) if (V[k]) return { k: String(k), url: V[k], no, title: G ? G.label : t.title, first: !G || G.idx[0] === i };
    return null;
  }
  function vidDraw() {
    const road = g("road"); if (!road || !CH) return;
    let box = g("fmVideo");
    const v = typeof LI === "number" ? vidFor(LI) : null, cv = vidMap()["ch" + chNum(CH)];
    const id = v && ytId(v.url), cid = !v && LI === 0 && cv ? ytId(cv) : null;   // chapter review video shows on lesson 1 when it has none
    if (!id && !cid) { if (box) box.remove(); return; }
    const key = id ? CH.id + ":" + v.k : CH.id + ":ch", seen = vSeen();
    if (!box) { box = document.createElement("div"); box.id = "fmVideo"; box.className = "card fm-video"; }
    road.after(box);
    if (box.dataset.key === key) return;
    box.dataset.key = key;
    const title = id ? `${esc(v.no)} · ${esc(v.title.replace(/^\d+\.\d+\s*/, ""))}` : `Chapter ${chNum(CH)} review`;
    box.innerHTML = `<div class="fv-head"><span class="label" style="color:var(--teal)">▶ Video lesson</span><b>${title}</b>
        <button class="btn sm ${seen[key] ? "" : "ghost"}" id="fvSeen">${seen[key] ? "✓ Watched" : "Mark as watched"}</button><button class="btn sm ghost" id="fvHide" aria-expanded="true">Hide video</button></div>
      <div class="fv-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id || cid}?rel=0&modestbranding=1" title="${title.replace(/"/g, "")}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>
      <p class="fv-tip">Watch first — pause when you see <b>“Your turn”</b> and try it yourself. Then do the steps below.</p>`;
    g("fvSeen").onclick = () => { const s2 = vSeen(); s2[key] = s2[key] ? 0 : 1; try { localStorage.setItem(VKEY(), JSON.stringify(s2)); } catch (e) {}
      g("fvSeen").textContent = s2[key] ? "✓ Watched" : "Mark as watched"; g("fvSeen").classList.toggle("ghost", !s2[key]); };
    g("fvHide").onclick = () => { const f = box.querySelector(".fv-frame"), t2 = box.querySelector(".fv-tip"), hid = !f.hidden; f.hidden = t2.hidden = hid; g("fvHide").textContent = hid ? "Show video" : "Hide video"; };
  }
  function vidInit() {
    const css = document.createElement("style"); css.textContent = `
.fm-video{margin:0 0 14px;padding:14px 16px}.fv-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px}.fv-head b{flex:1;min-width:180px;font-size:16px}
.fv-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#000}.fv-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.fv-tip{margin:8px 0 0;font-size:13.5px;color:var(--muted)}`; document.head.appendChild(css);
    const go = () => { const o = window.openLesson; if (typeof o === "function") window.openLesson = function () { const r = o.apply(this, arguments); try { vidDraw(); } catch (e) {} return r; };
      const oc = window.openChapter; if (typeof oc === "function") window.openChapter = function () { const r = oc.apply(this, arguments); try { vidDraw(); } catch (e) {} return r; };
      try { vidDraw(); } catch (e) {} };
    if (window.FM_VIDEOS) return go();
    const sc = document.createElement("script"); sc.src = "videos.js?v=" + Math.floor(Date.now() / 3.6e6); sc.onload = go; sc.onerror = go; document.head.appendChild(sc);
  }
  /* ================= GEOMETRY LAYOUT FOR EVERY COURSE =================
     Pages that don't have it yet (no sections()) get: numbered lessons (1.1, 1.2, …), the sections of the open
     chapter listed under it in the sidebar (with the quiz and chapter test), and a clean Practice tab that shows
     only the section you are on. Geometry and Precalculus already work this way. */
  function fmtInit() {
    if (typeof window.sections === "function" || !g("chapters")) return;
    const chNo = c => { try { if (typeof ALLCH !== "undefined") { const a = ALLCH.find(x => x[2] === c.id), n = a && parseInt(String(a[0]), 10); if (n) return n; } } catch (e) {} return CHAPTERS.indexOf(c) + 1; };
    CHAPTERS.forEach(c => { const n = chNo(c); c.topics.forEach((t, i) => { if (!/^\d+\.\d+\s/.test(t.title)) t.title = `${n}.${i + 1} ${t.title}`; }); });
    window.sections = function () {
      const out = []; CH.topics.forEach((t, i) => { const m = /^(\d+\.\d+)\s+(.*)$/.exec(t.title) || [0, chNo(CH) + "." + (i + 1), t.title];
        let G = out.find(x => x.no === m[1]); if (!G) { G = { no: m[1], name: m[2], idx: [] }; out.push(G); } G.idx.push(i); });
      return out;
    };
    const part = t => t.title.replace(/^\d+\.\d+\s+/, "");
    window.secList = function () {
      const box = g("secs"); if (!box || !CH) return; box.innerHTML = "";
      sections().forEach(G => { const x = document.createElement("button"); x.type = "button";
        const on = G.idx.includes(LI), done = G.idx.every(i => st && st.learned[CH.topics[i].id]);
        x.className = "sec" + (on ? " on" : "") + (done ? " done" : ""); x.innerHTML = `<b>${done ? "✓" : G.no}</b><span>${esc(G.name)}</span>`;
        x.onclick = () => { if (!g("practiceView").hidden) { LI = G.idx[0]; if (g("practice")) g("practice").hidden = true; road(); topics(); g("topics").scrollIntoView({ behavior: "smooth", block: "start" }); return; }
          setTab("learn"); openLesson(G.idx[0], true); };
        box.appendChild(x); });
    };
    const oCh = window.chapters;
    window.chapters = function () { const r = oCh.apply(this, arguments); try {
        const b = g("chapters"), on = b && b.querySelector(".chap.on");
        if (on && !g("secs")) { const s2 = document.createElement("div"); s2.className = "secs"; s2.id = "secs"; on.after(s2); }
        secList(); } catch (e) { console.warn("fmt chapters", e); } return r; };
    const oRoad = window.road;
    window.road = function () { const r = oRoad.apply(this, arguments); try {
        const box = g("road"), G = sections().find(x => x.idx.includes(LI));
        if (box) { box.classList.toggle("single", !G || G.idx.length < 2);
          [...box.querySelectorAll(".stop:not(.cp-stop)")].forEach((b, i) => b.classList.toggle("other", !!G && !G.idx.includes(i))); }
        secList(); } catch (e) { console.warn("fmt road", e); } return r; };
    window.topics = function () {
      const box = g("topics"); if (!box) return; box.innerHTML = ""; legend(); const lvl = curLv();
      const SG = sections(), G = SG.find(x => x.idx.includes(LI)) || SG[0];
      const c = document.createElement("div"); c.className = "card psec";
      c.innerHTML = `<span class="label">Practice · Level ${lvl} ${LEVELS[lvl - 1].name}</span><h2>${esc(G.no + " " + G.name)}</h2>`;
      G.idx.map(i => CH.topics[i]).forEach(t => { const n = st.solved[t.id + lvl] || 0, on = T === t && g("practice") && !g("practice").hidden;
        const r = document.createElement("div"); r.className = "prow" + (on ? " on" : "");
        r.innerHTML = `<span class="pt">${G.idx.length > 1 ? esc(part(t)) : "5 levels · new problems every time"}</span><small>${n ? `✓ ${n} solved` : ""}</small>`;
        const go = document.createElement("button"); go.className = "btn teal sm"; go.textContent = on ? "Practicing ↓" : "Practice →"; go.onclick = () => startPractice(t, lvl); r.appendChild(go); c.appendChild(r); });
      box.appendChild(c); render(box);
    };
    const oOpen = window.openLesson;
    window.openLesson = function (i) { const r = oOpen.apply(this, arguments); try { if (g("topics") && st) { const G = sections().find(x => x.idx.includes(i));
        if (T && G && !G.idx.includes(CH.topics.indexOf(T)) && g("practice")) g("practice").hidden = true; topics(); } } catch (e) {} return r; };
    const css = document.createElement("style"); css.textContent = `
.psec{display:flex;flex-direction:column;gap:8px;grid-column:1/-1}.psec h2{font-size:22px;margin:0 0 4px}
.prow{display:flex;align-items:center;gap:12px;padding:10px 12px;border:1px solid var(--line);border-radius:12px;background:var(--bg)}
.prow.on{border-color:var(--teal);background:var(--teal-soft)}.prow .pt{flex:1;font-weight:600}.prow small{color:var(--green);font-size:13px;font-weight:600}
.secs{display:flex;flex-direction:column;gap:1px;margin:2px 0 8px 18px;padding-left:10px;border-left:2px solid var(--line)}
.sec{display:flex;gap:7px;align-items:flex-start;border:0;background:transparent;text-align:left;font:inherit;font-size:13px;line-height:1.3;color:var(--muted,#555);padding:6px 8px;border-radius:8px;cursor:pointer}
.sec b{font-weight:700;color:var(--faint);min-width:24px;font-size:12px;padding-top:1px}.sec:hover{background:var(--bg)}
.sec.on{background:var(--teal-soft);color:var(--ink);font-weight:600}.sec.on b{color:var(--teal)}.sec.done b{color:var(--green)}
@media (min-width:720px){.road .stop.other{display:none}.road.single{display:none}}
@media (max-width:719.98px){.secs{display:none}}`;
    document.head.appendChild(css);
    try { chapters(); road(); if (typeof drawLesson === "function") drawLesson(); if (g("topics") && st) topics(); } catch (e) { console.warn("fmt redraw", e); }
  }
  /* ================= ONE PART AT A TIME (like Geometry 1.1) =================
     A lesson's Learn page can have several cards: the chapter's words, the postulates box, the story and the
     lesson itself. Show one at a time, with numbered steps on top and "Next →" at the bottom. */
  const PARTS = { fmVideo: "Video", words: "Words to know", postbox: "Postulates", story: "Story", lesson: "Learn it" };
  const partAt = {};
  function partsDraw() {
    const lv = g("learnView"); if (!lv || !CH) return;
    const all = ["fmVideo", "words", "postbox", "story", "lesson"].map(id => g(id)).filter(e => e && lv.contains(e));
    all.forEach(e => e.classList.remove("fm-off"));
    let parts = all.filter(e => !e.hidden && getComputedStyle(e).display !== "none" && e.innerHTML.trim());
    let bar = g("fmParts"), nav = g("fmPartsNav");
    if (parts.length < 2) { if (bar) bar.remove(); if (nav) nav.remove(); return; }
    // the chapter's words come first on the chapter's first lesson, last (for review) on the others
    const w = parts.find(e => e.id === "words");
    if (w && LI !== 0) parts = parts.filter(e => e !== w).concat(w);
    if (parts.length < 2) { if (bar) bar.remove(); if (nav) nav.remove(); parts.forEach(e => e.classList.remove("fm-off")); return; }
    const key = CH.id + ":" + LI; let k = Math.min(partAt[key] || 0, parts.length - 1);
    if (!bar) { bar = document.createElement("div"); bar.id = "fmParts"; bar.className = "fm-parts"; }
    parts[0].before(bar);
    bar.innerHTML = parts.map((e, i) => `<button type="button" class="fp-pill${i === k ? " on" : ""}${i < k ? " seen" : ""}" data-i="${i}"><i>${i < k ? "✓" : i + 1}</i>${PARTS[e.id]}</button>`).join("");
    parts.forEach((e, i) => e.classList.toggle("fm-off", i !== k));
    if (parts[k].tagName === "DETAILS") parts[k].open = true;
    if (!nav) { nav = document.createElement("div"); nav.id = "fmPartsNav"; nav.className = "fm-parts-nav"; }
    parts[k].after(nav);
    const nxt = parts[k + 1];
    nav.innerHTML = `${k > 0 ? `<button type="button" class="btn ghost sm" data-go="${k - 1}">← Back</button>` : "<span></span>"}<span class="fp-n">${k + 1} of ${parts.length}</span>${nxt ? `<button type="button" class="btn sm" data-go="${k + 1}">Next: ${PARTS[nxt.id]} →</button>` : "<span></span>"}`;
    const go = i => { partAt[key] = i; partsDraw(); bar.scrollIntoView({ behavior: "smooth", block: "start" }); };
    bar.querySelectorAll("[data-i]").forEach(b => b.onclick = () => go(+b.dataset.i));
    nav.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(+b.dataset.go));
  }
  function partsInit() {
    if (!/^geometry/.test(PG)) return;
    const css = document.createElement("style"); css.textContent = `
.fm-off{display:none!important}
.fm-parts{display:flex;flex-wrap:wrap;gap:8px;background:#fff;border:1px solid var(--line);border-radius:16px;padding:10px 12px;margin:0 0 -6px;box-shadow:var(--shadow)}
.fp-pill{display:flex;align-items:center;gap:8px;border:1.5px solid var(--line);background:var(--surface,#fff);border-radius:999px;padding:5px 14px 5px 5px;font:inherit;font-size:14px;font-weight:600;color:var(--ink);cursor:pointer}
.fp-pill i{font-style:normal;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:var(--bg);font-size:12px}
.fp-pill.on{border-color:var(--navy);background:var(--soft,#EEF3F8)}.fp-pill.on i{background:var(--navy);color:#fff}
.fp-pill.seen i{background:var(--green);color:#fff}
.fm-parts-nav{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:4px 2px 0}
.fm-parts-nav .fp-n{color:var(--faint);font-size:13px}
.fm-parts-nav .btn:not(.ghost){background:var(--navy)}`;
    document.head.appendChild(css);
    const later = () => setTimeout(() => { try { partsDraw(); } catch (e) { console.warn("parts", e); } }, 30);
    const o = window.openLesson; if (typeof o === "function") window.openLesson = function () { const r = o.apply(this, arguments); later(); return r; };
    const oc = window.openChapter; if (typeof oc === "function") window.openChapter = function () { const r = oc.apply(this, arguments); later(); return r; };
    const ot = window.setTab; window.setTab = function (t) { const r = ot.apply(this, arguments); if (t === "learn") later(); return r; };
    later();
  }
  window.fmQuizState = () => run;
  window.fmEOC = d => eocHome(d);
  window.fmCertificate = () => certificate();      // for checking in the browser console
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready); else ready();
})();

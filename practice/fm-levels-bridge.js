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
    "calculus-ab-levels": ["calcab", "AP Calculus AB"], "grade3-levels": ["grade3", "Grade 3"], "grade4-levels": ["grade4", "Grade 4"], "calculus-bc-levels": ["calcbc", "AP Calculus BC"],
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
        const { error } = await c.rpc("fm_kid_record", { p_token: k.token, p_kind: "practice", p_item: s.item, p_title: s.title,
          p_score: s.right, p_total: s.n, p_detail: { firstTry: s.first, missed: s.missed, level: s.level }, p_seconds: s.sec });
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

  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") close(); });
  window.addEventListener("pagehide", close);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", hook); else hook();
})();

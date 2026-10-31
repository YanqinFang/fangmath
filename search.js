/* =====================================================================
   PROF. FANG MATH — SITE SEARCH  (#/search/<words>)
   Finds courses, chapters, lessons (every topic on every Learn & Practice
   page), flashcard decks, games and the main pages. Lesson topics are read
   straight from the practice/*-levels.html pages the first time someone
   searches, so new sections show up automatically — nothing to update here.
   Press  /  anywhere on the site to search.
   ===================================================================== */
(function () {
  const strip = s => String(s || "").replace(/<[^>]+>/g, " ").replace(/\\(dfrac|frac|text|mathrm|operatorname|left|right|quad|qquad|displaystyle)\b/g, " ")
    .replace(/\\[a-zA-Z]+/g, " ").replace(/[${}\\^_]/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();
  const norm = s => strip(s).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[–—’']/g, " ");
  const unq = s => s.replace(/\\\\/g, "\u0000").replace(/\\"/g, '"').replace(/\\n/g, " ").replace(/\u0000/g, "\\");

  const C = () => typeof COURSES !== "undefined" ? COURSES : [], D = () => typeof DECKS !== "undefined" ? DECKS : [];
  /* ---------- the index ---------- */
  let BASE = null, TOPICS = null, loading = null;
  function base() {
    if (BASE) return BASE;
    const I = [], add = (kind, t, sub, href, extra) => I.push(Object.assign({ kind, t, sub, href, txt: norm([t, sub, extra && extra.kw].join(" ")) }, extra || {}));
    [["Grades 3–8", "#/k8", "elementary middle school"], ["High School", "#/highschool", "algebra geometry precalculus calculus"], ["Competition Math", "#/competition", "amc mathcounts aime olympiad"],
     ["Weekly Challenge", "#/challenge", "problem of the week"], ["SAT / ACT practice", "#/testprep", "sat act test prep"], ["Worksheets, Quizzes & Tests", "#/worksheets", "worksheet quiz test answer key printable pdf"],
     ["Practice Calendar", "#/calendar", "daily practice calendar"], ["Mistake Log", "#/mistakes", "mistakes review spaced"], ["Flashcards", "#/flashcards", "flash cards vocabulary"],
     ["Games", "#/games", "games"], ["Math Facts game", "#/games/facts", "times tables multiplication facts speed"], ["Solve for x game", "#/games/solve", "equations game"],
     ["Solve a homework problem step by step", "#/solve", "homework solver steps hints stuck"], ["Step-by-Step Tutor", "practice/tutor.html", "equations guided tutor"]]
      .forEach(([t, h, kw]) => add("page", t, "Page", h, { kw }));
    C().forEach(c => {
      add("course", c.title, (c.blurb || "").slice(0, 120), "#/course/" + c.id, { kw: c.group });
      c.units.forEach((u, ui) => (u.lessons || []).forEach((l, li) => add("lesson", l.title, c.title + " · " + u.title, `#/lesson/${c.id}/${ui}/${li}`)));
    });
    D().forEach(d => add("deck", d.title, "Flashcards · " + d.course, "#/flashcards/" + d.id, { kw: d.cards.map(x => x[0]).join(" ") }));
    return BASE = I;
  }
  function levelPages() {                          // page → course title
    const m = new Map();
    C().forEach(c => { if (c.levels && !m.has(c.levels)) m.set(c.levels, c.title); });
    C().forEach(c => c.units.forEach(u => (u.learn || []).forEach(l => { if (!m.has(l.href)) m.set(l.href, c.title); })));
    return m;
  }
  function topics() {
    if (TOPICS) return Promise.resolve(TOPICS);
    if (loading) return loading;
    const pages = [...levelPages()];
    loading = Promise.all(pages.map(([href, course]) => fetch(href).then(r => r.ok ? r.text() : "").catch(() => "").then(src => {
      const out = []; let ch = null;
      src.split("\n").forEach(line => {
        let m = /^\{id:"(ch\d+)",title:"((?:[^"\\]|\\.)*)"/.exec(line);
        if (m) { ch = { id: m[1], n: +m[1].slice(2), t: unq(m[2]) };
          out.push({ kind: "chapter", t: `Chapter ${ch.n}: ${ch.t}`, sub: course, href: `${href}#${ch.id}-learn`, page: href, ch: ch.id, txt: norm(course + " chapter " + ch.n + " " + ch.t) }); return; }
        m = /^ ?\{id:"([A-Za-z0-9_]+)",title:"((?:[^"\\]|\\.)*)",idea:"((?:[^"\\]|\\.)*)"/.exec(line);
        if (m && ch) { const t = unq(m[2]), idea = unq(m[3]);
          out.push({ kind: "topic", t, sub: `${course} · Ch ${ch.n} ${ch.t}`, idea, href: `${href}#${ch.id}-learn-${m[1]}`, page: href, ch: ch.id, tid: m[1],
            txt: norm([t, course, "chapter " + ch.n, ch.t, idea].join(" ")), tt: norm(t) }); }
      });
      return out;
    }))).then(a => (TOPICS = a.flat()));
    return loading;
  }

  /* ---------- ranking ---------- */
  const W = { page: 2, course: 4, chapter: 3, topic: 3, lesson: 2, deck: 1 };
  function rank(items, q) {
    const words = norm(q).split(/\s+/).filter(Boolean); if (!words.length) return [];
    const res = [];
    items.forEach(it => {
      const title = it.tt || norm(it.t); let s = 0;
      for (const w of words) {
        const re = new RegExp("(^|\\s)" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
        if (re.test(title)) s += title.startsWith(w) ? 12 : 9;
        else if (title.includes(w)) s += 5;
        else if (re.test(it.txt)) s += 3;
        else if (it.txt.includes(w)) s += 1;
        else return;                                  // every word must appear somewhere
      }
      res.push([s * 10 + W[it.kind], it]);
    });
    return res.sort((a, b) => b[0] - a[0]).map(x => x[1]);
  }

  /* ---------- the page ---------- */
  const ICON = { page: "🧭", course: "📚", chapter: "📘", topic: "💡", lesson: "📄", deck: "🃏" };
  const KIND = { page: "Page", course: "Course", chapter: "Chapter", topic: "Lesson", lesson: "Notes & worksheet", deck: "Flashcards" };
  window.pageSearch = function (v, q0) {
    q0 = q0 || "";
    const inp = h("input", { type: "search", id: "srchQ", placeholder: "Search lessons, topics, courses… (try “midpoint” or “fractions”)", "aria-label": "Search the site", autocomplete: "off", value: q0 });
    const tabs = h("div", { class: "srch-tabs" }), list = h("div", { class: "srch-list", role: "list" }), note = h("p", { class: "muted srch-note" });
    v.append(h("div", { class: "wrap" },
      h("div", { class: "page-head" }, h("h1", {}, "Search"), h("p", {}, "Every lesson in every course, plus worksheets, quizzes, tests, flashcards and games.")),
      h("div", { class: "srch-box" }, h("span", { "aria-hidden": "true" }, "🔍"), inp), tabs, note, list));
    let filter = "all", timer = null, sel = -1, shown = [];
    const draw = () => {
      const q = inp.value.trim();
      try { history.replaceState(null, "", "#/search" + (q ? "/" + encodeURIComponent(q) : "")); } catch (e) {}
      if (!q) { tabs.replaceChildren(); list.replaceChildren(); note.textContent = "Type a word or two. Press / anywhere on the site to come here."; return; }
      const all = rank(base().concat(TOPICS || []), q), courses = [...new Set(all.map(r => r.kind === "topic" || r.kind === "chapter" ? r.sub.split(" · ")[0] : null).filter(Boolean))];
      if (filter !== "all" && !courses.includes(filter)) filter = "all";
      tabs.replaceChildren(...(courses.length > 1 ? ["all", ...courses] : []).map(c => h("button", { type: "button", class: c === filter ? "on" : "", onclick: () => { filter = c; draw(); } }, c === "all" ? "All" : c)));
      shown = all.filter(r => filter === "all" || r.sub.split(" · ")[0] === filter).slice(0, 60); sel = -1;
      note.textContent = !TOPICS ? "Loading every lesson…" : shown.length ? `${all.length} result${all.length === 1 ? "" : "s"}` + (all.length > 60 && filter === "all" ? " — showing the best 60" : "") : "Nothing found. Try fewer words, or a different word (for example “slope” instead of “steepness”).";
      list.replaceChildren(...shown.map(row));
      renderMath(list);
    };
    const row = it => {
      const isT = it.kind === "topic" || it.kind === "chapter";
      return h("div", { class: "srch-row", role: "listitem" },
        h("a", { class: "srch-main", href: it.href },
          h("span", { class: "srch-ic", "aria-hidden": "true" }, ICON[it.kind]),
          h("span", { class: "srch-txt" }, h("b", { html: esc(it.t) }), h("small", {}, KIND[it.kind] + " · " + it.sub),
            it.idea ? h("span", { class: "srch-idea", html: it.idea }) : null)),
        isT ? h("span", { class: "srch-btns" },
          h("a", { class: "btn sm teal", href: it.href }, "Learn"),
          h("a", { class: "btn sm ghost", href: it.kind === "topic" ? `${it.page}#${it.ch}-practice-${it.tid}` : `${it.page}#${it.ch}-practice` }, "Practice"),
          h("a", { class: "btn sm ghost", href: `${it.page}#${it.ch}-ws` }, "Worksheet")) : null);
    };
    inp.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(draw, 120); });
    inp.addEventListener("keydown", e => {
      const rows = list.querySelectorAll(".srch-main");
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); if (!rows.length) return; sel = Math.max(0, Math.min(rows.length - 1, sel + (e.key === "ArrowDown" ? 1 : -1))); rows.forEach((r, i) => r.classList.toggle("kb", i === sel)); rows[sel].scrollIntoView({ block: "nearest" }); }
      else if (e.key === "Enter") { const r = rows[sel < 0 ? 0 : sel]; if (r) r.click(); }
    });
    draw(); inp.focus(); if (q0) inp.setSelectionRange(q0.length, q0.length);
    topics().then(() => { if (document.body.contains(inp)) draw(); });
  };

  /* ---------- header button + the / shortcut ---------- */
  function wire() {
    const btn = document.getElementById("searchBtn");
    if (btn) btn.onclick = () => { location.hash = "#/search"; };
    document.addEventListener("keydown", e => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target; if (t && (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName))) return;
      e.preventDefault(); if (location.hash.startsWith("#/search")) { const i = document.getElementById("srchQ"); if (i) i.focus(); } else location.hash = "#/search";
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire); else wire();
})();

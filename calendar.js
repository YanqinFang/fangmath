/* =====================================================================
   PROF. FANG MATH — ONLINE PRACTICE CALENDAR  (#/calendar/<course-id>)
   Students pick a course, a start date and their practice days; the page
   dates every practice day, shows "today", the finish date, and lets them
   check off finished days (saved in their own browser).
   Course content lives in calendars.json (built from the PDF calendars).
   ===================================================================== */
(function () {
  const BREAKS = [["2027-11-22", "2027-11-26", "Thanksgiving Break"], ["2027-12-20", "2027-12-31", "Winter Break"], ["2028-03-27", "2028-03-31", "Spring Break"]];
  const HOLIDAYS = { "2027-09-06": "Labor Day", "2027-11-11": "Veterans Day", "2028-01-17": "MLK Jr. Day", "2028-02-21": "Presidents' Day" };
  const DEFAULT_START = "2027-08-16";
  const COLORS = { fmkey: "#0096C7", fmwatch: "#2BB673", fmturn: "#F4A100", fmnotice: "#9B5DE5", fmred: "#EF476F", fmtitle: "#3D2C8D" };
  const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let DATA = null, loading = null;

  /* ---------- dates (local, no time zones) ---------- */
  const parse = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const fmt = (d, year) => WD[d.getDay()] + ", " + MON[d.getMonth()] + " " + d.getDate() + (year ? ", " + d.getFullYear() : "");
  const today = () => { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); };
  const inBreak = s => BREAKS.find(([a, b]) => s >= a && s <= b);

  /* Dates for n practice sessions starting at `from`, on the chosen weekdays. */
  function schedule(from, n, days, skip) {
    const out = []; let d = parse(from), guard = 0;
    while (out.length < n && guard++ < 4000) {
      const s = iso(d);
      if (days.includes(d.getDay()) && !(skip && inBreak(s))) out.push(s);
      d = addDays(d, 1);
    }
    return out;
  }

  /* ---------- saved settings & progress (per student browser) ---------- */
  const key = id => "fmcal:" + id;
  function load(id) {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(key(id)) || "null"); } catch (e) {}
    s = s || {};
    return { start: s.start || DEFAULT_START, days: Array.isArray(s.days) && s.days.length ? s.days : [1, 2, 3, 4, 5], skip: s.skip !== false, done: new Set(s.done || []) };
  }
  function save(id, st) {
    try { localStorage.setItem(key(id), JSON.stringify({ start: st.start, days: st.days, skip: st.skip, done: [...st.done] })); localStorage.setItem("fmcal:last", id); } catch (e) {}
  }

  /* ---------- math ---------- */
  function typeset(root) {
    if (!window.katex) { setTimeout(() => typeset(root), 200); return; }
    root.querySelectorAll(".m:not([data-k])").forEach(el => {
      el.setAttribute("data-k", "1");
      try { katex.render(el.textContent, el, { throwOnError: false }); } catch (e) {}
    });
  }
  const rich = (tag, html, attrs) => h(tag, Object.assign({ html }, attrs || {}));

  /* ---------- page ---------- */
  window.pageCalendar = function (v, id) {
    const wrap = h("div", { class: "wrap" },
      h("div", { class: "page-head" }, h("h1", {}, "Online Practice Calendar"),
        h("p", {}, "Pick a course, a start date and your practice days. Every practice day gets a date, school breaks are skipped, and you can check off each day as you finish it. Your progress is saved in this browser.")));
    const body = h("div", {}, h("p", { class: "muted" }, "Loading calendars…"));
    wrap.append(body); v.append(wrap);
    if (!DATA) {
      loading = loading || fetch("calendars.json", { cache: "no-cache" }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
      loading.then(d => { DATA = d; if (body.isConnected) build(body, id); })
        .catch(() => { loading = null; body.replaceChildren(h("p", { class: "muted" }, "The calendars could not load. Please refresh the page.")); });
    } else build(body, id);
  };

  function build(body, id) {
    let last = null; try { last = localStorage.getItem("fmcal:last"); } catch (e) {}
    if (!DATA[id]) id = DATA[last] ? last : "grade5";
    if (location.hash !== "#/calendar/" + id) history.replaceState(null, "", "#/calendar/" + id);
    const C = DATA[id], st = load(id);
    const sessions = [];
    C.weeks.forEach((w, wi) => w.days.forEach((d, di) => sessions.push({ w, wi, d, i: sessions.length })));
    const N = sessions.length;

    /* controls */
    const sel = h("select", { class: "cal-in", "aria-label": "Course", onchange: e => { location.hash = "#/calendar/" + e.target.value; } },
      ["Grade-Level", "Competition"].map(g => h("optgroup", { label: g === "Competition" ? "Competition Math" : "Grade-Level Math" },
        Object.values(DATA).filter(c => c.group === g).map(c => h("option", { value: c.id, selected: c.id === id ? true : null }, c.title)))));
    const startIn = h("input", { class: "cal-in", type: "date", value: st.start, "aria-label": "Start date",
      onchange: e => { if (e.target.value) { st.start = e.target.value; save(id, st); render(); } } });
    const chips = h("div", { class: "cal-days", role: "group", "aria-label": "Practice days" },
      [1, 2, 3, 4, 5, 6, 0].map(n => {
        const b = h("button", { type: "button", class: "cal-chip", "aria-pressed": st.days.includes(n) ? "true" : "false",
          onclick: () => {
            const on = st.days.includes(n);
            if (on && st.days.length === 1) return;
            st.days = on ? st.days.filter(x => x !== n) : [...st.days, n].sort();
            b.setAttribute("aria-pressed", on ? "false" : "true"); save(id, st); render();
          } }, WD[n]);
        return b;
      }));
    const skipIn = h("input", { type: "checkbox", checked: st.skip ? true : null, onchange: e => { st.skip = e.target.checked; save(id, st); render(); } });
    let resetArmed = false;
    const resetBtn = h("button", { type: "button", class: "btn sm ghost", onclick: () => {
      if (!resetArmed) { resetArmed = true; resetBtn.textContent = "Click again to clear all check marks"; setTimeout(() => { resetArmed = false; resetBtn.textContent = "Reset progress"; }, 4000); return; }
      st.done.clear(); save(id, st); resetArmed = false; resetBtn.textContent = "Reset progress"; render();
    } }, "Reset progress");

    const controls = h("div", { class: "card cal-controls" },
      h("label", { class: "cal-field cal-wide" }, h("span", {}, "Course"), sel),
      h("label", { class: "cal-field" }, h("span", {}, "Start date"), startIn),
      h("div", { class: "cal-field cal-wide" }, h("span", {}, "Practice days"), chips),
      h("label", { class: "cal-check" }, skipIn, h("span", {}, "Skip 2027–28 school breaks (Thanksgiving, winter, spring)")),
      h("div", { class: "cal-links" }, h("a", { class: "btn sm ghost", href: C.pdf, target: "_blank", rel: "noopener" }, "📄 PDF version"), resetBtn));

    const summary = h("div", { class: "cal-stats" });
    const todayBox = h("div");
    const list = h("div", { class: "cal-weeks" });
    body.replaceChildren(controls, summary, todayBox, h("h2", { class: "cal-h2" }, "Full schedule"), list);

    function render() {
      const plan = schedule(st.start, N, st.days, st.skip);
      const t = iso(today());
      const doneN = st.done.size;
      const next = sessions.find(s => !st.done.has(s.i));
      const started = t >= st.start;
      const expected = plan.filter(d => d <= t).length;
      const remaining = N - doneN;
      const from = started ? t : st.start;
      const proj = remaining ? schedule(from, remaining, st.days, st.skip) : [];
      const projEnd = remaining ? proj[proj.length - 1] : null;
      const diff = doneN - expected;

      let status;
      if (!remaining) status = h("span", { class: "cal-ok" }, "🎉 All " + N + " practice days complete!");
      else if (!started) status = h("span", {}, "Starts " + fmt(parse(st.start), true) + ".");
      else if (diff >= 0) status = h("span", { class: "cal-ok" }, diff > 0 ? "Ahead of plan by " + diff + " practice day" + (diff === 1 ? "" : "s") + ". 🌟" : "Right on plan. ✅");
      else status = h("span", { class: "cal-behind" }, "Behind plan by " + (-diff) + " practice day" + (diff === -1 ? "" : "s") + ". Keep going: one day at a time!");
      summary.replaceChildren(
        h("div", { class: "card cal-stat" }, h("small", {}, "Practice days"), h("b", {}, String(N)), h("span", {}, st.days.length + " day" + (st.days.length === 1 ? "" : "s") + " a week")),
        h("div", { class: "card cal-stat" }, h("small", {}, "Planned finish"), h("b", {}, fmt(parse(plan[N - 1]), true)), h("span", {}, "Start " + fmt(parse(st.start), true))),
        h("div", { class: "card cal-stat" }, h("small", {}, "At your pace"), h("b", {}, projEnd ? fmt(parse(projEnd), true) : "Done!"),
          h("span", {}, started || doneN ? "Doing one day on each practice day from " + (started ? "today" : "the start") : "Same as the plan until you start")),
        h("div", { class: "card cal-stat cal-prog" }, h("small", {}, "Progress"), h("b", {}, doneN + " / " + N + " days"),
          h("div", { class: "cal-bar" }, h("i", { style: "width:" + (100 * doneN / N).toFixed(1) + "%" })), status));

      /* today / next practice */
      if (!next) todayBox.replaceChildren(h("div", { class: "card cal-today" }, h("h2", {}, "🎉 Congratulations!"), h("p", {}, "You finished every practice day in " + C.title + ".")));
      else {
        const pd = plan[next.i], isToday = pd === t;
        const ans = next.d.ans ? h("div", { class: "cal-ans", hidden: true }, h("b", {}, "Answer: "), rich("span", next.d.ans)) : null;
        const head = !started ? "First practice day · " + fmt(parse(pd), true)
          : isToday ? "Today · " + fmt(parse(pd), true)
          : pd < t ? "Next up (planned for " + fmt(parse(pd)) + ")" : "Next practice day · " + fmt(parse(pd), true);
        const hol = HOLIDAYS[pd];
        todayBox.replaceChildren(h("div", { class: "card cal-today", style: "--c:" + (COLORS[next.w.color] || "#0F7C7C") },
          h("div", { class: "cal-today-top" }, h("span", { class: "tag" }, head), h("span", { class: "tag" }, "Day " + (next.i + 1) + " of " + N)),
          rich("div", "Week " + next.w.n + " · " + next.w.title, { class: "cal-wk" }),
          rich("h2", next.d.focus),
          hol ? h("p", { class: "cal-hol" }, "🏖 " + hol + ": no class that day. Do this practice on the weekend.") : null,
          next.d.kind === "try" ? h("div", { class: "cal-try" }, h("span", { class: "cal-trylbl" }, "TRY"), rich("span", next.d.text)) : rich("p", next.d.text, { class: "cal-task" }),
          h("p", { class: "muted", style: "font-size:14px;margin:8px 0 0" }, next.d.kind === "try" ? "Warm up with this Try problem, then do the day's 10 problems (8 new + 2 review)." : "Today's work is listed above."),
          h("div", { class: "cal-actions" },
            ans ? h("button", { type: "button", class: "btn sm ghost", onclick: e => { ans.hidden = !ans.hidden; e.target.textContent = ans.hidden ? "Show answer" : "Hide answer"; } }, "Show answer") : null,
            h("button", { type: "button", class: "btn sm teal", onclick: () => { st.done.add(next.i); save(id, st); render(); } }, "✓ Mark this day done")),
          ans));
        typeset(todayBox);
      }

      /* full schedule */
      const openWeek = next ? next.wi : -1;
      list.replaceChildren(...C.weeks.map((w, wi) => {
        const rows = sessions.filter(s => s.wi === wi);
        const wd = rows.map(s => plan[s.i]);
        const nDone = rows.filter(s => st.done.has(s.i)).length;
        const brk = BREAKS.filter(([a, b, name]) => st.skip && wi > 0 && a > plan[rows[0].i - 1] && b < wd[0]).map(b => b[2]);
        const det = h("details", { class: "card cal-week" + (nDone === 5 ? " cal-wdone" : ""), style: "--c:" + (COLORS[w.color] || "#0F7C7C"), open: wi === openWeek ? true : null },
          h("summary", {},
            h("span", { class: "cal-wtitle" }, h("b", {}, "Week " + w.n), rich("span", " · " + w.title)),
            h("span", { class: "cal-wmeta" }, fmt(parse(wd[0])) + " – " + fmt(parse(wd[4])), h("span", { class: "tag" }, nDone + "/5 ✓"))),
          h("div", { class: "cal-rows" }));
        if (brk.length) det.prepend(h("div", { class: "cal-break" }, "⛱ " + brk.join(" · ") + ": no practice"));
        const fill = () => {
          const box = det.querySelector(".cal-rows");
          if (box.childElementCount) return;
          box.append(rich("p", "<b>" + w.unit + "</b> · " + w.core, { class: "cal-core" }),
            ...rows.map(s => {
              const pd = plan[s.i], done = st.done.has(s.i);
              const ans = s.d.ans ? h("div", { class: "cal-ans", hidden: true }, h("b", {}, "Answer: "), rich("span", s.d.ans)) : null;
              return h("div", { class: "cal-row" + (done ? " done" : "") + (pd === t ? " is-today" : "") },
                h("label", { class: "cal-tick", title: "Mark done" }, h("input", { type: "checkbox", checked: done ? true : null,
                  onchange: e => { e.target.checked ? st.done.add(s.i) : st.done.delete(s.i); save(id, st); render(); } })),
                h("div", { class: "cal-date" }, h("b", {}, fmt(parse(pd))), h("small", {}, String(parse(pd).getFullYear())), pd === t ? h("span", { class: "tag cal-now" }, "Today") : null),
                h("div", { class: "cal-main" },
                  rich("div", s.d.focus, { class: "cal-focus" }),
                  HOLIDAYS[pd] ? h("div", { class: "cal-hol" }, "🏖 " + HOLIDAYS[pd] + ": do this one on the weekend") : null,
                  s.d.kind === "try" ? h("div", { class: "cal-try" }, h("span", { class: "cal-trylbl" }, "TRY"), rich("span", s.d.text)) : rich("div", s.d.text, { class: "cal-task" }),
                  ans ? h("button", { type: "button", class: "cal-link", onclick: e => { ans.hidden = !ans.hidden; e.target.textContent = ans.hidden ? "Show answer" : "Hide answer"; } }, "Show answer") : null,
                  ans));
            }));
          typeset(box);
        };
        det.addEventListener("toggle", () => { if (det.open) fill(); });
        if (det.open) fill();
        return det;
      }));
    }
    render();
  }
})();

/* =====================================================================
   PROF. FANG MATH — MISTAKE LOG  (#/mistakes)
   Students log mistakes from the online calendar (or they are collected
   automatically from practice quizzes). Each mistake is re-done after
   1, 3, 7 and 14 days; 4 correct reviews in a row = mastered. A wrong
   review sends it back to the start. Saved in this browser, per student.
   ===================================================================== */
(function () {
  const STEPS = [1, 3, 7, 14];
  const CAUSES = {
    careless: { label: "Careless slip", icon: "⚡", tip: "Slow down on the last step. Before moving on, check the answer a second way: estimate, or plug it back in." },
    concept: { label: "Didn't understand the idea", icon: "💡", tip: "Re-read that week's Core idea and redo its Try problem. Then do 2 similar problems without help." },
    reading: { label: "Misread the question", icon: "🔍", tip: "Underline exactly what is asked, and the units. Say the question in your own words before you start." },
    stuck: { label: "Didn't know how to start", icon: "🧭", tip: "Try a simpler case, draw a picture, or make a table. Look at a worked example, then redo it on your own." },
    unsure: { label: "Not sure yet", icon: "❔", tip: "When you review, decide what really went wrong. Knowing the cause tells you how to fix it." },
  };
  const CAUSE_KEYS = ["careless", "concept", "reading", "stuck", "unsure"];

  /* ---------- dates ---------- */
  const pad = n => String(n).padStart(2, "0");
  const iso = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  const today = () => iso(new Date());
  const plus = (s, n) => { const [y, m, d] = s.split("-").map(Number); return iso(new Date(y, m - 1, d + n)); };
  const nice = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); };
  const daysUntil = s => { const [y, m, d] = s.split("-").map(Number); const t = new Date(); return Math.round((new Date(y, m - 1, d) - new Date(t.getFullYear(), t.getMonth(), t.getDate())) / 864e5); };

  /* ---------- storage (one log per signed-in student, or "me") ---------- */
  function who() { try { return (typeof kid !== "undefined" && kid) ? kid.code + "/" + kid.nickname : "me"; } catch (e) { return "me"; } }
  const KEY = () => "fm-mistakes:" + who();
  function load() { try { return JSON.parse(localStorage.getItem(KEY()) || "[]"); } catch (e) { return []; } }
  function save(list) { try { localStorage.setItem(KEY(), JSON.stringify(list)); return true; } catch (e) { return false; } }
  const strip = s => { const d = document.createElement("div"); d.innerHTML = s || ""; d.querySelectorAll(".m").forEach(m => { m.textContent = "$" + m.textContent + "$"; }); return d.textContent.trim(); };

  /* ---------- the API other pages use ---------- */
  function add(m) {
    const list = load(), t = today();
    const sig = (m.course || m.courseTitle || "") + "|" + strip(m.q && m.q.v);
    const old = list.find(x => !x.mastered && x.sig === sig && sig.split("|")[1]);
    if (old) {   // missed the same problem again: start its reviews over
      old.stage = 0; old.due = plus(t, 1); old.again = (old.again || 0) + 1; old.log.push({ d: t, ok: false, src: "missed again" });
      if (m.cause && m.cause !== "unsure") old.cause = m.cause;
      save(list); return old;
    }
    const item = Object.assign({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), created: t, stage: 0, due: plus(t, 1), mastered: false, cause: "unsure", log: [], sig }, m);
    list.unshift(item); save(list); return item;
  }
  function review(id, ok) {
    const list = load(), x = list.find(i => i.id === id); if (!x) return null;
    const t = today();
    x.log.push({ d: t, ok });
    if (ok) {
      x.stage++;
      if (x.stage >= STEPS.length) { x.mastered = true; x.masteredOn = t; x.due = null; }
      else x.due = plus(t, STEPS[x.stage]);
    } else { x.stage = 0; x.due = plus(t, 1); x.again = (x.again || 0) + 1; }
    save(list); return x;
  }
  function update(id, fields) { const list = load(), x = list.find(i => i.id === id); if (x) { Object.assign(x, fields); save(list); } }
  function remove(id) { save(load().filter(i => i.id !== id)); }
  window.fmMistakes = { add, load, review, CAUSES };

  /* ---------- rendering helpers ---------- */
  function typeset(root) {
    if (!window.katex) { setTimeout(() => typeset(root), 200); return; }
    root.querySelectorAll(".m:not([data-k])").forEach(el => { el.setAttribute("data-k", "1"); try { katex.render(el.textContent, el, { throwOnError: false }); } catch (e) {} });
    if (typeof renderMath === "function") renderMath(root);
  }
  function show(tag, val, attrs) {   // val = { type: "html" | "tex" | "text", v }
    if (!val || !val.v) return null;
    if (val.type === "html") return h(tag, Object.assign({ html: val.v }, attrs || {}));
    if (val.type === "tex") return mathEl(tag, val.v, attrs);
    return h(tag, attrs || {}, val.v);
  }
  const dots = x => h("span", { class: "mk-dots", title: (x.mastered ? STEPS.length : x.stage) + " of " + STEPS.length + " reviews passed" },
    STEPS.map((s, i) => h("i", { class: i < (x.mastered ? STEPS.length : x.stage) ? "on" : "" })));

  /* ---------- "log a mistake" form (used by the calendar) ---------- */
  window.fmMistakeForm = function (ctx) {
    // ctx: { course, courseTitle, week, topic, where, link, tryQ: {type,v}, tryAns: {type,v} }
    let useTry = !!ctx.tryQ;
    const qBox = h("textarea", { class: "cal-in", rows: "3", placeholder: "Copy the problem you missed" });
    const mine = h("input", { class: "cal-in", placeholder: "What I answered (optional)" });
    const ans = h("input", { class: "cal-in", placeholder: "The correct answer (optional)" });
    let cause = "unsure";
    const causeRow = h("div", { class: "mk-causes" }, CAUSE_KEYS.map(k => {
      const b = h("button", { type: "button", class: "cal-chip", "aria-pressed": k === cause ? "true" : "false", onclick: () => { cause = k; causeRow.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false")); } }, CAUSES[k].icon + " " + CAUSES[k].label);
      return b;
    }));
    const tryView = ctx.tryQ ? h("div", { class: "cal-try" }, h("span", { class: "cal-trylbl" }, "TRY"), show("span", ctx.tryQ)) : null;
    const which = h("div", { class: "mk-which" });
    const ansField = h("label", { class: "cal-field" }, h("span", {}, "Correct answer"), ans);
    const custom = h("div", {}, h("label", { class: "cal-field" }, h("span", {}, "The problem"), qBox));
    const drawWhich = () => {
      if (!ctx.tryQ) { which.replaceChildren(custom); return; }
      which.replaceChildren(
        h("div", { class: "cal-days", style: "margin-bottom:10px" },
          h("button", { type: "button", class: "cal-chip", "aria-pressed": useTry ? "true" : "false", onclick: () => { useTry = true; drawWhich(); } }, "The Try problem"),
          h("button", { type: "button", class: "cal-chip", "aria-pressed": useTry ? "false" : "true", onclick: () => { useTry = false; drawWhich(); } }, "Another problem from today")),
        useTry ? tryView : custom);
      ansField.hidden = useTry;
      typeset(which);
    };
    const msg = h("p", { class: "bad", style: "margin:6px 0 0" });
    const m = modal([
      h("h2", { style: "font-size:24px;margin:0 0 4px" }, "📒 Log a mistake"),
      h("p", { class: "muted", style: "margin:0 0 14px;font-size:14px", html: (ctx.courseTitle ? ctx.courseTitle + " · " : "") + (ctx.where || "") + (ctx.topic ? " · " + ctx.topic : "") }),
      which,
      h("div", { class: "mk-grid" }, h("label", { class: "cal-field" }, h("span", {}, "My answer"), mine), ansField),
      h("div", { class: "cal-field", style: "margin-top:12px" }, h("span", {}, "Why did I miss it?"), causeRow),
      msg,
      h("div", { class: "cal-actions" },
        h("button", { type: "button", class: "btn sm teal", onclick: () => {
          const q = useTry ? ctx.tryQ : { type: "text", v: qBox.value.trim() };
          if (!q.v) { msg.textContent = "Please copy the problem first."; return; }
          const a = useTry ? ctx.tryAns : (ans.value.trim() ? { type: "text", v: ans.value.trim() } : null);
          add({ src: "calendar", course: ctx.course, courseTitle: ctx.courseTitle, week: ctx.week, topic: ctx.topic, where: ctx.where, link: ctx.link, q, mine: mine.value.trim(), ans: a, cause });
          m.querySelector(".card").replaceChildren(
            h("h2", { style: "font-size:24px;margin:0 0 6px" }, "✓ Saved to your Mistake Log"),
            h("p", {}, "Redo it on " + nice(plus(today(), 1)) + ". Get it right 4 reviews in a row (after 1, 3, 7 and 14 days) to master it."),
            h("div", { class: "cal-actions" }, h("a", { class: "btn sm teal", href: "#/mistakes", onclick: () => m.remove() }, "Open my Mistake Log"), h("button", { type: "button", class: "btn sm ghost", onclick: () => m.remove() }, "Close")));
        } }, "Save mistake"),
        h("button", { type: "button", class: "btn sm ghost", onclick: () => m.remove() }, "Cancel")),
    ]);
    drawWhich();
  };

  /* ---------- the Mistake Log page ---------- */
  window.pageMistakes = function (v) {
    const wrap = h("div", { class: "wrap" });
    v.append(wrap);
    const session = { passed: [], again: [], mastered: [] };
    let tab = "active";
    draw();

    function draw() {
      const list = load(), t = today();
      const active = list.filter(x => !x.mastered), mastered = list.filter(x => x.mastered);
      const due = active.filter(x => x.due <= t).sort((a, b) => a.due < b.due ? -1 : 1);
      const weekAgo = plus(t, -7);
      const wk = list.flatMap(x => x.log.filter(l => l.d > weekAgo && !l.src).map(l => ({ x, ok: l.ok })));
      const wkPassed = wk.filter(e => e.ok).length, wkAgain = wk.filter(e => !e.ok).length;
      const wkMastered = mastered.filter(x => x.masteredOn > weekAgo).length;
      const next = active.filter(x => x.due > t).sort((a, b) => a.due < b.due ? -1 : 1)[0];
      const who0 = (() => { try { return (typeof kid !== "undefined" && kid) ? kid.avatar + " " + kid.nickname + "'s" : "My"; } catch (e) { return "My"; } })();

      const kids = [
        h("div", { class: "page-head" }, h("h1", {}, who0 + " Mistake Log"),
          h("p", {}, "Every mistake is a chance to learn. Log it, redo it on schedule, and watch it turn into something you have mastered.")),
        h("div", { class: "card mk-rule" },
          h("b", {}, "🏁 How a mistake gets mastered"),
          h("p", {}, "Redo each mistake ", h("b", {}, "1, 3, 7 and 14 days"), " after you log it. Get it right ", h("b", {}, "4 reviews in a row"), " and it is ", h("b", {}, "mastered ✅"), ". A wrong answer at any review sends it back to the start (redo tomorrow)."),
          h("div", { class: "mk-steps" }, STEPS.map((s, i) => h("span", { class: "tag" }, "Review " + (i + 1) + ": day +" + s)), h("span", { class: "tag mk-gold" }, "Mastered ✅"))),
        h("div", { class: "cal-stats" },
          stat("Due today", String(due.length), due.length ? "Do these first (about 2 min each)" : next ? "Next review " + nice(next.due) : "Nothing to review"),
          stat("Practicing", String(active.length), "Mistakes still being reviewed"),
          stat("Mastered", String(mastered.length), "Right 4 reviews in a row"),
          stat("This week", wkPassed + " passed · " + wkAgain + " again", wkMastered + " newly mastered")),
      ];

      /* session feedback */
      if (session.passed.length || session.again.length || session.mastered.length) {
        kids.push(h("div", { class: "card mk-feedback" }, h("h2", {}, "Today's feedback"),
          session.mastered.length ? fbGroup("✅ Mastered!", "mk-ok", session.mastered, x => "Right 4 reviews in a row. Great work!") : null,
          session.passed.length ? fbGroup("👍 Passed this review", "mk-ok", session.passed, x => "Next review " + nice(x.due) + " (" + x.stage + " of 4 done)") : null,
          session.again.length ? fbGroup("🔁 Needs practice again", "mk-bad", session.again, x => "Back to the start: redo it " + nice(x.due) + ". " + CAUSES[x.cause].tip) : null));
      }

      /* today's review */
      const rev = h("div", { class: "mk-queue" });
      if (!list.length) rev.append(h("div", { class: "card" }, h("p", { style: "margin:0" }, "Your log is empty. When you miss a problem, press ", h("b", {}, "📒 Log a mistake"), " in the ", h("a", { href: "#/calendar" }, "Practice Calendar"), ". Missed questions in lesson quizzes are added for you automatically.")));
      else if (!due.length) rev.append(h("div", { class: "card" }, h("p", { style: "margin:0" }, "🎉 Nothing due today. " + (next ? "Your next review is " + nice(next.due) + "." : "Every mistake is mastered!"))));
      else due.forEach(x => rev.append(reviewCard(x)));
      kids.push(h("h2", { class: "cal-h2" }, "Today's review" + (due.length ? " (" + due.length + ")" : "")), rev);

      /* advice */
      if (active.length) kids.push(h("h2", { class: "cal-h2" }, "What to review next"), advice(active));

      /* all mistakes */
      const shown = tab === "active" ? active : tab === "mastered" ? mastered : list;
      kids.push(h("h2", { class: "cal-h2" }, "All mistakes"),
        h("div", { class: "cal-days", style: "margin-bottom:12px" }, [["active", "Practicing (" + active.length + ")"], ["mastered", "Mastered (" + mastered.length + ")"], ["all", "All (" + list.length + ")"]]
          .map(([k, l]) => h("button", { type: "button", class: "cal-chip", "aria-pressed": tab === k ? "true" : "false", onclick: () => { tab = k; draw(); } }, l))),
        shown.length ? h("div", { class: "mk-list" }, shown.map(rowCard)) : h("p", { class: "muted" }, "Nothing here yet."),
        h("p", { class: "muted", style: "font-size:13px;margin-top:18px" }, "Your Mistake Log is saved in this browser" + (who() === "me" ? "" : " for this student") + "."));
      wrap.replaceChildren(...kids.filter(Boolean));
      typeset(wrap);
    }

    function stat(label, big, small) { return h("div", { class: "card cal-stat" }, h("small", {}, label), h("b", {}, big), h("span", {}, small)); }
    function title(x) { return h("div", { class: "mk-where", html: [x.courseTitle, x.where, x.topic].filter(Boolean).join(" · ") }); }
    function fbGroup(head, cls, items, line) {
      return h("div", { class: "mk-fbg " + cls }, h("b", {}, head + " (" + items.length + ")"),
        h("ul", {}, items.map(x => h("li", {}, show("span", x.q, { class: "mk-q1" }), h("small", {}, line(x))))));
    }

    function reviewCard(x) {
      const ansBox = h("div", { class: "cal-ans", hidden: true }, h("b", {}, "Answer: "), x.ans ? show("span", x.ans) : h("span", {}, "(not saved; check with your book, notes or teacher)"));
      const late = daysUntil(x.due) < 0 ? h("span", { class: "tag mk-late" }, "Overdue since " + nice(x.due)) : null;
      const mark = ok => {
        const r = review(x.id, ok);
        if (!ok) session.again.push(r); else if (r.mastered) session.mastered.push(r); else session.passed.push(r);
        draw(); window.scrollTo({ top: 0, behavior: "smooth" });
      };
      const btns = h("div", { class: "cal-actions" });
      const reveal = h("button", { type: "button", class: "btn sm ghost", onclick: () => {
        ansBox.hidden = false; reveal.remove();
        btns.append(h("button", { type: "button", class: "btn sm teal", onclick: () => mark(true) }, "✓ I got it right"),
                    h("button", { type: "button", class: "btn sm", style: "background:var(--red)", onclick: () => mark(false) }, "✗ Not yet"));
        typeset(ansBox);
      } }, "I solved it: check my answer");
      btns.append(reveal);
      return h("div", { class: "card mk-card" },
        h("div", { class: "mk-top" }, title(x), h("span", { style: "display:flex;gap:8px;align-items:center" }, late, dots(x))),
        show("div", x.q, { class: "mk-q" }),
        x.mine ? h("p", { class: "muted", style: "margin:6px 0 0;font-size:14px" }, "Last time I answered: " + x.mine) : null,
        h("p", { class: "mk-tip" }, CAUSES[x.cause].icon + " ", h("b", {}, CAUSES[x.cause].label + ": "), CAUSES[x.cause].tip),
        h("p", { class: "muted", style: "font-size:14px;margin:8px 0 0" }, "Solve it on paper without looking, then check."),
        btns, ansBox);
    }

    function advice(active) {
      const groups = {};
      active.forEach(x => {
        const k = (x.course || x.courseTitle || "") + "|" + (x.week || x.topic || "");
        (groups[k] = groups[k] || { items: [], x }).items.push(x);
      });
      const top = Object.values(groups).sort((a, b) => b.items.length - a.items.length || (b.items.reduce((s, i) => s + (i.again || 0), 0) - a.items.reduce((s, i) => s + (i.again || 0), 0))).slice(0, 3);
      const causeCount = {}; active.forEach(x => { causeCount[x.cause] = (causeCount[x.cause] || 0) + 1; });
      const topCause = CAUSE_KEYS.filter(k => k !== "unsure").sort((a, b) => (causeCount[b] || 0) - (causeCount[a] || 0))[0];
      const unsure = causeCount.unsure || 0;
      return h("div", { class: "mk-advice" },
        h("div", { class: "card" }, h("b", {}, "📌 Weakest topics"),
          h("ol", { class: "mk-ol" }, top.map(g => {
            const x = g.x, n = g.items.length;
            const link = x.course && x.week ? "#/calendar/" + x.course + "/" + x.week : x.link;
            return h("li", {}, h("span", { html: [x.courseTitle, x.week ? "Week " + x.week : "", x.topic].filter(Boolean).join(" · ") }),
              h("small", {}, n + " mistake" + (n === 1 ? "" : "s") + " still practicing" + (g.items.some(i => i.again) ? ", some missed more than once" : "") + ". "),
              link ? h("a", { href: link }, x.week ? "Review this week →" : "Review this lesson →") : null);
          })),
          h("p", { class: "muted", style: "font-size:14px;margin:6px 0 0" }, "Tip: re-read the Core idea for these topics and redo their Try problems before your next quiz.")),
        h("div", { class: "card" }, h("b", {}, "🧩 Why the mistakes happen"),
          h("div", { class: "mk-bars" }, CAUSE_KEYS.filter(k => causeCount[k]).map(k => h("div", { class: "mk-bar" },
            h("span", {}, CAUSES[k].icon + " " + CAUSES[k].label), h("i", { style: "width:" + Math.round(100 * causeCount[k] / active.length) + "%" }), h("b", {}, String(causeCount[k]))))),
          causeCount[topCause] ? h("p", { class: "mk-tip" }, h("b", {}, "Your most common cause is “" + CAUSES[topCause].label + ".” "), CAUSES[topCause].tip) : null,
          unsure ? h("p", { class: "muted", style: "font-size:14px;margin:6px 0 0" }, unsure + " mistake" + (unsure === 1 ? " has" : "s have") + " no cause yet. Pick one in the list below so the advice can help more.") : null));
    }

    function rowCard(x) {
      const cause = h("select", { class: "cal-in mk-sel", "aria-label": "Why I missed it", onchange: e => { update(x.id, { cause: e.target.value }); draw(); } },
        CAUSE_KEYS.map(k => h("option", { value: k, selected: x.cause === k ? true : null }, CAUSES[k].icon + " " + CAUSES[k].label)));
      let armed = false;
      const del = h("button", { type: "button", class: "cal-link", onclick: () => {
        if (!armed) { armed = true; del.textContent = "Click again to delete"; setTimeout(() => { armed = false; del.textContent = "Delete"; }, 4000); return; }
        remove(x.id); draw();
      } }, "Delete");
      const status = x.mastered ? h("span", { class: "tag mk-gold" }, "Mastered " + nice(x.masteredOn))
        : h("span", { class: "tag" }, (x.due <= today() ? "Due now" : "Next: " + nice(x.due)) + " · " + x.stage + "/4");
      return h("div", { class: "card mk-row" },
        h("div", { class: "mk-top" }, title(x), h("span", { style: "display:flex;gap:8px;align-items:center" }, status, dots(x))),
        show("div", x.q, { class: "mk-q" }),
        h("div", { class: "mk-meta" }, h("span", { class: "muted" }, "Logged " + nice(x.created) + (x.again ? " · missed again " + x.again + "×" : "")), cause, del));
    }
  };
})();

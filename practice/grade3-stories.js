/* =====================================================================
   PROF. FANG MATH — GRADE 3 STORIES
   A short story before every Grade 3 lesson: experience first, then the
   idea, then the symbols. Keyed by "chapterId/topicId" and drawn above
   the lesson card by drawStory(), which grade3-levels.html calls.
   ===================================================================== */
(function () {
  const S = String.raw;
  const css = S`
  .story{background:linear-gradient(135deg,#FFF8EA,#fff 70%);border:1.5px solid var(--gold);border-radius:var(--radius);padding:22px 24px;margin:0 0 18px;box-shadow:var(--shadow)}
  .story .label{color:#8A6415}
  .story h3{font-family:Fraunces,Georgia,serif;font-size:24px;margin:4px 0 10px}
  .story p{margin:0 0 10px;line-height:1.65}
  .story .think{background:#fff;border:1px dashed var(--gold);border-radius:12px;padding:12px 14px;margin:12px 0}
  .story .think b{color:#8A6415}
  .story .aha{background:var(--teal-soft);border-radius:12px;padding:12px 14px;margin-top:12px}
  .story .aha p:last-child{margin-bottom:0}
  .story table{border-collapse:collapse;width:100%;margin:10px 0 0;font-size:15px;background:#fff;border-radius:10px;overflow:hidden}
  .story th,.story td{border:1px solid var(--line);padding:8px 10px;text-align:center}
  .story th{background:var(--bg)}
  .story .sbtn{border:1px solid var(--gold);background:#fff;color:#8A6415;border-radius:999px;padding:7px 14px;font-weight:600;cursor:pointer;font:inherit;font-size:14px}
  .story .sbtn:hover{background:var(--gold-soft)}
  .story svg{width:100%;max-width:440px;height:auto;display:block;margin:6px auto 10px}
  .bar{display:flex;margin:6px 0;font-size:14px;font-weight:600;color:#fff;border-radius:8px;overflow:hidden;max-width:440px}
  .bar span{padding:7px 10px;text-align:center}
  `;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* base-ten pictures: h boxes (hundreds), t bags (tens), o loose candies (ones) */
  function blocks(h, t, o) {
    let x = 8, out = "";
    for (let i = 0; i < h; i++) { out += `<rect x="${x}" y="10" width="54" height="54" rx="4" fill="#DDF0EE" stroke="#0F7C7C" stroke-width="2"/>`;
      for (let k = 1; k < 10; k++) out += `<line x1="${x}" y1="${10 + k * 5.4}" x2="${x + 54}" y2="${10 + k * 5.4}" stroke="#0F7C7C" stroke-opacity=".35"/><line x1="${x + k * 5.4}" y1="10" x2="${x + k * 5.4}" y2="64" stroke="#0F7C7C" stroke-opacity=".35"/>`;
      x += 62; }
    x += 6;
    for (let i = 0; i < t; i++) { out += `<rect x="${x}" y="10" width="8" height="54" rx="2" fill="#FBF1DC" stroke="#C9962B" stroke-width="2"/>`; x += 12; }
    x += 8;
    for (let i = 0; i < o; i++) { out += `<rect x="${x}" y="${56 - (i % 2) * 12}" width="8" height="8" rx="2" fill="#FBE7E5" stroke="#B3261E" stroke-width="1.6"/>`; if (i % 2) x += 12; }
    const tx = Math.max(8 + h * 62 + 6, 112), ox = Math.max(8 + h * 62 + 14 + t * 12, t ? tx + 84 : tx);
    return `<svg viewBox="0 0 440 92" role="img" aria-label="${h} boxes, ${t} bags, ${o} loose candies">${out}
      <g font-family="Inter,sans-serif" font-size="12" fill="#5B6474">${h ? `<text x="8" y="84">boxes of 100</text>` : ""}${t ? `<text x="${tx}" y="84">bags of 10</text>` : ""}${o ? `<text x="${ox}" y="84">loose</text>` : ""}</g></svg>`;
  }

  const T = {};
  T["ch1/pv"] = {
    title: "The Candy Factory",
    scene: S`<p>At the Fang Candy Factory, candies are packed in a special way. <b>10 loose candies</b> fill one <b>bag</b>. <b>10 bags</b> fill one <b>box</b>. So a box holds $100$ candies.</p>
      <p>Today the factory has <b>4 boxes, 7 bags and 2 loose candies</b>.</p>` + blocks(4, 7, 2),
    think: S`How many candies is that in all? And which is worth more: the <b>4</b> boxes or the <b>7</b> bags — even though $7$ is bigger than $4$?`,
    aha: S`<p>4 boxes $= 400$ candies, 7 bags $= 70$ candies, 2 loose $= 2$ candies. In all: $472$.</p>
      <table><tr><th>hundreds (boxes)</th><th>tens (bags)</th><th>ones (loose)</th></tr><tr><td>$4$</td><td>$7$</td><td>$2$</td></tr><tr><td>worth $400$</td><td>worth $70$</td><td>worth $2$</td></tr></table>
      <p style="margin-top:10px"><b>The digit tells how many packages. The place tells how big each package is.</b> That's why the $4$ (four boxes) is worth more than the $7$ (seven bags).</p>`
  };
  T["ch1/exp"] = {
    title: "Unpacking the Order",
    scene: S`<p>A store orders $608$ candies. The factory sends <b>6 boxes</b> and <b>8 loose candies</b> — and <b>no bags at all</b>.</p>` + blocks(6, 0, 8) + S`<p>The packing slip lists each kind of package and how many candies it holds.</p>`,
    think: S`What should the packing slip say? Why is there a $0$ in the middle of $608$?`,
    aha: S`<p>Packing slip: $600$ (boxes) $+ 8$ (loose) $= 608$. That list is the <b>expanded form</b>: $608 = 600 + 8$.</p>
      <p>The $0$ in the tens place says “<b>no bags</b>.” We still need it in $608$ to hold the place — without it we'd get $68$, a much smaller order! But in the packing slip we can skip it, because $0$ bags add nothing.</p>`
  };
  T["ch1/round"] = {
    title: "Which Bus Stop Is Closer?",
    scene: S`<p>On Long Street, the bus stops at every house number that ends in $0$: house $330$, $340$, $350$, … Ava lives at house <b>$347$</b>.</p>
      <svg viewBox="0 0 440 74" role="img" aria-label="Number line from 340 to 350 with 347 marked">
        <line x1="20" y1="36" x2="420" y2="36" stroke="#94A3B8" stroke-width="2"/>
        ${Array.from({ length: 11 }, (_, i) => `<line x1="${20 + i * 40}" y1="${i % 10 ? 30 : 24}" x2="${20 + i * 40}" y2="${i % 10 ? 42 : 48}" stroke="#94A3B8" stroke-width="2"/>`).join("")}
        <g font-family="Inter,sans-serif" font-size="13" text-anchor="middle" fill="#475569"><text x="20" y="66">🚏 340</text><text x="220" y="66">345</text><text x="420" y="66">350 🚏</text></g>
        <circle cx="300" cy="36" r="7" fill="#0F7C7C"/><text x="300" y="18" font-family="Inter,sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#0F7C7C">Ava 347</text>
      </svg>`,
    think: S`Which bus stop should Ava walk to: $340$ or $350$? How many houses away is each one? What if she lived at house $345$, exactly in the middle?`,
    aha: S`<p>From $347$ it's $7$ houses back to $340$ but only $3$ houses on to $350$. So $347$ is <b>closer to 350</b>: we say $347$ <b>rounds to</b> $350$.</p>
      <p>Shortcut: look at the <b>ones digit</b>. $0$–$4$ → the stop behind you. $5$–$9$ → the stop ahead. For $345$ (a tie) the rule says go <b>ahead</b>.</p>
      <p>For the nearest <b>hundred</b>, the big stops are $300$ and $400$, and the middle is $350$ — so look at the <b>tens digit</b>. $347 \to 300$.</p>`
  };
  T["ch1/add"] = {
    title: "Sealing a New Bag",
    scene: S`<p>Two orders arrive at the packing table: $256$ candies and $178$ candies. The workers pour them together.</p>` + blocks(2, 5, 6) + S`<p style="text-align:center;margin:-4px 0 0;font-weight:700">+</p>` + blocks(1, 7, 8),
    think: S`Count the loose candies: $6 + 8 = 14$. But a pile of loose candies is messy! What would a worker do with $14$ loose candies? Then what about the bags?`,
    aha: S`<p><b>Ones:</b> $14$ loose candies → seal <b>1 new bag</b> of $10$, and $4$ stay loose.</p>
      <p><b>Tens:</b> $5 + 7 = 12$ bags, plus the new one $= 13$ bags → pack <b>1 new box</b> of $10$ bags, and $3$ bags stay.</p>
      <p><b>Hundreds:</b> $2 + 1 = 3$ boxes, plus the new one $= 4$ boxes.</p>
      <p>Total: $4$ boxes, $3$ bags, $4$ loose $= 434$. Sealing a new bag is what we call <b>regrouping</b> — the little $1$ we write on top.</p>`
  };
  T["ch1/est"] = {
    title: "Mom's Quick Check",
    scene: S`<p>Zoe and her mom are buying a bike that costs $398$ dollars and a tent that costs $211$ dollars. The cashier says, “That's $509$ dollars.”</p>
      <p>Mom doesn't take out a pencil. She thinks for two seconds and says, “Hmm, that can't be right.”</p>`,
    think: S`How could Mom know so fast? Try rounding: $398$ is about how much? $211$ is about how much?`,
    aha: S`<p>$398$ is about $400$. $211$ is about $200$. So the total is about $400 + 200 = 600$ dollars.</p>
      <p>$509$ is about $100$ too low — the cashier made a mistake. The real total is $609$ dollars, which is close to $600$. ✓</p>
      <p><b>An estimate is a quick check.</b> It won't give the exact answer, but it tells you if an answer makes sense.</p>`
  };
  T["ch1/sub"] = {
    title: "Opening a Bag",
    scene: S`<p>The factory has $523$ candies: <b>5 boxes, 2 bags, 3 loose</b>. A customer wants $268$ candies.</p>` + blocks(5, 2, 3),
    think: S`The customer needs $8$ loose candies, but there are only $3$ loose ones. What can the worker do — without asking the customer to take fewer?`,
    aha: S`<p><b>Open a bag!</b> $1$ bag becomes $10$ loose candies: now $13$ loose. Take $8$ → $5$ left. Bags: $1$ left.</p>
      <p>The customer needs $6$ bags but there is only $1$. <b>Open a box!</b> $1$ box becomes $10$ bags: now $11$ bags. Take $6$ → $5$ left. Boxes: $4$ left.</p>
      <p>Take $2$ boxes → $2$ left. Answer: $2$ boxes, $5$ bags, $5$ loose $= 255$.</p>
      <p><b>No bags at all?</b> (like $400 - 157$) Open a box into $10$ bags first, then open one of those bags.</p>`
  };
  T["ch1/check"] = {
    title: "The Undo Button",
    scene: S`<p>Leo's class is collecting $720$ cans for the food drive. They already have $450$.</p>
      <div class="bar"><span style="background:#0F7C7C;flex:450">have: 450</span><span style="background:#C9962B;flex:270">still need: ?</span></div>
      <div class="bar"><span style="background:#1F3A68;flex:1">goal: 720</span></div>`,
    think: S`Leo writes $450 + \square = 720$. His friend says, “Easy, just add: $450 + 720$!” Is that right? Look at the bars.`,
    aha: S`<p>The bars show two <b>parts</b> making a <b>whole</b>. The missing piece is the whole minus the part we know: $720 - 450 = 270$.</p>
      <p>Adding and subtracting are like an <b>undo button</b> for each other:</p>
      <table><tr><td>$450 + 270 = 720$</td><td>$720 - 450 = 270$</td></tr><tr><td>$270 + 450 = 720$</td><td>$720 - 270 = 450$</td></tr></table>
      <p style="margin-top:10px">That's why you can <b>check a subtraction by adding</b>: answer $+$ the number you took away should give back the starting number.</p>`
  };
  T["ch1/word"] = {
    title: "Together, Apart, or Compare?",
    scene: S`<p>Three stories from the school library:</p>
      <p><b>1.</b> The library had $315$ books and got $186$ more.<br><b>2.</b> The library had $501$ books and lent out $186$.<br><b>3.</b> Mia read $245$ pages and Leo read $180$ pages.</p>`,
    think: S`For each story, is something being <b>put together</b>, <b>taken apart</b>, or are two amounts being <b>compared</b>? Draw a bar for each one.`,
    aha: S`<p><b>1. Put together → add.</b></p><div class="bar"><span style="background:#0F7C7C;flex:315">315</span><span style="background:#C9962B;flex:186">186</span></div><p>$315 + 186 = 501$ books.</p>
      <p><b>2. Take apart → subtract.</b> $501 - 186 = 315$ books left.</p>
      <p><b>3. Compare → subtract.</b></p><div class="bar"><span style="background:#0F7C7C;flex:245">Mia 245</span></div><div class="bar"><span style="background:#1F3A68;flex:180">Leo 180</span><span style="background:#fff;color:#B3261E;border:2px dashed #B3261E;flex:65">?</span></div><p>The gap is $245 - 180 = 65$: Mia read $65$ more pages. “How many more” is a subtraction question!</p>`
  };

  window.drawStory = function (chId, topic) {
    const lesson = document.getElementById("lesson"); if (!lesson) return;
    let box = document.getElementById("story");
    const s = T[chId + "/" + topic.id];
    if (!s) { if (box) box.remove(); return; }
    if (!box) { box = document.createElement("div"); box.id = "story"; box.className = "story"; lesson.parentNode.insertBefore(box, lesson); }
    box.innerHTML = `<span class="label">📖 Story first</span><h3>${s.title}</h3>${s.scene}`;
    const think = document.createElement("div"); think.className = "think"; think.innerHTML = `<b>🤔 Think first: </b>${s.think}`;
    box.append(think);
    const btn = document.createElement("button"); btn.type = "button"; btn.className = "sbtn"; btn.textContent = "💡 Show the idea";
    const aha = document.createElement("div"); aha.className = "aha"; aha.hidden = true; aha.innerHTML = s.aha;
    btn.onclick = () => { aha.hidden = !aha.hidden; btn.textContent = aha.hidden ? "💡 Show the idea" : "Hide the idea"; };
    box.append(btn, aha);
    if (window.renderMathInElement) renderMathInElement(box, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false });
    else setTimeout(() => drawStory(chId, topic), 300);
  };
  window.GRADE3_STORIES = T;
})();

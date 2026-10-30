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
    const tx = h ? Math.max(8 + h * 62 + 6, 112) : 14, ox = Math.max(8 + h * 62 + 14 + t * 12, t ? tx + 84 : tx);
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


  /* arrays of dots: r rows, c columns (optional split after column k) */
  function dots(r, c, split) {
    let out = ""; const g = 26, w = c * g + (split ? 14 : 0) + 20, hh = r * g + 16;
    for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) {
      const x = 18 + j * g + (split && j >= split ? 14 : 0), y = 16 + i * g;
      out += `<circle cx="${x}" cy="${y}" r="9" fill="${split && j >= split ? "#C9962B" : "#0F7C7C"}"/>`; }
    if (split) out += `<line x1="${18 + split * g - 6}" y1="4" x2="${18 + split * g - 6}" y2="${hh - 4}" stroke="#B3261E" stroke-width="2" stroke-dasharray="5 4"/>`;
    return `<svg viewBox="0 0 ${w} ${hh}" style="max-width:${Math.min(440, w * 1.2)}px" role="img" aria-label="${r} rows of ${c} dots">${out}</svg>`;
  }

  T["ch2/mul"] = {
    title: "Chairs for the Class Play",
    scene: S`<p>Ms. Lee sets up chairs for the class play. She makes <b>3 rows</b> with <b>6 chairs</b> in each row.</p>` + dots(3, 6) + S`<p>Ben counts the chairs one by one: $1, 2, 3, \dots$ It takes a long time.</p>`,
    think: S`Can you count faster than Ben? Count <b>a row at a time</b>. Then walk around to the side of the room and look at the chairs again — what do you see now?`,
    aha: S`<p>Row by row: $6, 12, 18$. That's $6 + 6 + 6 = 18$ chairs. We write it as $3 \times 6 = 18$: <b>3 groups of 6</b>.</p>
      <p>From the side, you see <b>6 rows of 3</b>: $6 \times 3 = 18$. Same chairs, same number! So $3 \times 6 = 6 \times 3$.</p>
      <p><b>Multiplication is a fast way to add equal groups.</b> Rows and columns of things are called an <b>array</b>.</p>`
  };
  T["ch2/div"] = {
    title: "Two Ways to Share",
    scene: S`<p>Grandma brings <b>24 stickers</b>.</p>
      <p><b>Story A:</b> 4 cousins share them equally. Ava deals them out: one for you, one for you, one for you, one for you… again and again.</p>
      <p><b>Story B:</b> Grandma puts them into little bags of <b>4 stickers</b> each.</p>`,
    think: S`In Story A, how many stickers does each cousin get? In Story B, how many bags does Grandma fill? Use the picture: 4 rows of 6.`,
    aha: dots(4, 6) + S`<p><b>A:</b> each row is one cousin's share: $24 \div 4 = 6$ stickers each.</p>
      <p><b>B:</b> each <b>column</b> is one bag of 4: there are $6$ bags. $24 \div 4 = 6$ again!</p>
      <p>Division answers both questions: “<b>how many in each group?</b>” and “<b>how many groups?</b>” And both come from the multiplication fact $4 \times 6 = 24$.</p>`
  };
  T["ch2/fam"] = {
    title: "The Fact Family House",
    scene: S`<p>The numbers $3$, $7$ and $21$ live together in one house. They like to make number sentences — but only with each other.</p>
      <p>One day a sign appears on their door: $\square \times 7 = 21$.</p>`,
    think: S`How many different true sentences can $3$, $7$ and $21$ make with $\times$ and $\div$? And who is hiding behind the box on the door?`,
    aha: S`<table><tr><td>$3 \times 7 = 21$</td><td>$7 \times 3 = 21$</td></tr><tr><td>$21 \div 7 = 3$</td><td>$21 \div 3 = 7$</td></tr></table>
      <p style="margin-top:10px">That's the whole <b>fact family</b>: four facts, three numbers. The biggest number (the <b>product</b>) is always the one being divided.</p>
      <p>$\square \times 7 = 21$ asks “how many $7$s make $21$?” — that's $21 \div 7 = 3$. <b>Division undoes multiplication</b>, so it finds the missing factor.</p>`
  };
  T["ch2/f2510"] = {
    title: "Socks, Nickels and Dimes",
    scene: S`<p>Leo sorts his piggy bank. He has <b>7 dimes</b> (10¢ each) and <b>7 nickels</b> (5¢ each). He also finds <b>7 pairs of socks</b> in the laundry.</p>`,
    think: S`How many socks? How many cents in dimes? How many cents in nickels? Do you see a shortcut for each one?`,
    aha: S`<p><b>2s are doubles:</b> 7 pairs of socks $= 7 + 7 = 14$ socks. So $7 \times 2 = 14$.</p>
      <p><b>10s add a zero:</b> 7 dimes $= 70$¢. So $7 \times 10 = 70$.</p>
      <p><b>5s are half of 10s:</b> a nickel is half a dime, so 7 nickels are half of $70$¢ $= 35$¢. So $7 \times 5 = 35$. Every 5s answer ends in $0$ or $5$.</p>`
  };
  T["ch2/f01"] = {
    title: "Empty Plates",
    scene: S`<p>Mia sets out <b>8 plates</b> for a party. Before the cookies arrive, each plate has <b>0 cookies</b>. Then she puts <b>1 cookie</b> on each plate.</p>
      <p>Later, 8 friends share 8 cookies equally.</p>`,
    think: S`How many cookies are on the plates before? After? How many cookies does each friend get at the end?`,
    aha: S`<p>Before: $8 \times 0 = 0$. Eight empty groups are still nothing.</p>
      <p>After: $8 \times 1 = 8$. One in each group just gives the number back.</p>
      <p>Sharing: $8 \div 8 = 1$ each. Any number divided by itself is $1$. And $8 \div 1 = 8$: one friend gets them all!</p>
      <p>(Sharing <b>nothing</b>: $0 \div 8 = 0$. But we can't share among <b>zero</b> friends, so we never divide by $0$.)</p>`
  };
  T["ch2/f346"] = {
    title: "Double It!",
    scene: S`<p>Zoe knows her 2s facts really well. Today she needs $7 \times 4$. She draws 7 rows of 4 dots and a red line down the middle.</p>` + dots(7, 4, 2),
    think: S`How many dots are on the left side of the red line? How does that help with the whole picture?`,
    aha: S`<p>The left side is $7 \times 2 = 14$. The right side is the same: $14$. Together: $14 + 14 = 28$. So $7 \times 4 = 28$.</p>
      <p><b>4s are double 2s.</b> In the same way, <b>6s are double 3s</b>: $6 \times 8$ is double $3 \times 8 = 24$, so $6 \times 8 = 48$. And 8s are double 4s!</p>`
  };
  T["ch2/f789"] = {
    title: "Break Apart the Big Ones",
    scene: S`<p>Max is stuck on $7 \times 8$. His sister says, “Draw 7 rows of 8. Then cut the picture where it's easy.”</p>` + dots(7, 8, 5),
    think: S`The cut makes two smaller arrays. Which facts do they show? Do you already know them?`,
    aha: S`<p>Left part: $7 \times 5 = 35$. Right part: $7 \times 3 = 21$. Total: $35 + 21 = 56$. So $7 \times 8 = 56$.</p>
      <p>For <b>9s</b>, think of 10 groups and take one away: $9 \times 7 = 10 \times 7 - 7 = 70 - 7 = 63$.</p>
      <p>Bonus pattern: in $9 \times 2 = 18$, $9 \times 3 = 27$, … $9 \times 9 = 81$, the digits always add up to $9$!</p>`
  };
  T["ch2/mword"] = {
    title: "Do I Know the Total?",
    scene: S`<p><b>1.</b> A pack has $6$ juice boxes. How many juice boxes are in $9$ packs?<br><b>2.</b> $54$ juice boxes are packed $6$ to a pack. How many packs?<br><b>3.</b> $54$ juice boxes are shared equally by $9$ classes. How many for each class?</p>`,
    think: S`All three stories use the same numbers: $9$, $6$ and $54$. In each story, which number is missing: the number of groups, the size of each group, or the total?`,
    aha: S`<table><tr><th>Story</th><th>Groups</th><th>Size</th><th>Total</th><th>So…</th></tr>
      <tr><td>1</td><td>$9$</td><td>$6$</td><td>?</td><td>multiply: $9 \times 6 = 54$</td></tr>
      <tr><td>2</td><td>?</td><td>$6$</td><td>$54$</td><td>divide: $54 \div 6 = 9$</td></tr>
      <tr><td>3</td><td>$9$</td><td>?</td><td>$54$</td><td>divide: $54 \div 9 = 6$</td></tr></table>
      <p style="margin-top:10px"><b>Missing the total? Multiply. Know the total? Divide.</b></p>`
  };


  T["ch3/props"] = {
    title: "The Egg Carton Trick",
    scene: S`<p>Grandpa has <b>2 boxes</b>. Each box holds <b>7 egg cartons</b>, and each carton holds <b>5 eggs</b>. How many eggs are there?</p>
      <p>Leo writes $2 \times 7 \times 5$ and starts: $2 \times 7 = 14$, then $14 \times 5 = \;$… “Ugh, that's hard!”</p>`,
    think: S`Is there an easier order to multiply $2$, $7$ and $5$? Which two numbers make a really friendly product?`,
    aha: S`<p>Do $2 \times 5 = 10$ first. Then $10 \times 7 = 70$. Easy! There are $70$ eggs.</p>
      <p>When every sign is $\times$, you may <b>change the order</b> ($2 \times 5 = 5 \times 2$) and <b>change the grouping</b> — the answer stays the same. Mathematicians call these the <i>commutative</i> and <i>associative</i> properties.</p>
      <p>Two more you already know: $345 \times 1 = 345$ and $345 \times 0 = 0$.</p>`
  };
  T["ch3/dist"] = {
    title: "The Tile Floor",
    scene: S`<p>The bathroom floor has <b>7 rows of 8 tiles</b>. Mia forgot $7 \times 8$. But she notices the tiles are two colors: the first <b>5 columns</b> are green and the last <b>3 columns</b> are gold.</p>` + dots(7, 8, 5),
    think: S`How many tiles are on the left of the red line? How many on the right? Can Mia find $7 \times 8$ without knowing it?`,
    aha: S`<p>Left: $7 \times 5 = 35$. Right: $7 \times 3 = 21$. All: $35 + 21 = 56$. So $7 \times 8 = 56$.</p>
      <p>This works for bigger numbers too. $4 \times 13$: break $13$ into $10 + 3$. $4 \times 10 = 40$, $4 \times 3 = 12$, so $4 \times 13 = 52$.</p>
      <p>And sometimes taking away is easier: $6 \times 19 = 6 \times 20 - 6 = 120 - 6 = 114$.</p>`
  };
  T["ch3/unk"] = {
    title: "The Mystery Box",
    scene: S`<p>The art room has a box of crayon packs. The label is torn, but it still says <b>8 crayons per pack</b>. Ms. Lee counts <b>56 crayons</b> in all.</p>`,
    think: S`How many packs are in the box? Before you solve it, can you write the story as a number sentence with a $\square$ for the part you don't know?`,
    aha: S`<p>“Some packs of $8$ make $56$” → $\square \times 8 = 56$.</p>
      <p>How many $8$s make $56$? That's $56 \div 8 = 7$. So $\square = 7$ packs.</p>
      <p>Writing the equation first tells you <b>what is unknown</b>: the number of groups, the size of each group, or the total. Instead of a box, we can use a letter like $n$: $n \times 8 = 56$.</p>`
  };
  T["ch3/two"] = {
    title: "One Step at a Time",
    scene: S`<p>Ben earns $8$ dollars a week for walking the neighbor's dog. He saves all of it for $6$ weeks. Then he spends $15$ dollars on a kite.</p>`,
    think: S`The question is “how much is left?” But you can't answer it in one jump. What do you need to know <b>first</b>?`,
    aha: S`<p><b>Step 1:</b> How much did Ben save? $6 \times 8 = 48$ dollars.</p>
      <div class="bar"><span style="background:#0F7C7C;flex:33">left: ?</span><span style="background:#C9962B;flex:15">kite 15</span></div>
      <p><b>Step 2:</b> Take away the kite: $48 - 15 = 33$ dollars left.</p>
      <p>As one equation with a letter: $n = 6 \times 8 - 15 = 33$. <b>Multiply first</b>, then subtract.</p>`
  };
  T["ch3/eo"] = {
    title: "Partners at Recess",
    scene: S`<p>Coach says, “Find a partner!” With <b>12</b> kids, everyone has a partner. With <b>13</b> kids, one kid is left out.</p>
      <p>Then Coach makes teams: <b>3 teams of 5</b>. Now everyone must find a partner from any team.</p>`,
    think: S`Is $3 \times 5 = 15$ even or odd? What if there were 3 teams of <b>4</b>? Can you guess a rule before you multiply?`,
    aha: S`<p><b>Even</b> numbers split into pairs ($12$: everyone has a partner). <b>Odd</b> numbers leave one out ($13$).</p>
      <p>Each team of $4$ pairs up by itself, so $3 \times 4 = 12$ is even. Each team of $5$ has one kid left over: three leftovers make one pair and <b>one</b> more kid, so $3 \times 5 = 15$ is odd.</p>
      <p><b>Rule:</b> a product is odd <b>only</b> when both numbers are odd. One even number makes the whole product even.</p>`
  };
  T["ch3/pat"] = {
    title: "Number Detectives",
    scene: S`<p>Zoe writes the 9s facts in a list:</p>
      <table><tr><td>$9$</td><td>$18$</td><td>$27$</td><td>$36$</td><td>$45$</td><td>$54$</td><td>$63$</td><td>$72$</td><td>$81$</td></tr></table>
      <p style="margin-top:10px">Then she sees the pattern $6, 12, 18, 24, \dots$ on a wall and wonders what comes next.</p>`,
    think: S`Add the two digits of each 9s answer. What do you notice? And what is the rule for $6, 12, 18, 24$?`,
    aha: S`<p>$1 + 8 = 9$, $2 + 7 = 9$, $3 + 6 = 9$, … the digits of every 9s fact (up to $9 \times 10$) add to <b>9</b>! Also, the tens digit goes up by $1$ while the ones digit goes down by $1$ — because adding $9$ is adding $10$ and taking away $1$.</p>
      <p>For $6, 12, 18, 24$: each jump is $+6$, so next is $30$. These are the 6s facts, so the $10$th number is $10 \times 6 = 60$.</p>
      <p><b>A detective checks the rule on every step</b>, then uses it to jump far ahead.</p>`
  };
  T["ch3/x10"] = {
    title: "Bags of Ten",
    scene: S`<p>At the Candy Factory, a small box holds <b>30 candies</b> — that's <b>3 bags of 10</b>. A store orders <b>4 small boxes</b>.</p>` + (() => { let o = ""; for (let g = 0; g < 4; g++) { const x0 = 10 + g * 104; o += `<rect x="${x0}" y="6" width="90" height="70" rx="8" fill="none" stroke="#94A3B8" stroke-width="2" stroke-dasharray="5 4"/>`; for (let k = 0; k < 3; k++) o += `<rect x="${x0 + 18 + k * 20}" y="16" width="12" height="50" rx="3" fill="#FBF1DC" stroke="#C9962B" stroke-width="2"/>`; o += `<text x="${x0 + 45}" y="94" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" fill="#5B6474">box ${g + 1}: 30</text>`; } return `<svg viewBox="0 0 430 102" role="img" aria-label="4 boxes, each with 3 bags of 10">${o}</svg>`; })(),
    think: S`How many bags of 10 is that? How many candies? Can you use a fact you already know?`,
    aha: S`<p>Each box is $3$ bags, so $4$ boxes are $4 \times 3 = 12$ bags. $12$ bags of ten is $120$ candies.</p>
      <p>So $4 \times 30 = 4 \times 3$ <b>tens</b> $= 12$ tens $= 120$. Use the basic fact, then count in tens.</p>
      <p>If $7 \times 6 = 42$, then $7 \times 60 = 42$ tens $= 420$.</p>`
  };


  /* Unit 4 pictures use fbar / pie / nline from grade3-levels.html (loaded before this file runs) */
  const FB = (...a) => (window.fbar ? fbar(...a) : ""), PI = (...a) => (window.pie ? pie(...a) : ""), NL = (...a) => (window.nline ? nline(...a) : "");
  T["ch4/unit"] = {
    title: "Fair Pizza",
    scene: S`<p>Four friends order one pizza. Leo cuts it — but his slices are all different sizes! Mia says, “That's not fair. Let me do it.” She cuts it into <b>4 equal</b> slices.</p>` + PI(4, 1),
    think: S`Each friend takes one of Mia's slices. What part of the pizza does each friend get? Why couldn't we answer that with Leo's slices?`,
    aha: S`<p>The pizza is split into $4$ <b>equal</b> parts, so one slice is <b>one fourth</b>: $\frac{1}{4}$.</p>
      <p>The <b>bottom</b> number (denominator) says how many equal parts the whole is cut into. The <b>top</b> number (numerator) says how many parts we take.</p>
      <p>With Leo's uneven slices, one slice isn't $\frac14$ — some are bigger, some are smaller. <b>Fractions need equal parts.</b></p>`
  };
  T["ch4/name"] = {
    title: "Painting the Fence",
    scene: S`<p>Ava's fence has <b>4 equal boards</b>. On Saturday she paints <b>3</b> of them.</p>` + FB(4, 3) + S`<p>On Sunday, she sees <b>6 kids</b> in the park, and <b>2</b> of them are wearing hats.</p>`,
    think: S`What fraction of the fence is painted? What fraction of the kids wear hats? Is the “whole” the same kind of thing in both stories?`,
    aha: S`<p>The fence: $3$ of $4$ equal boards $= \frac{3}{4}$. That's $\frac14 + \frac14 + \frac14$ — three <b>fourths</b>.</p>
      <p>The kids: the whole is the <b>group</b> of $6$. $2$ of the $6$ wear hats: $\frac{2}{6}$.</p>
      <p>A fraction always asks: <b>what is the whole, how many equal parts, how many do we take?</b></p>`
  };
  T["ch4/nl"] = {
    title: "The Walk to School",
    scene: S`<p>Zoe's walk to school is $1$ mile. There are trees at equal spaces along the way, splitting the walk into <b>4 equal parts</b>. Zoe stops to tie her shoe at the <b>third</b> tree.</p>` + NL(4, 1, 3, "Zoe"),
    think: S`What fraction of the mile has Zoe walked? Careful: is the first tick mark at home a “tree”?`,
    aha: S`<p>Each space between trees is $\frac14$ of a mile. Zoe walked <b>3 spaces</b>, so she is at $\frac{3}{4}$ of a mile.</p>
      <p>On a number line, count the <b>jumps</b> from $0$, not the tick marks. The mark at $0$ is home — no walking yet!</p>
      <p>At the school (the 4th jump) she has walked $\frac44 = 1$ whole mile.</p>`
  };
  T["ch4/whole"] = {
    title: "Pizza Party Math",
    scene: S`<p>At the party there are <b>2 pizzas</b>, each cut into <b>3 equal slices</b>.</p>` + PI(3, 3) + PI(3, 3),
    think: S`How many slices are there? Each slice is $\frac13$ of a pizza. How could you write “2 pizzas” as a fraction?`,
    aha: S`<p>One pizza is $3$ thirds: $\frac33 = 1$. Two pizzas are $6$ thirds: $\frac63 = 2$.</p>
      <p>So whole numbers are fractions too! $2 = \frac{6}{3} = \frac{4}{2} = \frac{2}{1}$.</p>
      <p>And if 1 more slice arrives? That's $\frac{7}{3}$ — more than $2$ wholes. Fractions can be bigger than $1$.</p>`
  };
  T["ch4/eq"] = {
    title: "Same Chocolate, More Pieces",
    scene: S`<p>Mia and Ben each get the same size chocolate bar. Mia's bar has <b>2 big pieces</b>; she eats <b>1</b>. Ben's bar has <b>4 small pieces</b>; he eats <b>2</b>.</p>` + FB(2, 1) + FB(4, 2),
    think: S`Mia ate $\frac12$. Ben ate $\frac24$. Who ate more chocolate?`,
    aha: S`<p>They ate the <b>same amount</b>! Look at the bars: the shaded parts are the same length.</p>
      <p>Ben's bar is just Mia's bar with every piece cut in two. Twice as many pieces, and he took twice as many: $\frac12 = \frac{1 \times 2}{2 \times 2} = \frac24$.</p>
      <p>These are <b>equivalent fractions</b>: same size, same point on the number line. Multiply the top and bottom by the <b>same</b> number.</p>`
  };
  T["ch4/cmp"] = {
    title: "Which Piece Is Bigger?",
    scene: S`<p>Two cakes are the same size. One is cut into <b>3</b> equal pieces, the other into <b>8</b>. Leo says, “I want the piece from the 8 cake, because $8$ is bigger than $3$!”</p>` + FB(3, 1) + FB(8, 1),
    think: S`Is $\frac18$ bigger than $\frac13$? What happens to each piece when you cut a cake into more pieces?`,
    aha: S`<p>More pieces means <b>smaller</b> pieces! $\frac13$ is much bigger than $\frac18$, so $\frac13 \gt \frac18$. Leo made a bad trade.</p>
      <p><b>Same bottom</b> (same size pieces): compare the tops. $\frac38 \lt \frac58$.</p>
      <p><b>Same top</b> (same number of pieces): the smaller bottom wins. $\frac23 \gt \frac25$.</p>
      <p>But only compare fractions of the <b>same whole</b>: half of a giant cake is more than half of a cupcake!</p>`
  };
  T["ch4/fword"] = {
    title: "Sharing the Cookies",
    scene: S`<p>Grandma baked <b>12 cookies</b>. She gives $\frac14$ of them to the neighbors and keeps $\frac34$ for the family.</p>`,
    think: S`How many cookies is $\frac14$ of $12$? How many is $\frac34$? Try putting the 12 cookies into equal groups.`,
    aha: S`<p>$\frac14$ means split into $4$ equal groups: $12 \div 4 = 3$ cookies in each group. The neighbors get $3$.</p>
      <p>$\frac34$ is $3$ of those groups: $3 \times 3 = 9$ cookies for the family. And $3 + 9 = 12$ ✓</p>
      <p><b>Fraction of a group:</b> divide by the bottom, then multiply by the top.</p>`
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

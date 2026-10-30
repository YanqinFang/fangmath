/* =====================================================================
   PROF. FANG MATH — GRADE 6 STORIES
   A short story before every Grade 6 lesson: experience first, then the
   idea, then the symbols. Keyed by "chapterId/topicId" and drawn above
   the lesson card by drawStory(), which grade6-levels.html calls.
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
  `;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const FB = (...a) => (window.fbar ? fbar(...a) : ""), LP = (...a) => (window.lplot ? lplot(...a) : "");
  const T = {};

  /* ---------- Unit 1 ---------- */
  T["ch1/div"] = { title: "The Field Trip Buses",
    scene: S`<p>The whole school — <b>864</b> students — is going to the science museum. Each bus holds <b>24</b> students.</p>`,
    think: S`About how many buses? Is it closer to $30$ or $40$? How could you find the exact number without adding $24$ over and over?`,
    aha: S`<p>Long division counts big groups first. $24 \times 30 = 720$ students fill $30$ buses; $864 - 720 = 144$ are left, and $24 \times 6 = 144$.</p>
      <p>So $30 + 6 = $ <b>36 buses</b>. Every long-division step is just “how many more groups fit?”</p>` };
  T["ch1/dec"] = { title: "The Snack Bar Receipt",
    scene: S`<p>Ava buys $3$ smoothies at $\$2.45$ each. The cashier types $3 \times 245$ and gets $735$.</p>`,
    think: S`The bill isn't $\$735$! Where does the decimal point go, and how do you know?`,
    aha: S`<p>$2.45$ is $245$ <b>hundredths</b>. Three of them is $735$ hundredths $= \$7.35$.</p>
      <p>Multiply as whole numbers, then put back the decimal places: $2$ places in $2.45$, so $2$ places in the answer. A quick estimate ($3 \times 2.5 \approx 7.5$) confirms it.</p>` };
  T["ch1/gcf"] = { title: "Party Bags",
    scene: S`<p>Leo has $24$ stickers and $36$ candies. He wants to make identical party bags with nothing left over — as many bags as possible.</p>`,
    think: S`Could he make $6$ bags? $12$? $24$? What has to be true about the number of bags?`,
    aha: S`<p>The number of bags must divide <b>both</b> $24$ and $36$. The biggest such number is the <b>greatest common factor</b>: $12$.</p>
      <p>Each bag gets $2$ stickers and $3$ candies — that's the distributive property: $24 + 36 = 12(2 + 3)$.</p>` };
  T["ch1/fdiv"] = { title: "Pizza Slices",
    scene: S`<p>There are $3$ whole pizzas. Each person eats $\tfrac{1}{4}$ of a pizza.</p>`,
    think: S`How many people can eat? Draw the pizzas and cut them into quarters.`,
    aha: S`<p>Each pizza makes $4$ quarters, so $3$ pizzas make $3 \times 4 = 12$ servings: $3 \div \tfrac14 = 12$.</p>
      <p>Dividing by $\tfrac14$ is the same as <b>multiplying by $4$</b>. That's why we “flip” the divisor: $\tfrac{a}{b} \div \tfrac{c}{d} = \tfrac{a}{b} \times \tfrac{d}{c}$.</p>` };

  /* ---------- Unit 2 ---------- */
  T["ch2/fword"] = { title: "The Yogurt Tub",
    scene: S`<p>A tub has $6$ cups of yogurt. Mom says one serving is $\tfrac34$ cup.</p>`,
    think: S`Are we making groups of $\tfrac34$, or sharing $6$ cups among people? Which operation fits?`,
    aha: S`<p>“How many $\tfrac34$-cups fit in $6$ cups?” is a <b>how-many-groups</b> question: $6 \div \tfrac34 = 6 \times \tfrac43 = 8$ servings.</p>
      <p>Check: $8 \times \tfrac34 = 6$ ✓. Always check a division by multiplying back.</p>` };
  T["ch2/ratio"] = { title: "Lemonade",
    scene: S`<p>Zoe's lemonade recipe: <b>2 cups lemon juice for every 3 cups water</b>. Sam makes a giant batch with $10$ cups of juice and $12$ cups of water.</p>`,
    think: S`Will Sam's lemonade taste the same as Zoe's? Too sour or too watery?`,
    aha: S`<p>Zoe's ratio is $2 : 3$. To keep the taste with $10$ cups of juice (that's $2 \times 5$), Sam needs $3 \times 5 = 15$ cups of water.</p>
      <p>He used only $12$, so his is <b>more sour</b>. Same taste means the same <b>ratio</b>, not the same difference.</p>` };
  T["ch2/rtab"] = { title: "Scaling a Recipe",
    scene: S`<p>Pancakes: $3$ cups of flour for $2$ eggs. The class wants to make $4$ times as many, and later half that.</p>`,
    think: S`How much flour for $8$ eggs? For $4$ eggs? Can you build a table?`,
    aha: S`<table><tr><th>flour (cups)</th><td>3</td><td>6</td><td>12</td></tr><tr><th>eggs</th><td>2</td><td>4</td><td>8</td></tr></table>
      <p>Multiply (or divide) <b>both</b> rows by the same number and the ratio stays the same. A double number line is the same table drawn on two rulers.</p>` };
  T["ch2/rate"] = { title: "Which Is the Better Deal?",
    scene: S`<p>Store A sells $6$ granola bars for $\$4.50$. Store B sells $10$ bars for $\$7.00$.</p>`,
    think: S`Store B costs more money — is it the worse deal? How can you compare fairly?`,
    aha: S`<p>Find the price of <b>one</b> bar (the unit rate): A: $4.50 \div 6 = \$0.75$. B: $7.00 \div 10 = \$0.70$.</p>
      <p>Store B is cheaper per bar. A <b>unit rate</b> puts both deals on the same footing: “per $1$”.</p>` };
  T["ch2/pct"] = { title: "The 25% Off Sign",
    scene: S`<p>A jacket costs $\$80$. The sign says <b>25% off</b>.</p>`,
    think: S`What does “percent” mean? How much do you save? (Hint: $25$ out of every $100$.)`,
    aha: S`<p>$25\%$ means $25$ out of $100$, which is $\tfrac14$. One quarter of $\$80$ is $\$20$ — you save $\$20$ and pay $\$60$.</p>
      <p>Percents are ratios “per hundred”: $25\% = \tfrac{25}{100} = 0.25$.</p>` };

  /* ---------- Unit 3 ---------- */
  T["ch3/neg"] = { title: "The Winter Thermometer",
    scene: S`<p>At 6 a.m. the thermometer reads <b>5 degrees below zero</b>. By noon it is <b>8 degrees above zero</b>.</p>`,
    think: S`How do you write “below zero” with a number? How many degrees did it warm up?`,
    aha: S`<p>Below zero is negative: $-5$. The thermometer is a vertical number line: from $-5$ up to $0$ is $5$ degrees, then $0$ to $8$ is $8$ more.</p>
      <p>It warmed up $5 + 8 = 13$ degrees. $5$ and $-5$ are <b>opposites</b>: the same distance from $0$.</p>` };
  T["ch3/ord"] = { title: "Colder or Warmer?",
    scene: S`<p>Monday's low was $-3^\circ$F. Tuesday's low was $-8^\circ$F. Leo says Tuesday was warmer because $8 \gt 3$.</p>`,
    think: S`Is $-8$ greater than $-3$? Where are they on a number line?`,
    aha: S`<p>$-8$ is <b>farther left</b>, so it is less: $-8 \lt -3$. Tuesday was colder.</p>
      <p>Among negatives, the one closer to $0$ is greater. Numbers always grow to the right.</p>` };
  T["ch3/abs"] = { title: "How Far From Home?",
    scene: S`<p>Home is at $0$ on a straight road. The library is $4$ blocks east ($+4$) and the park is $4$ blocks west ($-4$).</p>`,
    think: S`Which is farther from home, the library or the park?`,
    aha: S`<p>Both are $4$ blocks away. The <b>absolute value</b> is the distance from $0$, ignoring direction: $|4| = |-4| = 4$.</p>
      <p>Distance is never negative, so absolute value is never negative.</p>` };
  T["ch3/coord"] = { title: "The Treasure Map",
    scene: S`<p>A treasure map has two crossing roads. The treasure is “$3$ steps east, then $2$ steps north” of the crossing. A second clue is at “$4$ west, $1$ south.”</p>`,
    think: S`How could you write each location with just two numbers? What do west and south become?`,
    aha: S`<p>The crossing is the <b>origin</b> $(0, 0)$. East/west is $x$, north/south is $y$: treasure $(3, 2)$, clue $(-4, -1)$.</p>
      <p>The axes split the plane into four <b>quadrants</b>; the signs tell you which one.</p>` };
  T["ch3/cdist"] = { title: "Across the River",
    scene: S`<p>On a city grid, the bakery is at $(-3, 2)$ and the school is at $(4, 2)$. The y-axis is a river running between them.</p>`,
    think: S`How many blocks apart are they? Why can't you just do $4 - 3$?`,
    aha: S`<p>The bakery is $3$ blocks <b>left</b> of the river and the school is $4$ blocks <b>right</b>. Total: $3 + 4 = 7$ blocks.</p>
      <p>Same sign: subtract the distances. Opposite signs: add them. Either way, it's $|4 - (-3)| = 7$.</p>` };

  /* ---------- Unit 4 ---------- */
  T["ch4/expo"] = { title: "The Doubling Rumor",
    scene: S`<p>Mia tells a secret to $2$ friends. The next day each of them tells $2$ new friends, and so on.</p>`,
    think: S`How many new people hear it on day $5$? Is there a shorter way to write $2 \times 2 \times 2 \times 2 \times 2$?`,
    aha: S`<p>$2 \times 2 \times 2 \times 2 \times 2 = 2^5 = 32$. The <b>exponent</b> counts how many times the base is multiplied.</p>
      <p>Exponents are so powerful that we do them <b>before</b> multiplying and adding — that's part of the order of operations.</p>` };
  T["ch4/wexp"] = { title: "The Phone Plan",
    scene: S`<p>A phone plan costs $\$20$ a month plus $\$3$ for every gigabyte of data you use.</p>`,
    think: S`What does it cost for $4$ GB? For $10$ GB? Can you write one rule that works for any number of gigabytes?`,
    aha: S`<p>Let $g$ be the gigabytes. Cost $= 20 + 3g$. That's an <b>expression</b>: a rule with a variable.</p>
      <p>To <b>evaluate</b> it, plug in a value: $g = 4$ gives $20 + 3(4) = 32$ dollars.</p>` };
  T["ch4/eqv"] = { title: "Two Ways to Count",
    scene: S`<p>$3$ friends each buy a sandwich ($x$ dollars) and a $\$4$ drink. Ben writes $3(x + 4)$. Ava writes $3x + 12$.</p>`,
    think: S`Who is right? Try $x = 5$ in both.`,
    aha: S`<p>Both! $3(5 + 4) = 27$ and $3(5) + 12 = 27$. For <b>every</b> $x$ they match — they're <b>equivalent expressions</b>.</p>
      <p>The distributive property explains why: $3$ groups of $(x + 4)$ is $3$ sandwiches plus $3$ drinks.</p>` };
  T["ch4/oneq"] = { title: "The Balance Scale",
    scene: S`<p>A balance scale has a mystery bag plus $7$ marbles on the left, and $19$ marbles on the right. It balances.</p>`,
    think: S`How many marbles are in the bag? What can you remove from both sides and keep it balanced?`,
    aha: S`<p>Take $7$ marbles off <b>both</b> sides: the bag alone balances $12$. So $x + 7 = 19$ gives $x = 12$.</p>
      <p>Solving an equation is keeping the balance: undo each operation by doing the opposite to both sides.</p>` };
  T["ch4/ineq6"] = { title: "The Roller Coaster Sign",
    scene: S`<p>The sign says: “You must be at least $48$ inches tall to ride.”</p>`,
    think: S`Can a $48$-inch kid ride? A $50$-inch kid? How many heights work?`,
    aha: S`<p>Infinitely many heights work: $48$, $48.5$, $50$, $60$… We write $h \ge 48$ — an <b>inequality</b>.</p>
      <p>On a number line: a <b>closed</b> dot at $48$ (it's included) and an arrow to the right.</p>` };

  /* ---------- Unit 5 ---------- */
  T["ch5/apt"] = { title: "Cut and Slide",
    scene: S`<p>Sam has a parallelogram cut from paper: base $10$ cm, height $6$ cm. His scissors are ready.</p>`,
    think: S`Can you make one cut and move a piece so the shape becomes a rectangle?`,
    aha: S`<p>Cut off the triangle on one end along the height and slide it to the other end: a $10 \times 6$ rectangle! So $A = bh = 60$.</p>
      <p>A diagonal splits the parallelogram into two equal triangles, so a triangle is $\tfrac12 bh$.</p>` };
  T["ch5/trap"] = { title: "The Garden Bed",
    scene: S`<p>A garden bed is a trapezoid: the front edge is $12$ ft, the back edge $6$ ft, and it is $5$ ft deep.</p>`,
    think: S`Two copies of the trapezoid, one flipped upside down, fit together. What shape do they make?`,
    aha: S`<p>Two trapezoids make a parallelogram with base $12 + 6 = 18$ and height $5$: area $90$. One trapezoid is half: $45$.</p>
      <p>That's $A = \tfrac12(b_1 + b_2)h$ — the average base times the height.</p>` };
  T["ch5/cpoly"] = { title: "The Park Map",
    scene: S`<p>A park's corners are at $(-3, -2)$, $(4, -2)$, $(4, 3)$ and $(-3, 3)$ on a map where each unit is $10$ meters.</p>`,
    think: S`How long are the sides? Which coordinates change along each side?`,
    aha: S`<p>Along the bottom only $x$ changes: $4 - (-3) = 7$. Up the side only $y$ changes: $3 - (-2) = 5$.</p>
      <p>The park is $7 \times 5 = 35$ square units. Horizontal and vertical sides make coordinate geometry easy.</p>` };
  T["ch5/vol"] = { title: "Tiny Cubes",
    scene: S`<p>A box is $2$ units long, $1$ unit wide and $1\tfrac12$ units tall. Leo has a bag of tiny cubes, each $\tfrac12$ unit on a side.</p>`,
    think: S`How many tiny cubes fit along each edge? How many fill the box?`,
    aha: S`<p>Along the edges: $4$, $2$ and $3$ tiny cubes, so $4 \times 2 \times 3 = 24$ cubes. Each is $\tfrac18$ cubic unit: $24 \times \tfrac18 = 3$.</p>
      <p>And $V = lwh = 2 \times 1 \times 1\tfrac12 = 3$ ✓. The formula works with fractions too.</p>` };
  T["ch5/surf"] = { title: "Wrapping a Gift",
    scene: S`<p>Ava wants to cover a box $5$ in long, $3$ in wide and $2$ in tall with wrapping paper, with no overlap.</p>`,
    think: S`Unfold the box flat. How many rectangles do you see, and how big is each?`,
    aha: S`<p>The flat pattern is a <b>net</b> of $6$ rectangles in $3$ matching pairs: $2(5 \cdot 3) + 2(5 \cdot 2) + 2(3 \cdot 2) = 30 + 20 + 12 = 62$ in².</p>
      <p><b>Surface area</b> is the area of the net — paper on the outside. Volume is what fits inside.</p>` };

  /* ---------- Unit 6 ---------- */
  T["ch6/statq"] = { title: "The Sleep Survey",
    scene: S`<p>Nora asks, “How many hours did I sleep last night?” Then she asks, “How many hours do sixth graders at my school sleep?”</p>`,
    think: S`Which question has one answer? Which one needs data from many people?`,
    aha: S`<p>The second is a <b>statistical question</b>: the answers <b>vary</b>, so we collect data.</p>
      <p>A dot plot shows every answer as a dot. You can see where the data cluster and spot unusual values.</p>` };
  T["ch6/mean"] = { title: "Sharing the Cookies",
    scene: S`<p>Five friends baked $4, 7, 2, 9$ and $8$ cookies. They decide to share them out evenly.</p>`,
    think: S`How many does each friend get? And what is the “middle” baker's number?`,
    aha: S`<p>Total $30$, shared by $5$: each gets $6$. That's the <b>mean</b> — the fair share.</p>
      <p>In order $2, 4, \underline{7}, 8, 9$: the middle is $7$, the <b>median</b>. If one friend had baked $50$, the mean would jump but the median would stay $7$.</p>` };
  T["ch6/mad"] = { title: "Two Basketball Players",
    scene: S`<p>Player A scored $9, 10, 10, 11$ points. Player B scored $2, 6, 14, 18$. Both average $10$.</p>`,
    think: S`Same mean — but which player is more predictable?`,
    aha: S`<p>A's scores are $1, 0, 0, 1$ away from $10$; B's are $8, 4, 4, 8$ away. Average those distances: A's MAD is $0.5$, B's is $6$.</p>
      <p>The <b>mean absolute deviation</b> measures spread: small MAD, consistent player.</p>` };
  T["ch6/box"] = { title: "The Class Heights",
    scene: S`<p>The class lines up from shortest to tallest. The teacher marks the shortest, the tallest, the middle student, and the middles of each half.</p>`,
    think: S`Those five marks split the line into four groups. How many students are in each group?`,
    aha: S`<p>Each group holds about a <b>quarter</b> of the class. The five marks are the five-number summary: min, $Q_1$, median, $Q_3$, max.</p>
      <p>A <b>box plot</b> draws them. The box holds the middle half; its width is the IQR $= Q_3 - Q_1$.</p>` };
  T["ch6/hist"] = { title: "Reading Minutes",
    scene: S`<p>$30$ students logged their reading minutes: $12, 25, 8, 31, 17, \ldots$ Listing every number would be messy.</p>`,
    think: S`How could you group the numbers to see the overall picture?`,
    aha: S`<p>Count how many fall in $0$–$9$, $10$–$19$, $20$–$29$, … and draw a bar for each group. That's a <b>histogram</b>.</p>
      <p>The bars touch because the intervals cover the number line with no gaps.</p>` };

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
  window.GRADE6_STORIES = T;
})();

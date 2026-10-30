/* =====================================================================
   PROF. FANG MATH — GRADE 4 STORIES
   A short story before every Grade 4 lesson: experience first, then the
   idea, then the symbols. Keyed by "chapterId/topicId" and drawn above
   the lesson card by drawStory(), which grade4-levels.html calls.
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
  T["ch1/pv"] = { title: "The Stadium Sign",
    scene: S`<p>The scoreboard at a big stadium shows today's crowd: <b>45,281</b> fans. Ben's little sister asks, “Is that forty-five fans?”</p>`,
    think: S`What does the comma tell you? How much is the $4$ worth? How much is the $5$ worth?`,
    aha: S`<p>The comma splits the number into groups of three. The left group is <b>thousands</b>: “forty-five <b>thousand</b>, two hundred eighty-one.”</p>
      <table><tr><th>ten thousands</th><th>thousands</th><th>hundreds</th><th>tens</th><th>ones</th></tr><tr><td>4</td><td>5</td><td>2</td><td>8</td><td>1</td></tr><tr><td>40,000</td><td>5,000</td><td>200</td><td>80</td><td>1</td></tr></table>
      <p style="margin-top:10px">Every place is <b>10 times</b> the place to its right. So the $4$ is worth $40{,}000$ — ten times as much as a $4$ in the thousands place.</p>` };
  T["ch1/cmp"] = { title: "Which Mountain Is Taller?",
    scene: S`<p>Mount Whitney is <b>14,505</b> feet tall. Mount Rainier is <b>14,410</b> feet tall. Leo says, “Rainier ends in a 10 and Whitney ends in a 5, so Rainier is taller.”</p>`,
    think: S`Which digits should you compare first — the ones on the left or the ones on the right?`,
    aha: S`<p>Compare from the <b>left</b>, where the digits are worth the most. Ten thousands: $1 = 1$. Thousands: $4 = 4$. Hundreds: $5 > 4$. Stop — Whitney wins: $14{,}505 > 14{,}410$.</p>
      <p>The last digits only matter if every place before them is a tie.</p>` };
  T["ch1/round"] = { title: "About How Many?",
    scene: S`<p>A news reporter says, “About <b>48,000</b> people came to the parade.” The exact count was <b>47,620</b>.</p>`,
    think: S`Why did the reporter say $48{,}000$ and not $47{,}000$? Which is closer?`,
    aha: S`<p>$47{,}620$ sits between the neighbors $47{,}000$ and $48{,}000$. Halfway is $47{,}500$, and $47{,}620$ is past halfway, so it is closer to $48{,}000$.</p>
      <p>The shortcut: look at the digit just right of the place you round to. The hundreds digit is $6$ — $5$ or more rounds <b>up</b>.</p>` };
  T["ch1/add"] = { title: "Saving for a Bike",
    scene: S`<p>A school fair raised <b>$4,658</b> on Saturday and <b>$2,375</b> on Sunday. The principal wants the total before she announces it.</p>`,
    think: S`Estimate first: about how much is that? Then add place by place. What happens when the ones add to more than $9$?`,
    aha: S`<p>Estimate: $5{,}000 + 2{,}000 = 7{,}000$.</p>
      <p>Ones: $8 + 5 = 13$ — write $3$, regroup $10$ ones as $1$ ten. Tens: $5 + 7 + 1 = 13$ — write $3$, regroup. Hundreds: $6 + 3 + 1 = 10$ — write $0$, regroup. Thousands: $4 + 2 + 1 = 7$.</p>
      <p>Total: $\$7{,}033$ — right next to the estimate ✓</p>` };
  T["ch1/sub"] = { title: "Pages Left to Read",
    scene: S`<p>A giant book of world records has <b>5,003</b> pages. Ava has read <b>1,478</b> pages.</p>`,
    think: S`How many pages are left? The ones digit on top is $3$, but you need to take away $8$ — and the tens and hundreds are $0$. Where can you get more ones?`,
    aha: S`<p>Open a <b>thousand</b>: $5$ thousands become $4$ thousands and $10$ hundreds. Open a hundred: $9$ hundreds and $10$ tens. Open a ten: $9$ tens and $13$ ones.</p>
      <p>Now subtract each place: $13 - 8 = 5$, $9 - 7 = 2$, $9 - 4 = 5$, $4 - 1 = 3$. Answer: $3{,}525$ pages.</p>
      <p>Check by adding: $3{,}525 + 1{,}478 = 5{,}003$ ✓</p>` };
  T["ch1/word"] = { title: "The Concert Crowd",
    scene: S`<p>A concert hall sold <b>12,450</b> tickets. During a storm, <b>3,275</b> people left early. Then <b>850</b> people came in late.</p>`,
    think: S`How many people were there at the end? Which part is “take away” and which is “join”?`,
    aha: S`<p>Step 1 — people left (take away): $12{,}450 - 3{,}275 = 9{,}175$.</p>
      <p>Step 2 — people came in (join): $9{,}175 + 850 = 10{,}025$.</p>
      <p>Estimate to check: $12{,}000 - 3{,}000 + 1{,}000 = 10{,}000$ ✓</p>` };

  /* ---------- Unit 2 ---------- */
  T["ch2/mul1"] = { title: "Bags of Marbles",
    scene: S`<p>A toy store has <b>6</b> big boxes, and each box holds <b>347</b> marbles.</p>`,
    think: S`How many marbles in all? Could you split $347$ into pieces that are easy to multiply by $6$?`,
    aha: S`<p>Split $347 = 300 + 40 + 7$ and draw a rectangle with three parts:</p>
      <table><tr><th></th><th>300</th><th>40</th><th>7</th></tr><tr><th>6</th><td>1,800</td><td>240</td><td>42</td></tr></table>
      <p style="margin-top:10px">Add the parts: $1{,}800 + 240 + 42 = 2{,}082$ marbles. This is the <b>area model</b>.</p>` };
  T["ch2/mul2"] = { title: "The Classroom Floor",
    scene: S`<p>A classroom floor is covered with square tiles: <b>23</b> rows with <b>45</b> tiles in each row.</p>`,
    think: S`How many tiles? Break both numbers into tens and ones. How many pieces does the rectangle get cut into?`,
    aha: S`<table><tr><th></th><th>40</th><th>5</th></tr><tr><th>20</th><td>800</td><td>100</td></tr><tr><th>3</th><td>120</td><td>15</td></tr></table>
      <p style="margin-top:10px">Four boxes: $800 + 100 + 120 + 15 = 1{,}035$ tiles.</p>` };
  T["ch2/div"] = { title: "Sharing the Stickers",
    scene: S`<p>Seven friends share <b>96</b> stickers equally. Whatever is left over goes back in the box.</p>`,
    think: S`How many does each friend get? How many go back in the box?`,
    aha: S`<p>Seven groups of $10$ use $70$ stickers; $26$ are left. Seven groups of $3$ more use $21$; now $5$ are left.</p>
      <p>Each friend gets $10 + 3 = 13$, with $5$ left over: $96 \div 7 = 13\ R\ 5$.</p>
      <p>The remainder $5$ is less than $7$ — otherwise everyone could get one more!</p>` };
  T["ch2/rem"] = { title: "The Field Trip",
    scene: S`<p><b>58</b> students are going to the science museum. Each car holds <b>4</b> students.</p>`,
    think: S`$58 \div 4 = 14\ R\ 2$. Is the answer $14$ cars? What happens to the $2$ students?`,
    aha: S`<p>$14$ cars carry $56$ students — but $2$ students would be left at school! We need one more car: <b>15 cars</b>.</p>
      <p>The same division can give three answers, depending on the question: <b>15</b> cars needed, <b>14</b> full cars, <b>2</b> students in the last car.</p>` };
  T["ch2/times"] = { title: "Taller and Taller",
    scene: S`<p>Ben's plant is <b>6</b> inches tall. Ava's sunflower is <b>4 times as tall</b>.</p>`,
    think: S`How tall is the sunflower? How many inches taller than Ben's plant is it? Are those the same question?`,
    aha: S`<p>Draw Ben's plant as one bar and the sunflower as $4$ copies of that bar: $4 \times 6 = 24$ inches.</p>
      <p>“How many <b>more</b>” is different: $24 - 6 = 18$ inches taller.</p>
      <p><b>Times as many</b> → multiply. <b>How many more</b> → subtract.</p>` };

  /* ---------- Unit 3 ---------- */
  T["ch3/fact"] = { title: "Arranging the Chairs",
    scene: S`<p>Mr. Lee has <b>24</b> chairs. He wants to set them up in equal rows with none left over.</p>`,
    think: S`How many different rectangles can he make? Try $1$ row, $2$ rows, $3$ rows…`,
    aha: S`<p>$1 \times 24$, $2 \times 12$, $3 \times 8$, $4 \times 6$ — then the pairs just flip around.</p>
      <p>The numbers $1, 2, 3, 4, 6, 8, 12, 24$ are the <b>factors</b> of $24$. And $24$ is a <b>multiple</b> of each of them.</p>` };
  T["ch3/prime"] = { title: "The Stubborn Number",
    scene: S`<p>Mr. Lee tries the same trick with <b>23</b> chairs. Two rows? One is left over. Three rows? Two left over…</p>`,
    think: S`Can $23$ chairs make any rectangle except one long row?`,
    aha: S`<p>No! The only way is $1 \times 23$. A number whose only factors are $1$ and itself is <b>prime</b>.</p>
      <p>$24$ has lots of rectangles — it is <b>composite</b>. And $1$? It has only one factor, so it is neither prime nor composite.</p>` };
  T["ch3/eqf"] = { title: "Same Chocolate, Smaller Pieces",
    scene: S`<p>Mia's chocolate bar is cut into <b>3</b> pieces and she eats <b>2</b>. Ben's identical bar is cut into <b>12</b> pieces and he eats <b>8</b>.</p>` + FB(3, 2) + FB(12, 8),
    think: S`Who ate more? Look at the shaded lengths.`,
    aha: S`<p>The same amount! Each of Mia's pieces is cut into $4$ smaller pieces, and Ben took $4$ times as many: $\frac23 = \frac{2 \times 4}{3 \times 4} = \frac{8}{12}$.</p>
      <p>Multiplying the top and bottom by the <b>same number</b> keeps the amount the same.</p>` };
  T["ch3/cmpf"] = { title: "The Pizza Contest",
    scene: S`<p>Leo ate $\frac23$ of a pizza. Zoe ate $\frac34$ of the same size pizza.</p>` + FB(3, 2) + FB(4, 3),
    think: S`Who ate more? The pieces are different sizes — how can you make them the same?`,
    aha: S`<p>Cut both pizzas into <b>twelfths</b>: $\frac23 = \frac{8}{12}$ and $\frac34 = \frac{9}{12}$.</p>
      <p>Now the pieces match, and $9 > 8$, so Zoe ate a little more: $\frac34 > \frac23$.</p>` };
  T["ch3/decomp"] = { title: "Building with Fraction Pieces",
    scene: S`<p>Ava has a ribbon that is $\frac58$ of a yard long. She wants to cut it into two pieces for two presents.</p>` + FB(8, 5),
    think: S`What could the two pieces be? Is there more than one way?`,
    aha: S`<p>$\frac58$ is five $\frac18$-pieces. She can split them $1 + 4$, $2 + 3$, …: $\frac58 = \frac18 + \frac48 = \frac28 + \frac38$.</p>
      <p>Breaking a fraction apart only changes the <b>numerators</b> — the piece size stays eighths.</p>` };

  /* ---------- Unit 4 ---------- */
  T["ch4/addf"] = { title: "Painting the Fence",
    scene: S`<p>Ben painted $\frac38$ of a fence in the morning and $\frac48$ in the afternoon.</p>` + FB(8, 7),
    think: S`How much did he paint in all? Should the answer have eighths or sixteenths?`,
    aha: S`<p>The pieces are all eighths, so just count them: $3 + 4 = 7$ eighths, $\frac78$.</p>
      <p>Adding the bottoms ($\frac{7}{16}$) would make the fence pieces smaller — but the pieces didn't change!</p>` };
  T["ch4/mixed"] = { title: "The Long Jump",
    scene: S`<p>Zoe jumped $3\frac14$ meters on her first try and $1\frac34$ meters less on her second try.</p>`,
    think: S`How long was the second jump? You can't take $\frac34$ from $\frac14$ — what can you do?`,
    aha: S`<p>Open one whole meter into $\frac44$: $3\frac14 = 2 + \frac44 + \frac14 = 2\frac54$.</p>
      <p>Now subtract: $2\frac54 - 1\frac34 = 1\frac24 = 1\frac12$ meters. It's just like regrouping in subtraction.</p>` };
  T["ch4/mulfw"] = { title: "Pancake Morning",
    scene: S`<p>One batch of pancakes needs $\frac23$ cup of milk. Ava is making <b>4</b> batches.</p>`,
    think: S`How much milk does she need? Write it as repeated addition first.`,
    aha: S`<p>$\frac23 + \frac23 + \frac23 + \frac23 = \frac83$ — four groups of two-thirds is eight thirds.</p>
      <p>Shortcut: $4 \times \frac23 = \frac{4 \times 2}{3} = \frac83 = 2\frac23$ cups. The piece size (thirds) stays the same.</p>` };
  T["ch4/dec"] = { title: "Dimes and Pennies",
    scene: S`<p>Leo has <b>3 dimes</b> and <b>45 pennies</b>. A dime is $\frac{1}{10}$ of a dollar and a penny is $\frac{1}{100}$.</p>`,
    think: S`What part of a dollar does Leo have? How many pennies are 3 dimes worth?`,
    aha: S`<p>$3$ dimes $= \frac{3}{10} = \frac{30}{100}$ of a dollar. Add the pennies: $\frac{30}{100} + \frac{45}{100} = \frac{75}{100}$.</p>
      <p>As a decimal that is $0.75$ — seventy-five <b>hundredths</b>, or $\$0.75$.</p>` };
  T["ch4/cmpd"] = { title: "The Race",
    scene: S`<p>In a race, Mia finished in <b>9.5</b> seconds and Ben in <b>9.45</b> seconds. Ben says, “$45$ is bigger than $5$, so my time is longer.”</p>`,
    think: S`Who was faster? Line up the decimal points.`,
    aha: S`<p>Write $9.5$ as $9.50$. Now compare: $9.50$ vs $9.45$ — fifty hundredths beat forty-five hundredths, so $9.5 > 9.45$.</p>
      <p>Ben's time is <b>shorter</b>, so Ben was faster. More digits doesn't mean bigger!</p>` };

  /* ---------- Unit 5 ---------- */
  T["ch5/conv"] = { title: "How Tall Are You?",
    scene: S`<p>The nurse says Noah is <b>4 feet 5 inches</b> tall. His form asks for his height in <b>inches</b>.</p>`,
    think: S`How many inches is that? Will the number of inches be bigger or smaller than the number of feet?`,
    aha: S`<p>Each foot is $12$ inches: $4 \times 12 = 48$ inches, plus $5$ more: $53$ inches.</p>
      <p>Changing to a <b>smaller</b> unit gives a <b>bigger</b> number — so multiply.</p>` };
  T["ch5/mword"] = { title: "Saturday Soccer",
    scene: S`<p>Soccer practice starts at <b>9:45 a.m.</b> and ends at <b>12:20 p.m.</b></p>`,
    think: S`How long is practice? Can you just subtract $12{:}20 - 9{:}45$ like normal numbers?`,
    aha: S`<p>Count up: $9{:}45 \to 10{:}00$ is $15$ min; $10{:}00 \to 12{:}00$ is $2$ hours; $12{:}00 \to 12{:}20$ is $20$ min.</p>
      <p>Total: $2$ hours $35$ minutes. Time can't be subtracted like ordinary numbers, because an hour is $60$ minutes, not $100$.</p>` };
  T["ch5/ap"] = { title: "The Garden Fence",
    scene: S`<p>Grandpa's garden is a rectangle <b>8 m</b> long and <b>5 m</b> wide. He needs a fence around it and soil to cover it.</p>`,
    think: S`Is the fence an area or a perimeter question? What about the soil?`,
    aha: S`<p><b>Fence</b> goes around the edge: perimeter $= 8 + 5 + 8 + 5 = 26$ m.</p>
      <p><b>Soil</b> covers the inside: area $= 8 \times 5 = 40$ square meters.</p>` };
  T["ch5/lplot"] = { title: "Measuring Leaves",
    scene: S`<p>The class measured <b>9</b> leaves and marked each length with an ✕.</p>` + LP(8, [2, 3, 3, 4, 4, 4, 5, 6, 6], 2, 6),
    think: S`What length was most common? How much longer is the longest leaf than the shortest?`,
    aha: S`<p>$\frac48$ inch has the tallest stack ($3$ leaves).</p>
      <p>Longest minus shortest: $\frac68 - \frac28 = \frac48$ inch. A line plot lets you count and compare at a glance.</p>` };

  /* ---------- Unit 6 ---------- */
  T["ch6/angm"] = { title: "The Pizza Slice Angle",
    scene: S`<p>A pizza is cut into <b>8</b> equal slices. All the slices meet at the center, and together they go all the way around.</p>`,
    think: S`All the way around is $360^\circ$. How big is the angle at the tip of one slice?`,
    aha: S`<p>$360^\circ \div 8 = 45^\circ$. A slice from a pizza cut in $4$ would have a $90^\circ$ tip — a right angle, like the corner of a page.</p>
      <p>Less than $90^\circ$ is <b>acute</b>, more than $90^\circ$ (but less than $180^\circ$) is <b>obtuse</b>.</p>` };
  T["ch6/angadd"] = { title: "Cutting a Corner",
    scene: S`<p>Ava cuts a square corner of paper with one straight snip. One of the two angles she makes is <b>35°</b>.</p>`,
    think: S`How big is the other angle? What do the two angles add up to?`,
    aha: S`<p>The square corner is $90^\circ$, and the two parts fit together to make it: $35 + \square = 90$, so the other angle is $55^\circ$.</p>
      <p>On a straight edge the parts add to $180^\circ$, and all the way around a point they add to $360^\circ$.</p>` };
  T["ch6/lines"] = { title: "Laser Beams",
    scene: S`<p>A laser pointer shines a beam from the classroom wall out through the window and on forever. A pencil has two ends. A road on a map has arrows at both ends to show it goes on and on.</p>`,
    think: S`Which one is a <b>ray</b>, which one is a <b>segment</b>, and which one is a <b>line</b>?`,
    aha: S`<p>The pencil has two endpoints: a <b>segment</b>. The laser starts at one point and goes on forever one way: a <b>ray</b>. The endless road goes both ways: a <b>line</b>.</p>
      <p>Railroad tracks are <b>parallel</b> (they never meet); a street crossing at a square corner is <b>perpendicular</b>.</p>` };
  T["ch6/shapes"] = { title: "The Shape Family Tree",
    scene: S`<p>Leo says, “A square isn't a rectangle — it's a square!” Zoe says, “A square <b>is</b> a rectangle.”</p>`,
    think: S`What does a shape need to be a rectangle? Does a square have it?`,
    aha: S`<p>A rectangle needs $4$ sides and $4$ right angles. A square has all of that — plus equal sides. So a square is a <b>special rectangle</b> (and a special rhombus).</p>
      <p>Zoe is right. Shapes belong to families: every square is a rectangle, but not every rectangle is a square.</p>` };
  T["ch6/sym"] = { title: "The Butterfly Fold",
    scene: S`<p>Mia paints one half of a butterfly on a sheet of paper, folds it while the paint is wet, and opens it up.</p>`,
    think: S`Why do the two halves match exactly? Where is the fold?`,
    aha: S`<p>The fold is a <b>line of symmetry</b>: everything on one side has a matching point the same distance away on the other side.</p>
      <p>A square has $4$ such fold lines, a rectangle only $2$, and a regular hexagon $6$.</p>` };

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
  window.GRADE4_STORIES = T;
})();

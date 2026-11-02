/* =====================================================================
   PROF. FANG MATH — GEOMETRY STORIES
   A short story before every Geometry lesson: experience first, then the
   idea, then the symbols. Keyed by "chapterId/topicId". Drawn above the
   lesson card by drawStory(), which geometry-levels.html calls in
   openLesson(). Two lessons also get a drag-the-points explorer.
   ===================================================================== */
(function () {
  const S = String.raw;

  /* ---------- styles ---------- */
  const css = S`
  .story{background:linear-gradient(135deg,#FFF8EA,#fff 70%);border:1.5px solid var(--gold);border-radius:var(--radius);padding:22px 24px;margin:0 0 18px;box-shadow:var(--shadow)}
  .story .label{color:#8A6415}
  .story h3{font-family:Fraunces,Georgia,serif;font-size:24px;margin:4px 0 10px}
  .story p{margin:0 0 10px;line-height:1.65}
  .story .think{background:#fff;border:1px dashed var(--gold);border-radius:12px;padding:12px 14px;margin:12px 0}
  .story .think b{color:#8A6415}
  .story .aha{background:var(--teal-soft);border-radius:12px;padding:12px 14px;margin-top:12px}
  .story .aha p:last-child{margin-bottom:0}
  .story .more{border-top:1.5px dashed var(--gold);margin-top:20px;padding-top:16px}
  .story table{border-collapse:collapse;width:100%;margin:10px 0 0;font-size:15px;background:#fff;border-radius:10px;overflow:hidden}
  .story th,.story td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}
  .story th{background:var(--bg)}
  .story .sbtn{border:1px solid var(--gold);background:#fff;color:#8A6415;border-radius:999px;padding:7px 14px;font-weight:600;cursor:pointer;font:inherit;font-size:14px}
  .story .sbtn:hover{background:var(--gold-soft)}
  .xp{background:#fff;border:1px solid var(--line);border-radius:14px;padding:12px;margin:12px 0}
  .xp .tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
  .xp .tabs button{border:1px solid var(--line);background:#fff;border-radius:999px;padding:6px 12px;font:inherit;font-size:14px;font-weight:600;color:var(--muted);cursor:pointer}
  .xp .tabs button.on{background:var(--teal);border-color:var(--teal);color:#fff}
  .xp > svg{width:100%;max-width:420px;height:auto;display:block;margin:0 auto;touch-action:none;user-select:none}
  .xp .read{font-size:15px;text-align:center;margin-top:6px;min-height:48px}
  .xp .tip{font-size:13px;color:var(--faint);text-align:center}
  .xp circle.drag{cursor:grab}
  `;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ---------- the stories ---------- */
  const T = {};
  T["ch1/segadd"] = {
    title: "The Road Trip",
    scene: S`<p>You drive from home ($A$) to the gas station ($B$): $12$ miles. Then from the gas station to Grandma's house ($C$): $18$ miles. The gas station is right <b>on</b> the straight road between home and Grandma's.</p>`,
    think: S`How far is Grandma's house from home? And if the whole road were $30$ miles and you had already driven $12$, how many miles would be left?`,
    aha: S`<p>The two parts of the trip fill the whole road: $12 + 18 = 30$ miles. And $30 - 12 = 18$ miles are left.</p>
      <p>That is the <b>Segment Addition Postulate</b>: if $B$ is between $A$ and $C$, then $AB + BC = AC$. Part $+$ part $=$ whole, and whole $-$ part $=$ the other part.</p>
      <p><b>Careful:</b> if the gas station were <i>off</i> the road, the trip $A \to B \to C$ would be <b>longer</b> than going straight from $A$ to $C$. “Between” matters.</p>`,
  };
  T["ch1/seg"] = {
    title: "Meet in the Middle",
    widget: "mid",
    scene: S`<p><b>On one street.</b> Mia lives at house $2$ on Maple Street and Leo lives at house $8$. They want to meet so that <b>both walk the same distance</b>. Where should they meet?</p>
      <p><b>In the city.</b> Now Mia is at $(2, 3)$ and Leo is at $(8, 7)$ on the city grid. They walk straight toward each other. Where do they meet?</p>`,
    think: S`Before you look at the formula, drag Mia and Leo below. Try the street first, then the city. What do you notice about the <b>shadows</b> on the axes?`,
    aha: S`<p><b>One idea does everything: start where you are, then walk half the trip.</b></p>
      <svg viewBox="0 0 420 92" style="width:100%;max-width:420px;display:block;margin:4px auto 8px" role="img" aria-label="Number line: an arrow of +3 from 2 and an arrow of -3 from 8 both reach 5">
        <defs><marker id="mtA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="#0F7C7C"/></marker><marker id="mtB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="#B7791F"/></marker></defs>
        <line x1="20" y1="50" x2="400" y2="50" stroke="#94A3B8" stroke-width="2"/>
        <g font-family="Inter,sans-serif" font-size="12" fill="#475569" text-anchor="middle">
          <g stroke="#94A3B8"><line x1="20" y1="45" x2="20" y2="55"/><line x1="58" y1="45" x2="58" y2="55"/><line x1="96" y1="45" x2="96" y2="55"/><line x1="134" y1="45" x2="134" y2="55"/><line x1="172" y1="45" x2="172" y2="55"/><line x1="210" y1="45" x2="210" y2="55"/><line x1="248" y1="45" x2="248" y2="55"/><line x1="286" y1="45" x2="286" y2="55"/><line x1="324" y1="45" x2="324" y2="55"/><line x1="362" y1="45" x2="362" y2="55"/><line x1="400" y1="45" x2="400" y2="55"/></g>
          <text x="20" y="70">0</text><text x="96" y="70">2</text><text x="210" y="70">5</text><text x="324" y="70">8</text><text x="400" y="70">10</text>
        </g>
        <circle cx="96" cy="50" r="6" fill="#0F7C7C"/><circle cx="324" cy="50" r="6" fill="#B7791F"/><circle cx="210" cy="50" r="5" fill="#1F3A68"/>
        <path d="M100 36 Q153 14 204 34" fill="none" stroke="#0F7C7C" stroke-width="2.5" marker-end="url(#mtA)"/>
        <path d="M320 36 Q267 14 216 34" fill="none" stroke="#B7791F" stroke-width="2.5" marker-end="url(#mtB)"/>
        <g font-family="Inter,sans-serif" font-size="13" font-weight="700" text-anchor="middle"><text x="150" y="14" fill="#0F7C7C">Mia: +3</text><text x="270" y="14" fill="#B7791F">Leo: −3</text><text x="96" y="88" fill="#0F7C7C">A</text><text x="324" y="88" fill="#B7791F">B</text><text x="210" y="88" fill="#1F3A68">M</text></g>
      </svg>
      <p><b>1. Mia's trip.</b> From $A = 2$ to $B = 8$ the trip is $8 - 2 = +6$ (the $+$ means “to the right”). Half the trip is $+3$, so they meet at $2 + 3 = 5$.</p>
      <p><b>2. Leo's trip.</b> From $B = 8$ back to $A = 2$ the trip is $2 - 8 = -6$ (the $-$ means “to the left”). Half is $-3$, and $8 + (-3) = 5$. <b>Same place!</b></p>
      <p><b>Tiny new idea — a vector.</b> A trip that remembers its <b>direction</b> is called a <i>vector</i>, drawn as an arrow. $\overrightarrow{AB} = +6$ and $\overrightarrow{BA} = -6$ have the same length but point opposite ways. The sign does the bookkeeping, so it never matters who starts.</p>
      <p><b>3. Turn it into the formula.</b> Start plus half the trip:</p>
      <p style="text-align:center">$x_1 + \dfrac{x_2 - x_1}{2} = \dfrac{2x_1 + x_2 - x_1}{2} = \dfrac{x_1 + x_2}{2}$</p>
      <p>So “start + half the trip” is exactly the <b>average</b> of the two ends. It even works with negatives: from $-3$ to $5$ the trip is $+8$, half is $+4$, and $-3 + 4 = 1 = \dfrac{-3 + 5}{2}$.</p>
      <p><b>4. On the $xOy$ plane</b>, the trip arrow has two parts: $\overrightarrow{AB} = \langle 8 - 2,\ 7 - 3\rangle = \langle 6, 4\rangle$, which is $6$ east and $4$ north. Half the trip is $\langle 3, 2\rangle$, so $M = (2 + 3,\ 3 + 2) = (5, 5)$. From Leo's side, $\overrightarrow{BA} = \langle -6, -4\rangle$, half is $\langle -3, -2\rangle$, and $(8 - 3,\ 7 - 2) = (5, 5)$. Same point. Each direction is its own number-line problem:</p>
      <p style="text-align:center">$M = \left(\dfrac{x_1 + x_2}{2},\ \dfrac{y_1 + y_2}{2}\right)$</p>
      <table><tr><th></th><th>On a line</th><th>On the $xOy$ plane</th></tr>
      <tr><td>The trip $\overrightarrow{AB}$</td><td>$x_2 - x_1$</td><td>$\langle x_2 - x_1,\ y_2 - y_1\rangle$</td></tr>
      <tr><td>Midpoint = start + half the trip</td><td>$\dfrac{x_1 + x_2}{2}$</td><td>$\left(\dfrac{x_1 + x_2}{2}, \dfrac{y_1 + y_2}{2}\right)$</td></tr>
      <tr><td>Distance = length of the trip</td><td>$|x_2 - x_1|$</td><td>$\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ (next lesson)</td></tr></table>
      <p style="margin-top:10px"><b>Careful:</b> $\dfrac{x_2 - x_1}{2}$ alone is <i>half the trip</i> (how far to walk), not the meeting place. Always add it to the start.</p>
      <p><b>The same idea goes further.</b> A third of the way from $A$: $A + \tfrac13\overrightarrow{AB}$, so from $(2, 3)$ that is $(2 + 2,\ 3 + \tfrac43)$. Know $A$ and the midpoint $M$ but not $B$? Walk the trip $\overrightarrow{AM}$ one more time from $M$: $B = M + (M - A) = 2M - A$. For example, $(5 + 3,\ 5 + 2) = (8, 7)$.</p>`,
  };
  T["ch1/dist"] = {
    title: "The Taxi and the Crow",
    widget: "dist",
    scene: S`<p>Mia is at $(1, 2)$ and the library is at $(4, 6)$. A taxi has to follow the streets: $3$ blocks east, then $4$ blocks north, for $7$ blocks in all. A crow flies <b>straight</b> from Mia to the library.</p>`,
    think: S`Is the crow's trip shorter than $7$? Drag the points below and look at the shape the taxi path and the crow path make together.`,
    aha: S`<p>The taxi's two legs and the crow's path form a <b>right triangle</b>. The crow flies along the hypotenuse, so by the Pythagorean Theorem it flies $\sqrt{3^2 + 4^2} = \sqrt{25} = 5$ blocks.</p>
      <p>That is the whole distance formula: $d = \sqrt{(\Delta x)^2 + (\Delta y)^2}$. On a number line there is only one direction, so the distance is just $|b - a|$. On the plane, the two directions are combined by Pythagoras, <b>not</b> by adding.</p>`,
  };
  T["ch1/ang"] = {
    title: "Corners, Straight Edges and Scissors",
    scene: S`<p>You are fitting two puzzle pieces into the <b>corner</b> of a picture frame, which is a square corner. Then you fit two other pieces along a <b>straight edge</b>. Finally, you open a pair of scissors and look at the two blades crossing.</p>`,
    think: S`One piece in the corner is $35^\circ$. How big is the other one? What if the same $35^\circ$ piece sat on the straight edge instead?`,
    aha: S`<p>A square corner is $90^\circ$, so the two pieces are <b>complementary</b>: $90 - 35 = 55^\circ$. A straight edge is $180^\circ$, so pieces there are <b>supplementary</b>: $180 - 35 = 145^\circ$.</p>
      <p>When scissors open, the two openings <b>across</b> from each other always match. Each one forms a straight line with the same neighbor, so they must be equal. Those are <b>vertical angles</b>.</p>`,
  };
  T["ch2/tcp"] = {
    title: "The Detective's Notebook",
    scene: S`<p>A detective can't just say “the butler did it.” In court, every claim needs evidence: <i>“The butler had the key — <b>witness statement</b>. The key opens the safe — <b>lab test</b>. So the butler could open the safe — <b>both facts above</b>.”</i></p>
      <p>Her notebook has two columns: <b>what I claim</b> on the left, <b>how I know</b> on the right.</p>`,
    think: S`In math, what counts as “evidence”? If you write $2x = 8$ right after $2x + 5 = 13$, what is your evidence?`,
    aha: S`<p>A <b>two-column proof</b> is the detective's notebook. Left column: <b>statements</b>, one small step at a time. Right column: <b>reasons</b> — only things everyone agrees on: what was <b>given</b>, a <b>definition</b>, a <b>property</b> (like the Subtraction Property of Equality), a <b>postulate</b>, or a <b>theorem</b> already proved.</p>
      <p>Going from $2x + 5 = 13$ to $2x = 8$, the evidence is “I subtracted $5$ from both sides” — the <b>Subtraction Property of Equality</b>. Line $1$ is always the given; the last line is always what you had to prove.</p>`,
  };
  T["ch3/par"] = {
    title: "The Road Across the Railroad",
    scene: S`<p>A straight road crosses two <b>parallel</b> train tracks. A surveyor measures the four angles where the road meets the first track. She is tired and doesn't want to walk to the second track.</p>`,
    think: S`Does she need to measure again at the second track? Imagine sliding the first crossing along the road until it sits on the second track.`,
    aha: S`<p>Because the tracks are parallel, sliding the first crossing lands it <b>exactly</b> on the second one. Every angle has a matching copy: these are <b>corresponding angles</b>, and they are equal.</p>
      <p>So there are only two sizes of angle in the whole picture: all the sharp (acute) ones are equal, all the wide (obtuse) ones are equal, and one sharp plus one wide always makes a straight line, $180^\circ$.</p>`,
  };
  T["ch3/slope"] = {
    title: "Ski Runs and Crossroads",
    scene: S`<p>Two ski runs go down the same mountain side by side with exactly the same steepness. They never meet. Then a cable car line crosses the slope at a perfect right angle.</p>`,
    think: S`A run rises $2$ for every $3$ across (slope $\tfrac23$). Draw that little slope triangle and turn it a quarter turn. What are its new rise and run?`,
    aha: S`<p>Lines that never meet must climb at the same rate: <b>parallel lines have equal slopes</b>.</p>
      <p>Turning the slope triangle $90^\circ$ swaps rise and run, and one of them changes direction: $\tfrac23$ becomes $-\tfrac32$. Perpendicular slopes are <b>negative reciprocals</b>, and they multiply to $-1$.</p>`,
  };
  T["ch4/tri"] = {
    title: "Tear Off the Corners",
    scene: S`<p>Cut any triangle out of paper. Tear off its three corners and line them up side by side, with their points touching.</p>`,
    think: S`What shape do the three corners make together? Will that happen for a long skinny triangle too?`,
    aha: S`<p>They always line up into a <b>straight line</b>: the three angles of any triangle add to $180^\circ$.</p>
      <p>Now stretch one side past a corner. The outside angle and the inside angle at that corner make a straight line ($180^\circ$). The other two inside angles also make $180^\circ$ with that same corner. So the <b>exterior angle equals the two far (remote) interior angles added together</b>.</p>`,
  };
  T["ch4/iso"] = {
    title: "Folding a Tent",
    scene: S`<p>The front of a camping tent is a triangle with two equal poles meeting at the top. Fold the picture along the center line from the top straight down.</p>`,
    think: S`When you fold it, which parts land on top of each other?`,
    aha: S`<p>The two equal poles match, so the two angles at the ground (the <b>base angles</b>) land exactly on each other: in an isosceles triangle, the base angles are equal.</p>
      <p>If <b>all three</b> sides are equal, you can fold it three ways, so all three angles are equal: $180 \div 3 = 60^\circ$ each.</p>`,
  };
  T["ch4/cong"] = {
    title: "Copy a Triangle by Text Message",
    scene: S`<p>You need to text a friend instructions so she can cut out a triangle that is an <b>exact</b> copy of yours. You can only send a few measurements.</p>`,
    think: S`Is it enough to send the three side lengths? Two sides and an angle? Three angles?`,
    aha: S`<p>Three sticks can be joined into only <b>one</b> triangle. That's why bridges use triangles, and it's <b>SSS</b>. Two sides with the angle <b>between</b> them lock the shape like a hinge set in place: <b>SAS</b>. Two angles plus a side work too: <b>ASA</b> and <b>AAS</b>.</p>
      <p>But two sides and an angle <b>not</b> between them (SSA) can swing into two different triangles, so it isn't enough. Three angles (AAA) give the right shape but not the right size. For right triangles, the hypotenuse plus one leg is enough: <b>HL</b>.</p>`,
  };
  T["ch2/pat"] = {
    title: "Toothpick Squares",
    scene: S`<p>One square in a row uses $4$ toothpicks. Two squares in a row use $7$. Three squares use $10$.</p>`,
    think: S`How many toothpicks do $50$ squares need? Find the rule before you count.`,
    aha: S`<p>Each new square adds $3$ toothpicks, so $n$ squares need $3n + 1$. For $50$ squares that's $151$. Spotting a pattern and using it to predict is <b>inductive reasoning</b>.</p>
      <p>A rule you guess from a pattern is called a <b>conjecture</b>. But be careful: patterns can fool you. Dots on a circle joined in every way cut it into $1, 2, 4, 8, 16, \ldots$ regions, and then $31$, not $32$! That single case breaks the “doubling” guess. One case that breaks a guess has a name — read Story 2 to find out what it is.</p>`,
    more: [{
      title: "Can I Have It, Mom?",
      scene: S`<p>You really want a new pair of sneakers. So you go to Mom and make your case:</p>
        <p><i>“<b>Everybody</b> in my class has them! Jake has them. Mia has them. Leo has them too!”</i></p>
        <p>Jake, Mia and Leo are <b>examples</b>. You use examples to <b>convince</b> someone — the more you name, the stronger your case sounds.</p>
        <p>Mom smiles and says just one sentence: <i>“Sam doesn't have them.”</i></p>`,
      think: S`Did Mom need to name ten kids without the sneakers? How many does it take to show that “everybody has them” is not true?`,
      aha: S`<p><b>Just one.</b> Sam is a <b>counterexample</b>. <i>Counter</i> means <b>against</b>: examples speak <b>for</b> a claim, a counterexample speaks <b>against</b> it.</p>
        <table><tr><th></th><th>Example</th><th>Counterexample</th></tr>
          <tr><td><b>Job</b></td><td>Supports the claim — tries to convince you</td><td>Shows the claim is <b>false</b></td></tr>
          <tr><td><b>How many?</b></td><td>Even $100$ examples can't prove “every”</td><td><b>One</b> is enough</td></tr>
          <tr><td><b>Sneakers</b></td><td>Jake, Mia, Leo</td><td>Sam</td></tr></table>
        <p style="margin-top:12px"><b>Now in math.</b> Claim: “Every prime number is odd.” $3, 5, 7, 11$ are examples — they make it sound true. But $2$ is prime and <b>even</b>. One counterexample, and the claim is false.</p>
        <p>For an if–then claim, a counterexample makes the <b>“if” part true</b> but the <b>“then” part false</b>. “If a number is divisible by $2$, then it is divisible by $4$”: try $6$. Divisible by $2$ ✓, divisible by $4$ ✗. Claim broken!</p>`
    }]
  };
  T["ch2/cond"] = {
    title: "Rain and Wet Ground",
    scene: S`<p>“If it rains, then the ground is wet.” That's true. Your friend says, “The ground is wet, so it must have rained.”</p>`,
    think: S`Is your friend right? Can you think of another way the ground gets wet?`,
    aha: S`<p>A sprinkler! The <b>converse</b> (“if wet, then rained”) can be false even when the original is true.</p>
      <p>But “If the ground is <b>not</b> wet, then it did <b>not</b> rain” must be true. That's the <b>contrapositive</b>, and it always agrees with the original statement. The converse and the inverse always agree with each other.</p>`,
  };
  T["ch2/proof"] = {
    title: "The Detective's Notebook",
    scene: S`<p>A detective can't just announce “The butler did it.” Every claim in her notebook needs a piece of evidence next to it, or the judge throws it out.</p>`,
    think: S`Solve $x + 5 = 12$. For each step you write, what “evidence” makes it allowed?`,
    aha: S`<p>A proof is a detective's notebook: each line is a <b>statement</b> and next to it is a <b>reason</b>. Going from $x + 5 = 12$ to $x = 7$ is allowed by the <b>Subtraction Property of Equality</b>.</p>
      <p>Reasons are always things everyone already agrees on: definitions, properties of equality, postulates, or theorems you have already proved.</p>`,
  };
  T["ch5/mid"] = {
    title: "The A-Frame Swing Set",
    scene: S`<p>An A-frame swing set has two legs meeting at the top. A crossbar is bolted to the <b>middle</b> of each leg. Then a cardboard triangle is balanced on the tip of a pencil.</p>`,
    think: S`How does the crossbar compare with the distance between the feet on the ground? Where on the cardboard triangle does it balance?`,
    aha: S`<p>The crossbar is <b>parallel</b> to the ground and exactly <b>half as long</b> as the distance between the feet. The small top triangle is a half-size copy of the big one. That's the <b>Midsegment Theorem</b>, and it uses midpoints again.</p>
      <p>The balance point is where the three <b>medians</b> meet (the <b>centroid</b>). It sits $\tfrac23$ of the way from each corner to the midpoint of the opposite side.</p>`,
  };
  T["ch5/ineq"] = {
    title: "Three Sticks on the Table",
    scene: S`<p>You have sticks of length $2$, $3$ and $7$. Try to make a triangle. Then open a door a little, then wider.</p>`,
    think: S`Why can't $2$, $3$ and $7$ make a triangle? When the door opens wider, what happens to the gap across from the hinge?`,
    aha: S`<p>Even laid flat, $2 + 3 = 5$ can't reach across $7$. Any two sides must add to <b>more</b> than the third.</p>
      <p>The wider the door opens (the bigger the angle), the longer the gap across from it. So the <b>largest angle is opposite the longest side</b>.</p>`,
  };
  T["ch5/conc"] = {
    title: "Three Towns and a Fire Station",
    scene: S`<p>Three towns want one fire station <b>the same distance</b> from all three. A triangular park wants the biggest round fountain that <b>touches all three walls</b>.</p>`,
    think: S`All the points the same distance from two towns form a line. Which line is it?`,
    aha: S`<p>Points equally far from two towns lie on the <b>perpendicular bisector</b> of the road between them. Draw all three, and they meet at the <b>circumcenter</b>: the fire station.</p>
      <p>Points equally far from two walls lie on the <b>angle bisector</b>. The three meet at the <b>incenter</b>: the center of the fountain. Medians meet at the balance point (the <b>centroid</b>), and altitudes meet at the <b>orthocenter</b>.</p>`,
  };
  T["ch6/poly"] = {
    title: "A Walk Around the Park",
    scene: S`<p>You walk all the way around a five-sided park, turning left at each corner, until you are back where you started and facing the same way.</p>`,
    think: S`How far did you turn in total? Does the number of corners change that?`,
    aha: S`<p>You made one full turn: the <b>exterior angles always add to $360^\circ$</b>, for any polygon.</p>
      <p>For the inside angles, stand in one corner and draw lines to all the other corners. An $n$-gon splits into $n - 2$ triangles, so the <b>interior angles add to $(n - 2) \cdot 180^\circ$</b>.</p>`,
  };
  T["ch6/para"] = {
    title: "The Folding Gate",
    scene: S`<p>A folding gate is made of bars bolted into parallelograms. As you push it closed, the shapes lean over, but the bars never change length.</p>`,
    think: S`As the gate folds, what stays the same? Where do the two diagonals of each parallelogram cross?`,
    aha: S`<p><b>Opposite sides</b> stay equal and <b>opposite angles</b> stay equal. Two angles next to each other are same-side interior angles between parallel bars, so they add to $180^\circ$.</p>
      <p>The diagonals always cross at the <b>midpoint</b> of each other. That's the midpoint idea from Chapter 1 again!</p>`,
  };
  T["ch6/trap"] = {
    title: "A Stack of Logs",
    scene: S`<p>Logs are stacked in a trapezoid shape: $10$ logs on the bottom row, $4$ on the top row, and each row has one fewer log than the row below.</p>`,
    think: S`How many logs are in the middle row? Can you get it without counting every row?`,
    aha: S`<p>The middle row has $\dfrac{10 + 4}{2} = 7$ logs, the <b>average</b> of the two bases. The midsegment of a trapezoid is $\dfrac{b_1 + b_2}{2}$. It's a midpoint idea again.</p>
      <p>A real <b>kite</b> folds in half along its spine, so one pair of opposite angles match and its diagonals cross at right angles.</p>`,
  };
  T["ch7/ratio"] = {
    title: "The Photocopier",
    scene: S`<p>You enlarge a $2$ cm by $3$ cm photo at $200\%$ on a copier.</p>`,
    think: S`What happens to the side lengths, the angles, the perimeter, and the amount of paper the photo covers?`,
    aha: S`<p>Every length doubles ($4$ by $6$), the angles stay the same, and the perimeter doubles. But the area goes from $6$ to $24$: it grows by $2^2 = 4$.</p>
      <p>Similar figures with scale factor $k$: lengths $\times k$, areas $\times k^2$.</p>`,
  };
  T["ch7/prove"] = {
    title: "Measuring a Tree with Your Shadow",
    scene: S`<p>At 4 p.m. you are $1.5$ m tall and your shadow is $2$ m long. At the same moment, a tree's shadow is $12$ m long.</p>`,
    think: S`Why are the triangle made by you and your shadow and the triangle made by the tree and its shadow the same shape?`,
    aha: S`<p>Both stand straight up ($90^\circ$), and the sun's rays hit the ground at the same angle for both. Two pairs of equal angles: <b>AA similarity</b>.</p>
      <p>So the sides are proportional: $\dfrac{h}{12} = \dfrac{1.5}{2}$, and the tree is $9$ m tall. Similar triangles can also be proved by <b>SSS~</b> or <b>SAS~</b>.</p>`,
  };
  T["ch7/split"] = {
    title: "Lined Notebook Paper",
    scene: S`<p>Lay a pencil across lined notebook paper at a slant. The equally spaced lines cut the pencil into pieces.</p>`,
    think: S`Are the pieces equal? What if you tilt the pencil more?`,
    aha: S`<p>The pieces stay equal however you tilt it: parallel lines cut every slanted line <b>in the same proportions</b>. In a triangle, a line parallel to one side splits the other two sides proportionally.</p>
      <p>In a right triangle, the altitude to the hypotenuse makes two smaller copies of the big triangle. Matching their sides gives the <b>geometric mean</b>: altitude$^2$ = (one piece) $\cdot$ (other piece).</p>`,
  };
  T["ch8/special"] = {
    title: "Two Tiles You Can Carry in Your Head",
    scene: S`<p>Cut a square tile with side $1$ corner to corner. Then cut an equilateral triangle with side $2$ straight down the middle.</p>`,
    think: S`How long is the square's diagonal? What are the three sides of half of the equilateral triangle?`,
    aha: S`<p>The square gives a $45$-$45$-$90$ triangle with legs $1, 1$ and hypotenuse $\sqrt{1^2 + 1^2} = \sqrt2$.</p>
      <p>The half triangle is $30$-$60$-$90$: short leg $1$, hypotenuse $2$, long leg $\sqrt{2^2 - 1^2} = \sqrt3$. Scale them up and you have $x, x, x\sqrt2$ and $x, x\sqrt3, 2x$.</p>`,
  };
  T["ch8/trig"] = {
    title: "Ramps of Every Size",
    scene: S`<p>A toy ramp and a highway ramp are both built at exactly $10^\circ$. One is $1$ m long, the other $100$ m long.</p>`,
    think: S`For each ramp, divide the height by the length of the ramp. Do you get the same number?`,
    aha: S`<p>Yes! Every right triangle with a $10^\circ$ angle is <b>similar</b>, so its side ratios are always the same. The ratio depends only on the angle.</p>
      <p>That's why these ratios get names: $\sin = \dfrac{\text{opp}}{\text{hyp}}$, $\cos = \dfrac{\text{adj}}{\text{hyp}}$, $\tan = \dfrac{\text{opp}}{\text{adj}}$ (SOH-CAH-TOA).</p>`,
  };
  T["ch8/app"] = {
    title: "How Tall Is That Tree?",
    scene: S`<p>You can't climb the tree, but you can walk $20$ m away from it and measure the angle up to its top: $45^\circ$.</p>`,
    think: S`Which trig ratio links the $20$ m you walked with the height you want?`,
    aha: S`<p>The height is opposite the angle and the $20$ m is adjacent, so $\tan 45^\circ = \dfrac{h}{20}$. Since $\tan 45^\circ = 1$, the tree is $20$ m tall.</p>
      <p>The exact values come from the two special triangles: $\sin 30^\circ = \tfrac12$, $\sin 45^\circ = \tfrac{\sqrt2}{2}$, $\sin 60^\circ = \tfrac{\sqrt3}{2}$.</p>`,
  };
  T["ch9/tr"] = {
    title: "Footprints and Mirrors",
    scene: S`<p>Footprints in the sand all point the same way and are the same size, just moved along the beach. Then you stand in front of a mirror and raise your right hand.</p>`,
    think: S`Put a mirror along the $y$-axis. A point is at $(3, 2)$. Where is its reflection? What changed and what didn't?`,
    aha: S`<p>Footprints are a <b>translation</b>: every point slides the same way, $(x, y) \to (x + a, y + b)$.</p>
      <p>A mirror on the $y$-axis flips left and right but keeps the height: $(3, 2) \to (-3, 2)$, so $(x, y) \to (-x, y)$. A mirror on the $x$-axis flips up and down: $(x, -y)$. A mirror on $y = x$ swaps the coordinates: $(y, x)$.</p>`,
  };
  T["ch9/rot"] = {
    title: "Turning a Picture on a Pin",
    scene: S`<p>A picture is pinned to the board at the origin. A star in it is at $(3, 1)$. Turn the picture a quarter turn counterclockwise.</p>`,
    think: S`Where does the star go? Hint: what was pointing “right” now points “up.”`,
    aha: S`<p>The star moves to $(-1, 3)$: a $90^\circ$ counterclockwise turn sends $(x, y) \to (-y, x)$. A half turn sends it to $(-x, -y)$.</p>
      <p>A projector does a <b>dilation</b>: every point moves away from the light in a straight line, $k$ times as far: $(x, y) \to (kx, ky)$. The shape stays the same; only the size changes.</p>`,
  };
  T["ch9/sym"] = {
    title: "Snowflakes and Kaleidoscopes",
    scene: S`<p>A paper snowflake looks the same after you fold it or turn it a little. In a kaleidoscope, two mirrors meet at an angle.</p>`,
    think: S`How many ways can you fold a regular hexagon so the halves match? How small a turn brings it back to itself?`,
    aha: S`<p>A regular $n$-gon has $n$ lines of symmetry and looks the same after turning $\dfrac{360^\circ}{n}$. For a hexagon: $6$ lines and $60^\circ$.</p>
      <p>Two mirrors facing each other (parallel) act like a <b>slide</b>. Two mirrors meeting at an angle (a kaleidoscope) act like a <b>turn</b> by twice that angle.</p>`,
  };
  T["ch10/arcs"] = {
    title: "Seats in a Round Theater",
    scene: S`<p>A stage takes up part of the wall of a round theater. The director stands at the center; the audience sits around the curved wall.</p>`,
    think: S`Does the stage look wider to the director or to someone in the audience? Do two people in different seats see it the same?`,
    aha: S`<p>From the center, the stage fills the <b>central angle</b>, which equals the arc. From any seat on the wall, it fills an <b>inscribed angle</b> that is exactly <b>half</b>, and it's the same for every seat on that side.</p>
      <p>If the stage is half the wall (a semicircle), everyone on the edge sees it at $\tfrac12 \cdot 180^\circ = 90^\circ$.</p>`,
  };
  T["ch10/seg"] = {
    title: "A Wheel on the Road",
    scene: S`<p>A bicycle wheel rolls along a flat road. The road touches the wheel at just one point. Then you hold a ball and wrap two strings from your hand around it.</p>`,
    think: S`What angle does the spoke at the bottom make with the road? Are the two strings the same length?`,
    aha: S`<p>The spoke pointing straight down meets the road at $90^\circ$: a <b>tangent is perpendicular to the radius</b>.</p>
      <p>The two strings from your hand are equal: <b>two tangents from the same point are equal</b>. When two chords cross inside a circle, their pieces balance: $a \cdot b = c \cdot d$.</p>`,
  };
  T["ch10/eq"] = {
    title: "The Lawn Sprinkler",
    scene: S`<p>A sprinkler at $(3, 2)$ sprays water exactly $5$ m in every direction. Later you cut a slice from a round pizza.</p>`,
    think: S`Every point at the edge of the wet circle is how far from $(3, 2)$? Write that with the distance formula.`,
    aha: S`<p>Every edge point $(x, y)$ is $5$ away, so $\sqrt{(x - 3)^2 + (y - 2)^2} = 5$. Square both sides: $(x - 3)^2 + (y - 2)^2 = 25$. A circle's equation is just the distance formula!</p>
      <p>A slice with angle $\theta$ is $\dfrac{\theta}{360}$ of the pizza, so its crust (arc length) is $\dfrac{\theta}{360} \cdot 2\pi r$ and its area is $\dfrac{\theta}{360} \cdot \pi r^2$.</p>`,
  };
  T["ch11/poly"] = {
    title: "Cut and Slide",
    scene: S`<p>Cut a triangle off one end of a paper parallelogram and slide it to the other end. Then put two copies of the same trapezoid together, one upside down.</p>`,
    think: S`What shape do you get each time? How does that help you find the area?`,
    aha: S`<p>The parallelogram becomes a rectangle with the same base and height: $A = bh$. A triangle is half of a parallelogram: $\tfrac12 bh$.</p>
      <p>Two trapezoids make a parallelogram with base $b_1 + b_2$, so one trapezoid is $\tfrac12 (b_1 + b_2) h$. A rhombus or kite is half of the rectangle around it: $\tfrac12 d_1 d_2$.</p>`,
  };
  T["ch11/circ"] = {
    title: "Unrolling a Pizza",
    scene: S`<p>Cut a round pizza into many thin slices. Line them up side by side, alternating point-up and point-down.</p>`,
    think: S`What shape does the row of slices look like? How wide and how tall is it?`,
    aha: S`<p>It looks like a rectangle. Its height is the radius $r$, and its width is half the crust, $\pi r$. So the area is $\pi r \cdot r = \pi r^2$.</p>
      <p>For a <b>shaded region</b> like a donut, take the whole area and subtract the hole: big area $-$ small area.</p>`,
  };
  T["ch11/reg"] = {
    title: "A Pizza Made of Triangles",
    scene: S`<p>A hexagon-shaped table splits into $6$ identical triangles that all meet at the center. Each triangle's base is a side of the table, and its height is the distance from the center to that side (the <b>apothem</b>).</p>`,
    think: S`Add up the areas of the $6$ triangles. Can you write the total using the perimeter?`,
    aha: S`<p>Each triangle is $\tfrac12 \cdot \text{side} \cdot a$, and the six sides make the perimeter, so the area is $\tfrac12 \cdot a \cdot P$. This works for any regular polygon.</p>
      <p>For a triangle with two sides and the angle between them, the height is $b \sin C$, so the area is $\tfrac12 ab\sin C$.</p>`,
  };
  T["ch12/prism"] = {
    title: "A Stack of Paper",
    scene: S`<p>A ream of paper is a stack of identical rectangles. A roll of coins is a stack of identical circles. Now push the stack so it leans over.</p>`,
    think: S`How does the amount of paper depend on the size of one sheet and how tall the stack is? Does leaning change it?`,
    aha: S`<p>Volume is <b>one layer's area times the height</b>: $V = Bh$. For a cylinder, $V = \pi r^2 h$.</p>
      <p>Leaning the stack doesn't add or remove any paper, so the volume stays the same (<b>Cavalieri's principle</b>).</p>`,
  };
  T["ch12/pyr"] = {
    title: "Pouring Sand",
    scene: S`<p>A cone-shaped cup and a cylinder have the same base and the same height. Fill the cone with sand and pour it into the cylinder.</p>`,
    think: S`How many cones of sand does it take to fill the cylinder?`,
    aha: S`<p>Exactly $3$! A cone holds $\tfrac13$ of its cylinder, and a pyramid holds $\tfrac13$ of its prism: $V = \tfrac13 Bh$.</p>`,
  };
  T["ch12/sph"] = {
    title: "Orange Peel and Snowmen",
    scene: S`<p>Peel an orange and trace $4$ circles with the orange's radius. Later you build a snowman whose bottom ball is twice as wide as a smaller ball.</p>`,
    think: S`How many circles does the peel fill? How much more snow does the big ball need?`,
    aha: S`<p>The peel fills about $4$ circles: a sphere's surface area is $4\pi r^2$, and its volume is $\tfrac43 \pi r^3$.</p>
      <p>Twice as wide means scale factor $2$: area $\times 2^2 = 4$, volume $\times 2^3 = 8$. The big ball needs <b>8 times</b> the snow.</p>`,
  };
  T["ch13/basic"] = {
    title: "The Marble Bag",
    scene: S`<p>A bag has $3$ red marbles and $5$ blue marbles. You reach in without looking.</p>`,
    think: S`Out of all the marbles you could grab, how many are red? How many are not red?`,
    aha: S`<p>$P(\text{red}) = \dfrac{3}{8}$: favorable outcomes over all equally likely outcomes.</p>
      <p>Every grab is red or not red, so $P(\text{not red}) = 1 - \dfrac38 = \dfrac58$.</p>`,
  };
  T["ch13/count"] = {
    title: "A Podium vs. a Team",
    scene: S`<p>From $8$ runners, you choose a gold, a silver and a bronze winner. Then, from the same $8$, you choose $3$ to be a relay team.</p>`,
    think: S`Are there more ways to fill the podium or to pick the team? Why?`,
    aha: S`<p>Podium: $8 \cdot 7 \cdot 6 = 336$ ways, because <b>order matters</b> (a permutation).</p>
      <p>Team: the same $3$ people in any of $3! = 6$ orders is one team, so $336 \div 6 = 56$ (a combination).</p>`,
  };
  T["ch13/comp"] = {
    title: "Cloudy Days",
    scene: S`<p>Over $100$ days, $40$ were cloudy, and $30$ of those cloudy days were rainy. You flip a coin and roll a die, too.</p>`,
    think: S`If you already know today is cloudy, what's the chance it rains? Does the coin know what the die did?`,
    aha: S`<p>Knowing it's cloudy shrinks your world to the $40$ cloudy days: $P(\text{rain} \mid \text{cloudy}) = \dfrac{30}{40} = \dfrac34$. That's <b>conditional probability</b>.</p>
      <p>The coin and die don't affect each other, so they're <b>independent</b>: $P(\text{heads and } 6) = \tfrac12 \cdot \tfrac16 = \tfrac{1}{12}$.</p>`,
  };

  /* ---------- explorers ---------- */
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs, txt) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (txt != null) e.textContent = txt; return e; };
  const fx = v => Number.isInteger(v) ? String(v) : v.toFixed(1);

  function explorer(kind) {
    const box = document.createElement("div"); box.className = "xp";
    const tabs = document.createElement("div"); tabs.className = "tabs";
    const svg = el("svg", { role: "img" });
    const read = document.createElement("div"); read.className = "read";
    const tip = document.createElement("div"); tip.className = "tip"; tip.textContent = "Drag the points.";
    box.append(tabs, svg, read, tip);
    let mode = "line";
    const L = kind === "dist" ? { a: 1, b: 4 } : { a: 2, b: 8 };
    const Pn = kind === "dist" ? { A: [1, 2], B: [4, 6] } : { A: [2, 3], B: [8, 7] };
    if (kind === "dist") mode = "plane";
    [["line", "On a line"], ["plane", "On the xOy plane"]].forEach(([m, label]) => {
      const b = document.createElement("button"); b.type = "button"; b.textContent = label;
      b.onclick = () => { mode = m; draw(); }; b.dataset.m = m; tabs.appendChild(b);
    });
    let drag = null;
    svg.addEventListener("pointermove", e => { if (drag) { move(e); } });
    svg.addEventListener("pointerup", () => { drag = null; });
    svg.addEventListener("pointerleave", () => { drag = null; });
    function local(e) { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }

    // line geometry
    const LX0 = -10, LX1 = 10, LS = 19, LP = 20;
    const lx = v => LP + (v - LX0) * LS;
    // plane geometry
    const G0 = -2, G1 = 10, GS = 30, GP = 26;
    const gx = v => GP + (v - G0) * GS, gy = v => GP + (G1 - v) * GS;

    function move(e) {
      const p = local(e);
      if (mode === "line") { L[drag] = Math.max(LX0, Math.min(LX1, Math.round((p.x - LP) / LS + LX0))); }
      else { Pn[drag] = [Math.max(G0, Math.min(G1, Math.round((p.x - GP) / GS + G0))), Math.max(G0, Math.min(G1, Math.round(G1 - (p.y - GP) / GS)))]; }
      draw();
    }
    function handle(cx, cy, key, color, label) {
      const c = el("circle", { cx, cy, r: 9, fill: color, stroke: "#fff", "stroke-width": 2, class: "drag" });
      c.addEventListener("pointerdown", e => { drag = key; try { svg.setPointerCapture(e.pointerId); } catch (x) {} e.preventDefault(); });
      svg.append(c, el("text", { x: cx, y: cy - 14, "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: color }, label));
    }
    function draw() {
      tabs.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.m === mode));
      svg.replaceChildren();
      if (mode === "line") {
        svg.setAttribute("viewBox", `0 0 ${2 * LP + (LX1 - LX0) * LS} 110`);
        const y = 62;
        svg.append(el("line", { x1: lx(LX0), y1: y, x2: lx(LX1), y2: y, stroke: "#16233B", "stroke-width": 1.5 }));
        for (let v = LX0; v <= LX1; v++) {
          svg.append(el("line", { x1: lx(v), y1: y - 5, x2: lx(v), y2: y + 5, stroke: "#8C93A0" }));
          if (v % 2 === 0) svg.append(el("text", { x: lx(v), y: y + 20, "text-anchor": "middle", "font-size": 11, fill: "#5B6474" }, v));
        }
        const a = L.a, b = L.b, m = (a + b) / 2;
        svg.append(el("line", { x1: lx(a), y1: y, x2: lx(b), y2: y, stroke: "#0F7C7C", "stroke-width": 5, "stroke-linecap": "round", opacity: .5 }));
        if (kind === "mid") svg.append(el("rect", { x: lx(m) - 5, y: y - 5, width: 10, height: 10, fill: "#C9962B", transform: `rotate(45 ${lx(m)} ${y})` }), el("text", { x: lx(m), y: y + 38, "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: "#8A6415" }, "M = " + fx(m)));
        handle(lx(a), y, "a", "#1F3A68", "Mia " + a); handle(lx(b), y, "b", "#B7472A", "Leo " + b);
        const d = Math.abs(b - a);
        read.innerHTML = kind === "mid"
          ? (() => { const sv = v => (v > 0 ? "+" : "") + fx(v), pv = v => v < 0 ? "(" + fx(v) + ")" : fx(v); return `Mia's trip $\\overrightarrow{AB} = ${b} - ${a < 0 ? "(" + a + ")" : a} = ${sv(b - a)}$, half is $${sv((b - a) / 2)}$, so $M = ${a} + ${pv((b - a) / 2)} = ${fx(m)}$ $= \\dfrac{${a} + ${b < 0 ? "(" + b + ")" : b}}{2}$.`; })()
          : `On a line there is only one direction: distance $= |${b} - ${a < 0 ? "(" + a + ")" : a}| = ${d}$.`;
      } else {
        const W = 2 * GP + (G1 - G0) * GS;
        svg.setAttribute("viewBox", `0 0 ${W} ${W}`);
        for (let v = G0; v <= G1; v++) {
          svg.append(el("line", { x1: gx(v), y1: gy(G0), x2: gx(v), y2: gy(G1), stroke: v === 0 ? "#16233B" : "#E8E2D8", "stroke-width": v === 0 ? 1.5 : 1 }),
                     el("line", { x1: gx(G0), y1: gy(v), x2: gx(G1), y2: gy(v), stroke: v === 0 ? "#16233B" : "#E8E2D8", "stroke-width": v === 0 ? 1.5 : 1 }));
          if (v % 2 === 0 && v) svg.append(el("text", { x: gx(v), y: gy(0) + 14, "text-anchor": "middle", "font-size": 10, fill: "#8C93A0" }, v), el("text", { x: gx(0) - 6, y: gy(v) + 4, "text-anchor": "end", "font-size": 10, fill: "#8C93A0" }, v));
        }
        svg.append(el("text", { x: gx(G1) - 4, y: gy(0) - 6, "text-anchor": "end", "font-size": 12, "font-weight": 700, fill: "#16233B" }, "x"), el("text", { x: gx(0) + 6, y: gy(G1) + 12, "font-size": 12, "font-weight": 700, fill: "#16233B" }, "y"));
        const [x1, y1] = Pn.A, [x2, y2] = Pn.B;
        if (kind === "mid") {
          const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
          const sh = (x, y, c) => { svg.append(el("line", { x1: gx(x), y1: gy(y), x2: gx(x), y2: gy(0), stroke: c, "stroke-dasharray": "4 4" }), el("line", { x1: gx(x), y1: gy(y), x2: gx(0), y2: gy(y), stroke: c, "stroke-dasharray": "4 4" }),
            el("circle", { cx: gx(x), cy: gy(0), r: 4, fill: c }), el("circle", { cx: gx(0), cy: gy(y), r: 4, fill: c })); };
          sh(x1, y1, "#1F3A68"); sh(x2, y2, "#B7472A"); sh(mx, my, "#C9962B");
          svg.append(el("line", { x1: gx(x1), y1: gy(y1), x2: gx(x2), y2: gy(y2), stroke: "#0F7C7C", "stroke-width": 3 }));
          svg.append(el("rect", { x: gx(mx) - 6, y: gy(my) - 6, width: 12, height: 12, fill: "#C9962B", transform: `rotate(45 ${gx(mx)} ${gy(my)})` }), el("text", { x: gx(mx) + 10, y: gy(my) + 18, "font-size": 13, "font-weight": 700, fill: "#8A6415" }, `M(${fx(mx)}, ${fx(my)})`));
          handle(gx(x1), gy(y1), "A", "#1F3A68", `Mia (${x1}, ${y1})`); handle(gx(x2), gy(y2), "B", "#B7472A", `Leo (${x2}, ${y2})`);
          read.innerHTML = `Shadows on the $x$-axis: $${x1}$ and $${x2}$, middle $\\dfrac{${x1} + ${x2 < 0 ? "(" + x2 + ")" : x2}}{2} = ${fx(mx)}$. Shadows on the $y$-axis: $${y1}$ and $${y2}$, middle $${fx(my)}$. So $M = (${fx(mx)}, ${fx(my)})$.`;
        } else {
          const dx = x2 - x1, dy = y2 - y1, d2 = dx * dx + dy * dy, d = Math.sqrt(d2);
          svg.append(el("path", { d: `M${gx(x1)} ${gy(y1)} L${gx(x2)} ${gy(y1)} L${gx(x2)} ${gy(y2)}`, fill: "none", stroke: "#C9962B", "stroke-width": 3, "stroke-dasharray": "6 4" }),
                     el("line", { x1: gx(x1), y1: gy(y1), x2: gx(x2), y2: gy(y2), stroke: "#0F7C7C", "stroke-width": 3 }));
          if (dx) svg.append(el("text", { x: (gx(x1) + gx(x2)) / 2, y: gy(y1) + (dy > 0 ? 16 : -8), "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: "#8A6415" }, "Δx = " + Math.abs(dx)));
          if (dy) svg.append(el("text", { x: gx(x2) + (dx >= 0 ? 8 : -8), y: (gy(y1) + gy(y2)) / 2, "text-anchor": dx >= 0 ? "start" : "end", "font-size": 12, "font-weight": 700, fill: "#8A6415" }, "Δy = " + Math.abs(dy)));
          handle(gx(x1), gy(y1), "A", "#1F3A68", `Mia (${x1}, ${y1})`); handle(gx(x2), gy(y2), "B", "#B7472A", `Library (${x2}, ${y2})`);
          const exact = Number.isInteger(d) ? String(d) : `\\sqrt{${d2}} \\approx ${d.toFixed(2)}`;
          read.innerHTML = `Taxi (along the streets): $${Math.abs(dx)} + ${Math.abs(dy)} = ${Math.abs(dx) + Math.abs(dy)}$ blocks. Crow (straight): $\\sqrt{${Math.abs(dx)}^2 + ${Math.abs(dy)}^2} = ${exact}$ blocks.`;
        }
      }
      if (window.renderMathInElement) renderMathInElement(read, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false });
    }
    draw();
    return box;
  }

  /* ---------- draw a story above the lesson ---------- */
  /* ---------- stories for the new sections (Ch 1–13) ---------- */
  T["ch1/coordpa"] = {
    title: "Fencing a Garden on Graph Paper",
    scene: S`<p>Grandpa draws his garden on graph paper. The corners are at $(1, 1)$, $(7, 1)$, $(7, 5)$ and $(1, 5)$. Each square on the paper is $1$ meter.</p>`,
    think: S`How many meters of fence go all the way around? How many square meters of soil are inside? Count squares if it helps.`,
    aha: S`<p>Along the bottom, $y$ stays $1$, so the length is $7 - 1 = 6$. Up the side, $x$ stays $7$, so the height is $5 - 1 = 4$.</p>
      <p>Fence (perimeter) $= 6 + 4 + 6 + 4 = 20$ m. Soil (area) $= 6 \cdot 4 = 24$ m². On a grid, <b>subtract coordinates</b> to get side lengths — and use the Distance Formula when a side is slanted.</p>`,
  };
  T["ch1/angm"] = {
    title: "How Wide Is the Door Open?",
    scene: S`<p>A door that's shut is $0^\circ$. Push it until it points straight out from the wall: $90^\circ$. Keep pushing until it lies flat against the wall on the other side: $180^\circ$.</p>`,
    think: S`Is a door open "a little" acute or obtuse? What about "almost all the way"? If you open it $35^\circ$ and then another $50^\circ$, how far is it open?`,
    aha: S`<p>Less than $90^\circ$ is <b>acute</b>, exactly $90^\circ$ is <b>right</b>, between $90^\circ$ and $180^\circ$ is <b>obtuse</b>, and $180^\circ$ is <b>straight</b>.</p>
      <p>Two pushes add up: $35^\circ + 50^\circ = 85^\circ$. That's the <b>Angle Addition Postulate</b> — the small angles fill the big one.</p>`,
  };
  T["ch1/constr"] = {
    title: "Geometry Without a Ruler",
    scene: S`<p>2,000 years ago, Greek builders had no rulers with numbers. They had a <b>string with a stake</b> (to draw circles) and a <b>straight board</b> (to draw lines). With just those, they laid out perfect temples.</p>`,
    think: S`Two trees stand at $A$ and $B$. Using only a string, how could you find spots that are the <b>same distance</b> from both trees?`,
    aha: S`<p>Tie the string at $A$ and swing an arc; keep the same length and swing an arc from $B$. Where the arcs cross, you're the same distance from both trees.</p>
      <p>Do it above and below, connect the two crossings — that line is the <b>perpendicular bisector</b>, and it hits $\overline{AB}$ exactly at the midpoint. That's a <b>construction</b>: compass and straightedge only.</p>`,
  };
  T["ch2/post"] = {
    title: "The Rules Nobody Proves",
    scene: S`<p>In a board game, some rules you just accept: "roll the die, move that many spaces." Nobody proves them — they're how the game works.</p>
      <p>Geometry has rules like that too. Hammer two nails into a board and stretch a string between them.</p>`,
    think: S`How many different straight strings can go through both nails? And if a picture <i>looks</i> like it has a right angle, can you be sure?`,
    aha: S`<p>Only <b>one</b>: through two points there is exactly one line. Rules we accept without proof are <b>postulates</b>.</p>
      <p>And no — a drawing can fool you. You may trust what is <b>drawn</b> (which points are on which line), but sizes like right angles or equal lengths count only if they are <b>marked</b>.</p>`,
  };
  T["ch2/angp"] = {
    title: "The Scissors",
    scene: S`<p>Open a pair of scissors. The two blades cross and make four angles.</p>`,
    think: S`Open them wider. The top angle grows — what happens to the bottom angle across from it? What about the side angles?`,
    aha: S`<p>The angles <b>across</b> from each other always stay equal: <b>vertical angles are congruent</b>. Angles <b>next to</b> each other always add to $180^\circ$ — they're a <b>linear pair</b>.</p>
      <p>Why? The top angle and a side angle add to $180^\circ$; so do the bottom angle and that same side angle. Two angles supplementary to the same angle must be equal. That's a proof!</p>`,
  };
  T["ch3/pairs"] = {
    title: "Lines in Your Classroom",
    scene: S`<p>Look at the room around you. Two edges of the ceiling run side by side. A wall edge goes straight down from the ceiling. And one edge of the ceiling and one edge of the floor point in completely different directions and never touch.</p>`,
    think: S`Find two edges that never meet but are <b>not</b> side by side. Could you lay a flat sheet of cardboard so it touches both edges?`,
    aha: S`<p>Edges that never meet and point the same way are <b>parallel</b>. Edges that share a corner <b>intersect</b>.</p>
      <p>Edges that never meet and <b>can't</b> be held on one flat sheet are <b>skew</b> — that only happens in 3D, like a ceiling edge and a floor edge going different directions.</p>`,
  };
  T["ch3/conv"] = {
    title: "Are the Railroad Tracks Straight?",
    scene: S`<p>A train-track inspector can't see miles ahead. She lays a straight board across both rails and measures the angle each rail makes with the board.</p>`,
    think: S`If both angles in the same position measure $72^\circ$, what can she say about the rails? What if one is $72^\circ$ and the other $75^\circ$?`,
    aha: S`<p>Equal corresponding angles mean the rails are <b>parallel</b> — the angle facts work <b>backwards</b> too. These are the <b>converses</b>.</p>
      <p>$72^\circ$ vs $75^\circ$? The rails are tilting toward each other. Equal angles (or same-side angles adding to $180^\circ$) are the proof of parallel.</p>`,
  };
  T["ch3/perp"] = {
    title: "The Shortest Way to the River",
    scene: S`<p>You're standing in a field, and a straight river runs along the bottom. You're thirsty and want to reach the water as fast as possible.</p>`,
    think: S`Should you walk diagonally, or straight down? Draw a few paths and compare.`,
    aha: S`<p>Straight down — the path that meets the river at a <b>right angle</b>. Every slanted path is the hypotenuse of a right triangle, so it's longer.</p>
      <p>That's why the <b>distance from a point to a line</b> always means the <b>perpendicular</b> segment.</p>`,
  };
  T["ch4/cpoly"] = {
    title: "Two Copies of the Same Key",
    scene: S`<p>A locksmith copies your house key. The copy is the same size and shape — it fits the same lock. Every bump on the copy matches a bump on the original.</p>`,
    think: S`If you flip the copy over, does it still match? How would you tell someone <b>which</b> bump matches which?`,
    aha: S`<p>Same size and shape = <b>congruent</b>. To say which parts match, we list the corners <b>in matching order</b>: $\triangle ABC \cong \triangle DEF$ means $A$ goes with $D$, $B$ with $E$, $C$ with $F$.</p>
      <p>The order of the letters is a map: it tells you every matching side and angle.</p>`,
  };
  T["ch4/cpctc"] = {
    title: "The Kite's Two Halves",
    scene: S`<p>Two kite frames are built from identical sticks. You can prove the two halves of a kite are congruent triangles.</p>`,
    think: S`Once you know the two triangles are identical copies, what else do you automatically know about their angles?`,
    aha: S`<p>If two triangles are congruent, <b>every</b> matching part is congruent — not just the ones you used. That's <b>CPCTC</b>: Corresponding Parts of Congruent Triangles are Congruent.</p>
      <p>So the plan is always: first prove the triangles congruent, <b>then</b> use CPCTC to get the side or angle you really wanted.</p>`,
  };
  T["ch5/hinge"] = {
    title: "The Opening Door",
    scene: S`<p>A door is hinged to the wall. The door doesn't change length, and the wall doesn't either. Now open the door wider and wider.</p>`,
    think: S`What happens to the gap between the door's edge and the wall as the angle grows?`,
    aha: S`<p>The wider the angle, the longer the gap. With two sides fixed, the <b>bigger included angle</b> makes the <b>longer third side</b>. That's the <b>Hinge Theorem</b>.</p>
      <p>And a sneaky way to prove things: assume the opposite and show it leads to nonsense. That's an <b>indirect proof</b>.</p>`,
  };
  T["ch6/ppar"] = {
    title: "Is It Really a Parallelogram?",
    scene: S`<p>A carpenter builds a frame from two long boards and two short boards and nails the corners. A friend asks, "Are you sure the opposite sides are parallel? You didn't measure any angles."</p>`,
    think: S`If both pairs of opposite boards are the same length, can the frame be anything other than a parallelogram?`,
    aha: S`<p>No — equal opposite sides <b>force</b> a parallelogram. There are four such tests: both pairs of opposite sides congruent, both pairs of opposite angles congruent, one pair congruent <b>and</b> parallel, or diagonals that bisect each other.</p>
      <p>Watch out: one pair parallel and the <b>other</b> pair equal could be an isosceles trapezoid.</p>`,
  };
  T["ch6/rrs"] = {
    title: "Squash the Square",
    scene: S`<p>Make a square out of four equal straws joined with pins at the corners. Now gently push one corner so it leans.</p>`,
    think: S`The sides didn't change. What shape is it now? And what if instead you had a rectangle frame — what can you say about its two diagonals?`,
    aha: S`<p>The leaning square is a <b>rhombus</b>: four equal sides, but no right angles. Its diagonals cross at <b>right angles</b>.</p>
      <p>A rectangle keeps its right angles, and its diagonals are <b>equal</b>. A <b>square</b> is both, so it has every property.</p>`,
  };
  T["ch7/simp"] = {
    title: "The Phone Photo",
    scene: S`<p>You zoom in on a photo of a room. Everything gets bigger, but the doors still look like doors and the windows still look like windows.</p>`,
    think: S`If zooming makes every length $2$ times as long, does the picture cover $2$ times as much screen? Draw a $1 \times 1$ square and a $2 \times 2$ square.`,
    aha: S`<p>Same shape, different size = <b>similar</b>. Every length is multiplied by the <b>scale factor</b> $k$ — so the perimeter is too.</p>
      <p>But the area is multiplied by $k^2$: the $2 \times 2$ square holds <b>4</b> little squares, not 2.</p>`,
  };
  T["ch8/simrt"] = {
    title: "Three Triangles in One",
    scene: S`<p>Cut a right triangle out of paper. Fold or cut along the altitude from the right angle down to the long side. You get two smaller right triangles.</p>`,
    think: S`Turn the three triangles so they face the same way. What do you notice about their shapes?`,
    aha: S`<p>All three are <b>similar</b>! Matching their sides gives two shortcuts: the altitude is the <b>geometric mean</b> of the two pieces of the hypotenuse ($h^2 = pq$), and each leg is the geometric mean of the whole hypotenuse and its neighboring piece.</p>`,
  };
  T["ch8/laws"] = {
    title: "When There's No Right Angle",
    scene: S`<p>A lighthouse spots a ship. The lighthouse is $10$ km from a harbor, the angle at the lighthouse is $40^\circ$, and the angle at the harbor is $75^\circ$. Nothing here is a right angle.</p>`,
    think: S`SOH-CAH-TOA only works in right triangles. What could you do instead?`,
    aha: S`<p>In <b>any</b> triangle, a bigger angle sits across from a longer side, in a fixed way: $\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C}$ — the <b>Law of Sines</b>.</p>
      <p>When you don't know any angle-and-opposite-side pair (SAS or SSS), use the <b>Law of Cosines</b>: $c^2 = a^2 + b^2 - 2ab\cos C$. It's the Pythagorean Theorem with a correction for the angle.</p>`,
  };
  T["ch9/cst"] = {
    title: "Stamp vs. Photocopier",
    scene: S`<p>A rubber stamp can be slid, flipped or turned — every print is exactly the same size. A photocopier can also make copies at $200\%$ or $50\%$.</p>`,
    think: S`Which machine makes copies that are <b>congruent</b> to the original? Which makes copies that are only the same <b>shape</b>?`,
    aha: S`<p>Slides, flips and turns are <b>rigid motions</b> (translations, reflections, rotations): the copy is <b>congruent</b>.</p>
      <p>Resizing is a <b>dilation</b>: the copy is <b>similar</b>. Mix them, and the result is similar — congruent only if no resizing happened.</p>`,
  };
  T["ch10/cang"] = {
    title: "Where Do the Lines Cross?",
    scene: S`<p>Two straight paths cross a round park. Sometimes they cross <b>inside</b> the park, sometimes right <b>on</b> the fence, and sometimes <b>outside</b>, before they even reach the park.</p>`,
    think: S`When the paths cross outside, the angle between them looks small. When they cross inside, it looks bigger. Why might that be?`,
    aha: S`<p>The angle depends on the arcs the paths cut off. <b>On</b> the circle: half the arc. <b>Inside</b>: half the <b>sum</b> of the two arcs. <b>Outside</b>: half the <b>difference</b> (far arc minus near arc).</p>`,
  };
  T["ch10/cseg"] = {
    title: "Two Pizza Cuts",
    scene: S`<p>Make two straight cuts across a round pizza that cross each other (not at the center). Each cut is split into two pieces by the crossing point.</p>`,
    think: S`Measure all four pieces. Multiply the two pieces of one cut, then the two pieces of the other cut. What do you notice?`,
    aha: S`<p>The products are <b>equal</b>! For two chords: piece $\times$ piece $=$ piece $\times$ piece.</p>
      <p>Lines from a point outside follow a similar rule: outside part $\times$ whole $=$ outside part $\times$ whole, and for a tangent, tangent$^2$ = outside $\times$ whole.</p>`,
  };
  T["ch12/xsec"] = {
    title: "Slicing and Spinning",
    scene: S`<p>Slice a carrot straight across: the cut face is a circle. Slice it the long way: the face looks like a long triangle.</p>
      <p>Now tape a paper rectangle to a pencil along one edge and spin the pencil fast between your hands.</p>`,
    think: S`What 3D shape does the spinning rectangle seem to make? What would a spinning right triangle make?`,
    aha: S`<p>The flat face from a slice is a <b>cross section</b>. A shape spun around a line makes a <b>solid of revolution</b>: a rectangle makes a <b>cylinder</b>, a right triangle makes a <b>cone</b>, a half-circle makes a <b>sphere</b>.</p>`,
  };
  T["ch13/twt"] = {
    title: "The Class Survey",
    scene: S`<p>100 students answer "Do you play a sport?" — 50 are in Grade 9 and 50 in Grade 10. In Grade 9, 30 say yes. In Grade 10, 15 say yes.</p>`,
    think: S`Pick a random student. What's the chance they play a sport? Now pick a random <b>Grade 9</b> student — does the chance change?`,
    aha: S`<p>A <b>two-way table</b> sorts everyone by two questions at once. Overall, $\tfrac{45}{100}$ play. But among Grade 9 only, $\tfrac{30}{50}$ play.</p>
      <p>Narrowing to one row is a <b>conditional probability</b>: $P(\text{Yes} \mid \text{Grade 9})$. If it's different from the overall chance, the events are <b>not independent</b>.</p>`,
  };


  /* ---- Common Core additions ---- */
  T["ch1/part"] = {
    title: "The Rest Stop",
    scene: S`<p>A highway runs straight from Ashton to Bayview, 90 miles. The state wants a rest stop so that drivers from Ashton reach it after one part of the trip and still have <b>two</b> equal parts left.</p>`,
    think: S`How far from Ashton should the rest stop be? Is it halfway?`,
    aha: S`<p>One part done, two parts left: the trip is cut into $1 + 2 = 3$ equal parts, so the stop is $\tfrac13$ of the way — $30$ miles from Ashton, not $45$. That is the ratio $1:2$.</p>
      <p>On a coordinate plane you do the same thing to the $x$-change and the $y$-change: take $\tfrac{a}{a+b}$ of each and add it to the starting point.</p>`,
  };
  T["ch1/constrc"] = {
    title: "Six Steps Around the Circle",
    scene: S`<p>Draw a circle. Without changing the compass, put its point anywhere on the circle and make a mark on the circle. Move to the new mark and do it again. Keep going.</p>`,
    think: S`How many steps until you come back to where you started? What shape do the marks make?`,
    aha: S`<p>Exactly <b>six</b> steps. Each step is one radius long, and each little triangle (center, mark, next mark) has three sides equal to the radius — it's equilateral, with a $60^\circ$ angle at the center. $6 \times 60^\circ = 360^\circ$.</p>
      <p>Join the six marks: a regular hexagon. Join every other mark: an equilateral triangle. For a square, you need a right angle at the center — construct a diameter and its perpendicular bisector.</p>`,
  };
  T["ch6/cproof"] = {
    title: "Prove It Without a Ruler",
    scene: S`<p>A city planner says the four corners of a new park, $A(0, 0)$, $B(4, 1)$, $C(6, 4)$ and $D(2, 3)$, make a parallelogram. Her boss says, “It looks a little crooked to me. Prove it.”</p>`,
    think: S`You can't trust a drawing. What could you <i>calculate</i> about the sides to settle the argument?`,
    aha: S`<p>Compare <b>slopes</b>: $\overline{AB}$ and $\overline{DC}$ both have slope $\tfrac14$; $\overline{BC}$ and $\overline{AD}$ both have slope $\tfrac32$. Both pairs of opposite sides are parallel — it <b>is</b> a parallelogram.</p>
      <p>That's a coordinate proof: slopes for parallel and perpendicular, the Distance Formula for equal lengths, the Midpoint Formula for diagonals that bisect each other.</p>`,
  };
  T["ch8/cofn"] = {
    title: "Two Ladders, One Triangle",
    scene: S`<p>A ladder leans against a wall. Mia stands at the foot of the ladder and looks up at the angle it makes with the ground. Leo stands at the top and looks at the angle it makes with the wall.</p>`,
    think: S`The side across from Mia's angle is the wall. Which side is <i>next to</i> Leo's angle?`,
    aha: S`<p>The same wall! The two acute angles add to $90^\circ$, and the side <b>opposite</b> one is <b>adjacent</b> to the other. So Mia's sine is Leo's cosine: $\sin A = \cos(90^\circ - A)$.</p>
      <p>That's where the name comes from: <b>co</b>sine is the sine of the <b>co</b>mplementary angle.</p>`,
  };
  T["ch8/sinarea"] = {
    title: "The Leaning Sail",
    scene: S`<p>A triangular sail has two edges of $8$ m and $10$ m that meet at the top of the mast at a $30^\circ$ angle. The sailmaker needs the area to order fabric, but nobody measured the height.</p>`,
    think: S`Where would the height go? Can you find it using the $30^\circ$ angle?`,
    aha: S`<p>Drop a height from the end of the $10$ m edge to the $8$ m edge: in that small right triangle, $h = 10 \sin 30^\circ = 5$. Area $= \tfrac12 \cdot 8 \cdot 5 = 20$ m².</p>
      <p>Every time it works the same way: $h = b \sin C$, so $\text{Area} = \tfrac12 ab \sin C$ — two sides and the angle between them.</p>`,
  };
  T["ch9/rigid"] = {
    title: "Tracing Paper Test",
    scene: S`<p>Two triangles are drawn on a page. Trace one on tracing paper. You may <b>slide</b> the paper, <b>turn</b> it, or <b>flip</b> it over — but not stretch it.</p>`,
    think: S`If you can make the tracing sit exactly on the other triangle, what do you know about the two triangles?`,
    aha: S`<p>They are <b>congruent</b>. Slides, turns and flips (translations, rotations, reflections) are <b>rigid motions</b>: they never change a length or an angle. That is the real definition of congruence.</p>
      <p>And it explains SAS, ASA and SSS: once the matching parts line up, the last vertex has nowhere else to go.</p>`,
  };
  T["ch10/insc"] = {
    title: "The Round Table",
    scene: S`<p>Four friends sit at a round table at points $A$, $B$, $C$, $D$, with strings stretched between neighbors to make a four-sided shape inside the circle. The angle at $A$ is $70^\circ$.</p>`,
    think: S`Move the friends around the table. When $\angle A$ gets bigger, what happens to the angle at the opposite seat $C$?`,
    aha: S`<p>It gets smaller — they always add to $180^\circ$. Each angle is half of the arc it looks at, and the two arcs together are the whole $360^\circ$ circle.</p>
      <p>Special case: if two friends sit at the ends of a diameter, any third friend sees them at exactly $90^\circ$.</p>`,
  };
  T["ch10/radn"] = {
    title: "Measuring with the Radius",
    scene: S`<p>Cut a piece of string as long as a circle's radius. Lay it along the edge of the circle, starting anywhere.</p>`,
    think: S`How many strings fit all the way around? Would the answer change for a bigger circle?`,
    aha: S`<p>A little more than $6$ — exactly $2\pi \approx 6.28$ — for <b>every</b> circle, because all circles are similar. The angle that one radius-length of arc makes at the center is <b>1 radian</b>.</p>
      <p>So a full turn is $2\pi$ radians, $180^\circ = \pi$, and the arc length is simply radius times angle: $s = r\theta$.</p>`,
  };
  T["ch10/ceq"] = {
    title: "Hidden Center",
    scene: S`<p>A cell tower's signal reaches every point on the circle $x^2 + y^2 - 6x + 4y - 12 = 0$ (in miles). A family wants to know where the tower is and how far it reaches.</p>`,
    think: S`The equation is scrambled. Can you rewrite it so it looks like $(x - h)^2 + (y - k)^2 = r^2$?`,
    aha: S`<p>Complete the square: $(x^2 - 6x + 9) + (y^2 + 4y + 4) = 12 + 9 + 4$, so $(x - 3)^2 + (y + 2)^2 = 25$. The tower is at $(3, -2)$ and reaches $5$ miles.</p>`,
  };
  T["ch10/parab"] = {
    title: "The Satellite Dish",
    scene: S`<p>A satellite dish bounces every signal to one small receiver, the <b>focus</b>. The dish's shape is all the points that are the same distance from the focus as from a straight line behind the dish, the <b>directrix</b>.</p>`,
    think: S`With the focus at $(0, 3)$ and the directrix $y = -3$, is the point $(6, 3)$ on the dish? Compare its two distances.`,
    aha: S`<p>Distance to the focus: $6$. Distance to the line: $3 - (-3) = 6$. Equal, so yes! Setting the two distances equal for every point gives $x^2 = 12y$ — the shape of a parabola, $x^2 = 4py$ with $p = 3$.</p>`,
  };
  T["ch12/model"] = {
    title: "The Leaning Stack",
    scene: S`<p>Make a straight stack of 20 coins. Now push it so it leans to one side, like a slanted tower.</p>`,
    think: S`Did the stack's volume change? Look at one coin at any height in both stacks.`,
    aha: S`<p>No. At every height the slice is the same coin, so the volumes are equal — that's <b>Cavalieri's Principle</b>. It's why an oblique cylinder still has $V = \pi r^2 h$ with the <b>straight-up</b> height.</p>
      <p>Real problems add one more step: multiply by a <b>density</b> (grams per cm³, people per square mile) to get mass, cost or population.</p>`,
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
    if (s.widget) box.appendChild(explorer(s.widget));
    const btn = document.createElement("button"); btn.type = "button"; btn.className = "sbtn"; btn.textContent = "💡 Show the idea";
    const aha = document.createElement("div"); aha.className = "aha"; aha.hidden = true; aha.innerHTML = s.aha;
    btn.onclick = () => { aha.hidden = !aha.hidden; btn.textContent = aha.hidden ? "💡 Show the idea" : "Hide the idea"; };
    box.append(btn, aha);
    (s.more || []).forEach((m, j) => {   // extra stories in the same lesson, shown after the first one
      const part = document.createElement("div"); part.className = "more";
      part.innerHTML = `<span class="label">📖 Story ${j + 2}</span><h3>${m.title}</h3>${m.scene}<div class="think"><b>🤔 Think first: </b>${m.think}</div>`;
      const b2 = document.createElement("button"); b2.type = "button"; b2.className = "sbtn"; b2.textContent = "💡 Show the idea";
      const a2 = document.createElement("div"); a2.className = "aha"; a2.hidden = true; a2.innerHTML = m.aha;
      b2.onclick = () => { a2.hidden = !a2.hidden; b2.textContent = a2.hidden ? "💡 Show the idea" : "Hide the idea"; };
      part.append(b2, a2); box.append(part);
    });
    if (window.renderMathInElement) renderMathInElement(box, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false });
    else setTimeout(() => drawStory(chId, topic), 300);
  };
  window.GEOMETRY_STORIES = T;
})();

/* =====================================================================
   PROF. FANG MATH — SAT & ACT PRACTICE BANK
   All questions are original (written for Prof. Fang Math), modeled on the
   skills each test measures. They are NOT official College Board / ACT items.

   HOW TO ADD A QUESTION — copy one line and change it:
     { id:"sat-m-25", exam:"sat", section:"math", domain:"Algebra", diff:2,
       q:"If $2x + 1 = 9$, what is $x$?", choices:["$3$","$4$","$5$","$8$"], answer:1,
       explain:"Subtract 1, then divide by 2: $x = 4$." }
   • answer = number of the right choice, starting at 0 (A=0, B=1, C=2, D=3)
   • For a type-in (grid-in) question leave out choices and write  answer:["3/2","1.5"]  (every accepted form)
   • Math goes between $ ... $ and every backslash is typed twice: \\frac, \\sqrt
   • passage:"..." adds a short text above the question (SAT Reading & Writing)
   ===================================================================== */

const TESTS = {
  sat: {
    name: "SAT",
    blurb: "Digital SAT: Reading and Writing (54 questions, 2 × 32 min) and Math (44 questions, 2 × 35 min). Calculator allowed on all of Math.",
    sections: {
      math: { name: "Math", secsPerQ: 95, domains: ["Algebra", "Advanced Math", "Problem-Solving & Data Analysis", "Geometry & Trigonometry"] },
      rw:   { name: "Reading & Writing", secsPerQ: 71, domains: ["Craft & Structure", "Information & Ideas", "Standard English Conventions", "Expression of Ideas"] },
    },
  },
  act: {
    name: "ACT",
    blurb: "Enhanced ACT: English (50 questions, 35 min), Math (45 questions, 50 min, 4 answer choices) and Reading (36 questions, 40 min). Science is optional.",
    sections: {
      math:    { name: "Math", secsPerQ: 67, domains: ["Number & Algebra", "Functions", "Geometry", "Statistics & Probability"] },
      english: { name: "English", secsPerQ: 42, domains: ["English passage"] },
      reading: { name: "Reading", secsPerQ: 67, domains: ["Reading passage"] },
    },
  },
};

/* ACT English and Reading use one longer passage shared by several questions.
   In an English passage, {{3|text}} marks the underlined part for question 3. */
const PASSAGES = {
  "act-eng-1": { title: "The Library That Floats", text:
"[1] Every Saturday morning, a converted ferry named the *Wren* docks at a small island town that has no library of {{1|it's}} own. Children line up on the pier long before the boat {{2|arrives, some of them carry}} bags of books to return.\n\n" +
"[2] The *Wren* began as one librarian's experiment. In 2019, Rosa Delgado borrowed a retired ferry from the county, {{3|filled it's cabins}} with shelves, and spent a summer visiting three islands. {{4|However,}} the experiment was so popular that the county bought the boat the following year.\n\n" +
"[3] Today the floating library carries about 4,000 books, a dozen laptops, and a {{5|small, but well-stocked}} science corner where visitors can look at plankton under a microscope. Delgado and two assistants run the boat, and volunteers from each island {{6|helps}} with story hours.\n\n" +
"[4] {{7|Rough weather sometimes forces the *Wren* to cancel a trip.}} On those weekends, Delgado posts video read-alouds online so that no one misses a story. {{8|Due to the fact that}} many island families have slow internet, she also mails printed activity packets.\n\n" +
"[5] For many residents, the boat is more than a library. {{9|It is a place where neighbors who rarely see each other can meet.}} Older residents come to read newspapers and talk; teenagers use the laptops to apply for {{10|jobs and colleges, and scholarships.}} {{11|As one fisherman put it, \"The *Wren* doesn't just bring books. It brings the town together.\"}}{{12|}}" },
  "act-read-1": { title: "Natural Science: The Partnership in a Lichen", text:
"[1] Walk past an old stone wall or a weathered fence post, and you will probably see patches of gray-green, orange, or yellow crust. These patches are lichens, and for most of the history of biology they were filed away as simple plants. In the 1860s, however, the Swiss botanist Simon Schwendener proposed a startling idea: a lichen is not one organism at all but two—a fungus and an alga living as a single body.\n\n" +
"[2] Many of Schwendener's colleagues found the idea absurd. A plant, they argued, was a plant; the notion that two unrelated living things could build one shared body seemed more like a fairy tale than science. Yet the microscope kept supporting Schwendener. Inside every lichen, threads of fungus wrapped tightly around green algal cells.\n\n" +
"[3] Today biologists describe the relationship as a partnership in which each member supplies what the other lacks. The alga, like other green organisms, makes sugar from sunlight. The fungus cannot do this, but it builds a tough outer layer that shields the alga from drying out and from harsh light, and it pulls water and minerals from rain, dust, and rock. Together, the two can survive on bare stone, desert soil, and frozen tundra—places where neither could live alone.\n\n" +
"[4] The story has continued to grow. In 2016, researchers reported that many common lichens also contain a third partner, a yeast hidden in the outer layer. Its exact role is still being studied, but its discovery suggests that scientists may have underestimated how many organisms a single lichen can contain.\n\n" +
"[5] Lichens are also sensitive. Because they absorb water and minerals directly from the air, they take in pollutants as well, and many species disappear when the air becomes dirty. For this reason, some cities survey their lichens the way a doctor checks a pulse: a wall covered in many kinds of lichen is a sign of clean air, while a wall with only one or two hardy species may signal a problem." },
};

const QUESTIONS = [
  /* ===================== SAT MATH ===================== */
  { id:"sat-m-1", exam:"sat", section:"math", domain:"Algebra", diff:1, q:"If $3x - 7 = 2x + 5$, what is the value of $x$?", choices:["$-2$","$2$","$12$","$-12$"], answer:2, explain:"Subtract $2x$ from both sides: $x - 7 = 5$. Add 7: $x = 12$." },
  { id:"sat-m-2", exam:"sat", section:"math", domain:"Algebra", diff:1, q:"A plumber charges a \\$85 visit fee plus \\$60 per hour of work. Which equation gives the total charge $C$, in dollars, for $h$ hours of work?", choices:["$C = 60h + 85$","$C = 85h + 60$","$C = 145h$","$C = 60(h + 85)$"], answer:0, explain:"The \\$60 is paid for each hour ($60h$); the \\$85 is paid once. So $C = 60h + 85$." },
  { id:"sat-m-3", exam:"sat", section:"math", domain:"Algebra", diff:1, q:"A line passes through the points $(2, 5)$ and $(6, 13)$. What is the slope of the line?", answer:["2"], explain:"Slope $= \\dfrac{13 - 5}{6 - 2} = \\dfrac{8}{4} = 2$." },
  { id:"sat-m-4", exam:"sat", section:"math", domain:"Algebra", diff:2, q:"$x + y = 10$ and $x - y = 4$. What is the value of $xy$?", answer:["21"], explain:"Add the equations: $2x = 14$, so $x = 7$ and $y = 3$. Then $xy = 21$." },
  { id:"sat-m-5", exam:"sat", section:"math", domain:"Algebra", diff:1, q:"Which point lies on the line $2x + 3y = 12$?", choices:["$(2, 3)$","$(3, 2)$","$(6, 1)$","$(0, 6)$"], answer:1, explain:"Test each point: $2(3) + 3(2) = 6 + 6 = 12$. The others give 13, 15 and 18." },
  { id:"sat-m-6", exam:"sat", section:"math", domain:"Algebra", diff:2, q:"A gym charges a \\$40 monthly fee plus \\$8 for each class. Maya wants to spend at most \\$100 this month. What is the greatest number of classes she can take?", answer:["7"], explain:"$40 + 8c \\le 100 \\Rightarrow 8c \\le 60 \\Rightarrow c \\le 7.5$. She can take at most 7 whole classes." },
  { id:"sat-m-7", exam:"sat", section:"math", domain:"Advanced Math", diff:1, q:"What is the sum of the solutions to $x^2 - 6x + 5 = 0$?", answer:["6"], explain:"Factor: $(x - 1)(x - 5) = 0$, so $x = 1$ or $x = 5$. The sum is 6. (Shortcut: for $x^2 + bx + c = 0$ the sum of the solutions is $-b$.)" },
  { id:"sat-m-8", exam:"sat", section:"math", domain:"Advanced Math", diff:1, q:"What is the vertex of the graph of $y = (x - 3)^2 + 4$?", choices:["$(3, 4)$","$(-3, 4)$","$(3, -4)$","$(-3, -4)$"], answer:0, explain:"In vertex form $y = (x - h)^2 + k$ the vertex is $(h, k) = (3, 4)$. Watch the sign: $(x - 3)$ means $h = 3$." },
  { id:"sat-m-9", exam:"sat", section:"math", domain:"Advanced Math", diff:1, q:"If $2^{x+1} = 32$, what is the value of $x$?", choices:["$3$","$4$","$5$","$16$"], answer:1, explain:"$32 = 2^5$, so $x + 1 = 5$ and $x = 4$." },
  { id:"sat-m-10", exam:"sat", section:"math", domain:"Advanced Math", diff:1, q:"Which expression is equivalent to $(x + 4)(x - 4)$?", choices:["$x^2 + 16$","$x^2 - 16$","$x^2 - 8x - 16$","$x^2 - 8$"], answer:1, explain:"Difference of squares: $(a + b)(a - b) = a^2 - b^2 = x^2 - 16$." },
  { id:"sat-m-11", exam:"sat", section:"math", domain:"Advanced Math", diff:1, q:"If $f(x) = 3x^2 - 2$, what is $f(-2)$?", answer:["10"], explain:"$f(-2) = 3(-2)^2 - 2 = 3(4) - 2 = 10$. Square first, then multiply." },
  { id:"sat-m-12", exam:"sat", section:"math", domain:"Advanced Math", diff:2, q:"A town has 200 rabbits, and the number doubles every 5 years. Which function gives the number of rabbits $t$ years from now?", choices:["$P(t) = 200(2)^{t/5}$","$P(t) = 200(2)^{5t}$","$P(t) = 200(5)^{t/2}$","$P(t) = 200 + 2t$"], answer:0, explain:"The population is multiplied by 2 once for every 5 years, so the number of doublings is $t/5$: $P(t) = 200(2)^{t/5}$." },
  { id:"sat-m-13", exam:"sat", section:"math", domain:"Problem-Solving & Data Analysis", diff:1, q:"The price of a book increased from \\$40 to \\$50. By what percent did the price increase?", choices:["$10\\%$","$20\\%$","$25\\%$","$80\\%$"], answer:2, explain:"Percent change $= \\dfrac{50 - 40}{40} = \\dfrac{10}{40} = 25\\%$. Divide by the ORIGINAL price." },
  { id:"sat-m-14", exam:"sat", section:"math", domain:"Problem-Solving & Data Analysis", diff:1, q:"What is the mean of the data set $4, 8, 10, 12, 16$?", answer:["10"], explain:"Sum $= 50$, and there are 5 values: $50 \\div 5 = 10$." },
  { id:"sat-m-15", exam:"sat", section:"math", domain:"Problem-Solving & Data Analysis", diff:1, q:"At a school, 3 out of every 8 students walk to school. If the school has 480 students, how many walk to school?", answer:["180"], explain:"$\\dfrac{3}{8} \\times 480 = 180$." },
  { id:"sat-m-16", exam:"sat", section:"math", domain:"Problem-Solving & Data Analysis", diff:2, q:"A random sample of 200 students at a school of 1,200 students found that 60 prefer online homework. Based on the sample, about how many students at the whole school prefer online homework?", choices:["$60$","$200$","$360$","$600$"], answer:2, explain:"$60/200 = 30\\%$ of the sample. $30\\%$ of 1,200 is 360." },
  { id:"sat-m-17", exam:"sat", section:"math", domain:"Problem-Solving & Data Analysis", diff:2, q:"A train travels at 72 kilometers per hour. What is this speed in meters per second? ($1$ km $= 1{,}000$ m)", answer:["20"], explain:"$72 \\text{ km/h} = \\dfrac{72{,}000 \\text{ m}}{3{,}600 \\text{ s}} = 20$ m/s." },
  { id:"sat-m-18", exam:"sat", section:"math", domain:"Problem-Solving & Data Analysis", diff:2, q:"In a class of 30 students, 12 are in the band. Of the band students, 5 also play soccer. If a band student is chosen at random, what is the probability that the student plays soccer?", choices:["$\\dfrac{5}{30}$","$\\dfrac{5}{12}$","$\\dfrac{12}{30}$","$\\dfrac{7}{12}$"], answer:1, explain:"We only choose among the 12 band students, and 5 of them play soccer: $\\dfrac{5}{12}$." },
  { id:"sat-m-19", exam:"sat", section:"math", domain:"Geometry & Trigonometry", diff:1, q:"A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?", answer:["10"], explain:"$c = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$." },
  { id:"sat-m-20", exam:"sat", section:"math", domain:"Geometry & Trigonometry", diff:3, q:"A circle has equation $x^2 + y^2 - 6x + 4y = 12$. What is the radius of the circle?", choices:["$5$","$12$","$25$","$\\sqrt{12}$"], answer:0, explain:"Complete the square: $(x - 3)^2 + (y + 2)^2 = 12 + 9 + 4 = 25$, so $r = \\sqrt{25} = 5$." },
  { id:"sat-m-21", exam:"sat", section:"math", domain:"Geometry & Trigonometry", diff:2, q:"In right triangle $ABC$ with the right angle at $C$, $\\sin A = \\dfrac{3}{5}$. What is $\\cos A$?", choices:["$\\dfrac{3}{4}$","$\\dfrac{4}{5}$","$\\dfrac{5}{3}$","$\\dfrac{5}{4}$"], answer:1, explain:"Opposite $= 3$, hypotenuse $= 5$, so adjacent $= 4$ (3-4-5 triangle). $\\cos A = \\dfrac{4}{5}$." },
  { id:"sat-m-22", exam:"sat", section:"math", domain:"Geometry & Trigonometry", diff:1, q:"Two angles of a triangle measure $48^\\circ$ and $67^\\circ$. What is the measure, in degrees, of the third angle?", answer:["65"], explain:"$180 - 48 - 67 = 65$." },
  { id:"sat-m-23", exam:"sat", section:"math", domain:"Geometry & Trigonometry", diff:2, q:"A circle has radius 9. What is the length of an arc with a central angle of $120^\\circ$?", choices:["$3\\pi$","$6\\pi$","$9\\pi$","$12\\pi$"], answer:1, explain:"$120^\\circ$ is $\\tfrac13$ of the circle. Circumference $= 18\\pi$, so the arc is $\\tfrac13 \\cdot 18\\pi = 6\\pi$." },
  { id:"sat-m-24", exam:"sat", section:"math", domain:"Geometry & Trigonometry", diff:2, q:"Triangle $PQR$ is similar to triangle $STU$. Side $PQ = 4$ corresponds to side $ST = 10$, and side $QR = 6$ corresponds to side $TU$. What is $TU$?", answer:["15"], explain:"The scale factor is $10 \\div 4 = 2.5$, so $TU = 6 \\times 2.5 = 15$." },

  /* ===================== SAT READING & WRITING ===================== */
  { id:"sat-rw-1", exam:"sat", section:"rw", domain:"Craft & Structure", diff:1,
    passage:"The botanist's field notes were remarkably ______: every leaf was measured to the tenth of a millimeter, and every flower was sketched from three different angles.",
    q:"Which choice completes the text with the most logical and precise word?", choices:["meticulous","hasty","ambiguous","sparse"], answer:0,
    explain:"The second half describes extreme care and detail, so “meticulous” (very careful and precise) fits. “Hasty” and “sparse” say the opposite, and nothing suggests the notes were unclear." },
  { id:"sat-rw-2", exam:"sat", section:"rw", domain:"Craft & Structure", diff:2,
    passage:"The committee members expected the new recycling plan to face strong opposition. To their surprise, the final vote was ______, with only one of the fifteen members voting against it.",
    q:"Which choice completes the text with the most logical and precise word?", choices:["divisive","decisive","tentative","delayed"], answer:1,
    explain:"A 14–1 vote is a clear, one-sided result: “decisive.” “Divisive” means splitting people into opposing sides, which is the opposite of what happened." },
  { id:"sat-rw-3", exam:"sat", section:"rw", domain:"Craft & Structure", diff:2,
    passage:"For decades, the city of Pontevedra, Spain, was crowded with cars. In 1999, the new mayor banned most cars from the city center. Critics predicted that shops would close and residents would leave. Instead, the center's population grew, and local businesses reported more customers walking by their doors.",
    q:"Which choice best describes the overall structure of the text?", choices:["It describes a problem, a change made to solve it, a prediction about the change, and what actually happened.","It compares two cities that made different decisions about cars.","It explains the history of car manufacturing in Spain.","It argues that every city should ban cars from its center immediately."], answer:0,
    explain:"The text moves: crowded with cars (problem) → ban (change) → critics' prediction → actual results. It never compares cities or argues that every city should follow." },
  { id:"sat-rw-4", exam:"sat", section:"rw", domain:"Craft & Structure", diff:2,
    passage:"Octopuses can change the color and texture of their skin in a fraction of a second. Even more surprising, they do this even though most octopus species are color-blind. Researchers are now testing whether light-sensitive proteins in the skin itself help octopuses “see” the colors around them.",
    q:"Which choice best states the main purpose of the text?", choices:["To present a puzzle about octopus camouflage and a possible explanation scientists are investigating","To argue that octopuses are the most intelligent animals in the ocean","To describe how octopuses hunt for food","To explain why most animals are color-blind"], answer:0,
    explain:"The text sets up a puzzle (color-blind animals that match colors) and then gives the idea researchers are testing. It does not discuss intelligence rankings or hunting." },
  { id:"sat-rw-5", exam:"sat", section:"rw", domain:"Information & Ideas", diff:1,
    passage:"Honeybees communicate the location of flowers through a “waggle dance.” A forager bee returning to the hive moves in a figure-eight pattern, and the angle of the straight middle run tells other bees the direction of the food compared with the sun. The longer the bee waggles, the farther away the food is.",
    q:"Which choice best states the main idea of the text?", choices:["Honeybees use the movements of a dance to share where food can be found.","Honeybees can only find food when the sun is shining.","Forager bees are larger than other bees in the hive.","Flowers that are farther away produce more food."], answer:0,
    explain:"Every sentence explains how the dance carries information about where food is (direction and distance). The other choices are not stated." },
  { id:"sat-rw-6", exam:"sat", section:"rw", domain:"Information & Ideas", diff:2,
    passage:"A student studied how many minutes four bird species spent singing each morning. The house finch sang for 34 minutes, the song sparrow for 52 minutes, the American robin for 41 minutes, and the northern cardinal for 18 minutes. The student concluded that among these four species, the song sparrow ______",
    q:"Which choice most effectively uses data from the text to complete the statement?", choices:["sang for the longest time each morning.","sang for less time than the American robin.","sang for about the same time as the northern cardinal.","did not sing in the morning."], answer:0,
    explain:"52 minutes is the largest of the four numbers (34, 52, 41, 18), so the song sparrow sang longest." },
  { id:"sat-rw-7", exam:"sat", section:"rw", domain:"Information & Ideas", diff:2,
    passage:"Tomatoes grown in a greenhouse with recorded classical music produced, on average, 12% more fruit than tomatoes grown in an identical greenhouse kept silent. However, the music greenhouse was also checked by gardeners twice as often, since they enjoyed spending time there. Therefore, the study ______",
    q:"Which choice most logically completes the text?", choices:["does not show that the music itself caused the plants to produce more fruit.","proves that all plants grow better with classical music.","shows that gardeners prefer silence while they work.","shows that tomatoes cannot grow in greenhouses."], answer:0,
    explain:"The extra care from gardeners is a second difference between the greenhouses, so we cannot tell whether the music or the attention made the difference." },
  { id:"sat-rw-8", exam:"sat", section:"rw", domain:"Information & Ideas", diff:3,
    passage:"A historian claims that the town of Millbrook grew rapidly after the railroad station opened there in 1872.",
    q:"Which finding, if true, would most directly support the historian's claim?", choices:["Millbrook's population rose from 800 in 1870 to 4,500 in 1880.","Millbrook's railroad station was built of red brick.","Several towns near Millbrook did not have railroad stations.","Millbrook was founded in 1820 by a group of farmers."], answer:0,
    explain:"The claim is about rapid growth after 1872. A big population jump between 1870 and 1880 is direct evidence of that growth." },
  { id:"sat-rw-9", exam:"sat", section:"rw", domain:"Standard English Conventions", diff:1,
    passage:"The museum's newest exhibit features the work of three ______ a sculptor from Ghana, a painter from Peru, and a weaver from Norway.",
    q:"Which choice completes the text so that it conforms to the conventions of Standard English?", choices:["artists:","artists;","artists, and","artists"], answer:0,
    explain:"A colon introduces a list that explains what came before it. A semicolon would need a complete sentence after it, and “and” or no punctuation makes the sentence ungrammatical." },
  { id:"sat-rw-10", exam:"sat", section:"rw", domain:"Standard English Conventions", diff:2,
    passage:"The collection of rare maps, which includes several drawn by hand in the 1600s, ______ on display at the city library until June.",
    q:"Which choice completes the text so that it conforms to the conventions of Standard English?", choices:["remain","remains","are remaining","have remained"], answer:1,
    explain:"The subject is “collection” (singular), not “maps.” A singular subject takes “remains.”" },
  { id:"sat-rw-11", exam:"sat", section:"rw", domain:"Standard English Conventions", diff:2,
    passage:"By the time the rescue team reached the trailhead, the stranded hikers ______ for nearly two days.",
    q:"Which choice completes the text so that it conforms to the conventions of Standard English?", choices:["have waited","will wait","had waited","wait"], answer:2,
    explain:"The waiting happened before another past event (the team reached the trailhead), so use the past perfect: “had waited.”" },
  { id:"sat-rw-12", exam:"sat", section:"rw", domain:"Standard English Conventions", diff:2,
    passage:"Mount Rainier is an active ______ scientists monitor it continuously for signs of an eruption.",
    q:"Which choice completes the text so that it conforms to the conventions of Standard English?", choices:["volcano;","volcano,","volcano","volcano, which"], answer:0,
    explain:"Both parts are complete sentences, so they need a semicolon (or a period). A comma alone makes a comma splice; “which” would leave the extra word “it.”" },
  { id:"sat-rw-13", exam:"sat", section:"rw", domain:"Expression of Ideas", diff:1,
    passage:"Solar panels lose some of their efficiency when they get very hot. ______ engineers in desert regions often mount the panels with open space underneath so that air can flow and cool them.",
    q:"Which choice completes the text with the most logical transition?", choices:["However,","Consequently,","Similarly,","For example,"], answer:1,
    explain:"Mounting panels for airflow is a RESULT of the heat problem, so a cause-and-effect transition fits: “Consequently.”" },
  { id:"sat-rw-14", exam:"sat", section:"rw", domain:"Expression of Ideas", diff:1,
    passage:"Many people assume that octopuses always live alone. ______ researchers off the coast of Australia have found sites where dozens of octopuses live close together and interact daily.",
    q:"Which choice completes the text with the most logical transition?", choices:["Therefore,","Likewise,","However,","In addition,"], answer:2,
    explain:"The second sentence contradicts the common assumption, so a contrast transition is needed: “However.”" },
  { id:"sat-rw-15", exam:"sat", section:"rw", domain:"Expression of Ideas", diff:2,
    passage:"While researching a topic, a student has taken the following notes:\n• The Great Wall of China is about 21,000 km long, counting all its branches.\n• Hadrian's Wall in England is about 117 km long.\n• Both walls were built to defend borders.",
    q:"The student wants to emphasize a difference between the two walls. Which choice most effectively uses relevant information from the notes to accomplish this goal?", choices:["The Great Wall of China, at about 21,000 km, is far longer than Hadrian's Wall, which is about 117 km.","Both the Great Wall of China and Hadrian's Wall were built to defend borders.","Hadrian's Wall is located in England.","Many walls have been built throughout history."], answer:0,
    explain:"The goal is a DIFFERENCE. Only the first choice contrasts the walls, using their lengths. The second choice states a similarity." },
  { id:"sat-rw-16", exam:"sat", section:"rw", domain:"Expression of Ideas", diff:2,
    passage:"Some trees release chemicals into the air when insects attack their leaves. ______ when caterpillars chew on a willow tree, nearby willows begin producing bitter compounds that make their own leaves less tasty.",
    q:"Which choice completes the text with the most logical transition?", choices:["For instance,","Nevertheless,","In contrast,","Finally,"], answer:0,
    explain:"The willow example illustrates the general statement in the first sentence, so “For instance” fits." },

  /* ===================== ACT MATH (4 choices) ===================== */
  { id:"act-m-1", exam:"act", section:"math", domain:"Number & Algebra", diff:1, q:"What is $15\\%$ of 80?", choices:["$8$","$12$","$15$","$65$"], answer:1, explain:"$0.15 \\times 80 = 12$." },
  { id:"act-m-2", exam:"act", section:"math", domain:"Number & Algebra", diff:1, q:"What value of $x$ satisfies $4(x - 2) = 2x + 6$?", choices:["$1$","$2$","$7$","$14$"], answer:2, explain:"$4x - 8 = 2x + 6 \\Rightarrow 2x = 14 \\Rightarrow x = 7$." },
  { id:"act-m-3", exam:"act", section:"math", domain:"Functions", diff:2, q:"What is the slope of the line $3x - 2y = 8$?", choices:["$-\\dfrac{3}{2}$","$\\dfrac{2}{3}$","$\\dfrac{3}{2}$","$3$"], answer:2, explain:"Solve for $y$: $-2y = -3x + 8 \\Rightarrow y = \\tfrac32 x - 4$. The slope is $\\tfrac32$." },
  { id:"act-m-4", exam:"act", section:"math", domain:"Geometry", diff:1, q:"What is the distance between the points $(1, 2)$ and $(7, 10)$ in the standard $(x, y)$ coordinate plane?", choices:["$8$","$10$","$14$","$100$"], answer:1, explain:"$\\sqrt{(7 - 1)^2 + (10 - 2)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$." },
  { id:"act-m-5", exam:"act", section:"math", domain:"Functions", diff:2, q:"If $f(x) = 2x + 1$ and $g(x) = x^2$, what is $f(g(3))$?", choices:["$13$","$19$","$49$","$36$"], answer:1, explain:"Inside first: $g(3) = 9$. Then $f(9) = 2(9) + 1 = 19$. ($49$ is $g(f(3))$.)" },
  { id:"act-m-6", exam:"act", section:"math", domain:"Number & Algebra", diff:1, q:"What is the positive solution of $x^2 - 5x - 14 = 0$?", choices:["$2$","$5$","$7$","$14$"], answer:2, explain:"Factor: $(x - 7)(x + 2) = 0$, so $x = 7$ or $x = -2$. The positive solution is 7." },
  { id:"act-m-7", exam:"act", section:"math", domain:"Geometry", diff:1, q:"A circle has a diameter of 10 inches. What is its area, in square inches?", choices:["$10\\pi$","$20\\pi$","$25\\pi$","$100\\pi$"], answer:2, explain:"The radius is 5, so the area is $\\pi r^2 = 25\\pi$. ($100\\pi$ uses the diameter by mistake.)" },
  { id:"act-m-8", exam:"act", section:"math", domain:"Functions", diff:2, q:"What is the value of $\\log_2 64$?", choices:["$5$","$6$","$8$","$32$"], answer:1, explain:"$2^6 = 64$, so $\\log_2 64 = 6$." },
  { id:"act-m-9", exam:"act", section:"math", domain:"Statistics & Probability", diff:2, q:"Ana's mean score on 5 tests is 82. What score does she need on a 6th test for her mean on all 6 tests to be 84?", choices:["$84$","$86$","$90$","$94$"], answer:3, explain:"She needs a total of $6 \\times 84 = 504$. She has $5 \\times 82 = 410$, so she needs $504 - 410 = 94$." },
  { id:"act-m-10", exam:"act", section:"math", domain:"Number & Algebra", diff:3, q:"Which inequality is equivalent to $|2x - 3| < 5$?", choices:["$-1 < x < 4$","$x < 4$","$x > -1$","$x < -1 \\text{ or } x > 4$"], answer:0, explain:"$-5 < 2x - 3 < 5 \\Rightarrow -2 < 2x < 8 \\Rightarrow -1 < x < 4$. A “less than” absolute value gives one connected interval." },
  { id:"act-m-11", exam:"act", section:"math", domain:"Number & Algebra", diff:2, q:"For $i = \\sqrt{-1}$, what is $(3 + 2i)(3 - 2i)$?", choices:["$5$","$9 - 4i$","$13$","$9 + 4i^2$"], answer:2, explain:"$9 - 6i + 6i - 4i^2 = 9 - 4(-1) = 13$." },
  { id:"act-m-12", exam:"act", section:"math", domain:"Statistics & Probability", diff:1, q:"Two fair coins are tossed. What is the probability that both land heads up?", choices:["$\\dfrac{1}{4}$","$\\dfrac{1}{3}$","$\\dfrac{1}{2}$","$\\dfrac{3}{4}$"], answer:0, explain:"The outcomes are HH, HT, TH, TT. Only 1 of the 4 is HH: $\\tfrac14$." },
  { id:"act-m-13", exam:"act", section:"math", domain:"Geometry", diff:2, q:"What is the sum of the interior angle measures of a hexagon?", choices:["$360^\\circ$","$540^\\circ$","$720^\\circ$","$1{,}080^\\circ$"], answer:2, explain:"For an $n$-gon the sum is $(n - 2) \\cdot 180^\\circ = 4 \\cdot 180^\\circ = 720^\\circ$." },
  { id:"act-m-14", exam:"act", section:"math", domain:"Functions", diff:2, q:"The first term of an arithmetic sequence is 5 and the common difference is 3. What is the 20th term?", choices:["$57$","$60$","$62$","$65$"], answer:2, explain:"$a_{20} = a_1 + 19d = 5 + 19(3) = 62$. (Use 19 steps, not 20.)" },
  { id:"act-m-15", exam:"act", section:"math", domain:"Geometry", diff:1, q:"A cylinder has radius 3 cm and height 4 cm. What is its volume, in cubic centimeters?", choices:["$12\\pi$","$24\\pi$","$36\\pi$","$48\\pi$"], answer:2, explain:"$V = \\pi r^2 h = \\pi (9)(4) = 36\\pi$." },
  { id:"act-m-16", exam:"act", section:"math", domain:"Number & Algebra", diff:2, q:"For all nonzero $x$ and $y$, which expression is equivalent to $\\dfrac{(x^3 y^2)^2}{x^2 y}$?", choices:["$x^4 y^3$","$x^3 y^3$","$x^4 y^4$","$x^6 y^3$"], answer:0, explain:"$(x^3 y^2)^2 = x^6 y^4$. Divide: $x^{6-2} y^{4-1} = x^4 y^3$." },
  { id:"act-m-17", exam:"act", section:"math", domain:"Number & Algebra", diff:1, q:"A bag has 64 marbles. The ratio of red marbles to blue marbles is $3:5$, and there are no other colors. How many marbles are red?", choices:["$15$","$24$","$30$","$40$"], answer:1, explain:"There are $3 + 5 = 8$ parts, so each part is $64 \\div 8 = 8$ marbles. Red $= 3 \\times 8 = 24$." },
  { id:"act-m-18", exam:"act", section:"math", domain:"Geometry", diff:2, q:"In a right triangle, $\\tan \\theta = \\dfrac{5}{12}$ for an acute angle $\\theta$. What is $\\sin \\theta$?", choices:["$\\dfrac{5}{13}$","$\\dfrac{12}{13}$","$\\dfrac{5}{12}$","$\\dfrac{13}{5}$"], answer:0, explain:"Opposite $= 5$, adjacent $= 12$, so the hypotenuse is 13 (5-12-13). $\\sin\\theta = \\tfrac{5}{13}$." },
  { id:"act-m-19", exam:"act", section:"math", domain:"Functions", diff:2, q:"What is the domain of $f(x) = \\sqrt{x - 4}$ over the real numbers?", choices:["$x \\ge 0$","$x \\ge 4$","$x > 4$","all real numbers"], answer:1, explain:"The expression under a square root cannot be negative: $x - 4 \\ge 0$, so $x \\ge 4$." },
  { id:"act-m-20", exam:"act", section:"math", domain:"Statistics & Probability", diff:2, q:"How many different 3-person committees can be chosen from a group of 7 people?", choices:["$21$","$35$","$210$","$343$"], answer:1, explain:"Order does not matter, so use combinations: $\\binom{7}{3} = \\dfrac{7 \\cdot 6 \\cdot 5}{3 \\cdot 2 \\cdot 1} = 35$. ($210$ counts ordered choices.)" },

  /* ===================== ACT ENGLISH (one passage) ===================== */
  { id:"act-e-1", exam:"act", section:"english", passage:"act-eng-1", n:1, q:"Question 1", choices:["NO CHANGE","its","its'","their"], answer:1, explain:"“It's” means “it is.” The possessive of “it” is “its” (no apostrophe). The town is singular, so not “their.”" },
  { id:"act-e-2", exam:"act", section:"english", passage:"act-eng-1", n:2, q:"Question 2", choices:["NO CHANGE","arrives, some of them carrying","arrives some of them carry","arrives, some of them, carry"], answer:1, explain:"The original joins two sentences with only a comma (comma splice). “Carrying” turns the second part into a phrase that describes the children." },
  { id:"act-e-3", exam:"act", section:"english", passage:"act-eng-1", n:3, q:"Question 3", choices:["NO CHANGE","filled its cabins","filled its cabin's","filling its cabins"], answer:1, explain:"Possessive “its” has no apostrophe, and “cabins” is a simple plural. “Filled” keeps the series parallel with “borrowed” and “spent.”" },
  { id:"act-e-4", exam:"act", section:"english", passage:"act-eng-1", n:4, q:"Question 4", choices:["NO CHANGE","Nevertheless,","In fact,","For example,"], answer:2, explain:"The popularity doesn't contrast with the experiment; it adds a stronger point about how well it went. “In fact” emphasizes this." },
  { id:"act-e-5", exam:"act", section:"english", passage:"act-eng-1", n:5, q:"Question 5", choices:["NO CHANGE","small but, well-stocked","small but well-stocked","small, but, well-stocked"], answer:2, explain:"“Small but well-stocked” is one description, so no comma is needed before or after “but.”" },
  { id:"act-e-6", exam:"act", section:"english", passage:"act-eng-1", n:6, q:"Question 6", choices:["NO CHANGE","helping","has helped","help"], answer:3, explain:"The subject is “volunteers” (plural), so the verb is “help.” The phrase “from each island” does not change the subject." },
  { id:"act-e-7", exam:"act", section:"english", passage:"act-eng-1", n:7, q:"Question 7. Which choice most effectively introduces the paragraph?", choices:["NO CHANGE","The *Wren* is painted blue and white.","Ferries were first used in ancient times.","Delgado grew up on the mainland."], answer:0, explain:"The paragraph is about what happens when trips are canceled (“On those weekends…”), so the sentence about rough weather sets it up." },
  { id:"act-e-8", exam:"act", section:"english", passage:"act-eng-1", n:8, q:"Question 8", choices:["NO CHANGE","Because","Despite the fact that","Although"], answer:1, explain:"“Because” is concise and gives the reason. “Due to the fact that” is wordy; “Although” and “Despite” show contrast, which is wrong here." },
  { id:"act-e-9", exam:"act", section:"english", passage:"act-eng-1", n:9, q:"Question 9. If the writer deleted this sentence, the paragraph would primarily lose:", choices:["a statement that the rest of the paragraph supports with examples.","a description of the boat's engine.","a detail about the number of books on board.","the writer's criticism of the county."], answer:0, explain:"The sentence states the paragraph's main point (the boat brings neighbors together); the examples that follow support it." },
  { id:"act-e-10", exam:"act", section:"english", passage:"act-eng-1", n:10, q:"Question 10", choices:["NO CHANGE","jobs, and colleges and scholarships.","jobs, colleges, and scholarships.","jobs and, colleges, and scholarships."], answer:2, explain:"This is a list of three: jobs, colleges, and scholarships. Use commas between the items and “and” only before the last one." },
  { id:"act-e-11", exam:"act", section:"english", passage:"act-eng-1", n:11, q:"Question 11. Which choice provides the most effective conclusion to the essay?", choices:["NO CHANGE","Fishing is an important industry on the islands.","The county also owns two snowplows.","Some people prefer e-books to printed books."], answer:0, explain:"The quotation sums up the essay's central idea—the boat connects the community—so it makes a strong conclusion." },
  { id:"act-e-12", exam:"act", section:"english", passage:"act-eng-1", n:12, q:"Question 12. Suppose the writer's goal had been to describe how libraries in general are funded. Would this essay accomplish that goal?", choices:["Yes, because it explains how the county bought the boat.","Yes, because it lists the number of books on the boat.","No, because it focuses on one floating library and its role in a community.","No, because it is mostly about ferries and how they are built."], answer:2, explain:"The essay is a portrait of one library-boat and what it means to the islands, not an explanation of library funding in general." },

  /* ===================== ACT READING (one passage) ===================== */
  { id:"act-r-1", exam:"act", section:"reading", passage:"act-read-1", q:"The main purpose of the passage is to:", choices:["describe what lichens are, how scientists came to understand them, and why they matter.","argue that Simon Schwendener was the greatest botanist of his time.","explain how to grow lichens on stone walls.","compare lichens with mosses and ferns."], answer:0, explain:"The passage covers what lichens are (¶1), the history of the idea (¶1–2), the partnership (¶3–4) and their use as air-quality signs (¶5)." },
  { id:"act-r-2", exam:"act", section:"reading", passage:"act-read-1", q:"According to the passage, Schwendener's main idea was that a lichen:", choices:["is a simple plant.","is made of a fungus and an alga living together.","is a kind of yeast.","can only grow on stone."], answer:1, explain:"Paragraph 1: “a lichen is not one organism at all but two—a fungus and an alga living as a single body.”" },
  { id:"act-r-3", exam:"act", section:"reading", passage:"act-read-1", q:"As it is used in paragraph 2, the word *absurd* most nearly means:", choices:["ridiculous.","dangerous.","complicated.","ancient."], answer:0, explain:"Colleagues compared the idea to “a fairy tale,” so they thought it was ridiculous." },
  { id:"act-r-4", exam:"act", section:"reading", passage:"act-read-1", q:"According to paragraph 3, the fungus contributes to the partnership by:", choices:["making sugar from sunlight.","protecting the alga and collecting water and minerals.","producing bright colors.","moving the lichen to sunny places."], answer:1, explain:"The fungus “builds a tough outer layer that shields the alga” and “pulls water and minerals” from the environment. Making sugar is the alga's job." },
  { id:"act-r-5", exam:"act", section:"reading", passage:"act-read-1", q:"It can most reasonably be inferred from paragraph 3 that lichens can live on bare stone mainly because:", choices:["stone contains a lot of sugar.","each partner provides something the other cannot.","stone protects them from all sunlight.","they do not need any water."], answer:1, explain:"The paragraph says “each member supplies what the other lacks” and that together they survive where “neither could live alone.”" },
  { id:"act-r-6", exam:"act", section:"reading", passage:"act-read-1", q:"The main function of paragraph 4 is to:", choices:["show that scientists' understanding of lichens is still developing.","prove that Schwendener was wrong.","describe the colors of different lichens.","explain how yeast is used in baking."], answer:0, explain:"Paragraph 4 reports a 2016 discovery and says its role is “still being studied”—the story “has continued to grow.”" },
  { id:"act-r-7", exam:"act", section:"reading", passage:"act-read-1", q:"The comparison to a doctor checking a pulse (paragraph 5) suggests that lichen surveys are:", choices:["a simple way to check the health of the environment.","painful for the lichens.","used only by doctors.","a way to make lichens grow faster."], answer:0, explain:"A pulse is a quick sign of a body's health; a lichen survey is a quick sign of air quality." },
  { id:"act-r-8", exam:"act", section:"reading", passage:"act-read-1", q:"Based on paragraph 5, a wall with only one or two hardy kinds of lichen would most likely be found:", choices:["in a place with polluted air.","in a place with very clean air.","only in the desert.","only on wooden fences."], answer:0, explain:"Many species “disappear when the air becomes dirty,” so having only a few hardy species “may signal a problem.”" },
];

/* ---------------- Unlimited practice: question generators ----------------
   Each returns { q, choices?, answer, explain }. Numbers are chosen so every answer is a whole number. */
const GENERATORS = [
  { id:"g-linear", exam:"both", name:"Linear equations", desc:"Solve $ax + b = cx + d$", make(r){
    let a, c; do { a = r(2, 9); c = r(-6, 6); } while (a === c || c === 0);
    const x = r(-9, 12), b = r(-20, 20), d = (a - c) * x + b;
    const L = `${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)}`, R = `${c === 1 ? "" : c === -1 ? "-" : c}x ${d < 0 ? "-" : "+"} ${Math.abs(d)}`;
    return mc(`If $${L} = ${R}$, what is the value of $x$?`, x, [x + 1, -x, x - 2, x + 3, 2 * x], r,
      `Move the $x$-terms to one side: $${a - c}x = ${d - b}$, so $x = ${x}$.`); } },
  { id:"g-slope", exam:"both", name:"Slope of a line", desc:"Slope through two points", make(r){
    const m = r(-5, 5) || 2, x1 = r(-6, 4), dx = r(1, 5), y1 = r(-8, 8), x2 = x1 + dx, y2 = y1 + m * dx;
    return mc(`What is the slope of the line through $(${x1}, ${y1})$ and $(${x2}, ${y2})$?`, m, [-m, m + 1, m - 1, dx], r,
      `Slope $= \\dfrac{${y2} - (${y1})}{${x2} - (${x1})} = \\dfrac{${y2 - y1}}{${dx}} = ${m}$.`); } },
  { id:"g-system", exam:"both", name:"Systems of equations", desc:"Find $x + y$ from a system", make(r){
    const x = r(-5, 9), y = r(-5, 9), a = r(1, 4), b = r(1, 4);
    return mc(`If $x + y = ${x + y}$ and $${a === 1 ? "" : a}x - ${b === 1 ? "" : b}y = ${a * x - b * y}$, what is the value of $x$?`, x, [y, x + y, x - 1, x + 2], r,
      `From the first equation, $y = ${x + y} - x$. Substitute: $${a}x - ${b}(${x + y} - x) = ${a * x - b * y}$, so $${a + b}x = ${a * x - b * y + b * (x + y)}$ and $x = ${x}$.`); } },
  { id:"g-percent", exam:"both", name:"Percent change", desc:"Increase or decrease", make(r){
    const p = [10, 20, 25, 40, 50, 60, 75][r(0, 6)], base = [20, 40, 60, 80, 120, 200][r(0, 5)], up = r(0, 1) === 1;
    const now = up ? base * (100 + p) / 100 : base * (100 - p) / 100;
    if (!Number.isInteger(now)) return this.make(r);
    return mc(`A price changed from \\$${base} to \\$${now}. By what percent did it ${up ? "increase" : "decrease"}?`, p, [p + 10, Math.round(Math.abs(now - base) / now * 100), 100 - p, p / 2], r,
      `Change $= ${Math.abs(now - base)}$. Divide by the original price: $\\dfrac{${Math.abs(now - base)}}{${base}} = ${p}\\%$.`, "%"); } },
  { id:"g-quad", exam:"both", name:"Quadratic roots", desc:"Sum or product of solutions", make(r){
    let p, q; do { p = r(-9, 9); q = r(-9, 9); } while (p === 0 || q === 0 || p === -q);
    const sum = p + q, prod = p * q, askSum = r(0, 1) === 1;
    const eq = `x^2 ${-sum < 0 ? "-" : "+"} ${Math.abs(sum)}x ${prod < 0 ? "-" : "+"} ${Math.abs(prod)} = 0`;
    const ans = askSum ? sum : prod;
    return mc(`What is the ${askSum ? "sum" : "product"} of the solutions to $${eq}$?`, ans, [-ans, askSum ? prod : sum, ans + 1, ans - 2], r,
      `The equation factors as $(x ${-p < 0 ? "-" : "+"} ${Math.abs(p)})(x ${-q < 0 ? "-" : "+"} ${Math.abs(q)}) = 0$, so the solutions are $${p}$ and $${q}$. Their ${askSum ? "sum" : "product"} is $${ans}$.`); } },
  { id:"g-pyth", exam:"both", name:"Right triangles", desc:"Pythagorean theorem", make(r){
    const t = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29]][r(0, 6)], k = r(1, 3);
    const [a, b, c] = t.map(v => v * k), findHyp = r(0, 1) === 1;
    return findHyp
      ? mc(`A right triangle has legs $${a}$ and $${b}$. What is the length of the hypotenuse?`, c, [a + b, c + 1, b + 1, c - 2], r, `$\\sqrt{${a}^2 + ${b}^2} = \\sqrt{${c * c}} = ${c}$.`)
      : mc(`A right triangle has hypotenuse $${c}$ and one leg $${a}$. What is the length of the other leg?`, b, [c - a, b + 1, c + a, b - 2], r, `$\\sqrt{${c}^2 - ${a}^2} = \\sqrt{${b * b}} = ${b}$.`); } },
  { id:"g-mean", exam:"both", name:"Mean & missing value", desc:"Find the missing score", make(r){
    const n = r(4, 6), mean = r(70, 90), vals = Array.from({ length: n - 1 }, () => r(mean - 12, mean + 12));
    const missing = n * mean - vals.reduce((a, v) => a + v, 0);
    if (missing < 40 || missing > 100) return this.make(r);
    return mc(`The mean of ${n} test scores is ${mean}. ${n - 1} of the scores are ${vals.join(", ")}. What is the remaining score?`, missing, [mean, missing + 5, missing - 4, Math.round(vals.reduce((a, v) => a + v, 0) / (n - 1))], r,
      `Total needed $= ${n} \\times ${mean} = ${n * mean}$. Known total $= ${vals.reduce((a, v) => a + v, 0)}$. Missing $= ${missing}$.`); } },
];
// helper: build a 4-choice question with distinct wrong answers
function mc(q, right, wrongPool, r, explain, unit){
  const wrongs = [...new Set(wrongPool.filter(w => w !== right && Number.isFinite(w)))];
  let k = 1; while (wrongs.length < 3) { const w = right + k * (k % 2 ? 1 : -1) * 3; if (w !== right && !wrongs.includes(w)) wrongs.push(w); k++; }
  const opts = [right, ...wrongs.slice(0, 3)];
  for (let i = opts.length - 1; i > 0; i--) { const j = r(0, i); [opts[i], opts[j]] = [opts[j], opts[i]]; }
  const u = unit === "%" ? "\\%" : "";
  return { q, choices: opts.map(o => `$${o}${u}$`), answer: opts.indexOf(right), explain };
}

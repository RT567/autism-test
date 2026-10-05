(function () {
  "use strict";

  var app = document.getElementById("app");
  var TOTAL = 6;

  // ---------- helpers ----------
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (k === "class") n.className = attrs[k];
        else if (k === "html") n.innerHTML = attrs[k];
        else if (k === "text") n.textContent = attrs[k];
        else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
        else if (attrs[k] === true) n.setAttribute(k, "");
        else if (attrs[k] !== false && attrs[k] != null) n.setAttribute(k, attrs[k]);
      }
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  var today = new Date();
  var dateStr = today.getFullYear() + "-" + pad(today.getMonth() + 1) + "-" + pad(today.getDate());
  var respondentId = "R-" + (10000 + Math.floor(Math.random() * 89999));

  // ---------- content ----------
  var FACES = shuffle([
    { src: "img/option-a.jpg", name: "Michael Cera", match: false },
    { src: "img/option-b.jpg", name: "Jesse Eisenberg", match: true },
    { src: "img/option-c.jpg", name: "Mark Zuckerberg", match: false },
    { src: "img/option-d.jpg", name: "Andrew Garfield", match: false }
  ]);
  var LETTERS = ["A", "B", "C", "D"];

  var Q = [
    {
      id: "q1",
      code: "A-03",
      type: "single",
      short: "Solitary, repetitive activities",
      text: "As a teenager, did you find comfort in individual, repetitive, practice-based activities (for example, magic)?",
      help: "Select the option that best describes you between the ages of 13 and 19.",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      codes: true
    },
    {
      id: "q2",
      code: "B-09",
      type: "single",
      short: "Social self-perception",
      text: "When you’re in a room of people, how smart do you feel relative to everyone else?",
      help: "Think of a typical gathering, such as a party, a lecture, or a family meal.",
      options: ["The smartest in the room", "Smarter than most", "About as smart as everyone else", "Less smart than most", "The least smart in the room"]
    },
    {
      id: "q3",
      code: "C-07",
      type: "single",
      short: "Comfort media",
      text: "As a teenager, did you obsess over any comfort media? For example, a film or series of films that you returned to again and again.",
      help: "“Obsess” here means watched, rewatched, or thought about more than twice a week.",
      options: ["Yes", "Somewhat", "No", "Prefer not to say"]
    },
    {
      id: "q4",
      code: "D-11",
      type: "faces",
      short: "Facial recognition",
      text: "Some autistic people find facial recognition difficult. Please select the photo that matches this man.",
      help: "Take as long as you need. Select one photograph."
    },
    {
      id: "q5",
      code: "E-14",
      type: "multi",
      short: "Behavioural inventory",
      html: "Have you ever done any of the following?",
      help: "Select all that apply.",
      options: [
        "Said “the closer you look, the less you see” aloud, in a non-magic context",
        "Assigned members of your family to the Four Horsemen",
        "Watched <cite>Now You See Me 2</cite> (2016) and defended it",
        "Attempted a card flourish at a family meal",
        "Performed a card trick for someone who had said no",
        "Refused to explain how you did something “for their own protection”"
      ],
      none: "None of the above"
    },
    {
      id: "q6",
      code: "F-22",
      type: "scale",
      short: "Enjoyment of Now You See Me",
      html: "On a scale of 1 to 10, how much did you enjoy the 2013 magic-based feature film <cite>Now You See Me</cite>, featuring Jesse Eisenberg?",
      help: ""
    }
  ];

  var answers = {};

  // ---------- chrome ----------
  function sheet(formbarRight, bodyChildren) {
    return el("section", { class: "sheet" }, [
      el("div", { class: "formbar" }, [
        el("span", { text: "Form NYSM-R · Rev. 2.1" }),
        el("span", { text: formbarRight })
      ]),
      el("div", { class: "sheet-body" }, bodyChildren)
    ]);
  }

  function show(node) {
    app.innerHTML = "";
    app.appendChild(node);
    window.scrollTo(0, 0);
    try { app.focus({ preventScroll: true }); } catch (e) { app.focus(); }
  }

  function progress(i) {
    // Faithful progress (reaches 100% on the last item); the total is never shown as text.
    var pct = Math.round((i + 1) / TOTAL * 100);
    var fill = el("i", { style: "width:" + pct + "%" });
    return el("div", { class: "progress", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": pct, "aria-label": "Progress" }, [fill]);
  }

  // ---------- intro ----------
  function renderIntro() {
    var rows = [
      ["Instrument", "NYSM-R (Neurodevelopmental Youth Screening Measure, Revised)"],
      ["Condition screened", "Autism spectrum disorder (ASD)"],
      ["Version", "2.1"],
      ["Administration", "Self-report, adaptive"],
      ["Estimated time", "2–4 minutes"],
      ["Respondent ID", respondentId],
      ["Date", dateStr]
    ];
    var table = el("table", { class: "meta-table" }, [
      el("tbody", null, rows.map(function (r) {
        return el("tr", null, [el("th", { scope: "row", text: r[0] }), el("td", { text: r[1] })]);
      }))
    ]);
    show(sheet("Respondent information", [
      el("div", { class: "intro-grid" }, [
        el("div", { class: "intro-main" }, [
          el("p", { class: "eyebrow", text: "Autism spectrum screening" }),
          el("h1", { text: "Autism Spectrum Screening Questionnaire" }),
          el("p", { class: "lede", text: "This brief self-report screen assesses autism spectrum traits with adolescent onset. It asks about interests and experiences you may have had as a teenager. There are no right or wrong answers." }),
          el("div", { class: "instructions" }, [
            el("p", { text: "Your responses are not stored or transmitted." })
          ])
        ]),
        el("div", { class: "intro-side" }, [table])
      ]),
      el("div", { class: "nav" }, [
        el("span", { class: "fine", text: "Adaptive item selection in use" }),
        el("button", { class: "btn", type: "button", onclick: function () { renderQuestion(0); }, text: "Begin screening" })
      ])
    ]));
  }

  // ---------- questions ----------
  function renderQuestion(i) {
    var q = Q[i];
    var next = el("button", { class: "btn", type: "button", text: "Next" });
    var back = el("button", { class: "btn link", type: "button", text: "← Back" });
    back.addEventListener("click", function () { if (i === 0) renderIntro(); else renderQuestion(i - 1); });
    next.addEventListener("click", function () {
      if (i === TOTAL - 1) renderProcessing(); else renderQuestion(i + 1);
    });

    var qText = el("p", { class: "q-text", id: q.id + "-text" });
    if (q.html) qText.innerHTML = q.html; else qText.textContent = q.text;

    var body;
    if (q.type === "single") body = singleChoice(q, next);
    else if (q.type === "multi") body = multiChoice(q, next);
    else if (q.type === "scale") body = scaleChoice(q, next);
    else body = faceChoice(q, next);

    show(sheet("Section " + q.code.charAt(0) + " · Item " + q.code, [
      progress(i),
      el("div", { class: "q-layout q-" + q.type }, [
        el("div", { class: "q-head" }, [
          el("p", { class: "q-number", text: "Item " + q.code + " · " + q.short }),
          qText,
          q.help ? el("p", { class: "q-help", text: q.help }) : null
        ]),
        el("div", { class: "q-body" }, [body])
      ]),
      el("div", { class: "nav" }, [back, body.ackSlot || null, next])
    ]));
  }

  function singleChoice(q, next) {
    next.disabled = answers[q.id] == null;
    var fs = el("fieldset", { "aria-labelledby": q.id + "-text" });
    var list = el("div", { class: "choices" });
    q.options.forEach(function (opt, k) {
      var input = el("input", { type: "radio", name: q.id, value: k });
      if (answers[q.id] === k) input.checked = true;
      input.addEventListener("change", function () { answers[q.id] = k; next.disabled = false; });
      list.appendChild(el("label", { class: "choice" }, [
        input,
        el("span", { text: opt }),
        q.codes ? el("span", { class: "code", "aria-hidden": "true", text: "(" + k + ")" }) : null
      ]));
    });
    fs.appendChild(list);
    return fs;
  }

  function multiChoice(q, next) {
    var sel = answers[q.id] || [];
    var fs = el("fieldset", { "aria-labelledby": q.id + "-text" });
    var list = el("div", { class: "choices" });
    var boxes = [];
    var noneBox;
    function sync() {
      var picked = [];
      boxes.forEach(function (b, k) { if (b.checked) picked.push(k); });
      if (noneBox.checked) picked = ["none"];
      answers[q.id] = picked;
      next.disabled = picked.length === 0;
    }
    q.options.forEach(function (opt, k) {
      var input = el("input", { type: "checkbox", name: q.id, value: k });
      input.checked = sel.indexOf(k) !== -1;
      input.addEventListener("change", function () { if (input.checked) noneBox.checked = false; sync(); });
      boxes.push(input);
      list.appendChild(el("label", { class: "choice" }, [input, el("span", { html: opt })]));
    });
    noneBox = el("input", { type: "checkbox", name: q.id, value: "none" });
    noneBox.checked = sel[0] === "none";
    noneBox.addEventListener("change", function () {
      if (noneBox.checked) boxes.forEach(function (b) { b.checked = false; });
      sync();
    });
    list.appendChild(el("label", { class: "choice" }, [noneBox, el("span", { text: q.none })]));
    fs.appendChild(list);
    next.disabled = sel.length === 0;
    return fs;
  }

  function scaleChoice(q, next) {
    next.disabled = answers[q.id] == null;
    var fs = el("fieldset", { "aria-labelledby": q.id + "-text" });
    var grid = el("div", { class: "scale" });
    for (var v = 1; v <= 10; v++) {
      (function (v) {
        var input = el("input", { type: "radio", name: q.id, value: v, "aria-label": v + " out of 10" });
        if (answers[q.id] === v) input.checked = true;
        input.addEventListener("change", function () { answers[q.id] = v; next.disabled = false; });
        grid.appendChild(el("label", null, [input, el("span", { "aria-hidden": "true", text: String(v) })]));
      })(v);
    }
    fs.appendChild(grid);
    fs.appendChild(el("div", { class: "scale-anchors", "aria-hidden": "true" }, [
      el("span", { text: "1 · Not at all" }),
      el("span", { text: "10 · Extremely" })
    ]));
    return fs;
  }

  function faceChoice(q, next) {
    var wrap = el("div");
    var picked = answers[q.id];
    next.disabled = picked == null;

    var lineup = el("div", { class: "lineup" });
    wrap.appendChild(lineup);
    lineup.appendChild(el("figure", { class: "face-ref" }, [
      el("img", { src: "img/subject.jpg", alt: "Reference photograph of the subject", width: "480", height: "600" }),
      el("figcaption", { class: "ref-meta", html: "<strong>Reference subject</strong><br>Subject ID: S-0004" })
    ]));

    var grid = el("div", { class: "faces", role: "group", "aria-label": "Candidate photographs" });
    var ack = el("div", { class: "ack-slot", "aria-live": "polite" });
    var buttons = [];

    function reveal(k, animate) {
      grid.classList.add("revealed");
      buttons.forEach(function (b, j) {
        b.disabled = true;
        if (j === k) b.classList.add("picked");
      });
      ack.innerHTML = "";
      var a = el("p", { class: "ack" }, [
        "Thank you.",
        el("span", { class: "fine", text: "Your response has been recorded." })
      ]);
      if (!animate) a.style.animation = "none";
      ack.appendChild(a);
      next.disabled = false;
    }

    FACES.forEach(function (f, k) {
      var b = el("button", { class: "face" + (f.match ? " match" : ""), type: "button", "aria-label": "Photograph " + LETTERS[k] }, [
        el("img", { src: f.src, alt: "", width: "480", height: "600", loading: "eager" }),
        el("span", { class: "face-label" }, [el("span", { text: "Photo " + LETTERS[k] }), el("span", { text: f.match ? "✓ Match" : "", "aria-hidden": "true", class: "tick" })]),
        el("span", { class: "face-name", text: f.name })
      ]);
      // hide the tick until revealed
      b.querySelector(".tick").style.visibility = "hidden";
      b.addEventListener("click", function () {
        answers[q.id] = k;
        buttons.forEach(function (bb) { var t = bb.querySelector(".tick"); t.style.visibility = "visible"; });
        reveal(k, true);
      });
      buttons.push(b);
      grid.appendChild(b);
    });
    lineup.appendChild(grid);
    wrap.appendChild(ack);
    wrap.ackSlot = ack;

    if (picked != null) {
      buttons.forEach(function (bb) { bb.querySelector(".tick").style.visibility = "visible"; });
      reveal(picked, false);
    }
    return wrap;
  }

  // ---------- processing ----------
  function renderProcessing() {
    var steps = ["Termination criterion met…", "Scoring responses…", "Applying item weights…", "Consulting normative data…", "Generating report…"];
    var stepEl = el("p", { class: "step", text: steps[0] });
    show(sheet("Processing", [
      el("div", { class: "processing" }, [
        el("h2", { text: "Please wait" }),
        el("div", { class: "bar" }, [el("i")]),
        stepEl
      ])
    ]));
    var s = 0;
    var t = setInterval(function () {
      s++;
      if (s < steps.length) stepEl.textContent = steps[s];
    }, 480);
    setTimeout(function () { clearInterval(t); renderResult(); }, 2100);
  }

  // ---------- result ----------
  var BANDS = [
    { max: 2, label: "Minimal indication", text: "Responses are not consistent with a clinically significant attachment to <cite>Now You See Me</cite> (2013). The respondent may wish to watch it again under supervised conditions to confirm this result." },
    { max: 4, label: "Low indication", text: "The respondent reports some enjoyment of <cite>Now You See Me</cite> (2013), within the range typically observed in people who saw it once on a plane. No further action is recommended." },
    { max: 6, label: "Moderate indication", text: "The respondent reports moderate enjoyment of <cite>Now You See Me</cite> (2013). This profile is common among those who first encountered the film between the ages of 13 and 19. Periodic rewatching should be monitored." },
    { max: 8, label: "Elevated indication", text: "The respondent reports marked enjoyment of <cite>Now You See Me</cite> (2013). Profiles in this range are frequently associated with knowledge of the Four Horsemen’s names and an unprompted opinion on the sequel." },
    { max: 10, label: "High indication", text: "The respondent reports near-maximal enjoyment of <cite>Now You See Me</cite> (2013). This is the strongest result the instrument can produce. Family members are advised that the respondent has almost certainly explained the Eye to one of them already." }
  ];

  function bandFor(n) {
    for (var i = 0; i < BANDS.length; i++) if (n <= BANDS[i].max) return BANDS[i];
    return BANDS[BANDS.length - 1];
  }

  function renderResult() {
    var n = answers.q6;
    var band = bandFor(n);

    var meterFill = el("i");
    var head = el("div", { class: "result-head" }, [
      el("div", null, [
        el("p", { class: "score-label", text: "ASD likelihood score" }),
        el("p", { class: "score", html: n + "<small> / 10</small>" })
      ]),
      el("div", null, [
        el("span", { class: "band", text: band.label }),
        el("div", { class: "meter", role: "img", "aria-label": "Score " + n + " out of 10" }, [meterFill]),
        el("div", { class: "meter-scale", "aria-hidden": "true" }, [el("span", { text: "0" }), el("span", { text: "5" }), el("span", { text: "10" })])
      ])
    ]);

    var interp = el("div", { class: "interp" }, [
      el("h3", { text: "Interpretation" }),
      el("p", { html: "The respondent obtained a score of <strong>" + n + " out of 10</strong> on the NYSM-R, which falls in the <strong>" + band.label.toLowerCase() + "</strong> range for autism spectrum disorder (ASD). Scores are referenced against age-matched normative data from the 2019 validation cohort (Figure 1)." }),
      el("p", { html: band.text })
    ]);

    var steps = el("div", { class: "nextsteps" }, [
      el("h3", { text: "Recommended next steps" }),
      el("ol", null, [
        el("li", null, [el("span", { text: "Retain this report for your records." })]),
        el("li", null, [el("span", { text: "If you have concerns about this result, discuss it with a qualified clinician." })]),
        el("li", null, [el("span", { html: "Avoid rewatching <cite>Now You See Me</cite> (2013) in the 48 hours before any follow-up assessment." })])
      ])
    ]);

    var chartBox = el("div", { class: "chart" });
    var figure = el("figure", { class: "figure", style: "margin:0" }, [
      el("h3", { text: "Figure 1" }),
      el("p", { class: "figure-title", html: "Autism correlation to enjoyment of <cite>Now You See Me</cite>" }),
      el("p", { class: "figure-sub", text: "Validation cohort (n = 48) with your result overlaid." }),
      el("div", { class: "legend" }, [
        el("span", null, [el("i", { style: "background:var(--series-1)" }), "Study participant"]),
        el("span", null, [el("i", { style: "background:var(--series-2)" }), "You"]),
        el("span", null, [el("i", { class: "line" }), "Least-squares fit"])
      ]),
      chartBox,
      el("figcaption", { class: "caption", html: "Each point is one participant. Enjoyment of <cite>Now You See Me</cite> (2013) was self-reported on a 1–10 scale. Fit: y = 1.00x + 0.00; Pearson r = 1.00, p &lt; 0.001. The institute regards this relationship as settled." })
    ]);

    var toast = el("span", { class: "toast", "aria-live": "polite" });
    var shareBtn = el("button", { class: "btn", type: "button", text: "Share result" });
    shareBtn.addEventListener("click", function () { share(n, band, toast); });
    var retake = el("button", { class: "btn secondary", type: "button", text: "Retake" });
    retake.addEventListener("click", function () { answers = {}; shuffle(FACES); renderIntro(); });

    var sig = el("div", { class: "sig", "aria-hidden": "true" }, [
      el("div", null, [el("span", { class: "scrawl", text: "J. D. Horseman" }), "Reviewing clinician"]),
      el("div", null, [el("span", { class: "scrawl", text: dateStr }), "Date of report · " + respondentId])
    ]);

    show(sheet("ASD screening report", [
      el("p", { class: "eyebrow", text: "Autism spectrum screening \u00b7 Results" }),
      el("h1", { text: "ASD screening report" }),
      el("div", { class: "report-grid" }, [
        el("div", { class: "report-side" }, [head, interp, steps]),
        el("div", { class: "report-main" }, [figure])
      ]),
      sig,
      el("div", { class: "actions" }, [shareBtn, retake, toast])
    ]));

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { meterFill.style.width = (n * 10) + "%"; });
    });

    drawChart(chartBox, n, true);
    var rt;
    var lastW = chartBox.clientWidth;
    function onResize() {
      clearTimeout(rt);
      rt = setTimeout(function () {
        if (!document.body.contains(chartBox)) { window.removeEventListener("resize", onResize); return; }
        if (chartBox.clientWidth !== lastW) { lastW = chartBox.clientWidth; drawChart(chartBox, n, false); }
      }, 120);
    }
    window.addEventListener("resize", onResize);
  }

  function share(n, band, toast) {
    var url = location.origin + location.pathname;
    var text = "My NYSM-R ASD likelihood score is " + n + "/10 (" + band.label.toLowerCase() + "). Take the screening:";
    if (navigator.share) {
      navigator.share({ title: "NYSM-R Autism Spectrum Screening Questionnaire", text: text, url: url }).catch(function () {});
      return;
    }
    var full = text + " " + url;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(full).then(function () {
        toast.textContent = "Copied to clipboard.";
      }, function () { toast.textContent = full; });
    } else {
      toast.textContent = full;
    }
  }

  // ---------- chart ----------
  // Deterministic participant enjoyment values in [1, 10]; autism score equals enjoyment exactly (r = 1.00).
  var PARTICIPANTS = (function () {
    var seed = 20130531; // release date of Now You See Me
    function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
    var xs = [];
    for (var i = 0; i < 48; i++) {
      var base = 1 + 9 * (i + 0.5) / 48;
      xs.push(Math.min(10, Math.max(1, base + (rnd() - 0.5) * 0.28)));
    }
    return xs.map(function (x) { return Math.round(x * 10) / 10; });
  })();

  var SVGNS = "http://www.w3.org/2000/svg";
  function s(tag, attrs, text) {
    var n = document.createElementNS(SVGNS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }

  function drawChart(box, you, animate) {
    box.innerHTML = "";
    var W = Math.max(280, box.clientWidth || 600);
    var H = Math.round(Math.min(480, Math.max(270, W * (W > 500 ? 0.8 : 0.68))));
    var m = { t: 26, r: 14, b: 46, l: 50 };
    var pw = W - m.l - m.r, ph = H - m.t - m.b;
    var X = function (v) { return m.l + (v / 10) * pw; };
    var Y = function (v) { return m.t + ph - (v / 10) * ph; };

    var svg = s("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "img",
      "aria-label": "Scatter plot. 48 participants lie exactly on the line where ASD likelihood equals enjoyment of Now You See Me. Your point is at " + you + ", " + you + "." });

    // grid + ticks
    for (var v = 0; v <= 10; v += 2) {
      svg.appendChild(s("line", { x1: X(0), x2: X(10), y1: Y(v), y2: Y(v), stroke: "var(--grid)", "stroke-width": 1 }));
      svg.appendChild(s("text", { x: m.l - 10, y: Y(v) + 4, "text-anchor": "end", class: "axis-text" }, String(v)));
      svg.appendChild(s("text", { x: X(v), y: m.t + ph + 18, "text-anchor": "middle", class: "axis-text" }, String(v)));
    }
    // axes
    svg.appendChild(s("line", { x1: X(0), x2: X(10), y1: Y(0), y2: Y(0), stroke: "var(--rule-strong)", "stroke-width": 1 }));
    svg.appendChild(s("line", { x1: X(0), x2: X(0), y1: Y(0), y2: Y(10), stroke: "var(--rule-strong)", "stroke-width": 1 }));

    // axis titles
    svg.appendChild(s("text", { x: m.l + pw / 2, y: H - 8, "text-anchor": "middle", class: "axis-title" }, "Enjoyment of Now You See Me (1–10)"));
    var yt = s("text", { x: 0, y: 0, "text-anchor": "middle", class: "axis-title", transform: "translate(13," + (m.t + ph / 2) + ") rotate(-90)" }, "ASD likelihood score");
    svg.appendChild(yt);

    // stats block (top-left, empty region above the line)
    svg.appendChild(s("text", { x: X(0) + 12, y: m.t + 18, class: "stat-text" }, "r = 1.00"));
    svg.appendChild(s("text", { x: X(0) + 12, y: m.t + 36, class: "stat-text" }, "p < 0.001"));
    svg.appendChild(s("text", { x: X(0) + 12, y: m.t + 54, class: "stat-text" }, "n = 48"));

    // fit line
    var len = Math.hypot(X(10) - X(0.6), Y(10) - Y(0.6));
    var fit = s("line", { x1: X(0.6), y1: Y(0.6), x2: X(10), y2: Y(10), stroke: "var(--ink-2)", "stroke-width": 2, "stroke-linecap": "round", class: animate ? "fit" : "" });
    fit.style.setProperty("--len", len);
    svg.appendChild(fit);

    // participants
    var pts = [];
    PARTICIPANTS.forEach(function (x, i) {
      var c = s("circle", { cx: X(x), cy: Y(x), r: W < 440 ? 3.6 : 4.5, fill: "var(--series-1)", stroke: "var(--sheet)", "stroke-width": 0, class: animate ? "pt" : "" });
      if (animate) c.style.animationDelay = (300 + i * 18) + "ms";
      svg.appendChild(c);
      pts.push({ x: X(x), y: Y(x), label: "Participant " + (i + 1), v: x });
    });

    // you
    var yx = X(you), yy = Y(you);
    var youG = s("g", { class: animate ? "you" : "" });
    if (animate) youG.style.animationDelay = (300 + PARTICIPANTS.length * 18 + 150) + "ms";
    youG.appendChild(s("circle", { cx: yx, cy: yy, r: 8, fill: "var(--series-2)", stroke: "var(--sheet)", "stroke-width": 2.5 }));
    svg.appendChild(youG);

    var labG = s("g", { class: animate ? "you" : "" });
    if (animate) labG.style.animationDelay = (300 + PARTICIPANTS.length * 18 + 300) + "ms";
    var above = you >= 3;
    var lx = above ? yx - 16 : yx + 16;
    var ly = above ? yy - 16 : yy + 22;
    labG.appendChild(s("line", { x1: yx + (above ? -6 : 6), y1: yy + (above ? -6 : 6), x2: lx + (above ? 2 : -2), y2: ly + (above ? 4 : -12), stroke: "var(--ink-2)", "stroke-width": 1 }));
    labG.appendChild(s("text", { x: lx, y: ly, "text-anchor": above ? "end" : "start", class: "you-label" }, "You (" + you + ")"));
    svg.appendChild(labG);
    pts.push({ x: yx, y: yy, label: "You", v: you, you: true });

    box.appendChild(svg);

    // hover layer: nearest point within 24px
    var tip = el("div", { class: "tooltip", role: "status" });
    box.appendChild(tip);
    function move(ev) {
      var r = svg.getBoundingClientRect();
      var sx = (ev.clientX - r.left) * (W / r.width), sy = (ev.clientY - r.top) * (H / r.height);
      var best = null, bd = 24 * 24;
      pts.forEach(function (p) {
        var d = (p.x - sx) * (p.x - sx) + (p.y - sy) * (p.y - sy);
        if (d < bd || (p.you && d < 28 * 28 && (!best || !best.you))) { bd = d; best = p; }
      });
      if (!best) { tip.classList.remove("show"); return; }
      tip.innerHTML = "<b>" + best.label + "</b><br>Enjoyment " + best.v.toFixed(1) + " · Score " + best.v.toFixed(1);
      tip.style.left = (best.x * r.width / W) + "px";
      tip.style.top = (best.y * r.height / H) + "px";
      tip.classList.add("show");
    }
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerdown", move);
    svg.addEventListener("pointerleave", function () { tip.classList.remove("show"); });
  }

  renderIntro();
})();

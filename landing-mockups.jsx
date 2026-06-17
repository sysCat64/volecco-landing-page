// Solari landing v2 — board mockups + interactive Execute demo
// Exports: window.SolariMocks = { DepartureBoardXL, ExecuteDemo, MiniBoard }
(function () {
  const { useState, useEffect, useRef } = React;
  const { Icon, SplitFlap, BoardTag, JourneyTrack } = window;
  const { CatTile } = window.SolariUI;
  const COPY = window.SolariLandingCopy;
  const getCopy = (locale) => COPY[locale] || COPY.ja;

  const reduceMQ = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  function motionOn() {
    if (reduceMQ && reduceMQ.matches) return false;
    return window.SOLARI_FLAP !== false;
  }

  const BOARD_W = 14;

  // ---------- DepartureBoardXL — hero centerpiece (dark) ----------
  function useClock() {
    const fmt = () => {
      const d = new Date();
      return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    };
    const [now, setNow] = useState(fmt);
    useEffect(() => {
      const id = setInterval(() => setNow(fmt()), 60000);
      return () => clearInterval(id);
    }, []);
    return now;
  }

  function BigBoardRow({ rowIndex, offset, locale }) {
    const copy = getCopy(locale);
    const situations = copy.mockups.situations;
    const [i, setI] = useState(rowIndex % situations.length);
    useEffect(() => {
      if (!motionOn()) { setI(rowIndex % situations.length); return; }
      let timer, kick;
      // each row advances on a 5200ms period, staggered by +1700ms per row
      kick = setTimeout(() => {
        setI((n) => (n + 1) % situations.length);
        timer = setInterval(() => setI((n) => (n + 1) % situations.length), 5200);
      }, offset);
      return () => { clearTimeout(kick); clearInterval(timer); };
    }, [rowIndex, offset, situations.length]);
    useEffect(() => setI(rowIndex % situations.length), [locale, rowIndex, situations.length]);
    const s = situations[i];
    return React.createElement("div", {
      className: "lp-bigboard-row",
      "aria-label": s.label + " — " + copy.mockups.bigBoard.aria + ": " + s.step,
    },
      React.createElement("div", { className: "lp-bigboard-sit" },
        React.createElement(SplitFlap, { text: s.flap, width: BOARD_W, dark: true, size: "lg", align: "left" })),
      React.createElement("div", { className: "lp-bigboard-status" },
        React.createElement(BoardTag, { tone: s.tone }, s.status)),
      React.createElement("div", { className: "lp-bigboard-step", key: i }, s.step));
  }

  function DepartureBoardXL({ locale = "ja" }) {
    const copy = getCopy(locale);
    const now = useClock();
    const rows = [0, 2, 4]; // three visible rows start at different situations
    return React.createElement("div", { className: "lp-bigboard" },
      React.createElement("div", { className: "lp-bigboard-tiles", "aria-hidden": "true" }),
      React.createElement("div", { className: "lp-bigboard-inner" },
        React.createElement("div", { className: "lp-bigboard-head" },
          React.createElement("span", { className: "lp-bigboard-live" },
            React.createElement("span", { className: "live-dot" }), copy.mockups.bigBoard.live),
          React.createElement("span", { className: "lp-bigboard-clock" }, now)),
        React.createElement("div", { className: "lp-bigboard-cols", "aria-hidden": "true" },
          copy.mockups.bigBoard.cols.map((label) => React.createElement("span", { key: label }, label))),
        rows.map((r, idx) =>
          React.createElement(BigBoardRow, { key: idx, rowIndex: r, offset: idx * 1700, locale }))));
  }

  // ---------- ExecuteDemo — interactive Execute screen ----------
  function ExecuteDemo({ locale = "ja" }) {
    const ex = getCopy(locale).mockups.execute;
    const flat = [];
    ex.sections.forEach((sec, si) => sec.items.forEach((it, ii) =>
      flat.push({ text: it.text, sec: si, secTitle: sec.title, done: it.done, first: ii === 0 })));
    const initial = flat.map((f) => f.done);
    const [checks, setChecks] = useState(initial);
    useEffect(() => setChecks(initial), [locale]);
    const total = checks.length;
    const done = checks.filter(Boolean).length;
    const pct = Math.round((done / total) * 100);

    // rebuild sections with live done-state for JourneyTrack + next action
    let k = 0;
    const sections = ex.sections.map((sec) => ({
      title: sec.title,
      items: sec.items.map(() => ({ done: checks[k++] })),
    }));
    const nextIndex = checks.findIndex((c) => !c);

    const toggle = (idx) => setChecks((cs) => cs.map((c, i) => (i === idx ? !c : c)));
    const reset = () => setChecks(initial);

    const cat = { name: ex.catName, icon: "plane", hue: 250 };

    return React.createElement("div", { className: "lp-demo" },
      React.createElement("div", { className: "lp-demo-try" },
        React.createElement(BoardTag, { tone: "default" }, ex.tryMe)),

      // header
      React.createElement("div", { className: "mk-exec-head" },
        React.createElement(CatTile, { cat, size: 44, radius: 13 }),
        React.createElement("div", null,
          React.createElement("div", { className: "mk-exec-title" }, ex.title),
          React.createElement("div", { className: "mk-exec-cat" }, ex.category + " · " + done + "/" + total + " " + ex.doneUnit))),

      // board card
      React.createElement("div", { className: "mk-board" },
        React.createElement("div", { className: "mk-board-meta" },
          pct >= 100
            ? React.createElement(BoardTag, { tone: "done", icon: "check" }, "ARRIVED")
            : React.createElement(BoardTag, { tone: "live", icon: "check" }, "ON TRACK"),
          React.createElement("span", { className: "mk-board-pct" }, pct + "% " + ex.pctDone)),
        React.createElement(JourneyTrack, { sections, compact: true })),

      // next action
      nextIndex >= 0 && React.createElement("div", { className: "mk-na" },
        React.createElement("div", { className: "mk-na-body" },
          React.createElement("div", { className: "mk-na-lbl" }, ex.nextAction),
          React.createElement("div", { className: "mk-na-text" }, flat[nextIndex].text)),
        React.createElement("button", {
          className: "mk-na-do", onClick: () => toggle(nextIndex),
          "aria-label": ex.markDone,
        }, React.createElement(Icon, { name: "check", size: 20, stroke: 2.6 }))),

      // checklist (buttons, grouped by section)
      React.createElement("div", { className: "mk-list" },
        flat.map((f, idx) => {
          const isDone = checks[idx];
          const state = isDone ? "done" : (idx === nextIndex ? "next" : "todo");
          const showHead = f.first;
          return React.createElement(React.Fragment, { key: idx },
            showHead && React.createElement("div", { className: "mk-sec-lbl" }, f.secTitle),
            React.createElement("button", {
              className: "mk-item " + state, onClick: () => toggle(idx),
              "aria-pressed": isDone, "aria-label": f.text,
            },
              React.createElement("span", { className: "box" },
                isDone && React.createElement(Icon, { name: "check", size: 15, stroke: 3 })),
              React.createElement("span", { className: "txt" }, f.text)));
        })),

      // celebration
      pct >= 100 && React.createElement("div", { className: "exec-celebrate" },
        React.createElement("span", { className: "celebrate-emoji" },
          React.createElement(Icon, { name: "check", size: 20, stroke: 2.8 })),
        React.createElement("div", null,
          React.createElement("strong", null, ex.celebrate)),
        React.createElement("button", { className: "btn btn-soft btn-sm", onClick: reset }, ex.reset)));
  }

  // ---------- MiniBoard — light single-row board (final CTA) ----------
  function MiniBoard({ interval = 3000, locale = "ja" }) {
    const copy = getCopy(locale);
    const situations = copy.mockups.situations;
    const [i, setI] = useState(0);
    useEffect(() => {
      if (!motionOn()) return;
      const id = setInterval(() => setI((n) => (n + 1) % situations.length), interval);
      return () => clearInterval(id);
    }, [interval, situations.length]);
    useEffect(() => setI(0), [locale]);
    const cur = situations[i];
    return React.createElement("div", { className: "lp-board" },
      React.createElement("div", { className: "lp-board-top" },
        React.createElement("span", { className: "lp-board-live" },
          React.createElement("span", { className: "live-dot" }), copy.mockups.miniBoard.live),
        React.createElement("span", { className: "lp-board-cols" }, copy.mockups.miniBoard.cols)),
      React.createElement("div", { className: "lp-board-row" },
        React.createElement("div", { className: "lp-board-situation" },
          React.createElement(SplitFlap, { text: cur.flap, width: BOARD_W, size: "lg", align: "left" })),
        React.createElement("div", { className: "lp-board-next" },
          React.createElement("span", { className: "arrow" },
            React.createElement(Icon, { name: "arrow", size: 15, stroke: 2.4 })),
          React.createElement("span", { className: "lp-board-next-txt" },
            React.createElement("span", { className: "lp-board-next-lbl" }, copy.mockups.miniBoard.nextStep),
            React.createElement("span", { className: "lp-board-next-step", key: i }, cur.step)))));
  }

  window.SolariMocks = { DepartureBoardXL, ExecuteDemo, MiniBoard };
})();

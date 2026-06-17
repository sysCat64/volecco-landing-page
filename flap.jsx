// Solari split-flap board kit — window.SplitFlap, BoardTag, JourneyTrack
(function () {
  const { useState, useEffect, useRef } = React;
  const { Icon, SOLARI } = window;
  const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&%/.,:-+";
  const reduceMQ = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");

  function flapsOn() {
    if (reduceMQ && reduceMQ.matches) return false;
    return window.SOLARI_FLAP !== false;
  }

  function pad(text, width, align) {
    let t = String(text).toUpperCase();
    if (!width) return t;
    if (t.length > width) t = t.slice(0, width);
    const total = width - t.length;
    if (align === "center") { const l = Math.floor(total / 2); return " ".repeat(l) + t + " ".repeat(total - l); }
    if (align === "right") return " ".repeat(total) + t;
    return t + " ".repeat(total);
  }

  // Animated split-flap text. Static state is always the correct text; the scramble is an enhancement.
  function SplitFlap({ text, width, dark = false, align = "left", size = "md", className = "" }) {
    const target = pad(text, width, align);
    const [disp, setDisp] = useState(() => target.split(""));
    const timerRef = useRef();
    const settleRef = useRef();

    useEffect(() => {
      const chars = target.split("");
      clearInterval(timerRef.current);
      clearTimeout(settleRef.current);
      if (!flapsOn()) { setDisp(chars); return; }
      const start = Date.now();
      const perTile = 60, stepMs = 40, settlePad = 220;
      const totalMs = chars.length * perTile + settlePad + 60;
      timerRef.current = setInterval(() => {
        const t = Date.now() - start;
        let done = true;
        const next = chars.map((ch, i) => {
          if (ch === " ") return " ";
          const settleAt = i * perTile + settlePad;
          if (t >= settleAt) return ch;
          done = false;
          const idx = Math.floor(t / stepMs) + i * 5;
          return CHARSET[idx % CHARSET.length];
        });
        setDisp(next);
        if (done) { clearInterval(timerRef.current); setDisp(chars); }
      }, stepMs);
      // guaranteed settle even if timers are throttled in a background tab
      settleRef.current = setTimeout(() => { clearInterval(timerRef.current); setDisp(chars); }, totalMs);
      return () => { clearInterval(timerRef.current); clearTimeout(settleRef.current); };
    }, [target]);

    return React.createElement("span", { className: `flap ${dark ? "flap-dark" : ""} flap-${size} ${className}`, "aria-label": String(text) },
      disp.map((c, i) =>
        React.createElement("span", { className: "flap-tile " + (c === " " ? "is-blank" : ""), key: i, "aria-hidden": "true" },
          React.createElement("span", { className: "flap-char" }, c === " " ? "\u00A0" : c))));
  }

  function BoardTag({ children, tone = "default", icon, className = "" }) {
    return React.createElement("span", { className: `board-tag tone-${tone} ${className}` },
      icon && React.createElement(Icon, { name: icon, size: 12, stroke: 2.4 }),
      React.createElement("span", null, children));
  }

  // Journey progression: section waypoints scaled by real item counts, with an advancing marker.
  function JourneyTrack({ sections, compact }) {
    let total = 0, done = 0;
    const bounds = [];
    sections.forEach((s) => { bounds.push(total); total += s.items.length; done += s.items.filter((i) => i.done).length; });
    const pct = total ? (done / total) * 100 : 0;
    const n = sections.length;
    const nodes = sections.map((s, i) => {
      const pos = total ? (bounds[i] / total) * 100 : (n > 1 ? (i / (n - 1)) * 100 : 0);
      const secDone = s.items.filter((x) => x.done).length;
      const state = secDone === s.items.length ? "done" : (bounds[i] <= done ? "current" : "todo");
      return { title: s.title, pos, state };
    });
    // end node (arrival)
    return React.createElement("div", { className: "journey " + (compact ? "is-compact" : "") },
      React.createElement("div", { className: "journey-rail" },
        React.createElement("div", { className: "journey-fill", style: { transform: `scaleX(${pct / 100})` } }),
        React.createElement("div", { className: "journey-marker", style: { left: pct + "%" } },
          React.createElement(Icon, { name: "plane", size: 13, fill: true })),
        nodes.map((nd, i) =>
          React.createElement("div", { className: "journey-node state-" + nd.state, style: { left: nd.pos + "%" }, key: i, title: nd.title })),
        React.createElement("div", { className: "journey-node state-" + (pct >= 100 ? "done" : "todo") + " is-end", style: { left: "100%" }, title: "Done" })),
      !compact && React.createElement("div", { className: "journey-labels" },
        nodes.map((nd, i) => React.createElement("span", { className: "journey-label state-" + nd.state, key: i, style: { left: nd.pos + "%" } }, nd.title))));
  }

  // helper: first incomplete {section, item, index}
  function nextAction(entry) {
    for (const s of entry.sections) {
      for (const it of s.items) { if (!it.done) return { section: s, item: it }; }
    }
    return null;
  }

  window.SplitFlap = SplitFlap;
  window.BoardTag = BoardTag;
  window.JourneyTrack = JourneyTrack;
  window.solariNextAction = nextAction;
})();

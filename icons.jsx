// Solari icons — window.Icon  (clean line set, stroke-based)
(function () {
  const P = {
    // nav / ui
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    library: '<rect x="3" y="4" width="7" height="16" rx="1.4"/><rect x="14" y="4" width="7" height="16" rx="1.4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    heart: '<path d="M12 20s-7-4.6-7-9.4A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 7-2.4C19 10.4 12 20 12 20z"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9z"/>',
    copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2.2"/><path d="M5.5 15.5h-1A1.5 1.5 0 0 1 3 14V4.5A1.5 1.5 0 0 1 4.5 3H14a1.5 1.5 0 0 1 1.5 1.5v1"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    share: '<circle cx="6" cy="12" r="2.4"/><circle cx="17" cy="6" r="2.4"/><circle cx="17" cy="18" r="2.4"/><path d="m8.1 11 6.8-3.6M8.1 13l6.8 3.6"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m14 6 4 4"/>',
    note: '<rect x="4.5" y="3.5" width="15" height="17" rx="2.2"/><path d="M8 9h8M8 13h8M8 17h4"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    users: '<circle cx="9" cy="9" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 6.2a3 3 0 0 1 0 5.6M16.5 13a5.5 5.5 0 0 1 4 6"/>',
    trend: '<path d="M4 15l5-5 3 3 6-7"/><path d="M14 6h4v4"/>',
    sparkles: '<path d="M12 4l1.4 3.6L17 9l-3.6 1.4L12 14l-1.4-3.6L7 9l3.6-1.4z"/><path d="M18 14l.7 1.8L20.5 16.5l-1.8.7L18 19l-.7-1.8L15.5 16.5l1.8-.7z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>',
    moon: '<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 7 7 0 1 0 20.5 14.2z"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    drag: '<circle cx="9" cy="6" r="1.3"/><circle cx="9" cy="12" r="1.3"/><circle cx="9" cy="18" r="1.3"/><circle cx="15" cy="6" r="1.3"/><circle cx="15" cy="12" r="1.3"/><circle cx="15" cy="18" r="1.3"/>',
    trash: '<path d="M5 7h14M9 7V5h6v2M7 7l1 12h8l1-12"/>',
    undo: '<path d="M7 9H4V6"/><path d="M4 9a8 8 0 1 1-1.5 6"/>',
    tag: '<path d="M4 4h7l9 9-7 7-9-9z"/><circle cx="8" cy="8" r="1.4"/>',
    bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4.5h11l-2 3.5 2 3.5H5"/>',
    download: '<path d="M12 4v10m0 0 4-4m-4 4-4-4"/><path d="M5 18h14"/>',
    play: '<path d="M8 5.5v13l11-6.5z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9z"/>',
    chat: '<path d="M5 5h14a1.5 1.5 0 0 1 1.5 1.5V15A1.5 1.5 0 0 1 19 16.5H10l-4 3.5V16.5H5A1.5 1.5 0 0 1 3.5 15V6.5A1.5 1.5 0 0 1 5 5z"/>',
    doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 13h5M10 16h5"/>',
    loop: '<path d="M4 9a8 8 0 0 1 13-2l2 2"/><path d="M19 5v4h-4"/><path d="M20 15a8 8 0 0 1-13 2l-2-2"/><path d="M5 19v-4h4"/>',
    spark2: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
    // category glyphs
    plane: '<path d="M22 12 13.8 8.8 11 3H8.8l1.3 6.8-4.5-.8-1.5-2H2.5l.9 5-.9 5h1.6l1.5-2 4.5-.8L8.8 21H11l2.8-5.8z"/>',
    home: '<path d="M4 11 12 4l8 7"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>',
    chef: '<path d="M7 14a4 4 0 1 1 1.5-7.7 4 4 0 0 1 7 0A4 4 0 1 1 17 14z"/><path d="M7 14v4a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 17 18v-4"/>',
    wallet: '<rect x="3.5" y="6" width="17" height="13" rx="2.5"/><path d="M3.5 10h17"/><circle cx="16.5" cy="14" r="1.2"/>',
    book: '<path d="M5 4.5h9a2 2 0 0 1 2 2V20a2 2 0 0 0-2-2H5z"/><path d="M19 6.5V18"/>',
    tent: '<path d="M12 4 3.5 19h17z"/><path d="M12 4v15"/><path d="m9 19 3-5 3 5"/>',
    paw: '<circle cx="8" cy="9" r="1.7"/><circle cx="16" cy="9" r="1.7"/><circle cx="6" cy="14" r="1.5"/><circle cx="18" cy="14" r="1.5"/><path d="M12 13c-2.5 0-4.5 1.6-4.5 3.6S9.5 20 12 20s4.5-1.4 4.5-3.4S14.5 13 12 13z"/>',
    shield: '<path d="M12 3.5 19 6v5c0 5-3.4 8-7 9.5C8.4 19 5 16 5 11V6z"/>',
    heartCat: '<path d="M12 20s-7-4.6-7-9.4A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 7-2.4C19 10.4 12 20 12 20z"/>',
  };
  // category icon aliases
  P.heart_cat = P.heart;

  function Icon({ name, size = 22, stroke = 2, fill = false, className = "", style = {} }) {
    const d = P[name] || P.check;
    return React.createElement("svg", {
      className: "ic " + className, width: size, height: size, viewBox: "0 0 24 24",
      fill: fill ? "currentColor" : "none", stroke: fill ? "none" : "currentColor",
      strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round",
      style, "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: d },
    });
  }

  // map category icon keys
  Icon.cat = function (key) {
    const m = { plane: "plane", home: "home", heart: "heartCat", chef: "chef",
      sparkles: "sparkles", wallet: "wallet", book: "book", tent: "tent", paw: "paw", shield: "shield" };
    return m[key] || "check";
  };

  window.Icon = Icon;
})();

// Solari shared UI — exports to window
(function () {
  const { Icon } = window;

  // color helpers (oklch)
  const catBg   = (hue) => `oklch(0.95 0.045 ${hue})`;
  const catBg2  = (hue) => `oklch(0.91 0.06 ${hue})`;
  const catInk  = (hue) => `oklch(0.50 0.13 ${hue})`;
  const avatarBg = (hue) => `oklch(0.90 0.055 ${hue})`;
  const avatarInk = (hue) => `oklch(0.46 0.13 ${hue})`;

  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  }

  function fmt(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace(/\.0$/, "") + "k";
    return "" + n;
  }

  function Avatar({ author, size = 32 }) {
    const hue = author.color;
    return React.createElement("div", {
      className: "avatar",
      style: {
        width: size, height: size, borderRadius: "50%",
        background: avatarBg(hue), color: avatarInk(hue),
        fontSize: size * 0.36, fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center",
        flex: "0 0 auto", letterSpacing: ".02em",
      },
    }, initials(author.name));
  }

  function Stars({ value, size = 14 }) {
    return React.createElement("span", { className: "stars", style: { "--s": size + "px" } },
      [0, 1, 2, 3, 4].map((i) => {
        const fillPct = Math.max(0, Math.min(1, value - i)) * 100;
        return React.createElement("span", { key: i, className: "star-wrap" },
          React.createElement(Icon, { name: "star", size, className: "star-bg" }),
          React.createElement("span", { className: "star-fg", style: { width: fillPct + "%" } },
            React.createElement(Icon, { name: "star", size, fill: true })));
      }));
  }

  function CatTile({ cat, size = 44, radius = 14 }) {
    return React.createElement("div", {
      className: "cat-tile",
      style: {
        width: size, height: size, borderRadius: radius,
        background: catBg(cat.hue), color: catInk(cat.hue),
        display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto",
      },
    }, React.createElement(Icon, { name: Icon.cat(cat.icon), size: size * 0.5, stroke: 2 }));
  }

  // striped placeholder for imagery
  function Placeholder({ label, hue = 250, radius = 16, height, aspect, className = "" }) {
    const style = { "--ph-hue": hue, borderRadius: radius };
    if (height) style.height = height;
    if (aspect) style.aspectRatio = aspect;
    return React.createElement("div", { className: "placeholder " + className, style },
      React.createElement("span", { className: "ph-label" }, label));
  }

  function Button({ children, variant = "primary", size = "md", icon, iconRight, onClick, full, disabled, className = "", style = {} }) {
    return React.createElement("button", {
      className: `btn btn-${variant} btn-${size} ${full ? "btn-full" : ""} ${className}`,
      onClick, disabled, style,
    },
      icon && React.createElement(Icon, { name: icon, size: size === "lg" ? 20 : 18, stroke: 2.1 }),
      React.createElement("span", null, children),
      iconRight && React.createElement(Icon, { name: iconRight, size: size === "lg" ? 20 : 18, stroke: 2.1 }));
  }

  function IconBtn({ name, onClick, label, active, size = 20, className = "", style = {} }) {
    return React.createElement("button", {
      className: `icon-btn ${active ? "is-active" : ""} ${className}`, onClick,
      "aria-label": label, title: label, style,
    }, React.createElement(Icon, { name, size, fill: active && name === "heart" }));
  }

  function Tag({ children }) {
    return React.createElement("span", { className: "tag" }, "#", children);
  }

  function ProgressBar({ value, total }) {
    const pct = total ? Math.round((value / total) * 100) : 0;
    return React.createElement("div", { className: "progress" },
      React.createElement("div", { className: "progress-track" },
        React.createElement("div", { className: "progress-fill", style: { width: pct + "%" } })),
      React.createElement("span", { className: "progress-label" }, value, "/", total));
  }

  function Toast({ toast }) {
    if (!toast) return null;
    return React.createElement("div", { className: "toast", key: toast.key },
      React.createElement("span", { className: "toast-ic" }, React.createElement(Icon, { name: toast.icon || "check", size: 18, stroke: 2.4 })),
      React.createElement("span", null, toast.msg),
      toast.action && React.createElement("button", { className: "toast-action", onClick: toast.action.onClick }, toast.action.label));
  }

  window.SolariUI = { Avatar, Stars, CatTile, Placeholder, Button, IconBtn, Tag, ProgressBar, Toast, fmt, initials, catBg, catBg2, catInk };
})();

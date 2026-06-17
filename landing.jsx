// Solari landing v2 — shell: nav, hero (stage), assembly, reveal IO, tweaks. window.SolariLanding
(function () {
  const { useState, useEffect, useRef, useCallback } = React;
  const { Icon } = window;
  const { Button } = window.SolariUI;
  const { DepartureBoardXL } = window.SolariMocks;
  const { Problem, Solution, HowItWorks, Demo, Categories, Trust, Philosophy, FinalCTA, Footer } = window.SolariSections;
  const COPY = window.SolariLandingCopy;
  const { useTweaks, TweaksPanel, TweakSection, TweakRadio } = window;

  const ACCENTS = { Navy: 256, Blue: 232, Teal: 200 };
  const THEME_KEY = "solari_theme";

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "Navy",
    "flapMotion": "On",
  }/*EDITMODE-END*/;

  const reduceMQ = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const getCopy = (locale) => COPY[locale] || COPY.ja;
  const getInitialLocale = () => {
    const saved = window.localStorage && window.localStorage.getItem("volecco_lp_locale");
    if (saved === "ja" || saved === "en") return saved;
    return (window.navigator.language || "ja").toLowerCase().startsWith("en") ? "en" : "ja";
  };
  const getInitialTheme = () => {
    const saved = window.localStorage && window.localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    if (window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  };
  const applyDocumentTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.setAttribute("content", theme);
  };
  const spans = (items, locale) => items.map((text, i) => (
    <React.Fragment key={i}>
      <span className="nb">{text}</span>{locale === "en" && i < items.length - 1 ? " " : null}
    </React.Fragment>
  ));

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: reduceMQ() ? "auto" : "smooth",
    });
  }

  function Nav({ locale, theme, onToggleTheme, onToggleLocale, onExplore, onDemo }) {
    const nav = getCopy(locale).nav;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 12);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    const LINKS = nav.links;
    const themeSwitchLabel = theme === "light" ? nav.switchToDark : nav.switchToLight;
    const themeIcon = theme === "light" ? "moon" : "sun";
    const go = (id) => { setMenuOpen(false); scrollToId(id); };
    const switchLanguage = () => { setMenuOpen(false); onToggleLocale(); };
    const switchTheme = () => { setMenuOpen(false); onToggleTheme(); };
    return (
      <div className="lp-nav-wrap">
        <div className={"lp-nav" + (scrolled ? " scrolled" : "")}>
          <div className="lp-container" style={{ display: "flex", alignItems: "center", gap: 28, width: "100%" }}>
            <button className="lp-brand" onClick={() => window.scrollTo({ top: 0, behavior: reduceMQ() ? "auto" : "smooth" })}>
              <span className="lp-brand-mark"><span className="lp-brand-dot" /></span>
              <span className="lp-brand-name">Volecco</span>
            </button>
            <nav className="lp-navlinks">
              {LINKS.map((l) => (
                <button key={l.id} className="lp-navlink" onClick={() => go(l.id)}>{l.label}</button>
              ))}
            </nav>
            <div className="lp-nav-right">
              <button className="lp-navghost" onClick={onDemo}>{nav.demo}</button>
              <button
                className="lp-lang-toggle"
                onClick={switchLanguage}
                aria-label={nav.switchLanguage}
                title={nav.switchLanguage}
              >
                {nav.nextLanguage}
              </button>
              <button
                className="lp-theme-toggle"
                onClick={switchTheme}
                aria-label={themeSwitchLabel}
                aria-pressed={theme === "dark"}
                title={themeSwitchLabel}
              >
                <Icon name={themeIcon} size={17} stroke={2.1} />
              </button>
              <Button variant="primary" size="md" onClick={onExplore}>{nav.cta}</Button>
              <button
                className="lp-burger" aria-label={nav.menu}
                aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}
              >
                <Icon name={menuOpen ? "x" : "list"} size={20} />
              </button>
            </div>
          </div>
          <div className={"lp-mobilemenu" + (menuOpen ? " open" : "")}>
            {LINKS.map((l) => (
              <button key={l.id} onClick={() => go(l.id)}>{l.label}</button>
            ))}
            <button className="lp-mobile-lang" onClick={switchLanguage}>{nav.switchLanguage}</button>
            <button className="lp-mobile-theme" onClick={switchTheme}>
              <Icon name={themeIcon} size={17} stroke={2.1} />
              <span>{themeSwitchLabel}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  function Hero({ locale, onExplore, onDemo }) {
    const hero = getCopy(locale).hero;
    return (
      <section className="lp-hero">
        <div className="lp-hero-bg">
          <span className="lp-hero-glow a" />
          <span className="lp-hero-glow b" />
        </div>
        <div className="lp-container">
          <div className="lp-hero-copy reveal">
            <span className="lp-hero-badge">
              <span className="pin">VOLECCO</span>
              {hero.badge}
            </span>
            <h1 className="lp-hero-title">{hero.titleLead}<br /><span className="accent">{hero.titleAccent}</span></h1>
            <p className="lp-hero-sub">{spans(hero.sub, locale)}</p>
            <div className="lp-hero-cta">
              <Button variant="primary" size="md" className="btn-xl" icon="compass" onClick={onExplore}>{hero.cta}</Button>
              <Button variant="ghost" size="md" className="btn-xl btn-play" onClick={onDemo}>
                <span className="play-ic"><Icon name="play" size={13} fill /></span>{hero.demo}
              </Button>
            </div>
            <div className="lp-hero-proof">
              {hero.proof.map((p) => (
                <span key={p.text} className="pchip"><span className="pic"><Icon name={p.icon} size={16} stroke={2.1} /></span>{p.text}</span>
              ))}
            </div>
          </div>
          <div className="lp-hero-stage reveal" data-d="1">
            <DepartureBoardXL locale={locale} />
          </div>
        </div>
      </section>
    );
  }

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const [locale, setLocale] = useState(getInitialLocale);
    const [theme, setTheme] = useState(getInitialTheme);
    const copy = getCopy(locale);
    window.SOLARI_FLAP = t.flapMotion !== "Off";

    const explore = useCallback(() => scrollToId("categories"), []);
    const demo = useCallback(() => scrollToId("demo"), []);
    const how = useCallback(() => scrollToId("how"), []);
    const footerLink = useCallback((id) => scrollToId(id), []);
    const toggleLocale = useCallback(() => setLocale((l) => (l === "ja" ? "en" : "ja")), []);
    const toggleTheme = useCallback(() => setTheme((v) => (v === "light" ? "dark" : "light")), []);

    useEffect(() => {
      document.documentElement.lang = copy.meta.lang;
      document.title = copy.meta.title;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", copy.meta.description);
      if (window.localStorage) window.localStorage.setItem("volecco_lp_locale", locale);
    }, [copy, locale]);

    useEffect(() => {
      applyDocumentTheme(theme);
      if (window.localStorage) window.localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    // scroll reveal — assign .in once visible, then unobserve
    useEffect(() => {
      const els = Array.from(document.querySelectorAll(".reveal"));
      if (reduceMQ() || !("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("in"));
        return;
      }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }, []);

    const rootStyle = { "--bh": ACCENTS[t.accent] || 256 };

    return (
      <div className="lp" data-theme={theme} style={rootStyle}>
        <Nav
          locale={locale}
          theme={theme}
          onToggleTheme={toggleTheme}
          onToggleLocale={toggleLocale}
          onExplore={explore}
          onDemo={demo}
        />
        <Hero locale={locale} onExplore={explore} onDemo={demo} />
        <Problem locale={locale} />
        <Solution locale={locale} />
        <HowItWorks locale={locale} />
        <Demo locale={locale} />
        <Categories locale={locale} />
        <Trust locale={locale} />
        <Philosophy locale={locale} />
        <FinalCTA locale={locale} onExplore={explore} onHow={how} />
        <Footer locale={locale} onLink={footerLink} />

        <TweaksPanel>
          <TweakSection label="Theme" />
          <TweakRadio label="Accent" value={t.accent} options={Object.keys(ACCENTS)} onChange={(v) => setTweak("accent", v)} />
          <TweakSection label="Departure board" />
          <TweakRadio label="Flap motion" value={t.flapMotion} options={["On", "Off"]} onChange={(v) => setTweak("flapMotion", v)} />
        </TweaksPanel>
      </div>
    );
  }

  window.SolariLanding = App;
})();

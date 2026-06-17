// Solari landing v2 — content sections (Problem … Footer). Exports window.SolariSections
(function () {
  const { Icon, SplitFlap, BoardTag } = window;
  const { CatTile, Placeholder, Button } = window.SolariUI;
  const { ExecuteDemo, MiniBoard } = window.SolariMocks;
  const COPY = window.SolariLandingCopy;
  const getCopy = (locale) => COPY[locale] || COPY.ja;
  const spans = (items, locale) => items.map((text, i) => (
    <React.Fragment key={i}>
      <span className="nb">{text}</span>{locale === "en" && i < items.length - 1 ? " " : null}
    </React.Fragment>
  ));

  // ---------- Problem ----------
  function Source({ s, floating = true }) {
    return (
      <div className={"lp-source " + (floating ? s.cls : "")}>
        <span className="si" style={{ background: `oklch(0.62 0.15 ${s.hue})` }}>
          <Icon name={s.icon} size={16} stroke={2.2} />
        </span>
        {s.label}
      </div>
    );
  }

  function Problem({ locale = "ja" }) {
    const problem = getCopy(locale).sections.problem;
    return (
      <section className="lp-section" id="problem">
        <div className="lp-container">
          <div className="lp-split">
            <div className="reveal">
              <span className="lp-eyebrow">{problem.eyebrow}</span>
              <h2 className="lp-h2">{spans(problem.title, locale)}</h2>
              <p className="lp-lead">{spans(problem.lead, locale)}</p>
              <p className="lp-problem-pivot">{spans(problem.pivot, locale)}</p>
            </div>
            <div className="lp-chaos reveal" data-d="1">
              <svg className="lp-chaos-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {[[12,16],[88,9],[4,46],[104,38],[16,92],[92,96]].map((p, i) => (
                  <line key={i} x1="50" y1="50" x2={p[0]} y2={p[1]}
                    stroke="var(--line)" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
                ))}
              </svg>
              {problem.sources.map((s) => <Source key={s.id} s={s} />)}
              <div className="lp-chaos-core">
                <span className="h">{problem.chaosTitle}</span>
                <span className="q">{problem.chaosQuestion}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Solution ----------
  function Solution({ locale = "ja" }) {
    const copy = getCopy(locale);
    const solution = copy.sections.solution;
    const sources = copy.sections.problem.sources;
    return (
      <section className="lp-section tint" id="solution">
        <div className="lp-container">
          <div className="lp-sectionhead center reveal">
            <span className="lp-eyebrow center">{solution.eyebrow}</span>
            <h2 className="lp-h2">{spans(solution.title, locale)}</h2>
            <p className="lp-lead">{spans(solution.lead, locale)}</p>
          </div>
          <div className="lp-transform reveal" data-d="1">
            <div className="lp-messy">
              {sources.slice(0, 4).map((s) => <Source key={s.id} s={s} floating={false} />)}
            </div>
            <div className="lp-arrow-mid">
              <span className="ring"><Icon name="arrow" size={24} stroke={2.4} /></span>
              <span className="lbl">VOLECCO</span>
            </div>
            <div className="lp-tidy">
              <div className="lp-tidy-head">
                <CatTile cat={{ name: "Travel", icon: "plane", hue: 250 }} size={36} radius={11} />
                <span className="lp-tidy-title">{solution.tidyTitle}</span>
              </div>
              <div className="lp-tidy-sec">{solution.tidySections[0].title}</div>
              {solution.tidySections[0].items.map((t, i) => (
                <div key={i} className={"lp-tidy-item" + (i < 2 ? " on" : "")}>
                  <span className="lp-tidy-box">{i < 2 && <Icon name="check" size={12} stroke={3} />}</span>
                  {t}
                </div>
              ))}
              <div className="lp-tidy-sec">{solution.tidySections[1].title}</div>
              {solution.tidySections[1].items.map((t, i) => (
                <div key={i} className="lp-tidy-item">
                  <span className="lp-tidy-box" />{t}
                </div>
              ))}
              <div className="lp-tidy-foot">
                <span>{solution.lastChecked}</span>
                <BoardTag tone="default">{copy.common.curated}</BoardTag>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---------- How it works ----------
  function HowItWorks({ locale = "ja" }) {
    const how = getCopy(locale).sections.how;
    return (
      <section className="lp-section" id="how">
        <div className="lp-container">
          <div className="lp-sectionhead center reveal">
            <span className="lp-eyebrow center">{how.eyebrow}</span>
            <h2 className="lp-h2">{spans(how.title, locale)}</h2>
            <p className="lp-lead">{spans(how.lead, locale)}</p>
          </div>
          <div className="lp-steps reveal" data-d="1">
            <div className="lp-steps-rail"><span className="lp-steps-rail-fill" /></div>
            <div className="lp-steps-grid">
              {how.steps.map((s) => (
                <div key={s.n} className="lp-step">
                  <div className="lp-step-node">
                    <Icon name={s.icon} size={24} stroke={2.1} />
                    <span className="lp-step-num">{s.n}</span>
                  </div>
                  <div className="lp-step-body">
                    <div className="lp-step-en">{s.en}</div>
                    <div className="lp-step-title">{s.title}</div>
                    <div className="lp-step-txt">{s.txt}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Demo ----------
  function Demo({ locale = "ja" }) {
    const demo = getCopy(locale).sections.demo;
    return (
      <section className="lp-section tint" id="demo">
        <div className="lp-container">
          <div className="lp-sectionhead center reveal">
            <span className="lp-eyebrow center">{demo.eyebrow}</span>
            <h2 className="lp-h2">{spans(demo.title, locale)}</h2>
            <p className="lp-lead">{spans(demo.lead, locale)}</p>
          </div>
          <div className="lp-split">
            <div className="reveal" data-d="1"><ExecuteDemo locale={locale} /></div>
            <div className="lp-demo-points">
              {demo.points.map((p, i) => (
                <div key={i} className="lp-dpoint reveal" data-d={Math.min(i + 1, 3)}>
                  <span className="lp-dpoint-ic"><Icon name={p.icon} size={22} stroke={2.1} /></span>
                  <div><b>{p.title}</b><p>{p.txt}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Categories ----------
  function CatCard({ c, d, labels }) {
    return (
      <article className="lp-card reveal" data-d={d}>
        <div className="lp-card-cover">
          <Placeholder label={c.coverLabel} hue={c.hue} height="100%" radius={0} />
          <span className="lp-card-cat">
            <span className="ct" style={{ background: `oklch(0.62 0.14 ${c.hue})` }}>
              <Icon name={Icon.cat(c.catIcon)} size={11} stroke={2.4} />
            </span>
            {c.cat}
          </span>
        </div>
        <div className="lp-card-body">
          <h3 className="lp-card-title">{c.title}</h3>
          <p className="lp-card-blurb">{c.blurb}</p>
          <div className="lp-card-chips">
            <BoardTag tone="default">{labels.curated}</BoardTag>
            <span className="lp-card-when">{labels.lastChecked}</span>
          </div>
          <div className="lp-card-foot">
            <span className="lp-card-meta"><Icon name="check" size={13} stroke={2.6} />{c.meta}</span>
            <span className="lp-card-open">{labels.preview}<Icon name="chevron" size={14} /></span>
          </div>
        </div>
      </article>
    );
  }

  function Categories({ locale = "ja" }) {
    const copy = getCopy(locale);
    const categories = copy.sections.categories;
    return (
      <section className="lp-section" id="categories">
        <div className="lp-container">
          <div className="lp-sectionhead center reveal">
            <span className="lp-eyebrow center">{categories.eyebrow}</span>
            <h2 className="lp-h2">{spans(categories.title, locale)}</h2>
            <p className="lp-lead">{spans(categories.lead, locale)}</p>
          </div>
          <div className="lp-cards">
            {categories.cards.map((c, i) => <CatCard key={i} c={c} d={Math.min(i + 1, 3)} labels={{ curated: copy.common.curated, lastChecked: categories.lastChecked, preview: categories.preview }} />)}
          </div>
          <p className="lp-cats-note reveal">{categories.note}</p>
        </div>
      </section>
    );
  }

  // ---------- Trust ----------
  function Trust({ locale = "ja" }) {
    const trust = getCopy(locale).sections.trust;
    return (
      <section className="lp-section tint" id="trust">
        <div className="lp-container">
          <div className="lp-sectionhead center reveal">
            <span className="lp-eyebrow center">{trust.eyebrow}</span>
            <h2 className="lp-h2">{spans(trust.title, locale)}</h2>
            <p className="lp-lead">{spans(trust.lead, locale)}</p>
          </div>
          <div className="lp-trust-grid">
            {trust.cards.map((t, i) => (
              <div key={i} className="lp-trust-card reveal" data-d={Math.min((i % 2) + 1, 3)}>
                <span className="lp-trust-kicker">{t.kicker}</span>
                <div className="lp-trust-title">{t.title}</div>
                <p className="lp-trust-txt">{t.txt}</p>
              </div>
            ))}
          </div>
          <p className="lp-trust-note reveal">{spans(trust.note, locale)}</p>
        </div>
      </section>
    );
  }

  // ---------- Philosophy ----------
  function Philosophy({ locale = "ja" }) {
    const philosophy = getCopy(locale).sections.philosophy;
    return (
      <section className="lp-section" id="philosophy">
        <div className="lp-container">
          <div className="lp-philo reveal">
            <div className="lp-philo-tiles" />
            <div className="lp-philo-inner">
              <span className="lp-eyebrow center">{philosophy.eyebrow}</span>
              <h2 className="lp-philo-statement">{philosophy.statementLead}<em>{philosophy.statementAccent}</em>{philosophy.statementTail}</h2>
              <p className="lp-philo-sub">{spans(philosophy.sub, locale)}</p>
              <div className="lp-philo-not">
                {philosophy.pills.slice(0, 3).map((label) => (
                  <span key={label} className="lp-philo-pill"><span className="x"><Icon name="x" size={14} stroke={2.6} /></span>{label}</span>
                ))}
                <span className="lp-philo-pill yes"><span className="x"><Icon name="check" size={14} stroke={2.8} /></span>{philosophy.pills[3]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Final CTA ----------
  function FinalCTA({ onExplore, onHow, locale = "ja" }) {
    const finalCta = getCopy(locale).sections.finalCta;
    return (
      <section className="lp-section lp-finalcta" id="start">
        <div className="lp-container">
          <div className="reveal" style={{ display: "flex", justifyContent: "center" }}><MiniBoard locale={locale} /></div>
          <span className="lp-eyebrow center reveal">{finalCta.eyebrow}</span>
          <h2 className="lp-finalcta-title reveal">{spans(finalCta.title, locale)}</h2>
          <p className="lp-finalcta-sub reveal">{spans(finalCta.sub, locale)}</p>
          <div className="lp-finalcta-actions reveal">
            <Button variant="primary" size="md" className="btn-xl" icon="compass" onClick={onExplore}>{finalCta.cta}</Button>
            <Button variant="ghost" size="md" className="btn-xl" onClick={onHow}>{finalCta.how}</Button>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Footer ----------
  function Footer({ onLink, locale = "ja" }) {
    const footer = getCopy(locale).sections.footer;
    return (
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-grid">
            <div className="lp-footer-brand">
              <button className="lp-brand" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>
                <span className="lp-brand-mark"><span className="lp-brand-dot" /></span>
                <span className="lp-brand-name">Volecco</span>
              </button>
              <p className="lp-footer-tag">{spans(footer.tag1, locale)}</p>
              <p className="lp-footer-tag">{spans(footer.tag2, locale)}</p>
            </div>
            <div className="lp-footer-cols">
              <div className="lp-footer-col">
                <h4>{footer.product}</h4>
                {footer.links.map(([id, label]) => (
                  <a key={id} href={"#" + id} onClick={(e) => { e.preventDefault(); onLink(id); }}>{label}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <span className="lp-footer-copy">{footer.copy}</span>
            <span className="lp-footer-mono">DEPARTURES · NEXT ACTION</span>
          </div>
        </div>
      </footer>
    );
  }

  window.SolariSections = { Problem, Solution, HowItWorks, Demo, Categories, Trust, Philosophy, FinalCTA, Footer };
})();

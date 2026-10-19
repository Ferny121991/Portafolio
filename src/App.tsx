import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Code2,
  Mail,
  Menu,
  X,
  Play,
  Palette,
  Globe2,
  Github,
  Sun,
  Moon,
} from "lucide-react";
import { content, type Language } from "./content";

export default function App({ language = "es" }: { language?: Language }) {
  const t = content[language];
  const pricingUrl = `https://precios.fernelydev.com/${language === "en" ? "?lang=en" : ""}`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("fernely-theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch { /* Private browsing can block storage. */ }
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("fernely-theme", next); } catch { /* Theme still works. */ }
  }
  const [service, setService] = useState("");
  const [emailReady, setEmailReady] = useState(false);
  const [emailHref, setEmailHref] = useState("mailto:fernelydev@gmail.com");
  const icons = [Code2, Palette, Play];

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `${t.form.name}: ${data.get("name")}\n${t.form.service}: ${service}\n\n${data.get("message")}`;
    const href = `mailto:fernelydev@gmail.com?subject=${encodeURIComponent(`${t.form.subject} — ${service}`)}&body=${encodeURIComponent(body)}`;
    setEmailHref(href);
    setEmailReady(true);
    window.location.href = href;
  }

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="Fernely Dev">
            <img src="/img/logo_icon.png" width="49" height="49" alt="" />
            <span>
              FERNELY<span className="brand-accent">DEV</span>
              <small>{t.brand}</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label={t.navigation}>
            {t.nav.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="theme-toggle" type="button" onClick={toggleTheme}
              aria-label={language === "es" ? `Activar modo ${theme === "dark" ? "claro" : "oscuro"}` : `Use ${theme === "dark" ? "light" : "dark"} mode`}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <nav className="languages" aria-label={t.language}>
              <a
                href="/"
                lang="es"
                hrefLang="es"
                aria-current={language === "es" ? "page" : undefined}
              >
                ES
              </a>
              <span aria-hidden="true">/</span>
              <a
                href="/en/"
                lang="en"
                hrefLang="en"
                aria-current={language === "en" ? "page" : undefined}
              >
                EN
              </a>
            </nav>
            <a className="button button-small header-cta" href={pricingUrl}>
              {t.prices}
              <ArrowUpRight size={16} />
            </a>
            <button
              className="menu-toggle"
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <nav
          id="mobile-nav"
          className="mobile-nav"
          hidden={!menuOpen}
          aria-label={t.navigation}
        >
          {t.nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            {t.quote}
            <ArrowUpRight size={18} />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero container" id="home">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              {t.eyebrow}
            </p>
            <h1>
              {t.headline}
              <span>{t.headlineAccent}</span>
            </h1>
            <p className="hero-description">{t.description}</p>
            <div className="hero-actions">
              <a className="button" href={pricingUrl}>
                {t.prices}
                <ArrowUpRight size={19} />
              </a>
              <a className="text-link" href="#projects">
                {t.seeWork}
                <ArrowRight size={18} />
              </a>
            </div>
            <div className="hero-details">
              <span>
                <Check size={16} />
                {t.direct}
              </span>
              <span>
                <Globe2 size={16} />
                Español & English
              </span>
            </div>
            <a className="founder-chip" href="#about">
              <img src="/img/profile.jpg" width="40" height="40" alt="" />
              <span><strong>{language === "es" ? "Soy Fernely." : "I'm Fernely."}</strong> {language === "es" ? "Diseñamos tu siguiente paso." : "Let's design your next step."}</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="hero-showcase">
            <div className="showcase-top">
              <span className="mini-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>fernelydev / selected work</span>
              <ArrowUpRight size={16} />
            </div>
            <a
              href="#projects"
              className="showcase-image"
              aria-label={t.seeWork}
            >
              <img
                src="/img/optimized/oasis.webp"
                width="1100"
                height="619"
                alt={t.heroImage}
              />
            </a>
            <div className="showcase-caption">
              <span>
                <small>{t.selectedProject}</small>
                <strong>FlujoEclesial Studio</strong>
              </span>
              <span className="project-number">01 / 08</span>
            </div>
            <div className="showcase-sticker">
              <Code2 size={25} />
              <span>
                {t.sticker[0]}
                <strong>{t.sticker[1]}</strong>
              </span>
            </div>
            <div className="showcase-note">
              <span className="status-dot" />
              {t.showcaseNote}
            </div>
          </div>
        </section>
        <div className="specialties">
          <div className="container specialties-inner">
            <span>{t.specialties}</span>
            <p>
              {t.specialtyItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </p>
          </div>
        </div>
        <section id="services" className="section container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / {t.servicesLabel}</p>
              <h2>{t.servicesTitle}</h2>
            </div>
            <p>{t.servicesIntro}</p>
          </div>
          <div className="services-grid">
            {t.services.map((item, i) => {
              const Icon = icons[i];
              return (
                <article className="service" key={item.title}>
                  <div className="service-top">
                    <Icon size={29} strokeWidth={1.5} />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.features.map((feature) => (
                      <li key={feature}>
                        <Check size={15} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="text-link"
                    onClick={() => setService(item.title)}
                  >
                    {t.serviceCta}
                    <ArrowUpRight size={17} />
                  </a>
                </article>
              );
            })}
          </div>
        </section>
        <section id="projects" className="section work-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / {t.workLabel}</p>
                <h2>{t.workTitle}</h2>
              </div>
              <p>{t.workIntro}</p>
            </div>
            <div className="work-grid">
              {t.projects.slice(0, 4).map((project, i) => (
                <article className="work-card" key={project.title}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-image"
                    aria-label={`${t.visit}: ${project.title} (${t.newTab})`}
                  >
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                      decoding="async"
                      width="900"
                      height="506"
                    />
                    <span>
                      {t.visit}
                      <ArrowUpRight size={18} />
                    </span>
                  </a>
                  <div className="work-meta">
                    <p>{project.category}</p>
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="work-description">{project.description}</p>
                </article>
              ))}
            </div>
            <details className="more-projects">
              <summary>
                {t.moreWork}
                <span aria-hidden="true">+</span>
              </summary>
              <div className="extra-projects">
                {t.projects.slice(4).map((project) => (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={project.title}
                  >
                    <span>
                      <strong>{project.title}</strong>
                      <small>{project.description}</small>
                    </span>
                    <ArrowUpRight size={22} />
                    <span className="sr-only">{t.newTab}</span>
                  </a>
                ))}
              </div>
            </details>
            <div className="work-cta">
              <p>{t.workCta}</p>
              <a href="#contact" className="text-link">
                {t.heroCta}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section id="process" className="section container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / {t.processLabel}</p>
              <h2>{t.processTitle}</h2>
            </div>
            <p>{t.processIntro}</p>
          </div>
          <ol className="process-grid">
            {t.steps.map((step, i) => (
              <li key={step.title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
        <section id="about" className="about-section">
          <div className="container about-grid">
            <div className="portrait-wrap">
              <img
                src="/img/profile.jpg"
                width="400"
                height="460"
                alt="Fernely"
                loading="lazy"
              />
            </div>
            <div>
              <p className="eyebrow">{t.aboutLabel}</p>
              <h2>{t.aboutTitle}</h2>
              <p>{t.aboutText}</p>
              <p>{t.aboutValues}</p>
              <div className="about-signature">
                Fernely <span>/ Fernely Dev</span>
              </div>
              <a className="text-link" href="#contact">
                {t.aboutCta}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section id="faq" className="section container faq-grid">
          <div>
            <p className="eyebrow">04 / {t.faqLabel}</p>
            <h2>{t.faqTitle}</h2>
            <p className="section-intro">{t.faqIntro}</p>
            <a className="text-link" href="mailto:fernelydev@gmail.com">
              {t.ask}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="faq-list">
            {t.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">
                <span className="status-dot" />
                {t.contactLabel}
              </p>
              <h2>{t.contactTitle}</h2>
              <p>{t.contactIntro}</p>
              <a href="mailto:fernelydev@gmail.com" className="contact-email">
                fernelydev@gmail.com
                <ArrowUpRight size={22} />
              </a>
              <span className="contact-note">
                <Globe2 size={17} />
                {t.contactLanguages}
              </span>
              <a
                className="price-link"
                href={pricingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.prices}
                <ArrowUpRight size={17} />
                <span className="sr-only">{t.newTab}</span>
              </a>
            </div>
            <form className="inquiry-form" onSubmit={prepareEmail}>
              <h3>{t.form.title}</h3>
              <p>{t.form.intro}</p>
              <label htmlFor="client-name">{t.form.name}</label>
              <input
                id="client-name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                placeholder={t.form.namePlaceholder}
              />
              <label htmlFor="service">{t.form.service}</label>
              <select
                id="service"
                name="service"
                required
                value={service}
                onChange={(event) => setService(event.target.value)}
              >
                <option value="" disabled>
                  {t.form.choose}
                </option>
                {[...t.services.map((item) => item.title), t.form.other].map(
                  (option) => (
                    <option key={option}>{option}</option>
                  ),
                )}
              </select>
              <label htmlFor="message">{t.form.message}</label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={2500}
                rows={3}
                placeholder={t.form.messagePlaceholder}
              />
              <button type="submit" className="button">
                {t.form.submit}
                <Mail size={18} />
              </button>
              <p className="form-disclosure">{t.form.disclosure}</p>
              {emailReady && (
                <div className="email-status" role="status">
                  {t.form.ready}
                  <a href={emailHref}>{t.form.retry}</a>
                  <span>{t.form.fallback}</span>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-top">
          <a href="#home" className="footer-brand">
            FERNELY<span>DEV</span>
          </a>
          <p>{t.footerTagline}</p>
          <a
            href="https://github.com/Ferny121991"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub (${t.newTab})`}
          >
            <Github size={20} />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Fernely Dev.</span>
          <nav aria-label={t.navigation}>
            <a href="#services">{t.nav[0][1]}</a>
            <a href="#projects">{t.nav[1][1]}</a>
            <a href="#contact">{t.quote}</a>
          </nav>
          <span>Español / English</span>
        </div>
      </footer>
      <a href="#contact" className="mobile-contact">
        {t.quote}
        <ArrowUpRight size={18} />
      </a>
    </>
  );
}

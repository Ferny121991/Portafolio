const lang = document.documentElement.lang;
const en = lang === "en";
const themeToggle = document.querySelector("#theme-toggle");
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", en
    ? `Use ${theme === "dark" ? "light" : "dark"} mode`
    : `Activar modo ${theme === "dark" ? "claro" : "oscuro"}`);
}
try {
  const theme = localStorage.getItem("fernely-theme");
  if (theme === "dark" || theme === "light") applyTheme(theme);
} catch { /* Theme works even when storage is blocked. */ }
themeToggle?.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(theme);
  try { localStorage.setItem("fernely-theme", theme); } catch { /* Keep the current choice in this tab. */ }
});
const plan = document.querySelector("#plan");
const choices = [...document.querySelectorAll(".extra-choice input")];
const format = (value) => `US$${value.toLocaleString("en-US")}`;
const descriptions = new Map(
  choices.map((input) => [
    input.value,
    input.closest("label").querySelector("[data-extra-status]").textContent,
  ]),
);
function updateQuote() {
  const selected = plan.selectedOptions[0];
  if (!selected) return;
  let initial = Number(selected.dataset.price),
    monthly = 0;
  const items = [],
    summary = [];
  choices.forEach((input) => {
    const label = input.closest("label");
    const included = input.dataset.included.split(",").includes(plan.value);
    input.disabled = included;
    if (included) input.checked = false;
    label.classList.toggle("is-included", included);
    label.querySelector("[data-extra-status]").textContent = included
      ? en
        ? "Included in this package"
        : "Incluido en este paquete"
      : descriptions.get(input.value);
    const priceLabel = label.querySelector("[data-extra-price]");
    priceLabel.textContent = included
      ? (en ? "Included" : "Incluido")
      : `${format(Number(input.dataset.price))}${input.dataset.period === "month" ? (en ? "/month" : "/mes") : ""}`;
    if (included) {
      const line = `${label.querySelector("b").textContent.trim()}: ${en ? "included" : "incluido"}`;
      items.push(line);
      summary.push(line);
    }
    if (!input.checked) return;
    const price = Number(input.dataset.price);
    const name = label.querySelector("b").textContent;
    const period = input.dataset.period === "month";
    if (period) monthly += price;
    else initial += price;
    const line = `${name}: ${format(price)}${period ? (en ? "/month" : "/mes") : ""}`;
    items.push(line);
    summary.push(line);
  });
  const name = selected.dataset.name;
  document.querySelector("#chosen-plan").textContent = name;
  document.querySelector("#initial-total").textContent = format(initial);
  document.querySelector("#monthly-total").textContent = monthly
    ? `${format(monthly)}/${en ? "month" : "mes"}`
    : en
      ? "No monthly service selected"
      : "Sin mensualidad seleccionada";
  const list = document.querySelector("#chosen-extras");
  list.replaceChildren(
    ...items.map((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      return li;
    }),
  );
  const body = `${en ? "I would like a proposal for" : "Me gustaría una propuesta para"}: ${name}\n${summary.join("\n")}\n\n${en ? "Estimated initial investment" : "Inversión inicial estimada"}: ${format(initial)}\n${en ? "Optional monthly service" : "Opcional mensual"}: ${format(monthly)}\n\n${en ? "My business and timeline" : "Mi negocio y fecha deseada"}:\n\n${document.querySelector(".estimate-note").textContent}`;
  document.querySelector("#quote-email").href =
    `mailto:${document.body.dataset.email}?subject=${encodeURIComponent(`${en ? "Project inquiry" : "Consulta de proyecto"} — ${name}`)}&body=${encodeURIComponent(body)}`;
}
plan?.addEventListener("change", updateQuote);
choices.forEach((input) => input.addEventListener("change", updateQuote));
document.querySelectorAll("[data-select-plan]").forEach((link) =>
  link.addEventListener("click", () => {
    plan.value = link.dataset.selectPlan;
    updateQuote();
  }),
);
updateQuote();

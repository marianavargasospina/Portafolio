const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const menuToggle = document.getElementById("menu-toggle");
const menuIcon = document.getElementById("menu-icon");
const navigation = document.getElementById("primary-navigation");
const year = document.getElementById("current-year");

function getPreferredTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    themeIcon.classList.toggle("fa-sun", isDark);
    themeIcon.classList.toggle("fa-moon", !isDark);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Activar tema claro" : "Activar tema oscuro");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#121212" : "#fafafa");
}

applyTheme(getPreferredTheme());

themeToggle.addEventListener("click", () => {
    const nextTheme = root.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
});

function setMenuOpen(isOpen) {
    navigation.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuIcon.classList.toggle("fa-xmark", isOpen);
    menuIcon.classList.toggle("fa-bars", !isOpen);
}

menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuToggle.focus();
    }
});

year.textContent = String(new Date().getFullYear());

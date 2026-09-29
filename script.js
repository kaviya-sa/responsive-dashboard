/* =========================================
   STEP 9 - DARK / LIGHT THEME
   ========================================= */

const themeToggle = document.getElementById("themeToggle");


// Check the current theme
const currentTheme =
    localStorage.getItem("theme");


// Apply saved theme
if (currentTheme === "dark") {

    document.documentElement.setAttribute(
        "data-theme",
        "dark"
    );

    themeToggle.textContent =
        "☀️ Light Mode";

} else {

    document.documentElement.setAttribute(
        "data-theme",
        "light"
    );

    themeToggle.textContent =
        "🌙 Dark Mode";
}


// Theme button click
themeToggle.addEventListener("click", () => {

    const current =
        document.documentElement.getAttribute(
            "data-theme"
        );


    if (current === "dark") {

        // Change to light
        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

        themeToggle.textContent =
            "🌙 Dark Mode";

        localStorage.setItem(
            "theme",
            "light"
        );

    } else {

        // Change to dark
        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        themeToggle.textContent =
            "☀️ Light Mode";

        localStorage.setItem(
            "theme",
            "dark"
        );
    }

});
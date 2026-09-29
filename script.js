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
let allProducts = [];
let selectedCategory = "all";
let selectedSort = "default";

async function fetchProducts() {
    try {
        const skeleton = document.getElementById("loading-skeleton");
skeleton.style.display = "grid";
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        allProducts = products;
        skeleton.style.display = "none";

       document.getElementById("sort-select").value = selectedSort;

filterProducts();
    }
       catch (error) {
    console.error("Error fetching products:", error);

    const skeleton = document.getElementById("loading-skeleton");
    const errorBanner = document.getElementById("error-banner");

    skeleton.style.display = "none";

    errorBanner.textContent =
        "Unable to load products. Please try again.";

    errorBanner.style.display = "block";
}
}

function displayProducts(products) {
    const container = document.getElementById("products-container");

    container.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("article");

        productCard.innerHTML = `
            <h3>${product.title}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price}</p>
        `;

        container.appendChild(productCard);
    });
}
function savePreferences() {
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("selectedSort", selectedSort);
}
function loadPreferences() {
    const savedCategory = localStorage.getItem("selectedCategory");
    const savedSort = localStorage.getItem("selectedSort");

    if (savedCategory) {
        selectedCategory = savedCategory;
    }

    if (savedSort) {
        selectedSort = savedSort;
    }
}

function filterProducts() {
    const searchText = document
        .getElementById("search-input")
        .value
        .toLowerCase();

    let filteredProducts = allProducts.filter(product => {

        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    filteredProducts.sort((a, b) => {

        if (selectedSort === "price-low") {
            return a.price - b.price;
        }

        if (selectedSort === "price-high") {
            return b.price - a.price;
        }

        if (selectedSort === "name-az") {
            return a.title.localeCompare(b.title);
        }

        if (selectedSort === "name-za") {
            return b.title.localeCompare(a.title);
        }

        return 0;
    });

    displayProducts(filteredProducts);
}
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", filterProducts);

const categoryTabs = document.querySelectorAll("#category-tabs button");

categoryTabs.forEach(button => {
    button.addEventListener("click", function () {
        selectedCategory = button.dataset.category;

        savePreferences();

        filterProducts();
    });
});

const sortSelect = document.getElementById("sort-select");

sortSelect.addEventListener("change", function () {
    selectedSort = sortSelect.value;

    savePreferences();

    filterProducts();
});

loadPreferences();

fetchProducts();
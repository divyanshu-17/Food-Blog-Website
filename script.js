const recipes = [
    {
        name: "Vada Pav",
        cuisine: "Maharashtrian",
        category: "Street Food",
        time: "35 min",
        difficulty: "Easy",
        image: "Vada-Pav.webp",
        description: "Mumbai's spicy potato fritter tucked into soft pav with chutney.",
        ingredients: ["Boiled potatoes", "Besan", "Green chilli paste", "Pav", "Garlic chutney"],
        instructions: ["Mash potatoes with spices.", "Dip potato balls in besan batter.", "Fry until crisp.", "Serve inside pav with chutney."]
    },
    {
        name: "Litti Chokha",
        cuisine: "Bihari",
        category: "Traditional",
        time: "55 min",
        difficulty: "Medium",
        image: "Litti-Chokha.jpg",
        description: "Roasted wheat balls filled with sattu, served with smoky mashed vegetables.",
        ingredients: ["Whole wheat flour", "Sattu", "Mustard oil", "Brinjal", "Potato", "Tomato"],
        instructions: ["Prepare dough and sattu filling.", "Stuff and shape litti.", "Roast until crisp.", "Serve with mashed chokha and ghee."]
    },
    {
        name: "Idli Sambhar",
        cuisine: "South Indian",
        category: "Breakfast",
        time: "30 min",
        difficulty: "Easy",
        image: "idli.jpg",
        description: "Soft steamed rice cakes served with tangy lentil sambhar.",
        ingredients: ["Idli batter", "Toor dal", "Tamarind", "Sambhar powder", "Coconut chutney"],
        instructions: ["Steam idlis in moulds.", "Cook dal with vegetables and spices.", "Add tamarind and simmer.", "Serve hot with chutney."]
    },
    {
        name: "Chole Bhature",
        cuisine: "Punjabi",
        category: "Main Course",
        time: "60 min",
        difficulty: "Medium",
        image: "chola bhatura.jpg",
        description: "Spiced chickpeas served with fluffy fried bhature.",
        ingredients: ["Chickpeas", "Onion", "Tomato", "Chole masala", "Flour", "Curd"],
        instructions: ["Cook chickpeas until soft.", "Prepare spicy onion tomato gravy.", "Knead and rest bhature dough.", "Fry bhature and serve together."]
    },
    {
        name: "Kachori",
        cuisine: "Rajasthani",
        category: "Snack",
        time: "45 min",
        difficulty: "Medium",
        image: "kachori.jpg",
        description: "Crispy stuffed pastry with a spicy dal filling.",
        ingredients: ["Maida", "Moong dal", "Fennel", "Coriander powder", "Oil"],
        instructions: ["Prepare spiced dal filling.", "Stuff inside small dough discs.", "Seal and flatten carefully.", "Deep fry on medium heat until crisp."]
    },
    {
        name: "Kathi Roll",
        cuisine: "Bengali",
        category: "Street Food",
        time: "40 min",
        difficulty: "Easy",
        image: "kathi roll.jpg",
        description: "A flaky paratha wrap filled with spiced vegetables and sauces.",
        ingredients: ["Paratha", "Paneer or vegetables", "Onion", "Green chutney", "Lemon"],
        instructions: ["Cook the filling with spices.", "Warm paratha on a tawa.", "Add chutney, onion, and filling.", "Roll tightly and serve."]
    },
    {
        name: "Poha",
        cuisine: "Madhya Pradesh",
        category: "Breakfast",
        time: "20 min",
        difficulty: "Easy",
        image: "poha-recipe.jpg",
        description: "Light flattened rice cooked with turmeric, peanuts, and lemon.",
        ingredients: ["Poha", "Peanuts", "Onion", "Mustard seeds", "Curry leaves", "Lemon"],
        instructions: ["Rinse poha and rest it.", "Temper mustard seeds, curry leaves, and peanuts.", "Add onion and turmeric.", "Mix poha and finish with lemon."]
    },
    {
        name: "Sandwich",
        cuisine: "Cafe",
        category: "Snack",
        time: "15 min",
        difficulty: "Easy",
        image: "sand.jpg",
        description: "A quick vegetable sandwich with chutney and crisp toasted bread.",
        ingredients: ["Bread", "Butter", "Green chutney", "Cucumber", "Tomato", "Cheese"],
        instructions: ["Spread butter and chutney on bread.", "Layer vegetables and cheese.", "Toast until golden.", "Cut and serve warm."]
    }
];

const categoryTabs = document.getElementById("categoryTabs");
const recipeGrid = document.getElementById("recipeGrid");
const recipePanel = document.getElementById("recipePanel");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");

let activeCategory = "All";

const categories = ["All", ...new Set(recipes.flatMap((recipe) => [recipe.cuisine, recipe.category]))];

function renderCategories() {
    categoryTabs.innerHTML = categories.map((category) => `
        <button class="${category === activeCategory ? "active" : ""}" data-category="${category}">
            ${category}
        </button>
    `).join("");
}

function getFilteredRecipes() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    return recipes.filter((recipe) => {
        const matchesCategory = activeCategory === "All" || recipe.cuisine === activeCategory || recipe.category === activeCategory;
        const searchableText = `${recipe.name} ${recipe.cuisine} ${recipe.category} ${recipe.description}`.toLowerCase();
        return matchesCategory && searchableText.includes(searchTerm);
    });
}

function renderRecipes() {
    const filteredRecipes = getFilteredRecipes();

    resultCount.textContent = `${filteredRecipes.length} recipe${filteredRecipes.length === 1 ? "" : "s"} found`;

    if (filteredRecipes.length === 0) {
        recipeGrid.innerHTML = `<p>No recipes found. Try another cuisine or search word.</p>`;
        return;
    }

    recipeGrid.innerHTML = filteredRecipes.map((recipe) => `
        <article class="recipe-card" tabindex="0" data-recipe="${recipe.name}">
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="card-body">
                <div class="tag-row">
                    <span class="tag">${recipe.cuisine}</span>
                    <span class="tag">${recipe.category}</span>
                </div>
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <p class="meta">${recipe.time} | ${recipe.difficulty}</p>
            </div>
        </article>
    `).join("");
}

function renderRecipePanel(recipe) {
    recipePanel.innerHTML = `
        <p class="eyebrow">${recipe.cuisine} | ${recipe.category}</p>
        <h2>${recipe.name}</h2>
        <p>${recipe.description}</p>
        <img src="${recipe.image}" alt="${recipe.name}">
        <p class="meta">${recipe.time} | ${recipe.difficulty}</p>

        <h3>Ingredients</h3>
        <ul>
            ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>

        <h3>Instructions</h3>
        <ol>
            ${recipe.instructions.map((step) => `<li>${step}</li>`).join("")}
        </ol>
    `;
}

categoryTabs.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) {
        return;
    }

    activeCategory = button.dataset.category;
    renderCategories();
    renderRecipes();
});

recipeGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".recipe-card");
    if (!card) {
        return;
    }

    const recipe = recipes.find((item) => item.name === card.dataset.recipe);
    renderRecipePanel(recipe);
});

recipeGrid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
        return;
    }

    const card = event.target.closest(".recipe-card");
    if (!card) {
        return;
    }

    event.preventDefault();
    const recipe = recipes.find((item) => item.name === card.dataset.recipe);
    renderRecipePanel(recipe);
});

searchInput.addEventListener("input", renderRecipes);

renderCategories();
renderRecipes();
renderRecipePanel(recipes[0]);

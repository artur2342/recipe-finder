/* ============================================
   RecipeVault - i18n (English / Hebrew)
   ============================================ */

const TRANSLATIONS = {
  en: {
    // Nav
    brandName: "RecipeVault",
    discover: "Discover",
    collections: "Collections",
    mealPlan: "Meal Plan",
    offline: "Offline",

    // Hero
    heroTitle: "What would you like to cook?",
    searchPlaceholder: "Search recipes, ingredients...",
    search: "Search",
    filters: "Filters",

    // Filters
    cuisine: "Cuisine",
    allCuisines: "All Cuisines",
    category: "Category",
    allCategories: "All Categories",
    diet: "Diet",
    anyDiet: "Any Diet",
    vegetarian: "Vegetarian",
    vegan: "Vegan",
    seafood: "Seafood",
    chicken: "Chicken",
    beef: "Beef",
    pork: "Pork",
    lamb: "Lamb",
    maxPrepTime: "Max Prep Time",
    anyTime: "Any Time",
    under15: "Under 15 min",
    under30: "Under 30 min",
    under1h: "Under 1 hour",
    under2h: "Under 2 hours",
    ingredientsFilter: "Ingredients (comma separated)",
    ingredientsPlaceholder: "e.g. chicken, rice, garlic",
    applyFilters: "Apply Filters",
    clear: "Clear",

    // Categories
    browseByCategory: "Browse by Category",

    // Results
    featuredRecipes: "Featured Recipes",
    searchResults: "Search Results",
    findingRecipes: "Finding delicious recipes...",
    noRecipes: "No recipes found. Try a different search!",

    // Recipe detail
    saveRecipe: "Save Recipe",
    saved: "Saved",
    startCooking: "Start Cooking",
    addToCollection: "Add to Collection",
    share: "Share",
    copyLink: "Copy Link",
    servings: "Servings:",
    nutritionPerServing: "Nutrition per Serving",
    calories: "Calories",
    protein: "Protein",
    carbs: "Carbs",
    fat: "Fat",
    fiber: "Fiber",
    sodium: "Sodium",
    potentialAllergens: "Potential Allergens",
    ingredients: "Ingredients",
    instructions: "Instructions",
    videoTutorial: "Video Tutorial",
    reviewsAndRatings: "Reviews & Ratings",
    writeReview: "Write your review...",
    submitReview: "Submit Review",
    you: "You",
    recipeNotFound: "Recipe not found.",
    loadFailed: "Failed to load recipe. Are you offline?",
    selectRating: "Please select a rating",
    reviewSubmitted: "Review submitted!",
    recipeSaved: "Recipe saved!",
    recipeRemoved: "Recipe removed from saved",
    alreadyInCollection: "Already in this collection",
    addedTo: "Added to",
    linkCopied: "Link copied!",

    // Allergens
    allergenDairy: "Dairy",
    allergenEggs: "Eggs",
    allergenPeanuts: "Peanuts",
    allergenTreeNuts: "Tree Nuts",
    allergenGluten: "Gluten",
    allergenSoy: "Soy",
    allergenShellfish: "Shellfish",
    allergenFish: "Fish",

    // Cooking mode
    exitCooking: "Exit Cooking",
    stepOf: "Step {current} of {total}",
    done: "Done!",
    nextStep: "Next Step",
    previous: "Previous",
    startTimer: "Start Timer",
    pause: "Pause",
    resume: "Resume",
    reset: "Reset",
    customMin: "Custom min",
    set: "Set",
    timerDone: "Timer done!",
    recipeComplete: "Recipe complete! Enjoy your meal!",
    noInstructions: "No instructions available",

    // Timer buttons
    min1: "1 min",
    min5: "5 min",
    min10: "10 min",
    min15: "15 min",
    min30: "30 min",

    // Collections
    myCollections: "My Collections",
    newCollection: "+ New Collection",
    back: "Back",
    delete: "Delete",
    favorites: "Favorites",
    quickWeeknight: "Quick Weeknight",
    weekendSpecials: "Weekend Specials",
    recipes: "recipes",
    collectionNamePrompt: "Collection name:",
    collectionCreated: 'Collection "{name}" created!',
    deleteConfirm: "Delete this collection?",
    collectionDeleted: "Collection deleted",

    // Planner
    mealPlanner: "Meal Planner",
    prevWeek: "Prev Week",
    nextWeek: "Next Week",
    savedRecipes: "Saved Recipes",
    dragHint: "Drag recipes onto the calendar",
    saveFirst: "Save some recipes first!",
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    addedToSlot: "Added to {slot}!",
    dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

    // Misc
    searchFailed: "Search failed. Check your connection.",
    initFailed: "Failed to load recipes. Check your internet connection.",
    min: "min",
    recipesPostfix: "Recipes",
  },

  he: {
    // Nav
    brandName: "RecipeVault",
    discover: "\u05D2\u05DC\u05D4",
    collections: "\u05D0\u05D5\u05E1\u05E4\u05D9\u05DD",
    mealPlan: "\u05EA\u05DB\u05E0\u05D5\u05DF \u05D0\u05E8\u05D5\u05D7\u05D5\u05EA",
    offline: "\u05DC\u05D0 \u05DE\u05D7\u05D5\u05D1\u05E8",

    // Hero
    heroTitle: "\u05DE\u05D4 \u05D1\u05D0 \u05DC\u05DA \u05DC\u05D1\u05E9\u05DC?",
    searchPlaceholder: "\u05D7\u05E4\u05E9 \u05DE\u05EA\u05DB\u05D5\u05E0\u05D9\u05DD, \u05DE\u05E6\u05E8\u05DB\u05D9\u05DD...",
    search: "\u05D7\u05E4\u05E9",
    filters: "\u05E1\u05D9\u05E0\u05D5\u05DF",

    // Filters
    cuisine: "\u05DE\u05D8\u05D1\u05D7",
    allCuisines: "\u05DB\u05DC \u05D4\u05DE\u05D8\u05D1\u05D7\u05D9\u05DD",
    category: "\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4",
    allCategories: "\u05DB\u05DC \u05D4\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA",
    diet: "\u05EA\u05E4\u05E8\u05D9\u05D8",
    anyDiet: "\u05DB\u05DC \u05EA\u05E4\u05E8\u05D9\u05D8",
    vegetarian: "\u05E6\u05DE\u05D7\u05D5\u05E0\u05D9",
    vegan: "\u05D8\u05D1\u05E2\u05D5\u05E0\u05D9",
    seafood: "\u05DE\u05D0\u05DB\u05DC\u05D9 \u05D9\u05DD",
    chicken: "\u05E2\u05D5\u05E3",
    beef: "\u05D1\u05E7\u05E8",
    pork: "\u05D7\u05D6\u05D9\u05E8",
    lamb: "\u05DB\u05D1\u05E9",
    maxPrepTime: "\u05D6\u05DE\u05DF \u05D4\u05DB\u05E0\u05D4 \u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9",
    anyTime: "\u05DB\u05DC \u05D6\u05DE\u05DF",
    under15: "\u05E4\u05D7\u05D5\u05EA \u05DE-15 \u05D3\u05E7\u05F3",
    under30: "\u05E4\u05D7\u05D5\u05EA \u05DE-30 \u05D3\u05E7\u05F3",
    under1h: "\u05E4\u05D7\u05D5\u05EA \u05DE\u05E9\u05E2\u05D4",
    under2h: "\u05E4\u05D7\u05D5\u05EA \u05DE\u05E9\u05E2\u05EA\u05D9\u05D9\u05DD",
    ingredientsFilter: "\u05DE\u05E6\u05E8\u05DB\u05D9\u05DD (\u05DE\u05D5\u05E4\u05E8\u05D3\u05D9\u05DD \u05D1\u05E4\u05E1\u05D9\u05E7)",
    ingredientsPlaceholder: "\u05DC\u05DE\u05E9\u05DC: \u05E2\u05D5\u05E3, \u05D0\u05D5\u05E8\u05D6, \u05E9\u05D5\u05DD",
    applyFilters: "\u05D4\u05D7\u05DC \u05E1\u05D9\u05E0\u05D5\u05DF",
    clear: "\u05E0\u05E7\u05D4",

    // Categories
    browseByCategory: "\u05D2\u05DC\u05D4 \u05DC\u05E4\u05D9 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4",

    // Results
    featuredRecipes: "\u05DE\u05EA\u05DB\u05D5\u05E0\u05D9\u05DD \u05DE\u05D5\u05DE\u05DC\u05E6\u05D9\u05DD",
    searchResults: "\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D7\u05D9\u05E4\u05D5\u05E9",
    findingRecipes: "\u05DE\u05D7\u05E4\u05E9 \u05DE\u05EA\u05DB\u05D5\u05E0\u05D9\u05DD \u05D8\u05E2\u05D9\u05DE\u05D9\u05DD...",
    noRecipes: "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05DE\u05EA\u05DB\u05D5\u05E0\u05D9\u05DD. \u05E0\u05E1\u05D4 \u05D7\u05D9\u05E4\u05D5\u05E9 \u05D0\u05D7\u05E8!",

    // Recipe detail
    saveRecipe: "\u05E9\u05DE\u05D5\u05E8 \u05DE\u05EA\u05DB\u05D5\u05DF",
    saved: "\u05E0\u05E9\u05DE\u05E8",
    startCooking: "\u05D4\u05EA\u05D7\u05DC \u05DC\u05D1\u05E9\u05DC",
    addToCollection: "\u05D4\u05D5\u05E1\u05E3 \u05DC\u05D0\u05D5\u05E1\u05E3",
    share: "\u05E9\u05EA\u05E3",
    copyLink: "\u05D4\u05E2\u05EA\u05E7 \u05E7\u05D9\u05E9\u05D5\u05E8",
    servings: "\u05DE\u05E0\u05D5\u05EA:",
    nutritionPerServing: "\u05E2\u05E8\u05DB\u05D9\u05DD \u05EA\u05D6\u05D5\u05E0\u05EA\u05D9\u05D9\u05DD \u05DC\u05DE\u05E0\u05D4",
    calories: "\u05E7\u05DC\u05D5\u05E8\u05D9\u05D5\u05EA",
    protein: "\u05D7\u05DC\u05D1\u05D5\u05DF",
    carbs: "\u05E4\u05D7\u05DE\u05D9\u05DE\u05D5\u05EA",
    fat: "\u05E9\u05D5\u05DE\u05DF",
    fiber: "\u05E1\u05D9\u05D1\u05D9\u05DD",
    sodium: "\u05E0\u05EA\u05E8\u05DF",
    potentialAllergens: "\u05D0\u05DC\u05E8\u05D2\u05E0\u05D9\u05DD \u05D0\u05E4\u05E9\u05E8\u05D9\u05D9\u05DD",
    ingredients: "\u05DE\u05E6\u05E8\u05DB\u05D9\u05DD",
    instructions: "\u05D4\u05D5\u05E8\u05D0\u05D5\u05EA \u05D4\u05DB\u05E0\u05D4",
    videoTutorial: "\u05E1\u05E8\u05D8\u05D5\u05DF \u05D5\u05D9\u05D3\u05D0\u05D5",
    reviewsAndRatings: "\u05D1\u05D9\u05E7\u05D5\u05E8\u05D5\u05EA \u05D5\u05D3\u05D9\u05E8\u05D5\u05D2\u05D9\u05DD",
    writeReview: "\u05DB\u05EA\u05D5\u05D1 \u05D0\u05EA \u05D4\u05D1\u05D9\u05E7\u05D5\u05E8\u05EA \u05E9\u05DC\u05DA...",
    submitReview: "\u05E9\u05DC\u05D7 \u05D1\u05D9\u05E7\u05D5\u05E8\u05EA",
    you: "\u05D0\u05EA\u05D4",
    recipeNotFound: "\u05D4\u05DE\u05EA\u05DB\u05D5\u05DF \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0.",
    loadFailed: "\u05E0\u05DB\u05E9\u05DC \u05D1\u05D8\u05E2\u05D9\u05E0\u05EA \u05D4\u05DE\u05EA\u05DB\u05D5\u05DF. \u05D0\u05EA\u05D4 \u05DC\u05D0 \u05DE\u05D7\u05D5\u05D1\u05E8?",
    selectRating: "\u05D0\u05E0\u05D0 \u05D1\u05D7\u05E8 \u05D3\u05D9\u05E8\u05D5\u05D2",
    reviewSubmitted: "\u05D4\u05D1\u05D9\u05E7\u05D5\u05E8\u05EA \u05E0\u05E9\u05DC\u05D7\u05D4!",
    recipeSaved: "\u05D4\u05DE\u05EA\u05DB\u05D5\u05DF \u05E0\u05E9\u05DE\u05E8!",
    recipeRemoved: "\u05D4\u05DE\u05EA\u05DB\u05D5\u05DF \u05D4\u05D5\u05E1\u05E8 \u05DE\u05D4\u05E9\u05DE\u05D5\u05E8\u05D9\u05DD",
    alreadyInCollection: "\u05DB\u05D1\u05E8 \u05E0\u05DE\u05E6\u05D0 \u05D1\u05D0\u05D5\u05E1\u05E3 \u05D4\u05D6\u05D4",
    addedTo: "\u05E0\u05D5\u05E1\u05E3 \u05DC",
    linkCopied: "\u05D4\u05E7\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D5\u05E2\u05EA\u05E7!",

    // Allergens
    allergenDairy: "\u05D7\u05DC\u05D1\u05D9",
    allergenEggs: "\u05D1\u05D9\u05E6\u05D9\u05DD",
    allergenPeanuts: "\u05D1\u05D5\u05D8\u05E0\u05D9\u05DD",
    allergenTreeNuts: "\u05D0\u05D2\u05D5\u05D6\u05D9\u05DD",
    allergenGluten: "\u05D2\u05DC\u05D5\u05D8\u05DF",
    allergenSoy: "\u05E1\u05D5\u05D9\u05D4",
    allergenShellfish: "\u05E8\u05DB\u05D9\u05DB\u05D5\u05EA",
    allergenFish: "\u05D3\u05D2\u05D9\u05DD",

    // Cooking mode
    exitCooking: "\u05E6\u05D0 \u05DE\u05DE\u05E6\u05D1 \u05D1\u05D9\u05E9\u05D5\u05DC",
    stepOf: "\u05E9\u05DC\u05D1 {current} \u05DE\u05EA\u05D5\u05DA {total}",
    done: "\u05E1\u05D9\u05D9\u05DE\u05E0\u05D5!",
    nextStep: "\u05E9\u05DC\u05D1 \u05D4\u05D1\u05D0",
    previous: "\u05D4\u05E7\u05D5\u05D3\u05DD",
    startTimer: "\u05D4\u05EA\u05D7\u05DC \u05D8\u05D9\u05D9\u05DE\u05E8",
    pause: "\u05D4\u05E9\u05D4\u05D4",
    resume: "\u05D4\u05DE\u05E9\u05DA",
    reset: "\u05D0\u05E4\u05E1",
    customMin: "\u05D3\u05E7\u05F3 \u05DE\u05D5\u05EA\u05D0\u05DD",
    set: "\u05E7\u05D1\u05E2",
    timerDone: "\u05D4\u05D8\u05D9\u05D9\u05DE\u05E8 \u05E0\u05D2\u05DE\u05E8!",
    recipeComplete: "\u05D4\u05DE\u05EA\u05DB\u05D5\u05DF \u05DE\u05D5\u05DB\u05DF! \u05D1\u05EA\u05D9\u05D0\u05D1\u05D5\u05DF!",
    noInstructions: "\u05D0\u05D9\u05DF \u05D4\u05D5\u05E8\u05D0\u05D5\u05EA \u05D6\u05DE\u05D9\u05E0\u05D5\u05EA",

    // Timer buttons
    min1: "\u05D3\u05E7\u05F3 1",
    min5: "5 \u05D3\u05E7\u05F3",
    min10: "10 \u05D3\u05E7\u05F3",
    min15: "15 \u05D3\u05E7\u05F3",
    min30: "30 \u05D3\u05E7\u05F3",

    // Collections
    myCollections: "\u05D4\u05D0\u05D5\u05E1\u05E4\u05D9\u05DD \u05E9\u05DC\u05D9",
    newCollection: "+ \u05D0\u05D5\u05E1\u05E3 \u05D7\u05D3\u05E9",
    back: "\u05D7\u05D6\u05E8\u05D4",
    delete: "\u05DE\u05D7\u05E7",
    favorites: "\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD",
    quickWeeknight: "\u05D0\u05E8\u05D5\u05D7\u05D5\u05EA \u05DE\u05D4\u05D9\u05E8\u05D5\u05EA",
    weekendSpecials: "\u05DE\u05D9\u05D5\u05D7\u05D3\u05D9 \u05E1\u05D5\u05E4\u05F4\u05E9",
    recipes: "\u05DE\u05EA\u05DB\u05D5\u05E0\u05D9\u05DD",
    collectionNamePrompt: "\u05E9\u05DD \u05D4\u05D0\u05D5\u05E1\u05E3:",
    collectionCreated: '\u05D4\u05D0\u05D5\u05E1\u05E3 "{name}" \u05E0\u05D5\u05E6\u05E8!',
    deleteConfirm: "\u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05D4\u05D0\u05D5\u05E1\u05E3?",
    collectionDeleted: "\u05D4\u05D0\u05D5\u05E1\u05E3 \u05E0\u05DE\u05D7\u05E7",

    // Planner
    mealPlanner: "\u05EA\u05DB\u05E0\u05D5\u05DF \u05D0\u05E8\u05D5\u05D7\u05D5\u05EA",
    prevWeek: "\u05E9\u05D1\u05D5\u05E2 \u05E7\u05D5\u05D3\u05DD",
    nextWeek: "\u05E9\u05D1\u05D5\u05E2 \u05D4\u05D1\u05D0",
    savedRecipes: "\u05DE\u05EA\u05DB\u05D5\u05E0\u05D9\u05DD \u05E9\u05DE\u05D5\u05E8\u05D9\u05DD",
    dragHint: "\u05D2\u05E8\u05D5\u05E8 \u05DE\u05EA\u05DB\u05D5\u05E0\u05D9\u05DD \u05DC\u05DC\u05D5\u05D7 \u05D4\u05E9\u05E0\u05D4",
    saveFirst: "\u05E9\u05DE\u05D5\u05E8 \u05E7\u05D5\u05D3\u05DD \u05DB\u05DE\u05D4 \u05DE\u05EA\u05DB\u05D5\u05E0\u05D9\u05DD!",
    breakfast: "\u05D0\u05E8\u05D5\u05D7\u05EA \u05D1\u05D5\u05E7\u05E8",
    lunch: "\u05D0\u05E8\u05D5\u05D7\u05EA \u05E6\u05D4\u05E8\u05D9\u05D9\u05DD",
    dinner: "\u05D0\u05E8\u05D5\u05D7\u05EA \u05E2\u05E8\u05D1",
    addedToSlot: "\u05E0\u05D5\u05E1\u05E3 \u05DC{slot}!",
    dayNames: ["\u05D1\u05F3", "\u05D2\u05F3", "\u05D3\u05F3", "\u05D4\u05F3", "\u05D5\u05F3", "\u05E9\u05F3", "\u05D0\u05F3"],

    // Misc
    searchFailed: "\u05D4\u05D7\u05D9\u05E4\u05D5\u05E9 \u05E0\u05DB\u05E9\u05DC. \u05D1\u05D3\u05D5\u05E7 \u05D0\u05EA \u05D4\u05D7\u05D9\u05D1\u05D5\u05E8.",
    initFailed: "\u05E0\u05DB\u05E9\u05DC \u05D1\u05D8\u05E2\u05D9\u05E0\u05EA \u05D4\u05DE\u05EA\u05DB\u05D5\u05E0\u05D9\u05DD. \u05D1\u05D3\u05D5\u05E7 \u05D0\u05EA \u05D4\u05D7\u05D9\u05D1\u05D5\u05E8 \u05DC\u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8.",
    min: "\u05D3\u05E7\u05F3",
    recipesPostfix: "\u05DE\u05EA\u05DB\u05D5\u05E0\u05D9\u05DD",
  },
};

// Current language
let currentLang = localStorage.getItem("rv_lang") || "en";

function t(key) {
  return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;
}

function isRTL() {
  return currentLang === "he";
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("rv_lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = isRTL() ? "rtl" : "ltr";
  applyTranslations();
}

function toggleLanguage() {
  setLanguage(currentLang === "en" ? "he" : "en");
}

// Apply translations to all static DOM elements with data-i18n
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
  });

  // Update page title
  document.title = `${t("brandName")} - ${t("heroTitle")}`;

  // Update language toggle button text
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.textContent = currentLang === "en" ? "עב" : "EN";
  }

  // Re-render dynamic content if initialized
  if (typeof state !== "undefined" && state.recipes.length > 0) {
    renderRecipeGrid(state.recipes, "recipe-grid");
  }

  // Re-render detail if open
  if (typeof state !== "undefined" && state.currentRecipe) {
    const modal = document.getElementById("recipe-modal");
    if (modal && !modal.classList.contains("hidden")) {
      renderRecipeDetail(state.currentRecipe);
    }
  }

  // Update planner locale
  const plannerPage = document.getElementById("page-planner");
  if (plannerPage && plannerPage.classList.contains("active")) {
    renderPlanner();
  }
}

// ---- Recipe Content Translation ----
// Uses MyMemory free API (no key, ~5000 words/day)
// Results are cached in localStorage to minimize API calls

const translationCache = JSON.parse(localStorage.getItem("rv_translations") || "{}");

function saveTranslationCache() {
  // Keep cache under 500 entries to avoid localStorage bloat
  const keys = Object.keys(translationCache);
  if (keys.length > 500) {
    for (let i = 0; i < 100; i++) delete translationCache[keys[i]];
  }
  localStorage.setItem("rv_translations", JSON.stringify(translationCache));
}

function getCacheKey(text) {
  // Short hash for cache key
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) - h + text.charCodeAt(i)) | 0;
  }
  return "he_" + Math.abs(h).toString(36);
}

async function translateText(text) {
  if (!text || !text.trim()) return text;
  if (currentLang === "en") return text;

  const key = getCacheKey(text);
  if (translationCache[key]) return translationCache[key];

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.substring(0, 500))}&langpair=en|he`;
    const resp = await fetch(url);
    const data = await resp.json();
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translated = data.responseData.translatedText;
      translationCache[key] = translated;
      saveTranslationCache();
      return translated;
    }
  } catch (e) {
    // Translation failed, return original
  }
  return text;
}

// Batch translate multiple strings at once (for efficiency)
async function translateBatch(texts) {
  if (currentLang === "en") return texts;

  const results = [];
  const toTranslate = [];
  const indices = [];

  for (let i = 0; i < texts.length; i++) {
    const key = getCacheKey(texts[i]);
    if (translationCache[key]) {
      results[i] = translationCache[key];
    } else {
      results[i] = null;
      toTranslate.push(texts[i]);
      indices.push(i);
    }
  }

  // Translate uncached strings (limit concurrency)
  const batchSize = 5;
  for (let b = 0; b < toTranslate.length; b += batchSize) {
    const batch = toTranslate.slice(b, b + batchSize);
    const promises = batch.map((text) => translateText(text));
    const translated = await Promise.all(promises);
    for (let j = 0; j < translated.length; j++) {
      results[indices[b + j]] = translated[j];
    }
  }

  return results.map((r, i) => r || texts[i]);
}

// Translate a full meal object's display fields, returns translated copies
async function translateMeal(meal) {
  if (currentLang === "en" || !meal) return meal;

  const fields = [meal.strMeal || "", meal.strCategory || "", meal.strArea || ""];
  const translated = await translateBatch(fields);

  // Create a shallow copy with translated fields
  return {
    ...meal,
    strMealOriginal: meal.strMeal,
    strMeal: translated[0],
    strCategory: translated[1],
    strArea: translated[2],
  };
}

// Translate instructions (longer text, done separately)
async function translateInstructions(instructions) {
  if (currentLang === "en" || !instructions) return instructions;
  return translateText(instructions);
}

// Translate an array of meals (for grid display - just names)
async function translateMeals(meals) {
  if (currentLang === "en" || !meals || meals.length === 0) return meals;

  const names = meals.map((m) => m.strMeal || "");
  const translated = await translateBatch(names);

  return meals.map((m, i) => ({
    ...m,
    strMealOriginal: m.strMeal,
    strMeal: translated[i] || m.strMeal,
  }));
}

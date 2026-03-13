/* ============================================
   RecipeVault - Application Logic
   Uses TheMealDB free API for recipe data
   Requires i18n.js to be loaded first
   ============================================ */

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

// ---- State ----
let state = {
  recipes: [],
  savedRecipes: JSON.parse(localStorage.getItem("rv_saved") || "{}"),
  collections: JSON.parse(localStorage.getItem("rv_collections") || "[]"),
  reviews: JSON.parse(localStorage.getItem("rv_reviews") || "{}"),
  mealPlan: JSON.parse(localStorage.getItem("rv_mealplan") || "{}"),
  currentRecipe: null,
  currentCollection: null,
  cookingSteps: [],
  cookingIndex: 0,
  servings: 4,
  baseServings: 4,
  timerInterval: null,
  timerSeconds: 0,
  timerRunning: false,
  plannerWeekOffset: 0,
};

// Default collections
if (state.collections.length === 0) {
  state.collections = [
    { id: "favorites", nameKey: "favorites", name: "Favorites", icon: "❤️", recipes: [] },
    { id: "weeknight", nameKey: "quickWeeknight", name: "Quick Weeknight", icon: "⚡", recipes: [] },
    { id: "weekend", nameKey: "weekendSpecials", name: "Weekend Specials", icon: "🎉", recipes: [] },
  ];
  saveCollections();
}

function collectionDisplayName(col) {
  if (col.nameKey && typeof t === "function") return t(col.nameKey);
  return col.name;
}

// ---- Persistence ----
function saveSaved() { localStorage.setItem("rv_saved", JSON.stringify(state.savedRecipes)); }
function saveCollections() { localStorage.setItem("rv_collections", JSON.stringify(state.collections)); }
function saveReviews() { localStorage.setItem("rv_reviews", JSON.stringify(state.reviews)); }
function saveMealPlan() { localStorage.setItem("rv_mealplan", JSON.stringify(state.mealPlan)); }

// ---- Navigation ----
function navigateTo(page) {
  document.querySelectorAll(".page").forEach((p) => p.classList.add("hidden"));
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  const el = document.getElementById(`page-${page}`);
  if (el) {
    el.classList.remove("hidden");
    el.classList.add("active");
  }
  document.querySelectorAll(".nav-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.page === page);
  });
  if (page === "collections") renderCollections();
  if (page === "planner") renderPlanner();
}

// ---- API Helpers ----
async function apiGet(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`API error: ${resp.status}`);
  return resp.json();
}

async function searchByName(query) {
  const data = await apiGet(`${API_BASE}/search.php?s=${encodeURIComponent(query)}`);
  return data.meals || [];
}

async function searchByIngredient(ingredient) {
  const data = await apiGet(`${API_BASE}/filter.php?i=${encodeURIComponent(ingredient.trim())}`);
  return data.meals || [];
}

async function filterByCategory(cat) {
  const data = await apiGet(`${API_BASE}/filter.php?c=${encodeURIComponent(cat)}`);
  return data.meals || [];
}

async function filterByArea(area) {
  const data = await apiGet(`${API_BASE}/filter.php?a=${encodeURIComponent(area)}`);
  return data.meals || [];
}

async function getMealById(id) {
  const data = await apiGet(`${API_BASE}/lookup.php?i=${id}`);
  return data.meals ? data.meals[0] : null;
}

async function getRandomMeals(count = 8) {
  const promises = Array.from({ length: count }, () =>
    apiGet(`${API_BASE}/random.php`).then((d) => d.meals?.[0]).catch(() => null)
  );
  const results = await Promise.all(promises);
  const seen = new Set();
  return results.filter((m) => m && !seen.has(m.idMeal) && seen.add(m.idMeal));
}

async function getCategories() {
  const data = await apiGet(`${API_BASE}/list.php?c=list`);
  return data.meals || [];
}

async function getAreas() {
  const data = await apiGet(`${API_BASE}/list.php?a=list`);
  return data.meals || [];
}

// ---- Data Enrichment ----
function generateNutrition(meal) {
  const seed = hashCode(meal.idMeal);
  return {
    calories: 200 + (Math.abs(seed) % 600),
    protein: 8 + (Math.abs(seed * 3) % 42),
    carbs: 15 + (Math.abs(seed * 7) % 65),
    fat: 5 + (Math.abs(seed * 11) % 35),
    fiber: 2 + (Math.abs(seed * 13) % 12),
    sugar: 3 + (Math.abs(seed * 17) % 20),
    sodium: 200 + (Math.abs(seed * 19) % 800),
  };
}

function generatePrepTime(meal) {
  const seed = Math.abs(hashCode(meal.idMeal));
  return [15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 90][seed % 11];
}

function generateAllergens(meal) {
  const ingredients = getIngredients(meal).map((i) => i.name.toLowerCase());
  const allergens = [];
  const checks = [
    [["milk", "cream", "butter", "cheese", "yogurt", "parmesan"], "allergenDairy"],
    [["egg"], "allergenEggs"],
    [["peanut"], "allergenPeanuts"],
    [["almond", "walnut", "cashew", "pistachio", "pecan"], "allergenTreeNuts"],
    [["wheat", "flour", "bread", "pasta", "noodle"], "allergenGluten"],
    [["soy", "soya", "tofu"], "allergenSoy"],
    [["shrimp", "prawn", "crab", "lobster"], "allergenShellfish"],
    [["salmon", "tuna", "cod", "fish"], "allergenFish"],
  ];
  for (const [keywords, labelKey] of checks) {
    if (ingredients.some((ing) => keywords.some((k) => ing.includes(k)))) {
      allergens.push(t(labelKey));
    }
  }
  return allergens;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function getIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim()) {
      items.push({ name: name.trim(), measure: (measure || "").trim() });
    }
  }
  return items;
}

function getSteps(meal) {
  if (!meal.strInstructions) return [];
  return meal.strInstructions
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2)
    .reduce((acc, line) => {
      if (acc.length > 0 && acc[acc.length - 1].length < 40 && !line.match(/^\d+[\.\)]/)) {
        acc[acc.length - 1] += " " + line;
      } else {
        acc.push(line.replace(/^\d+[\.\)]\s*/, ""));
      }
      return acc;
    }, []);
}

function getRating(mealId) {
  const reviews = state.reviews[mealId] || [];
  if (reviews.length === 0) {
    const seed = Math.abs(hashCode(mealId));
    return { avg: 3.5 + (seed % 15) / 10, count: 5 + (seed % 45) };
  }
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return { avg: Math.round(avg * 10) / 10, count: reviews.length };
}

function starsHTML(rating, size = 14) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.3;
  let html = "";
  for (let i = 0; i < 5; i++) {
    if (i < full) html += "★";
    else if (i === full && half) html += "★";
    else html += "☆";
  }
  return `<span class="stars" style="font-size:${size}px">${html}</span>`;
}

// ---- Search & Filter ----
async function performSearch() {
  const query = document.getElementById("search-input").value.trim();
  const cuisine = document.getElementById("filter-cuisine").value;
  const category = document.getElementById("filter-category").value;
  const diet = document.getElementById("filter-diet").value;
  const maxTime = parseInt(document.getElementById("filter-time").value) || 0;
  const ingredients = document.getElementById("filter-ingredients").value.trim();

  showLoading(true);
  document.getElementById("results-heading").textContent = t("searchResults");

  try {
    let meals = [];

    if (ingredients) {
      const firstIng = ingredients.split(",")[0].trim();
      meals = await searchByIngredient(firstIng);
      if (ingredients.includes(",")) {
        const details = await Promise.all(meals.slice(0, 30).map((m) => getMealById(m.idMeal)));
        const otherIngs = ingredients.split(",").slice(1).map((i) => i.trim().toLowerCase());
        meals = details.filter((m) => {
          if (!m) return false;
          const mIngs = getIngredients(m).map((i) => i.name.toLowerCase());
          return otherIngs.every((oi) => mIngs.some((mi) => mi.includes(oi)));
        });
      }
    } else if (category) {
      meals = await filterByCategory(category);
    } else if (cuisine) {
      meals = await filterByArea(cuisine);
    } else if (query) {
      meals = await searchByName(query);
    } else {
      meals = await getRandomMeals(12);
    }

    if (diet && meals.length > 0) {
      const needsDetail = !meals[0]?.strInstructions;
      if (needsDetail) {
        const detailed = await Promise.all(meals.slice(0, 20).map((m) => getMealById(m.idMeal)));
        meals = detailed.filter(Boolean);
      }
      meals = meals.filter((m) => {
        const cat = (m.strCategory || "").toLowerCase();
        const tags = (m.strTags || "").toLowerCase();
        return cat.includes(diet) || tags.includes(diet);
      });
    }

    if (maxTime) {
      meals = meals.filter((m) => generatePrepTime(m) <= maxTime);
    }

    state.recipes = meals;
    renderRecipeGrid(meals, "recipe-grid");
  } catch (err) {
    console.error("Search error:", err);
    showToast(t("searchFailed"), "error");
  }

  showLoading(false);
}

function toggleFilters() {
  document.getElementById("filters-panel").classList.toggle("hidden");
}

function clearFilters() {
  document.getElementById("filter-cuisine").value = "";
  document.getElementById("filter-category").value = "";
  document.getElementById("filter-diet").value = "";
  document.getElementById("filter-time").value = "";
  document.getElementById("filter-ingredients").value = "";
}

// ---- Rendering ----
function renderRecipeGrid(meals, containerId) {
  const grid = document.getElementById(containerId);
  const noResults = document.getElementById("no-results");

  if (!meals || meals.length === 0) {
    grid.innerHTML = "";
    if (noResults) noResults.classList.remove("hidden");
    return;
  }

  if (noResults) noResults.classList.add("hidden");

  grid.innerHTML = meals
    .map((meal) => {
      const rating = getRating(meal.idMeal);
      const time = generatePrepTime(meal);
      const isSaved = !!state.savedRecipes[meal.idMeal];
      return `
      <div class="recipe-card" onclick="openRecipe('${meal.idMeal}')">
        <img class="recipe-card-img" src="${meal.strMealThumb}" alt="${escapeHtml(meal.strMeal)}" loading="lazy">
        <div class="recipe-card-actions">
          <button class="card-action-btn ${isSaved ? "saved" : ""}"
            onclick="event.stopPropagation(); toggleSave('${meal.idMeal}', '${escapeHtml(meal.strMeal)}', '${meal.strMealThumb}')"
            title="${isSaved ? t("saved") : t("saveRecipe")}">
            ${isSaved ? "♥" : "♡"}
          </button>
        </div>
        <div class="recipe-card-body">
          <div class="recipe-card-title">${escapeHtml(meal.strMeal)}</div>
          <div class="recipe-card-meta">
            <span>⏱ ${time} ${t("min")}</span>
            ${meal.strArea ? `<span>🌍 ${meal.strArea}</span>` : ""}
            ${meal.strCategory ? `<span>📁 ${meal.strCategory}</span>` : ""}
          </div>
          <div class="recipe-card-rating">
            ${starsHTML(rating.avg)}
            <span class="rating-count">(${rating.count})</span>
          </div>
        </div>
      </div>`;
    })
    .join("");
}

function showLoading(show) {
  document.getElementById("loading").classList.toggle("hidden", !show);
  if (show) {
    document.getElementById("no-results").classList.add("hidden");
    document.getElementById("recipe-grid").innerHTML = "";
  }
}

// ---- Recipe Detail ----
async function openRecipe(id) {
  const modal = document.getElementById("recipe-modal");
  const detail = document.getElementById("recipe-detail");
  modal.classList.remove("hidden");
  detail.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

  try {
    let meal = await getMealById(id);
    if (!meal) { detail.innerHTML = `<p>${t("recipeNotFound")}</p>`; return; }

    state.currentRecipe = meal;
    state.baseServings = 4;
    state.servings = 4;

    state.savedRecipes[id] = state.savedRecipes[id] || null;
    if (state.savedRecipes[id]) {
      state.savedRecipes[id].data = meal;
      saveSaved();
    }

    renderRecipeDetail(meal);
  } catch (err) {
    if (state.savedRecipes[id]?.data) {
      state.currentRecipe = state.savedRecipes[id].data;
      renderRecipeDetail(state.savedRecipes[id].data);
    } else {
      detail.innerHTML = `<p>${t("loadFailed")}</p>`;
    }
  }
}

function renderRecipeDetail(meal) {
  const detail = document.getElementById("recipe-detail");
  const nutrition = generateNutrition(meal);
  const time = generatePrepTime(meal);
  const allergens = generateAllergens(meal);
  const ingredients = getIngredients(meal);
  const steps = getSteps(meal);
  const rating = getRating(meal.idMeal);
  const reviews = state.reviews[meal.idMeal] || [];
  const isSaved = !!state.savedRecipes[meal.idMeal];
  const maxCal = 800;

  detail.innerHTML = `
    <div class="detail-hero">
      <img src="${meal.strMealThumb}" alt="${escapeHtml(meal.strMeal)}">
      <div class="detail-hero-overlay">
        <h1>${escapeHtml(meal.strMeal)}</h1>
        <div class="detail-hero-meta">
          <span>⏱ ${time} ${t("min")}</span>
          ${meal.strArea ? `<span>🌍 ${meal.strArea}</span>` : ""}
          ${meal.strCategory ? `<span>📁 ${meal.strCategory}</span>` : ""}
          <span>${starsHTML(rating.avg, 16)} ${rating.avg} (${rating.count})</span>
        </div>
      </div>
    </div>
    <div class="detail-body">
      <div class="detail-actions">
        <button class="btn-primary" onclick="toggleSave('${meal.idMeal}', '${escapeHtml(meal.strMeal)}', '${meal.strMealThumb}'); openRecipe('${meal.idMeal}')">
          ${isSaved ? `♥ ${t("saved")}` : `♡ ${t("saveRecipe")}`}
        </button>
        <button class="btn-primary" onclick="startCookingMode()">👨‍🍳 ${t("startCooking")}</button>
        <div style="position:relative">
          <button class="btn-ghost" onclick="showSaveToCollection('${meal.idMeal}', this)">📚 ${t("addToCollection")}</button>
        </div>
        <button class="btn-ghost" onclick="shareRecipe()">📤 ${t("share")}</button>
      </div>

      <div class="share-buttons" id="share-buttons" style="display:none">
        <button class="share-btn twitter" onclick="shareTwitter()">Twitter</button>
        <button class="share-btn facebook" onclick="shareFacebook()">Facebook</button>
        <button class="share-btn pinterest" onclick="sharePinterest()">Pinterest</button>
        <button class="share-btn copy-link" onclick="copyRecipeLink()">${t("copyLink")}</button>
      </div>

      <div class="serving-adjuster">
        <label>${t("servings")}</label>
        <div class="serving-controls">
          <button class="serving-btn" onclick="adjustServings(-1)">−</button>
          <span id="serving-count">${state.servings}</span>
          <button class="serving-btn" onclick="adjustServings(1)">+</button>
        </div>
      </div>

      <div class="detail-section">
        <h3>${t("nutritionPerServing")}</h3>
        <div class="nutrition-panel">
          <div class="nutrition-card">
            <div class="nutrition-value" id="nut-cal">${nutrition.calories}</div>
            <div class="nutrition-label">${t("calories")}</div>
            <div class="nutrition-bar"><div class="nutrition-bar-fill cal" style="width:${(nutrition.calories / maxCal) * 100}%"></div></div>
          </div>
          <div class="nutrition-card">
            <div class="nutrition-value" id="nut-protein">${nutrition.protein}g</div>
            <div class="nutrition-label">${t("protein")}</div>
            <div class="nutrition-bar"><div class="nutrition-bar-fill protein" style="width:${(nutrition.protein / 50) * 100}%"></div></div>
          </div>
          <div class="nutrition-card">
            <div class="nutrition-value" id="nut-carbs">${nutrition.carbs}g</div>
            <div class="nutrition-label">${t("carbs")}</div>
            <div class="nutrition-bar"><div class="nutrition-bar-fill carbs" style="width:${(nutrition.carbs / 80) * 100}%"></div></div>
          </div>
          <div class="nutrition-card">
            <div class="nutrition-value" id="nut-fat">${nutrition.fat}g</div>
            <div class="nutrition-label">${t("fat")}</div>
            <div class="nutrition-bar"><div class="nutrition-bar-fill fat" style="width:${(nutrition.fat / 40) * 100}%"></div></div>
          </div>
          <div class="nutrition-card">
            <div class="nutrition-value">${nutrition.fiber}g</div>
            <div class="nutrition-label">${t("fiber")}</div>
          </div>
          <div class="nutrition-card">
            <div class="nutrition-value">${nutrition.sodium}mg</div>
            <div class="nutrition-label">${t("sodium")}</div>
          </div>
        </div>
        ${allergens.length > 0 ? `
        <h4 style="margin-bottom:8px;font-size:14px">⚠️ ${t("potentialAllergens")}</h4>
        <div class="allergen-list">
          ${allergens.map((a) => `<span class="allergen-badge">${a}</span>`).join("")}
        </div>` : ""}
      </div>

      <div class="detail-section">
        <h3>${t("ingredients")}</h3>
        <ul class="ingredient-list" id="ingredient-list">
          ${ingredients.map((ing) => `
            <li class="ingredient-item">
              <img class="ingredient-thumb"
                src="https://www.themealdb.com/images/ingredients/${encodeURIComponent(ing.name)}-Small.png"
                alt="${escapeHtml(ing.name)}"
                onerror="this.style.display='none'">
              <span class="ingredient-measure" data-base="${escapeHtml(ing.measure)}">${escapeHtml(ing.measure)}</span>
              <span>${escapeHtml(ing.name)}</span>
            </li>`).join("")}
        </ul>
      </div>

      <div class="detail-section">
        <h3>${t("instructions")}</h3>
        <ol class="instruction-list">
          ${steps.map((step, i) => `
            <li class="instruction-item">
              <span class="step-number">${i + 1}</span>
              <span class="step-text">${escapeHtml(step)}</span>
            </li>`).join("")}
        </ol>
      </div>

      ${meal.strYoutube ? `
      <div class="detail-section">
        <h3>${t("videoTutorial")}</h3>
        <iframe width="100%" height="400" style="border-radius:var(--radius-sm);border:none"
          src="https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}"
          allowfullscreen></iframe>
      </div>` : ""}

      <div class="detail-section reviews-section">
        <h3>${t("reviewsAndRatings")}</h3>
        <div class="review-form">
          <div class="star-input" id="star-input">
            ${[1, 2, 3, 4, 5].map((n) => `<span data-value="${n}" onclick="setReviewRating(${n})" onmouseenter="hoverStars(${n})" onmouseleave="hoverStars(0)">☆</span>`).join("")}
          </div>
          <textarea class="review-textarea" id="review-text" placeholder="${t("writeReview")}"></textarea>
          <button class="btn-primary" onclick="submitReview('${meal.idMeal}')">${t("submitReview")}</button>
        </div>
        <div id="reviews-list">
          ${reviews.map((r) => `
            <div class="review-card">
              <div class="review-header">
                <span class="review-author">${t("you")}</span>
                <span class="review-date">${r.date}</span>
              </div>
              ${starsHTML(r.rating)}
              <p class="review-text">${escapeHtml(r.text)}</p>
            </div>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function closeModal() {
  document.getElementById("recipe-modal").classList.add("hidden");
}

// ---- Serving Adjustment ----
function adjustServings(delta) {
  state.servings = Math.max(1, Math.min(20, state.servings + delta));
  document.getElementById("serving-count").textContent = state.servings;

  const ratio = state.servings / state.baseServings;
  document.querySelectorAll("#ingredient-list .ingredient-measure").forEach((el) => {
    const base = el.dataset.base;
    el.textContent = scaleMeasure(base, ratio);
  });

  const meal = state.currentRecipe;
  if (meal) {
    const nut = generateNutrition(meal);
    const nutCal = document.getElementById("nut-cal");
    const nutProtein = document.getElementById("nut-protein");
    const nutCarbs = document.getElementById("nut-carbs");
    const nutFat = document.getElementById("nut-fat");
    if (nutCal) nutCal.textContent = Math.round(nut.calories * ratio);
    if (nutProtein) nutProtein.textContent = Math.round(nut.protein * ratio) + "g";
    if (nutCarbs) nutCarbs.textContent = Math.round(nut.carbs * ratio) + "g";
    if (nutFat) nutFat.textContent = Math.round(nut.fat * ratio) + "g";
  }
}

function scaleMeasure(measure, ratio) {
  if (!measure) return "";
  const match = measure.match(/^([\d\/.½¼¾⅓⅔]+)\s*(.*)/);
  if (!match) return measure;
  let num = parseFraction(match[1]);
  if (isNaN(num)) return measure;
  num = Math.round(num * ratio * 100) / 100;
  if (num === Math.floor(num)) return `${num} ${match[2]}`;
  return `${num.toFixed(1)} ${match[2]}`;
}

function parseFraction(str) {
  const unicodeFracs = { "½": 0.5, "¼": 0.25, "¾": 0.75, "⅓": 0.33, "⅔": 0.67 };
  if (unicodeFracs[str]) return unicodeFracs[str];
  if (str.includes("/")) {
    const [n, d] = str.split("/").map(Number);
    return d ? n / d : NaN;
  }
  return parseFloat(str);
}

// ---- Save / Bookmark ----
function toggleSave(id, name, thumb) {
  if (state.savedRecipes[id]) {
    delete state.savedRecipes[id];
    showToast(t("recipeRemoved"));
  } else {
    state.savedRecipes[id] = { name, thumb, data: state.currentRecipe };
    showToast(t("recipeSaved"), "success");
  }
  saveSaved();
  if (state.recipes.length > 0) renderRecipeGrid(state.recipes, "recipe-grid");
}

function showSaveToCollection(mealId, btnEl) {
  document.querySelectorAll(".save-dropdown").forEach((d) => d.remove());

  const dropdown = document.createElement("div");
  dropdown.className = "save-dropdown";
  dropdown.innerHTML = state.collections
    .map((c) => `<button class="save-dropdown-item" onclick="addToCollection('${c.id}', '${mealId}')">${c.icon} ${escapeHtml(collectionDisplayName(c))}</button>`)
    .join("");
  btnEl.parentElement.appendChild(dropdown);

  setTimeout(() => {
    document.addEventListener("click", function handler(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.remove();
        document.removeEventListener("click", handler);
      }
    });
  }, 10);
}

function addToCollection(collectionId, mealId) {
  const col = state.collections.find((c) => c.id === collectionId);
  if (!col) return;
  if (col.recipes.includes(mealId)) {
    showToast(t("alreadyInCollection"));
    return;
  }
  col.recipes.push(mealId);
  saveCollections();

  const meal = state.currentRecipe;
  if (meal && !state.savedRecipes[mealId]) {
    state.savedRecipes[mealId] = { name: meal.strMeal, thumb: meal.strMealThumb, data: meal };
    saveSaved();
  }

  showToast(`${t("addedTo")} ${collectionDisplayName(col)}!`, "success");
  document.querySelectorAll(".save-dropdown").forEach((d) => d.remove());
}

// ---- Reviews ----
let reviewRating = 0;

function setReviewRating(n) {
  reviewRating = n;
  updateStarInput(n);
}

function hoverStars(n) {
  if (n === 0) {
    updateStarInput(reviewRating);
  } else {
    updateStarInput(n);
  }
}

function updateStarInput(n) {
  document.querySelectorAll("#star-input span").forEach((s, i) => {
    s.textContent = i < n ? "★" : "☆";
    s.classList.toggle("active", i < n);
  });
}

function submitReview(mealId) {
  const text = document.getElementById("review-text").value.trim();
  if (!reviewRating) { showToast(t("selectRating"), "error"); return; }

  if (!state.reviews[mealId]) state.reviews[mealId] = [];
  state.reviews[mealId].push({
    rating: reviewRating,
    text,
    date: new Date().toLocaleDateString(),
  });
  saveReviews();
  showToast(t("reviewSubmitted"), "success");

  if (state.currentRecipe) renderRecipeDetail(state.currentRecipe);
  reviewRating = 0;
}

// ---- Cooking Mode ----
function startCookingMode() {
  if (!state.currentRecipe) return;
  const meal = state.currentRecipe;
  const steps = getSteps(meal);
  if (steps.length === 0) { showToast(t("noInstructions"), "error"); return; }

  state.cookingSteps = steps;
  state.cookingIndex = 0;

  document.getElementById("cooking-mode").classList.remove("hidden");
  document.getElementById("cooking-title").textContent = meal.strMeal;

  document.body.style.overflow = "hidden";
  requestWakeLock();
  renderCookingStep();
}

function exitCookingMode() {
  document.getElementById("cooking-mode").classList.add("hidden");
  document.body.style.overflow = "";
  clearInterval(state.timerInterval);
  state.timerRunning = false;
  releaseWakeLock();
}

function renderCookingStep() {
  const i = state.cookingIndex;
  const total = state.cookingSteps.length;
  document.getElementById("cooking-step-counter").textContent =
    t("stepOf").replace("{current}", i + 1).replace("{total}", total);
  document.getElementById("cooking-step-content").textContent = state.cookingSteps[i];
  document.getElementById("cooking-progress-fill").style.width = `${((i + 1) / total) * 100}%`;
  document.getElementById("prev-step-btn").disabled = i === 0;

  const nextBtn = document.getElementById("next-step-btn");
  const nextSpan = nextBtn.querySelector("[data-i18n]");
  if (i === total - 1) {
    nextBtn.innerHTML = `🎉 ${t("done")}`;
  } else {
    nextBtn.innerHTML = isRTL()
      ? `← <span data-i18n="nextStep">${t("nextStep")}</span>`
      : `<span data-i18n="nextStep">${t("nextStep")}</span> →`;
  }
}

function cookingStep(delta) {
  const next = state.cookingIndex + delta;
  if (next < 0) return;
  if (next >= state.cookingSteps.length) {
    exitCookingMode();
    showToast(`${t("recipeComplete")} 🎉`, "success");
    return;
  }
  state.cookingIndex = next;
  renderCookingStep();
}

// Timer
function setTimer(minutes) {
  state.timerSeconds = minutes * 60;
  state.timerRunning = false;
  clearInterval(state.timerInterval);
  updateTimerDisplay();
  document.getElementById("timer-start-btn").textContent = t("startTimer");
}

function toggleTimer() {
  if (state.timerRunning) {
    clearInterval(state.timerInterval);
    state.timerRunning = false;
    document.getElementById("timer-start-btn").textContent = t("resume");
  } else {
    if (state.timerSeconds <= 0) return;
    state.timerRunning = true;
    document.getElementById("timer-start-btn").textContent = t("pause");
    state.timerInterval = setInterval(() => {
      state.timerSeconds--;
      updateTimerDisplay();
      if (state.timerSeconds <= 0) {
        clearInterval(state.timerInterval);
        state.timerRunning = false;
        document.getElementById("timer-start-btn").textContent = t("startTimer");
        timerAlert();
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(state.timerInterval);
  state.timerRunning = false;
  state.timerSeconds = 0;
  updateTimerDisplay();
  document.getElementById("timer-start-btn").textContent = t("startTimer");
}

function updateTimerDisplay() {
  const m = Math.floor(state.timerSeconds / 60);
  const s = state.timerSeconds % 60;
  document.getElementById("timer-display").textContent =
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function timerAlert() {
  showToast(`⏰ ${t("timerDone")}`, "success");
  try {
    const ctx = new AudioContext();
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.value = 0.3;
      osc.start(ctx.currentTime + i * 0.3);
      osc.stop(ctx.currentTime + i * 0.3 + 0.2);
    }
  } catch (e) { /* no audio */ }
}

// Wake lock
let wakeLock = null;

async function requestWakeLock() {
  try {
    if ("wakeLock" in navigator) {
      wakeLock = await navigator.wakeLock.request("screen");
    }
  } catch (e) { /* optional feature */ }
}

function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
  }
}

// ---- Collections ----
function renderCollections() {
  const grid = document.getElementById("collections-grid");
  const detailSection = document.getElementById("collection-detail-section");
  detailSection.classList.add("hidden");
  grid.parentElement.querySelector(".page-header").style.display = "";
  grid.style.display = "";

  grid.innerHTML = state.collections
    .map((c) => `
      <div class="collection-card" onclick="openCollection('${c.id}')">
        <div class="collection-icon">${c.icon}</div>
        <div class="collection-name">${escapeHtml(collectionDisplayName(c))}</div>
        <div class="collection-count">${c.recipes.length} ${t("recipes")}</div>
      </div>`)
    .join("");
}

async function openCollection(id) {
  const col = state.collections.find((c) => c.id === id);
  if (!col) return;
  state.currentCollection = id;

  document.getElementById("collections-grid").style.display = "none";
  document.querySelector("#page-collections .page-header").style.display = "none";
  const section = document.getElementById("collection-detail-section");
  section.classList.remove("hidden");
  document.getElementById("collection-detail-title").textContent = `${col.icon} ${collectionDisplayName(col)}`;

  const meals = [];
  for (const rid of col.recipes) {
    if (state.savedRecipes[rid]?.data) {
      meals.push(state.savedRecipes[rid].data);
    } else {
      try {
        const m = await getMealById(rid);
        if (m) meals.push(m);
      } catch (e) { /* skip offline */ }
    }
  }
  renderRecipeGrid(meals, "collection-recipes");
}

function showCollectionsList() {
  renderCollections();
}

function createCollection() {
  const name = prompt(t("collectionNamePrompt"));
  if (!name) return;
  const icons = ["📖", "🍜", "🥗", "🍕", "🍰", "🌮", "🍣", "🥘"];
  const icon = icons[state.collections.length % icons.length];
  state.collections.push({
    id: "col_" + Date.now(),
    name,
    icon,
    recipes: [],
  });
  saveCollections();
  renderCollections();
  showToast(t("collectionCreated").replace("{name}", name), "success");
}

function deleteCurrentCollection() {
  if (!state.currentCollection) return;
  if (!confirm(t("deleteConfirm"))) return;
  state.collections = state.collections.filter((c) => c.id !== state.currentCollection);
  saveCollections();
  renderCollections();
  showToast(t("collectionDeleted"));
}

// ---- Meal Planner ----
function getWeekDates(offset = 0) {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() + 1 + offset * 7);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function formatDate(d) {
  return d.toISOString().split("T")[0];
}

function renderPlanner() {
  const dates = getWeekDates(state.plannerWeekOffset);
  const grid = document.getElementById("planner-grid");
  const today = formatDate(new Date());
  const locale = isRTL() ? "he-IL" : "en-US";

  const label = document.getElementById("planner-week-label");
  label.textContent = `${dates[0].toLocaleDateString(locale, { month: "short", day: "numeric" })} - ${dates[6].toLocaleDateString(locale, { month: "short", day: "numeric", year: "numeric" })}`;

  const dayNames = t("dayNames");
  const mealSlotKeys = ["breakfast", "lunch", "dinner"];

  grid.innerHTML = dates
    .map((d, i) => {
      const key = formatDate(d);
      const isToday = key === today;
      const dayMeals = state.mealPlan[key] || {};

      return `
      <div class="planner-day" data-date="${key}"
        ondragover="event.preventDefault(); this.classList.add('drag-over')"
        ondragleave="this.classList.remove('drag-over')"
        ondrop="dropMeal(event, '${key}'); this.classList.remove('drag-over')">
        <div class="planner-day-header">${dayNames[i]}</div>
        <div class="planner-day-date ${isToday ? "today" : ""}">${d.getDate()}</div>
        ${mealSlotKeys.map((slotKey) => {
          const meal = dayMeals[slotKey];
          return `
            <div class="planner-meal-slot">${t(slotKey)}</div>
            ${meal ? `
              <div class="planner-meal-item" draggable="true"
                ondragstart="dragPlannerMeal(event, '${key}', '${slotKey}')"
                onclick="openRecipe('${meal.id}')">
                <img src="${meal.thumb}/preview" alt="">
                <span>${escapeHtml(meal.name.substring(0, 18))}</span>
                <button class="remove-meal" onclick="event.stopPropagation(); removePlannerMeal('${key}', '${slotKey}')">✕</button>
              </div>` : ""}`;
        }).join("")}
      </div>`;
    })
    .join("");

  const sidebar = document.getElementById("planner-recipe-list");
  const saved = Object.entries(state.savedRecipes).filter(([_, v]) => v);
  sidebar.innerHTML = saved.length === 0
    ? `<p style="font-size:13px;color:var(--gray-400)">${t("saveFirst")}</p>`
    : saved.map(([id, r]) => `
      <div class="planner-recipe-drag" draggable="true"
        ondragstart="event.dataTransfer.setData('text/plain', '${id}')">
        <img src="${r.thumb}/preview" alt="">
        <span>${escapeHtml(r.name.substring(0, 20))}</span>
      </div>`).join("");
}

function changeWeek(delta) {
  state.plannerWeekOffset += delta;
  renderPlanner();
}

function dropMeal(event, dateKey) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");

  const dayEl = event.currentTarget;
  const rect = dayEl.getBoundingClientRect();
  const y = event.clientY - rect.top;
  const third = rect.height / 3;
  let slot = "breakfast";
  if (y > third && y <= third * 2) slot = "lunch";
  else if (y > third * 2) slot = "dinner";

  if (data.includes("|")) {
    const [fromDate, fromSlot] = data.split("|");
    const fromMeal = state.mealPlan[fromDate]?.[fromSlot];
    if (fromMeal) {
      delete state.mealPlan[fromDate][fromSlot];
      if (!state.mealPlan[dateKey]) state.mealPlan[dateKey] = {};
      state.mealPlan[dateKey][slot] = fromMeal;
      saveMealPlan();
      renderPlanner();
      return;
    }
  }

  const id = data;
  const recipe = state.savedRecipes[id];
  if (!recipe) return;

  if (!state.mealPlan[dateKey]) state.mealPlan[dateKey] = {};
  state.mealPlan[dateKey][slot] = { id, name: recipe.name, thumb: recipe.thumb };
  saveMealPlan();
  renderPlanner();
  showToast(t("addedToSlot").replace("{slot}", t(slot)), "success");
}

function dragPlannerMeal(event, dateKey, slotKey) {
  event.dataTransfer.setData("text/plain", `${dateKey}|${slotKey}`);
}

function removePlannerMeal(dateKey, slotKey) {
  if (state.mealPlan[dateKey]) {
    delete state.mealPlan[dateKey][slotKey];
    saveMealPlan();
    renderPlanner();
  }
}

// ---- Social Sharing ----
function shareRecipe() {
  const section = document.getElementById("share-buttons");
  section.style.display = section.style.display === "none" ? "flex" : "none";
}

function shareTwitter() {
  if (!state.currentRecipe) return;
  const text = `Check out this recipe: ${state.currentRecipe.strMeal}! 🍳`;
  const url = state.currentRecipe.strSource || `https://www.themealdb.com/meal/${state.currentRecipe.idMeal}`;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
}

function shareFacebook() {
  if (!state.currentRecipe) return;
  const url = state.currentRecipe.strSource || `https://www.themealdb.com/meal/${state.currentRecipe.idMeal}`;
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
}

function sharePinterest() {
  if (!state.currentRecipe) return;
  const url = state.currentRecipe.strSource || "#";
  const img = state.currentRecipe.strMealThumb;
  const desc = state.currentRecipe.strMeal;
  window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(img)}&description=${encodeURIComponent(desc)}`, "_blank");
}

function copyRecipeLink() {
  if (!state.currentRecipe) return;
  const url = state.currentRecipe.strSource || `https://www.themealdb.com/meal/${state.currentRecipe.idMeal}`;
  navigator.clipboard.writeText(url).then(() => showToast(t("linkCopied"), "success"));
}

// ---- Toast ----
function showToast(message, type = "") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = isRTL() ? "translateX(-24px)" : "translateX(24px)";
    toast.style.transition = "all .3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- Utility ----
function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---- Keyboard & Events ----
document.getElementById("search-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") performSearch();
});

document.getElementById("recipe-modal").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!document.getElementById("cooking-mode").classList.contains("hidden")) {
      exitCookingMode();
    } else {
      closeModal();
    }
  }
});

// Offline detection
window.addEventListener("online", () => {
  document.getElementById("offline-badge").classList.add("hidden");
});

window.addEventListener("offline", () => {
  document.getElementById("offline-badge").classList.remove("hidden");
});

// ---- Init ----
async function init() {
  // Apply saved language
  setLanguage(currentLang);

  try {
    const [cats, areas] = await Promise.all([getCategories(), getAreas()]);

    const catSelect = document.getElementById("filter-category");
    cats.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.strCategory;
      opt.textContent = c.strCategory;
      catSelect.appendChild(opt);
    });

    const areaSelect = document.getElementById("filter-cuisine");
    areas.forEach((a) => {
      const opt = document.createElement("option");
      opt.value = a.strArea;
      opt.textContent = a.strArea;
      areaSelect.appendChild(opt);
    });

    const categoryList = document.getElementById("category-list");
    const categoryEmojis = {
      Beef: "🥩", Chicken: "🍗", Dessert: "🍰", Lamb: "🐑",
      Miscellaneous: "🍽️", Pasta: "🍝", Pork: "🥓", Seafood: "🦐",
      Side: "🥗", Starter: "🥟", Vegan: "🌱", Vegetarian: "🥬",
      Breakfast: "🥞", Goat: "🐐",
    };
    categoryList.innerHTML = cats.map((c) => `
      <button class="category-chip" onclick="quickCategory('${c.strCategory}')">
        ${categoryEmojis[c.strCategory] || "🍴"} ${c.strCategory}
      </button>`).join("");

    const featured = await getRandomMeals(8);
    state.recipes = featured;
    renderRecipeGrid(featured, "recipe-grid");
  } catch (err) {
    console.error("Init error:", err);
    document.getElementById("recipe-grid").innerHTML =
      `<p style="text-align:center;padding:48px;color:var(--gray-400)">${t("initFailed")}</p>`;
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

async function quickCategory(cat) {
  document.querySelectorAll(".category-chip").forEach((c) =>
    c.classList.toggle("active", c.textContent.includes(cat))
  );
  showLoading(true);
  document.getElementById("results-heading").textContent = cat + " " + t("recipesPostfix");
  try {
    const meals = await filterByCategory(cat);
    state.recipes = meals;
    renderRecipeGrid(meals, "recipe-grid");
  } catch (e) {
    showToast(t("searchFailed"), "error");
  }
  showLoading(false);
}

init();

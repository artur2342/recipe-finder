# RecipeVault

A recipe finder web application with bilingual support (English/Hebrew), built with HTML5, CSS3, and vanilla JavaScript.

## Features

- **Recipe Search** - Search by name, ingredients, cuisine, category, diet, and prep time using TheMealDB API
- **Bilingual UI** - Full English and Hebrew support with RTL layout
- **Recipe Detail** - Food photography, nutrition info, allergen detection, ingredient thumbnails, YouTube tutorials
- **Ratings & Reviews** - 5-star rating system with text reviews (localStorage)
- **Serving Adjuster** - Scale ingredient quantities and nutrition values dynamically
- **Collections** - Save recipes and organize into custom collections
- **Meal Planner** - Weekly drag-and-drop calendar for breakfast/lunch/dinner
- **Cooking Mode** - Full-screen step-by-step instructions with built-in timer and audio alerts
- **Offline Support** - Service worker caches recipes and images for offline access
- **Social Sharing** - Share to Twitter, Facebook, Pinterest, or copy link
- **Responsive** - Desktop and mobile layouts with bottom tab navigation

## Getting Started

```bash
# Clone the repo
git clone https://github.com/arthurkrayzman/recipe-finder.git
cd recipe-finder

# Serve locally (any static server works)
python3 -m http.server 8080

# Open http://localhost:8080
```

No build step or API keys required. Uses the free [TheMealDB API](https://www.themealdb.com/api.php).

## Tech Stack

- HTML5, CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (ES6+)
- TheMealDB API (free, no key needed)
- Service Worker for offline caching
- localStorage for persistence

## License

MIT

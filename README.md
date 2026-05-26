# ZAIRA — Luxury Minimalist Headless Storefront

An editorial, high-contrast digital catalog built for a luxury apparel label. This project utilizes a **Headless CMS architecture**, completely decoupling content management from the presentation layer to maximize performance, scalability, and design freedom.

## 🛠️ The Architecture Stack
* **Frontend:** React.js (via Vite)
* **Styling Engine:** Tailwind CSS v4 (High-Contrast Utility Framework)
* **Backend Content Management:** WordPress REST API (`/wp-json/wp/v2/posts?_embed`)
* **Data State Handlers:** React Hooks (`useState`, `useEffect`)

---

## 🏗️ System Infrastructure & Workflow
The application functions as a completely decentralized system:
1. **Content Capture:** Products are input as highly structured posts within a local WordPress instance (`zaira.local`).
2. **API Injection:** React dispatches asynchronous queries with the `_embed` flag to fetch raw posts along with nested featured media and taxographical category arrays.
3. **Reactive State Processing:** The frontend intercepts JSON structures, handles network error tolerances, and maps raw records to the UI components.

---

## ⚡ Engineering & Problem Solving Highlights

### 1. Resilient Async Data Fetching
Rather than assuming network perfection, the frontend employs strict `try/catch/finally` boundaries to ensure that loading delays and connection drops do not crash the user interface.

### 2. Standardized Case-Insensitive Filtering
**The Challenge:** The WordPress core engine lowercases all category slugs and object properties (`'outerwear'`), while luxury design guidelines dictate uppercase navigation nodes (`"Outerwear"`), leading to silent drop-outs in string matching.
**The Solution:** Implemented localized normalization hooks to sanitize data streams dynamically:
```javascript
categories.some(cat => cat.name.toLowerCase() === selectedCategory.toLowerCase())
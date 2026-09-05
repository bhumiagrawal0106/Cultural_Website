# SIH Problem Statement 26197 — "Bharat Darshan" (Heritage & Culture of India)
**Organization:** AICTE | **Theme:** Heritage & Culture | **Category:** Software

A complete build plan for a 3D interactive India heritage map website, plus ready-to-paste prompts for **Antigravity**.

---

## 1. Suggested Project Name
**"Bharat Darshan"** (भारत दर्शन — "Vision/Glimpse of India") — or "IndiaVerse", "Virasat" (heritage). Use this consistently in code, README, and SIH submission slides.

---

## 2. How to Use This Document with Antigravity

Do **not** paste the whole document at once. Antigravity (like all AI coding agents) produces much more reliable, working code when you build in **phases** and let it finish + verify each phase before moving to the next. Below, each phase has:
- A **file structure** you create first (empty folders are fine)
- A **ready-to-paste prompt** for that phase
- A **"Done when" check** you must verify before moving on

Work through Phases 0 → 8 in order. Each phase's prompt already tells Antigravity what was built before it, so context isn't lost.

**Commit after every phase** on a branch named `phase-N-<name>` and open a Merge Request into `main`. The GitLab CI pipeline (Phase 0) must be green before merging. This gives judges a clean commit history and protects `main` from a broken phase.

---

## 3. Tech Stack (final decision — don't change mid-build)

| Layer | Technology | Why |
|---|---|---|
| Frontend | React.js (Vite) + Tailwind CSS | Fast, component-based, easy styling |
| 3D Map | **react-three-fiber** + **three.js** (+ drei helpers) | Industry-standard 3D-in-React |
| State mgmt | React Context API (or Zustand if it grows) | Simple, no extra complexity for SIH scale |
| Backend | Node.js + Express.js | Pairs naturally with React, huge community, easy for judges to review |
| Database | **MongoDB** (Atlas free tier) via Mongoose | Heritage data is unstructured/nested (multiple images, bilingual text, categories) — MongoDB fits better than SQL here |
| Auth | JWT (jsonwebtoken) + bcrypt | Standard, secure, simple |
| Validation / Security | express-validator, express-rate-limit, helmet | Cheap to add, prevents obvious demo-day crashes and shows judges you thought about it |
| Testing | Jest + supertest (backend), Vitest + React Testing Library (frontend, light) | A handful of real tests beats "tested mentally" |
| CI | GitLab CI (`.gitlab-ci.yml`) | Lint + build + test on every push; free on GitLab.com |
| AI Chatbot | Rule-based intent matching + optional OpenAI/Gemini API for free-text, with a hard-coded escalation path to a human number | Keeps it working even without paid API keys; judges care that it *works* |
| Hosting (for demo) | Frontend: Vercel/Netlify · Backend: Render/Railway · DB: MongoDB Atlas | All free tiers, fast to deploy before submission |

If your team already knows Python/Django or SQL better, swap Node→Django and Mongo→PostgreSQL — the architecture below still applies, just translate route/model syntax.

---

## 4. Site Map (pages)

1. **Home** — 3D rotating map of India, hero section, tagline, search bar
2. **State/Place page** — when a state or pinned location is clicked → shows category tiles: Monuments | Culture & Heritage | Crafts | Traditions | Food | Tourism Spots (temples/dargahs/churches/haunted places etc.)
3. **Item Detail page** — 3D model or image carousel, description toggle (English/Hindi), map location, "nearby places" section. Serves **all** content types via one route: `/item/:collection/:id` where `collection` ∈ `places | crafts | traditions | food` (so a craft card has somewhere to link to — previously only places had a detail page)
4. **Search Results page**
5. **Login / Signup**
6. **User Dashboard** — saved/favorite places, feedback history
7. **Feedback page**
8. **About / Contact** — customer care number, AI chat widget
9. **404 Not Found page**
10. **Admin panel (optional, for your team only)** — add/edit heritage entries without touching code

---

## 5. Database Schema (MongoDB collections)

```
users
 ├─ _id
 ├─ name
 ├─ email (unique, lowercase, indexed)
 ├─ passwordHash
 ├─ role: "user" | "admin"
 ├─ favorites: [placeId]
 └─ createdAt

states
 ├─ _id
 ├─ name_en, name_hi
 ├─ slug (unique, e.g. "rajasthan")
 ├─ geoJsonName (EXACT state name as it appears in the GeoJSON file — used to map map-clicks → slug)
 ├─ mapCoordinates { lat, lng }
 ├─ thumbnail
 └─ description_en, description_hi

places   (monuments, temples, dargahs, churches, haunted spots, tourism spots — all one collection, differentiated by "type")
 ├─ _id
 ├─ stateId (ref → states, indexed)
 ├─ name_en, name_hi
 ├─ type: "monument" | "temple" | "dargah" | "church" | "haunted" | "tourism" | "other"   (indexed)
 ├─ description_en, description_hi   (short, easy language as you asked)
 ├─ images: [url]
 ├─ model3D: url (glb/gltf file, optional — falls back to image carousel if empty)
 ├─ coordinates { lat, lng }
 ├─ bestTimeToVisit
 ├─ tags: [string]
 ├─ viewCount: number (default 0)
 └─ createdAt

crafts / traditions / food   (identical shape — implement ONE shared Mongoose schema factory and reuse it)
 ├─ _id
 ├─ stateId (ref, indexed)
 ├─ name_en, name_hi
 ├─ description_en, description_hi
 ├─ images: [url]
 └─ createdAt

feedback
 ├─ _id
 ├─ userId (ref, optional — allow anonymous too)
 ├─ placeId (ref, optional — set when submitted via "Report incorrect info" on a place)
 ├─ kind: "general" | "report"
 ├─ message
 ├─ rating (1-5, required only when kind = "general")
 └─ createdAt

chatlogs   (for the AI assistant)
 ├─ _id
 ├─ userId (optional)
 ├─ sessionId (random UUID from the frontend, so anonymous chats are grouped)
 ├─ messages: [{ sender, text, timestamp }]
 ├─ escalatedToHuman: boolean
 └─ createdAt
```

**Indexes:** add a MongoDB `text` index on `name_en, name_hi, description_en, description_hi, tags` for `places`, `crafts`, `traditions`, `food`, and `states`. Use `$text` search for `/api/search` (fast, works with Devanagari) and fall back to a case-insensitive regex only for the short autocomplete dropdown.

This one flexible `places` collection (instead of 6 separate collections for monuments/temples/dargahs/etc.) is deliberate — it keeps your API and frontend filtering logic simple ("give me all places of type=temple in stateId=X") and is much easier to demo/extend under hackathon time pressure.

---

## 6. Backend API Routes (Express)

```
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/me                       (protected)

GET    /api/states
GET    /api/states/:slug

GET    /api/places?state=&type=&search=&page=&limit=
GET    /api/places/:id                    (also increments viewCount)

GET    /api/crafts?state=          GET /api/crafts/:id
GET    /api/traditions?state=      GET /api/traditions/:id
GET    /api/food?state=            GET /api/food/:id

GET    /api/search?q=                     (searches places + states + crafts + traditions + food together)
GET    /api/random                        (returns one random place — powers the "Surprise Me" button)

POST   /api/feedback                      (rate-limited; anonymous allowed)
GET    /api/feedback                      (admin only)

POST   /api/chatbot/message               (rate-limited; returns bot reply or "escalate" flag)

GET    /api/user/favorites                (protected)
POST   /api/user/favorites/:placeId       (protected)
DELETE /api/user/favorites/:placeId       (protected — users must be able to un-save)

GET    /api/health                        (returns { status: "ok" } — used by Render/Railway and by CI smoke test)

--- admin only (role: "admin") ---
POST   /api/admin/places        PUT /api/admin/places/:id        DELETE /api/admin/places/:id
(same trio for /api/admin/crafts, /traditions, /food, /states)
```

**Conventions (apply to every route):**
- All list endpoints return `{ data: [...], total, page, limit }`. All errors return `{ error: "human readable message" }` with a correct HTTP status (400 / 401 / 403 / 404 / 500).
- `authMiddleware.js` exports two functions: `requireAuth` (verifies JWT, attaches `req.user`) and `requireAdmin` (calls `requireAuth`, then checks `req.user.role === "admin"`, else 403).
- Validate every request body / query with `express-validator`; never trust `req.body` directly into Mongoose.
- Rate-limit `/api/auth/*`, `/api/feedback`, `/api/chatbot/*` (e.g. 20 requests / 15 min per IP) with `express-rate-limit`.
- Read the customer-care number from `process.env.SUPPORT_PHONE` and expose it via `GET /api/config` (`{ supportPhone }`) so the frontend never hard-codes it — it appears in the chatbot, footer, and About page and must never drift.

---

## 7. Folder Structure to Create BEFORE Prompting Antigravity

```
bharat-darshan/
├── .gitignore                       ← node_modules, .env, dist, coverage (BOTH frontend + backend)
├── .gitlab-ci.yml                   ← lint + build + test for both apps (see Section 9, Phase 0)
├── frontend/
│   ├── public/
│   │   └── data/
│   │       └── india-states.geojson ← committed locally, NOT fetched from a CDN at runtime (see Phase 3)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Map3D/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   ├── SearchBar/
│   │   │   ├── ChatWidget/
│   │   │   ├── LanguageToggle/
│   │   │   ├── PlaceCard/
│   │   │   ├── Spinner/
│   │   │   └── ErrorState/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── StatePage.jsx
│   │   │   ├── ItemDetail.jsx         ← handles /item/:collection/:id for places, crafts, traditions, food
│   │   │   ├── SearchResults.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Feedback.jsx
│   │   │   ├── About.jsx
│   │   │   └── NotFound.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── LanguageContext.jsx
│   │   ├── hooks/
│   │   │   └── useFetch.js            ← one hook: { data, loading, error } — every page uses it
│   │   ├── services/
│   │   │   └── api.js                 ← reads VITE_API_URL; single axios/fetch instance with JWT header
│   │   ├── utils/
│   │   │   └── stateSlugMap.js        ← GeoJSON state name → slug mapping
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example                   ← VITE_API_URL=http://localhost:5000
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── State.js
│   │   ├── Place.js
│   │   ├── cultureSchema.js           ← shared schema factory used by Craft/Tradition/Food
│   │   ├── Craft.js
│   │   ├── Tradition.js
│   │   ├── Food.js
│   │   ├── Feedback.js
│   │   └── ChatLog.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── stateRoutes.js
│   │   ├── placeRoutes.js
│   │   ├── craftRoutes.js
│   │   ├── traditionRoutes.js
│   │   ├── foodRoutes.js
│   │   ├── searchRoutes.js
│   │   ├── feedbackRoutes.js
│   │   ├── chatbotRoutes.js
│   │   ├── userRoutes.js
│   │   ├── adminRoutes.js
│   │   └── configRoutes.js
│   ├── controllers/
│   │   └── (one file per route group, matching names above)
│   ├── middleware/
│   │   ├── authMiddleware.js          ← requireAuth, requireAdmin
│   │   ├── validate.js                ← express-validator result handler
│   │   └── errorHandler.js            ← central Express error handler → { error }
│   ├── config/
│   │   ├── db.js
│   │   └── constants.js               ← SUPPORT_PHONE, JWT expiry, rate-limit numbers
│   ├── seed/
│   │   ├── seedData.js                ← sample states/places so the demo isn't empty
│   │   └── images/                    ← (optional) locally hosted images if you can't find stable URLs
│   ├── tests/
│   │   ├── auth.test.js
│   │   ├── places.test.js
│   │   └── search.test.js
│   ├── .env.example                   ← MONGODB_URI, JWT_SECRET, PORT=5000, SUPPORT_PHONE, CLIENT_URL
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 8. Color Theme (paste this into every prompt so it stays consistent)

```
Primary Orange:  #FF9933
White:           #FFFFFF
Primary Green:   #138808
Navy/Ashoka Blue (accent, for text/links/buttons): #06038D
Background:      #FFFFFF / #F8F9FA (light, clean — NOT a busy tricolor background)
Text:            #212121 (dark gray, not pure black)
```
Rule of thumb: use white as the dominant background, orange and green only as accents (buttons, highlights, section dividers, active nav state), navy blue for links/headers. Avoid literally striping the page like the flag — keep it professional and light, like a modern gov/tourism site (similar feel to incredibleindia.gov.in but cleaner).

**Accessibility check:** orange `#FF9933` on white fails WCAG contrast for body text. Use orange only for backgrounds with dark text (`#212121`) or for large decorative elements — never for small text on white. Use navy `#06038D` for links.

---

## 9. PHASED PROMPTS FOR ANTIGRAVITY

### Phase 0 — Project Scaffolding + CI
```
Create a full-stack project called "bharat-darshan" with two folders: /frontend (React + Vite + Tailwind CSS) and /backend (Node.js + Express + Mongoose for MongoDB).

Set up the exact folder structure below (create empty placeholder files where noted, don't leave folders empty):

[PASTE THE FOLDER STRUCTURE FROM SECTION 7 HERE]

Root-level files:
- .gitignore covering node_modules/, .env, .env.*.local, dist/, coverage/ for BOTH frontend and backend.
- .gitlab-ci.yml with two parallel jobs using the node:20 image: `backend` (cd backend && npm ci && npm run lint && npm test) and `frontend` (cd frontend && npm ci && npm run lint && npm run build). Cache node_modules per folder. Run on merge requests and on main.

In /backend/server.js, set up an Express server with: helmet, CORS restricted to process.env.CLIENT_URL, JSON body parsing, dotenv config, a GET /api/health route returning { status: "ok" }, a central errorHandler middleware that returns { error: message } with the right status, and a MongoDB connection function in config/db.js reading MONGODB_URI. Export the Express `app` separately from the `listen()` call so supertest can import it. Add ESLint (eslint:recommended) and an npm `lint` script. Add Jest + supertest with one passing test for /api/health.
Add /backend/.env.example with MONGODB_URI, JWT_SECRET, PORT=5000, SUPPORT_PHONE=8502947105, CLIENT_URL=http://localhost:5173.

In /frontend, configure Tailwind with this custom color palette in tailwind.config.js under theme.extend.colors:
india: {
  orange: '#FF9933',
  white: '#FFFFFF',
  green: '#138808',
  navy: '#06038D',
  bg: '#F8F9FA',
  text: '#212121'
}
Add /frontend/.env.example with VITE_API_URL=http://localhost:5000 and make services/api.js read it. Add ESLint (Vite's default React config) and an npm `lint` script.

Set up React Router in App.jsx with routes for: Home (/), StatePage (/state/:slug), ItemDetail (/item/:collection/:id), SearchResults (/search), Login, Signup, Dashboard, Feedback, About, and a catch-all NotFound. Each page file should currently just render its name as a placeholder heading styled with the india color palette.

Do not implement any features yet — this phase is only scaffolding, routing, CI, and styling setup. Confirm `npm run dev` works on both apps and `npm run lint` + `npm test` pass in /backend before finishing.
```
**Done when:** both dev servers start, `GET /api/health` returns ok, GitLab pipeline is green on the MR.

### Phase 1 — Database Models + Seed Data
```
In /backend/models, create Mongoose schemas for: User, State, Place, Craft, Tradition, Food, Feedback, ChatLog — using this exact schema design, including the indexes and the shared cultureSchema.js factory for Craft/Tradition/Food:

[PASTE SECTION 5 SCHEMA HERE]

Then create /backend/seed/seedData.js — a script (run with `npm run seed`) that connects to MongoDB, wipes the collections, and inserts realistic sample data for AT LEAST 5 Indian states (e.g. Rajasthan, Uttar Pradesh, Tamil Nadu, Kerala, Delhi), each with:
- 3-4 places (mix of monument, temple, dargah, church, haunted, tourism types)
- 2 crafts
- 2 traditions
- 2 food items
All with both English and Hindi text fields filled in with real, simple, accurate descriptions (2-3 short sentences each, easy reading level). Fill `geoJsonName` on each state with the exact name used in /frontend/public/data/india-states.geojson.

IMAGES: do NOT use source.unsplash.com or Unsplash "search" URLs — they are deprecated and will show broken images in the demo. Use one of:
(a) direct Wikimedia Commons file URLs (upload.wikimedia.org/...), which are stable and freely licensed, or
(b) images downloaded into /backend/seed/images and served statically from /images/<file>.
Also create an admin user (email + password from env ADMIN_EMAIL / ADMIN_PASSWORD, defaulting to admin@bharatdarshan.local / ChangeMe123!) with role "admin".

Do not touch routes or frontend in this phase.
```
**Done when:** `npm run seed` completes without errors, every image URL opens in a browser, a fluent Hindi speaker has skimmed the Hindi text.

### Phase 2 — Backend API + Auth
```
Building on the existing /backend models, implement all these Express routes with controllers in /backend/controllers and route files in /backend/routes, following the conventions listed:

[PASTE SECTION 6 API ROUTES LIST + CONVENTIONS HERE]

Requirements:
- POST /api/auth/signup and /api/auth/login: validate input (email format, password min 8 chars), hash passwords with bcrypt (10+ rounds), return a JWT (expires in 7d) and the user object without passwordHash.
- middleware/authMiddleware.js exports requireAuth and requireAdmin as described. Protect /api/auth/me and /api/user/* with requireAuth; protect GET /api/feedback and all /api/admin/* with requireAdmin.
- GET /api/places supports ?state=slug&type=monument&search=text&page=1&limit=12 (search is case-insensitive partial match on name_en/name_hi). Returns { data, total, page, limit }.
- GET /api/places/:id increments viewCount atomically ($inc) and returns the place populated with its state.
- GET /api/search?q= uses the $text index across places, states, crafts, traditions, and food; returns a combined array where every result has `resultType` ("place" | "state" | "craft" | "tradition" | "food") and `linkTo` (the frontend path, e.g. /item/crafts/<id> or /state/<slug>) so the frontend never has to build URLs.
- GET /api/random returns one random place using $sample.
- POST /api/feedback accepts { message, rating, kind, placeId } (userId taken from JWT if present). Works for logged-out users too.
- DELETE /api/user/favorites/:placeId removes the favorite; POST is idempotent ($addToSet).
- POST /api/chatbot/message: accept { sessionId, message }. Implement keyword-based intent matching ("monument", "food", "craft", "hindi", "help", "state", "login") returning canned helpful answers about the site. If the message contains words like "agent", "human", "talk to someone", "complaint", "call", "representative", return { escalate: true, phone: process.env.SUPPORT_PHONE } instead. Upsert the conversation into ChatLog by sessionId. Structure the intent matcher so an optional LLM call (OpenAI/Gemini, only if OPENAI_API_KEY / GEMINI_API_KEY is set) can be plugged in as a fallback later — but do NOT require a key for anything to work.
- GET /api/config returns { supportPhone }.
- Apply express-rate-limit to /api/auth, /api/feedback, /api/chatbot.

Write supertest tests in /backend/tests using mongodb-memory-server: signup → login → /me happy path, 401 on missing token, 403 for non-admin on /api/feedback, /api/places filters by type, /api/search returns resultType + linkTo. All tests must pass with `npm test`.
```
**Done when:** `npm test` is green in CI and every route in Section 6 has been hit once from a REST client (Thunder Client / Postman / curl) against seeded data.

### Phase 3 — Frontend: 3D India Map (Home Page)
```
Building on the existing scaffolding, implement the Home page's 3D interactive map of India using react-three-fiber and drei.

DATA: use the GeoJSON already committed at /frontend/public/data/india-states.geojson (loaded with fetch on mount, never from a third-party CDN — CDNs go down or get blocked on hackathon Wi-Fi). Use src/utils/stateSlugMap.js to map each feature's state name property to the backend slug; log a console warning for any feature with no mapping so we can fix the map before the demo.

Approach (use the simplest working version, not literal terrain rendering):
- Render a stylized extruded India map: project each state polygon's lat/lng to a flat plane (simple equirectangular scaling centered on India ~ lat 22, lng 79 is fine), build a THREE.Shape per polygon (handle MultiPolygon features), and extrude it slightly with ExtrudeGeometry so it looks like a raised relief map.
- Each state mesh is colored india.orange by default, turns india.green on hover (with a small tooltip showing the state name in the current language), and on click navigates to /state/:slug. Show a subtle outline (EdgesGeometry) so adjacent states are distinguishable.
- Add OrbitControls (from drei) with limited polar angle (so users can't flip the map upside down) and sensible zoom limits; enable touch.
- Add ambient + directional lighting so the extruded map has visible depth/shadows.
- Wrap the Canvas in a React.Suspense fallback (Spinner) and an error boundary that shows a static image of India + the state list as links if WebGL fails — the demo must never show a blank canvas.
- Below/around the 3D canvas, add: a hero heading ("Discover Incredible India" / bilingual toggle), the SearchBar component (calls GET /api/search?q= debounced 300ms, dropdown of results using each result's `linkTo`), a "Surprise Me" button calling GET /api/random, and a short hint ("Rotate the map and click any state to explore").
- Make the whole page mobile-responsive; on small screens the canvas should be at least 60vh tall and usable with touch gestures.

Use the india color palette from tailwind.config.js. Keep the background light (bg-india-bg / white), not dark, so it reads as clean and professional.
```
**Prep before prompting:** download an India states GeoJSON (e.g. the `india_states` file from the datameet/maps GitHub repo or a similar open dataset), verify it includes all 28 states + 8 UTs with boundaries acceptable for an AICTE / Government of India audience (Ladakh and J&K as separate UTs, full Arunachal Pradesh), simplify it to under ~1 MB with mapshaper.org, and commit it to /frontend/public/data/. Fill stateSlugMap.js by hand from its property names.

**Done when:** every state on the map navigates to a working /state/:slug, no console warnings from stateSlugMap, map works on a real phone.

### Phase 4 — State Page, Category Tiles, Item Detail
```
Building on the existing app, implement:

1. StatePage.jsx (route /state/:slug): fetch the state from GET /api/states/:slug (show NotFound on 404), show state name/description (with language toggle), then a row of clickable category tiles: Monuments, Temples, Dargahs, Churches, Haunted Places, Tourism Spots, Crafts, Traditions, Food. Keep the active tile in the URL query (?tab=temple) so links are shareable. Clicking a tile shows a grid of PlaceCard components (image, name, short description, type badge) fetched from GET /api/places?state=&type= or /api/crafts|traditions|food?state=. Show an empty-state message ("Nothing here yet — check back soon") instead of a blank grid. Each PlaceCard links to /item/:collection/:id (collection = places | crafts | traditions | food).

2. ItemDetail.jsx (route /item/:collection/:id): fetch GET /api/<collection>/:id. Show:
   - An image carousel (or, for places with model3D, load it with drei's useGLTF in a small Canvas viewer with OrbitControls, inside Suspense with a Spinner)
   - A language toggle (English/Hindi) that switches all text on the page instantly using LanguageContext
   - Simple, easy-to-read description text (large font, short paragraphs)
   - A "🔊 Listen" button using the browser speechSynthesis API to read the description in the current language (voice lang "en-IN" or "hi-IN"; hide the button if speechSynthesis is unavailable)
   - For places only: an embedded map using EXACTLY this URL pattern (no API key needed):
     https://maps.google.com/maps?q=<lat>,<lng>&z=14&output=embed
     plus "Best time to visit" and tags shown as small badge chips, and a "Save / Remove from favorites" toggle button (only visible if logged in — calls POST or DELETE /api/user/favorites/:placeId and reflects current state from the user's favorites list)
   - A "Report incorrect info" link that opens the Feedback form prefilled with kind="report" and placeId
   - A "More from <State>" section showing 3 other items from the same state and collection

Use the shared useFetch hook for all requests so loading/error UI is consistent. Style with the india color theme, light background, orange/green accents on buttons and active tags.
```
**Done when:** a craft, a tradition, a food item, and a place all open correctly from a StatePage tile; favorite toggle persists after refresh.

### Phase 5 — Auth Pages + Dashboard
```
Building on the existing AuthContext, implement:

1. Signup.jsx and Login.jsx: simple centered forms (name/email/password for signup, email/password for login), with client-side validation matching the backend rules (email format, password min 8 chars), calling POST /api/auth/signup and /api/auth/login. On success, store the JWT (in memory via AuthContext + localStorage for persistence) and redirect to the page the user came from (or Dashboard). Show the backend's { error } message inline (e.g. "Email already in use", "Invalid credentials").

2. AuthContext.jsx: provides { user, token, login(), signup(), logout(), isAuthenticated, favorites, toggleFavorite() } to the whole app. On app load, check localStorage for a saved token and call GET /api/auth/me to restore the session; if it returns 401, clear the token silently. services/api.js must attach the Authorization header automatically and, on any 401 response, call logout().

3. Navbar component: shows Login/Signup buttons if logged out, or the user's name + Logout + a Dashboard link if logged in. Include the SearchBar and the language toggle (EN/हिं) so they're available on every page. Collapse into a hamburger menu on mobile.

4. Dashboard.jsx (protected route — redirect to /login if not authenticated): shows the user's saved favorite places as a grid of PlaceCards (GET /api/user/favorites) with a remove button on each, plus the user's feedback history if any.

Style forms and dashboard with the india color theme, clean and minimal, similar to the rest of the site.
```
**Done when:** refresh keeps you logged in, an expired/invalid token logs you out cleanly, protected routes redirect.

### Phase 6 — Feedback Page
```
Building on the existing app, implement Feedback.jsx (route /feedback): a form with a message textarea and a 1-5 star rating selector, submitting to POST /api/feedback. Support query params ?kind=report&placeId=<id> to prefill a "Report incorrect info" submission (hide the star rating in that mode, show the place name instead). Works whether the user is logged in or not. Disable the submit button while sending, show a friendly thank-you confirmation after success and the backend { error } on failure. Add a link to this page in the Navbar or footer.
```

### Phase 7 — AI Chat Widget with Human Escalation
```
Building on the existing /api/chatbot/message backend route, implement a ChatWidget component that:
- Appears as a small floating chat bubble icon in the bottom-right corner on every page (fixed position), using india-orange as the bubble color, with an aria-label for screen readers.
- Generates a sessionId (crypto.randomUUID()) once per browser session (sessionStorage) and sends it with every message.
- On open, shows a welcome message: "Hi! I'm your Bharat Darshan assistant. Ask me about monuments, food, culture, or say 'talk to agent' to reach our team." plus 3 quick-reply chips ("Famous monuments", "Food of Rajasthan", "Talk to agent") so judges can demo it in one click.
- User types a message → POST /api/chatbot/message → reply appended to the thread. Show a typing indicator while waiting and a retry link on network error.
- If the response includes { escalate: true, phone }, show a clearly styled "Connect to Customer Care" card with "I'll connect you with our support team." and a prominent button "📞 Call <phone>" using a tel: link, plus the number as plain text for desktop users. The phone number MUST come from the API response / GET /api/config, never hard-coded in the frontend.
- Keep chat history in component state for the session (no persistence across reloads).
- Responsive: on mobile the chat window is full-width, and the bubble never overlaps the Footer's call button.

Style with the india color theme — white background, orange header bar, green accent for the "sent" message bubbles.
```
**Done when:** "talk to agent" shows the call card on desktop and actually opens the dialer on a real phone.

### Phase 8 — Polish Pass
```
Do a final polish pass across the whole app:
1. Add a Footer component (site name, tagline, customer care number from GET /api/config with a tel: link, quick links to About/Feedback/Login, and a note "Made for Smart India Hackathon 2026 — Problem Statement 26197").
2. Confirm every data fetch goes through useFetch and shows the india-orange Spinner while loading and the ErrorState component ("Something went wrong, please try again" + retry button) on failure.
3. Make sure the NotFound page is styled consistently and is reached for unknown routes AND for 404s from the API (bad slug / id).
4. Double check every page respects the language toggle (English/Hindi) where text exists in both languages, and that the chosen language persists in localStorage.
5. Run through mobile responsiveness on Home (3D map), StatePage, ItemDetail, and the ChatWidget specifically — these are the highest-risk components for breaking on small screens.
6. Add meta tags (title, description) per page for basic SEO, title format "Bharat Darshan | [Page Name]". Add lang="hi" on Hindi text containers for screen readers.
7. Run a Lighthouse audit on Home and ItemDetail; fix anything below 80 in Accessibility (contrast, alt text on all images, focus states on tiles/buttons, keyboard navigation for the category tiles).
8. Lazy-load the 3D map and GLTF viewer with React.lazy so first paint on Home is fast.

Do not change any existing functionality — this is a styling/UX/robustness/performance pass only.
```

---

## 10. Extra Feature Ideas Worth Adding (your call on priority given time left)

Already pulled into the core phases above: **Surprise Me**, **Audio narration**, **Report incorrect info**, **View counter**, **404 page**. Remaining nice-to-haves:

- **Filter chips on StatePage** (e.g. filter tourism spots by "haunted", "religious", "nature") using `tags`, on top of the type tiles
- **Offline-friendly PWA** (vite-plugin-pwa) — makes the app installable, nice bonus point for judges
- **Admin panel UI** (the backend `/api/admin/*` routes already exist) — simple protected pages to add/edit places without redeploying; shows judges the platform is sustainable/scalable, which SIH judges specifically look for
- **LLM fallback for the chatbot** — plug OpenAI/Gemini into the intent matcher's fallback slot from Phase 2, only if a key is present
- **Share button** on ItemDetail (Web Share API, falls back to copy link)
- **"Nearby" using geolocation** — sort tourism spots by distance to the user

---

## 11. Before You Submit / Demo — Checklist

- [ ] `.env` files are NOT committed (check .gitignore); `.env.example` files ARE committed and up to date
- [ ] GitLab CI pipeline is green on `main`
- [ ] Seed data is realistic and covers at least 5 states with all categories filled in — empty categories look broken in a demo
- [ ] Every seed image URL opens (run a quick script or click through) — no broken images
- [ ] Every state on the 3D map navigates to a working state page (no unmapped GeoJSON names)
- [ ] Chatbot escalation and the phone number (from env, not hard-coded) are tested and working on a real phone
- [ ] Both frontend and backend deployed live (not just localhost); `CLIENT_URL` and `VITE_API_URL` point at the deployed URLs; `/api/health` returns ok
- [ ] Free-tier backend cold start handled: hit `/api/health` 2-3 minutes before the demo so Render/Railway is awake
- [ ] Hindi text is checked by a native/fluent speaker on your team — machine-translated Hindi in a "Heritage & Culture" project will stand out negatively to judges
- [ ] Mobile view tested on an actual phone, not just browser dev tools
- [ ] Offline fallback ready: a recorded screen video of the full demo, in case venue Wi-Fi fails
- [ ] README.md documents problem statement ID 26197, tech stack, architecture diagram (one image), how to run locally, how to run tests, and the live URLs — judges often check the repo
- [ ] Rotate the default admin password and the JWT secret before deploying

---

Good luck with SIH 2026 — this is a strong problem statement with a lot of room to visually impress judges, since "3D map + bilingual heritage content" naturally photographs/demos well. Focus your remaining time on Phase 3 (the 3D map) and Phase 7 (chat) looking polished — those are what judges remember.

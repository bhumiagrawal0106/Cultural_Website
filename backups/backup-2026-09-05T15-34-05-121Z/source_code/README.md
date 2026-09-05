# Bharat Darshan (भारत दर्शन)

**Smart India Hackathon 2026 · Problem Statement 26197 · AICTE · Theme: Heritage & Culture**

A 3D interactive heritage map of India. Rotate the map, click a state, and explore its monuments, temples, dargahs, churches, haunted places, tourism spots, crafts, traditions and food, all in simple English and Hindi with audio narration, a chat assistant and one-tap escalation to a human.

[![pipeline status](https://gitlab.com/cultural-group1/cultural-website/badges/main/pipeline.svg)](https://gitlab.com/cultural-group1/cultural-website/-/pipelines)

---

## Features

| Area | What it does |
|---|---|
| **3D India map** | Extruded state polygons from a local GeoJSON, hover highlight and tooltip, legend, click to open the state page. Falls back to hex tiles without the GeoJSON, and to an accessible list without WebGL or via the List view toggle. |
| **State pages** | Category tiles (Monuments, Temples, Dargahs, Churches, Haunted, Tourism, Crafts, Traditions, Food) with counts; active tab kept in the URL (`?tab=temple`). |
| **Item detail** | One route for every content type (`/item/:collection/:id`): image carousel or GLTF 3D model, bilingual text, Listen button (Web Speech API), embedded Google Map, tags, best time to visit, share, favourites, "Report incorrect info", and "More from this state". |
| **Search** | Debounced autocomplete plus a full results page grouped by type, powered by MongoDB text indexes. |
| **Surprise Me** | Jumps to a random place. |
| **Auth** | JWT signup/login, session restore on refresh, silent logout on 401, protected Dashboard. |
| **Dashboard** | Saved favourite places (remove inline) and personal feedback history. |
| **Feedback** | 1-5 star general feedback or a place-specific "report" (anonymous allowed). |
| **Chat assistant** | Rule-based intents with optional LLM fallback; "talk to agent" shows a Call card with the support number from the API. |
| **Admin panel** | `/admin` (admin role only): add, edit and delete states, places, crafts, traditions and food through schema-driven forms, filter by state, open the public page, and read the feedback inbox. No redeploy needed to update content. |
| **Bilingual UI** | Every UI string and every content field exists in English and Hindi; choice persists in `localStorage`. |
| **Accessibility** | Skip link, focus rings, `lang` attributes on Hindi text, keyboard-friendly tiles, stars and search. |

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, Tailwind CSS 3, React Router 6 |
| 3D | three.js, @react-three/fiber, @react-three/drei |
| Backend | Node.js 18+, Express 4, Mongoose 8 |
| Database | MongoDB (Atlas free tier or local) |
| Auth & security | JSON Web Tokens, bcryptjs, helmet, express-rate-limit, express-validator |
| Tests | Jest, supertest, mongodb-memory-server |
| CI | GitLab CI (`.gitlab-ci.yml`): lint + test (backend), lint + build (frontend) |

---

## Architecture

```
┌─────────────────────────────┐        HTTPS / JSON        ┌──────────────────────────────┐
│  Frontend (React + Vite)    │  ───────────────────────▶  │  Backend (Express)           │
│  • Map3D (three.js)         │   Authorization: Bearer    │  • /api/auth   (JWT)         │
│  • Pages + Router           │  ◀───────────────────────  │  • /api/states /places ...   │
│  • LanguageContext (en/hi)  │                            │  • /api/search  ($text)      │
│  • AuthContext (JWT)        │                            │  • /api/feedback /chatbot    │
│  • ChatWidget               │                            │  • /api/user  /admin  /config│
└─────────────────────────────┘                            └──────────────┬───────────────┘
                                                                          │ Mongoose
                                                           ┌──────────────▼───────────────┐
                                                           │  MongoDB                     │
                                                           │  users · states · places     │
                                                           │  crafts · traditions · food  │
                                                           │  feedback · chatlogs         │
                                                           └──────────────────────────────┘
```

---

## Repository layout

```
.
├── .gitlab-ci.yml
├── README.md
├── SIH_26197_Heritage_India_Project_Plan.md   # original phased build plan
├── backend/
│   ├── app.js / server.js                     # Express app (exported for tests) and listener
│   ├── config/        constants.js, db.js
│   ├── controllers/   one per route group
│   ├── middleware/    authMiddleware, validate, errorHandler
│   ├── models/        User, State, Place, Craft, Tradition, Food, Feedback, ChatLog
│   ├── routes/        auth, states, places, crafts, traditions, food, search, random,
│   │                  feedback, chatbot, user, admin, config
│   ├── seed/          seedData.js + data/<state>.js (5 states)
│   └── tests/         Jest + supertest (health, auth, places, search)
└── frontend/
    ├── index.html, vite.config.js, tailwind.config.js
    ├── public/        favicon, data/india-states.geojson (see scripts/fetchGeojson.mjs)
    └── src/
        ├── App.jsx                # providers, layout, routes
        ├── components/            # Navbar, Footer, Map3D, SearchBar, ChatWidget, PlaceCard, ...
        ├── context/               # AuthContext, LanguageContext
        ├── hooks/                 # useFetch, usePageMeta, useSpeech
        ├── pages/                 # Home, StatePage, ItemDetail, SearchResults, Login, Signup,
        │                          # Dashboard, Feedback, About, NotFound
        ├── services/api.js        # fetch wrapper with JWT + 401 handling
        └── utils/                 # catalog, strings (en/hi), geo, stateSlugMap, validation, format
```

---

## Running locally

### Prerequisites

- Node.js 18 or newer
- MongoDB (local `mongod`, Docker, or a free MongoDB Atlas cluster)

### 1. Backend

```bash
cd backend
cp .env.example .env        # then edit MONGODB_URI and JWT_SECRET
npm install
npm run seed                # loads 5 states with places, crafts, traditions, food + an admin user
npm run dev                 # http://localhost:5000  (GET /api/health)
```

`.env` keys:

| Key | Purpose | Default |
|---|---|---|
| `MONGODB_URI` | Mongo connection string | `mongodb://127.0.0.1:27017/bharat-darshan` |
| `JWT_SECRET` | Signs JWTs (use a long random string) | required |
| `PORT` | API port | `5000` |
| `SUPPORT_PHONE` | Customer-care number shown in footer, About and chatbot | `8502947105` |
| `CLIENT_URL` | Allowed CORS origin(s), comma separated | `http://localhost:5173` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin account created by the seed script | `admin@bharatdarshan.local` / `ChangeMe123!` |
| `OPENAI_API_KEY` / `OPENAI_MODEL` | Optional LLM fallback for the chatbot | unset (rule-based only) |

### 2. Frontend

```bash
cd frontend
cp .env.example .env        # VITE_API_URL=http://localhost:5000
npm install
npm run fetch-geojson       # one-time: downloads, simplifies and validates public/data/india-states.geojson
npm run dev                 # http://localhost:5173
```

#### 3D map data

The home map needs `frontend/public/data/india-states.geojson` (not committed by default). `npm run fetch-geojson`:

- downloads a states GeoJSON (or reads one you pass with `-- --input <file>`),
- simplifies boundaries with Douglas-Peucker (`--tolerance`, default 0.015 degrees) and rounds coordinates (`--precision`, default 3) so the file stays under 1 MB,
- keeps only `{ name, slug }` in properties,
- **fails** if any state name is missing from `src/utils/stateSlugMap.js`,
- warns about any of the 28 states + 8 UTs that the dataset does not contain (older files lack Ladakh or Telangana; the [datameet/maps](https://github.com/datameet/maps) dataset is a good current source).

Commit the generated file. `npm run check-geojson` (also run in CI) validates it without rewriting.

Without the file the map still works: it shows hex tiles for every seeded state on an India outline. Without WebGL, or via the **List view** toggle, it shows an accessible list of state links.

### 3. Tests and lint

```bash
cd backend  && npm run lint && npm test      # Jest + supertest on an in-memory MongoDB
cd frontend && npm run lint && npm run build
```

The same commands run in GitLab CI on every branch and merge request.

---

## API overview

All list endpoints return `{ data, total, page, limit }`; all errors return `{ error }` with a proper HTTP status.

```
GET    /api/health
POST   /api/auth/signup            POST /api/auth/login          GET /api/auth/me            (auth)
GET    /api/states                 GET  /api/states/:slug        (includes per-category counts)
GET    /api/places?state=&type=&search=&page=&limit=     GET /api/places/:id  (increments viewCount)
GET    /api/crafts | /api/traditions | /api/food  (?state=)     GET /api/<collection>/:id
GET    /api/search?q=              (all collections; each hit has resultType + linkTo)
GET    /api/random
POST   /api/feedback               (anonymous allowed; kind = general | report)
GET    /api/feedback               (admin)
POST   /api/chatbot/message        ({ sessionId, message } -> { reply, links } or { escalate, phone })
GET    /api/user/favorites         POST/DELETE /api/user/favorites/:placeId      GET /api/user/feedback   (auth)
POST/PUT/DELETE /api/admin/:collection[/:id]                                    (admin)
GET    /api/config                 ({ supportPhone, appName, problemStatement })
```

`/api/auth`, `/api/feedback` and `/api/chatbot` are rate-limited.

---

## Frontend routes

| Path | Page | Notes |
|---|---|---|
| `/` | Home | 3D map, search, Surprise Me, featured states |
| `/state/:slug` | StatePage | category tiles + grid |
| `/item/:collection/:id` | ItemDetail | `collection` = `places`, `crafts`, `traditions`, `food` |
| `/search?q=` | SearchResults | grouped by type |
| `/login`, `/signup` | Auth | redirect back to the page you came from |
| `/dashboard` | Dashboard | protected |
| `/admin?tab=places&state=rajasthan` | Admin | admin role only (others see 404); tabs: states, places, crafts, traditions, food, feedback inbox |
| `/feedback` | Feedback | `?kind=report&placeId=<id>` opens report mode |
| `/about` | About | contact number from `/api/config` |
| `*` | NotFound | also used for API 404s (bad slug / id) |

---

## Deployment (demo)

- **Frontend:** Vercel or Netlify. Build command `npm run build`, output `frontend/dist`, env `VITE_API_URL=https://<your-api>`.
- **Backend:** Render or Railway. Start command `node server.js`, set every key from `.env.example`, point `CLIENT_URL` at the frontend URL.
- **Database:** MongoDB Atlas free tier. Run `npm run seed` once against it.
- Hit `/api/health` a few minutes before the demo so a free-tier backend is awake.

Live URLs: _add here once deployed_.

---

## Colour theme

| Token | Hex | Use |
|---|---|---|
| `india-orange` | `#FF9933` | primary buttons, highlights (dark text on top) |
| `india-green` | `#138808` | secondary buttons, success, sent chat bubbles |
| `india-navy` | `#06038D` | headings, links, focus rings |
| `india-bg` | `#F8F9FA` | page background |
| `india-text` | `#212121` | body text |

---

## Project status

All build phases from the project plan are complete: scaffolding and CI, models and seed data, backend API and auth, 3D map, state and detail pages, auth pages and dashboard, feedback, chat widget with escalation, and the polish pass. The admin panel UI is also done. Remaining nice-to-haves: PWA support, tag filters on state pages, nearby places by geolocation.

Default admin login after `npm run seed`: `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `backend/.env` (rotate before deploying).

## License

Built for Smart India Hackathon 2026 by team Cultural-group. All heritage descriptions are original simplified text; images are linked from Wikimedia Commons under their respective licences.

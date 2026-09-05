9/5/26, 1:48 AM 

SIH_26197_Heritage_India_Project_Plan.md · improve-project-plan · Bhumi-group / Cultural_Website · GitLab 

 



<!-- Start of picture text -->
e<br>ndd<br>ild inn<br>be<br>,<br>d<br><!-- End of picture text -->

" " SIHCPommroitbleand pusmh toSretposatitoryement 26197 — Bharat Darshan (Heritage &ApprovCuedlture of I1nactdiion taake)n Created commit improve-project-plan Organization: AICTE | Theme: Heritage & Culture | Category: Software 

A complete build plan for a 3D interactive India heritage map website, plus ready-to-paste prompts for Antigravity.are you still working included reference 1. Suggested Project Name Yes. Committing the remaining three states now (Tamil Nadu, Kerala, Delhi), then moving to the frontend. "Bharat Darshan" (भारत दश�न — "Vision/Glimpse of India") — or "IndiaVerse", "Virasat" (heritage). Use this consistently in code, README, andd SIH subCmommissionit asnlided puss. h to repository Approved 1 action taken 2. HowCretoatedUcommse iTt hiimprovs De-oprocumject-pelantn with Antigravity Do not paste the whole document at once. Antigravity (like all AI coding agents) produces much more reliable, working code when you build inn phases and let it finish + verify each phase before moving to the nexta. rBeelyouow,woreachkinpgh,aesveerythasim: e you are working say now i am working 

ANfileow struI amcworturekiyoung. cBraeckeatenfidrstis (ceompmptyletfeolde(5 strsaateres fisneedede) , 12 route groups, tests). Starting the frontend: scaffold, contexts, Asreervadicey-sto, a-npdastsheapromptred utilitfieors.that phase A "Done when" check you must verify before moving on 

Commit and push to repository ' ' Approved Work through Phases 0 → 8 in order. Each phase s prompt already tells Antigravity what was built before it, so context isn t lost. Comm1 aitcationftetraekevnery phase on a branch named phase-N-<name> and open a Merge Request into main . The GitLab CI pipeline (Phase 0) must be green before merging. This gives judges a clean commit history and protects main from a broken phase. ~~Commit and push to repository Approved~~ ' — - 3. Tech Stack (final decision don t change mid build) 1 action taken LayNeowr I am workinTgech. Commnoloigttying the 3D India map (Phase 3), 3D model viewer, anWdhthey ChatWidget (Phase 7). FrontCeommnd it and pusRehactot.jrse(posViteitory) + Tailwind CSS Fast, component-based, easy styling Approved 3D Map react-three-fiber + three.js (+ drei helpers) Industry-standard 3D-in-React ~~1 action taken~~ State mgmt React Context API (or Zustand if it grows) Simple, no extra complexity for SIH scale <u>Now I am working. Fixing a sloppy piece in</u> TileStates.jsx <u>(the outline shape should import three.js directly), then</u> Backecommnditting pageNsoHdeom.jse,+SEtaxprtePaessge.js, ItemDetail, SearchResults. Pairs naturally with React, huge community, easy for judges to review ~~Commit and push to repository Approved~~ Database MongoDB (Atlas free tier) via Mongoose Heritage data is unstructured/nested (multiple images, bilingual text, categories) — MongoDB fits better than 1 action taken SQL here 

Now I am working. Final <u>frontend</u> batch: Login, Signup, Dashboard, Feedback, About, NotFound, App router, and the root AutRhEADME. JWT (jsonwebtoken) + bcrypt Standard, secure, simple Validation / express-validator, express-rate-limit, helmet Cheap to add, prevents obvious demo-day crashes and SecurCiommty it and push to repository shows judges you thought about it Pending Testing Project: CulturJeastl_W+ebsupsiteertest (backend), Vitest + React Testing Library A handful of real tests beats "tested mentally" (frontend, light) Commit and <u>push</u> to branch improve-project-plan in repository Cultural_Website . The commit contains 8 file changes. CI GitLab CI ( .gitlab-ci.yml ) Lint + build + test on every push; free on GitLab.com AI Chatbot Rule-based intent matching + optional OpenAI/Gemini API Keeps it working even without paid API keys; judges careareree No credifor ftsreere-tmextai,nwinitgh a hard-coded escalation path to a that it works To conthiumnueanconumllabbeorrating with GitLab Duo Agent Platform, purchase credits. Hosting (for Frontend: Vercel/Netlify · Backend: Render/Railway · DB: All free tiers, fast to deploy before submission demo) MongoDB Atlas 

Let's work through this together... If your team already knows Python/Django or SQL better, swap Node→Django and Mongo→PostgreSQL — the architecture below still applies, just translate route/model syntax. 

 careareree  lies,s,,  

4. SitReesponsMaeps m(payabegeinascc)urate. Verify before use. 

 H 3D t ti f I di h ti t li h b 

https://gitlab.com/bhumi-group1/cultural_website/-/blob/improve-project-plan/SIH_26197_Heritage_India_Project_Plan.md?ref_type=heads 

1/1 


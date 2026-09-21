# Harvest 4 All — P0 Current-State Reconstruction

**Audit date:** 2026-09-21  
**Mode:** RECOVERY → VERIFICATION → HARDENING → PROOF PACKAGING  
**Repository:** RobynAwesome/Harvest-4-All  
**Authority:** repository reality outranks narration; receipt or HOLD.

## 1. Exact cloud state

| Item | Status | Evidence |
|---|---|---|
| Default branch | KNOWN | `main` |
| Exact audited HEAD | KNOWN | `b3aca98341f8844630ea2bd3eb9325f5f00f575d` |
| HEAD change | KNOWN | Merge PR #8: client Axios override alignment |
| Repository visibility | KNOWN | Public |
| Local workstation branch / dirty state | UNKNOWN | No local workstation filesystem/session is available to this audit. Do not infer local truth from GitHub. |
| Root `NOW.md` | ABSENT | Not present in audited tree |
| Root `AGENTS.md` | ABSENT | Not present in audited tree |
| Open GitHub issues | KNOWN: 0 | Live GitHub query at audit time |
| Open GitHub PRs | KNOWN: 3 | #15 recovery/IAOM truth floor, #16 repo dependency hardening, #17 client verification hardening. Prior handoff claim of 0 open PRs is STALE. |
| Combined commit-status API checks at HEAD | KNOWN: none | No statuses surfaced for audited HEAD |
| Repository-native CI workflows | ABSENT | `.github/` contains `FUNDING.yml` only; no `.github/workflows/` tree |
| GitHub Actions activity | PARTIAL | Dependabot dynamic runs exist; they are not an application build/test CI receipt |

## 1A. Live-state refinement after initial audit

The initial P0 snapshot above remains a valid receipt for the state observed at `b3aca98341f8844630ea2bd3eb9325f5f00f575d`, but it is no longer the latest `main`.

During the same recovery window, `main` advanced by one commit to:

`c7cf2bfc9a2e8f3ca51835fe9aab3f44107d8408`

via PR #14: `fix(security): reconcile client Dependabot alerts`.

Compared with the original audited HEAD, that commit:
- added `.github/workflows/client-dependency-security.yml`;
- materially regenerated `client/package-lock.json`;
- modified `client/package.json`;
- adjusted `client/vite.config.js`.

This supersedes two initial P0 observations:
- repository-native CI is no longer wholly absent; a client dependency-security workflow now exists;
- the original client manifest/lock conflict must be re-evaluated against `c7cf2bfc...`, not assumed to remain unchanged.

It does **not** prove application build/lint/runtime health. PR #17 exists specifically because PR #14's green workflow tolerated lint failure, so a green dependency workflow must not be promoted to a full readiness receipt.

**Branch boundary:** this recovery branch was created from the earlier `b3aca983...` base and does not itself contain the PR #14 application/dependency changes. Do not begin overlapping application mutation on this branch until it is reconciled with current `main`.

**Disposition:** historical P0 snapshot = retained; current-main assertions = refine against `c7cf2bfc...`; application mutation = HOLD until branch/base reconciliation.

## 2. Repository map

### Root

- Legacy/static surface: `index.html`, `app.js`, `styles.css`.
- Active split application surfaces: `client/` and `server/`.
- Container build: root `Dockerfile`.
- Large duplicated/generated visual assets exist in both root `public/` and `client/public/`.
- Tracked agent-local file: `.claude/settings.local.json`, containing workstation-specific paths.

### Client

- React 19 + Vite application.
- Routing through React Router.
- Local persistence through `localStorage`.
- PWA/service-worker configuration exists in two forms:
  - `vite-plugin-pwa` configuration in `client/vite.config.js`.
  - manually registered `client/public/sw.js` from `client/src/main.jsx`.
- Market UI can create listings and record a marketplace action.
- Offline API failures fall back to local React state/localStorage and, in some reads, mock data.

### Server

- Express 5 API.
- Active persistence path is `lowdb` file storage at `server/data/db.json`.
- Routes: health, auth, impact, grow, market, actions, messaging, USSD, submissions.
- Mongoose models are present, but no `mongoose.connect(...)` call exists in the audited default branch.
- Africa's Talking integration surface exists for SMS.
- Docker healthcheck targets `/api/health`.

## 3. Environment expectations

| Variable | Requirement | Current behavior |
|---|---|---|
| `PORT` | optional | defaults to 5000; Docker sets 8080 |
| `JWT_SECRET` | REQUIRED for secure operation | code falls back to a tracked static secret; unacceptable beyond disposable demo use |
| `AFRICASTALKING_API_KEY` | required for real SMS | placeholder fallback exists |
| `AFRICASTALKING_USERNAME` | required for real SMS | defaults to sandbox |
| `VITE_API_URL` | partial/client-admin surface only | Admin user fetch falls back to localhost:5000; most client API calls use relative `/api` |

No MongoDB connection environment is consumed by the active server even though Mongoose models exist.

## 4. Runnable commands surfaced by manifests

Root:
- `npm run dev`
- `npm run server`
- `npm run client`

Client:
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

Server:
- `npm start`
- `npm run dev`
- `npm test` currently exits with `Error: no test specified`.

Docker:
- builds the client, installs production server dependencies, starts `node server/index.js`, and healthchecks `/api/health`.

**Runtime receipt status:** HOLD. This audit environment could inspect GitHub but could not obtain an executable clean clone from GitHub, so install/build/lint/start/health have not been promoted to passing claims.

## 5. Manifest / install reproducibility concern

`client/package.json` and `client/package-lock.json` are not aligned.

The lockfile root records development dependencies including:
- `vite`
- `vite-plugin-pwa`
- `postcss`
- `tailwindcss`

Those entries are not declared in the audited `client/package.json`, while `client/vite.config.js` imports `vite-plugin-pwa` and client scripts call `vite`.

Status: **CONFLICTING / BLOCKER** until a clean install and build receipt proves the corrected manifest/lock pair.

## 6. Product-flow classification

### Candidate source-backed flow

```text
listing form
  -> client addListing()
  -> POST /api/market
  -> lowdb listings[]
  -> GET /api/market
  -> marketplace render

buyer/listing interaction
  -> client logAction(type="market")
  -> POST /api/actions
  -> lowdb actions[]
```

This is a useful basis for the IAOM demo path, but it is not yet a verified end-to-end runtime receipt.

### KNOWN implementation signals

- Health endpoint exists.
- Registration/login routes exist.
- New registered passwords are bcrypt-hashed before lowdb storage.
- Listing create/retrieve routes exist.
- Action create/retrieve routes exist.
- Grow and impact create/retrieve routes exist.
- ZAR-style marketplace values are represented.
- Server persistence writes to JSON via lowdb.
- Client saves market listings/actions and several UI metrics to localStorage.
- SMS and USSD route surfaces exist.
- PWA manifest/service-worker code exists.

### PARTIAL / BROKEN / HOLD

1. **Offline store-and-forward sync: HOLD.**  
   Failed API writes become local client state, but no queue, replay, sync journal, reconciliation, conflict policy, or reconnect worker was found.

2. **Offline UI fallback and mock fallback are mixed.**  
   On failed initial API reads, market/actions/badges may be populated from mock data. This must not be presented as synchronized offline operation.

3. **Reconnect semantics: HOLD.**  
   No mechanism was found that pushes locally-created offline listings/actions to the server after connectivity returns. On a later online load, non-empty server results can replace locally held market state.

4. **Role claims: STALE / UNPROVEN.**  
   README lists Farmer, Extension Officer, Buyer, and Logistics roles. Active auth data uses `user` / `admin`; no matching role enforcement was found.

5. **Urgency claims: STALE / UNPROVEN.**  
   README lists standard/drought/cold-chain urgency modes. No corresponding workflow/state model was found.

6. **Trust claims: STALE / UNPROVEN.**  
   README claims verified produce origin and price verification. No matching verification workflow or persisted provenance/verification state was found.

7. **Invalid-input rejection: ABSENT for IAOM market path.**  
   `POST /api/market` constructs and persists a listing without schema validation or required-field checks.

8. **Marketplace records are unauthenticated.**  
   Market and action mutation routes do not require auth; buyer identity is not bound to the recorded interaction.

9. **ID contract mismatch.**  
   lowdb records use `id`, while several client admin/delete paths expect `_id`. Server-origin records can therefore fail management/delete assumptions.

10. **Mongoose dispatch logging is disconnected from active persistence.**  
    `DispatchLog.create(...)` is used by SMS/USSD routes, but no Mongo connection exists. Meanwhile `/api/impact/dispatch` reads lowdb `logs`, which those routes do not write.

11. **PWA strategy is conflicting/duplicated.**  
    Vite PWA generation and a manually registered `/sw.js` coexist. Actual cache/install behavior requires runtime verification.

## 7. Tests and proof floor

### Present

- Client has lint/build scripts.

### Absent

- No server test suite.
- Server `npm test` deliberately exits 1.
- No client test script.
- No test files surfaced in repository search for the IAOM path.
- No repository-native CI workflow.

Status: **P2 proof floor not present.**

## 8. Runtime / deployment state

- Docker packaging intent exists.
- Docker healthcheck exists.
- No repository deployment-provider configuration surfaced for Vercel, Netlify, Render, Railway, or Fly.
- No application CI receipt exists at audited HEAD.
- No live deployment health receipt was established by this audit.

Status: **UNKNOWN / HOLD**. A deployment URL or provider configuration elsewhere must not be inferred.

## 9. Security / privacy concerns discovered during P0

Secret values are intentionally omitted from this receipt.

### REMOVE

- Tracked plaintext demo/admin password material in `server/localDb.js` and `server/data/db.json`.
- Hard-coded client-side admin PIN in `client/src/pages/Admin.jsx`.
- Static fallback JWT signing secret in `server/middleware/auth.js`.
- Public `GET /api/auth/users` route returns full user records rather than a safe projection.
- Unauthenticated demo-login route can issue privileged tokens for seeded accounts.
- Workstation-local `.claude/settings.local.json` is tracked and should be reviewed for repository suitability.

### ROTATE

- Any real credential or PIN that has ever reused the tracked demo/admin value.
- Any environment that has relied on the tracked fallback JWT secret.

### HISTORY-EXPOSED

The credential material is present in the current public Git tree. Treat reused values as exposed even if removed in a future commit. Rotation outranks cosmetic history rewriting.

### UNKNOWN

- Whether external Africa's Talking credentials have ever been committed in prior history.
- Whether public deployment environments currently use any exposed/default credentials.
- Whether personal information beyond the audited files exists in older history.

No secret values should be copied into future receipts.

## 10. Stale or over-strong claims

| Claim | Current classification |
|---|---|
| Adaptive PWA | PARTIAL: configuration exists; install/runtime behavior unverified |
| Operates on intermittent rural connectivity | HOLD: local fallback exists; field/runtime resilience unverified |
| Offline crop data | PARTIAL: localStorage/mock/code exists; exact crop workflow requires proof |
| Store-and-forward sync | HOLD: no sync queue/replay implementation found |
| Farmer / extension / buyer / logistics roles | HOLD: README only relative to active auth model |
| Standard/drought/cold-chain urgency modes | HOLD |
| Verified produce origin | HOLD |
| Price verification | HOLD |
| SMS integration | PARTIAL: provider surface exists; live credential/send receipt absent |
| USSD integration | PARTIAL: menu route exists; provider/runtime receipt absent |
| Mongo/Mongoose persistence | STALE for active runtime: models exist but no connection path was found |
| JSON persistence | KNOWN source implementation; runtime durability receipt still required |

## 11. P0 blockers to resolve before external proof claims

1. Security/auth exposure: demo credentials, client PIN, fallback JWT secret, privileged demo-login, unsafe user listing.
2. Client manifest/lock reproducibility conflict.
3. No test/proof floor.
4. No clean install/build/lint/server/health receipt.
5. Offline semantics are weaker than README language.
6. No reconnect/store-and-forward implementation.
7. IAOM farmer -> listing -> buyer -> interaction path has not been executed and captured end-to-end.
8. Deployment state is unknown.
9. Open dependency/security PR set must be reconciled deliberately; do not merge overlapping Dependabot branches blindly.

## 12. P1 lock candidate

The repository already contains enough source structure to lock the requested IAOM vertical proof without inventing a new product:

```text
PRODUCER
  -> create produce listing
  -> server persistence
  -> buyer sees listing
  -> buyer records interaction intent
  -> offline interruption
  -> local persistence
  -> reconnect
  -> server reconciliation
  -> receipt
```

The final three transitions are **not implemented/proven today** and remain HOLD.

## 13. Next bounded action

Proceed to P1/P2 only after this receipt exists:

1. Freeze the IAOM path contract and field names.
2. Remove/contain the critical auth/security exposures.
3. Repair package manifest/lock reproducibility.
4. Add the smallest server/client/runtime tests proving the chosen path.
5. Implement or explicitly downgrade the reconnect/store-and-forward claim based on evidence.
6. Produce the offline capability matrix from runtime receipts.

**P0 conclusion:** Harvest 4 All has a real marketplace/persistence/PWA-shaped implementation base, but the current evidence floor does not support the strongest offline, role, trust, security, or deployment claims. The correct next move is consolidation and proof, not feature expansion.

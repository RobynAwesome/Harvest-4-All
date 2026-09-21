# Harvest 4 All — P1 IAOM Demo Path Contract

**Date:** 2026-09-21  
**Purpose:** lock one vertical proof before adding tests or hardening code.  
**Rule:** no mocked success screen counts as completion.

## 1. Locked proof path

```text
PRODUCER
  -> records a produce listing
  -> listing reaches the API
  -> listing persists
  -> BUYER retrieves the same listing
  -> price + location + listing context are visible
  -> buyer interaction intent is recorded
  -> connectivity is interrupted
  -> a new producer action/listing survives locally as PENDING
  -> browser refresh does not lose the pending operation
  -> connectivity returns
  -> pending operation is replayed exactly once
  -> server persistence is confirmed
  -> client marks the operation SYNCED
  -> receipt bundle proves every transition
```

This contract deliberately reuses the existing marketplace and action-log surfaces. It does not introduce a second marketplace, AI recommendation layer, blockchain, agent swarm, or new frontend.

## 2. Actors

The demo may describe the perspectives as **Producer** and **Buyer**, but the current repository does not implement those as enforced auth roles.

Until role enforcement exists, receipts must say:
- `producer perspective`
- `buyer perspective`

Do not claim an implemented Farmer/Buyer RBAC model from the current `user/admin` auth schema.

## 3. Listing payload contract

Minimum fields required for a sale listing:

```json
{
  "title": "Fresh Spinach",
  "description": "Harvested this morning",
  "price": 25,
  "type": "sale",
  "category": "vegetables",
  "location": "Khayelitsha",
  "clientMutationId": "<stable client-generated id>"
}
```

Rules:
- `title`: required non-empty string
- `location`: required non-empty string
- `type`: `sale` or `swap`
- `category`: current supported marketplace category
- `price`: required positive number for `sale`; nullable/ignored for `swap`
- `clientMutationId`: required for queued/replayed writes so reconnect cannot create duplicates

The server-assigned record must retain a stable `id`.

## 4. Buyer intent contract

The existing market button currently records a generic `market` action. For this readiness path, the minimum acceptable buyer-intent receipt is:

```json
{
  "type": "market",
  "listingId": "<listing id>",
  "description": "<bounded interaction description>",
  "value": 25,
  "unit": "ZAR",
  "location": "Khayelitsha"
}
```

A click is not a completed sale. External wording must be **interaction intent recorded**, not transaction completed, payment completed, procurement completed, or revenue earned.

## 5. Offline contract

Current behavior is only local fallback. P1 locks the minimum behavior required to make the README's store-and-forward statement true.

### Storage

Use the application's existing browser-local persistence surface. Do not introduce a new database merely for the demo.

A pending mutation must contain:
- `clientMutationId`
- operation type
- endpoint
- payload
- creation timestamp
- sync status: `pending | synced | failed`
- last error metadata that does not include secrets

### Offline create

When the API cannot be reached:
1. the listing/action is displayed locally;
2. the pending mutation is written to persistent browser storage;
3. the UI may label it pending;
4. refresh must preserve it;
5. it must not be represented as server-persisted.

### Reconnect

When connectivity returns:
1. replay pending mutations;
2. server treats `clientMutationId` idempotently;
3. successful persistence returns the server record;
4. local pending record becomes synced and is removed/archived from the active queue;
5. buyer retrieval must surface the same server record.

### Conflict policy

For this demo, queued operations are **create-only**. Update/merge conflicts are outside the IAOM demo path and remain HOLD. Idempotency is required so reconnect/retry does not duplicate a create.

## 6. Required receipt chain

| Receipt | Required evidence | Pass condition |
|---|---|---|
| R1 | producer form submission | exact bounded payload captured |
| R2 | API create | 201 + stable server record id |
| R3 | persistence | record present in active server datastore |
| R4 | buyer discovery | GET retrieves exact listing id/data |
| R5 | buyer intent | action request contains listing id and is persisted |
| R6 | offline interruption | request failure is observable; no synthetic success |
| R7 | local pending persistence | pending mutation survives refresh |
| R8 | reconnect replay | queued mutation is sent after connectivity returns |
| R9 | idempotency | replay/retry produces one server record, not duplicates |
| R10 | final retrieval | synced record is retrievable from server |
| R11 | queue state | pending item becomes synced/cleared |
| R12 | receipt bundle | timestamps + request/result + persistence evidence assembled |

If any receipt is missing, the corresponding capability remains HOLD.

## 7. Explicit non-goals for IAOM demo

Not required for this proof:
- payment settlement
- delivery dispatch
- logistics optimization
- crop recommendation AI
- blockchain provenance
- producer verification
- price verification
- cold-chain emergency workflow
- extension-officer workflow
- multi-device conflict resolution
- field-scale user metrics

Those may be future pilot questions, but they cannot be smuggled into the November claim set.

## 8. Verification order

1. server validation + idempotent listing create
2. listing create/retrieve persistence test
3. buyer intent binding + persistence test
4. client queue persistence
5. reconnect replay
6. refresh survival
7. build/lint/runtime receipt
8. live browser demo capture

## 9. Current status against contract

| Transition | Status |
|---|---|
| form -> addListing | KNOWN source path |
| addListing -> POST /api/market | KNOWN source path |
| POST -> lowdb write | KNOWN source path |
| GET -> buyer render | KNOWN source path |
| buyer click -> POST /api/actions | KNOWN source path |
| buyer action bound to listing id | ABSENT |
| market invalid-input rejection | ABSENT |
| stable idempotency key | ABSENT |
| offline local listing fallback | PARTIAL |
| persistent pending queue | ABSENT |
| refresh survival of local market state | SOURCE-PARTIAL; runtime unverified |
| reconnect replay | ABSENT |
| exactly-once replay | ABSENT |
| end-to-end runtime receipt | ABSENT |

## 10. Gate to P2

P2 may change code only to make this contract provable and to establish the minimum test/runtime floor. Any proposed change that does not support a receipt above is deferred.

**P1 status: LOCKED.**

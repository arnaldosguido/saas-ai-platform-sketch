# SaaS AI Platform Sketch

Repository di studio per rappresentare una possibile architettura di una piattaforma SaaS B2B AI‑native.

Questo repo è pensato per essere **navigato rapidamente durante una discussione architetturale**.

## Entry point consigliato

flusso architetturale:

Frontend page
→ [DashboardPage.tsx](frontend/src/pages/DashboardPage.tsx)

React data hook
→ [useOrganizationInsights.ts](frontend/src/features/analytics/hooks/useOrganizationInsights.ts)

Frontend API client
→ [client.ts](frontend/src/api/client.ts)

Backend API endpoint
→ [views.py](backend/app/apps/analytics/api/views.py)

Service layer
→ [insight_service.py](backend/app/apps/analytics/services/insight_service.py)

AI orchestration
→ [insight_orchestrator.py](ai/orchestrator/insight_orchestrator.py)

## Architecture notes

Architettura descritta in modo più discorsivo qui:

→ [Architecture Notes](docs/architecture-notes.md)

## Obiettivi architetturali

- Features Vertical Slicing / microservices ready
- multi-tenancy
- modular monolith backend
- frontend React organizzato per feature
- API-first design
- AI orchestration separata concettualmente dal core applicativo
- async processing per workload pesanti

```text
| FRONT
Page                - ui
 → Hook             - state
  → API client      - http integration
| BACK
   → View           - http adapter
     → Service      - logic
       → AI Orch.   - workflow
```
backend exploded:
```text
backend
└ analytics
   ├ api/views.py
   │
   │   HTTP adapter
   │
   ↓
   services/insight_service.py
   │
   │   application logic
   │
   ↓
   ai/orchestrator
   │
   │   AI workflow
   │
   ↓
   models.py
   │
   │   data access
```
con async worker
```text
FRONT
Page                - UI
 → Hook             - server state / polling / websocket state
  → API client      - HTTP integration

BACK
   → View           - HTTP adapter
     → Service      - application logic
       → Queue      - job dispatch
         → Worker   - async execution
           → AI Orch.- AI workflow
             → Models / Vector DB / LLM

BACK STATUS CHANNEL
   → WebSocket consumer - push updates
```

```text
FRONT
Page                - UI
                    (React + TypeScript + Vite / Next.js opzionale)

 → Hook             - server state / polling / websocket state
                    (React Query / TanStack Query + custom hooks + WebSocket client)

  → API client      - HTTP integration
                    (Axios / Fetch API + OpenAPI client opzionale)


BACK
   → View           - HTTP adapter
                    (Django REST Framework - DRF)
     → Service      - application logic
                    (Python services layer - Django services / pure modules)
      --------------------------------------- async
       → Queue      - job dispatch
                    (Redis + Celery / RQ)
         → Worker   - async execution
                    (Celery workers / Python workers)
           → AI Orch. - AI workflow
                    (LangChain / LlamaIndex / custom orchestration layer)
             → Models / Vector DB / LLM
                    (OpenAI / Anthropic / local models)
                    (pgvector / Pinecone / Weaviate)

BACK STATUS CHANNEL
   → WebSocket consumer - push updates
                    (Django Channels / FastAPI WS / Socket.io)
```

## Stack di riferimento

- Frontend: React + TypeScript
- Backend: Django + DRF
- Async: task queue / workers
- AI layer: orchestration + retrieval + LLM provider adapter

## Nota

Questo repository non è una demo completa ma uno **sketch architetturale** per mostrare:

- confini applicativi
- layering
- separazione dei domini
- integrazione AI

L'obiettivo è rendere **concreta l'architettura nel codice**, non implementare una piattaforma funzionante.
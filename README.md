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

| FRONT
Page                - ui
 → Hook             - state
  → API client      - http integration
| BACK
   → View           - http adapter
     → Service      - logic
       → AI Orch.   - workflow

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
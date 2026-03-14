# Architecture Notes

Questo repository non rappresenta una applicazione completa ma uno sketch architetturale.

L'obiettivo è mostrare:

- separazione dei domini
- layering applicativo
- integrazione AI
- struttura frontend per feature

---

# Backend

Il backend è pensato come **modular monolith Django**.

Struttura:

apps/
    identity
    surveys
    analytics
    tenancy

Ogni dominio contiene:

- api
- services
- domain
- models

Questo evita che la business logic finisca nelle view.

---

# Frontend

Il frontend è organizzato **per feature di dominio**.

features/
    analytics
    surveys
    auth

Ogni feature contiene:

- api
- hooks
- components

Questo rende il progetto più scalabile rispetto a strutture puramente tecniche.

---

# AI Layer

Il layer AI è separato concettualmente dal core applicativo.

ai/
    orchestrator
    rag
    providers

Questo consente di isolare:

- prompt building
- retrieval
- model provider

dal resto del backend.

---

# Async workloads

Operazioni costose (AI generation, analytics computation) dovrebbero essere gestite tramite worker asincroni.

workers/
    tasks
from ai.orchestrator.insight_orchestrator import InsightOrchestrator


class InsightService:
    def list_organization_insights(self, tenant_id: str, actor_user_id: str):
        # In un progetto reale qui ci sarebbero:
        # - authorization checks
        # - retrieval dati analytics
        # - policy di tenant isolation
        # - eventuale caching / async orchestration
        orchestrator = InsightOrchestrator()

        return orchestrator.build_organization_insights(
            tenant_id=tenant_id,
            actor_user_id=actor_user_id,
        )
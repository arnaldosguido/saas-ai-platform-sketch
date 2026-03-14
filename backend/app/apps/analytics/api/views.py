from rest_framework.response import Response
from rest_framework.views import APIView

from apps.analytics.services.insight_service import InsightService


class OrganizationInsightsView(APIView):
    def get(self, request):
        tenant_id = request.tenant.id
        user_id = request.user.id

        service = InsightService()
        insights = service.list_organization_insights(
            tenant_id=tenant_id,
            actor_user_id=user_id,
        )

        return Response(insights)
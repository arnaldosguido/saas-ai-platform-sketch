class TenantMiddleware:
    """
    Middleware responsabile della risoluzione del tenant
    per ogni request.

    In un sistema SaaS reale questo potrebbe usare:
    - subdomain (tenant.example.com)
    - header
    - claim JWT
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        tenant_id = self.resolve_tenant(request)

        # In un sistema reale qui potremmo:
        # - caricare tenant dal database
        # - impostare search_path postgres
        # - salvare tenant nel request context
        request.tenant = type("Tenant", (), {"id": tenant_id})

        response = self.get_response(request)

        return response

    def resolve_tenant(self, request):
        """
        Placeholder di risoluzione tenant.

        In un sistema reale potrebbe usare:
        - subdomain
        - token
        - header
        """

        host = request.get_host()

        # esempio: acme.platform.com -> acme
        tenant = host.split(".")[0]

        return tenant
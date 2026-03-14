import { useOrganizationInsights } from "../features/analytics/hooks/useOrganizationInsights";

export function DashboardPage() {

  const { data, isLoading, error } = useOrganizationInsights();

  if (isLoading) {
    return <div>Loading insights...</div>;
  }

  if (error) {
    return <div>Error loading insights</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <section>
        <h2>Organization Insights</h2>

        {data?.map((insight) => (
          <div key={insight.id}>
            <h3>{insight.title}</h3>
            <p>{insight.summary}</p>
          </div>
        ))}
      </section>

    </div>
  );
}
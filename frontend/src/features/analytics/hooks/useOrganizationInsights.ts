import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/client";

export type OrganizationInsight = {
  id: string;
  title: string;
  summary: string;
  confidence: number;
};

async function fetchOrganizationInsights(): Promise<OrganizationInsight[]> {
  return apiClient.get<OrganizationInsight[]>("/analytics/organization-insights");
}

export function useOrganizationInsights() {
  return useQuery({
    queryKey: ["organization-insights"],
    queryFn: fetchOrganizationInsights,
    staleTime: 60_000,
  });
}
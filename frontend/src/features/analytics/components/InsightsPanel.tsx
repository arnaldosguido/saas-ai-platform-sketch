import React from 'react';
import { useOrganizationInsights } from '../hooks/useOrganizationInsights';
import { Card } from '@/components/ui/Card'; // Esempio di alias per componenti condivisi

interface InsightsPanelProps {
  orgId: string;
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ orgId }) => {
  const { data, isLoading, isError, error } = useOrganizationInsights(orgId);

  // 1. Guard Clauses: Gestione pulita degli stati limite
  if (isLoading) return <div className="animate-pulse">Analizzando i dati AI...</div>;
  
  if (isError) {
    return (
      <div className="text-red-500">
        Errore nel caricamento: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  // 2. Render principale: Logica di business minima, focus sulla visualizzazione
  return (
    <Card title="AI Insights Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section>
          <h3>Trend di Risposta</h3>
          <p>{data?.trendDescription}</p>
        </section>
        
        <section>
          <span className="text-sm text-gray-400">Generato il: {data?.generatedAt}</span>
        </section>
      </div>
    </Card>
  );
};
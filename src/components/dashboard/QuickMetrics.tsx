import { useMetricsData } from "./hooks/useMetricsData";
import { MetricCard } from "./metrics/MetricCard";
import { MetricsLoading } from "./metrics/MetricsLoading";
import { MetricsError } from "./metrics/MetricsError";

interface QuickMetricsProps {
  userRole?: string;
}

export const QuickMetrics = ({ userRole }: QuickMetricsProps) => {
  const { data: metrics, isLoading, error } = useMetricsData();

  if (error) {
    return <MetricsError />;
  }

  if (isLoading) {
    return <MetricsLoading />;
  }

  return (
    <div>
      <h2 className="text-base sm:text-lg font-semibold text-construction-900 mb-3 sm:mb-4">Quick Metrics</h2>
      <div className="grid gap-2 sm:gap-4 grid-cols-2 lg:grid-cols-3">
        <MetricCard
          value={metrics?.activeProjects || 0}
          trend={metrics?.trends.activeProjects || 0}
          title={userRole === "gc" ? "Active Projects" : "Available Projects"}
          description={userRole === "gc" ? 
            "Number of ongoing projects that are currently accepting bids or in progress." :
            "Number of projects available for bidding."
          }
          metricType="activeProjects"
          className="border-primary/20 hover:border-primary/40 transition-colors"
        />

        <MetricCard
          value={metrics?.totalBids || 0}
          trend={metrics?.trends.totalBids || 0}
          title={userRole === "gc" ? "Total Bids" : "Your Bids"}
          description={userRole === "gc" ? 
            "Total number of bid invitations sent to subcontractors across all projects." :
            "Total number of bids you've submitted or been invited to."
          }
          metricType="totalBids"
          className="border-secondary/20 hover:border-secondary/40 transition-colors"
        />

        <MetricCard
          value={metrics?.responseRate || 0}
          trend={metrics?.trends.responseRate || 0}
          title="Response Rate"
          description={userRole === "gc" ? 
            "The percentage of subcontractors who have responded to your bid invitations. Higher rates indicate better engagement." :
            "The percentage of bid invitations you've responded to. Higher rates may improve your visibility to contractors."
          }
          metricType="responseRate"
          className="border-accent/20 hover:border-accent/40 transition-colors col-span-2 lg:col-span-1"
        />
      </div>
    </div>
  );
};
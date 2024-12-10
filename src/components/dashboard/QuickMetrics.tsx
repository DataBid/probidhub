import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowUp, ArrowDown, HelpCircle, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricsData {
  activeProjects: number;
  totalBids: number;
  responseRate: number;
  trends: {
    activeProjects: number;
    totalBids: number;
    responseRate: number;
  };
}

interface QuickMetricsProps {
  userRole?: string;
}

export const QuickMetrics = ({ userRole }: QuickMetricsProps) => {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      console.log('Fetching dashboard metrics...');
      
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select(`
          *,
          bids (
            id,
            status
          )
        `);

      if (projectsError) {
        console.error('Error fetching projects:', projectsError);
        throw projectsError;
      }

      // Calculate current metrics
      const activeProjects = projects?.filter(p => p.stage === 'active').length || 0;
      const totalBids = projects?.reduce((acc, project) => acc + (project.bids?.length || 0), 0) || 0;
      
      const totalResponses = projects?.reduce((acc, project) => {
        const respondedBids = project.bids?.filter(bid => bid.status !== 'pending').length || 0;
        return acc + respondedBids;
      }, 0) || 0;
      
      const responseRate = totalBids > 0 ? Math.round((totalResponses / totalBids) * 100) : 0;

      // Simulate trend data (in a real app, you'd fetch historical data)
      const trends = {
        activeProjects: 5,
        totalBids: -2,
        responseRate: 3
      };

      return {
        activeProjects,
        totalBids,
        responseRate,
        trends
      } as MetricsData;
    },
    gcTime: 30 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error loading metrics</AlertTitle>
        <AlertDescription>
          There was a problem loading your metrics. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-construction-900 mb-3 sm:mb-4">Quick Metrics</h2>
        <div className="grid gap-2 sm:gap-4 grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-white">
              <CardContent className="p-3 sm:p-4 lg:pt-6">
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return <ArrowUp className="w-4 h-4 text-green-500" />;
    }
    return <ArrowDown className="w-4 h-4 text-red-500" />;
  };

  const getMetricColor = (metric: string, value: number) => {
    switch (metric) {
      case 'responseRate':
        return value < 50 ? 'text-red-600' : value < 75 ? 'text-yellow-600' : 'text-green-600';
      case 'activeProjects':
        return value > 0 ? 'text-green-600' : 'text-yellow-600';
      case 'totalBids':
        return value > 5 ? 'text-green-600' : 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const MetricTooltip = ({ title, description }: { title: string; description: string }) => (
    <div className="flex items-center gap-1">
      <span>{title}</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[200px] text-sm">
            <p>{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (
    <div>
      <h2 className="text-base sm:text-lg font-semibold text-construction-900 mb-3 sm:mb-4">Quick Metrics</h2>
      <div className="grid gap-2 sm:gap-4 grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-3 sm:p-4 lg:pt-6">
            <div className="flex items-center justify-between mb-1">
              <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${getMetricColor('activeProjects', metrics?.activeProjects || 0)}`}>
                {metrics?.activeProjects || 0}
              </div>
              {metrics?.trends && getTrendIcon(metrics.trends.activeProjects)}
            </div>
            <MetricTooltip 
              title={userRole === "gc" ? "Active Projects" : "Available Projects"}
              description={userRole === "gc" ? 
                "Number of ongoing projects that are currently accepting bids or in progress." :
                "Number of projects available for bidding."
              }
            />
          </CardContent>
        </Card>

        <Card className="bg-white border-secondary/20 hover:border-secondary/40 transition-colors">
          <CardContent className="p-3 sm:p-4 lg:pt-6">
            <div className="flex items-center justify-between mb-1">
              <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${getMetricColor('totalBids', metrics?.totalBids || 0)}`}>
                {metrics?.totalBids || 0}
              </div>
              {metrics?.trends && getTrendIcon(metrics.trends.totalBids)}
            </div>
            <MetricTooltip 
              title={userRole === "gc" ? "Total Bids" : "Your Bids"}
              description={userRole === "gc" ? 
                "Total number of bid invitations sent to subcontractors across all projects." :
                "Total number of bids you've submitted or been invited to."
              }
            />
          </CardContent>
        </Card>

        <Card className="bg-white border-accent/20 hover:border-accent/40 transition-colors col-span-2 lg:col-span-1">
          <CardContent className="p-3 sm:p-4 lg:pt-6">
            <div className="flex items-center justify-between mb-1">
              <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${getMetricColor('responseRate', metrics?.responseRate || 0)}`}>
                {metrics?.responseRate || 0}%
              </div>
              {metrics?.trends && getTrendIcon(metrics.trends.responseRate)}
            </div>
            <MetricTooltip 
              title="Response Rate"
              description={userRole === "gc" ? 
                "The percentage of subcontractors who have responded to your bid invitations. Higher rates indicate better engagement." :
                "The percentage of bid invitations you've responded to. Higher rates may improve your visibility to contractors."
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

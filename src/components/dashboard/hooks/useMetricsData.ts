import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface MetricsData {
  activeProjects: number;
  totalBids: number;
  responseRate: number;
  trends: {
    activeProjects: number;
    totalBids: number;
    responseRate: number;
  };
}

export const useMetricsData = () => {
  return useQuery({
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
};
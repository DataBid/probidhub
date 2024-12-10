import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { subDays, format } from "date-fns";

export const useAnalyticsData = (timeRange: string) => {
  return useQuery({
    queryKey: ['dashboard-analytics', timeRange],
    queryFn: async () => {
      console.log('AnalyticsSnapshot: Fetching analytics data for last', timeRange, 'days...');
      const startDate = subDays(new Date(), parseInt(timeRange));
      
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select(`
          id,
          title,
          created_at,
          bids (
            id,
            status,
            created_at
          )
        `)
        .gte('created_at', startDate.toISOString());

      if (projectsError) {
        console.error('AnalyticsSnapshot: Error fetching projects:', projectsError);
        throw projectsError;
      }

      const responseRateData = projects?.map(project => {
        const totalBids = project.bids?.length || 0;
        const respondedBids = project.bids?.filter(bid => bid.status !== 'pending').length || 0;
        const responseRate = totalBids > 0 ? (respondedBids / totalBids) * 100 : 0;

        return {
          name: project.title.length > 10 ? project.title.substring(0, 10) + '...' : project.title,
          fullTitle: project.title,
          responseRate: parseFloat(responseRate.toFixed(1)),
          totalBids,
          date: format(new Date(project.created_at), 'MMM dd')
        };
      }) || [];

      console.log('AnalyticsSnapshot: Processed analytics data:', responseRateData);
      return responseRateData;
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
  });
};
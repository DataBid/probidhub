import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export const TotalBidsChart = () => {
  const { data: analyticsData } = useQuery({
    queryKey: ['dashboard-analytics'],
    queryFn: async () => {
      console.log('Fetching analytics data...');
      
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select(`
          id,
          title,
          bids (
            id,
            status,
            created_at
          )
        `);

      if (projectsError) {
        console.error('Error fetching projects:', projectsError);
        throw projectsError;
      }

      const responseRateData = projects?.map(project => {
        const totalBids = project.bids?.length || 0;
        return {
          name: project.title.length > 15 ? project.title.substring(0, 15) + '...' : project.title,
          totalBids
        };
      }) || [];

      console.log('Processed analytics data:', responseRateData);
      return responseRateData;
    }
  });

  return (
    <Card className="p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-construction-900 mb-4">Total Bids per Project</h2>
      <ChartContainer className="h-[200px] sm:h-[250px] -ml-4 sm:ml-0" config={{}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analyticsData || []}>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              width={40}
            />
            <ChartTooltip />
            <Bar 
              dataKey="totalBids" 
              fill="#0891b2" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};
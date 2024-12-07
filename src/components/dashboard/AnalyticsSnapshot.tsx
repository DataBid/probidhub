import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export const AnalyticsSnapshot = () => {
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
        const respondedBids = project.bids?.filter(bid => bid.status !== 'pending').length || 0;
        const responseRate = totalBids > 0 ? (respondedBids / totalBids) * 100 : 0;

        return {
          name: project.title.length > 10 ? project.title.substring(0, 10) + '...' : project.title,
          responseRate,
          totalBids
        };
      }) || [];

      console.log('Processed analytics data:', responseRateData);
      return responseRateData;
    }
  });

  return (
    <Card className="p-3 sm:p-6 w-full">
      <h2 className="text-base sm:text-lg font-semibold text-construction-900 mb-3 sm:mb-4">Analytics Overview</h2>
      <Tabs defaultValue="response-rate" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="response-rate">Response Rate</TabsTrigger>
          <TabsTrigger value="total-bids">Total Bids</TabsTrigger>
        </TabsList>
        
        <TabsContent value="response-rate">
          <ChartContainer className="h-[250px] sm:h-[300px] w-full" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData || []} margin={{ top: 5, right: 10, bottom: 45, left: 30 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  unit="%" 
                  tick={{ fontSize: 10 }}
                  width={30}
                />
                <ChartTooltip />
                <Line 
                  type="monotone" 
                  dataKey="responseRate" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: "#2563eb" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>

        <TabsContent value="total-bids">
          <ChartContainer className="h-[250px] sm:h-[300px] w-full" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData || []} margin={{ top: 5, right: 10, bottom: 45, left: 30 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  width={30}
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
        </TabsContent>
      </Tabs>
    </Card>
  );
};
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
          name: project.title.length > 15 ? project.title.substring(0, 15) + '...' : project.title,
          responseRate,
          totalBids
        };
      }) || [];

      console.log('Processed analytics data:', responseRateData);
      return responseRateData;
    }
  });

  return (
    <Card className="p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-construction-900 mb-4">Analytics Overview</h2>
      <Tabs defaultValue="response-rate" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="response-rate">Response Rate</TabsTrigger>
          <TabsTrigger value="total-bids">Total Bids</TabsTrigger>
        </TabsList>
        
        <TabsContent value="response-rate" className="mt-4">
          <ChartContainer className="h-[300px] -ml-4 sm:ml-0" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData || []}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  unit="%" 
                  tick={{ fontSize: 12 }}
                  width={40}
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

        <TabsContent value="total-bids" className="mt-4">
          <ChartContainer className="h-[300px] -ml-4 sm:ml-0" config={{}}>
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
        </TabsContent>
      </Tabs>
    </Card>
  );
};
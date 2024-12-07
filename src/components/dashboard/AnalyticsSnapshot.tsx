import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { AlertOctagon } from "lucide-react";

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
          totalBids,
          isLowPerforming: responseRate < 50
        };
      }) || [];

      console.log('Processed analytics data:', responseRateData);
      return responseRateData;
    }
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-lg font-semibold text-construction-900 px-2 sm:px-0">Analytics Snapshot</h2>
      
      <div className="flex flex-col space-y-4 sm:space-y-6">
        {/* Response Rate Chart */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-sm font-medium mb-4">Subcontractor Response Rate</h3>
          <ChartContainer className="h-[200px] sm:h-[250px] -ml-4 sm:ml-0" config={{}}>
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
        </Card>

        {/* Total Bids Chart */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-sm font-medium mb-4">Total Bids per Project</h3>
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
      </div>

      {/* Low Performing Projects */}
      <Card className="p-4 sm:p-6">
        <h3 className="text-sm font-medium mb-4">Low Performing Projects</h3>
        <div className="space-y-3 sm:space-y-4">
          {analyticsData?.filter(project => project.isLowPerforming).map((project) => (
            <div 
              key={project.name}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-red-50 rounded-lg border border-red-100"
            >
              <div className="flex items-center gap-3 mb-2 sm:mb-0">
                <AlertOctagon className="text-red-500 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-900">{project.name}</p>
                  <p className="text-sm text-red-600">Response rate: {project.responseRate.toFixed(1)}%</p>
                </div>
              </div>
              <div className="text-sm text-red-600 ml-8 sm:ml-0">
                {project.totalBids} total bids
              </div>
            </div>
          ))}
          {!analyticsData?.some(project => project.isLowPerforming) && (
            <p className="text-sm text-gray-500 text-center py-4">
              No low-performing projects at the moment
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};
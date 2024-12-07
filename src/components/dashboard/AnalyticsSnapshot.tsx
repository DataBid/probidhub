import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { subDays, format } from "date-fns";
import { AnalyticsControls } from "./analytics/AnalyticsControls";
import { AnalyticsLineChart } from "./analytics/AnalyticsLineChart";
import { AnalyticsBarChart } from "./analytics/AnalyticsBarChart";

export const AnalyticsSnapshot = () => {
  const [timeRange, setTimeRange] = useState('7');
  const [chartType, setChartType] = useState('line');

  const { data: analyticsData } = useQuery({
    queryKey: ['dashboard-analytics', timeRange],
    queryFn: async () => {
      console.log('Fetching analytics data for last', timeRange, 'days...');
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
        console.error('Error fetching projects:', projectsError);
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

      console.log('Processed analytics data:', responseRateData);
      return responseRateData;
    }
  });

  const renderChart = (data: any[], dataKey: string) => {
    if (chartType === 'line') {
      return <AnalyticsLineChart data={data} dataKey={dataKey} />;
    }
    return <AnalyticsBarChart data={data} dataKey={dataKey} />;
  };

  return (
    <Card className="p-3 sm:p-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-construction-900">Analytics Overview</h2>
        <AnalyticsControls 
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          chartType={chartType}
          setChartType={setChartType}
        />
      </div>

      <Tabs defaultValue="response-rate" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="response-rate">Response Rate</TabsTrigger>
          <TabsTrigger value="total-bids">Total Bids</TabsTrigger>
        </TabsList>
        
        <TabsContent value="response-rate">
          {renderChart(analyticsData || [], 'responseRate')}
        </TabsContent>

        <TabsContent value="total-bids">
          {renderChart(analyticsData || [], 'totalBids')}
        </TabsContent>
      </Tabs>
    </Card>
  );
};
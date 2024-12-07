import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { subDays, format } from "date-fns";

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
    const ChartComponent = chartType === 'line' ? LineChart : BarChart;
    const DataComponent = chartType === 'line' ? Line : Bar;

    return (
      <ChartContainer className="h-[250px] sm:h-[300px] w-full" config={{}}>
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data || []} margin={{ top: 5, right: 10, bottom: 45, left: 30 }}>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              unit={dataKey === 'responseRate' ? "%" : ""} 
              tick={{ fontSize: 10 }}
              width={30}
            />
            <ChartTooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 border rounded-lg shadow-lg">
                      <p className="font-semibold">{payload[0].payload.fullTitle}</p>
                      <p className="text-sm text-gray-600">{label}</p>
                      <p className="text-sm">
                        {dataKey === 'responseRate' ? 'Response Rate' : 'Total Bids'}: 
                        <span className="font-semibold ml-1">
                          {payload[0].value}{dataKey === 'responseRate' ? '%' : ''}
                        </span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <DataComponent 
              type={chartType === 'line' ? "monotone" : undefined}
              dataKey={dataKey} 
              stroke={dataKey === 'responseRate' ? "#2563eb" : "#0891b2"}
              fill={dataKey === 'responseRate' ? "#2563eb" : "#0891b2"}
              strokeWidth={chartType === 'line' ? 2 : undefined}
              dot={chartType === 'line' ? { fill: dataKey === 'responseRate' ? "#2563eb" : "#0891b2" } : undefined}
              radius={chartType === 'bar' ? [4, 4, 0, 0] : undefined}
            />
          </ChartComponent>
        </ResponsiveContainer>
      </ChartContainer>
    );
  };

  return (
    <Card className="p-3 sm:p-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-construction-900">Analytics Overview</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
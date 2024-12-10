import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { subDays, format } from "date-fns";
import { AnalyticsControls } from "./analytics/AnalyticsControls";
import { AnalyticsLineChart } from "./analytics/AnalyticsLineChart";
import { AnalyticsBarChart } from "./analytics/AnalyticsBarChart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { downloadCSV, prepareAnalyticsData } from "@/utils/exportUtils";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalyticsSnapshotProps {
  userRole?: string;
}

export const AnalyticsSnapshot = ({ userRole }: AnalyticsSnapshotProps) => {
  const [timeRange, setTimeRange] = useState('7');
  const [chartType, setChartType] = useState('line');
  const { toast } = useToast();

  const { data: analyticsData, isLoading } = useQuery({
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

  const handleExport = () => {
    if (!analyticsData?.length) {
      toast({
        title: "No data to export",
        description: "There is currently no data available for export.",
        variant: "destructive",
      });
      return;
    }
    
    const exportData = prepareAnalyticsData(analyticsData);
    downloadCSV(exportData, `analytics_${timeRange}days`);
    
    toast({
      title: "Export successful",
      description: "Your analytics data has been exported successfully.",
    });
  };

  const renderChart = (data: any[], dataKey: string) => {
    if (isLoading) {
      return <Skeleton className="h-[300px]" />;
    }
    
    if (chartType === 'line') {
      return <AnalyticsLineChart data={data} dataKey={dataKey} />;
    }
    return <AnalyticsBarChart data={data} dataKey={dataKey} />;
  };

  return (
    <Card className="p-3 sm:p-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-construction-900">
          {userRole === "gc" ? "Analytics Overview" : "Bid Performance Analytics"}
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <AnalyticsControls 
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            chartType={chartType}
            setChartType={setChartType}
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
            className="w-full sm:w-auto"
            disabled={isLoading || !analyticsData?.length}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="response-rate" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="response-rate">
            {userRole === "gc" ? "Response Rate" : "Acceptance Rate"}
          </TabsTrigger>
          <TabsTrigger value="total-bids">
            {userRole === "gc" ? "Total Bids" : "Your Bids"}
          </TabsTrigger>
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
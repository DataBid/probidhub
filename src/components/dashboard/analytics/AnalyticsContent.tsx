import { Skeleton } from "@/components/ui/skeleton";
import { AnalyticsLineChart } from "./AnalyticsLineChart";
import { AnalyticsBarChart } from "./AnalyticsBarChart";
import { AnalyticsPieChart } from "./AnalyticsPieChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface AnalyticsData {
  name: string;
  fullTitle: string;
  responseRate: number;
  totalBids: number;
  date: string;
}

interface AnalyticsContentProps {
  data: AnalyticsData[];
  isLoading: boolean;
  chartType: string;
  userRole?: string;
}

export const AnalyticsContent = ({
  data,
  isLoading,
  chartType,
  userRole,
}: AnalyticsContentProps) => {
  const renderChart = (chartData: AnalyticsData[], dataKey: string) => {
    if (isLoading) {
      return <Skeleton className="h-[300px]" />;
    }
    
    switch (chartType) {
      case 'line':
        return <AnalyticsLineChart data={chartData} dataKey={dataKey} />;
      case 'bar':
        return <AnalyticsBarChart data={chartData} dataKey={dataKey} />;
      case 'pie':
        return <AnalyticsPieChart data={chartData} dataKey={dataKey} />;
      default:
        return <AnalyticsLineChart data={chartData} dataKey={dataKey} />;
    }
  };

  const getMetricSummary = (dataKey: string) => {
    if (!data.length) return { current: 0, trend: 0 };
    
    const current = data[data.length - 1][dataKey];
    const previous = data[0][dataKey];
    const trend = ((current - previous) / previous) * 100;
    
    return {
      current: dataKey === 'responseRate' ? `${current}%` : current,
      trend: trend.toFixed(1)
    };
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">
              {userRole === "gc" ? "Response Rate" : "Acceptance Rate"}
            </div>
            <div className="text-2xl font-bold mt-2">
              {getMetricSummary('responseRate').current}
              <span className={`text-sm ml-2 ${
                Number(getMetricSummary('responseRate').trend) > 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {getMetricSummary('responseRate').trend}%
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">
              {userRole === "gc" ? "Total Bids" : "Your Bids"}
            </div>
            <div className="text-2xl font-bold mt-2">
              {getMetricSummary('totalBids').current}
              <span className={`text-sm ml-2 ${
                Number(getMetricSummary('totalBids').trend) > 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {getMetricSummary('totalBids').trend}%
              </span>
            </div>
          </CardContent>
        </Card>
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
          {renderChart(data || [], 'responseRate')}
        </TabsContent>

        <TabsContent value="total-bids">
          {renderChart(data || [], 'totalBids')}
        </TabsContent>
      </Tabs>
    </div>
  );
};
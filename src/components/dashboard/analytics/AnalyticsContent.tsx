import { Skeleton } from "@/components/ui/skeleton";
import { AnalyticsLineChart } from "./AnalyticsLineChart";
import { AnalyticsBarChart } from "./AnalyticsBarChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    
    if (chartType === 'line') {
      return <AnalyticsLineChart data={chartData} dataKey={dataKey} />;
    }
    return <AnalyticsBarChart data={chartData} dataKey={dataKey} />;
  };

  return (
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
  );
};
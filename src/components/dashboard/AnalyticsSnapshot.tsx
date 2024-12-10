import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { downloadCSV, prepareAnalyticsData } from "@/utils/exportUtils";
import { AnalyticsHeader } from "./analytics/AnalyticsHeader";
import { AnalyticsContent } from "./analytics/AnalyticsContent";
import { useAnalyticsData } from "./analytics/useAnalyticsData";

interface AnalyticsSnapshotProps {
  userRole?: string;
}

export const AnalyticsSnapshot = ({ userRole }: AnalyticsSnapshotProps) => {
  const [timeRange, setTimeRange] = useState('7');
  const [chartType, setChartType] = useState('line');
  const { toast } = useToast();

  const { data: analyticsData, isLoading } = useAnalyticsData(timeRange);

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

  return (
    <Card className="p-3 sm:p-6 w-full">
      <AnalyticsHeader
        userRole={userRole}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        chartType={chartType}
        setChartType={setChartType}
        onExport={handleExport}
        isExportDisabled={isLoading || !analyticsData?.length}
      />
      
      <AnalyticsContent
        data={analyticsData || []}
        isLoading={isLoading}
        chartType={chartType}
        userRole={userRole}
      />
    </Card>
  );
};
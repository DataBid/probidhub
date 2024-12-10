import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { AnalyticsControls } from "./AnalyticsControls";

interface AnalyticsHeaderProps {
  userRole?: string;
  timeRange: string;
  setTimeRange: (value: string) => void;
  chartType: string;
  setChartType: (value: string) => void;
  onExport: () => void;
  isExportDisabled: boolean;
}

export const AnalyticsHeader = ({
  userRole,
  timeRange,
  setTimeRange,
  chartType,
  setChartType,
  onExport,
  isExportDisabled,
}: AnalyticsHeaderProps) => {
  return (
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
          onClick={onExport}
          className="w-full sm:w-auto"
          disabled={isExportDisabled}
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};
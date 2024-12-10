import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, PieChart } from "lucide-react";

interface AnalyticsControlsProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  chartType: string;
  setChartType: (value: string) => void;
  viewMode?: string;
  setViewMode?: (value: string) => void;
}

export const AnalyticsControls = ({ 
  timeRange, 
  setTimeRange, 
  chartType, 
  setChartType,
  viewMode = "detailed",
  setViewMode
}: AnalyticsControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Time Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7">Last 7 Days</SelectItem>
          <SelectItem value="14">Last 14 Days</SelectItem>
          <SelectItem value="30">Last 30 Days</SelectItem>
          <SelectItem value="90">Last 90 Days</SelectItem>
          <SelectItem value="180">Last 6 Months</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2 p-1 border rounded-md">
        <Button
          variant={chartType === "line" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setChartType("line")}
          className="w-10 h-8 p-0"
        >
          <LineChart className="h-4 w-4" />
        </Button>
        <Button
          variant={chartType === "bar" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setChartType("bar")}
          className="w-10 h-8 p-0"
        >
          <BarChart className="h-4 w-4" />
        </Button>
        <Button
          variant={chartType === "pie" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setChartType("pie")}
          className="w-10 h-8 p-0"
        >
          <PieChart className="h-4 w-4" />
        </Button>
      </div>

      {setViewMode && (
        <Select value={viewMode} onValueChange={setViewMode}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="View Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="detailed">Detailed View</SelectItem>
            <SelectItem value="compact">Compact View</SelectItem>
            <SelectItem value="summary">Summary Only</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
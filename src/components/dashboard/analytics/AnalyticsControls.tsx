import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AnalyticsControlsProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  chartType: string;
  setChartType: (value: string) => void;
}

export const AnalyticsControls = ({ 
  timeRange, 
  setTimeRange, 
  chartType, 
  setChartType 
}: AnalyticsControlsProps) => {
  return (
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
  );
};
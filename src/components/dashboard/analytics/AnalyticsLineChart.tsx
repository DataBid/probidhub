import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ChartTooltipContent } from "./ChartTooltipContent";

interface AnalyticsLineChartProps {
  data: any[];
  dataKey: string;
}

export const AnalyticsLineChart = ({ data, dataKey }: AnalyticsLineChartProps) => {
  return (
    <ChartContainer className="h-[250px] sm:h-[300px] w-full" config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data || []} margin={{ top: 5, right: 10, bottom: 45, left: 30 }}>
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
          <ChartTooltip content={(props) => <ChartTooltipContent {...props} dataKey={dataKey} />} />
          <Line 
            type="monotone"
            dataKey={dataKey} 
            stroke={dataKey === 'responseRate' ? "#2563eb" : "#0891b2"}
            strokeWidth={2}
            dot={{ fill: dataKey === 'responseRate' ? "#2563eb" : "#0891b2" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
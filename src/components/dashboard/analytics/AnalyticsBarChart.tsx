import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ChartTooltipContent } from "./ChartTooltipContent";

interface AnalyticsBarChartProps {
  data: any[];
  dataKey: string;
}

export const AnalyticsBarChart = ({ data, dataKey }: AnalyticsBarChartProps) => {
  return (
    <ChartContainer className="h-[250px] sm:h-[300px] w-full" config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data || []} margin={{ top: 5, right: 10, bottom: 45, left: 30 }}>
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
          <Bar 
            dataKey={dataKey} 
            fill={dataKey === 'responseRate' ? "#2563eb" : "#0891b2"}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
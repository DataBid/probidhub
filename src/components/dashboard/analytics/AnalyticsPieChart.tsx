import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ChartTooltipContent } from "./ChartTooltipContent";

interface AnalyticsPieChartProps {
  data: any[];
  dataKey: string;
}

const COLORS = ['#2563eb', '#0891b2', '#0d9488', '#4f46e5'];

export const AnalyticsPieChart = ({ data, dataKey }: AnalyticsPieChartProps) => {
  const processedData = data.map(item => ({
    name: item.fullTitle,
    value: item[dataKey]
  }));

  return (
    <ChartContainer className="h-[250px] sm:h-[300px] w-full" config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={processedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={(props) => <ChartTooltipContent {...props} dataKey={dataKey} />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
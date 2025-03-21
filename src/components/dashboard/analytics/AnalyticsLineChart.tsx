
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Area, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ChartTooltipContent } from "./ChartTooltipContent";

interface AnalyticsLineChartProps {
  data: any[];
  dataKey: string;
}

export const AnalyticsLineChart = ({ data, dataKey }: AnalyticsLineChartProps) => {
  const getLineColors = (dataKey: string) => {
    switch(dataKey) {
      case 'responseRate':
        return { stroke: '#2563eb', fill: '#2563eb' };
      case 'totalBids':
        return { stroke: '#0891b2', fill: '#0891b2' };
      case 'activeProjects':
        return { stroke: '#10b981', fill: '#10b981' };
      default:
        return { stroke: '#2563eb', fill: '#2563eb' };
    }
  };

  const { stroke, fill } = getLineColors(dataKey);

  return (
    <ChartContainer className="h-[250px] sm:h-[300px] w-full" config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data || []} margin={{ top: 5, right: 10, bottom: 45, left: 30 }}>
          <defs>
            <linearGradient id={`lineGradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fill} stopOpacity={0.3}/>
              <stop offset="100%" stopColor={fill} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
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
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="none"
            fill={`url(#lineGradient-${dataKey})`}
            animationDuration={1500}
          />
          <Line 
            type="monotone"
            dataKey={dataKey} 
            stroke={stroke}
            strokeWidth={2}
            dot={{ fill: stroke, strokeWidth: 1, r: 4, strokeDasharray: '' }}
            activeDot={{ r: 6, stroke: stroke, strokeWidth: 1, fill: '#fff' }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

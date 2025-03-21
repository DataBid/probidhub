
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ChartTooltipContent } from "./ChartTooltipContent";
import { useState } from "react";

interface AnalyticsBarChartProps {
  data: any[];
  dataKey: string;
}

export const AnalyticsBarChart = ({ data, dataKey }: AnalyticsBarChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getBarFill = (dataKey: string) => {
    switch(dataKey) {
      case 'responseRate':
        return { gradient: ['#2563eb', '#4f46e5'] };
      case 'totalBids':
        return { gradient: ['#0891b2', '#0ea5e9'] };
      case 'activeProjects':
        return { gradient: ['#10b981', '#34d399'] };
      default:
        return { gradient: ['#2563eb', '#4f46e5'] };
    }
  };

  const { gradient } = getBarFill(dataKey);

  return (
    <ChartContainer className="h-[250px] sm:h-[300px] w-full" config={{}}>
      <defs>
        <linearGradient id={`barGradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradient[0]} stopOpacity={0.8}/>
          <stop offset="100%" stopColor={gradient[1]} stopOpacity={0.8}/>
        </linearGradient>
      </defs>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data || []} 
          margin={{ top: 5, right: 10, bottom: 45, left: 30 }}
          onMouseMove={(data) => {
            if (data.activeTooltipIndex !== undefined) {
              setActiveIndex(data.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
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
          <Bar 
            dataKey={dataKey} 
            fill={`url(#barGradient-${dataKey})`}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            className="transition-all duration-300"
            // Apply different opacity to the active bar
            opacity={activeIndex !== null ? data.map((_, index) => index === activeIndex ? 1 : 0.7) : 1}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};


import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ChartTooltipContent } from "./ChartTooltipContent";
import { useState } from "react";

interface AnalyticsPieChartProps {
  data: any[];
  dataKey: string;
}

// More visually appealing color palette
const COLORS = ['#2563eb', '#0891b2', '#0d9488', '#4f46e5', '#8b5cf6', '#d946ef'];

export const AnalyticsPieChart = ({ data, dataKey }: AnalyticsPieChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const processedData = data.map(item => ({
    name: item.fullTitle || item.name,
    value: item[dataKey]
  }));

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ChartContainer className="h-[250px] sm:h-[300px] w-full" config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={processedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            innerRadius={30}
            paddingAngle={4}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            animationBegin={0}
            animationDuration={1000}
          >
            {processedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="#fff"
                strokeWidth={2}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.7}
                className="transition-opacity duration-300"
              />
            ))}
          </Pie>
          <Tooltip 
            content={(props) => <ChartTooltipContent {...props} dataKey={dataKey} />}
            animationDuration={300}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle" 
            iconSize={10}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

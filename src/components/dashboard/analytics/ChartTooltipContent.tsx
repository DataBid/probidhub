import { TooltipProps } from "recharts";

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  dataKey: string;
}

export const ChartTooltipContent = ({ active, payload, label, dataKey }: ChartTooltipContentProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white p-2 border rounded-lg shadow-lg">
      <p className="font-semibold">{payload[0].payload.fullTitle}</p>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-sm">
        {dataKey === 'responseRate' ? 'Response Rate' : 'Total Bids'}: 
        <span className="font-semibold ml-1">
          {payload[0].value}{dataKey === 'responseRate' ? '%' : ''}
        </span>
      </p>
    </div>
  );
};
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricCardProps {
  value: number;
  trend: number;
  title: string;
  description: string;
  metricType: 'responseRate' | 'activeProjects' | 'totalBids';
  className?: string;
}

export const MetricCard = ({
  value,
  trend,
  title,
  description,
  metricType,
  className = "",
}: MetricCardProps) => {
  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return <ArrowUp className="w-4 h-4 text-green-500" />;
    }
    return <ArrowDown className="w-4 h-4 text-red-500" />;
  };

  const getMetricColor = (metric: string, value: number) => {
    switch (metric) {
      case 'responseRate':
        return value < 50 ? 'text-red-600' : value < 75 ? 'text-yellow-600' : 'text-green-600';
      case 'activeProjects':
        return value > 0 ? 'text-green-600' : 'text-yellow-600';
      case 'totalBids':
        return value > 5 ? 'text-green-600' : 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className={`bg-white ${className}`}>
      <CardContent className="p-3 sm:p-4 lg:pt-6">
        <div className="flex items-center justify-between mb-1">
          <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${getMetricColor(metricType, value)}`}>
            {metricType === 'responseRate' ? `${value}%` : value}
          </div>
          {getTrendIcon(trend)}
        </div>
        <div className="flex items-center gap-1">
          <span>{title}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px] text-sm">
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};
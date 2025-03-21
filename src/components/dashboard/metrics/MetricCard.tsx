
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, HelpCircle, TrendingUp, TrendingDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const [isHovered, setIsHovered] = useState(false);

  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return isHovered ? 
        <TrendingUp className="w-4 h-4 text-green-500 transition-transform duration-300 transform scale-110" /> :
        <ArrowUp className="w-4 h-4 text-green-500 transition-transform duration-300" />;
    }
    return isHovered ?
      <TrendingDown className="w-4 h-4 text-red-500 transition-transform duration-300 transform scale-110" /> :
      <ArrowDown className="w-4 h-4 text-red-500 transition-transform duration-300" />;
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
    <Card 
      className={cn(
        `bg-white transition-all duration-300 hover:shadow-md`,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-3 sm:p-4 lg:pt-6">
        <div className="flex items-center justify-between mb-1">
          <div 
            className={cn(
              `text-lg sm:text-xl lg:text-2xl font-bold transition-all duration-300`,
              getMetricColor(metricType, value),
              isHovered ? "transform scale-105" : ""
            )}
          >
            {metricType === 'responseRate' ? `${value}%` : value}
          </div>
          {getTrendIcon(trend)}
        </div>
        <div className="flex items-center gap-1">
          <span className="transition-all duration-300">{title}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className={cn(
                  "w-4 h-4 text-muted-foreground transition-all duration-300",
                  isHovered ? "text-primary" : ""
                )} />
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px] text-sm backdrop-blur-sm bg-white/90">
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

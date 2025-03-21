
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface BidResponseRateProps {
  responseRate: number;
  viewedRate?: number;
  respondedRate?: number;
  pendingRate?: number;
}

export const BidResponseRate = ({ 
  responseRate,
  viewedRate = 30,
  respondedRate = 40,
  pendingRate = 30
}: BidResponseRateProps) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-6 p-4 border rounded-lg bg-muted transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-construction-700 font-medium">Overall Bid Response Rate</span>
        <span className={cn(
          "text-construction-600 font-bold transition-all duration-500",
          responseRate > 70 ? "text-green-600" : 
          responseRate > 40 ? "text-yellow-600" : "text-red-600"
        )}>
          {responseRate.toFixed(1)}%
        </span>
      </div>
      
      {/* Segmented Progress Bar */}
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden flex">
        <div 
          className="bg-green-500 transition-all duration-1000 ease-out"
          style={{ width: animate ? `${viewedRate}%` : '0%' }}
        />
        <div 
          className="bg-yellow-500 transition-all duration-1000 ease-out delay-150"
          style={{ width: animate ? `${respondedRate}%` : '0%' }}
        />
        <div 
          className="bg-gray-400 transition-all duration-1000 ease-out delay-300"
          style={{ width: animate ? `${pendingRate}%` : '0%' }}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1 transition-opacity duration-500" style={{ opacity: animate ? 1 : 0 }}>
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-construction-600">Viewed ({viewedRate}%)</span>
        </div>
        <div className="flex items-center gap-1 transition-opacity duration-500 delay-100" style={{ opacity: animate ? 1 : 0 }}>
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-construction-600">Responded ({respondedRate}%)</span>
        </div>
        <div className="flex items-center gap-1 transition-opacity duration-500 delay-200" style={{ opacity: animate ? 1 : 0 }}>
          <div className="w-3 h-3 rounded-full bg-gray-400" />
          <span className="text-construction-600">Pending ({pendingRate}%)</span>
        </div>
      </div>
    </div>
  );
};

import { cn } from "@/lib/utils";

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
  return (
    <div className="mt-6 p-4 border rounded-lg bg-muted">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-construction-700 font-medium">Overall Bid Response Rate</span>
        <span className="text-construction-600">
          {responseRate.toFixed(1)}%
        </span>
      </div>
      
      {/* Segmented Progress Bar */}
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden flex">
        <div 
          className="bg-green-500 transition-all duration-300"
          style={{ width: `${viewedRate}%` }}
        />
        <div 
          className="bg-yellow-500 transition-all duration-300"
          style={{ width: `${respondedRate}%` }}
        />
        <div 
          className="bg-gray-400 transition-all duration-300"
          style={{ width: `${pendingRate}%` }}
        />
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-construction-600">Viewed ({viewedRate}%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-construction-600">Responded ({respondedRate}%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gray-400" />
          <span className="text-construction-600">Pending ({pendingRate}%)</span>
        </div>
      </div>
    </div>
  );
};
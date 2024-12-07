import { Progress } from "@/components/ui/progress";

interface BidResponseRateProps {
  responseRate: number;
}

export const BidResponseRate = ({ responseRate }: BidResponseRateProps) => {
  return (
    <div className="mt-6 p-4 border rounded-lg bg-muted">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-construction-700 font-medium">Overall Bid Response Rate</span>
        <span className="text-construction-600">
          {responseRate.toFixed(1)}%
        </span>
      </div>
      <Progress 
        value={responseRate}
        className="h-2"
      />
    </div>
  );
};
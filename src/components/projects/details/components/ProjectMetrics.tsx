import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProjectMetricsProps {
  project: any;
}

export const ProjectMetrics = ({ project }: ProjectMetricsProps) => {
  const totalBids = project.bids?.length || 0;
  const respondedBids = project.bids?.filter((bid: any) => bid.status === 'responded')?.length || 0;
  const responseRate = totalBids > 0 ? Math.round((respondedBids / totalBids) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 bg-white/50 backdrop-blur-sm rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-3 rounded-full">
          <CheckCircle className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Bids</p>
          <p className="text-2xl font-semibold">{totalBids}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-accent/10 p-3 rounded-full">
          <Clock className="w-6 h-6 text-accent" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Responded</p>
          <p className="text-2xl font-semibold">{respondedBids}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Response Rate</span>
          <span className="text-sm font-medium">{responseRate}%</span>
        </div>
        <Progress value={responseRate} className="h-2" />
      </div>
    </div>
  );
};
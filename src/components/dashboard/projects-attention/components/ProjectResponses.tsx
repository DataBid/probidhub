
import { MessageSquare, CheckCircle, Eye, Clock } from "lucide-react";
import { Project } from "../types";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getStatusDotColor } from "@/utils/statusColorUtils";

interface ProjectResponsesProps {
  project: Project;
}

export const ProjectResponses = ({ project }: ProjectResponsesProps) => {
  const totalBids = project.bids.length + project.pendingBids;
  const respondedBids = project.bids.filter(bid => bid.status === 'responded').length;
  const viewedBids = project.bids.filter(bid => bid.status === 'viewed').length;
  const pendingBids = totalBids - respondedBids - viewedBids;
  
  const responseRate = totalBids > 0 ? Math.round((respondedBids / totalBids) * 100) : 0;
  const viewedRate = totalBids > 0 ? Math.round((viewedBids / totalBids) * 100) : 0;
  const pendingRate = totalBids > 0 ? Math.round((pendingBids / totalBids) * 100) : 0;

  // Fix the issue with max being 0 by ensuring there's at least one bid
  const hasAnyBids = totalBids > 0;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-construction-500" />
          <span className="text-sm text-construction-700 font-medium">
            Response Rate: <span className="font-bold">{responseRate}%</span>
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {respondedBids}/{totalBids} Responses
        </span>
      </div>
      
      {hasAnyBids ? (
        <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="bg-green-500 h-full transition-all duration-500"
                  style={{ width: `${responseRate}%` }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-xs">
                  {respondedBids} Responded ({responseRate}%)
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="bg-blue-500 h-full transition-all duration-500"
                  style={{ width: `${viewedRate}%` }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-xs">
                  {viewedBids} Viewed ({viewedRate}%)
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="bg-gray-400 h-full transition-all duration-500"
                  style={{ width: `${pendingRate}%` }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-xs">
                  {pendingBids} Pending ({pendingRate}%)
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="text-xs text-muted-foreground px-2 py-3">No bids yet</div>
        </div>
      )}
      
      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${getStatusDotColor('responded')}`}></div>
          <span>Responded</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${getStatusDotColor('viewed')}`}></div>
          <span>Viewed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${getStatusDotColor('pending')}`}></div>
          <span>Pending</span>
        </div>
      </div>
    </div>
  );
};

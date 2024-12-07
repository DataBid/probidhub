import { MessageSquare } from "lucide-react";
import { Project } from "../types";

interface ProjectResponsesProps {
  project: Project;
}

export const ProjectResponses = ({ project }: ProjectResponsesProps) => {
  const getResponseCount = () => {
    return project.bids.filter(bid => bid.status === 'responded').length;
  };

  return (
    <div className="flex items-center gap-2">
      <MessageSquare className="h-4 w-4 text-construction-500" />
      <span className="text-sm text-construction-700">
        {getResponseCount()}/{project.bids.length + project.pendingBids} Responses
      </span>
    </div>
  );
};
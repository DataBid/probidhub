import { Calendar } from "lucide-react";
import { format, isPast } from "date-fns";
import { Project } from "../types";
import { isWithinDaysFromNow } from "../utils";

interface ProjectDeadlineProps {
  project: Project;
}

export const ProjectDeadline = ({ project }: ProjectDeadlineProps) => {
  const getDeadlineColor = () => {
    if (isPast(new Date(project.bids_due))) return "text-red-600";
    if (isWithinDaysFromNow(new Date(project.bids_due), 7)) return "text-yellow-600";
    return "text-construction-600";
  };

  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4" />
      <span className={`text-sm ${getDeadlineColor()}`}>
        {format(new Date(project.bids_due), "MMM d, yyyy")}
      </span>
    </div>
  );
};
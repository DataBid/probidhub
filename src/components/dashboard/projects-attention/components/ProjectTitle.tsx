import { useNavigate } from "react-router-dom";
import { AlertOctagon, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Project } from "../types";
import { isPast } from "date-fns";
import { isWithinDaysFromNow } from "../utils";

interface ProjectTitleProps {
  project: Project;
}

export const ProjectTitle = ({ project }: ProjectTitleProps) => {
  const navigate = useNavigate();

  const getStatusIcon = () => {
    if (project.issues.length > 0) {
      return <AlertOctagon className="h-5 w-5 text-red-500" />;
    }
    if (isPast(new Date(project.bids_due))) {
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
    if (isWithinDaysFromNow(new Date(project.bids_due), 7)) {
      return <Clock className="h-5 w-5 text-yellow-500" />;
    }
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };

  return (
    <div className="flex items-center gap-2 min-w-[200px]">
      {getStatusIcon()}
      <button 
        onClick={() => navigate(`/projects/${project.id}`)}
        className="font-medium text-primary hover:text-primary-hover hover:underline"
      >
        {project.title}
      </button>
    </div>
  );
};
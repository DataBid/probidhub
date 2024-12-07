import { isPast } from "date-fns";
import { Project } from "./types";
import { isWithinDaysFromNow } from "./utils";
import { ProjectTitle } from "./components/ProjectTitle";
import { ProjectDeadline } from "./components/ProjectDeadline";
import { ProjectResponses } from "./components/ProjectResponses";
import { ProjectIssues } from "./components/ProjectIssues";
import { ProjectActions } from "./components/ProjectActions";

interface ProjectAttentionItemProps {
  project: Project;
  onRefetch: () => void;
}

export const ProjectAttentionItem = ({ project, onRefetch }: ProjectAttentionItemProps) => {
  const getPriorityStyles = () => {
    if (project.issues.length > 0 || isPast(new Date(project.bids_due))) {
      return "border-red-200 bg-red-50";
    }
    if (isWithinDaysFromNow(new Date(project.bids_due), 7)) {
      return "border-yellow-200 bg-yellow-50";
    }
    return "border-gray-200 bg-white";
  };

  return (
    <div className={`flex flex-col lg:flex-row p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow ${getPriorityStyles()}`}>
      <div className="flex-1 space-y-3 lg:space-y-0 lg:flex lg:items-center lg:gap-4">
        <ProjectTitle project={project} />
        <ProjectDeadline project={project} />
        <ProjectResponses project={project} />
        <ProjectIssues project={project} />
      </div>
      <ProjectActions project={project} onRefetch={onRefetch} />
    </div>
  );
};
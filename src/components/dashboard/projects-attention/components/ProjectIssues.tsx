import { AlertOctagon } from "lucide-react";
import { Project } from "../types";

interface ProjectIssuesProps {
  project: Project;
}

export const ProjectIssues = ({ project }: ProjectIssuesProps) => {
  if (project.issues.length === 0) return null;
  
  return (
    <div className="flex items-center gap-2">
      <AlertOctagon className="h-4 w-4 text-red-500" />
      <span className="text-sm text-red-600">
        {project.issues.join(", ")}
      </span>
    </div>
  );
};
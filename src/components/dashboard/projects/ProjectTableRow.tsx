import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

interface Project {
  id: string;
  title: string;
  stage: string;
  created_at: string;
  bids_due: string | null;
}

interface ProjectTableRowProps {
  project: Project;
  getStatusBadge: (status: string) => string;
}

export const ProjectTableRow = ({ project, getStatusBadge }: ProjectTableRowProps) => {
  return (
    <TableRow key={project.id}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          {project.title}
          <Badge variant="secondary" className={getStatusBadge(project.stage || "pending")}>
            {project.stage || "pending"}
          </Badge>
        </div>
      </TableCell>
      <TableCell>
        {format(new Date(project.created_at), "MMM d, yyyy")}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          {project.bids_due
            ? format(new Date(project.bids_due), "MMM d, yyyy")
            : "No deadline"}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={getStatusBadge(project.stage || "pending")}>
          {project.stage || "Unknown"}
        </Badge>
      </TableCell>
      <TableCell>0</TableCell>
    </TableRow>
  );
};
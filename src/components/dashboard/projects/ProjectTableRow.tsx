import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  stage: string;
  created_at: string;
  bids_due: string;
  bids?: { id: string }[];
}

interface ProjectTableRowProps {
  project: Project;
  getStatusBadge: (status: string) => string;
}

export const ProjectTableRow = ({ project, getStatusBadge }: ProjectTableRowProps) => {
  const inviteCount = project.bids?.length || 0;

  return (
    <TableRow key={project.id}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <Link 
            to={`/projects/${project.id}`}
            className="text-primary hover:underline"
          >
            {project.title}
          </Link>
        </div>
      </TableCell>
      <TableCell>
        {format(new Date(project.created_at), "MMM d, yyyy")}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          {format(new Date(project.bids_due), "MMM d, yyyy")}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={getStatusBadge(project.stage)}>
          {project.stage}
        </Badge>
      </TableCell>
      <TableCell>{inviteCount}</TableCell>
    </TableRow>
  );
};
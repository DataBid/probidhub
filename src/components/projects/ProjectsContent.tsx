import { ProjectFilters } from "@/components/dashboard/projects/ProjectFilters";
import { ProjectTableHeader } from "@/components/dashboard/projects/ProjectTableHeader";
import { ProjectTableRow } from "@/components/dashboard/projects/ProjectTableRow";
import { Table, TableBody } from "@/components/ui/table";
import { getStatusBadge } from "@/components/dashboard/projects/utils/statusStyles";
import { Loader2 } from "lucide-react";

interface ProjectsContentProps {
  projects: any[];
  isLoading: boolean;
  statusFilter: string;
  deadlineFilter: string;
  onStatusChange: (value: any) => void;
  onDeadlineChange: (value: any) => void;
  onSort: (field: string) => void;
}

export const ProjectsContent = ({
  projects,
  isLoading,
  statusFilter,
  deadlineFilter,
  onStatusChange,
  onDeadlineChange,
  onSort,
}: ProjectsContentProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <ProjectFilters
          statusFilter={statusFilter}
          deadlineFilter={deadlineFilter}
          onStatusChange={onStatusChange}
          onDeadlineChange={onDeadlineChange}
        />
      </div>

      <Table>
        <ProjectTableHeader onSort={onSort} />
        <TableBody>
          {projects?.map((project) => (
            <ProjectTableRow
              key={project.id}
              project={project}
              getStatusBadge={getStatusBadge}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
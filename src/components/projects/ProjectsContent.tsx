import { ProjectFilters } from "@/components/dashboard/projects/ProjectFilters";
import { ProjectTableHeader } from "@/components/dashboard/projects/ProjectTableHeader";
import { ProjectTableRow } from "@/components/dashboard/projects/ProjectTableRow";
import { Table, TableBody } from "@/components/ui/table";
import { getStatusBadge } from "@/components/dashboard/projects/utils/statusStyles";
import { Loader2 } from "lucide-react";
import { StatusFilter, DeadlineFilter } from "@/components/dashboard/projects/hooks/useProjectsData";
import { Card } from "@/components/ui/card";
import { ProjectSearch } from "@/components/dashboard/projects/ProjectSearch";

interface ProjectsContentProps {
  projects: any[];
  isLoading: boolean;
  statusFilter: StatusFilter;
  deadlineFilter: DeadlineFilter;
  onStatusChange: (value: StatusFilter) => void;
  onDeadlineChange: (value: DeadlineFilter) => void;
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
    <Card className="p-3 sm:p-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <ProjectSearch
            searchQuery=""
            onSearchChange={() => {}}
          />
          <ProjectFilters
            statusFilter={statusFilter}
            deadlineFilter={deadlineFilter}
            onStatusChange={onStatusChange}
            onDeadlineChange={onDeadlineChange}
          />
        </div>

        <div className="rounded-md border">
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
      </div>
    </Card>
  );
};
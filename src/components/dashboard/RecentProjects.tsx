import { Table, TableBody } from "@/components/ui/table";
import { ProjectFilters } from "./projects/ProjectFilters";
import { ProjectTableHeader } from "./projects/ProjectTableHeader";
import { ProjectTableRow } from "./projects/ProjectTableRow";
import { ProjectSearch } from "./projects/ProjectSearch";
import { useProjectsData } from "./projects/hooks/useProjectsData";
import { getStatusBadge } from "./projects/utils/statusStyles";

interface RecentProjectsProps {
  userRole?: string;
}

export const RecentProjects = ({ userRole }: RecentProjectsProps) => {
  const {
    projects,
    isLoading,
    handleSort,
    statusFilter,
    deadlineFilter,
    searchQuery,
    setStatusFilter,
    setDeadlineFilter,
    setSearchQuery,
  } = useProjectsData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <ProjectSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <ProjectFilters
          statusFilter={statusFilter}
          deadlineFilter={deadlineFilter}
          onStatusChange={setStatusFilter}
          onDeadlineChange={setDeadlineFilter}
        />
      </div>

      <Table>
        <ProjectTableHeader onSort={handleSort} />
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
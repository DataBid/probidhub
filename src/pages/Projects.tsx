import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { ProjectsContent } from "@/components/projects/ProjectsContent";
import { useProjectsPageData } from "@/hooks/useProjectsPageData";

const Projects = () => {
  const {
    projects,
    isLoading,
    statusFilter,
    setStatusFilter,
    deadlineFilter,
    setDeadlineFilter,
    setSortField,
  } = useProjectsPageData();

  return (
    <div className="px-2 sm:px-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden pb-20 lg:pb-6">
      <ProjectsHeader />
      <ProjectsContent
        projects={projects || []}
        isLoading={isLoading}
        statusFilter={statusFilter}
        deadlineFilter={deadlineFilter}
        onStatusChange={setStatusFilter}
        onDeadlineChange={setDeadlineFilter}
        onSort={setSortField}
      />
    </div>
  );
};

export default Projects;
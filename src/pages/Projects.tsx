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
    <div className="container mx-auto px-4 py-8">
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
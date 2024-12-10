import { useParams } from "react-router-dom";
import { useProjectData } from "@/hooks/useProjectData";
import { ProjectHeader } from "@/components/projects/details/ProjectHeader";
import { ProjectTabs } from "@/components/projects/details/components/ProjectTabs";
import { MainLayout } from "@/components/layout/MainLayout";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: project, isLoading } = useProjectData(id);

  // Add logging to track the data flow
  console.log('Project data received:', {
    id: project?.id,
    title: project?.title,
    hasData: !!project
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-muted">
        <ProjectHeader project={project} />
        <ProjectTabs project={project} />
      </div>
    </MainLayout>
  );
};

export default ProjectDetails;
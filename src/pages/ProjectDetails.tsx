import { useParams } from "react-router-dom";
import { useProjectData } from "@/hooks/useProjectData";
import { ProjectHeader } from "@/components/projects/details/ProjectHeader";
import { ProjectTabs } from "@/components/projects/details/components/ProjectTabs";
import { MainLayout } from "@/components/layout/MainLayout";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: project, isLoading } = useProjectData(id);

  console.log('Project details page - Project ID:', id);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-muted flex items-center justify-center">
          <div>Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (!project?.id) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-muted flex items-center justify-center">
          <div>Project not found</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-muted">
        <ProjectHeader 
          title={project.title}
          stage={project.stage}
          location={project.location}
        />
        <ProjectTabs projectId={project.id} />
      </div>
    </MainLayout>
  );
};

export default ProjectDetails;
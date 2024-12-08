import { useParams } from "react-router-dom";
import { useProjectData } from "@/hooks/useProjectData";
import { ProjectHeader } from "@/components/projects/details/ProjectHeader";
import { ProjectTabs } from "@/components/projects/details/components/ProjectTabs";
import { MainLayout } from "@/components/layout/MainLayout";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: project, isLoading } = useProjectData(id);

  console.log('Project data in ProjectDetails:', JSON.stringify(project, null, 2));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <ProjectHeader project={project} />
        <ProjectTabs project={project} />
      </div>
    </MainLayout>
  );
};

export default ProjectDetails;
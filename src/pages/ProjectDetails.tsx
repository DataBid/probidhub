import { useParams } from "react-router-dom";
import { useProjectData } from "@/hooks/useProjectData";
import { ProjectHeader } from "@/components/projects/details/ProjectHeader";
import { ProjectTabs } from "@/components/projects/details/components/ProjectTabs";
import { MainLayout } from "@/components/layout/MainLayout";
import CircularJSON from "circular-json";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: project, isLoading } = useProjectData(id);

  // Add detailed logging to track data flow
  console.log('Raw project data:', project);
  
  // Safely serialize the project data
  const serializedProject = project ? (() => {
    try {
      const serialized = CircularJSON.stringify(project);
      const parsed = CircularJSON.parse(serialized);
      console.log('Successfully serialized project data:', parsed);
      return parsed;
    } catch (error) {
      console.error('Error serializing project data:', error);
      return null;
    }
  })() : null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!serializedProject) {
    return <div>Project not found</div>;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-muted">
        <ProjectHeader project={serializedProject} />
        <ProjectTabs project={serializedProject} />
      </div>
    </MainLayout>
  );
};

export default ProjectDetails;
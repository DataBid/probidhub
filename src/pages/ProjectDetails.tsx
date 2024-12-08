import { useParams } from "react-router-dom";
import { useProjectData } from "@/hooks/useProjectData";
import { ProjectHeader } from "@/components/projects/details/ProjectHeader";
import { ProjectTabs } from "@/components/projects/details/components/ProjectTabs";
import { MainLayout } from "@/components/layout/MainLayout";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: projectData, isLoading } = useProjectData(id);

  // Ensure we have serializable data
  const project = projectData ? {
    ...projectData,
    bids_due: projectData.bids_due ? new Date(projectData.bids_due).toISOString() : null,
    prebid_datetime: projectData.prebid_datetime ? new Date(projectData.prebid_datetime).toISOString() : null,
    created_at: projectData.created_at ? new Date(projectData.created_at).toISOString() : null,
    updated_at: projectData.updated_at ? new Date(projectData.updated_at).toISOString() : null,
    bids: projectData.bids?.map(bid => ({
      ...bid,
      response_date: bid.response_date ? new Date(bid.response_date).toISOString() : null,
      created_at: bid.created_at ? new Date(bid.created_at).toISOString() : null,
      updated_at: bid.updated_at ? new Date(bid.updated_at).toISOString() : null
    }))
  } : null;

  console.log('Serialized project data:', JSON.stringify(project, null, 2));

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
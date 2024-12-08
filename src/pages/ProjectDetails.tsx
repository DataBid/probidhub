import { useParams } from "react-router-dom";
import { useProjectData } from "@/hooks/useProjectData";
import { ProjectHeader } from "@/components/projects/details/ProjectHeader";
import { ProjectTabs } from "@/components/projects/details/components/ProjectTabs";
import { MainLayout } from "@/components/layout/MainLayout";
import CircularJSON from "circular-json";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: projectData, isLoading } = useProjectData(id);

  console.log('Raw project data in ProjectDetails:', 
    CircularJSON.stringify(projectData, null, 2)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!projectData) {
    return <div>Project not found</div>;
  }

  // Create a serializable version of the project data
  const serializeDate = (date: string | null) => {
    if (!date) return null;
    try {
      return new Date(date).toISOString();
    } catch (e) {
      console.error('Error serializing date:', e);
      return null;
    }
  };

  const project = {
    id: projectData.id,
    title: projectData.title,
    stage: projectData.stage,
    location: projectData.location,
    industry: projectData.industry,
    project_class: projectData.project_class,
    detail_of_services: projectData.detail_of_services,
    questions_contact: projectData.questions_contact,
    prebid_datetime: serializeDate(projectData.prebid_datetime),
    prebid_location: projectData.prebid_location,
    prequalification: projectData.prequalification,
    prequalification_info: projectData.prequalification_info,
    bids_due: serializeDate(projectData.bids_due),
    bids: projectData.bids?.map(bid => ({
      id: bid.id,
      status: bid.status,
      response_date: serializeDate(bid.response_date),
      profiles: bid.profiles ? {
        company_name: bid.profiles.company_name,
        contact_email: bid.profiles.contact_email,
        phone: bid.profiles.phone
      } : null
    }))
  };

  // Validate that the data is serializable
  try {
    const serializedProject = CircularJSON.stringify(project);
    console.log('Successfully serialized project data:', serializedProject);
  } catch (error) {
    console.error('Serialization error:', error);
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
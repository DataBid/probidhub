import { useParams } from "react-router-dom";
import { useProjectData } from "@/hooks/useProjectData";
import { ProjectHeader } from "@/components/projects/details/ProjectHeader";
import { ProjectTabs } from "@/components/projects/details/components/ProjectTabs";
import { MainLayout } from "@/components/layout/MainLayout";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: projectData, isLoading } = useProjectData(id);

  console.log('Raw project data in ProjectDetails:', projectData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!projectData) {
    return <div>Project not found</div>;
  }

  // Create a simple serializable version of the project data
  const project = {
    id: projectData.id,
    title: projectData.title,
    stage: projectData.stage,
    location: projectData.location,
    industry: projectData.industry,
    project_class: projectData.project_class,
    detail_of_services: projectData.detail_of_services,
    questions_contact: projectData.questions_contact,
    prebid_datetime: projectData.prebid_datetime,
    prebid_location: projectData.prebid_location,
    prequalification: projectData.prequalification,
    prequalification_info: projectData.prequalification_info,
    bids_due: projectData.bids_due,
    bids: projectData.bids?.map(bid => ({
      id: bid.id,
      status: bid.status,
      response_date: bid.response_date,
      profiles: bid.profiles ? {
        company_name: bid.profiles.company_name,
        contact_email: bid.profiles.contact_email,
        phone: bid.profiles.phone
      } : null
    }))
  };

  console.log('Serialized project data in ProjectDetails:', JSON.stringify(project, null, 2));

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
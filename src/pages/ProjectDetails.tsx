import { useParams } from "react-router-dom";
import { useProjectData } from "@/hooks/useProjectData";
import { ProjectHeader } from "@/components/projects/details/ProjectHeader";
import { ProjectTabs } from "@/components/projects/details/components/ProjectTabs";
import { MainLayout } from "@/components/layout/MainLayout";

// Define only the properties we need
interface SafeProject {
  id: string;
  title: string;
  stage?: string;
  location?: string;
  industry?: string;
  project_class?: string;
  detail_of_services?: string;
  questions_contact?: string;
  prebid_datetime?: string;
  prebid_location?: string;
  prequalification?: boolean;
  prequalification_info?: string;
  bids?: Array<{
    id: string;
    status: string;
    response_date?: string;
    profiles?: {
      company_name?: string;
      contact_email?: string;
      phone?: string;
    };
  }>;
}

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: projectData, isLoading } = useProjectData(id);

  console.log('Raw project data:', JSON.stringify(projectData, null, 2));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Create a sanitized version of the project data
  const sanitizedProject: SafeProject | null = projectData ? {
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
    bids: projectData.bids?.map(bid => ({
      id: bid.id,
      status: bid.status,
      response_date: bid.response_date,
      profiles: bid.profiles ? {
        company_name: bid.profiles.company_name,
        contact_email: bid.profiles.contact_email,
        phone: bid.profiles.phone
      } : undefined
    }))
  } : null;

  console.log('Sanitized project data:', JSON.stringify(sanitizedProject, null, 2));

  if (!sanitizedProject) {
    return <div>Project not found</div>;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <ProjectHeader project={sanitizedProject} />
        <ProjectTabs project={sanitizedProject} />
      </div>
    </MainLayout>
  );
};

export default ProjectDetails;
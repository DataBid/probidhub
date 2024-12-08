import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectDetailsTab } from "../ProjectDetailsTab";
import { ProjectFilesTab } from "../ProjectFilesTab";
import { ProjectSubcontractorsTab } from "../ProjectSubcontractorsTab";
import { ProjectIntelligenceTab } from "../ProjectIntelligenceTab";
import { SimilarProjects } from "../SimilarProjects";

interface ProjectTabsProps {
  project: {
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
  };
}

export const ProjectTabs = ({ project }: ProjectTabsProps) => {
  // Add console logs to help debug the data
  console.log('Project data received in ProjectTabs:', JSON.stringify(project, null, 2));

  // Create a serializable version of the project object
  const safeProject = {
    id: project.id,
    title: project.title,
    stage: project.stage,
    location: project.location,
    industry: project.industry,
    project_class: project.project_class,
    detail_of_services: project.detail_of_services,
    questions_contact: project.questions_contact,
    prebid_datetime: project.prebid_datetime,
    prebid_location: project.prebid_location,
    prequalification: project.prequalification,
    prequalification_info: project.prequalification_info,
    bids: project.bids?.map(bid => ({
      id: bid.id,
      status: bid.status,
      response_date: bid.response_date,
      profiles: bid.profiles ? {
        company_name: bid.profiles.company_name,
        contact_email: bid.profiles.contact_email,
        phone: bid.profiles.phone
      } : undefined
    }))
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-white w-full justify-start overflow-x-auto">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="subcontractors">Subcontractors</TabsTrigger>
          <TabsTrigger value="intelligence">Market Intelligence</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="m-0">
          <ProjectDetailsTab project={safeProject} />
        </TabsContent>

        <TabsContent value="files" className="m-0">
          <ProjectFilesTab project={safeProject} />
        </TabsContent>

        <TabsContent value="subcontractors" className="m-0">
          <ProjectSubcontractorsTab project={safeProject} />
        </TabsContent>

        <TabsContent value="intelligence" className="m-0">
          <ProjectIntelligenceTab project={safeProject} />
        </TabsContent>
      </Tabs>

      <SimilarProjects currentProject={safeProject} />
    </div>
  );
};
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectDetailsTab } from "../ProjectDetailsTab";
import { ProjectFilesTab } from "../ProjectFilesTab";
import { ProjectSubcontractorsTab } from "../ProjectSubcontractorsTab";
import { ProjectIntelligenceTab } from "../ProjectIntelligenceTab";
import { SimilarProjects } from "../SimilarProjects";

interface ProjectBid {
  id: string;
  status: string;
  response_date?: string;
  profiles?: {
    company_name?: string;
    contact_email?: string;
    phone?: string;
  };
}

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
  bids?: ProjectBid[];
}

interface ProjectTabsProps {
  project: SafeProject;
}

export const ProjectTabs = ({ project }: ProjectTabsProps) => {
  console.log('Project data received in ProjectTabs:', JSON.stringify(project, null, 2));

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="bg-muted w-full justify-start overflow-x-auto">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="subcontractors">Subcontractors</TabsTrigger>
            <TabsTrigger value="intelligence">Market Intelligence</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="m-0">
            <ProjectDetailsTab project={project} />
          </TabsContent>

          <TabsContent value="files" className="m-0">
            <ProjectFilesTab project={project} />
          </TabsContent>

          <TabsContent value="subcontractors" className="m-0">
            <ProjectSubcontractorsTab project={project} />
          </TabsContent>

          <TabsContent value="intelligence" className="m-0">
            <ProjectIntelligenceTab project={project} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-6">
        <SimilarProjects currentProject={project} />
      </div>
    </div>
  );
};
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectDetailsTab } from "../ProjectDetailsTab";
import { ProjectFilesTab } from "../ProjectFilesTab";
import { ProjectSubcontractorsTab } from "../ProjectSubcontractorsTab";
import { ProjectIntelligenceTab } from "../ProjectIntelligenceTab";
import { SimilarProjects } from "../SimilarProjects";

interface ProjectTabsProps {
  project: any;
}

export const ProjectTabs = ({ project }: ProjectTabsProps) => {
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

      <SimilarProjects currentProject={project} />
    </div>
  );
};
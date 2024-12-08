import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectDetailsTab } from "../ProjectDetailsTab";
import { ProjectChecklistTab } from "../ProjectChecklistTab";
import { ProjectFilesTab } from "../ProjectFilesTab";
import { ProjectSubcontractorsTab } from "../ProjectSubcontractorsTab";
import { ProjectIntelligenceTab } from "../ProjectIntelligenceTab";
import { SimilarProjects } from "../SimilarProjects";

interface ProjectTabsProps {
  project: any;
}

export const ProjectTabs = ({ project }: ProjectTabsProps) => {
  return (
    <div className="relative">
      {/* Sticky tabs container */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container mx-auto">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="h-16 w-full justify-start gap-2 bg-transparent p-0 overflow-x-auto">
              <TabsTrigger 
                value="details"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="checklist"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
              >
                Checklist
              </TabsTrigger>
              <TabsTrigger 
                value="files"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
              >
                Files
              </TabsTrigger>
              <TabsTrigger 
                value="subcontractors"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
              >
                Subcontractors
              </TabsTrigger>
              <TabsTrigger 
                value="intelligence"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
              >
                Market Intelligence
              </TabsTrigger>
            </TabsList>

            <div className="container mx-auto py-6">
              <TabsContent value="details" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <ProjectDetailsTab project={project} />
              </TabsContent>

              <TabsContent value="checklist" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <ProjectChecklistTab project={project} />
              </TabsContent>

              <TabsContent value="files" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <ProjectFilesTab project={project} />
              </TabsContent>

              <TabsContent value="subcontractors" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <ProjectSubcontractorsTab project={project} />
              </TabsContent>

              <TabsContent value="intelligence" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                <ProjectIntelligenceTab project={project} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Similar Projects section outside of tabs */}
      <div className="container mx-auto py-6">
        <SimilarProjects currentProject={project} />
      </div>
    </div>
  );
};
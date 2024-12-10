import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectDetailsTab } from "../ProjectDetailsTab";
import { ProjectFilesTab } from "../ProjectFilesTab";
import { ProjectSubcontractorsTab } from "../ProjectSubcontractorsTab";
import { ProjectIntelligenceTab } from "../ProjectIntelligenceTab";
import { SimilarProjects } from "../SimilarProjects";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProjectTabsProps {
  projectId: string;
}

export const ProjectTabs = ({ projectId }: ProjectTabsProps) => {
  const { data: projectDetails } = useQuery({
    queryKey: ['project-details', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          id,
          title,
          stage,
          location,
          industry,
          project_class,
          detail_of_services,
          questions_contact,
          prebid_datetime,
          prebid_location,
          prequalification,
          prequalification_info,
          bids_due
        `)
        .eq('id', projectId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  console.log('Project tabs - Project ID:', projectId);

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
            <ProjectDetailsTab project={projectDetails} />
          </TabsContent>

          <TabsContent value="files" className="m-0">
            <ProjectFilesTab projectId={projectId} />
          </TabsContent>

          <TabsContent value="subcontractors" className="m-0">
            <ProjectSubcontractorsTab projectId={projectId} />
          </TabsContent>

          <TabsContent value="intelligence" className="m-0">
            <ProjectIntelligenceTab projectId={projectId} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-6">
        <SimilarProjects currentProjectId={projectId} />
      </div>
    </div>
  );
};
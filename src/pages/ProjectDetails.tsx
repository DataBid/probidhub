import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectHeader } from "@/components/projects/details/ProjectHeader";
import { ProjectDetailsTab } from "@/components/projects/details/ProjectDetailsTab";
import { ProjectChecklistTab } from "@/components/projects/details/ProjectChecklistTab";
import { ProjectFilesTab } from "@/components/projects/details/ProjectFilesTab";
import { ProjectSubcontractorsTab } from "@/components/projects/details/ProjectSubcontractorsTab";
import { ProjectIntelligenceTab } from "@/components/projects/details/ProjectIntelligenceTab";
import { SimilarProjects } from "@/components/projects/details/SimilarProjects";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectDetails = () => {
  const { id } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          bids (
            id,
            status,
            subcontractor_id,
            response_date,
            profiles (
              id,
              contact_email,
              company_name,
              phone
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (!project) {
    return <div className="p-4">Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <ProjectHeader project={project} />
      
      <div className="container mx-auto py-6 px-4">
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="bg-white w-full justify-start overflow-x-auto">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="subcontractors">Subcontractors</TabsTrigger>
            <TabsTrigger value="intelligence">Market Intelligence</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="m-0">
            <ProjectDetailsTab project={project} />
          </TabsContent>

          <TabsContent value="checklist" className="m-0">
            <ProjectChecklistTab project={project} />
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
    </div>
  );
};

const ProjectDetailsSkeleton = () => (
  <div className="min-h-screen bg-[#F7F7F7]">
    <div className="w-full bg-white border-b">
      <div className="container mx-auto py-6 px-4">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <div className="flex gap-4 mb-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  </div>
);

export default ProjectDetails;
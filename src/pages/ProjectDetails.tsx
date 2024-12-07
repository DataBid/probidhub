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

// Test data for development
const testProject = {
  id: "test-id",
  title: "New Commercial Building Construction",
  stage: "Active",
  bids_due: new Date("2024-05-15").toISOString(),
  questions_contact: "John Smith (john.smith@construction.com)",
  location: "San Francisco, CA",
  industry: "Commercial Construction",
  project_class: "Class A",
  detail_of_services: "Construction of a new 10-story commercial building including office spaces, retail areas, and underground parking. The project emphasizes sustainable building practices and LEED certification requirements.",
  prebid_datetime: new Date("2024-04-01T14:00:00").toISOString(),
  prebid_location: "123 Construction Site Ave, San Francisco, CA",
  prequalification: true,
  prequalification_info: "Contractors must demonstrate experience with similar scale commercial projects and LEED certification.",
  bids: [
    {
      id: "bid-1",
      status: "Pending",
      response_date: new Date("2024-03-20").toISOString(),
      profiles: {
        company_name: "ABC Contractors Ltd",
        contact_email: "contact@abccontractors.com",
        phone: "555-0123"
      }
    },
    {
      id: "bid-2",
      status: "Submitted",
      response_date: new Date("2024-03-18").toISOString(),
      profiles: {
        company_name: "XYZ Construction Inc",
        contact_email: "bids@xyzconstruction.com",
        phone: "555-0124"
      }
    },
    {
      id: "bid-3",
      status: "Reviewing",
      response_date: new Date("2024-03-15").toISOString(),
      profiles: {
        company_name: "Best Build Solutions",
        contact_email: "info@bestbuild.com",
        phone: "555-0125"
      }
    }
  ]
};

const ProjectDetails = () => {
  // Extract projectId from URL parameters
  const params = useParams();
  const projectId = params.id;
  
  console.log('Project ID from params:', projectId); // Debug log

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      if (!projectId) {
        console.error('No project ID provided');
        throw new Error('Project ID is required');
      }

      try {
        console.log('Fetching project with ID:', projectId); // Debug log
        
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
          .eq('id', projectId)
          .single();

        if (error) {
          console.error('Supabase error:', error);
          // For development, return test data if the query fails
          return testProject;
        }

        console.log('Project data received:', data); // Debug log
        return data || testProject;
      } catch (error) {
        console.error('Query error:', error);
        // For development, return test data if the query fails
        return testProject;
      }
    },
    enabled: !!projectId // Only run query if we have a projectId
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
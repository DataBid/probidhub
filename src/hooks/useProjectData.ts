import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define only the properties we need
interface SafeProject {
  id: string;
  title: string;
  stage?: string;
  bids_due?: string | null;
  questions_contact?: string | null;
  location?: string | null;
  industry?: string | null;
  project_class?: string | null;
  detail_of_services?: string | null;
  prebid_datetime?: string | null;
  prebid_location?: string | null;
  prequalification?: boolean;
  prequalification_info?: string | null;
  bids?: Array<{
    id: string;
    status: string;
    response_date?: string | null;
    profiles?: {
      company_name?: string | null;
      contact_email?: string | null;
      phone?: string | null;
    } | null;
  }>;
}

// Create serializable test data
const createTestProject = (): SafeProject => {
  // Create a base object with all fields explicitly set to avoid undefined
  const project: SafeProject = {
    id: "test-id",
    title: "New Commercial Building Construction",
    stage: "Active",
    bids_due: "2024-05-15T00:00:00Z",
    questions_contact: "John Smith (john.smith@construction.com)",
    location: "433 Penn St, Newtown, PA 18940",
    industry: "Commercial Construction",
    project_class: "Class A",
    detail_of_services: "Construction of a new 10-story commercial building including office spaces, retail areas, and underground parking.",
    prebid_datetime: "2024-04-01T14:00:00Z",
    prebid_location: "433 Penn St, Newtown, PA 18940",
    prequalification: true,
    prequalification_info: "Contractors must demonstrate experience with similar scale commercial projects.",
    bids: [
      {
        id: "bid-1",
        status: "Pending",
        response_date: "2024-03-20T00:00:00Z",
        profiles: {
          company_name: "ABC Contractors Ltd",
          contact_email: "contact@abccontractors.com",
          phone: "555-0123"
        }
      }
    ]
  };

  // Log the stringified data to verify it's serializable
  console.log('Test project data (stringified):', JSON.stringify(project, null, 2));
  return project;
};

export const useProjectData = (projectId?: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      console.log('Fetching project with ID:', projectId);
      
      // For development, return test data
      const testProject = createTestProject();
      return testProject;

      // The following code will be used when connecting to Supabase:
      /*
      if (!projectId) {
        console.error('No project ID provided');
        toast.error('Project ID is required');
        throw new Error('Project ID is required');
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select(\`
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
            bids (
              id,
              status,
              response_date,
              profiles (
                company_name,
                contact_email,
                phone
              )
            )
          \`)
          .eq('id', projectId)
          .single();

        if (error) {
          console.error('Supabase error:', error);
          toast.error('Failed to fetch project details');
          throw error;
        }

        // Ensure dates are serialized
        const serializedData: SafeProject = {
          ...data,
          bids_due: data.bids_due ? new Date(data.bids_due).toISOString() : null,
          prebid_datetime: data.prebid_datetime ? new Date(data.prebid_datetime).toISOString() : null,
          bids: data.bids?.map(bid => ({
            ...bid,
            response_date: bid.response_date ? new Date(bid.response_date).toISOString() : null
          }))
        };

        console.log('Serialized project data:', JSON.stringify(serializedData, null, 2));
        return serializedData;
      } catch (error) {
        console.error('Query error:', error);
        toast.error('An error occurred while fetching project details');
        throw error;
      }
      */
    },
    enabled: true
  });
};
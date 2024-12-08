import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define only the properties we need
interface SafeProject {
  id: string;
  title: string;
  stage?: string;
  bids_due?: string;
  questions_contact?: string;
  location?: string;
  industry?: string;
  project_class?: string;
  detail_of_services?: string;
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

// Create serializable test data
const createTestProject = (): SafeProject => ({
  id: "test-id",
  title: "New Commercial Building Construction",
  stage: "Active",
  bids_due: new Date("2024-05-15").toISOString(),
  questions_contact: "John Smith (john.smith@construction.com)",
  location: "433 Penn St, Newtown, PA 18940",
  industry: "Commercial Construction",
  project_class: "Class A",
  detail_of_services: "Construction of a new 10-story commercial building including office spaces, retail areas, and underground parking.",
  prebid_datetime: new Date("2024-04-01T14:00:00").toISOString(),
  prebid_location: "433 Penn St, Newtown, PA 18940",
  prequalification: true,
  prequalification_info: "Contractors must demonstrate experience with similar scale commercial projects.",
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
    }
  ]
});

export const useProjectData = (projectId?: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      console.log('Fetching project with ID:', projectId);
      
      // For development, return test data
      const testProject = createTestProject();
      console.log('Returning serializable test data:', JSON.stringify(testProject, null, 2));
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
          `)
          .eq('id', projectId)
          .single();

        if (error) {
          console.error('Supabase error:', error);
          toast.error('Failed to fetch project details');
          throw error;
        }

        // Ensure dates are serialized
        const serializedData = {
          ...data,
          bids_due: data.bids_due ? new Date(data.bids_due).toISOString() : undefined,
          prebid_datetime: data.prebid_datetime ? new Date(data.prebid_datetime).toISOString() : undefined,
          bids: data.bids?.map(bid => ({
            ...bid,
            response_date: bid.response_date ? new Date(bid.response_date).toISOString() : undefined
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
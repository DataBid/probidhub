import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Test data for development
const testProject = {
  id: "test-id",
  title: "New Commercial Building Construction",
  stage: "Active",
  bids_due: new Date("2024-05-15").toISOString(),
  questions_contact: "John Smith (john.smith@construction.com)",
  location: "433 Penn St, Newtown, PA 18940",
  latitude: 40.22881,  // Actual coordinates for 433 Penn St
  longitude: -74.93228, // Actual coordinates for 433 Penn St
  industry: "Commercial Construction",
  project_class: "Class A",
  detail_of_services: "Construction of a new 10-story commercial building including office spaces, retail areas, and underground parking. The project emphasizes sustainable building practices and LEED certification requirements.",
  prebid_datetime: new Date("2024-04-01T14:00:00").toISOString(),
  prebid_location: "433 Penn St, Newtown, PA 18940",
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

export const useProjectData = (projectId?: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      // For development, always return test data
      console.log('Returning test data for development');
      return testProject;

      // The following code will be used when connecting to Supabase:
      /*
      if (!projectId) {
        console.error('No project ID provided');
        toast.error('Project ID is required');
        throw new Error('Project ID is required');
      }

      try {
        console.log('Fetching project with ID:', projectId);
        
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
          toast.error('Failed to fetch project details');
          return testProject;
        }

        console.log('Project data received:', data);
        return data || testProject;
      } catch (error) {
        console.error('Query error:', error);
        toast.error('An error occurred while fetching project details');
        return testProject;
      }
      */
    },
    enabled: true // Always enabled for development
  });
};
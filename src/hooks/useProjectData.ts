import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  created_at?: string | null;
  updated_at?: string | null;
  bids?: Array<{
    id: string;
    status: string;
    response_date?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    profiles?: {
      company_name?: string | null;
      contact_email?: string | null;
      phone?: string | null;
    } | null;
  }>;
}

export const useProjectData = (projectId?: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      console.log('Fetching project with ID:', projectId);
      
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
            created_at,
            updated_at,
            bids_due,
            bids (
              id,
              status,
              response_date,
              created_at,
              updated_at,
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
        const serializedData: SafeProject = {
          ...data,
          bids_due: data.bids_due ? new Date(data.bids_due).toISOString() : null,
          prebid_datetime: data.prebid_datetime ? new Date(data.prebid_datetime).toISOString() : null,
          created_at: data.created_at ? new Date(data.created_at).toISOString() : null,
          updated_at: data.updated_at ? new Date(data.updated_at).toISOString() : null,
          bids: data.bids?.map(bid => ({
            ...bid,
            response_date: bid.response_date ? new Date(bid.response_date).toISOString() : null,
            created_at: bid.created_at ? new Date(bid.created_at).toISOString() : null,
            updated_at: bid.updated_at ? new Date(bid.updated_at).toISOString() : null
          }))
        };

        console.log('Serialized project data:', JSON.stringify(serializedData, null, 2));
        return serializedData;
      } catch (error) {
        console.error('Query error:', error);
        toast.error('An error occurred while fetching project details');
        throw error;
      }
    },
    enabled: !!projectId
  });
};
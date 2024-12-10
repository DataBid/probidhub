import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useProjectData = (projectId?: string) => {
  return useQuery({
    queryKey: ['project-basic', projectId],
    queryFn: async () => {
      if (!projectId) {
        console.error('No project ID provided');
        toast.error('Project ID is required');
        throw new Error('Project ID is required');
      }

      console.log('Fetching project data for ID:', projectId);

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
            bids_due,
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

        console.log('Project data fetched:', data);
        return data;
      } catch (error) {
        console.error('Query error:', error);
        toast.error('An error occurred while fetching project details');
        throw error;
      }
    },
    enabled: !!projectId
  });
};
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

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(projectId)) {
        console.error('Invalid project ID format:', projectId);
        toast.error('Invalid project ID format');
        throw new Error('Invalid project ID format');
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
            bids_due,
            prequalification,
            created_at,
            updated_at,
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
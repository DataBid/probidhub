import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SafeProject {
  id: string;
  title: string;
  stage?: string | null;
  location?: string | null;
  industry?: string | null;
  project_class?: string | null;
  detail_of_services?: string | null;
  questions_contact?: string | null;
  prebid_datetime?: string | null;
  prebid_location?: string | null;
  prequalification?: boolean | null;
  prequalification_info?: string | null;
  bids_due?: string | null;
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

const serializeProject = (data: any): SafeProject => {
  console.log('Serializing project data:', data);
  
  const serialized: SafeProject = {
    id: data.id,
    title: data.title,
    stage: data.stage,
    location: data.location,
    industry: data.industry,
    project_class: data.project_class,
    detail_of_services: data.detail_of_services,
    questions_contact: data.questions_contact,
    prebid_datetime: data.prebid_datetime ? new Date(data.prebid_datetime).toISOString() : null,
    prebid_location: data.prebid_location,
    prequalification: data.prequalification,
    prequalification_info: data.prequalification_info,
    bids_due: data.bids_due ? new Date(data.bids_due).toISOString() : null,
    bids: data.bids?.map((bid: any) => ({
      id: bid.id,
      status: bid.status,
      response_date: bid.response_date ? new Date(bid.response_date).toISOString() : null,
      profiles: bid.profiles ? {
        company_name: bid.profiles.company_name,
        contact_email: bid.profiles.contact_email,
        phone: bid.profiles.phone
      } : null
    }))
  };

  console.log('Serialized project data:', JSON.stringify(serialized, null, 2));
  return serialized;
};

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

        const serializedData = serializeProject(data);
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
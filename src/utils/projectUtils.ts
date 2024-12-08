import { serializeDate } from "./dateUtils";
import CircularJSON from "circular-json";

export interface ProjectBid {
  id: string;
  status: string;
  response_date: string | null;
  profiles?: {
    company_name?: string | null;
    contact_email?: string | null;
    phone?: string | null;
  } | null;
}

export interface SerializedProject {
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
  bids?: ProjectBid[];
}

export const serializeProject = (projectData: any): SerializedProject => {
  try {
    console.log('Serializing project data:', projectData);
    
    const project = {
      id: projectData.id,
      title: projectData.title,
      stage: projectData.stage,
      location: projectData.location,
      industry: projectData.industry,
      project_class: projectData.project_class,
      detail_of_services: projectData.detail_of_services,
      questions_contact: projectData.questions_contact,
      prebid_datetime: serializeDate(projectData.prebid_datetime),
      prebid_location: projectData.prebid_location,
      prequalification: projectData.prequalification,
      prequalification_info: projectData.prequalification_info,
      bids_due: serializeDate(projectData.bids_due),
      bids: projectData.bids?.map((bid: any) => ({
        id: bid.id,
        status: bid.status,
        response_date: serializeDate(bid.response_date),
        profiles: bid.profiles ? {
          company_name: bid.profiles.company_name,
          contact_email: bid.profiles.contact_email,
          phone: bid.profiles.phone
        } : null
      }))
    };

    // Validate serialization
    CircularJSON.stringify(project);
    console.log('Successfully serialized project:', project);
    return project;
  } catch (error) {
    console.error('Project serialization error:', error);
    throw new Error('Failed to serialize project data');
  }
};
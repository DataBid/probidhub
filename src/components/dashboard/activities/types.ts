export interface Activity {
  id: string;
  user_id: string;
  action_type: string;
  entity_type: string;
  entity_id: string;
  details: unknown;
  created_at: string;
  profiles?: {
    contact_email: string;
    company_name: string | null;
  } | null;
}
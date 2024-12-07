export interface Project {
  id: string;
  title: string;
  bids_due: string;
  project_document_info: string | null;
  questions_contact: string | null;
  bids: { count: number }[];
  pendingBids: number;
  issues: string[];
}
export interface Bid {
  id: string;
  status: string | null;
  response_date: string | null;
}

export interface Project {
  id: string;
  title: string;
  bids_due: string;
  project_document_info: string | null;
  questions_contact: string | null;
  bids: Bid[];
  pendingBids: number;
  issues: string[];
}
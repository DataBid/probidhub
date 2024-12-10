export interface Bid {
  id: string;
  status: string | null;
  response_date: string | null;
}

export interface Project {
  id: string;
  title: string;
  stage: string;
  location: string;
  industry: string | null;
  project_class: string | null;
  bids_due: string;
  prequalification: boolean | null;
  created_at: string;
  updated_at: string;
  bids: Bid[];
  pendingBids: number;
  issues: string[];
}
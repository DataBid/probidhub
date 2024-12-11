export type CompanyType = 'subcontractor' | 'supplier' | 'owner' | 'architect' | 'engineer';

export type SortConfig = {
  column: string;
  direction: 'asc' | 'desc';
} | null;

export interface CompanyTableProps {
  companies: any[];
  isLoading: boolean;
  refetch: () => void;
}
export type SortConfig = {
  column: string;
  direction: 'asc' | 'desc';
} | null;

export interface SubcontractorTableProps {
  subcontractors: any[];
  isLoading: boolean;
  refetch: () => void;
}
import { DateRange } from "../schema";

export interface FilterPreferences {
  searchQuery: string;
  selectedTrades: string[];
  statusFilter: string;
  dateRange: DateRange;
  locationFilter: string;
  companyTypeFilter: string;
}

export interface CompanyData {
  id: string;
  name: string;
  company: string;
  email: string;
  area_code?: string;
  phone?: string;
  location?: string;
  notes?: string;
  trade: string;
  status?: string;
  last_contact?: string;
  company_type: string;
}
import { useState, useEffect } from "react";
import { DateRange } from "@/components/subcontractors/schema";

interface FilterPreferences {
  searchQuery: string;
  selectedTrades: string[];
  statusFilter: string;
  dateRange: DateRange;
  locationFilter: string;
  companyTypeFilter: string;
}

export const useFilterPreferences = (initialState: FilterPreferences) => {
  const [preferences, setPreferences] = useState<FilterPreferences>(initialState);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("subcontractorFilterPreferences");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      if (parsed.dateRange.from) parsed.dateRange.from = new Date(parsed.dateRange.from);
      if (parsed.dateRange.to) parsed.dateRange.to = new Date(parsed.dateRange.to);
      setPreferences(parsed);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("subcontractorFilterPreferences", JSON.stringify(preferences));
  }, [preferences]);

  return [preferences, setPreferences] as const;
};
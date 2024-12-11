import { useState } from "react";
import { FilterPreferences } from "@/components/subcontractors/types/filterTypes";

export const useFilterPreferences = (initialState: FilterPreferences) => {
  const [preferences, setPreferences] = useState<FilterPreferences>(initialState);
  return [preferences, setPreferences] as const;
};
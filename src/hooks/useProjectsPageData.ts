import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatusFilter, DeadlineFilter } from "@/components/dashboard/projects/hooks/useProjectsData";

export const useProjectsPageData = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deadlineFilter, setDeadlineFilter] = useState<DeadlineFilter>("all");
  const [sortField, setSortField] = useState("created_at");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects", statusFilter, deadlineFilter, sortField],
    queryFn: async () => {
      console.log("Fetching projects with filters:", { statusFilter, deadlineFilter, sortField });
      let query = supabase
        .from("projects")
        .select(`
          id,
          title,
          stage,
          location,
          project_class,
          industry,
          bids_due,
          created_at,
          bids (
            id
          )
        `);

      if (statusFilter !== "all") {
        query = query.eq("stage", statusFilter);
      }

      const { data, error } = await query
        .order(sortField as any)
        .limit(10);

      if (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }

      return data;
    },
  });

  return {
    projects,
    isLoading,
    statusFilter,
    setStatusFilter,
    deadlineFilter,
    setDeadlineFilter,
    sortField,
    setSortField,
  };
};
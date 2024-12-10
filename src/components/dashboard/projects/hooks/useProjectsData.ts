import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfDay, endOfDay, addDays } from "date-fns";

export type SortField = "created_at" | "bids_due" | "stage";
export type SortDirection = "asc" | "desc";
export type StatusFilter = "all" | "active" | "closed" | "pending" | "archived";
export type DeadlineFilter = "all" | "today" | "tomorrow" | "week" | "month" | "past";

export const useProjectsData = () => {
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deadlineFilter, setDeadlineFilter] = useState<DeadlineFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["recent-projects", sortField, sortDirection, statusFilter, deadlineFilter],
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

      // Apply status filter
      if (statusFilter !== "all") {
        query = query.eq("stage", statusFilter);
      }

      // Apply deadline filter
      const now = new Date();
      switch (deadlineFilter) {
        case "today":
          query = query.gte("bids_due", startOfDay(now).toISOString())
            .lte("bids_due", endOfDay(now).toISOString());
          break;
        case "tomorrow":
          const tomorrow = addDays(now, 1);
          query = query.gte("bids_due", startOfDay(tomorrow).toISOString())
            .lte("bids_due", endOfDay(tomorrow).toISOString());
          break;
        case "week":
          query = query.gte("bids_due", now.toISOString())
            .lte("bids_due", addDays(now, 7).toISOString());
          break;
        case "month":
          query = query.gte("bids_due", now.toISOString())
            .lte("bids_due", addDays(now, 30).toISOString());
          break;
        case "past":
          query = query.lt("bids_due", now.toISOString());
          break;
      }

      const { data, error } = await query
        .order(sortField, { ascending: sortDirection === "asc" })
        .limit(5);

      if (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
      
      return data;
    },
  });

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter projects based on search query
  const filteredProjects = projects?.filter(project => 
    !searchQuery || project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    projects: filteredProjects,
    isLoading,
    sortField,
    sortDirection,
    statusFilter,
    deadlineFilter,
    searchQuery,
    handleSort,
    setStatusFilter,
    setDeadlineFilter,
    setSearchQuery,
  };
};
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody } from "@/components/ui/table";
import { subDays, startOfDay, endOfDay, addDays } from "date-fns";
import { ProjectFilters } from "./projects/ProjectFilters";
import { ProjectTableHeader } from "./projects/ProjectTableHeader";
import { ProjectTableRow } from "./projects/ProjectTableRow";

interface RecentProjectsProps {
  userRole?: string;
}

type SortField = "created_at" | "bids_due" | "stage";
type SortDirection = "asc" | "desc";
type StatusFilter = "all" | "active" | "closed" | "pending" | "archived";
type DeadlineFilter = "all" | "today" | "tomorrow" | "week" | "month" | "past";

export const RecentProjects = ({ userRole }: RecentProjectsProps) => {
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deadlineFilter, setDeadlineFilter] = useState<DeadlineFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["recent-projects", sortField, sortDirection, statusFilter, deadlineFilter, searchQuery],
    queryFn: async () => {
      console.log("Fetching projects with filters:", { statusFilter, deadlineFilter, sortField, searchQuery });
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

      // Apply search filter if provided
      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
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

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      active: "bg-green-100 text-green-800",
      closed: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
    };
    return statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <ProjectFilters
        statusFilter={statusFilter}
        deadlineFilter={deadlineFilter}
        onStatusChange={(value) => setStatusFilter(value as StatusFilter)}
        onDeadlineChange={(value) => setDeadlineFilter(value as DeadlineFilter)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Table>
        <ProjectTableHeader onSort={handleSort} />
        <TableBody>
          {projects?.map((project) => (
            <ProjectTableRow
              key={project.id}
              project={project}
              getStatusBadge={getStatusBadge}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Calendar } from "lucide-react";
import { format, subDays } from "date-fns";
import { Badge } from "@/components/ui/badge";

type SortField = "created_at" | "bids_due" | "stage";
type SortDirection = "asc" | "desc";
type StatusFilter = "all" | "active" | "closed";
type DeadlineFilter = "all" | "week" | "month" | "past";

export const RecentProjects = () => {
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deadlineFilter, setDeadlineFilter] = useState<DeadlineFilter>("all");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["recent-projects", sortField, sortDirection, statusFilter, deadlineFilter],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select("*");

      // Apply status filter
      if (statusFilter !== "all") {
        query = query.eq("stage", statusFilter);
      }

      // Apply deadline filter
      if (deadlineFilter !== "all") {
        const now = new Date();
        switch (deadlineFilter) {
          case "week":
            query = query.gte("bids_due", subDays(now, 7).toISOString());
            break;
          case "month":
            query = query.gte("bids_due", subDays(now, 30).toISOString());
            break;
          case "past":
            query = query.lt("bids_due", now.toISOString());
            break;
        }
      }

      const { data, error } = await query
        .order(sortField, { ascending: sortDirection === "asc" })
        .limit(5);

      if (error) throw error;
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
    };
    return statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Select
          value={statusFilter}
          onValueChange={(value: StatusFilter) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={deadlineFilter}
          onValueChange={(value: DeadlineFilter) => setDeadlineFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Deadline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Deadlines</SelectItem>
            <SelectItem value="week">Next 7 Days</SelectItem>
            <SelectItem value="month">Next 30 Days</SelectItem>
            <SelectItem value="past">Past Due</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("created_at")}
                className="h-8 px-2"
              >
                Posted Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("bids_due")}
                className="h-8 px-2"
              >
                Bid Deadline
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("stage")}
                className="h-8 px-2"
              >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Invites Sent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {project.title}
                  <Badge variant="secondary" className={getStatusBadge(project.stage || "pending")}>
                    {project.stage || "pending"}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                {format(new Date(project.created_at), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {project.bids_due
                    ? format(new Date(project.bids_due), "MMM d, yyyy")
                    : "No deadline"}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusBadge(project.stage || "pending")}>
                  {project.stage || "Unknown"}
                </Badge>
              </TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
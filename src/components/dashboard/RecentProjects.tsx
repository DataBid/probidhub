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
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

type SortField = "created_at" | "bids_due" | "stage";
type SortDirection = "asc" | "desc";

export const RecentProjects = () => {
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["recent-projects", sortField, sortDirection],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
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
            <TableCell className="font-medium">{project.title}</TableCell>
            <TableCell>
              {format(new Date(project.created_at), "MMM d, yyyy")}
            </TableCell>
            <TableCell>
              {project.bids_due
                ? format(new Date(project.bids_due), "MMM d, yyyy")
                : "No deadline"}
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.stage === "active"
                    ? "bg-green-100 text-green-800"
                    : project.stage === "closed"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {project.stage || "Unknown"}
              </span>
            </TableCell>
            <TableCell>0</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
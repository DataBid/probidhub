import { Card, CardContent } from "@/components/ui/card";
import { ProjectTableHeader } from "@/components/dashboard/projects/ProjectTableHeader";
import { ProjectTableRow } from "@/components/dashboard/projects/ProjectTableRow";
import { ProjectFilters } from "@/components/dashboard/projects/ProjectFilters";
import { Table, TableBody } from "@/components/ui/table";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Projects = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [deadlineFilter, setDeadlineFilter] = useState("all");
  const [sortField, setSortField] = useState("created_at");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects", statusFilter, deadlineFilter, sortField],
    queryFn: async () => {
      console.log("Fetching projects with filters:", { statusFilter, deadlineFilter, sortField });
      let query = supabase
        .from("projects")
        .select("*");

      if (statusFilter !== "all") {
        query = query.eq("stage", statusFilter);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }

      return data || [];
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSort = (field: string) => {
    setSortField(field);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <ProjectFilters
          statusFilter={statusFilter}
          deadlineFilter={deadlineFilter}
          onStatusChange={setStatusFilter}
          onDeadlineChange={setDeadlineFilter}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <ProjectTableHeader onSort={handleSort} />
            <TableBody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Loading projects...
                  </td>
                </tr>
              ) : projects && projects.length > 0 ? (
                projects.map((project) => (
                  <ProjectTableRow
                    key={project.id}
                    project={project}
                    getStatusBadge={getStatusBadge}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No projects found
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
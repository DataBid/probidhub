import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { ProjectItem } from "./ProjectItem";
import { BidResponseRate } from "./BidResponseRate";
import { Project } from "./types";
import { addDays } from "date-fns";

export const ProjectsAttentionList = () => {
  const { data: projects, isLoading, refetch } = useQuery({
    queryKey: ["projects-attention"],
    queryFn: async () => {
      const sevenDaysFromNow = addDays(new Date(), 7).toISOString();
      
      const { data: projectsData, error } = await supabase
        .from("projects")
        .select(`
          *,
          bids:bids(count)
        `)
        .lt("bids_due", sevenDaysFromNow)
        .gt("bids_due", new Date().toISOString())
        .order("bids_due", { ascending: true });

      if (error) throw error;
      
      const enhancedProjects = await Promise.all((projectsData || []).map(async (project) => {
        const { count: pendingBidsCount } = await supabase
          .from("bids")
          .select("*", { count: "exact", head: true })
          .eq("project_id", project.id)
          .eq("status", "pending");

        return {
          ...project,
          pendingBids: pendingBidsCount || 0,
          issues: calculateIssues(project),
        };
      }));

      return enhancedProjects as Project[];
    },
  });

  const calculateIssues = (project: any) => {
    const issues = [];
    if (!project.project_document_info) issues.push("Missing documents");
    if (!project.questions_contact) issues.push("Missing contact info");
    return issues;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const calculateOverallResponseRate = () => {
    if (!projects?.length) return 0;
    const totalResponses = projects.reduce((acc, project) => acc + (project.bids[0]?.count || 0), 0);
    const totalInvites = projects.reduce((acc, project) => acc + ((project.bids[0]?.count || 0) + project.pendingBids), 0);
    return totalInvites > 0 ? (totalResponses / totalInvites) * 100 : 0;
  };

  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold text-construction-900 mb-4">Projects Requiring Attention</h2>
        <div className="space-y-4">
          {projects?.map((project) => (
            <ProjectItem 
              key={project.id} 
              project={project} 
              onRefetch={refetch}
            />
          ))}
        </div>
        <BidResponseRate responseRate={calculateOverallResponseRate()} />
      </CardContent>
    </Card>
  );
};

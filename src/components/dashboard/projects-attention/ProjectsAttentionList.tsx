import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { BidResponseRate } from "./BidResponseRate";
import { Project } from "./types";
import { addDays } from "date-fns";
import { ProjectsSorting } from "./ProjectsSorting";
import { useState } from "react";
import { ProjectAttentionItem } from "./ProjectAttentionItem";

export const ProjectsAttentionList = () => {
  const [sortBy, setSortBy] = useState("deadline");

  const { data: projects, isLoading, refetch } = useQuery({
    queryKey: ["projects-attention", sortBy],
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

      return sortProjects(enhancedProjects as Project[], sortBy);
    },
  });

  const calculateIssues = (project: any) => {
    const issues = [];
    if (!project.project_document_info) issues.push("Missing documents");
    if (!project.questions_contact) issues.push("Missing contact info");
    return issues;
  };

  const sortProjects = (projects: Project[], sortCriteria: string) => {
    switch (sortCriteria) {
      case "deadline":
        return [...projects].sort((a, b) => 
          new Date(a.bids_due).getTime() - new Date(b.bids_due).getTime()
        );
      case "issues":
        return [...projects].sort((a, b) => b.issues.length - a.issues.length);
      case "response-rate-asc":
        return [...projects].sort((a, b) => {
          const rateA = calculateResponseRate(a);
          const rateB = calculateResponseRate(b);
          return rateA - rateB;
        });
      case "response-rate-desc":
        return [...projects].sort((a, b) => {
          const rateA = calculateResponseRate(a);
          const rateB = calculateResponseRate(b);
          return rateB - rateA;
        });
      default:
        return projects;
    }
  };

  const calculateResponseRate = (project: Project) => {
    const totalResponses = project.bids[0]?.count || 0;
    const totalInvites = totalResponses + project.pendingBids;
    return totalInvites > 0 ? (totalResponses / totalInvites) * 100 : 0;
  };

  const calculateOverallResponseRate = () => {
    if (!projects?.length) return 0;
    const totalResponses = projects.reduce((acc, project) => acc + (project.bids[0]?.count || 0), 0);
    const totalInvites = projects.reduce((acc, project) => acc + ((project.bids[0]?.count || 0) + project.pendingBids), 0);
    return totalInvites > 0 ? (totalResponses / totalInvites) * 100 : 0;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-construction-900">Projects Requiring Attention</h2>
          <ProjectsSorting sortBy={sortBy} onSortChange={setSortBy} />
        </div>
        
        <div className="space-y-6">
          {projects?.map((project) => (
            <ProjectAttentionItem 
              key={project.id} 
              project={project}
              onRefetch={refetch}
            />
          ))}
        </div>

        <div className="mt-8 pt-6 border-t">
          <BidResponseRate responseRate={calculateOverallResponseRate()} />
        </div>
      </CardContent>
    </Card>
  );
};
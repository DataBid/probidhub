import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "../types";
import { addDays } from "date-fns";

export const useProjectsAttention = (sortBy: string) => {
  return useQuery({
    queryKey: ["projects-attention", sortBy],
    queryFn: async () => {
      console.log("Fetching projects requiring attention with sort:", sortBy);
      const sevenDaysFromNow = addDays(new Date(), 7).toISOString();
      
      const { data: projectsData, error } = await supabase
        .from("projects")
        .select(`
          *,
          bids:bids(
            id,
            status,
            response_date
          )
        `)
        .lt("bids_due", sevenDaysFromNow)
        .gt("bids_due", new Date().toISOString())
        .order("bids_due", { ascending: true });

      if (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
      
      console.log("Raw projects data:", projectsData);
      
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
        } as Project;
      }));

      console.log("Enhanced projects:", enhancedProjects);
      return sortProjects(enhancedProjects, sortBy);
    },
  });
};

const calculateIssues = (project: any) => {
  const issues = [];
  if (project.stage === "pending") issues.push("Project pending review");
  if (!project.industry) issues.push("Missing industry information");
  return issues;
};

const sortProjects = (projects: Project[], sortCriteria: string) => {
  console.log("Sorting projects by:", sortCriteria);
  
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
  const totalResponses = project.bids.filter(bid => bid.status === 'responded').length;
  const totalInvites = project.bids.length + project.pendingBids;
  return totalInvites > 0 ? (totalResponses / totalInvites) * 100 : 0;
};
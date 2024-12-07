import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { BidResponseRate } from "./BidResponseRate";
import { Project, Bid } from "./types";
import { addDays } from "date-fns";
import { ProjectsSorting } from "./ProjectsSorting";
import { useState } from "react";
import { ProjectAttentionItem } from "./ProjectAttentionItem";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const ProjectsAttentionList = ({ onExport }: { onExport: (projects: Project[]) => void }) => {
  const [sortBy, setSortBy] = useState("deadline");

  const { data: projects, isLoading, refetch } = useQuery({
    queryKey: ["projects-attention", sortBy],
    queryFn: async () => {
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
        } as Project;
      }));

      return sortProjects(enhancedProjects, sortBy);
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
    const totalResponses = project.bids.filter(bid => bid.status === 'responded').length;
    const totalInvites = project.bids.length + project.pendingBids;
    return totalInvites > 0 ? (totalResponses / totalInvites) * 100 : 0;
  };

  const calculateBidRates = () => {
    if (!projects?.length) return {
      viewedRate: 0,
      respondedRate: 0,
      pendingRate: 100,
      totalRate: 0
    };

    let totalBids = 0;
    let viewedBids = 0;
    let respondedBids = 0;

    projects.forEach(project => {
      const bids = project.bids || [];
      totalBids += bids.length;
      
      bids.forEach(bid => {
        if (bid.status === 'responded') {
          respondedBids++;
        } else if (bid.status === 'viewed' || bid.response_date) {
          viewedBids++;
        }
      });
    });

    const pendingBids = totalBids - (viewedBids + respondedBids);
    
    return {
      viewedRate: totalBids ? (viewedBids / totalBids) * 100 : 0,
      respondedRate: totalBids ? (respondedBids / totalBids) * 100 : 0,
      pendingRate: totalBids ? (pendingBids / totalBids) * 100 : 100,
      totalRate: totalBids ? ((viewedBids + respondedBids) / totalBids) * 100 : 0
    };
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const bidRates = calculateBidRates();

  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-construction-900">Projects Requiring Attention</h2>
          <div className="flex gap-2 items-center">
            <ProjectsSorting sortBy={sortBy} onSortChange={setSortBy} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport(projects || [])}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
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
          <BidResponseRate 
            responseRate={bidRates.totalRate}
            viewedRate={bidRates.viewedRate}
            respondedRate={bidRates.respondedRate}
            pendingRate={bidRates.pendingRate}
          />
        </div>
      </CardContent>
    </Card>
  );
};

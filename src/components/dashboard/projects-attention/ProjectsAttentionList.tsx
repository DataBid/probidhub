import { Card, CardContent } from "@/components/ui/card";
import { BidResponseRate } from "./BidResponseRate";
import { Project } from "./types";
import { useState } from "react";
import { ProjectAttentionItem } from "./ProjectAttentionItem";
import { useProjectsAttention } from "./hooks/useProjectsAttention";
import { ProjectsAttentionHeader } from "./components/ProjectsAttentionHeader";
import { calculateBidRates } from "./utils/bidRateUtils";

export const ProjectsAttentionList = ({ onExport }: { onExport: (projects: Project[]) => void }) => {
  const [sortBy, setSortBy] = useState("deadline");
  const { data: projects, isLoading, refetch } = useProjectsAttention(sortBy);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const bidRates = calculateBidRates(projects || []);

  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <ProjectsAttentionHeader 
          sortBy={sortBy}
          onSortChange={setSortBy}
          onExport={() => onExport(projects || [])}
        />
        
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
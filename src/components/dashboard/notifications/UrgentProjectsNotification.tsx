import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { addDays, formatDistanceToNow } from "date-fns";

export const UrgentProjectsNotification = () => {
  const navigate = useNavigate();

  const { data: urgentProjects } = useQuery({
    queryKey: ["urgent-projects-details"],
    queryFn: async () => {
      const threeDaysFromNow = addDays(new Date(), 3).toISOString();
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, bids_due")
        .gt("bids_due", new Date().toISOString())
        .lt("bids_due", threeDaysFromNow);

      if (error) {
        console.error("Error fetching urgent projects:", error);
        return [];
      }

      return data || [];
    },
  });

  if (!urgentProjects?.length) return null;

  return (
    <div className="w-full">
      <p className="text-sm text-construction-800 break-words">
        <span className="font-medium">{urgentProjects.length}</span>{" "}
        {urgentProjects.length === 1 ? 
          "project has" : 
          "projects have"} 
        {" "}a deadline within 3 days
      </p>
      <div className="mt-1">
        {urgentProjects.slice(0, 2).map((project) => (
          <div key={project.id} className="text-xs text-construction-600 mt-1">
            {project.title} - Due {formatDistanceToNow(new Date(project.bids_due), { addSuffix: true })}
          </div>
        ))}
        {urgentProjects.length > 2 && (
          <div className="text-xs text-construction-600 mt-1">
            And {urgentProjects.length - 2} more...
          </div>
        )}
      </div>
      <Button 
        variant="outline"
        size="sm"
        className="text-xs text-[#D00000] hover:text-[#BB0000] mt-2"
        onClick={() => navigate("/projects")}
      >
        View Urgent Projects
      </Button>
    </div>
  );
};
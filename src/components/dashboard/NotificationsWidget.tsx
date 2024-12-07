import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { addDays, formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const NotificationsWidget = () => {
  const navigate = useNavigate();

  // Query for pending bid invitations with view status
  const { data: pendingBidsDetails } = useQuery({
    queryKey: ["pending-bids-details"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bids")
        .select(`
          id,
          project_id,
          status,
          viewed: CASE 
            WHEN response_date IS NOT NULL THEN true
            ELSE false
          END
        `)
        .eq("status", "pending");

      if (error) {
        console.error("Error fetching pending bids:", error);
        return { viewed: 0, notViewed: 0, total: 0, bids: [] };
      }

      const bids = data || [];
      const viewed = bids.filter(bid => bid.viewed).length;
      const notViewed = bids.filter(bid => !bid.viewed).length;

      return {
        viewed,
        notViewed,
        total: bids.length,
        bids
      };
    },
  });

  // Query for urgent projects (due within 3 days)
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

  const handleSendReminder = async (projectId: string) => {
    const { error } = await supabase
      .from("notifications")
      .insert({
        project_id: projectId,
        type: "reminder",
        message: "Reminder: Your response to the bid invitation is pending",
      });

    if (error) {
      toast.error("Failed to send reminder");
    } else {
      toast.success("Reminder sent successfully");
    }
  };

  if (!pendingBidsDetails && !urgentProjects) return null;

  return (
    <Card className="bg-white mb-6 border-2 border-construction-200 hover:border-construction-300 transition-colors duration-200">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold text-construction-900 mb-4">Recent Notifications</h2>
        <div className="space-y-3">
          {pendingBidsDetails?.total > 0 && (
            <div className="group relative flex items-start gap-2 p-3 rounded-lg bg-[#FFC300]/10 border border-[#FFC300]/20 hover:bg-[#FFC300]/15 transition-colors duration-200">
              <AlertTriangle className="h-5 w-5 text-[#FFC300] shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-construction-800 break-words">
                  <span className="font-medium">{pendingBidsDetails.total}</span>{" "}
                  {pendingBidsDetails.total === 1 ? 
                    "subcontractor has" : 
                    "subcontractors have"} 
                  {" "}not responded to invitations
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-construction-600">
                  <Eye className="h-4 w-4" />
                  <span>{pendingBidsDetails.viewed} viewed</span>
                  <EyeOff className="h-4 w-4 ml-2" />
                  <span>{pendingBidsDetails.notViewed} not viewed</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs text-primary hover:text-primary-hover"
                    onClick={() => navigate("/projects")}
                  >
                    View Projects
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-xs text-primary hover:text-primary-hover"
                    onClick={() => handleSendReminder(pendingBidsDetails.bids[0]?.project_id)}
                  >
                    Send Reminder
                  </Button>
                </div>
              </div>
            </div>
          )}
          {urgentProjects && urgentProjects.length > 0 && (
            <div className="group relative flex items-start gap-2 p-3 rounded-lg bg-[#D00000]/10 border border-[#D00000]/20 hover:bg-[#D00000]/15 transition-colors duration-200">
              <AlertCircle className="h-5 w-5 text-[#D00000] shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
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
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
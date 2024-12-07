import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle, AlertCircle } from "lucide-react";
import { addDays, formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const NotificationsWidget = () => {
  // Query for pending bid invitations
  const { data: pendingBids } = useQuery({
    queryKey: ["pending-bids-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("bids")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");
      return count || 0;
    },
  });

  // Query for urgent projects (due within 3 days)
  const { data: urgentProjects } = useQuery({
    queryKey: ["urgent-projects-count"],
    queryFn: async () => {
      const threeDaysFromNow = addDays(new Date(), 3).toISOString();
      const { data } = await supabase
        .from("projects")
        .select("bids_due")
        .gt("bids_due", new Date().toISOString())
        .lt("bids_due", threeDaysFromNow);
      return data?.length || 0;
    },
  });

  if (!pendingBids && !urgentProjects) return null;

  return (
    <Card className="bg-white mb-6 border-2 border-construction-200 hover:border-construction-300 transition-colors duration-200">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold text-construction-900 mb-4">Recent Notifications</h2>
        <div className="space-y-3">
          {pendingBids > 0 && (
            <div className="group relative flex items-start gap-2 p-3 rounded-lg bg-[#FFC300]/10 border border-[#FFC300]/20 hover:bg-[#FFC300]/15 transition-colors duration-200">
              <AlertTriangle className="h-5 w-5 text-[#FFC300] shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-construction-800 break-words">
                  <span className="font-medium">{pendingBids}</span>{" "}
                  {pendingBids === 1 ? 
                    "subcontractor has not" : 
                    "subcontractors have not"} 
                  {" "}responded to invitations
                </p>
                <Button 
                  variant="link" 
                  className="text-xs text-primary hover:text-primary-hover p-0 h-auto mt-1"
                  onClick={() => console.log("View pending bids")}
                >
                  View Details →
                </Button>
              </div>
            </div>
          )}
          {urgentProjects > 0 && (
            <div className="group relative flex items-start gap-2 p-3 rounded-lg bg-[#D00000]/10 border border-[#D00000]/20 hover:bg-[#D00000]/15 transition-colors duration-200">
              <AlertCircle className="h-5 w-5 text-[#D00000] shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-construction-800 break-words">
                  <span className="font-medium">{urgentProjects}</span>{" "}
                  {urgentProjects === 1 ? 
                    "project has a" : 
                    "projects have a"} 
                  {" "}deadline within 3 days
                </p>
                <Button 
                  variant="link" 
                  className="text-xs text-[#D00000] hover:text-[#BB0000] p-0 h-auto mt-1"
                  onClick={() => console.log("View urgent projects")}
                >
                  View Details →
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

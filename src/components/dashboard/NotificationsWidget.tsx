import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle } from "lucide-react";
import { addDays, formatDistanceToNow } from "date-fns";

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
    <Card className="bg-white mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center gap-1.5 mb-3">
          <Bell className="h-5 w-5 text-accent shrink-0" />
          <h2 className="text-lg font-semibold text-construction-900">Notifications</h2>
        </div>
        <div className="space-y-2">
          {pendingBids > 0 && (
            <div className="flex items-start gap-1.5 p-1.5 rounded-lg bg-accent/10 border border-accent/20">
              <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-construction-800 break-words px-0" style={{ maxWidth: "25ch" }}>
                  <span className="font-medium">{pendingBids}</span>{" "}
                  {pendingBids === 1 ? 
                    "subcontractor has not" : 
                    "subcontractors have not"} 
                  {" "}responded to invitations
                </p>
              </div>
            </div>
          )}
          {urgentProjects > 0 && (
            <div className="flex items-start gap-1.5 p-1.5 rounded-lg bg-accent/10 border border-accent/20">
              <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-construction-800 break-words px-0" style={{ maxWidth: "25ch" }}>
                  <span className="font-medium">{urgentProjects}</span>{" "}
                  {urgentProjects === 1 ? 
                    "project has a" : 
                    "projects have a"} 
                  {" "}deadline within 3 days
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
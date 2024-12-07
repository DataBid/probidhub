import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const PendingBidsNotification = () => {
  const navigate = useNavigate();

  const { data: pendingBidsDetails } = useQuery({
    queryKey: ["pending-bids-details"],
    queryFn: async () => {
      console.log("Fetching pending bids details...");
      const { data: bidsData, error } = await supabase
        .from("bids")
        .select("id, project_id, status, response_date")
        .eq("status", "pending");

      if (error) {
        console.error("Error fetching pending bids:", error);
        return { viewed: 0, notViewed: 0, total: 0, bids: [] };
      }

      const bids = bidsData || [];
      const processedBids = bids.map(bid => ({
        ...bid,
        viewed: bid.response_date !== null
      }));

      const viewed = processedBids.filter(bid => bid.viewed).length;
      const notViewed = processedBids.filter(bid => !bid.viewed).length;

      console.log("Processed bids:", {
        total: bids.length,
        viewed,
        notViewed,
        bids: processedBids
      });

      return {
        viewed,
        notViewed,
        total: bids.length,
        bids: processedBids
      };
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

  if (!pendingBidsDetails?.total) return null;

  return (
    <div className="w-full">
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
  );
};
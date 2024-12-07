import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { BidInvitationFilters } from "./bid-invitations/BidInvitationFilters";
import { BidInvitationItem } from "./bid-invitations/BidInvitationItem";

export const BidInvitations = () => {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const { data: bids, isLoading } = useQuery({
    queryKey: ["bid-invitations", statusFilter, dateFilter],
    queryFn: async () => {
      let query = supabase
        .from("bids")
        .select(`
          *,
          project:projects(title),
          subcontractor:profiles(company_name, contact_email)
        `)
        .order('created_at', { ascending: false });

      // Apply status filter
      if (statusFilter !== "all") {
        query = query.eq('status', statusFilter);
      }

      // Apply date filter
      if (dateFilter !== "all") {
        const now = new Date();
        let startDate;
        
        switch (dateFilter) {
          case "today":
            startDate = new Date(now.setHours(0, 0, 0, 0));
            break;
          case "week":
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
          case "month":
            startDate = new Date(now.setDate(now.getDate() - 30));
            break;
        }
        
        if (startDate) {
          query = query.gte('created_at', startDate.toISOString());
        }
      }

      query = query.limit(5);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleReminder = async (bidId: string, email: string) => {
    await supabase
      .from('bids')
      .update({ 
        reminder_sent_date: new Date().toISOString(),
        status: 'pending'
      })
      .eq('id', bidId);

    toast({
      title: "Reminder Sent",
      description: `A reminder has been sent to ${email}`,
    });
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "responded":
        return "bg-green-100 text-green-800 border-green-200";
      case "viewed":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-construction-900">Recent Bid Invitations</h2>
      <BidInvitationFilters
        statusFilter={statusFilter}
        dateFilter={dateFilter}
        onStatusChange={setStatusFilter}
        onDateChange={setDateFilter}
      />
      <div className="space-y-4">
        {bids?.map((bid) => (
          <BidInvitationItem
            key={bid.id}
            bid={bid}
            onReminder={handleReminder}
            getStatusStyles={getStatusStyles}
          />
        ))}
      </div>
    </div>
  );
};
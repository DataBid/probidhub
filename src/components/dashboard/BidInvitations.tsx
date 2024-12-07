import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export const BidInvitations = () => {
  const { toast } = useToast();
  const { data: bids, isLoading } = useQuery({
    queryKey: ["bid-invitations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bids")
        .select(`
          *,
          project:projects(title),
          subcontractor:profiles(company_name, contact_email)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-construction-900">Recent Bid Invitations</h2>
      <div className="space-y-4">
        {bids?.map((bid) => (
          <div
            key={bid.id}
            className={`flex items-center justify-between p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow ${
              bid.status === "responded" ? "bg-green-50 border-green-200" : "bg-white"
            }`}
          >
            <div>
              <h3 className="font-medium text-construction-900">{bid.project?.title}</h3>
              <p className="text-sm text-construction-500">
                {bid.subcontractor?.company_name}
              </p>
              <p className="text-sm text-construction-400">
                Sent: {format(new Date(bid.created_at), "MMM d, yyyy")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(bid.status)}`}
              >
                {bid.status}
              </span>
              {bid.status !== "responded" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-primary hover:text-primary-hover"
                  onClick={() => handleReminder(bid.id, bid.subcontractor?.contact_email)}
                >
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Send Reminder</span>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
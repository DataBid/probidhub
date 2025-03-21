
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const BidBoard = () => {
  const session = useSession();

  const { data: bids, isLoading } = useQuery({
    queryKey: ['sub-bids', session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bids')
        .select(`
          *,
          project:projects(*)
        `)
        .eq('subcontractor_id', session?.user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const getStatusIcon = (status: string | null) => {
    switch(status) {
      case 'interested':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'not_interested':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch(status) {
      case 'interested':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Will Bid</Badge>;
      case 'not_interested':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Not Bidding</Badge>;
      default:
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Bid Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!bids || bids.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Bid Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6 text-muted-foreground">
            <p>You don't have any bid invitations yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Your Bid Board</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bids.map((bid) => (
            <div key={bid.id} className="flex flex-col p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{bid.project?.title || 'Untitled Project'}</h3>
                  <p className="text-sm text-muted-foreground">
                    Due: {bid.project?.bids_due ? format(new Date(bid.project.bids_due), 'MMM d, yyyy') : 'No due date'}
                  </p>
                </div>
                {getStatusBadge(bid.status)}
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm">{bid.project?.location || 'No location specified'}</p>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

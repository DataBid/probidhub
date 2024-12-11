import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BidsSectionProps {
  subcontractorId: string;
}

export const BidsSection = ({ subcontractorId }: BidsSectionProps) => {
  const { data: bids, isLoading } = useQuery({
    queryKey: ['bids', subcontractorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bids')
        .select(`
          *,
          projects (
            title
          )
        `)
        .eq('subcontractor_id', subcontractorId)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading bids...</div>;
  }

  if (!bids?.length) {
    return <div className="text-sm text-muted-foreground">No bid history</div>;
  }

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <DollarSign className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-semibold">Recent Bids</h4>
      </div>
      <div className="space-y-3">
        {bids.map((bid) => (
          <div key={bid.id} className="flex items-center justify-between text-sm">
            <span className="font-medium truncate max-w-[200px]">
              {bid.projects?.title}
            </span>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{bid.status}</Badge>
              <span className="text-muted-foreground">
                {format(new Date(bid.created_at), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
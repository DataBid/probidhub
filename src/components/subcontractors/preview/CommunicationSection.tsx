import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { History } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommunicationSectionProps {
  subcontractorId: string;
}

export const CommunicationSection = ({ subcontractorId }: CommunicationSectionProps) => {
  const { data: communications, isLoading } = useQuery({
    queryKey: ['communications', subcontractorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communication_logs')
        .select('*')
        .eq('company_id', subcontractorId)  // Changed from subcontractor_id to company_id
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading communications...</div>;
  }

  if (!communications?.length) {
    return <div className="text-sm text-muted-foreground">No communication history</div>;
  }

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <History className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-semibold">Recent Communications</h4>
      </div>
      <div className="space-y-3">
        {communications.map((comm) => (
          <div key={comm.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{comm.type}</Badge>
              <span className="text-muted-foreground">
                {format(new Date(comm.created_at), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
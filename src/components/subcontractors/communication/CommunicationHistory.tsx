import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare } from "lucide-react";

interface CommunicationHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subcontractorId: string;
  subcontractorName: string;
}

export const CommunicationHistory = ({ 
  open, 
  onOpenChange, 
  subcontractorId,
  subcontractorName 
}: CommunicationHistoryProps) => {
  const { data: communications, isLoading } = useQuery({
    queryKey: ['communications', subcontractorId],
    queryFn: async () => {
      console.log('Fetching communications for subcontractor:', subcontractorId);
      const { data, error } = await supabase
        .from('communication_logs')
        .select('*')
        .eq('subcontractor_id', subcontractorId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: open && !!subcontractorId,
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Communication History - {subcontractorName}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <p>Loading communications...</p>
            </div>
          ) : !communications?.length ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <p>No communication history found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {communications.map((comm) => (
                <div key={comm.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(comm.type)}
                      <Badge variant="outline">{comm.type}</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(comm.created_at), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                  {comm.subject && (
                    <p className="font-medium">{comm.subject}</p>
                  )}
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {comm.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
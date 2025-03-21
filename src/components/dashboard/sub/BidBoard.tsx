
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Calendar, Clock, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/utils/statusColorUtils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export const BidBoard = () => {
  const { data: bids, isLoading } = useQuery({
    queryKey: ["bids-board"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bids')
        .select(`
          id,
          status,
          created_at,
          response_date,
          projects (
            id,
            title,
            bids_due,
            location,
            stage
          )
        `)
        .order('created_at', { ascending: false })
        .limit(30);

      if (error) throw error;
      return data;
    },
  });

  // Group bids by status
  const columns = {
    new: {
      title: "New Invitations",
      bids: bids?.filter(bid => !bid.status || bid.status === 'pending') || []
    },
    viewed: {
      title: "Viewed",
      bids: bids?.filter(bid => bid.status === 'viewed') || []
    },
    inProgress: {
      title: "In Progress",
      bids: bids?.filter(bid => bid.status === 'in_progress') || []
    },
    submitted: {
      title: "Submitted",
      bids: bids?.filter(bid => bid.status === 'responded') || []
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bid Board</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6 min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Bid Board</CardTitle>
        <Button size="sm" variant="outline" className="gap-1">
          <Plus className="h-4 w-4" /> Add Bid
        </Button>
      </CardHeader>
      <CardContent className="overflow-auto pb-6">
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(columns).map(([id, column]) => (
            <div key={id} className="flex flex-col h-full">
              <div className="bg-muted p-2 rounded-t-md border-b flex justify-between items-center">
                <h3 className="font-medium text-sm">{column.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {column.bids.length}
                </Badge>
              </div>
              <div className="flex-1 bg-muted/40 rounded-b-md p-2 space-y-2 min-h-[250px]">
                {column.bids.map((bid) => (
                  <div 
                    key={bid.id} 
                    className="bg-white p-3 rounded-md border shadow-sm hover:shadow transition-shadow cursor-pointer"
                  >
                    <div className="font-medium text-sm truncate mb-1">
                      {bid.projects?.title}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2 truncate">
                      {bid.projects?.location}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {bid.projects?.bids_due ? format(new Date(bid.projects.bids_due), "MMM d") : "No date"}
                        </span>
                      </div>
                      <Badge className={getStatusColor(bid.projects?.stage || "")}>
                        {bid.projects?.stage}
                      </Badge>
                    </div>
                  </div>
                ))}
                {column.bids.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-sm text-muted-foreground text-center py-4">
                      No bids in this status
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

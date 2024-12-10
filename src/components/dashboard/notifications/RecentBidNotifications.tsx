import { useEffect } from "react";
import { NotificationsWidget } from "../NotificationsWidget";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RecentBidNotificationsProps {
  userRole?: string;
}

export const RecentBidNotifications = ({ userRole }: RecentBidNotificationsProps) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("Setting up real-time notifications subscription");
    
    const channel = supabase
      .channel('notifications-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          console.log('Received notification change:', payload);
          
          // Invalidate and refetch notifications
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
          
          // Show toast for new notifications
          if (payload.eventType === 'INSERT') {
            toast.info('New notification received');
          }
        }
      )
      .subscribe((status) => {
        console.log('Notification subscription status:', status);
      });

    return () => {
      console.log("Cleaning up notifications subscription");
      channel.unsubscribe();
    };
  }, [queryClient]);

  return <NotificationsWidget userRole={userRole} />;
};
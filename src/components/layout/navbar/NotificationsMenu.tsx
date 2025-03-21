
import React, { useEffect } from 'react';
import { Bell, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { addDays } from "date-fns";

export const NotificationsMenu = () => {
  const session = useSession();
  const navigate = useNavigate();

  // Get regular notifications
  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      console.log("Fetching notifications...");
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching notifications:", error);
        throw error;
      }

      console.log("Fetched notifications:", data);
      return data || [];
    },
    enabled: !!session,
  });

  // Get urgent deadlines (projects due within 3 days)
  const { data: urgentDeadlines = [] } = useQuery({
    queryKey: ['urgent-deadlines'],
    queryFn: async () => {
      const threeDaysFromNow = addDays(new Date(), 3).toISOString();
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, bids_due")
        .gt("bids_due", new Date().toISOString())
        .lt("bids_due", threeDaysFromNow)
        .limit(3);

      if (error) {
        console.error("Error fetching urgent deadlines:", error);
        return [];
      }

      return data || [];
    },
    enabled: !!session,
  });

  // Get pending bids count
  const { data: pendingBids = [] } = useQuery({
    queryKey: ['pending-bids-brief'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bids")
        .select("id, project_id, status")
        .eq("status", "pending")
        .limit(3);

      if (error) {
        console.error("Error fetching pending bids:", error);
        return [];
      }

      return data || [];
    },
    enabled: !!session,
  });

  // Calculate total urgent items
  const totalUrgentItems = notifications.length + urgentDeadlines.length + pendingBids.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {totalUrgentItems > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center animate-pulse">
              {totalUrgentItems}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm text-construction-900">Recent Notifications</h3>
            {totalUrgentItems > 0 && (
              <Badge variant="destructive" className="text-xs">
                {totalUrgentItems} {totalUrgentItems === 1 ? 'item' : 'items'} need attention
              </Badge>
            )}
          </div>
          
          {/* Urgent Deadlines Section */}
          {urgentDeadlines.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1 text-red-500" />
                Upcoming Deadlines
              </h4>
              <div className="space-y-2">
                {urgentDeadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className="text-sm p-2 bg-red-50 hover:bg-red-100 rounded-md cursor-pointer"
                    onClick={() => navigate(`/projects/${deadline.id}`)}
                  >
                    <p className="text-construction-900">{deadline.title}</p>
                    <p className="text-xs text-red-500 mt-1">
                      Due: {new Date(deadline.bids_due).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Pending Bids Section */}
          {pendingBids.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                Pending Responses
              </h4>
              <div className="space-y-2">
                <div
                  className="text-sm p-2 bg-amber-50 hover:bg-amber-100 rounded-md cursor-pointer"
                  onClick={() => navigate('/bids')}
                >
                  <p className="text-construction-900">
                    {pendingBids.length} {pendingBids.length === 1 ? 'bid' : 'bids'} pending review
                  </p>
                  <p className="text-xs text-amber-500 mt-1">
                    Awaiting your response
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Regular Notifications */}
          {notifications.length > 0 ? (
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-muted-foreground">General Notifications</h4>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="text-sm p-2 hover:bg-muted rounded-md cursor-pointer"
                >
                  <p className="text-construction-900">{notification.message}</p>
                  <p className="text-xs text-construction-500 mt-1">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 && urgentDeadlines.length === 0 && pendingBids.length === 0 ? (
            <p className="text-sm text-construction-500">No new notifications</p>
          ) : null}
          
          {/* View All Link */}
          <Button 
            variant="outline" 
            className="w-full text-sm"
            onClick={() => navigate('/notifications')}
          >
            View All Notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

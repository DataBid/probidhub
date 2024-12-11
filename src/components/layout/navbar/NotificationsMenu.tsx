import React from 'react';
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

export const NotificationsMenu = () => {
  const session = useSession();

  const { data: notifications } = useQuery({
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications && notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4 space-y-4">
          <h3 className="font-semibold text-sm text-construction-900">Recent Notifications</h3>
          {notifications && notifications.length > 0 ? (
            <div className="space-y-3">
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
          ) : (
            <p className="text-sm text-construction-500">No new notifications</p>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
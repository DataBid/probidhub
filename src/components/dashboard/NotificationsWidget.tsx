import { Card, CardContent } from "@/components/ui/card";
import { PendingBidsNotification } from "./notifications/PendingBidsNotification";
import { UrgentProjectsNotification } from "./notifications/UrgentProjectsNotification";
import { Bell, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const NotificationsWidget = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDismiss = async (notificationId: string) => {
    console.log("Dismissing notification:", notificationId);
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;

      toast({
        title: "Notification dismissed",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error dismissing notification:", error);
      toast({
        title: "Error dismissing notification",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white mb-6 border-2 border-construction-200 hover:border-construction-300 transition-colors duration-200">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-construction-900">Recent Notifications</h2>
          <Badge variant="secondary" className="text-xs">
            2 New
          </Badge>
        </div>
        
        <div className="space-y-3">
          {/* Pending Bids Notification with Bell Icon */}
          <div className="relative flex items-start gap-3 p-3 bg-muted rounded-lg group hover:bg-muted/80 transition-colors">
            <Bell className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <PendingBidsNotification />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDismiss("pending-bids")}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Urgent Projects Notification with Warning Icon */}
          <div className="relative flex items-start gap-3 p-3 bg-muted rounded-lg group hover:bg-muted/80 transition-colors">
            <AlertTriangle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
            <UrgentProjectsNotification />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDismiss("urgent-projects")}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* See All Link */}
        <Button 
          variant="link" 
          className="w-full mt-4 text-primary hover:text-primary/80"
          onClick={() => navigate("/notifications")}
        >
          See All Notifications
        </Button>
      </CardContent>
    </Card>
  );
};
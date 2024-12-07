import { Card, CardContent } from "@/components/ui/card";
import { PendingBidsNotification } from "./notifications/PendingBidsNotification";
import { UrgentProjectsNotification } from "./notifications/UrgentProjectsNotification";

export const NotificationsWidget = () => {
  return (
    <Card className="bg-white mb-6 border-2 border-construction-200 hover:border-construction-300 transition-colors duration-200">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold text-construction-900 mb-4">Recent Notifications</h2>
        <div className="space-y-3">
          <PendingBidsNotification />
          <UrgentProjectsNotification />
        </div>
      </CardContent>
    </Card>
  );
};
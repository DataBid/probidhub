import { NotificationsWidget } from "../NotificationsWidget";

interface RecentBidNotificationsProps {
  userRole?: string;
}

export const RecentBidNotifications = ({ userRole }: RecentBidNotificationsProps) => {
  return (
    <div className="rounded-lg border bg-white shadow-sm p-3 sm:p-6">
      <NotificationsWidget userRole={userRole} />
    </div>
  );
};
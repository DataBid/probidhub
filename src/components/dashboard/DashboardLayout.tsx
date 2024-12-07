import { QuickMetrics } from "./QuickMetrics";
import { NotificationsWidget } from "./NotificationsWidget";
import { BidInvitations } from "./BidInvitations";
import { RecentProjects } from "./RecentProjects";
import { ProjectsAttention } from "./ProjectsAttention";
import { AnalyticsSnapshot } from "./AnalyticsSnapshot";
import { DashboardActions } from "./DashboardActions";

export const DashboardLayout = () => {
  return (
    <div className="px-2 sm:px-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden pb-20 lg:pb-6">
      {/* Actions Row - Stack vertically on mobile */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <DashboardActions />
      </div>

      {/* Quick Metrics - Responsive grid */}
      <QuickMetrics />

      {/* Two Column Layout - Stack on mobile */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Recent Bid Notifications */}
          <div className="rounded-lg border bg-white shadow-sm p-3 sm:p-6">
            <NotificationsWidget />
          </div>
          
          {/* Bid Invitations */}
          <div className="rounded-lg border bg-white shadow-sm p-3 sm:p-6">
            <BidInvitations />
          </div>
        </div>

        {/* Right Column */}
        <div className="rounded-lg border bg-white shadow-sm p-3 sm:p-6">
          <h2 className="text-lg font-semibold text-construction-900 mb-4 sm:mb-6">
            Recently Posted Projects
          </h2>
          <RecentProjects />
        </div>
      </div>

      {/* Projects Requiring Attention - Full width */}
      <div className="rounded-lg border bg-white shadow-sm p-3 sm:p-6 w-full">
        <ProjectsAttention />
      </div>

      {/* Analytics Snapshot - Full width */}
      <AnalyticsSnapshot />
    </div>
  );
};
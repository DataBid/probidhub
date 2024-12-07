import { QuickMetrics } from "./QuickMetrics";
import { NotificationsWidget } from "./NotificationsWidget";
import { BidInvitations } from "./BidInvitations";
import { RecentProjects } from "./RecentProjects";
import { ProjectsAttention } from "./ProjectsAttention";
import { ResponseRateChart } from "./ResponseRateChart";
import { TotalBidsChart } from "./TotalBidsChart";
import { DashboardActions } from "./DashboardActions";

export const DashboardLayout = () => {
  return (
    <div className="px-4 sm:px-6 space-y-6 max-w-full overflow-hidden">
      <DashboardActions />
      
      {/* Quick Metrics */}
      <QuickMetrics />

      {/* Two Column Layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Recent Bid Notifications */}
          <div className="rounded-lg border bg-white shadow-sm p-4 sm:p-6">
            <NotificationsWidget />
          </div>
          
          {/* Bid Invitations */}
          <div className="rounded-lg border bg-white shadow-sm p-4 sm:p-6">
            <BidInvitations />
          </div>
        </div>

        {/* Right Column */}
        <div className="rounded-lg border bg-white shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-construction-900 mb-6">
            Recently Posted Projects
          </h2>
          <RecentProjects />
        </div>
      </div>

      {/* Projects Requiring Attention */}
      <div className="rounded-lg border bg-white shadow-sm p-4 sm:p-6 w-full">
        <ProjectsAttention />
      </div>

      {/* Analytics Charts - Two Column Layout */}
      <div className="grid gap-6 md:grid-cols-2">
        <ResponseRateChart />
        <TotalBidsChart />
      </div>
    </div>
  );
};
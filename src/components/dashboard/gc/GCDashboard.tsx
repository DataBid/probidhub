
import { useSession } from "@supabase/auth-helpers-react";
import { QuickMetrics } from "../QuickMetrics";
import { DashboardActions } from "../DashboardActions";
import { RecentBidNotifications } from "../notifications/RecentBidNotifications";
import { BidInvitationsSection } from "../bid-invitations/BidInvitationsSection";
import { RecentProjectsSection } from "../projects/RecentProjectsSection";
import { ProjectsAttentionSection } from "../projects-attention/ProjectsAttentionSection";
import { AnalyticsSnapshot } from "../AnalyticsSnapshot";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const GCDashboard = () => {
  const session = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="px-2 sm:px-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden pb-20 lg:pb-6">
      <DashboardActions userRole="gc" />
      
      <Suspense fallback={
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        </div>
      }>
        <QuickMetrics userRole="gc" />
      </Suspense>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        <div className="space-y-4 sm:space-y-6">
          <Suspense fallback={<Skeleton className="h-64" />}>
            <RecentBidNotifications userRole="gc" />
          </Suspense>
          
          <Suspense fallback={<Skeleton className="h-64" />}>
            <BidInvitationsSection userRole="gc" />
          </Suspense>
        </div>

        <Suspense fallback={
          <div className="space-y-4">
            <Skeleton className="h-12" />
            <Skeleton className="h-[calc(100vh-16rem)]" />
          </div>
        }>
          <RecentProjectsSection userRole="gc" isGC={true} />
        </Suspense>
      </div>

      <Suspense fallback={
        <div className="space-y-4">
          <Skeleton className="h-12" />
          <Skeleton className="h-96" />
        </div>
      }>
        <ProjectsAttentionSection userRole="gc" />
      </Suspense>

      <Suspense fallback={
        <div className="space-y-4">
          <Skeleton className="h-12" />
          <Skeleton className="h-96" />
        </div>
      }>
        <AnalyticsSnapshot userRole="gc" />
      </Suspense>
    </div>
  );
};

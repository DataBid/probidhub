import { useSession } from "@supabase/auth-helpers-react";
import { QuickMetrics } from "./QuickMetrics";
import { DashboardActions } from "./DashboardActions";
import { RecentBidNotifications } from "./notifications/RecentBidNotifications";
import { BidInvitationsSection } from "./bid-invitations/BidInvitationsSection";
import { RecentProjectsSection } from "./projects/RecentProjectsSection";
import { ProjectsAttentionSection } from "./projects-attention/ProjectsAttentionSection";
import { AnalyticsSnapshot } from "./AnalyticsSnapshot";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserProfile } from "./hooks/useUserProfile";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const DashboardLayout = () => {
  const session = useSession();
  const { data: userProfile, isLoading: isLoadingProfile, error: profileError } = useUserProfile();
  const isGC = userProfile?.role === "gc";

  if (!session) {
    return null;
  }

  if (isLoadingProfile) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error loading your profile. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden pb-20 lg:pb-6">
      <DashboardActions userRole={userProfile?.role} />
      
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
        <QuickMetrics userRole={userProfile?.role} />
      </Suspense>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        <div className="space-y-4 sm:space-y-6">
          <Suspense fallback={<Skeleton className="h-64" />}>
            <RecentBidNotifications userRole={userProfile?.role} />
          </Suspense>
          
          {isGC && (
            <Suspense fallback={<Skeleton className="h-64" />}>
              <BidInvitationsSection userRole={userProfile?.role} />
            </Suspense>
          )}
        </div>

        <Suspense fallback={
          <div className="space-y-4">
            <Skeleton className="h-12" />
            <Skeleton className="h-[calc(100vh-16rem)]" />
          </div>
        }>
          <RecentProjectsSection userRole={userProfile?.role} isGC={isGC} />
        </Suspense>
      </div>

      {isGC && (
        <Suspense fallback={
          <div className="space-y-4">
            <Skeleton className="h-12" />
            <Skeleton className="h-96" />
          </div>
        }>
          <ProjectsAttentionSection userRole={userProfile?.role} />
        </Suspense>
      )}

      <Suspense fallback={
        <div className="space-y-4">
          <Skeleton className="h-12" />
          <Skeleton className="h-96" />
        </div>
      }>
        <AnalyticsSnapshot userRole={userProfile?.role} />
      </Suspense>
    </div>
  );
};
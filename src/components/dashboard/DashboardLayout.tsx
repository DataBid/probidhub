import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { QuickMetrics } from "./QuickMetrics";
import { DashboardActions } from "./DashboardActions";
import { RecentBidNotifications } from "./notifications/RecentBidNotifications";
import { BidInvitationsSection } from "./bid-invitations/BidInvitationsSection";
import { RecentProjectsSection } from "./projects/RecentProjectsSection";
import { ProjectsAttentionSection } from "./projects-attention/ProjectsAttentionSection";
import { AnalyticsSnapshot } from "./AnalyticsSnapshot";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardLayout = () => {
  const session = useSession();

  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["user-profile", session?.user?.id],
    queryFn: async () => {
      console.log("DashboardLayout: Fetching user profile for:", session?.user?.id);
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("DashboardLayout: Error fetching user profile:", error);
        throw error;
      }

      console.log("DashboardLayout: User profile fetched:", data);
      return data;
    },
    enabled: !!session?.user?.id,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  });

  const isGC = userProfile?.role === "gc";

  if (isLoadingProfile) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="px-2 sm:px-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden pb-20 lg:pb-6">
      <DashboardActions userRole={userProfile?.role} />
      
      <Suspense fallback={<Skeleton className="h-32" />}>
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

        <Suspense fallback={<Skeleton className="h-[calc(100vh-16rem)]" />}>
          <RecentProjectsSection userRole={userProfile?.role} isGC={isGC} />
        </Suspense>
      </div>

      {isGC && (
        <Suspense fallback={<Skeleton className="h-96" />}>
          <ProjectsAttentionSection userRole={userProfile?.role} />
        </Suspense>
      )}

      <Suspense fallback={<Skeleton className="h-96" />}>
        <AnalyticsSnapshot userRole={userProfile?.role} />
      </Suspense>
    </div>
  );
};

const DashboardSkeleton = () => (
  <div className="px-2 sm:px-6 space-y-4 sm:space-y-6">
    <Skeleton className="h-20" />
    <Skeleton className="h-32" />
    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
      <div className="space-y-4">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
      <Skeleton className="h-[calc(100vh-16rem)]" />
    </div>
    <Skeleton className="h-96" />
    <Skeleton className="h-96" />
  </div>
);
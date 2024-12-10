import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { QuickMetrics } from "./QuickMetrics";
import { NotificationsWidget } from "./NotificationsWidget";
import { BidInvitations } from "./BidInvitations";
import { RecentProjects } from "./RecentProjects";
import { ProjectsAttention } from "./ProjectsAttention";
import { AnalyticsSnapshot } from "./AnalyticsSnapshot";
import { DashboardActions } from "./DashboardActions";

export const DashboardLayout = () => {
  const session = useSession();

  const { data: userProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        throw error;
      }

      return data;
    },
    enabled: !!session?.user?.id,
  });

  const isGC = userProfile?.role === "gc";

  return (
    <div className="px-2 sm:px-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden pb-20 lg:pb-6">
      {/* Actions Row - Stack vertically on mobile */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <DashboardActions userRole={userProfile?.role} />
      </div>

      {/* Quick Metrics - Responsive grid */}
      <QuickMetrics userRole={userProfile?.role} />

      {/* Two Column Layout - Stack on mobile */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Recent Bid Notifications */}
          <div className="rounded-lg border bg-white shadow-sm p-3 sm:p-6">
            <NotificationsWidget userRole={userProfile?.role} />
          </div>
          
          {/* Bid Invitations - Only show for appropriate role */}
          {isGC && (
            <div className="rounded-lg border bg-white shadow-sm p-3 sm:p-6">
              <BidInvitations />
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="rounded-lg border bg-white shadow-sm p-3 sm:p-6">
          <h2 className="text-lg font-semibold text-construction-900 mb-4 sm:mb-6">
            {isGC ? "Recently Posted Projects" : "Available Projects"}
          </h2>
          <RecentProjects userRole={userProfile?.role} />
        </div>
      </div>

      {/* Projects Requiring Attention - Only show for GCs */}
      {isGC && (
        <div className="rounded-lg border bg-white shadow-sm p-3 sm:p-6 w-full">
          <ProjectsAttention />
        </div>
      )}

      {/* Analytics Snapshot - Show different metrics based on role */}
      <AnalyticsSnapshot userRole={userProfile?.role} />
    </div>
  );
};
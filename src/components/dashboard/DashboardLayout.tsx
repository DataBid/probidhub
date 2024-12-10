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
      {/* Actions Row */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <DashboardActions userRole={userProfile?.role} />
      </div>

      {/* Quick Metrics */}
      <QuickMetrics userRole={userProfile?.role} />

      {/* Two Column Layout */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          <RecentBidNotifications userRole={userProfile?.role} />
          
          {/* Bid Invitations - Only show for GCs */}
          {isGC && <BidInvitationsSection userRole={userProfile?.role} />}
        </div>

        {/* Right Column */}
        <RecentProjectsSection userRole={userProfile?.role} isGC={isGC} />
      </div>

      {/* Projects Requiring Attention - Only show for GCs */}
      {isGC && <ProjectsAttentionSection userRole={userProfile?.role} />}

      {/* Analytics Snapshot */}
      <AnalyticsSnapshot userRole={userProfile?.role} />
    </div>
  );
};
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { QuickMetrics } from "@/components/dashboard/QuickMetrics";
import { BidInvitations } from "@/components/dashboard/BidInvitations";
import { ProjectsAttention } from "@/components/dashboard/ProjectsAttention";
import { NotificationsWidget } from "@/components/dashboard/NotificationsWidget";
import { AnalyticsSnapshot } from "@/components/dashboard/AnalyticsSnapshot";
import { Button } from "@/components/ui/button";
import { Plus, Users, FolderOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking session state...");
        if (!session) {
          console.log("No session found, redirecting to login");
          navigate("/");
          return;
        }

        const { data: { user }, error } = await supabase.auth.getUser();
        console.log("User verification result:", user ? "User found" : "No user found");
        
        if (error || !user) {
          console.log("Session verification failed:", error?.message);
          toast({
            title: "Session expired",
            description: "Please log in again",
            variant: "destructive",
          });
          await supabase.auth.signOut();
          navigate("/");
        }
      } catch (error) {
        console.error("Session check error:", error);
        toast({
          title: "Authentication error",
          description: "Please try logging in again",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkSession();
  }, [session, navigate, supabase.auth, toast]);

  if (!session) {
    console.log("No session, returning null");
    return null;
  }

  return (
    <MainLayout>
      {/* Quick Actions Top Bar */}
      <div className="bg-white shadow-sm border-b mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button 
              className="bg-primary hover:bg-primary-hover text-white transition-colors duration-200 w-full sm:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
            <Button 
              className="bg-accent hover:bg-accent-hover text-accent-foreground transition-colors duration-200 w-full sm:w-auto"
            >
              <Users className="mr-2 h-4 w-4" />
              Invite Subcontractors
            </Button>
            <Button 
              className="bg-primary hover:bg-primary-hover text-white transition-colors duration-200 w-full sm:w-auto"
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              View All Projects
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 space-y-6 max-w-full overflow-hidden">
        {/* Quick Metrics */}
        <QuickMetrics />

        {/* Projects Requiring Attention - Full Width */}
        <div className="rounded-lg border bg-white shadow-sm p-4 sm:p-6 w-full">
          <ProjectsAttention />
        </div>

        {/* Two Column Layout for Recent Bids and Projects */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Bid Notifications */}
          <div className="rounded-lg border bg-white shadow-sm p-4 sm:p-6">
            <NotificationsWidget />
          </div>

          {/* Recently Posted Projects */}
          <div className="rounded-lg border bg-white shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-construction-900 mb-6">
              Recently Posted Projects
            </h2>
            <RecentProjects />
          </div>
        </div>

        {/* Bid Invitations */}
        <div className="rounded-lg border bg-white shadow-sm p-4 sm:p-6 w-full">
          <BidInvitations />
        </div>

        {/* Analytics Snapshot */}
        <div className="rounded-lg border bg-white shadow-sm p-4 sm:p-6 w-full">
          <AnalyticsSnapshot />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { QuickMetrics } from "@/components/dashboard/QuickMetrics";
import { BidInvitations } from "@/components/dashboard/BidInvitations";
import { ProjectsAttention } from "@/components/dashboard/ProjectsAttention";
import { Button } from "@/components/ui/button";
import { Plus, Users, FolderOpen } from "lucide-react";

const Dashboard = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [session, navigate]);

  if (!session) return null;

  return (
    <MainLayout>
      {/* Quick Actions Top Bar */}
      <div className="bg-white shadow-sm border-b mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between gap-4 flex-wrap">
            <Button 
              className="bg-primary hover:bg-primary-hover text-white transition-colors duration-200 min-w-[180px]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
            <Button 
              className="bg-accent hover:bg-accent-hover text-accent-foreground transition-colors duration-200 min-w-[180px]"
            >
              <Users className="mr-2 h-4 w-4" />
              Invite Subcontractors
            </Button>
            <Button 
              className="bg-secondary hover:bg-secondary-hover text-white transition-colors duration-200 min-w-[180px]"
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              View All Projects
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Metrics */}
        <QuickMetrics />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Projects */}
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-construction-900 mb-6">
                Recently Posted Projects
              </h2>
              <RecentProjects />
            </div>
          </div>

          {/* Projects Requiring Attention */}
          <ProjectsAttention />
        </div>

        {/* Bid Invitations */}
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <BidInvitations />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
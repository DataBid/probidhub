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
      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Create New Project
          </Button>
          <Button variant="secondary">
            <Users className="mr-2 h-4 w-4" />
            Invite Subcontractors
          </Button>
          <Button variant="outline">
            <FolderOpen className="mr-2 h-4 w-4" />
            View All Projects
          </Button>
        </div>

        {/* Quick Metrics */}
        <QuickMetrics />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Projects */}
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-6">Recently Posted Projects</h2>
              <RecentProjects />
            </div>
          </div>

          {/* Projects Requiring Attention */}
          <ProjectsAttention />
        </div>

        {/* Bid Invitations */}
        <div className="rounded-lg border bg-card p-6">
          <BidInvitations />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
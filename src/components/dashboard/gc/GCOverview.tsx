
import { Button } from "@/components/ui/button";
import { Plus, Download, Clock, ArrowRight, FileText, Users, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjectsData } from "../projects/hooks/useProjectsData";
import { Project } from "@/components/dashboard/projects-attention/types";
import { QuickMetrics } from "../QuickMetrics";
import { NotificationsWidget } from "../NotificationsWidget";
import { useIsMobile } from "@/hooks/use-mobile";

interface GCOverviewProps {
  userProfile: any;
}

export const GCOverview = ({ userProfile }: GCOverviewProps) => {
  const navigate = useNavigate();
  const { projects, isLoading } = useProjectsData();
  const isMobile = useIsMobile();
  
  // Calculate quick stats
  const activeProjects = projects?.filter(p => p.stage === 'active').length || 0;
  
  // Fix the pendingBids calculation with proper type checking
  const pendingBids = projects?.reduce((acc, project) => {
    // Check if project.bids exists and is an array
    if (!project.bids || !Array.isArray(project.bids)) return acc;
    
    // Safely access bid properties with type checking
    const pendingBidsCount = project.bids.filter(bid => {
      return 'status' in bid && bid.status === 'pending';
    }).length;
    
    return acc + pendingBidsCount;
  }, 0) || 0;
  
  // Projects with upcoming deadlines (next 7 days)
  const upcomingDeadlines = projects?.filter(project => {
    const deadline = new Date(project.bids_due);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).length || 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Enhanced GC Welcome Banner */}
      <div className="bg-gradient-to-r from-primary/90 to-primary rounded-lg shadow-md overflow-hidden">
        <div className="p-5 sm:p-6 md:p-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-2 text-white">{userProfile?.company_name ? `Welcome back, ${userProfile.company_name}` : 'Welcome back'}</h1>
          <p className="text-white/90 mb-4 max-w-2xl">Manage your projects and subcontractor bids efficiently from your personalized dashboard</p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Button 
              onClick={() => navigate('/projects/new')}
              size={isMobile ? "sm" : "default"}
              className="bg-white text-primary hover:bg-white/90 font-medium"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
            <Button 
              onClick={() => navigate('/subcontractors')}
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              className="text-white border-white hover:bg-white/20 font-medium"
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Subcontractors
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center">
            <div className="p-3 mr-4 bg-primary/10 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Projects</p>
              <h3 className="text-xl font-bold">{activeProjects}</h3>
              <Button 
                variant="link" 
                className="p-0 h-auto text-primary" 
                onClick={() => navigate('/projects')}
              >
                View all
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-yellow-500 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center">
            <div className="p-3 mr-4 bg-yellow-500/10 rounded-full">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Bids</p>
              <h3 className="text-xl font-bold">{pendingBids}</h3>
              <Button 
                variant="link" 
                className="p-0 h-auto text-yellow-500" 
                onClick={() => navigate('/bids')}
              >
                Review bids
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center">
            <div className="p-3 mr-4 bg-red-500/10 rounded-full">
              <Clock className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming Deadlines</p>
              <h3 className="text-xl font-bold">{upcomingDeadlines}</h3>
              <Button 
                variant="link" 
                className="p-0 h-auto text-red-500" 
                onClick={() => navigate('/projects?filter=upcoming')}
              >
                View urgent
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Metrics Overview */}
      <section className="rounded-lg border bg-card shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4 px-2">Performance Metrics</h2>
        <QuickMetrics userRole="gc" />
      </section>

      {/* Notifications Widget for Urgent Items */}
      <section className="rounded-lg border bg-card shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4 px-2">Important Notifications</h2>
        <NotificationsWidget userRole="gc" />
      </section>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Activity Feed */}
        <Card className="lg:col-span-2 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-6">
                  <p>Recent activity will appear here</p>
                  <Button variant="link" onClick={() => navigate('/projects')}>
                    View all projects
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Panel */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="default" 
              className="w-full justify-start bg-primary/90 hover:bg-primary"
              onClick={() => navigate('/projects/new')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-primary/30 text-primary hover:bg-primary/5"
              onClick={() => navigate('/subcontractors/new')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Subcontractor
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/projects')}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Project Report
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/analytics')}
            >
              <BarChart className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


import { Button } from "@/components/ui/button";
import { Plus, Download, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjectsData } from "../projects/hooks/useProjectsData";

interface GCOverviewProps {
  userProfile: any;
}

export const GCOverview = ({ userProfile }: GCOverviewProps) => {
  const navigate = useNavigate();
  const { projects, isLoading } = useProjectsData();
  
  // Calculate quick stats
  const activeProjects = projects?.filter(p => p.stage === 'active').length || 0;
  const pendingBids = projects?.reduce((acc, project) => {
    const pendingBidsCount = project.bids?.filter(bid => bid.status === 'pending').length || 0;
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
    <div className="space-y-6">
      {/* GC Welcome Banner */}
      <div className="bg-gradient-to-r from-primary/80 to-primary rounded-lg p-6 text-white shadow-md">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {userProfile?.company_name || 'Contractor'}</h1>
        <p className="text-white/90 mb-4">Manage your projects and subcontractor bids efficiently</p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button 
            onClick={() => navigate('/projects/new')}
            className="bg-white text-primary hover:bg-white/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Project
          </Button>
          <Button 
            onClick={() => navigate('/subcontractors')}
            variant="outline" 
            className="text-white border-white hover:bg-white/20"
          >
            Manage Subcontractors
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">{activeProjects}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Download className="h-5 w-5" />
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-4 w-full justify-between"
              onClick={() => navigate('/projects')}
            >
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Responses</p>
                <p className="text-2xl font-bold">{pendingBids}</p>
              </div>
              <div className="p-2 bg-yellow-500/10 rounded-full text-yellow-500">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-4 w-full justify-between"
              onClick={() => navigate('/bids')}
            >
              Review Pending Bids <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Deadlines</p>
                <p className="text-2xl font-bold">{upcomingDeadlines}</p>
              </div>
              <div className="p-2 bg-red-500/10 rounded-full text-red-500">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-4 w-full justify-between"
              onClick={() => navigate('/projects?filter=upcoming')}
            >
              View Urgent Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Activity Feed - Takes 2/3 of the space on larger screens */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
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

        {/* Quick Actions Panel - Takes 1/3 of the space */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/projects/new')}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Project
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/subcontractors/new')}>
                <Plus className="mr-2 h-4 w-4" />
                Add Subcontractor
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/projects')}>
                <Download className="mr-2 h-4 w-4" />
                Export Project Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

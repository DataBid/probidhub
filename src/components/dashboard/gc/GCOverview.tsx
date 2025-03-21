
import { Button } from "@/components/ui/button";
import { Plus, Download, Clock, ArrowRight, FileText, Users, BarChart, Calendar, CheckCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjectsData } from "../projects/hooks/useProjectsData";
import { Project } from "@/components/dashboard/projects-attention/types";
import { QuickMetrics } from "../QuickMetrics";
import { NotificationsWidget } from "../NotificationsWidget";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";
import { ProjectsAttention } from "../ProjectsAttention";
import { ProjectStatusBadge } from "@/components/projects/details/components/ProjectStatusBadge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface GCOverviewProps {
  userProfile: any;
}

interface FullBid {
  id: string;
  status: string | null;
  response_date: string | null;
}

export const GCOverview = ({ userProfile }: GCOverviewProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Use a separate query to get full bid details including status
  const { data: projectsWithFullBids, isLoading } = useQuery({
    queryKey: ["projects-with-full-bids"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          id,
          title,
          stage,
          location,
          project_class,
          industry,
          bids_due,
          prequalification,
          created_at,
          updated_at,
          bids (
            id,
            status,
            response_date
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching projects with full bids:", error);
        throw error;
      }

      return data;
    }
  });
  
  const projects = projectsWithFullBids;
  
  // Calculate quick stats
  const activeProjects = projects?.filter(p => p.stage === 'active').length || 0;
  
  // Fix the pendingBids calculation with proper type checking
  const pendingBids = projects?.reduce((acc, project) => {
    // Check if project.bids exists and is an array
    if (!project.bids || !Array.isArray(project.bids)) return acc;
    
    // Safely access bid properties with type checking
    const pendingBidsCount = project.bids.filter(bid => {
      return bid.status === 'pending';
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

  // Generate simplified data for project status chart
  const projectStatusData = [
    { name: "Active", value: activeProjects, fill: "#10b981" },
    { name: "Pending", value: projects?.filter(p => p.stage === 'pending').length || 0, fill: "#f59e0b" },
    { name: "Closed", value: projects?.filter(p => p.stage === 'closed').length || 0, fill: "#ef4444" }
  ];

  // Generate bid response data for visualization
  const bidResponseData = [
    { name: "Pending", value: pendingBids, fill: "#94a3b8" },
    { name: "Viewed", value: projects?.reduce((acc, p) => acc + (p.bids?.filter(b => b.status === 'viewed').length || 0), 0) || 0, fill: "#f59e0b" },
    { name: "Responded", value: projects?.reduce((acc, p) => acc + (p.bids?.filter(b => b.status === 'responded').length || 0), 0) || 0, fill: "#10b981" }
  ];

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

      {/* Interactive Metrics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status Distribution */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Project Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer config={{}} className="mt-4">
                <RechartsBarChart data={projectStatusData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ChartContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {projectStatusData.map((status) => (
                <div key={status.name} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: status.fill }} />
                  <span className="text-sm">{status.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bid Response Overview */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Bid Response Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bidResponseData.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span>{item.value}</span>
                  </div>
                  <Progress value={item.value} max={bidResponseData.reduce((acc, curr) => acc + curr.value, 0)} className="h-2" style={{ backgroundColor: "#f0f0f0" }}>
                    <div className="h-full" style={{ backgroundColor: item.fill, width: `${item.value}%` }}></div>
                  </Progress>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h3 className="font-medium mb-2">Response Rate by Project</h3>
              {!isLoading && projects ? (
                <div className="space-y-3 max-h-[230px] overflow-y-auto pr-2">
                  {projects.slice(0, 5).map((project) => {
                    const totalBids = project.bids?.length || 0;
                    const respondedBids = project.bids?.filter(b => b.status === 'responded').length || 0;
                    const responseRate = totalBids > 0 ? (respondedBids / totalBids) * 100 : 0;
                    
                    return (
                      <div key={project.id} className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="truncate max-w-[150px]">{project.title}</span>
                            <ProjectStatusBadge status={project.stage} className="text-xs py-0.5 px-2" />
                          </div>
                          <span>{responseRate.toFixed(0)}%</span>
                        </div>
                        <Progress value={responseRate} className="h-1.5" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">Loading project data...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Metrics Overview */}
      <section className="rounded-lg border bg-card shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4 px-2">Performance Metrics</h2>
        <QuickMetrics userRole="gc" />
      </section>

      {/* Projects Requiring Attention Section */}
      <section className="rounded-lg border bg-card shadow-sm p-4">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-lg font-semibold">Projects Requiring Attention</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/projects?filter=attention')}
          >
            View all
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
        <ProjectsAttention userRole="gc" />
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

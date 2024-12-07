import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const QuickMetrics = () => {
  const { data: metrics } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      console.log('Fetching dashboard metrics...');
      
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select(`
          *,
          bids (
            id,
            status
          )
        `);

      if (projectsError) {
        console.error('Error fetching projects:', projectsError);
        throw projectsError;
      }

      const activeProjects = projects?.filter(p => p.stage === 'active').length || 0;
      const totalBids = projects?.reduce((acc, project) => acc + (project.bids?.length || 0), 0) || 0;
      
      // Calculate response rate
      const totalResponses = projects?.reduce((acc, project) => {
        const respondedBids = project.bids?.filter(bid => bid.status !== 'pending').length || 0;
        return acc + respondedBids;
      }, 0) || 0;
      
      const responseRate = totalBids > 0 ? Math.round((totalResponses / totalBids) * 100) : 0;

      console.log('Processed metrics:', { activeProjects, totalBids, responseRate });
      return {
        activeProjects,
        totalBids,
        responseRate
      };
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-white border-primary/20 hover:border-primary/40 transition-colors">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-primary">{metrics?.activeProjects || 0}</div>
          <p className="text-sm text-construction-500">Active Projects</p>
        </CardContent>
      </Card>
      <Card className="bg-white border-secondary/20 hover:border-secondary/40 transition-colors">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-secondary">{metrics?.totalBids || 0}</div>
          <p className="text-sm text-construction-500">Total Bids Received</p>
        </CardContent>
      </Card>
      <Card className="bg-white border-accent/20 hover:border-accent/40 transition-colors">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-accent-foreground">{metrics?.responseRate || 0}%</div>
          <p className="text-sm text-construction-500">Subcontractor Response Rate</p>
        </CardContent>
      </Card>
    </div>
  );
};
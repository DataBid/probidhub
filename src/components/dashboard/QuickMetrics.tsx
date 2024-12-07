import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const QuickMetrics = () => {
  const { data: metrics } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('*');

      if (error) throw error;

      const activeProjects = projects?.filter(p => p.stage === 'active').length || 0;
      const totalBids = 0;
      const responseRate = 0;

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
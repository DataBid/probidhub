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

      // Calculate metrics
      const activeProjects = projects?.filter(p => p.stage === 'active').length || 0;
      const totalBids = 0; // To be implemented when bids table is added
      const responseRate = 0; // To be implemented when bids table is added

      return {
        activeProjects,
        totalBids,
        responseRate
      };
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{metrics?.activeProjects || 0}</div>
          <p className="text-sm text-muted-foreground">Active Projects</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{metrics?.totalBids || 0}</div>
          <p className="text-sm text-muted-foreground">Total Bids Received</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{metrics?.responseRate || 0}%</div>
          <p className="text-sm text-muted-foreground">Subcontractor Response Rate</p>
        </CardContent>
      </Card>
    </div>
  );
};
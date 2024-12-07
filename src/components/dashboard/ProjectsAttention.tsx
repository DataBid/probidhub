import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Clock } from "lucide-react";
import { format, addDays, isBefore } from "date-fns";

export const ProjectsAttention = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects-attention"],
    queryFn: async () => {
      const sevenDaysFromNow = addDays(new Date(), 7).toISOString();
      
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .lt("bids_due", sevenDaysFromNow)
        .gt("bids_due", new Date().toISOString())
        .order("bids_due", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold">Projects Requiring Attention</h2>
        </div>
        <div className="space-y-4">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card"
            >
              <div>
                <h3 className="font-medium">{project.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    Deadline: {format(new Date(project.bids_due), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
              {isBefore(new Date(project.bids_due), addDays(new Date(), 3)) && (
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  Urgent
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
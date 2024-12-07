import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Calendar, MessageSquare, AlertOctagon, ArrowRight, CalendarPlus } from "lucide-react";
import { format, addDays, isBefore } from "date-fns";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export const ProjectsAttention = () => {
  const { data: projects, isLoading, refetch } = useQuery({
    queryKey: ["projects-attention"],
    queryFn: async () => {
      const sevenDaysFromNow = addDays(new Date(), 7).toISOString();
      
      // Get projects with their bid counts
      const { data: projectsData, error } = await supabase
        .from("projects")
        .select(`
          *,
          bids:bids(count)
        `)
        .lt("bids_due", sevenDaysFromNow)
        .gt("bids_due", new Date().toISOString())
        .order("bids_due", { ascending: true });

      if (error) throw error;
      
      // Enhance projects with additional data
      const enhancedProjects = await Promise.all(projectsData.map(async (project) => {
        // Get pending bids count
        const { count: pendingBidsCount } = await supabase
          .from("bids")
          .select("*", { count: "exact", head: true })
          .eq("project_id", project.id)
          .eq("status", "pending");

        return {
          ...project,
          pendingBids: pendingBidsCount || 0,
          issues: calculateIssues(project),
        };
      }));

      return enhancedProjects;
    },
  });

  const calculateIssues = (project: any) => {
    const issues = [];
    if (!project.project_document_info) issues.push("Missing documents");
    if (!project.questions_contact) issues.push("Missing contact info");
    return issues;
  };

  const handleExtendDeadline = async (projectId: string) => {
    const newDeadline = addDays(new Date(), 7).toISOString();
    const { error } = await supabase
      .from("projects")
      .update({ bids_due: newDeadline })
      .eq("id", projectId);

    if (error) {
      toast.error("Failed to extend deadline");
    } else {
      toast.success("Deadline extended by 7 days");
      refetch();
    }
  };

  const handleSendReminder = async (projectId: string) => {
    // Create a notification for pending bids
    const { error } = await supabase
      .from("notifications")
      .insert({
        project_id: projectId,
        type: "reminder",
        message: "Reminder: Your response to the bid invitation is pending",
      });

    if (error) {
      toast.error("Failed to send reminder");
    } else {
      toast.success("Reminder sent successfully");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-construction-900">Projects Requiring Attention</h2>
        </div>
        <div className="space-y-4">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="flex flex-col p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-construction-900">{project.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-construction-500 mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Due: {format(new Date(project.bids_due), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendReminder(project.id)}
                    className="text-primary hover:text-primary-foreground hover:bg-primary"
                  >
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Send Reminder
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExtendDeadline(project.id)}
                    className="text-primary hover:text-primary-foreground hover:bg-primary"
                  >
                    <CalendarPlus className="h-4 w-4 mr-1" />
                    Extend Deadline
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-construction-500" />
                  <span className="text-sm text-construction-700">
                    {project.pendingBids} Pending Bids
                  </span>
                </div>
                {project.issues.length > 0 && (
                  <div className="flex items-center gap-2">
                    <AlertOctagon className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600">
                      {project.issues.join(", ")}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-construction-600">Bid Response Progress</span>
                  <span className="text-construction-600">
                    {project.bids.count} / {project.pendingBids + project.bids.count} Responses
                  </span>
                </div>
                <Progress 
                  value={project.bids.count ? (project.bids.count / (project.pendingBids + project.bids.count)) * 100 : 0}
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
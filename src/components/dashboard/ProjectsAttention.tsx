import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  AlertOctagon, 
  ArrowRight, 
  CalendarPlus,
  Clock,
  CheckCircle,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import { format, addDays, isPast, isWithinDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  bids_due: string;
  project_document_info: string | null;
  questions_contact: string | null;
  bids: { count: number }[];
  pendingBids: number;
  issues: string[];
}

export const ProjectsAttention = () => {
  const navigate = useNavigate();
  const { data: projects, isLoading, refetch } = useQuery({
    queryKey: ["projects-attention"],
    queryFn: async () => {
      const sevenDaysFromNow = addDays(new Date(), 7).toISOString();
      
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
      
      const enhancedProjects = await Promise.all((projectsData || []).map(async (project) => {
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

      return enhancedProjects as Project[];
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

  const getStatusIcon = (project: Project) => {
    if (project.issues.length > 0) {
      return <AlertOctagon className="h-5 w-5 text-red-500" />;
    }
    if (isPast(new Date(project.bids_due))) {
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
    if (isWithinDays(new Date(project.bids_due), new Date(), 7)) {
      return <Clock className="h-5 w-5 text-yellow-500" />;
    }
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };

  const getDeadlineColor = (deadline: string) => {
    if (isPast(new Date(deadline))) return "text-red-600";
    if (isWithinDays(new Date(deadline), new Date(), 7)) return "text-yellow-600";
    return "text-construction-600";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const calculateOverallResponseRate = () => {
    if (!projects?.length) return 0;
    const totalResponses = projects.reduce((acc, project) => acc + (project.bids[0]?.count || 0), 0);
    const totalInvites = projects.reduce((acc, project) => acc + ((project.bids[0]?.count || 0) + project.pendingBids), 0);
    return totalInvites > 0 ? (totalResponses / totalInvites) * 100 : 0;
  };

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
              className="flex flex-col lg:flex-row p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-1 space-y-3 lg:space-y-0 lg:flex lg:items-center lg:gap-4">
                <div className="flex items-center gap-2 min-w-[200px]">
                  {getStatusIcon(project)}
                  <button 
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="font-medium text-primary hover:text-primary-hover hover:underline"
                  >
                    {project.title}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className={`text-sm ${getDeadlineColor(project.bids_due)}`}>
                    {format(new Date(project.bids_due), "MMM d, yyyy")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-construction-500" />
                  <span className="text-sm text-construction-700">
                    {project.bids[0]?.count || 0}/{(project.bids[0]?.count || 0) + project.pendingBids} Responses
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

              <div className="flex flex-col lg:flex-row gap-2 mt-3 lg:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendReminder(project.id)}
                  className="text-primary hover:text-primary-foreground hover:bg-primary"
                >
                  <ArrowRight className="h-4 w-4" />
                  Send Reminder
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExtendDeadline(project.id)}
                  className="text-primary hover:text-primary-foreground hover:bg-primary"
                >
                  <CalendarPlus className="h-4 w-4" />
                  Extend Deadline
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="text-primary hover:text-primary-foreground hover:bg-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 border rounded-lg bg-muted">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-construction-700 font-medium">Overall Bid Response Rate</span>
            <span className="text-construction-600">
              {calculateOverallResponseRate().toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={calculateOverallResponseRate()}
            className="h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};
import { format, isPast } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
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
import { Project } from "./types";
import { isWithinDaysFromNow } from "./utils";

interface ProjectItemProps {
  project: Project;
  onRefetch: () => void;
}

export const ProjectItem = ({ project, onRefetch }: ProjectItemProps) => {
  const navigate = useNavigate();

  const handleExtendDeadline = async () => {
    const newDeadline = new Date();
    newDeadline.setDate(newDeadline.getDate() + 7);
    const { error } = await supabase
      .from("projects")
      .update({ bids_due: newDeadline.toISOString() })
      .eq("id", project.id);

    if (error) {
      toast.error("Failed to extend deadline");
    } else {
      toast.success("Deadline extended by 7 days");
      onRefetch();
    }
  };

  const handleSendReminder = async () => {
    const { error } = await supabase
      .from("notifications")
      .insert({
        project_id: project.id,
        type: "reminder",
        message: "Reminder: Your response to the bid invitation is pending",
      });

    if (error) {
      toast.error("Failed to send reminder");
    } else {
      toast.success("Reminder sent successfully");
    }
  };

  const getStatusIcon = () => {
    if (project.issues.length > 0) {
      return <AlertOctagon className="h-5 w-5 text-red-500" />;
    }
    if (isPast(new Date(project.bids_due))) {
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
    if (isWithinDaysFromNow(new Date(project.bids_due), 7)) {
      return <Clock className="h-5 w-5 text-yellow-500" />;
    }
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };

  const getDeadlineColor = () => {
    if (isPast(new Date(project.bids_due))) return "text-red-600";
    if (isWithinDaysFromNow(new Date(project.bids_due), 7)) return "text-yellow-600";
    return "text-construction-600";
  };

  const getPriorityStyles = () => {
    if (project.issues.length > 0 || isPast(new Date(project.bids_due))) {
      return "border-red-200 bg-red-50";
    }
    if (isWithinDaysFromNow(new Date(project.bids_due), 7)) {
      return "border-yellow-200 bg-yellow-50";
    }
    return "border-gray-200 bg-white";
  };

  const getResponseCount = () => {
    return project.bids.filter(bid => bid.status === 'responded').length;
  };

  return (
    <div className={`flex flex-col lg:flex-row p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow ${getPriorityStyles()}`}>
      <div className="flex-1 space-y-3 lg:space-y-0 lg:flex lg:items-center lg:gap-4">
        <div className="flex items-center gap-2 min-w-[200px]">
          {getStatusIcon()}
          <button 
            onClick={() => navigate(`/projects/${project.id}`)}
            className="font-medium text-primary hover:text-primary-hover hover:underline"
          >
            {project.title}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className={`text-sm ${getDeadlineColor()}`}>
            {format(new Date(project.bids_due), "MMM d, yyyy")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-construction-500" />
          <span className="text-sm text-construction-700">
            {getResponseCount()}/{project.bids.length + project.pendingBids} Responses
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
          onClick={handleSendReminder}
          className="text-primary hover:text-primary-foreground hover:bg-primary"
        >
          <ArrowRight className="h-4 w-4" />
          Send Reminder
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExtendDeadline}
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
  );
};
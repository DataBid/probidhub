import { ArrowRight, CalendarPlus, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Project } from "../types";

interface ProjectActionsProps {
  project: Project;
  onRefetch: () => void;
}

export const ProjectActions = ({ project, onRefetch }: ProjectActionsProps) => {
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

  return (
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
  );
};
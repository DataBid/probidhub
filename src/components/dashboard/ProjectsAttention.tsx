import { ProjectsAttentionList } from "./projects-attention/ProjectsAttentionList";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { downloadCSV, prepareProjectsData } from "@/utils/exportUtils";
import { useToast } from "@/components/ui/use-toast";

interface ProjectsAttentionProps {
  userRole?: string;
}

export const ProjectsAttention = ({ userRole }: ProjectsAttentionProps) => {
  const { toast } = useToast();

  const handleExport = (projects: any[]) => {
    if (!projects?.length) {
      toast({
        title: "No data to export",
        description: "There are currently no projects to export.",
        variant: "destructive",
      });
      return;
    }
    
    const exportData = prepareProjectsData(projects);
    downloadCSV(exportData, 'projects_requiring_attention');
    
    toast({
      title: "Export successful",
      description: "Your projects data has been exported successfully.",
    });
  };

  return <ProjectsAttentionList onExport={handleExport} userRole={userRole} />;
};
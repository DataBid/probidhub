import { Send, MessageSquare, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectStatusBadge } from "./components/ProjectStatusBadge";
import { ProjectMetrics } from "./components/ProjectMetrics";

interface ProjectHeaderProps {
  project: any;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 border-b">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-bold text-construction-900">{project.title}</h1>
              <ProjectStatusBadge status={project.stage} />
            </div>
            
            {project.questions_contact && (
              <div className="text-sm text-construction-600">
                <p className="font-medium">Project Contact</p>
                <p>{project.questions_contact}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary-hover shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Bid
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="hover:bg-accent/10 shadow hover:shadow-md transition-all duration-200"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Ask a Question
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="hover:bg-accent/10 shadow hover:shadow-md transition-all duration-200"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Files
            </Button>
          </div>
        </div>

        <ProjectMetrics project={project} />
      </div>
    </div>
  );
};
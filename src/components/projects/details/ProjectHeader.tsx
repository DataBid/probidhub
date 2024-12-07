import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Upload, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface ProjectHeaderProps {
  project: any;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const getStatusColor = (stage: string) => {
    switch (stage?.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'closed':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="w-full bg-white border-b">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <Badge className={getStatusColor(project.stage)}>
                {project.stage || 'Unknown Status'}
              </Badge>
              {project.bids_due && (
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Due: {format(new Date(project.bids_due), 'PPP')}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <Button className="bg-primary hover:bg-primary-hover">
              Submit Bid
            </Button>
            <Button variant="outline" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Ask a Question
            </Button>
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Files
            </Button>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <h2 className="font-semibold mb-1">Project Contact</h2>
          <p>{project.questions_contact || 'No contact information available'}</p>
        </div>
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProjectsHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white shadow-sm border-b mb-6 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button 
            className="bg-primary hover:bg-primary/90 text-white transition-colors duration-200 w-full sm:w-auto"
            onClick={() => navigate('/projects/new')}
          >
            <Plus className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">Create New Project</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

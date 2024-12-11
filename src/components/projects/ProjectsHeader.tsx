import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const ProjectsHeader = () => {
  return (
    <div className="bg-white shadow-sm border-b mb-6 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button 
            className="bg-primary hover:bg-primary-hover text-white transition-colors duration-200 w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Project
          </Button>
        </div>
      </div>
    </div>
  );
};
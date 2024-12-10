import { Button } from "@/components/ui/button";
import { Plus, Users, FolderOpen } from "lucide-react";

interface DashboardActionsProps {
  userRole?: string;
}

export const DashboardActions = ({ userRole }: DashboardActionsProps) => {
  const isGC = userRole === "gc";

  return (
    <div className="bg-white shadow-sm border-b mb-6 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {isGC && (
            <Button 
              className="bg-primary hover:bg-primary-hover text-white transition-colors duration-200 w-full sm:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
          )}
          {isGC && (
            <Button 
              className="bg-accent hover:bg-accent-hover text-accent-foreground transition-colors duration-200 w-full sm:w-auto"
            >
              <Users className="mr-2 h-4 w-4" />
              Invite Subcontractors
            </Button>
          )}
          <Button 
            className="bg-primary hover:bg-primary-hover text-white transition-colors duration-200 w-full sm:w-auto"
          >
            <FolderOpen className="mr-2 h-4 w-4" />
            {isGC ? "View All Projects" : "View Available Projects"}
          </Button>
        </div>
      </div>
    </div>
  );
};
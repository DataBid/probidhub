import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const ProjectsHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
      <Button className="bg-primary hover:bg-primary-hover text-white">
        <Plus className="mr-2 h-4 w-4" />
        Create Project
      </Button>
    </div>
  );
};
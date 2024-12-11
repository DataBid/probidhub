import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface SubcontractorHeaderProps {
  onAdd: () => void;
}

export const SubcontractorHeader = ({ onAdd }: SubcontractorHeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b mb-6 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button 
            onClick={onAdd}
            className="bg-primary hover:bg-primary-hover text-white transition-colors duration-200 w-full sm:w-auto"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Subcontractor
          </Button>
        </div>
      </div>
    </div>
  );
};
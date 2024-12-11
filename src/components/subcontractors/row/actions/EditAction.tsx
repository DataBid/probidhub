import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditActionProps {
  onEdit: () => void;
  disabled?: boolean;
}

export const EditAction = ({ onEdit, disabled }: EditActionProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            disabled={disabled}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit subcontractor</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
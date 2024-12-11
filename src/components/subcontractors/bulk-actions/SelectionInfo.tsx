import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SelectionInfoProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export const SelectionInfo = ({ selectedCount, onClearSelection }: SelectionInfoProps) => {
  return (
    <>
      <span className="text-sm text-muted-foreground">
        {selectedCount} selected
      </span>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClearSelection}
        className="text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4 mr-1" />
        Clear Selection
      </Button>
    </>
  );
};
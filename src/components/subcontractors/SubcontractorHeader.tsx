import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { ShortcutsDialog } from "./ShortcutsDialog";

interface SubcontractorHeaderProps {
  onAdd: () => void;
  onExport: () => void;
}

export const SubcontractorHeader = ({ onAdd, onExport }: SubcontractorHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold tracking-tight">Subcontractors</h1>
      <div className="flex items-center gap-2">
        <ShortcutsDialog />
        <Button onClick={onExport} variant="secondary">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Subcontractor
        </Button>
      </div>
    </div>
  );
};
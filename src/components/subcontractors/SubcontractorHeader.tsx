import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

interface SubcontractorHeaderProps {
  onAdd: () => void;
  onExport: () => void;
}

export const SubcontractorHeader = ({ onAdd, onExport }: SubcontractorHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Subcontractors</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subcontractor database and track their status
        </p>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button onClick={onExport} variant="outline" className="w-full sm:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button onClick={onAdd} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Subcontractor
        </Button>
      </div>
    </div>
  );
};
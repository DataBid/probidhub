import { Button } from "@/components/ui/button";
import { Plus, Download, Upload, Printer } from "lucide-react";
import { ShortcutsDialog } from "./ShortcutsDialog";
import { useState } from "react";
import { ImportDialog } from "./import/ImportDialog";

interface SubcontractorHeaderProps {
  onAdd: () => void;
  onExport: () => void;
  onImportSuccess: () => void;
}

export const SubcontractorHeader = ({ onAdd, onExport, onImportSuccess }: SubcontractorHeaderProps) => {
  const [importOpen, setImportOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold tracking-tight">Subcontractors</h1>
      <div className="flex items-center gap-2">
        <ShortcutsDialog />
        <Button onClick={() => window.print()} variant="secondary">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button onClick={onExport} variant="secondary">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={() => setImportOpen(true)} variant="secondary">
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Subcontractor
        </Button>
      </div>

      <ImportDialog 
        open={importOpen}
        onOpenChange={setImportOpen}
        onSuccess={onImportSuccess}
      />
    </div>
  );
};
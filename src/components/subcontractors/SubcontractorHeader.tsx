
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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Saved Companies</h1>
          <p className="text-sm text-muted-foreground max-w-[600px]">
            Manage your companies, including subcontractors, suppliers, and other partners.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <ShortcutsDialog />
          <Button onClick={() => window.print()} variant="secondary" width="auto">
            <Printer className="mr-2 h-4 w-4" />
            <span className="truncate">Print</span>
          </Button>
          <Button onClick={onExport} variant="secondary" width="auto">
            <Download className="mr-2 h-4 w-4" />
            <span className="truncate">Export</span>
          </Button>
          <Button onClick={() => setImportOpen(true)} variant="secondary" width="auto">
            <Upload className="mr-2 h-4 w-4" />
            <span className="truncate">Import</span>
          </Button>
          <Button 
            onClick={onAdd}
            width="auto"
            className="bg-accent hover:bg-accent-hover text-accent-foreground transition-colors duration-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            <span className="truncate">Add Company</span>
          </Button>
        </div>
      </div>

      <ImportDialog 
        open={importOpen}
        onOpenChange={setImportOpen}
        onSuccess={onImportSuccess}
      />
    </div>
  );
};

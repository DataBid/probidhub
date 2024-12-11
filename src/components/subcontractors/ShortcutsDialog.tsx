import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard } from "lucide-react";

export const ShortcutsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Keyboard className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Use these keyboard shortcuts to work faster
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm font-medium">Add New Subcontractor</div>
            <div className="text-sm text-muted-foreground">Ctrl/Cmd + N</div>
            <div className="text-sm font-medium">Refresh List</div>
            <div className="text-sm text-muted-foreground">Ctrl/Cmd + R</div>
            <div className="text-sm font-medium">Export List</div>
            <div className="text-sm text-muted-foreground">Ctrl/Cmd + E</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
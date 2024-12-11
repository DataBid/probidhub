import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ShortcutHandlers {
  onAdd: () => void;
  onRefresh: () => void;
  onExport: () => void;
}

export const useSubcontractorShortcuts = ({ onAdd, onRefresh, onExport }: ShortcutHandlers) => {
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only trigger if Ctrl/Cmd key is pressed
      if (event.ctrlKey || event.metaKey) {
        switch (event.key.toLowerCase()) {
          case 'n':
            event.preventDefault();
            onAdd();
            toast({
              title: "Keyboard Shortcut",
              description: "Add New Subcontractor (Ctrl/Cmd + N)",
            });
            break;
          case 'r':
            event.preventDefault();
            onRefresh();
            toast({
              title: "Keyboard Shortcut",
              description: "Refresh List (Ctrl/Cmd + R)",
            });
            break;
          case 'e':
            event.preventDefault();
            onExport();
            toast({
              title: "Keyboard Shortcut",
              description: "Export List (Ctrl/Cmd + E)",
            });
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onAdd, onRefresh, onExport, toast]);
};
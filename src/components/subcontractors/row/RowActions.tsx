import { Button } from "@/components/ui/button";
import { Mail, Edit, Trash } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";

interface RowActionsProps {
  onInvite: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const RowActions = ({ onInvite, onEdit, onDelete }: RowActionsProps) => {
  return (
    <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onInvite}
        title="Invite to bid"
      >
        <Mail className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onEdit}
        title="Edit subcontractor"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            title="Delete subcontractor"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subcontractor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this subcontractor? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={onDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
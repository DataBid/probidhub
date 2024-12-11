import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Trash } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";

interface SubcontractorRowProps {
  sub: {
    id: string;
    name: string;
    company: string;
    trade: string;
    email: string;
    location?: string;
    status?: string;
  };
  onEdit: (sub: any) => void;
  onDelete: (id: string) => void;
  onInvite: (email: string) => void;
}

export const SubcontractorRow = ({ sub, onEdit, onDelete, onInvite }: SubcontractorRowProps) => {
  return (
    <TableRow key={sub.id}>
      <TableCell>
        <div>
          <div className="font-medium">{sub.name}</div>
          <div className="text-sm text-muted-foreground">{sub.email}</div>
        </div>
      </TableCell>
      <TableCell>{sub.company}</TableCell>
      <TableCell>{sub.trade}</TableCell>
      <TableCell>{sub.location || "N/A"}</TableCell>
      <TableCell>
        <Badge 
          variant="outline" 
          className={
            sub.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }
        >
          {sub.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex gap-2 justify-end">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onInvite(sub.email)}
            title="Invite to bid"
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onEdit(sub)}
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
                <AlertDialogAction onClick={() => onDelete(sub.id)} className="bg-red-500 hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

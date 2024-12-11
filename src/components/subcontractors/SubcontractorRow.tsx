import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Mail, Trash } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { getTradeIcon, getTradeColor, getStatusColor } from "./utils/tradeUtils";

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
  selected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onEdit: (sub: any) => void;
  onDelete: (id: string) => void;
  onInvite: (email: string) => void;
}

export const SubcontractorRow = ({ 
  sub, 
  selected,
  onSelect,
  onEdit, 
  onDelete, 
  onInvite 
}: SubcontractorRowProps) => {
  const TradeIcon = getTradeIcon(sub.trade);
  const tradeColor = getTradeColor(sub.trade);
  const statusColor = getStatusColor(sub.status);

  return (
    <TableRow key={sub.id} className="group hover:bg-gray-50">
      <TableCell>
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onSelect(sub.id, checked as boolean)}
          aria-label={`Select ${sub.name}`}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${sub.company}`} />
            <AvatarFallback>{sub.company.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{sub.name}</div>
            <div className="text-sm text-muted-foreground">{sub.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Link 
          to={`/companies/${sub.id}`} 
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {sub.company}
        </Link>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <TradeIcon className={`h-4 w-4 ${tradeColor}`} />
          <span>{sub.trade}</span>
        </div>
      </TableCell>
      <TableCell>{sub.location || "N/A"}</TableCell>
      <TableCell>
        <Badge 
          variant="outline" 
          className={`${statusColor}`}
        >
          {sub.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
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
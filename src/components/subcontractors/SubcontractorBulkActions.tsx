import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash, UserPlus, RefreshCw } from "lucide-react";

interface SubcontractorBulkActionsProps {
  selectedIds: string[];
  onDelete: (ids: string[]) => void;
  onInvite: (ids: string[]) => void;
  onStatusChange: (ids: string[], status: string) => void;
}

export const SubcontractorBulkActions = ({
  selectedIds,
  onDelete,
  onInvite,
  onStatusChange,
}: SubcontractorBulkActionsProps) => {
  if (selectedIds.length === 0) return null;

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm text-muted-foreground">
        {selectedIds.length} selected
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Bulk Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onInvite(selectedIds)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite to Bid
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange(selectedIds, 'active')}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Set Active
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange(selectedIds, 'archived')}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onDelete(selectedIds)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Trash, UserPlus, RefreshCw, Edit, Layers } from "lucide-react";

interface BulkActionsMenuProps {
  isSingleSelect: boolean;
  onEdit?: (id: string) => void;
  selectedIds: string[];
  onInvite: (ids: string[]) => void;
  onStatusChange: (ids: string[], status: string) => void;
  onDelete: (ids: string[]) => void;
  onOpenCategoryDialog: () => void;
  onAssignCategories?: (ids: string[], categoryIds: string[]) => void;
}

export const BulkActionsMenu = ({
  isSingleSelect,
  onEdit,
  selectedIds,
  onInvite,
  onStatusChange,
  onDelete,
  onOpenCategoryDialog,
  onAssignCategories,
}: BulkActionsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {isSingleSelect && onEdit && (
          <DropdownMenuItem onClick={() => onEdit(selectedIds[0])}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Details
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => onInvite(selectedIds)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite to Bid
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onStatusChange(selectedIds, 'active')}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Set Active
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange(selectedIds, 'archived')}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {onAssignCategories && (
          <DropdownMenuItem onClick={onOpenCategoryDialog}>
            <Layers className="mr-2 h-4 w-4" />
            Assign Categories
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={() => onDelete(selectedIds)}
          className="text-red-600 focus:text-red-600"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
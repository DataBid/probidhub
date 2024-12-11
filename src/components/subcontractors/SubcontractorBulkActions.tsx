import { useState } from "react";
import { CategoryAssignmentDialog } from "./bulk-actions/CategoryAssignmentDialog";
import { BulkActionsMenu } from "./bulk-actions/BulkActionsMenu";
import { SelectionInfo } from "./bulk-actions/SelectionInfo";

interface SubcontractorBulkActionsProps {
  selectedIds: string[];
  onDelete: (ids: string[]) => void;
  onInvite: (ids: string[]) => void;
  onStatusChange: (ids: string[], status: string) => void;
  onEdit?: (id: string) => void;
  onAssignCategories?: (ids: string[], categoryIds: string[]) => void;
  onClearSelection: () => void;
}

export const SubcontractorBulkActions = ({
  selectedIds,
  onDelete,
  onInvite,
  onStatusChange,
  onEdit,
  onAssignCategories,
  onClearSelection,
}: SubcontractorBulkActionsProps) => {
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  
  if (selectedIds.length === 0) return null;

  const isSingleSelect = selectedIds.length === 1;

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <SelectionInfo 
          selectedCount={selectedIds.length}
          onClearSelection={onClearSelection}
        />
        <BulkActionsMenu
          isSingleSelect={isSingleSelect}
          onEdit={onEdit}
          selectedIds={selectedIds}
          onInvite={onInvite}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onOpenCategoryDialog={() => setCategoryDialogOpen(true)}
          onAssignCategories={onAssignCategories}
        />
      </div>

      {onAssignCategories && (
        <CategoryAssignmentDialog
          open={categoryDialogOpen}
          onOpenChange={setCategoryDialogOpen}
          selectedIds={selectedIds}
          onAssign={onAssignCategories}
        />
      )}
    </>
  );
};
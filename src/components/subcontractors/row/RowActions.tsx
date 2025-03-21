
import { InviteAction } from "./actions/InviteAction";
import { EditAction } from "./actions/EditAction";
import { DeleteAction } from "./actions/DeleteAction";

interface RowActionsProps {
  onInvite: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isLoading?: boolean;
}

export const RowActions = ({ onInvite, onEdit, onDelete, isLoading }: RowActionsProps) => {
  return (
    <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
      <InviteAction onInvite={onInvite} disabled={isLoading} />
      <EditAction onEdit={onEdit} disabled={isLoading} />
      <DeleteAction onDelete={onDelete} disabled={isLoading} />
    </div>
  );
};

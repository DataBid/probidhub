import { InviteAction } from "./actions/InviteAction";
import { EditAction } from "./actions/EditAction";
import { DeleteAction } from "./actions/DeleteAction";

interface RowActionsProps {
  onInvite: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const RowActions = ({ onInvite, onEdit, onDelete }: RowActionsProps) => {
  return (
    <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
      <InviteAction onInvite={onInvite} />
      <EditAction onEdit={onEdit} />
      <DeleteAction onDelete={onDelete} />
    </div>
  );
};
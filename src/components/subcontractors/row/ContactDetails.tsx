import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ContactDetailsProps {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  notes?: string;
  onEdit: (updatedData: any) => void;
}

export const ContactDetails = ({ 
  name, 
  email, 
  phone, 
  location, 
  notes,
  onEdit 
}: ContactDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleEditSave = () => {
    onEdit({ name: editedName });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="h-8 w-[200px]"
          />
          <Button size="sm" onClick={handleEditSave}>Save</Button>
        </div>
      ) : (
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{email}</div>
        </div>
      )}
    </div>
  );
};
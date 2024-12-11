import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
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
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer">
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
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{name}</h4>
          <div className="text-sm">
            <p className="text-muted-foreground">Contact Details</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <span className="font-medium">Email:</span>
              <span>{email}</span>
              {phone && (
                <>
                  <span className="font-medium">Phone:</span>
                  <span>{phone}</span>
                </>
              )}
              {location && (
                <>
                  <span className="font-medium">Location:</span>
                  <span>{location}</span>
                </>
              )}
            </div>
            {notes && (
              <div className="mt-2">
                <p className="font-medium">Notes:</p>
                <p className="text-sm text-muted-foreground">{notes}</p>
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContactDetailsProps {
  id: string;  // Add this prop
  name: string;
  email: string;
  phone?: string;
  location?: string;
  notes?: string;
  onEdit: (updatedData: any) => void;
}

export const ContactDetails = ({ 
  id,
  name, 
  email, 
  phone, 
  location, 
  notes,
  onEdit 
}: ContactDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);

  const handleEditSave = async () => {
    try {
      const { error } = await supabase
        .from('subcontractors')
        .update({ 
          name: editedName,
          email: editedEmail
        })
        .eq('id', id);

      if (error) throw error;

      onEdit({ name: editedName, email: editedEmail });
      setIsEditing(false);
      toast.success("Contact details updated successfully");
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error("Failed to update contact details");
    }
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex flex-col space-y-2">
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="h-8 w-[200px]"
            placeholder="Contact name"
          />
          <Input
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            className="h-8 w-[200px]"
            placeholder="Contact email"
          />
          <div className="flex space-x-2">
            <Button size="sm" onClick={handleEditSave}>Save</Button>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)} className="cursor-pointer hover:bg-gray-50 p-1 rounded">
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{email}</div>
          {phone && <div className="text-sm text-muted-foreground">{phone}</div>}
        </div>
      )}
    </div>
  );
};
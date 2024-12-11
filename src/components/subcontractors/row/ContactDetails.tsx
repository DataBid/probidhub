import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
}: ContactDetailsProps) => {
  return (
    <div className="space-y-1">
      <div className="font-medium">{name}</div>
      <div className="text-sm text-muted-foreground">{email}</div>
      {phone && <div className="text-sm text-muted-foreground">{phone}</div>}
    </div>
  );
};
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ContactDetailsProps {
  id: string;
  name: string;
  email: string;
  phone?: string;
  area_code?: string;
  location?: string;
  notes?: string;
  onEdit: (updatedData: any) => void;
}

export const ContactDetails = ({ 
  id,
  name, 
  email, 
  phone,
  area_code,
}: ContactDetailsProps) => {
  const formattedPhone = phone ? `${area_code || ''} ${phone}` : undefined;
  
  return (
    <div className="space-y-1">
      <div className="font-medium">{name}</div>
      <div className="text-sm text-muted-foreground">{email}</div>
      {formattedPhone && <div className="text-sm text-muted-foreground">{formattedPhone}</div>}
    </div>
  );
};
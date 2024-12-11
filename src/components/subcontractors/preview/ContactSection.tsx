import { Copy, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Contact } from "lucide-react";

interface ContactSectionProps {
  name: string;
  email: string;
  phone?: string;
  area_code?: string;
  location?: string;
  onEmail: () => void;
  onCall: () => void;
}

export const ContactSection = ({
  name,
  email,
  phone,
  area_code,
  location,
  onEmail,
  onCall,
}: ContactSectionProps) => {
  const { toast } = useToast();

  const formatPhoneNumber = (areaCode?: string, phone?: string) => {
    if (!phone) return "N/A";
    return `${areaCode || ''} ${phone}`;
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Contact className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-semibold">Contact Information</h4>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={() => {
            const contactInfo = `
              Name: ${name}
              Email: ${email}
              Phone: ${formatPhoneNumber(area_code, phone)}
              Location: ${location || 'N/A'}
            `.trim();
            handleCopyToClipboard(contactInfo, "Contact information");
          }}
        >
          <Copy className="h-3 w-3 mr-1" />
          Copy all
        </Button>
      </div>

      <div className="grid grid-cols-[100px_1fr] gap-y-3">
        <span className="text-sm text-muted-foreground">Name:</span>
        <div className="text-sm font-medium flex items-center justify-between">
          <span>{name}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => handleCopyToClipboard(name, "Name")}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>

        <span className="text-sm text-muted-foreground flex items-center">
          <Mail className="h-3 w-3 mr-1" />
          Email:
        </span>
        <div className="text-sm font-medium flex items-center justify-between">
          <span>{email}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => handleCopyToClipboard(email, "Email")}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>

        <span className="text-sm text-muted-foreground flex items-center">
          <Phone className="h-3 w-3 mr-1" />
          Phone:
        </span>
        <div className="text-sm font-medium flex items-center justify-between">
          <span>{formatPhoneNumber(area_code, phone)}</span>
          {phone && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleCopyToClipboard(
                formatPhoneNumber(area_code, phone) || "",
                "Phone"
              )}
            >
              <Copy className="h-3 w-3" />
            </Button>
          )}
        </div>

        {location && (
          <>
            <span className="text-sm text-muted-foreground">Location:</span>
            <div className="text-sm font-medium flex items-center justify-between">
              <span>{location}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleCopyToClipboard(location, "Location")}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
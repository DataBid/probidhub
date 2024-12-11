import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "./utils/tradeUtils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  Contact,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  ClipboardList,
  Copy,
  ExternalLink,
  Edit,
  PhoneCall,
} from "lucide-react";

interface SubcontractorPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subcontractor: {
    name: string;
    company: string;
    email: string;
    area_code?: string;
    phone?: string;
    location?: string;
    notes?: string;
    trade: string;
    status?: string;
  };
  onEdit?: () => void;
}

export const SubcontractorPreview = ({
  open,
  onOpenChange,
  subcontractor,
  onEdit,
}: SubcontractorPreviewProps) => {
  const statusColor = getStatusColor(subcontractor.status);
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

  const handleCall = () => {
    const phoneNumber = formatPhoneNumber(subcontractor.area_code, subcontractor.phone);
    if (phoneNumber !== "N/A") {
      window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
    }
  };

  const handleEmail = () => {
    window.location.href = `mailto:${subcontractor.email}`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <SheetTitle>{subcontractor.company}</SheetTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleEmail}
                title="Send email"
              >
                <Mail className="h-4 w-4" />
              </Button>
              {subcontractor.phone && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCall}
                  title="Call"
                >
                  <PhoneCall className="h-4 w-4" />
                </Button>
              )}
              {onEdit && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    onEdit();
                    onOpenChange(false);
                  }}
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <SheetDescription>Subcontractor Details</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Contact Information Section */}
          <Card>
            <CardContent className="pt-6">
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
                      Name: ${subcontractor.name}
                      Email: ${subcontractor.email}
                      Phone: ${formatPhoneNumber(subcontractor.area_code, subcontractor.phone)}
                      Location: ${subcontractor.location || 'N/A'}
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
                  <span>{subcontractor.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleCopyToClipboard(subcontractor.name, "Name")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>

                <span className="text-sm text-muted-foreground flex items-center">
                  <Mail className="h-3 w-3 mr-1" />
                  Email:
                </span>
                <div className="text-sm font-medium flex items-center justify-between">
                  <span>{subcontractor.email}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleCopyToClipboard(subcontractor.email, "Email")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>

                <span className="text-sm text-muted-foreground flex items-center">
                  <Phone className="h-3 w-3 mr-1" />
                  Phone:
                </span>
                <div className="text-sm font-medium flex items-center justify-between">
                  <span>{formatPhoneNumber(subcontractor.area_code, subcontractor.phone)}</span>
                  {subcontractor.phone && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleCopyToClipboard(
                        formatPhoneNumber(subcontractor.area_code, subcontractor.phone) || "",
                        "Phone"
                      )}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                {subcontractor.location && (
                  <>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      Location:
                    </span>
                    <div className="text-sm font-medium flex items-center justify-between">
                      <span>{subcontractor.location}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleCopyToClipboard(subcontractor.location || "", "Location")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Separator className="my-4" />

          {/* Business Details Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold">Business Details</h4>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-y-3">
                <span className="text-sm text-muted-foreground">Trade:</span>
                <span className="text-sm font-medium">{subcontractor.trade}</span>

                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant="outline" className={statusColor}>
                  {subcontractor.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          {subcontractor.notes && (
            <>
              <Separator className="my-4" />
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <ClipboardList className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold">Notes</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {subcontractor.notes}
                  </p>
                </CardContent>
              </Card>
            </>
          )}

          {/* View Full Profile Link */}
          <div className="flex justify-end pt-4">
            <Button
              variant="link"
              className="text-sm"
              onClick={() => {
                // This is a placeholder - implement full profile view later
                toast({
                  title: "Coming Soon",
                  description: "Full profile view will be available soon",
                });
              }}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              View full profile
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
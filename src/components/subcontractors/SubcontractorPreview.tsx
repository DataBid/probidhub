import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  ExternalLink,
  Mail,
  PhoneCall,
  Edit,
} from "lucide-react";
import { ContactSection } from "./preview/ContactSection";
import { BusinessSection } from "./preview/BusinessSection";
import { CommunicationSection } from "./preview/CommunicationSection";
import { BidsSection } from "./preview/BidsSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SubcontractorPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subcontractor: {
    id: string;
    name: string;
    company: string;
    email: string;
    area_code?: string;
    phone?: string;
    location?: string;
    notes?: string;
    trade: string;
    status?: string;
    last_contact?: string;
    company_type: string;
  };
  onEdit?: () => void;
}

export const SubcontractorPreview = ({
  open,
  onOpenChange,
  subcontractor,
  onEdit,
}: SubcontractorPreviewProps) => {
  const { toast } = useToast();

  const handleCall = () => {
    if (subcontractor.phone) {
      window.location.href = `tel:${(subcontractor.area_code || '') + subcontractor.phone}`;
    }
  };

  const handleEmail = () => {
    window.location.href = `mailto:${subcontractor.email}`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="space-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 transition-transform hover:scale-105">
                <AvatarImage 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${subcontractor.company}`} 
                  alt={subcontractor.company} 
                />
                <AvatarFallback className="text-lg">
                  {subcontractor.company.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle>{subcontractor.company}</SheetTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{subcontractor.trade}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mr-8">
              <Button
                variant="outline"
                size="icon"
                onClick={handleEmail}
                title="Send email"
                className="hover:bg-primary/10 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </Button>
              {subcontractor.phone && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCall}
                  title="Call"
                  className="hover:bg-primary/10 transition-colors"
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
                  className="hover:bg-primary/10 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <SheetDescription>Company Details</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Contact Information Section */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <ContactSection
                name={subcontractor.name}
                email={subcontractor.email}
                phone={subcontractor.phone}
                area_code={subcontractor.area_code}
                location={subcontractor.location}
                onEmail={handleEmail}
                onCall={handleCall}
              />
            </CardContent>
          </Card>

          <Separator className="my-4" />

          {/* Business Details Section */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <BusinessSection
                trade={subcontractor.trade}
                status={subcontractor.status}
                lastContact={subcontractor.last_contact}
                companyType={subcontractor.company_type}
              />
            </CardContent>
          </Card>

          <Separator className="my-4" />

          {/* Communication History Section */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <CommunicationSection subcontractorId={subcontractor.id} />
            </CardContent>
          </Card>

          <Separator className="my-4" />

          {/* Bids Section */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <BidsSection subcontractorId={subcontractor.id} />
            </CardContent>
          </Card>

          {/* View Full Profile Link */}
          <div className="flex justify-end pt-4">
            <Button
              variant="link"
              className="text-sm group"
              onClick={() => {
                toast({
                  title: "Coming Soon",
                  description: "Full profile view will be available soon",
                });
              }}
            >
              <ExternalLink className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform" />
              View full profile
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
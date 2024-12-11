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
import {
  Building2,
  Contact,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  ClipboardList,
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
}

export const SubcontractorPreview = ({
  open,
  onOpenChange,
  subcontractor,
}: SubcontractorPreviewProps) => {
  const statusColor = getStatusColor(subcontractor.status);

  const formatPhoneNumber = (areaCode?: string, phone?: string) => {
    if (!phone) return "N/A";
    return `${areaCode || ''} ${phone}`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <SheetTitle>{subcontractor.company}</SheetTitle>
          </div>
          <SheetDescription>Subcontractor Details</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Contact Information Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 mb-4">
                <Contact className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold">Contact Information</h4>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-y-3">
                <span className="text-sm text-muted-foreground">Name:</span>
                <span className="text-sm font-medium">{subcontractor.name}</span>

                <span className="text-sm text-muted-foreground flex items-center">
                  <Mail className="h-3 w-3 mr-1" />
                  Email:
                </span>
                <span className="text-sm font-medium">{subcontractor.email}</span>

                <span className="text-sm text-muted-foreground flex items-center">
                  <Phone className="h-3 w-3 mr-1" />
                  Phone:
                </span>
                <span className="text-sm font-medium">
                  {formatPhoneNumber(subcontractor.area_code, subcontractor.phone)}
                </span>

                {subcontractor.location && (
                  <>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      Location:
                    </span>
                    <span className="text-sm font-medium">
                      {subcontractor.location}
                    </span>
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
        </div>
      </SheetContent>
    </Sheet>
  );
};
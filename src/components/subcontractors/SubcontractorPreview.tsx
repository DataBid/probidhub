import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "./utils/tradeUtils";

interface SubcontractorPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subcontractor: {
    name: string;
    company: string;
    email: string;
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{subcontractor.company}</SheetTitle>
          <SheetDescription>Subcontractor Details</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Contact Information</h4>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-sm text-muted-foreground">Name:</span>
              <span className="text-sm">{subcontractor.name}</span>
              <span className="text-sm text-muted-foreground">Email:</span>
              <span className="text-sm">{subcontractor.email}</span>
              {subcontractor.phone && (
                <>
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <span className="text-sm">{subcontractor.phone}</span>
                </>
              )}
              {subcontractor.location && (
                <>
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <span className="text-sm">{subcontractor.location}</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Business Details</h4>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-sm text-muted-foreground">Trade:</span>
              <span className="text-sm">{subcontractor.trade}</span>
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge variant="outline" className={statusColor}>
                {subcontractor.status}
              </Badge>
            </div>
          </div>

          {subcontractor.notes && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Notes</h4>
              <p className="text-sm text-muted-foreground">{subcontractor.notes}</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
import { format } from "date-fns";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BidInvitationItemProps {
  bid: {
    id: string;
    created_at: string;
    status: string;
    project: { title: string };
    subcontractor: {
      company_name: string;
      contact_email: string;
    };
  };
  onReminder: (bidId: string, email: string) => void;
  getStatusStyles: (status: string) => string;
}

export const BidInvitationItem = ({ bid, onReminder, getStatusStyles }: BidInvitationItemProps) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow ${
        bid.status === "responded" ? "bg-green-50 border-green-200" : "bg-white"
      }`}
    >
      <div>
        <h3 className="font-medium text-construction-900">{bid.project?.title}</h3>
        <p className="text-sm text-construction-500">
          {bid.subcontractor?.company_name}
        </p>
        <p className="text-sm text-construction-400">
          Sent: {format(new Date(bid.created_at), "MMM d, yyyy")}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(bid.status)}`}
        >
          {bid.status}
        </span>
        {bid.status !== "responded" && (
          <Button
            variant="outline"
            size="sm"
            className="text-primary hover:text-primary-hover"
            onClick={() => onReminder(bid.id, bid.subcontractor?.contact_email)}
          >
            <Mail className="h-4 w-4" />
            <span className="sr-only">Send Reminder</span>
          </Button>
        )}
      </div>
    </div>
  );
};
import { Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "../utils/tradeUtils";
import { format } from "date-fns";

interface BusinessSectionProps {
  trade: string;
  status?: string;
  lastContact?: string | null;
}

export const BusinessSection = ({ trade, status, lastContact }: BusinessSectionProps) => {
  const statusColor = getStatusColor(status);

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Briefcase className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-semibold">Business Details</h4>
      </div>
      <div className="grid grid-cols-[100px_1fr] gap-y-3">
        <span className="text-sm text-muted-foreground">Trade:</span>
        <span className="text-sm font-medium">{trade}</span>

        <span className="text-sm text-muted-foreground">Status:</span>
        <Badge variant="outline" className={statusColor}>
          {status}
        </Badge>

        {lastContact && (
          <>
            <span className="text-sm text-muted-foreground">Last Contact:</span>
            <span className="text-sm font-medium">
              {format(new Date(lastContact), 'MMM d, yyyy')}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
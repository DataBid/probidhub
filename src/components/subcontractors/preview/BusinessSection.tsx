import { Briefcase, Clock, History, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "../utils/tradeUtils";
import { format } from "date-fns";

interface BusinessSectionProps {
  trade: string;
  status?: string;
  lastContact?: string | null;
  companyType: string;
}

export const BusinessSection = ({ trade, status, lastContact, companyType }: BusinessSectionProps) => {
  const statusColor = getStatusColor(status);
  const specialties = trade.split(',').map(t => t.trim());

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Business Details</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Type:</span>
          <Badge variant="outline" className="capitalize">
            {companyType}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="capitalize"
            >
              {specialty}
            </Badge>
          ))}
        </div>

        {status && (
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Status:</span>
            <Badge variant="outline" className={statusColor}>
              {status}
            </Badge>
          </div>
        )}

        {lastContact && (
          <div className="flex items-center space-x-2">
            <History className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Last Contact:</span>
            <span className="text-sm">
              {format(new Date(lastContact), "MMM d, yyyy")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
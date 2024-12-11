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
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Briefcase className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-semibold">Business Details</h4>
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
              variant="outline" 
              className="hover:bg-primary/5 transition-colors cursor-default"
            >
              {specialty}
            </Badge>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge variant="outline" className={`${statusColor} transition-colors`}>
            {status}
          </Badge>
        </div>

        {lastContact && (
          <div className="flex items-center space-x-2">
            <History className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Last Contact:</span>
            <span className="text-sm font-medium">
              {format(new Date(lastContact), 'MMM d, yyyy')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
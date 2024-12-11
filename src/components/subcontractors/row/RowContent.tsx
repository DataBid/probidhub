import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CompanyCell } from "./CompanyCell";
import { ContactDetails } from "./ContactDetails";
import { TradeCell } from "./TradeCell";
import { RowActions } from "./RowActions";
import { getStatusColor } from "../utils/tradeUtils";

interface RowContentProps {
  sub: {
    id: string;
    name: string;
    company: string;
    trade: string;
    email: string;
    location?: string;
    status?: string;
    notes?: string;
    phone?: string;
    area_code?: string;
  };
  isMobile: boolean;
  onInvite: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

export const RowContent = ({ 
  sub, 
  isMobile, 
  onInvite, 
  onEdit, 
  onDelete,
  isLoading 
}: RowContentProps) => {
  const statusColor = getStatusColor(sub.status);

  return (
    <>
      <TableCell className="sticky left-[40px] bg-background">
        <CompanyCell id={sub.id} company={sub.company} />
      </TableCell>
      {!isMobile && (
        <TableCell>
          <ContactDetails
            id={sub.id}
            name={sub.name}
            email={sub.email}
            phone={sub.phone}
            area_code={sub.area_code}
            location={sub.location}
            notes={sub.notes}
            onEdit={(updates) => onEdit()}
          />
        </TableCell>
      )}
      <TableCell>
        <TradeCell trade={sub.trade} />
      </TableCell>
      {!isMobile && <TableCell>{sub.location || "N/A"}</TableCell>}
      <TableCell>
        <div className="flex items-center justify-between">
          <Badge 
            variant="outline" 
            className={`${statusColor} whitespace-nowrap`}
          >
            {sub.status}
          </Badge>
          <RowActions
            onInvite={onInvite}
            onEdit={onEdit}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        </div>
      </TableCell>
    </>
  );
};
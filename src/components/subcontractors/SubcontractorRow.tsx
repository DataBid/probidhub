import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CompanyCell } from "./row/CompanyCell";
import { ContactDetails } from "./row/ContactDetails";
import { TradeCell } from "./row/TradeCell";
import { RowActions } from "./row/RowActions";
import { getStatusColor } from "./utils/tradeUtils";

interface SubcontractorRowProps {
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
  };
  selected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onEdit: (sub: any) => void;
  onDelete: (id: string) => void;
  onInvite: (email: string) => void;
}

export const SubcontractorRow = ({ 
  sub, 
  selected,
  onSelect,
  onEdit, 
  onDelete, 
  onInvite 
}: SubcontractorRowProps) => {
  const statusColor = getStatusColor(sub.status);

  return (
    <TableRow key={sub.id} className="group hover:bg-gray-50">
      <TableCell>
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onSelect(sub.id, checked as boolean)}
          aria-label={`Select ${sub.name}`}
        />
      </TableCell>
      <TableCell>
        <CompanyCell id={sub.id} company={sub.company} />
      </TableCell>
      <TableCell>
        <ContactDetails
          name={sub.name}
          email={sub.email}
          phone={sub.phone}
          location={sub.location}
          notes={sub.notes}
          onEdit={(updates) => onEdit({ ...sub, ...updates })}
        />
      </TableCell>
      <TableCell>
        <TradeCell trade={sub.trade} />
      </TableCell>
      <TableCell>{sub.location || "N/A"}</TableCell>
      <TableCell>
        <Badge 
          variant="outline" 
          className={`${statusColor}`}
        >
          {sub.status}
        </Badge>
      </TableCell>
      <TableCell>
        <RowActions
          onInvite={() => onInvite(sub.email)}
          onEdit={() => onEdit(sub)}
          onDelete={() => onDelete(sub.id)}
        />
      </TableCell>
    </TableRow>
  );
};
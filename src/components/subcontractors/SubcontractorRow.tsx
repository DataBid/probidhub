import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { CompanyCell } from "./row/CompanyCell";
import { ContactDetails } from "./row/ContactDetails";
import { TradeCell } from "./row/TradeCell";
import { RowActions } from "./row/RowActions";
import { Badge } from "@/components/ui/badge";
import { CompanyData } from "./types/filterTypes";
import { getStatusColor } from "./utils/tradeUtils";

interface SubcontractorRowProps {
  sub: CompanyData;
  selected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onEdit: (sub: CompanyData) => void;
  onDelete: (id: string) => void;
  onInvite: (email: string) => void;
  isMobile: boolean;
}

export const SubcontractorRow = ({
  sub,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onInvite,
  isMobile,
}: SubcontractorRowProps) => {
  const statusColor = getStatusColor(sub.status || '');
  
  return (
    <TableRow className="group hover:bg-muted/50">
      <TableCell className="w-[40px] sticky left-0 bg-background group-hover:bg-muted/50">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked: boolean) => onSelect(sub.id, checked)}
          aria-label="Select subcontractor"
        />
      </TableCell>
      <TableCell className="sticky left-[40px] bg-background group-hover:bg-muted/50">
        <CompanyCell 
          id={sub.id} 
          company={sub.company} 
          company_type={sub.company_type}
        />
      </TableCell>
      {!isMobile && (
        <TableCell>
          <ContactDetails
            id={sub.id}
            name={sub.name}
            email={sub.email}
            phone={sub.phone}
            area_code={sub.area_code}
            onEdit={() => onEdit(sub)}
          />
        </TableCell>
      )}
      <TableCell>
        <TradeCell trade={sub.trade} />
      </TableCell>
      {!isMobile && <TableCell>{sub.location}</TableCell>}
      <TableCell>
        <Badge 
          variant="outline" 
          className={`${statusColor} whitespace-nowrap`}
        >
          {sub.status}
        </Badge>
      </TableCell>
      <TableCell>
        <RowActions
          onEdit={() => onEdit(sub)}
          onDelete={() => onDelete(sub.id)}
          onInvite={() => onInvite(sub.email)}
          isLoading={false}
        />
      </TableCell>
    </TableRow>
  );
};
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { CompanyCell } from "./row/CompanyCell";
import { ContactDetails } from "./row/ContactDetails";
import { TradeCell } from "./row/TradeCell";
import { RowActions } from "./row/RowActions";
import { CompanyData } from "./types/filterTypes";

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
  return (
    <TableRow>
      <TableCell className="w-[40px] sticky left-0 bg-background">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked: boolean) => onSelect(sub.id, checked)}
          aria-label="Select subcontractor"
        />
      </TableCell>
      <CompanyCell id={sub.id} company={sub.company} />
      {!isMobile && (
        <ContactDetails
          id={sub.id}
          name={sub.name}
          email={sub.email}
          phone={sub.phone}
          area_code={sub.area_code}
          onEdit={() => onEdit(sub)}
        />
      )}
      <TradeCell trade={sub.trade} />
      {!isMobile && <TableCell>{sub.location}</TableCell>}
      <TableCell>{sub.status}</TableCell>
      <RowActions
        onEdit={() => onEdit(sub)}
        onDelete={() => onDelete(sub.id)}
        onInvite={() => onInvite(sub.email)}
        isLoading={false}
      />
    </TableRow>
  );
};
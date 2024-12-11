import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CompanyCell } from "./row/CompanyCell";
import { ContactDetails } from "./row/ContactDetails";
import { TradeCell } from "./row/TradeCell";
import { RowActions } from "./row/RowActions";
import { getStatusColor } from "./utils/tradeUtils";
import { useState } from "react";
import { SubcontractorPreview } from "./SubcontractorPreview";

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
  const [previewOpen, setPreviewOpen] = useState(false);
  const statusColor = getStatusColor(sub.status);

  const handleRowClick = (e: React.MouseEvent) => {
    // Don't open preview if clicking on company link, checkbox, or action buttons
    const target = e.target as HTMLElement;
    if (
      target.closest('a') || 
      target.closest('button') || 
      target.closest('[role="checkbox"]')
    ) {
      return;
    }
    setPreviewOpen(true);
  };

  return (
    <>
      <TableRow 
        key={sub.id} 
        className="group hover:bg-gray-50 cursor-pointer"
        onClick={handleRowClick}
      >
        <TableCell onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selected}
            onCheckedChange={(checked) => onSelect(sub.id, checked as boolean)}
            aria-label={`Select ${sub.name}`}
          />
        </TableCell>
        <TableCell onClick={(e) => e.stopPropagation()}>
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
        <TableCell onClick={(e) => e.stopPropagation()}>
          <RowActions
            onInvite={() => onInvite(sub.email)}
            onEdit={() => onEdit(sub)}
            onDelete={() => onDelete(sub.id)}
          />
        </TableCell>
      </TableRow>
      <SubcontractorPreview
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        subcontractor={sub}
      />
    </>
  );
};
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CompanyCell } from "./row/CompanyCell";
import { ContactDetails } from "./row/ContactDetails";
import { TradeCell } from "./row/TradeCell";
import { getStatusColor } from "./utils/tradeUtils";
import { useState } from "react";
import { SubcontractorPreview } from "./SubcontractorPreview";
import { format } from "date-fns";

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
    last_contact?: string;
  };
  selected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onEdit: (sub: any) => void;
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
  isMobile
}: SubcontractorRowProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const statusColor = getStatusColor(sub.status);

  const handleRowClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('[role="checkbox"]')) {
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
        <TableCell>
          <CompanyCell id={sub.id} company={sub.company} />
        </TableCell>
        {!isMobile && (
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
        )}
        <TableCell>
          <TradeCell trade={sub.trade} />
        </TableCell>
        {!isMobile && <TableCell>{sub.location || "N/A"}</TableCell>}
        <TableCell className="whitespace-nowrap">
          {sub.last_contact ? (
            format(new Date(sub.last_contact), 'MMM d, yyyy')
          ) : (
            "Never"
          )}
        </TableCell>
        <TableCell>
          <Badge 
            variant="outline" 
            className={`${statusColor} whitespace-nowrap`}
          >
            {sub.status}
          </Badge>
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
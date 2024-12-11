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
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare } from "lucide-react";
import { SendMessageDialog } from "./communication/SendMessageDialog";
import { CommunicationHistory } from "./communication/CommunicationHistory";

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
  const [messageOpen, setMessageOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const statusColor = getStatusColor(sub.status);

  const handleRowClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('[role="checkbox"]') || target.closest('button')) {
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
              id={sub.id}
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
        <TableCell>
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={`${statusColor} whitespace-nowrap`}
            >
              {sub.status}
            </Badge>
            <RowActions
              onInvite={() => onInvite(sub.email)}
              onEdit={() => onEdit(sub)}
              onDelete={() => onDelete(sub.id)}
            />
          </div>
        </TableCell>
      </TableRow>
      
      <SubcontractorPreview
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        subcontractor={sub}
      />

      <SendMessageDialog
        open={messageOpen}
        onOpenChange={setMessageOpen}
        subcontractorId={sub.id}
        subcontractorEmail={sub.email}
        onSuccess={() => setHistoryOpen(true)}
      />

      <CommunicationHistory
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        subcontractorId={sub.id}
        subcontractorName={sub.name}
      />
    </>
  );
};
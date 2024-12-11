import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { RowContent } from "./row/RowContent";
import { SubcontractorPreviewDialog } from "./row/preview/SubcontractorPreviewDialog";

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
    area_code?: string;
    company_type: string;
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
  const [isLoading, setIsLoading] = useState(false);

  const handleRowClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('[role="checkbox"]') || target.closest('button')) {
      return;
    }
    setPreviewOpen(true);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onDelete(sub.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TableRow 
        key={sub.id} 
        className={cn(
          "group hover:bg-gray-50 cursor-pointer touch-manipulation",
          isLoading && "opacity-50"
        )}
        onClick={handleRowClick}
      >
        <TableCell className="sticky left-0 bg-background" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selected}
            onCheckedChange={(checked) => onSelect(sub.id, checked as boolean)}
            aria-label={`Select ${sub.name}`}
            disabled={isLoading}
            className="touch-manipulation"
          />
        </TableCell>
        
        <RowContent 
          sub={sub}
          isMobile={isMobile}
          onInvite={() => onInvite(sub.email)}
          onEdit={() => onEdit(sub)}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </TableRow>
      
      <SubcontractorPreviewDialog
        sub={sub}
        previewOpen={previewOpen}
        setPreviewOpen={setPreviewOpen}
        onEdit={() => onEdit(sub)}
      />
    </>
  );
};
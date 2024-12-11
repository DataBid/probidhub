import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SubcontractorRow } from "./SubcontractorRow";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SortConfig } from "./SubcontractorTable";
import { useIsMobile } from "@/hooks/use-mobile";

interface SubcontractorTableContentProps {
  subcontractors: any[];
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string, checked: boolean) => void;
  onEdit: (subcontractor: any) => void;
  onDelete: (id: string) => void;
  onInvite: (email: string) => void;
  sortConfig: SortConfig;
  onSort: (column: string) => void;
}

interface SortableHeaderProps {
  column: string;
  label: string;
  sortConfig: SortConfig;
  onSort: (column: string) => void;
  className?: string;
}

const SortableHeader = ({ column, label, sortConfig, onSort, className }: SortableHeaderProps) => {
  return (
    <TableHead className={className}>
      <Button
        variant="ghost"
        onClick={() => onSort(column)}
        className="h-8 flex items-center gap-1 font-medium"
      >
        {label}
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    </TableHead>
  );
};

export const SubcontractorTableContent = ({
  subcontractors,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onEdit,
  onDelete,
  onInvite,
  sortConfig,
  onSort,
}: SubcontractorTableContentProps) => {
  const allSelected = subcontractors.length > 0 && selectedIds.length === subcontractors.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < subcontractors.length;
  const isMobile = useIsMobile();

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onCheckedChange={onSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <SortableHeader 
              column="company" 
              label="Company" 
              sortConfig={sortConfig} 
              onSort={onSort}
              className="min-w-[180px]"
            />
            {!isMobile && (
              <SortableHeader 
                column="name" 
                label="Contact" 
                sortConfig={sortConfig} 
                onSort={onSort}
                className="min-w-[150px]"
              />
            )}
            <SortableHeader 
              column="trade" 
              label="Trade" 
              sortConfig={sortConfig} 
              onSort={onSort}
              className="min-w-[120px]"
            />
            {!isMobile && (
              <SortableHeader 
                column="location" 
                label="Location" 
                sortConfig={sortConfig} 
                onSort={onSort}
                className="min-w-[120px]"
              />
            )}
            <SortableHeader 
              column="last_contact" 
              label="Last Contact" 
              sortConfig={sortConfig} 
              onSort={onSort}
              className="min-w-[120px]"
            />
            <TableHead className="min-w-[100px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subcontractors.map((sub) => (
            <SubcontractorRow
              key={sub.id}
              sub={sub}
              selected={selectedIds.includes(sub.id)}
              onSelect={onSelectOne}
              onEdit={onEdit}
              onDelete={onDelete}
              onInvite={onInvite}
              isMobile={isMobile}
            />
          ))}
          {subcontractors.length === 0 && (
            <TableRow>
              <TableCell 
                colSpan={isMobile ? 4 : 6} 
                className="text-center text-muted-foreground h-32"
              >
                No subcontractors found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
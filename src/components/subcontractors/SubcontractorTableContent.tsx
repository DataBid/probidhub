import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SubcontractorRow } from "./SubcontractorRow";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortConfig } from "./SubcontractorTable";

interface SubcontractorTableContentProps {
  subcontractors: any[];
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
}

const SortableHeader = ({ column, label, sortConfig, onSort }: SortableHeaderProps) => {
  return (
    <TableHead>
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
  onEdit,
  onDelete,
  onInvite,
  sortConfig,
  onSort,
}: SubcontractorTableContentProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader column="name" label="Name" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader column="company" label="Company" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader column="trade" label="Trade" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader column="location" label="Location" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader column="status" label="Status" sortConfig={sortConfig} onSort={onSort} />
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subcontractors.map((sub) => (
            <SubcontractorRow
              key={sub.id}
              sub={sub}
              onEdit={onEdit}
              onDelete={onDelete}
              onInvite={onInvite}
            />
          ))}
          {subcontractors.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No subcontractors found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
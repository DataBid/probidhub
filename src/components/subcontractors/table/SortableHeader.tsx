import { Button } from "@/components/ui/button";
import { TableHead } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SortConfig } from "../types";

interface SortableHeaderProps {
  column: string;
  label: string;
  sortConfig: SortConfig;
  onSort: (column: string) => void;
  className?: string;
}

export const SortableHeader = ({ column, label, sortConfig, onSort, className }: SortableHeaderProps) => {
  const isActive = sortConfig?.column === column;
  const direction = sortConfig?.direction;

  return (
    <TableHead className={className}>
      <Button
        variant="ghost"
        onClick={() => onSort(column)}
        className={cn(
          "h-8 flex items-center gap-1 font-medium hover:text-primary",
          isActive && "text-primary"
        )}
      >
        {label}
        <ArrowUpDown className={cn(
          "h-4 w-4",
          isActive && "text-primary",
          isActive && direction === 'desc' && "rotate-180 transform"
        )} />
      </Button>
    </TableHead>
  );
};
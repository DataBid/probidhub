import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProjectFiltersProps {
  statusFilter: string;
  deadlineFilter: string;
  onStatusChange: (value: string) => void;
  onDeadlineChange: (value: string) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export const ProjectFilters = ({
  statusFilter,
  deadlineFilter,
  onStatusChange,
  onDeadlineChange,
  searchQuery = "",
  onSearchChange,
}: ProjectFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {onSearchChange && (
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
      )}

      <Select
        value={statusFilter}
        onValueChange={onStatusChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Open</SelectItem>
          <SelectItem value="pending">Pending Review</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={deadlineFilter}
        onValueChange={onDeadlineChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Deadline" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Deadlines</SelectItem>
          <SelectItem value="today">Due Today</SelectItem>
          <SelectItem value="tomorrow">Due Tomorrow</SelectItem>
          <SelectItem value="week">Next 7 Days</SelectItem>
          <SelectItem value="month">Next 30 Days</SelectItem>
          <SelectItem value="past">Past Due</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
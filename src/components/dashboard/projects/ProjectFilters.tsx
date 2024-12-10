import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectFiltersProps {
  statusFilter: string;
  deadlineFilter: string;
  onStatusChange: (value: string) => void;
  onDeadlineChange: (value: string) => void;
}

export const ProjectFilters = ({
  statusFilter,
  deadlineFilter,
  onStatusChange,
  onDeadlineChange,
}: ProjectFiltersProps) => {
  return (
    <>
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
    </>
  );
};
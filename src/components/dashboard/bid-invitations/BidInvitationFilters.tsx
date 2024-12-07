import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BidInvitationFiltersProps {
  statusFilter: string;
  dateFilter: string;
  onStatusChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export const BidInvitationFilters = ({
  statusFilter,
  dateFilter,
  onStatusChange,
  onDateChange,
}: BidInvitationFiltersProps) => {
  return (
    <div className="flex gap-4 mb-4">
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="viewed">Viewed</SelectItem>
          <SelectItem value="responded">Submitted</SelectItem>
        </SelectContent>
      </Select>

      <Select value={dateFilter} onValueChange={onDateChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">Last 7 Days</SelectItem>
          <SelectItem value="month">Last 30 Days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
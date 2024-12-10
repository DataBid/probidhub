import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SubcontractorFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  tradeFilter: string;
  onTradeChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export const SubcontractorFilters = ({
  searchQuery,
  onSearchChange,
  tradeFilter,
  onTradeChange,
  statusFilter,
  onStatusChange,
}: SubcontractorFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search subcontractors..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <Select value={tradeFilter} onValueChange={onTradeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Trade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Trades</SelectItem>
          <SelectItem value="electrical">Electrical</SelectItem>
          <SelectItem value="plumbing">Plumbing</SelectItem>
          <SelectItem value="hvac">HVAC</SelectItem>
          <SelectItem value="carpentry">Carpentry</SelectItem>
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="invited">Invited</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
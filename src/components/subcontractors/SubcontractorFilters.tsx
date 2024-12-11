import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DateRange } from "./schema";
import { SearchFilter } from "./filters/SearchFilter";
import { DateRangeFilter } from "./filters/DateRangeFilter";
import { TradesFilter } from "./filters/TradesFilter";
import { format } from "date-fns";

interface SubcontractorFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedTrades: string[];
  onTradesChange: (value: string[]) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  locationFilter: string;
  onLocationChange: (value: string) => void;
}

export const SubcontractorFilters = ({
  searchQuery,
  onSearchChange,
  selectedTrades,
  onTradesChange,
  statusFilter,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  locationFilter,
  onLocationChange,
}: SubcontractorFiltersProps) => {
  const toggleTrade = (trade: string) => {
    if (selectedTrades.includes(trade)) {
      onTradesChange(selectedTrades.filter((t) => t !== trade));
    } else {
      onTradesChange([...selectedTrades, trade]);
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchFilter searchQuery={searchQuery} onSearchChange={onSearchChange} />
        <DateRangeFilter dateRange={dateRange} onDateRangeChange={onDateRangeChange} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <TradesFilter selectedTrades={selectedTrades} onTradesChange={onTradesChange} />

        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="invited">Invited</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full sm:w-[200px]"
        />
      </div>

      {(selectedTrades.length > 0 || dateRange.from || locationFilter) && (
        <div className="flex flex-wrap gap-2">
          {selectedTrades.map((trade) => (
            <Badge
              key={trade}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => toggleTrade(trade)}
            >
              {trade} ×
            </Badge>
          ))}
          {dateRange.from && (
            <Badge
              variant="secondary"
              className="cursor-pointer"
              onClick={() => onDateRangeChange({ from: undefined, to: undefined })}
            >
              {format(dateRange.from, "LLL dd, y")} -{" "}
              {dateRange.to ? format(dateRange.to, "LLL dd, y") : "..."} ×
            </Badge>
          )}
          {locationFilter && (
            <Badge
              variant="secondary"
              className="cursor-pointer"
              onClick={() => onLocationChange("")}
            >
              {locationFilter} ×
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
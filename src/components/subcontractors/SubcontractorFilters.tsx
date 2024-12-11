import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { DateRange } from "./schema";
import { SearchFilter } from "./filters/SearchFilter";
import { DateRangeFilter } from "./filters/DateRangeFilter";
import { TradesFilter } from "./filters/TradesFilter";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleTrade = (trade: string) => {
    if (selectedTrades.includes(trade)) {
      onTradesChange(selectedTrades.filter((t) => t !== trade));
    } else {
      onTradesChange([...selectedTrades, trade]);
    }
  };

  // Calculate active filter count
  const activeFilterCount = [
    searchQuery,
    ...selectedTrades,
    statusFilter !== "all" ? statusFilter : "",
    dateRange.from ? "date" : "",
    locationFilter,
  ].filter(Boolean).length;

  // Clear all filters
  const handleClearFilters = () => {
    onSearchChange("");
    onTradesChange([]);
    onStatusChange("all");
    onDateRangeChange({ from: undefined, to: undefined });
    onLocationChange("");
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Search is always visible */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchFilter searchQuery={searchQuery} onSearchChange={onSearchChange} />
        
        {/* Mobile toggle button */}
        <Button
          variant="outline"
          className="sm:hidden flex items-center justify-between w-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 ml-2" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2" />
          )}
        </Button>
      </div>

      {/* Collapsible filters section */}
      <div className={cn(
        "flex flex-col gap-4 transition-all duration-200",
        !isExpanded && "hidden sm:flex"
      )}>
        <div className="flex flex-col sm:flex-row gap-4">
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

          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="whitespace-nowrap"
            >
              Clear All Filters
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            </Button>
          )}
        </div>
      </div>

      {/* Active filters badges */}
      {(selectedTrades.length > 0 || dateRange.from || locationFilter) && (
        <div className={cn(
          "flex flex-wrap gap-2",
          !isExpanded && "hidden sm:flex"
        )}>
          {selectedTrades.map((trade) => (
            <Badge
              key={trade}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => toggleTrade(trade)}
            >
              {trade} <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
          {dateRange.from && (
            <Badge
              variant="secondary"
              className="cursor-pointer"
              onClick={() => onDateRangeChange({ from: undefined, to: undefined })}
            >
              {format(dateRange.from, "LLL dd, y")} -{" "}
              {dateRange.to ? format(dateRange.to, "LLL dd, y") : "..."} <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
          {locationFilter && (
            <Badge
              variant="secondary"
              className="cursor-pointer"
              onClick={() => onLocationChange("")}
            >
              {locationFilter} <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
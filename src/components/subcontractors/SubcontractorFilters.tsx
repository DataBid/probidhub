import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DateRange } from "./schema";
import { SearchFilter } from "./filters/SearchFilter";
import { FilterControls } from "./filters/FilterControls";
import { ActiveFilterBadges } from "./filters/ActiveFilterBadges";
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
        <FilterControls
          selectedTrades={selectedTrades}
          onTradesChange={onTradesChange}
          statusFilter={statusFilter}
          onStatusChange={onStatusChange}
          locationFilter={locationFilter}
          onLocationChange={onLocationChange}
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          activeFilterCount={activeFilterCount}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Active filters badges */}
      <div className={cn(
        "flex flex-wrap gap-2",
        !isExpanded && "hidden sm:flex"
      )}>
        <ActiveFilterBadges
          selectedTrades={selectedTrades}
          toggleTrade={toggleTrade}
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          locationFilter={locationFilter}
          onLocationChange={onLocationChange}
        />
      </div>
    </div>
  );
};
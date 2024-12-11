import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusFilter } from "./StatusFilter";
import { LocationFilter } from "./LocationFilter";
import { TradesFilter } from "./TradesFilter";
import { DateRangeFilter } from "./DateRangeFilter";
import { DateRange } from "../schema";

interface FilterControlsProps {
  selectedTrades: string[];
  onTradesChange: (value: string[]) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  locationFilter: string;
  onLocationChange: (value: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  activeFilterCount: number;
  onClearFilters: () => void;
}

export const FilterControls = ({
  selectedTrades,
  onTradesChange,
  statusFilter,
  onStatusChange,
  locationFilter,
  onLocationChange,
  dateRange,
  onDateRangeChange,
  activeFilterCount,
  onClearFilters,
}: FilterControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <TradesFilter selectedTrades={selectedTrades} onTradesChange={onTradesChange} />
      <StatusFilter statusFilter={statusFilter} onStatusChange={onStatusChange} />
      <LocationFilter locationFilter={locationFilter} onLocationChange={onLocationChange} />
      <DateRangeFilter dateRange={dateRange} onDateRangeChange={onDateRangeChange} />

      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="whitespace-nowrap"
        >
          Clear All Filters
          <Badge variant="secondary" className="ml-2">
            {activeFilterCount}
          </Badge>
        </Button>
      )}
    </div>
  );
};
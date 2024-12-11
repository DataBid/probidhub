import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusFilter } from "./StatusFilter";
import { LocationFilter } from "./LocationFilter";
import { TradesFilter } from "./TradesFilter";
import { DateRangeFilter } from "./DateRangeFilter";
import { DateRange } from "../schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  companyTypeFilter: string;
  onCompanyTypeChange: (value: string) => void;
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
  companyTypeFilter,
  onCompanyTypeChange,
}: FilterControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Select value={companyTypeFilter} onValueChange={onCompanyTypeChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="All Company Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Company Types</SelectItem>
          <SelectItem value="subcontractor">Subcontractor</SelectItem>
          <SelectItem value="supplier">Supplier</SelectItem>
          <SelectItem value="owner">Owner</SelectItem>
          <SelectItem value="architect">Architect</SelectItem>
          <SelectItem value="engineer">Engineer</SelectItem>
        </SelectContent>
      </Select>

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
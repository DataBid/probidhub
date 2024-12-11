import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "../schema";

interface ActiveFilterBadgesProps {
  selectedTrades: string[];
  toggleTrade: (trade: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  locationFilter: string;
  onLocationChange: (value: string) => void;
  companyTypeFilter: string;
  onCompanyTypeChange: (value: string) => void;
}

export const ActiveFilterBadges = ({
  selectedTrades,
  toggleTrade,
  dateRange,
  onDateRangeChange,
  locationFilter,
  onLocationChange,
  companyTypeFilter,
  onCompanyTypeChange,
}: ActiveFilterBadgesProps) => {
  if (!selectedTrades.length && !dateRange.from && !locationFilter && companyTypeFilter === 'all') {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
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
      {companyTypeFilter !== 'all' && (
        <Badge
          variant="secondary"
          className="cursor-pointer"
          onClick={() => onCompanyTypeChange("all")}
        >
          {companyTypeFilter} <X className="h-3 w-3 ml-1" />
        </Badge>
      )}
    </div>
  );
};
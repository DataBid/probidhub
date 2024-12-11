import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Calendar } from "lucide-react";
import { DateRange } from "./schema";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { trades } from "./schema";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

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
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, company, or trade..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal w-[240px]",
                !dateRange.from && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                "Date Added Range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={{
                from: dateRange.from,
                to: dateRange.to,
              }}
              onSelect={(range: any) => onDateRangeChange(range || { from: undefined, to: undefined })}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-between w-full sm:w-[200px]"
            >
              <span className="truncate">
                {selectedTrades.length > 0
                  ? `${selectedTrades.length} trades selected`
                  : "Select trades"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search trades..." />
              <CommandEmpty>No trade found.</CommandEmpty>
              <CommandGroup>
                {trades.map((trade) => (
                  <CommandItem
                    key={trade}
                    onSelect={() => toggleTrade(trade)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selectedTrades.includes(trade)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <span className="h-4 w-4 text-current">✓</span>
                    </div>
                    {trade}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

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
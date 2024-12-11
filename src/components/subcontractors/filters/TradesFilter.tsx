import { Button } from "@/components/ui/button";
import { trades } from "../schema";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TradesFilterProps {
  selectedTrades: string[];
  onTradesChange: (trades: string[]) => void;
}

export const TradesFilter = ({ selectedTrades, onTradesChange }: TradesFilterProps) => {
  const toggleTrade = (trade: string) => {
    if (selectedTrades.includes(trade)) {
      onTradesChange(selectedTrades.filter((t) => t !== trade));
    } else {
      onTradesChange([...selectedTrades, trade]);
    }
  };

  return (
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
  );
};
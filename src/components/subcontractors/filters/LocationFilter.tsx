import { Input } from "@/components/ui/input";

interface LocationFilterProps {
  locationFilter: string;
  onLocationChange: (value: string) => void;
}

export const LocationFilter = ({ locationFilter, onLocationChange }: LocationFilterProps) => {
  return (
    <Input
      placeholder="Filter by location..."
      value={locationFilter}
      onChange={(e) => onLocationChange(e.target.value)}
      className="w-full sm:w-[200px]"
    />
  );
};
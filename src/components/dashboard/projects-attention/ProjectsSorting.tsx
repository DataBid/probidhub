import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectsSortingProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const ProjectsSorting = ({ sortBy, onSortChange }: ProjectsSortingProps) => {
  return (
    <div className="flex gap-4 mb-4">
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="deadline">Deadlines Approaching</SelectItem>
          <SelectItem value="issues">Critical Issues</SelectItem>
          <SelectItem value="response-rate-asc">Response Rate (Low to High)</SelectItem>
          <SelectItem value="response-rate-desc">Response Rate (High to Low)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
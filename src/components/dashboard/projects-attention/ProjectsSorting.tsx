import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownWideNarrow } from "lucide-react";

interface ProjectsSortingProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const ProjectsSorting = ({ sortBy, onSortChange }: ProjectsSortingProps) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowDownWideNarrow className="h-4 w-4 text-muted-foreground" />
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[200px] bg-white">
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
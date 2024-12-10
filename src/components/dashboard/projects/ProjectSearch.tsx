import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProjectSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const ProjectSearch = ({ searchQuery, onSearchChange }: ProjectSearchProps) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-8 w-full text-sm py-1.5 h-8"
        autoComplete="off"
      />
    </div>
  );
};
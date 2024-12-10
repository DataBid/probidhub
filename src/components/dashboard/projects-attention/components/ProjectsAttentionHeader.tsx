import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ProjectsSorting } from "../ProjectsSorting";

interface ProjectsAttentionHeaderProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  onExport: () => void;
}

export const ProjectsAttentionHeader = ({
  sortBy,
  onSortChange,
  onExport,
}: ProjectsAttentionHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold text-construction-900">
        Projects Requiring Attention
      </h2>
      <div className="flex gap-2 items-center">
        <ProjectsSorting sortBy={sortBy} onSortChange={onSortChange} />
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};
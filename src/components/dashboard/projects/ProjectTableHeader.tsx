
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProjectTableHeaderProps {
  onSort: (field: string) => void;
}

export const ProjectTableHeader = ({ onSort }: ProjectTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Project Name</TableHead>
        <TableHead>
          <Button
            variant="ghost"
            onClick={() => onSort("created_at")}
            className="h-8 px-2"
            truncate
          >
            Posted Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead>
          <Button
            variant="ghost"
            onClick={() => onSort("bids_due")}
            className="h-8 px-2"
            truncate
          >
            Bid Deadline
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead>
          <Button
            variant="ghost"
            onClick={() => onSort("stage")}
            className="h-8 px-2"
            truncate
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead>Invites Sent</TableHead>
      </TableRow>
    </TableHeader>
  );
};

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Mail, Trash } from "lucide-react";

interface Subcontractor {
  id: string;
  name: string;
  company: string;
  trade: string;
  email: string;
  phone?: string;
  location?: string;
  status: string;
}

interface SubcontractorTableProps {
  subcontractors: Subcontractor[];
  isLoading: boolean;
}

export const SubcontractorTable = ({
  subcontractors,
  isLoading,
}: SubcontractorTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "invited":
        return "bg-blue-100 text-blue-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Trade</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subcontractors.map((sub) => (
          <TableRow key={sub.id}>
            <TableCell>
              <div>
                <div className="font-medium">{sub.name}</div>
                <div className="text-sm text-muted-foreground">{sub.email}</div>
              </div>
            </TableCell>
            <TableCell>{sub.company}</TableCell>
            <TableCell>{sub.trade}</TableCell>
            <TableCell>{sub.location || "N/A"}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(sub.status)}>{sub.status}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
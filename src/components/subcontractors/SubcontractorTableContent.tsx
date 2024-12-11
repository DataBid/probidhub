import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SubcontractorRow } from "./SubcontractorRow";

interface SubcontractorTableContentProps {
  subcontractors: any[];
  onEdit: (subcontractor: any) => void;
  onDelete: (id: string) => void;
  onInvite: (email: string) => void;
}

export const SubcontractorTableContent = ({
  subcontractors,
  onEdit,
  onDelete,
  onInvite,
}: SubcontractorTableContentProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Trade</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subcontractors.map((sub) => (
            <SubcontractorRow
              key={sub.id}
              sub={sub}
              onEdit={onEdit}
              onDelete={onDelete}
              onInvite={onInvite}
            />
          ))}
          {subcontractors.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No subcontractors found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
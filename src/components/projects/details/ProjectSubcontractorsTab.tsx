import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProjectSubcontractorsTabProps {
  project: any;
}

export const ProjectSubcontractorsTab = ({ project }: ProjectSubcontractorsTabProps) => {
  const subcontractors = project.bids?.map((bid: any) => ({
    id: bid.id,
    name: bid.profiles?.company_name || 'Unknown Company',
    email: bid.profiles?.contact_email,
    phone: bid.profiles?.phone,
    status: bid.status,
    responseDate: bid.response_date,
  })) || [];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Invited Subcontractors</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Response Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subcontractors.map((sub: any) => (
              <TableRow key={sub.id}>
                <TableCell className="font-medium">{sub.name}</TableCell>
                <TableCell>{sub.email}</TableCell>
                <TableCell>{sub.status}</TableCell>
                <TableCell>{sub.responseDate ? new Date(sub.responseDate).toLocaleDateString() : 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
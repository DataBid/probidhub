import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { SubcontractorForm } from "./SubcontractorForm";
import { SubcontractorRow } from "./SubcontractorRow";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SubcontractorTableProps {
  subcontractors: any[];
  isLoading: boolean;
  refetch: () => void;
}

export const SubcontractorTable = ({
  subcontractors,
  isLoading,
  refetch,
}: SubcontractorTableProps) => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<any>();
  const { toast } = useToast();

  const handleEdit = (subcontractor: any) => {
    setSelectedSubcontractor(subcontractor);
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("subcontractors")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Subcontractor deleted successfully",
      });
      
      refetch();
    } catch (error) {
      console.error("Error deleting subcontractor:", error);
      toast({
        title: "Error",
        description: "Failed to delete subcontractor",
        variant: "destructive",
      });
    }
  };

  const handleInvite = (email: string) => {
    toast({
      title: "Coming Soon",
      description: "Invite functionality will be implemented soon",
    });
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-3 sm:p-6">
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
                onEdit={handleEdit}
                onDelete={handleDelete}
                onInvite={handleInvite}
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
      <SubcontractorForm
        open={formOpen}
        onOpenChange={setFormOpen}
        subcontractor={selectedSubcontractor}
        onSuccess={() => {
          refetch();
          setFormOpen(false);
        }}
      />
    </Card>
  );
};
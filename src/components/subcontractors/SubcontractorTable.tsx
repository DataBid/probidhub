import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SubcontractorForm } from "./SubcontractorForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SubcontractorTableLoading } from "./SubcontractorTableLoading";
import { SubcontractorTableContent } from "./SubcontractorTableContent";

interface SubcontractorTableProps {
  subcontractors: any[];
  isLoading: boolean;
  refetch: () => void;
}

export type SortConfig = {
  column: string;
  direction: 'asc' | 'desc';
} | null;

export const SubcontractorTable = ({
  subcontractors,
  isLoading,
  refetch,
}: SubcontractorTableProps) => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<any>();
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
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

  const sortedSubcontractors = [...subcontractors].sort((a, b) => {
    if (!sortConfig) return 0;

    const { column, direction } = sortConfig;
    const aValue = a[column];
    const bValue = b[column];

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column: string) => {
    setSortConfig((currentSort) => {
      if (!currentSort || currentSort.column !== column) {
        return { column, direction: 'asc' };
      }
      if (currentSort.direction === 'asc') {
        return { column, direction: 'desc' };
      }
      return null;
    });
  };

  if (isLoading) {
    return <SubcontractorTableLoading />;
  }

  return (
    <Card className="p-3 sm:p-6">
      <SubcontractorTableContent
        subcontractors={sortedSubcontractors}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onInvite={handleInvite}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
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
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SubcontractorForm } from "./SubcontractorForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SubcontractorTableLoading } from "./SubcontractorTableLoading";
import { SubcontractorTableContent } from "./SubcontractorTableContent";
import { SubcontractorBulkActions } from "./SubcontractorBulkActions";

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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
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

  const handleBulkDelete = async (ids: string[]) => {
    try {
      const { error } = await supabase
        .from("subcontractors")
        .delete()
        .in("id", ids);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${ids.length} subcontractors deleted successfully`,
      });
      
      setSelectedIds([]);
      refetch();
    } catch (error) {
      console.error("Error deleting subcontractors:", error);
      toast({
        title: "Error",
        description: "Failed to delete subcontractors",
        variant: "destructive",
      });
    }
  };

  const handleBulkInvite = (ids: string[]) => {
    toast({
      title: "Coming Soon",
      description: `Bulk invite functionality will be implemented soon`,
    });
  };

  const handleBulkStatusChange = async (ids: string[], status: string) => {
    try {
      const { error } = await supabase
        .from("subcontractors")
        .update({ status })
        .in("id", ids);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Status updated for ${ids.length} subcontractors`,
      });
      
      setSelectedIds([]);
      refetch();
    } catch (error) {
      console.error("Error updating subcontractors:", error);
      toast({
        title: "Error",
        description: "Failed to update subcontractors",
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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(sortedSubcontractors.map(sub => sub.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(prevId => prevId !== id));
    }
  };

  if (isLoading) {
    return <SubcontractorTableLoading />;
  }

  return (
    <Card className="p-3 sm:p-6">
      <SubcontractorBulkActions
        selectedIds={selectedIds}
        onDelete={handleBulkDelete}
        onInvite={handleBulkInvite}
        onStatusChange={handleBulkStatusChange}
      />
      <SubcontractorTableContent
        subcontractors={sortedSubcontractors}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
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
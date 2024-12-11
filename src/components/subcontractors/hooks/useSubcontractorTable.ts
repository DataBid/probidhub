import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SortConfig } from "../types";

export const useSubcontractorTable = (subcontractors: any[], refetch: () => void) => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<any>();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    column: 'company', 
    direction: 'asc' 
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  return {
    formOpen,
    setFormOpen,
    selectedSubcontractor,
    sortConfig,
    setSortConfig,
    selectedIds,
    setSelectedIds,
    currentPage,
    setCurrentPage,
    handleEdit,
    handleDelete,
    handleBulkDelete,
    handleBulkInvite,
    handleBulkStatusChange,
    handleInvite,
  };
};
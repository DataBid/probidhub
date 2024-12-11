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
    return <SubcontractorTableLoading />;
  }

  return (
    <Card className="p-3 sm:p-6">
      <SubcontractorTableContent
        subcontractors={subcontractors}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onInvite={handleInvite}
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
import { useState } from "react";
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
import { Edit, Mail, Trash, UserPlus } from "lucide-react";
import { SubcontractorForm } from "./SubcontractorForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Subcontractor {
  id: string;
  name: string;
  company: string;
  trade: string;
  email: string;
  phone?: string;
  location?: string;
  status: string;
  notes?: string;
}

interface SubcontractorTableProps {
  subcontractors: Subcontractor[];
  isLoading: boolean;
  onDelete?: (id: string) => void;
  refetch: () => void;
}

export const SubcontractorTable = ({
  subcontractors,
  isLoading,
  onDelete,
  refetch,
}: SubcontractorTableProps) => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<Subcontractor | undefined>();
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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

  const handleEdit = (subcontractor: Subcontractor) => {
    setSelectedSubcontractor(subcontractor);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedSubcontractor(undefined);
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
    // TODO: Implement invite functionality
    toast({
      title: "Coming Soon",
      description: "Invite functionality will be implemented soon",
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Subcontractor
        </Button>
      </div>
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
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleInvite(sub.email)}
                      title="Invite to bid"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(sub)}
                      title="Edit subcontractor"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          title="Delete subcontractor"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Subcontractor</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this subcontractor? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(sub.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
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
    </>
  );
};
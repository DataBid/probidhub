import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface CategoryAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIds: string[];
  onAssign: (ids: string[], categoryIds: string[]) => void;
}

export const CategoryAssignmentDialog = ({
  open,
  onOpenChange,
  selectedIds,
  onAssign,
}: CategoryAssignmentDialogProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useUser();
  const { toast } = useToast();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["company-categories"],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("company_categories")
        .select("*")
        .eq("gc_id", user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onAssign(selectedIds, selectedCategories);
      toast({
        title: "Categories assigned",
        description: `Successfully assigned categories to ${selectedIds.length} companies`,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error assigning categories:", error);
      toast({
        title: "Error",
        description: "Failed to assign categories",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Categories</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : categories?.length === 0 ? (
            <p className="text-sm text-muted-foreground">No categories found</p>
          ) : (
            <div className="space-y-4">
              {categories?.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories((prev) => [...prev, category.id]);
                      } else {
                        setSelectedCategories((prev) =>
                          prev.filter((id) => id !== category.id)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={category.id}>{category.name}</Label>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedCategories.length === 0 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Assigning...
              </>
            ) : (
              "Assign Categories"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
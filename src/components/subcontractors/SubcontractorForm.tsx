import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SubcontractorFormFields } from "./SubcontractorFormFields";
import { useSubcontractorForm } from "./useSubcontractorForm";

interface SubcontractorFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subcontractor?: {
    id: string;
    name: string;
    company: string;
    trade: string;
    email: string;
    phone?: string;
    location?: string;
    notes?: string;
  };
  onSuccess: () => void;
}

export function SubcontractorForm({ open, onOpenChange, subcontractor, onSuccess }: SubcontractorFormProps) {
  const { form, onSubmit } = useSubcontractorForm({
    subcontractor,
    onSuccess,
    onOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {subcontractor ? "Edit Subcontractor" : "Add Subcontractor"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SubcontractorFormFields form={form} />
            <DialogFooter>
              <Button type="submit">
                {subcontractor ? "Update" : "Add"} Subcontractor
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
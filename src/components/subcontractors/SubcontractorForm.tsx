import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";

// Update schema to match required fields
const subcontractorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  trade: z.string().min(2, "Trade must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

type SubcontractorFormValues = z.infer<typeof subcontractorSchema>;

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
  const { toast } = useToast();
  const user = useUser();
  
  const form = useForm<SubcontractorFormValues>({
    resolver: zodResolver(subcontractorSchema),
    defaultValues: subcontractor || {
      name: "",
      company: "",
      trade: "",
      email: "",
      phone: "",
      location: "",
      notes: "",
    },
  });

  const onSubmit = async (data: SubcontractorFormValues) => {
    try {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      const submissionData = {
        ...data,
        gc_id: user.id,
        status: 'active' as const
      };

      if (subcontractor?.id) {
        const { error } = await supabase
          .from("subcontractors")
          .update(submissionData)
          .eq("id", subcontractor.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Subcontractor updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("subcontractors")
          .insert([submissionData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Subcontractor added successfully",
        });
      }

      onSuccess();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error saving subcontractor:", error);
      toast({
        title: "Error",
        description: "Failed to save subcontractor. Please try again.",
        variant: "destructive",
      });
    }
  };

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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="trade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trade</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Electrical" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add any additional notes here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
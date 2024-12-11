import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { subcontractorSchema, type SubcontractorFormValues } from "./schema";

interface UseSubcontractorFormProps {
  subcontractor?: {
    id: string;
    name: string;
    company: string;
    trade: string;
    email: string;
    area_code?: string;
    phone?: string;
    location?: string;
    notes?: string;
  };
  onSuccess: () => void;
  onOpenChange: (open: boolean) => void;
}

export function useSubcontractorForm({ subcontractor, onSuccess, onOpenChange }: UseSubcontractorFormProps) {
  const { toast } = useToast();
  const user = useUser();
  
  const form = useForm<SubcontractorFormValues>({
    resolver: zodResolver(subcontractorSchema),
    defaultValues: subcontractor || {
      name: "",
      company: "",
      trade: "",
      email: "",
      area_code: "",
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
        name: data.name,
        company: data.company,
        trade: data.trade,
        email: data.email,
        area_code: data.area_code || null,
        phone: data.phone || null,
        location: data.location || null,
        notes: data.notes || null,
        gc_id: user.id,
        status: 'active' as const,
        company_type: 'subcontractor' as const
      };

      if (subcontractor?.id) {
        const { error } = await supabase
          .from("companies_directory")
          .update(submissionData)
          .eq("id", subcontractor.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Subcontractor updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("companies_directory")
          .insert(submissionData);

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

  return { form, onSubmit };
}
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { companySchema, type CompanyFormValues } from "./schema";
import { CompanyType } from "./types";

interface UseCompanyFormProps {
  company?: {
    id: string;
    name: string;
    company: string;
    trade: string;
    email: string;
    area_code?: string;
    phone?: string;
    location?: string;
    notes?: string;
    company_type: CompanyType;
  };
  onSuccess: () => void;
  onOpenChange: (open: boolean) => void;
}

export function useCompanyForm({ company, onSuccess, onOpenChange }: UseCompanyFormProps) {
  const { toast } = useToast();
  const user = useUser();
  
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: company || {
      name: "",
      company: "",
      trade: "",
      email: "",
      area_code: "",
      phone: "",
      location: "",
      notes: "",
      company_type: "subcontractor",
    },
  });

  const onSubmit = async (data: CompanyFormValues) => {
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
        company_type: data.company_type,
      };

      if (company?.id) {
        const { error } = await supabase
          .from("companies_directory")
          .update(submissionData)
          .eq("id", company.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Company updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("companies_directory")
          .insert(submissionData);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Company added successfully",
        });
      }

      onSuccess();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error saving company:", error);
      toast({
        title: "Error",
        description: "Failed to save company. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { form, onSubmit };
}
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SubcontractorTable } from "@/components/subcontractors/SubcontractorTable";
import { SubcontractorFilters } from "@/components/subcontractors/SubcontractorFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const SubcontractorsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tradeFilter, setTradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: subcontractors, isLoading } = useQuery({
    queryKey: ["subcontractors", searchQuery, tradeFilter, statusFilter],
    queryFn: async () => {
      console.log("Fetching subcontractors with filters:", {
        searchQuery,
        tradeFilter,
        statusFilter,
      });

      let query = supabase
        .from("subcontractors")
        .select("*")
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.or(
          `name.ilike.%${searchQuery}%,company.ilike.%${searchQuery}%,trade.ilike.%${searchQuery}%`
        );
      }

      if (tradeFilter !== "all") {
        query = query.eq("trade", tradeFilter);
      }

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching subcontractors:", error);
        throw error;
      }

      return data;
    },
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Subcontractors</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Subcontractor
        </Button>
      </div>

      <SubcontractorFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        tradeFilter={tradeFilter}
        onTradeChange={setTradeFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <SubcontractorTable
        subcontractors={subcontractors || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SubcontractorsPage;
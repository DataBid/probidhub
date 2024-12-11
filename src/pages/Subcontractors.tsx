import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SubcontractorTable } from "@/components/subcontractors/SubcontractorTable";
import { SubcontractorFilters } from "@/components/subcontractors/SubcontractorFilters";
import { SubcontractorHeader } from "@/components/subcontractors/SubcontractorHeader";
import { useUser } from "@supabase/auth-helpers-react";

export const SubcontractorsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tradeFilter, setTradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const user = useUser();

  const { data: subcontractors, isLoading, refetch } = useQuery({
    queryKey: ["subcontractors", searchQuery, tradeFilter, statusFilter],
    queryFn: async () => {
      console.log("Fetching subcontractors with filters:", {
        searchQuery,
        tradeFilter,
        statusFilter,
      });

      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      let query = supabase
        .from("subcontractors")
        .select("*")
        .eq("gc_id", user.id)
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
    enabled: !!user?.id,
  });

  return (
    <div className="px-2 sm:px-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden pb-20 lg:pb-6">
      <SubcontractorHeader onAdd={() => setFormOpen(true)} />

      <div className="space-y-4">
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
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default SubcontractorsPage;
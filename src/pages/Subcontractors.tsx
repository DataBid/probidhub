import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SubcontractorTable } from "@/components/subcontractors/SubcontractorTable";
import { SubcontractorFilters } from "@/components/subcontractors/SubcontractorFilters";
import { SubcontractorHeader } from "@/components/subcontractors/SubcontractorHeader";
import { useUser } from "@supabase/auth-helpers-react";
import { downloadCSV, prepareSubcontractorsData } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "@/components/subcontractors/schema";
import { startOfDay, endOfDay } from "date-fns";

export const SubcontractorsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [locationFilter, setLocationFilter] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const user = useUser();
  const { toast } = useToast();

  const { data: subcontractors, isLoading, refetch } = useQuery({
    queryKey: ["subcontractors", searchQuery, selectedTrades, statusFilter, dateRange, locationFilter],
    queryFn: async () => {
      console.log("Fetching subcontractors with filters:", {
        searchQuery,
        selectedTrades,
        statusFilter,
        dateRange,
        locationFilter,
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

      if (selectedTrades.length > 0) {
        query = query.in("trade", selectedTrades);
      }

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      if (dateRange.from) {
        query = query.gte("created_at", startOfDay(dateRange.from).toISOString());
        if (dateRange.to) {
          query = query.lte("created_at", endOfDay(dateRange.to).toISOString());
        }
      }

      if (locationFilter) {
        query = query.ilike("location", `%${locationFilter}%`);
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

  const handleExport = () => {
    if (!subcontractors?.length) {
      toast({
        title: "No data to export",
        description: "There are no subcontractors matching your current filters.",
        variant: "destructive",
      });
      return;
    }

    const exportData = prepareSubcontractorsData(subcontractors);
    downloadCSV(exportData, "subcontractors");
    
    toast({
      title: "Export successful",
      description: "Your subcontractors list has been exported successfully.",
    });
  };

  return (
    <div className="px-2 sm:px-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden pb-20 lg:pb-6">
      <SubcontractorHeader onAdd={() => setFormOpen(true)} onExport={handleExport} />

      <div className="space-y-4">
        <SubcontractorFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTrades={selectedTrades}
          onTradesChange={setSelectedTrades}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          locationFilter={locationFilter}
          onLocationChange={setLocationFilter}
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
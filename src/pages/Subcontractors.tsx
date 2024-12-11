import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SubcontractorTable } from "@/components/subcontractors/SubcontractorTable";
import { SubcontractorFilters } from "@/components/subcontractors/SubcontractorFilters";
import { SubcontractorHeader } from "@/components/subcontractors/SubcontractorHeader";
import { useUser } from "@supabase/auth-helpers-react";
import { downloadCSV, prepareSubcontractorsData } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";
import { useFilterPreferences } from "@/hooks/use-filter-preferences";
import { useSubcontractorShortcuts } from "@/hooks/use-subcontractor-shortcuts";

export const SubcontractorsPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const user = useUser();
  const { toast } = useToast();

  // Initialize filter preferences with default values
  const [filterPreferences, setFilterPreferences] = useFilterPreferences({
    searchQuery: "",
    selectedTrades: [],
    statusFilter: "all",
    dateRange: { from: undefined, to: undefined },
    locationFilter: "",
  });

  const { data: subcontractors, isLoading, refetch } = useQuery({
    queryKey: ["subcontractors", filterPreferences],
    queryFn: async () => {
      console.log("Fetching subcontractors with filters:", filterPreferences);

      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      let query = supabase
        .from("companies_directory")
        .select("*")
        .eq("gc_id", user.id)
        .eq("company_type", "subcontractor")
        .order("created_at", { ascending: false });

      if (filterPreferences.searchQuery) {
        query = query.or(
          `name.ilike.%${filterPreferences.searchQuery}%,company.ilike.%${filterPreferences.searchQuery}%,trade.ilike.%${filterPreferences.searchQuery}%`
        );
      }

      if (filterPreferences.selectedTrades.length > 0) {
        query = query.in("trade", filterPreferences.selectedTrades);
      }

      if (filterPreferences.statusFilter !== "all") {
        query = query.eq("status", filterPreferences.statusFilter);
      }

      if (filterPreferences.dateRange.from) {
        query = query.gte(
          "created_at",
          filterPreferences.dateRange.from.toISOString()
        );
        if (filterPreferences.dateRange.to) {
          query = query.lte(
            "created_at",
            filterPreferences.dateRange.to.toISOString()
          );
        }
      }

      if (filterPreferences.locationFilter) {
        query = query.ilike("location", `%${filterPreferences.locationFilter}%`);
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

  // Initialize keyboard shortcuts
  useSubcontractorShortcuts({
    onAdd: () => setFormOpen(true),
    onRefresh: () => refetch(),
    onExport: handleExport,
  });

  return (
    <div className="px-2 sm:px-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden pb-20 lg:pb-6">
      <SubcontractorHeader 
        onAdd={() => setFormOpen(true)} 
        onExport={handleExport}
        onImportSuccess={() => refetch()}
      />

      <div className="space-y-4">
        <SubcontractorFilters
          searchQuery={filterPreferences.searchQuery}
          onSearchChange={(value) =>
            setFilterPreferences((prev) => ({ ...prev, searchQuery: value }))
          }
          selectedTrades={filterPreferences.selectedTrades}
          onTradesChange={(value) =>
            setFilterPreferences((prev) => ({ ...prev, selectedTrades: value }))
          }
          statusFilter={filterPreferences.statusFilter}
          onStatusChange={(value) =>
            setFilterPreferences((prev) => ({ ...prev, statusFilter: value }))
          }
          dateRange={filterPreferences.dateRange}
          onDateRangeChange={(range) =>
            setFilterPreferences((prev) => ({ ...prev, dateRange: range }))
          }
          locationFilter={filterPreferences.locationFilter}
          onLocationChange={(value) =>
            setFilterPreferences((prev) => ({ ...prev, locationFilter: value }))
          }
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
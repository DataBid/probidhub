import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchResult = {
  id: string;
  type: 'project' | 'subcontractor' | 'bid';
  title: string;
  subtitle?: string;
  status?: string;
};

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchResults } = useQuery({
    queryKey: ["universal-search", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];

      const results: SearchResult[] = [];

      // Search projects
      const { data: projects } = await supabase
        .from("projects")
        .select("id, title")
        .ilike("title", `%${searchQuery}%`)
        .limit(5);

      if (projects) {
        results.push(
          ...projects.map((project) => ({
            id: project.id,
            type: "project" as const,
            title: project.title,
          }))
        );
      }

      // Search subcontractors (profiles)
      const { data: subcontractors } = await supabase
        .from("profiles")
        .select("id, company_name, contact_email")
        .ilike("company_name", `%${searchQuery}%`)
        .limit(5);

      if (subcontractors) {
        results.push(
          ...subcontractors.map((sub) => ({
            id: sub.id,
            type: "subcontractor" as const,
            title: sub.company_name || "Unknown Company",
            subtitle: sub.contact_email,
          }))
        );
      }

      // Search bids
      const { data: bids } = await supabase
        .from("bids")
        .select(`
          id,
          status,
          projects (title),
          subcontractor:profiles (company_name)
        `)
        .or(`status.ilike.%${searchQuery}%,projects.title.ilike.%${searchQuery}%`)
        .limit(5);

      if (bids) {
        results.push(
          ...bids.map((bid) => ({
            id: bid.id,
            type: "bid" as const,
            title: bid.projects?.title || "Unknown Project",
            subtitle: bid.subcontractor?.company_name,
            status: bid.status,
          }))
        );
      }

      return results;
    },
    enabled: searchQuery.length > 0,
  });

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 py-1.5 h-8 text-sm"
        />
      </div>
      
      {searchResults?.length > 0 && searchQuery && (
        <div className="absolute top-full mt-1 w-full bg-white rounded-md border shadow-lg py-1 z-50">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                console.log("Selected:", result);
                setSearchQuery("");
              }}
            >
              <div className="text-sm font-medium">{result.title}</div>
              {result.subtitle && (
                <div className="text-xs text-muted-foreground">
                  {result.subtitle}
                  {result.status && ` • ${result.status}`}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
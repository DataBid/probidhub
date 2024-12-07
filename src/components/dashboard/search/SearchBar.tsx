import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search } from "lucide-react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

type SearchResult = {
  id: string;
  type: 'project' | 'subcontractor' | 'bid';
  title: string;
  subtitle?: string;
  status?: string;
};

export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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

  const handleSelect = (result: SearchResult) => {
    console.log("Selected:", result);
    setOpen(false);
    // Here you could add navigation logic based on the result type
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-6">
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "relative w-full flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm",
          "text-muted-foreground transition-colors hover:border-accent-foreground"
        )}
      >
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <span className="inline-flex">
          Search projects, subcontractors, or bids...
        </span>
        <kbd className="pointer-events-none absolute right-4 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput 
            placeholder="Search projects, subcontractors, or bids..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {searchResults?.length ? (
              <>
                <CommandGroup heading="Projects">
                  {searchResults
                    .filter((result) => result.type === "project")
                    .map((result) => (
                      <CommandItem
                        key={result.id}
                        onSelect={() => handleSelect(result)}
                      >
                        <Search className="mr-2 h-4 w-4" />
                        {result.title}
                      </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Subcontractors">
                  {searchResults
                    .filter((result) => result.type === "subcontractor")
                    .map((result) => (
                      <CommandItem
                        key={result.id}
                        onSelect={() => handleSelect(result)}
                      >
                        <Search className="mr-2 h-4 w-4" />
                        <div>
                          <div>{result.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {result.subtitle}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Bids">
                  {searchResults
                    .filter((result) => result.type === "bid")
                    .map((result) => (
                      <CommandItem
                        key={result.id}
                        onSelect={() => handleSelect(result)}
                      >
                        <Search className="mr-2 h-4 w-4" />
                        <div>
                          <div>{result.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {result.subtitle} • Status: {result.status}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
              </>
            ) : null}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};
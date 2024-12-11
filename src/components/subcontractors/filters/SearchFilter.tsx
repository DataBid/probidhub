import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useDebounce } from "@/hooks/use-debounce";
import { useUser } from "@supabase/auth-helpers-react";

const MAX_RECENT_SEARCHES = 5;
const MAX_SUGGESTIONS = 5;

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const SearchFilter = ({ searchQuery, onSearchChange }: SearchFilterProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const user = useUser();

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Fetch suggestions when search query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearch.trim() || !user?.id) return setSuggestions([]);

      console.log("Fetching suggestions for query:", debouncedSearch);
      
      const { data, error } = await supabase
        .from("subcontractors")
        .select("name, company, trade, email")
        .eq("gc_id", user.id)
        .or(`name.ilike.%${debouncedSearch}%,company.ilike.%${debouncedSearch}%,trade.ilike.%${debouncedSearch}%,email.ilike.%${debouncedSearch}%`)
        .limit(MAX_SUGGESTIONS);

      if (error) {
        console.error("Error fetching suggestions:", error);
        return;
      }

      console.log("Received suggestions:", data);
      setSuggestions(data || []);
    };

    fetchSuggestions();
  }, [debouncedSearch, user?.id]);

  // Save recent searches to localStorage
  const saveSearch = (search: string) => {
    if (!search.trim()) return;
    
    const updated = [
      search,
      ...recentSearches.filter(s => s !== search)
    ].slice(0, MAX_RECENT_SEARCHES);
    
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSearchSubmit = (value: string) => {
    saveSearch(value);
    onSearchChange(value);
    setShowSuggestions(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const handleSuggestionClick = (suggestion: any) => {
    // Create a search string that includes the matching field
    let searchText = suggestion.name;
    if (debouncedSearch && suggestion.company.toLowerCase().includes(debouncedSearch.toLowerCase())) {
      searchText = suggestion.company;
    } else if (debouncedSearch && suggestion.trade.toLowerCase().includes(debouncedSearch.toLowerCase())) {
      searchText = suggestion.trade;
    } else if (debouncedSearch && suggestion.email.toLowerCase().includes(debouncedSearch.toLowerCase())) {
      searchText = suggestion.email;
    }
    
    handleSearchSubmit(searchText);
  };

  return (
    <div className="relative flex-1">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search by name, company, trade, or email..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          // Delay hiding suggestions to allow clicking them
          setTimeout(() => setShowSuggestions(false), 200);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearchSubmit(searchQuery);
          }
        }}
        className="pl-8"
      />

      {/* Search suggestions dropdown */}
      {showSuggestions && (searchQuery.trim() || recentSearches.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md border shadow-lg z-50">
          {/* Live suggestions */}
          {searchQuery.trim() && suggestions.length > 0 && (
            <div className="py-1">
              <div className="px-3 py-2 text-sm font-medium text-gray-600 border-b">
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 flex flex-col"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="text-sm font-medium">{suggestion.name}</span>
                  <span className="text-xs text-gray-500">
                    {suggestion.company} • {suggestion.trade}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <>
              <div className="flex items-center justify-between px-3 py-2 border-b">
                <span className="text-sm font-medium text-gray-600">Recent Searches</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentSearches}
                  className="h-6 px-2 text-xs"
                >
                  Clear All
                </Button>
              </div>
              <div className="py-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => handleSearchSubmit(search)}
                  >
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-sm">{search}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
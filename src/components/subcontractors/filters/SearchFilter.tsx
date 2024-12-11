import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_RECENT_SEARCHES = 5;

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const SearchFilter = ({ searchQuery, onSearchChange }: SearchFilterProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

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

  return (
    <div className="relative flex-1">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search by name, company, or trade..."
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
      {showSuggestions && recentSearches.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md border shadow-lg z-50">
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
        </div>
      )}
    </div>
  );
};
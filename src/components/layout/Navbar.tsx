import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SearchBar } from "../dashboard/search/SearchBar";

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      console.log("Signing out...");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        duration: 2000,
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-construction-900">BidWall</span>
        </div>
        
        <div className="flex-1 max-w-2xl mx-8">
          <SearchBar />
        </div>
        
        <Button variant="ghost" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </nav>
  );
};
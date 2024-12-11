import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const UserActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      console.log("Starting sign out process...");
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Supabase sign out error:", error);
      }
      
      localStorage.clear();
      sessionStorage.clear();
      
      await supabase.auth.setSession(null);
      
      console.log("Sign out completed, redirecting to login");
      navigate("/");
      
      toast({
        title: "Signed out successfully",
        duration: 2000,
      });
    } catch (error) {
      console.error("Sign out process error:", error);
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
      toast({
        title: "Session ended",
        description: "You have been signed out",
        duration: 2000,
      });
    }
  };

  return (
    <Button variant="ghost" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking session state...");
        if (!session) {
          console.log("No session found, redirecting to login");
          navigate("/");
          return;
        }

        // Only verify user if we have a session
        const { data: { user }, error } = await supabase.auth.getUser();
        console.log("User verification result:", user ? "User found" : "No user found");
        
        if (error) {
          console.log("Session verification failed:", error.message);
          toast({
            title: "Session expired",
            description: "Please log in again",
            variant: "destructive",
          });
          await supabase.auth.signOut();
          navigate("/");
          return;
        }

        if (!user) {
          console.log("No user found, redirecting to login");
          navigate("/");
        }
      } catch (error) {
        console.error("Session check error:", error);
        toast({
          title: "Authentication error",
          description: "Please try logging in again",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkSession();
  }, [session, navigate, supabase.auth, toast]);

  // If no session, return null early to prevent flash of content
  if (!session) {
    console.log("No session, returning null");
    return null;
  }

  return <DashboardLayout />;
};

export default Dashboard;
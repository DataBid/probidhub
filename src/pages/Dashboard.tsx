import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
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

        const { data: { user }, error } = await supabase.auth.getUser();
        console.log("User verification result:", user ? "User found" : "No user found");
        
        if (error || !user) {
          console.log("Session verification failed:", error?.message);
          toast({
            title: "Session expired",
            description: "Please log in again",
            variant: "destructive",
          });
          await supabase.auth.signOut();
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

  if (!session) {
    console.log("No session, returning null");
    return null;
  }

  return (
    <MainLayout>
      <DashboardLayout />
    </MainLayout>
  );
};

export default Dashboard;
import { Navbar } from "./Navbar";
import { DashboardSidebar } from "./DashboardSidebar";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking session state...");
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          toast({
            title: "Session error",
            description: "Please log in again",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        if (!currentSession) {
          console.log("No active session found");
          navigate("/");
          return;
        }

        console.log("Valid session found");
      } catch (error) {
        console.error("Session verification error:", error);
        navigate("/");
      }
    };

    checkSession();
  }, [navigate, supabase.auth, toast]);

  if (!session) {
    console.log("No session in context, returning null");
    return null;
  }

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        <main className="flex-1 p-4 lg:p-6 w-full">{children}</main>
      </div>
    </div>
  );
};
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
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        console.log("MainLayout - Session check:", currentSession ? "Session exists" : "No session");
        
        if (error || !currentSession) {
          console.log("MainLayout - No valid session, redirecting to login");
          await supabase.auth.signOut();
          toast({
            title: "Session expired",
            description: "Please log in again",
            variant: "destructive",
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Session check error:", error);
        navigate("/");
      }
    };

    checkSession();
  }, [session, navigate, supabase, toast]);

  if (!session) {
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
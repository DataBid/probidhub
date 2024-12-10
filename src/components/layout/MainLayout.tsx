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
    if (!session) {
      console.log("MainLayout - No session, redirecting to login");
      navigate("/");
      return;
    }

    const checkSession = async () => {
      try {
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
        navigate("/");
      }
    };

    checkSession();
  }, [session, navigate, supabase.auth, toast]);

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
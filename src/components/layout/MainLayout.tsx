import { Navbar } from "./Navbar";
import { DashboardSidebar } from "./DashboardSidebar";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("MainLayout: Checking session...");
    
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("MainLayout: Session check error:", error);
          navigate("/");
          return;
        }
        
        if (!data.session) {
          console.log("MainLayout: No valid session found, redirecting to login");
          navigate("/");
          return;
        }

        console.log("MainLayout: Valid session found:", data.session.user.id);
      } catch (error) {
        console.error("MainLayout: Error checking session:", error);
        navigate("/");
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("MainLayout: Auth state changed:", event, session?.user?.id);
      if (!session) {
        navigate("/");
      }
    });

    return () => {
      console.log("MainLayout: Cleaning up auth listener");
      subscription.unsubscribe();
    };
  }, [navigate, supabase]);

  if (!session) {
    console.log("MainLayout: No session, returning null");
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
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
    console.log("MainLayout: Checking session state:", session?.user?.id || 'No session');
    
    if (!session) {
      console.log("MainLayout: No session found, redirecting to login");
      navigate("/");
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      console.log("MainLayout: Auth state changed:", currentSession?.user?.id || 'No session');
      if (!currentSession) {
        navigate("/");
      }
    });

    return () => {
      console.log("MainLayout: Cleaning up auth listener");
      subscription.unsubscribe();
    };
  }, [session, navigate, supabase.auth]);

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
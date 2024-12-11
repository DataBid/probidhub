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
    
    // Try to get session from localStorage if no active session
    if (!session) {
      const savedSession = localStorage.getItem('supabase.auth.token');
      if (!savedSession) {
        console.log("MainLayout: No session found, redirecting to login");
        navigate("/");
        return;
      }
      console.log("MainLayout: Found saved session, attempting to restore");
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      console.log("MainLayout: Auth state changed:", currentSession?.user?.id || 'No session');
      if (!currentSession) {
        localStorage.removeItem('supabase.auth.token');
        navigate("/");
      }
    });

    return () => {
      console.log("MainLayout: Cleaning up auth listener");
      subscription.unsubscribe();
    };
  }, [session, navigate, supabase.auth]);

  if (!session) {
    const savedSession = localStorage.getItem('supabase.auth.token');
    if (!savedSession) {
      console.log("MainLayout: No session, returning null");
      return null;
    }
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
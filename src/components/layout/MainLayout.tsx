import { Navbar } from "./Navbar";
import { DashboardSidebar } from "./DashboardSidebar";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const session = useSession();
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    console.log("MainLayout: Initializing with session:", session?.user?.id || 'No session');
    
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 500); // Reduced timeout for faster rendering

    if (!session && !isInitializing) {
      console.log("MainLayout: No session found, redirecting to login");
      navigate("/");
    }

    return () => clearTimeout(timer);
  }, [session, navigate, isInitializing]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        <main className="flex-1 p-4 lg:p-6 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
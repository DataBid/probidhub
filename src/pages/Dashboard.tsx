import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    console.log("Dashboard: Initializing with session:", session?.user?.id || 'No session');
    
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 500); // Reduced timeout for faster rendering

    if (!session && !isInitializing) {
      console.log("Dashboard: No session found, redirecting to login");
      navigate("/");
    }

    return () => clearTimeout(timer);
  }, [session, navigate, isInitializing]);

  // Remove the loading spinner here since MainLayout already handles it
  if (!session || isInitializing) {
    return null;
  }

  return <DashboardLayout />;
};

export default Dashboard;
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
    }, 1000);

    if (!session && !isInitializing) {
      console.log("Dashboard: No session found, redirecting to login");
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

  return <DashboardLayout />;
};

export default Dashboard;
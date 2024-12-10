import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const Dashboard = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Dashboard: Checking session state:", session?.user?.id || 'No session');
    
    if (!session) {
      console.log("Dashboard: No session found, redirecting to login");
      navigate("/");
    }
  }, [session, navigate]);

  if (!session) {
    console.log("Dashboard: No session, returning null");
    return null;
  }

  return <DashboardLayout />;
};

export default Dashboard;
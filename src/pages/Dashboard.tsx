import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const Dashboard = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Dashboard: Checking auth...");
    
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Dashboard: Auth check error:", error);
          navigate("/");
          return;
        }
        
        if (!data.session) {
          console.log("Dashboard: No valid session, redirecting to login");
          navigate("/");
          return;
        }

        console.log("Dashboard: Valid session found:", data.session.user.id);
      } catch (error) {
        console.error("Dashboard: Error checking auth:", error);
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate, supabase]);

  if (!session) {
    console.log("Dashboard: No session, returning null");
    return null;
  }

  return <DashboardLayout />;
};

export default Dashboard;
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const Dashboard = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      if (!session) {
        console.log("No session in Dashboard, redirecting to login");
        navigate("/");
      }
    };

    checkSession();
  }, [session, navigate]);

  if (!session) {
    return null;
  }

  return <DashboardLayout />;
};

export default Dashboard;

import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useUserProfile } from "@/components/dashboard/hooks/useUserProfile";
import { GCDashboard } from "@/components/dashboard/gc/GCDashboard";
import { SubDashboard } from "@/components/dashboard/sub/SubDashboard";
import { AdminDashboard } from "@/components/dashboard/admin/AdminDashboard";

const Dashboard = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(true);
  const { data: userProfile, isLoading: isLoadingProfile } = useUserProfile();

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

  if (isInitializing || isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Render the appropriate dashboard based on user role
  return (
    <div className="p-0 sm:p-2 md:p-4">
      {userProfile?.role === "admin" ? (
        <AdminDashboard />
      ) : userProfile?.role === "sub" ? (
        <SubDashboard />
      ) : (
        <GCDashboard />
      )}
    </div>
  );
};

export default Dashboard;

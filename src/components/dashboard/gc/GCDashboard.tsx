
import { useSession } from "@supabase/auth-helpers-react";
import { useUserProfile } from "../hooks/useUserProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { GCOverview } from "./GCOverview";
import { DashboardActions } from "../DashboardActions";

export const GCDashboard = () => {
  const session = useSession();
  const { data: userProfile, isLoading, error } = useUserProfile();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error loading your profile. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!session || userProfile?.role !== "gc") {
    return null;
  }

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      {/* Quick Action Buttons Bar at the top */}
      <DashboardActions userRole={userProfile?.role} />
      
      {/* Main Dashboard Content */}
      <GCOverview userProfile={userProfile} />
    </div>
  );
};

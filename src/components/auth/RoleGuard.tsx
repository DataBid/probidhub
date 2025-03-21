
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "@/components/dashboard/hooks/useUserProfile";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: ("gc" | "sub" | "admin")[];
  redirectTo?: string;
}

export const RoleGuard = ({ 
  children, 
  allowedRoles, 
  redirectTo = "/dashboard" 
}: RoleGuardProps) => {
  const { data: userProfile, isLoading } = useUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && userProfile && !allowedRoles.includes(userProfile.role as any)) {
      console.log(`RoleGuard: User role ${userProfile.role} not in allowed roles [${allowedRoles.join(', ')}], redirecting to ${redirectTo}`);
      navigate(redirectTo);
    }
  }, [userProfile, isLoading, allowedRoles, navigate, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!userProfile || !allowedRoles.includes(userProfile.role as any)) {
    return null;
  }

  return <>{children}</>;
};
